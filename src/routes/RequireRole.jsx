import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Accepts either a single `role` (back-compat) or a `roles` array — passes
// if the user holds ANY of them (e.g. roles={["ADMIN", "MODERATOR"]}).
const RequireRole = ({ role, roles, children }) => {
  const { hasRole, loading } = useAuth();

  if (loading) return null;
  const allowed = roles ? roles.some((r) => hasRole(r)) : hasRole(role);
  if (!allowed) return <Navigate to="/" replace />;

  return children;
};

export default RequireRole;
