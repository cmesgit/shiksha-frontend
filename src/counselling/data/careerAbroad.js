/**
 * src/counselling/data/careerAbroad.js
 *
 * The facet layer for /counselling/abroad's "Explore careers" tab — the
 * abroad twin of `careerIndia.js`, transcribed from the same v3 board
 * (Explore abroad → Explore careers) on 2026-11-18.
 *
 * ── Why it is a separate file and not a column on careerIndia ────────
 * Every visible field differs. The board's abroad card prints a
 * COURSE · TESTS · US MEDIAN PAY strip where India prints
 * COURSE · ENTRANCE EXAM · STARTING SALARY, and the overview, subjects
 * line, course and stream membership are all different content:
 *
 *   Engineering   India  "Physics + Maths (+ Chemistry)" · B.Tech / B.E.
 *                        · JEE Main, JEE Advanced · ₹4–8 LPA
 *                 Abroad "Maths + Physics" · BEng / BS in Engineering
 *                        · SAT, GRE General Test, IELTS/TOEFL · $101k / year
 *
 * Nothing here is derivable from the India row. Both files join to
 * `CAREER_DETAIL` on `key` for editorial prose.
 *
 * ── 🔴 29 careers, not 30 — and the board says why ───────────────────
 * Footnote under the grid, verbatim:
 *
 *   "Some careers, like Defence Services, are only open through Indian
 *    routes, so they're hidden in Study abroad. US pay figures are BLS
 *    May 2025 medians."
 *
 * So `Defence` is deliberately absent, and the pay column has a stated
 * source that must be printed with it — see PAY_SOURCE below. A first
 * pass guessed the missing career was "Government Jobs"; that was WRONG
 * (Government Jobs is present at $142k). Checked by driving the board.
 *
 * ── 🔴 `streams` is explicit, never derived ──────────────────────────
 * Same trap as India, and it bites identically here. All three ambiguous
 * cells were resolved by clicking the board's own filters, not by reading
 * the subjects line:
 *
 *   · Arts ∩ Nature & environment = Environmental Science, NOT Agriculture
 *     — despite its subjects line reading "Science preferred".
 *   · PCB ∩ Business & money excludes Finance & Accounting
 *     — despite its line reading "Maths usually needed".
 *   · Commerce ∩ Computers & data excludes Artificial Intelligence
 *     — despite its line reading plain "Maths", same as IT & Software.
 *
 * Count arithmetic alone could not settle any of the three: it says "one
 * of these is out", never which. The DEV guard at the foot of this file
 * asserts all 45 printed counts (9 areas × 5 streams).
 *
 * Array order IS the board's "Most popular" sort.
 *
 * ── ⚠ `blurb` is present on 18 of 29, deliberately ───────────────────
 * The board's card blurb is CSS-clamped to two lines. On 18 cards the
 * sentence fits and was transcribed whole; on the other 11 it is cut
 * mid-sentence with an ellipsis, so the full text is only on that career's
 * detail screen and has NOT been captured yet.
 *
 * Those 11 are left WITHOUT a blurb rather than stored truncated. The card
 * renders nothing where it is absent, which is honest; a stored fragment
 * would render as a sentence that stops dead. Do NOT fall back to
 * `CAREER_DETAIL[key].overview` — that is India-specific prose and puts
 * "India's largest…" on a Study-abroad card.
 *
 * Missing: Medical, IT, Data Science, AI, Architecture, Teaching,
 * Hotel Management, Fashion, Entrepreneurship, Environment, Sports.
 */

export const PAY_SOURCE = "US pay figures are BLS May 2025 medians.";

export const EXCLUDED_NOTE =
  "Some careers, like Defence Services, are only open through Indian routes, so they're hidden in Study abroad.";

export { STREAMS, INTEREST_AREAS } from "./careerIndia";
import { INTEREST_AREAS } from "./careerIndia";

