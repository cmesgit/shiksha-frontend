// Node test for the notification link routing rules.
//
//   node --test src/utils/notificationRouting.test.mjs
//
// Uses node:test rather than vitest deliberately: this repo has no test
// runner installed, and the deploy Action never runs `npm install`, so
// adding a devDependency would ship a package.json the deployed box can't
// satisfy. node:test is built in and needs nothing.
//
// The module under test is plain ESM with no React import, which is the
// reason the routing logic was pulled out of NotificationBell in the first
// place — these are one-letter-apart string rules that no build or lint
// step can check.

import test from "node:test";
import assert from "node:assert/strict";

import {
  hasPrefix,
  isLocalRoute,
  isTeacherRoute,
  toTeacherAppPath,
  trackForLink,
  resolveNotificationTarget,
  toTeacherEquivalent,
  fallbackPathFor,
} from "./notificationRouting.js";

const URLS = {
  appUrl: "https://app.example.com",
  teacherUrl: "https://teacher.example.com",
};

const resolve = (link) => resolveNotificationTarget(link, URLS);

// ── the three counselling spellings ──────────────────────────────────
test("counselling (two l) stays on the marketing site", () => {
  assert.deepEqual(resolve("/counselling/counsellors"),
    { kind: "local", path: "/counselling/counsellors" });
});

test("counseling (one l) goes to the LEARNER dashboard", () => {
  const t = resolve("/counseling/appointments/42");
  assert.equal(t.kind, "external");
  assert.equal(t.url, "https://app.example.com/counseling/appointments/42");
});

test("counselor (one l) goes to the TEACHER app, rewritten to counsellor", () => {
  const t = resolve("/counselor/appointments/42");
  assert.equal(t.kind, "external");
  assert.equal(t.url,
    "https://teacher.example.com/teacher/counsellor/appointments/42");
});

test("every counselor sub-path the backend emits maps to a real route", () => {
  // These are the exact link_urls in counseling/views.py.
  assert.equal(toTeacherAppPath("/counselor/appointments"),
    "/teacher/counsellor/appointments");
  assert.equal(toTeacherAppPath("/counselor/availability"),
    "/teacher/counsellor/availability");
  assert.equal(toTeacherAppPath("/counselor/apply"), "/teacher/counsellor");
  assert.equal(toTeacherAppPath("/counselor"), "/teacher/counsellor");
});

test("the counselor rewrite does not corrupt the learner spelling", () => {
  // One letter apart: /counseling must survive the /counselor regexes.
  assert.equal(toTeacherAppPath("/counseling/reports"), "/counseling/reports");
});

// ── dashboard deep links that used to hit NotFound ───────────────────
test("dashboard-only paths become cross-app hops, not local navigations", () => {
  for (const link of ["/skill-dev/sessions/9", "/subjects/1/assignments",
                      "/private-sessions", "/group-sessions",
                      "/live-sessions", "/my-courses/3", "/chat/7"]) {
    assert.equal(resolve(link).kind, "external", link);
  }
});

test("skill links carry ?track=skill so the dashboard opens in the right chrome", () => {
  assert.equal(resolve("/skill-dev/sessions/9").url,
    "https://app.example.com/skill-dev/sessions/9?track=skill");
});

test("study-material links are classified academy", () => {
  // materials.uploaded deep-links to /study-material/list/<subjectId>;
  // without the prefix it hopped to the dashboard with no track hint.
  assert.equal(trackForLink("/study-material/list/7"), "academy");
});

test("academy links carry ?track=academy", () => {
  assert.equal(resolve("/subjects/1/assignments").url,
    "https://app.example.com/subjects/1/assignments?track=academy");
});

test("track-neutral links carry no track hint", () => {
  // Forcing a track on a DM would yank the user out of wherever they were.
  assert.equal(resolve("/chat/7").url, "https://app.example.com/chat/7");
});

test("teacher links get no track hint (that app derives it from the route)", () => {
  assert.equal(resolve("/teacher/expert/bookings").url,
    "https://teacher.example.com/teacher/expert/bookings");
});

// ── prefix matching must be segment-anchored ─────────────────────────
test("prefix match cannot fire on a longer word", () => {
  assert.equal(hasPrefix("/livestream-archive", ["/live"]), false);
  assert.equal(hasPrefix("/coursesomething", ["/courses"]), false);
  assert.equal(hasPrefix("/courses", ["/courses"]), true);
  assert.equal(hasPrefix("/courses/5", ["/courses"]), true);
  assert.equal(hasPrefix("/courses?tab=x", ["/courses"]), true);
});

test("/live is academy but /livestream-archive is not classified", () => {
  assert.equal(trackForLink("/live/42"), "academy");
  assert.equal(trackForLink("/livestream-archive"), null);
});

// ── junk input ───────────────────────────────────────────────────────
test("non-paths resolve to null rather than navigating somewhere", () => {
  for (const junk of [null, undefined, "", 42, {}, "https://evil.example.com",
                      "javascript:alert(1)", "forum/thread/1"]) {
    assert.equal(resolve(junk), null, String(junk));
  }
});

