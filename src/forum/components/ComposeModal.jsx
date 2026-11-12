import { useEffect, useRef } from "react";
import AskPage from "../pages/AskPage";

/* Pop-up version of the Ask / Post form, opened over the forum by
   "Share a post". ForumLayout shows it while the URL has ?compose=post, so
   the browser's back button closes it too. Closes on the Back button,
   Cancel, Escape or a click on the dimmed backdrop. */
export default function ComposeModal({ mode, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    // Keep the page behind from scrolling while the pop-up is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Start typing straight away.
    const first = panelRef.current?.querySelector("input, textarea");
    first?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div className="fm2-modal" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="fm2-modal-panel" role="dialog" aria-modal="true" aria-label={mode === "post" ? "Create a post" : "Ask a question"} ref={panelRef}>
        <AskPage asModal initialMode={mode} onClose={onClose} />
      </div>
    </div>
  );
}
