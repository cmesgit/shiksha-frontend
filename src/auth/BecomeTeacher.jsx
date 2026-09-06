import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AuthShell, StatusChip, FooterLink } from "./AuthKit";
import { getFacultyChoices } from "../api/formFillupApi";
import { TEACHER_ACADEMY_URL, TEACHER_SKILL_URL } from "../config/urls";
import "../css/TeacherDocs.css";

/* ════════════════════════════════════════════════════════════════
   BecomeTeacher — start teaching, from inside the product.

   This is the replacement for "re-enter signup to add a track". The caller
   is already signed in, so there is no email, no password, and no ownership
   proof to collect — which is exactly why the six add-to-existing branches in
   SignupSerializer stop being necessary.

   THE TWO TRACKS ARE NOT SYMMETRIC, AND THE SCREEN SAYS SO
   ───────────────────────────────────────────────────────
   Skill Dev is a marketplace listing and goes live immediately. Academy is
   employment: it needs documents, an agreement and admin review. Presenting
   them as two equivalent buttons would set up the faculty applicant to expect
   instant access and then hit a wall, which is roughly what the old flow did
   — it ran them through 12 screens before revealing they had to wait.

   What was ALSO true until 2026-09-06 and no longer is: a faculty teacher
   could never add Skill Dev. Both directions work now, so this screen offers
   whatever the account does not already hold.

   Detail collection (subjects, bio, documents) is deliberately NOT here.
   Skill listing details are completed on the expert dashboard, faculty
   documents in the application. Asking for them before the person has even
   decided is the friction this rebuild exists to remove.

   …WITH ONE CORRECTION, 2026-09-06. "Faculty documents in the application"
   described a step that did not exist on this path. `/faculty/signup` (the
   old wizard, still routed, still where FacultyIntro sends a NEW visitor)
   collects govt ID, ID number and certificates. This screen — where every
   ALREADY-SIGNED-IN applicant lands — collected nothing, so half the Academy
   queue arrived unreviewable while the copy below promised "you'll need
   qualification documents".

   The fix respects the reasoning above rather than reverting it: nothing is
   asked until the applicant clicks "Apply to teach", because THAT is the
   decision the docstring was protecting. Documents are collected after the
   commitment and before the submission, so an application never reaches an
   admin without the evidence needed to act on it. Skill Dev is untouched and
   still goes live in one click.
════════════════════════════════════════════════════════════════ */

/* Fallback only — the real list is served by getFacultyChoices() off
   accounts/models.py. Mirrors FacultySignup's FAC_GOVT_ID exactly; offering a
   value the server rejects is worse than offering none, because the applicant
   only finds out at submit. */
const FAC_GOVT_ID = [
  ["aadhaar", "Aadhaar"], ["pan", "PAN"], ["voter_id", "Voter ID"], ["driving_license", "Driving License"],
];

const asPairs = (served, fallback) =>
  Array.isArray(served) && served.length
    ? served.map((o) => [o.value, o.label])
    : fallback;

/* Mirrors SignupSerializer._SIGNUP_DOC_TYPES and _SIGNUP_DOC_MAX_BYTES
   exactly. Checked here as well as there because `_save_signup_document` is
   best-effort by design: it DROPS anything malformed, oversized or of an
   unexpected type rather than raising, so without a client-side check an
   applicant gets a cheerful "application received" for a submission that
   reached the admin with no documents attached. */
const DOC_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
const DOC_MAX_BYTES = 5 * 1024 * 1024;

/** One file → the {name, type, data} shape the backend decodes. */
const readDocument = (file) =>
  new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    if (!DOC_TYPES.includes((file.type || "").toLowerCase())) {
      return reject(new Error(`“${file.name}” must be a PDF, JPG or PNG.`));
    }
    if (file.size > DOC_MAX_BYTES) {
      return reject(new Error(`“${file.name}” is larger than 5 MB. Please attach a smaller copy.`));
    }
    const reader = new FileReader();
    reader.onload  = () => resolve({ name: file.name, type: file.type, data: reader.result });
    reader.onerror = () => reject(new Error(`Couldn’t read “${file.name}”. Please try again.`));
    reader.readAsDataURL(file);
  });

