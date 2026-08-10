// ─────────────────────────────────────────────────────────────────────────────
// src/explore/DashboardPage.jsx  →  route: /explore/dashboard
// "My Library Dashboard" — ported from ShikshaCom Explore Dashboard (standalone).
// A personal overview of the user's Explore activity: stat cards, recently read,
// my uploads, saved documents and collections, plus tabs to drill into each.
// Backed by the client-side library store (viewed / myDocs / saved) resolved to
// documents via getDocumentsByIds; collections come from the library. Guests see
// a sign-in prompt. The shared site navbar (top) is kept as-is.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useExplore } from "./ExploreStore";
import { getDocumentsByIds, listCollections, parseCount } from "./exploreApi";
import { fileGlyph, DocCard, CollectionCard, Icon, Loading } from "./components/ui";
import "./Explore.css";

const TABS = ["Overview", "Reading History", "My Uploads", "Saved", "Collections"];

// File-type badge colour, matching the design's per-document accents.
const FT_COLOR = { PDF: "#c0392b", DOCX: "#1b4cc0", PPT: "#e07900" };
const ftColor = (d) => d?.typeMeta?.color || FT_COLOR[d?.filetype] || "#125027";

function FileBadge({ doc, size = "row" }) {
  const st = size === "coll"
    ? { width: 40, height: 40, borderRadius: 10, font: "800 14px Montserrat,sans-serif" }
    : { width: 36, height: 44, borderRadius: 6, font: "800 10px Montserrat,sans-serif" };
  return (
    <div className={size === "coll" ? "exp-coll-ic" : "exp-ft"} style={{ background: ftColor(doc), ...st }}>
      {size === "coll" ? "▤" : fileGlyph(doc?.filetype)}
    </div>
  );
}

function DocRow({ doc, right }) {
  const nav = useNavigate();
  return (
    <div className="exp-doc-row" onClick={() => nav(`/explore/doc/${doc.id}`)}>
      <FileBadge doc={doc} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="exp-doc-rt">{doc.title}</div>
        <div className="exp-doc-rsub">{doc.author?.name || "Unknown"} · {doc.dateLabel || ""}</div>
      </div>
      {right}
    </div>
  );
}

function PreviewCard({ title, onSeeAll, empty, children }) {
  return (
    <div className="exp-card" style={{ overflow: "hidden" }}>
      <div className="exp-dcard-hd">
        <span className="exp-dcard-t">{title}</span>
        {onSeeAll && <button className="exp-dcard-link" onClick={onSeeAll}>See all →</button>}
      </div>
      {empty ? <div className="exp-dash-empty">{empty}</div> : children}
    </div>
  );
}

