// PLACEMENT: src/counselling/AbroadCountryPage.jsx   (NEW FILE)
//
// Admission Abroad → a single destination, at
// /admission/abroad/countries/:slug. Built to the board
// (claude.ai/artifact/4nxDHtLVf28SB9DTNzFxga#artboard-e1ccdaae93d6), read by
// opening United Kingdom on it.
//
// This is the page the Countries grid has been advertising since it shipped:
// 56 cards that went nowhere, under copy promising a comparison of "cost,
// intakes, visa rules, work rights and career outcomes".
//
// ── Board order, which is this file's order ──────────────────────────
//   breadcrumb · hero (flag · "Study in X" · blurb · Talk to a counsellor)
//   · four fact cards · "QS-ranked universities in X" · IN THIS GUIDE
//   · the rankings/currency footnote
//
// ── Two data gaps, deliberately VISIBLE rather than papered over ─────
// 1. THE FACT CARDS. The board fills all four. `abroadCountries.js` carries
//    only `intakes` — the UK's text on the board is that field verbatim, so
//    the board is reading the same dataset with three more columns. `cost`,
//    `visa` and `work` do not exist on any of the 56 entries.
//    Rather than hide the cards (which would quietly redesign the page) or
//    invent text (which on visa and work rules would be actively harmful),
//    each renders a named "not published yet" state. A missing field should
//    look missing, and these three are a content task.
//
// 2. THE "IN THIS GUIDE" RAIL. The board lists the country's 16-section
//    guide — Country Overview, Education System, … Who Should Consider X.
//    That content exists: it is chapter 13 of the Study Abroad guide, 1,850
//    sections covering ~53 destinations. It is NOT addressable per country.
//    Only 22 of those destinations kept a parseable header through the
//    import (13.1, 13.5, 13.22… the numbering jumps), so there is no
//    reliable boundary to slice on, and the chapter is a 1.9 MB payload that
//    must not be fetched to render one country anyway. The fix is upstream:
//    split chapter 13 into per-country chapters at import time, which needs
//    the source document to mark every country the same way. Until then the
//    rail links to the chapter rather than faking a per-country index.

import React, { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import CounsellingShell from "./CounsellingShell";
import AbroadNav from "./AbroadNav";
import { ABROAD_100 } from "./data/abroad100";
import { ABROAD_COUNTRIES } from "./data/abroadCountries";
import { countrySlug } from "./data/abroadFacets";

const COUNTRIES = "/admission/abroad/countries";
const GUIDE_CHAPTER = "/counselling/guides/study-abroad?chapter=13-country-wise-education-guide";

const Ic = ({ d }) => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor"
       strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);