const TRACK_COPY = {
  skill: {
    title: "Teach on Skill Dev",
    lead: "Offer one-off sessions in what you know — languages, music, coding, exam coaching.",
    points: [
      "Goes live as soon as you start — no review, no waiting.",
      "You set your own availability.",
      "Your listing stays hidden until your profile is complete.",
    ],
    cta: "Start teaching on Skill Dev",
  },
  academy: {
    title: "Apply as Academy faculty",
    lead: "Teach a full course to a batch of students, with a timetable, assignments and grading.",
    points: [
      "Reviewed by our team before you start — this one takes a few days.",
      "You’ll need qualification documents and a signed agreement.",
      "You can keep learning on your account while it’s reviewed.",
    ],
    cta: "Apply to teach",
  },
};

const STATUS_COPY = {
  approved: "Active",
  pending:  "In review",
  rejected: "Not approved",
};

export default function BecomeTeacher() {
  const { getTeacherIdentity, addTeacherIdentity } = useAuth();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [error, setError]   = useState("");
  const [busy, setBusy]     = useState("");
  const [done, setDone]     = useState(null);

  // Academy only: the document step, opened by the apply button rather than
  // shown up front. `docs` holds the two text fields; files are read off the
  // inputs at submit so a large upload never sits in React state.
  const [docStep, setDocStep] = useState(false);
  const [choices, setChoices] = useState(null);
  const [docs, setDocs]       = useState({ govt_id_type: "", id_number: "" });
  const [docFiles, setDocFiles] = useState({
    id_proof_front: null, id_proof_back: null, qualification_certificate: null,
  });

  useEffect(() => {
    let cancelled = false;
    getTeacherIdentity()
      .then((r) => { if (!cancelled) setReport(r); })
      .catch((err) => { if (!cancelled) setError(err?.message || "Couldn’t load your account."); });
    return () => { cancelled = true; };
    // getTeacherIdentity is stable for the life of the provider.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The Academy card opens the document step instead of applying immediately.
  // Skill Dev still applies in one click — it is a marketplace listing with no
  // review, so there is nothing for a document to inform.
  const onCardClick = (track) => {
    if (track !== "academy") return apply(track);
    setError("");
    setDocStep(true);
    if (!choices) getFacultyChoices().then(setChoices).catch(() => {});
  };

  const docsReady =
    docs.govt_id_type &&
    docs.id_number.trim() &&
    docFiles.id_proof_front &&
    docFiles.id_proof_back;

  /* Documents ride WITH the application, in one atomic call.

     The obvious route — file the application, then PATCH the documents onto
     the teacher profile — cannot work, and the codebase already says so.
     `TeacherProfileView` refuses any account without an ACTIVE TEACHER role
     (accounts/views.py:681, deliberately: its get_or_create would otherwise
     spawn a phantom teacher tile on a student account), and a pending academy
     applicant does not have one. `_provision_faculty`'s own comment records
     the same dead end for signed_agreement: "there was no way to supply it
     before approval at all". An admin cannot approve without documents, and
     the applicant cannot upload until approved.

     The way through is the one signup already uses: base64 documents nested in
     `faculty_profile`, which `POST /identities/teacher/` accepts and passes to
     `_setup_teacher` / `_add_teacher_track` inside a transaction. One request,
     so the application and its evidence can never land apart. */
  const applyAcademy = async () => {
    setError(""); setBusy("academy");
    try {
      const [front, back, cert] = await Promise.all([
        readDocument(docFiles.id_proof_front),
        readDocument(docFiles.id_proof_back),
        readDocument(docFiles.qualification_certificate),
      ]);

      await apply("academy", {
        faculty_profile: {
          govt_id_type: docs.govt_id_type,
          id_number: docs.id_number.trim(),
          id_proof_front: front,
          id_proof_back: back,
          ...(cert ? { qualification_certificate: cert } : {}),
        },
      });
    } catch (err) {
      setError(err?.message || "Couldn’t send your application. Please try again.");
      setBusy("");
    }
  };

  const apply = async (track, payload) => {
    setError(""); setBusy(track);
    try {
      const res = await addTeacherIdentity(track, payload);
      if (res?.alreadyHeld) {
        setError(res.detail || "You already hold that track.");
        setBusy("");
        return;
      }
      setDone({ track, needsReview: !!res?.needs_review });
    } catch (err) {
      setError(err?.message || "Couldn’t set that up. Please try again.");
    } finally {
      setBusy("");
    }
  };

  /* ── Confirmation ── */
  if (done) {
    const reviewing = done.needsReview;
    return (
      <AuthShell role={reviewing ? "neutral" : "success"} flowLabel="Teaching" brandIcon="spark">
        <StatusChip icon={reviewing ? "mail" : "check"} role={reviewing ? "neutral" : "success"} />
        <h1 className="af-heading">
          {reviewing ? "Application received" : "You’re set up to teach"}
        </h1>
        <p className="af-sub">
          {reviewing
            ? "Our team will review your application. You’ll hear from us by email — and you can keep using your account for learning in the meantime."
            : "Your Skill Dev teaching is active. Complete your profile and your listing goes public."}
        </p>
        <div className="af-spacer" />
        <div className="af-actions">
          {!reviewing && (
            <a href={done.track === "skill" ? TEACHER_SKILL_URL : TEACHER_ACADEMY_URL}
               className="af-btn af-btn--block"
               style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
              Go to your teaching dashboard
            </a>
          )}
          <button className="af-btn af-btn--ghost af-btn--block" onClick={() => navigate("/")}>
            Back to ShikshaCom
          </button>
        </div>
      </AuthShell>
    );
  }

  if (!report && !error) {
    return (
      <AuthShell role="neutral" flowLabel="Teaching" brandIcon="spark">
        <h1 className="af-heading">Teach on ShikshaCom</h1>
        <p className="af-sub">Loading your account…</p>
      </AuthShell>
    );
  }

  const tracks  = report?.tracks || {};
  const canAdd  = report?.can_add || {};
  const offered = ["skill", "academy"].filter((t) => canAdd[t]);
  const held    = ["skill", "academy"].filter((t) => !canAdd[t] && tracks[t] && tracks[t] !== "locked");

  return (
    <AuthShell role="neutral" flowLabel="Teaching" brandIcon="spark">
      <h1 className="af-heading">Teach on ShikshaCom</h1>
      <p className="af-sub">
        You can do both — teaching is added to the account you already have,
        and your learning side keeps working exactly as it does now.
      </p>

      {error && <p className="af-error">{error}</p>}

      {held.length > 0 && (
        <div style={{ margin: "16px 0", maxWidth: 520 }}>
          {held.map((t) => (
            <p key={t} style={{ fontSize: 13.5, color: "#4b4d57", margin: "4px 0" }}>
              <b>{TRACK_COPY[t].title}</b> — {STATUS_COPY[tracks[t]] || tracks[t]}
            </p>
          ))}
        </div>
      )}

      {offered.length === 0 ? (
        <>
          <p className="af-sub" style={{ marginTop: 12 }}>
            You’ve already set up everything this account can teach.
          </p>
          <div className="af-spacer" />
          <div className="af-actions">
            <button className="af-btn af-btn--block" onClick={() => navigate("/pick-profile")}>
              Go to your dashboard
            </button>
          </div>
        </>
      ) : (
        offered.map((t) => {
          const c = TRACK_COPY[t];
          return (
            <section key={t} style={{
              maxWidth: 520, margin: "18px 0", padding: "16px 18px",
              border: "1px solid #e3e5ea", borderRadius: 14,
            }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 6px" }}>{c.title}</h2>
              <p style={{ fontSize: 13.5, color: "#4b4d57", margin: "0 0 10px", lineHeight: 1.5 }}>
                {c.lead}
              </p>
              <ul style={{ fontSize: 13, color: "#5b5e69", margin: "0 0 14px", paddingLeft: 18, lineHeight: 1.7 }}>
                {c.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              {!(t === "academy" && docStep) && (
                <button
                  className="af-btn af-btn--block"
                  disabled={!!busy}
                  onClick={() => onCardClick(t)}
                >
                  {busy === t ? "Setting up…" : c.cta}
                </button>
              )}
            </section>
          );
        })
      )}

      {docStep && (
        <div className="td-step">
          <h2 className="td-step__title">Your verification documents</h2>
          <p className="td-step__lead">
            Academy teaching is a paid position, so our team verifies who you are
            before you start. We ask once, here — you won’t be chased for these later.
          </p>

          {error && <p className="td-error">{error}</p>}

          <div className="td-field">
            <label className="td-field__label" htmlFor="td-govt-type">Government ID type</label>
            <select
              id="td-govt-type"
              className="td-select"
              value={docs.govt_id_type}
              disabled={!!busy}
              onChange={(e) => setDocs((d) => ({ ...d, govt_id_type: e.target.value }))}
            >
              <option value="">Choose one…</option>
              {asPairs(choices?.govt_id_type, FAC_GOVT_ID).map(([v, label]) => (
                <option key={v} value={v}>{label}</option>
              ))}
            </select>
          </div>

          <div className="td-field">
            <label className="td-field__label" htmlFor="td-govt-number">ID number</label>
            <input
              id="td-govt-number"
              className="td-input"
              type="text"
              autoComplete="off"
              value={docs.id_number}
              disabled={!!busy}
              onChange={(e) => setDocs((d) => ({ ...d, id_number: e.target.value }))}
            />
          </div>

          <div className="td-pair">
            <div className="td-field">
              <label className="td-field__label" htmlFor="td-id-front">ID — front</label>
              <input
                id="td-id-front"
                className="td-file"
                type="file"
                accept="image/*,.pdf"
                disabled={!!busy}
                onChange={(e) => setDocFiles((f) => ({ ...f, id_proof_front: e.target.files?.[0] || null }))}
              />
            </div>
            <div className="td-field">
              <label className="td-field__label" htmlFor="td-id-back">ID — back</label>
              <input
                id="td-id-back"
                className="td-file"
                type="file"
                accept="image/*,.pdf"
                disabled={!!busy}
                onChange={(e) => setDocFiles((f) => ({ ...f, id_proof_back: e.target.files?.[0] || null }))}
              />
            </div>
          </div>

          <div className="td-field">
            <label className="td-field__label" htmlFor="td-cert">
              Qualification certificate <span style={{ fontWeight: 400 }}>(optional now)</span>
            </label>
            <input
              id="td-cert"
              className="td-file"
              type="file"
              accept="image/*,.pdf"
              disabled={!!busy}
              onChange={(e) => setDocFiles((f) => ({ ...f, qualification_certificate: e.target.files?.[0] || null }))}
            />
            <span className="td-field__hint">
              You can add this later from your teaching profile, but review is faster with it.
            </span>
          </div>

          <p className="td-note">
            These are checked by our admin team and are not shown to students. Once
            your application is approved they’re locked — ask an admin if anything
            needs changing after that.
          </p>

          <div className="td-actions">
            <button
              className="af-btn"
              disabled={!docsReady || !!busy}
              onClick={applyAcademy}
            >
              {busy === "academy" ? "Sending…" : "Send application"}
            </button>
            <button
              className="af-btn af-btn--ghost"
              disabled={!!busy}
              onClick={() => { setDocStep(false); setError(""); }}
            >
              Back
            </button>
          </div>
        </div>
      )}

      <FooterLink>Not now? <Link to="/">Back to ShikshaCom</Link></FooterLink>
    </AuthShell>
  );
}
