/* IntroAnimation.jsx — the three-station signup intro.
   ────────────────────────────────────────────────────────────────
   Port of the "IntroAnimationC" design component. One tall SVG holds
   three 520-unit stations (Student / Skill Expert / Academic Faculty)
   stacked vertically; the group pans between them on a timer while the
   rail on the right tracks which one is showing.

   The character/prop artwork comes from illoParts.js (fragments lifted
   out of the Freepik illustrations already in src/assets/home). Each
   fragment is positioned with place(), which first undoes the part's
   own anchor offset so the numbers below read as "put it *here*". */
import { useEffect, useRef, useState } from "react";
import PARTS from "./illoParts.js";
import "./IntroAnimation.css";

/* Anchor = the point inside each source fragment that place() pins. */
const ANCHOR = {
  student: [439, 448],
  tutor:   [212, 382],
  windows: [355, 170],
  cap:     [373, 206],
};

const FONT = "var(--font-head, 'Plus Jakarta Sans', system-ui, sans-serif)";
const STATION_H = 520;

function place(a, x, y, s, { flip = false } = {}) {
  return {
    transform:
      `translate(${x}px, ${y}px) scale(${s})${flip ? " scale(-1,1)" : ""}` +
      ` translate(${-a[0]}px, ${-a[1]}px)`,
    transformOrigin: "0 0",
  };
}

/* Injects a raw fragment, optionally swapping hard-coded fills so the same
   artwork can stand in for a second character. */
function Part({ name, recolor }) {
  let html = PARTS[name];
  if (!html) return null;
  if (recolor) for (const [from, to] of recolor) html = html.replace(new RegExp(from, "gi"), to);
  return <g dangerouslySetInnerHTML={{ __html: html }} />;
}

function Caption({ n, title, lines, ink, inkSoft, accent, onDark }) {
  return (
    <g transform="translate(30,36)">
      <circle cx="18" cy="18" r="18" fill={onDark} />
      <text x="18" y="24" textAnchor="middle" style={{ fontFamily: FONT }}
        fontSize="18" fontWeight="800" fill={accent}>{n}</text>
      <text x="50" y="15" style={{ fontFamily: FONT }}
        fontSize="18" fontWeight="800" fill={ink}>{title}</text>
      {lines.map((l, i) => (
        <text key={i} x="50" y={38 + i * 18} style={{ fontFamily: FONT }}
          fontSize="13.5" fontWeight="500" fill={inkSoft}>{l}</text>
      ))}
    </g>
  );
}

