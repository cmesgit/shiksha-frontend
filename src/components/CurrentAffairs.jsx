// Public Current Affairs — the CMS's own posts, plus a live news wire.
//
// History matters here, because this page has now been wrong in both
// directions:
//
//  1. It originally fetched ONLY `/news/top-headlines/`, a third-party news
//     proxy unrelated to the CMS. Everything an admin wrote in
//     Admin-dashboard → Content → Current Affairs was invisible on the site —
//     `getCurrentAffairs()` existed in contentApi.js with ZERO callers.
//  2. Fixing that switched it to fetch ONLY the CMS. But production has never
//     had a single current-affairs row published, so the live page became a
//     permanent "No current affairs have been published yet" — a dead link in
//     the Resources menu.
//
// So it reads both. The CMS's editorial posts lead, because they are written
// for exams and are what the team controls; the wire fills in underneath so
// the page is never empty.
//
//  3. The wire used to be UNMOUNTED the moment any filter or search was
//     active, on the reasoning that unfiltered wire articles under a filter
//     would look broken. With an empty CMS that inverted: every category chip
//     and every search emptied the page and printed "No current affairs match
//     these filters" — which was false. Nothing had been filtered out; there
//     was nothing to filter. Searching "Nvidia" removed the visible CNBC
//     headline containing "Nvidia".
//
// The wire is now filtered alongside the CMS instead of hidden. Search and
// month both apply to it, because a wire article carries a title, a
// description and a publishedAt. CATEGORY does not: the news proxy stamps
// every article `"General"` (news/views.py), so there is no real category to
// match on. Rather than silently return nothing, the section says out loud
// that the category chips cover ShikshaCom's own briefs only.
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentAffairs } from "../api/contentApi";
import { getTopHeadlines } from "../api/newsApi";
import {
  formatSiteDate, formatSiteDateTime, siteMonthKey, toDateTimeAttr,
} from "../utils/siteDate";
import ScribbleIcon from "./icons/ScribbleIcon";
import { HeroDeco, HeroVisual } from "./hero/HeroLook";
import { CurrentAffairsArt } from "./hero/HeroArt";
import "../css/CurrentAffairs.css";

// Mirrors AffairCategory in content/models.py. Kept as an explicit list
// rather than derived from the rows so the filter bar is stable while
// results change, and so an empty category still shows as a chip.
const CATEGORIES = [
  ["", "All"],
  ["national", "National"],
  ["international", "International"],
  ["economy", "Economy"],
  ["polity", "Polity & Governance"],
  ["science-tech", "Science & Technology"],
  ["environment", "Environment"],
  ["sports", "Sports"],
  ["awards", "Awards & Persons"],
  ["misc", "Miscellaneous"],
];

// `toLocaleDateString("en-IN", …)` without a `timeZone` sets the locale but
// resolves the calendar day in the READER's zone, so a headline published in
// NZDT showed as the previous day for anyone west of it — the 1News card that
// read "12 November" while its own URL said /2026/11/13/. formatSiteDate pins
// the day to the site's timezone instead. See utils/siteDate.js.
const fmtDate = formatSiteDate;

