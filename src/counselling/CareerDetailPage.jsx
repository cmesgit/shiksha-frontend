// PLACEMENT: src/counselling/CareerDetailPage.jsx   (NEW FILE — landing/frontend app)
//
// Workflow §7a — the full career profile. Sticky header + five tabs:
// Overview · Specialisations · Exams & Prep · Colleges · Jobs & Salary.
// Reached from a path card on the Career Report, or directly at
// /counselling/careers/:key.
//
// SCOPE: all thirty careers in CAREER_DETAIL have a page. Six have a
// hand-written CAREER_FULL; the rest are assembled by synthCareerFull()
// from CAREER_DETAIL + CAREER_INDIA.
//
// This reverses an earlier decision, on purpose and with evidence. The old
// note here argued the other twenty-four should stay shut because the v3
// prototype filled them with filler that "reads as content but tells a
// student nothing". Driving the board's Artificial Intelligence and Fashion
// Design screens showed that is true of ONE tab, not the screen: Jobs &
// Salary is entirely real data we already hold, Specialisations is the
// career's own roles, and the generic day-in-the-life / pros / cons blocks
// are generic ON THE BOARD too. Exams & Prep is the filler — but it is
// non-committal ("by Respective authority", "Varies by institution"), so it
// asserts nothing false. See data/careerFullSynth.js for the full reasoning.
//
// 🔴 The Colleges tab is DROPPED for a career with no college data rather
// than synthesised. The board's list is curated and includes institutes
// outside NIRF Overall entirely (NIFT, NID), so nirf980.js cannot stand in
// for it, and inventing colleges would misdirect real applicants.
//
// All content here is static reference data, not user data — there is no
// API call on this screen.

import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CounsellingShell from "./CounsellingShell";
import RoleDrawer from "./RoleDrawer";
import { toCareerKey, degreesFor, assertVocabInSync } from "./careerVocab";
import { getDegreeInfo } from "./data/degreeInfo";
import { admissionLinkFor } from "./admissionLinks";
import { CAREER_DETAIL } from "./data/careerDetail";
import { CAREER_INDIA } from "./data/careerIndia";
import { CAREER_FULL } from "./data/careerFullDetail";
import { synthCareerFull } from "./data/careerFullSynth";

// careerVocab.js hardcodes its key lists so that MyPathPage can import it
// without dragging ~120 kB of career content into a screen that renders none
// of it. This is the only module that holds both, so it is where the two are
// checked against each other (no-op outside dev).
assertVocabInSync(CAREER_DETAIL, CAREER_FULL);

const TABS = [
  ["overview", "Overview"],
  ["branches", "Specialisations"],
  ["exams", "Exams & Prep"],
  ["colleges", "Colleges"],
  ["careers", "Jobs & Salary"],
];

// The board's eyebrow above the title is the stream the career is open to:
// "SCIENCE STREAM" for AI, "OPEN TO ALL STREAMS" for Fashion Design. Read
// from CAREER_INDIA.streams, which is the same list the careers grid filters
// on — so the eyebrow cannot drift from the chip that led the student here.
const ALL_STREAMS = ["pcm", "pcb", "commerce", "arts"];
const STREAM_LABEL = { pcm: "Science (PCM)", pcb: "Science (PCB)", commerce: "Commerce", arts: "Arts / Humanities" };

function STREAM_EYEBROW(indiaRow) {
  const s = indiaRow?.streams || [];
  if (!s.length) return "";
  if (ALL_STREAMS.every((k) => s.includes(k))) return "Open to all streams";
  // Science-only reads as plain "Science stream" on the board — it prints
  // that for AI, which is PCM alone, so the rule is "no non-science stream"
  // rather than "both science streams".
  if (s.every((k) => k === "pcm" || k === "pcb")) return "Science stream";
  return s.map((k) => STREAM_LABEL[k] || k).join(" · ");
}

const DIFFICULTY_BY_LEVEL = {
  National: "Highly competitive",
  State: "Competitive",
  "Institute-level": "Competitive",
  "Company-level": "Varies by employer",
  International: "Merit-based",
};

