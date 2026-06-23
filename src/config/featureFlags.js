/**
 * src/config/featureFlags.js  ·  Runtime feature toggles
 * ───────────────────────────────────────────────────────────
 * Small, dependency-free switches that change product behaviour
 * without touching call sites. Flip a value here and rebuild.
 *
 * FORM_FILLUP_ENABLED
 *   Master switch for enforcing the LEARNER profile "form fillup".
 *   When TRUE  → the old behaviour: a popup after login, a forced
 *                redirect to /form-fillup for incomplete learners,
 *                and Enroll/Subscribe blocked until the profile is
 *                complete.
 *   When FALSE → none of that is enforced. The learner can browse,
 *                enroll and subscribe freely. The /form-fillup page
 *                and the Profile editor still exist, so anyone who
 *                WANTS to complete their profile still can — they're
 *                simply never blocked or nagged.
 *
 *   NOTE: this only governs the LEARNER `profile_complete` gate. It
 *   deliberately does NOT touch signup, the teacher/expert
 *   application data, the expert skill profile, or the admin
 *   approval gates — those are load-bearing for their flows and are
 *   controlled by a separate mechanism (TeacherProfile track status
 *   + roles), not by this flag.
 *
 *   An env override is supported so you can flip it per-deployment
 *   without a code change: set VITE_FORM_FILLUP_ENABLED="true".
 */

const _envFlag = import.meta.env.VITE_FORM_FILLUP_ENABLED;

export const FORM_FILLUP_ENABLED =
  _envFlag === undefined ? false : String(_envFlag).toLowerCase() === "true";
