// PLACEMENT: src/counselling/GuidePage.jsx   (NEW FILE — landing/frontend app)
// Workflow: "Read Career Guide" — sticky table of contents, structured
// sections (paragraphs, tables, tip callouts, lists, references), and a
// funnel CTA at the end (Find counsellors for this).
//
// Fetches from the backend guide CMS (getGuide) instead of the retired
// static data/guides.js. A bad slug and a down API used to look
// identical (both fell through to <Navigate to="/counselling/guides">});
// they're now distinguished: "notfound" redirects, "error" shows a retry
// banner, because the guide really might still exist.
//
// Two reading modes, matching what the guide payload actually contains:
//   - INLINE  (guide.sections is populated — <=40 sections): the whole
//     guide is one continuous scroll, TOC jumps to an anchor.
//   - PAGINATED (guide.sections is [] but guide.chapters is not): four of
//     the ten guides — including study-in-india at 2,500+ sections and
//     ~19,000 blocks — are too large to render as one DOM tree (rendering
//     all of it hung the browser while building this). The TOC becomes a
//     chapter list; clicking one fetches just that chapter's sections.

import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import CounsellingShell from "./CounsellingShell";
import Block from "./GuideBlocks";
import { getGuide, getGuideChapter, getGuideIndex, recordGuideView, toGuideCard } from "../api/guidesApi";
import { GuideCard } from "./LandingPage";

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function GuidePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({ status: "loading" });
  const [related, setRelated] = useState([]);
  const [chapterSlug, setChapterSlug] = useState(null);
  const [chapter, setChapter] = useState({ status: "loading", sections: [] });

  useEffect(() => {
    let live = true;
    setState({ status: "loading" });
    setChapterSlug(null);
    getGuide(slug).then((res) => {
      if (!live) return;
      setState(res);
      if (res.status === "ok") {
        recordGuideView(res.guide.canonical_slug || slug);
        if (res.guide.is_alias && res.guide.canonical_slug) {
          navigate(`/counselling/guides/${res.guide.canonical_slug}`, { replace: true });
        }
        if (!(res.guide.sections?.length) && res.guide.chapters?.length) {
          setChapterSlug(res.guide.chapters[0].slug);
        }
      }
    });
    return () => { live = false; };
  }, [slug, navigate]);

  useEffect(() => {
    if (state.status !== "ok") return;
    let live = true;
    getGuideIndex().then((cards) => {
      if (live) setRelated(cards.filter((g) => g.slug !== state.guide.slug).slice(0, 3).map(toGuideCard));
    });
    return () => { live = false; };
  }, [state]);

  useEffect(() => {
    if (state.status === "ok") document.title = `${state.guide.title} · ShikshaCom`;
  }, [state]);

  const canonicalSlug = state.status === "ok" ? (state.guide.canonical_slug || slug) : slug;
  const paginated = state.status === "ok" && !(state.guide.sections?.length) && state.guide.chapters?.length > 0;

  useEffect(() => {
    if (!paginated || !chapterSlug) return;
    let live = true;
    setChapter({ status: "loading", sections: [] });
    getGuideChapter(canonicalSlug, chapterSlug)
      .then((data) => { if (live) setChapter({ status: "ok", ...data }); })
      .catch(() => { if (live) setChapter({ status: "error", sections: [] }); });
    return () => { live = false; };
  }, [paginated, canonicalSlug, chapterSlug]);

  // Several source documents give every chapter exactly one section and
  // never re-state the chapter's own name as a section heading (e.g.
  // after-12-science: 10 chapters, 10 sections, every section.title ===
  // "" — confirmed while building this). Falling back to the owning
  // chapter's title, shown once per chapter transition, is what stops
  // the reader from reading 10 chapters as one undivided wall of text
  // with a TOC that has nothing to jump to.
  const chaptersById = useMemo(() => {
    const map = new Map();
    (state.guide?.chapters || []).forEach((c) => map.set(c.id, c));
    return map;
  }, [state]);

  const bodySections = useMemo(() => {
    const raw = paginated ? chapter.sections || [] : (state.status === "ok" ? state.guide.sections || [] : []);
    const { rows } = raw.reduce(
      (acc, s) => {
        let displayTitle = s.title;
        let isChapterHeading = false;
        if (!displayTitle && s.chapter != null && s.chapter !== acc.lastChapterId) {
          displayTitle = chaptersById.get(s.chapter)?.title || "";
          isChapterHeading = true;
        }
        acc.rows.push({ ...s, displayTitle, isChapterHeading });
        acc.lastChapterId = s.chapter ?? acc.lastChapterId;
        return acc;
      },
      { rows: [], lastChapterId: null }
    );
    return rows;
  }, [paginated, chapter.sections, state, chaptersById]);

  const tocItems = useMemo(() => {
    if (paginated) {
      return (state.guide?.chapters || []).map((c) => ({ key: c.slug, title: c.title, isChapter: true }));
    }
    return bodySections
      .filter((s) => s.displayTitle)
      .map((s) => ({ key: `sec-${slugify(s.displayTitle)}-${s.id ?? ""}`, title: s.displayTitle }));
  }, [paginated, state, bodySections]);

  if (state.status === "notfound") return <Navigate to="/counselling/guides" replace />;

  if (state.status === "error") {
    return (
      <CounsellingShell crumb=" / Guides">
        <div className="sc-error">
          Couldn't load this guide right now.{" "}
          <button className="sc-btn ghost" onClick={() => window.location.reload()}>Retry</button>
        </div>
      </CounsellingShell>
    );
  }

  if (state.status === "loading") {
    return (
      <CounsellingShell crumb=" / Guides">
        <div className="sc-skel" style={{ height: 46, maxWidth: 480, marginBottom: 16 }} />
        <div className="sc-skel" style={{ height: 320 }} />
      </CounsellingShell>
    );
  }

  const guide = state.guide;
  const chapterIndex = paginated ? guide.chapters.findIndex((c) => c.slug === chapterSlug) : -1;
  const goToChapter = (targetSlug) => {
    setChapterSlug(targetSlug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <CounsellingShell crumb={` / Guides / ${guide.audience}`}>
      <span className={`sc-badge ${guide.accent}`} style={{ marginBottom: 10, display: "inline-block" }}>{guide.audience}</span>
      <h1 className="sc-h1" style={{ maxWidth: 760 }}>{guide.title}</h1>
      <p className="sc-sub">{guide.blurb}</p>

      <div className="sc-reader">
        <nav className="sc-toc" aria-label="Contents">
          {tocItems.map((item) =>
            item.isChapter ? (
              <button
                key={item.key}
                className={item.key === chapterSlug ? "on" : undefined}
                onClick={() => goToChapter(item.key)}
              >
                {item.title}
              </button>
            ) : (
              <button key={item.key} onClick={() => document.getElementById(item.key)?.scrollIntoView({ behavior: "smooth" })}>
                {item.title}
              </button>
            )
          )}
        </nav>
        <article className="sc-prose">
          {guide.glance?.length > 1 && (
            <Block b={{ t: "table", rows: guide.glance }} />
          )}

          {paginated && chapter.status === "loading" && (
            <div className="sc-skel" style={{ height: 260 }} />
          )}
          {paginated && chapter.status === "error" && (
            <div className="sc-error">
              Couldn't load this chapter.{" "}
              <button className="sc-btn ghost" onClick={() => setChapterSlug((s) => s)}>Retry</button>
            </div>
          )}

          {bodySections.map((s) => (
            <section key={s.id ?? s.displayTitle} className={s.audience === "parent" ? "sc-parent-section" : undefined}>
              {s.displayTitle && (
                <h2
                  id={paginated ? undefined : `sec-${slugify(s.displayTitle)}-${s.id ?? ""}`}
                  className={s.isChapterHeading ? "sc-chapter-heading" : undefined}
                >
                  {s.displayTitle}
                </h2>
              )}
              {(s.blocks || []).map((b, i) => <Block key={i} b={b} />)}
            </section>
          ))}

          {paginated && chapter.status === "ok" && (
            <div className="sc-chapter-nav">
              <button
                className="sc-btn ghost sm"
                disabled={chapterIndex <= 0}
                onClick={() => goToChapter(guide.chapters[chapterIndex - 1].slug)}
              >
                ← Previous chapter
              </button>
              <span className="sc-note">Chapter {chapterIndex + 1} of {guide.chapters.length}</span>
              <button
                className="sc-btn sm"
                disabled={chapterIndex >= guide.chapters.length - 1}
                onClick={() => goToChapter(guide.chapters[chapterIndex + 1].slug)}
              >
                Next chapter →
              </button>
            </div>
          )}

          <div style={{ marginTop: 30, display: "flex", gap: 10, flexWrap: "wrap", borderTop: "1px solid rgba(9,62,5,.1)", paddingTop: 22 }}>
            <Link className="sc-btn" to="/counselling/counsellors">Find counsellors for this →</Link>
            <Link className="sc-btn ghost" to="/counselling/guides">All guides</Link>
          </div>
        </article>
      </div>

      {related.length > 0 && (
        <>
          <div className="sc-h2row"><h2 className="sc-h2">Keep reading</h2></div>
          <div className="sc-grid3">
            {related.map((g) => <GuideCard key={g.slug} g={g} />)}
          </div>
        </>
      )}
    </CounsellingShell>
  );
}
