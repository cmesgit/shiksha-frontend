/* Lightweight inline icon set for the redesigned marketing pages.
   Stroke icons inherit `currentColor`, so tinting is done in CSS. */

import ScribbleIcon from "../icons/ScribbleIcon";

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

export const IcArrowRight = (p) => <ScribbleIcon name="arrow-right" {...p} />;

export const IcArrowLeft = (p) => <ScribbleIcon name="arrow-left" {...p} />;

export const IcSearch = (p) => <ScribbleIcon name="search" {...p} />;

export const IcVideo = (p) => <ScribbleIcon name="video" {...p} />;

export const IcCheck = (p) => <ScribbleIcon name="check" {...p} />;

export const IcGradCap = (p) => <ScribbleIcon name="graduation-cap" {...p} />;

export const IcShield = (p) => (
  <S {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </S>
);

export const IcLock = (p) => <ScribbleIcon name="lock" {...p} />;

export const IcPhone = (p) => (
  <S {...p}>
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <path d="M12 18h.01" />
  </S>
);

export const IcEye = (p) => <ScribbleIcon name="eye" {...p} />;

export const IcChat = (p) => <ScribbleIcon name="message" {...p} />;

export const IcBook = (p) => <ScribbleIcon name="book" {...p} />;

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

export const IcClock = (p) => <ScribbleIcon name="clock" {...p} />;

export const IcHeart = (p) => <ScribbleIcon name="heart" {...p} />;

export const IcPlay = (p) => <ScribbleIcon name="play" filled {...p} />;

export const IcPlayCircle = (p) => <ScribbleIcon name="play" {...p} />;

export const IcCalendar = (p) => <ScribbleIcon name="calendar" {...p} />;

export const IcStar = ({ off = false, ...p }) => (
  <svg viewBox="0 0 24 24" fill={off ? "#E3E8E4" : "#FFB21D"} aria-hidden="true" {...p}>
    <path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 17.1l-5.7 3.1 1.2-6.3L2.8 9.5l6.4-.8z" />
  </svg>
);

export const IcMenu = (p) => <ScribbleIcon name="menu" {...p} />;

export const IcX = (p) => <ScribbleIcon name="close" {...p} />;

export const IcChevronDown = (p) => <ScribbleIcon name="chevron-down" {...p} />;

export const IcFileText = (p) => <ScribbleIcon name="file-text" {...p} />;

export const IcGlobe = (p) => <ScribbleIcon name="globe" {...p} />;

export const IcForum = (p) => (
  <S {...p}>
    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
  </S>
);

export const IcLibrary = (p) => <ScribbleIcon name="books" {...p} />;

export const IcCompass = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m16 8-2.5 5.5L8 16l2.5-5.5z" />
  </S>
);

export const IcInfo = (p) => <ScribbleIcon name="info" {...p} />;

export const IcMail = (p) => <ScribbleIcon name="mail" {...p} />;

export const IcHelp = (p) => <ScribbleIcon name="help" {...p} />;

export const IcUsers = (p) => <ScribbleIcon name="users" {...p} />;

export const IcPlus = (p) => <ScribbleIcon name="plus" {...p} />;

export const IcExternal = (p) => (
  <S sw={2.2} {...p}>
    <path d="M7 17L17 7M9 7h8v8" />
  </S>
);

export const IcLightbulb = (p) => <ScribbleIcon name="idea" {...p} />;

export const IcSparkles = (p) => (
  <S {...p}>
    <path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.13-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.13a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.13 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.13a.5.5 0 0 1-.96 0z" />
    <path d="M20 3v4" />
    <path d="M22 5h-4" />
    <path d="M4 17v2" />
    <path d="M5 18H3" />
  </S>
);

export const IcTrendingUp = (p) => <ScribbleIcon name="progress" {...p} />;

export const IcMonitor = (p) => <ScribbleIcon name="laptop" {...p} />;
