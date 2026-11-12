// PLACEMENT: src/counselling/LandingPage.jsx   (landing/frontend app)
// REPLACES the old placeholder components/Counselling.jsx at /counselling.
//
// Workflow screen 1 — LANDING: hero · search & browse · Spark Finder invite ·
// how-it-works · featured counsellors · career guidance library · closing
// CTA. Guests can read every guide; "Get Started" walks them into
// login → profile wizard.
//
// Guide data comes from the backend CMS (getGuideIndex), not the retired
// static data/guides.js. Booking/counsellor content is gated by
// useCounsellorsLive — with zero counsellors approved, the page leads with
// the guide library instead of funnelling visitors into an empty directory.
// The same hook now also carries the site-wide avg rating / session total
// the hero stats row shows (one request, see useCounsellorsLive.js).

import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getCounsellors } from "../api/counselling";
import { getGuideIndex, toGuideCard } from "../api/guidesApi";
import { getPublicConfig } from "../api/publicConfig";
import { AUDIENCES } from "./wizardSteps";
import ExampleReportCard from "./ExampleReportCard";
import CounsellingShell, { initialsOf, gradOf } from "./CounsellingShell";
import useCounsellorsLive from "./useCounsellorsLive";
import ScribbleIcon from "../components/icons/ScribbleIcon";

const SearchIcon = () => <ScribbleIcon name="search" size={16} color="rgba(14,28,15,.45)" />;
const StarIcon = ({ size = 13 }) => <ScribbleIcon name="star" size={size} color="#f5a623" filled />;
// STEP_ICONS / SESSION_DOES / CheckIcon were dropped with the old
// "How career counselling works" block: the replacement numbers its steps
// in plain circles and carries no per-step icon.

