import { homeField } from "../../content/homeDisplay";
import { useEffect, useRef, useState } from "react";
import { getDemoVideos } from "../../api/contentApi";
import { useHomeContent } from "../../hooks/useHomeContent";
import CtaLink from "./CtaLink";
import { PLAY_DEMO_EVENT } from "./DemoVideoButton";

/* Illustrative only (hero visual v3 — floating stack + orbit). These numbers
   and feed entries are NOT wired to any backend data source on purpose: the
   platform has no public endpoint for aggregate counts or a cross-entity
   "recently published" feed, and adding one was explicitly out of scope for
   this pass. Treat every value here as marketing dressing, not a claim about
   real counts — same spirit as the design mockup's own hardcoded numbers. */
const HERO_STATS = [
  { key: "teachers", label: "Teachers", to: 1240, delta: "18 new" },
  { key: "courses", label: "Courses", to: 386, delta: "7 new" },
  { key: "quizzes", label: "Quizzes", to: 5.2, dec: 1, suffix: "k", delta: "42 new" },
];

const HERO_FEED = [
  { icon: "tutor", title: "Dr. Lalrinpuii joined", sub: "Physics · IIT-JEE & Class 12 mentor", tag: "New tutor", tagClass: "g" },
  { icon: "course", title: "Class 10 Science — MBSE", sub: "Full syllabus · 84 lessons + 12 live", tag: "New course", tagClass: "b" },
  { icon: "doc", title: "Trigonometry formula sheet", sub: "PDF · Class 11 Maths · 6 pages", tag: "Material", tagClass: "o" },
  { icon: "quiz", title: "Organic Chemistry: Set 12", sub: "25 questions · 30 min · NEET", tag: "New quiz", tagClass: "v" },
  { icon: "live", title: "Cell Biology doubt session", sub: "Starts in 20 min · 214 seats left", tag: "Live", tagClass: "g" },
  { icon: "tutor", title: "Amit Deka joined", sub: "Mathematics · 9 years teaching", tag: "New tutor", tagClass: "g" },
  { icon: "course", title: "UPSC Prelims crash course", sub: "Live + recorded · 60-day track", tag: "New course", tagClass: "b" },
  { icon: "doc", title: "NCERT Class 9 notes bundle", sub: "12 chapters · updated for 2026", tag: "Material", tagClass: "o" },
];

const ROLLER_WORDS = ["new courses", "new teachers", "study material", "fresh quizzes"];

const ICON_ATTRS = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" };

const FEED_ICONS = {
  tutor: <svg {...ICON_ATTRS}><path d="M15 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20" /><circle cx="8.5" cy="7" r="3.6" /><path d="M19 8v6M22 11h-6" /></svg>,
  course: <svg {...ICON_ATTRS}><rect x="2.6" y="4.4" width="18.8" height="15.2" rx="3" /><path d="m10.2 9.4 4.6 2.6-4.6 2.6Z" /></svg>,
  doc: <svg {...ICON_ATTRS}><path d="M14 2.6H7a2 2 0 0 0-2 2v14.8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.6Z" /><path d="M14 2.6v5h5" /><path d="M9 13h6M9 17h4" /></svg>,
  quiz: <svg {...ICON_ATTRS}><circle cx="12" cy="12" r="9.2" /><path d="M9.6 9.4a2.5 2.5 0 1 1 3.3 2.4c-.6.2-.9.8-.9 1.4v.4" /><path d="M12 17.2h.01" /></svg>,
  live: <svg {...ICON_ATTRS}><path d="M15 10.2 20.4 7.4a.8.8 0 0 1 1.2.7v7.8a.8.8 0 0 1-1.2.7L15 13.8" /><rect x="2.4" y="5.6" width="12.6" height="12.8" rx="2.6" /></svg>,
};
const ICON_CAP = <svg {...ICON_ATTRS}><path d="M12 3.3 2.5 8.1 12 12.9l9.5-4.8Z" /><path d="M6.5 10.4v4.8c0 1.7 2.5 3.1 5.5 3.1s5.5-1.4 5.5-3.1v-4.8" /><path d="M21.5 8.1v5.6" /></svg>;
const ICON_CERT = <svg {...ICON_ATTRS}><circle cx="12" cy="9" r="5.3" /><path d="m8.7 13.4-1.2 7.3 4.5-2.6 4.5 2.6-1.2-7.3" /></svg>;
const ICON_UP = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="m5 15 7-7 7 7" /></svg>;

