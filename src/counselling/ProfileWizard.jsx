// PLACEMENT: src/counselling/ProfileWizard.jsx   (NEW FILE — landing/frontend app)
//
// Workflow screen 2 — PROFILE wizard. Four short steps writing to
// PUT /counseling/intake/. Personal + education data already lives on
// the LearnerProfile (the backend returns it read-only in the intake's
// `learner` block), so this wizard only asks what's missing: interests,
// skills, goals, preferences — exactly the anti-duplication rule the
// backend was built around.

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getIntake, getSpecializations, saveIntake } from "../api/counselling";
import CounsellingShell from "./CounsellingShell";

const SKILLS = ["Communication", "Leadership", "Programming", "Creativity", "Design",
  "Mathematics", "Writing", "Public Speaking", "Problem Solving"];

const ENVIRONMENTS = [
  ["office", "Office / corporate"], ["field", "Field / outdoors"],
  ["remote", "Remote / online"], ["creative", "Creative studio"],
  ["research", "Research / academia"], ["public", "Public service"],
  ["entrepreneur", "Own business"], ["mixed", "Not sure yet"],
];

const STEPS = ["Career interests", "Skills", "Goals", "Preferences"];

export default function ProfileWizard() {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [step, setStep] = useState(0);
  const [specs, setSpecs] = useState([]);
  const [learner, setLearner] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const [interests, setInterests] = useState([]);       // spec ids
  const [skills, setSkills] = useState([]);
  const [industry, setIndustry] = useState("");
  const [longGoals, setLongGoals] = useState("");
  const [shortGoals, setShortGoals] = useState("");
  const [environment, setEnvironment] = useState("");
  const [languages, setLanguages] = useState("");
  const [subjects, setSubjects] = useState("");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { state: { from: "/counselling/profile" } });
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;
    let live = true;
    Promise.all([getSpecializations(), getIntake()]).then(([sp, intake]) => {
      if (!live) return;
      setSpecs(sp);
      setLearner(intake.learner);
      setInterests((intake.career_interests || []).map((x) => x.id));
      setSkills((intake.skills || "").split(",").map((x) => x.trim()).filter(Boolean));
      setIndustry(intake.preferred_industry || "");
      setLongGoals(intake.long_term_goals || "");
      setShortGoals(intake.short_term_goals || "");
      setEnvironment(intake.work_environment || "");
      setLanguages(intake.languages || "");
      setSubjects(intake.favorite_subjects || "");
    }).catch(() => live && setError("Couldn't load your profile — please refresh."));
    return () => { live = false; };
  }, [isAuthenticated]);

  const toggle = (arr, set, v) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const finish = async () => {
    if (interests.length === 0) {
      setError("Pick at least one career interest — it's what matching runs on.");
      setStep(0);
      return;
    }
    setBusy(true);
    setError("");
    try {
      await saveIntake({
        career_interest_ids: interests,
        skills: skills.join(", "),
        preferred_industry: industry,
        long_term_goals: longGoals,
        short_term_goals: shortGoals,
        work_environment: environment,
        languages,
        favorite_subjects: subjects,
      });
      navigate("/counselling/path");
    } catch {
      setError("Couldn't save — check your connection and try again.");
      setBusy(false);
    }
  };

  return (
    <CounsellingShell crumb=" / Career Profile" step="profile">
      <div className="sc-wizard">
        <h1 className="sc-h1">Your career profile</h1>
        <p className="sc-sub">
          Four quick steps. This powers your personalised path and your
          counsellor matches — you can change it anytime.
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
          {STEPS.map((s, i) => <i key={s} className={i <= step ? "on" : ""} />)}
        </div>
        {error && <div className="sc-error">{error}</div>}

        <div className="sc-card">
          {step === 0 && (
            <>
              <label className="sc-label">Which career areas interest you? (pick 1–5)</label>
              <div className="sc-chips">
                {specs.map((s) => (
                  <button key={s.id} className={`sc-chip${interests.includes(s.id) ? " on" : ""}`}
                    onClick={() => toggle(interests, setInterests, s.id)}>
                    {s.name}
                  </button>
                ))}
                {specs.length === 0 && <span className="sc-note">Loading interests…</span>}
              </div>
              <div className="sc-field" style={{ marginTop: 18 }}>
                <label className="sc-label">Favourite subjects (optional)</label>
                <input className="sc-input" placeholder="e.g. Maths, Computer Science, Economics"
                  value={subjects} onChange={(e) => setSubjects(e.target.value)} />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <label className="sc-label">Which skills describe you?</label>
              <div className="sc-chips">
                {SKILLS.map((s) => (
                  <button key={s} className={`sc-chip${skills.includes(s) ? " on" : ""}`}
                    onClick={() => toggle(skills, setSkills, s)}>
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="sc-field">
                <label className="sc-label">Long-term goal — where do you want to end up?</label>
                <textarea className="sc-textarea" placeholder="e.g. Become a software engineer at a product company"
                  value={longGoals} onChange={(e) => setLongGoals(e.target.value)} />
              </div>
              <div className="sc-field">
                <label className="sc-label">Short-term goal — the next 1–2 years</label>
                <textarea className="sc-textarea" placeholder="e.g. Score well in boards and clear JEE Main"
                  value={shortGoals} onChange={(e) => setShortGoals(e.target.value)} />
              </div>
              <div className="sc-field">
                <label className="sc-label">Preferred industry (optional)</label>
                <input className="sc-input" placeholder="e.g. Software, Healthcare, Finance"
                  value={industry} onChange={(e) => setIndustry(e.target.value)} />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="sc-field">
                <label className="sc-label">Preferred work environment</label>
                <div className="sc-chips">
                  {ENVIRONMENTS.map(([k, label]) => (
                    <button key={k} className={`sc-chip${environment === k ? " on" : ""}`}
                      onClick={() => setEnvironment(environment === k ? "" : k)}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="sc-field">
                <label className="sc-label">Languages you're comfortable being counselled in</label>
                <input className="sc-input" placeholder="e.g. English, Hindi, Mizo"
                  value={languages} onChange={(e) => setLanguages(e.target.value)} />
              </div>
            </>
          )}
        </div>

        <div className="sc-wiznav">
          <button className="sc-btn ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>← Back</button>
          {step < STEPS.length - 1 ? (
            <button className="sc-btn green" onClick={() => { setError(""); setStep(step + 1); }}>
              Next: {STEPS[step + 1]} →
            </button>
          ) : (
            <button className="sc-btn" disabled={busy} onClick={finish}>
              {busy ? "Saving…" : "See my career path →"}
            </button>
          )}
        </div>
      </div>
    </CounsellingShell>
  );
}
