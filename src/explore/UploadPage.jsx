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
import { getOverview, verificationEnabled } from "./verificationApi";
import { getFacets, uploadDocument } from "./exploreApi";
import { Icon, humanSize } from "./components/ui";
import "./Explore.css";

// Every status the upload endpoint can actually return, in the reader's terms.
// documents/views.py: 401 unauthenticated, 403 banned/suspended (_ban_error),
// 400 from UploadDocumentSerializer.validate_file, 429 from the
// documents_upload ScopedRateThrottle.
const uploadErrorText = (e) => {
  const status = e?.response?.status;
  const data = e?.response?.data;
  const detail =
    (typeof data === "string" && data) ||
    data?.detail ||
    (Array.isArray(data?.file) && data.file[0]) ||
    (Array.isArray(data) && data[0]) ||
    (data && typeof data === "object" &&
      Object.values(data).flat().find((v) => typeof v === "string"));
  if (status === 401) return "Your session expired. Sign in again and your details will still be here.";
  if (status === 403) return detail || "Your account can’t upload right now.";
  if (status === 429) return "Too many uploads in a short time. Wait a minute and try again.";
  if (status === 413) return "That file is too large for the server to accept.";
  if (status === 400) return detail || "Something in the form was rejected. Check the file and the required fields.";
  if (!e?.response) return "Couldn’t reach the server. Check your connection — nothing has been lost.";
  return detail || "The upload failed. Nothing has been lost; you can try again.";
};

const extType = (name = "") => {
  const e = name.split(".").pop().toUpperCase();
  return ["PDF", "DOCX", "DOC", "PPT", "PPTX"].includes(e) ? (e.startsWith("PPT") ? "PPT" : e.startsWith("DOC") ? "DOCX" : "PDF") : "PDF";
};

/* The design's §3 · TAGS. A tag is a full `field › subject › branch` path and
   a set carries SEVERAL — the spec's own example is tagged under both Civil
   Engineering and Sociology, and EITHER one qualifies a reviewer.

   ⚠ This replaced a comma-separated free-text "Tags" field. The design
   removed that deliberately: the path IS the tag system now, because it is
   also what decides who may verify the set. A free-text tag cannot do that. */
function TagPicker({ tree, tags, onAdd, onRemove }) {
  const [query, setQuery] = useState("");

  const matches = [];
  const q = query.trim().toLowerCase();
  if (q) {
    tree.forEach((f) => f.subjects.forEach((sub) => {
      if (sub.subject.toLowerCase().includes(q)) {
        matches.push({ field: f.field, subject: sub.subject, branch: "" });
      }
      sub.branches.forEach((b) => {
        if (b.branch.toLowerCase().includes(q)) {
          matches.push({ field: f.field, subject: sub.subject, branch: b.branch });
        }
      });
    }));
  }

  /* "Other branches of <Subject>" — suggested from the first tag, as the
     design does. Someone tagging a set under Water resources is more likely
     to want Transportation next than a random subject. */
  const first = tags[0];
  const siblings = first
    ? (tree.find((f) => f.field === first.field)?.subjects
        .find((sub) => sub.subject === first.subject)?.branches || [])
        .filter((b) => !tags.some((t) => t.subject === first.subject && t.branch === b.branch))
    : [];

  const exact = matches.length === 0 && q.length > 1;

  return (
    <div className="exp-tagpicker">
      {tags.length > 0 && (
        <div className="exp-tagchips">
          {tags.map((t, i) => (
            <span key={i} className="exp-tagchip">
              {t.field} › {t.subject}{t.branch ? <> › <strong>{t.branch}</strong></> : null}
              <button type="button" aria-label={`Remove ${t.subject}`}
                onClick={() => onRemove(i)}>×</button>
            </span>
          ))}
        </div>
      )}

      <input
        className="exp-taginput"
        value={query}
        maxLength={120}
        placeholder="Type a subject or branch, e.g. Hydrology"
        onChange={(e) => setQuery(e.target.value)}
      />

      {matches.length > 0 && (
        <div className="exp-tagsuggest">
          {matches.slice(0, 8).map((m, i) => (
            <button key={i} type="button" className="exp-chip-add"
              onClick={() => { onAdd(m); setQuery(""); }}>
              + {m.subject}{m.branch ? ` › ${m.branch}` : ""}
            </button>
          ))}
        </div>
      )}

      {exact && (
        <div className="exp-tagsuggest">
          {/* "If what you type isn't in the list, you can create it as a new
              branch." No approval — it appears in Browse after publishing,
              which is how subjects have always worked here. */}
          <button type="button" className="exp-chip-add"
            onClick={() => {
              onAdd(first
                ? { field: first.field, subject: first.subject, branch: query.trim() }
                : { field: "", subject: query.trim(), branch: "" });
              setQuery("");
            }}>
            + Create {first ? `“${query.trim()}” as a branch of ${first.subject}` : `“${query.trim()}” as a subject`}
          </button>
        </div>
      )}

      {siblings.length > 0 && (
        <>
          <p className="exp-filter-hint">Other branches of {first.subject}</p>
          <div className="exp-tagsuggest">
            {siblings.slice(0, 6).map((b) => (
              <button key={b.branch} type="button" className="exp-chip-add"
                onClick={() => onAdd({ field: first.field, subject: first.subject, branch: b.branch })}>
                + {b.branch}
              </button>
            ))}
          </div>
        </>
      )}

      <p className="exp-filter-hint">
        New subjects and branches appear in Browse after you publish. No
        approval is needed.
      </p>
    </div>
  );
}