test("an absolute URL in link_url is never followed", () => {
  // link_url is server-controlled, but treating it as a path-only value
  // keeps an off-site redirect impossible even if that ever changes.
  assert.equal(resolve("//evil.example.com/x"), null);
});

// ── local vs external classification ─────────────────────────────────
test("marketing-site sections stay local", () => {
  for (const link of ["/forum/thread/3", "/explore", "/blogs/x", "/courses",
                      "/experts", "/scholarship"]) {
    assert.equal(isLocalRoute(link), true, link);
    assert.equal(resolve(link).kind, "local", link);
  }
});

test("isTeacherRoute only claims the two teacher-side prefixes", () => {
  assert.equal(isTeacherRoute("/teacher/x"), true);
  assert.equal(isTeacherRoute("/counselor/x"), true);
  assert.equal(isTeacherRoute("/counseling/x"), false);
  assert.equal(isTeacherRoute("/counselling/x"), false);
});

// ── Signed-in-as-FACULTY routing ──────────────────────────────────────
//
// Reported: clicking a notification on the public homepage as a faculty
// member went nowhere. Two independent causes, both covered below.

const AS_TEACHER = { ...URLS, isTeacher: true };

test("faculty: student-shaped paths go to the TEACHER app, not the learner app", () => {
  const cases = [
    ["/subjects/7/assignments",    "https://teacher.example.com/teacher/classes/7/assignments"],
    ["/subjects/7/assignments/42", "https://teacher.example.com/teacher/classes/7/assignments/42"],
    ["/subjects/quiz/7",           "https://teacher.example.com/teacher/classes/7/quizzes"],
    ["/study-material/list/7",     "https://teacher.example.com/teacher/classes/7/study-materials"],
    ["/live/abc-123",              "https://teacher.example.com/teacher/live-sessions/abc-123/detail"],
    ["/private-sessions",          "https://teacher.example.com/teacher/private-sessions"],
    ["/group-sessions",            "https://teacher.example.com/teacher/group-sessions"],
    ["/chat/55",                   "https://teacher.example.com/teacher/chat"],
  ];
  for (const [link, expected] of cases) {
    const t = resolveNotificationTarget(link, AS_TEACHER);
    assert.equal(t?.kind, "external", link);
    assert.equal(t.url, expected, link);
  }
});

test("a learner is unaffected — same paths still go to the learner app", () => {
  const t = resolveNotificationTarget("/subjects/7/assignments", URLS);
  assert.equal(t.kind, "external");
  assert.ok(t.url.startsWith("https://app.example.com/subjects/7/assignments"), t.url);
});

test("local marketing routes stay local for faculty too", () => {
  assert.deepEqual(
    resolveNotificationTarget("/forum/thread/3", AS_TEACHER),
    { kind: "local", path: "/forum/thread/3" },
  );
});

test("toTeacherEquivalent returns null for paths with no faculty screen", () => {
  for (const p of ["/my-courses/8", "/browse-courses", "/explore"]) {
    assert.equal(toTeacherEquivalent(p), null, p);
  }
});

// ── The fallback: /activity/feed/ rows carry NO link_url ───────────────
//
// This was the main dead-click cause: resolveNotificationTarget(undefined)
// is null, and the click handler simply returned.

test("fallback routes a feed row that has no link_url", () => {
  assert.equal(
    fallbackPathFor({ type: "ASSIGNMENT", subject_id: "7" }),
    "/subjects/7/assignments",
  );
  assert.equal(
    fallbackPathFor({ type: "MATERIAL", subject_id: "7" }),
    "/study-material/list/7",
  );
  assert.equal(
    fallbackPathFor({ type: "QUIZ", subject_id: "7" }),
    "/subjects/quiz/7",
  );
});

test("fallback sends a faculty member to faculty screens", () => {
  assert.equal(
    fallbackPathFor({ type: "ASSIGNMENT" }, { isTeacher: true }),
    "/teacher/assignments",
  );
  assert.equal(
    fallbackPathFor({ is_skill_session: true }, { isTeacher: true }),
    "/teacher/expert/bookings",
  );
});

test("fallback + resolve together make a link_url-less faculty row clickable", () => {
  const notif = { type: "SUBMISSION", subject_id: "7" };
  const target =
    resolveNotificationTarget(notif.link_url, AS_TEACHER) ||
    resolveNotificationTarget(fallbackPathFor(notif, AS_TEACHER), AS_TEACHER);
  assert.equal(target.url, "https://teacher.example.com/teacher/classes/7/assignments");
});

test("fallback invents nothing when the row identifies no destination", () => {
  assert.equal(fallbackPathFor({ type: "SOMETHING_NEW" }), null);
  assert.equal(fallbackPathFor(null), null);
  // …and a null path must not resolve to a URL.
  assert.equal(resolveNotificationTarget(null, URLS), null);
});
