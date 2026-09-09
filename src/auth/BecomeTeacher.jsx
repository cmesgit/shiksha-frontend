import { useEffect, useState, lazy, Suspense } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AuthShell, StatusChip, FooterLink } from "./AuthKit";
import api from "../api/apiClient";
import { TEACHER_ACADEMY_URL, TEACHER_SKILL_URL, TEACHER_SKILL_PROFILE_URL } from "../config/urls";

/* Lazy, like every other route-sized component in this app: the faculty form
   is ~35 kB of chunk that a Skill Dev applicant never needs. */
const FacultySignup = lazy(() => import("../components/FacultySignup"));
/* Same reasoning as FacultySignup above — an Academy applicant never renders
   the expert form, so it does not belong in this route's main chunk. */
const ExpertDetails = lazy(() => import("./ExpertDetails"));

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

   AND THE SKILL SIDE HAD THE MIRROR PROBLEM, 2026-09-09.
   ──────────────────────────────────────────────────────
   "Skill listing details are completed on the expert dashboard" (above) is
   half true and was read as fully true. The EDITOR exists and covers every
   field — ExpertProfileEdit.jsx at /teacher/expert/profile. The HANDOFF did
   not: this screen linked to TEACHER_SKILL_URL, the dashboard ROOT, and
   ExpertDashboard.jsx never surfaced completeness at all (nothing in that app
   read `missing`). So one click produced an expert with a blank
   ExpertProfile, an unlisted listing — refresh_listing only flips is_listed
   once completeness() passes — and no indication of either.

   Worse under account-first registration: the personal half of completeness
   (name, DOB, phone, photo) is read from the SELF learner profile, and
   /register collects only email + password + terms. A brand-new account
   therefore starts out missing its own NAME.

   Fixed by routing and naming, not by rebuilding: the confirmation now links
   to the editor and lists what is missing, read from
   GET /skill/teacher/profile/ which has always returned `missing`.

   …AND NAMING THE GAP TURNED OUT NOT TO BE ENOUGH, 2026-09-09.
   ────────────────────────────────────────────────────────────
   "The one-click design is deliberate and is kept — a marketplace listing
   needs no review — so nothing new is COLLECTED here" is what this docstring
   said, and the conclusion does not follow from the premise. No review means
   nobody has to APPROVE the expert; it does not mean the product knows who
   they are. Driven for real on a local stack: register → click "Start
   teaching on Skill Dev" → "7 things left before learners can find you", with
   `is_listed` False. One click bought a listing nobody can find.

   So the Skill card now opens ExpertDetails first, exactly as the Academy
   card opens FacultySignup — and for the same reason, at the same seam: after
   the decision, before the submission. The friction rule the original
   decision was protecting is intact, because nothing is asked until they have
   clicked. The form is also SKIPPABLE, so the true one-click path still
   exists for anyone who wants it; it is now a choice rather than the only
   option. See ExpertDetails.jsx for why the photo is the one gap it leaves.

   ?track= WAS BEING DROPPED ON THE FLOOR, 2026-09-09.
   ───────────────────────────────────────────────────
   Four call sites have been sending one for months — SkillBrowsePage's teach
   banner, /expert-apply, FacultyIntro's apply button, and signupAddTrackUrl()
   in config/urls.js, which SettingsModal and ProfilePicker both use. This
   screen never read it. So someone who clicked "I want to teach my craft" —
   having answered the question as specifically as the product allows — landed
   on a two-card chooser asking them the same question again.

   Now an explicit ?track= opens that track directly. It is a PREFERENCE, not
   a command: a track that the account already holds, or that it cannot add,
   falls back to the full chooser rather than showing a dead end, and the
   other track stays one click away. That keeps the deep link honest without
   letting a stale bookmark strand anyone.
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

/* The `missing` keys GET /skill/teacher/profile/ returns, in learner-facing
   words. Mirrors skills/profile_ops.py's expert_missing + personal_missing —
   that is the ENTIRE set (9 keys), and note hourly_rate is deliberately NOT
   among them: "booking is free at launch", per the comment in expert_missing.
   An unknown key falls back to its own name rather than being dropped, so a
   field added server-side still shows up here instead of silently going
   uncounted. */
const MISSING_LABELS = {
  subject_description: "What you teach — pick a subject or describe it",
  languages:           "The languages you teach in",
  bio:                 "A short introduction learners will read",
  class_mode:          "Whether you teach online, at home, or travel",
  class_location:      "Where your in-person classes happen",
  full_name:           "Your name",
  date_of_birth:       "Your date of birth",
  phone:               "A phone number",
  profile_photo:       "A profile photo",
};

const TRACKS = ["skill", "academy"];

