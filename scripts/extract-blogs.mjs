#!/usr/bin/env node
// PLACEMENT: <landing-page repo>/scripts/extract-blogs.mjs
// RUN:       node scripts/extract-blogs.mjs
//            node scripts/extract-blogs.mjs --src src/components/blogs --out public/blog-content
//
// One-time (and re-runnable) codemod that converts every blog chapter from a
// JSX component into a static HTML fragment + a manifest.json.
//
// WHAT IT DOES per chapter:
//   1. Rewrites the 7 conditional-mount FAQ answers ({openIndex === i && (…)})
//      so the answer markup is always present in the render.
//   2. Compiles the JSX with esbuild (react external) and renders it with
//      ReactDOMServer.renderToStaticMarkup at initial state.
//   3. DOM post-pass:
//        • strips the Google Fonts <link> tags (FontLink) — self-host or use
//          the system stack instead; on 2G those third-party round-trips cost
//          seconds per chapter,
//        • converts every FAQ item to native <details>/<summary> — the
//          accordion works with ZERO JavaScript (even with JS disabled),
//        • appends a small CSS normalizer to the chapter's own <style> so the
//          existing collapsed-state CSS can't fight the native behavior.
//   4. Writes  <out>/<class>/<subject>/chapter-N.html   (fragment, not a full
//      document — BlogDetail fetches and injects it), plus manifest.json with
//      slug/title/sizes, and prints a size report (raw vs gzip).
//
// PREREQS (dev deps in the landing repo):
//   npm i -D react@18 react-dom@18 esbuild node-html-parser
//
// Adding future chapters: drop the new ChapterN.jsx in the same folder layout
// and re-run this script — slug and manifest are derived from the file path.

import { promises as fs } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { gzipSync } from "node:zlib";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import esbuild from "esbuild";
import { parse } from "node-html-parser";

// ── args ────────────────────────────────────────────────────────────────
const arg = (name, dflt) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : dflt;
};
const SRC = path.resolve(arg("src", "src/components/blogs"));
const OUT = path.resolve(arg("out", "public/blog-content"));
// Temp compiled modules must live under cwd so Node resolves `react` from
// this project's node_modules (imports resolve relative to the importing file).
const TMP = path.join(process.cwd(), ".tmp-blog-compiled");

// ── helpers ─────────────────────────────────────────────────────────────
async function* walk(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.isFile() && p.endsWith(".jsx")) yield p;
  }
}

const slugFromPath = (file) => {
  // …/blogs/class-9/economics/Chapter4.jsx → class-9/economics/chapter-4
  const rel = path.relative(SRC, file).replace(/\\/g, "/");
  const dir = path.dirname(rel).toLowerCase();
  const num = path.basename(rel, ".jsx").replace(/^Chapter/i, "");
  return `${dir}/chapter-${num}`;
};

// Rewrite `{openIndex === i && (` / `{openIdx === idx && (` / `{openFaq === index && (`
// to an always-true expression so conditionally-mounted FAQ answers make it
// into the static render. (Class-toggle chapters are unaffected.)
const forceMountFaqAnswers = (src) =>
  src.replace(/\{\s*open(?:Index|Idx|Faq)\s*===\s*\w+\s*&&\s*(?=[(<])/g, "{true && ");

// CSS appended to each chapter's own <style> block so native <details>
// behaves regardless of how that chapter's collapsed-state CSS was written.
const NORMALIZER_CSS = `
/* — injected by extract-blogs: native accordion normalizer — */
details[data-faq]>summary{list-style:none;cursor:pointer;-webkit-tap-highlight-color:transparent}
details[data-faq]>summary::-webkit-details-marker{display:none}
details[data-faq]>summary::after{content:"▾";float:right;margin-left:12px;transition:transform .2s ease}
details[data-faq][open]>summary::after{transform:rotate(180deg)}
details[data-faq] [class*="faq-ans"]{display:block!important;max-height:none!important;opacity:1!important;visibility:visible!important;overflow:visible!important}
`;

function transformDom(html) {
  const root = parse(html);

  // 1) Drop Google Fonts links (and any stray gstatic preconnects).
  for (const link of root.querySelectorAll("link")) {
    const href = link.getAttribute("href") || "";
    if (href.includes("fonts.googleapis") || href.includes("fonts.gstatic")) {
      link.remove();
    }
  }

  // 2) FAQ items → native <details>/<summary>.
  //    Two markup variants exist across the chapters:
  //      A) <div class="*-faq-item"><button class="*-faq-q">…</button><div class="*-faq-ans">…</div></div>
  //      B) <div class="*-faq-q"><button class="*-faq-header">…</button>{open && <div class="*-faq-ans-inner">…</div>}</div>
  //    Anchor on the BUTTON (class contains "faq"), take its parent as the
  //    item and the parent's [class*="faq-ans"] as the answer — covers both.
  let faqCount = 0;
  for (const btn of root.querySelectorAll("button")) {
    const bcls = btn.getAttribute("class") || "";
    if (!bcls.includes("faq")) continue;

    const item = btn.parentNode;
    if (!item || item.rawTagName !== "div") continue;
    const ans = item.querySelector('[class*="faq-a"]');
    if (!ans) continue; // not an accordion — leave untouched

    // The ▾/▴ (or +/−) icon span becomes redundant — the summary gets a CSS chevron.
    btn.querySelector('[class*="faq-icon"]')?.remove();

    const itemCls = (item.getAttribute("class") || "").replace(/\bopen\b/g, "").trim();
    const ansHtml = ans.outerHTML.replace(
      /class="([^"]*)"/,
      (_, c) => `class="${c.includes("visible") ? c : c + " visible"}"`
    );
    const details =
      `<details class="${itemCls}" data-faq>` +
      `<summary class="${bcls}">${btn.innerHTML}</summary>` +
      ansHtml +
      `</details>`;
    item.replaceWith(parse(details));
    faqCount++;
  }

  // 3) Append the normalizer to the chapter's own <style>.
  const style = root.querySelector("style");
  if (style) style.textContent = style.textContent + NORMALIZER_CSS;

  // 4) Title = first heading's text (for manifest + document.title).
  const h1 = root.querySelector("h1") || root.querySelector("h2");
  const title = (h1?.textContent || "").replace(/\s+/g, " ").trim();

  return { html: root.toString(), faqCount, title };
}

