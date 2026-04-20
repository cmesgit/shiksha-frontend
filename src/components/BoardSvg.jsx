const fontSizeFor = (code) => {
  const len = code.replace(/\s+/g, '').length;
  if (len <= 3) return 88;
  if (len <= 4) return 80;
  if (len <= 5) return 68;
  if (len <= 6) return 56;
  if (len <= 7) return 46;
  return 38;
};

const BoardSvg = ({ code }) => {
  const id = code.toLowerCase().replace(/[\s()]/g, '-');
  const parts = code.includes(' ') ? code.split(' ') : null;
  const fontSize = fontSizeFor(code);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 350 197"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a3a28" />
          <stop offset="100%" stopColor="#0d1f16" />
        </linearGradient>
        <linearGradient id={`tint-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1db97a" stopOpacity="0.38" />
          <stop offset="55%" stopColor="#0a4a2e" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id={`vignette-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="40%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      <rect width="350" height="197" fill={`url(#sky-${id})`} />

      {/* Clouds */}
      <ellipse cx="55"  cy="26" rx="42" ry="9"  fill="#1e4a30" opacity="0.5" />
      <ellipse cx="90"  cy="20" rx="32" ry="8"  fill="#1e4a30" opacity="0.4" />
      <ellipse cx="245" cy="30" rx="52" ry="10" fill="#1e4a30" opacity="0.45" />
      <ellipse cx="295" cy="24" rx="36" ry="8"  fill="#1e4a30" opacity="0.35" />
      <ellipse cx="178" cy="17" rx="40" ry="7"  fill="#1e4a30" opacity="0.3" />

      {/* Trees left */}
      <rect x="0"  y="85" width="6" height="45" fill="#0c2a18" opacity="0.7" />
      <ellipse cx="3"  cy="82" rx="9" ry="14" fill="#0f3320" opacity="0.75" />
      <rect x="10" y="90" width="5" height="40" fill="#0c2a18" opacity="0.6" />
      <ellipse cx="12" cy="86" rx="8" ry="12" fill="#0f3320" opacity="0.65" />
      <rect x="22" y="88" width="5" height="42" fill="#0c2a18" opacity="0.55" />
      <ellipse cx="24" cy="84" rx="7" ry="11" fill="#0f3320" opacity="0.6" />

      {/* Trees right */}
      <rect x="322" y="88" width="6" height="42" fill="#0c2a18" opacity="0.7" />
      <ellipse cx="325" cy="84" rx="9" ry="13" fill="#0f3320" opacity="0.75" />
      <rect x="334" y="92" width="5" height="38" fill="#0c2a18" opacity="0.6" />
      <ellipse cx="336" cy="88" rx="7" ry="11" fill="#0f3320" opacity="0.65" />
      <rect x="342" y="90" width="6" height="40" fill="#0c2a18" opacity="0.55" />
      <ellipse cx="345" cy="86" rx="8" ry="12" fill="#0f3320" opacity="0.6" />

      {/* Building body */}
      <rect x="55" y="65" width="240" height="110" fill="#122a1e" opacity="0.9" />

      {/* Roof parapet */}
      <rect x="55" y="60" width="240" height="8" fill="#1a3d2a" />
      {[60, 86, 112, 138, 164, 190, 216, 242, 268].map((x) => (
        <rect key={x} x={x} y="55" width="18" height="13" fill="#1a3d2a" />
      ))}

      {/* Sign band */}
      <rect x="90" y="60" width="170" height="20" fill="#0f2319" rx="2" />
      <text x="175" y="75" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="700"
            fill="#7ecfa0" textAnchor="middle" letterSpacing="2">{code}</text>

      {/* Floor lines */}
      <line x1="55" y1="100" x2="295" y2="100" stroke="#1d3f2b" strokeWidth="1.5" />
      <line x1="55" y1="130" x2="295" y2="130" stroke="#1d3f2b" strokeWidth="1.5" />
      <line x1="55" y1="158" x2="295" y2="158" stroke="#1d3f2b" strokeWidth="1.5" />

      {/* Windows row 1 */}
      {[68, 98, 212, 242, 270].map((x) => (
        <rect key={x} x={x} y="70" width="20" height="26" rx="2" fill="#0a1f14" stroke="#2a5c3a" strokeWidth="1" />
      ))}
      {/* Windows row 2 */}
      {[68, 98, 128, 202, 232, 262].map((x) => (
        <rect key={x} x={x} y="105" width="20" height="20" rx="2" fill="#0a1f14" stroke="#2a5c3a" strokeWidth="1" />
      ))}
      {/* Windows row 3 */}
      {[68, 98, 128, 202, 232, 262].map((x) => (
        <rect key={x} x={x} y="134" width="20" height="20" rx="2" fill="#0a1f14" stroke="#2a5c3a" strokeWidth="1" />
      ))}

      {/* Entrance */}
      <rect x="155" y="138" width="40" height="37" rx="3" fill="#081812" stroke="#2a5c3a" strokeWidth="1" />
      <line x1="175" y1="138" x2="175" y2="175" stroke="#2a5c3a" strokeWidth="1" />

      {/* Ground */}
      <rect x="0" y="172" width="350" height="25" fill="#0a1f12" />
      <rect x="145" y="168" width="60" height="5" fill="#0f2a1a" />
      <rect x="150" y="164" width="50" height="5" fill="#112d1c" />

      <rect width="350" height="197" fill={`url(#tint-${id})`} />
      <rect width="350" height="197" fill={`url(#vignette-${id})`} />

      {/* Main label */}
      {parts ? (
        <>
          <text x="175" y="105" fontFamily="Arial Black, Arial, sans-serif"
                fontSize={fontSize} fontWeight="900" fill="white"
                textAnchor="middle" dominantBaseline="middle" letterSpacing="3">
            {parts[0]}
          </text>
          <text x="175" y={105 + Math.round(fontSize * 0.9)}
                fontFamily="Arial Black, Arial, sans-serif"
                fontSize={Math.round(fontSize * 0.55)} fontWeight="900" fill="white"
                textAnchor="middle" dominantBaseline="middle" letterSpacing="2">
            {parts.slice(1).join(' ')}
          </text>
        </>
      ) : (
        <text x="175" y="118" fontFamily="Arial Black, Arial, sans-serif"
              fontSize={fontSize} fontWeight="900" fill="white"
              textAnchor="middle" dominantBaseline="middle" letterSpacing="3">
          {code}
        </text>
      )}
    </svg>
  );
};

export default BoardSvg;
