// ─────────────────────────────────────────────────────────────────────────────
// src/explore/ExploreBrowse.jsx  →  route: /explore/browse
// Search results with a sticky filter sidebar. All state lives in the URL query
// string (?q=&category=&subject=&level=&language=&filetype=&date=&sort=) so
// results are shareable and back/forward works.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { updatedBrowseParams } from "./browseFilters";
import { getFacets, searchDocuments } from "./exploreApi";
import { DocCard, Icon, Loading } from "./components/ui";
import "./Explore.css";

const FIELDS = [
  ["category", "Type"],
  ["subject", "Main subject"],
  ["topic", "Subcategory"],
  ["level", "Level"],
  ["language", "Language"],
  ["filetype", "File type"],
  ["date", "Date"],
];

export default function ExploreBrowse() {
  const [params, setParams] = useSearchParams();
  const [facets, setFacets] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  // `res === null` means "nothing has ever loaded" — the ONLY state that shows
  // the spinner. Once results exist they stay mounted across every subsequent
  // filter change (see `busy` below), so `.exp-in`'s fade+slide plays exactly
  // once per visit instead of replaying on each dropdown/chip/sort change, and
  // the page height never collapses to the spinner and back.
  const [res, setRes] = useState(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [facetError, setFacetError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    getFacets().then((data) => { if (alive) { setFacets(data); setFacetError(""); } })
      .catch(() => alive && setFacetError("Subject options couldn’t load. Search still works; try loading the filters again."));
    return () => { alive = false; };
  }, [attempt]);

  // read current filters from the URL
  const filters = {
    q: params.get("q") || "",
    category: params.get("category") || "All",
    subject: params.get("subject") || "All",
    topic: params.get("topic") || "All",
    page: Math.max(1, parseInt(params.get("page") || "1", 10) || 1),
    page_size: 24,
    level: params.get("level") || "All",
    language: params.get("language") || "All",
    filetype: params.get("filetype") || "All",
    date: params.get("date") || "Any time",
    sort: params.get("sort") || "Trending",
  };

  useEffect(() => {
    setBusy(true);
    setError("");
    let alive = true;
    searchDocuments(filters)
      .then((r) => { if (alive) { setRes(r); setBusy(false); } })
      .catch(() => { if (alive) { setError("Couldn’t load these documents. Please try again."); setBusy(false); } });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, attempt]);

  const setField = (key, value) => {
    setParams((current) => updatedBrowseParams(current, key, value), { replace: true });
  };

  const clearAll = () => setParams(new URLSearchParams(), { replace: true });

  // option list for a field, translating category keys<->names
  const optionsFor = (key) => {
    if (!facets) return [];
    if (key === "category") return facets.categories.map((c) => ({ value: c.key, label: c.name }));
    const group = facets.subjectGroups?.find((g) => g.subject.toLowerCase() === filters.subject.toLowerCase());
    const map = { topic: group?.topics, subject: facets.subjects, level: facets.levels, language: facets.languages, filetype: facets.filetypes, date: facets.dateRanges };
    const defaultValue = key === "date" ? "Any time" : "All";
    const values = (map[key] || []).filter((v) => v !== defaultValue);
    const selected = filters[key];
    if (selected && selected !== defaultValue && !values.includes(selected)) values.push(selected);
    return [...new Set(values)].map((v) => ({ value: v, label: v }));
  };

  // active (non-default) chips
  const activeChips = FIELDS
    .map(([key]) => {
      const v = filters[key];
      if (v === (key === "date" ? "Any time" : "All")) return null;
      const label = key === "category"
        ? (facets?.categories.find((c) => c.key === v)?.name || v) : v;
      return { key, label };
    })
    .filter(Boolean);
  if (filters.q) activeChips.unshift({ key: "q", label: `“${filters.q}”` });

  const title = filters.q ? `Results for “${filters.q}”`
    : filters.category !== "All"
      ? (facets?.categories.find((c) => c.key === filters.category)?.name || "Browse")
      : "Browse all documents";

  return (
    <div className="exp">
      <div className="exp-wrap exp-browse">
          <form className="exp-searchbar exp-browse-search" role="search" onSubmit={(e) => {
            e.preventDefault();
            setField("q", String(new FormData(e.currentTarget).get("q") || "").trim());
          }}>
            <label className="exp-search-label" htmlFor="browse-query">Search the library</label>
            <input id="browse-query" name="q" type="search" maxLength={300} key={filters.q} defaultValue={filters.q} placeholder="Titles, subjects, subcategories or tags" />
            <button className="exp-btn exp-btn-primary" type="submit">Search</button>
          </form>
        <button type="button" className="exp-btn exp-btn-ghost exp-mobile-filter-toggle" aria-controls="browse-filters" aria-expanded={filtersOpen} onClick={() => setFiltersOpen((open) => !open)}>
          {filtersOpen ? "Hide filters" : "Show filters"}
        </button>
        {/* sidebar */}
        <aside id="browse-filters" className={`exp-filters exp-scroll${filtersOpen ? " is-open" : ""}`} data-tour="explore-browse.filters">
          <div className="exp-fgroup" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong style={{ font: "800 15px Montserrat, sans-serif", color: "var(--forest)" }}>Filters</strong>
            {activeChips.length > 0 && <button className="exp-clear" onClick={clearAll}>Clear all</button>}
          </div>
          <div className="exp-fgroup">
            <label htmlFor="browse-sort">Sort by</label>
            <select id="browse-sort" className="exp-select" value={filters.sort} onChange={(e) => setField("sort", e.target.value)}>
              {(facets?.sorts || ["Trending"]).map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {facetError && <div className="exp-facet-error" role="alert"><p>{facetError}</p><button className="exp-clear" onClick={() => setAttempt((n) => n + 1)}>Reload filters</button></div>}
          {FIELDS.map(([key, label]) => (
            <div className="exp-fgroup" key={key}>
              <label htmlFor={`browse-${key}`}>{label}</label>
              <select
                id={`browse-${key}`}
                className="exp-select"
                disabled={key === "topic" && filters.subject === "All"}
                value={filters[key]}
                onChange={(e) => setField(key, e.target.value)}
              >
                <option value={key === "date" ? "Any time" : "All"}>{key === "date" ? "Any time" : "All"}</option>
                {optionsFor(key).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              {key === "topic" && <p className="exp-filter-hint">{filters.subject === "All" ? "Choose a main subject first." : "Narrow this subject by a specific topic."}</p>}
            </div>
          ))}
        </aside>

        {/* results */}
        <main>
          <div className="exp-results-head">
            <div>
              <h1>{title}</h1>
              {res && <div className="exp-count">{res.count} {res.count === 1 ? "document" : "documents"} found</div>}
            </div>
            {/* "Back to Explore" removed — the toolbar's Home link one row
                above goes to the same place, and a second button for it on the
                right of the results header competed with the result count. */}
          </div>

          {activeChips.length > 0 && (
            <div className="exp-activechips">
              {activeChips.map((c) => (
                <button key={c.key} className="exp-achip"
                  onClick={() => setField(c.key, c.key === "date" ? "Any time" : c.key === "q" ? "" : "All")}>
                  {c.label} <Icon.x />
                </button>
              ))}
            </div>
          )}

          {error && <div className="exp-empty" role="alert"><p>{error}</p><button className="exp-btn exp-btn-ghost" onClick={() => setAttempt((n) => n + 1)}>Try again</button></div>}
          {res === null ? (!error && <Loading />) : (
            /* `.exp-in` sits on this wrapper, which mounts once (the first time
               results arrive) and is never unmounted again — that is what stops
               the entry animation replaying per filter change. The dim lives on
               the inner node; see Explore.css for why it can't share the
               animated one. */
            <div className="exp-in">
              <div className={`exp-results-body${busy ? " is-busy" : ""}`} aria-busy={busy}>
                {res.count > 0 ? (
                  <>
                    <div className="exp-docgrid">
                      {res.results.map((d) => <DocCard key={d.id} doc={d} />)}
                    </div>
                    {res.count > filters.page_size && <nav className="exp-pagination" aria-label="Document result pages">
                      <button className="exp-btn exp-btn-ghost" disabled={busy || filters.page <= 1} onClick={() => setField("page", String(filters.page - 1))}>Previous</button>
                      <span role="status">Page {filters.page} of {Math.ceil(res.count / filters.page_size)}</span>
                      <button className="exp-btn exp-btn-ghost" disabled={busy || filters.page * filters.page_size >= res.count} onClick={() => setField("page", String(filters.page + 1))}>Next</button>
                    </nav>}
                  </>
                ) : (
                  <div className="exp-empty">
                    {activeChips.length > 0 ? (
                      <>
                        <h3>No documents match those filters</h3>
                        <p>Try removing a filter or searching a broader term.</p>
                        <button className="exp-btn exp-btn-primary" style={{ marginTop: 16 }} onClick={clearAll}>Clear filters</button>
                      </>
                    ) : (
                      <>
                        <h3>No documents yet</h3>
                        <p>Check back soon — the library is still being stocked.</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
