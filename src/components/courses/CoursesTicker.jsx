import useTickerSlot from "../ticker/useTickerSlot";
import "../../css/Ticker.css";

/* "Happening on ShikshaCom" — the courses-page ticker (slot 4, Phase 8).
 *
 * The design draws a 360px card with a pulsing live dot, rows carrying a
 * 96×72 thumbnail and a metric badge.
 *
 * ⚠ DELIBERATE DEVIATION, recorded rather than silently made: the design
 * implies a sticky rail beside the catalog, but /courses has NO sidebar.
 * `UnifiedCatalog` is full-width inside `.wrap`, and its only `<aside>`
 * (`uc-fpanel`) is a filter DRAWER, not a layout column. Turning the catalog
 * into a two-column grid to host this would restructure the busiest page on
 * the site and put the filter drawer at risk, for a card that shows at most
 * three rows. So the card keeps its 360px width and sits above the catalog
 * instead. Revisit if /courses ever grows a real sidebar.
 *
 * ⚠ The badge colour comes from `kind`, not from stored tint/ink values.
 * The design's mock has `{{ r.tint }}` / `{{ r.ink }}` per row, but storing
 * a colour pair per item is the thing this codebase refuses (one
 * design-token key, never a hex pair) — an admin should not be choosing
 * hexes, and a stored pair cannot follow a theme change.
 */

const KIND_LABEL = {
  new_course: "New course", enrolment: "Enrolment", new_mentor: "New mentor",
  practice: "Practice", deadline: "Deadline", milestone: "Milestone",
  current_affairs: "Current affairs", mentor_spotlight: "Mentors",
};

// Kind -> a tone class, resolved to --sk-* in Ticker.css.
const TONE = {
  deadline: "warn", milestone: "brand", enrolment: "brand",
  practice: "violet", new_course: "brand", current_affairs: "teal",
  new_mentor: "violet", mentor_spotlight: "violet",
};

export default function CoursesTicker() {
  const { items } = useTickerSlot("courses");
  const rows = items.slice(0, 3);
  if (!rows.length) return null;

  return (
    <aside className="ck" aria-labelledby="ck-h">
      <div className="ck__head">
        <span className="ck__dot" aria-hidden="true" />
        <span className="ck__title" id="ck-h">Happening on ShikshaCom</span>
      </div>
      <ul className="ck__list">
        {rows.map((it) => {
          const inner = (
            <>
              {it.img
                ? <img className="ck__thumb" src={it.img} alt="" />
                : it.metric
                  ? <span className={`ck__metric ck__metric--${TONE[it.kind] || "brand"}`}>
                      <b>{it.metric.value}</b>
                      <small>{it.metric.label}</small>
                    </span>
                  : <span className="ck__thumb ck__thumb--empty" aria-hidden="true" />}
              <span className="ck__meta">
                {it.kind && <span className="ck__kind">{KIND_LABEL[it.kind]}</span>}
                <span className="ck__text">{it.message}</span>
              </span>
            </>
          );
          return (
            <li key={it.id} className="ck__row">
              {it.link_url
                ? <a className="ck__link" href={it.link_url}>{inner}</a>
                : <span className="ck__link ck__link--static">{inner}</span>}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
