import { useEffect, useState } from "react";
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

const ROTATE_MS = 5000;

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
export function AuthTickerCard({ slot, variant = "rotate" }) {
  const { items: all } = useTickerSlot(slot);
  const [i, setI] = useState(0);

  /* Mentor items are consumed by <AuthMentors> in the form column, so they
     are excluded here — otherwise the same mentor appears twice on one
     screen, once as a ticker line and once as their own card. Both
     components read the same slot; this is what divides it between them. */
  const items = all.filter((it) => it.kind !== "mentor_spotlight");
  const n = items.length;
  useEffect(() => {
    if (variant !== "rotate" || n < 2 || reduced()) return undefined;
    const id = setInterval(() => {
      if (document.visibilityState === "visible") setI((x) => (x + 1) % n);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [variant, n]);

  if (!n) return null;

  if (variant === "list") {
    return (
      <div className="aft">
        <span className="aft__label">Happening now</span>
        <ul className="aft__list">
          {items.slice(0, 3).map((it) => (
            <li key={it.id} className="aft__line">{it.message}</li>
          ))}
        </ul>
      </div>
    );
  }

  const it = items[i < n ? i : 0];   // clamped at render, never via an effect
  return (
    <div className={`aft${it.img ? " aft--banner" : ""}`}>
      {/* A picture makes this a banner rather than a text card: it spans the
          panel edge to edge above the copy, and rotates on the same timer as
          everything else, so uploading N images to this slot gives N banners
          cycling every 5s. Items with no picture keep the text treatment. */}
      {it.img && <img className="aft__img" src={it.img} alt="" />}
      <div className="aft__head">
        <span className="aft__label">{KIND_LABEL[it.kind] || "Latest"}</span>
        {n > 1 && <span className="aft__count">{(i % n) + 1}/{n}</span>}
      </div>
      <p className="aft__text">{it.message}</p>
      {it.link_url && it.link_label && (
        <span className="aft__link">{it.link_label} →</span>
      )}
    </div>
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
