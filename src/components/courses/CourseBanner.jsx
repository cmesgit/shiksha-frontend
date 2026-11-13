import { useId } from "react";

/* CourseBanner — a generated card banner for each academic course.
   ────────────────────────────────────────────────────────────────
   One flat illustration style for every course (the site's hero art
   language: soft wash, dotted texture, a dashed ring, a white card and
   simple shapes), varied per course from its real data:

   - theme (colours + illustration) from the STREAM:
       Science  → mint/teal, a flask and an atom
       Commerce → warm gold, a rising chart and coins
       Arts     → soft violet, a book, a brush and a globe
     and, for classes with no stream:
       Class 10 / 12 (board years) → blue, a certificate and a cap
       other classes (foundation)  → green, stacked books and a pencil
   - a large faint CLASS NUMBER on the right, and small accents whose
     positions shift with the class, so same-stream cards still differ.

   The art keeps to the right half: the card's gold "Class N" ribbon sits
   top-left and the level pill overhangs bottom-left. Decorative only. */

const THEMES = {
  science:  { a: "#E4F6EE", b: "#C9EEDF", accent: "#0F9D6B", deep: "#0B5B3E", pop: "#12B3A6", soft: "#A9E2CB" },
  commerce: { a: "#FFF5DC", b: "#FBE2AE", accent: "#E09A00", deep: "#8A5200", pop: "#0F9D6B", soft: "#F6D17E" },
  arts:     { a: "#F1ECFE", b: "#E1D7FB", accent: "#7C5CFC", deep: "#4B32B5", pop: "#EC4E86", soft: "#C9B9F8" },
  board:    { a: "#E8F1FD", b: "#D3E4FA", accent: "#3B82F6", deep: "#1D4ED8", pop: "#FFB21D", soft: "#AFCBF5" },
  found:    { a: "#EAF7F0", b: "#D6EFE2", accent: "#0F9D6B", deep: "#0B5B3E", pop: "#FFB21D", soft: "#A9E2CB" },
};

function bannerTheme({ subtitle, classLevel }) {
  if (subtitle === "Science") return "science";
  if (subtitle === "Commerce") return "commerce";
  if (subtitle === "Arts") return "arts";
  if (classLevel === 10 || classLevel === 12) return "board";
  return "found";
}

/* ── illustrations, drawn around a white card centred at (250, 66) ── */

function Science({ t }) {
  return (
    <g>
      {/* atom */}
      <g transform="translate(286 44)">
        <ellipse rx="22" ry="8" fill="none" stroke={t.pop} strokeWidth="2.5" />
        <ellipse rx="22" ry="8" fill="none" stroke={t.pop} strokeWidth="2.5" transform="rotate(60)" />
        <ellipse rx="22" ry="8" fill="none" stroke={t.pop} strokeWidth="2.5" transform="rotate(-60)" />
        <circle r="4.5" fill={t.deep} />
      </g>
      {/* flask */}
      <path d="M232 36 h18 v20 l16 30 a6 6 0 0 1 -5 9 h-40 a6 6 0 0 1 -5 -9 l16 -30z" fill="#fff" stroke={t.deep} strokeWidth="3" strokeLinejoin="round" />
      <path d="M223 80 l9 -16 h18 l9 16 a3 3 0 0 1 -3 4.5 h-30 a3 3 0 0 1 -3 -4.5z" fill={t.accent} />
      <rect x="229" y="31" width="24" height="7" rx="3.5" fill={t.deep} />
      <circle cx="238" cy="73" r="3" fill="#fff" opacity=".8" />
      <circle cx="246" cy="78" r="2" fill="#fff" opacity=".8" />
      {/* leaf */}
      <path d="M200 96 c-2 -14 8 -22 20 -22 c0 12 -8 22 -20 22z" fill={t.soft} />
    </g>
  );
}

function Commerce({ t }) {
  return (
    <g>
      {/* chart card */}
      <rect x="214" y="30" width="78" height="66" rx="12" fill="#fff" />
      <rect x="226" y="68" width="12" height="18" rx="3" fill={t.soft} />
      <rect x="244" y="56" width="12" height="30" rx="3" fill={t.accent} />
      <rect x="262" y="44" width="12" height="42" rx="3" fill={t.deep} />
      <path d="M224 60 l18 -10 l14 6 l22 -16" fill="none" stroke={t.pop} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M272 38 l7 1 l-1 7" fill="none" stroke={t.pop} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* coins */}
      <g transform="translate(302 92)">
        <ellipse cy="0" rx="15" ry="5" fill={t.deep} />
        <rect x="-15" y="-10" width="30" height="10" fill={t.accent} />
        <ellipse cy="-10" rx="15" ry="5" fill={t.soft} />
        <rect x="-15" y="-20" width="30" height="10" fill={t.accent} />
        <ellipse cy="-20" rx="15" ry="5" fill="#FFE29A" />
      </g>
    </g>
  );
}

