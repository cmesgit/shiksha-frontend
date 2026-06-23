/**
 * src/contexts/AuthContext.jsx — FIXED
 *
 * The two bugs that caused the infinite reload loop on /login:
 *
 * BUG 1: interceptor was intercepting /me/ calls.
 *   Bootstrap calls /me/ → gets 401 → interceptor fires → refresh fails
 *   → window.location.href = LOGIN_URL → hard reload of /login
 *   → bootstrap calls /me/ again → same → infinite loop.
 *   FIX: skip the interceptor for /me/ and /notifications/ calls.
 *        Let bootstrap handle its own /me/ 401 gracefully.
 *
 * BUG 2: interceptor redirected to LOGIN_URL even when already on /login.
 *   FIX: only redirect if the current path is not an auth page.
 *
 * Both fixes match the original api/apiClient.js behaviour that was working.
 */
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { API_URL, LOGIN_URL } from "../config/urls";

// ── Axios client ──────────────────────────────────────────────────────────────
const api = axios.create({
  baseURL:         API_URL,
  withCredentials: true,
});

let _isRefreshing = false;
let _queue        = [];
const _flush = (err) => {
  _queue.forEach((p) => (err ? p.reject(err) : p.resolve()));
  _queue = [];
};

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const orig = error.config;
    const st   = error.response?.status;
    const url  = orig?.url || "";

    // FIX 1: never intercept /me/ or /notifications/ — bootstrap handles /me/ 401
    // itself; intercepting it causes an infinite reload on the /login page.
    const isMeCall           = url.includes("/me/");
    const isNotificationCall = url.includes("/notifications/");
    if (isMeCall || isNotificationCall) {
      return Promise.reject(error);
    }

    if (
      st !== 401 ||
      orig._retry ||
      url.includes("/accounts/refresh/") ||
      url.includes("/accounts/login/")
    ) {
      return Promise.reject(error);
    }

    if (_isRefreshing) {
      return new Promise((res, rej) =>
        _queue.push({ resolve: res, reject: rej })
      ).then(() => api(orig));
    }

    orig._retry   = true;
    _isRefreshing = true;
    try {
      await api.post("/accounts/refresh/");
      _flush(null);
      return api(orig);
    } catch (e) {
      _flush(e);
      // FIX 2: only redirect if we are NOT already on an auth page.
      // Without this check, arriving at /login triggers another redirect
      // to /login, which triggers another, forever.
      const p = window.location.pathname;
      const onAuthPage =
        p === "/login" ||
        p === "/signup" ||
        p.startsWith("/verify-email") ||
        p.startsWith("/forgot-password") ||
        p.startsWith("/email-verified");
      if (!onAuthPage) {
        window.location.href = LOGIN_URL;
      }
      return Promise.reject(e);
    } finally {
      _isRefreshing = false;
    }
  }
);

export { api };

// ── Error extractor ───────────────────────────────────────────────────────────
function extractError(err) {
  const d = err?.response?.data;
  if (!d)                       return err?.message || "Something went wrong.";
  if (typeof d === "string")    return d;
  if (d.detail)                 return d.detail;
  for (const k of Object.keys(d)) {
    const v = d[k];
    if (Array.isArray(v) && v.length) return v[0];
    if (typeof v === "string")        return v;
  }
  return "Something went wrong.";
}

