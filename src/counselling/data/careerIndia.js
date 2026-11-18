/**
 * src/counselling/data/careerIndia.js
 *
 * The facet layer for /counselling/india's "Explore careers" tab.
 *
 * ── Why this file exists ─────────────────────────────────────────────
 * `careerDetail.js` already holds the thirty careers with real editorial
 * content (overview, job roles, salary bands, recruiters, progression).
 * What it does NOT hold is anything to filter or sort BY: the design board
 * puts a stream chip row, an interest-area rail, a subjects line and a
 * course / entrance-exam / starting-salary strip on every card, and
 * `stream`, `interestArea`, `subjects`, `course` and `entranceExam` are
 * present on 0 of 30 records there.
 *
 * Those five columns are transcribed here from the board itself
 * (`docs/STUDY_IN_INDIA_BOARD.md`), one row per career, joined to
 * `CAREER_DETAIL` on `key`. Keeping them in a separate module means the
 * editorial file stays the single source for prose and this stays the
 * single source for facets — and a future CMS can replace this file
 * wholesale without touching the other.
 *
 * ── Two traps, both found by checking rather than assuming ───────────
 *
 * 1. `streams` is an EXPLICIT list, not something derivable from the
 *    `subjects` string. The board excludes "Finance & Accounting" from
 *    Science (PCB) even though its subjects line reads "Any stream (Maths
 *    preferred)", and it INCLUDES "Environmental Science" in Arts even
 *    though its line reads "Science (PCB/PCM) for B.Sc". Both were
 *    resolved by driving the board's own filters. Deriving from the text
 *    reproduces neither.
 *
 * 2. `salary` is its own field, NOT `CAREER_DETAIL[key].salaryFresher`.
 *    19 of 30 are identical, and the other 11 are the same figure with a
 *    trailing qualifier dropped — "₹6–10 LPA" on the board vs "₹6–10 LPA
 *    (after MBBS + housejob)" in the data. But the rule is not "strip the
 *    parenthetical": Sports keeps its whole "(non-athlete roles); athlete
 *    pay varies enormously" tail. Deriving would have quietly rewritten
 *    eleven cards, so the board's thirty strings are stored verbatim.
 *
 * Array order IS the board's "Most popular" sort. It is not the key order
 * of `careerDetail.js`, so it cannot be recovered from that file.
 */

/** Stream chips, in board order. `all` is the default and filters nothing. */
export const STREAMS = [
  ["all", "All streams"],
  ["pcm", "Science (PCM)"],
  ["pcb", "Science (PCB)"],
  ["commerce", "Commerce"],
  ["arts", "Arts / Humanities"],
];

/** Interest areas, in board order. The sidebar renders exactly these nine. */
export const INTEREST_AREAS = [
  "Computers & data",
  "Engineering & building",
  "Health & life sciences",
  "Business & money",
  "Law, government & defence",
  "Creative, design & media",
  "Teaching & research",
  "Nature & environment",
  "Sports, travel & hospitality",
];

/** Every stream — spelled out so a row reads as a deliberate list. */
const ALL = ["pcm", "pcb", "commerce", "arts"];

/**
 * `key`    joins to CAREER_DETAIL (and to the /counselling/careers/:key route)
 * `label`  the card title as the board prints it
 * `icon`   a lucide-react component name, matched to the board's glyph
 */
