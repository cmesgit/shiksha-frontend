// ─────────────────────────────────────────────────────────────────────────────
// src/explore/ExploreStore.jsx
//
// Client-side "library" state for Explore: which documents the person has
// saved, liked, viewed, uploaded, and which authors they follow. Persisted to
// localStorage so it survives refreshes while there's no backend. Every mutation
// also fires the matching exploreApi write (a no-op in mock mode), so swapping
// to the real server later is just flipping USE_MOCK in exploreApi.js.
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { saveDocument, followAuthor, likeDocument } from "./exploreApi";

// Namespaced per authenticated user (falls back to a shared anonymous key
// when logged out) so switching accounts on the same browser doesn't leak
// another user's saved/viewed/liked state. Mirrors the `storageKey(profileId)`
// pattern used by src/pages/Profile.jsx.
const BASE_KEY = "shiksha.explore.library.v1";
const storageKey = (userId) => (userId ? `${BASE_KEY}.${userId}` : `${BASE_KEY}.anon`);
const EMPTY = { saved: [], following: [], likes: [], viewed: [], myDocs: [] };

function load(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : { ...EMPTY };
  } catch {
    return { ...EMPTY };
  }
}

const ExploreCtx = createContext(null);

export function ExploreProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const nav = useNavigate();
  const key = storageKey(user?.id);
  const [lib, setLib] = useState(() => load(key));
  const [prevKey, setPrevKey] = useState(key);

  // Re-load from the correct namespaced key whenever the signed-in user
  // changes (login, logout, account switch) instead of carrying over the
  // previous user's in-memory state. Done during render (React's documented
  // "adjusting state when a prop changes" pattern) rather than in an effect,
  // so it doesn't trigger an extra commit/render pass.
  if (prevKey !== key) {
    setPrevKey(key);
    setLib(load(key));
  }

  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(lib)); } catch { /* quota */ }
  }, [key, lib]);

  // ⚠ Save / Like / Follow all POST to IsAuthenticated endpoints
  // (documents/views.py ToggleSaveView, ToggleLikeView, FollowAuthorView), but
  // the controls render for anonymous visitors on /explore and /explore/browse,
  // which are AllowAny. So a logged-out click 401'd, apiClient's interceptor
  // tried a refresh, failed, and called redirectToLogin() —
  // `window.location.href = LOGIN_URL`, a FULL page navigation with no `next`.
  // The local store had already flipped to "saved", so the icon filled in and
  // then the tab left the site with no path back to the document. The
  // `.catch(() => {})` below cannot prevent that; by then it has navigated.
  //
  // Gate here rather than in each component so every caller is covered, and
  // send them somewhere they can come back FROM.
  const requireAuth = useCallback(() => {
    if (isAuthenticated) return true;
    const back = window.location.pathname + window.location.search;
    nav(`/login?next=${encodeURIComponent(back)}`);
    return false;
  }, [isAuthenticated, nav]);

  const toggleSave = useCallback((id) => {
    if (!requireAuth()) return;
    setLib((s) => {
      const has = s.saved.includes(id);
      saveDocument(id, !has).catch(() => {});
      return { ...s, saved: has ? s.saved.filter((x) => x !== id) : [id, ...s.saved] };
    });
  }, [requireAuth]);

  const toggleFollow = useCallback((authorId) => {
    if (!requireAuth()) return;
    setLib((s) => {
      const has = s.following.includes(authorId);
      followAuthor(authorId, !has).catch(() => {});
      return { ...s, following: has ? s.following.filter((x) => x !== authorId) : [authorId, ...s.following] };
    });
  }, [requireAuth]);

  const toggleLike = useCallback((id) => {
    if (!requireAuth()) return;
    setLib((s) => {
      const has = s.likes.includes(id);
      likeDocument(id, !has).catch(() => {});
      return { ...s, likes: has ? s.likes.filter((x) => x !== id) : [id, ...s.likes] };
    });
  }, [requireAuth]);

  const recordView = useCallback((id) => {
    setLib((s) => (s.viewed[0] === id ? s : { ...s, viewed: [id, ...s.viewed.filter((x) => x !== id)].slice(0, 40) }));
  }, []);

  const addMyDoc = useCallback((id) => {
    setLib((s) => ({ ...s, myDocs: [id, ...s.myDocs.filter((x) => x !== id)] }));
  }, []);

  // Drop a document from every local list. Called after it is deleted server-
  // side: without this its id lingers in saved/viewed/likes, and every list
  // that resolves ids through `?ids=` silently comes back one item short with
  // nothing explaining the gap.
  const forget = useCallback((id) => {
    setLib((s) => ({
      ...s,
      saved: s.saved.filter((x) => x !== id),
      likes: s.likes.filter((x) => x !== id),
      viewed: s.viewed.filter((x) => x !== id),
      myDocs: s.myDocs.filter((x) => x !== id),
    }));
  }, []);

  const value = useMemo(() => ({
    ...lib,
    isSaved: (id) => lib.saved.includes(id),
    isFollowing: (id) => lib.following.includes(id),
    isLiked: (id) => lib.likes.includes(id),
    toggleSave, toggleFollow, toggleLike, recordView, addMyDoc, forget,
  }), [lib, toggleSave, toggleFollow, toggleLike, recordView, addMyDoc, forget]);

  return <ExploreCtx.Provider value={value}>{children}</ExploreCtx.Provider>;
}

export function useExplore() {
  const ctx = useContext(ExploreCtx);
  if (!ctx) throw new Error("useExplore must be used inside <ExploreProvider>");
  return ctx;
}
