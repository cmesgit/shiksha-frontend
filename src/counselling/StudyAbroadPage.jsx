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
//   * Explore careers — CAREER_ABROAD, transcribed from the board, joined
//     to CAREER_DETAIL for the card blurb. Replaced the old "Explore
//     courses" subject-area browser, which the v3 board does not draw;
//     university browsing still lives at /admission/abroad/universities.
//
// 🔴 The guide is addressed by SLUG, not by stage. `study-abroad` carries
// stage "admissions" — the same stage as `study-in-india` — which is
// exactly how an abroad handbook ended up rendering on the India page under
// a button reading "Explore colleges in India". Select guides here by the
// one field that identifies them.

import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CounsellingShell from "./CounsellingShell";
import ScribbleIcon from "../components/icons/ScribbleIcon";
import { getGuide } from "../api/guidesApi";
import CareerExplorer from "./CareerExplorer";
import { CAREER_DETAIL } from "./data/careerDetail";
import {
  CAREER_ABROAD, INTEREST_AREAS, STREAMS, PAY_SOURCE, EXCLUDED_NOTE,
} from "./data/careerAbroad";

const GUIDE_SLUG = "study-abroad";

// The board draws exactly two: Guides · Explore careers. The old
// "Explore courses" tab browsed ABROAD_100's postgraduate subject areas;
// that is not on this board and the university directory it fed is its own
// product at /admission/abroad/universities, which still exists.
// `?tab=courses` is kept as an alias so old links land on the careers tab
// rather than silently falling back to the guide.
const TABS = [
  ["guide", "Guides"],
  ["careers", "Explore careers"],
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

// Same control set as /counselling/india — see CareerExplorer. Only the
// dataset and the card's three fact labels differ: the abroad board prints
// COURSE · TESTS · US MEDIAN PAY where India prints COURSE · ENTRANCE EXAM
// · STARTING SALARY.
const CAREERS = CAREER_ABROAD.map((c) => {
  const detail = CAREER_DETAIL[c.key] || {};
  return {
    ...c,
    // 🔴 `blurb` comes from CAREER_ABROAD, NOT from CAREER_DETAIL.overview
    // like the India page does. The editorial overviews are India-specific
    // prose — "Engineering is one of India's largest…", "Software and IT is
    // India's flagship export industry" — and rendering them on the abroad
    // card put the word "India" on every tile of a Study-abroad screen.
    // CAREER_DETAIL is still joined for `jobRoles`, which feeds the search.
    haystack: [
      c.label, c.key, c.area, c.subjects, c.course, c.tests, c.blurb || "",
      (detail.jobRoles || []).join(" "),
    ].join(" ").toLowerCase(),
  };
});

const ABROAD_FACTS = [
  ["Course", "course"],
  ["Tests", "tests"],
  ["US median pay", "pay"],
];

function CareersTab() {
  return (
    <CareerExplorer
      careers={CAREERS}
      areas={INTEREST_AREAS}
      streams={STREAMS}
      facts={ABROAD_FACTS}
      tone="abroad"
      // The board prints both sentences under the grid. The pay source is
      // not decoration: a bare "$244k / year" with no provenance reads as a
      // promise rather than a national median.
      note={`${EXCLUDED_NOTE} ${PAY_SOURCE}`}
    />
  );
}

export default function StudyAbroadPage() {
  const [params, setParams] = useSearchParams();
  const raw = params.get("tab") === "courses" ? "careers" : params.get("tab");
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

      {tab === "guide" ? <GuideTab /> : <CareersTab />}
    </CounsellingShell>
  );
}
