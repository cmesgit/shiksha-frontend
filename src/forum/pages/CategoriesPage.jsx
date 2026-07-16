import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../api/forum";
import { useForum } from "../ForumContext";
import Avatar from "../components/Avatar";
import { fmtNum } from "../utils";

export default function CategoriesPage() {
  const navigate = useNavigate();
  const { isFollowingCategory, toggleFollowCategory } = useForum();
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, force] = useState(0);

  useEffect(() => {
    getCategories().then((d) => setCats(d.results || [])).catch(() => setCats([])).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="fm-h1">Categories</h1>
      <p className="fm-sub">Browse questions by topic.</p>
      {loading ? <div className="fm-loading">Loading…</div> : (
        <div className="fm-grid">
          {cats.map((c) => {
            const on = isFollowingCategory(c.id);
            return (
              <div key={c.id} className="fm-tile">
                <div className="fm-tile-head">
                  <Avatar name={c.name} initials={c.initials} color={c.color} size={44} />
                  <div className="fm-tile-name" onClick={() => navigate(`/forum/category/${c.id}`)}>{c.name}</div>
                </div>
                <div className="fm-tile-desc">{c.desc}</div>
                <div className="fm-tile-foot">
                  <span className="fm-tile-meta">{fmtNum(c.question_count)} questions · {fmtNum(c.follower_count)} followers</span>
                  <button className={`fm-btn sm ${on ? "" : "ghost"}`} onClick={async () => { await toggleFollowCategory(c.id); force((n) => n + 1); }}>{on ? "Following" : "Follow"}</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
