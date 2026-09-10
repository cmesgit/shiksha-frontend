/**
 * shiksha-frontend/src/api/publicConfig.js
 *
 * The handful of platform flags a LOGGED-OUT visitor is allowed to read,
 * from GET /api/public-config/.
 *
 * Deliberately NOT on `apiClient`. That instance carries `withCredentials`
 * and a 401 interceptor that fires `refreshSession()` and can redirect to
 * login — behaviour that is correct for an authenticated call and actively
 * wrong here. This endpoint is anonymous, so a plain fetch with no cookies
 * is both sufficient and incapable of bouncing a guest off the marketing
 * site because a stale refresh cookie happened to fail.
 *
 * The response is an allowlist on the server (see PublicConfigView's
 * PUBLIC_FLAGS) — it is not the settings serializer, which holds payment
 * credentials.
 */
import { API_URL } from "../config/urls";

/* Every flag the site knows about, with the value to assume when the backend
 * cannot be reached. FAIL CLOSED: an unreachable API must not flash an
 * unfinished page at a visitor, so the safe default for a rollout gate is
 * `false` — the same thing the server ships. */
const DEFAULTS = {
  public_quiz_hub_enabled: false,
  /* design_handoff_live_ticker. Public rather than on `feature_flags`
     because two of the ticker's eight slots are the login and signup
     screens, which render before anyone has logged in. */
  live_ticker_enabled: false,
};

/* One in-flight request per page load, shared by every caller. Without this,
 * three components mounting together make three identical requests. */
let inflight = null;
let cached = null;

export function getPublicConfig() {
  if (cached) return Promise.resolve(cached);
  if (inflight) return inflight;

  inflight = fetch(`${API_URL}/public-config/`, {
    credentials: "omit",
    headers: { Accept: "application/json" },
  })
    .then((res) => (res.ok ? res.json() : {}))
    .catch(() => ({}))
    .then((body) => {
      /* Merge onto DEFAULTS rather than replacing them, so a flag this build
         knows about but an older backend does not yet return resolves to its
         safe default instead of `undefined` — which is falsy by luck rather
         than by decision, and would read as "off" for a gate but as "on" for
         anything phrased as a kill switch. */
      cached = { ...DEFAULTS, ...(body || {}) };
      inflight = null;
      return cached;
    });

  return inflight;
}

/* Test seam only — the module-level cache otherwise leaks between cases. */
export function __resetPublicConfigCache() {
  cached = null;
  inflight = null;
}
