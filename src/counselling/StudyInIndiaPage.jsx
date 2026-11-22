// PLACEMENT: src/counselling/StudyInIndiaPage.jsx   (landing/frontend app)
//
// "Study in India" — /counselling/india.
//
// ── Source ───────────────────────────────────────────────────────────
// The board at claude.ai/artifact/Dwch7uVD5334397py5NEmD#artboard-f22323634b41
// ("Career Counselling project" → "Career Counselling v3"), transcribed in
// full to docs/STUDY_IN_INDIA_BOARD.md on 2026-11-18.
//
// 🔴 That file is the spec of record. The design project is DELETED on
// 2026-12-14; after that the board cannot be re-read. Change this screen
// against the transcription, not against memory of the picture.
//
// The board is a LIVE PROTOTYPE and was driven, not screenshotted: every
// stream chip, every interest checkbox, the sort select and the search box
// were exercised. Two rules could only be recovered that way and are
// recorded in data/careerIndia.js — stream membership is an explicit list,
// and the starting-salary string is its own field.
//
// ── The one place this deliberately does NOT match the picture ────────
// The board prints "5 min read · 9 topics" on all four stage cards. The
// guides those cards link to are, on the live CMS: 43 / 317 / 159 / 18
// minutes and 13 / 13 / 8 / 13 chapters. The board's figures describe short
// stage guides that have never been written. We ship the board's exact
// footer — clock glyph, "min read", the "·", the word "topics" — filled
// with the real numbers. Printing "5 min read" over a 317-minute guide
// would be a lie about half a day of reading.
//
// Everything else on those cards (titles, blurbs, all twelve "What you'll
// learn" bullets) IS reproduced verbatim: it is design copy authored on the
// board. An earlier version of this file refused the bullets as "copy
// nobody wrote" — correct only while the board could not be read.
//
// ── Known, deliberately untouched ────────────────────────────────────
// LandingPage.jsx:145 sends /counselling/india?q=<term> from a box labelled
// "Search guides", and this page does not read it. Wiring it to the careers
// search would route a guide query into a CAREER filter and answer "no
// careers match" for things like "middle school" — strictly worse than
// ignoring it. The board specifies no ?q= behaviour. Left alone on purpose.

import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Check, Clock, Compass, GraduationCap, Lightbulb, Target } from "lucide-react";
import CounsellingShell from "./CounsellingShell";
import ScribbleIcon from "../components/icons/ScribbleIcon";
import { getGuideIndex, getGuide, toGuideCard } from "../api/guidesApi";
import { useAuth } from "../contexts/AuthContext";
import CareerExplorer from "./CareerExplorer";
import { firstSentence } from "./careerBlurb";
import { CAREER_DETAIL } from "./data/careerDetail";
import { CAREER_INDIA, INTEREST_AREAS, STREAMS } from "./data/careerIndia";

const TABS = [
  ["guides", "Guides"],
  ["careers", "Explore careers"],
];

/* ─────────────────────────── Guides tab ─────────────────────────── */

