/* Flat poster illustrations for the page heroes (blogs, Explore, current
   affairs, quizzes, forum). Pure inline SVG, decorative only. */

/* Blogs: flat poster look (solid colour field, chunky rounded shapes, hard
   offset shadows) showing a blog page in a browser with a cat peeking over. */
export function BlogsArt() {
  const sidebar = [
    { y: 88, c: "#EE6E02" },
    { y: 136, c: "#4BB15F" },
    { y: 184, c: "#EA3949" },
  ];
  return (
    <svg viewBox="0 0 420 320" role="presentation" aria-hidden="true">
      <defs>
        <clipPath id="blogs-cover"><rect x="62" y="88" width="150" height="88" rx="12" /></clipPath>
      </defs>

      {/* solid poster field + floor shadow */}
      <rect x="6" y="6" width="408" height="308" rx="22" fill="#6CC5A4" />
      <rect x="26" y="278" width="368" height="10" rx="5" fill="#000" opacity=".18" />

      {/* the cat, peeking over the top edge */}
      <path d="M210 26L220 26L215 15.5Z" fill="#2A2538" />
      <path d="M238 26L248 26L243 15.5Z" fill="#2A2538" />
      <rect x="206" y="22" width="46" height="26" rx="13" fill="#2A2538" />
      <path d="M217 33a4 4 0 0 0 8 0z" fill="#fff" />
      <path d="M233 33a4 4 0 0 0 8 0z" fill="#fff" />
      <path d="M219.4 33a1.6 1.6 0 0 0 3.2 0z" fill="#111" />
      <path d="M235.4 33a1.6 1.6 0 0 0 3.2 0z" fill="#111" />
      <path d="M300 150C336 150 340 118 322 100" fill="none" stroke="#2A2538" strokeWidth="7" strokeLinecap="round" />

      {/* hard grey shadow of the browser window */}
      <rect x="86" y="44" width="250" height="226" rx="18" fill="#C5C7C8" />

      {/* browser window */}
      <rect x="50" y="44" width="250" height="226" rx="18" fill="#F2FBFF" />
      <rect x="60" y="54" width="230" height="22" rx="10" fill="#E8F1F4" />
      <circle cx="74" cy="65" r="3.5" fill="#EA3949" />
      <circle cx="86" cy="65" r="3.5" fill="#FCB900" />
      <circle cx="98" cy="65" r="3.5" fill="#4BB15F" />
      <rect x="112" y="59" width="112" height="12" rx="6" fill="#D9DDDF" />
      <rect x="120" y="63.5" width="44" height="3" rx="1.5" fill="#fff" opacity=".8" />
      <rect x="244" y="60" width="14" height="10" rx="2" fill="#D9DDDF" />
      <rect x="258" y="60" width="2" height="10" fill="#C2C4C6" />
      <circle cx="274" cy="65" r="5.5" fill="#D9DDDF" />

      {/* cat paws on the window edge */}
      <ellipse cx="214" cy="46" rx="8" ry="5" fill="#2A2538" />
      <ellipse cx="244" cy="46" rx="8" ry="5" fill="#2A2538" />

      {/* cover picture */}
      <rect x="62" y="88" width="150" height="88" rx="12" fill="#6E6D71" />
      <g clipPath="url(#blogs-cover)">
        <circle cx="176" cy="114" r="15" fill="#FCB900" />
        <path d="M62 176V150C80 128 98 130 116 146C132 120 156 118 176 150L212 176Z" fill="#387D45" />
        <path d="M62 176V162C86 148 108 152 130 164C154 150 184 152 212 164V176Z" fill="#4BB15F" />
        <path d="M70 176L138 88H152L84 176Z" fill="#fff" opacity=".15" />
        <path d="M110 176L162 108V122L126 176Z" fill="#fff" opacity=".15" />
      </g>
      <rect x="62" y="88" width="150" height="88" rx="12" fill="none" stroke="#E5EBEE" strokeWidth="3" />

      {/* post title + text */}
      <rect x="62" y="188" width="118" height="10" rx="5" fill="#EE6E02" />
      <rect x="62" y="206" width="150" height="5" rx="2.5" fill="#D4D8DA" />
      <rect x="62" y="216" width="128" height="5" rx="2.5" fill="#D4D8DA" />
      <rect x="62" y="226" width="96" height="5" rx="2.5" fill="#D4D8DA" />
      <rect x="62" y="244" width="64" height="20" rx="10" fill="#387D45" />
      <rect x="62" y="241" width="64" height="20" rx="10" fill="#4BB15F" />
      <path d="M82 251h22m-6-5l6 5-6 5" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

      {/* more posts */}
      {sidebar.map((p) => (
        <g key={p.y}>
          <rect x="224" y={p.y} width="66" height="40" rx="9" fill="#E8F1F4" />
          <rect x="231" y={p.y + 7} width="26" height="26" rx="6" fill={p.c} />
          <rect x="263" y={p.y + 10} width="22" height="5" rx="2.5" fill="#C2C4C6" />
          <rect x="263" y={p.y + 19} width="16" height="4" rx="2" fill="#D4D8DA" />
          <rect x="263" y={p.y + 27} width="19" height="4" rx="2" fill="#D4D8DA" />
        </g>
      ))}
      <circle cx="240" cy="247" r="4.5" fill="#EE6E02" />
      <circle cx="257" cy="247" r="4.5" fill="#D9DDDF" />
      <circle cx="274" cy="247" r="4.5" fill="#D9DDDF" />

      {/* floating comment, like and bookmark */}
      <rect x="333" y="70" width="76" height="44" rx="12" fill="#C5C7C8" />
      <path d="M338 114H352L336 128Z" fill="#C5C7C8" />
      <rect x="326" y="70" width="76" height="44" rx="12" fill="#F2FBFF" />
      <path d="M331 114H345L329 128Z" fill="#F2FBFF" />
      <circle cx="346" cy="92" r="4.5" fill="#EE6E02" />
      <circle cx="364" cy="92" r="4.5" fill="#4BB15F" />
      <circle cx="382" cy="92" r="4.5" fill="#EA3949" />

      <circle cx="355" cy="170" r="22" fill="#C5C7C8" />
      <circle cx="349" cy="170" r="22" fill="#EA3949" />
      <path d="M349 180l-10-10a6 6 0 0 1 10-7a6 6 0 0 1 10 7z" fill="#fff" />

      <path d="M384 148h22v48l-11-9-11 9z" fill="#D59800" />
      <path d="M380 148h22v48l-11-9-11 9z" fill="#FCB900" />

      <g transform="rotate(-18 362 238)">
        <rect x="326" y="230" width="9" height="13" rx="3" fill="#EA3949" />
        <rect x="335" y="230" width="50" height="13" rx="2" fill="#F8A11E" />
        <rect x="335" y="236" width="50" height="2.5" fill="#EE6D02" />
        <path d="M385 230V243L399 236.5Z" fill="#F7EAEA" />
        <path d="M394.6 234.4L399 236.5L394.6 238.6Z" fill="#2A2538" />
      </g>
    </svg>
  );
}

