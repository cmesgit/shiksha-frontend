import { useEffect, useState, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AuthShell, StatusChip, FooterLink } from "./AuthKit";
import { TEACHER_ACADEMY_URL, TEACHER_SKILL_URL } from "../config/urls";

/* Lazy, like every other route-sized component in this app: the faculty form
   is ~35 kB of chunk that a Skill Dev applicant never needs. */
const FacultySignup = lazy(() => import("../components/FacultySignup"));

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

   …AND ONE MORE, 2026-09-09. The hand-rolled document step above only ever
   collected five fields. `/faculty/signup` also collects degree, field of
   study, year of completion, experience, employment status and — crucially —
   the SUBJECTS the applicant wants to teach, as `course_applications`. Without
   those, `_provision_faculty` creates no TeacherCourseApplication rows, so
   `TeacherProfile.subject/classes/streams` stay empty and the admin approval
   queue renders the applicant's subjects as "—" (the serializer falls back to
   `field_of_study`, which was also never collected). An admin was being asked
   to approve a teacher without being told what they teach.

   Rather than reimplement eight fields and a subject repeater here, this
   screen now EMBEDS FacultySignup, which already owns all of it — the same
   `embedded` mode the retired Signup.jsx drove. It hands the assembled
   faculty_profile to `onSubmitProfile`, which is exactly the seam needed: no
   email, no password, no account creation, just the application. One form, one
   set of validators, no drift.

   `requireDocuments` is passed so the 2026-09-06 decision above survives the
   refactor — FacultySignup's own default leaves identity proof optional, and
   silently loosening that gate is how the unreviewable-queue bug returns.
════════════════════════════════════════════════════════════════ */

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
  const { user, getTeacherIdentity, addTeacherIdentity } = useAuth();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [error, setError]   = useState("");
  const [busy, setBusy]     = useState("");
  const [done, setDone]     = useState(null);

  // Academy only: the application form, opened by the apply button rather than
  // shown up front. FacultySignup owns every field and its validation.
  const [docStep, setDocStep] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getTeacherIdentity()
      .then((r) => { if (!cancelled) setReport(r); })
      .catch((err) => { if (!cancelled) setError(err?.message || "Couldn’t load your account."); });
    return () => { cancelled = true; };
    // getTeacherIdentity is stable for the life of the provider.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The Academy card opens the application form instead of applying
  // immediately. Skill Dev still applies in one click — it is a marketplace
  // listing with no review, so there is nothing for an application to inform.
  const onCardClick = (track) => {
    if (track !== "academy") return apply(track);
    setError("");
    setDocStep(true);
  };

  /* The application rides WITH the documents, in one atomic call.

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
     so the application and its evidence can never land apart. FacultySignup
     assembles that payload; this only forwards it. */
  const applyAcademy = async (faculty_profile) => {
    await apply("academy", { faculty_profile });
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
        <Suspense fallback={<p className="af-sub">Loading the application form…</p>}>
          <FacultySignup
            embedded
            presetEmail={user?.email || ""}
            /* This account already exists and already accepted the terms when
               it was created — re-asking would imply it hadn't. */
            requireTerms={false}
            /* No email to verify: the caller is signed in. We show our own
               confirmation via `done` instead of the form's Verify card. */
            showVerifyOnSuccess={false}
            requireDocuments
            submitLabel="Send application"
            onBack={() => { setDocStep(false); setError(""); }}
            onSubmitProfile={applyAcademy}
          />
        </Suspense>
      )}

      <FooterLink>Not now? <Link to="/">Back to ShikshaCom</Link></FooterLink>
    </AuthShell>
  );
}