// ── Context ───────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,        setUser]        = useState(null);
  const [profiles,    setProfiles]    = useState([]);
  const [teacherInfo, setTeacherInfo] = useState(null);
  const [context,     setContext]     = useState(null);
  const [loading,     setLoading]     = useState(true);

  const isAuthenticated       = !!user;
  const needsProfileSelection = isAuthenticated && context === "account";
  const activeProfile         = user?.active_profile || null;
  const isTeacherContext      = context === "teacher";
  const isLearnerContext      = context === "learner";

  // ── Bootstrap ─────────────────────────────────────────────────────────────
  // The interceptor skips /me/ calls, so bootstrap handles refresh manually.
  const bootstrap = useCallback(async () => {
    const apply = (data) => {
      setUser(data);
      setContext(data.context || "account");
      setProfiles(Array.isArray(data.profiles) ? data.profiles : []);
      setTeacherInfo(data.teacher || null);
      return data;
    };
    try {
      const res = await api.get("/accounts/me/");
      return apply(res.data);
    } catch {
      // /me/ failed — try refreshing the token once
      try {
        await api.post("/accounts/refresh/");
      } catch {
        // Refresh also failed — user is not logged in
        setUser(null);
        setLoading(false);
        return null;
      }
      // Refresh succeeded — retry /me/
      try {
        return apply((await api.get("/accounts/me/")).data);
      } catch {
        setUser(null);
        return null;
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { bootstrap(); }, [bootstrap]);

  // ── Step 1 — account login ─────────────────────────────────────────────────
  const login = async (email, password) => {
    try {
      const res  = await api.post("/accounts/login/", { email, password });
      const data = res.data;
      // Stash what the login response told us so the picker has profiles/teacher
      // available immediately after bootstrap, even if /me/ returns slightly
      // different shape data.
      setProfiles(data.profiles || []);
      setTeacherInfo(data.teacher || null);
      setContext(data.context);
      // ALWAYS bootstrap — this populates `user` (isAuthenticated) regardless
      // of context. Without it, "account" context navigated to /pick-profile
      // while user was still null, causing ProtectedRoute to kick back to /login.
      setLoading(true);
      await bootstrap();
      return data;
    } catch (err) {
      return Promise.reject({ message: extractError(err), raw: err });
    }
  };

  // ── Step 2A — select / switch learner profile ──────────────────────────────
  const selectProfile = async (profileId, pin) => {
    try {
      await api.post("/accounts/profiles/select/", { profile_id: profileId, pin });
      setLoading(true);
      return await bootstrap();
    } catch (err) {
      return Promise.reject({ message: extractError(err), raw: err });
    }
  };

  const switchProfile = selectProfile;

  // ── Step 2B — enter teacher context (account password) ────────────────────
  const enterTeacherMode = async (password, track) => {
    try {
      await api.post("/accounts/context/teacher/", { password, track });
      setLoading(true);
      await bootstrap();
      return { ok: true };
    } catch (err) {
      const code = err?.response?.data?.code;
      if (code === "no_teacher")    return { needsSignup: true };
      if (code === "not_approved")  return { notApproved: true };
      if (code === "track_pending") return { trackPending: true };
      if (code === "track_locked")  return { trackLocked: true };
      return Promise.reject({ message: extractError(err), raw: err });
    }
  };

  // ── Profile PIN ────────────────────────────────────────────────────────────
  const setProfilePin = async (profileId, pin) => {
    try {
      const res = await api.post("/accounts/profiles/pin/", {
        profile_id: profileId,
        pin: pin || "",
      });
      const refreshed = await api.get("/accounts/profiles/");
      setProfiles(refreshed.data);
      return res.data;
    } catch (err) {
      return Promise.reject({ message: extractError(err), raw: err });
    }
  };

  // ── Email helpers ──────────────────────────────────────────────────────────
  const lookupEmail = async (email) => {
    try {
      const res = await api.post("/accounts/profiles/lookup/", {
        email: email.trim().toLowerCase(),
      });
      return res.data;
    } catch {
      return { profiles: [], has_teacher: false };
    }
  };

  const checkEmail = async (email) => {
    try {
      const res = await api.post("/accounts/email/check/", {
        email: email.trim().toLowerCase(),
      });
      return res.data;
    } catch {
      return { exists: false, has_student: false, has_teacher: false, is_verified: false };
    }
  };

  // ── Signup ─────────────────────────────────────────────────────────────────
  const signup = async (payload) => {
    try {
      await api.post("/accounts/signup/", payload);
    } catch (err) {
      return Promise.reject({ message: extractError(err), raw: err });
    }
  };

  // ── Logout ─────────────────────────────────────────────────────────────────
  // Does NOT do window.location.href — the caller (Navbar.handleLogout) uses
  // navigate("/login") which keeps React Router in control and avoids a hard
  // reload that would restart the bootstrap loop.
  const logout = async () => {
    try { await api.post("/accounts/logout/"); } catch { /* ignore */ }
    setUser(null);
    setProfiles([]);
    setTeacherInfo(null);
    setContext(null);
  };

  // ── Role check ─────────────────────────────────────────────────────────────
  const hasRole = (role) => {
    if (!user || !Array.isArray(user.roles)) return false;
    return user.roles.some(
      (r) => String(r).toLowerCase() === String(role).toLowerCase()
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user, profiles, teacherInfo, context, activeProfile,
        isAuthenticated, needsProfileSelection, isTeacherContext, isLearnerContext,
        loading, api,
        login, selectProfile, switchProfile,
        enterTeacherMode, setProfilePin,
        signup, lookupEmail, checkEmail, logout, hasRole, bootstrap,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export default api;
