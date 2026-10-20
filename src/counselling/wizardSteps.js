// PLACEMENT: src/counselling/wizardSteps.js   (NEW FILE — landing/frontend app)
//
// Workflow §6 — the profile wizard's question sets, as data.
//
// Seven levels with two or three steps each, ~20 distinct questions between
// them. Expressed declaratively so ProfileWizard.jsx stays a renderer: a
// reworded question or a reordered step is an edit here, not a change to
// component logic.
//
// Each field declares where its answer goes:
//   col: "<name>"  → a real CounselingIntake column (matching runs on these)
//   no col         → the level_answers JSON blob (free text the report reads
//                    back but nothing queries)
// See the model comment on level_answers for why that split exists.

// §6's 15 skills. The pre-v3 wizard offered 9; these six are new:
// Logical thinking, Analytical skills, Science, Teamwork, Drawing,
// Critical thinking, Time management.
export const SKILLS = [
  "Problem solving", "Creativity", "Communication", "Leadership",
  "Logical thinking", "Analytical skills", "Mathematics", "Science",
  "Programming", "Public speaking", "Teamwork", "Writing", "Drawing",
  "Critical thinking", "Time management",
];

export const LOCATIONS = [
  ["india", "India"],
  ["abroad", "Abroad"],
  ["unsure", "Not sure yet"],
];

export const HELP_OPTIONS = [
  "Choose a career path",
  "Switch my stream or course",
  "Prepare for entrance exams",
  "Shortlist colleges & courses",
  "Not sure — general guidance",
];

export const AUDIENCES = [
  ["self", "Myself"], ["child", "My child"],
  ["sibling", "My sibling"], ["other", "Someone else"],
];

export const LEVELS = [
  ["6-8", "Class 6–8"], ["9-10", "Class 9–10"], ["11-12", "Class 11–12"],
  ["diploma", "Diploma"], ["ug", "Undergraduate"],
  ["graduate", "Graduate"], ["working", "Working professional"],
];

