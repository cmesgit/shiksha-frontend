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
 * RESOLVED — the SIGNED agreement now has a pre-approval upload path. It was
 * previously download + acknowledge only, and the "upload it from your
 * dashboard" the checkbox promised did not exist for a pending applicant:
 * /form-fillup serves the LEARNER form to one (FormFillupView keys off
 * get_active_roles() and a pending faculty's TEACHER role is is_active=False),
 * and the teacher-app editor that does handle signed_agreement sits behind
 * teacher context, which returns 403 not_approved until the track is live.
 * `signed_agreement` now rides the same base64 signup path as the other three
 * documents (SignupSerializer._save_signup_document), and the applicant is
 * bound to the agreement version in force at that moment via
 * TeacherProfile.record_agreement_signature(). Still optional — an applicant
 * who'd rather sign later can skip it and upload after approval.
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

/* FALLBACK option lists only.
   The real lists are fetched from GET /accounts/faculty-choices/, which serves
   them straight off accounts/models.py — because these hardcoded copies DID
   drift and broke the form: FAC_SUBJECTS below shipped 10 subjects while the
   model accepted 15, so Computer Science / Accountancy / Business Studies /
   Political Science / Other were unreachable for every applicant, and any
   value not in the model's choices is silently dropped by signup validation.
   These stay purely so the form still works if that request fails; they are
   deliberately the CONSERVATIVE always-valid set, not the full taxonomy. */
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
/* One unnamed group so the grouped renderer can handle fallback unchanged. */
const FAC_SUBJECT_GROUPS = [
  { group: "", options: [
    ["mathematics", "Mathematics"], ["physics", "Physics"], ["chemistry", "Chemistry"],
    ["biology", "Biology"], ["english", "English"], ["hindi", "Hindi"],
    ["social_science", "Social Science"], ["history", "History"], ["geography", "Geography"],
    ["economics", "Economics"], ["computer_science", "Computer Science"],
    ["accountancy", "Accountancy"], ["business_studies", "Business Studies"],
    ["political_science", "Political Science"], ["other", "Other"],
  ] },
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

/* Normalise a served {value,label} list into the [value,label] pairs the
   existing renderers already expect, so the server data and the fallback
   constants above are interchangeable. */
const asPairs = (served, fallback) =>
  Array.isArray(served) && served.length
    ? served.map((o) => [o.value, o.label])
    : fallback;

/* ── Draft autosave ────────────────────────────────────────────────────────
   This is a long form (qualifications, experience, employment, course
   application) that lives entirely in component state, so ANY remount —
   switching tab and back, a reload, following the Terms link, an accidental
   Back — dropped every answer and returned to step 1. Re-typing all of it is
   the single most annoying thing about applying.

   DELIBERATELY NOT PERSISTED:
   - the password / confirm fields. Never write a credential to disk.
   - `id_number` (Aadhaar/PAN/etc). A government identifier sitting in
     localStorage on a shared or family device is exactly the kind of thing
     this product is careful about elsewhere (see scholarship/aadhaar_offline.py's
     compliance notes) — one field to retype is the right trade.
   - the base64 document bytes. Three 5 MB uploads is ~20 MB once base64'd,
     several times the ~5 MB localStorage quota — writing them would throw
     QuotaExceededError and lose the whole draft. Only the FILE NAMES are
     kept, so the form can tell the applicant exactly what to re-attach.

   localStorage (not sessionStorage) because closing the tab entirely is one
   of the cases worth surviving; bounded by an explicit TTL so a stale draft
   full of someone's professional history doesn't linger indefinitely. */
const DRAFT_KEY = "shiksha_faculty_signup_draft";
// Deliberately NOT bumped when the course-application shape changed from a
// single {subject, classes, streams} to a courseApps LIST — bumping discards
// the draft, which is the exact data loss this feature exists to prevent. The
// courseApps initializer migrates the old shape in place instead. Only bump
// for a change that genuinely can't be migrated.
const DRAFT_VERSION = 1;
const DRAFT_TTL_MS = 7 * 24 * 60 * 60 * 1000;   // 7 days

function readDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw);
    // A schema bump or an expired draft is discarded rather than half-applied.
    if (d?.v !== DRAFT_VERSION) { localStorage.removeItem(DRAFT_KEY); return null; }
    if (!d.savedAt || Date.now() - d.savedAt > DRAFT_TTL_MS) {
      localStorage.removeItem(DRAFT_KEY);
      return null;
    }
    return d;
  } catch { return null; }
}

