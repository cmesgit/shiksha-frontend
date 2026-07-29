/**
 * LiveLanding.jsx — public "/live" page: host or join an instant video room.
 *
 * The whole flow — landing, hosting, joining, and the actual LiveKit room —
 * stays on this app's own domain (no cross-app redirect to app./teacher.
 * subdomains). Starting or joining a room navigates to /live/room/:id,
 * which renders GroupSessionLive.jsx locally. Anyone who isn't entitled (no
 * active enrollment) gets a 15-minute countdown once they join someone
 * else's room; hosting is always unlimited.
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiClient";
import { useAuth } from "../contexts/AuthContext";
import { LOGIN_URL } from "../config/urls";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./LiveLanding.css";

export default function LiveLanding() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");

  const requireLogin = () => {
    window.location.href = LOGIN_URL;
  };

  const startNewMeeting = async () => {
    if (!isAuthenticated) return requireLogin();
    setStarting(true);
    setError("");
    try {
      const { data } = await api.post("/sessions/group-sessions/instant/", {});
      navigate(`/live/room/${data.id}`);
    } catch {
      setError("Couldn't start a meeting. Please try again.");
      setStarting(false);
    }
  };

  const joinByCode = () => {
    if (!isAuthenticated) return requireLogin();
    const trimmed = code.trim();
    if (!trimmed) return;
    // No separate lookup needed here — GroupSessionLive.jsx already
    // resolves a pasted code (or a full room id) itself.
    navigate(`/live/room/${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="live-page">
      <Navbar />

      <div className="live-hero">
        <div className="live-card">
          <h1>Live</h1>
          <p className="live-sub">Start or join a video call — no scheduling needed</p>

          <button className="live-new-btn" onClick={startNewMeeting} disabled={starting}>
            {starting ? "Starting…" : "+ New meeting"}
          </button>

          <div className="live-join-row">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter a code or link"
              onKeyDown={(e) => e.key === "Enter" && joinByCode()}
            />
            <button onClick={joinByCode}>Join</button>
          </div>

          {error && <p className="live-error">{error}</p>}

          <p className="live-helper">
            Not enrolled anywhere yet? You get 15 free minutes in any room you join.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
