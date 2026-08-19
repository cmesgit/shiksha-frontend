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

// Student-app link_url → the FACULTY screen showing the same object.
//
// The backend writes student-app paths for nearly every academy verb
// (/subjects/:id/assignments, /study-material/list/:id, /live/:id …) because
// the student app is root-mounted. Routing those to appUrl is right for a
// learner and wrong for a teacher: the student dashboard bounces anyone
// without a learner profile, so a faculty member clicking from this navbar
// ended up nowhere. Kept deliberately in step with STUDENT_TO_TEACHER in
// shiksha-teacher-dashboard/src/shared/useNotificationNavigator.js — if you
// change one, change both.
const STUDENT_TO_TEACHER = [
  // "quiz" sits where a subject id would, so it must be tested first.
  [/^\/subjects\/quiz\/([^/?]+)/, (m) => `/teacher/classes/${m[1]}/quizzes`],
  [/^\/subjects\/([^/?]+)\/assignments\/([^/?]+)/, (m) => `/teacher/classes/${m[1]}/assignments/${m[2]}`],
  [/^\/subjects\/([^/?]+)\/assignments/, (m) => `/teacher/classes/${m[1]}/assignments`],
  [/^\/study-material\/list\/([^/?]+)/, (m) => `/teacher/classes/${m[1]}/study-materials`],
  [/^\/subjects\/([^/?]+)(?=$|[/?])/, (m) => `/teacher/classes/${m[1]}`],
  [/^\/live\/([^/?]+)/, (m) => `/teacher/live-sessions/${m[1]}/detail`],
  [/^\/sessions\/group\/([^/?]+)/, () => "/teacher/group-sessions"],
  [/^\/group-sessions(?=$|[/?])/, () => "/teacher/group-sessions"],
  [/^\/private-sessions(?=$|[/?])/, () => "/teacher/private-sessions"],
  [/^\/live-sessions(?=$|[/?])/, () => "/teacher/live-sessions"],
  [/^\/chat(?=$|[/?])/, () => "/teacher/chat"],
];

export function toTeacherEquivalent(path) {
  for (const [re, build] of STUDENT_TO_TEACHER) {
    const m = path.match(re);
    if (m) return build(m);
  }
  return null;
}

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
export function resolveNotificationTarget(link, { appUrl, teacherUrl, isTeacher = false }) {
  if (typeof link !== "string" || !link.startsWith("/")) return null;
  // Reject protocol-relative paths ("//host/x"). Concatenated onto a base
  // they happen to stay on-origin (the "//" becomes a doubled path
  // separator), so this is not an open redirect today — but it produces a
  // junk URL, and the moment anything downstream treats link_url as a full
  // URL instead of concatenating, "//host" WOULD leave the origin. Cheaper
  // to refuse the shape than to rely on that never changing.
  if (link.startsWith("//")) return null;

  if (isLocalRoute(link)) return { kind: "local", path: link };

  // Who is signed in decides which dashboard a student-shaped path means.
  // Checked before the /teacher|/counselor test so a faculty member gets the
  // faculty screen for the same object rather than being sent to the learner
  // app, which bounces anyone without a learner profile.
  if (isTeacher) {
    const asTeacher = toTeacherEquivalent(link);
    if (asTeacher) {
      try {
        return { kind: "external", url: new URL(teacherUrl + asTeacher).toString() };
      } catch {
        return null;
      }
    }
  }

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

/**
 * Where to go when a notification has NO usable link_url.
 *
 * This is not an edge case — it is the common case. Both bells here and in
 * the dashboards are fed by `/activity/feed/`, and `ActivitySerializer`
 * emits no `link_url` field at all; only live WebSocket frames carry one.
 * So for every notification loaded on page load, `resolveNotificationTarget`
 * returned null and the public navbar's click handler simply `return`ed —
 * a permanently dead click. Both dashboard bells already fall back to
 * type + subject_id; this site never got that fallback.
 *
 * Mirrors the per-type routing in shiksha-student-dashboard's and
 * shiksha-teacher-dashboard's NotificationBell.jsx.
 *
 * @returns a link_url-shaped path (feed it back through
 *          resolveNotificationTarget), or null if the row genuinely
 *          identifies no destination — better a no-op than a wrong page.
 */
export function fallbackPathFor(notif, { isTeacher = false } = {}) {
  if (!notif) return null;
  const { type, subject_id, object_id, is_private_session, is_group_session, is_skill_session } = notif;

  if (is_private_session || type === "PRIVATE_SESSION") return "/private-sessions";
  if (is_group_session) return "/group-sessions";
  if (is_skill_session) {
    // The faculty side has no per-booking route; the learner side does.
    if (isTeacher) return "/teacher/expert/bookings";
    return subject_id ? `/skill-dev/sessions/${subject_id}` : "/skill-dev/sessions";
  }
  if (type === "SESSION" && object_id) return `/live/${object_id}`;

  if (subject_id) {
    switch (type) {
      case "ASSIGNMENT":
      case "SUBMISSION":
        return `/subjects/${subject_id}/assignments`;
      case "QUIZ":   return `/subjects/quiz/${subject_id}`;
      case "SESSION": return "/live-sessions";
      case "MATERIAL": return `/study-material/list/${subject_id}`;
      default: return `/subjects/${subject_id}`;
    }
  }

  // No subject to anchor on. Only offer a destination where one genuinely
  // exists for this type — never invent one (that is exactly how the
  // faculty bell used to dump people into the career-counsellor form).
  switch (type) {
    case "ASSIGNMENT":
    case "SUBMISSION":
      return isTeacher ? "/teacher/assignments" : "/assignments";
    case "QUIZ":     return isTeacher ? "/teacher/quizzes" : "/subjects/quiz";
    case "MATERIAL": return isTeacher ? "/teacher/study-materials" : "/study-material";
    case "SESSION":  return "/live-sessions";
    default:         return null;
  }
}
