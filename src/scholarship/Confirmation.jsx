// Screen 11 — Confirmation.
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { APP_URL } from "../config/urls";
import ScholarshipShell from "./ScholarshipShell";

export default function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseTitle, savedPaise } = location.state || {};

  if (!courseTitle) {
    // Direct/refreshed load with no state to show — send back rather than
    // render a confirmation for nothing that actually happened.
    navigate("/scholarship");
    return null;
  }

  const savedRupees = Math.round((savedPaise || 0) / 100).toLocaleString("en-IN");

  return (
    <ScholarshipShell step="done" bare>
      <div style={{ maxWidth: 460, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ width: 62, height: 62, borderRadius: "50%", background: "var(--sch-green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 24px" }}>✓</div>
        <h1 className="sch-flow-h1">You're enrolled.</h1>
        <p style={{ color: "var(--sch-ink-60)", marginBottom: 32 }}>
          {courseTitle} is now in your dashboard.
          {savedPaise > 0 && ` Your Instant Scholarship saved you ₹${savedRupees}.`}
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href={APP_URL} className="sch-btn sch-btn-primary">Go to my dashboard</a>
          <Link to="/scholarship" className="sch-btn sch-btn-secondary">Back to scholarship home</Link>
        </div>
      </div>
    </ScholarshipShell>
  );
}
