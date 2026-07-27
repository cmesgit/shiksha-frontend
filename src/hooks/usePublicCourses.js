// PLACEMENT: src/hooks/usePublicCourses.js
//
// Data-layer for the real (backend-driven) Courses.jsx catalog. Replaces the
// old hardcoded CLASSES array / courseData.js lookup — everything downstream
// (ClassCourseTile, handleEnrollNow, handleClassSelect) keeps reading the
// same field names, so only this layer needed to change.

import { useEffect, useState } from "react";
import { getPublicBoards, getPublicCatalog } from "../api/coursesApi";

const STREAM_LABELS = { SCIENCE: "Science", COMMERCE: "Commerce", ARTS: "Arts" };

// "Class 11 (Science)" -> { title: "Class 11", subtitle: "Science" }
function splitTitle(title, streamName) {
  const stripped = (title || "").replace(/\s*\([^)]*\)\s*$/, "").trim();
  const subtitle = streamName ? STREAM_LABELS[streamName] || streamName : undefined;
  return { title: stripped || title, subtitle };
}

function formatFee(pricePaise) {
  if (pricePaise == null) return "—";
  return Math.round(pricePaise / 100).toLocaleString("en-IN");
}

/** Live board rows from the real backend (id/name/board_type/
 * has_published_courses). `null` while the first request is in flight. */
export function usePublicBoards() {
  const [boards, setBoards] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getPublicBoards().then((rows) => {
      if (!cancelled) setBoards(rows);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return boards;
}

/** Whether a board (matched by display title, e.g. "CBSE") should render as
 * locked/"Coming Soon". Trusts the static fallback while boards are still
 * loading, so CBSE/MBSE don't flash locked before the first request resolves. */
export function isBoardLocked(boards, boardTitle, fallbackLocked) {
  if (!boards) return fallbackLocked;
  const match = boards.find((b) => b.name.toLowerCase() === (boardTitle || "").toLowerCase());
  return !match || !match.has_published_courses;
}

/** Real courses for one selected board slug (e.g. "cbse"), shaped as a
 * drop-in replacement for the old CLASSES array. Empty until `boards` has
 * loaded and the slug resolves to a real board. */
export function useBoardClasses(boards, boardSlug) {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const board =
      boards && boardSlug
        ? boards.find((b) => b.name.toLowerCase() === boardSlug.toLowerCase())
        : null;

    let cancelled = false;
    setLoading(true);
    // getPublicCatalog resolves to [] for a missing/unmatched board id, so no
    // separate synchronous early-return branch is needed here.
    getPublicCatalog(board?.id).then((rows) => {
      if (cancelled) return;
      setClasses(
        rows.map((c) => {
          const { title, subtitle } = splitTitle(c.title, c.stream_name);
          return {
            id: c.id,
            title,
            subtitle,
            desc: c.description,
            image: c.thumbnail || null,
            duration: c.duration_weeks ? `${c.duration_weeks} Weeks` : "1 Year",
            fee: formatFee(c.price),
            access: "Full Course Access",
            mode: "Online",
            // Wrapped under the current board slug so the existing
            // `cls.courseIds?.[selectedBoard]` lookups keep working unchanged.
            courseIds: { [boardSlug]: c.id },
          };
        })
      );
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [boards, boardSlug]);

  return { classes, loading };
}
