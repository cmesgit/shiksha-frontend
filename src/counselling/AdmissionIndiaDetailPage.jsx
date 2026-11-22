// PLACEMENT: src/counselling/AdmissionIndiaDetailPage.jsx   (NEW FILE)
//
// Admission in India → one institution, at /admission/india/all/:rank.
// Built to the Admission in India v2 board, driven directly (clicked IIT
// Madras, walked all four tabs, clicked Request brochure and + Add to
// compare, clicked Compare now and back) — same discipline as
// AbroadUniversityDetailPage.jsx, not inferred from the equivalent screen.
//
// ── Why this exists ───────────────────────────────────────────────────
// The live directory opened a university's full profile in a `cf-drawer`
// (Courses / Admission / Fees sections, no URL, no Similar institutions).
// The board gives every institution its own routable page — breadcrumb, 4
// tabs (Overview/Courses/Fees/Admission), a Similar institutions rail —
// with NO sidebar "country at a glance" card, because India admission has
// no per-destination guide the way a study-abroad country page does.
//
// ── :rank is `listRank`, not a name slug ─────────────────────────────
// abroad100.js is a checked-unique 100 rows, so a name-derived slug was
// safe. nirf980.js is 980 rows with name collisions close enough (campus
// variants, near-identical institution names) that deriving a slug here
// without re-verifying uniqueness on every build would be fragile.
// `listRank` is already a unique, stable integer — use it directly.
//
// ── No per-institution prose exists in this dataset — none invented ───
// abroad100.js carries curated `overview`/`academic`/`applying` paragraphs
// per university. nirf980.js has NO such fields — only structured facts
// (city/state/type/ownership/ranks/streams/exams) plus a lazy course/
// entrance payload. The Overview tab below is therefore a fact table and
// the institution's own NIRF category chips, never a written paragraph —
// writing one would be inventing text this directory never had.
//
// ── Fees: the board shows a rupee figure; this dataset never verifies one ─
// Same gap AdmissionIndiaAllPage.jsx already handles honestly (FEE_TEXT +
// caveat, no amount). This page keeps that exact treatment rather than
// inventing a number to match the artboard's mock figure.
//
// ── Similar institutions ──────────────────────────────────────────────
// Verified against IIT Madras (type "IIT"): the list was IIT Bombay / Delhi
// / Kanpur / Kharagpur — all type "IIT" — and skipped Indian Institute of
// Science despite its Overall rank of 2, because IISc's type is "Public
// research / specialised institute", not "IIT". Rule: same `type`, Overall
// rank order, top 5, excluding self — not simply "next N by rank".

