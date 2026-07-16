import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getThreads, getTags } from "../../api/forum";

const RULES = [
  "Be respectful — no personal attacks or harassment.",
  "Keep questions clear, specific and on-topic.",
  "No spam, self-promotion or referral links.",
  "Cite sources; don't share misleading information.",
  "Search before posting to avoid duplicates.",
];

export default function RightRail() {
  const navigate = useNavigate();
  const [trending, setTrending] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    let alive = true;
    getThreads({ sort: "trending", page_size: 4 })
      .then((d) => { if (alive) setTrending(d.results || []); })
      .catch(() => {});
    getTags()
      .then((d) => { if (alive) setTags((Array.isArray(d) ? d : []).slice(0, 7)); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  return (
    <aside>
      {trending.length ? (
        <div className="fm-rail-card">
          <h4 className="fm-rail-title">Trending</h4>
          {trending.map((q, i) => (
            <div key={q.id} className="fm-rail-item" onClick={() => navigate(`/forum/thread/${q.id}`)}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <span className="t">{q.title}</span>
            </div>
          ))}
        </div>
      ) : null}

      {tags.length ? (
        <div className="fm-rail-card">
          <h4 className="fm-rail-title">Popular tags</h4>
          {tags.map((t) => (
            <div key={t.id || t.name} className="fm-rail-tag" onClick={() => navigate(`/forum?topic=${encodeURIComponent(t.name)}`)}>
              <span className="label">#{t.name}</span>
            </div>
          ))}
        </div>
      ) : null}

      <div className="fm-rail-card">
        <h4 className="fm-rail-title">Community rules</h4>
        {RULES.map((r, i) => (
          <div key={i} className="fm-rule"><span className="n">{i + 1}</span><span>{r}</span></div>
        ))}
      </div>
    </aside>
  );
}
