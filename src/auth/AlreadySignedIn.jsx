import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthShell } from "./AuthKit";
import { useAuth } from "../contexts/AuthContext";

/* Reaching /login while already signed in.
 *
 * This used to be an unconditional hard bounce to the dashboard, which meant
 * the login page could never be seen by someone who already had a session —
 * so there was NO way to log out from it, and no way to sign in as somebody
 * else. On a shared or family device that is the common case, not the edge
 * case. It also made the page a dead end whenever the dashboard host was
 * unreachable: the redirect fired and left you staring at an error.
 *
 * The automatic redirect is KEPT for the case it was written for — finishing
 * a login with a pending destination (?next= or post_auth_redirect). This
 * screen only appears when someone navigates to /login with no such
 * destination, which is a deliberate act and almost always means "let me in
 * as a different person".
 */
export default function AlreadySignedIn({ onContinue }) {
  const { user, logout } = useAuth();
  const [busy, setBusy] = useState(false);
  const who = user?.email || user?.full_name || "this account";

  return (
    <AuthShell role="student" flowLabel="Log in" loginIntro>
      <h1 className="af-heading">You’re already signed in</h1>
      <p className="af-sub">
        This browser is signed in as <strong>{who}</strong>.
      </p>

      <div className="af-actions">
        <button type="button" className="af-btn af-btn--block" onClick={onContinue}>
          Continue as {who}
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

      <p className="af-note" style={{ marginTop: 14 }}>
        Signing out here only affects this browser. <Link to="/">Back to the site</Link>
      </p>
    </AuthShell>
  );
}