/* Explore: flat poster look (same family as the blogs art). A library
   bookcase of books, files and papers, a big magnifier, and a cat on top. */
export function ExploreArt() {
  const rowA = [[90, 12, 38, "#EE6E02"], [103, 10, 44, "#4BB15F"], [114, 14, 34, "#EA3949"], [129, 10, 46, "#FCB900"], [140, 12, 40, "#387D45"], [184, 14, 42, "#6E6D71"], [199, 10, 36, "#EE6E02"], [210, 16, 44, "#4BB15F"], [227, 12, 38, "#EA3949"]];
  const rowB = [[144, 12, 40, "#4BB15F"], [158, 10, 34, "#EE6E02"], [170, 14, 44, "#EA3949"], [186, 10, 38, "#FCB900"]];
  const rowC = [[142, 12, 36, "#EA3949"], [156, 10, 42, "#FCB900"], [168, 14, 34, "#6E6D71"]];
  const spine = (b, bottom) => (
    <g key={`${b[0]}-${bottom}`}>
      <rect x={b[0]} y={bottom - b[2]} width={b[1]} height={b[2]} rx="2" fill={b[3]} />
      <rect x={b[0] + 2} y={bottom - b[2] + 6} width={b[1] - 4} height="3" rx="1.5" fill="#fff" opacity=".6" />
    </g>
  );
  return (
    <svg viewBox="0 0 420 320" role="presentation" aria-hidden="true">
      <defs>
        <clipPath id="explore-lens"><circle cx="350" cy="128" r="23" /></clipPath>
      </defs>

      {/* poster field + floor shadow */}
      <rect x="6" y="6" width="408" height="308" rx="22" fill="#6CC5A4" />
      <rect x="30" y="272" width="360" height="10" rx="5" fill="#000" opacity=".18" />

      {/* sparkles */}
      <g fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" opacity=".9">
        <path d="M300 38v10M295 43h10" />
        <path d="M40 90v8M36 94h8" />
        <path d="M398 200v8M394 204h8" />
      </g>

      {/* cat peeking over the bookcase */}
      <g transform="translate(-62 8)">
        <path d="M210 26L220 26L215 15.5Z" fill="#2A2538" />
        <path d="M238 26L248 26L243 15.5Z" fill="#2A2538" />
        <rect x="206" y="22" width="46" height="26" rx="13" fill="#2A2538" />
        <path d="M217 33a4 4 0 0 0 8 0z" fill="#fff" />
        <path d="M233 33a4 4 0 0 0 8 0z" fill="#fff" />
        <path d="M219.4 33a1.6 1.6 0 0 0 3.2 0z" fill="#111" />
        <path d="M235.4 33a1.6 1.6 0 0 0 3.2 0z" fill="#111" />
      </g>

      {/* bookcase: hard grey shadow, body, base band */}
      <path d="M104 262a8 8 0 0 0 8 8H286a8 8 0 0 0 8-8V68a16 16 0 0 0-16-16H120a16 16 0 0 0-16 16Z" fill="#C5C7C8" />
      <path d="M70 262a8 8 0 0 0 8 8H252a8 8 0 0 0 8-8V68a16 16 0 0 0-16-16H86a16 16 0 0 0-16 16Z" fill="#F2FBFF" />
      <path d="M70 250H260V262a8 8 0 0 1-8 8H78a8 8 0 0 1-8-8z" fill="#E8F1F4" />
      <rect x="140" y="256" width="50" height="8" rx="3" fill="#D4D8DA" />

      {/* cat paws on the top edge */}
      <ellipse cx="152" cy="54" rx="8" ry="5" fill="#2A2538" />
      <ellipse cx="182" cy="54.5" rx="8" ry="5" fill="#2A2538" />

      {/* inside of the bookcase */}
      <rect x="82" y="64" width="166" height="178" rx="6" fill="#E8F1F4" />
      <rect x="82" y="64" width="166" height="6" fill="#DAE5E9" />
      <rect x="82" y="126" width="166" height="6" fill="#DAE5E9" />
      <rect x="82" y="188" width="166" height="6" fill="#DAE5E9" />
      <rect x="82" y="120" width="166" height="6" fill="#D9DDDF" />
      <rect x="82" y="182" width="166" height="6" fill="#D9DDDF" />
      <rect x="82" y="242" width="166" height="6" fill="#D9DDDF" />

      {/* top shelf */}
      {rowA.map((b) => spine(b, 120))}
      <g transform="rotate(16 168 120)">{spine([156, 12, 38, "#FCB900"], 120)}</g>

      {/* middle shelf */}
      <rect x="90" y="172" width="44" height="10" rx="2" fill="#EA3949" />
      <rect x="93" y="163" width="38" height="9" rx="2" fill="#FCB900" />
      <rect x="91" y="155" width="42" height="8" rx="2" fill="#4BB15F" />
      {rowB.map((b) => spine(b, 182))}
      <rect x="224" y="174" width="4" height="8" fill="#C2C4C6" />
      <rect x="214" y="180" width="24" height="3" rx="1.5" fill="#C2C4C6" />
      <circle cx="226" cy="160" r="15" fill="#4BB15F" />
      <path d="M212 156C218 150 224 154 226 160C228 166 234 166 240 162" fill="none" stroke="#387D45" strokeWidth="3" strokeLinecap="round" />
      <path d="M216 150a14 14 0 0 1 12-6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".5" />

      {/* bottom shelf */}
      <rect x="90" y="204" width="22" height="38" rx="3" fill="#EE6E02" />
      <rect x="94" y="210" width="14" height="10" rx="2" fill="#fff" opacity=".85" />
      <rect x="116" y="204" width="22" height="38" rx="3" fill="#4BB15F" />
      <rect x="120" y="210" width="14" height="10" rx="2" fill="#fff" opacity=".85" />
      {rowC.map((b) => spine(b, 242))}
      <rect x="190" y="236" width="50" height="6" rx="2" fill="#fff" />
      <rect x="192" y="230" width="46" height="6" rx="2" fill="#F7EAEA" />
      <rect x="191" y="224" width="48" height="6" rx="2" fill="#fff" />
      <rect x="193" y="218" width="44" height="6" rx="2" fill="#F7EAEA" />

      {/* floating document card, top right */}
      <rect x="327" y="46" width="76" height="40" rx="10" fill="#C5C7C8" />
      <rect x="322" y="46" width="76" height="40" rx="10" fill="#F2FBFF" />
      <rect x="330" y="55" width="22" height="22" rx="6" fill="#EA3949" />
      <path d="M336 66l4 4 7-8" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="358" y="57" width="32" height="5" rx="2.5" fill="#C2C4C6" />
      <rect x="358" y="66" width="22" height="4" rx="2" fill="#D4D8DA" />
      <rect x="358" y="74" width="28" height="4" rx="2" fill="#D4D8DA" />

      {/* big magnifier */}
      <circle cx="355" cy="128" r="33" fill="#C5C7C8" />
      <circle cx="350" cy="128" r="33" fill="#FCB900" />
      <circle cx="350" cy="128" r="25" fill="#F2FBFF" />
      <g clipPath="url(#explore-lens)">
        <rect x="334" y="112" width="30" height="38" rx="4" fill="#fff" stroke="#D4D8DA" strokeWidth="1.5" />
        <rect x="339" y="118" width="14" height="5" rx="2.5" fill="#EE6E02" />
        <rect x="339" y="128" width="20" height="3.5" rx="1.75" fill="#D4D8DA" />
        <rect x="339" y="135" width="16" height="3.5" rx="1.75" fill="#D4D8DA" />
        <rect x="339" y="142" width="19" height="3.5" rx="1.75" fill="#D4D8DA" />
        <path d="M326 150L366 108H378L338 152Z" fill="#6CC5A4" opacity=".16" />
      </g>
      <path d="M374 152l20 24" stroke="#C55602" strokeWidth="12" strokeLinecap="round" />
      <path d="M373 151l20 24" stroke="#EE6E02" strokeWidth="9" strokeLinecap="round" />

      {/* stack of papers on the floor */}
      <rect x="336" y="262" width="68" height="8" rx="3" fill="#EE6E02" />
      <rect x="334" y="254" width="64" height="8" rx="3" fill="#fff" />
      <rect x="338" y="246" width="60" height="8" rx="3" fill="#F7EAEA" />
      <path d="M342 250.5h24" stroke="#C2C4C6" strokeWidth="2" strokeLinecap="round" />

      {/* potted plant */}
      <path d="M36 246C28 232 28 220 36 208C44 220 44 232 36 246Z" fill="#387D45" />
      <path d="M36 246C46 236 54 230 62 232C58 242 48 248 36 246Z" fill="#4BB15F" />
      <path d="M36 246C26 238 20 232 12 236C16 244 26 248 36 246Z" fill="#4BB15F" />
      <rect x="22" y="246" width="30" height="24" rx="4" fill="#EE6E02" />
      <rect x="44" y="246" width="8" height="24" fill="#C55602" />
    </svg>
  );
}

