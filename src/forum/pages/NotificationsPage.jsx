import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../contexts/NotificationContext";
import { timeAgo, initialsOf } from "../utils";

export default function NotificationsPage() {
  const navigate = useNavigate();
  const { notifications = [], markAllAsRead, markAsRead, fetchNotifications } = useNotification() || {};

  useEffect(() => { fetchNotifications && fetchNotifications(); }, [fetchNotifications]);

  const open = (n) => {
    if (!n.is_read && markAsRead) markAsRead(n.id);
    const tid = n.thread_id || n.payload?.thread_id;
    if (tid) navigate(`/forum/thread/${tid}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div><h1 className="fm2-h1">Notifications</h1><p className="fm2-sub">Replies, accepted answers and mentions.</p></div>
        {notifications.length ? <button className="fm2-btn-ghost" style={{ padding: "7px 14px" }} onClick={() => markAllAsRead && markAllAsRead()}>Mark all read</button> : null}
      </div>

      {notifications.length === 0 ? (
        <div className="fm2-empty-card">No notifications yet. When people engage with your questions and answers, you'll see it here.</div>
      ) : (
        <div className="fm2-notif-list">
          {notifications.map((n) => {
            const who = n.sender_username || n.actor_username || "Someone";
            return (
              <div key={n.id} onClick={() => open(n)} className="fm2-notif-item" style={{ background: n.is_read ? "#fff" : "#f6faf2" }}>
                {!n.is_read && <span className="fm2-notif-dot" style={{ marginTop: 6 }} />}
                <div className="fm2-avatar-sm" style={{ width: 34, height: 34, background: "#125027" }}>{initialsOf(who)}</div>
                <div>
                  <div style={{ font: "500 13px Poppins,sans-serif", color: "#18261a" }}>{n.message || n.title}</div>
                  <div style={{ font: "400 11.5px Poppins,sans-serif", color: "#8a9e82" }}>{timeAgo(n.created_at)}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
