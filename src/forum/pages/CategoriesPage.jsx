import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../api/forum";
import { useForum } from "../ForumContext";
import { fmtNum } from "../utils";

export default function CategoriesPage() {
  const navigate = useNavigate();
  const { isFollowingCategory, toggleFollowCategory } = useForum();
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then((d) => setCats(d.results || [])).catch(() => setCats([])).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
      <div><h1 className="fm2-h1">Categories</h1><p className="fm2-sub">Browse questions by topic.</p></div>
      {loading ? <div className="fm2-empty-card">Loading…</div> : (
        <div className="fm2-grid">
          {cats.map((c) => {
            const on = isFollowingCategory(c.id);
            return (
              <div key={c.id} className="fm2-tile">
                <div className="fm2-tile-head">
                  <div className="fm2-avatar-sm" style={{ width: 44, height: 44, background: c.color || "#125027", fontSize: 15 }}>{c.initials}</div>
                  <div className="fm2-tile-name" onClick={() => navigate(`/forum/category/${c.id}`)}>{c.name}</div>
                </div>
                <div className="fm2-tile-desc">{c.desc}</div>
                <div className="fm2-tile-foot">
                  <span className="fm2-tile-meta">{fmtNum(c.question_count)} questions · {fmtNum(c.follower_count)} followers</span>
                  <button className={on ? "fm2-btn-green" : "fm2-btn-outline"} style={{ padding: "7px 16px" }} onClick={async () => {
                    const res = await toggleFollowCategory(c.id);
                    if (res) setCats((prev) => prev.map((x) => x.id === c.id ? { ...x, follower_count: res.follower_count } : x));
                  }}>{on ? "✓ Following" : "Follow"}</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
