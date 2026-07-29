/**
 * Marketplace.jsx — public grid of courses + a "Live now" card pointing at
 * the new instant-meeting feature (/live). Structurally mirrors
 * SkillBrowsePage.jsx (public, no-auth grid + Navbar/Footer). Course cards
 * reuse the same /courses/public/featured/ data the homepage's Featured
 * grid already renders — no new backend endpoint for course discovery here.
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicFeatured, toFeaturedCard } from "../api/coursesApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Marketplace.css";

export default function Marketplace() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicFeatured().then((cards) => {
      setCourses(cards.map(toFeaturedCard).filter((c) => !c.explore));
      setLoading(false);
    });
  }, []);

  return (
    <div className="mkt-page">
      <Navbar />

      <div className="mkt-body">
        <h1 className="mkt-title">Marketplace</h1>
        <p className="mkt-sub">Courses, mentors, and live sessions from across Shiksha</p>

        <div className="mkt-grid">
          <div className="mkt-card mkt-card--live" onClick={() => navigate("/live")} role="button" tabIndex={0}>
            <div className="mkt-card__cover mkt-card__cover--live">
              <span className="mkt-live-badge">LIVE</span>
            </div>
            <div className="mkt-card__body">
              <div className="mkt-card__title">Start or join an instant session</div>
              <div className="mkt-card__sub">No scheduling needed — host or join with a code</div>
              <div className="mkt-trial-chip">15 min free · then upgrade</div>
              <button className="mkt-card__cta">View live</button>
            </div>
          </div>

          {loading ? (
            <div className="mkt-loading">Loading courses…</div>
          ) : (
            courses.map((c, i) => (
              <div
                key={i}
                className="mkt-card"
                onClick={() => c.to && navigate(c.to, { state: c.state })}
                role="button"
                tabIndex={0}
              >
                <div
                  className="mkt-card__cover"
                  style={!c.img ? { background: `linear-gradient(135deg, ${c.grad || "#006d78, #415B7E"})` } : undefined}
                >
                  {c.img && <img src={c.img} alt="" />}
                </div>
                <div className="mkt-card__body">
                  <div className="mkt-card__title">{c.title}</div>
                  <div className="mkt-card__sub">
                    {c.tutor ? `By ${c.tutor}` : c.lvl || ""}
                    {c.stars ? ` · ${c.stars} ★` : ""}
                  </div>
                  {c.price && <div className="mkt-card__price">₹{c.price}</div>}
                  <button className="mkt-card__cta">View course</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
