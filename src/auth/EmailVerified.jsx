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
            : "The verification link is invalid or has expired. Please try signing up again or resend the verification email."}
        </p>

        {success ? (
          <Link to="/login" className="ev-btn">
            Sign In
          </Link>
        ) : (
          <Link to="/signup" className="ev-btn ev-btn-secondary">
            Sign Up Again
          </Link>
        )}
      </div>
    </div>
  );
};

export default EmailVerified;
