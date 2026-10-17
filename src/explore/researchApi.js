import api from "../api/apiClient";
const root = "/explore/research/";
export const researchList = async (params) => (await api.get(root, { params })).data;
export const researchDetail = async (id) => (await api.get(`${root}${id}/`)).data;
export const researchAction = async (id, body) => (await api.post(`${root}${id}/`, body)).data;
export const reviewerProfile = async () => (await api.get(`${root}reviewers/`)).data;
export const applyReviewer = async (body) => (await api.post(`${root}reviewers/`, body)).data;
export const setReviewerAvailability = async available => (await api.patch(`${root}reviewers/`, { available })).data;
export async function submitResearch(body, id, correction = false) {
  const form = new FormData();
  Object.entries(body).forEach(([key, value]) => value != null && form.append(key, value));
  return (await api.post(id ? `${root}${id}/${correction ? "corrections" : "revisions"}/` : root, form, { headers: { "Content-Type": "multipart/form-data" } })).data;
}
export async function downloadManuscript(path, version) {
  const { data } = await api.get(path, { responseType: "blob" });
  const url = URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = url; link.download = `research-v${version}.pdf`; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function researchError(error) {
  const data = error?.response?.data;
  return typeof data?.detail === "string" ? data.detail : Object.values(data || {}).flat().find(v => typeof v === "string") || "Couldn’t complete the request. Your form is still here. Please try again.";
}
