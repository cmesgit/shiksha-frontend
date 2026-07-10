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
  // params: { search, tag, author, solved: 'true'|'false'|'unanswered', sort, page, page_size }
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
// Accept answer
// =====================================================
export async function acceptAnswer(threadId, replyId) {
  const res = await api.post(`/forum/threads/${threadId}/accept/${replyId}/`);
  return res.data; // { accepted_reply_id: N|null, is_solved: true/false }
}

// =====================================================
// Public profile
// =====================================================
export async function getForumProfile(username) {
  const res = await api.get(`/forum/users/${encodeURIComponent(username)}/`);
  return res.data; // { username, joined_at, bio, thread_count, reply_count, upvotes_received, is_self }
}

export async function getUserReplies(username, params = {}) {
  const res = await api.get(`/forum/users/${encodeURIComponent(username)}/replies/`, { params });
  return res.data; // { results: [{ id, thread_id, thread_title, content, created_at, upvote_count, is_accepted, ... }], count: N }
}

export async function updateForumProfile(payload) {
  // payload: { bio }
  const res = await api.patch("/forum/profile/", payload);
  return res.data; // { bio }
}

// =====================================================
// Notifications
// =====================================================
export async function getNotifications(params = {}) {
  const res = await api.get("/forum/notifications/", { params });
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
