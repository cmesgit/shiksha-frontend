// PLACEMENT: src/counselling/AdmissionIndiaAllPage.jsx   (NEW FILE — landing/frontend app)
//
// "Admission in India" (the v2 artboard) — the full NIRF 2025 directory of
// 980 ranked institutions, over data/nirf980.js.
//
// Deep-linkable: /admission/india/all?state=Kerala&stream=Pharmacy
//
// ── Why this does NOT replace /admission/india ───────────────────────
// That route still serves the curated 50-institution engineering directory,
// which carries NIRF **Engineering** ranks, scores, founding years and prose
// this dataset does not have — and career pages link into it with
// ?program= filters (see admissionLinks.js). The two are different NIRF
// tables and must never be merged: IIT Delhi is Engineering rank 2 and
// Overall rank 4, so borrowing a score across them would print "rank 4 ·
// score 85.74", every value real and the pairing false. Retiring the old
// route is a separate decision with its own redirect work.
//
// ── The provenance rules this screen exists to keep ──────────────────
//   * courseSource "stream-groups" (713 of 980) means the course list was
//     NEVER individually verified — it is a generic stream template, which
//     is why many are textually identical. Those profiles say so, and their
//     course list is presented as indicative. Only the 267 marked "official"
//     claim to come from the institution's own programme list.
//   * feeStatus is shown as the document states it. 790 say "not verified"
//     and 8 say a source exists but its values were not checked. A fee is
//     never blank, never zero, never estimated.
//   * websiteVerify (295) means the address came from a known institutional
//     domain and was NOT re-checked, so it is labelled rather than presented
//     as confirmed.
//   * Stream and exam buckets are OURS, derived from course and entrance
//     text (see scripts/build-nirf980.mjs). 253 institutions list no exam at
//     all; that is the document's silence and the UI says so rather than
//     implying none is required.
//
// The detail payload (~450 KB of course text) is imported on demand when a
// profile is opened, so browsing the list does not download it.

import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CounsellingShell from "./CounsellingShell";
import AdmissionHelpModal from "./AdmissionHelpModal";
import IndiaCompareBar from "./IndiaCompareBar";
import { IndiaCompareProvider } from "./IndiaCompareContext";
import { useIndiaCompare } from "./useIndiaCompare";
import { NIRF_980 } from "./data/nirf980";
import { csv, rankStart, rankLabel, isBand, rankParam } from "./data/nirfFacets";

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

// NIRF publishes a separate ranking per category; an institution sits in
// several. "Overall" is the default list the artboard shows.
const CATEGORIES = [
  "Overall", "Engineering", "Management", "College", "University",
  "Pharmacy", "Medical", "Law", "Research", "Architecture", "Dental",
  "Agriculture",
];

// PLACEMENT NOTE: the old inline `Drawer` (cf-drawer modal) that used to
// live here was replaced by the board's own routable
// AdmissionIndiaDetailPage.jsx (/admission/india/all/:rank) — same reason
// AbroadUniversitiesPage.jsx's drawer was replaced: "View details" opens a
// real page with a URL, Similar institutions and tabs, not a cf-drawer with
// none of that. "Request brochure" and "+ Add to compare" are new — the
// board showed both on every directory card and neither existed here.

const DETAIL = "/admission/india/all";

// The compare tray has to persist across this directory, the detail page
// and the compare page — three SEPARATE top-level routes (unlike Abroad's
// single gated route swapping internal "screens"), so there is no one
// shared ancestor to mount IndiaCompareProvider on. Each page mounts its
// own; the tray is localStorage-backed, so selections made on one page are
// already there the moment the next page's provider reads storage.
export default function AdmissionIndiaAllPage() {
  return (
    <IndiaCompareProvider>
      <AdmissionIndiaAllPageInner />
      <IndiaCompareBar />
    </IndiaCompareProvider>
  );
}

