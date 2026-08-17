import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getForumProfile, getThreads, getUserReplies } from "../../api/forum";
import { useForum } from "../ForumContext";
import QuestionCard from "../components/QuestionCard";
import { fmtNum, timeAgo } from "../utils";

const TABS = [["answers", "Answers"], ["questions", "Questions"], ["posts", "Posts"]];

export default function UserProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isFollowingUser, toggleFollowUser } = useForum();
  const [profile, setProfile] = useState(null);
  const [tab, setTab] = useState("answers");
  const [items, setItems] = useState([]);
  const [replies, setReplies] = useState([]);

  const load = useCallback(() => { getForumProfile(username).then(setProfile).catch(() => setProfile(null)); }, [username]);
  useEffect(() => { load(); }, [load]);

  // Redirect to own editable profile.
  useEffect(() => { if (user?.username && user.username === username) navigate("/forum/profile", { replace: true }); }, [user, username, navigate]);

  useEffect(() => {
    setItems([]); setReplies([]);
    if (tab === "answers") getUserReplies(username).then((d) => setReplies(d.results || [])).catch(() => {});
    else getThreads({ author: username, kind: tab === "posts" ? "post" : "question" }).then((d) => setItems(d.results || [])).catch(() => {});
  }, [tab, username]);

  if (!profile) return <div className="fm2-empty-card">Loading…</div>;
  const name = profile.display_name || username;
  const following = isFollowingUser(username);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
      <div className="fm2-profile-banner">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="fm2-avatar-sm" style={{ width: 64, height: 64, background: "rgba(255,255,255,.18)", fontSize: 20 }}>{profile.initials}</div>
            <div>
              <h1 className="fm2-h1" style={{ fontSize: 20, margin: 0 }}>{name}</h1>
              <div className="fm2-sub" style={{ margin: 0 }}>{profile.headline}{profile.location ? ` · ${profile.location}` : ""}</div>
            </div>
          </div>
          <button
            className="fm2-btn-outline"
            style={{ padding: "8px 16px", background: following ? "rgba(255,255,255,.26)" : "rgba(255,255,255,.14)", color: "#fff", borderColor: "rgba(255,255,255,.3)" }}
            onClick={() => toggleFollowUser(username)}
          >
            {following ? "✓ Following" : "Follow"}
          </button>
        </div>
        {profile.bio ? <p className="fm2-sub" style={{ marginTop: 12, marginBottom: 0 }}>{profile.bio}</p> : null}
        <div className="fm2-stats">
          <div className="fm2-stat"><div className="num">{fmtNum(profile.thread_count)}</div><div className="lab">Threads</div></div>
          <div className="fm2-stat"><div className="num">{fmtNum(profile.reply_count)}</div><div className="lab">Answers</div></div>
          <div className="fm2-stat"><div className="num">{fmtNum(profile.upvotes_received)}</div><div className="lab">Upvotes</div></div>
        </div>
      </div>

      <div className="fm2-tabline">
        {TABS.map(([id, label]) => <button key={id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}>{label}</button>)}
      </div>

      {tab === "answers" ? (
        replies.length === 0 ? <div className="fm2-empty-card">No answers yet.</div> :
        replies.map((r) => (
          <div key={r.id} className="fm2-card" style={{ padding: "14px 16px", cursor: "pointer" }} onClick={() => navigate(`/forum/thread/${r.thread_id}`)}>
            <div style={{ font: "400 11.5px Poppins,sans-serif", color: "#8a9e82" }}>on “{r.thread_title}” · {timeAgo(r.created_at)}</div>
            <div style={{ font: "400 13.5px/1.7 Poppins,sans-serif", color: "#2b3a2b", margin: "6px 0 0" }}>{r.content}</div>
          </div>
        ))
      ) : (
        items.length === 0 ? <div className="fm2-empty-card">Nothing here yet.</div> :
        <div className="fm2-feed-scroll">{items.map((q) => <QuestionCard key={q.id} q={q} />)}</div>
      )}
    </div>
  );
}
