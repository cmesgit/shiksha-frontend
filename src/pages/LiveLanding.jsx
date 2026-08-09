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
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/apiClient";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./LiveLanding.css";

export default function LiveLanding() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [code, setCode] = useState("");
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");

  // Send a signed-out visitor to /login WITHOUT losing where they were going.
  // Two things were wrong before: this was `window.location.href = LOGIN_URL`,
  // a hard reload out of the SPA that re-ran auth bootstrap from scratch (the
  // exact reason ProtectedRoute switched to <Navigate>); and it carried no
  // destination, so a visitor who clicked "New meeting" got dropped on their
  // dashboard after logging in and had to find their way back. `next` is read
  // by LoginRedirect in App.jsx, which already validates it as a safe
  // same-site path.
  const requireLogin = useCallback(
    (next) => navigate(`/login?next=${encodeURIComponent(next)}`),
    [navigate],
  );

  const startNewMeeting = useCallback(async () => {
    // ?new=1 round-trips through login, so re-check auth here rather than
    // trusting the caller.
    if (!isAuthenticated) return requireLogin("/live?new=1");
    setStarting(true);
    setError("");
    try {
      const { data } = await api.post("/sessions/group-sessions/instant/", {});
      navigate(`/live/room/${data.id}`);
    } catch {
      setError("Couldn't start a meeting. Please try again.");
      setStarting(false);
    }
  }, [isAuthenticated, navigate, requireLogin]);

  const joinByCode = () => {
    const trimmed = code.trim();
    if (!trimmed) return;
    // No separate lookup needed here — GroupSessionLive.jsx already
    // resolves a pasted code (or a full room id) itself.
    const room = `/live/room/${encodeURIComponent(trimmed)}`;
    if (!isAuthenticated) return requireLogin(room);
    navigate(room);
  };

  // "Host Session" on the homepage links here with ?new=1 so it actually
  // hosts, instead of pointing at the same bare /live as "Join Session" and
  // leaving both buttons functionally identical. Fires once: the ref guards
  // against the auth-bootstrap re-render, and the param is stripped so a
  // reload or Back doesn't silently open a second room.
  const autoHosted = useRef(false);
  useEffect(() => {
    if (loading || autoHosted.current || params.get("new") !== "1") return;
    // Deferred a tick so the updates land outside the effect's commit phase.
    // This is an imperative action triggered by a URL param, not state being
    // synchronised, so it would otherwise trip react-hooks/set-state-in-effect.
    //
    // The `autoHosted` write MUST live inside the timeout, not above it: under
    // StrictMode the effect is invoked twice, so setting the flag eagerly meant
    // pass 1 claimed it and scheduled the timeout, cleanup cancelled that
    // timeout, and pass 2 then bailed on the already-true flag — hosting never
    // happened at all in dev.
    const t = setTimeout(() => {
      if (autoHosted.current) return;
      autoHosted.current = true;
      setParams(new URLSearchParams(), { replace: true });
      startNewMeeting();
    }, 0);
    return () => clearTimeout(t);
  }, [loading, params, setParams, startNewMeeting]);

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
