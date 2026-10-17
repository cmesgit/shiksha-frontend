import { test } from "node:test";
import assert from "node:assert/strict";
import { blogFilters, blogText } from "./blogBrowse.js";

test("shared filter URLs retain valid subject, class and page", () => {
  assert.deepEqual(blogFilters(new URLSearchParams("q= motion &subject=science&class_level=9&page=2")), {
    q: "motion", subject: "science", class_level: "9", page: 2,
  });
});

test("invalid filter URLs cannot send unsupported classes or page numbers", () => {
  for (const page of ["-2", "NaN", "Infinity", "1.5", "9007199254740992"]) {
    assert.deepEqual(blogFilters(new URLSearchParams({ subject: "bad", class_level: "7", page })), {
      q: "", subject: "", class_level: "", page: 1,
    });
  }
});

test("search length is bounded and general articles can be filtered", () => {
  const result = blogFilters(new URLSearchParams({ q: "x".repeat(500), subject: "general", class_level: "general" }));
  assert.equal(result.q.length, 200);
  assert.equal(result.class_level, "general");
});

test("CMS escaped titles decode into text without HTML injection", () => {
  assert.equal(blogText("Atoms &amp; Molecules &#x27;Science&#39;"), "Atoms & Molecules 'Science'");
  assert.equal(blogText("&lt;script&gt;literal&lt;/script&gt;"), "<script>literal</script>");
  assert.equal(blogText("&#x110000; &#55296; &unknown;"), "&#x110000; &#55296; &unknown;");
});