export const CAREER_INDIA = [
  {
    key: "Engineering", label: "Engineering", icon: "Wrench",
    area: "Engineering & building",
    subjects: "Physics + Maths (+ Chemistry)",
    course: "B.Tech / B.E.", exam: "JEE Main, JEE Advanced",
    salary: "₹4–8 LPA", streams: ["pcm"],
  },
  {
    key: "Medical", label: "Medicine (Doctor)", icon: "Activity",
    area: "Health & life sciences",
    subjects: "Physics + Chemistry + Biology",
    course: "MBBS", exam: "NEET UG",
    salary: "₹6–10 LPA", streams: ["pcb"],
  },
  {
    key: "IT", label: "IT & Software", icon: "Monitor",
    area: "Computers & data",
    subjects: "Maths (PCM for B.Tech)",
    course: "B.Tech CSE / BCA", exam: "JEE Main, CUET UG",
    salary: "₹4–12 LPA", streams: ["pcm", "commerce"],
  },
  {
    key: "Data Science", label: "Data Science", icon: "LineChart",
    area: "Computers & data",
    subjects: "Maths",
    course: "B.Sc / B.Tech Data Science", exam: "CUET UG, JEE Main",
    salary: "₹6–14 LPA", streams: ["pcm", "commerce"],
  },
  {
    key: "Business", label: "Business & Management", icon: "Briefcase",
    area: "Business & money",
    subjects: "Any stream",
    course: "BBA, then MBA", exam: "CUET UG, IPMAT (CAT later)",
    salary: "₹4–8 LPA", streams: ALL,
  },
  {
    key: "Law", label: "Law", icon: "Scale",
    area: "Law, government & defence",
    subjects: "Any stream",
    course: "BA LLB (5 years)", exam: "CLAT, AILET",
    salary: "₹5–15 LPA", streams: ALL,
  },
  {
    // Excluded from PCB on the board despite "Any stream" — see the header.
    key: "Finance", label: "Finance & Accounting", icon: "DollarSign",
    area: "Business & money",
    subjects: "Any stream (Maths preferred)",
    course: "B.Com / CA", exam: "CA Foundation, CUET UG",
    salary: "₹5–12 LPA", streams: ["pcm", "commerce", "arts"],
  },
  {
    key: "AI", label: "Artificial Intelligence", icon: "Atom",
    area: "Computers & data",
    subjects: "Physics + Maths (PCM)",
    course: "B.Tech AI & ML", exam: "JEE Main",
    salary: "₹8–18 LPA", streams: ["pcm"],
  },
  {
    key: "Design", label: "Design", icon: "Palette",
    area: "Creative, design & media",
    subjects: "Any stream",
    course: "B.Des", exam: "NID DAT, UCEED, NIFT",
    salary: "₹4–10 LPA", streams: ALL,
  },
  {
    key: "Civil Services", label: "Civil Services (IAS/IPS)", icon: "Landmark",
    area: "Law, government & defence",
    subjects: "Any stream",
    course: "Any graduate degree", exam: "UPSC Civil Services",
    salary: "₹56,100/month basic", streams: ALL,
  },
  {
    key: "Psychology", label: "Psychology", icon: "Lightbulb",
    area: "Health & life sciences",
    subjects: "Any stream",
    course: "BA / B.Sc Psychology", exam: "CUET UG",
    salary: "₹3–7 LPA", streams: ALL,
  },
  {
    key: "Architecture", label: "Architecture", icon: "LayoutGrid",
    area: "Engineering & building",
    subjects: "Physics + Maths (compulsory)",
    course: "B.Arch (5 years)", exam: "NATA, JEE Main Paper 2",
    salary: "₹4–8 LPA", streams: ["pcm"],
  },
  {
    key: "Pharmacy", label: "Pharmacy", icon: "FlaskConical",
    area: "Health & life sciences",
    subjects: "Physics + Chemistry + Maths or Biology",
    course: "B.Pharm", exam: "State CETs, CUET UG",
    salary: "₹3–6 LPA", streams: ["pcm", "pcb"],
  },
  {
    key: "Cybersecurity", label: "Cybersecurity", icon: "Lock",
    area: "Computers & data",
    subjects: "Maths (PCM for B.Tech)",
    course: "B.Tech / BCA (Cyber Security)", exam: "JEE Main, CUET UG",
    salary: "₹5–10 LPA", streams: ["pcm", "commerce"],
  },
  {
    key: "Media", label: "Media & Journalism", icon: "Mic",
    area: "Creative, design & media",
    subjects: "Any stream",
    course: "BA Journalism & Mass Comm.", exam: "CUET UG",
    salary: "₹3–7 LPA", streams: ALL,
  },
  {
    key: "Government Jobs", label: "Government Jobs", icon: "FileText",
    area: "Law, government & defence",
    subjects: "Any stream",
    course: "Class 12 or any degree", exam: "SSC, banking, railway exams",
    salary: "₹25,000–55,000/month + DA + perks", streams: ALL,
  },
  {
    key: "Defence", label: "Defence Services", icon: "Shield",
    area: "Law, government & defence",
    subjects: "Any stream (PCM for Air Force & Navy)",
    course: "NDA or any degree", exam: "NDA, CDS, AFCAT",
    salary: "₹56,100–67,700/month", streams: ALL,
  },
  {
    key: "Teaching", label: "Teaching", icon: "BookOpen",
    area: "Teaching & research",
    subjects: "Any stream",
    course: "Graduation + B.Ed", exam: "CTET, state TETs",
    salary: "₹3–6 LPA", streams: ALL,
  },
  {
    key: "Biotechnology", label: "Biotechnology", icon: "Layers",
    area: "Health & life sciences",
    subjects: "Physics + Chemistry + Biology or Maths",
    course: "B.Tech / B.Sc Biotechnology", exam: "JEE Main, CUET UG",
    salary: "₹3–8 LPA", streams: ["pcm", "pcb"],
  },
  {
    key: "Hotel Management", label: "Hotel Management", icon: "Hotel",
    area: "Sports, travel & hospitality",
    subjects: "Any stream (with English)",
    course: "BHM / B.Sc Hospitality", exam: "NCHM JEE",
    salary: "₹3–6 LPA", streams: ALL,
  },
  {
    key: "Aviation", label: "Aviation (Pilot)", icon: "Navigation",
    area: "Sports, travel & hospitality",
    subjects: "Physics + Maths",
    course: "Commercial Pilot Licence training", exam: "DGCA medical + CPL exams",
    salary: "₹8–15 LPA", streams: ["pcm"],
  },
  {
    key: "Animation", label: "Animation & VFX", icon: "Eye",
    area: "Creative, design & media",
    subjects: "Any stream",
    course: "B.Sc / BA Animation", exam: "Portfolio or institute test",
    salary: "₹3–7 LPA", streams: ALL,
  },
  {
    key: "Fashion", label: "Fashion", icon: "PenTool",
    area: "Creative, design & media",
    subjects: "Any stream",
    course: "B.Des Fashion", exam: "NIFT entrance",
    salary: "₹3–7 LPA", streams: ALL,
  },
  {
    key: "Entrepreneurship", label: "Entrepreneurship", icon: "Rocket",
    area: "Business & money",
    subjects: "Any stream",
    course: "BBA or any degree", exam: "No single exam",
    salary: "Variable — equity is the currency early on", streams: ALL,
  },
  {
    key: "Research", label: "Research & Science", icon: "Lightbulb",
    area: "Teaching & research",
    subjects: "Science (2+ of P, C, M, B)",
    course: "BS-MS / B.Sc, then PhD", exam: "IISER IAT, NEST, CUET UG",
    salary: "₹3.5–5 LPA", streams: ["pcm", "pcb"],
  },
  {
    key: "Agriculture", label: "Agriculture", icon: "Leaf",
    area: "Nature & environment",
    subjects: "Physics + Chemistry + Biology or Maths",
    course: "B.Sc Agriculture", exam: "CUET UG (ICAR seats)",
    salary: "₹3–7 LPA", streams: ["pcm", "pcb"],
  },
  {
    // In Arts on the board; Agriculture is not. Verified, not inferred.
    key: "Environment", label: "Environmental Science", icon: "Globe",
    area: "Nature & environment",
    subjects: "Science (PCB/PCM) for B.Sc",
    course: "B.Sc Environmental Science", exam: "CUET UG",
    salary: "₹3–7 LPA", streams: ["pcm", "pcb", "arts"],
  },
  {
    key: "Sports", label: "Sports", icon: "Target",
    area: "Sports, travel & hospitality",
    subjects: "Any stream",
    course: "B.P.Ed / Sports science", exam: "University test + trials",
    salary: "₹2–6 LPA (non-athlete roles); athlete pay varies enormously",
    streams: ALL,
  },
  {
    key: "Fine Arts", label: "Fine Arts", icon: "Star",
    area: "Creative, design & media",
    subjects: "Any stream",
    course: "BFA", exam: "University entrance / portfolio",
    salary: "₹2–5 LPA", streams: ALL,
  },
  {
    key: "Music", label: "Music", icon: "Music",
    area: "Creative, design & media",
    subjects: "Any stream",
    course: "BA / B.Mus Music", exam: "Audition / CUET UG",
    salary: "₹2–5 LPA", streams: ALL,
  },
];

