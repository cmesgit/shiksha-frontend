/* icons.jsx — inline SVG icon set for the Skill Development feature.
   Each icon takes an optional { size } prop. */
import React from "react";
import ScribbleIcon from "../icons/ScribbleIcon";

const s = (size, d, extra = {}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={extra.fill || "none"}
    stroke={extra.fill ? "none" : "currentColor"} strokeWidth={extra.sw || 2}
    strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);

export const Icon = {
  search: ({ size = 16 } = {}) => <ScribbleIcon name="search" size={size} />,
  arrow:  ({ size = 16 } = {}) => <ScribbleIcon name="arrow-right" size={size} />,
  star:   ({ size = 14 } = {}) => <ScribbleIcon name="star" size={size} filled />,
  check:  ({ size = 14 } = {}) => <ScribbleIcon name="check" size={size} />,
  user:   ({ size = 16 } = {}) => <ScribbleIcon name="user" size={size} />,
  cap:    ({ size = 18 } = {}) => <ScribbleIcon name="graduation-cap" size={size} />,
  msg:    ({ size = 16 } = {}) => <ScribbleIcon name="message" size={size} />,
  vid:    ({ size = 16 } = {}) => <ScribbleIcon name="video" size={size} />,
  cal:    ({ size = 16 } = {}) => <ScribbleIcon name="calendar" size={size} />,
  close:  ({ size = 16 } = {}) => <ScribbleIcon name="close" size={size} />,
  back:   ({ size = 16 } = {}) => <ScribbleIcon name="chevron-left" size={size} />,
  plus:   ({ size = 14 } = {}) => <ScribbleIcon name="plus" size={size} />,
  shield: ({ size = 14 } = {}) => s(size, <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></>),
  spark:  ({ size = 16 } = {}) => s(size, <path d="M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />),
  pin:    ({ size = 14 } = {}) => <ScribbleIcon name="location" size={size} />,
  users:  ({ size = 16 } = {}) => <ScribbleIcon name="users" size={size} />,
  clock:  ({ size = 16 } = {}) => <ScribbleIcon name="clock" size={size} />,
  clipboard: ({ size = 16 } = {}) => s(size, <><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M9 12h6M9 16h4" /></>),
  award:  ({ size = 16 } = {}) => <ScribbleIcon name="award" size={size} />,
  mic:    ({ size = 16 } = {}) => <ScribbleIcon name="microphone" size={size} />,
  doc:    ({ size = 16 } = {}) => <ScribbleIcon name="file-text" size={size} />,
};

export default Icon;
