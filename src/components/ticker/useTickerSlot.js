import { useEffect, useState } from "react";
import { getTickerItems } from "../../api/contentApi";
import { getPublicConfig } from "../../api/publicConfig";

/** Items for one ticker slot, or [] when the feature is off or empty.
 *
 * Both gates live here so no surface can forget one: the flag comes from
 * getPublicConfig (a bare fetch — apiClient's 401 interceptor can bounce a
 * logged-out visitor to /login), and the items come from the public
 * announcements endpoint, which fails to [].
 *
 * `ready` exists so a caller can tell "still deciding" from "decided: show
 * nothing". Rendering a heading before the answer arrives is what makes an
 * empty band flash on every page load.
 */
export default function useTickerSlot(slot) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    getPublicConfig()
      .then((cfg) => {
        if (!alive) return [];
        if (!cfg.live_ticker_enabled) return [];
        return getTickerItems(slot);
      })
      .then((rows) => {
        if (!alive) return;
        setItems(Array.isArray(rows) ? rows : []);
        setReady(true);
      })
      .catch(() => { if (alive) setReady(true); });
    return () => { alive = false; };
  }, [slot]);

  return { items, ready };
}
