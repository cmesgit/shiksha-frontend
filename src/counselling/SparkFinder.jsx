// PLACEMENT: src/counselling/SparkFinder.jsx   (NEW FILE — landing/frontend app)
//
// "Spark Finder" — the landing page's 2-minute tap quiz for students who
// don't know where to start. Seven this-or-that taps, each option weighted
// against 1–2 real Specialization names (the same vocabulary the profile
// wizard's chips and careerPath.js's INTEREST_PATHS use — see
// counseling/migrations/0002_seed.py on the backend for the seeded list).
// Tallies taps, keeps the top-scoring specializations that actually exist
// in the live directory, and saves them via the existing intake endpoint —
// no new backend surface, this just fills career_interest_ids faster than
// the full wizard does.

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getSpecializations, saveIntake } from "../api/counselling";
import CounsellingShell from "./CounsellingShell";

// [promptTitle, [[optionLabel, [specializationNames...]], [optionLabel, [...]]]]
const QUESTIONS = [
  ["Building something with your hands", ["Vocational & Skill Careers", "Engineering Careers"],
   "Writing or telling a story", ["Arts & Humanities", "Media & Communication"]],
  ["Solving a tricky number puzzle", ["Commerce & Finance", "Computer Science & IT"],
   "Helping a friend work through a problem", ["Medicine & Health Sciences", "Education & Teaching"]],
  ["Designing how something looks", ["Design & Creative Careers"],
   "Figuring out how something works", ["Engineering Careers", "Technology"]],
  ["Leading a group project", ["Business & Management", "Civil Services & Government Exams"],
   "Going deep on research alone", ["Study Abroad", "University Admissions"]],
  ["Debating both sides of an issue", ["Law", "Civil Services & Government Exams"],
   "Coding a small app or game", ["Computer Science & IT", "Technology"]],
  ["Starting your own small venture", ["Entrepreneurship", "Business & Management"],
   "Training hard for a physical goal", ["Defence & Armed Forces", "Sports & Fitness Careers"]],
  ["Explaining a topic so it finally clicks", ["Education & Teaching", "Media & Communication"],
   "Caring for someone who's unwell", ["Medicine & Health Sciences"]],
];

export default function SparkFinder() {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { state: { from: "/counselling/spark" } });
    }
  }, [authLoading, isAuthenticated, navigate]);

  const tap = async (names) => {
    const next = { ...scores };
    names.forEach((n) => { next[n] = (next[n] || 0) + 1; });
    setScores(next);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
      return;
    }

    setBusy(true);
    setError("");
    try {
      const specs = await getSpecializations();
      const byName = new Map(specs.map((s) => [s.name, s.id]));
      const topIds = Object.entries(next)
        .sort((a, b) => b[1] - a[1])
        .map(([name]) => byName.get(name))
        .filter(Boolean)
        .slice(0, 3);
      await saveIntake({ career_interest_ids: topIds });
      navigate("/counselling/path");
    } catch {
      setError("Couldn't save your answers — check your connection and try again.");
      setBusy(false);
    }
  };

  const q = QUESTIONS[step];

  return (
    <CounsellingShell crumb=" / Spark Finder">
      <div className="sc-wizard">
        <span className="sc-eyebrow">2-minute tap quiz</span>
        <h1 className="sc-h1">Spark Finder</h1>
        <p className="sc-sub">
          No essays, no forms — just tap whichever side of each pair pulls
          you more. We'll turn your answers into career interests on your
          profile.
        </p>

        <div className="sc-wizbar">
          {QUESTIONS.map((_, i) => <i key={i} className={i <= step ? "on" : ""} />)}
        </div>
        {error && <div className="sc-error">{error}</div>}

        {busy ? (
          <div className="sc-empty">Building your path…</div>
        ) : (
          <>
            <p className="sc-note" style={{ margin: "0 0 10px" }}>Question {step + 1} of {QUESTIONS.length} — which pulls you more?</p>
            <div className="sc-grid2">
              <button className="sc-card" style={{ textAlign: "left", cursor: "pointer", font: "700 14.5px 'Montserrat',sans-serif", color: "#14201a" }}
                onClick={() => tap(q[1])}>
                {q[0]}
              </button>
              <button className="sc-card" style={{ textAlign: "left", cursor: "pointer", font: "700 14.5px 'Montserrat',sans-serif", color: "#14201a" }}
                onClick={() => tap(q[3])}>
                {q[2]}
              </button>
            </div>
          </>
        )}
      </div>
    </CounsellingShell>
  );
}