function AdmissionIndiaAllPageInner() {
  const [params, setParams] = useSearchParams();
  const [helpRow, setHelpRow] = useState(null);
  const { inCompare, toggle: toggleCompare } = useIndiaCompare();
  // ?tab= opens this page on a chosen browse axis. The overview at
  // /admission/india links in with it ("View all (16)", and the entrance-exam
  // stat); without it those links land on Stream whatever they asked for,
  // which reads as the link being broken rather than ignored. Validated
  // against the known tabs so a junk value falls back instead of rendering
  // an empty facet list.
  const wantedTab = params.get("tab");
  const [tab, setTab] = useState(
    BROWSE_TABS.some(([k]) => k === wantedTab) ? wantedTab : "stream",
  );
  const [category, setCategory] = useState("Overall");
  const [limit, setLimit] = useState(60);

  const q = params.get("q") || "";
  const streamParam = params.get("stream") || "";
  const examParam = params.get("exam") || "";
  const stateParam = params.get("state") || "";
  const typeParam = params.get("type") || "";

  const streams = useMemo(() => csv(streamParam), [streamParam]);
  const exams = useMemo(() => csv(examParam), [examParam]);
  const states = useMemo(() => csv(stateParam), [stateParam]);
  const types = useMemo(() => csv(typeParam), [typeParam]);

  const patch = (key, value) => {
    const next = new URLSearchParams(params);
    if (value && value.length) next.set(key, value.join(",")); else next.delete(key);
    setParams(next, { replace: true });
    setLimit(60);
  };
  const toggle = (key, list, value) =>
    patch(key, list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);

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

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return NIRF_980
      .filter((r) => {
        if (streams.length && !streams.some((s) => r.streams.includes(s))) return false;
        if (exams.length && !exams.some((e) => r.exams.includes(e))) return false;
        if (states.length && !states.includes(r.state)) return false;
        if (types.length && !types.includes(r.type)) return false;
        if (category !== "Overall" && r.ranks[category] === undefined) return false;
        if (!needle) return true;
        return (
          r.name.toLowerCase().includes(needle) ||
          r.city.toLowerCase().includes(needle) ||
          r.state.toLowerCase().includes(needle) ||
          r.exams.some((e) => e.toLowerCase().includes(needle))
        );
      })
      .sort((a, b) => {
        // Rank within the chosen NIRF list; institutions absent from it sort
        // after those in it, by their directory position. A BAND sorts on its
        // START (so "101-150" falls after #100 and before #151) — subtracting
        // raw values would compare a string and yield NaN, which sorts
        // unpredictably and would scatter 576 of the 980 rows.
        const ra = rankStart(a.ranks[category]);
        const rb = rankStart(b.ranks[category]);
        return ra - rb || a.listRank - b.listRank;
      });
  }, [q, streams, exams, states, types, category]);

  const active = [
    ...streams.map((v) => ["stream", v]),
    ...exams.map((v) => ["exam", v]),
    ...states.map((v) => ["state", v]),
    ...types.map((v) => ["type", v]),
  ];
  const listFor = (k) => (k === "stream" ? streams : k === "exam" ? exams : k === "state" ? states : types);

  return (
    <CounsellingShell crumb={q.trim() ? " / Admission in India / All institutions" : " / Admission in India"}>
      <div className="ai-hero ab-hero">
        <span className="ab-badge">Admissions 2026–27 · NIRF 2025</span>
        <h1 className="sc-h1">
          {q.trim() ? <>Results for “<em>{q.trim()}</em>”</> : <>Admission in <em>India</em></>}
        </h1>
        <p className="ab-sub">
          Profiles, courses, entrance exams and official websites for all {NIRF_980.length}
          {" "}NIRF 2025-ranked universities, colleges and institutes.
        </p>

        <div className="sc-search sc-search-hero">
          <input
            value={q}
            placeholder="College, city, state or exam…"
            onChange={(e) => {
              const next = new URLSearchParams(params);
              if (e.target.value) next.set("q", e.target.value); else next.delete("q");
              setParams(next, { replace: true });
              setLimit(60);
            }}
          />
        </div>

        <div className="sc-tags ab-popular">
          <span className="ab-popular-label">Popular:</span>
          {POPULAR.map(([label, value]) => (
            <button
              key={value}
              className={`sc-fchip${types.includes(value) ? " on" : ""}`}
              onClick={() => toggle("type", types, value)}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="ab-source">
          Source: NIRF India Rankings 2025, Ministry of Education. Course lists and fees are
          taken from official institution pages where verified — {NIRF_980.filter((r) => r.feeStatus !== "verified").length}
          {" "}of {NIRF_980.length} profiles have no verified fee and say so.{" "}
          {NIRF_980.filter((r) => Object.values(r.ranks).some(isBand)).length} sit in a
          NIRF band (for example #101–150) rather than at a single position. Always
          confirm current details before applying.
        </p>

        {/* Cross-link to the curated engineering directory. Different NIRF
            table (Engineering, not Overall) and a richer record — it carries
            NIRF scores, founding years and admission prose that this
            980-row directory does not. Say what is actually over there. */}
        <p className="ai-switch ab-switch">
          Comparing engineering colleges?{" "}
          <Link to="/admission/india/engineering">
            Open the NIRF Engineering top 50 →
          </Link>
          <span className="ai-switch-note">
            Fewer institutions, more per institution — NIRF <b>scores</b>, founding
            year, entrance exams and the admission pathway for each. Ranked on the
            <b> Engineering</b> list, so positions differ from this page.
          </span>
        </p>

        <div className="cf-stats ai-stats">
          <div className="cf-stat">
            <span className="cf-stat-label">Institutions</span>
            <span className="cf-stat-value">{NIRF_980.length}</span>
          </div>
          <div className="cf-stat">
            <span className="cf-stat-label">States &amp; UTs</span>
            <span className="cf-stat-value">{facets.state.length}</span>
          </div>
          <div className="cf-stat">
            <span className="cf-stat-label">Entrance exams</span>
            <span className="cf-stat-value">{facets.exam.length}</span>
          </div>
        </div>
      </div>

      <section className="ab-browse" aria-label="Explore institutions">
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

        <div className="ab-facet-grid">
          {facets[tab].slice(0, 12).map(([value, count]) => (
            <button
              key={value}
              className={`sc-card ab-facet${listFor(tab).includes(value) ? " on" : ""}`}
              onClick={() => toggle(tab, listFor(tab), value)}
            >
              <span className="ab-facet-name">{value}</span>
              <span className="ab-facet-count">
                {count} {count === 1 ? "institution" : "institutions"}
              </span>
            </button>
          ))}
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

      <section className="ab-rankings" id="in-directory">
        <div className="ab-rankings-head">
          <div>
            <h2 className="ab-h2">Ranked by NIRF 2025</h2>
            <p className="ab-lede">
              NIRF publishes a separate list per category; an institution can appear in several.
            </p>
          </div>
          <span className="ab-count">{rows.length} of {NIRF_980.length}</span>
        </div>

        <div className="sc-tags in-cats">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`sc-fchip${category === c ? " on" : ""}`}
              onClick={() => { setCategory(c); setLimit(60); }}
            >
              {c}
            </button>
          ))}
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
            <button
              className="sc-filters-clear"
              onClick={() => { setParams(new URLSearchParams(), { replace: true }); setLimit(60); }}
            >
              Clear all
            </button>
          </div>
        )}

        {rows.length === 0 ? (
          <div className="sc-empty">No institutions match those filters.</div>
        ) : (
          <>
            <ul className="ai-list ab-list">
              {rows.slice(0, limit).map((r) => (
                <li key={r.listRank}>
                  <div className="sc-card ai-row ab-row">
                    <span
                      className={`ai-rank ab-rank${r.ranks[category] === undefined ? " unranked" : ""}${isBand(r.ranks[category]) ? " banded" : ""}`}
                      title={isBand(r.ranks[category])
                        ? `NIRF 2025 ranks this institution in the ${r.ranks[category].replace("-", "–")} band for ${category}, not at a single position.`
                        : undefined}
                    >
                      {rankLabel(r.ranks[category])}
                    </span>
                    <span className="ai-row-main">
                      <span className="ab-row-name">{r.name}</span>
                      <span className="ab-row-meta">
                        {[r.city, r.state].filter(Boolean).join(", ")} · {r.type}
                      </span>
                    </span>
                    <span className="ab-row-fee">
                      <span className={`ab-pill ab-pill-${r.feeStatus === "verified" ? "published" : r.feeStatus === "source_found" ? "partial" : "none"}`}>
                        {r.feeStatus === "verified" ? "Fees verified" : "Fees not verified"}
                      </span>
                    </span>
                    <span className="ab-row-actions">
                      <button className="sc-btn ghost ab-row-btn" onClick={() => setHelpRow(r)}>
                        Request brochure
                      </button>
                      <Link className="sc-btn ghost ab-row-btn" to={`${DETAIL}/${rankParam(r)}`}>
                        View details
                      </Link>
                      <label className="ab-row-cmp">
                        <input
                          type="checkbox"
                          checked={inCompare(r.listRank)}
                          onChange={() => toggleCompare(r.listRank)}
                        />
                        Add to compare
                      </label>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            {rows.length > limit && (
              <div className="in-more">
                <button className="sc-btn ghost" onClick={() => setLimit(limit + 100)}>
                  Show more ({rows.length - limit} left)
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <section className="in-process" aria-label="How admission works">
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
          <button className="sc-btn green" onClick={() => setHelpRow({})}>
            Talk to a counsellor →
          </button>
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

      <AdmissionHelpModal
        open={!!helpRow}
        onClose={() => setHelpRow(null)}
        title={helpRow?.name ? "Request brochure" : "Talk to a counsellor"}
        subtitle={
          helpRow?.name
            ? `Share your details and we'll send you ${helpRow.name}'s brochure and help with admissions.`
            : "Share your details and a ShikshaCom counsellor will call you back."
        }
        universityName={helpRow?.name}
        domain="india"
      />
    </CounsellingShell>
  );
}
