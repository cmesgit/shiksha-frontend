// PLACEMENT: src/counselling/AbroadComparePage.jsx   (NEW FILE)
//
// Admission Abroad → Compare, at /admission/abroad/compare. The screen
// "Compare now" on the sticky bar opens — a side-by-side table of whatever
// is in the tray (1-3 universities), each its own column: name + Remove,
// QS rank, country, region, type, subject areas, fee reference, tuition,
// fee evidence, website. Read off Imperial College London's own column on
// the board; every field is one already on the row (see abroad100.js),
// nothing composed or invented.
//
// An empty tray is not an error state — it is what every visitor who has
// not clicked "+ Add to compare" yet sees, so this renders an invitation
// back to the directory rather than a "nothing to compare" dead end.

import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import CounsellingShell from "./CounsellingShell";
import AbroadNav from "./AbroadNav";
import { useAbroadCompare } from "./useAbroadCompare";
import { ABROAD_100 } from "./data/abroad100";
import { ABROAD_COUNTRIES } from "./data/abroadCountries";
import { EXTRA_FLAGS, uniSlug } from "./data/abroadFacets";

const DIRECTORY = "/admission/abroad/universities";

const ROWS = [
  ["QS 2027 rank", (r, rankLabel) => rankLabel(r)],
  ["Country", (r, _, flagOf) => <>{flagOf.get(r.country)} {r.country}</>],
  ["Region", (r) => r.region],
  ["Type", (r) => r.type],
  ["Subject areas", (r) => <span className="ab-subject">{r.subjects.join(", ")}</span>],
  ["Fee reference", (r) => r.feeYear || "—"],
  ["Tuition & fees", (r) => r.feeDetail],
  ["Fee evidence", (r) => r.feeEvidence],
  ["Website", (r) => r.website ? r.website.replace(/^https?:\/\//, "").replace(/\/$/, "") : "—"],
];

export default function AbroadComparePage() {
  const { ids, remove } = useAbroadCompare();

  const flagOf = useMemo(() => {
    const m = new Map();
    ABROAD_COUNTRIES.forEach((c) => { if (c.flag) m.set(c.qsKey || c.name, c.flag); });
    Object.entries(EXTRA_FLAGS).forEach(([n, f]) => { if (!m.has(n)) m.set(n, f); });
    return m;
  }, []);

  const tiedRanks = useMemo(
    () => ABROAD_100.reduce((m, r) => m.set(r.qsRank, (m.get(r.qsRank) || 0) + 1), new Map()),
    []
  );
  const rankLabel = (r) => (r.ranked ? `${(tiedRanks.get(r.qsRank) || 0) > 1 ? "=" : "#"}${r.qsRank}` : "NR");

  const rows = ids.map((id) => ABROAD_100.find((r) => r.id === id)).filter(Boolean);

  return (
    <CounsellingShell nav={<AbroadNav current="universities" />}>
      <nav className="ac-crumb" aria-label="Breadcrumb">
        <Link to="/admission/abroad">Admission Abroad</Link>
        <span aria-hidden="true"> / </span>
        <span>Compare</span>
      </nav>

      <header className="ac-band">
        <h1 className="ac-h1">Compare universities</h1>
      </header>

      {rows.length === 0 ? (
        <div className="sc-empty">
          Nothing to compare yet. Add universities from the{" "}
          <Link to={DIRECTORY}>directory</Link> to see them side by side.
        </div>
      ) : (
        <div className="abcmp-wrap">
          <table className="abcmp-table">
            <thead>
              <tr>
                <th />
                {rows.map((r) => (
                  <th key={r.id}>
                    <Link to={`${DIRECTORY}/${uniSlug(r)}`}>{r.name}</Link>
                    <button className="abcmp-remove" onClick={() => remove(r.id)}>Remove</button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([label, render]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  {rows.map((r) => <td key={r.id}>{render(r, rankLabel, flagOf)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="ab-source">
        Rankings: QS World University Rankings {ABROAD_100[0].qsEdition}. Course and fee details come
        from official university pages; visa and work rules change often — always confirm with the
        university and the official immigration website before applying.
      </p>
    </CounsellingShell>
  );
}
