/**
 * DemoVideoProvider.jsx — the landing page's demo-video affordance.
 *
 * Owns the floating button (top-right, fixed, hover-reveals a menu of clips),
 * the modal player, and the context that lets Hero render a second entry point
 * into the same clips without duplicating any of this.
 *
 * Renders NOTHING when no clip has a URL yet — see demoVideos.js. That is why
 * this can ship before the recordings do.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../../css/DemoVideo.css";
import DemoVideoModal from "./DemoVideoModal";
import { DemoVideoContext } from "./demoVideoContext";
import { configuredDemos } from "./demoVideos";

/* The gap between the header's bottom edge and the button. The design was
   revised specifically to measure rather than assume, so the button cannot
   collide with the nav when it wraps. */
const HEADER_GAP = 20;
/* Leaving the button doesn't close the menu instantly — the pointer has to
   travel across that gap to reach the menu, and a 0ms close eats the trip. */
const CLOSE_DELAY = 160;
/* Only used if the header isn't in the DOM: --skn-header-h from SiteNav.css. */
const HEADER_FALLBACK = 82;

function PlayGlyph({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path
        d="M15.6 10.3a2 2 0 010 3.4l-6.1 3.6A2 2 0 016.5 15.6V8.4a2 2 0 013-1.7z"
        fill="currentColor"
        stroke="none"
      />
      <circle cx="12" cy="12" r="10.2" />
    </svg>
  );
}

export default function DemoVideoProvider({ children }) {
  const demos = useMemo(() => configuredDemos(), []);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(null);
  const [headerH, setHeaderH] = useState(HEADER_FALLBACK);
  const closeTimer = useRef(null);

  /* Track where the header actually ends. It is `position: fixed`, so its rect
     bottom IS the offset we need — but that bottom moves for two different
     reasons and only one of them is a resize:

       - SIZE: the 640px breakpoint (78px vs 72px) and the nav wrapping at
         awkward widths. ResizeObserver sees these.
       - POSITION: the CMS announcement strip. `.skn-has-announce` pushes the
         header down 40px without changing its height, so ResizeObserver stays
         silent. Measured: header bottom 82 → 122 with the FAB still pinned at
         102, i.e. 20px INSIDE the nav — the exact collision this offset exists
         to prevent.

     The strip is applied as a class on the header itself (Navbar.jsx), so a
     MutationObserver on its attributes catches the case a resize cannot.
     `.skn-scrolled` arrives the same way and is covered for free. */
  useEffect(() => {
    const header = document.querySelector(".skn-header");
    if (!header) return undefined;
    const measure = () => setHeaderH(header.getBoundingClientRect().bottom);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(header);
    const mo = new MutationObserver(measure);
    mo.observe(header, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("resize", measure);

    /* Poppins reflows the header from 79px to 82px when it lands, and the
       first measurement happens before that. ResizeObserver does fire, but
       only after this component has already painted at the old offset —
       re-measuring on fonts.ready settles it in one step instead. */
    let alive = true;
    document.fonts?.ready.then(() => {
      if (alive) measure();
    });

    return () => {
      alive = false;
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const openMenu = useCallback(() => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  }, []);

  const openDemo = useCallback((key) => {
    const found = configuredDemos().find((d) => d.key === key);
    if (!found) return;
    clearTimeout(closeTimer.current);
    setOpen(false);
    setPlaying(found);
  }, []);

  /* Escape closes the menu. The modal handles its own Escape — and because it
     unmounts this listener's usefulness rather than its registration, the
     guard keeps one keypress from doing both. */
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        clearTimeout(closeTimer.current);
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const value = useMemo(() => ({ demos, openDemo }), [demos, openDemo]);

  return (
    <DemoVideoContext.Provider value={value}>
      {children}

      {demos.length > 0 && (
        <div
          className="sh-demo"
          style={{ top: headerH + HEADER_GAP }}
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
        >
          <button
            type="button"
            className="sh-demo-fab"
            aria-label="Watch demo videos"
            aria-expanded={open}
            aria-controls="sh-demo-menu"
            onClick={() => (open ? setOpen(false) : openMenu())}
            onFocus={openMenu}
          >
            <span className="sh-demo-ring" aria-hidden="true" />
            <PlayGlyph />
          </button>

          {/* The closed menu is only invisible, not gone — without aria-hidden
              a screen reader still announces both rows, and `opacity: 0` is
              not something it can report. tabIndex keeps them out of the tab
              order too, so nothing inside can hold focus while hidden. */}
          <div
            id="sh-demo-menu"
            className={`sh-demo-menu${open ? " is-open" : ""}`}
            aria-hidden={!open}
            aria-label="Demo videos"
          >
            <div className="sh-demo-menu-head">
              <p className="sh-demo-menu-label">Watch a demo</p>
              <p className="sh-demo-menu-sub">Short walkthroughs, no account needed</p>
            </div>
            {demos.map((demo) => (
              <button
                key={demo.key}
                type="button"
                className="sh-demo-row"
                onClick={() => openDemo(demo.key)}
                tabIndex={open ? 0 : -1}
              >
                <span className="sh-demo-thumb" aria-hidden="true">
                  <PlayGlyph />
                </span>
                <span className="sh-demo-rowtx">
                  <span className="sh-demo-rowtitle">{demo.title}</span>
                  <span className="sh-demo-rowmeta">{demo.meta}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {playing && <DemoVideoModal demo={playing} onClose={() => setPlaying(null)} />}
    </DemoVideoContext.Provider>
  );
}
