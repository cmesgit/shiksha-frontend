/**
 * Navbar.jsx — redesigned site navigation.
 *
 * React port of the approved "ShikshaCom — Navigation UX/UI" prototype:
 * a fixed, blur-white header with a centred pill nav (Courses ·
 * Resources · About) that opens full-width mega menus, a Ctrl/⌘+K
 * search, auth-aware actions on the right, and a slide-in drawer with
 * accordions on mobile.
 *
 * Every destination maps to a real route in this app. Menu data lives
 * in NAV_MENUS below — edit there to add/remove links.
 * Styles: css/SiteNav.css (all classes prefixed `skn-`).
 */
import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { LayoutDashboard } from "lucide-react";

import { useAuth } from "../contexts/AuthContext";
import { APP_URL, TEACHER_URL, TEACHER_DASHBOARD_URL } from "../config/urls";
import ProfileSwitcher from "../shared/ProfileSwitcher";
import NotificationBell from "./NotificationBell";
import { getAnnouncements } from "../api/contentApi";
import { getPublicNavMenu } from "../api/coursesApi";
import "../css/theme.css";
import "../css/SiteNav.css";
import {
  IcSearch,
  IcMenu,
  IcX,
  IcChevronDown,
  IcArrowRight,
  IcExternal,
  IcBook,
  IcTarget,
  IcBriefcase,
  IcFileText,
  IcGlobe,
  IcForum,
  IcLibrary,
  IcCompass,
  IcInfo,
  IcMail,
  IcHelp,
  IcChat,
  IcEye,
} from "./home/HomeIcons";

/* ────────────────────────── MENU DATA ────────────────────────── */

const CBSE_STATE = { selectedBoardGroup: "central", selectedBoard: "cbse" };
const MBSE_STATE = { selectedBoardGroup: "state", selectedBoard: "mbse" };

// Static first-paint fallback — also the shape the live nav-menu API merges
// into (see mergeLiveNavMenu below). "Skill & Career" has no course-catalog
// backing, so it never changes.
const STATIC_COURSES_MENU = [
  {
    title: "School Education",
    icon: IcBook,
    tabs: [
      {
        id: "central",
        label: "CBSE Board",
        heading: "Central Board (CBSE)",
        links: [
          { label: "Class 8", to: "/courses", state: CBSE_STATE },
          { label: "Class 9", to: "/courses", state: CBSE_STATE },
          { label: "Class 10", to: "/courses", state: CBSE_STATE },
          { label: "Class 11 · Science", to: "/courses", state: CBSE_STATE },
          { label: "Class 11 · Commerce", to: "/courses", state: CBSE_STATE },
          { label: "Class 12", to: "/courses", state: CBSE_STATE },
        ],
      },
      {
        id: "state",
        label: "State Boards",
        heading: "State Boards",
        links: [
          { label: "MBSE Mizoram", to: "/courses", state: MBSE_STATE },
          { label: "BSEAP Andhra Pradesh", soon: true },
          { label: "ASSEB Assam", soon: true },
          { label: "BSEB Bihar", soon: true },
        ],
        viewAll: { label: "View all boards", to: "/courses" },
      },
    ],
  },
  {
    title: "Competitive Exams",
    icon: IcTarget,
    sections: [
      {
        heading: "Prepare",
        links: [
          { label: "General Studies", to: "/general-studies" },
          { label: "Current Affairs", to: "/current-affairs" },
        ],
      },
      {
        heading: "Exam tracks",
        links: [
          { label: "UPSC · Civil Services", soon: true },
          { label: "SSC · Banking", soon: true },
          { label: "Defence (NDA · CDS)", soon: true },
          { label: "State PSC", soon: true },
        ],
      },
    ],
  },
  {
    title: "Skill & Career",
    icon: IcBriefcase,
    sections: [
      {
        heading: "Skill Development",
        links: [
          { label: "Browse Skill Experts", to: "/skill/browse" },
          { label: "Industrial Skills", to: "/skill/browse" },
          { label: "Specialized Skills", to: "/skill/browse" },
        ],
      },
      {
        heading: "Career Guidance",
        links: [
          { label: "Career Counselling", to: "/counselling" },
          // Admission in India is a future directory of Indian
          // colleges/universities with rankings — a different, bigger
          // feature than the existing study-in-india guide (which stays
          // reachable from the Career Counselling guide library instead).
          { label: "Admission in India", soon: true },
          // No source guide exists yet for study-abroad admissions —
          // point this at a real page once one is written, not at a
          // domestic guide that doesn't answer the question.
          { label: "Admission Abroad", soon: true },
        ],
      },
    ],
  },
];

