// ─────────────────────────────────────────────────────────────────────────────
// src/explore/DocumentPage.jsx  →  route: /explore/doc/:id
//
// Rebuilt to the Claude design (Explore.dc.html, the document screen). Layout is
// content-left / action-rail-right:
//
//   left   — the inline document viewer, "About this document", a "Document
//            information" spec table, and "More like this"
//   right  — a sticky card of actions (Read online / Download / Like · Save ·
//            Share · Report), the author card, and "Recommended for you"
//
// The screen this replaces led with a 3:4 gradient cover block and stacked the
// actions under it, which pushed the actual document below the fold and gave
// the page no reader at all — "Read now" only ever opened the file in a new tab.
//
// Two behaviours here are deliberate and easy to undo by accident:
//
//  1. LIKES HAVE ONE SOURCE OF TRUTH. There are two like affordances on this
//     page on purpose — a count in the meta line under the title, and the
//     button in the action rail. They used to be two independent components
//     writing to the same endpoint with different payloads and different ideas
//     of "liked", so clicking one never updated the other. Now the state lives
//     here and both read it; only the rail button writes.
//
//  2. A VIEW IS RECORDED WHEN THE DOCUMENT IS ACTUALLY READ, not when this
//     route renders. Opening a card used to count as a view, which made the
//     number meaningless. See recordRead() below for what counts.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDocument, reportDocument, recordDownload, recordView, toggleLike,
  getMe, listCollections, createCollection, addDocumentToCollection,
} from "./exploreApi";
import { useExplore } from "./ExploreStore";
import { useAuth } from "../contexts/AuthContext";
import { DocCard, Icon, Loading, fileGlyph, tint } from "./components/ui";
import { CategoryIcon } from "./components/categoryIcons";
import {
  PiBookmarkSimple, PiBookmarkSimpleFill, PiCheck, PiFlag, PiEye,
  PiHeart, PiHeartFill, PiPlus, PiShareNetwork, PiDownloadSimple, PiBookOpen,
  PiFolderSimplePlus,
} from "react-icons/pi";
import "./Explore.css";

// Only these can be shown in a frame. Everything else (docx, ppt, xls) has no
// in-browser renderer without a conversion service, so the viewer shows the
// design's "Preview unavailable" state and download becomes the way to read it.
const INLINE_TYPES = ["PDF"];
const canPreviewInline = (doc) =>
  !!doc.file_url && INLINE_TYPES.includes(String(doc.filetype || "").toUpperCase());

