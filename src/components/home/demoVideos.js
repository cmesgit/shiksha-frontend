/**
 * demoVideos.js — the landing page's product-demo clips.
 *
 * WHERE THE URLS COME FROM
 * ------------------------
 * These are Bunny Stream embed URLs, the same shape every other video on the
 * platform uses (`https://iframe.mediadelivery.net/embed/<library>/<guid>`).
 * Upload the clip to the Stream library, copy its guid, paste it below.
 *
 * WHY AN UNSET CLIP IS AN EMPTY STRING AND NOT A PLACEHOLDER URL
 * --------------------------------------------------------------
 * `configuredDemos()` drops any entry without a `src`, and the whole demo
 * affordance — the floating button, its menu, and the hero link — renders
 * nothing when the list comes back empty. So a half-configured deploy shows a
 * visitor no button at all rather than a button that opens an empty player.
 * That is the intended behaviour, not a guard against a mistake: it lets the
 * UI ship ahead of the recordings, and it means either clip can go live on its
 * own without the other.
 *
 * `seconds` drives the "0:40" in each menu row. Leave it null rather than
 * guessing — the row then shows only its description, which is always true,
 * instead of advertising a length the clip does not have.
 */

export const DEMO_VIDEOS = [
  {
    key: "signup",
    title: "Sign Up Demo",
    // Lower-case fragment for the hero's inline sentence, where "Sign Up Demo"
    // would read as a shout mid-sentence.
    short: "sign-up",
    blurb: "Create your account",
    // Set to the Bunny embed URL once the sign-up walkthrough is uploaded.
    src: "",
    seconds: null,
  },
  {
    key: "login",
    title: "Log In Demo",
    short: "log-in",
    blurb: "Get back into your dashboard",
    // Set to the Bunny embed URL once the log-in walkthrough is uploaded.
    src: "",
    seconds: null,
  },
];

/** "0:40" — the menu's duration prefix. Null seconds means "don't claim one". */
export function formatDuration(seconds) {
  if (!seconds && seconds !== 0) return null;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** The clips that actually have somewhere to play from.
 *
 * `meta` is the menu row's second line and `linkLabel` the hero sentence's
 * tail. Both name a duration only when one is recorded, so neither can
 * advertise a length the clip does not have. */
export function configuredDemos(list = DEMO_VIDEOS) {
  return list
    .filter((d) => typeof d.src === "string" && d.src.trim() !== "")
    .map((d) => {
      const time = formatDuration(d.seconds);
      return {
        ...d,
        meta: time ? `${time} · ${d.blurb}` : d.blurb,
        linkLabel: d.seconds ? `${d.seconds}s ${d.short} demo` : `${d.short} demo`,
      };
    });
}
