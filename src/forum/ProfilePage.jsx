// PLACEMENT: src/forum/ProfilePage.jsx   (REPLACE THE WHOLE FILE — landing/frontend app)
//
// A lightweight public forum profile at /forum/u/:username — banner with
// avatar, member-since date, bio, and stats (threads / replies / upvotes
// received), then a Threads/Replies tab. The owner can edit their own bio
// inline. Everything here is backed by real endpoints:
//   GET   /forum/users/:username/            (stats + bio, computed on read)
//   GET   /forum/users/:username/replies/     (the person's replies, with
//                                              parent thread id + title)
//   PATCH /forum/profile/                    (update own bio)
//   GET   /forum/threads/?author=&page=&page_size=

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getForumProfile, updateForumProfile, getThreads, getUserReplies } from "../api/forum";
import ForumShell from "./ForumShell";
import ThreadCard from "./ThreadCard";
import { fmtNum, fmtAge, fmtDate, initialsOf, avatarGrad } from "./utils";

const PAGE_SIZE = 10;
const MAX_BIO = 280;

function ReplyPreviewCard({ reply, onOpen }) {
  return (
    <button
      className="sfr-replycard sfr-reset"
      style={{ display: "block", width: "100%", textAlign: "left" }}
      onClick={() => onOpen(reply.thread_id)}
    >
      <div className="sfr-reply-head" style={{ justifyContent: "space-between" }}>
        <span className="sfr-reply-time">{fmtAge(reply.created_at)}</span>
        {reply.is_accepted && <span className="sfr-solvedpill">✓ Accepted</span>}
      </div>
      <div style={{ font: "700 12.5px 'Poppins',sans-serif", color: "#125027", margin: "2px 0 8px" }}>
        Re: {reply.thread_title}
      </div>
      <div className="sfr-reply-body">{reply.content}</div>
      <div className="sfr-reply-foot">
        <span className="sfr-minibtn" style={{ cursor: "default" }}>▲ {fmtNum(reply.upvote_count ?? 0)}</span>
      </div>
    </button>
  );
}

