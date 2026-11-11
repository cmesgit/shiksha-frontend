// PLACEMENT: src/counselling/AdmissionAbroadPage.jsx   (NEW FILE — landing/frontend app)
//
// "Admission Abroad" — the worldwide-100 postgraduate directory, built to the
// "Admission Abroad" artboard. Static reference data (data/abroad100.js), no
// API call, same shape as AdmissionIndiaPage.
//
// Deep-linkable: /admission/abroad?country=Germany&subject=engineering
// Filters live in the URL so a link lands pre-filtered and a filtered view
// can be shared or reloaded.
//
// ── Honesty rules this screen exists to keep ─────────────────────────
// The dataset's contract (see data/abroad100.js) is not decoration:
//   * A fee is shown WITH its evidence label, verbatim. Only ~52 of 100
//     carry an amount, and an amount is not a verification — one row reads
//     "EUR 15,000" under "…current standard MSc rate not verified". The
//     badge is driven by feeEvidence, never by "does this contain a digit".
//   * Fee periods are never annualised or compared. The source is explicit
//     that per semester / quarter / credit / course / year / full programme
//     all occur, so the prose is shown as written.
//   * qsRank is rendered as given: "NR" stays "NR" and "1001-1200" stays a
//     range. Sorting uses qsSort so neither masquerades as a position.
//   * Subjects are described as main postgraduate areas, not a catalogue.
//
// ── NOT BUILT, deliberately ──────────────────────────────────────────
//   * The artboard's "Funding" browse tab. There is no funding/scholarship
//     field in the dataset — its read-me lists "confirmed scholarship" as
//     explicitly out of scope — and a funding filter that silently matched
//     nothing would be worse than its absence.
//   * "Popular study destinations" country-guide cards and the study-abroad
//     phase index. Both come from abroad3.docx, which is not imported yet
//     and needs a human dedupe pass first (Greece and Canada are written
//     twice; the artboard's own Canada card renders with no intake text).
//   * The artboard's "697 guide topics" stat, for the same reason — the
//     number cannot be computed from anything in the repo today.

import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CounsellingShell from "./CounsellingShell";
import { ABROAD_100 } from "./data/abroad100";

const POPULAR = ["United States", "United Kingdom", "Canada", "Australia", "Germany"];

const BROWSE_TABS = [
  ["country", "Country"],
  ["region", "Region"],
  ["subject", "Subject"],
];

// A fee is trustworthy only as far as its label says. Three buckets, keyed
// off the source's own 12-value vocabulary — the full label is always shown
// beside the amount; this only decides the badge's tone.
function evidenceTone(label = "") {
  const l = label.toLowerCase();
  if (l === "not verified") return "none";
  if (l.includes("not verified")) return "partial";
  if (l.includes("conditional") || l.includes("older")) return "partial";
  return "published";
}

const csv = (v) => (v ? String(v).split(",").map((s) => s.trim()).filter(Boolean) : []);

