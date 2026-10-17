import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getFacets } from "./exploreApi";
import { researchList, researchDetail, researchAction, reviewerProfile, applyReviewer,
  setReviewerAvailability, submitResearch, downloadManuscript, researchError } from "./researchApi";
import "./Explore.css";
import "./Research.css";

const emptyForm = { title: "", abstract: "", authors: "", institution: "", subject: "", topic: "", original_url: "", permission_confirmed: false };
const criteria = { relevance: "Relevant to the subject", clarity: "Clear research question and writing", methods: "Methods explained and appropriate", evidence: "Evidence supports the conclusions", references: "References and attribution checked" };
const labels = { submitted: "Submitted", assign: "Reviewer invited", auto_invite: "Subject reviewer invited automatically",
  accept: "Review accepted", decline: "Reviewer declined", changes: "Changes requested", revised: "Revised PDF submitted",
  review_approve: "Reviewer recommends approval", review_changes: "Reviewer requested changes", review_reject: "Reviewer recommends rejection",
  publish: "Published", reject: "Administrator decision", withdraw: "Withdrawn", reviewer_revoked: "Reviewer access revoked",
  deadline_expired: "Review slot released after deadline", matching_wait: "Waiting for an available subject reviewer",
  match: "Reviewer matching checked", configure: "Review settings updated", appeal: "Author appealed the decision",
  uphold_appeal: "Appeal upheld — fresh reviews requested", dismiss_appeal: "Appeal dismissed",
  correction_requested: "Correction submitted for review", cancel_correction: "Correction request cancelled" };