function formatStat(n, dec, suffix) {
  const body = dec ? n.toFixed(dec) : Math.round(n).toLocaleString("en-IN");
  return `${body}${suffix || ""}`;
}

/* Counts up once the stat scrolls into view, same easing/duration as the
   design mockup's own vanilla-JS version. Renders the final value immediately
   under prefers-reduced-motion or without IntersectionObserver support. */
function StatValue({ to, dec, suffix, className }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(() => formatStat(0, dec, suffix));

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setDisplay(formatStat(to, dec, suffix));
      return undefined;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const dur = 1500;
        const tick = (t) => {
          const p = Math.min((t - start) / dur, 1);
          const eased = 1 - (1 - p) ** 3;
          setDisplay(formatStat(to * eased, dec, suffix));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, dec, suffix]);

  return <span ref={ref} className={className}>{display}</span>;
}

/* Section-scoped styles, ported from the design handoff's Hero.jsx —
   shared tokens (--wash, --brand, etc.) come from ShikshaHome.css,
   imported once by the homepage composer. */
const css = `.sh-hero{
    font-family:var(--sans);
    color:var(--ink);
    line-height:1.7;
    -webkit-font-smoothing:antialiased;
    text-rendering:optimizeLegibility;
    /* brand green, carried over */
    --brand:#0F9D6B;
    --brand-2:#12B47A;
    --brand-deep:#0B5B3E;
    --brand-darker:#094B33;
    --wash:#EAF7F0;          /* pale green section wash */
    --wash-2:#D8F0E4;
    --gold:#FFB21D;

    --ink:#0C2620;           /* headings */
    --body:#5A7268;          /* paragraphs */
    --line:#E4EEE8;

    --white:#fff;

    --display:'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    --sans:'Inter', system-ui, -apple-system, sans-serif;

    --r-pill:999px;
    --r-card:18px;

    --sh-card:0 10px 30px -8px rgba(12,38,32,.14);

    --wrap:1200px;
  }
.sh-hero{
    position:relative;isolation:isolate;
    background:
      radial-gradient(1100px 620px at 88% -8%, var(--wash) 0%, rgba(234,247,240,0) 62%),
      linear-gradient(180deg,#F7FCF9 0%, var(--white) 58%);
    overflow:hidden;
  }
.sh-deco{position:absolute;inset:0;z-index:-1;pointer-events:none;overflow:hidden}
.sh-dots{
    position:absolute;width:190px;height:190px;
    background-image:radial-gradient(var(--wash-2) 2px, transparent 2px);
    background-size:18px 18px;
  }
.sh-dots.sh-a{left:-26px;bottom:64px}
.sh-dots.sh-b{right:6%;top:38px;width:140px;height:140px;opacity:.8}
.sh-ring{
    position:absolute;border-radius:50%;
    border:1.5px dashed #BFE3D0;
  }
.sh-ring.sh-a{width:118px;height:118px;left:46%;top:26px;opacity:.75}
.sh-squiggle{position:absolute;left:38%;bottom:46px;width:104px;color:var(--gold);opacity:.75}
.sh-squiggle svg{width:100%;height:auto;overflow:visible}
.sh-wrap{width:min(var(--wrap),100% - 48px);margin-inline:auto}
.sh-hero-grid{
    display:grid;
    grid-template-columns:1.04fr 1fr;
    gap:clamp(30px,4vw,60px);
    align-items:center;
    padding-block:clamp(52px,7.5vh,96px);
  }
.sh-hero-copy{min-width:0;position:relative}
.sh-hero-copy-content{transition:opacity .2s ease}
.sh-hero-copy[aria-busy="true"] .sh-hero-copy-content{opacity:0}
.sh-hero-placeholder{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;gap:18px;pointer-events:none}
.sh-hero-placeholder span{height:32px;width:85%;border-radius:8px;background:var(--wash-2)}
.sh-hero-placeholder span:first-child{height:20px;width:30%}
.sh-hero-placeholder span:last-child{width:60%}
.sh-hero-demo-slot{min-height:44px}
@media(max-width:980px){.sh-hero-placeholder{align-items:center}}

.sh-badge{
    display:inline-flex;align-items:center;gap:9px;
    background:var(--wash);color:var(--brand-deep);
    border:1px solid #CFEADB;
    font-size:13px;font-weight:600;letter-spacing:.01em;
    padding:8px 16px 8px 12px;border-radius:var(--r-pill);
  }
.sh-badge i{
    width:7px;height:7px;border-radius:50%;background:var(--brand);
    box-shadow:0 0 0 4px rgba(15,157,107,.18);
  }
.sh-hero-title{
    margin-top:20px;
    font-family:var(--display);
    letter-spacing:-.02em;
  }
.sh-lead{
    display:block;
    font-size:clamp(28px,3.2vw,42px);
    font-weight:800;
    line-height:1.16;
    letter-spacing:-.028em;
    color:var(--ink);
  }
.sh-punch{
    display:block;
    margin-top:.02em;
    font-size:clamp(46px,4.4vw,60px);
    font-weight:800;
    line-height:1.14;
    letter-spacing:-.035em;
    padding-bottom:.09em;
    white-space:nowrap;
    color:var(--brand);            /* fallback if clip:text is unsupported */
  }
@supports ((-webkit-background-clip:text) or (background-clip:text)){
  .sh-punch{
      background-image:linear-gradient(118deg,var(--brand-2) 0%,var(--brand) 40%,var(--brand-deep) 100%);
      -webkit-background-clip:text;background-clip:text;
      -webkit-text-fill-color:transparent;
    }
}
.sh-hero-sub{
    margin-top:22px;max-width:33em;
    font-size:clamp(15.5px,1.1vw,17px);color:var(--body);
  }
.sh-cta-row{display:flex;flex-wrap:wrap;gap:14px;margin-top:34px}
/* Secondary route to the demo, for visitors who never notice the floating
   button. A real <button>, not a link: it opens a player in place and goes
   nowhere, so an <a href="#"> would lie to the status bar and to assistive
   tech. Renders only when a demo actually exists. */
.sh-hero-demo{
    display:inline-flex;align-items:center;gap:8px;margin-top:18px;
    padding:0;border:0;background:none;cursor:pointer;
    font-family:var(--display);font-size:14.5px;font-weight:700;
    color:var(--brand-deep);
    border-bottom:1.5px solid transparent;
    position:relative;z-index:2;
  }
.sh-hero-demo svg{width:17px;height:17px;flex:0 0 auto}
.sh-hero-demo:hover{border-bottom-color:currentColor}
.sh-hero-demo:focus-visible{outline:2px solid var(--brand-deep);outline-offset:3px;border-radius:3px}
.sh-btn{
    display:inline-flex;align-items:center;justify-content:center;gap:10px;
    font-family:var(--display);font-size:15px;font-weight:700;
    padding:15px 28px;border-radius:var(--r-pill);
    border:1.6px solid transparent;cursor:pointer;
    transition:transform .18s ease, box-shadow .18s ease, background .18s ease, border-color .18s ease;
  }
.sh-btn svg{width:17px;height:17px;transition:transform .18s ease}
.sh-btn-primary{
    background:linear-gradient(135deg,var(--brand-2),var(--brand-deep));
    color:#fff;
  }
.sh-btn-primary:hover{transform:translateY(-2px)}
.sh-btn-primary:hover svg{transform:translateX(4px)}
.sh-btn-ghost{background:var(--white);color:var(--brand-deep);border-color:#CFEADB}
.sh-btn-ghost:hover{background:var(--gold);border-color:var(--gold);color:#fff;transform:translateY(-2px)}
.sh-btn-ghost:hover svg{color:#fff}
.sh-btn:focus-visible{outline:3px solid rgba(15,157,107,.45);outline-offset:3px}

/* ============================================================
   Hero visual v3 — floating stack. Three loosely tilted cards
   (brand / stats / feed) ride a decorative orbiting ring of
   subject icons. Everything here is illustrative — see the
   HERO_STATS / HERO_FEED comment above. */
.sh-hero-visual{
    position:relative;min-width:0;
    display:flex;align-items:center;justify-content:center;
  }
.sh-stack{position:relative;width:min(100%,440px)}

.sh-sc{position:relative;background:var(--white);border:1px solid var(--line);border-radius:20px;
    box-shadow:0 2px 4px rgba(12,38,32,.035),0 26px 48px -24px rgba(12,38,32,.28)}

.sh-sc-brand{z-index:4;width:78%;padding:11px 15px;display:flex;align-items:center;gap:11px;
    border-radius:16px;transform:rotate(-2.1deg);
    background:linear-gradient(118deg,rgba(255,150,20,.075),rgba(255,178,29,.028) 52%,var(--white) 88%),var(--white);
    border-color:rgba(196,120,10,.13)}
.sh-sc-brand .sh-mark{width:34px;height:34px;object-fit:contain;flex:none;border-radius:8px}
.sh-sc-brand .sh-who{flex:1;min-width:0}
.sh-sc-brand b{display:block;font-family:var(--display);font-size:14px;font-weight:700;line-height:1.3;color:var(--ink)}
.sh-sc-brand em{display:block;font-style:normal;font-size:11.5px;color:var(--body);line-height:1.3}
.sh-live{flex:none;display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:700;
    color:var(--brand-deep);background:var(--white);border:1px solid rgba(15,157,107,.24);padding:5px 11px;border-radius:999px}
.sh-live i{width:6px;height:6px;border-radius:50%;background:var(--brand);animation:pulse 2s ease-out infinite}

.sh-sc-stats{z-index:3;width:94%;margin:16px 0 0 auto;padding:15px 17px;transform:rotate(1.4deg);
    background:linear-gradient(118deg,rgba(112,78,246,.07),rgba(124,92,252,.025) 54%,var(--white) 90%),var(--white);
    border-color:rgba(86,59,196,.12)}
.sh-st{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.sh-st-i{min-width:0;padding-top:9px;border-top:2.5px solid var(--line)}
.sh-st-i:nth-child(1){border-top-color:var(--brand)}
.sh-st-i:nth-child(2){border-top-color:#4C93FF}
.sh-st-i:nth-child(3){border-top-color:var(--gold)}
.sh-s-k{display:block;font-size:11.5px;font-weight:500;color:var(--body);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sh-s-v{display:block;margin-top:1px;font-family:var(--display);font-size:25px;font-weight:800;
    letter-spacing:-.032em;line-height:1.1;font-variant-numeric:tabular-nums}
.sh-s-d{display:inline-flex;align-items:center;gap:3px;font-size:11px;font-weight:600;color:var(--brand)}
.sh-s-d svg{width:10px;height:10px}

.sh-sc-feed{z-index:2;width:100%;margin-top:18px;padding:14px 12px 10px;transform:rotate(-1deg)}
.sh-feed-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:0 4px 6px}
.sh-fh-l{display:flex;align-items:center;gap:6px;font-size:12.5px;font-weight:500;color:var(--body)}
.sh-fh-r{flex:none;font-size:11px;font-weight:500;color:var(--body);white-space:nowrap}
.sh-roller{height:20px;overflow:hidden}
.sh-roller ul{margin:0;padding:0;list-style:none;animation:sh-words 13s cubic-bezier(.72,0,.24,1) infinite}
.sh-roller li{height:20px;line-height:20px;white-space:nowrap;font-family:var(--display);font-weight:700;font-size:13px;color:var(--brand-deep)}
@keyframes sh-words{0%,17%{transform:translateY(0)}25%,42%{transform:translateY(-20px)}
    50%,67%{transform:translateY(-40px)}75%,92%{transform:translateY(-60px)}100%{transform:translateY(-80px)}}

.sh-feed{position:relative;height:226px;overflow:hidden;
    -webkit-mask-image:linear-gradient(180deg,transparent 0,#000 8%,#000 86%,transparent 100%);
            mask-image:linear-gradient(180deg,transparent 0,#000 8%,#000 86%,transparent 100%)}
.sh-feed-track{position:relative;animation:sh-feedscroll 34s linear infinite;will-change:transform}
.sh-feed:hover .sh-feed-track,.sh-feed:focus-within .sh-feed-track{animation-play-state:paused}
@keyframes sh-feedscroll{from{transform:translateY(0)}to{transform:translateY(-50%)}}
.sh-feed-track::before{content:"";position:absolute;left:22px;top:6px;bottom:6px;width:1.5px;background:var(--line)}
.sh-feed-item{position:relative;display:flex;align-items:center;gap:12px;padding:9px 6px;margin-bottom:6px;
    border-radius:12px;transition:background .2s ease}
.sh-feed-item:hover{background:var(--wash)}
.sh-f-ic{flex:none;width:32px;height:32px;border-radius:50%;display:grid;place-items:center;color:#fff;
    box-shadow:0 0 0 4px var(--white),0 4px 10px -4px rgba(12,38,32,.3)}
.sh-f-ic svg{width:15px;height:15px}
.sh-ic-tutor{background:linear-gradient(140deg,var(--brand-2),var(--brand))}
.sh-ic-course{background:linear-gradient(140deg,#5C9BFF,#2C51B0)}
.sh-ic-doc{background:linear-gradient(140deg,#FFC85C,var(--gold))}
.sh-ic-quiz{background:linear-gradient(140deg,#9279FF,#563BC4)}
.sh-ic-live{background:linear-gradient(140deg,var(--brand),var(--brand-deep))}
.sh-f-txt{flex:1;min-width:0}
.sh-f-txt b{display:block;font-family:var(--display);font-size:13.2px;font-weight:700;line-height:1.35;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--ink)}
.sh-f-txt span{display:block;font-size:11.5px;color:var(--body);line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sh-f-tag{flex:none;font-size:10.5px;font-weight:600;color:var(--brand-deep)}
.sh-f-tag.b{color:#2C51B0}
.sh-f-tag.o{color:#8A5D00}
.sh-f-tag.v{color:#563BC4}

/* ------------------------------------------------------------------
   Orbit — hairline rings behind the stack, with subject-icon cards
   riding the middle one. .sh-spin turns the whole ring; each card is
   placed with rotate(angle) translate(radius) rotate(-angle) so its
   own axes stay level, and .sh-sat-in counter-turns at the same speed
   so the icons never tip over.
   ------------------------------------------------------------------ */
.sh-orbit{position:absolute;left:50%;top:50%;width:0;height:0;z-index:0;--r:min(290px,22vw);--spin:46s}
.sh-orb-ring{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
    border-radius:50%;border:1px solid rgba(12,38,32,.07);aspect-ratio:1}
.sh-orb-ring-1{width:calc(var(--r)*2 - 170px);border-color:rgba(12,38,32,.05)}
.sh-orb-ring-2{width:calc(var(--r)*2);border-style:dashed;border-color:rgba(15,157,107,.22)}
.sh-orb-ring-3{width:calc(var(--r)*2 + 180px)}

.sh-spin{position:absolute;left:0;top:0;width:0;height:0;animation:sh-spin-cw var(--spin) linear infinite}
.sh-sat{position:absolute;left:0;top:0;width:44px;height:44px;margin:-22px 0 0 -22px}
.sh-sat-in{display:grid;place-items:center;width:100%;height:100%;border-radius:15px;
    background:var(--white);border:1px solid var(--line);
    box-shadow:0 1px 2px rgba(12,38,32,.05),0 12px 24px -12px rgba(12,38,32,.35);
    animation:sh-spin-ccw var(--spin) linear infinite}
.sh-sat-in svg{width:20px;height:20px}
@keyframes sh-spin-cw{to{transform:rotate(360deg)}}
@keyframes sh-spin-ccw{to{transform:rotate(-360deg)}}

.sh-s1{transform:rotate(0deg)   translate(var(--r)) rotate(0deg)}
.sh-s2{transform:rotate(60deg)  translate(var(--r)) rotate(-60deg)}
.sh-s3{transform:rotate(120deg) translate(var(--r)) rotate(-120deg)}
.sh-s4{transform:rotate(180deg) translate(var(--r)) rotate(-180deg)}
.sh-s5{transform:rotate(240deg) translate(var(--r)) rotate(-240deg)}
.sh-s6{transform:rotate(300deg) translate(var(--r)) rotate(-300deg)}
.sh-s2,.sh-s5{width:38px;height:38px;margin:-19px 0 0 -19px}
.sh-s2 .sh-sat-in svg,.sh-s5 .sh-sat-in svg{width:17px;height:17px}

.sh-sat-fill-brand{background:linear-gradient(140deg,var(--brand-2),var(--brand-deep));border-color:transparent;color:#fff;
    box-shadow:0 1px 2px rgba(11,91,62,.2),0 14px 26px -12px rgba(11,91,62,.5)}
.sh-sat-fill-gold{background:linear-gradient(140deg,#FFC85C,var(--gold));border-color:transparent;color:#fff;
    box-shadow:0 1px 2px rgba(138,93,0,.16),0 14px 26px -12px rgba(224,138,0,.45)}
.sh-sat-course{color:#2C51B0}
.sh-sat-quiz{color:#563BC4}
.sh-sat-live{color:var(--brand)}
.sh-sat-cert{color:#0E7A54}

.sh-rise{opacity:0;transform:translateY(18px);animation:sh-rise .7s cubic-bezier(.22,.61,.36,1) forwards}
.sh-d1{animation-delay:.05s}
.sh-d2{animation-delay:.15s}
.sh-d3{animation-delay:.27s}
.sh-d4{animation-delay:.38s}
.sh-d5{animation-delay:.20s}
@media (max-width:1180px){
  .sh-stack{width:min(100%,370px)}
  .sh-orbit{--r:min(244px,21.5vw)}
}
@media (max-width:980px){
  .sh-hero-grid{
      grid-template-columns:1fr;
      gap:clamp(32px,4.6vh,50px);
      padding-block:clamp(44px,6vh,72px);
      text-align:center;
    }
  .sh-hero-copy{max-width:660px;margin-inline:auto}
  .sh-lead{font-size:clamp(24px,4.2vw,40px)}
  .sh-punch{font-size:clamp(38px,6.6vw,60px);white-space:normal}
  .sh-hero-visual{margin-top:clamp(8px,2vh,20px)}
  .sh-hero-sub{margin-inline:auto}
  .sh-cta-row{justify-content:center}
  .sh-hero-visual{order:2}
  .sh-stack{width:min(100%,460px);text-align:left}
  .sh-orbit{--r:min(265px,40vw)}
  .sh-dots.sh-b,.sh-ring.sh-a,.sh-squiggle{display:none}
}
@media (max-width:760px){
  .sh-sc-brand{width:88%;transform:rotate(-1.5deg)}
  .sh-sc-stats{width:100%;transform:rotate(1deg);margin-top:14px}
  .sh-sc-feed{transform:rotate(-.8deg);margin-top:16px}
}
@media (max-width:620px){
  .sh-wrap{width:min(var(--wrap),100% - 34px)}
  .sh-lead{font-size:clamp(21px,6.4vw,30px);letter-spacing:-.022em}
  .sh-punch{font-size:clamp(34px,10.6vw,48px);letter-spacing:-.03em}
  .sh-hero-visual{margin-top:clamp(6px,1.6vh,14px)}
  .sh-cta-row .sh-btn{flex:1 1 auto;min-width:210px}
  .sh-dots.sh-a{width:130px;height:130px;bottom:20px}
  .sh-spin{display:none}
  .sh-orb-ring-2{border-style:solid;border-color:rgba(15,157,107,.14)}
  .sh-sc-brand{padding:10px 13px}
  .sh-sc-stats{padding:13px 14px}
  .sh-st{gap:10px}
  .sh-st-i{padding-top:8px;border-top-width:2px}
  .sh-s-k{font-size:10.5px}
  .sh-s-v{font-size:21px}
  .sh-s-d{font-size:10px}
  .sh-sc-feed{padding:12px 9px 8px}
  .sh-feed{height:212px}
  .sh-feed-item{gap:10px;padding:9px 4px}
  .sh-feed-track::before{left:20px}
}
@media (max-width:420px){
  .sh-s-v{font-size:19px}
  .sh-f-ic{width:30px;height:30px}
  .sh-feed-track::before{left:19px}
}
@media (max-width:380px){
  .sh-cta-row .sh-btn{width:100%;min-width:0}
}
@media (max-width:360px){
  .sh-st{gap:8px}
  .sh-s-v{font-size:17.5px}
}
@media (prefers-reduced-motion:reduce){
  .sh-hero *{animation:none!important;transition:none!important;scroll-behavior:auto!important}
  .sh-rise{opacity:1!important;transform:none!important}
}`;

