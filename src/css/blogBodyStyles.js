// Rendered inside BlogDetail.jsx's sandboxed iframe (a separate document, so
// this page's global BlogDetail.css never reaches it) — kept byte-identical
// to Admin-dashboard/src/pages/content/preview/blogBodyStyles.js so the CMS
// preview and the live public page agree on the base look for posts that
// don't carry their own <style> block. Legacy chapters (114 of them,
// trusted_html=True) bring their own full <style> block that wins by
// specificity, so this is purely additive for them.
export const BLOG_BODY_CSS = `
.blog-body { color: #1f2937; font-size: 1rem; line-height: 1.7; }
.blog-body h1 { font-size: 1.9rem; margin: 28px 0 14px; font-weight: 800; }
.blog-body h2 { font-size: 1.5rem; margin: 26px 0 12px; font-weight: 800; }
.blog-body h3 { font-size: 1.2rem; margin: 22px 0 10px; font-weight: 700; }
.blog-body p { margin: 0 0 16px; }
.blog-body ul, .blog-body ol { margin: 0 0 16px; padding-left: 1.4em; }
.blog-body li { margin: 4px 0; }
/* TipTap stores list items as <li><p>text</p></li>, so without this reset the
   generic ".blog-body p { margin: 0 0 16px }" rule above adds a 16px gap
   under every bullet and lists render loose. Applies to any post edited in
   the CMS rich-text editor; hand-written legacy chapters use bare <li> and
   are unaffected either way. */
.blog-body li > p { margin: 0; }
.blog-body li > p + p { margin-top: 8px; }
.blog-body a { color: #0F9D6B; text-decoration: underline; }
.blog-body strong { font-weight: 700; }
.blog-body blockquote { border-left: 3px solid #d1d5db; margin: 20px 0; padding: 4px 0 4px 16px; color: #4b5563; font-style: italic; }
.blog-body pre { background: #f3f4f6; border-radius: 8px; padding: 14px 16px; overflow-x: auto; margin: 0 0 16px; }
.blog-body code { background: #f3f4f6; border-radius: 4px; padding: 2px 6px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
.blog-body pre code { background: none; padding: 0; }
.blog-body img { max-width: 100%; border-radius: 8px; margin: 12px 0; }
.blog-body figure { margin: 20px 0; }
.blog-body figcaption { font-size: 0.85rem; color: #6b7280; text-align: center; margin-top: 6px; }
.blog-body hr { border: none; border-top: 1px solid #e5e7eb; margin: 28px 0; }
.blog-body table { border-collapse: collapse; width: 100%; margin: 16px 0; }
.blog-body td, .blog-body th { border: 1px solid #d1d5db; padding: 8px 10px; }
.blog-body th { background: #f8fafc; font-weight: 700; }
/* Callout / info box + collapsible section blocks — mirrored byte-for-byte
   from Admin-dashboard/src/pages/content/preview/blogBodyStyles.js (see that
   file's header comment). Colors are the same info/warn/success palette as
   this app's own .mod-btn.info/.warn/.success, not a new scheme. */
.blog-body .callout { margin: 16px 0; padding: 12px 16px; border-radius: 6px; border: 1px solid; border-left-width: 4px; }
.blog-body .callout > p:last-child { margin-bottom: 0; }
.blog-body .callout-info    { background: #eff6ff; border-color: #bfdbfe; border-left-color: #1d4ed8; }
.blog-body .callout-warning { background: #fff8e8; border-color: #ecd080; border-left-color: #7a4c00; }
.blog-body .callout-success { background: #e4f3e8; border-color: #b8d8bc; border-left-color: #125027; }
.blog-body details { margin: 20px 0; border: 1px solid #d1d5db; border-radius: 6px; padding: 10px 16px; }
.blog-body details summary { cursor: pointer; font-weight: 700; }
.blog-body details[open] summary { margin-bottom: 10px; }
.blog-body details p { margin: 0; }
`;
