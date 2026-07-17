// ─────────────────────────────────────────────────────────────────────────────
// src/explore/UploadPage.jsx  →  route: /explore/upload
// Two-step upload from the design: (1) pick a document type + attach a file,
// (2) fill in the details, then publish. Gated behind sign-in. In mock mode the
// document is echoed straight into "My uploads"; wire uploadDocument() to your
// real endpoint to persist.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useExplore } from "./ExploreStore";
import { getFacets, uploadDocument } from "./exploreApi";
import { Icon } from "./components/ui";
import "./Explore.css";

const humanSize = (bytes) => {
  if (!bytes) return "";
  const u = ["B", "KB", "MB"]; let i = 0; let n = bytes;
  while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
  return `${n.toFixed(n < 10 && i > 0 ? 1 : 0)} ${u[i]}`;
};
const extType = (name = "") => {
  const e = name.split(".").pop().toUpperCase();
  return ["PDF", "DOCX", "DOC", "PPT", "PPTX"].includes(e) ? (e.startsWith("PPT") ? "PPT" : e.startsWith("DOC") ? "DOCX" : "PDF") : "PDF";
};

export default function UploadPage() {
  const nav = useNavigate();
  const { isAuthenticated } = useAuth();
  const store = useExplore();
  const fileRef = useRef(null);
  const [facets, setFacets] = useState(null);
  const [step, setStep] = useState(1);
  const [docType, setDocType] = useState("");
  const [file, setFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({
    title: "", description: "", category: "", subject: "", institution: "", language: "English", tags: "",
  });

  useEffect(() => { getFacets().then(setFacets); }, []);

  if (!isAuthenticated) {
    return (
      <div className="exp"><div className="exp-wrap exp-empty" style={{ paddingTop: 90 }}>
        <h3>Sign in to upload</h3>
        <p>You need an account to share documents with the community.</p>
        <button className="exp-btn exp-btn-primary" style={{ marginTop: 16 }} onClick={() => nav("/login")}>Log in</button>
      </div></div>
    );
  }

  const onFiles = (files) => { if (files && files[0]) setFile(files[0]); };
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const publish = async () => {
    setBusy(true);
    const created = await uploadDocument({
      ...form,
      filetype: file ? extType(file.name) : "PDF",
      file,   // the actual File — appended as multipart by the real API branch
    });
    store.addMyDoc(created.id);
    setBusy(false);
    setToast("Published to your library");
    setTimeout(() => nav("/explore/library"), 900);
  };

  return (
    <div className="exp">
      <div className="exp-wrap exp-upload exp-in">
        <button className="exp-back" onClick={() => nav(-1)}><Icon.back /> Back</button>
        <p className="exp-eyebrow">Contribute</p>
        <h1 style={{ font: "800 26px Montserrat, sans-serif", color: "var(--forest)", marginBottom: 6 }}>Upload a document</h1>
        <p className="exp-sub" style={{ marginBottom: 22 }}>Share notes, papers, slides or question papers with other learners.</p>

        <div className="exp-steps">
          <div className={`exp-step${step >= 1 ? " on" : ""}`} />
          <div className={`exp-step${step >= 2 ? " on" : ""}`} />
        </div>

        {step === 1 && (
          <>
            <div className="exp-field">
              <label>What are you uploading?</label>
              <div className="exp-typegrid">
                {(facets?.uploadTypes || []).map((t) => (
                  <button key={t} className={`exp-typebtn${docType === t ? " on" : ""}`} onClick={() => setDocType(t)}>{t}</button>
                ))}
              </div>
            </div>

            <div
              className={`exp-drop${drag ? " drag" : ""}${file ? " has" : ""}`}
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); onFiles(e.dataTransfer.files); }}
            >
              <div style={{ fontSize: 30 }}>{file ? "📎" : "⬆️"}</div>
              <h3>{file ? file.name : drag ? "Drop the file to attach" : "Click to browse or drag a file here"}</h3>
              <p>{file ? `${extType(file.name)} · ${humanSize(file.size)} · click to replace` : "PDF, DOCX or PPT · up to 50 MB"}</p>
              <input ref={fileRef} type="file" hidden accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={(e) => onFiles(e.target.files)} />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <button className="exp-btn exp-btn-primary" disabled={!docType || !file}
                onClick={() => setStep(2)}>Continue</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="exp-field">
              <label>Title</label>
              <input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Thermodynamics — Solved Problems" />
            </div>
            <div className="exp-field">
              <label>Description</label>
              <textarea value={form.description} onChange={(e) => set("description", e.target.value)}
                placeholder="What's inside and who it's for." />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="exp-field">
                <label>Category</label>
                <select value={form.category} onChange={(e) => set("category", e.target.value)}>
                  <option value="">Select…</option>
                  {(facets?.categories || []).map((c) => <option key={c.key} value={c.key}>{c.name}</option>)}
                </select>
              </div>
              <div className="exp-field">
                <label>Subject</label>
                <select value={form.subject} onChange={(e) => set("subject", e.target.value)}>
                  <option value="">Select…</option>
                  {(facets?.subjects || []).map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="exp-field">
                <label>Institution</label>
                <input value={form.institution} onChange={(e) => set("institution", e.target.value)} placeholder="Your college / school" />
              </div>
              <div className="exp-field">
                <label>Language</label>
                <select value={form.language} onChange={(e) => set("language", e.target.value)}>
                  {(facets?.languages || ["English"]).map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div className="exp-field">
              <label>Tags (comma separated)</label>
              <input value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="AI, Notes, Semester 5" />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
              <button className="exp-btn exp-btn-ghost" onClick={() => setStep(1)}><Icon.back /> Back</button>
              <button className="exp-btn exp-btn-primary" disabled={!form.title || busy} onClick={publish}>
                {busy ? "Publishing…" : "Publish document"}
              </button>
            </div>
          </>
        )}
      </div>
      {toast && <div className="exp-toast">{toast}</div>}
    </div>
  );
}
