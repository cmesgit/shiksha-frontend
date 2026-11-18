/**
 * src/counselling/careerBlurb.js
 *
 * Lives in its own module rather than in CareerExplorer.jsx because a file
 * that exports both a component and a plain function breaks React Fast
 * Refresh (`react-refresh/only-export-components`).
 *
 * Only Study in India uses it: its cards derive their blurb from
 * `careerDetail.js`'s `overview`, while `data/careerAbroad.js` carries an
 * authored `blurb` per record.
 */

/**
 * The board's card blurb is the FIRST SENTENCE of `overview`, then clamped
 * to two lines by CSS — not the whole paragraph clamped. Verified against
 * all thirty India records: Medicine shows one short sentence with no
 * ellipsis while its overview continues "MBBS (5.5 years including
 * internship)…".
 *
 * The lookahead requires whitespace + a capital so "B.Tech", "R&D." and
 * "₹3.5–5" do not split a sentence.
 */
export function firstSentence(text) {
  if (!text) return "";
  const m = text.match(/^[\s\S]*?[.!?](?=\s+[A-Z₹])/);
  return (m ? m[0] : text).trim();
}
