// PLACEMENT: src/api/coursesApi.js
//
// Client for the real (backend-driven) anonymous course catalog —
// /api/courses/public/*. Every helper degrades gracefully (resolves to
// [] / null on failure), matching contentApi.js's convention, so the page
// can show an empty/locked state instead of crashing if the API is down.

import api from "./apiClient";

export async function getPublicBoards() {
  try {
    const { data } = await api.get("/courses/public/boards/");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getPublicCatalog(boardId) {
  if (!boardId) return [];
  try {
    const { data } = await api.get("/courses/public/catalog/", { params: { board: boardId } });
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getPublicCourseDetail(courseId) {
  if (!courseId) return null;
  try {
    const { data } = await api.get(`/courses/public/${courseId}/`);
    return data;
  } catch {
    return null;
  }
}
