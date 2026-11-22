import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getTopics, getSpaces, createThread } from "../../api/forum";
import { useForum } from "../ForumContext";
import { IcImage, IcPaperclip } from "../components/icons";
import ScribbleIcon from "../../components/icons/ScribbleIcon";

/* Ask / Post form — matches doc §2.5: Question/Post mode toggle, adaptive
   title, detail, category chips (required for questions), free-text tags,
   optional Space, Preview toggle. Styled with the fm2 system. */
// Also rendered inside ComposeModal (asModal): then it closes through
// onClose instead of going back a page, and starts in `initialMode`.
export default function AskPage({ asModal = false, initialMode, onClose } = {}) {
  const navigate = useNavigate();
  const { showToast } = useForum();
  const [params] = useSearchParams();
  const startMode = initialMode || params.get("mode");
  const [mode, setMode] = useState(startMode === "post" ? "post" : "question");
  const close = asModal && onClose ? onClose : () => navigate(-1);
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
      // From the pop-up, replace its ?compose entry so Back from the new
      // thread returns to the forum, not to a reopened form.
      navigate(`/forum/thread/${post.id}`, asModal ? { replace: true } : undefined);
    } catch (e) {
      showToast(e?.response?.data?.reason || e?.response?.data?.detail || "Could not publish");
    } finally { setBusy(false); }
  };

  const suggested = topics.filter((t) => !tags.includes(t) && t !== category).slice(0, 8);

  const isPost = mode === "post";
  const shownTags = mode === "question" && category ? [category, ...tags] : tags;

  return (
    <div className={`fm2-cmp${asModal ? " fm2-cmp--modal" : ""}`}>
      {/* header: back, title, question/post switch */}
      <div className="fm2-cmp-top">
        <button type="button" onClick={close} className="fm2-cmp-back">
          <ScribbleIcon name="arrow-left" size={16} />
          Back
        </button>
        <div className="fm2-cmp-switch" role="tablist" aria-label="What are you creating?">
          {["question", "post"].map((m) => (
            <button key={m} type="button" role="tab" aria-selected={mode === m}
              className={mode === m ? "on" : ""} onClick={() => setMode(m)}>
              {m === "post" ? "Post" : "Question"}
            </button>
          ))}
        </div>
      </div>

      <div className="fm2-cmp-head">
        <h1>{isPost ? "Share a post" : "Ask a question"}</h1>
        <p>{isPost ? "Share an update, resource or experience with the community." : "Ask the ShikshaCom community anything."}</p>
      </div>

      {preview ? (
        <div className="fm2-cmp-preview">
          {shownTags.length > 0 && (
            <div className="fm2-cmp-tags">{shownTags.map((t) => <span key={t} className="fm2-cmp-tag">#{t}</span>)}</div>
          )}
          <h2>{title || "Your title preview…"}</h2>
          <p>{desc || "Your details preview…"}</p>
        </div>
      ) : (
        <>
          {/* writing area: two borderless fields in one soft box */}
          <div className="fm2-cmp-write">
            <input className="fm2-cmp-title" value={title} onChange={(e) => setTitle(e.target.value)}
              aria-label={isPost ? "What do you want to share?" : "Your question"}
              placeholder={isPost ? "What do you want to share?" : 'Your question, e.g. "How do I…"'}
              data-tour="ask.title" />
            <textarea className="fm2-cmp-body" rows={5} value={desc} onChange={(e) => setDesc(e.target.value)}
              aria-label="Details"
              placeholder={isPost ? "Add details (optional)" : "Add context and what you have tried (optional)"} />
            {files.length > 0 && (
              <div className="fm2-cmp-files">
                {files.map((f, i) => (
                  <span key={i} className="fm2-cmp-file">
                    {f.name}
                    <button type="button" aria-label={`Remove ${f.name}`} onClick={() => setFiles(files.filter((_, idx) => idx !== i))}>✕</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {mode === "question" && (
            <div className="fm2-cmp-row">
              <span className="fm2-cmp-label">Category <em>*</em></span>
              <div className="fm2-cmp-chips">
                {topics.map((t) => (
                  <button key={t} type="button" onClick={() => setCategory(category === t ? "" : t)}
                    className={`fm2-cmp-chip${category === t ? " on" : ""}`}>{t}</button>
                ))}
              </div>
            </div>
          )}

          <div className="fm2-cmp-row">
            <span className="fm2-cmp-label">Tags</span>
            <div className="fm2-cmp-tagbox">
              {tags.map((t) => (
                <span key={t} className="fm2-cmp-tag">
                  #{t}
                  <button type="button" aria-label={`Remove tag ${t}`} onClick={() => setTags(tags.filter((x) => x !== t))}>✕</button>
                </span>
              ))}
              <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={tagKey}
                placeholder={tags.length ? "Add another" : "Type a tag and press Enter"} aria-label="Add a tag" data-tour="ask.tags" />
            </div>
          </div>
          {suggested.length > 0 && (
            <div className="fm2-cmp-suggest">
              <span>Suggested</span>
              {suggested.map((t) => <button key={t} type="button" onClick={() => addTag(t)} className="fm2-cmp-chip">+ {t}</button>)}
            </div>
          )}

          {spaces.length > 0 && (
            <div className="fm2-cmp-row">
              <label className="fm2-cmp-label" htmlFor="fm2-cmp-space">Space</label>
              <select id="fm2-cmp-space" className="fm2-cmp-select" value={spaceSlug} onChange={(e) => setSpaceSlug(e.target.value)} data-tour="ask.space">
                <option value="">No Space</option>
                {spaces.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
              </select>
            </div>
          )}
        </>
      )}

      {/* footer: attach + preview on the left, cancel + publish on the right */}
      <div className="fm2-cmp-foot">
        {!preview && (
          <>
            <button type="button" className="fm2-cmp-icon" onClick={() => imgRef.current?.click()} aria-label="Attach an image" title="Attach an image"><IcImage size={17} /></button>
            <button type="button" className="fm2-cmp-icon" onClick={() => fileRef.current?.click()} aria-label="Attach a file" title="Attach a file"><IcPaperclip size={17} /></button>
            <input ref={imgRef} type="file" accept="image/*" multiple hidden onChange={onPickFiles} />
            <input ref={fileRef} type="file" multiple hidden onChange={onPickFiles} />
          </>
        )}
        <button type="button" className="fm2-cmp-text" onClick={() => setPreview((p) => !p)}>
          {preview ? "Edit" : "Preview"}
        </button>
        <div className="fm2-cmp-spacer" />
        <button type="button" className="fm2-cmp-text" onClick={close}>Cancel</button>
        <button type="button" className="fm2-cmp-submit" disabled={busy} onClick={submit}>
          {busy ? "Publishing…" : isPost ? "Post" : "Publish"}
        </button>
      </div>
    </div>
  );
}
