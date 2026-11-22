// PLACEMENT: src/counselling/IndiaCompareBar.jsx   (NEW FILE)
//
// Mirrors AbroadCompareBar.jsx for the Admission in India v2 board: sticky
// "Compare (N/3)" bar with removable chips once anything is in the tray,
// a "Compare now" link, and nothing rendered when the tray is empty.

import React from "react";
import { Link } from "react-router-dom";
import { useIndiaCompare } from "./useIndiaCompare";
import { NIRF_980 } from "./data/nirf980";
import { rankLabel } from "./data/nirfFacets";

export default function IndiaCompareBar() {
  const { ids, remove, max } = useIndiaCompare();

  const rows = ids.map((rank) => NIRF_980.find((r) => r.listRank === rank)).filter(Boolean);
  if (rows.length === 0) return null;

  return (
    <div className="abu-combar">
      <span className="abu-combar-count">Compare ({rows.length}/{max})</span>
      <div className="abu-combar-chips">
        {rows.map((r) => (
          <span key={r.listRank} className="abu-combar-chip">
            <span className="abu-combar-chip-tx">{rankLabel(r.ranks.Overall)} {r.name}</span>
            <button onClick={() => remove(r.listRank)} aria-label={`Remove ${r.name} from compare`}>×</button>
          </span>
        ))}
      </div>
      <Link className="sc-btn green abu-combar-go" to="/admission/india/compare">Compare now</Link>
    </div>
  );
}
