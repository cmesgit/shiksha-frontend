/* skillApi.js — API seam for the Skill Development feature.
   ────────────────────────────────────────────────────────────────
   Every screen talks to the backend ONLY through these functions, so
   you have one place to wire real endpoints. Until the backend exists,
   each call resolves against a mock (USE_MOCK = true) so the whole UI
   is fully clickable today.

   When your Django endpoints are ready:
     1. set USE_MOCK = false (or remove the mock branch),
     2. confirm the paths below match your DRF routes,
     3. the components don't change at all.

   `api` is your existing axios client (src/api/apiClient.js) with
   baseURL = API_URL and withCredentials, including the 401-refresh
   interceptor — so these calls are already auth-aware. */
import api from "./apiClient";

const USE_MOCK = false;
const wait = (ms = 600) => new Promise(r => setTimeout(r, ms));

/* ── Teacher directory ────────────────────────────────────── */
export async function fetchTeachers(params = {}) {
  if (USE_MOCK) { await wait(200); const { TEACHERS } = await import("../components/skill/data"); return TEACHERS; }
  const { data } = await api.get("/skill/teachers/", { params });
  return data;
}

export async function fetchTeacher(id) {
  if (USE_MOCK) { await wait(150); const { TEACHERS } = await import("../components/skill/data"); return TEACHERS.find(t => t.id === id); }
  const { data } = await api.get(`/skill/teachers/${id}/`);
  return data;
}

/* ── Payment config ───────────────────────────────────────────
   GET /skill/payment-config/ → active payment mode + payee details.
   Booking / course-buy screens call this on load to decide between a
   one-tap free enroll, the UPI form, or a gateway button. The mode is
   set by the admin in GlobalSettings (no restart). */
export async function fetchSkillPaymentConfig() {
  if (USE_MOCK) {
    await wait(120);
    return {
      provider: "free", label: "Free (no payment)",
      requires_manual_proof: false, auto_activate: true,
      collects_money: false, is_free: true,
    };
  }
  const { data } = await api.get("/skill/payment-config/");
  return data;
}

/* ── Teacher profile: reviews + self-paced course ─────────────
   The wired "Teacher Profile final" screen reads through these. */

export async function fetchExpertReviews(expertId) {
  if (USE_MOCK) {
    await wait(150);
    const { REVIEWS, reviewCount } = await import("../components/skill/data");
    const list = (REVIEWS[expertId] || []).map(r => ({ rating: r.r, reviewer: r.n, body: r.t }));
    return { count: reviewCount[expertId] || list.length, reviews: list };
  }
  // GET /skill/teachers/<id>/reviews/  →  { count, reviews:[{id,rating,body,created_at,reviewer}] }
  const { data } = await api.get(`/skill/teachers/${expertId}/reviews/`);
  return {
    count: data.count,
    reviews: (data.reviews || []).map(r => ({ rating: r.rating, reviewer: r.reviewer, body: r.body })),
  };
}

/* Format seconds → "MM:SS" or "H:MM" for lecture rows. */
function clock(sec = 0) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
const CAP = s => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

/* Normalize a backend SkillCourseDetail payload into the exact shape the
   Profile JSX renders (matches data.js COURSES entries). */
