// Client for the Instant Scholarship module — /api/scholarship/*.
// Mirrors enrollments.js/coursesApi.js conventions: thin wrappers over the
// shared axios instance, letting callers handle errors (no swallow-to-[]
// here since most of these are mutating actions, not passive listings).
import api from "./apiClient";

// Safe-to-show subset of admin config (question count, duration, bands) —
// so the calculator/instructions/exam screens reflect real settings instead
// of hardcoded numbers that would silently drift from what an admin set.
export const getScholarshipConfig = () =>
  api
    .get("/scholarship/config/")
    .then((r) => r.data)
    .catch(() => ({
      enabled: true, question_count: 50, duration_minutes: 30, max_discount_pct: 50,
      bands: [], subjects: [], difficulty_split: { easy: 60, medium: 30, hard: 10 },
      verification_methods: { digilocker: true, aadhaar_otp: false, aadhaar_offline: true, manual: true },
    }));

export const startGuardianVerification = (method, extra = {}) => {
  if (method === "manual") {
    const formData = new FormData();
    formData.append("method", method);
    formData.append("manual_document", extra.manualDocument);
    return api
      .post("/scholarship/verification/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data);
  }
  if (method === "aadhaar_offline") {
    const formData = new FormData();
    formData.append("method", method);
    formData.append("ekyc_zip", extra.ekycZip);
    formData.append("share_code", extra.shareCode);
    return api
      .post("/scholarship/verification/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data);
  }
  return api.post("/scholarship/verification/", { method }).then((r) => r.data);
};

export const getGuardianVerificationStatus = () =>
  api
    .get("/scholarship/verification/status/")
    .then((r) => r.data)
    .catch((err) => (err.response?.status === 404 ? null : Promise.reject(err)));

export const checkEligibility = (courseId) =>
  api.post("/scholarship/eligibility/check/", { course_id: courseId }).then((r) => r.data);

export const startExam = (eligibilityRecordId, courseId, deviceFingerprint) =>
  api
    .post("/scholarship/exam/start/", {
      eligibility_record_id: eligibilityRecordId,
      course_id: courseId,
      device_fingerprint: deviceFingerprint || "",
    })
    .then((r) => r.data);

export const getExamSession = (sessionId) =>
  api.get(`/scholarship/exam/session/${sessionId}/`).then((r) => r.data);

// Resume banner: is there a still-live session for me? Null (not a throw)
// on 404 — that's the normal "no live session" case, not an error.
export const getCurrentExamSession = () =>
  api
    .get("/scholarship/exam/session/current/")
    .then((r) => r.data)
    .catch((err) => (err.response?.status === 404 ? null : Promise.reject(err)));

export const getExamQuestions = (sessionId) =>
  api.get(`/scholarship/exam/session/${sessionId}/questions/`).then((r) => r.data);

export const answerQuestion = (sessionId, questionId, selectedOptionIndex, timeSpentSeconds) =>
  api
    .patch(`/scholarship/exam/session/${sessionId}/questions/${questionId}/answer/`, {
      selected_option_index: selectedOptionIndex,
      time_spent_seconds: timeSpentSeconds || 0,
    })
    .then((r) => r.data);

export const clearAnswer = (sessionId, questionId) =>
  api.delete(`/scholarship/exam/session/${sessionId}/questions/${questionId}/answer/`).then((r) => r.data);

export const logCheatSignal = (sessionId, eventType, metadata) =>
  api
    .post(`/scholarship/exam/session/${sessionId}/cheat-signal/`, { event_type: eventType, metadata: metadata || {} })
    .catch(() => null); // fire-and-forget — never let telemetry break the exam

export const submitExam = (sessionId) =>
  api.post(`/scholarship/exam/session/${sessionId}/submit/`).then((r) => r.data);

export const getExamResult = (sessionId) =>
  api.get(`/scholarship/exam/session/${sessionId}/result/`).then((r) => r.data);

export const getMyAwards = () => api.get("/scholarship/awards/").then((r) => r.data);

export const getAward = (awardId) => api.get(`/scholarship/awards/${awardId}/`).then((r) => r.data);
