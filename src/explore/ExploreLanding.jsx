// ─────────────────────────────────────────────────────────────────────────────
// src/explore/ExploreLanding.jsx  →  route: /explore  (replaces the old page)
// The Scribd-style hub home: hero search, trending chips, category grid, and
// featured / trending / recent rails, plus top authors and collections.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLanding } from "./exploreApi";
import { DocCard, AuthorCard, CollectionCard, SectionHead, Icon, Loading } from "./components/ui";
import "./Explore.css";

export default function ExploreLanding() {
  const nav = useNavigate();
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

  const totalDocs = useMemo(
    () => (data ? data.categories.reduce((n, c) => n + (c.count || 0), 0) : 0),
    [data]
  );

  return (
    <div className="exp">
      {/* hero */}
      <section className="exp-hero">
        <div className="exp-wrap">
          <p className="exp-eyebrow">ShikshaCom · Explore</p>
          <h1>Discover, read and share knowledge</h1>
          <p className="exp-hero-lead">
            A open library of research papers, notes, question papers and study material —
            uploaded by educators and learners across India.
          </p>

          <div className="exp-searchbar">
            <Icon.search />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runSearch()}
              placeholder="Search papers, notes, subjects, authors…"
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

          <div className="exp-hero-stats">
            <div><b>{totalDocs ? totalDocs.toLocaleString() : "—"}</b><span>Documents</span></div>
            <div><b>{data ? data.authors.length : "—"}+</b><span>Contributors</span></div>
            <div><b>{data ? data.collections.length : "—"}</b><span>Collections</span></div>
          </div>
        </div>
      </section>

      {!data ? <Loading /> : (
        <div className="exp-in">
          {/* categories */}
          <section className="exp-section">
            <div className="exp-wrap">
              <SectionHead eyebrow="Browse by type" title="Categories" onViewAll={() => nav("/explore/browse")} />
              <div className="exp-catgrid">
                {data.categories.map((c) => (
                  <button key={c.key} className="exp-cat"
                    onClick={() => nav(`/explore/browse?category=${c.key}`)}>
                    <span className="bar" style={{ background: c.color }} />
                    <span className="ic" style={{ background: c.color }}>{c.icon}</span>
                    <h3>{c.name}</h3>
                    <p>{c.blurb}</p>
                    <span className="cnt">{c.count.toLocaleString()} documents</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* featured */}
          <section className="exp-section" style={{ background: "#fff", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
            <div className="exp-wrap">
              <SectionHead eyebrow="Editor's pick" title="Featured documents" onViewAll={() => nav("/explore/browse?sort=Trending")} />
              <div className="exp-docgrid">
                {data.featured.slice(0, 4).map((d) => <DocCard key={d.id} doc={d} />)}
              </div>
            </div>
          </section>

          {/* trending rail */}
          <section className="exp-section">
            <div className="exp-wrap">
              <SectionHead eyebrow="Right now" title="Trending this week" onViewAll={() => nav("/explore/browse?sort=Trending")} />
              <div className="exp-rail exp-scroll">
                {data.trending.map((d) => <DocCard key={d.id} doc={d} />)}
              </div>
            </div>
          </section>

          {/* recent */}
          {data.recent.length > 0 && (
            <section className="exp-section" style={{ background: "#fff", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
              <div className="exp-wrap">
                <SectionHead eyebrow="Fresh uploads" title="Recently added" onViewAll={() => nav("/explore/browse?sort=Latest")} />
                <div className="exp-docgrid">
                  {data.recent.slice(0, 4).map((d) => <DocCard key={d.id} doc={d} />)}
                </div>
              </div>
            </section>
          )}

          {/* authors */}
          <section className="exp-section">
            <div className="exp-wrap">
              <SectionHead eyebrow="People to follow" title="Popular contributors" />
              <div className="exp-authgrid">
                {data.authors.slice(0, 6).map((a) => <AuthorCard key={a.id} author={a} />)}
              </div>
            </div>
          </section>

          {/* collections */}
          <section className="exp-section" style={{ background: "#fff", borderTop: "1px solid var(--line)" }}>
            <div className="exp-wrap">
              <SectionHead eyebrow="Curated sets" title="Explore collections" onViewAll={() => nav("/explore/collections")} />
              <div className="exp-colgrid">
                {data.collections.slice(0, 6).map((c) => <CollectionCard key={c.id} collection={c} />)}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
