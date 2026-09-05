/**
 * TeacherCard.jsx — one `.sk-tcard` row in the directory.
 *
 * Markup follows the design handoff element for element. The handoff shipped
 * three of these as static markup carrying their filter values in data-*
 * attributes, with a note to swap in a .map() over fetched teachers once the
 * API existed — it already does, so this renders ExpertCardSerializer
 * (skills/serializers.py:81-255) and the data-* attributes are gone: every
 * filter and sort is applied by the backend, not by hiding DOM nodes.
 *
 * Three fields the design treats as booleans are not booleans on the API, and
 * getting these wrong renders a card that quietly lies:
 *   - "Verified"  -> `badges` is a free-form JSON array; match the string.
 *   - intro video -> `intro_video_embed_url` is null unless status == 4.
 *   - this week   -> `open_slots_week` is a count, not a flag.
 * `rating` also arrives as a STRING (DRF DecimalField), so it needs Number().
 */
import { Link } from "react-router-dom";
import { MIN_REVIEWS } from "./RatingStars";
import { MODE_TEXT } from "./directoryOptions";

/* Avatar tint + the card's corner wash, picked deterministically from the id so
   a given teacher keeps the same colour across pages, sorts and reloads. */
const PALETTE = [
  { t: "#E7F6EE", c: "#0B5B3E", w: "rgba(15,157,107,.13)" },
  { t: "#F1EEFE", c: "#5A3BD8", w: "rgba(124,92,252,.12)" },
  { t: "#FDF4E3", c: "#B4750A", w: "rgba(255,178,29,.13)" },
  { t: "#EAF2FE", c: "#2159BE", w: "rgba(59,130,246,.12)" },
  { t: "#E7F6F4", c: "#0A7A71", w: "rgba(18,179,166,.12)" },
  { t: "#FDECE7", c: "#B93B18", w: "rgba(225,77,42,.12)" },
];

const initial = (n = "") => (n.trim()[0] || "?").toUpperCase();

const paletteFor = (id = "") => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
};

const IcStar = (
  <path d="M12 3l2.6 5.8 6.4.7-4.8 4.3 1.4 6.2L12 17l-5.6 3 1.4-6.2L3 9.5l6.4-.7z" />
);

const IcMode = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.5 2.5 4.5-5" />
  </svg>
);

const IcGlobe = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 12h18" /><circle cx="12" cy="12" r="9" />
    <path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
  </svg>
);

/** Five stars, filled to the nearest whole star. */
function Stars({ value }) {
  return (
    <span className="sk-stars" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
             className={i < Math.round(value) ? undefined : "sk-off"}>
          {IcStar}
        </svg>
      ))}
      <b>{value.toFixed(1)}</b>
    </span>
  );
}

export default function TeacherCard({ expert: e }) {
  const pal      = paletteFor(e.id || "");
  const verified = Array.isArray(e.badges) && e.badges.includes("Verified");
  const rating   = e.rating == null ? 0 : Number(e.rating);
  const reviews  = e.reviews_count || 0;
  /* Below MIN_REVIEWS the average is statistically meaningless, so the design
     shows a "New" chip instead of a star row — same rule RatingStars applies
     everywhere else in the app. */
  const rated    = reviews >= MIN_REVIEWS && rating > 0;
  /* `from_rate` is the cheapest active listing; `rate` is the expert's own
     hourly. Both are already rupees. 0 is a real price, meaning free. */
  const price    = e.from_rate ?? e.rate ?? 0;
  const slots    = e.open_slots_week || 0;
  const skills   = (e.skills || []).slice(0, 3);
  const langs    = (e.languages || []).slice(0, 2);

  return (
    <article
      className={`sk-tcard sk-rv${e.featured ? " sk-tcard--feat" : ""}`}
      style={{ "--sk-wash": pal.w }}
    >
      <div className="sk-tcard__id">
        <span className="sk-ava" style={{ "--sk-t": pal.t, "--sk-c": pal.c }}>
          {e.img
            ? <img src={e.img} alt="" loading="lazy" />
            : <b aria-hidden="true">{initial(e.name)}</b>}
          <span className="sk-ava__ring" aria-hidden="true" />
          {verified && (
            <span className="sk-verify" title="Verified expert">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                   strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m5 12.5 4.5 4.5L19 7" />
              </svg>
            </span>
          )}
        </span>
      </div>

      <div>
        <div className="sk-tname">
          <h3>{e.name}</h3>
          {e.featured && (
            <span className="sk-feat">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{IcStar}</svg>
              Featured
            </span>
          )}
        </div>

        {e.title ? <p className="sk-ttag">{e.title}</p> : null}

        {skills.length > 0 && (
          <div className="sk-skills">
            {skills.map((s) => <span className="sk-skill" key={s}>{s}</span>)}
          </div>
        )}

        <div className="sk-meta">
          {rated ? <Stars value={rating} /> : <span className="sk-new">New</span>}
          {reviews > 0 && (
            <span>{rated ? `(${reviews})` : `${reviews} review${reviews === 1 ? "" : "s"}`}</span>
          )}
          {e.sessions > 0 && (
            <>
              <span className="sk-dot" aria-hidden="true" />
              <span>{e.sessions} session{e.sessions === 1 ? "" : "s"}</span>
            </>
          )}
          {e.experience_years != null && e.experience_years > 0 && (
            <>
              <span className="sk-dot" aria-hidden="true" />
              <span>{e.experience_years} yrs experience</span>
            </>
          )}
        </div>

        <div className="sk-tags">
          {e.class_mode && (
            <span className="sk-tag">
              {IcMode}
              {/* class_location is free text the teacher typed; when they teach
                  offline it is the more useful half of the label. */}
              {e.class_mode !== "online" && e.class_location
                ? `${e.class_location} · ${MODE_TEXT[e.class_mode]}`
                : MODE_TEXT[e.class_mode] || e.class_mode}
            </span>
          )}
          {langs.map((l) => (
            <span className="sk-tag" key={l}>{IcGlobe}{l}</span>
          ))}
        </div>
      </div>

      <div className="sk-rail">
        <p className={`sk-price${price === 0 ? " sk-price--free" : ""}`}>
          {price === 0 ? "Free" : `₹${price}`}
        </p>
        <p className="sk-per">per 60-min session</p>
        {slots > 0 && (
          <span className="sk-slots">
            <i aria-hidden="true" />{slots} slot{slots === 1 ? "" : "s"} this week
          </span>
        )}
        {/* Anchors, not buttons — both actions are navigations, so this gives
            real hrefs (middle-click, open-in-new-tab, copy link). It also
            matches the handoff, which uses <a>: a <button> does not inherit
            the page's line-height:1.65 (the UA sets line-height:normal on it),
            so the same .sk-btn renders 49px tall as a button and 51.1px as an
            anchor, and the whole card rail shifts by ~2px per button. */}
        <Link className="sk-btn sk-btn--solid" to={`/experts/${e.id}?action=book`}>
          Book a session
        </Link>
        <Link className="sk-btn sk-btn--ghost" to={`/experts/${e.id}`}>
          View profile
        </Link>
      </div>
    </article>
  );
}
