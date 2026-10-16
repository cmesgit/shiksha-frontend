// Keep search/filter URLs shareable and reset dependent filters together.
export function updatedBrowseParams(current, key, value) {
  const next = new URLSearchParams(current);
  const isDefault = value === ""
    || (key === "date" && value === "Any time")
    || (key === "sort" && value === "Trending")
    || (key === "page" && value === "1")
    || (!["q", "date", "sort", "page"].includes(key) && value === "All");
  if (isDefault) next.delete(key); else next.set(key, value);
  if (key === "subject") next.delete("topic");
  if (key !== "page") next.delete("page");
  return next;
}
