import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AuthShell, Field, PasswordField, FooterLink } from "./AuthKit";
import { AuthMentors } from "./AuthTicker";
import GoogleButton, { googleSignInConfigured } from "./GoogleButton";

/* ════════════════════════════════════════════════════════════════
   Register — account-first signup. ONE screen, three fields.

   WHAT THIS REPLACES
   ──────────────────
   `Signup.jsx` opens by asking "are you a student or a teacher?" — a
   decision taken BEFORE the account exists, which is why every later
   combination had to be handled as a signup variant and why the backend
   serializer grew eight branching cases. A brand-new student passed through
   8 screens to reach the product; a faculty applicant, 12 and then a wait.

   Here nobody chooses a role. Everyone who registers is a learner, and
   teaching is added later from inside the product, where the person has
   context and is already authenticated. Signup itself is:

       email · password · terms          → check your inbox
       click the emailed link            → signed in, already on the dashboard

   Three screens, and the third is an email client.

   ?intent=teach
   ─────────────
   The "Teach with us" funnel must not be lost just because signup no longer
   forks. The parameter rides through registration and is stashed for the
   post-verification landing to pick up, so someone who arrived wanting to
   teach is offered the application immediately after verifying instead of
   being dropped on a learner dashboard.

   `Signup.jsx` is still mounted at /signup and still serves the add-a-track
   flow. It is retired in Phase 8, not here.
════════════════════════════════════════════════════════════════ */

const INTENT_KEY = "post_verify_intent";
// Which teaching track they asked for on the way in, if they said. Stashed
// alongside the intent and for the same reason: registration ends in an email,
// so the landing page is reached through a link that knows nothing about the
// URL this form was opened with. Without it, someone who clicked "I want to
// teach my craft" verifies and lands on a chooser asking which track — the
// exact question they already answered.
const TRACK_KEY = "post_verify_track";
const TRACKS = ["skill", "academy"];
// Where to return after verifying. Registration now ends in an EMAIL, so a
// ?next= in the URL cannot simply be read on the landing page — the person
// leaves the tab and comes back through a link that knows nothing about it.
// Stashing it survives that round trip. Same safety rule as App.jsx's
// LoginRedirect: same-site paths only, never an auth page (which would loop).
const NEXT_KEY = "post_auth_redirect";
const isSafeNext = (v) =>
  !!v && v.startsWith("/") && !v.startsWith("//") &&
  !/^\/(login|register|signup|pick-profile|forgot-password|reset-password)(\/|\?|$)/.test(v);

