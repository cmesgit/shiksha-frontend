/**
 * PLACEMENT: src/pages/ExpertProfilePage.jsx
 * ACTION:    Replace the entire file.
 *
 * Fixes from original:
 *
 * FIX 1 — Messaging goes to the real WS chat, not the dead REST model.
 *   OLD: POST /skill/conversations/ → skills.Conversation (REST-only, no WS).
 *        Thread never appears in the student dashboard SkillMessages inbox.
 *   NEW: After the first message is sent via REST (which is fine as a one-off
 *        first contact), redirect the student to APP_URL/skill-messages with
 *        the expert's TeacherProfile UUID in the query string. The student app
 *        reads that on landing and opens the live WS DM immediately.
 *        expert.teacher_profile_id is now in the API response (serializers.py fix).
 *
 * FIX 2 — Post-enroll redirect was pointing at "/app/skill" (doesn't exist).
 *   OLD: navigate("/app/skill")
 *   NEW: window.location.href = APP_URL + "/" (student dashboard root, which
 *        shows the Skill Dev section when activeTrack === "skill")
 */
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/apiClient";
import { APP_URL } from "../config/urls";
import "./ExpertProfilePage.css";

const rupees = (p) => p === 0 ? "Free" : `₹${Math.round(p / 100)}`;
const initials = (n) => (n || "?").trim().split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();
const starsEl = (r, size = 14) => (
  <span style={{ letterSpacing: 2, fontSize: size }}>
    {"★".repeat(Math.round(r || 0))}{"☆".repeat(5 - Math.round(r || 0))}
  </span>
);
const formatDate = (d) => d ? new Date(d).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "";

/* ── Auth-gate modal ─────────────────────────────────────────────────── */
function AuthGateModal({ action, expertName, onClose }) {
  const navigate = useNavigate();
  const location = typeof window !== "undefined" ? window.location.pathname + window.location.search : "";
  return (
    <div className="ep-gate-overlay" onClick={onClose}>
      <div className="ep-gate-card" onClick={e => e.stopPropagation()}>
        <button className="ep-gate-close" onClick={onClose}>✕</button>
        <div className="ep-gate-icon">🔒</div>
        <h3>Sign in to {action === "message" ? "message" : "book a session with"} {expertName}</h3>
        <p>Create a free account or log in — it takes less than a minute.</p>
        <button className="ep-btn ep-btn--primary ep-btn--wide"
          onClick={() => navigate(`/signup?next=${encodeURIComponent(location)}&action=${action}`)}>
          Create free account
        </button>
        <button className="ep-btn ep-btn--ghost ep-btn--wide" style={{ marginTop: 8 }}
          onClick={() => navigate(`/login?next=${encodeURIComponent(location)}&action=${action}`)}>
          I already have an account
        </button>
      </div>
    </div>
  );
}

/* ── Inline message composer ─────────────────────────────────────────── */
// Sends the first message via REST (skill/conversations/ — fine for initial
// contact), then redirects to the student app's SkillMessages page with
// teacherProfileId in the query string. SkillMessages reads that and opens
// the live WS DM immediately so the conversation continues in real time.
function MessageComposer({ expertId, teacherProfileId, expertName, onSent }) {
  const [body, setBody]       = useState("");
  const [sending, setSending] = useState(false);
  const [err, setErr]         = useState("");
  const textRef = useRef(null);

  useEffect(() => { textRef.current?.focus(); }, []);

  const send = async () => {
    if (!body.trim()) return;
    setSending(true); setErr("");
    try {
      // Send the first message via the skills REST endpoint
      const convRes = await api.post("/skill/conversations/", { expert: expertId });
      await api.post(`/skill/conversations/${convRes.data.id}/messages/`, { body: body.trim() });
      onSent();

      // Redirect to student app's SkillMessages with this expert pre-selected.
      // teacherProfileId = TeacherProfile UUID — what StartDirectView needs to
      // open the WS chat thread. The student app reads ?teacherProfileId= on
      // mount and calls ChatAPI.startDirect("TEACHER", teacherProfileId).
      if (teacherProfileId) {
        const dest = `${APP_URL}/skill-messages?teacherProfileId=${teacherProfileId}&expertName=${encodeURIComponent(expertName)}`;
        setTimeout(() => { window.location.href = dest; }, 1200);
      }
    } catch (e) {
      setErr(e?.response?.data?.detail || "Could not send. Try again.");
    } finally { setSending(false); }
  };

  return (
    <div className="ep-composer">
      <div className="ep-composer__head">Message {expertName}</div>
      <textarea ref={textRef} className="ep-composer__input" rows={4} value={body}
        onChange={e => setBody(e.target.value)}
        placeholder={`Hi ${expertName.split(" ")[0]}, I'd like to…`} />
      {err && <div className="ep-composer__err">{err}</div>}
      <button className="ep-btn ep-btn--primary ep-btn--wide" onClick={send} disabled={sending || !body.trim()}>
        {sending ? "Sending…" : "Send message"}
      </button>
    </div>
  );
}

