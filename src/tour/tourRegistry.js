/**
 * tourRegistry.js — shiksha-frontend tour content (TOUR_SYSTEM_SPEC.md §3.3, §7.3).
 * Per-app, NOT synced by shared/sync.mjs (same reasoning as tokens.css).
 *
 * ⚠️ COPY IS A DRAFT. Every `title`/`body` string below is a placeholder the
 * spec's own guidance (§13) explicitly asks the implementer NOT to finalize
 * unprompted — it fixes structure, not words. Needs product-owner sign-off
 * before shipping. Structure (steps, targets, gating) is the reviewed part.
 *
 * No T1 welcome tour here — spec §3.3 is explicit: public visitors must
 * never be interrupted, and this app has no equivalent of a logged-in
 * "home" screen the way the student/teacher dashboards do.
 *
 * Deviations from TOUR_SYSTEM_SPEC.md §3.3, found while wiring real anchors
 * (phase 7) — flagged per TOUR_BUILD_GUIDE.md §3 rather than invented around:
 *
 *   - `forum.intro` — spec described "Spaces vs categories, asking,
 *     answering, following" (4 topics). `FeedPage.jsx` (the tour's own
 *     route) has no "follow" control at all — following only exists on
 *     `SpacesPage`/`SpacePage`/`CategoriesPage`/`CategoryPage`, none of
 *     which this route-scoped tour can reach. Built as 4 steps against
 *     what's actually on this page instead: the Spaces/Categories nav,
 *     Ask, Answer, and the feed itself (closing on "here's where it all
 *     shows up" rather than a "following" step with no real target).
 *   - `explore.upload` — the page is a 2-step wizard (doc type + dropzone,
 *     then title/metadata/publish). The tour's 2nd and 3rd steps target
 *     step-2 fields, which don't exist in the DOM until the visitor clicks
 *     "Continue" on step 1 — if the tour is still on step 1 of 3 when that
 *     happens, R6/R7 (missing target → skip silently) is what carries it
 *     through, not a special case built here.
 *
 * Token layer (C6/C8): the forum has its own `--fm-*` vocabulary, scoped to
 * `.fm-root` — a class the body-portalled tour overlay is never inside.
 * `TourMount` (main.jsx) passes `track="forum"` on `/forum/*` routes, and
 * `theme.css`'s `[data-track="forum"]` rule (NOT a `.fm-root`-scoped one —
 * that would never reach the portal, see that file's comment) resolves
 * `--tour-accent`/`--tour-border` to forum's literal green instead of the
 * site default. Explore and marketing pages need no override — they
 * already read the base `--sk-*`-derived `--tour-*` values at :root.
 *
 * NOT built in this pass:
 *   - `explore.beacon.library` (T3) — same reason as every other app's T3
 *     entries: `shared/src/tour/` has no `Beacon.jsx` yet.
 *   - `live.first-visit` — spec's own table lists this as reusing the
 *     existing `FirstVisitTour.jsx` (migrated to the shared persistence in
 *     an earlier phase). Deliberately NOT added as a registry entry here:
 *     `entry.renderer` ("grid" vs "spotlight") is documented in the schema
 *     but the engine (`TourOverlay.jsx`) never actually reads it — every
 *     registry entry always renders the generic spotlight UI. Adding this
 *     key here would make it clickable from the Help panel and launch the
 *     WRONG UI (a spotlight tour with no real steps) instead of the real
 *     grid-modal component, which manages its own mount/trigger logic and
 *     isn't reachable through `start()`/`replay()` at all. Surfacing it
 *     properly needs actual renderer-dispatch work in the shared engine,
 *     which is out of scope for "mount + anchors + registry." Its own
 *     manual re-entry point (`LiveLanding`'s "Watch the 40-second tour"
 *     button) is untouched and still works; `FirstVisitTour.jsx`'s footer
 *     hint was updated this phase to point at the now-real `?` key instead
 *     of a dead "Info → How to use" claim — see that file's comment.
 *   - T0 empty-state upgrades — unlike the student/teacher apps, this app
 *     has no shared `EmptyState`-style component anywhere (`src/forum/`
 *     and `src/explore/` both hand-roll their own bare/local empty blocks
 *     per page). Building one from scratch and retrofitting ~5 call sites
 *     (forum feed, forum saved list, explore collections, explore browse,
 *     explore library) is a bigger lift than this phase's mount+anchors+
 *     registry scope — flagging as a gap rather than doing componentdesign
 *     work unprompted. The existing states are functional, just plain.
 */

