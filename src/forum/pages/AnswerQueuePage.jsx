import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAnswerQueue, postComment } from "../../api/forum";
import { useForum } from "../ForumContext";
import { timeAgo } from "../utils";

function QueueItem({ q, onDone }) {
  const navigate = useNavigate();
  const { showToast } = useForum();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");

  const submit = async () => {
    const v = draft.trim();
    if (!v) { showToast("Write your answer first"); return; }
    try { await postComment(q.id, { content: v, kind: "answer" }); showToast("Answer posted"); onDone(q.id); }
    catch (e) { showToast(e?.response?.data?.reason || "Could not post"); }
  };

  return (
    <div className="fm-card">
      <div className="fm-card-tags">{(q.tags || []).slice(0, 3).map((t) => <span key={t} className="fm-tag">{t}</span>)}</div>
      <h3 className="fm-card-title" onClick={() => navigate(`/forum/thread/${q.id}`)}>{q.title}</h3>
      <div className="fm-meta-sub">asked · {timeAgo(q.created_at)}</div>
      {open ? (
        <div className="fm-composer" style={{ marginTop: 10 }}>
          <textarea rows={3} placeholder="Write your answer…" value={draft} onChange={(e) => setDraft(e.target.value)} />
        </div>
      ) : null}
      <div className="fm-card-foot">
        <button className="fm-btn sm" onClick={() => (open ? submit() : setOpen(true))}>{open ? "Post Answer" : "Answer"}</button>
        <button className="fm-btn ghost sm" onClick={() => onDone(q.id)}>Skip</button>
      </div>
    </div>
  );
}

export default function AnswerQueuePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    getAnswerQueue().then((d) => setItems(d.results || [])).catch(() => setItems([])).finally(() => setLoading(false));
  }, []);
  useEffect(() => { load(); }, [load]);

  const remove = (id) => setItems((prev) => prev.filter((x) => x.id !== id));

  return (
    <div>
      <h1 className="fm-h1">Answer Queue</h1>
      <p className="fm-sub">Questions still waiting for a first answer.</p>
      {loading ? <div className="fm-loading">Loading…</div> : items.length === 0 ? (
        <div className="fm-empty"><h4>You're all caught up</h4><p>No unanswered questions right now. Check back later.</p></div>
      ) : items.map((q) => <QueueItem key={q.id} q={q} onDone={remove} />)}
    </div>
  );
}
