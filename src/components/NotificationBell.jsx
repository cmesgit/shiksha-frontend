// ============================================================
// shiksha-frontend — components/NotificationBell.jsx
//
// Global notification bell for the main site Navbar. Until now the
// learner-facing app had NO global bell — the real-time notification
// system (useNotificationSocket → /activity/feed/ + /ws/updates/) was
// present but rendered nowhere, so a learner only saw notifications
// once they were inside a dashboard. This puts the SAME live feed the
// dashboards use into the Navbar, for cross-app consistency.
//
// (The forum keeps its own in-section bell via NotificationContext —
// that one is forum-scoped and poll-based; this one is the account-wide
// real-time feed.)
// ============================================================

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoNotificationsOutline, IoNotificationsSharp } from "react-icons/io5";
import useNotificationSocket from "../hooks/useNotificationSocket";
import { APP_URL, TEACHER_URL } from "../config/urls";
import { resolveNotificationTarget } from "../utils/notificationRouting";
import "./NotificationBell.css";

const TYPE_EMOJI = {
  ASSIGNMENT: "📝",
  QUIZ: "📊",
  SESSION: "🎥",
  SUBMISSION: "📬",
  CHAT: "💬",
};

function timeAgo(iso) {
  if (!iso) return "";
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  const {
    notifications,
    unreadCount,
    loading,
    markAllRead,
    markOneRead,
  } = useNotificationSocket();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    // Opening the panel clears the unread badge. Kept OUT of the setState
    // updater on purpose: markAllRead() writes the shared notification
    // store synchronously, and doing that inside an updater (render phase)
    // triggers React's "update a component while rendering another" warning.
    if (next && unreadCount > 0) markAllRead();
  };

  const handleItemClick = (notif) => {
    if (notif.id) markOneRead(notif.id);
    setOpen(false);

    // Routing rules (and the reason a plain navigate() was wrong here) live
    // in utils/notificationRouting.js — this SPA serves only a handful of
    // the paths notifications point at; the rest belong to the dashboards.
    const target = resolveNotificationTarget(notif.link_url, {
      appUrl: APP_URL,
      teacherUrl: TEACHER_URL,
    });
    if (!target) return;
    if (target.kind === "local") navigate(target.path);
    else window.location.assign(target.url);
  };

  return (
    <div className="skn-notif-wrap" ref={ref}>
      <button
        className="skn-notif-btn"
        onClick={toggle}
        aria-label={
          unreadCount > 0
            ? `Notifications, ${unreadCount} unread`
            : "Notifications"
        }
        aria-haspopup="menu"
        aria-expanded={open}
        type="button"
      >
        {unreadCount > 0 ? (
          <IoNotificationsSharp size={21} color="#f59e0b" />
        ) : (
          <IoNotificationsOutline size={21} />
        )}
        {unreadCount > 0 && (
          <span className="skn-notif-badge">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="skn-notif-dropdown" role="menu">
          <div className="skn-notif-head">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <button className="skn-notif-markall" onClick={markAllRead}>
                Mark all read
              </button>
            )}
          </div>

          <div className="skn-notif-list">
            {loading ? (
              <div className="skn-notif-empty">Loading…</div>
            ) : notifications.length === 0 ? (
              <div className="skn-notif-empty">You're all caught up.</div>
            ) : (
              notifications.map((notif, i) => (
                <button
                  key={notif.id || i}
                  className={`skn-notif-item ${
                    !notif.is_read ? "skn-notif-item--unread" : ""
                  }`}
                  onClick={() => handleItemClick(notif)}
                  role="menuitem"
                  type="button"
                >
                  <span className="skn-notif-emoji">
                    {TYPE_EMOJI[notif.type] || "🔔"}
                  </span>
                  <div className="skn-notif-body">
                    <p className="skn-notif-title">
                      {notif.title || notif.message || "Notification"}
                    </p>
                    <p className="skn-notif-time">{timeAgo(notif.created_at)}</p>
                  </div>
                  {!notif.is_read && <span className="skn-notif-dot" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
