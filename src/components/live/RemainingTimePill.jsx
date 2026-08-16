/**
 * FILE: src/components/live/RemainingTimePill.jsx  (NEW — design screen 05)
 *
 * Remaining-time pill, top-RIGHT of the stage (top-centre collides with the
 * host tile's badge, per design-reference/Live Sessions.dc.html
 * data-screen-label="05"). Shown to everyone; renders nothing when ms is
 * null (unlimited — host/teacher/enrolled/subscribed/launch-free). Turns
 * amber under 5 min and red under 1 min, matching the ending-soon
 * thresholds that GroupSessionLive/GroupSessionClassroomUI already compute
 * (T-5:00 warning, T-0:60 urgent — see 01-FLOW.md section C; the
 * EndingSoonModal that actually reacts to these thresholds is Phase 5, not
 * built here).
 *
 * The elapsed clock in GroupSessionControlBar (.gs-cb-timer) is unchanged —
 * this is the *remaining* half of the pair. `ms` is computed by the caller
 * via useRemainingTime(capEndsAt, entitlement) and passed in, matching the
 * reference implementation and 03-FRONTEND.md's wiring sample.
 */
import { formatClock } from "../../hooks/useRemainingTime";

export default function RemainingTimePill({ ms, recording, label }) {
  if (ms == null) return null;

  const urgent = ms <= 60_000;
  const warning = !urgent && ms <= 5 * 60_000;
  const dotClass = urgent
    ? "gs-pill-dot gs-pill-dot--danger"
    : warning
      ? "gs-pill-dot gs-pill-dot--warning"
      : "";

  return (
    <div className="gs-stage-pills">
      <span
        className={
          "gs-pill" +
          (urgent ? " gs-pill--danger" : warning ? " gs-pill--warning" : "")
        }
      >
        <span className={dotClass} />
        {formatClock(ms)} left
      </span>
      {label ? <span className="gs-pill gs-pill--muted">{label}</span> : null}
      <span className="gs-pill gs-pill--muted">
        Recording {recording ? "on" : "off"}
      </span>
    </div>
  );
}
