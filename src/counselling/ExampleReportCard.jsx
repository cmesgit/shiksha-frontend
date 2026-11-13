/**
 * shiksha-frontend/src/counselling/ExampleReportCard.jsx
 *
 * The hero's sample career report, built to the "Career Counselling v3"
 * artboard.
 *
 * ── Why the "EXAMPLE REPORT" label is load-bearing ──────────────────
 * The card shows "86% match". Nothing in this codebase computes a career
 * match percentage: careerPath.js returns {stage, headline, paths,
 * relatedGuides, interests} with no score, and the only matchPercent() we
 * have (CounsellingShell.jsx) scores COUNSELLORS on a relative scale that
 * floors at 35% and anchors the best option at 95%.
 *
 * So this number cannot be, and is not, a claim about the person reading
 * it. It is a picture of what a finished report looks like — the same thing
 * a product screenshot is. That is only true while the card says so, which
 * is why the label is rendered unconditionally and is not a prop. If a
 * future change makes this card show a REAL report, delete the label in the
 * same commit; a real report wearing an "example" badge is as wrong as an
 * example wearing none.
 *
 * ── Why the India/Abroad toggle actually works ──────────────────────
 * The artboard draws a two-option toggle. A visible control that does
 * nothing reads as a broken page, so it switches between two examples
 * rather than being painted on. Both are illustrations; neither is derived
 * from the reader.
 *
 * Institutions named are real and come from the directories already shipped
 * (NIRF 2025 for India, QS 2027 for abroad), so the example cannot name a
 * college the rest of the site has never heard of.
 */
import React, { useState } from "react";

const REPORTS = {
  india: {
    badge: "Best match",
    title: "Software & IT",
    sub: "Science stream · B.Tech CSE / BCA",
    match: 86,
    why: ["Enjoys coding", "Strong in maths", "Logical thinker"],
    steps: ["Prepare for JEE Main", "Build 2 small coding projects", "Shortlist colleges"],
    collegesLabel: "Top colleges",
    colleges: ["IIT Madras", "IIT Delhi", "IIIT Hyderabad"],
  },
  abroad: {
    badge: "Best match",
    title: "Computer Science",
    sub: "Master’s · 1–2 years · taught in English",
    match: 82,
    why: ["Enjoys coding", "Strong in maths", "Open to relocating"],
    steps: ["Book an IELTS date", "Draft your statement of purpose", "Shortlist 6–8 universities"],
    collegesLabel: "Example universities",
    colleges: ["MIT", "ETH Zurich", "NUS"],
  },
};

function Ring({ value }) {
  // 44px ring, 4px stroke. Drawn rather than imported so the card carries no
  // dependency for one dial.
  const r = 20;
  const c = 2 * Math.PI * r;
  return (
    <div className="er-ring" aria-hidden="true">
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={r} fill="none" stroke="#e4efe4" strokeWidth="4" />
        <circle
          cx="24" cy="24" r={r} fill="none" stroke="#125027" strokeWidth="4"
          strokeLinecap="round" strokeDasharray={`${(value / 100) * c} ${c}`}
          transform="rotate(-90 24 24)"
        />
      </svg>
      <span className="er-ring-val">
        <b>{value}%</b>
        <i>match</i>
      </span>
    </div>
  );
}

/**
 * sessionsLive — render the artboard's floating "Live 1:1 session" badge,
 * the one item landing-v3-artboard.md §1 records as NOT built.
 *
 * Gated rather than unconditional. Unlike the 86% ring, the badge states a
 * BOOKABLE FACT (45–60 minute video sessions), so the card's "EXAMPLE
 * REPORT" label does not cover it — an example report may illustrate a
 * score, but it cannot advertise a service that does not exist. With
 * /api/counseling/counselors/ returning count 0 it would do exactly that,
 * which is the same reason the hero's third tick and its CTA already sit
 * behind this flag.
 */
export default function ExampleReportCard({ sessionsLive = false }) {
  const [tab, setTab] = useState("india");
  const r = REPORTS[tab];

  return (
    <div className="er-card">
      {sessionsLive && (
        <div className="er-session">
          <span className="er-session-dot" aria-hidden="true" />
          <span>
            <b>Live 1:1 session</b>
            <small>45–60 min · video</small>
          </span>
        </div>
      )}
      <div className="er-head">
        <span className="er-kicker">Your career report</span>
        <div className="er-toggle" role="group" aria-label="Example report region">
          {[["india", "India"], ["abroad", "Abroad"]].map(([k, label]) => (
            <button
              key={k}
              type="button"
              className={`er-tab${tab === k ? " on" : ""}`}
              aria-pressed={tab === k}
              onClick={() => setTab(k)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="er-best">
        <div className="er-best-main">
          <span className="er-badge">★ {r.badge}</span>
          <div className="er-title">{r.title}</div>
          <div className="er-sub">{r.sub}</div>
        </div>
        <Ring value={r.match} />
      </div>

      <div className="er-sec">
        <span className="er-lbl">Why it fits you</span>
        <div className="er-chips">
          {r.why.map((w) => <span key={w} className="er-chip">{w}</span>)}
        </div>
      </div>

      <div className="er-sec">
        <span className="er-lbl">Your next steps</span>
        <ol className="er-steps">
          {r.steps.map((s, i) => (
            <li key={s}><span className="er-num">{i + 1}</span>{s}</li>
          ))}
        </ol>
      </div>

      <div className="er-sec">
        <span className="er-lbl">{r.collegesLabel}</span>
        <div className="er-chips">
          {r.colleges.map((c) => <span key={c} className="er-chip er-chip-alt">{c}</span>)}
        </div>
      </div>

      {/* Unconditional, and not a prop. See the file header. */}
      <div className="er-foot">Example report</div>
    </div>
  );
}
