import api from "./apiClient";

/* ── small helper: never let a missing/optional endpoint crash a page ──
   Ported from Admin-dashboard's src/api/admin.js — same convention used
   throughout this file. */
const safe = async (fn, fallback) => {
  try { return await fn(); } catch { return fallback; }
};

/* ── Moderator Panel: Reported Content ── */
export const getReports        = async (params) =>
  safe(async () => (await api.get("/forum/mod/reports/", { params })).data, { results: [], count: 0 });
export const dismissReport     = async (id) => (await api.post(`/forum/mod/reports/${id}/dismiss/`, {})).data;
export const deleteReport      = async (id, note = "") => (await api.post(`/forum/mod/reports/${id}/delete/`, { note })).data;
export const warnReportTarget  = async (id, note = "") => (await api.post(`/forum/mod/reports/${id}/warn/`, { note })).data;
export const banReportTarget   = async (id, note = "") => (await api.post(`/forum/mod/reports/${id}/ban/`, { note })).data;
export const suspendReportTarget = async (id, duration_days, note = "") =>
  (await api.post(`/forum/mod/reports/${id}/suspend/`, { duration_days, note })).data;
export const lockReport        = async (id, note = "") => (await api.post(`/forum/mod/reports/${id}/lock/`, { note })).data;
export const unlockReport      = async (id, note = "") => (await api.post(`/forum/mod/reports/${id}/unlock/`, { note })).data;

/* ── Moderator Panel: Auto-Rejected Queue ── */
export const getAutoRejected        = async (params) =>
  safe(async () => (await api.get("/forum/mod/auto-rejected/", { params })).data, { results: [], count: 0 });
export const deleteAutoRejected     = async (id, note = "") =>
  (await api.post(`/forum/mod/auto-rejected/${id}/delete/`, { note })).data;
export const restoreAutoRejected    = async (id) =>
  (await api.post(`/forum/mod/auto-rejected/${id}/restore/`, {})).data;
export const banAutoRejectedAuthor  = async (id, note = "") =>
  (await api.post(`/forum/mod/auto-rejected/${id}/ban-author/`, { note })).data;

/* ── Moderator Panel: User Management ── */
export const getModUsers = async (params) =>
  safe(async () => (await api.get("/forum/mod/users/", { params })).data, { results: [], count: 0 });
export const warnModUser  = async (id, note = "") => (await api.post(`/forum/mod/users/${id}/warn/`, { note })).data;
export const banModUser   = async (id, note = "") => (await api.post(`/forum/mod/users/${id}/ban/`, { note })).data;
export const unbanModUser = async (id, note = "") => (await api.post(`/forum/mod/users/${id}/unban/`, { note })).data;
export const suspendModUser = async (id, duration_days, note = "") =>
  (await api.post(`/forum/mod/users/${id}/suspend/`, { duration_days, note })).data;

/* ── Moderator Panel: Analytics ──
   header_stats: { open_reports, high_priority, banned_users, actions_today } */
export const getModAnalytics = async () =>
  safe(async () => (await api.get("/forum/mod/analytics/")).data,
       { kpis: [], reports_by_reason: [], recent_actions: [], this_month: {},
         header_stats: { open_reports: 0, high_priority: 0, banned_users: 0, actions_today: 0 } });

/* ── Moderator Panel: All Threads (moderator-only, sees locked/removed too) ── */
export const getModThreads    = async (params) =>
  safe(async () => (await api.get("/forum/mod/threads/", { params })).data, { results: [], count: 0 });
export const lockThread       = async (id, note = "") => (await api.post(`/forum/mod/threads/${id}/lock/`, { note })).data;
export const unlockThread     = async (id, note = "") => (await api.post(`/forum/mod/threads/${id}/unlock/`, { note })).data;
export const deleteModThread  = async (id, note = "") => (await api.post(`/forum/mod/threads/${id}/delete/`, { note })).data;
export const restoreModThread = async (id, note = "") => (await api.post(`/forum/mod/threads/${id}/restore/`, { note })).data;

/* ── Moderator Panel: Activity Log ── */
export const getModLog = async (params) =>
  safe(async () => (await api.get("/forum/mod/log/", { params })).data, { results: [], count: 0 });
