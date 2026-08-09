/**
 * ReviewList.jsx — public review display for an expert or a single listing.
 *
 * Renders three things the old UI fetched and then discarded in skillApi.js:
 *   created_at   → a dateless review reads as current forever
 *   is_edited    → an edited review read as the original is worse than no review
 *   session      → what the review is actually about
 *
 * Every review here follows a COMPLETED session (enforced by the OneToOne on
 * ExpertReview.session), which is the strongest trust signal on the platform.
 * Say so — don't leave it implicit.
 */
import { useMemo, useState } from "react";
import { RatingStars } from "./RatingStars";
import "./ReviewList.css";

const SORTS = [
  { key: "recent",  label: "Most recent" },
  { key: "high",    label: "Highest first" },
  { key: "low",     label: "Lowest first" },
  { key: "written", label: "With comments" },
];

const fmtDate = (iso) => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch { return ""; }
};

export function RatingBreakdown({ average, count, distribution }) {
  // distribution: { "5": 54, "4": 7, "3": 2, "2": 0, "1": 0 }
  return (
    <div className="rv-breakdown">
      <div className="rv-breakdown__score">
        <div className="rv-breakdown__avg">
          {average != null ? Number(average).toFixed(1) : "New"}
        </div>
        <RatingStars value={average || 0} size={16} />
        <div className="rv-breakdown__count">{count} {count === 1 ? "review" : "reviews"}</div>
        <div className="rv-verified">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"
               strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Every review follows a completed session
        </div>
      </div>
      <div className="rv-breakdown__bars">
        {[5, 4, 3, 2, 1].map((star) => {
          const n = distribution?.[star] ?? distribution?.[String(star)] ?? 0;
          return (
            <div key={star} className="rv-bar">
              <span className="rv-bar__label">{star} ★</span>
              <span className="rv-bar__track">
                <span className="rv-bar__fill" style={{ width: count ? `${(n / count) * 100}%` : 0 }} />
              </span>
              <span className="rv-bar__n">{n}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ReviewList({ reviews = [] }) {
  const [sort, setSort] = useState("recent");

  const shown = useMemo(() => {
    let list = [...reviews];
    if (sort === "high")    list.sort((a, b) => b.rating - a.rating);
    if (sort === "low")     list.sort((a, b) => a.rating - b.rating);
    if (sort === "written") list = list.filter((r) => (r.body || "").trim());
    return list;
  }, [reviews, sort]);

  if (!reviews.length) {
    return <p className="rv-empty">No reviews yet — be the first after your session.</p>;
  }

  return (
    <>
      <div className="rv-sorts">
        {SORTS.map((s) => (
          <button
            key={s.key}
            type="button"
            className={`rv-sort${sort === s.key ? " on" : ""}`}
            aria-pressed={sort === s.key}
            onClick={() => setSort(s.key)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="rv-list">
        {shown.map((r) => (
          <article key={r.id} className="rv-item">
            <header className="rv-item__head">
              <RatingStars value={r.rating} size={13} />
              <span className="rv-item__name">{r.reviewer}</span>
              <span className="rv-item__meta">{fmtDate(r.created_at)}</span>
              {r.topic && <span className="rv-item__topic">{r.topic}</span>}
              {r.is_edited && <span className="rv-item__edited">Edited</span>}
            </header>
            {r.body
              ? <p className="rv-item__body">{r.body}</p>
              : <p className="rv-item__norating">Rated without a written review</p>}
          </article>
        ))}
      </div>
    </>
  );
}
