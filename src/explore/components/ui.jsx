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
import "../Verification.css";

// ── icons (kept inline so there's no icon-lib dependency) ─────────────────────
export const Icon = {
  search: (p) => (<ScribbleIcon name="search" size={18} {...p} />),
  arrow: (p) => (<ScribbleIcon name="arrow-right" size={14} {...p} />),
  back: (p) => (<ScribbleIcon name="arrow-left" size={16} {...p} />),
  x: (p) => (<ScribbleIcon name="close" size={12} {...p} />),
};

// ── verification badge ────────────────────────────────────────────────────────
// shiksha-backend/docs/EXPLORE_VERIFICATION.md §8.
//
// ⚠ `doc.verification` is NULL while the feature flag is off, and that must
// render NOTHING — not an "Unverified" pill. The two say different things:
// one claims nobody has checked this document, the other that checking does
// not exist here yet. Putting an amber pill on every item in the library the
// day before launch would be the second dressed up as the first.
//
// The server also decides WHICH badge the public sees: a set with changes
// requested reports `badge: "unverified"`, because the design keeps it in
// Browse marked Unverified rather than letting one reviewer publicly brand
// someone's upload.
export function VerificationBadge({ verification, withProgress = true }) {
  if (!verification) return null;
  const label = verification.badge === "verified" ? "Verified" : "Unverified";
  return (
    <span className="vf-status">
      <span className={`vf-pill vf-${verification.badge}`}>{label}</span>
      {withProgress && <small>{verification.label}</small>}
    </span>
  );
}

// "You specialise in X. Have you checked these files?" — shown only to a
// confirmed specialist who may actually act, so the button never leads to a
// refusal. `can_review` and `my_subject` are computed by the same
// verification.can_review() the POST endpoint enforces.
export function ReviewPrompt({ verification, onReview }) {
  if (!verification?.can_review || !verification.my_subject) return null;
  return (
    <div className="vf-prompt" onClick={(e) => e.stopPropagation()}>
      <p>You specialise in {verification.my_subject}. Have you checked these files?</p>
      <button type="button" onClick={onReview}>Review this set</button>
    </div>
  );
}

// ── format helpers ────────────────────────────────────────────────────────────
// Shared rather than duplicated: the upload picker, the review panel and the
// document page all print file sizes, and three copies would drift on the
// first rounding tweak. Returns "" for 0 — a backfilled DocumentFile row has
// no size, and "0 B" is a claim about the file rather than about what we know.
export const humanSize = (bytes) => {
  if (!bytes) return "";
  const u = ["B", "KB", "MB"]; let i = 0; let n = bytes;
  while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
  return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${u[i]}`;
};

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
        <VerificationBadge verification={doc.verification} />
        {/* "2 files: DOCX, XLSX" — only when the set holds more than one.
            On a single-file set the line is noise: the cover already shows
            the type and the count would always read "1 file". */}
        {(doc.files?.length || 0) > 1 && (
          <p className="exp-doc-files">
            {doc.files.length} files:{" "}
            {[...new Set(doc.files.map((f) => f.filetype).filter(Boolean))].join(", ")}
          </p>
        )}
        <div className="exp-doc-stats">
          <LikeButton doc={doc} className="mini" />
          <span>{doc.views} views</span>
          <span>{doc.downloads} ↓</span>
        </div>
        <ReviewPrompt
          verification={doc.verification}
          onReview={() => nav(`/explore/verify?tab=queue&set=${doc.id}`)}
        />
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
      <VerificationBadge verification={doc.verification} withProgress={false} />
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
