// PLACEMENT: src/counselling/StudyInIndiaPage.jsx   (NEW FILE — landing/frontend app)
//
// "Study in India" — the destination the landing page's own card has been
// promising and not delivering.
//
// ── The bug this closes ──────────────────────────────────────────────
// LandingPage's "Explore at your own pace" section offers a card reading
// "Study in India — Guides for every stage and careers you can build in
// India", and it linked to /admission/india/all: the 980-row NIRF
// institutions directory. A visitor who asked for guides and careers got
// a filterable list of colleges. This page is what that card means.
//
// ── Source ───────────────────────────────────────────────────────────
// The artboard at claude.ai/artifact/4nxDHtLVf2…#artboard-e1ccdaae93d6.
// It cannot be read from a Claude Code session (the share link renders a
// sign-in wall in the Browser pane and WebFetch returns only the SPA
// shell), so this follows the screenshots in
// `~/current affairs/Career_Counselling.pdf`, which show the same board:
// breadcrumb → icon tile + title + report CTA → Guides / Explore careers
// tabs → four numbered stage cards.
//
// ── Where this deliberately does NOT match the picture ───────────────
//   * "5 min read · 9 topics" per card. We have `section_count` and no
//     word count, so there is no honest read-time to print. The real
//     section count is shown instead. The artboard's figures describe
//     SHORT stage guides ("stage wise and shorter version of India
//     guide", per the handoff's own flow sketch) — those do not exist.
//     The CMS holds the long ones: 140 sections for middle school, 725
//     for Classes 9–10. Printing "5 min read" over a 725-section guide
//     would be a lie about a half-hour of reading.
//   * "WHAT YOU'LL LEARN" bullets. The artboard shows hand-written
//     teaching points per stage. The API carries one `blurb` per guide,
//     so a stage's bullets are the real blurbs of the guides inside it.
//     Inventing three sentences per stage would attribute copy to the
//     counselling team that nobody wrote.
//   * Explore careers is a signpost, not the artboard's grid. See the
//     note on CareersTab below.
//
// Stage grouping is declared here rather than derived, because the CMS's
// ten guides and the artboard's four cards are different shapes: the
// artboard groups by school stage, and `after-10` / `after-12-*` are
// transition guides that belong with the class either side of them.

import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CounsellingShell from "./CounsellingShell";
import ScribbleIcon from "../components/icons/ScribbleIcon";
import { getGuideIndex, toGuideCard } from "../api/guidesApi";
import { useAuth } from "../contexts/AuthContext";
import { fullDetailKeys } from "./careerVocab";

// `stages` are CMS `stage` slugs (counseling/fixtures/career_guides/
// manifest.json). `lead` names the guide that titles the card; the rest
// become supporting rows. A stage slug that stops existing just drops out.
const STAGE_CARDS = [
  { n: 1, label: "For Class 6–8", lead: "middle-school", stages: ["middle"] },
  { n: 2, label: "For Class 9–10", lead: "secondary-school", stages: ["secondary", "after-10"] },
  { n: 3, label: "For Class 11–12", lead: "class-11-12", stages: ["class-11-12", "after-12"] },
  { n: 4, label: "For college students", lead: "undergraduate", stages: ["ug", "pg"] },
];

// The admissions handbook is not a school stage — it is the India-specific
// reference the whole page is named after, so it gets its own row.
const ADMISSIONS_STAGE = "admissions";

const TABS = [
  ["guides", "Guides"],
  ["careers", "Explore careers"],
];

function StageCard({ card, guides }) {
  if (!guides.length) return null;
  const lead = guides.find((g) => g.slug === card.lead) || guides[0];
  const rest = guides.filter((g) => g.slug !== lead.slug);
  const sections = guides.reduce((n, g) => n + (g.sectionCount || 0), 0);

  return (
    <article className="sii-stage">
      <header className="sii-stage-head">
        <span className="sii-stage-n">Stage {card.n}</span>
        <h3>{card.label}</h3>
      </header>

      <div className="sii-stage-body">
        <h4 className="sii-stage-title">{lead.title}</h4>
        {lead.blurb && <p className="sii-stage-blurb">{lead.blurb}</p>}

        {rest.length > 0 && (
          <>
            <p className="sii-stage-kicker">Also in this stage</p>
            <ul className="sii-stage-list">
              {rest.map((g) => (
                <li key={g.slug}>
                  <Link to={`/counselling/guides/${g.slug}`}>{g.audience || g.title}</Link>
                  {g.blurb && <span> — {g.blurb}</span>}
                </li>
              ))}
            </ul>
          </>
        )}

        <footer className="sii-stage-foot">
          <span className="sii-stage-meta">
            {guides.length} guide{guides.length === 1 ? "" : "s"}
            {sections > 0 && ` · ${sections.toLocaleString("en-IN")} sections`}
          </span>
          <Link className="sii-stage-go" to={`/counselling/guides/${lead.slug}`}>
            Read guide <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </div>
    </article>
  );
}

