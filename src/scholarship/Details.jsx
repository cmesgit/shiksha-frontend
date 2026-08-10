// Screen 4 — Educational information, "Step 3 of 6". 3-step local wizard
// writing to the SAME LearnerProfile fields Manage Profile edits
// (PATCH /accounts/profiles/:id/) — no parallel data store. Class is shown
// read-only, derived from the course chosen in step 1: the backend
// (EligibilityCheckView) rejects a class/course mismatch outright, so
// letting it be freely edited here would just relocate that error to a
// worse spot in the flow.
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiClient";
import { useAuth } from "../contexts/AuthContext";
import ScholarshipShell from "./ScholarshipShell";
import useActiveLearnerProfile from "./useActiveLearnerProfile";
import { getFlowCourseId } from "./flowState";

const BOARD_CHOICES = [
  ["cbse", "CBSE"], ["icse", "ICSE"], ["mbse", "Mizoram Board of School Education"],
  ["nios", "NIOS"], ["other", "Other State Board"],
];
const ACADEMIC_YEARS = ["2026-27", "2025-26", "2027-28"];
const STEP_LABELS = ["Contact", "Class & school", "Board & year"];

export default function Details() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, loading, reload, profileId } = useActiveLearnerProfile();
  const [step, setStep] = useState(0);
  const [courseClassLevel, setCourseClassLevel] = useState(null);
  const [form, setForm] = useState({ full_name: "", phone: "", school_name: "", board: "cbse", board_other: "", academic_year: ACADEMIC_YEARS[0] });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const courseId = getFlowCourseId();
    if (!courseId) { navigate("/scholarship/course"); return; }
    api.get("/courses/public/catalog/").then(({ data }) => {
      const course = (data || []).find((c) => c.id === courseId);
      if (course) setCourseClassLevel(course.class_level);
    }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (profile) {
      setForm((f) => ({
        ...f,
        // ProfileDetailView serializes first_name/last_name, not full_name
        // (that model field exists but isn't part of this endpoint's
        // contract) — display as one field, split back apart on save below.
        full_name: `${profile.first_name || ""} ${profile.last_name || ""}`.trim(),
        phone: profile.phone || "",
        school_name: profile.school_name || "",
        board: profile.board || "cbse",
        board_other: profile.board_other || "",
        academic_year: profile.academic_year || ACADEMIC_YEARS[0],
      }));
    }
  }, [profile]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const canContinue = () => {
    if (step === 0) return form.full_name.trim() && /^\d{10}$/.test(form.phone.trim());
    if (step === 1) return form.school_name.trim().length >= 2;
    return true;
  };

  const handleNext = async () => {
    if (step < 2) { setStep(step + 1); return; }
    setSaving(true);
    setError("");
    try {
      const [firstName, ...rest] = form.full_name.trim().split(/\s+/);
      await api.patch(`/accounts/profiles/${profileId}/`, {
        first_name: firstName || "",
        last_name: rest.join(" "),
        phone: form.phone.trim(),
        current_class: String(courseClassLevel || ""),
        school_name: form.school_name.trim(),
        board: form.board,
        board_other: form.board === "other" ? form.board_other.trim() : "",
        academic_year: form.academic_year,
      });
      await reload();
      navigate("/scholarship/eligibility");
    } catch {
      setError("Couldn't save your details. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <ScholarshipShell step="details"><div className="sch-flow-col">Loading…</div></ScholarshipShell>;

  return (
    <ScholarshipShell step="details">
      <div className="sch-flow-col sch-narrow">
        <div style={{ display: "flex", gap: 1, background: "var(--sch-border-faint)", borderRadius: 999, overflow: "hidden", marginBottom: 32 }}>
          {STEP_LABELS.map((label, i) => (
            <div key={label} style={{ flex: 1, textAlign: "center", padding: "8px 4px", background: i <= step ? "var(--sch-green)" : "var(--sch-canvas)", color: i <= step ? "#fff" : "var(--sch-ink-45)", fontSize: 12, fontWeight: 600 }}>
              {label}
            </div>
          ))}
        </div>

        {step === 0 && (
          <>
            <h1 className="sch-flow-h1">Your contact details.</h1>
            <p className="sch-flow-lead">We use this to send your scholarship certificate and course access.</p>
            <div className="sch-field-grid">
              <div className="sch-field sch-field-full">
                <label>Full name</label>
                <input value={form.full_name} onChange={set("full_name")} placeholder="Student's full name" />
              </div>
              <div className="sch-field">
                <label>Email address</label>
                <input value={user?.email || ""} disabled style={{ background: "var(--sch-canvas)", color: "var(--sch-ink-45)" }} />
              </div>
              <div className="sch-field">
                <label>Mobile number</label>
                <input value={form.phone} onChange={set("phone")} placeholder="10-digit mobile number" maxLength={10} />
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h1 className="sch-flow-h1">Where do you study?</h1>
            <p className="sch-flow-lead">Your paper is generated for this class.</p>
            <div className="sch-field-grid">
              <div className="sch-field sch-field-full">
                <label>Current class</label>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span className="sch-pill on" style={{ cursor: "default" }}>
                    Class {courseClassLevel || "…"}
                  </span>
                  <button type="button" onClick={() => navigate("/scholarship/course")}
                    style={{ all: "unset", cursor: "pointer", fontSize: 13, color: "var(--sch-green)", textDecoration: "underline" }}>
                    Choose a different course
                  </button>
                </div>
              </div>
              <div className="sch-field sch-field-full">
                <label>School name</label>
                <input value={form.school_name} onChange={set("school_name")} placeholder="Your school's name" />
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="sch-flow-h1">Board and academic year.</h1>
            <p className="sch-flow-lead">Used to align the paper with your syllabus.</p>
            <div className="sch-field-grid">
              <div className="sch-field">
                <label>Education board</label>
                <select value={form.board} onChange={set("board")}>
                  {BOARD_CHOICES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              {form.board === "other" && (
                <div className="sch-field">
                  <label>Board name</label>
                  <input value={form.board_other} onChange={set("board_other")} placeholder="Name your board" />
                </div>
              )}
              <div className="sch-field">
                <label>Academic year</label>
                <select value={form.academic_year} onChange={set("academic_year")}>
                  {ACADEMIC_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
          </>
        )}

        {error && <p style={{ color: "var(--sch-danger)", fontSize: 13.5, marginBottom: 16 }}>{error}</p>}

        <div className="sch-flow-footer">
          {step > 0 ? (
            <button className="sch-btn sch-btn-secondary" onClick={() => setStep(step - 1)}>Back</button>
          ) : <span />}
          <button className="sch-btn sch-btn-primary" disabled={!canContinue() || saving} onClick={handleNext}>
            {saving ? "Saving…" : step < 2 ? "Continue" : "Check eligibility"}
          </button>
        </div>
        <p className="sch-lock-note">Your details are only used to generate and align this scholarship exam.</p>
      </div>
    </ScholarshipShell>
  );
}