// The board's four, in its order and with its labels.
const FACTS = [
  {
    key: "intakes",
    label: "Intakes",
    icon: <Ic d={<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 11h18" /></>} />,
  },
  {
    key: "cost",
    label: "Cost of study",
    icon: <Ic d={<><circle cx="12" cy="12" r="9" /><path d="M12 7v10M14.5 9.5a2.5 2.5 0 0 0-5 .6c0 2.6 5 1.4 5 4a2.5 2.5 0 0 1-5 .4" /></>} />,
  },
  {
    key: "visa",
    label: "Student visa",
    icon: <Ic d={<><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h3" /></>} />,
  },
  {
    key: "work",
    label: "Work while studying",
    icon: <Ic d={<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /></>} />,
  },
];

export default function AbroadCountryPage() {
  const { slug } = useParams();

  const country = useMemo(
    () => ABROAD_COUNTRIES.find((c) => countrySlug(c) === slug),
    [slug]
  );

  // An unknown slug is a wrong URL, not an error worth a page — send the
  // reader to the grid they were trying to reach.
  if (!country) return <Navigate to={COUNTRIES} replace />;

  const qsKey = country.qsKey || country.name;
  const unis = ABROAD_100
    .filter((r) => r.country === qsKey)
    .sort((a, b) => a.qsSort - b.qsSort); // stable: ties keep dataset order

  // "=2" where QS ties, "#4" where it does not. Counted across ALL 100, not
  // within the country: Imperial ties with Stanford, which is American, so a
  // per-country tally would print "#2" and lose the tie.
  //
  // ⚠ KNOWN WRONG IN SOME CASES, and not fixable here. A QS tie is a fact
  // about QS's FULL table; this can only see the 100 rows we carry. Where a
  // university ties with one outside the 100 we print "#" and the board
  // prints "=" — Manchester is exactly that: alone at 40 in our data, "=40"
  // on the board. `qsRank` is a bare string with no tie marker, so the real
  // fix is upstream, in abroad100.js. Under-claiming a tie is the safe
  // direction of the two.
  const tiedRanks = ABROAD_100.reduce((m, r) => m.set(r.qsRank, (m.get(r.qsRank) || 0) + 1), new Map());
  const rankLabel = (r) =>
    !r.ranked ? "NR" : `${tiedRanks.get(r.qsRank) > 1 ? "=" : "#"}${r.qsRank}`;

  return (
    <CounsellingShell nav={<AbroadNav current="countries" />}>
      <nav className="ac-crumb" aria-label="Breadcrumb">
        <Link to="/admission/abroad">Admission Abroad</Link>
        <span aria-hidden="true"> / </span>
        <Link to={COUNTRIES}>Country guides</Link>
        <span aria-hidden="true"> / </span>
        <span>{country.name}</span>
      </nav>

      <header className="abc-hero">
        <span className="abc-flag" aria-hidden="true">{country.flag}</span>
        <div className="abc-hero-tx">
          <h1 className="abc-h1">Study in {country.name}</h1>
          {country.blurb && <p className="abc-blurb">{country.blurb}</p>}
        </div>
        <Link className="abc-cta" to="/counselling/counsellors">Talk to a counsellor</Link>
      </header>

      <div className="abc-facts">
        {FACTS.map((f) => {
          const value = country[f.key];
          return (
            <section key={f.key} className={`abc-fact${value ? "" : " empty"}`}>
              <h2 className="abc-fact-h">
                <span className="abc-fact-ic">{f.icon}</span>
                {f.label}
              </h2>
              {value
                ? <p>{value}</p>
                : <p className="abc-missing">Not published yet for {country.name}.</p>}
            </section>
          );
        })}
      </div>

      <section className="abc-unis">
        <h2 className="abc-h2">QS-ranked universities in {country.name}</h2>
        {unis.length === 0 ? (
          <p className="abc-missing">
            No university in this destination appears in the QS World University Rankings{" "}
            {ABROAD_100[0].qsEdition} overall table. That is a fact about the ranking, not
            about studying here —{" "}
            <Link to="/admission/abroad/universities">browse the full directory</Link>.
          </p>
        ) : (
          <ul className="abc-uni-grid">
            {unis.map((r) => (
              <li key={r.id}>
                <Link className="abc-uni" to={`/admission/abroad/universities?q=${encodeURIComponent(r.name)}`}>
                  <span className={`abc-uni-rank${r.ranked ? "" : " unranked"}`}>
                    {rankLabel(r)}
                  </span>
                  <span className="abc-uni-tx">
                    <b>{r.name}</b>
                    {r.area && <small>{r.area}</small>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* The board puts the country's 16-section guide here. See the header
          comment: chapter 13 is not addressable per country yet, so this
          links to the chapter rather than drawing a rail that cannot be
          filled. */}
      <section className="abc-guide">
        <h2 className="abc-h2">In this guide</h2>
        <p className="abc-missing">
          The full country-by-country guide — education system, study options, admission,
          English requirements, costs, scholarships, visa, work rights and life after
          graduation — is published as one chapter covering every destination. A
          per-destination index for {country.name} is not available yet.
        </p>
        <Link className="abc-guide-link" to={GUIDE_CHAPTER}>
          Open the country-wise education guide →
        </Link>
      </section>

      <p className="ab-source">
        Rankings: QS World University Rankings {ABROAD_100[0].qsEdition}. Course and fee
        details come from official university pages; visa and work rules change often —
        always confirm with the university and the official immigration website before
        applying.
      </p>
    </CounsellingShell>
  );
}
