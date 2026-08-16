/**
 * FILE: src/components/live/HostControlsPanel.jsx  (NEW — design screen 07)
 *
 * Host-only modal (opened from GroupSessionControlBar's "Other" menu,
 * alongside the other host-only actions already there — Mute All, Lock
 * Session, End Session). design-reference/Live Sessions.dc.html's screen 07
 * lays this out as a wide two-column 1440px card, not the narrow 300px
 * right-sidebar shell the Files/Chat/People panels use — a modal overlay is
 * the closest fit in this codebase without inventing a new panel width.
 *
 * Real-vs-mockup reconciliation (read sessions_app/group_session_views.py
 * and live_rules.py directly before changing this file):
 *
 * 1. Extend is a SINGLE button, not "+15 min" / "+30 min" choices. The real
 *    `extend_group_session` view ignores the posted `minutes` value — it
 *    always adds exactly `GlobalSettings.live_host_extension_minutes` and
 *    re-derives the cap from live_rules.cap_ends_at() (see
 *    liveSessionService.js's own comment on `extend`). Rendering two
 *    buttons that both silently do the same thing would be misleading, so
 *    this shows one button labelled with the real configured length.
 *
 * 2. The "Rules for this room" list in the mockup shows 7 toggles. Only
 *    "Require approval to join" is backed by a real, room-scoped endpoint
 *    today (GroupSession.admit_mode via groupSessionService.setAdmitMode —
 *    reused here via the same onSetAdmitMode/admitMode props the control
 *    bar's own "Lock Session" and the People panel's own toggle already
 *    share, so there's a single source of truth, not three). "Chat",
 *    "Recording", and "Remote access" ARE real flags, but they are
 *    GlobalSettings platform-wide flags read once at join time
 *    (live_rules.features()) with no per-room PATCH endpoint — shown here
 *    as read-only status rows, not fake toggles. "Everyone joins muted" and
 *    "Participants may share screen" have no backing field or endpoint
 *    anywhere in sessions_app (confirmed in 02-BACKEND.md and the real
 *    views/models) — they are simply not rendered here rather than wired to
 *    nothing.
 *
 * 3. No "Save rules" button — every real toggle here (admit mode) already
 *    saves immediately on click, matching the existing Lock Session /
 *    People-panel pattern. A Save button would incorrectly imply a batch of
 *    unsaved changes that doesn't exist.
 *
 * 4. `extensionsUsed` is NOT returned by /join/ or /preflight/ — only by
 *    /extend/'s own response and the `session_extended` broadcast. So on a
 *    fresh mount this starts at 0 even if the host had already used an
 *    extension before a page refresh, until the next extend call or
 *    broadcast corrects it. Flagged rather than silently wrong — a backend
 *    fix (exposing it on join/preflight) is out of scope for this frontend
 *    phase.
 */
import { useState } from "react";

import liveSessionService from "../../api/liveSessionService";
import { formatClock, useRemainingTime } from "../../hooks/useRemainingTime";

const RING_R = 52;
const RING_C = 2 * Math.PI * RING_R;

function formatStarted(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
  } catch {
    return "—";
  }
}

function FeatureRow({ label, hint, on }) {
  return (
    <div className={"gs-hc-rule" + (on ? "" : " gs-hc-rule--off")}>
      <span className="gs-hc-rule__text">
        <strong>{label}</strong>
        <small>{hint}</small>
      </span>
      <span
        className={"gs-hc-toggle gs-hc-toggle--readonly" + (on ? " is-on" : "")}
        aria-hidden="true"
        title="Set platform-wide by the admin — change in Live Session Rules"
      >
        <span className="gs-hc-toggle__knob" />
      </span>
    </div>
  );
}

