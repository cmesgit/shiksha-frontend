// PLACEMENT: src/counselling/AbroadUniversitiesPage.jsx
//
// Admission Abroad → Universities, at /admission/abroad/universities.
//
// Rebuilt 2026-11-18 to the board
// (claude.ai/artifact/4nxDHtLVf28SB9DTNzFxga#artboard-e1ccdaae93d6), read by
// DRIVING it rather than screenshotting it. The previous version was a
// facet-tab grid over flat rows; the board is a two-column directory with a
// filter sidebar, a results toolbar and two card densities.
//
// ── What the board actually specifies, with the evidence ─────────────
//   * H1 is FACET-AWARE. Unfiltered it reads "Top universities abroad";
//     with a subject area, "Sciences & Mathematics universities abroad";
//     with a country, "Universities in United States". All three observed.
//   * The sub-line names the SORT, not a constant: "In QS World University
//     Rankings 2027 order" became "Sorted by country" when the sort changed.
//   * Sort has exactly three options — QS 2027 rank, Name A–Z, Country A–Z
//     (cycled with the keyboard; the select stops at the third).
//   * Sidebar counts are GLOBAL totals, not counts within the current
//     filter: picking United States left Europe at 41.
//   * The quick country chips are the country filter, not a separate one —
//     ticking United States lit the "USA" chip.
//
// ── Inferred, flagged as such ────────────────────────────────────────
// The board was never observed with a REGION or FUNDING filter alone, so
// those two H1 forms follow the country and subject patterns respectively.
// Everything else above was seen.
//
// ── Honesty rules this screen keeps (see data/abroad100.js) ──────────
//   * A fee is shown WITH its evidence label, verbatim; the chip is driven
//     by feeEvidence, never by "does this contain a digit".
//   * Fee periods are never annualised or compared.
//   * qsRank renders as given: "NR" stays "NR", "1001-1200" stays a range.
//     Sorting uses qsSort so neither masquerades as a position.

import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CounsellingShell from "./CounsellingShell";
import AbroadNav from "./AbroadNav";
import { ABROAD_100 } from "./data/abroad100";
import { ABROAD_COUNTRIES } from "./data/abroadCountries";
import { SUBJECT_AREAS, EXTRA_FLAGS, areasOf, chipAreasOf, fundingLabel, fundingOf, uniSlug } from "./data/abroadFacets";
import { csv, feeChip } from "./abroadShared";

// The board's row of shortcuts, in its order. Each is a COUNTRY filter —
// the label is the board's short form, the value is the dataset's name.
const QUICK = [
  ["USA", "United States"],
  ["UK", "United Kingdom"],
  ["Canada", "Canada"],
  ["Australia", "Australia"],
  ["Germany", "Germany"],
  ["Singapore", "Singapore"],
  ["Ireland", "Ireland"],
  ["France", "France"],
];

const SORTS = [
  ["qs", "QS 2027 rank", "In QS World University Rankings 2027 order"],
  ["name", "Name A–Z", "Sorted by name"],
  ["country", "Country A–Z", "Sorted by country"],
];

// Geographic, matching the Home screen's region rail rather than count order.
const REGION_ORDER = ["North America", "Europe", "Asia", "Oceania", "Middle East", "Africa", "Latin America"];

const TOP_N = 50;

const SELF = "/admission/abroad/universities";

