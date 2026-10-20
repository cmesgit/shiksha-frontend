// PLACEMENT: src/counselling/ProfileWizard.jsx   (landing/frontend app)
//
// Workflow §6 — the adaptive profile wizard. Step 0 (everyone) followed by
// the two or three steps that belong to the chosen level.
//
// Replaces the four fixed steps (interests → skills → goals → preferences)
// that every student saw regardless of whether they were in Class 6 or three
// years into a job. The question sets live in wizardSteps.js; this file is
// the renderer plus the save mapping.
//
// Personal/education data still lives on the LearnerProfile and is NOT asked
// again here — the backend returns it read-only in the intake's `learner`
// block, which is the anti-duplication rule this app was built around.

import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getIntake, getSpecializations, saveIntake } from "../api/counselling";
import CounsellingShell from "./CounsellingShell";
import {
  AUDIENCES, HELP_OPTIONS, LEVELS, LOCATIONS, stepsFor,
} from "./wizardSteps";

// Columns that take a comma-joined string rather than an array.
const CSV_COLS = new Set(["skills"]);

function Chips({ options, selected, onToggle, single }) {
  return (
    <div className="sc-chips">
      {options.map((opt) => {
        const [val, label] = Array.isArray(opt) ? opt : [opt, opt];
        const on = single ? selected === val : (selected || []).includes(val);
        return (
          <button key={val} type="button" className={`sc-chip${on ? " on" : ""}`}
            onClick={() => onToggle(val)}>
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default function ProfileWizard() {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [step, setStep] = useState(0);       // 0 = Step 0, then 1..N
  const [specs, setSpecs] = useState([]);
  const [learner, setLearner] = useState(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Step 0
  const [locations, setLocations] = useState([]);
  const [help, setHelp] = useState([]);
  const [audience, setAudience] = useState("");
  const [level, setLevel] = useState("");
  const [childClass, setChildClass] = useState("");
  const [childAge, setChildAge] = useState("");

  // Level-specific answers, keyed by field key
  const [answers, setAnswers] = useState({});
  const [interests, setInterests] = useState([]);   // Specialization ids

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { state: { from: "/counselling/profile" } });
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return undefined;
    let live = true;
    Promise.all([getSpecializations(), getIntake()]).then(([sp, intake]) => {
      if (!live) return;
      setSpecs(sp);
      setLearner(intake.learner);
      setInterests((intake.career_interests || []).map((x) => x.id));
      setLocations(intake.location_preference || []);
      setHelp(intake.help_needed || []);
      setAudience(intake.audience || "");
      // effective_level backfills from the learner's class for intakes that
      // predate the level column — see CounselingIntake.effective_level.
      setLevel(intake.level || intake.effective_level || "");
      setAnswers({
        ...(intake.level_answers || {}),
        // Pull the real columns back into the answer bag so a re-visit shows
        // what was saved, whichever field key maps to them.
        favourite_subjects: intake.favorite_subjects || "",
        skills: (intake.skills || "").split(",").map((s) => s.trim()).filter(Boolean),
        languages: intake.languages || "",
        industry: intake.preferred_industry || "",
      });
      setReady(true);
    }).catch(() => live && setError("Couldn't load your profile — please refresh."));
    return () => { live = false; };
  }, [isAuthenticated]);

  const steps = useMemo(() => stepsFor(level), [level]);
  const abroadOnly = locations.length === 1 && locations[0] === "abroad";
  const showsAbroadNotice = locations.includes("abroad");
  const totalDots = 1 + steps.length;

  const setAnswer = (key, value) => setAnswers((a) => ({ ...a, [key]: value }));

  const toggleIn = (list, value) =>
    list.includes(value) ? list.filter((x) => x !== value) : [...list, value];

  // Step 0 is complete once location, audience and level are chosen. Abroad
  // -only skips the rest entirely, so it never needs the other two.
  const step0Valid = abroadOnly
    ? true
    : locations.length > 0 && !!audience && !!level;

  const finish = async () => {
    if (interests.length === 0) {
      setError("Pick at least one career interest — it's what matching runs on.");
      return;
    }
    setBusy(true);
    setError("");

    // Split the answer bag: fields that declare a `col` go to real columns,
    // everything else into level_answers.
    const payload = {
      audience, level,
      location_preference: locations,
      help_needed: help,
      career_interest_ids: interests,
    };
    const blob = {};
    const mappedKeys = new Set();
    steps.forEach((s) => s.fields.forEach((f) => {
      const v = answers[f.key];
      if (f.col === "career_interest_ids") { mappedKeys.add(f.key); return; }
      if (f.col) {
        mappedKeys.add(f.key);
        payload[f.col] = CSV_COLS.has(f.col) && Array.isArray(v) ? v.join(", ") : (v ?? "");
      }
    }));
    steps.forEach((s) => s.fields.forEach((f) => {
      if (!mappedKeys.has(f.key) && answers[f.key] !== undefined) {
        blob[f.key] = answers[f.key];
      }
    }));
    if (audience === "child") {
      if (childClass) blob.child_class = childClass;
      if (childAge) blob.child_age = childAge;
    }
    payload.level_answers = blob;

    try {
      await saveIntake(payload);
      navigate("/counselling/path");
    } catch {
      setError("Couldn't save — check your connection and try again.");
      setBusy(false);
    }
  };

  if (error && !ready) {
    return <CounsellingShell crumb=" / Career Profile" step="profile">
      <div className="sc-error">{error}</div>
    </CounsellingShell>;
  }
  if (!ready) {
    return (
      <CounsellingShell crumb=" / Career Profile" step="profile">
        <div className="sc-skel" style={{ height: 46, maxWidth: 480, marginBottom: 16 }} />
        <div className="sc-skel" style={{ height: 240 }} />
      </CounsellingShell>
    );
  }

  const current = step === 0 ? null : steps[step - 1];

  return (
    <CounsellingShell crumb=" / Career Profile" step="profile">
      <div className="sc-wizard">
        <h1 className="sc-h1">Your career profile</h1>
        <p className="sc-sub">
          A few short steps, tailored to where you are right now. This powers
          your personalised path and your counsellor matches — you can change
          it anytime.
        </p>

        {learner && (
          <div className="sc-known">
            <span>For: {learner.display_name}</span>
            {learner.current_class && <span>Class {learner.current_class}</span>}
            {learner.stream && <span>{learner.stream[0].toUpperCase() + learner.stream.slice(1)} stream</span>}
            {learner.board && <span>{learner.board.toUpperCase()}</span>}
          </div>
        )}

        <div className="sc-wizbar">
          {Array.from({ length: totalDots }).map((_, i) => (
            <i key={i} className={i <= step ? "on" : ""} />
          ))}
        </div>
        {error && <div className="sc-error">{error}</div>}

        <div className="sc-card">
          {step === 0 ? (
            <>
              <h2 className="pw-steptitle">Getting started</h2>

              <div className="sc-field">
                <label className="sc-label">Are you exploring options in India, abroad, or both?</label>
                <Chips options={LOCATIONS} selected={locations}
                  onToggle={(v) => setLocations(toggleIn(locations, v))} />
              </div>

              {showsAbroadNotice && (
                <div className="pw-notice">
                  <strong>Abroad guidance is coming soon.</strong>
                  <p>
                    {abroadOnly
                      ? "Assessment and personalised reports for studying abroad aren't available yet. A counsellor can still talk you through your options today."
                      : "Assessment and personalised reports for studying abroad aren't available yet — we'll continue building your report from the India-focused questions below."}
                  </p>
                  {abroadOnly && (
                    <div className="pw-notice-cta">
                      <Link className="sc-btn green" to="/counselling/counsellors">Talk to a counsellor →</Link>
                      <Link className="sc-btn ghost" to="/counselling/guides">Explore career guides →</Link>
                    </div>
                  )}
                </div>
              )}

              {!abroadOnly && (
                <>
                  <div className="sc-field">
                    <label className="sc-label">What do you need help with?</label>
                    <Chips options={HELP_OPTIONS} selected={help}
                      onToggle={(v) => setHelp(toggleIn(help, v))} />
                  </div>

                  <div className="sc-field">
                    <label className="sc-label">Who is this assessment for?</label>
                    <Chips options={AUDIENCES} selected={audience} single
                      onToggle={(v) => setAudience(audience === v ? "" : v)} />
                  </div>

                  {audience === "child" && (
                    <div className="sc-grid2 pw-child">
                      <div className="sc-field">
                        <label className="sc-label">Their class</label>
                        <input className="sc-input" value={childClass} placeholder="e.g. 9"
                          onChange={(e) => setChildClass(e.target.value)} />
                      </div>
                      <div className="sc-field">
                        <label className="sc-label">Their age</label>
                        <input className="sc-input" value={childAge} placeholder="e.g. 14"
                          onChange={(e) => setChildAge(e.target.value)} />
                      </div>
                    </div>
                  )}

                  <div className="sc-field">
                    <label className="sc-label">Current level</label>
                    <Chips options={LEVELS} selected={level} single
                      onToggle={(v) => setLevel(level === v ? "" : v)} />
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <h2 className="pw-steptitle">{current.title}</h2>
              {current.fields.map((f) => (
                <div key={f.key} className="sc-field">
                  <label className="sc-label">{f.label}</label>

                  {f.type === "text" && (
                    <input className="sc-input" placeholder={f.placeholder || ""}
                      value={answers[f.key] || ""}
                      onChange={(e) => setAnswer(f.key, e.target.value)} />
                  )}

                  {f.type === "textarea" && (
                    <textarea className="sc-textarea" placeholder={f.placeholder || ""}
                      value={answers[f.key] || ""}
                      onChange={(e) => setAnswer(f.key, e.target.value)} />
                  )}

                  {f.type === "one" && (
                    <Chips options={f.options} selected={answers[f.key]} single
                      onToggle={(v) => setAnswer(f.key, answers[f.key] === v ? "" : v)} />
                  )}

                  {f.type === "chips" && (
                    <Chips options={f.options} selected={answers[f.key] || []}
                      onToggle={(v) => setAnswer(f.key, toggleIn(answers[f.key] || [], v))} />
                  )}

                  {f.type === "specs" && (
                    <>
                      <div className="sc-chips">
                        {specs.map((s) => {
                          const on = interests.includes(s.id);
                          const atMax = !on && f.max && interests.length >= f.max;
                          return (
                            <button key={s.id} type="button"
                              className={`sc-chip${on ? " on" : ""}`}
                              disabled={atMax}
                              onClick={() => setInterests(
                                on ? interests.filter((x) => x !== s.id) : [...interests, s.id]
                              )}>
                              {s.name}
                            </button>
                          );
                        })}
                        {specs.length === 0 && <span className="sc-note">Loading interests…</span>}
                      </div>
                      {f.max && (
                        <p className="sc-note pw-count">
                          {interests.length} of {f.max} selected
                          {interests.length >= f.max ? " — deselect one to change your picks" : ""}
                        </p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </>
          )}
        </div>

        {!abroadOnly && (
          <div className="sc-wiznav">
            <button className="sc-btn ghost" disabled={step === 0}
              onClick={() => { setError(""); setStep(step - 1); }}>← Back</button>

            {step === 0 ? (
              <button className="sc-btn green" disabled={!step0Valid}
                onClick={() => {
                  if (!step0Valid) return;
                  setError("");
                  setStep(1);
                }}>
                {step0Valid ? `Next: ${steps[0]?.title || "Continue"} →` : "Pick a level to continue"}
              </button>
            ) : step < steps.length ? (
              <button className="sc-btn green"
                onClick={() => { setError(""); setStep(step + 1); }}>
                Next: {steps[step].title} →
              </button>
            ) : (
              <button className="sc-btn" disabled={busy} onClick={finish}>
                {busy ? "Saving…" : "See my career path →"}
              </button>
            )}
          </div>
        )}
      </div>
    </CounsellingShell>
  );
}
