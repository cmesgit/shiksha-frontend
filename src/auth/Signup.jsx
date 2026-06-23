import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  AuthShell, Field, PasswordField, TileChoice, StatusChip, FooterLink, Icon,
} from "./AuthKit";

/* ════════════════════════════════════════════════════════════════
   Signup — MINIMAL flow (email-first, single password)

   Why this rewrite:
     · OLD flow asked email + username + password + confirm all on ONE screen,
       BEFORE checking the email. But existing accounts don't need a username
       at all (they reuse the one they have), so asking for it up front was
       wrong. And the guest/faculty forms collected skill/method/bio/qual/subj
       data that the backend signup endpoint IGNORES — none of it is sent or
       stored. So it was pure friction.

   New step order:
     role     → Student | Teacher tiles
     email    → email alone; we check it immediately
       ├─ new email      → creds (password + confirm + username)
       └─ existing email → confirm (account password only — ownership proof)
     Student  → one profile name (minimal) → submit → /verify-email or /login
     Teacher  → teacher type (Guest | Faculty) → submit → /verify-email or /login

   Backend payload (accounts/signup/) only ever needs:
     { email, password, role, [username], [teacher_type], [profiles] }
   Everything else the old forms collected is dropped — it was never used.

   The add-a-track flow (?add_track=academy|skill) is preserved unchanged
   at the bottom — a signed-in teacher gaining the other track.
════════════════════════════════════════════════════════════════ */

const STEP_ROLE     = "role";
const STEP_EMAIL    = "email";
const STEP_CREDS    = "creds";     // new account: password + confirm + username
const STEP_CONFIRM  = "confirm";   // existing account: account password (ownership)
const STEP_PROFILE  = "profile";   // student: one profile name
const STEP_TTYPE    = "ttype";     // teacher: guest | faculty
const STEP_DONE_FAC = "done_fac";  // faculty: application submitted
const STEP_DONE_GST = "done_gst";  // guest: you're live

/* Add-a-track flow (existing account gains the OTHER teaching track). */
const STEP_AT_FORM    = "at_form";
const STEP_AT_CONFIRM = "at_confirm";
const STEP_AT_DONE    = "at_done";

const PAL = { student: "#13899b", faculty: "#425f7f", guest: "#2f9d42" };

function readErr(err, fallback) {
  const raw = err?.message ?? err;
  return raw instanceof Error ? raw.message
    : typeof raw === "string" ? raw : fallback;
}

