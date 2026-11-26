// PLACEMENT: src/counselling/MatchesPage.jsx   (NEW FILE — landing/frontend app)
//
// Workflow screen 4 — COUNSELLOR MATCHES: recommended counsellors with a
// match percentage and the ranked reasons behind it (straight from the
// backend's rule engine). Signed-out visitors and incomplete profiles
// see the public directory instead, with a nudge to complete the profile.

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getCounsellors, getMatches } from "../api/counselling";
import { submitContactMessage } from "../api/contentApi";
import CounsellingShell, { initialsOf, gradOf, matchPercent, EXPERIENCE_LABELS } from "./CounsellingShell";

// Same validation AdmissionHelpModal.jsx uses -- the backend (ContactMessage)
// does not enforce an email format itself, so this is UX only.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The directory's empty state (no counsellors onboarded yet) used to be a
// dead end: a sentence and a link, no way to ask to be told when one joins.
// There is no "counsellor" board/course row to hang a BoardNotifyRequest /
// CourseNotifyRequest off, so this reuses the same ContactMessage endpoint
// AdmissionHelpModal.jsx already repurposes for counselling leads --
// topic="admissions" is the convention that modal established for "talk to
// a counsellor" requests with no dedicated backend model of their own.
function CounsellorAlertForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setFailed("");

    const next = {};
    if (!name.trim()) next.name = true;
    if (!EMAIL_RE.test(email.trim())) next.email = true;
    if (!consent) next.consent = true;
    setErrors(next);
    if (Object.keys(next).length) return;

    setSending(true);
    try {
      await submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        phone: "",
        role: "student",
        topic: "admissions",
        message: "Alert me when a counsellor is available — requested from the empty counsellor directory.",
        consent: true,
      });
      setDone(true);
    } catch (err) {
      setFailed(
        err?.response?.status === 429
          ? "That's a lot of requests from this connection — please wait a little while and try again."
          : "Sorry — that couldn't be sent just now. Please try again in a moment."
      );
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="cns-alert cns-alert-done" role="status" aria-live="polite">
        <span aria-hidden="true">✓</span> Thanks — we'll email {email} as soon as a counsellor is available.
      </div>
    );
  }

  return (
    <form className="cns-alert" onSubmit={onSubmit} noValidate>
      <p className="cns-alert-title">Alert me when a counsellor is available</p>
      <div className="cns-alert-row">
        <input
          value={name} onChange={(e) => setName(e.target.value)}
          type="text" placeholder="Your name" autoComplete="name"
          className={`sc-input${errors.name ? " cns-err" : ""}`}
        />
        <input
          value={email} onChange={(e) => setEmail(e.target.value)}
          type="email" placeholder="you@email.com" autoComplete="email"
          className={`sc-input${errors.email ? " cns-err" : ""}`}
        />
        <button className="sc-btn sm" type="submit" disabled={sending}>
          {sending ? "Sending…" : "Notify me"}
        </button>
      </div>
      <label className={`cns-alert-consent${errors.consent ? " cns-err" : ""}`}>
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>I agree ShikshaCom may email me about this.</span>
      </label>
      {(errors.name || errors.email) && (
        <small className="cns-alert-errtx">Please enter your name and a valid email address.</small>
      )}
      {failed && <small className="cns-alert-errtx">{failed}</small>}
    </form>
  );
}

export default function MatchesPage() {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [rows, setRows] = useState(null);      // [{counselor, match_score?, reasons?}]
  const [mode, setMode] = useState("loading"); // matched | directory
  const [error, setError] = useState("");

  useEffect(() => {
    let live = true;
    const run = async () => {
      try {
        if (isAuthenticated) {
          const d = await getMatches();
          if (!live) return;
          if (d.intake_complete) {
            setRows(d.results || []);
            setMode("matched");
            return;
          }
        }
        const d = await getCounsellors();
        if (!live) return;
        setRows((d.results || []).map((c) => ({ counselor: c })));
        setMode("directory");
      } catch {
        if (live) setError("Couldn't load counsellors — please refresh.");
      }
    };
    if (!authLoading) run();
    return () => { live = false; };
  }, [isAuthenticated, authLoading]);

  const maxScore = mode === "matched" && rows?.length
    ? Math.max(...rows.map((r) => r.match_score || 0))
    : 0;

  return (
    <CounsellingShell crumb=" / Counsellors" step="matches">
      <div className="sc-h2row" style={{ marginTop: 0 }}>
        <div>
          <h1 className="sc-h1">{mode === "matched" ? "Your recommended counsellors" : "Counsellor directory"}</h1>
          <p className="sc-sub" style={{ marginBottom: 0 }}>
            {mode === "matched"
              ? "Ranked for your interests, stream and language — with the reasons shown."
              : "Browse everyone. Complete your career profile to get ranked matches with a match score."}
          </p>
        </div>
        {mode === "directory" && (
          <button className="sc-btn" onClick={() =>
            isAuthenticated
              ? navigate("/counselling/profile")
              : navigate("/login", { state: { from: "/counselling/profile" } })
          }>
            Get my matches →
          </button>
        )}
      </div>

      {error && <div className="sc-error">{error}</div>}

      {rows === null ? (
        <div className="sc-grid2" style={{ marginTop: 18 }}>
          {[0, 1, 2, 3].map((i) => <div key={i} className="sc-skel" style={{ height: 190 }} />)}
        </div>
      ) : rows.length === 0 ? (
        <div className="sc-empty" style={{ marginTop: 18 }}>
          Counsellors are onboarding right now — check back soon, or{" "}
          <Link to="/counselling/india" style={{ color: "#1b9c85", fontWeight: 700 }}>read the guides</Link>{" "}
          meanwhile.
          <CounsellorAlertForm />
        </div>
      ) : (
        <div className="sc-grid2" style={{ marginTop: 18 }}>
          {rows.map(({ counselor: c, match_score, reasons }) => {
            const pct = mode === "matched" ? matchPercent(match_score, maxScore) : null;
            return (
              <div key={c.id} className="sc-card sc-cslr">
                <div className="sc-cslr-head">
                  <span className="sc-avatar" style={{ background: gradOf(c.display_name) }}>
                    {c.photo_url ? <img src={c.photo_url} alt="" /> : initialsOf(c.display_name)}
                  </span>
                  <div>
                    <div className="sc-cslr-name">{c.display_name}</div>
                    <div className="sc-cslr-meta">
                      {EXPERIENCE_LABELS[c.years_experience] || "Counsellor"}
                      {c.languages?.length ? ` · ${c.languages.join(", ")}` : ""}
                      {Number(c.avg_rating) > 0 ? ` · ★ ${c.avg_rating}` : ""}
                    </div>
                  </div>
                  {mode === "matched" && (
                    <div className="sc-matchpct">
                      {pct !== null ? <><b>{pct}%</b><span>match</span></> : <><b>New</b><span>match</span></>}
                    </div>
                  )}
                </div>
                <div className="sc-tags">
                  {(c.specializations || []).slice(0, 4).map((s) => (
                    <span key={s.id} className="sc-badge teal">{s.name}</span>
                  ))}
                </div>
                {reasons?.length > 0 && (
                  <div className="sc-reasons">
                    {reasons.slice(0, 3).map((r, i) => <div key={i} className="sc-reason">{r}</div>)}
                  </div>
                )}
                <div className="sc-cslr-actions">
                  <Link className="sc-btn green sm" to={`/counselling/counsellors/${c.id}`}>View profile & book</Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </CounsellingShell>
  );
}
