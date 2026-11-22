import useTickerSlot from "../ticker/useTickerSlot";
import AnnouncementStack from "../ticker/AnnouncementStack";

/* The homepage ticker band (design_handoff_live_ticker Phase 4, slot 3).
 *
 * A real HomeSection, so an admin positions it with the same drag-reorder as
 * every other section rather than it living at a hardcoded index — see
 * content/migrations/0039 for why it also needs a HomeSectionOrder row.
 *
 * Renders NOTHING at all until the flag is on and the queue holds an item for
 * this slot. An empty band with a heading would be worse than no band: it
 * takes homepage space to say nothing, and it is what an admin sees before
 * they have added anything.
 *
 * 2026-11-22 restyle: the home band only now renders the stacked-card
 * "noticeboard" design (AnnouncementStack). The footer strip and the student
 * dashboard rail still use the original TickerCards paged grid — they were
 * out of scope for this pass.
 */
export default function TickerBand() {
  const { items } = useTickerSlot("home_band");
  if (!items.length) return null;

  return <AnnouncementStack items={items} />;
}
