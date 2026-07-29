/**
 * HomeGreen.jsx — redesigned ShikshaCom homepage.
 *
 * A faithful React port of the approved static design
 * (shiksha-home-green, iteration 9): hero with illustrated disc,
 * auto-scrolling "why" cards, teacher/learner duo, category cards,
 * tabbed featured-course showcase, "why choose" panel, FAQ and CTA.
 *
 * All copy/card data lives in ./homeData.js; styles in css/HomeGreen.css
 * (fully scoped under .hm-root, so nothing leaks into other pages).
 */
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import useReveal from "./useReveal";
import {
  WHY_CARDS,
  CATEGORIES,
  COURSE_TABS,
  FEATURED_COURSES,
  WHY_CHOOSE_CHECKS,
  RESOURCES,
  COLLAB_CHIPS,
  COLLAB_STATS,
  FAQS,
} from "./homeData";
import { getFaqs } from "../../api/contentApi";
import { getPublicFeatured, toFeaturedCard } from "../../api/coursesApi";
import {
  IcArrowRight,
  IcArrowLeft,
  IcSearch,
  IcVideo,
  IcCheck,
  IcGradCap,
  IcShield,
  IcPhone,
  IcEye,
  IcChat,
  IcBook,
  IcTarget,
  IcBriefcase,
  IcClock,
  IcHeart,
  IcPlay,
  IcStar,
  IcPlus,
  IcLightbulb,
  IcSparkles,
  IcTrendingUp,
  IcMonitor,
  IcGlobe,
} from "./HomeIcons";

import heroArt from "../../assets/home/hero-illustration.svg";
import whyArt from "../../assets/home/why-illustration.svg";
import collabArt from "../../assets/home/collab-illustration.svg";
import "../../css/HomeGreen.css";

const ICONS = {
  video: IcVideo,
  gradcap: IcGradCap,
  shield: IcShield,
  phone: IcPhone,
  eye: IcEye,
  chat: IcChat,
  book: IcBook,
  target: IcTarget,
  briefcase: IcBriefcase,
  lightbulb: IcLightbulb,
  sparkles: IcSparkles,
  trendingup: IcTrendingUp,
  monitor: IcMonitor,
};

/* tiny thumbnail glyphs used on course cards */
const ThumbIcon = ({ kind }) => {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  if (kind === "flask")
    return (
      <svg {...common}>
        <path d="M9.5 3h5M10 3v5.5L4.8 18a2 2 0 0 0 1.8 3h10.8a2 2 0 0 0 1.8-3L14 8.5V3" />
        <path d="M7.5 15h9" />
      </svg>
    );
  if (kind === "calc")
    return (
      <svg {...common}>
        <rect x="5" y="3.5" width="14" height="17" rx="2.5" />
        <path d="M8.5 8h7M8.5 12.5h.01M12 12.5h.01M15.5 12.5h.01M8.5 16.5h.01M12 16.5h.01M15.5 16.5h.01" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M4 19V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2z" />
      <path d="M4 19a2 2 0 0 0 2 2h14" />
    </svg>
  );
};