// Merges the live /courses/public/nav-menu/ categories ("school",
// "competitive") into the static menu shape. Only replaces the parts the API
// actually covers: the school tabs wholesale, and just the "Exam tracks"
// section's links (the static "Prepare" section — General Studies/Current
// Affairs — isn't course-catalog data, so it's left untouched). Returns the
// static menu unchanged if the API has nothing usable yet.
function mergeLiveNavMenu(categories) {
  if (!categories.length) return STATIC_COURSES_MENU;
  const school = categories.find((c) => c.key === "school");
  const competitive = categories.find((c) => c.key === "competitive");

  return STATIC_COURSES_MENU.map((cat) => {
    if (cat.title === "School Education" && school?.tabs?.length) {
      return { ...cat, tabs: school.tabs };
    }
    if (cat.title === "Competitive Exams" && competitive?.sections?.[0]?.links?.length) {
      return {
        ...cat,
        sections: cat.sections.map((sec) =>
          sec.heading === "Exam tracks"
            ? { ...sec, links: competitive.sections[0].links }
            : sec
        ),
      };
    }
    return cat;
  });
}

const RESOURCES_MENU = [
  { title: "Blogs", icon: IcFileText, to: "/blogs", desc: "Chapter-wise study articles." },
  { title: "Current Affairs", icon: IcGlobe, to: "/current-affairs", desc: "Daily and monthly updates." },
  { title: "Forum", icon: IcForum, to: "/forum", desc: "Ask and answer with peers." },
  { title: "Explore Library", icon: IcLibrary, to: "/explore", desc: "Notes, documents & papers." },
  { title: "Research Hub", icon: IcCompass, to: "/explore/research-hub", desc: "Curated research reading." },
  { title: "Placements", icon: IcBriefcase, to: "/upcoming", desc: "Career & placement support." },
];

const ABOUT_MENU = [
  { title: "About Us", icon: IcInfo, to: "/about", desc: "Who we are and our vision." },
  { title: "Vision & Mission", icon: IcEye, to: "/about#vision", hash: true, desc: "What we aim to achieve." },
  { title: "Why ShikshaCom", icon: IcHelp, to: "/about#why-shiksha", hash: true, desc: "What makes us different." },
  { title: "Contact", icon: IcMail, to: "/contact", desc: "Get in touch with us." },
  { title: "FAQ", icon: IcChat, to: "/faq", desc: "Answers to common questions." },
  { title: "Feedback", icon: IcForum, to: "/feedback", desc: "Tell us what to improve." },
];

const NAV_ITEMS = [
  { id: "courses", label: "Courses" },
  { id: "resources", label: "Resources" },
  { id: "about", label: "About" },
];

/* ────────────────────────── SMALL PARTS ────────────────────────── */

function MenuLink({ link, onGo, className = "" }) {
  if (link.soon) {
    return (
      <span className={`skn-mlink skn-soon ${className}`}>
        <span>{link.label}</span>
        <em>Coming Soon</em>
      </span>
    );
  }
  return (
    <Link
      className={`skn-mlink ${className}`}
      to={link.to}
      state={link.state}
      onClick={onGo}
    >
      <span>{link.label}</span>
    </Link>
  );
}

function IconCard({ item, onGo }) {
  const Icon = item.icon;
  const inner = (
    <>
      <span className="skn-card-ic">
        <Icon />
      </span>
      <span className="skn-card-tx">
        <b>{item.title}</b>
        <small>{item.desc}</small>
      </span>
    </>
  );
  if (item.hash) {
    return (
      <HashLink smooth className="skn-card" to={item.to} onClick={onGo}>
        {inner}
      </HashLink>
    );
  }
  return (
    <Link className="skn-card" to={item.to} onClick={onGo}>
      {inner}
    </Link>
  );
}

/* ────────────────────────── MEGA PANELS ────────────────────────── */

