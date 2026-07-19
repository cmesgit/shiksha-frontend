import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  HOME_URL, LOGIN_URL, APP_DASHBOARD_URL,
  TEACHER_DASHBOARD_URL, TEACHER_ACADEMY_URL, TEACHER_SKILL_URL,
  signupAddTrackUrl,
} from "../config/urls";
import "./ProfilePicker.css";

/* ════════════════════════════════════════════════════════════════
   ProfilePicker — the "who am I right now" switchboard.

   Learner tiles (people) + one Teaching tile (a mode). For teachers
   approved on BOTH tracks, choosing Teaching reveals a second step:
   pick the dashboard (Academy or Skill Dev). A track still in admin
   review shows an "In review" note; a track never applied for shows
   an "Apply" link that deep-links to the add-a-track signup.
════════════════════════════════════════════════════════════════ */

const TRACK_NAME = { academy: "Academy", skill: "Skill Dev" };
const ALL_TRACKS = ["academy", "skill"];

const Avatar = ({ profile }) => {
  if (profile.avatar_type === "image" && profile.avatar) {
    return <img className="pp-avatar" src={profile.avatar} alt="" />;
  }
  const initial = (profile.display_name || "?").trim().charAt(0).toUpperCase();
  return (
    <div className="pp-avatar pp-avatar-fallback">
      {profile.avatar_type === "emoji" && profile.avatar ? profile.avatar : initial}
    </div>
  );
};

