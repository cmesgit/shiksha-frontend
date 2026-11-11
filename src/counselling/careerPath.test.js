import assert from "node:assert/strict";
import test from "node:test";
import { buildCareerPath } from "./careerPath.js";

test("wizard level overrides the account learner class", () => {
  const result = buildCareerPath({
    learner: { current_class: "10", stream: "science" },
    effective_level: "working",
    career_interests: [{ name: "Computer Science & IT" }],
  });
  assert.equal(result.stage, "ug");
  assert.notEqual(result.headline, "Your path starts with the stream decision");
});

test("middle-school profiles receive exploration steps", () => {
  const result = buildCareerPath({
    learner: { current_class: "12" }, effective_level: "6-8", career_interests: [],
  });
  assert.equal(result.stage, "early");
  assert.match(result.paths[0].nextSteps[0], /Try one new activity/);
});
