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
  const { isAuthenticated, hasRole, hasPermission } = useAuth();
  // The Explore library's own moderator entry — a SECOND, separate moderator
  // tab from the forum's. Gated to documents-library moderators (backend
  // IsDocumentsModerator is the real boundary).
  const canModerate = isAuthenticated && (
    hasPermission("documents.moderate") || hasRole("ADMIN") || hasRole("MODERATOR"));
  const [data, setData] = useState(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    let alive = true;
    getLanding().then((d) => alive && setData(d));
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <p className="exp-eyebrow">● Explore the knowledge library</p>
            {canModerate && (
              <button
                onClick={() => nav("/explore/moderator")}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer",
                  background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.22)",
                  borderRadius: 999, padding: "6px 14px", color: "#fff",
                  font: "600 12px Poppins,sans-serif",
                }}
              >
                🛡 Explore Moderation
              </button>
            )}
          </div>
          <h1>Discover, read &amp; share.</h1>
          <p className="exp-hero-lead">
            Research papers, books, notes, question papers and more — from students and
            teachers across India. Search a topic to begin.
          </p>
          <button className="exp-hero-upload" onClick={() => nav("/explore/upload")}>
            Have notes or papers of your own? Sign in to upload <Icon.arrow />
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

      {!data ? <Loading /> : (
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

          {/* featured */}
          <section className="exp-section">
            <div className="exp-wrap">
              <SectionHead title="Documents recommended for you" onViewAll={() => nav("/explore/browse?sort=Trending")} />
              <div className="exp-docgrid-3">
                {data.featured.slice(0, 3).map((d) => <DocCard key={d.id} doc={d} />)}
              </div>
            </div>
          </section>

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
