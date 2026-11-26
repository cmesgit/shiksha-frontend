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
        setCapMessage(`You can only compare up to ${MAX_COMPARE} institutions at a time — remove one first.`);
        return prev;
      }
      return [...prev, id];
    });
  }, []);

  const remove = useCallback((id) => setIds((prev) => prev.filter((x) => x !== id)), []);
  const clear = useCallback(() => setIds([]), []);

  return (
    <Ctx.Provider value={{ ids, inCompare, toggle, remove, clear, max: MAX_COMPARE }}>
      {children}
      {capMessage && (
        <div role="status" style={{
          position: "fixed", left: "50%", bottom: 24, transform: "translateX(-50%)",
          background: "#14201a", color: "#fff", padding: "10px 18px", borderRadius: 10,
          font: "600 13px 'Poppins', sans-serif", boxShadow: "0 8px 24px rgba(0,0,0,.25)",
          zIndex: 9999, maxWidth: "min(420px, 90vw)", textAlign: "center",
        }}>{capMessage}</div>
      )}
    </Ctx.Provider>
  );
}
