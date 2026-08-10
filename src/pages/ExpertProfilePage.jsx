/**
 * PLACEMENT: src/pages/ExpertProfilePage.jsx
 * ACTION:    Replace the entire file.
 *
 * Redesign (2026-08-09) — brings this page onto the same --sk-* design
 * system as the directory redesign (SkillBrowsePage/ExpertRow/FilterSidebar):
 * textured hero + sticky dark booking panel, a "Skills & pricing" section for
 * multi-listing experts, an honest review-distribution breakdown (the backend
 * already returns `distribution`/`topic`/`is_edited`/`created_at` — this page
 * just wasn't reading them), a styled listing picker + slot grid instead of
 * inline styles, and a sidebar (About/Reviews) with a mini availability
 * heatmap + recent reviews. Booking logic itself (multi-listing selection,
 * slot validation, listing-priced order creation) is unchanged — verified
 * correct before this pass; only presentation changed.
 *
 * Fixes carried over from the prior version:
 *
 * FIX 1 — Messaging goes to the real WS chat, not the dead REST model.
 *   NEW: No REST send (the chat app is WS-only). The composer hands off to the
 *        student app's SkillMessages inbox with the expert's TeacherProfile UUID
 *        and the typed draft in the query string.
 *
 * FIX 2 — Post-enroll redirect goes to the student dashboard root, not the
 *   dead "/app/skill" path.
 */
import { useState, useEffect, useRef, useMemo, Fragment } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/apiClient";
import { APP_URL } from "../config/urls";
import { fetchAvailability } from "../api/skillApi";
import { SDAvail } from "../components/skill/availability";
import { RatingStars, RatingSummary, MIN_REVIEWS } from "../components/skill/RatingStars";
import ReviewList, { RatingBreakdown } from "../components/skill/ReviewList";
import "./ExpertProfilePage.css";

const rupees = (p) => p === 0 ? "Free" : `₹${Math.round(p / 100)}`;
const initials = (n) => (n || "?").trim().split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();
const MODE_TEXT = { online: "Online only", home: "At the teacher's place", travel: "Travels to the learner" };

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

/* ── Mini weekly-availability heatmap (sidebar) ──────────────────────── */
function AvailHeatmap({ avail }) {
  return (
    <div className="ep-heatmap">
      <div className="ep-heatmap__grid">
        <div />
        {SDAvail.DAYS.map(d => <div key={d} className="ep-heatmap__day">{d.split(" ")[0]}</div>)}
        {SDAvail.SLOTS.map((sl, si) => (
          <Fragment key={sl}>
            <div className="ep-heatmap__slot">{sl}</div>
            {SDAvail.DAYS.map((d, di) => {
              const k = `${di}-${si}`;
              const booked = (avail.booked || []).includes(k);
              const open   = (avail.open || []).includes(k);
              return <span key={k} className={`ep-heatmap__cell${booked ? " booked" : open ? " open" : ""}`} />;
            })}
          </Fragment>
        ))}
      </div>
      <div className="ep-heatmap__legend">
        <span><i className="on" /> Open</span>
        <span><i className="booked" /> Booked</span>
        <span><i /> Closed</span>
      </div>
    </div>
  );
}

