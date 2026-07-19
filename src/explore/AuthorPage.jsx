// ─────────────────────────────────────────────────────────────────────────────
// src/explore/AuthorPage.jsx  →  route: /explore/author/:id
// A contributor's profile: banner with stats + follow, then their documents and
// curated collections behind tabs.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthor } from "./exploreApi";
import { useExplore } from "./ExploreStore";
import { DocCard, CollectionCard, Icon, Loading } from "./components/ui";
import "./Explore.css";

export default function AuthorPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const store = useExplore();
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("docs");

  useEffect(() => {
    let alive = true;
    setData(null);
    getAuthor(id).then((d) => alive && setData(d));
    window.scrollTo(0, 0);
    return () => { alive = false; };
  }, [id]);

  if (data === null) return <div className="exp"><Loading /></div>;
  if (!data?.author) return (
    <div className="exp"><div className="exp-wrap exp-empty">
      <h3>Contributor not found</h3>
      <button className="exp-btn exp-btn-primary" style={{ marginTop: 16 }} onClick={() => nav("/explore")}>Back to Explore</button>
    </div></div>
  );

  const { author, docs, collections } = data;
  const following = store.isFollowing(author.id);

  return (
    <div className="exp">
      <div className="exp-wrap exp-in" style={{ paddingBottom: 60 }}>
        <button className="exp-back" style={{ marginTop: 24 }} onClick={() => nav(-1)}><Icon.back /> Back</button>

        <div className="exp-authbanner">
          <div className="exp-avatar" style={{ background: author.color }}>{author.initials}</div>
          <div style={{ minWidth: 0 }}>
            <h1>{author.name}</h1>
            <p>{author.title} · {author.institution}</p>
            <p>{author.bio}</p>
            <div className="exp-authstats">
              <div><b>{author.followers}</b><span>Followers</span></div>
              <div><b>{author.docsCount}</b><span>Documents</span></div>
              <div><b>{author.downloads}</b><span>Downloads</span></div>
              <div><b>{author.views}</b><span>Views</span></div>
            </div>
          </div>
          <div className="spacer" />
          <button
            className={`exp-btn ${following ? "exp-btn-ghost" : "exp-btn-primary"}`}
            onClick={() => store.toggleFollow(author.id)}
          >{following ? "✓ Following" : "+ Follow"}</button>
        </div>

        <div className="exp-tabs">
          <button className={`exp-tab${tab === "docs" ? " active" : ""}`} onClick={() => setTab("docs")}>
            Documents ({docs.length})
          </button>
          <button className={`exp-tab${tab === "collections" ? " active" : ""}`} onClick={() => setTab("collections")}>
            Collections ({collections.length})
          </button>
        </div>

        {tab === "docs" ? (
          docs.length ? <div className="exp-docgrid">{docs.map((d) => <DocCard key={d.id} doc={d} />)}</div>
            : <div className="exp-empty"><p>No documents published yet.</p></div>
        ) : (
          collections.length ? <div className="exp-colgrid">{collections.map((c) => <CollectionCard key={c.id} collection={c} />)}</div>
            : <div className="exp-empty"><p>No collections yet.</p></div>
        )}
      </div>
    </div>
  );
}
