// PLACEMENT: src/counselling/AbroadUniversityDetailPage.jsx   (NEW FILE)
//
// Admission Abroad → one university, at
// /admission/abroad/universities/:slug. Built to the board
// (claude.ai/artifact/4nxDHtLVf28SB9DTNzFxga#artboard-e1ccdaae93d6), read by
// clicking "View details" on MIT and Imperial College London and driving
// every tab, not by screenshotting the resting state.
//
// ── Why this exists ───────────────────────────────────────────────────
// The board gives every university its own routable page — breadcrumb,
// 4 tabs (Overview/Courses/Fees/Admission), a "Similar universities" rail
// and a country-context sidebar. The live site opened the SAME content
// (verified: every sentence below matches a field already shown there,
// word for word) in a `cf-drawer` instead — no URL, no Similar
// universities, no country sidebar. This page is that content restructured
// into the board's shape; no new data was written, only arranged.
//
// ── Everything here is a field already on the row, or boilerplate the
//    board itself repeats verbatim across universities ──────────────────
//   * Overview paragraph    = row.overview        (unchanged from Drawer)
//   * Courses intro         = row.academic         (unchanged from Drawer)
//   * Admission intro       = row.applying         (unchanged from Drawer)
//   * Fees intro, the 4 Admission cards' one-line blurbs = static copy,
//     because the board repeats the SAME sentences on MIT and Imperial —
//     these are the board's own boilerplate, not a claim about one school.
//
// ── Similar universities ────────────────────────────────────────────────
// Verified against TWO cards, not inferred from one: MIT → 5 other US
// universities by QS rank; Imperial → the other 5 UK universities by QS
// rank (UK only has 6 total, so that case alone wouldn't have distinguished
// "all others" from "top 5" — checking MIT, where the US has 10, did).
// Rule: same country, qsSort order, top 5, excluding self.
//
// ── QS tie marker ───────────────────────────────────────────────────────
// Same rule as AbroadCountryPage/AdmissionAbroadPage: counted across all
// 100 rows, not per-country. Known to under-claim ties QS holds outside our
// 100 (Manchester prints "#40" here, "=40" on the board) — the safe
// direction, not a bug to chase; see AbroadCountryPage's header comment.