// `stages` are CMS `stage` slugs; `lead` names the guide the card opens.
// Everything else on this object is board copy (see the header note).
const STAGE_CARDS = [
  {
    n: 1, label: "For Class 6–8", icon: Lightbulb,
    lead: "middle-school", stages: ["middle"],
    title: "Middle School Guide (Classes 6–8)",
    blurb: "Know yourself, build good habits and start exploring careers — no pressure to decide yet.",
    learn: [
      "Middle school is for exploring, not deciding",
      "Strengths include creative, personal, social and physical ones — not just marks",
      "Small daily study habits beat long cramming sessions",
    ],
  },
  {
    n: 2, label: "For Class 9–10", icon: Target,
    lead: "secondary-school", stages: ["secondary", "after-10"],
    title: "Class 9 & 10 Guide: Boards, Skills & Choosing a Stream",
    blurb: "Build a strong base, prepare for boards smartly and pick the right stream after Class 10.",
    learn: [
      "Class 9–10 builds your base for boards and for Class 11",
      "Boards test understanding — revise weekly, practise past papers",
      "There is no single best stream: Science, Commerce, Humanities and Vocational all lead to strong careers",
    ],
  },
  {
    n: 3, label: "For Class 11–12", icon: Compass,
    lead: "class-11-12", stages: ["class-11-12", "after-12"],
    title: "Class 11 & 12 Guide: Streams, Entrance Exams & Next Steps",
    blurb: "Your stream explained, key entrance exams, colleges in India and how to plan for after Class 12.",
    learn: [
      "Class 11–12 is focused, concept-heavy study in one stream",
      "Most top colleges admit through an entrance exam — know yours early",
      "Many courses (BBA, law, design, media, hotel management) are open to every stream",
    ],
  },
  {
    n: 4, label: "For college students", icon: GraduationCap,
    lead: "undergraduate", stages: ["ug", "pg"],
    title: "Undergraduate (UG) Guide: Courses, Exams & Careers",
    blurb: "UG degrees after Class 12, entrance exams, admissions, college types and what comes after graduation.",
    learn: [
      "UG degrees take 3–5.5 years after Class 12",
      "Check UGC recognition and council approval before you join",
      "Entrance exams decide most professional admissions",
    ],
  },
];