export default function IntroAnimation({
  accent = "#0E8F7E",
  station = -1,      // >= 0 pins a single station instead of cycling
  loopSeconds = 21,
}) {
  const [i, setI] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    clearInterval(timer.current);
    if (station >= 0) { setI(Math.min(2, station)); return undefined; }
    timer.current = setInterval(
      () => setI((s) => (s + 1) % 3),
      (loopSeconds * 1000) / 3,
    );
    return () => clearInterval(timer.current);
  }, [station, loopSeconds]);

  const onDark = "#ffffff";
  const ink = "#ffffff";
  const inkSoft = "rgba(255,255,255,.82)";

  const dashed = {
    stroke: onDark, strokeWidth: 2.6, strokeLinecap: "round",
    strokeDasharray: "2 12", opacity: 0.35,
  };

  return (
    <div className="af-intro">
      <svg viewBox="0 0 400 520" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <g style={{
          transform: `translateY(${-i * STATION_H}px)`,
          transition: "transform 1.15s cubic-bezier(.6,0,.2,1)",
        }}>
          {/* connector dashes between stations */}
          <path d="M200 486 V 574" fill="none" {...dashed} className="af-intro__dash" />
          <path d="M200 1006 V 1094" fill="none" {...dashed} className="af-intro__dash" />

          {/* ── 1 · Student ── */}
          <g>
            <circle cx="212" cy="316" r="128" fill={onDark} opacity=".13" />
            <ellipse cx="200" cy="476" rx="140" ry="16" fill={onDark} opacity=".16" />
            <g style={place(ANCHOR.windows, 244, 262, 0.6)}>
              <g className="af-intro__float"><Part name="windows" /></g>
            </g>
            <g style={place([0, 0], 314, 176, 1)}>
              <g className="af-intro__float-slow">
                <circle cx="0" cy="0" r="23" fill="#fff" stroke={accent} strokeWidth="2.4" />
                <path d="M-6 -10 l15 10 -15 10 z" fill={accent} />
              </g>
            </g>
            <g style={place([0, 0], 96, 336, 0.86)}>
              <g className="af-intro__float">
                <rect x="-52" y="-16" width="104" height="32" rx="16" fill="#fff" stroke={accent} strokeWidth="2.2" />
                <path d="M-32 0 l6 7 12 -14" fill="none" stroke={accent} strokeWidth="3.6"
                  strokeLinecap="round" strokeLinejoin="round" />
                <rect x="-6" y="-4" width="34" height="8" rx="4" fill={accent} opacity=".35" />
              </g>
            </g>
            <g style={place(ANCHOR.student, 128, 470, 0.58)}>
              <g className="af-intro__breathe"><Part name="student" /></g>
            </g>
            <Caption n="1" title="Student"
              lines={["Take courses and learn from", "expert tutors you book yourself."]}
              {...{ ink, inkSoft, accent, onDark }} />
          </g>

          {/* ── 2 · Skill Expert / Tutor ── */}
          <g transform={`translate(0,${STATION_H})`}>
            <circle cx="196" cy="316" r="128" fill={onDark} opacity=".13" />
            <ellipse cx="200" cy="476" rx="140" ry="16" fill={onDark} opacity=".16" />
            <g style={place([0, 0], 214, 248, 0.92)}>
              <g className="af-intro__float">
                <rect x="-78" y="-34" width="156" height="68" rx="16" fill="#fff" stroke={accent} strokeWidth="2.2" />
                <circle cx="-48" cy="0" r="16" fill={accent} opacity=".18" />
                <rect x="-24" y="-14" width="64" height="8" rx="4" fill={ink} opacity=".35" />
                <rect x="-24" y="2" width="38" height="8" rx="4" fill={accent} />
                <g transform="translate(46,6)" fill="#FFB21D">
                  <path d="M-14 0 l2.6 5.2 5.4.8 -4 3.9 1 5.6 -5 -2.7 -5 2.7 1 -5.6 -4 -3.9 5.4 -.8 z" />
                  <path d="M0 0 l2.6 5.2 5.4.8 -4 3.9 1 5.6 -5 -2.7 -5 2.7 1 -5.6 -4 -3.9 5.4 -.8 z" />
                  <path d="M14 0 l2.6 5.2 5.4.8 -4 3.9 1 5.6 -5 -2.7 -5 2.7 1 -5.6 -4 -3.9 5.4 -.8 z" />
                </g>
              </g>
            </g>
            <path d="M148 420 C 186 380, 232 380, 268 418" fill="none" stroke={onDark}
              strokeWidth="2.8" strokeLinecap="round" strokeDasharray="2 11" className="af-intro__dash" />
            <g style={place(ANCHOR.tutor, 140, 486, 0.56)}>
              <g className="af-intro__float"><Part name="tutor" /></g>
            </g>
            <g style={place(ANCHOR.student, 292, 468, 0.42, { flip: true })}>
              <g className="af-intro__breathe">
                <Part name="student" recolor={[["#ffb21d", "#0f9d6b"]]} />
              </g>
            </g>
            <Caption n="2" title="Skill Expert / Tutor"
              lines={["Teach what you know. Students", "discover you and book sessions."]}
              {...{ ink, inkSoft, accent, onDark }} />
          </g>

          {/* ── 3 · Academic Faculty ── */}
          <g transform={`translate(0,${STATION_H * 2})`}>
            <circle cx="204" cy="316" r="128" fill={onDark} opacity=".13" />
            <ellipse cx="200" cy="476" rx="140" ry="16" fill={onDark} opacity=".16" />
            <g style={place([0, 0], 210, 246, 0.92)}>
              <rect x="-84" y="-50" width="168" height="100" rx="12" fill="#fff" stroke={accent} strokeWidth="2.2" />
              <rect x="-60" y="-28" width="108" height="7" rx="3.5" fill={ink} opacity=".3" />
              <rect x="-60" y="-11" width="78" height="7" rx="3.5" fill={ink} opacity=".2" />
              <rect x="-60" y="6" width="94" height="7" rx="3.5" fill={accent} />
              <rect x="-60" y="23" width="48" height="7" rx="3.5" fill={ink} opacity=".16" />
            </g>
            <g style={place(ANCHOR.cap, 320, 174, 0.42)}>
              <g className="af-intro__float"><Part name="cap" /></g>
            </g>
            <g style={place([0, 0], 92, 372, 0.92)}>
              <g className="af-intro__float-slow">
                <rect x="-38" y="-25" width="76" height="50" rx="10" fill="#fff" stroke={accent} strokeWidth="2.2" />
                <rect x="-12" y="-31" width="24" height="9" rx="4.5" fill="#FFB21D" />
                <circle cx="-20" cy="-4" r="9" fill={accent} opacity=".2" />
                <rect x="-6" y="-9" width="34" height="6" rx="3" fill={ink} opacity=".3" />
                <rect x="-6" y="1" width="22" height="6" rx="3" fill={ink} opacity=".2" />
              </g>
            </g>
            <g style={place([0, 0], 122, 404, 0.85)}>
              <circle cx="0" cy="0" r="22" fill="#FFB21D" />
              <path d="M-9 1 l6 7 12 -14" fill="none" stroke={ink} strokeWidth="4.4"
                strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g style={place(ANCHOR.tutor, 214, 490, 0.56)}>
              <g className="af-intro__float">
                <Part name="tutor" recolor={[["#ffb21d", "#37474f"]]} />
              </g>
            </g>
            <Caption n="3" title="Academic Faculty"
              lines={["Apply for a full-time teaching", "post, reviewed by ShikshaCom."]}
              {...{ ink, inkSoft, accent, onDark }} />
          </g>
        </g>

        {/* station rail */}
        <g transform="translate(378,224)">
          <rect x="-3" y={-6 + i * 30} width="6" height="24" rx="3" fill={onDark}
            style={{ transition: "y .7s cubic-bezier(.4,0,.2,1)" }} />
          <circle cx="0" cy="6" r="3" fill={onDark} opacity=".45" />
          <circle cx="0" cy="36" r="3" fill={onDark} opacity=".45" />
          <circle cx="0" cy="66" r="3" fill={onDark} opacity=".45" />
        </g>
      </svg>
    </div>
  );
}
