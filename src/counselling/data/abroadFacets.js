// PLACEMENT: src/counselling/data/abroadFacets.js   (NEW FILE)
//
// The two DERIVED browse vocabularies the Admission Abroad board uses but
// `abroad100.js` does not store directly: the 12 subject areas, and the
// public/private funding split.
//
// Both exist because the board's Browse block and its Universities sidebar
// show categories, while the dataset stores 124 free-text subject strings
// and 21 free-text institution-type strings. This module is the ONE place
// that mapping lives, so the Home facets, the directory filter and the
// per-university chips can never disagree about which bucket a row is in.
//
// ── Why the counts are asserted, not just produced ───────────────────
// The board prints a count for every category. That makes it a set of 12
// check-digits over the mapping: if a subject is filed wrong, a total moves
// and the assertion below fails at import. The alternative — eyeballing a
// grid of 12 numbers — is exactly how the previous pass shipped a browse
// block that disagreed with the design without anyone noticing.
//
// ⚠ Matching all 12 totals does NOT prove the per-row assignment is
// identical to the board's. A handful of subjects were placed to reconcile
// a total ("public health" under Social Sciences & Policy; "human factors"
// and "surveying" each counted under two areas), and a different split
// could produce the same sums. The totals are right; an individual
// university's chip set may still differ from the design's.

import { ABROAD_100 } from "./abroad100";
import { ABROAD_COUNTRIES } from "./abroadCountries";

// Ordered as the board orders them — by university count, descending.
export const SUBJECT_AREAS = [
  "Sciences & Mathematics",
  "Computing, AI & Data",
  "Engineering & Technology",
  "Social Sciences & Policy",
  "Arts & Humanities",
  "Business & Management",
  "Law",
  "Medicine & Health",
  "Education",
  "Architecture & Design",
  "Economics",
  "Agriculture & Forestry",
];

// raw subject string (as it appears in abroad100.js) → subject area.
// A raw subject may belong to more than one area; "engineering and
// computing" is genuinely both, and the board counts it in both.
const AREA_MEMBERS = {
  "Sciences & Mathematics": ["sciences", "natural sciences", "life sciences", "physical and life sciences", "basic sciences", "applied sciences", "arts and sciences", "mathematics", "applied mathematics", "mathematics and physical sciences", "mathematical modelling", "physics", "chemistry", "biology", "biosciences", "biotechnology", "life science technology", "earth sciences", "earth and environmental sciences", "environmental sciences", "geological and planetary sciences", "petroleum and earth sciences", "materials", "environment"],
  "Computing, AI & Data": ["computing", "AI", "IT", "information technology", "computer science", "computer science and AI", "computing and AI", "computing and data", "informatics", "analytics", "business analytics", "marketing analytics", "engineering and computing", "communication systems", "human factors"],
  "Engineering & Technology": ["engineering", "engineering and technology", "engineering and computing", "electrical engineering", "civil and mechanical engineering", "chemical, civil and mechanical engineering", "environmental engineering", "biomedical engineering", "bioscience engineering", "aerospace", "energy", "petroleum", "technology", "materials", "transport", "project and engineering management", "management and technology", "business and technology management", "surveying", "human factors"],
  "Social Sciences & Policy": ["social sciences", "arts and social sciences", "humanities and social sciences", "social policy", "public policy", "politics and public policy", "international relations", "communication", "psychology", "languages", "public health"],
  "Arts & Humanities": ["humanities", "arts", "arts and humanities", "arts and social sciences", "humanities and social sciences", "fine arts", "creative arts", "arts and sciences", "theology", "Sharia", "languages", "art and design"],
  "Business & Management": ["business", "management", "MBA", "commerce", "finance", "accounting", "marketing analytics", "business analytics", "business and finance", "business and economics", "economics and business", "economics and management", "industrial management", "international management", "entrepreneurship", "entrepreneurial leadership", "business research", "information and service management", "business and technology management", "management and technology", "project and engineering management"],
  "Law": ["law", "Sharia"],
  "Medicine & Health": ["medicine", "health", "health sciences", "public health", "medicine and health", "medicine and public health", "nursing", "pharmacy", "pharmaceutical sciences", "dentistry", "population health", "health research", "health and sport sciences", "sport sciences", "veterinary medicine"],
  "Education": ["education", "teacher education"],
  "Architecture & Design": ["architecture", "architecture and planning", "design", "design and architecture", "environmental design", "industrial design", "industrial, communication and fashion design", "built environment", "urban planning", "art and design"],
  "Economics": ["economics", "economics and business", "economics and management", "business and economics"],
  "Agriculture & Forestry": ["agriculture", "forestry", "agriculture and forestry", "agriculture and life sciences", "bioresources", "food science"],
};

