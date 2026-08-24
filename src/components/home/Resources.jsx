import { useEffect, useRef } from "react";
import { useHomeContent } from "../../hooks/useHomeContent";
import CtaLink from "./CtaLink";
import { sanitizeInline } from "../../utils/sanitizeInline";

/* Section-scoped styles, ported from the design handoff's Resources.jsx —
   shared tokens (--coral, --line, --sh-sm, .sec/.wrap/.sec-head/.arrow, etc.)
   come from ShikshaHome.css, imported once by the homepage composer. */
const css = `.res-card{position:relative;overflow:hidden;display:flex;flex-direction:column;background:var(--tint,#fff);border:1px solid var(--line);border-radius:20px;padding:28px 26px;box-shadow:var(--sh-sm);transition:transform .3s,box-shadow .3s,border-color .3s}
.res-card:hover{transform:translateY(-6px);box-shadow:var(--sh-lg);border-color:transparent}
.res-ic{width:56px;height:56px;border-radius:16px;display:grid;place-items:center;margin-bottom:18px;background:var(--grad,linear-gradient(135deg,#12b47a 0%,#0B5B3E 100%));transition:transform .35s cubic-bezier(.2,.7,.2,1)}
.res-ic svg{width:26px;height:26px;color:#fff}
.res-card:hover .res-ic{transform:scale(1.07) rotate(-5deg)}
.res-card h3{font-size:18.5px;font-weight:600;line-height:1.3}
.res-card p{margin-top:10px;font-size:14px;color:var(--body);margin-bottom:24px}
.res-link{margin-top:auto;width:100%;display:flex;align-items:center;justify-content:center;gap:8px;font-family:var(--font);font-weight:700;font-size:13.5px;color:#fff;background:var(--ink);padding:13px 18px;border-radius:12px;border:none;cursor:pointer;transition:background .25s,transform .2s;text-decoration:none}
.res-link svg{width:14px;height:14px;transition:transform .2s}
.res-link:hover{background:var(--coral);transform:translateY(-2px)}
.res-link:hover svg{transform:translateX(3px)}
.res-link:focus-visible{outline:3px solid var(--coral);outline-offset:2px}
.res-ic,.res-card h3,.res-card p,.res-link{position:relative;z-index:1}
.res-ghost{position:absolute;right:-28px;bottom:-30px;width:196px;height:196px;color:var(--ghost,var(--coral));pointer-events:none;z-index:0}
.res-ghost svg{width:100%;height:100%}
@media(max-width:620px){
  .res-ghost{width:158px;height:158px;right:-30px;bottom:-34px}
}
.res-rail{position:relative}
.res-scroll{
    display:flex;gap:22px;
    overflow-x:auto;scroll-behavior:smooth;
    scroll-snap-type:x mandatory;
    /* room for the -6px hover lift and the card shadow */
    padding:8px 2px 24px;
    scrollbar-width:none;-ms-overflow-style:none;
  }
.res-scroll::-webkit-scrollbar{display:none}
.res-scroll:focus-visible{outline:3px solid var(--coral);outline-offset:4px;border-radius:22px}
.res-scroll>.res-card{
    flex:0 0 calc((100% - 66px) / 4);
    min-width:0;scroll-snap-align:start;
  }
.res-nav{display:flex;justify-content:center;gap:12px;margin-top:8px}
.res-nav .arrow[disabled]{opacity:.35;cursor:default}
.res-nav .arrow[disabled]:hover{
    background:#fff;color:var(--ink);border-color:var(--line);transform:none;
  }
@media(max-width:980px){
  .res-scroll>.res-card{flex-basis:calc((100% - 22px) / 2)}
}
@media(max-width:620px){
  .res-scroll{gap:16px}
  .res-scroll>.res-card{flex-basis:100%}
}`;

