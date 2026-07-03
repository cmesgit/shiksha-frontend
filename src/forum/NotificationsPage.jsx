// PLACEMENT: src/forum/NotificationsPage.jsx   (REPLACE THE WHOLE FILE — landing/frontend app)
//
// Notifications view from the approved design: glyph tile · message ·
// time · unread accent bar · Mark all read. Wired to the existing
// NotificationContext (which talks to /forum/notifications/ — served by
// the new site-wide notifications app via the legacy alias, so rows for
// counseling/assignments will appear here too once those emit).
// Clicking a row marks it read and deep-links to its thread when present.

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";
import ForumShell from "./ForumShell";
import { fmtAge } from "./utils";

const GLYPHS = {
  new_reply: { glyph: "↩", tint: "rgba(27,156,133,.12)", color: "#1b9c85" },
  upvote:    { glyph: "▲", tint: "rgba(18,80,39,.09)",  color: "#125027" },
  new_thread:{ glyph: "N", tint: "rgba(255,143,1,.12)", color: "#d97600" },
  default:   { glyph: "•", tint: "rgba(18,80,39,.09)",  color: "#125027" },
};

export default function NotificationsPage() {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const {
    notifications = [],
    unreadCount = 0,
    markAsRead,
    markAllAsRead,
    fetchNotifications,
  } = useNotification() || {};

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { state: { from: "/forum/notifications" } });
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => { fetchNotifications?.(); }, [fetchNotifications]);

  const open = async (n) => {
    if (!n.is_read) markAsRead?.(n.id);
    if (n.thread_id) navigate(`/forum/${n.thread_id}`);
  };

  return (
    <ForumShell crumb=" / Notifications">
      <div className="sfr-view" style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="sfr-h2row">
          <h2 className="sfr-h2" style={{ fontSize: 20 }}>Notifications</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {unreadCount > 0 && (
              <span className="sfr-h2note">{unreadCount} unread</span>
            )}
            <button
              className="sfr-chip"
              onClick={() => markAllAsRead?.()}
              disabled={unreadCount === 0}
              style={unreadCount === 0 ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
            >
              Mark all read
            </button>
          </div>
        </div>

        {notifications.length === 0 ? (
          <div className="sfr-empty">
            Nothing here yet. When someone replies to your threads, you'll see it first.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {notifications.map((n) => {
              const g = GLYPHS[n.notification_type] || GLYPHS.default;
              return (
                <button
                  key={n.id}
                  className={`sfr-notif sfr-reset${n.is_read ? "" : " unread"}`}
                  onClick={() => open(n)}
                >
                  <span className="sfr-notif-glyph" style={{ background: g.tint, color: g.color }}>
                    {g.glyph}
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <div className="sfr-notif-text">{n.message}</div>
                    <div className="sfr-notif-time">{fmtAge(n.created_at)}</div>
                  </span>
                  {!n.is_read && <span className="sfr-unread-dot" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </ForumShell>
  );
}
