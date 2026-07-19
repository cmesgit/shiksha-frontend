import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { search as apiSearch } from "../../api/forum";
import QuestionCard from "../components/QuestionCard";
import { normAuthor } from "../utils";

export default function SearchPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const q = params.get("q") || "";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    if (!q) { setLoading(false); return; }
    setLoading(true);
    apiSearch(q).then(setData).catch(() => setData(null)).finally(() => setLoading(false));
  }, [q]);

  if (!q) return <div className="fm2-empty-card">Search the forum — type a query in the bar above.</div>;
  if (loading) return <div className="fm2-empty-card">Searching…</div>;
  if (!data) return <div className="fm2-empty-card">No results.</div>;

  const counts = {
    all: (data.questions?.length || 0) + (data.users?.length || 0) + (data.tags?.length || 0) + (data.categories?.length || 0),
    questions: data.questions?.length || 0, users: data.users?.length || 0,
    tags: data.tags?.length || 0, categories: data.categories?.length || 0,
  };
  const TABS = [["all", "All"], ["questions", "Questions"], ["users", "People"], ["tags", "Tags"], ["categories", "Categories"]];
  const show = (k) => tab === "all" || tab === k;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
      <div><h1 className="fm2-h1">Results for “{q}”</h1><p className="fm2-sub">{counts.all} result{counts.all === 1 ? "" : "s"} across questions, people, tags and categories.</p></div>

      <div className="fm2-tabline">
        {TABS.map(([id, label]) => (
          <button key={id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}>{label} ({counts[id]})</button>
        ))}
      </div>

      {show("questions") && data.questions?.length ? (
        <div className="fm2-feed-scroll">
          {tab === "all" ? <div className="fm2-section-hd">Questions</div> : null}
          {data.questions.map((x) => <QuestionCard key={x.id} q={x} />)}
        </div>
      ) : null}

      {show("users") && data.users?.length ? (
        <div className="fm2-card" style={{ padding: "8px 16px" }}>
          {data.users.map((u) => { const a = normAuthor(u, u.username); return (
            <div key={a.username} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid #e4edd8", cursor: "pointer" }} onClick={() => navigate(`/forum/u/${a.username}`)}>
              <div className="fm2-avatar-sm" style={{ width: 40, height: 40, background: a.color }}>{a.initials}</div>
              <div><div className="fm2-asker-name" style={{ fontSize: 13.5 }}>{a.name}</div><div style={{ font: "400 11.5px Poppins,sans-serif", color: "#8a9e82" }}>{a.credential}</div></div>
            </div>
          ); })}
        </div>
      ) : null}

      {show("tags") && data.tags?.length ? (
        <div className="fm2-card" style={{ padding: "13px 14px", display: "flex", flexWrap: "wrap", gap: 6 }}>
          {data.tags.map((t) => (
            <button key={t.label} className="fm2-tag" onClick={() => navigate(`/forum?topic=${encodeURIComponent(t.label)}`)}>#{t.label}</button>
          ))}
        </div>
      ) : null}

      {show("categories") && data.categories?.length ? (
        <div className="fm2-grid">
          {data.categories.map((c) => (
            <div key={c.id} className="fm2-tile" onClick={() => navigate(`/forum/category/${c.id}`)} style={{ cursor: "pointer" }}>
              <div className="fm2-tile-head"><div className="fm2-avatar-sm" style={{ width: 40, height: 40, background: c.color || "#125027" }}>{c.initials}</div><div className="fm2-tile-name">{c.name}</div></div>
              <div className="fm2-tile-desc">{c.desc}</div>
            </div>
          ))}
        </div>
      ) : null}

      {counts.all === 0 ? <div className="fm2-empty-card">No matches. Try a different search.</div> : null}
    </div>
  );
}
