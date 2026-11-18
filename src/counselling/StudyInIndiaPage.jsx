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
import {
  Activity, Atom, BookOpen, BookMarked, Briefcase, Check, Clock, Compass,
  DollarSign, Eye, FileText, FlaskConical, Globe, GraduationCap, Hotel,
  Landmark, Layers, LayoutGrid, Leaf, Lightbulb, LineChart, Lock, Mic,
  Monitor, Music, Navigation, Palette, PenTool, Rocket, Scale, Search,
  Shield, Star, Target, Wrench,
} from "lucide-react";
import CounsellingShell from "./CounsellingShell";
import ScribbleIcon from "../components/icons/ScribbleIcon";
import { getGuideIndex, getGuide, toGuideCard } from "../api/guidesApi";
import { useAuth } from "../contexts/AuthContext";
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

const CAREER_ICONS = {
  Activity, Atom, BookOpen, Briefcase, DollarSign, Eye, FileText,
  FlaskConical, Globe, Hotel, Landmark, Layers, LayoutGrid, Leaf,
  Lightbulb, LineChart, Lock, Mic, Monitor, Music, Navigation, Palette,
  PenTool, Rocket, Scale, Shield, Star, Target, Wrench,
};

const SORTS = [
  ["popular", "Most popular"],
  ["az", "A to Z"],
];

/**
 * The board's card blurb is the FIRST SENTENCE of `overview`, then clamped
 * to two lines by CSS — not the whole paragraph clamped. Verified against
 * all thirty: Medicine shows one short sentence with no ellipsis while its
 * overview continues "MBBS (5.5 years including internship)…".
 *
 * The lookahead requires whitespace + a capital so "B.Tech", "R&D." and
 * "₹3.5–5" do not split a sentence. Checked: reproduces all 30 exactly.
 */
function firstSentence(text) {
  if (!text) return "";
  const m = text.match(/^[\s\S]*?[.!?](?=\s+[A-Z₹])/);
  return (m ? m[0] : text).trim();
}

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

