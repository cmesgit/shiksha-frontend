// PLACEMENT: <landing-page repo>/src/components/BlogDetail.jsx
//
// All 114 legacy chapters are imported into the CMS (content.BlogPost,
// import_blog_fragments) with the same slugs as before
// (class-9/economics/chapter-1), so every /blogs/<slug> link resolves via
// the content API alone — no static-fragment/CDN fallback needed anymore.

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { getBlogPost } from "../api/contentApi";
import { BLOG_BODY_CSS } from "../css/blogBodyStyles";
import "../css/BlogDetail.css";

// Session-lifetime cache: navigating back to a chapter re-renders instantly.
const htmlCache = new Map();

// Chapter bodies render inside a sandboxed iframe rather than a plain div.
// DOMPurify's default config keeps <style> tags, but only inside a
// WHOLE_DOCUMENT parse — in a same-document fragment render they get
// stripped unconditionally, which silently broke every legacy chapter's
// hand-designed <style> block. An iframe document has no such restriction,
// and (as a side benefit) also stops a chapter's own `* { margin: 0 }`-style
// reset from leaking into and breaking the page chrome around it — the same
// technique already used for the CMS author preview
// (Admin-dashboard/src/pages/content/preview/BlogBodyPreview.jsx).
// `sandbox="allow-same-origin"` blocks script execution (no allow-scripts)
// while still letting this component read contentDocument to auto-size the
// iframe to its content's real height.
const BlogBody = ({ html }) => {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState(0);

  const srcDoc = useMemo(() => {
    // FORCE_BODY is required here: DOMPurify's fragment-mode parser silently
    // drops a leading <style> tag (treats it as invalid at the document root
    // and discards it) unless told to force-parse the input as body content.
    // Without this, moving the render into an iframe alone does nothing —
    // the tag never survives sanitize() to reach the iframe in the first
    // place. Verified against DOMPurify 3.4.13: FORCE_BODY still strips
    // <script> and on*= handlers exactly as before.
    const clean = DOMPurify.sanitize(html || "", { FORCE_BODY: true });
    return (
      `<!doctype html><html><head><meta charset="utf-8">` +
      `<meta name="viewport" content="width=device-width, initial-scale=1">` +
      `<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Montserrat:wght@500;600;700;800;900&display=swap" rel="stylesheet">` +
      `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">` +
      `<style>body{margin:0;padding:0;font-family:"Poppins",sans-serif;}${BLOG_BODY_CSS}</style>` +
      `</head><body><div class="blog-body">${clean}</div></body></html>`
    );
  }, [html]);

  useEffect(() => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc?.documentElement) return;

    const measure = () => setHeight(doc.documentElement.scrollHeight);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(doc.documentElement);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [srcDoc]);

  return (
    <iframe
      ref={iframeRef}
      title="Chapter content"
      srcDoc={srcDoc}
      sandbox="allow-same-origin"
      onLoad={() => {
        const doc = iframeRef.current?.contentDocument;
        if (doc?.documentElement) setHeight(doc.documentElement.scrollHeight);
      }}
      style={{
        width: "100%",
        border: "none",
        display: "block",
        height: height || 400,
      }}
      scrolling="no"
    />
  );
};

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

    const show = (text, title) => {
      htmlCache.set(slug, text);
      setHtml(text);
      setStatus("ready");
      const heading =
        title ||
        (() => {
          const m = text.match(/<h1[^>]*>(.*?)<\/h1>/s);
          return m
            ? m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
            : "";
        })();
      if (heading) document.title = `${heading} · Shiksha`;
    };

    getBlogPost(slug).then((result) => {
      if (ctrl.signal.aborted) return;
      if (result.status === "ok") {
        show(result.post.body_html, result.post.seo_title || result.post.title);
      } else if (result.status === "notfound") {
        setStatus("notfound");
      } else {
        setStatus("error");
      }
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

      {status === "ready" && html && <BlogBody html={html} />}

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
