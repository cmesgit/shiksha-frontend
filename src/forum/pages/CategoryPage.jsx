import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategory } from "../../api/forum";
import { useForum } from "../ForumContext";
import QuestionCard from "../components/QuestionCard";
import { fmtNum } from "../utils";

export default function CategoryPage() {
  const { id } = useParams();
  const { isFollowingCategory, toggleFollowCategory } = useForum();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    getCategory(id).then(setData).catch(() => setData(null)).finally(() => setLoading(false));
  }, [id]);
  useEffect(() => { load(); }, [load]);

  if (loading) return <div className="fm2-empty-card">Loading…</div>;
  if (!data) return <div className="fm2-empty-card">Category not found.</div>;

  const c = data.category;
  const on = isFollowingCategory(c.id);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
      <div className="fm2-card" style={{ padding: "18px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="fm2-avatar-sm" style={{ width: 52, height: 52, background: c.color || "#125027", fontSize: 17 }}>{c.initials}</div>
            <div>
              <h1 className="fm2-h1" style={{ fontSize: 20, margin: 0 }}>{c.name}</h1>
              <div className="fm2-tile-meta">{fmtNum(c.question_count)} questions · {fmtNum(c.follower_count)} followers</div>
            </div>
          </div>
          <button className={on ? "fm2-btn-green" : "fm2-btn-outline"} style={{ padding: "8px 18px" }} onClick={() => toggleFollowCategory(c.id)}>{on ? "✓ Following" : "Follow"}</button>
        </div>
        {c.desc ? <p className="fm2-sub" style={{ marginTop: 12, marginBottom: 0 }}>{c.desc}</p> : null}
      </div>

      {(data.results || []).length === 0 ? (
        <div className="fm2-empty-card">No questions in this category yet. Ask one to get the conversation started.</div>
      ) : (
        <div className="fm2-feed-scroll">{(data.results || []).map((q) => <QuestionCard key={q.id} q={q} />)}</div>
      )}
    </div>
  );
}