export default function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null); // null = loading, false = not found
  const [tab, setTab] = useState("threads");

  const [threads, setThreads] = useState([]);
  const [threadCount, setThreadCount] = useState(0);
  const [threadPage, setThreadPage] = useState(1);
  const [threadsLoading, setThreadsLoading] = useState(true);

  const [replies, setReplies] = useState([]);
  const [replyCount, setReplyCount] = useState(0);
  const [replyPage, setReplyPage] = useState(1);
  const [repliesLoading, setRepliesLoading] = useState(true);

  const [editing, setEditing] = useState(false);
  const [bioDraft, setBioDraft] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    setProfile(null);
    setTab("threads");
    setThreadPage(1);
    setReplyPage(1);
    getForumProfile(username)
      .then((p) => { if (mounted) { setProfile(p); setBioDraft(p.bio || ""); } })
      .catch(() => mounted && setProfile(false));
    return () => { mounted = false; };
  }, [username]);

  useEffect(() => {
    if (tab !== "threads") return;
    let mounted = true;
    setThreadsLoading(true);
    getThreads({ author: username, page: threadPage, page_size: PAGE_SIZE, sort: "newest" })
      .then((data) => {
        if (!mounted) return;
        setThreads(data.results || []);
        setThreadCount(data.count || 0);
      })
      .catch(() => mounted && setThreads([]))
      .finally(() => mounted && setThreadsLoading(false));
    return () => { mounted = false; };
  }, [username, tab, threadPage]);

  useEffect(() => {
    if (tab !== "replies") return;
    let mounted = true;
    setRepliesLoading(true);
    getUserReplies(username, { page: replyPage, page_size: PAGE_SIZE })
      .then((data) => {
        if (!mounted) return;
        setReplies(data.results || []);
        setReplyCount(data.count || 0);
      })
      .catch(() => mounted && setReplies([]))
      .finally(() => mounted && setRepliesLoading(false));
    return () => { mounted = false; };
  }, [username, tab, replyPage]);

  const saveBio = async () => {
    setSaving(true);
    try {
      const res = await updateForumProfile({ bio: bioDraft.trim() });
      setProfile((p) => (p ? { ...p, bio: res.bio } : p));
      setEditing(false);
    } catch { /* ignore */ }
    finally { setSaving(false); }
  };

  if (profile === null) {
    return (
      <ForumShell crumb=" / Profile">
        <div className="sfr-loading">Loading profile…</div>
      </ForumShell>
    );
  }
  if (profile === false) {
    return (
      <ForumShell crumb=" / Profile">
        <div className="sfr-empty">
          This person hasn't posted on the forum yet.{" "}
          <a style={{ color: "#125027", cursor: "pointer" }} onClick={() => navigate("/forum")}>Back to the forum</a>
        </div>
      </ForumShell>
    );
  }

  const threadPageCount = Math.max(1, Math.ceil(threadCount / PAGE_SIZE));
  const replyPageCount = Math.max(1, Math.ceil(replyCount / PAGE_SIZE));

  return (
    <ForumShell crumb={` / u/${profile.username}`}>
      <div className="sfr-view">
        <div className="sfr-profile-banner">
          <span className="sfr-avatar" style={{ background: avatarGrad(profile.username) }}>
            {initialsOf(profile.username)}
          </span>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h1>{profile.username}</h1>
            <div className="joined">Member since {fmtDate(profile.joined_at)}</div>

            {editing ? (
              <div>
                <textarea
                  className="sfr-bio-editor"
                  value={bioDraft}
                  maxLength={MAX_BIO}
                  placeholder="Add a short bio — what you study, what you help with…"
                  onChange={(e) => setBioDraft(e.target.value)}
                />
                <div className="sfr-bio-count">{bioDraft.length} / {MAX_BIO}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button
                    className="sfr-profile-editbtn"
                    style={{ marginLeft: 0 }}
                    disabled={saving}
                    onClick={saveBio}
                  >
                    {saving ? "Saving…" : "Save bio"}
                  </button>
                  <button
                    className="sfr-actionbtn"
                    style={{ background: "transparent", borderColor: "rgba(255,255,255,.3)", color: "#fff" }}
                    onClick={() => { setEditing(false); setBioDraft(profile.bio || ""); }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              profile.bio && <div className="sfr-profile-bio">{profile.bio}</div>
            )}

            <div className="sfr-profile-stats">
              <div><b>{fmtNum(profile.thread_count)}</b><span>Threads</span></div>
              <div><b>{fmtNum(profile.reply_count)}</b><span>Replies</span></div>
              <div><b>{fmtNum(profile.upvotes_received)}</b><span>Upvotes received</span></div>
            </div>
          </div>

          {profile.is_self && !editing && (
            <button className="sfr-profile-editbtn" onClick={() => setEditing(true)}>
              {profile.bio ? "Edit bio" : "Add a bio"}
            </button>
          )}
        </div>

        <div className="sfr-chips" style={{ marginBottom: 18 }}>
          <button className={`sfr-chip${tab === "threads" ? " active" : ""}`} onClick={() => setTab("threads")}>
            Threads ({fmtNum(profile.thread_count)})
          </button>
          <button className={`sfr-chip${tab === "replies" ? " active" : ""}`} onClick={() => setTab("replies")}>
            Replies ({fmtNum(profile.reply_count)})
          </button>
        </div>

        {tab === "threads" ? (
          <>
            {threadsLoading ? (
              <div className="sfr-loading">Loading threads…</div>
            ) : threads.length === 0 ? (
              <div className="sfr-empty">
                {profile.is_self ? "You haven't started a thread yet." : `${profile.username} hasn't started any threads yet.`}
              </div>
            ) : (
              <div className="sfr-feed">
                {threads.map((t) => <ThreadCard key={t.id} thread={t} />)}
              </div>
            )}
            {threadPageCount > 1 && (
              <div className="sfr-pager">
                <button className="sfr-pagebtn" disabled={threadPage === 1} onClick={() => setThreadPage((p) => p - 1)}>‹</button>
                <span className="sfr-pagedots">{threadPage} / {threadPageCount}</span>
                <button className="sfr-pagebtn" disabled={threadPage === threadPageCount} onClick={() => setThreadPage((p) => p + 1)}>›</button>
              </div>
            )}
          </>
        ) : (
          <>
            {repliesLoading ? (
              <div className="sfr-loading">Loading replies…</div>
            ) : replies.length === 0 ? (
              <div className="sfr-empty">
                {profile.is_self ? "You haven't replied to anything yet." : `${profile.username} hasn't replied to anything yet.`}
              </div>
            ) : (
              <div className="sfr-feed">
                {replies.map((r) => (
                  <ReplyPreviewCard key={r.id} reply={r} onOpen={(threadId) => navigate(`/forum/${threadId}`)} />
                ))}
              </div>
            )}
            {replyPageCount > 1 && (
              <div className="sfr-pager">
                <button className="sfr-pagebtn" disabled={replyPage === 1} onClick={() => setReplyPage((p) => p - 1)}>‹</button>
                <span className="sfr-pagedots">{replyPage} / {replyPageCount}</span>
                <button className="sfr-pagebtn" disabled={replyPage === replyPageCount} onClick={() => setReplyPage((p) => p + 1)}>›</button>
              </div>
            )}
          </>
        )}
      </div>
    </ForumShell>
  );
}
