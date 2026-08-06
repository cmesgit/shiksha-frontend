// PLACEMENT: src/counselling/LandingPage.jsx   (NEW FILE — landing/frontend app)
// REPLACES the old placeholder components/Counselling.jsx at /counselling.
//
// Workflow screen 1 — LANDING: hero · search & browse · career guidance
// library · featured counsellors · Get Started. Guests can read every
// guide; "Get Started" walks them into login → profile wizard.
//
// Guide data comes from the backend CMS (getGuideIndex), not the retired
// static data/guides.js. Booking CTAs are gated by useCounsellorsLive —
// with zero counsellors approved today, the page leads with the guide
// library instead of funnelling visitors into an empty directory.

import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getCounsellors } from "../api/counselling";
import { getGuideIndex, toGuideCard } from "../api/guidesApi";
import CounsellingShell, { initialsOf, gradOf, EXPERIENCE_LABELS } from "./CounsellingShell";
import useCounsellorsLive from "./useCounsellorsLive";

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { live: counsellorsLive } = useCounsellorsLive();
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

  return (
    <CounsellingShell>
      {/* hero */}
      <div className="sc-hero">
        <div>
          <h1 className="sc-h1">
            Confused about what comes next?<br /><em>Let's map your career path.</em>
          </h1>
          <p className="sc-sub">
            {counsellorsLive
              ? "Complete a short career profile, get a personalised path with the reasons behind it, and book a session with a counsellor matched to your stream, interests and language."
              : "Streams, entrance exams, degrees and how to choose — a free guidance library written for Indian students, from Class 6 through postgraduate study."}
          </p>
          <div style={{ display: "flex", gap: 11, flexWrap: "wrap" }}>
            {counsellorsLive ? (
              <>
                <button className="sc-btn" onClick={start}>Get started — it's free to explore</button>
                <Link className="sc-btn ghost" to="/counselling/guides">Browse career guides</Link>
              </>
            ) : (
              <>
                <Link className="sc-btn" to="/counselling/guides">Browse career guides</Link>
                <button className="sc-btn ghost" onClick={start}>Build your career profile</button>
              </>
            )}
          </div>
          <div className="sc-hero-stats">
            <div className="sc-hero-stat"><b>{guides === null ? "…" : guides.length}</b><span>career guides</span></div>
            {counsellorsLive ? (
              <div className="sc-hero-stat"><b>{featured === null ? "…" : featured.length ? `${featured.length}+` : "New"}</b><span>counsellors onboard</span></div>
            ) : (
              <div className="sc-hero-stat"><b>Free</b><span>no login needed</span></div>
            )}
            <div className="sc-hero-stat"><b>1:1</b><span>online sessions</span></div>
          </div>
        </div>
        <div className="sc-hero-art">
          <div className="q">"I'm in Class 12 Science but I'm not sure if engineering is really for me…"</div>
          <div className="a">
            {counsellorsLive
              ? "← the exact kind of question a 45-minute session untangles. Your counsellor sees your profile, interests and assessment before you even join the call."
              : "← the exact kind of question the After Class 12 · Science guide walks through, stream by stream."}
          </div>
        </div>
      </div>

      {/* search */}
      <div className="sc-search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(14,28,15,.45)" strokeWidth="2.4" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
        <input placeholder="Search the guidance library — e.g. streams, NEET, commerce…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      {/* library */}
      <div className="sc-h2row">
        <h2 className="sc-h2">{results ? `Guides matching "${q.trim()}"` : "Career Guidance Library"}</h2>
        <Link to="/counselling/guides" className="sc-note" style={{ color: "#1b9c85", fontWeight: 700, textDecoration: "none" }}>View all →</Link>
      </div>
      {guides === null ? (
        <div className="sc-grid3">{[0, 1, 2].map((i) => <div key={i} className="sc-skel" style={{ height: 150 }} />)}</div>
      ) : (
        <div className="sc-grid3">
          {(results || guides.slice(0, 3)).map((g) => <GuideCard key={g.slug} g={g} />)}
          {results && results.length === 0 && (
            <div className="sc-empty" style={{ gridColumn: "1/-1" }}>No guides match — try "science", "commerce" or "class 10".</div>
          )}
        </div>
      )}

      {/* featured counsellors — hidden while the directory is empty */}
      {counsellorsLive && (
        <>
          <div className="sc-h2row">
            <h2 className="sc-h2">Featured counsellors</h2>
            <Link to="/counselling/counsellors" className="sc-note" style={{ color: "#1b9c85", fontWeight: 700, textDecoration: "none" }}>See your matches →</Link>
          </div>
          {featured === null ? (
            <div className="sc-grid3">{[0, 1, 2].map((i) => <div key={i} className="sc-skel" style={{ height: 150 }} />)}</div>
          ) : (
            <div className="sc-grid3">
              {featured.map((c) => (
                <Link key={c.id} to={`/counselling/counsellors/${c.id}`} className="sc-card sc-cslr" style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="sc-cslr-head">
                    <span className="sc-avatar" style={{ background: gradOf(c.display_name) }}>
                      {c.photo_url ? <img src={c.photo_url} alt="" /> : initialsOf(c.display_name)}
                    </span>
                    <div>
                      <div className="sc-cslr-name">{c.display_name}</div>
                      <div className="sc-cslr-meta">
                        {EXPERIENCE_LABELS[c.years_experience] || "Counsellor"}
                        {c.languages?.length ? ` · ${c.languages.join(", ")}` : ""}
                      </div>
                    </div>
                  </div>
                  <div className="sc-tags">
                    {(c.specializations || []).slice(0, 3).map((s) => (
                      <span key={s.id} className="sc-badge teal">{s.name}</span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}

      {/* how it works */}
      <div className="sc-h2row"><h2 className="sc-h2">How it works</h2></div>
      <div className="sc-grid3">
        {(counsellorsLive
          ? [
              ["1", "Complete your career profile", "Interests, skills, goals — two minutes. We already know your class and stream from your Shiksha profile."],
              ["2", "Get your path & matches", "A personalised career path with the reasons why, plus counsellors ranked for you with a match score."],
              ["3", "Book & meet online", "Pick a slot, optionally fill the pre-session assessment, and join the session from anywhere."],
            ]
          : [
              ["1", "Browse the library", "Ten guides covering Class 6 through postgraduate study, plus admissions in India — free, no login needed."],
              ["2", "Build your career profile", "Interests, skills, goals — two minutes, so your path is ready the moment counsellors are."],
              ["3", "Read your matched guides", "Your profile picks out the guides most relevant to your class, stream and interests."],
            ]
        ).map(([n, t, d]) => (
          <div key={n} className="sc-card">
            <div style={{ font: "800 22px 'Montserrat',sans-serif", color: "#ff8f01" }}>{n}</div>
            <div style={{ font: "700 14.5px 'Montserrat',sans-serif", color: "#0e1c0f", margin: "7px 0 6px" }}>{t}</div>
            <div style={{ font: "400 12.5px/1.65 'Poppins',sans-serif", color: "rgba(14,28,15,.62)" }}>{d}</div>
          </div>
        ))}
      </div>
    </CounsellingShell>
  );
}

export function GuideCard({ g }) {
  const count = g.sectionCount ?? g.sections?.length ?? 0;
  return (
    <Link to={`/counselling/guides/${g.slug}`} className="sc-guide-card">
      <span className={`sc-badge ${g.accent}`}>{g.audience}</span>
      <span className="sc-guide-title">{g.title}</span>
      <span className="sc-guide-blurb">{g.blurb}</span>
      <span className="sc-guide-meta">{count} section{count === 1 ? "" : "s"} · Read guide →</span>
    </Link>
  );
}
