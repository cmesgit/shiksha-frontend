/* Minimal flat illustrations for the hero's right side (forum,
   blogs, Explore). Pure inline SVG in the brand palette: no faces, simple
   shapes, so they stay light and read well at any size. Decorative only. */

const C = {
  brand: "#0F9D6B",
  brand2: "#12B47A",
  deep: "#0B5B3E",
  wash: "#EAF7F0",
  wash2: "#D8F0E4",
  line: "#CFEADB",
  gold: "#FFB21D",
  ink: "#0C2620",
  white: "#FFFFFF",
  skin1: "#E9B994",
  skin2: "#B57A52",
  skin3: "#8A5536",
};

// A standing figure with its feet on y=300, centred on x. `arm` is an
// optional path for a raised/gesturing arm; the other arm hangs down.
function Person({ x, skin, shirt, pants, hair, arm, armSide = 1, hand, hang = true }) {
  const down = armSide === 1 ? -1 : 1; // the hanging arm is on the other side
  return (
    <g>
      <rect x={x - 14} y={222} width={12} height={76} rx={6} fill={pants} />
      <rect x={x + 2} y={222} width={12} height={76} rx={6} fill={pants} />
      <rect x={x - 18} y={293} width={17} height={8} rx={4} fill={C.ink} />
      <rect x={x + 1} y={293} width={17} height={8} rx={4} fill={C.ink} />
      <rect x={x - 5} y={132} width={10} height={18} rx={3} fill={skin} />
      <rect x={x - 25} y={146} width={50} height={88} rx={22} fill={shirt} />
      {/* hanging arm */}
      {hang && <path d={`M${x + 21 * down} 160 C${x + 29 * down} 186 ${x + 29 * down} 204 ${x + 25 * down} 220`} stroke={shirt} strokeWidth={12} strokeLinecap="round" fill="none" />}
      {hang && <circle cx={x + 25 * down} cy={224} r={6} fill={skin} />}
      {/* gesturing arm */}
      {arm && <path d={arm} stroke={shirt} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" fill="none" />}
      {hand && <circle cx={hand[0]} cy={hand[1]} r={6} fill={skin} />}
      <circle cx={x} cy={120} r={18} fill={skin} />
      <path d={`M${x - 19} 122 C${x - 22} 96 ${x + 22} 96 ${x + 19} 122 C${x + 12} 111 ${x - 6} 109 ${x - 19} 122Z`} fill={hair} />
    </g>
  );
}

function Ground() {
  return <ellipse cx="210" cy="304" rx="172" ry="11" fill={C.wash2} />;
}

function Plant({ x }) {
  return (
    <g>
      <path d={`M${x} 270 C${x - 22} 250 ${x - 20} 226 ${x - 4} 214 C${x - 2} 236 ${x + 2} 252 ${x} 270Z`} fill={C.brand} />
      <path d={`M${x} 270 C${x + 20} 254 ${x + 24} 232 ${x + 10} 220 C${x + 6} 240 ${x + 2} 254 ${x} 270Z`} fill={C.brand2} />
      <path d={`M${x - 14} 268 h28 l-4 34 h-20z`} fill={C.gold} />
    </g>
  );
}

function Lines({ x, y, widths, color = C.line, gap = 12 }) {
  return widths.map((w, i) => <rect key={i} x={x} y={y + i * gap} width={w} height={6} rx={3} fill={color} />);
}

/* Forum: two people in conversation, a question bubble and an answer bubble. */
export function ForumArt() {
  return (
    <svg viewBox="0 0 420 320" role="presentation" aria-hidden="true">
      <Ground />
      {/* question bubble */}
      <g>
        <rect x="118" y="34" width="112" height="70" rx="20" fill={C.brand} />
        <path d="M146 102 l-6 20 l22 -18z" fill={C.brand} />
        <text x="174" y="82" textAnchor="middle" fontFamily="Plus Jakarta Sans, system-ui, sans-serif" fontWeight="800" fontSize="40" fill={C.white}>?</text>
      </g>
      {/* answer bubble */}
      <g>
        <rect x="214" y="104" width="128" height="62" rx="18" fill={C.white} stroke={C.line} strokeWidth="2" />
        <path d="M304 164 l10 20 l4 -22z" fill={C.white} stroke={C.line} strokeWidth="2" strokeLinejoin="round" />
        <rect x="300" y="160" width="24" height="6" fill={C.white} />
        <circle cx="236" cy="128" r="9" fill={C.wash} />
        <path d="M231 128 l4 4 l7 -8" stroke={C.brand} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Lines x={254} y={120} widths={[70, 52]} />
        <Lines x={232} y={146} widths={[92]} color={C.wash2} />
      </g>
      <Person x={118} skin={C.skin1} shirt={C.brand} pants={C.deep} hair={C.ink}
        arm="M137 162 C152 152 160 140 164 126" hand={[165, 122]} />
      <Person x={318} skin={C.skin3} shirt={C.gold} pants={C.ink} hair={C.ink} armSide={-1}
        arm="M298 164 C288 176 286 188 292 198" hand={[294, 201]} />
      {/* phone in the second person's hand */}
      <rect x="284" y="190" width="16" height="24" rx="4" fill={C.deep} />
      <Plant x={380} />
      <circle cx="70" cy="70" r="6" fill={C.gold} />
      <circle cx="372" cy="62" r="4" fill={C.brand2} />
    </svg>
  );
}

/* Blogs: in the airy flat style of stock "story" illustrations: lots of
   white, near-white backdrop panels, flat grey clouds, a picket fence and
   soft bushes, one tall slim character in charcoal and brand green, and
   light-green props. A student with a backpack, hand on chin, reads a big
   blog board while an idea lights up above. */
const S = {
  dark: "#263238", g: C.brand, gDark: "#0B7F56", tint: "#D5F1E3", tint2: "#8ED8B5",
  skin: "#C98B6B", shade: "#A86E52", panel: "#FCFCFC", line: "#F0F0F0", grey: "#EBEBEB",
  frame: "#50595E",
};

function FlatCloud({ x, y, s = 1 }) {
  return (
    <path transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 16 c0 -6 5 -10 11 -9 c2 -7 9 -11 16 -9 c6 2 9 7 9 11 c5 -1 10 3 10 7z" fill={S.grey} />
  );
}

function PostRow({ y, w }) {
  return (
    <g>
      <rect x="246" y={y} width="40" height="32" rx="3" fill={S.tint} />
      <circle cx="277" cy={y + 9} r="3.5" fill={C.white} />
      <path d={`M250 ${y + 28} l10 -11 l7 6 l5 -4 l10 9z`} fill={C.white} />
      <rect x="294" y={y + 2} width={w} height="6" rx="1.5" fill={S.tint2} />
      <rect x="294" y={y + 13} width="56" height="4" rx="1.5" fill={S.tint} />
      <rect x="294" y={y + 21} width="56" height="4" rx="1.5" fill={S.tint} />
      <rect x="294" y={y + 29} width="34" height="4" rx="1.5" fill={S.tint} />
    </g>
  );
}

export function BlogsArt() {
  const posts = [168, 186, 204, 222, 240, 258, 384];
  return (
    <svg viewBox="0 0 420 320" role="presentation" aria-hidden="true">
      {/* backdrop */}
      <rect x="40" y="18" width="170" height="236" rx="8" fill={S.panel} stroke={S.line} strokeWidth="1.5" />
      <rect x="216" y="18" width="170" height="236" rx="8" fill={S.panel} stroke={S.line} strokeWidth="1.5" />
      <circle cx="226" cy="150" r="40" fill="#F5F5F5" />
      <FlatCloud x={58} y={118} s={1.1} />
      <FlatCloud x={150} y={40} s={.8} />
      <FlatCloud x={322} y={30} />
      <FlatCloud x={60} y={186} s={.8} />
      {/* picket fence */}
      <g fill={S.grey}>
        {posts.map((x) => <path key={x} d={`M${x} 296 V228 l4 -6 l4 6 V296z`} />)}
        <rect x="160" y="238" width="236" height="5" />
      </g>
      {/* bushes */}
      <path d="M44 296 C42 262 66 252 82 262 C90 234 128 232 138 258 C152 248 176 260 176 296Z" fill={S.line} />
      <path d="M330 296 C330 274 350 266 362 274 C370 258 396 262 396 296Z" fill={S.line} />
      {/* ground */}
      <path d="M26 296 H398" stroke={S.line} strokeWidth="1.5" />
      <ellipse cx="214" cy="302" rx="168" ry="7" fill="#F2F2F2" />

      {/* blog board, standing on the floor */}
      <g>
        <rect x="230" y="60" width="140" height="232" rx="10" fill={S.frame} />
        <rect x="238" y="70" width="124" height="214" rx="4" fill={C.white} />
        <rect x="276" y="52" width="48" height="16" rx="4" fill={S.g} />
        <rect x="284" y="56" width="32" height="5" rx="2.5" fill={S.tint2} />
        <path d="M294 52 a6 6 0 0 1 12 0" fill={S.g} />
        <rect x="246" y="82" width="82" height="9" rx="1.5" fill={S.tint} />
        <PostRow y={102} w={44} />
        <PostRow y={148} w={50} />
        <PostRow y={194} w={38} />
        <rect x="246" y="250" width="58" height="16" rx="8" fill="none" stroke={S.g} strokeWidth="2" />
        <rect x="257" y="256" width="36" height="4" rx="2" fill={S.tint2} />
      </g>
      {/* plant */}
      <g>
        <path d="M392 262 C380 240 382 220 390 208 C394 228 396 244 392 262Z" fill="#E0E0E0" />
        <path d="M394 262 C404 246 408 230 402 218 C398 234 394 248 394 262Z" fill={S.grey} />
        <path d="M391 236 l-2 -14 M396 244 l3 -14" stroke={C.white} strokeWidth="1.2" />
        <path d="M380 260 h26 l-4 36 h-18z" fill={S.grey} />
      </g>

      {/* idea: bulb with an outlined starburst */}
      <g transform="translate(176 46)">
        <path d="M0 -30 L5 -20 L15 -26 L14 -15 L26 -15 L19 -6 L29 1 L18 5 L23 16 L12 13 L10 25 L2 17 L-6 26 L-8 14 L-20 18 L-15 7 L-27 2 L-17 -5 L-24 -15 L-12 -15 L-14 -27 L-4 -20Z"
          fill="none" stroke={S.tint2} strokeWidth="1.6" strokeLinejoin="round" />
        <circle r="12" fill={S.tint2} />
        <path d="M-5 9 h10 v7 h-10z" fill="#E0E0E0" />
        <path d="M-3 18 h6" stroke={S.dark} strokeWidth="3" strokeLinecap="round" />
        <path d="M-7 -1 a7 7 0 0 1 5 -6" stroke={C.white} strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>

      {/* student */}
      <g>
        {/* backpack, behind */}
        <rect x="100" y="104" width="15" height="50" rx="6" fill={S.gDark} />
        {/* legs */}
        <path d="M112 160 L132 162 L125 282 L113 282Z" fill={S.g} />
        <path d="M127 160 L144 160 L170 276 L158 280Z" fill={S.g} />
        <path d="M136 172 l12 50 l-11 -36z" fill={S.gDark} opacity=".6" />
        <rect x="112" y="278" width="14" height="6" fill={S.dark} />
        <rect x="156" y="273" width="14" height="6" fill={S.dark} transform="rotate(-14 163 276)" />
        <path d="M114 285 h10 v1 l4 8 h-20 a4 4 0 0 1 6 -9z" fill={S.dark} />
        <path d="M160 282 l10 -3 l9 5 l0 2 l-19 5 a3 3 0 0 1 0 -9z" fill={S.dark} />
        {/* tee */}
        <path d="M110 104 Q114 98 124 98 L134 98 Q144 99 147 106 L151 122 L144 124 L143 162 L112 162 L112 124 L106 122Z" fill={S.dark} />
        <path d="M121 98 q7 7 14 0" stroke={C.white} strokeWidth="2.5" fill="none" />
        {/* straps */}
        <path d="M116 100 L114 148 M140 100 L143 140" stroke={S.g} strokeWidth="5" strokeLinecap="round" />
        <path d="M114 128 H143" stroke={S.g} strokeWidth="3.5" />
        {/* arm holding a book at the hip */}
        <path d="M108 122 L103 146 L112 156" stroke={S.skin} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <g transform="rotate(-10 112 160)">
          <rect x="100" y="146" width="24" height="30" rx="2" fill={S.gDark} />
          <rect x="102" y="148" width="3" height="26" fill={C.white} opacity=".5" />
        </g>
        {/* neck + head */}
        <rect x="123" y="90" width="9" height="11" fill={S.shade} />
        <ellipse cx="128" cy="80" rx="12" ry="15" fill={S.skin} />
        <ellipse cx="117" cy="82" rx="3.5" ry="5" fill={S.shade} />
        <path d="M139 79 q4 4 -1 7" fill={S.skin} />
        <ellipse cx="134" cy="78" rx="1.6" ry="2.2" fill={S.dark} />
        <path d="M131 72 q3 -2 6 0" stroke={S.dark} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M131 89 h5" stroke={S.shade} strokeWidth="1.6" strokeLinecap="round" />
        {/* curly hair */}
        <g fill={S.dark}>
          <circle cx="118" cy="68" r="8" />
          <circle cx="126" cy="63" r="8" />
          <circle cx="135" cy="64" r="7" />
          <circle cx="141" cy="69" r="4.5" />
          <circle cx="113" cy="76" r="6" />
          <circle cx="112" cy="85" r="4.5" />
          <path d="M112 70 L121 70 L119 90 L110 88Z" />
        </g>
        {/* arm up to the chin, thinking */}
        <path d="M144 108 L151 122" stroke={S.dark} strokeWidth="11" strokeLinecap="round" />
        <path d="M151 124 L156 138 L141 94" stroke={S.skin} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <ellipse cx="139" cy="91" rx="5.5" ry="5" fill={S.skin} />
      </g>
    </svg>
  );
}

/* Explore: a document shelf and a person holding up a found paper. */
export function ExploreArt() {
  return (
    <svg viewBox="0 0 420 320" role="presentation" aria-hidden="true">
      <Ground />
      {/* shelf */}
      <g>
        <rect x="46" y="70" width="150" height="230" rx="16" fill={C.white} stroke={C.line} strokeWidth="2" />
        <rect x="58" y="142" width="126" height="6" rx="3" fill={C.wash2} />
        <rect x="58" y="214" width="126" height="6" rx="3" fill={C.wash2} />
        {/* row 1 */}
        <rect x="66" y="92" width="18" height="50" rx="4" fill={C.brand} />
        <rect x="88" y="100" width="16" height="42" rx="4" fill={C.gold} />
        <rect x="108" y="88" width="20" height="54" rx="4" fill={C.deep} />
        <rect x="134" y="104" width="40" height="38" rx="6" fill={C.wash} stroke={C.line} strokeWidth="2" />
        {/* row 2 */}
        <rect x="66" y="168" width="44" height="46" rx="6" fill={C.wash} stroke={C.line} strokeWidth="2" />
        <rect x="116" y="162" width="18" height="52" rx="4" fill={C.brand2} />
        <rect x="138" y="172" width="16" height="42" rx="4" fill={C.deep} />
        <rect x="158" y="166" width="16" height="48" rx="4" fill={C.gold} />
        {/* row 3 */}
        <rect x="66" y="236" width="16" height="52" rx="4" fill={C.gold} />
        <rect x="86" y="244" width="20" height="44" rx="4" fill={C.brand} />
        <rect x="112" y="240" width="62" height="48" rx="6" fill={C.wash} stroke={C.line} strokeWidth="2" />
      </g>
      {/* paper being held up above the head */}
      <g transform="translate(0 -44)">
        <path d="M262 52 h52 l18 18 v64 a8 8 0 0 1 -8 8 h-62 a8 8 0 0 1 -8 -8 v-74 a8 8 0 0 1 8 -8z" fill={C.white} stroke={C.line} strokeWidth="2" />
        <path d="M314 52 v12 a6 6 0 0 0 6 6 h12" fill={C.wash} stroke={C.line} strokeWidth="2" strokeLinejoin="round" />
        <rect x="268" y="76" width="30" height="8" rx="4" fill={C.brand} />
        <Lines x={268} y={94} widths={[52, 40, 46]} />
      </g>
      <Person x={300} skin={C.skin1} shirt={C.deep} pants={C.ink} hair="#3A2A1E" hang={false}
        arm="M281 164 C268 140 266 116 270 100" hand={[270, 97]} />
      <path d="M319 164 C332 140 334 116 330 100" stroke={C.deep} strokeWidth="12" strokeLinecap="round" fill="none" />
      <circle cx="330" cy="97" r="6" fill={C.skin1} />
      {/* magnifier */}
      <g>
        <circle cx="368" cy="214" r="18" fill={C.wash} stroke={C.brand} strokeWidth="6" />
        <path d="M381 228 l16 16" stroke={C.brand} strokeWidth="8" strokeLinecap="round" />
      </g>
      <circle cx="226" cy="40" r="6" fill={C.gold} />
      <circle cx="386" cy="90" r="4" fill={C.brand2} />
    </svg>
  );
}

/* Current affairs: a reader with the day's paper, a calendar and a globe. */
export function CurrentAffairsArt() {
  return (
    <svg viewBox="0 0 420 320" role="presentation" aria-hidden="true">
      <Ground />
      {/* calendar */}
      <g>
        <rect x="46" y="58" width="128" height="116" rx="16" fill={C.white} stroke={C.line} strokeWidth="2" />
        <path d="M46 74 a16 16 0 0 1 16 -16 h96 a16 16 0 0 1 16 16 v12 h-128z" fill={C.brand} />
        <rect x="74" y="48" width="8" height="20" rx="4" fill={C.deep} />
        <rect x="138" y="48" width="8" height="20" rx="4" fill={C.deep} />
        {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => (
          <rect key={`${r}-${c}`} x={62 + c * 26} y={100 + r * 22} width="16" height="12" rx="4"
            fill={r === 1 && c === 2 ? C.gold : C.wash2} />
        )))}
      </g>
      {/* globe */}
      <g>
        <circle cx="352" cy="78" r="30" fill={C.wash} stroke={C.brand} strokeWidth="4" />
        <ellipse cx="352" cy="78" rx="13" ry="30" fill="none" stroke={C.brand} strokeWidth="3" />
        <path d="M322 78 h60 M327 62 h50 M327 94 h50" stroke={C.brand} strokeWidth="3" strokeLinecap="round" />
      </g>
      <Person x={250} skin={C.skin2} shirt={C.gold} pants={C.deep} hair={C.ink} hang={false}
        arm="M230 166 C216 176 212 186 214 196" />
      <path d="M270 166 C284 176 288 186 286 196" stroke={C.gold} strokeWidth="12" strokeLinecap="round" fill="none" />
      {/* newspaper held in front */}
      <g>
        <rect x="198" y="166" width="104" height="74" rx="8" fill={C.white} stroke={C.line} strokeWidth="2" />
        <rect x="210" y="178" width="56" height="9" rx="4.5" fill={C.deep} />
        <rect x="210" y="196" width="30" height="30" rx="5" fill={C.wash2} />
        <Lines x={248} y={196} widths={[42, 34, 40]} gap={11} />
        <rect x="274" y="178" width="16" height="9" rx="4.5" fill={C.gold} />
      </g>
      <circle cx="214" cy="198" r="6" fill={C.skin2} />
      <circle cx="286" cy="198" r="6" fill={C.skin2} />
      <Plant x={92} />
      <circle cx="214" cy="60" r="6" fill={C.gold} />
      <circle cx="388" cy="200" r="4" fill={C.brand2} />
    </svg>
  );
}

