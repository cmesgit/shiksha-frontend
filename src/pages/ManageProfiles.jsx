import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { APP_DASHBOARD_URL, TEACHER_DASHBOARD_URL } from "../config/urls";
import "./ManageProfiles.css";

/* ─── Avatar ────────────────────────────────────────────────────────────── */
const EMOJIS = ["🧑","👦","👧","🧒","👨","👩","🎓","📚","⭐","🌟"];

/* LearnerProfile academic options — mirror accounts.models.LearnerProfile. */
const CLASS_OPTS   = [["", "—"], ["8", "Class 8"], ["9", "Class 9"], ["10", "Class 10"], ["11", "Class 11"], ["12", "Class 12"]];
const STREAM_OPTS  = [["", "—"], ["science", "Science"], ["commerce", "Commerce"], ["arts", "Arts"]];
const BOARD_OPTS   = [["", "—"], ["cbse", "CBSE"], ["icse", "ICSE"], ["mbse", "Mizoram Board (MBSE)"], ["nios", "NIOS"], ["other", "Other State Board"]];
const STUDYING_OPTS = [["", "—"], ["yes", "Yes"], ["no", "No"]];
const HIGHED_OPTS  = [["", "—"], ["below_8", "Below Class 8"], ["8", "Class 8"], ["9", "Class 9"], ["10", "Class 10"], ["11", "Class 11"], ["12", "Class 12"]];

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
const BLANK = {
  display_name: "", relationship: "DEPENDENT", avatar_emoji: "",
  first_name: "", last_name: "", phone: "", gender: "", date_of_birth: "",
  state: "", district: "", city_town: "", pin_code: "",
  currently_studying: "", current_class: "", stream: "", board: "",
  board_other: "", school_name: "", academic_year: "",
  highest_education: "", reason_not_studying: "",
  father_name: "", father_phone: "", mother_name: "", mother_phone: "",
  guardian_name: "", guardian_phone: "", parent_guardian_email: "",
};

function Field({ label, children }) {
  return <label className="mp-field"><span>{label}</span>{children}</label>;
}
function Sel({ value, onChange, opts }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  );
}