export default function Signup() {
  const { signup, checkEmail, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [step, setStep]             = useState(STEP_ROLE);
  const [error, setError]           = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* role */
  const [role, setRole]               = useState("");   // "STUDENT" | "TEACHER"
  const [teacherType, setTeacherType] = useState("");   // "GUEST" | "FACULTY"

  /* credentials */
  const [email, setEmail]       = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [showCf, setShowCf]     = useState(false);

  /* add-to-existing */
  const [isExisting, setIsExisting]             = useState(false);
  const [existingKind, setExistingKind]         = useState("");   // "has_teacher" | "has_student"
  const [existingTeacherType, setExistingTeacherType] = useState("");
  const [existingPassword, setExistingPassword] = useState("");
  const [showExistingPw, setShowExistingPw]     = useState(false);
  const [isUpgrade, setIsUpgrade]               = useState(false); // GUEST adding FACULTY

  /* student profile (minimal — just one name) */
  const [profileName, setProfileName] = useState("");

  /* add-a-track */
  const [addTrack, setAddTrack] = useState("");  // "academy" | "skill" | ""
  const TRACK_LABEL = { academy: "Academy (Faculty)", skill: "Skill (Guest expert)" };

  /* ── add-a-track init from URL ── */
  useEffect(() => {
    const at = (searchParams.get("add_track") || "").toLowerCase();
    if (at !== "academy" && at !== "skill") return;
    setAddTrack(at);
    setRole("TEACHER");
    setTeacherType(at === "academy" ? "FACULTY" : "GUEST");
    setIsExisting(true);
    if (user?.email) setEmail(user.email);
    setStep(STEP_AT_CONFIRM);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, user]);

  /* ── accent + label ── */
  const accent =
    step === STEP_ROLE || step === STEP_EMAIL || step === STEP_CREDS ? "neutral" :
    step === STEP_TTYPE ? "decision" :
    role === "TEACHER" ? (teacherType === "GUEST" ? "guest" : "faculty") : "student";

  const flowLabel =
    step === STEP_ROLE || step === STEP_EMAIL ? "Sign up" :
    role === "TEACHER"
      ? `Sign up · ${teacherType === "GUEST" ? "Guest expert" : "Faculty"}`
      : "Sign up · Student";

  const go = (s) => { setError(""); setStep(s); };

  /* ── back navigation ── */
  const back = () => {
    setError("");
    if (step === STEP_EMAIL)    go(STEP_ROLE);
    if (step === STEP_CREDS)    go(STEP_EMAIL);
    if (step === STEP_CONFIRM)  { setIsExisting(false); setIsUpgrade(false); setExistingPassword(""); go(STEP_EMAIL); }
    if (step === STEP_PROFILE)  go(isExisting ? STEP_CONFIRM : STEP_CREDS);
    if (step === STEP_TTYPE)    go(isExisting ? STEP_CONFIRM : STEP_CREDS);
    if (step === STEP_AT_CONFIRM) { navigate(-1); return; }
  };

  /* ── core signup call ── */
  const doSignup = async (extra) => {
    const payload = {
      email,
      ...(isExisting ? {} : { username }),
      password: isExisting ? existingPassword : password,
      role,
      ...extra,
    };
    setSubmitting(true);
    try {
      await signup(payload);
      if (isExisting) {
        const msg = isUpgrade
          ? "Faculty application submitted! Your Guest expert profile is still live. Log in to check status."
          : "Identity added! Please log in.";
        navigate("/login", { replace: true, state: { message: msg } });
      } else {
        navigate("/verify-email", { replace: true, state: { email } });
      }
    } catch (err) {
      setError(readErr(err, "Signup failed. Please try again."));
      setSubmitting(false);
    }
  };

  /* ── STEP: email → check, then branch ── */
  const nextFromEmail = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) { setError("Enter your email."); return; }
    setSubmitting(true);
    try {
      const state = await checkEmail(email);

      if (!state.exists) {
        // brand new account — collect creds next
        setIsExisting(false);
        go(STEP_CREDS);
        return;
      }

      const { has_student, has_teacher } = state;

      if (role === "STUDENT") {
        if (has_student) {
          setError("This email already has learner profiles. Log in to manage them.");
          return;
        }
        // has_teacher only → add learner profiles
        setIsExisting(true);
        setExistingKind("has_teacher");
        go(STEP_CONFIRM);
        return;
      }

      // role === TEACHER
      if (has_teacher) {
        // GUEST adding FACULTY → upgrade path
        if (state.teacher_type === "GUEST") {
          setIsExisting(true);
          setIsUpgrade(true);
          setExistingTeacherType("GUEST");
          setTeacherType("FACULTY");
          go(STEP_CONFIRM);
          return;
        }
        setError("This email already has a teacher account. Log in instead.");
        return;
      }
      // has_student only → add teacher identity
      setIsExisting(true);
      setExistingKind("has_student");
      go(STEP_CONFIRM);
    } catch {
      // checkEmail failed → fail open, treat as new account
      setIsExisting(false);
      go(STEP_CREDS);
    } finally {
      setSubmitting(false);
    }
  };

  /* ── STEP: creds (new account) ── */
  const nextFromCreds = (e) => {
    e.preventDefault();
    setError("");
    if (!username.trim())     { setError("Username is required."); return; }
    if (password.length < 8)  { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (role === "STUDENT") go(STEP_PROFILE);
    else go(STEP_TTYPE);
  };

  /* ── STEP: confirm (existing account ownership) ── */
  const nextFromConfirm = (e) => {
    e.preventDefault();
    setError("");
    if (!existingPassword) { setError("Enter your account password."); return; }
    if (isUpgrade) { doSignup({ teacher_type: "FACULTY" }); return; }
    if (role === "STUDENT") go(STEP_PROFILE);
    else go(STEP_TTYPE);
  };

  /* ── STEP: student profile (minimal) ── */
  const submitStudent = (e) => {
    e.preventDefault();
    setError("");
    const name = profileName.trim();
    if (!name) { setError("Enter a profile name."); return; }
    doSignup({ profiles: [{ display_name: name, relationship: "SELF" }] });
  };

  /* ── STEP: teacher type → submit ── */
  const submitTeacher = (type) => {
    setTeacherType(type);
    setError("");
    doSignupTeacher(type);
  };
  const doSignupTeacher = async (type) => {
    const payload = {
      email,
      ...(isExisting ? {} : { username }),
      password: isExisting ? existingPassword : password,
      role: "TEACHER",
      teacher_type: type,
    };
    setSubmitting(true);
    try {
      await signup(payload);
      setSubmitting(false);
      if (type === "GUEST") go(STEP_DONE_GST);
      else go(STEP_DONE_FAC);
    } catch (err) {
      setError(readErr(err, "Signup failed. Please try again."));
      setSubmitting(false);
    }
  };

  const finishTeacher = () => {
    if (isExisting) {
      navigate("/login", { replace: true, state: { message: "Teacher identity added! Please log in." } });
    } else {
      navigate("/verify-email", { replace: true, state: { email } });
    }
  };

  /* ── add-a-track submit ── */
  const submitAddTrack = async (e) => {
    e.preventDefault();
    setError("");
    const emailToUse = (user?.email || email || "").trim();
    if (!emailToUse)       { setError("Enter your account email."); return; }
    if (!existingPassword) { setError("Enter your account password to confirm."); return; }
    setSubmitting(true);
    try {
      await signup({
        email: emailToUse,
        password: existingPassword,
        role: "TEACHER",
        teacher_type: addTrack === "academy" ? "FACULTY" : "GUEST",
      });
      setSubmitting(false);
      go(STEP_AT_DONE);
    } catch (err) {
      setError(readErr(err, "Could not add the track. Please try again."));
      setSubmitting(false);
    }
  };
  const finishAddTrack = () => {
    const msg = addTrack === "academy"
      ? "Faculty application submitted. We'll email you when it's approved — your current track stays live."
      : "Skill (Guest expert) track added. You can switch to it from your dashboard now.";
    navigate("/login", { replace: true, state: { message: msg } });
  };

  /* ════════ RENDER ════════════════════════════════════════════════════════ */
  return (
    <AuthShell role={accent} flowLabel={flowLabel}>
      <div className="af-toprow">
        {step !== STEP_ROLE
          ? <button className="af-iconbtn" onClick={back} aria-label="Back">‹</button>
          : <span />}
      </div>

      {/* ── role ── */}
      {step === STEP_ROLE && (
        <>
          <h1 className="af-heading">Sign Up</h1>
          <p className="af-sub">First, what brings you to ShikshaCom?</p>
          <TileChoice cols={2} options={[
            { key: "STUDENT", label: "Student", sub: "Learn from experts",
              color: PAL.student, icon: <Icon name="cap" size={22} color={PAL.student} />,
              onClick: () => { setRole("STUDENT"); setError(""); go(STEP_EMAIL); } },
            { key: "TEACHER", label: "Teacher", sub: "Teach your skills",
              color: PAL.faculty, icon: <Icon name="spark" size={20} color={PAL.faculty} />,
              onClick: () => { setRole("TEACHER"); setError(""); go(STEP_EMAIL); } },
          ]} />
          <div className="af-spacer" />
          <FooterLink>Already have an account? <Link to="/login">Sign in</Link></FooterLink>
        </>
      )}

      {/* ── email ── */}
      {step === STEP_EMAIL && (
        <>
          <h1 className="af-heading">{role === "TEACHER" ? "Teacher sign-up" : "Student sign-up"}</h1>
          <p className="af-sub">What's your email? We'll check if you already have an account.</p>
          <form onSubmit={nextFromEmail} style={{ display: "contents" }}>
            <Field id="su-email" label="Email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
              required autoFocus autoComplete="email" />
            {error && <div className="af-error">{error}</div>}
            <div className="af-spacer" />
            <div className="af-actions">
              <button type="submit" className="af-btn af-btn--block" disabled={submitting}>
                {submitting ? <><span className="af-spin" />Checking…</> : "Continue"}
              </button>
            </div>
          </form>
          <FooterLink>Already have an account? <Link to="/login">Sign in</Link></FooterLink>
        </>
      )}

      {/* ── creds (new account) ── */}
      {step === STEP_CREDS && (
        <>
          <h1 className="af-heading">Set up your account</h1>
          <p className="af-sub">Pick a username and a password for <strong>{email}</strong>.</p>
          <form onSubmit={nextFromCreds} style={{ display: "contents" }}>
            <Field id="su-username" label="Username" value={username}
              onChange={(e) => setUsername(e.target.value)} placeholder="your_username"
              required autoFocus autoComplete="username" />
            <PasswordField id="su-pw" label="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters"
              required autoComplete="new-password"
              show={showPw} onToggle={() => setShowPw((v) => !v)} />
            <PasswordField id="su-cf" label="Confirm password" value={confirm}
              onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat password"
              required autoComplete="new-password"
              show={showCf} onToggle={() => setShowCf((v) => !v)} />
            {error && <div className="af-error">{error}</div>}
            <div className="af-spacer" />
            <div className="af-actions">
              <button type="submit" className="af-btn af-btn--block">Continue</button>
            </div>
          </form>
        </>
      )}

      {/* ── confirm (existing account ownership) ── */}
      {step === STEP_CONFIRM && (
        <>
          <h1 className="af-heading">
            {isUpgrade ? "Add Faculty application"
              : existingKind === "has_teacher" ? "Add learner profile" : "Add teacher identity"}
          </h1>
          <p className="af-sub">
            {isUpgrade
              ? "You already have a Guest expert account on this email. Confirm your password to add a Faculty application — your expert listing stays live."
              : existingKind === "has_teacher"
                ? "This email already has a teacher account. Confirm your password to add a learner profile."
                : "This email already has learner profiles. Confirm your password to add a teacher identity."}
          </p>
          <form onSubmit={nextFromConfirm} style={{ display: "contents" }}>
            <PasswordField id="su-existing-pw" label="Your account password"
              value={existingPassword} onChange={(e) => setExistingPassword(e.target.value)}
              placeholder="Your account password" required autoFocus autoComplete="current-password"
              show={showExistingPw} onToggle={() => setShowExistingPw((v) => !v)} />
            {error && <div className="af-error">{error}</div>}
            <div className="af-spacer" />
            <div className="af-actions">
              <button type="submit" className="af-btn af-btn--block"
                disabled={!existingPassword || submitting}>
                {submitting ? <><span className="af-spin" />Submitting…</> : "Continue"}
              </button>
            </div>
          </form>
        </>
      )}

      {/* ── student profile (minimal) ── */}
      {step === STEP_PROFILE && (
        <>
          <h1 className="af-heading">Your name</h1>
          <p className="af-sub">
            {isExisting && existingKind === "has_teacher"
              ? "Add a learner profile name. You can add more and set PINs later from your dashboard."
              : "What should we call you? You can add family profiles and PINs later from your dashboard."}
          </p>
          <form onSubmit={submitStudent} style={{ display: "contents" }}>
            <Field id="su-pname" label="Profile name" value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              placeholder="e.g. Your name" required autoFocus />
            {error && <div className="af-error">{error}</div>}
            <div className="af-spacer" />
            <div className="af-actions">
              <button type="submit" className="af-btn af-btn--block" disabled={submitting}>
                {submitting ? <><span className="af-spin" />Creating…</> : "Create account"}
              </button>
            </div>
          </form>
        </>
      )}

      {/* ── teacher type → submit directly ── */}
      {step === STEP_TTYPE && (
        <>
          <h1 className="af-heading">What kind of teacher?</h1>
          <p className="af-sub">Guest experts are listed instantly. Faculty go through admin review.</p>
          <TileChoice cols={2} options={[
            { key: "GUEST", label: "Guest expert", sub: "Listed right away",
              color: PAL.guest, icon: <Icon name="spark" size={20} color={PAL.guest} />,
              onClick: () => submitTeacher("GUEST") },
            { key: "FACULTY", label: "Faculty", sub: "Reviewed by admin",
              color: PAL.faculty, icon: <Icon name="cap" size={22} color={PAL.faculty} />,
              onClick: () => submitTeacher("FACULTY") },
          ]} />
          {submitting && (
            <div className="af-wait-row" style={{ marginTop: 16 }}>
              <span className="af-spin" />
              <span style={{ fontSize: 13, color: "#374151" }}>Creating your account…</span>
            </div>
          )}
          {error && <div className="af-error">{error}</div>}
          <div className="af-spacer" />
          <p className="af-sub" style={{ fontSize: 12.5, marginTop: 8 }}>
            You can fill in your skills, bio, courses and rates later from your dashboard.
          </p>
        </>
      )}

      {/* ── guest live ── */}
      {step === STEP_DONE_GST && (
        <>
          <StatusChip icon="check" role="success" />
          <h1 className="af-heading">You're listed!</h1>
          <div className="af-banner-success">
            <div className="af-banner-success__icon"><Icon name="check" size={24} color="#fff" /></div>
            <div style={{ fontWeight: 800, fontSize: 17, color: "#1e7a32" }}>
              Your expert profile is active
            </div>
            <div style={{ fontSize: 13, color: "#5b6470", marginTop: 6, lineHeight: 1.5 }}>
              Add your skills, bio, courses and rates any time from your dashboard.
            </div>
          </div>
          <div className="af-spacer" />
          <div className="af-actions">
            <button type="button" className="af-btn af-btn--block" onClick={finishTeacher}>
              {isExisting ? "Go to login" : "Verify email to continue"}
            </button>
          </div>
        </>
      )}

      {/* ── faculty waiting ── */}
      {step === STEP_DONE_FAC && (
        <>
          <StatusChip icon="clock" role="faculty" />
          <h1 className="af-heading">Application submitted</h1>
          <p className="af-sub">Your Faculty application is with the admin team for review.</p>
          <div className="af-wait-row" style={{ marginTop: 18 }}>
            <div className="af-wait-spin" />
            <div style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>You're in the review queue</div>
          </div>
          <p style={{ fontSize: 13.5, color: "#5b6470", lineHeight: 1.6, margin: "12px 0 0", maxWidth: 460 }}>
            We'll email you the decision within <strong style={{ color: "#15502a" }}>3–5 working days</strong>.
            You can complete your profile details from your dashboard once approved.
          </p>
          <div className="af-banner-warn">
            <Icon name="shield" size={16} color="#b9760f" />
            <div><strong>Heads up:</strong> once approved, log in within <strong>3 days</strong> or the approval expires.</div>
          </div>
          <div className="af-spacer" />
          <div className="af-actions">
            <button type="button" className="af-btn af-btn--block" onClick={finishTeacher}>
              {isExisting ? "Go to login" : "Verify email to continue"}
            </button>
          </div>
        </>
      )}

      {/* ── add-a-track confirm ── */}
      {step === STEP_AT_CONFIRM && (
        <>
          <h1 className="af-heading">Add {TRACK_LABEL[addTrack] || "a track"}</h1>
          <p className="af-sub">
            {addTrack === "academy"
              ? "Apply to teach academic classes. Confirm your password — your current track stays live while admins review."
              : "Add the Guest-expert track. It goes live as soon as you confirm."}
          </p>
          <div className="af-banner-info">
            <div className="af-banner-info__icon"
              style={{ background: (addTrack === "academy" ? PAL.faculty : PAL.guest) + "22",
                       color: addTrack === "academy" ? PAL.faculty : PAL.guest }}>
              <Icon name={addTrack === "academy" ? "cap" : "spark"} size={19}
                color={addTrack === "academy" ? PAL.faculty : PAL.guest} />
            </div>
            <div className="af-banner-info__text">
              {user?.email
                ? <>Adding to <strong>{user.email}</strong>. No new account — same login.</>
                : <>This adds a track to your existing account.</>}
            </div>
          </div>
          <form onSubmit={submitAddTrack} style={{ display: "contents" }}>
            {user?.email ? (
              <div className="af-field">
                <label>Account</label>
                <input value={user.email} readOnly tabIndex={-1}
                  style={{ background: "#F2F2EF", color: "#6b6c72" }} />
              </div>
            ) : (
              <Field id="at-email" label="Account email" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                required autoComplete="email" />
            )}
            <PasswordField id="at-pw" label="Account password" value={existingPassword}
              onChange={(e) => setExistingPassword(e.target.value)}
              placeholder="Your account password" required autoFocus autoComplete="current-password"
              show={showExistingPw} onToggle={() => setShowExistingPw((v) => !v)} />
            {error && <div className="af-error">{error}</div>}
            <div className="af-spacer" />
            <div className="af-actions">
              <button type="submit" className="af-btn af-btn--block"
                disabled={!existingPassword || submitting}>
                {submitting ? <><span className="af-spin" />Adding…</>
                  : addTrack === "academy" ? "Submit application" : "Add track"}
              </button>
            </div>
          </form>
        </>
      )}

      {/* ── add-a-track done ── */}
      {step === STEP_AT_DONE && (
        <>
          <StatusChip icon={addTrack === "academy" ? "clock" : "check"}
            role={addTrack === "academy" ? "faculty" : "success"} />
          <h1 className="af-heading">{addTrack === "academy" ? "Application submitted" : "Track added"}</h1>
          <p className="af-sub">
            {addTrack === "academy"
              ? "Your Faculty application is in the admin review queue. We'll email you the decision — your current track keeps working."
              : "The Guest-expert track is live on your account. Use the dashboard switch to jump into it."}
          </p>
          <div className="af-spacer" />
          <div className="af-actions">
            <button type="button" className="af-btn af-btn--block" onClick={finishAddTrack}>
              Back to dashboard
            </button>
          </div>
        </>
      )}

    </AuthShell>
  );
}
