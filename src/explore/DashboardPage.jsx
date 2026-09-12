// ─────────────────────────────────────────────────────────────────────────────
// src/explore/DashboardPage.jsx  →  route: /explore/dashboard
// "My Library Dashboard" — ported from ShikshaCom Explore Dashboard (standalone).
// A personal overview of the user's Explore activity: stat cards, recently read,
// my uploads, saved documents and collections, plus tabs to drill into each.
// Reading History and Saved come from the client-side library store, resolved
// to documents via getDocumentsByIds. My Uploads is server-derived (?mine=1),
// and every collection surface here shows the user's OWN collections. Guests
// get a sign-in prompt. The shared site navbar (top) is kept as-is; the header
// carries no action buttons because the Explore toolbar directly above it
// already does.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useExplore } from "./ExploreStore";
import {
  getDocumentsByIds, listCollections, parseCount, getMe, getAuthor,
  createCollection, deleteCollection, addDocumentToCollection,
  getMyUploads, deleteDocument,
} from "./exploreApi";
import { fileGlyph, DocCard, CollectionCard, AuthorCard, Loading } from "./components/ui";
import "./Explore.css";

const TABS = ["Overview", "Reading History", "My Uploads", "Saved", "Following", "Collections"];

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
  const [authors, setAuthors] = useState(null);
  const [collForm, setCollForm] = useState({ title: "", description: "", color: "#125027", visibility: "public" });
  const [collBusy, setCollBusy] = useState(false);
  const [collError, setCollError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const savedIds = store.saved, viewedIds = store.viewed;

  useEffect(() => {
    if (!isAuthenticated) return;
    let alive = true;
    Promise.all([
      getDocumentsByIds(viewedIds),
      // My Uploads comes from the server, not from `store.myDocs`. That was a
      // list of ids written to localStorage at publish time, so the tab showed
      // nothing on a different browser, after a cache clear, or for anything
      // uploaded from another device — which is exactly how it presented: "I
      // uploaded a document and My Uploads is empty".
      getMyUploads(),
      getDocumentsByIds(savedIds),
      listCollections(),
      getMe(),
    ])
      .then(([reads, uploads, saved, collections, me]) => {
        if (alive) setData({
          reads, uploads, saved, collections,
          followingIds: me?.following?.authors || [],
          // The Explore-side identity. `me` spreads the same contributor badge
          // that CollectionSerializer.get_curator emits, so `me.id` is the one
          // value that can be compared against `collection.curator.id`.
          meId: me?.id || null,
        });
      })
      .catch(() => alive && setData({ reads: [], uploads: [], saved: [], collections: [], followingIds: [], meId: null }));
    return () => { alive = false; };
  }, [isAuthenticated, viewedIds, savedIds]);

  // Following tab — resolved from the backend's real per-user `following`
  // data (DocumentsMeView), not the client-only store, so it can't drift out
  // of sync with follows made elsewhere.
  useEffect(() => {
    if (tab !== "Following" || !data) return;
    let alive = true;
    setAuthors(null);
    Promise.all((data.followingIds || []).map((id) => getAuthor(id)))
      .then((rows) => alive && setAuthors(rows.filter(Boolean).map((r) => r.author)))
      .catch(() => alive && setAuthors([]));
    return () => { alive = false; };
  }, [tab, data]);

  const uploadViews = useMemo(
    () => (data?.uploads || []).reduce((sum, d) => sum + parseCount(d.views), 0),
    [data]
  );

  // This used to compare `collection.curator.id` against `user.username` from
  // AuthContext — two different identity spaces, and AuthContext doesn't carry
  // a `username` at all, so the result was ALWAYS empty. That single silent
  // mismatch is why there was no way to add a document to a collection (the
  // picker below is gated on this list being non-empty) and why the Delete
  // button never appeared on a collection you owned.
  const myId = data?.meId;
  const myCollections = useMemo(
    () => (data?.collections || []).filter((c) => c.curator?.id && myId && c.curator.id === myId),
    [data, myId]
  );

  async function handleCreateCollection(e) {
    e.preventDefault();
    if (!collForm.title.trim() || collBusy) return;
    setCollBusy(true);
    setCollError("");
    try {
      const created = await createCollection({
        title: collForm.title.trim(),
        description: collForm.description.trim(),
        color: collForm.color,
        visibility: collForm.visibility,
      });
      setData((d) => ({ ...d, collections: [created, ...(d.collections || [])] }));
      setCollForm({ title: "", description: "", color: "#125027", visibility: "public" });
    } catch {
      setCollError("Couldn't create the collection. Try again.");
    } finally {
      setCollBusy(false);
    }
  }

  async function handleDeleteCollection(slug) {
    if (!window.confirm("Delete this collection? This can't be undone.")) return;
    try {
      await deleteCollection(slug);
      setData((d) => ({ ...d, collections: (d.collections || []).filter((c) => c.id !== slug) }));
    } catch { /* leave it in place on failure */ }
  }

  async function handleDeleteUpload(doc) {
    // Deliberately does NOT promise the file is destroyed. Deleting from Bunny
    // Edge Storage makes the origin 404, but the CDN keeps serving its cached
    // copy until the URL is purged, and purging needs an account API key that
    // is not configured yet. The server reports that as `file_purged: false`;
    // saying "the file is deleted" here would be a promise we can't keep to
    // someone taking down something they regret publishing.
    if (!window.confirm(
      `Delete "${doc.title}"? It will be removed from the library. This can't be undone.`
    )) return;
    setDeletingId(doc.id);
    setDeleteError("");
    try {
      const res = await deleteDocument(doc.id);
      if (res && res.file_purged === false) {
        setDeleteError(
          `"${doc.title}" was removed from the library, but the file may stay reachable ` +
          `from its old direct link for a while. Contact an admin if it was sensitive.`
        );
      }
      setData((d) => ({ ...d, uploads: (d.uploads || []).filter((u) => u.id !== doc.id) }));
      // Drop it from the local library lists too, or a deleted document keeps
      // showing up under Reading History / Saved as an unresolvable id.
      store.forget?.(doc.id);
    } catch {
      setDeleteError(`Couldn't delete "${doc.title}". Try again.`);
    } finally {
      setDeletingId(null);
    }
  }

  async function handleAddToCollection(slug, documentId) {
    await addDocumentToCollection(slug, documentId);
    setData((d) => ({
      ...d,
      collections: (d.collections || []).map((c) => (c.id === slug ? { ...c, count: (c.count || 0) + 1 } : c)),
    }));
  }

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

  // `collections` is deliberately not destructured — every surface on this
  // screen shows `myCollections`. Reaching for the full library list here is
  // what made the Collections stat disagree with the user's own profile.
  const { reads, uploads, saved } = data;

  const stats = [
    { l: "Documents Read", n: reads.length, s: `${reads.length} in library`, c: "#125027" },
    // Counts the documents the server actually returned, not the length of a
    // client-side id list — those two diverged whenever a stored id no longer
    // resolved to a live document.
    { l: "My Uploads", n: uploads.length, s: uploadViews ? `${uploadViews.toLocaleString()} total views` : "Published by you", c: "#1b9c85" },
    { l: "Saved Documents", n: savedIds.length, s: "Bookmarked", c: "#e07900" },
    // MY collections. This card used to count every collection in the whole
    // library while sitting in a row of otherwise personal numbers, so it read
    // as "my collections" and disagreed with the count on the same user's own
    // profile page.
    { l: "Collections", n: myCollections.length, s: "Created by you", c: "#6b58d3" },
  ];

  return (
    <div className="exp">
      <div className="exp-in exp-wrap" style={{ padding: "24px 24px 56px" }}>
        {/* Header, title only. The action buttons that used to sit here —
            "Back to Explore" and "+ Upload Document" — were a second navigation
            bar stacked directly under the Explore toolbar, which already
            carries "+ Upload document" two rows above and is itself reachable
            from every page. Two upload buttons within 60px of each other read
            as a rendering bug. */}
        <div className="exp-dash-head">
          <div>
            <h1 className="exp-dash-title">My Library Dashboard</h1>
            <p className="exp-dash-sub">Welcome back — your Explore activity in one place.</p>
          </div>
        </div>

        {deleteError && <div className="exp-upload-error" style={{ maxWidth: "none" }}>{deleteError}</div>}

        {/* tabs */}
        {/* Two anchors on purpose. `explore-dashboard.tabs` (the strip) is the
            right target for a spotlight step, which highlights a whole region.
            `explore-dashboard.tab` (the FIRST tab button) is what the T3 beacon
            uses: Beacon.jsx draws its dot at the target's top-RIGHT corner, and
            .exp-dtabs is a full-width flex row with left-packed children — its
            right corner is empty space hundreds of px past the last tab, so the
            dot pointed at nothing. A single tab button's right corner is real
            content. */}
        <div className="exp-dtabs" data-tour="explore-dashboard.tabs">
          {TABS.map((t, i) => (
            <button
              key={t}
              className={`exp-dtab${tab === t ? " active" : ""}`}
              onClick={() => setTab(t)}
              {...(i === 0 ? { "data-tour": "explore-dashboard.tab" } : null)}
            >
              {t}
            </button>
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

              <PreviewCard title="Collections" onSeeAll={() => setTab("Collections")}
                empty={myCollections.length ? null : "Create a collection to group documents."}>
                {myCollections.slice(0, 4).map((c) => (
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
        {tab === "My Uploads" && (
          uploads.length
            ? (
              <div className="exp-docgrid-3">
                {uploads.map((d) => (
                  <div key={d.id} style={{ position: "relative" }}>
                    <DocCard doc={d} />
                    {/* Only reachable on your own uploads, and only here —
                        the server re-checks ownership regardless. */}
                    <button
                      className="exp-updel"
                      title="Delete this upload"
                      onClick={(e) => { e.stopPropagation(); handleDeleteUpload(d); }}
                      disabled={deletingId === d.id}
                    >
                      {deletingId === d.id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                ))}
              </div>
            )
            : (
              <div className="exp-card exp-dash-empty">
                You haven't published anything yet.
                <div style={{ marginTop: 14 }}>
                  <button className="exp-btn exp-btn-primary" onClick={() => nav("/explore/upload")}>Upload a document</button>
                </div>
              </div>
            )
        )}
        {tab === "Saved" && (
          saved.length
            ? (
              <div className="exp-docgrid-3">
                {saved.map((d) => (
                  <div key={d.id}>
                    <DocCard doc={d} />
                    {myCollections.length > 0 && (
                      <AddToCollectionRow doc={d} collections={myCollections} onAdd={handleAddToCollection} />
                    )}
                  </div>
                ))}
              </div>
            )
            : <div className="exp-card exp-dash-empty">Nothing saved yet.</div>
        )}

        {tab === "Following" && (
          authors === null ? <Loading />
            : authors.length
              ? <div className="exp-authgrid">{authors.map((a) => <AuthorCard key={a.id} author={a} />)}</div>
              : <div className="exp-card exp-dash-empty">You're not following anyone yet.</div>
        )}

        {tab === "Collections" && (
          <>
            <div className="exp-card" style={{ padding: 16, marginBottom: 18 }}>
              <div className="exp-dcard-t" style={{ marginBottom: 10 }}>New collection</div>
              <form onSubmit={handleCreateCollection} style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <div className="exp-field" style={{ margin: 0, flex: "1 1 180px" }}>
                  <input
                    type="text" placeholder="Title" value={collForm.title} required
                    onChange={(e) => setCollForm((f) => ({ ...f, title: e.target.value }))}
                  />
                </div>
                <div className="exp-field" style={{ margin: 0, flex: "2 1 240px" }}>
                  <input
                    type="text" placeholder="Description (optional)" value={collForm.description}
                    onChange={(e) => setCollForm((f) => ({ ...f, description: e.target.value }))}
                  />
                </div>
                <input
                  type="color" value={collForm.color} title="Colour"
                  onChange={(e) => setCollForm((f) => ({ ...f, color: e.target.value }))}
                  style={{ width: 36, height: 36, padding: 0, border: "none", background: "none", cursor: "pointer" }}
                />
                <div className="exp-field" style={{ margin: 0 }}>
                  <select
                    value={collForm.visibility}
                    onChange={(e) => setCollForm((f) => ({ ...f, visibility: e.target.value }))}
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
                <button type="submit" className="exp-btn exp-btn-primary" disabled={collBusy || !collForm.title.trim()}>
                  {collBusy ? "Creating…" : "+ New Collection"}
                </button>
              </form>
              {collError && <div style={{ color: "#c0392b", font: "500 12px Poppins,sans-serif", marginTop: 8 }}>{collError}</div>}
            </div>

            {/* Mine only. This tab used to list every collection in the
                library, most of them other people's and none of them
                deletable, inside a screen called My Library. The public list
                still lives at /explore/collections. */}
            {myCollections.length ? (
              <div className="exp-colgrid">
                {myCollections.map((c) => (
                  <div key={c.id} style={{ position: "relative" }}>
                    <CollectionCard collection={c} />
                    <button
                      className="exp-btn exp-btn-ghost"
                      style={{ position: "absolute", top: 10, right: 10, padding: "4px 10px", font: "600 11px Poppins,sans-serif" }}
                      onClick={(e) => { e.stopPropagation(); handleDeleteCollection(c.id); }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="exp-card exp-dash-empty">
                You haven't created a collection yet. Make one above, then add documents
                to it from any document page or from your saved list.
              </div>
            )}
            <div style={{ marginTop: 16, textAlign: "center" }}>
              <button className="exp-btn exp-btn-ghost" onClick={() => nav("/explore/collections")}>
                Browse everyone's collections
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Minimal "add to one of my collections" picker, shown under a Saved doc card.
function AddToCollectionRow({ doc, collections, onAdd }) {
  const [slug, setSlug] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <div
      style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 8 }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="exp-field" style={{ margin: 0, flex: 1 }}>
        <select
          value={slug}
          onChange={(e) => { setSlug(e.target.value); setDone(false); }}
        >
          <option value="">Add to collection…</option>
          {collections.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
      </div>
      <button
        className="exp-btn exp-btn-ghost"
        style={{ padding: "5px 10px", font: "600 11px Poppins,sans-serif" }}
        disabled={!slug || busy}
        onClick={async () => {
          setBusy(true);
          try { await onAdd(slug, doc.id); setDone(true); setSlug(""); }
          finally { setBusy(false); }
        }}
      >
        {done ? "Added ✓" : "Add"}
      </button>
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
