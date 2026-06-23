/* AuthKit.jsx — shared primitives for the Login/Signup flow.
   ────────────────────────────────────────────────────────────────
   Faithful to the "Login Flow" design: the per-role accent palette,
   the brand panel, status chips, option rows, fields and action bar.
   Login.jsx and Signup.jsx compose these so the chrome stays identical
   across both. */
import { Link } from "react-router-dom";
import shikshaLogo from "../assets/Shiksha.png";
import "./AuthFlow.css";

/* ── Per-role accent palette (verbatim from the design) ── */
export const PALETTE = {
  neutral:  { a: "#0E8F7E", soft: "#E6F4F1" },
  student:  { a: "#138A6B", soft: "#E4F3EC" },
  guest:    { a: "#D85F45", soft: "#FBEAE4" },
  faculty:  { a: "#2F6BD8", soft: "#E7EEFB" },
  admin:    { a: "#C2841C", soft: "#FAF0DC" },
  decision: { a: "#6B58D3", soft: "#ECE8FB" },
  danger:   { a: "#D14343", soft: "#FBE7E7" },
  success:  { a: "#3B9A57", soft: "#E7F4EB" },
};

/* ── Icon set (stroke paths from the design's P map) ── */
const P = {
  spark: ["M12 3v3","M12 18v3","M3 12h3","M18 12h3","M5.6 5.6l2.1 2.1","M16.3 16.3l2.1 2.1","M18.4 5.6l-2.1 2.1","M7.7 16.3l-2.1 2.1","M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"],
  cap:   ["M22 9L12 5 2 9l10 4 10-4z","M6 11.5V16a6 6 0 0 0 12 0v-4.5","M22 9v5"],
  lock: ["M6 11h12v9H6z","M9 11V8a3 3 0 0 1 6 0v3"],
  video: ["M3 7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z","M15 10l6-3v10l-6-3z"],
  check: ["M5 12.5l4.5 4.5L20 6.5"],
  x: ["M6 6l12 12","M18 6L6 18"],
  calendar: ["M4 6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14H4z","M4 9h16","M8 3v4","M16 3v4"],
  shield: ["M12 3l8 3v5c0 4.5-3.2 8-8 10-4.8-2-8-5.5-8-10V6z","M9 12l2 2 4-4"],
  mail: ["M3 6h18v12H3z","M3 7l9 6 9-6"],
  book: ["M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2z","M5 18a2 2 0 0 1 2-2h11"],
  compass: ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z","M15.5 8.5l-2 5-5 2 2-5z"],
  gear: ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M19 12a7 7 0 0 0-.1-1l2-1.6-2-3.4-2.4 1a7 7 0 0 0-1.7-1L16.4 2h-4l-.4 2.4a7 7 0 0 0-1.7 1l-2.4-1-2 3.4L8 11a7 7 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 1.7 1l.4 2.4h4l.4-2.4a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6c.1-.3.1-.7.1-1z"],
  users: ["M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1","M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z","M21 19v-1a4 4 0 0 0-3-3.9","M16 4.1a3.5 3.5 0 0 1 0 6.8"],
  clipboard: ["M9 4h6v3H9z","M9 5.5H6V20h12V5.5h-3","M9 11h6","M9 15h4"],
  file: ["M7 3h7l4 4v14H7z","M14 3v4h4","M10 13h5","M10 17h5"],
  clock: ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z","M12 7.5V12l3 2"],
  eye: ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z","M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
  eyeOff: ["M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94","M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19","M14.12 14.12a3 3 0 1 1-4.24-4.24","M1 1l22 22"],
  plus: ["M12 5v14","M5 12h14"],
  clock2: ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z","M12 7v5l3 3"],
};

export function Icon({ name, size = 22, color = "currentColor", strokeWidth = 1.7 }) {
  const d = P[name] || [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {d.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

/* ════════════════════════════════════════════
   Shell — split panel with role-driven accent
════════════════════════════════════════════ */
export function AuthShell({ role = "neutral", flowLabel, brandIcon = "spark", children }) {
  const pal = PALETTE[role] || PALETTE.neutral;
  return (
    <div className="af" style={{ "--a": pal.a, "--soft": pal.soft }}>
      {/* LEFT — brand panel */}
      <div className="af-brand">
        <div className="af-brand__logo">
          <img className="af-brand__logo-mark" src={shikshaLogo} alt="" />
          ShikshaCom
        </div>
        <div className="af-brand__body">
          <div className="af-brand__icon"><Icon name={brandIcon} size={26} color="#fff" /></div>
          <h2 className="af-brand__headline">
            Learn from expert tutors — or teach what you love.
          </h2>
          <p className="af-brand__desc">
            One account for learning and teaching, with secure sign-in
            across all your profiles and devices.
          </p>
        </div>
        <div className="af-brand__flow">{flowLabel}</div>
      </div>

      {/* RIGHT — content panel */}
      <div className="af-panel">
        <div className="af-panel__inner">{children}</div>
      </div>
    </div>
  );
}

/* ── Status icon chip (the rounded square at the top of result screens) ── */
export function StatusChip({ icon, role = "neutral" }) {
  const pal = PALETTE[role] || PALETTE.neutral;
  return (
    <div className="af-status" style={{ background: pal.soft }}>
      <Icon name={icon} size={28} color={pal.a} />
    </div>
  );
}

/* ── Text field ── */
export function Field({ label, ...props }) {
  return (
    <div className="af-field">
      <label htmlFor={props.id}>{label}</label>
      <input {...props} />
    </div>
  );
}

/* ── Password field with reveal toggle ── */
export function PasswordField({ label, show, onToggle, ...props }) {
  return (
    <div className="af-field">
      <label htmlFor={props.id}>{label}</label>
      <div className="af-pw">
        <input type={show ? "text" : "password"} {...props} />
        <button type="button" className="af-pw__toggle" tabIndex={-1} onClick={onToggle}
          aria-label={show ? "Hide password" : "Show password"}>
          <Icon name={show ? "eyeOff" : "eye"} size={18} />
        </button>
      </div>
    </div>
  );
}

/* ── Option row (the tappable › cards on decision screens) ── */
export function Option({ label, sub, dot, active, onClick }) {
  return (
    <button type="button" className={`af-option ${active ? "af-option--active" : ""}`} onClick={onClick}>
      <span className="af-option__dot" style={{ background: dot }} />
      <span className="af-option__body">
        <span className="af-option__label">{label}</span>
        {sub && <span className="af-option__sub">{sub}</span>}
      </span>
      <span className="af-option__chev">›</span>
    </button>
  );
}

/* ── Tile grid (2 or 3 column icon cards — matches design's choice/tile screens) ── */
export function TileChoice({ cols = 2, options }) {
  return (
    <div className={`af-tiles af-tiles--c${cols}`}>
      {options.map((o) => (
        <button key={o.key} type="button" className="af-tile" onClick={o.onClick}>
          <div className="af-tile__icon" style={{ background: o.color + "22", color: o.color }}>
            {o.icon}
          </div>
          <div className="af-tile__label">{o.label}</div>
          {o.sub && <div className="af-tile__sub">{o.sub}</div>}
        </button>
      ))}
    </div>
  );
}

/* ── Footer link line ── */
export function FooterLink({ children }) {
  return <p className="af-footer">{children}</p>;
}

export { Link };
