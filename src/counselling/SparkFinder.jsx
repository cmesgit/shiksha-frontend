// PLACEMENT: src/counselling/SparkFinder.jsx   (landing/frontend app)
//
// Workflow §5 — "Spark Finder", the 12-question career alignment quiz for
// students who don't know where to start. Rebuilt to the v3 design.
//
// What changed from the first version, and why it matters:
//   • 12 statements rated on a 3-point scale (Not me / A little / That's me,
//     weighted 0/1/2), not 7 either-or taps. Weighting is what lets a
//     lukewarm "a little" register without outvoting a real "that's me".
//   • Scores land on EIGHT NAMED PERSONAS (SPARK_PERSONAS in careerVocab.js)
//     rather than straight onto specialization names, so the result can be
//     explained to the student instead of just silently applied.
//   • There is a RESULT SCREEN. The old version saved and redirected without
//     ever showing what it found — the student answered seven questions and
//     landed on a different page with no idea why. Now the result is shown,
//     and "Use these interests" is an explicit choice.
//   • Back genuinely undoes: it pops the answer AND subtracts that answer's
//     weight from its category. Decrementing without storing the per-answer
//     weight would corrupt the score on any non-zero answer.
//
// Still no new backend surface: the result is written through the existing
// intake endpoint as career_interest_ids, same as before.

import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getSpecializations, saveIntake } from "../api/counselling";
import CounsellingShell from "./CounsellingShell";
import {
  SPARK_PERSONAS, assertPersonaSpecsExist, hasFullDetail, toCareerKey,
} from "./careerVocab";

// Statement → the persona it scores for. Order is the v3 order: categories
// are interleaved so no one persona's questions arrive in a block.
const QUESTIONS = [
  ["I love figuring out how machines, apps or gadgets work.", "tech"],
  ["I lose track of time when I'm drawing, designing or making things.", "creative"],
  ["Helping someone finally understand something makes my day.", "people"],
  ["I'm curious about the body, plants, space or why nature works.", "science"],
  ["I like being in charge — organising people or running events.", "business"],
  ["Coding or cracking a tricky logic puzzle sounds fun to me.", "tech"],
  ["I enjoy performing, making music, videos or telling stories.", "media"],
  ["I notice when something is unfair and want to fix it.", "justice"],
  ["Sports, fitness or being outdoors is where I feel alive.", "action"],
  ["I'd love to start my own business or side-hustle one day.", "business"],
  ["I like experiments and asking 'but why does that happen?'", "science"],
  ["I'd love to create art or content that lots of people enjoy.", "creative"],
];

const OPTIONS = [
  ["Not me", "Doesn't describe me", "✕", "no", 0],
  ["A little", "Somewhat like me", "–", "mid", 1],
  ["That's me", "Describes me well", "✓", "yes", 2],
];

