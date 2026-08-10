// The only piece of scholarship flow state with no server-side home yet:
// which course was picked, before an eligibility record even exists.
// Everything past identity verification (verification status, eligibility,
// exam session, award) is server-authoritative and re-fetched on load —
// this is purely "don't lose the course pick on a reload of step 2/3."
const KEY = "sch_course_id";

export const setFlowCourseId = (id) => {
  try { sessionStorage.setItem(KEY, id); } catch { /* storage unavailable */ }
};

export const getFlowCourseId = () => {
  try { return sessionStorage.getItem(KEY); } catch { return null; }
};

export const clearFlowCourseId = () => {
  try { sessionStorage.removeItem(KEY); } catch { /* noop */ }
};
