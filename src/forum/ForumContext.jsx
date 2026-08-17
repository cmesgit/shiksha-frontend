// ForumContext — hydrates the signed-in user's forum badge + saved/following
// sets once, exposes optimistic toggles, a toast, and an auth-gate that sends
// guests to the real /login. Consumed by every forum screen so cards render
// their saved/follow state without prop-drilling.

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  getForumMe, toggleSave as apiToggleSave, followThread as apiFollowThread,
  followSpace as apiFollowSpace, followCategory as apiFollowCategory,
} from "../api/forum";
import ReportModal from "./components/ReportModal";

const ForumContext = createContext(null);

export function useForum() {
  return useContext(ForumContext) || {};
}

const EMPTY = { saved: [], following: { spaces: [], questions: [], categories: [] } };

export function ForumProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [me, setMe] = useState(null);
  const [saved, setSaved] = useState(new Set());
  const [followSpaces, setFollowSpaces] = useState(new Set());
  const [followQuestions, setFollowQuestions] = useState(new Set());
  const [followCategories, setFollowCategories] = useState(new Set());
  const [toast, setToast] = useState("");
  const [reportTarget, setReportTarget] = useState(null);
  const toastTimer = useRef(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2400);
  }, []);

  const hydrate = useCallback(async () => {
    if (!isAuthenticated) {
      setMe(null);
      setSaved(new Set()); setFollowSpaces(new Set());
      setFollowQuestions(new Set()); setFollowCategories(new Set());
      return;
    }
    try {
      const data = await getForumMe();
      setMe(data);
      const f = data.following || EMPTY.following;
      setSaved(new Set((data.saved || []).map(String)));
      setFollowSpaces(new Set((f.spaces || []).map(String)));
      setFollowQuestions(new Set((f.questions || []).map(String)));
      setFollowCategories(new Set((f.categories || []).map(String)));
    } catch {
      /* guest or transient error — leave defaults */
    }
  }, [isAuthenticated]);

  // Forum is ACCOUNT-level (community identity, saved/following belong to the
  // account, not a learner profile), so it deliberately does NOT re-hydrate on
  // a profile switch — the forum state is shared across all profiles.
  useEffect(() => { hydrate(); }, [hydrate]);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // Gate a write action behind login: returns true if the caller should stop.
  const requireAuth = useCallback(() => {
    if (!isAuthenticated) {
      navigate(`/login?next=${encodeURIComponent(window.location.pathname)}`);
      return true;
    }
    return false;
  }, [isAuthenticated, navigate]);

  const isSaved = useCallback((id) => saved.has(String(id)), [saved]);
  const isFollowingQuestion = useCallback((id) => followQuestions.has(String(id)), [followQuestions]);
  const isFollowingSpace = useCallback((slug) => followSpaces.has(String(slug)), [followSpaces]);
  const isFollowingCategory = useCallback((id) => followCategories.has(String(id)), [followCategories]);

  const toggleSave = useCallback(async (id) => {
    if (requireAuth()) return;
    const key = String(id);
    try {
      const { saved: nowSaved } = await apiToggleSave(id);
      setSaved((prev) => {
        const next = new Set(prev);
        if (nowSaved) next.add(key); else next.delete(key);
        return next;
      });
      showToast(nowSaved ? "Saved to your list" : "Removed from saved");
    } catch { showToast("Something went wrong"); }
  }, [requireAuth, showToast]);

  const toggleFollowQuestion = useCallback(async (id) => {
    if (requireAuth()) return;
    const key = String(id);
    try {
      const { following } = await apiFollowThread(id);
      setFollowQuestions((prev) => {
        const next = new Set(prev);
        if (following) next.add(key); else next.delete(key);
        return next;
      });
      showToast(following ? "Following question" : "Unfollowed question");
    } catch { showToast("Something went wrong"); }
  }, [requireAuth, showToast]);

  const toggleFollowSpace = useCallback(async (slug) => {
    if (requireAuth()) return null;
    const key = String(slug);
    try {
      const res = await apiFollowSpace(slug);
      setFollowSpaces((prev) => {
        const next = new Set(prev);
        if (res.following) next.add(key); else next.delete(key);
        return next;
      });
      return res;
    } catch { showToast("Something went wrong"); return null; }
  }, [requireAuth, showToast]);

  const toggleFollowCategory = useCallback(async (id) => {
    if (requireAuth()) return null;
    const key = String(id);
    try {
      const res = await apiFollowCategory(id);
      setFollowCategories((prev) => {
        const next = new Set(prev);
        if (res.following) next.add(key); else next.delete(key);
        return next;
      });
      showToast(res.following ? "Following category" : "Unfollowed category");
      return res;
    } catch { showToast("Something went wrong"); return null; }
  }, [requireAuth, showToast]);

  const openReport = useCallback((type, id) => {
    if (requireAuth()) return;
    setReportTarget({ type, id });
  }, [requireAuth]);

  const value = {
    me, refreshMe: hydrate, showToast, toast, requireAuth,
    isSaved, toggleSave,
    isFollowingQuestion, toggleFollowQuestion,
    isFollowingSpace, toggleFollowSpace,
    isFollowingCategory, toggleFollowCategory,
    openReport,
  };

  return (
    <ForumContext.Provider value={value}>
      {/* forum.css's color tokens (--fm-green, --fm-danger, --fm-ink, ...)
          are all scoped to .fm-root — without this wrapper every var(--fm-*)
          reference in forum.css is invalid, which silently falls back to
          transparent/inherited and produced (among other things) white-on-
          white toast text and an unreadable "Report" button. */}
      <div className="fm-root">
        {children}
        {reportTarget ? (
          <ReportModal
            target={reportTarget}
            onClose={() => setReportTarget(null)}
            onDone={(msg) => showToast(msg)}
          />
        ) : null}
        {toast ? <div className="fm-toast" role="status">{toast}</div> : null}
      </div>
    </ForumContext.Provider>
  );
}
