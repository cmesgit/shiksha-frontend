import { useEffect, useState } from "react";
import { getDuplicates, confirmDuplicate, dismissDuplicate } from "../api/exploreModeration";
import NoteConfirmModal from "../components/NoteConfirmModal";
import { formatAgo } from "./helpers";

const DuplicateReview = ({ onCount, onAction }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(null); // { kind, row }

  const notify = (m) => onAction && onAction(m);
  const refreshBadge = () =>
    getDuplicates({ status: "pending" }).then((d) =>
      onCount && onCount(typeof d.count === "number" ? d.count : (d.results || []).length));

  const load = () => {
    setLoading(true);
    getDuplicates({ status: "pending" })
      .then((d) => setRows(d.results || []))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);
  useEffect(() => { refreshBadge(); }, []);

  const drop = (id) => setRows((prev) => prev.filter((r) => r.id !== id));

  const run = async (note) => {
    const { kind, row } = confirm;
    setConfirm(null);
    if (kind === "confirm") { await confirmDuplicate(row.id, note); notify(`Removed duplicate “${row.document.title}”`); }
    else { await dismissDuplicate(row.id, note); notify("Duplicate flag dismissed"); }
    drop(row.id); refreshBadge();
  };

  return (
    <div>
      {loading ? (
        <div className="em2-loading">Loading…</div>
      ) : rows.length === 0 ? (
        <div className="em2-empty">
          <h4>Nothing to review</h4>
          <p>No pending duplicate uploads. The library looks original.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {rows.map((r) => (
            <div key={r.id} className="em2-doccard">
              <div className="em2-doccard-top">
                <span className="em2-tag duplicate">Duplicate</span>
                {typeof r.similarity === "number" && (
                  <span className="em2-filetype" style={{ background: "#c0392b" }}>{r.similarity}% match</span>
                )}
                <span className="em2-time">{formatAgo(r.created_at)}</span>
              </div>
              <h3>{r.document?.title || "(untitled document)"}</h3>
              <div className="em2-doc-meta">
                Uploaded by {r.document?.uploader?.name || "unknown"}
                {r.original ? <> · duplicates “{r.original.title}” by {r.original.uploader?.name}</> : null}
              </div>
              {r.note && <div className="em2-doc-desc">{r.note}</div>}
              <div className="em2-actions">
                <button className="em2-btn ghost" onClick={() => setConfirm({ kind: "dismiss", row: r })}>
                  Not a duplicate
                </button>
                <button className="em2-btn remove" onClick={() => setConfirm({ kind: "confirm", row: r })}>
                  Confirm &amp; remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {confirm?.kind === "confirm" && (
        <NoteConfirmModal title="Confirm Duplicate"
          message="This removes the duplicate document from the library. It can be restored later."
          notePlaceholder="Optional note for the audit log…" onConfirm={run} onCancel={() => setConfirm(null)} />
      )}
      {confirm?.kind === "dismiss" && (
        <NoteConfirmModal title="Dismiss Flag"
          message="Keep this document live — it is not a duplicate."
          notePlaceholder="Optional note for the audit log…" onConfirm={run} onCancel={() => setConfirm(null)} />
      )}
    </div>
  );
};

export default DuplicateReview;