/* ---- Poster family (shared by the Blogs / Explore / Current affairs / Quiz /
   Forum heroes): solid mint field, chunky rounded shapes, hard
   grey offset shadows, and a cat peeking over the main object. ---- */
function PosterField() {
  return (
    <>
      <rect x="6" y="6" width="408" height="308" rx="22" fill="#6CC5A4" />
      <rect x="30" y="272" width="360" height="10" rx="5" fill="#000" opacity=".18" />
    </>
  );
}

/* (x, y) is the centre of the edge the cat peeks over. Head goes behind the
   object, paws on top of it. */
function PosterCatHead({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-19 -18L-9 -18L-14 -28.5Z" fill="#2A2538" />
      <path d="M9 -18L19 -18L14 -28.5Z" fill="#2A2538" />
      <rect x="-23" y="-22" width="46" height="26" rx="13" fill="#2A2538" />
      <path d="M-12 -11a4 4 0 0 0 8 0z" fill="#fff" />
      <path d="M4 -11a4 4 0 0 0 8 0z" fill="#fff" />
      <path d="M-9.6 -11a1.6 1.6 0 0 0 3.2 0z" fill="#111" />
      <path d="M6.4 -11a1.6 1.6 0 0 0 3.2 0z" fill="#111" />
    </g>
  );
}

