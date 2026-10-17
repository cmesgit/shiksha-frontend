import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getFacets } from "./exploreApi";
import { researchList, researchDetail, researchAction, reviewerProfile, applyReviewer, submitResearch, downloadManuscript, researchError } from "./researchApi";
import "./Explore.css";
import "./Research.css";

const emptyForm = { title: "", abstract: "", authors: "", institution: "", subject: "", topic: "", original_url: "", permission_confirmed: false };
const criteria = { relevance: "Relevant to the subject", clarity: "Clear research question and writing", methods: "Methods explained and appropriate", evidence: "Evidence supports the conclusions", references: "References and attribution checked" };
const actionLabels = { submitted: "Submitted", assign: "Reviewer invited", accept: "Review accepted", decline: "Reviewer declined", changes: "Changes requested", revised: "Revised PDF submitted", review_approve: "Reviewer recommends approval", review_changes: "Reviewer requested changes", review_reject: "Reviewer recommends rejection", publish: "Published", reject: "Rejected", withdraw: "Withdrawn", reviewer_revoked: "Reviewer access revoked; reassignment needed" };

export default function ResearchHub() {
  const { isAuthenticated } = useAuth();
  const [params, setParams] = useSearchParams();
  const selectedId = params.get("paper");
  const [tab, setTab] = useState("mine");
  const [list, setList] = useState(null);
  const [paper, setPaper] = useState(null);
  const [profile, setProfile] = useState(null);
  const [facets, setFacets] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);
  const [page, setPage] = useState(1);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  const [permission, setPermission] = useState(false);
  const [application, setApplication] = useState({ expertise: "", subjects: "", topics: "" });
  const [declarations, setDeclarations] = useState(false);
  const [decision, setDecision] = useState("changes");
  const [checks, setChecks] = useState({});
  const [note, setNote] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) return;
    let alive = true;
    setList(null); setError("");
    Promise.all([researchList({ scope: tab === "reviews" ? "reviews" : "mine", page }), reviewerProfile(), getFacets()])
      .then(([rows, me, f]) => { if (alive) { setList(rows); setProfile(me); setFacets(f); } })
      .catch(e => { if (alive) setError(researchError(e)); });
    return () => { alive = false; };
  }, [isAuthenticated, tab, page, refresh]);

  useEffect(() => {
    setPaper(null); setNote(""); setChecks({}); setDeclarations(false); setFile(null); setResponse(""); setPermission(false);
    if (!selectedId || !isAuthenticated) return;
    let alive = true;
    researchDetail(selectedId).then(p => { if (alive) setPaper(p); }).catch(e => { if (alive) setError(researchError(e)); });
    return () => { alive = false; };
  }, [selectedId, isAuthenticated, refresh]);

  const run = async (fn, message, reload = true) => {
    setBusy(true); setError(""); setSuccess("");
    try { await fn(); setSuccess(message); if (reload) setRefresh(n => n + 1); }
    catch (e) { setError(researchError(e)); }
    finally { setBusy(false); }
  };
  const action = (name, body = {}) => run(() => researchAction(paper.id, { action: name, version: paper.current_version, ...body }), "Submission updated.");
  const select = id => { setError(""); setSuccess(""); setParams(id ? { paper: id } : {}); };
  const changeTab = next => { setTab(next); setPage(1); select(null); };
  const chooseFile = value => {
    if (value && (!value.name.toLowerCase().endsWith(".pdf") || value.size > 50 * 1024 * 1024)) {
      setError("Choose a PDF up to 50 MB."); setFile(null); return;
    }
    setError(""); setFile(value);
  };

  if (!isAuthenticated) return <div className="exp"><main className="exp-wrap rh-page"><h1>Research Hub</h1><p>Submit research for subject review before publication, or apply to review papers in your field.</p><Link className="exp-btn exp-btn-primary" to="/login?next=%2Fexplore%2Fresearch">Sign in to continue</Link></main></div>;
  return <div className="exp"><main className="exp-wrap rh-page">
    <p className="exp-eyebrow">Shiksha Research Hub</p><h1>Research, reviewed before publication</h1>
    <p className="exp-sub">Submit a PDF privately. An approved subject reviewer checks it, then an administrator decides whether to publish it.</p>
    <nav className="rh-tabs" aria-label="Research workspace">
      {[["mine", "My submissions"], ["new", "Submit a paper"], ["reviews", "Review papers"], ["reviewer", "Reviewer profile"]].map(([key, label]) => <button type="button" key={key} className={`exp-btn ${tab === key ? "exp-btn-primary" : "exp-btn-ghost"}`} onClick={() => changeTab(key)}>{label}</button>)}
    </nav>
    {error && <div className="rh-alert" role="alert">{error} <button type="button" className="exp-btn exp-btn-ghost" onClick={() => setRefresh(n => n+1)}>Retry loading</button></div>}
    {success && <p role="status" className="rh-success">{success}</p>}

    {selectedId ? !paper ? <p role="status">Loading submission…</p> : <section className="rh-panel">
      <button className="exp-btn exp-btn-ghost" onClick={() => select(null)}>Back to list</button>
      <h2>{paper.title}</h2><p className="rh-status">{paper.status_label} · Version {paper.current_version}</p>
      <p>{paper.authors} · {paper.subject}{paper.topic ? ` / ${paper.topic}` : ""}</p><p className="rh-text">{paper.abstract}</p>
      {paper.original_url && <a href={paper.original_url} target="_blank" rel="noreferrer">Original publication</a>}
      {paper.assignment && <p>Reviewer: {paper.assignment.reviewer_name} · Due {new Date(paper.assignment.due_at).toLocaleDateString()}{paper.assignment.overdue ? " · Overdue — administrator can reassign" : ""}</p>}
      {paper.document_id && paper.status === "published" && <Link className="exp-btn exp-btn-primary" to={`/explore/doc/${paper.document_id}`}>View published paper</Link>}
      {paper.revisions && <section><h3>Manuscript versions</h3>{paper.revisions.map(r => <div className="rh-version" key={r.id}><button disabled={busy} className="exp-btn exp-btn-ghost" onClick={() => run(() => downloadManuscript(r.file_path, r.version), "Download started.", false)}>Download PDF · v{r.version}</button>{r.response && <p className="rh-text">Author’s response: {r.response}</p>}</div>)}</section>}
      {paper.assignment?.is_mine && paper.status === "invited" && <section className="rh-block"><h3>Accept this review?</h3><p>The manuscript becomes available after acceptance. Decline if it is outside your expertise or you have a conflict.</p>
        <label className="rh-check"><input type="checkbox" checked={declarations} onChange={e => setDeclarations(e.target.checked)} />I have relevant expertise, have no conflict of interest, and will keep the unpublished manuscript confidential.</label>
        <div className="rh-actions"><button className="exp-btn exp-btn-primary" disabled={busy || !declarations} onClick={() => action("accept", { expertise_confirmed: true, no_conflict: true, confidential: true })}>Accept review</button><button className="exp-btn exp-btn-ghost" disabled={busy} onClick={() => action("decline")}>Decline</button></div></section>}
      {paper.assignment?.is_mine && paper.status === "reviewing" && <form className="rh-block" onSubmit={e => { e.preventDefault(); action("review", { decision, note, checks }); }}><h3>Your review</h3>
        {Object.entries(criteria).map(([key, label]) => <label className="exp-field" key={key}>{label}<select required value={checks[key] || ""} onChange={e => setChecks(v => ({ ...v, [key]: e.target.value }))}><option value="">Select finding…</option><option value="checked">Checked — satisfactory</option><option value="issues">Issues to address</option><option value="not_applicable">Not applicable — explain below</option></select></label>)}
        <label className="exp-field">Recommendation<select value={decision} onChange={e => setDecision(e.target.value)}><option value="changes">Request changes</option><option value="approve">Recommend approval</option><option value="reject">Recommend rejection</option></select></label>
        <label className="exp-field">Findings and feedback for the author<textarea required maxLength={15000} value={note} onChange={e => setNote(e.target.value)} placeholder="Explain your findings, any limitations, and specific changes needed." /></label><button disabled={busy} className="exp-btn exp-btn-primary">{busy ? "Submitting…" : "Submit review"}</button></form>}
      {paper.is_owner && paper.status === "changes" && <form className="rh-block" onSubmit={e => { e.preventDefault(); run(() => submitResearch({ file, response, permission_confirmed: permission }, paper.id), "Revision submitted for a new review."); }}><h3>Submit a revised PDF</h3><label className="exp-field">Revised manuscript · PDF up to 50 MB<input type="file" accept=".pdf" required onChange={e => chooseFile(e.target.files[0])} /></label><label className="exp-field">How did you address the feedback?<textarea required maxLength={10000} value={response} onChange={e => setResponse(e.target.value)} /></label><label className="rh-check"><input required type="checkbox" checked={permission} onChange={e => setPermission(e.target.checked)} />I have permission to submit this revision.</label><button disabled={busy || !file} className="exp-btn exp-btn-primary">{busy ? "Submitting…" : "Submit revision"}</button></form>}
      {paper.events && <section className="rh-block"><h3>Progress and feedback</h3><ol className="rh-timeline">{paper.events.map((event, index) => <li key={index}><strong>{actionLabels[event.action] || event.action}</strong> · v{event.version} · {new Date(event.created_at).toLocaleString()}{event.note && <p className="rh-text">{event.note}</p>}</li>)}</ol></section>}
      {paper.is_owner && !["published", "rejected", "withdrawn"].includes(paper.status) && <form className="rh-block" onSubmit={e => { e.preventDefault(); action("withdraw", { note }); }}><h3>Withdraw submission</h3><label className="exp-field">Reason<textarea required value={note} maxLength={15000} onChange={e => setNote(e.target.value)} /></label><button className="exp-btn exp-btn-ghost" disabled={busy}>Withdraw paper</button></form>}
    </section> : tab === "new" ? <form className="rh-panel" onSubmit={e => { e.preventDefault(); run(async () => { const created = await submitResearch({ ...form, file }); setForm(emptyForm); setFile(null); select(created.id); }, "Paper submitted privately. An administrator will arrange a review."); }}>
      <h2>Submit a research paper</h2><p>Your paper stays private until review and administrator approval. Use the revision form for an existing submission.</p>
      {[["title", "Paper title", 300], ["authors", "Authors (full names, in order)", 1500], ["institution", "Institution / affiliation (optional)", 160]].map(([key, label, max]) => <label className="exp-field" key={key}>{label}<input required={key !== "institution"} maxLength={max} value={form[key]} onChange={e => setForm(v => ({ ...v, [key]: e.target.value }))} /></label>)}
      <label className="exp-field">Abstract<textarea required maxLength={15000} value={form.abstract} onChange={e => setForm(v => ({ ...v, abstract: e.target.value }))} /></label>
      <div className="rh-grid"><label className="exp-field">Main subject<input list="rh-subjects" required maxLength={120} value={form.subject} onChange={e => setForm(v => ({ ...v, subject: e.target.value, topic: "" }))} /><datalist id="rh-subjects">{(facets?.subjects || []).filter(s => s !== "All").map(s => <option key={s} value={s} />)}</datalist></label><label className="exp-field">Subcategory (optional)<input list="rh-topics" maxLength={120} value={form.topic} disabled={!form.subject.trim()} onChange={e => setForm(v => ({ ...v, topic: e.target.value }))} /><datalist id="rh-topics">{(facets?.subjectGroups?.find(g => g.subject.toLowerCase() === form.subject.toLowerCase())?.topics || []).map(t => <option key={t} value={t} />)}</datalist></label></div>
      <label className="exp-field">Original publication link (optional)<input type="url" maxLength={1000} value={form.original_url} onChange={e => setForm(v => ({ ...v, original_url: e.target.value }))} placeholder="https://…" /></label>
      <label className="exp-field">Manuscript · PDF up to 50 MB<input type="file" accept=".pdf" required onChange={e => chooseFile(e.target.files[0])} /></label>
      <label className="rh-check"><input type="checkbox" required checked={form.permission_confirmed} onChange={e => setForm(v => ({ ...v, permission_confirmed: e.target.checked }))} />I have permission from the authors and rights holder to submit and publish this paper on Shiksha.</label>
      <button disabled={busy || !file} className="exp-btn exp-btn-primary">{busy ? "Submitting…" : "Submit for review"}</button>
    </form> : tab === "reviewer" ? <section className="rh-panel"><h2>Reviewer profile</h2><p>Teachers, guest teachers, and other subject specialists can apply. An administrator checks expertise before assigning papers.</p>
      {profile?.profile && <p className="rh-status">{profile.profile.approved ? "Approved reviewer" : "Awaiting administrator approval"} · {profile.profile.subjects.join(", ")}</p>}
      <form onSubmit={e => { e.preventDefault(); run(() => applyReviewer({ expertise: application.expertise, subjects: application.subjects.split(",").map(v => v.trim()).filter(Boolean), topics: application.topics.split(",").map(v => v.trim()).filter(Boolean) }), "Application submitted. An administrator will check your expertise."); }}>
        <label className="exp-field">Qualifications and relevant research experience<textarea required maxLength={1000} value={application.expertise} onChange={e => setApplication(v => ({ ...v, expertise: e.target.value }))} /></label><label className="exp-field">Main subjects (comma separated)<input required value={application.subjects} onChange={e => setApplication(v => ({ ...v, subjects: e.target.value }))} placeholder="Mathematics, Physics" /></label><label className="exp-field">Specialist topics (optional, comma separated)<input value={application.topics} onChange={e => setApplication(v => ({ ...v, topics: e.target.value }))} /></label><p>Changing your expertise requires fresh administrator approval.</p><button disabled={busy} className="exp-btn exp-btn-primary">{busy ? "Submitting…" : "Submit reviewer application"}</button>
      </form></section> : <section className="rh-panel"><h2>{tab === "reviews" ? "Your review assignments" : "Your submissions"}</h2>{!list ? <p>{error ? "The list could not be loaded." : "Loading…"}</p> : <>{list.results.length === 0 ? <p>{tab === "reviews" ? "No review invitations yet. Apply through Reviewer profile if you want to review papers." : "No submissions yet. Choose Submit a paper to start."}</p> : <div className="rh-list">{list.results.map(p => <button className="rh-list-item" key={p.id} onClick={() => select(p.id)}><strong>{p.title}</strong><span>{p.status_label} · v{p.current_version}</span><span>{p.subject}{p.topic ? ` / ${p.topic}` : ""}</span></button>)}</div>}<div className="rh-actions"><button className="exp-btn exp-btn-ghost" disabled={page === 1} onClick={() => setPage(p => p-1)}>Previous</button><span>Page {page} · {list.count} papers</span><button className="exp-btn exp-btn-ghost" disabled={page * 20 >= list.count} onClick={() => setPage(p => p+1)}>Next</button></div></>}</section>}
  </main></div>;
}