export default function HostControlsPanel({
  open,
  onClose,
  sessionId,
  session,
  limits,
  features,
  capEndsAt,
  extensionsUsed = 0,
  extensionsAllowed = 0,
  onExtended, // (payload) => void — parent updates capEndsAt/extensionsUsed
  admitMode = "open",
  onSetAdmitMode,
  onEndSession,
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [lockBusy, setLockBusy] = useState(false);

  // Ignores personal entitlement on purpose — this is the ROOM's cap, and
  // the host is always personally unlimited, so the gated hook would always
  // return null here. See the hook's own doc comment.
  const remainingMs = useRemainingTime(capEndsAt, null, { ignoreEntitlement: true });

  if (!open) return null;

  const capMinutes = limits?.cap_minutes ?? 90;
  const extensionMinutes = limits?.extension_minutes ?? 15;
  const scheduledMinutes = session?.durationMinutes || session?.duration_minutes || capMinutes;
  const exhausted = extensionsUsed >= extensionsAllowed;

  const pct = remainingMs != null ? Math.min(1, Math.max(0, remainingMs / (capMinutes * 60_000))) : 1;
  const dashoffset = RING_C * (1 - pct);

  const handleExtend = async () => {
    if (busy || exhausted || !sessionId) return;
    setBusy(true);
    setError("");
    try {
      const data = await liveSessionService.extend(sessionId, extensionMinutes);
      onExtended?.(data);
    } catch (err) {
      const code = err?.response?.data?.code;
      if (code === "extensions_exhausted") {
        setError("No extensions left for this session.");
      } else {
        setError(err?.response?.data?.detail || "Couldn't extend the session.");
      }
    } finally {
      setBusy(false);
    }
  };

  const toggleRequireApproval = async () => {
    if (lockBusy || !onSetAdmitMode) return;
    setLockBusy(true);
    try {
      await onSetAdmitMode(admitMode === "lobby" ? "open" : "lobby");
    } finally {
      setLockBusy(false);
    }
  };

  return (
    <div className="gs-hc-overlay" role="dialog" aria-modal="true" aria-label="Host controls">
      <div className="gs-hc-backdrop" onClick={onClose} />
      <div className="gs-hc-modal">
        <div className="gs-hc-modal__head">
          <h2>Host controls</h2>
          <button type="button" className="gs-hc-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="gs-hc-grid">
          <section className="gs-hc-card">
            <header className="gs-hc-card__head">Time</header>
            <div className="gs-hc-card__body">
              <div className="gs-hc-time-row">
                <div className="gs-hc-ring">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r={RING_R} fill="none" stroke="#D3E4E9" strokeWidth="12" />
                    <circle
                      cx="60" cy="60" r={RING_R} fill="none" stroke="var(--gs-primary)" strokeWidth="12"
                      strokeLinecap="round" strokeDasharray={RING_C} strokeDashoffset={dashoffset}
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div className="gs-hc-ring__label">
                    <div className="gs-hc-ring__value">
                      {remainingMs != null ? formatClock(remainingMs) : "—"}
                    </div>
                    <div className="gs-hc-ring__unit">remaining</div>
                  </div>
                </div>
                <div className="gs-hc-stats">
                  <div className="gs-hc-stat"><span>Started</span><strong>{formatStarted(session?.roomStartedAt || session?.room_started_at)}</strong></div>
                  <div className="gs-hc-stat"><span>Scheduled length</span><strong>{scheduledMinutes} min</strong></div>
                  <div className="gs-hc-stat"><span>Hard cap</span><strong>{capMinutes} min</strong></div>
                  <div className="gs-hc-stat"><span>Extensions used</span><strong>{extensionsUsed} of {extensionsAllowed}</strong></div>
                </div>
              </div>

              <button
                type="button"
                className="gs-hc-extend-btn"
                onClick={handleExtend}
                disabled={busy || exhausted}
              >
                {exhausted ? "No extensions left" : `Extend +${extensionMinutes} min`}
              </button>
              {error ? <p className="gs-hc-error">{error}</p> : null}

              <div className="gs-hc-note">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                <p>
                  You can extend up to the {capMinutes}-minute cap set by the admin
                  ({extensionsAllowed} extension{extensionsAllowed === 1 ? "" : "s"} of{" "}
                  {extensionMinutes} min each). Everyone sees the new time immediately.
                </p>
              </div>
            </div>
          </section>

          <section className="gs-hc-card">
            <header className="gs-hc-card__head">Rules for this room</header>
            <div className="gs-hc-card__body gs-hc-rules">
              <div className="gs-hc-rule">
                <span className="gs-hc-rule__text">
                  <strong>Require approval to join</strong>
                  <small>Requests land in the People panel</small>
                </span>
                <button
                  type="button"
                  className={"gs-hc-toggle" + (admitMode === "lobby" ? " is-on" : "")}
                  onClick={toggleRequireApproval}
                  disabled={lockBusy}
                  aria-pressed={admitMode === "lobby"}
                  aria-label="Require approval to join"
                >
                  <span className="gs-hc-toggle__knob" />
                </button>
              </div>

              <FeatureRow label="Chat" hint="Set platform-wide by the admin" on={!!features?.chat} />
              <FeatureRow label="Remote access (teacher → student)" hint="Each student approves every time" on={!!features?.remote_access} />
              <FeatureRow label="Recording" hint="Turned off platform-wide by the admin" on={!!features?.recording} />

              <div className="gs-hc-rules__footer">
                <button type="button" className="gs-hc-end-btn" onClick={onEndSession}>
                  End session for all
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