function GuidesTab({ guides, loading }) {
  const byStage = useMemo(() => {
    const m = new Map();
    guides.forEach((g) => {
      if (!m.has(g.stage)) m.set(g.stage, []);
      m.get(g.stage).push(g);
    });
    return m;
  }, [guides]);

  const cards = STAGE_CARDS.map((card) => ({
    card,
    guides: card.stages.flatMap((s) => byStage.get(s) || []),
  })).filter((c) => c.guides.length > 0);

  const admissions = byStage.get(ADMISSIONS_STAGE) || [];

  if (loading) {
    return (
      <div className="sii-stages">
        {[0, 1, 2, 3].map((i) => <div key={i} className="sc-skel" style={{ height: 230 }} />)}
      </div>
    );
  }

  // getGuideIndex() swallows transport failures into [] (api/guidesApi.js),
  // so an empty result here cannot be told apart from a library that is
  // genuinely empty. The copy therefore claims neither.
  if (!cards.length && !admissions.length) {
    return (
      <div className="sc-empty">
        The guide library isn’t loading right now — try again in a moment, or{" "}
        <Link to="/counselling/counsellors">talk to a counsellor</Link>.
      </div>
    );
  }

  return (
    <>
      <div className="sii-stages">
        {cards.map(({ card, guides: g }) => (
          <StageCard key={card.n} card={card} guides={g} />
        ))}
      </div>

      {admissions.map((g) => (
        <section key={g.slug} className="sii-handbook">
          <div>
            <span className="sc-badge orange">Admissions</span>
            <h3>{g.title}</h3>
            <p>{g.blurb}</p>
          </div>
          <div className="sii-handbook-acts">
            <Link className="sc-btn green sm" to={`/counselling/guides/${g.slug}`}>
              Open the handbook
            </Link>
            {/* The NIRF directory the landing card used to lead with. It is a
                good page — it was simply never an answer to "show me guides
                and careers". From here it is one click, correctly labelled. */}
            <Link className="sc-btn ghost sm" to="/admission/india">
              Explore colleges in India
            </Link>
          </div>
        </section>
      ))}
    </>
  );
}

/**
 * Explore careers — a signpost, not the artboard's grid.
 *
 * The artboard shows ~42 careers across nine interest areas, each card
 * carrying a stream, subject list, degree, entrance exam and starting
 * salary, behind stream chips, interest facets, a search box and a sort.
 * That dataset does not exist: `data/careerDetail.js` holds 30 careers
 * with no stream, interest-area, degree or entrance-exam field, and only
 * the six in CAREER_FULL have enough content for a page at all
 * (careerVocab.js's `hasFullDetail`).
 *
 * Building the chrome over invented data would put a fabricated entrance
 * exam and salary in front of a fifteen-year-old choosing a stream. So
 * this tab ships the six careers that are real and says plainly what is
 * missing, rather than a grid that looks complete and is not.
 */
function CareersTab() {
  const real = fullDetailKeys();
  return (
    <section className="sii-careers">
      <div className="sii-careers-note">
        <ScribbleIcon name="info" size={18} aria-hidden="true" />
        <p>
          The full career browser — streams, interest areas, entrance exams and
          starting salaries — is still being written. These {real.length} career
          profiles are complete and free to read now.
        </p>
      </div>

      <div className="sc-grid3">
        {real.map((key) => (
          <Link key={key} to={`/counselling/careers/${encodeURIComponent(key)}`} className="sc-guide-card">
            <span className="sc-badge teal">Career</span>
            <h3 className="sc-guide-title">{key}</h3>
            <span className="sii-career-go">View career details <span aria-hidden="true">→</span></span>
          </Link>
        ))}
      </div>

      <p className="sc-note" style={{ marginTop: 16 }}>
        Looking for something else? The{" "}
        <Link to="/counselling/guides">guide library</Link> covers streams,
        degrees and entrance exams in depth, and a{" "}
        <Link to="/counselling/profile">career report</Link> matches them to you.
      </p>
    </section>
  );
}

export default function StudyInIndiaPage() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  // The tab rides the URL so a link can point at either one, and so the
  // back button steps between them — same `?tab=` idiom the admission
  // directory and the CMS screens use.
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
    </CounsellingShell>
  );
}
