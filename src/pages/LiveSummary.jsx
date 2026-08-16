/**
 * LiveSummary.jsx — screen 09 of the live-session design handoff
 * (design_handoff_live_sessions/design-reference/Live Sessions.dc.html,
 * data-screen-label="09"). Route: /live/session/:id/summary.
 *
 * Reached two ways: the room's own T-0 cap-based timeout redirect (see
 * GroupSessionClassroomUI.jsx's single disconnect+navigate effect —
 * `?reason=timeout`), or a plain "Leave"/"End session" navigate. Renders
 * the SAME page either way — the only difference is the eyebrow copy.
 *
 * Backend: `GET .../summary/` and `POST .../review/` did NOT exist before
 * this phase (01-FLOW.md §F assumed both already existed — "the existing
 * SessionReview endpoint" — but the only real `SessionReview` model belongs
 * to the unrelated `livestream` app). Both were added additively in
 * shiksha-backend for this phase; see liveSessionService.js's own comment
 * and sessions_app/group_session_views.py::group_session_summary /
 * submit_group_session_review for the real response shape this page
 * consumes.
 *
 * Files list deliberately reuses FilesPanel's exact CSS classes (.gs-file,
 * .gs-file__kind, etc. from styles/liveSessions.css) and the same tiny
 * kindOf()/expiresIn() pure helpers, rather than importing FilesPanel's
 * internals (it isn't structured for that — no exported sub-pieces) or
 * rebuilding the look from scratch. "Save to my course" (mentioned in
 * 01-FLOW.md section D) is NOT implemented here — it would need a new
 * "copy this file into course materials" backend action this phase never
 * scoped, so this page only offers Download, honestly.
 *
 * The upsell "Next step" band is NOT a re-skin of EndingSoonModal — screen
 * 09's own markup is a visually distinct treatment (a single dark-green
 * card, not the ending-soon modal's two-card comparison layout), so it's
 * its own small component below rather than a forced reuse of the wrong
 * shell. It DOES reuse the same course-vs-general decision EndingSoonModal
 * uses (session.course_id present → course copy, otherwise general copy),
 * and never invents a specific "next class" date/time since no endpoint
 * here supplies one.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IcStar } from "../components/home/HomeIcons";
import liveSessionService from "../api/liveSessionService";
import apiClient from "../api/apiClient";
import { extractApiError } from "../api/groupSessionService";
import { ACADEMY_BROWSE_URL } from "../config/urls";
import "../styles/liveSessions.css";
import "./LiveSummary.css";

function kindOf(name) {
  const ext = (String(name || "").split(".").pop() || "").toUpperCase();
  return ["PDF", "PNG", "JPG", "JPEG", "DOC", "DOCX", "PPT", "PPTX", "XLSX"].includes(ext)
    ? ext
    : "FILE";
}

function expiresIn(iso) {
  if (!iso) return "—";
  const ms = new Date(iso).getTime() - Date.now();
  if (ms <= 0) return "expired";
  const h = Math.floor(ms / 3_600_000);
  return h >= 24 ? `${Math.floor(h / 24)}d ${h % 24}h` : `${h}h`;
}

function formatDuration(seconds) {
  const s = Math.max(0, Math.round(seconds || 0));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m`;
  return `${s}s`;
}

function formatRange(startIso, endIso) {
  if (!startIso) return "—";
  try {
    const start = new Date(startIso);
    const dateLabel = start.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    const startLabel = start.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
    if (!endIso) return `${dateLabel}, ${startLabel}`;
    const end = new Date(endIso);
    const endLabel = end.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
    return `${dateLabel}, ${startLabel} – ${endLabel}`;
  } catch {
    return "—";
  }
}

function NextStepCard({ session }) {
  const isCourse = !!session?.course_id;
  const label = session?.course_title || session?.subject_name || "this course";
  return (
    <div className="ls-next">
      <div className="ls-next-eyebrow">Next step</div>
      {isCourse ? (
        <>
          <div className="ls-next-title">Keep your seat in {label}</div>
          <p>Enrol to keep unlimited time in every live session, plus your notes and every shared file in one place.</p>
          <div className="ls-next-actions">
            <Link to={`/enroll/${session.course_id}`} className="ls-next-btn ls-next-btn--solid">Enrol in the course</Link>
            <a href={ACADEMY_BROWSE_URL} className="ls-next-btn ls-next-btn--outline">See plans</a>
          </div>
        </>
      ) : (
        <>
          <div className="ls-next-title">Host your own room any time</div>
          <p>This was a free instant room — hosts are never time-capped. Open a new one from /live whenever you like, or go all-access to remove the joiner cap everywhere.</p>
          <div className="ls-next-actions">
            <Link to="/live" className="ls-next-btn ls-next-btn--solid">Host a room</Link>
            <a href={ACADEMY_BROWSE_URL} className="ls-next-btn ls-next-btn--outline">See plans</a>
          </div>
        </>
      )}
    </div>
  );
}

export default function LiveSummary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reason = searchParams.get("reason");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [description, setDescription] = useState("");
  const [reviewBusy, setReviewBusy] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewSent, setReviewSent] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!id) return undefined;
    setLoading(true);
    setLoadError("");
    liveSessionService
      .summary(id)
      .then((res) => {
        if (cancelled) return;
        setData(res);
        if (res?.my_review) {
          setRating(res.my_review.rating || 0);
          setDescription(res.my_review.description || "");
          setReviewSent(true);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setLoadError(extractApiError(err, "This summary isn't available."));
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  const submitReview = async () => {
    if (!rating) {
      setReviewError("Pick a star rating first.");
      return;
    }
    setReviewBusy(true);
    setReviewError("");
    try {
      await liveSessionService.submitReview(id, { rating, description });
      setReviewSent(true);
    } catch (err) {
      setReviewError(extractApiError(err, "Couldn't send your review."));
    } finally {
      setReviewBusy(false);
    }
  };

  const downloadTranscript = async () => {
    if (!data?.chat_path) return;
    try {
      const res = await apiClient.get(data.chat_path);
      const lines = (res.data || []).map(
        (m) => `[${new Date(m.created_at).toLocaleString()}] ${m.sender_name}: ${m.message}`
      );
      const blob = new Blob([lines.join("\n")], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `chat-${id}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      /* best-effort — no transcript-specific error UI, chat is secondary here */
    }
  };

  const session = data?.session;
  const title = useMemo(() => {
    if (!session) return "Live session";
    return session.topic || session.course_title || session.subject_name || "Group session";
  }, [session]);

  if (loading) {
    return (
      <div className="ls-page">
        <Navbar />
        <div className="ls-loading">Loading the summary…</div>
        <Footer />
      </div>
    );
  }

  if (loadError || !data) {
    return (
      <div className="ls-page">
        <Navbar />
        <div className="ls-error">
          <h2>Can&rsquo;t open this summary</h2>
          <p>{loadError || "Something went wrong."}</p>
          <button className="ls-btn ls-btn--primary" onClick={() => navigate("/live")}>
            Back to /live
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="ls-page">
      <Navbar />
      <div className="ls-wrap">
        <div className="ls-head">
          <div>
            <div className="ls-eyebrow">
              {reason === "timeout" ? "Session ended — time ran out" : "Session ended"}
            </div>
            <h2>{title}</h2>
            <p className="ls-sub">
              {[
                session?.host_name ? `Hosted by ${session.host_name}` : null,
                formatRange(session?.room_started_at, session?.ended_at),
                session?.short_code ? `code ${session.short_code}` : null,
              ].filter(Boolean).join(" · ")}
            </p>
          </div>
          <button className="ls-back-btn" onClick={() => navigate("/live")}>Back to /live</button>
        </div>

        <div className="ls-stats">
          <div className="ls-stat"><div className="ls-stat-value">{formatDuration(data.you_attended_seconds)}</div><div className="ls-stat-label">You attended</div></div>
          <div className="ls-stat"><div className="ls-stat-value">{data.participants_count}</div><div className="ls-stat-label">Participants</div></div>
          <div className="ls-stat"><div className="ls-stat-value">{data.files_count}</div><div className="ls-stat-label">Files shared</div></div>
          <div className="ls-stat"><div className="ls-stat-value">{data.remote_assist_count}</div><div className="ls-stat-label">Remote assist by teacher</div></div>
        </div>

        <div className="ls-grid">
          <div className="ls-card">
            <div className="ls-card-head">
              <div className="ls-card-title">Files from this session</div>
            </div>

            {data.files.length > 0 && (
              <div className="ls-expiry-note">
                Files are deleted a few days after the session ends unless saved elsewhere first.
              </div>
            )}

            <div className="ls-files">
              {data.files.length === 0 ? (
                <p className="ls-empty">No files were shared in this session.</p>
              ) : (
                data.files.map((f) => (
                  <div className="gs-file" key={f.id}>
                    <span className={"gs-file__kind gs-file__kind--" + kindOf(f.name).toLowerCase()}>
                      {kindOf(f.name)}
                    </span>
                    <span className="gs-file__meta">
                      <strong>{f.name}</strong>
                      <small>
                        {((f.size_bytes || 0) / 1_048_576).toFixed(1)} MB · {f.uploaded_by} · expires in{" "}
                        {expiresIn(f.expires_at)}
                      </small>
                    </span>
                    <span className="gs-file__actions">
                      <a href={f.url} download target="_blank" rel="noreferrer" className="gs-file__btn" title="Download">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                      </a>
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="ls-notes">
              <div className="ls-card-title">Your notes</div>
              {data.my_note ? (
                <p className="ls-notes-body">{data.my_note}</p>
              ) : (
                <p className="ls-notes-body ls-notes-body--empty">You didn&rsquo;t take any notes in this session.</p>
              )}
              <div className="ls-notes-actions">
                <button type="button" className="ls-link" onClick={downloadTranscript}>Download chat transcript</button>
              </div>
            </div>
          </div>

          <div className="ls-side">
            <div className="ls-card">
              <div className="ls-card-title">How was the session?</div>
              <div className="ls-stars">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    className="ls-star-btn"
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHoverRating(n)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`${n} star${n === 1 ? "" : "s"}`}
                  >
                    <IcStar width={26} height={26} off={(hoverRating || rating) < n} />
                  </button>
                ))}
              </div>
              <textarea
                className="ls-review-input"
                placeholder="Anything the teacher should know? (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
              {reviewError && <p className="ls-review-error">{reviewError}</p>}
              <button
                type="button"
                className="ls-btn ls-btn--primary ls-btn--block"
                onClick={submitReview}
                disabled={reviewBusy}
              >
                {reviewSent ? "Update review" : reviewBusy ? "Sending…" : "Send review"}
              </button>
              {reviewSent && !reviewBusy && <p className="ls-review-thanks">Thanks for your feedback.</p>}
            </div>

            <NextStepCard session={session} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
