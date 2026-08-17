import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getTopics, getSpaces, createThread } from "../../api/forum";
import { useForum } from "../ForumContext";
import { IcImage, IcPaperclip } from "../components/icons";

/* Ask / Post form — matches doc §2.5: Question/Post mode toggle, adaptive
   title, detail, category chips (required for questions), free-text tags,
   optional Space, Preview toggle. Styled with the fm2 system. */
export default function AskPage() {
  const navigate = useNavigate();
  const { showToast } = useForum();
  const [params] = useSearchParams();
  const [mode, setMode] = useState(params.get("mode") === "post" ? "post" : "question");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState(params.get("topic") || "");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [spaceSlug, setSpaceSlug] = useState(params.get("space") || "");
  const [files, setFiles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    getTopics().then((d) => setTopics(d.topics || [])).catch(() => {});
    getSpaces().then((d) => setSpaces(d.results || [])).catch(() => {});
  }, []);

  const addTag = (t) => {
    const clean = (t || "").trim().replace(/^#/, "");
    if (clean && !tags.includes(clean)) setTags([...tags, clean]);
    setTagInput("");
  };
  const tagKey = (e) => { if (e.key === "Enter") { e.preventDefault(); addTag(tagInput); } };
  const onPickFiles = (e) => {
    const picked = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...picked].slice(0, 10));
    e.target.value = "";
  };

  const submit = async () => {
    const t = title.trim();
    if (!t) { showToast(mode === "post" ? "Write something to post first" : "Please type your question first"); return; }
    if (mode === "question" && !category) { showToast("Please choose a category for your question"); return; }
    setBusy(true);
    const finalTags = mode === "question" ? [category, ...tags.filter((x) => x !== category)] : tags;
    try {
      const post = await createThread({
        title: t, body: desc.trim(), kind: mode,
        space: spaceSlug || "", tags: finalTags.filter(Boolean), files,
      });
      showToast(mode === "post" ? "Your post is live" : "Your question was posted");
      navigate(`/forum/thread/${post.id}`);
    } catch (e) {
      showToast(e?.response?.data?.reason || e?.response?.data?.detail || "Could not publish");
    } finally { setBusy(false); }
  };

  const suggested = topics.filter((t) => !tags.includes(t) && t !== category).slice(0, 8);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
      <button onClick={() => navigate(-1)} className="fm2-btn-ghost" style={{ alignSelf: "flex-start", padding: "6px 10px" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        Back
      </button>

      <div className="fm2-card" style={{ padding: "22px 24px" }}>
        <h1 style={{ font: "800 20px Montserrat,sans-serif", color: "#18261a", margin: "0 0 4px" }}>
          {mode === "post" ? "Create a post" : "Ask a question"}
        </h1>
        <p style={{ font: "400 12.5px Poppins,sans-serif", color: "#8a9e82", margin: "0 0 16px" }}>Share it with the ShikshaCom community.</p>

        {/* Mode toggle */}
        <div className="fm2-tabs" style={{ maxWidth: 280, marginBottom: 16 }}>
          {["question", "post"].map((m) => (
            <button key={m} onClick={() => setMode(m)} style={{ flex: 1, background: mode === m ? "#125027" : "none", color: mode === m ? "#fff" : "#5a6e55", border: "none", borderRadius: 9, padding: 9, font: "700 13px Poppins,sans-serif", cursor: "pointer", textTransform: "capitalize" }}>{m}</button>
          ))}
        </div>

        {preview ? (
          <div style={{ border: "1px solid #e4edd8", borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
              {(mode === "question" && category ? [category, ...tags] : tags).map((t) => <span key={t} className="fm2-tag">#{t}</span>)}
            </div>
            <h2 style={{ font: "800 18px Montserrat,sans-serif", color: "#18261a", margin: "0 0 8px" }}>{title || "Your title preview…"}</h2>
            <p style={{ font: "400 14px/1.7 Poppins,sans-serif", color: "#4a5e3a", margin: 0, whiteSpace: "pre-line" }}>{desc || "Your details preview…"}</p>
          </div>
        ) : (
          <>
            <label className="fm2-label">{mode === "post" ? "What do you want to share?" : "Your question"}</label>
            <input className="fm2-input" value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder={mode === "post" ? "Share an update, resource or experience…" : 'Start with "What", "How", "Why"…'}
              data-tour="ask.title" />

            <label className="fm2-label">Details {mode === "question" ? "(optional)" : ""}</label>
            <textarea className="fm2-textarea" rows={5} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Add context, what you've tried, and what you're looking for." />

            {mode === "question" && (
              <>
                <label className="fm2-label">Category <span style={{ color: "#c0392b" }}>*</span></label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {topics.map((t) => (
                    <button key={t} onClick={() => setCategory(category === t ? "" : t)} className={`fm2-chip${category === t ? " on" : ""}`}>{t}</button>
                  ))}
                </div>
              </>
            )}

            <label className="fm2-label">Tags</label>
            <input className="fm2-input" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={tagKey} placeholder="Type a tag and press Enter" data-tour="ask.tags" />
            {tags.length ? (
              <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
                {tags.map((t) => (
                  <span key={t} className="fm2-tag">#{t}<button onClick={() => setTags(tags.filter((x) => x !== t))} style={{ background: "none", border: "none", cursor: "pointer", marginLeft: 4, color: "#8a9e82" }}>✕</button></span>
                ))}
              </div>
            ) : null}
            {suggested.length ? (
              <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                <span style={{ font: "500 11px Poppins,sans-serif", color: "#8a9e82" }}>Suggested:</span>
                {suggested.map((t) => <button key={t} onClick={() => addTag(t)} className="fm2-chip">{t}</button>)}
              </div>
            ) : null}

            {spaces.length ? (
              <>
                <label className="fm2-label">Post to a Space (optional)</label>
                <select className="fm2-input" value={spaceSlug} onChange={(e) => setSpaceSlug(e.target.value)} data-tour="ask.space">
                  <option value="">No Space</option>
                  {spaces.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
                </select>
              </>
            ) : null}

            <label className="fm2-label">Attachments</label>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="fm2-btn-outline" style={{ padding: "7px 14px" }} onClick={() => imgRef.current?.click()}><IcImage size={14} /> Image</button>
              <button className="fm2-btn-outline" style={{ padding: "7px 14px" }} onClick={() => fileRef.current?.click()}><IcPaperclip size={14} /> File</button>
              <input ref={imgRef} type="file" accept="image/*" multiple hidden onChange={onPickFiles} />
              <input ref={fileRef} type="file" multiple hidden onChange={onPickFiles} />
            </div>
            {files.length ? (
              <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
                {files.map((f, i) => (
                  <span key={i} className="fm2-tag">{f.name}<button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} style={{ background: "none", border: "none", cursor: "pointer", marginLeft: 4, color: "#8a9e82" }}>✕</button></span>
                ))}
              </div>
            ) : null}
          </>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 18 }}>
          <button className="fm2-btn-ghost" onClick={() => setPreview((p) => !p)} style={{ padding: "8px 14px" }}>
            {preview ? "Edit" : "Preview"}
          </button>
          <div style={{ flex: 1 }} />
          <button className="fm2-btn-ghost" onClick={() => navigate(-1)} style={{ padding: "8px 14px" }}>Cancel</button>
          <button className="fm2-btn-green" disabled={busy} onClick={submit} style={{ padding: "9px 20px" }}>
            {busy ? "Publishing…" : mode === "post" ? "Post" : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
