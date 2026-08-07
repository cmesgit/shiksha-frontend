// PLACEMENT: src/counselling/LibraryPage.jsx   (landing/frontend app)
// Workflow: "Browse Library" — all ten guides, filterable by stage + topic.
//
// Facet options are DERIVED from the fetched index (stage/stageLabel/
// stageOrder, specializations), not hardcoded — same reasoning as before:
// a hardcoded FILTERS literal breaks the moment a label is reworded or a
// new stage/topic is added. Both facets are multi-select (91mobile-style
// filter rail: collapsible groups, checkboxes, active-filter chips,
// clear-all) rather than the old single-select stage chip row.

import React, { useEffect, useMemo, useState } from "react";
import CounsellingShell from "./CounsellingShell";
import { getGuideIndex, toGuideCard } from "../api/guidesApi";
import { GuideCard } from "./LandingPage";

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(20,32,26,.45)" strokeWidth="2.4" strokeLinecap="round">
    <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
  </svg>
);

function FilterGroup({ title, options, selected, onToggle }) {
  const [open, setOpen] = useState(true);
  if (!options.length) return null;
  return (
    <div className="sc-fgroup">
      <button className={`sc-fgroup-head${open ? "" : " closed"}`} onClick={() => setOpen(!open)}>
        {title}
        <ChevronIcon />
      </button>
      {open && (
        <div className="sc-fgroup-body">
          {options.map((o) => (
            <label key={o.key} className="sc-fopt">
              <input type="checkbox" checked={selected.includes(o.key)} onChange={() => onToggle(o.key)} />
              <span>{o.label}</span>
              <em>{o.count}</em>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LibraryPage() {
  const [status, setStatus] = useState("loading");
  const [guides, setGuides] = useState([]);
  const [stageFilters, setStageFilters] = useState([]);
  const [topicFilters, setTopicFilters] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    let mounted = true;
    // getGuideIndex() swallows transport errors into [] (contentApi.js's
    // idiom), so an empty result here can't be told apart from "the API
    // is down" — always land on "ok" and let the empty-state copy below
    // handle a genuinely empty library.
    getGuideIndex().then((cards) => {
      if (!mounted) return;
      setGuides(cards.map(toGuideCard));
      setStatus("ok");
    });
    return () => { mounted = false; };
  }, []);

  const stages = useMemo(() => {
    const seen = new Map();
    guides.forEach((g) => {
      if (!seen.has(g.stage)) seen.set(g.stage, { key: g.stage, label: g.stageLabel, order: g.stageOrder, count: 0 });
      seen.get(g.stage).count += 1;
    });
    return [...seen.values()].sort((a, b) => a.order - b.order);
  }, [guides]);

  const topics = useMemo(() => {
    const seen = new Map();
    guides.forEach((g) => (g.specializations || []).forEach((name) => {
      if (!seen.has(name)) seen.set(name, { key: name, label: name, count: 0 });
      seen.get(name).count += 1;
    }));
    return [...seen.values()].sort((a, b) => a.label.localeCompare(b.label));
  }, [guides]);

  const toggle = (arr, set, key) => set(arr.includes(key) ? arr.filter((x) => x !== key) : [...arr, key]);
  const clearAll = () => { setStageFilters([]); setTopicFilters([]); setQ(""); };

  const shown = useMemo(() => {
    let arr = guides;
    if (stageFilters.length) arr = arr.filter((g) => stageFilters.includes(g.stage));
    if (topicFilters.length) arr = arr.filter((g) => (g.specializations || []).some((s) => topicFilters.includes(s)));
    const needle = q.trim().toLowerCase();
    if (needle) arr = arr.filter((g) => (g.title + g.blurb + g.audience).toLowerCase().includes(needle));
    return arr;
  }, [stageFilters, topicFilters, q, guides]);

  const activeCount = stageFilters.length + topicFilters.length + (q.trim() ? 1 : 0);

  return (
    <CounsellingShell crumb=" / Guides">
      <h1 className="sc-h1">Career Guidance Library</h1>
      <p className="sc-sub">
        Written for Indian students — streams, entrance exams, degrees, and how
        to choose. Free to read, no login needed.
      </p>

      <div className="sc-lib-layout">
        <aside className="sc-rail">
          <div className="sc-railcard">
            <div className="sc-rail-search">
              <SearchIcon />
              <input placeholder="Search guides…" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <div className="sc-filter-scroll">
              <FilterGroup title="Stage" options={stages} selected={stageFilters} onToggle={(k) => toggle(stageFilters, setStageFilters, k)} />
              <FilterGroup title="Topic" options={topics} selected={topicFilters} onToggle={(k) => toggle(topicFilters, setTopicFilters, k)} />
            </div>
          </div>
        </aside>

        <div>
          <div className="sc-active" style={{ justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
              <span className="sc-note" style={{ textTransform: "none", fontWeight: 700 }}>
                {shown.length} guide{shown.length === 1 ? "" : "s"}
              </span>
              {stageFilters.map((k) => {
                const s = stages.find((x) => x.key === k);
                return <button key={k} className="sc-fchip" onClick={() => toggle(stageFilters, setStageFilters, k)}>{s?.label || k} ×</button>;
              })}
              {topicFilters.map((k) => (
                <button key={k} className="sc-fchip" onClick={() => toggle(topicFilters, setTopicFilters, k)}>{k} ×</button>
              ))}
            </div>
            {activeCount > 0 && <button className="sc-filters-clear" onClick={clearAll}>Clear all</button>}
          </div>

          {status === "loading" ? (
            <div className="sc-grid3">{[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="sc-skel" style={{ height: 172 }} />)}</div>
          ) : (
            <div className="sc-grid3">
              {shown.map((g) => <GuideCard key={g.slug} g={g} />)}
              {shown.length === 0 && (
                <div className="sc-empty" style={{ gridColumn: "1/-1" }}>
                  {guides.length === 0 ? "The library is loading — check back in a moment." : "No guides match — try different filters."}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </CounsellingShell>
  );
}
