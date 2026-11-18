// PLACEMENT: src/counselling/useAbroadCompare.js   (NEW FILE)
//
// Split out of AbroadCompareContext.jsx: a file exporting both a component
// (AbroadCompareProvider) and a plain hook breaks React Fast Refresh —
// same reason careerBlurb.js exists separately from CareerExplorer.jsx.

import { createContext, useContext } from "react";

export const CompareContext = createContext(null);

export function useAbroadCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useAbroadCompare must be used inside AbroadCompareProvider");
  return ctx;
}
