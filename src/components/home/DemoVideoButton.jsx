/**
 * DemoVideoButton.jsx — the landing page's floating "watch a demo" control.
 *
 * A sticky circular button at the top right that opens a small menu of product
 * walkthroughs; picking one plays it in a lightbox.
 *
 * Deliberately NOT a HomeSection. Every entry in ShikshaHome's
 * SECTION_COMPONENTS renders as a sibling in the vertical flow of <main>, and
 * the only thing the CMS controls there is position in that list — meaningless
 * for a fixed-position element. Worse, ShikshaHome filters its order against
 * the backend's HomeSection enum, so a frontend-only key renders on first
 * paint and then vanishes the moment the CMS responds. It mounts from
 * HomePage.jsx instead, as a sibling of Navbar/ShikshaHome/Footer.
 *
 * Renders nothing until the API returns at least one clip. The backend already
 * withholds rows that are unpublished or have no Bunny video attached, so
 * before the first upload there is no button at all — rather than a play
 * button that opens an empty player.
 *
 * The menu opens on hover on pointer devices and on click everywhere, so it is
 * reachable by keyboard and touch. Hover alone would make it a desktop-mouse-
 * only feature.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { getDemoVideos } from "../../api/contentApi";
import { IcPlay } from "./HomeIcons";

/* Section-scoped styles, same `const css` + <style> convention as the other
   home components (Hero.jsx, Cta.jsx, …). Literal hex matches this file's
   neighbours — the marketing site has no imported token system, unlike the
   teacher/student/admin dashboards. */
