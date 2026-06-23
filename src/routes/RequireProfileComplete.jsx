import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FORM_FILLUP_ENABLED } from "../config/featureFlags";

/**
 * RequireProfileComplete — two-way gate.
 *
 *  - If the active learner profile is INCOMPLETE → force them to /form-fillup
 *    (previously this only redirected AWAY when complete, so a half-finished
 *    learner could sit on the dashboard).
 *  - If COMPLETE and sitting on /form-fillup → send them to /dashboard.
 *
 * Only enforced for the learner context. Account/teacher contexts pass through
 * (a teacher filling out the learner form would make no sense; the student app
 * has its own RequireProfileComplete that mirrors this).
 *
 * When FORM_FILLUP_ENABLED is false (the current default) this guard is a
 * no-op: learners are never forced onto the form. See config/featureFlags.js.
 */
const RequireProfileComplete = ({ children }) => {
  const { user, isLearnerContext, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  // Enforcement disabled → let everything through untouched.
  if (!FORM_FILLUP_ENABLED) return children;

  const complete =
    user?.profile_complete ??
    user?.active_profile?.profile_complete ??
    false;

  const onFormFillup = location.pathname === "/form-fillup";

  // Complete + parked on the form → move along to the dashboard.
  if (onFormFillup && complete) {
    return <Navigate to="/dashboard" replace />;
  }

  // Learner with an incomplete profile, anywhere but the form → send to the form.
  if (isLearnerContext && !complete && !onFormFillup) {
    return <Navigate to="/form-fillup" replace />;
  }

  return children;
};

export default RequireProfileComplete;
