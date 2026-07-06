// PLACEMENT: src/counselling/AssessmentPage.jsx   (NEW FILE — landing/frontend app)
//
// Workflow screen 6 — PRE-SESSION ASSESSMENT (optional). Renders the
// backend template's sections JSON (text / textarea / multi), autosaves
// drafts on section change, and submits when done — after which the
// answers become visible to the counsellor. Question types come from
// the seeded template; new questions added in Django admin render here
// with zero frontend changes.

import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getAssessment, saveAssessment, submitAssessment } from "../api/counselling";
import CounsellingShell from "./CounsellingShell";

export default function AssessmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [data, setData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [savedAt, setSavedAt] = useState(null);
  const dirty = useRef(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { state: { from: `/counselling/appointments/${id}/assessment` } });
    }
  }, [authLoading, isAuthenticated, navigate, id]);

  useEffect(() => {
    if (!isAuthenticated) return;
    getAssessment(id).then((d) => {
      setData(d);
      setAnswers(d.answers || {});
    }).catch((e) => setError(
      e?.response?.status === 403 ? "This isn't your appointment." : "Couldn't load the assessment."
    ));
  }, [isAuthenticated, id]);

  // light autosave every 4s while dirty and still a draft
  useEffect(() => {
    const t = setInterval(async () => {
      if (!dirty.current || !data || data.status === "submitted") return;
      dirty.current = false;
      try {
        await saveAssessment(id, answers);
        setSavedAt(new Date());
      } catch { /* retried next tick */ }
    }, 4000);
    return () => clearInterval(t);
  }, [id, answers, data]);

  const setAnswer = (k, v) => {
    setAnswers((a) => ({ ...a, [k]: v }));
    dirty.current = true;
  };

  const toggleMulti = (k, opt) => {
    const cur = Array.isArray(answers[k]) ? answers[k] : [];
    setAnswer(k, cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt]);
  };

  const submit = async () => {
    setBusy(true);
    setError("");
    try {
      await saveAssessment(id, answers);
      await submitAssessment(id);
      setData((d) => ({ ...d, status: "submitted" }));
      window.scrollTo?.(0, 0);
    } catch (e) {
      setError(e?.response?.data?.detail || "Couldn't submit — try again.");
    }
    setBusy(false);
  };

  if (error && !data) {
    return <CounsellingShell crumb=" / Assessment"><div className="sc-error">{error}</div></CounsellingShell>;
  }
  if (!data) {
    return <CounsellingShell crumb=" / Assessment"><div className="sc-skel" style={{ height: 300 }} /></CounsellingShell>;
  }

  if (data.status === "submitted") {
    return (
      <CounsellingShell crumb=" / Assessment">
        <div className="sc-card sc-confirm">
          <div className="tick">✓</div>
          <h1 className="sc-h1" style={{ fontSize: 24 }}>Assessment shared</h1>
          <p className="sc-sub" style={{ margin: "6px auto 18px" }}>
            Your counsellor can now read your answers and will come to the
            session prepared. See you there!
          </p>
          <Link className="sc-btn ghost" to="/counselling/counsellors">Return to matches</Link>
        </div>
      </CounsellingShell>
    );
  }

  return (
    <CounsellingShell crumb=" / Pre-session assessment">
      <div className="sc-wizard">
        <h1 className="sc-h1">Pre-session assessment</h1>
        <p className="sc-sub">
          Optional, but it makes your session sharper. Drafts save
          automatically{savedAt ? ` — last saved ${savedAt.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })}` : ""}.
          Your counsellor sees answers only after you submit.
        </p>
        {error && <div className="sc-error">{error}</div>}

        {(data.sections || []).map((sec) => (
          <div key={sec.key} className="sc-card sc-asec">
            <h3>{sec.title}</h3>
            {(sec.questions || []).map((qn) => (
              <div key={qn.key} className="sc-field">
                <label className="sc-label">{qn.label}</label>
                {qn.type === "multi" ? (
                  <div className="sc-chips">
                    {(qn.options || []).map((opt) => (
                      <button key={opt}
                        className={`sc-chip${(answers[qn.key] || []).includes(opt) ? " on" : ""}`}
                        onClick={() => toggleMulti(qn.key, opt)}>
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : qn.type === "textarea" ? (
                  <textarea className="sc-textarea" value={answers[qn.key] || ""}
                    onChange={(e) => setAnswer(qn.key, e.target.value)} />
                ) : (
                  <input className="sc-input" value={answers[qn.key] || ""}
                    onChange={(e) => setAnswer(qn.key, e.target.value)} />
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="sc-wiznav">
          <Link className="sc-btn ghost" to="/counselling/counsellors">Finish later</Link>
          <button className="sc-btn" disabled={busy} onClick={submit}>
            {busy ? "Submitting…" : "Submit to my counsellor →"}
          </button>
        </div>
      </div>
    </CounsellingShell>
  );
}