// Icon glyphs used by the default 6 cards, extracted verbatim from the
// design handoff's `.res-ic` spans. Keyed to match the icon strings seeded
// on HomeListItem rows, so a CMS-authored card using the same key renders
// identically.
const ICONS = {
  forum: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
  ),
  counselling: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5" /></svg>
  ),
  skills: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.94 15.5A2 2 0 008.5 14.06l-6.13-1.58a.5.5 0 010-.96L8.5 9.94A2 2 0 009.94 8.5l1.58-6.13a.5.5 0 01.96 0L14.06 8.5A2 2 0 0015.5 9.94l6.13 1.58a.5.5 0 010 .96L15.5 14.06a2 2 0 00-1.44 1.44l-1.58 6.13a.5.5 0 01-.96 0z" /><path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" /></svg>
  ),
  placement: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
  ),
  library: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 7v14" /><path d="M3 18a1 1 0 01-1-1V4a1 1 0 011-1h5a4 4 0 014 4 4 4 0 014-4h5a1 1 0 011 1v13a1 1 0 01-1 1h-6a3 3 0 00-3 3 3 3 0 00-3-3z" /></svg>
  ),
  research: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" /></svg>
  ),
};
const FALLBACK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /></svg>
);

// Static, decorative glyphs shared by every card (not CMS-driven) — the
// large background circle motif behind each card, and the arrow inside the
// CTA link. Both are purely visual, ported verbatim from the handoff.
const GHOST_ICON = (
  <svg viewBox="0 0 200 200" fill="none"><circle cx="148" cy="152" r="66" fill="currentColor" opacity=".10" /><circle cx="148" cy="152" r="66" stroke="currentColor" strokeWidth="1.5" opacity=".16" /><circle cx="86" cy="128" r="30" stroke="currentColor" strokeWidth="1.5" opacity=".13" /><circle cx="172" cy="92" r="11" fill="currentColor" opacity=".14" /></svg>
);
const ARROW_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
const PREV_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
);
const NEXT_ICON = ARROW_ICON;

// Per-position card tint/gradient, extracted verbatim from the design
// handoff's inline `style="--grad:...;--tint:...;--ghost:..."` attributes.
// Judgment call, same as BrowseCategories/WhyShiksha: this is decorative
// styling cycled by card position, not driven by any CMS field — a 7th
// CMS-authored card just wraps back to the first look.
const CARD_STYLES = [
  { grad: "linear-gradient(135deg,#12b47a 0%,#0B5B3E 100%)", tint: "#EAF6F0", ghost: "#0B5B3E" },
  { grad: "linear-gradient(135deg,#F59E0B 0%,#E14D2A 100%)", tint: "#FDF0E6", ghost: "#E14D2A" },
  { grad: "linear-gradient(135deg,#7C5CFC 0%,#12b3a6 100%)", tint: "#EFEBFD", ghost: "#7C5CFC" },
  { grad: "linear-gradient(135deg,#3b82f6 0%,#1d4ed8 100%)", tint: "#EAF1FD", ghost: "#3b82f6" },
  { grad: "linear-gradient(135deg,#EC4E86 0%,#9D174D 100%)", tint: "#FDECF3", ghost: "#EC4E86" },
  { grad: "linear-gradient(135deg,#06B6D4 0%,#0E5F73 100%)", tint: "#E4F4FA", ghost: "#0891B2" },
];

const DEFAULT_ITEMS = [
  { icon: "forum", title: "Community Forum", body: "Connect with fellow learners, ask questions and join discussions.", cta_label: "Visit forum", cta_href: "/forum" },
  { icon: "counselling", title: "Counselling", body: "Get academic and career guidance to choose the right path.", cta_label: "Get guidance", cta_href: "/counselling" },
  { icon: "skills", title: "Skill Development", body: "Practical courses to build skills beyond the syllabus.", cta_label: "Explore skills", cta_href: "/skill-development" },
  { icon: "placement", title: "Placement & Opportunities", body: "Stay informed about placements and career opportunities.", cta_label: "View opportunities", cta_href: "/placements" },
  { icon: "library", title: "Explore Library", body: "Access notes, study materials, eBooks, previous year papers, guides and curated learning resources in one place.", cta_label: "Explore Library", cta_href: "/explore" },
  { icon: "research", title: "Research Hub", body: "Discover research papers, journals, articles, case studies and curated academic resources for deeper learning.", cta_label: "Explore Research", cta_href: "/explore?tab=research" },
];