const scrollToPrograms = () => {
  document
    .getElementById("hm-programs")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ═══════════════════ HERO ═══════════════════ */
function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const goSearch = () => {
    const q = query.trim();
    if (category === "school") {
      navigate("/courses", {
        state: {
          resetCourses: Date.now(),
          searchQuery: q,
          selectedBoardGroup: "central",
          selectedBoard: "cbse",
        },
      });
    } else if (category === "jee" || category === "neet" || category === "upsc") {
      navigate("/general-studies");
    } else {
      navigate("/courses", { state: { resetCourses: Date.now(), searchQuery: q } });
    }
  };

  return (
    <section className="hm-hero hm-wrap">
      <div className="hm-hero-grid">
        <div className="hm-hero-vis hm-rv">
          <svg className="hm-doodle hm-d1" viewBox="0 0 80 80" fill="none" aria-hidden="true">
            <ellipse cx="40" cy="40" rx="37" ry="19" stroke="currentColor" strokeWidth="2" transform="rotate(32 40 40)" />
            <circle cx="75" cy="28" r="3.5" fill="currentColor" />
          </svg>
          <svg className="hm-doodle hm-d2" viewBox="0 0 96 24" fill="none" aria-hidden="true">
            <path d="M2 12c8-9 16 9 24 0s16-9 24 0 16 9 24 0" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
          <span className="hm-doodle hm-d3" />
          <span className="hm-doodle hm-d4" />

          <div className="hm-hero-disc">
            <div className="hm-hero-art">
              <img src={heroArt} alt="Students and a teacher in an online classroom" />
            </div>
          </div>

          <div className="hm-float hm-f1">
            <span className="hm-fi" style={{ background: "var(--coral-soft)", color: "var(--coral)" }}>
              <IcVideo />
            </span>
            <div>
              <b>Live class</b>
              <span>Class 10 · Maths · now</span>
            </div>
            <span className="hm-livedot" />
          </div>
          <div className="hm-float hm-f2">
            <span className="hm-fi" style={{ background: "#dff5e9", color: "var(--green)" }}>
              <IcCheck />
            </span>
            <div>
              <b>Doubt cleared</b>
              <span>Notes shared · 5:42 PM</span>
            </div>
          </div>
        </div>

        <div className="hm-hero-copy hm-rv">
          <h1>
            Learn every day &amp; ace school and{" "}
            <span className="hm-mark">
              competitive exams
              <svg viewBox="0 0 300 70" fill="none" preserveAspectRatio="none" aria-hidden="true">
                <path d="M150 6C90 4 20 12 10 34c-9 20 60 30 140 30s148-11 140-31C282 14 214 5 150 6z" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="hm-hero-sub">
            Structured learning for Classes 8–12, board examinations and
            national-level competitive exams — with expert educators, live
            &amp; recorded classes, and flexible digital learning.
          </p>
          <div className="hm-searchbar">
            <span className="hm-si">
              <IcSearch width="19" height="19" />
            </span>
            <input
              placeholder='Try "Class 10 Maths" or "NEET Biology"…'
              aria-label="Search courses"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && goSearch()}
            />
            <select
              aria-label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Programs</option>
              <option value="school">School Academics</option>
              <option value="jee">IIT-JEE</option>
              <option value="neet">NEET</option>
              <option value="upsc">UPSC</option>
            </select>
            <button className="hm-btn hm-btn-coral" type="button" onClick={goSearch}>
              Search now
            </button>
          </div>
          <p className="hm-hero-tag">
            <b>Guest preview free</b> · CBSE · NCERT · MBSE aligned · Live + Recorded
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ WHY SHIKSHA — scrolling cards ═══════════════════ */
function WhyShiksha() {
  const trackRef = useRef(null);
  const autoRef = useRef(null);
  const resumeRef = useRef(null);

  const step = () => {
    const card = trackRef.current?.querySelector(".hm-deal");
    return card ? Math.round(card.getBoundingClientRect().width) + 20 : 310;
  };

  const advance = () => {
    const el = trackRef.current;
    if (!el) return;
    const maxLeft = el.scrollWidth - el.clientWidth - 2;
    if (el.scrollLeft >= maxLeft) el.scrollTo({ left: 0, behavior: "smooth" });
    else el.scrollBy({ left: step(), behavior: "smooth" });
  };

  const stopAuto = () => {
    if (autoRef.current) {
      clearInterval(autoRef.current);
      autoRef.current = null;
    }
  };
  const startAuto = () => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || autoRef.current) return;
    autoRef.current = setInterval(advance, 3200);
  };
  const pauseAuto = () => {
    stopAuto();
    clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(startAuto, 6000);
  };

  useEffect(() => {
    startAuto();
    return () => {
      stopAuto();
      clearTimeout(resumeRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nudge = (dir) => {
    pauseAuto();
    trackRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
  };

  return (
    <section className="hm-sec" style={{ paddingTop: "clamp(30px,4vw,54px)" }}>
      <div className="hm-wrap">
        <div className="hm-deals">
          <div className="hm-deals-head hm-rv">
            <h2>Why learners choose Shiksha</h2>
            <p>Everything a student needs to learn, practise and grow — in one place.</p>
            <div className="hm-deals-arrows">
              <button className="hm-arrow" aria-label="Previous" type="button" onClick={() => nudge(-1)}>
                <IcArrowLeft />
              </button>
              <button className="hm-arrow" aria-label="Next" type="button" onClick={() => nudge(1)}>
                <IcArrowRight />
              </button>
            </div>
          </div>
          <div
            className="hm-deals-scroll hm-rv"
            ref={trackRef}
            onMouseEnter={stopAuto}
            onMouseLeave={startAuto}
            onTouchStart={pauseAuto}
          >
            {WHY_CARDS.map((card) => {
              const Icon = ICONS[card.icon];
              return (
                <div className="hm-deal" key={card.title}>
                  <span className="hm-deal-ic" style={{ background: card.tint }}>
                    <Icon />
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ TEACHERS & STUDENTS ═══════════════════ */
function Audience() {
  return (
    <section className="hm-sec hm-peach">
      <div className="hm-wrap">
        <div className="hm-sec-head hm-rv">
          <span className="hm-eyebrow">
            <u>Teachers &amp; Students</u>
          </span>
          <h2>
            What are you <span className="hm-em">looking for?</span>
          </h2>
        </div>
        <div className="hm-duo">
          <div className="hm-duo-card hm-teach hm-rv">
            <span className="hm-duo-ghost" aria-hidden="true">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M50 20 L92 40 L50 60 L8 40 Z" />
                <path d="M22 50 v18 c0 4 12 10 28 10 s28 -6 28 -10 v-18" />
                <path d="M88 44 v22" />
                <path d="M86 66 c-1 4 -3 4 -4 0" />
              </svg>
            </span>
            <span className="hm-duo-pill">For Educators</span>
            <div className="hm-duo-ill">
              <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="40" y="16" width="42" height="32" rx="4" />
                <path d="M48 41l6-8 5 5 9-12" />
                <path d="M61 48v8" />
                <path d="M52 68l9-12 9 12" />
                <circle cx="24" cy="32" r="8" />
                <path d="M12 70c0-10 5-18 12-18s12 8 12 18" />
                <path d="M33 47l9-6" />
              </svg>
            </div>
            <h3>Do you want to teach here?</h3>
            <p>
              Share your knowledge, create and upload your own courses, teach
              live or record lessons, and reach learners across the country.
            </p>
            <Link className="hm-btn hm-btn-ghost" to="/become-faculty">
              Become a tutor <IcArrowRight />
            </Link>
          </div>

          <div className="hm-duo-card hm-learn hm-rv">
            <span className="hm-duo-ghost" aria-hidden="true">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="14" y="66" width="72" height="14" rx="3" />
                <rect x="20" y="48" width="60" height="14" rx="3" />
                <rect x="26" y="30" width="48" height="14" rx="3" />
                <path d="M32 37 h6 M32 55 h6 M32 73 h6" />
              </svg>
            </span>
            <span className="hm-duo-pill">For Learners</span>
            <div className="hm-duo-ill">
              <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M48 30v46" />
                <path d="M48 30C40 24 28 22 18 25v42c10-3 22-1 30 5" />
                <path d="M48 30c8-5 20-7 30-5v42c-10-2-22 0-30 5" />
                <path d="M25 37c5-1 11 0 15 3M25 47c5-1 11 0 15 3" />
                <path d="M56 40c5-3 11-4 15-3M56 50c5-3 11-4 15-3" />
              </svg>
            </div>
            <h3>Do you want to learn here?</h3>
            <p>
              Preview courses as a guest, enrol in structured programs for your
              class or exam, and learn with live classes, recordings and doubt
              support.
            </p>
            <button className="hm-btn hm-btn-coral" type="button" onClick={scrollToPrograms}>
              Start learning <IcArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ BROWSE CATEGORIES ═══════════════════ */
function Categories() {
  const navigate = useNavigate();
  return (
    <section className="hm-sec hm-peach" id="hm-programs" style={{ paddingTop: 0 }}>
      <div className="hm-wrap">
        <div className="hm-sec-head hm-rv">
          <span className="hm-eyebrow">
            <u>Browse Categories</u>
          </span>
          <h2>
            Explore our <span className="hm-em">learning categories</span>
          </h2>
          <p>
            Choose the path that matches your academic goals — programs
            designed by experienced educators.
          </p>
        </div>
        <div className="hm-cats">
          {CATEGORIES.map((cat) => {
            const Icon = ICONS[cat.icon];
            return (
              <div className="hm-cat hm-rv" key={cat.title}>
                <div className={`hm-cat-head hm-${cat.grad}`}>
                  <div className="hm-cat-head-row">
                    <span className="hm-cat-ic">
                      <Icon />
                    </span>
                    <div>
                      <b>{cat.title}</b>
                      <i>{cat.sub}</i>
                    </div>
                  </div>
                </div>
                <div className="hm-cat-body">
                  <div className="hm-cat-pills">
                    {cat.pills.map((p) => (
                      <span className="hm-cat-pill" key={p}>
                        {p}
                      </span>
                    ))}
                  </div>
                  <div className="hm-cat-stat">
                    <IcCheck />
                    {cat.stat}
                  </div>
                  <button
                    className="hm-cat-cta"
                    type="button"
                    onClick={() =>
                      navigate(cat.to, cat.state ? { state: cat.state } : undefined)
                    }
                  >
                    {cat.cta} <IcArrowRight />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="hm-center hm-rv">
          <Link className="hm-btn hm-btn-coral" to="/courses">
            All categories <IcArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ FEATURED COURSES ═══════════════════ */
function FeaturedCourses() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [saved, setSaved] = useState(() => new Set());
  // Static cards render immediately (identical to before); if the CMS
  // has any active showcase rows, they fully replace the static set —
  // once someone starts curating this section in the admin, it should
  // be authoritative rather than merged with hardcoded defaults.
  const [courses, setCourses] = useState(FEATURED_COURSES);

  useEffect(() => {
    let alive = true;
    getPublicFeatured().then((rows) => {
      if (alive && rows.length) setCourses(rows.map(toFeaturedCard));
    });
    return () => {
      alive = false;
    };
  }, []);

  const toggleSave = (idx) =>
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });

  const visible = courses.map((c, i) => ({ ...c, idx: i })).filter(
    (c) => filter === "all" || c.cats.includes(filter)
  );

  return (
    <section className="hm-sec" id="hm-courses">
      <div className="hm-wrap">
        <div className="hm-sec-head hm-rv">
          <span className="hm-eyebrow">
            <u>Featured Courses</u>
          </span>
          <h2>
            Explore our <span className="hm-em">popular courses</span>
          </h2>
          <p>
            Some of our most popular academic and competitive programs, built
            to help learners succeed with structured guidance.
          </p>
        </div>

        <div className="hm-fc-tabs hm-rv" role="tablist" aria-label="Filter courses">
          {COURSE_TABS.map((tab) => (
            <button
              key={tab.id}
              className="hm-fc-tab"
              role="tab"
              type="button"
              aria-selected={filter === tab.id}
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="hm-fc-grid">
          {visible.map((c) => (
            <article className="hm-fc-card hm-rv hm-in" key={c.idx}>
              <div
                className="hm-fc-thumb"
                style={{
                  background: `linear-gradient(135deg,${c.grad}),url('${c.img}') center/cover`,
                }}
              >
                <span className="hm-fc-thumb-ic">
                  <ThumbIcon kind={c.icon} />
                </span>
                {c.ribbon && <span className="hm-fc-ribbon">{c.ribbon}</span>}
                <button
                  className={`hm-fc-heart${saved.has(c.idx) ? " hm-on" : ""}`}
                  aria-label="Save course"
                  aria-pressed={saved.has(c.idx)}
                  type="button"
                  onClick={() => toggleSave(c.idx)}
                >
                  <IcHeart />
                </button>
                <span className="hm-fc-lvl">{c.lvl}</span>
              </div>
              <div className="hm-fc-body">
                <div className="hm-fc-rate">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <IcStar key={s} off={s >= c.stars} />
                  ))}
                  <span>({c.count})</span>
                </div>
                <h3>{c.title}</h3>
                <div className="hm-fc-fact">
                  <IcClock />
                  {c.fact}
                </div>
                <div className="hm-fc-foot">
                  {c.explore ? (
                    <button
                      type="button"
                      className="hm-fc-explore"
                      onClick={() =>
                        navigate(c.to, c.state ? { state: c.state } : undefined)
                      }
                    >
                      Explore Programs
                    </button>
                  ) : c.soon ? (
                    <>
                      <span className="hm-fc-tutor">
                        <span className="hm-fc-av" style={{ background: "#0B5B3E" }}>
                          {c.tutor[0]}
                        </span>
                        {c.tutor}
                      </span>
                      <span className="hm-fc-price hm-soon">Coming Soon</span>
                    </>
                  ) : (
                    <>
                      <span className="hm-fc-price">
                        ₹{c.price}
                        <small> /month</small>
                      </span>
                      <button
                        type="button"
                        className="hm-fc-enroll"
                        onClick={() =>
                          navigate(c.to || "/courses", {
                            state: {
                              ...(c.state || { selectedBoardGroup: "central", selectedBoard: "cbse" }),
                              ...(c.courseId ? { openCourseId: c.courseId } : null),
                            },
                          })
                        }
                      >
                        Enroll now <IcArrowRight />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="hm-center hm-rv">
          <Link className="hm-btn hm-btn-ghost" to="/courses">
            All courses <IcArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ WHY CHOOSE SHIKSHACOM ═══════════════════ */
function WhyChoose() {
  return (
    <section className="hm-sec hm-peach">
      <div className="hm-wrap">
        <div className="hm-why">
          <div className="hm-why-vis hm-rv">
            <div className="hm-why-panel">
              <div className="hm-why-art">
                <img src={whyArt} alt="A ShikshaCom online lesson in progress" />
              </div>
              <button className="hm-why-play" aria-label="Play intro" type="button">
                <IcPlay />
              </button>
            </div>
            <div className="hm-badge hm-b-tl">
              <span className="hm-bi" style={{ background: "var(--coral-soft)", color: "var(--coral)" }}>
                <IcVideo />
              </span>
              Live + Recorded
            </div>
            <div className="hm-badge hm-b-tr">
              <span className="hm-bi" style={{ background: "#f3edff", color: "var(--violet)" }}>
                <IcBook />
              </span>
              17+ Programs<small>Classes 8–12 &amp; more</small>
            </div>
            <div className="hm-badge hm-b-bl">
              <span className="hm-bi" style={{ background: "#dff5e9", color: "var(--green)" }}>
                <IcCheck />
              </span>
              Guest preview<small>Free · no sign-up</small>
            </div>
          </div>

          <div className="hm-why-copy hm-rv">
            <span className="hm-eyebrow">
              <u>Why ShikshaCom</u>
            </span>
            <h2>
              Why choose <span className="hm-em">ShikshaCom?</span>
            </h2>
            <p>
              ShikshaCom brings structured learning, expert mentorship and
              flexible digital education together — an engaging way to learn
              for school and everything after it.
            </p>
            <div className="hm-checks">
              {WHY_CHOOSE_CHECKS.map((chk) => (
                <div className="hm-check" key={chk.title}>
                  <span className="hm-ck" style={{ background: chk.tint }}>
                    <IcCheck sw={3} />
                  </span>
                  <div>
                    <b>{chk.title}</b>
                    <p>{chk.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="hm-btn hm-btn-coral" type="button" onClick={scrollToPrograms}>
              More details <IcArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ RESOURCES & SUPPORT ═══════════════════ */
function ResourcesSupport() {
  const navigate = useNavigate();
  return (
    <section className="hm-sec" id="hm-resources">
      <div className="hm-wrap">
        <div className="hm-sec-head hm-rv">
          <span className="hm-eyebrow">
            <u>Resources &amp; Support</u>
          </span>
          <h2>
            Beyond the <span className="hm-em">classroom</span>
          </h2>
          <p>
            Extra resources, guidance and opportunities to support students
            throughout their academic journey.
          </p>
        </div>
        <div className="hm-res-grid">
          {RESOURCES.map((res) => {
            const Icon = ICONS[res.icon];
            return (
              <article
                className="hm-res-card hm-rv"
                key={res.title}
                style={{ "--grad": res.grad, "--tint": res.tint, "--ghost": res.ghost }}
              >
                <span className="hm-res-ghost" aria-hidden="true">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="148" cy="152" r="66" fill="currentColor" opacity=".10" />
                    <circle cx="148" cy="152" r="66" stroke="currentColor" strokeWidth="1.5" opacity=".16" />
                    <circle cx="86" cy="128" r="30" stroke="currentColor" strokeWidth="1.5" opacity=".13" />
                    <circle cx="172" cy="92" r="11" fill="currentColor" opacity=".14" />
                  </svg>
                </span>
                <span className="hm-res-ic">
                  <Icon />
                </span>
                <h3>{res.title}</h3>
                <p>{res.text}</p>
                <button
                  type="button"
                  className="hm-res-link"
                  onClick={() => navigate(res.to)}
                >
                  {res.cta} <IcArrowRight />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ LIVE COLLABORATION ═══════════════════ */
function LiveCollaboration() {
  const navigate = useNavigate();
  const chips = (keySuffix) => (
    <div className="hm-chip-group" key={keySuffix} aria-hidden={keySuffix === "b" ? true : undefined}>
      {COLLAB_CHIPS.map((chip) => {
        const Icon = ICONS[chip.icon];
        return (
          <span className="hm-chip" key={chip.label + keySuffix}>
            <span className="hm-ci" style={{ background: chip.grad }}>
              <Icon />
            </span>
            {chip.label}
          </span>
        );
      })}
    </div>
  );

  return (
    <section className="hm-sec hm-peach hm-collab" id="hm-collaborate">
      <div className="hm-wrap">
        <div className="hm-collab-grid">
          <div className="hm-collab-copy hm-rv">
            <span className="hm-eyebrow hm-left">
              <u>Live Collaboration</u>
            </span>
            <h2>
              Learn together, <span className="hm-em">anywhere</span>
            </h2>
            <p className="hm-collab-sub">
              Host or join secure live sessions for classes, meetings,
              workshops, mentoring, interviews, study groups, and
              collaborative discussions — all from one platform.
            </p>

            <div className="hm-chip-marquee">
              <div className="hm-chip-track">
                {chips("a")}
                {chips("b")}
              </div>
            </div>

            <div className="hm-collab-actions">
              <button className="hm-btn hm-btn-coral" type="button" onClick={() => navigate("/live")}>
                Join Session <IcArrowRight />
              </button>
              <button
                className="hm-btn hm-btn-ghost"
                type="button"
                onClick={() => navigate("/live")}
              >
                Host Session <IcPlus />
              </button>
            </div>

            <div className="hm-collab-stats">
              {COLLAB_STATS.map((s) => (
                <button className="hm-stat" type="button" key={s} onClick={() => navigate("/live")}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="hm-collab-vis hm-rv">
            <span className="hm-collab-shape hm-cs1" aria-hidden="true" />
            <span className="hm-collab-shape hm-cs2" aria-hidden="true" />
            <span className="hm-collab-shape hm-cs3" aria-hidden="true" />
            <svg className="hm-collab-shape hm-cs4" viewBox="0 0 80 24" fill="none" aria-hidden="true">
              <path d="M2 12c8-9 16 9 24 0s16-9 24 0 16 9 24 0" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            </svg>

            <div className="hm-glass">
              <img src={collabArt} alt="A live class in session on ShikshaCom" />
            </div>

            <div className="hm-collab-badge hm-cb-top" aria-hidden="true">
              <span className="hm-collab-dot" />
              Live now
            </div>
            <div className="hm-collab-badge hm-cb-bottom" aria-hidden="true">
              <IcGlobe className="hm-collab-badge-ic" />
              Available for everyone
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ FAQ ═══════════════════ */
function Faq() {
  const [open, setOpen] = useState(-1);
  const bodies = useRef([]);
  // Static Q&A render immediately; CMS rows for page="home" fully
  // replace them if any are published (same replace-if-present pattern
  // as the featured courses above).
  const [items, setItems] = useState(() =>
    FAQS.map((f) => ({ q: f.q, a: f.a, html: false }))
  );

  useEffect(() => {
    let alive = true;
    getFaqs("home").then((rows) => {
      if (alive && rows.length) {
        setItems(
          rows.map((r) => ({ q: r.question, a: r.answer_html, html: true }))
        );
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="hm-sec">
      <div className="hm-wrap">
        <div className="hm-sec-head hm-rv">
          <span className="hm-eyebrow">
            <u>Frequently Asked Questions</u>
          </span>
          <h2>
            Have questions? <span className="hm-em">We've got answers.</span>
          </h2>
        </div>
        <div className="hm-faq">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className={`hm-qa hm-rv${isOpen ? " hm-open" : ""}`} key={item.q}>
                <button
                  className="hm-qa-q"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  {item.q}
                  <span className="hm-qa-ic">
                    <IcPlus />
                  </span>
                </button>
                <div
                  className="hm-qa-a"
                  ref={(el) => (bodies.current[i] = el)}
                  style={{
                    maxHeight: isOpen ? bodies.current[i]?.scrollHeight : 0,
                  }}
                >
                  {item.html ? (
                    <div dangerouslySetInnerHTML={{ __html: item.a }} />
                  ) : (
                    <p>{item.a}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ CTA ═══════════════════ */
function Cta() {
  return (
    <section className="hm-sec" style={{ paddingTop: 0 }}>
      <div className="hm-wrap">
        <div className="hm-cta hm-rv">
          <svg className="hm-cwm hm-a" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
          </svg>
          <svg className="hm-cwm hm-b" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
            <path d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5" />
          </svg>
          <span className="hm-eyebrow">
            <u>Start Your Journey</u>
          </span>
          <h2>Your learning starts here</h2>
          <p>
            Create your free account, explore courses with Guest Preview, and
            begin your journey toward academic excellence.
          </p>
          <div className="hm-cta-actions">
            <Link className="hm-btn hm-btn-white" to="/signup">
              Create free account <IcArrowRight />
            </Link>
            <button className="hm-btn hm-btn-out" type="button" onClick={scrollToPrograms}>
              Browse as guest <IcEye />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ PAGE ═══════════════════ */
export default function HomeGreen() {
  const revealRef = useReveal();

  return (
    <main className="hm-root" ref={revealRef}>
      <Hero />
      <WhyShiksha />
      <Audience />
      <Categories />
      <FeaturedCourses />
      <WhyChoose />
      <ResourcesSupport />
      <LiveCollaboration />
      <Faq />
      <Cta />
    </main>
  );
}