function RevisionForm({ correction, file, chooseFile, response, setResponse, permission, setPermission, busy, onSubmit }) {
  return <form className="rh-block" onSubmit={onSubmit}>
    <h3>{correction ? "Propose a correction" : "Submit a revised PDF"}</h3>
    {correction && <p>Your current published paper stays available while the corrected PDF is reviewed. The corrected version needs fresh reviewer approval and a final admin decision.</p>}
    <label className="exp-field">{correction ? "Corrected" : "Revised"} manuscript · PDF up to 50 MB
      <input type="file" accept=".pdf" required onChange={e => chooseFile(e.target.files[0])} />
    </label>
    <label className="exp-field">{correction ? "What needs correcting, and why?" : "How did you address the feedback?"}
      <textarea required maxLength={10000} value={response} onChange={e => setResponse(e.target.value)} />
    </label>
    <label className="rh-check"><input required type="checkbox" checked={permission} onChange={e => setPermission(e.target.checked)} />I have permission to submit this version.</label>
    <button disabled={busy || !file} className="exp-btn exp-btn-primary">{busy ? "Submitting…" : correction ? "Submit correction for review" : "Submit revision"}</button>
  </form>;
}

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
  const select = id => { setError(""); setSuccess(""); setParams(id ? { paper: id } : {}); };
  const action = (name, body = {}) => run(async () => {
    const updated = await researchAction(paper.id, { action: name, version: paper.current_version, ...body });
    const ending = !updated.is_owner && !updated.assignment?.is_mine;
    setList(previous => previous ? { ...previous,
      results: ending ? previous.results.filter(item => item.id !== paper.id) : previous.results.map(item => item.id === paper.id ? updated : item),
      count: ending && previous.results.some(item => item.id === paper.id) ? Math.max(0, previous.count - 1) : previous.count,
    } : previous);
    if (ending) { select(null); setTab("reviews"); } else setPaper(updated);
    setNote("");
  }, name === "review" ? "Review submitted. The administrator will consider all required reviews." : "Submission updated.", false);
  const changeTab = next => { setTab(next); setPage(1); select(null); };
  const chooseFile = value => {
    if (value && (!value.name.toLowerCase().endsWith(".pdf") || value.size > 50 * 1024 * 1024)) {
      setError("Choose a PDF up to 50 MB."); setFile(null); return;
    }
    setError(""); setFile(value);
  };
  const revisionSubmit = correction => e => {
    e.preventDefault();
    run(() => submitResearch({ file, response, permission_confirmed: permission }, paper.id, correction),
      correction ? "Correction submitted privately. The current publication stays available during review." : "Revision submitted for fresh reviews.");
  };

  if (!isAuthenticated) return <div className="exp"><main className="exp-wrap rh-page">
    <h1>Research Hub</h1><p>Submit research for independent subject review, or apply to review papers in your field.</p>
    <Link className="exp-btn exp-btn-primary" to="/login?next=%2Fexplore%2Fresearch">Sign in to continue</Link>
  </main></div>;
  const ownAssignment = paper?.assignment?.is_mine ? paper.assignment : null;
  const correction = paper?.cases?.find(c => c.kind === "correction" && c.status === "open");
  const appeal = paper?.cases?.find(c => c.kind === "appeal" && c.version === paper.current_version);
  const revisionProps = { file, chooseFile, response, setResponse, permission, setPermission, busy };

  return <div className="exp"><main className="exp-wrap rh-page">
    <p className="exp-eyebrow">Shiksha Research Hub</p><h1>Research, reviewed before publication</h1>
    <p className="exp-sub">Submit a PDF privately. We invite approved subject reviewers, collect independent reviews, and send the findings to an administrator for the final decision.</p>
    <nav className="rh-tabs" aria-label="Research workspace">
      {[["mine", "My submissions"], ["new", "Submit a paper"], ["reviews", "Review papers"], ["reviewer", "Reviewer profile"]].map(([key, label]) =>
        <button type="button" key={key} className={`exp-btn ${tab === key ? "exp-btn-primary" : "exp-btn-ghost"}`} onClick={() => changeTab(key)}>{label}</button>)}
    </nav>
    {error && <div className="rh-alert" role="alert">{error} <button type="button" className="exp-btn exp-btn-ghost" onClick={() => setRefresh(n => n+1)}>Retry loading</button></div>}
    {success && <p role="status" className="rh-success">{success}</p>}

    {selectedId ? !paper ? <section className="rh-panel"><p role="status">{error ? "This submission is unavailable. It may have been closed or reassigned." : "Loading submission…"}</p>
      {error && <button className="exp-btn exp-btn-ghost" onClick={() => select(null)}>Back to list</button>}</section> : <section className="rh-panel">
      <button className="exp-btn exp-btn-ghost" onClick={() => select(null)}>Back to list</button>
      <h2>{paper.title}</h2><p className="rh-status">{paper.status === "published" ? `Published version ${paper.published_version}` : paper.status_label} · Latest submission version {paper.current_version}</p>
      <p>{paper.authors} · {paper.subject}{paper.topic ? ` / ${paper.topic}` : ""}</p><p className="rh-text">{paper.abstract}</p>
      {paper.original_url && <a href={paper.original_url} target="_blank" rel="noreferrer">Original publication</a>}
      <div className="rh-progress" role="status"><strong>{paper.status === "published" ? `${paper.published_review_count || paper.required_reviews} independent review(s) for published version ${paper.published_version}` : ["rejected", "withdrawn"].includes(paper.status) ? "This review round is closed" : `${paper.review_progress?.completed || 0} of ${paper.required_reviews} required reviews completed`}</strong>
        {!["published", "rejected", "withdrawn"].includes(paper.status) && <p>{paper.review_progress?.accepted || 0} in progress · {paper.review_progress?.invited || 0} invitations waiting</p>}
        {paper.automatic_matching && ["submitted", "invited", "reviewing"].includes(paper.status) && <p>Reviewers are matched by subject and specialist topic. Invitations expire after 48 hours; accepted reviews normally have seven days. We remind and replace overdue reviewers automatically.</p>}
      </div>
      {paper.document_id && <p><Link className="exp-btn exp-btn-primary" to={`/explore/doc/${paper.document_id}`}>View published version {paper.published_version || ""}</Link></p>}
      {correction && <p className="rh-status">A correction is under review. Published version {paper.published_version} remains available.</p>}
      {ownAssignment && <p>Your assignment: {ownAssignment.status === "invited" ? "Respond by" : "Review deadline"} {new Date(ownAssignment.due_at).toLocaleString()}{ownAssignment.overdue ? " · Deadline passed" : ""}.</p>}
      {paper.revisions && <section><h3>Manuscript versions</h3>{paper.revisions.map(r => <div className="rh-version" key={r.id}>
        <button disabled={busy} className="exp-btn exp-btn-ghost" onClick={() => run(() => downloadManuscript(r.file_path, r.version), "Download started.", false)}>Download PDF · v{r.version}</button>
        {r.response && <p className="rh-text">Author’s response: {r.response}</p>}</div>)}</section>}

      {ownAssignment?.status === "invited" && <section className="rh-block"><h3>Accept this review?</h3>
        <p>Only the required number of reviewers can accept. The manuscript becomes available after acceptance. Decline if it is outside your expertise or you have a conflict.</p>
        <label className="rh-check"><input type="checkbox" checked={declarations} onChange={e => setDeclarations(e.target.checked)} />I have relevant expertise, have no conflict of interest, and will keep the unpublished manuscript confidential.</label>
        <div className="rh-actions"><button className="exp-btn exp-btn-primary" disabled={busy || !declarations || ownAssignment.overdue} onClick={() => action("accept", { expertise_confirmed: true, no_conflict: true, confidential: true })}>Accept review</button>
          <button className="exp-btn exp-btn-ghost" disabled={busy || ownAssignment.overdue} onClick={() => action("decline")}>Decline</button></div>
      </section>}
      {ownAssignment?.status === "accepted" && <form className="rh-block" onSubmit={e => { e.preventDefault(); action("review", { decision, note, checks }); }}>
        <h3>Your independent review</h3><p>Other reviewers’ findings are hidden while you review. Explain your own assessment and any limits.</p>
        {Object.entries(criteria).map(([key, label]) => <label className="exp-field" key={key}>{label}
          <select required value={checks[key] || ""} onChange={e => setChecks(v => ({ ...v, [key]: e.target.value }))}>
            <option value="">Select finding…</option><option value="checked">Checked — satisfactory</option><option value="issues">Issues to address</option><option value="not_applicable">Not applicable — explain below</option>
          </select></label>)}
        <label className="exp-field">Recommendation<select value={decision} onChange={e => setDecision(e.target.value)}><option value="changes">Request changes</option><option value="approve">Recommend approval</option><option value="reject">Recommend rejection</option></select></label>
        <label className="exp-field">Findings and feedback for the author<textarea required maxLength={15000} value={note} onChange={e => setNote(e.target.value)} placeholder="Explain your findings, limitations, and specific changes needed." /></label>
        <button disabled={busy || ownAssignment.overdue} className="exp-btn exp-btn-primary">{busy ? "Submitting…" : "Submit review"}</button>
      </form>}
      {ownAssignment?.status === "completed" && <p role="status">Your review is complete. The administrator will decide after the required independent reviews are available.</p>}
      {paper.is_owner && paper.status === "changes" && <RevisionForm {...revisionProps} onSubmit={revisionSubmit(false)} />}
      {paper.is_owner && paper.status === "published" && !correction && <RevisionForm {...revisionProps} correction onSubmit={revisionSubmit(true)} />}

      {paper.is_owner && paper.status === "rejected" && !appeal && <form className="rh-block" onSubmit={e => { e.preventDefault(); action("appeal", { note }); }}>
        <h3>Appeal this decision</h3><p>You can appeal once for this version. Explain which findings should be reconsidered and why. An appeal does not publish the paper.</p>
        <label className="exp-field">Reason for appeal<textarea required maxLength={15000} value={note} onChange={e => setNote(e.target.value)} /></label>
        <button disabled={busy} className="exp-btn exp-btn-primary">Submit appeal</button>
      </form>}
      {paper.cases?.length > 0 && <section className="rh-block"><h3>Appeals and corrections</h3>{paper.cases.map(c => <article key={c.id} className="rh-case">
        <strong>{c.kind === "appeal" ? "Appeal" : "Correction"} · v{c.version} · {c.status === "open" ? "Awaiting decision / review" : c.status}</strong>
        <p className="rh-text">{c.reason}</p>{c.resolution && <p className="rh-text">Administrator’s response: {c.resolution}</p>}{c.public_note && <p className="rh-text">Public correction notice: {c.public_note}</p>}
      </article>)}</section>}
      {paper.review_history?.length > 0 && <section className="rh-block"><h3>Review findings</h3>{paper.review_history.map(r => <article className="rh-case" key={r.id}>
        <strong>{r.reviewer_name} · v{r.version} · {r.decision === "approve" ? "Recommends approval" : r.decision === "changes" ? "Requests changes" : "Recommends rejection"}</strong>
        <p className="rh-text">{r.feedback}</p></article>)}</section>}
      {paper.events && <section className="rh-block"><h3>Progress and feedback</h3><ol className="rh-timeline">{paper.events.map((e, index) => <li key={index}>
        <strong>{labels[e.action] || "Research update"}</strong> · v{e.version} · {new Date(e.created_at).toLocaleString()}{e.note && <p className="rh-text">{e.note}</p>}
      </li>)}</ol></section>}
      {paper.is_owner && correction && <form className="rh-block" onSubmit={e => { e.preventDefault(); action("cancel_correction", { note }); }}>
        <h3>Cancel this correction request</h3><p>This keeps the existing published paper and ends the proposed correction review.</p>
        <label className="exp-field">Reason<textarea required maxLength={15000} value={note} onChange={e => setNote(e.target.value)} /></label>
        <button className="exp-btn exp-btn-ghost" disabled={busy}>Cancel correction request</button></form>}
      {paper.is_owner && !paper.published_version && !["published", "rejected", "withdrawn"].includes(paper.status) && <form className="rh-block" onSubmit={e => { e.preventDefault(); action("withdraw", { note }); }}>
        <h3>Withdraw submission</h3><label className="exp-field">Reason<textarea required value={note} maxLength={15000} onChange={e => setNote(e.target.value)} /></label>
        <button className="exp-btn exp-btn-ghost" disabled={busy}>Withdraw paper</button></form>}
    </section> : tab === "new" ? <form className="rh-panel" onSubmit={e => {
      e.preventDefault(); run(async () => { const created = await submitResearch({ ...form, file }); setForm(emptyForm); setFile(null); select(created.id); }, "Paper submitted privately. Matching subject reviewers are being invited.");
    }}>
      <h2>Submit a research paper</h2><p>New submissions normally require two independent subject reviews and final administrator approval. Your paper stays private until publication.</p>
      {[["title", "Paper title", 300], ["authors", "Authors (full names, in order)", 1500], ["institution", "Institution / affiliation (optional)", 160]].map(([key, label, max]) =>
        <label className="exp-field" key={key}>{label}<input required={key !== "institution"} maxLength={max} value={form[key]} onChange={e => setForm(v => ({ ...v, [key]: e.target.value }))} /></label>)}
      <label className="exp-field">Abstract<textarea required maxLength={15000} value={form.abstract} onChange={e => setForm(v => ({ ...v, abstract: e.target.value }))} /></label>
      <div className="rh-grid"><label className="exp-field">Main subject<input list="rh-subjects" required maxLength={120} value={form.subject} onChange={e => setForm(v => ({ ...v, subject: e.target.value, topic: "" }))} />
        <datalist id="rh-subjects">{(facets?.subjects || []).filter(s => s !== "All").map(s => <option key={s} value={s} />)}</datalist></label>
        <label className="exp-field">Subcategory (optional)<input list="rh-topics" maxLength={120} value={form.topic} disabled={!form.subject.trim()} onChange={e => setForm(v => ({ ...v, topic: e.target.value }))} />
          <datalist id="rh-topics">{(facets?.subjectGroups?.find(g => g.subject.toLowerCase() === form.subject.toLowerCase())?.topics || []).map(t => <option key={t} value={t} />)}</datalist></label></div>
      <label className="exp-field">Original publication link (optional)<input type="url" maxLength={1000} value={form.original_url} onChange={e => setForm(v => ({ ...v, original_url: e.target.value }))} placeholder="https://…" /></label>
      <label className="exp-field">Manuscript · PDF up to 50 MB<input type="file" accept=".pdf" required onChange={e => chooseFile(e.target.files[0])} /></label>
      <label className="rh-check"><input type="checkbox" required checked={form.permission_confirmed} onChange={e => setForm(v => ({ ...v, permission_confirmed: e.target.checked }))} />I have permission from the authors and rights holder to submit and publish this paper on Shiksha.</label>
      <button disabled={busy || !file} className="exp-btn exp-btn-primary">{busy ? "Submitting…" : "Submit for review"}</button>
    </form> : tab === "reviewer" ? <section className="rh-panel"><h2>Reviewer profile</h2>
      <p>Teachers, guest teachers, and other subject specialists can apply. An administrator checks expertise before the system sends matching invitations.</p>
      {profile?.profile && <div className="rh-progress"><p className="rh-status">{profile.profile.approved ? "Approved reviewer" : "Awaiting administrator approval"} · {profile.profile.subjects.join(", ")}</p>
        <p className="rh-text">{profile.profile.expertise}</p><p>{profile.profile.available ? "Available for new invitations" : "New invitations paused"}. Existing reviews keep their deadlines.</p>
        <button className="exp-btn exp-btn-ghost" disabled={busy} onClick={() => run(() => setReviewerAvailability(!profile.profile.available), "Reviewer availability updated.")}>{profile.profile.available ? "Pause new invitations" : "Accept new invitations"}</button>
      </div>}
      <form onSubmit={e => { e.preventDefault(); run(() => applyReviewer({ expertise: application.expertise, subjects: application.subjects.split(",").map(v => v.trim()).filter(Boolean), topics: application.topics.split(",").map(v => v.trim()).filter(Boolean) }), "Application submitted. An administrator will check your expertise."); }}>
        <label className="exp-field">Qualifications and relevant research experience<textarea required maxLength={1000} value={application.expertise} onChange={e => setApplication(v => ({ ...v, expertise: e.target.value }))} /></label>
        <label className="exp-field">Main subjects (comma separated)<input required value={application.subjects} onChange={e => setApplication(v => ({ ...v, subjects: e.target.value }))} placeholder="Mathematics, Physics" /></label>
        <label className="exp-field">Specialist topics (optional, comma separated)<input value={application.topics} onChange={e => setApplication(v => ({ ...v, topics: e.target.value }))} /></label>
        <p>Changing expertise requires fresh administrator approval. Finish accepted reviews before changing it.</p>
        <button disabled={busy} className="exp-btn exp-btn-primary">{busy ? "Submitting…" : "Submit reviewer application"}</button>
      </form></section> : <section className="rh-panel"><h2>{tab === "reviews" ? "Your review assignments" : "Your submissions"}</h2>
      {!list ? <p>{error ? "The list could not be loaded." : "Loading…"}</p> : <>
        {list.results.length === 0 ? <p>{tab === "reviews" ? "No review invitations yet. Apply through Reviewer profile if you want to review papers." : "No submissions yet. Choose Submit a paper to start."}</p> :
          <div className="rh-list">{list.results.map(p => <button className="rh-list-item" key={p.id} onClick={() => select(p.id)}>
            <strong>{p.title}</strong><span>{p.status_label} · v{p.current_version}</span><span>{p.review_progress?.completed || 0}/{p.required_reviews} reviews · {p.subject}{p.topic ? ` / ${p.topic}` : ""}</span>
            {p.open_case && <span>{p.open_case.kind === "appeal" ? "Appeal awaiting decision" : "Correction under review"}</span>}
          </button>)}</div>}
        <div className="rh-actions"><button className="exp-btn exp-btn-ghost" disabled={page === 1} onClick={() => setPage(p => p-1)}>Previous</button><span>Page {page} · {list.count} papers</span>
          <button className="exp-btn exp-btn-ghost" disabled={page * 20 >= list.count} onClick={() => setPage(p => p+1)}>Next</button></div>
      </>}
    </section>}
  </main></div>;
}
