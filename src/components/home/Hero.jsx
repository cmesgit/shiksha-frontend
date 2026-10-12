import { useEffect, useRef, useState } from "react";
import { getDemoVideos } from "../../api/contentApi";
import { useHomeContent } from "../../hooks/useHomeContent";
import useTickerSlot from "../ticker/useTickerSlot";
import CtaLink from "./CtaLink";
import { PLAY_DEMO_EVENT } from "./DemoVideoButton";

// Mirrors content.models.TickerKind.
const KIND_LABEL = {
  new_course: "New course", enrolment: "Enrolment", new_mentor: "New mentor",
  practice: "Practice", deadline: "Deadline", milestone: "Milestone",
  current_affairs: "Current affairs", mentor_spotlight: "Mentors",
};

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
.sh-hero-copy{min-width:0}
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
    /* .sh-blob is decorative but oversized: it spills well above its own
       .sh-hero-visual box and, once the hero stacks at narrower widths, lands
       right on top of this row — swallowing the click entirely. Measured at
       948px: elementFromPoint over the link returned SPAN.sh-blob. Nothing
       occupied that band before, which is why the hero never needed this. */
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
.sh-hero-visual{
    position:relative;min-width:0;
    display:flex;align-items:center;justify-content:center;
    /* Lets a vertical page-scroll pass straight through a swipe that starts
       here, while a horizontal drag stays ours to turn into a page change —
       otherwise a touch swipe to flip ticker pages also tries to scroll the
       page sideways, and the browser's own scroll gesture fights the JS one. */
    touch-action:pan-y;
    /* .sh-blob is position:absolute, so it contributes nothing to this
       box's own flow-height — only whatever ticker content is in flow
       does. A 2x2 grid (350px) and a solo image (500px) size this
       container differently, and an empty ticker leaves it at 0, so the
       560px blob (centered, absolute) used to overflow above and below by
       a different amount each time, reading as the hero's padding
       changing. aspect-ratio ties this box to its OWN width (set by the
       grid column, not by whichever ticker variant happens to be inside),
       so it always reserves exactly the blob's footprint. */
    aspect-ratio:1/1;
    /* The single animated shape .sh-blob, .sh-tickwrap and .sh-ticksolo all
       track via border-radius:inherit. They sit side by side in the DOM, not
       nested inside one another, so each one running its own copy of
       sh-morph used to drift out of phase with the others — the blob mounts
       immediately, the ticker image only once CMS data arrives, so their
       18s clocks never lined up. One animation on the common ancestor keeps
       every layer on the exact same frame. The actual animation shorthand is
       set below, on .sh-hero-visual.sh-rise — this element also carries the
       .sh-rise fade-in class, and a second same-specificity animation
       declaration here would just lose the cascade to that rule. */
    border-radius:58% 42% 47% 53% / 46% 52% 48% 54%;
  }
.sh-blob{
    position:absolute;z-index:0;
    width:min(112%,560px);aspect-ratio:1/1;
    background:linear-gradient(150deg,var(--wash) 5%, var(--wash-2) 95%);
    border-radius:inherit;
  }
.sh-blob::after{
    content:"";position:absolute;inset:16px;
    border:1.5px dashed rgba(15,157,107,.22);
    border-radius:inherit;
  }
/* Live ticker grid inside the blob (design_handoff_live_ticker Phase 6).

   ⚠ SIZED AS A PERCENTAGE OF THE BLOB, not in fixed px. The design specifies
   168px cards with 14px gutters "fitting the 520px blob's square
   inscription" — but the blob is min(112%,560px), and min(96%,470px) at
   <=980px. 168+14+168 = 350px is exactly 62.5% of 560, so the design's
   numbers are right for the real blob and only its 520px label was wrong.
   Kept as 62.5% because a FIXED 350px overflows the smaller breakpoint: the
   dashed ring there leaves a 310px safe square and 350 > 310.

   The safe square is measured against .sh-blob::after (inset:16px), not the
   blob edge, so no card crosses the dashed ring at either size — 23px of
   margin at 560, 16px at 470 — which also absorbs the 18s sh-morph wobble. */