export default function UploadPage() {
  const nav = useNavigate();
  const { isAuthenticated } = useAuth();
  const store = useExplore();
  const fileRef = useRef(null);
  const [facets, setFacets] = useState(null);
  const [step, setStep] = useState(1);
  const [docType, setDocType] = useState("");
  const [file, setFile] = useState(null);
  // The whole set. `file` stays as files[0] so every existing reference to it
  // (the Continue gate, the filetype, the summary) keeps working unchanged.
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState([]);
  /* The publish footnote quotes the live threshold. A hardcoded 3 keeps
     promising 3 after an admin sets it to 4. Falls back to 3 only if the
     feature is off, in which case the footnote is not shown anyway. */
  const [confirmationsNeeded, setConfirmationsNeeded] = useState(3);
  const [verifyOn, setVerifyOn] = useState(false);
  useEffect(() => {
    let live = true;
    verificationEnabled().then((on) => {
      if (!live) return;
      setVerifyOn(on);
      if (on) getOverview().then((d) => live && setConfirmationsNeeded(d.confirmations_needed)).catch(() => {});
    });
    return () => { live = false; };
  }, []);
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "", description: "", category: "", subject: "", topic: "",
    institution: "", language: "English",
  });

  useEffect(() => { getFacets().then(setFacets); }, []);

  if (!isAuthenticated) {
    return (
      <div className="exp"><div className="exp-wrap exp-empty" style={{ paddingTop: 90 }}>
        <h3>Sign in to upload</h3>
        <p>You need an account to share documents with the community.</p>
        <button className="exp-btn exp-btn-primary" style={{ marginTop: 16 }} onClick={() => nav(`/login?next=${encodeURIComponent("/explore/upload")}`)}>Log in</button>
      </div></div>
    );
  }

  // Mirrors the server: config/upload_validation.py DOCUMENT_EXTS and the
  // max_mb=50 passed by documents/serializers.py's validate_file. The dropzone
  // has always advertised "up to 50 MB" while checking nothing, and the
  // drag-and-drop path bypasses the input's `accept` entirely — so an
  // oversized or wrong-type file only failed after the upload, as a 400.
  /* design_handoff_explore_verification §7 — the widened rules.
     ⚠ These MUST stay in step with config/upload_validation.py's
     LIBRARY_EXTS / LIBRARY_MAX_MB. The server is the real boundary; this
     list exists so a member is told at pick time instead of after the whole
     upload finishes. A client list that is narrower than the server's reads
     as a broken picker; wider, as a random failure at the end. */
  /* ⚠ 50, not the design's 200 — reverted by the owner 2026-11-13. Must
     match LIBRARY_MAX_MB in config/upload_validation.py; if this is the
     larger of the two, a member uploads for a minute and is refused at the
     end, which reads as a random failure rather than as a rule. */
  const MAX_MB = 50;
  const ALLOWED_EXTS = [
    "pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx",
    "png", "jpg", "jpeg", "gif", "webp",
    "csv", "tsv", "json", "txt", "md", "rtf", "odt", "ods", "odp",
    "dwg", "dxf", "psd", "ai",
    "py", "c", "cpp", "h", "java", "js", "ts", "sql", "r", "m",
    "ipynb", "yml", "yaml",
    "mp3", "wav", "m4a", "ogg", "mp4", "mov", "webm", "mkv",
    "zip", "7z", "tar", "gz",
  ];
  const MAX_FILES = 20;

  const fileProblem = (f) => {
    const ext = (f.name.split(".").pop() || "").toLowerCase();
    if (!ALLOWED_EXTS.includes(ext)) {
      /* Naming 50 extensions in an error message helps nobody. Describe the
         families, the way the dropzone does. */
      return `“.${ext}” isn’t accepted. Use documents, slides, spreadsheets and data, images, drawings, code, audio, video or ZIP archives.`;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      return `That file is ${humanSize(f.size)}; the limit is ${MAX_MB} MB.`;
    }
    return "";
  };

  /* A set, not a file. The first entry is sent as `file` (what the server
     has always read) and the rest as repeated `files` parts, so an older
     backend still receives a usable single-file upload. */
  const onFiles = (incoming) => {
    const picked = Array.from(incoming || []);
    if (!picked.length) return;

    const rejected = [];
    const accepted = [];
    picked.forEach((f) => {
      const problem = fileProblem(f);
      if (problem) rejected.push(`${f.name}: ${problem}`);
      else if (!files.some((e) => e.name === f.name && e.size === f.size)) accepted.push(f);
    });

    const next = [...files, ...accepted].slice(0, MAX_FILES);
    if (files.length + accepted.length > MAX_FILES) {
      rejected.push(`A set can hold up to ${MAX_FILES} files.`);
    }
    setFiles(next);
    setFile(next[0] || null);
    /* Rejections are shown and DISMISSIBLE, never silent — picking ten files
       and getting eight with no explanation is worse than an error. */
    setError(rejected.join(" "));
  };

  const removeFile = (index) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    setFile(next[0] || null);
  };
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const addTag = (tag) => setTags((current) =>
    current.some((t) => t.subject === tag.subject && t.branch === tag.branch)
      ? current
      : [...current, tag]);
  const removeTag = (index) => setTags((current) => current.filter((_, i) => i !== index));

  /* The design's gate: at least one file, a title AND at least one tag.
     The tag requirement is not cosmetic — an untagged set matches no
     specialist, so it would publish into a queue nobody can ever see. */
  const canPublish = files.length > 0 && form.title.trim() && tags.length > 0 && !busy;

  const publish = async () => {
    // ⚠ This had no try/catch at all. Every reachable failure — 401, 403 for a
    // banned uploader, 400 from validate_file, 429 from the documents_upload
    // throttle — left `busy` true forever, and `disabled={!form.title || busy}`
    // then locked the only button with no message shown anywhere. The user's
    // title, description, category, subject, institution, tags and attached
    // file were all unrecoverable without reloading the page.
    setBusy(true);
    setError("");
    try {
      const [primary, ...rest] = tags;
      const created = await uploadDocument({
        ...form,
        // The parent's legacy columns hold the FIRST path; the rest ride as
        // repeated `topics` parts. Both are read on the server.
        subject: primary?.subject || "",
        topic: primary?.branch || "",
        filetype: file ? extType(file.name) : "PDF",
        file,                    // the set's first file
        files: files.slice(1),   // the rest, as repeated multipart parts
        topics: rest.map((t) => `${t.field}|${t.subject}|${t.branch}`),
      });
      store.addMyDoc(created.id);
      setToast("Published to your library");
      setTimeout(() => nav("/explore/dashboard"), 900);
    } catch (e) {
      setError(uploadErrorText(e));
    } finally {
      // `finally`, so the form is usable again on every path.
      setBusy(false);
    }
  };

  return (
    <div className="exp">
      <div className="exp-wrap exp-upload exp-in">
        <button className="exp-back" onClick={() => nav(-1)}><Icon.back /> Back</button>
        <p className="exp-eyebrow">Contribute</p>
        <h1 style={{ font: "800 26px Montserrat, sans-serif", color: "var(--forest)", marginBottom: 6 }}>Upload to the library</h1>
        <p className="exp-sub" style={{ marginBottom: 22 }}>Share notes, slides or question papers with other learners. Add one or more files as a set, then tag every topic they belong to. Research papers go through <button type="button" className="exp-inlinelink" onClick={() => nav("/explore/research")}>Research Hub</button> for review.</p>

        {/* One page with three numbered sections, not a wizard. The design
            shows a running summary beside the form, which only works if
            everything is on screen at once. */}
        <p className="exp-secnum">1 · Files</p>

            <div
              className={`exp-drop${drag ? " drag" : ""}${file ? " has" : ""}`}
              data-tour="explore-upload.dropzone"
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); onFiles(e.dataTransfer.files); }}
            >
              <div style={{ fontSize: 30 }}>{files.length ? "📎" : "⬆️"}</div>
              <h3>{drag ? "Drop the files here" : files.length ? "Add more files" : "Drop files here"}</h3>
              <p>Documents, slides, spreadsheets and data, images, drawings, code, audio, video and ZIP archives. Up to {MAX_MB} MB per file.</p>
              {/* `multiple`, and no narrow `accept`: the old attribute listed
                  five extensions while the rule allowed seven, so the picker
                  hid files the server would have taken. The real check is
                  fileProblem() below, which runs on the drag path too — the
                  one `accept` never covered. */}
              <button type="button" className="exp-btn exp-btn-ghost exp-choose"
                onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}>
                Choose files
              </button>
              <input ref={fileRef} type="file" hidden multiple
                onChange={(e) => { onFiles(e.target.files); e.target.value = ""; }} />
            </div>

            {files.length > 0 && (
              <div className="exp-upload-files">
                <p className="exp-upload-count">{files.length} file{files.length === 1 ? "" : "s"}</p>
                {files.map((f, i) => (
                  <div key={`${f.name}-${f.size}-${i}`} className="exp-upload-file">
                    <span>
                      <strong>{f.name}</strong>
                      <em>{extType(f.name)} · {humanSize(f.size)}</em>
                    </span>
                    <button type="button" aria-label={`Remove ${f.name}`}
                      onClick={(e) => { e.stopPropagation(); removeFile(i); }}>×</button>
                  </div>
                ))}
              </div>
            )}

        <p className="exp-secnum">2 · About this set</p>

            <div className="exp-field" data-tour="explore-upload.title">
              <label htmlFor="upload-title">Title</label>
              <input id="upload-title" maxLength={300} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Thermodynamics — Solved Problems" />
            </div>
            <div className="exp-field">
              <label>Description <span className="exp-optional">(optional)</span></label>
              <textarea value={form.description} onChange={(e) => set("description", e.target.value)}
                placeholder="Course, semester, what the files cover" />
            </div>
            <div className="exp-field">
              <label>Document type</label>
              {/* Chips, and ONE control. There used to be a chip grid in step
                  one whose value was never submitted and a separate select in
                  step two that was — so the thing people picked first had no
                  effect on anything. */}
              <div className="exp-typegrid">
                {(facets?.categories || []).filter((c) => c.key !== "research-papers").map((c) => (
                  <button key={c.key} type="button"
                    className={`exp-typebtn${form.category === c.key ? " on" : ""}`}
                    onClick={() => set("category", c.key)}>{c.name}</button>
                ))}
                <button type="button" className="exp-typebtn"
                  onClick={() => nav("/explore/research")}>Research paper › Research Hub</button>
              </div>
            </div>
            <div className="exp-upload-classification">
              <div className="exp-field">
                <label>Institution</label>
                <input value={form.institution} onChange={(e) => set("institution", e.target.value)} placeholder="Your college / school" />
              </div>
              <div className="exp-field">
                <label>Language</label>
                <select value={form.language} onChange={(e) => set("language", e.target.value)}>
                  {(facets?.languages || ["English"]).filter((l) => l !== "All").map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <p className="exp-secnum">3 · Tags</p>
            <p className="exp-sub" style={{ marginBottom: 12 }}>
              One set of tags covers every kind of file. Search any subject or
              branch and add as many as apply, or create a new one. Tags also
              decide who can verify the set.
            </p>
            <TagPicker
              tree={facets?.fieldGroups || []}
              tags={tags}
              onAdd={addTag}
              onRemove={removeTag}
            />

            <div className="exp-ready">
              <p className="exp-eyebrow">Ready to publish</p>
              <h3>{form.title || "Untitled set"}</h3>
              <p className="exp-sub">{files.length} file{files.length === 1 ? "" : "s"}</p>
              {tags.map((t, i) => (
                <p key={i} className="exp-readytag">{t.field} › {t.subject}{t.branch ? ` › ${t.branch}` : ""}</p>
              ))}
              <button className="exp-btn exp-btn-primary exp-readybtn"
                disabled={!canPublish} onClick={publish} data-tour="explore-upload.publish">
                {busy ? "Publishing…" : "Publish"}
              </button>
              {verifyOn ? (
                <>
                  <p className="exp-readyfoot">Goes live straight away, marked Unverified.</p>
                  <hr className="exp-readyrule" />
                  <p className="exp-readyfoot"><strong>How verification works.</strong> The set becomes Verified once {confirmationsNeeded} members who specialise in one of its tags confirm it is accurate.</p>
                </>
              ) : (
                <p className="exp-readyfoot">Goes live straight away.</p>
              )}
            </div>
      </div>
      {error && (
        <div className="exp-wrap exp-upload-error" role="alert">
          <span>{error}</span>
          <button type="button" className="exp-btn" onClick={() => setError("")}>Dismiss</button>
        </div>
      )}
      {toast && <div className="exp-toast">{toast}</div>}
    </div>
  );
}
