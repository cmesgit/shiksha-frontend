/**
 * ExpertRow.jsx — one teacher in the directory.
 *
 * Full-width row rather than a card: eleven fields do not fit a 270px card
 * without either truncation or a hover reveal, and a tutor directory is a
 * comparison surface.
 *
 * Multi-skill: when the expert has more than one active listing the row lists
 * them, price becomes a "from" figure and the CTA becomes "Choose a skill".
 * With a single listing it behaves exactly as before.
 */
import { RatingSummary, MIN_REVIEWS } from "./RatingStars";
import "./ExpertRow.css";

const MODE_TEXT = {
  online: "Online only",
  home:   "At the teacher's place",
  travel: "Travels to the learner",
};

const AVATAR_TINTS = ["#0a7d8c", "#7c5cfc", "#0f9d6b", "#e14d2a", "#ec4e86", "#3b82f6", "#b45309", "#12b3a6"];

const initials = (n = "") =>
  n.trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?";

const tintFor = (id = "") => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return AVATAR_TINTS[h % AVATAR_TINTS.length];
};

export default function ExpertRow({ expert: e, onOpen, onBook, onPlayIntro }) {
  const all       = e.listings || [];
  const live      = all.filter((l) => l.is_active);
  const paused    = all.filter((l) => !l.is_active);
  // Two different questions. `showList` — does this teacher offer more than one
  // thing at all? A paused skill still gets a line, so a learner who bookmarked
  // it sees "paused by the teacher" rather than a row that silently lost it.
  // `multi` — is there more than one BOOKABLE skill? That's what turns the
  // price into a "from" figure and the CTA into "Choose a skill".
  const showList  = all.length > 1;
  const multi     = live.length > 1;
  // from_rate is computed server-side over active listings, falling back to the
  // expert's own rate — trust it rather than re-deriving a different number.
  const fromPrice = e.from_rate != null ? e.from_rate : e.rate;

  return (
    <article className={`er-row${e.featured ? " er-row--featured" : ""}`}>
      {e.featured && <span className="er-featured-rule" aria-hidden="true" />}

      <div className="er-photo">
        {e.img
          ? <img src={e.img} alt="" />
          : <span className="er-initials" style={{ background: tintFor(e.id) }}>{initials(e.name)}</span>}
        {e.intro_video_embed_url && (
          <button type="button" className="er-intro" onClick={() => onPlayIntro?.(e)}>
            <i>▶</i> Intro
          </button>
        )}
      </div>

      <div className="er-main">
        <header className="er-name">
          <h3>{e.name}</h3>
          {e.badges?.includes("Verified")  && <span className="er-badge er-badge--verified">✓ Verified</span>}
          {e.badges?.includes("Top-rated") && <span className="er-badge er-badge--top">TOP RATED</span>}
          {/* Featured styling is never colour-only — it carries a text badge. */}
          {e.featured                      && <span className="er-badge er-badge--featured">FEATURED</span>}
        </header>

        <p className="er-title">{e.title}</p>

        {showList ? (
          <div className="er-skills">
            <span className="er-skills__label">
              {live.length === 1 ? "Teaches 1 skill" : `Teaches ${live.length} skills`}
            </span>
            {live.map((l) => (
              <button key={l.id} type="button" className="er-skill" onClick={() => onBook?.(e, l)}>
                <span>
                  <b>{l.title}</b>
                  <em>{(l.skill_tags || []).slice(0, 2).join(", ")}</em>
                </span>
                <span className="er-skill__right">
                  <i>{l.reviews_count >= MIN_REVIEWS ? `★ ${Number(l.rating).toFixed(1)}` : "New"}</i>
                  <b>{l.price_rupees === 0 ? "Free" : `₹${l.price_rupees}`}</b>
                </span>
              </button>
            ))}
            {/* A paused skill stays visible but unbookable — hiding it makes a
                teacher's directory row silently change shape week to week. */}
            {paused.map((l) => (
              <div key={l.id} className="er-skill er-skill--paused">
                <span><b>{l.title}</b><em>paused by the teacher</em></span>
                <span className="er-skill__right">Not bookable</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="er-tags">
            <span className="er-cat">{e.cat}</span>
            {(e.skills || []).slice(0, 3).map((s) => <span key={s} className="er-tag">{s}</span>)}
          </div>
        )}

        <div className="er-stats">
          <RatingSummary value={Number(e.rating)} count={e.reviews_count} size={13} />
          <span>{e.sessions} sessions</span>
          {e.experience_years != null && <span>{e.experience_years} yrs experience</span>}
          {e.languages?.length > 0 && <span>{e.languages.join(" · ")}</span>}
        </div>

        <p className="er-location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
               strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" /><path d="m16 8-2.5 5.5L8 16l2.5-5.5z" />
          </svg>
          {e.class_mode === "online"
            ? MODE_TEXT.online
            : [e.class_location, MODE_TEXT[e.class_mode]].filter(Boolean).join(" · ")}
        </p>
      </div>

      <div className="er-rail">
        <div>
          {multi && <span className="er-from">from</span>}
          <div className="er-price">{fromPrice === 0 ? "Free" : `₹${fromPrice}`}</div>
          <div className="er-price__sub">
            {multi ? `${live.length} skills bookable` : "per 60-min session"}
          </div>
          {e.open_slots_week != null && (
            <span className={`er-avail${e.open_slots_week > 0 ? " on" : ""}`}>
              {e.open_slots_week > 0 ? `${e.open_slots_week} slots this week` : "No slots this week"}
            </span>
          )}
        </div>
        <div className="er-ctas">
          <button type="button" className="er-btn er-btn--primary"
            onClick={() => onBook?.(e, multi ? null : live[0])}>
            {multi ? "Choose a skill" : "Book a session"}
          </button>
          <button type="button" className="er-btn er-btn--ghost" onClick={onOpen}>View profile</button>
        </div>
      </div>
    </article>
  );
}
