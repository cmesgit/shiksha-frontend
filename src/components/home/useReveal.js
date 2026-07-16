import { useEffect, useRef } from "react";

/**
 * useReveal — IntersectionObserver-based reveal-on-scroll.
 *
 * Any descendant of the returned ref carrying the `hm-rv` class gets
 * `hm-in` added the first time ~12% of it enters the viewport
 * (mirrors the behaviour of the approved static design).
 */
export default function useReveal() {
  const rootRef = useRef(null);

  useEffect(() => {
    const rootEl = rootRef.current;
    if (!rootEl) return undefined;

    const targets = rootEl.querySelectorAll(".hm-rv");

    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("hm-in"));
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hm-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return rootRef;
}
