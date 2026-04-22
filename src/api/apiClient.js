import axios from "axios";
import { API_URL, LOGIN_URL } from "../config/urls";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    const isUnauthorized = error.response.status === 401;
    const isRefreshCall = originalRequest.url?.includes("/refresh/");
    const isMeCall = originalRequest.url?.includes("/me/");
    const isNotificationCall = originalRequest.url?.includes("/notifications/");

    // 🚫 If simply not logged in, do NOT attempt refresh
    if (isUnauthorized && (isMeCall || isNotificationCall)) {
      return Promise.reject(error);
    }

    // 🔄 Attempt refresh only once and not for refresh endpoint
    if (isUnauthorized && !originalRequest._retry && !isRefreshCall) {
      originalRequest._retry = true;

      try {
        await api.post("/accounts/refresh/");
        return api(originalRequest);
      } catch {
        if (!window.location.pathname.includes("/login") && !window.location.pathname.includes("/signup")) {
          window.location.href = LOGIN_URL;
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