export const CAREER_ABROAD = [
  {
    key: "Engineering", label: "Engineering", icon: "Wrench",
    area: "Engineering & building",
    subjects: "Maths + Physics",
    course: "BEng / BS in Engineering", tests: "SAT, GRE General Test, IELTS/TOEFL",
    pay: "$101k / year", streams: ["pcm"],
    blurb: "Engineering degrees abroad are usually a 3–4 year BEng/BS, followed by a 1–2 year MS or MEng.",
  },
  {
    key: "Medical", label: "Medicine (Doctor)", icon: "Activity",
    area: "Health & life sciences",
    subjects: "Biology + Chemistry",
    course: "MBBS / MBChB", tests: "NEET UG, UCAT, MCAT, IELTS/TOEFL",
    pay: "$244k / year", streams: ["pcb"],
  },
  {
    key: "IT", label: "IT & Software", icon: "Monitor",
    area: "Computers & data",
    subjects: "Maths",
    course: "BS / BSc Computer Science", tests: "SAT, GRE General Test, IELTS/TOEFL",
    pay: "$136k / year", streams: ["pcm", "commerce"],
  },
  {
    key: "Data Science", label: "Data Science", icon: "LineChart",
    area: "Computers & data",
    subjects: "Maths",
    course: "BSc Data Science / Statistics", tests: "GRE General Test, IELTS/TOEFL",
    pay: "$120k / year", streams: ["pcm", "commerce"],
  },
  {
    key: "Business", label: "Business & Management", icon: "Briefcase",
    area: "Business & money",
    subjects: "Any stream",
    course: "BBA / BSc Business", tests: "SAT, GMAT (Focus Edition), GRE General Test, IELTS/TOEFL",
    pay: "$106k / year", streams: ["pcm", "pcb", "commerce", "arts"],
    blurb: "Business abroad starts with a BBA/BSc Management after Class 12.",
  },
  {
    key: "Law", label: "Law", icon: "Scale",
    area: "Law, government & defence",
    subjects: "Any stream",
    course: "LLB (UK and others)", tests: "LNAT, LSAT, IELTS/TOEFL",
    pay: "$160k / year", streams: ["pcm", "pcb", "commerce", "arts"],
    blurb: "Law abroad differs by country: the UK offers a 3-year LLB after school, the USA a 3-year JD after a bachelor's.",
  },
  {
    key: "Finance", label: "Finance & Accounting", icon: "DollarSign",
    area: "Business & money",
    subjects: "Maths usually needed",
    course: "BSc Finance / Accounting & Finance", tests: "SAT, GMAT (Focus Edition), GRE General Test, IELTS/TOEFL",
    // Excluded from PCB on the board. Verified by filtering, not inferred.
    pay: "$103k / year", streams: ["pcm", "commerce", "arts"],
    blurb: "Finance abroad is a BSc in Finance, Accounting or Economics, or an MSc Finance / Master of Finance after a bachelor's.",
  },
  {
    key: "AI", label: "Artificial Intelligence", icon: "Atom",
    area: "Computers & data",
    subjects: "Maths",
    course: "BSc Computer Science (AI)", tests: "SAT, GRE General Test, IELTS/TOEFL",
    // PCM only — the board drops it from Commerce though IT & Software,
    // with an identical "Maths" subjects line, stays.
    pay: "$140k / year", streams: ["pcm"],
  },
  {
    key: "Design", label: "Design", icon: "Palette",
    area: "Creative, design & media",
    subjects: "Any stream (portfolio)",
    course: "BA / BDes Design", tests: "Portfolio, IELTS/TOEFL",
    pay: "$63k / year", streams: ["pcm", "pcb", "commerce", "arts"],
    blurb: "Design abroad is a 3–4 year BA/BDes in product, communication or UX design, and an MA/MDes after graduation.",
  },
  {
    key: "Civil Services", label: "Civil Services (IAS/IPS)", icon: "Landmark",
    area: "Law, government & defence",
    subjects: "Any stream",
    course: "MPP / MPA", tests: "GRE General Test, IELTS/TOEFL",
    pay: "$142k / year", streams: ["pcm", "pcb", "commerce", "arts"],
    blurb: "Civil services (IAS, IPS, IFS) are joined only through UPSC in India.",
  },
  {
    key: "Psychology", label: "Psychology", icon: "Lightbulb",
    area: "Health & life sciences",
    subjects: "Any stream",
    course: "BSc Psychology", tests: "GRE General Test, IELTS/TOEFL",
    pay: "$101k / year", streams: ["pcm", "pcb", "commerce", "arts"],
    blurb: "Psychology abroad is a BSc Psychology, then an MSc and often a doctorate to become a licensed clinical psychologist.",
  },
  {
    key: "Architecture", label: "Architecture", icon: "LayoutGrid",
    area: "Engineering & building",
    subjects: "Maths (+ portfolio)",
    course: "BArch / BSc Architecture", tests: "Portfolio, IELTS/TOEFL",
    pay: "$99k / year", streams: ["pcm"],
  },
  {
    key: "Pharmacy", label: "Pharmacy", icon: "FlaskConical",
    area: "Health & life sciences",
    subjects: "Chemistry + Biology or Maths",
    course: "BPharm / MPharm", tests: "GRE General Test, IELTS/TOEFL",
    pay: "$141k / year", streams: ["pcm", "pcb"],
    blurb: "Pharmacy abroad is a BPharm/MPharm degree to practise, or an MS/MSc in Pharmaceutical Sciences for industry and research.",
  },
  {
    key: "Cybersecurity", label: "Cybersecurity", icon: "Lock",
    area: "Computers & data",
    subjects: "Maths",
    course: "BSc Cyber Security / Computer Science", tests: "GRE General Test, IELTS/TOEFL",
    pay: "$129k / year", streams: ["pcm", "commerce"],
    blurb: "Cybersecurity abroad is often a BSc in Computer Science or Cyber Security, followed by an MSc in Cyber Security.",
  },
  {
    key: "Media", label: "Media & Journalism", icon: "Mic",
    area: "Creative, design & media",
    subjects: "Any stream",
    course: "BA Media & Communication / Journalism", tests: "IELTS/TOEFL",
    pay: "$62k / year", streams: ["pcm", "pcb", "commerce", "arts"],
    blurb: "Media abroad is a BA in Media, Communication or Journalism and an MA in Communication or Journalism.",
  },
  {
    key: "Government Jobs", label: "Government Jobs", icon: "FileText",
    area: "Law, government & defence",
    subjects: "Any stream",
    course: "MPP / MPA", tests: "GRE General Test, IELTS/TOEFL",
    pay: "$142k / year", streams: ["pcm", "pcb", "commerce", "arts"],
    blurb: "Indian government jobs are reached only through Indian exams (SSC, banking, railways, state PSC).",
  },
  {
    key: "Teaching", label: "Teaching", icon: "BookOpen",
    area: "Teaching & research",
    subjects: "Any stream",
    course: "BA / BEd", tests: "IELTS/TOEFL",
    pay: "$76k / year", streams: ["pcm", "pcb", "commerce", "arts"],
  },
  {
    key: "Biotechnology", label: "Biotechnology", icon: "Layers",
    area: "Health & life sciences",
    subjects: "Biology + Chemistry",
    course: "BSc Biotechnology / Life Sciences", tests: "GRE General Test, IELTS/TOEFL",
    pay: "$127k / year", streams: ["pcm", "pcb"],
    blurb: "Biotech abroad is a BSc in Biotechnology or Life Sciences and an MS/MSc in Biotechnology; research careers usually need a PhD.",
  },
  {
    key: "Hotel Management", label: "Hotel Management", icon: "Hotel",
    area: "Sports, travel & hospitality",
    subjects: "Any stream",
    course: "BBA International Hospitality Management", tests: "IELTS/TOEFL",
    pay: "$69k / year", streams: ["pcm", "pcb", "commerce", "arts"],
  },
  {
    key: "Aviation", label: "Aviation (Pilot)", icon: "Navigation",
    area: "Sports, travel & hospitality",
    subjects: "Maths + Physics",
    course: "BEng / MSc Aerospace Engineering", tests: "SAT, GRE General Test, IELTS/TOEFL",
    pay: "$135k / year", streams: ["pcm"],
    blurb: "Aviation abroad means either aerospace engineering (BEng/MSc) or pilot training.",
  },
  {
    key: "Animation", label: "Animation & VFX", icon: "Eye",
    area: "Creative, design & media",
    subjects: "Any stream (portfolio)",
    course: "BA Animation / Digital Media", tests: "Portfolio, IELTS/TOEFL",
    pay: "$102k / year", streams: ["pcm", "pcb", "commerce", "arts"],
    blurb: "Animation abroad is a BA in Animation or Digital Media and an MA in Animation or VFX; admission is portfolio-based.",
  },
  {
    key: "Fashion", label: "Fashion", icon: "PenTool",
    area: "Creative, design & media",
    subjects: "Any stream (portfolio)",
    course: "BA Fashion Design / Management", tests: "Portfolio, IELTS/TOEFL",
    pay: "$81k / year", streams: ["pcm", "pcb", "commerce", "arts"],
  },
  {
    key: "Entrepreneurship", label: "Entrepreneurship", icon: "Rocket",
    area: "Business & money",
    subjects: "Any stream",
    course: "BBA / BSc Entrepreneurship", tests: "SAT, GMAT (Focus Edition), IELTS/TOEFL",
    pay: "$106k / year", streams: ["pcm", "pcb", "commerce", "arts"],
  },
  {
    key: "Research", label: "Research & Science", icon: "Lightbulb",
    area: "Teaching & research",
    subjects: "Science subjects",
    course: "BS / BSc in a science", tests: "GRE General Test, IELTS/TOEFL",
    pay: "$140k / year", streams: ["pcm", "pcb"],
    blurb: "Research abroad usually means a BS/BSc in a science, then a funded PhD.",
  },
  {
    key: "Agriculture", label: "Agriculture", icon: "Leaf",
    area: "Nature & environment",
    subjects: "Biology + Chemistry",
    course: "BSc Agriculture / Food Science", tests: "GRE General Test, IELTS/TOEFL",
    pay: "$79k / year", streams: ["pcm", "pcb"],
    blurb: "Agriculture abroad covers BSc Agriculture, Food Science or Plant Science, and an MSc in agri-sciences or food technology.",
  },
  {
    key: "Environment", label: "Environmental Science", icon: "Globe",
    area: "Nature & environment",
    subjects: "Science preferred",
    course: "BSc Environmental Science", tests: "GRE General Test, IELTS/TOEFL",
    // The ONLY Nature & environment career the board keeps under Arts.
    pay: "$82k / year", streams: ["pcm", "pcb", "arts"],
  },
  {
    key: "Sports", label: "Sports", icon: "Target",
    area: "Sports, travel & hospitality",
    subjects: "Any stream",
    course: "BSc Sport & Exercise Science", tests: "IELTS/TOEFL",
    pay: "$60k / year", streams: ["pcm", "pcb", "commerce", "arts"],
  },
  {
    key: "Fine Arts", label: "Fine Arts", icon: "Star",
    area: "Creative, design & media",
    subjects: "Any stream (portfolio)",
    course: "BFA / BA Fine Art", tests: "Portfolio, IELTS/TOEFL",
    pay: "$55k / year", streams: ["pcm", "pcb", "commerce", "arts"],
    blurb: "Fine arts abroad is a BFA or BA Fine Art and an MFA; admission is portfolio-based.",
  },
  {
    key: "Music", label: "Music", icon: "Music",
    area: "Creative, design & media",
    subjects: "Any stream (audition)",
    course: "BMus", tests: "Audition, IELTS/TOEFL",
    pay: "$99k / year", streams: ["pcm", "pcb", "commerce", "arts"],
    blurb: "Music abroad is a BMus at a conservatoire or university and an MMus; admission is by audition.",
  },
];