// "From confused to clear in 3 steps" — artboard copy, verbatim.
//
// Step 3 names a live 1:1 session, so it follows the same honesty rule as
// the hero's third tick: with nobody approved to book, promising a video
// call is a promise the product cannot keep. The prelaunch variant swaps
// that one step rather than hiding the section, because steps 1 and 2 are
// true and useful either way.
const HOW_STEPS_LIVE = [
  ["Answer a few questions", "Tell us your class, interests and strengths. It takes about 2 minutes."],
  ["Get your career report", "See careers that fit you, with the reasons, exams and top colleges."],
  ["Talk to a counsellor", "Book a live 1:1 video session and leave with a clear next step."],
];
const HOW_STEPS_PRELAUNCH = [
  HOW_STEPS_LIVE[0],
  HOW_STEPS_LIVE[1],
  ["Read your matched guides", "Your profile picks out the guides most relevant to your class, stream and interests."],
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { live: counsellorsLive, count, avgRating, totalSessions } = useCounsellorsLive();
  const [q, setQ] = useState("");
  const [featured, setFeatured] = useState(null);
  const [guides, setGuides] = useState(null);
  // null until known. The "Study abroad" card must follow the same public
  // flag the navbar entry and /admission/abroad itself follow, or the
  // landing page becomes a fourth, unguarded way into a gated screen.
  const [abroadOn, setAbroadOn] = useState(null);

  useEffect(() => {
    let live = true;
    getCounsellors().then((d) => live && setFeatured((d.results || []).slice(0, 3)))
      .catch(() => live && setFeatured([]));
    return () => { live = false; };
  }, []);

  useEffect(() => {
    let mounted = true;
    getGuideIndex().then((cards) => mounted && setGuides(cards.map(toGuideCard)));
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    let alive = true;
    getPublicConfig()
      .then((cfg) => alive && setAbroadOn(Boolean(cfg.admission_abroad_enabled)))
      .catch(() => alive && setAbroadOn(false)); // fail closed
    return () => { alive = false; };
  }, []);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle || !guides) return null;
    return guides.filter((g) =>
      (g.title + " " + g.blurb + " " + g.audience).toLowerCase().includes(needle)
    );
  }, [q, guides]);

  // `audience` is one of wizardSteps' AUDIENCES keys (self/child/sibling/
  // other) — the SAME vocabulary the wizard's own step-0 chips use, so the
  // landing chip prefills a real field instead of inventing a parallel one.
  //
  // Routing only: nothing is stored server-side from this page. The choice
  // rides the URL, and `safeReturnPath` already preserves a query string
  // through the login round trip (see auth/returnTo.js + its tests), so a
  // logged-out visitor who picks "My child" still lands on a prefilled
  // wizard after signing in.
  const start = (audience) => {
    const to = "/counselling/profile" + (audience ? `?audience=${audience}` : "");
    if (isAuthenticated) navigate(to);
    else navigate("/login", { state: { from: to } });
  };

  const howSteps = counsellorsLive ? HOW_STEPS_LIVE : HOW_STEPS_PRELAUNCH;

  return (
    <CounsellingShell>
      {/* hero */}
      <div className="sc-herowrap">
        <div className="sc-hero">
          <div>
            <span className="sc-pill-dot">
              Free career guidance · Class 6 to UG · India &amp; Abroad
            </span>
            <h1 className="sc-h1">
              Confused about what comes next?<br /><em>Let's map your career path.</em>
            </h1>
            <p className="sc-sub">
              {counsellorsLive
                ? "Answer a few quick questions, get a personalised career report for India or abroad, and talk it through live with a counsellor matched to you."
                : "Answer a few quick questions and get a personalised career report for India or abroad — plus a free guidance library written for Indian students, Class 6 through postgraduate study."}
            </p>

            {/* The third point is dropped when no counsellor is bookable.
                useCounsellorsLive() exists precisely so this page never
                advertises a 1:1 session that nobody can actually book. */}
            <ul className="sc-ticks">
              <li>Personal report in about 2 minutes</li>
              <li>Careers, exams and colleges — India &amp; abroad</li>
              {counsellorsLive && <li>Live 1:1 sessions with expert counsellors</li>}
            </ul>
            <div style={{ display: "flex", gap: 11, flexWrap: "wrap" }}>
              {counsellorsLive ? (
                <button className="sc-btn" onClick={() => start()}>Get my free career report →</button>
              ) : (
                <Link className="sc-btn" to="/counselling/guides">Browse career guides</Link>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 18, flexWrap: "wrap" }}>
              {counsellorsLive ? (
                <>
                  {featured?.length > 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ display: "flex" }}>
                        {featured.map((c, i) => (
                          <span key={c.id} style={{
                            width: 22, height: 22, borderRadius: "50%",
                            background: gradOf(c.display_name), border: "2px solid #fff",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            font: "700 8px Montserrat, sans-serif", color: "#fff",
                            marginRight: i < featured.length - 1 ? -6 : 0,
                          }}>{initialsOf(c.display_name)}</span>
                        ))}
                      </div>
                      <span style={{ font: "500 12px Poppins, sans-serif", color: "rgba(20,32,26,.6)" }}>
                        {count} expert counsellor{count === 1 ? "" : "s"}
                      </span>
                    </div>
                  )}
                  <div style={{ width: 1, height: 14, background: "rgba(18,45,30,.15)" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <StarIcon />
                    <span style={{ font: "500 12px Poppins, sans-serif", color: "rgba(20,32,26,.6)" }}>
                      {avgRating || "New"} avg rating · {totalSessions}+ sessions
                    </span>
                  </div>
                  <div style={{ width: 1, height: 14, background: "rgba(18,45,30,.15)" }} />
                  <span style={{ font: "500 12px Poppins, sans-serif", color: "rgba(20,32,26,.6)" }}>Classes 6–UG</span>
                </>
              ) : (
                <>
                  <span style={{ font: "500 12px Poppins, sans-serif", color: "rgba(20,32,26,.6)" }}>
                    {guides === null ? "…" : guides.length} career guides
                  </span>
                  <div style={{ width: 1, height: 14, background: "rgba(18,45,30,.15)" }} />
                  <span style={{ font: "500 12px Poppins, sans-serif", color: "rgba(20,32,26,.6)" }}>Free · no login needed</span>
                  <div style={{ width: 1, height: 14, background: "rgba(18,45,30,.15)" }} />
                  <span style={{ font: "500 12px Poppins, sans-serif", color: "rgba(20,32,26,.6)" }}>Classes 6–UG</span>
                </>
              )}
            </div>
            <div className="sc-search sc-search-hero">
              <SearchIcon />
              <input placeholder="Search the guidance library — e.g. streams, NEET, commerce…" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
          </div>
          {/* The artboard replaces the old dark "what a session does" panel
              with a sample report. The 86% in it is an ILLUSTRATION — nothing
              computes a career match score (see ExampleReportCard's header) —
              which is why the card carries a permanent "Example report"
              label. Do not remove that label without also removing the number. */}
          <div className="sc-hero-art sc-hero-art--card">
            <ExampleReportCard />
          </div>
        </div>
      </div>

      {/* how it works — "From confused to clear in 3 steps" */}
      <div className="lms-sechead" style={{ marginTop: "clamp(26px,3.5vw,44px)" }}>
        <span className="sc-eyebrow">How it works</span>
        <h2>From confused to clear in 3 steps</h2>
      </div>
      <div className="sc-steps3">
        {howSteps.map(([title, body], i) => (
          <div key={title} className="sc-step3">
            <span className="sc-step3-n" aria-hidden="true">{i + 1}</span>
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* start here — "Ready to find your path?"
          The Spark Finder promo lives INSIDE this card, as the artboard
          places it. The standalone .sc-spark-invite banner that used to sit
          above this section was removed in the same change: two promos for
          one 2-minute quiz on a single screen is noise, not emphasis. */}
      <div className="sc-start">
        <div className="sc-start-grid">
          <div>
            <span className="sc-eyebrow">Start here</span>
            <h2>Ready to find your path?</h2>
            <p>
              Answer a few questions and get a personal career report for India
              or abroad — with careers that fit you, the exams to take and top
              colleges.
            </p>
            <span className="sc-qs-label" id="sc-qs-label">Quick start · Who is this for?</span>
            <div className="sc-qs-chips" role="group" aria-labelledby="sc-qs-label">
              {AUDIENCES.map(([value, label]) => (
                <button key={value} type="button" className="sc-qs-chip" onClick={() => start(value)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="sc-start-r">
            <button className="sc-btn" onClick={() => start()}>Get my free career report →</button>
            <Link to="/counselling/spark" className="sc-spark-mini">
              <span className="sc-spark-mini-ic" aria-hidden="true">✦</span>
              <span className="sc-spark-mini-b">
                <span className="sc-spark-mini-t">Play Spark Finder</span>
                <span className="sc-spark-mini-s">A 2-minute tap quiz that shows what excites you</span>
              </span>
              <span className="sc-spark-mini-go" aria-hidden="true">›</span>
            </Link>
          </div>
        </div>
      </div>

      {/* explore at your own pace */}
      <div className="lms-sechead" style={{ marginTop: "clamp(26px,3.5vw,44px)" }}>
        <span className="sc-eyebrow">Guides &amp; careers</span>
        <h2>Explore at your own pace</h2>
        <p>Free guides and career profiles.</p>
      </div>
      <div className="sc-explore2">
        <Link to="/admission/india/all" className="sc-explore-card">
          <span className="sc-explore-ic" aria-hidden="true"><ScribbleIcon name="home" size={22} /></span>
          <h3>Study in India</h3>
          <p>Guides for every stage and careers you can build in India.</p>
          <span className="sc-explore-foot">
            <span className="sc-explore-link">Explore India</span>
            <span className="sc-explore-go" aria-hidden="true">→</span>
          </span>
        </Link>

        {/* Abroad follows the public flag. When it is off the card stays on
            screen but stops being a link — the directory exists and is
            genuinely coming, so removing the card entirely would hide a real
            part of the offer, while linking it would dump a visitor on the
            "Not open yet" gate. `null` (flag not yet known) is treated as
            off: better a card that turns into a link a moment later than one
            that flashes a working link and retracts it. */}
        {abroadOn ? (
          <Link to="/admission/abroad" className="sc-explore-card">
            <span className="sc-explore-ic violet" aria-hidden="true"><ScribbleIcon name="globe" size={22} /></span>
            <h3>Study abroad</h3>
            <p>Guides on countries, tests and costs, and careers to study for abroad.</p>
            <span className="sc-explore-foot">
              <span className="sc-explore-link violet">Explore abroad</span>
              <span className="sc-explore-go violet" aria-hidden="true">→</span>
            </span>
          </Link>
        ) : (
          <div className="sc-explore-card soon">
            <span className="sc-explore-ic violet" aria-hidden="true"><ScribbleIcon name="globe" size={22} /></span>
            <h3>Study abroad</h3>
            <p>Guides on countries, tests and costs, and careers to study for abroad.</p>
            <span className="sc-explore-foot">
              <span className="sc-explore-soon">Coming soon</span>
            </span>
          </div>
        )}
      </div>

      {/* counsellors.
          Until somebody is approved this section used to be omitted
          entirely, which left the page silent about the one thing its hero
          is named after. It now says so plainly instead. No placeholder
          profiles and no "notify me" field: inventing people would be a
          lie, and collecting addresses for a date we cannot name is a
          promise with no owner. The library is the thing that works today,
          so that is what it points at.
          `counsellorsLive` is null until the stats call resolves and is
          treated as not-live — fail closed, per useCounsellorsLive's
          contract. */}
      <div className="lms-sechead-row" style={{ marginTop: "clamp(26px,3.5vw,44px)" }}>
        <div className="lms-sechead" style={{ margin: 0 }}>
          <span className="sc-eyebrow">Counsellors</span>
          <h2>Meet our counsellors</h2>
        </div>
        {counsellorsLive && <Link to="/counselling/counsellors" className="sc-viewall">View all →</Link>}
      </div>

      {!counsellorsLive && (
        <div className="sc-cslr-soon">
          <div className="sc-cslr-soon-b">
            <h3>Counsellors are joining soon</h3>
            <p>
              We are still approving the first group, so there is nobody to
              book yet — we would rather tell you that than show you a
              directory you cannot use. Every guide below is free to read in
              the meantime, no login needed.
            </p>
            <div className="sc-cslr-soon-meta">
              <span className="sc-cslr-soon-tag">Live 1:1 · 45–60 min</span>
              <span className="sc-cslr-soon-tag">Video call</span>
              <span className="sc-cslr-soon-tag">Class 6 to UG</span>
            </div>
          </div>
          <Link to="/counselling/guides" className="sc-btn ghost">Browse career guides →</Link>
        </div>
      )}

      {counsellorsLive && (
        <>

          {featured === null ? (
            <div className="sc-grid3">{[0, 1, 2].map((i) => <div key={i} className="sc-skel" style={{ height: 220 }} />)}</div>
          ) : (
            <div className="sc-grid3">
              {featured.map((c) => (
                <Link key={c.id} to={`/counselling/counsellors/${c.id}`} className="lms-cslr" style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="lms-cslr-b">
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                      <div className="sc-cslr-head">
                        <span className="sc-avatar" style={{ background: gradOf(c.display_name) }}>
                          {c.photo_url ? <img src={c.photo_url} alt="" /> : initialsOf(c.display_name)}
                        </span>
                        <div>
                          <div className="nm">{c.display_name}</div>
                          <div className="mt">{c.qualifications || "Counsellor"}</div>
                        </div>
                      </div>
                      <span style={{ font: "600 10.5px Poppins, sans-serif", color: "#0d7a67", background: "rgba(13,122,103,.09)", borderRadius: 100, padding: "3px 9px", whiteSpace: "nowrap", flex: "0 0 auto" }}>
                        Available
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderTop: "1px solid rgba(18,45,30,.07)", borderBottom: "1px solid rgba(18,45,30,.07)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <StarIcon />
                        <span style={{ font: "700 12.5px Poppins, sans-serif", color: "#14201a" }}>{c.avg_rating || "New"}</span>
                      </div>
                      <span style={{ font: "400 11.5px Poppins, sans-serif", color: "#8a9e82" }}>{c.session_count}+ sessions</span>
                    </div>
                    <div className="sc-tags">
                      {(c.specializations || []).slice(0, 3).map((s) => (
                        <span key={s.id} className="sc-badge teal">{s.name}</span>
                      ))}
                    </div>
                    <span className="sc-btn green sm" style={{ justifyContent: "center" }}>View profile &amp; book</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}

      {/* library */}
      <div className="lms-sechead-row" style={{ marginTop: "clamp(26px,3.5vw,44px)" }}>
        <div className="lms-sechead" style={{ margin: 0 }}>
          <span className="sc-eyebrow">Explore first</span>
          <h2>{results ? `Guides matching "${q.trim()}"` : "Career Guidance Library"}</h2>
        </div>
        <Link to="/counselling/guides" className="sc-viewall">View all →</Link>
      </div>
      {guides === null ? (
        <div className="sc-grid3">{[0, 1, 2].map((i) => <div key={i} className="sc-skel" style={{ height: 172 }} />)}</div>
      ) : (
        <div className="sc-grid3">
          {(results || guides.slice(0, 3)).map((g) => <GuideCard key={g.slug} g={g} />)}
          {results && results.length === 0 && (
            <div className="sc-empty" style={{ gridColumn: "1/-1" }}>No guides match — try "science", "commerce" or "class 10".</div>
          )}
        </div>
      )}

      {/* closing CTA */}
      <div className="lms-ctaband" style={{ marginTop: "clamp(26px,3.5vw,44px)" }}>
        <span className="sc-eyebrow">Free to start</span>
        <h2>Your future deserves a clear plan.</h2>
        <p>Build your career profile in two minutes and get matched with a counsellor who understands your goals.</p>
        <button className="sc-btn" onClick={() => start()}>Start your career profile →</button>
      </div>
    </CounsellingShell>
  );
}

export function GuideCard({ g }) {
  const count = g.sectionCount ?? g.sections?.length ?? 0;
  return (
    <Link to={`/counselling/guides/${g.slug}`} className={`sc-guide-card lib-card-${g.accent}`}>
      <span className={`sc-badge ${g.accent}`}>{g.audience}</span>
      <span className="sc-guide-title">{g.title}</span>
      <span className="sc-guide-blurb">{g.blurb}</span>
      <div className="sc-guide-foot">
        <span className="sc-guide-meta">{count} section{count === 1 ? "" : "s"}</span>
        <span className="lib-read-arrow">Read →</span>
      </div>
    </Link>
  );
}
