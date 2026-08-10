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

/* ── Homepage content (Hero/WhyShiksha/etc. heading+copy, list items,
   decorative floaters) ───────────────────────────────────────────── */

export async function getHomeContent(section) {
  try {
    const { data } = await api.get("/content/home-content/", {
      params: { section },
    });
    return (data && data[0]) || null;
  } catch {
    return null;
  }
}

export async function getHomeListItems(section) {
  try {
    const { data } = await api.get("/content/home-list-items/", {
      params: { section },
    });
    return data || [];
  } catch {
    return [];
  }
}

export async function getHomeFloaters(section) {
  try {
    const { data } = await api.get("/content/home-floaters/", {
      params: { section },
    });
    return data || [];
  } catch {
    return [];
  }
}

