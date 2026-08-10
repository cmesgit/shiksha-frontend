/**
 * FilterSidebar.jsx — the ten directory filters.
 *
 * Sticky on desktop; on <=900px the parent renders it inside a bottom sheet
 * behind a "Filters (n)" button (see SkillBrowsePage.css .sbp-filters-btn).
 * Purely controlled — it owns no state, so the URL stays the source of truth.
 */
import "./FilterSidebar.css";

export const DEFAULT_FILTERS = {
  cat: "all", mode: "all", district: "all", pincode: "",
  priceMax: 2000, lang: "", minRating: 0, minExp: 0,
  hasVideo: false, availWeek: false,
};

export const MODE_TEXT = {
  online: "Online only",
  home:   "At the teacher's place",
  travel: "Travels to the learner",
};

const MODES = [
  ["all",    "Any mode"],
  ["online", MODE_TEXT.online],
  ["home",   MODE_TEXT.home],
  ["travel", MODE_TEXT.travel],
];

// Mizoram's districts. Sourced from the expert roster in production once
// /skill/districts/ exists; this is the launch set.
const DISTRICTS = ["Aizawl", "Champhai", "Kolasib", "Lunglei", "Serchhip", "Mamit", "Lawngtlai", "Saiha"];
const LANGS = ["Mizo", "English", "Hindi"];
const RATINGS = [[0, "Any"], [4, "4.0+"], [4.5, "4.5+"], [4.8, "4.8+"]];

export const PRICE_ANY = 2000;

/** How many filters are away from their default — the mobile button's badge. */
export function activeFilterCount(f) {
  return [
    f.cat !== "all", f.mode !== "all", f.district !== "all", !!f.pincode,
    f.priceMax < PRICE_ANY, !!f.lang, !!f.minRating, !!f.minExp,
    f.hasVideo, f.availWeek,
  ].filter(Boolean).length;
}

export default function FilterSidebar({ filters: f, categories = [], onChange, onClear, open }) {
  return (
    // data-open is always present, both values. The bottom-sheet's hidden state
    // is driven off [data-open="false"] rather than the bare .fs-root rule, so
    // the two states have equal specificity and neither can lose the cascade to
    // FilterSidebar.css depending on bundle order.
    <aside className="fs-root" aria-label="Filters" data-open={open ? "true" : "false"}>
      <div className="fs-head">
        <span>Filters</span>
        <button type="button" onClick={onClear}>Clear all</button>
      </div>

      <section className="fs-group">
        <h4>Category</h4>
        <div className="fs-cats">
          <button
            type="button"
            className={`fs-cat${f.cat === "all" ? " on" : ""}`}
            aria-pressed={f.cat === "all"}
            onClick={() => onChange("cat", "all")}
          >
            <span>
              <i className="fs-cat__ico" style={{ background: "#0f9d6b1f", color: "#0f9d6b" }}>◇</i>
              All skills
            </span>
          </button>
          {categories.map((c) => {
            const key = c.slug || c.id;
            return (
              <button
                key={key}
                type="button"
                className={`fs-cat${f.cat === key ? " on" : ""}`}
                aria-pressed={f.cat === key}
                onClick={() => onChange("cat", key)}
              >
                <span>
                  <i className="fs-cat__ico" style={{ background: `${c.color || "#0f9d6b"}1f`, color: c.color || "#0f9d6b" }}>
                    {c.image ? <img src={c.image} alt="" /> : c.icon}
                  </i>
                  {c.label}
                </span>
                {c.expert_count != null && <em>{c.expert_count}</em>}
              </button>
            );
          })}
        </div>
      </section>

      <section className="fs-group">
        <h4>Where lessons happen</h4>
        <div className="fs-modes">
          {MODES.map(([v, label]) => (
            <button
              key={v}
              type="button"
              className={`fs-mode${f.mode === v ? " on" : ""}`}
              aria-pressed={f.mode === v}
              onClick={() => onChange("mode", v)}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="fs-group">
        <h4>Location</h4>
        <select value={f.district} onChange={(e) => onChange("district", e.target.value)} aria-label="District">
          <option value="all">Any district</option>
          {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <input
          value={f.pincode}
          onChange={(e) => onChange("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="PIN code"
          inputMode="numeric"
          aria-label="PIN code"
        />
      </section>

      <section className="fs-group">
        <h4>
          Price per session
          <em>{f.priceMax >= PRICE_ANY ? "Any price" : `Up to ₹${f.priceMax}`}</em>
        </h4>
        <input
          type="range" min={0} max={PRICE_ANY} step={100}
          value={f.priceMax}
          onChange={(e) => onChange("priceMax", Number(e.target.value))}
          aria-label="Maximum price per session"
        />
        <div className="fs-rangeends"><span>Free</span><span>₹{PRICE_ANY}+</span></div>
      </section>

      <section className="fs-group">
        <h4>Language</h4>
        <div className="fs-pills">
          {LANGS.map((l) => (
            <button
              key={l}
              type="button"
              className={`fs-pill${f.lang === l ? " on" : ""}`}
              aria-pressed={f.lang === l}
              onClick={() => onChange("lang", f.lang === l ? "" : l)}
            >
              {l}
            </button>
          ))}
        </div>
      </section>

      <section className="fs-group">
        <h4>Minimum rating</h4>
        <div className="fs-pills">
          {RATINGS.map(([v, label]) => (
            <button
              key={label}
              type="button"
              className={`fs-pill${f.minRating === v ? " on" : ""}`}
              aria-pressed={f.minRating === v}
              onClick={() => onChange("minRating", v)}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="fs-group">
        <h4>Experience</h4>
        <select value={f.minExp} onChange={(e) => onChange("minExp", Number(e.target.value))} aria-label="Minimum experience">
          <option value={0}>Any experience</option>
          <option value={2}>2+ years</option>
          <option value={5}>5+ years</option>
          <option value={10}>10+ years</option>
        </select>
      </section>

      <section className="fs-group fs-group--toggles">
        <Toggle label="Has intro video"     on={f.hasVideo}  onClick={() => onChange("hasVideo", !f.hasVideo)} />
        <Toggle label="Available this week" on={f.availWeek} onClick={() => onChange("availWeek", !f.availWeek)} />
      </section>
    </aside>
  );
}

function Toggle({ label, on, onClick }) {
  return (
    <button type="button" className="fs-toggle" onClick={onClick} aria-pressed={on}>
      <span>{label}</span>
      <i className={`fs-toggle__track${on ? " on" : ""}`}><b /></i>
    </button>
  );
}