function CoursesMega({ onGo, menu }) {
  const [schoolTab, setSchoolTab] = useState("central");

  return (
    <div className="skn-mega-grid skn-mega-courses">
      {menu.map((cat) => {
        const Icon = cat.icon;
        return (
          <div className="skn-mcol" key={cat.title}>
            <div className="skn-mcol-head">
              <span className="skn-mcol-ic">
                <Icon />
              </span>
              <h3>{cat.title}</h3>
            </div>

            {cat.tabs ? (
              <>
                <div className="skn-seg" role="tablist" aria-label="Board type">
                  {cat.tabs.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={schoolTab === t.id}
                      className={schoolTab === t.id ? "skn-on" : ""}
                      onClick={() => setSchoolTab(t.id)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                {cat.tabs
                  .filter((t) => t.id === schoolTab)
                  .map((t) => (
                    <div className="skn-msec" key={t.id}>
                      <h4>{t.heading}</h4>
                      <ul>
                        {t.links.map((l) => (
                          <li key={l.label}>
                            <MenuLink link={l} onGo={onGo} />
                          </li>
                        ))}
                        {t.viewAll && (
                          <li className="skn-viewall">
                            <MenuLink
                              link={t.viewAll}
                              onGo={onGo}
                              className="skn-strong"
                            />
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
              </>
            ) : (
              cat.sections.map((sec) => (
                <div className="skn-msec" key={sec.heading}>
                  <h4>{sec.heading}</h4>
                  <ul>
                    {sec.links.map((l) => (
                      <li key={l.label}>
                        <MenuLink link={l} onGo={onGo} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        );
      })}
    </div>
  );
}

function CardsMega({ items, onGo, cols = 3 }) {
  return (
    <div className={`skn-mega-cards skn-cols-${cols}`}>
      {items.map((item) => (
        <IconCard item={item} onGo={onGo} key={item.title} />
      ))}
    </div>
  );
}

/* ────────────────────────── MOBILE DRAWER ────────────────────────── */

function DrawerAccordion({ title, children, open, onToggle }) {
  return (
    <div className={`skn-acc${open ? " skn-open" : ""}`}>
      <button type="button" className="skn-acc-head" aria-expanded={open} onClick={onToggle}>
        {title}
        <span className="skn-chev">
          <IcChevronDown />
        </span>
      </button>
      <div className="skn-acc-body">
        <div>{children}</div>
      </div>
    </div>
  );
}

/* ────────────────────────── NAVBAR ────────────────────────── */

/* Dismissal identity for one announcement. Includes updated_at so that
   editing a live announcement re-shows it to visitors who dismissed the
   previous wording — the row's id alone never changes, so an id-only key
   made every edit invisible to exactly the people who had seen it before. */
const announceKey = (a) => `${a.id}:${a.updated_at || ""}`;

const readDismissedAnnouncements = () => {
  try {
    const raw = JSON.parse(window.localStorage.getItem("sk-announce-dismissed") || "[]");
    // A legacy value here is a bare id string, not an array. Treating that
    // as "nothing dismissed" is the safe direction: at worst one strip
    // reappears once, versus an announcement staying permanently hidden.
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
};

const Navbar = () => {
  const { isAuthenticated, user, loading, isTeacherContext } = useAuth();
  // Forum & Explore moderation entries now live inside their own surfaces
  // (forum left sidebar / Explore toolbar), each gated there with its own RBAC
  // permission — no longer in the global top navbar.
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(null);
  const [lastMenu, setLastMenu] = useState(null); // keeps panel content during close animation
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openAcc, setOpenAcc] = useState("courses");
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [isMac, setIsMac] = useState(false);
  // The forum (/forum/*) renders its own primary "Search discussions,
  // topics, people…" input directly under this navbar (see
  // ForumLayout.jsx's PageHeader), so having this global course-search box
  // fully expanded right above it reads as two competing search boxes and
  // learners have typed forum questions into the wrong one. On forum routes
  // it collapses to an icon-only button that expands on click/focus,
  // keeping the global search reachable without visually doubling up.
  const isForumRoute = location.pathname.startsWith("/forum");
  const [forumSearchOpen, setForumSearchOpen] = useState(false);
  useEffect(() => {
    if (!isForumRoute) setForumSearchOpen(false);
  }, [isForumRoute]);
  const [announcements, setAnnouncements] = useState([]);
  const [dismissedAnnouncements, setDismissedAnnouncements] = useState(readDismissedAnnouncements);
  const [coursesMenu, setCoursesMenu] = useState(STATIC_COURSES_MENU);

  const headerRef = useRef(null);
  const searchRef = useRef(null);
  const closeTimer = useRef(null);

  /* Courses mega-menu — CMS/catalog-driven boards + exam tracks, merged over
     the static fallback so the menu never renders empty while this loads. */
  useEffect(() => {
    let alive = true;
    getPublicNavMenu().then((categories) => {
      if (alive) setCoursesMenu(mergeLiveNavMenu(categories));
    });
    return () => {
      alive = false;
    };
  }, []);

  /* sitewide announcement strip — CMS-driven, hidden entirely if the
     API is unreachable or nothing is currently live.

     Shows the highest-priority announcement the visitor has NOT dismissed,
     not simply rows[0]. Two bugs came out of the old `const top = rows[0]`:
     an admin's second and third live announcements were silently
     undisplayable, and dismissing the top one hid the strip outright
     instead of revealing the next.

     The dismissal key is `<id>:<updated_at>`, not the bare id. Editing a
     live announcement reuses its id, so an id-only key kept the *new*
     wording hidden for everyone who had dismissed the old one. */
  useEffect(() => {
    let alive = true;
    getAnnouncements().then((rows) => {
      if (alive && rows.length) setAnnouncements(rows);
    });
    return () => {
      alive = false;
    };
  }, []);

  const announcement =
    announcements.find((r) => !dismissedAnnouncements.includes(announceKey(r))) || null;

  const dismissAnnouncement = () => {
    if (!announcement) return;
    // Recomputing `announcement` from the updated list is what reveals the
    // next live announcement instead of hiding the strip entirely.
    const next = [...new Set([...dismissedAnnouncements, announceKey(announcement)])].slice(-40);
    setDismissedAnnouncements(next);
    try {
      window.localStorage.setItem("sk-announce-dismissed", JSON.stringify(next));
    } catch {
      /* ignore — worst case it reappears next visit */
    }
  };

  const announcementVisible = !!announcement;

  /* platform hint for the ⌘K / Ctrl K badge */
  useEffect(() => {
    setIsMac(/mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent));
  }, []);

  /* compact header after slight scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close everything on route change */
  useEffect(() => {
    setOpenMenu(null);
    setDrawerOpen(false);
  }, [location.pathname, location.hash]);

  /* Esc closes · Ctrl/⌘+K focuses search */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setDrawerOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* click outside the header closes the mega menu */
  useEffect(() => {
    const onDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  /* lock body scroll while the drawer is open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  };
  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (openMenu) setLastMenu(openMenu);
  }, [openMenu]);

  const closeAll = useCallback(() => {
    setOpenMenu(null);
    setDrawerOpen(false);
  }, []);

  const goSearch = () => {
    const q = query.trim();
    closeAll();
    navigate("/courses", {
      state: { resetCourses: Date.now(), searchQuery: q },
    });
  };

  const handleDashboard = () => {
    if (!user) return;
    const roles = Array.isArray(user?.roles) ? user.roles : [];
    const normalized = roles.map((r) => String(r).toLowerCase());
    const single = String(user?.role || "").toLowerCase();
    const isTeacher = normalized.includes("teacher") || single === "teacher";

    if (isTeacher) {
      window.location.href = isTeacherContext ? TEACHER_DASHBOARD_URL : "/pick-profile";
    } else {
      window.location.href = APP_URL;
    }
  };

  const megaFor = (id) =>
    id === "courses" ? (
      <CoursesMega onGo={closeAll} menu={coursesMenu} />
    ) : id === "resources" ? (
      <CardsMega items={RESOURCES_MENU} onGo={closeAll} cols={3} />
    ) : (
      <CardsMega items={ABOUT_MENU} onGo={closeAll} cols={3} />
    );

  return (
    <>
      {announcementVisible && (
        <div className={`skn-annbar skn-annbar-${announcement.level}`}>
          <div className="skn-annbar-inner">
            <span className="skn-annbar-msg">{announcement.message}</span>
            {announcement.link_url &&
              (announcement.link_url.startsWith("/") ? (
                <Link to={announcement.link_url} className="skn-annbar-link">
                  {announcement.link_label || "Learn more"}
                </Link>
              ) : (
                <a
                  href={announcement.link_url}
                  className="skn-annbar-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {announcement.link_label || "Learn more"}
                </a>
              ))}
            <button
              type="button"
              className="skn-annbar-x"
              aria-label="Dismiss announcement"
              onClick={dismissAnnouncement}
            >
              <IcX />
            </button>
          </div>
        </div>
      )}
      <header
        ref={headerRef}
        className={`skn-header${scrolled ? " skn-scrolled" : ""}${openMenu ? " skn-mega-open" : ""}${announcementVisible ? " skn-has-announce" : ""}`}
      >
        <div className="skn-bar">
          {/* Brand */}
          <Link to="/" className="skn-brand" onClick={closeAll}>
            <span className="skn-logo">
              <img src="/Shiksha.png" alt="" />
            </span>
            <span className="skn-brand-tx">
              <b>ShikshaCom</b>
              <small>Empowerment Through Education</small>
            </span>
          </Link>

          {/* Desktop pill nav */}
          <nav className="skn-pillnav" aria-label="Primary">
            <div className="skn-pill" onMouseLeave={scheduleClose}>
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`skn-navbtn${openMenu === item.id ? " skn-on" : ""}`}
                  aria-expanded={openMenu === item.id}
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenMenu(item.id);
                  }}
                  onClick={() =>
                    // Hover already opens this on desktop (mouseenter fires
                    // before click for any mouse user), so a plain toggle
                    // here would immediately close what hover just opened.
                    // Click only needs to *open* — closing is handled by
                    // mouseleave/outside-click/Escape/route change.
                    setOpenMenu(item.id)
                  }
                >
                  {item.label}
                  <IcChevronDown />
                </button>
              ))}
            </div>

          </nav>

          {/* Right actions */}
          <div className="skn-actions">
            {isForumRoute && !forumSearchOpen ? (
              <button
                type="button"
                className="skn-search skn-search-collapsed"
                aria-label="Search courses"
                onClick={() => setForumSearchOpen(true)}
              >
                <IcSearch />
              </button>
            ) : (
              <div className={`skn-search${isForumRoute ? " skn-search-expanded" : ""}`}>
                <IcSearch />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search courses…"
                  aria-label="Search courses"
                  value={query}
                  autoFocus={isForumRoute}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && goSearch()}
                  onBlur={() => {
                    if (isForumRoute && !query.trim()) setForumSearchOpen(false);
                  }}
                />
                {!isForumRoute && <kbd>{isMac ? "⌘" : "Ctrl"} K</kbd>}
              </div>
            )}

            {!loading &&
              (isAuthenticated && user ? (
                <div className="skn-authed">
                  <button
                    type="button"
                    className="skn-btn skn-btn-solid skn-dash"
                    onClick={handleDashboard}
                  >
                    Dashboard <IcExternal />
                  </button>
                  {/* Forum & Explore Moderation entries now live inside their
                      own sections (forum sidebar / Explore toolbar), not in the
                      global top navbar. */}
                  <NotificationBell />
                  <ProfileSwitcher
                    teacherSignupUrl="/signup?role=teacher"
                    learnUrl={APP_URL}
                    teachUrl={TEACHER_URL}
                    quickActions={[
                      {
                        label: "Dashboard",
                        icon: <LayoutDashboard size={17} />,
                        // Delegate, don't re-implement. This used to inline
                        // `isTeacherContext ? TEACHER_DASHBOARD_URL : APP_URL`,
                        // which sent a TEACHER browsing in learner context —
                        // the default landing state — to APP_URL, i.e. the
                        // Learn app. Wrong destination for a control labelled
                        // "Dashboard", and a duplicate of the Learn pill this
                        // same menu already renders via learnUrl.
                        // handleDashboard sends that case to /pick-profile.
                        onClick: handleDashboard,
                      },
                    ]}
                  />
                </div>
              ) : (
                <div className="skn-guest">
                  <Link to="/login" className="skn-btn skn-btn-ghost" onClick={closeAll}>
                    Log in
                  </Link>
                  <Link to="/signup" className="skn-btn skn-btn-solid" onClick={closeAll}>
                    Sign up free
                  </Link>
                </div>
              ))}

            <button
              type="button"
              className="skn-burger"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
            >
              <IcMenu />
            </button>
          </div>
        </div>

        {/* Mega menu panel */}
        <div
          className={`skn-mega${openMenu ? " skn-open" : ""}`}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="skn-mega-inner" aria-hidden={!openMenu}>
            {(openMenu || lastMenu) && megaFor(openMenu || lastMenu)}
          </div>
        </div>
      </header>

      {/* spacer so page content clears the fixed header */}
      <div className={`skn-spacer${scrolled ? " skn-small" : ""}${announcementVisible ? " skn-has-announce" : ""}`} />

      {/* ── Mobile drawer ── */}
      <div
        className={`skn-backdrop${drawerOpen ? " skn-open" : ""}`}
        onClick={() => setDrawerOpen(false)}
      />
      <aside className={`skn-drawer${drawerOpen ? " skn-open" : ""}`} aria-hidden={!drawerOpen}>
        <div className="skn-drawer-head">
          <Link to="/" className="skn-brand" onClick={closeAll}>
            <span className="skn-logo">
              <img src="/Shiksha.png" alt="" />
            </span>
            <span className="skn-brand-tx">
              <b>ShikshaCom</b>
              <small>Empowerment Through Education</small>
            </span>
          </Link>
          <button
            type="button"
            className="skn-drawer-x"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
          >
            <IcX />
          </button>
        </div>

        <div className="skn-drawer-search">
          <div className="skn-search skn-full">
            <IcSearch />
            <input
              type="text"
              placeholder="Search courses…"
              aria-label="Search courses"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && goSearch()}
            />
          </div>
        </div>

        <div className="skn-drawer-body">
          <DrawerAccordion
            title="Courses"
            open={openAcc === "courses"}
            onToggle={() => setOpenAcc(openAcc === "courses" ? "" : "courses")}
          >
            {coursesMenu.map((cat) => (
              <div className="skn-dgroup" key={cat.title}>
                <h5>{cat.title}</h5>
                {(cat.tabs
                  ? cat.tabs.flatMap((t) => [
                      ...t.links,
                      ...(t.viewAll ? [t.viewAll] : []),
                    ])
                  : cat.sections.flatMap((s) => s.links)
                ).map((l) => (
                  <MenuLink link={l} onGo={closeAll} key={cat.title + l.label} />
                ))}
              </div>
            ))}
          </DrawerAccordion>

          <DrawerAccordion
            title="Resources"
            open={openAcc === "resources"}
            onToggle={() => setOpenAcc(openAcc === "resources" ? "" : "resources")}
          >
            <div className="skn-dgroup">
              {RESOURCES_MENU.map((l) => (
                <MenuLink link={l} onGo={closeAll} key={l.title} className="" />
              ))}
            </div>
          </DrawerAccordion>

          <DrawerAccordion
            title="About"
            open={openAcc === "about"}
            onToggle={() => setOpenAcc(openAcc === "about" ? "" : "about")}
          >
            <div className="skn-dgroup">
              {ABOUT_MENU.map((l) =>
                l.hash ? (
                  <HashLink
                    smooth
                    className="skn-mlink"
                    to={l.to}
                    onClick={closeAll}
                    key={l.title}
                  >
                    <span>{l.title}</span>
                  </HashLink>
                ) : (
                  <Link className="skn-mlink" to={l.to} onClick={closeAll} key={l.title}>
                    <span>{l.title}</span>
                  </Link>
                )
              )}
            </div>
          </DrawerAccordion>

          <Link to="/become-faculty" className="skn-mlink skn-strong" onClick={closeAll}>
            <span>Become a Faculty</span>
          </Link>
        </div>

        <div className="skn-drawer-cta">
          {!loading &&
            (isAuthenticated && user ? (
              <>
                {/* Forum & Explore Moderation moved into their own sections. */}
                {/* Notifications + profile switcher: hidden from the top bar
                    below 640px (SiteNav.css) since .skn-authed doesn't shrink
                    to fit narrow phones — surfaced here instead so they stay
                    reachable, not just Dashboard. */}
                <div className="skn-drawer-account-row">
                  <NotificationBell />
                  <ProfileSwitcher
                    teacherSignupUrl="/signup?role=teacher"
                    learnUrl={APP_URL}
                    teachUrl={TEACHER_URL}
                    quickActions={[
                      {
                        label: "Dashboard",
                        icon: <LayoutDashboard size={17} />,
                        // Delegate, don't re-implement. This used to inline
                        // `isTeacherContext ? TEACHER_DASHBOARD_URL : APP_URL`,
                        // which sent a TEACHER browsing in learner context —
                        // the default landing state — to APP_URL, i.e. the
                        // Learn app. Wrong destination for a control labelled
                        // "Dashboard", and a duplicate of the Learn pill this
                        // same menu already renders via learnUrl.
                        // handleDashboard sends that case to /pick-profile.
                        onClick: handleDashboard,
                      },
                    ]}
                  />
                </div>
                <button
                  type="button"
                  className="skn-btn skn-btn-solid skn-wide"
                  onClick={() => {
                    closeAll();
                    handleDashboard();
                  }}
                >
                  Go to Dashboard <IcExternal />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="skn-btn skn-btn-ghost skn-wide"
                  onClick={closeAll}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="skn-btn skn-btn-solid skn-wide"
                  onClick={closeAll}
                >
                  Sign up free
                </Link>
              </>
            ))}
        </div>
      </aside>
    </>
  );
};

export default Navbar;