function ProfileForm({ initial, isCreate, onSave, onCancel, saving, error }) {
  const [form, setForm] = useState({ ...BLANK, ...(initial || {}) });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="mp-modal" onClick={e => e.stopPropagation()}>
      <h2>{isCreate ? "New profile" : "Edit profile"}</h2>

      {error && <p className="mp-error">{error}</p>}

      <Field label="Display name *">
        <input value={form.display_name}
          onChange={e => set("display_name", e.target.value)}
          placeholder="e.g. Rami or Child 1" autoFocus />
      </Field>

      {isCreate && (
        <Field label="Relationship">
          <select value={form.relationship} onChange={e => set("relationship", e.target.value)}>
            <option value="DEPENDENT">Child / Dependent</option>
            <option value="SELF">Myself (account holder)</option>
          </select>
        </Field>
      )}

      <Field label="Avatar emoji (optional)">
        <div className="mp-emojis">
          {EMOJIS.map(em => (
            <button key={em} type="button"
              className={`mp-emoji ${form.avatar_emoji === em ? "mp-emoji--sel" : ""}`}
              onClick={() => set("avatar_emoji", form.avatar_emoji === em ? "" : em)}>
              {em}
            </button>
          ))}
        </div>
      </Field>

      {!isCreate && (
        <>
          <div className="mp-sec">Personal details</div>
          <div className="mp-grid">
            <Field label="First name"><input value={form.first_name} onChange={e => set("first_name", e.target.value)} /></Field>
            <Field label="Last name"><input value={form.last_name} onChange={e => set("last_name", e.target.value)} /></Field>
            <Field label="Phone"><input value={form.phone} onChange={e => set("phone", e.target.value)} /></Field>
            <Field label="Date of birth"><input type="date" value={form.date_of_birth || ""} onChange={e => set("date_of_birth", e.target.value)} /></Field>
          </div>
          <Field label="Gender">
            <Sel value={form.gender} onChange={v => set("gender", v)}
              opts={[["", "Prefer not to specify"], ["male", "Male"], ["female", "Female"], ["other", "Other"], ["prefer_not_to_say", "Prefer not to say"]]} />
          </Field>
          <div className="mp-grid">
            <Field label="State"><input value={form.state} onChange={e => set("state", e.target.value)} /></Field>
            <Field label="District"><input value={form.district} onChange={e => set("district", e.target.value)} /></Field>
            <Field label="City / town"><input value={form.city_town} onChange={e => set("city_town", e.target.value)} /></Field>
            <Field label="Pincode"><input value={form.pin_code} onChange={e => set("pin_code", e.target.value)} /></Field>
          </div>

          <div className="mp-sec">Academic details</div>
          <div className="mp-grid">
            <Field label="Currently studying?"><Sel value={form.currently_studying} onChange={v => set("currently_studying", v)} opts={STUDYING_OPTS} /></Field>
            <Field label="Class"><Sel value={form.current_class} onChange={v => set("current_class", v)} opts={CLASS_OPTS} /></Field>
            <Field label="Stream"><Sel value={form.stream} onChange={v => set("stream", v)} opts={STREAM_OPTS} /></Field>
            <Field label="Board"><Sel value={form.board} onChange={v => set("board", v)} opts={BOARD_OPTS} /></Field>
          </div>
          {form.board === "other" && (
            <Field label="Board name (other)"><input value={form.board_other} onChange={e => set("board_other", e.target.value)} /></Field>
          )}
          <div className="mp-grid">
            <Field label="School / institution"><input value={form.school_name} onChange={e => set("school_name", e.target.value)} /></Field>
            <Field label="Academic year"><input value={form.academic_year} onChange={e => set("academic_year", e.target.value)} placeholder="e.g. 2025–26" /></Field>
          </div>
          {form.currently_studying === "no" && (
            <>
              <Field label="Highest education"><Sel value={form.highest_education} onChange={v => set("highest_education", v)} opts={HIGHED_OPTS} /></Field>
              <Field label="Reason for not studying"><input value={form.reason_not_studying} onChange={e => set("reason_not_studying", e.target.value)} /></Field>
            </>
          )}

          <div className="mp-sec">Parent / guardian</div>
          <div className="mp-grid">
            <Field label="Father's name"><input value={form.father_name} onChange={e => set("father_name", e.target.value)} /></Field>
            <Field label="Father's phone"><input value={form.father_phone} onChange={e => set("father_phone", e.target.value)} /></Field>
            <Field label="Mother's name"><input value={form.mother_name} onChange={e => set("mother_name", e.target.value)} /></Field>
            <Field label="Mother's phone"><input value={form.mother_phone} onChange={e => set("mother_phone", e.target.value)} /></Field>
            <Field label="Guardian's name"><input value={form.guardian_name} onChange={e => set("guardian_name", e.target.value)} /></Field>
            <Field label="Guardian's phone"><input value={form.guardian_phone} onChange={e => set("guardian_phone", e.target.value)} /></Field>
          </div>
          <Field label="Parent / guardian email">
            <input type="email" value={form.parent_guardian_email} onChange={e => set("parent_guardian_email", e.target.value)} />
          </Field>
        </>
      )}

      {isCreate && (
        <Field label="PIN (optional, 4–6 digits)">
          <input inputMode="numeric" maxLength={6} value={form.pin || ""}
            onChange={e => set("pin", e.target.value.replace(/\D/g, ""))}
            placeholder="Leave blank for no PIN" style={{ letterSpacing: "0.25em" }} />
        </Field>
      )}

      <div className="mp-modal-footer">
        <button className="mp-btn" onClick={onCancel} disabled={saving}>Cancel</button>
        <button className="mp-btn mp-btn--primary" onClick={() => onSave(form)} disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
      {!isCreate && (
        <p className="mp-hint">To change this profile's PIN, use the PIN button on the profile row (your account password is required).</p>
      )}
    </div>
  );
}

