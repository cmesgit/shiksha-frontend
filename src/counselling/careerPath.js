// PLACEMENT: src/counselling/careerPath.js   (NEW FILE — landing/frontend app)
//
// "My Path" — the workflow's personalised career-path step, computed
// client-side from what the backend already returns (GET /intake/ gives
// the intake fields AND the learner's class/stream). Rule-based, same
// philosophy as the backend's counselor matching: explainable, no AI.
//
// Input:  intake response ({learner: {current_class, stream}, skills,
//         work_environment, career_interests: [{name}], ...})
// Output: { headline, paths: [{title, why[], nextSteps[], guides[]}],
//           stage }  — guides are slugs resolved against the guide CMS
//           index (see api/guidesApi.js), formerly data/guides.js.

const EARLY = ["8", "9", "10"];
const SENIOR = ["11", "12"];

// Interest specialization name → path fragment
const INTEREST_PATHS = {
  "Computer Science & IT": {
    title: "Software & Technology",
    why: "you picked Computer Science & IT as a career interest",
    steps: ["Target JEE / CUET for B.Tech CSE or B.Sc Computer Science",
            "Start one programming language now (Python is the friendliest)",
            "Build one small project you can show — a game, site, or script"],
    guides: ["after-12-science", "undergraduate"],
  },
  "Engineering Careers": {
    title: "Engineering",
    why: "Engineering Careers is on your interest list",
    steps: ["Prepare for JEE Main/Advanced alongside boards",
            "Shortlist branches by interest, not just placements",
            "Practice previous-year papers weekly"],
    guides: ["after-12-science", "undergraduate"],
  },
  Technology: {
    title: "Software & Technology",
    why: "Technology is on your interest list",
    steps: ["Explore B.Tech, BCA, or B.Sc IT routes",
            "Try free intro courses in coding or data"],
    guides: ["after-12-science", "undergraduate"],
  },
  "Medicine & Health Sciences": {
    title: "Medicine & Health Sciences",
    why: "you're interested in Medicine & Health Sciences",
    steps: ["NEET is the gateway — build Biology + Chemistry depth",
            "Look at allied health too: pharmacy, nursing, physiotherapy"],
    guides: ["after-12-science", "undergraduate"],
  },
  "Commerce & Finance": {
    title: "Commerce & Finance",
    why: "Commerce & Finance is on your interest list",
    steps: ["Compare B.Com (Hons), BBA, and the CA foundation route",
            "CUET / IPMAT open the strongest programmes"],
    guides: ["after-12-commerce", "undergraduate"],
  },
  "Business & Management": {
    title: "Business & Management",
    why: "you're interested in Business & Management",
    steps: ["BBA/BMS via IPMAT, NPAT, SET or CUET",
            "Join or start something — a club, a stall, a small venture"],
    guides: ["after-12-commerce", "undergraduate"],
  },
  Entrepreneurship: {
    title: "Entrepreneurship",
    why: "Entrepreneurship is on your interest list",
    steps: ["A commerce or management degree gives the toolkit",
            "Learn basic accounting and marketing early"],
    guides: ["after-12-commerce", "undergraduate"],
  },
  "Arts & Humanities": {
    title: "Humanities & Social Sciences",
    why: "Arts & Humanities is on your interest list",
    steps: ["BA (Hons) via CUET in your strongest subject",
            "Read widely — humanities careers reward strong writing"],
    guides: ["after-12-arts", "undergraduate"],
  },
  "Design & Creative Careers": {
    title: "Design & Creative",
    why: "you're interested in Design & Creative careers",
    steps: ["NID DAT, NIFT, UCEED are the design gateways",
            "Start a portfolio now — it matters more than marks"],
    guides: ["after-12-arts", "undergraduate"],
  },
  "Media & Communication": {
    title: "Media & Communication",
    why: "Media & Communication is on your interest list",
    steps: ["BJMC or BA in Mass Communication via CUET",
            "Start creating: write, record, edit — anything published"],
    guides: ["after-12-arts", "undergraduate"],
  },
  "Civil Services & Government Exams": {
    title: "Civil Services & Government",
    why: "you're aiming at Civil Services & Government exams",
    steps: ["Any strong bachelor's works; humanities overlaps the syllabus",
            "Build a daily newspaper habit now"],
    guides: ["after-12-arts", "undergraduate"],
  },
  Law: {
    title: "Law",
    why: "Law is on your interest list",
    steps: ["CLAT after Class 12 → 5-year integrated BA LLB",
            "Practice reading comprehension and logical reasoning"],
    guides: ["after-12-arts", "undergraduate"],
  },
  "University Admissions": {
    title: "University Admissions",
    why: "you want help with university admissions",
    steps: ["Map CUET subjects to your target courses",
            "Track deadlines in one place — see the UG guide"],
    guides: ["undergraduate"],
  },
  "Study Abroad": {
    title: "Study Abroad",
    why: "Study Abroad is on your interest list",
    steps: ["Start standardised-test prep a year ahead (SAT/IELTS)",
            "Shortlist 6–8 universities across ambition levels"],
    guides: ["undergraduate"],
  },
  "Defence & Armed Forces": {
    title: "Defence & Armed Forces",
    why: "you're interested in Defence & the Armed Forces",
    steps: ["NDA after Class 12 (Science helps for Air Force/Navy tech)",
            "Physical fitness counts — train consistently"],
    guides: ["after-12-science", "undergraduate"],
  },
  "Vocational & Skill Careers": {
    title: "Vocational & Skill Careers",
    why: "you're interested in vocational and skill-based careers",
    steps: ["Diploma, ITI, and polytechnic routes start right after Class 10",
            "Pick a trade with local demand and apprenticeship options"],
    guides: ["class-10"],
  },
  "Education & Teaching": {
    title: "Education & Teaching",
    why: "Education & Teaching is on your interest list",
    steps: ["BA/B.Sc + B.Ed, or an integrated ITEP programme",
            "Volunteer to tutor juniors — teaching is learnt by doing"],
    guides: ["after-12-arts", "undergraduate"],
  },
};

