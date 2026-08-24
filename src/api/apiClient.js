/**
 * shiksha-frontend/src/api/apiClient.js
 *
 * Per-app client (not a sync target), but the refresh it performs is NOT
 * per-app: it shares one cookie with AuthContext's instance in this same
 * bundle, and the backend rotates AND blacklists the refresh token. Two
 * unguarded refreshes racing that endpoint means one winner and one
 * "Token is blacklisted" loser, and the loser redirects to login. Both now
 * go through the tab-wide single-flight in api/refreshSession.js.
 */
import axios from "axios";
import { API_URL } from "../config/urls";
import { refreshSession, redirectToLogin } from "./refreshSession";

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
    const isPublicEndpoint = originalRequest.url?.includes("/accounts/signup/") ||
                             originalRequest.url?.includes("/accounts/email/check/") ||
                             originalRequest.url?.includes("/accounts/verify-email/") ||
                             originalRequest.url?.includes("/accounts/resend-verification/");

    // 🚫 If simply not logged in, do NOT attempt refresh.
    // `/notifications/` was in this list too and has been dropped: it is an
    // ordinary authenticated endpoint, and excluding it meant the Settings
    // modal's notification-preference toggles were the one section that could
    // not recover from an expired access token.
    if (isUnauthorized && (isMeCall || isPublicEndpoint)) {
      return Promise.reject(error);
    }

    // 🔄 Attempt refresh only once and not for refresh endpoint
    if (isUnauthorized && !originalRequest._retry && !isRefreshCall) {
      originalRequest._retry = true;

      try {
        await refreshSession();
        return api(originalRequest);
      } catch {
        redirectToLogin();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
