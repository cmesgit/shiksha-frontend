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
