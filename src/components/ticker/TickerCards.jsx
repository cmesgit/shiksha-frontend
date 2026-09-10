import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/Ticker.css";

/* Open item #7, settled 2026-09-10: 5s, the design's own `rotationSeconds`
 * default. The site's two existing hand-rolled rotators use 3200ms, but they
 * cycle a word or a testimonial line — these cards carry an eyebrow, a title,
 * a second line and sometimes a number, and 3.2s is not enough to read that.
 * One named constant so it is a one-line change if that turns out wrong. */
const ROTATE_MS = 5000;

const prefersReducedMotion = () =>
  typeof window !== "undefined"
  && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** One rotating group of ticker cards.
 *
 * Motion rules (README §11), all of which pause the TIMER rather than just
 * the transition — a paused animation on a still-advancing index still
 * changes the words under someone's eyes:
 *   · prefers-reduced-motion  · pointer hover  · keyboard focus within
 *   · a hidden tab (rotating in a background tab wastes work and lands the
 *     visitor on an arbitrary card when they return)
 *
 * `aria-live="off"`: the cards rotate on their own, so announcing every
 * change would interrupt a screen-reader user mid-sentence, repeatedly. The
 * previous/next buttons make the content reachable on demand instead.
 */
export default function TickerCards({ items, perView = 1, renderCard }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const rootRef = useRef(null);

  const pages = Math.max(1, Math.ceil(items.length / perView));
  const go = useCallback((n) => setIndex(((n % pages) + pages) % pages), [pages]);

  /* Clamped at render, not corrected in an effect. If the queue shrinks under
   * us — an item reaching its `ends_at` mid-visit — a stored index can fall
   * out of range; deriving it means there is never a frame rendered from a
   * bad index, and no cascading re-render to fix one. */
  const page = index < pages ? index : 0;

  useEffect(() => {
    if (paused || pages < 2 || prefersReducedMotion()) return undefined;
    const id = setInterval(() => {
      // Belt and braces with the visibilitychange listener below: an interval
      // that fired just before the tab hid would otherwise still advance once.
      if (document.visibilityState === "visible") {
        setIndex((i) => (i + 1) % pages);
      }
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, pages]);

  useEffect(() => {
    const onVis = () => setPaused(document.visibilityState !== "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  if (!items.length) return null;

  const start = page * perView;
  const shown = items.slice(start, start + perView);

  return (
    <div
      ref={rootRef}
      className="tk-rot"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      <div className="tk-rot__cards" aria-live="off">
        {shown.map((it) => renderCard(it))}
      </div>

      {pages > 1 && (
        <div className="tk-rot__nav">
          <button
            type="button" className="tk-rot__arrow"
            onClick={() => go(page - 1)} aria-label="Previous update"
          >
            ‹
          </button>
          <div className="tk-rot__dots">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`tk-rot__dot${i === page ? " is-on" : ""}`}
                aria-label={`Update ${i + 1} of ${pages}`}
                aria-current={i === page}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button
            type="button" className="tk-rot__arrow"
            onClick={() => go(page + 1)} aria-label="Next update"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

/** The card itself. `tone="dark"` inverts it for the footer — the one slot on
 *  a dark background, where the default ink-on-white card would be a hole. */
export function TickerCard({ item, tone = "light" }) {
  const inner = (
    <>
      {item.metric && (
        <span className="tk-card__metric">
          <b>{item.metric.value}</b> <small>{item.metric.label}</small>
        </span>
      )}
      {item.kind && <span className="tk-card__eyebrow">{KIND_LABEL[item.kind] || ""}</span>}
      <span className="tk-card__title">{item.message}</span>
      {item.body && <span className="tk-card__body">{item.body}</span>}
    </>
  );
  const cls = `tk-card tk-card--${tone}`;
  if (!item.link_url) return <div className={cls}>{inner}</div>;
  return item.link_url.startsWith("/")
    ? <Link to={item.link_url} className={cls}>{inner}</Link>
    : <a className={cls} href={item.link_url} target="_blank" rel="noopener noreferrer">{inner}</a>;
}

// Mirrors content.models.TickerKind. Shown as the card's small eyebrow.
const KIND_LABEL = {
  new_course: "New course",
  enrolment: "Enrolment",
  new_mentor: "New mentor",
  practice: "Practice",
  deadline: "Deadline",
  milestone: "Milestone",
  current_affairs: "Current affairs",
  mentor_spotlight: "Mentor spotlight",
};
