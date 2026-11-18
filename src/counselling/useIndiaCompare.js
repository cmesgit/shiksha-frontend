// PLACEMENT: src/counselling/useIndiaCompare.js   (NEW FILE)
//
// Mirrors useAbroadCompare.js — split out of IndiaCompareContext.jsx so
// Fast Refresh doesn't break on a file exporting both a component and a
// plain hook.

import { createContext, useContext } from "react";

export const IndiaCompareContext = createContext(null);

export function useIndiaCompare() {
  const ctx = useContext(IndiaCompareContext);
  if (!ctx) throw new Error("useIndiaCompare must be used inside IndiaCompareProvider");
  return ctx;
}
