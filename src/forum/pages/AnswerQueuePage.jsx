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
    <div className="fm2-card" style={{ padding: "16px 18px" }}>
      {(q.tags || []).length ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8 }}>
          {(q.tags || []).slice(0, 3).map((t) => <span key={t} className="fm2-tag">#{t}</span>)}
        </div>
      ) : null}
      <h3 className="fm2-thread-title" style={{ cursor: "pointer" }} onClick={() => navigate(`/forum/thread/${q.id}`)}>{q.title}</h3>
      <div style={{ font: "400 11.5px Poppins,sans-serif", color: "#8a9e82", margin: "4px 0 0" }}>asked {timeAgo(q.created_at)}</div>
      {open ? (
        <textarea rows={3} placeholder="Write your answer…" value={draft} onChange={(e) => setDraft(e.target.value)} className="fm2-textarea" style={{ marginTop: 10 }} />
      ) : null}
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button className="fm2-btn-green" style={{ padding: "8px 16px" }} onClick={() => (open ? submit() : setOpen(true))}>{open ? "Post Answer" : "Answer"}</button>
        <button className="fm2-btn-ghost" style={{ padding: "8px 14px" }} onClick={() => onDone(q.id)}>Skip</button>
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
    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
      <div><h1 className="fm2-h1">Answer Queue</h1><p className="fm2-sub">Questions still waiting for a first answer.</p></div>
      {loading ? <div className="fm2-empty-card">Loading…</div> : items.length === 0 ? (
        <div className="fm2-empty-card">You're all caught up — no unanswered questions right now.</div>
      ) : items.map((q) => <QueueItem key={q.id} q={q} onDone={remove} />)}
    </div>
  );
}