function Arts({ t }) {
  return (
    <g>
      {/* globe */}
      <g transform="translate(292 42)">
        <circle r="17" fill="#fff" stroke={t.accent} strokeWidth="2.5" />
        <ellipse rx="7" ry="17" fill="none" stroke={t.accent} strokeWidth="2" />
        <path d="M-17 0 h34 M-14 -9 h28 M-14 9 h28" stroke={t.accent} strokeWidth="2" />
      </g>
      {/* open book */}
      <path d="M250 50 c-12 -8 -28 -9 -40 -5 v44 c12 -4 28 -3 40 5z" fill="#fff" stroke={t.deep} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M250 50 c12 -8 28 -9 40 -5 v44 c-12 -4 -28 -3 -40 5z" fill={t.a} stroke={t.deep} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M218 60 h22 M218 69 h18 M260 60 h22 M260 69 h18" stroke={t.soft} strokeWidth="3" strokeLinecap="round" />
      {/* brush */}
      <g transform="translate(206 96) rotate(-40)">
        <rect x="0" y="-3" width="34" height="6" rx="3" fill={t.deep} />
        <path d="M34 -5 h8 c4 0 6 3 6 5 s-2 5 -6 5 h-8z" fill={t.pop} />
      </g>
    </g>
  );
}

function BoardYear({ t }) {
  return (
    <g>
      {/* certificate */}
      <rect x="212" y="32" width="76" height="60" rx="10" fill="#fff" />
      <rect x="224" y="44" width="40" height="7" rx="3.5" fill={t.deep} />
      <rect x="224" y="57" width="52" height="5" rx="2.5" fill={t.soft} />
      <rect x="224" y="67" width="34" height="5" rx="2.5" fill={t.soft} />
      <circle cx="272" cy="78" r="10" fill={t.pop} />
      <path d="M266 78 l4 4 l7 -8" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* graduation cap */}
      <g transform="translate(300 38)">
        <path d="M0 -12 L22 -2 L0 8 L-22 -2Z" fill={t.deep} />
        <path d="M-12 2 v8 c0 4 24 4 24 0 v-8" fill={t.accent} />
        <path d="M18 0 v12" stroke={t.pop} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="18" cy="14" r="3" fill={t.pop} />
      </g>
    </g>
  );
}

function Foundation({ t }) {
  return (
    <g>
      {/* book stack */}
      <rect x="208" y="78" width="84" height="16" rx="5" fill={t.deep} />
      <rect x="216" y="62" width="74" height="16" rx="5" fill={t.accent} />
      <rect x="212" y="46" width="70" height="16" rx="5" fill={t.pop} />
      <rect x="218" y="83" width="30" height="4" rx="2" fill="#fff" opacity=".5" />
      <rect x="226" y="67" width="26" height="4" rx="2" fill="#fff" opacity=".55" />
      <rect x="222" y="51" width="22" height="4" rx="2" fill="#fff" opacity=".6" />
      {/* pencil */}
      <g transform="translate(300 36) rotate(48)">
        <rect x="0" y="-5" width="44" height="10" rx="2" fill={t.pop} />
        <rect x="0" y="-5" width="7" height="10" fill={t.soft} />
        <path d="M44 -5 l10 5 l-10 5z" fill="#F4D7B5" />
        <path d="M50 -2 l4 2 l-4 2z" fill={t.deep} />
      </g>
    </g>
  );
}

const ART = { science: Science, commerce: Commerce, arts: Arts, board: BoardYear, found: Foundation };

export default function CourseBanner({ subtitle, classLevel }) {
  const uid = useId().replace(/:/g, "");
  const lvl = Number(classLevel);
  const n = Number.isFinite(lvl) && lvl > 0 ? lvl : null;
  const key = bannerTheme({ subtitle, classLevel: n });
  const t = THEMES[key];
  const Art = ART[key];
  // small accents move with the class, so two cards of one stream differ
  const s = (n ?? 3) % 4;
  const sparks = [
    [[150, 24], [182, 104], [334, 108]],
    [[166, 30], [196, 18], [330, 20]],
    [[146, 100], [190, 24], [338, 96]],
    [[172, 16], [158, 92], [324, 112]],
  ][s];

  return (
    /* xMax: on a card narrower than the banner, trim the plain dotted left
       side, never the art and class number on the right */
    <svg className="uc-banner" viewBox="0 0 360 128" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`g${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={t.a} />
          <stop offset="1" stopColor={t.b} />
        </linearGradient>
        <pattern id={`d${uid}`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" fill={t.deep} opacity=".12" />
        </pattern>
      </defs>
      <rect width="360" height="128" fill={`url(#g${uid})`} />
      {/* dotted texture on the left, under the ribbon and pill */}
      <rect x="0" y="0" width="150" height="128" fill={`url(#d${uid})`} />
      {/* big faint class number */}
      {n != null && (
        <text x="352" y="122" textAnchor="end" fontFamily="'Plus Jakarta Sans', Poppins, system-ui, sans-serif"
          fontWeight="800" fontSize="104" letterSpacing="-6" fill={t.accent} opacity=".2">{n}</text>
      )}
      {/* soft disc + dashed ring behind the art */}
      <circle cx="250" cy="64" r="56" fill="#fff" opacity=".45" />
      <circle cx="250" cy="64" r="62" fill="none" stroke={t.accent} strokeOpacity=".28" strokeWidth="1.5" strokeDasharray="3 7" />
      <Art t={t} />
      {sparks.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 1 ? 3 : 4} fill={i === 0 ? t.pop : t.accent} opacity={i === 2 ? .55 : .8} />
      ))}
    </svg>
  );
}
