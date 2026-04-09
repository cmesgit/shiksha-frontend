// src/pages/VerifyEmail.jsx
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) {
      setError(true);
      return;
    }

    const timeout = setTimeout(() => {
      // if backend redirect doesn’t happen
      setError(true);
    }, 8000);

    window.location.href =
      `${import.meta.env.VITE_API_BASE || "https://api.shikshacom.com"}/auth/verify-email/?token=${token}`;

    return () => clearTimeout(timeout);
  }, [token]);

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>❌ Verification failed</h2>
        <p>The verification link is invalid or expired.</p>
        <Link to="/resend-verification">Resend verification email</Link>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>⏳ Verifying your email…</h2>
      <p>Please wait. This may take a few seconds.</p>
    </div>
  );
}
