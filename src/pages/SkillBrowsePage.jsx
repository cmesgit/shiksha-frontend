/**
 * SkillBrowsePage.jsx — the public expert directory.  Route: /skill/browse
 * (/skill-development redirects here.)
 *
 * The v2 design handoff (~/Downloads/SkillDevelopment.jsx + .html) rebuilt on
 * the live API. The handoff is a restyle of THIS page — its markup still has
 * dev data baked into it ("sdsd" as a category, "3 experts", "₹400 – ₹400") —
 * so it is treated as a design source, not as code to copy: the six sections
 * and every measurement come from the handoff, while all data, filtering,
 * sorting and paging stay server-side exactly as before.
 *
 * What the handoff did that is deliberately NOT carried over:
 *   - Three hardcoded teacher cards filtered by toggling `.is-hidden` on DOM
 *     nodes found with querySelectorAll. That cannot survive React re-rendering
 *     the list, and it would silently only ever filter the first page.
 *   - Bare modifier class names; see the rename map in css/SkillDevelopment.css.
 *
 * Endpoints
 *   GET /skill/categories/          → the category rail, with expert_count
 *   GET /skill/teachers/?<filters>  → results (paginated, 11 filters, 7 sorts)
 *   GET /skill/directory-stats/     → the four "at a glance" cards
 *   GET /skill/marketing/           → browse_hero + teach_banner copy (CMS)
 *   GET /skill/locations/           → NEW. The states and districts the roster
 *     is actually in. Replaces a hardcoded list of Mizoram's eight districts,
 *     which made the hero's "experts from across India" undeliverable — an
 *     expert in Assam was searchable but unreachable through the location
 *     filter. The rail cascades state -> district off this.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/apiClient";
import {
  fetchMarketingBlocks, fetchDirectoryStats, fetchDirectoryLocations,
} from "../api/skillApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SkillHeroArt from "../components/skill/skillArt";
import SkillFilters from "../components/skill/SkillFilters";
import TeacherCard from "../components/skill/TeacherCard";
import {
  DEFAULT_FILTERS, MODE_TEXT, PRICE_ANY, SORTS,
  activeFilterCount, toParams, fromUrl,
} from "../components/skill/directoryOptions";
import "../css/SkillDevelopment.css";

const POPULAR = ["Guitar", "Spoken English", "Weaving", "Python"];

const FAQ = [
  {
    q: "Do I need an account to browse teachers?",
    a: "No. Browsing the directory is free and needs no account — you can search, filter and open profiles as a guest. You’ll only need an account when you book a session.",
  },
  {
    q: "Where do the lessons actually happen?",
    a: "Online, at the teacher’s place, or with the teacher travelling to you. Every profile shows the modes that teacher offers, and you can filter the list by mode under “Where lessons happen”.",
  },
  {
    q: "How much does a session cost?",
    a: "Each teacher sets their own price, shown per 60-minute session. Some teach for free. Use the price filter to set the maximum you want to pay.",
  },
  {
    q: "Can I teach a skill on ShikshaCom?",
    a: "Yes. Create a teaching account, list the skills you teach and the modes you offer, and set your own price and slots. It takes less than 5 minutes.",
  },
];

/* ==========================================================================
   Hooks
   ========================================================================== */

/* The sticky filter rail and every in-page anchor have to clear the real
   header. SiteNav.css publishes a `--skn-header-h`, but it is a hardcoded
   `:root { 82px }` that never moves, while the live header is 78px normally,
   118px with the announcement bar up, and 72/112px under 640px. So measure the
   actual `.skn-spacer` and republish it as `--sk-header-h`. */
function useHeaderOffset(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    const spacer = document.querySelector(".skn-spacer");
    if (!root || !spacer) return undefined;

    const write = () => {
      const h = spacer.getBoundingClientRect().height;
      if (h > 0) root.style.setProperty("--sk-header-h", `${h}px`);
    };
    write();
    const ro = new ResizeObserver(write);
    ro.observe(spacer);
    return () => ro.disconnect();
  }, [rootRef]);
}

/**
 * Reveal-on-scroll.
 *
 * ⚠ The revealed flag is a DATA ATTRIBUTE, not a class, and that is
 * load-bearing. React owns `className` on these nodes and rewrites it whenever
 * its value changes, which wipes anything added imperatively. This page
 * re-renders its cards on every filter, sort and page change, and the FAQ
 * rewrites its own class on each toggle — a class-based flag would vanish and
 * the element would sit at opacity 0 forever, because an element still on
 * screen never re-triggers the observer. That exact bug shipped on /contact.
 *
 * `deps` keys on row IDENTITY, never on a count: the fallback and the fetched
 * list are often the same length, so a length-keyed dep never changes, while a
 * changed React `key` makes React destroy and recreate the node. That exact bug
 * shipped on /about. The handoff's io.unobserve() is also dropped — safe on a
 * static page, fatal here where four fetches land after mount.
 */
