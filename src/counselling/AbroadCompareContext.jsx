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
  // A 4th tap used to fail with zero toast/alert/disabled-state — the button
  // just sat there saying "+ Add to compare" with nothing happening, so a
  // learner had no way to tell "it didn't work" from "it's slow."
  const [capMessage, setCapMessage] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // Private-browsing / quota-exceeded: the tray just will not persist
      // across a reload. Not worth surfacing — nothing else depends on it.
    }
  }, [ids]);

  useEffect(() => {
    if (!capMessage) return undefined;
    const t = setTimeout(() => setCapMessage(""), 2600);
    return () => clearTimeout(t);
  }, [capMessage]);

  const inCompare = useCallback((id) => ids.includes(id), [ids]);

  const toggle = useCallback((id) => {
    setIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_COMPARE) {
        setCapMessage(`You can only compare up to ${MAX_COMPARE} universities at a time — remove one first.`);
        return prev;
      }
      return [...prev, id];
    });
  }, []);

  const remove = useCallback((id) => setIds((prev) => prev.filter((x) => x !== id)), []);
  const clear = useCallback(() => setIds([]), []);

  return (
    <CompareContext.Provider value={{ ids, inCompare, toggle, remove, clear, max: MAX_COMPARE }}>
      {children}
      {capMessage && (
        <div role="status" style={{
          position: "fixed", left: "50%", bottom: 24, transform: "translateX(-50%)",
          background: "#14201a", color: "#fff", padding: "10px 18px", borderRadius: 10,
          font: "600 13px 'Poppins', sans-serif", boxShadow: "0 8px 24px rgba(0,0,0,.25)",
          zIndex: 9999, maxWidth: "min(420px, 90vw)", textAlign: "center",
        }}>{capMessage}</div>
      )}
    </CompareContext.Provider>
  );
}
