/**
 * QuizRoute.jsx — decides what /quiz renders.
 *
 * `public_quiz_hub_enabled` now defaults ON (Phase 9). It is no longer a
 * launch gate; it is a KILL SWITCH. Every public quiz endpoint checks it and
 * returns 503, so with the flag off the hub would render and then fail every
 * request it makes — which is why this route still checks it and shows a
 * short notice instead.
 *
 * The old "coming soon" placeholder (QuizMockTest.jsx/.css) is DELETED. It
 * promised a feature that has now shipped, so leaving it as the off-state
 * would have told visitors the hub was on its way while it was merely paused.
 *
 * WHY A SEPARATE COMPONENT rather than a conditional inside QuizHub: the hub
 * is a lazy chunk, and a visitor who cannot use it should not download it.
 * Branching inside the page would pull it into the bundle regardless.
 *
 * THE FLASH IS DELIBERATE, AND SO IS ITS DIRECTION. The flag arrives over the
 * network, so there is a moment where neither state can be drawn. Rendering
 * nothing for that moment is correct; rendering the notice optimistically
 * would flash "unavailable" at every visitor for a beat on a working site.
 */
import { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicConfig } from "../api/publicConfig";

const QuizHub = lazy(() => import("./QuizHub"));

/* Scoped in-file, the same way QuizHub carries its own stylesheet — this is a
   handful of rules for one rarely-seen state and does not warrant a file. */
const NOTICE_CSS = `
.qz-off{max-width:640px;margin:0 auto;padding:clamp(64px,12vh,140px) 22px;text-align:center;
  font-family:'Poppins',system-ui,-apple-system,'Segoe UI',sans-serif;color:#1c2b25}
.qz-off h1{font-size:clamp(26px,4vw,34px);font-weight:700;margin:0 0 14px;letter-spacing:-.02em}
.qz-off p{font-size:15.5px;line-height:1.65;color:#4b5f57;margin:0 0 28px}
.qz-off-act{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.qz-off-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 22px;border-radius:999px;
  background:#0B7A52;color:#fff;font-weight:600;font-size:14.5px;text-decoration:none;
  transition:background .2s}
.qz-off-btn:hover{background:#0a6746}
.qz-off-btn--ghost{background:transparent;color:#0B7A52;border:1px solid #cfe0d8}
.qz-off-btn--ghost:hover{background:#f2f8f5}
`;

function QuizUnavailable() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: NOTICE_CSS }} />
      <main className="qz-off">
        <h1>Quizzes are unavailable right now</h1>
        {/* No date and no notify form: there is no notify endpoint on this
            site, and this state is a temporary pause rather than a launch
            countdown, so promising a return time would be inventing one. */}
        <p>
          Practice quizzes are temporarily switched off while we make a change.
          They will be back shortly — nothing you have submitted is affected.
        </p>
        <div className="qz-off-act">
          <Link className="qz-off-btn" to="/courses">Browse courses</Link>
          <Link className="qz-off-btn qz-off-btn--ghost" to="/explore">Explore the library</Link>
        </div>
      </main>
    </>
  );
}

export default function QuizRoute() {
  const [enabled, setEnabled] = useState(null); // null = not yet known

  useEffect(() => {
    let alive = true;
    getPublicConfig().then((cfg) => {
      if (alive) setEnabled(Boolean(cfg.public_quiz_hub_enabled));
    });
    return () => {
      alive = false;
    };
  }, []);

  if (enabled === null) return null;
  if (!enabled) return <QuizUnavailable />;

  return (
    <Suspense fallback={null}>
      <QuizHub />
    </Suspense>
  );
}