// ── main ────────────────────────────────────────────────────────────────
const t0 = Date.now();
await fs.rm(OUT, { recursive: true, force: true });
await fs.mkdir(TMP, { recursive: true });

const manifest = [];
let totalRaw = 0, totalGz = 0, totalSrc = 0, files = 0, faqsConverted = 0;
const failures = [];

for await (const file of walk(SRC)) {
  const slug = slugFromPath(file);
  try {
    const source = await fs.readFile(file, "utf8");
    totalSrc += Buffer.byteLength(source);

    // JSX → ESM (react stays external; resolved from node_modules at import).
    const compiled = await esbuild.transform(forceMountFaqAnswers(source), {
      loader: "jsx",
      format: "esm",
      jsx: "automatic",
    });
    const tmpFile = path.join(TMP, slug.replace(/\//g, "__") + ".mjs");
    await fs.writeFile(tmpFile, compiled.code);

    const mod = await import(pathToFileURL(tmpFile).href);
    const Comp = mod.default;
    if (typeof Comp !== "function") throw new Error("no default export component");

    const rendered = renderToStaticMarkup(createElement(Comp));
    const { html, faqCount, title } = transformDom(rendered);

    const outFile = path.join(OUT, slug + ".html");
    await fs.mkdir(path.dirname(outFile), { recursive: true });
    await fs.writeFile(outFile, html);

    const raw = Buffer.byteLength(html);
    const gz = gzipSync(Buffer.from(html), { level: 9 }).length;
    totalRaw += raw; totalGz += gz; files++; faqsConverted += faqCount;

    const [klass, subject, chapter] = slug.split("/");
    manifest.push({
      slug, title: title || slug, class: klass, subject,
      chapter: Number(chapter.replace("chapter-", "")),
      path: slug + ".html", bytes: raw, gzipBytes: gz,
    });
  } catch (err) {
    failures.push({ slug, error: String(err?.message || err) });
  }
}

manifest.sort((a, b) =>
  a.class.localeCompare(b.class) ||
  a.subject.localeCompare(b.subject) ||
  a.chapter - b.chapter
);
await fs.writeFile(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
await fs.rm(TMP, { recursive: true, force: true });

const kb = (n) => (n / 1024).toFixed(1) + " KB";
console.log(`\n✔ ${files} chapters → ${path.relative(process.cwd(), OUT)}  (${Date.now() - t0} ms)`);
console.log(`  source JSX total : ${kb(totalSrc)}`);
console.log(`  static HTML total: ${kb(totalRaw)}   gzip: ${kb(totalGz)}`);
console.log(`  avg per chapter  : ${kb(totalRaw / files)} raw / ${kb(totalGz / files)} gzip`);
console.log(`  FAQ items → <details>: ${faqsConverted}`);
if (failures.length) {
  console.log(`\n✘ ${failures.length} failed:`);
  for (const f of failures) console.log(`  - ${f.slug}: ${f.error}`);
  process.exitCode = 1;
}
