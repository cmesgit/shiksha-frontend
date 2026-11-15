// Site redirects — the one client-side implementation.
// design_handoff_admin_counsellor, Admin v2 Phase 5.
//
// ⚠ WHY THIS IS CLIENT-SIDE AT ALL. nginx serves index.html for every
// unmatched path, so Django — and `django.contrib.redirects` with it — never
// sees a dead SPA URL. The first code that knows the URL failed is the SPA.
//
// ⚠ AND WHY IT HAS TWO CALL SITES. The obvious one is the catch-all 404.
// That is NOT enough: `/courses/:slug` MATCHES a route, so a renamed course
// never reaches the catch-all — it reaches the catalog, which quietly shows
// the course list instead. A renamed course is the motivating case for this
// whole feature (Course.slug is derived from the title on first save and
// never re-derived on rename), so a 404-only implementation would have
// missed the very thing it was built for. Any other "matched the route but
// found nothing" state should call this too.
import api from "../api/apiClient";

/** Look up a redirect for `path`.
 *
 *  Resolves to the destination string, or null when there is no rule — a 404
 *  from the resolver is the ordinary answer here, not a failure, so callers
 *  get null rather than a rejection.
 */
export async function resolveRedirect(path, { signal } = {}) {
  try {
    const { data } = await api.get("/content/redirects/resolve/", {
      params: { path },
      signal,
    });
    return data?.to || null;
  } catch {
    return null;
  }
}

/** Follow a resolved destination.
 *
 *  `replace`, never push: the dead URL must not sit in history waiting for
 *  the Back button to land on it again. Off-site destinations leave the SPA
 *  entirely, so they need a real location change rather than a router nav.
 */
export function followRedirect(to, navigate, search = "") {
  if (!to) return false;
  if (/^https?:\/\//i.test(to)) {
    window.location.replace(to);
  } else {
    navigate(to + (search || ""), { replace: true });
  }
  return true;
}
