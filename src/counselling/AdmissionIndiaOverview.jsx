// PLACEMENT: src/counselling/AdmissionIndiaOverview.jsx   (NEW FILE)
//
// "Admission in India v2" — the artboard at
// claude.ai/artifact/4nxDHtLVf2…#artboard-0ddbb1c5e887, built to its shape:
// hero → stats band → Explore institutions → a FIVE-ROW ranking preview →
// How admission works → Guidance / Before you apply.
//
// ── Why this is an overview and not the directory ────────────────────
// The artboard's ranking block is a short preview with an explicit
// "All 980 institutions →" link beside it, not a paginated list. The full
// directory therefore stays at /admission/india/all, which keeps its
// existing deep links (?state=, ?stream=, ?q=) working — every control on
// this page is a doorway into that route rather than a second copy of it.
//
// ── Where this page deliberately does NOT match the picture ──────────
//   * Stream counts. The artboard shows Science 334, Management 330 and a
//     combined "Arts, Science & Commerce" 292. Our facets are derived from
//     each profile's own course text and give different totals. Those are
//     reported as derived. Reshaping the taxonomy to hit the mockup's
//     numbers would invent a classification and attribute it to NIRF — and
//     292 is exactly the count of byte-identical TEMPLATE course blocks,
//     so that facet would be backed by placeholder text.
//   * "41+ entrance exams". We derived exactly 41 and print 41; the "+"
//     would claim knowledge of more than we have.
//   * "Mapped to every college". 253 of 980 profiles list no entrance exam
//     at all, so the directory-wide wording is used instead.
// Everything else — copy, order, chip sets, the five-step process, the
// guidance card and the checklist — follows the artboard.

