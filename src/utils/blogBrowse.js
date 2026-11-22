// Values match the public CMS Subject and ClassLevel choices.
export const BLOG_SUBJECTS = [
  ["science", "Science"], ["mathematics", "Mathematics"],
  ["history", "History"], ["geography", "Geography"],
  ["economics", "Economics"], ["civics", "Civics"],
  ["political-science", "Political Science"], ["english", "English"],
  ["general", "General"],
];
export const BLOG_CLASSES = [
  ...[8, 9, 10, 11, 12].map((value) => [String(value), `Class ${value}`]),
  ["general", "General"],
];
export const BLOG_PAGE_SIZE = 12;

// Must match content/views.py's BlogPostListView.SORTS. "newest" is the
// default and is sent as the empty string so the common case keeps the
// clean URL it has always had — and so an existing bookmark is unchanged.
export const BLOG_SORTS = [
  ["", "Newest first"],
  ["oldest", "Oldest first"],
  ["popular", "Most read"],
  ["title", "A–Z"],
];

export function blogFilters(params) {
  const page = Number(params.get("page"));
  const sort = params.get("sort") || "";
  return {
    q: (params.get("q") || "").trim().slice(0, 200),
    subject: BLOG_SUBJECTS.some(([value]) => value === params.get("subject")) ? params.get("subject") : "",
    class_level: BLOG_CLASSES.some(([value]) => value === params.get("class_level")) ? params.get("class_level") : "",
    // Validated here as well as server-side: an unrecognised value should
    // not ride along in the request at all. `?sort=` used to be dropped
    // silently, which is why no sort control could exist.
    sort: BLOG_SORTS.some(([value]) => value === sort) ? sort : "",
    page: Number.isSafeInteger(page) && page > 0 ? page : 1,
  };
}

// Decode imported text only; React still escapes the result.
export function blogText(value = "") {
  const named = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " };
  return String(value).replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (entity, code) => {
    if (!code.startsWith("#")) return named[code.toLowerCase()] ?? entity;
    const number = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : Number(code.slice(1));
    return number > 0 && number <= 0x10ffff && !(number >= 0xd800 && number <= 0xdfff)
      ? String.fromCodePoint(number) : entity;
  });
}
