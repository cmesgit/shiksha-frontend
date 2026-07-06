// PLACEMENT: src/forum/ThreadDetailPage.jsx   (REPLACE THE WHOLE FILE — landing/frontend app)
//
// Thread view from the approved design: white detail card with vote
// column · tag badge · title · author row · body · #tag pills · action
// row (Reply / Share / Delete) · reply cards with nested reply-to and a
// composer. Wired to:
//   GET  /forum/threads/:id/            POST /forum/threads/:id/upvote/
//   GET  /forum/threads/:id/comments/   POST /forum/threads/:id/comments/create/
//   POST /forum/comments/:id/upvote/    DELETE /forum/comments/:id/delete/
//   DELETE /forum/threads/:id/delete/
// Accept-answer / bookmark / report exist in the design but not the
// backend yet — omitted here, tracked as backend follow-ups.

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getThread, getComments, postComment, deleteComment,
  toggleThreadUpvote, toggleCommentUpvote, deleteThread,
} from "../api/forum";
import { useAuth } from "../contexts/AuthContext";
import ForumShell, { GuestBanner, useRequireAuth } from "./ForumShell";
import { fmtNum, fmtAge, initialsOf, avatarGrad, tagColor, titleCase } from "./utils";

function moderationMessage(err) {
  const d = err?.response?.data;
  if (d?.reason) return `Your post was blocked by moderation (${d.category || "policy"}): ${d.reason}`;
  return "Something went wrong posting your reply. Please try again.";
}

