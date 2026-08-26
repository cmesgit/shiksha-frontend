// PLACEMENT: src/hooks/usePublicCourses.js
//
// Data-layer for the real (backend-driven) Courses.jsx / UnifiedCatalog
// catalog. Everything downstream (ClassRow, handleEnrollNow, handleSyllabus)
// reads the same field names this layer produces.

import { useEffect, useRef, useState } from "react";
import { getPublicBoards, getPublicCatalog } from "../api/coursesApi";

const STREAM_LABELS = { SCIENCE: "Science", COMMERCE: "Commerce", ARTS: "Arts" };

// "Class 11 (Science)" -> { title: "Class 11", subtitle: "Science" }
function splitTitle(title, streamName) {
  const stripped = (title || "").replace(/\s*\([^)]*\)\s*$/, "").trim();
  // Course records have inconsistently formatted "Class N" titles ("Class -11",
  // "Class- 11", "Class 11", ...) — collapse them to one canonical spelling so
  // callers that dedupe/group on `title` (e.g. the catalog's Class filter chips)
  // don't split a single class into multiple entries.
  const normalized = stripped.replace(/^class\s*-?\s*(\d+)\s*-?\s*$/i, "Class $1");
  const subtitle = streamName ? STREAM_LABELS[streamName] || streamName : undefined;
  return { title: normalized || title, subtitle };
}

function formatFee(pricePaise) {
  if (pricePaise == null) return "—";
  return Math.round(pricePaise / 100).toLocaleString("en-IN");
}

// Shared row shape for both useBoardClasses and useCrossBoardMatches, so a
// class fetched for the "also matches in other boards" list looks identical
// to one fetched for the selected board's own list.
function shapeClass(c, boardSlug) {
  const { title, subtitle } = splitTitle(c.title, c.stream_name);
  return {
    id: c.id,
    title,
    subtitle,
    desc: c.description,
    image: c.thumbnail || null,
    duration: c.duration_weeks ? `${c.duration_weeks} Weeks` : "1 Year",
    fee: formatFee(c.price),
    // mrp/discountLabel/badge are real, admin-CMS-editable Course fields
    // that already exist on the backend (Courses.jsx's admin CMS work) but
    // were never surfaced here — null/"" when unset, same "nothing to
    // show" convention as `image`.
    mrp: c.mrp != null ? formatFee(c.mrp) : null,
    discountLabel: c.discount_label || "",
    badge: c.badge || "",
    isComingSoon: !!c.is_coming_soon,
    isFree: !!c.is_free,
    subjectCount: c.subject_count ?? null,
    classLevel: c.class_level ?? null,
    access: "Full Course Access",
    mode: "Online",
    // null = uncapped/no active batch; the class row hides the
    // "seats left" text in that case rather than showing a bogus 0.
    seatsLeft: c.seats_left ?? null,
    slug: c.slug,
    // Per-course board. The card used to read the board name off the single
    // `currentBoard` prop, which is correct only while exactly one board is
    // selected — in the new "All boards" mode every card would otherwise be
    // labelled with the same board. Null for competitive courses.
    boardName: c.board?.name || null,
    // What tells a competitive course apart from an academic one. Both are
    // carried because they can disagree: `kind` is written on create and read
    // by nothing else, while every live surface keys on a linked category
    // whose group is "competitive". A COACHING course with no category link
    // is invisible to the nav menu, and this is where a client can see that.
    kind: c.kind || null,
    categoryGroups: Array.isArray(c.category_groups) ? c.category_groups : [],
    // Wrapped under the current board slug so the existing
    // `cls.courseIds?.[selectedBoard]` lookups keep working unchanged.
    // Competitive rows have no board, so they are filed under a sentinel the
    // catalog passes as its "selected board" in that mode.
    courseIds: { [boardSlug]: c.id },
  };
}

/** Sentinel board slug for the board-less competitive axis. Not a real board
 *  — it exists so `courseIds[selectedBoard]` and the enrollment lookup keep
 *  working unchanged when no board is selected. */
