import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Gate a route behind RBAC. Passes if the user holds ANY of the given
// `permissions` (codenames, checked against user.permissions / staff) OR ANY of
// the given `roles` (names), OR the single back-compat `role`. Permission is the
// preferred signal — it matches the backend's IsForumModerator authority
// (is_staff OR has_permission OR has_role) — with roles kept as a fallback.
//   <RequireRole permissions={["forum.moderate"]} roles={["ADMIN","MODERATOR"]}>
const RequireRole = ({ role, roles, permissions, children }) => {
  const { hasRole, hasPermission, loading } = useAuth();

  if (loading) return null;

  const byPerm = Array.isArray(permissions) && permissions.some((p) => hasPermission(p));
  const byRole = roles ? roles.some((r) => hasRole(r)) : (role ? hasRole(role) : false);
  if (!byPerm && !byRole) return <Navigate to="/" replace />;

  return children;
};

export default RequireRole;
