import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { AuthShell, Field, PasswordField, FooterLink } from "./AuthKit";

/* ════════════════════════════════════════════════════════════════
   Login — CLEAN single-account model (Netflix flow)

   You log in ONCE. Then the picker decides who you are.

   Step 1  email      → optional pre-auth lookup for a friendly greeting
   Step 2  password   → POST /accounts/login/
                          · context "learner" (backend auto-selected a single
                            PIN-free profile, no teacher) → student dashboard
                          · context "account" (multiple profiles, a PIN, or a
                            teacher identity exists) → /pick-profile

   REMOVED vs. the old flow (this was the source of the confusion):
     - "Log in as Student / Teacher / Admin" role grid    → gone
     - Teacher "Learner | Teacher" sub-choice             → gone (picker does it)
     - Pre-auth profile GRID on the login screen          → gone (picker does it)
     - Teacher-type (Guest | Faculty) picker              → gone (routed by backend)
     - Admin 2FA stub screen                              → gone (admins log in
       with the same email + password and are routed by role; see ADMIN note)

   The ProfilePicker (/pick-profile) is the single switchboard for
   "who am I right now": learner tiles (people) + one Teaching tile (a mode).
════════════════════════════════════════════════════════════════ */

const STEP_EMAIL = "email";
const STEP_PW     = "pw";

function readErr(err, fallback) {
  const raw = err?.message ?? err;
  return raw instanceof Error ? raw.message
    : typeof raw === "string" ? raw
    : err?.response?.data?.detail || fallback;
}

export default function Login() {
  const { login, lookupEmail } = useAuth();
  const location = useLocation();

  const [step, setStep]             = useState(STEP_EMAIL);
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [showPw, setShowPw]         = useState(false);
  const [greetName, setGreetName]   = useState("");
  const [error, setError]           = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg]   = useState("");

  // Carry messages forwarded from signup / "identity added" flows.
  useEffect(() => {
    if (location.state?.message) setStatusMsg(location.state.message);
  }, [location.state]);



  /* ── Step 1: email → friendly greeting, then password ── */
  const submitEmail = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) { setError("Please enter your email."); return; }
    setSubmitting(true);
    try {
      // Pre-auth lookup returns display names only (no secrets). Used purely
      // to greet the user; failure is non-blocking and never reveals whether
      // the email exists beyond what the picker already shows.
      const data = await lookupEmail(email);
      const first = (data?.profiles || [])[0];
      setGreetName(first?.display_name || "");
    } catch {
      setGreetName("");
    } finally {
      setSubmitting(false);
      setStep(STEP_PW);
    }
  };

  /* ── Step 2: password → real login → let App.jsx route by context ── */
  const submitPw = async (e) => {
    e.preventDefault();
    setError(""); setSubmitting(true);
    try {
      setStatusMsg("Checking your account…");
      await login(email, password);
      // login() now always runs bootstrap() before returning, so by the time
      // we reach here: isAuthenticated=true, context is set, user is populated.
      //
      // App.jsx's /login route already handles all three outcomes:
      //   context="learner"  → window.location.replace(APP_DASHBOARD_URL)
      //   context="teacher"  → window.location.replace(TEACHER_DASHBOARD_URL)
      //   context="account"  → <Navigate to="/pick-profile" replace />
      //
      // Because login() calls setLoading(true) internally, App.jsx renders
      // <RouteFallback /> during bootstrap which UNMOUNTS this component.
      // Any code after `await login()` runs on an unmounted component — React
      // 18 makes setState no-ops, but window.location calls still fire. So we
      // do nothing here and let the App.jsx route tree handle navigation.
      //
      // (Admin: same email+password, routed by role. Hook stub:)
      //   if (hasRole("ADMIN")) window.location.href = ADMIN_URL;
    } catch (err) {
      setError(readErr(err, "Login failed."));
      setStatusMsg(""); setSubmitting(false);
    }
  };

  const back = () => {
    setError(""); setStatusMsg("");
    setStep(STEP_EMAIL);
  };

  return (
    <AuthShell role="student" flowLabel="Log in">



      <div className="af-toprow">
        {step !== STEP_EMAIL
          ? <button className="af-iconbtn" onClick={back} aria-label="Back">‹</button>
          : <span />}
      </div>

      {/* ── Step 1: email ── */}
      {step === STEP_EMAIL && (
        <>
          <h1 className="af-heading">Welcome back</h1>
          <p className="af-sub">Log in with your email to continue.</p>
          {statusMsg && !error && <div className="af-status">{statusMsg}</div>}
          <form onSubmit={submitEmail} style={{ display: "contents" }}>
            <Field id="lf-email" label="Email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
              required autoFocus autoComplete="email" />
            {error && <div className="af-error">{error}</div>}
            <div className="af-spacer" />
            <div className="af-actions">
              <button type="submit" className="af-btn af-btn--block" disabled={submitting}>
                {submitting ? <><span className="af-spin" />Checking…</> : "Continue"}
              </button>
            </div>
          </form>
          <FooterLink>Don't have an account? <Link to="/signup">Create one</Link></FooterLink>
        </>
      )}

      {/* ── Step 2: password ── */}
      {step === STEP_PW && (
        <>
          <h1 className="af-heading">{greetName ? `Hi, ${greetName}` : "Enter your password"}</h1>
          <p className="af-sub">Enter the password for <strong>{email}</strong>.</p>
          <form onSubmit={submitPw} style={{ display: "contents" }}>
            <PasswordField id="lf-password" label="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
              required autoFocus autoComplete="current-password"
              show={showPw} onToggle={() => setShowPw((v) => !v)} />
            <Link to="/forgot-password" className="af-note">Forgot password?</Link>
            {error && <div className="af-error">{error}</div>}
            {statusMsg && !error && <div className="af-status">{statusMsg}</div>}
            <div className="af-spacer" />
            <div className="af-actions">
              <button type="submit" className="af-btn af-btn--block" disabled={submitting}>
                {submitting ? <><span className="af-spin" />Signing in…</> : "Log in"}
              </button>
            </div>
          </form>
          <FooterLink>Don't have an account? <Link to="/signup">Create one</Link></FooterLink>
        </>
      )}

    </AuthShell>
  );
}
