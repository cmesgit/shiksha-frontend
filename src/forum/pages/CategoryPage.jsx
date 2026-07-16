import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCategory } from "../../api/forum";
import { useForum } from "../ForumContext";
import Avatar from "../components/Avatar";
import QuestionCard from "../components/QuestionCard";
import { fmtNum } from "../utils";

export default function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFollowingCategory, toggleFollowCategory } = useForum();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    getCategory(id).then(setData).catch(() => setData(null)).finally(() => setLoading(false));
  }, [id]);
  useEffect(() => { load(); }, [load]);

  if (loading) return <div className="fm-loading">Loading…</div>;
  if (!data) return <div className="fm-empty"><h4>Category not found</h4></div>;

  const c = data.category;
  const on = isFollowingCategory(c.id);

  return (
    <div>
      <div className="fm-tile" style={{ marginBottom: 16 }}>
        <div className="fm-row" style={{ justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div className="fm-row">
            <Avatar name={c.name} initials={c.initials} color={c.color} size={52} />
            <div>
              <h1 className="fm-h1" style={{ fontSize: 20, margin: 0 }}>{c.name}</h1>
              <div className="fm-tile-meta">{fmtNum(c.question_count)} questions · {fmtNum(c.follower_count)} followers</div>
            </div>
          </div>
          <button className={`fm-btn sm ${on ? "" : "ghost"}`} onClick={() => toggleFollowCategory(c.id)}>{on ? "Following" : "Follow"}</button>
        </div>
        {c.desc ? <p className="fm-sub" style={{ marginTop: 12, marginBottom: 0 }}>{c.desc}</p> : null}
      </div>

      {(data.results || []).length === 0 ? (
        <div className="fm-empty"><h4>No questions in this category yet</h4><p>Ask one to get the conversation started.</p></div>
      ) : (
        (data.results || []).map((q) => <QuestionCard key={q.id} q={q} />)
      )}
    </div>
  );
}