/* ── Sidebar — About/Reviews tabs ────────────────────────────────────── */
function ProfileSidebar({ avail, availLoaded, isAuthenticated, reviews, onSeeAllReviews }) {
  return (
    <aside className="ep-sidebar">
      <div className="ep-sidebar__card">
        <h3>This week's availability</h3>
        {!isAuthenticated
          ? <p className="ep-empty">Sign in to see real-time availability.</p>
          : availLoaded ? <AvailHeatmap avail={avail} /> : <p className="ep-empty">Loading…</p>}
      </div>
      {reviews.length > 0 && (
        <div className="ep-sidebar__card">
          <h3>Recent reviews</h3>
          <div className="ep-sidebar__reviews">
            {reviews.slice(0, 3).map(r => (
              <div key={r.id} className="ep-sidebar__review">
                <RatingStars value={r.rating} size={12} />
                <p>"{(r.body || "").slice(0, 90)}{(r.body || "").length > 90 ? "…" : ""}"</p>
              </div>
            ))}
          </div>
          <button className="ep-sidebar__more" onClick={onSeeAllReviews}>All {reviews.length} reviews →</button>
        </div>
      )}
    </aside>
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
  const [distribution, setDistribution] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, setErr]         = useState("");
  const [activeTab, setTab]   = useState("about");
  const [gate, setGate]       = useState(null);     // "message" | "book" | null
  const [msgSent, setMsgSent] = useState(false);
  const [showComposer, setShowComposer] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  // Availability is fetched once here (not inside BookForm) so the sidebar's
  // mini heatmap and the Book tab's slot grid share the same real data / one
  // network call instead of loading it twice.
  const [avail, setAvail] = useState({ open: [], booked: [] });
  const [availLoaded, setAvailLoaded] = useState(false);

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
      api.get(`/skill/teachers/${id}/reviews/`).then(r => r.data || {}),
    ]).then(([ep, cs, rv]) => {
      setExpert(ep); setCourses(cs);
      setReviews(rv.reviews || []); setDistribution(rv.distribution || {});
    })
      .catch(() => setErr("Expert profile not found."))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    // The availability endpoint requires auth (IsAuthenticated) — only fetch
    // once signed in, or an anonymous visitor's 401 trips the global axios
    // interceptor and hard-redirects them off the profile page entirely.
    if (!isAuthenticated) return;
    let alive = true;
    fetchAvailability(id).then(r => { if (alive) { setAvail(r); setAvailLoaded(true); } });
    return () => { alive = false; };
  }, [id, isAuthenticated]);

  const handleMessageClick = () => {
    if (!isAuthenticated) { setGate("message"); return; }
    setShowComposer(true);
  };

  const handleBookClick = (listingId) => {
    if (!isAuthenticated) { setGate("book"); return; }
    if (listingId) setPreselectedListing(listingId);
    setTab("book");
  };

  const [preselectedListing, setPreselectedListing] = useState(null);

  const handleBookSession = async (draft) => {
    try {
      const { data } = await api.post("/skill/payments/create-order/", {
        teacherId: id, listing: draft.listing || null, draft,
      });
      return {
        ok: true,
        status: data?.status || "requested",
        bookingId: data?.bookingId || null,
        amountRupees: data?.amount_rupees ?? null,
        payTo: data?.pay_to || null,
      };
    } catch (e) {
      return { ok: false, error: e?.response?.data?.detail || e?.response?.data?.slot || "Could not book." };
    }
  };

  const handleEnrollCourse = async (course) => {
    if (!isAuthenticated) { navigate(`/login?next=/experts/${id}&action=enroll`); return; }
    try {
      await api.post(`/skill/courses/${course.id}/enroll/`, {});
      window.location.href = APP_URL + "/";
    } catch (e) {
      alert(e?.response?.data?.detail || "Could not enroll.");
    }
  };

  const newestReviews = useMemo(
    () => [...reviews].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
    [reviews]
  );

  if (loading) return <div className="ep-loading">Loading…</div>;
  if (err || !expert) return <div className="ep-loading">{err || "Expert not found."}</div>;

  const reviewsCount = reviews.length;
  const avgRating = reviewsCount
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviewsCount
    : 0;

  const listings = (expert.listings || []).filter(l => l.is_active && !l.is_suspended);
  const pausedListings = (expert.listings || []).filter(l => !l.is_active && !l.is_suspended);
  const multi = listings.length > 1;
  const primaryListing = listings[0] || null;
  const heroPrice = primaryListing ? primaryListing.price_rupees : expert.rate;
  const locationLine = expert.class_mode === "online"
    ? MODE_TEXT.online
    : [expert.class_location, MODE_TEXT[expert.class_mode]].filter(Boolean).join(" · ");

  return (
    <div className="ep-page">
      {/* ── Hero ── */}
      <div className="ep-hero">
        <span className="ep-hero__grid" aria-hidden="true" />
        <span className="ep-hero__glow ep-hero__glow--1" aria-hidden="true" />
        <span className="ep-hero__glow ep-hero__glow--2" aria-hidden="true" />
        <div className="ep-hero__inner">
          <button className="ep-back" onClick={() => navigate("/skill/browse")}>← All teachers</button>
          <div className="ep-hero__card">
            {/* Col 1 — photo + badges */}
            <div className="ep-hero__col1">
              <div className="ep-hero__photo">
                {expert.img
                  ? <img src={expert.img} alt={expert.name} />
                  : <span className="ep-hero__initials">{initials(expert.name)}</span>}
                {expert.intro_video_embed_url && (
                  <button type="button" className="ep-hero__introBtn" onClick={() => setShowIntro(v => !v)}>
                    <i>▶</i> Watch intro
                  </button>
                )}
              </div>
              <div className="ep-hero__badges">
                {expert.badges?.includes("Verified")  && <span className="er-badge er-badge--verified">✓ Verified</span>}
                {expert.badges?.includes("Top-rated") && <span className="er-badge er-badge--top">TOP RATED</span>}
              </div>
              {showIntro && expert.intro_video_embed_url && (
                <div className="ep-hero__introFrame">
                  <iframe src={expert.intro_video_embed_url} title="Intro video" allow="autoplay; fullscreen" />
                </div>
              )}
            </div>

            {/* Col 2 — identity + stats */}
            <div className="ep-hero__col2">
              <div className="ep-hero__label">Expert · {expert.cat}</div>
              <h1 className="ep-hero__name">{expert.name}</h1>
              <p className="ep-hero__title">{expert.title}</p>
              <div className="ep-tags">{expert.skills?.map(s => <span key={s} className="ep-tag">{s}</span>)}</div>

              <div className="ep-stats">
                <div className="ep-stat">
                  <div className="ep-stat__val">
                    {reviewsCount >= MIN_REVIEWS ? avgRating.toFixed(1) : "—"}
                  </div>
                  <div className="ep-stat__label">Rating ({reviewsCount})</div>
                </div>
                <div className="ep-stat">
                  <div className="ep-stat__val">{expert.sessions ?? 0}</div>
                  <div className="ep-stat__label">Sessions</div>
                </div>
                <div className="ep-stat">
                  <div className="ep-stat__val">{expert.experience_years != null ? expert.experience_years : "—"}</div>
                  <div className="ep-stat__label">Years experience</div>
                </div>
                <div className="ep-stat">
                  <div className="ep-stat__val" style={{ fontSize: 13 }}>{(expert.languages || []).join(", ") || "—"}</div>
                  <div className="ep-stat__label">Languages</div>
                </div>
              </div>
            </div>

            {/* Col 3 — sticky dark booking panel */}
            <div className="ep-hero__col3">
              <div className="ep-panel">
                <div className="ep-panel__price">{heroPrice === 0 ? "Free" : `₹${heroPrice}`}</div>
                <div className="ep-panel__sub">{multi ? "from · per 60-min session" : "per 60-min session"}</div>
                <div className="ep-panel__chips">
                  {expert.open_slots_week != null && (
                    <span className={`ep-panel__chip${expert.open_slots_week > 0 ? " on" : ""}`}>
                      <i />{expert.open_slots_week > 0 ? `${expert.open_slots_week} open slots this week` : "No open slots this week"}
                    </span>
                  )}
                  {locationLine && <span className="ep-panel__chip">📍 {locationLine}</span>}
                  {expert.mastery_target && <span className="ep-panel__chip">🎯 {expert.mastery_target}</span>}
                </div>
                <button className="ep-btn ep-btn--primary ep-btn--wide" onClick={() => handleBookClick(null)}>
                  📅 Book a session
                </button>
                {!showComposer && (
                  <button className="ep-btn ep-btn--ghost ep-btn--wide" style={{ marginTop: 8 }} onClick={handleMessageClick}>
                    💬 Message
                  </button>
                )}
                <p className="ep-panel__hint">Free 15-min intro on your first session</p>
              </div>
            </div>
          </div>

          {showComposer && !msgSent && (
            <MessageComposer
              teacherProfileId={expert.teacher_profile_id}
              expertName={expert.name}
              onSent={() => { setMsgSent(true); setShowComposer(false); }}
            />
          )}
          {msgSent && <div className="ep-msg-sent">✓ Taking you to your messages…</div>}
        </div>
      </div>

      {/* ── Skills & pricing (multi-listing experts) ── */}
      {(multi || pausedListings.length > 0) && (
        <div className="ep-listings-wrap">
          <section className="ep-section ep-listings">
            <h2>Skills & pricing</h2>
            <div className="ep-listings__grid">
              {listings.map(l => (
                <button key={l.id} type="button" className="ep-listing-card" onClick={() => handleBookClick(l.id)}>
                  <div className="ep-listing-card__title">{l.title}</div>
                  <div className="ep-listing-card__tags">{(l.skill_tags || []).slice(0, 3).join(", ")}</div>
                  <div className="ep-listing-card__foot">
                    <RatingSummary value={Number(l.rating)} count={l.reviews_count} size={12} />
                    <b>{l.price_rupees === 0 ? "Free" : `₹${l.price_rupees}`}</b>
                  </div>
                  <span className="ep-listing-card__cta">Book this skill →</span>
                </button>
              ))}
              {pausedListings.map(l => (
                <div key={l.id} className="ep-listing-card ep-listing-card--paused">
                  <div className="ep-listing-card__title">{l.title}</div>
                  <div className="ep-listing-card__tags">Paused by the teacher</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

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
          <div className="ep-2col">
            <div className="ep-about">
              <section className="ep-section">
                <h2>About {expert.name.split(" ")[0]}</h2>
                <p>{expert.bio || "No bio available."}</p>
                {expert.education && <p className="ep-education">🎓 {expert.education}</p>}
              </section>

              {expert.experience_timeline?.length > 0 && (
                <section className="ep-section">
                  <h2>Background</h2>
                  <div className="ep-timeline">
                    {expert.experience_timeline.map((t, i) => (
                      <div key={i} className="ep-timeline__row">
                        <span className="ep-timeline__years">{t.years}</span>
                        <div>
                          <div className="ep-timeline__role">{t.role}</div>
                          {t.detail && <p className="ep-timeline__detail">{t.detail}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

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
            <ProfileSidebar avail={avail} availLoaded={availLoaded} isAuthenticated={isAuthenticated} reviews={newestReviews} onSeeAllReviews={() => setTab("reviews")} />
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
          <div className="ep-2col">
            <section className="ep-section">
              <RatingBreakdown
                average={reviewsCount >= MIN_REVIEWS ? avgRating : null}
                count={reviewsCount}
                distribution={distribution}
              />
              <ReviewList reviews={reviews} />
            </section>
            <ProfileSidebar avail={avail} availLoaded={availLoaded} isAuthenticated={isAuthenticated} reviews={newestReviews} onSeeAllReviews={() => {}} />
          </div>
        )}

        {activeTab === "book" && (
          isAuthenticated
            ? <BookForm expert={expert} onBook={handleBookSession} avail={avail} availLoaded={availLoaded}
                initialListing={preselectedListing || sp.get("listing")} />
            : <div className="ep-book-card">
                <h2>Sign in to book a session</h2>
                <p style={{ color: "var(--sk-body, #5e7469)" }}>Create a free account — it only takes a minute.</p>
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
  return (
    <div>
      <div className="ep-slot-legend">
        <span><i className="open" /> Open</span>
        <span><i className="booked" /> Booked</span>
        <span><i className="closed" /> Closed</span>
      </div>
      <div className="ep-slot-grid">
        <div />
        {SDAvail.DAYS.map(d => <div key={d} className="ep-slot-grid__day">{d}</div>)}
        {SDAvail.SLOTS.map((sl, si) => (
          <Fragment key={sl}>
            <div className="ep-slot-grid__time">{sl}</div>
            {SDAvail.DAYS.map((d, di) => {
              const k = di + "-" + si;
              const booked = (avail.booked || []).includes(k);
              const open   = (avail.open || []).includes(k);
              const isSel  = selected === k;
              const clickable = open && !booked;
              const cls = booked ? "booked" : open ? (isSel ? "selected" : "open") : "closed";
              return (
                <button key={k} type="button" disabled={!clickable}
                  onClick={() => clickable && onPick(k)}
                  title={booked ? "Already booked" : open ? SDAvail.label(k) : "Closed"}
                  className={`ep-slot ep-slot--${cls}`} />
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function BookForm({ expert, onBook, avail, availLoaded, initialListing }) {
  // Multi-skill: an expert can publish several separately-priced offerings.
  // The directory / skills-and-pricing section arrive here with a listing id.
  const listings = (expert.listings || []).filter(l => l.is_active && !l.is_suspended);
  const [listingId, setListingId] = useState(
    () => (listings.some(l => l.id === initialListing) ? initialListing : listings[0]?.id) || ""
  );
  useEffect(() => {
    if (initialListing && listings.some(l => l.id === initialListing)) setListingId(initialListing);
  }, [initialListing]); // eslint-disable-line react-hooks/exhaustive-deps
  const listing = listings.find(l => l.id === listingId) || null;

  const [note, setNote] = useState("");
  const [slot, setSlot] = useState(null);
  const [dur,  setDur]  = useState(60);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg]   = useState("");
  const [done, setDone] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const hasOpen = (avail.open || []).length > 0;
  const first   = (expert.name || "").split(" ")[0];
  const price   = listing ? listing.price_rupees : expert.rate;

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
    if (r.ok) { setConfirmation(r); setDone(true); }
    else setMsg(r.error || "Could not book.");
    setBusy(false);
  };

  if (done) {
    // Settlement is direct learner→expert (the platform never collects this
    // money — see CreateOrderView's docstring), so this is the only screen
    // that ever shows the amount owed and how to pay it. Previously this
    // discarded the create-order response entirely and just said "request
    // sent" — the learner had no idea what they owed or how to pay it.
    const amount = confirmation?.amountRupees;
    const payTo = confirmation?.payTo;
    return (
      <div className="ep-book-card ep-book-card--done">
        <div className="ep-book-card__icon">🎉</div>
        <h2>Request sent to {first}</h2>
        <p>
          {first} will review your request and confirm the slot. Once it's accepted,
          you'll be able to join the session from your dashboard.
        </p>
        {confirmation?.bookingId && (
          <div className="ep-book-confirm__ref">Booking ref: <b>{confirmation.bookingId}</b></div>
        )}
        {amount > 0 && (
          <div className="ep-book-confirm__pay">
            <div className="ep-book-confirm__amount">You owe {first}: <b>₹{amount}</b></div>
            {payTo ? (
              <div className="ep-book-confirm__payto">
                Pay directly to <b>{payTo.name}</b> via UPI: <b>{payTo.upi}</b>
                {payTo.note && <div className="ep-book-confirm__note">{payTo.note}</div>}
              </div>
            ) : (
              <div className="ep-book-confirm__payto">
                {first} hasn't added payment details yet — coordinate payment with them over chat once they accept.
              </div>
            )}
          </div>
        )}
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
          <label className="ep-book-label">Which skill?</label>
          <div className="ep-listing-pick">
            {listings.map(l => (
              <button key={l.id} type="button" className={`ep-pill${listingId === l.id ? " on" : ""}`}
                onClick={() => setListingId(l.id)}>
                {l.title} — {l.price_rupees === 0 ? "Free" : `₹${l.price_rupees}`}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="ep-book-price">{price === 0 ? "Free for now" : `₹${price} per session`}</div>

      <label className="ep-book-label">Pick a time · this week</label>
      {!availLoaded ? (
        <div className="ep-book-hint">Loading availability…</div>
      ) : !hasOpen ? (
        <div className="ep-book-noSlots">
          {first} hasn't published open slots yet. You can still send a request and agree a time over chat.
        </div>
      ) : (
        <SlotGrid avail={avail} selected={slot} onPick={setSlot} />
      )}

      <label className="ep-book-label" style={{ marginTop: 14 }}>Duration</label>
      <select className="ep-select" value={dur} onChange={e => setDur(+e.target.value)}>
        <option value={60}>1 hour</option>
        <option value={90}>1.5 hours</option>
        <option value={120}>2 hours</option>
      </select>

      <label className="ep-book-label" style={{ marginTop: 14 }}>What do you want to work on?</label>
      <textarea className="ep-book-note" rows={4} value={note}
        placeholder="e.g. I want to improve my Python skills, especially around data structures…"
        onChange={e => setNote(e.target.value)} />

      {msg && <div className={`ep-book-msg ${msg.startsWith("✓") ? "ok" : "err"}`}>{msg}</div>}

      <div className="ep-book-sticky">
        <div className="ep-book-sticky__price">
          <b>{price === 0 ? "Free" : `₹${price}`}</b>
          <span>{dur} min{slot ? ` · ${SDAvail.label(slot)}` : ""}</span>
        </div>
        <button className="ep-btn ep-btn--primary" onClick={submit}
          disabled={busy || (hasOpen && !slot)}>
          {busy ? "Requesting…" : (hasOpen && !slot) ? "Pick a slot to continue" : "Request session"}
        </button>
      </div>
    </div>
  );
}