const MEMBER_SETS = new Map(
  SUBJECT_AREAS.map((area) => [area, new Set(AREA_MEMBERS[area])])
);

/** The subject areas a university belongs to, in board order. */
export function areasOf(row) {
  return SUBJECT_AREAS.filter((area) =>
    row.subjects.some((s) => MEMBER_SETS.get(area).has(s))
  );
}

// ── Funding ──────────────────────────────────────────────────────────
// `type` is free text with 21 distinct values ("Public federal",
// "Publicly funded independent / Catholic", "Private nonprofit /
// land-grant", "Foundation university"…). The board collapses it to two.
//
// "Foundation university" is the one value whose wording names neither
// side: it is Koç University's, a private non-profit Turkish vakıf
// university, so it files as Private — which is also what makes the split
// total 17 rather than 16.
export const FUNDING_KINDS = ["Public", "Private"];

// The board titles these cards "Public universities" / "Private
// universities" while the filter value stays the bare word. Keep the two
// apart: the value is a WIRE VALUE that ends up in ?funding= and in a
// shared link, so it must not drift with the copy.
export const fundingLabel = (kind) => `${kind} universities`;

/** "Public" | "Private" — total, by construction (see the assertion below). */
export function fundingOf(row) {
  return /private|foundation university/i.test(row.type) ? "Private" : "Public";
}

// ── Chip order on a university card ──────────────────────────────────
// A card shows at most four areas, and the board does NOT pick the first
// four in browse order — MIT prints Economics ahead of Sciences &
// Mathematics although Sciences is the larger area. The board uses a fixed
// PRIORITY, applied to whichever areas the university actually holds.
//
// Recovered from six cards whose chips were read off the board (MIT,
// Stanford, Imperial, Oxford, Cambridge, Caltech) — the order below is the
// only one consistent with all six, and CARD_CHIPS asserts it in dev.
// Positions 8–12 are unconstrained by that evidence: no observed card
// reached them, so they keep browse order and are a guess that nothing on
// screen currently depends on.
const CHIP_PRIORITY = [
  "Engineering & Technology",
  "Computing, AI & Data",
  "Business & Management",
  "Law",
  "Medicine & Health",
  "Economics",
  "Sciences & Mathematics",
  "Social Sciences & Policy",
  "Arts & Humanities",
  "Education",
  "Architecture & Design",
  "Agriculture & Forestry",
];

/** The areas a card shows, in the board's chip order, most important first. */
export function chipAreasOf(row) {
  const have = new Set(areasOf(row));
  return CHIP_PRIORITY.filter((a) => have.has(a));
}

// ── Flags for countries that have no country guide ───────────────────
// The browse cards take their flag from ABROAD_COUNTRIES, which is the 56
// country GUIDES. 15 of the 51 countries in abroad100.js have QS-ranked
// universities but no guide, so they resolved to nothing.
//
// That was invisible until now: the block only ever rendered the top four
// cards, and all four have guides. Expanding to all 51 — which is what the
// board does — puts every one of these on screen, and the board draws a
// real flag on each.
//
// A guide is editorial and these are not; this is just the country's flag,
// so it belongs here rather than as 15 stub guides.
export const EXTRA_FLAGS = {
  "Bangladesh": "🇧🇩", "Colombia": "🇨🇴", "Ghana": "🇬🇭", "Hong Kong SAR": "🇭🇰",
  "Indonesia": "🇮🇩", "Kenya": "🇰🇪", "Morocco": "🇲🇦", "Nigeria": "🇳🇬",
  "Pakistan": "🇵🇰", "Philippines": "🇵🇭", "Qatar": "🇶🇦", "Sri Lanka": "🇱🇰",
  "Taiwan": "🇹🇼", "Türkiye": "🇹🇷", "United Arab Emirates": "🇦🇪",
};

