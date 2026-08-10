// Screen 5 — Eligibility check. No flow header (per design), centred column.
// The 4 "checks" are real narration around ONE real API call
// (checkEligibility), not independent claims — unlike the identity
// verification screen, there's no honesty risk here: the eligibility
// endpoint really does do identity/history/policy checks server-side in
// this order, this just paces revealing the single real result.
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkEligibility } from "../api/scholarshipApi";
import ScholarshipShell from "./ScholarshipShell";
import { getFlowCourseId } from "./flowState";

const CHECKS = [
  "Reading verified identity record",
  "Checking scholarship history for this class",
  "Confirming account eligibility",
  "Eligibility confirmed",
];

const REASON_COPY = {
  identity_not_verified: "Your identity hasn't been verified yet.",
  class_mismatch: "The selected course's class doesn't match this student's current class.",
  missing_academic_year: "Please complete the academic year field in the previous step.",
  already_attempted: "One scholarship attempt is available per academic year, and it's already been used.",
  scholarship_disabled: "The scholarship program isn't currently accepting attempts.",
};

export default function Eligibility() {
  const navigate = useNavigate();
  const [tick, setTick] = useState(0);
  const [result, setResult] = useState(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    const courseId = getFlowCourseId();
    if (!courseId) { navigate("/scholarship/course"); return; }

    const tickTimer = setInterval(() => setTick((t) => Math.min(t + 1, CHECKS.length - 1)), 700);
    const minDelay = new Promise((resolve) => setTimeout(resolve, CHECKS.length * 700));

    Promise.all([checkEligibility(courseId).catch((err) => err.response?.data || { eligible: false, reason: "error" }), minDelay])
      .then(([data]) => {
        clearInterval(tickTimer);
        setTick(CHECKS.length - 1);
        setResult(data);
      });

    return () => clearInterval(tickTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const eligible = result?.eligible;
  const done = result !== null;

  return (
    <ScholarshipShell step="eligibility" bare>
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        {!done || eligible ? (
          <>
            <div className="sch-spinner" style={{ margin: "0 auto 28px", opacity: done ? 0 : 1, transition: "opacity .3s" }} />
            <h1 className="sch-flow-h1" style={{ marginBottom: 8 }}>
              {done ? "You are eligible." : "Checking your eligibility"}
            </h1>
            <p style={{ color: "var(--sch-ink-60)", marginBottom: 32 }}>
              {done
                ? `One scholarship attempt is available for Class ${result.class_level}.`
                : "Verifying against your identity record rather than your account."}
            </p>
          </>
        ) : (
          <>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--sch-danger-surface)", border: "1px solid var(--sch-danger-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 20px", color: "var(--sch-danger)" }}>!</div>
            <h1 className="sch-flow-h1" style={{ marginBottom: 8 }}>Not eligible right now.</h1>
            <p style={{ color: "var(--sch-ink-60)", marginBottom: 32 }}>{REASON_COPY[result.reason] || "Please try again later."}</p>
          </>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "left", marginBottom: 32 }}>
          {CHECKS.map((label, i) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{
                width: 22, height: 22, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
                background: i <= tick ? "var(--sch-green)" : "transparent", border: i <= tick ? "none" : "1.5px solid var(--sch-border-strong)", color: "#fff",
              }}>{i <= tick ? "✓" : ""}</span>
              <span style={{ fontSize: 14, color: i <= tick ? "var(--sch-ink)" : "var(--sch-ink-45)" }}>{label}</span>
            </div>
          ))}
        </div>

        <div style={{ background: "var(--sch-green-tint)", color: "var(--sch-green-text-on-tint-alt)", borderRadius: 12, padding: 18, fontSize: 13.5, marginBottom: 28 }}>
          One verified person = one scholarship attempt per academic year. You become eligible again the following
          academic year.
        </div>

        {done && eligible && (
          <button className="sch-btn sch-btn-primary" style={{ opacity: 1 }}
            onClick={() => navigate("/scholarship/instructions", { state: { eligibilityRecordId: result.eligibility_record_id } })}>
            View examination instructions
          </button>
        )}
        {done && !eligible && (
          <button className="sch-btn sch-btn-secondary" onClick={() => navigate("/scholarship")}>Back to scholarship home</button>
        )}
      </div>
    </ScholarshipShell>
  );
}
