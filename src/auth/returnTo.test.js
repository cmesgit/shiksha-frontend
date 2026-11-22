import assert from "node:assert/strict";
import test from "node:test";
import { resolveReturnPath, safeReturnPath } from "./returnTo.js";

test("returns to the counselling profile after login", () => {
  assert.equal(resolveReturnPath(null, "/counselling/profile", null), "/counselling/profile");
});

test("uses a valid fallback when the explicit destination is unsafe", () => {
  assert.equal(resolveReturnPath("//other.example/path", "/counselling/path"), "/counselling/path");
  assert.equal(safeReturnPath("/\\other.example/path"), null);
  assert.equal(safeReturnPath("/login?next=/counselling/profile"), null);
});

test("keeps search and hash on an internal destination", () => {
  assert.equal(safeReturnPath("/counselling/guides/middle-school?chapter=activities#notes"),
    "/counselling/guides/middle-school?chapter=activities#notes");
});
