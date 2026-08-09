/** ExpertRowSkeleton.jsx — loading placeholder matching ExpertRow's grid. */
import "./ExpertRow.css";

export default function ExpertRowSkeleton() {
  return (
    <div className="er-row er-skel" aria-hidden="true">
      <div className="er-skel__photo" />
      <div className="er-skel__main">
        <span style={{ width: "52%" }} /><span style={{ width: "78%" }} />
        <div className="er-skel__pills"><i /><i /><i /></div>
        <span style={{ width: "62%" }} />
      </div>
      <div className="er-skel__rail"><span /><i /></div>
    </div>
  );
}
