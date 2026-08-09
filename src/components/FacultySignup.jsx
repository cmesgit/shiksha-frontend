/**
 * FacultySignup.jsx
 * PLACEMENT: src/components/FacultySignup.jsx   (NEW)
 *
 * Standalone "Faculty Signup" flow implementing the provided Faculty_Signup.html
 * design. Self-contained chrome (own topbar + sidebar stepper), rendered WITHOUT
 * the marketing <Page> wrapper — same pattern as FacultyIntro.jsx.
 *
 * Four steps:
 *   1. Account            — email + password (+ confirm)            [creates the account]
 *   2. Teaching profile   — qualifications, experience, course application (text only)
 *   3. Agreement letter   — download + sign + acknowledge
 *   4. Verify email       — confirmation screen (matches existing post-signup behaviour)
 *
 * ── Architecture (decided: Approach A + no migration for choices) ──────────────
 * The account is created with a single JSON call to /accounts/signup/. JSON can't
 * carry files, so step 2's optional documents (qualification certificate + ID
 * proof front/back) ride along base64-encoded and are decoded server-side by
 * SignupSerializer._save_signup_document into the matching TeacherProfile
 * FileFields. That decode did NOT exist for a while: this form sent the bytes
 * and the serializer ignored the keys, so the uploads were silently dropped
 * while admins were asked to approve applicants on the strength of them.
 *
 * STILL OPEN — the SIGNED agreement has no pre-approval upload path. Step 3 is
 * download + acknowledge only. /form-fillup serves the LEARNER form to a pending
 * applicant, because FormFillupView keys off get_active_roles() and a pending
 * faculty's TEACHER role is is_active=False; the teacher-app editor that does
 * handle signed_agreement sits behind teacher context, which returns 403
 * not_approved until the track is live. So signed_agreement can currently only
 * be supplied after approval.
 *
 * The teaching background rides the existing `faculty_profile` signup payload that
 * the backend SignupSerializer._provision_faculty() already understands (extended
 * to also accept streams / govt id / certifications). The course application class
 * and stream values use the FULL design taxonomy — no migration is needed because
 * TeacherCourseApplication.classes / .streams are choice-less JSONFields.
 */
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/apiClient";
import DOMPurify from "dompurify";
import renderMarkdown from "../utils/miniMarkdown";
import "../css/FacultySignup.css";

/* Where the blank faculty agreement PDF lives. Drop the file in /public so it is
   served at this path (e.g. public/faculty-agreement.pdf). Swap for a CDN/media
   URL if you host it elsewhere. */
const AGREEMENT_PDF_URL = "/faculty-agreement.pdf";

/* Option lists.
   Plain CharField-choice values (degree/experience/employment/subject/govt id)
   MUST match accounts/models.py exactly or signup-time validation drops them.
   Class + stream values use the design's wider taxonomy — safe because they are
   stored in choice-less JSONFields (validated in code, see backend changes). */
const FAC_DEGREES = [
  ["10th_pass", "10th Pass"], ["12th_pass", "12th Pass"], ["diploma", "Diploma"],
  ["bachelors", "Bachelors"], ["masters", "Masters"], ["phd", "PhD"], ["other", "Other"],
];
const FAC_EXPERIENCE = [
  ["0", "No experience"], ["lt1", "< 1 year"], ["1_3", "1–3 years"],
  ["3_5", "3–5 years"], ["5_10", "5–10 years"], ["10plus", "10+ years"],
];
const FAC_EMPLOYMENT = [
  ["fulltime", "Full-time"], ["parttime", "Part-time"], ["private_tutor", "Private tutor"],
  ["unemployed", "Unemployed"], ["retired", "Retired"],
];
const FAC_GOVT_ID = [
  ["aadhaar", "Aadhaar"], ["pan", "PAN"], ["voter_id", "Voter ID"], ["driving_license", "Driving License"],
];
const FAC_SUBJECTS = [
  "Mathematics", "Physics", "Chemistry", "Biology", "English",
  "Hindi", "Social Science", "History", "Geography", "Economics",
];
/* [value, label] — value is what we store, label is what we show. */
const FAC_CLASSES = [
  ["1_5", "Class 1–5"], ["6_8", "Class 6–8"], ["9_10", "Class 9–10"],
  ["11_12", "Class 11–12"], ["ug", "Undergraduate"], ["pg", "Postgraduate"],
];
const FAC_STREAMS = [
  ["science", "Science"], ["commerce", "Commerce"], ["arts", "Arts / Humanities"],
  ["vocational", "Vocational"], ["general", "General"],
];

/* Verification-document uploads (optional at sign-up). Read to base64 and sent
   inside the JSON signup payload — the signup endpoint is JSON-only, so files
   ride along encoded and the backend decodes + stores them. Kept modest so the
   JSON body stays well under the server's 50 MB limit. */
