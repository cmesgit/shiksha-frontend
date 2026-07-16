import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getForumProfile, getThreads, getUserReplies } from "../../api/forum";
import Avatar from "../components/Avatar";
import QuestionCard from "../components/QuestionCard";
import { fmtNum, timeAgo } from "../utils";

const TABS = [["answers", "Answers"], ["questions", "Questions"], ["posts", "Posts"]];

export default function UserProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
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

  if (!profile) return <div className="fm-loading">Loading…</div>;
  const name = profile.display_name || username;

  return (
    <div>
      <div className="fm-profile-banner">
        <div className="fm-row">
          <Avatar name={name} initials={profile.initials} color={profile.color} url={profile.avatar_url} size={64} />
          <div>
            <h1 className="fm-h1" style={{ fontSize: 20, margin: 0 }}>{name}</h1>
            <div className="fm-meta-sub">{profile.headline}{profile.location ? ` · ${profile.location}` : ""}</div>
          </div>
        </div>
        {profile.bio ? <p className="fm-sub" style={{ marginTop: 12, marginBottom: 0 }}>{profile.bio}</p> : null}
        <div className="fm-stats">
          <div className="fm-stat"><div className="num">{fmtNum(profile.thread_count)}</div><div className="lab">Threads</div></div>
          <div className="fm-stat"><div className="num">{fmtNum(profile.reply_count)}</div><div className="lab">Answers</div></div>
          <div className="fm-stat"><div className="num">{fmtNum(profile.upvotes_received)}</div><div className="lab">Upvotes</div></div>
        </div>
      </div>

      <div className="fm-tabs">
        {TABS.map(([id, label]) => <button key={id} className={`fm-tab${tab === id ? " active" : ""}`} onClick={() => setTab(id)}>{label}</button>)}
      </div>

      {tab === "answers" ? (
        replies.length === 0 ? <div className="fm-empty"><h4>No answers yet</h4></div> :
        replies.map((r) => (
          <div key={r.id} className="fm-card" style={{ cursor: "pointer" }} onClick={() => navigate(`/forum/thread/${r.thread_id}`)}>
            <div className="fm-meta-sub">on “{r.thread_title}” · {timeAgo(r.created_at)}</div>
            <div className="fm-answer-body" style={{ margin: "6px 0 0" }}>{r.content}</div>
          </div>
        ))
      ) : (
        items.length === 0 ? <div className="fm-empty"><h4>Nothing here yet</h4></div> :
        items.map((q) => <QuestionCard key={q.id} q={q} />)
      )}
    </div>
  );
}
