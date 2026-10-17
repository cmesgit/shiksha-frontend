import { useEffect, useRef, useState } from "react";
import useTickerSlot from "../components/ticker/useTickerSlot";
import "./AuthTicker.css";

/* The auth screens' two ticker surfaces (design_handoff_live_ticker Phase 5,
 * Turn 2). They are TWO components in TWO columns, which the design file's
 * reading order disguises — verified by tag matching, see README §5:
 *
 *   <AuthTickerCard>  → the BRAND panel (.af-brand, the 38% coloured column),
 *                       below the illustration. "Same queue, in the auth
 *                       brand panel — never over the form."
 *   <AuthMentors>     → the FORM column, under "Create one".
 *
 * AuthShell is untouched apart from mounting these: "the form column, its
 * measure and the step animation are untouched."
 *
 * ⚠ Both read the flag through getPublicConfig (inside useTickerSlot), never
 * feature_flags — these screens are pre-auth, so /accounts/me/ has not been
 * called and never will be. That is the whole reason Phase 0 put
 * live_ticker_enabled in PUBLIC_FLAGS.
 */

const KIND_LABEL = {
  new_course: "New course", enrolment: "Enrolment", new_mentor: "New mentor",
  practice: "Practice", deadline: "Deadline", milestone: "Milestone",
  current_affairs: "Current affairs", mentor_spotlight: "Mentor spotlight",
};

const ROTATE_MS = 7000;

const reduced = () =>
  typeof window !== "undefined"
  && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Brand-panel card.
 *
 * `variant="rotate"` (login) shows ONE item at a time — the design's reason:
 * "there's a single decision on screen". `variant="list"` (signup) shows
 * three still lines, because "the panel is the only place making the case for
 * creating an account". Two behaviours, one component, because they are the
 * same queue rendered at two densities.
 */
// Promotions open alongside the form, so browsing never discards entered fields.
const promoHref = (item) => /^\/(?!\/)|^https?:\/\//i.test(item.link_url || "")
  ? item.link_url : null;

function PromoLine({ item }) {
  const href = promoHref(item);
  const Tag = href ? "a" : "span";
  return (
    <Tag className="aft__linecontent" {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}>
      {item.img && <img className="aft__thumb" src={item.img} alt="" width="44" height="44" loading="lazy" decoding="async" />}
      <span className="aft__linetext">
        <span>{item.message}</span>
        {item.body && <small className="aft__linebody">{item.body}</small>}
      </span>
      {href && <span className="aft__linearrow" aria-hidden="true">↗</span>}
    </Tag>
  );
}