export default function SparkFinder() {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [answers, setAnswers] = useState([]);   // one weight per answered question
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { state: { from: "/counselling/spark" } });
    }
  }, [authLoading, isAuthenticated, navigate]);

  const step = answers.length;
  const done = step >= QUESTIONS.length;

  // Derive scores from the answer list rather than keeping a running tally.
  // One source of truth means Back can't drift out of sync with the scores.
  const ranked = useMemo(() => {
    const scores = {};
    answers.forEach((w, i) => {
      const cat = QUESTIONS[i][1];
      scores[cat] = (scores[cat] || 0) + w;
    });
    return Object.entries(SPARK_PERSONAS)
      .map(([k, p]) => ({ key: k, persona: p, score: scores[k] || 0 }))
      .sort((a, b) => b.score - a.score);
  }, [answers]);

  const primary = ranked[0];
  const secondary = ranked[1]?.score > 0 ? ranked[1] : null;

  // Shown to the student. Careers, not specializations — see careerVocab.js.
  const careers = useMemo(() => {
    if (!done) return [];
    const list = primary.persona.careers.slice(0, 3);
    if (secondary) list.push(secondary.persona.careers[0]);
    return [...new Set(list)];
  }, [done, primary, secondary]);

  const useResult = async () => {
    setBusy(true);
    setError("");
    try {
      const specs = await getSpecializations();
      assertPersonaSpecsExist(specs.map((s) => s.name));
      const byName = new Map(specs.map((s) => [s.name, s.id]));

      const wanted = [...primary.persona.specs, ...(secondary?.persona.specs || [])];
      const ids = [...new Set(wanted.map((n) => byName.get(n)).filter(Boolean))].slice(0, 5);

      // Every name missing from the live directory means we'd save an empty
      // interest list and send the student to a path page built on nothing.
      // Say so instead of silently "succeeding".
      if (ids.length === 0) {
        setError("We couldn't match your result to the current interest list. "
          + "Your answers are safe — try the full career profile instead.");
        setBusy(false);
        return;
      }

      await saveIntake({ career_interest_ids: ids });
      navigate("/counselling/path");
    } catch {
      setError("Couldn't save your answers — check your connection and try again.");
      setBusy(false);
    }
  };

  const answer = (weight) => setAnswers([...answers, weight]);
  const back = () => setAnswers(answers.slice(0, -1));
  const restart = () => { setAnswers([]); setError(""); };

  return (
    <CounsellingShell crumb=" / Spark Finder">
      <div className="sc-wizard">
        <span className="sc-eyebrow">2-minute quiz</span>
        <h1 className="sc-h1">Spark Finder</h1>
        <p className="sc-sub">
          Twelve statements, no right answers. Rate how much each one sounds
          like you and we'll show you which kind of work fits — then turn it
          into career interests on your profile.
        </p>

        <div className="sc-wizbar">
          {QUESTIONS.map((_, i) => <i key={i} className={i < step ? "on" : ""} />)}
        </div>
        {error && <div className="sc-error">{error}</div>}

        {!done ? (
          <>
            <p className="sc-note sp-count">Question {step + 1} of {QUESTIONS.length}</p>
            <div className="sc-card sp-qcard">
              <p className="sp-q">{QUESTIONS[step][0]}</p>
              <div className="sp-opts">
                {OPTIONS.map(([label, sub, icon, cls, weight]) => (
                  <button key={label} className={`sp-opt ${cls}`} onClick={() => answer(weight)}>
                    <span className="sp-opt-icon">{icon}</span>
                    <strong>{label}</strong>
                    <em>{sub}</em>
                  </button>
                ))}
              </div>
            </div>
            <div className="sc-wiznav">
              <button className="sc-btn ghost" disabled={step === 0} onClick={back}>← Back</button>
            </div>
          </>
        ) : (
          <>
            <div className="sc-card sp-result">
              <span className="sp-result-emoji">{primary.persona.emoji}</span>
              <span className="sc-eyebrow">You're mostly</span>
              <h2 className="sp-result-label">{primary.persona.label}</h2>
              <p className="sp-result-blurb">{primary.persona.blurb}</p>
              {secondary && (
                <p className="sc-note">
                  With a strong streak of {secondary.persona.emoji} {secondary.persona.label}.
                </p>
              )}
              <div className="sp-result-meta">
                <div>
                  <span className="cf-kvlabel">Stream this usually points at</span>
                  <span className="cf-kvvalue">{primary.persona.stream}</span>
                </div>
              </div>

              <h3 className="cf-sec-h4">Careers this points at</h3>
              <div className="sc-tags">
                {careers.map((c) => (
                  hasFullDetail(c) ? (
                    <Link key={c} className="sc-chip sp-chip-link"
                      to={`/counselling/careers/${encodeURIComponent(toCareerKey(c))}`}>
                      {c} →
                    </Link>
                  ) : <span key={c} className="sc-chip">{c}</span>
                ))}
              </div>
              <p className="sc-note sp-foot">
                This is a nudge, not a verdict — it's based on twelve questions.
                A counsellor will go much deeper.
              </p>
            </div>

            <div className="sc-wiznav sp-resnav">
              <button className="sc-btn ghost" onClick={restart} disabled={busy}>Try again</button>
              <button className="sc-btn green" onClick={useResult} disabled={busy}>
                {busy ? "Saving…" : "Use these interests →"}
              </button>
            </div>
            <p className="sc-note sp-foot">
              Prefer to pick your own? <Link to="/counselling/profile">Build the full career profile →</Link>
            </p>
          </>
        )}
      </div>
    </CounsellingShell>
  );
}
