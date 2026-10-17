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

export function blogFilters(params) {
  const page = Number(params.get("page"));
  return {
    q: (params.get("q") || "").trim().slice(0, 200),
    subject: BLOG_SUBJECTS.some(([value]) => value === params.get("subject")) ? params.get("subject") : "",
    class_level: BLOG_CLASSES.some(([value]) => value === params.get("class_level")) ? params.get("class_level") : "",
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
