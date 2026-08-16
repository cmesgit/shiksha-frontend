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
      <h1 className="af-heading">Resend verification email</h1>
      <p className="af-sub">
        Enter the email you signed up with and we'll send a fresh verification link.
      </p>

      {status === "success" ? (
        <div className="af-banner-success" style={{ textAlign: "left" }}>
          <div style={{ fontSize: 13.5, color: "#1e7a32", lineHeight: 1.5 }}>
            If that email has an unverified account, a verification link is on its way.
            Check your inbox (and spam).
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "contents" }}>
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
            <div className="af-error">{status}</div>
          )}
          <div className="af-spacer" />
          <div className="af-actions">
            <button type="submit" disabled={loading || !email} className="af-btn af-btn--block">
              {loading ? <><span className="af-spin" />Sending…</> : "Send verification link"}
            </button>
          </div>
        </form>
      )}

      <FooterLink>
        <Link to="/login">Back to sign in</Link>
      </FooterLink>
    </AuthShell>
  );
}
