// src/components/ResendVerification.jsx
// Standalone "resend my verification email" screen — for users who closed/missed
// the post-signup screen that has the inline resend button.
//   POST /accounts/resend-verification/  { email }   (public, throttled)
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthShell, Field, FooterLink } from "../auth/AuthKit";
import api from "../api/apiClient";

export default function ResendVerification() {
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus]   = useState(null);   // "success" | string error | null

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await api.post("/accounts/resend-verification/", { email: email.trim().toLowerCase() });
      setStatus("success");
    } catch (err) {
      const d = err?.response?.data;
      setStatus(d?.detail || d?.email || "Couldn't send the email. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell role="neutral" flowLabel="Verify email" brandIcon="spark">
      <h2 style={{ marginTop: 0 }}>Resend verification email</h2>
      <p style={{ color: "#6b7280", marginTop: -4 }}>
        Enter the email you signed up with and we'll send a fresh verification link.
      </p>

      {status === "success" ? (
        <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#065f46",
                      borderRadius: 10, padding: "14px 16px", marginTop: 12 }}>
          ✓ If that email has an unverified account, a verification link is on its way.
          Check your inbox (and spam).
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Field
            label="Email address"
            id="resend-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            required
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
          />
          {typeof status === "string" && status !== "success" && (
            <div style={{ color: "#dc2626", fontSize: 13, margin: "8px 0" }}>{status}</div>
          )}
          <button type="submit" disabled={loading || !email}
            className="auth-btn"
            style={{ width: "100%", marginTop: 12, padding: "12px",
                     borderRadius: 10, border: "none", cursor: loading ? "default" : "pointer",
                     background: "#13899b", color: "#fff", fontWeight: 700, fontSize: 15,
                     opacity: loading || !email ? 0.6 : 1 }}>
            {loading ? "Sending…" : "Send verification link"}
          </button>
        </form>
      )}

      <FooterLink>
        <Link to="/login">Back to sign in</Link>
      </FooterLink>
    </AuthShell>
  );
}
