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
//   * Guide — the board (artboard-f22323634b41, read 2026-11-18) draws 7
//     short, step-grouped mini-guides, NOT our 17-phase/2,655-topic CMS
//     import. Opening "Read guide" on the board loads a BESPOKE 4-section
//     guide ("Study Abroad: The Basics for Indian Students" — Quick
//     Overview / Why Students Go Abroad / The Study Abroad Journey / FAQs)
//     that does not exist anywhere in our CMS. That content is a real
//     authoring task (7 guides × ~4 full sections each), not a mapping —
//     it is NOT built here, per the standing rule on this page: ship the
//     board's shape, never the board's unbacked numbers.
//     Each card below reproduces the board's title/description/bullets
//     (authored design copy, not invented) but links to and counts from
//     the closest REAL chapter of our existing guide, chosen by actually
//     reading that chapter's section titles against the board's bullets —
//     see CHAPTER_MATCH below. All 7 land on distinct real chapters.
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

// Board card → real chapter, verified by reading the chapter's own section
// titles against the board's bullets (not guessed from the phase title):
//   The basics            → ch.1  — 1.1-1.12 is a near-exact outline match
//   Countries & unis       → ch.5  — 5.4 Accreditation, 5.34 Official Sources
//                             match the bullets better than ch.4 (country
//                             factors alone)
//   After Class 12         → ch.10 — 10.4-10.8 bachelor's types, 10.20-10.21
//                             foundation/pathway years, 10.34-36 by stream
//   After graduation       → ch.6  — 6.15 tests, 6.19 SOP, 6.20 LOR, 6.17
//                             work experience: the exact fields the board's
//                             bullets name, absent from ch.10's PG section
//   Applications           → ch.7  (the handbook's own Application Process;
//   Costs & scholarships   → ch.8   ch.15/ch.16 are the subject-catalogue's
//                             near-duplicate of the same two topics — the
//                             source docx repeats this pair, see the import
//                             memory. ch.7/ch.8 are the generalist originals)
//   Visa & moving           → ch.9  — only one visa chapter exists
const CHAPTER_MATCH = {
  basics: "1-understanding-study-abroad",
  countries: "5-university-college-selection",
  after12: "10-study-levels-educational-pathways",
  afterGrad: "6-eligibility-admission-requirements",
  applications: "7-application-process",
  costs: "8-scholarships-financial-planning",
  visa: "9-student-visa-immigration-process",
};

