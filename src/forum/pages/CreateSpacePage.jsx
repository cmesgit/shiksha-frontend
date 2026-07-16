import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTopics, createSpace } from "../../api/forum";
import { useForum } from "../ForumContext";

export default function CreateSpacePage() {
  const navigate = useNavigate();
  const { showToast, refreshMe } = useForum();
  const [form, setForm] = useState({ name: "", description: "", topic: "" });
  const [topics, setTopics] = useState([]);
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => { getTopics().then((d) => setTopics(d.topics || [])).catch(() => {}); }, []);

  const submit = async () => {
    if (!form.name.trim()) { showToast("Please enter a Space name"); return; }
    setBusy(true);
    try {
      const sp = await createSpace(form);
      showToast("Space created — you're now following it");
      refreshMe && refreshMe();
      navigate(`/forum/space/${sp.slug}`);
    } catch (e) { showToast(e?.response?.data?.reason || "Could not create Space"); }
    finally { setBusy(false); }
  };

  return (
    <div>
      <h1 className="fm-h1">Create a Space</h1>
      <p className="fm-sub">Start a community around a topic you care about.</p>
      <div className="fm-card">
        <label className="fm-label">Space name</label>
        <input className="fm-input" value={form.name} onChange={set("name")} placeholder="e.g. JEE & Engineering Aspirants" />
        <label className="fm-label">Description</label>
        <textarea className="fm-textarea" rows={3} value={form.description} onChange={set("description")} placeholder="What is this Space about?" />
        <label className="fm-label">Topic</label>
        <select className="fm-input" value={form.topic} onChange={set("topic")}>
          <option value="">Choose a topic</option>
          {topics.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <div className="fm-modal-foot" style={{ marginTop: 16 }}>
          <button className="fm-btn ghost sm" onClick={() => navigate(-1)}>Cancel</button>
          <button className="fm-btn" disabled={busy} onClick={submit}>{busy ? "Creating…" : "Create Space"}</button>
        </div>
      </div>
    </div>
  );
}