/**
 * Interest-area counts printed on the board's sidebar, per stream chip, in
 * the order [all, pcm, pcb, commerce, arts]. These are check-digits, not
 * display values — the rail renders countsFor().
 */
const BOARD_COUNTS = {
  "Computers & data": [4, 4, 0, 3, 0],
  "Engineering & building": [2, 2, 0, 0, 0],
  "Health & life sciences": [4, 3, 4, 1, 1],
  "Business & money": [3, 3, 2, 3, 3],
  "Law, government & defence": [3, 3, 3, 3, 3],
  "Creative, design & media": [6, 6, 6, 6, 6],
  "Teaching & research": [2, 2, 2, 1, 1],
  "Nature & environment": [2, 2, 2, 0, 1],
  "Sports, travel & hospitality": [3, 3, 2, 2, 2],
};

export function countsFor(stream) {
  const out = {};
  INTEREST_AREAS.forEach((a) => { out[a] = 0; });
  CAREER_ABROAD.forEach((c) => {
    if (stream === "all" || c.streams.includes(stream)) out[c.area] += 1;
  });
  return out;
}

if (import.meta.env?.DEV) {
  const problems = [];
  if (CAREER_ABROAD.length !== 29) {
    problems.push(`CAREER_ABROAD has ${CAREER_ABROAD.length} rows, board has 29`);
  }
  const orphan = CAREER_ABROAD.filter((c) => !INTEREST_AREAS.includes(c.area));
  if (orphan.length) problems.push(`unknown interest area: ${orphan.map((c) => c.key).join(", ")}`);

  ["all", "pcm", "pcb", "commerce", "arts"].forEach((stream, i) => {
    const got = countsFor(stream);
    INTEREST_AREAS.forEach((area) => {
      const want = BOARD_COUNTS[area][i];
      if (got[area] !== want) problems.push(`${area}/${stream}: ${got[area]} ≠ board ${want}`);
    });
  });

  if (problems.length) {
    console.error("[careerAbroad] board check-digits failed:\n  " + problems.join("\n  "));
  }
}