/* ─── PIN modal (set / change / reset / remove — account password required) ─ */
function PinModal({ profile, onSave, onCancel, saving, error }) {
  const [mode, setMode] = useState(profile.requires_pin ? "change" : "set"); // set|change|remove
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="mp-modal" onClick={e => e.stopPropagation()}>
      <h2>{profile.requires_pin ? "Change / reset PIN" : "Set PIN"}</h2>
      <p className="mp-hint">{profile.display_name}</p>
      {error && <p className="mp-error">{error}</p>}

      {profile.requires_pin && (
        <div className="mp-emojis" style={{ marginBottom: 10 }}>
          <button type="button" className={`mp-btn ${mode !== "remove" ? "mp-btn--primary" : ""}`}
            onClick={() => setMode("change")}>Change / reset</button>
          <button type="button" className={`mp-btn ${mode === "remove" ? "mp-btn--del" : ""}`}
            onClick={() => setMode("remove")}>Remove PIN</button>
        </div>
      )}

      {mode !== "remove" && (
        <Field label="New PIN (4–6 digits)">
          <input inputMode="numeric" maxLength={6} value={pin}
            onChange={e => setPin(e.target.value.replace(/\D/g, ""))}
            style={{ letterSpacing: "0.25em" }} autoFocus />
        </Field>
      )}
      <Field label="Account password">
        <input type="password" autoComplete="current-password" value={password}
          onChange={e => setPassword(e.target.value)} />
      </Field>
      {mode !== "remove" && (
        <p className="mp-hint">Forgot the current PIN? You don't need it — your account password resets it.</p>
      )}

      <div className="mp-modal-footer">
        <button className="mp-btn" onClick={onCancel} disabled={saving}>Cancel</button>
        <button className={`mp-btn ${mode === "remove" ? "mp-btn--del" : "mp-btn--primary"}`}
          onClick={() => onSave({ pin: mode === "remove" ? "" : pin, password })} disabled={saving}>
          {saving ? "Saving…" : mode === "remove" ? "Remove PIN" : "Save PIN"}
        </button>
      </div>
    </div>
  );
}

