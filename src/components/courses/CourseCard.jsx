// PLACEMENT: src/components/courses/CourseCard.jsx
//
// ONE course card, used by both the homepage's "Featured courses" grid and the
// /courses catalog.
//
// Those were two components that had drifted apart and disagreed about the same
// course in four separate ways: the price copy ("Free" vs "₹0 /month"), a
// dropped MRP/discount, the coming-soon badge, and whether an already-enrolled
// learner was invited to enroll again. Each was fixed twice, in two places.
//
// The two surfaces keep their own LOOK — `variant` selects the class
// vocabulary (`fc-*` for the homepage, `uc-gridcard*` for the catalog) so
// neither page changes visually — but there is now one structure and one set of
// rules for what a card says.
//
// Fields a surface does not have simply aren't passed, and the card omits that
// row. That is one render path with optional parts, not two paths.
//
// DELETED on the way in, both dead weight:
//   * the save/heart toggle — local useState keyed on card TITLE, persisted
//     nowhere. It appeared to save and silently forgot on reload, which is
//     worse than not offering it.
//   * the tutor name + avatar disc — rendered only in the coming-soon branch,
//     and every ShowcaseCourse row's tutor_name is "" (see
//     _homepage_seed_data.py), so it never rendered. Its `avColor` was read but
//     never produced either.

import { enrollLabelFor } from "../../hooks/useEnrollmentStatus";

/* Per-variant class names. Everything else about the card is shared. */
const V = {
  home: {
    card: "fc-card",
    thumb: "fc-thumb",
    thumbPhoto: "fc-thumb--photo",
    icon: "fc-thumb-ic",
    ribbon: "fc-ribbon",
    pill: "fc-lvl",
    body: "fc-body",
    board: null,           // the homepage card has no board line
    fact: "fc-fact",
    syllabus: "fc-syllabus",
    foot: "fc-foot",
    price: "fc-priceblock",
    mrp: "fc-mrp",
    now: "fc-price",
    discount: "fc-discount",
    soon: "fc-price soon",
    cta: "fc-enroll",
    explore: "fc-explore",
    img: null,             // background-image, not an <img>
  },
  catalog: {
    card: "uc-gridcard",
    thumb: "uc-gridcard__thumb",
    thumbPhoto: null,
    icon: "uc-gridcard__placeholder-icon",
    ribbon: "uc-gridcard__ribbon",
    pill: "uc-gridcard__pill",
    body: "uc-gridcard__body",
    board: "uc-gridcard__board",
    fact: "uc-gridcard__fact",
    syllabus: "uc-gridcard__syllabus",
    foot: "uc-gridcard__foot",
    price: "uc-price",
    mrp: "uc-price__mrp",
    now: "uc-price__now",
    discount: "uc-price__discount",
    soon: "uc-gridcard__soon",
    cta: "uc-gridcard__enroll",
    explore: null,         // no "Explore Programs" concept in the catalog
    img: "uc-gridcard__img",
  },
};

/**
 * The price block. One definition for both surfaces — this is where "₹0 /month"
 * shipped on 18 live cards while the homepage said "Free" for the same course.
 *
 * A zero price is a real state, not missing data: the platform runs free at
 * launch. The MRP strikethrough and discount label stay either way — an admin
 * set those up deliberately and they carry the real "was ₹3,000" framing.
 */
