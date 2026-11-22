import { Link } from "react-router-dom";
import useTickerSlot from "./useTickerSlot";
import TickerCards from "./TickerCards";
import { KIND_LABEL } from "./tickerKinds";
import ScribbleIcon from "../icons/ScribbleIcon";
import "../../css/Ticker.css";

/* The footer ticker strip (design_handoff_live_ticker Phase 4, slot 6).
 *
 * The one ticker slot on a dark background. It used the shared TickerCard,
 * which is sized for the homepage band (min-height 244px, picture on top),
 * so a single short update rendered as a huge, mostly empty box spanning the
 * footer. Footer items now use a compact card of their own: a small icon (or
 * thumbnail when the item has a picture), the kind as a label, the title and
 * one line of detail, and an arrow when it links somewhere. The heading and
 * the pager share one row (see .tk-foot in Ticker.css).
 *
 * Renders nothing when the flag is off or the queue is empty, so the footer
 * is unchanged until an admin puts something here.
 */

// A ScribbleIcon per ticker kind (content.models.TickerKind).
const KIND_ICON = {
  new_course: "courses",
  enrolment: "user",
  new_mentor: "teacher",
  practice: "notebook",
  deadline: "clock",
  milestone: "trophy",
  current_affairs: "globe",
  mentor_spotlight: "star",
};

function FooterCard({ item }) {
  const inner = (
    <>
      {item.img
        ? <img className="tk-fcard__thumb" src={item.img} alt="" />
        : <span className="tk-fcard__ic"><ScribbleIcon name={KIND_ICON[item.kind] || "bell"} size={20} /></span>}
      <span className="tk-fcard__text">
        <span className="tk-fcard__meta">
          {item.kind && <span className="tk-fcard__kind">{KIND_LABEL[item.kind] || ""}</span>}
          {item.metric && <span className="tk-fcard__metric"><b>{item.metric.value}</b> {item.metric.label}</span>}
        </span>
        <span className="tk-fcard__title">{item.message}</span>
        {item.body && <span className="tk-fcard__body">{item.body}</span>}
      </span>
      {item.link_url && <span className="tk-fcard__go" aria-hidden="true"><ScribbleIcon name="arrow-right" size={16} /></span>}
    </>
  );
  if (!item.link_url) return <div className="tk-fcard">{inner}</div>;
  return item.link_url.startsWith("/")
    ? <Link to={item.link_url} className="tk-fcard">{inner}</Link>
    : <a className="tk-fcard" href={item.link_url} target="_blank" rel="noopener noreferrer">{inner}</a>;
}

export default function FooterTicker() {
  const { items } = useTickerSlot("footer");
  if (!items.length) return null;

  return (
    <section className={`tk-foot tk-foot__nav tk-foot--n${Math.min(items.length, 3)}`} aria-labelledby="tk-foot-h">
      <h2 className="tk-foot__label" id="tk-foot-h"><i aria-hidden="true" />Latest updates</h2>
      <TickerCards
        items={items}
        perView={3}
        renderCard={(it) => <FooterCard key={it.id} item={it} />}
      />
    </section>
  );
}
