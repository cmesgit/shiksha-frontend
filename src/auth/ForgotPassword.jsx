import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/apiClient";
import { useToast } from "../contexts/ToastContext";
import {
  AuthShell, Field, PasswordField, StatusChip, FooterLink,
} from "./AuthKit";

/* ════════════════════════════════════════════════════════════════
   ForgotPassword — on the shared Login Flow design (AuthKit shell).
   Code-based reset, wired to the real backend:
     STEP_EMAIL    → POST /accounts/password-reset/request/  { email }
     STEP_CODE     → POST /accounts/password-reset/verify/   { email, code } → { ticket }
     STEP_PASSWORD → POST /accounts/password-reset/confirm/  { email, ticket, new_password }
   One email = one account, so there's exactly one code.
════════════════════════════════════════════════════════════════ */

const STEP_EMAIL    = "email";
const STEP_CODE     = "code";
const STEP_PASSWORD = "password";

const errMsg = (err, fallback) =>
  err?.response?.data?.detail ||
  err?.response?.data?.email?.[0] ||
  err?.response?.data?.code?.[0] ||
  err?.response?.data?.new_password?.[0] ||
  err?.message ||
  fallback;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [step, setStep] = useState(STEP_EMAIL);

  const [email, setEmail] = useState("");
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const codeRefs = useRef([]);
  const [ticket, setTicket] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const code = digits.join("");

  /* ── 6-box code input ── */
  const onDigit = (i, val) => {
    const v = val.replace(/\D/g, "").slice(-1);
    const next = [...digits]; next[i] = v; setDigits(next);
    if (v && i < 5) codeRefs.current[i + 1]?.focus();
  };
  const onDigitKey = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) codeRefs.current[i - 1]?.focus();
  };
  const onDigitPaste = (e) => {
    const txt = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, 6);
    if (!txt) return;
    e.preventDefault();
    const next = ["", "", "", "", "", ""];
    for (let i = 0; i < txt.length; i++) next[i] = txt[i];
    setDigits(next);
    codeRefs.current[Math.min(txt.length, 5)]?.focus();
  };

  /* ── step 1: request a code ── */
  const handleRequest = async (e) => {
    e.preventDefault();
    setError(""); setInfo(""); setSubmitting(true);
    try {
      await api.post("/accounts/password-reset/request/", { email: email.trim().toLowerCase() });
      setInfo("If an account exists for that email, we've sent a 6-digit code. It expires in 15 minutes.");
      setDigits(["", "", "", "", "", ""]);
      setStep(STEP_CODE);
    } catch (err) {
      setError(errMsg(err, "Could not send the code. Please try again."));
    } finally {
      setSubmitting(false);
    }
  };

  /* ── step 2: verify the code → ticket ── */
  const handleVerify = async (e) => {
    e.preventDefault();
    setError(""); setInfo(""); setSubmitting(true);
    try {
      const { data } = await api.post("/accounts/password-reset/verify/", {
        email: email.trim().toLowerCase(),
        code,
      });
      setTicket(data.ticket);
      setStep(STEP_PASSWORD);
    } catch (err) {
      setError(errMsg(err, "Invalid or expired code."));
    } finally {
      setSubmitting(false);
    }
  };

  /* ── step 3: set the new password ── */
  const handleConfirm = async (e) => {
    e.preventDefault();
    setError(""); setInfo("");
    if (newPassword !== confirmPassword) { setError("Passwords do not match."); return; }
    if (newPassword.length < 8) { setError("Password must be at least 8 characters."); return; }
    setSubmitting(true);
    try {
      await api.post("/accounts/password-reset/confirm/", {
        email: email.trim().toLowerCase(),
        ticket,
        new_password: newPassword,
      });
      showToast({ message: "Password changed. Please log in.", duration: 3500 });
      navigate("/login", {
        replace: true,
        state: { message: "Your password has been changed. Please log in with your new password." },
      });
    } catch (err) {
      setError(errMsg(err, "Could not change your password. Please try again."));
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    setError(""); setInfo(""); setSubmitting(true);
    try {
      await api.post("/accounts/password-reset/request/", { email: email.trim().toLowerCase() });
      setInfo("A new code has been sent.");
      setDigits(["", "", "", "", "", ""]);
      codeRefs.current[0]?.focus();
    } catch (err) {
      setError(errMsg(err, "Could not resend the code. Please try again later."));
    } finally {
      setSubmitting(false);
    }
  };

  const back = () => {
    setError(""); setInfo("");
    if (step === STEP_CODE) setStep(STEP_EMAIL);
    else if (step === STEP_PASSWORD) setStep(STEP_CODE);
  };

  return (
    <AuthShell role="neutral" flowLabel="Reset password" brandIcon="lock">
      <div className="af-toprow">
        {step !== STEP_EMAIL
          ? <button className="af-iconbtn" onClick={back} aria-label="Back" type="button">‹</button>
          : <span />}
      </div>

      {/* ── STEP 1: email ── */}
      {step === STEP_EMAIL && (
        <>
          <h1 className="af-heading">Forgot your password?</h1>
          <p className="af-sub">Enter your account email and we'll send you a 6-digit code to reset it.</p>
          <form onSubmit={handleRequest} style={{ display: "contents" }}>
            <Field id="fp-email" label="Email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
              required autoFocus autoComplete="email" disabled={submitting} />
            {error && <div className="af-error">{error}</div>}
            <div className="af-spacer" />
            <div className="af-actions">
              <button type="submit" className="af-btn af-btn--block" disabled={submitting}>
                {submitting ? <><span className="af-spin" />Sending…</> : "Send code"}
              </button>
            </div>
          </form>
          <FooterLink>Remembered it? <Link to="/login">Back to login</Link></FooterLink>
        </>
      )}

      {/* ── STEP 2: 6-digit code ── */}
      {step === STEP_CODE && (
        <>
          <h1 className="af-heading">Enter your code</h1>
          <p className="af-sub">We sent a 6-digit code to <strong>{email}</strong>. Enter it below.</p>
          <form onSubmit={handleVerify} style={{ display: "contents" }}>
            <div className="af-2fa-boxes">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => { codeRefs.current[i] = el; }}
                  className="af-2fa-box"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => onDigit(i, e.target.value)}
                  onKeyDown={(e) => onDigitKey(i, e)}
                  onPaste={onDigitPaste}
                  autoFocus={i === 0}
                  disabled={submitting}
                />
              ))}
            </div>
            {info && !error && <p className="af-sub" style={{ marginTop: 14 }}>{info}</p>}
            {error && <div className="af-error">{error}</div>}
            <div className="af-spacer" />
            <div className="af-actions">
              <button type="submit" className="af-btn af-btn--block" disabled={submitting || code.length !== 6}>
                {submitting ? <><span className="af-spin" />Verifying…</> : "Verify code"}
              </button>
            </div>
          </form>
          <FooterLink>
            Didn't get it?{" "}
            <button type="button" className="af-note" onClick={handleResend} disabled={submitting}
              style={{ marginTop: 0 }}>Resend code</button>
          </FooterLink>
        </>
      )}

      {/* ── STEP 3: new password ── */}
      {step === STEP_PASSWORD && (
        <>
          <StatusChip icon="lock" role="neutral" />
          <h1 className="af-heading">Set a new password</h1>
          <p className="af-sub">Choose a new password for <strong>{email}</strong>.</p>
          <form onSubmit={handleConfirm} style={{ display: "contents" }}>
            <PasswordField id="fp-new" label="New password" value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} placeholder="At least 8 characters"
              required minLength={8} autoFocus autoComplete="new-password"
              show={showPassword} onToggle={() => setShowPassword((p) => !p)} />
            <PasswordField id="fp-confirm" label="Confirm new password" value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter password"
              required minLength={8} autoComplete="new-password"
              show={showPassword} onToggle={() => setShowPassword((p) => !p)} />
            {error && <div className="af-error">{error}</div>}
            <div className="af-spacer" />
            <div className="af-actions">
              <button type="submit" className="af-btn af-btn--block" disabled={submitting}>
                {submitting ? <><span className="af-spin" />Changing…</> : "Change password"}
              </button>
            </div>
          </form>
        </>
      )}
    </AuthShell>
  );
}
