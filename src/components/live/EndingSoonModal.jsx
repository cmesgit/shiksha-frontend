/**
 * FILE: src/components/live/EndingSoonModal.jsx  (NEW — design screens 08 + 13)
 *
 * ONE component, ONE `variant` prop — course room ("08") vs general/instant
 * room ("13"). Per 03-FRONTEND.md's own callout ("the part most likely to be
 * got wrong"): a course room offers "enrol in that course"; a general room
 * NEVER offers that (there is no course to enrol in) and instead offers
 * "host it yourself next time". Both offer the all-access subscription card.
 *
 * Mounted by GroupSessionClassroomUI.jsx when the room's own cap-based
 * countdown (useRemainingTime(capEndsAt, ...) — NOT the legacy
 * GUEST_TRIAL_MINUTES clock, see that file's own module note) crosses the
 * T-5:00 threshold. `urgent` flips true at T-0:60 (red/urgent style, per
 * 01-FLOW.md section C) — this component is purely presentational for that
 * transition; GroupSessionClassroomUI itself owns the single T-0
 * disconnect+navigate action (see its own effect, so there is exactly one
 * place that ever calls room.disconnect() for this countdown, not two).
 *
 * Copy/markup pixel-referenced from design-reference/Live Sessions.dc.html
 * data-screen-label="08" and "13". Real pricing isn't wired anywhere in this
 * codebase yet (no plans/pricing endpoint), so the two `{{ price }}`
 * placeholders in the reference are deliberately not invented here — the
 * buttons link to the real course/courses pages instead, same target the
 * pre-existing paywall screen in GroupSessionLive.jsx already uses
 * (ACADEMY_BROWSE_URL).
 */
import { Link } from "react-router-dom";
import { IcCheck } from "../home/HomeIcons";
import { formatClock } from "../../hooks/useRemainingTime";
import { ACADEMY_BROWSE_URL } from "../../config/urls";
import { useState } from "react";

const RING_R = 41;
const RING_C = 2 * Math.PI * RING_R;

function Bullet({ children, tone = "brand" }) {
  return (
    <div className="gs-eos-bullet">
      <IcCheck
        width={14}
        height={14}
        style={{ color: tone === "brand" ? "#0F9D6B" : "#5E7469", flex: "none", marginTop: 3 }}
      />
      <span>{children}</span>
    </div>
  );
}

