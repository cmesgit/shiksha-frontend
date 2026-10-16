import { test } from "node:test";
import assert from "node:assert/strict";
import { updatedBrowseParams } from "./browseFilters.js";

test("search phrases matching filter defaults are still searchable", () => {
  for (const phrase of ["All", "Any time", "Trending"]) {
    assert.equal(updatedBrowseParams("", "q", phrase).get("q"), phrase);
  }
});
test("changing a subject clears its child and page but preserves the search and type", () => {
  const p = updatedBrowseParams("subject=Physics&topic=Optics&page=2&q=notes&category=books", "subject", "Biology");
  assert.equal(p.get("subject"), "Biology");
  assert.equal(p.get("topic"), null);
  assert.equal(p.get("page"), null);
  assert.equal(p.get("q"), "notes");
  assert.equal(p.get("category"), "books");
});
test("changing a subcategory resets pagination and retains its subject", () => {
  const p = updatedBrowseParams("subject=Biology&topic=Botany&page=2", "topic", "Genetics");
  assert.equal(p.get("subject"), "Biology");
  assert.equal(p.get("topic"), "Genetics");
  assert.equal(p.get("page"), null);
});
test("pagination retains all filters and returning to page one removes the page parameter", () => {
  const current = "subject=Biology&topic=Genetics&q=notes";
  const second = updatedBrowseParams(current, "page", "2");
  assert.equal(second.get("page"), "2");
  assert.equal(second.get("topic"), "Genetics");
  assert.equal(updatedBrowseParams(second, "page", "1").toString(), current);
});
