// PLACEMENT: src/counselling/data/careerFullSynth.js
//
// Builds a CAREER_FULL-shaped object for the careers that have no hand-written
// one, so /counselling/careers/<key> opens for all thirty instead of the
// "No detailed page for this career yet" dead end.
//
// 🔴 WHY THIS EXISTS, AND WHY IT IS NOT THE THING THAT WAS REFUSED BEFORE
//
// CareerDetailPage.jsx's header used to argue that the other twenty-four
// should stay closed, because the v3 prototype filled them with generated
// filler that "reads as content but tells a student nothing". That judgement
// was right about ONE tab and too broad about the rest. Driving the board's
// Artificial Intelligence and Fashion Design screens (neither is one of the
// six) settled what it actually ships for a thin career:
//
//   Jobs & Salary     100% real — salary bands, roles, recruiters,
//                     progression and certifications are all in CAREER_DETAIL
//   Specialisations   real — jobRoles + jobRoleDescs
//   Overview          overview + demandNote are real; day-in-the-life,
//                     why-it-works and worth-knowing are generic ON THE BOARD
//                     TOO, with the career name interpolated
//   Exams & Prep      generic apart from the exam names — but NON-COMMITTAL,
//                     not false: every exam reads "by Respective authority",
//                     seats "Varies by institution", badged "Varies". It
//                     asserts nothing a student could be misled by.
//   Colleges          NOT SYNTHESISED. See below.
//
// The generic strings below are transcribed VERBATIM from the board, not
// written here — matching the design is the point.
//
// 🔴 COLLEGES IS DELIBERATELY ABSENT AND MUST STAY ABSENT UNTIL THE DATA LANDS
//
// The board's Colleges tab is a CURATED per-career list, not a query. Fashion
// Design lists NIFT Delhi / Mumbai / Bengaluru and NID Ahmedabad, each badged
// "Specialist institute (outside NIRF Overall list)" — by the board's own
// admission these are not in NIRF Overall, so nirf980.js CANNOT reproduce it.
// Its source is `data/careerColleges.js` (139,120 bytes) in the design
// project, which is absent from this repo; the artifact manifest lists it but
// its bytes are not fetchable.
//
// Synthesising it would mean inventing institution names, admission routes and
// official-website links for students deciding where to apply. We return an
// empty list instead, and CareerDetailPage drops the Colleges tab for that
// career. When careerColleges.js is exported, drop it in and map it onto
// `colleges` here — nothing else needs to change.

import { CAREER_DETAIL } from "./careerDetail";
import { CAREER_INDIA } from "./careerIndia";

const byKey = (k) => CAREER_INDIA.find((c) => c.key === k) || null;

// Verbatim from the board's Overview tab. "{title}" is the only thing that
// varies between careers there — checked on both AI and Fashion Design.
const DAY_IN_LIFE = (title) => [
  `A typical day varies a lot by specific role and specialisation within ${title}.`,
  "Early career tends to involve more hands-on execution and supervision; senior roles shift toward planning, review and mentoring.",
  "Most fields mix focused individual work with regular check-ins, reviews or client/patient/case interactions.",
  "Continuous learning — new tools, regulations or techniques — is a standing part of staying current.",
];

const PROS = [
  "Established, well-understood path with clear entrance routes",
  "Multiple specialisations to match different interests and strengths",
  "Transferable skills that hold value across related roles",
];

const CONS = [
  "Requires sustained exam or skill preparation to enter competitive segments",
  "Outcomes vary significantly by institute or specialisation chosen",
  "Early-career compensation can be modest before specialisation kicks in",
];

// Verbatim from the board's Exams & Prep tab. Every value here is explicitly
// an "ask the authority" placeholder — that is the design's own stance, and
// it is why shipping it does not assert anything false.
const PREP_TIPS = [
  "Solve 5–10 years of previous year question papers",
  "Join a test series for timed mock practice",
  "Build the key skills early — they differentiate candidates at interviews",
  "Talk to a counsellor to build a plan specific to your profile and target colleges",
];

// "JEE Main, JEE Advanced" → ["JEE Main", "JEE Advanced"].
// Splits on commas and the slash used by "B.Tech / B.E."-style exam strings,
// then drops parentheticals like "(CAT later)" which are notes, not exams.
function examNamesFrom(indiaRow) {
  const raw = (indiaRow?.exam || "").trim();
  if (!raw || /^no single exam$/i.test(raw)) return [];
  return raw
    .split(/\s*,\s*/)
    .map((s) => s.replace(/\s*\([^)]*\)\s*/g, " ").trim())
    .filter(Boolean);
}

function examsFor(indiaRow, title) {
  return examNamesFrom(indiaRow).map((name) => ({
    name,
    full: name,
    by: "Respective authority",
    level: "National / State",
    difficulty: "Varies",
    for: title,
    sessions: "Once or twice per year; check official calendar.",
    seats: "Varies by institution.",
    cutoff: "Merit-based; varies by category and institution.",
    eligibility: "Class 12 pass with required subjects (check official website for current criteria).",
    pattern: "Varies by exam — check the official website for the latest pattern and marking scheme.",
    tip: "Register on the official website early. Solve 5–10 years of previous papers and join a test series.",
  }));
}

// The board's Specialisations tab for a thin career is the career's own job
// roles, each with its one-line description — real per-career content, not
// filler. jobRoleDescs is keyed by role name; a role with no description
// still renders (the board shows the name and a Details affordance).
function branchesFor(detail) {
  const roles = detail?.jobRoles || [];
  const descs = detail?.jobRoleDescs || {};
  return roles.map((name) => ({
    name,
    about: descs[name] || "",
    subjects: [],
  }));
}

/**
 * A CAREER_FULL-shaped object for a career that has no hand-written one.
 * Returns null for an unknown key so the caller can still 404 properly.
 */
export function synthCareerFull(careerKey) {
  const detail = CAREER_DETAIL[careerKey];
  if (!detail) return null;
  const indiaRow = byKey(careerKey);
  const title = indiaRow?.label || careerKey;

  return {
    synthesised: true,
    // No tagline: the board's lead line ("For Science stream students who
    // enjoy mathematics and programming.") is built from the stream plus a
    // per-career "skills to build" list we do not have. Deriving it would be
    // writing copy, so the field is left empty and the page omits the line.
    tagline: "",
    intro: detail.overview || "",
    outlook: detail.demandNote || "",
    branches: branchesFor(detail),
    exams: examsFor(indiaRow, title),
    // No admissionSteps: the board's are per-career and researched.
    admissionSteps: [],
    prepGuide: { tips: PREP_TIPS },
    // 🔴 Intentionally empty — see the header. Do not fill this in from
    // nirf980.js; the board's list is curated and includes institutes that
    // are not in NIRF Overall at all.
    colleges: [],
    salaryTable: [
      {
        branch: title,
        fresher: detail.salaryFresher || "",
        mid: detail.salaryMid || "",
        senior: detail.salarySenior || "",
      },
    ].filter((r) => r.fresher || r.mid || r.senior),
    dayInLife: DAY_IN_LIFE(title),
    pros: PROS,
    cons: CONS,
  };
}

/** True when this career's detail page is built from synthesised scaffolding. */
export function isSynthesised(full) {
  return !!full && full.synthesised === true;
}
