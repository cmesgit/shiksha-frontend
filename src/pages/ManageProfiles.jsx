import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { APP_DASHBOARD_URL, TEACHER_DASHBOARD_URL } from "../config/urls";
import "./ManageProfiles.css";

/* ─── Avatar ────────────────────────────────────────────────────────────── */
const EMOJIS = ["🧑","👦","👧","🧒","👨","👩","🎓","📚","⭐","🌟"];

const Avatar = ({ p, size = 56 }) => {
  const s = { width: size, height: size, borderRadius: "50%", objectFit: "cover" };
  if (p.avatar_type === "image" && p.avatar)
    return <img src={p.avatar} alt="" style={s} />;
  const initial = (p.display_name || "?").charAt(0).toUpperCase();
  return (
    <div style={{
      ...s, display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg,#3fad4e,#2f9d42)",
      color: "#fff", fontWeight: 700, fontSize: size * 0.38,
    }}>
      {p.avatar_type === "emoji" && p.avatar ? p.avatar : initial}
    </div>
  );
};

/* ─── Back button ───────────────────────────────────────────────────────── */
function BackButton({ isTeacherContext, isLearnerContext }) {
  const dest = isTeacherContext
    ? TEACHER_DASHBOARD_URL
    : isLearnerContext
    ? APP_DASHBOARD_URL
    : null;               // account context — no dashboard to return to

  if (!dest) return null;

  return (
    <a href={dest} className="mp-back">
      ← Back to {isTeacherContext ? "teacher" : "student"} dashboard
    </a>
  );
}

/* ─── Form ──────────────────────────────────────────────────────────────── */
const BLANK = { display_name: "", relationship: "DEPENDENT", pin: "", avatar_emoji: "" };

function ProfileForm({ initial, isCreate, onSave, onCancel, saving, error }) {
  const [form, setForm] = useState(initial || BLANK);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="mp-modal" onClick={e => e.stopPropagation()}>
      <h2>{isCreate ? "New profile" : "Edit profile"}</h2>

      {error && <p className="mp-error">{error}</p>}

      <label>
        Display name *
        <input value={form.display_name}
          onChange={e => set("display_name", e.target.value)}
          placeholder="e.g. Rami or Child 1" autoFocus />
      </label>

      {isCreate && (
        <label>
          Relationship
          <select value={form.relationship} onChange={e => set("relationship", e.target.value)}>
            <option value="DEPENDENT">Child / Dependent</option>
            <option value="SELF">Myself (account holder)</option>
          </select>
        </label>
      )}

      <label>
        PIN <span style={{ fontWeight: 400, color: "#9db8a2" }}>(optional, 4–6 digits)</span>
        <input inputMode="numeric" maxLength={6} value={form.pin}
          onChange={e => set("pin", e.target.value.replace(/\D/g, ""))}
          placeholder={isCreate ? "Leave blank for no PIN" : "Leave blank to keep current PIN"}
          style={{ letterSpacing: "0.25em" }} />
      </label>

      <label>
        Avatar emoji <span style={{ fontWeight: 400, color: "#9db8a2" }}>(optional)</span>
        <div className="mp-emojis">
          {EMOJIS.map(em => (
            <button key={em} type="button"
              className={`mp-emoji ${form.avatar_emoji === em ? "mp-emoji--sel" : ""}`}
              onClick={() => set("avatar_emoji", form.avatar_emoji === em ? "" : em)}>
              {em}
            </button>
          ))}
        </div>
      </label>

      <div className="mp-modal-footer">
        <button className="mp-btn" onClick={onCancel} disabled={saving}>Cancel</button>
        <button className="mp-btn mp-btn--primary" onClick={() => onSave(form)} disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}

