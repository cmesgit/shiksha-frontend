// PLACEMENT: src/counselling/LibraryPage.jsx   (NEW FILE — landing/frontend app)
// Workflow: "Browse Library" — all ten guides, filterable by stage.
//
// Stage filter chips are DERIVED from the fetched index (stage/stageLabel/
// stageOrder), not hardcoded — the old FILTERS literal + audience.startsWith()
// match broke the moment a label was reworded or a new stage was added
// (exactly what adding the 4 new K-PG guides would have hit).

import React, { useEffect, useMemo, useState } from "react";
import CounsellingShell from "./CounsellingShell";
import { getGuideIndex, toGuideCard } from "../api/guidesApi";
import { GuideCard } from "./LandingPage";

export default function LibraryPage() {
  const [status, setStatus] = useState("loading");
  const [guides, setGuides] = useState([]);
  const [filter, setFilter] = useState("All");
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
    guides.forEach((g) => { if (!seen.has(g.stage)) seen.set(g.stage, { key: g.stage, label: g.stageLabel, order: g.stageOrder }); });
    return [...seen.values()].sort((a, b) => a.order - b.order);
  }, [guides]);

  const shown = useMemo(() => {
    let arr = guides;
    if (filter !== "All") arr = arr.filter((g) => g.stage === filter);
    const needle = q.trim().toLowerCase();
    if (needle) arr = arr.filter((g) => (g.title + g.blurb + g.audience).toLowerCase().includes(needle));
    return arr;
  }, [filter, q, guides]);

  return (
    <CounsellingShell crumb=" / Guides">
      <h1 className="sc-h1">Career Guidance Library</h1>
      <p className="sc-sub">
        Written for Indian students — streams, entrance exams, degrees, and how
        to choose. Free to read, no login needed.
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        <button className={`sc-chip${filter === "All" ? " on" : ""}`} onClick={() => setFilter("All")}>All</button>
        {stages.map((s) => (
          <button key={s.key} className={`sc-chip${filter === s.key ? " on" : ""}`} onClick={() => setFilter(s.key)}>{s.label}</button>
        ))}
      </div>
      <div className="sc-search" style={{ marginTop: 6, marginBottom: 22 }}>
        <input placeholder="Search guides…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      {status === "loading" ? (
        <div className="sc-grid3">{[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="sc-skel" style={{ height: 150 }} />)}</div>
      ) : (
        <div className="sc-grid3">
          {shown.map((g) => <GuideCard key={g.slug} g={g} />)}
          {shown.length === 0 && (
            <div className="sc-empty" style={{ gridColumn: "1/-1" }}>
              {guides.length === 0 ? "The library is loading — check back in a moment." : "No guides match."}
            </div>
          )}
        </div>
      )}
    </CounsellingShell>
  );
}
