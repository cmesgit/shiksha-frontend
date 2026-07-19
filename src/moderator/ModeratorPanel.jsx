import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Flag, ShieldAlert, Users, BarChart3, MessageSquare, History,
  MessagesSquare, TriangleAlert, UserX, ShieldCheck,
} from "lucide-react";
import ReportedContent from "./ReportedContent";
import AutoRejected from "./AutoRejected";
import UserManagement from "./UserManagement";
import Analytics from "./Analytics";
import AllThreads from "./AllThreads";
import ActivityLog from "./ActivityLog";
import Navbar from "../components/Navbar";
import { useToast } from "../contexts/ToastContext";
import { getModAnalytics } from "../api/moderation";
import "../css/Dashboard.css";
import "../css/Moderator.css";

const TABS = [
  { id: "reports", label: "Reported Content", icon: Flag },
  { id: "auto-rejected", label: "Auto-Rejected", icon: ShieldAlert },
  { id: "users", label: "User Management", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "threads", label: "All Threads", icon: MessageSquare },
  { id: "log", label: "Activity Log", icon: History },
];

const STAT_CARDS = [
  { key: "open_reports", label: "Open reports", icon: MessagesSquare, tone: "blue" },
  { key: "high_priority", label: "High priority", icon: TriangleAlert, tone: "red" },
  { key: "banned_users", label: "Banned users", icon: UserX, tone: "purple" },
  { key: "actions_today", label: "Actions today", icon: ShieldCheck, tone: "green" },
];

// The moderator panel now merges into the site body: it renders the real
// shared <Navbar /> (same integration the forum uses in ForumLayout) instead
// of the old standalone chrome, followed by a breadcrumb page header ported
// from the Forum Moderator mockup's PAGE HEADER block.
const PageHeader = () => (
  <div style={{ background: "#fff", borderBottom: "1px solid #dce8cc" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
      <div>
        <div style={{ font: "400 11px Poppins,sans-serif", color: "#8a9e82", marginBottom: 3 }}>
          <Link to="/" style={{ color: "#125027", textDecoration: "none" }}>ShikshaCom</Link>
          <span style={{ margin: "0 5px", color: "#c8d8bc" }}>›</span>
          <Link to="/forum" style={{ color: "#4a5e3a", textDecoration: "none" }}>Forum</Link>
          <span style={{ margin: "0 5px", color: "#c8d8bc" }}>›</span>
          <span style={{ color: "#4a5e3a" }}>Moderator Panel</span>
        </div>
        <h1 style={{ font: "900 20px/1 Montserrat,sans-serif", color: "#125027", margin: "0 0 2px" }}>Moderator Panel</h1>
        <p style={{ font: "400 12px Poppins,sans-serif", color: "#8a9e82", margin: 0 }}>Review reports · manage users · keep discussions safe and on-topic</p>
      </div>
    </div>
  </div>
);

const ModeratorPanel = () => {
  const [tab, setTab] = useState("reports");
  const [counts, setCounts] = useState({ reports: 0, "auto-rejected": 0 });
  const [stats, setStats] = useState({ open_reports: 0, high_priority: 0, banned_users: 0, actions_today: 0 });
  // shiksha-frontend already has an app-wide toast system (ToastContext +
  // Toast component, mounted via <ToastProvider> in main.jsx) — reused here
  // instead of porting Admin-dashboard's standalone bottom-center Toast.jsx,
  // which this app doesn't need a second copy of.
  const { showToast } = useToast();

  const refreshStats = useCallback(() => {
    getModAnalytics().then((d) => {
      if (d && d.header_stats) setStats(d.header_stats);
    });
  }, []);

  useEffect(() => { refreshStats(); }, [refreshStats]);

  // Passed down to every tab that performs a moderation action: shows a
  // toast and pulls fresh header-stat counts in one call.
  const onAction = useCallback((message) => {
    showToast({ message });
    refreshStats();
  }, [refreshStats, showToast]);

  return (
    <div className="fm2-mod">
      <Navbar />
      <PageHeader />
      <div className="dashboard-wrapper">
        <div className="mod-stat-grid">
          {STAT_CARDS.map(({ key, label, icon: Icon, tone }) => (
            <div key={key} className="mod-stat-card">
              <div className={`mod-stat-icon tone-${tone}`}><Icon size={24} /></div>
              <div>
                <div className="mod-stat-value">{stats[key] ?? 0}</div>
                <div className="mod-stat-label">{label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mod-tabs">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`mod-tab${tab === id ? " active" : ""}`}
              onClick={() => setTab(id)}
            >
              <Icon size={16} />
              {label}
              {counts[id] > 0 && <span className="mod-tab-badge">{counts[id]}</span>}
            </button>
          ))}
        </div>

        {tab === "reports" && (
          <ReportedContent
            onCount={(n) => setCounts((c) => ({ ...c, reports: n }))}
            onAction={onAction}
          />
        )}
        {tab === "auto-rejected" && (
          <AutoRejected onCount={(n) => setCounts((c) => ({ ...c, "auto-rejected": n }))} />
        )}
        {tab === "users" && <UserManagement onAction={onAction} />}
        {tab === "threads" && <AllThreads onAction={onAction} />}
        {tab === "analytics" && <Analytics />}
        {tab === "log" && <ActivityLog />}
      </div>
    </div>
  );
};

export default ModeratorPanel;
