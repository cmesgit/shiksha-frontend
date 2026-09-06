/**
 * shiksha-frontend/src/api/quizHub.js
 *
 * The public Quiz Hub's data layer (design_handoff_public_quiz_hub Phase 7).
 *
 * ── Why plain fetch and not `apiClient` ─────────────────────────────────────
 * Same reasoning as `publicConfig.js`: that axios instance carries a 401
 * interceptor which fires `refreshSession()` and can redirect to login. On a
 * page whose entire point is that it works signed out, a stale refresh cookie
 * would bounce a guest off the marketing site mid-quiz.
 *
 * ── ...but WITH credentials, unlike publicConfig ────────────────────────────
 * `credentials: "include"` rather than `"omit"`, because the attempt
 * endpoints record `account` when the caller is signed in, and that is the
 * only thing that gives the Phase 8 panels any history to show. Sending no
 * cookies would file every attempt as anonymous, including a logged-in
 * learner's.
 *
 * That is safe because `CookieJWTAuthentication` returns anonymous — rather
 * than raising — for a malformed, expired or revoked token. A visitor holding
 * a stale cookie is treated as a guest instead of getting a 401 on a public
 * endpoint.
 *
 * ── The normalisers at the bottom are load-bearing ──────────────────────────
 * The page was ported from a design whose fixtures used `{q, o[], a, e, t}`
 * per question. Rather than rewrite ~1,200 lines of JSX to speak the API's
 * shape, the server payload is mapped INTO that shape here. `a` (the correct
 * index) and `e` (the explanation) stay null until the attempt is submitted,
 * because the server does not send them before then — which is exactly the
 * property that keeps the answer key off the wire mid-attempt.
 */
import { API_URL } from "../config/urls";

const BASE = `${API_URL}/quizzes/public`;

export class QuizHubError extends Error {
  constructor(message, status, body) {
    super(message);
    this.name = "QuizHubError";
    this.status = status;
    this.body = body;
  }
}

/* The server writes readable refusals — "This set has no questions ready
   yet.", "This attempt has already been submitted." — and they are better
   than anything this layer could invent, so they are surfaced verbatim. */
function readDetail(payload, status) {
  if (payload && typeof payload.detail === "string") return payload.detail;
  if (status === 429) {
    return "You have started a lot of quizzes recently. Please try again in a little while.";
  }
  if (status === 503) return "The Quiz Hub is not available right now.";
  return "Something went wrong. Please try again.";
}

async function request(path, { method = "GET", body, signal } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    payload = null; /* 204, or an HTML error page from a proxy */
  }

  if (!res.ok) throw new QuizHubError(readDetail(payload, res.status), res.status, payload);
  return payload;
}

function qs(params) {
  const search = new URLSearchParams();
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "" && v !== "all") search.set(k, v);
  });
  const str = search.toString();
  return str ? `?${str}` : "";
}

/* ==========================================================================
   Reads
   ========================================================================== */

/** Subject tiles + exam chips + the hero's counts. */
export function getRails(signal) {
  return request("/rails/", { signal });
}

/**
 * One page of practice sets.
 *
 * Sort and search are passed THROUGH to the server rather than applied here:
 * the list is paginated, so doing either in the browser would silently apply
 * it to the loaded page only.
 */
export function getSets({ subject, exam, difficulty, q, ordering, page } = {}, signal) {
  return request(`/sets/${qs({ subject, exam, difficulty, q, ordering, page })}`, { signal });
}

export function getSet(slug, signal) {
  return request(`/sets/${encodeURIComponent(slug)}/`, { signal });
}

/* ==========================================================================
   Attempts
   ========================================================================== */

/**
 * Start an attempt. POST because it SNAPSHOTS the paper server-side — a set's
 * membership is a live query and drifts as curation lands, so the questions
 * returned here are the ones that will be graded and reviewed, whatever the
 * set resolves to later.
 */
export function startAttempt(slug) {
  return request(`/sets/${encodeURIComponent(slug)}/attempts/`, { method: "POST" });
}

export function submitAttempt(attemptId, answers) {
  return request(`/attempts/${attemptId}/submit/`, { method: "POST", body: { answers } });
}

export function getAttemptReview(attemptId, signal) {
  return request(`/attempts/${attemptId}/`, { signal });
}

/**
 * The signed-in panels. Resolves to `null` for a guest instead of throwing —
 * "not signed in" is the normal case on a public page, not an error, and the
 * caller renders nothing rather than an error state.
 */
export async function getPersonalSummary(signal) {
  try {
    return await request("/me/summary/", { signal });
  } catch (err) {
    if (err instanceof QuizHubError && (err.status === 401 || err.status === 403)) return null;
    throw err;
  }
}

