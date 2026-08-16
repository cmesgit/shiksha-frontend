/**
 * FILE: src/hooks/useRemainingTime.js  (NEW — design_handoff_live_sessions phase 4)
 *
 * Ticks the room's remaining time from the server's cap_ends_at. Returns null
 * for anyone unlimited (host, teacher, enrolled, subscribed, launch-free mode)
 * — null means "show no countdown and never show the upsell".
 *
 * The server stays authoritative: pass a fresh capEndsAt after every
 * session_extended socket event or reconnect (GroupSessionClassroomUI does
 * both — see its `liveCapEndsAt` state).
 *
 * Adapted from the handoff's reference hook
 * (design_handoff_live_sessions/frontend/src/hooks/useRemainingTime.js) with
 * one addition: `opts.ignoreEntitlement`. The real join/preflight response
 * (sessions_app/group_session_views.py) puts `cap_ends_at` at the ROOM level
 * (when the whole room's hard cutoff lands) — it is the same value for every
 * participant, host included. `entitlement.unlimited` is true for the host,
 * so the reference hook's gating would always return null for them. That's
 * correct for the everyone-sees-this RemainingTimePill (a host is never
 * personally capped, so no countdown chip for them) but wrong for
 * HostControlsPanel's time ring, which must show the room's cap regardless
 * of the viewer's own entitlement. `ignoreEntitlement: true` skips the gate
 * for that one host-only caller.
 */
import { useEffect, useState } from "react";

// `ms` is only ever set from INSIDE the interval callback below — never
// synchronously in the effect body, and `Date.now()` is only ever read
// there too, never during render. Both were deliberate rewrites: an earlier
// version called `Date.now()` directly in the render path (flagged by
// eslint-plugin-react-hooks' purity rule — components/hooks must be
// idempotent) and, before that, called `setMs()` synchronously inside the
// effect body to reset state on every capEndsAt/unlimited change (flagged by
// the same plugin's set-state-in-effect rule). Tying both the clock read and
// the state write to the same once-a-second interval callback satisfies
// both rules at once, at the cost of a harmless up-to-1s delay before the
// very first tick renders (irrelevant for a display-only countdown).
export function useRemainingTime(capEndsAt, entitlement, opts = {}) {
  const { ignoreEntitlement = false } = opts;
  const unlimited = !ignoreEntitlement && (!entitlement || entitlement.unlimited);
  const active = !unlimited && !!capEndsAt;
  const [ms, setMs] = useState(null);

  useEffect(() => {
    if (!active) {
      return undefined;
    }
    const id = setInterval(() => {
      setMs(Math.max(0, new Date(capEndsAt).getTime() - Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, [capEndsAt, active]);

  // No separate "reset ms to null when inactive" effect needed — the
  // return below already masks the stale `ms` value once inactive, so
  // there's nothing to synchronously reset from an effect body.
  return active ? ms : null;
}

export function formatClock(ms) {
  if (ms == null) return "";
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
}

export default useRemainingTime;
