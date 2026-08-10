// Screen 2 — Course selection, "Step 1 of 6". Public (no auth required yet
// — identity verification, the next screen, is the actual auth gate).
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiClient";
import ScholarshipShell from "./ScholarshipShell";
import { getFlowCourseId, setFlowCourseId } from "./flowState";
import { radioKeyDown } from "./a11y";

export default function CourseSelect() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(null);
  const [selected, setSelected] = useState(getFlowCourseId());

  useEffect(() => {
    let alive = true;
    api.get("/courses/public/catalog/").then(({ data }) => {
      if (!alive) return;
      const scholarshipEligible = (Array.isArray(data) ? data : [])
        .filter((c) => c.class_level >= 8 && c.class_level <= 12 && !c.is_coming_soon)
        .sort((a, b) => a.class_level - b.class_level);
      setCourses(scholarshipEligible);
      if (!selected && scholarshipEligible.length) {
        const dflt = scholarshipEligible.find((c) => c.class_level === 10) || scholarshipEligible[0];
        setSelected(dflt.id);
      }
    }).catch(() => setCourses([]));
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fmt = (paise) => `₹${Math.round(paise / 100).toLocaleString("en-IN")}`;

  const handleContinue = () => {
    if (!selected) return;
    setFlowCourseId(selected);
    navigate("/scholarship/verify");
  };

  return (
    <ScholarshipShell step="course">
      <div className="sch-flow-col">
        <h1 className="sch-flow-h1">Which course is the scholarship for?</h1>
        <p className="sch-flow-lead">
          Your paper is generated for this course's class — pick the one you plan to enrol in.
        </p>

        {courses === null && <p style={{ color: "var(--sch-ink-45)" }}>Loading courses…</p>}
        {courses !== null && courses.length === 0 && (
          <p style={{ color: "var(--sch-ink-45)" }}>No scholarship-eligible courses are available right now.</p>
        )}

        <div role="radiogroup" aria-label="Course" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 36 }}>
          {(courses || []).map((c) => {
            const isSel = selected === c.id;
            return (
              <div
                key={c.id}
                role="radio"
                aria-checked={isSel}
                tabIndex={0}
                onClick={() => setSelected(c.id)}
                onKeyDown={radioKeyDown(() => setSelected(c.id))}
                className="sch-card"
                style={{
                  padding: 24, cursor: "pointer", transition: "transform .2s, box-shadow .2s",
                  borderColor: isSel ? "var(--sch-green)" : undefined,
                  boxShadow: isSel ? "var(--sch-shadow-selected-card)" : undefined,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <span className="sch-kicker">CLASS {c.class_level}</span>
                  <span style={{
                    width: 20, height: 20, borderRadius: "50%", border: `2px solid ${isSel ? "var(--sch-green)" : "var(--sch-border-strong)"}`,
                    background: isSel ? "var(--sch-green)" : "transparent", boxShadow: isSel ? "inset 0 0 0 3px #fff" : "none",
                  }} />
                </div>
                <div className="sch-serif" style={{ fontSize: 23, fontWeight: 600, marginBottom: 6 }}>{c.title}</div>
                <div style={{ fontSize: 13.5, color: "var(--sch-ink-45)", marginBottom: 18 }}>
                  {c.board?.name || "All boards"} · {c.subject_count} subjects
                </div>
                <div style={{ borderTop: "1px solid var(--sch-border-faint)", paddingTop: 14 }}>
                  <div className="sch-serif" style={{ fontSize: 26 }}>{fmt(c.price)}</div>
                  <div style={{ fontSize: 12.5, color: "var(--sch-ink-45)" }}>from {fmt(c.price / 2)} with scholarship</div>
                </div>
              </div>
            );
          })}
        </div>

        <button className="sch-btn sch-btn-primary" disabled={!selected} onClick={handleContinue}>
          Continue to identity verification
        </button>
      </div>
    </ScholarshipShell>
  );
}
