// PLACEMENT: src/hooks/useHomeContent.js
//
// Data-layer for the homepage's CMS-backed sections. Fetches a section's
// content block, list items, and floaters in parallel and hands back a
// shape components can render directly, with `floaters` pre-indexed by
// slot (`bySlot.cap?.label`) so a section never has to search the array
// itself. Falls back to nothing (null/[]/{}) when the CMS has no rows yet —
// callers supply their own static default copy in that case, same
// "replace-if-present" convention already used by FeaturedCourses/Faq.

import { useEffect, useState } from "react";
import { getHomeContent, getHomeFloaters, getHomeListItems } from "../api/contentApi";

export function useHomeContent(section) {
  const [block, setBlock] = useState(null);
  const [items, setItems] = useState([]);
  const [floaters, setFloaters] = useState({});
  const [loading, setLoading] = useState(true);
  const [blockLoading, setBlockLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    let sequence = 0;
    let lastRefresh = 0;
    setLoading(true);
    setBlockLoading(true);
    const load = (force = false) => {
      const current = ++sequence;
      const options = { force };
      Promise.all([
        getHomeContent(section, options).then((row) => {
          if (alive && current === sequence) {
            setBlock(row);
            setBlockLoading(false);
          }
          return row;
        }),
        getHomeListItems(section, options),
        getHomeFloaters(section, options),
      ]).then(([blockRow, itemRows, floaterRows]) => {
        if (!alive || current !== sequence) return;
        setBlock(blockRow);
        setItems(itemRows);
        setFloaters(Object.fromEntries(floaterRows.map((f) => [f.slot, f])));
        setLoading(false);
      });
    };
    const refresh = () => {
      if (document.visibilityState !== "visible" || Date.now() - lastRefresh < 1000) return;
      lastRefresh = Date.now();
      load(true);
    };
    load();
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      alive = false;
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [section]);

  return { block, items, floaters, loading, blockLoading };
}
