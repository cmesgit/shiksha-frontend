import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FEATURED_COURSES, COURSE_TABS } from "./homeData";
import { getPublicFeatured, toFeaturedCard } from "../../api/coursesApi";

/* Section-scoped styles, ported from the design handoff's FeaturedCourses.jsx —
   shared tokens (--coral, --gold, --line, etc.) and the .sec/.wrap/.eyebrow/
   .em/.center/.btn/.rv "reveal" primitives come from ShikshaHome.css,
   imported once by the homepage composer. */
const css = `.fc-tabs{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:40px}
.fc-tab{font-family:var(--font);font-weight:700;font-size:13px;letter-spacing:.03em;text-transform:uppercase;padding:9px 18px;border-radius:999px;border:none;background:var(--coral-soft);color:var(--coral);cursor:pointer;transition:background .2s,color .2s,box-shadow .2s,transform .2s}
.fc-tab[aria-selected="true"]{background:var(--coral);color:#fff;box-shadow:0 8px 18px rgba(15,157,107,.3)}
.fc-tab:hover{transform:translateY(-1px)}
.fc-tab:focus-visible{outline:3px solid var(--coral);outline-offset:2px}
.fc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.fc-card{background:#fff;border-radius:24px;overflow:hidden;border:1.5px solid var(--line);transition:transform .25s,box-shadow .25s;display:flex;flex-direction:column}
.fc-card:hover{transform:translateY(-7px);box-shadow:0 26px 50px rgba(11,46,32,.13)}
.fc-thumb{position:relative;height:170px;padding:16px;background-size:cover !important;background-position:center !important}
.fc-thumb-ic{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:64px;height:64px;border-radius:20px;background:rgba(255,255,255,.16);display:grid;place-items:center;backdrop-filter:blur(2px)}
.fc-thumb-ic svg{width:30px;height:30px}
.fc-ribbon{position:absolute;top:14px;left:14px;background:var(--gold);color:var(--ink);font-family:var(--font);font-size:10.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:5px 11px;border-radius:999px}
.fc-heart{position:absolute;top:12px;right:12px;width:34px;height:34px;border-radius:50%;border:none;cursor:pointer;background:rgba(255,255,255,.2);display:grid;place-items:center;transition:background .2s,color .2s; color:#fff}
.fc-heart svg{width:16px;height:16px}
.fc-heart.on{background:#fff;color:var(--red)}
.fc-heart.on svg{fill:currentColor}
.fc-lvl{position:absolute;bottom:-13px;left:18px;background:#fff;border:1.5px solid var(--line);color:var(--coral-dark);font-family:var(--font);font-size:10.5px;font-weight:700;padding:5px 13px;border-radius:999px;box-shadow:0 6px 14px rgba(11,46,32,.08)}
.fc-body{padding:26px 20px 20px;display:flex;flex-direction:column;flex:1}
.fc-rate{display:flex;align-items:center;gap:7px}
.fc-rate svg{width:13px;height:13px}
.fc-rate span{font-size:11.5px;color:var(--body)}
.fc-body h3{font-family:var(--display);font-size:16.3px;font-weight:700;margin:8px 0 10px;line-height:1.35}
.fc-fact{display:flex;align-items:center;gap:7px;font-size:11.8px;color:var(--body)}
.fc-fact svg{width:14px;height:14px;color:#8AA396}
.fc-fact i{font-style:normal;color:#D4E2D8}
.fc-foot{display:flex;justify-content:space-between;align-items:center;margin-top:16px;border-top:1.5px dashed var(--line);padding-top:14px}
.fc-foot:has(.fc-explore:only-child){justify-content:center;padding-top:16px}
.fc-tutor{display:flex;align-items:center;gap:9px;font-family:var(--font);font-size:12.2px;font-weight:600;color:var(--ink-2)}
.fc-av{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;color:#fff;font-family:var(--display);font-weight:700;font-size:11.5px;border:2.5px solid #fff;flex-shrink:0}
.fc-price{font-family:var(--display);font-size:16.8px;font-weight:800;color:var(--coral)}
.fc-price small{font-style:normal;font-size:10.5px;color:var(--body);font-weight:600}
.fc-price.soon{font-family:var(--font);font-size:11.5px;font-weight:700;color:#B45309;background:#FFF3DC;padding:6px 12px;border-radius:999px}
.fc-enroll{font-family:var(--font);font-weight:700;font-size:12.5px;padding:9px 16px;border-radius:999px;border:none;background:var(--coral);color:#fff;display:inline-flex;align-items:center;gap:6px;cursor:pointer;transition:background .2s,transform .2s}
.fc-enroll svg{width:13px;height:13px}
.fc-enroll:hover{background:var(--coral-dark);transform:translateY(-1px)}
.fc-explore{font-family:var(--font);font-weight:700;font-size:13px;padding:11px 26px;border-radius:999px;border:none;background:var(--coral);color:#fff;cursor:pointer;transition:background .2s,transform .2s,box-shadow .2s;box-shadow:0 8px 18px rgba(15,157,107,.28)}
.fc-explore:hover{background:var(--coral-dark);transform:translateY(-2px);box-shadow:0 12px 24px rgba(15,157,107,.36)}
.fc-explore:focus-visible{outline:3px solid var(--coral);outline-offset:2px}
@media(max-width:980px){.fc-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:620px){.fc-grid{grid-template-columns:1fr}}
`

/* tiny thumbnail glyphs used on course cards, ported verbatim from
   HomeGreen.jsx's ThumbIcon (same kinds: flask/calc/compass, default book). */
