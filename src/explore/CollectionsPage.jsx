// ─────────────────────────────────────────────────────────────────────────────
// src/explore/CollectionsPage.jsx
//   /explore/collections       → all collections
//   /explore/collections/:id   → one collection with its documents
// Both live in this file; the route decides which renders.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listCollections, getCollection } from "./exploreApi";
import { DocCard, CollectionCard, SectionHead, Icon, Loading } from "./components/ui";
import "./Explore.css";

export function CollectionsList() {
  const nav = useNavigate();
  const [cols, setCols] = useState(null);
  useEffect(() => { listCollections().then(setCols); }, []);

  return (
    <div className="exp">
      <div className="exp-wrap exp-section exp-in">
        <button className="exp-back" onClick={() => nav("/explore")}><Icon.back /> Back to Explore</button>
        <SectionHead eyebrow="Curated sets" title="All collections" />
        {!cols ? <Loading /> : (
          <div className="exp-colgrid">{cols.map((c) => <CollectionCard key={c.id} collection={c} />)}</div>
        )}
      </div>
    </div>
  );
}

export function CollectionPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [col, setCol] = useState(null);

  useEffect(() => {
    let alive = true;
    setCol(null);
    getCollection(id).then((c) => alive && setCol(c));
    window.scrollTo(0, 0);
    return () => { alive = false; };
  }, [id]);

  if (col === null) return <div className="exp"><Loading /></div>;
  if (!col) return (
    <div className="exp"><div className="exp-wrap exp-empty">
      <h3>Collection not found</h3>
      <button className="exp-btn exp-btn-primary" style={{ marginTop: 16 }} onClick={() => nav("/explore/collections")}>All collections</button>
    </div></div>
  );

  const bg = `linear-gradient(135deg, ${col.color || "#125027"}, #003223)`;

  return (
    <div className="exp">
      <div className="exp-wrap exp-in" style={{ paddingBottom: 60 }}>
        <button className="exp-back" style={{ marginTop: 24 }} onClick={() => nav(-1)}><Icon.back /> Back</button>

        <div className="exp-authbanner" style={{ background: bg }}>
          <div>
            <p className="exp-eyebrow" style={{ color: "var(--amber)" }}>Collection</p>
            <h1>{col.title}</h1>
            <p>{col.desc}</p>
            <div className="exp-authstats">
              <div><b>{col.docs.length}</b><span>Documents</span></div>
              <div><b>{col.visibility}</b><span>Visibility</span></div>
              {col.curator && <div><b>{col.curator.name}</b><span>Curated by</span></div>}
            </div>
          </div>
        </div>

        <div className="exp-docgrid">{col.docs.map((d) => <DocCard key={d.id} doc={d} />)}</div>
      </div>
    </div>
  );
}
