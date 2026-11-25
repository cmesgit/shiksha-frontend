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

/* Blogs: a soft flat scene — pale grey backdrop panels, a window, clouds
   and bushes, with the brand green kept for the subject. A student holding
   a book points up at a big blog board (article rows with picture tiles),
   an idea bulb lighting up above them. */
const B = {
  grey: "#F1F3F2", grey2: "#E6EAE8", grey3: "#D5DCD9", frame: "#455A64",
  dark: "#263238", tile: "#DDF3E7", skin: "#B97A57",
};

function Cloud({ x, y, s = 1 }) {
  return (
    <path transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 14 a10 10 0 0 1 12 -10 a14 14 0 0 1 26 2 a9 9 0 0 1 10 8z" fill={B.grey2} />
  );
}

function Row({ y, title }) {
  return (
    <g>
      <rect x="222" y={y} width="40" height="32" rx="5" fill={B.tile} />
      <circle cx="252" cy={y + 9} r="4" fill={C.gold} />
      <path d={`M226 ${y + 28} l11 -12 l8 7 l6 -5 l9 10z`} fill={C.brand} opacity=".75" />
      <rect x="272" y={y + 3} width={title} height="6" rx="3" fill={C.brand} />
      <rect x="272" y={y + 14} width="74" height="5" rx="2.5" fill={B.grey2} />
      <rect x="272" y={y + 24} width="56" height="5" rx="2.5" fill={B.grey2} />
    </g>
  );
}

export function BlogsArt() {
  return (
    <svg viewBox="0 0 420 320" role="presentation" aria-hidden="true">
      {/* backdrop panels, window, clouds */}
      <rect x="34" y="26" width="168" height="226" rx="10" fill="#FAFBFB" stroke={B.grey} strokeWidth="2" />
      <rect x="214" y="26" width="172" height="226" rx="10" fill="#FAFBFB" stroke={B.grey} strokeWidth="2" />
      <g stroke={B.grey2} strokeWidth="5" fill="none">
        <rect x="56" y="52" width="96" height="88" />
        <path d="M104 52 v88 M56 96 h96" />
      </g>
      <path d="M66 130 l26 -70 M80 130 l18 -48" stroke={B.grey} strokeWidth="5" />
      <Cloud x={322} y={36} s={1.1} />
      <Cloud x={160} y={170} s={.8} />
      <Cloud x={46} y={196} />
      {/* ground and bushes */}
      <circle cx="74" cy="282" r="34" fill={B.grey} />
      <circle cx="110" cy="272" r="40" fill={B.grey} />
      <circle cx="372" cy="284" r="30" fill={B.grey} />
      <path d="M24 296 H396" stroke={B.grey2} strokeWidth="2" />
      <ellipse cx="214" cy="302" rx="176" ry="9" fill={B.grey} />
      {/* plant */}
      <g>
        <path d="M386 254 C372 236 374 214 384 202 C388 222 390 238 386 254Z" fill={B.grey3} />
        <path d="M388 254 C400 240 404 222 398 210 C392 226 388 240 388 254Z" fill={B.grey2} />
        <path d="M374 252 h26 l-4 44 h-18z" fill={B.grey2} />
      </g>
      {/* blog board */}
      <g>
        <rect x="200" y="58" width="168" height="236" rx="12" fill={B.frame} />
        <rect x="210" y="70" width="148" height="214" rx="6" fill={C.white} />
        <rect x="258" y="48" width="52" height="18" rx="6" fill={C.brand} />
        <circle cx="284" cy="46" r="7" fill={C.brand} />
        <circle cx="284" cy="46" r="3" fill={C.white} />
        <circle cx="224" cy="84" r="3" fill={B.grey3} />
        <circle cx="234" cy="84" r="3" fill={B.grey3} />
        <circle cx="244" cy="84" r="3" fill={B.grey3} />
        <rect x="222" y="96" width="98" height="10" rx="5" fill={B.tile} />
        <Row y={118} title={60} />
        <Row y={166} title={48} />
        <Row y={214} title={66} />
        <rect x="222" y="260" width="54" height="14" rx="7" fill={C.brand} />
        <rect x="230" y="265" width="38" height="4" rx="2" fill={C.white} opacity=".85" />
      </g>
      {/* idea bulb with rays */}
      <g transform="translate(156 72)">
        <path d="M0 -36 v8 M-26 -26 l6 6 M26 -26 l-6 6 M-36 0 h8 M36 0 h-8" stroke={C.brand2} strokeWidth="3" strokeLinecap="round" opacity=".6" />
        <circle r="18" fill={C.brand} />
        <path d="M-8 14 h16 v10 h-16z" fill={B.grey3} />
        <path d="M-6 28 h12" stroke={B.dark} strokeWidth="4" strokeLinecap="round" />
        <path d="M-4 14 v-8 a4 4 0 0 1 8 0 v8" stroke={C.white} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M-10 -4 a11 11 0 0 1 8 -9" stroke={C.white} strokeWidth="3" strokeLinecap="round" fill="none" opacity=".7" />
      </g>
      {/* student */}
      <g>
        {/* legs */}
        <path d="M106 206 L100 288 L113 288 L122 212Z" fill={B.dark} />
        <path d="M122 206 L136 286 L149 283 L138 206Z" fill={B.dark} />
        <rect x="99" y="282" width="15" height="6" fill={C.brand} />
        <rect x="134" y="279" width="15" height="6" fill={C.brand} transform="rotate(-8 141 282)" />
        <path d="M98 288 h17 v6 h-21 a4 4 0 0 1 4 -6z" fill={B.dark} />
        <path d="M136 286 l14 -3 l2 6 l-18 4 a4 4 0 0 1 2 -7z" fill={B.dark} />
        {/* torso */}
        <path d="M100 146 C100 138 110 134 122 134 C134 134 142 138 142 146 L144 212 L100 212Z" fill={C.brand} />
        <path d="M114 135 L122 146 L130 135Z" fill={C.white} />
        <rect x="117" y="124" width="10" height="13" rx="3" fill={B.skin} />
        {/* raised arm, pointing at the board */}
        <path d="M138 146 L156 132" stroke={C.brand} strokeWidth="13" strokeLinecap="round" />
        <path d="M156 132 L176 112" stroke={B.skin} strokeWidth="9" strokeLinecap="round" />
        <circle cx="178" cy="109" r="6" fill={B.skin} />
        <path d="M180 106 l10 -8" stroke={B.skin} strokeWidth="4" strokeLinecap="round" />
        {/* other arm holding a book */}
        <path d="M104 148 L98 176" stroke={C.brand} strokeWidth="13" strokeLinecap="round" />
        <path d="M98 176 L114 186" stroke={B.skin} strokeWidth="9" strokeLinecap="round" />
        <g transform="rotate(-12 116 184)">
          <rect x="104" y="172" width="30" height="22" rx="3" fill={C.deep} />
          <rect x="106" y="174" width="4" height="18" fill={C.white} opacity=".5" />
        </g>
        <circle cx="116" cy="186" r="5" fill={B.skin} />
        {/* head */}
        <circle cx="123" cy="112" r="15" fill={B.skin} />
        <path d="M107 114 C102 92 130 86 140 102 C134 99 124 99 118 104 C116 108 114 112 113 120Z" fill={B.dark} />
        <circle cx="131" cy="111" r="1.8" fill={B.dark} />
        <path d="M127 119 q4 3 8 0" stroke={B.dark} strokeWidth="1.8" fill="none" strokeLinecap="round" />
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