const css = `.dvb{
    --dvb-brand:#0F9D6B;
    --dvb-brand-2:#12B47A;
    --dvb-brand-deep:#0B5B3E;
    --dvb-ink:#0C2620;
    --dvb-body:#5A7268;
    --dvb-line:#E4EEE8;
    --dvb-wash:#EAF7F0;
    --dvb-sans:'Inter', system-ui, -apple-system, sans-serif;

    position:fixed;
    /* --dvb-top is measured from the real header in JS: the nav wraps to a
       second row at narrow widths and shrinks its padding on scroll, so any
       constant here collides with it at some viewport. */
    top:var(--dvb-top,102px);
    right:clamp(14px,3vw,34px);
    /* Under the header (1000) and its mega panels (1190/1200) so an open nav
       always covers this, and far under the lightbox (10200). */
    z-index:900;
    font-family:var(--dvb-sans);
  }
.dvb-fab{
    width:56px;height:56px;
    display:grid;place-items:center;
    border:0;border-radius:50%;
    background:var(--dvb-brand-deep);
    color:#fff;cursor:pointer;
    box-shadow:0 10px 26px -6px rgba(11,91,62,.45);
    transition:box-shadow .18s ease, scale .18s ease;
    /* The design's "gentle bob". It animates the transform property, so the
       hover response uses the independent scale property rather than a second
       transform — otherwise whichever lands last wins and the bob stops.
       (No backticks in this block: it lives inside a JS template literal.) */
    animation:dvb-bob 3.6s ease-in-out infinite;
  }
.dvb-fab svg{width:26px;height:26px}
.dvb-fab:hover{scale:1.05;animation-play-state:paused}
@keyframes dvb-bob{
    0%,100%{transform:translateY(0)}
    50%{transform:translateY(-4px)}
  }
.dvb-fab:focus-visible{outline:3px solid var(--dvb-brand);outline-offset:3px}
/* Attention ring. Purely decorative, so it sits behind the button and is
   pointer-events:none — an expanding pseudo-element that swallowed clicks
   would make the hit area jump around under the cursor. */
.dvb-fab::before{
    content:"";position:absolute;inset:0;border-radius:50%;
    background:var(--dvb-brand);opacity:.35;z-index:-1;
    animation:dvb-pulse 2.8s ease-out infinite;
    pointer-events:none;
  }
.dvb-wrap{position:relative;display:block}
@keyframes dvb-pulse{
    0%{transform:scale(1);opacity:.35}
    70%{transform:scale(1.55);opacity:0}
    100%{transform:scale(1.55);opacity:0}
  }
.dvb-panel{
    position:absolute;top:calc(100% + 12px);right:0;
    width:274px;
    background:#fff;border:1px solid var(--dvb-line);border-radius:16px;
    box-shadow:0 18px 44px -12px rgba(12,38,32,.24);
    padding:14px 12px 10px;
    animation:dvb-in .16s ease-out;
  }
/* Bridges the 12px offset above. The panel is absolutely positioned, so it
   contributes nothing to .dvb-wrap's box and that offset belonged to the page
   behind it — hit-testing there returned the hero section. Moving the mouse
   from the button down to the menu therefore left .dvb-wrap, fired mouseleave
   and closed the menu before it could be reached: on a pointer device the
   items were only reachable by a flick fast enough to skip the gap in a single
   mousemove sample. Transparent, and a child of the panel, so hovering it
   still counts as being inside the wrap. Do not close the gap instead — the
   visual separation is wanted. */
.dvb-panel::before{
    content:"";position:absolute;
    top:-12px;left:0;right:0;height:12px;
  }
@keyframes dvb-in{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
.dvb-eyebrow{
    margin:0 0 2px;padding:0 6px;
    font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
    color:var(--dvb-brand-deep);
  }
.dvb-sub{margin:0 0 10px;padding:0 6px;font-size:12.5px;line-height:1.45;color:var(--dvb-body)}
/* Hairline rules under the header and between rows, per the design. Drawn
   with a border rather than a gap so the rows stay flush and the hover wash
   reads as one continuous band. */
.dvb-sub{border-bottom:1px solid var(--dvb-line);padding-bottom:11px}
.dvb-item + .dvb-item{border-top:1px solid var(--dvb-line)}
.dvb-item{
    display:flex;align-items:center;gap:11px;width:100%;
    padding:9px 6px;border:0;border-radius:11px;
    background:transparent;text-align:left;cursor:pointer;
    transition:background .14s ease;
  }
.dvb-item:hover,.dvb-item:focus-visible{background:var(--dvb-wash);outline:none}
.dvb-item:focus-visible{box-shadow:inset 0 0 0 2px var(--dvb-brand)}
.dvb-chip{
    flex:0 0 auto;width:34px;height:34px;border-radius:9px;
    display:grid;place-items:center;
    background:linear-gradient(140deg,var(--dvb-brand-2),var(--dvb-brand));
    color:#fff;
  }
.dvb-chip svg{width:13px;height:13px;margin-left:2px}
.dvb-txt{min-width:0}
.dvb-title{display:block;font-size:13.5px;font-weight:700;color:var(--dvb-ink);line-height:1.3}
.dvb-meta{display:block;margin-top:2px;font-size:11.5px;color:var(--dvb-body);line-height:1.35}

/* ── Lightbox ── */
.dvb-modal{
    position:fixed;inset:0;z-index:10200;
    display:grid;place-items:center;padding:20px;
    background:rgba(9,40,29,.62);
    -webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);
    font-family:var(--dvb-sans);
  }
.dvb-card{
    width:min(880px,100%);
    background:#fff;border-radius:16px;overflow:hidden;
    box-shadow:0 30px 70px -20px rgba(6,28,20,.6);
  }
.dvb-head{
    display:flex;align-items:flex-start;justify-content:space-between;gap:16px;
    padding:15px 18px;
  }
.dvb-head-eyebrow{
    margin:0;font-size:10.5px;font-weight:700;letter-spacing:.13em;
    text-transform:uppercase;color:#0F9D6B;
  }
.dvb-head-title{margin:3px 0 0;font-size:17px;font-weight:800;color:#0C2620;line-height:1.25}
.dvb-close{
    flex:0 0 auto;width:32px;height:32px;border-radius:50%;
    border:1px solid #E4EEE8;background:#fff;color:#5A7268;
    font-size:15px;line-height:1;cursor:pointer;
  }
.dvb-close:hover{background:#EAF7F0;color:#0C2620}
.dvb-close:focus-visible{outline:2px solid #0F9D6B;outline-offset:2px}
.dvb-frame{position:relative;aspect-ratio:16/9;background:#0B3B2A}
.dvb-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}

@media (max-width:620px){
  /* Kept visible, unlike the decorative .float chips the homepage hides at
     this width — this one is a real entry point, not ornament. Shrunk to the
     44px touch target the hero chips use. */
  .dvb-fab{width:46px;height:46px}
  .dvb-fab svg{width:18px;height:18px}
  .dvb-panel{width:min(264px,calc(100vw - 28px))}
  .dvb-modal{padding:12px}
}
@media (prefers-reduced-motion:reduce){
  .dvb-fab::before{animation:none}
  .dvb-fab{animation:none}
  .dvb-panel{animation:none}
}`;

