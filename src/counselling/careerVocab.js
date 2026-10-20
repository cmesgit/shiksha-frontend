// PLACEMENT: src/counselling/careerVocab.js   (NEW FILE — landing/frontend app)
//
// The bridge between TWO career vocabularies that do not overlap.
//
// The v3 career content (data/careerDetail.js, data/careerFullDetail.js) is
// keyed on short nouns — "Engineering", "IT", "Medical". The backend seeds a
// different, longer vocabulary into counseling.Specialization
// (counseling/migrations/0002_seed.py:13) — "Engineering Careers",
// "Computer Science & IT", "Medicine & Health Sciences". Of the 20 seeded
// names only "Law" and "Entrepreneurship" match a content key exactly.
//
// Those seeded names are WIRE VALUES, not labels: they are the counsellor
// matching vocabulary, the directory filter, the profile wizard's chips, and
// the keys of INTEREST_PATHS in careerPath.js. Renaming the rows to match the
// content would silently rebreak matching for every existing intake. So the
// two vocabularies stay as they are and meet here instead.
//
// Several seeded specializations are not careers at all ("Study Abroad",
// "Career Discovery") and deliberately map to null.

// NO data import here, deliberately. This module is pulled in by MyPathPage
// just to decide whether to render one link; importing the content modules
// made that a 123 kB chunk on a screen that renders none of it. The two key
// lists below are the stable published vocabulary (the spec's 30 SPECS, and
// the six careers with deep content). CareerDetailPage imports the real data
// and asserts these lists still match it in dev — see assertVocabInSync().

const DETAIL_KEYS = new Set([
  "Engineering", "Medical", "IT", "AI", "Cybersecurity", "Data Science",
  "Business", "Finance", "Entrepreneurship", "Hotel Management",
  "Government Jobs", "Defence", "Teaching", "Design", "Law", "Civil Services",
  "Agriculture", "Aviation", "Animation", "Fashion", "Architecture", "Media",
  "Research", "Psychology", "Pharmacy", "Biotechnology", "Environment",
  "Sports", "Fine Arts", "Music",
]);

const FULL_KEYS = ["Engineering", "Medical", "IT", "Business", "Law", "Civil Services"];

// Seeded Specialization.name → CAREER_DETAIL key (null = not a career)
const SPEC_TO_CAREER = {
  "Computer Science & IT": "IT",
  "Engineering Careers": "Engineering",
  "Technology": "IT",
  "Medicine & Health Sciences": "Medical",
  "Commerce & Finance": "Finance",
  "Business & Management": "Business",
  "Entrepreneurship": "Entrepreneurship",
  "Design & Creative Careers": "Design",
  "Media & Communication": "Media",
  "Civil Services & Government Exams": "Civil Services",
  "Defence & Armed Forces": "Defence",
  "Law": "Law",
  "Education & Teaching": "Teaching",
  "Sports & Fitness Careers": "Sports",

  // Not careers — these are services, stages, or umbrellas spanning many
  // careers. A path card built from one of them has nothing specific to link
  // to, which is the correct outcome rather than a mis-linked page.
  "University Admissions": null,
  "Study Abroad": null,
  "Vocational & Skill Careers": null,
  "Stream Selection (Class 9–10)": null,
  "Career Discovery": null,
  // Deliberately null, not "Fine Arts": this umbrella covers history,
  // sociology, literature and psychology, while "Fine Arts" in CAREER_DETAIL
  // is the specific painting/sculpture/performing-arts career. Mapping them
  // together would send a prospective historian to a page about studio art.
  "Arts & Humanities": null,
};

