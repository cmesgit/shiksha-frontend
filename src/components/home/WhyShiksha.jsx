import { useEffect, useRef } from "react";
import { useHomeContent } from "../../hooks/useHomeContent";
import { sanitizeInline } from "../../utils/sanitizeInline";

/* Section-scoped styles, ported from the design handoff's WhyShiksha.jsx —
   shared tokens (--peach, --coral, etc.) come from ShikshaHome.css,
   imported once by the homepage composer. */
const css = `.deals{display:grid;grid-template-columns:290px 1fr;gap:44px;align-items:center}
.deals-head h2{font-size:clamp(26px,3.4vw,36px);font-weight:700}
.deals-head p{margin-top:14px;color:var(--body);font-size:15px;max-width:260px}
.deals-arrows{margin-top:26px;display:flex;gap:12px}
.deals-scroll{display:flex;gap:20px;overflow-x:auto;scroll-behavior:smooth;padding:6px 2px 16px;scroll-snap-type:x mandatory;min-width:0}
.deals-scroll::-webkit-scrollbar{height:6px}
.deals-scroll::-webkit-scrollbar-track{background:var(--peach);border-radius:9px}
.deals-scroll::-webkit-scrollbar-thumb{background:var(--peach-2);border-radius:9px}
.deal{flex:0 0 calc((100% - 40px) / 3);min-width:0;scroll-snap-align:start;background:var(--peach);border-radius:20px;padding:28px 26px;transition:transform .3s,box-shadow .3s,background .3s}
.deal:hover{transform:translateY(-6px);background:#fff;box-shadow:var(--sh)}
.deal-ic{width:56px;height:56px;border-radius:16px;display:grid;place-items:center;margin-bottom:18px}
.deal-ic svg{width:27px;height:27px;color:#fff}
.deal h3{font-size:18.5px;font-weight:600}
.deal p{margin-top:10px;font-size:14px;color:var(--body)}
@media(max-width:980px){
  .deals{grid-template-columns:1fr;gap:26px}
  .deals-head p{max-width:none}
  .deal{flex-basis:calc((100% - 20px) / 2)}
}
@media(max-width:620px){
  .deal{flex-basis:100%}
}`;

// Icon glyphs used by the default 6 cards, extracted verbatim from the
// design handoff. Keyed to match the icon strings seeded on HomeListItem
// rows, so a CMS-authored card using the same key renders identically.
const ICONS = {
  live: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.55-2.28A1 1 0 0121 8.62v6.76a1 1 0 01-1.45.9L15 14M5 6h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" /></svg>
  ),
  faculty: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
  ),
  board: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
  ),
  flexible: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg>
  ),
  guest: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
  ),
  guidance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
  ),
};
const FALLBACK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /></svg>
);

// Tint cycle matching the design's original per-card colors (card 1 and 3
// share the same brand green on purpose — --coral and --green are the same
// token value). Used whenever a card has no explicit `tint`.
const DEFAULT_TINT_CYCLE = ["coral", "blue", "green", "violet", "gold", "pink"];
const TINT_VAR = { coral: "--coral", green: "--green", blue: "--blue", violet: "--violet", red: "--red", gold: "--gold", pink: "--pink", teal: "--teal" };

const DEFAULT_ITEMS = [
  { icon: "live", title: "Live & recorded classes", body: "Attend interactive live classes or revisit recorded lessons and revise at your own pace." },
  { icon: "faculty", title: "Expert faculty", body: "Learn from experienced educators and subject mentors who know the syllabus inside out." },
  { icon: "board", title: "Board & exam focused", body: "Courses aligned to CBSE, NCERT and MBSE, plus tracks for national competitive exams." },
  { icon: "flexible", title: "Flexible learning", body: "Study anytime, anywhere, on any device — phone, tablet or computer." },
  { icon: "guest", title: "Guest preview", body: "Explore lessons and course structure before you enrol — no sign-up required." },
  { icon: "guidance", title: "Personal guidance", body: "Book one-on-one sessions and clear doubts on a schedule that works for you." },
];

export default function WhyShiksha() {
  const rootRef = useRef(null);
  const { block, items } = useHomeContent("why_shiksha");

  const heading = block?.heading || "Why learners choose Shiksha";
  const subhead = block?.subhead || "Everything a student needs to learn, practise and grow — in one place.";
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

    const io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    root.querySelectorAll(".rv").forEach(function (el) { io.observe(el); });
    cleanups.push(function () { io.disconnect(); });

    var deals = root.querySelector("#deals");
    if (deals) {
      var autoTimer = null, resumeTimer = null;
      var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      function step() { var c = deals.querySelector(".deal"); return c ? Math.round(c.getBoundingClientRect().width) + 20 : 310; }
      function advance() {
        var maxLeft = deals.scrollWidth - deals.clientWidth - 2;
        if (deals.scrollLeft >= maxLeft) { deals.scrollTo({ left: 0, behavior: "smooth" }); }
        else { deals.scrollBy({ left: step(), behavior: "smooth" }); }
      }
      function startAuto() { if (reduceMotion || autoTimer) return; autoTimer = setInterval(advance, 3200); }
      function stopAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }
      function pauseAuto() { stopAuto(); clearTimeout(resumeTimer); resumeTimer = setTimeout(startAuto, 6000); }
      on(root.querySelector("#dPrev"), "click", function () { pauseAuto(); deals.scrollBy({ left: -step(), behavior: "smooth" }); });
      on(root.querySelector("#dNext"), "click", function () { pauseAuto(); deals.scrollBy({ left: step(), behavior: "smooth" }); });
      on(deals, "mouseenter", stopAuto);
      on(deals, "mouseleave", startAuto);
      on(deals, "touchstart", pauseAuto, { passive: true });
      startAuto();
      cleanups.push(function () { stopAuto(); clearTimeout(resumeTimer); });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [cards.length]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div ref={rootRef}>
        <section className="sec" style={{ paddingTop: "clamp(30px,4vw,54px)" }}>
          <div className="wrap">
            <div className="deals">
              <div className="deals-head rv">
                <h2>{heading}</h2>
                <p>{subhead}</p>
                <div className="deals-arrows">
                  <button className="arrow" id="dPrev" aria-label="Previous"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg></button>
                  <button className="arrow" id="dNext" aria-label="Next"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
                </div>
              </div>
              <div className="deals-scroll rv" id="deals">
                {cards.map((c, i) => (
                  <div className="deal" key={c.id ?? i}>
                    <span className="deal-ic" style={{ background: `var(${TINT_VAR[c.tint] || TINT_VAR[DEFAULT_TINT_CYCLE[i % DEFAULT_TINT_CYCLE.length]]})` }}>
                      {ICONS[c.icon] || FALLBACK_ICON}
                    </span>
                    <h3>{c.title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: sanitizeInline(c.body) }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
