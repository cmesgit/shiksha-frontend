import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RequireProfileComplete = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  // Redirect away from /form-fillup if profile is already complete
  if (location.pathname === "/form-fillup" && user?.profile_complete === true) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RequireProfileComplete;
