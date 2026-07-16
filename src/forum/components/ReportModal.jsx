import React, { useState } from "react";
import { report as apiReport } from "../../api/forum";

const REASONS = [
  { id: "spam", label: "Spam", desc: "Promotional, repetitive or irrelevant content." },
  { id: "abusive", label: "Abusive content", desc: "Harassment, hate speech or personal attacks." },
  { id: "duplicate", label: "Duplicate", desc: "This has already been asked elsewhere." },
  { id: "misleading", label: "Misleading information", desc: "Factually wrong or deceptive content." },
  { id: "other", label: "Other", desc: "Something else that breaks community rules." },
];

// target: { type: 'question'|'answer'|'comment', id }
export default function ReportModal({ target, onClose, onDone }) {
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  if (!target) return null;

  const submit = async () => {
    if (!reason || busy) return;
    setBusy(true);
    try {
      await apiReport({ target_type: target.type, target_id: target.id, reason });
      onDone && onDone("Reported to moderators — thanks for flagging");
    } catch {
      onDone && onDone("Could not submit report");
    } finally {
      setBusy(false);
      onClose && onClose();
    }
  };

  return (
    <div className="fm-overlay" onClick={onClose}>
      <div className="fm-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Report this {target.type}</h3>
        <p className="fm-sub">Tell us what's wrong. Our moderators will review it.</p>
        {REASONS.map((r) => (
          <button
            key={r.id}
            type="button"
            className={`fm-reason${reason === r.id ? " on" : ""}`}
            onClick={() => setReason(r.id)}
          >
            <span>
              <span className="r-label">{r.label}</span><br />
              <span className="r-desc">{r.desc}</span>
            </span>
          </button>
        ))}
        <div className="fm-modal-foot">
          <button className="fm-btn ghost sm" onClick={onClose}>Cancel</button>
          <button className="fm-btn danger sm" disabled={!reason || busy} onClick={submit}>
            {busy ? "Reporting…" : "Report"}
          </button>
        </div>
      </div>
    </div>
  );
}
