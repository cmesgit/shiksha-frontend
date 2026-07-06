// PLACEMENT: src/counselling/CounsellingShell.jsx   (NEW FILE — landing/frontend app)
//
// Section chrome: green sub-bar with breadcrumb + the funnel step
// indicator (Profile → My Path → Counsellors → Book) from the approved
// workflow. Rendered INSIDE the site's <Page> wrapper — Navbar/Footer
// stay untouched, exactly like the forum shell.

import React from "react";
import { Link } from "react-router-dom";
import "./counselling.css";

export const STEPS = [
  ["profile", "1 · Profile", "/counselling/profile"],
  ["path", "2 · My Path", "/counselling/path"],
  ["matches", "3 · Counsellors", "/counselling/counsellors"],
  ["book", "4 · Book", null],
];

export default function CounsellingShell({ crumb = "", step = null, children }) {
  const stepIndex = STEPS.findIndex(([k]) => k === step);
  return (
    <div className="sc-page">
      <div className="sc-subbar">
        <div className="sc-subbar-in">
          <div className="sc-crumb">
            <Link to="/counselling">Career Counselling</Link>
            {crumb && <span>{crumb}</span>}
          </div>
          {step && (
            <div className="sc-steps">
              {STEPS.map(([k, label, to], i) => {
                const cls = `sc-step${k === step ? " on" : i < stepIndex ? " done" : ""}`;
                return to && i < stepIndex ? (
                  <Link key={k} to={to} className={cls} style={{ textDecoration: "none" }}>{label}</Link>
                ) : (
                  <span key={k} className={cls}>{label}</span>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="sc-wrap">{children}</div>
    </div>
  );
}

// ── tiny shared helpers ──
export const initialsOf = (s = "") =>
  String(s).trim().split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";

const GRADS = [
  "linear-gradient(135deg,#1b9c85,#125027)",
  "linear-gradient(135deg,#ff8f01,#d97600)",
  "linear-gradient(135deg,#125027,#1b9c85)",
];
export const gradOf = (s = "") =>
  GRADS[[...String(s)].reduce((a, c) => a + c.charCodeAt(0), 0) % GRADS.length];

// Match % for the workflow's "Match Percentage": honest relative scale —
// the top-scoring counsellor anchors ~95%, others scale down with score;
// zero-signal profiles show "New match" instead of a fake number.
export const matchPercent = (score, maxScore) => {
  if (!maxScore || score <= 0) return null;
  return Math.max(35, Math.round(95 * (score / maxScore)));
};

export const EXPERIENCE_LABELS = {
  lt1: "<1 yr experience", "1_3": "1–3 yrs experience", "3_5": "3–5 yrs experience",
  "5_10": "5–10 yrs experience", "10plus": "10+ yrs experience",
};
