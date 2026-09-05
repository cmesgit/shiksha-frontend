/**
 * directoryOptions.js — the single source of truth for the expert directory's
 * filter vocabulary, and the URL <-> filter-state translation.
 *
 * Lifted out of the old FilterSidebar.jsx / SkillBrowsePage.jsx pair during the
 * v2 redesign so the rail, the removable chips, the mobile sheet and the page
 * all agree. MODE_TEXT in particular used to be declared twice (FilterSidebar
 * and ExpertRow) with no link between them.
 *
 * Every value here is checked against what the backend actually accepts —
 * skills/directory_views.py ExpertListView.get. Adding an option that the API
 * does not understand fails silently: unknown `sort` values fall back to
 * `recommended` and unknown `mode` values fall through to "no filter", so the
 * UI would look like it worked while ignoring the click.
 */

/** Backend enum values — skills/models.py ExpertProfile.class_mode. */
export const MODE_TEXT = {
  online: "Online only",
  home:   "At the teacher's place",
  travel: "Travels to the learner",
};

export const MODES = [
  ["all",    "Any mode"],
  ["online", MODE_TEXT.online],
  ["home",   MODE_TEXT.home],
  ["travel", MODE_TEXT.travel],
];

/* Districts are no longer hardcoded.
 *
 * They used to be Mizoram's eight, with a comment saying that would do until
 * `/skill/districts/` existed. That made the page's "verified experts from
 * across India" copy undeliverable: an expert in Assam was reachable by search
 * but could never be found through the location filter. `GET /skill/locations/`
 * now returns the states and districts the roster is actually in, and the rail
 * cascades state -> district off it. See skillApi.fetchDirectoryLocations. */

export const LANGS = ["Mizo", "English", "Hindi"];

export const RATINGS = [[0, "Any"], [4, "4.0+"], [4.5, "4.5+"], [4.8, "4.8+"]];

export const EXPERIENCE = [
  [0,  "Any experience"],
  [2,  "2+ years"],
  [5,  "5+ years"],
  [10, "10+ years"],
];

/* Matches skills/directory_views.py's _ORDER keys 1:1. The design's dropdown
   showed four; all seven the backend supports are offered, since a <select>
   costs nothing visually to extend. */
export const SORTS = [
  ["recommended", "Recommended"],
  ["rating",      "Highest rated"],
  ["sessions",    "Most sessions"],
  ["price_asc",   "Price: low to high"],
  ["price_desc",  "Price: high to low"],
  ["experience",  "Most experienced"],
  ["newest",      "Newest"],
];

/** Doubles as the slider's max and the "no maximum" sentinel. */
export const PRICE_ANY = 2000;

export const DEFAULT_FILTERS = {
  cat: "all", mode: "all", state: "all", district: "all", pincode: "",
  priceMax: PRICE_ANY, lang: "", minRating: 0, minExp: 0,
  hasVideo: false, availWeek: false,
};

/** How many filters sit away from their default — the mobile button's badge. */
export function activeFilterCount(f) {
  return [
    f.cat !== "all", f.mode !== "all", f.state !== "all", f.district !== "all",
    !!f.pincode, f.priceMax < PRICE_ANY, !!f.lang, !!f.minRating, !!f.minExp,
    f.hasVideo, f.availWeek,
  ].filter(Boolean).length;
}

/** Filters -> query params. Anything sitting at its default is omitted. */
export function toParams(f, search, sort) {
  const p = {};
  if (search.trim())          p.search         = search.trim();
  if (f.cat !== "all")        p.cat            = f.cat;
  if (f.mode !== "all")       p.mode           = f.mode;
  /* Both are accepted by ExpertListView, and both OR in online experts —
     someone teaching online is reachable from anywhere, so a location filter
     narrows the in-person roster without hiding them. */
  if (f.state !== "all")      p.state          = f.state;
  if (f.district !== "all")   p.district       = f.district;
  if (f.pincode)              p.pincode        = f.pincode;
  if (f.priceMax < PRICE_ANY) p.price_max      = f.priceMax;
  if (f.lang)                 p.lang           = f.lang;
  if (f.minRating)            p.min_rating     = f.minRating;
  if (f.minExp)               p.min_experience = f.minExp;
  if (f.hasVideo)             p.has_video      = 1;
  if (f.availWeek)            p.available_week = 1;
  if (sort !== "recommended") p.sort           = sort;
  return p;
}

/** URL -> filters, so a pasted filtered directory comes back the same. */
export function fromUrl(sp) {
  const num = (k, d) => (sp.get(k) != null ? Number(sp.get(k)) : d);
  return {
    cat:       sp.get("cat") || "all",
    mode:      sp.get("mode") || "all",
    state:     sp.get("state") || "all",
    district:  sp.get("district") || "all",
    pincode:   sp.get("pincode") || "",
    priceMax:  num("price_max", PRICE_ANY),
    lang:      sp.get("lang") || "",
    minRating: num("min_rating", 0),
    minExp:    num("min_experience", 0),
    hasVideo:  sp.get("has_video") === "1",
    availWeek: sp.get("available_week") === "1",
  };
}

/** The price slider's own label, and the copy the design specifies for it. */
export function priceLabel(v) {
  if (v >= PRICE_ANY) return "Any price";
  if (v === 0) return "Free only";
  return `₹${v} or less`;
}
