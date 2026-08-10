// Screen 6 — Examination instructions, "Step 5 of 6".
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/apiClient";
import { getScholarshipConfig, startExam } from "../api/scholarshipApi";
import ScholarshipShell from "./ScholarshipShell";
import useActiveLearnerProfile from "./useActiveLearnerProfile";
import { getFlowCourseId } from "./flowState";

const RULES = [
  "50 questions, 30 minutes — exact numbers shown on the right.",
  "Your paper is generated fresh by AI — no two students sit the same paper.",
  "Question order and option order are both randomised for this attempt.",
  "Subjects: Mathematics, Science, English, Social Studies, General Knowledge, Current Affairs.",
  "Regional-language subjects are not included.",
  "The timer is server-controlled — it survives a refresh, a dropped connection, or a closed tab.",
  "Your answers are saved automatically as you go, and the exam auto-submits at zero.",
  "Difficulty is split roughly 60% easy, 30% medium, 10% challenging.",
];

export default function Instructions() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useActiveLearnerProfile();
  const [config, setConfig] = useState(null);
  const [course, setCourse] = useState(null);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");

  const eligibilityRecordId = location.state?.eligibilityRecordId;

  useEffect(() => {
    if (!eligibilityRecordId) { navigate("/scholarship/eligibility"); return; }
    getScholarshipConfig().then(setConfig);
    const courseId = getFlowCourseId();
    if (courseId) {
      api.get("/courses/public/catalog/").then(({ data }) => {
        setCourse((data || []).find((c) => c.id === courseId) || null);
      }).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStart = async () => {
    setStarting(true);
    setError("");
    try {
      const courseId = getFlowCourseId();
      const session = await startExam(eligibilityRecordId, courseId);
      navigate(`/scholarship/exam/${session.id}`);
    } catch (err) {
      setError(err.response?.data?.detail || "Couldn't start the examination. Please try again.");
      setStarting(false);
    }
  };

  return (
    <ScholarshipShell step="instructions">
      <div className="sch-flow-col" style={{ maxWidth: 1080 }}>
        <div style={{ display: "flex", gap: 52, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 560px" }}>
            <h1 className="sch-flow-h1">Before you begin.</h1>
            <p className="sch-flow-lead">Once you start, the timer begins immediately and cannot be paused.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--sch-border)", borderRadius: 14, overflow: "hidden" }}>
              {RULES.map((rule, i) => (
                <div key={rule} style={{ display: "flex", gap: 14, background: "#fff", padding: "17px 20px" }}>
                  <span style={{ width: 26, height: 26, borderRadius: 9, background: "var(--sch-green-tint)", color: "var(--sch-green)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12.5, fontWeight: 700, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontSize: 14.5, paddingTop: 3 }}>{rule}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "var(--sch-gold-surface-soft)", border: "1px solid var(--sch-gold-border)", borderRadius: 12, padding: 16, marginTop: 20, fontSize: 13.5, color: "var(--sch-gold-text-deep)" }}>
              Leaving the tab shows a warning and is recorded, but does not fail the examination.
            </div>
            {error && <p style={{ color: "var(--sch-danger)", fontSize: 13.5, marginTop: 16 }}>{error}</p>}
          </div>

          <div style={{ flex: "0 1 320px" }}>
            <div style={{ position: "sticky", top: 24, background: "var(--sch-green-dark-surface)", color: "#fff", borderRadius: 18, padding: 26 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14, marginBottom: 22 }}>
                <Row label="Student" value={profile?.full_name || profile?.first_name || "—"} />
                <Row label="Class" value={course ? `Class ${course.class_level}` : "—"} />
                <Row label="Questions" value={config?.question_count ?? "—"} />
                <Row label="Duration" value={config ? `${config.duration_minutes} min` : "—"} />
                <Row label="Maximum award" value={config ? `${config.max_discount_pct}%` : "—"} gold />
              </div>
              <button className="sch-btn" style={{ background: "#fff", color: "var(--sch-green)", width: "100%" }}
                disabled={starting} onClick={handleStart}>
                {starting ? "Starting…" : "Start Examination"}
              </button>
              <p style={{ textAlign: "center", fontSize: 12, opacity: 0.6, marginTop: 10 }}>Timer begins immediately</p>
            </div>
          </div>
        </div>
      </div>
    </ScholarshipShell>
  );
}

function Row({ label, value, gold }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.14)", paddingBottom: 10 }}>
      <span style={{ opacity: 0.65 }}>{label}</span>
      <span style={{ fontWeight: 600, color: gold ? "var(--sch-gold-light)" : "#fff" }}>{value}</span>
    </div>
  );
}
