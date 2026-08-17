import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useForum } from "../ForumContext";
import { getForumProfile, getThreads, getUserReplies, getSaved } from "../../api/forum";
import QuestionCard from "../components/QuestionCard";
import EditProfileModal from "../components/EditProfileModal";
import { fmtNum, timeAgo } from "../utils";

const TABS = [["questions", "Questions"], ["posts", "Posts"], ["answers", "Answers"], ["saved", "Saved"], ["following", "Following"]];
const TAB_IDS = TABS.map(([id]) => id);

export default function ProfilePage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { user } = useAuth();
  const { me, refreshMe, toggleFollowSpace, toggleFollowCategory, toggleFollowQuestion, toggleFollowUser } = useForum();
  const username = user?.username;
  const [profile, setProfile] = useState(null);
  // Deep-linkable tab via ?tab= so links like /forum/profile?tab=following
  // land on the right section instead of the default Questions tab.
  const paramTab = params.get("tab");
  const [tab, setTab] = useState(TAB_IDS.includes(paramTab) ? paramTab : "questions");
  const [items, setItems] = useState([]);
  const [replies, setReplies] = useState([]);
  const [editing, setEditing] = useState(false);

  const loadProfile = useCallback(() => {
    if (username) getForumProfile(username).then(setProfile).catch(() => {});
  }, [username]);
  useEffect(() => { loadProfile(); }, [loadProfile]);

  // Keep the active tab in sync when the URL ?tab= changes (e.g. the sidebar
  // "Following" link is clicked while already on this page).
  useEffect(() => {
    if (TAB_IDS.includes(paramTab) && paramTab !== tab) setTab(paramTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramTab]);

  const selectTab = useCallback((id) => {
    setTab(id);
    const next = new URLSearchParams(params);
    if (id === "questions") next.delete("tab"); else next.set("tab", id);
    setParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // The Following tab renders from the once-hydrated me.following snapshot;
  // re-fetch it whenever that tab becomes active so follows/unfollows made on
  // other pages are reflected live instead of showing a stale cache.
  useEffect(() => {
    if (tab === "following") refreshMe && refreshMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

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
          <button key={id} className={tab === id ? "on" : ""} onClick={() => selectTab(id)}>{label}</button>
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
      ) : tab === "following" ? (
        <FollowingTab
          following={me?.following || { spaces: [], categories: [], questions: [], users: [] }}
          navigate={navigate}
          onUnfollowSpace={async (slug) => { await toggleFollowSpace(slug); refreshMe && refreshMe(); }}
          onUnfollowCategory={async (id) => { await toggleFollowCategory(id); refreshMe && refreshMe(); }}
          onUnfollowQuestion={async (id) => { await toggleFollowQuestion(id); refreshMe && refreshMe(); }}
          onUnfollowUser={async (uname) => { await toggleFollowUser(uname); refreshMe && refreshMe(); }}
        />
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

// A safe unfollow affordance: reads as a passive "Following" status by
// default and only reveals the destructive red "Unfollow" label on
// hover/focus, so an accidental click on the status pill can't silently
// unfollow (the intent is unambiguous before the click commits).
function FollowPill({ onUnfollow }) {
  return (
    <button className="fm2-follow-pill" onClick={onUnfollow} title="Unfollow" aria-label="Unfollow">
      <span className="f">✓ Following</span>
      <span className="u">Unfollow</span>
    </button>
  );
}

// Defensive field extraction: following.categories/questions may arrive as
// bare ids/slugs (legacy) OR as full objects ({id, slug, name/title}) as the
// backend payload is extended. Prefer the richest available field and never
// render worse than the previous "Category #id" placeholder.
const rawId = (x) => (x && typeof x === "object" ? (x.id ?? x.slug ?? "") : x);
const linkKey = (x) => (x && typeof x === "object" ? (x.slug ?? x.id ?? "") : x);

// Four followed-item sub-sections sourced from /forum/me's `following` object.
// Users are already resolved author-badge objects (avatar); the others link to
// their real space/category/thread page.
function FollowingTab({ following, navigate, onUnfollowSpace, onUnfollowCategory, onUnfollowQuestion, onUnfollowUser }) {
  const spaces = following.spaces || [];
  const categories = following.categories || [];
  const questions = following.questions || [];
  const users = following.users || [];

  if (!spaces.length && !categories.length && !questions.length && !users.length) {
    return <div className="fm2-empty-card">You're not following anything yet.</div>;
  }

  const row = (key, label, onClick, onUnfollow) => (
    <div key={key} className="fm2-card" style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
      <span onClick={onClick} style={{ font: "700 13px Poppins,sans-serif", color: "#125027", cursor: onClick ? "pointer" : "default" }}>{label}</span>
      <FollowPill onUnfollow={onUnfollow} />
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div>
        <div className="fm2-section-hd">Spaces ({spaces.length})</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
          {spaces.length === 0 ? <div className="fm2-sub">No followed spaces.</div> :
            spaces.map((s) => {
              const slug = linkKey(s);
              const label = (s && typeof s === "object" ? (s.name ?? s.title ?? s.slug) : s) || slug;
              return row(`space-${slug}`, label, () => navigate(`/forum/space/${slug}`), () => onUnfollowSpace(slug));
            })}
        </div>
      </div>
      <div>
        <div className="fm2-section-hd">Categories ({categories.length})</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
          {categories.length === 0 ? <div className="fm2-sub">No followed categories.</div> :
            categories.map((c) => {
              const id = rawId(c);
              const label = (c && typeof c === "object" ? (c.name ?? c.title) : null) || `Category #${id}`;
              return row(`cat-${id}`, label, () => navigate(`/forum/category/${linkKey(c)}`), () => onUnfollowCategory(id));
            })}
        </div>
      </div>
      <div>
        <div className="fm2-section-hd">Questions ({questions.length})</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
          {questions.length === 0 ? <div className="fm2-sub">No followed questions.</div> :
            questions.map((q) => {
              const id = rawId(q);
              const label = (q && typeof q === "object" ? (q.title ?? q.name) : null) || `Question #${id}`;
              return row(`q-${id}`, label, () => navigate(`/forum/thread/${id}`), () => onUnfollowQuestion(id));
            })}
        </div>
      </div>
      <div>
        <div className="fm2-section-hd">People ({users.length})</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
          {users.length === 0 ? <div className="fm2-sub">No followed people.</div> :
            users.map((u) => (
              <div key={`u-${u.username}`} className="fm2-card" style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => navigate(`/forum/u/${u.username}`)}>
                  <div className="fm2-avatar-sm" style={{ width: 32, height: 32, background: u.color || "#125027", fontSize: 13 }}>{u.initials}</div>
                  <span style={{ font: "700 13px Poppins,sans-serif", color: "#125027" }}>{u.display_name || u.username}</span>
                </div>
                <FollowPill onUnfollow={() => onUnfollowUser(u.username)} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
