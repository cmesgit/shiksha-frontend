import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSpaces } from "../../api/forum";
import { useForum } from "../ForumContext";
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
    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="fm2-h1">Spaces</h1>
          <p className="fm2-sub">Communities for every goal. Follow the ones you care about.</p>
        </div>
        <button className="fm2-btn-green" style={{ padding: "9px 18px" }} onClick={() => { if (!requireAuth()) navigate("/forum/spaces/new"); }}><IcPlus size={15} /> Create Space</button>
      </div>

      {loading ? <div className="fm2-empty-card">Loading…</div> : spaces.length === 0 ? (
        <div className="fm2-empty-card">No Spaces yet. Be the first to create a community Space.</div>
      ) : (
        <div className="fm2-grid">
          {spaces.map((s) => {
            const on = isFollowingSpace(s.slug);
            return (
              <div key={s.slug} className="fm2-tile">
                <div className="fm2-tile-head">
                  <div className="fm2-avatar-sm" style={{ width: 44, height: 44, background: s.color || "#125027", fontSize: 15 }}>{s.initials}</div>
                  <div className="fm2-tile-name" onClick={() => navigate(`/forum/space/${s.slug}`)}>{s.name}</div>
                </div>
                <div className="fm2-tile-desc">{s.description}</div>
                <div className="fm2-tile-foot">
                  <span className="fm2-tile-meta">{fmtNum(s.member_count)} members · {fmtNum(s.question_count)} posts</span>
                  <button className={on ? "fm2-btn-green" : "fm2-btn-outline"} style={{ padding: "7px 16px" }} onClick={() => onFollow(s.slug)}>{on ? "✓ Following" : "Follow"}</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
