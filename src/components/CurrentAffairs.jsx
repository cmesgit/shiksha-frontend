// Public Current Affairs — the CMS's own posts.
//
// This page used to fetch `/news/top-headlines/`, a third-party news proxy
// entirely unrelated to the CMS. The result was that everything an admin
// wrote in Admin-dashboard → Content → Current Affairs was invisible on the
// site: `getCurrentAffairs()` existed in contentApi.js but had ZERO callers
// anywhere in any repo. The backend (model, publish workflow, list/detail
// endpoints, filters) was complete and correct the whole time — only the
// consumer was missing.
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentAffairs } from "../api/contentApi";
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

const fmtDate = (d) => {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
    });
  } catch {
    return d;
  }
};

const CurrentAffairs = () => {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  const filtersActive = !!(category || month || queryTerm);

  return (
    <div className="current-affairs-page">
      <h1>Current Affairs</h1>
      <p className="page-description">
        Exam-focused daily current affairs, written and curated by the ShikshaCom team.
      </p>

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
          <input
            className="ca-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search current affairs…"
            aria-label="Search current affairs"
          />
          <input
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
        <div className="empty-state">
          <p>
            {filtersActive
              ? "No current affairs match these filters."
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
    </div>
  );
};

export default CurrentAffairs;
