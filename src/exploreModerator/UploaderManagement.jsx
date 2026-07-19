import { useEffect, useState } from "react";
import {
  getUploaders, warnUploader, suspendUploader, banUploader, unbanUploader,
} from "../api/exploreModeration";
import NoteConfirmModal from "../components/NoteConfirmModal";

const FILTERS = [
  ["all", "All uploaders"],
  ["active", "Active"],
  ["warned", "Warned"],
  ["suspended", "Suspended"],
  ["banned", "Banned"],
];
const DURATIONS = [3, 7, 14, 30];

const UploaderManagement = ({ onAction }) => {
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(null); // { kind, row }

  const notify = (m) => onAction && onAction(m);

  const load = () => {
    setLoading(true);
    getUploaders({ ...(status !== "all" ? { status } : {}), ...(search ? { search } : {}) })
      .then((d) => setRows(d.results || []))
      .finally(() => setLoading(false));
  };
  useEffect(load, [status]);
  // Debounce search.
  useEffect(() => {
    const t = setTimeout(load, search ? 300 : 0);
    return () => clearTimeout(t);
  }, [search]);

  const patchStatus = (id, s) =>
    setRows((prev) => prev.map((u) => (u.id === id ? { ...u, status: s } : u)));

  const run = async (note, days) => {
    const { kind, row } = confirm;
    setConfirm(null);
    if (kind === "warn") { await warnUploader(row.id, note); patchStatus(row.id, "warned"); notify(`Warned ${row.name}`); }
    else if (kind === "suspend") { await suspendUploader(row.id, days, note); patchStatus(row.id, "suspended"); notify(`Suspended ${row.name} for ${days} days`); }
    else if (kind === "ban") { await banUploader(row.id, note); patchStatus(row.id, "banned"); notify(`Banned ${row.name}`); }
    else if (kind === "unban") { await unbanUploader(row.id, note); patchStatus(row.id, "active"); notify(`Reinstated ${row.name}`); }
  };

  return (
    <div>
      <div className="em2-filterbar">
        {FILTERS.map(([key, label]) => (
          <button key={key} className={`em2-chip${status === key ? " active" : ""}`} onClick={() => setStatus(key)}>
            {label}
          </button>
        ))}
        <input className="em2-search" placeholder="Search uploaders…"
               value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {loading ? (
        <div className="em2-loading">Loading…</div>
      ) : rows.length === 0 ? (
        <div className="em2-empty"><h4>No uploaders</h4><p>No uploaders match this filter.</p></div>
      ) : (
        <div style={{ overflowX: "auto", marginTop: 14 }}>
          <table className="em2-table">
            <thead>
              <tr><th>Uploader</th><th>Uploads</th><th>Reports</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {rows.map((u) => {
                const banned = u.status === "banned" || u.status === "suspended";
                return (
                  <tr key={u.id}>
                    <td>
                      <div className="em2-user">
                        <span className="em2-av" style={{ background: u.color }}>{u.initials}</span>
                        <div><div className="who">{u.name}</div><div className="em">{u.email}</div></div>
                      </div>
                    </td>
                    <td>{u.uploads}</td>
                    <td>{u.reports}</td>
                    <td><span className={`em2-status ${u.status}`}>{u.status}</span></td>
                    <td>
                      <div className="em2-rowactions">
                        <button className="em2-btn warn" onClick={() => setConfirm({ kind: "warn", row: u })}>Warn</button>
                        {banned ? (
                          <button className="em2-btn ghost" onClick={() => setConfirm({ kind: "unban", row: u })}>Reinstate</button>
                        ) : (
                          <>
                            <button className="em2-btn suspend" onClick={() => setConfirm({ kind: "suspend", row: u })}>Suspend</button>
                            <button className="em2-btn ban" onClick={() => setConfirm({ kind: "ban", row: u })}>Ban</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {confirm?.kind === "warn" && (
        <NoteConfirmModal title="Warn Uploader"
          message="A formal warning will be sent to this uploader."
          notePlaceholder="Add a note to the warning (optional)…" onConfirm={run} onCancel={() => setConfirm(null)} />
      )}
      {confirm?.kind === "suspend" && (
        <NoteConfirmModal title="Suspend Uploader"
          message="Temporarily block this uploader from publishing."
          notePlaceholder="Reason for suspension…" durationOptions={DURATIONS} defaultDays={7}
          onConfirm={run} onCancel={() => setConfirm(null)} />
      )}
      {confirm?.kind === "ban" && (
        <NoteConfirmModal title="Ban Uploader"
          message="This uploader will be banned from publishing to the Explore library."
          notePlaceholder="Reason for ban (shown to admin)…" onConfirm={run} onCancel={() => setConfirm(null)} />
      )}
      {confirm?.kind === "unban" && (
        <NoteConfirmModal title="Reinstate Uploader"
          message="Fully restore this uploader's publishing access."
          notePlaceholder="Optional note for the audit log…" onConfirm={run} onCancel={() => setConfirm(null)} />
      )}
    </div>
  );
};

export default UploaderManagement;
