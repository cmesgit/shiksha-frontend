// PLACEMENT: src/api/coursesApi.js
//
// Client for the real (backend-driven) anonymous course catalog —
// /api/courses/public/*. Every helper degrades gracefully (resolves to
// [] / null on failure), matching contentApi.js's convention, so the page
// can show an empty/locked state instead of crashing if the API is down.

import api from "./apiClient";

export async function getPublicBoards() {
  try {
    const { data } = await api.get("/courses/public/boards/");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getPublicCatalog(boardId) {
  if (!boardId) return [];
  try {
    const { data } = await api.get("/courses/public/catalog/", { params: { board: boardId } });
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getPublicCourseDetail(courseId) {
  if (!courseId) return null;
  try {
    const { data } = await api.get(`/courses/public/${courseId}/`);
    return data;
  } catch {
    return null;
  }
}

export async function getPublicCourseBySlug(slug) {
  if (!slug) return null;
  try {
    const { data } = await api.get(`/courses/public/by-slug/${encodeURIComponent(slug)}/`);
    return data;
  } catch {
    return null;
  }
}

/**
 * The learner's real, currently-active enrollments — /courses/my/. This is
 * the only source that reflects a free-enroll (FreeEnrollView writes an
 * Enrollment row directly, never an EnrollmentRequest), so anything that
 * needs to know "is this course actually unlocked for me" must check this,
 * not just enrollments.js's getMyEnrollmentRequests (that endpoint only
 * tracks the manual-UPI review queue).
 */
export async function getMyEnrolledCourses() {
  try {
    const { data } = await api.get("/courses/my/");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/**
 * "Notify me when {board} launches" lead capture on a locked board chip.
 * Unlike the read-only getters above, the caller needs to know whether the
 * submit actually failed (rate-limited, bad email, etc.), so this resolves
 * to {ok, error} instead of swallowing every error into a fallback value.
 */
export async function submitBoardNotify(boardId, email) {
  if (!boardId || !email) return { ok: false, error: "Missing board or email." };
  try {
    await api.post(`/courses/public/boards/${boardId}/notify/`, { email });
    return { ok: true };
  } catch (e) {
    const detail = e?.response?.data?.detail;
    return { ok: false, error: detail || "Something went wrong. Please try again." };
  }
}

/**
 * "Notify me when {course} launches" lead capture on a coming-soon course
 * card/quick-view — same shape and failure handling as submitBoardNotify.
 */
export async function submitCourseNotify(courseId, email) {
  if (!courseId || !email) return { ok: false, error: "Missing course or email." };
  try {
    await api.post(`/courses/public/${courseId}/notify/`, { email });
    return { ok: true };
  } catch (e) {
    const detail = e?.response?.data?.detail;
    return { ok: false, error: detail || "Something went wrong. Please try again." };
  }
}

/**
 * The homepage "Featured courses" grid — /courses/public/featured/. Replaces
 * the old /content/showcase/ + toShowcaseCard for this section: price/thumbnail
 * here are already derived server-side from the linked Course/Board, so this
 * mapper trusts them directly instead of re-deriving a "soon" heuristic.
 */
export async function getPublicFeatured() {
  try {
    const { data } = await api.get("/courses/public/featured/");
    return Array.isArray(data?.cards) ? data.cards : [];
  } catch {
    return [];
  }
}

export const toFeaturedCard = (c) => ({
  cats: Array.isArray(c.categories) ? c.categories : [],
  lvl: c.level_label,
  ribbon: c.ribbon || null,
  title: c.title,
  fact: c.fact_line,
  // A course linked to a free card sends the literal "Free" rather than a
  // formatted amount, so the card can say so instead of rendering "₹0".
  free: c.price_label === "Free",
  price: c.price_label ? c.price_label.replace(/^₹/, "").replace(/\/month$/, "") : undefined,
  tutor: c.tutor_name || undefined,
  explore: !!c.is_explore_card,
  soon: !!c.is_coming_soon,
  grad: c.gradient_css,
  img: c.thumbnail || "",
  icon: c.icon,
  to: c.link_path || undefined,
  state:
    c.link_state && Object.keys(c.link_state).length ? c.link_state : undefined,
  courseId: c.course_id || undefined,
  // Absent on cache entries written before the backend started sending it, so
  // every consumer has to cope with it being undefined.
  courseSlug: c.course_slug || undefined,
});

/**
 * The Courses navbar mega-menu — /courses/public/nav-menu/. Only covers the
 * "School Education" and "Competitive Exams" columns (both catalog-derived);
 * "Skill & Career" has no course-catalog backing and stays fully static.
 */
export async function getPublicNavMenu() {
  try {
    const { data } = await api.get("/courses/public/nav-menu/");
    return Array.isArray(data?.categories) ? data.categories : [];
  } catch {
    return [];
  }
}
