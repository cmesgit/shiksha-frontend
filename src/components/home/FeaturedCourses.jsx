
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FEATURED_COURSES, COURSE_TABS, ALL_TAB } from "./homeData";
import { getPublicFeatured, toFeaturedCard } from "../../api/coursesApi";
import { useHomeContent } from "../../hooks/useHomeContent";
import useEnrollmentStatus, { enrollLabelFor } from "../../hooks/useEnrollmentStatus";
import { useAuth } from "../../contexts/AuthContext";

// Only the .fc-* rules for this grid. The shared tokens and the
// .wrap/.sec/.sec-head/.eyebrow/.btn vocabulary this markup also uses come
// from ShikshaHome.css, imported once by the homepage composer
// (ShikshaHome.jsx) — which is the only place this component renders.
import CourseCard from "../courses/CourseCard";
import "../../css/FeaturedCourses.css";


// ── Icons (paths copied 1:1 from the original static markup) ──────────────
// NOTE: StarSVG/StarRow lived here and rendered `stars` + `review_count` from
// the showcase card. Those were hand-typed numbers, not an aggregate over any
// review table — the platform has no course-review model at all — so the card
// was showing fabricated social proof. Removed along with the backend columns
// (content migration 0017). Re-add only when real reviews exist to average.
const ClockSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const ArrowSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const CAT_ICON_PATHS = {
  book: <><path d="M4 19V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2z" /><path d="M4 19a2 2 0 0 0 2 2h14" /></>,
  flask: <><path d="M9.5 3h5M10 3v5.5L4.8 18a2 2 0 0 0 1.8 3h10.8a2 2 0 0 0 1.8-3L14 8.5V3" /><path d="M7.5 15h9" /></>,
  calc: <><rect x="5" y="3.5" width="14" height="17" rx="2.5" /><path d="M8.5 8h7M8.5 12.5h.01M12 12.5h.01M15.5 12.5h.01M8.5 16.5h.01M12 16.5h.01M15.5 16.5h.01" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m14.8 9.2-1.6 4.8-4.8 1.6 1.6-4.8z" /></>,
  pulse: <path d="M3 12h4l2.5-6 4 12 2.5-6h5" />,
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></>,
  bank: <><path d="M4 21V7l7-3 7 3v14" /><path d="M9 21v-5h4v5" /><path d="M8 10h.01M8 14h.01M13 10h.01M13 14h.01" /></>,
  shield: <path d="M12 3l7 3v5c0 5-3 9-7 10-4-1-7-5-7-10V6z" />,
  medal: <><circle cx="12" cy="10" r="5.5" /><path d="m9 14.5-2 6 5-2.7 5 2.7-2-6" /></>,
  institution: <><path d="M3 21h18" /><path d="M5 21V10M9 21V10M15 21V10M19 21V10" /><path d="M3 10l9-6 9 6" /></>,
};

function CatIcon({ icon }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {CAT_ICON_PATHS[icon] || CAT_ICON_PATHS.book}
    </svg>
  );
}

/* Adapter: a featured/showcase card -> the shared CourseCard's model.
 *
 * Spreads `c` so the navigation handlers still receive courseId/courseSlug/
 * to/state and keep working untouched. The added keys are display-only.
 */
function toHomeCard(c) {
  return {
    ...c,
    categories: c.cats,
    image: c.img,
    // The card's own artwork, used only when there is no photo. The full
    // linear-gradient() wrapper belongs here because `grad` stores the STOPS
    // only — the same split the admin preview got wrong.
    gradient: `linear-gradient(135deg,${c.grad})`,
    icon: <CatIcon icon={c.icon} />,
    levelLabel: c.lvl,
    factIcon: <ClockSVG />,
    isFree: c.free,
    amount: c.price,
    isComingSoon: c.soon,
    isExplore: c.explore,
    // A showcase row with no linked course has no chapters to show, and an
    // "Explore Programs" card is a category rather than a course.
    canViewSyllabus: !c.explore && !c.soon && !!(c.courseSlug || c.courseId),
    arrow: <ArrowSVG />,
    revealOnScroll: true,
  };
}

