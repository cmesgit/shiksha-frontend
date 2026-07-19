import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSpace } from "../../api/forum";
import { useForum } from "../ForumContext";
import QuestionCard from "../components/QuestionCard";
import { IcPlus } from "../components/icons";
import { fmtNum } from "../utils";

export default function SpacePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isFollowingSpace, toggleFollowSpace, requireAuth } = useForum();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    getSpace(slug).then(setData).catch(() => setData(null)).finally(() => setLoading(false));
  }, [slug]);
  useEffect(() => { load(); }, [load]);

  if (loading) return <div className="fm2-empty-card">Loading…</div>;
  if (!data) return <div className="fm2-empty-card">Space not found.</div>;

  const sp = data.space;
  const on = isFollowingSpace(sp.slug);
  const onFollow = async () => { const res = await toggleFollowSpace(sp.slug); if (res) setData((d) => ({ ...d, space: { ...d.space, member_count: res.member_count } })); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
      <div className="fm2-card" style={{ padding: "18px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="fm2-avatar-sm" style={{ width: 56, height: 56, background: sp.color || "#125027", fontSize: 18 }}>{sp.initials}</div>
            <div>
              <h1 className="fm2-h1" style={{ fontSize: 20, margin: 0 }}>{sp.name}</h1>
              <div className="fm2-tile-meta">{fmtNum(sp.member_count)} members · {fmtNum(sp.question_count)} posts</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className={on ? "fm2-btn-green" : "fm2-btn-outline"} style={{ padding: "8px 16px" }} onClick={onFollow}>{on ? "✓ Following" : "Follow"}</button>
            <button className="fm2-btn-green" style={{ padding: "8px 16px" }} onClick={() => { if (!requireAuth()) navigate(`/forum/ask?space=${sp.slug}`); }}><IcPlus size={14} /> Ask</button>
          </div>
        </div>
        {sp.description ? <p className="fm2-sub" style={{ marginTop: 12, marginBottom: 0 }}>{sp.description}</p> : null}
      </div>

      {(data.results || []).length === 0 ? (
        <div className="fm2-empty-card">No posts in this Space yet. Be the first to ask something here.</div>
      ) : (
        <div className="fm2-feed-scroll">{(data.results || []).map((q) => <QuestionCard key={q.id} q={q} />)}</div>
      )}
    </div>
  );
}
