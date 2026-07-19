import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getThread, postComment, acceptAnswer, deleteThread } from "../../api/forum";
import { useAuth } from "../../contexts/AuthContext";
import { useForum } from "../ForumContext";
import AnswerCard from "../components/AnswerCard";
import CommentThread from "../components/CommentThread";
import { normAuthor, timeAgo } from "../utils";

/* Thread page — matches ShikshaCom Forum.html thread screen: back link, the
   question card (tags/title/body/asker row + report·share + Write an Answer),
   an answers header with sort tabs + answer cards, and a comments card. */
export default function ThreadPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { openReport, showToast, requireAuth } = useForum();

  const [q, setQ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("top");
  const [answerOpen, setAnswerOpen] = useState(false);
  const [answerDraft, setAnswerDraft] = useState("");
  const [commentDraft, setCommentDraft] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    getThread(id)
      .then((d) => setQ(d))
      .catch(() => setQ(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => { load(); }, [load]);

  if (loading) return <div className="fm2-empty-card">Loading…</div>;
  if (!q) return <div className="fm2-card" style={{ padding: "40px 24px", textAlign: "center" }}><div style={{ font: "800 15px Montserrat,sans-serif", color: "#125027", marginBottom: 6 }}>Question not found</div><div style={{ font: "400 13px Poppins,sans-serif", color: "#8a9e82" }}>It may have been removed.</div></div>;

  const asker = normAuthor(q.author, q.author_username);
  const isOwner = user?.username && user.username === q.author_username;
  const answers = [...(q.answers || [])];
  if (sort === "recent") answers.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const submitAnswer = async () => {
    if (requireAuth()) return;
    const v = answerDraft.trim();
    if (!v) { showToast("Write your answer first"); return; }
    try { await postComment(q.id, { content: v, kind: "answer" }); setAnswerDraft(""); setAnswerOpen(false); showToast("Answer posted"); load(); }
    catch (e) { showToast(e?.response?.data?.reason || e?.response?.data?.detail || "Could not post answer"); }
  };
  const submitComment = async () => {
    if (requireAuth()) return;
    const v = commentDraft.trim();
    if (!v) return;
    try { await postComment(q.id, { content: v, kind: "comment" }); setCommentDraft(""); showToast("Comment added"); load(); }
    catch (e) { showToast(e?.response?.data?.reason || "Could not add comment"); }
  };
  const onReply = async (parentId, content) => {
    if (requireAuth()) return;
    try { await postComment(q.id, { content, kind: "comment", reply_to_comment_id: parentId }); showToast("Reply added"); load(); }
    catch { showToast("Could not add reply"); }
  };
  const onAccept = async (replyId) => { try { await acceptAnswer(q.id, replyId); load(); } catch { showToast("Could not update"); } };
  const onDelete = async () => { try { await deleteThread(q.id); showToast("Deleted"); navigate("/forum"); } catch { showToast("Could not delete"); } };
  const share = () => { try { navigator.clipboard?.writeText(window.location.href); } catch { /* */ } showToast("Link copied to clipboard"); };

  const sortTab = (id2, label) => (
    <button key={id2} onClick={() => setSort(id2)} style={{ background: sort === id2 ? "#125027" : "none", color: sort === id2 ? "#fff" : "#5a6e55", border: "none", borderRadius: 50, padding: "6px 16px", font: "700 12px Poppins,sans-serif", cursor: "pointer" }}>{label}</button>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
      <button onClick={() => navigate(-1)} className="fm2-btn-ghost" style={{ alignSelf: "flex-start", padding: "6px 10px" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        Back
      </button>

      {/* Question card */}
      <div className="fm2-card" style={{ padding: "22px 24px" }}>
        {q.tags?.length ? (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            {q.tags.map((t) => <button key={t} className="fm2-tag" onClick={() => navigate(`/forum?topic=${encodeURIComponent(t)}`)}>#{t}</button>)}
          </div>
        ) : null}
        <h1 style={{ font: "800 22px/1.35 Montserrat,sans-serif", color: "#18261a", margin: "0 0 14px" }}>
          {q.title}
          {q.is_solved && <span className="fm2-solved-tag" style={{ fontSize: 11 }}>✓ Solved</span>}
        </h1>
        {q.body ? <p style={{ font: "400 14px/1.8 Poppins,sans-serif", color: "#4a5e3a", margin: "0 0 14px", whiteSpace: "pre-line" }}>{q.body}</p> : null}

        {q.attachments?.length ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
            {q.attachments.map((a) => <a key={a.id} className="fm2-tag" href={a.url} target="_blank" rel="noreferrer">{a.original_name || a.kind}</a>)}
          </div>
        ) : null}

        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", borderTop: "1px solid #e4edd8", borderBottom: "1px solid #e4edd8", marginBottom: 14, flexWrap: "wrap" }}>
          <div onClick={() => navigate(`/forum/u/${asker.username}`)} className="fm2-avatar-sm" style={{ width: 34, height: 34, background: asker.color, cursor: "pointer" }}>{asker.initials}</div>
          <div>
            <div onClick={() => navigate(`/forum/u/${asker.username}`)} style={{ font: "700 13px Poppins,sans-serif", color: "#125027", cursor: "pointer" }}>{asker.name}</div>
            <div style={{ font: "400 11.5px Poppins,sans-serif", color: "#8a9e82" }}>{q.kind === "post" ? "posted" : "asked"} {timeAgo(q.created_at)}{q.space ? ` · in ${q.space.name}` : ""}</div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <button onClick={() => openReport("question", q.id)} style={{ display: "flex", alignItems: "center", gap: 7, background: "none", border: "1.5px solid #f0c8c0", borderRadius: 8, padding: "7px 14px", font: "700 13px Poppins,sans-serif", color: "#b03020", cursor: "pointer" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>
              Report
            </button>
            <button onClick={share} className="fm2-btn-outline" style={{ padding: "7px 14px" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" /></svg>
              Share
            </button>
            {isOwner && <button onClick={onDelete} className="fm2-btn-ghost" style={{ padding: "7px 12px", color: "#b03020" }}>Delete</button>}
          </div>
        </div>

        <button onClick={() => { if (!requireAuth()) setAnswerOpen((o) => !o); }} className="fm2-btn-green">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
          Write an Answer
        </button>
        {answerOpen && (
          <div style={{ marginTop: 14, padding: 16, background: "#f4f8f0", borderRadius: 10, border: "1px solid #d8e6c8" }}>
            <textarea value={answerDraft} onChange={(e) => setAnswerDraft(e.target.value)} placeholder="Share what you know. Be specific and helpful…" style={{ width: "100%", boxSizing: "border-box", minHeight: 110, border: "1.5px solid #d8e6c8", borderRadius: 8, padding: "12px 14px", resize: "vertical", font: "400 13.5px/1.65 Poppins,sans-serif", color: "#18261a", outline: "none", background: "#fff" }} />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 10 }}>
              <button onClick={() => setAnswerOpen(false)} className="fm2-btn-ghost">Cancel</button>
              <button onClick={submitAnswer} className="fm2-btn-green">Post Answer</button>
            </div>
          </div>
        )}
      </div>

      {/* Answers header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2px" }}>
        <span style={{ font: "800 14px Montserrat,sans-serif", color: "#125027" }}>{answers.length} {answers.length === 1 ? "Answer" : "Answers"}</span>
        <div style={{ display: "flex", gap: 3, background: "#fff", border: "1px solid #d8e6c8", borderRadius: 50, padding: 3 }}>
          {sortTab("top", "Top")}
          {sortTab("recent", "Recent")}
        </div>
      </div>

      {answers.length === 0 ? (
        <div className="fm2-empty-card">No answers yet. Be the first to answer.</div>
      ) : (
        answers.map((a) => <AnswerCard key={a.id} answer={a} canAccept={isOwner} onAccept={onAccept} onDelete={isOwner ? undefined : undefined} />)
      )}

      {/* Comments */}
      <div className="fm2-card" style={{ padding: "16px 18px" }}>
        <div className="fm2-section-hd">Comments ({(q.comments || []).length})</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input className="fm2-input" placeholder="Add a comment…" value={commentDraft} onChange={(e) => setCommentDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); submitComment(); } }} />
          <button className="fm2-btn-green" style={{ padding: "9px 16px" }} onClick={submitComment}>Comment</button>
        </div>
        <CommentThread comments={q.comments || []} onReply={onReply} />
      </div>
    </div>
  );
}
