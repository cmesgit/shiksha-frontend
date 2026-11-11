// Minimal inline icon set (Feather-style) used across the forum module.
import React from "react";
import ScribbleIcon from "../../components/icons/ScribbleIcon";

const base = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
const Svg = ({ size = 18, children, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...rest}>{children}</svg>
);
// Icons with a scribble-set equivalent render ScribbleIcon (same default size).
// `fill` (the old "active" toggle on bookmark/heart) is dropped: the set is outline-only.
const scribble = (name) => {
  const Ic = ({ size = 18, ...rest }) => {
    delete rest.fill;
    return <ScribbleIcon name={name} size={size} {...rest} />;
  };
  return Ic;
};

export const IcHome = scribble("home");
export const IcGrid = scribble("dashboard");
export const IcUsers = scribble("users");
export const IcActivity = (p) => <Svg {...p}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></Svg>;
export const IcBell = scribble("bell");
export const IcBookmark = scribble("bookmark");
export const IcEdit = scribble("edit");
export const IcSearch = scribble("search");
export const IcPlus = scribble("plus");
export const IcChevronDown = scribble("chevron-down");
export const IcHeart = scribble("heart");
export const IcMore = (p) => <Svg {...p}><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></Svg>;
export const IcUp = ({ fill, ...p }) => <Svg {...p}><path d="m18 15-6-6-6 6" fill={fill || "none"} /></Svg>;
export const IcDown = ({ fill, ...p }) => <Svg {...p}><path d="m6 9 6 6 6-6" fill={fill || "none"} /></Svg>;
export const IcShare = scribble("share");
export const IcFlag = (p) => <Svg {...p}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><path d="M4 22v-7" /></Svg>;
export const IcCheck = scribble("check");
export const IcMessage = scribble("message");
export const IcArrowLeft = scribble("arrow-left");
export const IcImage = (p) => <Svg {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" /></Svg>;
export const IcPaperclip = (p) => <Svg {...p}><path d="m21.4 11.1-8.5 8.5a5 5 0 0 1-7.1-7.1l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4l7.8-7.8" /></Svg>;
