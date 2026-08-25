// ─────────────────────────────────────────────────────────────────────────────
// src/explore/components/categoryIcons.jsx
//
// Category / document-type iconography for the Explore module.
//
// WHY THIS MAPS BY KEY AND IGNORES `category.icon`
// ------------------------------------------------
// The API ships an `icon` STRING per category, and it holds an emoji glyph:
//
//   shiksha-backend/documents/constants.py  DEFAULT_CATEGORIES  →  📄 📚 📰 …
//   shiksha-backend/documents/models.py:31  icon = CharField(max_length=8)
//   Admin-dashboard skillcms/Categories.jsx lets an admin TYPE a new emoji in
//
// So the emoji live in the database, not in the frontend seed. Editing
// data/exploreSeed.js changes nothing on dev or prod — that seed is only read
// when exploreApi.js runs with USE_MOCK. Rendering `c.icon` therefore always
// puts a platform-dependent emoji on screen no matter what the frontend does.
//
// Keying off the stable `key`/`slug` instead is what actually removes them,
// and it needs no migration and no admin retraining. An unknown key (an admin
// adds a category we have no icon for) falls back to a generic document icon
// rather than breaking the grid.
//
// Uses react-icons, which is already a dependency of this app and the
// convention everywhere else in it. `ui.jsx` keeps a few hand-rolled inline
// SVGs and says it does so to avoid an icon-lib dependency — that rationale
// no longer holds, but those are left alone as out of scope here.
// ─────────────────────────────────────────────────────────────────────────────

import {
  PiBooks,
  PiBookOpenText,
  PiClipboardText,
  PiFile,
  PiFileText,
  PiNewspaper,
  PiNotePencil,
  PiPresentationChart,
  PiQuestion,
} from "react-icons/pi";

/** Category key → icon component.
 *
 * ⚠ TWO KEY DIALECTS, both real. The API's slugs (authoritative, from
 * `documents/constants.py DEFAULT_CATEGORIES`) are NOT the same strings as
 * `data/exploreSeed.js`'s keys, which only appear under USE_MOCK:
 *
 *     API slug          exploreSeed key
 *     research-papers   research
 *     study-materials   study
 *     presentations     ppt
 *     assignments       assignment
 *     question-papers   question
 *
 * Mapping only one dialect leaves the other silently falling through to
 * `PiFile` — the grid still renders eight SVG icons of the right size, so it
 * looks fine and five of them are quietly the same generic document glyph.
 * Both are listed deliberately; do not "tidy" either set away.
 */
const BY_KEY = {
  // ── API slugs (what dev and prod actually serve) ──
  "research-papers": PiFileText,
  "books":           PiBooks,
  "articles":        PiNewspaper,
  "notes":           PiNotePencil,
  "study-materials": PiBookOpenText,
  "presentations":   PiPresentationChart,
  "assignments":     PiClipboardText,
  "question-papers": PiQuestion,
  "other":           PiFile,

  // ── exploreSeed.js keys (USE_MOCK only) ──
  "research":   PiFileText,
  "study":      PiBookOpenText,
  "ppt":        PiPresentationChart,
  "assignment": PiClipboardText,
  "question":   PiQuestion,
};

/**
 * Resolve a category (or a document's `typeMeta`) to an icon component.
 * Accepts the whole object so callers don't have to know whether the server
 * called the field `key` or `slug`.
 */
export function categoryIcon(meta) {
  if (!meta) return PiFile;
  return BY_KEY[meta.key] || BY_KEY[meta.slug] || PiFile;
}

/**
 * Render helper — the common case at every call site.
 * `meta` is a category or typeMeta object; extra props pass through.
 */
export function CategoryIcon({ meta, ...rest }) {
  const Cmp = categoryIcon(meta);
  return <Cmp aria-hidden="true" {...rest} />;
}
