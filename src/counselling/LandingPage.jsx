// PLACEMENT: src/counselling/LandingPage.jsx   (landing/frontend app)
// REPLACES the old placeholder components/Counselling.jsx at /counselling.
//
// Workflow screen 1 — LANDING, built to the "Career Counselling v3" board
// (claude.ai/artifact/Dwch7uVD5334397py5NEmD#artboard-f22323634b41), read
// in the browser at full width on 2026-11-17.
//
// Board order, which is this file's order:
//   hero (+ sample report card) · how it works · start here (+ Spark Finder)
//   · guides & careers · meet our counsellors · footer
//
// Two sections this page used to carry are NOT on the board and were
// removed: the "Career Guidance Library" grid and the "Your future
// deserves a clear plan." CTA band. See the note above </CounsellingShell>.
//
// This page no longer has a pre-launch variant. It used to swap its
// sub-copy, third tick, CTA and how-it-works step 3 on useCounsellorsLive(),
// which meant prod — where no counsellor is approved yet — never rendered
// the board at all. Owner decision 2026-11-17: build the board and approve
// counsellors. The only survivor is the counsellor grid's empty state.

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getCounsellors } from "../api/counselling";
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

// "From confused to clear in 3 steps" — board copy, verbatim.
//
// There is no longer a prelaunch variant of step 3. This page used to swap
// "Talk to a counsellor" for "Read your matched guides" whenever no
// counsellor was approved, along with the hero's third tick, its sub-copy
// and its CTA — a whole second version of the page keyed on
// useCounsellorsLive(). Owner decision 2026-11-17: build the board as drawn
// and approve counsellors to make it true, rather than ship a page that
// renders its pre-launch self indefinitely. The gating is gone from all of
// those; what remains of useCounsellorsLive here is the counsellor grid's
// own empty state, which is a rendering concern, not a different page.
const HOW_STEPS = [
  ["Answer a few questions", "Tell us your class, interests and strengths. It takes about 2 minutes."],
  ["Get your career report", "See careers that fit you, with the reasons, exams and top colleges."],
  ["Talk to a counsellor", "Book a live 1:1 video session and leave with a clear next step."],
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  // Only `live` is read now: the hero stats row the other three fed
  // (count / avgRating / totalSessions) is not on the board and is gone.
  const { live: counsellorsLive } = useCounsellorsLive();
  const [q, setQ] = useState("");
  const [featured, setFeatured] = useState(null);
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
    let alive = true;
    getPublicConfig()
      .then((cfg) => alive && setAbroadOn(Boolean(cfg.admission_abroad_enabled)))
      .catch(() => alive && setAbroadOn(false)); // fail closed
    return () => { alive = false; };
  }, []);

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

  const howSteps = HOW_STEPS;

  return (
    <CounsellingShell>
      {/* hero */}
      <div className="sc-herowrap">
        <div className="sc-hero">
          <div>
            <span className="sc-pill-dot">
              Free career guidance · Class 6 to UG · India &amp; Abroad
            </span>
            {/* No <br/>: the board lets this wrap naturally, so "Let's"
                sits on the same line as "comes next?" and the green clause
                breaks wherever the column does. A hard break put the whole
                green sentence on its own line, which is not the board. */}
            <h1 className="sc-h1">
              Confused about what comes next? <em>Let's map your career path.</em>
            </h1>
            <p className="sc-sub">
              Answer a few quick questions, get a personalised career report for India
              or abroad, and talk it through live with a counsellor matched to you.
            </p>

            <ul className="sc-ticks">
              <li>Personal report in about 2 minutes</li>
              <li>Careers, exams and colleges — India &amp; abroad</li>
              <li>Live 1:1 sessions with expert counsellors</li>
            </ul>
            <div style={{ display: "flex", gap: 11, flexWrap: "wrap" }}>
              <button className="sc-btn" onClick={() => start()}>Get my free career report →</button>
            </div>
            {/* The board puts the search directly under the CTA, labelled
                "Search guides", with its own Search button — and carries NO
                stats row between them, so the counsellor-count / rating /
                "N career guides" strip that used to sit here is gone.

                It NAVIGATES rather than filtering in place: the results used
                to render into the "Career Guidance Library" section further
                down, which the board does not have and which this change
                removes. Study in India's Guides tab is where guides live. */}
            <form
              className="sc-search sc-search-hero"
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                const term = q.trim();
                navigate("/counselling/india" + (term ? `?q=${encodeURIComponent(term)}` : ""));
              }}
            >
              <SearchIcon />
              <input
                aria-label="Search guides"
                placeholder="Search guides"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <button type="submit" className="sc-search-go">Search</button>
            </form>
          </div>

          {/* The board's right-hand column: a sample career report. The 86%
              in it is an ILLUSTRATION — nothing computes a career match score
              (see ExampleReportCard's header) — which is why the card carries
              a permanent "EXAMPLE REPORT" label. Do not remove that label
              without also removing the number. */}
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
        {/* /counselling/india, NOT /admission/india/all. This card offers
            "guides for every stage and careers"; the directory it used to
            link to is 980 rows of institutions. The college directory is
            one click on from the new page, correctly labelled. */}
        <Link to="/counselling/india" className="sc-explore-card">
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
        {/* The board draws "View all →" beside the heading unconditionally. */}
        <Link to="/counselling/counsellors" className="sc-viewall">View all →</Link>
      </div>

      {/* The grid is no longer gated on counsellorsLive — the board draws
          this section unconditionally. What survives is an EMPTY STATE for
          the window before the first counsellor is approved: a heading with
          nothing under it reads as a broken page, and `featured` is [] on
          prod today. It disappears on its own the moment anyone is
          approved; no code change, no flag. */}
      {featured !== null && featured.length === 0 && (
        <div className="sc-cslr-soon">
          <div className="sc-cslr-soon-b">
            <h3>Counsellors are joining soon</h3>
            <p>
              We are still approving the first group, so there is nobody to
              book just yet. Your career report is ready now, and your
              counsellor match follows as soon as they are live.
            </p>
            <div className="sc-cslr-soon-meta">
              <span className="sc-cslr-soon-tag">Live 1:1 · 45–60 min</span>
              <span className="sc-cslr-soon-tag">Video call</span>
              <span className="sc-cslr-soon-tag">Class 6 to UG</span>
            </div>
          </div>
          <button className="sc-btn ghost" onClick={() => start()}>Get my free career report →</button>
        </div>
      )}

      {featured === null || featured.length > 0 ? (
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
      ) : null}

      {/* Board copy, under the counsellor grid. Hidden while the grid is
          showing its empty state — "not sure who to pick" makes no sense
          when there is nobody to pick from. */}
      {featured !== null && featured.length > 0 && (
        <p className="sc-cslr-pick">
          Not sure who to pick?{" "}
          <Link to="/counselling/counsellors">Find my counsellor →</Link>
        </p>
      )}

      {/* The board ends here: counsellors, then "Not sure who to pick?",
          then the footer.

          TWO SECTIONS WERE REMOVED to get there, both verified absent from
          the board at full width in the browser, not inferred from the A4
          PDF export:

            * "EXPLORE FIRST / Career Guidance Library" + its three cards.
              Guides reach readers through the hero search and Study in
              India's Guides tab now; this was the last remnant of the
              standalone library retired in 46089c14.
            * "FREE TO START / Your future deserves a clear plan." + its
              "Start your career profile →" button. The same CTA already
              appears twice above (hero and START HERE).

          `/become-counsellor` lost its link here with the CTA band. It is
          NOT orphaned — Footer.jsx:103 carries "Become a Counsellor" on
          every page. Checked before deleting, because an unreachable route
          is exactly what this area has been fixing all day. */}
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
