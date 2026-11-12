// ─────────────────────────────────────────────────────────────────────────────
// src/explore/components/ui.jsx
// Small shared pieces used across the Explore screens: the document card, author
// and collection cards, a couple of inline SVG icons, and format helpers.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExplore } from "../ExploreStore";
import { useAuth } from "../../contexts/AuthContext";
import { toggleLike as toggleLikeApi } from "../exploreApi";
import { CategoryIcon } from "./categoryIcons";
import ScribbleIcon from "../../components/icons/ScribbleIcon";

// ── icons (kept inline so there's no icon-lib dependency) ─────────────────────
export const Icon = {
  search: (p) => (<ScribbleIcon name="search" size={18} {...p} />),
  arrow: (p) => (<ScribbleIcon name="arrow-right" size={14} {...p} />),
  back: (p) => (<ScribbleIcon name="arrow-left" size={16} {...p} />),
  x: (p) => (<ScribbleIcon name="close" size={12} {...p} />),
};

// ── format helpers ────────────────────────────────────────────────────────────
export const fileGlyph = (ft) => ({ PDF: "PDF", DOCX: "DOC", PPT: "PPT" }[ft] || "DOC");

// #rrggbb -> rgba(..., alpha), for the tinted icon chips.
export function tint(hex, alpha) {
  const h = (hex || "#125027").replace("#", "");
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ── like button (server-backed likes_count / is_liked, replaces the old
//    static "rating" display everywhere a document is shown) ───────────────────
export function LikeButton({ doc, className = "" }) {
  // This control talks to exploreApi directly rather than through
  // ExploreStore, so the store's auth gate does not cover it — it needs its
  // own. Without it a logged-out heart click 401s and apiClient's interceptor
  // hard-navigates the tab to /login with no `next`, losing the document.
  const { isAuthenticated } = useAuth();
  const nav = useNavigate();
  const [liked, setLiked] = useState(!!doc.is_liked);
  const [count, setCount] = useState(doc.likes_count ?? 0);
  const [busy, setBusy] = useState(false);

  // Re-sync when a different document is passed in (e.g. list re-render).
  useEffect(() => {
    setLiked(!!doc.is_liked);
    setCount(doc.likes_count ?? 0);
  }, [doc.id, doc.is_liked, doc.likes_count]);

  const onClick = async (e) => {
    e.stopPropagation();
    if (busy) return;
    if (!isAuthenticated) {
      const back = window.location.pathname + window.location.search;
      nav(`/login?next=${encodeURIComponent(back)}`);
      return;
    }
    setBusy(true);
    const prevLiked = liked;
    const prevCount = count;
    const nextLiked = !liked;
    setLiked(nextLiked);
    setCount((c) => Math.max(0, c + (nextLiked ? 1 : -1)));
    try {
      const data = await toggleLikeApi(doc.id);
      if (data) {
        const isLiked = typeof data.is_liked === "boolean" ? data.is_liked
          : typeof data.liked === "boolean" ? data.liked : undefined;
        const likesCount = typeof data.likes_count === "number" ? data.likes_count
          : typeof data.likes === "number" ? data.likes : undefined;
        if (isLiked !== undefined) setLiked(isLiked);
        if (likesCount !== undefined) setCount(likesCount);
      }
    } catch {
      setLiked(prevLiked);
      setCount(prevCount);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      className={`exp-like-btn${liked ? " on" : ""}${className ? ` ${className}` : ""}`}
      onClick={onClick}
      disabled={busy}
      title={liked ? "Unlike" : "Like"}
    >
      <span aria-hidden="true" className="exp-like-glyph"><ScribbleIcon name="heart" filled={liked} /></span> {count}
    </button>
  );
}

// ── document card ─────────────────────────────────────────────────────────────
export function DocCard({ doc }) {
  const nav = useNavigate();
  const { isSaved, toggleSave } = useExplore();
  const meta = doc.typeMeta || {};
  const cover = `linear-gradient(135deg, ${meta.color || "#125027"}, #003223)`;
  const saved = isSaved(doc.id);

  return (
    <article className="exp-doc" onClick={() => nav(`/explore/doc/${doc.id}`)}>
      <div className="exp-doc-cover" style={{ background: cover }}>
        <span className="ftype">{fileGlyph(doc.filetype)}</span>
        <button
          className={`fsave${saved ? " on" : ""}`}
          title={saved ? "Remove from library" : "Save to library"}
          onClick={(e) => { e.stopPropagation(); toggleSave(doc.id); }}
        ><ScribbleIcon name="bookmark" filled={saved} aria-hidden="true" /></button>
        <span className="ficon"><CategoryIcon meta={meta} /></span>
      </div>
      <div className="exp-doc-body">
        <h3>{doc.title}</h3>
        <div className="exp-doc-meta">{doc.author?.name} · {doc.dateLabel}</div>
        <div className="exp-doc-tags">
          {(doc.tags || []).slice(0, 2).map((t) => <span key={t} className="exp-tag">{t}</span>)}
        </div>
        <div className="exp-doc-stats">
          <LikeButton doc={doc} className="mini" />
          <span>{doc.views} views</span>
          <span>{doc.downloads} ↓</span>
        </div>
      </div>
    </article>
  );
}

// ── compact document card (Explore landing "Recently uploaded") ────────────────
export function MiniDocCard({ doc }) {
  const nav = useNavigate();
  const meta = doc.typeMeta || {};
  const color = meta.color || "#125027";
  return (
    <article className="exp-doc-mini" onClick={() => nav(`/explore/doc/${doc.id}`)}>
      <div className="ic" style={{ background: tint(color, 0.13), border: `1px solid ${tint(color, 0.2)}`, color }}>
        <CategoryIcon meta={meta} />
      </div>
      <h3>{doc.title}</h3>
      <p>{doc.author?.name}</p>
      <span className="date">{doc.dateLabel}</span>
    </article>
  );
}

// ── author card ───────────────────────────────────────────────────────────────
export function AuthorCard({ author }) {
  const nav = useNavigate();
  return (
    <article className="exp-authcard" onClick={() => nav(`/explore/author/${author.id}`)}>
      <div className="exp-avatar" style={{ background: author.color }}>{author.initials}</div>
      <div>
        <h3>{author.name}</h3>
        <p>{author.title}</p>
        <div className="flw">{author.followers} followers · {author.docsCount} docs</div>
      </div>
    </article>
  );
}

// ── collection card ───────────────────────────────────────────────────────────
export function CollectionCard({ collection }) {
  const nav = useNavigate();
  const bg = `linear-gradient(135deg, ${collection.color || "#125027"}, #003223)`;
  return (
    <article className="exp-col" style={{ background: bg }} onClick={() => nav(`/explore/collections/${collection.id}`)}>
      <div>
        <h3>{collection.title}</h3>
        <p>{collection.desc}</p>
      </div>
      <div className="foot">
        <span>{collection.count} documents</span>
        <span>{collection.visibility}</span>
      </div>
    </article>
  );
}

// ── section header ─────────────────────────────────────────────────────────────
export function SectionHead({ eyebrow, subtitle, title, onViewAll, viewAllLabel = "View all" }) {
  return (
    <div className="exp-sectionhead">
      <div>
        {eyebrow && <p className="exp-eyebrow">{eyebrow}</p>}
        <h2 className="exp-secttitle">{title}</h2>
        {subtitle && <p className="exp-sub" style={{ marginTop: 6 }}>{subtitle}</p>}
      </div>
      {onViewAll && (
        <button className="exp-viewall" onClick={onViewAll}>{viewAllLabel} <Icon.arrow /></button>
      )}
    </div>
  );
}

// ── loading spinner ────────────────────────────────────────────────────────────
export function Loading() {
  return <div className="exp-loading"><div className="exp-spin" /></div>;
}
