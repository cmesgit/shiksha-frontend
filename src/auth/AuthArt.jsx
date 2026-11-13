/* AuthArt.jsx — animated brand-panel illustrations for Login and Signup.
   ────────────────────────────────────────────────────────────────
   Flat "corporate" scenes in the same visual language as the site's hero
   illustrations (components/hero/HeroArt.jsx): faceless figures, simple
   shapes, a small palette. Coloured for the green brand panel (white and
   mint cards, gold accents). Motion is CSS only (AuthArt.css) — floats, a
   wave, pulses, a rotating dashed ring — and switches off entirely under
   prefers-reduced-motion. Decorative: hidden from assistive tech. */
import "./AuthArt.css";

const C = {
  white: "#FFFFFF",
  card: "#F4FBF7",
  mint: "#8FE3C0",
  mintSoft: "#CFF3E2",
  wash: "#EEF5F1",
  brand: "#0F9D6B",
  deep: "#0B5B3E",
  gold: "#FFB21D",
  ink: "#0C2620",
  skin1: "#E9B994",
  skin2: "#B57A52",
  skin3: "#8A5536",
};

/* A standing figure with feet on `base`, centred on x. The raised arm is its
   own group so it can wave around the shoulder. */
function Figure({ x, base = 390, skin, shirt, pants, hair, raise = false, waveClass = "" }) {
  const o = base - 300; // the shapes below are drawn for feet at y=300
  const y = (v) => v + o;
  return (
    <g>
      <rect x={x - 14} y={y(222)} width={12} height={76} rx={6} fill={pants} />
      <rect x={x + 2} y={y(222)} width={12} height={76} rx={6} fill={pants} />
      <rect x={x - 18} y={y(293)} width={17} height={8} rx={4} fill={C.ink} />
      <rect x={x + 1} y={y(293)} width={17} height={8} rx={4} fill={C.ink} />
      <rect x={x - 5} y={y(132)} width={10} height={18} rx={3} fill={skin} />
      <rect x={x - 25} y={y(146)} width={50} height={88} rx={22} fill={shirt} />
      {/* resting arm */}
      <path d={`M${x + 21} ${y(160)} C${x + 29} ${y(186)} ${x + 29} ${y(204)} ${x + 25} ${y(220)}`} stroke={shirt} strokeWidth={12} strokeLinecap="round" fill="none" />
      <circle cx={x + 25} cy={y(224)} r={6} fill={skin} />
      {/* the other arm: down, or raised and waving */}
      {raise ? (
        <g className={waveClass} style={{ transformOrigin: `${x - 21}px ${y(160)}px` }}>
          <path d={`M${x - 21} ${y(160)} C${x - 34} ${y(140)} ${x - 40} ${y(122)} ${x - 38} ${y(104)}`} stroke={shirt} strokeWidth={12} strokeLinecap="round" fill="none" />
          <circle cx={x - 38} cy={y(100)} r={6.5} fill={skin} />
        </g>
      ) : (
        <>
          <path d={`M${x - 21} ${y(160)} C${x - 29} ${y(186)} ${x - 29} ${y(204)} ${x - 25} ${y(220)}`} stroke={shirt} strokeWidth={12} strokeLinecap="round" fill="none" />
          <circle cx={x - 25} cy={y(224)} r={6} fill={skin} />
        </>
      )}
      <circle cx={x} cy={y(120)} r={18} fill={skin} />
      <path d={`M${x - 19} ${y(122)} C${x - 22} ${y(96)} ${x + 22} ${y(96)} ${x + 19} ${y(122)} C${x + 12} ${y(111)} ${x - 6} ${y(109)} ${x - 19} ${y(122)}Z`} fill={hair} />
    </g>
  );
}

