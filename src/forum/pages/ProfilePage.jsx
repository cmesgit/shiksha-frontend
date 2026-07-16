import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useForum } from "../ForumContext";
import { getForumProfile, getThreads, getUserReplies, getSaved } from "../../api/forum";
import Avatar from "../components/Avatar";
import QuestionCard from "../components/QuestionCard";
import EditProfileModal from "../components/EditProfileModal";
import { fmtNum, timeAgo } from "../utils";

const TABS = [["questions", "Questions"], ["posts", "Posts"], ["answers", "Answers"], ["saved", "Saved"]];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { me, refreshMe } = useForum();
  const username = user?.username;
  const [profile, setProfile] = useState(null);
  const [tab, setTab] = useState("questions");
  const [items, setItems] = useState([]);
  const [replies, setReplies] = useState([]);
  const [editing, setEditing] = useState(false);

  const loadProfile = useCallback(() => {
    if (username) getForumProfile(username).then(setProfile).catch(() => {});
  }, [username]);
  useEffect(() => { loadProfile(); }, [loadProfile]);

  useEffect(() => {
    if (!username) return;
    setItems([]); setReplies([]);
    if (tab === "questions") getThreads({ author: username, kind: "question" }).then((d) => setItems(d.results || [])).catch(() => {});
    else if (tab === "posts") getThreads({ author: username, kind: "post" }).then((d) => setItems(d.results || [])).catch(() => {});
    else if (tab === "answers") getUserReplies(username).then((d) => setReplies(d.results || [])).catch(() => {});
    else if (tab === "saved") getSaved().then((d) => setItems(d.results || [])).catch(() => {});
  }, [tab, username]);

  if (!username) return <div className="fm-empty"><h4>Sign in to view your profile</h4></div>;
  const p = profile || {};
  const name = p.display_name || me?.display_name || username;

  return (
    <div>
      <div className="fm-profile-banner">
        <div className="fm-row" style={{ justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div className="fm-row">
            <Avatar name={name} initials={p.initials || me?.initials} color={p.color || me?.color} url={p.avatar_url || me?.avatar_url} size={64} />
            <div>
              <h1 className="fm-h1" style={{ fontSize: 20, margin: 0 }}>{name}</h1>
              <div className="fm-meta-sub">{p.headline || me?.credential}{p.location ? ` · ${p.location}` : ""}</div>
              {p.joined_at ? <div className="fm-meta-sub">Joined {new Date(p.joined_at).toLocaleDateString(undefined, { month: "short", year: "numeric" })}</div> : null}
            </div>
          </div>
          <button className="fm-btn ghost sm" onClick={() => setEditing(true)}>Edit profile</button>
        </div>
        {p.bio ? <p className="fm-sub" style={{ marginTop: 12, marginBottom: 0 }}>{p.bio}</p> : null}
        <div className="fm-stats">
          <div className="fm-stat"><div className="num">{fmtNum(p.thread_count)}</div><div className="lab">Threads</div></div>
          <div className="fm-stat"><div className="num">{fmtNum(p.reply_count)}</div><div className="lab">Answers</div></div>
          <div className="fm-stat"><div className="num">{fmtNum(p.upvotes_received)}</div><div className="lab">Upvotes</div></div>
        </div>
      </div>

      <div className="fm-tabs">
        {TABS.map(([id, label]) => (
          <button key={id} className={`fm-tab${tab === id ? " active" : ""}`} onClick={() => setTab(id)}>{label}</button>
        ))}
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

      {editing ? (
        <EditProfileModal
          initial={{ display_name: p.display_name, headline: p.headline, location: p.location, bio: p.bio }}
          onClose={() => setEditing(false)}
          onSaved={() => { setEditing(false); loadProfile(); refreshMe && refreshMe(); }}
        />
      ) : null}
    </div>
  );
}
