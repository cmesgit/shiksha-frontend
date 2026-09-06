import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AuthShell, StatusChip, FooterLink } from "./AuthKit";
import { TEACHER_ACADEMY_URL, TEACHER_SKILL_URL } from "../config/urls";

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
  const { getTeacherIdentity, addTeacherIdentity } = useAuth();
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [error, setError]   = useState("");
  const [busy, setBusy]     = useState("");
  const [done, setDone]     = useState(null);

  useEffect(() => {
    let cancelled = false;
    getTeacherIdentity()
      .then((r) => { if (!cancelled) setReport(r); })
      .catch((err) => { if (!cancelled) setError(err?.message || "Couldn’t load your account."); });
    return () => { cancelled = true; };
    // getTeacherIdentity is stable for the life of the provider.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const apply = async (track) => {
    setError(""); setBusy(track);
    try {
      const res = await addTeacherIdentity(track);
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
              <button
                className="af-btn af-btn--block"
                disabled={!!busy}
                onClick={() => apply(t)}
              >
                {busy === t ? "Setting up…" : c.cta}
              </button>
            </section>
          );
        })
      )}

      <FooterLink>Not now? <Link to="/">Back to ShikshaCom</Link></FooterLink>
    </AuthShell>
  );
}
