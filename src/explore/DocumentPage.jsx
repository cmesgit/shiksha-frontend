// ─────────────────────────────────────────────────────────────────────────────
// src/explore/DocumentPage.jsx  →  route: /explore/doc/:id
// The document "reader" landing: cover + metadata + actions (read, download,
// save, like, share, report, follow author), the abstract, tags, and related /
// recommended rails.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDocument, reportDocument, recordDownload, recordView } from "./exploreApi";
import { useExplore } from "./ExploreStore";
import { DocCard, Icon, Loading, fileGlyph, LikeButton } from "./components/ui";
import { CategoryIcon } from "./components/categoryIcons";
import {
  PiBookmarkSimple, PiBookmarkSimpleFill, PiCheck, PiFlag,
  PiHeart, PiHeartFill, PiPlus, PiShareNetwork,
} from "react-icons/pi";
import "./Explore.css";

export default function DocumentPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const store = useExplore();
  const [data, setData] = useState(null);
  const [toast, setToast] = useState("");
  const [report, setReport] = useState(null); // {reason, details} | null

  useEffect(() => {
    let alive = true;
    setData(null);
    getDocument(id).then((d) => {
      if (alive) {
        setData(d);
        if (d) {
          store.recordView(id); // local "recently viewed" list for the library UI
          recordView(id).catch(() => {}); // real server-side view count
        }
      }
    });
    window.scrollTo(0, 0);
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2200); };

  if (data === null) return <div className="exp"><Loading /></div>;
  if (!data?.doc) return (
    <div className="exp"><div className="exp-wrap exp-empty">
      <h3>Document not found</h3>
      <button className="exp-btn exp-btn-primary" style={{ marginTop: 16 }} onClick={() => nav("/explore")}>Back to Explore</button>
    </div></div>
  );

  const { doc, related, recommended } = data;
  const meta = doc.typeMeta || {};
  const cover = `linear-gradient(135deg, ${meta.color || "#125027"}, #003223)`;
  const saved = store.isSaved(doc.id);
  const liked = store.isLiked(doc.id);
  const following = doc.author && store.isFollowing(doc.author.id);

  const share = async () => {
    const url = window.location.href;
    try { await navigator.clipboard.writeText(url); flash("Link copied to clipboard"); }
    catch { flash("Copy this link: " + url); }
  };

  // These used to just show a fake "Opening reader…" / "Download started"
  // toast and do nothing else — no real file was ever opened or downloaded.
  // The backend already serializes the real uploaded file as `file_url`
  // (documents/serializers.py DocumentCardSerializer.get_file_url), so open
  // it for real; only fall back to a toast when a document genuinely has no
  // uploaded file yet.
  const readNow = () => {
    if (!doc.file_url) {
      flash("No file has been uploaded for this document yet");
      return;
    }
    window.open(doc.file_url, "_blank", "noopener,noreferrer");
  };

  const downloadNow = () => {
    if (!doc.file_url) {
      flash("No file has been uploaded for this document yet");
      return;
    }
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

  return (
    <div className="exp">
      <div className="exp-wrap exp-docpage exp-in">
        <button className="exp-back" onClick={() => nav(-1)}><Icon.back /> Back</button>

        <div className="exp-doclayout">
          {/* cover + actions */}
          <div>
            <div className="exp-bigcover" style={{ background: cover }}>
              <span className="ficon"><CategoryIcon meta={meta} /></span>
              <span className="ftype" style={{ position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,.28)", color: "#fff", font: "700 11px Poppins", padding: "5px 9px", borderRadius: 7 }}>
                {fileGlyph(doc.filetype)} · {doc.pages} pages
              </span>
            </div>

            <div className="exp-actions">
              <button className="exp-btn exp-btn-primary" style={{ width: "100%", justifyContent: "center" }}
                onClick={readNow}>Read now</button>
              <button className="exp-btn exp-btn-ghost" style={{ width: "100%", justifyContent: "center" }}
                onClick={downloadNow}>Download</button>
              <div className="row">
                <button className={`exp-iconbtn${saved ? " on" : ""}`} onClick={() => store.toggleSave(doc.id)}>
                  {saved ? <><PiBookmarkSimpleFill aria-hidden="true" /> Saved</> : <><PiBookmarkSimple aria-hidden="true" /> Save</>}
                </button>
                <button className={`exp-iconbtn${liked ? " on" : ""}`} onClick={() => store.toggleLike(doc.id)}>
                  {liked ? <><PiHeartFill aria-hidden="true" /> Liked</> : <><PiHeart aria-hidden="true" /> Like</>}
                </button>
              </div>
              <div className="row">
                <button className="exp-iconbtn" onClick={share}><PiShareNetwork aria-hidden="true" /> Share</button>
                <button className="exp-iconbtn" onClick={() => setReport({ reason: "", detail: "" })}><PiFlag aria-hidden="true" /> Report</button>
              </div>
            </div>
          </div>

          {/* main */}
          <div className="exp-docmain">
            <span className="exp-tag" style={{ marginBottom: 10, display: "inline-block" }}>{meta.name || doc.type}</span>
            <h1>{doc.title}</h1>

            {doc.author && (
              <div className="byline" onClick={() => nav(`/explore/author/${doc.author.id}`)}>
                <div className="exp-avatar" style={{ background: doc.author.color, width: 40, height: 40, fontSize: 14 }}>
                  {doc.author.initials}
                </div>
                <div>
                  <b>{doc.author.name}</b>
                  <span> · {doc.author.institution}</span>
                </div>
                {doc.author && (
                  <button
                    className={`exp-btn ${following ? "exp-btn-ghost" : "exp-btn-primary"}`}
                    style={{ marginLeft: "auto", padding: "8px 16px" }}
                    onClick={(e) => { e.stopPropagation(); store.toggleFollow(doc.author.id); }}
                  >{following ? <><PiCheck aria-hidden="true" /> Following</> : <><PiPlus aria-hidden="true" /> Follow</>}</button>
                )}
              </div>
            )}

            <div className="exp-inforow">
              <div className="exp-inforow-like"><LikeButton doc={doc} /></div>
              <div><b>{doc.views}</b>Views</div>
              <div><b>{doc.downloads}</b>Downloads</div>
              <div><b>{doc.subject}</b>Subject</div>
              <div><b>{doc.level}</b>Level</div>
              <div><b>{doc.language}</b>Language</div>
            </div>

            <div className="exp-abstract">
              <h3>About this document</h3>
              <p style={{ marginBottom: 14 }}>{doc.desc}</p>
              <p>{doc.full}</p>
            </div>

            <div className="exp-doc-tags" style={{ marginTop: 20 }}>
              {(doc.tags || []).map((t) => (
                <button key={t} className="exp-tag" style={{ cursor: "pointer" }}
                  onClick={() => nav(`/explore/browse?q=${encodeURIComponent(t)}`)}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        {/* related */}
        {related?.length > 0 && (
          <section className="exp-section" style={{ paddingBottom: 20 }}>
            <h2 className="exp-secttitle" style={{ marginBottom: 18 }}>Related documents</h2>
            <div className="exp-docgrid">{related.map((d) => <DocCard key={d.id} doc={d} />)}</div>
          </section>
        )}

        {/* recommended */}
        {recommended?.length > 0 && (
          <section className="exp-section" style={{ paddingTop: 10 }}>
            <h2 className="exp-secttitle" style={{ marginBottom: 18 }}>You might also like</h2>
            <div className="exp-rail exp-scroll">{recommended.map((d) => <DocCard key={d.id} doc={d} />)}</div>
          </section>
        )}
      </div>

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