function PosterCatPaws({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="#2A2538">
      <ellipse cx="-15" cy="2" rx="8" ry="5" />
      <ellipse cx="15" cy="2.5" rx="8" ry="5" />
    </g>
  );
}

function PosterSparkles({ at }) {
  return (
    <g fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" opacity=".9">
      {at.map(([x, y]) => <path key={`${x}-${y}`} d={`M${x} ${y - 5}v10M${x - 5} ${y}h10`} />)}
    </g>
  );
}

/* Current affairs: a big newspaper board, wall clock, calendar and globe. */
export function CurrentAffairsArt() {
  const cols = [98, 160, 222];
  const widths = [52, 56, 44, 56, 48, 34];
  const skyline = [[104, 136, 14, 30], [120, 126, 16, 40], [138, 140, 12, 26], [152, 130, 18, 36], [172, 144, 14, 22], [188, 134, 14, 32]];
  return (
    <svg viewBox="0 0 420 320" role="presentation" aria-hidden="true">
      <defs>
        <clipPath id="ca-photo"><rect x="98" y="100" width="104" height="66" rx="7" /></clipPath>
      </defs>
      <PosterField />
      <PosterSparkles at={[[300, 40], [40, 100], [400, 200]]} />

      <PosterCatHead x={189} y={46} />

      {/* newspaper board */}
      <rect x="114" y="46" width="210" height="226" rx="14" fill="#C5C7C8" />
      <rect x="84" y="46" width="210" height="226" rx="14" fill="#F2FBFF" />
      <rect x="98" y="60" width="182" height="24" rx="7" fill="#2A2538" />
      <rect x="130" y="68" width="118" height="8" rx="4" fill="#fff" />
      <circle cx="110" cy="72" r="3" fill="#FCB900" />
      <circle cx="268" cy="72" r="3" fill="#FCB900" />
      <rect x="98" y="89" width="60" height="4" rx="2" fill="#C2C4C6" />
      <rect x="220" y="89" width="60" height="4" rx="2" fill="#C2C4C6" />

      <rect x="98" y="100" width="104" height="66" rx="7" fill="#F8A11E" />
      <g clipPath="url(#ca-photo)">
        <circle cx="176" cy="120" r="11" fill="#FCB900" />
        {skyline.map(([x, y, w, h]) => <rect key={x} x={x} y={y} width={w} height={h} fill="#2A2538" />)}
        <path d="M108 142h4M108 150h4M124 134h4M124 142h4M124 150h4M156 138h4M156 146h4M192 142h4M192 150h4" stroke="#FCB900" strokeWidth="3" />
        <path d="M104 166L146 100H158L116 166Z" fill="#fff" opacity=".15" />
      </g>
      <rect x="210" y="102" width="70" height="8" rx="4" fill="#EE6E02" />
      {[70, 62, 70, 56, 66, 40].map((w, i) => <rect key={i} x="210" y={116 + i * 8.6} width={w} height="4" rx="2" fill="#D4D8DA" />)}

      <rect x="98" y="174" width="160" height="10" rx="5" fill="#EE6E02" />
      <rect x="157" y="190" width="1.5" height="54" fill="#E1E6E8" />
      <rect x="219" y="190" width="1.5" height="54" fill="#E1E6E8" />
      {cols.map((x) => widths.map((w, i) => <rect key={`${x}-${i}`} x={x} y={192 + i * 9} width={w} height="4" rx="2" fill="#D4D8DA" />))}
      <path d="M84 252H294V258a14 14 0 0 1-14 14H98a14 14 0 0 1-14-14z" fill="#EE6E02" />
      <rect x="100" y="260" width="62" height="5" rx="2.5" fill="#fff" opacity=".85" />
      <rect x="172" y="260" width="40" height="5" rx="2.5" fill="#fff" opacity=".85" />
      <circle cx="274" cy="262" r="4" fill="#fff" />

      <PosterCatPaws x={174} y={46} />
      <PosterCatPaws x={204} y={46} />

      {/* wall clock */}
      <circle cx="361" cy="100" r="30" fill="#C5C7C8" />
      <circle cx="356" cy="100" r="30" fill="#FCB900" />
      <circle cx="356" cy="100" r="24" fill="#F2FBFF" />
      <path d="M356 80v5M356 115v5M336 100h5M371 100h5" stroke="#C2C4C6" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M356 100V87" stroke="#2A2538" strokeWidth="3" strokeLinecap="round" />
      <path d="M356 100L367 106" stroke="#EA3949" strokeWidth="3" strokeLinecap="round" />
      <circle cx="356" cy="100" r="3" fill="#2A2538" />

      {/* calendar */}
      <rect x="331" y="146" width="64" height="64" rx="10" fill="#C5C7C8" />
      <rect x="326" y="146" width="64" height="64" rx="10" fill="#F2FBFF" />
      <path d="M326 156a10 10 0 0 1 10-10H380a10 10 0 0 1 10 10V164H326z" fill="#EA3949" />
      <rect x="337" y="140" width="4" height="12" rx="2" fill="#2A2538" />
      <rect x="375" y="140" width="4" height="12" rx="2" fill="#2A2538" />
      {[172, 184, 196].map((y) => [336, 348, 360, 372].map((x) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="8" height="7" rx="2" fill={x === 360 && y === 184 ? "#EE6E02" : "#D9DDDF"} />
      )))}

      {/* globe on the floor */}
      <path d="M352 260v8" stroke="#C2C4C6" strokeWidth="4" />
      <rect x="340" y="266" width="24" height="5" rx="2.5" fill="#C2C4C6" />
      <circle cx="352" cy="242" r="19" fill="#4BB15F" />
      <path d="M337 238C344 232 350 238 352 244C354 250 360 250 367 246" fill="none" stroke="#387D45" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M342 230a19 19 0 0 1 14-8" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" opacity=".5" />

      {/* mug */}
      <path d="M28 230q-4-6 0-10t0-8M38 230q-4-6 0-10t0-8" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity=".85" />
      <path d="M46 248h4a6 6 0 0 1 0 14h-4" fill="none" stroke="#F2FBFF" strokeWidth="4" />
      <rect x="18" y="238" width="30" height="32" rx="7" fill="#F2FBFF" />
      <rect x="42" y="238" width="6" height="32" fill="#E5EBEE" />
      <rect x="18" y="250" width="30" height="5" fill="#EE6E02" />
    </svg>
  );
}