/* The FAB's mark in the design is a ringed play glyph, distinct from the bare
   triangle on the menu rows — so it is local here rather than replacing the
   shared IcPlay, which those rows (and other home sections) still use. */
function IcPlayRing() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9.25" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.2 8.6v6.8L15.6 12z" fill="currentColor" />
    </svg>
  );
}

/** Asks the mounted DemoVideoButton to open its player. Exported so the hero's
 *  text link and this button cannot drift apart on the event name. */
export const PLAY_DEMO_EVENT = "shiksha:play-demo";

/** "0:54" from 54. Null/0 means Bunny hasn't reported a length yet, in which
 *  case the caller omits the runtime rather than printing "0:00". */
function formatRuntime(seconds) {
  if (!seconds) return "";
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function DemoVideoModal({ video, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return createPortal(
    <div
      className="dvb-modal"
      /* onMouseDown, not onClick: a drag that starts on the player's scrubber
         and releases over the backdrop would otherwise dismiss the video. */
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="dvb-card" role="dialog" aria-modal="true" aria-label={video.title}>
        <div className="dvb-head">
          <div>
            <p className="dvb-head-eyebrow">Product demo</p>
            <h2 className="dvb-head-title">{video.title}</h2>
          </div>
          <button type="button" className="dvb-close" onClick={onClose} aria-label="Close video">
            &#x2715;
          </button>
        </div>
        <div className="dvb-frame">
          <iframe
            src={`${video.embed_url}${video.embed_url.includes("?") ? "&" : "?"}autoplay=true`}
            title={video.title}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function DemoVideoButton() {
  const [videos, setVideos] = useState([]);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(null);
  const [canHover, setCanHover] = useState(false);
  const wrapRef = useRef(null);

  /* Hover handlers are attached only on devices that actually hover. Binding
     them everywhere made the button close itself on a normal mouse: pointing
     at it fired mouseenter -> open, and the click that naturally followed
     toggled it straight back shut. Touch has no mouseenter, so there the
     click has to be a real toggle. */
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setCanHover(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    let alive = true;
    getDemoVideos().then((rows) => {
      // embed_url is null when the row has no Bunny video, or when the
      // backend's BUNNY_LIBRARY_ID is unset. The API already withholds both,
      // but this is the one field the modal cannot do without — an unplayable
      // row here becomes an iframe pointing at the string "null".
      const playable = (Array.isArray(rows) ? rows : []).filter((v) => v?.embed_url);
      if (alive) setVideos(playable);
    });
    return () => { alive = false; };
  }, []);

  /* Sit below the real header rather than at a fixed offset. .skn-header is
     position:fixed and changes height twice: its padding shrinks on scroll,
     and the nav wraps to a taller second row at narrow widths. A constant
     top would overlap it at some viewport or scroll position.

     Two of the ways that bottom edge moves are NOT resizes, so ResizeObserver
     and the scroll/resize listeners alone leave the button in the wrong place
     for as long as the visitor sits still:

       - The sitewide announcement strip. It is CMS-driven and arrives after
         first paint (`announcements` starts [] and is filled by an async
         getAnnouncements), then pushes the header down 40px by toggling
         .skn-has-announce — a POSITION change with no size change, which
         ResizeObserver cannot see. Measured on the homepage: header bottom
         82 -> 122 with the button still pinned at 102, i.e. 20px inside the
         nav. The strip lands as a class on the header, so a MutationObserver
         on its attributes is what catches it.
       - Poppins loading reflows the header 79px -> 82px, after the first
         measurement has already been taken.

     Both currently self-correct on the visitor's first scroll, which is the
     one moment they are not looking at the top of the page. */
  useEffect(() => {
    const header = document.querySelector(".skn-header");
    if (!header) return undefined;
    const place = () => {
      const { bottom } = header.getBoundingClientRect();
      document.documentElement.style.setProperty("--dvb-top", `${Math.max(bottom, 0) + 20}px`);
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(header);
    const mo = new MutationObserver(place);
    mo.observe(header, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);

    let alive = true;
    document.fonts?.ready.then(() => {
      if (alive) place();
    });

    return () => {
      alive = false;
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
    };
  }, [videos.length]);

  const close = useCallback(() => setOpen(false), []);

  /* The hero carries a text link to the same demo, for visitors who never
     notice a floating button. It lives in another section of another tree, so
     it asks for playback by event rather than by prop — the alternative was
     hoisting this state to HomePage and threading it through ShikshaHome,
     which would put a video player's open/closed state in the layout root.
     `detail.key` picks a clip; omitting it plays the first. */
  useEffect(() => {
    const onPlay = (e) => {
      const key = e.detail?.key;
      const pick = (key && videos.find((v) => v.key === key)) || videos[0];
      if (!pick) return;
      setPlaying(pick);
      setOpen(false);   // don't leave the menu sitting open behind the player
    };
    window.addEventListener(PLAY_DEMO_EVENT, onPlay);
    return () => window.removeEventListener(PLAY_DEMO_EVENT, onPlay);
  }, [videos]);

  // Click-outside and Escape. Without these the panel stays open after a
  // hover-open on a touch device, where there is no mouseleave.
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) close();
    };
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!videos.length) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="dvb">
        <div
          className="dvb-wrap"
          ref={wrapRef}
          {...(canHover
            ? { onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false) }
            : {})}
        >
          <button
            type="button"
            className="dvb-fab"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label="Watch a demo"
            /* Where hover already governs open/close, activating the button
               only ever opens — so keyboard Enter works without a mouse user's
               click undoing their own hover. Escape and mouseleave close. */
            onClick={() => setOpen((v) => (canHover ? true : !v))}
          >
            <IcPlayRing />
          </button>

          {open && (
            <div className="dvb-panel" role="menu" aria-label="Watch a demo">
              <p className="dvb-eyebrow">Watch a demo</p>
              <p className="dvb-sub">Short walkthroughs, no account needed</p>
              {videos.map((v) => {
                const runtime = formatRuntime(v.duration_seconds);
                return (
                  <button
                    key={v.key}
                    type="button"
                    role="menuitem"
                    className="dvb-item"
                    onClick={() => { setPlaying(v); setOpen(false); }}
                  >
                    <span className="dvb-chip"><IcPlay /></span>
                    <span className="dvb-txt">
                      <span className="dvb-title">{v.title}</span>
                      {(runtime || v.blurb) && (
                        <span className="dvb-meta">
                          {[runtime, v.blurb].filter(Boolean).join(" · ")}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {playing && (
        <DemoVideoModal video={playing} onClose={() => setPlaying(null)} />
      )}
    </>
  );
}