const ThumbIcon = ({ kind }) => {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  if (kind === "flask")
    return (
      <svg {...common}>
        <path d="M9.5 3h5M10 3v5.5L4.8 18a2 2 0 0 0 1.8 3h10.8a2 2 0 0 0 1.8-3L14 8.5V3" />
        <path d="M7.5 15h9" />
      </svg>
    );
  if (kind === "calc")
    return (
      <svg {...common}>
        <rect x="5" y="3.5" width="14" height="17" rx="2.5" />
        <path d="M8.5 8h7M8.5 12.5h.01M12 12.5h.01M15.5 12.5h.01M8.5 16.5h.01M12 16.5h.01M15.5 16.5h.01" />
      </svg>
    );
  if (kind === "compass")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="m14.8 9.2-1.6 4.8-4.8 1.6 1.6-4.8z" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M4 19V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2z" />
      <path d="M4 19a2 2 0 0 0 2 2h14" />
    </svg>
  );
};

/* small UI icons used by this card grid, matched to the raw svgs baked
   into the design handoff's html string (heart/star/clock/arrow-right). */
const IcHeart = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M12 20.5s-8-4.9-8-11a4.6 4.6 0 0 1 8-3.1 4.6 4.6 0 0 1 8 3.1c0 6.1-8 11-8 11z" />
  </svg>
);

const IcStar = ({ off = false, ...p }) => (
  <svg viewBox="0 0 24 24" fill={off ? "#E3E8E4" : "#FFB21D"} aria-hidden="true" {...p}>
    <path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 17.1l-5.7 3.1 1.2-6.3L2.8 9.5l6.4-.8z" />
  </svg>
);

const IcClock = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const IcArrowRight = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ═══════════════════ FEATURED COURSES ═══════════════════
 * Same data/behavior contract as the previous hm-* implementation:
 * static FEATURED_COURSES render immediately; if the CMS has any active
 * showcase rows (getPublicFeatured), they fully replace the static set.
 * Only the markup/CSS below is new. */
export default function FeaturedCourses() {
  const rootRef = useRef(null);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [saved, setSaved] = useState(() => new Set());
  const [courses, setCourses] = useState(FEATURED_COURSES);

  useEffect(() => {
    let alive = true;
    getPublicFeatured().then((rows) => {
      if (alive && rows.length) setCourses(rows.map(toFeaturedCard));
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    root.querySelectorAll(".rv").forEach(function (el) {
      io.observe(el);
    });
    return () => io.disconnect();
  }, [courses, filter]);

  const toggleSave = (idx) =>
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });

  const visible = courses
    .map((c, i) => ({ ...c, idx: i }))
    .filter((c) => filter === "all" || c.cats.includes(filter))
    .slice(0, 3);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div ref={rootRef}>
        <section className="sec" id="courses">
          <div className="wrap">
            <div className="sec-head rv">
              <span className="eyebrow">
                <u>Featured Courses</u>
              </span>
              <h2>
                Explore our <span className="em">popular courses</span>
              </h2>
              <p>
                Some of our most popular academic and competitive programs, built
                to help learners succeed with structured guidance.
              </p>
            </div>

            <div className="fc-tabs rv" role="tablist" aria-label="Filter courses">
              {COURSE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  className="fc-tab"
                  role="tab"
                  type="button"
                  aria-selected={filter === tab.id}
                  onClick={() => setFilter(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="fc-grid">
              {visible.map((c) => (
                <article className="fc-card rv" key={c.idx}>
                  <div
                    className="fc-thumb"
                    style={{
                      background: `linear-gradient(135deg,${c.grad}),url('${c.img}') center/cover`,
                    }}
                  >
                    <span className="fc-thumb-ic">
                      <ThumbIcon kind={c.icon} />
                    </span>
                    {c.ribbon && <span className="fc-ribbon">{c.ribbon}</span>}
                    <button
                      className={`fc-heart${saved.has(c.idx) ? " on" : ""}`}
                      aria-label="Save course"
                      aria-pressed={saved.has(c.idx)}
                      type="button"
                      onClick={() => toggleSave(c.idx)}
                    >
                      <IcHeart />
                    </button>
                    <span className="fc-lvl">{c.lvl}</span>
                  </div>
                  <div className="fc-body">
                    <div className="fc-rate">
                      {[0, 1, 2, 3, 4].map((s) => (
                        <IcStar key={s} off={s >= c.stars} />
                      ))}
                      <span>({c.count})</span>
                    </div>
                    <h3>{c.title}</h3>
                    <div className="fc-fact">
                      <IcClock />
                      {c.fact}
                    </div>
                    <div className="fc-foot">
                      {c.explore ? (
                        <button
                          type="button"
                          className="fc-explore"
                          onClick={() =>
                            navigate(c.to, c.state ? { state: c.state } : undefined)
                          }
                        >
                          Explore Programs
                        </button>
                      ) : c.soon ? (
                        <>
                          <span className="fc-tutor">
                            <span className="fc-av" style={{ background: c.avColor }}>
                              {c.tutor[0]}
                            </span>
                            {c.tutor}
                          </span>
                          <span className="fc-price soon">Coming Soon</span>
                        </>
                      ) : (
                        <>
                          <span className="fc-price">
                            ₹{c.price}
                            <small> /month</small>
                          </span>
                          <button
                            type="button"
                            className="fc-enroll"
                            onClick={() =>
                              navigate(c.to || "/courses", {
                                state: {
                                  ...(c.state || { selectedBoardGroup: "central", selectedBoard: "cbse" }),
                                  ...(c.courseId ? { openCourseId: c.courseId } : null),
                                },
                              })
                            }
                          >
                            Enroll now <IcArrowRight />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="center rv">
              <Link className="btn btn-ghost" to="/courses">
                All courses <IcArrowRight />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
