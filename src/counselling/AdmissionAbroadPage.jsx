// PLACEMENT: src/counselling/AdmissionAbroadPage.jsx   (landing/frontend app)
//
// Admission Abroad → HOME, at /admission/abroad. Rebuilt 2026-11-18 to the
// board at claude.ai/artifact/4nxDHtLVf28SB9DTNzFxga#artboard-e1ccdaae93d6,
// read in a browser at full width rather than inferred from a PDF export.
//
// Board order, which is this file's order:
//   hero · stats band · browse · rankings · popular destinations · process ·
//   the complete guide · guidance · provenance
//
// ── Every number on this screen is DERIVED ───────────────────────────
// Nothing here is typed in from the board. The university and country
// totals count `abroad100.js` / `abroadCountries.js` at render; the guide's
// phase and topic counts come from the CMS over the wire. So the page
// cannot drift from the data, and cannot claim what the data does not hold.
//
// Two places it therefore prints a different figure from the board, both
// the "refuse a number the data cannot support" rule, not an oversight:
//   * The board's GUIDE block says "16 phases and 697 topics". The imported
//     guide has 17 phases — the board's 16 is only reachable by dropping a
//     phase whose ~1,850 sections then land in the wrong chapter (see the
//     manifest's note on PHASE 13) — and its own topic total is what the
//     API reports, not 697.
//   * The board draws a fourth browse tab, "Funding". There is no funding
//     or scholarship field in abroad100.js — its read-me lists "confirmed
//     scholarship" as explicitly out of scope — so a tab that silently
//     matched nothing is left out rather than drawn dead.
//
// ── The directory lives elsewhere ────────────────────────────────────
// This screen holds NO filter state. Everything that narrows the 100 — the
// search box, the popular chips, the facet cards, the rankings table — is a
// link into /admission/abroad/universities. Pre-split deep links
// (?q= ?country= ?region= ?subject=) are forwarded there whole.