export default function Resources() {
  const rootRef = useRef(null);
  const { block, items } = useHomeContent("resources");

  const eyebrow = block?.eyebrow || "Resources & Support";
  const heading = block?.heading || "Beyond the classroom";
  const subhead = block?.subhead || "Extra resources, guidance and opportunities to support students throughout their academic journey.";
  const cards = items.length ? items : DEFAULT_ITEMS;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cleanups = [];
    const on = (el, type, fn, opts) => {
      if (!el) return;
      el.addEventListener(type, fn, opts);
      cleanups.push(() => el.removeEventListener(type, fn, opts));
    };

    // reveal on scroll
    //
    // `.res-card` carries both `rv` and key={c.id ?? i}, so when the CMS fetch
    // resolves the key flips from the array index to a real row id and React
    // mounts *new* nodes with no `.in`, discarding the ones this observer held.
    //
    // Keying the deps on `cards.length` was not enough: prod has exactly as
    // many resources rows as DEFAULT_ITEMS has (6), so the length never changes,
    // the effect never re-runs, and the replacement nodes end up observed by
    // nobody — leaving six 305px cards at opacity:0.
    //
    // So: depend on the fetched values themselves, and don't unobserve.
    // classList.add is idempotent, so re-observing costs nothing.
    if (typeof IntersectionObserver === "undefined") {
      root.querySelectorAll(".rv").forEach((el) => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); }
        });
      }, { threshold: 0.12 });
      root.querySelectorAll(".rv").forEach(function (el) { io.observe(el); });
      cleanups.push(function () { io.disconnect(); });
    }

    // resources rail — manual navigation only (no auto-scroll)
    var rail = root.querySelector("#resScroll");
    if (rail) {
      var prev = root.querySelector("#resPrev"), next = root.querySelector("#resNext");
      function railStep() {
        var c = rail.querySelector(".res-card");
        if (!c) return 320;
        var gap = parseFloat(getComputedStyle(rail).columnGap) || 22;
        return Math.round(c.getBoundingClientRect().width + gap);
      }
      function sync() {
        var max = rail.scrollWidth - rail.clientWidth - 2;
        if (prev) prev.disabled = rail.scrollLeft <= 2;
        if (next) next.disabled = rail.scrollLeft >= max;
      }
      on(prev, "click", function () { rail.scrollBy({ left: -railStep(), behavior: "smooth" }); });
      on(next, "click", function () { rail.scrollBy({ left: railStep(), behavior: "smooth" }); });
      on(rail, "scroll", sync, { passive: true });
      on(window, "resize", sync);
      sync();
    }

    return () => cleanups.forEach((fn) => fn());
  }, [block, items]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div ref={rootRef}>
        <section className="sec" id="resources">
          <div className="wrap">
            <div className="sec-head rv">
              <span className="eyebrow"><u>{eyebrow}</u></span>
              <h2>{heading}</h2>
              <p>{subhead}</p>
            </div>

            <div className="res-rail">
              <div className="res-scroll" id="resScroll" role="region" aria-label="Beyond the classroom resources" tabIndex={0}>
                {cards.map((c, i) => {
                  const style = CARD_STYLES[i % CARD_STYLES.length];
                  return (
                    <article
                      className="res-card rv"
                      key={c.id ?? i}
                      style={{ "--grad": style.grad, "--tint": style.tint, "--ghost": style.ghost }}
                    >
                      <span className="res-ghost" aria-hidden="true">{GHOST_ICON}</span>
                      <span className="res-ic">{ICONS[c.icon] || FALLBACK_ICON}</span>
                      <h3>{c.title}</h3>
                      <p dangerouslySetInnerHTML={{ __html: sanitizeInline(c.body) }} />
                      <CtaLink className="res-link" to={c.cta_href || "#"}>
                        {c.cta_label}
                        {ARROW_ICON}
                      </CtaLink>
                    </article>
                  );
                })}
              </div>

              <div className="res-nav">
                <button className="arrow" type="button" id="resPrev" aria-label="Previous resources">{PREV_ICON}</button>
                <button className="arrow" type="button" id="resNext" aria-label="Next resources">{NEXT_ICON}</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