export default function Hero() {
  const { block, blockLoading: contentLoading } = useHomeContent("hero");

  const eyebrow = homeField("hero", block, "eyebrow");
  const heading = homeField("hero", block, "heading");
  const headingSecondary = homeField("hero", block, "heading_secondary");
  const subhead = homeField("hero", block, "subhead");
  const ctaPrimaryLabel = homeField("hero", block, "cta_primary_label");
  const ctaPrimaryHref = homeField("hero", block, "cta_primary_href");
  const ctaSecondaryLabel = homeField("hero", block, "cta_secondary_label");
  const ctaSecondaryHref = homeField("hero", block, "cta_secondary_href");

  /* Same source the floating button reads, so the two cannot disagree about
     whether a demo exists. The endpoint is cached server-side and withholds
     anything unplayable, so an empty list here means "render no link" rather
     than "render a link that opens nothing". */
  const [demo, setDemo] = useState(null);
  useEffect(() => {
    let alive = true;
    getDemoVideos().then((rows) => {
      const first = (Array.isArray(rows) ? rows : []).find((v) => v?.embed_url);
      if (alive) {
        setDemo(first || null);
      }
    });
    return () => { alive = false; };
  }, []);

  /* "Watch the 53s sign up demo". The seconds come from Bunny via
     duration_seconds — the design mockup hardcoded "40s" for a clip that is
     really 53s, which is the drift this whole feature avoids. With no duration
     synced yet the label simply omits it. */
  // CMS text used to replace already-animating fallback copy.
  const copyLoading = contentLoading;

  const demoLabel = demo
    ? `Watch the ${demo.duration_seconds ? `${demo.duration_seconds}s ` : ""}`
      + `${(demo.title || "demo").toLowerCase()}`
    : "";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="sh-hero" aria-labelledby="sh-hero-title">
        <div className="sh-deco" aria-hidden="true">
          <span className="sh-dots sh-a"></span>
          <span className="sh-dots sh-b"></span>
          <span className="sh-ring sh-a"></span>
          <span className="sh-squiggle">
            <svg viewBox="0 0 100 28" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M3 14 Q9 0 15.5 14 Q22 28 28.5 14 Q35 0 41.5 14 Q48 28 54.5 14 Q61 0 67.5 14 Q74 28 80.5 14 Q87 0 93.5 14" />
            </svg>
          </span>
        </div>

        <div className="sh-wrap sh-hero-grid">
          <div className="sh-hero-copy" aria-busy={copyLoading}>
            {copyLoading && <div className="sh-hero-placeholder" aria-hidden="true"><span /><span /><span /></div>}
            <div className="sh-hero-copy-content" style={{ visibility: copyLoading ? "hidden" : undefined }}>
              {(eyebrow) && (<p className="sh-badge">
                <i aria-hidden="true"></i>
                {eyebrow}
              </p>)}

              <h1 id="sh-hero-title" className="sh-hero-title">
                <span className="sh-lead">{heading}</span>
                {(headingSecondary) && (<span className="sh-punch">{headingSecondary}</span>)}
              </h1>

              {(subhead) && (<p className="sh-hero-sub">{subhead}</p>)}

              <div className="sh-cta-row">
                {(ctaPrimaryLabel && ctaPrimaryHref) && (<CtaLink className="sh-btn sh-btn-primary" to={ctaPrimaryHref}>
                  {ctaPrimaryLabel}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
                </CtaLink>)}
                {(ctaSecondaryLabel && ctaSecondaryHref) && (<CtaLink className="sh-btn sh-btn-ghost" to={ctaSecondaryHref}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></svg>
                  {ctaSecondaryLabel}
                </CtaLink>)}
              </div>

              <div className="sh-hero-demo-slot">
                {demo && (
                  <button
                    type="button"
                    className="sh-hero-demo"
                    onClick={() => window.dispatchEvent(new CustomEvent(
                      PLAY_DEMO_EVENT, { detail: { key: demo.key } },
                    ))}
                  >
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.7" />
                      <path d="M10.2 8.6v6.8L15.6 12z" fill="currentColor" />
                    </svg>
                    {demoLabel}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="sh-hero-visual sh-rise sh-d5">
            <div
              className="sh-stack"
              role="figure"
              aria-label="Illustrative snapshot of activity on ShikshaCom: new teachers, courses, study materials and quizzes being published"
            >
              <div className="sh-orbit" aria-hidden="true">
                <span className="sh-orb-ring sh-orb-ring-1"></span>
                <span className="sh-orb-ring sh-orb-ring-2"></span>
                <span className="sh-orb-ring sh-orb-ring-3"></span>
                <div className="sh-spin">
                  <span className="sh-sat sh-s1"><span className="sh-sat-in sh-sat-fill-brand">{ICON_CAP}</span></span>
                  <span className="sh-sat sh-s2"><span className="sh-sat-in sh-sat-course">{FEED_ICONS.course}</span></span>
                  <span className="sh-sat sh-s3"><span className="sh-sat-in sh-sat-fill-gold">{FEED_ICONS.doc}</span></span>
                  <span className="sh-sat sh-s4"><span className="sh-sat-in sh-sat-quiz">{FEED_ICONS.quiz}</span></span>
                  <span className="sh-sat sh-s5"><span className="sh-sat-in sh-sat-live">{FEED_ICONS.live}</span></span>
                  <span className="sh-sat sh-s6"><span className="sh-sat-in sh-sat-cert">{ICON_CERT}</span></span>
                </div>
              </div>

              <div className="sh-sc sh-sc-brand">
                <img className="sh-mark" alt="" aria-hidden="true" src="/Shiksha.png" />
                <span className="sh-who"><b>ShikshaCom</b><em>Platform activity</em></span>
                <span className="sh-live"><i aria-hidden="true"></i>Live</span>
              </div>

              <div className="sh-sc sh-sc-stats">
                <div className="sh-st">
                  {HERO_STATS.map((s) => (
                    <div className="sh-st-i" key={s.key}>
                      <span className="sh-s-k">{s.label}</span>
                      <StatValue className="sh-s-v" to={s.to} dec={s.dec} suffix={s.suffix} />
                      <span className="sh-s-d">{ICON_UP}{s.delta}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sh-sc sh-sc-feed">
                <div className="sh-feed-head">
                  <span className="sh-fh-l">Just published
                    <span className="sh-roller" aria-hidden="true">
                      <ul>
                        {ROLLER_WORDS.map((w) => <li key={w}>{w}</li>)}
                        <li>{ROLLER_WORDS[0]}</li>
                      </ul>
                    </span>
                  </span>
                  <span className="sh-fh-r">Updating live</span>
                </div>
                <div className="sh-feed">
                  <div className="sh-feed-track">
                    {[...HERO_FEED, ...HERO_FEED].map((item, i) => (
                      <div className="sh-feed-item" key={i}>
                        <span className={`sh-f-ic sh-ic-${item.icon}`}>{FEED_ICONS[item.icon]}</span>
                        <span className="sh-f-txt"><b>{item.title}</b><span>{item.sub}</span></span>
                        <span className={`sh-f-tag ${item.tagClass}`}>{item.tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
