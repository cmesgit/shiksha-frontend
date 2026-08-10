// ─────────────────────────────────────────────────────────────────────────────
// src/explore/ExploreToolbar.jsx
// A slim, persistent Explore sub-nav rendered on every public Explore page (via
// the ExplorePage wrapper). Left: quick links; right: convenient access to My
// Library (dashboard), the Moderator panel (gated), and Upload. Keeps these
// Explore-specific actions out of the global site navbar.
// ─────────────────────────────────────────────────────────────────────────────

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Explore.css";

const LINKS = [
  { label: "Home", to: "/explore", match: (p) => p === "/explore" },
  { label: "Browse", to: "/explore/browse", match: (p) => p.startsWith("/explore/browse") },
  { label: "Collections", to: "/explore/collections", match: (p) => p.startsWith("/explore/collections") },
];

export default function ExploreToolbar() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated, hasPermission, hasRole } = useAuth();
  const canMod = isAuthenticated && (hasPermission?.("documents.moderate") || hasRole?.("ADMIN") || hasRole?.("MODERATOR"));

  return (
    <div className="exp-toolbar">
      <div className="exp-toolbar-in">
        <nav className="exp-toolbar-nav">
          {LINKS.map((l) => (
            <button key={l.to} className={`exp-tblink${l.match(pathname) ? " active" : ""}`} onClick={() => nav(l.to)}>{l.label}</button>
          ))}
        </nav>
        <div className="exp-toolbar-acts">
          {isAuthenticated && (
            <button className={`exp-tbbtn${pathname.startsWith("/explore/dashboard") ? " active" : ""}`} onClick={() => nav("/explore/dashboard")} title="My Library Dashboard">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></svg>
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
        </div>
      </div>
    </div>
  );
}
