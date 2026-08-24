import { useEffect, useRef } from "react";
import { useHomeContent } from "../../hooks/useHomeContent";
import CtaLink from "./CtaLink";
import { sanitizeInline } from "../../utils/sanitizeInline";

/* Section-scoped styles, ported from the design handoff's TeachersStudents.jsx —
   shared tokens/classes (--coral, .sec, .peach, .eyebrow, .em, .btn, .rv, etc.)
   come from ShikshaHome.css, imported once by the homepage composer. */
const css = `.duo{display:grid;grid-template-columns:1fr 1fr;gap:26px}
.duo-card{background:#fff;border-radius:24px;padding:52px 40px 46px;text-align:center;display:flex;flex-direction:column;align-items:center;box-shadow:var(--sh-sm);transition:transform .3s,box-shadow .3s;position:relative;overflow:hidden;border:1px solid transparent}
.duo-card:hover{transform:translateY(-6px);box-shadow:var(--sh)}
.duo-card.teach{background:linear-gradient(160deg,#FFF9E6 0%,#FDEFC1 100%);border-color:rgba(255,178,29,.22)}
.duo-card.learn{background:linear-gradient(160deg,#EDFBF3 0%,#D9F1E1 100%);border-color:rgba(15,157,107,.22)}
.duo-card::before{content:"";position:absolute;inset:0;background-image:radial-gradient(circle at center,rgba(11,46,32,.08) 1.1px,transparent 1.6px);background-size:22px 22px;pointer-events:none;z-index:0}
.duo-ghost{position:absolute;right:-42px;bottom:-42px;width:230px;height:230px;opacity:.07;pointer-events:none;z-index:0}
.duo-card.teach .duo-ghost{color:#B45309}
.duo-card.learn .duo-ghost{color:var(--coral-dark)}
.duo-ghost svg{width:100%;height:100%}
.duo-pill{position:relative;z-index:1;display:inline-block;font-family:var(--font);font-weight:700;font-size:11px;letter-spacing:.14em;text-transform:uppercase;padding:6px 14px;border-radius:999px;margin-bottom:20px}
.duo-card.teach .duo-pill{background:rgba(255,178,29,.18);color:#8A4A05}
.duo-card.learn .duo-pill{background:rgba(15,157,107,.14);color:var(--coral-dark)}
.duo-ill,.duo-card h3,.duo-card p,.duo-card .btn{position:relative;z-index:1}
.duo-ill{width:88px;height:88px;margin-bottom:22px;opacity:.95}
.duo-card.teach .duo-ill{color:#8A4A05}
.duo-card.learn .duo-ill{color:var(--coral-dark)}
.duo-ill svg{width:100%;height:100%}
.duo-card h3{font-size:24px;font-weight:700}
.duo-card p{margin-top:12px;font-size:14.5px;color:var(--body);max-width:340px}
.duo-card .btn{margin-top:26px}
@media(max-width:620px){
  .duo{grid-template-columns:1fr}
}`;

// Per-card illustration + watermark SVGs, extracted verbatim from the design
// handoff. HomeListItem has no per-item image field, so these stay static
// assets keyed to card POSITION (0 = teach, 1 = learn) rather than to CMS
// content — the design's layout is a fixed 2-card duo, not a repeating list.
const DUO_GHOST = [
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M50 20 L92 40 L50 60 L8 40 Z" /><path d="M22 50 v18 c0 4 12 10 28 10 s28 -6 28 -10 v-18" /><path d="M88 44 v22" /><path d="M86 66 c-1 4 -3 4 -4 0" /></svg>,
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="14" y="66" width="72" height="14" rx="3" /><rect x="20" y="48" width="60" height="14" rx="3" /><rect x="26" y="30" width="48" height="14" rx="3" /><path d="M32 37 h6 M32 55 h6 M32 73 h6" /></svg>,
];
const DUO_ILL = [
  <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="40" y="16" width="42" height="32" rx="4" /><path d="M48 41l6-8 5 5 9-12" /><path d="M61 48v8" /><path d="M52 68l9-12 9 12" /><circle cx="24" cy="32" r="8" /><path d="M12 70c0-10 5-18 12-18s12 8 12 18" /><path d="M33 47l9-6" /></svg>,
  <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M48 30v46" /><path d="M48 30C40 24 28 22 18 25v42c10-3 22-1 30 5" /><path d="M48 30c8-5 20-7 30-5v42c-10-2-22 0-30 5" /><path d="M25 37c5-1 11 0 15 3M25 47c5-1 11 0 15 3" /><path d="M56 40c5-3 11-4 15-3M56 50c5-3 11-4 15-3" /></svg>,
];
const ARROW = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

