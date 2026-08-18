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
  const { user } = useAuth();
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

  const toggleSave = useCallback((id) => {
    setLib((s) => {
      const has = s.saved.includes(id);
      saveDocument(id, !has).catch(() => {});
      return { ...s, saved: has ? s.saved.filter((x) => x !== id) : [id, ...s.saved] };
    });
  }, []);

  const toggleFollow = useCallback((authorId) => {
    setLib((s) => {
      const has = s.following.includes(authorId);
      followAuthor(authorId, !has).catch(() => {});
      return { ...s, following: has ? s.following.filter((x) => x !== authorId) : [authorId, ...s.following] };
    });
  }, []);

  const toggleLike = useCallback((id) => {
    setLib((s) => {
      const has = s.likes.includes(id);
      likeDocument(id, !has).catch(() => {});
      return { ...s, likes: has ? s.likes.filter((x) => x !== id) : [id, ...s.likes] };
    });
  }, []);

  const recordView = useCallback((id) => {
    setLib((s) => (s.viewed[0] === id ? s : { ...s, viewed: [id, ...s.viewed.filter((x) => x !== id)].slice(0, 40) }));
  }, []);

  const addMyDoc = useCallback((id) => {
    setLib((s) => ({ ...s, myDocs: [id, ...s.myDocs.filter((x) => x !== id)] }));
  }, []);

  const value = useMemo(() => ({
    ...lib,
    isSaved: (id) => lib.saved.includes(id),
    isFollowing: (id) => lib.following.includes(id),
    isLiked: (id) => lib.likes.includes(id),
    toggleSave, toggleFollow, toggleLike, recordView, addMyDoc,
  }), [lib, toggleSave, toggleFollow, toggleLike, recordView, addMyDoc]);

  return <ExploreCtx.Provider value={value}>{children}</ExploreCtx.Provider>;
}

export function useExplore() {
  const ctx = useContext(ExploreCtx);
  if (!ctx) throw new Error("useExplore must be used inside <ExploreProvider>");
  return ctx;
}
