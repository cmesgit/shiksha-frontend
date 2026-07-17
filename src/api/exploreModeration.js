import api from "./apiClient";

/* Explore-library moderation API — wrappers over /explore/mod/... (parallel to
   src/api/moderation.js, the forum moderation client). `safe` keeps an optional
   or not-yet-deployed endpoint from crashing a page: it returns the fallback
   instead of throwing. */
const safe = async (fn, fallback) => {
  try { return await fn(); } catch { return fallback; }
};

/* ── Reported Documents ── */
export const getReports        = async (params) =>
  safe(async () => (await api.get("/explore/mod/reports/", { params })).data, { results: [], count: 0 });
export const dismissReport     = async (id, note = "") => (await api.post(`/explore/mod/reports/${id}/dismiss/`, { note })).data;
export const removeReport      = async (id, note = "") => (await api.post(`/explore/mod/reports/${id}/remove/`, { note })).data;
export const warnReportTarget  = async (id, note = "") => (await api.post(`/explore/mod/reports/${id}/warn/`, { note })).data;
export const suspendReportTarget = async (id, duration_days, note = "") =>
  (await api.post(`/explore/mod/reports/${id}/suspend/`, { duration_days, note })).data;
export const banReportTarget   = async (id, note = "") => (await api.post(`/explore/mod/reports/${id}/ban/`, { note })).data;

/* ── Duplicate Review ── */
export const getDuplicates     = async (params) =>
  safe(async () => (await api.get("/explore/mod/duplicates/", { params })).data, { results: [], count: 0 });
export const confirmDuplicate  = async (id, note = "") => (await api.post(`/explore/mod/duplicates/${id}/confirm/`, { note })).data;
export const dismissDuplicate  = async (id, note = "") => (await api.post(`/explore/mod/duplicates/${id}/dismiss/`, { note })).data;

/* ── Uploader Management ── */
export const getUploaders      = async (params) =>
  safe(async () => (await api.get("/explore/mod/uploaders/", { params })).data, { results: [], count: 0 });
export const warnUploader      = async (id, note = "") => (await api.post(`/explore/mod/uploaders/${id}/warn/`, { note })).data;
export const suspendUploader   = async (id, duration_days, note = "") =>
  (await api.post(`/explore/mod/uploaders/${id}/suspend/`, { duration_days, note })).data;
export const banUploader       = async (id, note = "") => (await api.post(`/explore/mod/uploaders/${id}/ban/`, { note })).data;
export const unbanUploader     = async (id, note = "") => (await api.post(`/explore/mod/uploaders/${id}/unban/`, { note })).data;

/* ── Analytics ──
   header_stats: { reported_docs, high_priority, duplicate_uploads, banned_uploaders } */
export const getExploreAnalytics = async () =>
  safe(async () => (await api.get("/explore/mod/analytics/")).data,
       { kpis: [], reports_by_reason: [], recent_actions: [], this_month: {},
         header_stats: { reported_docs: 0, high_priority: 0, duplicate_uploads: 0, banned_uploaders: 0 } });

/* ── Activity Log ── */
export const getExploreModLog = async (params) =>
  safe(async () => (await api.get("/explore/mod/log/", { params })).data, { results: [], count: 0 });
