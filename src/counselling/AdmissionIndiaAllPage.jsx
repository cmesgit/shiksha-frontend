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

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CounsellingShell from "./CounsellingShell";
import { NIRF_980 } from "./data/nirf980";

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

const csv = (v) => (v ? String(v).split(",").map((s) => s.trim()).filter(Boolean) : []);

const FEE_TEXT = {
  verified: "Fees verified from official documents",
  source_found: "Fee source found — values not verified",
  not_verified: "Fees not verified for this edition",
};

function Drawer({ row, onClose }) {
  const [detail, setDetail] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!row) return;
    let live = true;
    setDetail(null);
    setFailed(false);
    // Loaded here, not at module scope: the detail payload is ~450 KB and
    // the list never renders any of it.
    import("./data/nirf980-detail")
      .then((m) => {
        if (!live) return;
        setDetail(m.NIRF_980_DETAIL.find((d) => d.listRank === row.listRank) || null);
      })
      .catch(() => live && setFailed(true));
    return () => { live = false; };
  }, [row]);

  if (!row) return null;

  return (
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
              {Object.entries(row.ranks).map(([k, v]) => `${k} ${v}`).join(" · ") || "NIRF 2025"}
            </div>
            <h2 className="cf-drawer-title">{row.name}</h2>
            <div className="cf-drawer-summary">
              {[row.city, row.state].filter(Boolean).join(", ")} · {row.type} · {row.ownership}
            </div>
          </div>
          <button className="cf-drawer-x" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="cf-drawer-body">
          <section className="cf-drawer-sec">
            <h3>Courses</h3>
            <div className={`ab-fee ab-fee-${row.courseSource === "official" ? "published" : "partial"}`}>
              <div className="ab-fee-label">
                {row.courseSource === "official"
                  ? "From the institution's official programme list"
                  : "Indicative course groups — not individually verified"}
              </div>
              {row.courseSource !== "official" && (
                <p className="ab-caveat">
                  These are standard groups for this kind of institution, not a checked
                  catalogue. Confirm the current offering on the official website.
                </p>
              )}
            </div>
            {failed && <p className="ab-caveat">Course list could not be loaded.</p>}
            {!failed && !detail && <p className="ab-caveat">Loading courses…</p>}
            {detail && detail.courses.length > 0 && (
              <ul className="in-courses">
                {detail.courses.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            )}
          </section>

          <section className="cf-drawer-sec">
            <h3>Admission</h3>
            {detail ? (
              <dl className="sc-kv in-kv">
                {detail.ugEntrance && (<><dt>UG entrance</dt><dd>{detail.ugEntrance}</dd></>)}
                {detail.pgEntrance && (<><dt>PG entrance</dt><dd>{detail.pgEntrance}</dd></>)}
                {detail.admissionRoute && (<><dt>Route</dt><dd>{detail.admissionRoute}</dd></>)}
                {!detail.ugEntrance && !detail.pgEntrance && !detail.admissionRoute && (
                  <><dt>Entrance</dt><dd>Not listed in this edition.</dd></>
                )}
              </dl>
            ) : <p className="ab-caveat">Loading…</p>}
          </section>

          <section className="cf-drawer-sec">
            <h3>Fees</h3>
            <div className={`ab-fee ab-fee-${row.feeStatus === "verified" ? "published" : row.feeStatus === "source_found" ? "partial" : "none"}`}>
              <div className="ab-fee-label">{FEE_TEXT[row.feeStatus]}</div>
              <p className="ab-caveat">
                {row.feeStatus === "verified"
                  ? "Taken from the institution's own fee document. Fees change every year — confirm on the official website before applying."
                  : "This directory does not show an estimated fee where it could not verify one. Check the current fee notice on the official website."}
              </p>
            </div>
          </section>

          {detail?.website && (
            <div className="cf-drawer-cta-row">
              <a
                className="sc-btn green"
                href={`https://${detail.website.replace(/^https?:\/\//, "")}`}
                target="_blank"
                rel="noreferrer"
              >
                Official website →
              </a>
              {row.websiteVerify && (
                <span className="ab-pill ab-pill-partial">Address not re-checked this edition</span>
              )}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

export default function AdmissionIndiaAllPage() {
  const [params, setParams] = useSearchParams();
  const [open, setOpen] = useState(null);
  const [tab, setTab] = useState("stream");
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
        // after those in it, by their directory position.
        const ra = a.ranks[category] ?? Infinity;
        const rb = b.ranks[category] ?? Infinity;
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
    <CounsellingShell crumb=" / Admission in India">
      <div className="ai-hero ab-hero">
        <span className="ab-badge">Admissions 2026–27 · NIRF 2025</span>
        <h1 className="sc-h1">Admission in <em>India</em></h1>
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
          {" "}of {NIRF_980.length} profiles have no verified fee and say so. Always confirm
          current details before applying.
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
                  <button className="sc-card ai-row ab-row" onClick={() => setOpen(r)}>
                    <span className={`ai-rank ab-rank${r.ranks[category] === undefined ? " unranked" : ""}`}>
                      {r.ranks[category] !== undefined ? `#${r.ranks[category]}` : "—"}
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
                  </button>
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

      <Drawer row={open} onClose={() => setOpen(null)} />
    </CounsellingShell>
  );
}
