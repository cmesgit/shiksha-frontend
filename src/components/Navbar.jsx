import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import "../css/Navbar.css";

import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { t, switchLanguage } = useLanguage();
  const { isAuthenticated, user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const [fontSize, setFontSize] = useState(1);

  // Prevent render while auth bootstraps
  if (loading) return null;

  /* ================= Accessibility ================= */

  const increaseFont = () => {
    const size = Math.min(fontSize + 0.1, 1.5);
    setFontSize(size);
    document.documentElement.style.fontSize = `${size * 100}%`;
  };

  const decreaseFont = () => {
    const size = Math.max(fontSize - 0.1, 0.8);
    setFontSize(size);
    document.documentElement.style.fontSize = `${size * 100}%`;
  };

  /* ================= Logout ================= */

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* ===== TOP STRIP ===== */}
      <div className="top-strip">
        <marquee width="90%" direction="left" height="30px" scrollAmount="10">
          <span>Hurry Up!!! Admission is going on.</span>
          <span> | New session starts from 2026 | </span>
          <span className="blink">Register Now!</span>
        </marquee>

        <div className="strip-controls">
          <button onClick={decreaseFont} className="accessibility-btn">
            A-
          </button>
          <button onClick={increaseFont} className="accessibility-btn">
            A+
          </button>
          <button onClick={switchLanguage} className="language-btn">
            {t("language")}
          </button>
        </div>
      </div>

      {/* ===== HEADER ===== */}
      <header className="main-header">
        <div className="header-left">
          <Link to="/" className="brand-link">
            <img src="/Shiksha.png" alt="Shiksha Logo" className="logo" />
            <div className="title">
              <h1>ShikshaCom</h1>
              <p>Empowerment Through Education</p>
            </div>
          </Link>
        </div>

        <div className="header-right">
          <div className="header-social">
            <a href="https://www.facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          </div>
          <div className="header-auth">
            <Link to="/login"  className="header-login-btn">Login</Link>
            <Link to="/signup" className="header-signup-btn">Signup</Link>
          </div>
        </div>
      </header>

      {/* ===== NAV ===== */}
      <nav className="navbar navbar-pc">
        <ul className="nav-menu">
          <li><NavLink to="/" end>{t("home")}</NavLink></li>

          <li className="nav-item dropdown">
            <NavLink to="/about">{t("about")}</NavLink>
            <ul className="dropdown-menu">
              <li><NavLink to="/vision">{t("vision")}</NavLink></li>
              <li><NavLink to="/mission">{t("mission")}</NavLink></li>
              <li><NavLink to="/values">{t("values")}</NavLink></li>
              <li><NavLink to="/why-shiksha">{t("whyShiksha")}</NavLink></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <NavLink to="/courses">{t("courses")}</NavLink>
          </li>

          <li><NavLink to="/placements">Placements</NavLink></li>
          <li><NavLink to="/general-studies">{t("generalStudies")}</NavLink></li>
          <li><NavLink to="/forum">{t("forum")}</NavLink></li>

          <li className="nav-item dropdown">
            <NavLink to="/counselling">{t("counselling")}</NavLink>
            <ul className="dropdown-menu">
              <li><NavLink to="/counselling">{t("Career")}</NavLink></li>
              <li><NavLink to="/counselling">{t("Admission in India")}</NavLink></li>
              <li><NavLink to="/counselling">{t("Admission in Abroad")}</NavLink></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <NavLink to="/training">{t("training")}</NavLink>
            <ul className="dropdown-menu">
              <li><NavLink to="/training">{t("industrial")}</NavLink></li>
              <li><NavLink to="/training">{t("specialized")}</NavLink></li>
            </ul>
          </li>

          <li><NavLink to="/insight">{t("insight")}</NavLink></li>
          <li><NavLink to="/contact">{t("contact")}</NavLink></li>

        </ul>
      </nav>
    </>
  );
};

export default Navbar;
