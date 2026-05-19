import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import api from "../api/apiClient";
import "./VerifyEmail.css";

const VerifyEmail = () => {
  const location = useLocation();
  const email = location.state?.email || "";

  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResend = async () => {
    if (!email) {
      setError("No email address found. Please sign up again.");
      return;
    }

    setResending(true);
    setError("");
    setMessage("");

    try {
      await api.post("/accounts/resend-verification/", { email });
      setMessage("Verification email sent! Check your inbox.");
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