function CareersTab() {
  const [stream, setStream] = useState("all");
  const [areas, setAreas] = useState(() => new Set());
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("popular");

  const needle = q.trim().toLowerCase();

  // The sidebar's counts are computed over stream + search but NOT over the
  // area checkboxes — verified on the board: ticking one area leaves the
  // other eight counts untouched. Computing them over the area selection
  // too would zero every box the moment one was ticked.
  const base = useMemo(
    () => CAREERS.filter(
      (c) => (stream === "all" || c.streams.includes(stream)) &&
             (!needle || c.haystack.includes(needle))
    ),
    [stream, needle]
  );

  const counts = useMemo(() => {
    const out = Object.fromEntries(INTEREST_AREAS.map((a) => [a, 0]));
    base.forEach((c) => { out[c.area] += 1; });
    return out;
  }, [base]);

  const rows = useMemo(() => {
    const picked = areas.size ? base.filter((c) => areas.has(c.area)) : base;
    // "Most popular" IS the CAREER_INDIA array order, so it needs no sort.
    return sort === "az"
      ? [...picked].sort((a, b) => a.label.localeCompare(b.label))
      : picked;
  }, [base, areas, sort]);

  const toggleArea = (area) => {
    setAreas((prev) => {
      const next = new Set(prev);
      if (next.has(area)) next.delete(area); else next.add(area);
      return next;
    });
  };

  const clearAll = () => { setStream("all"); setAreas(new Set()); setQ(""); };

  const streamLabel = STREAMS.find(([k]) => k === stream)?.[1];
  const hasFilters = stream !== "all" || areas.size > 0 || needle !== "";

  return (
    <section className="sii-careers">
      <p className="sii-stream-kicker">Your stream in Class 11–12</p>
      <div className="sii-streams" role="group" aria-label="Filter by stream">
        {STREAMS.map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={stream === key}
            className={`sii-stream${stream === key ? " on" : ""}`}
            onClick={() => setStream(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="sii-careers-body">
        <aside className="sii-facets">
          <p className="sii-facet-kicker">Interest area</p>
          <ul className="sii-areas">
            {INTEREST_AREAS.map((area) => {
              const n = counts[area];
              return (
                <li key={area} className={n === 0 && !areas.has(area) ? "off" : ""}>
                  <label>
                    <input
                      type="checkbox"
                      checked={areas.has(area)}
                      disabled={n === 0 && !areas.has(area)}
                      onChange={() => toggleArea(area)}
                    />
                    <span className="sii-area-name">{area}</span>
                    <span className="sii-area-n">{n}</span>
                  </label>
                </li>
              );
            })}
          </ul>

          <p className="sii-facet-kicker">Search careers</p>
          <div className="sc-search sii-career-search">
            <Search size={16} aria-hidden="true" />
            <input
              aria-label="Search careers"
              placeholder="e.g. doctor, design, pilot"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </aside>

        <div className="sii-careers-main">
          <div className="sii-sortbar">
            <label className="sii-sort-lb" htmlFor="sii-sort">Sort</label>
            <select
              id="sii-sort"
              className="sii-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORTS.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
            </select>
          </div>

          {hasFilters && (
            <div className="sii-pills">
              {stream !== "all" && (
                <button type="button" className="sii-pill" onClick={() => setStream("all")}>
                  {streamLabel} <span aria-hidden="true">×</span>
                  <span className="sii-sr">Remove stream filter</span>
                </button>
              )}
              {INTEREST_AREAS.filter((a) => areas.has(a)).map((a) => (
                <button key={a} type="button" className="sii-pill" onClick={() => toggleArea(a)}>
                  {a} <span aria-hidden="true">×</span>
                  <span className="sii-sr">Remove interest area filter</span>
                </button>
              ))}
              {needle !== "" && (
                <button type="button" className="sii-pill" onClick={() => setQ("")}>
                  “{q.trim()}” <span aria-hidden="true">×</span>
                  <span className="sii-sr">Clear search</span>
                </button>
              )}
              <button type="button" className="sii-clear" onClick={clearAll}>Clear all</button>
            </div>
          )}

          {rows.length === 0 ? (
            <div className="sii-noresult">
              <p className="sii-noresult-h">No careers match these filters.</p>
              <p>Try removing an area or choosing “All streams”.</p>
              <button type="button" className="sii-clear" onClick={clearAll}>Clear all filters</button>
            </div>
          ) : (
            <div className="sii-career-grid">
              {rows.map((c) => {
                const Icon = CAREER_ICONS[c.icon] || Lightbulb;
                return (
                  <article key={c.key} className="sii-career">
                    <header className="sii-career-top">
                      <span className="sii-career-ic" aria-hidden="true">
                        <Icon size={18} strokeWidth={2} />
                      </span>
                      <div className="sii-career-id">
                        <h3>{c.label}</h3>
                        <p className="sii-career-area">{c.area}</p>
                      </div>
                    </header>

                    {c.blurb && <p className="sii-career-blurb">{c.blurb}</p>}

                    <p className="sii-career-subj">
                      <BookMarked size={14} aria-hidden="true" />
                      <span className="sii-career-subj-lb">Subjects:</span>
                      <b>{c.subjects}</b>
                    </p>

                    <dl className="sii-career-facts">
                      <div><dt>Course</dt><dd>{c.course}</dd></div>
                      <div><dt>Entrance exam</dt><dd>{c.exam}</dd></div>
                      <div><dt>Starting salary</dt><dd>{c.salary}</dd></div>
                    </dl>

                    <Link
                      className="sii-career-go"
                      to={`/counselling/careers/${encodeURIComponent(c.key)}`}
                    >
                      View career details <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
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
    <CounsellingShell crumb=" / Study in India">
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
