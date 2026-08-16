/**
 * GroupSessionClassroomUI.jsx — shiksha-frontend's OWN copy.
 *
 * Group-session live room — Google-Meet-style multi-participant layout.
 *
 * Chat, raise-hand data messages, panels, control bar, fullscreen. Private
 * Sessions and normal Live Sessions are not affected — this component and
 * its CSS use the gs-* prefix only.
 *
 * This file is NOT tracked by shared/sync.mjs (it never was, even for the
 * dashboard apps) — shiksha-student-dashboard and shiksha-teacher-dashboard
 * already carry their own independently-diverged forks, and this is a
 * third. If you fix a bug here, check the other two forks too.
 */

import { useTracks, VideoTrack, useRoomContext } from "@livekit/components-react";
import { Track } from "livekit-client";
import { useNavigate } from "react-router-dom";
import GroupSessionChatPanel from "./GroupSessionChatPanel";
import NotesPanel from "./NotesPanel";
import GroupSessionControlBar from "./GroupSessionControlBar";
import FilesPanel from "./FilesPanel";
import HostControlsPanel from "./HostControlsPanel";
import RemainingTimePill from "./RemainingTimePill";
import EndingSoonModal from "./EndingSoonModal";
import FirstVisitTour from "./FirstVisitTour";
import React, { useState, useRef, useEffect } from "react";
import "../../styles/groupSessionLive.css";
import "../../styles/liveSessions.css";
import api from "../../api/apiClient";
import groupSessionService from "../../api/groupSessionService";
import { useAuth } from "../../contexts/AuthContext";
import soundManager from "../../utils/soundManager";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { useRemainingTime } from "../../hooks/useRemainingTime";

function formatDate(d) {
  if (!d) return "—";
  try {
    return new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "2-digit",
    });
  } catch { return d; }
}

function formatTime(t) {
  if (!t) return "—";
  try {
    const [h, m] = String(t).split(":");
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? "p.m" : "a.m";
    const h12 = hour % 12 || 12;
    return `${h12}:${m || "00"} ${ampm}`;
  } catch { return t; }
}

function addMinutesToTime(time, minutes) {
  if (!time || !minutes) return "";
  const [h, m] = String(time).split(":").map(Number);
  const d = new Date();
  d.setHours(h || 0, m || 0, 0, 0);
  d.setMinutes(d.getMinutes() + Number(minutes || 0));
  return d.toTimeString().slice(0, 5);
}

function formatTiming(session) {
  if (!session?.time) return "—";
  const end = addMinutesToTime(session.time, session.durationMinutes || session.duration_minutes || 0);
  return `${formatTime(session.time)}${end ? ` (${formatTime(end)})` : ""}`;
}

function sameId(a, b) {
  return a && b && String(a) === String(b);
}