/* ─── Main ──────────────────────────────────────────────────────────────── */
export default function ManageProfiles() {
  const { api, bootstrap, isTeacherContext, isLearnerContext } = useAuth();

  const [profiles, setProfiles]   = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  // Modal: null | { mode: "create"|"edit", profile?: {} }
  const [modal, setModal]   = useState(null);
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState("");

  const load = async () => {
    setPageError("");
    try {
      const res = await api.get("/accounts/profiles/");
      setProfiles(res.data);
    } catch {
      setPageError("Could not load profiles. Please try again.");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // Opened from the profile menu's "Add account" → jump straight to the form.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("add") === "1") {
      setFormErr("");
      setModal({ mode: "create" });
    }
  }, []);

  const openCreate = () => { setFormErr(""); setModal({ mode: "create" }); };
  const openEdit   = p  => { setFormErr(""); setModal({ mode: "edit", profile: p }); };
  const closeModal = () => { setModal(null); };

  const handleSave = async (form) => {
    setFormErr("");
    if (!form.display_name.trim()) { setFormErr("Display name is required."); return; }
    if (form.pin && !/^\d{4,6}$/.test(form.pin)) {
      setFormErr("PIN must be 4–6 digits."); return;
    }
    setSaving(true);
    try {
      const payload = new FormData();
      if (modal.mode === "create") {
        payload.append("display_name", form.display_name.trim());
        payload.append("relationship", form.relationship);
        if (form.pin)         payload.append("pin", form.pin);
        if (form.avatar_emoji) payload.append("avatar_emoji", form.avatar_emoji);
        await api.post("/accounts/profiles/", payload);
      } else {
        payload.append("display_name", form.display_name.trim());
        if (form.pin !== undefined) payload.append("pin", form.pin);
        if (form.avatar_emoji !== undefined) payload.append("avatar_emoji", form.avatar_emoji);
        await api.patch(`/accounts/profiles/${modal.profile.id}/`, payload);
      }
      await load();
      await bootstrap();
      closeModal();
    } catch (err) {
      const d = err?.response?.data;
      setFormErr(
        typeof d === "string" ? d :
        Object.values(d || {}).flat().join(" ") ||
        "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`Remove "${p.display_name}"? This cannot be undone.`)) return;
    setPageError("");
    try {
      await api.delete(`/accounts/profiles/${p.id}/`);
      await load();
      await bootstrap();
    } catch (err) {
      const d = err?.response?.data;
      setPageError(typeof d?.detail === "string" ? d.detail : "Could not remove profile.");
    }
  };

  return (
    <div className="mp-page">
      <div className="mp-header">
        <BackButton isTeacherContext={isTeacherContext} isLearnerContext={isLearnerContext} />
        <h1>Manage profiles</h1>
      </div>

      {pageError && <p className="mp-error">{pageError}</p>}

      {pageLoading ? (
        <div className="mp-spinner" />
      ) : (
        <div className="mp-list">
          {profiles.map(p => (
            <div key={p.id} className="mp-row">
              <Avatar p={p} />
              <div className="mp-info">
                <span className="mp-name">{p.display_name}</span>
                <span className="mp-tag">
                  {p.relationship === "SELF" ? "You" : "Child / Dependent"}
                  {p.is_default  ? " · Default" : ""}
                  {p.requires_pin ? " · 🔒 PIN" : ""}
                </span>
              </div>
              <div className="mp-actions">
                <button className="mp-btn mp-btn--edit" onClick={() => openEdit(p)}>Edit</button>
                {profiles.length > 1 && (
                  <button className="mp-btn mp-btn--del" onClick={() => handleDelete(p)}>
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          {profiles.length < 5 && (
            <button className="mp-add" onClick={openCreate}>+ Add profile</button>
          )}
        </div>
      )}

      {modal && (
        <div className="mp-overlay" onClick={closeModal}>
          <ProfileForm
            initial={
              modal.mode === "edit"
                ? { display_name: modal.profile.display_name,
                    relationship: modal.profile.relationship,
                    pin: "", avatar_emoji: modal.profile.avatar_type === "emoji"
                      ? modal.profile.avatar : "" }
                : undefined
            }
            isCreate={modal.mode === "create"}
            onSave={handleSave}
            onCancel={closeModal}
            saving={saving}
            error={formErr}
          />
        </div>
      )}
    </div>
  );
}
