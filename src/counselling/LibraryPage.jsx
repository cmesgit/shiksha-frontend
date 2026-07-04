// PLACEMENT: src/counselling/LibraryPage.jsx   (NEW FILE — landing/frontend app)
// Workflow: "Browse Library" — all six guides, filterable by audience.

import React, { useMemo, useState } from "react";
import CounsellingShell from "./CounsellingShell";
import GUIDES from "./data/guides";
import { GuideCard } from "./LandingPage";

const FILTERS = ["All", "After Class 10", "Class 11–12", "After Class 12", "Undergraduate"];

export default function LibraryPage() {
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");

  const shown = useMemo(() => {
    let arr = GUIDES;
    if (filter !== "All") arr = arr.filter((g) => g.audience.startsWith(filter));
    const needle = q.trim().toLowerCase();
    if (needle) arr = arr.filter((g) => (g.title + g.blurb + g.audience).toLowerCase().includes(needle));
    return arr;
  }, [filter, q]);

  return (
    <CounsellingShell crumb=" / Guides">
      <h1 className="sc-h1">Career Guidance Library</h1>
      <p className="sc-sub">
        Written for Indian students — streams, entrance exams, degrees, and how
        to choose. Free to read, no login needed.
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        {FILTERS.map((f) => (
          <button key={f} className={`sc-chip${filter === f ? " on" : ""}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="sc-search" style={{ marginTop: 6, marginBottom: 22 }}>
        <input placeholder="Search guides…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="sc-grid3">
        {shown.map((g) => <GuideCard key={g.slug} g={g} />)}
        {shown.length === 0 && <div className="sc-empty" style={{ gridColumn: "1/-1" }}>No guides match.</div>}
      </div>
    </CounsellingShell>
  );
}