const MAX_DOC_MB = 5;
const MAX_DOC_BYTES = MAX_DOC_MB * 1024 * 1024;
const DOC_ACCEPT = ".pdf,.jpg,.jpeg,.png";
const DOC_OK_RE = /\.(pdf|jpe?g|png)$/i;

/* subject label -> stored value (e.g. "Social Science" -> "social_science") */
const subjectValue = (label) => label.toLowerCase().replace(/ /g, "_");

function readErr(err, fallback) {
  const raw = err?.message ?? err;
  return raw instanceof Error ? raw.message : typeof raw === "string" ? raw : fallback;
}

/* ── tiny inline icons (stroke-based, sized via CSS) ── */
const ArrowRight = () => (
  <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
);
const ArrowLeft = () => (
  <svg viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
);
const Check = () => (
  <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
);
const Mail = () => (
  <svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
);

const STEPS = [
  { n: 1, key: "account",   label: "Account", desc: "Email & password" },
  { n: 2, key: "profile",   label: "Teacher Profile", desc: "Qualifications, experience & documents" },
  { n: 3, key: "agreement", label: "Agreement Letter", desc: "Download, sign & upload" },
  { n: 4, key: "verify",    label: "Verify Email", desc: "Confirm & await approval", icon: <Mail /> },
];

/**
 * FacultySignup
 *
 * Two render modes:
 *  • Standalone (default) at /faculty/signup — the full four-step flow that
 *    creates the account itself (Account → Teaching profile → Agreement →
 *    Verify). For applicants who land here directly.
 *  • Embedded (`embedded`) — driven by the main sign-up flow AFTER the email +
 *    password have already been collected. The "Account" step is dropped (so the
 *    sidebar shows three steps) and, instead of creating the account itself, the
 *    form hands the assembled faculty_profile to `onSubmitProfile`.
 *
 * Props (embedded mode):
 *   presetEmail          email already entered upstream (shown on the Verify card)
 *   onSubmitProfile      async (facultyProfile) => Promise — performs the signup
 *   onBack               called when "Back" is pressed on the first visible step
 *   showVerifyOnSuccess  advance to the Verify screen after a successful submit
 *                        (true for brand-new accounts; false when the caller
 *                        navigates away afterwards, e.g. add-a-track)
 *   submitLabel          label for the submit button
 */
