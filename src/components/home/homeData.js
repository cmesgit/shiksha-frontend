/* homeData.js — all copy + card data for the redesigned homepage,
   ported 1:1 from the approved green design (iteration 9).
   Keeping content here (instead of inline JSX) makes the sections tiny
   and gives a single obvious place to later swap in CMS/API data. */

/* ── WHY LEARNERS CHOOSE SHIKSHA (auto-scrolling cards) ── */
export const WHY_CARDS = [
  {
    icon: "video",
    tint: "var(--coral)",
    title: "Live & recorded classes",
    text: "Attend interactive live classes or revisit recorded lessons and revise at your own pace.",
  },
  {
    icon: "gradcap",
    tint: "var(--blue)",
    title: "Expert faculty",
    text: "Learn from experienced educators and subject mentors who know the syllabus inside out.",
  },
  {
    icon: "shield",
    tint: "var(--green)",
    title: "Board & exam focused",
    text: "Courses aligned to CBSE, NCERT and MBSE, plus tracks for national competitive exams.",
  },
  {
    icon: "phone",
    tint: "var(--violet)",
    title: "Flexible learning",
    text: "Study anytime, anywhere, on any device — phone, tablet or computer.",
  },
  {
    icon: "eye",
    tint: "var(--gold)",
    title: "Guest preview",
    text: "Explore lessons and course structure before you enrol — no sign-up required.",
  },
  {
    icon: "chat",
    tint: "var(--pink)",
    title: "Personal guidance",
    text: "Book one-on-one sessions and clear doubts on a schedule that works for you.",
  },
];

/* ── BROWSE CATEGORIES ── */
export const CATEGORIES = [
  {
    icon: "book",
    grad: "g-green",
    title: "School Education",
    sub: "Classes 8–12 · CBSE, NCERT & MBSE",
    pills: ["Mathematics", "Science", "English", "Social Studies"],
    stat: "Board-aligned live & recorded classes",
    cta: "Explore School Courses",
    to: "/courses",
    state: { selectedBoardGroup: "central", selectedBoard: "cbse" },
  },
  {
    icon: "target",
    grad: "g-warm",
    title: "Competitive Exams",
    sub: "JEE · NEET · UPSC · Banking",
    pills: ["IIT-JEE", "NEET", "UPSC", "SSC"],
    stat: "Expert mentors & proven strategies",
    cta: "Start Exam Prep",
    to: "/general-studies",
  },
  {
    icon: "briefcase",
    grad: "g-cool",
    title: "Skill & Career",
    sub: "Skills · Counselling · Coding & more",
    pills: ["Industrial", "Specialized", "Coding", "Career"],
    stat: "Beyond academics — build real skills",
    cta: "View Programs",
    to: "/skill/browse",
  },
];

/* ── FEATURED COURSES (tabbed showcase) ── */
export const COURSE_TABS = [
  { id: "all", label: "All" },
  { id: "boards", label: "Boards" },
  { id: "class8-12", label: "Class 8–12" },
  { id: "competitive", label: "Competitive" },
];

const CLASS_FACT = "1 Year · Online · Full access";
const IMG = (id) =>
  `https://images.unsplash.com/${id}?w=800&h=400&fit=crop&auto=format&q=75`;

