/**
 * IntroVideoModal.jsx — the directory's intro-video lightbox.
 *
 * The profile page expands its clip inline under the photo, which works there
 * because the player is the last thing in its column. In the directory a 16:9
 * player inside a row would push every card below it down, so the same clip
 * opens over the list instead and the scroll position survives.
 *
 * Portalled to <body>: `.sk-tcard` sets `transform` on hover, and a transformed
 * ancestor becomes the containing block for `position: fixed`, which would trap
 * the overlay inside one card.
 */
import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

export default function IntroVideoModal({ expert, onClose }) {
  const handleClose = useCallback(() => onClose?.(), [onClose]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!expert?.intro_video_embed_url) return null;

  return createPortal(
    <div
      className="sk-vmodal"
      /* Backdrop closes; a click that started inside the card must not, or
         dragging the player's scrubber past the edge dismisses the video. */
      onMouseDown={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="sk-vmodal__card"
        role="dialog"
        aria-modal="true"
        aria-label={`Intro video from ${expert.name}`}
      >
        <div className="sk-vmodal__head">
          <p className="sk-vmodal__name">{expert.name}</p>
          <button type="button" className="sk-vmodal__close" onClick={handleClose} aria-label="Close video">
            &#x2715;
          </button>
        </div>
        <div className="sk-vmodal__frame">
          <iframe
            src={expert.intro_video_embed_url}
            title={`Intro video from ${expert.name}`}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