const ProfilePicker = () => {
  const {
    profiles, teacherInfo, context, isAuthenticated, loading,
    selectProfile, enterTeacherMode, setProfilePin,
  } = useAuth();
  const navigate = useNavigate();

  const [pinFor, setPinFor]   = useState(null); // profile id awaiting a PIN
  const [pin, setPin]         = useState("");
  const [busy, setBusy]       = useState(false);
  const [error, setError]     = useState("");
  const [forgotFor, setForgotFor] = useState(null); // profile id resetting its PIN
  const [resetPin, setResetPin]   = useState("");
  const [resetPw, setResetPw]     = useState("");
  const [leaving, setLeaving] = useState(null); // label shown during fade-out before redirect

  // Teacher-mode: reveal password, then (if 2 approved tracks) choose a dashboard.
  const [teachPwVisible, setTeachPwVisible] = useState(false);
  const [teachPw, setTeachPw]               = useState("");
  const [chooseTrack, setChooseTrack]       = useState(false);

  const approved = teacherInfo?.approved_tracks || [];
  const pending  = teacherInfo?.pending_tracks  || [];
  const locked   = ALL_TRACKS.filter((t) => !approved.includes(t) && !pending.includes(t));

  // Bounce out if there's no account session, or a context is already chosen.
  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      window.location.href = LOGIN_URL;
    } else if (context === "learner") {
      window.location.href = APP_DASHBOARD_URL;
    } else if (context === "teacher") {
      window.location.href = TEACHER_DASHBOARD_URL;
    }
  }, [loading, isAuthenticated, context]);

  // A profile/track choice ends in a full-page navigation. Play a short
  // fade-out + "Opening…" state first so the hard jump doesn't feel abrupt.
  const fadeThenGo = (url, label) => {
    setLeaving(label || "Opening…");
    window.setTimeout(() => { window.location.href = url; }, 340);
  };
  const goLearner = (name) =>
    fadeThenGo(APP_DASHBOARD_URL, name ? `Opening ${name}'s space…` : "Opening…");
  const goTeacherTrack = (track) =>
    fadeThenGo(
      track === "academy" ? TEACHER_ACADEMY_URL : TEACHER_SKILL_URL,
      `Opening ${TRACK_NAME[track]}…`
    );

  // Forgot PIN → reset with the account password (no old PIN), then open.
  const resetAndGo = async (profile) => {
    setError("");
    if (!/^\d{4,6}$/.test(resetPin)) { setError("PIN must be 4–6 digits."); return; }
    if (!resetPw) { setError("Enter your account password."); return; }
    setBusy(true);
    try {
      await setProfilePin(profile.id, resetPin, resetPw);
      await selectProfile(profile.id, resetPin);
      goLearner(profile.display_name);
    } catch (err) {
      setError(err?.message || "Could not reset the PIN.");
      setBusy(false);
    }
  };

  const choose = async (profile) => {
    setError("");
    if (profile.requires_pin && pinFor !== profile.id) {
      setPinFor(profile.id);
      setForgotFor(null);
      setPin("");
      return;
    }
    setBusy(true);
    try {
      await selectProfile(profile.id, profile.requires_pin ? pin : undefined);
      goLearner(profile.display_name);
    } catch (err) {
      setError(err?.message || "Could not open that profile.");
      setBusy(false);
    }
  };

  // First click reveals the password; with two approved tracks the next click
  // opens the dashboard chooser; otherwise it enters the single approved track.
  const teach = async () => {
    setError("");
    if (approved.length === 0) {
      setError(pending.length
        ? "Your teacher application is still in review."
        : "No approved teaching track yet.");
      return;
    }
    if (!teachPwVisible) { setTeachPwVisible(true); setTeachPw(""); return; }
    if (!teachPw) return;
    if (approved.length >= 2 && !chooseTrack) { setChooseTrack(true); return; }
    await doEnterTeacher(approved[0]);
  };

  const doEnterTeacher = async (track) => {
    setBusy(true);
    try {
      const result = await enterTeacherMode(teachPw, track);
      if (result?.needsSignup)  { setError("No teacher identity found on this account."); setBusy(false); return; }
      if (result?.notApproved)  { setError("Your teacher account is awaiting approval."); setBusy(false); return; }
      if (result?.trackPending) { setError("That track is still in review."); setBusy(false); return; }
      if (result?.trackLocked)  { setError("You haven't been assigned to that track yet."); setBusy(false); return; }
      goTeacherTrack(track);
    } catch (err) {
      setError(err?.message || "Incorrect password.");
      setTeachPw(""); setBusy(false);
    }
  };

  const teacherSubtitle = () => {
    if (approved.length >= 2) return "Academy + Skill Dev";
    if (approved.length === 1) return TRACK_NAME[approved[0]];
    if (pending.length) return `${TRACK_NAME[pending[0]]} — in review`;
    return "Teaching";
  };

  // While the account session resolves, show a calm loader instead of a
  // flash of an empty "Who's learning?" grid that then pops full.
  if (loading || !isAuthenticated || context === "learner" || context === "teacher") {
    return (
      <div className="pp-container">
        <div className="pp-loading">
          <div className="pp-spinner" />
          <p>{leaving || "Loading…"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`pp-container${leaving ? " pp-container--leaving" : ""}`}>
      {leaving && (
        <div className="pp-leaving" role="status" aria-live="polite">
          <div className="pp-spinner" />
          <p>{leaving}</p>
        </div>
      )}
      <div className="pp-inner">
        <h1 className="pp-title pp-fade-in">Who&apos;s learning?</h1>

        {error && <p className="pp-error pp-fade-in">{error}</p>}

        <div className="pp-grid">
          {profiles.map((p, i) => (
            <div
              key={p.id}
              className="pp-card pp-card--enter"
              style={{ animationDelay: `${i * 55}ms` }}
            >
              <button
                type="button"
                className="pp-card-btn"
                disabled={busy}
                onClick={() => choose(p)}
              >
                <Avatar profile={p} />
                <span className="pp-name">{p.display_name}</span>
                {p.relationship === "DEPENDENT" && <span className="pp-tag">Child</span>}
                {p.requires_pin && <span className="pp-lock">🔒</span>}
              </button>

              {pinFor === p.id && p.requires_pin && forgotFor !== p.id && (
                <div className="pp-pin-row pp-reveal">
                  <input
                    className="pp-pin"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="PIN"
                    value={pin}
                    autoFocus
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                    onKeyDown={(e) => e.key === "Enter" && choose(p)}
                    disabled={busy}
                  />
                  <button className="pp-pin-go" disabled={busy || pin.length < 4} onClick={() => choose(p)}>
                    Go
                  </button>
                  <button type="button" className="pp-forgot"
                    onClick={() => { setForgotFor(p.id); setResetPin(""); setResetPw(""); setError(""); }}>
                    Forgot PIN?
                  </button>
                </div>
              )}

              {forgotFor === p.id && (
                <div className="pp-pin-row pp-reveal" style={{ flexWrap: "wrap", gap: 8, width: "min(240px, 78vw)" }}>
                  <input
                    className="pp-pin" inputMode="numeric" maxLength={6} placeholder="New PIN"
                    value={resetPin} autoFocus disabled={busy}
                    onChange={(e) => setResetPin(e.target.value.replace(/\D/g, ""))}
                  />
                  <input
                    className="pp-pin" type="password" autoComplete="current-password"
                    placeholder="Account password" value={resetPw} disabled={busy}
                    style={{ letterSpacing: "normal" }}
                    onChange={(e) => setResetPw(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && resetAndGo(p)}
                  />
                  <button className="pp-pin-go" disabled={busy} onClick={() => resetAndGo(p)}>
                    Reset &amp; open
                  </button>
                  <button type="button" className="pp-forgot" onClick={() => setForgotFor(null)}>
                    Back
                  </button>
                </div>
              )}
            </div>
          ))}

          {teacherInfo && (
            <div
              className="pp-card pp-card--enter"
              style={{ animationDelay: `${profiles.length * 55}ms` }}
            >
              <button
                type="button"
                className="pp-card-btn pp-teach"
                disabled={busy}
                onClick={teach}
              >
                <div className="pp-avatar pp-avatar-fallback pp-teach-avatar">T</div>
                <span className="pp-name">Teaching</span>
                <span className="pp-tag">{teacherSubtitle()}</span>
              </button>

              {/* Step 1: account password */}
              {teachPwVisible && !chooseTrack && (
                <div className="pp-pin-row pp-reveal">
                  <input
                    className="pp-pin"
                    type="password"
                    placeholder="Password"
                    value={teachPw}
                    autoFocus
                    onChange={(e) => setTeachPw(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && teach()}
                    disabled={busy}
                  />
                  <button
                    className="pp-pin-go"
                    disabled={busy || teachPw.length < 1}
                    onClick={teach}
                  >
                    {approved.length >= 2 ? "Next" : "Go"}
                  </button>
                </div>
              )}

              {/* Step 2 (both tracks): choose which dashboard */}
              {chooseTrack && (
                <div className="pp-track-choose pp-reveal">
                  <p className="pp-track-choose__label">Open which dashboard?</p>
                  {approved.map((t) => (
                    <button key={t} className="pp-track-btn" disabled={busy}
                      onClick={() => doEnterTeacher(t)}>
                      {TRACK_NAME[t]}
                    </button>
                  ))}
                </div>
              )}

              {/* Track still in admin review */}
              {pending.map((t) => (
                <p key={t} className="pp-track-note">{TRACK_NAME[t]} — in review</p>
              ))}

              {/* Track never applied for → deep-link to add-a-track signup */}
              {locked.map((t) => (
                <a key={t} className="pp-track-apply" href={signupAddTrackUrl(t)}>
                  + Apply for {TRACK_NAME[t]}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePicker;
