// Where a notification's link_url should actually take you, from the
// PUBLIC marketing site.
//
// Extracted from NotificationBell so the rules are testable in isolation —
// they are pure string routing with several one-letter traps in them, and
// getting one wrong means a dead click that no build or lint catches.
//
// The three counselling spellings, all simultaneously correct:
//   /counseling/*   (one l)  → LEARNER dashboard          (APP_URL)
//   /counselor/*    (one l)  → backend's counsellor prefix, mounted in the
//                              TEACHER app as /teacher/counsellor/* (two l)
//   /counselling/*  (two l)  → this marketing site's own funnel
//
// The core problem this solves: almost every notification deep link
// (/skill-dev/*, /subjects/*, /private-sessions, /chat/*, /live-sessions)
// targets a route that exists only in a dashboard app. react-router
// navigate() sent all of them to this app's catch-all NotFound.

// Prefixes this marketing SPA genuinely serves — see the route table in
// components/App.jsx.
export const LOCAL_PREFIXES = [
  "/forum",
  "/explore",
  "/blogs",
  "/courses",
  "/experts",
  "/scholarship",
  "/counselling",   // two l — this app's spelling
];

export const TEACHER_PREFIXES = ["/teacher", "/counselor"];

const SKILL_PREFIXES = ["/skill-dev", "/skill-messages", "/skill-session"];
const ACADEMY_PREFIXES = [
  "/subjects", "/live", "/live-sessions", "/private-sessions",
  "/group-sessions", "/my-courses", "/assignments",
  "/study-material",   // materials.uploaded deep-links here
];

// Segment-anchored so "/livestream-x" can never match "/live", and
// "/coursesomething" can never match "/courses".
export function hasPrefix(path, prefixes) {
  return prefixes.some(
    (p) => path === p || path.startsWith(p + "/") || path.startsWith(p + "?")
  );
}

export function isLocalRoute(path) {
  return hasPrefix(path, LOCAL_PREFIXES);
}

export function isTeacherRoute(path) {
  return hasPrefix(path, TEACHER_PREFIXES);
}

// Mirrors the rewrite inside shiksha-teacher-dashboard's NotificationBell.
// Without it, a counsellor notification clicked from the public navbar hops
// to the teacher app and lands on a route that does not exist there.
export function toTeacherAppPath(path) {
  return path
    .replace(/^\/counselor\/appointments/, "/teacher/counsellor/appointments")
    .replace(/^\/counselor\/availability/, "/teacher/counsellor/availability")
    .replace(/^\/counselor\/apply/, "/teacher/counsellor")
    .replace(/^\/counselor(?=$|[/?])/, "/teacher/counsellor");
}

// Which dashboard track a deep link lands in, so the destination app opens
// in the right chrome. Mirrors trackFromPath() in the student app; null
// means track-neutral (chat, counselling) — don't force a switch.
export function trackForLink(path) {
  if (hasPrefix(path, SKILL_PREFIXES)) return "skill";
  if (hasPrefix(path, ACADEMY_PREFIXES)) return "academy";
  return null;
}

/**
 * Resolve a link_url into an actual destination.
 *
 * @returns {null}                        not a usable in-app link
 *          {{kind:"local", path}}        navigate() within this SPA
 *          {{kind:"external", url}}      cross-app hop (window.location)
 */
export function resolveNotificationTarget(link, { appUrl, teacherUrl }) {
  if (typeof link !== "string" || !link.startsWith("/")) return null;
  // Reject protocol-relative paths ("//host/x"). Concatenated onto a base
  // they happen to stay on-origin (the "//" becomes a doubled path
  // separator), so this is not an open redirect today — but it produces a
  // junk URL, and the moment anything downstream treats link_url as a full
  // URL instead of concatenating, "//host" WOULD leave the origin. Cheaper
  // to refuse the shape than to rely on that never changing.
  if (link.startsWith("//")) return null;

  if (isLocalRoute(link)) return { kind: "local", path: link };

  const teacher = isTeacherRoute(link);
  const base = teacher ? teacherUrl : appUrl;
  const path = teacher ? toTeacherAppPath(link) : link;
  // Teacher links need no ?track= hint: that app derives track from route.
  const track = teacher ? null : trackForLink(link);

  try {
    const url = new URL(base + path);
    if (track) url.searchParams.set("track", track);
    return { kind: "external", url: url.toString() };
  } catch {
    return null;
  }
}
