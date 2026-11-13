// ─────────────────────────────────────────────────────────────────────────────
// src/explore/VerifyPage.jsx   —   /explore/verify
//
// "Check uploads in your subjects." The member-facing half of community
// verification. Spec: design_handoff_explore_verification/README.md §4.
//
// Five tabs: Review queue, Notifications, My uploads, Specializations,
// How it works. Counts in the tab labels are live.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  getOverview, getNotifications, markNotificationsRead,
  getReviewTarget, submitReview,
  requestSpecialization, removeSpecialization, uploadNewVersion,
  verificationEnabled, isOff,
} from "./verificationApi";
import "./Verification.css";

const TABS = [
  { id: "queue", label: "Review queue" },
  { id: "notifications", label: "Notifications" },
  { id: "uploads", label: "My uploads" },
  { id: "specializations", label: "Specializations" },
  { id: "how", label: "How it works" },
];

/* The three checks, in the design's order and wording. Copy belongs next to
   the rule it describes — the backend validates the same three booleans. */
const CHECKS = [
  { key: "matches_tags", label: "The files match the title and tags" },
  { key: "content_accurate", label: "The content is accurate" },
  { key: "files_complete", label: "The files open and are complete" },
];

function StatusPill({ progress, asOwner = false }) {
  /* The PUBLIC badge is only ever Verified or Unverified — a set with changes
     requested "stays in Browse, marked Unverified". The owner's own uploads
     tab is the one place the real state shows, which is why `asOwner` exists
     rather than the server sending two different badges. */
  const status = asOwner ? progress.status : progress.badge;
  const text = {
    verified: "Verified",
    unverified: "Unverified",
    changes_requested: "Changes requested",
    hidden: "Hidden",
  }[status] || "Unverified";
  return <span className={`vf-pill vf-${status}`}>{text}</span>;
}

function TagChips({ tags }) {
  return (
    <div className="vf-tags">
      {(tags || []).map((t, i) => (
        <span key={i} className="vf-tag">{typeof t === "string" ? t : t.path}</span>
      ))}
    </div>
  );
}

// ── Review form ───────────────────────────────────────────────────────────────
function ReviewPanel({ docId, onDone, onBack }) {
  const [target, setTarget] = useState(null);
  const [answers, setAnswers] = useState({});
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let live = true;
    getReviewTarget(docId)
      .then((d) => live && setTarget(d))
      .catch((e) => live && setError(isOff(e) ? "" : "Could not open this set."));
    return () => { live = false; };
  }, [docId]);

  if (!target) return <div className="vf-loading">Loading…</div>;

  const answered = CHECKS.every((c) => answers[c.key] !== undefined);
  /* ⚠ `anyNo`, not `!allYes`. With nothing answered yet `allYes` is false,
     so keying the button off it labelled an untouched form "Request changes"
     — which reads as "rejecting is what this form is for". The button only
     becomes a rejection once someone has actually said no to something. */
  const anyNo = CHECKS.some((c) => answers[c.key] === false);
  /* The note and the button change together, exactly as the design does it:
     a single "no" turns an optional note into a required one and "Confirm as
     accurate" into "Request changes". */
  const noteRequired = anyNo;
  const canSend = answered && (!noteRequired || note.trim().length > 0) && !busy;

  async function send() {
    setBusy(true);
    setError("");
    try {
      await submitReview(docId, { ...answers, note: note.trim() });
      onDone();
    } catch (e) {
      setError(
        e?.response?.data?.detail
        || e?.response?.data?.note?.[0]
        || "Could not send your review."
      );
      setBusy(false);
    }
  }

  return (
    <div className="vf-review">
      <button className="vf-back" onClick={onBack}>‹ Back to queue</button>

      {!target.can_review && (
        <p className="vf-notice">{target.reason}</p>
      )}

      <div className="vf-review-grid">
        <section className="vf-card">
          <p className="vf-eyebrow">{target.category}</p>
          <h2>{target.title}</h2>
          <p className="vf-meta">
            {target.uploader} · uploaded {target.uploaded_ago} ago ·{" "}
            {target.progress.label}
          </p>
          <TagChips tags={target.tags} />

          <h3 className="vf-filehead">Files to check</h3>
          <ul className="vf-files">
            {target.files.map((f) => (
              <li key={f.id}>
                <span className="vf-fname">
                  {f.name}
                  {f.size > 0 && (
                    <em>{(f.size / 1024 / 1024).toFixed(1)} MB</em>
                  )}
                </span>
                {/* The design's Open button did nothing. A real link is the
                    only honest version: check three asks whether the files
                    open, so a button that cannot open them makes the question
                    unanswerable. */}
                {f.url
                  ? <a className="vf-open" href={f.url} target="_blank" rel="noreferrer">Open</a>
                  : <span className="vf-open vf-dead" title="This file is missing from storage">Missing</span>}
              </li>
            ))}
            {target.files.length === 0 && <li className="vf-empty">No files in this set.</li>}
          </ul>
        </section>

        <section className="vf-card vf-form">
          <p className="vf-eyebrow">Your review</p>
          {target.reviewing_as && (
            <p className="vf-sub">Reviewing as a {target.reviewing_as} specialist</p>
          )}

          {CHECKS.map((c) => (
            <div key={c.key} className="vf-check">
              <span>{c.label}</span>
              <div className="vf-yn">
                <button
                  type="button"
                  className={`vf-yes${answers[c.key] === true ? " on" : ""}`}
                  aria-pressed={answers[c.key] === true}
                  disabled={!target.can_review}
                  onClick={() => setAnswers((a) => ({ ...a, [c.key]: true }))}
                >Yes</button>
                <button
                  type="button"
                  className={`vf-no${answers[c.key] === false ? " on" : ""}`}
                  aria-pressed={answers[c.key] === false}
                  disabled={!target.can_review}
                  onClick={() => setAnswers((a) => ({ ...a, [c.key]: false }))}
                >No</button>
              </div>
            </div>
          ))}

          <label className="vf-label" htmlFor="vf-note">
            Note for the uploader {noteRequired ? "(required)" : "(optional)"}
          </label>
          <textarea
            id="vf-note"
            className="vf-note"
            rows={3}
            value={note}
            disabled={!target.can_review}
            placeholder="Say what is wrong and where, so the uploader can fix it"
            onChange={(e) => setNote(e.target.value)}
          />

          {error && <p className="vf-error">{error}</p>}

          <button className="vf-send" disabled={!canSend || !target.can_review} onClick={send}>
            {busy ? "Sending…" : anyNo ? "Request changes" : "Confirm as accurate"}
          </button>
          <p className="vf-foot">Open every file before you send your review.</p>
        </section>
      </div>
    </div>
  );
}

