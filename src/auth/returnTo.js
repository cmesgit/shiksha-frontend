const AUTH_PATH = /^\/(?:login|register|signup|pick-profile|forgot-password|reset-password)(?:\/|$)/;

// A post-login destination must stay on this site and must not loop back
// through another authentication gate.
export function safeReturnPath(value) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) return null;
  try {
    const base = "https://shikshacom.com";
    const parsed = new URL(value, base);
    if (parsed.origin !== base || AUTH_PATH.test(parsed.pathname)) return null;
    return parsed.pathname + parsed.search + parsed.hash;
  } catch {
    return null;
  }
}

export function resolveReturnPath(...candidates) {
  return candidates.map(safeReturnPath).find(Boolean) || null;
}