export default function BecomeTeacher() {
  const { user, getTeacherIdentity, addTeacherIdentity } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  // Normalised here so a stray "?track=SKILL" or "?track=faculty" doesn't
  // silently mean "show the chooser" for reasons nobody can see.
  const rawTrack = (params.get("track") || "").trim().toLowerCase();
  const wantedTrack = TRACKS.includes(rawTrack) ? rawTrack : null;

  const [report, setReport] = useState(null);
  const [error, setError]   = useState("");
  const [busy, setBusy]     = useState("");
  const [done, setDone]     = useState(null);

  // Academy only: the application form, opened by the apply button rather than
  // shown up front. FacultySignup owns every field and its validation.
  const [docStep, setDocStep] = useState(false);
  // Skill's equivalent: the profile form, opened by its own apply button.
  const [skillStep, setSkillStep] = useState(false);
  // null = not known / not applicable; [] = complete. Only ever set for skill.
  const [missing, setMissing] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getTeacherIdentity()
      .then((r) => { if (!cancelled) setReport(r); })
      .catch((err) => { if (!cancelled) setError(err?.message || "Couldn’t load your account."); });
    return () => { cancelled = true; };
    // getTeacherIdentity is stable for the life of the provider.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Both cards now open a form rather than firing immediately: Academy needs
  // an application an admin can act on, Skill needs a profile learners can
  // find. Neither asks for anything before the person has chosen a track.
  const onCardClick = (track) => {
    setError("");
    if (track === "academy") { setDocStep(true); return; }
    setSkillStep(true);
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

  /* The expert profile rides WITH the track, for the same reason the faculty
     documents do: `_provision_expert` applies it inside the same transaction
     that adds the track, then calls `refresh_listing()`. Split into two calls
     the listing would be created unlisted and only go live on a second
     request that might never happen — which is the bug being fixed. */
  const applySkill = async (expert_profile) => {
    await apply("skill", { expert_profile });
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

      /* Skill only, and best-effort. The track is already added at this
         point, so a failure here must not turn a successful setup into an
         error screen — the confirmation just falls back to its generic copy.
         TeacherProfileUpdateView is [IsAuthenticated] with no teacher-context
         gate, so this is callable from here, and _get_expert auto-provisions
         the blank ExpertProfile for anyone holding the skill track. */
      if (track === "skill") {
        try {
          const { data } = await api.get("/skill/teacher/profile/");
          if (!data?.is_complete) setMissing(data?.missing || []);
        } catch { /* leave `missing` null → generic copy */ }
      }
    } catch (err) {
      setError(err?.message || "Couldn’t set that up. Please try again.");
    } finally {
      setBusy("");
    }
  };

  /* ── Confirmation ── */
  if (done) {
    const reviewing = done.needsReview;
    const isSkill   = done.track === "skill";
    // Only meaningful for skill: an academy applicant is not listed anywhere
    // until an admin approves them, so completeness is not their next step.
    const gaps      = isSkill ? (missing || []) : [];
    return (
      <AuthShell role={reviewing ? "neutral" : "success"} flowLabel="Teaching" brandIcon="spark">
        <StatusChip icon={reviewing ? "mail" : "check"} role={reviewing ? "neutral" : "success"} />
        <h1 className="af-heading">
          {reviewing ? "Application received" : "You’re set up to teach"}
        </h1>
        <p className="af-sub">
          {reviewing
            ? "Our team will review your application. You’ll hear from us by email — and you can keep using your account for learning in the meantime."
            : gaps.length
              ? "Your Skill Dev teaching is active — but your listing stays hidden from learners until your profile is complete."
              : "Your Skill Dev teaching is active, and your profile is complete."}
        </p>

        {/* Naming the gaps is the whole point. The one-click design is
            deliberate (a marketplace listing needs no review), but it created
            an expert with a blank profile and an unlisted listing who was told
            nothing — the dashboard has never surfaced `missing` either. */}
        {gaps.length > 0 && (
          <div className="bt-gaps">
            <p className="bt-gaps__title">
              {gaps.length} {gaps.length === 1 ? "thing" : "things"} left before learners can find you
            </p>
            <ul className="bt-gaps__list">
              {gaps.map((key) => (
                <li key={key}>{MISSING_LABELS[key] || key.replace(/_/g, " ")}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="af-spacer" />
        <div className="af-actions">
          {!reviewing && (
            <a href={isSkill ? TEACHER_SKILL_PROFILE_URL : TEACHER_ACADEMY_URL}
               className="af-btn af-btn--block"
               style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {isSkill && gaps.length ? "Complete your profile" : "Go to your teaching dashboard"}
            </a>
          )}
          {isSkill && gaps.length > 0 && (
            <a href={TEACHER_SKILL_URL}
               className="af-btn af-btn--ghost af-btn--block"
               style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
              Skip for now — go to the dashboard
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
  const offered = TRACKS.filter((t) => canAdd[t]);
  const held    = TRACKS.filter((t) => !canAdd[t] && tracks[t] && tracks[t] !== "locked");

  /* An explicit ?track= narrows the page to that one card — but only when the
     account can actually add it. Asking for a track that is already held (or
     blocked) falls back to the chooser, where `held` above explains the real
     status, rather than rendering a lone card that cannot be acted on. */
  const focused = wantedTrack && offered.includes(wantedTrack) ? wantedTrack : null;
  const shown   = focused ? [focused] : offered;
  const other   = focused ? offered.find((t) => t !== focused) : null;

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
        shown.map((t) => {
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
              {!(t === "academy" && docStep) && !(t === "skill" && skillStep) && (
                <button
                  className="af-btn af-btn--block"
                  disabled={!!busy}
                  onClick={() => onCardClick(t)}
                >
                  {busy === t ? "Setting up…" : c.cta}
                </button>
              )}
              {t === "skill" && skillStep && (
                <Suspense fallback={<p className="af-sub">Loading…</p>}>
                  <ExpertDetails
                    busy={busy === "skill"}
                    onSubmit={applySkill}
                    /* Skipping is the ORIGINAL one-click behaviour, unchanged:
                       add the track with no payload. The confirmation then
                       lists the gaps, as it already did. */
                    onSkip={() => apply("skill")}
                    onBack={() => { setSkillStep(false); setError(""); }}
                  />
                </Suspense>
              )}
            </section>
          );
        })
      )}

      {/* Narrowing to one track must never look like the other one is gone.
          Hidden behind the academy form because a half-filled application is
          not something to offer a "switch tracks" link next to. */}
      {other && !docStep && !skillStep && (
        <p className="af-sub" style={{ marginTop: 4, fontSize: 13 }}>
          Looking for something else?{" "}
          <Link to={`/become-a-teacher?track=${other}`}>{TRACK_COPY[other].title}</Link>
        </p>
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