// field: { key, label, type, options?, col?, placeholder?, max? }
// types: text | textarea | chips (multi) | one (single-select) | specs (live
//        Specialization chips — the matching vocabulary, loaded from the API)
export const LEVEL_SETS = {
  "6-8": [
    { title: "About your studies", fields: [
      { key: "board", label: "Which board is your school?", type: "text", placeholder: "e.g. CBSE, ICSE, MBSE" },
      { key: "medium", label: "Medium of instruction", type: "text", placeholder: "e.g. English, Hindi, Mizo" },
      { key: "favourite_subjects", label: "Favourite subjects", type: "text", col: "favorite_subjects", placeholder: "e.g. Maths, Science, Drawing" },
    ] },
    { title: "Interests & activities", fields: [
      { key: "activities", label: "Activities and hobbies you enjoy", type: "textarea", placeholder: "e.g. building models, football, reading comics" },
      { key: "clubs", label: "School competitions or clubs you take part in", type: "text", placeholder: "e.g. science fair, debate club" },
      { key: "learning_style", label: "How do you learn best?", type: "one",
        options: ["Watching videos", "Reading", "Doing it hands-on", "Being taught step by step"] },
    ] },
    { title: "How you work", fields: [
      { key: "work_style", label: "Do you prefer working…", type: "one",
        options: ["On my own", "In a team", "A bit of both"] },
      { key: "dream_job", label: "Dream job (optional)", type: "text", placeholder: "No wrong answers here" },
      { key: "interests", label: "Directions that sound interesting", type: "specs", col: "career_interest_ids", max: 5 },
    ] },
  ],

  "9-10": [
    { title: "Interests & strengths", fields: [
      { key: "favourite_subjects", label: "Favourite subjects", type: "text", col: "favorite_subjects", placeholder: "e.g. Maths, Biology, Economics" },
      { key: "interests", label: "Career areas that interest you", type: "specs", col: "career_interest_ids", max: 5 },
      { key: "preferred_stream", label: "Stream you're leaning towards after Class 10", type: "one",
        options: ["Science", "Commerce", "Arts / Humanities", "Vocational / ITI", "Not decided yet"] },
    ] },
    { title: "Skills & goals", fields: [
      { key: "skills", label: "Skills and strengths that describe you", type: "chips", options: SKILLS, col: "skills" },
      { key: "work_style", label: "Preferred working style", type: "one",
        options: ["On my own", "In a team", "A bit of both"] },
      { key: "goals_2y", label: "What do you want to achieve in the next two years?", type: "textarea", col: "short_term_goals" },
    ] },
    { title: "Preferences (optional)", fields: [
      { key: "budget", label: "Budget for further studies", type: "one",
        options: ["Under ₹1 lakh/yr", "₹1–3 lakh/yr", "₹3–6 lakh/yr", "Above ₹6 lakh/yr", "Not sure yet"] },
      { key: "location", label: "Preferred study location", type: "text", placeholder: "e.g. within my state, metro cities, anywhere" },
    ] },
  ],

  "11-12": [
    { title: "Stream & goals", fields: [
      { key: "current_stream", label: "Your current stream", type: "one",
        options: ["PCM", "PCB", "PCMB", "Commerce", "Arts / Humanities"] },
      { key: "preferred_degree", label: "Degree you're aiming for", type: "text", placeholder: "e.g. B.Tech, MBBS, B.Com (Hons)" },
      { key: "exams", label: "Entrance exams you're considering", type: "text", placeholder: "e.g. JEE Main, NEET, CUET, CLAT" },
    ] },
    { title: "Career direction", fields: [
      { key: "interests", label: "Career areas that interest you (pick 1–5)", type: "specs", col: "career_interest_ids", max: 5 },
      { key: "career_goals", label: "Where do you want to end up?", type: "textarea", col: "long_term_goals" },
    ] },
    { title: "Budget & language", fields: [
      { key: "budget", label: "Budget for studies (optional)", type: "one",
        options: ["Under ₹2 lakh/yr", "₹2–5 lakh/yr", "₹5–10 lakh/yr", "Above ₹10 lakh/yr", "Not sure yet"] },
      { key: "languages", label: "Languages you're comfortable being counselled in", type: "text", col: "languages", placeholder: "e.g. English, Hindi, Mizo" },
    ] },
  ],

  diploma: [
    { title: "Your programme", fields: [
      { key: "programme", label: "Your current diploma / programme", type: "text", placeholder: "e.g. Diploma in Mechanical Engineering, 2nd year" },
      { key: "skills", label: "Skills you've built", type: "chips", options: SKILLS, col: "skills" },
      { key: "projects", label: "Internships or projects so far", type: "textarea" },
    ] },
    { title: "Direction", fields: [
      { key: "interests", label: "Industries that interest you", type: "specs", col: "career_interest_ids", max: 5 },
      { key: "next", label: "What's next for you?", type: "one",
        options: ["Lateral entry to a degree", "A job straight away", "Further specialisation", "Not sure yet"] },
      { key: "goal_5y", label: "Your 3–5 year goal", type: "textarea", col: "long_term_goals" },
    ] },
  ],

  ug: [
    { title: "Your degree", fields: [
      { key: "degree", label: "Your current degree and year", type: "text", placeholder: "e.g. B.Sc Physics, 2nd year" },
      { key: "skills", label: "Skills you've built", type: "chips", options: SKILLS, col: "skills" },
      { key: "projects", label: "Internships or projects so far", type: "textarea" },
    ] },
    { title: "Direction", fields: [
      { key: "interests", label: "Industries that interest you", type: "specs", col: "career_interest_ids", max: 5 },
      { key: "next", label: "What's next for you?", type: "one",
        options: ["Postgraduate study", "A job", "Competitive exams", "Start something of my own", "Not sure yet"] },
      { key: "goal_5y", label: "Your 3–5 year goal", type: "textarea", col: "long_term_goals" },
    ] },
  ],

  graduate: [
    { title: "Background", fields: [
      { key: "degree", label: "Your degree", type: "text", placeholder: "e.g. B.Com, Delhi University, 2024" },
      { key: "experience", label: "Work experience so far", type: "text", placeholder: "e.g. 1 year in accounting, or none yet" },
      { key: "skills", label: "Your skills", type: "chips", options: SKILLS, col: "skills" },
    ] },
    { title: "Goals", fields: [
      { key: "interests", label: "Career areas that interest you", type: "specs", col: "career_interest_ids", max: 5 },
      { key: "career_goals", label: "What are you working towards?", type: "textarea", col: "long_term_goals" },
      { key: "expected_salary", label: "Expected salary (optional)", type: "text", placeholder: "e.g. ₹6–8 LPA" },
    ] },
    { title: "Preferences", fields: [
      { key: "location", label: "Preferred work location", type: "text", placeholder: "e.g. Bengaluru, remote, anywhere" },
      { key: "sector", label: "Sector preference", type: "one",
        options: ["Government", "Private", "Either"] },
    ] },
  ],

  working: [
    { title: "Your work", fields: [
      { key: "role", label: "Your current role", type: "text", placeholder: "e.g. Junior accountant" },
      { key: "years", label: "Years of experience", type: "text", placeholder: "e.g. 3" },
      { key: "industry", label: "Industry", type: "text", col: "preferred_industry", placeholder: "e.g. Banking, IT services" },
    ] },
    { title: "Direction", fields: [
      { key: "optimising_for", label: "What are you optimising for?", type: "one",
        options: ["Higher salary", "Better work-life balance", "A complete career switch",
                  "Faster growth", "More meaningful work"] },
      { key: "leadership", label: "Leadership aspirations", type: "one",
        options: ["Individual contributor", "Team lead", "Senior management", "Not sure yet"] },
      { key: "skills", label: "Skills you want to build", type: "chips", options: SKILLS, col: "skills" },
      { key: "interests", label: "Career areas that interest you", type: "specs", col: "career_interest_ids", max: 5 },
    ] },
  ],
};

/** Steps for a level, or [] when the level is unknown/not yet chosen. */
export function stepsFor(level) {
  return LEVEL_SETS[level] || [];
}
