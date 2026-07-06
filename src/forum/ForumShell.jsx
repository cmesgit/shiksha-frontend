// PLACEMENT: src/forum/ForumShell.jsx   (NEW FILE — landing/frontend app)
//
// The forum chrome from the approved design that sits BETWEEN the site's
// existing <Navbar/> and <Footer/> (App.jsx's <Page> already renders
// those, so the design's top strip / main header / green nav are NOT
// duplicated here): the white sub-bar (breadcrumb · Guidelines · Create
// Thread · notification bell) + the cream content area.
//
// Usage:  <ForumShell crumb=" / Thread"> ...view... </ForumShell>

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";
import "./forum-redesign.css";

export function useRequireAuth() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // Gate an action behind login; sends the guest to the site login page
  // and back to the forum afterwards (login page honors ?next=).
  return (fn) => (...args) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }
    return fn(...args);
  };
}

export function GuestBanner({ message = "Sign in to ask questions, reply and upvote." }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (isAuthenticated) return null;
  return (
    <div className="sfr-guestbar">
      <div>
        <div className="t">You're browsing as a guest</div>
        <div className="d">{message}</div>
      </div>
      <button onClick={() => navigate(`/login?next=${encodeURIComponent(window.location.pathname)}`)}>
        Sign in
      </button>
    </div>
  );
}

export default function ForumShell({ crumb = "", children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { unreadCount } = useNotification() || {};
  const requireAuth = useRequireAuth();

  return (
    <div className="sfr-page">
      <div className="sfr-subbar">
        <div className="sfr-subbar-in">
          <div className="sfr-crumb">
            Resources <span style={{ opacity: 0.4 }}>/</span>{" "}
            <a onClick={() => navigate("/forum")}>Forum</a>
            {crumb}
          </div>
          <div className="sfr-subbar-actions">
            <button
              className="sfr-btn-primary"
              onClick={requireAuth(() => navigate("/forum/create"))}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
              Create Thread
            </button>
            {isAuthenticated && (
              <button
                className="sfr-bell"
                title="Notifications"
                onClick={() => navigate("/forum/notifications")}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
                {unreadCount > 0 && (
                  <span className="sfr-bell-badge">{unreadCount > 99 ? "99+" : unreadCount}</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="sfr-wrap">{children}</div>
    </div>
  );
}
