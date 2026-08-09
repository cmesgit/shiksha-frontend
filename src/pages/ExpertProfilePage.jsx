/**
 * PLACEMENT: src/pages/ExpertProfilePage.jsx
 * ACTION:    Replace the entire file.
 *
 * Fixes from original:
 *
 * FIX 1 — Messaging goes to the real WS chat, not the dead REST model.
 *   OLD: POST /skill/conversations/ → skills.Conversation (REST-only, DELETED).
 *        404s now; the message was never delivered.
 *   NEW: No REST send (the chat app is WS-only). The composer hands off to the
 *        student app's SkillMessages inbox with the expert's TeacherProfile UUID
 *        and the typed draft in the query string:
 *          APP_URL/skill-messages?teacherProfileId=<id>&expertName=<n>&draft=<text>
 *        SkillMessages opens the live WS DM (ChatAPI.startDirect("TEACHER", id))
 *        and pre-fills the draft. expert.teacher_profile_id comes from the
 *        /skill/teachers/<id>/ response (serializers.py).
 *
 * FIX 2 — Post-enroll redirect was pointing at "/app/skill" (doesn't exist).
 *   OLD: navigate("/app/skill")
 *   NEW: window.location.href = APP_URL + "/" (student dashboard root, which
 *        shows the Skill Dev section when activeTrack === "skill")
 */
import { useState, useEffect, useRef, Fragment } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/apiClient";
import { APP_URL } from "../config/urls";
import { fetchAvailability } from "../api/skillApi";
import { SDAvail } from "../components/skill/availability";
import { RatingStars } from "../components/skill/RatingStars";
import "./ExpertProfilePage.css";