function Backdrop() {
  return (
    <g>
      <circle cx="200" cy="215" r="150" fill={C.white} opacity=".09" />
      <circle className="aa-spin" cx="200" cy="215" r="172" fill="none" stroke={C.white} strokeOpacity=".28"
        strokeWidth="1.5" strokeDasharray="3 10" style={{ transformOrigin: "200px 215px" }} />
      <ellipse cx="200" cy="394" rx="150" ry="11" fill="#000" opacity=".12" />
    </g>
  );
}

function Sparkle({ x, y, r = 3, delay = "0s", color = C.white }) {
  return <circle className="aa-twinkle" cx={x} cy={y} r={r} fill={color} style={{ animationDelay: delay }} />;
}

function Check({ cx, cy, r, bg = C.gold, fg = C.white }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={bg} />
      <path d={`M${cx - r * 0.42} ${cy} l${r * 0.3} ${r * 0.32} l${r * 0.56} -${r * 0.62}`} stroke={fg} strokeWidth={r * 0.22}
        strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  );
}

/* Login — "welcome back": a sign-in card with a pulsing check, a waving
   learner, a floating shield. */
export function LoginArt() {
  return (
    <svg viewBox="0 0 400 420" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      <Backdrop />

      {/* sign-in card */}
      <g className="aa-float">
        <rect x="58" y="112" width="200" height="158" rx="20" fill={C.card} />
        <rect x="58" y="112" width="200" height="158" rx="20" fill="none" stroke={C.white} strokeOpacity=".6" />
        <circle cx="90" cy="146" r="15" fill={C.mintSoft} />
        <circle cx="90" cy="141" r="5.5" fill={C.brand} />
        <path d="M80 155 a10 8 0 0 1 20 0" fill={C.brand} />
        <rect x="114" y="136" width="78" height="8" rx="4" fill={C.deep} />
        <rect x="114" y="151" width="54" height="6" rx="3" fill={C.mint} />
        <rect x="78" y="178" width="160" height="22" rx="11" fill={C.wash} />
        <rect x="90" y="186" width="70" height="6" rx="3" fill="#C9DCD2" />
        <rect x="78" y="208" width="160" height="22" rx="11" fill={C.wash} />
        {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={94 + i * 12} cy={219} r="3.2" fill="#9DB8AA" />)}
        <rect x="78" y="240" width="160" height="20" rx="10" fill={C.brand} />
        <rect x="134" y="247" width="48" height="6" rx="3" fill={C.white} opacity=".9" />
        <g className="aa-pop" style={{ transformOrigin: "252px 116px" }}>
          <Check cx={252} cy={116} r={17} />
        </g>
      </g>

      {/* shield */}
      <g className="aa-float-slow">
        <path d="M318 70 l32 12 v22 c0 20 -14 34 -32 42 c-18 -8 -32 -22 -32 -42 v-22z" fill={C.mint} />
        <path d="M318 78 l24 9 v17 c0 15 -10 26 -24 32z" fill={C.white} opacity=".35" />
        <path d="M305 106 l9 9 l17 -19" stroke={C.deep} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* key chip */}
      <g className="aa-float" style={{ animationDelay: "-2.4s" }}>
        <rect x="70" y="300" width="74" height="34" rx="17" fill={C.white} />
        <circle cx="90" cy="317" r="7" fill="none" stroke={C.gold} strokeWidth="4" />
        <path d="M97 317 h22 m-6 0 v6 m-6 -6 v5" stroke={C.gold} strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>

      <Figure x={318} skin={C.skin2} shirt={C.white} pants={C.ink} hair={C.ink} raise waveClass="aa-wave" />

      <Sparkle x={70} y={70} r={4} />
      <Sparkle x={262} y={58} r={3} delay="-1.2s" color={C.gold} />
      <Sparkle x={42} y={300} r={3} delay="-2.1s" />
      <Sparkle x={370} y={262} r={3.5} delay="-0.6s" color={C.mint} />
    </svg>
  );
}