export const FEATURED_COURSES = [
  // ── Class 8–12 ──
  { cats: ["class8-12"], lvl: "Foundation", ribbon: null, stars: 4, count: 97, title: "Class 8 Foundation", fact: CLASS_FACT, price: "1,500", grad: "rgba(15,157,107,0.72),rgba(11,91,62,0.88)", img: IMG("photo-1560785496-3c9d27877182"), icon: "book" },
  { cats: ["class8-12"], lvl: "Foundation", ribbon: null, stars: 4, count: 85, title: "Class 9 Foundation", fact: CLASS_FACT, price: "1,500", grad: "rgba(20,184,160,0.72),rgba(11,91,62,0.88)", img: IMG("photo-1517971129774-8a2b38fa128e"), icon: "book" },
  { cats: ["class8-12"], lvl: "Foundation", ribbon: "Bestseller", stars: 5, count: 214, title: "Class 10 Foundation", fact: CLASS_FACT, price: "1,500", grad: "rgba(255,178,29,0.72),rgba(242,140,15,0.88)", img: IMG("photo-1434030216411-0b793f4b4173"), icon: "book" },
  { cats: ["class8-12", "all"], lvl: "Science", ribbon: null, stars: 5, count: 186, title: "Class 11 · Science", fact: CLASS_FACT, price: "1,500", grad: "rgba(255,122,69,0.72),rgba(225,77,42,0.88)", img: IMG("photo-1694230155228-cdde50083573"), icon: "flask" },
  { cats: ["class8-12"], lvl: "Commerce", ribbon: null, stars: 4, count: 78, title: "Class 11 · Commerce", fact: CLASS_FACT, price: "1,500", grad: "rgba(124,92,252,0.72),rgba(75,52,199,0.88)", img: IMG("photo-1513258496099-48168024aec0"), icon: "calc" },
  { cats: ["class8-12"], lvl: "Arts", ribbon: null, stars: 4, count: 62, title: "Class 11 · Arts", fact: CLASS_FACT, price: "1,500", grad: "rgba(236,78,134,0.72),rgba(193,58,104,0.88)", img: IMG("photo-1585661417298-8236a5f449aa"), icon: "book" },
  { cats: ["class8-12"], lvl: "Science", ribbon: "New", stars: 5, count: 203, title: "Class 12 · Science", fact: CLASS_FACT, price: "1,500", grad: "rgba(15,157,107,0.72),rgba(20,184,160,0.88)", img: IMG("photo-1532094349884-543bc11b234d"), icon: "flask" },
  { cats: ["class8-12"], lvl: "Commerce", ribbon: null, stars: 4, count: 91, title: "Class 12 · Commerce", fact: CLASS_FACT, price: "1,500", grad: "rgba(255,178,29,0.72),rgba(224,139,18,0.88)", img: IMG("photo-1571260899304-425eee4c7efc"), icon: "calc" },
  { cats: ["class8-12"], lvl: "Arts", ribbon: null, stars: 4, count: 58, title: "Class 12 · Arts", fact: CLASS_FACT, price: "1,500", grad: "rgba(59,130,246,0.72),rgba(29,78,216,0.88)", img: IMG("photo-1514369118554-e20d93546b30"), icon: "book" },
  // ── Boards ──
  { cats: ["boards", "all"], lvl: "National Board", ribbon: "Popular", stars: 5, count: 312, title: "CBSE (Central Board)", fact: "Expert Faculty · Classes 8–12", explore: true, grad: "rgba(15,157,107,0.72),rgba(11,91,62,0.88)", img: IMG("photo-1741699428220-65f37f3fbbcb"), icon: "book", to: "/courses", state: { selectedBoardGroup: "central", selectedBoard: "cbse" } },
  { cats: ["boards"], lvl: "Regional", ribbon: null, stars: 4, count: 89, title: "Regional Boards", fact: "MBSE & more", explore: true, grad: "rgba(20,184,160,0.72),rgba(11,91,62,0.88)", img: IMG("photo-1598981457915-aea220950616"), icon: "book", to: "/courses", state: { selectedBoardGroup: "state", selectedBoard: "mbse" } },
  // ── Competitive (launching soon) ──
  { cats: ["competitive", "all"], lvl: "Medical", ribbon: "Popular", stars: 5, count: 41, title: "NEET Preparation", fact: "Launching soon", tutor: "Dr. D. Ralte", soon: true, grad: "rgba(236,78,134,0.72),rgba(193,58,104,0.88)", img: IMG("photo-1505751172876-fa1923c5c528"), icon: "flask" },
  { cats: ["competitive"], lvl: "Civil Services", ribbon: null, stars: 4, count: 75, title: "UPSC & Civil Services", fact: "Launching soon", tutor: "K. Zoramthanga", soon: true, grad: "rgba(255,178,29,0.72),rgba(242,140,15,0.88)", img: IMG("photo-1554475900-0a0350e3fc7b"), icon: "book" },
  { cats: ["competitive"], lvl: "Engineering", ribbon: null, stars: 5, count: 63, title: "IIT-JEE Preparation", fact: "Launching soon", tutor: "A. Sharma", soon: true, grad: "rgba(124,92,252,0.72),rgba(75,52,199,0.88)", img: IMG("photo-1614283226124-5a2f0f23752b"), icon: "calc" },
  { cats: ["competitive"], lvl: "SSC · Banking", ribbon: null, stars: 4, count: 54, title: "Government Exams", fact: "Launching soon", tutor: "T. Lalhmingthanga", soon: true, grad: "rgba(20,184,160,0.72),rgba(11,91,62,0.88)", img: IMG("photo-1584982751601-97dcc096659c"), icon: "book" },
  { cats: ["competitive"], lvl: "NDA · CDS", ribbon: null, stars: 4, count: 38, title: "Defence Exams", fact: "Launching soon", tutor: "Maj. R. Singh (Retd.)", soon: true, grad: "rgba(59,130,246,0.72),rgba(29,78,216,0.88)", img: IMG("photo-1590821091890-bdcc3c1e2b37"), icon: "book" },
  { cats: ["competitive"], lvl: "Accountancy", ribbon: null, stars: 5, count: 47, title: "CA Program", fact: "Launching soon", tutor: "CA V. Malsawma", soon: true, grad: "rgba(15,157,107,0.72),rgba(20,184,160,0.88)", img: IMG("photo-1532187643603-ba119ca4109e"), icon: "calc" },
  { cats: ["competitive"], lvl: "Olympiads", ribbon: null, stars: 4, count: 29, title: "Olympiad & Foundation", fact: "Launching soon", tutor: "R. Vanlalhriati", soon: true, grad: "rgba(255,122,69,0.72),rgba(225,77,42,0.88)", img: IMG("photo-1741699428220-65f37f3fbbcb"), icon: "flask" },
];

