import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useForum } from "../ForumContext";
import { getForumProfile, getThreads, getUserReplies, getSaved } from "../../api/forum";
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

  if (!username) return <div className="fm2-empty-card">Sign in to view your profile.</div>;
  const p = profile || {};
  const name = p.display_name || me?.display_name || username;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
      <div className="fm2-profile-banner">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="fm2-avatar-sm" style={{ width: 64, height: 64, background: "rgba(255,255,255,.18)", fontSize: 20 }}>{p.initials || me?.initials}</div>
            <div>
              <h1 className="fm2-h1" style={{ fontSize: 20, margin: 0 }}>{name}</h1>
              <div className="fm2-sub" style={{ margin: 0 }}>{p.headline || me?.credential}{p.location ? ` · ${p.location}` : ""}</div>
              {p.joined_at ? <div className="fm2-sub" style={{ margin: 0 }}>Joined {new Date(p.joined_at).toLocaleDateString(undefined, { month: "short", year: "numeric" })}</div> : null}
            </div>
          </div>
          <button className="fm2-btn-outline" style={{ padding: "8px 16px", background: "rgba(255,255,255,.14)", color: "#fff", borderColor: "rgba(255,255,255,.3)" }} onClick={() => setEditing(true)}>Edit profile</button>
        </div>
        {p.bio ? <p className="fm2-sub" style={{ marginTop: 12, marginBottom: 0 }}>{p.bio}</p> : null}
        <div className="fm2-stats">
          <div className="fm2-stat"><div className="num">{fmtNum(p.thread_count)}</div><div className="lab">Threads</div></div>
          <div className="fm2-stat"><div className="num">{fmtNum(p.reply_count)}</div><div className="lab">Answers</div></div>
          <div className="fm2-stat"><div className="num">{fmtNum(p.upvotes_received)}</div><div className="lab">Upvotes</div></div>
        </div>
      </div>

      <div className="fm2-tabline">
        {TABS.map(([id, label]) => (
          <button key={id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}>{label}</button>
        ))}
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
