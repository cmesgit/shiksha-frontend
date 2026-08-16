/**
 * FILE: src/components/live/FirstVisitTour.jsx  (NEW — design screen 10)
 *
 * "Four things to know before you speak" — the first-visit tour. Copy,
 * layout and animation names are pixel-referenced from
 * design-reference/Live Sessions.dc.html, data-screen-label="10": all four
 * step cards render together in one grid (not a paginated wizard — the
 * reference lays out all four at once), with a dark video-room-style
 * backdrop behind them regardless of which page mounts it.
 *
 * Icons: the mic glyph (Step 1) and the upload glyph (Step 3) are reused
 * verbatim from this same `components/live/` family — GroupSessionControlBar
 * / GroupSessionClassroomUI's mic icon and FilesPanel's dropzone icon,
 * respectively — per README.md's asset note ("icons are inline SVG lifted
 * from GroupSessionControlBar.jsx and HomeIcons.jsx — reuse those components
 * rather than pasting new SVG paths"). Step 2 has no icon in the reference
 * (a mock "Screen · Share" rectangle with a sweeping highlight) and Step 4's
 * progress ring is a small bespoke SVG matching the reference markup, the
 * same way EndingSoonModal.jsx built its own countdown ring.
 *
 * Two call sites, one component:
 *  a) In-room, auto-shown once — mount uncontrolled:
 *       {liveFeatures.show_tour && <FirstVisitTour storageKey="live.tour.v1" />}
 *     The admin `show_tour` feature flag gates whether this ever mounts at
 *     all (caller's job, per 03-FRONTEND.md's wiring example); once mounted,
 *     the component itself gates on localStorage[storageKey] — if the flag
 *     is already set it renders nothing.
 *  b) Standalone, manually triggered — mount controlled from LiveLanding's
 *     existing "Watch the 40-second tour" button/state:
 *       <FirstVisitTour open={tourOpen} onClose={() => setTourOpen(false)} />
 *     No localStorage gate on whether it OPENS (the user explicitly asked),
 *     but closing it still marks the tour as seen, so it won't also pop up
 *     automatically the first time this same browser later joins a room.
 *
 * Every dismiss affordance (Skip tour / Back / "Got it — take me in") closes
 * the same way — there's no multi-step state to preserve since all four
 * cards are always visible together.
 */
import { useState } from "react";
import "../../styles/liveSessions.css";

const STEP_COUNT = 4;

/* Reused verbatim from GroupSessionControlBar.jsx / GroupSessionClassroomUI's
   own MicIcon — same 3-element path set, matching the reference's step-1
   glyph exactly (no separate base line, unlike the control bar's mute
   button, which the reference doesn't draw here either). */
function TourMicIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
    </svg>
  );
}

/* Reused verbatim from FilesPanel.jsx's dropzone icon. */
function TourUploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gs-host)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="gs-tour-bob">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

/* Bespoke progress-ring glyph for step 4, matching the reference's static
   clock mockup (decorative — not a live countdown, same as the reference). */
function TourRingIcon() {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle cx="36" cy="36" r={r} fill="none" stroke="#dce4e7" strokeWidth="8" />
      <circle
        cx="36" cy="36" r={r} fill="none" stroke="var(--gs-primary)" strokeWidth="8"
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * 0.24}
        transform="rotate(-90 36 36)" className="gs-tour-ring-dash"
      />
    </svg>
  );
}

