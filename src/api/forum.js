import api from "./apiClient";

// =====================================================
// Tags
// =====================================================
export async function getTags() {
  const res = await api.get("/forum/tags/");
  return res.data;
}

// =====================================================
// Threads
// =====================================================
export async function getThreads(params = {}) {
  const res = await api.get("/forum/threads/", { params });
  return res.data; // { results: [...], count: N }
}

export async function getThread(id) {
  const res = await api.get(`/forum/threads/${id}/`);
  return res.data;
}

export async function createThread(payload) {
  // payload: { title, body, tags }
  const res = await api.post("/forum/threads/create/", payload);
  return res.data;
}

export async function deleteThread(threadId) {
  const res = await api.delete(`/forum/threads/${threadId}/delete/`);
  return res.data;
}

// =====================================================
// Comments
// =====================================================
export async function getComments(threadId, params = {}) {
  const res = await api.get(`/forum/threads/${threadId}/comments/`, { params });
  return res.data; // { results: [...], count: N }
}

export async function postComment(threadId, payload) {
  // payload: { content, reply_to_comment_id }
  const res = await api.post(`/forum/threads/${threadId}/comments/create/`, payload);
  return res.data;
}

export async function deleteComment(commentId) {
  const res = await api.delete(`/forum/comments/${commentId}/delete/`);
  return res.data;
}

// =====================================================
// Upvotes
// =====================================================
export async function toggleThreadUpvote(threadId) {
  const res = await api.post(`/forum/threads/${threadId}/upvote/`);
  return res.data; // { upvoted: true/false, upvote_count: N }
}

export async function toggleCommentUpvote(commentId) {
  const res = await api.post(`/forum/comments/${commentId}/upvote/`);
  return res.data; // { upvoted: true/false, upvote_count: N }
}

// =====================================================
// Notifications
// =====================================================
export async function getNotifications() {
  const res = await api.get("/forum/notifications/");
  return res.data;
}

export async function markAllNotificationsRead() {
  const res = await api.post("/forum/notifications/read/");
  return res.data;
}

export async function markNotificationRead(notificationId) {
  const res = await api.post(`/forum/notifications/${notificationId}/read/`);
  return res.data;
}
