// Homepage body/list-item fields are inline-only rich text (bold, italic,
// underline, strike, links, lists) — restricted server-side in
// backend/content/sanitize.py's RESTRICTED_ALLOWED_TAGS so they can't
// carry headings/images/blocks that would break the fixed page layout.
// This mirrors that same allowlist client-side (defense-in-depth, same
// pattern as BlogDetail.jsx's DOMPurify.sanitize(html) call).
import DOMPurify from "dompurify";

const RESTRICTED_ALLOWED_TAGS = ["a", "b", "br", "em", "i", "li", "ol", "s", "strong", "u", "ul"];

export const sanitizeInline = (html) =>
  DOMPurify.sanitize(html || "", {
    ALLOWED_TAGS: RESTRICTED_ALLOWED_TAGS,
    ALLOWED_ATTR: ["href", "target"],
  });

export default sanitizeInline;