function buildSteps(retentionDays) {
  const days = retentionDays ?? 2;
  return [
    {
      eyebrow: "Step 1",
      title: "Raise your hand to speak",
      copy: "You start muted. Tap Raise and the host allows your mic — then Unmute lights up.",
      media: (
        <div className="gs-tour-media">
          <span className="gs-tour-mic-badge">
            <TourMicIcon />
          </span>
          <span className="gs-tour-mic-pulse" />
        </div>
      ),
    },
    {
      eyebrow: "Step 2",
      title: "Share your screen for doubts",
      copy: "Show your worksheet instead of describing it. Your teacher can then ask to point and type on it.",
      media: (
        <div className="gs-tour-media">
          <span className="gs-tour-screen">
            <span className="gs-tour-screen-sweep" />
          </span>
          <span className="gs-tour-screen-label">Screen · Share</span>
        </div>
      ),
    },
    {
      eyebrow: "Step 3",
      title: "Drop files in the Files panel",
      copy: `Worksheets, photos of your work, corrections. Everyone can upload; files vanish ${days} day${days === 1 ? "" : "s"} after the room closes.`,
      media: (
        <div className="gs-tour-media">
          <span className="gs-tour-upload">
            <TourUploadIcon />
          </span>
        </div>
      ),
    },
    {
      eyebrow: "Step 4",
      title: "Watch the clock, top of the stage",
      copy: "Everyone sees the remaining time. The host can extend it; enrolled learners are never cut off.",
      media: (
        <div className="gs-tour-media">
          <TourRingIcon />
          <span className="gs-tour-ring-label">1:05:42</span>
        </div>
      ),
    },
  ];
}

export default function FirstVisitTour({
  storageKey = "live.tour.v1",
  retentionDays,
  // Controlled mode (standalone, manual trigger from LiveLanding): pass
  // `open` + `onClose`. Omit both for the uncontrolled, auto-shown-once
  // in-room mode, which checks/writes localStorage itself.
  open,
  onClose,
}) {
  const isControlled = typeof open === "boolean";
  // Lazy initializer, not an effect: this is a one-time read of the gate at
  // mount, not a subscription to an external event, so there is nothing to
  // synchronize later — computing it during the initial render (React's own
  // recommended pattern for "read once at mount") avoids the extra
  // effect-triggered render an effect body would otherwise cause.
  const [autoVisible, setAutoVisible] = useState(() => {
    if (isControlled) return false;
    try {
      return !window.localStorage.getItem(storageKey);
    } catch {
      // localStorage unavailable (private-mode/blocked) — fail open so the
      // tour still gets shown at least once this session rather than never.
      return true;
    }
  });

  const visible = isControlled ? open : autoVisible;
  if (!visible) return null;

  const dismiss = () => {
    try {
      window.localStorage.setItem(storageKey, "1");
    } catch {
      /* best-effort — the flag simply won't stick in this browser */
    }
    if (isControlled) onClose?.();
    else setAutoVisible(false);
  };

  const steps = buildSteps(retentionDays);

  return (
    <div className="gs-tour-overlay" role="dialog" aria-modal="true" aria-label="First-visit tour">
      <div className="gs-tour-scrim" onClick={dismiss} />
      <div className="gs-tour-card">
        <div className="gs-tour-head">
          <div>
            <div className="gs-tour-eyebrow">Quick tour · 40 seconds</div>
            <h3 className="gs-tour-title">Four things to know before you speak</h3>
          </div>
          <button type="button" className="gs-tour-skip" onClick={dismiss}>
            Skip tour
          </button>
        </div>

        <div className="gs-tour-grid">
          {steps.map((step) => (
            <div className="gs-tour-step" key={step.eyebrow}>
              {step.media}
              <div className="gs-tour-step-eyebrow">{step.eyebrow}</div>
              <div className="gs-tour-step-title">{step.title}</div>
              <p className="gs-tour-step-copy">{step.copy}</p>
            </div>
          ))}
        </div>

        <div className="gs-tour-footer">
          <div className="gs-tour-dots">
            {Array.from({ length: STEP_COUNT }).map((_, i) => (
              <span key={i} className={"gs-tour-dot" + (i === 0 ? " gs-tour-dot--active" : "")} />
            ))}
            <span className="gs-tour-hint">
              Shown once, on your first session. Reopen it from Info → How to use.
            </span>
          </div>
          <div className="gs-tour-actions">
            <button type="button" className="gs-tour-btn gs-tour-btn--ghost" onClick={dismiss}>
              Back
            </button>
            <button type="button" className="gs-tour-btn gs-tour-btn--primary" onClick={dismiss}>
              Got it — take me in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