/* Quizzes: a learner pointing at a quiz card, with a stopwatch and a trophy. */
export function QuizArt() {
  return (
    <svg viewBox="0 0 420 320" role="presentation" aria-hidden="true">
      <Ground />
      {/* quiz card */}
      <g>
        <rect x="232" y="44" width="146" height="178" rx="18" fill={C.white} stroke={C.line} strokeWidth="2" />
        <rect x="252" y="64" width="64" height="9" rx="4.5" fill={C.deep} />
        <rect x="252" y="80" width="96" height="6" rx="3" fill={C.line} />
        {[0, 1, 2].map((i) => {
          const y = 104 + i * 30;
          const on = i === 0;
          return (
            <g key={i}>
              <rect x="248" y={y - 4} width="114" height="24" rx="12" fill={on ? C.wash : C.white} stroke={on ? C.brand : C.line} strokeWidth="2" />
              <circle cx="262" cy={y + 8} r="6" fill={on ? C.brand : C.white} stroke={on ? C.brand : C.line} strokeWidth="2" />
              {on && <path d={`M259 ${y + 8} l2.5 2.5 l4.5 -5`} stroke={C.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />}
              <rect x="276" y={y + 5} width={on ? 64 : 52 - i * 6} height="6" rx="3" fill={on ? C.brand : C.line} />
            </g>
          );
        })}
        <rect x="270" y="192" width="70" height="18" rx="9" fill={C.brand} />
      </g>
      {/* stopwatch */}
      <g>
        <rect x="62" y="52" width="16" height="8" rx="3" fill={C.deep} />
        <circle cx="70" cy="88" r="26" fill={C.white} stroke={C.brand} strokeWidth="5" />
        <path d="M70 88 V72 M70 88 l10 8" stroke={C.deep} strokeWidth="4" strokeLinecap="round" />
        <circle cx="70" cy="88" r="3.5" fill={C.gold} />
      </g>
      <Person x={160} skin={C.skin1} shirt={C.brand} pants={C.ink} hair="#3A2A1E"
        arm="M179 162 C196 152 210 144 226 136" hand={[228, 134]} />
      {/* trophy */}
      <g>
        <path d="M352 244 h36 v8 a18 18 0 0 1 -36 0z" fill={C.gold} />
        <path d="M352 250 h-8 a8 8 0 0 0 8 10 M388 250 h8 a8 8 0 0 1 -8 10" stroke={C.gold} strokeWidth="4" fill="none" strokeLinecap="round" />
        <rect x="366" y="268" width="8" height="18" fill={C.gold} />
        <rect x="356" y="284" width="28" height="10" rx="4" fill={C.deep} />
      </g>
      <circle cx="200" cy="54" r="6" fill={C.gold} />
      <circle cx="44" cy="210" r="4" fill={C.brand2} />
    </svg>
  );
}
