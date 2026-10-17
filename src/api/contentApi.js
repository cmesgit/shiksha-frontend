// PLACEMENT: src/api/contentApi.js   (NEW FILE — landing/frontend app)
//
// Client for the content CMS backend (mounted at /api/content/).
// Every helper degrades gracefully: on network/API failure the list
// helpers resolve to [] / null so pages can fall back to their local
// data instead of breaking. `getBlogPost` distinguishes a real 404
// (post not in CMS → caller falls back to the static fragment) from a
// transport error (caller may retry).

import api from "./apiClient";
import { BLOG_PAGE_SIZE, blogText } from "../utils/blogBrowse";

/* ── Blogs ─────────────────────────────────────────────────────── */

// Normalize a CMS post to the card shape Blogs.jsx already renders
// (same fields as the legacy data/blogsData.js entries).
export const toBlogCard = (post) => ({
  id: `cms-${post.id}`,
  slug: post.slug,
  category: post.category || post.subject || "",
  classLevel: post.class_level,
  title: blogText(post.title),
  subtitle: post.excerpt ? blogText(post.excerpt) : undefined,
  thumbnail: post.thumbnail || undefined,
  tags: post.tags || [],
  chapterNumber: post.chapter_number,
  readingMinutes: post.reading_minutes,
  fromCms: true,
});

// Fetch one cancellable page, never the entire catalogue. The caller handles
// errors distinctly from zero results and offers a retry.
export async function getBlogCardsPage(filters, { signal } = {}) {
  const { data } = await api.get("/content/blogs/", {
    params: { ...filters, page_size: BLOG_PAGE_SIZE }, signal, timeout: 12000,
  });
  if (!Array.isArray(data.results) || !Number.isFinite(data.count)) {
    throw new Error("Unexpected blog response");
  }
  return { items: data.results.map(toBlogCard), count: data.count, hasNext: Boolean(data.next) };
}

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
    /* API down / not deployed yet — legacy data still renders. Flagged
       rather than silent: an empty array is indistinguishable from "this
       site has no posts", and the list page rendered "No blog posts yet"
       over an outage. Non-enumerable so it can't leak into .map()/JSON,
       matching the `safe()`/`__failed` convention in Admin-dashboard. */
    Object.defineProperty(cards, "__failed", {
      value: true, enumerable: false,
    });
  }
  return cards;
}

/**
 * Fetch a single post by path-style slug, optionally in a specific locale
 * (default "en", matching the backend's own default). A `?locale=hi`
 * request for a slug with no Hindi translation yet still resolves "ok" —
 * the backend serves the English row instead of 404ing, flagged via
 * `post.is_fallback_locale` so the caller can show a "not translated yet"
 * banner rather than losing the reader to a dead end.
 * → { status: "ok", post }    published post found (post.locale tells you
 *                             which locale actually rendered; check
 *                             post.is_fallback_locale for the fallback case)
 * → { status: "notfound" }    real 404 → caller falls back to static file
 * → { status: "error" }       network/5xx → caller may retry or fall back
 */
export async function getBlogPost(slug, locale) {
  try {
    const { data } = await api.get(`/content/blogs/${encodeURI(slug)}/`, {
      params: locale ? { locale } : undefined,
    });
    return { status: "ok", post: data };
  } catch (err) {
    if (err?.response?.status === 404) return { status: "notfound" };
    return { status: "error" };
  }
}

/* ── Current affairs ───────────────────────────────────────────── */

/* The list endpoint is paginated, so this returns the page envelope rather
   than a bare array — the page needs `next` to offer "Load more" and
   `count` to say how many affairs matched the filters. */
export async function getCurrentAffairs(params = {}) {
  try {
    const { data } = await api.get("/content/current-affairs/", { params });
    return { items: data.results || [], next: data.next || null, count: data.count ?? 0 };
  } catch {
    return { items: [], next: null, count: 0 };
  }
}

/* Same {status} shape as getBlogPost: a 404 is a real answer ("no such
   affair"), not a failure the caller should retry. */
