import api from "./apiClient";

/**
 * Partial edit of one learner profile.
 *
 * PATCH is genuinely partial: `apply_profile_edits` (accounts/auth_flow.py:247)
 * only touches keys that are present in the payload, so sending `{ phone }`
 * alone leaves the rest of the profile untouched rather than blanking it.
 *
 * `profileId` must be the profile's UUID — `activeProfile.id`, not
 * `activeProfile` itself. AuthContext's `activeProfile` is the full serialized
 * profile-card object; passing it straight into the path silently 404s.
 */
export const updateProfileFields = (profileId, fields) =>
  api.patch(`/accounts/profiles/${profileId}/`, fields).then((r) => r.data);
