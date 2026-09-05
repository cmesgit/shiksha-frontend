# ShikshaCom Frontend Redesign — Change Notes

Green redesign of the public site (`src_frontend`), ported from the two
approved design files:

- `shiksha-home-green (9).html`  → the new **homepage**
- `shikshacom-ui.html`           → the new **navigation** (pill nav + mega menus + drawer)

Drop this `src/` over your existing landing-page `src/` (it is a superset:
only the files listed below were added or changed — everything else is
byte-identical to what you sent).

---

## New files

| File | What it is |
| --- | --- |
| `css/theme.css` | Shared design tokens (`--sk-*`): greens, ink, accents, font, shadows. |
| `css/SiteNav.css` | Styles for the new navigation (`skn-*` classes). |
| `css/FooterGreen.css` | Styles for the new footer (`ftr-*` classes). |
| `css/HomeGreen.css` | Homepage styles ported from the approved design. Fully scoped under `.hm-root`, so nothing leaks into other pages. |
| `components/home/HomeGreen.jsx` | The redesigned homepage (hero, why-cards, teach/learn duo, categories, featured courses, why-choose, FAQ, CTA). |
| `components/home/homeData.js` | All homepage copy + card data in one place (easy CMS/API swap later). |
| `components/home/HomeIcons.jsx` | Small inline SVG icon set (no new npm deps). |
| `components/home/useReveal.js` | IntersectionObserver reveal-on-scroll hook. |
| `assets/home/hero-illustration.svg` | Big hero artwork extracted from the design file. |
| `assets/home/why-illustration.svg` | "Why choose" panel artwork. |

## Changed files

| File | Change |
| --- | --- |
| `components/Navbar.jsx` | **Rewritten.** Fixed blur header, centred pill (Courses · Resources · About) with full-width mega menus, Ctrl/⌘+K search, auth-aware right side (Login/Signup, or Dashboard + your existing `ProfileSwitcher`), mobile slide-in drawer with accordions. Every link maps to a real route (see below). The old marquee top-strip is gone by design. |
| `components/Footer.jsx` | **Rewritten** in the new deep-green style. All real content preserved: both addresses, all phone numbers, email, social profiles, and every link from the old footer. |
| `components/HomePage.jsx` | Now renders `home/HomeGreen`. The old section components (Hero, Stats, HowItWorks, AboutShiksha, LearningPathways, CoursePreview…) are untouched on disk for rollback; `/about` etc. still use theirs. |
| `components/Courses.jsx` | 2 small additions: `searchQuery` is now seeded/synced from `location.state.searchQuery`, so the navbar + homepage hero search deep-link into the courses page with the query pre-filled. Nothing else touched. |

No dependency changes — the new UI uses only packages already in the app
(react-router-dom, react-router-hash-link, react-icons) plus inline SVGs.

---

## Where the menus point (all live routes)

**Courses mega**
- School Education → `/courses` with `location.state` deep-links
  (`{selectedBoardGroup:'central', selectedBoard:'cbse'}` /
  `{selectedBoardGroup:'state', selectedBoard:'mbse'}`) — the Courses page
  already understands these. Andhra/Assam/Bihar boards are shown as
  "Coming Soon" chips (non-clickable), same pattern as the prototype.
- Competitive Exams → live: `/general-studies`, `/current-affairs`;
  UPSC/SSC/Defence/State-PSC tracks are "Coming Soon" chips until those
  programs exist.
- Skill & Career → `/skill/browse` and `/counselling`.

**Resources mega** → `/blogs`, `/current-affairs`, `/forum`, `/explore`,
`/explore/research-hub`, `/upcoming` (Placements — same target the old nav used).

**About mega** → `/about`, `/contact`, `/faq`, `/feedback`.

Was six entries: `/about#vision` and `/about#why-shiksha` sat between About Us
and Contact. The About page redesign renamed every section id, so both
fragments stopped resolving and landed visitors at the top of `/about`. Dropped
rather than repointed — the redesigned page is one continuous narrative, so
`/about` already covers what those two rows pointed at.

**Right side** → guests: `/login`, `/signup`. Signed-in: `Dashboard`
(same role logic as before: teacher → teacher app / pick-profile,
learner → student app) + the existing ProfileSwitcher.
Drawer also links `Become a Faculty` → `/become-faculty`.

