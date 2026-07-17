import React, { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";
import { ForumProvider, useForum } from "./ForumContext";
import RightRail from "./components/RightRail";
import { getTopics } from "../api/forum";
import logo from "../assets/Shiksha.png";
import "./forum.css";

/* Pixel-perfect chrome ported from ShikshaCom Forum.html (fm2-* system):
   top marquee, brand header, site nav with dropdowns, page header (breadcrumb
   + title + search + bell), and the 216/1fr/272 three-column layout. Renders
   OUTSIDE the marketing <Page>, matching the standalone design. */

const CHEV = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
);

const NAV_DROPS = [
  { label: "Academics", items: ["Colleges & Universities", "Courses & Programs", "Scholarships", "Study Abroad"] },
  { label: "Career", items: ["Career Guidance", "Placements", "Internships"] },
  { label: "Exams", items: ["JEE / NEET", "UPSC", "GATE", "CAT / MBA"] },
];

function TopStrip() {
  return (
    <div className="fm2-topstrip">
      <marquee direction="left">
        <span>Ask questions, share knowledge, and learn from people across every topic.</span>
        <span className="fm2-blink">|</span>
        <span>Tech · Careers · Health · Hobbies · Finance · Travel · &amp; anything else</span>
        <span className="fm2-blink">|</span>
        <span>Join the conversation — post about any topic, big or small!</span>
      </marquee>
    </div>
  );
}

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { me } = useForum();
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const initials = me?.initials || "YO";
  const name = me?.display_name || "You";

  return (
    <header className="fm2-header">
      <div className="fm2-brand" onClick={() => navigate("/")} role="button" tabIndex={0}>
        <img className="fm2-logo" src={logo} alt="ShikshaCom" />
        <div>
          <h1 className="fm2-brand-name">ShikshaCom</h1>
          <p className="fm2-brand-tag">Empowerment Through Education</p>
        </div>
      </div>
      <div className="fm2-hright">
        {!isAuthenticated ? (
          <>
            <button className="fm2-authbtn" onClick={() => navigate(`/login?next=${encodeURIComponent("/forum")}`)}>Log in</button>
            <button className="fm2-authbtn fm2-authbtn-fill" onClick={() => navigate("/signup")}>Sign up free</button>
          </>
        ) : (
          <div style={{ position: "relative" }} ref={wrapRef}>
            <button onClick={() => setMenuOpen((o) => !o)} className="fm2-profilebtn">
              <div className="fm2-avatar-sm" style={{ background: me?.color || "#125027" }}>{initials}</div>
              <span style={{ font: "600 12.5px Poppins,sans-serif", color: "#18261a" }}>{name}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5a6e55" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
            </button>
            {menuOpen && (
              <div className="fm2-menu">
                <button className="fm2-menu-item" onClick={() => { setMenuOpen(false); navigate("/forum/profile"); }}>
                  <div className="fm2-avatar-sm" style={{ background: me?.color || "#125027", width: 30, height: 30 }}>{initials}</div>
                  <span>My Activity</span>
                </button>
                <button className="fm2-menu-item" onClick={() => { setMenuOpen(false); navigate("/forum/dashboard"); }}>
                  <span style={{ paddingLeft: 2 }}>Dashboard</span>
                </button>
                {me?.is_moderator && (
                  <button className="fm2-menu-item" onClick={() => { setMenuOpen(false); navigate("/moderator"); }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#125027" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    <span>Moderator Panel</span>
                  </button>
                )}
                <button className="fm2-menu-item danger" onClick={async () => { setMenuOpen(false); await logout(); navigate("/forum"); }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5M21 12H9" /></svg>
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

function SiteNav() {
  const navigate = useNavigate();
  return (
    <nav className="fm2-sitenav">
      <ul className="fm2-navmenu">
        <li><span className="fm2-navlink" onClick={() => navigate("/")}>Home</span></li>
        {NAV_DROPS.map((d) => (
          <li className="fm2-navsub" key={d.label}>
            <span className="fm2-navlabel">{d.label} {CHEV}</span>
            <ul className="fm2-navdrop">
              {d.items.map((it) => <li key={it}><span className="fm2-navditem">{it}</span></li>)}
            </ul>
          </li>
        ))}
        <li><span className="fm2-navlink active" onClick={() => navigate("/forum")}>Forum</span></li>
        <li><span className="fm2-navlink">Mentors</span></li>
      </ul>
    </nav>
  );
}

function PageHeader() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { unreadCount } = useNotification() || {};
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");

  const submit = (e) => {
    e.preventDefault();
    const v = q.trim();
    if (v) navigate(`/forum/search?q=${encodeURIComponent(v)}`);
  };

  return (
    <div className="fm2-page-hd">
      <div className="fm2-page-hd-inner">
        <div>
          <div style={{ font: "400 11px Poppins,sans-serif", color: "#8a9e82", marginBottom: 3 }}>
            <span style={{ cursor: "pointer", color: "#125027" }} onClick={() => navigate("/")}>ShikshaCom</span>
            <span style={{ margin: "0 5px", color: "#c8d8bc" }}>›</span>
            <span style={{ color: "#4a5e3a" }}>Discussion Forum</span>
          </div>
          <h1 style={{ font: "900 20px/1 Montserrat,sans-serif", color: "#125027", margin: "0 0 3px" }}>Discussion Forum</h1>
          <p style={{ font: "400 12px Poppins,sans-serif", color: "#8a9e82", margin: 0 }}>Ask questions · share expertise · discuss any topic under the sun</p>
        </div>
        <form onSubmit={submit} className="fm2-hd-search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8a9e82" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 12, flexShrink: 0 }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search discussions, topics, people…" aria-label="Search the forum" />
          <button type="submit">Search</button>
        </form>
        {isAuthenticated && (
          <button className="fm2-hd-bell" onClick={() => navigate("/forum/notifications")} aria-label="Notifications">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#374e37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            {unreadCount > 0 && <span className="fm2-hd-bell-badge">{unreadCount > 99 ? "99+" : unreadCount}</span>}
          </button>
        )}
      </div>
    </div>
  );
}

const RULES = [
  "Be respectful — critique ideas, not people.",
  "Search before asking to avoid duplicates.",
  "Give context so others can help you.",
  "Mark a helpful answer as accepted.",
  "No spam, self-promotion, or misinformation.",
];

function LeftSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  const { requireAuth } = useForum();
  const [params, setParams] = useSearchParams();
  const [topicOpen, setTopicOpen] = useState(false);
  const [topics, setTopics] = useState([]);
  const activeTopic = params.get("topic") || "";

  useEffect(() => {
    getTopics().then((d) => setTopics(d?.topics || d || [])).catch(() => {});
  }, []);

  const navItems = [
    { label: "Forum Home", to: "/forum", active: pathname === "/forum" },
    { label: "Categories", to: "/forum/categories", active: pathname.startsWith("/forum/categ") },
    { label: "Spaces", to: "/forum/spaces", active: pathname.startsWith("/forum/space") },
  ];

  const selectTopic = (t) => {
    const next = new URLSearchParams(params);
    if (t) next.set("topic", t); else next.delete("topic");
    setParams(next);
    setTopicOpen(false);
    if (pathname !== "/forum") navigate(`/forum?${next.toString()}`);
  };

  return (
    <div className="fm2-sidebar">
      <div className="fm2-card" style={{ padding: "13px 11px" }}>
        <div className="fm2-section-hd">Navigation</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {navItems.map((n) => (
            <button key={n.to} onClick={() => navigate(n.to)} className={`fm2-navitem${n.active ? " active" : ""}`}>{n.label}</button>
          ))}
          {isAuthenticated && (
            <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px solid #e4edd8", display: "flex", flexDirection: "column", gap: 1 }}>
              <button onClick={() => { if (!requireAuth()) navigate("/forum/saved"); }} className={`fm2-navitem${pathname.startsWith("/forum/saved") ? " active" : ""}`}>Saved</button>
              <button onClick={() => { if (!requireAuth()) navigate("/forum/answer-queue"); }} className={`fm2-navitem${pathname.startsWith("/forum/answer-queue") ? " active" : ""}`}>Answer Queue</button>
              <button onClick={() => navigate("/forum/dashboard")} className={`fm2-navitem${pathname.startsWith("/forum/dashboard") ? " active" : ""}`}>Dashboard</button>
            </div>
          )}
        </div>
      </div>

      <div className="fm2-card" style={{ padding: "13px 11px" }}>
        <button onClick={() => setTopicOpen((o) => !o)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "none", border: "none", cursor: "pointer", padding: "0 2px" }}>
          <span className="fm2-section-hd" style={{ marginBottom: 0 }}>Filter by Topic</span>
          <span style={{ transform: topicOpen ? "rotate(180deg)" : "none", transition: "transform .18s" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8a9e82" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
          </span>
        </button>
        {topicOpen && (
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 1, maxHeight: 240, overflowY: "auto" }}>
            {topics.map((t) => {
              const label = typeof t === "string" ? t : (t.label || t.name || t.topic);
              return <button key={label} onClick={() => selectTopic(label)} className={`fm2-navitem${activeTopic === label ? " active" : ""}`}>{label}</button>;
            })}
          </div>
        )}
        {activeTopic && (
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 7, background: "#fff8e8", border: "1px solid #ecd080", borderRadius: 8, padding: "7px 10px" }}>
            <span style={{ font: "600 11px Poppins,sans-serif", color: "#7a4c00", flex: 1 }}>Filtering: <strong>#{activeTopic}</strong></span>
            <button onClick={() => selectTopic("")} style={{ background: "none", border: "none", color: "#e07900", font: "800 12px Poppins,sans-serif", cursor: "pointer", flexShrink: 0, lineHeight: 1 }}>✕</button>
          </div>
        )}
      </div>

      <div className="fm2-card" style={{ padding: "13px 11px" }}>
        <div className="fm2-section-hd">Community Guidelines</div>
        {RULES.map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 8, padding: "6px 0", borderBottom: i < RULES.length - 1 ? "1px solid #e4edd8" : "none" }}>
            <span style={{ font: "800 10px Poppins,sans-serif", color: "#1b9c85", flexShrink: 0, marginTop: 2, width: 14 }}>{i + 1}.</span>
            <span style={{ font: "400 12px/1.5 Poppins,sans-serif", color: "#4a5e3a" }}>{r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Shell() {
  return (
    <div style={{ minHeight: "100vh", background: "#edf2e8", fontFamily: "Poppins,sans-serif" }}>
      <TopStrip />
      <Header />
      <SiteNav />
      <PageHeader />
      <div className="fm2-wrap">
        <div className="fm2-layout">
          <LeftSidebar />
          <main style={{ display: "flex", flexDirection: "column", gap: 13, minWidth: 0 }}>
            <Outlet />
          </main>
          <RightRail />
        </div>
      </div>
    </div>
  );
}

export default function ForumLayout() {
  return (
    <ForumProvider>
      <Shell />
    </ForumProvider>
  );
}
