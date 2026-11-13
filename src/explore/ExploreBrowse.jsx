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
import { useAuth } from "../contexts/AuthContext";
import { verificationEnabled } from "./verificationApi";
import "./Explore.css";
import "./Verification.css";

// shiksha-backend/docs/EXPLORE_VERIFICATION.md §9. A single-select chip row above the
// results, shown only while the feature is on. "Needs my review" is the
// viewer's own queue, so it is omitted for a signed-out visitor rather than
// shown and then returning nothing.
/* shiksha-backend/docs/EXPLORE_VERIFICATION.md §6 — the three stacked chip rows.
   A row per level, every chip carrying a count including zero, narrowing as
   you pick. This replaces the Main subject / Subcategory dropdowns, which
   had no top level, no counts, and showed nothing until opened.

   ⚠ It reads `fieldGroups` (DocumentTopic) rather than `subjectGroups` (the
   flat Document.subject/topic columns). A set carries SEVERAL tag paths and
   only the table knows them all. */
function FieldBrowser({ tree, filters, onPick }) {
  if (!tree?.length) return null;

  const field = tree.find((f) => f.field === filters.field);
  const subject = field?.subjects.find((s) => s.subject === filters.tsubject);

  const Row = ({ label, items, active, onChoose }) => (
    <div className="exp-fbrow">
      <p className="exp-fblabel">{label}</p>
      <div className="exp-fbchips">
        {items.map((it) => (
          <button key={it.key} type="button"
            className={`exp-fbchip${active === it.key ? " on" : ""}`}
            aria-pressed={active === it.key}
            onClick={() => onChoose(active === it.key ? "" : it.key)}>
            {it.key} <span className="exp-fbcount">{it.count}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="exp-fieldbrowser">
      <Row
        label="Field"
        active={filters.field}
        items={tree.map((f) => ({ key: f.field, count: f.count }))}
        onChoose={(v) => onPick("field", v)}
      />
      {field && (
        <Row
          label={`Subject in ${field.field}`}
          active={filters.tsubject}
          items={field.subjects.map((sub) => ({ key: sub.subject, count: sub.count }))}
          onChoose={(v) => onPick("tsubject", v)}
        />
      )}
      {subject && subject.branches.length > 0 && (
        <Row
          label={`Branch of ${subject.subject}`}
          active={filters.branch}
          items={subject.branches.map((b) => ({ key: b.branch, count: b.count }))}
          onChoose={(v) => onPick("branch", v)}
        />
      )}
    </div>
  );
}

const FILE_KIND_CHIPS = [
  { value: "all", label: "All files" },
  { value: "documents", label: "Documents" },
  { value: "slides", label: "Slides" },
  { value: "data", label: "Data" },
  { value: "images", label: "Images" },
  { value: "av", label: "Audio and video" },
  { value: "other", label: "Other" },
];

const STATUS_CHIPS = [
  { value: "any", label: "Any status" },
  { value: "verified", label: "Verified" },
  { value: "unverified", label: "Unverified" },
  { value: "needs_my_review", label: "Needs my review", authOnly: true },
];

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
  const { isAuthenticated } = useAuth();
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
  const [verifyOn, setVerifyOn] = useState(false);

  useEffect(() => {
    let live = true;
    verificationEnabled().then((on) => live && setVerifyOn(on));
    return () => { live = false; };
  }, []);

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
    status: params.get("status") || "any",
    field: params.get("field") || "",
    tsubject: params.get("tsubject") || "",
    branch: params.get("branch") || "",
    filekind: params.get("filekind") || "all",
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

          <FieldBrowser
            tree={facets?.fieldGroups}
            filters={filters}
            onPick={setField}
          />

          {(filters.field || filters.tsubject) && (
            <h2 className="exp-fbheading">
              {filters.field}
              {filters.tsubject && <> › {filters.tsubject}</>}
              {filters.branch && <> › {filters.branch}</>}
            </h2>
          )}

          {verifyOn && (
            <div className="vf-statusrow" role="group" aria-label="File type">
              {FILE_KIND_CHIPS.map((c) => (
                <button key={c.value} type="button"
                  className={`vf-chip${filters.filekind === c.value ? " on" : ""}`}
                  aria-pressed={filters.filekind === c.value}
                  onClick={() => setField("filekind", c.value === "all" ? "" : c.value)}>
                  {c.label}
                </button>
              ))}
            </div>
          )}

          {/* shiksha-backend/docs/EXPLORE_VERIFICATION.md §9. Its own sibling block,
              NOT nested in the active-chips conditional below — the status row
              is a control and has to stay on screen when no filter is
              applied, which is exactly when someone reaches for it. */}
          {verifyOn && (
            <div className="vf-statusrow" role="group" aria-label="Verification status">
              {STATUS_CHIPS.filter((c) => !c.authOnly || isAuthenticated).map((c) => (
                <button
                  key={c.value}
                  type="button"
                  className={`vf-chip${filters.status === c.value ? " on" : ""}`}
                  aria-pressed={filters.status === c.value}
                  onClick={() => setField("status", c.value === "any" ? "" : c.value)}
                >{c.label}</button>
              ))}
            </div>
          )}

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
