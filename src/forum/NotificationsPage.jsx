import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {getNotifications, markAllNotificationsRead} from "../api/forum";
import "../css/NotificationsPage.css";

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const pageSize = 8;

    useEffect(() => {
        fetchNotifications();
    }, [page]);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const data = await getNotifications({page, page_size: pageSize });
            const items = data.results || data;
            setNotifications(Array.isArray(items) ? items : []);
            const total = data.count || items.length || 0;
            setTotalPages(Math.ceil(total / pageSize));
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        } finally {
            setLoading(false);
        }   
    };

    const handleMarkAllRead = async () => {
        try {
            await markAllNotificationsRead();
            setNotifications((prev) =>
                prev.map((n) => ({ ...n, is_read: true}))
            );
        } catch (err) {
            console.error("Failed to mark notifications as read", err);
        }
    };

    const timeAgo = (dateStr) => {
        const now = new Date();
        const date = new Date(dateStr);
        const diff = Math.floor((now - date) / 1000);
        if (diff < 60) return `${diff} secs`;
        if (diff < 3600) return `${Math.floor(diff / 60)} mins`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hrs`;
        if (diff < 604800) return `${Math.floor(diff / 86400)} days`;
        return date.toLocaleDateString();
    };

    const handleClick = (notification) => {
        if (notification.thread_id) {
            navigate(`/forum/${notification.thread_id}`);
        }
    };

    return (
        <div className="notifications-page">
            <div className="notifications-header">
                <button className="back-btn" onClick={() => navigate("/forum")}>
                    &larr; Back to Forum
                </button>
                <h2>Notifications</h2>
                <button className="mark-read-btn" onClick={handleMarkAllRead}>
                    Mark all as read
                </button>
            </div>

            {loading ? (
                <p className="notifications-loading">Loading...</p>
            ) : notifications.length === 0 ? (
                <p className="notifications-empty">No notifications yet.</p>
            ) : (
                <div className="notifications-list">
                    {notifications.map((n) => (
                        <div
                            key={n.id}
                            className={`notification-card ${!n.is_read ? "unread" : ""}`}
                            onClick={() => handleClick(n)}
                        >
                            <div className="notification-title">{n.message}</div>
                            <div className="notification-subtitle"> {timeAgo(n.created_at)} ago
                            </div>
                        </div>
                    ))}
                </div>
    )}

    {totalPages > 1 && (
        <div className="notifications-pagination">
            <button
                className="page-btn"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
            >
                &larr;
            </button>
            <span>Page {page} of {totalPages}</span>
            {Array.from({length : totalPages}, (_, i) => i+1).map((p) => (
                <button
                    key={p}
                    className={`page-btn ${p === page ? "active" : ""}`}
                    onClick={() => setPage(p)}
                >
                    {p}
                </button>
            ))}
            <button
                className="page-btn"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
            >
                &rarr;
            </button>
        </div>
    )}      
    </div>
    );
}