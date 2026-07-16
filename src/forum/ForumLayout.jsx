import React, { useState } from "react";
import { Outlet, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";
import { ForumProvider, useForum } from "./ForumContext";
import RightRail from "./components/RightRail";
import {
  IcHome, IcGrid, IcUsers, IcActivity, IcBell, IcBookmark, IcEdit, IcSearch, IcPlus,
} from "./components/icons";
import "./forum.css";

function TopBar() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { unreadCount } = useNotification() || {};
  const { requireAuth } = useForum();
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");

  const submit = (e) => {
    e.preventDefault();
    const v = q.trim();
    if (v) navigate(`/forum/search?q=${encodeURIComponent(v)}`);
  };

  return (
    <div className="fm-topbar">
      <div className="fm-topbar-in">
        <form className="fm-search" onSubmit={submit}>
          <IcSearch size={17} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions, people, tags…" aria-label="Search the forum" />
        </form>
        <button className="fm-btn" onClick={() => { if (!requireAuth()) navigate("/forum/ask"); }}>
          <IcPlus size={15} /> Ask
        </button>
        {isAuthenticated ? (
          <button className="fm-bell" onClick={() => navigate("/forum/notifications")} aria-label="Notifications">
            <IcBell size={19} />
            {unreadCount > 0 ? <span className="fm-bell-badge">{unreadCount > 99 ? "99+" : unreadCount}</span> : null}
          </button>
        ) : (
          <>
            <button className="fm-btn ghost sm" onClick={() => navigate(`/login?next=${encodeURIComponent("/forum")}`)}>Log in</button>
            <button className="fm-btn sm" onClick={() => navigate("/signup")}>Sign up</button>
          </>
        )}
      </div>
    </div>
  );
}

function LeftNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  const { unreadCount } = useNotification() || {};
  const { requireAuth } = useForum();

  const isActive = (p, exact) => (exact ? pathname === p : pathname.startsWith(p));
  const gated = (p) => () => { if (!requireAuth()) navigate(p); };

  const Item = ({ to, icon: Icon, label, active, onClick, badge }) => (
    <button className={active ? "active" : ""} onClick={onClick || (() => navigate(to))}>
      <Icon size={16} /> {label}
      {badge ? <span className="fm-nav-badge">{badge > 99 ? "99+" : badge}</span> : null}
    </button>
  );

  return (
    <nav className="fm-nav">
      <Item to="/forum" icon={IcHome} label="Forum Home" active={isActive("/forum", true) || pathname === "/forum/"} />
      <Item to="/forum/categories" icon={IcGrid} label="Categories" active={isActive("/forum/categ")} />
      <Item to="/forum/spaces" icon={IcUsers} label="Spaces" active={isActive("/forum/space")} />
      <div className="fm-nav-sep" />
      <Item icon={IcEdit} label="Answer Queue" active={isActive("/forum/answer-queue")} onClick={gated("/forum/answer-queue")} />
      <Item icon={IcBookmark} label="Saved" active={isActive("/forum/saved")} onClick={gated("/forum/saved")} />
      {isAuthenticated ? (
        <>
          <Item to="/forum/profile" icon={IcActivity} label="My Activity" active={isActive("/forum/profile")} />
          <Item icon={IcBell} label="Notifications" badge={unreadCount} active={isActive("/forum/notifications")} onClick={() => navigate("/forum/notifications")} />
        </>
      ) : null}
    </nav>
  );
}

function Shell() {
  return (
    <div className="fm-root">
      <TopBar />
      <div className="fm-shell">
        <div className="fm-col-nav"><LeftNav /></div>
        <main className="fm-col-main"><Outlet /></main>
        <div className="fm-col-rail"><RightRail /></div>
      </div>
    </div>
  );
}

export default function ForumLayout() {
  return (
    <ForumProvider>
      <Shell />
    </ForumProvider>
  );
}
