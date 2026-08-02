/* Lightweight inline icon set for the redesigned marketing pages.
   Stroke icons inherit `currentColor`, so tinting is done in CSS. */

const S = ({ children, sw = 2, ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
);

export const IcArrowRight = (p) => (
  <S sw={2.4} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </S>
);

export const IcArrowLeft = (p) => (
  <S sw={2.4} {...p}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </S>
);

export const IcSearch = (p) => (
  <S sw={2.2} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </S>
);

export const IcVideo = (p) => (
  <S sw={2.2} {...p}>
    <path d="M15 10l4.55-2.28A1 1 0 0121 8.62v6.76a1 1 0 01-1.45.9L15 14M5 6h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
  </S>
);

export const IcCheck = (p) => (
  <S sw={2.6} {...p}>
    <path d="M20 6L9 17l-5-5" />
  </S>
);

export const IcGradCap = (p) => (
  <S {...p}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </S>
);

export const IcShield = (p) => (
  <S {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </S>
);

export const IcLock = (p) => (
  <S {...p}>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </S>
);

export const IcPhone = (p) => (
  <S {...p}>
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <path d="M12 18h.01" />
  </S>
);

export const IcEye = (p) => (
  <S {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </S>
);

export const IcChat = (p) => (
  <S {...p}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </S>
);

export const IcBook = (p) => (
  <S {...p}>
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
  </S>
);

export const IcTarget = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </S>
);

export const IcBriefcase = (p) => (
  <S {...p}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
    <path d="M3 13h18" />
  </S>
);

export const IcClock = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </S>
);

export const IcHeart = (p) => (
  <S sw={1.9} {...p}>
    <path d="M12 20.5s-8-4.9-8-11a4.6 4.6 0 0 1 8-3.1 4.6 4.6 0 0 1 8 3.1c0 6.1-8 11-8 11z" />
  </S>
);

export const IcPlay = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const IcPlayCircle = (p) => (
  <S sw={1.9} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10 8.5 16 12l-6 3.5Z" />
  </S>
);

export const IcCalendar = (p) => (
  <S {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h18" />
  </S>
);

export const IcStar = ({ off = false, ...p }) => (
  <svg viewBox="0 0 24 24" fill={off ? "#E3E8E4" : "#FFB21D"} aria-hidden="true" {...p}>
    <path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 17.1l-5.7 3.1 1.2-6.3L2.8 9.5l6.4-.8z" />
  </svg>
);

export const IcMenu = (p) => (
  <S sw={2} {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </S>
);

export const IcX = (p) => (
  <S sw={2} {...p}>
    <path d="M18 6L6 18M6 6l12 12" />
  </S>
);

export const IcChevronDown = (p) => (
  <S sw={2.2} {...p}>
    <path d="M6 9l6 6 6-6" />
  </S>
);

export const IcFileText = (p) => (
  <S {...p}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </S>
);

export const IcGlobe = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
  </S>
);

export const IcForum = (p) => (
  <S {...p}>
    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
  </S>
);

export const IcLibrary = (p) => (
  <S {...p}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M9 7h6" />
  </S>
);

export const IcCompass = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m16 8-2.5 5.5L8 16l2.5-5.5z" />
  </S>
);

export const IcInfo = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16v-4M12 8h.01" />
  </S>
);

export const IcMail = (p) => (
  <S {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </S>
);

export const IcHelp = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.6-3 4M12 17.5h.01" />
  </S>
);

export const IcUsers = (p) => (
  <S {...p}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9.5" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M15.5 3.13a4 4 0 0 1 0 7.75" />
  </S>
);

export const IcPlus = (p) => (
  <S sw={2.6} {...p}>
    <path d="M12 5v14M5 12h14" />
  </S>
);

export const IcExternal = (p) => (
  <S sw={2.2} {...p}>
    <path d="M7 17L17 7M9 7h8v8" />
  </S>
);

export const IcLightbulb = (p) => (
  <S {...p}>
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8a6 6 0 0 0-12 0c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
  </S>
);

export const IcSparkles = (p) => (
  <S {...p}>
    <path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.13-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.13a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.13 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.13a.5.5 0 0 1-.96 0z" />
    <path d="M20 3v4" />
    <path d="M22 5h-4" />
    <path d="M4 17v2" />
    <path d="M5 18H3" />
  </S>
);

export const IcTrendingUp = (p) => (
  <S {...p}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </S>
);

export const IcMonitor = (p) => (
  <S {...p}>
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </S>
);