export async function getCurrentAffair(slug) {
  try {
    const { data } = await api.get(`/content/current-affairs/${encodeURIComponent(slug)}/`);
    return { status: "ok", affair: data };
  } catch (err) {
    if (err?.response?.status === 404) return { status: "notfound" };
    return { status: "error" };
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

/** Live ticker items for one slot (design_handoff_live_ticker).
 *
 * The server decides what belongs in a slot — `slots` is deliberately not in
 * the public payload — so the only thing a caller passes is the slot name.
 * Fails to [] like its neighbours: a ticker that cannot load must leave the
 * page as it was, never render an empty shell.
 */
// The brand panel, mobile preview and mentor block share a slot. Coalesce
// their requests and keep the result briefly across auth step changes.
const tickerFeeds = new Map();
export function getTickerItems(slot, { force = false } = {}) {
  const previous = tickerFeeds.get(slot);
  if (previous && (previous.pending || (!force && previous.expires > Date.now()))) return previous.request;
  const entry = { expires: 0, pending: true, request: null, value: previous?.value ?? null, failed: false };
  entry.request = api.get("/content/announcements/", { params: { slot }, timeout: 8000 })
    .then(({ data }) => {
      if (!Array.isArray(data)) throw new Error("Unexpected advertisement response");
      entry.value = data;
      return data;
    })
    .catch(() => {
      entry.failed = true;
      return entry.value || [];
    })
    .finally(() => { entry.pending = false; entry.expires = entry.failed ? 0 : Date.now() + 30000; });
  tickerFeeds.set(slot, entry);
  return entry.request;
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

// All homepage sections share three collections. Fetch each collection once,
// rather than issuing three requests for every rendered section.
const homeCollections = new Map();
function getHomeCollection(resource, { force = false } = {}) {
  const previous = homeCollections.get(resource);
  if (previous && (previous.pending || (!force && previous.expires > Date.now()))) return previous.request;
  const entry = { pending: true, expires: 0, request: null, value: previous?.value ?? null, failed: false };
  entry.request = api.get(`/content/${resource}/`, { timeout: 8000 })
    .then(({ data }) => {
      if (!Array.isArray(data)) throw new Error("Unexpected homepage response");
      entry.value = data;
      return data;
    })
    .catch(() => {
      entry.failed = true;
      return entry.value || [];
    })
    .finally(() => { entry.pending = false; entry.expires = entry.failed ? 0 : Date.now() + 30000; });
  homeCollections.set(resource, entry);
  return entry.request;
}

export async function getHomeContent(section, options) {
  const rows = await getHomeCollection("home-content", options);
  return rows.find((row) => row.section === section) || null;
}

export async function getHomeListItems(section, options) {
  const rows = await getHomeCollection("home-list-items", options);
  return rows.filter((row) => row.section === section);
}

export async function getHomeFloaters(section, options) {
  const rows = await getHomeCollection("home-floaters", options);
  return rows.filter((row) => row.section === section);
}

// Ordered, visible-only list of homepage sections — lets an admin reorder/
// hide sections without a frontend deploy. See ShikshaHome.jsx for the
// fallback used while this is loading or if it's ever empty/unreachable.
export async function getHomeSectionOrder() {
  try {
    const { data } = await api.get("/content/home-section-order/");
    return data || [];
  } catch {
    return [];
  }
}

// The landing page's product-walkthrough clips, newest config first.
// The backend already withholds rows that are unpublished or have no Bunny
// video uploaded yet, so `length === 0` is the frontend's whole "is there
// anything to show" test — DemoVideoButton renders nothing on an empty list
// rather than a play button that opens an empty player.
let demoFeed = null;
export function getDemoVideos() {
  if (demoFeed && demoFeed.expires > Date.now()) return demoFeed.request;
  const entry = { expires: Date.now() + 30000, request: null };
  entry.request = api.get("/content/demo-videos/", { timeout: 8000 })
    .then(({ data }) => Array.isArray(data) ? data : [])
    .catch(() => { if (demoFeed === entry) demoFeed = null; return []; });
  demoFeed = entry;
  return entry.request;
}


/* ── Contact page writes ───────────────────────────────────────── */
//
// Unlike every read helper above, these two deliberately do NOT swallow
// failures into a falsy value. A list that quietly renders empty is a
// degraded page; a form that quietly reports success when the request failed
// is a lie — the visitor walks away believing we have their message.
// Both reject, and Contact.jsx renders the failure.

/** POST an enquiry from /contact. Rejects on any non-2xx. */
export async function submitContactMessage(payload) {
  const { data } = await api.post("/content/contact/", payload);
  return data;
}

/** POST an address to the newsletter list. Rejects on any non-2xx. */
export async function subscribeNewsletter(email) {
  const { data } = await api.post("/content/newsletter/", { email });
  return data;
}