export default function AbroadUniversitiesPage() {
  const [params, setParams] = useSearchParams();
  const [countryQuery, setCountryQuery] = useState("");
  // ?compare=<id> arrives from a university detail page's "+ Add to
  // compare" button, which has no compare tray of its own — this is the
  // tray, so the id is seeded in rather than lost on navigation.
  const [compare, setCompare] = useState(() => {
    const c = Number(params.get("compare"));
    return Number.isFinite(c) && c > 0 ? [c] : [];
  });

  const q = params.get("q") || "";
  const sort = params.get("sort") || "qs";
  const view = params.get("view") === "compact" ? "compact" : "detailed";
  const feeOnly = params.get("fee") === "published";
  const topOnly = params.get("top") === String(TOP_N);

  const countries = useMemo(() => csv(params.get("country")), [params]);
  const regions = useMemo(() => csv(params.get("region")), [params]);
  const subjects = useMemo(() => csv(params.get("subject")), [params]);
  const funding = useMemo(() => csv(params.get("funding")), [params]);

  const patch = (key, value) => {
    const next = new URLSearchParams(params);
    if (value && (Array.isArray(value) ? value.length : true)) {
      next.set(key, Array.isArray(value) ? value.join(",") : value);
    } else next.delete(key);
    setParams(next, { replace: true });
  };
  const listFor = (key) =>
    key === "country" ? countries : key === "region" ? regions : key === "funding" ? funding : subjects;
  const toggle = (key, value) => {
    const list = listFor(key);
    patch(key, list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
  };

  const edition = ABROAD_100[0].qsEdition;

  const flagOf = useMemo(() => {
    const m = new Map();
    ABROAD_COUNTRIES.forEach((c) => { if (c.flag) m.set(c.qsKey || c.name, c.flag); });
    Object.entries(EXTRA_FLAGS).forEach(([n, f]) => { if (!m.has(n)) m.set(n, f); });
    return m;
  }, []);

  // GLOBAL counts — the board keeps these fixed as filters are applied, so a
  // facet never reads "0" and becomes unpickable once you've narrowed.
  const counts = useMemo(() => {
    const tally = (fn) => {
      const m = new Map();
      ABROAD_100.forEach((r) => fn(r).forEach((v) => m.set(v, (m.get(v) || 0) + 1)));
      return m;
    };
    return {
      region: tally((r) => [r.region]),
      country: tally((r) => [r.country]),
      subject: tally(areasOf),
      funding: tally((r) => [fundingOf(r)]),
    };
  }, []);

  const regionList = useMemo(() => {
    const have = [...counts.region.keys()];
    return [...REGION_ORDER.filter((r) => have.includes(r)), ...have.filter((r) => !REGION_ORDER.includes(r))];
  }, [counts]);

  const countryList = useMemo(() => {
    const all = [...counts.country.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    const needle = countryQuery.trim().toLowerCase();
    return needle ? all.filter(([n]) => n.toLowerCase().includes(needle)) : all;
  }, [counts, countryQuery]);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const out = ABROAD_100.filter((r) => {
      if (countries.length && !countries.includes(r.country)) return false;
      if (regions.length && !regions.includes(r.region)) return false;
      // A ?subject= token may be either vocabulary: the browse cards send a
      // subject AREA, but ?subject=engineering was a live shareable link
      // before the areas existed and still has to resolve.
      if (subjects.length) {
        const areas = areasOf(r);
        if (!subjects.some((s) => areas.includes(s) || r.subjects.includes(s))) return false;
      }
      if (funding.length && !funding.includes(fundingOf(r))) return false;
      if (feeOnly && feeChip(r.feeEvidence).label !== "Published fee") return false;
      if (topOnly && !(r.qsSort <= TOP_N)) return false;
      if (!needle) return true;
      return (
        r.name.toLowerCase().includes(needle) ||
        r.country.toLowerCase().includes(needle) ||
        r.subjects.some((s) => s.toLowerCase().includes(needle))
      );
    });
    // qsSort, never qsRank: "NR" and "1001-1200" are not numbers.
    if (sort === "name") return out.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "country") return out.sort((a, b) => a.country.localeCompare(b.country) || a.qsSort - b.qsSort);
    // NO name tiebreak. Array.prototype.sort is stable, so equal qsSort keeps
    // dataset order — which is the order the board prints: Stanford above
    // Imperial at =2. Adding a tiebreak reverses that pair, and the Home
    // screen's five-row preview already relies on the same rule.
    return out.sort((a, b) => a.qsSort - b.qsSort);
  }, [q, countries, regions, subjects, funding, feeOnly, topOnly, sort]);

  const active = [
    ...countries.map((v) => ["country", v, v]),
    ...regions.map((v) => ["region", v, v]),
    ...subjects.map((v) => ["subject", v, v]),
    ...funding.map((v) => ["funding", v, fundingLabel(v)]),
  ];

  // "Top universities abroad" unless exactly ONE facet is active — with two
  // filters there is no honest single noun for the page, so it falls back.
  const heading = useMemo(() => {
    if (active.length !== 1) return "Top universities abroad";
    const [key, value] = active[0];
    if (key === "country" || key === "region") return `Universities in ${value}`;
    if (key === "funding") return `${fundingLabel(value)} abroad`;
    return `${value} universities abroad`;
  }, [active]);

  const sortNote = (SORTS.find(([k]) => k === sort) || SORTS[0])[2];
  const clearAll = () => {
    const next = new URLSearchParams();
    if (view === "compact") next.set("view", "compact");
    if (sort !== "qs") next.set("sort", sort);
    setParams(next, { replace: true });
    setCountryQuery("");
  };

  const Chk = ({ on, label, count, onChange }) => (
    <label className={`abd-chk${on ? " on" : ""}`}>
      <input type="checkbox" checked={on} onChange={onChange} />
      <span className="abd-chk-tx">{label}</span>
      {count != null && <span className="abd-chk-n">{count}</span>}
    </label>
  );

  return (
    <CounsellingShell nav={<AbroadNav current="universities" />}>
      <nav className="ac-crumb" aria-label="Breadcrumb">
        <Link to="/admission/abroad">Admission Abroad</Link>
        <span aria-hidden="true"> / </span>
        <span>Universities</span>
      </nav>

      <header className="ac-band">
        <h1 className="ac-h1">{heading}</h1>
        <p className="ac-sub">
          {rows.length} {rows.length === 1 ? "university" : "universities"} · {sortNote}
        </p>
      </header>

      <div className="abd-grid">
        <aside className="abd-side" aria-label="Filters">
          <div className="abd-side-head">
            <h2 className="abd-side-title">Filters</h2>
            <button className="abd-clear" onClick={clearAll}>Clear all</button>
          </div>

          <section className="abd-group">
            <h3 className="abd-group-h">Region</h3>
            {regionList.map((r) => (
              <Chk key={r} on={regions.includes(r)} label={r} count={counts.region.get(r)}
                   onChange={() => toggle("region", r)} />
            ))}
          </section>

          <section className="abd-group">
            <h3 className="abd-group-h">Country</h3>
            <input
              className="abd-find"
              placeholder="Find a country"
              aria-label="Find a country"
              value={countryQuery}
              onChange={(e) => setCountryQuery(e.target.value)}
            />
            <div className="abd-scroll">
              {countryList.length === 0 && <p className="abd-none">No country matches.</p>}
              {countryList.map(([n, c]) => (
                <Chk key={n} on={countries.includes(n)} label={n} count={c}
                     onChange={() => toggle("country", n)} />
              ))}
            </div>
          </section>

          <section className="abd-group">
            <h3 className="abd-group-h">Subject area</h3>
            <div className="abd-scroll">
              {SUBJECT_AREAS.map((s) => (
                <Chk key={s} on={subjects.includes(s)} label={s} count={counts.subject.get(s)}
                     onChange={() => toggle("subject", s)} />
              ))}
            </div>
          </section>

          <section className="abd-group">
            <h3 className="abd-group-h">Funding</h3>
            {["Public", "Private"].map((f) => (
              <Chk key={f} on={funding.includes(f)} label={f} count={counts.funding.get(f)}
                   onChange={() => toggle("funding", f)} />
            ))}
          </section>

          <section className="abd-group abd-group-plain">
            <Chk on={feeOnly} label="Published fee available"
                 onChange={() => patch("fee", feeOnly ? "" : "published")} />
            <Chk on={topOnly} label={`QS top ${TOP_N} only`}
                 onChange={() => patch("top", topOnly ? "" : String(TOP_N))} />
          </section>
        </aside>

        <div className="abd-main">
          <div className="abd-toolbar">
            <div className="abd-search">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
              </svg>
              <input
                aria-label="Search within results"
                placeholder="Search within results"
                value={q}
                onChange={(e) => patch("q", e.target.value)}
              />
            </div>
            <label className="abd-sort">
              <span>Sort</span>
              <select value={sort} onChange={(e) => patch("sort", e.target.value === "qs" ? "" : e.target.value)}>
                {SORTS.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
              </select>
            </label>
            <div className="abd-view" role="group" aria-label="Result density">
              <button className={`abd-view-b${view === "detailed" ? " on" : ""}`}
                      aria-pressed={view === "detailed"}
                      onClick={() => patch("view", "")}>Detailed</button>
              <button className={`abd-view-b${view === "compact" ? " on" : ""}`}
                      aria-pressed={view === "compact"}
                      onClick={() => patch("view", "compact")}>Compact</button>
            </div>
          </div>

          <div className="abd-quick">
            <button className={`abd-qchip${countries.length === 0 ? " on" : ""}`}
                    onClick={() => patch("country", "")}>All</button>
            {QUICK.map(([label, value]) => (
              <button key={value}
                      className={`abd-qchip${countries.includes(value) ? " on" : ""}`}
                      onClick={() => toggle("country", value)}>{label}</button>
            ))}
          </div>

          {active.length > 0 && (
            <div className="abd-active">
              {active.map(([key, value, label]) => (
                <button key={`${key}:${value}`} className="abd-pill" onClick={() => toggle(key, value)}>
                  {label} <span aria-hidden="true">×</span>
                  <span className="sr-only"> — remove filter</span>
                </button>
              ))}
              <button className="abd-clear" onClick={clearAll}>Clear all</button>
            </div>
          )}

          {rows.length === 0 ? (
            <div className="sc-empty">
              No universities match those filters.{" "}
              <button className="abd-linkbtn" onClick={clearAll}>Clear all</button>
            </div>
          ) : view === "compact" ? (
            <ul className="abd-rows">
              {rows.map((r) => {
                const fee = feeChip(r.feeEvidence);
                return (
                  <li key={r.id} className="abd-row">
                    <span className={`abd-rank${r.ranked ? "" : " unranked"}`}>
                      {r.ranked ? `#${r.qsRank}` : "NR"}
                    </span>
                    <span className="abd-row-tx">
                      <b>{r.name}</b>
                      <small>
                        <span aria-hidden="true">{flagOf.get(r.country)} </span>
                        {[r.area, r.country].filter(Boolean).join(", ")} · {r.type}
                      </small>
                    </span>
                    <span className={`abd-fee abd-fee-${fee.tone}`}>{fee.label}</span>
                    <label className="abd-cmp">
                      <input type="checkbox" checked={compare.includes(r.id)}
                             onChange={() => setCompare((c) =>
                               c.includes(r.id) ? c.filter((x) => x !== r.id) : [...c, r.id])} />
                      <span>Compare</span>
                    </label>
                    <Link className="abd-view-btn" to={`${SELF}/${uniSlug(r)}`}>View</Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className="abd-cards">
              {rows.map((r) => {
                const fee = feeChip(r.feeEvidence);
                return (
                  <li key={r.id} className="abd-card">
                    <span className="abd-card-flag" aria-hidden="true">{flagOf.get(r.country)}</span>
                    <div className="abd-card-body">
                      <div className="abd-card-chips">
                        <span className={`abd-qs${r.ranked ? "" : " unranked"}`}>
                          {r.ranked ? `QS #${r.qsRank}` : "QS NR"}
                        </span>
                        <span className="abd-chip-region">{r.region}</span>
                        <span className={`abd-fee abd-fee-${fee.tone}`}>{fee.label}</span>
                      </div>
                      <h3 className="abd-card-name">{r.name}</h3>
                      <p className="abd-card-meta">
                        {[r.area, r.country].filter(Boolean).join(", ")}
                        {r.website && (
                          <>
                            {" · "}
                            <a href={r.website} target="_blank" rel="noreferrer"
                               onClick={(e) => e.stopPropagation()}>
                              {r.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                            </a>
                          </>
                        )}
                      </p>
                      <div className="abd-card-areas">
                        {chipAreasOf(r).slice(0, 4).map((a) => (
                          <span key={a} className="abd-area">{a}</span>
                        ))}
                      </div>
                      <p className="abd-card-foot">
                        <span>{r.type}</span>
                        {r.feeYear && <span><b>Fee year:</b> {r.feeYear}</span>}
                      </p>
                    </div>
                    <div className="abd-card-cta">
                      <Link className="abd-btn-help" to="/counselling/counsellors">Get admission help</Link>
                      <Link className="abd-btn-view" to={`${SELF}/${uniSlug(r)}`}>View details</Link>
                      <label className="abd-cmp">
                        <input type="checkbox" checked={compare.includes(r.id)}
                               onChange={() => setCompare((c) =>
                                 c.includes(r.id) ? c.filter((x) => x !== r.id) : [...c, r.id])} />
                        <span>Add to compare</span>
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Provenance belongs on the page, not in a footnote nobody reads. */}
          <p className="ab-source">
            Source: QS World University Rankings {edition} and official university pages. Tuition is
            shown with its evidence label and is not verified for every programme — always confirm
            current details before applying.
          </p>
        </div>
      </div>
    </CounsellingShell>
  );
}
