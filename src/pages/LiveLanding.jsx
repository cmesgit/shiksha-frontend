/**
 * LiveLanding.jsx — public "/live" page: screen 01 of the live-session
 * design handoff (design_handoff_live_sessions/design-reference/
 * Live Sessions.dc.html, data-screen-label="01").
 *
 * Visitors may read the page. Hosting and joining require an account. The
 * host chooses an instant collaboration's duration before creation; the
 * backend owns the actual end time shown again in the lobby.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import groupSessionService, { extractApiError } from "../api/groupSessionService";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  IcPlayCircle,
  IcLock,
  IcMonitor,
  IcArrowRight,
} from "../components/home/HomeIcons";
import FirstVisitTour from "../components/live/FirstVisitTour";
import "./LiveLanding.css";

const DURATION_OPTIONS = [30, 45, 60, 90, 120, 150, 180];

export default function LiveLanding() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [code, setCode] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [starting, setStarting] = useState(false);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");
  const [tourOpen, setTourOpen] = useState(false);
  const codeInputRef = useRef(null);
  const durationRef = useRef(null);

  // Send a signed-out visitor to /login WITHOUT losing where they were going.
  // `next` is read by LoginRedirect in App.jsx, which already validates it
  // as a safe same-site path.
  const requireLogin = useCallback(
    (next) => navigate(`/login?next=${encodeURIComponent(next)}`),
    [navigate],
  );

  // Host a session — creates the instant room, then hands off to the lobby
  // (screen 03) instead of dropping straight into the room. The lobby is
  // where the device check + entitlement badge + "Ask to join" live.
  const startNewMeeting = useCallback(async () => {
    // ?new=1 round-trips through login, so re-check auth here rather than
    // trusting the caller.
    if (!isAuthenticated) return requireLogin("/live?new=1");
    setStarting(true);
    setError("");
    try {
      const data = await groupSessionService.createInstant({ duration_minutes: durationMinutes });
      navigate(`/live/room/${data.id}/lobby`);
    } catch (err) {
      setError(extractApiError(err, "Couldn't start a meeting. Please try again."));
      setStarting(false);
    }
  }, [durationMinutes, isAuthenticated, navigate, requireLogin]);

  // Join with a code — resolves the short code to a real session id via
  // the existing join-by-code endpoint, THEN hands off to the lobby (the
  // lobby's preflight/join calls need a real session id, not a short code).
  const joinByCode = useCallback(async () => {
    const trimmed = code.trim();
    if (!trimmed) {
      codeInputRef.current?.focus();
      return;
    }
    const room = `/live/room/${encodeURIComponent(trimmed)}/lobby`;
    if (!isAuthenticated) return requireLogin(room);

    setJoining(true);
    setError("");
    try {
      const res = await groupSessionService.joinByCode(trimmed);
      if (!res?.session_id) throw new Error("no-session");
      navigate(`/live/room/${res.session_id}/lobby`);
    } catch (err) {
      setError(extractApiError(err, "No room found for that code."));
      setJoining(false);
    }
  }, [code, isAuthenticated, navigate, requireLogin]);

  const focusCodeInput = () => codeInputRef.current?.focus();

  // Host links land on the duration picker. Creating a room requires an
  // explicit click so the host can choose its actual time limit first.
  useEffect(() => {
    if (loading || params.get("new") !== "1") return;
    const t = setTimeout(() => {
      setParams(new URLSearchParams(), { replace: true });
      durationRef.current?.focus();
    }, 0);
    return () => clearTimeout(t);
  }, [loading, params, setParams]);

  return (
    <div className="live-page">
      <Navbar />

      <section className="live-hero">
        <div className="live-hero-inner">
          <div className="live-hero-copy">
            <div className="live-eyebrow">Live sessions</div>
            <h1>Host or join a live session — in seconds</h1>
            <p className="live-lede">
              Classes, doubt-clearing, study groups and mentoring, all on one room. Every seat is
              tied to a real ShikshaCom account, so hosts always know who is in the room.
            </p>

            <label className="live-duration-field" htmlFor="live-duration">
              <span>Set the room duration</span>
              <select
                id="live-duration"
                ref={durationRef}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                disabled={starting}
              >
                {DURATION_OPTIONS.map((minutes) => (
                  <option key={minutes} value={minutes}>
                    {minutes < 60 ? `${minutes} minutes` : `${minutes / 60} ${minutes === 60 ? "hour" : "hours"}`}
                  </option>
                ))}
              </select>
              <small>The room closes for everyone when this time is up.</small>
            </label>

            <div className="live-cta-row">
              <button className="live-btn live-btn-primary" onClick={startNewMeeting} disabled={starting}>
                {starting ? "Starting…" : "Host a session"}
                <IcArrowRight width={15} height={15} />
              </button>
              <button className="live-btn live-btn-outline" onClick={focusCodeInput}>
                Join with a code
                <IcArrowRight width={15} height={15} />
              </button>
            </div>

            <div className="live-join-row">
              <IcLock width={17} height={17} />
              <input
                ref={codeInputRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="abc-defg-hij"
                onKeyDown={(e) => e.key === "Enter" && joinByCode()}
                disabled={joining}
              />
              <button onClick={joinByCode} disabled={joining}>
                {joining ? "Joining…" : "Join"}
              </button>
            </div>

            {error && <p className="live-error">{error}</p>}

            <p className="live-helper">
              <IcLock width={14} height={14} />
              Sign-in required for hosting and joining. Share the room code with anyone who has an account.
            </p>

            <div className="live-pill-row">
              <span className="live-pill">Host chooses 30–180 minutes</span>
              <span className="live-pill">Join with a shareable code</span>
              <span className="live-pill">No course enrolment needed</span>
            </div>
          </div>

          <div className="live-hero-art">
            <div className="live-mock">
              <div className="live-mock-grid">
                <div className="live-mock-tile live-mock-tile-host">
                  <div className="live-mock-avatar">D</div>
                  <span className="live-mock-badge">Host</span>
                  <span className="live-mock-name">Ms. Devi</span>
                </div>
                <div className="live-mock-tile">
                  <div className="live-mock-avatar">A</div>
                  <span className="live-mock-name">Ankit</span>
                </div>
                <div className="live-mock-tile">
                  <div className="live-mock-avatar">R</div>
                  <span className="live-mock-hand">✋</span>
                  <span className="live-mock-name">Rimi</span>
                </div>
                <div className="live-mock-tile">
                  <div className="live-mock-avatar">S</div>
                  <span className="live-mock-name">Sana</span>
                </div>
              </div>
              <div className="live-mock-bar">
                <span className="live-mock-timer">0:24:18</span>
                <span className="live-mock-remaining">1:05:42 left</span>
              </div>
            </div>
            <div className="live-float live-float-top">
              <span className="live-dot" /> Live now
            </div>
            <div className="live-float live-float-bottom">
              <IcMonitor width={16} height={16} />
              <span>
                Share your screen
                <small>Remote control is coming later</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="live-how">
        <div className="live-how-inner">
          <div className="live-how-head">
            <div>
              <div className="live-eyebrow">How it works</div>
              <h2>Three steps, no scheduling</h2>
            </div>
            <button className="live-btn live-btn-outline" onClick={() => setTourOpen(true)}>
              <IcPlayCircle width={15} height={15} />
              Watch the 40-second tour
            </button>
          </div>
          <div className="live-how-grid">
            <div className="live-how-card">
              <div className="live-how-num">1</div>
              <div className="live-how-title">Sign in</div>
              <p>Use your ShikshaCom account. Course enrolment is not required for an instant collaboration.</p>
            </div>
            <div className="live-how-card">
              <div className="live-how-num">2</div>
              <div className="live-how-title">Host or paste a code</div>
              <p>Choose the room duration, then host. Others join with the <code>abc-defg-hij</code> code you share.</p>
            </div>
            <div className="live-how-card">
              <div className="live-how-num">3</div>
              <div className="live-how-title">Check your mic, then join</div>
              <p>The lobby shows your camera, the room's end time, and whether the host requires approval.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="live-limits-band">
        <div className="live-limits-inner">
          <span className="live-limits-label">Instant collaboration</span>
          <div className="live-limits-stats">
            <div>
              <div className="live-limits-value">30–180 min</div>
              <div className="live-limits-sub">chosen by the host before creation</div>
            </div>
            <div>
              <div className="live-limits-value">Share a code</div>
              <div className="live-limits-sub">signed-in people can join</div>
            </div>
            <div>
              <div className="live-limits-value">Timed room</div>
              <div className="live-limits-sub">everyone disconnects at expiry</div>
            </div>
          </div>
        </div>
      </section>

      {/* Screen 10 — same overlay the room auto-shows on first join, opened
          here manually and standalone (no auth, no localStorage gate on
          opening — the user explicitly asked for it via the button above).
          Closing it still marks live.tour.v1 as seen, so it won't also
          auto-pop the first time this browser later joins a real room. */}
      <FirstVisitTour open={tourOpen} onClose={() => setTourOpen(false)} instant />

      <Footer />
    </div>
  );
}
