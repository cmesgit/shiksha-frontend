import { useSearchParams, Link } from "react-router-dom";
import { AuthShell, StatusChip, FooterLink } from "./AuthKit";

const EmailVerified = () => {
  const [params] = useSearchParams();
  const status = params.get("status");
  const success = status === "success";

  return (
    <AuthShell role={success ? "success" : "danger"} flowLabel="Verify email" brandIcon="mail">
      <StatusChip icon={success ? "check" : "x"} role={success ? "success" : "danger"} />
      <h1 className="af-heading">{success ? "Email verified!" : "Verification failed"}</h1>
      <p className="af-sub">
        {success
          ? "Your email has been verified successfully. You can now sign in to your account."
          : "The verification link is invalid or has expired. Request a fresh one below."}
      </p>

      <div className="af-spacer" />
      <div className="af-actions">
        <Link to={success ? "/login" : "/resend-verification"} className="af-btn af-btn--block"
          style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {success ? "Sign in" : "Resend verification email"}
        </Link>
      </div>
      {!success && <FooterLink>Already verified? <Link to="/login">Sign in</Link></FooterLink>}
    </AuthShell>
  );
};

export default EmailVerified;