function StageCard({ card, meta }) {
  const Icon = card.icon;
  return (
    <article className="sii-stage">
      <header className="sii-stage-head">
        <span className="sii-stage-ic" aria-hidden="true"><Icon size={18} strokeWidth={2} /></span>
        <span className="sii-stage-n">Stage {card.n}</span>
        <h3>{card.label}</h3>
      </header>

      <div className="sii-stage-body">
        <h4 className="sii-stage-title">{card.title}</h4>
        <p className="sii-stage-blurb">{card.blurb}</p>

        <p className="sii-stage-kicker">What you’ll learn</p>
        <ul className="sii-stage-learn">
          {card.learn.map((line) => (
            <li key={line}>
              <Check size={15} strokeWidth={2.6} aria-hidden="true" />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <footer className="sii-stage-foot">
          {/* Real figures, not the board's "5 min read · 9 topics" — see
              the header note. Rendered only once the lead guide's detail
              has resolved, so the row never shows a placeholder number. */}
          <span className="sii-stage-meta">
            {meta ? (
              <>
                <Clock size={14} aria-hidden="true" />
                {meta.minutes ? `${meta.minutes} min read · ` : ""}
                {meta.topics} topic{meta.topics === 1 ? "" : "s"}
              </>
            ) : null}
          </span>
          <Link className="sc-btn green sm sii-stage-go" to={`/counselling/guides/${card.lead}`}>
            Read guide <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </div>
    </article>
  );
}

function GuidesTab({ guides, loading }) {
  const [meta, setMeta] = useState({});

  // Which of the four stages the CMS actually has guides for. A stage that
  // stops existing drops its card rather than rendering an empty one.
  const cards = useMemo(() => {
    const stages = new Set(guides.map((g) => g.stage));
    return STAGE_CARDS.filter((c) => c.stages.some((s) => stages.has(s)));
  }, [guides]);

  // `reading_minutes` and the chapter count are on the guide DETAIL, not on
  // the index row (which carries only `section_count`). getGuide() caches
  // per slug for the tab's lifetime and is the same cache GuidePage reads,
  // so opening a guide afterwards costs nothing.
  useEffect(() => {
    let alive = true;
    Promise.all(
      cards.map(async (c) => {
        const res = await getGuide(c.lead);
        if (res.status !== "ok") return null;
        return [c.lead, {
          minutes: res.guide.reading_minutes || 0,
          topics: (res.guide.chapters || []).length || res.guide.section_count || 0,
        }];
      })
    ).then((pairs) => {
      if (!alive) return;
      setMeta(Object.fromEntries(pairs.filter(Boolean)));
    });
    return () => { alive = false; };
  }, [cards]);

  if (loading) {
    return (
      <div className="sii-stages">
        {[0, 1, 2, 3].map((i) => <div key={i} className="sc-skel" style={{ height: 300 }} />)}
      </div>
    );
  }

  // getGuideIndex() swallows transport failures into [] (api/guidesApi.js),
  // so an empty result here cannot be told apart from a library that is
  // genuinely empty. The copy therefore claims neither.
  if (!cards.length) {
    return (
      <div className="sc-empty">
        The guide library isn’t loading right now — try again in a moment, or{" "}
        <Link to="/counselling/counsellors">talk to a counsellor</Link>.
      </div>
    );
  }

  return (
    <div className="sii-stages">
      {cards.map((card) => <StageCard key={card.n} card={card} meta={meta[card.lead]} />)}
    </div>
  );
}

/* ────────────────────────── Explore careers ─────────────────────── */

// The control set is shared with /counselling/abroad — see CareerExplorer.
// Only the dataset and the card's three fact labels differ.
const CAREERS = CAREER_INDIA.map((c) => {
  const detail = CAREER_DETAIL[c.key] || {};
  return {
    ...c,
    blurb: firstSentence(detail.overview),
    // Matches the board's own search: "pilot" returns Aviation (Pilot) AND
    // Defence Services, whose visible copy has no "pilot" — it is in that
    // record's jobRoles. Verified to return exactly those two.
    haystack: [
      c.label, c.key, c.area, c.subjects, c.course, c.exam,
      detail.overview || "", (detail.jobRoles || []).join(" "),
    ].join(" ").toLowerCase(),
  };
});

const INDIA_FACTS = [
  ["Course", "course"],
  ["Entrance exam", "exam"],
  ["Starting salary", "salary"],
];

function CareersTab() {
  return (
    <CareerExplorer
      careers={CAREERS}
      areas={INTEREST_AREAS}
      streams={STREAMS}
      facts={INDIA_FACTS}
    />
  );
}

/* ──────────────────────────── The page ──────────────────────────── */

export default function StudyInIndiaPage() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  const raw = params.get("tab");
  const tab = TABS.some(([k]) => k === raw) ? raw : "guides";

  const setTab = (next) => {
    const p = new URLSearchParams(params);
    if (next === "guides") p.delete("tab");
    else p.set("tab", next);
    setParams(p, { replace: true });
  };

  useEffect(() => {
    let alive = true;
    getGuideIndex().then((rows) => {
      if (!alive) return;
      setGuides(rows.map(toGuideCard));
      setLoading(false);
    });
    return () => { alive = false; };
  }, []);

  // Same gate as the landing page's own report CTA: the wizard needs an
  // account, so send a logged-out visitor through login with the
  // destination preserved rather than bouncing them off a guard.
  const startReport = () => {
    const to = "/counselling/profile?location=india";
    if (isAuthenticated) navigate(to);
    else navigate("/login", { state: { from: to } });
  };

  return (
    <CounsellingShell crumb=" / Study in India" plain>
      <header className="sii-head">
        <span className="sc-explore-ic" aria-hidden="true">
          <ScribbleIcon name="home" size={22} />
        </span>
        <div className="sii-head-tx">
          <h1 className="sc-h1">Study in India</h1>
          <p className="sc-sub">Short guides and careers for studying in India.</p>
        </div>
        <button type="button" className="sc-btn green" onClick={startReport}>
          Get my India career report
        </button>
      </header>

      <div className="sii-tabs" role="tablist" aria-label="Study in India">
        {TABS.map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            className={`sii-tab${tab === key ? " on" : ""}`}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "guides" ? <GuidesTab guides={guides} loading={loading} /> : <CareersTab />}

      {/* The board draws this row under BOTH tabs. */}
      <div className="sii-crosslink">
        Also considering studying abroad?{" "}
        <Link to="/counselling/abroad">Go to Study abroad <span aria-hidden="true">→</span></Link>
      </div>
    </CounsellingShell>
  );
}
