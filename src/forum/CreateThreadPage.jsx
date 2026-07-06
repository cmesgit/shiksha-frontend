// PLACEMENT: src/forum/CreateThreadPage.jsx   (REPLACE THE WHOLE FILE — landing/frontend app)
//
// Create view from the approved design: title · body · category chips
// (real tags) + custom tag entry (max 5) · live pre-post checklist ·
// moderation errors surfaced in the design's banner style.
//   POST /forum/threads/create/  { title, body, tags }
//   → 400 { category, reason } when the shared moderation gate blocks.

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createThread, getTags } from "../api/forum";
import { useAuth } from "../contexts/AuthContext";
import ForumShell from "./ForumShell";
import { titleCase } from "./utils";

const MAX_TAGS = 5;

export default function CreateThreadPage() {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [known, setKnown] = useState([]);
  const [custom, setCustom] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { state: { from: "/forum/create" } });
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    getTags().then(setKnown).catch(() => {});
  }, []);

  const toggleTag = (name) => {
    const clean = name.toLowerCase().trim();
    if (!clean) return;
    setTags((prev) =>
      prev.includes(clean)
        ? prev.filter((t) => t !== clean)
        : prev.length < MAX_TAGS ? [...prev, clean] : prev
    );
  };

  const addCustom = () => {
    toggleTag(custom);
    setCustom("");
  };

  const checks = useMemo(() => ([
    { ok: title.trim().length > 0, label: "Title added (required)" },
    { ok: body.trim().length >= 30, label: `Content ≥ 30 characters (${body.trim().length}/30)` },
    { ok: tags.length <= MAX_TAGS, label: `${tags.length} / ${MAX_TAGS} tags · within limit` },
  ]), [title, body, tags]);

  const canPost = title.trim().length > 0 && !posting;

  const submit = async () => {
    if (!canPost) return;
    setPosting(true);
    setError("");
    try {
      const created = await createThread({ title: title.trim(), body: body.trim(), tags });
      navigate(`/forum/${created.id}`);
    } catch (e) {
      const d = e?.response?.data;
      setError(
        d?.reason
          ? `Your thread was blocked by moderation (${d.category || "policy"}): ${d.reason}`
          : d?.title?.[0] || "Couldn't create the thread. Check the fields and try again."
      );
      setPosting(false);
    }
  };

  return (
    <ForumShell crumb=" / Create">
      <div className="sfr-view" style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="sfr-h2row">
          <h2 className="sfr-h2" style={{ fontSize: 20 }}>Start a new thread</h2>
        </div>

        <div className="sfr-panel">
          {error && <div className="sfr-errbanner">{error}</div>}

          <label className="sfr-label" htmlFor="sfr-ct-title">Title</label>
          <input
            id="sfr-ct-title"
            className="sfr-input"
            placeholder="One clear, specific question — e.g. “How do I convert CGPA to percentage for DU?”"
            maxLength={300}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="sfr-label" style={{ marginTop: 18 }} htmlFor="sfr-ct-body">Details</label>
          <textarea
            id="sfr-ct-body"
            className="sfr-textarea"
            placeholder="What have you tried? What exactly are you stuck on? Context gets better answers."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <label className="sfr-label" style={{ marginTop: 18 }}>
            Category tags <span style={{ fontWeight: 500, color: "rgba(14,28,15,.5)" }}>(up to {MAX_TAGS})</span>
          </label>
          <div className="sfr-chips" style={{ marginBottom: 10 }}>
            {known.map((t) => (
              <button
                key={t.id}
                className={`sfr-chip${tags.includes(t.name.toLowerCase()) ? " active" : ""}`}
                onClick={() => toggleTag(t.name)}
              >
                {titleCase(t.name)}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              className="sfr-input"
              style={{ height: 40, flex: 1 }}
              placeholder="Add your own tag…"
              value={custom}
              maxLength={50}
              onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustom(); } }}
            />
            <button className="sfr-actionbtn" onClick={addCustom} disabled={!custom.trim() || tags.length >= MAX_TAGS}>
              Add tag
            </button>
          </div>
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: 7, marginTop: 10, flexWrap: "wrap" }}>
              {tags.map((t) => (
                <button key={t} className="sfr-tagpill sfr-reset" onClick={() => toggleTag(t)} title="Remove tag">
                  #{t} ✕
                </button>
              ))}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 6, margin: "20px 0 4px", paddingTop: 16, borderTop: "1px solid rgba(9,62,5,.1)" }}>
            {checks.map((c) => (
              <div key={c.label} className={`sfr-check${c.ok ? " ok" : ""}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  {c.ok ? <path d="m20 6-11 11-5-5" /> : <circle cx="12" cy="12" r="8" />}
                </svg>
                {c.label}
              </div>
            ))}
            <div className="sfr-check">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01" /><circle cx="12" cy="12" r="9" /></svg>
              Posts pass the same moderation gate as chat — spam and abuse are rejected automatically.
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 9, marginTop: 16 }}>
            <button className="sfr-actionbtn" onClick={() => navigate("/forum")}>Cancel</button>
            <button className="sfr-btn-primary" onClick={submit} disabled={!canPost}>
              {posting ? "Publishing…" : "Publish thread"}
            </button>
          </div>
        </div>
      </div>
    </ForumShell>
  );
}
