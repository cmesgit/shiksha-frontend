/**
 * SkillBrowsePage.jsx — public expert directory.  Route: /skill/browse
 *
 * Same route, same CMS blocks as the page it replaces; what changes is that it
 * now asks the backend for everything it already supports and shows everything
 * the serializer already returns. The old page rendered about a third of
 * ExpertCardSerializer into a 270px card and exposed 2 of the 10 filters the
 * directory view accepts.
 *
 * Endpoints
 *   GET /skill/categories/                    → filter rail
 *   GET /skill/teachers/?<filters>            → results (paginated)
 *   GET /skill/directory-stats/               → hero "at a glance" panel
 *   GET /skill/marketing/                     → browse_hero + teach_banner copy
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/apiClient";
import { fetchMarketingBlocks, fetchDirectoryStats } from "../api/skillApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterSidebar, {
  DEFAULT_FILTERS, MODE_TEXT, PRICE_ANY, activeFilterCount,
} from "../components/skill/FilterSidebar";
import ExpertRow from "../components/skill/ExpertRow";
import ExpertRowSkeleton from "../components/skill/ExpertRowSkeleton";
import "./SkillBrowsePage.css";

const SORTS = [
  ["recommended", "Recommended"],
  ["rating",      "Highest rated"],
  ["price_asc",   "Price: low to high"],
  ["price_desc",  "Price: high to low"],
  ["sessions",    "Most sessions"],
  ["experience",  "Most experienced"],
  ["newest",      "Newest"],
];

const POPULAR = ["Guitar", "Spoken English", "Weaving", "Python"];

/** Filters → query params. Anything at its default is omitted. */
function toParams(f, search, sort) {
  const p = {};
  if (search.trim())            p.search         = search.trim();
  if (f.cat !== "all")          p.cat            = f.cat;
  if (f.mode !== "all")         p.mode           = f.mode;
  if (f.district !== "all")     p.district       = f.district;
  if (f.pincode)                p.pincode        = f.pincode;
  if (f.priceMax < PRICE_ANY)   p.price_max      = f.priceMax;
  if (f.lang)                   p.lang           = f.lang;
  if (f.minRating)              p.min_rating     = f.minRating;
  if (f.minExp)                 p.min_experience = f.minExp;
  if (f.hasVideo)               p.has_video      = 1;
  if (f.availWeek)              p.available_week = 1;
  if (sort !== "recommended")   p.sort           = sort;
  return p;
}

/** URL → filters, so a pasted filtered directory comes back the same. */
function fromUrl(sp) {
  const num = (k, d) => (sp.get(k) != null ? Number(sp.get(k)) : d);
  return {
    cat:       sp.get("cat") || "all",
    mode:      sp.get("mode") || "all",
    district:  sp.get("district") || "all",
    pincode:   sp.get("pincode") || "",
    priceMax:  num("price_max", PRICE_ANY),
    lang:      sp.get("lang") || "",
    minRating: num("min_rating", 0),
    minExp:    num("min_experience", 0),
    hasVideo:  sp.get("has_video") === "1",
    availWeek: sp.get("available_week") === "1",
  };
}

