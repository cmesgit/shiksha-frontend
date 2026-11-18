// PLACEMENT: src/counselling/data/nirfFacets.js   (NEW FILE)
//
// Small shared helpers over nirf980.js, extracted out of
// AdmissionIndiaAllPage.jsx once AdmissionIndiaDetailPage.jsx and
// AdmissionIndiaComparePage.jsx needed the same rank/fee logic — same
// reasoning as abroadFacets.js centralising abroad100.js helpers rather
// than letting each new screen re-derive them.

export const csv = (v) => (v ? String(v).split(",").map((s) => s.trim()).filter(Boolean) : []);

// A NIRF rank is EITHER a position (number) OR a band (string, "101-150").
// NIRF ranks the top ~100 of each list individually and bands the rest, so
// 576 of the 980 carry at least one band. The two must never be flattened
// into one another: a band is a range the institution sits somewhere inside,
// and printing "#101" for "101-150" would invent a position it never held.
export const rankStart = (v) =>
  v === undefined ? Infinity : typeof v === "number" ? v : parseInt(v, 10);
export const rankLabel = (v) =>
  v === undefined ? "—" : typeof v === "number" ? `#${v}` : `#${v.replace("-", "–")}`;
export const isBand = (v) => typeof v === "string";

export const FEE_TEXT = {
  verified: "Fees verified from official documents",
  source_found: "Fee source found — values not verified",
  not_verified: "Fees not verified for this edition",
};

// Same derivation idea as abroadFacets.js's countrySlug/uniSlug — EXCEPT
// nirf980.js is 980 rows (vs abroad100's checked-unique 100), and a few
// names collide closely enough ("Andhra University" variants, multiple
// campuses sharing a root name) that a name-derived slug cannot be trusted
// unique without re-deriving per build. `listRank` is already a unique,
// stable integer (the directory's own ordering) — use that as the route
// param instead of inventing a slug.
export const rankParam = (r) => String(r.listRank);
