import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSpaces } from "../../api/forum";
import { useForum } from "../ForumContext";
import Avatar from "../components/Avatar";
import { IcPlus } from "../components/icons";
import { fmtNum } from "../utils";

export default function SpacesPage() {
  const navigate = useNavigate();
  const { isFollowingSpace, toggleFollowSpace, requireAuth } = useForum();
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, force] = useState(0);

  useEffect(() => {
    getSpaces().then((d) => setSpaces(d.results || [])).catch(() => setSpaces([])).finally(() => setLoading(false));
  }, []);

  const onFollow = async (slug) => {
    const res = await toggleFollowSpace(slug);
    if (res) { setSpaces((prev) => prev.map((s) => s.slug === slug ? { ...s, member_count: res.member_count } : s)); force((n) => n + 1); }
  };

  return (
    <div>
      <div className="fm-row" style={{ justifyContent: "space-between" }}>
        <div>
          <h1 className="fm-h1">Spaces</h1>
          <p className="fm-sub">Communities for every goal. Follow the ones you care about.</p>
        </div>
        <button className="fm-btn" onClick={() => { if (!requireAuth()) navigate("/forum/spaces/new"); }}><IcPlus size={15} /> Create Space</button>
      </div>

      {loading ? <div className="fm-loading">Loading…</div> : spaces.length === 0 ? (
        <div className="fm-empty"><h4>No Spaces yet</h4><p>Be the first to create a community Space.</p></div>
      ) : (
        <div className="fm-grid">
          {spaces.map((s) => {
            const on = isFollowingSpace(s.slug);
            return (
              <div key={s.slug} className="fm-tile">
                <div className="fm-tile-head">
                  <Avatar name={s.name} initials={s.initials} color={s.color} size={44} />
                  <div className="fm-tile-name" onClick={() => navigate(`/forum/space/${s.slug}`)}>{s.name}</div>
                </div>
                <div className="fm-tile-desc">{s.description}</div>
                <div className="fm-tile-foot">
                  <span className="fm-tile-meta">{fmtNum(s.member_count)} members · {fmtNum(s.question_count)} posts</span>
                  <button className={`fm-btn sm ${on ? "" : "ghost"}`} onClick={() => onFollow(s.slug)}>{on ? "Following" : "Follow"}</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
