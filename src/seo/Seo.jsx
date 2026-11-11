import { useEffect } from "react";

/**
 * Per-route document metadata: <title>, <meta name="description">, and
 * <link rel="canonical">.
 *
 * Why this sets the tags imperatively instead of rendering them
 * -----------------------------------------------------------
 * React 19 hoists a rendered <title>/<meta> into <head>, which looks like the
 * obvious tool here. It is not, because index.html already ships a static
 * <title> (it has to — see the comment there about link-preview scrapers).
 * Hoisting APPENDS, so a rendered <title> produces a document with two of
 * them, and the browser keeps using the first one in document order: the
 * static fallback. The route title would silently never apply.
 *
 * Assigning document.title has no such ambiguity — it writes through to the
 * existing element. Same reasoning for description and canonical, which are
 * updated in place when present and created only when missing.
 *
 * What this does NOT fix
 * ----------------------
 * Link previews. WhatsApp, Facebook, Slack and X read the server's raw HTML
 * and never execute the bundle, so they always see index.html's static
 * values no matter what this component sets. Fixing per-URL previews needs
 * server-side rendering or build-time prerendering; this component only
 * reaches clients that run JavaScript (real users, and Google).
 */

const SITE = "https://shikshacom.com";
const SUFFIX = " · ShikshaCom";

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    for (const [k, v] of Object.entries(attrs.identity)) el.setAttribute(k, v);
    document.head.appendChild(el);
  }
  el.setAttribute("content", attrs.content);
  return el;
}

export default function Seo({ title, description, canonical, noindex = false }) {
  useEffect(() => {
    const prevTitle = document.title;

    if (title) {
      // A title that already names the brand should not name it twice.
      document.title = title.includes("ShikshaCom") ? title : title + SUFFIX;
    }

    if (description) {
      upsertMeta('meta[name="description"]', {
        identity: { name: "description" },
        content: description,
      });
      // Keep the OG/Twitter pair in step for Google, which does render JS.
      upsertMeta('meta[property="og:description"]', {
        identity: { property: "og:description" },
        content: description,
      });
    }
    if (title) {
      upsertMeta('meta[property="og:title"]', {
        identity: { property: "og:title" },
        content: document.title,
      });
    }

    let canonicalEl = null;
    if (canonical) {
      const href = canonical.startsWith("http") ? canonical : SITE + canonical;
      canonicalEl = document.head.querySelector('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement("link");
        canonicalEl.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute("href", href);
    }

    let robotsEl = null;
    if (noindex) {
      robotsEl = upsertMeta('meta[name="robots"]', {
        identity: { name: "robots" },
        content: "noindex,follow",
      });
    }

    return () => {
      // Restore the fallback title so a route that sets none does not inherit
      // the previous route's. Canonical and robots are removed outright for
      // the same reason — a stale canonical is worse than an absent one.
      if (title) document.title = prevTitle;
      if (canonicalEl) canonicalEl.remove();
      if (robotsEl) robotsEl.remove();
    };
  }, [title, description, canonical, noindex]);

  return null;
}
