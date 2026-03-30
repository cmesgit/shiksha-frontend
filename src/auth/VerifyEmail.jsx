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
    <div className="verify-container">
      <div className="verify-card">
        <div className="verify-icon">✉️</div>
        <h2>Verify Your Email</h2>
        <p className="verify-desc">
          We've sent a verification link to{" "}
          {email ? <strong>{email}</strong> : "your email"}.
          Please check your inbox and click the link to verify your account.
        </p>

        <p className="verify-note">
          Didn't receive the email? Check your spam folder or click below to resend.
        </p>

        <button
          className="verify-resend-btn"
          onClick={handleResend}
          disabled={resending}
        >
          {resending ? "Sending..." : "Resend Verification Email"}
        </button>

        {message && <p className="verify-success">{message}</p>}
        {error && <p className="verify-error">{error}</p>}

        <p className="verify-footer">
          Already verified? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