export const COMPETITIVE_KEY = "__competitive__";

/** Sentinel for "every board", the option the board filter never had. */
export const ALL_BOARDS_KEY = "__all__";

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

/** Whether a board (matched by slug, e.g. "cbse") should render as
 * locked/"Coming Soon". Trusts the static fallback while boards are still
 * loading, so CBSE/MBSE don't flash locked before the first request resolves.
 * Matched by slug, not display name — a name like "BSE Odisha" never matches
 * its own slug ("bseodisha") under a naive case-insensitive string compare. */
export function isBoardLocked(boards, boardSlug, fallbackLocked) {
  if (!boards) return fallbackLocked;
  const match = boards.find((b) => b.slug === boardSlug);
  return !match || !match.has_published_courses;
}

/** Real courses for one selected board slug (e.g. "cbse"), shaped as a
 * drop-in replacement for the old CLASSES array. Empty until `boards` has
 * loaded and the slug resolves to a real board. */
export function useBoardClasses(boards, boardSlug) {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    // Three fetch shapes, one hook, because everything downstream reads the
    // same shaped rows regardless of which axis produced them.
    let query;
    if (boardSlug === COMPETITIVE_KEY) {
      // Board-less on purpose: competitive courses have board = NULL, so any
      // board filter excludes them.
      query = { group: "competitive" };
    } else if (boardSlug === ALL_BOARDS_KEY) {
      // Every school course across every board. Filtered on `kind` rather
      // than "no board filter" so competitive rows don't leak into the School
      // axis — the two axes must stay disjoint or a course appears twice.
      query = { kind: "ACADEMIC" };
    } else {
      const board =
        boards && boardSlug ? boards.find((b) => b.slug === boardSlug) : null;
      // getPublicCatalog resolves to [] for a missing/unmatched board id, so
      // no separate synchronous early-return branch is needed here.
      query = board?.id || null;
    }

    getPublicCatalog(query).then((rows) => {
      if (cancelled) return;
      setClasses(rows.map((c) => shapeClass(c, boardSlug)));
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [boards, boardSlug]);

  return { classes, loading };
}

/** Lazily fetches each *other* unlocked board's catalog (once query is
 * non-empty) and returns classes across those boards whose title/subtitle
 * matches `query` — powers the unified catalog's "Also matches in other
 * boards" list. Each board's catalog is cached for the lifetime of the hook
 * (a ref, not state) so re-typing the same query never refetches; `boards`
 * itself never changes shape often enough to need cache invalidation. */
export function useCrossBoardMatches(boards, query, excludeSlug) {
  const cacheRef = useRef({});
  const [, bumpRender] = useState(0);
  const trimmed = query.trim();

  useEffect(() => {
    if (!trimmed || !boards) return;
    let cancelled = false;
    const targets = boards.filter(
      (b) => b.slug !== excludeSlug && b.has_published_courses && !(b.slug in cacheRef.current)
    );
    targets.forEach((b) => {
      cacheRef.current[b.slug] = null; // mark in-flight so a second render doesn't re-fetch
      getPublicCatalog(b.id).then((rows) => {
        if (cancelled) return;
        cacheRef.current[b.slug] = rows.map((c) => shapeClass(c, b.slug));
        bumpRender((n) => n + 1);
      });
    });
    return () => {
      cancelled = true;
    };
  }, [boards, trimmed, excludeSlug]);

  if (!trimmed || !boards) return [];

  const q = trimmed.toLowerCase();
  const matches = [];
  boards.forEach((b) => {
    if (b.slug === excludeSlug || !b.has_published_courses) return;
    const classes = cacheRef.current[b.slug];
    if (!classes) return; // not fetched yet (or in flight)
    classes.forEach((cls) => {
      const label = `${cls.title}${cls.subtitle ? ` (${cls.subtitle})` : ""}`;
      if (label.toLowerCase().includes(q)) {
        matches.push({ board: b, cls, label: `${label} — ${b.name}` });
      }
    });
  });
  return matches;
}
