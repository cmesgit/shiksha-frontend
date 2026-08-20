import api from "./apiClient";

export const getFormFillupData = () => api.get("/accounts/form-fillup/");
export const submitFormFillup = (formData) => api.put("/accounts/form-fillup/", formData, { headers: { "Content-Type": "multipart/form-data" }, });
export const getStates = () => api.get("/accounts/states/");
export const getDistricts = (stateName) => api.get(`/accounts/states/${encodeURIComponent(stateName)}/districts/`);
// The faculty option lists (subjects/classes/streams/…) served straight off
// accounts/models.py, so this form's copies can't drift from what validation
// accepts — see the note at the top of FacultySignup.jsx for the drift this
// already caused (10 subjects rendered, 15 accepted).
export const getFacultyChoices = () => api.get("/accounts/faculty-choices/");
