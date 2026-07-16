/**
 * Footer.jsx — redesigned site footer (green direction).
 *
 * Same real-world content as before (addresses, contact details,
 * social profiles, resource links) restyled to match the new design:
 * deep-green panel, rounded top, pill CTA, four-column layout.
 * Styles: css/FooterGreen.css (all classes prefixed `ftr-`).
 */
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../assets/Shiksha.png";
import "../css/theme.css";
import "../css/FooterGreen.css";

const YEAR = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="ftr-root">
      <div className="ftr-wrap">
        {/* top row: brand + CTA */}
        <div className="ftr-top">
          <div className="ftr-brand">
            <span className="ftr-logo">
              <img src={logo} alt="" />
            </span>
            <div>
              <b>ShikshaCom</b>
              <small>Empowerment Through Education</small>
            </div>
          </div>
          <Link to="/signup" className="ftr-cta">
            Start learning free
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        {/* main grid */}
        <div className="ftr-grid">
          <div className="ftr-col ftr-about">
            <h4>ShikshaCom</h4>
            <p>
              Structured learning for Classes 8–12, board examinations and
              competitive exams — live classes, recordings, doubt support and
              career guidance in one place.
            </p>
            <div className="ftr-social">
              <a
                href="https://www.facebook.com/profile.php?id=61580053190184"
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/shikshacom/"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.youtube.com/@Shikshacom-edu"
                aria-label="YouTube"
                target="_blank"
                rel="noreferrer"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className="ftr-col">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/current-affairs">Current Affairs</Link></li>
              <li><Link to="/forum">Forum</Link></li>
              <li><Link to="/explore">Explore Library</Link></li>
              <li><Link to="/skill/browse">Skill Development</Link></li>
              <li><Link to="/counselling">Counselling</Link></li>
              <li><Link to="/upcoming">Placement</Link></li>
              <li><Link to="/become-faculty">Become a Faculty</Link></li>
            </ul>
          </div>

          <div className="ftr-col">
            <h4>Address</h4>
            <p>
              House no - 1473A
              <br />
              Maruti Vihar
              <br />
              Gurgaon, Haryana
              <br />
              Pin - 122002
            </p>
            <p>
              Hualngohmun Vengchhak
              <br />
              Near World Bank Road
              <br />
              Aizawl, Mizoram
              <br />
              Pin - 796009
            </p>
          </div>

          <div className="ftr-col">
            <h4>Contact</h4>
            <p>
              Email
              <br />
              <a href="mailto:info@shikshacom.com">info@shikshacom.com</a>
            </p>
            <p>
              Gurgaon
              <br />
              +0124-42551378
            </p>
            <p>
              Aizawl
              <br />
              +91 3893570403
              <br />
              +0389-2300225
            </p>
          </div>
        </div>

        {/* bottom bar */}
        <div className="ftr-bottom">
          <span>© {YEAR} ShikshaCom.com</span>
          <nav aria-label="Legal">
            <Link to="/faq">FAQ</Link>
            <Link to="/terms">Terms of Policy</Link>
            <Link to="/feedback">Feedback</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
