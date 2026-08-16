/**
 * FILE: src/api/liveSessionService.js
 *
 * Live-session extras: lobby preflight, host extend, session files, and the
 * teacher→student remote-control handshake. Group-session CRUD (create,
 * join, join-by-code, my-join-status, join-requests, etc.) stays in
 * groupSessionService.js — this file only wraps the endpoints that are new
 * for design_handoff_live_sessions.
 *
 * Adapted from 03-FRONTEND.md's reference code to this repo's real routes
 * (verified against sessions_app/urls.py + group_session_views.py /
 * live_files_views.py / remote_control_views.py directly, not the handoff
 * doc's assumed shape):
 *   - preflight/extend/files/remote-control paths match the reference
 *     exactly.
 *   - `myJoinStatus` was dropped from the reference code — GET
 *     .../my-join-status/ is already wrapped as `getJoinStatus` in
 *     groupSessionService.js (it predates this phase; GroupSessionLive.jsx
 *     already polls it for the knock-to-join flow). Wrapping the same
 *     endpoint twice under two different names would just invite the two
 *     call sites to drift — use groupSessionService.getJoinStatus instead.
 */
import api from "./apiClient";

const base = (id) => `/sessions/group-sessions/${id}`;

export const liveSessionService = {
  // ── lobby ──────────────────────────────────────────────────────────
  // GET .../preflight/ → { session, host, entitlement, limits, admit_mode,
  // can_host, is_enrolled, cap_ends_at } — see
  // sessions_app/group_session_views.py::group_session_preflight for the
  // exact real shape (the handoff doc's `require_approval` boolean does not
  // exist; the real field is `admit_mode` — "open" | "lobby").
  async preflight(sessionId) {
    const res = await api.get(`${base(sessionId)}/preflight/`);
    return res.data;
  },

  // ── host ───────────────────────────────────────────────────────────
  // POST .../extend/ {minutes} → { cap_ends_at, extensions_used,
  // extensions_allowed }. `minutes` is accepted but the real view actually
  // ignores the value and re-derives the new cap from
  // live_rules.cap_ends_at() bounded by live_host_extension_minutes — kept
  // in the call signature so a future server change that does honour it
  // doesn't need a frontend change too.
  async extend(sessionId, minutes) {
    const res = await api.post(`${base(sessionId)}/extend/`, { minutes });
    return res.data;
  },

  // ── files ──────────────────────────────────────────────────────────
  async listFiles(sessionId) {
    const res = await api.get(`${base(sessionId)}/files/`);
    return res.data;
  },
  uploadFile(sessionId, file, onProgress) {
    const body = new FormData();
    body.append("file", file);
    return api.post(`${base(sessionId)}/files/`, body, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) =>
        onProgress?.(Math.round((e.loaded / (e.total || 1)) * 100)),
    });
  },
  deleteFile(sessionId, fileId) {
    return api.delete(`${base(sessionId)}/files/${fileId}/`);
  },

  // ── post-session summary + review (design screen 09, Phase 5) ───────
  // GET .../summary/ → { session, you_attended_seconds, participants,
  // participants_count, files, files_count, remote_assist_count, my_note,
  // chat_path, my_review }. Neither this nor the review endpoint below
  // existed before Phase 5 — 01-FLOW.md assumed both already existed
  // ("the existing SessionReview endpoint"), but the only real
  // `SessionReview` model belongs to the unrelated `livestream` app. Both
  // were added additively in shiksha-backend for this phase — see
  // sessions_app/group_session_views.py::group_session_summary /
  // submit_group_session_review for the real shape.
  async summary(sessionId) {
    const res = await api.get(`${base(sessionId)}/summary/`);
    return res.data;
  },
  async submitReview(sessionId, { rating, description = "" }) {
    const res = await api.post(`${base(sessionId)}/review/`, { rating, description });
    return res.data;
  },

  // ── remote control (teacher → student) ─────────────────────────────
  requestControl(sessionId, targetUserId) {
    return api.post(`${base(sessionId)}/remote-control/request/`, {
      target_user_id: targetUserId,
    });
  },
  respondControl(sessionId, grantId, allow) {
    return api.post(`${base(sessionId)}/remote-control/respond/`, {
      grant_id: grantId,
      allow,
    });
  },
  revokeControl(sessionId, grantId) {
    return api.post(`${base(sessionId)}/remote-control/revoke/`, {
      grant_id: grantId,
    });
  },
};

export default liveSessionService;
