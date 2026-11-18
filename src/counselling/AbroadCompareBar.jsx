// PLACEMENT: src/counselling/AbroadCompareBar.jsx   (NEW FILE)
//
// The sticky bar the board shows once anything is in the compare tray:
// "Compare (N/3)", one removable chip per university, "Compare now".
// Renders nothing when the tray is empty — verified on the board, which
// shows no bar at all on a fresh page load.

import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAbroadCompare } from "./useAbroadCompare";
import { ABROAD_100 } from "./data/abroad100";
import { ABROAD_COUNTRIES } from "./data/abroadCountries";
import { EXTRA_FLAGS } from "./data/abroadFacets";

export default function AbroadCompareBar() {
  const { ids, remove, max } = useAbroadCompare();

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

  const rows = ids.map((id) => ABROAD_100.find((r) => r.id === id)).filter(Boolean);
  if (rows.length === 0) return null;

  const rankLabel = (r) => (r.ranked ? `${(tiedRanks.get(r.qsRank) || 0) > 1 ? "=" : "#"}${r.qsRank}` : "NR");

  return (
    <div className="abu-combar">
      <span className="abu-combar-count">Compare ({rows.length}/{max})</span>
      <div className="abu-combar-chips">
        {rows.map((r) => (
          <span key={r.id} className="abu-combar-chip">
            <span aria-hidden="true">{flagOf.get(r.country)} </span>
            QS {rankLabel(r)}
            <button onClick={() => remove(r.id)} aria-label={`Remove ${r.name} from compare`}>×</button>
          </span>
        ))}
      </div>
      <Link className="sc-btn green abu-combar-go" to="/admission/abroad/compare">Compare now</Link>
    </div>
  );
}