export function AuthTickerCard({ slot, variant = "rotate" }) {
  const { items: all } = useTickerSlot(slot);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const root = useRef(null);
  const items = all.filter((it) => it.kind !== "mentor_spotlight");
  const n = items.length;
  const index = i < n ? i : 0;

  useEffect(() => {
    if (variant !== "rotate" || n < 2 || paused || reduced()) return undefined;
    const id = setInterval(() => {
      if (document.visibilityState === "visible" && !root.current?.matches(":hover, :focus-within")) {
        setI((x) => (x + 1) % n);
      }
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [variant, n, paused]);

  if (!n) return null;
  if (variant === "list" || variant === "compact") {
    return (
      <aside className={`aft aft--${variant}`} aria-label="Explore ShikshaCom">
        <span className="aft__label">{variant === "compact" ? "Explore ShikshaCom" : "More to explore"}</span>
        <ul className="aft__list">
          {items.slice(0, variant === "compact" ? 1 : 3).map((it) => (
            <li key={it.id} className={`aft__line${it.img ? " aft__line--thumb" : ""}`}>
              <PromoLine item={it} />
            </li>
          ))}
        </ul>
      </aside>
    );
  }

  const it = items[index];
  const href = promoHref(it);
  return (
    <aside ref={root} className={`aft aft--rotate${it.img ? " aft--banner" : ""}`} aria-label="Explore ShikshaCom" aria-live="off">
      {it.img && <img className="aft__img" src={it.img} alt="" width="360" height="100" loading="lazy" decoding="async" />}
      <div className="aft__head">
        <span className="aft__label">{KIND_LABEL[it.kind] || "Discover"}</span>
        {n > 1 && <span className="aft__count">{index + 1}/{n}</span>}
      </div>
      <p className="aft__text">{it.message}</p>
      {it.body && <p className="aft__body">{it.body}</p>}
      <div className="aft__footer">
        {href && <a className="aft__link" href={href} target="_blank" rel="noopener noreferrer">{it.link_label || "Explore"} ↗</a>}
        {n > 1 && (
          <div className="aft__controls">
            <button type="button" className="aft__control" onClick={() => setI((index + n - 1) % n)} aria-label="Previous update">‹</button>
            <button type="button" className="aft__control aft__control--pause" onClick={() => setPaused((p) => !p)} aria-label={paused ? "Resume updates" : "Pause updates"}>{paused ? "Play" : "Pause"}</button>
            <button type="button" className="aft__control" onClick={() => setI((index + 1) % n)} aria-label="Next update">›</button>
          </div>
        )}
      </div>
    </aside>
  );
}

/** Form-column mentor spotlight — one at a time, with dots to step through.
 *
 * Fed by `mentor_spotlight` items on the same queue rather than a Mentor
 * model: name→message, subject→body, photo→img. That reuse is what gives it
 * scheduling, status, revisions and the media library's delete guard for
 * free (README §5).
 *
 * ⚠ **No "Meet the mentors" link, deliberately (2026-09-10).** The design
 * put one here pointing at `/about` — but `/about` has no mentors section
 * (its sections are hero / vision / mission / values / why-choose), so the
 * CTA led nowhere. A link that goes somewhere irrelevant is worse than no
 * link: it spends the visitor's attention and returns nothing. The card is
 * the photo, the name and the subject. Restore the link when `/about`
 * actually has people on it.
 *
 * ⚠ Manual only. It is NOT wired to TeacherProfile: no public endpoint
 * exposes teachers today, so feeding real staff here would newly publish real
 * people's names and photos on a pre-auth screen — a consent decision, not a
 * technical one.
 */
export function AuthMentors({ slot }) {
  const { items } = useTickerSlot(slot);
  const mentors = items.filter((it) => it.kind === "mentor_spotlight");
  const [i, setI] = useState(0);
  const n = mentors.length;
  if (!n) return null;

  const m = mentors[i < n ? i : 0];
  return (
    <div className="afm">
      <span className="afm__label">New on ShikshaCom</span>
      <div className="afm__card">
        {m.img
          ? <img className="afm__photo" src={m.img} alt="" />
          : <span className="afm__photo afm__photo--empty" aria-hidden="true" />}
        <div className="afm__meta">
          <b className="afm__name">{m.message}</b>
          {m.body && <span className="afm__subject">{m.body}</span>}
          {promoHref(m) && <a className="afm__link" href={promoHref(m)} target="_blank" rel="noopener noreferrer">{m.link_label || "View profile"} ↗</a>}
        </div>
      </div>
      {n > 1 && (
        <div className="afm__dots">
          {mentors.map((x, k) => (
            <button
              key={x.id}
              type="button"
              className={`afm__dot${k === i ? " is-on" : ""}`}
              aria-label={`Mentor ${k + 1} of ${n}`}
              aria-current={k === i}
              onClick={() => setI(k)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Admin-managed content below login. The stage reserves the tallest card's
 * space, so vertical rotation never shifts the form or its buttons. */
export function AuthFormUpdates({ slot }) {
  const { items } = useTickerSlot(slot);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [motionReduced, setMotionReduced] = useState(reduced);
  const root = useRef(null);
  const current = index < items.length ? index : 0;
  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const update = () => setMotionReduced(!!media?.matches);
    media?.addEventListener("change", update);
    return () => media?.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (items.length < 2 || paused || motionReduced) return undefined;
    const timer = setInterval(() => {
      if (document.visibilityState === "visible" && !root.current?.matches(":hover, :focus-within")) {
        setIndex(i => (i + 1) % items.length);
      }
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [items.length, paused, motionReduced]);
  if (!items.length) return null;
  return (
    <aside ref={root} className="afm afm--updates afm--vertical" aria-label="From ShikshaCom" aria-roledescription="carousel">
      <div className="afm__stage" aria-live="off">
        {items.map((item, position) => {
          const href = promoHref(item);
          const active = position === current;
          return <div key={item.id} className={`afm__slide${active ? " is-active" : ""}`} aria-hidden={!active} inert={!active}>
            <span className="afm__label">{KIND_LABEL[item.kind] || "From ShikshaCom"}</span>
            <div className="afm__card">
              {item.img && <img className="afm__photo" src={item.img} alt="" width="160" height="130" loading="lazy" decoding="async" />}
              <div className="afm__meta"><b className="afm__name">{item.message}</b>
                {item.body && <span className="afm__subject">{item.body}</span>}
                {href && <a className="afm__link" href={href} target="_blank" rel="noopener noreferrer">{item.link_label || "Explore"} ↗</a>}
              </div>
            </div>
          </div>;
        })}
      </div>
      {items.length > 1 && <div className="afm__pager">
        <button type="button" aria-label="Previous advertisement" onClick={() => setIndex((current + items.length - 1) % items.length)}>↑</button>
        <span>{current + 1} / {items.length}</span>
        {!motionReduced && <button type="button" className="afm__pause" aria-label={paused ? "Resume advertisements" : "Pause advertisements"} onClick={() => setPaused(value => !value)}>{paused ? "Play" : "Pause"}</button>}
        <button type="button" aria-label="Next advertisement" onClick={() => setIndex((current + 1) % items.length)}>↓</button>
      </div>}
    </aside>
  );
}