/* ─── Delete modal (account password required) ──────────────────────────── */
function DeleteModal({ profile, onConfirm, onCancel, saving, error }) {
  const [password, setPassword] = useState("");
  return (
    <div className="mp-modal" onClick={e => e.stopPropagation()}>
      <h2>Remove profile</h2>
      <p className="mp-hint">Removing “{profile.display_name}” can’t be undone. Enter your account password to confirm.</p>
      {error && <p className="mp-error">{error}</p>}
      <Field label="Account password">
        <input type="password" autoComplete="current-password" value={password}
          onChange={e => setPassword(e.target.value)} autoFocus />
      </Field>
      <div className="mp-modal-footer">
        <button className="mp-btn" onClick={onCancel} disabled={saving}>Cancel</button>
        <button className="mp-btn mp-btn--del" onClick={() => onConfirm(password)} disabled={saving}>
          {saving ? "Removing…" : "Remove profile"}
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

  // Modal: null | { mode: "create"|"edit"|"pin"|"delete", profile?: {} }
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
  const openEdit   = async (p) => {
    setFormErr("");
    // Fetch the full detail (the list is lean — no academic/guardian fields).
    let full = p;
    try { const res = await api.get(`/accounts/profiles/${p.id}/`); full = { ...p, ...res.data }; } catch { /* keep lean */ }
    setModal({ mode: "edit", profile: full });
  };
  const openPin    = p => { setFormErr(""); setModal({ mode: "pin", profile: p }); };
  const openDelete = p => { setFormErr(""); setModal({ mode: "delete", profile: p }); };
  const closeModal = () => { setModal(null); };

  const handleSave = async (form) => {
    setFormErr("");
    if (!form.display_name.trim()) { setFormErr("Display name is required."); return; }
    if (modal.mode === "create" && form.pin && !/^\d{4,6}$/.test(form.pin)) {
      setFormErr("PIN must be 4–6 digits."); return;
    }
    setSaving(true);
    try {
      const payload = new FormData();
      if (modal.mode === "create") {
        payload.append("display_name", form.display_name.trim());
        payload.append("relationship", form.relationship);
        if (form.pin)          payload.append("pin", form.pin);
        if (form.avatar_emoji) payload.append("avatar_emoji", form.avatar_emoji);
        await api.post("/accounts/profiles/", payload);
      } else {
        // NOTE: PIN is intentionally NOT sent here — it needs the account
        // password and goes through the PIN modal / pin endpoint.
        const FIELDS = [
          "display_name", "avatar_emoji",
          "first_name", "last_name", "phone", "gender", "date_of_birth",
          "state", "district", "city_town", "pin_code",
          "currently_studying", "current_class", "stream", "board", "board_other",
          "school_name", "academic_year", "highest_education", "reason_not_studying",
          "father_name", "father_phone", "mother_name", "mother_phone",
          "guardian_name", "guardian_phone", "parent_guardian_email",
        ];
        FIELDS.forEach(k => payload.append(k, k === "display_name" ? form[k].trim() : (form[k] || "")));
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

  const handleSavePin = async ({ pin, password }) => {
    setFormErr("");
    if (pin && !/^\d{4,6}$/.test(pin)) { setFormErr("PIN must be 4–6 digits."); return; }
    if (!password) { setFormErr("Enter your account password."); return; }
    setSaving(true);
    try {
      await api.post("/accounts/profiles/pin/", { profile_id: modal.profile.id, pin, password });
      await load();
      await bootstrap();
      closeModal();
    } catch (err) {
      const d = err?.response?.data;
      setFormErr(d?.password || d?.pin || (typeof d === "string" ? d : "Could not update PIN."));
    } finally { setSaving(false); }
  };

  const handleDelete = async (password) => {
    setFormErr("");
    if (!password) { setFormErr("Enter your account password."); return; }
    setSaving(true);
    try {
      await api.delete(`/accounts/profiles/${modal.profile.id}/`, { data: { password } });
      await load();
      await bootstrap();
      closeModal();
    } catch (err) {
      const d = err?.response?.data;
      setFormErr(d?.password || d?.detail || (typeof d === "string" ? d : "Could not remove profile."));
    } finally { setSaving(false); }
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
                <button className="mp-btn" onClick={() => openPin(p)}>
                  {p.requires_pin ? "PIN" : "Set PIN"}
                </button>
                {profiles.length > 1 && !p.is_default && (
                  <button className="mp-btn mp-btn--del" onClick={() => openDelete(p)}>
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
          {(modal.mode === "create" || modal.mode === "edit") && (
            <ProfileForm
              initial={modal.mode === "edit" ? {
                ...modal.profile,
                avatar_emoji: modal.profile.avatar_type === "emoji" ? modal.profile.avatar : "",
              } : undefined}
              isCreate={modal.mode === "create"}
              onSave={handleSave}
              onCancel={closeModal}
              saving={saving}
              error={formErr}
            />
          )}
          {modal.mode === "pin" && (
            <PinModal profile={modal.profile} onSave={handleSavePin}
              onCancel={closeModal} saving={saving} error={formErr} />
          )}
          {modal.mode === "delete" && (
            <DeleteModal profile={modal.profile} onConfirm={handleDelete}
              onCancel={closeModal} saving={saving} error={formErr} />
          )}
        </div>
      )}
    </div>
  );
}