// careerPath.js's path titles are a THIRD vocabulary — it groups several
// specializations under one card heading. Most titles happen to equal their
// seeded name and resolve through SPEC_TO_CAREER above; only the ones that
// differ need an entry here. Verified against the actual `title:` values in
// careerPath.js — do not add from memory, several are near-misses
// ("Design & Creative" vs the seeded "Design & Creative Careers").
const PATH_TITLE_TO_CAREER = {
  "Software & Technology": "IT",
  "Design & Creative": "Design",
  "Civil Services & Government": "Civil Services",
  // Stage card, not a career — the Class 9–10 "choose a stream first" entry.
  "First: choose the right stream": null,
  // Same umbrella reasoning as "Arts & Humanities" above.
  "Humanities & Social Sciences": null,
};

/**
 * Resolve any name we might hold — a seeded Specialization name, a
 * careerPath path title, or an already-canonical content key — to a
 * CAREER_DETAIL key. Returns null when there is no career behind it.
 */
export function toCareerKey(name) {
  if (!name) return null;
  const raw = String(name).trim();
  if (DETAIL_KEYS.has(raw)) return raw;                     // already canonical
  if (raw in SPEC_TO_CAREER) return SPEC_TO_CAREER[raw];    // seeded vocabulary
  if (raw in PATH_TITLE_TO_CAREER) return PATH_TITLE_TO_CAREER[raw];
  return null;
}

/**
 * True only when the deep 5-tab page has REAL data for this career.
 *
 * CAREER_FULL covers six careers; CAREER_DETAIL covers thirty. The v3
 * prototype papered over the gap by generating branches, exams, admission
 * steps and prep phases from whatever it could find, which produces pages
 * full of "Varies by exam — check the official website". We would rather
 * send a student to the guide library than to a page of filler, so callers
 * gate on this before offering a link.
 */
export function hasFullDetail(name) {
  const key = toCareerKey(name);
  return !!key && FULL_KEYS.includes(key);
}

/** The six careers that currently have a real detail page. */
export function fullDetailKeys() {
  return [...FULL_KEYS];
}

// Typical entry degrees per career, as DEGREE_INFO keys (data/degreeInfo.js).
// The v3 prototype scraped these out of careerPath's "Typical degrees: "
// next-step strings; that rule engine isn't the one this app uses, so the
// list is explicit here instead. Only the six careers with a full detail
// page need an entry. Every value must be a real DEGREE_INFO key or an
// alias getDegreeInfo() resolves — there is a check for this in the page.
const CAREER_DEGREES = {
  Engineering: ["B.Tech / B.E."],
  Medical: ["MBBS", "BDS", "BAMS", "BHMS", "BPT", "Nursing"],
  IT: ["B.Tech / B.E.", "BCA", "B.Sc IT", "B.Sc Data Science"],
  Business: ["BBA", "BMS", "B.Com (Hons)"],
  Law: ["5-yr BA LLB", "BBA LLB"],
  "Civil Services": ["Any bachelor's"],
};

/** Typical entry degrees for a career, as DEGREE_INFO keys. */
export function degreesFor(name) {
  const key = toCareerKey(name);
  return (key && CAREER_DEGREES[key]) || [];
}

/**
 * Spark Finder's eight personas (workflow §5).
 *
 * Each carries TWO vocabularies on purpose, because they do different jobs:
 *
 *   careers — CAREER_DETAIL keys. What we SHOW the student, and what links
 *             through to a career detail page where one exists.
 *   specs   — seeded Specialization names. What we SAVE, because the intake
 *             endpoint takes Specialization ids and counsellor matching runs
 *             on them.
 *
 * These are listed explicitly rather than derived by reversing
 * SPEC_TO_CAREER: that map is lossy in both directions. Thirteen of the
 * careers above ("AI", "Data Science", "Research", "Biotechnology",
 * "Environment", "Animation", "Fashion", "Architecture", "Music", "Fine
 * Arts", "Psychology", "Government Jobs", "Aviation") have NO seeded
 * Specialization at all, and "IT" has two. A reverse map would quietly save
 * the wrong thing, or nothing.
 */
