import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Search, X } from "lucide-react";
import { getBlogCardsPage } from "../api/contentApi";
import { BLOG_CLASSES, BLOG_PAGE_SIZE, BLOG_SUBJECTS, blogFilters } from "../utils/blogBrowse";
import "../css/Blogs.css";

// Study-specific cards leave the shared dashboard BlogCard contract intact.
function StudyCard({ post, priority }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <article className="study-card">
      <Link to={`/blogs/${post.slug}`} className="study-card-link">
        <div className="study-card-cover">
          {post.thumbnail && !imageFailed ? (
            <img src={post.thumbnail} alt="" width="640" height="360"
              loading={priority ? "eager" : "lazy"} decoding="async"
              fetchPriority={priority ? "high" : "auto"} onError={() => setImageFailed(true)} />
          ) : <div className="study-card-placeholder" aria-hidden="true"><BookOpen size={42} /><span>{post.category || "Study guide"}</span></div>}
        </div>
        <div className="study-card-body">
          <div className="study-card-meta">
            <span>{post.category || "General"}</span>
            {post.classLevel && post.classLevel !== "general" && <span>Class {post.classLevel}</span>}
            {post.chapterNumber > 0 && <span>Chapter {post.chapterNumber}</span>}
          </div>
          <h3>{post.title}</h3>
          {post.subtitle && <p className="study-card-excerpt">{post.subtitle}</p>}
          <div className="study-card-footer">
            <span>Read article <ArrowRight size={16} aria-hidden="true" /></span>
            {post.readingMinutes > 0 && <span className="study-card-time">{post.readingMinutes} min read</span>}
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function Blogs() {
  useEffect(() => { document.title = "Blogs & study guides · ShikshaCom"; }, []);
  const [params, setParams] = useSearchParams();
  const paramsRef = useRef(params);
  useEffect(() => { paramsRef.current = params; }, [params]);
  // React Router's search-param callbacks do not queue like React state.
  // Merge rapid changes against the latest intended URL, not a stale render.
  const updateParams = useCallback((mutate, options) => {
    const next = new URLSearchParams(paramsRef.current);
    mutate(next);
    paramsRef.current = next;
    setParams(next, options);
  }, [setParams]);
  const { q, subject, class_level, page } = blogFilters(params);
  const [search, setSearch] = useState(q);
  const [result, setResult] = useState({ items: [], count: 0, hasNext: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const resultsRef = useRef(null);
  const queryKey = JSON.stringify([q, subject, class_level, page]);
  const [loadedKey, setLoadedKey] = useState("");
  const pending = loading || queryKey !== loadedKey;
  const filtered = Boolean(q || subject || class_level);

  useEffect(() => { setSearch(q); }, [q]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim() === q) return;
      updateParams((next) => {
        if (search.trim()) next.set("q", search.trim()); else next.delete("q");
        next.delete("page");
      }, { replace: true });
    }, 300);
    return () => clearTimeout(timer);
  }, [search, q, updateParams]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    getBlogCardsPage({ q, subject, class_level, page }, { signal: controller.signal })
      .then((data) => { if (!controller.signal.aborted) setResult(data); })
      .catch((failure) => {
        if (controller.signal.aborted) return;
        setError(failure.response?.status === 404
          ? "This results page is no longer available. Return to the first page to continue."
          : "We couldn’t load the articles. Check your connection and try again.");
      })
      .finally(() => {
        if (!controller.signal.aborted) { setLoading(false); setLoadedKey(queryKey); }
      });
    return () => controller.abort();
  }, [q, subject, class_level, page, queryKey, retry]);

  function updateFilter(name, value) {
    updateParams((next) => {
      if (value) next.set(name, value); else next.delete(name);
      next.delete("page");
    });
  }

  function reset() {
    setSearch("");
    paramsRef.current = new URLSearchParams();
    setParams({});
  }

  function changePage(nextPage) {
    updateParams((next) => {
      if (nextPage > 1) next.set("page", String(nextPage)); else next.delete("page");
    });
    resultsRef.current?.focus({ preventScroll: true });
    resultsRef.current?.scrollIntoView({ block: "start" });
  }

  return (
    <main className="blogs-list-page">
      <header className="blogs-list-header">
        <span className="blogs-list-badge"><BookOpen size={16} aria-hidden="true" /> ShikshaCom blogs</span>
        <h1>Make your next chapter clearer.</h1>
        <p>Explore chapter notes and explainers in science, social science and more. Choose a subject or class to find what you need.</p>
      </header>

      <section className="blogs-filters" aria-label="Find articles">
        <div className="blogs-search-field">
          <label htmlFor="blogs-search">Search articles</label>
          <div className="blogs-search-box">
            <Search size={19} aria-hidden="true" />
            <input id="blogs-search" type="search" autoComplete="off" maxLength={200}
              placeholder="Try motion, rivers or democracy" value={search}
              onChange={(event) => setSearch(event.target.value)} />
            {search && <button type="button" className="blogs-clear-search" aria-label="Clear article search" onClick={() => setSearch("")}><X size={18} aria-hidden="true" /></button>}
          </div>
        </div>
        <div className="blogs-filter-field">
          <label htmlFor="blogs-subject">Subject</label>
          <select id="blogs-subject" value={subject} onChange={(event) => updateFilter("subject", event.target.value)}>
            <option value="">All subjects</option>
            {BLOG_SUBJECTS.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
          </select>
        </div>
        <div className="blogs-filter-field">
          <label htmlFor="blogs-class">Class</label>
          <select id="blogs-class" value={class_level} onChange={(event) => updateFilter("class_level", event.target.value)}>
            <option value="">All classes</option>
            {BLOG_CLASSES.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
          </select>
        </div>
        {filtered && <button type="button" className="blogs-reset" onClick={reset}>Clear filters</button>}
      </section>

      <section className="blogs-results" aria-labelledby="blogs-results-heading" aria-busy={pending}>
        <div className="blogs-results-bar">
          <h2 id="blogs-results-heading" ref={resultsRef} tabIndex={-1}>{filtered ? "Matching articles" : "Explore the articles"}</h2>
          <p role="status">{pending ? "Finding articles…" : error ? "Articles unavailable" : `${result.count} article${result.count === 1 ? "" : "s"}${q ? ` for “${q}”` : ""}`}</p>
        </div>
        {pending ? (
          <div className="study-grid" aria-hidden="true">{Array.from({ length: 6 }, (_, index) => <div className="study-card study-card-skeleton" key={index}><div /><span /><span /></div>)}</div>
        ) : error ? (
          <div className="blogs-state" role="alert"><BookOpen size={28} aria-hidden="true" /><h3>Let’s try that again</h3><p>{error}</p>
            <button type="button" onClick={() => page > 1 ? changePage(1) : setRetry((value) => value + 1)}>{page > 1 ? "Return to first page" : "Try again"}</button>
          </div>
        ) : result.items.length ? (
          <>
            <div className="study-grid">{result.items.map((post, index) => <StudyCard key={post.id} post={post} priority={index === 0} />)}</div>
            {result.count > BLOG_PAGE_SIZE && <nav className="blogs-pagination" aria-label="Article pages">
              <button type="button" disabled={page <= 1} onClick={() => changePage(page - 1)}><ArrowLeft size={17} aria-hidden="true" /> Previous</button>
              <span>Page {page} of {Math.ceil(result.count / BLOG_PAGE_SIZE)}</span>
              <button type="button" disabled={!result.hasNext} onClick={() => changePage(page + 1)}>Next <ArrowRight size={17} aria-hidden="true" /></button>
            </nav>}
          </>
        ) : (
          <div className="blogs-state"><Search size={28} aria-hidden="true" /><h3>{filtered ? "No articles match these filters" : "New articles are on their way"}</h3><p>{filtered ? "Try a shorter search or choose another subject or class." : "Check back soon for new notes and explainers."}</p>{filtered && <button type="button" onClick={reset}>Show all articles</button>}</div>
        )}
      </section>
    </main>
  );
}