export default function FacultySignup({
  embedded = false,
  presetEmail = "",
  onSubmitProfile,
  onBack,
  showVerifyOnSuccess = true,
  submitLabel = "Submit application",
} = {}) {
  const navigate = useNavigate();
  const { signup, checkEmail, isAuthenticated, user, teacherInfo } = useAuth();

  /* Account is step 1; embedded flows start on the teaching profile (step 2). */
  const FIRST_STEP = embedded ? 2 : 1;
  const visibleSteps = embedded ? STEPS.filter((s) => s.key !== "account") : STEPS;
  const totalSteps = visibleSteps.length;
  const dispNum = (n) => visibleSteps.findIndex((s) => s.n === n) + 1; // 1-based display index

  const [step, setStep] = useState(FIRST_STEP);
  const [error, setError] = useState("");
  // An optional in-product next step to render beside `error`. Duplicate-account
  // errors are dead ends without one: the only "Log in" link on this page lives
  // on step 1, so a rejection surfaced later left the applicant with nowhere to
  // click. Shape: { label, to }.
  const [errorAction, setErrorAction] = useState(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* account */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);

  /* The email to show on the Verify card / use for messaging. In embedded mode
     it comes from the upstream sign-up step; standalone uses the step-1 input. */
  const effectiveEmail = embedded ? presetEmail : email;

  /* teaching profile (scalars; documents are the base64 uploads below) */
  const [f, setF] = useState({
    highest_degree: "", field_of_study: "", year_of_completion: "",
    teaching_certifications: "",
    experience_range: "", employment_status: "",
    currently_employed: false, current_institution: "", current_position: "",
    govt_id_type: "", id_number: "",
  });
  const set = (k) => (e) => { setError(""); setF((p) => ({ ...p, [k]: e.target.value })); };
  const setVal = (k, v) => { setError(""); setF((p) => ({ ...p, [k]: v })); };

  /* verification documents — { name, type, data(base64) } | null each */
  const [docs, setDocs] = useState({
    qualification_certificate: null,
    id_proof_front: null,
    id_proof_back: null,
  });
  const pickDoc = (key) => (e) => {
    setError("");
    const file = e.target.files && e.target.files[0];
    e.target.value = "";                       // allow re-picking the same file
    if (!file) return;
    const okType = DOC_OK_RE.test(file.name) ||
      ["application/pdf", "image/jpeg", "image/png"].includes(file.type);
    if (!okType) { setError("Upload a PDF, JPG, or PNG file."); return; }
    if (file.size > MAX_DOC_BYTES) { setError(`That file is too large — keep it under ${MAX_DOC_MB} MB.`); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result || "");
      const base64 = url.includes(",") ? url.split(",")[1] : url;
      setDocs((p) => ({ ...p, [key]: { name: file.name, type: file.type || "application/octet-stream", data: base64 } }));
    };
    reader.onerror = () => setError("Could not read that file. Please try again.");
    reader.readAsDataURL(file);
  };
  const clearDoc = (key) => () => { setError(""); setDocs((p) => ({ ...p, [key]: null })); };

  /* Reusable file-upload control (uses the .fs-file-upload styles). */
  const docField = (key, labelText, cta) => {
    const d = docs[key];
    return (
      <div className="fs-field">
        <label>{labelText} <span className="fs-opt">(optional)</span></label>
        <label className={`fs-file-upload ${d ? "fs-selected" : ""}`}>
          <input type="file" accept={DOC_ACCEPT} onChange={pickDoc(key)} />
          <div className="fs-file-icon">
            <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div className="fs-file-text">
            <strong>{d ? d.name : cta}</strong>
            <span>{d ? "Tap to replace · " : ""}PDF, JPG or PNG · up to {MAX_DOC_MB} MB</span>
          </div>
        </label>
        {d && (
          <button type="button" onClick={clearDoc(key)}
            style={{ marginTop: 6, background: "none", border: "none", color: "var(--teal)",
                     fontSize: 12.5, fontWeight: 600, cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
            Remove file
          </button>
        )}
      </div>
    );
  };

  /* course application */
  const [subject, setSubject] = useState("");      // single-select
  const [classes, setClasses] = useState([]);      // multi
  const [streams, setStreams] = useState([]);      // multi
  const toggle = (setter) => (v) =>
    setter((arr) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]));

  /* agreement */
  const [downloaded, setDownloaded] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [agreementText, setAgreementText] = useState(null);   // current published version

  // Pull the live, admin-published Faculty Agreement so the applicant reads the
  // exact current text (kept in sync with the admin editor). Falls back to the
  // static PDF if nothing is published yet.
  useEffect(() => {
    let cancelled = false;
    api.get("/accounts/agreements/faculty/")
      .then((res) => { if (!cancelled) setAgreementText(res.data?.current_version || null); })
      .catch(() => { if (!cancelled) setAgreementText(null); });
    return () => { cancelled = true; };
  }, []);

  /* password strength 0–4 */
  const pwScore = (() => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const scrollTop = () => {
    const c = document.querySelector(".fs-content");
    if (c) c.scrollTop = 0;
  };
  const go = (s) => { setError(""); setErrorAction(null); setStep(s); scrollTop(); };

  // Both helpers reset `errorAction` so a stale "Log in instead" link never
  // outlives the error that justified it.
  const fail = (msg, action = null) => { setError(msg); setErrorAction(action); };

  /* ── step 1 → 2 ── */
  // Async because it now asks the backend whether this email can even apply,
  // BEFORE the applicant fills ~20 fields. Previously nothing checked: a
  // duplicate was only rejected by /accounts/signup/ at the very end of step 3,
  // and an email that already had learner profiles got told "Incorrect password
  // for this account" — about a password they had just invented — because the
  // backend authenticates existing accounts with it. Mirrors the branching
  // Signup.jsx:186-232 already does.
  const next1 = async () => {
    setError(""); setErrorAction(null);
    if (!email.trim()) return fail("Enter your email address.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return fail("Enter a valid email address.");
    if (password.length < 8) return fail("Password must be at least 8 characters.");
    if (password !== confirm) return fail("Passwords do not match.");

    setCheckingEmail(true);
    try {
      const state = await checkEmail(email.trim());
      if (state?.exists) {
        if (state.has_teacher) {
          return fail(
            state.teacher_type === "GUEST"
              ? "This email is already registered as a Skill Dev expert. Add the Faculty track to that account instead of creating a new one."
              : "This email already has a teacher account.",
            state.teacher_type === "GUEST"
              ? { label: "Add Faculty to my account", to: "/signup?role=teacher&add_track=academy" }
              : { label: "Log in instead", to: "/login" },
          );
        }
        // Learner-only account. The add-track flow is the only one that works
        // here — it proves ownership with their EXISTING account password.
        return fail(
          "This email already has an account. You can add a Faculty track to it — no need to create a second account.",
          { label: "Add Faculty to my account", to: "/signup?role=teacher&add_track=academy" },
        );
      }
    } catch {
      // Fail open, same as Signup.jsx:230 — a checkEmail outage must not block
      // a legitimate new applicant. The backend still rejects duplicates.
    } finally {
      setCheckingEmail(false);
    }
    go(2);
  };

  /* ── step 2 → 3 ── */
  const next2 = () => {
    if (!f.highest_degree) return setError("Select your highest degree.");
    if (!f.field_of_study.trim()) return setError("Enter your field of study.");
    if (!f.year_of_completion) return setError("Enter your year of completion.");
    if (!f.experience_range) return setError("Select your experience range.");
    if (!f.employment_status) return setError("Select your employment status.");
    if (!subject) return setError("Select the subject you want to teach.");
    if (classes.length === 0) return setError("Select at least one class level.");
    if (streams.length === 0) return setError("Select at least one stream.");
    go(3);
  };

  /* ── step 3 → submit → 4 ── */
  const submit = async () => {
    if (!acknowledged) {
      setError("Please confirm you'll download, sign, and upload the agreement after verifying your email.");
      return;
    }
    setError("");
    setSubmitting(true);

    const faculty_profile = {
      highest_degree: f.highest_degree,
      field_of_study: f.field_of_study.trim(),
      year_of_completion: f.year_of_completion ? Number(f.year_of_completion) : null,
      teaching_certifications: f.teaching_certifications
        .split(",").map((s) => s.trim()).filter(Boolean),
      experience_range: f.experience_range,
      employment_status: f.employment_status,
      currently_employed: f.currently_employed,
      current_institution: f.currently_employed ? f.current_institution.trim() : "",
      current_position: f.currently_employed ? f.current_position.trim() : "",
      govt_id_type: f.govt_id_type || "",
      id_number: f.id_number.trim(),
      // One subject application (no boards — the design omits them). More can be
      // added later from the dashboard /form-fillup form.
      course_application: { subject, classes, streams },
    };

    // Attach any uploaded documents (base64) — backend decodes + stores them.
    // Only include a key when a file was actually chosen.
    for (const key of ["qualification_certificate", "id_proof_front", "id_proof_back"]) {
      if (docs[key]) faculty_profile[key] = docs[key];   // { name, type, data }
    }

    try {
      if (embedded) {
        // The parent flow (Signup) owns the email/password and the account
        // creation; we just hand over the assembled application.
        await onSubmitProfile?.(faculty_profile);
        setSubmitting(false);
        // Brand-new accounts see the Verify screen here; callers that navigate
        // away afterwards (e.g. add-a-track) pass showVerifyOnSuccess={false}.
        if (showVerifyOnSuccess) go(4);
      } else {
        await signup({
          email: email.trim(),
          password,
          role: "TEACHER",
          teacher_type: "FACULTY",
          faculty_profile,
        });
        setSubmitting(false);
        go(4);
      }
    } catch (err) {
      const msg = readErr(err, "Signup failed. Please try again.");
      // The step-1 checkEmail catches almost all of these now, but it fails
      // open and the account can change underneath a slow application. When the
      // backend's own guard fires at the finish line, give it somewhere to go
      // rather than a bare string 20 fields deep.
      const isDuplicate = /log in instead|already/i.test(msg);
      const isWrongPassword = /incorrect password/i.test(msg);
      setError(
        isWrongPassword
          ? "This email already belongs to an account, so the password above doesn't match it. Add a Faculty track to that account instead."
          : msg,
      );
      setErrorAction(
        isWrongPassword
          ? { label: "Add Faculty to my account", to: "/signup?role=teacher&add_track=academy" }
          : isDuplicate
            ? { label: "Log in instead", to: "/login" }
            : null,
      );
      setSubmitting(false);
    }
  };

  /*
    Signed-in visitors must not be walked through "create your faculty account".
    This route is public and ungated (App.jsx), and the form never read auth
    state, so an authenticated user got a blank email field — and if they typed
    a DIFFERENT address, /accounts/signup/ (AllowAny, never inspects
    request.user) happily created a second, disconnected account while their
    browser session still belonged to the first.

    Two cases, both resolved before any form work:
      • already holds a teacher identity → nothing to apply for; show the real
        per-track status instead of a form that the backend will reject on
        step 3 after ~20 fields.
      • learner-only account → adding a track is the correct flow, and the only
        one that works, since the backend proves ownership with their existing
        account password rather than a newly invented one.

    `embedded` is exempt: Signup.jsx renders this inside its own add-track flow,
    where being signed in is the expected state.
  */
  if (!embedded && isAuthenticated) {
    const academy = teacherInfo?.tracks?.academy;
    const heldTrack = academy && academy !== "locked" && academy !== "rejected";
    return (
      <div className="fs-root">
        <nav className="fs-topbar">
          <div className="fs-topbar-logo">
            <svg viewBox="0 0 16 16"><path d="M8 1L1 5l7 4 7-4-7-4zM1 10l7 4 7-4M1 7.5l7 4 7-4" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <span className="fs-topbar-name">ShikshaCom</span>
          <span className="fs-topbar-badge">Faculty</span>
        </nav>
        <div className="fs-page">
          <div className="fs-card">
            <h1 className="fs-h1">
              {heldTrack ? "You already have a Faculty application" : "You're already signed in"}
            </h1>
            <p className="fs-sub">
              {heldTrack ? (
                academy === "approved"
                  ? <>Your Faculty track on <strong>{user?.email}</strong> is approved — no need to apply again.</>
                  : <>Your Faculty application on <strong>{user?.email}</strong> is in review. We&rsquo;ll email you when an admin has looked at it.</>
              ) : (
                <>You&rsquo;re signed in as <strong>{user?.email}</strong>. You don&rsquo;t need a second
                  account to teach — add a Faculty track to this one and keep your existing profiles.</>
              )}
            </p>
            <div className="fs-actions" style={{ justifyContent: "flex-start", gap: 10, flexWrap: "wrap" }}>
              {!heldTrack && (
                <button type="button" className="fs-btn fs-btn-primary"
                  onClick={() => navigate("/signup?role=teacher&add_track=academy")}>
                  Add Faculty to my account
                </button>
              )}
              <button type="button" className="fs-btn" onClick={() => navigate("/pick-profile")}>
                Go to my profiles
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fs-root">
      {/* Topbar */}
      <nav className="fs-topbar">
        <div className="fs-topbar-logo">
          <svg viewBox="0 0 16 16"><path d="M8 1L1 5l7 4 7-4-7-4zM1 10l7 4 7-4M1 7.5l7 4 7-4" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <span className="fs-topbar-name">ShikshaCom</span>
        <span className="fs-topbar-badge">Faculty</span>
      </nav>

      <div className="fs-page">
        {/* Sidebar stepper */}
        <aside className="fs-sidebar">
          <p className="fs-sidebar-title">Sign Up Steps</p>
          {visibleSteps.map((s) => {
            const state = step === s.n ? "fs-active" : step > s.n ? "fs-done" : "";
            return (
              <div className={`fs-step-item ${state}`} key={s.n}>
                <div className="fs-step-dot">{step > s.n ? "✓" : (s.icon || dispNum(s.n))}</div>
                <div className="fs-step-info">
                  <div className="fs-step-label">{s.label}</div>
                  <div className="fs-step-desc">{s.desc}</div>
                </div>
              </div>
            );
          })}
          <div className="fs-sidebar-note">
            <strong>Admin Review</strong>
            After verification your application is reviewed by our team. You'll be notified once approved.
          </div>
        </aside>

        {/* Content */}
        <main className="fs-content">

          {/* ── STEP 1: ACCOUNT (standalone only — embedded flows already have it) ── */}
          {!embedded && (
          <div className={`fs-screen ${step === 1 ? "fs-active" : ""}`}>
            <div className="fs-form-header">
              <div className="fs-form-eyebrow">Step 1 of {totalSteps}</div>
              <h1 className="fs-form-title">Create your faculty account</h1>
              <p className="fs-form-subtitle">Enter your email and set a secure password to get started.</p>
            </div>

            <div className="fs-field">
              <label htmlFor="fs-email">Email address <span className="fs-req">*</span></label>
              <input id="fs-email" type="email" autoComplete="email" placeholder="you@example.com"
                value={email} onChange={(e) => { setError(""); setEmail(e.target.value); }} />
              <p className="fs-hint">Use your institutional email if possible.</p>
            </div>

            <div className="fs-field">
              <label htmlFor="fs-pw">Password <span className="fs-req">*</span></label>
              <div className="fs-password-wrap">
                <input id="fs-pw" type={showPw ? "text" : "password"} autoComplete="new-password"
                  placeholder="Create a strong password"
                  value={password} onChange={(e) => { setError(""); setPassword(e.target.value); }} />
                <button type="button" className="fs-eye-btn" onClick={() => setShowPw((v) => !v)} aria-label="Show/hide password">
                  <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                </button>
              </div>
              <div className="fs-pwd-strength">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`fs-pwd-bar ${i <= pwScore ? "fs-fill-" + pwScore : ""}`} />
                ))}
              </div>
            </div>

            <div className="fs-field">
              <label htmlFor="fs-cf">Confirm password <span className="fs-req">*</span></label>
              <div className="fs-password-wrap">
                <input id="fs-cf" type={showCf ? "text" : "password"} autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={confirm} onChange={(e) => { setError(""); setConfirm(e.target.value); }} />
                <button type="button" className="fs-eye-btn" onClick={() => setShowCf((v) => !v)} aria-label="Show/hide password">
                  <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                </button>
              </div>
            </div>

            {error && (
              <div className="fs-error">
                {error}
                {errorAction && (
                  <>
                    {" "}
                    <Link to={errorAction.to} style={{ fontWeight: 700, textDecoration: "underline" }}>
                      {errorAction.label}
                    </Link>
                  </>
                )}
              </div>
            )}

            <div className="fs-form-actions">
              <span />
              <button className="fs-btn-primary" onClick={next1} disabled={checkingEmail}>
                {checkingEmail ? "Checking…" : <>Continue <ArrowRight /></>}
              </button>
            </div>

            <div className="fs-login-link">Already have an account? <Link to="/login">Log in</Link></div>
          </div>
          )}

          {/* ── STEP 2: TEACHING PROFILE ── */}
          <div className={`fs-screen ${step === 2 ? "fs-active" : ""}`}>
            <div className="fs-form-header">
              <div className="fs-form-eyebrow">Step {dispNum(2)} of {totalSteps}</div>
              <h1 className="fs-form-title">Teaching profile</h1>
              <p className="fs-form-subtitle">Tell us about your qualifications, experience, and the classes you want to teach.</p>
            </div>

            {/* Section 1 — Educational Qualifications */}
            <div className="fs-section-divider">
              <span className="fs-section-divider-label">Section 1 — Educational Qualifications</span>
              <div className="fs-section-divider-line" />
            </div>

            <div className="fs-field">
              <label htmlFor="fs-deg">Highest degree <span className="fs-req">*</span></label>
              <select id="fs-deg" value={f.highest_degree} onChange={set("highest_degree")}>
                <option value="">Select your highest qualification</option>
                {FAC_DEGREES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>

            <div className="fs-field">
              <label htmlFor="fs-fos">Field of study <span className="fs-req">*</span></label>
              <input id="fs-fos" type="text" placeholder="e.g. Mathematics, Computer Science"
                value={f.field_of_study} onChange={set("field_of_study")} />
            </div>

            <div className="fs-row">
              <div className="fs-field">
                <label htmlFor="fs-yoc">Year of completion <span className="fs-req">*</span></label>
                <input id="fs-yoc" type="number" min="1970" max="2026" placeholder="e.g. 2018"
                  value={f.year_of_completion} onChange={set("year_of_completion")} />
              </div>
              <div className="fs-field" style={{ flex: 1.5 }}>
                <label htmlFor="fs-cert">Teaching certifications <span className="fs-opt">(optional)</span></label>
                <input id="fs-cert" type="text" placeholder="e.g. B.Ed, CTET, NTT — comma separated"
                  value={f.teaching_certifications} onChange={set("teaching_certifications")} />
              </div>
            </div>

            {docField("qualification_certificate", "Qualification certificate", "Click to upload certificate")}

            {/* Section 2 — Teaching Experience */}
            <div className="fs-section-divider">
              <span className="fs-section-divider-label">Section 2 — Teaching Experience</span>
              <div className="fs-section-divider-line" />
            </div>

            <div className="fs-row">
              <div className="fs-field">
                <label htmlFor="fs-exp">Experience range <span className="fs-req">*</span></label>
                <select id="fs-exp" value={f.experience_range} onChange={set("experience_range")}>
                  <option value="">Select range</option>
                  {FAC_EXPERIENCE.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div className="fs-field">
                <label htmlFor="fs-emp">Employment status <span className="fs-req">*</span></label>
                <select id="fs-emp" value={f.employment_status} onChange={set("employment_status")}>
                  <option value="">Select status</option>
                  {FAC_EMPLOYMENT.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            </div>

            <div className="fs-toggle-row">
              <label className="fs-toggle">
                <input type="checkbox" checked={f.currently_employed}
                  onChange={(e) => setVal("currently_employed", e.target.checked)} />
                <div className="fs-toggle-track" />
              </label>
              <label onClick={() => setVal("currently_employed", !f.currently_employed)}>
                Currently employed at an institution
              </label>
            </div>

            {f.currently_employed && (
              <div className="fs-row" style={{ marginTop: 16 }}>
                <div className="fs-field">
                  <label htmlFor="fs-inst">Current institution <span className="fs-opt">(optional)</span></label>
                  <input id="fs-inst" type="text" placeholder="e.g. Delhi Public School"
                    value={f.current_institution} onChange={set("current_institution")} />
                </div>
                <div className="fs-field">
                  <label htmlFor="fs-pos">Current position <span className="fs-opt">(optional)</span></label>
                  <input id="fs-pos" type="text" placeholder="e.g. Senior Teacher"
                    value={f.current_position} onChange={set("current_position")} />
                </div>
              </div>
            )}

            {/* Section 3 — Verification */}
            <div className="fs-section-divider">
              <span className="fs-section-divider-label">Section 3 — Verification</span>
              <div className="fs-section-divider-line" />
            </div>
            <p className="fs-hint fs-hint-box">
              These fields are <strong>optional</strong> at sign-up, but adding them now speeds up review.
              You can also add or replace them later from your <strong>dashboard after verifying your email</strong>.
            </p>

            <div className="fs-row">
              <div className="fs-field">
                <label htmlFor="fs-idtype">Government ID type <span className="fs-opt">(optional)</span></label>
                <select id="fs-idtype" value={f.govt_id_type} onChange={set("govt_id_type")}>
                  <option value="">Select ID type</option>
                  {FAC_GOVT_ID.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div className="fs-field">
                <label htmlFor="fs-idnum">ID number <span className="fs-opt">(optional)</span></label>
                <input id="fs-idnum" type="text" maxLength={50} placeholder="Enter ID number"
                  value={f.id_number} onChange={set("id_number")} />
              </div>
            </div>

            <div className="fs-row">
              {docField("id_proof_front", "ID proof — front", "Upload front")}
              {docField("id_proof_back", "ID proof — back", "Upload back")}
            </div>

            {/* Course Application */}
            <div className="fs-section-divider">
              <span className="fs-section-divider-label">Course Application</span>
              <div className="fs-section-divider-line" />
            </div>

            <div className="fs-field">
              <label>Subject <span className="fs-req">*</span></label>
              <p className="fs-hint" style={{ marginBottom: 8 }}>Select the primary subject you want to teach.</p>
              <div className="fs-tags-group">
                {FAC_SUBJECTS.map((label) => {
                  const v = subjectValue(label);
                  return (
                    <div key={v} className={`fs-tag-option ${subject === v ? "fs-selected" : ""}`}
                      onClick={() => { setError(""); setSubject(v); }}>{label}</div>
                  );
                })}
              </div>
            </div>

            <div className="fs-field">
              <label>Classes <span className="fs-req">*</span></label>
              <p className="fs-hint" style={{ marginBottom: 8 }}>Select all class levels you can teach.</p>
              <div className="fs-tags-group">
                {FAC_CLASSES.map(([v, l]) => (
                  <div key={v} className={`fs-tag-option ${classes.includes(v) ? "fs-selected" : ""}`}
                    onClick={() => { setError(""); toggle(setClasses)(v); }}>{l}</div>
                ))}
              </div>
            </div>

            <div className="fs-field">
              <label>Streams <span className="fs-req">*</span></label>
              <p className="fs-hint" style={{ marginBottom: 8 }}>Select all applicable academic streams.</p>
              <div className="fs-tags-group">
                {FAC_STREAMS.map(([v, l]) => (
                  <div key={v} className={`fs-tag-option ${streams.includes(v) ? "fs-selected" : ""}`}
                    onClick={() => { setError(""); toggle(setStreams)(v); }}>{l}</div>
                ))}
              </div>
            </div>

            {error && (
              <div className="fs-error">
                {error}
                {errorAction && (
                  <>
                    {" "}
                    <Link to={errorAction.to} style={{ fontWeight: 700, textDecoration: "underline" }}>
                      {errorAction.label}
                    </Link>
                  </>
                )}
              </div>
            )}

            <div className="fs-form-actions">
              <button className="fs-btn-ghost" onClick={() => (embedded ? onBack?.() : go(1))}><ArrowLeft /> Back</button>
              <button className="fs-btn-primary" onClick={next2}>Continue <ArrowRight /></button>
            </div>
          </div>

          {/* ── STEP 3: AGREEMENT LETTER ── */}
          <div className={`fs-screen ${step === 3 ? "fs-active" : ""}`}>
            <div className="fs-form-header">
              <div className="fs-form-eyebrow">Step {dispNum(3)} of {totalSteps}</div>
              <h1 className="fs-form-title">Agreement letter</h1>
              <p className="fs-form-subtitle">Download the faculty agreement and read it carefully. You'll sign it and upload the signed copy from your dashboard after verifying your email.</p>
            </div>

            {agreementText && (
              <div className="fs-agreement-text"
                style={{ border: "1px solid #e2d9d3", borderRadius: 12, padding: "18px 20px", margin: "0 0 18px", maxHeight: 320, overflowY: "auto", lineHeight: 1.6, background: "#fff" }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>
                  {agreementText.title} <span style={{ fontSize: 12, color: "#9a8478" }}>· v{agreementText.version_number}</span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(renderMarkdown(agreementText.body)) }} />
              </div>
            )}

            <div className="fs-agreement-step-card">
              <div className="fs-agr-step-num">1</div>
              <div className="fs-agr-step-body">
                <strong>Download the agreement letter</strong>
                <p>This document outlines the terms and conditions for faculty members on our platform. Please read it carefully before signing.</p>
                <a className="fs-btn-primary" style={{ marginTop: 14, textDecoration: "none" }}
                  href={AGREEMENT_PDF_URL} target="_blank" rel="noreferrer"
                  onClick={() => setDownloaded(true)}>
                  <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                  Download Agreement (PDF)
                </a>
                {downloaded && (
                  <div className="fs-agr-downloaded"><Check /> Agreement opened</div>
                )}
              </div>
            </div>

            <div className="fs-agreement-step-card">
              <div className="fs-agr-step-num">2</div>
              <div className="fs-agr-step-body">
                <strong>Print, sign, and photograph</strong>
                <p>Print the agreement, sign it by hand, then take a clear photo or scan of the signed page. Ensure your signature is clearly visible.</p>
                <div className="fs-agr-tips">
                  <div className="fs-agr-tip"><Check /> Good lighting, no shadows across signature</div>
                  <div className="fs-agr-tip"><Check /> Full page visible, not cropped</div>
                  <div className="fs-agr-tip"><Check /> PDF, JPG or PNG — max {MAX_DOC_MB} MB</div>
                </div>
              </div>
            </div>

            <div className="fs-agreement-step-card">
              <div className="fs-agr-step-num">3</div>
              <div className="fs-agr-step-body">
                <strong>Upload the signed agreement</strong>
                <p>You'll upload the signed copy from your dashboard right after you verify your email — that's where document uploads (agreement, certificate, ID proof) are completed.</p>
                <label className="fs-checkbox-row">
                  <input type="checkbox" checked={acknowledged}
                    onChange={(e) => { setError(""); setAcknowledged(e.target.checked); }} />
                  I understand I must download, sign, and upload the signed agreement from my dashboard after verifying my email.
                </label>
              </div>
            </div>

            {error && (
              <div className="fs-error">
                {error}
                {errorAction && (
                  <>
                    {" "}
                    <Link to={errorAction.to} style={{ fontWeight: 700, textDecoration: "underline" }}>
                      {errorAction.label}
                    </Link>
                  </>
                )}
              </div>
            )}

            <div className="fs-form-actions">
              <button className="fs-btn-ghost" onClick={() => go(2)}><ArrowLeft /> Back</button>
              <button className="fs-btn-primary" onClick={submit} disabled={submitting}>
                {submitting ? <><span className="fs-spin" /> Submitting…</> : <>{submitLabel} <ArrowRight /></>}
              </button>
            </div>
          </div>

          {/* ── STEP 4: VERIFY EMAIL ── */}
          <div className={`fs-screen ${step === 4 ? "fs-active" : ""}`}>
            <div className="fs-verify-card">
              <div className="fs-verify-icon"><Mail /></div>
              <h2 className="fs-verify-title">Check your inbox</h2>
              <div className="fs-verify-email-label">{effectiveEmail || "your@email.com"}</div>
              <p className="fs-verify-body">
                We've sent a verification link to your email address. Click the link to verify your account —
                then sit tight while our admin team reviews your application.
              </p>

              <div className="fs-status-steps">
                <div className="fs-status-step">
                  <div className="fs-status-dot fs-done">✓</div>
                  <div className="fs-status-step-info">
                    <strong>Application submitted</strong>
                    <span>Your profile has been received</span>
                  </div>
                </div>
                <div className="fs-status-step">
                  <div className="fs-status-dot fs-wait">!</div>
                  <div className="fs-status-step-info">
                    <strong>Verify your email</strong>
                    <span>Click the link in the email we just sent you</span>
                  </div>
                </div>
                <div className="fs-status-step">
                  <div className="fs-status-dot fs-pending">3</div>
                  <div className="fs-status-step-info">
                    <strong>Admin review</strong>
                    <span>Our team will review your details (1–3 business days)</span>
                  </div>
                </div>
                <div className="fs-status-step" style={{ paddingBottom: 0 }}>
                  <div className="fs-status-dot fs-pending">4</div>
                  <div className="fs-status-step-info">
                    <strong>Account activated</strong>
                    <span>You'll receive a confirmation email to log in</span>
                  </div>
                </div>
              </div>

              <button className="fs-verify-btn" onClick={() => navigate("/login")}>
                <Mail /> Go to login
              </button>

              <p className="fs-verify-resend">
                Didn't receive it? Check spam, or use{" "}
                <Link to="/resend-verification">Resend verification</Link>.
              </p>

              <div className="fs-admin-notice">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                {/* Do NOT say "you cannot log in until approved" here — it was
                    false. LoginView (accounts/auth_flow.py) gates only on
                    is_verified, and a teacher identity in ANY state, review
                    included, deliberately routes to the profile picker so the
                    applicant can see their status and use the learner side. */}
                <p><strong>Application under review.</strong> Once you verify your email you can log in straight away — your Faculty track will show as <em>in review</em> until an admin has checked your qualifications and documents, usually within 1–3 business days. You can use the learner side of your account in the meantime.</p>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