export default function Register() {
  const { register, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const intent = params.get("intent") || "";

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [terms, setTerms]       = useState(false);
  const [error, setError]       = useState("");
  const [busy, setBusy]         = useState(false);

  // Google returned an address with no account behind it. We hold the
  // credential and ask for consent, rather than inferring agreement from the
  // fact that someone clicked a Google button.
  const [pendingGoogle, setPendingGoogle] = useState(null);

  const rememberIntent = () => {
    try {
      if (intent) sessionStorage.setItem(INTENT_KEY, intent);
      // Validated before storing, not after reading — this ends up in a URL.
      const track = (params.get("track") || "").trim().toLowerCase();
      if (TRACKS.includes(track)) sessionStorage.setItem(TRACK_KEY, track);
      const next = params.get("next");
      if (isSafeNext(next)) sessionStorage.setItem(NEXT_KEY, next);
    } catch { /* unavailable */ }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim())  { setError("Enter your email address."); return; }
    if (!password)      { setError("Choose a password."); return; }
    if (!terms)         { setError("Please accept the Terms of Use to continue."); return; }

    setBusy(true);
    try {
      rememberIntent();
      await register(email.trim(), password, true);
      navigate("/verify-email", { state: { email: email.trim() } });
    } catch (err) {
      // The backend distinguishes "already registered" from "registered but
      // never verified" — they need different next steps, so don't flatten them.
      if (err?.code === "email_unverified") {
        setError("");
        navigate("/resend-verification", { state: { email: email.trim() } });
        return;
      }
      setError(err?.message || "Could not create your account.");
      setBusy(false);
    }
  };

  const onGoogle = async (credential, consented = false) => {
    setError("");
    setBusy(true);
    try {
      rememberIntent();
      const res = await signInWithGoogle(credential, consented);
      if (res?.unavailable) {
        setError("Google sign-in isn’t available right now. Use your email below.");
        setBusy(false);
        return;
      }
      if (res?.needsConsent) {
        setPendingGoogle({ credential, email: res.email, name: res.name });
        setBusy(false);
        return;
      }
      // Signed in. App.jsx's /login redirect logic owns where to land.
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err?.message || "Google sign-in didn’t work. Try your email instead.");
      setBusy(false);
    }
  };

  /* ── Google returned a new address: one checkbox, then done ── */
  if (pendingGoogle) {
    return (
      <AuthShell role="neutral" flowLabel="Create account" brandIcon="spark" intro>
        <h1 className="af-heading">One last thing</h1>
        <p className="af-sub">
          We’ll create your ShikshaCom account for <b>{pendingGoogle.email}</b>.
        </p>

        <div className="af-spacer" />
        <label className="af-checkbox">
          <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
          <span>
            I agree to the <Link to="/terms">Terms of Use</Link> and{" "}
            <Link to="/privacy">Privacy Policy</Link>.
          </span>
        </label>

        {error && <p className="af-error">{error}</p>}

        <div className="af-actions">
          <button
            className="af-btn af-btn--block"
            disabled={busy || !terms}
            onClick={() => onGoogle(pendingGoogle.credential, true)}
          >
            {busy ? "Creating your account…" : "Create account"}
          </button>
          <button
            className="af-btn af-btn--ghost af-btn--block"
            disabled={busy}
            onClick={() => { setPendingGoogle(null); setError(""); }}
          >
            Back
          </button>
        </div>

        {/* Same mentor block as the email path below. Arriving via Google is
            still signing up, and without this the block appeared on one
            signup route and not the other. */}
        <AuthMentors slot="auth_signup" />
      </AuthShell>
    );
  }

  /* ── The one screen ── */
  return (
    <AuthShell role="neutral" flowLabel="Create account" brandIcon="spark" intro>
      <h1 className="af-heading">Create your account</h1>
      <p className="af-sub">
        {intent === "teach"
          ? "First, your account. You’ll set up teaching right after."
          : "One account for everything — courses, Skill Dev, and teaching if you want it later."}
      </p>

      {googleSignInConfigured() && (
        <>
          <div className="af-spacer" />
          <GoogleButton onCredential={(c) => onGoogle(c)} text="signup_with" disabled={busy} />
          <div className="af-or"><span>or</span></div>
        </>
      )}

      <form onSubmit={submit}>
        <Field
          id="reg-email" label="Email" type="email" autoComplete="email"
          placeholder="you@example.com" value={email} autoFocus
          onChange={(e) => setEmail(e.target.value)} disabled={busy}
        />
        <PasswordField
          id="reg-password" label="Password" autoComplete="new-password"
          placeholder="At least 8 characters" value={password}
          show={showPw} onToggle={() => setShowPw((v) => !v)}
          onChange={(e) => setPassword(e.target.value)} disabled={busy}
        />

        <label className="af-checkbox">
          <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} disabled={busy} />
          <span>
            I agree to the <Link to="/terms">Terms of Use</Link> and{" "}
            <Link to="/privacy">Privacy Policy</Link>.
          </span>
        </label>

        {error && <p className="af-error">{error}</p>}

        <div className="af-actions">
          <button type="submit" className="af-btn af-btn--block" disabled={busy}>
            {busy ? "Creating your account…" : "Create account"}
          </button>
        </div>
      </form>

      <FooterLink>Already have an account? <Link to="/login">Sign in</Link></FooterLink>
      {/* Mentor spotlight — form column, under the footer link. */}
      <AuthMentors slot="auth_signup" />
    </AuthShell>
  );
}
