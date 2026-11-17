// PLACEMENT: src/counselling/AbroadCountriesPage.jsx   (landing/frontend app)
//
// Admission Abroad → Countries. Built to the design board exported as
// `~/Downloads/Admission in India design.pdf` (the filename says India; the
// board is Admission Abroad).
//
// ── What the board specifies, and is built here ──────────────────────
//   * breadcrumb `Admission Abroad / Country guides`
//   * a cream band carrying H1 "Country guides" and the destinations line
//   * a "Find a country" search beside eight region chips, "All regions" first
//   * a three-up card grid: flag · country · rank line · blurb · Intakes line
//
// ── The one number that is NOT copied from the board ─────────────────
// The board's subtitle reads "56 destinations". `abroadCountries.js` holds 47
// — the supplied source text ran out mid-Israel and never reached the Africa
// or Latin America entries. This prints the real length rather than 56, so
// the page cannot advertise nine destinations it does not have. When
// `guidesAbroad.js` lands and the file reaches 56, this renders 56 with no
// code change.
//
// The Africa and Latin America chips are rendered regardless, because they
// are on the board. They currently filter to an empty set, which the empty
// state names explicitly instead of showing a blank grid.
//
// The "N QS-ranked universities" line is counted from ABROAD_100 at render,
// never stored — so this tab and the Universities tab cannot disagree. All 47
// derived counts were checked against the board and every one matches.

import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CounsellingShell from "./CounsellingShell";
import ScribbleIcon from "../components/icons/ScribbleIcon";
import { ABROAD_100 } from "./data/abroad100";
import { ABROAD_COUNTRIES, COUNTRY_REGIONS } from "./data/abroadCountries";

const ALL = "All regions";

// One pass over the 100 institutions, not one per card.
const QS_TALLY = ABROAD_100.reduce((acc, r) => {
  acc[r.country] = (acc[r.country] || 0) + 1;
  return acc;
}, {});

function rankLine(c) {
  const n = QS_TALLY[c.qsKey || c.name] || 0;
  if (!n) return "Country guide";
  return `${n} QS-ranked universit${n === 1 ? "y" : "ies"}`;
}

export default function AbroadCountriesPage() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState("");

  // The region rides the URL so a chip is shareable and the back button steps
  // between them — the same `?region=` idiom AdmissionAbroadPage already uses
  // for its browse tabs. An unknown value falls back to All regions rather
  // than rendering an empty grid for a typo.
  const raw = params.get("region");
  const region = COUNTRY_REGIONS.includes(raw) ? raw : ALL;

  const pickRegion = (next) => {
    const p = new URLSearchParams(params);
    if (next === ALL) p.delete("region");
    else p.set("region", next);
    setParams(p, { replace: true });
  };

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ABROAD_COUNTRIES.filter((c) => {
      if (region !== ALL && c.region !== region) return false;
      if (!needle) return true;
      return (c.name + " " + c.blurb).toLowerCase().includes(needle);
    });
  }, [q, region]);

  return (
    <CounsellingShell>
      <nav className="ac-crumb" aria-label="Breadcrumb">
        <Link to="/admission/abroad">Admission Abroad</Link>
        <span aria-hidden="true"> / </span>
        <span>Country guides</span>
      </nav>

      <header className="ac-band">
        <h1 className="ac-h1">Country guides</h1>
        <p className="ac-sub">
          {ABROAD_COUNTRIES.length} destinations · education system, costs,
          intakes, visas, work rights and careers
        </p>
      </header>

      <div className="ac-controls">
        <div className="sc-search ac-find">
          <ScribbleIcon name="search" size={16} color="rgba(14,28,15,.45)" />
          <input
            aria-label="Find a country"
            placeholder="Find a country"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="ac-chips" role="tablist" aria-label="Region">
          {COUNTRY_REGIONS.map((r) => (
            <button
              key={r}
              type="button"
              role="tab"
              aria-selected={region === r}
              className={`ac-chip${region === r ? " on" : ""}`}
              onClick={() => pickRegion(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="sc-note ac-empty">
          {region === ALL
            ? `No country matches “${q.trim()}”.`
            : `No ${region} guide has been published yet.`}{" "}
          <button type="button" className="ac-linkbtn" onClick={() => { setQ(""); pickRegion(ALL); }}>
            Show all {ABROAD_COUNTRIES.length} destinations
          </button>
        </p>
      ) : (
        <div className="ac-grid">
          {shown.map((c) => (
            <article key={c.name} className="ac-card">
              <div className="ac-card-head">
                {c.flag && <span className="ac-flag" aria-hidden="true">{c.flag}</span>}
                <div>
                  <h2 className="ac-name">{c.name}</h2>
                  <p className="ac-rank">{rankLine(c)}</p>
                </div>
              </div>
              <p className="ac-blurb">{c.blurb}</p>
              {c.intakes && (
                <p className="ac-intakes">
                  <span className="ac-intakes-l">Intakes:</span> {c.intakes}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </CounsellingShell>
  );
}
