import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import api from "../api/apiClient";
import { AuthShell, StatusChip, FooterLink } from "./AuthKit";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResend = async () => {
    if (!email) {
      // The email only ever lives in React Router state, which a page
      // refresh (or arriving here directly, e.g. a stale bookmark) loses —
      // don't dead-end into "sign up again" (which hits "an account already
      // exists" for this exact case); /resend-verification asks for the
      // email directly and doesn't depend on this page's state at all.
      setError("");
      navigate("/resend-verification");
      return;
    }

    setResending(true);
    setError("");
    setMessage("");

    try {
      await api.post("/accounts/resend-verification/", { email });
      // The backend sends a separate, labelled link to every unverified
      // account on this email, so acknowledge that more than one is possible.
      setMessage(
        "Verification sent. If this email has more than one account, " +
        "we've sent a separate link for each — check your inbox."
      );
    } catch (err) {
      setError(
        err?.response?.data?.detail || "Failed to resend. Please try again."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthShell role="neutral" flowLabel="Verify email" brandIcon="mail">
      <StatusChip icon="mail" role="neutral" />
      <h1 className="af-heading">Check your inbox</h1>
      <p className="af-sub">
        We've sent a verification link to{" "}
        {email ? <strong>{email}</strong> : "your email address"}. Click the
        link in the email to activate your account.
      </p>
      <p className="af-sub" style={{ fontSize: 13, marginTop: 8 }}>
        Didn't receive it? Check your spam folder or resend below. If you've
        registered more than one account with this email, each one gets its
        own link.
      </p>

      {message && <div className="af-banner-success" style={{ textAlign: "left" }}>
        <div style={{ fontSize: 13.5, color: "#1e7a32", lineHeight: 1.5 }}>{message}</div>
      </div>}
      {error && <div className="af-error">{error}</div>}

      <div className="af-spacer" />
      <div className="af-actions">
        <button type="button" className="af-btn af-btn--block" onClick={handleResend} disabled={resending}>
          {resending ? <><span className="af-spin" />Sending…</> : "Resend verification email"}
        </button>
      </div>
      <FooterLink>Already verified? <Link to="/login">Sign in</Link></FooterLink>
    </AuthShell>
  );
};

export default VerifyEmail;