.sh-tick{
    position:relative;z-index:2;
    /* ⚠ MUST MIRROR .sh-blob's OWN sizing expression, scaled by 0.625 — not
       a bare 62.5%. The blob is absolutely positioned and the grid is a
       sibling in normal flow, so a plain percentage resolves against the
       PARENT, not the blob. Measured: at a 900px viewport the blob capped at
       470px while 62.5% of the parent came out 523px — a grid wider than the
       circle it sits in, overflowing the page sideways.
       min(112%,560px) x 0.625 = min(70%,350px), which is 62.5% of the blob
       at every width because both are the same function of the parent. */
    width:min(70%,350px);aspect-ratio:1/1;
    display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;
    gap:2.5%;
    transition:opacity .22s ease;
  }
/* The pager fades the batch out, swaps it, then fades the new one in — see
   the fadeOut state in the component. Applies to whichever ticker variant
   is actually on screen. */
.sh-tick-fade{opacity:0}
.sh-tickcard{
    display:flex;flex-direction:column;justify-content:center;gap:4px;
    padding:12px 13px;border-radius:14px;
    background:var(--white);border:1px solid var(--line);
    box-shadow:var(--sh-card);text-decoration:none;overflow:hidden;
  }
a.sh-tickcard:hover{border-color:var(--brand)}
/* "the hero card puts the picture full width above the copy" — the card is
   a flex column, so the image takes the top band and the text keeps the
   rest. object-fit:cover so a wide CMS upload never distorts. */
.sh-tickcard img{width:100%;height:52%;object-fit:cover;border-radius:9px;margin-bottom:6px;flex:none}
.sh-tickcard b{font-size:20px;font-weight:800;color:var(--brand);line-height:1}
.sh-tickcard .u{font-size:9px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--brand)}
.sh-tickcard .k{font-size:9px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:var(--body)}
.sh-tickcard .t{font-size:12.5px;font-weight:700;line-height:1.3;color:var(--ink);text-wrap:pretty}
/* One picture filling the whole circle. Used when the hero slot holds a
   SINGLE item that has an image — an admin controls which they get purely
   by how many items they queue here, with no extra switch to find:
     1 item with a picture  -> the picture fills the blob
     anything else          -> the 2x2 card grid
   Clipped to the blob's own morphing border-radius via inherit, so it
   follows the 18s sh-morph instead of sitting as a square on top of it.
   Sized the same as the old static hero art (96%/500px, not the blob's own
   112%/560px) so the dashed ring stays visible as a frame around the
   picture instead of the image covering it edge to edge. */
.sh-ticksolo{position:relative;z-index:2;width:min(96%,500px);aspect-ratio:1/1;
    border-radius:inherit;overflow:hidden;display:block}
.sh-tickwrap{position:relative;z-index:2;width:min(96%,500px);aspect-ratio:1/1;
    border-radius:inherit;overflow:hidden;transition:opacity .22s ease}
.sh-tickwrap img{width:100%;height:100%;object-fit:cover;display:block}
.sh-tickcap{position:absolute;left:0;right:0;bottom:0;z-index:3;
    padding:38px 26px 22px;color:#fff;text-align:center;
    background:linear-gradient(to top,rgba(11,46,32,.82),transparent)}
.sh-tickcap .k{display:block;font-size:9.5px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;opacity:.85}
.sh-tickcap .t{display:block;margin-top:3px;font-size:15px;font-weight:700;line-height:1.35}
.sh-tickdots{position:absolute;bottom:-2%;left:50%;transform:translateX(-50%);z-index:3;display:flex;gap:5px}
.sh-tickdot{width:6px;height:6px;padding:0;border:0;border-radius:50%;background:var(--line);cursor:pointer}
.sh-tickdot.on{width:16px;border-radius:3px;background:var(--brand)}
.sh-fl{
    position:absolute;z-index:3;
    width:54px;height:54px;border-radius:16px;
    display:grid;place-items:center;
    background:var(--white);box-shadow:var(--sh-card);
    color:var(--brand-deep);
    animation:sh-bob 5.4s ease-in-out infinite;
  }
