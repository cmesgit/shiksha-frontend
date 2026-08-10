// PLACEMENT: src/api/guidesApi.js   (NEW FILE — landing/frontend app)
//
// Client for the career-guidance CMS (mounted at /api/counseling/guides/).
// Modelled on contentApi.js's degrade-gracefully idiom, NOT counselling.js's
// (the latter lets errors throw — fine for authenticated booking flows,
// wrong for a public content library that must still render something
// when the API is briefly down).

import api from "./apiClient";

// DRF pagination walked manually: `next` is an absolute URL but api's
// baseURL already includes /api, so keep only the path+query.
const MAX_PAGES = 20;

let indexPromise = null;

/**
 * Fetch every published guide (walks pagination once, then caches the
 * in-flight promise so Landing + Library + MyPath — all of which need
 * the index on mount — share a single request instead of firing three).
 * Resolves to [] on any failure.
 */
export function getGuideIndex() {
  if (!indexPromise) {
    indexPromise = (async () => {
      const cards = [];
      try {
        let url = "/counseling/guides/?page_size=50";
        for (let i = 0; i < MAX_PAGES && url; i += 1) {
          const { data } = await api.get(url);
          (data.results || []).forEach((g) => cards.push(g));
          url = data.next ? data.next.replace(/^.*\/api/, "") : null;
        }
      } catch {
        indexPromise = null; // allow a later retry once the API recovers
        return [];
      }
      return cards;
    })();
  }
  return indexPromise;
}

const guideCache = new Map();

/**
 * Fetch one guide by slug (or a legacy alias — the backend resolves
 * `legacy_slugs` and returns `is_alias`/`canonical_slug` so the caller can
 * rewrite the URL).
 * → { status: "ok", guide }     found
 * → { status: "notfound" }      real 404 — caller redirects to the library
 * → { status: "error" }         network/5xx — caller shows a retry banner
 *
 * Deliberately does NOT force `?full=1`. The backend inlines sections for
 * small guides (<=40 sections) and returns a chapter index only for large
 * ones — four of the ten guides, including study-in-india at 2500+
 * sections / ~19,000 blocks, exceed that. Rendering all of it as one DOM
 * tree measurably hangs the browser (confirmed while building this), so
 * GuidePage switches to per-chapter loading (getGuideChapter) instead of
 * requesting everything at once.
 */
export async function getGuide(slug) {
  if (guideCache.has(slug)) return guideCache.get(slug);
  try {
    const { data } = await api.get(`/counseling/guides/${encodeURIComponent(slug)}/`);
    const result = { status: "ok", guide: data };
    guideCache.set(slug, result);
    return result;
  } catch (err) {
    if (err?.response?.status === 404) return { status: "notfound" };
    return { status: "error" };
  }
}

export async function getGuideChapter(slug, chapterSlug) {
  const { data } = await api.get(
    `/counseling/guides/${encodeURIComponent(slug)}/chapters/${encodeURIComponent(chapterSlug)}/`
  );
  return data;
}

export function recordGuideView(slug) {
  // Fire-and-forget — a failed view-count ping should never affect the reader.
  api.post(`/counseling/guides/${encodeURIComponent(slug)}/view/`).catch(() => {});
}

/** Card shape LandingPage/LibraryPage/GuideCard render. */
export function toGuideCard(g) {
  return {
    slug: g.slug,
    title: g.title,
    blurb: g.blurb,
    audience: g.audience,
    stage: g.stage,
    stageLabel: g.stage_label,
    stageOrder: g.stage_order,
    accent: g.accent,
    sectionCount: g.section_count ?? 0,
    specializations: g.specializations || [],
  };
}
