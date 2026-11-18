// PLACEMENT: src/counselling/AdmissionIndiaComparePage.jsx   (NEW FILE)
//
// Admission in India → Compare, at /admission/india/compare. Mirrors
// AbroadComparePage.jsx's shape (one column per institution, same
// field-per-row table) over nirf980.js's actual fields instead of
// abroad100.js's.
//
// ── Fees: the board's compare table shows a rupee figure; ours never does ─
// Same honest treatment as AdmissionIndiaAllPage.jsx and
// AdmissionIndiaDetailPage.jsx — FEE_TEXT + caveat, never a fabricated
// amount, because nirf980.js has no verified fee figures at all (only a
// verified/source_found/not_verified status per institution).
//
// ── Website needs the lazy detail payload ─────────────────────────────
// Unlike abroad100.js (website is a top-level field), nirf980.js keeps
// `website` in the ~450 KB lazy nirf980-detail.js payload. Loaded once per
// compared row here, not per-row on the directory, since the compare table
// is the one screen that actually needs it for every row at once.

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CounsellingShell from "./CounsellingShell";
import IndiaCompareBar from "./IndiaCompareBar";
import { IndiaCompareProvider } from "./IndiaCompareContext";
import { useIndiaCompare } from "./useIndiaCompare";
import { NIRF_980 } from "./data/nirf980";
import { rankLabel, FEE_TEXT, rankParam } from "./data/nirfFacets";

const DIRECTORY = "/admission/india/all";

const ROWS = [
  ["NIRF 2025 (Overall)", (r) => rankLabel(r.ranks.Overall)],
  ["Location", (r) => [r.city, r.state].filter(Boolean).join(", ") || "—"],
  ["Institution type", (r) => r.type],
  ["Ownership", (r) => r.ownership],
  ["Streams", (r) => r.streams.join(", ") || "—"],
  ["Entrance exams", (r) => r.exams.join(", ") || "Not listed in this edition"],
  ["Fees", (r) => FEE_TEXT[r.feeStatus]],
  ["Course list", (r) => r.courseSource === "official" ? "From the institution's official programme list" : "Indicative course groups — not individually verified"],
  ["Website", (r, d) => d?.website ? d.website.replace(/^https?:\/\//, "").replace(/\/$/, "") : "—"],
];

export default function AdmissionIndiaComparePage() {
  return (
    <IndiaCompareProvider>
      <AdmissionIndiaComparePageInner />
      <IndiaCompareBar />
    </IndiaCompareProvider>
  );
}

function AdmissionIndiaComparePageInner() {
  const { ids, remove } = useIndiaCompare();
  const rows = useMemo(
    () => ids.map((rank) => NIRF_980.find((r) => r.listRank === rank)).filter(Boolean),
    [ids]
  );

  // Websites live in the lazy detail payload, keyed by listRank — loaded
  // once for whichever rows are actually in the tray (at most 3).
  const [details, setDetails] = useState({});
  useEffect(() => {
    if (rows.length === 0) return;
    let live = true;
    import("./data/nirf980-detail").then((m) => {
      if (!live) return;
      const next = {};
      rows.forEach((r) => {
        next[r.listRank] = m.NIRF_980_DETAIL.find((d) => d.listRank === r.listRank) || null;
      });
      setDetails(next);
    });
    return () => { live = false; };
  }, [rows]);

  return (
    <CounsellingShell crumb=" / Admission in India">
      <header className="ac-band">
        <h1 className="ac-h1">Compare institutions</h1>
      </header>

      {rows.length === 0 ? (
        <div className="sc-empty">
          Nothing to compare yet. Add institutions from the{" "}
          <Link to={DIRECTORY}>directory</Link> to see them side by side.
        </div>
      ) : (
        <div className="abcmp-wrap">
          <table className="abcmp-table">
            <thead>
              <tr>
                <th />
                {rows.map((r) => (
                  <th key={r.listRank}>
                    <Link to={`${DIRECTORY}/${rankParam(r)}`}>{r.name}</Link>
                    <button className="abcmp-remove" onClick={() => remove(r.listRank)}>Remove</button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([label, render]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  {rows.map((r) => <td key={r.listRank}>{render(r, details[r.listRank])}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="ab-source">
        Rankings: NIRF India Rankings 2025, Ministry of Education. Course and admission details
        change every year — always confirm with the institution's own website before applying.
      </p>
    </CounsellingShell>
  );
}
