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
import CounsellingShell, { initialsOf, gradOf } from "./CounsellingShell";
import useCounsellorsLive from "./useCounsellorsLive";

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(14,28,15,.45)" strokeWidth="2.4" strokeLinecap="round">
    <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
  </svg>
);
const StarIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#f5a623" stroke="none">
    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7fe8d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const STEP_ICONS = [
  <svg key="p" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="2" width="8" height="4" rx="1" /><path d="M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3" /><path d="M9 12h6M9 16h4" />
  </svg>,
  <svg key="c" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" /><polygon points="16 8 10 10 8 16 14 14 16 8" />
  </svg>,
  <svg key="b" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M9 15l2 2 4-4" />
  </svg>,
];

const SESSION_DOES = [
  ["Understand your interests & strengths", "Not just what you're good at — what excites you"],
  ["Get a clear, personalised career direction", "With the reasons behind it — not just a list of options"],
  ["Leave with a concrete next step", "Courses, streams, or entrance exams to focus on"],
];

const HOW_STEPS_LIVE = [
  ["Step 1", "Complete your profile", "Share your interests, skills and goals in two minutes. We already know your class and stream from your Shiksha profile."],
  ["Step 2", "Get your path & matches", "See a personalised career path with the reasons behind it, plus counsellors ranked for you with a clear match score."],
  ["Step 3", "Book & meet online", "Pick a slot, fill the optional pre-session assessment, and meet your counsellor live over a 45-minute video call."],
];
const HOW_STEPS_PRELAUNCH = [
  ["Step 1", "Browse the library", "Ten guides covering Class 6 through postgraduate study, plus admissions in India — free, no login needed."],
  ["Step 2", "Build your career profile", "Interests, skills, goals — two minutes, so your path is ready the moment counsellors are."],
  ["Step 3", "Read your matched guides", "Your profile picks out the guides most relevant to your class, stream and interests."],
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { live: counsellorsLive, count, avgRating, totalSessions } = useCounsellorsLive();
  const [q, setQ] = useState("");
  const [featured, setFeatured] = useState(null);
  const [guides, setGuides] = useState(null);

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

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle || !guides) return null;
    return guides.filter((g) =>
      (g.title + " " + g.blurb + " " + g.audience).toLowerCase().includes(needle)
    );
  }, [q, guides]);

  const start = () => {
    if (isAuthenticated) navigate("/counselling/profile");
    else navigate("/login", { state: { from: "/counselling/profile" } });
  };

  const howSteps = counsellorsLive ? HOW_STEPS_LIVE : HOW_STEPS_PRELAUNCH;

  return (
    <CounsellingShell>
      {/* hero */}
      <div className="sc-herowrap">
        <div className="sc-hero">
          <div>
            <span className="sc-eyebrow">Career Counselling</span>
            <h1 className="sc-h1">
              Confused about what comes next?<br /><em>Let's map your career path.</em>
            </h1>
            <p className="sc-sub">
              {counsellorsLive
                ? "Complete a short career profile, get a personalised path with the reasons behind it, and book a live online session with a counsellor matched to your stream, interests and language."
                : "Streams, entrance exams, degrees and how to choose — a free guidance library written for Indian students, from Class 6 through postgraduate study."}
            </p>
            <div style={{ display: "flex", gap: 11, flexWrap: "wrap" }}>
              {counsellorsLive ? (
                <button className="sc-btn" onClick={start}>Get started — it's free</button>
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
          <div className="sc-hero-art">
            <div style={{ font: "700 11px Poppins, sans-serif", color: "rgba(245,255,245,.4)", letterSpacing: ".1em", textTransform: "uppercase" }}>
              What a session does
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {SESSION_DOES.map(([t, s]) => (
                <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(27,156,133,.22)", flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                    <CheckIcon />
                  </span>
                  <div>
                    <div style={{ font: "600 13px/1.4 Poppins, sans-serif", color: "#f5fff5" }}>{t}</div>
                    <div style={{ font: "400 11.5px Poppins, sans-serif", color: "rgba(245,255,245,.5)", marginTop: 2 }}>{s}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,.08)" }} />
            <div style={{ font: "500 12px Poppins, sans-serif", color: "rgba(245,255,245,.45)", textAlign: "center" }}>
              45–60 minutes · live video · matched counsellor
            </div>
          </div>
        </div>
      </div>

      {/* Spark Finder invite */}
      <Link to="/counselling/spark" className="sc-spark-invite" style={{ textDecoration: "none" }}>
        <div className="sc-spark-invite-l">
          <span className="sc-spark-invite-emoji">✦</span>
          <div>
            <div className="sc-spark-invite-t">Not sure where to start? Play Spark Finder</div>
            <div className="sc-spark-invite-s">A 2-minute tap quiz that reveals what genuinely excites you — then builds your profile for you.</div>
          </div>
        </div>
        <span className="sc-spark-invite-btn">Try it →</span>
      </Link>

      {/* how it works */}
      <div className="lms-sechead" style={{ marginTop: "clamp(26px,3.5vw,44px)", textAlign: "center", marginLeft: "auto", marginRight: "auto" }}>
        <span className="sc-eyebrow">Simple, guided, personal</span>
        <h2>How career counselling works</h2>
        <p>From a two-minute profile to a live session with the right counsellor — here's the whole journey.</p>
      </div>
      <div className="lms-steps">
        {howSteps.map(([num, title, body], i) => (
          <div key={num} className="lms-step">
            <span className="ic">{STEP_ICONS[i]}</span>
            <div className="num">{num}</div>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 18 }}>
        <button className="sc-btn" onClick={start}>Start my career profile →</button>
      </div>

      {/* featured counsellors — hidden while the directory is empty */}
      {counsellorsLive && (
        <>
          <div className="lms-sechead-row" style={{ marginTop: "clamp(26px,3.5vw,44px)" }}>
            <div className="lms-sechead" style={{ margin: 0 }}>
              <span className="sc-eyebrow">Meet the counsellors</span>
              <h2>Featured Counsellors</h2>
            </div>
            <Link to="/counselling/counsellors" className="sc-viewall">View all →</Link>
          </div>
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
        <button className="sc-btn" onClick={start}>Start your career profile →</button>
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
