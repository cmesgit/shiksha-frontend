import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthShell } from "./AuthKit";
import { useAuth } from "../contexts/AuthContext";

// Keep the account controls reachable even when the login link has a pending
// destination. Continuing follows that destination; signing out keeps it for
// the next account to use after authentication.
export default function AlreadySignedIn({ onContinue }) {
  const { user, logout } = useAuth();
  const [busy, setBusy] = useState(false);
  const who = user?.email || user?.full_name || "this account";

  return (
    <AuthShell role="student" flowLabel="Log in" loginIntro entry>
      <h1 className="af-heading">You’re already signed in</h1>
      <p className="af-sub">
        This browser is signed in as <strong className="af-session-account">{who}</strong>.
      </p>

      <div className="af-actions af-session-actions">
        <button type="button" className="af-btn af-btn--block" onClick={onContinue} disabled={busy}>
          Continue
        </button>
        <button
          type="button"
          className="af-btn af-btn--ghost af-btn--block"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            // redirect:false — staying on /login is the whole point; once the
            // session is gone this route renders the real form again.
            try { await logout({ redirect: false }); } catch { /* fall through */ }
            setBusy(false);
          }}
        >
          {busy ? "Signing out…" : "Sign out and use another account"}
        </button>
      </div>

      <p className="af-note af-session-note"><Link to="/pick-profile">Switch profile</Link></p>
      <p className="af-note af-session-note">
        Signing out here only affects this browser. <Link to="/">Back to the site</Link>
      </p>
    </AuthShell>
  );
}
