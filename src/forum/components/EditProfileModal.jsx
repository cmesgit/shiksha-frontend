import React, { useState } from "react";
import { updateForumProfile } from "../../api/forum";

export default function EditProfileModal({ initial, onClose, onSaved }) {
  const [form, setForm] = useState({
    display_name: initial?.display_name || "",
    headline: initial?.headline || "",
    location: initial?.location || "",
    bio: initial?.bio || "",
  });
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = async () => {
    setBusy(true);
    try {
      const data = await updateForumProfile(form);
      onSaved && onSaved(data);
    } catch { /* ignore */ } finally { setBusy(false); }
  };

  return (
    <div className="fm-overlay" onClick={onClose}>
      <div className="fm-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Edit profile</h3>
        <label className="fm-label">Display name</label>
        <input className="fm-input" value={form.display_name} onChange={set("display_name")} placeholder="Your name" />
        <label className="fm-label">Headline</label>
        <input className="fm-input" value={form.headline} onChange={set("headline")} placeholder="e.g. Final-year student · JEE mentor" />
        <label className="fm-label">Location</label>
        <input className="fm-input" value={form.location} onChange={set("location")} placeholder="City, Country" />
        <label className="fm-label">Bio</label>
        <textarea className="fm-textarea" rows={3} maxLength={280} value={form.bio} onChange={set("bio")} placeholder="A short bio (max 280 chars)" />
        <div className="fm-modal-foot">
          <button className="fm-btn ghost sm" onClick={onClose}>Cancel</button>
          <button className="fm-btn sm" disabled={busy} onClick={save}>{busy ? "Saving…" : "Save"}</button>
        </div>
      </div>
    </div>
  );
}
