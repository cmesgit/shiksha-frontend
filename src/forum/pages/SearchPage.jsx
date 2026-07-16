import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { search as apiSearch } from "../../api/forum";
import QuestionCard from "../components/QuestionCard";
import Avatar from "../components/Avatar";
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

  if (!q) return <div className="fm-empty"><h4>Search the forum</h4><p>Type a query in the bar above.</p></div>;
  if (loading) return <div className="fm-loading">Searching…</div>;
  if (!data) return <div className="fm-empty"><h4>No results</h4></div>;

  const counts = {
    all: (data.questions?.length || 0) + (data.users?.length || 0) + (data.tags?.length || 0) + (data.categories?.length || 0),
    questions: data.questions?.length || 0, users: data.users?.length || 0,
    tags: data.tags?.length || 0, categories: data.categories?.length || 0,
  };
  const TABS = [["all", "All"], ["questions", "Questions"], ["users", "People"], ["tags", "Tags"], ["categories", "Categories"]];
  const show = (k) => tab === "all" || tab === k;

  return (
    <div>
      <h1 className="fm-h1">Results for “{q}”</h1>
      <p className="fm-sub">{counts.all} result{counts.all === 1 ? "" : "s"} across questions, people, tags and categories.</p>

      <div className="fm-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} className={`fm-tab${tab === id ? " active" : ""}`} onClick={() => setTab(id)}>{label} ({counts[id]})</button>
        ))}
      </div>

      {show("questions") && data.questions?.length ? (
        <>{tab === "all" ? <h4 className="fm-rail-title">Questions</h4> : null}{data.questions.map((x) => <QuestionCard key={x.id} q={x} />)}</>
      ) : null}

      {show("users") && data.users?.length ? (
        <div className="fm-card">
          {data.users.map((u) => { const a = normAuthor(u, u.username); return (
            <div key={a.username} className="fm-row" style={{ padding: "8px 0", borderBottom: "1px solid var(--fm-line)", cursor: "pointer" }} onClick={() => navigate(`/forum/u/${a.username}`)}>
              <Avatar {...a} size={40} />
              <div><div className="fm-meta-name">{a.name}</div><div className="fm-meta-sub">{a.credential}</div></div>
            </div>
          ); })}
        </div>
      ) : null}

      {show("tags") && data.tags?.length ? (
        <div className="fm-card">
          {data.tags.map((t) => (
            <div key={t.label} className="fm-rail-tag" onClick={() => navigate(`/forum?topic=${encodeURIComponent(t.label)}`)}>
              <span className="label">#{t.label}</span>
            </div>
          ))}
        </div>
      ) : null}

      {show("categories") && data.categories?.length ? (
        <div className="fm-grid">
          {data.categories.map((c) => (
            <div key={c.id} className="fm-tile" onClick={() => navigate(`/forum/category/${c.id}`)} style={{ cursor: "pointer" }}>
              <div className="fm-tile-head"><Avatar name={c.name} initials={c.initials} color={c.color} size={40} /><div className="fm-tile-name">{c.name}</div></div>
              <div className="fm-tile-desc">{c.desc}</div>
            </div>
          ))}
        </div>
      ) : null}

      {counts.all === 0 ? <div className="fm-empty"><h4>No matches</h4><p>Try a different search.</p></div> : null}
    </div>
  );
}
