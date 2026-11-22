// PLACEMENT: src/counselling/CareerExplorer.jsx
//
// The board's "Explore careers" tab, shared by /counselling/india and
// /counselling/abroad. Both screens draw the identical control set — stream
// chips, interest-area rail with live counts, sidebar search, two-option
// sort, removable filter pills, empty state, 2-up card grid — and differ
// only in their dataset and in the three labels on the card's tinted strip:
//
//   India   Course · Entrance exam · Starting salary
//   Abroad  Course · Tests · US median pay
//
// So the strip is passed in as `facts` rather than branched on inside, and
// the component holds no India- or abroad-specific knowledge at all.
//
// Extracted from StudyInIndiaPage on 2026-11-18 when the abroad tab was
// built. Behaviour is unchanged from the India version — the comments below
// record findings that were verified by driving the board, and are the
// reason several obvious-looking simplifications would be wrong.

import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity, Atom, BookMarked, BookOpen, Briefcase, DollarSign, Eye, FileText,
  FlaskConical, Globe, Hotel, Landmark, Layers, LayoutGrid, Leaf, Lightbulb,
  LineChart, Lock, Mic, Monitor, Music, Navigation, Palette, PenTool, Rocket,
  Scale, Search, Shield, Star, Target, Wrench,
} from "lucide-react";

const CAREER_ICONS = {
  Activity, Atom, BookOpen, Briefcase, DollarSign, Eye, FileText,
  FlaskConical, Globe, Hotel, Landmark, Layers, LayoutGrid, Leaf,
  Lightbulb, LineChart, Lock, Mic, Monitor, Music, Navigation, Palette,
  PenTool, Rocket, Scale, Shield, Star, Target, Wrench,
};

const SORTS = [
  ["popular", "Most popular"],
  ["az", "A to Z"],
];

// `firstSentence` moved to ./careerBlurb — a file exporting both a
// component and a plain function breaks React Fast Refresh.

