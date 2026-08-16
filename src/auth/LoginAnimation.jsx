/* LoginAnimation.jsx — the "welcome back" brand-panel animation for Login.
   ────────────────────────────────────────────────────────────────
   Port of the handoff's "LoginAnimation3" component (reference/LoginAnimation3.dc.html,
   imported by reference/SignUp3 Login.dc.html) — a separate illustration from
   Signup's three-role IntroAnimation, cross-fading through three beats in place
   rather than panning between stacked stations:
     1. door + key + shield   — "welcome back", secure sign-in
     2. courses + progress    — pick up where you left off
     3. booking + tutor       — book your next session
   Login is always the "student" accent (README: "student ... and all of log
   in"), so — like the reference — this hardcodes the teal/amber illustration
   palette rather than taking an accent prop. */
import { useEffect, useRef, useState } from "react";
import PARTS from "./illoParts.js";
import "./LoginAnimation.css";

const ANCHOR = { student: [439, 448], tutor: [212, 382], windows: [355, 170] };
const TEAL = "#0f9d6b";
const AMBER = "#ffb21d";
const INK = "#0b2e20";

function place(a, x, y, s, { flip = false, o = 1 } = {}) {
  return {
    transform:
      `translate(${x}px, ${y}px) scale(${s})${flip ? " scale(-1,1)" : ""}` +
      ` translate(${-a[0]}px, ${-a[1]}px)`,
    transformOrigin: "0 0",
    opacity: o,
    transition: "transform 1.25s cubic-bezier(.4,0,.2,1), opacity .9s ease",
  };
}

