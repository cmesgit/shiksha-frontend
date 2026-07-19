import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard } from "../../api/forum";
import { useForum } from "../ForumContext";
import { useAuth } from "../../contexts/AuthContext";
import { timeAgo } from "../utils";

/* User Dashboard — doc §3. Overview cards, recent activity, notifications
   preview, a 7-day engagement bar chart, and a saved preview, all backed by
   the /forum/dashboard/ aggregate endpoint. Guests get a sign-in prompt. */

function StatCard({ label, value, accent }) {
  return (
    <div className="fm2-card fm2-stat-card">
      <div className="fm2-stat-card-num" style={{ color: accent || "#125027" }}>{value ?? 0}</div>
      <div className="fm2-stat-card-lbl">{label}</div>
    </div>
  );
}

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
      <div className="fm2-card" style={{ padding: "48px 24px", textAlign: "center" }}>
        <div style={{ font: "800 16px Montserrat,sans-serif", color: "#125027", marginBottom: 8 }}>Your forum dashboard</div>
        <p style={{ font: "400 13px Poppins,sans-serif", color: "#8a9e82", marginBottom: 16 }}>Sign in to see your activity, notifications and saved discussions.</p>
        <button className="fm2-btn-outline" onClick={() => navigate(`/login?next=${encodeURIComponent("/forum/dashboard")}`)} style={{ padding: "10px 24px", borderRadius: 50 }}>Sign in</button>
      </div>
    );
  }

  if (loading) return <div className="fm2-empty-card">Loading your dashboard…</div>;
  if (error || !data) return <div className="fm2-empty-card">Couldn’t load your dashboard. Please try again.</div>;

  const s = data.stats || {};
  const engagement = data.engagement || [];
  const maxUp = Math.max(1, ...engagement.map((e) => e.upvotes || 0));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
      {/* Greeting */}
      <div className="fm2-card" style={{ padding: "18px 22px", background: "linear-gradient(135deg,#0d3b1c 0%,#125027 60%,#0f8f7e 100%)" }}>
        <div style={{ font: "800 18px Montserrat,sans-serif", color: "#fff" }}>Hi {me?.display_name || "there"} 👋</div>
        <p style={{ font: "400 12.5px Poppins,sans-serif", color: "rgba(255,255,255,.75)", margin: "4px 0 0" }}>Here’s your forum activity at a glance.</p>
      </div>

      {/* Stat cards */}
      <div className="fm2-stat-grid">
        <StatCard label="Questions Asked" value={s.questions_asked} />
        <StatCard label="Answers Given" value={s.answers_given} accent="#0f8f7e" />
        <StatCard label="Unread Notifications" value={s.unread_notifications} accent="#e07900" />
        <StatCard label="Saved Discussions" value={s.saved} accent="#b03020" />
      </div>

      <div className="fm2-dash-cols">
        {/* Recent activity */}
        <div className="fm2-card" style={{ padding: "16px 18px" }}>
          <div className="fm2-section-hd">Recent Activity</div>
          {(data.recent_activity || []).length === 0 ? (
            <div style={{ font: "400 12.5px Poppins,sans-serif", color: "#8a9e82", padding: "8px 0" }}>No recent activity yet.</div>
          ) : data.recent_activity.map((a, i) => (
            <button key={i} onClick={() => navigate(`/forum/thread/${a.thread_id}`)} className="fm2-activity-row">
              <span className={`fm2-activity-dot ${a.type}`} />
              <span className="fm2-activity-text">
                <strong>{a.type === "answer" ? "Answered" : a.type === "post" ? "Posted" : "Asked"}</strong> · {a.title}
              </span>
              <span className="fm2-activity-time">{timeAgo(a.created_at)}</span>
            </button>
          ))}
        </div>

        {/* Notifications preview */}
        <div className="fm2-card" style={{ padding: "16px 18px" }}>
          <div className="fm2-section-hd" style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Notifications</span>
            <button onClick={() => navigate("/forum/notifications")} style={{ background: "none", border: "none", color: "#e07900", font: "700 11px Poppins,sans-serif", cursor: "pointer" }}>See all</button>
          </div>
          {(data.notifications_preview || []).length === 0 ? (
            <div style={{ font: "400 12.5px Poppins,sans-serif", color: "#8a9e82", padding: "8px 0" }}>You’re all caught up.</div>
          ) : data.notifications_preview.map((n) => (
            <button key={n.id} onClick={() => n.link_url && navigate(n.link_url)} className="fm2-notif-row">
              {!n.is_read && <span className="fm2-notif-dot" />}
              <span className="fm2-activity-text">{n.title}</span>
              <span className="fm2-activity-time">{timeAgo(n.created_at)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Weekly engagement chart */}
      <div className="fm2-card" style={{ padding: "16px 18px" }}>
        <div className="fm2-section-hd">Weekly Engagement · upvotes received</div>
        <div className="fm2-chart">
          {engagement.map((e) => (
            <div key={e.date} className="fm2-chart-col">
              <div className="fm2-chart-bar" style={{ height: `${Math.round((e.upvotes / maxUp) * 100)}%` }} title={`${e.upvotes} upvotes`} />
              <span className="fm2-chart-lbl">{new Date(e.date).toLocaleDateString(undefined, { weekday: "short" }).slice(0, 2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Saved preview */}
      <div className="fm2-card" style={{ padding: "16px 18px" }}>
        <div className="fm2-section-hd" style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Saved Discussions</span>
          <button onClick={() => navigate("/forum/saved")} style={{ background: "none", border: "none", color: "#e07900", font: "700 11px Poppins,sans-serif", cursor: "pointer" }}>See all</button>
        </div>
        {(data.saved_preview || []).length === 0 ? (
          <div style={{ font: "400 12.5px Poppins,sans-serif", color: "#8a9e82", padding: "8px 0" }}>Nothing saved yet.</div>
        ) : data.saved_preview.map((p) => (
          <button key={p.thread_id} onClick={() => navigate(`/forum/thread/${p.thread_id}`)} className="fm2-activity-row">
            <span className="fm2-activity-text"><strong>{p.title}</strong> · {p.answer_count} answers</span>
            {p.tags?.length ? <span style={{ font: "400 11px Poppins,sans-serif", color: "#8a9e82" }}>#{p.tags[0]}</span> : null}
          </button>
        ))}
      </div>
    </div>
  );
}