/* Quizzes: a big multiple-choice card, stopwatch and trophy. */
export function QuizArt() {
  const rows = [
    { y: 110, state: "idle" },
    { y: 146, state: "right" },
    { y: 182, state: "wrong" },
    { y: 218, state: "idle" },
  ];
  return (
    <svg viewBox="0 0 420 320" role="presentation" aria-hidden="true">
      <PosterField />
      <PosterSparkles at={[[300, 40], [38, 220], [400, 150]]} />

      <PosterCatHead x={175} y={46} />

      {/* quiz card */}
      <rect x="100" y="46" width="210" height="226" rx="16" fill="#C5C7C8" />
      <rect x="70" y="46" width="210" height="226" rx="16" fill="#F2FBFF" />
      <rect x="84" y="60" width="182" height="40" rx="11" fill="#EE6E02" />
      <circle cx="104" cy="80" r="11" fill="#FCB900" />
      <path d="M100.5 77a3.8 3.8 0 1 1 6 3c-1.8 1-2 1.8-2 3" fill="none" stroke="#2A2538" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="104.4" cy="88" r="1.5" fill="#2A2538" />
      <rect x="124" y="72" width="120" height="6" rx="3" fill="#fff" />
      <rect x="124" y="84" width="84" height="6" rx="3" fill="#fff" opacity=".8" />

      {rows.map((r) => {
        const right = r.state === "right";
        const wrong = r.state === "wrong";
        return (
          <g key={r.y}>
            <rect x="84" y={r.y} width="182" height="28" rx="9" fill={right ? "#4BB15F" : wrong ? "#F7D9DC" : "#E8F1F4"} />
            <circle cx="101" cy={r.y + 14} r="7" fill={right ? "#fff" : wrong ? "#EA3949" : "#fff"} stroke={right || wrong ? "none" : "#C2C4C6"} strokeWidth="2" />
            {right && <path d="M97.5 124.5l2.8 3 5-6" transform={`translate(0 ${r.y - 110})`} fill="none" stroke="#4BB15F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />}
            {wrong && <path d="M98.5 195.5l5 5M103.5 195.5l-5 5" transform={`translate(0 ${r.y - 182})`} fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />}
            <rect x="118" y={r.y + 8} width="96" height="4.5" rx="2.25" fill={right ? "#fff" : wrong ? "#E79AA2" : "#C2C4C6"} />
            <rect x="118" y={r.y + 16} width="62" height="4" rx="2" fill={right ? "#fff" : wrong ? "#EBB6BC" : "#D4D8DA"} opacity={right ? 0.7 : 1} />
          </g>
        );
      })}
      <rect x="84" y="256" width="182" height="6" rx="3" fill="#D9DDDF" />
      <rect x="84" y="256" width="112" height="6" rx="3" fill="#EE6E02" />

      <PosterCatPaws x={160} y={46} />
      <PosterCatPaws x={190} y={46} />

      {/* stopwatch */}
      <circle cx="361" cy="100" r="28" fill="#C5C7C8" />
      <rect x="351" y="64" width="10" height="8" rx="2" fill="#2A2538" />
      <circle cx="356" cy="100" r="28" fill="#EA3949" />
      <circle cx="356" cy="100" r="21" fill="#F2FBFF" />
      <path d="M356 100V82A18 18 0 0 1 372 91Z" fill="#FCB900" />
      <path d="M356 100L366 90" stroke="#2A2538" strokeWidth="3" strokeLinecap="round" />
      <circle cx="356" cy="100" r="3" fill="#2A2538" />

      {/* trophy */}
      <g transform="translate(5 0)">
        <path d="M338 150h40v18a20 20 0 0 1-40 0z" fill="#C5C7C8" />
        <rect x="354" y="188" width="8" height="14" fill="#C5C7C8" />
        <rect x="342" y="200" width="32" height="9" rx="3" fill="#C5C7C8" />
      </g>
      <path d="M338 158c-14 0-14 18 0 18M378 158c14 0 14 18 0 18" fill="none" stroke="#D59800" strokeWidth="5" strokeLinecap="round" />
      <path d="M338 150h40v18a20 20 0 0 1-40 0z" fill="#FCB900" />
      <rect x="354" y="188" width="8" height="14" fill="#D59800" />
      <rect x="342" y="200" width="32" height="9" rx="3" fill="#FCB900" />
      <path d="M358 158l3 6 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z" fill="#fff" />

      {/* pencil on the floor */}
      <rect x="338" y="256" width="8" height="10" rx="3" fill="#EA3949" />
      <rect x="346" y="256" width="44" height="10" rx="2" fill="#F8A11E" />
      <rect x="346" y="261" width="44" height="2.5" fill="#EE6D02" />
      <path d="M390 256V266L402 261Z" fill="#F7EAEA" />
      <path d="M398.5 259V263L402 261Z" fill="#2A2538" />

      {/* idea bulb */}
      <path d="M38 128l-8-6M38 118v-8M48 128l8-6" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity=".85" />
      <circle cx="38" cy="150" r="15" fill="#FCB900" />
      <rect x="31" y="163" width="14" height="8" rx="2.5" fill="#F2FBFF" />
      <path d="M32 152l3 5 3-7 3 7 3-5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Forum: a question bubble, an answer bubble, reactions and a few members. */
export function ForumArt() {
  const people = [
    { x: 44, skin: "#E0A98A", hair: "#2A2538", shirt: "#EE6E02" },
    { x: 82, skin: "#B96F4B", hair: "#2A2538", shirt: "#FCB900" },
    { x: 120, skin: "#F2C2B0", hair: "#6B4A3A", shirt: "#EA3949" },
  ];
  return (
    <svg viewBox="0 0 420 320" role="presentation" aria-hidden="true">
      <PosterField />
      <PosterSparkles at={[[300, 40], [30, 90], [400, 230]]} />

      <PosterCatHead x={161} y={54} />

      {/* question bubble */}
      <g fill="#C5C7C8" transform="translate(22 0)">
        <rect x="60" y="54" width="202" height="112" rx="24" />
        <path d="M84 160L84 194L118 160Z" />
      </g>
      <rect x="60" y="54" width="202" height="112" rx="24" fill="#F2FBFF" />
      <path d="M84 160L84 194L118 160Z" fill="#F2FBFF" />
      <PosterCatPaws x={146} y={54} />
      <PosterCatPaws x={176} y={54} />
      <circle cx="96" cy="92" r="17" fill="#FCB900" />
      <circle cx="96" cy="88" r="6" fill="#fff" />
      <path d="M85 106a11 9 0 0 1 22 0z" fill="#fff" />
      <rect x="122" y="80" width="96" height="9" rx="4.5" fill="#EE6E02" />
      <rect x="122" y="96" width="112" height="5" rx="2.5" fill="#D4D8DA" />
      <rect x="122" y="106" width="88" height="5" rx="2.5" fill="#D4D8DA" />
      <rect x="78" y="128" width="46" height="18" rx="9" fill="#E8F1F4" />
      <circle cx="89" cy="137" r="3.5" fill="#4BB15F" />
      <rect x="128" y="128" width="46" height="18" rx="9" fill="#E8F1F4" />
      <circle cx="139" cy="137" r="3.5" fill="#EE6E02" />
      <circle cx="250" cy="64" r="16" fill="#EA3949" />
      <path d="M245.5 61a4.5 4.5 0 1 1 7 3.6c-2 1.2-2.5 2-2.5 3.6" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="250.2" cy="74" r="1.9" fill="#fff" />

      {/* answer bubble */}
      <g fill="#C5C7C8" transform="translate(8 0)">
        <rect x="150" y="180" width="222" height="72" rx="22" />
        <path d="M338 246L350 270L312 246Z" />
      </g>
      <rect x="150" y="176" width="222" height="76" rx="22" fill="#4BB15F" />
      <path d="M338 246L350 270L312 246Z" fill="#4BB15F" />
      <circle cx="182" cy="214" r="16" fill="#fff" />
      <path d="M175 214l5 5 9-10" fill="none" stroke="#4BB15F" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="208" y="198" width="124" height="8" rx="4" fill="#fff" />
      <rect x="208" y="212" width="140" height="5" rx="2.5" fill="#fff" opacity=".75" />
      <rect x="208" y="222" width="98" height="5" rx="2.5" fill="#fff" opacity=".75" />

      {/* reactions */}
      <circle cx="341" cy="96" r="22" fill="#C5C7C8" />
      <circle cx="336" cy="96" r="22" fill="#EA3949" />
      <path d="M336 106l-10-10a6 6 0 0 1 10-7a6 6 0 0 1 10 7z" fill="#fff" />
      <rect x="301" y="132" width="80" height="32" rx="14" fill="#C5C7C8" />
      <path d="M316 164H330L314 176Z" fill="#C5C7C8" />
      <rect x="296" y="132" width="80" height="32" rx="14" fill="#F2FBFF" />
      <path d="M311 164H325L309 176Z" fill="#F2FBFF" />
      <circle cx="318" cy="148" r="4" fill="#EE6E02" />
      <circle cx="336" cy="148" r="4" fill="#4BB15F" />
      <circle cx="354" cy="148" r="4" fill="#EA3949" />

      {/* members */}
      {people.map((p) => (
        <g key={p.x}>
          <path d={`M${p.x - 20} 270a20 20 0 0 1 40 0z`} fill={p.shirt} />
          <rect x={p.x - 4} y="246" width="8" height="8" fill={p.skin} />
          <circle cx={p.x} cy="238" r="13" fill={p.skin} />
          <path d={`M${p.x - 13} 238a13 13 0 0 1 26 0Q${p.x} 230 ${p.x - 13} 238z`} fill={p.hair} />
        </g>
      ))}
    </svg>
  );
}