export const tourRegistry = [
  // ── T2 — Page tours ───────────────────────────────────────────────────
  {
    key: "forum.intro",
    label: "Forum basics",
    version: 1,
    tier: "T2",
    renderer: "spotlight",
    trigger: { match: "/forum" },
    conditions: [(ctx) => ctx.location.pathname === "/forum"],
    steps: [
      {
        target: '[data-tour="forum-nav.categories"]',
        placement: "right",
        title: "Categories and Spaces",
        body: "Categories are broad subjects; Spaces are smaller communities you can follow.",
      },
      {
        target: '[data-tour="forum-intro.ask"]',
        placement: "bottom",
        title: "Ask something",
        body: "Post a question to the whole forum, or share an update as a regular post.",
      },
      {
        target: '[data-tour="forum-intro.answer"]',
        placement: "bottom",
        title: "Help someone else",
        body: "The Answer queue surfaces questions that don't have a reply yet.",
      },
      {
        target: '[data-tour="forum-intro.feed"]',
        placement: "top",
        title: "Everything lands here",
        body: "New questions and posts from across the forum show up in this feed.",
      },
    ],
  },
  {
    key: "forum.ask",
    label: "Asking a question",
    version: 1,
    tier: "T2",
    renderer: "spotlight",
    trigger: { match: "/forum/ask" },
    steps: [
      {
        target: '[data-tour="ask.title"]',
        placement: "bottom",
        title: "Title and details",
        body: "A specific title gets more answers — add the full context below it.",
      },
      {
        target: '[data-tour="ask.space"]',
        placement: "top",
        title: "Post to a Space",
        body: "Optional — post inside a Space to reach people already following that topic.",
      },
      {
        target: '[data-tour="ask.tags"]',
        placement: "top",
        title: "Tag it",
        body: "Tags help others searching for the same topic find your question.",
      },
    ],
  },
  {
    key: "explore.browse",
    label: "Browsing Explore",
    version: 1,
    tier: "T2",
    renderer: "spotlight",
    trigger: { match: "/explore/browse" },
    steps: [
      {
        target: '[data-tour="explore-browse.filters"]',
        placement: "right",
        title: "Narrow it down",
        body: "Filter by category, subject, level, or file type to find what you need faster.",
      },
      {
        target: '[data-tour="explore-toolbar.collections"]',
        placement: "bottom",
        title: "Collections",
        body: "Curated sets of documents grouped around a topic.",
      },
      {
        target: '[data-tour="explore-toolbar.library"]',
        placement: "bottom",
        title: "Your library",
        body: "Everything you've saved or uploaded lives here.",
      },
    ],
  },
  {
    key: "explore.upload",
    label: "Uploading a document",
    version: 1,
    tier: "T2",
    renderer: "spotlight",
    trigger: { match: "/explore/upload" },
    steps: [
      {
        target: '[data-tour="explore-upload.dropzone"]',
        placement: "top",
        title: "Start here",
        body: "Pick what kind of document it is, then drop the file in or browse for it.",
      },
      {
        target: '[data-tour="explore-upload.title"]',
        placement: "bottom",
        title: "Describe it",
        body: "A clear title and description help others find and trust your upload.",
      },
      {
        target: '[data-tour="explore-upload.publish"]',
        placement: "top",
        title: "Goes live immediately",
        body: "Published documents are visible to everyone right away.",
      },
    ],
  },
];
