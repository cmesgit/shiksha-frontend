// ─────────────────────────────────────────────────────────────────────────────
// src/explore/LibraryPage.jsx  →  route: /explore/library
// The signed-in person's library: saved documents, followed contributors,
// reading history, and their own uploads. Reads from the local ExploreStore and
// resolves the referenced documents/authors through the API layer.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useExplore } from "./ExploreStore";
import { getDocumentsByIds, getAuthor } from "./exploreApi";
import { DocCard, AuthorCard, Icon, Loading } from "./components/ui";
import "./Explore.css";

const TABS = [
  ["saved", "Saved"],
  ["following", "Following"],
  ["viewed", "History"],
  ["myDocs", "My uploads"],
];

export default function LibraryPage() {
  const nav = useNavigate();
  const { isAuthenticated } = useAuth();
  const store = useExplore();
  const [tab, setTab] = useState("saved");
  const [docs, setDocs] = useState(null);
  const [authors, setAuthors] = useState(null);

  useEffect(() => {
    let alive = true;
    if (tab === "following") {
      setAuthors(null);
      Promise.all(store.following.map((id) => getAuthor(id)))
        .then((rows) => alive && setAuthors(rows.filter(Boolean).map((r) => r.author)));
    } else {
      setDocs(null);
      getDocumentsByIds(store[tab] || []).then((d) => alive && setDocs(d));
    }
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, store.saved, store.following, store.viewed, store.myDocs]);

  if (!isAuthenticated) {
    return (
      <div className="exp"><div className="exp-wrap exp-empty" style={{ paddingTop: 90 }}>
        <h3>Sign in to view your library</h3>
        <p>Save documents, follow contributors and keep your reading history in one place.</p>
        <button className="exp-btn exp-btn-primary" style={{ marginTop: 16 }} onClick={() => nav("/login")}>Log in</button>
      </div></div>
    );
  }

  const emptyCopy = {
    saved: ["Nothing saved yet", "Tap the star on any document to keep it here."],
    following: ["You're not following anyone yet", "Follow contributors to see their new uploads."],
    viewed: ["No reading history yet", "Documents you open will show up here."],
    myDocs: ["You haven't uploaded anything", "Share a document to help other learners."],
  }[tab];

  return (
    <div className="exp">
      <div className="exp-wrap exp-in" style={{ paddingTop: 30, paddingBottom: 60 }}>
        <div className="exp-results-head">
          <div>
            <p className="exp-eyebrow">Your library</p>
            <h1 style={{ font: "800 26px Montserrat, sans-serif", color: "var(--forest)" }}>Library</h1>
          </div>
          <button className="exp-btn exp-btn-primary" onClick={() => nav("/explore/upload")}>+ Upload document</button>
        </div>

        <div className="exp-tabs">
          {TABS.map(([key, label]) => (
            <button key={key} className={`exp-tab${tab === key ? " active" : ""}`} onClick={() => setTab(key)}>
              {label} ({store[key]?.length || 0})
            </button>
          ))}
        </div>

        {tab === "following" ? (
          authors === null ? <Loading />
            : authors.length ? <div className="exp-authgrid">{authors.map((a) => <AuthorCard key={a.id} author={a} />)}</div>
              : <Empty copy={emptyCopy} nav={nav} />
        ) : (
          docs === null ? <Loading />
            : docs.length ? <div className="exp-docgrid">{docs.map((d) => <DocCard key={d.id} doc={d} />)}</div>
              : <Empty copy={emptyCopy} nav={nav} />
        )}
      </div>
    </div>
  );
}

function Empty({ copy, nav }) {
  return (
    <div className="exp-empty">
      <h3>{copy[0]}</h3>
      <p>{copy[1]}</p>
      <button className="exp-btn exp-btn-ghost" style={{ marginTop: 16 }} onClick={() => nav("/explore")}>
        <Icon.back /> Browse documents
      </button>
    </div>
  );
}