const rupees = (p) => p === 0 ? "Free" : `₹${Math.round(p / 100)}`;
const initials = (n) => (n || "?").trim().split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();
// Stars fill to the EXACT average — see components/skill/RatingStars.jsx.
// The old `"★".repeat(Math.round(r))` here drew 4.6 and 4.9 identically.
const starsEl = (r, size = 14) => <RatingStars value={r} size={size} />;
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
// Messaging is delivered over the live WebSocket chat (the `chat` app), which
// has NO REST send — so we do NOT post the message here. Instead we hand off to
// the student app's SkillMessages inbox, carrying the expert's TeacherProfile
// UUID and the typed draft in the query string. SkillMessages opens the WS DM
// (ChatAPI.startDirect("TEACHER", teacherProfileId)) and pre-fills the draft so
// the learner sends it in real time. (The old POST /skill/conversations/ route
// was deleted along with the skills messaging model.)
function MessageComposer({ teacherProfileId, expertName, onSent }) {
  const [body, setBody]       = useState("");
  const [sending, setSending] = useState(false);
  const [err, setErr]         = useState("");
  const textRef = useRef(null);

  useEffect(() => { textRef.current?.focus(); }, []);

  const send = () => {
    if (!body.trim()) return;
    if (!teacherProfileId) {
      setErr("This expert can't be messaged yet. Please try booking instead.");
      return;
    }
    setSending(true); setErr("");
    onSent();
    // Carry the draft to the student app's live inbox.
    const dest =
      `${APP_URL}/skill-messages` +
      `?teacherProfileId=${encodeURIComponent(teacherProfileId)}` +
      `&expertName=${encodeURIComponent(expertName)}` +
      `&draft=${encodeURIComponent(body.trim())}`;
    setTimeout(() => { window.location.href = dest; }, 600);
  };

  return (
    <div className="ep-composer">
      <div className="ep-composer__head">Message {expertName}</div>
      <textarea ref={textRef} className="ep-composer__input" rows={4} value={body}
        onChange={e => setBody(e.target.value)}
        placeholder={`Hi ${expertName.split(" ")[0]}, I'd like to…`} />
      {err && <div className="ep-composer__err">{err}</div>}
      <button className="ep-btn ep-btn--primary ep-btn--wide" onClick={send} disabled={sending || !body.trim()}>
        {sending ? "Opening messages…" : "Continue in messages"}
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

  const handleBookSession = async (draft) => {
    try {
      // `listing` is WHICH skill is being booked — a multi-skill expert prices
      // each one separately, and the backend charges the listing's price.
      const { data } = await api.post("/skill/payments/create-order/", {
        teacherId: id, listing: draft.listing || null, draft,
      });
      return { ok: true, status: data?.status || "requested" };
    } catch (e) {
      return { ok: false, error: e?.response?.data?.detail || e?.response?.data?.slot || "Could not book." };
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

          {/* Inline composer — hands off to the app's live WS inbox */}
          {showComposer && !msgSent && (
            <MessageComposer
              teacherProfileId={expert.teacher_profile_id}
              expertName={expert.name}
              onSent={() => { setMsgSent(true); setShowComposer(false); }}
            />
          )}
          {msgSent && (
            <div className="ep-msg-sent">
              ✓ Taking you to your messages…
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
            ? <BookForm expert={expert} onBook={handleBookSession} initialListing={sp.get("listing")} />
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

function SlotGrid({ avail, selected, onPick }) {
  const ACC = "#13899b";
  return (
    <div>
      <div style={{ display: "flex", gap: 14, fontSize: 11, color: "#6b7280", margin: "6px 0 10px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><i style={{ width: 11, height: 11, borderRadius: 3, background: ACC, display: "inline-block" }} /> Open</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><i style={{ width: 11, height: 11, borderRadius: 3, background: "#f0a23b", display: "inline-block" }} /> Booked</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><i style={{ width: 11, height: 11, borderRadius: 3, background: "#eee", display: "inline-block" }} /> Closed</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `52px repeat(${SDAvail.DAYS.length}, 1fr)`, gap: 5, alignItems: "center" }}>
        <div />
        {SDAvail.DAYS.map(d => <div key={d} style={{ fontSize: 10.5, fontWeight: 700, color: "#6b7280", textAlign: "center" }}>{d}</div>)}
        {SDAvail.SLOTS.map((sl, si) => (
          <Fragment key={sl}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9aa9af", textAlign: "right", paddingRight: 4 }}>{sl}</div>
            {SDAvail.DAYS.map((d, di) => {
              const k = di + "-" + si;
              const booked = (avail.booked || []).includes(k);
              const open   = (avail.open || []).includes(k);
              const isSel  = selected === k;
              const clickable = open && !booked;
              const bg = booked ? "#f0a23b" : open ? (isSel ? ACC : "rgba(19,137,155,.18)") : "#f1f1f1";
              return (
                <button key={k} type="button" disabled={!clickable}
                  onClick={() => clickable && onPick(k)}
                  title={booked ? "Already booked" : open ? SDAvail.label(k) : "Closed"}
                  style={{ height: 26, borderRadius: 6, border: isSel ? `2px solid ${ACC}` : "1px solid #e3e3e3", background: bg, cursor: clickable ? "pointer" : "default", padding: 0 }} />
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function BookForm({ expert, onBook, initialListing }) {
  // Multi-skill: an expert can publish several separately-priced offerings.
  // The directory's "Choose a skill" button arrives here with ?listing=<id>.
  const listings = (expert.listings || []).filter(l => l.is_active && !l.is_suspended);
  const [listingId, setListingId] = useState(
    () => (listings.some(l => l.id === initialListing) ? initialListing : listings[0]?.id) || ""
  );
  const listing = listings.find(l => l.id === listingId) || null;

  const [note, setNote] = useState("");
  const [slot, setSlot] = useState(null);
  const [dur,  setDur]  = useState(60);
  const [avail, setAvail] = useState({ open: [], booked: [] });
  const [availLoaded, setAvailLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg]   = useState("");
  const [done, setDone] = useState(false);

  // Load the expert's REAL published availability (same record the expert edits
  // and the student app reads). Empty until loaded / if the expert set none.
  useEffect(() => {
    let alive = true;
    fetchAvailability(expert.id).then(r => {
      if (!alive) return;
      setAvail(r); setAvailLoaded(true);
    });
    return () => { alive = false; };
  }, [expert.id]);

  const hasOpen = (avail.open || []).length > 0;
  const first   = (expert.name || "").split(" ")[0];

  const submit = async () => {
    if (hasOpen && !slot) { setMsg("Please pick an available slot above."); return; }
    setBusy(true); setMsg("");
    const draft = {
      topic:         note || `${listing?.title || "1-on-1 session"} with ${expert.name}`,
      note,
      listing:       listingId || null,
      slot,
      slotLabel:     slot ? SDAvail.label(slot) : null,
      duration_mins: dur,
    };
    const r = await onBook(draft);
    if (r.ok) setDone(true);
    else setMsg(r.error || "Could not book.");
    setBusy(false);
  };

  if (done) {
    return (
      <div className="ep-book-card">
        <h2>Request sent to {first} 🎉</h2>
        <p style={{ color: "#6b7280", lineHeight: 1.6 }}>
          {first} will review your request and confirm the slot. Once it's accepted,
          you'll be able to join the session from your dashboard.
        </p>
        <button className="ep-btn ep-btn--primary ep-btn--wide"
          onClick={() => { window.location.href = APP_URL + "/skill-dev/sessions"; }}>
          Go to my dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="ep-book-card">
      <h2>Book a session with {first}</h2>

      {listings.length > 1 && (
        <>
          <label className="ep-book-label" htmlFor="ep-listing">Which skill?</label>
          <select id="ep-listing" value={listingId} onChange={e => setListingId(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d7e3e5", fontSize: 14, marginBottom: 12 }}>
            {listings.map(l => (
              <option key={l.id} value={l.id}>
                {l.title} — {l.price_rupees === 0 ? "Free" : `₹${l.price_rupees}`}
              </option>
            ))}
          </select>
        </>
      )}

      {(() => {
        // The listing's price is what the backend actually charges; the
        // profile's legacy `rate` is only the fallback for an expert who has
        // no listing yet.
        const price = listing ? listing.price_rupees : expert.rate;
        return <div className="ep-book-price">{price === 0 ? "Free for now" : `₹${price} per session`}</div>;
      })()}

      <label className="ep-book-label">Pick a time · this week</label>
      {!availLoaded ? (
        <div style={{ fontSize: 13, color: "#6b7280", padding: "8px 0" }}>Loading availability…</div>
      ) : !hasOpen ? (
        <div style={{ fontSize: 13, color: "#b46a00", background: "rgba(255,143,1,.08)", border: "1px solid rgba(255,143,1,.25)", borderRadius: 10, padding: "10px 12px" }}>
          {first} hasn't published open slots yet. You can still send a request and agree a time over chat.
        </div>
      ) : (
        <SlotGrid avail={avail} selected={slot} onPick={setSlot} />
      )}

      <label className="ep-book-label" style={{ marginTop: 14, display: "block" }}>Duration</label>
      <select value={dur} onChange={e => setDur(+e.target.value)}
        style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d7e3e5", fontSize: 14 }}>
        <option value={60}>1 hour</option>
        <option value={90}>1.5 hours</option>
        <option value={120}>2 hours</option>
      </select>

      <label className="ep-book-label" style={{ marginTop: 14, display: "block" }}>What do you want to work on?</label>
      <textarea className="ep-book-note" rows={4} value={note}
        placeholder="e.g. I want to improve my Python skills, especially around data structures…"
        onChange={e => setNote(e.target.value)} />

      {msg && <div className={`ep-book-msg ${msg.startsWith("✓") ? "ok" : "err"}`}>{msg}</div>}
      <button className="ep-btn ep-btn--primary ep-btn--wide" onClick={submit}
        disabled={busy || (hasOpen && !slot)}>
        {busy ? "Requesting…" : (hasOpen && !slot) ? "Pick a slot to continue" : "Request session"}
      </button>
    </div>
  );
}
