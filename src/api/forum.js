import api from "./apiClient";

// =====================================================
// Current user context (hydration) + taxonomy
// =====================================================
export async function getForumMe() {
  const res = await api.get("/forum/me/");
  return res.data; // { username, display_name, initials, color, credential, avatar_url, headline, location, bio, saved:[], following:{spaces,questions,categories} }
}

export async function getTopics() {
  const res = await api.get("/forum/topics/");
  return res.data; // { topics: [...], categories: [...] }
}

export async function getCategories() {
  const res = await api.get("/forum/categories/");
  return res.data; // { results: [...], count }
}

export async function getCategory(categoryId, params = {}) {
  const res = await api.get(`/forum/categories/${encodeURIComponent(categoryId)}/`, { params });
  return res.data; // { category, results, count }
}

export async function followCategory(categoryId) {
  const res = await api.post(`/forum/categories/${encodeURIComponent(categoryId)}/follow/`);
  return res.data; // { following }
}

// =====================================================
// Tags
// =====================================================
export async function getTags() {
  const res = await api.get("/forum/tags/");
  return res.data;
}

// =====================================================
// Spaces
// =====================================================
export async function getSpaces() {
  const res = await api.get("/forum/spaces/");
  return res.data; // { results, count }
}

export async function createSpace(payload) {
  // payload: { name, description, topic }
  const res = await api.post("/forum/spaces/create/", payload);
  return res.data;
}

export async function getSpace(slug, params = {}) {
  const res = await api.get(`/forum/spaces/${encodeURIComponent(slug)}/`, { params });
  return res.data; // { space, results, count }
}

export async function followSpace(slug) {
  const res = await api.post(`/forum/spaces/${encodeURIComponent(slug)}/follow/`);
  return res.data; // { following, member_count }
}

// =====================================================
// Threads (questions + posts)
// =====================================================
export async function getThreads(params = {}) {
  // params: { search, tag, topic, kind, space, author, solved, sort, page, page_size }
  const res = await api.get("/forum/threads/", { params });
  return res.data; // { results, count }
}

export async function getThread(id) {
  const res = await api.get(`/forum/threads/${id}/`);
  return res.data; // full post + answers[] + comments[]
}

export async function createThread(payload) {
  // payload: { title, body, kind, space, tags, files? }
  const { files, ...rest } = payload || {};
  if (files && files.length) {
    const fd = new FormData();
    fd.append("title", rest.title || "");
    fd.append("body", rest.body || "");
    fd.append("kind", rest.kind || "question");
    if (rest.space) fd.append("space", rest.space);
    (rest.tags || []).forEach((t) => fd.append("tags", t));
    files.forEach((f) => fd.append("files", f));
    const res = await api.post("/forum/threads/create/", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }
  const res = await api.post("/forum/threads/create/", rest);
  return res.data;
}

export async function deleteThread(threadId) {
  const res = await api.delete(`/forum/threads/${threadId}/delete/`);
  return res.data;
}

export async function toggleSave(threadId) {
  const res = await api.post(`/forum/threads/${threadId}/save/`);
  return res.data; // { saved }
}

export async function getSaved(params = {}) {
  const res = await api.get("/forum/saved/", { params });
  return res.data; // { results, count }
}

export async function followThread(threadId) {
  const res = await api.post(`/forum/threads/${threadId}/follow/`);
  return res.data; // { following }
}

export async function getAnswerQueue(params = {}) {
  const res = await api.get("/forum/answer-queue/", { params });
  return res.data; // { results, count }
}

// =====================================================
// Answers + comments (both are "replies" with a kind)
// =====================================================
export async function getComments(threadId, params = {}) {
  const res = await api.get(`/forum/threads/${threadId}/comments/`, { params });
  return res.data;
}

export async function postComment(threadId, payload) {
  // payload: { content, kind: 'answer'|'comment', reply_to_comment_id? }
  const res = await api.post(`/forum/threads/${threadId}/comments/create/`, payload);
  return res.data;
}

export async function deleteComment(commentId) {
  const res = await api.delete(`/forum/comments/${commentId}/delete/`);
  return res.data;
}

// =====================================================
// Upvotes + accept answer
// =====================================================
export async function toggleThreadUpvote(threadId) {
  const res = await api.post(`/forum/threads/${threadId}/upvote/`);
  return res.data;
}

export async function toggleCommentUpvote(commentId) {
  const res = await api.post(`/forum/comments/${commentId}/upvote/`);
  return res.data;
}

export async function acceptAnswer(threadId, replyId) {
  const res = await api.post(`/forum/threads/${threadId}/accept/${replyId}/`);
  return res.data;
}

// =====================================================
// Search + report
// =====================================================
export async function search(q) {
  const res = await api.get("/forum/search/", { params: { q } });
  return res.data; // { query, questions, users, tags, categories }
}

export async function report(payload) {
  // payload: { target_type: 'question'|'answer'|'comment', target_id, reason, detail? }
  const res = await api.post("/forum/report/", payload);
  return res.data;
}

// =====================================================
// Profiles
// =====================================================
export async function getForumProfile(username) {
  const res = await api.get(`/forum/users/${encodeURIComponent(username)}/`);
  return res.data;
}

export async function getUserReplies(username, params = {}) {
  const res = await api.get(`/forum/users/${encodeURIComponent(username)}/replies/`, { params });
  return res.data;
}

export async function updateForumProfile(payload) {
  // payload: { display_name, headline, location, bio }
  const res = await api.patch("/forum/profile/", payload);
  return res.data;
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
