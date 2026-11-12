import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ForumProvider, useForum } from "./ForumContext";
import HowItWorks from "./components/HowItWorks";
import { getTopics } from "../api/forum";
import Navbar from "../components/Navbar";
import TourHeaderButton from "../tour/TourHeaderButton";
import ScribbleIcon from "../components/icons/ScribbleIcon";
import { HeroDeco, HeroVisual } from "../components/hero/HeroLook";
import "./forum.css";
import "./forum-refresh.css";

/* Pixel-perfect chrome ported from ShikshaCom Forum.html (fm2-* system):
   top marquee, brand header, site nav with dropdowns, page header (breadcrumb
   + title + search + bell), and the 216/1fr/272 three-column layout. Renders
   OUTSIDE the marketing <Page>, matching the standalone design. */

function PageHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  const { me, requireAuth } = useForum();
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const isDash = pathname.startsWith("/forum/dashboard");

  const submit = (e) => {
    e.preventDefault();
    const v = q.trim();
    if (v) navigate(`/forum/search?q=${encodeURIComponent(v)}`);
  };

  // The full hero (headline + calls to action) only on the forum home; every
  // other forum page gets the same look in a compact strip so the content
  // stays above the fold.
  const isHome = pathname === "/forum" || pathname === "/forum/";
  const openAsk = (mode) => { if (!requireAuth()) navigate(`/forum/ask${mode ? `?mode=${mode}` : ""}`); };

  return (
    <header className={`fh-hero${isHome ? "" : " compact"}`}>
      {/* Decorative shapes borrowed from the homepage hero (dots, dashed ring,
          gold squiggle). Purely visual. */}
      <HeroDeco />

      <div className="fh-wrap">
        <div className="fh-top">
          <nav className="fh-crumbs" aria-label="Breadcrumb">
            <button type="button" onClick={() => navigate("/")}>ShikshaCom</button>
            <span aria-hidden="true">/</span>
            {isDash ? (
              <>
                <button type="button" onClick={() => navigate("/forum")}>Forum</button>
                <span aria-hidden="true">/</span>
                <b>Dashboard</b>
              </>
            ) : (
              <b>Forum</b>
            )}
          </nav>
          {/* No notification bell here — the shared site navbar already carries
              the global notification bell; a second one would be redundant. */}
          <div className="fh-tools">
            {/* Always-visible way back to the forum from the dashboard (the
                sidebar Quick Links collapse on narrow screens). */}
            {isDash && (
              <button onClick={() => navigate("/forum")} className="fh-btn fh-btn-ghost fh-btn-sm">
                <ScribbleIcon name="arrow-left" size={15} />
                Back to Forum
              </button>
            )}
            {/* The avatar is the forum's discoverable entry point to the dashboard. */}
            {isAuthenticated && (
              <button
                onClick={() => navigate("/forum/dashboard")}
                aria-label="My dashboard"
                title="My dashboard"
                className="fm2-hd-dash"
                style={{ background: isDash ? "#0B5B3E" : (me?.color || "#0B5B3E") }}
              >
                {me?.initials || "YO"}
              </button>
            )}
            <TourHeaderButton pathname={pathname} />
          </div>
        </div>

        <div className="fh-body">
          <span className="fh-badge"><i />{isDash ? "Your forum activity" : "Discussion Forum"}</span>
          {isDash ? (
            <h1 className="fh-title"><span className="fh-lead">My dashboard</span></h1>
          ) : isHome ? (
            <h1 className="fh-title">
              <span className="fh-lead">Ask anything,</span>
              <span className="fh-punch">learn together.</span>
            </h1>
          ) : (
            <h1 className="fh-title"><span className="fh-lead">Discussion Forum</span></h1>
          )}
          <p className="fh-sub">
            {isDash
              ? "Your activity, notifications, and saved discussions."
              : "Ask questions, share what you know, and discuss any topic with learners and educators."}
          </p>

          {!isDash && (
            <form onSubmit={submit} className="fh-search" role="search">
              <ScribbleIcon name="search" size={17} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search discussions, topics, people…" aria-label="Search the forum" />
              <button type="submit">Search</button>
            </form>
          )}

          {isHome && (
            <div className="fh-cta-row">
              <button onClick={() => openAsk("question")} className="fh-btn fh-btn-primary" data-tour="forum-intro.ask">
                Ask a question
                <ScribbleIcon name="arrow-right" size={17} />
              </button>
              <button onClick={() => openAsk("post")} className="fh-btn fh-btn-ghost">
                Share a post
              </button>
              <button onClick={() => { if (!requireAuth()) navigate("/forum/answer-queue"); }} className="fh-link" data-tour="forum-intro.answer">
                <ScribbleIcon name="edit" size={15} />
                Answer questions
              </button>
            </div>
          )}
        </div>

        {/* Right-hand visual, same blob + floating cards idea as the homepage
            hero, kept abstract (skeleton lines, no fake questions). */}
        {isHome && (
          <HeroVisual cards={[
            { icon: "help", lines: 2 },
            { icon: "message", tone: "gold", lines: 3 },
            { icon: "check", text: "Answered" },
            { avatars: true, text: "Join the discussion" },
          ]} />
        )}
      </div>
    </header>
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
  const { isAuthenticated, hasPermission, hasRole } = useAuth();
  const { requireAuth } = useForum();
  // Forum moderation entry lives here (in the forum), not in the top site
  // navbar — same gating the navbar used.
  const canModForum = isAuthenticated && (hasPermission?.("forum.moderate") || hasRole?.("ADMIN") || hasRole?.("MODERATOR"));
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
            <button key={n.to} onClick={() => navigate(n.to)} className={`fm2-navitem${n.active ? " active" : ""}`} data-tour={`forum-nav.${n.to.replace(/^\/forum\/?/, "") || "home"}`}>{n.label}</button>
          ))}
          {isAuthenticated && (
            <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px solid #e4edd8", display: "flex", flexDirection: "column", gap: 1 }}>
              <button onClick={() => { if (!requireAuth()) navigate("/forum/saved"); }} className={`fm2-navitem${pathname.startsWith("/forum/saved") ? " active" : ""}`}>Saved</button>
              <button onClick={() => { if (!requireAuth()) navigate("/forum/profile?tab=following"); }} className={`fm2-navitem${pathname.startsWith("/forum/profile") && params.get("tab") === "following" ? " active" : ""}`}>Following</button>
              <button onClick={() => { if (!requireAuth()) navigate("/forum/answer-queue"); }} className={`fm2-navitem${pathname.startsWith("/forum/answer-queue") ? " active" : ""}`}>Answer Queue</button>
              <button onClick={() => navigate("/forum/dashboard")} className={`fm2-navitem${pathname.startsWith("/forum/dashboard") ? " active" : ""}`}>Dashboard</button>
            </div>
          )}
          {canModForum && (
            <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px solid #e4edd8" }}>
              <button onClick={() => navigate("/moderator")} className="fm2-navitem fm2-navitem-mod" title="Forum Moderation">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                Moderator Panel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="fm2-card" style={{ padding: "13px 11px" }}>
        <button onClick={() => setTopicOpen((o) => !o)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "none", border: "none", cursor: "pointer", padding: "0 2px" }}>
          <span className="fm2-section-hd" style={{ marginBottom: 0 }}>Filter by Topic</span>
          <span style={{ transform: topicOpen ? "rotate(180deg)" : "none", transition: "transform .18s" }}>
            <ScribbleIcon name="chevron-down" size={13} color="#8a9e82" />
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
  const { pathname } = useLocation();
  // The dashboard ships its own two-column layout (sidebar + content), so it
  // renders full-width instead of inside the standard 3-column forum grid.
  const isDash = pathname.startsWith("/forum/dashboard");

  return (
    <div className="fm2-shell">
      {/* Integrated site navigation (replaces the standalone fm2 top chrome) so
          the forum shares the frontend's real navbar + profile switcher. */}
      <Navbar />
      <PageHeader />
      <div className="fm2-wrap">
        {isDash ? (
          <Outlet />
        ) : (
          <div className="fm2-layout">
            <LeftSidebar />
            <main style={{ display: "flex", flexDirection: "column", gap: 13, minWidth: 0 }}>
              <Outlet />
            </main>
            <HowItWorks />
          </div>
        )}
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
