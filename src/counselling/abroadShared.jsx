// PLACEMENT: src/counselling/abroadShared.jsx   (NEW FILE — landing/frontend app)
//
// Shared by the two Admission Abroad screens that were one file until the
// Home/Universities split: AdmissionAbroadPage (Home) and
// AbroadUniversitiesPage (the 100-row directory).
//
// Extracted rather than copied. The fee-evidence rules below are the
// dataset's contract, not formatting — duplicating them is how two screens
// end up disagreeing about whether a tuition figure is verified.

import React from "react";

/**
 * A fee is trustworthy only as far as its label says. Three buckets, keyed
 * off the source's own 12-value vocabulary — the full label is always shown
 * beside the amount; this only decides the badge's tone.
 *
 * Driven by feeEvidence, NEVER by "does this contain a digit": only ~52 of
 * 100 rows carry an amount, and one reads "EUR 15,000" under "…current
 * standard MSc rate not verified".
 */
export function evidenceTone(label = "") {
  const l = label.toLowerCase();
  if (l === "not verified") return "none";
  if (l.includes("not verified")) return "partial";
  if (l.includes("conditional") || l.includes("older")) return "partial";
  return "published";
}

export const csv = (v) =>
  v ? String(v).split(",").map((s) => s.trim()).filter(Boolean) : [];

/**
 * The directory card's fee chip. THREE labels, which is what the board
 * draws — and they do NOT line up with evidenceTone()'s three buckets, so
 * this is a separate rule rather than a reuse.
 *
 * Read off the board: MIT ("Published amount / example") → Published fee;
 * Imperial and Oxford ("Published fee policy; programme-specific") → Fee
 * policy; Cornell ("Not verified") → Fee not verified. evidenceTone() puts
 * Imperial in "published", so reusing it would have mislabelled 23 rows.
 *
 * Order matters: a label can say both "policy" and "not verified"
 * ("Published fee policy; amount not verified"), and the board treats that
 * as a policy — there IS a published policy, just no number.
 */
export function feeChip(label = "") {
  const l = label.toLowerCase();
  if (l.includes("policy") || l.includes("guidance")) return { label: "Fee policy", tone: "partial" };
  if (l.includes("not verified")) return { label: "Fee not verified", tone: "none" };
  return { label: "Published fee", tone: "published" };
}

// The `Drawer` that used to live here (a `cf-drawer` modal showing a row's
// overview/subjects/tuition/applying) is gone: the board gives every
// university its own routable page instead, built at
// AbroadUniversityDetailPage.jsx from these same row fields. Removed rather
// than left dead because its CSS (`.cf-drawer*`) went with it too — see that
// file's header comment for the content mapping.
