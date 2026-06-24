/**
 * src/hooks/useLearnGuard.js   (landing app — src_frontend)
 *
 * Single place that decides what happens when a user tries to LEARN / ENROLL /
 * BUY an academy course. Mirrors the backend rule we just enforced: academy
 * access is per LEARNER PROFILE, so the user must be in *learner context*
 * before they can enroll. Teacher context can't hold academy access.
 *
 * Branches by auth state (all flags come from AuthContext):
 *   not authenticated         → send to signup/login (remember intent)
 *   account context           → /pick-profile  (needsProfileSelection)
 *   teacher context           → offer "switch to a learner profile"
 *   learner context           → proceed (return true)
 *
 * Usage in a component (e.g. Enroll.jsx, a course card's Enroll button):
 *
 *   const guardLearn = useLearnGuard();
 *   const onEnrollClick = () => {
 *     if (!guardLearn({ courseId })) return;   // it handled the redirect
 *     // ...learner context confirmed; run the real enroll/buy flow
 *   };
 */
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { LOGIN_URL, PICK_PROFILE_URL } from "../config/urls";

export function useLearnGuard() {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    isTeacherContext,
    isLearnerContext,
    needsProfileSelection,
    profiles,
    switchProfile,   // (profileId) => Promise — already in AuthContext
  } = useAuth();

  return useCallback(
    ({ courseId } = {}) => {
      // Remember where the user wanted to go, so post-login/select we can return.
      const intent = courseId ? `/enroll/${courseId}` : window.location.pathname;

      // 1) Not logged in → login/signup, carrying the intent.
      if (!isAuthenticated) {
        try { sessionStorage.setItem("postAuthRedirect", intent); } catch {}
        window.location.href = `${LOGIN_URL}?next=${encodeURIComponent(intent)}`;
        return false;
      }

      // 2) Logged in but no profile chosen yet (account context).
      if (needsProfileSelection) {
        try { sessionStorage.setItem("postAuthRedirect", intent); } catch {}
        window.location.href = `${PICK_PROFILE_URL}?next=${encodeURIComponent(intent)}`;
        return false;
      }

      // 3) Teacher context → must switch to (or create) a learner profile first.
      if (isTeacherContext) {
        const learnerProfiles = (profiles || []).filter(
          (p) => p.is_active !== false
        );
        if (learnerProfiles.length === 1 && switchProfile) {
          // One obvious learner profile — switch into it, then proceed.
          switchProfile(learnerProfiles[0].id)
            .then(() => navigate(intent))
            .catch(() => {
              try { sessionStorage.setItem("postAuthRedirect", intent); } catch {}
              navigate("/pick-profile");
            });
          return false;
        }
        // Zero or multiple learner profiles → let the user pick/create one.
        try { sessionStorage.setItem("postAuthRedirect", intent); } catch {}
        navigate("/pick-profile");
        return false;
      }

      // 4) Learner context → good to go.
      if (isLearnerContext) return true;

      // Fallback: unknown context → make them pick a profile.
      try { sessionStorage.setItem("postAuthRedirect", intent); } catch {}
      navigate("/pick-profile");
      return false;
    },
    [isAuthenticated, isTeacherContext, isLearnerContext,
     needsProfileSelection, profiles, switchProfile, navigate]
  );
}