// Same static fallback as the original homepage — replaced by the CMS
// "featured_courses" content block the moment it's populated, matching the
// "replace-if-present" convention used by Cta/Resources/WhyChooseShiksha.
const DEFAULTS = {
  eyebrow: "Featured Courses",
  heading: "Explore our",
  heading_secondary: "popular courses",
  subhead:
    "Some of our most popular academic and competitive programs, built to help learners succeed with structured guidance.",
};

// Two full rows at the 3-column desktop grid. Overridable per-environment via
// the featured_courses block's extra.max_cards — see the note where it's read.
const DEFAULT_MAX_CARDS = 6;

export default function FeaturedCourses() {
  const rootRef = useRef(null);
  const navigate = useNavigate();
  const { block } = useHomeContent("featured_courses");
  // Anonymous visitors short-circuit inside the hook and issue no requests, so
  // this stays safe on the public homepage.
  const { isAuthenticated } = useAuth();
  const { statusByCourseId } = useEnrollmentStatus(isAuthenticated);
  const [courses, setCourses] = useState(FEATURED_COURSES);
  const [activeTab, setActiveTab] = useState(ALL_TAB.id);
  // Seeded with the fallback so the tab row paints on first render, then
  // replaced by the CMS rows the featured payload carries.
  const [tabs, setTabs] = useState(COURSE_TABS);

  const eyebrow = block?.eyebrow || DEFAULTS.eyebrow;
  const heading = block?.heading || DEFAULTS.heading;
  const headingSecondary = block?.heading_secondary || DEFAULTS.heading_secondary;
  const subhead = block?.subhead || DEFAULTS.subhead;

  // Paint immediately with the curated fallback (homeData.js), then swap in
  // real CMS showcase rows if the backend has any active ones — see
  // homeData.js's own header comment for why the fallback stays.
  useEffect(() => {
    let cancelled = false;
    getPublicFeatured().then(({ cards, tabs: apiTabs }) => {
      if (cancelled) return;
      if (cards.length) setCourses(cards.map(toFeaturedCard));
      // Tabs are CMS rows now (content.ShowcaseCategory). Only replace the
      // fallback when the backend actually sent some: an empty list means
      // either a stale cached response written before the backend sent the
      // key, or a failure — and rendering a grid with no filters at all is
      // worse than rendering the three it has always had.
      // ALL_TAB is prepended here, not sent by the server. Without it the
      // default activeTab ("all") would match no tab at all and the grid would
      // load empty with no way back.
      if (apiTabs.length) {
        setTabs([ALL_TAB, ...apiTabs]);
        // The fallback row is clickable before this response lands, so a
        // visitor can already have selected a tab the CMS has since switched
        // off. Falling back to All beats an empty grid with nothing selected.
        setActiveTab((cur) =>
          cur === ALL_TAB.id || apiTabs.some((t) => t.id === cur)
            ? cur
            : ALL_TAB.id
        );
      }
    });
    return () => { cancelled = true; };
  }, []);

  // How many cards the homepage grid shows. Every active ShowcaseCourse row is
  // returned by /courses/public/featured/ and nothing used to cap the grid, so
  // the homepage grew a card at a time as rows were added — 18 rows meant six
  // rows of cards. The "All courses" link below the grid is the way through to
  // the full catalog.
  //
  // Editable per-environment via the featured_courses block's extra.max_cards
  // so the number can be tuned without a deploy; 0 or a blank value means "no
  // cap", which is the only way back to the old behaviour.
  const rawMaxCards = block?.extra?.max_cards;
  const parsedMaxCards = Number(rawMaxCards);
  const maxCards =
    rawMaxCards === undefined || rawMaxCards === null || rawMaxCards === ""
      ? DEFAULT_MAX_CARDS
      : parsedMaxCards;

  const matching =
    activeTab === "all"
      ? courses
      : courses.filter((c) => c.cats.includes(activeTab));

  const capped = Number.isFinite(maxCards) && maxCards > 0;

  // The "All" tab has to represent the whole catalog, but a flat slice of it
  // could not. Showcase rows are ordered by the admin's `order`, and the seed
  // lays every Class 8–12 card down first, so `matching.slice(0, 6)` returned
  // six Class 8–12 cards and nothing else — the Boards and Competitive cards
  // were invisible unless a visitor thought to click their tab. On a section
  // headed "academic and competitive programs" that is exactly backwards.
  //
  // So on "All" only, deal one card from each category in turn (a card with
  // several categories is dealt once, under its first) before taking a second
  // from any. Within a category the admin's `order` still decides, and a
  // category with fewer cards than the others simply drops out of later
  // rounds rather than holding a slot open.
  const interleaveByCategory = (list) => {
    const buckets = new Map();
    list.forEach((c) => {
      const key = c.cats?.[0] || "";
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(c);
    });
    const queues = [...buckets.values()];
    const out = [];
    while (out.length < list.length) {
      let dealt = false;
      for (const q of queues) {
        const next = q.shift();
        if (next) { out.push(next); dealt = true; }
      }
      if (!dealt) break; // every queue empty — guards against an infinite loop
    }
    return out;
  };

  const ordered =
    activeTab === "all" && capped ? interleaveByCategory(matching) : matching;

  const visible = capped ? ordered.slice(0, maxCards) : ordered;

  // /courses/:slug resolves by slug (Courses.jsx -> getPublicCourseBySlug), so
  // the old `/courses/${c.courseId}` sent a UUID into a slug lookup, 404'd, and
  // silently dropped the visitor on the bare catalog — every "Enroll now" on a
  // course-linked card was dead. Prefer the slug; fall back to the id via the
  // `?open=` path the catalog does resolve by id.
  const goToCourse = (c) => {
    if (c.courseSlug) navigate(`/courses/${c.courseSlug}`);
    else if (c.courseId) navigate(`/courses?open=${c.courseId}`);
    else if (c.to) navigate(c.to, c.state ? { state: c.state } : undefined);
    else navigate("/courses");
  };

  // Same destination, but /courses/:slug lands on the chapter-wise "Course
  // Contents" view (SubjectList), which IS the syllabus. Only offered when we
  // can actually get there.
  const goToSyllabus = (c) => {
    if (c.courseSlug) navigate(`/courses/${c.courseSlug}`);
    else if (c.courseId) navigate(`/courses?open=${c.courseId}`);
  };

  // Reveal-on-scroll, scoped to this section and re-attached whenever the
  // card list changes (real CMS rows swap in, or a tab filter re-renders).
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      },
      { threshold: 0.12 }
    );
    root.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [courses, activeTab]);

  return (
    <>
      <section className="sec" id="courses" ref={rootRef}>
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><u>{eyebrow}</u></span>
            <h2>{heading}{headingSecondary ? <> <span className="em">{headingSecondary}</span></> : null}</h2>
            <p>{subhead}</p>
          </div>

          <div className="fc-tabs rv" role="tablist" aria-label="Filter courses">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                className="fc-tab"
                role="tab"
                aria-selected={activeTab === t.id}
                data-filter={t.id}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="fc-grid" id="courseGrid">
            {visible.map((c) => (
              <CourseCard
                key={c.title}
                variant="home"
                card={toHomeCard(c)}
                onAction={goToCourse}
                onSyllabus={goToSyllabus}
                // Only course-linked cards can be enrolled in; a board or
                // "Explore Programs" card has no course id to look up.
                enrollmentStatus={c.courseId ? statusByCourseId[c.courseId] : undefined}
              />
            ))}
          </div>

          <div className="center rv">
            <Link className="btn btn-ghost" to="/courses">
              All courses <ArrowSVG />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
