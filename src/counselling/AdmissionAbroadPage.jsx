// PLACEMENT: src/counselling/AdmissionAbroadPage.jsx   (landing/frontend app)
//
// Admission Abroad -> HOME, at /admission/abroad. Built to the board at
// claude.ai/artifact/4nxDHtLVf28SB9DTNzFxga#artboard-e1ccdaae93d6, read in
// the browser at full width on 2026-11-17.
//
// ── This screen used to be the directory as well ─────────────────────
// The board draws a four-tab product nav (Home / Universities / Countries /
// Guide) with HOME active here, and this screen shows only a five-row
// ranking PREVIEW beside an "All 100 universities ->" link. The 100-row
// filterable directory is therefore its own screen now,
// AbroadUniversitiesPage at /admission/abroad/universities — the same shape
// /admission/india and /admission/india/all already have on the India side.
//
// Before the split, AbroadNav pointed BOTH "Home" and "Universities" here,
// because without the board I had read the bar as the site nav and mapped
// Home to "/". The board settles it: the bar is the product's own.
//
// DEEP LINKS: ?country= / ?region= / ?subject= / ?q= were shareable filtered
// views of the directory. They now FORWARD to the directory route rather
// than landing on a hero that silently ignores them.
//
// ── Where this deliberately does NOT match the board ─────────────────
// Owner decision 2026-11-17, same rule as the India overview: print what the
// data supports, and treat the rest as a data task.
//   * "697 guide topics" — the board's third stat. Nothing in the repo can
//     compute it. The third tile reports world regions, which is derived.
//   * "56 country guides" in the sub-copy. data/abroadCountries.js holds 47;
//     the supplied source text ran out mid-Israel. It prints the real length
//     and becomes 56 by itself when guidesAbroad.js lands.
//   * The board's "Funding" browse tab. There is no funding or scholarship
//     field in the dataset — its read-me lists "confirmed scholarship" as
//     explicitly out of scope — and a filter that silently matched nothing
//     would be worse than its absence.

import React, { useMemo } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import CounsellingShell from "./CounsellingShell";
import AbroadNav from "./AbroadNav";
import { ABROAD_100 } from "./data/abroad100";
import { ABROAD_COUNTRIES } from "./data/abroadCountries";
import { evidenceTone } from "./abroadShared";

const DIRECTORY = "/admission/abroad/universities";
const POPULAR = ["United States", "United Kingdom", "Canada", "Australia", "Germany"];

const BROWSE_TABS = [
  ["country", "Country"],
  ["region", "Region"],
  ["subject", "Subject"],
];

