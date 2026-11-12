import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getThreads } from "../../api/forum";
import { useForum } from "../ForumContext";
import { useAuth } from "../../contexts/AuthContext";
import QuestionCard from "../components/QuestionCard";
import { FEED_TABS } from "../utils";
import ScribbleIcon from "../../components/icons/ScribbleIcon";

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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
      {/* Quick composer — the Ask / Post / Answer buttons live in the forum
          hero above (ForumLayout), so this stays a single quiet prompt. */}
      <div className="fm2-composer">
        <div className="fm2-avatar-sm" style={{ width: 34, height: 34, background: me?.color || "#0B5B3E" }}>{me?.initials || "YO"}</div>
        <button onClick={() => openAsk()} className="fm2-composer-input">
          What would you like to discuss today?
        </button>
        <button onClick={() => openAsk("question")} className="fm2-composer-go" aria-label="Ask a question">
          <ScribbleIcon name="plus" size={16} />
        </button>
      </div>

      {/* Tabs */}
      <div className="fm2-tabs" role="tablist">
        {FEED_TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => changeTab(t.id)} className={`fm2-tab${tab === t.id ? " on" : ""}`}>{t.label}</button>
        ))}
      </div>

      {/* Active filter banner */}
      {activeTopic && (
        <div style={{ display: "flex", alignItems: "center", gap: 9, background: "#fff8e8", border: "1px solid #ecd080", borderRadius: 10, padding: "9px 14px" }}>
          <ScribbleIcon name="filter" size={13} color="#e07900" />
          <span style={{ font: "600 12.5px Poppins,sans-serif", color: "#7a4c00" }}>Showing discussions tagged <strong>#{activeTopic}</strong></span>
          <button onClick={clearTopic} style={{ marginLeft: "auto", background: "#e07900", color: "#fff", border: "none", borderRadius: 7, padding: "5px 12px", font: "700 11.5px Poppins,sans-serif", cursor: "pointer" }}>Clear</button>
        </div>
      )}

      {/* List */}
      {loading && page === 1 ? (
        <div className="fm2-empty-card">Loading discussions…</div>
      ) : items.length === 0 ? (
        <div className="fm2-card fm2-empty-state">
          <div className="fm2-empty-ic">
            <ScribbleIcon name="message" size={24} color="#0B5B3E" />
          </div>
          <div className="fm2-empty-t">
            {activeTopic ? `No discussions tagged #${activeTopic}` : "No discussions yet"}
          </div>
          <div className="fm2-empty-d">
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
