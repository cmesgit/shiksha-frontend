// Keep search/filter URLs shareable and reset dependent filters together.
export function updatedBrowseParams(current, key, value) {
  const next = new URLSearchParams(current);
  const isDefault = value === ""
    || (key === "date" && value === "Any time")
    || (key === "sort" && value === "Trending")
    || (key === "page" && value === "1")
    || (key === "filekind" && value === "all")
    || (key === "status" && value === "any")
    // field/tsubject/branch have no "All" sentinel — "" clears them, caught
    // by the first clause. Excluding them here keeps a subject genuinely
    // named "All" from being silently un-selectable.
    || (!["q", "date", "sort", "page", "field", "tsubject", "branch",
          "filekind", "status"].includes(key) && value === "All");
  if (isDefault) next.delete(key); else next.set(key, value);
  if (key === "subject") next.delete("topic");
  // The three-level browser narrows downward, so changing a level has to
  // clear the levels below it. Leaving them would filter by "Engineering +
  // Rural sociology" and return nothing, with both chips still lit.
  if (key === "field") { next.delete("tsubject"); next.delete("branch"); }
  if (key === "tsubject") next.delete("branch");
  if (key !== "page") next.delete("page");
  return next;
}