// ── Tabs ──────────────────────────────────────────────────────────────────────
function Queue({ data, onReview }) {
  if (!data.queue.length) {
    return (
      <div className="vf-blank">
        <h3>Nothing waiting for you</h3>
        <p>
          {data.my_subjects.length
            ? "Every set in your subjects has been checked."
            : "Add a subject on the Specializations tab to start reviewing."}
        </p>
      </div>
    );
  }
  return (
    <>
      <p className="vf-caption">
        {data.queue_count} set{data.queue_count === 1 ? "" : "s"} waiting in{" "}
        {data.my_subjects.join(" and ")}, longest wait first
      </p>
      {data.queue.map((row) => (
        <article key={row.id} className="vf-row">
          <div className="vf-row-main">
            <p className="vf-eyebrow">{row.category}</p>
            <h3>{row.title}</h3>
            <p className="vf-meta">
              {row.uploader} · {row.file_count} file{row.file_count === 1 ? "" : "s"} ·{" "}
              waiting {row.waiting}
            </p>
            <p className="vf-progress">
              <StatusPill progress={row.progress} />
              <span>
                {row.progress.label}
                {row.invite && " · Invited"}
                {row.invite?.days_left != null &&
                  ` · ${row.invite.days_left} day${row.invite.days_left === 1 ? "" : "s"} left to respond`}
                {row.invite?.reminder_sent && " · reminder sent"}
              </span>
            </p>
          </div>
          <button className="vf-cta" onClick={() => onReview(row.id)}>Review</button>
        </article>
      ))}
    </>
  );
}

function Notifications({ onReview }) {
  const [state, setState] = useState(null);

  const load = useCallback(() => {
    getNotifications().then(setState).catch(() => setState({ results: [], unread: 0 }));
  }, []);
  useEffect(load, [load]);

  if (!state) return <div className="vf-loading">Loading…</div>;
  if (!state.results.length) {
    return <div className="vf-blank"><h3>Nothing new</h3><p>Invitations and decisions about your uploads appear here.</p></div>;
  }

  return (
    <>
      <div className="vf-nothead">
        <span>{state.unread} unread of {state.results.length}</span>
        <button
          className="vf-ghost"
          onClick={() => markNotificationsRead().then(load)}
        >Mark all as read</button>
      </div>
      {state.results.map((n, i) => (
        <article key={i} className="vf-not">
          <span className={`vf-dot${n.unread ? " on" : ""}`} aria-hidden="true" />
          <div className="vf-not-body">
            <h4>{n.title}</h4>
            <p>{n.sub}</p>
          </div>
          <button className="vf-ghost" onClick={() => onReview(n.document_id, n.action)}>
            {n.action === "review" ? "Review" : n.action === "note" ? "See note" : "View"}
          </button>
        </article>
      ))}
    </>
  );
}

