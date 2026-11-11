/**
 * Per-route title/description for the public pages.
 *
 * Only stable, content-bearing public routes belong here. Dynamic detail
 * pages (a blog post, a course, a counselling guide) should call <Seo />
 * themselves with the fetched record's own title — a generic entry here
 * would be worse than the fallback, because it would claim every post has
 * the same title.
 *
 * Copy rules followed below:
 *   - Describe what is actually live. The competitive-exam tracks (IIT-JEE,
 *     NEET, UPSC, SSC, Banking) are all flagged `soon` in the nav menu, so
 *     no description here promises them.
 *   - Boards that are live are CBSE and MBSE (Mizoram). The other 28 state
 *     boards in the nav are `soon`.
 */

export const DEFAULT_TITLE =
  "ShikshaCom — Online classes for CBSE & MBSE, Classes 8–12";

/** exact pathname -> { title, description, noindex? } */
export const ROUTE_META = {
  "/": {
    title: DEFAULT_TITLE,
    description:
      "Live and recorded classes for CBSE and Mizoram Board (MBSE), Classes 8–12. Study material, practice quizzes, a student forum and free career counselling.",
  },
  "/courses": {
    title: "Courses — CBSE & MBSE, Classes 8–12",
    description:
      "Browse ShikshaCom's course catalogue for CBSE and Mizoram Board (MBSE), Classes 8 to 12, with subject lists, batches and enrolment details.",
  },
  "/about": {
    title: "About us",
    description:
      "ShikshaCom is an online learning platform from Northeast India, built around affordable, structured teaching for school students.",
  },
  "/contact": {
    title: "Contact us",
    description:
      "Get in touch with ShikshaCom — offices in Gurgaon, Haryana and Mizoram. Phone, email and an enquiry form.",
  },
  "/faq": {
    title: "Frequently asked questions",
    description:
      "How enrolment works, whether live classes are recorded, which boards are supported, and how to study on a phone.",
  },
  "/blogs": {
    title: "Blog — chapter notes and study guides",
    description:
      "Chapter-wise notes, explanations and study guides written for CBSE and MBSE students across Classes 8–12.",
  },
  "/current-affairs": {
    title: "Current affairs",
    description:
      "Current affairs summaries for competitive-exam and board-exam preparation.",
  },
  "/forum": {
    title: "Discussion forum",
    description:
      "Ask questions, share what you know, and learn from other students and teachers on the ShikshaCom community forum.",
  },
  "/explore": {
    title: "Explore library",
    description:
      "A shared library of notes, past papers and learning resources uploaded by the ShikshaCom community.",
  },
  "/explore/browse": {
    title: "Browse the Explore library",
    description:
      "Search and filter notes, past papers and study documents in the ShikshaCom Explore library.",
  },
  "/quiz": {
    title: "Practice quizzes",
    description:
      "Free practice quizzes with instant scoring, for board-exam revision and daily practice.",
  },
  "/counselling": {
    title: "Career counselling",
    description:
      "Free career guidance for school students — understand your options after Class 10 and Class 12, and talk to a counsellor.",
  },
  "/counselling/guides": {
    title: "Career guides",
    description:
      "Stage-by-stage career guides covering streams, entrance exams, courses and admission timelines for students in India.",
  },
  "/admission/india": {
    title: "Admission in India",
    description:
      "A directory of colleges and admission routes in India, with streams, entrance exams and NIRF rankings.",
  },
  "/skill/browse": {
    title: "Skill development — browse experts",
    description:
      "Learn practical skills from working professionals. Browse mentors and book a one-to-one session.",
  },
  "/scholarship": {
    title: "Instant Scholarship",
    description:
      "Take a short online test and get an instant scholarship on your ShikshaCom course fee.",
  },
  "/become-faculty": {
    title: "Teach on ShikshaCom",
    description:
      "Apply to teach on ShikshaCom — reach students across Northeast India with live and recorded classes.",
  },
  "/become-expert": {
    title: "Become a skill expert",
    description:
      "Share a professional skill on ShikshaCom Skill Development and mentor learners one to one.",
  },
  "/general-studies": {
    title: "General studies",
    description: "General studies resources and reading material on ShikshaCom.",
  },
  "/feedback": {
    title: "Send feedback",
    description: "Tell the ShikshaCom team what is working and what is not.",
  },
  "/terms": {
    title: "Terms of use",
    description: "The terms governing your use of the ShikshaCom website and services.",
  },
  "/privacy": {
    title: "Privacy policy",
    description:
      "How ShikshaCom collects, uses and protects personal data under the Digital Personal Data Protection Act, 2023.",
  },

  // Auth and account screens: real pages, but nothing to index. They are
  // Disallow:ed in robots.txt too; the meta tag is the belt to that braces,
  // since robots.txt blocks crawling, not indexing of a linked URL.
  "/login":    { title: "Log in",   noindex: true },
  "/register": { title: "Sign up",  noindex: true },
  "/forgot-password": { title: "Reset your password", noindex: true },
};

/**
 * Longest-prefix match, so /counselling/guides beats /counselling and an
 * unlisted child (/counselling/spark) still inherits a sensible parent
 * rather than falling all the way back to the site default.
 *
 * Exact matches win outright; "/" is excluded from prefix matching or it
 * would match every path on the site.
 */
export function metaForPath(pathname) {
  if (ROUTE_META[pathname]) return ROUTE_META[pathname];

  const clean = pathname.replace(/\/+$/, "") || "/";
  if (ROUTE_META[clean]) return ROUTE_META[clean];

  let best = null;
  for (const key of Object.keys(ROUTE_META)) {
    if (key === "/") continue;
    if (clean === key || clean.startsWith(key + "/")) {
      if (!best || key.length > best.length) best = key;
    }
  }
  return best ? ROUTE_META[best] : null;
}
