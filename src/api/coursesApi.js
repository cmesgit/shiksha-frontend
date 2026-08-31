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

/**
 * Public course catalog.
 *
 * Accepts either a bare board id (the original signature, still used by the
 * cross-board search) or an options object `{ board, group, kind }`.
 *
 * The bare-boardId form used to `return []` when the id was falsy, and that
 * early return is why competitive exams were invisible on /courses: they are
 * created with `board = NULL` (see create_competitive_courses.py), so a
 * board-scoped fetch excludes them by construction and the only query that
 * could reach them — a board-less one — was refused by the client before it
 * ever left the browser. The backend has accepted `?group=` and `?kind=`
 * since the endpoint was written; nothing sent them.
 *
 * The guard is kept for the boardId form ONLY, where "no board yet" really
 * does mean "nothing to ask for". A call carrying a group/kind is a
 * deliberate board-less query and is allowed through.
 */
export async function getPublicCatalog(boardIdOrOptions) {
  const opts =
    typeof boardIdOrOptions === "string" || boardIdOrOptions == null
      ? { board: boardIdOrOptions }
      : boardIdOrOptions;

  // `q` is a filter in its own right, so a q-only call is a deliberate
  // board-less query and passes the guard for the same reason group/kind do.
  // The backend has always accepted it (`title__icontains OR
  // description__icontains`) and nothing sent it — the catalog filtered
  // client-side on title+subtitle only, so a course findable by its
  // description was unfindable in the UI.
  const { board, group, kind, q } = opts;
  if (!board && !group && !kind && !q) return [];

  const params = {};
  if (board) params.board = board;
  if (group) params.group = group;
  if (kind) params.kind = kind;
  if (q) params.q = q;

  try {
    const { data } = await api.get("/courses/public/catalog/", { params });
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
/* Returns `{cards, tabs}` rather than a bare cards array: the filter tabs are
 * CMS rows now (content.ShowcaseCategory) and ship in this same payload, so the
 * grid and the tabs that filter it can never be a cache generation apart.
 *
 * `tabs` is [] on an old cached response written before the backend sent the
 * key, and on any failure — callers must fall back rather than render no tabs.
 */
export async function getPublicFeatured() {
  try {
    const { data } = await api.get("/courses/public/featured/");
    return {
      cards: Array.isArray(data?.cards) ? data.cards : [],
      tabs: Array.isArray(data?.tabs) ? data.tabs : [],
    };
  } catch {
    return { cards: [], tabs: [] };
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
  // The featured endpoint has always computed these two off the linked course
  // (courses/views.py) and this mapper silently dropped both, so a card
  // advertising "100% off / was ₹3,000" on /courses showed a bare price on the
  // homepage. Paise, like every other money field on the API — /courses formats
  // it the same way in usePublicCourses.js's formatFee.
  mrp: c.mrp != null ? Math.round(c.mrp / 100).toLocaleString("en-IN") : null,
  discountLabel: c.discount_label || "",
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