function NewVersionButton({ setId, onDone }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function send(files) {
    if (!files?.length) return;
    setBusy(true); setError("");
    try {
      await uploadNewVersion(setId, Array.from(files));
      onDone();
    } catch (e) {
      setError(
        e?.response?.data?.files?.[0]
        || e?.response?.data?.detail
        || "Could not upload the new version."
      );
      setBusy(false);
    }
  }

  return (
    <div>
      <button className="vf-cta" disabled={busy}
        onClick={() => inputRef.current?.click()}>
        {busy ? "Uploading…" : "Upload a new version"}
      </button>
      {/* Replaces the files on THIS set and restarts its count. Navigating to
          the generic upload form instead would create a second, separate
          document and leave this one frozen. */}
      <input ref={inputRef} type="file" hidden multiple
        onChange={(e) => { send(e.target.files); e.target.value = ""; }} />
      {error && <p className="vf-error">{error}</p>}
    </div>
  );
}

function MyUploads({ data, onUpload }) {
  if (!data.my_uploads.length) {
    return <div className="vf-blank"><h3>You have not uploaded anything yet</h3><p>Your uploads and their verification status appear here.</p></div>;
  }
  return data.my_uploads.map((u) => (
    <article key={u.id} className="vf-row vf-mine">
      <div className="vf-row-main">
        <p className="vf-progress">
          <StatusPill progress={u.progress} asOwner />
          <span>{u.progress.label}</span>
        </p>
        <h3>{u.title}</h3>
        <TagChips tags={u.tags} />
        {u.reviewer_note && (
          <div className="vf-note-box">
            <strong>Reviewer&apos;s note</strong>
            <p>{u.reviewer_note}</p>
          </div>
        )}
      </div>
      {u.reviewer_note && (
        <NewVersionButton setId={u.id} onDone={onUpload} />
      )}
    </article>
  ));
}

function Specializations({ data, reload }) {
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");

  async function add(subject) {
    setBusy(subject); setError("");
    try { await requestSpecialization(subject); reload(); }
    catch (e) { setError(e?.response?.data?.detail || "Could not send that request."); }
    finally { setBusy(""); }
  }

  async function drop(id) {
    setBusy(String(id));
    try { await removeSpecialization(id); reload(); }
    finally { setBusy(""); }
  }

  return (
    <>
      {/* Every threshold quoted here is the admin's live setting. A
          hardcoded number keeps describing a rule the server stopped
          enforcing the moment someone changed it. */}
      <p className="vf-caption">
        Your reviews count in subjects where your specialization is confirmed.
        Teacher accounts are confirmed in the subjects they teach.
        {data.can_earn && (
          <> Anyone else is confirmed once {data.verified_uploads_to_earn_it} of
          their own uploads in the subject are verified</>
        )}
        {data.can_earn && data.can_request ? ", or when an admin approves their request." : null}
        {!data.can_earn && data.can_request ? " Anyone else is confirmed when an admin approves their request." : null}
        {!data.can_earn && !data.can_request ? " Nobody else can be confirmed at the moment." : null}
        {data.can_earn && !data.can_request ? "." : null}
      </p>

      {data.specializations.map((s) => (
        <article key={s.id} className="vf-spec">
          <div>
            <h3>{s.subject}</h3>
            <p className="vf-meta">{s.reason}</p>
          </div>
          <span className={`vf-pill vf-${s.status}`}>
            {s.status === "confirmed" ? "Confirmed" : s.status === "pending" ? "Requested" : "Declined"}
          </span>
          <button className="vf-x" aria-label={`Remove ${s.subject}`} onClick={() => drop(s.id)} disabled={busy === String(s.id)}>×</button>
        </article>
      ))}

      {data.can_request && (
        <>
          <h3 className="vf-addhead">Add a subject</h3>
          {error && <p className="vf-error">{error}</p>}
          <div className="vf-addchips">
            {data.available_subjects.slice(0, 24).map((s) => (
              <button key={s} className="vf-chip" disabled={busy === s} onClick={() => add(s)}>+ {s}</button>
            ))}
          </div>
        </>
      )}
    </>
  );
}

