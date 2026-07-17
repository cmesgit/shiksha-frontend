import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getThreads, getTags } from "../../api/forum";

export default function RightRail() {
  const navigate = useNavigate();
  const [trending, setTrending] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    let alive = true;
    getThreads({ sort: "trending", page_size: 5 })
      .then((d) => { if (alive) setTrending(d.results || []); })
      .catch(() => {});
    getTags()
      .then((d) => { if (alive) setTags((Array.isArray(d) ? d : []).slice(0, 10)); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  return (
    <aside className="fm2-widgets">
      {trending.length ? (
        <div className="fm2-card" style={{ padding: "13px 14px" }}>
          <div className="fm2-section-hd">🔥 Trending Discussions</div>
          {trending.map((q, i) => (
            <button key={q.id} className="fm2-rail-item" onClick={() => navigate(`/forum/thread/${q.id}`)}>
              <span className="fm2-rail-num">{i + 1}</span>
              <span className="fm2-rail-title">{q.title}</span>
            </button>
          ))}
        </div>
      ) : null}

      {tags.length ? (
        <div className="fm2-card" style={{ padding: "13px 14px" }}>
          <div className="fm2-section-hd">Popular Tags</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {tags.map((t) => (
              <button key={t.id || t.name} className="fm2-tag" onClick={() => navigate(`/forum?topic=${encodeURIComponent(t.name)}`)}>#{t.name}</button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="fm2-card" style={{ padding: "13px 14px" }}>
        <div className="fm2-section-hd">Ask a great question</div>
        <p style={{ font: "400 12px/1.6 Poppins,sans-serif", color: "#4a5e3a", margin: 0 }}>
          Be specific, add context, and tag the right topics so the right people can help you faster.
        </p>
      </div>
    </aside>
  );
}
