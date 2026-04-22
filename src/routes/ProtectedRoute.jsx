import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { LOGIN_URL } from "../config/urls";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Wait for bootstrap to finish
  if (loading) return null;

  if (!isAuthenticated) {
    try {
      const here = window.location.pathname + window.location.search;
      if (here && here.startsWith("/") && !here.startsWith("//")) {
        sessionStorage.setItem("post_auth_redirect", here);
      }
    } catch (_) { /* sessionStorage unavailable */ }

    window.location.href = LOGIN_URL;
    return null;
  }

  return children;
};

export default ProtectedRoute;
