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

export function Drawer({ row, onClose }) {
  if (!row) return null;
  const tone = evidenceTone(row.feeEvidence);
  return (
    // The aside must be nested INSIDE the mask, not a sibling of it: the mask
    // is the `position: fixed` flex parent that pins the drawer to the right.
    // Rendered side by side, the drawer has no fixed ancestor and flows inline
    // far down the page — visible only as a dimmed screen with no panel.
    <div className="cf-drawer-mask" onClick={onClose}>
      <aside
        className="cf-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={row.name}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cf-drawer-head">
          <div>
            <div className="cf-drawer-kicker">
              QS {row.qsEdition} · {row.ranked ? `Rank ${row.qsRank}` : "Not ranked in QS Overall"}
            </div>
            <h2 className="cf-drawer-title">{row.name}</h2>
            <div className="cf-drawer-summary">
              {[row.area, row.country].filter(Boolean).join(", ")} · {row.type}
            </div>
          </div>
          <button className="cf-drawer-x" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="cf-drawer-body">
          <section className="cf-drawer-sec">
            <h3>Overview</h3>
            <p>{row.overview}</p>
          </section>

          <section className="cf-drawer-sec">
            <h3>Main postgraduate areas</h3>
            <div className="sc-tags">
              {row.subjects.map((s) => <span key={s} className="sc-fchip ab-subject">{s}</span>)}
            </div>
            <p className="ab-caveat">{row.academic}</p>
          </section>

          <section className="cf-drawer-sec">
            <h3>Tuition</h3>
            <div className={`ab-fee ab-fee-${tone}`}>
              <div className="ab-fee-label">{row.feeEvidence}</div>
              {/* "Fee reference year" is a bare year on only 39 of 100 rows;
                  the rest is qualifying prose ("Current amount not verified",
                  "2026-27 proposed schedule"). Prefixing it with "reference
                  year" misreads the majority, so it stands on its own. */}
              {row.feeYear && <div className="ab-fee-year">{row.feeYear}</div>}
              <p className="ab-fee-detail">{row.feeDetail}</p>
              {/* Periods differ per institution; never present these as comparable. */}
              <p className="ab-caveat">
                Fee periods are not interchangeable between institutions. Always confirm
                the current amount on the official page before applying.
              </p>
              {row.feeSource && (
                <a className="ab-src" href={row.feeSource} target="_blank" rel="noreferrer">
                  Fee source →
                </a>
              )}
            </div>
          </section>

          <section className="cf-drawer-sec">
            <h3>Applying</h3>
            <p>{row.applying}</p>
          </section>

          <div className="cf-drawer-cta-row">
            <a className="sc-btn green" href={row.website} target="_blank" rel="noreferrer">
              Official website →
            </a>
            {row.catalogue && (
              <a className="sc-btn ghost" href={row.catalogue} target="_blank" rel="noreferrer">
                Course catalogue →
              </a>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