function HowItWorks({ needed, hideAfter }) {
  return (
    <>
      <div className="vf-steps">
        <div className="vf-step"><span>1</span><h3>Upload</h3><p>The set goes live straight away and is marked Unverified.</p></div>
        <div className="vf-step"><span>2</span><h3>Specialists review</h3><p>It enters the queue of members confirmed in any subject it is tagged with. Each answers three checks.</p></div>
        <div className="vf-step"><span>3</span><h3>Verified</h3><p>After {needed} members answer yes to all three checks, the set is marked Verified.</p></div>
        <div className="vf-step vf-warn"><span className="vf-warnlabel">If something is wrong</span><h3>Changes requested</h3><p>A no on any check sends the set back to the uploader with the reviewer&apos;s note.</p></div>
      </div>

      <h2 className="vf-ruleshead">Rules</h2>
      <ul className="vf-rules">
        <li>Only confirmed specialists&apos; reviews count, and only in their own subjects.</li>
        <li>Nobody can review their own upload. Each member reviews a version once.</li>
        <li>A set with changes requested stays in Browse, marked Unverified, with its confirmations paused.</li>
        <li>Uploading a new version clears earlier confirmations and restarts the count.</li>
        <li>{hideAfter === 2 ? "Two" : hideAfter} specialists requesting changes on the same version hides the set until a moderator has looked at it.</li>
        <li>Editing the files of a Verified set returns it to Unverified.</li>
      </ul>
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function VerifyPage() {
  const nav = useNavigate();
  const { isAuthenticated } = useAuth();
  const [params, setParams] = useSearchParams();
  const [enabled, setEnabled] = useState(null);
  const [data, setData] = useState(null);
  const [reviewing, setReviewing] = useState(null);
  const [failed, setFailed] = useState(false);

  const tab = TABS.some((t) => t.id === params.get("tab"))
    ? params.get("tab") : "queue";

  const load = useCallback(() => {
    getOverview()
      .then((d) => { setData(d); setFailed(false); })
      .catch((e) => { if (!isOff(e)) setFailed(true); setData(null); });
  }, []);

  useEffect(() => {
    verificationEnabled().then((on) => {
      setEnabled(on);
      if (on && isAuthenticated) load();
    });
  }, [isAuthenticated, load]);

  if (enabled === null) return <div className="vf vf-loading">Loading…</div>;

  /* The gate is closed. Not an error page — there is nothing here to explain,
     and the toolbar entry is hidden for the same reason. */
  if (!enabled) {
    return (
      <div className="vf"><div className="exp-wrap vf-blank">
        <h3>Not available yet</h3>
        <p>Community verification is not switched on.</p>
        <button className="vf-cta" onClick={() => nav("/explore")}>Back to Explore</button>
      </div></div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="vf"><div className="exp-wrap vf-blank">
        <h3>Sign in to review</h3>
        <p>Reviewing is open to members who specialise in a subject.</p>
        <button className="vf-cta" onClick={() => nav("/login?next=/explore/verify")}>Log in</button>
      </div></div>
    );
  }

  /* ⚠ admin.js's safe() lesson, applied here: a failed request must not
     render as "there is nothing here". An outage and an empty queue look
     identical otherwise, and the empty state is reassuring in a way an
     outage should not be. */
  if (failed) {
    return (
      <div className="vf"><div className="exp-wrap vf-blank">
        <h3>Could not load your review queue</h3>
        <p>Something went wrong reaching the server.</p>
        <button className="vf-cta" onClick={load}>Try again</button>
      </div></div>
    );
  }

  if (!data) return <div className="vf vf-loading">Loading…</div>;

  function openReview(id) {
    setReviewing(id);
    setParams({ tab: "queue" }, { replace: true });
  }

  return (
    <div className="vf">
      <div className="exp-wrap">
        <p className="vf-eyebrow">Community verification</p>
        <h1 className="vf-title">Check uploads in your subjects</h1>
        <p className="vf-lede">
          Every upload goes live as Unverified. It becomes Verified when{" "}
          {data.confirmations_needed} members who specialise in one of its tags
          confirm it.
        </p>

        <nav className="vf-tabs" aria-label="Verification sections">
          {TABS.map((t) => {
            const count = t.id === "queue" ? data.queue_count
              : t.id === "notifications" ? data.notification_count : 0;
            return (
              <button
                key={t.id}
                className={`vf-tab${tab === t.id ? " active" : ""}`}
                aria-current={tab === t.id ? "page" : undefined}
                onClick={() => { setReviewing(null); setParams({ tab: t.id }); }}
              >
                {t.label}{count > 0 && ` · ${count}`}
              </button>
            );
          })}
        </nav>

        <div className="vf-panel">
          {reviewing ? (
            <ReviewPanel
              docId={reviewing}
              onBack={() => setReviewing(null)}
              onDone={() => { setReviewing(null); load(); }}
            />
          ) : tab === "queue" ? (
            <Queue data={data} onReview={openReview} />
          ) : tab === "notifications" ? (
            <Notifications onReview={(id, action) => {
              if (action === "review") openReview(id);
              else if (action === "note") setParams({ tab: "uploads" });
              else nav(`/explore/doc/${id}`);
            }} />
          ) : tab === "uploads" ? (
            <MyUploads data={data} onUpload={() => nav("/explore/upload")} />
          ) : tab === "specializations" ? (
            <Specializations data={data} reload={load} />
          ) : (
            <HowItWorks
              needed={data.confirmations_needed}
              hideAfter={data.change_requests_before_hidden}
            />
          )}
        </div>
      </div>
    </div>
  );
}
