import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function GuestBanner({ message = "Sign in to ask questions, answer, upvote, save and follow." }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (isAuthenticated) return null;
  return (
    <div className="fm-guestbar">
      <div>
        <div className="t">You're browsing as a guest</div>
        <div className="d">{message}</div>
      </div>
      <button className="fm-btn sm" onClick={() => navigate(`/login?next=${encodeURIComponent(window.location.pathname)}`)}>
        Sign in
      </button>
    </div>
  );
}
