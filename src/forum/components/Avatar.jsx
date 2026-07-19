import React from "react";
import { initialsOf, colorFor } from "../utils";

// An initials/colour avatar, or the user's image if one is present.
export default function Avatar({ name, initials, color, url, size = 38, onClick, style }) {
  const ini = initials || initialsOf(name);
  const bg = color || colorFor(name);
  return (
    <span
      className="fm-avatar"
      onClick={onClick}
      style={{ width: size, height: size, background: bg, fontSize: Math.round(size * 0.36), cursor: onClick ? "pointer" : "default", ...style }}
      title={name || ""}
    >
      {url ? <img src={url} alt={name || ""} /> : ini}
    </span>
  );
}
