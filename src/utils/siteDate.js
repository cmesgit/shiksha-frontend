// PLACEMENT: src/utils/siteDate.js   (NEW FILE — landing/frontend app)
//
// Date formatting for reader-facing content dates.
//
// ── Why this exists ──────────────────────────────────────────────────
// Callers were using `new Date(x).toLocaleDateString("en-IN", …)`, which
// sets the *locale* but not the *timezone*. The calendar day is then
// computed in whatever zone the reader's machine is set to, so the same
// article renders a different day for different readers.
//
// This was a live defect on Current Affairs: a 1News headline displayed
// "12 November 2026" while its own URL said /2026/11/13/. 1News publishes
// in NZDT (UTC+13); any reader west of it sees the previous day.
//
// Pinning to Asia/Kolkata makes the displayed day the site's editorial
// day — the same for every reader, and the one an Indian editor means
// when they say "today's headlines". It will still differ from a foreign
// publisher's own local date, which is correct and unavoidable: there is
// no single day that is true everywhere.

export const SITE_TIME_ZONE = "Asia/Kolkata";

const DATE_OPTS = { day: "numeric", month: "long", year: "numeric", timeZone: SITE_TIME_ZONE };
const DATETIME_OPTS = { ...DATE_OPTS, hour: "numeric", minute: "2-digit" };

const parse = (value) => {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

/** "13 November 2026", in the site's timezone. Empty string if unparseable. */
export function formatSiteDate(value) {
  const d = parse(value);
  if (!d) return "";
  try {
    return d.toLocaleDateString("en-IN", DATE_OPTS);
  } catch {
    return "";
  }
}

/** "13 November 2026, 4:30 pm", in the site's timezone. */
export function formatSiteDateTime(value) {
  const d = parse(value);
  if (!d) return "";
  try {
    return d.toLocaleString("en-IN", DATETIME_OPTS);
  } catch {
    return "";
  }
}

/** ISO-8601 for a <time dateTime=…> attribute. Empty string if unparseable. */
export function toDateTimeAttr(value) {
  const d = parse(value);
  return d ? d.toISOString() : "";
}

/**
 * "YYYY-MM" in the site's timezone — the value shape an `<input type="month">`
 * produces, so a month filter can be compared against an instant without
 * each reader's own zone shifting an article into the neighbouring month.
 */
export function siteMonthKey(value) {
  const d = parse(value);
  if (!d) return "";
  // en-CA gives YYYY-MM-DD, which slices cleanly and is locale-stable.
  return d.toLocaleDateString("en-CA", { timeZone: SITE_TIME_ZONE }).slice(0, 7);
}

/**
 * True when the two instants fall on the same calendar day in the site's
 * timezone — used to suppress an "Updated" line that just repeats the
 * publication date.
 */
export function sameSiteDay(a, b) {
  const da = parse(a);
  const db = parse(b);
  if (!da || !db) return false;
  return da.toLocaleDateString("en-CA", { timeZone: SITE_TIME_ZONE })
      === db.toLocaleDateString("en-CA", { timeZone: SITE_TIME_ZONE });
}