const CurrentAffairs = () => {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [wire, setWire] = useState([]);
  const [wireFetchedAt, setWireFetchedAt] = useState(null);
  const [wireLoading, setWireLoading] = useState(true);

  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");
  const [q, setQ] = useState("");
  // Debounced copy of `q`, so typing doesn't fire a request per keystroke.
  const [queryTerm, setQueryTerm] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setQueryTerm(q.trim()), 300);
    return () => clearTimeout(t);
  }, [q]);

  // Any filter change restarts paging — otherwise page 3 of the old filter
  // would be requested against the new one and silently return nothing.
  useEffect(() => { setPage(1); }, [category, month, queryTerm]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    const params = { page };
    if (category) params.category = category;
    if (month) params.month = month;
    if (queryTerm) params.q = queryTerm;

    const { items: rows, next, count: total } = await getCurrentAffairs(params);
    // getCurrentAffairs swallows failures into an empty envelope, so an
    // empty first page is ambiguous. Treat it as "nothing published /
    // nothing matched" and let the empty state speak — a red error box on a
    // genuinely empty CMS would be worse than a quiet one.
    setItems((prev) => (page === 1 ? rows : [...prev, ...rows]));
    setHasMore(!!next);
    setCount(total);
    setLoading(false);
  }, [page, category, month, queryTerm]);

  useEffect(() => { load(); }, [load]);

  // Fetched once on mount, independently of the CMS list: the wire has no
  // filters and no paging, and it must not be refetched every time someone
  // types in the search box.
  useEffect(() => {
    let alive = true;
    getTopHeadlines({ max: 9 })
      .then((res) => {
        if (!alive) return;
        setWire(res.articles);
        setWireFetchedAt(res.fetchedAt);
      })
      .finally(() => { if (alive) setWireLoading(false); });
    return () => { alive = false; };
  }, []);

  const filtersActive = !!(category || month || queryTerm);

  // The wire is filtered client-side on the two fields it actually carries.
  // There is no request to make: `getTopHeadlines` returns the whole set of
  // nine on mount, so matching here is both cheaper and more honest than
  // asking the CMS a question the wire can't answer.
  const wireShown = useMemo(() => {
    let rows = wire;
    const needle = queryTerm.toLowerCase();
    if (needle) {
      rows = rows.filter((a) =>
        `${a.title || ""} ${a.description || ""} ${a.source || ""}`
          .toLowerCase().includes(needle));
    }
    if (month) rows = rows.filter((a) => siteMonthKey(a.publishedAt) === month);
    return rows;
  }, [wire, queryTerm, month]);

  const showWire = !wireLoading && wireShown.length > 0;
  // A category chip narrows the CMS briefs only — the wire has no category to
  // match. Worth saying when both a category and the wire are on screen,
  // otherwise the unchanged headline list reads as the chip doing nothing.
  const categoryLabel = CATEGORIES.find(([v]) => v === category)?.[1] || "";
  const wireIgnoresCategory = !!category && showWire;

  return (
    <div className="ca-page hl-scope">
      {/* Same hero look as the forum, blogs, Explore and quizzes. */}
      <header className="fh-hero">
        <HeroDeco />
        <div className="fh-wrap">
          <div className="fh-body">
            <span className="fh-badge"><i />Current affairs</span>
            <h1 className="fh-title">
              <span className="fh-lead">Stay exam-ready,</span>
              <span className="fh-punch">every day.</span>
            </h1>
            <p className="fh-sub">
              Exam-focused daily current affairs, written and curated by the ShikshaCom team.
            </p>
            <form className="fh-search" role="search" onSubmit={(e) => { e.preventDefault(); setQueryTerm(q.trim()); }}>
              <ScribbleIcon name="search" size={17} aria-hidden="true" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search current affairs…"
                aria-label="Search current affairs"
              />
              <button type="submit">Search</button>
            </form>
          </div>
          <HeroVisual art={<CurrentAffairsArt />} />
        </div>
      </header>

    <div className="current-affairs-page">
      <div className="ca-filters">
        <div className="ca-chips">
          {CATEGORIES.map(([value, label]) => (
            <button
              key={value || "all"}
              type="button"
              className={`ca-chip${category === value ? " ca-chip--active" : ""}`}
              onClick={() => setCategory(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="ca-filterRow">
          <label className="ca-monthLabel" htmlFor="ca-month">Month</label>
          <input
            id="ca-month"
            className="ca-month"
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            aria-label="Filter by month"
          />
          {filtersActive && (
            <button
              type="button"
              className="ca-clear"
              onClick={() => { setCategory(""); setMonth(""); setQ(""); }}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {loading && page === 1 ? (
        <div className="loading"><p>Loading current affairs…</p></div>
      ) : error ? (
        <div className="error">
          <p>Failed to load current affairs. Please try again later.</p>
          <button onClick={load} className="retry-btn">Retry</button>
        </div>
      ) : items.length === 0 ? (
        /* Three genuinely different situations, which the old single message
           ("No current affairs match these filters") collapsed into one. The
           damaging case was the middle one: with an empty CMS, that sentence
           claimed a filter had excluded something when nothing existed to
           exclude — and the headlines that DID match were hidden at the same
           time. The wire below now carries the page in every case. */
        <div className="empty-state">
          <p>
            {showWire
              ? filtersActive
                ? "No written brief matches that yet — here are the matching headlines."
                : "The ShikshaCom team hasn't published a written brief yet — here are today's headlines."
              : filtersActive
                ? "Nothing matches that — not in our briefs, and not in today's headlines."
                : "No current affairs have been published yet. Check back soon."}
          </p>
        </div>
      ) : (
        <>
          <p className="ca-count">
            {count} {count === 1 ? "article" : "articles"}
          </p>

          <div className="ca-list">
            {items.map((a) => (
              <article key={a.id} className="ca-card">
                <div className="ca-cardMeta">
                  <span className="ca-cat">{a.category_label || a.category}</span>
                  <span className="ca-date">{fmtDate(a.affair_date)}</span>
                </div>

                <h2 className="ca-cardTitle">
                  <Link to={`/current-affairs/${a.slug}`}>{a.title}</Link>
                </h2>

                {a.summary && <p className="ca-summary">{a.summary}</p>}

                <div className="ca-cardFoot">
                  {a.tags?.length > 0 && (
                    <span className="ca-tags">
                      {a.tags.map((t) => (
                        <span key={typeof t === "string" ? t : t.slug || t.name} className="ca-tag">
                          {typeof t === "string" ? t : t.name}
                        </span>
                      ))}
                    </span>
                  )}
                  {a.source_name && <span className="ca-source">Source: {a.source_name}</span>}
                  <Link to={`/current-affairs/${a.slug}`} className="read-more-link">
                    Read more
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {hasMore && (
            <div className="ca-more">
              <button
                type="button"
                className="ca-moreBtn"
                disabled={loading}
                onClick={() => setPage((p) => p + 1)}
              >
                {loading ? "Loading…" : "Load more"}
              </button>
            </div>
          )}
        </>
      )}

      {showWire && (
        <section className="ca-wire">
          <div className="ca-wireHead">
            <h2>
              {queryTerm || month ? "Matching headlines" : "In the news today"}
            </h2>
            <p>
              {/* The page used to assert "updated through the day" with
                  nothing behind it, over a response the backend caches for
                  30 minutes. Now it either states when the wire was last
                  pulled, or says nothing about freshness at all — an older
                  backend sends no fetchedAt, and an unverifiable claim is
                  worse than no claim. */}
              Live headlines from the news wire. These are not written by
              ShikshaCom.
              {wireFetchedAt && (
                <> Last pulled{" "}
                  <time dateTime={toDateTimeAttr(wireFetchedAt)}>
                    {formatSiteDateTime(wireFetchedAt)}
                  </time>.
                </>
              )}
              {wireIgnoresCategory && (
                <> The <b>{categoryLabel}</b> filter applies to ShikshaCom’s own
                briefs — wire headlines aren’t sorted into these categories.</>
              )}
            </p>
          </div>

          <div className="ca-wireList">
            {wireShown.map((a) => (
              /* Keyed on the article URL — the wire has no ids, and titles do
                 repeat across syndicated copies of the same story. */
              <article key={a.url} className="ca-wireCard">
                {a.image && (
                  <img
                    className="ca-wireImg"
                    src={a.image}
                    alt=""
                    loading="lazy"
                    /* A dead image host would otherwise leave a broken-image
                       glyph in the middle of the card. */
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                )}
                <div className="ca-wireBody">
                  <div className="ca-cardMeta">
                    {a.source && <span className="ca-cat">{a.source}</span>}
                    <span className="ca-date">{fmtDate(a.publishedAt)}</span>
                  </div>
                  <h3 className="ca-wireTitle">
                    {/* External by definition — a real anchor, opened in a new
                        tab so the reader keeps their place in the list. */}
                    <a href={a.url} target="_blank" rel="noopener noreferrer">
                      {a.title}
                    </a>
                  </h3>
                  {a.description && <p className="ca-summary">{a.description}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
    </div>
  );
};

export default CurrentAffairs;
