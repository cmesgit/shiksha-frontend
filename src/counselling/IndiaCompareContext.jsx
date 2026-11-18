// PLACEMENT: src/counselling/IndiaCompareContext.jsx   (NEW FILE)
//
// Mirrors AbroadCompareContext.jsx for the Admission in India v2 board —
// same "+Add to compare" → persistent "Compare (N/3)" sticky-bar behaviour,
// confirmed by driving the real board (toggled IIT Madras, navigated back
// to the full directory, found it still selected). Keyed by `listRank`
// (nirf980.js's unique NIRF rank, 1-980), not an array index or name.
//
// Scoped to the Admission in India area only (mounted in whatever gates
// AdmissionIndiaAllPage / the new detail & compare routes), persisted to
// localStorage under its own key so it never collides with the abroad tray.

import React, { useCallback, useEffect, useState } from "react";
import { IndiaCompareContext as Ctx } from "./useIndiaCompare";

const STORAGE_KEY = "india_compare_ranks";
const MAX_COMPARE = 3;

function readStored() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(raw) ? raw.filter((n) => Number.isFinite(n)) : [];
  } catch {
    return [];
  }
}

export function IndiaCompareProvider({ children }) {
  const [ids, setIds] = useState(readStored);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // Private-browsing / quota-exceeded: the tray just will not persist
      // across a reload. Not worth surfacing — nothing else depends on it.
    }
  }, [ids]);

  const inCompare = useCallback((id) => ids.includes(id), [ids]);

  const toggle = useCallback((id) => {
    setIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length >= MAX_COMPARE ? prev : [...prev, id]
    );
  }, []);

  const remove = useCallback((id) => setIds((prev) => prev.filter((x) => x !== id)), []);
  const clear = useCallback(() => setIds([]), []);

  return (
    <Ctx.Provider value={{ ids, inCompare, toggle, remove, clear, max: MAX_COMPARE }}>
      {children}
    </Ctx.Provider>
  );
}