function useRevealOnScroll(rootRef, deps) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    /* Tell the stylesheet JS is alive, so `.sk-rv` may start invisible. Without
       this the page would be blank if this chunk ever failed to load. */
    root.classList.add("sk-js");

    const reveal = (el) => el.setAttribute("data-rv", "in");
    const items = Array.from(root.querySelectorAll(".sk-rv"));
    if (!("IntersectionObserver" in window)) {
      items.forEach(reveal);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) reveal(e.target); }),
      { threshold: 0.12 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef, deps]);
}

/**
 * The teach-promo CTA target is CMS-editable, and letting marketing repoint it
 * at a campaign domain is the point of that field — but react-router's <Link>
 * mangles an absolute URL into a path ("/https:/example.com") and 404s
 * silently. So anything that is not a bare in-app path renders as a real <a>.
 * Same helper shape as AboutUs.jsx, where this bug was found against a real
 * external CMS row.
 *
 * Either branch is an anchor, which also keeps the button height matching the
 * handoff — see the note in TeacherCard.jsx.
 */
function CtaLink({ href, className, children }) {
  const internal = typeof href === "string" && href.startsWith("/");
  if (internal) return <Link className={className} to={href}>{children}</Link>;
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/**
 * One FAQ row.
 *
 * ⚠ The stylesheet only ever declares `.sk-qa__a { max-height: 0 }` — there is
 * NO rule that opens the panel. The handoff drives it imperatively
 * (`panel.style.maxHeight = panel.scrollHeight + "px"`), so a port that just
 * toggles the class rotates the "+" into an "×" and expands nothing: the
 * accordion looks wired and answers nothing. Measured here instead, off a ref.
 *
 * Re-measured on resize because the answer re-wraps at narrow widths, which
 * changes its height while it is open — the handoff, being a fixed demo, never
 * had to handle that.
 */
function FaqItem({ item, open, onToggle }) {
  const answerRef = useRef(null);
  const [maxH, setMaxH] = useState(0);

  useEffect(() => {
    const el = answerRef.current;
    if (!el) return undefined;
    const measure = () => setMaxH(open ? el.scrollHeight : 0);
    measure();
    if (!open) return undefined;
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open, item.a]);

  return (
    <div className={`sk-qa sk-rv${open ? " sk-qa-open" : ""}`}>
      <button className="sk-qa__q" type="button" aria-expanded={open} onClick={onToggle}>
        {item.q}
        <span className="sk-qa__ic" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div className="sk-qa__a" ref={answerRef} style={{ maxHeight: `${maxH}px` }}>
        <p>{item.a}</p>
      </div>
    </div>
  );
}

/* ==========================================================================
   Page
   ========================================================================== */

export default function SkillBrowsePage() {
  const rootRef = useRef(null);
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
  const [locations, setLocations] = useState({ states: [], districts: [] });
  const [sheetOpen, setSheet]   = useState(false);
  const [openFaq, setOpenFaq]   = useState(-1);
  const [retryTick, setRetry]   = useState(0);

  useHeaderOffset(rootRef);

  useEffect(() => {
    api.get("/skill/categories/").then((r) => setCategories(r.data || [])).catch(() => {});
    fetchMarketingBlocks().then(setMarketing);
    fetchDirectoryStats().then(setStats);
    fetchDirectoryLocations().then(setLocations);
  }, []);

  // Debounced so typing in the hero search does not fire a request per key.
  useEffect(() => {
    const t = setTimeout(() => {
      const first = page === 1;
      if (first) setLoading(true); else setPaging(true);
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

  /* Re-arm the observer whenever the node set changes. Keyed on the rendered
     ids, plus the three async blocks that add sections of their own. */
  const revealKey = useMemo(
    () => [
      teachers.map((t) => t.id).join("|"),
      categories.map((c) => c.id).join("|"),
      stats ? "s" : "", marketing.browse_hero ? "m" : "",
      locations.states.length, locations.districts.length,
      loading, error, openFaq,
    ].join("~"),
    [teachers, categories, stats, marketing, locations, loading, error, openFaq]
  );
  useRevealOnScroll(rootRef, revealKey);

  /* Every one of these narrows or reorders the result set, so page 1 is the
     only sane landing spot — page 5 of the old query is very likely past the
     end of the new one, which would read to the user as "no results". */
  const setFilter    = useCallback((k, v) => { setPage(1); setFilters((f) => ({ ...f, [k]: v })); }, []);
  const changeSort   = useCallback((v) => { setPage(1); setSort(v); }, []);
  const changeSearch = useCallback((v) => { setPage(1); setSearch(v); }, []);
  const clearAll     = useCallback(() => {
    setPage(1); setFilters({ ...DEFAULT_FILTERS }); setSearch("");
  }, []);

  const gotoDirectory = useCallback(() => {
    document.getElementById("sk-directory")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  const pickPopular = useCallback((term) => { changeSearch(term); gotoDirectory(); },
    [changeSearch, gotoDirectory]);

  /** Removable chips above the results — one per non-default filter. */
  const chips = useMemo(() => {
    const out = [];
    const catLabel = categories.find((c) => (c.slug || c.id) === filters.cat)?.label;
    if (filters.cat !== "all" && catLabel) out.push({ label: catLabel, clear: () => setFilter("cat", "all") });
    if (filters.mode !== "all")       out.push({ label: MODE_TEXT[filters.mode],       clear: () => setFilter("mode", "all") });
    if (filters.state !== "all")      out.push({ label: filters.state,                 clear: () => setFilter("state", "all") });
    if (filters.district !== "all")   out.push({ label: filters.district,              clear: () => setFilter("district", "all") });
    if (filters.pincode)              out.push({ label: `PIN ${filters.pincode}`,      clear: () => setFilter("pincode", "") });
    if (filters.priceMax < PRICE_ANY) out.push({ label: `Under ₹${filters.priceMax}`,  clear: () => setFilter("priceMax", PRICE_ANY) });
    if (filters.lang)                 out.push({ label: filters.lang,                  clear: () => setFilter("lang", "") });
    if (filters.minRating)            out.push({ label: `${filters.minRating}★ and up`, clear: () => setFilter("minRating", 0) });
    if (filters.minExp)               out.push({ label: `${filters.minExp}+ years`,    clear: () => setFilter("minExp", 0) });
    if (filters.hasVideo)             out.push({ label: "Has intro video",             clear: () => setFilter("hasVideo", false) });
    if (filters.availWeek)            out.push({ label: "Available this week",         clear: () => setFilter("availWeek", false) });
    if (search.trim())                out.push({ label: `“${search.trim()}”`,          clear: () => changeSearch("") });
    return out;
  }, [filters, search, categories, setFilter, changeSearch]);

  /* CMS copy wins over the hardcoded strings — these are the empty-CMS
     fallback only. See seed_skill_v2_copy in shiksha-backend. */
  const hero        = marketing.browse_hero;
  const heroLabel   = hero?.subheading  || "Skill Development";
  const heroSub     = hero?.body        || "Verified experts from across India — online, at their place, or travelling to you. Browsing is free and needs no account.";
  const heroStat    = hero?.stat_label  || "listed across India";
  const teachBanner = marketing.teach_banner;
  const activeCount = activeFilterCount(filters);

  return (
    <>
      {/* Navbar and Footer sit OUTSIDE .skills-page deliberately. The page
          scope rebinds 13 custom properties that theme.css also declares on
          :root (--sk-ink, --sk-gold, --sk-font …); values match today, but any
          global chrome nested inside would silently pin these copies. */}
      <Navbar />

      <main className="skills-page" ref={rootRef}>

        {/* ============================== 1 · HERO ============================== */}
        <section className="sk-hero" aria-labelledby="sk-hero-title">
          <div className="sk-deco" aria-hidden="true">
            <span className="sk-dots sk-a" />
            <span className="sk-dots sk-b" />
            <span className="sk-ring" />
            <span className="sk-squiggle">
              <svg viewBox="0 0 100 28" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M3 14 Q9 0 15.5 14 Q22 28 28.5 14 Q35 0 41.5 14 Q48 28 54.5 14 Q61 0 67.5 14 Q74 28 80.5 14 Q87 0 93.5 14" />
              </svg>
            </span>
          </div>

          <div className="sk-wrap sk-hero__grid">
            <div className="sk-hero__copy sk-rv">
              <span className="sk-badge"><i aria-hidden="true" />{heroLabel}</span>
              <h1 id="sk-hero-title">Find a teacher for <em>any skill</em></h1>
              <p className="sk-hero__sub">{heroSub}</p>

              <div className="sk-search">
                <span className="sk-search__ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
                  </svg>
                </span>
                <label className="sk-sr" htmlFor="sk-q">Search skills</label>
                <input
                  id="sk-q"
                  type="search"
                  value={search}
                  onChange={(e) => changeSearch(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); gotoDirectory(); } }}
                  placeholder="Try “guitar”, “welding”, “spoken English”…"
                />
                <button className="sk-btn sk-btn--solid" type="button" onClick={gotoDirectory}>Search</button>
              </div>

              <div className="sk-popular">
                <span>Popular:</span>
                {POPULAR.map((p) => (
                  <button className="sk-chip" type="button" key={p} onClick={() => pickPopular(p)}>{p}</button>
                ))}
              </div>
            </div>

            <div className="sk-vis sk-rv sk-d2">
              <div className="sk-disc">
                <figure className="sk-art"><SkillHeroArt /></figure>
              </div>

              <span className="sk-fchip sk-a">
                <span className="sk-fi" style={{ background: "var(--sk-emerald)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.4" />
                  </svg>
                </span>
                <span><b>Across India</b><span>online or in person</span></span>
              </span>
              <span className="sk-fchip sk-b">
                <span className="sk-fi" style={{ background: "var(--sk-gold)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                  </svg>
                </span>
                <span><b>60-min sessions</b><span>book a free slot</span></span>
              </span>
              <span className="sk-fchip sk-c">
                <span className="sk-fi" style={{ background: "var(--sk-violet)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3 4 6.5v5c0 5 3.4 8.4 8 9.5 4.6-1.1 8-4.5 8-9.5v-5z" /><path d="m9 12 2.2 2.2L15.5 10" />
                  </svg>
                </span>
                <span><b>Verified experts</b><span>no account to browse</span></span>
              </span>
            </div>
          </div>
        </section>

        {/* ========================== 2 · FEATURE STRIP ========================== */}
        <section className="sk-strip" aria-label="What the directory offers">
          <div className="sk-wrap sk-strip__row">
            <div className="sk-sf">
              <span className="sk-sf__ic" style={{ "--sk-c": "var(--sk-emerald)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3 4 6.5v5c0 5 3.4 8.4 8 9.5 4.6-1.1 8-4.5 8-9.5v-5z" /><path d="m9 12 2.2 2.2L15.5 10" />
                </svg>
              </span>
              <span><b>Verified experts</b><span>from across India</span></span>
            </div>
            <div className="sk-sf">
              <span className="sk-sf__ic" style={{ "--sk-c": "var(--sk-violet)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h18" /><circle cx="12" cy="12" r="9" /><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
                </svg>
              </span>
              <span><b>Three ways to learn</b><span>online, their place or yours</span></span>
            </div>
            <div className="sk-sf">
              <span className="sk-sf__ic" style={{ "--sk-c": "var(--sk-blue)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
                </svg>
              </span>
              <span><b>Free to browse</b><span>no account needed</span></span>
            </div>
            <div className="sk-sf">
              <span className="sk-sf__ic" style={{ "--sk-c": "var(--sk-gold-deep)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4.5" width="18" height="17" rx="3" /><path d="M8 2.5v4M16 2.5v4M3 10h18" />
                </svg>
              </span>
              <span><b>60-minute sessions</b><span>priced by each teacher</span></span>
            </div>
          </div>
        </section>

        {/* ========================== 3 · HOW IT WORKS ========================== */}
        <section className="sk-sec" id="sk-how">
          <div className="sk-wrap">
            <div className="sk-head sk-rv">
              <span className="sk-eyebrow"><u>How It Works</u></span>
              <h2>Three steps to your <span className="sk-em">first session</span></h2>
              <p>Browse the directory, shortlist the teachers who fit, and book a slot that suits you.</p>
            </div>
            <div className="sk-steps">
              <article className="sk-step sk-rv" style={{ "--sk-g": "linear-gradient(135deg,#12b47a 0%,#0B5B3E 100%)" }}>
                <span className="sk-step__n" aria-hidden="true">01</span>
                <span className="sk-step__ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
                  </svg>
                </span>
                <h3>Search a skill</h3>
                <p>Type what you want to learn — guitar, welding, spoken English — or start from one of the
                  popular searches.</p>
              </article>
              <article className="sk-step sk-rv sk-d1" style={{ "--sk-g": "linear-gradient(135deg,#7C5CFC 0%,#5b3fd6 100%)" }}>
                <span className="sk-step__n" aria-hidden="true">02</span>
                <span className="sk-step__ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 6h16M7 12h10M10 18h4" />
                  </svg>
                </span>
                <h3>Compare teachers</h3>
                <p>Filter by where lessons happen, district, price, language and rating until the list matches
                  what you need.</p>
              </article>
              <article className="sk-step sk-rv sk-d2" style={{ "--sk-g": "linear-gradient(135deg,#F59E0B 0%,#E14D2A 100%)" }}>
                <span className="sk-step__n" aria-hidden="true">03</span>
                <span className="sk-step__ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4.5" width="18" height="17" rx="3" /><path d="M8 2.5v4M16 2.5v4M3 10h18" /><path d="m9 15 2 2 4-4" />
                  </svg>
                </span>
                <h3>Book a session</h3>
                <p>Open a profile, pick an open slot from their week, and book a 60-minute session at the price
                  they list.</p>
              </article>
            </div>
          </div>
        </section>

        {/* =========================== 4 · DIRECTORY =========================== */}
        <section className="sk-sec sk-sec--tint" id="sk-directory">
          <div className="sk-wrap">

            <div className="sk-head sk-rv">
              <span className="sk-eyebrow"><u>The Directory</u></span>
              <h2>Teachers, <span className="sk-em">at a glance</span></h2>
              <p>Everyone currently listed on ShikshaCom, with the filters to narrow them down.</p>
            </div>

            {/* Real numbers from /skill/directory-stats/. The panel is hidden
                rather than shown with invented constants when it can't load. */}
            {stats && (
              <div className="sk-glance">
                <div className="sk-gcard sk-rv" style={{ "--sk-t": "#E7F6F4", "--sk-c": "#0A7A71" }}>
                  <span className="sk-gcard__ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </span>
                  <b>{stats.experts} {stats.experts === 1 ? "expert" : "experts"}</b>
                  <span>{heroStat}</span>
                </div>
                <div className="sk-gcard sk-rv sk-d1" style={{ "--sk-t": "#FDF4E3", "--sk-c": "#B4750A" }}>
                  <span className="sk-gcard__ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" />
                      <rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" />
                    </svg>
                  </span>
                  <b>{stats.categories} {stats.categories === 1 ? "category" : "categories"}</b>
                  <span>music to industrial trades</span>
                </div>
                <div className="sk-gcard sk-rv sk-d2" style={{ "--sk-t": "#F1EEFE", "--sk-c": "#5A3BD8" }}>
                  <span className="sk-gcard__ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9.5 12 3l9 6.5V20a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20z" /><path d="M9.5 21.5V13h5v8.5" />
                    </svg>
                  </span>
                  <b>{stats.offline} teach offline</b>
                  <span>at their place or yours</span>
                </div>
                {/* price_p25/p75 are null when nobody has a price set. */}
                {stats.price_p25 != null && (
                  <div className="sk-gcard sk-rv sk-d3" style={{ "--sk-t": "#EAF2FE", "--sk-c": "#2159BE" }}>
                    <span className="sk-gcard__ic">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 4h9a4 4 0 0 1 0 8H6M6 8h12M6 12h12M13 12l6 8" />
                      </svg>
                    </span>
                    <b>₹{stats.price_p25} – ₹{stats.price_p75}</b>
                    <span>typical session price</span>
                  </div>
                )}
              </div>
            )}

            <div className="sk-dir">

              {/* ---------------------------- FILTERS ---------------------------- */}
              <div>
                <button
                  className="sk-ftrigger"
                  type="button"
                  aria-expanded={sheetOpen}
                  aria-controls="sk-filters"
                  onClick={() => setSheet((v) => !v)}
                >
                  Filters{activeCount ? ` (${activeCount})` : ""}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <SkillFilters
                  filters={filters}
                  categories={categories}
                  locations={locations}
                  onChange={setFilter}
                  onClear={clearAll}
                  open={sheetOpen}
                />
              </div>

              {/* ---------------------------- RESULTS ---------------------------- */}
              <div>
                <div className="sk-toolbar">
                  <div>
                    <h2>
                      <span id="sk-count">{loading ? "…" : count}</span>
                      {" "}teacher{count === 1 && !loading ? "" : "s"} available
                    </h2>
                    <p>
                      {filters.district !== "all" || filters.state !== "all"
                        ? `In ${filters.district !== "all" ? filters.district : filters.state}, plus everyone teaching online`
                        : "Featured teachers appear first, then by rating and sessions taught"}
                    </p>
                  </div>
                  <div className="sk-sort">
                    <label htmlFor="sk-sortby">Sort by</label>
                    <select
                      className="sk-select"
                      id="sk-sortby"
                      value={sort}
                      onChange={(e) => changeSort(e.target.value)}
                    >
                      {SORTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </div>
                </div>

                {chips.length > 0 && (
                  <div className="sk-active">
                    {chips.map((c) => (
                      <button className="sk-achip" type="button" key={c.label} onClick={c.clear}>
                        {c.label}<i aria-hidden="true">✕</i>
                      </button>
                    ))}
                  </div>
                )}

                {loading ? (
                  <div className="sk-list">
                    {[0, 1, 2].map((i) => <div className="sk-tcard sk-skel" key={i} aria-hidden="true" />)}
                    <p className="sk-sr" role="status">Loading teachers…</p>
                  </div>
                ) : error ? (
                  <div className="sk-empty sk-show">
                    <b>Couldn’t load the directory</b>
                    <p>Your filters are kept. Try again in a moment.</p>
                    <button className="sk-btn sk-btn--ghost" type="button" onClick={() => setRetry((n) => n + 1)}>
                      Try again
                    </button>
                  </div>
                ) : teachers.length === 0 ? (
                  <div className="sk-empty sk-show">
                    <b>No teachers match these filters</b>
                    <p>Try widening the price range, choosing any mode, or clearing a language.</p>
                    <button className="sk-btn sk-btn--ghost" type="button" onClick={clearAll}>
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="sk-list" id="sk-list">
                      {teachers.map((t) => (
                        <TeacherCard key={t.id} expert={t} />
                      ))}
                    </div>

                    {hasNext && (
                      <div className="sk-loadmore">
                        <button
                          className="sk-btn sk-btn--ghost"
                          type="button"
                          disabled={paging}
                          onClick={() => setPage((n) => n + 1)}
                        >
                          {paging ? "Loading…" : "Show more teachers"}
                        </button>
                      </div>
                    )}
                  </>
                )}

                <div className="sk-more sk-rv">
                  <div>
                    <b>Looking for something else?</b>
                    <p>Jump straight to one of the skills people search for most.</p>
                  </div>
                  <div className="sk-chips">
                    {POPULAR.map((p) => (
                      <button className="sk-chip" type="button" key={p} onClick={() => pickPopular(p)}>{p}</button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ============================== 5 · FAQ ============================== */}
        <section className="sk-sec" id="sk-faq">
          <div className="sk-wrap">
            <div className="sk-head sk-rv">
              <span className="sk-eyebrow"><u>Before You Book</u></span>
              <h2>Questions learners <span className="sk-em">usually ask</span></h2>
            </div>
            <div className="sk-faq">
              {FAQ.map((item, i) => (
                <FaqItem
                  key={item.q}
                  item={item}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq((cur) => (cur === i ? -1 : i))}
                />
              ))}
            </div>
          </div>
        </section>

        {/* =========================== 6 · TEACH PROMO =========================== */}
        <section className="sk-sec" id="sk-teach" style={{ paddingTop: 0 }}>
          <div className="sk-wrap">
            <div className="sk-promo sk-rv">
              <div className="sk-promo__grid">
                <div>
                  <span className="sk-eyebrow"><u>Teach On ShikshaCom</u></span>
                  <h2>{teachBanner?.heading || "Are you an expert at something?"}</h2>
                  <p>{teachBanner?.body || "Share your craft with students across India. Create a teaching account — it takes less than 5 minutes."}</p>
                  <div className="sk-promo__acts">
                    <CtaLink
                      className="sk-btn sk-btn--gold"
                      href={teachBanner?.cta_url || "/signup?role=teacher&add_track=skill"}
                    >
                      {teachBanner?.cta_label || "I want to teach my craft"}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </CtaLink>
                  </div>
                </div>
                <div className="sk-promo__list">
                  {[
                    ["List the skills you teach", "Music, trades, languages, computing — anything you know well."],
                    ["Choose how you teach", "Online, at your place, or travelling to the learner."],
                    ["Set your price and slots", "You decide the session price and the hours you open up."],
                  ].map(([title, body]) => (
                    <div className="sk-pl" key={title}>
                      <span className="sk-pl__k" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m5 12.5 4.5 4.5L19 7" />
                        </svg>
                      </span>
                      <span><b>{title}</b><span>{body}</span></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
