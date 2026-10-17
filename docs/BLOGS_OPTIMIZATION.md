# Blogs browsing optimization

2026-10-17. Public `/blogs`; existing CMS API and saved posts preserved.

## Changes

- Fetch one12-item server page instead of walking the entire catalogue.
- Labelled search with300ms debounce, approved CMS subject/class options,
  URL-backed filters and page number, reset and accessible pagination.
- Abort obsolete requests; preserve rapid subject/class selections; distinguish
  loading, empty results, API failures and invalid result pages with recovery.
- Study cards show class/chapter/read time, decoded imported title/summary
  entities, fixed image area, first-image priority, lazy remaining images,
  missing/broken-image fallback, bounded excerpts and aligned article links.
-3/2/1 columns desktop/tablet/phone, mobile filters with separate reset row,
  visible keyboard focus and reduced-motion support. Scoped CSS; canonical
  shared dashboard BlogCard untouched. No new dependency or backend migration.

## Measured scope

Production catalogue has114 published English posts at verification time.
Previous initial fetch:3 requests,114 cards,68194 JSON bytes. New initial
fetch:1 request,12 cards,6773 JSON bytes,90.1% less article JSON. This measures
list-response payload, not total page weight, LCP or a real-phone speed score.
Existing image URLs/files are retained; no CMS data or article bodies changed.

## Verification

Four Node checks cover shared filter URLs, invalid values/page bounds, query
length/general selection, entity decoding and invalid Unicode. Targeted ESLint
and production build pass. Local browser uses a temporary read-only GET relay
to public production content because production CORS correctly rejects the
localhost origin. No authentication changes or production writes for testing.

Browser checks: initial114 count/12 cards, rapid Geography+Class9 choices,
5 matching posts, nonexistent search/zero results/reset, page2, opening article
and browser Back retaining page2. Phone390px and tablet820px layout checked,
no horizontal overflow; mobile dropdowns display Geography/Class10 in full.
Preview API failure displayed recovery state. Build clean release checkout to
exclude unrelated local FormFillup/Skill/ExpertProfile work.

See workspace EXPLORE_PROGRESS.md and artifacts/shiksha-blogs-20261017 for final
release revisions, deployment verification and screenshots.
