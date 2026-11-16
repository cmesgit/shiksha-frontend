/**
 * newsApi.js — the third-party news proxy (`/api/news/`).
 *
 * Deliberately separate from contentApi.js: this is a GNews passthrough, not
 * the CMS. The backend caches each response for 30 minutes to protect the API
 * quota, so calling this on every page view is fine.
 *
 * Used by the public Current Affairs page to fill the wire section beneath the
 * CMS's own editorial posts. The page used to fetch ONLY this, which hid
 * everything an admin wrote; then it was switched to fetch ONLY the CMS, which
 * left the page completely empty on production because no current affairs have
 * ever been published there. It now reads both.
 */
import api from "./apiClient";

/**
 * Latest general headlines.
 *
 * Returns `[]` on any failure — the wire is a supplement to the CMS posts, so
 * a dead upstream should quietly show nothing rather than error the page.
 * Note the backend already normalises GNews' shape to
 * {title, description, url, image, publishedAt, source, category}.
 */
export async function getTopHeadlines({ max = 9 } = {}) {
  try {
    const { data } = await api.get("/news/top-headlines/", { params: { max } });
    return {
      articles: Array.isArray(data?.articles) ? data.articles : [],
      // When GNews was actually called, not when this request was served —
      // the backend caches for 30 minutes and stamps this inside the cached
      // body. Null on an older backend that doesn't send it, which the
      // caller must treat as "don't claim a time".
      fetchedAt: data?.fetchedAt || null,
      stale: Boolean(data?.stale),
    };
  } catch {
    return { articles: [], fetchedAt: null, stale: true };
  }
}

export default { getTopHeadlines };
