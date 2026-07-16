import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../contexts/NotificationContext";
import Avatar from "../components/Avatar";
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
    <div>
      <div className="fm-row" style={{ justifyContent: "space-between" }}>
        <div><h1 className="fm-h1">Notifications</h1><p className="fm-sub">Replies, accepted answers and mentions.</p></div>
        {notifications.length ? <button className="fm-btn ghost sm" onClick={() => markAllAsRead && markAllAsRead()}>Mark all read</button> : null}
      </div>

      {notifications.length === 0 ? (
        <div className="fm-empty"><h4>No notifications yet</h4><p>When people engage with your questions and answers, you'll see it here.</p></div>
      ) : (
        <div className="fm-card" style={{ padding: 0 }}>
          {notifications.map((n) => {
            const who = n.sender_username || n.actor_username || "Someone";
            return (
              <div key={n.id} onClick={() => open(n)}
                style={{ display: "flex", gap: 12, padding: "14px 16px", borderBottom: "1px solid var(--fm-line)", cursor: "pointer", background: n.is_read ? "#fff" : "#f8fcf6" }}>
                <Avatar name={who} initials={initialsOf(who)} size={38} />
                <div>
                  <div style={{ font: "500 13px Poppins, sans-serif", color: "var(--fm-ink)" }}>{n.message || n.title}</div>
                  <div className="fm-meta-sub">{timeAgo(n.created_at)}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
