// PLACEMENT: src/api/counselling.js   (NEW FILE — landing/frontend app)
//
// Client for the counseling backend (mounted at /api/counseling/ —
// note the backend app uses the US spelling in its URL prefix while
// the frontend routes use /counselling per the site's convention).

import api from "./apiClient";

// ── Public directory ────────────────────────────────────────────
export async function getSpecializations() {
  return (await api.get("/counseling/specializations/")).data;
}

export async function getCounsellors(params = {}) {
  return (await api.get("/counseling/counselors/", { params })).data; // {results, count}
}

export async function getCounsellor(id) {
  return (await api.get(`/counseling/counselors/${id}/`)).data;
}

export async function getSlots(id, days = 14) {
  return (await api.get(`/counseling/counselors/${id}/slots/`, { params: { days } })).data;
  // {counselor_id, duration_minutes, slots: [iso...]}
}

// ── Student ─────────────────────────────────────────────────────
export async function getIntake(learnerProfileId) {
  const params = learnerProfileId ? { learner_profile_id: learnerProfileId } : {};
  return (await api.get("/counseling/intake/", { params })).data;
}

export async function saveIntake(payload, learnerProfileId) {
  const params = learnerProfileId ? { learner_profile_id: learnerProfileId } : {};
  return (await api.put("/counseling/intake/", payload, { params })).data;
}

export async function getMatches(learnerProfileId) {
  const params = learnerProfileId ? { learner_profile_id: learnerProfileId } : {};
  return (await api.get("/counseling/match/", { params })).data;
  // {results: [{counselor, match_score, reasons}], intake_complete, learner_profile_id}
}

export async function bookAppointment(payload) {
  // {counselor_id, learner_profile_id?, scheduled_at, student_note?}
  return (await api.post("/counseling/appointments/create/", payload)).data;
}

export async function getMyAppointments(params = {}) {
  return (await api.get("/counseling/appointments/", { params })).data;
}

export async function cancelAppointment(id, reason = "") {
  return (await api.post(`/counseling/appointments/${id}/cancel/`, { reason })).data;
}

export async function getAssessment(appointmentId) {
  return (await api.get(`/counseling/appointments/${appointmentId}/assessment/`)).data;
}

export async function saveAssessment(appointmentId, answers) {
  return (await api.put(`/counseling/appointments/${appointmentId}/assessment/`, { answers })).data;
}

export async function submitAssessment(appointmentId) {
  return (await api.post(`/counseling/appointments/${appointmentId}/assessment/submit/`)).data;
}

export async function getMyReports() {
  return (await api.get("/counseling/reports/")).data;
}
