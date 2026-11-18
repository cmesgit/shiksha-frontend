// PLACEMENT: src/counselling/AbroadCompareContext.jsx   (NEW FILE)
//
// The board's compare tray: "+ Add to compare" toggles to "✓ In compare"
// and shows a sticky bottom bar ("Compare (N/3)") that survives navigating
// between Home, Universities, a university's own page and back — not a
// per-page checkbox list, which is what shipped instead. Verified by
// toggling Imperial College London on its own page, then navigating to
// the directory and finding the bar still showed it selected.
//
// Scoped to the Admission Abroad area only (mounted in
// AdmissionAbroadRoute.jsx around the gated Screen), not site-wide.
// Persisted to localStorage rather than lifted into a URL param or a
// top-level app context: it has to survive a full navigation between
// routes that do not share any common ancestor besides this gate, and a
// 3-id list is not worth threading through App.jsx's provider tree.

import React, { useCallback, useEffect, useState } from "react";
import { CompareContext } from "./useAbroadCompare";

const STORAGE_KEY = "abroad_compare_ids";
const MAX_COMPARE = 3;

function readStored() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(raw) ? raw.filter((n) => Number.isFinite(n)) : [];
  } catch {
    return [];
  }
}

export function AbroadCompareProvider({ children }) {
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
        // Silently caps at 3 rather than rejecting the 4th tap — the board's
        // own bar never showed a 4th chip to remove, so there is no "full"
        // state to design an error for.
        : prev.length >= MAX_COMPARE ? prev : [...prev, id]
    );
  }, []);

  const remove = useCallback((id) => setIds((prev) => prev.filter((x) => x !== id)), []);
  const clear = useCallback(() => setIds([]), []);

  return (
    <CompareContext.Provider value={{ ids, inCompare, toggle, remove, clear, max: MAX_COMPARE }}>
      {children}
    </CompareContext.Provider>
  );
}
