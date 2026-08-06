// PLACEMENT: src/counselling/useCounsellorsLive.js   (NEW FILE — landing/frontend app)
//
// Zero-counsellor soft launch. `GET /counseling/counselors/` returns
// `{results: [], count: 0}` today on both dev and prod — nobody has been
// approved yet — so every booking CTA currently funnels a visitor into a
// dead end. This hook answers one question: "is there anyone to book?",
// and every call site in this module reads it instead of assuming yes.
//
// Deliberately data-driven, not a build-time flag: the flip-on event is
// literally "a counsellor got approved", which is exactly what `count`
// already reports. A VITE_* flag would be a second, hand-maintained
// representation of that same fact — forget to flip it after an approval
// and counsellors sit invisible with zero bookings, silently. This way,
// the moment an admin approves someone in Admin-dashboard's
// CounselorApprovals screen, every gated page here updates on next load
// with no redeploy.
//
// One request per page load, shared across every call site (Landing,
// Shell, MyPath, ...), cached for the tab's session so back/forward
// navigation doesn't refetch. `page_size=1` keeps the request cheap on
// the dev droplet's single uvicorn worker — never call the unpaginated
// directory just to read a count.

import { useEffect, useState } from "react";
import { getCounsellors } from "../api/counselling";

const CACHE_KEY = "sc-counsellors-live";
let inFlight = null;

function fetchLive() {
  if (inFlight) return inFlight;
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached !== null) {
    inFlight = Promise.resolve(JSON.parse(cached));
    return inFlight;
  }
  inFlight = getCounsellors({ page_size: 1 })
    .then((d) => {
      const result = { live: (d.count || 0) > 0, count: d.count || 0 };
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(result));
      return result;
    })
    .catch(() => {
      inFlight = null; // allow a retry on the next mount
      return { live: false, count: 0 };
    });
  return inFlight;
}

/**
 * @returns {{live: boolean|null, count: number}} `live` is null until the
 * first fetch resolves. Callers should treat null the same as false
 * (fail closed to the content-first copy) rather than flashing the
 * booking-enabled state and then retracting it.
 */
export default function useCounsellorsLive() {
  const [state, setState] = useState({ live: null, count: 0 });

  useEffect(() => {
    let mounted = true;
    fetchLive().then((res) => mounted && setState(res));
    return () => { mounted = false; };
  }, []);

  return state;
}