/* ==========================================================================
   Normalisers — server shape → the shape the page's JSX already speaks
   ========================================================================== */

const DIFF_LABEL = { easy: "Easy", medium: "Medium", hard: "Hard" };

/** `""` is a real value on a set — "any difficulty" — not a missing one. */
export function difficultyLabel(value) {
  return DIFF_LABEL[value] || "Mixed";
}

export function normalizeSet(card) {
  return {
    /* The slug IS the id everywhere on this page: it is what the API is keyed
       on and what a shared URL carries. */
    id: card.slug,
    slug: card.slug,
    title: card.title,
    desc: card.description || "",
    subject: card.subject_slug,
    subjectName: card.subject,
    diff: difficultyLabel(card.difficulty),
    mins: card.minutes,
    /* Submitted attempts only — a row exists from the moment someone opens a
       set, and counting those would advertise attempts people bounced off. */
    attempts: card.attempt_count ?? 0,
    exams: card.exam ? [card.exam] : [],
    /* What the set can actually serve today, not the target it was authored
       with. Advertising 10 and serving 3 is the lie this field prevents. */
    count: card.question_count ?? 0,
    createdAt: card.created_at || null,
    questions: [],
  };
}

export function normalizeQuestion(q) {
  const choices = q.choices || [];
  return {
    id: q.id,
    q: q.text,
    o: choices.map((c) => c.text),
    /* Kept so the submitted payload can name choices by id. Grading is by id
       server-side, scoped to the question's own choices. */
    choiceIds: choices.map((c) => c.id),
    /* Empty string, NOT a "General" placeholder. Most of the bank has no
       topic — the importer refuses the source's mangled topic headings — and
       inventing one produces a "breakdown" with a single meaningless row and
       the sentence "Weakest topic: General. Strongest: General." The review
       screen checks for real topics and drops those panels instead. */
    t: q.topic || "",
    /* Unknown until the attempt is submitted. The public serializer omits
       both, which is what keeps the answer key off the wire mid-attempt. */
    a: null,
    e: null,
  };
}

/**
 * Fold a submitted attempt's review back onto the questions as they were
 * served, filling in `a` and `e`.
 *
 * Matches on CHOICE ID, never on position: the review re-serializes the
 * question's choices and nothing guarantees the same ordering, so comparing
 * indices could mark the wrong option as correct.
 */
export function applyReview(questions, review) {
  const byId = new Map((review?.answers || []).map((row) => [String(row.question_id), row]));
  return questions.map((question) => {
    const row = byId.get(String(question.id));
    if (!row) return question;
    const index = question.choiceIds.findIndex(
      (id) => String(id) === String(row.correct_choice_id)
    );
    return {
      ...question,
      a: index >= 0 ? index : null,
      e: row.explanation || "",
    };
  });
}

/** The player's local answer indices → the payload the submit endpoint wants. */
export function buildAnswerPayload(questions, answers) {
  return questions.map((question, i) => {
    const picked = answers[i];
    return {
      question: question.id,
      choice:
        picked === null || picked === undefined ? null : question.choiceIds[picked] ?? null,
    };
  });
}

/**
 * A submitted attempt's review → the player state the review screen renders.
 * Used by "Review" in Recently Attempted, which opens a real past attempt
 * rather than the fabricated one the fixture had to build.
 */
export function playerFromReview(review, setCard) {
  const questions = (review.answers || []).map((row) => ({
    id: row.question_id,
    q: row.text,
    o: (row.choices || []).map((c) => c.text),
    choiceIds: (row.choices || []).map((c) => c.id),
    t: row.topic || "",
    a: (row.choices || []).findIndex(
      (c) => String(c.id) === String(row.correct_choice_id)
    ),
    e: row.explanation || "",
  }));

  /* `was_blank` is the only safe test for "left unanswered". A null choice
     alone also matches an answer whose option an admin later edited away —
     that learner DID answer, and showing it as skipped would misreport what
     they did. */
  const answers = (review.answers || []).map((row, i) => {
    if (row.was_blank) return null;
    const index = questions[i].choiceIds.findIndex(
      (id) => String(id) === String(row.selected_choice_id)
    );
    return index >= 0 ? index : null;
  });

  const minutes = setCard?.mins ?? 10;
  return {
    quiz: {
      ...(setCard || {}),
      id: review.set_slug,
      slug: review.set_slug,
      title: review.set_title,
      mins: minutes,
      count: questions.length,
      questions,
    },
    i: 0,
    answers,
    marked: questions.map(() => false),
    seen: questions.map(() => true),
    left: 0,
    submitted: true,
    attemptId: review.id,
    reviewOnly: true,
  };
}
