import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSpace } from "../../api/forum";
import { useForum } from "../ForumContext";
import Avatar from "../components/Avatar";
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

  if (loading) return <div className="fm-loading">Loading…</div>;
  if (!data) return <div className="fm-empty"><h4>Space not found</h4></div>;

  const sp = data.space;
  const on = isFollowingSpace(sp.slug);
  const onFollow = async () => { const res = await toggleFollowSpace(sp.slug); if (res) setData((d) => ({ ...d, space: { ...d.space, member_count: res.member_count } })); };

  return (
    <div>
      <div className="fm-tile" style={{ marginBottom: 16 }}>
        <div className="fm-row" style={{ justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div className="fm-row">
            <Avatar name={sp.name} initials={sp.initials} color={sp.color} size={56} />
            <div>
              <h1 className="fm-h1" style={{ fontSize: 20, margin: 0 }}>{sp.name}</h1>
              <div className="fm-tile-meta">{fmtNum(sp.member_count)} members · {fmtNum(sp.question_count)} posts</div>
            </div>
          </div>
          <div className="fm-row">
            <button className={`fm-btn sm ${on ? "" : "ghost"}`} onClick={onFollow}>{on ? "Following" : "Follow"}</button>
            <button className="fm-btn sm" onClick={() => { if (!requireAuth()) navigate(`/forum/ask?space=${sp.slug}`); }}><IcPlus size={14} /> Ask</button>
          </div>
        </div>
        {sp.description ? <p className="fm-sub" style={{ marginTop: 12, marginBottom: 0 }}>{sp.description}</p> : null}
      </div>

      {(data.results || []).length === 0 ? (
        <div className="fm-empty"><h4>No posts in this Space yet</h4><p>Be the first to ask something here.</p></div>
      ) : (
        (data.results || []).map((q) => <QuestionCard key={q.id} q={q} />)
      )}
    </div>
  );
}
