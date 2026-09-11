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

// How a section decides whether an ABSENT floater slot means "the admin hid
// this badge" or "the CMS has nothing to say about badges here".
//
// There is no per-row visibility flag to read. `is_active` was dropped from
// the six content models in `content/0024` in favour of `status`, and the
// public serializer emits neither — only id/section/slot/icon/label/sublabel
// (`content/serializers.py`). `HomeFloaterListView` filters to
// `status=PUBLISHED`, so unpublishing a badge makes its row vanish from this
// response, which is byte-for-byte identical to it never having existed.
// Three components used to test `floaters.x?.is_active !== false`, which is
// `undefined !== false` for BOTH a published row and an absent one — always
// true, so a hidden badge kept rendering from the hardcoded defaults and
// nothing in the CMS could ever turn a badge off.
//
// The hide gesture the admin screen actually offers is removing the row
// ("Leave one empty to hide it" — Admin-dashboard SectionFloaters.jsx); there
// is no unpublish control there at all. So absence must mean hidden.
//
// It cannot mean that unconditionally, though: `getHomeFloaters` catches every
// error and returns `[]`, so a backend outage is indistinguishable from an
// empty table, and "absent = hidden" applied naively would blank every badge
// on the homepage the moment the API went down. Hence the rule is per-section:
// once a section returns ANY floater row the CMS owns that section and a
// missing slot is a deliberate removal; with zero rows the caller's hardcoded
// defaults stand. Same "replace-if-present" convention the list items already
// use (`chips = marqueeChips.length ? marqueeChips : DEFAULT_MARQUEE_CHIPS`).
//
// Consequence to know before changing this: deleting the LAST badge in a
// section returns that section to its defaults rather than showing none, so
// "hide every badge here" is not expressible. Supporting it needs an explicit
// field on the row, not a change to this rule.
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

  // See the note above the hook. While loading this is false, so a section
  // renders its defaults until the real answer lands — the same thing it
  // already does for `block` and `items`.
  const cmsOwnsFloaters = Object.keys(floaters).length > 0;

  return { block, items, floaters, cmsOwnsFloaters, loading };
}
