import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * Uses <Navigate> instead of window.location.href = LOGIN_URL.
 *
 * The /login route is local to this React app — window.location.href
 * causes a full hard reload, which re-runs bootstrap from scratch and
 * can briefly flip auth state in a way that triggers repeated redirects.
 * <Navigate> stays within React Router and avoids the reload entirely.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!isAuthenticated) {
    try {
      const here = location.pathname + location.search;
      if (here.startsWith("/") && !here.startsWith("//")) {
        sessionStorage.setItem("post_auth_redirect", here);
      }
    } catch { /* sessionStorage unavailable */ }

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
