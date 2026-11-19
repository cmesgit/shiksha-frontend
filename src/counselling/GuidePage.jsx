// PLACEMENT: src/counselling/GuidePage.jsx   (NEW FILE — landing/frontend app)
// Workflow: "Read Career Guide" — sticky table of contents, structured
// sections (paragraphs, tables, tip callouts, lists, references), and a
// funnel CTA at the end (Find counsellors for this).
//
// Fetches from the backend guide CMS (getGuide) instead of the retired
// static data/guides.js. A bad slug and a down API used to look
// identical (both fell through to <Navigate to="/counselling/india">});
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
import { Link, useParams, useNavigate, Navigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CounsellingShell from "./CounsellingShell";
import Block from "./GuideBlocks";
import { getGuide, getGuideChapter, getGuideIndex, getGuideProgress, saveGuideProgress, recordGuideView, toGuideCard } from "../api/guidesApi";
import { GuideCard } from "./LandingPage";

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Mirrors GuideChapter.KIND_CHOICES (counseling/guide_models.py) — the
// backend already groups chapters into these buckets for exactly this
// purpose (see that model's comment), the frontend just never read `kind`
// until now. Order controls tab display order.
const KIND_ORDER = ["content", "activities", "parent_guide", "faq", "references"];
const KIND_LABELS = {
  content: "Guide content", activities: "Activities",
  parent_guide: "For parents", faq: "FAQ", references: "References",
};
const groupKind = (kind) => ["worksheet", "action_plan"].includes(kind) ? "activities" : (kind || "content");

export default function GuidePage() {
  const { slug } = useParams();
  return <GuideReader key={slug} slug={slug} />;
}

function GuideReader({ slug }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedChapter = searchParams.get("chapter");
  // "?section=" is 0-based within the CURRENT chapter's own sections —
  // the board paginates one section at a time (e.g. "section 1 of 12")
  // with its own Previous/Next, not the whole chapter on one scroll. The
  // sentinel "last" is how "Previous" from a chapter's first section asks
  // for the end of the PRECEDING chapter, whose section count isn't known
  // until that chapter's own fetch resolves.
  const requestedSection = searchParams.get("section");
  const { isAuthenticated } = useAuth();
  const [state, setState] = useState({ status: "loading" });
  const [related, setRelated] = useState([]);
  const [chapter, setChapter] = useState({ status: "loading", sections: [] });
  const [chapterSearch, setChapterSearch] = useState("");
  const [progress, setProgress] = useState(null);
  const [progressError, setProgressError] = useState("");

  useEffect(() => {
    let live = true;
    getGuide(slug).then((res) => {
      if (!live) return;
      setState(res);
      if (res.status === "ok") {
        recordGuideView(res.guide.canonical_slug || slug);
        if (res.guide.is_alias && res.guide.canonical_slug) {
          navigate(`/counselling/guides/${res.guide.canonical_slug}`, { replace: true });
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
  const chapters = state.status === "ok" ? state.guide.chapters || [] : [];
  const selectedChapter = chapters.find((c) => c.slug === requestedChapter)
    || chapters.find((c) => groupKind(c.kind) === "content") || chapters[0];
  const chapterSlug = selectedChapter?.slug || null;
  const activeKind = selectedChapter ? groupKind(selectedChapter.kind) : null;
  const chapterStatus = chapter.slug === chapterSlug ? chapter.status : "loading";

  // Chapters group into kind tabs (Content/Worksheets/For parents/...) —
  // GuideChapter.kind was already serialized for exactly this, just never
  // read by the frontend before. Content-first by default; if a guide has
  // no "content" chapters (unusual), fall back to whichever kind sorts
  // first.
  const kindTabs = useMemo(() => {
    if (state.status !== "ok") return [];
    const counts = new Map();
    (state.guide?.chapters || []).forEach((c) => {
      const k = groupKind(c.kind);
      counts.set(k, (counts.get(k) || 0) + 1);
    });
    return KIND_ORDER.filter((k) => counts.has(k)).map((k) => ({ key: k, label: KIND_LABELS[k], count: counts.get(k) }));
  }, [state]);

  const goToKind = (kind) => {
    const chapters = state.guide?.chapters || [];
    const first = chapters.find((c) => groupKind(c.kind) === kind);
    if (first) {
      setSearchParams({ chapter: first.slug }, { replace: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (state.status !== "ok" || !isAuthenticated) return;
    let live = true;
    const request = chapterSlug ? saveGuideProgress(canonicalSlug, chapterSlug) : getGuideProgress(canonicalSlug);
    request
      .then((data) => { if (live) setProgress(data); })
      .catch(() => { if (live) setProgressError("Reading progress isn't available right now."); });
    return () => { live = false; };
  }, [state, canonicalSlug, chapterSlug, isAuthenticated]);

  useEffect(() => {
    if (!paginated || !chapterSlug) return;
    let live = true;
    getGuideChapter(canonicalSlug, chapterSlug)
      .then((data) => { if (live) setChapter({ status: "ok", slug: chapterSlug, ...data }); })
      .catch(() => { if (live) setChapter({ status: "error", slug: chapterSlug, sections: [] }); });
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
    const source = paginated ? (chapterStatus === "ok" ? chapter.sections || [] : []) : (state.status === "ok" ? state.guide.sections || [] : []);
    // Section kinds can differ from their owning chapter (for example an
    // exercise inside a content chapter). The chapter controls the tab.
    const raw = paginated ? source : source.filter((s) =>
      groupKind(chaptersById.get(s.chapter)?.kind || "content") === activeKind);
    const { rows } = raw.reduce(
      (acc, s) => {
        let displayTitle = s.title;
        const isChapterStart = s.chapter != null && s.chapter !== acc.lastChapterId;
        let isChapterHeading = false;
        if (!displayTitle && s.chapter != null && s.chapter !== acc.lastChapterId) {
          displayTitle = chaptersById.get(s.chapter)?.title || "";
          isChapterHeading = true;
        }
        acc.rows.push({ ...s, displayTitle, isChapterHeading, isChapterStart,
          chapterSlug: chaptersById.get(s.chapter)?.slug });
        acc.lastChapterId = s.chapter ?? acc.lastChapterId;
        return acc;
      },
      { rows: [], lastChapterId: null }
    );
    return rows;
  }, [paginated, chapter.sections, chapterStatus, state, chaptersById, activeKind]);

  // One section on screen at a time, matching the board — a long chapter
  // (study-abroad's "Country-wise Education Guide" alone carries 1,850
  // section records, one per country sub-topic) rendered as a single
  // scroll was the "too long" complaint; the board's own chapter-1 screen
  // showing one ~300-word section at a time is the "short" one. Clamped
  // rather than trusting the URL: a stale `?section=` from a shorter
  // chapter must not point past the end of a longer one.
  const sectionCount = paginated ? bodySections.length : 0;
  const sectionIndex = !paginated || sectionCount === 0 ? 0
    : requestedSection === "last" ? sectionCount - 1
    : Math.min(Math.max(0, parseInt(requestedSection, 10) || 0), sectionCount - 1);
  const currentSection = paginated ? bodySections[sectionIndex] : null;

  const tocItems = useMemo(() => {
    if (paginated) {
      return (state.guide?.chapters || [])
        .filter((c) => groupKind(c.kind) === activeKind)
        .map((c) => ({ key: c.slug, title: c.title, isChapter: true }));
    }
    return bodySections
      .filter((s) => s.displayTitle)
      .map((s) => ({ key: `sec-${slugify(s.displayTitle)}-${s.id ?? ""}`, title: s.displayTitle,
        chapterSlug: s.chapterSlug }));
  }, [paginated, state, bodySections, activeKind]);
  const filteredToc = tocItems.filter((item) => item.title.toLowerCase().includes(chapterSearch.trim().toLowerCase()));

  useEffect(() => {
    if (paginated || !requestedChapter || !bodySections.some((s) => s.chapterSlug === requestedChapter)) return;
    const frame = requestAnimationFrame(() =>
      document.getElementById(`sc-chapter-${requestedChapter}`)?.scrollIntoView({ behavior: "smooth" }));
    return () => cancelAnimationFrame(frame);
  }, [paginated, requestedChapter, bodySections]);

  if (state.status === "notfound") return <Navigate to="/counselling/india" replace />;

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
  // Prev/next stays within the active kind tab — crossing from a Content
  // chapter straight into a Worksheet one on "Next chapter" would undercut
  // the whole point of separating them into tabs.
  const kindChapters = (guide.chapters || []).filter((c) => groupKind(c.kind) === activeKind);
  const chapterIndex = kindChapters.findIndex((c) => c.slug === chapterSlug);
  const goToChapter = (targetSlug, atSection) => {
    setSearchParams(atSection != null ? { chapter: targetSlug, section: atSection } : { chapter: targetSlug }, { replace: true });
    if (paginated) window.scrollTo({ top: 0, behavior: "smooth" });
    else requestAnimationFrame(() => document.getElementById(`sc-chapter-${targetSlug}`)?.scrollIntoView({ behavior: "smooth" }));
  };
  const goToSection = (targetIndex) => {
    setSearchParams({ chapter: chapterSlug, section: targetIndex }, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // One pager for the whole reading sequence — Previous/Next move by
  // section and only cross into the next/previous CHAPTER at either end,
  // rather than running two separate pagers (section-level and
  // chapter-level) the way the old chapter-nav bar alone used to.
  const goPrevSection = () => {
    if (sectionIndex > 0) return goToSection(sectionIndex - 1);
    if (chapterIndex > 0) return goToChapter(kindChapters[chapterIndex - 1].slug, "last");
  };
  const goNextSection = () => {
    if (sectionIndex < sectionCount - 1) return goToSection(sectionIndex + 1);
    if (chapterIndex < kindChapters.length - 1) return goToChapter(kindChapters[chapterIndex + 1].slug, 0);
  };
  const markRead = async () => {
    try {
      const next = await saveGuideProgress(canonicalSlug, chapterSlug, true);
      setProgress(next);
      setProgressError("");
    } catch { setProgressError("Couldn't mark this chapter as read. Please try again."); }
  };
  const retryChapter = () => {
    setChapter({ status: "loading", slug: chapterSlug, sections: [] });
    getGuideChapter(canonicalSlug, chapterSlug)
      .then((data) => setChapter({ status: "ok", slug: chapterSlug, ...data }))
      .catch(() => setChapter({ status: "error", slug: chapterSlug, sections: [] }));
  };
  const marked = progress?.read_chapter_slugs?.includes(chapterSlug) || (guide.chapters?.length === 0 && progress?.has_read);
  const readPercent = progress?.chapter_count ? Math.round(100 * progress.read_count / progress.chapter_count)
    : progress?.has_read ? 100 : 0;

  return (
    <CounsellingShell crumb={` / Guides / ${guide.audience}`}>
      {/* A paginated guide (study-abroad, study-in-india, …) fetches and
          shows ONE chapter at a time — the board gives that chapter its
          own hero (a "Phase N of M" kicker + the CHAPTER's own name as the
          H1), not the guide's static title. Driving the board found this:
          clicking from chapter 1 to chapter 2 changed the H1 from
          "Understanding Study Abroad" to "Student Profile & Academic
          Pathway"; the live build kept showing "Study Abroad — Complete
          Guide" for every chapter. Scoped to paginated guides only — an
          inline guide (<=40 sections, the whole thing on one scroll) has
          no equivalent "current chapter" the way a reader experiences it,
          and no inline guide's board was checked to confirm it wants this.
          The kicker reads "Phase N of M" rather than splicing in the
          guide's own title (as the board's exact wording does for this one
          guide) — guide.title is phrased differently across the 11 guides
          this component serves ("Study Abroad — Complete Guide" already
          contains the word "Guide"), so reusing that text verbatim in a
          "PHASE N OF THE ⟨title⟩ GUIDE" template would read oddly on guides
          whose title wasn't written for that slot. */}
      {paginated && selectedChapter ? (
        <>
          <span className="sc-badge orange" style={{ marginBottom: 10, display: "inline-block" }}>
            Phase {chapterIndex + 1} of {kindChapters.length}
          </span>
          <h1 className="sc-h1" style={{ maxWidth: 760 }}>{selectedChapter.title}</h1>
          {chapterStatus === "ok" && sectionCount > 0 && (
            <p className="sc-sub" style={{ marginBottom: 10 }}>
              {sectionCount} section{sectionCount === 1 ? "" : "s"} · section {sectionIndex + 1} of {sectionCount}
            </p>
          )}
        </>
      ) : (
        <>
          <span className={`sc-badge ${guide.accent}`} style={{ marginBottom: 10, display: "inline-block" }}>{guide.audience}</span>
          <h1 className="sc-h1" style={{ maxWidth: 760 }}>{guide.title}</h1>
          <p className="sc-sub">{guide.blurb}</p>
        </>
      )}

      <div className="sc-reading-progress">
        <div><strong>{guide.chapters?.length ? `${progress?.read_count || 0} of ${guide.chapters.length} chapters read`
          : progress?.has_read ? "Guide marked read" : "Guide not marked read"}</strong>
          {chapterIndex >= 0 && <span> · Chapter {chapterIndex + 1} of {kindChapters.length} in {KIND_LABELS[activeKind] || "this guide"}</span>}
        </div>
        <div className="sc-reading-track" role="progressbar" aria-label="Guide reading progress" aria-valuenow={readPercent} aria-valuemin="0" aria-valuemax="100">
          <span style={{ width: `${readPercent}%` }} />
        </div>
        {progressError && <p className="sc-progress-error">{progressError}</p>}
      </div>

      {kindTabs.length > 1 && (
        <div className="sc-tabs">
          {kindTabs.map((t) => (
            <button key={t.key} className={`sc-tab${t.key === activeKind ? " on" : ""}`} onClick={() => goToKind(t.key)}>
              {t.label} <span className="sc-tabnum">{t.count}</span>
            </button>
          ))}
        </div>
      )}

      <div className="sc-reader">
        <nav className="sc-toc" aria-label="Contents">
          <input className="sc-toc-search" type="search" placeholder="Search chapters…" aria-label="Search chapters"
            value={chapterSearch} onChange={(e) => setChapterSearch(e.target.value)} />
          {filteredToc.map((item) =>
            item.isChapter ? (
              <button
                key={item.key}
                className={item.key === chapterSlug ? "on" : undefined}
                onClick={() => goToChapter(item.key)}
              >
                {item.title}
              </button>
            ) : (
              <button key={item.key} onClick={() => {
                if (item.chapterSlug && item.chapterSlug !== chapterSlug) {
                  setSearchParams({ chapter: item.chapterSlug }, { replace: true });
                }
                requestAnimationFrame(() => document.getElementById(item.key)?.scrollIntoView({ behavior: "smooth" }));
              }}>
                {item.title}
              </button>
            )
          )}
          {filteredToc.length === 0 && <p className="sc-toc-empty">No matching chapters.</p>}
        </nav>
        <article className="sc-prose">
          {guide.glance?.length > 1 && (
            <Block b={{ t: "table", rows: guide.glance }} />
          )}

          {paginated && chapterStatus === "loading" && (
            <div className="sc-skel" style={{ height: 260 }} />
          )}
          {paginated && chapterStatus === "error" && (
            <div className="sc-error">
              Couldn't load this chapter.{" "}
              <button className="sc-btn ghost" onClick={retryChapter}>Retry</button>
            </div>
          )}

          {/* One section's own title per button, not an anchor scroll — the
              board's "on this page" box jumps between SEPARATE section
              screens, which is also why it still lists every section even
              though only one renders below at a time. Capped at 20 like
              the anchor version this replaced: the "Country-wise Education
              Guide" chapter alone carries 1,850 sections, and the board's
              own box was never driven against a chapter anywhere near that
              size. */}
          {paginated && bodySections.filter((s) => s.displayTitle).length > 1 && (
            <nav className="sc-on-page" aria-label="On this page">
              <strong>On this page</strong>
              {bodySections
                .map((s, i) => ({ s, i }))
                .filter(({ s }) => s.displayTitle)
                .slice(0, 20)
                .map(({ s, i }) => (
                  <button key={s.id ?? i} className={i === sectionIndex ? "on" : undefined} onClick={() => goToSection(i)}>
                    {s.displayTitle}
                  </button>
                ))}
            </nav>
          )}

          {paginated ? (
            currentSection && (
              <section className={currentSection.audience === "parent" ? "sc-parent-section" : undefined}>
                {currentSection.displayTitle && (
                  <h2 className={currentSection.isChapterHeading ? "sc-chapter-heading" : undefined}>
                    {currentSection.displayTitle}
                  </h2>
                )}
                {(currentSection.blocks || []).map((b, i) => (
                  <Block key={i} b={b} storageKey={`sc-activity:${canonicalSlug}:${currentSection.id ?? currentSection.displayTitle}:${i}`} />
                ))}
              </section>
            )
          ) : (
            bodySections.map((s) => (
              <section key={s.id ?? s.displayTitle} id={s.isChapterStart ? `sc-chapter-${s.chapterSlug}` : undefined}
                className={s.audience === "parent" ? "sc-parent-section" : undefined}>
                {s.displayTitle && (
                  <h2 id={`sec-${slugify(s.displayTitle)}-${s.id ?? ""}`}
                    className={s.isChapterHeading ? "sc-chapter-heading" : undefined}>
                    {s.displayTitle}
                  </h2>
                )}
                {(s.blocks || []).map((b, i) => (
                  <Block key={i} b={b} storageKey={`sc-activity:${canonicalSlug}:${s.id ?? s.displayTitle}:${i}`} />
                ))}
              </section>
            ))
          )}

          {/* Section-level pager — matches the board's "‹ {prev title} /
              {next title} ›" directly under a section's content. Crosses a
              chapter boundary at either end rather than stopping there, so
              it IS the sequential "read through the whole guide" control;
              the chapter-nav bar below keeps only the jump-by-chapter and
              mark-as-read controls so the two don't duplicate each other. */}
          {paginated && chapterStatus === "ok" && sectionCount > 0 && (
            <div className="sc-chapter-nav">
              <button
                className="sc-btn ghost sm"
                disabled={sectionIndex === 0 && chapterIndex <= 0}
                onClick={goPrevSection}
              >
                ‹ {sectionIndex > 0 ? bodySections[sectionIndex - 1].displayTitle
                  : chapterIndex > 0 ? kindChapters[chapterIndex - 1].title : ""}
              </button>
              <span className="sc-note">Section {sectionIndex + 1} of {sectionCount}</span>
              <button
                className="sc-btn sm"
                disabled={sectionIndex === sectionCount - 1 && chapterIndex >= kindChapters.length - 1}
                onClick={goNextSection}
              >
                {sectionIndex < sectionCount - 1 ? bodySections[sectionIndex + 1].displayTitle
                  : chapterIndex < kindChapters.length - 1 ? kindChapters[chapterIndex + 1].title : ""} ›
              </button>
            </div>
          )}

          {/* Jump-a-whole-chapter + mark-as-read. Previous/Next CHAPTER
              buttons are dropped when paginated — the section pager above
              already crosses chapter boundaries at either end, and a
              second pair of Prev/Next controls doing the same thing one
              screen length away is what the board never has. Inline
              guides keep both buttons exactly as before: they have no
              section pager, so this bar is their only chapter nav. */}
          {kindChapters.length > 0 && (!paginated || chapterStatus === "ok") && (
            <div className="sc-chapter-nav">
              {!paginated && (
                <button
                  className="sc-btn ghost sm"
                  disabled={chapterIndex <= 0}
                  onClick={() => goToChapter(kindChapters[chapterIndex - 1].slug)}
                >
                  ← Previous chapter
                </button>
              )}
              <span className="sc-note">Chapter {chapterIndex + 1} of {kindChapters.length}</span>
              {isAuthenticated ? <button className="sc-btn ghost sm" disabled={marked} onClick={markRead}>
                {marked ? "Read ✓" : "Mark chapter as read"}
              </button> : <Link className="sc-btn ghost sm" to="/login" state={{ from: window.location.pathname + window.location.search }}>Log in to save progress</Link>}
              {!paginated && (
                <button
                  className="sc-btn sm"
                  disabled={chapterIndex >= kindChapters.length - 1}
                  onClick={() => goToChapter(kindChapters[chapterIndex + 1].slug)}
                >
                  Next chapter →
                </button>
              )}
            </div>
          )}

          {guide.chapters?.length === 0 && <div className="sc-chapter-nav">
            {isAuthenticated ? <button className="sc-btn ghost sm" disabled={marked} onClick={markRead}>
              {marked ? "Read ✓" : "Mark guide as read"}
            </button> : <Link className="sc-btn ghost sm" to="/login" state={{ from: window.location.pathname + window.location.search }}>
              Log in to save progress
            </Link>}
          </div>}

          <div style={{ marginTop: 30, display: "flex", gap: 10, flexWrap: "wrap", borderTop: "1px solid rgba(9,62,5,.1)", paddingTop: 22 }}>
            {["study-in-india", "after-12-science"].includes(canonicalSlug) && (
              <Link className="sc-btn green" to="/admission/india/engineering">Explore engineering colleges in India →</Link>
            )}
            <Link className="sc-btn" to="/counselling/counsellors">Find counsellors for this →</Link>
            <Link className="sc-btn ghost" to="/counselling/india">All guides</Link>
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
