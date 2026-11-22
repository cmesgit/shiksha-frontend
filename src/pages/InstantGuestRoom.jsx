import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LiveKitRoom, RoomAudioRenderer, useRoomContext, useTracks, VideoTrack } from "@livekit/components-react";
import { Track } from "livekit-client";
import instantGuestService, { guestPassKey } from "../api/instantGuestService";
import Navbar from "../components/Navbar";
import "./InstantGuestRoom.css";

function GuestMediaRoom({ name, endsAt }) {
  const room = useRoomContext();
  const [mic, setMic] = useState(false);
  const [camera, setCamera] = useState(false);
  const [sharing, setSharing] = useState(false);
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
    { source: Track.Source.ScreenShare, withPlaceholder: false },
  ], { onlySubscribed: false });

  const toggleMic = async () => {
    await room.localParticipant.setMicrophoneEnabled(!mic);
    setMic(!mic);
  };
  const toggleCamera = async () => {
    await room.localParticipant.setCameraEnabled(!camera);
    setCamera(!camera);
  };
  const toggleShare = async () => {
    await room.localParticipant.setScreenShareEnabled(!sharing);
    setSharing(!sharing);
  };

  return (
    <div className="guest-room">
      <header className="guest-room-header">
        <strong>Live Collaboration</strong>
        <span>{name} · Ends {new Date(endsAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
      </header>
      <div className="guest-room-grid">
        {tracks.map((track) => (
          <div className="guest-room-tile" key={`${track.participant.identity}:${track.source}`}>
            {track.publication && !track.publication.isMuted
              ? <VideoTrack trackRef={track} />
              : <div className="guest-room-avatar">{(track.participant.name || "?").charAt(0).toUpperCase()}</div>}
            <span>{track.participant.name || "Guest"}{track.participant.identity === room.localParticipant.identity ? " (You)" : ""}</span>
          </div>
        ))}
      </div>
      <div className="guest-room-controls">
        <button onClick={toggleMic}>{mic ? "Mute mic" : "Turn on mic"}</button>
        <button onClick={toggleCamera}>{camera ? "Turn off camera" : "Turn on camera"}</button>
        <button onClick={toggleShare}>{sharing ? "Stop sharing" : "Share screen"}</button>
        <button onClick={() => room.disconnect()}>Leave</button>
      </div>
      <RoomAudioRenderer />
    </div>
  );
}

export default function InstantGuestRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pass] = useState(() => sessionStorage.getItem(guestPassKey(id)));
  const [state, setState] = useState("pending");
  const [info, setInfo] = useState(null);
  const [connection, setConnection] = useState(null);
  const [error, setError] = useState("");
  const autoJoinStarted = useRef(false);
  const currentStatus = useRef("pending");

  const connect = useCallback(async () => {
    if (!pass) return;
    try {
      const data = await instantGuestService.join(id, pass);
      if (currentStatus.current !== "admitted") return;
      setConnection(data);
      setState("connected");
      setError("");
    } catch (err) {
      setError(err?.response?.data?.detail || "Could not join this collaboration.");
    }
  }, [id, pass]);

  useEffect(() => {
    if (!pass) return undefined;
    let stopped = false;
    const poll = async () => {
      try {
        const data = await instantGuestService.status(id, pass);
        if (stopped) return;
        currentStatus.current = data.status;
        setInfo(data);
        if (data.status === "admitted") {
          setState((old) => old === "pending" ? "admitted" : old);
          if (!autoJoinStarted.current) {
            autoJoinStarted.current = true;
            connect();
          }
        } else {
          setState(data.status);
          setConnection(null);
        }
      } catch (err) {
        if (!stopped) setError(err?.response?.data?.detail || "Guest pass could not be checked.");
      }
    };
    poll();
    const timer = setInterval(poll, 3000);
    return () => { stopped = true; clearInterval(timer); };
  }, [id, pass, connect]);

  if (!pass) return (
    <div className="guest-wait"><Navbar /><main><h1>Guest pass missing</h1><p>Enter the room code again to request access.</p><button onClick={() => navigate("/live")}>Back to Collab</button></main></div>
  );

  return (
    <div className="guest-wait">
      {!connection && <Navbar />}
      {connection && state === "connected" ? (
        <LiveKitRoom token={connection.token} serverUrl={connection.livekit_url}
          connect audio={false} video={false}
          onDisconnected={() => {
            setConnection(null);
            setState((old) => old === "connected" ? "disconnected" : old);
          }}>
          <GuestMediaRoom name={connection.name} endsAt={connection.ends_at} />
        </LiveKitRoom>
      ) : (
        <main>
          <h1>{state === "pending" ? "Waiting for host approval" :
            state === "denied" ? "The host declined your request" :
              state === "removed" ? "The host removed you" :
                state === "ended" ? "This collaboration has ended" :
                  state === "disconnected" ? "Disconnected" : "Joining collaboration…"}</h1>
          <p>{info?.topic || "Live Collaboration"}</p>
          {error && <p role="alert">{error}</p>}
          {(state === "disconnected" || (state === "admitted" && error)) &&
            <button onClick={connect}>Reconnect</button>}
          <button onClick={() => navigate("/live")}>Back to Collab</button>
        </main>
      )}
    </div>
  );
}
