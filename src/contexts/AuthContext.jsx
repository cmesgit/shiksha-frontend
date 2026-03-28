import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../api/apiClient";
import extractError from "../utils/extractError";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  /**
   * Refresh access token using refresh cookie
   */
  const refreshToken = async () => {
    try {
      await api.post("/accounts/refresh/");
      return true;
    } catch {
      return false;
    }
  };

  /**
   * Bootstrap user session
   */
  const bootstrap = useCallback(async () => {
    try {
      const res = await api.get("/accounts/me/");
      setUser(res.data);
      return res.data;
    } catch (err) {
      // 🔥 Try refresh once
      const refreshed = await refreshToken();

      if (refreshed) {
        try {
          const res = await api.get("/accounts/me/");
          setUser(res.data);
          return res.data;
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }

      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Initial bootstrap
   */
  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  /**
   * Login
   */
  const login = async (email, password) => {
    try {
      await api.post("/accounts/login/", { email, password });

      setLoading(true);
      const me = await bootstrap();
      return me;
    } catch (err) {
      setLoading(false);

      const cleanError = extractError(err);

      return Promise.reject({
        message: cleanError,
        raw: err,
      });
    }
  };

  /**
   * Signup
   */
  const signup = async (payload) => {
    try {
      await api.post("/accounts/signup/", payload);
    } catch (err) {
      return Promise.reject({
        message: extractError(err),
        raw: err,
      });
    }
  };

  /**
   * Logout
   */
  const logout = async () => {
    try {
      await api.post("/accounts/logout/");
    } catch {
      // ignore
    }

    setUser(null);
  };

  /**
   * Role checker
   */
  const hasRole = (role) => {
    if (!user) return false;

    const target = String(role).toLowerCase();

    // single role
    if (String(user.role || "").toLowerCase() === target) {
      return true;
    }

    // multiple roles
    if (Array.isArray(user.roles)) {
      return user.roles.some(
        (r) => String(r).toLowerCase() === target
      );
    }

    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        signup,
        logout,
        hasRole,
        bootstrap,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);