To edit menu items later, change the `COURSES_MENU / RESOURCES_MENU /
ABOUT_MENU` arrays at the top of `components/Navbar.jsx` — no markup edits
needed.

## Notes / intentional decisions

- The `<marquee>` announcement strip was removed (deprecated element,
  dated look, not in the approved design). If you want an announcement
  bar back, it should be a thin dismissible strip above `.skn-header` —
  happy to add one.
- The homepage "Featured courses" cards are a static showcase (data in
  `homeData.js`), exactly as in the design file. When you're ready, point
  that array at your courses API or a CMS endpoint — the card component
  already renders from data.
- Accessibility: focus-visible rings, `aria-expanded` / `aria-selected`
  on menus & tabs, Esc closes menus/drawer, `prefers-reduced-motion`
  disables animations (scroller auto-play included).
- The two big illustrations ship as `.svg` assets (import URLs), keeping
  the JS bundle small.

---

## v2 — CMS integration (content app)

Backend counterpart: the `content` Django app (separate zip:
`shiksha_content_cms_backend.zip` + its `README_CONTENT.md`).

**New:** `src/api/contentApi.js` — client for `/api/content/*` with
graceful degradation (API down → every helper resolves empty, pages fall
back to local data).

**Changed:** `components/Blogs.jsx` — legacy `blogsData` registry renders
immediately; published CMS posts merge in on top (same slug → CMS
version wins, new CMS posts prepended). `components/BlogDetail.jsx` —
asks the CMS API first; a real 404 falls back to the pre-extracted
static fragment, so chapters can be migrated one at a time (or never).
Also hardened the fragment fetch against SPA/CDN fallback pages that
answer 200 with the app shell.

Nothing else on the frontend calls the CMS yet by design. When ready:
homepage FAQ → `getFaqs("home")`, featured courses → `getShowcaseCourses()`
(the endpoint already returns the exact `homeData.js` card shape),
announcements strip → `getAnnouncements()`.

---

## v3 — homepage FAQ, featured courses, and a new announcement strip

The three optional wire-ups from v2's notes are now live, all following the
same graceful-degradation rule as the blog CMS integration: static content
renders first, CMS content replaces it only if the API answers with
something. No backend changes were needed — the endpoints already existed.

- **Featured courses** (`home/HomeGreen.jsx`) — `getShowcaseCourses()` is
  called on mount. If the CMS has any active `ShowcaseCourse` rows, they
  **fully replace** the 18 static cards (not merged — once you're curating
  this section in the admin, it should be authoritative). A small
  normalizer, `toShowcaseCard()` in `api/contentApi.js`, maps the CMS
  shape onto the exact fields the card component already expects,
  including deriving the "Coming Soon" state the same way the backend
  documents it: empty price + a tutor name set.

- **Homepage FAQ** (`home/HomeGreen.jsx`) — `getFaqs("home")` is called on
  mount; a non-empty result fully replaces the 6 static Q&As. CMS answers
  are sanitized HTML (`answer_html`), so they render via a scoped
  `dangerouslySetInnerHTML` wrapper rather than as plain text; static
  answers render exactly as before.

- **Announcement strip** (new, in `Navbar.jsx` + `css/SiteNav.css`) — a
  thin sitewide bar above the header, driven by `getAnnouncements()`
  (only ever shows an announcement that's live *right now*). Dismissing
  it stores the dismissed announcement's id in `localStorage`, so closing
  one doesn't hide a later, different one. When it's showing, the header
  and page spacer both shift down by its height (40px) — handled with a
  `skn-has-announce` modifier class, not inline styles. If the API is
  down or nothing is currently live, the bar simply doesn't render and
  the header sits exactly where it did before this change.

All three were verified against a live Django + seeded CMS backend (not
just mocked), and separately verified with the API fully unreachable to
confirm zero regression to the v1/v2 experience. One bug caught and fixed
during that verification: the announcement bar's optional CTA link was
initially nested inside the same truncating (`nowrap` + `ellipsis`) text
span as the message, which pushed the link off-screen on narrow phones
once a message got long enough. Fixed by making the link a separate
flex item that never shrinks — only the message text truncates now.
