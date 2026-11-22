// ─────────────────────────────────────────────────────────────────────────────
// src/explore/ExploreToolbar.jsx
// A slim, persistent Explore sub-nav rendered on every public Explore page (via
// the ExplorePage wrapper). Left: quick links; right: convenient access to My
// Library (dashboard), the Moderator panel (gated), and Upload. Keeps these
// Explore-specific actions out of the global site navbar.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { verificationEnabled } from "./verificationApi";
import TourHeaderButton from "../tour/TourHeaderButton";
import ScribbleIcon from "../components/icons/ScribbleIcon";
import "./Explore.css";
import "./explore-refresh.css";

// Collections deliberately absent. It lives in My Library, which is where a
// user's own collections are created and managed, so a second top-level entry
// to a mostly-empty public list was duplicate navigation. The /explore/
// collections routes still exist and are still linked from My Library and from
// an author's profile — only the toolbar entry is gone.
const LINKS = [
  { label: "Research", to: "/explore/research", match: (p) => p.startsWith("/explore/research") },
  { label: "Home", to: "/explore", match: (p) => p === "/explore" },
  { label: "Browse", to: "/explore/browse", match: (p) => p.startsWith("/explore/browse") },
];

// Verify sits after Browse, as in the design. It is appended rather than
// listed above because it is the one entry that is conditional: while
// GlobalSettings.explore_verification_enabled is off the page 404s its own
// API and there is nothing to link to.
const VERIFY_LINK = { label: "Verify", to: "/explore/verify", match: (p) => p.startsWith("/explore/verify") };

export default function ExploreToolbar() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated, hasPermission, hasRole } = useAuth();
  const canMod = isAuthenticated && (hasPermission?.("documents.moderate") || hasRole?.("ADMIN") || hasRole?.("MODERATOR"));

  /* Read from /api/public-config/ rather than from `feature_flags`, because
     this toolbar renders for logged-out visitors too. Starts false so the
     entry never flashes in and then disappears. */
  const [verifyOn, setVerifyOn] = useState(false);
  useEffect(() => { let live = true; verificationEnabled().then((on) => live && setVerifyOn(on)); return () => { live = false; }; }, []);

  const links = verifyOn ? [...LINKS, VERIFY_LINK] : LINKS;

  return (
    <div className="exp-toolbar">
      <div className="exp-toolbar-in">
        <nav className="exp-toolbar-nav">
          {links.map((l) => (
            <button key={l.to} className={`exp-tblink${l.match(pathname) ? " active" : ""}`} onClick={() => nav(l.to)} data-tour={`explore-toolbar.${l.to.replace(/^\/explore\/?/, "") || "home"}`}>{l.label}</button>
          ))}
        </nav>
        <div className="exp-toolbar-acts">
          {isAuthenticated && (
            <button className={`exp-tbbtn${pathname.startsWith("/explore/dashboard") ? " active" : ""}`} onClick={() => nav("/explore/dashboard")} title="My Library Dashboard" data-tour="explore-toolbar.library">
              <ScribbleIcon name="dashboard" size={15} />
              My Library
            </button>
          )}
          {canMod && (
            <button className="exp-tbbtn mod" onClick={() => nav("/explore/moderator")} title="Explore Moderation">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              Moderator
            </button>
          )}
          <button className="exp-tbbtn primary" onClick={() => nav("/explore/upload")}>+ Upload document</button>
          <TourHeaderButton pathname={pathname} />
        </div>
      </div>
    </div>
  );
}
