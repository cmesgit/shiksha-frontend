// PLACEMENT: src/forum/utils.js   (NEW FILE — landing/frontend app)
//
// Formatting + deterministic styling helpers lifted from the approved
// design (fmtNum / fmtAge / avatar gradients / rotating tag palette).

export const fmtNum = (n) => {
  const v = Number(n) || 0;
  return v >= 1000 ? (v / 1000).toFixed(v >= 10000 ? 0 : 1).replace(/\.0$/, "") + "k" : String(v);
};

export const fmtAge = (iso) => {
  if (!iso) return "";
  const m = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 60000));
  if (m < 1) return "just now";
  if (m < 60) return m + "m ago";
  if (m < 1440) return Math.floor(m / 60) + "h ago";
  const d = Math.floor(m / 1440);
  return d < 30 ? d + "d ago" : new Date(iso).toLocaleDateString();
};

export const initialsOf = (name = "") => {
  const parts = String(name).trim().split(/[\s_.-]+/).filter(Boolean);
  if (!parts.length) return "?";
  return ((parts[0][0] || "") + (parts[1]?.[0] || "")).toUpperCase();
};

// The design's three avatar gradients, picked deterministically per user.
const GRADS = [
  "linear-gradient(135deg,#1b9c85,#125027)",
  "linear-gradient(135deg,#ff8f01,#d97600)",
  "linear-gradient(135deg,#125027,#1b9c85)",
];
const hash = (s = "") => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};
export const avatarGrad = (name = "") => GRADS[hash(String(name)) % GRADS.length];

// Rotating category/tag palette (design's three tint/color pairs).
const TAG_COLORS = [
  { color: "#125027", tint: "rgba(18,80,39,.09)" },
  { color: "#1b9c85", tint: "rgba(27,156,133,.12)" },
  { color: "#d97600", tint: "rgba(255,143,1,.13)" },
];
export const tagColor = (name = "") => TAG_COLORS[hash(String(name).toLowerCase()) % TAG_COLORS.length];

export const titleCase = (s = "") => String(s).replace(/\b\w/g, (c) => c.toUpperCase());