import React, { useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import CounsellingShell from "./CounsellingShell";
import { NIRF_980 } from "./data/nirf980";

const DIRECTORY = "/admission/india/all";

const POPULAR = [
  ["IITs", "IIT"],
  ["NITs", "NIT"],
  ["IIMs", "IIM"],
  ["AIIMS", "AIIMS"],
  ["NLUs", "National Law University"],
  ["Central universities", "Central university"],
];

const BROWSE_TABS = [
  ["stream", "Stream"],
  ["exam", "Exam"],
  ["state", "State"],
  ["type", "Type"],
];

// The artboard's chip row for the ranking table. "Colleges" is NIRF's
// College list; the dataset keys it singular, so the label and the key are
// kept apart rather than renaming the data to match a picture.
const CATEGORIES = [
  ["Overall", "All"],
  ["Engineering", "Engineering"],
  ["Management", "Management"],
  ["College", "Colleges"],
  ["Pharmacy", "Pharmacy"],
  ["Law", "Law"],
  ["Agriculture", "Agriculture"],
  ["Medical", "Medical"],
  ["Architecture", "Architecture"],
  ["Dental", "Dental"],
];

// A NIRF rank is EITHER a position (number) OR a band ("101-150"). Keep them
// distinct — printing "#101" for a band invents a position never held.
const rankStart = (v) =>
  v === undefined ? Infinity : typeof v === "number" ? v : parseInt(v, 10);
const rankLabel = (v) =>
  v === undefined ? "—" : typeof v === "number" ? `#${v}` : `#${v.replace("-", "–")}`;

const Icon = ({ d, circle }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {circle && <circle cx="12" cy="10" r="3" />}
    <path d={d} />
  </svg>
);

const STAT_ICON = {
  institutions: "M3 21h18M5 21V10l7-5 7 5v11M9 21v-5h6v5",
  states: "M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z",
  exams: "M9 11l2 2 4-4M4 5h16v16H4z",
};

// The artboard gives each facet card its own glyph (a gear for Engineering,
// a flask for Science, a case for Management, a book for the arts group).
// Matched on the leading word so a stream we have not seen still renders —
// an unknown value falls back to the building mark rather than nothing.
const FACET_ICON = [
  [/^engineer/i, "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7.5 19.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3 14a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 10 3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.6 1.6 0 0 0 21 10a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1"],
  [/^(science|physic|chemi|bio)/i, "M9 3h6M10 3v6.5L5.2 18A2 2 0 0 0 7 21h10a2 2 0 0 0 1.8-3L14 9.5V3"],
  [/^(manage|business|commerce)/i, "M4 7h16v13H4zM9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M4 12h16"],
  [/^(art|human|law|educat|doctoral)/i, "M4 5a2 2 0 0 1 2-2h11v18H6a2 2 0 0 1-2-2zM17 3h2a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1h-2"],
  [/^(medic|dental|pharma|nurs)/i, "M12 7v10M7 12h10M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"],
  [/^(comput|information|data)/i, "M3 5h18v11H3zM8 21h8M12 16v5"],
  [/^architect/i, "M3 21h18M6 21V8l6-5 6 5v13M10 21v-6h4v6"],
];
const facetIcon = (name) => {
  const hit = FACET_ICON.find(([re]) => re.test(name));
  return hit ? hit[1] : STAT_ICON.institutions;
};

export default function AdmissionIndiaOverview() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [tab, setTab] = useState("stream");
  const [category, setCategory] = useState("Overall");
  const [q, setQ] = useState("");
  const [stream, setStream] = useState("");

  const facets = useMemo(() => {
    const tally = (fn) => {
      const m = new Map();
      NIRF_980.forEach((r) => fn(r).forEach((v) => v && m.set(v, (m.get(v) || 0) + 1)));
      return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    };
    return {
      stream: tally((r) => r.streams),
      exam: tally((r) => r.exams),
      state: tally((r) => [r.state]),
      type: tally((r) => [r.type]),
    };
  }, []);

  // The artboard shows five rows. Rank ascending within the chosen NIRF
  // list, bands ordered by where the band starts.
  const top5 = useMemo(
    () =>
      NIRF_980
        .filter((r) => r.ranks[category] !== undefined)
        .sort((a, b) => rankStart(a.ranks[category]) - rankStart(b.ranks[category]))
        .slice(0, 5),
    [category],
  );

  const search = (e) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (q.trim()) p.set("q", q.trim());
    if (stream) p.set("stream", stream);
    navigate(`${DIRECTORY}${p.toString() ? `?${p}` : ""}`);
  };

  const facetHref = (key, value) => `${DIRECTORY}?${key}=${encodeURIComponent(value)}`;

  // /admission/india?program=… was the curated ENGINEERING list's deep-link
  // shape before this overview took the route. Those links live in career
  // pages and in users' bookmarks, and ?program= means nothing here — hand
  // them on rather than silently dropping the filter and showing a page that
  // ignores what was asked for.
  const program = params.get("program");
  if (program) {
    return <Navigate replace to={`/admission/india/engineering?program=${encodeURIComponent(program)}`} />;
  }

  return (
    <CounsellingShell crumb=" / Admission in India">
      <div className="ai-hero ab-hero">
        <span className="ab-badge">Admissions 2026–27 · NIRF 2025</span>
        <h1 className="sc-h1">Admission in <em>India</em>.</h1>
        <p className="ab-sub">
          Profiles, courses, fees, entrance exams and official websites for all{" "}
          {NIRF_980.length} NIRF 2025-ranked universities, colleges and institutes.
        </p>

        <form className="in-searchrow" onSubmit={search} role="search">
          <div className="in-searchfield">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                 strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="College, course, city or exam"
              aria-label="Search institutions"
            />
          </div>
          <select
            className="in-searchstream"
            value={stream}
            onChange={(e) => setStream(e.target.value)}
            aria-label="Filter by stream"
          >
            <option value="">All streams</option>
            {facets.stream.map(([value]) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
          <button className="sc-btn green in-searchbtn" type="submit">Search</button>
        </form>

        <div className="sc-tags ab-popular">
          <span className="ab-popular-label">Popular:</span>
          {POPULAR.map(([label, value]) => (
            <Link key={value} className="sc-fchip" to={facetHref("type", value)}>
              {label}
            </Link>
          ))}
        </div>

        {/* The artboard keeps the hero source line to one sentence and puts
            the coverage caveats behind "About this data" lower down. The
            detailed numbers live there rather than being dropped. */}
        <p className="ab-source">
          Source: NIRF India Rankings 2025, Ministry of Education · Updated November 2026
        </p>
      </div>

      <section className="in-statband" aria-label="Directory at a glance">
        <Link className="in-stat" to={DIRECTORY}>
          <span className="in-stat-ico"><Icon d={STAT_ICON.institutions} /></span>
          <span>
            <b>{NIRF_980.length} institutions</b>
            <small>Ranked in NIRF 2025 →</small>
          </span>
        </Link>
        <Link className="in-stat" to={`${DIRECTORY}#in-directory`}>
          <span className="in-stat-ico"><Icon d={STAT_ICON.states} circle /></span>
          <span>
            <b>{facets.state.length} states &amp; UTs</b>
            <small>Colleges across India →</small>
          </span>
        </Link>
        <Link className="in-stat" to={`${DIRECTORY}?tab=exam`}>
          <span className="in-stat-ico"><Icon d={STAT_ICON.exams} /></span>
          <span>
            <b>{facets.exam.length} entrance exams</b>
            <small>Mapped across the directory →</small>
          </span>
        </Link>
      </section>

      <section className="ab-browse" aria-label="Explore institutions">
        <div className="in-kicker">Browse</div>
        <h2 className="ab-h2">Explore institutions</h2>
        <p className="ab-lede">Browse by what matters to you.</p>

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

        <div className="ab-facet-grid in-facet-grid">
          {facets[tab].slice(0, 4).map(([value, count]) => (
            <Link key={value} className="sc-card ab-facet in-facet" to={facetHref(tab, value)}>
              <span className="in-facet-ico"><Icon d={facetIcon(value)} /></span>
              <span>
                <span className="ab-facet-name">{value}</span>
                <span className="ab-facet-count">
                  {count} {count === 1 ? "institution" : "institutions"}
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="in-viewall">
          <Link className="sc-btn ghost" to={`${DIRECTORY}?tab=${tab}`}>
            View all ({facets[tab].length})
          </Link>
        </div>

        {tab === "stream" && (
          <p className="ab-caveat in-facet-note">
            Streams are grouped by the courses each profile lists. For the{" "}
            {NIRF_980.filter((r) => r.courseSource !== "official").length} institutions without an
            official programme list, those courses are indicative rather than checked.
          </p>
        )}
        {tab === "exam" && (
          <p className="ab-caveat in-facet-note">
            {NIRF_980.filter((r) => !r.exams.length).length} institutions list no entrance exam in
            this edition. That is missing information, not an indication that none is required.
          </p>
        )}
      </section>

      <section className="ab-rankings" aria-label="Top-ranked by NIRF 2025">
        <div className="ab-rankings-head">
          <div>
            <div className="in-kicker">Rankings</div>
            <h2 className="ab-h2">Top-ranked by NIRF 2025</h2>
            <p className="ab-lede">Ranked by NIRF {category === "Overall" ? "Overall" : category} 2025.</p>
          </div>
          <Link className="in-allink" to={DIRECTORY}>
            All {NIRF_980.length} institutions →
          </Link>
        </div>

        <div className="sc-tags in-cats">
          {CATEGORIES.map(([key, label]) => (
            <button
              key={key}
              className={`sc-fchip${category === key ? " on" : ""}`}
              onClick={() => setCategory(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <table className="in-table">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Institution</th>
              <th scope="col">Type</th>
              <th scope="col"><span className="sc-sr">Open</span></th>
            </tr>
          </thead>
          <tbody>
            {top5.map((r) => (
              <tr key={r.listRank}>
                <td className="in-td-rank">{rankLabel(r.ranks[category])}</td>
                <td>
                  <Link className="in-td-name" to={`${DIRECTORY}?q=${encodeURIComponent(r.name)}`}>
                    {r.name}
                  </Link>
                  <span className="in-td-place">{[r.city, r.state].filter(Boolean).join(", ")}</span>
                </td>
                <td className="in-td-type">{r.type}</td>
                <td className="in-td-go" aria-hidden="true">›</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="in-process" aria-label="How admission works">
        <div className="in-kicker">Process</div>
        <h2 className="ab-h2">How admission works</h2>
        <p className="ab-lede">Five steps from choosing a course to confirming your seat.</p>
        <ol className="in-steps">
          {[
            ["Choose a course", "Pick a stream — engineering, medical, management, law, arts or science."],
            ["Check the exam", "Find the entrance exam: JEE, NEET, CUET, CLAT, CAT and more."],
            ["Apply & appear", "Register before the deadline and take the exam."],
            ["Counselling", "Fill choices in JoSAA, MCC, CSAS or state counselling."],
            ["Confirm your seat", "Verify documents and pay fees to secure admission."],
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
          <h2 className="ab-h2">Not sure where to start?</h2>
          <p className="ab-lede">
            A ShikshaCom counsellor can help you shortlist institutions, pick the right
            entrance exam and track deadlines.
          </p>
          <ul className="in-ticks">
            <li>Free one-to-one guidance</li>
            <li>Exam &amp; counselling support</li>
            <li>Shortlist based on your rank</li>
          </ul>
          <Link className="sc-btn green" to="/counselling/counsellors">Talk to a counsellor →</Link>
        </div>

        <div>
          <div className="in-kicker">Before you apply</div>
          <ul className="in-checks">
            <li>
              Shortlist 8–10 institutions — a mix of ambitious, moderate and safe choices — and
              check each one’s eligibility (subjects, minimum marks, age) before filling exam forms.
            </li>
            <li>
              Register early for every entrance exam you need. JEE Main, NEET-UG, CUET, CLAT and
              CAT forms usually close months before the exam.
            </li>
            <li>
              An exam rank alone doesn’t give you a seat — register separately for counselling
              (JoSAA, MCC, CSAS or your state portal) and fill choices carefully.
            </li>
            <li>
              Keep documents ready: Class 10 &amp; 12 mark sheets, category / EWS / PwD and
              domicile certificates, photo ID and passport-size photos.
            </li>
            <li>
              Check the official fee notice, hostel charges and scholarships before you pay the
              seat-acceptance fee.
            </li>
          </ul>

          {/* The artboard links "About this data". Rather than a dead link, the
              actual coverage numbers — the same ones the profiles carry — so a
              reader can judge how much of this directory is verified. */}
          <details className="in-about">
            <summary>About this data</summary>
            <ul>
              <li>
                Rankings: NIRF India Rankings 2025, Ministry of Education. NIRF 2026 had not
                been published when this directory was compiled.
              </li>
              <li>
                <b>{NIRF_980.filter((r) => r.courseSource === "official").length} of {NIRF_980.length}</b>{" "}
                profiles have a course list taken from the institution’s own programme pages.
                The rest show indicative groups for that kind of institution.
              </li>
              <li>
                <b>{NIRF_980.filter((r) => r.feeStatus === "verified").length} of {NIRF_980.length}</b>{" "}
                have fees from an official fee document. Where a fee could not be verified the
                profile says so — it never shows an estimate.
              </li>
              <li>
                <b>{NIRF_980.filter((r) => r.websiteVerify).length}</b> website addresses come from
                known institutional domains and were not re-checked for this edition.
              </li>
              <li>
                Stream and exam groupings are ours, derived from each profile’s course and
                entrance text — not an official taxonomy.
              </li>
            </ul>
          </details>
        </div>
      </section>
    </CounsellingShell>
  );
}