function Price({ c, cls }) {
  // `amount` absent entirely (a board-linked showcase card sends price_label:
  // null) means there is no price to state — render nothing rather than
  // "₹undefined /month".
  if (!c.isFree && !c.amount) return null;
  const showMrp = c.mrp && c.mrp !== c.amount;
  return (
    <div className={cls.price}>
      {showMrp && <span className={cls.mrp}>&#8377;{c.mrp}</span>}
      {c.isFree ? (
        <span className={cls.now}>Free</span>
      ) : (
        <span className={cls.now}>&#8377;{c.amount}<small> /month</small></span>
      )}
      {c.discountLabel && <span className={cls.discount}>{c.discountLabel}</span>}
    </div>
  );
}

/**
 * @param {object}   card     — normalised card model (see toCardModel adapters)
 * @param {string}   variant  — "home" | "catalog"
 * @param {string=}  enrollmentStatus — APPROVED | PENDING | REJECTED
 * @param {function} onAction — enroll / explore / open-course
 * @param {function=} onSyllabus
 * @param {function=} onNotify — coming-soon capture; catalog only
 * @param {function=} onOpen   — whole-card click; catalog only (quick view)
 */
export default function CourseCard({
  card: c,
  variant = "catalog",
  enrollmentStatus,
  onAction,
  onSyllabus,
  onNotify,
  onOpen,
}) {
  const cls = V[variant] || V.catalog;
  const { label: enrollLabel, isEnrolled, isPending } =
    enrollLabelFor(enrollmentStatus);

  // The thumbnail. A real picture wins; the gradient + icon are the fallback
  // for a card with no artwork. Never both: layering the brand gradient over a
  // photo at its own 0.72/0.88 alphas left ~27% of the artwork visible and made
  // every card render as a flat colour block.
  const hasPhoto = !!c.image;
  const thumbClass = hasPhoto && cls.thumbPhoto
    ? `${cls.thumb} ${cls.thumbPhoto}`
    : cls.thumb;

  // The homepage paints its photo as a background (its scrim is a ::before on
  // the same element); the catalog uses a real <img>. Kept per-variant because
  // each stylesheet is built around its own approach.
  const thumbStyle = cls.img
    ? (hasPhoto ? undefined : { background: c.gradient })
    : { background: hasPhoto ? `url('${c.image}') center/cover` : c.gradient };

  return (
    <article
      className={`${cls.card}${c.revealOnScroll ? " rv" : ""}`}
      data-cat={c.categories?.join(" ")}
      onClick={onOpen ? () => onOpen(c) : undefined}
    >
      <div className={thumbClass} style={thumbStyle}>
        {c.ribbon && !c.isComingSoon && (
          <span className={cls.ribbon}>{c.ribbon}</span>
        )}
        {hasPhoto && cls.img && (
          <img src={c.image} alt="" className={cls.img} />
        )}
        {!hasPhoto && c.icon && <span className={cls.icon}>{c.icon}</span>}
        {c.levelLabel && <span className={cls.pill}>{c.levelLabel}</span>}
      </div>

      <div className={cls.body}>
        {cls.board && c.boardLabel !== undefined && (
          <span className={cls.board}>{c.boardLabel}</span>
        )}
        <h3>
          {c.title}
          {c.subtitle && <span className="uc-gridcard__sub"> ({c.subtitle})</span>}
        </h3>

        {c.fact && (
          <div className={cls.fact}>{c.factIcon}{c.fact}</div>
        )}

        {c.seatsLeft != null && (
          <div className={`uc-gridcard__seats${c.seatsLeft <= 8 ? " uc-gridcard__seats--low" : ""}`}>
            {c.seatsLeft} seat{c.seatsLeft === 1 ? "" : "s"} left
          </div>
        )}

        {/* Only where there is a real course to show chapters for. A showcase
            row with no linked course has no syllabus, and an "Explore
            Programs" card is a category, not a course. */}
        {c.canViewSyllabus && onSyllabus && (
          <button
            type="button"
            className={cls.syllabus}
            onClick={(e) => { e.stopPropagation(); onSyllabus(c); }}
          >
            View syllabus {c.arrow}
          </button>
        )}

        {variant === "catalog" && <div className="uc-gridcard__spacer" />}

        <div className={cls.foot}>
          {c.isComingSoon ? (
            <span className={cls.soon}>Coming Soon</span>
          ) : (
            <Price c={c} cls={cls} />
          )}

          {/* A board / category card has nothing to enrol in — it sends you to
              the catalog instead. */}
          {c.isExplore && cls.explore ? (
            <button
              type="button"
              className={cls.explore}
              onClick={(e) => { e.stopPropagation(); onAction(c); }}
            >
              Explore Programs
            </button>
          ) : (
            /* Rendered only when there is somewhere for the click to go. A
               coming-soon card needs onNotify; the catalog passes one and the
               homepage does not, which is why the homepage shows the badge
               alone. Without this guard the homepage would grow a "Notify me"
               button wired to nothing. */
            (c.isComingSoon ? !!onNotify : !!onAction) && (
              <button
                type="button"
                className={cls.cta}
                disabled={isPending || isEnrolled}
                onClick={(e) => {
                  e.stopPropagation();
                  if (c.isComingSoon) onNotify(c);
                  else if (!isPending && !isEnrolled) onAction(c);
                }}
              >
                {c.isComingSoon ? "Notify me" : enrollLabel} {c.arrow}
              </button>
            )
          )}
        </div>
      </div>
    </article>
  );
}
