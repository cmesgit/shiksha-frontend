// The scholarship flow needs the full academic field set (current_class,
// academic_year, school_name, board, date_of_birth, full_name) for the
// ACTIVE learner profile. AuthContext's `activeProfile` is the CARD shape
// (accounts.auth_flow.serialize_profile_card — id/display_name/etc, no
// academic fields), not a bare id — ProfileDetailView (GET/PATCH
// /accounts/profiles/:id/) is the fuller shape Manage Profile already
// reads/writes this data through (src/pages/Profile.jsx).
import { useCallback, useEffect, useState } from "react";
import api from "../api/apiClient";
import { useAuth } from "../contexts/AuthContext";

export default function useActiveLearnerProfile() {
  const { activeProfile, isAuthenticated } = useAuth();
  const profileId = activeProfile?.id || null;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    if (!isAuthenticated || !profileId) {
      setProfile(null);
      setLoading(false);
      return null;
    }
    setLoading(true);
    try {
      const { data } = await api.get(`/accounts/profiles/${profileId}/`);
      setProfile(data);
      return data;
    } catch {
      setProfile(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, [profileId, isAuthenticated]);

  useEffect(() => { reload(); }, [reload]);

  return { profile, loading, reload, profileId };
}
