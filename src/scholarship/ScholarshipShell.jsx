// Flow chrome for the multi-step Instant Scholarship journey: slim header
// (Exit link + step label) over a progress track. Rendered standalone
// (NOT inside the site's <Page> Navbar/Footer) for course/verify/details/
// eligibility/instructions/result/checkout — matches the design handoff's
// "flow screens" treatment. The exam screen uses its own full-screen chrome
// (see Exam.jsx) with no marketing shell at all, per the brief.
import React from "react";
import { Link } from "react-router-dom";
import "./scholarship.tokens.css";
import "./scholarship.css";

export const FLOW_STEPS = [
  ["course", "Step 1 of 6"],
  ["verify", "Step 2 of 6"],
  ["details", "Step 3 of 6"],
  ["eligibility", null], // no header on this screen, per design
  ["instructions", "Step 5 of 6"],
  ["checkout", "Step 6 of 6"],
];

export default function ScholarshipShell({ step, children, bare = false }) {
  const entry = FLOW_STEPS.find(([k]) => k === step);
  const stepIndex = FLOW_STEPS.findIndex(([k]) => k === step);
  const progressPct = stepIndex === -1 ? 0 : ((stepIndex + 1) / FLOW_STEPS.length) * 100;

  return (
    <div className="sch">
      {!bare && (
        <div className="sch-flow-header">
          <div className="sch-flow-header-in">
            <Link to="/scholarship" className="sch-exit">Exit</Link>
            {entry?.[1] && <span className="sch-step-label">{entry[1]}</span>}
          </div>
          <div className="sch-progress-track">
            <div className="sch-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      )}
      <div className="sch-enter">{children}</div>
    </div>
  );
}
