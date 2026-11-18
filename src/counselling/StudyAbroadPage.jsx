// PLACEMENT: src/counselling/StudyAbroadPage.jsx   (NEW FILE)
//
// "Study abroad" at /counselling/abroad — the twin of StudyInIndiaPage.
//
// ── Why this exists ──────────────────────────────────────────────────
// The counselling landing's "Explore at your own pace" block draws two
// cards, Study in India and Study abroad. India went to /counselling/india,
// a counselling page with Guides + Explore tabs; abroad went to
// /admission/abroad, the ADMISSION PRODUCT. Same block, same shape, two
// different kinds of destination — so the abroad card dropped the reader
// into a university directory when it promised guides and courses.
//
// /admission/abroad is untouched and still the admission product. This is
// the counselling-side door, with the same two tabs India has.
//
// ── Both tabs are DERIVED, nothing here is typed in ──────────────────
//   * Guide — the phases of "Study Abroad — Complete Guide" straight from
//     the CMS, with their own topic counts. If the import changes, this
//     changes with it.
//   * Explore courses — the postgraduate subject areas actually present in
//     abroad100.js, counted at render, each linking into the universities
//     directory already filtered to that subject.
//
// 🔴 The guide is addressed by SLUG, not by stage. `study-abroad` carries
// stage "admissions" — the same stage as `study-in-india` — which is
// exactly how an abroad handbook ended up rendering on the India page under
// a button reading "Explore colleges in India". Select guides here by the
// one field that identifies them.

import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CounsellingShell from "./CounsellingShell";
import ScribbleIcon from "../components/icons/ScribbleIcon";
import { getGuide } from "../api/guidesApi";
import { ABROAD_100 } from "./data/abroad100";

const GUIDE_SLUG = "study-abroad";
const DIRECTORY = "/admission/abroad/universities";

const TABS = [
  ["guide", "Guide"],
  ["courses", "Explore courses"],
];

function GuideTab() {
  const [guide, setGuide] = useState(null);

  useEffect(() => {
    let alive = true;
    // getGuide returns {status, guide} — unwrapping it wrong leaves
    // `chapters` undefined and silently renders nothing.
    getGuide(GUIDE_SLUG)
      .then((res) => alive && setGuide(res && res.status === "ok" ? res.guide : false))
      .catch(() => alive && setGuide(false));
    return () => { alive = false; };
  }, []);

  if (guide === null) {
    return <div className="sc-grid3">{[0, 1, 2].map((i) => <div key={i} className="sc-skel" style={{ height: 120 }} />)}</div>;
  }
  if (guide === false || !(guide.chapters || []).length) {
    return (
      <div className="sc-empty">
        The study abroad guide isn’t loading right now — try again in a moment, or{" "}
        <Link to="/counselling/counsellors">talk to a counsellor</Link>.
      </div>
    );
  }

  const phases = guide.chapters;
  const topics = phases.reduce((n, c) => n + (c.section_count || 0), 0);

  return (
    <>
      <div className="sab-head">
        <div>
          <h3>{guide.title}</h3>
          <p>
            {phases.length} phases and {topics.toLocaleString()} topics — from understanding
            study abroad to scholarships, visas and country guides.
          </p>
        </div>
        <Link className="sc-btn green sm" to={`/counselling/guides/${GUIDE_SLUG}`}>
          Start reading →
        </Link>
      </div>

      <div className="sab-phases">
        {phases.map((c) => (
          <Link
            key={c.slug}
            className="sab-phase"
            to={`/counselling/guides/${GUIDE_SLUG}?chapter=${c.slug}`}
          >
            <span className="sab-phase-n">{c.number}</span>
            <span className="sab-phase-tx">
              <b>{String(c.title).replace(/^\d+:\s*/, "")}</b>
              <small>{c.section_count} topics</small>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}

function CoursesTab() {
  const [q, setQ] = useState("");

  const subjects = useMemo(() => {
    const m = new Map();
    ABROAD_100.forEach((r) => (r.subjects || []).forEach((s) => m.set(s, (m.get(s) || 0) + 1)));
    return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, []);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return needle ? subjects.filter(([s]) => s.toLowerCase().includes(needle)) : subjects;
  }, [q, subjects]);

  return (
    <>
      <div className="sii-careers-bar">
        <div className="sc-search sii-careers-search">
          <ScribbleIcon name="search" size={16} color="rgba(14,28,15,.45)" />
          <input
            aria-label="Search courses"
            placeholder="Search subject areas"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <span className="sii-careers-count">
          {shown.length} of {subjects.length}
        </span>
      </div>

      {/* Subject areas as the source gives them — these are the main
          POSTGRADUATE areas each institution lists, not a course catalogue,
          which is why the lede says so rather than promising every degree. */}
      {shown.length === 0 ? (
        <div className="sc-empty">No subject area matches “{q.trim()}”.</div>
      ) : (
        <div className="sab-courses">
          {shown.map(([name, n]) => (
            <Link key={name} className="sab-course" to={`${DIRECTORY}?subject=${encodeURIComponent(name)}`}>
              <b>{name}</b>
              <small>{n} {n === 1 ? "university" : "universities"}</small>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default function StudyAbroadPage() {
  const [params, setParams] = useSearchParams();
  const raw = params.get("tab");
  const tab = TABS.some(([k]) => k === raw) ? raw : "guide";

  const pick = (next) => {
    const p = new URLSearchParams(params);
    if (next === "guide") p.delete("tab");
    else p.set("tab", next);
    setParams(p, { replace: true });
  };

  return (
    <CounsellingShell crumb=" / Study abroad" plain>
      {/* The board draws this hero exactly like Study in India's but in the
          module's abroad indigo rather than green — same card, same glyph
          tile, accent bar recoloured. .sii-head is shared with
          StudyInIndiaPage, so the --abroad modifier is what keeps the two
          apart; without it this page inherited the green bar. */}
      <header className="sii-head sii-head--abroad">
        <span className="sii-head-ic" aria-hidden="true">
          <ScribbleIcon name="globe" size={22} color="#6d5bd0" />
        </span>
        <div className="sii-head-tx">
          <h1 className="sc-h1">Study abroad</h1>
          <p className="sc-sub">Short guides and careers for studying abroad.</p>
        </div>
        <Link className="sc-btn sii-cta--abroad" to="/counselling/profile">Get my abroad career report →</Link>
      </header>

      <div className="sii-tabs" role="tablist" aria-label="Study abroad">
        {TABS.map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            className={`sii-tab${tab === key ? " on" : ""}`}
            onClick={() => pick(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "guide" ? <GuideTab /> : <CoursesTab />}
    </CounsellingShell>
  );
}
