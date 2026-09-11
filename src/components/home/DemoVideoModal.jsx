/**
 * DemoVideoModal.jsx — the lightbox the demo clips play in.
 *
 * Portalled to <body> for the reason IntroVideoModal already documents: an
 * ancestor with a `transform` becomes the containing block for
 * `position: fixed`, and the homepage is full of transformed sections. It also
 * has to cover the fixed header (z-index 1000) and its announcement strip
 * (1001), which it cannot do from inside the page flow.
 */
import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

/** Bunny plays on load only when asked; the click to open IS the intent. */
function autoplaySrc(src) {
  if (!src) return src;
  return src.includes("?") ? `${src}&autoplay=true` : `${src}?autoplay=true`;
}

export default function DemoVideoModal({ demo, onClose }) {
  const handleClose = useCallback(() => onClose?.(), [onClose]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!demo?.src) return null;

  return createPortal(
    <div className="sh-demo-modal" role="dialog" aria-modal="true" aria-label={demo.title}>
      {/* mousedown, not click, and only when the press STARTED on the
          backdrop — otherwise dragging the player's scrubber past the card
          edge dismisses the video mid-drag. */}
      <div
        className="sh-demo-backdrop"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      />
      <div className="sh-demo-card">
        <div className="sh-demo-head">
          <div>
            <p className="sh-demo-eyebrow">Product demo</p>
            <p className="sh-demo-title">{demo.title}</p>
          </div>
          <button
            type="button"
            className="sh-demo-close"
            onClick={handleClose}
            aria-label="Close demo video"
          >
            &#x2715;
          </button>
        </div>
        <div className="sh-demo-frame">
          <iframe
            src={autoplaySrc(demo.src)}
            title={demo.title}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
