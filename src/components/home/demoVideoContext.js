/**
 * demoVideoContext.js — the context DemoVideoProvider fills and Hero reads.
 *
 * Separate from the provider because a module that exports both a component
 * and a plain function breaks React Fast Refresh (`react-refresh/only-export-
 * components`), which the repo lints as an error.
 *
 * The default value is the "no provider above me" case and is also the real
 * shape at rest: an empty list and a no-op. Any consumer rendered outside the
 * landing page therefore shows no demo affordance rather than throwing.
 */
import { createContext, useContext } from "react";

export const DemoVideoContext = createContext({ demos: [], openDemo: () => {} });

export function useDemoVideos() {
  return useContext(DemoVideoContext);
}
