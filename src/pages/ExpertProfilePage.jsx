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
import { useToast } from "../contexts/ToastContext";
import api from "../api/apiClient";
import { APP_URL } from "../config/urls";
import { fetchAvailability } from "../api/skillApi";
import { SDAvail } from "../components/skill/availability";
import { RatingStars, RatingSummary, MIN_REVIEWS } from "../components/skill/RatingStars";
import ReviewList, { RatingBreakdown } from "../components/skill/ReviewList";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
              const open   = (avail.open || []).includes(k) && !SDAvail.isPast(k);
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
  const { isAuthenticated, activeProfile } = useAuth();
  const { showToast } = useToast();

  const [expert, setExpert]   = useState(null);
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [distribution, setDistribution] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, setErr]         = useState("");

  /* The site Navbar is position:fixed, so anything position:sticky on this
     page must clear it or it pins UNDERNEATH the header.

     Measures .skn-header, NOT the .skn-spacer that useHeaderOffset in
     Contact.jsx / AboutUs.jsx watches: the spacer reserves 78px while the
     header itself is 83px, and the number that matters here is the height of
     the thing that actually overlaps.

     Re-runs when `expert` arrives. The component early-returns a bare
     "Loading…" before that, so on first mount there is no Navbar in the DOM
     at all — a one-shot query bails and never retries, which is exactly what
     the first version of this did. */
  const epRootRef = useRef(null);
  useEffect(() => {
    const root = epRootRef.current;
    const header = document.querySelector(".skn-header");
    if (!root || !header) return undefined;
    const apply = () => {
      /* Its BOTTOM EDGE, not its height. The header is fixed but not flush
         to y=0 — it sits at a small top offset — so height (71px) is 12px
         short of where it actually ends (83px). Using height left the pinned
         panel clearing the nav by 4px instead of the intended 16. */
      const b = header.getBoundingClientRect();
      const bottom = Math.round(b.top + b.height);
      if (bottom > 0) root.style.setProperty("--ep-header-h", `${bottom}px`);
    };
    apply();
    if (!("ResizeObserver" in window)) {
      window.addEventListener("resize", apply, { passive: true });
      return () => window.removeEventListener("resize", apply);
    }
    const ro = new ResizeObserver(apply);
    ro.observe(header);
    return () => ro.disconnect();
  }, [expert]);
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
        ...(activeProfile?.id ? { active_profile_id: activeProfile.id } : {}),
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
      showToast({ type: "error", message: e?.response?.data?.detail || "Could not enroll." });
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
  // `default_listing_id` is the server's own answer to "which listing do we
  // charge for when the client names none" (ExpertProfile.default_listing).
  // `listings[0]` agreed with it only by luck: CreateOrderView used to sort
  // by `order` alone, whose tie-break is undefined on equal orders, so the
  // amount written to the session could differ from the figure shown here.
  // Falls back to listings[0] for an older payload.
  const primaryListing =
    listings.find(l => l.id === expert.default_listing_id) || listings[0] || null;
  const heroPrice = primaryListing ? primaryListing.price_rupees : expert.rate;
  const locationLine = expert.class_mode === "online"
    ? MODE_TEXT.online
    : [expert.class_location, MODE_TEXT[expert.class_mode]].filter(Boolean).join(" · ");

  return (
    <>
      {/* The page rendered NO site chrome at all — a visitor landing on an
          expert from search had no nav, no way back into the site, and no
          footer. Navbar/Footer sit outside .ep-page, matching
          SkillBrowsePage: the page scope rebinds custom properties that
          theme.css also declares on :root, and nesting global chrome inside
          would silently pin those copies. */}
      <Navbar />

    <div className="ep-page" ref={epRootRef}>
      {/* ONE grid for the whole screen, matching the design:
          'hero panel' / 'tabs panel' / 'body panel' (Skill Public.dc.html:265).
          The booking panel is a sibling of the content column and spans all
          three rows, which is what lets it stay with you as you scroll.

          It used to be a child of .ep-hero__card. position:sticky can only
          travel inside its own containing block, so it was bounded by the
          hero's height and scrolled away with it — it never pinned for
          anyone. The hero is a CARD in the content column now rather than a
          full-bleed band, which is both what the design specifies and what
          makes room for the panel beside it. */}
      <button className="ep-back" onClick={() => navigate("/skill/browse")}>← All teachers</button>

      <div className="ep-layout">
        <section className="ep-hero">
        <span className="ep-hero__grid" aria-hidden="true" />
        <span className="ep-hero__glow ep-hero__glow--1" aria-hidden="true" />
        <span className="ep-hero__glow ep-hero__glow--2" aria-hidden="true" />
          <div className="ep-hero__card">
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
              {/* "✓ Verified" and "TOP RATED" were CUT, not hidden. Nothing in
                  the backend ever writes ExpertProfile.badges — there is no
                  admin action, no signal, no management command — so both
                  were permanently dead, and a reader of this file could not
                  tell that from the guard. If badges gain a writer, restore
                  them deliberately rather than finding them switched on by a
                  data change nobody connected to this screen. */}
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
                  {/* "New", not an em-dash. MIN_REVIEWS is 5 and most experts
                      sit below it, so this is the COMMON case, not an edge
                      one — and "—" reads as "no rating data" or even as a bad
                      score, when the honest meaning is "not enough reviews
                      yet". The design has no state for it at all. */}
                  <div className="ep-stat__val">
                    {reviewsCount >= MIN_REVIEWS
                      ? avgRating.toFixed(1)
                      : <span className="ep-stat__new">New</span>}
                  </div>
                  <div className="ep-stat__label">
                    {reviewsCount >= MIN_REVIEWS
                      ? `Rating (${reviewsCount})`
                      : reviewsCount === 0
                        ? "No reviews yet"
                        : `${reviewsCount} review${reviewsCount === 1 ? "" : "s"} so far`}
                  </div>
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
          </div>
          {showComposer && !msgSent && (
            <MessageComposer
              teacherProfileId={expert.teacher_profile_id}
              expertName={expert.name}
              onSent={() => { setMsgSent(true); setShowComposer(false); }}
            />
          )}
          {msgSent && <div className="ep-msg-sent">✓ Taking you to your messages…</div>}
        </section>

        <aside className="ep-panelWrap">
              <div className="ep-panel">
                <div className="ep-panel__price">{heroPrice === 0 ? "Free" : `₹${heroPrice}`}</div>
                {/* NOT "from". This panel prices the DEFAULT listing — the
                    one the booking form preselects and the one the server
                    charges for when the client names none — which is not
                    necessarily the cheapest. Here that is the ₹900 guitar
                    lesson while the ₹500 tabla taster is the floor, so
                    "from ₹900" was simply false. "from" belongs on the
                    directory card, which really does show min(listings). */}
                <div className="ep-panel__sub">
                  {multi ? `${primaryListing?.title || "Default skill"} · per 60-min session`
                         : "per 60-min session"}
                </div>
                <div className="ep-panel__chips">
                  {expert.open_slots_week != null && (
                    <span className={`ep-panel__chip${expert.open_slots_week > 0 ? " on" : ""}`}>
                      <i />{expert.open_slots_week > 0 ? `${expert.open_slots_week} open slots this week` : "No open slots this week"}
                    </span>
                  )}
                  {locationLine && <span className="ep-panel__chip">📍 {locationLine}</span>}
                  {/* The design's "Goal: …" chip is CUT. mastery_target is an
                      integer field, so this rendered a bare "🎯 3" — a number
                      with no unit and no label, which tells a visitor nothing. */}
                </div>
                <button className="ep-btn ep-btn--primary ep-btn--wide" onClick={() => handleBookClick(null)}>
                  📅 Book a session
                </button>
                {!showComposer && (
                  <button className="ep-btn ep-btn--ghost ep-btn--wide" style={{ marginTop: 8 }} onClick={handleMessageClick}>
                    💬 Message
                  </button>
                )}
                {/* "Free 15-min intro on your first session" was CUT: nothing
                    implements it. There is no intro-session type, no free
                    first booking, and no code path that discounts one. It is
                    a promise the product cannot keep, shown at the exact
                    moment someone decides to book. */}
              </div>
        </aside>

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
                {/* These are hardcoded for EVERY expert but written in the
                    first person, so they read as that expert's own promises.
                    Two of the four were false:

                    · "free 15-min intro" — there is no intro session type and
                      no code path that discounts a first booking.
                    · "Reschedule any time up to 12 hours before" — the exact
                      INVERSE of the rule. CANCELLABLE is (REQUESTED,
                      PENDING_PAYMENT): a learner may cancel only while the
                      request is still pending, and once the expert confirms,
                      cancel_views.py tells them to message the expert.

                    Rewritten to what the code actually does, and out of the
                    first person, since the platform is speaking here. */}
                <ul>
                  <li>One-on-one sessions, online or in person — whichever this expert offers.</li>
                  <li>You can cancel yourself while the request is still pending.</li>
                  <li>Once the expert confirms, message them to change or cancel the time.</li>
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
      </div>

      {gate && <AuthGateModal action={gate} expertName={expert.name} onClose={() => setGate(null)} />}
    </div>

      <Footer />
    </>
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
              const past   = SDAvail.isPast(k);
              // A past slot can never be booked for the labelled date (the
              // backend would roll it to next week), so it is not "open".
              const open   = (avail.open || []).includes(k) && !past;
              const isSel  = selected === k;
              const clickable = open && !booked;
              const cls = booked ? "booked" : open ? (isSel ? "selected" : "open") : "closed";
              return (
                <button key={k} type="button" disabled={!clickable}
                  onClick={() => clickable && onPick(k)}
                  title={past ? "This time has passed" : booked ? "Already booked" : open ? SDAvail.label(k) : "Closed"}
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
  // Same default as the hero and the server, so the price in the panel,
  // the price in this form and the amount charged are one number.
  const serverDefault =
    listings.find(l => l.id === expert.default_listing_id)?.id || listings[0]?.id;
  const [listingId, setListingId] = useState(
    () => (listings.some(l => l.id === initialListing) ? initialListing : serverDefault) || ""
  );
  useEffect(() => {
    if (initialListing && listings.some(l => l.id === initialListing)) setListingId(initialListing);
  }, [initialListing]); // eslint-disable-line react-hooks/exhaustive-deps
  const listing = listings.find(l => l.id === listingId) || null;

  const [note, setNote] = useState("");
  const [slot, setSlot] = useState(null);
  // Fixed: see the note where the duration picker used to be.
  const dur = 60;
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
          onClick={() => { window.location.href = APP_URL + "/skill-dev/sessions?track=skill"; }}>
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

      {/* "Free", not "Free for now". The same session said "Free" in the
          hero, "Free for now" here and "Free" again in the sticky bar —
          three wordings for one price, one of which promises a future
          change nobody has decided on. */}
      <div className="ep-book-price">{price === 0 ? "Free" : `₹${price} per session`}</div>

      <label className="ep-book-label">Pick a time · this week</label>
      {!availLoaded ? (
        <div className="ep-book-hint">Loading availability…</div>
      ) : avail.authRequired ? (
        /* The availability endpoint refused us. Saying "hasn't published open
           slots yet" here — which is what this branch used to do — blames the
           EXPERT for our own missing permission, and tells the visitor the
           opposite of the truth: the slots may be full, the page simply was
           never allowed to look. */
        <div className="ep-book-noSlots">
          Sign in to see {first}&rsquo;s open times. You can still send a request
          now and agree a time over chat.
        </div>
      ) : !hasOpen ? (
        <div className="ep-book-noSlots">
          {first} hasn't published open slots yet. You can still send a request and agree a time over chat.
        </div>
      ) : (
        <SlotGrid avail={avail} selected={slot} onPick={setSlot} />
      )}

      {/* The duration picker was REMOVED. Price does not scale with it —
          60/90/120 all quoted the same figure because nothing multiplies by
          duration — and one slot is one hour, so a "2 hours" booking still
          reserved a single cell. Offering a choice that changes neither the
          price nor the reservation is a pricing bug the learner discovers
          after paying. Requests are now a flat 60 minutes, which is what the
          price and the grid have always actually meant.

          To make duration real, BOTH halves have to move together: the quote
          must multiply AND the booking must consume consecutive slots. */}

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
