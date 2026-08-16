import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import api from "../api/apiClient";
import "./VerifyEmail.css";

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
    <div className="ve-container">
      {/* Decorative glows — mirrors Login page */}
      <div className="ve-glow ve-glow--tl" />
      <div className="ve-glow ve-glow--br" />
      <div className="ve-glow ve-glow--tr" />
      <div className="ve-glow ve-glow--center" />

      <div className="ve-card">
        {/* Envelope icon */}
        <div className="ve-icon-wrap">
          <svg
            className="ve-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="4" width="20" height="16" rx="2.5" />
            <path d="m2 7 10 6.5L22 7" />
          </svg>
        </div>

        <h2 className="ve-title">Check your inbox</h2>

        <p className="ve-desc">
          We&apos;ve sent a verification link to{" "}
          {email ? (
            <strong className="ve-email">{email}</strong>
          ) : (
            "your email address"
          )}
          . Click the link in the email to activate your account.
        </p>

        <p className="ve-note">
          Didn&apos;t receive it? Check your spam folder or resend below.
          If you&apos;ve registered more than one account with this email,
          each one gets its own link.
        </p>

        <button
          className="ve-btn"
          onClick={handleResend}
          disabled={resending}
        >
          {resending ? (
            <><span className="ve-btn__spinner" /> Sending…</>
          ) : (
            "Resend Verification Email"
          )}
        </button>

        {message && (
          <div className="ve-alert ve-alert--success">{message}</div>
        )}
        {error && (
          <div className="ve-alert ve-alert--error">{error}</div>
        )}

        <p className="ve-footer">
          Already verified?{" "}
          <Link to="/login" className="ve-link">Sign in →</Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
