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
  stars: c.stars,
  count: c.review_count,
  title: c.title,
  fact: c.fact_line,
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
