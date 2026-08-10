import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard } from "../../api/forum";
import { useForum } from "../ForumContext";
import { useAuth } from "../../contexts/AuthContext";
import { timeAgo, initialsOf, colorFor } from "../utils";

/* User Dashboard — ported from Forum Dashboard.html (fd-* design).
   A bespoke two-column page (own sidebar + content) rendered full-width by
   ForumLayout: profile card, sub-nav, quick links, four stat cards, recent
   activity + notifications, a 7-day engagement chart and a saved preview,
   all backed by the /forum/dashboard/ aggregate endpoint. Guests get a
   sign-in prompt. The shared site navbar (top) is kept as-is. */

const ICONS = {
  question: <><circle cx="11" cy="11" r="8" /><path d="M11 8v6M8 11h6" /></>,
  answer: <><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></>,
  post: <><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" /><path d="M16 6l-4-4-4 4M12 2v13" /></>,
  bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
  save: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
};

function Ic({ name, color, size = 16, sw = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

// Card style palette per stat, matching the design's coloured chips.
const TONES = {
  green: { fg: "#125027", bg: "#e4f3e8" },
  blue: { fg: "#1b4cc0", bg: "#e8f0fc" },
  orange: { fg: "#e07900", bg: "#fff8e8" },
  purple: { fg: "#6b58d3", bg: "#f3e8fc" },
};

function StatCard({ icon, tone, value, label, badge }) {
  const t = TONES[tone];
  return (
    <div className="fm2-card fm2-statcard">
      <div className="fm2-statcard-top">
        <div className="fm2-statcard-ic" style={{ background: t.bg }}>
          <Ic name={icon} color={t.fg} />
        </div>
        {badge && <span className="fm2-statcard-badge" style={{ color: t.fg, background: t.bg }}>{badge}</span>}
      </div>
      <div className="fm2-statcard-n">{value ?? 0}</div>
      <div className="fm2-statcard-l">{label}</div>
    </div>
  );
}

// Icon box colour per activity type.
const ACT_TONE = { question: "green", answer: "blue", post: "orange" };
const ACT_VERB = { question: "Question asked", answer: "Answer given", post: "Post shared" };

export default function DashboardPage() {
  const navigate = useNavigate();
  const { me } = useForum();
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) { setLoading(false); return; }
    getDashboard().then(setData).catch(() => setError(true)).finally(() => setLoading(false));
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="fm2-card" style={{ padding: "48px 24px", textAlign: "center", maxWidth: 460, margin: "0 auto" }}>
        <div style={{ font: "800 16px Montserrat,sans-serif", color: "#125027", marginBottom: 8 }}>Your forum dashboard</div>
        <p style={{ font: "400 13px Poppins,sans-serif", color: "#8a9e82", marginBottom: 16 }}>Sign in to see your activity, notifications and saved discussions.</p>
        <button className="fm2-btn-outline" onClick={() => navigate(`/login?next=${encodeURIComponent("/forum/dashboard")}`)} style={{ padding: "10px 24px", borderRadius: 50 }}>Sign in</button>
      </div>
    );
  }

  if (loading) return <div className="fm2-empty-card">Loading your dashboard…</div>;
  if (error || !data) return <div className="fm2-empty-card">Couldn’t load your dashboard. Please try again.</div>;

  const s = data.stats || {};
  const activity = data.recent_activity || [];
  const notifs = data.notifications_preview || [];
  const saved = data.saved_preview || [];
  const engagement = data.engagement || [];
  const maxUp = Math.max(1, ...engagement.map((e) => e.upvotes || 0));
  const unread = s.unread_notifications || 0;

  const name = me?.display_name || "You";
  const avColor = me?.color || colorFor(me?.username || name);
  const avInitials = me?.initials || initialsOf(name);

  // Honest trend pills — show a weekly delta only when the backend supplies it.
  const weekBadge = (n) => (n > 0 ? `+${n} this week` : "All time");

  const subNav = [
    { label: "Overview", active: true },
    { label: "My Activity", to: "/forum/profile" },
    { label: "Notifications", to: "/forum/notifications" },
    { label: "Saved", to: "/forum/saved" },
  ];
  const quickLinks = [
    { label: "Forum Home", to: "/forum" },
    { label: "Browse Categories", to: "/forum/categories" },
    { label: "Community Spaces", to: "/forum/spaces" },
    { label: "Answer Queue", to: "/forum/answer-queue" },
  ];

  return (
    <div className="fm2-dash-layout">
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside className="fm2-dash-side">
        <div className="fm2-card" style={{ padding: "18px 16px", textAlign: "center" }}>
          <div className="fm2-dprofile-av" style={{ background: avColor }}>{avInitials}</div>
          <div style={{ font: "800 15px Montserrat,sans-serif", color: "#18261a", marginBottom: 3 }}>{name}</div>
          <div style={{ font: "400 12px Poppins,sans-serif", color: "#8a9e82", marginBottom: 14 }}>{me?.credential || "Member · ShikshaCom"}</div>
          <div className="fm2-dstat-row">
            <div className="fm2-dstat"><span className="fm2-dstat-n">{s.questions_asked ?? 0}</span><span className="fm2-dstat-l">Asked</span></div>
            <div className="fm2-dstat"><span className="fm2-dstat-n">{s.answers_given ?? 0}</span><span className="fm2-dstat-l">Answered</span></div>
          </div>
        </div>

        <div className="fm2-card" style={{ padding: 11 }}>
          <div className="fm2-section-hd">Dashboard</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {subNav.map((n) => (
              <button key={n.label} className={`fm2-dnav${n.active ? " active" : ""}`} onClick={() => n.to && navigate(n.to)}>{n.label}</button>
            ))}
          </div>
        </div>

        <div className="fm2-card" style={{ padding: 11 }}>
          <div className="fm2-section-hd">Quick Links</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {quickLinks.map((l) => (
              <button key={l.label} className="fm2-btn-ghost" style={{ width: "100%", justifyContent: "flex-start", fontSize: 12.5 }} onClick={() => navigate(l.to)}>{l.label}</button>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Main content ────────────────────────────────────── */}
      <div className="fm2-dash-main">
        {/* Stat cards */}
        <div className="fm2-stat-grid">
          <StatCard icon="question" tone="green" value={s.questions_asked} label="Questions Asked" badge={weekBadge(s.questions_this_week)} />
          <StatCard icon="answer" tone="blue" value={s.answers_given} label="Answers Given" badge={weekBadge(s.answers_this_week)} />
          <StatCard icon="bell" tone="orange" value={unread} label="Unread Notifications" badge={unread > 0 ? `${unread} new` : "All read"} />
          <StatCard icon="save" tone="purple" value={s.saved} label="Saved Discussions" badge="Bookmarked" />
        </div>

        {/* Recent activity + notifications */}
        <div className="fm2-dash-cols">
          <div className="fm2-card" style={{ overflow: "hidden" }}>
            <div className="fm2-dcard-hd">
              <span className="fm2-dcard-title">Recent Activity</span>
              <button className="fm2-dcard-link" onClick={() => navigate("/forum/profile")}>See all →</button>
            </div>
            {activity.length === 0 ? (
              <div style={{ font: "400 12.5px Poppins,sans-serif", color: "#8a9e82", padding: "16px" }}>No recent activity yet.</div>
            ) : activity.map((a, i) => {
              const tone = TONES[ACT_TONE[a.type] || "green"];
              return (
                <button key={i} className="fm2-arow" onClick={() => navigate(`/forum/thread/${a.thread_id}`)}>
                  <div className="fm2-arow-ic" style={{ background: tone.bg }}><Ic name={a.type === "answer" ? "answer" : a.type === "post" ? "post" : "question"} color={tone.fg} size={13} /></div>
                  <div className="fm2-arow-main">
                    <div className="fm2-arow-t">{a.title}</div>
                    <div className="fm2-arow-sub">{ACT_VERB[a.type] || "Activity"} · {timeAgo(a.created_at)} ago</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="fm2-card" style={{ overflow: "hidden" }}>
            <div className="fm2-dcard-hd">
              <span className="fm2-dcard-title">Notifications</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {unread > 0 && <span style={{ background: "#e07900", color: "#fff", font: "800 9px Poppins,sans-serif", borderRadius: 50, padding: "2px 7px" }}>{unread} new</span>}
                <button className="fm2-dcard-link" onClick={() => navigate("/forum/notifications")}>Mark read</button>
              </div>
            </div>
            {notifs.length === 0 ? (
              <div style={{ font: "400 12.5px Poppins,sans-serif", color: "#8a9e82", padding: "16px" }}>You’re all caught up.</div>
            ) : (
              <>
                {notifs.map((n) => (
                  <button key={n.id} className="fm2-arow" style={{ background: n.is_read ? "#fff" : "#f8fcf6" }} onClick={() => n.link_url && navigate(n.link_url)}>
                    <div className="fm2-arow-av" style={{ background: colorFor(n.title) }}>{initialsOf(n.title)}</div>
                    <div className="fm2-arow-main">
                      <div className="fm2-arow-t wrap">{n.title}</div>
                      <div className="fm2-arow-sub">{timeAgo(n.created_at)} ago</div>
                    </div>
                    {!n.is_read && <span className="fm2-arow-dot" />}
                  </button>
                ))}
                <button className="fm2-dcard-foot" onClick={() => navigate("/forum/notifications")}>See all notifications</button>
              </>
            )}
          </div>
        </div>

        {/* Weekly engagement chart */}
        <div className="fm2-card" style={{ padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 8, flexWrap: "wrap" }}>
            <span className="fm2-dcard-title">Engagement This Week</span>
            <span style={{ font: "400 11.5px Poppins,sans-serif", color: "#8a9e82" }}>Upvotes received on your answers</span>
          </div>
          <div className="fm2-chart">
            {engagement.map((e) => {
              const up = e.upvotes || 0;
              return (
                <div key={e.date} className="fm2-chart-col">
                  <div className={`fm2-chart-bar${up === maxUp && up > 0 ? " peak" : ""}`} style={{ height: `${Math.round((up / maxUp) * 72)}px` }} title={`${up} upvotes`} />
                  <span className="fm2-chart-lbl">{new Date(e.date).toLocaleDateString(undefined, { weekday: "short" }).slice(0, 3)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Saved discussions */}
        <div className="fm2-card" style={{ overflow: "hidden" }}>
          <div className="fm2-dcard-hd">
            <span className="fm2-dcard-title">Saved Discussions</span>
            <button className="fm2-dcard-link" onClick={() => navigate("/forum/saved")}>See all →</button>
          </div>
          {saved.length === 0 ? (
            <div style={{ font: "400 12.5px Poppins,sans-serif", color: "#8a9e82", padding: "16px" }}>Nothing saved yet.</div>
          ) : saved.map((p) => (
            <div key={p.thread_id} className="fm2-srow" onClick={() => navigate(`/forum/thread/${p.thread_id}`)}>
              <div className="fm2-srow-ans">
                <span className="fm2-srow-ansn">{p.answer_count ?? 0}</span>
                <div className="fm2-srow-ansl">ans</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="fm2-srow-t">{p.title}</div>
                {p.tags?.length ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {p.tags.slice(0, 3).map((t) => <span key={t} className="fm2-tag">#{t}</span>)}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
