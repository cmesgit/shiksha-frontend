/* icons.jsx — inline SVG icon set for the Skill Development feature.
   Each icon takes an optional { size } prop. */
import React from "react";

const s = (size, d, extra = {}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={extra.fill || "none"}
    stroke={extra.fill ? "none" : "currentColor"} strokeWidth={extra.sw || 2}
    strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);

export const Icon = {
  search: ({ size = 16 } = {}) => s(size, <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>),
  arrow:  ({ size = 16 } = {}) => s(size, <path d="M5 12h14M13 5l7 7-7 7" />),
  star:   ({ size = 14 } = {}) => s(size, <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />, { fill: "currentColor" }),
  check:  ({ size = 14 } = {}) => s(size, <path d="M20 6 9 17l-5-5" />, { sw: 2.5 }),
  user:   ({ size = 16 } = {}) => s(size, <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>),
  cap:    ({ size = 18 } = {}) => s(size, <><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>),
  msg:    ({ size = 16 } = {}) => s(size, <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />),
  vid:    ({ size = 16 } = {}) => s(size, <><path d="m23 7-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" /></>),
  cal:    ({ size = 16 } = {}) => s(size, <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>),
  close:  ({ size = 16 } = {}) => s(size, <path d="M18 6 6 18M6 6l12 12" />),
  back:   ({ size = 16 } = {}) => s(size, <path d="m15 18-6-6 6-6" />),
  plus:   ({ size = 14 } = {}) => s(size, <path d="M12 5v14M5 12h14" />, { sw: 2.5 }),
  shield: ({ size = 14 } = {}) => s(size, <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></>),
  spark:  ({ size = 16 } = {}) => s(size, <path d="M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />),
  pin:    ({ size = 14 } = {}) => s(size, <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>),
  users:  ({ size = 16 } = {}) => s(size, <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>),
  clock:  ({ size = 16 } = {}) => s(size, <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  clipboard: ({ size = 16 } = {}) => s(size, <><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M9 12h6M9 16h4" /></>),
  award:  ({ size = 16 } = {}) => s(size, <><circle cx="12" cy="8" r="6" /><path d="M8.21 13.89 7 22l5-3 5 3-1.21-8.12" /></>),
  mic:    ({ size = 16 } = {}) => s(size, <><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0M12 17v4" /></>),
  doc:    ({ size = 16 } = {}) => s(size, <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h6" /></>),
};

export default Icon;
