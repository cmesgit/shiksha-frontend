// ─────────────────────────────────────────────────────────────────────────────
// src/explore/verificationApi.js
//
// Community verification of Explore uploads.
// Spec: shiksha-backend/docs/EXPLORE_VERIFICATION.md
//
// Every endpoint here 404s while GlobalSettings.explore_verification_enabled
// is off — deliberately, so an unreleased feature is not merely forbidden but
// absent. Callers must therefore treat a 404 as "the feature is off", not as
// an error worth showing, which is what `isOff()` below is for.
// ─────────────────────────────────────────────────────────────────────────────

import api from "../api/apiClient";
import { getPublicConfig } from "../api/publicConfig";

const BASE = "/explore/verification";

/* The flag comes from /api/public-config/ rather than from `feature_flags` on
   /accounts/me/. The Explore library is browsable by guests and the
   Verified/Unverified badge is on every card they see, so a flag that needs a
   login would be absent for most of the people the badge is for.

   It also keeps this module out of contexts/AuthContext.jsx, which is a
   GENERATED file — its canonical copy lives in shared/src and an edit here
   would be reverted by the next `node shared/sync.mjs`. */
export async function verificationEnabled() {
  const cfg = await getPublicConfig();
  return !!cfg.explore_verification_enabled;
}

/* A 404 from any of these means the gate is closed, not that something broke.
   Screens use this to render nothing rather than an error. */
export function isOff(err) {
  return err?.response?.status === 404;
}

export async function getOverview() {
  const { data } = await api.get(`${BASE}/`);
  return data;
}

export async function getQueue() {
  const { data } = await api.get(`${BASE}/queue/`);
  return data;
}

export async function getReviewTarget(id) {
  const { data } = await api.get(`${BASE}/sets/${id}/`);
  return data;
}

export async function submitReview(id, answers) {
  const { data } = await api.post(`${BASE}/sets/${id}/review/`, answers);
  return data;
}

/* Replaces a set's files and restarts its verification — the thing the
   "Upload a new version" button on a rejected set is supposed to do. It used
   to navigate to the generic upload form, which created a SECOND, SEPARATE
   document and left the rejected one frozen forever. */
export async function uploadNewVersion(id, files) {
  const form = new FormData();
  files.forEach((f) => form.append("files", f));
  const { data } = await api.post(`${BASE}/sets/${id}/version/`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function getNotifications() {
  const { data } = await api.get(`${BASE}/notifications/`);
  return data;
}

export async function markNotificationsRead() {
  const { data } = await api.post(`${BASE}/notifications/read/`, {});
  return data;
}

export async function requestSpecialization(subject, evidence = "") {
  const { data } = await api.post(`${BASE}/specializations/`, { subject, evidence });
  return data;
}

export async function removeSpecialization(id) {
  await api.delete(`${BASE}/specializations/${id}/`);
}

/* ── Admin ──────────────────────────────────────────────────────────────────
   Superuser or an active ADMIN role. NOT is_staff — content editors hold that
   for CMS work and must not also hold the switch that decides what the whole
   library counts as checked. A non-admin gets a 404 here, same as a closed
   gate, so the caller cannot tell the two apart and neither reveals anything. */

export async function getAdminSettings() {
  const { data } = await api.get(`${BASE}/admin/settings/`);
  return data;
}

export async function saveAdminSettings(patch) {
  const { data } = await api.patch(`${BASE}/admin/settings/`, patch);
  return data;
}

export async function getAdminReviewers() {
  const { data } = await api.get(`${BASE}/admin/reviewers/`);
  return data;
}

export async function reviewerAction(specId, action) {
  const { data } = await api.post(`${BASE}/admin/reviewers/${specId}/${action}/`, {});
  return data;
}

export async function getAttention() {
  const { data } = await api.get(`${BASE}/admin/attention/`);
  return data;
}

export async function attentionAction(docId, action, body = {}) {
  const { data } = await api.post(`${BASE}/admin/attention/${docId}/${action}/`, body);
  return data;
}

export async function getEligibleReviewers(docId) {
  const { data } = await api.get(`${BASE}/admin/sets/${docId}/reviewers/`);
  return data;
}