.sh-fl svg{width:24px;height:24px}
.sh-fl.sh-cap{top:5%;left:1%;color:var(--brand)}
.sh-fl.sh-book{bottom:13%;right:0;animation-delay:1.2s;color:var(--gold)}
.sh-fl.sh-play{top:34%;right:-2%;width:46px;height:46px;animation-delay:.6s;animation-duration:6s}
.sh-fl.sh-play svg{width:20px;height:20px}
.sh-rise{opacity:0;transform:translateY(18px);animation:sh-rise .7s cubic-bezier(.22,.61,.36,1) forwards}
/* .sh-hero-visual also carries .sh-rise — two classes beats one, so this is
   what actually runs on it, combining its fade-in with the shared sh-morph
   clock every blob-shaped descendant inherits border-radius from. */
.sh-hero-visual.sh-rise{animation:sh-rise .7s cubic-bezier(.22,.61,.36,1) forwards, sh-morph 18s ease-in-out infinite}
.sh-d1{animation-delay:.05s}
.sh-d2{animation-delay:.15s}
.sh-d3{animation-delay:.27s}
.sh-d4{animation-delay:.38s}
.sh-d5{animation-delay:.20s}
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
  .sh-ticksolo,.sh-tickwrap{width:min(86%,430px)}
  .sh-blob{width:min(96%,470px)}
  /* 0.625 x the blob's own breakpoint value, for the reason above. */
  .sh-tick{width:min(60%,294px)}
  .sh-dots.sh-b,.sh-ring.sh-a,.sh-squiggle{display:none}
}
@media (max-width:620px){
  .sh-wrap{width:min(var(--wrap),100% - 34px)}
  .sh-lead{font-size:clamp(21px,6.4vw,30px);letter-spacing:-.022em}
  .sh-punch{font-size:clamp(34px,10.6vw,48px);letter-spacing:-.03em}
  .sh-hero-visual{margin-top:clamp(6px,1.6vh,14px)}
  .sh-cta-row .sh-btn{flex:1 1 auto;min-width:210px}
  .sh-fl.sh-cap{width:44px;height:44px;left:-2%}
  .sh-fl.sh-book{width:44px;height:44px}
  .sh-fl svg{width:20px;height:20px}
  .sh-fl.sh-play{display:none}
  .sh-dots.sh-a{width:130px;height:130px;bottom:20px}
}
@media (max-width:380px){
  .sh-cta-row .sh-btn{width:100%;min-width:0}
}
@media (prefers-reduced-motion:reduce){
  .sh-hero *{animation:none!important;transition:none!important;scroll-behavior:auto!important}
  .sh-rise{opacity:1!important;transform:none!important}
}`;

const DEFAULTS = {
  eyebrow: "Empowerment Through Education",
  heading: "Empowering Students Through",
  heading_secondary: "Better Learning.",
  subhead:
    "ShikshaCom combines quality education, expert mentorship, collaborative " +
    "learning, and trusted resources to help every student reach their academic goals.",
  cta_primary_label: "Explore Courses",
  cta_primary_href: "/courses",
  // "Book a Tutor" is a booking intent, and 1:1 tutor booking lives on the
  // Skill Dev expert directory — real availability slots, a real order/enrol
  // call (see ExpertProfilePage). /counselling is career ADVICE, a different
  // job, and its counsellor list is empty in production, so this CTA promised
  // a booking that could not be made. Career guidance keeps its own CTA in the
  // Resources section.
  cta_secondary_label: "Book a Tutor",
  cta_secondary_href: "/skill/browse",
};

export default function Hero() {
  const { block, floaters, cmsOwnsFloaters } = useHomeContent("hero");

  const eyebrow = block?.eyebrow || DEFAULTS.eyebrow;
  const heading = block?.heading || DEFAULTS.heading;
  const headingSecondary = block?.heading_secondary || DEFAULTS.heading_secondary;
  const subhead = block?.subhead || DEFAULTS.subhead;
  const ctaPrimaryLabel = block?.cta_primary_label || DEFAULTS.cta_primary_label;
  const ctaPrimaryHref = block?.cta_primary_href || DEFAULTS.cta_primary_href;
  const ctaSecondaryLabel = block?.cta_secondary_label || DEFAULTS.cta_secondary_label;
  const ctaSecondaryHref = block?.cta_secondary_href || DEFAULTS.cta_secondary_href;

  /* Live ticker, hero slot (design_handoff_live_ticker Phase 6). The hero
   * visual only ever renders ticker content now — no admin-image or
   * built-in-SVG fallback — so an empty queue just leaves the blob bare
   * rather than switching between two differently-sized visuals. */
  const { items: tickerItems } = useTickerSlot("hero");
  const [tickPage, setTickPage] = useState(0);
  const tickPages = Math.max(1, Math.ceil(tickerItems.length / 4));

  /* Same source the floating button reads, so the two cannot disagree about
     whether a demo exists. The endpoint is cached server-side and withholds
     anything unplayable, so an empty list here means "render no link" rather
     than "render a link that opens nothing". */
  const [demo, setDemo] = useState(null);
  useEffect(() => {
    let alive = true;
    getDemoVideos().then((rows) => {
      const first = (Array.isArray(rows) ? rows : []).find((v) => v?.embed_url);
      if (alive) setDemo(first || null);
    });
    return () => { alive = false; };
  }, []);

  /* "Watch the 53s sign up demo". The seconds come from Bunny via
     duration_seconds — the design mockup hardcoded "40s" for a clip that is
     really 53s, which is the drift this whole feature avoids. With no duration
     synced yet the label simply omits it. */
  const demoLabel = demo
    ? `Watch the ${demo.duration_seconds ? `${demo.duration_seconds}s ` : ""}`
      + `${(demo.title || "demo").toLowerCase()}`
    : "";

  /* The pager used to swap `shown` straight from one batch of 4 (or the
     solo item) to the next — React just unmounts the old cards and mounts
     the new ones on the same tick, with no transition, which read as a
     hard instant cut every 5s. fadeOut now runs first and the page only
     advances once that's had time to play, so the content is invisible at
     the moment it changes and reappears already on the new page.

     fadeToPage is the one place that drives it, so the auto-timer and a
     manual swipe (below) can't fall out of sync with each other — e.g. a
     swipe landing mid-fade from the timer, or vice versa, double-firing the
     transition. */
  const [fadeOut, setFadeOut] = useState(false);
  const fadeTimeoutRef = useRef(null);

  const fadeToPage = (next) => {
    setFadeOut(true);
    clearTimeout(fadeTimeoutRef.current);
    fadeTimeoutRef.current = setTimeout(() => {
      setTickPage(next);
      setFadeOut(false);
    }, 220);
  };

  useEffect(() => {
    if (tickPages < 2) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = setInterval(() => {
      // "the pager advances all four together"
      if (document.visibilityState !== "visible") return;
      fadeToPage((p) => (p + 1) % tickPages);
    }, 5000);
    return () => {
      clearInterval(id);
      clearTimeout(fadeTimeoutRef.current);
    };
  }, [tickPages]);

  /* Swipe/drag between pages, on top of the dots and the timer — none of
     the three can get out of sync since all three only ever call
     fadeToPage. Pointer events unify touch, mouse and pen in one handler.
     A short drag is still a tap: onClickCapture on the same element swallows
     the click that would otherwise follow a real drag, so dragging across a
     ticker card doesn't also open its link. */
  const dragRef = useRef({ active: false, startX: 0, moved: false });

  const handleDragStart = (e) => {
    if (tickPages < 2) return;
    dragRef.current = { active: true, startX: e.clientX, moved: false };
  };
  const handleDragMove = (e) => {
    if (!dragRef.current.active) return;
    if (Math.abs(e.clientX - dragRef.current.startX) > 8) dragRef.current.moved = true;
  };
  const handleDragEnd = (e) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    dragRef.current.active = false;
    if (Math.abs(dx) < 40) return;
    if (dx < 0) fadeToPage((p) => (p + 1) % tickPages);
    else fadeToPage((p) => (p - 1 + tickPages) % tickPages);
  };
  const handleDragClickCapture = (e) => {
    if (dragRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragRef.current.moved = false;
    }
  };

  const page = tickPage < tickPages ? tickPage : 0;
  const shown = tickerItems.slice(page * 4, page * 4 + 4);
  const tickFadeClass = fadeOut ? " sh-tick-fade" : "";

  // Hero's floating chips are a fixed icon-only trio by design (no text slot
  // exists in the CSS) — CMS control here is deliberately limited to
  // show/hide per slot, not icon swap or label text.
  //
  // The row's mere PRESENCE is the switch: these slots carry no label or icon
  // that this component reads, so a hero floater row exists only to be there
  // or not. Removing it in the CMS hides the chip. Until the section reports
  // any rows at all (still loading, empty table, or the API down) all three
  // show, which is the original static look. See useHomeContent.
  const showCap = cmsOwnsFloaters ? Boolean(floaters.cap) : true;
  const showBook = cmsOwnsFloaters ? Boolean(floaters.book) : true;
  const showPlay = cmsOwnsFloaters ? Boolean(floaters.play) : true;

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
          <div className="sh-hero-copy">
            <p className="sh-badge sh-rise sh-d1">
              <i aria-hidden="true"></i>
              {eyebrow}
            </p>

            <h1 id="sh-hero-title" className="sh-hero-title sh-rise sh-d2">
              <span className="sh-lead">{heading}</span>
              <span className="sh-punch">{headingSecondary}</span>
            </h1>

            <p className="sh-hero-sub sh-rise sh-d3">{subhead}</p>

            <div className="sh-cta-row sh-rise sh-d4">
              <CtaLink className="sh-btn sh-btn-primary" to={ctaPrimaryHref}>
                {ctaPrimaryLabel}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
              </CtaLink>
              <CtaLink className="sh-btn sh-btn-ghost" to={ctaSecondaryHref}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></svg>
                {ctaSecondaryLabel}
              </CtaLink>
            </div>

            {demo && (
              <button
                type="button"
                className="sh-hero-demo sh-rise sh-d4"
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

          <div
            className="sh-hero-visual sh-rise sh-d5"
            onPointerDown={handleDragStart}
            onPointerMove={handleDragMove}
            onPointerUp={handleDragEnd}
            onPointerCancel={handleDragEnd}
            onClickCapture={handleDragClickCapture}
          >
            <span className="sh-blob" aria-hidden="true"></span>

            {showCap && (
              <span className="sh-fl sh-cap" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M22 9 12 5 2 9l10 4 10-4Z" /><path d="M6 11v4c0 1 2.7 2 6 2s6-1 6-2v-4" /><path d="M22 9v5" /></svg>
              </span>
            )}
            {showBook && (
              <span className="sh-fl sh-book" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 7v14" /><path d="M3 18V5a1 1 0 0 1 1-1h5a3 3 0 0 1 3 3 3 3 0 0 1 3-3h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a2 2 0 0 0-2 2 2 2 0 0 0-2-2H4a1 1 0 0 1-1-1Z" /></svg>
              </span>
            )}
            {showPlay && (
              <span className="sh-fl sh-play" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M10 8.5 16 12l-6 3.5Z" /></svg>
              </span>
            )}

            {shown.length === 1 && shown[0].img ? (
              /* One queued item WITH a picture: it takes the whole circle. */
              (() => {
                const it = shown[0];
                const art = (
                  <div className={`sh-tickwrap${tickFadeClass}`}>
                    <img src={it.img} alt="" />
                    <span className="sh-tickcap">
                      {it.kind && <span className="k">{KIND_LABEL[it.kind]}</span>}
                      <span className="t">{it.message}</span>
                    </span>
                  </div>
                );
                return it.link_url ? <a href={it.link_url} className="sh-ticksolo">{art}</a> : art;
              })()
            ) : shown.length > 0 ? (
              <div className={`sh-tick${tickFadeClass}`}>
                {shown.map((it) => {
                  const inner = (
                    <>
                      {it.img && <img src={it.img} alt="" />}
                      {it.metric
                        ? <span><b>{it.metric.value}</b> <span className="u">{it.metric.label}</span></span>
                        : null}
                      {it.kind && <span className="k">{KIND_LABEL[it.kind]}</span>}
                      <span className="t">{it.message}</span>
                    </>
                  );
                  return it.link_url
                    ? <a key={it.id} className="sh-tickcard" href={it.link_url}>{inner}</a>
                    : <div key={it.id} className="sh-tickcard">{inner}</div>;
                })}
                {tickPages > 1 && (
                  <div className="sh-tickdots">
                    {Array.from({ length: tickPages }, (_, i) => (
                      <button
                        key={i} type="button"
                        className={`sh-tickdot${i === page ? " on" : ""}`}
                        aria-label={`Updates ${i + 1} of ${tickPages}`}
                        aria-current={i === page}
                        onClick={() => setTickPage(i)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
