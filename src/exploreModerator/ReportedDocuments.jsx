import { useEffect, useState } from "react";
import {
  getReports, dismissReport, removeReport, warnReportTarget,
  suspendReportTarget, banReportTarget,
} from "../api/exploreModeration";
import NoteConfirmModal from "../components/NoteConfirmModal";
import { formatAgo } from "./helpers";

// Filter chips mirror the delivered design. "all" clears the reason filter;
// the rest map to Report.REASON_CHOICES codenames on the backend.
const FILTERS = [
  ["all", "All"],
  ["copyright", "Copyright"],
  ["plagiarism", "Plagiarism"],
  ["misleading", "Misleading"],
  ["inappropriate", "Inappropriate"],
  ["low_quality", "Low quality"],
];
const DURATIONS = [3, 7, 14, 30];

const ReportedDocuments = ({ onCount, onAction }) => {
  const [reason, setReason] = useState("all");
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(null); // { kind, row }

  const notify = (m) => onAction && onAction(m);

  const refreshBadge = () =>
    getReports({ status: "pending" }).then((d) =>
      onCount && onCount(typeof d.count === "number" ? d.count : (d.results || []).length));

  const load = () => {
    setLoading(true);
    getReports({ status: "pending", ...(reason !== "all" ? { reason } : {}) })
      .then((d) => setRows(d.results || []))
      .finally(() => setLoading(false));
  };

  useEffect(load, [reason]);
  useEffect(() => { refreshBadge(); }, []);

  const drop = (id) => setRows((prev) => prev.filter((r) => r.id !== id));

  const q = search.trim().toLowerCase();
  const visible = q
    ? rows.filter((r) =>
        (r.content_title || "").toLowerCase().includes(q) ||
        (r.snippet || "").toLowerCase().includes(q) ||
        (r.uploader?.name || "").toLowerCase().includes(q))
    : rows;

  const dismiss = async (row) => {
    await dismissReport(row.id);
    drop(row.id); notify("Report dismissed"); refreshBadge();
  };

  const run = async (note, days) => {
    const { kind, row } = confirm;
    setConfirm(null);
    const who = row.uploader?.name || "uploader";
    if (kind === "remove") { await removeReport(row.id, note); notify(`Removed “${row.content_title}”`); }
    else if (kind === "warn") { await warnReportTarget(row.id, note); notify(`Warned ${who}`); }
    else if (kind === "suspend") { await suspendReportTarget(row.id, days, note); notify(`Suspended ${who} for ${days} days`); }
    else if (kind === "ban") { await banReportTarget(row.id, note); notify(`Banned ${who}`); }
    drop(row.id); refreshBadge();
  };

  return (
    <div>
      <div className="em2-filterbar">
        {FILTERS.map(([key, label]) => (
          <button key={key} className={`em2-chip${reason === key ? " active" : ""}`} onClick={() => setReason(key)}>
            {label}
          </button>
        ))}
        <input className="em2-search" placeholder="Search reported documents…"
               value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {loading ? (
        <div className="em2-loading">Loading…</div>
      ) : visible.length === 0 ? (
        <div className="em2-empty">
          <h4>All clear!</h4>
          <p>No pending reports in this category.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
          {visible.map((r) => (
            <div key={r.id} className="em2-doccard">
              <div className="em2-doccard-top">
                <span className={`em2-tag ${r.reason}`}>{r.reason_label || r.reason}</span>
                <span className="em2-filetype">{r.filetype || "DOC"}</span>
                <span className="em2-time">{formatAgo(r.created_at)}</span>
              </div>
              <h3>{r.content_title || "(untitled document)"}</h3>
              <div className="em2-doc-meta">
                {(r.filetype || "PDF")}{r.pages ? ` · ${r.pages} pages` : ""}{r.content_type ? ` · ${r.content_type}` : ""}
              </div>
              {r.snippet && <div className="em2-doc-desc">{r.detail || r.snippet}</div>}

              <div className="em2-people">
                {r.reporter && (
                  <div className="em2-person">
                    <span className="em2-av" style={{ background: r.reporter.color }}>{r.reporter.initials}</span>
                    <div><div className="who">{r.reporter.name}</div><div className="role">Reporter</div></div>
                  </div>
                )}
                {r.uploader && (
                  <div className="em2-person">
                    <span className="em2-av" style={{ background: r.uploader.color }}>{r.uploader.initials}</span>
                    <div><div className="who">{r.uploader.name}</div><div className="role">Uploader</div></div>
                  </div>
                )}
                <span className="em2-reportcount">{r.report_count} report{r.report_count === 1 ? "" : "s"}</span>
              </div>

              <div className="em2-actions">
                <button className="em2-btn ghost" onClick={() => dismiss(r)}>Dismiss</button>
                <button className="em2-btn remove" onClick={() => setConfirm({ kind: "remove", row: r })}>Remove document</button>
                <button className="em2-btn warn" onClick={() => setConfirm({ kind: "warn", row: r })}>Warn uploader</button>
                <button className="em2-btn suspend" onClick={() => setConfirm({ kind: "suspend", row: r })}>Suspend</button>
                <button className="em2-btn ban" onClick={() => setConfirm({ kind: "ban", row: r })}>Ban</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {confirm?.kind === "remove" && (
        <NoteConfirmModal title="Remove Document"
          message="This hides the document from the library and notifies the uploader. It can be restored later."
          notePlaceholder="Reason for removal (recommended)…" onConfirm={run} onCancel={() => setConfirm(null)} />
      )}
      {confirm?.kind === "warn" && (
        <NoteConfirmModal title="Warn Uploader"
          message="A formal warning will be sent to the uploader. Repeated warnings may lead to a suspension or ban."
          notePlaceholder="Add a note to the warning (optional)…" onConfirm={run} onCancel={() => setConfirm(null)} />
      )}
      {confirm?.kind === "suspend" && (
        <NoteConfirmModal title="Suspend Uploader"
          message="Temporarily block this uploader from publishing. Access returns automatically when the suspension ends."
          notePlaceholder="Reason for suspension…" durationOptions={DURATIONS} defaultDays={7}
          onConfirm={run} onCancel={() => setConfirm(null)} />
      )}
      {confirm?.kind === "ban" && (
        <NoteConfirmModal title="Ban Uploader"
          message="This uploader will be banned from publishing to the Explore library."
          notePlaceholder="Reason for ban (shown to admin)…" onConfirm={run} onCancel={() => setConfirm(null)} />
      )}
    </div>
  );
};

export default ReportedDocuments;
