// PLACEMENT: src/counselling/AbroadUniversitiesPage.jsx   (NEW FILE)
//
// Admission Abroad → Universities: the full QS-100 directory, at
// /admission/abroad/universities.
//
// ── Why this is a separate route now ─────────────────────────────────
// The Admission Abroad board (claude.ai/artifact/4nxDHtLVf28SB9DTNzFxga
// #artboard-e1ccdaae93d6, read in the browser 2026-11-17) draws a four-tab
// product nav — Home · Universities · Countries · Guide — with HOME active
// on a hero screen that shows only a five-row ranking PREVIEW beside an
// "All 100 universities →" link. So Home and the directory are two screens,
// exactly as /admission/india and /admission/india/all already are on the
// India side. Until this split they were one page, and AbroadNav pointed
// both "Home" and "Universities" at it.
//
// ── Deep links are preserved ─────────────────────────────────────────
// /admission/abroad?country=Germany&subject=… was the shareable filtered
// view before the split. AdmissionAbroadPage now forwards any such query to
// this route, so old links keep landing pre-filtered rather than on a hero
// that ignores them.
//
// ── Honesty rules this screen keeps (see data/abroad100.js) ──────────
//   * A fee is shown WITH its evidence label, verbatim; the badge is driven
//     by feeEvidence, never by "does this contain a digit".
//   * Fee periods are never annualised or compared.
//   * qsRank renders as given: "NR" stays "NR", "1001-1200" stays a range.
//     Sorting uses qsSort so neither masquerades as a position.

import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CounsellingShell from "./CounsellingShell";
import AbroadNav from "./AbroadNav";
import { ABROAD_100 } from "./data/abroad100";
import { areasOf, fundingOf } from "./data/abroadFacets";
import { Drawer, csv, evidenceTone } from "./abroadShared";

const BROWSE_TABS = [
  ["country", "Country"],
  ["region", "Region"],
  ["subject", "Subject"],
  ["funding", "Funding"],
];

export default function AbroadUniversitiesPage() {
  const [params, setParams] = useSearchParams();
  const [open, setOpen] = useState(null);
  const [tab, setTab] = useState("country");

  // The raw strings are the memo dependencies: they are stable primitives,
  // whereas csv() returns a fresh array every render.
  const q = params.get("q") || "";
  const countryParam = params.get("country") || "";
  const regionParam = params.get("region") || "";
  const subjectParam = params.get("subject") || "";
  const fundingParam = params.get("funding") || "";

  const countries = useMemo(() => csv(countryParam), [countryParam]);
  const regions = useMemo(() => csv(regionParam), [regionParam]);
  const subjects = useMemo(() => csv(subjectParam), [subjectParam]);
  const funding = useMemo(() => csv(fundingParam), [fundingParam]);

  const patch = (key, value) => {
    const next = new URLSearchParams(params);
    if (value && value.length) next.set(key, value.join(","));
    else next.delete(key);
    setParams(next, { replace: true });
  };
  const toggle = (key, list, value) =>
    patch(key, list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);

  // One place that maps a facet key to its selection, so adding "funding"
  // could not leave a call site silently falling through to `subjects` —
  // which is what the old nested ternary would have done.
  const listFor = (key) =>
    key === "country" ? countries
      : key === "region" ? regions
      : key === "funding" ? funding
      : subjects;

  const facets = useMemo(() => {
    const count = (fn) => {
      const m = new Map();
      ABROAD_100.forEach((r) => fn(r).forEach((v) => m.set(v, (m.get(v) || 0) + 1)));
      return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    };
    return {
      country: count((r) => [r.country]),
      region: count((r) => [r.region]),
      // The 12 board subject areas, same vocabulary the Home browse block
      // links with — so a facet card's href can actually filter here.
      subject: count(areasOf),
      funding: count((r) => [fundingOf(r)]),
    };
  }, []);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ABROAD_100
      .filter((r) => {
        if (countries.length && !countries.includes(r.country)) return false;
        if (regions.length && !regions.includes(r.region)) return false;
        // A ?subject= token may be either vocabulary. The browse cards now
        // send a subject AREA ("Law"), but ?subject=engineering was a live
        // shareable link before this change and still has to resolve, so a
        // raw dataset subject is accepted too.
        if (subjects.length) {
          const areas = areasOf(r);
          const hit = subjects.some((s) => areas.includes(s) || r.subjects.includes(s));
          if (!hit) return false;
        }
        if (funding.length && !funding.includes(fundingOf(r))) return false;
        if (!needle) return true;
        return (
          r.name.toLowerCase().includes(needle) ||
          r.country.toLowerCase().includes(needle) ||
          r.subjects.some((s) => s.toLowerCase().includes(needle))
        );
      })
      // qsSort, never qsRank: "NR" and "1001-1200" are not numbers.
      .sort((a, b) => a.qsSort - b.qsSort || a.name.localeCompare(b.name));
  }, [q, countries, regions, subjects, funding]);

  const active = [
    ...countries.map((v) => ["country", v]),
    ...regions.map((v) => ["region", v]),
    ...subjects.map((v) => ["subject", v]),
    ...funding.map((v) => ["funding", v]),
  ];

  return (
    <CounsellingShell nav={<AbroadNav current="universities" />}>
      <nav className="ac-crumb" aria-label="Breadcrumb">
        <Link to="/admission/abroad">Admission Abroad</Link>
        <span aria-hidden="true"> / </span>
        <span>Universities</span>
      </nav>

      <header className="ac-band">
        <h1 className="ac-h1">Universities abroad</h1>
        <p className="ac-sub">
          {ABROAD_100.length} QS-ranked universities across {facets.country.length} countries —
          postgraduate subject areas, published tuition references and official application links.
        </p>
      </header>

      <div className="sc-search sc-search-hero">
        <input
          aria-label="Search universities"
          value={q}
          placeholder="University, country or subject…"
          onChange={(e) => {
            const next = new URLSearchParams(params);
            if (e.target.value) next.set("q", e.target.value); else next.delete("q");
            setParams(next, { replace: true });
          }}
        />
      </div>

      <section className="ab-browse" aria-label="Browse universities abroad">
        <h2 className="ab-h2">Narrow it down</h2>
        <p className="ab-lede">Browse by destination, region, subject or type.</p>

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
            const list = listFor(tab);
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
                onClick={() => toggle(key, listFor(key), value)}
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

      {/* Provenance belongs on the page, not in a footnote nobody reads. */}
      <p className="ab-source">
        Source: QS World University Rankings {ABROAD_100[0].qsEdition} and official university
        pages. Tuition is shown with its evidence label and is not verified for every programme —
        always confirm current details before applying.
      </p>

      <Drawer row={open} onClose={() => setOpen(null)} />
    </CounsellingShell>
  );
}
