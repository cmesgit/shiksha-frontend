import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getThread, postComment, acceptAnswer, toggleThreadUpvote, deleteThread } from "../../api/forum";
import { useAuth } from "../../contexts/AuthContext";
import { useForum } from "../ForumContext";
import Avatar from "../components/Avatar";
import AnswerCard from "../components/AnswerCard";
import CommentThread from "../components/CommentThread";
import { IcUp, IcHeart, IcBookmark, IcShare, IcFlag, IcArrowLeft } from "../components/icons";
import { normAuthor, timeAgo, fmtNum } from "../utils";

export default function ThreadPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    isSaved, toggleSave, isFollowingQuestion, toggleFollowQuestion,
    openReport, showToast, requireAuth,
  } = useForum();

  const [q, setQ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("top");
  const [answerDraft, setAnswerDraft] = useState("");
  const [commentDraft, setCommentDraft] = useState("");
  const [up, setUp] = useState(false);
  const [ups, setUps] = useState(0);

  const load = useCallback(() => {
    setLoading(true);
    getThread(id)
      .then((d) => { setQ(d); setUp(!!d.user_has_upvoted); setUps(d.upvote_count || 0); })
      .catch(() => setQ(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => { load(); }, [load]);

  if (loading) return <div className="fm-loading">Loading…</div>;
  if (!q) return <div className="fm-empty"><h4>Question not found</h4><p>It may have been removed.</p></div>;

  const asker = normAuthor(q.author, q.author_username);
  const isOwner = user?.username && user.username === q.author_username;
  const saved = isSaved(q.id);
  const following = isFollowingQuestion(q.id);

  const answers = [...(q.answers || [])];
  if (sort === "recent") answers.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const doUpvote = async () => {
    if (requireAuth()) return;
    setUp((v) => !v); setUps((n) => n + (up ? -1 : 1));
    try { const r = await toggleThreadUpvote(q.id); setUp(r.upvoted); setUps(r.upvote_count); }
    catch { setUp(up); setUps(q.upvote_count || 0); }
  };

  const submitAnswer = async () => {
    if (requireAuth()) return;
    const v = answerDraft.trim();
    if (!v) { showToast("Write your answer first"); return; }
    try { await postComment(q.id, { content: v, kind: "answer" }); setAnswerDraft(""); showToast("Answer posted"); load(); }
    catch (e) { showToast(e?.response?.data?.reason || "Could not post answer"); }
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

  const onAccept = async (replyId) => {
    try { await acceptAnswer(q.id, replyId); load(); } catch { showToast("Could not update"); }
  };

  const onDelete = async () => {
    try { await deleteThread(q.id); showToast("Deleted"); navigate("/forum"); } catch { showToast("Could not delete"); }
  };

  const share = () => { try { navigator.clipboard?.writeText(window.location.href); } catch { /* */ } showToast("Link copied to clipboard"); };

  return (
    <div>
      <button className="fm-linkbtn" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }} onClick={() => navigate(-1)}>
        <IcArrowLeft size={15} /> Back
      </button>

      <article className="fm-card">
        <div className="fm-card-head">
          <Avatar {...asker} size={40} onClick={() => navigate(`/forum/u/${asker.username}`)} />
          <div>
            <span className="fm-meta-name" onClick={() => navigate(`/forum/u/${asker.username}`)}>{asker.name}</span>
            <div className="fm-meta-sub">
              {q.kind === "post" ? "posted" : "asked"} · {timeAgo(q.created_at)}
              {q.space ? <> · in {q.space.name}</> : null}
            </div>
          </div>
          <div className="fm-spacer" />
          {q.is_solved ? <span className="fm-solved">Solved</span> : null}
        </div>

        {q.tags?.length ? (
          <div className="fm-card-tags">
            {q.tags.map((t) => <span key={t} className="fm-tag" onClick={() => navigate(`/forum?topic=${encodeURIComponent(t)}`)}>{t}</span>)}
          </div>
        ) : null}

        <h1 className="fm-h1" style={{ fontSize: 22, margin: "10px 0" }}>{q.title}</h1>
        {q.body ? <div className="fm-answer-body">{q.body}</div> : null}

        {q.attachments?.length ? (
          <div style={{ marginTop: 8 }}>
            {q.attachments.map((a) => (
              <a key={a.id} className="fm-attach-chip" href={a.url} target="_blank" rel="noreferrer">{a.original_name || a.kind}</a>
            ))}
          </div>
        ) : null}

        <div className="fm-card-foot">
          <span className={`fm-pill${up ? " on" : ""}`}>
            <button onClick={doUpvote}><IcUp size={15} fill={up ? "currentColor" : "none"} /></button>
            <span className="count">{fmtNum(ups)}</span>
          </span>
          <button className="fm-btn ghost sm" onClick={() => toggleFollowQuestion(q.id)}>
            <IcHeart size={14} fill={following ? "currentColor" : "none"} /> {following ? "Following" : "Follow"}
          </button>
          <button className={`fm-icon-btn${saved ? " saved" : ""}`} onClick={() => toggleSave(q.id)} aria-label="Save"><IcBookmark size={18} fill={saved ? "currentColor" : "none"} /></button>
          <button className="fm-icon-btn" onClick={share} aria-label="Share"><IcShare size={17} /></button>
          <button className="fm-icon-btn" onClick={() => openReport("question", q.id)} aria-label="Report"><IcFlag size={16} /></button>
          {isOwner ? <button className="fm-linkbtn" style={{ color: "var(--fm-danger)" }} onClick={onDelete}>Delete</button> : null}
        </div>
      </article>

      {/* Answers */}
      <div className="fm-answers-head">
        <h3>{answers.length} {answers.length === 1 ? "Answer" : "Answers"}</h3>
        <div>
          <button className={`fm-sorttab${sort === "top" ? " on" : ""}`} onClick={() => setSort("top")}>Top</button>
          <button className={`fm-sorttab${sort === "recent" ? " on" : ""}`} onClick={() => setSort("recent")}>Recent</button>
        </div>
      </div>

      <div className="fm-composer">
        <textarea rows={3} placeholder="Write your answer…" value={answerDraft} onChange={(e) => setAnswerDraft(e.target.value)} />
        <div className="fm-modal-foot" style={{ marginTop: 8 }}>
          <button className="fm-btn sm" onClick={submitAnswer}>Post Answer</button>
        </div>
      </div>

      {answers.length === 0 ? (
        <p className="fm-no-ans">No answers yet. Be the first to answer.</p>
      ) : (
        answers.map((a) => <AnswerCard key={a.id} answer={a} canAccept={isOwner} onAccept={onAccept} />)
      )}

      {/* Comments */}
      <div className="fm-answers-head"><h3>Comments</h3></div>
      <div className="fm-composer">
        <textarea rows={2} placeholder="Add a comment…" value={commentDraft} onChange={(e) => setCommentDraft(e.target.value)} />
        <div className="fm-modal-foot" style={{ marginTop: 8 }}>
          <button className="fm-btn ghost sm" onClick={submitComment}>Comment</button>
        </div>
      </div>
      <div className="fm-card">
        <CommentThread comments={q.comments || []} onReply={onReply} />
      </div>
    </div>
  );
}
