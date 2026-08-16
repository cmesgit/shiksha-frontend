/**
 * LiveLanding.jsx — public "/live" page: screen 01 of the live-session
 * design handoff (design_handoff_live_sessions/design-reference/
 * Live Sessions.dc.html, data-screen-label="01").
 *
 * Signed-out visitors can read the whole page (how-it-works, limits band,
 * tour). The two real actions — hosting and joining — are account-gated:
 * clicking either while signed out bounces to /login?next=... and back.
 * Both actions now route through the pre-join lobby (screen 03,
 * LivePreJoin.jsx) instead of dropping straight into the room, so the
 * device check / entitlement badge / house rules always show first.
 *
 * Limits band: there is no public (unauthenticated) read of GlobalSettings —
 * `/admin/settings/` is staff-gated (see global_settings/views.py,
 * AdminGlobalSettingsView, permission_classes=[IsAuthenticated, IsAdmin]).
 * A signed-out visitor has no session to preflight either. So this band
 * uses the handoff's own documented defaults (README.md "New numbers
 * surfaced in the UI") as static copy rather than inventing a fake API
 * call. The real, live numbers for the room the visitor is about to enter
 * are shown on the lobby (screen 03), which DOES have an authenticated
 * preflight call to read them from.
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

// Static defaults — README.md "New numbers surfaced in the UI" (all
// admin-editable server-side; this page has no authenticated session to
// read the live values from, see file header).
const STATIC_LIMITS = {
  freeMinutes: 15,
  maxParticipants: 40,
  capMinutes: 90,
  retentionDays: 2,
};

export default function LiveLanding() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [code, setCode] = useState("");
  const [starting, setStarting] = useState(false);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");
  const [tourOpen, setTourOpen] = useState(false);
  const codeInputRef = useRef(null);

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
      const data = await groupSessionService.createInstant({});
      navigate(`/live/room/${data.id}/lobby`);
    } catch (err) {
      setError(extractApiError(err, "Couldn't start a meeting. Please try again."));
      setStarting(false);
    }
  }, [isAuthenticated, navigate, requireLogin]);

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

  // "Host Session" links from elsewhere in the app point here with ?new=1
  // so it actually hosts. Fires once: the ref guards against the
  // auth-bootstrap re-render, and the param is stripped so a reload or
  // Back doesn't silently open a second room.
  const autoHosted = useRef(false);
  useEffect(() => {
    if (loading || autoHosted.current || params.get("new") !== "1") return;
    // Deferred a tick so the updates land outside the effect's commit phase
    // (this is an imperative action triggered by a URL param, not state
    // being synchronised, so it would otherwise trip
    // react-hooks/set-state-in-effect).
    //
    // The `autoHosted` write MUST live inside the timeout, not above it:
    // under StrictMode the effect is invoked twice, so setting the flag
    // eagerly meant pass 1 claimed it and scheduled the timeout, cleanup
    // cancelled that timeout, and pass 2 then bailed on the already-true
    // flag — hosting never happened at all in dev.
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

      <section className="live-hero">
        <div className="live-hero-inner">
          <div className="live-hero-copy">
            <div className="live-eyebrow">Live sessions</div>
            <h1>Host or join a live session — in seconds</h1>
            <p className="live-lede">
              Classes, doubt-clearing, study groups and mentoring, all on one room. Every seat is
              tied to a real ShikshaCom account, so hosts always know who is in the room.
            </p>

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
              Sign-in required for hosting and joining — name, email, and a 6-digit code. No
              anonymous guests.
            </p>

            <div className="live-pill-row">
              <span className="live-pill">{STATIC_LIMITS.freeMinutes} free minutes per join, not enrolled</span>
              <span className="live-pill">{STATIC_LIMITS.maxParticipants} participants per room</span>
              <span className="live-pill">{STATIC_LIMITS.capMinutes} min hard cap per session</span>
              <span className="live-pill">Files kept {STATIC_LIMITS.retentionDays} days</span>
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
                Teacher can assist remotely
                <small>with the student&rsquo;s consent</small>
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
              <p>Name, email, and a 6-digit code. Your account carries your enrolments, so the room already knows what you may do.</p>
            </div>
            <div className="live-how-card">
              <div className="live-how-num">2</div>
              <div className="live-how-title">Host or paste a code</div>
              <p>Hosting opens a room instantly. Joining takes the <code>abc-defg-hij</code> code the host shares.</p>
            </div>
            <div className="live-how-card">
              <div className="live-how-num">3</div>
              <div className="live-how-title">Check your mic, then join</div>
              <p>The lobby shows your camera, your time budget, and whether the host has approval turned on.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="live-limits-band">
        <div className="live-limits-inner">
          <span className="live-limits-label">Current limits, set by the admin</span>
          <div className="live-limits-stats">
            <div>
              <div className="live-limits-value">{STATIC_LIMITS.freeMinutes}</div>
              <div className="live-limits-sub">free minutes per join, not enrolled</div>
            </div>
            <div>
              <div className="live-limits-value">{STATIC_LIMITS.maxParticipants}</div>
              <div className="live-limits-sub">participants per room</div>
            </div>
            <div>
              <div className="live-limits-value">{STATIC_LIMITS.capMinutes}</div>
              <div className="live-limits-sub">minutes hard cap per session</div>
            </div>
            <div>
              <div className="live-limits-value">{STATIC_LIMITS.retentionDays}</div>
              <div className="live-limits-sub">days shared files are kept after the room ends</div>
            </div>
          </div>
        </div>
      </section>

      {/* Screen 10 — same overlay the room auto-shows on first join, opened
          here manually and standalone (no auth, no localStorage gate on
          opening — the user explicitly asked for it via the button above).
          Closing it still marks live.tour.v1 as seen, so it won't also
          auto-pop the first time this browser later joins a real room. */}
      <FirstVisitTour open={tourOpen} onClose={() => setTourOpen(false)} retentionDays={STATIC_LIMITS.retentionDays} />

      <Footer />
    </div>
  );
}