// Rank/fee/placement arrive as display strings ("NIRF #3", "~₹2.5 LPA/yr").
// Pull the first number out for sorting; a row with no number sorts last
// rather than colliding with a real 0.
const num = (s, fallback) => {
  const m = String(s || "").match(/[\d.]+/);
  return m ? parseFloat(m[0]) : fallback;
};

function Chips({ items }) {
  return <div className="sc-tags">{items.map((x) => <span key={x} className="sc-chip">{x}</span>)}</div>;
}

// ── Overview ──────────────────────────────────────────────────────────────
function OverviewTab({ career }) {
  const { detail, full, title, degrees, examNames } = career;
  const stats = [
    ["Market demand", detail?.marketDemand],
    ["Fresher salary", detail?.salaryFresher],
    ["Mid-career", detail?.salaryMid],
    ["Senior salary", detail?.salarySenior],
  ].filter(([, v]) => v);

  return (
    <>
      {stats.length > 0 && (
        <div className="cf-stats">
          {stats.map(([label, value]) => (
            <div key={label} className="cf-stat">
              <span className="cf-stat-label">{label}</span>
              <span className="cf-stat-value">{value}</span>
            </div>
          ))}
        </div>
      )}

      <div className="sc-card cf-facts">
        <div>
          <span className="cf-kvlabel">Typical degrees</span>
          <span className="cf-kvvalue">{degrees.join(" · ") || "—"}</span>
        </div>
        <div>
          <span className="cf-kvlabel">Entrance exams</span>
          <span className="cf-kvvalue">{examNames.join(" · ") || "—"}</span>
        </div>
      </div>

      <section className="cf-sec">
        <h2 className="sc-h2">What is {title}?</h2>
        {full.tagline && <p className="cf-tagline">{full.tagline}</p>}
        <p className="cf-p">{full.intro || detail?.overview}</p>
      </section>

      {full.outlook && (
        <section className="cf-sec">
          <h2 className="sc-h2">Career outlook</h2>
          <p className="cf-p">{full.outlook}</p>
        </section>
      )}

      {(full.dayInLife || []).length > 0 && (
        <section className="cf-sec">
          <h2 className="sc-h2">A day in the life</h2>
          <ul className="cf-list">
            {full.dayInLife.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </section>
      )}

      {((full.pros || []).length > 0 || (full.cons || []).length > 0) && (
        <div className="sc-grid2 cf-proscons">
          {(full.pros || []).length > 0 && (
            <section className="sc-card cf-pros">
              <h3 className="cf-sec-h3">Why it works</h3>
              <ul className="cf-list">{full.pros.map((p) => <li key={p}>{p}</li>)}</ul>
            </section>
          )}
          {(full.cons || []).length > 0 && (
            <section className="sc-card cf-cons">
              <h3 className="cf-sec-h3">Worth knowing</h3>
              <ul className="cf-list">{full.cons.map((c) => <li key={c}>{c}</li>)}</ul>
            </section>
          )}
        </div>
      )}
    </>
  );
}

// ── Specialisations ───────────────────────────────────────────────────────
function DegreeCard({ name }) {
  const [open, setOpen] = useState(false);
  const info = getDegreeInfo(name);
  if (!info) return null;
  return (
    <div className="sc-card cf-degree">
      <button className="cf-degree-head" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>
          <strong>{name}</strong>
          <em>{info.full} · {info.duration}</em>
        </span>
        <span className="cf-chev">{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <div className="cf-degree-body">
          <p className="cf-p">{info.about}</p>
          {(info.specializations || []).length > 0 && (
            <>
              <h4 className="cf-sec-h4">Specialisations within this degree</h4>
              <ul className="cf-deflist">
                {info.specializations.map((s) => (
                  <li key={s.name}><strong>{s.name}</strong> — {s.desc}</li>
                ))}
              </ul>
            </>
          )}
          {(info.subjects || []).length > 0 && (
            <>
              <h4 className="cf-sec-h4">Subjects studied</h4>
              <Chips items={info.subjects} />
            </>
          )}
          {(info.careerOptions || []).length > 0 && (
            <>
              <h4 className="cf-sec-h4">Where it leads</h4>
              <ul className="cf-deflist">
                {info.careerOptions.map((c) => (
                  <li key={c.title}><strong>{c.title}</strong> — {c.desc}</li>
                ))}
              </ul>
            </>
          )}
          {info.further && (
            <>
              <h4 className="cf-sec-h4">Further study</h4>
              <p className="cf-p">{info.further}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function BranchesTab({ career, onOpenRole }) {
  const { full, title, degrees } = career;
  const branches = full.branches || [];
  return (
    <>
      {degrees.length > 0 && (
        <section className="cf-sec">
          <h2 className="sc-h2">Degree programmes</h2>
          <p className="sc-sub">The usual entry routes into {title}. Open one to see what you study and where it leads.</p>
          {degrees.map((d) => <DegreeCard key={d} name={d} />)}
        </section>
      )}

      <section className="cf-sec">
        <h2 className="sc-h2">{branches.length} specialisations</h2>
        <p className="sc-sub">
          Focus areas within {title} — the specific expertise and job roles each one leads to.
          Tap any role to see what it involves.
        </p>
        {branches.map((b) => (
          <div key={b.name} className="sc-card cf-branch">
            <div className="cf-branch-head">
              <span className="cf-branch-icon">{b.icon || "📚"}</span>
              <div className="cf-branch-title">
                <strong>{b.name}</strong>
                <div className="cf-branch-meta">
                  {b.demand && <span className="sc-badge">{b.demand} demand</span>}
                  {b.salary && <span className="cf-branch-salary">{b.salary}</span>}
                </div>
              </div>
            </div>
            <p className="cf-p">{b.about}</p>
            {(b.subjects || []).length > 0 && (
              <>
                <h4 className="cf-sec-h4">Core subjects</h4>
                <Chips items={b.subjects} />
              </>
            )}
            {(b.roles || []).length > 0 && (
              <>
                <h4 className="cf-sec-h4">Job roles</h4>
                <div className="cf-roles">
                  {b.roles.map((r) => {
                    const role = typeof r === "string" ? { title: r, desc: "" } : r;
                    return (
                      <button
                        key={role.title}
                        className="cf-role"
                        onClick={() => onOpenRole({ ...role, branch: b })}
                      >
                        <strong>{role.title}</strong>
                        {role.desc && <span>{role.desc}</span>}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        ))}
      </section>
    </>
  );
}

// ── Exams & Prep ──────────────────────────────────────────────────────────
function ExamsTab({ career }) {
  const { full } = career;
  const exams = full.exams || [];
  const prep = full.prepGuide || {};
  return (
    <>
      <section className="cf-sec">
        <h2 className="sc-h2">{exams.length} entrance exam{exams.length === 1 ? "" : "s"}</h2>
        {exams.map((e) => (
          <div key={e.name} className="sc-card cf-exam">
            <div className="cf-exam-head">
              <div>
                <strong>{e.name}</strong>
                <em>{e.full}{e.by ? ` · ${e.by}` : ""}</em>
              </div>
              <span className="sc-badge">{e.difficulty || DIFFICULTY_BY_LEVEL[e.level] || "Varies"}</span>
            </div>
            <div className="cf-exam-grid">
              {[["For", e.for], ["Level", e.level], ["Sessions", e.sessions],
                ["Seats", e.seats], ["Cutoff", e.cutoff]].filter(([, v]) => v).map(([k, v]) => (
                <div key={k}><span className="cf-kvlabel">{k}</span><span className="cf-kvvalue">{v}</span></div>
              ))}
            </div>
            {e.eligibility && <p className="cf-p"><strong>Eligibility.</strong> {e.eligibility}</p>}
            {e.pattern && <p className="cf-p"><strong>Pattern.</strong> {e.pattern}</p>}
            {e.tip && <p className="sc-tip">{e.tip}</p>}
          </div>
        ))}
      </section>

      {(full.admissionSteps || []).length > 0 && (
        <section className="cf-sec">
          <h2 className="sc-h2">Admission process</h2>
          <ol className="cf-steps">
            {full.admissionSteps.map((s) => (
              <li key={s.step}>
                <span className="cf-stepnum">{s.step}</span>
                <div><strong>{s.title}</strong><p>{s.desc}</p></div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {((prep.phases || []).length > 0 || prep.overview) && (
        <section className="cf-sec">
          <h2 className="sc-h2">How to prepare</h2>
          {prep.overview && <p className="cf-p">{prep.overview}</p>}
          {(prep.phases || []).map((ph) => (
            <div key={ph.phase} className="sc-card cf-phase">
              <div className="cf-phase-head">
                <strong>{ph.phase}</strong>
                <span className="sc-badge">{ph.duration}</span>
              </div>
              <p className="cf-p">{ph.focus}</p>
              {(ph.subjects || []).length > 0 && <Chips items={ph.subjects} />}
            </div>
          ))}
        </section>
      )}

      {(prep.books || []).length > 0 && (
        <section className="cf-sec">
          <h2 className="sc-h2">Recommended books</h2>
          <ul className="cf-deflist">
            {prep.books.map((b) => (
              <li key={b.subject || b.titles?.join()}>
                <strong>{b.subject}</strong> — {(b.titles || []).join(" · ")}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(prep.tips || []).length > 0 && (
        <section className="cf-sec">
          <h2 className="sc-h2">Expert tips</h2>
          <ul className="cf-list">{prep.tips.map((t) => <li key={t}>{t}</li>)}</ul>
        </section>
      )}
    </>
  );
}

// ── Colleges ──────────────────────────────────────────────────────────────
function CollegesTab({ career, onComingSoon }) {
  const indiaLink = admissionLinkFor(career.key);
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("rank");
  const rows = useMemo(() => {
    const all = career.full.colleges || [];
    const filtered = type === "All"
      ? all
      : all.filter((c) => (c.type || "").toLowerCase().includes(type.toLowerCase()));
    const sorted = [...filtered];
    if (sort === "fee") sorted.sort((a, b) => num(a.fee, Infinity) - num(b.fee, Infinity));
    else if (sort === "placement") sorted.sort((a, b) => num(b.placement, -1) - num(a.placement, -1));
    else sorted.sort((a, b) => num(a.rank, Infinity) - num(b.rank, Infinity));
    return sorted;
  }, [career.full.colleges, type, sort]);

  return (
    <section className="cf-sec">
      <div className="cf-coll-controls">
        <div className="sc-chips">
          {["All", "Government", "Private"].map((t) => (
            <button key={t} className={`sc-chip${type === t ? " on" : ""}`} onClick={() => setType(t)}>{t}</button>
          ))}
        </div>
        <label className="cf-sort">
          Sort by
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="rank">Rank</option>
            <option value="fee">Fee (low to high)</option>
            <option value="placement">Placement</option>
          </select>
        </label>
      </div>

      {rows.length === 0 ? (
        <div className="sc-empty">
          No {type.toLowerCase()} colleges in this list yet — try the “All” filter.
        </div>
      ) : (
        <div className="cf-colleges">
          {rows.map((c) => (
            <div key={c.name} className="sc-card cf-college">
              <div className="cf-college-head">
                <div>
                  <strong>{c.name}</strong>
                  <em>{c.location}</em>
                </div>
                <span className={`sc-badge${/government/i.test(c.type || "") ? " cf-gov" : ""}`}>{c.type}</span>
              </div>
              <div className="cf-exam-grid">
                {[["Rank", c.rank], ["Entry", c.entry], ["Fee", c.fee], ["Placement", c.placement]]
                  .filter(([, v]) => v).map(([k, v]) => (
                    <div key={k}><span className="cf-kvlabel">{k}</span><span className="cf-kvvalue">{v}</span></div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cf-coll-cta">
        {/* Only a career the directory actually covers gets a real link.
            The dataset is engineering-only, so Medical/Law/Business keep the
            coming-soon modal rather than deep-linking into a list of IITs. */}
        {indiaLink ? (
          <Link className="sc-btn green" to={indiaLink}>Explore engineering colleges in India →</Link>
        ) : (
          <button className="sc-btn ghost" onClick={() => onComingSoon("india")}>Explore colleges in India →</button>
        )}
        <button className="sc-btn ghost" onClick={() => onComingSoon("abroad")}>Explore colleges abroad →</button>
        <Link className="sc-btn ghost" to="/counselling/guides/study-in-india">Read the India admissions guide →</Link>
      </div>
    </section>
  );
}

// ── Jobs & Salary ─────────────────────────────────────────────────────────
function CareersTab({ career, onOpenRole, onFindCounsellor }) {
  const { detail, full } = career;
  const salary = full.salaryTable || [];
  return (
    <>
      {salary.length > 0 && (
        <section className="cf-sec">
          <h2 className="sc-h2">Salary by specialisation</h2>
          <div className="sc-table-wrap">
            <table className="sc-table">
              <thead>
                <tr><th>Specialisation</th><th>Fresher</th><th>Mid-career</th><th>Senior</th></tr>
              </thead>
              <tbody>
                {salary.map((r) => (
                  <tr key={r.branch}>
                    <td>{r.branch}</td><td>{r.fresher}</td><td>{r.mid}</td><td>{r.senior}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {(detail?.jobRoles || []).length > 0 && (
        <section className="cf-sec">
          <h2 className="sc-h2">Job roles</h2>
          <p className="sc-sub">Tap a role to see what the work involves and how to get there.</p>
          <div className="cf-roles">
            {detail.jobRoles.map((t) => {
              const described = (detail.jobRoleDescs || []).find((d) => d.title === t);
              return (
                <button
                  key={t}
                  className="cf-role"
                  onClick={() => onOpenRole({ title: t, desc: described?.desc || "", branch: null })}
                >
                  <strong>{t}</strong>
                  {described?.desc && <span>{described.desc}</span>}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {(detail?.topRecruiters || []).length > 0 && (
        <section className="cf-sec">
          <h2 className="sc-h2">Top recruiters</h2>
          <Chips items={detail.topRecruiters} />
        </section>
      )}

      {(detail?.progression || []).length > 0 && (
        <section className="cf-sec">
          <h2 className="sc-h2">Career progression</h2>
          <ol className="cf-ladder">
            {detail.progression.map((p) => <li key={p}>{p}</li>)}
          </ol>
        </section>
      )}

      {(detail?.certifications || []).length > 0 && (
        <section className="cf-sec">
          <h2 className="sc-h2">Certifications worth having</h2>
          <Chips items={detail.certifications} />
        </section>
      )}

      {detail?.abroadOptions && (
        <section className="cf-sec">
          <h2 className="sc-h2">Study & work abroad</h2>
          <p className="cf-p">{detail.abroadOptions}</p>
        </section>
      )}

      <button className="sc-btn green cf-wide-cta" onClick={onFindCounsellor}>Find a counsellor →</button>
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function CareerDetailPage() {
  const { key } = useParams();
  return <CareerDetailReader key={key} careerSlug={key} />;
}

function CareerDetailReader({ careerSlug: key }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");
  const [role, setRole] = useState(null);
  const [comingSoon, setComingSoon] = useState(null);

  const careerKey = useMemo(() => toCareerKey(key), [key]);
  const detail = careerKey ? CAREER_DETAIL[careerKey] : null;
  // Hand-written detail wins; the rest are assembled from the data we hold.
  const full = useMemo(
    () => (careerKey ? CAREER_FULL[careerKey] || synthCareerFull(careerKey) : null),
    [careerKey],
  );

  // Colleges is the one tab that cannot be synthesised, so a career without
  // college data does not get the tab at all. Rendering it empty would read
  // as "no good colleges for this career", which is worse than its absence.
  const tabs = useMemo(
    () => TABS.filter(([k]) => k !== "colleges" || (full?.colleges || []).length > 0),
    [full],
  );

  useEffect(() => { window.scrollTo(0, 0); }, [key]);

  // A tab can disappear when the career changes (Engineering has colleges,
  // Fashion does not). Fall back rather than render a blank body.
  useEffect(() => {
    if (!tabs.some(([k]) => k === tab)) setTab("overview");
  }, [tabs, tab]);

  // Only an unknown key lands here now — every career in CAREER_DETAIL has
  // a page. Kept because toCareerKey() still returns null for a bad slug.
  if (!careerKey || !full) {
    return (
      <CounsellingShell crumb=" / Careers">
        <div className="sc-empty">
          <h1 className="sc-h1">We couldn't find that career</h1>
          <p className="sc-sub">
            The link may be mistyped or out of date. All thirty careers are listed on
            Study in India — open one from there.
          </p>
          <div className="cf-coll-cta">
            <Link className="sc-btn green" to="/counselling/india">Browse career guides →</Link>
            <Link className="sc-btn ghost" to="/counselling/counsellors">Talk to a counsellor →</Link>
          </div>
        </div>
      </CounsellingShell>
    );
  }

  const indiaRow = CAREER_INDIA.find((c) => c.key === careerKey) || null;
  // The board titles the detail screen with the career's display label, not
  // its data key — "Artificial Intelligence", not "AI".
  const title = indiaRow?.label || careerKey;

  const career = {
    key: careerKey,
    title,
    detail,
    full,
    // CAREER_DEGREES only covers Engineering today, so almost every career
    // printed "—" under Typical degrees. CAREER_INDIA.course is the real
    // entry course for all thirty ("B.Tech AI & ML", "B.Des Fashion") and is
    // what the board prints, so it is the fallback rather than a blank.
    degrees: degreesFor(careerKey).length
      ? degreesFor(careerKey)
      : [indiaRow?.course].filter(Boolean),
    examNames: (full.exams || []).map((e) => e.name),
    streamLabel: STREAM_EYEBROW(indiaRow),
  };

  const findCounsellor = () => navigate("/counselling/counsellors");

  return (
    <CounsellingShell crumb={` / Study in India / ${title}`} plain>
      <div className="cf-head">
        {/* The board's back control names its destination and goes to the
            careers tab, rather than navigate(-1) — which on a direct visit
            or a refresh leaves the site entirely. */}
        <Link className="cf-back" to="/counselling/india?tab=careers">← Study in India</Link>
        <div className="cf-head-tx">
          {career.streamLabel && <span className="cf-eyebrow">{career.streamLabel}</span>}
          <h1 className="sc-h1 cf-title">{title}</h1>
        </div>
        <span className="cf-head-pill">Study in India</span>
        <button className="sc-btn green cf-head-cta" onClick={findCounsellor}>Find a counsellor →</button>
      </div>

      <div className="sc-tabs cf-tabs" role="tablist">
        {tabs.map(([k, label]) => (
          <button
            key={k}
            role="tab"
            aria-selected={tab === k}
            className={`sc-tab${tab === k ? " on" : ""}`}
            onClick={() => setTab(k)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "overview" && <OverviewTab career={career} />}
      {tab === "branches" && <BranchesTab career={career} onOpenRole={setRole} />}
      {tab === "exams" && <ExamsTab career={career} />}
      {tab === "colleges" && <CollegesTab career={career} onComingSoon={setComingSoon} />}
      {tab === "careers" && (
        <CareersTab career={career} onOpenRole={setRole} onFindCounsellor={findCounsellor} />
      )}

      <RoleDrawer
        role={role}
        career={career}
        onSelectRole={setRole}
        onClose={() => setRole(null)}
        onFindCounsellor={findCounsellor}
      />

      {comingSoon && (
        <div className="cf-drawer-mask" onClick={() => setComingSoon(null)}>
          <div className="sc-card cf-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <h2 className="sc-h2">
              {comingSoon === "india" ? "Full college directory — on its way" : "Study-abroad listings — on its way"}
            </h2>
            <p className="cf-p">
              {comingSoon === "india"
                ? "We're building a searchable directory of colleges across India with fees, cutoffs and placement records. Until then, the list above covers the best-known institutions for this career."
                : "Study-abroad listings — universities, entrance requirements and costs by country — are being put together. In the meantime, a counsellor can talk you through the options."}
            </p>
            <button className="sc-btn green" onClick={() => setComingSoon(null)}>Got it</button>
          </div>
        </div>
      )}
    </CounsellingShell>
  );
}
