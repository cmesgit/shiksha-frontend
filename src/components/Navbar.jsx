import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FiArrowUpRight,
  FiUser,
  FiLogOut,
  FiFileText,
} from "react-icons/fi";
import "../css/Navbar.css";
import { HashLink } from "react-router-hash-link";

import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { t } = useLanguage();
  const { isAuthenticated, user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [fontSize, setFontSize] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openNestedDropdown, setOpenNestedDropdown] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [hideTopStrip, setHideTopStrip] = useState(false);

  const profileMenuRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev);
    setOpenDropdown(null);
    setOpenNestedDropdown(null);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setOpenNestedDropdown(null);
  };

  const handleDropdownToggle = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
    setOpenNestedDropdown(null);
  };

  const handleNestedDropdownToggle = (name) => {
    setOpenNestedDropdown((prev) => (prev === name ? null : name));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setHideTopStrip(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return null;

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

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleDashboard = () => {
    if (!user) return;

    const roles = Array.isArray(user?.roles) ? user.roles : [];
    const normalizedRoles = roles.map((r) => String(r).toLowerCase());
    const singleRole = String(user?.role || "").toLowerCase();

    const isTeacher =
      normalizedRoles.includes("teacher") || singleRole === "teacher";

    if (isTeacher) {
      window.location.href =
        import.meta.env.VITE_TEACHER_URL || "https://teacher.shikshacom.com/teacher/dashboard";
    } else {
      window.location.href = import.meta.env.VITE_APP_URL || "https://app.shikshacom.com/";
    }
  };

  const firstName =
    user?.first_name ||
    user?.firstName ||
    user?.name?.split(" ")?.[0] ||
    user?.full_name?.split(" ")?.[0] ||
    user?.email?.split("@")?.[0] ||
    "User";

  return (
    <>
      <div className={`top-strip ${hideTopStrip ? "top-strip--hidden" : ""}`}>
        <marquee width="90%" direction="left" height="30px" scrollAmount="10">
          <span>Hurry Up!!! Admission is going on.</span>
          <span> | New session starts from 2026 | </span>
          <span className="blink">Register Now!</span>
        </marquee>

        {/*
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
        */}
      </div>

      <div
        className={`site-fixed-header ${
          hideTopStrip ? "site-fixed-header--top" : ""
        }`}
      >
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
            {isAuthenticated && user ? (
              <div className="header-profile-wrap" ref={profileMenuRef}>
                <span className="header-user-name">Hi, {firstName}</span>

                <button
                  type="button"
                  className="profile-btn"
                  onClick={() => setProfileOpen((prev) => !prev)}
                >
                  <FiUser size={18} />
                </button>

                {profileOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-dropdown-user">
                      <span className="profile-dropdown-name">
                        Hi, {firstName}
                      </span>
                    </div>

                    <button
                      className="dropdown-item"
                      onClick={() => {
                        navigate("/form-fillup");
                        setProfileOpen(false);
                      }}
                    >
                      <FiFileText size={16} />
                      Fill Form
                    </button>

                    <button
                      className="dropdown-item logout"
                      onClick={handleLogout}
                    >
                      <FiLogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="header-auth">
                <Link to="/login" className="header-login-btn">
                  Login
                </Link>
                <Link to="/signup" className="header-signup-btn">
                  Signup
                </Link>
              </div>
            )}
          </div>
        </header>

        <nav className="navbar navbar-pc">
          <button
            className={`hamburger-btn${mobileOpen ? " open" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`nav-menu${mobileOpen ? " mobile-open" : ""}`}>
            <li>
              <NavLink to="/" end onClick={closeMobileMenu}>
                {t("home")}
              </NavLink>
            </li>

            <li
              className={`nav-item dropdown${
                openDropdown === "about" ? " mobile-dropdown-open" : ""
              }`}
            >
              <NavLink to="/about" onClick={closeMobileMenu}>
                {t("about")}
              </NavLink>

              <button
                type="button"
                className="mobile-dropdown-arrow"
                onClick={() => handleDropdownToggle("about")}
              >
                ▾
              </button>

              <ul className="dropdown-menu">
                <li>
                  <HashLink smooth to="/about#vision" onClick={closeMobileMenu}>
                    {t("vision")}
                  </HashLink>
                </li>
                <li>
                  <HashLink smooth to="/about#mission" onClick={closeMobileMenu}>
                    {t("mission")}
                  </HashLink>
                </li>
                <li>
                  <HashLink smooth to="/about#values" onClick={closeMobileMenu}>
                    {t("values")}
                  </HashLink>
                </li>
                <li>
                  <HashLink
                    smooth
                    to="/about#why-shiksha"
                    onClick={closeMobileMenu}
                  >
                    {t("whyShiksha")}
                  </HashLink>
                </li>
              </ul>
            </li>

            <li>
              <button
                type="button"
                className={`nav-link nav-link-btn ${
                  location.pathname === "/courses" ? "active" : ""
                }`}
                onClick={() => {
                  closeMobileMenu();
                  navigate("/courses", {
                    state: { resetCourses: Date.now() },
                  });
                }}
              >
                {t("courses")}
              </button>
            </li>

            <li
              className={`nav-item dropdown${
                openDropdown === "general-studies" ? " mobile-dropdown-open" : ""
              }`}
            >
              <span className="nav-label">General Studies</span>

              <button
                type="button"
                className="mobile-dropdown-arrow"
                onClick={() => handleDropdownToggle("general-studies")}
              >
                ▾
              </button>

              <ul className="dropdown-menu">
                <li>
                  <NavLink to="/blogs" onClick={closeMobileMenu}>
                    Blogs
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/current-affairs" onClick={closeMobileMenu}>
                    Current Affairs
                  </NavLink>
                </li>
              </ul>
            </li>

            <li
              className={`nav-item dropdown${
                openDropdown === "others" ? " mobile-dropdown-open" : ""
              }`}
            >
              <span className="nav-label">Resources</span>

              <button
                type="button"
                className="mobile-dropdown-arrow"
                onClick={() => handleDropdownToggle("others")}
              >
                ▾
              </button>

              <ul className="dropdown-menu">
                <li>
                  <NavLink to="/forum" onClick={closeMobileMenu}>
                    {t("forum")}
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/insight" onClick={closeMobileMenu}>
                    Explore
                  </NavLink>
                </li>

                <li
                  className={`nav-item dropdown nested-dropdown${
                    openNestedDropdown === "skill-development"
                      ? " mobile-dropdown-open"
                      : ""
                  }`}
                >
                  <span className="nav-labels">Skill Development</span>

                  <button
                    type="button"
                    className="mobile-dropdown-arrow nested-mobile-arrow"
                    onClick={() =>
                      handleNestedDropdownToggle("skill-development")
                    }
                  >
                    ▾
                  </button>

                  <ul className="dropdown-menu nested-menu">
                    <li>
                      <NavLink to="/training" onClick={closeMobileMenu}>
                        Industrial
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/training" onClick={closeMobileMenu}>
                        Specialized
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li
                  className={`nav-item dropdown nested-dropdown${
                    openNestedDropdown === "counselling"
                      ? " mobile-dropdown-open"
                      : ""
                  }`}
                >
                  <span className="nav-labels">Counselling</span>

                  <button
                    type="button"
                    className="mobile-dropdown-arrow nested-mobile-arrow"
                    onClick={() => handleNestedDropdownToggle("counselling")}
                  >
                    ▾
                  </button>

                  <ul className="dropdown-menu nested-menu">
                    <li>
                      <NavLink to="/counselling" onClick={closeMobileMenu}>
                        Career
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/counselling" onClick={closeMobileMenu}>
                        Admission in India
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/counselling" onClick={closeMobileMenu}>
                        Admission in Abroad
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li>
                  <NavLink to="/upcoming" onClick={closeMobileMenu}>
                    Placements
                  </NavLink>
                </li>
              </ul>
            </li>

            <li>
              <NavLink to="/contact" onClick={closeMobileMenu}>
                {t("contact")}
              </NavLink>
            </li>

            {isAuthenticated && user && (
              <li className="nav-dashboard-li">
                <button
                  type="button"
                  className="nav-dashboard-btn"
                  onClick={handleDashboard}
                >
                  Go to Dashboard
                  <FiArrowUpRight size={15} />
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div className={`site-fixed-header-space ${hideTopStrip ? "site-fixed-header-space--small" : ""}`}></div>
    </>
  );
};

export default Navbar;