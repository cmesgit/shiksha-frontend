// Single source of truth for cross-app URLs.
// Override in .env via VITE_*_URL; fallbacks point at production.
export const HOME_URL = import.meta.env.VITE_HOME_URL || "https://www.shikshacom.com";
export const APP_URL = import.meta.env.VITE_APP_URL || "https://app.shikshacom.com/";
export const TEACHER_URL = import.meta.env.VITE_TEACHER_URL || "https://teacher.shikshacom.com/teacher/dashboard";
export const API_URL = import.meta.env.VITE_API_URL || "https://api.shikshacom.com";

export const LOGIN_URL = `${HOME_URL.replace(/\/$/, "")}/login`;
