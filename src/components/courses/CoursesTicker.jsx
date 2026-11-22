import { useEffect, useRef, useState } from "react";
import useTickerSlot from "../ticker/useTickerSlot";
import "../../css/Ticker.css";

/* "Happening on ShikshaCom" — the courses-page ticker (slot 4, Phase 8).
 *
 * Shows ONE item at a time and moves to the next every few seconds, as a
 * full-width strip above the catalog (layout in Courses.css). It used to list
 * up to three rows at once.
 *
 * Motion rules, as for the site's other rotators: the timer pauses on hover,
 * keyboard focus, a hidden tab and prefers-reduced-motion, and there is a
 * visible Pause button (auto-advancing content needs one) plus a dot per item.
 * Only the item's content is keyed, so it fades in on each change while the
 * controls keep keyboard focus.
 *
 * ⚠ DELIBERATE DEVIATION (unchanged): the design implies a sticky rail beside
 * the catalog, but /courses has no sidebar, so this sits above the catalog.
 *
 * ⚠ The badge colour comes from `kind`, not from stored tint/ink values — an
 * admin should not be choosing hexes, and a stored pair cannot follow a theme.
 */

const KIND_LABEL = {
  new_course: "New course", enrolment: "Enrolment", new_mentor: "New mentor",
  practice: "Practice", deadline: "Deadline", milestone: "Milestone",
  current_affairs: "Current affairs", mentor_spotlight: "Mentors",
};

// Kind -> a tone class, resolved to --sk-* in Ticker.css.
const TONE = {
  deadline: "warn", milestone: "brand", enrolment: "brand",
  practice: "violet", new_course: "brand", current_affairs: "teal",
  new_mentor: "violet", mentor_spotlight: "violet",
};

const ROTATE_MS = 5000;
const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function CoursesTicker() {
  const { items } = useTickerSlot("courses");
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [held, setHeld] = useState(false); // hover / focus inside
  const root = useRef(null);
  const n = items.length;
  const i = index < n ? index : 0; // the queue can shrink under us

  useEffect(() => {
    if (n < 2 || paused || held || reducedMotion()) return undefined;
    const id = setInterval(() => {
      if (document.visibilityState === "visible") setIndex((x) => (x + 1) % n);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [n, paused, held]);

  if (!n) return null;
  const it = items[i];

  const inner = (
    <>
      {it.img
        ? <img className="ck__thumb" src={it.img} alt="" />
        : it.metric
          ? <span className={`ck__metric ck__metric--${TONE[it.kind] || "brand"}`}>
              <b>{it.metric.value}</b>
              <small>{it.metric.label}</small>
            </span>
          : <span className="ck__thumb ck__thumb--empty" aria-hidden="true" />}
      <span className="ck__meta">
        {it.kind && <span className="ck__kind">{KIND_LABEL[it.kind]}</span>}
        <span className="ck__text">{it.message}</span>
        {it.body && <span className="ck__body">{it.body}</span>}
      </span>
      {it.link_url && <span className="ck__go" aria-hidden="true">→</span>}
    </>
  );

  return (
    <aside
      ref={root}
      className="ck ck--rotate"
      aria-labelledby="ck-h"
      aria-roledescription="carousel"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false); }}
    >
      <div className="ck__head">
        <span className="ck__dot" aria-hidden="true" />
        <span className="ck__title" id="ck-h">Happening on ShikshaCom</span>
      </div>

      {/* aria-live off: announcing every automatic change would interrupt a
          screen reader; the dots reach any item on demand. */}
      <div className="ck__stage" aria-live="off">
        <div className="ck__item" key={it.id}>
          {it.link_url
            ? <a className="ck__link" href={it.link_url}>{inner}</a>
            : <span className="ck__link ck__link--static">{inner}</span>}
        </div>
      </div>

      {n > 1 && (
        <div className="ck__nav">
          <div className="ck__dots">
            {items.map((x, k) => (
              <button
                key={x.id}
                type="button"
                className={`ck__pip${k === i ? " is-on" : ""}`}
                aria-label={`Update ${k + 1} of ${n}`}
                aria-current={k === i}
                onClick={() => setIndex(k)}
              />
            ))}
          </div>
          <button type="button" className="ck__pause" onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Resume updates" : "Pause updates"}>
            {paused ? "Play" : "Pause"}
          </button>
        </div>
      )}
    </aside>
  );
}