function Part({ name, recolor }) {
  let html = PARTS[name];
  if (!html) return null;
  if (recolor) for (const [from, to] of recolor) html = html.replace(new RegExp(from, "gi"), to);
  return <g dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function LoginAnimation({ beat = -1, loopSeconds = 21 }) {
  const [n, setN] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    clearInterval(timer.current);
    if (beat >= 0) { setN(Math.min(2, beat)); return undefined; }
    timer.current = setInterval(
      () => setN((s) => (s + 1) % 3),
      (loopSeconds * 1000) / 3,
    );
    return () => clearInterval(timer.current);
  }, [beat, loopSeconds]);

  const on = (i) => ({ opacity: n === i ? 1 : 0, transition: "opacity .95s ease", pointerEvents: "none" });
  const pop = (i, x, y, s, delay) => ({
    transform: `translate(${x}px, ${y}px) scale(${n === i ? s : s * 0.55})`,
    transformOrigin: "0 0",
    opacity: n === i ? 1 : 0,
    transition: `transform 1s cubic-bezier(.34,1.35,.5,1) ${delay}s, opacity .8s ease ${delay}s`,
  });
  const fade = (i, x, y, s, delay) => ({
    transform: `translate(${x}px, ${y}px) scale(${s})`,
    transformOrigin: "0 0",
    opacity: n === i ? 1 : 0,
    transition: `opacity .85s ease ${delay}s`,
  });

  /* A persistent "you" figure that repositions between beats, giving the
     three scenes a sense of one continuous return visit rather than three
     unrelated illustrations. */
  let member;
  if (n === 0) member = place(ANCHOR.student, 330, 600, 0.72, { flip: true });
  else if (n === 1) member = place(ANCHOR.student, 148, 604, 0.66);
  else member = place(ANCHOR.student, 336, 606, 0.5, { flip: true, o: 0 });

  const dotX = n === 0 ? -43 : n === 1 ? -13 : 17;

  return (
    <div className="af-login-anim">
      <svg viewBox="0 0 500 700" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <ellipse cx="250" cy="352" rx="186" ry="186" fill="#ffffff" opacity=".5" />
        <ellipse cx="250" cy="352" rx="144" ry="144" fill="#ffffff"
          style={{ transformOrigin: "250px 352px" }} className="la-halo" />
        <ellipse cx="250" cy="622" rx="192" ry="28" fill="#cfe8da" opacity=".8" />

        {/* ── 1 · welcome back / secure sign-in ── */}
        <g style={on(0)}>
          <g style={fade(0, 176, 356, 0.95, 0.1)}>
            <rect x="-54" y="-78" width="108" height="156" rx="15" fill="#fff" />
            <rect x="-36" y="-57" width="72" height="114" rx="11" fill={TEAL} opacity=".16" />
            <circle cx="23" cy="4" r="6.5" fill={AMBER} />
          </g>
          <g style={pop(0, 286, 288, 1, 0.45)}>
            <g className="la-float">
              <circle cx="-15" cy="0" r="14" fill="none" stroke={AMBER} strokeWidth="6.5" />
              <path d="M-1 0 h32 M24 0 v11 M31 0 v13" stroke={AMBER} strokeWidth="6.5" strokeLinecap="round" />
            </g>
          </g>
          <g style={fade(0, 146, 250, 0.95, 0.65)}>
            <g className="la-float-slow">
              <path d="M0 -26 l24 10 v16 c0 15 -10 26 -24 32 c-14 -6 -24 -17 -24 -32 v-16 z"
                fill="#fff" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
              <path d="M-9 2 l6 7 12 -14" fill="none" stroke={TEAL} strokeWidth="4"
                strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        </g>

        {/* ── 2 · pick up where you left off ── */}
        <g style={on(1)}>
          <g style={place(ANCHOR.windows, 268, 320, 0.8, { o: n === 1 ? 1 : 0 })}>
            <g className="la-float"><Part name="windows" /></g>
          </g>
          <g style={fade(1, 250, 232, 0.95, 0.35)}>
            <g className="la-float-slow">
              <rect x="-72" y="-28" width="144" height="56" rx="16" fill="#fff" />
              <rect x="-52" y="-10" width="112" height="9" rx="4.5" fill={TEAL} opacity=".2" />
              <rect x="-52" y="-10" width="68" height="9" rx="4.5" fill={TEAL} />
              <rect x="-52" y="8" width="40" height="7" rx="3.5" fill={INK} opacity=".25" />
              <circle cx="50" cy="11" r="8" fill={AMBER} style={{ transformOrigin: "50px 11px" }} className="la-blip" />
            </g>
          </g>
          <g style={pop(1, 344, 402, 1, 0.6)}>
            <g className="la-float">
              <circle cx="0" cy="0" r="25" fill="#fff" stroke={INK} strokeWidth="2.4" />
              <path d="M-7 -11 l17 11 -17 11 z" fill={TEAL} />
            </g>
          </g>
          <path d="M170 470 C 208 424, 268 424, 306 466" fill="none" stroke={TEAL} strokeWidth="3.4"
            strokeLinecap="round" strokeDasharray="2 14" opacity=".5" className="la-dash" />
        </g>

        {/* ── 3 · book your next session ── */}
        <g style={on(2)}>
          <g style={fade(2, 250, 226, 0.95, 0.3)}>
            <g className="la-float">
              <rect x="-84" y="-34" width="168" height="68" rx="17" fill="#fff" />
              <circle cx="-52" cy="0" r="16" fill="#12b3a6" opacity=".25" />
              <rect x="-26" y="-14" width="66" height="8" rx="4" fill={INK} opacity=".3" />
              <rect x="-26" y="2" width="38" height="8" rx="4" fill={TEAL} />
              <circle cx="62" cy="-19" r="8.5" fill={AMBER} />
            </g>
          </g>
          <path d="M186 476 C 224 432, 280 432, 318 474" fill="none" stroke={AMBER} strokeWidth="3.4"
            strokeLinecap="round" strokeDasharray="2 13" className="la-dash" />
          <g style={n === 2 ? place(ANCHOR.tutor, 176, 566, 0.6) : place(ANCHOR.tutor, 250, 566, 0.5, { o: 0 })}>
            <g className="la-float"><Part name="tutor" /></g>
          </g>
          <g style={place(ANCHOR.student, 322, 596, 0.44, { flip: true, o: n === 2 ? 1 : 0 })}>
            <g className="la-breathe"><Part name="student" recolor={[["#ffb21d", TEAL]]} /></g>
          </g>
        </g>

        <g style={member}>
          <g className="la-breathe"><Part name="student" /></g>
        </g>

        {/* beat rail */}
        <g transform="translate(250,662)">
          <rect x={dotX} y="-4" width="26" height="8" rx="4" fill={TEAL} className="la-dotpill" />
          <circle cx="-30" cy="0" r="4" fill={TEAL} opacity=".3" />
          <circle cx="0" cy="0" r="4" fill={TEAL} opacity=".3" />
          <circle cx="30" cy="0" r="4" fill={TEAL} opacity=".3" />
        </g>
      </svg>
    </div>
  );
}