export default function EndingSoonModal({
  variant = "general", // "course" | "general"
  session = null,
  remainingMs = null,
  urgent = false,
  limits = {},
  onDismiss,
}) {
  const [dismissed, setDismissed] = useState(false);

  // "Remind me later" can snooze the T-5:00 warning, but never the T-0:60
  // urgent state — computed at render time (no effect needed): once
  // `urgent` is true this always renders regardless of an earlier
  // dismissal, and the "Remind me later" button itself is only offered
  // below while !urgent, so there's no path to dismiss the urgent state.
  if (dismissed && !urgent) return null;

  const isCourse = variant === "course";
  const hostName = session?.hostName || "the host";
  const courseTitle = session?.courseTitle || "";
  const subjectName = session?.subjectName || "";
  const capMinutes = limits?.cap_minutes ?? 90;
  const retentionDays = limits?.file_retention_days ?? 2;

  const clock = remainingMs != null ? formatClock(remainingMs) : "—";
  const pct = remainingMs != null ? Math.min(1, Math.max(0, remainingMs / (5 * 60_000))) : 0;
  const dashoffset = RING_C * (1 - pct);
  const ringColor = urgent ? "#EF4444" : "#F59E0B";
  const ringTrack = urgent ? "#FEE2E2" : "#FDECD3";

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div className="gs-eos-overlay" role="dialog" aria-modal="true" aria-label="Session ending soon">
      <div className="gs-eos-scrim" />
      <div className={"gs-eos-card" + (urgent ? " gs-eos-card--urgent" : "")}>
        <div className="gs-eos-head">
          <div className="gs-eos-ring">
            <svg width="96" height="96" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r={RING_R} fill="none" stroke={ringTrack} strokeWidth="10" />
              <circle
                cx="48" cy="48" r={RING_R} fill="none" stroke={ringColor} strokeWidth="10"
                strokeLinecap="round" strokeDasharray={RING_C} strokeDashoffset={dashoffset}
                transform="rotate(-90 48 48)"
              />
            </svg>
            <div className="gs-eos-ring__label">
              <div className="gs-eos-ring__value" style={{ color: urgent ? "#7F1D1D" : "#0B2E20" }}>{clock}</div>
              <div className="gs-eos-ring__unit" style={{ color: urgent ? "#B91C1C" : "#92610A" }}>left</div>
            </div>
          </div>
          <div className="gs-eos-headline">
            <div className="gs-eos-eyebrow" style={{ color: urgent ? "#EF4444" : "#F59E0B" }}>
              {urgent ? "Leaving in less than a minute" : "Your free time is nearly up"}
            </div>
            <h3>{isCourse ? `Keep going with ${hostName}'s class` : "This room isn't tied to a course"}</h3>
            <p>
              {isCourse
                ? `Your free minutes in ${courseTitle || subjectName || "this class"} are running out. Enrol for unlimited time in every live session, or go all-access.`
                : "This is a free instant room — non-enrolled joiners get a short trial. Host your own room any time (hosts are never capped), or go all-access to remove the joiner cap everywhere."}
            </p>
          </div>
        </div>

        <div className="gs-eos-cards">
          {isCourse ? (
            <div className="gs-eos-card-left">
              <span className="gs-eos-badge">This class</span>
              <div className="gs-eos-card-title">{courseTitle || subjectName || "This course"}</div>
              <div className="gs-eos-card-sub">
                {[subjectName, hostName ? `Hosted by ${hostName}` : null].filter(Boolean).join(" · ")}
              </div>
              <div className="gs-eos-card-list">
                <Bullet>Unlimited time in every session of this course</Bullet>
                <Bullet>Notes and shared files kept with the course</Bullet>
                <Bullet>Assignments and quizzes for the chapter</Bullet>
              </div>
              <div className="gs-eos-card-cta">
                <span className="gs-eos-price">See pricing on the course page</span>
                {session?.courseId ? (
                  <Link to={`/enroll/${session.courseId}`} className="gs-eos-btn gs-eos-btn--primary">
                    Enrol now
                  </Link>
                ) : (
                  <a href={ACADEMY_BROWSE_URL} className="gs-eos-btn gs-eos-btn--primary">
                    Find the course
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="gs-eos-card-left">
              <span className="gs-eos-badge">No cap, no cost</span>
              <div className="gs-eos-card-title">Host it yourself next time</div>
              <div className="gs-eos-card-sub">
                The host clock is never limited — only the {capMinutes}-minute platform cap applies.
              </div>
              <div className="gs-eos-card-list">
                <Bullet>Open a room from /live in one tap and share the code</Bullet>
                <Bullet>Same chat, notes and file sharing, kept {retentionDays} day{retentionDays === 1 ? "" : "s"}</Bullet>
                <Bullet>Works for meetings, interviews, mentoring, study groups</Bullet>
              </div>
              <div className="gs-eos-card-cta">
                <span className="gs-eos-price">Free for signed-in users</span>
                <Link to="/live" className="gs-eos-btn gs-eos-btn--primary">Host a room</Link>
              </div>
            </div>
          )}

          <div className="gs-eos-card-right">
            <div className="gs-eos-card-title">All-access subscription</div>
            <div className="gs-eos-card-sub">
              {isCourse
                ? "Every live session across your board and class"
                : "Removes the joiner cap in any room, course or not"}
            </div>
            <div className="gs-eos-card-list">
              {isCourse ? (
                <>
                  <Bullet tone="muted">No time caps in any room you join</Bullet>
                  <Bullet tone="muted">Host your own study groups with the full cap</Bullet>
                  <Bullet tone="muted">Counselling and skill sessions included</Bullet>
                </>
              ) : (
                <>
                  <Bullet tone="muted">Stay as long as the host's room runs</Bullet>
                  <Bullet tone="muted">Counselling and skill sessions included</Bullet>
                  <Bullet tone="muted">No daily minute budget</Bullet>
                </>
              )}
            </div>
            <div className="gs-eos-card-cta">
              <span className="gs-eos-price gs-eos-price--muted">All-access plan</span>
              <a href={ACADEMY_BROWSE_URL} className="gs-eos-btn gs-eos-btn--outline">See plans</a>
            </div>
          </div>
        </div>

        <div className="gs-eos-footer">
          <span>
            {isCourse
              ? "Stay in the room — you'll be moved out automatically when the timer ends."
              : "Studying for a board or exam? Enrolling in a course also lifts the cap — and adds classes, notes and quizzes."}
          </span>
          <span className="gs-eos-footer-links">
            {!urgent && (
              <button type="button" className="gs-eos-link" onClick={handleDismiss}>Remind me later</button>
            )}
            {isCourse ? (
              <span className="gs-eos-link gs-eos-link--accent">The host can also extend this session</span>
            ) : (
              <a href={ACADEMY_BROWSE_URL} className="gs-eos-link gs-eos-link--accent">Browse courses</a>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
