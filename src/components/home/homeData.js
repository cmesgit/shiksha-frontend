/* homeData.js — static fallback data for FeaturedCourses.jsx.
   Every other homepage section now keeps its own local DEFAULT_ITEMS
   fallback and fetches real copy from the CMS via useHomeContent(); this
   file only survives for FEATURED_COURSES/COURSE_TABS, which
   FeaturedCourses.jsx renders immediately before getPublicFeatured()
   resolves (and keeps using if the CMS has no active showcase rows).

   This fallback is deliberately claim-free. It previously carried four
   kinds of invented data that reached real visitors during first paint:

     * `stars` / `count` — fabricated ratings. No course-review model
       exists anywhere in the backend, so there was nothing to derive
       them from. Removed here and from the DB (content migration 0017).
     * `tutor` — invented faculty names ("Dr. D. Ralte", "Maj. R. Singh
       (Retd.)", …) attached to courses that have not launched.
     * `price: "1,500"` — contradicted the API, which returns "Free" for
       every one of these today, producing a visible ₹1,500 → Free flip
       on every page load. The fallback now states `free` to match.
     * `img` — hotlinked Unsplash stock photos. Cards now fall back to
       their own gradient + category icon, which is fully self-owned.
       Real artwork comes from the CMS (ShowcaseCourse.image).

   Keep it that way: anything added here is a claim the site makes before
   it has talked to the backend. */

export const COURSE_TABS = [
  { id: "all", label: "All" },
  { id: "boards", label: "Boards" },
  { id: "class8-12", label: "Class 8–12" },
  { id: "competitive", label: "Competitive" },
];

const CLASS_FACT = "1 Year · Online · Full access";
const SOON_FACT = "Live + Recorded · Launching soon";

// NOTE: "all" is a reserved sentinel FeaturedCourses.jsx treats as "no filter
// applied" — it is never a real category, so it is not tagged on any card
// here (the backend's ShowcaseCourse.CATEGORY_CHOICES excludes it too).
export const FEATURED_COURSES = [
  // ── Class 8–12 ──
  { cats: ["class8-12"], lvl: "Foundation", ribbon: null, title: "Class 8 Foundation", fact: CLASS_FACT, free: true, grad: "rgba(15,157,107,0.72),rgba(11,91,62,0.88)", icon: "book" },
  { cats: ["class8-12"], lvl: "Foundation", ribbon: null, title: "Class 9 Foundation", fact: CLASS_FACT, free: true, grad: "rgba(20,184,160,0.72),rgba(11,91,62,0.88)", icon: "book" },
  { cats: ["class8-12"], lvl: "Foundation", ribbon: null, title: "Class 10 Foundation", fact: CLASS_FACT, free: true, grad: "rgba(255,178,29,0.72),rgba(242,140,15,0.88)", icon: "book" },
  { cats: ["class8-12"], lvl: "Science", ribbon: null, title: "Class 11 · Science", fact: CLASS_FACT, free: true, grad: "rgba(255,122,69,0.72),rgba(225,77,42,0.88)", icon: "flask" },
  { cats: ["class8-12"], lvl: "Commerce", ribbon: null, title: "Class 11 · Commerce", fact: CLASS_FACT, free: true, grad: "rgba(124,92,252,0.72),rgba(75,52,199,0.88)", icon: "calc" },
  { cats: ["class8-12"], lvl: "Arts", ribbon: null, title: "Class 11 · Arts", fact: CLASS_FACT, free: true, grad: "rgba(236,78,134,0.72),rgba(193,58,104,0.88)", icon: "book" },
  { cats: ["class8-12"], lvl: "Science", ribbon: null, title: "Class 12 · Science", fact: CLASS_FACT, free: true, grad: "rgba(15,157,107,0.72),rgba(20,184,160,0.88)", icon: "flask" },
  { cats: ["class8-12"], lvl: "Commerce", ribbon: null, title: "Class 12 · Commerce", fact: CLASS_FACT, free: true, grad: "rgba(255,178,29,0.72),rgba(224,139,18,0.88)", icon: "calc" },
  { cats: ["class8-12"], lvl: "Arts", ribbon: null, title: "Class 12 · Arts", fact: CLASS_FACT, free: true, grad: "rgba(59,130,246,0.72),rgba(29,78,216,0.88)", icon: "book" },
  // ── Boards ──
  { cats: ["boards"], lvl: "National Board", ribbon: null, title: "CBSE (Central Board)", fact: "Expert Faculty · Classes 8–12", explore: true, grad: "rgba(15,157,107,0.72),rgba(11,91,62,0.88)", icon: "book", to: "/courses", state: { selectedBoardGroup: "central", selectedBoard: "cbse" } },
  { cats: ["boards"], lvl: "Regional", ribbon: null, title: "Regional Boards", fact: "MBSE & more", explore: true, grad: "rgba(20,184,160,0.72),rgba(11,91,62,0.88)", icon: "compass", to: "/courses", state: { selectedBoardGroup: "state", selectedBoard: "mbse" } },
  // ── Competitive (launching soon) ──
  { cats: ["competitive"], lvl: "Medical", ribbon: null, title: "NEET Preparation", fact: SOON_FACT, soon: true, grad: "rgba(236,78,134,0.72),rgba(193,58,104,0.88)", icon: "pulse" },
  { cats: ["competitive"], lvl: "Civil Services", ribbon: null, title: "UPSC & Civil Services", fact: SOON_FACT, soon: true, grad: "rgba(255,178,29,0.72),rgba(242,140,15,0.88)", icon: "institution" },
  { cats: ["competitive"], lvl: "Engineering", ribbon: null, title: "IIT-JEE Preparation", fact: SOON_FACT, soon: true, grad: "rgba(124,92,252,0.72),rgba(75,52,199,0.88)", icon: "target" },
  { cats: ["competitive"], lvl: "SSC · Banking", ribbon: null, title: "Government Exams", fact: SOON_FACT, soon: true, grad: "rgba(20,184,160,0.72),rgba(11,91,62,0.88)", icon: "bank" },
  { cats: ["competitive"], lvl: "NDA · CDS", ribbon: null, title: "Defence Exams", fact: SOON_FACT, soon: true, grad: "rgba(59,130,246,0.72),rgba(29,78,216,0.88)", icon: "shield" },
  { cats: ["competitive"], lvl: "Accountancy", ribbon: null, title: "CA Program", fact: SOON_FACT, soon: true, grad: "rgba(15,157,107,0.72),rgba(20,184,160,0.88)", icon: "calc" },
  { cats: ["competitive"], lvl: "Olympiads", ribbon: null, title: "Olympiad & Foundation", fact: SOON_FACT, soon: true, grad: "rgba(255,122,69,0.72),rgba(225,77,42,0.88)", icon: "medal" },
];