function Drawer({ row, onClose }) {
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

export default function AdmissionAbroadPage() {
  const [params, setParams] = useSearchParams();
  const [open, setOpen] = useState(null);
  const [tab, setTab] = useState("country");

  // The raw strings are the memo dependencies: they are stable primitives,
  // whereas csv() returns a fresh array every render.
  const q = params.get("q") || "";
  const countryParam = params.get("country") || "";
  const regionParam = params.get("region") || "";
  const subjectParam = params.get("subject") || "";

  const countries = useMemo(() => csv(countryParam), [countryParam]);
  const regions = useMemo(() => csv(regionParam), [regionParam]);
  const subjects = useMemo(() => csv(subjectParam), [subjectParam]);

  const patch = (key, value) => {
    const next = new URLSearchParams(params);
    if (value && value.length) next.set(key, value.join(","));
    else next.delete(key);
    setParams(next, { replace: true });
  };
  const toggle = (key, list, value) =>
    patch(key, list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);

  const facets = useMemo(() => {
    const count = (fn) => {
      const m = new Map();
      ABROAD_100.forEach((r) => fn(r).forEach((v) => m.set(v, (m.get(v) || 0) + 1)));
      return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    };
    return {
      country: count((r) => [r.country]),
      region: count((r) => [r.region]),
      subject: count((r) => r.subjects),
    };
  }, []);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ABROAD_100
      .filter((r) => {
        if (countries.length && !countries.includes(r.country)) return false;
        if (regions.length && !regions.includes(r.region)) return false;
        if (subjects.length && !subjects.some((s) => r.subjects.includes(s))) return false;
        if (!needle) return true;
        return (
          r.name.toLowerCase().includes(needle) ||
          r.country.toLowerCase().includes(needle) ||
          r.subjects.some((s) => s.toLowerCase().includes(needle))
        );
      })
      // qsSort, never qsRank: "NR" and "1001-1200" are not numbers.
      .sort((a, b) => a.qsSort - b.qsSort || a.name.localeCompare(b.name));
  }, [q, countries, regions, subjects]);

  const active = [
    ...countries.map((v) => ["country", v]),
    ...regions.map((v) => ["region", v]),
    ...subjects.map((v) => ["subject", v]),
  ];

  return (
    <CounsellingShell crumb=" / Admission abroad">
      <div className="ai-hero ab-hero">
        <span className="ab-badge">Study abroad · QS rankings {ABROAD_100[0].qsEdition}</span>
        <h1 className="sc-h1">Admission <em>abroad</em></h1>
        <p className="ab-sub">
          {ABROAD_100.length} QS-ranked universities across {facets.country.length} countries —
          postgraduate subject areas, published tuition references and official application links.
        </p>

        <div className="sc-search sc-search-hero">
          <input
            value={q}
            placeholder="University, country or subject…"
            onChange={(e) => {
              const next = new URLSearchParams(params);
              if (e.target.value) next.set("q", e.target.value); else next.delete("q");
              setParams(next, { replace: true });
            }}
          />
        </div>

        <div className="sc-tags ab-popular">
          <span className="ab-popular-label">Popular:</span>
          {POPULAR.map((c) => (
            <button
              key={c}
              className={`sc-fchip${countries.includes(c) ? " on" : ""}`}
              onClick={() => toggle("country", countries, c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Provenance belongs on the page, not in a footnote nobody reads. */}
        <p className="ab-source">
          Source: QS World University Rankings {ABROAD_100[0].qsEdition} and official university
          pages. Tuition is shown with its evidence label and is not verified for every programme —
          always confirm current details before applying.
        </p>

        <div className="cf-stats ai-stats">
          <div className="cf-stat">
            <span className="cf-stat-label">Universities</span>
            <span className="cf-stat-value">{ABROAD_100.length}</span>
          </div>
          <div className="cf-stat">
            <span className="cf-stat-label">Countries</span>
            <span className="cf-stat-value">{facets.country.length}</span>
          </div>
          <div className="cf-stat">
            <span className="cf-stat-label">World regions</span>
            <span className="cf-stat-value">{facets.region.length}</span>
          </div>
        </div>
      </div>

      <section className="ab-browse" aria-label="Browse universities abroad">
        <h2 className="ab-h2">Explore universities abroad</h2>
        <p className="ab-lede">Browse by destination, region or subject.</p>

        <div className="ab-tabs" role="tablist">
          {BROWSE_TABS.map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              className={`ab-tab${tab === key ? " on" : ""}`}
              onClick={() => setTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="ab-facet-grid">
          {facets[tab].slice(0, 12).map(([value, count]) => {
            const list = tab === "country" ? countries : tab === "region" ? regions : subjects;
            return (
              <button
                key={value}
                className={`sc-card ab-facet${list.includes(value) ? " on" : ""}`}
                onClick={() => toggle(tab, list, value)}
              >
                <span className="ab-facet-name">{value}</span>
                <span className="ab-facet-count">
                  {count} {count === 1 ? "university" : "universities"}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="ab-rankings" id="ab-directory">
        <div className="ab-rankings-head">
          <div>
            <h2 className="ab-h2">Ranked by QS {ABROAD_100[0].qsEdition}</h2>
            <p className="ab-lede">
              Overall institutional ranking, not a programme ranking.
            </p>
          </div>
          <span className="ab-count">
            {rows.length} of {ABROAD_100.length}
          </span>
        </div>

        {active.length > 0 && (
          <div className="sc-tags ai-active">
            {active.map(([key, value]) => (
              <button
                key={`${key}:${value}`}
                className="sc-fchip on"
                onClick={() =>
                  toggle(key, key === "country" ? countries : key === "region" ? regions : subjects, value)
                }
              >
                {value} ×
              </button>
            ))}
            <button className="sc-filters-clear" onClick={() => setParams(new URLSearchParams(), { replace: true })}>
              Clear all
            </button>
          </div>
        )}

        {rows.length === 0 ? (
          <div className="sc-empty">No universities match those filters.</div>
        ) : (
          <ul className="ai-list ab-list">
            {rows.map((r) => (
              <li key={r.id}>
                <button className="sc-card ai-row ab-row" onClick={() => setOpen(r)}>
                  <span className={`ai-rank ab-rank${r.ranked ? "" : " unranked"}`}>
                    {r.ranked ? `#${r.qsRank}` : "NR"}
                  </span>
                  <span className="ai-row-main">
                    <span className="ab-row-name">{r.name}</span>
                    {/* Not .ai-row-meta: that class is the India layout's
                        right-aligned column, and reusing it here pushes the
                        meta out beside the name instead of under it. */}
                    <span className="ab-row-meta">
                      {[r.area, r.country].filter(Boolean).join(", ")} · {r.type}
                    </span>
                  </span>
                  <span className="ab-row-fee">
                    <span className={`ab-pill ab-pill-${evidenceTone(r.feeEvidence)}`}>
                      {r.feeEvidence}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Drawer row={open} onClose={() => setOpen(null)} />
    </CounsellingShell>
  );
}