const STEP_GROUPS = [
  {
    step: 1,
    label: "Getting started",
    sub: "New to the idea? Begin here.",
    cards: [
      {
        key: "basics",
        icon: "info",
        tag: "The basics",
        title: "Study Abroad: The Basics for Indian Students",
        desc: "What studying abroad means, who can go, study levels and the full journey in one page.",
        bullets: [
          "Study abroad after Class 12, after graduation, or later",
          "Pick your course and university first, country second",
          "A foreign degree doesn’t guarantee a job or residence",
        ],
      },
      {
        key: "countries",
        icon: "globe",
        tag: "Countries & universities",
        title: "Choosing a Country & University Abroad",
        desc: "Compare popular destinations, types of universities, rankings vs accreditation and how to verify a university.",
        bullets: [
          "Choose course and university before country",
          "Rankings and accreditation are different things",
          "Verify a university on official lists",
        ],
      },
    ],
  },
  {
    step: 2,
    label: "Your route",
    sub: "Pick the guide for where you are now.",
    cards: [
      {
        key: "after12",
        icon: "book",
        tag: "After Class 12",
        title: "Study Abroad After Class 12: Bachelor’s Options by Stream",
        desc: "Bachelor’s courses abroad for Science, Commerce and Arts students, entry tests and foundation routes.",
        bullets: [
          "A bachelor’s abroad takes 3–4 years",
          "Your Class 12 subjects decide your options",
          "Foundation and pathway years can bridge gaps",
        ],
      },
      {
        key: "afterGrad",
        icon: "graduation-cap",
        tag: "After graduation",
        title: "Master’s Abroad After Graduation: Courses, Tests & Profile",
        desc: "MS, MSc, MBA and other PG options abroad by degree, with GRE/GMAT, work experience and profile tips.",
        bullets: [
          "A master’s abroad takes 1–2 years",
          "GRE/GMAT are needed for some programmes only",
          "Your SOP, LORs and experience matter",
        ],
      },
    ],
  },
  {
    step: 3,
    label: "Apply & go",
    sub: "Tests, money and visas, step by step.",
    cards: [
      {
        key: "applications",
        icon: "file-text",
        tag: "Applications",
        title: "Study Abroad Applications: Tests, Documents & Timeline",
        desc: "Which tests you may need, the documents to prepare, intakes and a month-by-month application timeline.",
        bullets: [
          "Check which tests your course actually needs",
          "Main intakes: Fall (Sep) and Spring (Jan–Feb)",
          "Plan 12–18 months before your intake",
        ],
      },
      {
        key: "costs",
        icon: "calculator",
        tag: "Costs & scholarships",
        title: "Cost of Studying Abroad, Scholarships & Education Loans",
        desc: "What you’ll pay for, types of scholarships, how loans work and simple budgeting tips.",
        bullets: [
          "Total cost = tuition + living + one-time costs",
          "Apply for scholarships early",
          "Compare loans on interest, collateral and repayment",
        ],
      },
      {
        key: "visa",
        icon: "backpack",
        tag: "Visa & moving",
        title: "Student Visa, Pre-Departure & Working Abroad",
        desc: "Student visa steps, what to do before you fly, part-time work rules and post-study work options.",
        bullets: [
          "Apply for the student visa after accepting an offer",
          "Use only official government visa websites",
          "Part-time work is limited by visa rules",
        ],
      },
    ],
  },
];

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
    return (
      <div className="sab-step">
        <div className="sab-stepcards">
          {[0, 1].map((i) => <div key={i} className="sc-skel" style={{ height: 220 }} />)}
        </div>
      </div>
    );
  }
  if (guide === false || !(guide.chapters || []).length) {
    return (
      <div className="sc-empty">
        The study abroad guide isn’t loading right now — try again in a moment, or{" "}
        <Link to="/counselling/counsellors">talk to a counsellor</Link>.
      </div>
    );
  }

  // Real section_count per matched chapter — never the board's own small
  // counts, which belong to a bespoke mini-guide we don't have. A missing
  // match (shouldn't happen; CHAPTER_MATCH is checked against this same
  // guide at import time) falls back to "—" rather than "0", so a future
  // re-import that renames a slug fails visibly instead of lying.
  const byslug = new Map(guide.chapters.map((c) => [c.slug, c]));

  if (import.meta.env.DEV) {
    Object.entries(CHAPTER_MATCH).forEach(([key, slug]) => {
      if (!byslug.has(slug)) console.error(`StudyAbroadPage: CHAPTER_MATCH["${key}"] = "${slug}" is not a real chapter of ${GUIDE_SLUG}`);
    });
  }

  return (
    <>
      {STEP_GROUPS.map((group) => (
        <div className="sab-step" key={group.step}>
          <div className="sab-step-head">
            <span className="sab-step-badge">STEP {group.step}</span>
            <h3>{group.label}</h3>
            <p>{group.sub}</p>
          </div>
          <div className="sab-stepcards">
            {group.cards.map((card) => {
              const ch = byslug.get(CHAPTER_MATCH[card.key]);
              return (
                <div className="sab-gcard" key={card.key}>
                  <div className="sab-gcard-head">
                    <span className="sab-gcard-ic"><ScribbleIcon name={card.icon} size={18} color="#fff" /></span>
                    <span>
                      <small>STEP {group.step}</small>
                      <b>{card.tag}</b>
                    </span>
                  </div>
                  <div className="sab-gcard-body">
                    <h4>{card.title}</h4>
                    <p>{card.desc}</p>
                    <span className="sab-gcard-learn">What you’ll learn</span>
                    <ul>
                      {card.bullets.map((b) => (
                        <li key={b}>
                          <ScribbleIcon name="check" size={13} color="#6d5bd0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="sab-gcard-foot">
                    <span>{ch ? `${ch.section_count} topics` : "—"}</span>
                    <Link
                      className="sc-btn sii-cta--abroad sm"
                      to={ch ? `/counselling/guides/${GUIDE_SLUG}?chapter=${ch.slug}` : `/counselling/guides/${GUIDE_SLUG}`}
                    >
                      Read guide →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <p className="sab-gfoot">
        Thinking of studying in India instead? <Link to="/counselling/india">Go to Study in India →</Link>
      </p>
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
