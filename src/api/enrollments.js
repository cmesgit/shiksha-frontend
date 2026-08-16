import api from "./apiClient";

export const getCoursePublic = (courseId) =>
  api.get(`/courses/${courseId}/public/`).then((r) => r.data);

export const submitEnrollmentRequest = (formData) =>
  api.post("/enrollments/requests/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then((r) => r.data);

export const getMyEnrollmentRequests = () =>
  api.get("/enrollments/requests/mine/").then((r) => r.data);

// --- Pluggable payment mode (free / manual_upi / razorpay) ---

/**
 * Active payment mode, set by the admin in GlobalSettings (no restart).
 * Shape: { provider, label, is_free, auto_activate, requires_manual_proof,
 *          collects_money }
 * Falls back to "free" if the endpoint is unavailable so the UI never hard-fails.
 */
export const getPaymentConfig = () =>
  api
    .get("/enrollments/payment-config/")
    .then((r) => r.data)
    .catch(() => ({
      provider: "free",
      label: "Free (no payment)",
      is_free: true,
      auto_activate: true,
      requires_manual_proof: false,
      collects_money: false,
    }));

/**
 * One-tap enrollment while the platform is free. The backend only honours this
 * when the active provider auto-activates (i.e. free mode), so flipping to a
 * paid mode closes this door automatically. `batchId` is optional — omit for
 * courses with no batches configured.
 * Returns: { detail, course_id, batch: {id, name} | null, subscription: { id, status, expires_at } }
 */
// `activeProfileId` is optional (from useAuth()'s `activeProfile?.id`) — when
// passed, the backend cross-checks it against its own active-profile claim
// and rejects with a clear "profile changed" error if a different tab
// switched profiles in between, instead of silently enrolling the wrong one.
export const freeEnroll = (courseId, batchId, activeProfileId) =>
  api.post("/enrollments/free-enroll/", {
    course: courseId,
    ...(batchId ? { batch: batchId } : {}),
    ...(activeProfileId ? { active_profile_id: activeProfileId } : {}),
  }).then((r) => r.data);

/**
 * Student picks their own batch after the fact — e.g. enrolled before the
 * course had batches, or skipped the picker at enroll time. Only works while
 * the enrollment's batch is still unset; once assigned, changing it is an
 * admin action.
 */
export const selectEnrollmentBatch = (courseId, batchId, activeProfileId) =>
  api.post("/enrollments/select-batch/", {
    course: courseId,
    batch: batchId,
    ...(activeProfileId ? { active_profile_id: activeProfileId } : {}),
  }).then((r) => r.data);