// `tone="abroad"` recolours the accents to the module's abroad indigo. The
// board draws this tab in each section's own colour — green on Study in
// India, indigo on Study abroad — while the layout is identical.
export default function CareerExplorer({ careers, areas: INTEREST_AREAS, streams: STREAMS, facts, note, tone }) {
  const [stream, setStream] = useState("all");
  const [picked, setPicked] = useState(() => new Set());
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("popular");

  const needle = q.trim().toLowerCase();

  // The sidebar's counts are computed over stream + search but NOT over the
  // area checkboxes — verified on the board: ticking one area leaves the
  // other eight counts untouched. Computing them over the area selection
  // too would zero every box the moment one was ticked.
  const base = useMemo(
    () => careers.filter(
      (c) => (stream === "all" || c.streams.includes(stream)) &&
             (!needle || c.haystack.includes(needle))
    ),
    [careers, stream, needle]
  );

  const counts = useMemo(() => {
    const out = Object.fromEntries(INTEREST_AREAS.map((a) => [a, 0]));
    base.forEach((c) => { out[c.area] += 1; });
    return out;
  }, [base, INTEREST_AREAS]);

  const rows = useMemo(() => {
    const kept = picked.size ? base.filter((c) => picked.has(c.area)) : base;
    // "Most popular" IS the dataset's array order, so it needs no sort.
    return sort === "az"
      ? [...kept].sort((a, b) => a.label.localeCompare(b.label))
      : kept;
  }, [base, picked, sort]);

  const toggleArea = (area) => {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(area)) next.delete(area); else next.add(area);
      return next;
    });
  };

  const clearAll = () => { setStream("all"); setPicked(new Set()); setQ(""); };

  const streamLabel = STREAMS.find(([k]) => k === stream)?.[1];
  const hasFilters = stream !== "all" || picked.size > 0 || needle !== "";

  return (
    <section className={`sii-careers${tone === "abroad" ? " sii-careers--abroad" : ""}`}>
      <p className="sii-stream-kicker">Your stream in Class 11–12</p>
      <div className="sii-streams" role="group" aria-label="Filter by stream">
        {STREAMS.map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={stream === key}
            className={`sii-stream${stream === key ? " on" : ""}`}
            onClick={() => setStream(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="sii-careers-body">
        <aside className="sii-facets">
          <p className="sii-facet-kicker">Interest area</p>
          <ul className="sii-areas">
            {INTEREST_AREAS.map((area) => {
              const n = counts[area];
              return (
                <li key={area} className={n === 0 && !picked.has(area) ? "off" : ""}>
                  <label>
                    <input
                      type="checkbox"
                      checked={picked.has(area)}
                      disabled={n === 0 && !picked.has(area)}
                      onChange={() => toggleArea(area)}
                    />
                    <span className="sii-area-name">{area}</span>
                    <span className="sii-area-n">{n}</span>
                  </label>
                </li>
              );
            })}
          </ul>

          <p className="sii-facet-kicker">Search careers</p>
          <div className="sc-search sii-career-search">
            <Search size={16} aria-hidden="true" />
            <input
              aria-label="Search careers"
              placeholder="e.g. doctor, design, pilot"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </aside>

        <div className="sii-careers-main">
          <div className="sii-sortbar">
            <label className="sii-sort-lb" htmlFor="sii-sort">Sort</label>
            <select
              id="sii-sort"
              className="sii-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORTS.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
            </select>
          </div>

          {hasFilters && (
            <div className="sii-pills">
              {stream !== "all" && (
                <button type="button" className="sii-pill" onClick={() => setStream("all")}>
                  {streamLabel} <span aria-hidden="true">×</span>
                  <span className="sii-sr">Remove stream filter</span>
                </button>
              )}
              {INTEREST_AREAS.filter((a) => picked.has(a)).map((a) => (
                <button key={a} type="button" className="sii-pill" onClick={() => toggleArea(a)}>
                  {a} <span aria-hidden="true">×</span>
                  <span className="sii-sr">Remove interest area filter</span>
                </button>
              ))}
              {needle !== "" && (
                <button type="button" className="sii-pill" onClick={() => setQ("")}>
                  “{q.trim()}” <span aria-hidden="true">×</span>
                  <span className="sii-sr">Clear search</span>
                </button>
              )}
              <button type="button" className="sii-clear" onClick={clearAll}>Clear all</button>
            </div>
          )}

          {rows.length === 0 ? (
            <div className="sii-noresult">
              <p className="sii-noresult-h">No careers match these filters.</p>
              <p>Try removing an area or choosing “All streams”.</p>
              <button type="button" className="sii-clear" onClick={clearAll}>Clear all filters</button>
            </div>
          ) : (
            <div className="sii-career-grid">
              {rows.map((c) => {
                const Icon = CAREER_ICONS[c.icon] || Lightbulb;
                return (
                  <article key={c.key} className="sii-career">
                    <header className="sii-career-top">
                      <span className="sii-career-ic" aria-hidden="true">
                        <Icon size={18} strokeWidth={2} />
                      </span>
                      <div className="sii-career-id">
                        <h3>{c.label}</h3>
                        <p className="sii-career-area">{c.area}</p>
                      </div>
                    </header>

                    {c.blurb && <p className="sii-career-blurb">{c.blurb}</p>}

                    <p className="sii-career-subj">
                      <BookMarked size={14} aria-hidden="true" />
                      <span className="sii-career-subj-lb">Subjects:</span>
                      <b>{c.subjects}</b>
                    </p>

                    <dl className="sii-career-facts">
                      {facts.map(([label, field]) => (
                        <div key={field}><dt>{label}</dt><dd>{c[field]}</dd></div>
                      ))}
                    </dl>

                    <Link
                      className="sii-career-go"
                      to={`/counselling/careers/${encodeURIComponent(c.key)}`}
                    >
                      View career details <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                );
              })}
            </div>
          )}

          {/* The abroad board prints a footnote under the grid naming the
              careers it hides and the source of its pay column. India has
              no equivalent, so this is opt-in. */}
          {note && rows.length > 0 && <p className="sii-careers-note">{note}</p>}
        </div>
      </div>
    </section>
  );
}