import React, { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import CounsellingShell from "./CounsellingShell";
import AbroadNav from "./AbroadNav";
import { ABROAD_100 } from "./data/abroad100";
import { ABROAD_COUNTRIES } from "./data/abroadCountries";
import { EXTRA_FLAGS, areasOf, fundingLabel, fundingOf, uniSlug } from "./data/abroadFacets";
import { getGuide } from "../api/guidesApi";

const DIRECTORY = "/admission/abroad/universities";
const COUNTRIES = "/admission/abroad/countries";
const GUIDE_SLUG = "study-abroad";

// The board labels these "USA" and "UK", not the dataset's full names, and
// closes with a rank cut rather than a sixth country.
const POPULAR = [
  ["USA", "country", "United States"],
  ["UK", "country", "United Kingdom"],
  ["Canada", "country", "Canada"],
  ["Australia", "country", "Australia"],
  ["Germany", "country", "Germany"],
  ["QS top 50", "top", "50"],
];

// Four, as the board draws them. "Funding" is the institution's ownership —
// public vs private — NOT scholarships; the board's own lede calls it
// "type". An earlier pass read it as funding-for-students, found no
// scholarship field, and dropped the tab. `abroad100.js` has carried `type`
// all along. See data/abroadFacets.js.
const BROWSE_TABS = [
  ["country", "Country"],
  ["region", "Region"],
  ["subject", "Subject"],
  ["funding", "Funding"],
];

// The board shows four facet cards collapsed and the rest behind the
// toggle. A tab with no more than this never renders the toggle at all —
// which is why Funding, at two, has none.
const FACET_PREVIEW = 4;

const STEPS = [
  ["Choose your course", "Match your academic background and career goals to the right programme and study level."],
  ["Pick a destination", "Compare countries on cost, intakes, visa rules, work rights and career outcomes."],
  ["Shortlist universities", "Use rankings, course content, fees and entry requirements to build a balanced list."],
  ["Check eligibility & tests", "Confirm grades, IELTS/TOEFL/PTE, GRE/GMAT and documents for each programme."],
  ["Apply & fund", "Submit SOPs, LORs and applications; plan scholarships, loans and proof of funds."],
  ["Visa & travel", "Accept your offer, apply for the student visa and prepare to move."],
];

// Inline, not an icon package — this app has no icon dependency beyond its
// own ScribbleIcon set, and the board's three stat glyphs are not in it.
const Ic = ({ d }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
       strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);
const IcBank = <Ic d={<><path d="M12 3 3 8h18L12 3Z" /><path d="M6 11v7M10 11v7M14 11v7M18 11v7" /><path d="M3 21h18" /></>} />;
const IcGlobe = <Ic d={<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z" /></>} />;
const IcBook  = <Ic d={<><path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2V5Z" /><path d="M8 7h7M8 11h7" /></>} />;
// The glyph a facet card carries. Country uses the destination's flag; the
// other three tabs are categories, not places, so they take a drawn mark —
// a globe for a region, the subject's own icon, a bank for ownership.
const IcGlobeSm = <Ic d={<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z" /></>} />;
const IcBankSm = <Ic d={<><path d="M12 3 3 8h18L12 3Z" /><path d="M6 11v7M10 11v7M14 11v7M18 11v7" /><path d="M3 21h18" /></>} />;

const SUBJECT_ICONS = {
  "Sciences & Mathematics": <Ic d={<><path d="M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3" /><path d="M9 3h6" /></>} />,
  "Computing, AI & Data": <Ic d={<><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></>} />,
  "Engineering & Technology": <Ic d={<><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></>} />,
  "Social Sciences & Policy": <Ic d={<><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 5.5a3 3 0 0 1 0 5.8M18 20a6 6 0 0 0-3-5.2" /></>} />,
  "Arts & Humanities": <Ic d={<><path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2V5Z" /><path d="M8 7h7M8 11h7" /></>} />,
  "Business & Management": <Ic d={<><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /></>} />,
  "Law": <Ic d={<><path d="M12 3v18M7 21h10" /><path d="M5 7h14M7 7l-3 6h6l-3-6ZM17 7l-3 6h6l-3-6Z" /></>} />,
  "Medicine & Health": <Ic d={<><path d="M12 6v12M6 12h12" /><rect x="3" y="3" width="18" height="18" rx="3" /></>} />,
  "Education": <Ic d={<><path d="m12 4 9 5-9 5-9-5 9-5Z" /><path d="M6 11.5V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.5" /></>} />,
  "Architecture & Design": <Ic d={<><path d="M4 21V7l8-4 8 4v14" /><path d="M9 21v-6h6v6" /><path d="M9 11h.01M15 11h.01" /></>} />,
  "Economics": <Ic d={<><path d="M4 19V5" /><path d="M4 19h16" /><path d="m7 15 4-5 3 3 5-7" /></>} />,
  "Agriculture & Forestry": <Ic d={<><path d="M12 21V9" /><path d="M12 9c0-3.3 2.7-6 6-6 0 3.3-2.7 6-6 6Z" /><path d="M12 14c0-2.8-2.2-5-5-5 0 2.8 2.2 5 5 5Z" /></>} />,
};

const IcShield = (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3 5 6v5c0 4.2 2.9 8.1 7 9 4.1-.9 7-4.8 7-9V6l-7-3Z" /><path d="m9 12 2 2 4-4" />
  </svg>
);

export default function AdmissionAbroadPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("country");
  // Expansion is PER TAB and resets when the tab changes: switching from an
  // expanded Country list to Subject should land on Subject's own preview,
  // not drop the reader into 12 open cards they didn't ask for.
  const [expanded, setExpanded] = useState(false);
  const [region, setRegion] = useState("Worldwide");
  const [guide, setGuide] = useState(null);

  // The guide's phase list and per-phase topic counts come from the CMS, so
  // the "complete guide" block can never disagree with what the reader opens.
  useEffect(() => {
    let alive = true;
    // getGuide returns {status, guide}, NOT the guide — unwrapping it wrong
    // makes `chapters` undefined, which hides the whole block silently
    // rather than erroring.
    getGuide(GUIDE_SLUG)
      .then((res) => alive && setGuide(res && res.status === "ok" ? res.guide : false))
      .catch(() => alive && setGuide(false));
    return () => { alive = false; };
  }, []);

  const facets = useMemo(() => {
    const count = (fn) => {
      const m = new Map();
      ABROAD_100.forEach((r) => fn(r).forEach((v) => m.set(v, (m.get(v) || 0) + 1)));
      return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    };
    return {
      country: count((r) => [r.country]),
      region: count((r) => [r.region]),
      // The 12 board subject AREAS, not the dataset's 124 raw strings. The
      // raw values are a vocabulary, not a browse axis — "law" appears 75
      // times and "mathematical modelling" once.
      subject: count(areasOf),
      funding: count((r) => [fundingOf(r)]),
    };
  }, []);

  // "=2" where QS ties, "#4" where it does not — derived by counting shared
  // ranks, never stored. Reproduces the board's table exactly.
  const tied = useMemo(() => {
    const m = new Map();
    ABROAD_100.forEach((r) => m.set(r.qsRank, (m.get(r.qsRank) || 0) + 1));
    return m;
  }, []);

  // The board orders these geographically, not by university count. Any
  // region in the data but not listed here still appears, at the end, so a
  // new region can never be silently dropped from the chips.
  const BOARD_ORDER = ["North America", "Europe", "Asia", "Oceania", "Middle East", "Africa", "Latin America"];
  const REGIONS = useMemo(() => {
    const have = facets.region.map(([r]) => r);
    const ordered = BOARD_ORDER.filter((r) => have.includes(r));
    return ["Worldwide", ...ordered, ...have.filter((r) => !ordered.includes(r))];
  }, [facets]);

  const preview = useMemo(() => {
    const rows = region === "Worldwide" ? ABROAD_100 : ABROAD_100.filter((r) => r.region === region);
    // No name tiebreak: Array.prototype.sort is stable, so equal qsSort keeps
    // dataset order — which is the order the board prints (Stanford above
    // Imperial at =2). Sorting by name reverses that pair.
    return [...rows].sort((a, b) => a.qsSort - b.qsSort).slice(0, 5);
  }, [region]);

  // Flags come from the country guides, so a flag can never be invented for
  // a country the guides do not cover.
  const flagOf = useMemo(() => {
    const m = new Map();
    ABROAD_COUNTRIES.forEach((c) => { if (c.flag) m.set(c.qsKey || c.name, c.flag); });
    // 15 countries hold QS-ranked universities but no country guide. The
    // guide is still the source of record where one exists — this only
    // fills in the rest, so a guide's flag can never be overridden here.
    Object.entries(EXTRA_FLAGS).forEach(([name, flag]) => { if (!m.has(name)) m.set(name, flag); });
    return m;
  }, []);

  const destinations = useMemo(() => {
    const tally = ABROAD_100.reduce((a, r) => { a[r.country] = (a[r.country] || 0) + 1; return a; }, {});
    // The board shows the six best-covered destinations, each with a guide.
    return [...ABROAD_COUNTRIES]
      .map((c) => ({ ...c, n: tally[c.qsKey || c.name] || 0 }))
      .filter((c) => c.n > 0)
      .sort((a, b) => b.n - a.n || a.name.localeCompare(b.name))
      .slice(0, 6);
  }, []);

  const facetHref = (key, value) => `${DIRECTORY}?${key}=${encodeURIComponent(value)}`;
  const popularHref = ([, kind, value]) =>
    kind === "top" ? `${DIRECTORY}?top=${value}` : facetHref("country", value);

  const edition = ABROAD_100[0].qsEdition;

  // A pre-split deep link is a request for the DIRECTORY, not this hero.
  const qs = params.toString();
  if (qs) return <Navigate to={`${DIRECTORY}?${qs}`} replace />;

  const phases = guide && guide.chapters ? guide.chapters : [];
  const topics = phases.reduce((n, c) => n + (c.section_count || 0), 0);

  return (
    <CounsellingShell nav={<AbroadNav current="home" />}>
      <header className="ab2-hero">
        <span className="ab2-badge">Study abroad {edition} · QS rankings {edition}</span>
        <h1 className="ab2-h1">Admission <em>Abroad.</em></h1>
        <p className="ab2-sub">
          {ABROAD_100.length} top QS-ranked universities across {facets.country.length} countries —
          postgraduate courses, tuition fees and application planning, plus{" "}
          {ABROAD_COUNTRIES.length} country guides and a complete step-by-step study abroad guide.
        </p>

        <form
          className="ab2-search"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            const term = q.trim();
            navigate(DIRECTORY + (term ? `?q=${encodeURIComponent(term)}` : ""));
          }}
        >
          <input
            aria-label="Search universities"
            placeholder="University, country or subject"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button type="submit" className="ab2-search-go">Search</button>
        </form>

        <div className="ab2-popular">
          <span className="ab2-popular-label">Popular:</span>
          {POPULAR.map((p) => (
            <Link key={p[0]} className="ab2-chip" to={popularHref(p)}>{p[0]}</Link>
          ))}
        </div>

        <p className="ab2-source">
          {IcShield} Source: QS World University Rankings {edition} &amp; official university
          pages · Updated November 2026
        </p>
      </header>

      {/* The board's tinted band: a glyph, the figure with its noun, and a
          line saying where the figure comes from. */}
      <div className="ab2-stats">
        <Link className="ab2-stat" to={DIRECTORY}>
          <span className="ab2-stat-ic">{IcBank}</span>
          <span>
            <b>{ABROAD_100.length} universities</b>
            <small>Ranked in QS World Rankings {edition}</small>
          </span>
        </Link>
        <Link className="ab2-stat" to={COUNTRIES}>
          <span className="ab2-stat-ic">{IcGlobe}</span>
          <span>
            <b>{facets.country.length} countries</b>
            <small>Across {facets.region.length} world regions</small>
          </span>
        </Link>
        <Link className="ab2-stat" to={`/counselling/guides/${GUIDE_SLUG}`}>
          <span className="ab2-stat-ic">{IcBook}</span>
          <span>
            <b>{topics ? `${topics.toLocaleString()} guide topics` : "Study abroad guide"}</b>
            <small>From course choice to visa</small>
          </span>
        </Link>
      </div>

      <section className="ab2-sec">
        <div className="in-kicker">Browse</div>
        <h2 className="ab2-h2">Explore universities abroad</h2>
        <p className="ab2-lede">Browse by destination, region, subject or type.</p>

        <div className="ab2-tabs" role="tablist">
          {BROWSE_TABS.map(([key, label]) => (
            <button key={key} role="tab" aria-selected={tab === key}
                    className={`ab2-tab${tab === key ? " on" : ""}`}
                    aria-controls="ab2-facet-grid"
                    onClick={() => { setTab(key); setExpanded(false); }}>
              {label}
            </button>
          ))}
        </div>

        <div className="ab2-facets" id="ab2-facet-grid">
          {(expanded ? facets[tab] : facets[tab].slice(0, FACET_PREVIEW)).map(([value, count]) => (
            <Link key={value} className="ab2-facet" to={facetHref(tab, value)}>
              <span className="ab2-facet-ic" aria-hidden="true">
                {tab === "country"
                  ? <span className="ab2-facet-flag">{flagOf.get(value) || "🏳"}</span>
                  : tab === "region" ? IcGlobeSm
                  : tab === "funding" ? IcBankSm
                  : SUBJECT_ICONS[value] || IcGlobeSm}
              </span>
              <span className="ab2-facet-tx">
                <b>{tab === "funding" ? fundingLabel(value) : value}</b>
                <small>{count} {count === 1 ? "university" : "universities"}</small>
              </span>
            </Link>
          ))}
        </div>

        {/* The board EXPANDS this list in place — it does not leave the
            screen. The old link went to the directory with a ?tab= that
            AbroadUniversitiesPage never read, so it silently landed on an
            unfiltered page. A tab short enough to show whole (Funding, at
            two) renders no toggle at all. */}
        {facets[tab].length > FACET_PREVIEW && (
          <div className="ab2-viewall">
            <button
              type="button"
              className="ab2-btn-ghost"
              aria-expanded={expanded}
              aria-controls="ab2-facet-grid"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? "Show less" : `View all (${facets[tab].length})`}
            </button>
          </div>
        )}
      </section>

      <section className="ab2-sec">
        <div className="ab2-sechead">
          <div>
            <div className="in-kicker">Rankings</div>
            <h2 className="ab2-h2">Top-ranked by QS {edition}</h2>
            <p className="ab2-lede">
              The world's highest-ranked universities in QS World University Rankings {edition}.
            </p>
          </div>
          <Link className="ab2-allink" to={DIRECTORY}>All {ABROAD_100.length} universities →</Link>
        </div>

        <div className="ab2-regions" role="tablist" aria-label="World region">
          {REGIONS.map((r) => (
            <button key={r} role="tab" aria-selected={region === r}
                    className={`ab2-region${region === r ? " on" : ""}`} onClick={() => setRegion(r)}>
              {r}
            </button>
          ))}
        </div>

        <div className="ab2-table" role="table" aria-label={`Top-ranked by QS ${edition}`}>
          <div className="ab2-tr ab2-th" role="row">
            <span role="columnheader">QS {edition}</span>
            <span role="columnheader">University</span>
            <span role="columnheader">Country</span>
            <span aria-hidden="true" />
          </div>
          {preview.length === 0 ? (
            <p className="sc-note ab2-empty">No ranked university in {region} yet.</p>
          ) : preview.map((r) => (
            <Link key={r.id} className="ab2-tr" role="row"
                  to={`${DIRECTORY}/${uniSlug(r)}`}>
              <span className="ab2-rank" role="cell">
                {r.ranked ? `${(tied.get(r.qsRank) || 0) > 1 ? "=" : "#"}${r.qsRank}` : "NR"}
              </span>
              <span className="ab2-uni" role="cell">
                <b>{r.name}</b>
                <small>{r.area}</small>
              </span>
              <span className="ab2-country" role="cell">
                {flagOf.get(r.country) && <i aria-hidden="true">{flagOf.get(r.country)}</i>}
                {r.country}
              </span>
              <span className="ab2-chev" aria-hidden="true">›</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="ab2-sec">
        <div className="in-kicker">Destinations</div>
        <h2 className="ab2-h2">Popular destinations</h2>
        <p className="ab2-lede">Education system, costs, intakes, visas and work rights.</p>
        <div className="ab2-dests">
          {destinations.map((c) => (
            <article key={c.name} className="ab2-dest">
              <div className="ab2-dest-head">
                {c.flag && <span className="ab2-dest-flag" aria-hidden="true">{c.flag}</span>}
                <div>
                  <h3>{c.name}</h3>
                  <p>{c.n} QS-ranked universit{c.n === 1 ? "y" : "ies"}</p>
                </div>
              </div>
              {c.intakes && (
                <p className="ab2-dest-intakes"><b>Intakes:</b> {c.intakes}</p>
              )}
              <Link className="ab2-dest-go" to={`${COUNTRIES}?region=${encodeURIComponent(c.region)}`}>
                Read the guide →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="ab2-sec">
        <div className="in-kicker">Process</div>
        <h2 className="ab2-h2">How admission abroad works</h2>
        <p className="ab2-lede">
          Six steps from choosing a course to landing on campus. Tap a step to read the full guide.
        </p>
        <ol className="ab2-steps">
          {STEPS.map(([title, detail], i) => (
            <li key={title}>
              <Link to={`/counselling/guides/${GUIDE_SLUG}`}>
                <span className="ab2-step-n">{i + 1}</span>
                <span className="ab2-step-t">{title}</span>
                <span className="ab2-step-d">{detail}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {phases.length > 0 && (
        <section className="ab2-sec">
          <div className="ab2-sechead">
            <div>
              <div className="in-kicker">Guide</div>
              <h2 className="ab2-h2">The complete study abroad guide</h2>
              <p className="ab2-lede">
                {phases.length} phases and {topics.toLocaleString()} topics — from understanding
                study abroad to scholarships, visas and course-wise guidance.
              </p>
            </div>
            <Link className="ab2-allink" to={`/counselling/guides/${GUIDE_SLUG}`}>Start reading →</Link>
          </div>
          <div className="ab2-phases">
            {phases.slice(0, 8).map((c) => (
              <Link key={c.slug} className="ab2-phase"
                    to={`/counselling/guides/${GUIDE_SLUG}?chapter=${c.slug}`}>
                <span className="ab2-phase-n">{c.number}</span>
                <span className="ab2-phase-tx">
                  <b>{String(c.title).replace(/^\d+:\s*/, "")}</b>
                  <small>{c.section_count} topics</small>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="sc-card in-guidance">
        <div>
          <div className="in-kicker">Guidance</div>
          <h2 className="ab2-h2">Planning to study abroad?</h2>
          <p className="ab2-lede">
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
        </div>
      </section>

      <p className="ab2-provenance">
        Rankings: QS World University Rankings {edition}. Course and fee details come from
        official university pages; visa and work rules change often — always confirm with the
        university and official immigration website before applying.
      </p>
    </CounsellingShell>
  );
}