/* ── Review card ─────────────────────────────────────────────────────── */
function ReviewCard({ r }) {
  return (
    <div className="ep-review">
      <div className="ep-review__head">
        <span className="ep-review__av">{(r.reviewer || "?")[0]}</span>
        <div>
          <div className="ep-review__name">{r.reviewer}</div>
          <div className="ep-review__date">{formatDate(r.created_at)}</div>
        </div>
        <div className="ep-review__stars" style={{ marginLeft: "auto", color: "#ff8f01" }}>{starsEl(r.rating)}</div>
      </div>
      {r.body && <p className="ep-review__body">"{r.body}"</p>}
    </div>
  );
}

/* ── Course card ─────────────────────────────────────────────────────── */
function CourseCard({ course, onEnroll }) {
  return (
    <div className="ep-course-card">
      {course.cover && <img className="ep-course-card__img" src={course.cover} alt="" />}
      <div className="ep-course-card__body">
        <div className="ep-course-card__title">{course.title}</div>
        <div className="ep-course-card__meta">{course.level} · {course.lecture_count} lectures</div>
        <div className="ep-course-card__foot">
          <span className="ep-course-card__price">{rupees(course.price)}</span>
          <button className="ep-btn ep-btn--sm" onClick={() => onEnroll(course)}>
            {course.price === 0 ? "Enroll free" : "Buy"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════ MAIN ═══════════ */
export default function ExpertProfilePage() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const [sp]     = useSearchParams();
  const { isAuthenticated } = useAuth();

  const [expert, setExpert]   = useState(null);
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr]         = useState("");
  const [activeTab, setTab]   = useState("about");
  const [gate, setGate]       = useState(null);     // "message" | "book" | null
  const [msgSent, setMsgSent] = useState(false);
  const [showComposer, setShowComposer] = useState(false);

  // If the user returns from signup with ?action=message, auto-open composer
  useEffect(() => {
    if (isAuthenticated && sp.get("action") === "message") setShowComposer(true);
    if (isAuthenticated && sp.get("action") === "book")    setTab("book");
  }, [isAuthenticated, sp]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get(`/skill/teachers/${id}/`).then(r => r.data),
      api.get("/skill/courses/").then(r => (Array.isArray(r.data) ? r.data : r.data.results || []).filter(c => c.teacher_id === id)),
      api.get(`/skill/teachers/${id}/reviews/`).then(r => r.data?.reviews || []),
    ]).then(([ep, cs, rv]) => { setExpert(ep); setCourses(cs); setReviews(rv); })
      .catch(() => setErr("Expert profile not found."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleMessageClick = () => {
    if (!isAuthenticated) { setGate("message"); return; }
    setShowComposer(true);
  };

  const handleBookClick = () => {
    if (!isAuthenticated) { setGate("book"); return; }
    setTab("book");
  };

  const handleBookSession = async (note) => {
    try {
      await api.post("/skill/payments/create-order/", { teacherId: id, draft: note });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e?.response?.data?.detail || "Could not book." };
    }
  };

  const handleEnrollCourse = async (course) => {
    if (!isAuthenticated) { navigate(`/login?next=/experts/${id}&action=enroll`); return; }
    try {
      await api.post(`/skill/courses/${course.id}/enroll/`, {});
      // FIX 2: was navigate("/app/skill") — that path doesn't exist.
      // Redirect to student dashboard root; Skill Dev shows when activeTrack === "skill".
      window.location.href = APP_URL + "/";
    } catch (e) {
      alert(e?.response?.data?.detail || "Could not enroll.");
    }
  };

  if (loading) return <div className="ep-loading">Loading…</div>;
  if (err || !expert) return <div className="ep-loading">{err || "Expert not found."}</div>;

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div className="ep-page">
      {/* ── Hero ── */}
      <div className="ep-hero">
        <div className="ep-hero__inner">
          <button className="ep-back" onClick={() => navigate("/skill/browse")}>← All teachers</button>
          <div className="ep-hero__card">
            <div className="ep-hero__photo">
              {expert.img
                ? <img src={expert.img} alt={expert.name} />
                : <span className="ep-hero__initials">{initials(expert.name)}</span>}
              {expert.badges?.includes("Verified") && <span className="ep-verified">✓ Verified</span>}
            </div>
            <div className="ep-hero__info">
              <div className="ep-hero__label">Expert · {expert.cat}</div>
              <h1 className="ep-hero__name">{expert.name}</h1>
              <p className="ep-hero__title">{expert.title}</p>
              <div className="ep-tags">{expert.skills?.map(s => <span key={s} className="ep-tag">{s}</span>)}</div>
              <div className="ep-stats">
                <div className="ep-stat">
                  <div className="ep-stat__val">
                    {avgRating ? <span style={{ color: "#ff8f01" }}>{starsEl(avgRating, 16)} {avgRating}</span> : "—"}
                  </div>
                  <div className="ep-stat__label">Rating ({reviews.length})</div>
                </div>
                <div className="ep-stat">
                  <div className="ep-stat__val">{expert.sessions ?? 0}</div>
                  <div className="ep-stat__label">Sessions</div>
                </div>
                <div className="ep-stat">
                  <div className="ep-stat__val">{expert.rate === 0 ? "Free" : `₹${expert.rate}`}</div>
                  <div className="ep-stat__label">per session</div>
                </div>
                <div className="ep-stat">
                  <div className="ep-stat__val" style={{ fontSize: 13 }}>{expert.availability || "Flexible"}</div>
                  <div className="ep-stat__label">Available</div>
                </div>
              </div>
              <div className="ep-ctas">
                {showComposer ? null : (
                  <button className="ep-btn ep-btn--ghost" onClick={handleMessageClick}>💬 Message</button>
                )}
                <button className="ep-btn ep-btn--primary" onClick={handleBookClick}>📅 Book a session</button>
              </div>
            </div>
          </div>

          {/* Inline composer — passes teacher_profile_id for WS redirect */}
          {showComposer && !msgSent && (
            <MessageComposer
              expertId={id}
              teacherProfileId={expert.teacher_profile_id}
              expertName={expert.name}
              onSent={() => { setMsgSent(true); setShowComposer(false); }}
            />
          )}
          {msgSent && (
            <div className="ep-msg-sent">
              ✓ Message sent! Taking you to your messages…
            </div>
          )}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="ep-tabs">
        {[
          { key: "about",   label: "About" },
          { key: "courses", label: `Courses (${courses.length})` },
          { key: "reviews", label: `Reviews (${reviews.length})` },
          { key: "book",    label: "Book session" },
        ].map(t => (
          <button key={t.key} className={`ep-tabBtn ${activeTab === t.key ? "on" : ""}`}
            onClick={() => setTab(t.key)}>{t.label}</button>
        ))}
      </div>

      <div className="ep-body">
        {activeTab === "about" && (
          <div className="ep-about">
            <section className="ep-section">
              <h2>About {expert.name.split(" ")[0]}</h2>
              <p>{expert.bio || "No bio available."}</p>
            </section>
            <section className="ep-section">
              <h2>How sessions work</h2>
              <ul>
                <li>One-on-one sessions via video call or in person.</li>
                <li>First session is a free 15-min intro — see if we click.</li>
                <li>I'll share a personalised plan after our intro call.</li>
                <li>Reschedule any time up to 12 hours before the session.</li>
              </ul>
            </section>
          </div>
        )}

        {activeTab === "courses" && (
          <section className="ep-section">
            <h2>Courses by {expert.name.split(" ")[0]}</h2>
            {courses.length === 0
              ? <p className="ep-empty">No courses published yet.</p>
              : <div className="ep-courses-grid">{courses.map(c => <CourseCard key={c.id} course={c} onEnroll={handleEnrollCourse} />)}</div>}
          </section>
        )}

        {activeTab === "reviews" && (
          <section className="ep-section">
            <h2>Student reviews</h2>
            {reviews.length === 0
              ? <p className="ep-empty">No reviews yet — be the first!</p>
              : <div className="ep-reviews">{reviews.map(r => <ReviewCard key={r.id} r={r} />)}</div>}
          </section>
        )}

        {activeTab === "book" && (
          isAuthenticated
            ? <BookForm expert={expert} onBook={handleBookSession} />
            : <div className="ep-book-card">
                <h2>Sign in to book a session</h2>
                <p style={{ color: "#6b7280" }}>Create a free account — it only takes a minute.</p>
                <button className="ep-btn ep-btn--primary ep-btn--wide"
                  onClick={() => navigate(`/signup?next=/experts/${id}&action=book`)}>
                  Create free account
                </button>
              </div>
        )}
      </div>

      {gate && <AuthGateModal action={gate} expertName={expert.name} onClose={() => setGate(null)} />}
    </div>
  );
}

function BookForm({ expert, onBook }) {
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg]   = useState("");
  const submit = async () => {
    setBusy(true); setMsg("");
    const r = await onBook(note);
    setMsg(r.ok ? "✓ Session requested! Check your dashboard for details." : r.error);
    if (r.ok) setNote("");
    setBusy(false);
  };
  return (
    <div className="ep-book-card">
      <h2>Book a session with {expert.name.split(" ")[0]}</h2>
      <div className="ep-book-price">{expert.rate === 0 ? "Free for now" : `₹${expert.rate} per session`}</div>
      <label className="ep-book-label">What do you want to work on?</label>
      <textarea className="ep-book-note" rows={4} value={note}
        placeholder="e.g. I want to improve my Python skills, especially around data structures…"
        onChange={e => setNote(e.target.value)} />
      {msg && <div className={`ep-book-msg ${msg.startsWith("✓") ? "ok" : "err"}`}>{msg}</div>}
      <button className="ep-btn ep-btn--primary ep-btn--wide" onClick={submit} disabled={busy}>
        {busy ? "Requesting…" : "Request session"}
      </button>
    </div>
  );
}
