/**
 * shiksha-frontend/src/counselling/AdmissionAbroadRoute.jsx
 *
 * Runtime gate on `admission_abroad_enabled` for /admission/abroad.
 *
 * WHY A PUBLIC FLAG, not `feature_flags`: this is a logged-out marketing
 * page. A flag delivered on /accounts/me/ is absent for every visitor who
 * actually reaches it, so the gate would test green in every authenticated
 * session and be wide open in the one case that matters. It is read from
 * GET /api/public-config/, whose server-side allowlist names it explicitly.
 *
 * WHY IT SHIPS OFF: the 100-institution dataset behind the screen is cited
 * and dated (QS 2027, workbook prepared 14 Oct 2026), but the study-abroad
 * *guidance* around it is not finished — the country guides and phase index
 * come from a source document that still needs a human dedupe pass, and
 * that document names live immigration instruments (Canada PAL/TAL and
 * PGWP, Australia's Genuine Student test, the UK Graduate visa) with no
 * date stamp anywhere in it. Publishing undated immigration guidance is the
 * one thing in this corpus worth refusing by default.
 *
 * The off-state is deliberately NOT "temporarily unavailable". Nothing
 * broke; the feature is not live yet. Saying otherwise invites a visitor to
 * come back tomorrow for something that may be weeks away, so it points at
 * the two things that DO work today instead.
 *
 * Mirrors components/QuizRoute.jsx, which gates the Quiz Hub the same way.
 */
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicConfig } from "../api/publicConfig";

const AdmissionAbroadPage = lazy(() => import("./AdmissionAbroadPage"));

const CENTRED = {
  minHeight: "50vh",
  display: "grid",
  placeItems: "center",
};

function AbroadNotLive() {
  return (
    <main className="sc-wrap" style={{ padding: "48px 0" }}>
      <div className="sc-card" style={{ maxWidth: 640, margin: "0 auto", padding: 28 }}>
        <span className="sc-eyebrow">Study abroad</span>
        <h1 className="sc-h1" style={{ marginTop: 8 }}>Not open yet</h1>
        <p className="sc-sub">
          Our study-abroad directory is still being checked over. Visa rules and
          fees go out of date quickly, and we would rather publish nothing than
          publish something we cannot date.
        </p>
        <p className="sc-sub">In the meantime:</p>
        <div className="ai-journey-links" style={{ marginTop: 14 }}>
          <Link to="/admission/india/all">Browse colleges in India →</Link>
          <Link to="/counselling/counsellors">Talk to a counsellor →</Link>
        </div>
      </div>
    </main>
  );
}

export default function AdmissionAbroadRoute() {
  const [enabled, setEnabled] = useState(null); // null = not yet known

  useEffect(() => {
    let alive = true;
    getPublicConfig().then((cfg) => {
      if (alive) setEnabled(Boolean(cfg.admission_abroad_enabled));
    });
    return () => {
      alive = false;
    };
  }, []);

  // Render nothing decisive until the flag is known. Defaulting to the page
  // here would flash the gated directory for one paint on every load, which
  // is the whole thing the gate exists to prevent.
  if (enabled === null) {
    return <main role="status" style={CENTRED}>Loading…</main>;
  }
  if (!enabled) return <AbroadNotLive />;

  return (
    <Suspense fallback={<main role="status" style={CENTRED}>Loading…</main>}>
      <AdmissionAbroadPage />
    </Suspense>
  );
}
