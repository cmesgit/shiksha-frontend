import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getTopics, getSpaces, createThread } from "../../api/forum";
import { useForum } from "../ForumContext";
import { IcImage, IcPaperclip } from "../components/icons";

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
  const onPickFiles = (e, kind) => {
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
      showToast(e?.response?.data?.reason || "Could not publish");
    } finally { setBusy(false); }
  };

  return (
    <div>
      <h1 className="fm-h1">{mode === "post" ? "Create a post" : "Ask a question"}</h1>
      <p className="fm-sub">Share it with the ShikshaCom community.</p>

      <div className="fm-tabs" style={{ maxWidth: 320 }}>
        <button className={`fm-tab${mode === "question" ? " active" : ""}`} onClick={() => setMode("question")}>Question</button>
        <button className={`fm-tab${mode === "post" ? " active" : ""}`} onClick={() => setMode("post")}>Post</button>
      </div>

      <div className="fm-card">
        <label className="fm-label">{mode === "post" ? "What do you want to share?" : "Your question"}</label>
        <input className="fm-input" value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder={mode === "post" ? "Share an update, resource or experience…" : 'Start with "What", "How", "Why"…'} />

        <label className="fm-label">Details {mode === "question" ? "(optional)" : ""}</label>
        <textarea className="fm-textarea" rows={5} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Add context, what you've tried, and what you're looking for." />

        {mode === "question" ? (
          <>
            <label className="fm-label">Category</label>
            <div className="fm-topics">
              {topics.map((t) => (
                <button key={t} className={`fm-chip${category === t ? " on" : ""}`} onClick={() => setCategory(category === t ? "" : t)}>{t}</button>
              ))}
            </div>
          </>
        ) : null}

        <label className="fm-label">Tags</label>
        <input className="fm-input" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={tagKey} placeholder="Type a tag and press Enter" />
        {tags.length ? (
          <div style={{ marginTop: 8 }}>
            {tags.map((t) => (
              <span key={t} className="fm-attach-chip">#{t}<button onClick={() => setTags(tags.filter((x) => x !== t))}>✕</button></span>
            ))}
          </div>
        ) : null}

        {spaces.length ? (
          <>
            <label className="fm-label">Post to a Space (optional)</label>
            <select className="fm-input" value={spaceSlug} onChange={(e) => setSpaceSlug(e.target.value)}>
              <option value="">No Space</option>
              {spaces.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
            </select>
          </>
        ) : null}

        <label className="fm-label">Attachments</label>
        <div className="fm-row" style={{ gap: 8 }}>
          <button className="fm-btn ghost sm" onClick={() => imgRef.current?.click()}><IcImage size={14} /> Image</button>
          <button className="fm-btn ghost sm" onClick={() => fileRef.current?.click()}><IcPaperclip size={14} /> File</button>
          <input ref={imgRef} type="file" accept="image/*" multiple hidden onChange={(e) => onPickFiles(e, "image")} />
          <input ref={fileRef} type="file" multiple hidden onChange={(e) => onPickFiles(e, "file")} />
        </div>
        {files.length ? (
          <div style={{ marginTop: 8 }}>
            {files.map((f, i) => (
              <span key={i} className="fm-attach-chip">{f.name}<button onClick={() => setFiles(files.filter((_, idx) => idx !== i))}>✕</button></span>
            ))}
          </div>
        ) : null}

        <div className="fm-modal-foot" style={{ marginTop: 16 }}>
          <button className="fm-btn ghost sm" onClick={() => navigate(-1)}>Cancel</button>
          <button className="fm-btn" disabled={busy} onClick={submit}>{busy ? "Publishing…" : mode === "post" ? "Post" : "Publish"}</button>
        </div>
      </div>
    </div>
  );
}
