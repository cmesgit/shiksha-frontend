import api from "./apiClient";

export const getCoursePublic = (courseId) =>
  api.get(`/courses/${courseId}/public/`).then((r) => r.data);

export const submitEnrollmentRequest = (formData) =>
  api.post("/enrollments/requests/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  }).then((r) => r.data);

export const getMyEnrollmentRequests = () =>
  api.get("/enrollments/requests/mine/").then((r) => r.data);
