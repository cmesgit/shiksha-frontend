// PLACEMENT: src/api/contentApi.js   (NEW FILE — landing/frontend app)
//
// Client for the content CMS backend (mounted at /api/content/).
// Every helper degrades gracefully: on network/API failure the list
// helpers resolve to [] / null so pages can fall back to their local
// data instead of breaking. `getBlogPost` distinguishes a real 404
// (post not in CMS → caller falls back to the static fragment) from a
// transport error (caller may retry).

import api from "./apiClient";

/* ── Blogs ─────────────────────────────────────────────────────── */

// Normalize a CMS post to the card shape Blogs.jsx already renders
// (same fields as the legacy data/blogsData.js entries).
export const toBlogCard = (post) => ({
  id: `cms-${post.id}`,
  slug: post.slug,
  category: post.category || post.subject || "",
  classLevel: post.class_level,
  title: post.title,
  subtitle: post.excerpt || undefined,
  thumbnail: post.thumbnail || undefined,
  tags: post.tags || [],
  fromCms: true,
});

/**
 * Fetch every published CMS post (walks pagination, capped defensively).
 * Resolves to [] on any failure — callers merge with local data.
 */
export async function getAllBlogCards({ maxPages = 20 } = {}) {
  const cards = [];
  try {
    let url = "/content/blogs/?page_size=50";
    for (let i = 0; i < maxPages && url; i += 1) {
      const { data } = await api.get(url);
      (data.results || []).forEach((p) => cards.push(toBlogCard(p)));
      // DRF returns absolute `next` URLs; keep only path+query for the
      // axios instance (its baseURL already includes /api).
      url = data.next ? data.next.replace(/^.*\/api/, "") : null;
    }
  } catch {
    /* API down / not deployed yet — legacy data still renders */
  }
  return cards;
}

/**
 * Fetch a single post by path-style slug.
 * → { status: "ok", post }    published post found
 * → { status: "notfound" }    real 404 → caller falls back to static file
 * → { status: "error" }       network/5xx → caller may retry or fall back
 */
export async function getBlogPost(slug) {
  try {
    const { data } = await api.get(
      `/content/blogs/${encodeURI(slug)}/`
    );
    return { status: "ok", post: data };
  } catch (err) {
    if (err?.response?.status === 404) return { status: "notfound" };
    return { status: "error" };
  }
}

/* ── Current affairs ───────────────────────────────────────────── */

export async function getCurrentAffairs(params = {}) {
  try {
    const { data } = await api.get("/content/current-affairs/", { params });
    return data.results || [];
  } catch {
    return [];
  }
}

/* ── FAQs / announcements / homepage showcase ──────────────────── */

export async function getFaqs(pageKey) {
  try {
    const { data } = await api.get("/content/faqs/", {
      params: pageKey ? { page_key: pageKey } : {},
    });
    return data || [];
  } catch {
    return [];
  }
}

export async function getAnnouncements() {
  try {
    const { data } = await api.get("/content/announcements/");
    return data || [];
  } catch {
    return [];
  }
}

export async function getShowcaseCourses() {
  try {
    const { data } = await api.get("/content/showcase/");
    return data || [];
  } catch {
    return [];
  }
}

// Normalize a CMS ShowcaseCourse to the exact shape HomeGreen's
// FeaturedCourses component already renders (homeData.js FEATURED_COURSES
// entries). `soon` is derived the same way the backend documents it:
// an empty price with a tutor name set means "Coming Soon".
export const toShowcaseCard = (c) => ({
  cats: Array.isArray(c.categories) ? c.categories : [],
  lvl: c.level_label,
  ribbon: c.ribbon || null,
  stars: c.stars,
  count: c.review_count,
  title: c.title,
  fact: c.fact_line,
  price: c.price_label || undefined,
  tutor: c.tutor_name || undefined,
  explore: !!c.is_explore_card,
  soon: !c.price_label && !!c.tutor_name,
  grad: c.gradient_css,
  img: c.img || "",
  icon: c.icon,
  to: c.link_path || undefined,
  state:
    c.link_state && Object.keys(c.link_state).length ? c.link_state : undefined,
  // Real course this card is linked to (if any) — lets the click deep-link
  // straight into that course on the Courses.jsx catalog, not just its board.
  courseId: c.course || undefined,
});