export const SPARK_PERSONAS = {
  tech: {
    label: "The Builder", emoji: "🛠️", stream: "Science",
    blurb: "You like understanding how things work and making them work better.",
    careers: ["Engineering", "IT", "AI", "Data Science"],
    specs: ["Engineering Careers", "Computer Science & IT", "Technology"],
  },
  science: {
    label: "The Explorer", emoji: "🔬", stream: "Science",
    blurb: "You're curious about life, nature and why things happen.",
    careers: ["Medical", "Research", "Biotechnology", "Environment"],
    specs: ["Medicine & Health Sciences"],
  },
  creative: {
    label: "The Creator", emoji: "🎨", stream: "Any",
    blurb: "You think in ideas, images and design — you love making things.",
    careers: ["Design", "Animation", "Fashion", "Architecture"],
    specs: ["Design & Creative Careers"],
  },
  media: {
    label: "The Storyteller", emoji: "🎬", stream: "Arts (Humanities)",
    blurb: "You express yourself and love reaching an audience.",
    careers: ["Media", "Music", "Fine Arts"],
    specs: ["Media & Communication", "Arts & Humanities"],
  },
  people: {
    label: "The Guide", emoji: "🤝", stream: "Arts (Humanities)",
    blurb: "You care about people and love helping them grow.",
    careers: ["Teaching", "Psychology", "Civil Services"],
    specs: ["Education & Teaching", "Civil Services & Government Exams"],
  },
  business: {
    label: "The Leader", emoji: "📈", stream: "Commerce",
    blurb: "You like organising, leading and building ventures.",
    careers: ["Business", "Finance", "Entrepreneurship"],
    specs: ["Business & Management", "Commerce & Finance", "Entrepreneurship"],
  },
  action: {
    label: "The Achiever", emoji: "🏅", stream: "Any",
    blurb: "You're energetic, disciplined and thrive on challenge.",
    careers: ["Defence", "Sports", "Aviation"],
    specs: ["Defence & Armed Forces", "Sports & Fitness Careers"],
  },
  justice: {
    label: "The Advocate", emoji: "⚖️", stream: "Arts (Humanities)",
    blurb: "You have a strong sense of fairness and speak up for it.",
    careers: ["Law", "Civil Services", "Government Jobs"],
    specs: ["Law", "Civil Services & Government Exams"],
  },
};

/**
 * Dev-only: every name in a persona's `specs` must be a real seeded
 * Specialization, or the intake save silently drops it and the student's
 * answers go nowhere. Called by SparkFinder once the live list arrives.
 */
export function assertPersonaSpecsExist(liveSpecNames) {
  if (!import.meta.env?.DEV) return;
  const live = new Set(liveSpecNames);
  const bad = Object.entries(SPARK_PERSONAS)
    .flatMap(([k, p]) => p.specs.filter((s) => !live.has(s)).map((s) => `${k}: ${s}`));
  if (bad.length) {
    console.warn("[careerVocab] SPARK_PERSONAS reference specializations that "
      + "do not exist in the live directory — these answers will be dropped.", bad);
  }
}

/**
 * Dev-only guard against the hardcoded key lists above drifting from the
 * actual content. Called by CareerDetailPage, which imports the data anyway,
 * so the check costs nothing on the screens that only import this module.
 */
export function assertVocabInSync(detailData, fullData) {
  if (!import.meta.env?.DEV) return;
  const missing = Object.keys(detailData).filter((k) => !DETAIL_KEYS.has(k));
  const extra = [...DETAIL_KEYS].filter((k) => !detailData[k]);
  const fullDrift = Object.keys(fullData).filter((k) => !FULL_KEYS.includes(k))
    .concat(FULL_KEYS.filter((k) => !fullData[k]));
  if (missing.length || extra.length || fullDrift.length) {
    console.warn("[careerVocab] key lists have drifted from the content data.",
      { missingFromVocab: missing, staleInVocab: extra, fullDrift });
  }
}
