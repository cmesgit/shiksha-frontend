import { useEffect, useRef } from "react";
import { useHomeContent } from "../../hooks/useHomeContent";
import CtaLink from "./CtaLink";

/* Section-scoped styles, ported from the design handoff's BrowseCategories.jsx —
   shared tokens (--peach, --coral, --sh-sm, .sec/.wrap/.sec-head/.btn, etc.)
   come from ShikshaHome.css, imported once by the homepage composer. */
const css = `.cats{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.cat{background:#fff;border-radius:24px;overflow:hidden;box-shadow:var(--sh-sm);transition:transform .3s,box-shadow .3s;display:flex;flex-direction:column;position:relative}
.cat:hover{transform:translateY(-8px);box-shadow:var(--sh-lg)}
.cat-head{padding:26px 24px 24px;color:#fff;position:relative;overflow:hidden}
.cat-head::before{content:"";position:absolute;top:-50px;right:-40px;width:170px;height:170px;border-radius:50%;background:rgba(255,255,255,.09);pointer-events:none}
.cat-head::after{content:"";position:absolute;bottom:-40px;left:-30px;width:110px;height:110px;border-radius:50%;background:rgba(255,255,255,.07);pointer-events:none}
.cat-head-row{display:flex;align-items:center;gap:14px;position:relative;z-index:1}
.cat-ic{width:52px;height:52px;border-radius:14px;background:rgba(255,255,255,.22);display:grid;place-items:center;flex:none;backdrop-filter:blur(4px)}
.cat-ic svg{width:26px;height:26px;color:#fff}
.cat-head b{display:block;font-family:var(--display);font-size:19px;font-weight:700;color:#fff;line-height:1.2;letter-spacing:-.01em}
.cat-head i{font-style:normal;display:block;margin-top:4px;font-size:12.5px;font-weight:500;color:rgba(255,255,255,.9);letter-spacing:.01em}
.cat-body{padding:22px 22px 22px;display:flex;flex-direction:column;flex:1;gap:16px}
.cat-pills{display:flex;flex-wrap:wrap;gap:6px}
.cat-pill{background:var(--peach);color:var(--ink-2);font-family:var(--font);font-size:11.5px;font-weight:600;padding:6px 11px;border-radius:999px;line-height:1}
.cat-stat{display:flex;align-items:center;gap:8px;font-size:12.8px;color:var(--body);font-weight:500}
.cat-stat svg{width:14px;height:14px;color:var(--coral);flex:none}
.cat-cta{margin-top:auto;background:var(--ink);color:#fff;padding:13px 18px;border-radius:12px;font-family:var(--font);font-weight:700;font-size:13.5px;display:flex;align-items:center;justify-content:center;gap:8px;transition:background .25s,transform .2s;cursor:pointer;border:none;width:100%}
.cat-cta svg{width:14px;height:14px;transition:transform .2s}
.cat-cta:hover{background:var(--coral);transform:translateY(-2px)}
.cat-cta:hover svg{transform:translateX(3px)}
.cat-cta:focus-visible{outline:3px solid var(--coral);outline-offset:2px}
.g-green{background:linear-gradient(135deg,#12b47a 0%,#0B5B3E 100%)}
.g-warm{background:linear-gradient(135deg,#F59E0B 0%,#E14D2A 100%)}
.g-cool{background:linear-gradient(135deg,#7C5CFC 0%,#12b3a6 100%)}
@media(max-width:980px){
  .cats{grid-template-columns:repeat(3,1fr)}
}
@media(max-width:620px){
  .cats{grid-template-columns:1fr}
}`;

// Icon glyphs used by the default 3 cards, extracted verbatim from the
// design handoff's `.cat-ic` spans. Keyed to match the icon strings seeded
// on HomeListItem rows, so a CMS-authored card using the same key renders
// identically.
const ICONS = {
  board: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>
  ),
  research: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /></svg>
  ),
  skills: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /><path d="M3 13h18" /></svg>
  ),
};
const FALLBACK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /></svg>
);

// Static, decorative glyphs shared by every card (not CMS-driven) — the
// checkmark next to the stat line, and the arrow inside the CTA button.
const CHECK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
);
const ARROW_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