export default function AdmissionAbroadPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

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

  // The board's preview: the top five by QS, then "All 100 universities ->".
  const preview = useMemo(
    () => [...ABROAD_100].sort((a, b) => a.qsSort - b.qsSort || a.name.localeCompare(b.name)).slice(0, 5),
    []
  );

  const [tab, setTab] = React.useState("country");
  const facetHref = (key, value) => `${DIRECTORY}?${key}=${encodeURIComponent(value)}`;

  // A pre-split deep link is a request for the DIRECTORY, not for this hero.
  // Forwarded whole, so ?country=Germany&subject=... still lands filtered.
  const qs = params.toString();
  if (qs) return <Navigate to={`${DIRECTORY}?${qs}`} replace />;

  return (
    <CounsellingShell nav={<AbroadNav current="home" />}>
      <div className="ai-hero ab-hero">
        <span className="ab-badge">Study abroad · QS rankings {ABROAD_100[0].qsEdition}</span>
        <h1 className="sc-h1">Admission <em>abroad</em></h1>
        <p className="ab-sub">
          {ABROAD_100.length} top QS-ranked universities across {facets.country.length} countries —
          postgraduate courses, tuition fees and application planning, plus{" "}
          {ABROAD_COUNTRIES.length} country guides.
        </p>

        <form
          className="sc-search sc-search-hero"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            // navigate(), not window.location — a full reload would throw
            // away the SPA and re-fetch the whole bundle.
            const term = String(new FormData(e.currentTarget).get("q") || "").trim();
            navigate(DIRECTORY + (term ? `?q=${encodeURIComponent(term)}` : ""));
          }}
        >
          <input name="q" aria-label="Search universities" placeholder="University, country or subject" />
          <button type="submit" className="sc-search-go">Search</button>
        </form>

        <div className="sc-tags ab-popular">
          <span className="ab-popular-label">Popular:</span>
          {POPULAR.map((c) => (
            <Link key={c} className="sc-fchip" to={facetHref("country", c)}>{c}</Link>
          ))}
        </div>

        {/* Provenance belongs on the page, not in a footnote nobody reads. */}
        <p className="ab-source">
          Source: QS World University Rankings {ABROAD_100[0].qsEdition} and official university
          pages. Tuition is shown with its evidence label and is not verified for every programme —
          always confirm current details before applying.
        </p>

        {/* The board's third tile is "697 guide topics". Nothing here can
            derive it, so this reports world regions, which is real. */}
        <div className="cf-stats ai-stats">
          <Link className="cf-stat" to={DIRECTORY}>
            <span className="cf-stat-value">{ABROAD_100.length}</span>
            <span className="cf-stat-label">universities</span>
          </Link>
          <Link className="cf-stat" to="/admission/abroad/countries">
            <span className="cf-stat-value">{facets.country.length}</span>
            <span className="cf-stat-label">countries</span>
          </Link>
          <Link className="cf-stat" to={`${DIRECTORY}?tab=region`}>
            <span className="cf-stat-value">{facets.region.length}</span>
            <span className="cf-stat-label">world regions</span>
          </Link>
        </div>
      </div>

      <section className="ab-browse" aria-label="Browse universities abroad">
        <div className="in-kicker">Browse</div>
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

        {/* Facets LINK into the directory rather than filtering in place —
            this screen holds no filter state at all now. */}
        <div className="ab-facet-grid">
          {facets[tab].slice(0, 4).map(([value, count]) => (
            <Link key={value} className="sc-card ab-facet" to={facetHref(tab, value)}>
              <span className="ab-facet-name">{value}</span>
              <span className="ab-facet-count">
                {count} {count === 1 ? "university" : "universities"}
              </span>
            </Link>
          ))}
        </div>
        <div className="ab-viewall-row">
          <Link className="sc-btn ghost" to={`${DIRECTORY}?tab=${tab}`}>
            View all ({facets[tab].length})
          </Link>
        </div>
      </section>

      <section className="ab-rankings">
        <div className="ab-rankings-head">
          <div>
            <div className="in-kicker">Rankings</div>
            <h2 className="ab-h2">Top-ranked by QS {ABROAD_100[0].qsEdition}</h2>
            <p className="ab-lede">
              The world's highest-ranked universities in QS World University Rankings{" "}
              {ABROAD_100[0].qsEdition}.
            </p>
          </div>
          <Link className="in-allink" to={DIRECTORY}>All {ABROAD_100.length} universities →</Link>
        </div>

        <ul className="ai-list ab-list">
          {preview.map((r) => (
            <li key={r.id}>
              <Link className="sc-card ai-row ab-row" to={`${DIRECTORY}?q=${encodeURIComponent(r.name)}`}>
                <span className={`ai-rank ab-rank${r.ranked ? "" : " unranked"}`}>
                  {r.ranked ? `#${r.qsRank}` : "NR"}
                </span>
                <span className="ai-row-main">
                  <span className="ab-row-name">{r.name}</span>
                  <span className="ab-row-meta">
                    {[r.area, r.country].filter(Boolean).join(", ")} · {r.type}
                  </span>
                </span>
                <span className="ab-row-fee">
                  <span className={`ab-pill ab-pill-${evidenceTone(r.feeEvidence)}`}>
                    {r.feeEvidence}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="in-process" aria-label="How admission abroad works">
        <h2 className="ab-h2">How admission abroad works</h2>
        <p className="ab-lede">Six steps from choosing a course to landing on campus.</p>
        <ol className="in-steps in-steps-6">
          {[
            ["Choose your course", "Match your academic background and career goals to the right programme and study level."],
            ["Pick a destination", "Compare countries on cost, intakes, visa rules, work rights and career outcomes."],
            ["Shortlist universities", "Use rankings, course content, fees and entry requirements to build a balanced list."],
            ["Check eligibility & tests", "Confirm grades, IELTS/TOEFL/PTE, GRE/GMAT and documents for each programme."],
            ["Apply & fund", "Submit SOPs, LORs and applications; plan scholarships, loans and proof of funds."],
            ["Visa & travel", "Accept your offer, apply for the student visa and prepare to move."],
          ].map(([title, detail], i) => (
            <li key={title}>
              <span className="in-step-n">{i + 1}</span>
              <span className="in-step-title">{title}</span>
              <span className="in-step-detail">{detail}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="sc-card in-guidance">
        <div>
          <div className="in-kicker">Guidance</div>
          <h2 className="ab-h2">Planning to study abroad?</h2>
          <p className="ab-lede">
            A ShikshaCom counsellor can help you pick a country and course, shortlist
            universities, prepare documents and plan your visa timeline.
          </p>
          <ul className="in-ticks">
            <li>Country &amp; course shortlisting</li>
            <li>SOP, LOR &amp; document review</li>
            <li>Visa timeline planning</li>
          </ul>
          <Link className="sc-btn green" to="/counselling/counsellors">Talk to a counsellor →</Link>
        </div>

        <div>
          <div className="in-kicker">Before you apply</div>
          <ul className="in-checks">
            <li>
              Start 12–18 months before your intake — shortlist courses, check entry
              requirements and book IELTS/TOEFL/PTE and GRE/GMAT early.
            </li>
            <li>
              Apply to a balanced list of universities: a few ambitious, several realistic and
              one or two safe choices.
            </li>
            <li>
              Plan your budget for tuition, living costs, visa fees and health cover, and apply
              for scholarships alongside admission.
            </li>
            <li>
              Keep documents ready: transcripts, test scores, SOP, LORs, CV, passport and proof
              of funds.
            </li>
            <li>
              Visa and work rules change often — confirm them on the official immigration
              website before you accept an offer.
            </li>
          </ul>

          {/* The source sheet is explicit about what it did and did not check;
              those numbers belong where a reader can see them, not only in a
              generated file's header. */}
          <details className="in-about">
            <summary>About this data</summary>
            <ul>
              <li>
                Rankings: QS World University Rankings {ABROAD_100[0].qsEdition}, published June 2026.
                This is an overall institutional ranking, not a programme ranking.
              </li>
              <li>
                <b>{ABROAD_100.filter((r) => !r.ranked).length}</b> of the {ABROAD_100.length} are
                not placed in that overall list, and{" "}
                <b>{ABROAD_100.filter((r) => /-/.test(r.qsRank)).length}</b> sit in a band rather
                than at a single position. Both are shown as the source gives them.
              </li>
              <li>
                Tuition is shown with the source’s own evidence label. Roughly half the entries
                carry a numeric amount; the rest give a fee policy or state that the value was
                not verified. Fee periods differ between institutions and are not comparable.
              </li>
              <li>
                Subject lists are main postgraduate areas, not a catalogue of every degree,
                module or intake.
              </li>
              <li>
                India is excluded from this sheet by its own design — see the India directory
                for NIRF-ranked institutions.
              </li>
            </ul>
          </details>
        </div>
      </section>

    </CounsellingShell>
  );
}
