// PLACEMENT: src/hooks/usePublicCourses.js
//
// Data-layer for the real (backend-driven) Courses.jsx / UnifiedCatalog
// catalog. Everything downstream (ClassRow, handleEnrollNow, handleSyllabus)
// reads the same field names this layer produces.

import { useEffect, useState } from "react";
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
    // A zero price is a real state, not missing data: the platform runs free at
    // launch, so `price = 0` is the honest answer and the card has to say "Free"
    // rather than "₹0 /month" — which is what all 18 live cards rendered.
    //
    // Deliberately a separate flag from `isFree` below. That one is the
    // platform-wide free-launch MODE (GlobalSettings.effective_mode); this is
    // "this course costs nothing", which is the condition the homepage's
    // featured endpoint already keys on (`"Free" if not detail_course.price`,
    // courses/views.py). Keying on the same thing is what stops the two
    // surfaces from disagreeing about the same course.
    //
    // Not derived from `fee`, which is a preformatted display string ("—" when
    // the price is null) and would make "unpriced" and "free" indistinguishable.
    isZeroPrice: c.price === 0,
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
  const [matches, setMatches] = useState([]);
  const trimmed = query.trim();

  useEffect(() => {
    if (!trimmed || !boards) {
      setMatches([]);
      return undefined;
    }

    let cancelled = false;

    // ONE filtered request, not one full catalog per board. This used to fetch
    // every other unlocked board's ENTIRE catalog into a client-side cache and
    // filter it in the browser — work that grows with the number of boards
    // times the courses in each, for a list that only ever shows a handful of
    // matches. `board` is an independent filter on the endpoint, so a q-only
    // call already searches across every board server-side.
    //
    // It also searches `description`, which the old client-side pass could not:
    // it compared against the `title (subtitle)` label alone. The stream still
    // matches because the raw Course.title carries it — "Class 11 (Science)" —
    // and splitTitle only strips it for display.
    //
    // Debounced because this is now a network call per keystroke rather than a
    // filter over a warm cache.
    const timer = setTimeout(() => {
      getPublicCatalog({ q: trimmed }).then((rows) => {
        if (cancelled) return;
        const boardById = new Map(boards.map((b) => [b.id, b]));
        const out = [];
        rows.forEach((c) => {
          // Competitive courses have board = NULL and are not part of the
          // "also matches in other boards" list by definition.
          const b = c.board ? boardById.get(c.board.id) : null;
          if (!b || b.slug === excludeSlug || !b.has_published_courses) return;
          const cls = shapeClass(c, b.slug);
          const label = `${cls.title}${cls.subtitle ? ` (${cls.subtitle})` : ""}`;
          out.push({ board: b, cls, label: `${label} — ${b.name}` });
        });
        setMatches(out);
      });
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [boards, trimmed, excludeSlug]);

  return matches;
}