// Card chrome (variant class, pill label, button style) is also tied to
// POSITION — HomeListItem has no fields for these either, and the design's
// two cards always render as "teach" (amber) then "learn" (green).
const DUO_META = [
  { cardClass: "teach", pill: "For Educators", btnClass: "btn-ghost" },
  { cardClass: "learn", pill: "For Learners", btnClass: "btn-coral" },
];

const DEFAULT_ITEMS = [
  { icon: "faculty", title: "Do you want to teach here?", body: "Share your knowledge, create and upload your own courses, teach live or record lessons, and reach learners across the country.", cta_label: "Become a tutor", cta_href: "/faculty/signup", tint: "violet" },
  { icon: "book", title: "Do you want to learn here?", body: "Preview courses as a guest, enrol in structured programs for your class or exam, and learn with live classes, recordings and doubt support.", cta_label: "Start learning", cta_href: "/courses", tint: "green" },
];

export default function TeachersStudents() {
  const rootRef = useRef(null);
  const { block, items } = useHomeContent("teachers_students");

  const eyebrow = block?.eyebrow || "Teachers & Students";
  const heading = block?.heading || "What are you looking for?";

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    // No IntersectionObserver (or an environment that never fires it) must not
    // leave the cards at opacity:0 — same guard as About2.jsx / home/Faq.jsx.
    if (typeof IntersectionObserver === "undefined") {
      root.querySelectorAll(".rv").forEach((el) => el.classList.add("in"));
      return undefined;
    }

    // reveal on scroll
    //
    // The two duo-cards are keyed `item.id ?? i` (below), so when the CMS fetch
    // resolves their key flips from the array index to a real row id and React
    // mounts *new* DOM nodes. Those arrive as "duo-card … rv" with no `.in`,
    // and the originals — which this observer was holding — are thrown away.
    //
    // With `[]` deps and an unobserve-on-reveal observer, nothing ever looked at
    // the replacement nodes and both cards sat at opacity:0 forever on prod,
    // taking 472px of blank space each. The section heading escaped it only
    // because it has no key and is never remounted.
    //
    // So: don't unobserve, and re-run when the fetched content changes so the
    // replacement nodes get observed. classList.add is idempotent, so
    // re-observing an already-revealed element costs nothing.
    const io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); }
      });
    }, { threshold: 0.12 });
    root.querySelectorAll(".rv").forEach(function (el) { io.observe(el); });

    return () => io.disconnect();
  }, [block, items]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div ref={rootRef}>
        <section className="sec peach">
          <div className="wrap">
            <div className="sec-head rv">
              <span className="eyebrow"><u>{eyebrow}</u></span>
              <h2>{heading}</h2>
            </div>
            <div className="duo">
              {[0, 1].map((i) => {
                const item = items[i] || DEFAULT_ITEMS[i];
                const meta = DUO_META[i];
                return (
                  <div className={`duo-card ${meta.cardClass} rv`} key={item.id ?? i}>
                    <span className="duo-ghost" aria-hidden="true">{DUO_GHOST[i]}</span>
                    <span className="duo-pill">{meta.pill}</span>
                    <div className="duo-ill">{DUO_ILL[i]}</div>
                    <h3>{item.title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: sanitizeInline(item.body) }} />
                    <CtaLink className={`btn ${meta.btnClass}`} to={item.cta_href || "#"}>
                      {item.cta_label}
                      {ARROW}
                    </CtaLink>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