import React, { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import CounsellingShell from "./CounsellingShell";
import AdmissionHelpModal from "./AdmissionHelpModal";
import IndiaCompareBar from "./IndiaCompareBar";
import { IndiaCompareProvider } from "./IndiaCompareContext";
import { useIndiaCompare } from "./useIndiaCompare";
import { NIRF_980 } from "./data/nirf980";
import { rankStart, rankLabel, isBand, FEE_TEXT, rankParam } from "./data/nirfFacets";

const DIRECTORY = "/admission/india/all";

const TABS = [
  ["overview", "Overview"],
  ["courses", "Courses"],
  ["fees", "Fees"],
  ["admission", "Admission"],
];

const FactRow = ({ label, value, href }) => (
  <div className="abu-fact">
    <span className="abu-fact-label">{label}</span>
    <span className="abu-fact-value">
      {href ? <a href={href} target="_blank" rel="noreferrer">{value} ↗</a> : value}
    </span>
  </div>
);

export default function AdmissionIndiaDetailPage() {
  return (
    <IndiaCompareProvider>
      <AdmissionIndiaDetailPageInner />
      <IndiaCompareBar />
    </IndiaCompareProvider>
  );
}

function AdmissionIndiaDetailPageInner() {
  const { rank } = useParams();
  const [params, setParams] = useSearchParams();
  const tab = TABS.some(([k]) => k === params.get("tab")) ? params.get("tab") : "overview";
  const [helpOpen, setHelpOpen] = useState(false);
  const { inCompare, toggle } = useIndiaCompare();

  const row = useMemo(
    () => NIRF_980.find((r) => r.listRank === Number(rank)),
    [rank]
  );

  const [detail, setDetail] = useState(null);
  const [detailFailed, setDetailFailed] = useState(false);

  useEffect(() => {
    if (!row) return;
    let live = true;
    setDetail(null);
    setDetailFailed(false);
    // Loaded here, not at module scope: the detail payload is ~450 KB and
    // the directory list never renders any of it.
    import("./data/nirf980-detail")
      .then((m) => {
        if (!live) return;
        setDetail(m.NIRF_980_DETAIL.find((d) => d.listRank === row.listRank) || null);
      })
      .catch(() => live && setDetailFailed(true));
    return () => { live = false; };
  }, [row]);

  // An unknown rank is a wrong URL, not an error worth a page — same
  // precedent as AbroadUniversityDetailPage's unknown-slug handling.
  if (!row) return <Navigate to={DIRECTORY} replace />;

  const rankEntries = Object.entries(row.ranks);
  const primary = rankEntries.find(([k]) => k === "Overall")
    || [...rankEntries].sort((a, b) => rankStart(a[1]) - rankStart(b[1]))[0];

  const similar = NIRF_980
    .filter((r) => r.type === row.type && r.listRank !== row.listRank)
    .sort((a, b) => rankStart(a.ranks.Overall) - rankStart(b.ranks.Overall))
    .slice(0, 5);

  const setTab = (next) => {
    const p = new URLSearchParams(params);
    if (next === "overview") p.delete("tab");
    else p.set("tab", next);
    setParams(p, { replace: true });
  };

  const website = detail?.website;

  return (
    <CounsellingShell crumb=" / Admission in India">
      <header className="abu-head">
        <div className="abu-head-tx">
          <h1 className="abu-h1">{row.name}</h1>
          <p className="abu-sub">
            {[row.city, row.state].filter(Boolean).join(", ")} · {row.type} · {row.ownership}
            {website && (
              <>
                {" · "}
                <a href={`https://${website.replace(/^https?:\/\//, "")}`} target="_blank" rel="noreferrer">
                  {website.replace(/^https?:\/\//, "").replace(/\/$/, "")} ↗
                </a>
              </>
            )}
          </p>
        </div>
        <div className="abu-head-side">
          {primary && (
            <div className="abu-rankbox">
              <b>{rankLabel(primary[1])}</b>
              <small>NIRF 2025 {primary[0]}</small>
            </div>
          )}
          <div className="abu-head-btns">
            <button className="sc-btn abu-help" onClick={() => setHelpOpen(true)}>Request brochure</button>
            <button className="sc-btn ghost" onClick={() => toggle(row.listRank)}>
              {inCompare(row.listRank) ? "✓ In compare" : "+ Add to compare"}
            </button>
          </div>
        </div>
      </header>

      <AdmissionHelpModal
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        title="Request brochure"
        subtitle={`Share your details and we'll send you ${row.name}'s brochure and help with admissions.`}
        universityName={row.name}
        domain="india"
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
                <FactRow label="Location" value={[row.city, row.state].filter(Boolean).join(", ") || "—"} />
                <FactRow label="Institution type" value={row.type} />
                <FactRow label="Ownership" value={row.ownership} />
                <FactRow label="Streams" value={row.streams.join(", ") || "—"} />
                {website && (
                  <FactRow
                    label="Official website"
                    value={website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    href={`https://${website.replace(/^https?:\/\//, "")}`}
                  />
                )}
              </div>
              <h3 className="abu-subh">NIRF India Rankings 2025</h3>
              <div className="abu-chips">
                {rankEntries.map(([k, v]) => (
                  <span key={k} className="sc-fchip ab-subject" title={isBand(v) ? `Banded, not a single position.` : undefined}>
                    {k} {rankLabel(v)}
                  </span>
                ))}
              </div>
              <p className="abu-source">
                Ranking source: NIRF India Rankings 2025, Ministry of Education.
                {row.websiteVerify && " Website address from a known institutional domain, not re-checked this edition."}
              </p>
            </section>
          )}

          {tab === "courses" && (
            <section className="abu-card">
              <h2>Courses</h2>
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
              {detailFailed && <p className="ab-caveat">Course list could not be loaded.</p>}
              {!detailFailed && !detail && <p className="ab-caveat">Loading courses…</p>}
              {detail && detail.courses.length > 0 && (
                <ul className="in-courses">
                  {detail.courses.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              )}
            </section>
          )}

          {tab === "fees" && (
            <section className="abu-card">
              <h2>Fees</h2>
              <div className={`ab-fee ab-fee-${row.feeStatus === "verified" ? "published" : row.feeStatus === "source_found" ? "partial" : "none"}`}>
                <div className="ab-fee-label">{FEE_TEXT[row.feeStatus]}</div>
                <p className="ab-caveat">
                  {row.feeStatus === "verified"
                    ? "Taken from the institution's own fee document. Fees change every year — confirm on the official website before applying."
                    : "This directory does not show an estimated fee where it could not verify one. Check the current fee notice on the official website."}
                </p>
              </div>
            </section>
          )}

          {tab === "admission" && (
            <section className="abu-card">
              <h2>Admission</h2>
              {detailFailed && <p className="ab-caveat">Admission details could not be loaded.</p>}
              {!detailFailed && !detail && <p className="ab-caveat">Loading…</p>}
              {detail && (
                <dl className="sc-kv in-kv">
                  {detail.ugEntrance && (<><dt>Undergraduate</dt><dd>{detail.ugEntrance}</dd></>)}
                  {detail.pgEntrance && (<><dt>Postgraduate &amp; research</dt><dd>{detail.pgEntrance}</dd></>)}
                  {detail.admissionRoute && (<><dt>Admission route</dt><dd>{detail.admissionRoute}</dd></>)}
                  {!detail.ugEntrance && !detail.pgEntrance && !detail.admissionRoute && (
                    <><dt>Entrance</dt><dd>Not listed in this edition.</dd></>
                  )}
                </dl>
              )}
              {row.exams.length > 0 && (
                <>
                  <h3 className="abu-subh">Entrance exams</h3>
                  <div className="abu-chips">
                    {row.exams.map((e) => <span key={e} className="sc-fchip ab-subject">{e}</span>)}
                  </div>
                </>
              )}
            </section>
          )}
        </div>

        <aside className="abu-side">
          <div className="abu-sidecard abu-sidecard-cta">
            <b>Need help applying here?</b>
            <p>A ShikshaCom counsellor can help you shortlist, pick the right entrance exam and track deadlines.</p>
            <Link className="sc-btn white" to="/counselling/counsellors">Talk to counsellor</Link>
          </div>

          {similar.length > 0 && (
            <div className="abu-sidecard">
              <h3>Similar institutions</h3>
              <ul className="abu-similar">
                {similar.map((r) => (
                  <li key={r.listRank}>
                    <Link to={`${DIRECTORY}/${rankParam(r)}`}>
                      <b>{r.name}</b>
                      <small>
                        {rankLabel(r.ranks.Overall)} · {r.type}
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
        Rankings: NIRF India Rankings 2025, Ministry of Education. Course and admission details
        change every year — always confirm with the institution's own website before applying.
      </p>
    </CounsellingShell>
  );
}