// ── The board's own numbers, as check-digits ─────────────────────────
const BOARD_COUNTS = {
  "Sciences & Mathematics": 90,
  "Computing, AI & Data": 85,
  "Engineering & Technology": 83,
  "Social Sciences & Policy": 79,
  "Arts & Humanities": 78,
  "Business & Management": 77,
  "Law": 75,
  "Medicine & Health": 75,
  "Education": 53,
  "Architecture & Design": 39,
  "Economics": 38,
  "Agriculture & Forestry": 19,
};
const BOARD_FUNDING = { Public: 83, Private: 17 };

// Dev-only: a mis-filed subject moves a total, and a total that no longer
// matches the design is a bug the build would otherwise never see.
if (import.meta.env?.DEV) {
  const problems = [];

  SUBJECT_AREAS.forEach((area) => {
    const n = ABROAD_100.filter((r) => areasOf(r).includes(area)).length;
    if (n !== BOARD_COUNTS[area]) problems.push(`${area}: ${n} ≠ board ${BOARD_COUNTS[area]}`);
  });

  FUNDING_KINDS.forEach((kind) => {
    const n = ABROAD_100.filter((r) => fundingOf(r) === kind).length;
    if (n !== BOARD_FUNDING[kind]) problems.push(`funding ${kind}: ${n} ≠ board ${BOARD_FUNDING[kind]}`);
  });

  // Every raw subject must be filed somewhere, or a new row's subject could
  // silently belong to no area and vanish from every browse surface.
  const filed = new Set(Object.values(AREA_MEMBERS).flat());
  const orphans = [...new Set(ABROAD_100.flatMap((r) => r.subjects))].filter((s) => !filed.has(s));
  if (orphans.length) problems.push(`unmapped subjects: ${orphans.join(", ")}`);

  const uncategorised = ABROAD_100.filter((r) => areasOf(r).length === 0);
  if (uncategorised.length) problems.push(`${uncategorised.length} universities in no subject area`);

  // Every country on a browse card needs a flag. This went unnoticed for
  // two releases because only the top four were ever rendered — assert
  // across all of them, not the preview.
  const guided = new Set(ABROAD_COUNTRIES.map((c) => c.qsKey || c.name).filter(Boolean));
  const flagless = [...new Set(ABROAD_100.map((r) => r.country))]
    .filter((name) => !guided.has(name) && !EXTRA_FLAGS[name]);
  if (flagless.length) problems.push(`countries with no flag: ${flagless.join(", ")}`);

  // The six cards whose chips were read off the board, verbatim. These pin
  // CHIP_PRIORITY: reorder it and at least one of these stops matching.
  const CARD_CHIPS = {
    "Massachusetts Institute of Technology (MIT)": ["Engineering & Technology", "Computing, AI & Data", "Business & Management", "Economics"],
    "Stanford University": ["Engineering & Technology", "Computing, AI & Data", "Business & Management", "Law"],
    "Imperial College London": ["Engineering & Technology", "Computing, AI & Data", "Business & Management", "Medicine & Health"],
    "University of Oxford": ["Business & Management", "Law", "Medicine & Health", "Sciences & Mathematics"],
    "University of Cambridge": ["Engineering & Technology", "Computing, AI & Data", "Business & Management", "Law"],
    "California Institute of Technology (Caltech)": ["Engineering & Technology", "Computing, AI & Data", "Sciences & Mathematics"],
  };
  Object.entries(CARD_CHIPS).forEach(([name, expected]) => {
    const row = ABROAD_100.find((r) => r.name === name);
    if (!row) return problems.push(`chip check: "${name}" is not in the dataset`);
    const got = chipAreasOf(row).slice(0, 4);
    if (got.join(" | ") !== expected.join(" | ")) {
      problems.push(`chips for ${name}:\n      got      ${got.join(" | ")}\n      board    ${expected.join(" | ")}`);
    }
  });

  if (problems.length) {
    console.error("[abroadFacets] mapping disagrees with the board:\n  " + problems.join("\n  "));
  }
}
