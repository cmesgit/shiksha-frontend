import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AuthShell, StatusChip, FooterLink } from "./AuthKit";
import {
  APP_DASHBOARD_URL, TEACHER_ACADEMY_URL, TEACHER_SKILL_URL,
} from "../config/urls";

/* ════════════════════════════════════════════════════════════════
   EmailVerified — the landing after the emailed link is clicked.

   The backend now SIGNS THE PERSON IN as part of verifying (they proved the
   mailbox, which is strictly stronger than a password), and redirects here
   with `?status=success&context=learner|account`. That removes the two
   screens this flow used to end with: "verified → go to login → sign in".

   THIS PAGE MUST STILL WORK WITH NO SESSION.
   ──────────────────────────────────────────
   The cookie does not always arrive. Corporate mail scanners and link
   prefetchers fetch the URL before any human clicks it, which consumes the
   single-use token and sets the cookie on a machine that is not the user's.
   The person then lands here verified but anonymous. So `context` is treated
   as a HINT and the real test is whether bootstrap actually produced a
   session — if it did not, this falls back to the old "Sign in" button
   rather than hanging on a redirect that will never come.
════════════════════════════════════════════════════════════════ */

const INTENT_KEY = "post_verify_intent";
const TRACK_KEY  = "post_verify_track";
const NEXT_KEY   = "post_auth_redirect";
const TRACKS     = ["skill", "academy"];
const isSafeNext = (v) =>
  !!v && v.startsWith("/") && !v.startsWith("//") &&
  !/^\/(login|register|signup|pick-profile|forgot-password|reset-password)(\/|\?|$)/.test(v);

const EmailVerified = () => {
  const [params] = useSearchParams();
  const { isAuthenticated, isLearnerContext, isTeacherContext, teacherInfo, loading } = useAuth();

  const status  = params.get("status");
  const success = status === "success";
  // Present only when the backend managed to mint a session on the redirect.
  const signedInHint = !!params.get("context");

  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!success || loading || !isAuthenticated) return;

    // Someone who arrived via "Teach with us" gets the teaching application
    // straight away instead of a learner dashboard they didn't ask for.
    let intent = null;
    let track  = null;
    try {
      intent = sessionStorage.getItem(INTENT_KEY);
      if (intent) sessionStorage.removeItem(INTENT_KEY);
      track = sessionStorage.getItem(TRACK_KEY);
      // Always clear it, even if it fails the whitelist — a value we refuse to
      // use should not sit in storage waiting to be picked up by a later flow.
      if (track) sessionStorage.removeItem(TRACK_KEY);
      if (!TRACKS.includes(track)) track = null;
    } catch { /* unavailable */ }

    setRedirecting(true);
    const go = (url) => window.setTimeout(() => { window.location.href = url; }, 600);

    // Someone who said which track they wanted is taken to that one, not to a
    // chooser that re-asks. BecomeTeacher falls back to the chooser on its own
    // if the account turns out not to be able to add it.
    if (intent === "teach") {
      go(track ? `/become-a-teacher?track=${track}` : "/become-a-teacher");
      return;
    }

    // Wherever they were actually headed when they hit "create an account"
    // (booking an expert, enrolling) beats any default dashboard.
    let next = null;
    try {
      next = sessionStorage.getItem(NEXT_KEY);
      if (next) sessionStorage.removeItem(NEXT_KEY);
    } catch { /* unavailable */ }
    if (isSafeNext(next)) { go(next); return; }
    if (isTeacherContext) {
      go(teacherInfo?.active_track === "skill" ? TEACHER_SKILL_URL : TEACHER_ACADEMY_URL);
      return;
    }
    if (isLearnerContext) { go(APP_DASHBOARD_URL); return; }
    // "account" context — more than one profile, or a PIN. Let them choose.
    go("/pick-profile");
  }, [success, loading, isAuthenticated, isLearnerContext, isTeacherContext, teacherInfo]);

  if (!success) {
    return (
      <AuthShell role="danger" flowLabel="Verify email" brandIcon="mail">
        <StatusChip icon="x" role="danger" />
        <h1 className="af-heading">Verification failed</h1>
        <p className="af-sub">
          The verification link is invalid or has expired. Request a fresh one below.
        </p>
        <div className="af-spacer" />
        <div className="af-actions">
          <Link to="/resend-verification" className="af-btn af-btn--block"
            style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
            Resend verification email
          </Link>
        </div>
        <FooterLink>Already verified? <Link to="/login">Sign in</Link></FooterLink>
      </AuthShell>
    );
  }

  /* Verified AND signed in — this is the common path. */
  if (isAuthenticated || (signedInHint && loading)) {
    return (
      <AuthShell role="success" flowLabel="Verify email" brandIcon="mail">
        <StatusChip icon="check" role="success" />
        <h1 className="af-heading">You’re all set</h1>
        <p className="af-sub">
          {redirecting
            ? "Taking you to your dashboard…"
            : "Your email is verified and you’re signed in."}
        </p>
        <div className="af-spacer" />
      </AuthShell>
    );
  }

  /* Verified but no session — the mail-scanner case, or cookies blocked. */
  return (
    <AuthShell role="success" flowLabel="Verify email" brandIcon="mail">
      <StatusChip icon="check" role="success" />
      <h1 className="af-heading">Email verified!</h1>
      <p className="af-sub">
        Your email has been verified. Sign in to get started.
      </p>
      <div className="af-spacer" />
      <div className="af-actions">
        <Link to="/login" className="af-btn af-btn--block"
          style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
          Sign in
        </Link>
      </div>
    </AuthShell>
  );
};

export default EmailVerified;
