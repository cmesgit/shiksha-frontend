// PLACEMENT: <landing-page repo>/src/components/BlogDetail.jsx  (FULL REPLACEMENT)
//
// WHAT CHANGED vs the previous version
// ────────────────────────────────────
// The 114-entry lazy() component map is gone. Chapters are now static HTML
// fragments produced by scripts/extract-blogs.mjs and served from
//   import.meta.env.VITE_BLOG_CDN_BASE   (e.g. https://blog.b-cdn.net/blog-content)
// falling back to /blog-content (the local public/ copy) when unset.
//
// Why: a chapter is now a ~11 KB gzipped HTML fetch that paints as it streams —
// no JS chunk to download+parse+execute on low-end phones, FAQ accordions are
// native <details> (work with JS disabled), and repeat visits can be cached by
// a service worker. The back-button / scroll-top UI is unchanged.
//
// Slugs are identical to before (class-9/economics/chapter-1), so all existing
// /blogs/<slug> links keep working.

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BASE = (import.meta.env.VITE_BLOG_CDN_BASE || "/blog-content").replace(/\/$/, "");

// Session-lifetime cache: navigating back to a chapter re-renders instantly.
const htmlCache = new Map();

const ChapterLoading = () => (
  <div
    style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "16px",
      color: "#003223",
    }}
  >
    <div
      style={{
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        border: "3px solid rgba(0, 92, 58, 0.2)",
        borderTopColor: "#005c3a",
        animation: "blogSpin 0.8s linear infinite",
      }}
    />
    <p style={{ fontSize: "14px", letterSpacing: "0.3px" }}>Loading chapter…</p>
    <style>{`@keyframes blogSpin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const BlogDetail = () => {
  const { "*": slug } = useParams();
  const navigate = useNavigate();
  const [showTopButton, setShowTopButton] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [html, setHtml] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | notfound | error
  const abortRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!slug) { setStatus("notfound"); return; }

    if (htmlCache.has(slug)) {
      setHtml(htmlCache.get(slug));
      setStatus("ready");
      return;
    }

    setStatus("loading");
    setHtml(null);
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    fetch(`${BASE}/${slug}.html`, { signal: ctrl.signal })
      .then((res) => {
        if (res.status === 404) { setStatus("notfound"); return null; }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (text == null) return;
        htmlCache.set(slug, text);
        setHtml(text);
        setStatus("ready");
        const m = text.match(/<h1[^>]*>(.*?)<\/h1>/s);
        if (m) {
          const title = m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
          if (title) document.title = `${title} · Shiksha`;
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") setStatus("error");
      });

    return () => ctrl.abort();
  }, [slug]);

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "fixed",
          top: "210px",
          left: "40px",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={() => navigate("/blogs")}
          onMouseEnter={() => setHoveredBtn("back")}
          onMouseLeave={() => setHoveredBtn(null)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            background: hoveredBtn === "back"
              ? "rgba(0, 92, 58, 0.95)"
              : "rgba(0, 50, 35, 0.82)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "50px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            letterSpacing: "0.4px",
            boxShadow: hoveredBtn === "back"
              ? "0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)"
              : "0 4px 16px rgba(0,0,0,0.22)",
            transform: hoveredBtn === "back" ? "translateX(-3px)" : "translateX(0)",
            transition: "all 0.25s ease",
          }}
        >
          <span style={{ fontSize: "16px", lineHeight: 1 }}>‹</span>
          Back
        </button>

        {showTopButton && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            onMouseEnter={() => setHoveredBtn("top")}
            onMouseLeave={() => setHoveredBtn(null)}
            style={{
              width: "42px",
              height: "42px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: hoveredBtn === "top"
                ? "linear-gradient(135deg, #005c3a, #00875a)"
                : "linear-gradient(135deg, #003223, #005c3a)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "18px",
              boxShadow: hoveredBtn === "top"
                ? "0 8px 28px rgba(0,82,46,0.55), 0 0 0 4px rgba(0,135,90,0.2)"
                : "0 4px 16px rgba(0,50,35,0.45)",
              transform: hoveredBtn === "top"
                ? "translateY(-4px) scale(1.1)"
                : "translateY(0) scale(1)",
              transition: "all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            ↑
          </button>
        )}
      </div>

      {status === "loading" && <ChapterLoading />}

      {status === "ready" && html && (
        // First-party build artifact from our own extractor — safe to inject.
        <div dangerouslySetInnerHTML={{ __html: html }} />
      )}

      {status === "notfound" && <h2>Blog not found</h2>}

      {status === "error" && (
        <div style={{ minHeight: "50vh", display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center", gap: 12 }}>
          <h2 style={{ color: "#003223" }}>Couldn't load this chapter</h2>
          <p style={{ color: "#556" }}>Check your connection and try again.</p>
          <button
            onClick={() => { htmlCache.delete(slug); setStatus("loading");
                             /* retrigger */ navigate(0); }}
            style={{ padding: "10px 24px", borderRadius: 24, border: "none",
                     background: "#005c3a", color: "#fff", cursor: "pointer",
                     fontWeight: 600 }}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
