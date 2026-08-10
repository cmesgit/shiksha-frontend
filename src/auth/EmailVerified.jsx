import { useSearchParams, Link } from "react-router-dom";
import "./EmailVerified.css";

const EmailVerified = () => {
  const [params] = useSearchParams();
  const status = params.get("status");
  const success = status === "success";

  return (
    <div className="ev-container">
      <div className="ev-card">
        <div className="ev-icon">{success ? "✅" : "❌"}</div>
        <h2>{success ? "Email Verified!" : "Verification Failed"}</h2>
        <p className="ev-desc">
          {success
            ? "Your email has been verified successfully. You can now sign in to your account."
            : "The verification link is invalid or has expired. Request a fresh one below."}
        </p>

        {success ? (
          <Link to="/login" className="ev-btn">
            Sign In
          </Link>
        ) : (
          // Signing up again on this email hits "Log in to manage them" (an
          // account already exists, just unverified) — a dead end with no way
          // forward. Resending a fresh link is the actual recovery path.
          <Link to="/resend-verification" className="ev-btn ev-btn-secondary">
            Resend Verification Email
          </Link>
        )}
      </div>
    </div>
  );
};

export default EmailVerified;
