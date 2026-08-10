// ─────────────────────────────────────────────────────────────────────────────
// src/explore/ExploreLanding.jsx  →  route: /explore  (replaces the old page)
// The Scribd-style hub home: hero search, trending chips, category grid,
// recommended + recently-uploaded rails, and an upload CTA.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getLanding } from "./exploreApi";
import { DocCard, MiniDocCard, SectionHead, Icon, Loading, tint } from "./components/ui";
import "./Explore.css";

export default function ExploreLanding() {
  const nav = useNavigate();
  const { isAuthenticated } = useAuth();
  // Explore Moderation is reached from the shared site Navbar (a dedicated entry
  // next to Forum Moderation), so the hero no longer carries its own pill.
  const [data, setData] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    let alive = true;
    setLoadError(false);
    getLanding()
      .then((d) => alive && setData(d))
      .catch(() => alive && setLoadError(true));
    return () => { alive = false; };
  }, []);

  const runSearch = (query) => {
    const term = (query ?? q).trim();
    nav(`/explore/browse${term ? `?q=${encodeURIComponent(term)}` : ""}`);
  };

  return (
    <div className="exp">
      {/* hero */}
      <section className="exp-hero">
        <div className="exp-wrap">
          <p className="exp-eyebrow">● Explore the knowledge library</p>
          <h1>Discover, read &amp; share.</h1>
          <p className="exp-hero-lead">
            Research papers, books, notes, question papers and more — from students and
            teachers across India. Search a topic to begin.
          </p>
          <button className="exp-hero-upload" onClick={() => nav("/explore/upload")}>
            Have notes or papers of your own? {isAuthenticated ? "Upload a document" : "Sign in to upload"} <Icon.arrow />
          </button>

          <div className="exp-searchbar">
            <Icon.search />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runSearch()}
              placeholder="Search documents, topics, authors…"
              aria-label="Search documents"
            />
            <button className="exp-btn exp-btn-primary" onClick={() => runSearch()}>Search</button>
          </div>

          <div className="exp-trendrow">
            <span className="lbl">Trending:</span>
            {(data?.trendChips || []).map((t) => (
              <button key={t} className="exp-chip" onClick={() => runSearch(t)}>{t}</button>
            ))}
          </div>
        </div>
      </section>

      {loadError ? (
        <div className="exp-in">
          <section className="exp-section">
            <div className="exp-wrap" style={{ textAlign: "center", padding: "48px 20px" }}>
              <h2 style={{ font: "800 18px Montserrat,sans-serif", color: "#125027", margin: "0 0 8px" }}>Couldn't load the library</h2>
              <p style={{ font: "400 13px Poppins,sans-serif", color: "rgba(14,28,15,.55)", margin: "0 0 18px" }}>
                Something went wrong fetching documents. Please try again.
              </p>
              <button className="exp-btn exp-btn-primary" onClick={() => window.location.reload()}>Retry</button>
            </div>
          </section>
        </div>
      ) : !data ? <Loading /> : (
        <div className="exp-in">
          {/* categories */}
          <section className="exp-section">
            <div className="exp-wrap">
              <SectionHead subtitle="Jump straight into a type of resource." title="Browse by category" onViewAll={() => nav("/explore/browse")} viewAllLabel="All documents" />
              <div className="exp-catgrid">
                {data.categories.map((c) => (
                  <button key={c.key} className="exp-cat"
                    onClick={() => nav(`/explore/browse?category=${c.key}`)}>
                    <span className="ic" style={{ background: tint(c.color, 0.094), border: `1px solid ${tint(c.color, 0.19)}` }}>{c.icon}</span>
                    <h3>{c.name}</h3>
                    <p>{c.blurb}</p>
                    <span className="cnt" style={{ color: c.color }}>{c.count.toLocaleString()} docs</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* featured — hidden until the library has documents */}
          {data.featured.length > 0 && (
            <section className="exp-section">
              <div className="exp-wrap">
                <SectionHead title="Documents recommended for you" onViewAll={() => nav("/explore/browse?sort=Trending")} />
                <div className="exp-docgrid-3">
                  {data.featured.slice(0, 3).map((d) => <DocCard key={d.id} doc={d} />)}
                </div>
              </div>
            </section>
          )}

          {/* recent */}
          {data.recent.length > 0 && (
            <section className="exp-section">
              <div className="exp-wrap">
                <SectionHead title="Recently uploaded" onViewAll={() => nav("/explore/browse?sort=Latest")} viewAllLabel="See latest" />
                <div className="exp-docgrid">
                  {data.recent.slice(0, 4).map((d) => <MiniDocCard key={d.id} doc={d} />)}
                </div>
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="exp-cta">
            <div className="exp-wrap">
              <div className="exp-cta-card">
                <h2>Have something to share?</h2>
                <p>Publish your notes, papers or study material and reach thousands of learners.</p>
                <div className="exp-cta-actions">
                  <button className="exp-btn exp-btn-primary" onClick={() => nav("/explore/upload")}>
                    Upload a document <Icon.arrow />
                  </button>
                  <button className="exp-btn exp-btn-ghost" onClick={() => nav("/explore/browse")}>
                    Keep exploring
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
