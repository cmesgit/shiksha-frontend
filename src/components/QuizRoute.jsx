/**
 * QuizRoute.jsx — decides what /quiz renders.
 *
 * The Quiz Hub ships behind `public_quiz_hub_enabled` so it can be turned on
 * without a deploy once the question bank has enough content behind it. While
 * the flag is off, the existing "coming soon" placeholder is what a visitor
 * sees, byte for byte as before.
 *
 * WHY A THIRD COMPONENT rather than a conditional inside QuizMockTest: both
 * pages are lazy chunks, and the point of the split is that a visitor who
 * gets the placeholder never downloads the ~200KB hub bundle. Branching
 * inside either page would defeat that by pulling both into one chunk.
 *
 * THE FLASH IS DELIBERATE, AND SO IS ITS DIRECTION. The flag arrives over the
 * network, so there is a moment where neither page can be drawn. Rendering
 * nothing for that moment is correct; rendering the placeholder optimistically
 * would show "coming soon" to every visitor for a beat AFTER the feature had
 * launched, which is the more embarrassing of the two failures. The gap is one
 * request against an unauthenticated, cacheable endpoint.
 */
import { Suspense, lazy, useEffect, useState } from "react";
import { getPublicConfig } from "../api/publicConfig";

const QuizHub = lazy(() => import("./QuizHub"));
const QuizMockTest = lazy(() => import("./QuizMockTest"));

export default function QuizRoute() {
  const [enabled, setEnabled] = useState(null); // null = not yet known

  useEffect(() => {
    let alive = true;
    getPublicConfig().then((cfg) => {
      if (alive) setEnabled(Boolean(cfg.public_quiz_hub_enabled));
    });
    return () => {
      alive = false;
    };
  }, []);

  if (enabled === null) return null;

  return (
    <Suspense fallback={null}>
      {enabled ? <QuizHub /> : <QuizMockTest />}
    </Suspense>
  );
}
