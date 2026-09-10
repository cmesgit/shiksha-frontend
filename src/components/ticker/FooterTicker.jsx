import useTickerSlot from "./useTickerSlot";
import TickerCards, { TickerCard } from "./TickerCards";
import "../../css/Ticker.css";

/* The footer ticker strip (design_handoff_live_ticker Phase 4, slot 6).
 *
 * ⚠ This is the ONE ticker slot on a dark background. The default card is
 * ink-on-white and would read as a hole punched in the footer, so the cards
 * and the pager are rendered in an inverted tone — see .tk-card--dark in
 * Ticker.css. Its hairline matches .ftr-top's own rgba(255,255,255,0.12) so
 * the region reads as part of the footer rather than bolted onto it.
 *
 * Renders nothing when the flag is off or the queue is empty, so the footer
 * is byte-for-byte unchanged until an admin puts something here.
 */
export default function FooterTicker() {
  const { items } = useTickerSlot("footer");
  if (!items.length) return null;

  return (
    <div className="tk-foot tk-foot__nav" aria-labelledby="tk-foot-h">
      <p className="tk-foot__label" id="tk-foot-h">Latest updates</p>
      <TickerCards
        items={items}
        perView={3}
        renderCard={(it) => <TickerCard key={it.id} item={it} tone="dark" />}
      />
    </div>
  );
}