function clearDraft() {
  try { localStorage.removeItem(DRAFT_KEY); } catch { /* noop */ }
}

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
 *   requireTerms         show the Terms of Use acceptance checkbox and block
 *                        submit until it's checked (true for brand-new
 *                        accounts, which is also the standalone default —
 *                        that path always creates one; false for an
 *                        add-a-track upgrade of an existing account, which
 *                        already accepted terms when it was first created)
 *   submitLabel          label for the submit button
 */
export default function FacultySignup({
  embedded = false,
  presetEmail = "",
  onSubmitProfile,
  onBack,
  showVerifyOnSuccess = true,
  requireTerms = true,
  submitLabel = "Submit application",
} = {}) {
  const navigate = useNavigate();
  const { signup, checkEmail, isAuthenticated, user, teacherInfo } = useAuth();

  /* Account is step 1; embedded flows start on the teaching profile (step 2). */
  const FIRST_STEP = embedded ? 2 : 1;
  const visibleSteps = embedded ? STEPS.filter((s) => s.key !== "account") : STEPS;
  const totalSteps = visibleSteps.length;
  const dispNum = (n) => visibleSteps.findIndex((s) => s.n === n) + 1; // 1-based display index

  /* Restored once, synchronously, before first paint — so the form never
     flashes empty and then fills in. */
  const [draft] = useState(readDraft);
  const [draftRestored, setDraftRestored] = useState(
    () => !!draft && !!draft.hasContent,
  );

  const [step, setStep] = useState(() => {
    // STANDALONE mode owns the password, and a password is deliberately never
    // persisted — so a restored draft always has an empty one. Resuming
    // straight onto step 2/3 would hide that until the final submit failed
    // with a "Password must be at least 8 characters" error pointing at a
    // field on a step the applicant can't even see. Send them to step 1
    // instead; every step-2/3 answer is still restored, so nothing is lost.
    // (Embedded mode is exempt: its parent flow already collected both.)
    if (!embedded) return FIRST_STEP;
    // Clamp: never restore onto step 4 (the post-submit Verify screen) and
    // never below this mode's first visible step.
    const s = Number(draft?.step);
    if (!Number.isFinite(s)) return FIRST_STEP;
    return Math.min(Math.max(s, FIRST_STEP), 3);
  });
  const [error, setError] = useState("");
  // An optional in-product next step to render beside `error`. Duplicate-account
  // errors are dead ends without one: the only "Log in" link on this page lives
  // on step 1, so a rejection surfaced later left the applicant with nowhere to
  // click. Shape: { label, to }.
  const [errorAction, setErrorAction] = useState(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* account */
  const [email, setEmail] = useState(() => draft?.email || "");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);

  /* The email to show on the Verify card / use for messaging. In embedded mode
     it comes from the upstream sign-up step; standalone uses the step-1 input. */
  const effectiveEmail = embedded ? presetEmail : email;

  /* teaching profile (scalars; documents are the base64 uploads below) */
  const [f, setF] = useState(() => ({
    highest_degree: "", field_of_study: "", year_of_completion: "",
    teaching_certifications: "",
    experience_range: "", employment_status: "",
    currently_employed: false, current_institution: "", current_position: "",
    govt_id_type: "", id_number: "",
    // Spread last so a restored draft wins — but `id_number` is never in the
    // draft (see the DELIBERATELY NOT PERSISTED note above), so it stays "".
    ...(draft?.f || {}),
  }));
  const set = (k) => (e) => { setError(""); setF((p) => ({ ...p, [k]: e.target.value })); };
  const setVal = (k, v) => { setError(""); setF((p) => ({ ...p, [k]: v })); };

  /* verification documents — { name, type, data(base64) } | null each */
  const [docs, setDocs] = useState({
    qualification_certificate: null,
    id_proof_front: null,
    id_proof_back: null,
    signed_agreement: null,
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
      // Real bytes are attached now — drop the "re-attach this" reminder.
      setStaleDocNames((p) => { const { [key]: _drop, ...rest } = p; return rest; });
    };
    reader.onerror = () => setError("Could not read that file. Please try again.");
    reader.readAsDataURL(file);
  };
  const clearDoc = (key) => () => {
    setError("");
    setDocs((p) => ({ ...p, [key]: null }));
    setStaleDocNames((p) => { const { [key]: _drop, ...rest } = p; return rest; });
  };

  /* Reusable file-upload control (uses the .fs-file-upload styles). */
  const docField = (key, labelText, cta) => {
    const d = docs[key];
    const stale = !d && staleDocNames[key];
    return (
      <div className="fs-field">
        <label>{labelText} <span className="fs-opt">(optional)</span></label>
        {stale && (
          <p className="fs-hint" style={{ color: "var(--warn-text, #8a6d1f)", marginBottom: 6 }}>
            Please re-attach <strong>{stale}</strong> — files aren't kept in a saved draft.
          </p>
        )}
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

  /* Course applications — a LIST. A faculty member commonly teaches more than
     one subject, and this form used to capture exactly one, forcing everyone
     to add the rest from /form-fillup after approval — which is also the form
     a PENDING applicant cannot reach. Same {subject, classes, streams} shape
     FormFillup's courseApps already uses, so the two agree. */
  const blankApp = () => ({ subject: "", classes: [], streams: [] });
  const [courseApps, setCourseApps] = useState(() => {
    const saved = draft?.courseApps;
    if (Array.isArray(saved) && saved.length) {
      return saved.map((a) => ({
        subject: a?.subject || "",
        classes: Array.isArray(a?.classes) ? a.classes : [],
        streams: Array.isArray(a?.streams) ? a.streams : [],
      }));
    }
    // Migrate a draft written by the previous single-subject version instead
    // of silently dropping what the applicant already filled in.
    if (draft?.subject || draft?.classes?.length || draft?.streams?.length) {
      return [{
        subject: draft.subject || "",
        classes: draft.classes || [],
        streams: draft.streams || [],
      }];
    }
    return [blankApp()];
  });

  const patchApp = (idx, key, value) => {
    setError("");
    setCourseApps((prev) => prev.map((a, i) => (i === idx ? { ...a, [key]: value } : a)));
  };
  const toggleIn = (idx, key) => (v) => {
    setError("");
    setCourseApps((prev) => prev.map((a, i) => {
      if (i !== idx) return a;
      const arr = a[key];
      return { ...a, [key]: arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v] };
    }));
  };
  const addApp = () => { setError(""); setCourseApps((p) => [...p, blankApp()]); };
  const removeApp = (idx) => {
    setError("");
    setCourseApps((p) => (p.length <= 1 ? p : p.filter((_, i) => i !== idx)));
  };
  /* Subjects already claimed by another block — a duplicate row would just
     show up twice in the admin review queue (the backend drops dupes too). */
  const takenSubjects = (idx) =>
    new Set(courseApps.filter((_, i) => i !== idx).map((a) => a.subject).filter(Boolean));

  /* File names carried over from a restored draft — the bytes are never
     persisted (quota), so these exist only to tell the applicant which
     uploads to re-attach. Cleared per-key as soon as that file is re-picked. */
  const [staleDocNames, setStaleDocNames] = useState(() => draft?.docNames || {});

  /* agreement */
  const [downloaded, setDownloaded] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [agreementText, setAgreementText] = useState(null);   // current published version
  // Distinguishes "still loading" from "loaded, nothing published" — both
  // used to look identical (agreementText === null), so a missing letter
  // silently vanished the whole panel and signup proceeded anyway, bound to
  // nothing. See the acknowledge-gate in submit() below.
  const [agreementLoaded, setAgreementLoaded] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);  // site Terms of Use (new accounts only)

  // Pull the live, admin-published Faculty Agreement so the applicant reads
  // the exact current text, kept in sync with the admin editor — this text
  // (not a separately downloaded file) is what "Print this agreement" below
  // prints, so what's signed always matches what was actually shown.
  useEffect(() => {
    let cancelled = false;
    api.get("/accounts/agreements/faculty/")
      .then((res) => { if (!cancelled) setAgreementText(res.data?.current_version || null); })
      .catch(() => { if (!cancelled) setAgreementText(null); })
      .finally(() => { if (!cancelled) setAgreementLoaded(true); });
    return () => { cancelled = true; };
  }, []);

  /* Autosave the draft on every change. Cheap (a few hundred bytes of JSON),
     and wrapped because localStorage throws in private-browsing modes and
     when the quota is hit — a failed save must never break the form. */
  useEffect(() => {
    const { id_number, ...safeF } = f;   // eslint-disable-line no-unused-vars
    const docNames = Object.fromEntries(
      Object.entries(docs).filter(([, v]) => v).map(([k, v]) => [k, v.name]),
    );
    // Only claim there's a draft worth restoring once something was actually
    // typed — otherwise a first visit would show "we restored your draft".
    const appsHaveContent = courseApps.some(
      (a) => a.subject || a.classes.length || a.streams.length,
    );
    const hasContent = !!(
      email || appsHaveContent ||
      Object.values(safeF).some((v) => v !== "" && v !== false)
    );
    if (!hasContent) { clearDraft(); return; }
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({
        v: DRAFT_VERSION, savedAt: Date.now(), hasContent,
        step, email, f: safeF, courseApps,
        // Merge so a name survives until its file is actually re-attached.
        docNames: { ...staleDocNames, ...docNames },
      }));
    } catch { /* private mode / quota — carry on without a draft */ }
  }, [step, email, f, courseApps, docs, staleDocNames]);

  /* Option lists, served from the model so they can't drift from what signup
     validation actually accepts (see the FALLBACK note at the top of this
     file). Failure is non-fatal — the fallback constants keep the form
     usable, just with the narrower always-valid taxonomy. */
  const [choices, setChoices] = useState(null);
  useEffect(() => {
    let cancelled = false;
    api.get("/accounts/faculty-choices/")
      .then((res) => { if (!cancelled) setChoices(res.data || null); })
      .catch(() => { if (!cancelled) setChoices(null); });
    return () => { cancelled = true; };
  }, []);

  const subjectGroups = (Array.isArray(choices?.subject_groups) && choices.subject_groups.length)
    ? choices.subject_groups.map((g) => ({
        group: g.group || "",
        options: (g.options || []).map((o) => [o.value, o.label]),
      }))
    : FAC_SUBJECT_GROUPS;
  const facClasses    = asPairs(choices?.classes,           FAC_CLASSES);
  const facStreams    = asPairs(choices?.streams,           FAC_STREAMS);
  const facDegrees    = asPairs(choices?.highest_degree,    FAC_DEGREES);
  const facExperience = asPairs(choices?.experience_range,  FAC_EXPERIENCE);
  const facEmployment = asPairs(choices?.employment_status, FAC_EMPLOYMENT);
  const facGovtId     = asPairs(choices?.govt_id_type,      FAC_GOVT_ID);

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
          // An UNVERIFIED duplicate was a hard dead end: the track guard
          // refuses a second application ("Log in instead"), but LoginView
          // refuses an unverified account ("Email not verified."), and the
          // 24h purge window meant an applicant who lost the verification
          // email had no way forward at all. checkEmail already tells us which
          // case this is, so send them to the one action that works.
          if (!state.is_verified) {
            return fail(
              "You already started an application with this email, but it isn't verified yet. Check your inbox for the verification link — we can send you a fresh one.",
              { label: "Resend verification email", to: "/resend-verification" },
            );
          }
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
    // Validate each subject block by position, so the message points at the
    // one that's actually incomplete instead of just "select a subject".
    for (let i = 0; i < courseApps.length; i++) {
      const a = courseApps[i];
      const where = courseApps.length > 1 ? ` for subject ${i + 1}` : "";
      if (!a.subject) return setError(`Select the subject you want to teach${where}.`);
      if (a.classes.length === 0) return setError(`Select at least one class level${where}.`);
      if (a.streams.length === 0) return setError(`Select at least one stream${where}.`);
    }
    go(3);
  };

  /* ── step 3 → submit → 4 ── */
  const submit = async () => {
    if (agreementLoaded && !agreementText) {
      setError("The faculty agreement isn't available right now. Please try again shortly, or contact support.");
      return;
    }
    if (!acknowledged) {
      setError("Please confirm you'll print, sign, and upload the agreement after verifying your email.");
      return;
    }
    if (requireTerms && !termsAccepted) {
      setError("Please accept the Terms of Use to continue.");
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
      // Every subject the applicant wants to teach (no boards — the design
      // omits them). `_provision_faculty` creates one TeacherCourseApplication
      // per entry and mirrors the FIRST onto the profile's headline fields.
      course_applications: courseApps.map(({ subject, classes, streams }) => ({
        subject, classes, streams,
      })),
    };

    // Attach any uploaded documents (base64) — backend decodes + stores them.
    // Only include a key when a file was actually chosen.
    for (const key of ["qualification_certificate", "id_proof_front",
                       "id_proof_back", "signed_agreement"]) {
      if (docs[key]) faculty_profile[key] = docs[key];   // { name, type, data }
    }

    try {
      if (embedded) {
        // The parent flow (Signup) owns the email/password and the account
        // creation; we just hand over the assembled application (+ whether
        // terms were accepted here, when this step is the one asking for it).
        await onSubmitProfile?.(faculty_profile, termsAccepted);
        // Submitted for real — the draft has served its purpose. Clearing it
        // here (not on unmount) means a FAILED submit keeps the draft intact.
        clearDraft();
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
          terms_accepted: termsAccepted,
        });
        clearDraft();
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

          {/* A restored draft must be visible and escapable — silently
              pre-filling someone else's half-finished application (shared
              device) with no way out would be worse than losing it. */}
          {draftRestored && step !== 4 && (
            <div className="fs-draft-notice" role="status">
              <span>
                We brought back your saved answers. Attached files and your ID
                number need re-entering.
              </span>
              <button type="button" onClick={() => {
                clearDraft();
                setDraftRestored(false);
                window.location.reload();
              }}>Start over</button>
            </div>
          )}

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
                {facDegrees.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
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
                  {facExperience.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div className="fs-field">
                <label htmlFor="fs-emp">Employment status <span className="fs-req">*</span></label>
                <select id="fs-emp" value={f.employment_status} onChange={set("employment_status")}>
                  <option value="">Select status</option>
                  {facEmployment.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
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
                  {facGovtId.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
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

            {courseApps.map((app, idx) => {
              const taken = takenSubjects(idx);
              return (
              <div key={idx} className="fs-course-app">
                {courseApps.length > 1 && (
                  <div className="fs-course-app-head">
                    <span className="fs-course-app-title">Subject {idx + 1}</span>
                    <button type="button" className="fs-course-app-remove"
                      onClick={() => removeApp(idx)}>Remove</button>
                  </div>
                )}

                <div className="fs-field">
                  <label>Subject <span className="fs-req">*</span></label>
                  <p className="fs-hint" style={{ marginBottom: 8 }}>
                    {idx === 0
                      ? "Select the main subject you want to teach."
                      : "Select another subject you want to teach."}
                  </p>
                  {/* Grouped rather than one flat wall of chips — the taxonomy now
                      covers school subjects, languages, commerce and competitive-exam
                      prep, which is too many to scan unlabelled. The fallback list
                      uses a single unnamed group, so it renders unchanged. */}
                  {subjectGroups.map(({ group, options }) => (
                    <div key={group || "all"} className="fs-subject-group">
                      {group && <div className="fs-subject-group-label">{group}</div>}
                      <div className="fs-tags-group">
                        {options.map(([v, l]) => {
                          // Claimed by another block — disabled rather than hidden,
                          // so the list doesn't reshuffle as choices are made.
                          const isTaken = taken.has(v);
                          return (
                            <div key={v}
                              className={`fs-tag-option ${app.subject === v ? "fs-selected" : ""} ${isTaken ? "fs-tag-disabled" : ""}`}
                              title={isTaken ? "Already added above" : undefined}
                              onClick={() => { if (!isTaken) patchApp(idx, "subject", v); }}>{l}</div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="fs-field">
                  <label>Classes <span className="fs-req">*</span></label>
                  <p className="fs-hint" style={{ marginBottom: 8 }}>Select all class levels you can teach for this subject.</p>
                  <div className="fs-tags-group">
                    {facClasses.map(([v, l]) => (
                      <div key={v} className={`fs-tag-option ${app.classes.includes(v) ? "fs-selected" : ""}`}
                        onClick={() => toggleIn(idx, "classes")(v)}>{l}</div>
                    ))}
                  </div>
                </div>

                <div className="fs-field">
                  <label>Streams <span className="fs-req">*</span></label>
                  <p className="fs-hint" style={{ marginBottom: 8 }}>Select all applicable academic streams.</p>
                  <div className="fs-tags-group">
                    {facStreams.map(([v, l]) => (
                      <div key={v} className={`fs-tag-option ${app.streams.includes(v) ? "fs-selected" : ""}`}
                        onClick={() => toggleIn(idx, "streams")(v)}>{l}</div>
                    ))}
                  </div>
                </div>
              </div>
              );
            })}

            <button type="button" className="fs-add-subject" onClick={addApp}>
              + Add another subject
            </button>

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
              <p className="fs-form-subtitle">Read the faculty agreement below and print it. You'll sign it and upload the signed copy from your dashboard after verifying your email.</p>
            </div>

            {agreementText ? (
              <div className="fs-agreement-text" id="fs-agreement-printable"
                data-version={agreementText.version_number}
                style={{ border: "1px solid #e2d9d3", borderRadius: 12, padding: "18px 20px", margin: "0 0 18px", maxHeight: 320, overflowY: "auto", lineHeight: 1.6, background: "#fff" }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>
                  {agreementText.title} <span style={{ fontSize: 12, color: "#9a8478" }}>· v{agreementText.version_number}</span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(renderMarkdown(agreementText.body)) }} />
              </div>
            ) : agreementLoaded && (
              <div className="fs-agr-error" role="alert" style={{ color: "#c0392b", marginBottom: 18 }}>
                The faculty agreement isn't available right now. Please try again shortly, or contact support.
              </div>
            )}

            <div className="fs-agreement-step-card">
              <div className="fs-agr-step-num">1</div>
              <div className="fs-agr-step-body">
                {/* Two authoring routes, both version-pinned: an admin either
                    imported a file for this version (download it) or wrote the
                    text in the CMS (print what's shown above). Either way the
                    artifact matches the version number recorded on signing. */}
                {agreementText?.document_url ? (
                  <>
                    <strong>Download the agreement letter</strong>
                    <p>This is version {agreementText.version_number} of the faculty agreement — the exact document your application will be recorded against.</p>
                    <a className="fs-btn-primary" style={{ marginTop: 14, textDecoration: "none" }}
                      href={agreementText.document_url} target="_blank" rel="noreferrer"
                      onClick={() => setDownloaded(true)}>
                      <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                      Download Agreement (v{agreementText.version_number})
                    </a>
                    {downloaded && (
                      <div className="fs-agr-downloaded"><Check /> Agreement opened</div>
                    )}
                  </>
                ) : (
                  <>
                    <strong>Print the agreement letter</strong>
                    <p>The text above is the current, admin-published version — printing it (rather than a separate downloaded file) guarantees you sign exactly what you were shown.</p>
                    <button type="button" className="fs-btn-primary" style={{ marginTop: 14 }}
                      disabled={!agreementText}
                      onClick={() => { setDownloaded(true); window.print(); }}>
                      <svg viewBox="0 0 24 24"><path d="M6 9V2h12v7" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>
                      Print Agreement (v{agreementText?.version_number ?? "…"})
                    </button>
                    {downloaded && (
                      <div className="fs-agr-downloaded"><Check /> Print dialog opened</div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="fs-agreement-step-card">
              <div className="fs-agr-step-num">2</div>
              <div className="fs-agr-step-body">
                <strong>Sign and photograph</strong>
                <p>Sign the printed agreement by hand, then take a clear photo or scan of the signed page. Ensure your signature is clearly visible.</p>
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
                {/* This used to be an acknowledge-only checkbox promising a
                    dashboard upload that did not exist for a pending
                    applicant — /form-fillup serves them the LEARNER form and
                    the teacher editor 403s until the track is approved. The
                    signed copy now rides the signup payload like the other
                    documents, so it can genuinely be supplied here. */}
                <p>Attach the signed copy now, or skip and upload it from your dashboard once your application is approved.</p>
                {docField("signed_agreement", "Signed agreement", "Upload signed agreement")}
                <label className="fs-checkbox-row">
                  <input type="checkbox" checked={acknowledged}
                    onChange={(e) => { setError(""); setAcknowledged(e.target.checked); }} />
                  {docs.signed_agreement
                    ? "I confirm this is the agreement I have read and signed."
                    : "I understand I must print, sign, and upload the signed agreement before I can start teaching."}
                </label>
              </div>
            </div>

            {requireTerms && (
              <label className="fs-checkbox-row">
                <input type="checkbox" checked={termsAccepted}
                  onChange={(e) => { setError(""); setTermsAccepted(e.target.checked); }} />
                I agree to the <Link to="/terms" target="_blank">Terms of Use</Link>.
              </label>
            )}

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
