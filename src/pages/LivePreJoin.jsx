/**
 * LivePreJoin.jsx — screen 03 of the live-session design handoff
 * (design_handoff_live_sessions/design-reference/Live Sessions.dc.html,
 * data-screen-label="03"). Route: /live/room/:id/lobby.
 *
 * Job: show a local-only camera/mic preview (never published anywhere —
 * no LiveKit connection happens on this page), read the lobby preflight
 * (entitlement + limits + admit mode + house rules), and let the user
 * actually ask to join.
 *
 * "Ask to join" calls the real POST .../join/ endpoint itself (via
 * groupSessionService.joinRoom, the same wrapper GroupSessionLive.jsx
 * uses) so a full/paywalled/rejected room surfaces its error right here in
 * the lobby, next to the device check, instead of a bare error screen deep
 * in the room component. Two outcomes:
 *   - immediate credentials  → navigate to /live/room/:id. GroupSessionLive
 *     (out of scope this phase, left untouched) unconditionally re-joins on
 *     mount regardless of how it was reached, so it fetches its own fresh
 *     LiveKit token there — this page's join response is only used to
 *     detect success/failure, never to hold a token.
 *   - 202 { status: "pending", join_request_id } (admit_mode="lobby") → this
 *     page shows a waiting state and polls the real, already-existing
 *     GET .../my-join-status/ endpoint (groupSessionService.getJoinStatus)
 *     every 3s per 01-FLOW.md, then navigates once admitted. If denied, the
 *     denial (with the host's message) shows inline instead of a redirect.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import groupSessionService, { extractApiError } from "../api/groupSessionService";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IcCheck, IcClock, IcUsers } from "../components/home/HomeIcons";
import "./LivePreJoin.css";

function initials(name) {
  return (name || "?").trim().charAt(0).toUpperCase() || "?";
}

export default function LivePreJoin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [preflight, setPreflight] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [loading, setLoading] = useState(true);

  // Local device preview — never published. Off by default, matching the
  // design reference (avatar placeholder + "camera is off" copy) and the
  // room's own "you join muted, camera off" house rule.
  const [camOn, setCamOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [devices, setDevices] = useState({ cameras: [], mics: [] });
  const [cameraId, setCameraId] = useState("");
  const [micId, setMicId] = useState("");
  const [micLevel, setMicLevel] = useState(0);
  const [deviceError, setDeviceError] = useState("");

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const audioCtxRef = useRef(null);
  const rafRef = useRef(null);

  // ── Ask to join ──────────────────────────────────────────────────────
  const [asking, setAsking] = useState(false);
  const [joinState, setJoinState] = useState("idle"); // idle | pending | denied | error
  const [joinError, setJoinError] = useState("");
  const [denyMessage, setDenyMessage] = useState("");

  // ── Preflight ────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    if (!id) return undefined;
    setLoading(true);
    setLoadError("");
    groupSessionService
      .preflight(id)
      .then((data) => { if (!cancelled) setPreflight(data); })
      .catch((err) => {
        if (cancelled) return;
        setLoadError(extractApiError(err, "This room could not be found."));
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  // ── Local media preview helpers ──────────────────────────────────────
  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setMicLevel(0);
  }, []);

  const refreshDeviceList = useCallback(async () => {
    try {
      const all = await navigator.mediaDevices.enumerateDevices();
      setDevices({
        cameras: all.filter((d) => d.kind === "videoinput"),
        mics: all.filter((d) => d.kind === "audioinput"),
      });
    } catch { /* enumerateDevices unsupported / blocked — pickers stay empty */ }
  }, []);

  const startPreview = useCallback(async () => {
    setDeviceError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: camOn ? { deviceId: cameraId ? { exact: cameraId } : undefined } : false,
        audio: micOn ? { deviceId: micId ? { exact: micId } : undefined } : false,
      });
      stopStream();
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      await refreshDeviceList();

      if (micOn && stream.getAudioTracks().length) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          const src = ctx.createMediaStreamSource(stream);
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 512;
          src.connect(analyser);
          audioCtxRef.current = ctx;
          const data = new Uint8Array(analyser.frequencyBinCount);
          const tick = () => {
            analyser.getByteFrequencyData(data);
            const avg = data.reduce((a, b) => a + b, 0) / data.length;
            setMicLevel(Math.min(100, Math.round((avg / 160) * 100)));
            rafRef.current = requestAnimationFrame(tick);
          };
          tick();
        }
      }
    } catch (err) {
      setDeviceError(
        err?.name === "NotAllowedError"
          ? "Camera/mic permission was blocked. You can still join with audio and video off."
          : "Couldn't access your camera or mic. You can still join with them off."
      );
      setCamOn(false);
      setMicOn(false);
    }
  }, [camOn, micOn, cameraId, micId, refreshDeviceList, stopStream]);

  useEffect(() => {
    if (camOn || micOn) startPreview();
    else stopStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camOn, micOn, cameraId, micId]);

  useEffect(() => stopStream, [stopStream]);

  // ── Ask to join / knock-to-join polling ──────────────────────────────
  useEffect(() => {
    if (joinState !== "pending" || !id) return undefined;
    let cancelled = false;
    let resolved = false;

    const tick = async () => {
      if (resolved) return;
      try {
        const res = await groupSessionService.getJoinStatus(id);
        if (cancelled || resolved) return;
        if (res.status === "admitted") {
          resolved = true;
          navigate(`/live/room/${id}`);
        } else if (res.status === "denied") {
          resolved = true;
          setJoinState("denied");
          setDenyMessage(res.deny_message || "");
        }
      } catch { /* transient poll failure — try again next tick */ }
    };

    tick();
    const interval = setInterval(tick, 3000);
    return () => { cancelled = true; clearInterval(interval); };
  }, [joinState, id, navigate]);

  const askToJoin = useCallback(async () => {
    setAsking(true);
    setJoinError("");
    try {
      const res = await groupSessionService.joinRoom(id);
      if (res?.status === "pending") {
        setJoinState("pending");
        return;
      }
      // Immediate admit (admit_mode="open", or caller is the host) — hand
      // off to the room. GroupSessionLive re-joins on its own; this
      // response was only used to confirm success.
      navigate(`/live/room/${id}`);
    } catch (err) {
      setJoinError(extractApiError(err, "Couldn't join this room. Please try again."));
    } finally {
      setAsking(false);
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="lobby-page">
        <Navbar />
        <div className="lobby-loading">Loading the lobby…</div>
        <Footer />
      </div>
    );
  }

  if (loadError || !preflight) {
    return (
      <div className="lobby-page">
        <Navbar />
        <div className="lobby-error-screen">
          <h2>Can&rsquo;t open this lobby</h2>
          <p>{loadError || "Something went wrong."}</p>
          <button className="lobby-btn lobby-btn-primary" onClick={() => navigate("/live")}>
            Back to Live
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const { session, host, entitlement, limits, admit_mode, is_enrolled } = preflight;
  // entitlement.reason can't be used to detect the host: live_rules.entitlement()
  // checks live_launch_free_mode FIRST, so reason comes back "launch_free" for
  // everyone (host included) whenever that admin toggle is on, same pattern as
  // GroupSessionLive.jsx's own hostId check.
  const isHost = !!(user?.id && host?.id && String(user.id) === String(host.id));
  const isLocked = admit_mode === "lobby" && !isHost;
  const title = session.topic || session.course_title || session.subject_name || "Live session";
  const retentionDays = limits?.file_retention_days ?? 2;
  const capMinutes = limits?.cap_minutes ?? 90;
  const maxParticipants = limits?.max_participants ?? 40;
  const participantsNow = limits?.participants_now ?? 0;
  const minutesUsedToday = entitlement?.minutes_used_today ?? 0;
  const dailyMinutes = limits?.daily_minutes ?? 0;

  return (
    <div className="lobby-page">
      <Navbar />

      <div className="lobby-wrap">
        <div className="lobby-head">
          <div>
            <div className="lobby-eyebrow">Ready to join</div>
            <h2>{title}</h2>
          </div>
          {host?.in_room && (
            <div className="lobby-status-pill">
              <span className="lobby-dot" /> Host is already in the room
            </div>
          )}
        </div>

        <div className="lobby-grid">
          {/* ── Device preview ── */}
          <div className="lobby-preview-col">
            <div className="lobby-video">
              {camOn && streamRef.current ? (
                <video ref={videoRef} autoPlay playsInline muted className="lobby-video-el" />
              ) : (
                <div className="lobby-video-placeholder">
                  <div className="lobby-avatar-lg">{initials(host?.name)}</div>
                  <span>Camera is off — you can turn it on after joining</span>
                </div>
              )}
              <div className="lobby-video-tag">Preview · only you can see this</div>
              <div className="lobby-video-controls">
                <button
                  className={`lobby-toggle ${micOn ? "" : "lobby-toggle-off"}`}
                  onClick={() => setMicOn((v) => !v)}
                  aria-label={micOn ? "Turn mic off" : "Turn mic on"}
                  title={micOn ? "Turn mic off" : "Turn mic on"}
                >
                  {micOn ? "🎙️" : "🔇"}
                </button>
                <button
                  className={`lobby-toggle ${camOn ? "" : "lobby-toggle-off"}`}
                  onClick={() => setCamOn((v) => !v)}
                  aria-label={camOn ? "Turn camera off" : "Turn camera on"}
                  title={camOn ? "Turn camera off" : "Turn camera on"}
                >
                  {camOn ? "🎥" : "📷"}
                </button>
              </div>
            </div>

            {deviceError && <p className="lobby-device-error">{deviceError}</p>}

            <div className="lobby-device-row">
              <label>
                <span>Camera</span>
                <select
                  value={cameraId}
                  onChange={(e) => setCameraId(e.target.value)}
                  disabled={!devices.cameras.length}
                >
                  <option value="">Default</option>
                  {devices.cameras.map((d, i) => (
                    <option key={d.deviceId || i} value={d.deviceId}>
                      {d.label || `Camera ${i + 1}`}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Microphone</span>
                <select
                  value={micId}
                  onChange={(e) => setMicId(e.target.value)}
                  disabled={!devices.mics.length}
                >
                  <option value="">Default</option>
                  {devices.mics.map((d, i) => (
                    <option key={d.deviceId || i} value={d.deviceId}>
                      {d.label || `Microphone ${i + 1}`}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Speaker</span>
                <select disabled>
                  <option>Default</option>
                </select>
              </label>
            </div>

            <div className="lobby-mic-meter">
              <span>Mic level</span>
              <span className="lobby-mic-track">
                <span className="lobby-mic-fill" style={{ width: `${micOn ? micLevel : 0}%` }} />
              </span>
              <span className="lobby-mic-status">
                {!micOn ? "Mic is off" : micLevel > 8 ? "Sounds good" : "Say something…"}
              </span>
            </div>
          </div>

          {/* ── Entitlement + rules + join ── */}
          <div className="lobby-side-col">
            <div className="lobby-card">
              <div className="lobby-host-row">
                <span className="lobby-host-avatar">{initials(host?.name)}</span>
                <div>
                  <div className="lobby-host-name">{host?.name || "Host"}</div>
                  <div className="lobby-host-sub">
                    Host{host?.is_teacher ? " · Teacher" : ""}
                    {session.subject_name ? ` · ${session.subject_name}` : ""}
                  </div>
                </div>
              </div>

              {entitlement?.unlimited ? (
                <div className="lobby-note lobby-note-good">
                  <div className="lobby-note-head">
                    <IcCheck width={15} height={15} />
                    {is_enrolled ? "Enrolled in this course" : "No time cap for you"}
                  </div>
                  <p>
                    {/* isHost takes priority over entitlement.reason: launch-free mode
                        makes reason "launch_free" for the host too (see isHost's own
                        comment above), which would otherwise hide this correct copy. */}
                    {isHost ? "You're hosting — hosts are never time-capped." : null}
                    {!isHost && entitlement.reason === "teacher" && "Teachers are never time-capped."}
                    {!isHost && entitlement.reason === "enrolled" && "No time cap for you in this course's sessions."}
                    {!isHost && entitlement.reason === "subscribed" && "Your all-access subscription covers this room."}
                    {!isHost && entitlement.reason === "launch_free" && "Free-launch mode is on — nobody is time-capped right now."}
                  </p>
                </div>
              ) : (
                <div className="lobby-note lobby-note-warn">
                  <div className="lobby-note-head">
                    <IcClock width={15} height={15} />
                    {entitlement?.reason === "daily_exhausted" ? "Daily free minutes used up" : "You're not enrolled"}
                  </div>
                  <p>
                    {entitlement?.reason === "daily_exhausted"
                      ? "You've used today's free minutes across other rooms. Enrol in a course, or come back tomorrow."
                      : `You get ${entitlement?.free_minutes ?? 0} free minutes in this room, then you'll be asked to enrol or upgrade.`}
                  </p>
                </div>
              )}

              <div className="lobby-stats">
                <div>
                  <span>Session hard cap</span>
                  <b>{capMinutes} min · set by admin</b>
                </div>
                {dailyMinutes > 0 && (
                  <div>
                    <span>Your minutes today</span>
                    <b>{minutesUsedToday} of {dailyMinutes} used</b>
                  </div>
                )}
                <div>
                  <span>Room</span>
                  <b><IcUsers width={12} height={12} /> {participantsNow} of {maxParticipants} seats</b>
                </div>
              </div>
            </div>

            <div className="lobby-card lobby-rules-card">
              <div className="lobby-rules-title">House rules for this room</div>
              <div className="lobby-rules-list">
                <div><IcCheck width={13} height={13} /><span>You join muted, camera off. The host can allow your mic.</span></div>
                <div><IcCheck width={13} height={13} /><span>Files you share are visible to everyone and deleted after {retentionDays} day{retentionDays === 1 ? "" : "s"}.</span></div>
                {limits?.features?.remote_access && (
                  <div><IcCheck width={13} height={13} /><span>A teacher may ask to control your shared screen. You approve each time.</span></div>
                )}
              </div>
            </div>

            {joinState === "pending" ? (
              <div className="lobby-waiting">
                <div className="lobby-waiting-dot" />
                <div>
                  <div className="lobby-waiting-title">Waiting for the host to admit you</div>
                  <p>The host has been notified. This page checks every few seconds.</p>
                </div>
              </div>
            ) : joinState === "denied" ? (
              <div className="lobby-denied">
                <p>The host didn&rsquo;t admit you to this room{denyMessage ? `: ${denyMessage}` : "."}</p>
                <button className="lobby-btn lobby-btn-outline" onClick={() => { setJoinState("idle"); setJoinError(""); }}>
                  Try again
                </button>
              </div>
            ) : (
              <>
                <button className="lobby-btn lobby-btn-primary lobby-btn-block" onClick={askToJoin} disabled={asking}>
                  {asking ? (isHost ? "Starting…" : "Asking…") : isHost ? "Join your session" : "Ask to join"}
                </button>
                {joinError && <p className="lobby-error">{joinError}</p>}
                {isLocked && (
                  <p className="lobby-locked-note">
                    Approval is on for this room — the host admits you from the People panel.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
