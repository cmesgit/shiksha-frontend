// Screen 8 — Evaluating. Full-screen dark, per design. Dwell time is
// whatever the real submit call actually takes (plus a small ~400ms floor
// so a near-instant response doesn't flash) — NOT a fixed padded delay;
// the design brief is explicit that this must reflect real server work.
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { submitExam } from "../api/scholarshipApi";
import "./scholarship.tokens.css";

const PHASES = ["Answers received", "Scoring against answer key", "Applying scholarship bands", "Preparing your discount"];

export default function Evaluating() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const phaseTimer = setInterval(() => setPhase((p) => Math.min(p + 1, PHASES.length - 1)), 350);
    const minDelay = new Promise((r) => setTimeout(r, 400));

    Promise.all([submitExam(sessionId).catch(() => null), minDelay]).then(() => {
      clearInterval(phaseTimer);
      navigate(`/scholarship/result/${sessionId}`, { replace: true });
    });

    return () => clearInterval(phaseTimer);
  }, [sessionId, navigate]);

  return (
    <div className="sch" style={{ minHeight: "100vh", background: "var(--sch-green-dark-surface)", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
      <div style={{ width: 70, height: 70, borderRadius: "50%", border: "3px solid rgba(255,255,255,.16)", borderTopColor: "var(--sch-gold-light)", animation: "sch-spin .9s linear infinite" }} />
      <div style={{ textAlign: "center" }}>
        <h1 className="sch-serif" style={{ fontSize: 28, margin: "0 0 8px" }}>Evaluating your examination</h1>
        <p style={{ opacity: 0.65 }}>Automatic evaluation, no manual review. This takes a few seconds.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {PHASES.map((label, i) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, opacity: i <= phase ? 1 : 0.35, fontSize: 14 }}>
            <span style={{ width: 16, height: 16, borderRadius: "50%", background: i <= phase ? "var(--sch-gold-light)" : "transparent", border: "1.5px solid rgba(255,255,255,.4)" }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
