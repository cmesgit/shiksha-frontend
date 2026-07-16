// Small presentational helpers shared across the forum module.

const PALETTE = ["#0f8f7e", "#6b58d3", "#ff8f01", "#125027", "#c0446b", "#8a5a00", "#2f6db5", "#a23e9c"];

export function initialsOf(name) {
  const words = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function colorFor(key) {
  const s = String(key || "");
  let total = 0;
  for (let i = 0; i < s.length; i++) total += s.charCodeAt(i);
  return PALETTE[total % PALETTE.length];
}

export function fmtNum(n) {
  const v = Number(n || 0);
  if (v >= 1000000) return (v / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
  if (v >= 1000) return (v / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(v);
}

// "asked · 4h" style relative time from an ISO string.
export function timeAgo(iso) {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const s = Math.max(1, Math.floor((Date.now() - then) / 1000));
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d`;
  const mo = Math.floor(d / 30);
  if (mo < 12) return `${mo}mo`;
  return `${Math.floor(mo / 12)}y`;
}

export function fmtDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

// Normalise an author badge coming from the API into a consistent shape,
// tolerating either a full badge object or a bare username string.
export function normAuthor(author, username) {
  if (author && typeof author === "object") {
    return {
      username: author.username || username || "",
      name: author.display_name || author.username || username || "User",
      credential: author.credential || "",
      initials: author.initials || initialsOf(author.display_name || author.username),
      color: author.color || colorFor(author.username || username),
      avatar_url: author.avatar_url || "",
    };
  }
  const u = username || author || "User";
  return { username: u, name: u, credential: "", initials: initialsOf(u), color: colorFor(u), avatar_url: "" };
}

export const FEED_TABS = [
  { id: "foryou", label: "For You", sort: "foryou" },
  { id: "trending", label: "Trending", sort: "trending" },
  { id: "latest", label: "Latest", sort: "latest" },
  { id: "unanswered", label: "Unanswered", sort: "unanswered" },
];