export default function ThreadDetailPage() {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const requireAuth = useRequireAuth();

  const [thread, setThread] = useState(null);
  const [comments, setComments] = useState([]);
  const [sort, setSort] = useState("oldest");
  const [loading, setLoading] = useState(true);
  const [upvoted, setUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(0);
  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState(null); // comment being replied to
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const composerRef = useRef(null);

  const myUsername = user?.username;
  const isOwner = !!myUsername && thread?.author_username === myUsername;

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    Promise.all([getThread(threadId), getComments(threadId, { sort })])
      .then(([t, c]) => {
        if (!mounted) return;
        setThread(t);
        setUpvoted(!!t.user_has_upvoted);
        setUpvotes(t.upvote_count ?? 0);
        setComments(c.results || []);
      })
      .catch(() => mounted && setThread(null))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [threadId, sort]);

  const vote = requireAuth(async () => {
    try {
      const res = await toggleThreadUpvote(threadId);
      setUpvoted(res.upvoted);
      setUpvotes(res.upvote_count);
    } catch { /* ignore */ }
  });

  const voteComment = requireAuth(async (id) => {
    try {
      const res = await toggleCommentUpvote(id);
      setComments((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, upvote_count: res.upvote_count, user_has_upvoted: res.upvoted } : c
        )
      );
    } catch { /* ignore */ }
  });

  const submitReply = requireAuth(async () => {
    const content = draft.trim();
    if (!content || posting) return;
    setPosting(true);
    setError("");
    try {
      const created = await postComment(threadId, {
        content,
        reply_to_comment_id: replyTo?.id ?? null,
      });
      setComments((prev) => [...prev, created]);
      setThread((t) => (t ? { ...t, reply_count: (t.reply_count ?? 0) + 1 } : t));
      setDraft("");
      setReplyTo(null);
    } catch (e) {
      setError(moderationMessage(e));
    } finally {
      setPosting(false);
    }
  });

  const removeComment = async (id) => {
    if (!window.confirm("Delete this reply?")) return;
    try {
      await deleteComment(id);
      setComments((prev) => prev.filter((c) => c.id !== id));
      setThread((t) => (t ? { ...t, reply_count: Math.max(0, (t.reply_count ?? 1) - 1) } : t));
    } catch { /* ignore */ }
  };

  const removeThread = async () => {
    if (!window.confirm("Delete this thread and all its replies?")) return;
    try {
      await deleteThread(threadId);
      navigate("/forum");
    } catch { /* ignore */ }
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard unavailable */ }
  };

  const startReplyTo = requireAuth((comment) => {
    setReplyTo(comment);
    composerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    composerRef.current?.querySelector("textarea")?.focus();
  });

  if (loading) {
    return (
      <ForumShell crumb=" / Thread">
        <div className="sfr-loading">Loading thread…</div>
      </ForumShell>
    );
  }
  if (!thread) {
    return (
      <ForumShell crumb=" / Thread">
        <div className="sfr-empty">
          This thread doesn't exist or was removed.{" "}
          <a style={{ color: "#125027", cursor: "pointer" }} onClick={() => navigate("/forum")}>Back to the forum</a>
        </div>
      </ForumShell>
    );
  }

  const byId = Object.fromEntries(comments.map((c) => [c.id, c]));

  return (
    <ForumShell crumb=" / Thread">
      <div className="sfr-view">
        <GuestBanner message="Sign in to reply and upvote." />

        {/* ── detail card ── */}
        <div className="sfr-detail">
          <div style={{ flex: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 5, width: 50 }}>
            <button
              className={`sfr-votebtn${upvoted ? " on" : ""}`}
              onClick={vote}
              title={isAuthenticated ? (upvoted ? "Remove upvote" : "Upvote") : "Sign in to upvote"}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
            </button>
            <div style={{ font: "800 18px 'Montserrat',sans-serif", color: "#125027" }}>{fmtNum(upvotes)}</div>
            <div style={{ font: "600 8.5px 'Poppins',sans-serif", color: "rgba(14,28,15,.4)", textTransform: "uppercase", letterSpacing: ".5px" }}>upvotes</div>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sfr-badgerow" style={{ marginBottom: 10 }}>
              {(thread.tags || []).slice(0, 1).map((name) => {
                const c = tagColor(name);
                return (
                  <span key={name} className="sfr-badge" style={{ color: c.color, background: c.tint }}>
                    {titleCase(name)}
                  </span>
                );
              })}
            </div>
            <h1 className="sfr-detail-title">{thread.title}</h1>

            <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "14px 0 16px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span className="sfr-avatar" style={{ width: 34, height: 34, font: "700 12px 'Montserrat',sans-serif", background: avatarGrad(thread.author_username) }}>
                  {initialsOf(thread.author_username)}
                </span>
                <div>
                  <div className="sfr-reply-name">
                    {thread.author_username}
                    {isOwner && (
                      <span style={{ font: "600 9px 'Poppins',sans-serif", color: "#125027", background: "rgba(18,80,39,.08)", padding: "1px 7px", borderRadius: 100, marginLeft: 6 }}>
                        You · OP
                      </span>
                    )}
                  </div>
                  <div className="sfr-reply-time">asked {fmtAge(thread.created_at)}</div>
                </div>
              </div>
              <div style={{ height: 26, width: 1, background: "rgba(9,62,5,.12)" }} />
              <div style={{ font: "500 11.5px 'Poppins',sans-serif", color: "rgba(14,28,15,.5)" }}>
                {fmtNum(thread.reply_count ?? comments.length)} replies
              </div>
            </div>

            {thread.body && <div className="sfr-detail-body">{thread.body}</div>}

            {(thread.tags || []).length > 0 && (
              <div style={{ display: "flex", gap: 7, marginTop: 16, flexWrap: "wrap" }}>
                {thread.tags.map((name) => (
                  <span key={name} className="sfr-tagpill">#{name}</span>
                ))}
              </div>
            )}

            <div className="sfr-actionrow">
              <button className="sfr-btn-primary" onClick={requireAuth(() => startReplyTo(null))}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                Reply
              </button>
              <button className="sfr-actionbtn" onClick={share}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5 8.6 10.5" /></svg>
                {copied ? "Link copied" : "Share"}
              </button>
              {isOwner && (
                <button className="sfr-actionbtn danger" onClick={removeThread}>
                  Delete thread
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── replies ── */}
        <div className="sfr-h2row" style={{ margin: "24px 2px 8px" }}>
          <h2 className="sfr-h2" style={{ fontSize: 16 }}>
            {fmtNum(comments.length)} {comments.length === 1 ? "Reply" : "Replies"}
          </h2>
          <div className="sfr-chips">
            {[["oldest", "Oldest first"], ["newest", "Newest first"]].map(([k, label]) => (
              <button key={k} className={`sfr-chip${sort === k ? " active" : ""}`} onClick={() => setSort(k)}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {comments.length === 0 && (
          <div className="sfr-empty">No replies yet — be the first to answer.</div>
        )}

        <div className="sfr-replies">
          {comments.map((c) => {
            const parent = c.reply_to_comment_id ? byId[c.reply_to_comment_id] : null;
            const mine = myUsername && c.author_username === myUsername;
            return (
              <div key={c.id} className={`sfr-replycard${parent ? " nested" : ""}`}>
                {parent && (
                  <div className="sfr-replyto">↩ replying to {parent.author_username}</div>
                )}
                <div className="sfr-reply-head">
                  <span className="sfr-avatar" style={{ width: 28, height: 28, background: avatarGrad(c.author_username) }}>
                    {initialsOf(c.author_username)}
                  </span>
                  <span className="sfr-reply-name">{c.author_username}</span>
                  <span className="sfr-reply-time">{fmtAge(c.created_at)}</span>
                </div>
                <div className="sfr-reply-body">{c.content}</div>
                <div className="sfr-reply-foot">
                  <button
                    className={`sfr-minibtn${c.user_has_upvoted ? " on" : ""}`}
                    onClick={() => voteComment(c.id)}
                  >
                    ▲ {fmtNum(c.upvote_count ?? 0)}
                  </button>
                  <button className="sfr-minibtn" onClick={() => startReplyTo(c)}>Reply</button>
                  {mine && (
                    <button className="sfr-minibtn danger" onClick={() => removeComment(c.id)}>Delete</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── composer ── */}
        {isAuthenticated && (
          <div className="sfr-panel" style={{ marginTop: 18 }} ref={composerRef}>
            {error && <div className="sfr-errbanner">{error}</div>}
            <label className="sfr-label">
              {replyTo ? (
                <>
                  Replying to <span style={{ color: "#1b9c85" }}>{replyTo.author_username}</span>{" "}
                  <button className="sfr-minibtn" style={{ marginLeft: 8 }} onClick={() => setReplyTo(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                "Your reply"
              )}
            </label>
            <textarea
              className="sfr-textarea"
              placeholder="Be specific and kind — replies pass the same moderation gate as chat."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
              <button className="sfr-btn-primary" onClick={submitReply} disabled={posting || !draft.trim()}>
                {posting ? "Posting…" : "Post reply"}
              </button>
            </div>
          </div>
        )}
      </div>
    </ForumShell>
  );
}
