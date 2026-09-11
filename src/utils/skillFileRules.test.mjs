// Node test for the skill-application file size rule.
//
//   node --test src/utils/skillFileRules.test.mjs
//
// node:test rather than vitest, for the reason spelled out in
// notificationRouting.test.mjs: this repo has no test runner installed and
// the deploy Action never runs `npm install`, so a devDependency would ship
// a package.json the deployed box cannot satisfy.
//
// Worth testing despite being four lines: the label promised this limit for
// a long time while nothing checked it anywhere, and the boundary is the
// kind of thing that silently becomes off-by-one-megabyte.

import test from "node:test";
import assert from "node:assert/strict";

import { MAX_SKILL_FILE_BYTES, skillFileError } from "./skillFileRules.js";

const file = (size) => ({ size });

test("the limit is the 50MB the form has always promised", () => {
  assert.equal(MAX_SKILL_FILE_BYTES, 52428800);
});

test("no file selected is not an error", () => {
  assert.equal(skillFileError(null), "");
  assert.equal(skillFileError(undefined), "");
});

test("a normal file passes", () => {
  assert.equal(skillFileError(file(2 * 1024 * 1024)), "");
});

test("a file exactly at the limit passes", () => {
  // The server rejects on `>`, not `>=`. If these two ever disagree the
  // applicant gets a file the browser accepted and the server refuses.
  assert.equal(skillFileError(file(MAX_SKILL_FILE_BYTES)), "");
});

test("one byte over is rejected", () => {
  assert.notEqual(skillFileError(file(MAX_SKILL_FILE_BYTES + 1)), "");
});

test("the message names the real size and the limit", () => {
  const msg = skillFileError(file(73.4 * 1024 * 1024));
  assert.match(msg, /73\.4 MB/);
  assert.match(msg, /limit is 50 MB/);
});
