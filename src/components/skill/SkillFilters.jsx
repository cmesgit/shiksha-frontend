/**
 * SkillFilters.jsx — the directory's filter rail (`.sk-filters`).
 *
 * Markup follows the design handoff element for element. What changed is the
 * wiring: the handoff drove this with querySelectorAll + classList against
 * static cards, which cannot survive React re-rendering the list. Here it is a
 * fully controlled component that owns no state — the URL remains the source
 * of truth, exactly as the sidebar it replaces worked.
 *
 * The handoff's `.is-on` was renamed `.sk-on`; see the rename map at the top of
 * css/SkillDevelopment.css for why bare modifiers are not used here.
 */
import {
  MODES, LANGS, RATINGS, EXPERIENCE, PRICE_ANY, priceLabel,
} from "./directoryOptions";

const IcFilters = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 5h16M7 12h10M10 19h4" />
  </svg>
);

const IcStar = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l2.6 5.8 6.4.7-4.8 4.3 1.4 6.2L12 17l-5.6 3 1.4-6.2L3 9.5l6.4-.7z" />
  </svg>
);

export default function SkillFilters({
  filters, categories, locations, onChange, onClear, open,
}) {
  /* Districts come from GET /skill/locations/, not a hardcoded list, so the
     filter covers wherever experts actually are rather than one launch state.
     Picking a state narrows the district list to that state's; with no state
     chosen we offer the flat union so a learner who knows only their district
     never has to guess the state first. */
  const states = locations?.states || [];
  const chosen = states.find((s) => s.state === filters.state);
  const districts = chosen ? chosen.districts : (locations?.districts || []);

  /* Changing state must clear a district that does not belong to it, or the
     two filters silently AND into an empty result the user cannot explain. */
  const changeState = (v) => {
    const next = states.find((s) => s.state === v);
    if (filters.district !== "all" && !(next?.districts || []).includes(filters.district)) {
      onChange("district", "all");
    }
    onChange("state", v);
  };

  /* The slider paints its own filled track through --sk-p, which the handoff
     recomputed in a JS `input` handler. Derived from the value instead so it
     can never drift out of sync with the state it is meant to represent. */
  const pricePct = ((filters.priceMax - 0) / (PRICE_ANY - 0)) * 100;

  /* Selecting the active chip again clears it. The backend's `lang` is a
     single `icontains` match (directory_views.py), not a list, so this is
     single-select even though the design's chips imply multi-select. */
  const toggleLang = (l) => onChange("lang", filters.lang === l ? "" : l);

  return (
    <form
      className={`sk-filters${open ? " sk-open" : ""}`}
      id="sk-filters"
      aria-label="Filter teachers"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="sk-filters__head">
        <h2>{IcFilters}Filters</h2>
        <button className="sk-clear" type="button" onClick={onClear}>Clear all</button>
      </div>

      <div className="sk-fgroup">
        <p className="sk-flabel">Category</p>
        <button
          className={`sk-cat${filters.cat === "all" ? " sk-on" : ""}`}
          type="button"
          aria-pressed={filters.cat === "all"}
          onClick={() => onChange("cat", "all")}
        >
          <span className="sk-cat__ic" aria-hidden="true">{IcStar}</span>
          <b>All skills</b>
        </button>

        {categories.map((c) => {
          const key = c.slug || c.id;
          return (
            <button
              key={c.id}
              className={`sk-cat${filters.cat === key ? " sk-on" : ""}`}
              type="button"
              aria-pressed={filters.cat === key}
              onClick={() => onChange("cat", key)}
            >
              <span
                className="sk-cat__ic"
                aria-hidden="true"
                style={c.color ? { background: `${c.color}1f`, color: c.color } : undefined}
              >
                {c.image
                  ? <img src={c.image} alt="" width="18" height="18" />
                  : (c.icon || c.label.slice(0, 2))}
              </span>
              <b>{c.label}</b>
              {/* expert_count is annotated server-side to match what ?cat= returns. */}
              {c.expert_count != null && <span>{c.expert_count}</span>}
            </button>
          );
        })}
      </div>

      <div className="sk-fgroup">
        <p className="sk-flabel">Where lessons happen</p>
        {MODES.map(([v, label]) => (
          <button
            key={v}
            className={`sk-opt${filters.mode === v ? " sk-on" : ""}`}
            type="button"
            aria-pressed={filters.mode === v}
            onClick={() => onChange("mode", v)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="sk-fgroup">
        <p className="sk-flabel">Location</p>

        {/* Only offered once the roster spans more than one state — a single
            state would be a select with one real option, which reads as a
            choice while narrowing nothing. */}
        {states.length > 1 && (
          <>
            <label className="sk-sr" htmlFor="sk-state">State</label>
            <select
              className="sk-select"
              id="sk-state"
              value={filters.state}
              onChange={(e) => changeState(e.target.value)}
            >
              <option value="all">Any state</option>
              {states.map((s) => (
                <option key={s.state} value={s.state}>{s.state}</option>
              ))}
            </select>
          </>
        )}

        <label className="sk-sr" htmlFor="sk-district">District</label>
        <select
          className="sk-select"
          id="sk-district"
          value={filters.district}
          onChange={(e) => onChange("district", e.target.value)}
          /* Nothing to choose from until the fetch lands, and an empty roster
             has no districts at all. */
          disabled={districts.length === 0}
        >
          <option value="all">Any district</option>
          {districts.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>

        <label className="sk-sr" htmlFor="sk-pin">PIN code</label>
        <input
          className="sk-input"
          id="sk-pin"
          type="text"
          inputMode="numeric"
          placeholder="PIN code"
          value={filters.pincode}
          /* The API matches a whole pincode; letters would only ever return
             nothing, so they are dropped rather than sent. */
          onChange={(e) => onChange("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
        />
      </div>

      <div className="sk-fgroup">
        <p className="sk-flabel">
          Price per session <b id="sk-pricelab">{priceLabel(filters.priceMax)}</b>
        </p>
        <label className="sk-sr" htmlFor="sk-price">Maximum price per session</label>
        <input
          className="sk-range"
          id="sk-price"
          type="range"
          min="0"
          max={PRICE_ANY}
          step="100"
          value={filters.priceMax}
          style={{ "--sk-p": `${pricePct}%` }}
          onChange={(e) => onChange("priceMax", Number(e.target.value))}
        />
        <div className="sk-scale"><span>Free</span><span>₹{PRICE_ANY}+</span></div>
      </div>

      <div className="sk-fgroup">
        <p className="sk-flabel">Language</p>
        <div className="sk-chips">
          {LANGS.map((l) => (
            <button
              key={l}
              className={`sk-tog${filters.lang === l ? " sk-on" : ""}`}
              type="button"
              aria-pressed={filters.lang === l}
              onClick={() => toggleLang(l)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="sk-fgroup">
        <p className="sk-flabel">Minimum rating</p>
        <div className="sk-chips">
          {RATINGS.map(([v, label]) => (
            <button
              key={v}
              className={`sk-tog${filters.minRating === v ? " sk-on" : ""}`}
              type="button"
              aria-pressed={filters.minRating === v}
              onClick={() => onChange("minRating", v)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="sk-fgroup">
        <p className="sk-flabel">Experience</p>
        <label className="sk-sr" htmlFor="sk-exp">Experience</label>
        <select
          className="sk-select"
          id="sk-exp"
          value={filters.minExp}
          onChange={(e) => onChange("minExp", Number(e.target.value))}
        >
          {EXPERIENCE.map(([v, label]) => <option key={v} value={v}>{label}</option>)}
        </select>
      </div>

      <div className="sk-fgroup">
        {/* Neither of these is a boolean on the API. `has_video` is derived
            from intro_video_embed_url being non-null and `available_week` from
            open_slots_week > 0; both are sent as `1`. */}
        <button
          className={`sk-switch${filters.hasVideo ? " sk-on" : ""}`}
          type="button"
          aria-pressed={filters.hasVideo}
          onClick={() => onChange("hasVideo", !filters.hasVideo)}
        >
          Has intro video <i aria-hidden="true" />
        </button>
        <button
          className={`sk-switch${filters.availWeek ? " sk-on" : ""}`}
          type="button"
          aria-pressed={filters.availWeek}
          onClick={() => onChange("availWeek", !filters.availWeek)}
        >
          Available this week <i aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
