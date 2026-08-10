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

  useEffect(() => {
    let alive = true;
    setLoading(true);
    Promise.all([
      getHomeContent(section),
      getHomeListItems(section),
      getHomeFloaters(section),
    ]).then(([blockRow, itemRows, floaterRows]) => {
      if (!alive) return;
      setBlock(blockRow);
      setItems(itemRows);
      setFloaters(Object.fromEntries(floaterRows.map((f) => [f.slot, f])));
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [section]);

  return { block, items, floaters, loading };
}