/**
 * The board prints a count beside every interest area, and it recomputes
 * them when a stream is picked. That is 45 numbers the design hands us as
 * check-digits, so they are asserted here rather than trusted.
 *
 * Mutation-checked: moving Finance into `pcb` reports
 * `Business & money/pcb: 3 ≠ 2`, and dropping `arts` from Environment
 * reports `Nature & environment/arts: 0 ≠ 1`. An assertion nobody has
 * seen fail is not an assertion.
 */
const BOARD_COUNTS = {
  //                              all pcm pcb com arts
  "Computers & data":             [4, 4, 0, 3, 0],
  "Engineering & building":       [2, 2, 0, 0, 0],
  "Health & life sciences":       [4, 3, 4, 1, 1],
  "Business & money":             [3, 3, 2, 3, 3],
  "Law, government & defence":    [4, 4, 4, 4, 4],
  "Creative, design & media":     [6, 6, 6, 6, 6],
  "Teaching & research":          [2, 2, 2, 1, 1],
  "Nature & environment":         [2, 2, 2, 0, 1],
  "Sports, travel & hospitality": [3, 3, 2, 2, 2],
};

export function countsFor(stream) {
  const out = {};
  INTEREST_AREAS.forEach((a) => { out[a] = 0; });
  CAREER_INDIA.forEach((c) => {
    if (stream === "all" || c.streams.includes(stream)) out[c.area] += 1;
  });
  return out;
}

if (import.meta.env?.DEV) {
  const problems = [];
  if (CAREER_INDIA.length !== 30) {
    problems.push(`CAREER_INDIA has ${CAREER_INDIA.length} rows, board has 30`);
  }
  const orphan = CAREER_INDIA.filter((c) => !INTEREST_AREAS.includes(c.area));
  if (orphan.length) problems.push(`unknown interest area: ${orphan.map((c) => c.key).join(", ")}`);

  ["all", "pcm", "pcb", "commerce", "arts"].forEach((stream, i) => {
    const got = countsFor(stream);
    INTEREST_AREAS.forEach((area) => {
      const want = BOARD_COUNTS[area][i];
      if (got[area] !== want) problems.push(`${area}/${stream}: ${got[area]} ≠ board ${want}`);
    });
  });

  if (problems.length) {
    console.error("[careerIndia] board check-digits failed:\n  " + problems.join("\n  "));
  }
}