const STREAM_GUIDE = {
  science: "after-12-science",
  commerce: "after-12-commerce",
  arts: "after-12-arts",
};

const STREAM_LABEL = { science: "Science", commerce: "Commerce", arts: "Arts (Humanities)" };

export function buildCareerPath(intakeData) {
  const learner = intakeData?.learner || {};
  const interests = (intakeData?.career_interests || []).map((s) => s.name);
  const skills = (intakeData?.skills || "").split(",").map((x) => x.trim()).filter(Boolean);
  const cls = String(learner.current_class || "");
  const stream = (learner.stream || "").toLowerCase();

  const stage = EARLY.includes(cls)
    ? "early"
    : SENIOR.includes(cls)
      ? "senior"
      : "ug";

  const paths = [];
  const seen = new Set();
  for (const name of interests) {
    const p = INTEREST_PATHS[name];
    if (!p || seen.has(p.title)) continue;
    seen.add(p.title);
    const why = [`Because ${p.why}.`];
    if (stream && STREAM_GUIDE[stream] && p.guides.includes(STREAM_GUIDE[stream])) {
      why.push(`It fits your ${STREAM_LABEL[stream]} stream.`);
    }
    if (skills.length) {
      why.push(`Your skills (${skills.slice(0, 3).join(", ")}) transfer well here.`);
    }
    paths.push({
      title: p.title,
      why,
      nextSteps: [...p.steps],
      guides: [...p.guides],
    });
    if (paths.length >= 3) break;
  }

  // Stage-based fallbacks / additions
  if (stage === "early") {
    paths.unshift({
      title: "First: choose the right stream",
      why: [
        `You're in Class ${cls || "9–10"} — the stream decision comes before any career decision.`,
        interests.length
          ? "Your interests below point at which stream fits."
          : "Complete your career profile so we can point at a stream.",
      ],
      nextSteps: [
        "Read the After Class 10 guide — streams, diplomas, ITI, polytechnic",
        "List your 3 favourite subjects and 3 strongest ones",
        "Book a stream-selection session with a counsellor",
      ],
      guides: ["class-10", "class-11-12"],
    });
  } else if (paths.length === 0) {
    const g = STREAM_GUIDE[stream];
    paths.push({
      title: g ? `Explore careers from ${STREAM_LABEL[stream]}` : "Explore your options",
      why: [
        g
          ? `You're a ${STREAM_LABEL[stream]} student — here's the full map of where it leads.`
          : "Complete your career profile and we'll narrow this down.",
      ],
      nextSteps: [
        "Skim the guide below and shortlist 3 careers that pull you",
        "Complete your career profile for tailored matches",
        "Book a session to pressure-test your shortlist",
      ],
      guides: g ? [g, "undergraduate"] : ["undergraduate", "class-11-12"],
    });
  }

  // De-dupe guides across paths for the "related guides" rail
  const relatedGuides = [...new Set(paths.flatMap((p) => p.guides))];

  const headline =
    stage === "early"
      ? "Your path starts with the stream decision"
      : paths.length > 1
        ? `${paths.length} career directions fit your profile`
        : paths[0].title;

  return { stage, headline, paths, relatedGuides, interests };
}