export default function ExploreDashboardPage() {
  const nav = useNavigate();
  const { isAuthenticated } = useAuth();
  const store = useExplore();
  const [tab, setTab] = useState("Overview");
  const [data, setData] = useState(null);

  const savedIds = store.saved, viewedIds = store.viewed, myIds = store.myDocs;

  useEffect(() => {
    if (!isAuthenticated) return;
    let alive = true;
    Promise.all([
      getDocumentsByIds(viewedIds),
      getDocumentsByIds(myIds),
      getDocumentsByIds(savedIds),
      listCollections(),
    ])
      .then(([reads, uploads, saved, collections]) => {
        if (alive) setData({ reads, uploads, saved, collections });
      })
      .catch(() => alive && setData({ reads: [], uploads: [], saved: [], collections: [] }));
    return () => { alive = false; };
  }, [isAuthenticated, viewedIds, myIds, savedIds]);

  const uploadViews = useMemo(
    () => (data?.uploads || []).reduce((sum, d) => sum + parseCount(d.views), 0),
    [data]
  );

  if (!isAuthenticated) {
    return (
      <div className="exp">
        <div className="exp-in exp-wrap" style={{ padding: "64px 24px", textAlign: "center" }}>
          <h1 style={{ font: "900 22px Montserrat,sans-serif", color: "#125027", margin: "0 0 8px" }}>Your library dashboard</h1>
          <p style={{ font: "400 14px Poppins,sans-serif", color: "rgba(14,28,15,.55)", margin: "0 0 20px" }}>
            Sign in to see your reading history, uploads, saved documents and collections.
          </p>
          <button className="exp-btn exp-btn-primary" onClick={() => nav(`/login?next=${encodeURIComponent("/explore/dashboard")}`)}>Sign in</button>
        </div>
      </div>
    );
  }

  if (!data) return <div className="exp"><Loading /></div>;

  const { reads, uploads, saved, collections } = data;

  const stats = [
    { l: "Documents Read", n: viewedIds.length, s: `${reads.length} in library`, c: "#125027" },
    { l: "My Uploads", n: myIds.length, s: uploadViews ? `${uploadViews.toLocaleString()} total views` : "Published by you", c: "#1b9c85" },
    { l: "Saved Documents", n: savedIds.length, s: "Bookmarked", c: "#e07900" },
    { l: "Collections", n: collections.length, s: "In the library", c: "#6b58d3" },
  ];

  return (
    <div className="exp">
      <div className="exp-in exp-wrap" style={{ padding: "24px 24px 56px" }}>
        {/* header */}
        <div className="exp-dash-head">
          <div>
            <h1 className="exp-dash-title">My Library Dashboard</h1>
            <p className="exp-dash-sub">Welcome back — your Explore activity in one place.</p>
          </div>
          <div className="exp-dash-acts">
            <button className="exp-btn exp-btn-ghost" onClick={() => nav("/explore")}>
              <Icon.back /> Back to Explore
            </button>
            <button className="exp-btn exp-btn-primary" onClick={() => nav("/explore/upload")}>
              + Upload Document
            </button>
          </div>
        </div>

        {/* tabs */}
        <div className="exp-dtabs">
          {TABS.map((t) => (
            <button key={t} className={`exp-dtab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>

        {tab === "Overview" && (
          <>
            <div className="exp-stats-grid">
              {stats.map((s) => (
                <div key={s.l} className="exp-card exp-statcard">
                  <div className="exp-statcard-l">{s.l}</div>
                  <div className="exp-statcard-n">{s.n}</div>
                  <div className="exp-statcard-s" style={{ color: s.c }}>{s.s}</div>
                </div>
              ))}
            </div>

            <div className="exp-dash-cols">
              <PreviewCard title="Recently Read" onSeeAll={() => setTab("Reading History")}
                empty={reads.length ? null : "Documents you open will appear here."}>
                {reads.slice(0, 4).map((d) => (
                  <DocRow key={d.id} doc={d} right={<span className="exp-doc-rmeta">{d.views} views</span>} />
                ))}
              </PreviewCard>

              <PreviewCard title="My Uploads" onSeeAll={() => setTab("My Uploads")}
                empty={uploads.length ? null : "Publish a document to see it here."}>
                {uploads.slice(0, 4).map((d) => (
                  <DocRow key={d.id} doc={d} right={<span className="exp-pill-live">Live</span>} />
                ))}
              </PreviewCard>
            </div>

            <div className="exp-dash-cols">
              <PreviewCard title="Saved Documents" onSeeAll={() => setTab("Saved")}
                empty={saved.length ? null : "Bookmark documents to build your reading list."}>
                {saved.slice(0, 4).map((d) => (
                  <DocRow key={d.id} doc={d} right={d.tags?.length
                    ? <div style={{ display: "flex", gap: 5, flexWrap: "wrap", flexShrink: 0 }}>{d.tags.slice(0, 2).map((t) => <span key={t} className="exp-tag">{t}</span>)}</div>
                    : null} />
                ))}
              </PreviewCard>

              <PreviewCard title="Collections" onSeeAll={() => nav("/explore/collections")}
                empty={collections.length ? null : "No collections yet."}>
                {collections.slice(0, 4).map((c) => (
                  <div key={c.id} className="exp-doc-row" style={{ alignItems: "center" }} onClick={() => nav(`/explore/collections/${c.id}`)}>
                    <div className="exp-coll-ic" style={{ background: c.color || "#125027" }}>{(c.title || "?").slice(0, 1)}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ font: "700 13px Poppins,sans-serif", color: "#18261a", marginBottom: 2 }}>{c.title}</div>
                      <div className="exp-doc-rsub">{c.count} document{c.count === 1 ? "" : "s"}</div>
                    </div>
                  </div>
                ))}
              </PreviewCard>
            </div>
          </>
        )}

        {tab === "Reading History" && <TabGrid docs={reads} empty="You haven't opened any documents yet." />}
        {tab === "My Uploads" && <TabGrid docs={uploads} empty="You haven't published anything yet." cta={{ label: "Upload a document", to: "/explore/upload" }} nav={nav} />}
        {tab === "Saved" && <TabGrid docs={saved} empty="Nothing saved yet." />}
        {tab === "Collections" && (
          collections.length
            ? <div className="exp-colgrid">{collections.map((c) => <CollectionCard key={c.id} collection={c} />)}</div>
            : <div className="exp-card exp-dash-empty">No collections in the library yet.</div>
        )}
      </div>
    </div>
  );
}

function TabGrid({ docs, empty, cta, nav }) {
  if (!docs.length) {
    return (
      <div className="exp-card exp-dash-empty">
        {empty}
        {cta && <div style={{ marginTop: 14 }}><button className="exp-btn exp-btn-primary" onClick={() => nav(cta.to)}>{cta.label}</button></div>}
      </div>
    );
  }
  return <div className="exp-docgrid-3">{docs.map((d) => <DocCard key={d.id} doc={d} />)}</div>;
}