export function normalizeCourse(api, { rating, ratingCount } = {}) {
  if (!api) return null;
  const sections = api.sections || [];
  const allLectures = sections.flatMap(s => s.lectures || []);
  const totalSec = allLectures.reduce((a, l) => a + (l.duration_sec || 0), 0);
  return {
    id: api.id,
    title: api.title,
    price: api.price_rupees != null ? api.price_rupees : Math.round((api.price || 0) / 100),
    old: null,                                   // backend has no list/strike price
    hours: Math.max(1, Math.round(totalSec / 3600)),
    lectures: api.lecture_count != null ? api.lecture_count : allLectures.length,
    level: CAP(api.level) || "All levels",
    students: api.students_count != null ? api.students_count : null,
    rating: rating != null ? rating : null,
    ratingCount: ratingCount != null ? ratingCount : null,
    updated: api.created_at ? new Date(api.created_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : null,
    learn: api.outcomes || [],
    curriculum: sections.map(s => ({
      t: s.title,
      l: (s.lectures || []).map(l => ({ n: l.title, d: clock(l.duration_sec), p: l.is_preview })),
    })),
  };
}

/* Fetch the expert's self-paced course (one per expert in this product).
   Mock returns the bundled COURSES[id]; real backend lists approved courses
   and matches the one whose teacher_id is this expert. */
export async function fetchExpertCourse(expertId, meta = {}) {
  if (USE_MOCK) {
    await wait(150);
    const { COURSES } = await import("../components/skill/data");
    return COURSES[expertId] || null;
  }
  const { data } = await api.get("/skill/courses/", { params: { teacher: expertId } });
  const list = Array.isArray(data) ? data : (data.results || []);
  const card = list.find(c => String(c.teacher_id) === String(expertId)) || list[0];
  if (!card) return null;
  const { data: detail } = await api.get(`/skill/courses/${card.id}/`);
  return normalizeCourse(detail, meta);
}

export async function enrollCourse(courseId) {
  if (USE_MOCK) { await wait(700); return { ok: true, enrollmentId: "mock-enr-1" }; }
  const { data } = await api.post(`/skill/courses/${courseId}/enroll/`, {});
  return data;
}

/* ── Messaging ────────────────────────────────────────────── */
export async function startConversation(expertId) {
  if (USE_MOCK) { await wait(200); return { id: "mock-conv-1", messages: [] }; }
  const { data } = await api.post("/skill/conversations/", { expert: expertId });
  return data;
}

export async function sendMessage(convId, body) {
  if (USE_MOCK) { await wait(300); return { ok: true }; }
  const { data } = await api.post(`/skill/conversations/${convId}/messages/`, { body });
  return data;
}

/* Convenience: open (or reuse) a thread and post the first message. */
export async function messageExpert(expertId, body) {
  const conv = await startConversation(expertId);
  if (body && body.trim()) await sendMessage(conv.id, body.trim());
  return conv;
}

/* ── Registration ─────────────────────────────────────────── */
export async function registerStudent(payload) {
  if (USE_MOCK) { await wait(); return { ok: true }; }
  // Adjust to your accounts flow; you may prefer useAuth().signup with role: "STUDENT".
  const { data } = await api.post("/skill/students/", payload);
  return data;
}

export async function registerTeacher(payload) {
  if (USE_MOCK) { await wait(); return { ok: true, applicationId: "mock-app-1" }; }
  // Creates a teacher APPLICATION (status: pending screening), not a live teacher.
  const { data } = await api.post("/skill/teacher-applications/", payload);
  return data;
}

/* ── Interview screening ──────────────────────────────────── */
export async function fetchInterviewSlots() {
  if (USE_MOCK) { await wait(150); return null; /* screens use built-in demo slots */ }
  const { data } = await api.get("/skill/interview-slots/");
  return data;
}

export async function scheduleInterview({ applicationId, slot }) {
  if (USE_MOCK) { await wait(); return { ok: true, slot }; }
  const { data } = await api.post(`/skill/teacher-applications/${applicationId}/schedule/`, { slot });
  return data;
}

export async function fetchReviewQueue() {
  if (USE_MOCK) { await wait(200); const { CANDIDATES } = await import("../components/skill/data"); return CANDIDATES; }
  const { data } = await api.get("/skill/admin/interview-queue/");
  return data;
}

export async function submitEvaluation({ candidateId, decision, tier, scores, feedback }) {
  if (USE_MOCK) { await wait(); return { ok: true }; }
  const { data } = await api.post(`/skill/admin/interviews/${candidateId}/evaluation/`, { decision, tier, scores, feedback });
  return data;
}

/* ── Sessions & payments ──────────────────────────────────── */
export async function requestSession(payload) {
  if (USE_MOCK) { await wait(); return { ok: true, sessionId: "mock-sess-1" }; }
  const { data } = await api.post("/skill/sessions/", payload);
  return data;
}

export async function payForSession({ teacherId, draft, method, amount }) {
  if (USE_MOCK) { await wait(900); return { ok: true, bookingId: "SHK-" + Math.floor(100000 + Math.random() * 900000) }; }
  // Wire your Razorpay order-create here, then verify the signature server-side.
  const { data } = await api.post("/skill/payments/create-order/", { teacherId, draft, method, amount });
  return data;
}

export default {
  fetchTeachers, fetchTeacher, fetchExpertReviews, fetchExpertCourse, normalizeCourse,
  registerStudent, registerTeacher,
  fetchInterviewSlots, scheduleInterview, fetchReviewQueue, submitEvaluation,
  requestSession, payForSession, enrollCourse,
  startConversation, sendMessage, messageExpert,
};
