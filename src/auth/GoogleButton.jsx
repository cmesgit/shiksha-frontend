import { useEffect, useRef, useState } from "react";

/* ════════════════════════════════════════════════════════════════
   GoogleButton — "Continue with Google", rendered by Google Identity
   Services.

   GATING (read this before wondering why it isn't showing)
   ────────────────────────────────────────────────────────
   This renders only when VITE_GOOGLE_CLIENT_ID is set at BUILD time.
   That is not laziness — it is the only gate available here.

   `GlobalSettings.google_oauth_enabled` is the server-side switch, but it
   is exposed only through the AUTHENTICATED GET /accounts/me/, and there is
   no public settings endpoint. This component lives on the login and signup
   screens, where nobody is authenticated yet, so there is nothing for it to
   read. The build-time variable gates the UI; the flag gates the ENDPOINT.
   Both are required, and neither alone is sufficient.

   Consequence: with the env var set but the flag off, the button renders and
   the request comes back 403 `disabled`. `onUnavailable` exists so the caller
   can hide it at that point rather than leaving a button that always fails.

   STYLING
   ───────
   Google renders this inside its own iframe. Theme, size, shape and width are
   the only levers; it cannot be restyled to match the rest of the form, and
   attempting to overlay or re-skin it violates Google's branding terms. The
   surrounding layout accommodates it rather than the other way round.
════════════════════════════════════════════════════════════════ */

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
const SRC = "https://accounts.google.com/gsi/client";

let scriptPromise = null;
function loadGis() {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", reject);
      return;
    }
    const s = document.createElement("script");
    s.src = SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Google sign-in failed to load."));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export const googleSignInConfigured = () => !!CLIENT_ID;

export default function GoogleButton({ onCredential, text = "continue_with", disabled }) {
  const holder = useRef(null);
  const [failed, setFailed] = useState(false);
  // Keep the latest callback without re-running the render effect — GIS would
  // otherwise draw a second button every time the parent re-renders.
  const cb = useRef(onCredential);
  useEffect(() => { cb.current = onCredential; }, [onCredential]);

  useEffect(() => {
    if (!CLIENT_ID) return;
    let cancelled = false;

    loadGis()
      .then(() => {
        if (cancelled || !holder.current) return;
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: (res) => { if (res?.credential) cb.current?.(res.credential); },
          // One Tap is deliberately off. It can appear over a form the person
          // is already filling in, and on a shared device it offers whichever
          // Google account the browser happens to hold.
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        holder.current.innerHTML = "";
        window.google.accounts.id.renderButton(holder.current, {
          theme: "outline",
          size: "large",
          shape: "rectangular",
          text,
          width: holder.current.offsetWidth || 320,
          logo_alignment: "center",
        });
      })
      .catch(() => { if (!cancelled) setFailed(true); });

    return () => { cancelled = true; };
  }, [text]);

  if (!CLIENT_ID) return null;

  if (failed) {
    return (
      <p style={{ fontSize: 12, color: "#8a8a8a", textAlign: "center", margin: "8px 0" }}>
        Google sign-in couldn’t load. Use your email and password below.
      </p>
    );
  }

  return (
    <div
      ref={holder}
      // Google's iframe ignores pointer-events set on itself, so a disabled
      // parent is the only way to stop a second click mid-request.
      style={{
        display: "flex", justifyContent: "center", minHeight: 44,
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
    />
  );
}