export default function SkillBrowsePage() {
  const navigate = useNavigate();
  const [urlParams, setUrlParams] = useSearchParams();

  const [filters, setFilters]   = useState(() => ({ ...DEFAULT_FILTERS, ...fromUrl(urlParams) }));
  const [search, setSearch]     = useState(urlParams.get("q") || "");
  const [sort, setSort]         = useState(urlParams.get("sort") || "recommended");
  const [page, setPage]         = useState(1);
  const [teachers, setTeachers] = useState([]);
  const [count, setCount]       = useState(0);
  const [hasNext, setHasNext]   = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [paging, setPaging]     = useState(false);
  const [error, setError]       = useState(null);
  const [marketing, setMarketing] = useState({});
  const [stats, setStats]       = useState(null);
  const [sheetOpen, setSheet]   = useState(false);
  const [retryTick, setRetry]   = useState(0);

  useEffect(() => {
    api.get("/skill/categories/").then((r) => setCategories(r.data || [])).catch(() => {});
    fetchMarketingBlocks().then(setMarketing);
    fetchDirectoryStats().then(setStats);
  }, []);

  // Debounced so typing in the hero search does not fire a request per key.
  useEffect(() => {
    const t = setTimeout(() => {
      const first = page === 1;
      first ? setLoading(true) : setPaging(true);
      setError(null);
      api.get("/skill/teachers/", { params: { ...toParams(filters, search, sort), page } })
        .then((r) => {
          const rows = Array.isArray(r.data) ? r.data : r.data.results || [];
          setTeachers((prev) => (first ? rows : [...prev, ...rows]));
          setCount(Array.isArray(r.data) ? rows.length : r.data.count ?? rows.length);
          setHasNext(Boolean(!Array.isArray(r.data) && r.data.next));
        })
        .catch(() => setError("Could not load the directory."))
        .finally(() => { setLoading(false); setPaging(false); });
    }, 250);
    return () => clearTimeout(t);
  }, [filters, search, sort, page, retryTick]);

  // Keep the URL shareable — a filtered directory should survive a paste.
  useEffect(() => {
    const next = toParams(filters, search, sort);
    if (search.trim()) { next.q = search.trim(); delete next.search; }
    setUrlParams(next, { replace: true });
  }, [filters, search, sort, setUrlParams]);

  // Every one of these narrows or reorders the result set, so page 1 is the
  // only sane landing spot — page 5 of the old query is very likely past the
  // end of the new one, which would read to the user as "no results".
  const setFilter  = useCallback((k, v) => { setPage(1); setFilters((f) => ({ ...f, [k]: v })); }, []);
  const changeSort = useCallback((v) => { setPage(1); setSort(v); }, []);
  const changeSearch = useCallback((v) => { setPage(1); setSearch(v); }, []);
  const clearAll   = useCallback(() => {
    setPage(1); setFilters({ ...DEFAULT_FILTERS }); setSearch("");
  }, []);

  const openBooking = useCallback((expert, listing) => {
    // No listing = a multi-skill row's "Choose a skill" — land on the booking
    // tab with the skill picker rather than guessing which one they meant.
    const q = listing ? `&listing=${listing.id}` : "";
    navigate(`/experts/${expert.id}?action=book${q}`);
  }, [navigate]);

  /** Removable chips above the results — one per non-default filter. */
  const chips = useMemo(() => {
    const out = [];
    const catLabel = categories.find((c) => (c.slug || c.id) === filters.cat)?.label;
    if (filters.cat !== "all" && catLabel) out.push({ label: catLabel,                    clear: () => setFilter("cat", "all") });
    if (filters.mode !== "all")            out.push({ label: MODE_TEXT[filters.mode],     clear: () => setFilter("mode", "all") });
    if (filters.district !== "all")        out.push({ label: filters.district,            clear: () => setFilter("district", "all") });
    if (filters.pincode)                   out.push({ label: `PIN ${filters.pincode}`,    clear: () => setFilter("pincode", "") });
    if (filters.priceMax < PRICE_ANY)      out.push({ label: `Under ₹${filters.priceMax}`, clear: () => setFilter("priceMax", PRICE_ANY) });
    if (filters.lang)                      out.push({ label: filters.lang,                clear: () => setFilter("lang", "") });
    if (filters.minRating)                 out.push({ label: `${filters.minRating}★ and up`, clear: () => setFilter("minRating", 0) });
    if (filters.minExp)                    out.push({ label: `${filters.minExp}+ years`,  clear: () => setFilter("minExp", 0) });
    if (filters.hasVideo)                  out.push({ label: "Has intro video",           clear: () => setFilter("hasVideo", false) });
    if (filters.availWeek)                 out.push({ label: "Available this week",       clear: () => setFilter("availWeek", false) });
    if (search.trim())                     out.push({ label: `“${search.trim()}”`,        clear: () => changeSearch("") });
    return out;
  }, [filters, search, categories, setFilter, changeSearch]);

  const hero        = marketing.browse_hero;
  const heroLabel   = hero?.subheading || "Skill Development";
  const heroTitle   = hero?.heading    || "Find a teacher for any skill";
  const heroSub     = hero?.body       || "Verified experts from across Mizoram — online, at their place, or travelling to you. Browsing is free and needs no account.";
  const teachBanner = marketing.teach_banner;
  const activeCount = activeFilterCount(filters);

  return (
    <div className="sbp-page">
      <Navbar />

      <header className="sbp-hero">
        <div className="sbp-hero__grid" aria-hidden="true" />
        <div className="sbp-hero__glow sbp-hero__glow--1" aria-hidden="true" />
        <div className="sbp-hero__glow sbp-hero__glow--2" aria-hidden="true" />
        <div className="sbp-hero__glow sbp-hero__glow--3" aria-hidden="true" />

        <div className="sbp-hero__inner">
          <div>
            <p className="sbp-hero__label">{heroLabel}</p>
            <h1 className="sbp-hero__title">{heroTitle}</h1>
            <p className="sbp-hero__sub">{heroSub}</p>

            <form className="sbp-search" onSubmit={(e) => e.preventDefault()} role="search">
              <svg viewBox="0 0 24 24" fill="none" stroke="#5e7469" strokeWidth="2.2"
                   strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
              </svg>
              <input
                value={search}
                onChange={(e) => changeSearch(e.target.value)}
                placeholder="Try “guitar”, “welding”, “spoken English”…"
                aria-label="Search teachers and skills"
              />
              <button type="submit" className="sbp-search__btn">Search</button>
            </form>

            <div className="sbp-popular">
              <span>Popular:</span>
              {POPULAR.map((p) => (
                <button key={p} type="button" onClick={() => changeSearch(p)}>{p}</button>
              ))}
            </div>
          </div>

          {/* Real numbers from /skill/directory-stats/ — the panel is hidden
              rather than shown with invented constants when it can't load. */}
          {stats && (
            <aside className="sbp-glance">
              <h2>Directory at a glance</h2>
              <ul>
                <li>
                  <i style={{ background: "#1dcaab" }} />
                  <b>{stats.experts} {stats.experts === 1 ? "expert" : "experts"}</b>
                  <span>listed across Mizoram</span>
                </li>
                <li>
                  <i style={{ background: "#fbbf24" }} />
                  <b>{stats.categories} categories</b>
                  <span>music to industrial trades</span>
                </li>
                <li>
                  <i style={{ background: "#a78bfa" }} />
                  <b>{stats.offline} teach offline</b>
                  <span>at their place or yours</span>
                </li>
                {stats.price_p25 != null && (
                  <li>
                    <i style={{ background: "#60a5fa" }} />
                    <b>₹{stats.price_p25} – ₹{stats.price_p75}</b>
                    <span>typical session price</span>
                  </li>
                )}
              </ul>
            </aside>
          )}
        </div>
      </header>

      <div className="sbp-body">
        <div className="sbp-filters-btn">
          <button type="button" onClick={() => setSheet((v) => !v)} aria-expanded={sheetOpen}>
            Filters{activeCount ? ` (${activeCount})` : ""}
          </button>
        </div>

        <FilterSidebar
          filters={filters}
          categories={categories}
          onChange={setFilter}
          onClear={clearAll}
          open={sheetOpen}
        />

        <main className="sbp-results">
          <div className="sbp-results__head">
            <div>
              <h2>{loading ? "Loading…" : `${count} teacher${count === 1 ? "" : "s"} available`}</h2>
              <p>
                {filters.district !== "all"
                  ? `In ${filters.district}, plus everyone teaching online`
                  : "Featured teachers appear first, then by rating and sessions taught"}
              </p>
            </div>
            <label className="sbp-sort">
              Sort by
              <select value={sort} onChange={(e) => changeSort(e.target.value)}>
                {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </label>
          </div>

          {chips.length > 0 && (
            <div className="sbp-chips">
              {chips.map((c) => (
                <button key={c.label} type="button" onClick={c.clear}>{c.label} <span>✕</span></button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="sbp-list">{[0, 1, 2, 3].map((i) => <ExpertRowSkeleton key={i} />)}</div>
          ) : error ? (
            <div className="sbp-error">
              <h3>Couldn't load the directory</h3>
              <p>Your filters are kept. Try again in a moment.</p>
              <button type="button" onClick={() => setRetry((n) => n + 1)}>Try again</button>
            </div>
          ) : teachers.length === 0 ? (
            <div className="sbp-empty">
              <h3>No teachers match these filters</h3>
              <p>Try widening the price range, or clear the location filter to include online teachers.</p>
              <button type="button" onClick={clearAll}>Clear all filters</button>
            </div>
          ) : (
            <>
              <div className="sbp-list">
                {teachers.map((t) => (
                  <ExpertRow
                    key={t.id}
                    expert={t}
                    onOpen={() => navigate(`/experts/${t.id}`)}
                    onBook={openBooking}
                    onPlayIntro={(e) => navigate(`/experts/${e.id}`)}
                  />
                ))}
              </div>
              {hasNext && (
                <div className="sbp-more">
                  <button type="button" disabled={paging} onClick={() => setPage((n) => n + 1)}>
                    {paging ? "Loading…" : "Show more teachers"}
                  </button>
                </div>
              )}
            </>
          )}

          <section className="sbp-teach">
            <div>
              <h3>{teachBanner?.heading || "Are you an expert at something?"}</h3>
              <p>{teachBanner?.body || "Share your craft with students across Mizoram. Create a teaching account — it takes less than 5 minutes."}</p>
            </div>
            <button type="button" onClick={() => navigate(teachBanner?.cta_url || "/signup?role=teacher&skill=true")}>
              {teachBanner?.cta_label || "I want to teach my craft →"}
            </button>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