/* ── WHY CHOOSE SHIKSHACOM (checklist) ── */
export const WHY_CHOOSE_CHECKS = [
  {
    tint: "var(--coral)",
    title: "Structured, board-aligned learning",
    text: "Concept-clear courses for Classes 8–12, aligned to CBSE, NCERT and MBSE.",
  },
  {
    tint: "var(--violet)",
    title: "Live classes with recorded revision",
    text: "Attend live for real-time guidance, then rewatch lessons anytime you need them.",
  },
  {
    tint: "var(--green)",
    title: "Personal doubt clearing & guidance",
    text: "Book one-on-one sessions and get support on a schedule that fits you.",
  },
];

/* ── FAQ ── */
export const FAQS = [
  {
    q: "How do I enroll in a course?",
    a: "Create a free account, choose the program that matches your class or exam, and enroll in a few steps. You can preview lessons as a guest first if you'd like to explore before signing up.",
  },
  {
    q: "Can I preview courses before enrolling?",
    a: "Yes. Guest Preview lets you explore sample lessons and course structure without creating an account, so you can see the teaching style before you commit.",
  },
  {
    q: "Are live classes recorded?",
    a: "Every live class is recorded and added to your dashboard, so you can revisit lessons anytime and revise at your own pace.",
  },
  {
    q: "Which boards do you support?",
    a: "Courses are aligned with CBSE and NCERT, and we support the Mizoram Board (MBSE) for learners across Northeast India. More boards are on the way.",
  },
  {
    q: "What competitive exams do you prepare students for?",
    a: "Our competitive tracks cover IIT-JEE, NEET, UPSC and Civil Services, and government recruitment exams such as SSC and Banking, with more categories being added.",
  },
  {
    q: "Can I learn on my mobile phone?",
    a: "Yes. ShikshaCom works on any device — phone, tablet or computer — so you can attend live classes and watch recordings wherever you are.",
  },
];