function ProfileChip({ x, y, icon, accent, delay }) {
  // `icon` is a tiny glyph drawn in a 20x20 box at the chip's icon spot
  return (
    <g className="aa-join" style={{ animationDelay: delay, transformOrigin: `${x + 38}px ${y + 40}px` }}>
      <rect x={x} y={y} width="76" height="42" rx="13" fill={C.card} />
      <circle cx={x + 20} cy={y + 21} r="12" fill={accent} />
      <g transform={`translate(${x + 10} ${y + 11})`}>{icon}</g>
      <rect x={x + 38} y={y + 14} width="28" height="6" rx="3" fill={C.deep} />
      <rect x={x + 38} y={y + 25} width="20" height="5" rx="2.5" fill={C.mint} />
    </g>
  );
}

const ICON_BOOK = (
  <g stroke={C.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
    <path d="M10 5 C7 3.5 4 3.5 2 4.5 V15 C4 14 7 14 10 15.5 C13 14 16 14 18 15 V4.5 C16 3.5 13 3.5 10 5 Z" />
    <path d="M10 5 V15.5" />
  </g>
);
const ICON_BOARD = (
  <g stroke={C.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
    <rect x="2.5" y="3.5" width="15" height="10" rx="1.5" />
    <path d="M6 17 L10 13.5 L14 17" /><path d="M6 8.5 l2.5 2 l4.5 -4" />
  </g>
);
const ICON_CAP = (
  <g stroke={C.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
    <path d="M10 4 L19 8 L10 12 L1 8 Z" /><path d="M5 10 V14 C5 15.5 15 15.5 15 14 V10" />
  </g>
);

/* Signup — "join in": a learner, a tutor and a faculty member, with their
   profile cards popping up one after another, linked by a moving dashed
   line, and a pulsing "+". */
export function SignupArt() {
  return (
    /* Framed tighter than LoginArt (the scene's own edges, not the full
       400x420 canvas) so it draws larger in the same panel space. */
    <svg viewBox="22 20 356 392" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      <Backdrop />

      {/* the line that links the three profiles */}
      <path className="aa-dash" d="M72 172 C120 120 160 120 200 140 S280 160 328 118" fill="none"
        stroke={C.white} strokeOpacity=".55" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 10" />

      <ProfileChip x={34} y={150} icon={ICON_BOOK} accent={C.brand} delay="0s" />
      <ProfileChip x={162} y={118} icon={ICON_BOARD} accent={C.gold} delay="0.7s" />
      <ProfileChip x={290} y={96} icon={ICON_CAP} accent={C.deep} delay="1.4s" />

      {/* join badge */}
      <g className="aa-pop" style={{ transformOrigin: "200px 64px" }}>
        <circle cx="200" cy="64" r="20" fill={C.gold} />
        <path d="M200 54 v20 M190 64 h20" stroke={C.white} strokeWidth="4.5" strokeLinecap="round" />
      </g>

      <g className="aa-breathe"><Figure x={92} skin={C.skin1} shirt={C.gold} pants={C.ink} hair={C.ink} /></g>
      <g className="aa-breathe" style={{ animationDelay: "-1.6s" }}><Figure x={200} skin={C.skin3} shirt={C.white} pants={C.deep} hair={C.ink} raise waveClass="aa-wave" /></g>
      <g className="aa-breathe" style={{ animationDelay: "-3.1s" }}><Figure x={308} skin={C.skin2} shirt={C.mint} pants={C.ink} hair="#3A2A1E" /></g>

      <Sparkle x={52} y={84} r={3.5} />
      <Sparkle x={352} y={196} r={3} delay="-1.4s" color={C.gold} />
      <Sparkle x={250} y={34} r={3} delay="-2.2s" color={C.mint} />
    </svg>
  );
}

export default function AuthArt({ variant = "login" }) {
  return (
    <div className={`af-art af-art--${variant === "signup" ? "signup" : "login"}`}>
      {variant === "signup" ? <SignupArt /> : <LoginArt />}
    </div>
  );
}