export default function DocumentPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const store = useExplore();
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState(null);
  const [toast, setToast] = useState("");
  const [report, setReport] = useState(null); // {reason, detail} | null
  const [collecting, setCollecting] = useState(false);

  // Likes — owned here so the meta-line count and the rail button can never
  // disagree (see the header note).
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [likeBusy, setLikeBusy] = useState(false);

  // A view is recorded at most once per mounted document, however many times
  // the reader loads or the user re-clicks Download.
  const viewRecorded = useRef(false);

  useEffect(() => {
    let alive = true;
    setData(null);
    viewRecorded.current = false;
    getDocument(id).then((d) => {
      if (!alive) return;
      setData(d);
      if (d?.doc) {
        setLiked(!!d.doc.is_liked);
        setLikes(d.doc.likes_count ?? 0);
      }
    });
    window.scrollTo(0, 0);
    return () => { alive = false; };
  }, [id]);

  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2200); };

  // What counts as reading: the file rendered in the viewer, or the reader was
  // opened in a tab, or the file was downloaded. Merely arriving on this route
  // does not — that was the old behaviour and it counted every card click.
  const recordRead = useCallback(() => {
    if (viewRecorded.current) return;
    viewRecorded.current = true;
    store.recordView(id);            // local "recently read" list for My Library
    recordView(id).catch(() => {});  // the real server-side view count
  }, [id, store]);

  if (data === null) return <div className="exp"><Loading /></div>;
  if (!data?.doc) return (
    <div className="exp"><div className="exp-wrap exp-empty">
      <h3>Document not found</h3>
      <p className="exp-sub" style={{ marginTop: 6 }}>
        It may have been removed by its owner or by a moderator.
      </p>
      {/* The only route out of a dead document — kept deliberately, unlike the
          "Back to Explore" buttons that were removed from working pages. */}
      <button className="exp-btn exp-btn-primary" style={{ marginTop: 16 }}
        onClick={() => nav("/explore")}>Back to Explore</button>
    </div></div>
  );

  const { doc, related, recommended } = data;
  const meta = doc.typeMeta || {};
  const accent = meta.color || "#125027";
  const saved = store.isSaved(doc.id);
  const following = doc.author && store.isFollowing(doc.author.id);
  const inlinePreview = canPreviewInline(doc);

  const share = async () => {
    const url = window.location.href;
    try { await navigator.clipboard.writeText(url); flash("Link copied to clipboard"); }
    catch { flash("Copy this link: " + url); }
  };

  const onLike = async () => {
    if (likeBusy) return;
    if (!isAuthenticated) {
      const back = window.location.pathname + window.location.search;
      nav(`/login?next=${encodeURIComponent(back)}`);
      return;
    }
    setLikeBusy(true);
    const prev = { liked, likes };
    const next = !liked;
    setLiked(next);
    setLikes((n) => Math.max(0, n + (next ? 1 : -1)));
    try {
      const res = await toggleLike(doc.id);
      // The endpoint has answered with both shapes across serializer versions.
      const isLiked = typeof res?.is_liked === "boolean" ? res.is_liked
        : typeof res?.liked === "boolean" ? res.liked : undefined;
      const count = typeof res?.likes_count === "number" ? res.likes_count
        : typeof res?.likes === "number" ? res.likes : undefined;
      if (isLiked !== undefined) setLiked(isLiked);
      if (count !== undefined) setLikes(count);
    } catch {
      setLiked(prev.liked);
      setLikes(prev.likes);
      flash("Couldn't save that — try again");
    } finally {
      setLikeBusy(false);
    }
  };

  const readOnline = () => {
    if (!doc.file_url) {
      flash("No file has been uploaded for this document yet");
      return;
    }
    recordRead();
    window.open(doc.file_url, "_blank", "noopener,noreferrer");
  };

  const downloadNow = () => {
    if (!doc.file_url) {
      flash("No file has been uploaded for this document yet");
      return;
    }
    recordRead();
    recordDownload(doc.id).catch(() => {});
    const link = document.createElement("a");
    link.href = doc.file_url;
    link.download = doc.title || "document";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const submitReport = async () => {
    await reportDocument(doc.id, report);
    setReport(null);
    flash("Thanks — the document has been reported");
  };

  const info = [
    ["Category", meta.name || doc.type],
    ["Subject", doc.subject],
    ["Education level", doc.level],
    ["Language", doc.language],
    ["Institution", doc.institution],
    ["File type", doc.filetype],
    ["Pages", doc.pages ? String(doc.pages) : ""],
    ["Published", doc.dateLabel],
  ].filter(([, v]) => v);

  return (
    <div className="exp">
      <div className="exp-wrap exp-docpage exp-in">
        <button className="exp-back" onClick={() => nav(-1)}><Icon.back /> Back</button>

        {/* ── title block ─────────────────────────────────────────────────── */}
        <div className="exp-dochead">
          <div className="exp-docbadges">
            <span className="exp-typepill" style={{ background: tint(accent, 0.12), color: accent, borderColor: tint(accent, 0.24) }}>
              <CategoryIcon meta={meta} /> {meta.name || doc.type}
            </span>
            {doc.filetype && (
              <span className="exp-filepill">
                {fileGlyph(doc.filetype)}{doc.pages ? ` · ${doc.pages} pages` : ""}
              </span>
            )}
          </div>
          <h1>{doc.title}</h1>
          {/* The read-only half of the like pair — reflects the same state the
              rail button writes, so the number moves the moment you like. */}
          <div className="exp-docmeta">
            <span><PiEye aria-hidden="true" /> {doc.views} views</span>
            <span className={liked ? "is-liked" : undefined}>
              {liked ? <PiHeartFill aria-hidden="true" /> : <PiHeart aria-hidden="true" />} {likes} likes
            </span>
            {doc.dateLabel && <span>{doc.dateLabel}</span>}
          </div>
        </div>

        <div className="exp-doclayout">
          {/* ── main column ───────────────────────────────────────────────── */}
          <div className="exp-docmain">
            <section className="exp-viewer">
              <div className="exp-viewer-hd">Document viewer</div>
              <div className="exp-viewer-body">
                {inlinePreview ? (
                  <iframe
                    className="exp-viewer-frame"
                    src={doc.file_url}
                    title={doc.title}
                    onLoad={recordRead}
                  />
                ) : (
                  <div className="exp-viewer-empty">
                    <span className="ic" style={{ background: tint(accent, 0.12), color: accent }}>
                      <CategoryIcon meta={meta} />
                    </span>
                    <h3>Preview unavailable</h3>
                    <p>
                      {doc.file_url
                        ? `${doc.filetype || "This file type"} can't be shown in the browser. Download it to read.`
                        : "No file has been uploaded for this document yet."}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {(doc.desc || doc.full) && (
              <section className="exp-docsect">
                <h2>About this document</h2>
                {doc.desc && <p>{doc.desc}</p>}
                {doc.full && <p>{doc.full}</p>}
                {doc.tags?.length > 0 && (
                  <div className="exp-doc-tags" style={{ marginTop: 16 }}>
                    {doc.tags.map((t) => (
                      <button key={t} className="exp-tag" style={{ cursor: "pointer", border: "none" }}
                        onClick={() => nav(`/explore/browse?q=${encodeURIComponent(t)}`)}>#{t}</button>
                    ))}
                  </div>
                )}
              </section>
            )}

            {info.length > 0 && (
              <section className="exp-docsect">
                <h2>Document information</h2>
                <dl className="exp-specgrid">
                  {info.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {related?.length > 0 && (
              <section className="exp-docsect">
                <h2>More like this</h2>
                <div className="exp-docgrid-3">{related.slice(0, 3).map((d) => <DocCard key={d.id} doc={d} />)}</div>
              </section>
            )}
          </div>

          {/* ── action rail ───────────────────────────────────────────────── */}
          <aside className="exp-docrail">
            <div className="exp-railcard">
              <button className="exp-btn exp-btn-primary exp-railbtn" onClick={readOnline}>
                <PiBookOpen aria-hidden="true" /> Read online
              </button>
              <button className="exp-btn exp-btn-ghost exp-railbtn" onClick={downloadNow}>
                <PiDownloadSimple aria-hidden="true" /> Download{doc.filetype ? ` (${doc.filetype})` : ""}
              </button>
              <div className="exp-railgrid">
                {/* The functional half of the like pair. */}
                <button className={`exp-iconbtn${liked ? " on" : ""}`} onClick={onLike} disabled={likeBusy}>
                  {liked ? <><PiHeartFill aria-hidden="true" /> Liked</> : <><PiHeart aria-hidden="true" /> Like</>}
                </button>
                <button className={`exp-iconbtn${saved ? " on" : ""}`} onClick={() => store.toggleSave(doc.id)}>
                  {saved ? <><PiBookmarkSimpleFill aria-hidden="true" /> Saved</> : <><PiBookmarkSimple aria-hidden="true" /> Save</>}
                </button>
                <button className="exp-iconbtn" onClick={share}>
                  <PiShareNetwork aria-hidden="true" /> Share
                </button>
                <button className="exp-iconbtn danger" onClick={() => setReport({ reason: "", detail: "" })}>
                  <PiFlag aria-hidden="true" /> Report
                </button>
              </div>
              {/* The only way to put a document into a collection used to be a
                  <select> under a card in the Saved tab of My Library — so a
                  document you hadn't saved could not be collected at all, and
                  that picker was itself dead code (see DashboardPage's
                  myCollections note). This is the natural place for it. */}
              <button className="exp-btn exp-btn-ghost exp-railbtn" style={{ marginTop: 9 }}
                onClick={() => setCollecting(true)}>
                <PiFolderSimplePlus aria-hidden="true" /> Add to collection
              </button>
            </div>

            {doc.author && (
              <div className="exp-railcard">
                <p className="exp-raileyebrow">Author</p>
                <div className="exp-railauthor" onClick={() => nav(`/explore/author/${doc.author.id}`)}>
                  <div className="exp-avatar" style={{ background: doc.author.color, width: 40, height: 40, fontSize: 14 }}>
                    {doc.author.initials}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <b>{doc.author.name}</b>
                    {doc.author.institution && <span>{doc.author.institution}</span>}
                  </div>
                </div>
                <button className="exp-btn exp-btn-ghost exp-railbtn" style={{ marginTop: 12 }}
                  onClick={() => nav(`/explore/author/${doc.author.id}`)}>View profile</button>
                {/* Not in the design, kept on purpose: following is a live
                    feature the My Library "Following" tab reads, and this is
                    the only place on a document where you can start. */}
                <button
                  className={`exp-btn ${following ? "exp-btn-ghost" : "exp-btn-primary"} exp-railbtn`}
                  style={{ marginTop: 8 }}
                  onClick={() => store.toggleFollow(doc.author.id)}
                >{following ? <><PiCheck aria-hidden="true" /> Following</> : <><PiPlus aria-hidden="true" /> Follow</>}</button>
              </div>
            )}

            {recommended?.length > 0 && (
              <div className="exp-railcard">
                <p className="exp-raileyebrow">Recommended for you</p>
                <div className="exp-railrecs">
                  {recommended.slice(0, 4).map((d) => {
                    const m = d.typeMeta || {};
                    const c = m.color || "#125027";
                    return (
                      <button key={d.id} className="exp-railrec" onClick={() => nav(`/explore/doc/${d.id}`)}>
                        <span className="ic" style={{ background: tint(c, 0.12), border: `1px solid ${tint(c, 0.2)}`, color: c }}>
                          <CategoryIcon meta={m} />
                        </span>
                        <span className="tx">
                          <b>{d.title}</b>
                          <em>{m.name || d.type}</em>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {collecting && (
        <AddToCollectionModal
          doc={doc}
          onClose={() => setCollecting(false)}
          onDone={(name) => { setCollecting(false); flash(`Added to "${name}"`); }}
          onNeedsAuth={() => {
            const back = window.location.pathname + window.location.search;
            nav(`/login?next=${encodeURIComponent(back)}`);
          }}
        />
      )}

      {/* report modal */}
      {report && (
        <div className="exp-backdrop" onClick={() => setReport(null)}>
          <div className="exp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setReport(null)}>×</button>
            <h2>Report this document</h2>
            <p className="exp-sub" style={{ marginBottom: 16 }}>Tell us what's wrong and we'll review it.</p>
            <div className="exp-field">
              <label>Reason</label>
              <select value={report.reason} onChange={(e) => setReport({ ...report, reason: e.target.value })}>
                <option value="">Select a reason…</option>
                <option value="copyright">Copyright infringement</option>
                <option value="plagiarism">Plagiarism</option>
                <option value="inappropriate">Inappropriate content</option>
                <option value="misleading">Spam or misleading</option>
                <option value="low_quality">Poor quality / wrong file</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="exp-field">
              <label>Details (optional)</label>
              <textarea value={report.detail} onChange={(e) => setReport({ ...report, detail: e.target.value })}
                placeholder="Add any context that helps us review this." />
            </div>
            <button className="exp-btn exp-btn-primary" style={{ width: "100%", justifyContent: "center" }}
              disabled={!report.reason} onClick={submitReport}>Submit report</button>
          </div>
        </div>
      )}

      {toast && <div className="exp-toast">{toast}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Add-to-collection dialog.
//
// Lists the viewer's own collections and lets them create one inline, because
// "add to collection" with no collections and no way to make one is a dead end
// — and the Collections tab of My Library is three clicks away.
//
// Ownership is decided by comparing `collection.curator.id` to `me.id`, both of
// which come from the same contributor-badge blob the backend emits. Comparing
// against AuthContext's user object instead is what silently broke the original
// picker: that is a different identity space and carries no `username`.
// ─────────────────────────────────────────────────────────────────────────────
function AddToCollectionModal({ doc, onClose, onDone, onNeedsAuth }) {
  const [mine, setMine] = useState(null);   // null = loading
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    let alive = true;
    Promise.all([getMe(), listCollections()])
      .then(([me, cols]) => {
        if (!alive) return;
        if (!me?.id) { onNeedsAuth(); return; }
        setMine((cols || []).filter((c) => c.curator?.id && c.curator.id === me.id));
      })
      .catch(() => alive && setError("Couldn't load your collections."));
    return () => { alive = false; };
  }, [onNeedsAuth]);

  const add = async (col) => {
    setBusy(true);
    setError("");
    try {
      await addDocumentToCollection(col.id, doc.id);
      onDone(col.title);
    } catch {
      setError(`Couldn't add it to "${col.title}". It may already be in there.`);
      setBusy(false);
    }
  };

  const createAndAdd = async (e) => {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title || busy) return;
    setBusy(true);
    setError("");
    try {
      const created = await createCollection({ title, description: "", color: "#125027", visibility: "public" });
      await addDocumentToCollection(created.id, doc.id);
      onDone(created.title || title);
    } catch {
      setError("Couldn't create that collection. Try a different name.");
      setBusy(false);
    }
  };

  return (
    <div className="exp-backdrop" onClick={onClose}>
      <div className="exp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>×</button>
        <h2>Add to a collection</h2>
        <p className="exp-sub" style={{ marginBottom: 16 }}>
          Group <b>{doc.title}</b> with other documents in your library.
        </p>

        {mine === null ? <Loading /> : (
          <>
            {mine.length > 0 && (
              <div className="exp-collpick">
                {mine.map((c) => (
                  <button key={c.id} className="exp-collpick-row" disabled={busy} onClick={() => add(c)}>
                    <span className="ic" style={{ background: c.color || "#125027" }}>
                      {(c.title || "?").slice(0, 1).toUpperCase()}
                    </span>
                    <span className="tx">
                      <b>{c.title}</b>
                      <em>{c.count} document{c.count === 1 ? "" : "s"} · {c.visibility}</em>
                    </span>
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={createAndAdd} className="exp-field" style={{ marginTop: mine.length ? 18 : 0, marginBottom: 0 }}>
              <label>{mine.length ? "Or create a new one" : "Create your first collection"}</label>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="text" placeholder="Collection name" value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <button type="submit" className="exp-btn exp-btn-primary" disabled={busy || !newTitle.trim()}>
                  {busy ? "…" : "Create"}
                </button>
              </div>
            </form>
          </>
        )}

        {error && <div className="exp-upload-error" style={{ margin: "14px 0 0" }}>{error}</div>}
      </div>
    </div>
  );
}