import React, { useMemo, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import CounsellingShell from "./CounsellingShell";
import AbroadNav from "./AbroadNav";
import AdmissionHelpModal from "./AdmissionHelpModal";
import { useAbroadCompare } from "./useAbroadCompare";
import { ABROAD_100 } from "./data/abroad100";
import { ABROAD_COUNTRIES } from "./data/abroadCountries";
import { chipAreasOf, uniSlug, countrySlug, EXTRA_FLAGS } from "./data/abroadFacets";

const DIRECTORY = "/admission/abroad/universities";
const COUNTRIES = "/admission/abroad/countries";

const TABS = [
  ["overview", "Overview"],
  ["courses", "Courses"],
  ["fees", "Fees"],
  ["admission", "Admission"],
];

// The board's own repeated sentence, not a per-university claim.
const FEES_INTRO =
  "Postgraduate tuition from the university's official fee pages. Fees differ by " +
  "programme, fee status and year — always confirm the current amount before applying.";

// Same four cards, same one-line blurbs, on both universities the board was
// driven on — this is the board's generic admission-planning copy, not
// something to vary per school.
const ADMISSION_CARDS = [
  ["Eligibility & requirements", "Academic, language-test and document requirements explained."],
  ["Application process", "SOPs, LORs, CVs, portfolios, deadlines and interviews."],
  ["Scholarships & funding", "Scholarships, education loans and proof of funds."],
  ["Student visa", "Offer acceptance, visa documents, biometrics and arrival."],
];

const FactRow = ({ label, value, href }) => (
  <div className="abu-fact">
    <span className="abu-fact-label">{label}</span>
    <span className="abu-fact-value">
      {href ? <a href={href} target="_blank" rel="noreferrer">{value} ↗</a> : value}
    </span>
  </div>
);

export default function AbroadUniversityDetailPage() {
  const { slug } = useParams();
  const [params, setParams] = useSearchParams();
  const tab = TABS.some(([k]) => k === params.get("tab")) ? params.get("tab") : "overview";
  const [helpOpen, setHelpOpen] = useState(false);
  const { inCompare, toggle } = useAbroadCompare();

  const row = useMemo(() => ABROAD_100.find((r) => uniSlug(r) === slug), [slug]);

  const flagOf = useMemo(() => {
    const m = new Map();
    ABROAD_COUNTRIES.forEach((c) => { if (c.flag) m.set(c.qsKey || c.name, c.flag); });
    Object.entries(EXTRA_FLAGS).forEach(([n, f]) => { if (!m.has(n)) m.set(n, f); });
    return m;
  }, []);

  const tiedRanks = useMemo(
    () => ABROAD_100.reduce((m, r) => m.set(r.qsRank, (m.get(r.qsRank) || 0) + 1), new Map()),
    []
  );

  // An unknown slug is a wrong URL, not an error worth a page — same
  // precedent as AbroadCountryPage.
  if (!row) return <Navigate to={DIRECTORY} replace />;

  const country = ABROAD_COUNTRIES.find((c) => (c.qsKey || c.name) === row.country);
  const rankLabel = row.ranked ? `${(tiedRanks.get(row.qsRank) || 0) > 1 ? "=" : "#"}${row.qsRank}` : "NR";

  const similar = ABROAD_100
    .filter((r) => r.country === row.country && r.id !== row.id)
    .sort((a, b) => a.qsSort - b.qsSort)
    .slice(0, 5);

  const setTab = (next) => {
    const p = new URLSearchParams(params);
    if (next === "overview") p.delete("tab");
    else p.set("tab", next);
    setParams(p, { replace: true });
  };

  return (
    <CounsellingShell nav={<AbroadNav current="universities" />}>
      <nav className="ac-crumb" aria-label="Breadcrumb">
        <Link to="/admission/abroad">Admission Abroad</Link>
        <span aria-hidden="true"> / </span>
        <Link to={DIRECTORY}>Universities</Link>
        <span aria-hidden="true"> / </span>
        <span>{row.name}</span>
      </nav>

      <header className="abu-head">
        <span className="abu-flag" aria-hidden="true">{flagOf.get(row.country)}</span>
        <div className="abu-head-tx">
          <h1 className="abu-h1">{row.name}</h1>
          <p className="abu-sub">
            {[row.area, row.country].filter(Boolean).join(", ")} · {row.type}
            {row.website && (
              <>
                {" · "}
                <a href={row.website} target="_blank" rel="noreferrer">
                  {row.website.replace(/^https?:\/\//, "").replace(/\/$/, "")} ↗
                </a>
              </>
            )}
          </p>
        </div>
        <div className="abu-head-side">
          <div className="abu-rankbox">
            <b>{rankLabel}</b>
            <small>QS World Rankings {row.qsEdition}</small>
          </div>
          <div className="abu-head-btns">
            <button className="sc-btn abu-help" onClick={() => setHelpOpen(true)}>Get admission help</button>
            <button className="sc-btn ghost" onClick={() => toggle(row.id)}>
              {inCompare(row.id) ? "✓ In compare" : "+ Add to compare"}
            </button>
          </div>
        </div>
      </header>

      <AdmissionHelpModal
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        title="Get admission help"
        subtitle={`Share your details and we'll help you plan your application to ${row.name}.`}
        defaultCountry={row.country}
        universityName={row.name}
      />

      <div className="sii-tabs" role="tablist" aria-label={row.name}>
        {TABS.map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            className={`sii-tab${tab === key ? " on" : ""}`}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="abu-grid">
        <div className="abu-main">
          {tab === "overview" && (
            <section className="abu-card">
              <h2>About {row.name}</h2>
              <div className="abu-facts">
                <FactRow label="Country" value={`${flagOf.get(row.country) || ""} ${row.country}`} />
                <FactRow label="State / region" value={row.area || "—"} />
                <FactRow label="Region" value={row.region} />
                <FactRow label="Institution type" value={row.type} />
                <FactRow label={`QS World Rankings ${row.qsEdition}`} value={rankLabel} />
                {row.website && <FactRow label="Official website" value={row.website.replace(/^https?:\/\//, "").replace(/\/$/, "")} href={row.website} />}
              </div>
              <p className="abu-overview">{row.overview}</p>
              <p className="abu-source">Ranking source: QS institution profile</p>
            </section>
          )}

          {tab === "courses" && (
            <section className="abu-card">
              <h2>Postgraduate courses</h2>
              <p>{row.academic}</p>
              <h3 className="abu-subh">Main subject areas</h3>
              <div className="abu-chips">
                {row.subjects.map((s) => <span key={s} className="sc-fchip ab-subject">{s}</span>)}
              </div>
              <h3 className="abu-subh">Subject groups</h3>
              <div className="abu-chips">
                {chipAreasOf(row).map((a) => (
                  <Link key={a} className="abu-group-chip" to={`${DIRECTORY}?subject=${encodeURIComponent(a)}`}>
                    {a} →
                  </Link>
                ))}
              </div>
              {row.catalogue && (
                <a className="sc-btn green" href={row.catalogue} target="_blank" rel="noreferrer">
                  Course catalogue →
                </a>
              )}
            </section>
          )}

          {tab === "fees" && (
            <section className="abu-card">
              <h2>Tuition &amp; fees</h2>
              <p>{FEES_INTRO}</p>
              <div className="abu-fee-card">
                <div className="abu-fee-head">
                  <span>Fee reference{row.feeYear ? ` · ${row.feeYear}` : ""}</span>
                  <span className="abu-fee-badge">{row.feeEvidence}</span>
                </div>
                <p>{row.feeDetail}</p>
              </div>
              <div className="abu-cta-row">
                {row.feeSource && (
                  <a className="sc-btn green" href={row.feeSource} target="_blank" rel="noreferrer">
                    Official fee source ↗
                  </a>
                )}
                <Link className="sc-btn ghost" to="/counselling/guides/study-abroad?chapter=8-scholarships-financial-planning">
                  Scholarships &amp; financial planning →
                </Link>
              </div>
            </section>
          )}

          {tab === "admission" && (
            <section className="abu-card">
              <h2>Admission planning</h2>
              <p>{row.applying}</p>
              <div className="abu-admcards">
                {ADMISSION_CARDS.map(([title, blurb]) => (
                  <div key={title} className="abu-admcard">
                    <b>{title}</b>
                    <p>{blurb}</p>
                  </div>
                ))}
              </div>
              {country && (
                <p className="abu-callout">
                  <span aria-hidden="true">{country.flag} </span>
                  <b>Studying in {row.country}?</b> Our country guide covers the education
                  system, costs, visas, work rights and life after graduation.{" "}
                  <Link to={`${COUNTRIES}/${countrySlug(country)}`}>Read the guide →</Link>
                </p>
              )}
            </section>
          )}
        </div>

        <aside className="abu-side">
          <div className="abu-sidecard abu-sidecard-cta">
            <b>Need help applying here?</b>
            <p>A ShikshaCom counsellor can review your profile, documents, tests and visa timeline.</p>
            <Link className="sc-btn white" to="/counselling/counsellors">Talk to counsellor</Link>
          </div>

          {country && (
            <div className="abu-sidecard">
              <h3><span aria-hidden="true">{country.flag} </span>{row.country} at a glance</h3>
              <div className="abu-glance">
                <b>Intakes</b>
                <p>{country.intakes || `Not published yet for ${row.country}.`}</p>
              </div>
              <div className="abu-glance">
                <b>Student visa</b>
                <p>{country.visa || `Not published yet for ${row.country}.`}</p>
              </div>
              <div className="abu-glance">
                <b>Work while studying</b>
                <p>{country.work || `Not published yet for ${row.country}.`}</p>
              </div>
              <Link className="abu-glance-link" to={`${COUNTRIES}/${countrySlug(country)}`}>
                Full country guide →
              </Link>
            </div>
          )}

          {similar.length > 0 && (
            <div className="abu-sidecard">
              <h3>Similar universities</h3>
              <ul className="abu-similar">
                {similar.map((r) => (
                  <li key={r.id}>
                    <Link to={`${DIRECTORY}/${uniSlug(r)}`}>
                      <span aria-hidden="true">{flagOf.get(r.country)} </span>
                      <b>{r.name}</b>
                      <small>
                        {r.ranked ? `${(tiedRanks.get(r.qsRank) || 0) > 1 ? "=" : "#"}${r.qsRank}` : "NR"} · {r.country}
                      </small>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <p className="ab-source">
        Rankings: QS World University Rankings {row.qsEdition}. Course and fee details come
        from official university pages; visa and work rules change often — always confirm
        with the university and the official immigration website before applying.
      </p>
    </CounsellingShell>
  );
}
