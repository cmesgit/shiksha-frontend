import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { KIND_LABEL } from "./tickerKinds";
import "../../css/AnnouncementStack.css";

/* The homepage "noticeboard" — a draggable stack of announcement cards
 * (design handoff: announcements-preview.html). Replaces TickerCards'
 * 3-up paged grid for the home_band slot ONLY; TickerCards itself is left
 * untouched because FooterTicker and the student dashboard ticker still
 * render the old paged layout.
 *
 * The preview's own CSS already collapses this into a plain static list
 * under `prefers-reduced-motion` (AnnouncementStack.css), but only because
 * EVERY item stays mounted in the DOM — the 3-card "peek" is done with
 * per-item depth styling, not by only rendering 3 nodes. Do not change this
 * to a windowed/virtualized render or the reduced-motion fallback silently
 * loses every item past the third.
 */

const ROTATE_MS = 5600; // matches the preview's --an-dur fill-bar duration
const DRAG_DISMISS_PX = 110;
const DRAG_ROTATE_DIVISOR = 20;

const prefersReducedMotion = () =>
  typeof window !== "undefined"
  && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Stack-depth transforms, exact from the preview (only 3 are ever visible —
// anything deeper sits fully hidden directly behind the third).
const SLOT = [
  { y: 0, s: 1, r: 0 },
  { y: -16, s: 0.955, r: -2.1 },
  { y: -30, s: 0.912, r: 1.6 },
];

/* The preview only ever drew 3 of the 8 TickerKind values (new_course,
 * milestone, practice), each with its own accent + wash + rule triple.
 * Those three are reproduced exactly below. The other 5 kinds are NOT in
 * the design — this groups them against the nearest drawn treatment
 * (enrolment/current_affairs with new_course; deadline/new_mentor with
 * milestone; mentor_spotlight with practice) rather than inventing new
 * colors. Flag to design if a kind should get its own treatment. */
const KIND_ACCENT = {
  new_course: { accent: "var(--sk-green-dark)", wash: "#EFF9F4", rule: "#DDEFE6" },
  enrolment: { accent: "var(--sk-green-dark)", wash: "#EFF9F4", rule: "#DDEFE6" },
  current_affairs: { accent: "var(--sk-green-dark)", wash: "#EFF9F4", rule: "#DDEFE6" },
  milestone: { accent: "var(--sk-gold-deep)", wash: "#FDF7EC", rule: "#F3E6CD" },
  deadline: { accent: "var(--sk-gold-deep)", wash: "#FDF7EC", rule: "#F3E6CD" },
  new_mentor: { accent: "var(--sk-gold-deep)", wash: "#FDF7EC", rule: "#F3E6CD" },
  practice: { accent: "var(--sk-violet)", wash: "#F6F4FF", rule: "#E6DFFB" },
  mentor_spotlight: { accent: "var(--sk-violet)", wash: "#F6F4FF", rule: "#E6DFFB" },
};
const DEFAULT_ACCENT = KIND_ACCENT.new_course;

/* `item.body` already carries the card's long description line (the
 * preview's demo data additionally showed a short caption next to the kind
 * label — "Enrolling now", "Updated this term" — that has no backing field
 * today: Announcement.metric_label is capped at 24 chars ("Free for
 * enrolled students" alone is 27) and is never serialized at all for
 * new_course/new_mentor/current_affairs (content/serializers.py's `metric`
 * is null whenever `metric_value` is empty, which those three kinds
 * forbid). So this reads `item.metric?.label` where the backend happens to
 * supply one and otherwise omits the caption rather than guessing at it or
 * overflowing the layout. */
function Kind({ item }) {
  const caption = item.metric?.label;
  return (
    <p className="an-kind">
      <b>{KIND_LABEL[item.kind] || ""}</b>
      {caption && (
        <>
          <i aria-hidden="true" />
          <span>{caption}</span>
        </>
      )}
    </p>
  );
}

export default function AnnouncementStack({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [drag, setDrag] = useState(null); // {id, startX, dx} while pointer is down on the front card
  const [flight, setFlight] = useState(null); // {id, dir} while a dismissed card is flying out
  const [resettingId, setResettingId] = useState(null); // one-frame transition skip after a dismiss
  const dragRef = useRef(null);

  const count = items.length;
  const held = hovered || focused || hidden || !!drag || !!flight;

  const advance = useCallback((dir) => {
    setActiveIndex((i) => (i + dir + count) % count);
  }, [count]);

  const goTo = useCallback((i) => setActiveIndex(((i % count) + count) % count), [count]);

  // Auto-rotate, paused by hover/focus/hidden tab/an in-flight drag, and
  // skipped entirely under reduced motion (the CSS fill-bar is gone too).
  useEffect(() => {
    if (held || count < 2 || prefersReducedMotion()) return undefined;
    const id = setInterval(() => {
      if (document.visibilityState === "visible") advance(1);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [held, count, advance, activeIndex]);

  useEffect(() => {
    const onVis = () => setHidden(document.visibilityState !== "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const dismiss = useCallback((dir) => {
    const frontItem = items[activeIndex];
    setFlight({ id: frontItem.id, dir });
    window.setTimeout(() => {
      setResettingId(frontItem.id);
      setFlight(null);
      setDrag(null);
      advance(1);
      requestAnimationFrame(() => requestAnimationFrame(() => setResettingId(null)));
    }, 420);
  }, [items, activeIndex, advance]);

  /* dragRef (not state) is the source of truth for "are we dragging, and
   * what's the current delta" — pointerdown/move/up can all land in the
   * same task before React flushes a state update, which would otherwise
   * read a stale `drag` closure on the very first move. State (`drag`) only
   * exists to trigger the re-render that paints the live transform. */
  const onPointerDown = (e, item) => {
    if (item.id !== items[activeIndex].id) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { id: item.id, startX: e.clientX, dx: 0 };
    setDrag({ id: item.id, dx: 0 });
  };
  const onPointerMove = (e, item) => {
    if (!dragRef.current || dragRef.current.id !== item.id) return;
    const dx = e.clientX - dragRef.current.startX;
    dragRef.current.dx = dx;
    setDrag({ id: item.id, dx });
  };
  const endDrag = (item) => {
    if (!dragRef.current || dragRef.current.id !== item.id) return;
    const dx = dragRef.current.dx;
    dragRef.current = null;
    if (Math.abs(dx) >= DRAG_DISMISS_PX) {
      dismiss(dx > 0 ? 1 : -1);
    } else {
      setDrag(null);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); advance(-1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); advance(1); }
  };

  if (!count) return null;

  return (
    <section className={`announce-section${held ? " is-held" : ""}`} aria-labelledby="an-heading">
      <div className="an-wrap">
        <div className="an-grid">
          <div>
            <p className="an-eyebrow">Latest from ShikshaCom</p>
            <h2 className="an-title" id="an-heading">What&rsquo;s new on the noticeboard</h2>
            <p className="an-lede">
              New courses, fresh practice sets and the milestones we hit along the way. Flick
              through the pile, or let it turn on its own.
            </p>
            {count > 1 && (
              <div className="an-controls">
                <button type="button" className="an-nav" aria-label="Previous notice" onClick={() => advance(-1)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 5l-7 7 7 7" />
                  </svg>
                </button>
                <button type="button" className="an-nav" aria-label="Next notice" onClick={() => advance(1)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="an-marks">
                  {items.map((it, i) => (
                    <button
                      key={it.id}
                      type="button"
                      className={`an-mark${i === activeIndex ? " is-on" : ""}`}
                      aria-label={`Show: ${it.message}`}
                      aria-current={i === activeIndex || undefined}
                      onClick={() => goTo(i)}
                    />
                  ))}
                </div>
                <p className="an-count"><b>{activeIndex + 1}</b> of {count}</p>
              </div>
            )}
            {count > 1 && <p className="an-hint"><b>Drag</b> a notice aside, or use the arrow keys.</p>}
          </div>

          <div
            className="an-stack"
            tabIndex={0}
            role="group"
            aria-roledescription="Notice board"
            aria-label="Latest announcements"
            onKeyDown={onKeyDown}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
          >
            {items.map((item, i) => {
              const depth = (i - activeIndex + count) % count;
              const isFront = depth === 0;
              const isDragging = isFront && !!drag;
              const isGone = isFront && !!flight;
              const isResetting = item.id === resettingId;
              const accent = KIND_ACCENT[item.kind] || DEFAULT_ACCENT;

              let style;
              if (isGone) {
                style = {
                  transform: `translate(${flight.dir * 480}px, -40px) rotate(${flight.dir * 22}deg)`,
                  opacity: 0,
                  zIndex: 40,
                };
              } else if (isDragging) {
                style = {
                  transform: `translate(${drag.dx}px, 0px) rotate(${drag.dx / DRAG_ROTATE_DIVISOR}deg)`,
                  opacity: 1,
                  zIndex: 40,
                };
              } else {
                const slot = SLOT[Math.min(depth, 2)];
                style = {
                  transform: `translateY(${slot.y}px) scale(${slot.s}) rotate(${slot.r}deg)`,
                  opacity: depth >= 3 ? 0 : 1,
                  zIndex: 40 - Math.min(depth, 39),
                  pointerEvents: depth >= 3 ? "none" : undefined,
                };
              }
              style["--an-accent"] = accent.accent;
              style["--an-wash"] = accent.wash;
              style["--an-rule"] = accent.rule;

              const cls = [
                "an-card",
                isFront && "is-front",
                isDragging && "is-dragging",
                isGone && "is-gone",
                isResetting && "is-resetting",
              ].filter(Boolean).join(" ");

              const ctaTabIndex = isFront ? 0 : -1;
              const go = item.link_label && item.link_url ? (
                item.link_url.startsWith("/")
                  ? <Link to={item.link_url} className="an-go" tabIndex={ctaTabIndex} draggable={false}>{item.link_label}<Arrow /></Link>
                  : <a href={item.link_url} className="an-go" tabIndex={ctaTabIndex} draggable={false} target="_blank" rel="noopener noreferrer">{item.link_label}<Arrow /></a>
              ) : null;

              return (
                <article
                  key={item.id}
                  className={cls}
                  style={style}
                  aria-hidden={!isFront || undefined}
                  onPointerDown={isFront ? (e) => onPointerDown(e, item) : undefined}
                  onPointerMove={isFront ? (e) => onPointerMove(e, item) : undefined}
                  onPointerUp={isFront ? () => endDrag(item) : undefined}
                  onPointerCancel={isFront ? () => endDrag(item) : undefined}
                >
                  <Kind item={item} />
                  <h3>{item.message}</h3>
                  {item.body && <p>{item.body}</p>}
                  {go}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h13M12 5l7 7-7 7" />
    </svg>
  );
}
