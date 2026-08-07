/* homeData.js — static fallback data for FeaturedCourses.jsx.
   Every other homepage section now keeps its own local DEFAULT_ITEMS
   fallback and fetches real copy from the CMS via useHomeContent(); this
   file only survives for FEATURED_COURSES/COURSE_TABS, which
   FeaturedCourses.jsx renders immediately before getPublicFeatured()
   resolves (and keeps using if the CMS has no active showcase rows). */

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
  { cats: ["boards"], lvl: "Regional", ribbon: null, stars: 4, count: 89, title: "Regional Boards", fact: "MBSE & more", explore: true, grad: "rgba(20,184,160,0.72),rgba(11,91,62,0.88)", img: IMG("photo-1598981457915-aea220950616"), icon: "compass", to: "/courses", state: { selectedBoardGroup: "state", selectedBoard: "mbse" } },
  // ── Competitive (launching soon) ──
  { cats: ["competitive", "all"], lvl: "Medical", ribbon: "Popular", stars: 5, count: 41, title: "NEET Preparation", fact: "Live + Recorded · Launching soon", tutor: "Dr. D. Ralte", avColor: "#0B5B3E", soon: true, grad: "rgba(236,78,134,0.72),rgba(193,58,104,0.88)", img: IMG("photo-1505751172876-fa1923c5c528"), icon: "flask" },
  { cats: ["competitive"], lvl: "Civil Services", ribbon: null, stars: 4, count: 75, title: "UPSC & Civil Services", fact: "Live + Recorded · Launching soon", tutor: "K. Zoramthanga", avColor: "#FFB21D", soon: true, grad: "rgba(255,178,29,0.72),rgba(242,140,15,0.88)", img: IMG("photo-1554475900-0a0350e3fc7b"), icon: "book" },
  { cats: ["competitive"], lvl: "Engineering", ribbon: null, stars: 5, count: 63, title: "IIT-JEE Preparation", fact: "Live + Recorded · Launching soon", tutor: "A. Sharma", avColor: "#E14D2A", soon: true, grad: "rgba(124,92,252,0.72),rgba(75,52,199,0.88)", img: IMG("photo-1614283226124-5a2f0f23752b"), icon: "calc" },
  { cats: ["competitive"], lvl: "SSC · Banking", ribbon: null, stars: 4, count: 54, title: "Government Exams", fact: "Live + Recorded · Launching soon", tutor: "T. Lalhmingthanga", avColor: "#12b3a6", soon: true, grad: "rgba(20,184,160,0.72),rgba(11,91,62,0.88)", img: IMG("photo-1584982751601-97dcc096659c"), icon: "book" },
  { cats: ["competitive"], lvl: "NDA · CDS", ribbon: null, stars: 4, count: 38, title: "Defence Exams", fact: "Live + Recorded · Launching soon", tutor: "Maj. R. Singh (Retd.)", avColor: "#3b82f6", soon: true, grad: "rgba(59,130,246,0.72),rgba(29,78,216,0.88)", img: IMG("photo-1590821091890-bdcc3c1e2b37"), icon: "book" },
  { cats: ["competitive"], lvl: "Accountancy", ribbon: null, stars: 5, count: 47, title: "CA Program", fact: "Live + Recorded · Launching soon", tutor: "CA V. Malsawma", avColor: "#0F9D6B", soon: true, grad: "rgba(15,157,107,0.72),rgba(20,184,160,0.88)", img: IMG("photo-1532187643603-ba119ca4109e"), icon: "calc" },
  { cats: ["competitive"], lvl: "Olympiads", ribbon: null, stars: 4, count: 29, title: "Olympiad & Foundation", fact: "Live + Recorded · Launching soon", tutor: "R. Vanlalhriati", avColor: "#FF7A45", soon: true, grad: "rgba(255,122,69,0.72),rgba(225,77,42,0.88)", img: IMG("photo-1741699428220-65f37f3fbbcb"), icon: "flask" },
];
