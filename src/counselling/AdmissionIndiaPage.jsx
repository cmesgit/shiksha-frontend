// PLACEMENT: src/counselling/AdmissionIndiaPage.jsx   (NEW FILE — landing/frontend app)
//
// "Admission in India" — the NIRF 2025 top-50 engineering directory. This is
// the destination the career pages' "Explore colleges in India →" button
// used to stub with a coming-soon modal.
//
// Deep-linkable: /admission/india?program=Computer Science,Information Technology
// Filters live in the URL so a link from a career page lands pre-filtered and
// a filtered view can be shared or reloaded.
//
// Static reference data (data/institutions.js), no API call — same shape as
// the career detail pages.
//
// NOT BUILT, deliberately: the prototype's "what is due now" deadline strip
// (no dates in the dataset, and a wrong admission deadline is worse than
// none) and the per-programme "top institutions" tables (the directory with
// a programme filter already answers that question).

import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CounsellingShell from "./CounsellingShell";
import {
  INSTITUTIONS, INSTITUTION_TYPES, PROGRAMS, EXAMS, STATES, TYPE_MONOGRAM,
} from "./data/institutions";

const SORTS = [
  ["rank", "NIRF rank"],
  ["name", "Name A–Z"],
  ["score", "Highest score"],
  ["oldest", "Oldest first"],
];

const csv = (v) => (v ? String(v).split(",").map((s) => s.trim()).filter(Boolean) : []);

