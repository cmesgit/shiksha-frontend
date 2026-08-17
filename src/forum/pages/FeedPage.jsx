import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getThreads } from "../../api/forum";
import { useForum } from "../ForumContext";
import { useAuth } from "../../contexts/AuthContext";
import QuestionCard from "../components/QuestionCard";
import { FEED_TABS } from "../utils";

export default function FeedPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { requireAuth, me } = useForum();
  const { isAuthenticated } = useAuth();
  const activeTopic = params.get("topic") || "";
  const [tab, setTab] = useState("foryou");
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const PAGE_SIZE = 8;

  useEffect(() => {
    setLoading(true);
    const sort = FEED_TABS.find((t) => t.id === tab)?.sort || "foryou";
    const q = { sort, page, page_size: PAGE_SIZE };
    if (activeTopic) q.topic = activeTopic;
    getThreads(q)
      .then((d) => {
        setCount(d.count || 0);
        setItems((prev) => (page === 1 ? d.results || [] : [...prev, ...(d.results || [])]));
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [tab, page, activeTopic]);

  const changeTab = (id) => { setTab(id); setPage(1); };
  const clearTopic = () => { setPage(1); const n = new URLSearchParams(params); n.delete("topic"); setParams(n); };
  const openAsk = (mode) => { if (!requireAuth()) navigate(`/forum/ask${mode ? `?mode=${mode}` : ""}`); };

  const tabStyle = (active) => ({
    flex: 1, background: active ? "#125027" : "none", color: active ? "#fff" : "#5a6e55",
    border: "none", borderRadius: 9, padding: "9px", font: "700 13px Poppins,sans-serif", cursor: "pointer",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
      {/* Forum action header */}
      <div className="fm2-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ background: "linear-gradient(135deg,#0d3b1c 0%,#125027 60%,#0f8f7e 100%)", padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ font: "800 16px Montserrat,sans-serif", color: "#fff", marginBottom: 3 }}>Discussion Forum</div>
            <p style={{ font: "400 12px Poppins,sans-serif", color: "rgba(255,255,255,.72)", margin: 0 }}>Ask questions, share knowledge, and learn from peers</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={() => openAsk("question")} className="fm2-hero-btn fill" data-tour="forum-intro.ask">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="M11 8v6M8 11h6" /></svg>
              Ask Question
            </button>
            <button onClick={() => openAsk("post")} className="fm2-hero-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" /><path d="M16 6l-4-4-4 4M12 2v13" /></svg>
              Post
            </button>
            <button onClick={() => { if (!requireAuth()) navigate("/forum/answer-queue"); }} className="fm2-hero-btn subtle" data-tour="forum-intro.answer">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
              Answer
            </button>
          </div>
        </div>
        <div style={{ padding: "12px 16px", background: "#f8fbf6", borderTop: "1px solid #e0ead0", display: "flex", alignItems: "center", gap: 10 }}>
          <div className="fm2-avatar-sm" style={{ width: 32, height: 32, background: me?.color || "#125027" }}>{me?.initials || "YO"}</div>
          <button onClick={() => openAsk()} style={{ flex: 1, textAlign: "left", background: "#fff", border: "1.5px solid #d8e6c8", borderRadius: 8, padding: "9px 14px", font: "400 13px Poppins,sans-serif", color: "#8a9e82", cursor: "pointer" }}>
            What would you like to discuss today?
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="fm2-tabs">
        {FEED_TABS.map((t) => (
          <button key={t.id} onClick={() => changeTab(t.id)} style={tabStyle(tab === t.id)}>{t.label}</button>
        ))}
      </div>

      {/* Active filter banner */}
      {activeTopic && (
        <div style={{ display: "flex", alignItems: "center", gap: 9, background: "#fff8e8", border: "1px solid #ecd080", borderRadius: 10, padding: "9px 14px" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e07900" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" /></svg>
          <span style={{ font: "600 12.5px Poppins,sans-serif", color: "#7a4c00" }}>Showing discussions tagged <strong>#{activeTopic}</strong></span>
          <button onClick={clearTopic} style={{ marginLeft: "auto", background: "#e07900", color: "#fff", border: "none", borderRadius: 7, padding: "5px 12px", font: "700 11.5px Poppins,sans-serif", cursor: "pointer" }}>Clear</button>
        </div>
      )}

      {/* List */}
      {loading && page === 1 ? (
        <div className="fm2-empty-card">Loading discussions…</div>
      ) : items.length === 0 ? (
        <div className="fm2-card" style={{ padding: "48px 24px", textAlign: "center" }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#e4f3e8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#125027" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          </div>
          <div style={{ font: "800 15px Montserrat,sans-serif", color: "#125027", marginBottom: 6 }}>
            {activeTopic ? `No discussions tagged #${activeTopic}` : "No discussions yet"}
          </div>
          <div style={{ font: "400 13px Poppins,sans-serif", color: "#8a9e82" }}>
            {isAuthenticated ? "Be the first to ask a question or share a post." : "Sign in to start the first discussion."}
          </div>
        </div>
      ) : (
        <div className="fm2-feed-scroll" data-tour="forum-intro.feed">
          {items.map((q) => <QuestionCard key={q.id} q={q} />)}
          {items.length < count && (
            <button onClick={() => setPage((p) => p + 1)} disabled={loading} className="fm2-btn-outline" style={{ alignSelf: "center", padding: "10px 28px", borderRadius: 50, margin: "0 0 16px" }}>
              {loading ? "Loading…" : "Load more discussions"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
