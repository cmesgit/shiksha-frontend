// src/pages/ResendVerification.jsx
import { useState } from "react";

export default function ResendVerification() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE || "https://api.shikshacom.com"}/auth/resend-verification/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Resend Verification Email</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          disabled={loading}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Sending…" : "Resend Email"}
        </button>
      </form>

      {status === "success" && (
        <p style={{ color: "green" }}>
          ✅ Verification email sent. Check your inbox.
        </p>
      )}

      {status === "error" && (
        <p style={{ color: "red" }}>
          ❌ Failed to send email. Please try again.
        </p>
      )}
    </div>
  );
}
