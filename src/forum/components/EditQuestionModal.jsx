import React, { useEffect, useRef, useState } from "react";
import { updateThread } from "../../api/forum";

/* Small pop-up for an owner to fix a typo or clarify a question/post without
   losing its existing answers/comments (which a delete+repost would do).
   Same backdrop-click + Escape-to-close pattern as ComposeModal. */
export default function EditQuestionModal({ thread, onClose, onSaved }) {
  const panelRef = useRef(null);
  const [title, setTitle] = useState(thread?.title || "");
  const [body, setBody] = useState(thread?.body || "");
  const [tagInput, setTagInput] = useState((thread?.tags || []).join(", "));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector("input, textarea");
    first?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const save = async () => {
    const t = title.trim();
    if (!t) { setError("Title can't be empty"); return; }
    setBusy(true);
    setError("");
    const tags = tagInput.split(",").map((s) => s.trim().replace(/^#/, "")).filter(Boolean);
    try {
      await updateThread(thread.id, { title: t, body: body.trim(), tags });
      onSaved && onSaved();
    } catch (e) {
      setError(e?.response?.data?.detail || e?.response?.data?.title?.[0] || "Could not save changes");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fm2-modal" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="fm2-modal-panel" role="dialog" aria-modal="true" aria-label={`Edit ${thread?.kind === "post" ? "post" : "question"}`} ref={panelRef} style={{ padding: "22px 24px", maxWidth: 520, boxSizing: "border-box" }}>
        <h3 style={{ font: "800 17px Montserrat,sans-serif", color: "#18261a", margin: "0 0 16px" }}>
          Edit {thread?.kind === "post" ? "post" : "question"}
        </h3>

        <label style={{ font: "700 12px Poppins,sans-serif", color: "#5a6e55", display: "block", marginBottom: 6 }}>Title</label>
        <input className="fm2-input" value={title} onChange={(e) => setTitle(e.target.value)} style={{ marginBottom: 14 }} />

        <label style={{ font: "700 12px Poppins,sans-serif", color: "#5a6e55", display: "block", marginBottom: 6 }}>Body</label>
        <textarea className="fm2-input" value={body} onChange={(e) => setBody(e.target.value)} rows={6} style={{ resize: "vertical", marginBottom: 14 }} />

        <label style={{ font: "700 12px Poppins,sans-serif", color: "#5a6e55", display: "block", marginBottom: 6 }}>
          Tags <span style={{ fontWeight: 400, color: "#8a9e82" }}>(comma-separated)</span>
        </label>
        <input className="fm2-input" value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="e.g. physics, mechanics" style={{ marginBottom: error ? 10 : 18 }} />

        {error ? <div style={{ font: "600 12.5px Poppins,sans-serif", color: "#b03020", marginBottom: 10 }}>{error}</div> : null}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button type="button" onClick={onClose} className="fm2-btn-ghost" disabled={busy}>Cancel</button>
          <button type="button" onClick={save} className="fm2-btn-green" disabled={busy}>{busy ? "Saving…" : "Save changes"}</button>
        </div>
      </div>
    </div>
  );
}