// Maps a CMS `tint` value to one of the design's own 3 header gradients
// (`.g-green` / `.g-warm` / `.g-cool`, defined above, values unchanged from
// the handoff). The design authored these positionally (card 1/2/3), but a
// CMS-driven list needs a stable, order-independent key — so the mapping is
// keyed by the actual hue each gradient renders, not by card position:
// green stays green, "blue" picks the violet→teal cool gradient, and
// "gold" picks the amber→red warm gradient. Judgment call: this reassigns
// the header colors of cards 2 and 3 relative to the original mockup's
// left-to-right order, in exchange for tint keys that mean the same thing
// no matter how items are reordered/added in the CMS.
const TINT_TO_GRADIENT = { green: "g-green", blue: "g-cool", gold: "g-warm" };
const DEFAULT_GRADIENT = "g-green";

const DEFAULT_ITEMS = [
  { icon: "board", title: "School Education", subtitle: "Classes 8–12 · CBSE, NCERT & MBSE", pills: ["Mathematics", "Science", "English", "Social Studies"], stat_text: "Board-aligned live & recorded classes", cta_label: "Explore School Courses", cta_href: "/courses", tint: "green" },
  { icon: "research", title: "Competitive Exams", subtitle: "JEE · NEET · UPSC · Banking", pills: ["IIT-JEE", "NEET", "UPSC", "SSC"], stat_text: "Expert mentors & proven strategies", cta_label: "Start Exam Prep", cta_href: "/courses", tint: "blue" },
  { icon: "skills", title: "Skill & Career", subtitle: "Olympiads · CA · Coding & more", pills: ["Olympiads", "CA Foundation", "Coding", "Career"], stat_text: "Beyond academics — build real skills", cta_label: "View Programs", cta_href: "/courses", tint: "gold" },
];

export default function BrowseCategories() {
  const rootRef = useRef(null);
  const { block, items, floaters } = useHomeContent("browse_categories");

  const eyebrow = block?.eyebrow || "Browse Categories";
  const heading = block?.heading || "Explore our learning categories";
  const subhead = block?.subhead || "Choose the path that matches your academic goals — programs designed by experienced educators.";
  const ctaPrimaryLabel = block?.cta_primary_label || "All categories";
  const ctaPrimaryHref = block?.cta_primary_href || "/courses";
  const cards = items.length ? items : DEFAULT_ITEMS;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cleanups = [];

    // reveal on scroll
    const io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    root.querySelectorAll(".rv").forEach(function (el) { io.observe(el); });
    cleanups.push(function () { io.disconnect(); });

    return () => cleanups.forEach((fn) => fn());
  }, [cards.length]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div ref={rootRef}>
        <section className="sec peach" id="programs" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="sec-head rv">
              <span className="eyebrow"><u>{eyebrow}</u></span>
              <h2>{heading}</h2>
              <p>{subhead}</p>
            </div>
            <div className="cats">
              {cards.map((c, i) => (
                <div className="cat rv" key={c.id ?? i}>
                  <div className={`cat-head ${TINT_TO_GRADIENT[c.tint] || DEFAULT_GRADIENT}`}>
                    <div className="cat-head-row">
                      <span className="cat-ic">{ICONS[c.icon] || FALLBACK_ICON}</span>
                      <div>
                        <b>{c.title}</b>
                        <i>{c.subtitle}</i>
                      </div>
                    </div>
                  </div>
                  <div className="cat-body">
                    <div className="cat-pills">
                      {(c.pills || []).map((p, pi) => (
                        <span className="cat-pill" key={pi}>{p}</span>
                      ))}
                    </div>
                    <div className="cat-stat">
                      {CHECK_ICON}
                      {c.stat_text}
                    </div>
                    <CtaLink className="cat-cta" to={c.cta_href || "/courses"}>
                      {c.cta_label}
                      {ARROW_ICON}
                    </CtaLink>
                  </div>
                </div>
              ))}
            </div>
            <div className="center rv">
              <CtaLink className="btn btn-coral" to={ctaPrimaryHref}>
                {ctaPrimaryLabel}
                {ARROW_ICON}
              </CtaLink>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