function formatMmSs(ms) {
  const total = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function readParticipantMeta(participant) {
  try {
    return participant?.metadata ? JSON.parse(participant.metadata) : {};
  } catch { return {}; }
}

/* Small mic glyph reused inside each tile */
function MicIcon({ on }) {
  return on ? (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
    </svg>
  );
}

/**
 * One participant tile. Renders live video when the camera track is
 * published + unmuted, otherwise an avatar placeholder.
 */
function ParticipantTile({ trackRef, variant, isLocal, isHost, micOn, speaking, handRaised, displayName }) {
  const pub = trackRef?.publication;
  const showVideo = !!pub && !pub.isMuted;
  const initial = String(displayName || "?").trim().charAt(0).toUpperCase() || "?";

  const cls = [
    "gs-tile",
    variant === "strip" ? "gs-tile--strip" : "",
    isLocal ? "gs-tile--self" : "",
    speaking ? "gs-tile--speaking" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={cls}>
      {showVideo ? (
        <VideoTrack trackRef={trackRef} />
      ) : (
        <div className="gs-tile-placeholder">
          <div className="gs-tile-avatar">{initial}</div>
        </div>
      )}

      <div className="gs-tile-badges">
        {handRaised ? <span className="gs-tile-hand">✋</span> : <span />}
        {isHost && <span className="gs-tile-tag">Host</span>}
      </div>

      <div className="gs-tile-footer">
        <span className={`gs-tile-mic ${micOn ? "is-on" : "is-off"}`}>
          <MicIcon on={micOn} />
        </span>
        <span className="gs-tile-name">{isLocal ? `${displayName} (You)` : displayName}</span>
      </div>
    </div>
  );
}

export default function GroupSessionClassroomUI({
  role, session, chatConfig, onLeave,
  groupSessionRemainingMs = null,
  isHost = false, onEndSession = null,
  // Live-session-rules enrichment (design_handoff_live_sessions phase 4) —
  // additive fields off the /join/ response, unpacked by GroupSessionLive.jsx.
  // `groupSessionRemainingMs` above is the PRE-EXISTING guest-trial clock
  // (GUEST_TRIAL_MINUTES, anchored per-user at first join) — left completely
  // alone; it still drives GroupSessionLive's own paywall gating. The new
  // countdown below is the ROOM's cap_ends_at, shown as the single visible
  // remaining-time pill per design screen 05 (one pill, not two).
  liveFeatures = {},
  liveLimits = {},
  liveEntitlement = null,
  liveCapEndsAt = null,
}) {
  const isPresenter = role === "PRESENTER" || role === "teacher";

  const [raisedHands, setRaisedHands] = useState({});
  const [raiseHandToasts, setRaiseHandToasts] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [peopleTab, setPeopleTab] = useState("participants");
  const [joinRequests, setJoinRequests] = useState([]);
  const [admitMode, setAdmitMode] = useState(session?.admitMode || "open");
  const [, setTick] = useState(0);
  const bump = () => setTick((t) => t + 1);

  // Live-session-rules state — the room's real cap (not the legacy guest
  // clock above), the host's extension count, the host-controls modal, and
  // the chat WebSocket instance itself (shared downward to FilesPanel so it
  // can listen for session_file_added/removed without opening a second
  // connection — see FilesPanel's own module note).
  const [capEndsAt, setCapEndsAt] = useState(liveCapEndsAt);
  const [extensionsUsed, setExtensionsUsed] = useState(0);
  const [extensionsAllowed, setExtensionsAllowed] = useState(liveLimits?.extensions_allowed ?? 0);
  const [hostControlsOpen, setHostControlsOpen] = useState(false);
  const [chatSocket, setChatSocket] = useState(null);

  useEffect(() => {
    setCapEndsAt(liveCapEndsAt);
  }, [liveCapEndsAt]);

  useEffect(() => {
    setExtensionsAllowed(liveLimits?.extensions_allowed ?? 0);
  }, [liveLimits?.extensions_allowed]);

  const remainingMs = useRemainingTime(capEndsAt, liveEntitlement);

  // Ending-soon upsell (screens 08/13) + the single T-0 disconnect path for
  // the ROOM's cap-based countdown — 01-FLOW.md section C. This is
  // deliberately separate from, and does NOT touch, the pre-existing
  // GUEST_TRIAL_MINUTES clock's own T-0 handling in GroupSessionLive.jsx
  // (the `groupSessionRemainingMs` prop above/paywall screen there) — that
  // is a different variable driving a different, already-shipped path
  // (render-swap to an inline "your free minutes are up" screen, which
  // unmounts <LiveKitRoom> and so already disconnects on its own). Mixing
  // the two into one handler would risk exactly the double-disconnect the
  // Phase 5 brief calls out; keeping them fully separate keeps each to
  // exactly one path.
  const endingSoon = remainingMs != null && remainingMs <= 5 * 60_000;
  const lastMinute = remainingMs != null && remainingMs <= 60_000;
  const navigate = useNavigate();
  const roomTimeoutFiredRef = useRef(false);

  const containerRef = useRef(null);
  const room = useRoomContext();
  const { user, hasRole } = useAuth();
  const myUserId = user?.id ? String(user.id) : null;
  const hostId = session?.hostId ? String(session.hostId) : null;
  const iAmTeacher = hasRole ? hasRole("TEACHER") : false;

  // The ONE place that ends the room for this (new) cap-based countdown:
  // guarded by a ref so React 18 StrictMode's double-invoke in dev, or a
  // stray extra render at exactly ms===0, can never fire this twice. Only
  // engages once the room actually has its own cap_ends_at (capEndsAt) —
  // i.e. the new live-rules system is active for this room — so it never
  // interferes with a room that hasn't gone live yet.
  useEffect(() => {
    if (!capEndsAt || remainingMs == null || remainingMs > 0) return;
    if (roomTimeoutFiredRef.current) return;
    roomTimeoutFiredRef.current = true;
    try {
      room?.disconnect();
    } catch {
      /* already disconnected/disconnecting — navigate regardless */
    }
    navigate(`/live/session/${session?.id}/summary?reason=timeout`);
  }, [capEndsAt, remainingMs, room, navigate, session?.id]);

  // Poll pending join requests while the host has the requests tab open —
  // admit/deny is low-frequency, so a short poll is simpler and lower-risk
  // than a dedicated realtime channel (the guest has no LiveKit room yet to
  // receive a data-channel nudge on).
  useEffect(() => {
    if (!isHost || admitMode !== "lobby" || activePanel !== "people" || peopleTab !== "requests") {
      return undefined;
    }
    let cancelled = false;
    const load = async () => {
      try {
        const rows = await groupSessionService.getJoinRequests(session?.id);
        if (!cancelled) setJoinRequests(rows);
      } catch { /* transient poll failure — try again next tick */ }
    };
    load();
    const interval = setInterval(load, 3000);
    return () => { cancelled = true; clearInterval(interval); };
  }, [isHost, admitMode, activePanel, peopleTab, session?.id]);

  // Single source of truth for admit_mode — GroupSessionControlBar's "Lock
  // Session" toggle calls this same setter (via the onSetAdmitMode prop)
  // instead of keeping its own separate copy, so the two controls can never
  // drift out of sync with each other or with the backend.
  const setAdmitModeShared = async (mode) => {
    try {
      await groupSessionService.setAdmitMode(session?.id, mode);
      setAdmitMode(mode);
    } catch (e) { console.error("setAdmitMode failed", e); }
  };

  const toggleAdmitMode = () => {
    setAdmitModeShared(admitMode === "lobby" ? "open" : "lobby");
  };

  const admitRequest = async (requestId) => {
    try {
      await groupSessionService.admitJoinRequest(session?.id, requestId);
      setJoinRequests((prev) => prev.filter((r) => r.id !== requestId));
    } catch (e) { console.error("admit failed", e); }
  };

  const denyRequest = async (requestId) => {
    try {
      await groupSessionService.denyJoinRequest(session?.id, requestId);
      setJoinRequests((prev) => prev.filter((r) => r.id !== requestId));
    } catch (e) { console.error("deny failed", e); }
  };

  const togglePanel = (panel) => {
    setActivePanel((current) => (current === panel ? null : panel));
    if (panel === "people") setPeopleTab("participants");
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        const el = containerRef.current;
        if (el?.requestFullscreen) await el.requestFullscreen();
        else if (el?.webkitRequestFullscreen) await el.webkitRequestFullscreen();
        else if (el?.msRequestFullscreen) await el.msRequestFullscreen();
      } else {
        if (document.exitFullscreen) await document.exitFullscreen();
        else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
        else if (document.msExitFullscreen) await document.msExitFullscreen();
      }
    } catch {}
  };

  useEffect(() => {
    const fn = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", fn);
    document.addEventListener("webkitfullscreenchange", fn);
    return () => {
      document.removeEventListener("fullscreenchange", fn);
      document.removeEventListener("webkitfullscreenchange", fn);
    };
  }, []);

  useEffect(() => {
    if (!room) return;
    const events = [
      "trackMuted", "trackUnmuted", "trackPublished", "trackUnpublished",
      "trackSubscribed", "trackUnsubscribed", "participantConnected",
      "participantDisconnected", "localTrackPublished", "localTrackUnpublished",
      "activeSpeakersChanged",
    ];
    events.forEach((evt) => room.on(evt, bump));
    return () => events.forEach((evt) => room.off(evt, bump));
  }, [room]);

  useEffect(() => {
    if (!room) return;
    const handleData = (payload, participant) => {
      try {
        const msg = JSON.parse(new TextDecoder().decode(payload));
        if (msg.type === "raise-hand" || msg.type === "RAISE_HAND") {
          const identity = participant.identity;
          const displayName = participant.name || identity;
          setRaisedHands((prev) => ({ ...prev, [identity]: true }));
          const toastId = Date.now() + Math.random();
          setRaiseHandToasts((prev) => [...prev, { id: toastId, identity, displayName }]);
          setTimeout(() => {
            setRaiseHandToasts((prev) => prev.filter((t) => t.id !== toastId));
          }, 5000);
        }
        if (msg.type === "lower-hand" || msg.type === "LOWER_HAND") {
          const identity = participant.identity;
          setRaisedHands((prev) => {
            const u = { ...prev };
            delete u[identity];
            return u;
          });
        }
      } catch {}
    };
    room.on("dataReceived", handleData);
    return () => room.off("dataReceived", handleData);
  }, [room]);

  // GroupSessionControlBar's raise/lower-hand toggle only broadcasts to OTHER
  // participants over the LiveKit data channel (dataReceived above never
  // fires for your own outgoing message) — it also dispatches this local
  // window event so the local tile/toast/People-panel state stays in sync
  // with your own hand.
  useEffect(() => {
    const handleLocalRaise = (e) => {
      const { type, identity } = e.detail || {};
      if (!identity) return;
      setRaisedHands((prev) => {
        if (type === "raise-hand") return { ...prev, [identity]: true };
        const next = { ...prev };
        delete next[identity];
        return next;
      });
    };
    window.addEventListener("raise-hand-local", handleLocalRaise);
    return () => window.removeEventListener("raise-hand-local", handleLocalRaise);
  }, []);

  useEffect(() => {
    if (!chatConfig || !session?.id) return;
    api.get(chatConfig.restGetPath).then((res) => {
      setChatMessages((res.data || []).map((m) => ({
        id: m.id, sender: m.sender_name, text: m.message,
        isTeacher: m.sender_role === "teacher",
        isMe: myUserId && String(m.sender_id) === myUserId,
        time: new Date(m.created_at),
      })));
    }).catch(() => {});
  }, [session?.id, myUserId, chatConfig?.restGetPath]);

  useEffect(() => {
    if (!chatConfig || !session?.id) return;
    let ws;
    let reconnectTimer;
    let unmounted = false;

    const connect = () => {
      if (unmounted) return;
      const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
      const wsHost = import.meta.env.VITE_WS_HOST || (isLocal ? window.location.host : "api.shikshacom.com");
      const proto = isLocal && window.location.protocol !== "https:" ? "ws:" : "wss:";
      const token = localStorage.getItem("access") || sessionStorage.getItem("access") || "";

      try {
        ws = new WebSocket(`${proto}//${wsHost}${chatConfig.wsPath}${token ? `?token=${token}` : ""}`);
        ws.onmessage = (ev) => {
          try {
            const { data } = JSON.parse(ev.data);
            if (!data) return;
            setChatMessages((prev) => {
              if (prev.some((m) => m.id === data.id)) return prev;
              const isMe = myUserId && String(data.sender_id) === myUserId;
              if (!isMe) soundManager.messageReceive?.();
              return [...prev, {
                id: data.id, sender: data.sender_name, text: data.message,
                isTeacher: data.sender_role === "teacher", isMe,
                time: new Date(data.created_at),
              }];
            });
          } catch {}
        };
        // Additive listener, separate from the chat-only `onmessage` above —
        // handles the design_handoff_live_sessions broadcast types
        // (session_extended today; session_file_added/removed are consumed
        // directly by FilesPanel via the shared `chatSocket` state below).
        // See consumers.py::GroupSessionChatConsumer.session_extended for
        // the exact payload shape.
        ws.addEventListener("message", (ev) => {
          try {
            const msg = JSON.parse(ev.data);
            if (msg.type === "session_extended") {
              setCapEndsAt(msg.cap_ends_at);
              setExtensionsUsed(msg.extensions_used);
              setExtensionsAllowed(msg.extensions_allowed);
            }
          } catch {
            /* malformed frame — ignore, next tick corrects state */
          }
        });
        ws.onclose = () => {
          setChatSocket(null);
          if (!unmounted) reconnectTimer = setTimeout(connect, 3000);
        };
        ws.onerror = () => ws.close();
        ws.onopen = () => setChatSocket(ws);
      } catch {}
    };

    connect();
    return () => {
      unmounted = true;
      clearTimeout(reconnectTimer);
      setChatSocket(null);
      ws?.close();
    };
  }, [session?.id, myUserId, chatConfig?.wsPath]);

  const sendMessage = async (text) => {
    soundManager.messageSend?.();
    if (!chatConfig) return;
    try {
      const res = await api.post(chatConfig.restPostPath, { message: text });
      const msg = res.data;
      setChatMessages((prev) => {
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, {
          id: msg.id, sender: "You", text: msg.message, isMe: true,
          isTeacher: isPresenter, time: new Date(msg.created_at),
        }];
      });
    } catch {
      setChatMessages((prev) => [...prev, { sender: "You", text, isMe: true, time: new Date() }]);
    }
  };

  /* Tracks — one camera track PER participant (placeholder when off)
     plus any screen-share. This is what makes it behave like Meet. */
  const trackRefs = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  const localId = room?.localParticipant?.identity || null;
  const localName = room?.localParticipant?.name || localId || "You";

  const describeParticipant = (p) => {
    const meta = readParticipantMeta(p);
    const idPrefix = String(p?.identity || "").split("_")[0];
    // Identity/metadata only — no display-name fallback, since two
    // participants can share the same name and a name match is not proof
    // of identity the way the LiveKit identity prefix or metadata user id is.
    const participantIsHost =
      sameId(idPrefix, hostId) ||
      sameId(meta?.user_id || meta?.userId || meta?.id, hostId);
    const rawRole = String(meta?.role || meta?.user_role || "").toLowerCase();
    const roleLabel = participantIsHost
      ? "Host"
      : rawRole.includes("teacher") ? "Teacher"
        : rawRole.includes("student") ? "Student" : "Student";
    return { isHost: participantIsHost, rawRole, roleLabel };
  };

  const screenShareTrack = trackRefs.find((t) => t.source === Track.Source.ScreenShare && t.publication);
  const cameraTiles = trackRefs.filter((t) => t.source === Track.Source.Camera);

  /* Host first, then teachers, then students, then yourself last */
  const orderedTiles = [...cameraTiles].sort((a, b) => {
    const rank = (t) => {
      const p = t.participant;
      if (p.identity === localId) return isHost ? 0 : 3;
      const { isHost: h, rawRole } = describeParticipant(p);
      if (h) return 0;
      if (rawRole.includes("teacher")) return 1;
      return 2;
    };
    return rank(a) - rank(b);
  });

  const isAlone = orderedTiles.length <= 1;
  const gridCols = Math.max(1, Math.ceil(Math.sqrt(orderedTiles.length || 1)));

  const renderTile = (tr, variant) => {
    const p = tr.participant;
    const isLocalP = p.identity === localId;
    const { isHost: pHost } = describeParticipant(p);
    return (
      <ParticipantTile
        key={p.identity} trackRef={tr} variant={variant} isLocal={isLocalP}
        isHost={isLocalP ? isHost : pHost}
        micOn={!!p.isMicrophoneEnabled} speaking={!!p.isSpeaking}
        handRaised={!!raisedHands[p.identity]} displayName={p.name || p.identity}
      />
    );
  };

  const remoteParticipants = room?.remoteParticipants
    ? Array.from(room.remoteParticipants.values()).map((p) => {
        const { isHost: participantIsHost, roleLabel } = describeParticipant(p);
        return {
          identity: p.identity, name: p.name || p.identity, role: roleLabel,
          micOn: p.isMicrophoneEnabled, camOn: p.isCameraEnabled,
          handRaised: !!raisedHands[p.identity], isHost: participantIsHost, isMe: false,
        };
      })
    : [];

  const peopleList = [
    {
      identity: localId, name: localName, role: isHost ? "Host" : "Student",
      micOn: room?.localParticipant?.isMicrophoneEnabled,
      camOn: room?.localParticipant?.isCameraEnabled,
      handRaised: !!(localId && raisedHands[localId]), isHost, isMe: true,
    },
    ...remoteParticipants,
  ];

  const fullscreenBtn = (
    <button className="gs-video-fs-btn" onClick={toggleFullscreen}
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
      {isFullscreen ? <MdFullscreenExit size={22} /> : <MdFullscreen size={22} />}
    </button>
  );

  return (
    <div
      className={"gs-room" + (isFullscreen ? " gs-room--fs" : "") + (!activePanel ? " gs-room--panel-closed" : "")}
      ref={containerRef}
    >
      {raiseHandToasts.length > 0 && (
        <div className="gs-rh-toasts">
          {raiseHandToasts.map((t) => (
            <div key={t.id} className="gs-rh-toast">
              <span>✋ <strong>{t.displayName || t.identity}</strong> raised their hand</span>
            </div>
          ))}
        </div>
      )}

      <div className="gs-main" style={{ position: "relative" }}>
        {/* Screen 05's single remaining-time pill, stage top-right. Falls
            back to the legacy guest-trial notice (top-center, unchanged)
            only in the narrow window before the room's own cap_ends_at
            exists yet (room hasn't started) — see the state comment above. */}
        <RemainingTimePill ms={remainingMs} recording={!!liveFeatures.recording} />
        {remainingMs == null && groupSessionRemainingMs != null && (
          <div style={{
            position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
            zIndex: 5, background: "rgba(245,158,11,.15)", color: "#b45309",
            border: "1px solid var(--gs-warning, #f59e0b)", borderRadius: 999,
            padding: "4px 14px", fontSize: 12, fontWeight: 700,
          }}>
            Trial: {formatMmSs(groupSessionRemainingMs)} left
          </div>
        )}
        {screenShareTrack ? (
          <div className="gs-stage gs-stage--spotlight">
            <div className="gs-spotlight-main">
              <VideoTrack trackRef={screenShareTrack} />
              <span className="gs-spotlight-label">
                {(screenShareTrack.participant?.name || "Presenter")} · Presenting
              </span>
            </div>
            <div className="gs-filmstrip">
              {orderedTiles.map((tr) => renderTile(tr, "strip"))}
            </div>
            {fullscreenBtn}
          </div>
        ) : (
          <div className="gs-stage gs-stage--grid" data-count={orderedTiles.length} style={{ "--gs-cols": gridCols }}>
            {orderedTiles.map((tr) => renderTile(tr, "grid"))}
            {isAlone && <div className="gs-waiting-pill">Waiting for others to join…</div>}
            {fullscreenBtn}
          </div>
        )}

        <GroupSessionControlBar
          onLeave={onLeave} role={role} activePanel={activePanel}
          onTogglePanel={togglePanel} session={session} isHost={isHost}
          onHostEndSession={onEndSession}
          admitMode={admitMode} onSetAdmitMode={setAdmitModeShared}
          onOpenHostControls={isHost ? () => setHostControlsOpen(true) : null}
        />
      </div>

      {activePanel && (
        <div className="gs-right-sidebar">
          {activePanel === "chat" && (
            <GroupSessionChatPanel messages={chatMessages} onSendMessage={sendMessage} />
          )}

          {activePanel === "notes" && <NotesPanel sessionId={session?.id} sessionType="group" />}

          {activePanel === "files" && (
            <FilesPanel
              sessionId={session?.id}
              isHost={isHost}
              currentUserId={myUserId}
              limits={liveLimits}
              socket={chatSocket}
            />
          )}

          {activePanel === "people" && (
            <div className="gs-ppl-panel">
              <div className="gs-ppl-tabs">
                <button type="button" className={`gs-ppl-tab ${peopleTab === "participants" ? "gs-ppl-tab--active" : ""}`} onClick={() => setPeopleTab("participants")}>
                  Participants ({peopleList.length})
                </button>
                <button type="button" className={`gs-ppl-tab ${peopleTab === "requests" ? "gs-ppl-tab--active" : ""}`} onClick={() => setPeopleTab("requests")}>
                  Join Requests ({joinRequests.length})
                </button>
              </div>

              {peopleTab === "participants" && (
                <div className="gs-ppl-list">
                  {peopleList.length === 0 ? (
                    <p className="gs-ppl-empty">No participants yet.</p>
                  ) : (
                    peopleList.map((p, i) => (
                      <div key={p.identity || i} className={"gs-ppl-card" + (p.isHost ? " gs-ppl-card--host" : "")}>
                        <div className="gs-ppl-avatar">
                          {p.avatarUrl ? <img src={p.avatarUrl} alt={p.name} /> : p.name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div className="gs-ppl-info">
                          <div className="gs-ppl-name">{p.isMe ? "You" : p.name}</div>
                          <div className="gs-ppl-role">{p.role}</div>
                        </div>
                        <div className="gs-ppl-actions">
                          {!p.isMe && (() => {
                            // Entry point for teacher→student remote control
                            // (design screen 06, 01-FLOW.md section E). Only
                            // the affordance + its gating ship in this phase —
                            // NOT the request itself.
                            //
                            // TODO(Phase 6 — remote control): wire onClick to
                            // liveSessionService.requestControl(session.id, targetUserId)
                            // once RemoteControlLayer exists. Deliberately left
                            // unwired here: request_remote_control
                            // (remote_control_views.py) will always 409
                            // "not_sharing" today regardless of this button,
                            // because nothing yet flips
                            // GroupSessionParticipant.is_sharing_screen to True
                            // (no LiveKit screen-share-published webhook wired
                            // for group sessions) — see that view's own module
                            // docstring and 02-BACKEND.md's "Open question".
                            const enabled = iAmTeacher && !!liveFeatures.remote_access;
                            const title = !iAmTeacher
                              ? "Only teachers may request a student's screen"
                              : !liveFeatures.remote_access
                                ? "Remote access is disabled by the admin"
                                : `Ask ${p.name} for screen control`;
                            return (
                              <button
                                type="button"
                                className={"gs-ppl-ask" + (enabled ? "" : " gs-ppl-ask--disabled")}
                                disabled={!enabled}
                                title={title}
                                onClick={() => {}}
                              >
                                {!enabled && (
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                )}
                                Ask
                              </button>
                            );
                          })()}
                          <div className={`gs-ppl-mic ${p.micOn ? "gs-ppl-mic--on" : "gs-ppl-mic--off"}`}>
                            {p.micOn ? (
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
                            ) : (
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/></svg>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {peopleTab === "requests" && (
                <div className="gs-ppl-list">
                  {isHost && (
                    <label className="gs-ppl-card" style={{ cursor: "pointer" }}>
                      <input type="checkbox" checked={admitMode === "lobby"} onChange={toggleAdmitMode} style={{ marginRight: 10 }} />
                      <span className="gs-ppl-info"><span className="gs-ppl-name">Require approval to join</span></span>
                    </label>
                  )}
                  {admitMode !== "lobby" ? (
                    <p className="gs-ppl-empty">Approval is off — anyone with the link joins directly.</p>
                  ) : joinRequests.length === 0 ? (
                    <p className="gs-ppl-empty">No join requests yet.</p>
                  ) : (
                    joinRequests.map((r) => (
                      <div key={r.id} className="gs-ppl-card">
                        <div className="gs-ppl-avatar">{(r.name || "?").charAt(0).toUpperCase()}</div>
                        <div className="gs-ppl-info"><div className="gs-ppl-name">{r.name}</div></div>
                        <div className="gs-ppl-actions" style={{ gap: 8 }}>
                          <button type="button" className="gs-btn-admit" onClick={() => admitRequest(r.id)}
                            style={{ background: "#006d78", color: "#fff", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                            Admit
                          </button>
                          <button type="button" className="gs-btn-deny" onClick={() => denyRequest(r.id)}
                            style={{ background: "transparent", color: "#ef4444", border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                            Deny
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {activePanel === "info" && (
            <div className="gs-info-panel">
              <div className="gs-info-header"><h3>Session Information</h3></div>
              <div className="gs-info-body">
                <div className="gs-info-field"><span className="gs-info-label">Session ID:</span><span className="gs-info-value">{session?.shortCode || session?.id || "—"}</span></div>
                <div className="gs-info-field"><span className="gs-info-label">Session Type:</span><span className="gs-info-value">{session?.sessionType === "instant" ? "Instant Group" : "Study Group"}</span></div>
                <div className="gs-info-field"><span className="gs-info-label">Host:</span><span className="gs-info-value">{session?.hostName || localName || "—"}</span></div>
                <div className="gs-info-gap" />
                <div className="gs-info-field"><span className="gs-info-label">Subject:</span><span className="gs-info-value">{session?.subject || session?.subjectName || "—"}</span></div>
                <div className="gs-info-field"><span className="gs-info-label">Topic:</span><span className="gs-info-value">{session?.topic || "(Entered by Host)"}</span></div>
                <div className="gs-info-gap" />
                <div className="gs-info-field"><span className="gs-info-label">Date:</span><span className="gs-info-value">{formatDate(session?.date)}</span></div>
                <div className="gs-info-field"><span className="gs-info-label">Session Timing:</span><span className="gs-info-value">{formatTiming(session)}</span></div>
              </div>
            </div>
          )}
        </div>
      )}

      {isHost && (
        <HostControlsPanel
          open={hostControlsOpen}
          onClose={() => setHostControlsOpen(false)}
          sessionId={session?.id}
          session={session}
          limits={liveLimits}
          features={liveFeatures}
          capEndsAt={capEndsAt}
          extensionsUsed={extensionsUsed}
          extensionsAllowed={extensionsAllowed}
          onExtended={(data) => {
            setCapEndsAt(data?.cap_ends_at ?? capEndsAt);
            if (typeof data?.extensions_used === "number") setExtensionsUsed(data.extensions_used);
            if (typeof data?.extensions_allowed === "number") setExtensionsAllowed(data.extensions_allowed);
          }}
          admitMode={admitMode}
          onSetAdmitMode={setAdmitModeShared}
          onEndSession={() => {
            setHostControlsOpen(false);
            onEndSession?.();
          }}
        />
      )}

      {endingSoon && (
        <EndingSoonModal
          variant={session?.courseId ? "course" : "general"}
          session={session}
          remainingMs={remainingMs}
          limits={liveLimits}
          urgent={lastMinute}
        />
      )}

      {/* Screen 10 — first-visit tour. Uncontrolled: gated on the admin
          show_tour flag (this check) AND, inside the component itself, on
          localStorage["live.tour.v1"] (01-FLOW.md section C). */}
      {liveFeatures.show_tour && (
        <FirstVisitTour storageKey="live.tour.v1" retentionDays={liveLimits?.file_retention_days} />
      )}
    </div>
  );
}