function FilterGroup({ title, options, selected, onToggle }) {
  const [open, setOpen] = useState(true);
  if (!options.length) return null;
  return (
    <div className="sc-fgroup">
      <button className={`sc-fgroup-head${open ? "" : " closed"}`} onClick={() => setOpen(!open)}>
        {title}
        <span className="cf-chev">{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <div className="sc-fgroup-body">
          {options.map((o) => (
            <label key={o.value} className="sc-fopt">
              <input type="checkbox" checked={selected.includes(o.value)}
                onChange={() => onToggle(o.value)} />
              <span>{o.label}</span>
              <em>{o.count}</em>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function DetailDrawer({ row, onClose, onBookCounsellor }) {
  useEffect(() => {
    if (!row) return undefined;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [row, onClose]);
  if (!row) return null;
  return (
    <div className="cf-drawer-mask" onClick={onClose}>
      <aside className="cf-drawer" role="dialog" aria-modal="true" aria-label={row.n}
        onClick={(e) => e.stopPropagation()}>
        <header className="cf-drawer-head">
          <span className="ai-mono" data-cat={row.cat}>{TYPE_MONOGRAM[row.cat] || "–"}</span>
          <div>
            <div className="cf-drawer-kicker">NIRF #{row.rk} · Score {row.sc}</div>
            <h2 className="cf-drawer-title">{row.n}</h2>
          </div>
          <button className="cf-drawer-x" onClick={onClose} aria-label="Close">×</button>
        </header>
        <div className="cf-drawer-body">
          <p className="cf-drawer-summary">
            {row.city}, {row.state} · Established {row.estRaw} · {row.instType}
          </p>
          <section className="cf-drawer-sec"><h3>Overview</h3><p>{row.ov}</p></section>
          {row.path && (
            <section className="cf-drawer-sec"><h3>Admission pathway</h3><p>{row.path}</p></section>
          )}
          {(row.courses || []).length > 0 && (
            <section className="cf-drawer-sec">
              <h3>Popular courses</h3>
              <div className="sc-tags">{row.courses.map((c) => <span key={c} className="sc-chip">{c}</span>)}</div>
            </section>
          )}
          {(row.exams || []).length > 0 && (
            <section className="cf-drawer-sec">
              <h3>Entry via</h3>
              <div className="sc-tags">{row.exams.map((e) => <span key={e} className="sc-chip">{e}</span>)}</div>
            </section>
          )}
          <button className="sc-btn green cf-drawer-cta" onClick={onBookCounsellor}>
            Talk to a counsellor about this →
          </button>
        </div>
      </aside>
    </div>
  );
}

export default function AdmissionIndiaPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [detail, setDetail] = useState(null);

  // Filters live in the URL — see the file header.
  const types = csv(params.get("type"));
  const states = csv(params.get("state"));
  const programs = csv(params.get("program"));
  const exams = csv(params.get("exam"));
  const q = params.get("q") || "";
  const sort = params.get("sort") || "rank";

  const patch = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || (Array.isArray(value) && !value.length)) next.delete(key);
    else next.set(key, Array.isArray(value) ? value.join(",") : value);
    setParams(next, { replace: true });
  };
  const toggle = (key, list, value) =>
    patch(key, list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Facet counts are computed on the UNFILTERED set, so picking "Private"
  // can't make every other type's chip vanish and strand the user.
  const counts = useMemo(() => {
    const tally = (key) => INSTITUTIONS.reduce((m, r) => {
      const vals = Array.isArray(r[key]) ? r[key] : [r[key]];
      vals.forEach((v) => { if (v) m[v] = (m[v] || 0) + 1; });
      return m;
    }, {});
    return { cat: tally("cat"), state: tally("state"), programs: tally("programs"), exams: tally("exams") };
  }, []);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let out = INSTITUTIONS.filter((r) => {
      if (types.length && !types.includes(r.cat)) return false;
      if (states.length && !states.includes(r.state)) return false;
      if (programs.length && !(r.programs || []).some((p) => programs.includes(p))) return false;
      if (exams.length && !(r.exams || []).some((e) => exams.includes(e))) return false;
      if (needle) {
        const hay = `${r.n} ${r.sn} ${r.city} ${r.state}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
    out = [...out];
    if (sort === "name") out.sort((a, b) => a.n.localeCompare(b.n));
    else if (sort === "score") out.sort((a, b) => b.sc - a.sc);
    else if (sort === "oldest") out.sort((a, b) => a.est - b.est);
    else out.sort((a, b) => a.rk - b.rk);
    return out;
  }, [types, states, programs, exams, q, sort]);

  const activeChips = [
    ...types.map((v) => ["type", v, INSTITUTION_TYPES.find((c) => c.k === v)?.label || v]),
    ...states.map((v) => ["state", v, v]),
    ...programs.map((v) => ["program", v, v]),
    ...exams.map((v) => ["exam", v, v]),
  ];

  const clearAll = () => setParams(new URLSearchParams(), { replace: true });
  const bookCounsellor = () => navigate("/counselling/counsellors");

  return (
    <CounsellingShell crumb=" / Admission in India">
      <div className="ai-hero">
        <span className="sc-eyebrow">Engineering admissions · NIRF 2025</span>
        <h1 className="sc-h1">Engineering admission in <em>India</em></h1>
        <p className="sc-sub">
          The NIRF 2025 top 50 engineering institutions, with the entrance exam,
          admission pathway and campus facts for each.
        </p>
        <div className="sc-search sc-search-hero">
          <input value={q} placeholder="Search by institution, city or state…"
            onChange={(e) => patch("q", e.target.value)} />
        </div>
        <div className="cf-stats ai-stats">
          <div className="cf-stat"><span className="cf-stat-label">NIRF-ranked institutions</span><span className="cf-stat-value">{INSTITUTIONS.length}</span></div>
          <div className="cf-stat"><span className="cf-stat-label">States & UTs covered</span><span className="cf-stat-value">{STATES.length}</span></div>
          <div className="cf-stat"><span className="cf-stat-label">Institution types</span><span className="cf-stat-value">{INSTITUTION_TYPES.length - 1}</span></div>
        </div>
      </div>

      <section className="ai-journey" aria-label="Plan your engineering admission">
        <div className="sc-card ai-journey-card">
          <span className="sc-eyebrow">1 · Explore the career</span>
          <h2>Choose a direction</h2>
          <p>Compare engineering and technology paths before selecting a programme.</p>
          <div className="ai-journey-links">
            <Link to="/counselling/careers/Engineering">Engineering career →</Link>
            <Link to="/counselling/careers/IT">IT career →</Link>
          </div>
        </div>
        <div className="sc-card ai-journey-card">
          <span className="sc-eyebrow">2 · Understand admissions</span>
          <h2>Learn the route</h2>
          <p>Read the India admissions guide, then check each institution’s current eligibility and exam rules.</p>
          <Link to="/counselling/guides/study-in-india">India admissions guide →</Link>
        </div>
        <div className="sc-card ai-journey-card">
          <span className="sc-eyebrow">3 · Build a shortlist</span>
          <h2>Compare institutions</h2>
          <p>Use programme, entrance exam and state filters below to find institutions worth investigating.</p>
          <a href="#ai-directory">Browse the directory ↓</a>
        </div>
      </section>

      <div className="sc-lib-layout" id="ai-directory">
        <aside className="sc-rail">
          <div className="sc-filters-top">
            <strong>Filters</strong>
            {activeChips.length > 0 && (
              <button className="sc-filters-clear" onClick={clearAll}>Clear all</button>
            )}
          </div>
          <FilterGroup title="Institution type"
            options={INSTITUTION_TYPES.filter((c) => c.k !== "all")
              .map((c) => ({ value: c.k, label: c.label, count: counts.cat[c.k] || 0 }))}
            selected={types} onToggle={(v) => toggle("type", types, v)} />
          <FilterGroup title="Programme"
            options={PROGRAMS.map((p) => ({ value: p, label: p, count: counts.programs[p] || 0 }))}
            selected={programs} onToggle={(v) => toggle("program", programs, v)} />
          <FilterGroup title="Entrance exam"
            options={EXAMS.map((e) => ({ value: e, label: e, count: counts.exams[e] || 0 }))}
            selected={exams} onToggle={(v) => toggle("exam", exams, v)} />
          <FilterGroup title="State / UT"
            options={STATES.map((s) => ({ value: s, label: s, count: counts.state[s] || 0 }))}
            selected={states} onToggle={(v) => toggle("state", states, v)} />
        </aside>

        <div>
          <div className="cf-coll-controls">
            <p className="sc-note ai-resultline">
              {rows.length} of {INSTITUTIONS.length} institutions
            </p>
            <label className="cf-sort">
              Sort by
              <select value={sort} onChange={(e) => patch("sort", e.target.value)}>
                {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </label>
          </div>

          {activeChips.length > 0 && (
            <div className="sc-tags ai-active">
              {activeChips.map(([key, value, label]) => (
                <button key={`${key}:${value}`} className="sc-fchip"
                  onClick={() => toggle(key, csv(params.get(key)), value)}>
                  {label} ×
                </button>
              ))}
            </div>
          )}

          {rows.length === 0 ? (
            <div className="sc-empty">
              No institutions match these filters.
              <div style={{ marginTop: 14 }}>
                <button className="sc-btn ghost" onClick={clearAll}>Clear all filters</button>
              </div>
            </div>
          ) : (
            <div className="ai-list">
              {rows.map((r) => (
                <button key={r.rk} className="sc-card ai-row" onClick={() => setDetail(r)}>
                  <span className="ai-mono" data-cat={r.cat}>{TYPE_MONOGRAM[r.cat] || "–"}</span>
                  <span className="ai-row-main">
                    <strong>{r.n}</strong>
                    <em>{r.city}, {r.state} · Est. {r.estRaw}</em>
                    <span className="ai-row-prog">{(r.programs || []).slice(0, 4).join(" · ")}</span>
                  </span>
                  <span className="ai-row-meta">
                    <span className="ai-rank">NIRF #{r.rk}</span>
                    <span className="sc-note">Score {r.sc}</span>
                    <span className="ai-row-exam">{(r.exams || []).slice(0, 2).join(", ")}</span>
                  </span>
                </button>
              ))}
            </div>
          )}

          <div className="sc-card ai-cta">
            <div>
              <strong>Not sure where to apply?</strong>
              <p className="sc-note">
                Talk through your options and shortlist institutions. Confirm current
                cutoffs, eligibility and deadlines on official admission sites.
              </p>
            </div>
            <Link className="sc-btn green" to="/counselling/counsellors">Book a counsellor →</Link>
          </div>

          <p className="sc-note ai-foot">
            Data reflects NIRF 2025 Engineering rankings 1–50. Admission pathways
            and campus facts are indicative — confirm on the institution's own
            admission page.
          </p>
        </div>
      </div>

      <DetailDrawer row={detail} onClose={() => setDetail(null)} onBookCounsellor={bookCounsellor} />
    </CounsellingShell>
  );
}
