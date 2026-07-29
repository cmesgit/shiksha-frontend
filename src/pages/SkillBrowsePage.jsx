/**
 * SkillBrowsePage.jsx — standalone public browse-all-teachers page.
 * Route: /skill/browse  (public, no auth required)
 *
 * • Reads from live API (/skill/teachers/ + /skill/categories/)
 * • Category filter pill rail + search box
 * • Teacher cards with "View profile" → /experts/:id
 * • No auth required to browse; commitment actions (message/book) on
 *   the profile page gate on authentication.
 */
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/apiClient";
import { fetchMarketingBlocks } from "../api/skillApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./SkillBrowsePage.css";

const initials = (n) => (n||"?").trim().split(/\s+/).map(w=>w[0]).join("").slice(0,2).toUpperCase();
const stars = (r) => r ? "★".repeat(Math.round(r)) + "☆".repeat(5-Math.round(r)) : null;

function TeacherCard({ t, onView }) {
  return (
    <div className="sbp-card" onClick={onView} role="button" tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onView()}>
      <div className="sbp-card__photo">
        {t.img
          ? <img src={t.img} alt={t.name} />
          : <span className="sbp-card__initials">{initials(t.name)}</span>}
        {t.badges?.includes("Verified") && <span className="sbp-card__verified">✓</span>}
      </div>
      <div className="sbp-card__body">
        <div className="sbp-card__cat">{t.cat}</div>
        <div className="sbp-card__name">{t.name}</div>
        <div className="sbp-card__title">{t.title}</div>
        <div className="sbp-card__tags">
          {(t.skills||[]).slice(0,3).map(s => <span key={s} className="sbp-tag">{s}</span>)}
        </div>
        <div className="sbp-card__stats">
          {t.rating && <span className="sbp-card__stars">{stars(t.rating)} {t.rating}</span>}
          <span>{t.sessions ?? 0} sessions</span>
          <span className="sbp-card__rate">{t.rate === 0 ? "Free" : `₹${t.rate}/session`}</span>
        </div>
        <button className="sbp-card__cta">View profile →</button>
      </div>
    </div>
  );
}

export default function SkillBrowsePage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [teachers, setTeachers]     = useState([]);
  const [categories, setCategories] = useState([]);
  const [cat, setCat]               = useState(params.get("cat") || "all");
  const [search, setSearch]         = useState(params.get("q") || "");
  const [loading, setLoading]       = useState(true);
  const [marketing, setMarketing]   = useState({});

  useEffect(() => {
    api.get("/skill/categories/").then(r => setCategories(r.data || [])).catch(() => {});
    fetchMarketingBlocks().then(setMarketing);
  }, []);

  // CMS-managed copy, falling back to the built-in default when the block is
  // missing/inactive so an empty CMS never breaks the page.
  const hero = marketing.browse_hero;
  const heroLabel = hero?.subheading || "Skill Development";
  const heroTitle = hero?.heading || "Find a teacher for any skill";
  const heroSub = hero?.body || "Browse verified experts from across Mizoram. Book a session when you find the right match — no sign-up needed to look.";
  const teachBanner = marketing.teach_banner;
  const teachHeading = teachBanner?.heading || "Are you an expert at something?";
  const teachBody = teachBanner?.body || "Share your craft with students across Mizoram. Create a teaching account — it takes less than 5 minutes.";
  const teachCta = teachBanner?.cta_label || "I want to teach my craft →";
  const teachCtaUrl = teachBanner?.cta_url || "/signup?role=teacher&skill=true";

  useEffect(() => {
    setLoading(true);
    const p = {};
    if (cat !== "all") p.cat = cat;
    if (search.trim()) p.search = search.trim();
    api.get("/skill/teachers/", { params: p })
      .then(r => setTeachers(Array.isArray(r.data) ? r.data : r.data.results || []))
      .catch(() => setTeachers([]))
      .finally(() => setLoading(false));
  }, [cat, search]);

  return (
    <div className="sbp-page">
      <Navbar />
      <div className="sbp-hero">
        <div className="sbp-hero__inner">
          <p className="sbp-hero__label">{heroLabel}</p>
          <h1 className="sbp-hero__title">{heroTitle}</h1>
          <p className="sbp-hero__sub">{heroSub}</p>
          <div className="sbp-search-bar">
            <span className="sbp-search-icon">🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, skill, or topic…" className="sbp-search-input" />
            {search && <button className="sbp-search-clear" onClick={() => setSearch("")}>✕</button>}
          </div>
        </div>
      </div>

      <div className="sbp-body">
        {/* Category pills */}
        <div className="sbp-cats">
          <button className={`sbp-cat ${cat === "all" ? "on" : ""}`} onClick={() => setCat("all")}>All skills</button>
          {categories.map(c => (
            <button key={c.id||c.slug} className={`sbp-cat ${cat === (c.slug||c.id) ? "on" : ""}`}
              onClick={() => setCat(c.slug||c.id)}>
              {c.image
                ? <img src={c.image} alt="" style={{ width: 16, height: 16, borderRadius: 4, objectFit: "cover", marginRight: 6, verticalAlign: "middle" }} />
                : c.icon && <span>{c.icon} </span>}{c.label}
            </button>
          ))}
        </div>

        <div className="sbp-count">{loading ? "Loading…" : `${teachers.length} teacher${teachers.length !== 1?"s":""} available`}</div>

        {loading ? (
          <div className="sbp-loading">Finding teachers…</div>
        ) : teachers.length === 0 ? (
          <div className="sbp-empty">
            <div style={{fontSize:48}}>🔍</div>
            <p>No teachers found. Try a different filter or search term.</p>
          </div>
        ) : (
          <div className="sbp-grid">
            {teachers.map(t => (
              <TeacherCard key={t.id} t={t} onView={() => navigate(`/experts/${t.id}`)} />
            ))}
          </div>
        )}

        <div className="sbp-teach-banner">
          <div className="sbp-teach-banner__txt">
            <h3>{teachHeading}</h3>
            <p>{teachBody}</p>
          </div>
          <button className="sbp-teach-banner__btn"
            onClick={() => navigate(teachCtaUrl)}>
            {teachCta}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
