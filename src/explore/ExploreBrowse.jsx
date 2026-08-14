// ─────────────────────────────────────────────────────────────────────────────
// src/explore/ExploreBrowse.jsx  →  route: /explore/browse
// Search results with a sticky filter sidebar. All state lives in the URL query
// string (?q=&category=&subject=&level=&language=&filetype=&date=&sort=) so
// results are shareable and back/forward works.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getFacets, searchDocuments } from "./exploreApi";
import { DocCard, Icon, Loading } from "./components/ui";
import "./Explore.css";

const FIELDS = [
  ["category", "Type"],
  ["subject", "Subject"],
  ["level", "Level"],
  ["language", "Language"],
  ["filetype", "File type"],
  ["date", "Date"],
];

export default function ExploreBrowse() {
  const [params, setParams] = useSearchParams();
  const nav = useNavigate();
  const [facets, setFacets] = useState(null);
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { getFacets().then(setFacets); }, []);

  // read current filters from the URL
  const filters = {
    q: params.get("q") || "",
    category: params.get("category") || "All",
    subject: params.get("subject") || "All",
    level: params.get("level") || "All",
    language: params.get("language") || "All",
    filetype: params.get("filetype") || "All",
    date: params.get("date") || "Any time",
    sort: params.get("sort") || "Trending",
  };

  useEffect(() => {
    setLoading(true);
    let alive = true;
    searchDocuments(filters).then((r) => { if (alive) { setRes(r); setLoading(false); } });
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const setField = (key, value) => {
    const next = new URLSearchParams(params);
    const isDefault = value === "All" || value === "Any time" || value === "";
    if (isDefault) next.delete(key); else next.set(key, value);
    setParams(next, { replace: true });
  };

  const clearAll = () => setParams(new URLSearchParams(), { replace: true });

  // option list for a field, translating category keys<->names
  const optionsFor = (key) => {
    if (!facets) return [];
    if (key === "category") return facets.categories.map((c) => ({ value: c.key, label: c.name }));
    const map = { subject: facets.subjects, level: facets.levels, language: facets.languages, filetype: facets.filetypes, date: facets.dateRanges };
    return (map[key] || []).map((v) => ({ value: v, label: v }));
  };

  // active (non-default) chips
  const activeChips = FIELDS
    .map(([key]) => {
      const v = filters[key];
      if (v === "All" || v === "Any time") return null;
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
        {/* sidebar */}
        <aside className="exp-filters exp-scroll">
          <div className="exp-fgroup" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong style={{ font: "800 15px Montserrat, sans-serif", color: "var(--forest)" }}>Filters</strong>
            {activeChips.length > 0 && <button className="exp-clear" onClick={clearAll}>Clear all</button>}
          </div>
          <div className="exp-fgroup">
            <label>Sort by</label>
            <select className="exp-select" value={filters.sort} onChange={(e) => setField("sort", e.target.value)}>
              {(facets?.sorts || ["Trending"]).map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {FIELDS.map(([key, label]) => (
            <div className="exp-fgroup" key={key}>
              <label>{label}</label>
              <select
                className="exp-select"
                value={filters[key]}
                onChange={(e) => setField(key, e.target.value)}
              >
                <option value={key === "date" ? "Any time" : "All"}>{key === "date" ? "Any time" : "All"}</option>
                {optionsFor(key).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
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
            <button className="exp-btn exp-btn-ghost" onClick={() => nav("/explore")}><Icon.back /> Back to Explore</button>
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

          {loading ? <Loading />
            : res && res.count > 0 ? (
              <div className="exp-docgrid exp-in">
                {res.results.map((d) => <DocCard key={d.id} doc={d} />)}
              </div>
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
        </main>
      </div>
    </div>
  );
}
