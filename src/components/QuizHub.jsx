import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useAuth } from "../contexts/AuthContext";
import {
  applyReview,
  buildAnswerPayload,
  difficultyLabel,
  getAttemptReview,
  getPersonalSummary,
  getRails,
  getSet,
  getSets,
  normalizeQuestion,
  normalizeSet,
  playerFromReview,
  startAttempt,
  submitAttempt,
} from "../api/quizHub";

/**
 * ShikshaCom — Quiz Hub page (self-contained).
 *
 * A React port of ShikshaCom_Quiz_Hub.html, wired to the live API
 * (design_handoff_public_quiz_hub Phases 7 + 8). The scoped stylesheet, the
 * Poppins webfont, the icon sprite and every behaviour live in this single
 * file, so it needs no extra CSS, assets or dependencies.
 *
 * Every rule is scoped under `.quiz-page`, so the global header, footer and
 * navigation are untouched, and Tailwind / Elementor widgets are unaffected.
 *
 * ── WHERE THE DATA COMES FROM ─────────────────────────────────────────────
 * `src/api/quizHub.js`. The design's fixtures (`SUBJECTS`, `BANK`, `QUIZZES`,
 * `ATTEMPTS`, `RECS`, `CHART_DATA`) are GONE, not defaulted — the API layer
 * maps the server payload into the per-question shape this file's JSX already
 * spoke, so the markup below is the design's, unchanged.
 *
 * ── TWO PROPERTIES THAT ARE EASY TO BREAK ─────────────────────────────────
 * 1. THE ANSWER KEY IS NOT ON THE WIRE MID-ATTEMPT. A question's `a` (correct
 *    index) and `e` (explanation) are null until the attempt is submitted,
 *    because the public serializer omits them. They are filled from the
 *    submit response. Do not "simplify" by grading in the browser — there is
 *    nothing to grade against, by design.
 * 2. THE SIGNED-IN PANELS ARE HIDDEN FOR GUESTS, NEVER FAKED. Sections 6, 7
 *    and 8 render only with a summary from the server. There is no zeroed
 *    placeholder variant, and there must not be one.
 *
 * Filtering, search, sorting and paging are all SERVER-side: the set list is
 * paginated, so doing any of them here would silently apply to the loaded
 * page only.
 */

/* ==========================================================================
   Scoped stylesheet — lifted verbatim from the original page.
   ========================================================================== */
const QUIZ_PAGE_CSS = `
/* ============================================================================
   SHIKSHACOM — QUIZ HUB
   Everything is scoped under .quiz-page and uses qz-* class names so it can
   never affect the global header, footer, navigation or other WordPress /
   Elementor widgets. Design tokens inherited from the Home, Courses and
   About pages (emerald #0F9D6B family, Poppins, 1180px wrap, pill buttons).
   ============================================================================ */

.quiz-page{
  --qz-emerald:#0F9D6B;
  --qz-emerald-dark:#0B5B3E;
  --qz-emerald-soft:#E7F6EE;
  --qz-ink:#0B2E20;
  --qz-ink-2:#2B4237;
  --qz-body:#5E7469;
  --qz-peach:#F6FAF7;
  --qz-line:#EDF3EE;
  --qz-line-2:#DFEAE3;
  --qz-white:#fff;

  --qz-violet:#7C5CFC;
  --qz-blue:#3b82f6;
  --qz-red:#E14D2A;
  --qz-gold:#FFB21D;
  --qz-teal:#12b3a6;
  --qz-pink:#ec4e86;

  --qz-font:'Poppins', system-ui, -apple-system, sans-serif;

  --qz-sh-sm:0 6px 22px rgba(11,46,32,.06);
  --qz-sh:0 18px 46px rgba(11,91,62,.12);
  --qz-sh-lg:0 30px 70px rgba(11,46,32,.14);

  /* recommendation-cover treatment — tune these three in one place */
  --qz-cover-blur:6px;        /* higher = softer. 4px reads sharp, 12px reads abstract */
  --qz-cover-tint:.13;        /* strength of the subject-colour wash over the photo */
  --qz-cover-veil:.66;        /* white fade at the bottom, keeps the pill legible */

  /* question-status palette used by the navigator + review */
  --qz-st-answered:#0F9D6B;
  --qz-st-review:#7C5CFC;
  --qz-st-skipped:#F0A202;
  --qz-st-wrong:#E14D2A;

  font-family:var(--qz-font);
  color:var(--qz-ink);
  line-height:1.65;
  -webkit-font-smoothing:antialiased;
  text-rendering:optimizeLegibility;
  background:#fff;
  overflow-x:clip;
}
.quiz-page *,
.quiz-page *::before,
.quiz-page *::after{box-sizing:border-box}

.quiz-page h1,
.quiz-page h2,
.quiz-page h3,
.quiz-page h4{font-family:var(--qz-font);color:var(--qz-ink);margin:0;line-height:1.16;font-weight:700;letter-spacing:-.015em}
.quiz-page p{margin:0}
.quiz-page a{color:inherit;text-decoration:none}
.quiz-page svg{display:block}
.quiz-page ::selection{background:var(--qz-emerald);color:#fff}
.quiz-page button{font-family:inherit}

.quiz-page .qz-wrap{max-width:1180px;margin:0 auto;padding:0 24px}
.quiz-page .qz-sec{position:relative;padding:clamp(56px,7.5vw,100px) 0}
.quiz-page .qz-soft{background:var(--qz-peach)}

/* faint grid texture — the quiz-hub signature backdrop */
.quiz-page .qz-grid-bg{position:absolute;inset:0;pointer-events:none;z-index:0;
  background-image:linear-gradient(rgba(11,46,32,.035) 1px,transparent 1px),
                   linear-gradient(90deg,rgba(11,46,32,.035) 1px,transparent 1px);
  background-size:46px 46px;
  -webkit-mask-image:radial-gradient(120% 80% at 50% 0,#000 35%,transparent 100%);
          mask-image:radial-gradient(120% 80% at 50% 0,#000 35%,transparent 100%)}

.quiz-page .qz-eyebrow{display:inline-flex;font-weight:700;font-size:12.5px;
  letter-spacing:.16em;text-transform:uppercase;color:var(--qz-emerald);margin:0 0 16px}
.quiz-page .qz-eyebrow u{text-decoration:none;border-bottom:2px solid var(--qz-emerald);padding-bottom:5px}

.quiz-page .qz-head{max-width:640px;margin:0 auto clamp(34px,4.4vw,48px);text-align:center}
.quiz-page .qz-head .qz-eyebrow{margin-left:auto;margin-right:auto}
.quiz-page .qz-head h2{font-size:clamp(28px,4.1vw,42px);font-weight:700}
.quiz-page .qz-head p{margin-top:14px;color:var(--qz-body);font-size:15.5px}
.quiz-page .qz-head.qz-left{margin-left:0;text-align:left}
.quiz-page .qz-em{color:var(--qz-emerald)}

/* ---- buttons (identical geometry to Home / Courses / About) --------------- */
.quiz-page .qz-btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;font-weight:700;
  font-size:14.5px;padding:13px 26px;border-radius:999px;border:2px solid transparent;cursor:pointer;
  transition:transform .2s,box-shadow .2s,background .2s,color .2s,border-color .2s;text-align:center}
.quiz-page .qz-btn svg{width:16px;height:16px;transition:transform .2s;flex:none}
.quiz-page .qz-btn:hover svg{transform:translateX(3px)}
.quiz-page .qz-btn--solid{background:var(--qz-emerald);color:#fff;box-shadow:0 12px 26px rgba(15,157,107,.32)}
.quiz-page .qz-btn--solid:hover{background:var(--qz-emerald-dark);transform:translateY(-2px);box-shadow:0 16px 32px rgba(15,157,107,.4)}
.quiz-page .qz-btn--ghost{background:#fff;color:var(--qz-emerald);border-color:var(--qz-emerald)}
.quiz-page .qz-btn--ghost:hover{background:var(--qz-emerald);color:#fff;transform:translateY(-2px)}
.quiz-page .qz-btn--white{background:#fff;color:var(--qz-emerald-dark)}
.quiz-page .qz-btn--white:hover{transform:translateY(-2px);box-shadow:0 16px 32px rgba(0,0,0,.16)}
.quiz-page .qz-btn--outline{background:transparent;color:#fff;border-color:rgba(255,255,255,.6)}
.quiz-page .qz-btn--outline:hover{background:rgba(255,255,255,.14);transform:translateY(-2px)}
.quiz-page .qz-btn--quiet{background:var(--qz-peach);color:var(--qz-ink-2);border-color:var(--qz-line)}
.quiz-page .qz-btn--quiet:hover{background:var(--qz-emerald-soft);color:var(--qz-emerald-dark);border-color:var(--qz-emerald-soft);transform:translateY(-2px)}
.quiz-page .qz-btn--sm{padding:10px 18px;font-size:13.2px}
.quiz-page .qz-btn:focus-visible{outline:3px solid var(--qz-emerald);outline-offset:3px}
.quiz-page .qz-btn:disabled{opacity:.45;cursor:not-allowed;transform:none!important;box-shadow:none!important}

/* scroll reveal */
.quiz-page .qz-rv{opacity:0;transform:translateY(24px);
  transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1)}
.quiz-page .qz-rv.in{opacity:1;transform:none}
.quiz-page .qz-rv.qz-d1{transition-delay:.08s}
.quiz-page .qz-rv.qz-d2{transition-delay:.16s}
.quiz-page .qz-rv.qz-d3{transition-delay:.24s}
.quiz-page .qz-rv.qz-d4{transition-delay:.32s}

/* difficulty tag — one shared component so it reads the same everywhere */
.quiz-page .qz-diff{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;font-weight:700;
  letter-spacing:.03em;padding:5px 11px;border-radius:999px;line-height:1.4}
.quiz-page .qz-diff i{width:6px;height:6px;border-radius:50%;background:currentColor;flex:none}
.quiz-page .qz-diff[data-d="Easy"]{background:var(--qz-emerald-soft);color:#0B7A52}
.quiz-page .qz-diff[data-d="Medium"]{background:#FFF4DC;color:#A9700A}
.quiz-page .qz-diff[data-d="Hard"]{background:#FDEBE5;color:#B93D1B}

/* ============================================================================
   1 · HERO
   ============================================================================ */
.quiz-page .qz-hero{position:relative;overflow:hidden;overflow:clip;padding:clamp(46px,6vw,84px) 0 clamp(34px,4.4vw,60px);
  background:radial-gradient(900px 540px at 86% -14%,var(--qz-emerald-soft) 0%,rgba(231,246,238,0) 62%),
             linear-gradient(180deg,#F8FCFA 0%,#fff 64%)}
.quiz-page .qz-hero-grid{position:relative;z-index:1;display:grid;grid-template-columns:1.02fr 1fr;
  gap:clamp(30px,4.5vw,64px);align-items:center}

.quiz-page .qz-badge{display:inline-flex;align-items:center;gap:9px;background:var(--qz-emerald-soft);
  color:var(--qz-emerald-dark);border:1px solid rgba(15,157,107,.2);font-size:12.5px;font-weight:700;
  letter-spacing:.16em;text-transform:uppercase;padding:8px 16px 8px 12px;border-radius:999px}
.quiz-page .qz-badge i{width:7px;height:7px;border-radius:50%;background:var(--qz-emerald);
  box-shadow:0 0 0 4px rgba(15,157,107,.18);flex:none;animation:qz-pulse 2.4s infinite}
.quiz-page .qz-hero h1{margin-top:20px;font-size:clamp(33px,4.7vw,54px);font-weight:800;
  letter-spacing:-.022em;line-height:1.1}
.quiz-page .qz-hero-sub{margin-top:20px;max-width:34em;color:var(--qz-body);font-size:clamp(15px,1.1vw,16.5px)}
.quiz-page .qz-hero-cta{display:flex;flex-wrap:wrap;gap:13px;margin-top:32px}

.quiz-page .qz-trust{display:flex;flex-wrap:wrap;gap:10px 26px;margin-top:34px;padding-top:26px;
  border-top:1px dashed var(--qz-line-2)}
.quiz-page .qz-trust div{display:flex;align-items:center;gap:9px}
.quiz-page .qz-trust svg{width:17px;height:17px;color:var(--qz-emerald);flex:none}
.quiz-page .qz-trust b{font-weight:700;font-size:14px;color:var(--qz-ink)}
.quiz-page .qz-trust span{font-size:13px;color:var(--qz-body)}

/* --- hero visual: live assessment console --------------------------------- */
.quiz-page .qz-vis{position:relative;display:grid;place-items:center;min-height:470px;min-width:0;
  padding:26px 74px 30px;overflow:visible}
.quiz-page .qz-vis-disc{position:absolute;width:min(400px,78%);aspect-ratio:1;border-radius:50%;
  background:radial-gradient(circle at 50% 42%,var(--qz-emerald-soft),rgba(246,250,247,0) 72%)}
.quiz-page .qz-vis-disc::before{content:"";position:absolute;inset:4%;border-radius:50%;
  border:2px dashed rgba(15,157,107,.26)}

/* the illustration sits on the brand disc, exactly like the Home / About heroes */
.quiz-page .qz-hero-art{position:relative;z-index:3;width:min(430px,92%);margin-inline:auto}
.quiz-page .qz-hero-illus{width:100%;height:auto;display:block;
  filter:drop-shadow(0 18px 30px rgba(11,46,32,.13))}

/* floating satellites — kept inside the visual's own box so they never clip */
.quiz-page .qz-sat{position:absolute;z-index:4;background:#fff;border:1px solid var(--qz-line);
  border-radius:16px;box-shadow:var(--qz-sh-lg);padding:11px 14px;animation:qz-bob 5.6s ease-in-out infinite}
.quiz-page .qz-sat b{display:block;font-weight:700;font-size:14px;line-height:1.2;color:var(--qz-ink)}
.quiz-page .qz-sat span{display:block;font-size:10.5px;color:var(--qz-body);letter-spacing:.02em;line-height:1.4}
.quiz-page .qz-sat-ic{width:34px;height:34px;border-radius:11px;display:grid;place-items:center;
  background:var(--qz-emerald);flex:none}
.quiz-page .qz-sat-ic svg{width:17px;height:17px;color:#fff}

.quiz-page .qz-sat--ring{display:flex;align-items:center;gap:11px;top:4%;left:0;animation-delay:0s}
.quiz-page .qz-ring{position:relative;width:46px;height:46px;flex:none}
.quiz-page .qz-ring svg{width:46px;height:46px;transform:rotate(-90deg)}
.quiz-page .qz-ring circle{fill:none;stroke-width:5;stroke-linecap:round}
.quiz-page .qz-ring .qz-ring-bg{stroke:var(--qz-line)}
.quiz-page .qz-ring .qz-ring-fg{stroke:var(--qz-emerald);stroke-dasharray:113;stroke-dashoffset:113;
  transition:stroke-dashoffset 1.4s cubic-bezier(.2,.7,.2,1)}
.quiz-page .qz-ring em{position:absolute;inset:0;display:grid;place-items:center;font-style:normal;
  font-size:11.5px;font-weight:800;color:var(--qz-ink)}

.quiz-page .qz-sat--timer{display:flex;align-items:center;gap:10px;bottom:12%;left:0;animation-delay:1.4s}
.quiz-page .qz-sat--timer b{font-size:15px;font-variant-numeric:tabular-nums}

.quiz-page .qz-sat--score{top:26%;right:0;animation-delay:.8s;text-align:right}
.quiz-page .qz-sat--score b{font-size:19px;color:var(--qz-emerald)}

.quiz-page .qz-spark{position:absolute;z-index:1;pointer-events:none;animation:qz-bob 6.4s ease-in-out infinite}
.quiz-page .qz-spark.s1{top:8%;right:16%;width:15px;height:15px;border-radius:5px;background:var(--qz-gold);transform:rotate(18deg)}
.quiz-page .qz-spark.s2{bottom:10%;right:26%;width:12px;height:12px;border-radius:50%;background:var(--qz-violet);animation-delay:.9s}
.quiz-page .qz-spark.s3{top:46%;left:2%;width:10px;height:10px;border-radius:50%;background:var(--qz-blue);animation-delay:1.6s}

@keyframes qz-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes qz-pulse{0%{box-shadow:0 0 0 0 rgba(15,157,107,.5)}70%{box-shadow:0 0 0 9px rgba(15,157,107,0)}100%{box-shadow:0 0 0 0 rgba(15,157,107,0)}}

/* ============================================================================
   2 · SUBJECT EXPLORER — search + filter rail
   ============================================================================ */
.quiz-page .qz-explore{position:relative;background:var(--qz-peach);overflow:hidden;overflow:clip}
.quiz-page .qz-explore>.qz-wrap{position:relative;z-index:1}

.quiz-page .qz-search{max-width:720px;margin:0 auto;display:flex;align-items:center;gap:10px;background:#fff;
  border:1px solid var(--qz-line);border-radius:999px;padding:8px 8px 8px 20px;box-shadow:var(--qz-sh-sm);
  transition:box-shadow .25s,transform .25s,border-color .25s}
.quiz-page .qz-search:focus-within{box-shadow:0 14px 34px rgba(11,91,62,.12);transform:translateY(-2px);
  border-color:rgba(15,157,107,.4)}
.quiz-page .qz-search .qz-si{flex:none;color:var(--qz-emerald)}
.quiz-page .qz-search .qz-si svg{width:20px;height:20px}
.quiz-page .qz-search input{flex:1;min-width:0;border:none;outline:none;background:none;font-family:var(--qz-font);
  font-size:15.5px;color:var(--qz-ink);padding:6px 0}
.quiz-page .qz-search input::placeholder{color:#9BAEA4}
.quiz-page .qz-search-clear{flex:none;width:34px;height:34px;border-radius:50%;border:none;background:var(--qz-peach);
  color:var(--qz-body);cursor:pointer;display:none;place-items:center;transition:background .2s,color .2s}
.quiz-page .qz-search-clear svg{width:14px;height:14px}
.quiz-page .qz-search-clear:hover{background:var(--qz-emerald-soft);color:var(--qz-emerald-dark)}
.quiz-page .qz-search.has-val .qz-search-clear{display:grid}
.quiz-page .qz-search .qz-btn{flex:none;padding:12px 26px}

.quiz-page .qz-chipgroup{margin-top:30px}
.quiz-page .qz-chiplab{display:block;text-align:center;font-size:12px;font-weight:700;letter-spacing:.12em;
  text-transform:uppercase;color:var(--qz-body);margin:0 0 13px}
.quiz-page .qz-chips{display:flex;flex-wrap:wrap;justify-content:center;gap:9px}
.quiz-page .qz-chip{flex:0 0 auto;white-space:nowrap;font-family:var(--qz-font);font-size:13px;font-weight:600;
  color:var(--qz-ink-2);background:#fff;border:1px solid var(--qz-line);border-radius:999px;padding:8px 16px;
  cursor:pointer;position:relative;
  transition:background .2s,color .2s,border-color .2s,transform .2s,box-shadow .2s}
.quiz-page .qz-chip:hover{border-color:var(--qz-emerald);color:var(--qz-emerald-dark);transform:translateY(-2px);
  box-shadow:0 8px 18px rgba(11,91,62,.09)}
.quiz-page .qz-chip[aria-pressed="true"]{background:var(--qz-emerald);color:#fff;border-color:var(--qz-emerald);
  box-shadow:0 10px 22px rgba(15,157,107,.28)}
.quiz-page .qz-chip[aria-pressed="true"]:hover{background:var(--qz-emerald-dark);color:#fff}
.quiz-page .qz-chip em{font-style:normal;opacity:.62;font-weight:600;margin-left:5px;font-size:11.5px}
.quiz-page .qz-chip:focus-visible{outline:3px solid var(--qz-emerald);outline-offset:2px}
.quiz-page .qz-chip.qz-chip--off{opacity:.42;cursor:not-allowed}
.quiz-page .qz-chip.qz-chip--off:hover{transform:none;box-shadow:none;border-color:var(--qz-line);color:var(--qz-ink-2)}

/* ============================================================================
   3 · FEATURED SUBJECTS GRID
   ============================================================================ */
.quiz-page .qz-subjects{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
.quiz-page .qz-subj{position:relative;display:flex;flex-direction:column;text-align:left;background:#fff;
  border:1px solid var(--qz-line);border-radius:22px;padding:24px 22px 22px;box-shadow:var(--qz-sh-sm);
  cursor:pointer;overflow:hidden;
  transition:transform .32s cubic-bezier(.2,.7,.2,1),box-shadow .32s,border-color .32s}
.quiz-page .qz-subj:hover{transform:translateY(-8px);box-shadow:var(--qz-sh-lg);border-color:transparent}
.quiz-page .qz-subj:focus-visible{outline:3px solid var(--qz-emerald);outline-offset:3px}
/* tinted wash keyed off each subject's accent */
.quiz-page .qz-subj::before{content:"";position:absolute;right:-46px;top:-46px;width:150px;height:150px;
  border-radius:50%;background:var(--c);opacity:.08;transition:transform .45s cubic-bezier(.2,.7,.2,1)}
.quiz-page .qz-subj:hover::before{transform:scale(1.35)}
.quiz-page .qz-subj>*{position:relative;z-index:1}
.quiz-page .qz-subj-ic{width:50px;height:50px;border-radius:15px;display:grid;place-items:center;
  background:var(--c);box-shadow:0 10px 22px rgba(11,46,32,.16);box-shadow:0 10px 22px color-mix(in srgb,var(--c) 34%,transparent)}
.quiz-page .qz-subj-ic svg{width:24px;height:24px;color:#fff}
.quiz-page .qz-subj h3{margin-top:17px;font-size:18px;font-weight:700}
.quiz-page .qz-subj-meta{margin-top:9px;display:flex;flex-wrap:wrap;align-items:center;gap:7px;
  font-size:12.8px;color:var(--qz-body)}
.quiz-page .qz-subj-meta i{width:3px;height:3px;border-radius:50%;background:var(--qz-line-2);flex:none}
.quiz-page .qz-subj .qz-diff{margin-top:15px;align-self:flex-start}

.quiz-page .qz-prog{margin-top:18px}
.quiz-page .qz-prog-top{display:flex;justify-content:space-between;align-items:baseline;
  font-size:11.5px;font-weight:600;color:var(--qz-body);margin-bottom:7px}
.quiz-page .qz-prog-top b{font-weight:700;color:var(--qz-ink);font-size:12.5px}
.quiz-page .qz-track{height:7px;border-radius:999px;background:var(--qz-line);overflow:hidden}
.quiz-page .qz-fill{height:100%;border-radius:999px;background:var(--c,var(--qz-emerald));width:0;
  transition:width 1.1s cubic-bezier(.2,.7,.2,1)}
.quiz-page .qz-subj .qz-subj-cta{margin-top:20px;display:inline-flex;align-items:center;gap:8px;
  font-size:13.5px;font-weight:700;color:var(--qz-emerald-dark)}
.quiz-page .qz-subj .qz-subj-cta svg{width:15px;height:15px;transition:transform .25s}
.quiz-page .qz-subj:hover .qz-subj-cta svg{transform:translateX(4px)}

/* ============================================================================
   4 · ALL QUIZZES
   ============================================================================ */
.quiz-page .qz-bar{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;
  margin-bottom:26px;padding-bottom:18px;border-bottom:1px solid var(--qz-line)}
.quiz-page .qz-count{font-size:14px;color:var(--qz-body)}
.quiz-page .qz-count b{color:var(--qz-ink);font-weight:700}
.quiz-page .qz-sortwrap{display:flex;align-items:center;gap:10px}
.quiz-page .qz-sortwrap label{font-size:13px;font-weight:600;color:var(--qz-body)}
.quiz-page .qz-select{font-family:var(--qz-font);font-size:13.5px;font-weight:600;color:var(--qz-ink-2);
  background:#fff;border:1px solid var(--qz-line);border-radius:999px;padding:9px 34px 9px 16px;cursor:pointer;
  appearance:none;-webkit-appearance:none;
  background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235E7469' stroke-width='2.4' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right 13px center;background-size:13px;
  transition:border-color .2s,box-shadow .2s}
.quiz-page .qz-select:hover{border-color:var(--qz-emerald)}
.quiz-page .qz-select:focus-visible{outline:3px solid var(--qz-emerald);outline-offset:2px}

.quiz-page .qz-qgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.quiz-page .qz-card{position:relative;display:flex;flex-direction:column;background:#fff;
  border:1px solid var(--qz-line);border-radius:22px;box-shadow:var(--qz-sh-sm);
  transition:transform .32s cubic-bezier(.2,.7,.2,1),box-shadow .32s,border-color .32s}
.quiz-page .qz-card:hover{transform:translateY(-7px);box-shadow:var(--qz-sh-lg);border-color:transparent}
/* lift the whole card while its menu is open so neighbours can't paint over it */
.quiz-page .qz-card.menu-open{z-index:30}
.quiz-page .qz-card-top{position:relative;padding:20px 22px 0;display:flex;align-items:flex-start;
  justify-content:space-between;gap:12px}
.quiz-page .qz-card-ic{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;
  background:var(--c);flex:none;box-shadow:0 9px 20px rgba(11,46,32,.15);box-shadow:0 9px 20px color-mix(in srgb,var(--c) 32%,transparent)}
.quiz-page .qz-card-ic svg{width:21px;height:21px;color:#fff}

/* the "more options" kebab */
.quiz-page .qz-more{position:relative;flex:none}
.quiz-page .qz-more-btn{width:34px;height:34px;border-radius:11px;border:1px solid var(--qz-line);
  background:#fff;color:var(--qz-body);cursor:pointer;display:grid;place-items:center;
  transition:background .2s,color .2s,border-color .2s}
.quiz-page .qz-more-btn svg{width:16px;height:16px}
.quiz-page .qz-more-btn:hover{background:var(--qz-emerald-soft);color:var(--qz-emerald-dark);border-color:var(--qz-emerald-soft)}
.quiz-page .qz-more-btn:focus-visible{outline:3px solid var(--qz-emerald);outline-offset:2px}
.quiz-page .qz-menu{position:absolute;right:0;top:calc(100% + 8px);z-index:20;min-width:186px;background:#fff;
  border:1px solid var(--qz-line);border-radius:15px;box-shadow:var(--qz-sh-lg);padding:6px;
  opacity:0;visibility:hidden;transform:translateY(-6px);
  transition:opacity .2s,transform .2s,visibility .2s}
.quiz-page .qz-more.is-open .qz-menu{opacity:1;visibility:visible;transform:none}
.quiz-page .qz-menu button{display:flex;align-items:center;gap:10px;width:100%;border:none;background:none;
  font-family:var(--qz-font);font-size:13.2px;font-weight:600;color:var(--qz-ink-2);text-align:left;
  padding:9px 11px;border-radius:10px;cursor:pointer;transition:background .18s,color .18s}
.quiz-page .qz-menu button svg{width:15px;height:15px;color:var(--qz-body);flex:none}
.quiz-page .qz-menu button:hover{background:var(--qz-peach);color:var(--qz-emerald-dark)}
.quiz-page .qz-menu button:hover svg{color:var(--qz-emerald)}

.quiz-page .qz-card-body{padding:16px 22px 0;flex:1}
.quiz-page .qz-card-tag{font-size:11.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;
  color:var(--qz-emerald)}
.quiz-page .qz-card h3{margin-top:7px;font-size:17px;font-weight:700;line-height:1.34;overflow-wrap:anywhere}
.quiz-page .qz-card-desc{margin-top:9px;font-size:13.3px;color:var(--qz-body);line-height:1.6}
.quiz-page .qz-card-meta{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.quiz-page .qz-card-meta span{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;
  color:var(--qz-ink-2);background:var(--qz-peach);border:1px solid var(--qz-line);border-radius:999px;padding:6px 11px}
.quiz-page .qz-card-meta svg{width:13px;height:13px;color:var(--qz-emerald);flex:none}
.quiz-page .qz-card-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;
  margin:16px 22px 0;padding-top:14px;border-top:1px dashed var(--qz-line-2);font-size:12.6px;color:var(--qz-body)}
.quiz-page .qz-card-foot .qz-attempts{display:inline-flex;align-items:center;gap:7px}
.quiz-page .qz-card-foot .qz-attempts svg{width:14px;height:14px;color:var(--qz-body)}
.quiz-page .qz-card-foot b{color:var(--qz-ink);font-weight:700}
.quiz-page .qz-card-act{display:flex;gap:10px;padding:16px 22px 22px}
.quiz-page .qz-card-act .qz-btn{flex:1;padding:12px 14px;font-size:13.5px}
.quiz-page .qz-card-act .qz-btn--quiet{flex:0 0 auto;padding:12px 20px}

/* done ribbon on cards the learner already cleared */
.quiz-page .qz-card-done{position:absolute;top:20px;right:66px;z-index:2;display:inline-flex;align-items:center;
  gap:6px;font-size:11px;font-weight:700;letter-spacing:.04em;color:var(--qz-emerald-dark);
  background:var(--qz-emerald-soft);border-radius:999px;padding:5px 11px}
.quiz-page .qz-card-done svg{width:12px;height:12px}

.quiz-page .qz-card.is-hidden{display:none}

/* empty state */
.quiz-page .qz-empty{display:none;text-align:center;padding:56px 24px;background:var(--qz-peach);
  border:1px dashed var(--qz-line-2);border-radius:24px}
.quiz-page .qz-empty.show{display:block}
.quiz-page .qz-empty-ic{width:64px;height:64px;border-radius:20px;margin:0 auto;display:grid;place-items:center;
  background:#fff;box-shadow:var(--qz-sh-sm)}
.quiz-page .qz-empty-ic svg{width:28px;height:28px;color:var(--qz-emerald)}
.quiz-page .qz-empty h3{margin-top:18px;font-size:20px;font-weight:700}
.quiz-page .qz-empty p{margin-top:9px;font-size:14.5px;color:var(--qz-body);max-width:30em;margin-inline:auto}
.quiz-page .qz-empty .qz-btn{margin-top:22px}

.quiz-page .qz-loadmore{display:flex;justify-content:center;margin-top:44px}

/* ============================================================================
   5 · QUIZ PLAYER  (full-screen overlay)
   ============================================================================ */
.quiz-page .qz-player{position:fixed;inset:0;z-index:9990;display:none;flex-direction:column;
  background:#F8FBF9;
  background-image:linear-gradient(rgba(11,46,32,.032) 1px,transparent 1px),
                   linear-gradient(90deg,rgba(11,46,32,.032) 1px,transparent 1px);
  background-size:46px 46px}
.quiz-page .qz-player.is-open{display:flex;animation:qz-fade .28s ease}
@keyframes qz-fade{from{opacity:0}to{opacity:1}}
body.qz-locked{overflow:hidden}

/* --- top bar --- */
.quiz-page .qz-pbar{position:sticky;top:0;z-index:5;flex:none;
  background:rgba(255,255,255,.86);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  border-bottom:1px solid var(--qz-line);box-shadow:0 4px 22px rgba(11,46,32,.05)}
.quiz-page .qz-pbar-in{max-width:1320px;margin:0 auto;padding:12px 24px;display:flex;align-items:center;
  gap:16px}
.quiz-page .qz-pbar-id{display:flex;align-items:center;gap:12px;min-width:0;flex:1}
.quiz-page .qz-pbar-ic{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;
  background:var(--c,var(--qz-emerald));flex:none}
.quiz-page .qz-pbar-ic svg{width:19px;height:19px;color:#fff}
.quiz-page .qz-pbar-txt{min-width:0}
.quiz-page .qz-pbar-txt b{display:block;font-weight:700;font-size:14.5px;line-height:1.3;color:var(--qz-ink);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.quiz-page .qz-pbar-txt span{font-size:11.5px;color:var(--qz-body)}

.quiz-page .qz-pbar-mid{display:flex;align-items:center;gap:18px;flex:none}
.quiz-page .qz-pprog{display:flex;align-items:center;gap:11px;min-width:190px}
.quiz-page .qz-pprog-track{flex:1;height:7px;border-radius:999px;background:var(--qz-line);overflow:hidden}
.quiz-page .qz-pprog-fill{height:100%;border-radius:999px;background:var(--qz-emerald);width:0;
  transition:width .4s cubic-bezier(.2,.7,.2,1)}
.quiz-page .qz-pprog b{font-size:12.5px;font-weight:700;color:var(--qz-ink);white-space:nowrap}

.quiz-page .qz-timer{display:inline-flex;align-items:center;gap:9px;background:var(--qz-emerald-soft);
  border:1px solid rgba(15,157,107,.22);color:var(--qz-emerald-dark);border-radius:999px;padding:8px 16px;
  font-weight:800;font-size:15px;letter-spacing:.02em;font-variant-numeric:tabular-nums;
  transition:background .3s,color .3s,border-color .3s}
.quiz-page .qz-timer svg{width:16px;height:16px}
.quiz-page .qz-timer.is-low{background:#FDEBE5;border-color:rgba(225,77,42,.28);color:#B93D1B;
  animation:qz-blink 1.1s ease-in-out infinite}
@keyframes qz-blink{0%,100%{opacity:1}50%{opacity:.58}}

.quiz-page .qz-pbar-act{display:flex;align-items:center;gap:10px;flex:none}
.quiz-page .qz-navtoggle{display:none;align-items:center;gap:8px;font-size:13px;font-weight:700;
  background:#fff;color:var(--qz-emerald-dark);border:1px solid var(--qz-line);border-radius:999px;
  padding:9px 15px;cursor:pointer}
.quiz-page .qz-navtoggle svg{width:15px;height:15px}
.quiz-page .qz-close{width:38px;height:38px;border-radius:12px;border:1px solid var(--qz-line);background:#fff;
  color:var(--qz-body);cursor:pointer;display:grid;place-items:center;transition:background .2s,color .2s}
.quiz-page .qz-close svg{width:17px;height:17px}
.quiz-page .qz-close:hover{background:#FDEBE5;color:#B93D1B;border-color:#FDEBE5}

/* --- body: question column + navigator --- */
.quiz-page .qz-pbody{flex:1;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch}
.quiz-page .qz-pgrid{max-width:1320px;margin:0 auto;padding:clamp(22px,3vw,38px) 24px clamp(40px,5vw,70px);
  display:grid;grid-template-columns:minmax(0,1fr) 316px;gap:clamp(20px,2.6vw,32px);align-items:start}

.quiz-page .qz-qpanel{background:#fff;border:1px solid var(--qz-line);border-radius:26px;
  box-shadow:var(--qz-sh);padding:clamp(24px,3vw,38px);min-width:0}
.quiz-page .qz-qtop{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;
  padding-bottom:18px;border-bottom:1px solid var(--qz-line)}
.quiz-page .qz-qnum{display:inline-flex;align-items:center;gap:11px}
.quiz-page .qz-qnum b{width:38px;height:38px;border-radius:13px;display:grid;place-items:center;
  background:var(--qz-emerald);color:#fff;font-size:14.5px;font-weight:800}
.quiz-page .qz-qnum span{font-size:12.5px;font-weight:600;color:var(--qz-body)}
.quiz-page .qz-qtopics{display:flex;flex-wrap:wrap;gap:8px}
.quiz-page .qz-topic{display:inline-flex;align-items:center;font-size:11.5px;font-weight:700;padding:5px 11px;
  border-radius:999px;background:var(--qz-peach);color:var(--qz-ink-2);border:1px solid var(--qz-line)}

.quiz-page .qz-qtext{overflow-wrap:anywhere;margin-top:22px;font-size:clamp(16.5px,1.4vw,19px);font-weight:600;line-height:1.6;
  color:var(--qz-ink);letter-spacing:-.005em}

.quiz-page .qz-opts{margin-top:24px;display:flex;flex-direction:column;gap:12px}
.quiz-page .qz-opt{display:flex;align-items:flex-start;gap:14px;width:100%;text-align:left;
  background:#fff;border:1.5px solid var(--qz-line);border-radius:16px;padding:15px 18px;cursor:pointer;
  font-family:var(--qz-font);font-size:14.8px;font-weight:500;color:var(--qz-ink-2);line-height:1.55;
  transition:border-color .22s,background .22s,transform .22s,box-shadow .22s,color .22s}
.quiz-page .qz-opt:hover{border-color:rgba(15,157,107,.5);background:#FBFEFC;transform:translateX(3px)}
.quiz-page .qz-opt:focus-visible{outline:3px solid var(--qz-emerald);outline-offset:2px}
.quiz-page .qz-opt-k{flex:none;width:30px;height:30px;border-radius:10px;display:grid;place-items:center;
  background:var(--qz-peach);border:1px solid var(--qz-line);font-size:13px;font-weight:800;color:var(--qz-body);
  transition:background .22s,color .22s,border-color .22s}
.quiz-page .qz-opt-t{flex:1;min-width:0;padding-top:3px}
.quiz-page .qz-opt[aria-checked="true"]{border-color:var(--qz-emerald);background:var(--qz-emerald-soft);
  color:var(--qz-emerald-dark);font-weight:600;box-shadow:0 10px 24px rgba(15,157,107,.14)}
.quiz-page .qz-opt[aria-checked="true"] .qz-opt-k{background:var(--qz-emerald);color:#fff;border-color:var(--qz-emerald)}

/* graded states (review + instant-feedback) */
.quiz-page .qz-opt.is-correct{border-color:var(--qz-emerald);background:var(--qz-emerald-soft);
  color:var(--qz-emerald-dark);font-weight:600}
.quiz-page .qz-opt.is-correct .qz-opt-k{background:var(--qz-emerald);color:#fff;border-color:var(--qz-emerald)}
.quiz-page .qz-opt.is-wrong{border-color:#EFB0A0;background:#FDF1ED;color:#B93D1B;font-weight:600}
.quiz-page .qz-opt.is-wrong .qz-opt-k{background:var(--qz-red);color:#fff;border-color:var(--qz-red)}
.quiz-page .qz-opt.is-locked{cursor:default}
.quiz-page .qz-opt.is-locked:hover{transform:none;background:inherit}
.quiz-page .qz-opt-mark{flex:none;margin-left:auto;align-self:center}
.quiz-page .qz-opt-mark svg{width:19px;height:19px}
.quiz-page .qz-opt.is-correct .qz-opt-mark svg{color:var(--qz-emerald)}
.quiz-page .qz-opt.is-wrong .qz-opt-mark svg{color:var(--qz-red)}

/* explanation drawer */
.quiz-page .qz-expl{margin-top:22px;border-radius:18px;border:1px solid rgba(15,157,107,.2);
  background:linear-gradient(180deg,var(--qz-emerald-soft) 0%,#F4FBF7 100%);padding:20px 22px;
  display:none;animation:qz-slide .34s cubic-bezier(.2,.7,.2,1)}
.quiz-page .qz-expl.show{display:block}
@keyframes qz-slide{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
.quiz-page .qz-expl-h{display:flex;align-items:center;gap:9px;font-size:12px;font-weight:800;
  letter-spacing:.12em;text-transform:uppercase;color:var(--qz-emerald-dark)}
.quiz-page .qz-expl-h svg{width:15px;height:15px}
.quiz-page .qz-expl-ans{margin-top:12px;font-size:14px;font-weight:700;color:var(--qz-ink)}
.quiz-page .qz-expl p{margin-top:9px;font-size:14.2px;color:var(--qz-ink-2);line-height:1.68}

/* nav row */
.quiz-page .qz-qnav{display:flex;flex-wrap:wrap;align-items:center;gap:11px;margin-top:28px;padding-top:22px;
  border-top:1px solid var(--qz-line)}
.quiz-page .qz-qnav .qz-spacer{flex:1}
.quiz-page .qz-btn--mark{background:#fff;color:var(--qz-violet);border-color:rgba(124,92,252,.42)}
.quiz-page .qz-btn--mark:hover{background:var(--qz-violet);color:#fff;border-color:var(--qz-violet);transform:translateY(-2px)}
.quiz-page .qz-btn--mark.is-on{background:var(--qz-violet);color:#fff;border-color:var(--qz-violet)}
.quiz-page .qz-btn--mark svg{transition:none}
.quiz-page .qz-btn--mark:hover svg{transform:none}
.quiz-page .qz-btn--prev svg{transform:rotate(180deg)}
.quiz-page .qz-btn--prev:hover svg{transform:rotate(180deg) translateX(3px)}

/* --- right rail: question navigator --- */
.quiz-page .qz-rail{position:sticky;top:calc(clamp(22px,3vw,38px));background:#fff;border:1px solid var(--qz-line);
  border-radius:24px;box-shadow:var(--qz-sh-sm);padding:22px;min-width:0}
.quiz-page .qz-rail-h{display:flex;align-items:center;justify-content:space-between;gap:10px}
.quiz-page .qz-rail-h h4{font-size:15px;font-weight:700}
.quiz-page .qz-rail-close{display:none;width:32px;height:32px;border-radius:10px;border:1px solid var(--qz-line);
  background:#fff;color:var(--qz-body);cursor:pointer;place-items:center}
.quiz-page .qz-rail-close svg{width:15px;height:15px}

.quiz-page .qz-nums{display:grid;grid-template-columns:repeat(5,1fr);gap:9px;margin-top:18px}
.quiz-page .qz-num{aspect-ratio:1;border-radius:13px;border:1.5px solid var(--qz-line);background:#fff;
  color:var(--qz-body);font-family:var(--qz-font);font-size:14px;font-weight:700;cursor:pointer;position:relative;
  display:grid;place-items:center;
  transition:transform .2s,background .2s,color .2s,border-color .2s,box-shadow .2s}
.quiz-page .qz-num:hover{transform:translateY(-3px);box-shadow:0 8px 18px rgba(11,91,62,.12)}
.quiz-page .qz-num:focus-visible{outline:3px solid var(--qz-emerald);outline-offset:2px}
.quiz-page .qz-num[data-s="answered"]{background:var(--qz-st-answered);border-color:var(--qz-st-answered);color:#fff}
.quiz-page .qz-num[data-s="review"]{background:var(--qz-st-review);border-color:var(--qz-st-review);color:#fff}
.quiz-page .qz-num[data-s="answered-review"]{background:var(--qz-st-review);border-color:var(--qz-st-review);color:#fff}
.quiz-page .qz-num[data-s="answered-review"]::after{content:"";position:absolute;right:5px;bottom:5px;width:7px;height:7px;
  border-radius:50%;background:#7BEFC0}
.quiz-page .qz-num[data-s="skipped"]{background:#FFF4DC;border-color:#F6D89A;color:#A9700A}
.quiz-page .qz-num[data-s="correct"]{background:var(--qz-st-answered);border-color:var(--qz-st-answered);color:#fff}
.quiz-page .qz-num[data-s="wrong"]{background:var(--qz-st-wrong);border-color:var(--qz-st-wrong);color:#fff}
.quiz-page .qz-num.is-current{box-shadow:0 0 0 3px rgba(15,157,107,.28);border-color:var(--qz-emerald);
  transform:translateY(-2px)}
.quiz-page .qz-num.is-current[data-s="unseen"]{color:var(--qz-emerald);background:#fff}

.quiz-page .qz-legend{margin-top:20px;padding-top:18px;border-top:1px solid var(--qz-line);
  display:grid;grid-template-columns:1fr 1fr;gap:10px 12px}
.quiz-page .qz-legend div{display:flex;align-items:center;gap:8px;font-size:11.8px;color:var(--qz-body);font-weight:500}
.quiz-page .qz-legend i{width:12px;height:12px;border-radius:5px;flex:none;border:1.5px solid var(--qz-line);background:#fff}
.quiz-page .qz-legend i.a{background:var(--qz-st-answered);border-color:var(--qz-st-answered)}
.quiz-page .qz-legend i.r{background:var(--qz-st-review);border-color:var(--qz-st-review)}
.quiz-page .qz-legend i.s{background:#FFF4DC;border-color:#F6D89A}

.quiz-page .qz-tally{margin-top:20px;padding-top:18px;border-top:1px solid var(--qz-line);
  display:grid;grid-template-columns:repeat(3,1fr);gap:10px;text-align:center}
.quiz-page .qz-tally div{background:var(--qz-peach);border-radius:14px;padding:11px 6px}
.quiz-page .qz-tally b{display:block;font-size:18px;font-weight:800;color:var(--qz-ink);line-height:1.2}
.quiz-page .qz-tally span{font-size:10.5px;font-weight:600;color:var(--qz-body);letter-spacing:.03em}

.quiz-page .qz-rail .qz-btn{width:100%;margin-top:20px}
.quiz-page .qz-rail-note{margin-top:12px;font-size:11.5px;color:var(--qz-body);text-align:center;line-height:1.5}

.quiz-page .qz-scrim{position:fixed;inset:0;z-index:9995;background:rgba(11,46,32,.5);
  backdrop-filter:blur(3px);opacity:0;visibility:hidden;transition:opacity .25s,visibility .25s}
.quiz-page .qz-scrim.show{opacity:1;visibility:visible}

/* --- confirm dialog --- */
.quiz-page .qz-dialog{position:fixed;inset:0;z-index:9999;display:none;place-items:center;padding:24px}
.quiz-page .qz-dialog.is-open{display:grid}
.quiz-page .qz-dialog-back{position:absolute;inset:0;background:rgba(11,46,32,.55);backdrop-filter:blur(4px)}
.quiz-page .qz-dialog-box{position:relative;z-index:1;width:min(430px,100%);background:#fff;border-radius:26px;
  padding:32px 30px;box-shadow:var(--qz-sh-lg);text-align:center;animation:qz-pop .3s cubic-bezier(.2,.9,.3,1.2)}
@keyframes qz-pop{from{opacity:0;transform:scale(.94) translateY(10px)}to{opacity:1;transform:none}}
.quiz-page .qz-dialog-ic{width:58px;height:58px;border-radius:19px;margin:0 auto;display:grid;place-items:center;
  background:var(--qz-emerald-soft)}
.quiz-page .qz-dialog-ic svg{width:26px;height:26px;color:var(--qz-emerald-dark)}
.quiz-page .qz-dialog-box h3{margin-top:18px;font-size:21px;font-weight:800}
.quiz-page .qz-dialog-box p{margin-top:10px;font-size:14.2px;color:var(--qz-body)}
.quiz-page .qz-dialog-stats{display:flex;justify-content:center;gap:10px;margin-top:20px;flex-wrap:wrap}
.quiz-page .qz-dialog-stats span{background:var(--qz-peach);border:1px solid var(--qz-line);border-radius:999px;
  padding:7px 14px;font-size:12.5px;font-weight:600;color:var(--qz-ink-2)}
.quiz-page .qz-dialog-act{display:flex;gap:11px;margin-top:26px}
.quiz-page .qz-dialog-act .qz-btn{flex:1}

/* ============================================================================
   ANSWER REVIEW MODE
   ============================================================================ */
.quiz-page .qz-result{max-width:1320px;margin:0 auto;padding:clamp(24px,3vw,40px) 24px clamp(50px,6vw,80px)}
.quiz-page .qz-scoreboard{position:relative;overflow:hidden;border-radius:30px;color:#fff;padding:clamp(28px,3.6vw,46px);
  background:radial-gradient(760px 460px at 88% 0,rgba(255,255,255,.12),transparent 60%),
             linear-gradient(160deg,#0C6C49 0%,var(--qz-emerald-dark) 60%,#083c29 100%)}
.quiz-page .qz-scoreboard::before{content:"";position:absolute;inset:0;pointer-events:none;
  background-image:radial-gradient(circle at center,rgba(255,255,255,.05) 1px,transparent 1.6px);
  background-size:26px 26px;opacity:.6}
.quiz-page .qz-score-grid{position:relative;z-index:1;display:grid;grid-template-columns:auto 1fr;
  gap:clamp(26px,3.6vw,52px);align-items:center}
.quiz-page .qz-scoreboard h2{color:#fff;font-size:clamp(24px,3.2vw,34px);font-weight:800}
.quiz-page .qz-scoreboard .qz-verdict{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.15);
  border:1px solid rgba(255,255,255,.26);border-radius:999px;padding:6px 14px;font-size:12px;font-weight:700;
  letter-spacing:.11em;text-transform:uppercase}
.quiz-page .qz-scoreboard>.qz-score-grid p{margin-top:12px;color:rgba(255,255,255,.82);font-size:15px;max-width:36em}

.quiz-page .qz-bigring{position:relative;width:clamp(150px,17vw,182px);height:clamp(150px,17vw,182px);flex:none}
.quiz-page .qz-bigring svg{width:100%;height:100%;transform:rotate(-90deg)}
.quiz-page .qz-bigring circle{fill:none;stroke-width:11;stroke-linecap:round}
.quiz-page .qz-bigring .bg{stroke:rgba(255,255,255,.17)}
.quiz-page .qz-bigring .fg{stroke:#7BEFC0;stroke-dasharray:534;stroke-dashoffset:534;
  transition:stroke-dashoffset 1.5s cubic-bezier(.2,.7,.2,1)}
.quiz-page .qz-bigring-c{position:absolute;inset:0;display:grid;place-content:center;text-align:center}
.quiz-page .qz-bigring-c b{font-size:clamp(32px,4vw,42px);font-weight:800;line-height:1;color:#fff}
.quiz-page .qz-bigring-c span{display:block;margin-top:5px;font-size:11.5px;font-weight:700;letter-spacing:.14em;
  text-transform:uppercase;color:rgba(255,255,255,.72)}

.quiz-page .qz-score-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:26px}
.quiz-page .qz-score-stat{background:rgba(255,255,255,.11);border:1px solid rgba(255,255,255,.18);
  border-radius:17px;padding:15px 16px;backdrop-filter:blur(6px)}
.quiz-page .qz-score-stat b{display:block;font-size:22px;font-weight:800;line-height:1.2}
.quiz-page .qz-score-stat span{font-size:11.5px;color:rgba(255,255,255,.76);font-weight:600;letter-spacing:.03em}
.quiz-page .qz-score-stat.ok b{color:#7BEFC0}
.quiz-page .qz-score-stat.no b{color:#FFB59E}
.quiz-page .qz-score-stat.sk b{color:#FFD98A}
.quiz-page .qz-score-act{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}

/* insight strip under the scoreboard */
.quiz-page .qz-insight-row{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:22px}
.quiz-page .qz-insight{background:#fff;border:1px solid var(--qz-line);border-radius:20px;padding:20px 22px;
  box-shadow:var(--qz-sh-sm)}
.quiz-page .qz-insight-h{display:flex;align-items:center;gap:10px}
.quiz-page .qz-insight-ic{width:36px;height:36px;border-radius:12px;display:grid;place-items:center;background:var(--c)}
.quiz-page .qz-insight-ic svg{width:17px;height:17px;color:#fff}
.quiz-page .qz-insight-h b{font-size:13.5px;font-weight:700}
.quiz-page .qz-insight p{margin-top:11px;font-size:13.4px;color:var(--qz-body);line-height:1.6}
.quiz-page .qz-insight .qz-topicbars{margin-top:13px;display:flex;flex-direction:column;gap:10px}
.quiz-page .qz-topicbar span{display:flex;justify-content:space-between;font-size:12px;font-weight:600;
  color:var(--qz-ink-2);margin-bottom:5px}
.quiz-page .qz-topicbar .qz-track{height:6px}

.quiz-page .qz-review-head{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px;
  margin:clamp(34px,4vw,52px) 0 20px}
.quiz-page .qz-review-head h3{font-size:clamp(20px,2.4vw,26px);font-weight:800}
.quiz-page .qz-rfilters{display:flex;flex-wrap:wrap;gap:8px}
.quiz-page .qz-rfilter{font-size:12.5px;font-weight:600;color:var(--qz-ink-2);background:#fff;
  border:1px solid var(--qz-line);border-radius:999px;padding:8px 15px;cursor:pointer;
  transition:background .2s,color .2s,border-color .2s}
.quiz-page .qz-rfilter:hover{border-color:var(--qz-emerald);color:var(--qz-emerald-dark)}
.quiz-page .qz-rfilter[aria-pressed="true"]{background:var(--qz-emerald);border-color:var(--qz-emerald);color:#fff}
.quiz-page .qz-rfilter:focus-visible{outline:3px solid var(--qz-emerald);outline-offset:2px}

.quiz-page .qz-rlist{display:flex;flex-direction:column;gap:16px}
.quiz-page .qz-ritem{background:#fff;border:1px solid var(--qz-line);border-radius:22px;padding:22px 24px;
  box-shadow:var(--qz-sh-sm)}
.quiz-page .qz-ritem.is-hidden{display:none}
.quiz-page .qz-rtop{display:flex;flex-wrap:wrap;align-items:center;gap:11px}
.quiz-page .qz-rbadge{display:inline-flex;align-items:center;gap:7px;font-size:11.5px;font-weight:700;
  padding:5px 12px;border-radius:999px;letter-spacing:.03em}
.quiz-page .qz-rbadge svg{width:13px;height:13px}
.quiz-page .qz-rbadge.ok{background:var(--qz-emerald-soft);color:#0B7A52}
.quiz-page .qz-rbadge.no{background:#FDEBE5;color:#B93D1B}
.quiz-page .qz-rbadge.sk{background:#FFF4DC;color:#A9700A}
.quiz-page .qz-rq{margin-top:14px;font-size:15.6px;font-weight:600;line-height:1.6}
.quiz-page .qz-ropts{margin-top:15px;display:flex;flex-direction:column;gap:9px}
.quiz-page .qz-ropt{display:flex;align-items:flex-start;gap:12px;font-size:14px;line-height:1.55;
  border:1.5px solid var(--qz-line);border-radius:14px;padding:11px 15px;color:var(--qz-ink-2)}
.quiz-page .qz-ropt .qz-opt-k{width:27px;height:27px;border-radius:9px;font-size:12px}
.quiz-page .qz-ropt.is-correct{border-color:var(--qz-emerald);background:var(--qz-emerald-soft);color:var(--qz-emerald-dark);font-weight:600}
.quiz-page .qz-ropt.is-correct .qz-opt-k{background:var(--qz-emerald);color:#fff;border-color:var(--qz-emerald)}
.quiz-page .qz-ropt.is-wrong{border-color:#EFB0A0;background:#FDF1ED;color:#B93D1B;font-weight:600}
.quiz-page .qz-ropt.is-wrong .qz-opt-k{background:var(--qz-red);color:#fff;border-color:var(--qz-red)}
.quiz-page .qz-ropt small{margin-left:auto;font-size:11px;font-weight:700;letter-spacing:.05em;
  text-transform:uppercase;opacity:.8;white-space:nowrap;align-self:center}

/* ============================================================================
   6 · PERFORMANCE INSIGHTS
   ============================================================================ */
.quiz-page .qz-perf{display:grid;grid-template-columns:1.15fr .85fr;gap:clamp(20px,2.6vw,30px);align-items:stretch}
.quiz-page .qz-rings{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.quiz-page .qz-ringcard{background:#fff;border:1px solid var(--qz-line);border-radius:22px;padding:24px 18px 22px;
  text-align:center;box-shadow:var(--qz-sh-sm);
  transition:transform .3s cubic-bezier(.2,.7,.2,1),box-shadow .3s}
.quiz-page .qz-ringcard:hover{transform:translateY(-6px);box-shadow:var(--qz-sh)}
.quiz-page .qz-ringcard .qz-dial{position:relative;width:98px;height:98px;margin:0 auto}
.quiz-page .qz-ringcard .qz-dial svg{width:98px;height:98px;transform:rotate(-90deg)}
.quiz-page .qz-ringcard .qz-dial circle{fill:none;stroke-width:9;stroke-linecap:round}
.quiz-page .qz-ringcard .qz-dial .bg{stroke:var(--qz-line)}
.quiz-page .qz-ringcard .qz-dial .fg{stroke:var(--c,var(--qz-emerald));stroke-dasharray:270;stroke-dashoffset:270;
  transition:stroke-dashoffset 1.5s cubic-bezier(.2,.7,.2,1)}
.quiz-page .qz-ringcard .qz-dial em{position:absolute;inset:0;display:grid;place-items:center;font-style:normal;
  font-size:21px;font-weight:800;color:var(--qz-ink)}
.quiz-page .qz-ringcard h4{margin-top:16px;font-size:14.5px;font-weight:700}
.quiz-page .qz-ringcard p{margin-top:6px;font-size:12.5px;color:var(--qz-body);line-height:1.55}
.quiz-page .qz-delta{display:inline-flex;align-items:center;gap:5px;margin-top:11px;font-size:11.5px;
  font-weight:700;padding:4px 10px;border-radius:999px;background:var(--qz-emerald-soft);color:#0B7A52}
.quiz-page .qz-delta svg{width:12px;height:12px}
.quiz-page .qz-delta.down{background:#FDEBE5;color:#B93D1B}

.quiz-page .qz-chartcard{background:#fff;border:1px solid var(--qz-line);border-radius:24px;padding:26px;
  box-shadow:var(--qz-sh-sm);display:flex;flex-direction:column;overflow:hidden}
.quiz-page .qz-chartcard h4{font-size:16px;font-weight:700}
.quiz-page .qz-chartcard>p{margin-top:6px;font-size:13px;color:var(--qz-body)}
.quiz-page .qz-chart{margin-top:22px;flex:1;display:flex;align-items:flex-end;gap:clamp(8px,1.4vw,16px);
  min-height:180px;padding-bottom:30px;position:relative}
.quiz-page .qz-chart::after{content:"";position:absolute;left:0;right:0;bottom:28px;height:1px;background:var(--qz-line)}
.quiz-page .qz-col{flex:1;display:flex;flex-direction:column;align-items:center;gap:8px;position:relative;height:100%;
  justify-content:flex-end}
.quiz-page .qz-col-bar{width:100%;max-width:34px;border-radius:9px 9px 3px 3px;background:var(--c,var(--qz-emerald));
  height:0;transition:height 1.2s cubic-bezier(.2,.7,.2,1);position:relative;opacity:.9}
.quiz-page .qz-col:hover .qz-col-bar{opacity:1}
.quiz-page .qz-col-val{position:absolute;top:-22px;left:50%;transform:translateX(-50%);font-size:11.5px;
  font-weight:800;color:var(--qz-ink);white-space:nowrap}
.quiz-page .qz-col-lab{position:absolute;bottom:-26px;left:50%;transform:translateX(-50%);font-size:11px;
  font-weight:600;color:var(--qz-body);white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis}
.quiz-page .qz-chart-legend{display:flex;flex-wrap:wrap;gap:8px 18px;margin-top:16px;padding-top:16px;
  border-top:1px dashed var(--qz-line-2);font-size:12.2px;color:var(--qz-body)}
.quiz-page .qz-chart-legend b{color:var(--qz-ink);font-weight:700}

/* ============================================================================
   7 · RECENTLY ATTEMPTED
   ============================================================================ */
.quiz-page .qz-recent{display:flex;flex-direction:column;gap:14px}
.quiz-page .qz-attempt{display:grid;grid-template-columns:auto 1fr auto auto;align-items:center;gap:clamp(14px,2vw,26px);
  background:#fff;border:1px solid var(--qz-line);border-radius:20px;padding:18px 22px;box-shadow:var(--qz-sh-sm);
  transition:transform .28s cubic-bezier(.2,.7,.2,1),box-shadow .28s,border-color .28s}
.quiz-page .qz-attempt:hover{transform:translateY(-4px);box-shadow:var(--qz-sh);border-color:transparent}
.quiz-page .qz-attempt-ring{position:relative;width:62px;height:62px;flex:none}
.quiz-page .qz-attempt-ring svg{width:62px;height:62px;transform:rotate(-90deg)}
.quiz-page .qz-attempt-ring circle{fill:none;stroke-width:6.5;stroke-linecap:round}
.quiz-page .qz-attempt-ring .bg{stroke:var(--qz-line)}
.quiz-page .qz-attempt-ring .fg{stroke:var(--c);stroke-dasharray:170;stroke-dashoffset:170;
  transition:stroke-dashoffset 1.3s cubic-bezier(.2,.7,.2,1)}
.quiz-page .qz-attempt-ring em{position:absolute;inset:0;display:grid;place-items:center;font-style:normal;
  font-size:13px;font-weight:800;color:var(--qz-ink)}
.quiz-page .qz-attempt-txt{min-width:0}
.quiz-page .qz-attempt-txt b{display:block;font-size:15.5px;font-weight:700;line-height:1.35;overflow-wrap:anywhere}
.quiz-page .qz-attempt-meta{display:flex;flex-wrap:wrap;align-items:center;gap:7px;margin-top:7px;
  font-size:12.5px;color:var(--qz-body)}
.quiz-page .qz-attempt-meta i{width:3px;height:3px;border-radius:50%;background:var(--qz-line-2);flex:none}
.quiz-page .qz-attempt-score{text-align:right;flex:none}
.quiz-page .qz-attempt-score b{display:block;font-size:19px;font-weight:800;line-height:1.2;color:var(--qz-ink)}
.quiz-page .qz-attempt-score span{font-size:11.5px;font-weight:600;color:var(--qz-body);letter-spacing:.04em}
.quiz-page .qz-attempt-act{display:flex;gap:9px;flex:none}

/* ============================================================================
   8 · RECOMMENDED NEXT
   ============================================================================ */
.quiz-page .qz-rec-lead{display:inline-flex;align-items:center;gap:10px;background:#fff;
  border:1px solid var(--qz-line);border-radius:999px;padding:9px 18px 9px 12px;font-size:13.2px;
  color:var(--qz-ink-2);box-shadow:var(--qz-sh-sm);margin-bottom:26px;text-align:left;line-height:1.45}
.quiz-page .qz-rec-lead b{font-weight:700;color:var(--qz-emerald-dark)}
.quiz-page .qz-rec-lead .qz-rec-ic{width:28px;height:28px;border-radius:9px;background:var(--qz-emerald-soft);
  display:grid;place-items:center;flex:none}
.quiz-page .qz-rec-lead svg{width:15px;height:15px;color:var(--qz-emerald-dark)}

.quiz-page .qz-recs{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.quiz-page .qz-rec{position:relative;display:flex;flex-direction:column;background:#fff;
  border:1px solid var(--qz-line);border-radius:22px;overflow:hidden;box-shadow:var(--qz-sh-sm);
  transition:transform .32s cubic-bezier(.2,.7,.2,1),box-shadow .32s,border-color .32s}
.quiz-page .qz-rec:hover{transform:translateY(-7px);box-shadow:var(--qz-sh-lg);border-color:transparent}

/* blurred subject artwork band — same cover pattern as the course cards */
.quiz-page .qz-rec-cover{position:relative;aspect-ratio:16/9;overflow:hidden;isolation:isolate;
  background:var(--qz-peach)}
/* layer 1 — generated gradient mesh. Also the fallback if the photo fails. */
.quiz-page .qz-rec-cover>svg{position:absolute;inset:0;width:100%;height:100%;display:block}
/* layer 2 — the blurred photograph. Inset past the edges so the blur has no
   soft border, and scaled slightly on hover with the rest of the card. */
.quiz-page .qz-rec-photo{position:absolute;inset:-5%;width:110%;height:110%;object-fit:cover;
  filter:blur(var(--qz-cover-blur)) saturate(1.08);opacity:0;
  transition:opacity .65s ease,transform .55s cubic-bezier(.2,.7,.2,1),filter .45s ease}
.quiz-page .qz-rec-photo.is-ready{opacity:1}
/* on hover the photo sharpens a touch — a small reward for pointing at the card */
.quiz-page .qz-rec:hover .qz-rec-photo{transform:scale(1.05);filter:blur(calc(var(--qz-cover-blur) - 2px)) saturate(1.12)}
/* layer 3 — subject tint, keeps every card inside the ShikshaCom palette */
.quiz-page .qz-rec-tint{position:absolute;inset:0;pointer-events:none;background:var(--c);
  opacity:var(--qz-cover-tint);mix-blend-mode:multiply}
/* layer 4 — white veil so the pills and the card edge stay legible */
.quiz-page .qz-rec-veil{position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(180deg,rgba(255,255,255,.06) 0%,rgba(255,255,255,0) 38%,rgba(255,255,255,var(--qz-cover-veil)) 100%)}

/* the reason pill — always one line, glass over the artwork */
.quiz-page .qz-rec-why{position:absolute;left:16px;bottom:14px;z-index:2;
  display:inline-flex;align-items:center;gap:7px;white-space:nowrap;
  font-size:11px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:var(--qz-emerald-dark);
  background:rgba(255,255,255,.94);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
  border:1px solid rgba(255,255,255,.9);border-radius:999px;padding:6px 14px 6px 10px;
  box-shadow:0 8px 22px rgba(11,46,32,.18)}
.quiz-page .qz-rec-why svg{width:13px;height:13px;color:var(--c);flex:none}

.quiz-page .qz-rec-subj{position:absolute;right:14px;top:14px;z-index:2;
  font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:#fff;
  background:var(--c);border-radius:999px;padding:5px 12px;box-shadow:0 8px 20px rgba(11,46,32,.2)}

.quiz-page .qz-rec-body{display:flex;flex-direction:column;flex:1;padding:20px 22px 22px}
.quiz-page .qz-rec-body h3{font-size:17.5px;font-weight:700;line-height:1.35;overflow-wrap:anywhere}
.quiz-page .qz-rec-body p{margin-top:10px;font-size:13.4px;color:var(--qz-body);line-height:1.62;flex:1}
.quiz-page .qz-rec-meta{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.quiz-page .qz-rec-meta span{display:inline-flex;align-items:center;gap:6px;font-size:11.8px;font-weight:600;
  color:var(--qz-ink-2);background:var(--qz-peach);border:1px solid var(--qz-line);border-radius:999px;padding:6px 11px}
.quiz-page .qz-rec-meta svg{width:12px;height:12px;color:var(--c);flex:none}
.quiz-page .qz-rec-body .qz-btn{margin-top:18px;width:100%}

/* ============================================================================
   9 · FINAL CTA
   ============================================================================ */
.quiz-page .qz-final{position:relative;overflow:hidden;overflow:clip;color:#fff;
  background:radial-gradient(760px 460px at 85% 0,rgba(255,255,255,.10),transparent 60%),
             linear-gradient(160deg,#0C6C49 0%,var(--qz-emerald-dark) 60%,#083c29 100%)}
.quiz-page .qz-final::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:0;
  background-image:radial-gradient(circle at center,rgba(255,255,255,.05) 1px,transparent 1.6px);
  background-size:26px 26px;opacity:.6}
.quiz-page .qz-final-glow{position:absolute;width:420px;height:420px;border-radius:50%;pointer-events:none;
  background:radial-gradient(circle,rgba(123,239,192,.22),transparent 68%);
  right:-90px;top:-140px;animation:qz-bob 9s ease-in-out infinite}
.quiz-page .qz-final-grid{position:relative;z-index:1;display:grid;grid-template-columns:1.05fr .95fr;
  gap:clamp(30px,4.4vw,64px);align-items:center}
.quiz-page .qz-final h2{color:#fff;font-size:clamp(28px,4vw,44px);font-weight:800;letter-spacing:-.02em}
.quiz-page .qz-final p{margin-top:16px;color:rgba(255,255,255,.82);font-size:16px;max-width:33em}
.quiz-page .qz-final-cta{display:flex;flex-wrap:wrap;gap:13px;margin-top:30px}
.quiz-page .qz-final .qz-eyebrow{color:#8FE3C0}
.quiz-page .qz-final .qz-eyebrow u{border-bottom-color:#8FE3C0}
.quiz-page .qz-final-facts{display:flex;flex-wrap:wrap;gap:12px 30px;margin-top:32px;padding-top:24px;
  border-top:1px solid rgba(255,255,255,.16)}
.quiz-page .qz-final-facts div b{display:block;font-size:23px;font-weight:800;color:#7BEFC0;line-height:1.2}
.quiz-page .qz-final-facts div span{font-size:12.5px;color:rgba(255,255,255,.72)}

.quiz-page .qz-streak{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);
  border-radius:26px;padding:26px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
.quiz-page .qz-streak-h{display:flex;align-items:center;justify-content:space-between;gap:12px}
.quiz-page .qz-streak-h b{font-size:15px;font-weight:700;color:#fff}
.quiz-page .qz-streak-h span{font-size:12px;color:rgba(255,255,255,.68)}
.quiz-page .qz-streak-days{display:grid;grid-template-columns:repeat(7,1fr);gap:9px;margin-top:20px}
.quiz-page .qz-day{text-align:center}
.quiz-page .qz-day i{display:grid;place-items:center;aspect-ratio:1;border-radius:12px;font-style:normal;
  background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.14);color:rgba(255,255,255,.6);
  font-size:13px;font-weight:700}
.quiz-page .qz-day.done i{background:#7BEFC0;border-color:#7BEFC0;color:#083c29}
.quiz-page .qz-day.today i{background:rgba(255,255,255,.16);border-color:#7BEFC0;color:#fff;
  box-shadow:0 0 0 3px rgba(123,239,192,.22)}
.quiz-page .qz-day span{display:block;margin-top:7px;font-size:10.5px;color:rgba(255,255,255,.6);font-weight:600}
.quiz-page .qz-streak-foot{margin-top:22px;padding-top:18px;border-top:1px solid rgba(255,255,255,.14);
  display:flex;align-items:center;gap:11px}
.quiz-page .qz-streak-foot .qz-sf-ic{width:36px;height:36px;border-radius:12px;background:rgba(123,239,192,.18);
  display:grid;place-items:center;flex:none}
.quiz-page .qz-streak-foot svg{width:17px;height:17px;color:#7BEFC0}
.quiz-page .qz-streak-foot b{display:block;font-size:13.5px;font-weight:700;color:#fff;line-height:1.3}
.quiz-page .qz-streak-foot span{font-size:11.5px;color:rgba(255,255,255,.68)}

/* toast */
.quiz-page .qz-toast{position:fixed;left:50%;bottom:28px;transform:translate(-50%,20px);z-index:10000;
  background:var(--qz-ink);color:#fff;border-radius:999px;padding:12px 22px;font-size:13.5px;font-weight:600;
  box-shadow:var(--qz-sh-lg);opacity:0;visibility:hidden;transition:opacity .25s,transform .25s,visibility .25s;
  display:flex;align-items:center;gap:9px;max-width:calc(100vw - 32px)}
.quiz-page .qz-toast svg{width:16px;height:16px;color:#7BEFC0;flex:none}
.quiz-page .qz-toast.show{opacity:1;visibility:visible;transform:translate(-50%,0)}

/* ============================================================================
   RESPONSIVE
   ============================================================================ */
@media(max-width:1120px){
  .quiz-page .qz-subjects{grid-template-columns:repeat(3,1fr)}
  .quiz-page .qz-qgrid{grid-template-columns:repeat(2,1fr)}
  .quiz-page .qz-pgrid{grid-template-columns:minmax(0,1fr) 280px}
}
@media(max-width:1000px){
  .quiz-page .qz-perf{grid-template-columns:1fr}
  .quiz-page .qz-recs{grid-template-columns:repeat(2,1fr)}
  .quiz-page .qz-rec-lead{margin-inline:16px}
  .quiz-page .qz-insight-row{grid-template-columns:1fr}
}
@media(max-width:980px){
  .quiz-page .qz-hero-grid{grid-template-columns:1fr;text-align:center}
  .quiz-page .qz-vis{order:-1;min-height:410px;margin-bottom:8px;padding:24px 60px 26px}
  .quiz-page .qz-hero-art{width:min(360px,84%)}
  .quiz-page .qz-hero-sub{margin-inline:auto}
  .quiz-page .qz-hero-cta,.quiz-page .qz-trust{justify-content:center}
  .quiz-page .qz-final-grid{grid-template-columns:1fr;text-align:center}
  .quiz-page .qz-final p{margin-inline:auto}
  .quiz-page .qz-final-cta,.quiz-page .qz-final-facts{justify-content:center}
  .quiz-page .qz-streak{max-width:460px;margin-inline:auto}
  .quiz-page .qz-score-grid{grid-template-columns:1fr;justify-items:center;text-align:center}
  .quiz-page .qz-scoreboard>.qz-score-grid p{margin-inline:auto}
  .quiz-page .qz-score-act{justify-content:center}

  /* --- navigator becomes a slide-in drawer --- */
  .quiz-page .qz-pgrid{grid-template-columns:1fr}
  .quiz-page .qz-rail{position:fixed;top:0;right:0;bottom:0;width:min(340px,86vw);z-index:9996;
    border-radius:24px 0 0 24px;box-shadow:-20px 0 60px rgba(11,46,32,.24);overflow-y:auto;
    transform:translateX(102%);transition:transform .32s cubic-bezier(.2,.7,.2,1);padding:22px 22px 32px}
  .quiz-page .qz-rail.is-open{transform:none}
  .quiz-page .qz-rail-close{display:grid}
  .quiz-page .qz-navtoggle{display:inline-flex}
  .quiz-page .qz-nums{grid-template-columns:repeat(6,1fr)}
}
@media(max-width:820px){
  .quiz-page .qz-subjects{grid-template-columns:repeat(2,1fr)}
  .quiz-page .qz-score-stats{grid-template-columns:repeat(2,1fr)}
  .quiz-page .qz-attempt{grid-template-columns:auto 1fr;row-gap:16px}
  .quiz-page .qz-attempt-score{grid-column:2;text-align:left}
  .quiz-page .qz-attempt-act{grid-column:1/-1}
  .quiz-page .qz-attempt-act .qz-btn{flex:1}
  /* top bar compresses: progress bar drops, timer + submit stay */
  .quiz-page .qz-pprog{display:none}
  .quiz-page .qz-pbar-in{padding:10px 16px;gap:10px}
}
@media(max-width:680px){
  .quiz-page .qz-qgrid{grid-template-columns:1fr}
  .quiz-page .qz-recs{grid-template-columns:1fr}
  .quiz-page .qz-rings{grid-template-columns:1fr}
  .quiz-page .qz-ringcard{display:flex;align-items:center;gap:20px;text-align:left;padding:20px}
  .quiz-page .qz-ringcard .qz-dial{margin:0;flex:none;width:76px;height:76px}
  .quiz-page .qz-ringcard .qz-dial svg{width:76px;height:76px}
  .quiz-page .qz-ringcard .qz-dial em{font-size:17px}
  .quiz-page .qz-ringcard h4{margin-top:0}
  .quiz-page .qz-ringcard .qz-ringcard-txt{min-width:0}
  /* the visual keeps its two corner chips; everything shrinks rather than clips */
  .quiz-page .qz-vis{min-height:330px;padding:14px 6px 20px}
  .quiz-page .qz-hero-art{width:min(280px,72%)}
  .quiz-page .qz-sat{padding:8px 11px;border-radius:14px}
  .quiz-page .qz-sat b{font-size:12.5px}
  .quiz-page .qz-sat span{font-size:9.5px}
  .quiz-page .qz-sat--ring{top:0;left:0;gap:9px}
  .quiz-page .qz-sat--ring .qz-ring,
  .quiz-page .qz-sat--ring .qz-ring svg{width:34px;height:34px}
  .quiz-page .qz-sat--ring .qz-ring em{font-size:10px}
  .quiz-page .qz-sat--ring .qz-ring circle{stroke-width:4}
  .quiz-page .qz-sat--score{top:auto;bottom:0;right:0}
  .quiz-page .qz-sat--score b{font-size:15px}
  .quiz-page .qz-sat--timer{display:none}   /* would crowd the artwork */
  .quiz-page .qz-chips{scroll-padding-inline:24px}
  .quiz-page .qz-chips{flex-wrap:nowrap;justify-content:flex-start;overflow-x:auto;
    scroll-snap-type:x proximity;margin-inline:calc(50% - 50vw);padding:2px 24px 8px;
    scrollbar-width:none;-ms-overflow-style:none}
  .quiz-page .qz-chips::-webkit-scrollbar{display:none}
  .quiz-page .qz-chip{scroll-snap-align:start}
  .quiz-page .qz-search{flex-wrap:wrap;border-radius:24px;padding:14px 16px}
  .quiz-page .qz-search input{flex-basis:calc(100% - 90px)}
  .quiz-page .qz-search .qz-btn{width:100%;margin-top:6px}
  .quiz-page .qz-bar{flex-direction:column;align-items:flex-start}
  .quiz-page .qz-qnav{flex-direction:column;align-items:stretch}
  .quiz-page .qz-qnav .qz-spacer{display:none}
  .quiz-page .qz-qnav .qz-btn{width:100%}
  .quiz-page .qz-qpanel{padding:22px 18px;border-radius:22px}
  .quiz-page .qz-opt{padding:13px 14px;font-size:14.2px;gap:11px}
  .quiz-page .qz-pbar-txt span{display:none}
  .quiz-page .qz-timer{padding:7px 13px;font-size:14px}
  .quiz-page .qz-navtoggle span{display:none}
  .quiz-page .qz-navtoggle{padding:9px 12px}
  .quiz-page .qz-dialog-act{flex-direction:column}
  .quiz-page .qz-score-stats{grid-template-columns:repeat(2,1fr)}
  .quiz-page .qz-final-facts{gap:14px 22px}
  .quiz-page .qz-streak{padding:20px}
  .quiz-page .qz-streak-days{gap:6px}
  .quiz-page .qz-chart{gap:6px}
  .quiz-page .qz-col-lab{font-size:10px}
}
@media(max-width:440px){
  .quiz-page .qz-subjects{grid-template-columns:1fr}
  .quiz-page .qz-nums{grid-template-columns:repeat(5,1fr)}
  .quiz-page .qz-card-act{flex-wrap:wrap}
  .quiz-page .qz-card-act .qz-btn{flex:1 1 100%}
  .quiz-page .qz-score-stats{grid-template-columns:1fr}
}

@media(prefers-reduced-motion:reduce){
  .quiz-page *{animation:none!important;transition:none!important;scroll-behavior:auto!important}
  .quiz-page .qz-rv{opacity:1!important;transform:none!important}
}`;

/* Poppins is loaded once per document, on demand, so the component stays
   self-contained without duplicating <link> tags on every mount. */
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap";

function useGoogleFont() {
  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_HREF}"]`)) return;

    const preconnects = [
      { href: "https://fonts.googleapis.com", crossOrigin: false },
      { href: "https://fonts.gstatic.com", crossOrigin: true },
    ].map(({ href, crossOrigin }) => {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = href;
      if (crossOrigin) link.crossOrigin = "";
      document.head.appendChild(link);
      return link;
    });

    const sheet = document.createElement("link");
    sheet.rel = "stylesheet";
    sheet.href = FONT_HREF;
    document.head.appendChild(sheet);

    return () => {
      [...preconnects, sheet].forEach((el) => el.remove());
    };
  }, []);
}

/* ==========================================================================
   Demo data
   ========================================================================== */
/* ==========================================================================
   Presentation fallbacks

   A subject tag carries its own `icon` and `color`, set by an editor in the
   admin. Both are optional and a freshly created subject has neither, so
   these keep the tiles, cards and chart legible in the meantime: a known
   slug gets a sensible icon, and anything else falls back positionally so
   two adjacent subjects never render in the same colour.

   FALLBACK_COLORS mirrors quizzes/public_insights.py, so a subject keeps one
   accent across the tiles, the cards and the insights chart.
   ========================================================================== */
const SUBJECT_ICONS = {
  history: "qi-book", geography: "qi-globe", polity: "qi-pillar",
  economy: "qi-coin", science: "qi-flask", reasoning: "qi-puzzle",
  maths: "qi-calc", mathematics: "qi-calc", english: "qi-abc",
};
const FALLBACK_ICONS = [
  "qi-book", "qi-globe", "qi-pillar", "qi-coin",
  "qi-flask", "qi-puzzle", "qi-calc", "qi-abc",
];
const FALLBACK_COLORS = [
  "#0F9D6B", "#3b82f6", "#7C5CFC", "#FFB21D",
  "#12b3a6", "#ec4e86", "#E14D2A", "#0B5B3E",
];

function railIcon(rail, i = 0) {
  return (
    rail?.icon || SUBJECT_ICONS[rail?.slug] || FALLBACK_ICONS[i % FALLBACK_ICONS.length]
  );
}

function railColor(rail, i = 0) {
  return rail?.color || FALLBACK_COLORS[i % FALLBACK_COLORS.length];
}

/* A set is "new" for its first week. Derived from the real `created_at` the
   card serializer sends, unlike the fixture's hand-set `fresh` flag. */
const FRESH_DAYS = 7;
function isFresh(createdAt) {
  if (!createdAt) return false;
  const age = Date.now() - new Date(createdAt).getTime();
  return age >= 0 && age < FRESH_DAYS * 864e5;
}

const KEYS = ["A", "B", "C", "D"];

/* ==========================================================================
   Pure helpers
   ========================================================================== */
const nfmt = (n) => n.toLocaleString("en-IN");

/** "Today" / "Yesterday" / "4 days ago" / a date, from an ISO timestamp. */
function relativeDay(iso) {
  if (!iso) return "";
  const then = new Date(iso);
  if (Number.isNaN(then.getTime())) return "";
  const startOf = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const days = Math.round((startOf(new Date()) - startOf(then)) / 864e5);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 14) return "Last week";
  return then.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function mmss(total) {
  const s = Math.max(0, total);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m < 10 ? "0" : ""}${m}:${r < 10 ? "0" : ""}${r}`;
}



/* ==========================================================================
   Icons — one sprite in the document, referenced by <use>
   ========================================================================== */
function Icon({ id, className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <use href={`#${id}`} />
    </svg>
  );
}

function IconSprite() {
  return (
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <defs>
          <g id="qi-arrow"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></g>
          <g id="qi-check"><path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></g>
          <g id="qi-check-c"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M8.4 12.2l2.5 2.5 4.7-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></g>
          <g id="qi-x"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round"/></g>
          <g id="qi-x-c"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M9 9l6 6M15 9l-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></g>
          <g id="qi-minus-c"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M8.5 12h7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></g>
          <g id="qi-clock"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M12 7.2V12l3.2 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g>
          <g id="qi-search"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2.1"/><path d="M16.5 16.5L21 21" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round"/></g>
          <g id="qi-help"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M9.6 9.4a2.5 2.5 0 013.9-1.6c1.4.9 1.1 2.6-.2 3.3-.8.4-1.3 1-1.3 1.9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16.6" r="1.15" fill="currentColor"/></g>
          <g id="qi-users"><path d="M16 19v-1.6a3.4 3.4 0 00-3.4-3.4H6.4A3.4 3.4 0 003 17.4V19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="9.5" cy="8" r="3.3" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M21 19v-1.6a3.4 3.4 0 00-2.6-3.3M15.6 4.9a3.4 3.4 0 010 6.3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></g>
          <g id="qi-eye"><path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/></g>
          <g id="qi-flag"><path d="M5 21V4.5M5 5h11.5l-2 3.6 2 3.6H5" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"/></g>
          <g id="qi-bulb"><path d="M9.2 17.8h5.6M10 21h4M12 3a6 6 0 00-3.6 10.8c.6.5 1 1.2 1 2h5.2c0-.8.4-1.5 1-2A6 6 0 0012 3z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g>
          <g id="qi-dots"><circle cx="12" cy="5.5" r="1.7" fill="currentColor"/><circle cx="12" cy="12" r="1.7" fill="currentColor"/><circle cx="12" cy="18.5" r="1.7" fill="currentColor"/></g>
          <g id="qi-grid"><rect x="3.5" y="3.5" width="7" height="7" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/></g>
          <g id="qi-trend"><path d="M3 16.5l5.5-5.5 3.6 3.6L21 5.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.5 5.5H21v5.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></g>
          <g id="qi-target"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4.6" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/></g>
          <g id="qi-refresh"><path d="M20.5 12a8.5 8.5 0 11-2.6-6.1" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round"/><path d="M20.6 4v4.4h-4.4" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"/></g>
          <g id="qi-award"><circle cx="12" cy="9.2" r="5.6" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M8.6 13.8L7.4 21l4.6-2.4 4.6 2.4-1.2-7.2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g>
          <g id="qi-zap"><path d="M13.4 2.5L4.8 13.4h6L10.6 21.5l8.6-10.9h-6z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></g>
          <g id="qi-list"><path d="M8.5 6.5h12M8.5 12h12M8.5 17.5h12" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round"/><circle cx="4" cy="6.5" r="1.5" fill="currentColor"/><circle cx="4" cy="12" r="1.5" fill="currentColor"/><circle cx="4" cy="17.5" r="1.5" fill="currentColor"/></g>
          <g id="qi-share"><circle cx="18" cy="5.5" r="2.8" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="6" cy="12" r="2.8" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="18" cy="18.5" r="2.8" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M8.5 10.7l7-3.9M8.5 13.3l7 3.9" fill="none" stroke="currentColor" strokeWidth="2"/></g>
          <g id="qi-book"><path d="M4 4.6h5.6A2.9 2.9 0 0112 7.1v12.3a2.2 2.2 0 00-2.2-2H4z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M20 4.6h-5.6A2.9 2.9 0 0012 7.1v12.3a2.2 2.2 0 012.2-2H20z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></g>
          <g id="qi-pillar"><path d="M12 3l9 4.2H3z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M6 10v7M12 10v7M18 10v7M3.5 20.5h17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></g>
          <g id="qi-globe"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M3.3 9.5h17.4M3.3 14.5h17.4" fill="none" stroke="currentColor" strokeWidth="2"/><ellipse cx="12" cy="12" rx="4" ry="9" fill="none" stroke="currentColor" strokeWidth="2"/></g>
          <g id="qi-coin"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M14.8 8.9c-.5-.9-1.6-1.4-2.9-1.4-1.8 0-3 .9-3 2.1 0 2.8 6 1.3 6 4.2 0 1.3-1.3 2.2-3.1 2.2-1.4 0-2.5-.5-3-1.5M12 5.6v12.8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></g>
          <g id="qi-flask"><path d="M9.5 3v6.2L4.6 17.4A2.4 2.4 0 006.7 21h10.6a2.4 2.4 0 002.1-3.6L14.5 9.2V3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M8.2 3h7.6M7.2 14.6h9.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></g>
          <g id="qi-puzzle"><path d="M10 4.2a2 2 0 114 0v1.4h2.6a1.4 1.4 0 011.4 1.4V10h1.4a2 2 0 110 4H18v3a1.4 1.4 0 01-1.4 1.4H13V17a2 2 0 10-4 0v1.4H5.4A1.4 1.4 0 014 17v-3.6h1.4a2 2 0 100-4H4V7a1.4 1.4 0 011.4-1.4H10z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></g>
          <g id="qi-calc"><rect x="4.4" y="2.8" width="15.2" height="18.4" rx="3" fill="none" stroke="currentColor" strokeWidth="2"/><rect x="7.6" y="6" width="8.8" height="3.4" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.9"/><circle cx="8.4" cy="13.2" r="1.15" fill="currentColor"/><circle cx="12" cy="13.2" r="1.15" fill="currentColor"/><circle cx="15.6" cy="13.2" r="1.15" fill="currentColor"/><circle cx="8.4" cy="17.4" r="1.15" fill="currentColor"/><circle cx="12" cy="17.4" r="1.15" fill="currentColor"/><circle cx="15.6" cy="17.4" r="1.15" fill="currentColor"/></g>
          <g id="qi-abc"><path d="M3 17.5L6.4 7l3.4 10.5M4.2 14h4.4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.4 7v10.5h3.1a2.4 2.4 0 000-4.8h-3.1M16.2 12.7h.9a2.4 2.4 0 100-4.8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g>
          <g id="qi-layers"><path d="M12 3.2L2.8 8 12 12.8 21.2 8z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M2.8 16L12 20.8 21.2 16M2.8 12L12 16.8 21.2 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></g>
          <g id="qi-fire"><path d="M12 2.5s5.8 4.2 5.8 9.4a5.8 5.8 0 11-11.6 0c0-2 .9-3.6 1.9-4.8.3 1.3 1.1 2.2 2 2.4.4-2.9 1.9-5.5 1.9-7z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></g>
        </defs>
      </svg>
  );
}

/* ==========================================================================
   Behaviour 1 · scroll reveal, plus the ring / bar / progress animations
   that ride along with it (same behaviour as the other pages)
   ========================================================================== */
function animateBits(root, reduceMotion) {
  root.querySelectorAll("[data-ring]").forEach((c) => {
    const pct = +c.dataset.ring;
    const circ = +c.dataset.circ;
    const run = () => {
      c.style.strokeDashoffset = String(circ - (circ * pct) / 100);
    };
    reduceMotion ? run() : setTimeout(run, 160);
  });

  root.querySelectorAll(".qz-fill[data-w]").forEach((f) => {
    const run = () => {
      f.style.width = `${f.dataset.w}%`;
    };
    reduceMotion ? run() : setTimeout(run, 200);
  });

  root.querySelectorAll(".qz-col-bar[data-h]").forEach((b, i) => {
    const run = () => {
      b.style.height = `${b.dataset.h}%`;
    };
    reduceMotion ? run() : setTimeout(run, 120 + i * 70);
  });

  root.querySelectorAll("em[data-num]").forEach((el) => {
    const target = +el.dataset.num;
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) {
      el.textContent = target + suffix;
      return;
    }
    let start = null;
    const dur = 1200;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

/* `deps` lets the hook pick up cards that React has just rendered — a new
   filter result, a fresh page of quizzes, or the review screen. */
function useRevealOnScroll(rootRef, reduceMotion, deps = []) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll(".qz-rv:not(.in)"));
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => {
        el.classList.add("in");
        animateBits(el, reduceMotion);
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          animateBits(e.target, reduceMotion);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootRef, reduceMotion, ...deps]);
}

/* The hero console is not inside a .qz-rv wrapper, so its ring starts on load. */
function useHeroAnimation(rootRef, reduceMotion) {
  useEffect(() => {
    const vis = rootRef.current?.querySelector(".qz-vis");
    if (vis) animateBits(vis, reduceMotion);
  }, [rootRef, reduceMotion]);
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);
  return reduce;
}

/* Locks page scroll while the quiz player overlay is open. */
function useBodyLock(locked) {
  useEffect(() => {
    if (!locked) return;
    document.body.classList.add("qz-locked");
    return () => document.body.classList.remove("qz-locked");
  }, [locked]);
}

/* ==========================================================================
   Recommendation cover — radial-gradient artwork under a blurred photograph.
   Soft by construction, recolours per subject, and doubles as the fallback
   if the photo request fails.
   ========================================================================== */
function RecCover({ color, iconId, index, photo, children }) {
  const f = `qzc${index}`;
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  return (
    <div className="qz-rec-cover">
      <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id={`${f}a`} cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor={color} stopOpacity=".55" />
            <stop offset=".55" stopColor={color} stopOpacity=".22" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${f}b`} cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor={color} stopOpacity=".34" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${f}c`} cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#0F9D6B" stopOpacity=".26" />
            <stop offset="1" stopColor="#0F9D6B" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${f}w`} cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#fff" stopOpacity=".9" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <filter id={`${f}s`} x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" />
          </filter>
        </defs>
        <rect width="320" height="180" fill="#F4FAF6" />
        <ellipse cx="42" cy="34" rx="132" ry="118" fill={`url(#${f}a)`} />
        <ellipse cx="286" cy="158" rx="148" ry="126" fill={`url(#${f}b)`} />
        <ellipse cx="212" cy="12" rx="104" ry="86" fill={`url(#${f}c)`} />
        <ellipse cx="168" cy="92" rx="118" ry="88" fill={`url(#${f}w)`} />
        {/* faint answer-sheet ruling, so the band reads as a quiz */}
        <g opacity=".5" fill="#fff">
          <rect x="34" y="118" width="86" height="7" rx="3.5" />
          <rect x="34" y="134" width="62" height="7" rx="3.5" />
          <rect x="216" y="42" width="74" height="7" rx="3.5" />
          <rect x="216" y="58" width="50" height="7" rx="3.5" />
        </g>
        <g filter={`url(#${f}s)`} transform="translate(124,32) scale(3.8)" opacity=".26" color={color}>
          <use href={`#${iconId}`} />
        </g>
      </svg>

      {photo && !failed && (
        <img
          className={`qz-rec-photo${ready ? " is-ready" : ""}`}
          src={photo}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          onLoad={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      )}
      <span className="qz-rec-tint" />
      <span className="qz-rec-veil" />
      {children}
    </div>
  );
}

/* ==========================================================================
   Quiz card
   ========================================================================== */
function QuizCard({ quiz, subject, menuOpen, onToggleMenu, onMenuPick, onStart, onPreview }) {
  const color = railColor(subject, quiz.colorIndex);
  const icon = railIcon(subject, quiz.colorIndex);
  const subjectName = subject?.label || quiz.subjectName || "";

  return (
    <article className={`qz-card qz-rv${menuOpen ? " menu-open" : ""}`} style={{ "--c": color }}>
      <div className="qz-card-top">
        <span className="qz-card-ic"><Icon id={icon} /></span>

        {/* Real: this account has a submitted attempt on this set. Guests
            never see it, because they have no history to check against. */}
        {quiz.done && (
          <span className="qz-card-done"><Icon id="qi-check" />Completed</span>
        )}

        <div className={`qz-more${menuOpen ? " is-open" : ""}`}>
          <button
            type="button"
            className="qz-more-btn"
            aria-label={`More options for ${quiz.title}`}
            aria-expanded={menuOpen}
            onClick={(e) => { e.stopPropagation(); onToggleMenu(quiz.id); }}
          >
            <Icon id="qi-dots" />
          </button>
          <div className="qz-menu" role="menu">
            <button type="button" onClick={() => onMenuPick("preview", quiz)}><Icon id="qi-eye" />Preview questions</button>
            <button type="button" onClick={() => onMenuPick("syllabus", quiz)}><Icon id="qi-list" />View topics covered</button>
            {/* "Save for later" was in the design and is NOT here: there is no
                saved-list backend, and a button that toasts "Saved" while
                saving nothing is worse than an absent feature. */}
            <button type="button" onClick={() => onMenuPick("share", quiz)}><Icon id="qi-share" />Copy quiz link</button>
          </div>
        </div>
      </div>

      <div className="qz-card-body">
        <p className="qz-card-tag">
          {[subjectName, quiz.exams.join(" / ")].filter(Boolean).join(" · ")}
        </p>
        <h3>{quiz.title}</h3>
        <p className="qz-card-desc">{quiz.desc}</p>
        <div className="qz-card-meta">
          <span><Icon id="qi-help" />{quiz.count} questions</span>
          <span><Icon id="qi-clock" />{quiz.mins} minutes</span>
          <span className="qz-diff" data-d={quiz.diff} style={{ border: 0 }}><i />{quiz.diff}</span>
        </div>
      </div>

      <div className="qz-card-foot">
        {/* Submitted attempts only. A set nobody has finished says so rather
            than showing a 0 dressed up as social proof. */}
        {quiz.attempts > 0
          ? <span className="qz-attempts"><Icon id="qi-users" /><b>{nfmt(quiz.attempts)}</b> attempts</span>
          : <span className="qz-attempts"><Icon id="qi-users" />Be the first</span>}
        {quiz.fresh
          ? <span style={{ color: "#0B7A52", fontWeight: 700 }}>New this week</span>
          : <span>Auto-graded</span>}
      </div>

      <div className="qz-card-act">
        <button type="button" className="qz-btn qz-btn--solid" onClick={() => onStart(quiz.id)}>
          Start quiz <Icon id="qi-arrow" />
        </button>
        <button type="button" className="qz-btn qz-btn--quiet" onClick={() => onPreview(quiz)}>
          Preview
        </button>
      </div>
    </article>
  );
}

/* ==========================================================================
   Answer review — score, insights and the per-question breakdown
   ========================================================================== */
function ResultView({ player, timeUp, filter, onFilter, onRetake, onClose }) {
  const { quiz, answers, left } = player;

  const stats = useMemo(() => {
    let correct = 0, wrong = 0, skipped = 0;
    const byTopic = {};
    quiz.questions.forEach((q, i) => {
      const a = answers[i];
      if (a === null) skipped += 1;
      else if (a === q.a) correct += 1;
      else wrong += 1;
      /* Only REAL topics are grouped. Most bank questions carry none, and
         bucketing them all under a placeholder produced a one-row "breakdown"
         and the sentence "Weakest topic: General. Strongest: General." */
      if (!q.t) return;
      if (!byTopic[q.t]) byTopic[q.t] = { c: 0, t: 0 };
      byTopic[q.t].t += 1;
      if (a === q.a) byTopic[q.t].c += 1;
    });
    const attempted = correct + wrong;
    const topics = Object.keys(byTopic).sort(
      (a, b) => byTopic[a].c / byTopic[a].t - byTopic[b].c / byTopic[b].t
    );
    return {
      correct, wrong, skipped, byTopic, topics,
      pct: Math.round((correct / quiz.count) * 100),
      accuracy: attempted ? Math.round((correct / attempted) * 100) : 0,
      spent: quiz.mins * 60 - Math.max(0, left),
    };
  }, [quiz, answers, left]);

  const { correct, wrong, skipped, byTopic, topics, pct, accuracy, spent } = stats;

  /* A breakdown needs at least two things to break down. With one topic (or
     none) the panel says nothing, so it is omitted rather than padded. */
  const hasTopicBreakdown = topics.length >= 2;

  const verdict =
    pct >= 80 ? "Strong attempt"
      : pct >= 60 ? "Solid attempt"
        : pct >= 40 ? "Needs another pass"
          : "Worth a retake";

  const line =
    pct >= 80
      ? "You are comfortably above the cut-off range for this subject. Move on to the harder set."
      : pct >= 60
        ? "A good base. Re-read the explanations for the ones you missed and retake this set in a day or two."
        : "Read every explanation below before retaking. Most of the misses here are recall, not reasoning.";

  const weakest = topics[0];
  const strongest = topics[topics.length - 1];

  return (
    <div className="qz-result">
      <div className="qz-scoreboard">
        <div className="qz-score-grid">
          <div className="qz-bigring">
            <svg viewBox="0 0 182 182">
              <circle className="bg" cx="91" cy="91" r="85" />
              <circle className="fg" cx="91" cy="91" r="85" data-ring={pct} data-circ="534" />
            </svg>
            <div className="qz-bigring-c"><b>{pct}%</b><span>Score</span></div>
          </div>

          <div>
            <span className="qz-verdict"><Icon id="qi-award" />{verdict}</span>
            <h2 style={{ marginTop: 14 }}>{correct} out of {quiz.count} correct</h2>
            <p>{timeUp ? "Time ran out, so the attempt was submitted automatically. " : ""}{line}</p>

            <div className="qz-score-stats">
              <div className="qz-score-stat ok"><b>{correct}</b><span>Correct</span></div>
              <div className="qz-score-stat no"><b>{wrong}</b><span>Incorrect</span></div>
              <div className="qz-score-stat sk"><b>{skipped}</b><span>Skipped</span></div>
              <div className="qz-score-stat"><b>{accuracy}%</b><span>Accuracy</span></div>
            </div>

            <div className="qz-score-act">
              <button type="button" className="qz-btn qz-btn--white" onClick={() => onRetake(quiz.id)}>
                Retake this quiz <Icon id="qi-refresh" />
              </button>
              <button type="button" className="qz-btn qz-btn--outline" onClick={onClose}>
                Back to quiz hub <Icon id="qi-arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="qz-insight-row">
        <div className="qz-insight" style={{ "--c": "#0F9D6B" }}>
          <div className="qz-insight-h"><span className="qz-insight-ic"><Icon id="qi-clock" /></span><b>Time used</b></div>
          <p>
            You spent <strong>{mmss(spent)}</strong> of the {quiz.mins} minutes allowed — about{" "}
            {Math.max(1, Math.round(spent / quiz.count))} seconds per question. Aim for under{" "}
            {Math.round((quiz.mins * 60) / quiz.count)} seconds each in the real paper.
          </p>
        </div>

        {hasTopicBreakdown && (
        <div className="qz-insight" style={{ "--c": "#7C5CFC" }}>
          <div className="qz-insight-h"><span className="qz-insight-ic"><Icon id="qi-target" /></span><b>Topic breakdown</b></div>
          <div className="qz-topicbars">
            {topics.slice(0, 4).map((t) => {
              const d = byTopic[t];
              const p = Math.round((d.c / d.t) * 100);
              const c = p >= 60 ? "#0F9D6B" : p >= 40 ? "#FFB21D" : "#E14D2A";
              return (
                <div className="qz-topicbar" key={t}>
                  <span>{t}<b>{d.c}/{d.t}</b></span>
                  <div className="qz-track"><span className="qz-fill" style={{ "--c": c }} data-w={p} /></div>
                </div>
              );
            })}
          </div>
        </div>
        )}

        <div className="qz-insight" style={{ "--c": "#FFB21D" }}>
          <div className="qz-insight-h"><span className="qz-insight-ic"><Icon id="qi-bulb" /></span><b>What to do next</b></div>
          <p>
            {hasTopicBreakdown && (
              <>Weakest topic in this set: <strong>{weakest}</strong>. Strongest: <strong>{strongest}</strong>.{" "}</>
            )}
            {skipped
              ? `You left ${skipped} unanswered — in most objective papers a considered guess is worth taking. `
              : ""}
            Read the explanations below, then try the recommended set on the hub.
          </p>
        </div>
      </div>

      <div className="qz-review-head">
        <h3>Answer review</h3>
        <div className="qz-rfilters">
          {[
            ["all", `All ${quiz.count}`],
            ["correct", `Correct ${correct}`],
            ["wrong", `Incorrect ${wrong}`],
            ["skipped", `Skipped ${skipped}`],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              className="qz-rfilter"
              aria-pressed={filter === key}
              onClick={() => onFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="qz-rlist">
        {quiz.questions.map((q, i) => {
          const a = answers[i];
          const st = a === null ? "skipped" : a === q.a ? "correct" : "wrong";
          if (filter !== "all" && st !== filter) return null;

          return (
            <article className="qz-ritem" key={i}>
              <div className="qz-rtop">
                <span className="qz-topic">Q{i + 1}</span>
                {st === "correct" && <span className="qz-rbadge ok"><Icon id="qi-check-c" />Correct</span>}
                {st === "wrong" && <span className="qz-rbadge no"><Icon id="qi-x-c" />Incorrect</span>}
                {st === "skipped" && <span className="qz-rbadge sk"><Icon id="qi-minus-c" />Skipped</span>}
                {/* Most bank questions have no topic; an empty chip is noise. */}
                {q.t && <span className="qz-topic">{q.t}</span>}
              </div>

              <p className="qz-rq">{q.q}</p>

              <div className="qz-ropts">
                {q.o.map((opt, k) => {
                  const cls = k === q.a ? " is-correct" : k === a ? " is-wrong" : "";
                  const tag = k === q.a ? "Correct answer" : k === a ? "Your answer" : "";
                  return (
                    <div className={`qz-ropt${cls}`} key={k}>
                      <span className="qz-opt-k">{KEYS[k]}</span>
                      <span className="qz-opt-t">{opt}</span>
                      {tag && <small>{tag}</small>}
                    </div>
                  );
                })}
              </div>

              <div className="qz-expl show" style={{ animation: "none" }}>
                <div className="qz-expl-h"><Icon id="qi-bulb" />Explanation</div>
                <p className="qz-expl-ans">Correct answer: {KEYS[q.a]} — {q.o[q.a]}</p>
                <p>{q.e}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

/* ==========================================================================
   Component
   ========================================================================== */
export default function QuizHub() {
  const rootRef = useRef(null);
  const searchRef = useRef(null);
  const allRef = useRef(null);
  const bodyRef = useRef(null);
  const lastFocusRef = useRef(null);

  /* Effects defined above startQuiz/handleSubmit reach them through these,
     rather than depending on declaration order inside the component body.
     `submittingRef` also guards the auto-submit: the countdown effect can
     fire again before a re-render lands, and a second POST comes back 409. */
  const submittingRef = useRef(false);
  const submitNowRef = useRef(null);
  const startQuizRef = useRef(null);

  const reduceMotion = usePrefersReducedMotion();
  useGoogleFont();

  const { isAuthenticated } = useAuth();

  /* ---- browse state. `subject` / `exam` hold a tag SLUG, or "all". ---- */
  const [subject, setSubject] = useState("all");
  const [exam, setExam] = useState("all");
  const [query, setQuery] = useState("");
  /* What is typed vs what has been asked for. The input updates on every
     keystroke; `search` trails it by a debounce so the API is not called per
     character. */
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popular");
  const [openMenu, setOpenMenu] = useState(null);
  const [toast, setToast] = useState("");

  /* ---- server data ---- */
  const [rails, setRails] = useState({ subjects: [], exams: [], stats: null });
  const [railsError, setRailsError] = useState("");
  const [list, setList] = useState([]);
  const [listMeta, setListMeta] = useState({ count: 0, page: 1, hasMore: false });
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState("");
  const [summary, setSummary] = useState(null);
  const [busy, setBusy] = useState(false);

  /* ---- player state. `null` when the overlay is closed. ---- */
  const [player, setPlayer] = useState(null);
  const [railOpen, setRailOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reviewFilter, setReviewFilter] = useState("all");
  const [timeUp, setTimeUp] = useState(false);

  const playerOpen = player !== null;
  useBodyLock(playerOpen);

  /* Subject rails keyed by slug, with the positional index frozen in — the
     tiles, the cards and the chart all resolve a subject's accent through
     this, so an untinted subject keeps ONE colour across all three rather
     than changing as it moves position in a filtered list. */
  const subjectsBySlug = useMemo(() => {
    const map = new Map();
    rails.subjects.forEach((s, i) => map.set(s.slug, { ...s, index: i }));
    return map;
  }, [rails.subjects]);

  /* Slugs of sets this account has already submitted. Empty for a guest,
     which is why the "Completed" tick simply never appears for one. */
  const doneSlugs = useMemo(
    () => new Set((summary?.recent || []).map((r) => r.set_slug)),
    [summary]
  );

  const visible = useMemo(
    () => list.map((z) => ({
      ...z,
      done: doneSlugs.has(z.slug),
      /* Real, from the set's created_at — not the fixture's hand-set flag. */
      fresh: isFresh(z.createdAt),
      colorIndex: subjectsBySlug.get(z.subject)?.index ?? 0,
    })),
    [list, doneSlugs, subjectsBySlug]
  );

  /* ⚠ `summary` MUST be in here. The hook observes `.qz-rv:not(.in)` when its
     deps change, and the three signed-in panels mount only once the summary
     arrives — later than everything else on the page. Without it they are
     never observed, so they never get the `in` class: the rings sit at 0%
     and the chart bars render at zero height over perfectly good data. */
  useRevealOnScroll(rootRef, reduceMotion, [
    visible.length, player?.quiz.id, player?.submitted, summary,
  ]);
  useHeroAnimation(rootRef, reduceMotion);

  /* ---- toast ---- */
  const showToast = useCallback((msg) => setToast(msg), []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  /* ---- close any open card menu on an outside click ---- */
  useEffect(() => {
    if (!openMenu) return;
    const close = () => setOpenMenu(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [openMenu]);

  /* ======================================================================
     Server data
     ====================================================================== */

  /* Rails + hero counts. Once per mount — they do not depend on the filters. */
  useEffect(() => {
    const ac = new AbortController();
    getRails(ac.signal)
      .then((data) => setRails({
        subjects: data.subjects || [],
        exams: data.exams || [],
        stats: data.stats || null,
      }))
      .catch((err) => {
        if (err.name === "AbortError") return;
        /* Say so rather than rendering an empty rail that reads as "there are
           no subjects" — an outage and an empty bank look identical
           otherwise, which is exactly how a dead backend once got read as
           empty content elsewhere in this codebase. */
        setRailsError(err.message);
      });
    return () => ac.abort();
  }, []);

  /* Debounce the search box. Without this every keystroke is a request. */
  useEffect(() => {
    const t = setTimeout(() => setSearch(query.trim()), 350);
    return () => clearTimeout(t);
  }, [query]);

  /* The set grid. Refetches from page 1 whenever a filter changes; "Show
     more" appends the next page instead. */
  useEffect(() => {
    const ac = new AbortController();
    setListLoading(true);
    setListError("");
    getSets({ subject, exam, q: search, ordering: sort, page: 1 }, ac.signal)
      .then((data) => {
        setList((data.results || []).map(normalizeSet));
        setListMeta({
          count: data.count ?? 0,
          page: 1,
          hasMore: Boolean(data.next),
        });
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setList([]);
        setListMeta({ count: 0, page: 1, hasMore: false });
        setListError(err.message);
      })
      .finally(() => setListLoading(false));
    return () => ac.abort();
  }, [subject, exam, search, sort]);

  /* The signed-in panels. Refetched when auth changes so signing in fills
     them without a reload — and signing out CLEARS them rather than leaving
     the previous account's figures on screen. */
  useEffect(() => {
    if (!isAuthenticated) { setSummary(null); return undefined; }
    const ac = new AbortController();
    getPersonalSummary(ac.signal)
      .then((data) => setSummary(data && data.has_attempts ? data : null))
      .catch(() => setSummary(null));
    return () => ac.abort();
  }, [isAuthenticated]);

  /* `/quiz?set=<slug>` opens that set directly — this is what the card's
     "Copy quiz link" hands out, so it has to actually work. Runs once, after
     the first page of sets has loaded so the attempt can be titled properly,
     and strips the parameter so a refresh does not restart the attempt. */
  const deepLinkRef = useRef(false);
  useEffect(() => {
    if (deepLinkRef.current || listLoading) return;
    const slug = new URLSearchParams(window.location.search).get("set");
    if (!slug) return;
    deepLinkRef.current = true;
    window.history.replaceState({}, "", window.location.pathname);
    startQuizRef.current?.(slug);
  }, [listLoading]);

  const loadMore = useCallback(() => {
    const next = listMeta.page + 1;
    setListLoading(true);
    getSets({ subject, exam, q: search, ordering: sort, page: next })
      .then((data) => {
        setList((cur) => [...cur, ...(data.results || []).map(normalizeSet)]);
        setListMeta({
          count: data.count ?? 0,
          page: next,
          hasMore: Boolean(data.next),
        });
      })
      .catch((err) => setListError(err.message))
      .finally(() => setListLoading(false));
  }, [subject, exam, search, sort, listMeta.page]);

  /* After an attempt lands, the panels and the attempt counts are stale. */
  const refreshAfterAttempt = useCallback(() => {
    if (isAuthenticated) {
      getPersonalSummary()
        .then((data) => setSummary(data && data.has_attempts ? data : null))
        .catch(() => {});
    }
    getSets({ subject, exam, q: search, ordering: sort, page: 1 })
      .then((data) => {
        setList((data.results || []).map(normalizeSet));
        setListMeta({ count: data.count ?? 0, page: 1, hasMore: Boolean(data.next) });
      })
      .catch(() => {});
  }, [isAuthenticated, subject, exam, search, sort]);

  const scrollToQuizzes = useCallback(() => {
    const el = allRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 70;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  }, [reduceMotion]);

  const pickChip = (group, value) => {
    if (group === "subject") setSubject(value); else setExam(value);
    scrollToQuizzes();
  };

  const pickSubjectCard = (slug) => {
    setSubject(slug);
    setExam("all");
    scrollToQuizzes();
  };

  const resetFilters = () => {
    setSubject("all"); setExam("all"); setQuery(""); setSearch(""); setSort("popular");
  };

  /* ---- card kebab menu ----
     Preview and topics need the PAPER, which the card list deliberately does
     not carry (a list of 20 sets must not drag 200 questions behind it), so
     both fetch the set on demand. */
  const onMenuPick = useCallback(async (action, quiz) => {
    setOpenMenu(null);

    if (action === "share") {
      const url = `${window.location.origin}/quiz?set=${encodeURIComponent(quiz.slug)}`;
      try {
        await navigator.clipboard.writeText(url);
        showToast("Quiz link copied to clipboard");
      } catch {
        /* Clipboard access is denied in some browsers and over plain http.
           Saying so beats a success toast for something that did not happen. */
        showToast(url);
      }
      return;
    }

    try {
      const detail = await getSet(quiz.slug);
      const questions = (detail.questions || []).map(normalizeQuestion);
      if (!questions.length) {
        showToast("This set has no questions ready yet.");
        return;
      }
      if (action === "preview") {
        showToast(`Preview: ${questions[0].q.slice(0, 52)}…`);
      } else {
        const topics = [...new Set(questions.map((q) => q.t))].slice(0, 4).join(", ");
        showToast(topics ? `Topics: ${topics}` : "No topics recorded for this set yet.");
      }
    } catch (err) {
      showToast(err.message);
    }
  }, [showToast]);

  /* ======================================================================
     Quiz player
     ====================================================================== */
  /**
   * Open a set and start an attempt.
   *
   * ⚠ THE PAPER COMES FROM THE POST, NOT FROM THE CARD. Starting an attempt
   * snapshots the questions server-side, and those are the ones that will be
   * graded and reviewed — a set's membership is a live query and drifts as
   * curation lands. Rendering the detail endpoint's questions instead would
   * eventually show a learner a review of questions they were never asked.
   */
  const startQuiz = useCallback(async (slug) => {
    if (busy) return;
    const card = list.find((z) => z.slug === slug);

    lastFocusRef.current = document.activeElement;
    setBusy(true);
    try {
      const started = await startAttempt(slug);
      const questions = (started.questions || []).map(normalizeQuestion);
      if (!questions.length) {
        showToast("This set has no questions ready yet.");
        return;
      }

      const minutes = card?.mins ?? 10;
      setRailOpen(false);
      setDialogOpen(false);
      setReviewFilter("all");
      setTimeUp(false);
      setPlayer({
        quiz: {
          ...(card || {}),
          id: slug,
          slug,
          title: card?.title || started.title || "Practice set",
          mins: minutes,
          /* What was actually SERVED, which can be fewer than the set's
             target if curation has not caught up. */
          count: questions.length,
          questions,
        },
        i: 0,
        answers: Array(questions.length).fill(null),
        marked: Array(questions.length).fill(false),
        seen: Array(questions.length).fill(false),
        left: minutes * 60,
        submitted: false,
        attemptId: started.attempt_id,
      });
    } catch (err) {
      /* Covers the flag being off (503), the throttle (429) and a set whose
         questions were unpublished since the page loaded (409). Each carries
         the server's own sentence. */
      showToast(err.message);
    } finally {
      setBusy(false);
    }
  }, [busy, list, showToast]);

  /** Reopen a past attempt's review — the real one, by id. */
  const openReview = useCallback(async (attemptId, setSlug) => {
    if (busy) return;
    setBusy(true);
    try {
      const review = await getAttemptReview(attemptId);
      lastFocusRef.current = document.activeElement;
      setRailOpen(false);
      setDialogOpen(false);
      setReviewFilter("all");
      setTimeUp(false);
      setPlayer(playerFromReview(review, list.find((z) => z.slug === setSlug)));
    } catch (err) {
      showToast(err.message);
    } finally {
      setBusy(false);
    }
  }, [busy, list, showToast]);

  const closeQuiz = useCallback(() => {
    setPlayer(null);
    setRailOpen(false);
    setDialogOpen(false);
    lastFocusRef.current?.focus?.();
  }, []);

  /* countdown — runs only while an attempt is live. The interval does nothing
     but decrement; auto-submit is handled by the effect below so no side effect
     ever runs inside a state updater. */
  useEffect(() => {
    if (!player || player.submitted) return;
    const t = setInterval(() => {
      setPlayer((p) => (!p || p.submitted ? p : { ...p, left: Math.max(0, p.left - 1) }));
    }, 1000);
    return () => clearInterval(t);
  }, [player?.quiz.id, player?.submitted]);

  /* time up — auto-submit exactly once. */
  useEffect(() => {
    if (!player || player.submitted || player.left > 0) return;
    if (submittingRef.current) return;
    setTimeUp(true);
    submitNowRef.current?.();
  }, [player?.left, player?.submitted, player?.quiz.id]);

  /* mark the current question seen as it is shown */
  useEffect(() => {
    if (!player || player.submitted) return;
    setPlayer((p) => {
      if (!p || p.seen[p.i]) return p;
      const seen = [...p.seen];
      seen[p.i] = true;
      return { ...p, seen };
    });
  }, [player?.i, player?.quiz.id, player?.submitted]);

  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = 0; }, [player?.i, player?.submitted]);

  const goTo = useCallback((i) => {
    setPlayer((p) => (!p || i < 0 || i >= p.quiz.count ? p : { ...p, i }));
    setRailOpen(false);
  }, []);

  const pickAnswer = useCallback((k) => {
    setPlayer((p) => {
      if (!p || p.submitted) return p;
      const answers = [...p.answers];
      answers[p.i] = k;
      return { ...p, answers };
    });
  }, []);

  const clearAnswer = useCallback(() => {
    setPlayer((p) => {
      if (!p) return p;
      const answers = [...p.answers];
      answers[p.i] = null;
      return { ...p, answers };
    });
  }, []);

  const toggleMark = useCallback(() => {
    setPlayer((p) => {
      if (!p) return p;
      const marked = [...p.marked];
      marked[p.i] = !marked[p.i];
      return { ...p, marked };
    });
  }, []);

  /**
   * Submit the attempt and switch to the review.
   *
   * ⚠ THE SCORE COMES BACK FROM THE SERVER; it is not computed here. Until
   * this response arrives the browser does not know a single correct answer —
   * the public serializer omits `is_correct` and `explanation`, which is what
   * keeps the answer key off the wire while the attempt is live. `applyReview`
   * folds them onto the questions so the review screen renders unchanged.
   */
  const handleSubmit = useCallback(async () => {
    if (!player || player.submitted || submittingRef.current) return;
    submittingRef.current = true;
    setBusy(true);
    setDialogOpen(false);
    setRailOpen(false);

    try {
      const review = await submitAttempt(
        player.attemptId,
        buildAnswerPayload(player.quiz.questions, player.answers)
      );
      setPlayer((p) => (p ? {
        ...p,
        submitted: true,
        score: review.score,
        quiz: { ...p.quiz, questions: applyReview(p.quiz.questions, review) },
      } : p));
      showToast(`Attempt submitted — score ${review.score}/${review.total}`);
      refreshAfterAttempt();
    } catch (err) {
      /* The attempt is NOT flipped to submitted on failure — the learner keeps
         their answers and can retry, rather than being dropped onto a review
         screen with no results in it. */
      showToast(err.message);
    } finally {
      submittingRef.current = false;
      setBusy(false);
    }
  }, [player, showToast, refreshAfterAttempt]);

  submitNowRef.current = handleSubmit;
  startQuizRef.current = startQuiz;

  const requestExit = useCallback(() => {
    if (!player) return;
    if (player.submitted) { closeQuiz(); return; }
    if (window.confirm("Leave this attempt? Your answers will not be saved.")) closeQuiz();
  }, [player, closeQuiz]);

  /* ---- keyboard shortcuts inside the player ---- */
  useEffect(() => {
    if (!playerOpen) return;
    const onKey = (e) => {
      if (dialogOpen) { if (e.key === "Escape") setDialogOpen(false); return; }
      if (e.key === "Escape") {
        if (railOpen) { setRailOpen(false); return; }
        requestExit();
        return;
      }
      if (player.submitted) return;
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;

      if (e.key === "ArrowRight") goTo(player.i + 1);
      else if (e.key === "ArrowLeft") goTo(player.i - 1);
      else if (/^[1-4]$/.test(e.key)) pickAnswer(+e.key - 1);
      else if (/^[a-dA-D]$/.test(e.key)) pickAnswer(e.key.toLowerCase().charCodeAt(0) - 97);
      else if (e.key.toLowerCase() === "m") toggleMark();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [playerOpen, dialogOpen, railOpen, player, goTo, pickAnswer, toggleMark, requestExit]);

  /* ---- derived player figures ---- */
  const tally = useMemo(() => {
    if (!player) return { answered: 0, review: 0, left: 0 };
    const answered = player.answers.filter((a) => a !== null).length;
    return {
      answered,
      review: player.marked.filter(Boolean).length,
      left: player.quiz.count - answered,
    };
  }, [player]);

  const statusOf = (i) => {
    if (!player) return "unseen";
    if (player.submitted) {
      if (player.answers[i] === null) return "skipped";
      return player.answers[i] === player.quiz.questions[i].a ? "correct" : "wrong";
    }
    const answered = player.answers[i] !== null;
    if (answered && player.marked[i]) return "answered-review";
    if (player.marked[i]) return "review";
    if (answered) return "answered";
    if (player.seen[i]) return "skipped";
    return "unseen";
  };

  const q = player && !player.submitted ? player.quiz.questions[player.i] : null;
  /* ---- signed-in panel figures ----
     Every card here is computed from this account's own submitted attempts.
     The design's fixture also carried "+6% this month" and "Top 12% of
     learners"; neither is here, because neither can be derived from one
     person's attempts, and a confident wrong number about someone's own work
     is the worst thing this page could do. A card whose figure is null (no
     answered questions in that subject yet) is dropped rather than shown
     as 0%. */
  const chartData = useMemo(
    () => (summary?.by_subject || [])
      .filter((row) => row.accuracy !== null)
      .sort((a, b) => b.accuracy - a.accuracy),
    [summary]
  );

  const perfRings = useMemo(() => {
    if (!summary) return [];
    const t = summary.totals;
    const rings = [];

    if (t.accuracy !== null) {
      rings.push({
        c: "#0F9D6B", v: t.accuracy, ring: t.accuracy, suffix: "%", h: "Accuracy",
        p: `${nfmt(t.questions_correct)} correct out of ${nfmt(t.questions_answered)} answered`,
      });
    }
    if (t.attempt_rate !== null) {
      rings.push({
        c: "#7C5CFC", v: t.attempt_rate, ring: t.attempt_rate, suffix: "%", h: "Attempt rate",
        p: `You answered ${nfmt(t.questions_answered)} of the ${nfmt(t.questions_served)} questions you were shown`,
        /* Only stated when it is true, and it is a fact about the figure
           beside it rather than a claim about a trend. */
        d: t.attempt_rate >= 90 ? "You leave very few blank" : "Blanks score nothing — guess",
        di: t.attempt_rate >= 90 ? "qi-check-c" : "qi-target",
        down: t.attempt_rate < 90,
      });
    }
    if (t.average_score !== null) {
      rings.push({
        c: "#12b3a6", v: t.average_score, ring: t.average_score, suffix: "%", h: "Average score",
        p: `Across ${nfmt(t.attempts)} completed ${t.attempts === 1 ? "set" : "sets"}`,
      });
    }
    if (summary.best_subject) {
      rings.push({
        c: "#FFB21D", v: summary.best_subject.accuracy, ring: summary.best_subject.accuracy,
        suffix: "%", h: "Best subject",
        p: `${summary.best_subject.label} — your strongest area so far`,
        d: "Your strongest", di: "qi-award",
      });
    }
    if (summary.weak_subject && summary.weak_subject.slug !== summary.best_subject?.slug) {
      rings.push({
        c: "#E14D2A", v: summary.weak_subject.accuracy, ring: summary.weak_subject.accuracy,
        suffix: "%", h: "Weak subject",
        p: `${summary.weak_subject.label} — worth practising next`,
        d: "Needs practice", di: "qi-target", down: true,
      });
    }
    /* Days, not a percentage — the ring is filled against a seven-day week
       and capped, while the number shown is the real count. */
    rings.push({
      c: "#3b82f6", v: t.streak_days, ring: Math.min(100, Math.round((t.streak_days / 7) * 100)),
      suffix: t.streak_days === 1 ? " day" : " days", h: "Current streak",
      p: t.streak_days
        ? "Consecutive days with a completed set"
        : "Complete a set today to start a streak",
      d: t.streak_days ? "Keep it going" : null, di: "qi-zap",
    });
    return rings;
  }, [summary]);

  const playerRail = player ? subjectsBySlug.get(player.quiz.subject) : null;
  const sb = player
    ? {
      name: playerRail?.label || player.quiz.subjectName || "Practice",
      color: railColor(playerRail, playerRail?.index ?? 0),
      icon: railIcon(playerRail, playerRail?.index ?? 0),
    }
    : null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: QUIZ_PAGE_CSS }} />

      {/* Page content only — the global header, navbar and footer live outside
          this wrapper. Everything below is scoped to .quiz-page. */}
      <main className="quiz-page" ref={rootRef}>
        <IconSprite />

        {/* ==================== 1 · HERO ==================== */}
        <section className="qz-hero">
          <div className="qz-grid-bg" />
          <div className="qz-wrap">
            <div className="qz-hero-grid">

              <div className="qz-hero-copy qz-rv">
                <span className="qz-badge"><i aria-hidden="true" />Practice &amp; Assessment</span>
                <h1>Test your knowledge.<br /><span className="qz-em">Master every subject.</span></h1>
                <p className="qz-hero-sub">
                  Practice topic-focused quizzes, improve accuracy, and build confidence with instant
                  explanations and performance insights after every attempt.
                </p>

                <div className="qz-hero-cta">
                  <button
                    type="button"
                    className="qz-btn qz-btn--solid"
                    disabled={busy}
                    onClick={() => (visible[0] ? startQuiz(visible[0].slug) : scrollToQuizzes())}
                  >
                    Start practicing <Icon id="qi-arrow" />
                  </button>
                  <a className="qz-btn qz-btn--ghost" href="#qz-subjects">
                    Browse subjects <Icon id="qi-arrow" />
                  </a>
                </div>

                {/* Real counts from the bank. The design shipped "1,000+
                    questions" and "50+ subjects" as copy; the build guide's
                    instruction was to make them real or cut them, so they are
                    rendered only once the server has said what they are —
                    never as a placeholder number. */}
                <div className="qz-trust">
                  {rails.stats && (
                    <>
                      <div>
                        <Icon id="qi-help" />
                        <b>{nfmt(rails.stats.questions)}</b>
                        <span>{rails.stats.questions === 1 ? "question" : "questions"}</span>
                      </div>
                      <div>
                        <Icon id="qi-layers" />
                        <b>{nfmt(rails.stats.subjects)}</b>
                        <span>{rails.stats.subjects === 1 ? "subject" : "subjects"}</span>
                      </div>
                    </>
                  )}
                  <div><Icon id="qi-bulb" /><b>Instant</b><span>explanations</span></div>
                  <div><Icon id="qi-check-c" /><b>Free</b><span>to practice</span></div>
                </div>
              </div>

              {/* hero visual: exam illustration on the brand disc */}
              <div className="qz-vis">
                <div className="qz-vis-disc" aria-hidden="true" />
                <span className="qz-spark s1" aria-hidden="true" />
                <span className="qz-spark s2" aria-hidden="true" />
                <span className="qz-spark s3" aria-hidden="true" />

                <div className="qz-hero-art">
          <svg className="qz-hero-illus" viewBox="30 40 440 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Student taking a timed exam"><g id="freepik--exams-sheet--inject-93"><path d="M381.66,382.87H228.17a6.52,6.52,0,0,1-6.59-7.16l19.35-248.24a7.87,7.87,0,0,1,7.71-7.16H402.12a6.53,6.53,0,0,1,6.6,7.16L389.37,375.71A7.88,7.88,0,0,1,381.66,382.87Z" style={{ fill: '#0B2E20' }} /><path d="M381.66,382.87H228.17a6.52,6.52,0,0,1-6.59-7.16l19.35-248.24a7.87,7.87,0,0,1,7.71-7.16H402.12a6.53,6.53,0,0,1,6.6,7.16L389.37,375.71A7.88,7.88,0,0,1,381.66,382.87Z" style={{ fill: '#fff', opacity: '0.2' }} /><path d="M360.87,136.54h-73.5a2.28,2.28,0,0,1-2.31-2.5l1.13-14.51a2.76,2.76,0,0,1,2.7-2.51h73.5a2.28,2.28,0,0,1,2.3,2.51L363.56,134A2.75,2.75,0,0,1,360.87,136.54Z" style={{ fill: '#8FE3C0' }} /><path d="M360.87,136.54h-73.5a2.28,2.28,0,0,1-2.31-2.5l1.13-14.51a2.76,2.76,0,0,1,2.7-2.51h73.5a2.28,2.28,0,0,1,2.3,2.51L363.56,134A2.75,2.75,0,0,1,360.87,136.54Z" style={{ opacity: '0.2', isolation: 'isolate' }} /><path d="M331,121.53h-11.5l.45-5.76a6.32,6.32,0,0,1,6.19-5.75h0a5.25,5.25,0,0,1,5.31,5.75Z" style={{ fill: '#8FE3C0' }} /><path d="M331,121.53h-11.5l.45-5.76a6.32,6.32,0,0,1,6.19-5.75h0a5.25,5.25,0,0,1,5.31,5.75Z" style={{ fill: '#fff', opacity: '0.4' }} /><polygon points="379.59 372.5 231.85 372.5 250.71 130.67 398.44 130.67 379.59 372.5" style={{ fill: '#fff' }} /><path d="M347.2,143.33H300a5.38,5.38,0,0,1-5.43-5.9l.6-7.68a6.49,6.49,0,0,1,6.35-5.9h47.21a5.39,5.39,0,0,1,5.44,5.9l-.6,7.68A6.51,6.51,0,0,1,347.2,143.33Zm-45.86-17.47a4.28,4.28,0,0,0-4.19,3.89l-.6,7.68a3.55,3.55,0,0,0,3.58,3.9h47.22a4.29,4.29,0,0,0,4.2-3.9l.6-7.68a3.56,3.56,0,0,0-3.59-3.89Z" style={{ fill: '#8FE3C0' }} /><g style={{ opacity: '0.4' }}><path d="M347.2,143.33H300a5.38,5.38,0,0,1-5.43-5.9l.6-7.68a6.49,6.49,0,0,1,6.35-5.9h47.21a5.39,5.39,0,0,1,5.44,5.9l-.6,7.68A6.51,6.51,0,0,1,347.2,143.33Zm-45.86-17.47a4.28,4.28,0,0,0-4.19,3.89l-.6,7.68a3.55,3.55,0,0,0,3.58,3.9h47.22a4.29,4.29,0,0,0,4.2-3.9l.6-7.68a3.56,3.56,0,0,0-3.59-3.89Z" style={{ fill: '#fff' }} /></g><path d="M344.76,128.28h-40a1.25,1.25,0,0,1-1.27-1.37l.31-4a1.52,1.52,0,0,1,1.49-1.37h40a1.24,1.24,0,0,1,1.26,1.37l-.31,4A1.51,1.51,0,0,1,344.76,128.28Z" style={{ fill: '#8FE3C0' }} /><polygon points="378.63 166 266.63 166 267.58 153.78 379.58 153.78 378.63 166" style={{ fill: '#8FE3C0' }} /><polygon points="333.3 183.01 258.74 183.01 258.99 179.86 333.55 179.86 333.3 183.01" style={{ fill: '#8FE3C0' }} /><polygon points="332.6 192.11 258.04 192.11 258.28 188.95 332.84 188.95 332.6 192.11" style={{ fill: '#8FE3C0' }} /><polygon points="331.89 201.21 257.33 201.21 257.57 198.05 332.13 198.05 331.89 201.21" style={{ fill: '#8FE3C0' }} /><polygon points="331.18 210.3 256.62 210.3 256.86 207.15 331.42 207.15 331.18 210.3" style={{ fill: '#8FE3C0' }} /><polygon points="380.1 210.3 349.68 210.3 352.06 179.86 382.48 179.86 380.1 210.3" style={{ fill: '#8FE3C0' }} /><path d="M371.68,191.16c.14-1.78-1.24-3-3.74-3a6.44,6.44,0,0,0-5.16,2.2l-1.92-1.45a9.41,9.41,0,0,1,7.45-3.12c4,0,6.46,1.87,6.21,5-.36,4.65-5.31,5-5.59,8.61h-2.79C366.49,195,371.43,194.36,371.68,191.16Zm-6.28,12.73a1.92,1.92,0,0,1,2-1.78,1.59,1.59,0,0,1,1.64,1.78,1.93,1.93,0,0,1-1.92,1.78A1.61,1.61,0,0,1,365.4,203.89Z" style={{ fill: '#fff' }} /><polygon points="329.71 229.08 255.15 229.08 255.4 225.92 329.96 225.92 329.71 229.08" style={{ fill: '#8FE3C0' }} /><polygon points="329 238.17 254.44 238.17 254.69 235.02 329.25 235.02 329 238.17" style={{ fill: '#8FE3C0' }} /><polygon points="328.3 247.27 253.74 247.27 253.98 244.12 328.54 244.12 328.3 247.27" style={{ fill: '#8FE3C0' }} /><polygon points="327.59 256.37 253.03 256.37 253.27 253.21 327.83 253.21 327.59 256.37" style={{ fill: '#8FE3C0' }} /><polygon points="376.51 256.37 346.09 256.37 348.46 225.92 378.88 225.92 376.51 256.37" style={{ fill: '#8FE3C0' }} /><path d="M368.09,237.23c.14-1.79-1.24-3-3.74-3a6.44,6.44,0,0,0-5.16,2.2L357.27,235a9.38,9.38,0,0,1,7.45-3.12c4,0,6.46,1.87,6.21,5-.36,4.65-5.31,5-5.59,8.61h-2.79C362.89,241,367.84,240.43,368.09,237.23ZM361.81,250a1.92,1.92,0,0,1,1.95-1.79A1.59,1.59,0,0,1,365.4,250a1.94,1.94,0,0,1-1.92,1.78A1.61,1.61,0,0,1,361.81,250Z" style={{ fill: '#fff' }} /><polygon points="326.12 275.14 251.56 275.14 251.81 271.99 326.37 271.99 326.12 275.14" style={{ fill: '#8FE3C0' }} /><polygon points="325.41 284.24 250.85 284.24 251.1 281.08 325.66 281.08 325.41 284.24" style={{ fill: '#8FE3C0' }} /><polygon points="324.7 293.34 250.15 293.34 250.39 290.18 324.95 290.18 324.7 293.34" style={{ fill: '#8FE3C0' }} /><polygon points="324 302.43 249.44 302.43 249.68 299.28 324.24 299.28 324 302.43" style={{ fill: '#8FE3C0' }} /><polygon points="372.92 302.43 342.5 302.43 344.87 271.99 375.29 271.99 372.92 302.43" style={{ fill: '#8FE3C0' }} /><path d="M364.5,283.29c.14-1.78-1.24-3-3.75-3a6.43,6.43,0,0,0-5.15,2.2L353.68,281a9.38,9.38,0,0,1,7.45-3.12c4,0,6.45,1.86,6.21,4.95-.36,4.66-5.31,5-5.59,8.61H359C359.3,287.11,364.25,286.49,364.5,283.29ZM358.22,296a1.92,1.92,0,0,1,1.95-1.78,1.59,1.59,0,0,1,1.64,1.78,1.93,1.93,0,0,1-1.92,1.78A1.6,1.6,0,0,1,358.22,296Z" style={{ fill: '#fff' }} /><polygon points="322.53 321.21 247.97 321.21 248.22 318.05 322.78 318.05 322.53 321.21" style={{ fill: '#8FE3C0' }} /><polygon points="321.82 330.31 247.26 330.31 247.51 327.15 322.07 327.15 321.82 330.31" style={{ fill: '#8FE3C0' }} /><polygon points="321.11 339.4 246.55 339.4 246.8 336.25 321.36 336.25 321.11 339.4" style={{ fill: '#8FE3C0' }} /><polygon points="320.4 348.5 245.84 348.5 246.09 345.34 320.65 345.34 320.4 348.5" style={{ fill: '#8FE3C0' }} /><polygon points="369.33 348.5 338.91 348.5 341.28 318.05 371.7 318.05 369.33 348.5" style={{ fill: '#8FE3C0' }} /><path d="M360.91,329.36c.14-1.79-1.24-3-3.75-3a6.42,6.42,0,0,0-5.15,2.2l-1.92-1.45a9.38,9.38,0,0,1,7.45-3.12c4,0,6.45,1.87,6.21,5-.36,4.65-5.31,5-5.59,8.61h-2.79C355.71,333.17,360.66,332.56,360.91,329.36Zm-6.28,12.73a1.92,1.92,0,0,1,1.95-1.79,1.59,1.59,0,0,1,1.64,1.79,1.94,1.94,0,0,1-1.92,1.78A1.61,1.61,0,0,1,354.63,342.09Z" style={{ fill: '#fff' }} /><polygon points="378.63 166 266.63 166 267.58 153.78 379.58 153.78 378.63 166" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><polygon points="333.3 183.01 258.74 183.01 258.99 179.86 333.55 179.86 333.3 183.01" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><polygon points="332.6 192.11 258.04 192.11 258.28 188.95 332.84 188.95 332.6 192.11" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><polygon points="331.89 201.21 257.33 201.21 257.57 198.05 332.13 198.05 331.89 201.21" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><polygon points="331.18 210.3 256.62 210.3 256.86 207.15 331.42 207.15 331.18 210.3" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><polygon points="380.1 210.3 349.68 210.3 352.06 179.86 382.48 179.86 380.1 210.3" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><polygon points="329.71 229.08 255.15 229.08 255.4 225.92 329.96 225.92 329.71 229.08" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><polygon points="329 238.17 254.44 238.17 254.69 235.02 329.25 235.02 329 238.17" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><polygon points="328.3 247.27 253.74 247.27 253.98 244.12 328.54 244.12 328.3 247.27" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><polygon points="327.59 256.37 253.03 256.37 253.27 253.21 327.83 253.21 327.59 256.37" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><polygon points="376.51 256.37 346.09 256.37 348.46 225.92 378.88 225.92 376.51 256.37" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><polygon points="326.12 275.14 251.56 275.14 251.81 271.99 326.37 271.99 326.12 275.14" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><polygon points="325.41 284.24 250.85 284.24 251.1 281.08 325.66 281.08 325.41 284.24" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><polygon points="324.7 293.34 250.15 293.34 250.39 290.18 324.95 290.18 324.7 293.34" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><polygon points="324 302.43 249.44 302.43 249.68 299.28 324.24 299.28 324 302.43" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><polygon points="372.92 302.43 342.5 302.43 344.87 271.99 375.29 271.99 372.92 302.43" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><polygon points="322.53 321.21 247.97 321.21 248.22 318.05 322.78 318.05 322.53 321.21" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><polygon points="321.82 330.31 247.26 330.31 247.51 327.15 322.07 327.15 321.82 330.31" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><polygon points="321.11 339.4 246.55 339.4 246.8 336.25 321.36 336.25 321.11 339.4" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><polygon points="320.4 348.5 245.84 348.5 246.09 345.34 320.65 345.34 320.4 348.5" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><polygon points="369.33 348.5 338.91 348.5 341.28 318.05 371.7 318.05 369.33 348.5" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /></g><g id="freepik--Chair--inject-93"><path d="M200,257v27.54a21,21,0,0,1-5.85,14.57L168.45,326H183l26.7-26.28a21.08,21.08,0,0,0,6.3-15V257Z" style={{ fill: '#8FE3C0' }} /><path d="M216,257v27.69a20.24,20.24,0,0,1-.52,4.61,20.91,20.91,0,0,1-5.78,10.42L183,326H168.45l25.7-26.89A21,21,0,0,0,200,284.54V257Z" style={{ fill: '#fff', opacity: '0.4' }} /><path d="M216,257v27.69a20.24,20.24,0,0,1-.52,4.61L200,283.05V257Z" style={{ opacity: '0.2', isolation: 'isolate' }} /><path d="M158.34,329,136.8,411.06a3.48,3.48,0,0,1-3.37,2.61H94.94a2.08,2.08,0,0,1-1.64-.81,2.05,2.05,0,0,1-.36-1.79L114.49,329h-4.14L89.07,410.05a6.09,6.09,0,0,0,5.87,7.62h38.49a7.49,7.49,0,0,0,7.24-5.59L162.47,329Z" style={{ fill: '#8FE3C0' }} /><g style={{ opacity: '0.4', isolation: 'isolate' }}><path d="M158.34,329,136.8,411.06a3.48,3.48,0,0,1-3.37,2.61H94.94a2.08,2.08,0,0,1-1.64-.81,2.05,2.05,0,0,1-.36-1.79L114.49,329h-4.14L89.07,410.05a6.09,6.09,0,0,0,5.87,7.62h38.49a7.49,7.49,0,0,0,7.24-5.59L162.47,329Z" style={{ fill: '#fff' }} /></g><polygon points="167.15 417.67 143.6 327.87 139.73 328.88 163.01 417.67 167.15 417.67" style={{ fill: '#8FE3C0' }} /><polygon points="215.15 417.67 191.6 327.87 187.73 328.88 211.01 417.67 215.15 417.67" style={{ fill: '#8FE3C0' }} /><g style={{ opacity: '0.5' }}><polygon points="167.15 417.67 143.6 327.87 139.73 328.88 163.01 417.67 167.15 417.67" style={{ fill: '#fff' }} /></g><g style={{ opacity: '0.5' }}><polygon points="215.15 417.67 191.6 327.87 187.73 328.88 211.01 417.67 215.15 417.67" style={{ fill: '#fff' }} /></g><polygon points="110.35 329 114.49 329 111.24 341.37 107.41 340.2 110.35 329" style={{ opacity: '0.2', isolation: 'isolate' }} /><polygon points="143.6 327.87 148.95 348.28 144.46 346.92 139.73 328.88 143.6 327.87" style={{ opacity: '0.2', isolation: 'isolate' }} /><polygon points="158.34 329 162.47 329 155.69 354.9 151.85 353.73 158.34 329" style={{ opacity: '0.2', isolation: 'isolate' }} /><polygon points="201.05 364.15 196.54 362.77 187.73 329.13 191.6 328.03 201.05 364.15" style={{ opacity: '0.2', isolation: 'isolate' }} /><path d="M106.7,330.37,88,229.14l-.25-1.53a6.58,6.58,0,0,1,1.35-5.41,6.13,6.13,0,0,1,4.81-2.2h40.48a8.66,8.66,0,0,1,8.06,6.92l.3,1.71,18.69,101-3.94.72-18.75-101.3-.24-1.42a4.62,4.62,0,0,0-4.12-3.63H93.87a2.18,2.18,0,0,0-1.74.76,2.63,2.63,0,0,0-.48,2.17l.28,1.68,18.71,101Z" style={{ fill: '#8FE3C0' }} /><g style={{ opacity: '0.5', isolation: 'isolate' }}><path d="M106.7,330.37,88,229.14l-.25-1.53a6.58,6.58,0,0,1,1.35-5.41,6.13,6.13,0,0,1,4.81-2.2h40.48a8.66,8.66,0,0,1,8.06,6.92l.3,1.71,18.69,101-3.94.72-18.75-101.3-.24-1.42a4.62,4.62,0,0,0-4.12-3.63H93.87a2.18,2.18,0,0,0-1.74.76,2.63,2.63,0,0,0-.48,2.17l.28,1.68,18.71,101Z" style={{ fill: '#fff' }} /></g><path d="M114.88,320.33h76.93a5,5,0,0,1,5,5V332a0,0,0,0,1,0,0H109.88a0,0,0,0,1,0,0v-6.69A5,5,0,0,1,114.88,320.33Z" style={{ fill: '#8FE3C0' }} /><rect x="106.67" y="326.18" width="93.35" height="5.84" rx="2.01" style={{ fill: '#8FE3C0' }} /><rect x="106.67" y="326.18" width="93.35" height="5.84" rx="2.01" style={{ fill: '#fff', opacity: '0.6000000000000001', isolation: 'isolate' }} /><polygon points="148.33 270 97.5 270 89.92 229 140.74 229 148.26 269.62 148.33 270" style={{ fill: '#8FE3C0' }} /></g><g id="freepik--Character--inject-93"><g id="freepik--group--inject-93"><path d="M198.33,182.63s-6.39-14.84-6.94-16.43.1-9.62-.39-11-7.91-2.37-9.48-2.19-.19,12.6.46,13.58a18,18,0,0,0,2.85,2.72l5.65,17Z" style={{ fill: '#b97964' }} /><path d="M166,210.64c4.36.69,22.21,3.27,26.2.61,3.22-2.15-5.85-37-5.85-37l8.07-3.29s19.17,42.22,8.93,51.86c-5.2,4.9-19.82,6.14-40.85,6.14Z" style={{ fill: '#8FE3C0' }} /><path d="M166,210.64c4.36.69,22.21,3.27,26.2.61,3.22-2.15-5.85-37-5.85-37l8.07-3.29s19.17,42.22,8.93,51.86c-5.2,4.9-19.82,6.14-40.85,6.14Z" style={{ fill: '#fff', opacity: '0.8' }} /><path d="M173.39,228.86c-3.1.09-6.41.13-9.89.13l3-11.49A25.76,25.76,0,0,1,173.39,228.86Z" style={{ opacity: '0.1', isolation: 'isolate' }} /><line x1="191.17" y1="234.99" x2="212.33" y2="257.37" style={{ fill: 'none', stroke: '#0B2E20', strokeMiterlimit: '10', strokeWidth: '2px' }} /><path d="M176,248.17s16.15-.5,17.83-.67,8.67-4.17,10.17-4.33,5.5,6.16,6,7.66-11.33,5.5-12.5,5.34a18.38,18.38,0,0,1-3.67-1.44L176,256.83Z" style={{ fill: '#b97964' }} /><polygon points="166.5 409.83 174.47 408.74 175.57 389.8 167.62 390.9 166.5 409.83" style={{ fill: '#b97964' }} /><path d="M175.07,407.78l-9-.57a.59.59,0,0,0-.63.51h0l-.88,7.1a1.41,1.41,0,0,0,1.31,1.5c3.14.15,4.65.06,8.61.28,2.44.14,7.23.66,10.58.33s2.94-3.63,1.5-3.79c-3.44-.39-8-2.91-10.14-4.83A2.24,2.24,0,0,0,175.07,407.78Z" style={{ fill: '#0B2E20' }} /><path d="M177.83,409.32a10.21,10.21,0,0,1-2.12-.42.19.19,0,0,1-.14-.15.22.22,0,0,1,.09-.19c.27-.16,2.64-1.57,3.6-1.13a.7.7,0,0,1,.39.56,1,1,0,0,1-.29,1A2.16,2.16,0,0,1,177.83,409.32Zm1.27-1.51c-.51-.24-1.89.35-2.86.88,1.42.37,2.47.39,2.88.05a.7.7,0,0,0,.17-.66.32.32,0,0,0-.19-.27Z" style={{ fill: '#8FE3C0' }} /><path d="M175.75,408.9a.12.12,0,0,1-.08,0,.25.25,0,0,1-.1-.15c0-.07,0-2.42.82-3.15a1,1,0,0,1,.82-.21.71.71,0,0,1,.64.6c.13.89-1.17,2.49-2,2.91A.12.12,0,0,1,175.75,408.9Zm1.3-3.12a.53.53,0,0,0-.41.15c-.52.43-.65,1.75-.68,2.5a3.93,3.93,0,0,0,1.52-2.34c0-.11-.07-.25-.34-.3Z" style={{ fill: '#8FE3C0' }} /><polygon points="167.62 390.9 175.57 389.81 174.94 400.63 167 401.33 167.62 390.9" style={{ opacity: '0.2', isolation: 'isolate' }} /><path d="M166.82,298.51l-1.94-12.18-44.66-2.67s-4.75,25.34-1.1,32.09c6.51,12.05,41.62,6,51.89,7.15-6.14,25.11-5.54,74.18-5.54,74.18l14.67,1.12s11.29-52.87,13.57-78C195.25,303.25,181.2,303.67,166.82,298.51Z" style={{ fill: '#0B2E20' }} /><polygon points="163.75 397.77 181.38 398.93 182.89 391.38 163.52 390.48 163.75 397.77" style={{ fill: '#8FE3C0' }} /><polygon points="184.88 402.76 192.9 403.35 197.92 385.06 189.91 384.48 184.88 402.76" style={{ fill: '#b97964' }} /><path d="M193.69,402.53,185,400.11a.57.57,0,0,0-.72.36h0l-2.34,6.76a1.42,1.42,0,0,0,1,1.75c3,.79,4.53,1,8.36,2.06,2.35.65,6.93,2.15,10.28,2.53s3.63-2.94,2.25-3.39c-3.28-1.1-7.2-4.52-8.91-6.84A2.23,2.23,0,0,0,193.69,402.53Z" style={{ fill: '#0B2E20' }} /><path d="M196.07,404.62a9.5,9.5,0,0,1-2-.86.16.16,0,0,1-.1-.17.2.2,0,0,1,.12-.17c.29-.1,2.91-1,3.75-.35a.7.7,0,0,1,.28.63,1,1,0,0,1-.51.94A2.13,2.13,0,0,1,196.07,404.62Zm1.55-1.22c-.45-.34-1.92,0-3,.27,1.31.66,2.34.9,2.8.65a.69.69,0,0,0,.31-.61.31.31,0,0,0-.13-.31Z" style={{ fill: '#8FE3C0' }} /><path d="M194.12,403.78H194a.19.19,0,0,1-.06-.17c0-.07.47-2.37,1.45-2.91a1,1,0,0,1,.84,0,.73.73,0,0,1,.51.73c-.07.89-1.67,2.19-2.57,2.43A.14.14,0,0,1,194.12,403.78ZM196,401a.54.54,0,0,0-.43.06c-.6.32-1,1.58-1.19,2.31.82-.38,1.9-1.39,2-2,0-.11,0-.25-.27-.35Z" style={{ fill: '#8FE3C0' }} /><polygon points="189.91 384.48 197.92 385.07 195.05 395.52 187.13 394.55 189.91 384.48" style={{ opacity: '0.2', isolation: 'isolate' }} /><path d="M200.64,394.23l-14.12-4.15S195,342.5,203.5,326c-.64-.21-1.49-.48-2.54-.79-1.89-.57-4.4-1.28-7.35-2.1-20.52-5.69-62.11-16.36-62.11-16.36l19-17.73s75.68,11.54,77.25,31.48C228.5,330.09,200.64,394.23,200.64,394.23Z" style={{ fill: '#0B2E20' }} /><polygon points="184.7 390.39 201.7 395.2 204.75 388.13 185.99 383.21 184.7 390.39" style={{ fill: '#8FE3C0' }} /><path d="M201,325.21c-1.89-.57-4.4-1.28-7.35-2.1.59-4.84.6-10.39-1.73-13.22-4.63-5.64-16.54-8.95-23.32-10.15-5.67-1-24.72-3-24.72-3s24.72-2.37,50,5C206.32,305.4,203.89,317.61,201,325.21Z" style={{ opacity: '0.2', isolation: 'isolate' }} /><path d="M166,210.64s6.48,24-1.09,75.69c-14.11-.3-37.82-.85-44.69-1-.17-7.2,5.14-42.48-1.07-76.51a94.38,94.38,0,0,1,13.53-1.34,174,174,0,0,1,19.91.43A88.8,88.8,0,0,1,166,210.64Z" style={{ fill: '#8FE3C0' }} /><path d="M166,210.64s6.48,24-1.09,75.69c-14.11-.3-37.82-.85-44.69-1-.17-7.2,5.14-42.48-1.07-76.51a94.38,94.38,0,0,1,13.53-1.34,174,174,0,0,1,19.91.43A88.8,88.8,0,0,1,166,210.64Z" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><path d="M134.83,252.67c-4-.88-8.77-4.73-12.7-8.53,0-6.76-.33-13.95-1.06-21.28C126.63,231.09,141.69,254.18,134.83,252.67Z" style={{ opacity: '0.1', isolation: 'isolate' }} /><path d="M119.12,208.82C103.83,214.33,130.67,255.73,139,260s50.67-4.67,50.67-4.67L188,246.77s-37.46.95-40.91.08S135.44,228.33,130.72,220A26.71,26.71,0,0,0,119.12,208.82Z" style={{ fill: '#8FE3C0' }} /><path d="M119.12,208.82C103.83,214.33,130.67,255.73,139,260s50.67-4.67,50.67-4.67L188,246.77s-37.46.95-40.91.08S135.44,228.33,130.72,220A26.71,26.71,0,0,0,119.12,208.82Z" style={{ fill: '#fff', opacity: '0.8' }} /><polygon points="185 246 187.17 257.37 191.17 256 189.67 246 185 246" style={{ fill: '#8FE3C0' }} /><polygon points="185 246 187.17 257.37 191.17 256 189.67 246 185 246" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><polygon points="186.08 176.78 196.84 172.52 194.75 168.85 185.2 172.19 186.08 176.78" style={{ fill: '#8FE3C0' }} /><polygon points="186.08 176.78 196.84 172.52 194.75 168.85 185.2 172.19 186.08 176.78" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /><path d="M130.24,207.58s.29,4.67,9.46,9.17l6.34-4.59s1.81,11.72,3,20.47c0,0-.08-14-1.28-19.38l4.85,1.72s-4.13-7.09-11.16-8.72S130.24,207.58,130.24,207.58Z" style={{ opacity: '0.1', isolation: 'isolate' }} /><path d="M135.1,185.16c1.12,6.43,2.12,18.19-2.45,22.37L146,211.25l6.52-3.29c-7.11-1.86-6.81-7.16-5.46-12.11Z" style={{ fill: '#b97964' }} /><path d="M140,189.52l7.1,6.33a21.27,21.27,0,0,0-.69,3.52c-2.72-.45-6.4-3.53-6.63-6.39A9.39,9.39,0,0,1,140,189.52Z" style={{ opacity: '0.2', isolation: 'isolate' }} /><path d="M144.57,167.29c-2.91,3.16-.4,6.77,8.89,11.16,2.21-4.87.86-13-2.14-14.42S147.11,164.55,144.57,167.29Z" style={{ fill: '#0B2E20' }} /><path d="M131.2,177.23c2.36,8.37,3.32,13.38,8.54,16.81,7.86,5.15,17.49-1,17.68-9.91.16-8-3.72-20.35-12.75-21.92a11.86,11.86,0,0,0-13.47,15Z" style={{ fill: '#b97964' }} /><path d="M144.37,176.81c.15.69.64,1.17,1.09,1.07s.69-.73.54-1.42-.63-1.17-1.08-1.08S144.27,176.12,144.37,176.81Z" style={{ fill: '#0B2E20' }} /><path d="M152.22,175.12c.15.69.64,1.17,1.09,1.07s.7-.73.55-1.43-.64-1.17-1.09-1.07S152.07,174.43,152.22,175.12Z" style={{ fill: '#0B2E20' }} /><path d="M149.73,176a24.9,24.9,0,0,0,4.58,5.19,4.08,4.08,0,0,1-3.17,1.33Z" style={{ fill: '#a24e3f' }} /><path d="M141.69,174.8a.39.39,0,0,1-.48-.55,4.1,4.1,0,0,1,2.94-2.39.41.41,0,0,1,.47.32v0a.43.43,0,0,1-.35.47h0a3.27,3.27,0,0,0-2.3,1.91A.4.4,0,0,1,141.69,174.8Z" style={{ fill: '#0B2E20' }} /><path d="M155.22,171.7a.4.4,0,0,1-.42-.15,3.32,3.32,0,0,0-2.68-1.34.42.42,0,0,1-.45-.38.43.43,0,0,1,.37-.45,4.14,4.14,0,0,1,3.41,1.66.41.41,0,0,1-.07.58h0A.35.35,0,0,1,155.22,171.7Z" style={{ fill: '#0B2E20' }} /><path d="M133,169c4.26.5,4.7,4.88.5,14.25-4.85-2.26-9.12-9.32-7.75-12.34S129.23,168.55,133,169Z" style={{ fill: '#0B2E20' }} /><path d="M128.63,184.89a8.25,8.25,0,0,0,4.89,4c2.78.81,4.2-1.67,3.46-4.31-.67-2.38-2.93-5.67-5.73-5.32S127.37,182.52,128.63,184.89Z" style={{ fill: '#b97964' }} /><path d="M126.08,170.19s-2.11-2.72,2-8.16,14.15-7.11,21.85-5.61,3.12,10,.37,11.41l.34-1.33a23,23,0,0,1-9.5,2.58l1.52-1.41S130.58,170.8,126.08,170.19Z" style={{ fill: '#0B2E20' }} /><path d="M150.63,184.82a20.79,20.79,0,0,0-.29,3.11l-.54.08c-2.48.33-3.73-.34-4.37-1.17a3.31,3.31,0,0,1-.59-1.41,3.08,3.08,0,0,1,0-.87,11.73,11.73,0,0,0,5,.36C150.3,184.88,150.63,184.82,150.63,184.82Z" style={{ fill: '#0B2E20' }} /><path d="M149.78,184.92l-.11.92c-2.32.3-4,.2-4.83-.41a3.08,3.08,0,0,1,0-.87A11.73,11.73,0,0,0,149.78,184.92Z" style={{ fill: '#fff' }} /><path d="M149.8,188c-2.48.33-3.73-.34-4.37-1.17a8,8,0,0,1,2.81.18A3,3,0,0,1,149.8,188Z" style={{ fill: '#a24e3f' }} /><path d="M135,203.58s7.22,5.42,11,6.67c0,0,1.78-3.34,1.05-6.1l5.47,3.81a13.51,13.51,0,0,1,0,7L146,211.25l-6.16,4.5s-9.11-2.64-9.64-8.17Z" style={{ fill: '#8FE3C0' }} /><path d="M135,203.58s7.22,5.42,11,6.67c0,0,1.78-3.34,1.05-6.1l5.47,3.81a13.51,13.51,0,0,1,0,7L146,211.25l-6.16,4.5s-9.11-2.64-9.64-8.17Z" style={{ fill: '#fff', opacity: '0.8' }} /></g><rect x="153.33" y="254.87" width="102.01" height="5.27" rx="1.17" style={{ fill: '#8FE3C0' }} /><path d="M255,255.9v2.93c0,.65-.18,1.17-.82,1.17H154.5c-.65,0-1.5-.52-1.5-1.17V255.9c0-.64.85-.9,1.5-.9h99.68C254.82,255,255,255.26,255,255.9Z" style={{ fill: '#fff', opacity: '0.5' }} /><path d="M195,255.9v2.93c0,.65-.22,1.17-.86,1.17H154.5c-.65,0-1.5-.52-1.5-1.17V255.9c0-.64.85-.9,1.5-.9h39.64C194.78,255,195,255.26,195,255.9Z" style={{ opacity: '0.2', isolation: 'isolate' }} /></g><g id="freepik--Lightbulb--inject-93"><path d="M172.36,109.13a19.13,19.13,0,1,0-25.91,22.7,5.45,5.45,0,0,1,2.89,2.78l.65,1.47,18.41-5-.19-1.6a5.61,5.61,0,0,1,1.09-3.89A19.26,19.26,0,0,0,172.36,109.13Z" style={{ fill: '#8FE3C0' }} /><path d="M156,136.12s-2.77-8.69-7.66-12.54l2.71-.74.21-4.17,4.43,6.41-.36-7.8,4.37,7.11.44-4,3.87-1a22.2,22.2,0,0,0-1.07,15.11" style={{ fill: 'none', stroke: '#fff', strokeLinecap: 'round', strokeLinejoin: 'round' }} /><path d="M159.48,134.66c-3.26.89-5.08,4.64-4.06,8.37s4.48,6,7.74,5.14,5.07-4.63,4.06-8.36S162.74,133.78,159.48,134.66Z" style={{ fill: '#0B2E20' }} /><path d="M165.76,144.74l-6.56,1.79a6.44,6.44,0,0,1-7.76-4.06l-2.15-6.07a.92.92,0,0,1,.63-1.2L168,130.27a.92.92,0,0,1,1.15.72l1.23,6.31A6.44,6.44,0,0,1,165.76,144.74Z" style={{ fill: '#8FE3C0' }} /><path d="M165.76,144.74l-6.56,1.79a6.44,6.44,0,0,1-7.76-4.06l-2.15-6.07a.92.92,0,0,1,.63-1.2L168,130.27a.92.92,0,0,1,1.15.72l1.23,6.31A6.44,6.44,0,0,1,165.76,144.74Z" style={{ fill: '#fff', opacity: '0.4' }} /><path d="M128.38,128.25a31,31,0,0,0-5.43-.51,22.15,22.15,0,0,0-2.71.15c-.45.07-.9.12-1.33.23-.22.06-.44.09-.65.17l-.63.2-.72.23.43-.63a24.12,24.12,0,0,0,2.87-5.8,17.83,17.83,0,0,0,.75-3.13,14.22,14.22,0,0,0,.14-1.59,14.06,14.06,0,0,0,0-1.59,11.71,11.71,0,0,0-.22-1.56l-.19-.76-.25-.75a9.55,9.55,0,0,0-.65-1.42,11.26,11.26,0,0,0-.83-1.32,13.16,13.16,0,0,0-1-1.2l-.55-.56-.6-.52c-.39-.36-.85-.64-1.26-1s-.9-.56-1.35-.85l-1-.66,1.11-.53c.53-.26,1.09-.57,1.62-.89s1.06-.65,1.58-1a26.18,26.18,0,0,0,2.93-2.32c.45-.42.89-.85,1.32-1.3s.82-.93,1.19-1.41.73-1,1-1.51a14.46,14.46,0,0,0,.87-1.59,13.42,13.42,0,0,0,.68-1.68l.26-.86.19-.89a11.83,11.83,0,0,0,.2-1.78,13.6,13.6,0,0,0-.32-3.59l-.2-.89-.28-.87c-.17-.59-.44-1.14-.66-1.71s-.54-1.1-.81-1.66l-1.43-3,2.74,1.76c.48.32,1,.63,1.57.92s1.1.57,1.66.82a27.14,27.14,0,0,0,3.44,1.33c.59.17,1.18.33,1.77.46a15.55,15.55,0,0,0,1.79.3,13.54,13.54,0,0,0,1.79.11,14.75,14.75,0,0,0,1.77-.12l.86-.15.85-.23a11.71,11.71,0,0,0,1.6-.66,5.48,5.48,0,0,0,.74-.43,5,5,0,0,0,.71-.5,13,13,0,0,0,1.3-1.16,13.28,13.28,0,0,0,1.11-1.37,12.49,12.49,0,0,0,.95-1.52c.31-.51.52-1.09.79-1.63s.43-1.14.65-1.71l1.25-3.28.62,3.42a12.2,12.2,0,0,0,.43,1.65,15.65,15.65,0,0,0,2.38,4.65,12.11,12.11,0,0,0,2.43,2.42,10.34,10.34,0,0,0,1.44.92,11,11,0,0,0,1.57.7,13.12,13.12,0,0,0,1.66.46,14.39,14.39,0,0,0,1.73.24,17,17,0,0,0,1.75,0c.59,0,1.18-.08,1.77-.13s1.18-.19,1.76-.28l1.75-.42,1.73-.52,1.71-.61,2.37-.85-1.36,2.11c-.25.37-.5.82-.73,1.25s-.44.87-.64,1.33a16.21,16.21,0,0,0-.93,2.78,12.16,12.16,0,0,0-.33,2.87,8.69,8.69,0,0,0,.49,2.78l.27.66L172,97a8.62,8.62,0,0,0,.83,1.15,9.73,9.73,0,0,0,1,1,11.27,11.27,0,0,0,1.17.89,13.15,13.15,0,0,0,1.26.76c.43.24.89.42,1.34.64l1.4.53,1.44.45,1,.32-.84.65a14.17,14.17,0,0,0-1.59,1.44,15.57,15.57,0,0,0-1.38,1.66c-.23.29-.41.6-.61.9a8.62,8.62,0,0,0-.52.94,6.23,6.23,0,0,0-.44,1,6.07,6.07,0,0,0-.33,1c-.07.35-.19.69-.23,1l-.1,1.07c0,.36,0,.72.06,1.08a4.8,4.8,0,0,0,.18,1.06,6.25,6.25,0,0,0,.28,1l.41,1a5.89,5.89,0,0,0,.51,1l.56,1,.21.35h-.39a17.17,17.17,0,0,0-4.38.58,9.59,9.59,0,0,0-2.06.81,4.57,4.57,0,0,0-.47.29,2.36,2.36,0,0,0-.45.33,3.62,3.62,0,0,0-.42.36l-.39.41.37-.43a3,3,0,0,1,.4-.39,3.13,3.13,0,0,1,.44-.36c.15-.1.3-.22.46-.31a10.27,10.27,0,0,1,2.05-.94,16.38,16.38,0,0,1,4.45-.79l-.17.35-.62-1a6,6,0,0,1-.58-1l-.47-1a5.85,5.85,0,0,1-.34-1.1,4.84,4.84,0,0,1-.24-1.13c0-.38-.09-.77-.1-1.15l0-1.17c0-.38.14-.76.2-1.14a7.17,7.17,0,0,1,.32-1.12,6.23,6.23,0,0,1,.43-1.08,8.28,8.28,0,0,1,.52-1,10.85,10.85,0,0,1,.6-1,15.58,15.58,0,0,1,1.43-1.81,15.24,15.24,0,0,1,1.69-1.61l.19,1-1.51-.43-1.49-.53c-.49-.21-1-.4-1.46-.65a12.73,12.73,0,0,1-1.39-.79,12.13,12.13,0,0,1-1.31-.95A9.68,9.68,0,0,1,171.78,99a9.18,9.18,0,0,1-1-1.33l-.41-.72-.33-.77A10,10,0,0,1,169.4,93a13.07,13.07,0,0,1,.29-3.25,18.15,18.15,0,0,1,.94-3.07c.2-.5.42-1,.66-1.46s.49-.94.8-1.43l1,1.26-1.78.65-1.81.56c-.62.17-1.24.31-1.86.46s-1.25.24-1.89.31a17.72,17.72,0,0,1-1.93.16,18.15,18.15,0,0,1-2,0,16.12,16.12,0,0,1-1.94-.26,15.82,15.82,0,0,1-1.91-.51,14.71,14.71,0,0,1-1.82-.79,12.29,12.29,0,0,1-1.69-1.06,14,14,0,0,1-2.82-2.77,16.38,16.38,0,0,1-2-3.36,17.56,17.56,0,0,1-.71-1.82,15.07,15.07,0,0,1-.52-1.93l1.87.14c-.23.62-.44,1.25-.69,1.86a20,20,0,0,1-.86,1.81,14,14,0,0,1-1,1.73,16,16,0,0,1-1.28,1.6,13.53,13.53,0,0,1-1.54,1.38,6.17,6.17,0,0,1-.86.58,8.08,8.08,0,0,1-.9.52,13.43,13.43,0,0,1-1.93.78l-1,.25-1,.18a14,14,0,0,1-2,.11,15,15,0,0,1-2-.13,18.44,18.44,0,0,1-2-.35c-.65-.14-1.29-.32-1.92-.52a27.54,27.54,0,0,1-3.66-1.44c-.6-.27-1.18-.57-1.75-.88s-1.13-.64-1.72-1l1.31-1.19c.29.6.6,1.18.86,1.8a20,20,0,0,1,.71,1.87l.3,1,.22,1a19.48,19.48,0,0,1,.3,2,17.17,17.17,0,0,1,0,2,13.59,13.59,0,0,1-.24,2l-.22,1-.3,1a15.49,15.49,0,0,1-.78,1.88,14.32,14.32,0,0,1-1,1.75A19.18,19.18,0,0,1,124.15,99c-.43.52-.87,1-1.33,1.49s-.95.92-1.44,1.36a30.15,30.15,0,0,1-3.15,2.37q-.83.54-1.68,1c-.58.32-1.15.62-1.78.9l.07-1.19c.47.32,1,.61,1.42.94s.92.67,1.33,1.07l.64.58.59.62a15.43,15.43,0,0,1,1.08,1.34,12.47,12.47,0,0,1,.89,1.49,11.57,11.57,0,0,1,.68,1.58l.25.83.18.84a12.45,12.45,0,0,1,.2,1.71,16.57,16.57,0,0,1-1.16,6.63,25,25,0,0,1-3.19,5.86l-.29-.4.67-.19c.23-.07.46-.1.69-.15.45-.1.91-.13,1.37-.19a23.15,23.15,0,0,1,2.76,0A31.89,31.89,0,0,1,128.38,128.25Z" style={{ fill: '#8FE3C0' }} /><path d="M128.38,128.25a31,31,0,0,0-5.43-.51,22.15,22.15,0,0,0-2.71.15c-.45.07-.9.12-1.33.23-.22.06-.44.09-.65.17l-.63.2-.72.23.43-.63a24.12,24.12,0,0,0,2.87-5.8,17.83,17.83,0,0,0,.75-3.13,14.22,14.22,0,0,0,.14-1.59,14.06,14.06,0,0,0,0-1.59,11.71,11.71,0,0,0-.22-1.56l-.19-.76-.25-.75a9.55,9.55,0,0,0-.65-1.42,11.26,11.26,0,0,0-.83-1.32,13.16,13.16,0,0,0-1-1.2l-.55-.56-.6-.52c-.39-.36-.85-.64-1.26-1s-.9-.56-1.35-.85l-1-.66,1.11-.53c.53-.26,1.09-.57,1.62-.89s1.06-.65,1.58-1a26.18,26.18,0,0,0,2.93-2.32c.45-.42.89-.85,1.32-1.3s.82-.93,1.19-1.41.73-1,1-1.51a14.46,14.46,0,0,0,.87-1.59,13.42,13.42,0,0,0,.68-1.68l.26-.86.19-.89a11.83,11.83,0,0,0,.2-1.78,13.6,13.6,0,0,0-.32-3.59l-.2-.89-.28-.87c-.17-.59-.44-1.14-.66-1.71s-.54-1.1-.81-1.66l-1.43-3,2.74,1.76c.48.32,1,.63,1.57.92s1.1.57,1.66.82a27.14,27.14,0,0,0,3.44,1.33c.59.17,1.18.33,1.77.46a15.55,15.55,0,0,0,1.79.3,13.54,13.54,0,0,0,1.79.11,14.75,14.75,0,0,0,1.77-.12l.86-.15.85-.23a11.71,11.71,0,0,0,1.6-.66,5.48,5.48,0,0,0,.74-.43,5,5,0,0,0,.71-.5,13,13,0,0,0,1.3-1.16,13.28,13.28,0,0,0,1.11-1.37,12.49,12.49,0,0,0,.95-1.52c.31-.51.52-1.09.79-1.63s.43-1.14.65-1.71l1.25-3.28.62,3.42a12.2,12.2,0,0,0,.43,1.65,15.65,15.65,0,0,0,2.38,4.65,12.11,12.11,0,0,0,2.43,2.42,10.34,10.34,0,0,0,1.44.92,11,11,0,0,0,1.57.7,13.12,13.12,0,0,0,1.66.46,14.39,14.39,0,0,0,1.73.24,17,17,0,0,0,1.75,0c.59,0,1.18-.08,1.77-.13s1.18-.19,1.76-.28l1.75-.42,1.73-.52,1.71-.61,2.37-.85-1.36,2.11c-.25.37-.5.82-.73,1.25s-.44.87-.64,1.33a16.21,16.21,0,0,0-.93,2.78,12.16,12.16,0,0,0-.33,2.87,8.69,8.69,0,0,0,.49,2.78l.27.66L172,97a8.62,8.62,0,0,0,.83,1.15,9.73,9.73,0,0,0,1,1,11.27,11.27,0,0,0,1.17.89,13.15,13.15,0,0,0,1.26.76c.43.24.89.42,1.34.64l1.4.53,1.44.45,1,.32-.84.65a14.17,14.17,0,0,0-1.59,1.44,15.57,15.57,0,0,0-1.38,1.66c-.23.29-.41.6-.61.9a8.62,8.62,0,0,0-.52.94,6.23,6.23,0,0,0-.44,1,6.07,6.07,0,0,0-.33,1c-.07.35-.19.69-.23,1l-.1,1.07c0,.36,0,.72.06,1.08a4.8,4.8,0,0,0,.18,1.06,6.25,6.25,0,0,0,.28,1l.41,1a5.89,5.89,0,0,0,.51,1l.56,1,.21.35h-.39a17.17,17.17,0,0,0-4.38.58,9.59,9.59,0,0,0-2.06.81,4.57,4.57,0,0,0-.47.29,2.36,2.36,0,0,0-.45.33,3.62,3.62,0,0,0-.42.36l-.39.41.37-.43a3,3,0,0,1,.4-.39,3.13,3.13,0,0,1,.44-.36c.15-.1.3-.22.46-.31a10.27,10.27,0,0,1,2.05-.94,16.38,16.38,0,0,1,4.45-.79l-.17.35-.62-1a6,6,0,0,1-.58-1l-.47-1a5.85,5.85,0,0,1-.34-1.1,4.84,4.84,0,0,1-.24-1.13c0-.38-.09-.77-.1-1.15l0-1.17c0-.38.14-.76.2-1.14a7.17,7.17,0,0,1,.32-1.12,6.23,6.23,0,0,1,.43-1.08,8.28,8.28,0,0,1,.52-1,10.85,10.85,0,0,1,.6-1,15.58,15.58,0,0,1,1.43-1.81,15.24,15.24,0,0,1,1.69-1.61l.19,1-1.51-.43-1.49-.53c-.49-.21-1-.4-1.46-.65a12.73,12.73,0,0,1-1.39-.79,12.13,12.13,0,0,1-1.31-.95A9.68,9.68,0,0,1,171.78,99a9.18,9.18,0,0,1-1-1.33l-.41-.72-.33-.77A10,10,0,0,1,169.4,93a13.07,13.07,0,0,1,.29-3.25,18.15,18.15,0,0,1,.94-3.07c.2-.5.42-1,.66-1.46s.49-.94.8-1.43l1,1.26-1.78.65-1.81.56c-.62.17-1.24.31-1.86.46s-1.25.24-1.89.31a17.72,17.72,0,0,1-1.93.16,18.15,18.15,0,0,1-2,0,16.12,16.12,0,0,1-1.94-.26,15.82,15.82,0,0,1-1.91-.51,14.71,14.71,0,0,1-1.82-.79,12.29,12.29,0,0,1-1.69-1.06,14,14,0,0,1-2.82-2.77,16.38,16.38,0,0,1-2-3.36,17.56,17.56,0,0,1-.71-1.82,15.07,15.07,0,0,1-.52-1.93l1.87.14c-.23.62-.44,1.25-.69,1.86a20,20,0,0,1-.86,1.81,14,14,0,0,1-1,1.73,16,16,0,0,1-1.28,1.6,13.53,13.53,0,0,1-1.54,1.38,6.17,6.17,0,0,1-.86.58,8.08,8.08,0,0,1-.9.52,13.43,13.43,0,0,1-1.93.78l-1,.25-1,.18a14,14,0,0,1-2,.11,15,15,0,0,1-2-.13,18.44,18.44,0,0,1-2-.35c-.65-.14-1.29-.32-1.92-.52a27.54,27.54,0,0,1-3.66-1.44c-.6-.27-1.18-.57-1.75-.88s-1.13-.64-1.72-1l1.31-1.19c.29.6.6,1.18.86,1.8a20,20,0,0,1,.71,1.87l.3,1,.22,1a19.48,19.48,0,0,1,.3,2,17.17,17.17,0,0,1,0,2,13.59,13.59,0,0,1-.24,2l-.22,1-.3,1a15.49,15.49,0,0,1-.78,1.88,14.32,14.32,0,0,1-1,1.75A19.18,19.18,0,0,1,124.15,99c-.43.52-.87,1-1.33,1.49s-.95.92-1.44,1.36a30.15,30.15,0,0,1-3.15,2.37q-.83.54-1.68,1c-.58.32-1.15.62-1.78.9l.07-1.19c.47.32,1,.61,1.42.94s.92.67,1.33,1.07l.64.58.59.62a15.43,15.43,0,0,1,1.08,1.34,12.47,12.47,0,0,1,.89,1.49,11.57,11.57,0,0,1,.68,1.58l.25.83.18.84a12.45,12.45,0,0,1,.2,1.71,16.57,16.57,0,0,1-1.16,6.63,25,25,0,0,1-3.19,5.86l-.29-.4.67-.19c.23-.07.46-.1.69-.15.45-.1.91-.13,1.37-.19a23.15,23.15,0,0,1,2.76,0A31.89,31.89,0,0,1,128.38,128.25Z" style={{ fill: '#fff', opacity: '0.7000000000000001' }} /></g></svg>
                </div>

                <div className="qz-sat qz-sat--ring" aria-hidden="true">
                  <div className="qz-ring">
                    <svg viewBox="0 0 46 46">
                      <circle className="qz-ring-bg" cx="23" cy="23" r="18" />
                      <circle className="qz-ring-fg" cx="23" cy="23" r="18" data-ring="82" data-circ="113" />
                    </svg>
                    <em>82%</em>
                  </div>
                  <div><b>Accuracy</b><span>Last 7 quizzes</span></div>
                </div>

                <div className="qz-sat qz-sat--timer" aria-hidden="true">
                  <span className="qz-sat-ic"><Icon id="qi-clock" /></span>
                  <div><b>06:12</b><span>Question 4 of 10</span></div>
                </div>

                <div className="qz-sat qz-sat--score" aria-hidden="true">
                  <b>18 / 20</b>
                  <span>Polity Quiz 02</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ==================== 2 · SUBJECT EXPLORER ==================== */}
        <section className="qz-sec qz-explore" id="qz-explore">
          <div className="qz-grid-bg" />
          <div className="qz-wrap">
            <div className="qz-head qz-rv">
              <p className="qz-eyebrow"><u>Find your practice set</u></p>
              <h2>Choose a <span className="qz-em">subject</span></h2>
              <p>Search by subject, quiz title or topic — or tap a filter to jump straight to the matching practice sets.</p>
            </div>

            <div className="qz-rv qz-d1">
              <div className={`qz-search${query ? " has-val" : ""}`} ref={searchRef}>
                <span className="qz-si"><Icon id="qi-search" /></span>
                <label
                  htmlFor="qz-q"
                  className="qz-sr-only"
                  style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}
                >
                  Search quizzes
                </label>
                <input
                  id="qz-q"
                  type="search"
                  autoComplete="off"
                  placeholder="Search subjects, quizzes or topics..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") scrollToQuizzes(); }}
                />
                <button
                  type="button"
                  className="qz-search-clear"
                  aria-label="Clear search"
                  onClick={() => { setQuery(""); setSearch(""); }}
                >
                  <Icon id="qi-x" />
                </button>
                <button type="button" className="qz-btn qz-btn--solid" onClick={scrollToQuizzes}>
                  Search
                </button>
              </div>
            </div>

            {/* ⚠ THE "Soon" STATE IS THE SERVER'S VERDICT, NOT A COUNT.
                `status` here is `effective_status`: an admin can force a
                subject to Soon or Hidden, but cannot force it Live over an
                empty bank — the server degrades that back to Soon so a chip
                can never be clickable onto an empty grid. The disabled
                rendering below is the design's, unchanged; only the source
                of `off` moved. */}
            <div className="qz-chipgroup qz-rv qz-d2">
              <span className="qz-chiplab">Filter by subject</span>
              <div className="qz-chips" role="group" aria-label="Filter quizzes by subject">
                <button
                  type="button"
                  className="qz-chip"
                  aria-pressed={subject === "all"}
                  onClick={() => pickChip("subject", "all")}
                >
                  All quizzes<em>{listMeta.count}</em>
                </button>
                {rails.subjects.map((c) => {
                  const off = c.status !== "live";
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={`qz-chip${off ? " qz-chip--off" : ""}`}
                      aria-pressed={subject === c.slug}
                      disabled={off}
                      onClick={() => pickChip("subject", c.slug)}
                    >
                      {c.label}<em>{off ? "Soon" : c.question_count}</em>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="qz-chipgroup qz-rv qz-d3">
              <span className="qz-chiplab">Filter by exam</span>
              <div className="qz-chips" role="group" aria-label="Filter quizzes by exam">
                <button
                  type="button"
                  className="qz-chip"
                  aria-pressed={exam === "all"}
                  onClick={() => pickChip("exam", "all")}
                >
                  All exams<em>{listMeta.count}</em>
                </button>
                {rails.exams.map((c) => {
                  const off = c.status !== "live";
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={`qz-chip${off ? " qz-chip--off" : ""}`}
                      aria-pressed={exam === c.slug}
                      disabled={off}
                      onClick={() => pickChip("exam", c.slug)}
                    >
                      {c.label}<em>{off ? "Soon" : c.question_count}</em>
                    </button>
                  );
                })}
              </div>
            </div>

            {railsError && (
              <p className="qz-chiplab" role="status" style={{ marginTop: 14 }}>
                {/* An outage and an empty bank look identical if this is
                    silent — and "there is nothing here" is the wrong thing to
                    tell a visitor when the truth is "we could not ask". */}
                Filters could not be loaded. {railsError}
              </p>
            )}
          </div>
        </section>

        {/* ==================== 3 · FEATURED SUBJECTS ==================== */}
        <section className="qz-sec" id="qz-subjects">
          <div className="qz-wrap">
            <div className="qz-head qz-rv">
              <p className="qz-eyebrow"><u>Featured subjects</u></p>
              <h2>Where most <span className="qz-em">aspirants begin</span></h2>
              <p>Each subject carries a full ladder of quizzes — start at the easy sets and work upward as your accuracy climbs.</p>
            </div>

            <div className="qz-subjects">
              {rails.subjects.map((s, i) => {
                const off = s.status !== "live";
                /* Accuracy on this subject, for signed-in learners who have
                   actually answered something in it. The design's fixture had
                   a "Your progress" bar for everyone; there is no such number
                   for a guest, and none for a subject you have not touched,
                   so the bar is omitted rather than shown at 0%. */
                const mine = (summary?.by_subject || []).find(
                  (row) => row.slug === s.slug && row.accuracy !== null
                );
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={`qz-subj qz-rv qz-d${(i % 4) + 1}${off ? " qz-chip--off" : ""}`}
                    style={{ "--c": railColor(s, i) }}
                    disabled={off}
                    onClick={() => pickSubjectCard(s.slug)}
                  >
                    <span className="qz-subj-ic"><Icon id={railIcon(s, i)} /></span>
                    <h3>{s.label}</h3>
                    <p className="qz-subj-meta">
                      {nfmt(s.question_count)} {s.question_count === 1 ? "question" : "questions"}
                      <i />{s.set_count} {s.set_count === 1 ? "set" : "sets"}
                    </p>
                    {mine ? (
                      <div className="qz-prog">
                        <div className="qz-prog-top"><span>Your accuracy</span><b>{mine.accuracy}%</b></div>
                        <div className="qz-track"><span className="qz-fill" data-w={mine.accuracy} /></div>
                      </div>
                    ) : null}
                    <span className="qz-subj-cta">
                      {off ? "Coming soon" : "Begin practice"} <Icon id="qi-arrow" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================== 4 · ALL QUIZZES ==================== */}
        <section className="qz-sec qz-soft" id="qz-all" ref={allRef}>
          <div className="qz-wrap">
            <div className="qz-head qz-rv">
              <p className="qz-eyebrow"><u>Question bank</u></p>
              <h2>Browse every <span className="qz-em">practice set</span></h2>
              <p>Every set is timed, auto-graded and comes with a written explanation for each question.</p>
            </div>

            <div className="qz-bar qz-rv qz-d1">
              <p className="qz-count">
                Showing <b>{visible.length}</b> of {listMeta.count}{" "}
                {listMeta.count === 1 ? "quiz" : "quizzes"}
              </p>
              <div className="qz-sortwrap">
                <label htmlFor="qz-sort">Sort by</label>
                <select
                  className="qz-select"
                  id="qz-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="popular">Most attempted</option>
                  <option value="new">Newest first</option>
                  <option value="easy">Easiest first</option>
                  <option value="hard">Hardest first</option>
                  <option value="short">Shortest first</option>
                </select>
              </div>
            </div>

            <div className="qz-qgrid">
              {visible.map((z) => (
                <QuizCard
                  key={z.id}
                  quiz={z}
                  subject={subjectsBySlug.get(z.subject)}
                  menuOpen={openMenu === z.id}
                  onToggleMenu={(id) => setOpenMenu((cur) => (cur === id ? null : id))}
                  onMenuPick={onMenuPick}
                  onStart={startQuiz}
                  onPreview={(quiz) => onMenuPick("preview", quiz)}
                />
              ))}
            </div>

            {/* Three different states, deliberately not collapsed into one:
                loading, a real failure, and a genuinely empty result. Showing
                "no quizzes match" while a request is in flight or after it
                failed is how an outage gets read as an empty catalogue. */}
            {listLoading && !visible.length && (
              <p className="qz-count" role="status" style={{ textAlign: "center", padding: "28px 0" }}>
                Loading practice sets…
              </p>
            )}

            {!listLoading && listError && (
              <div className="qz-empty show">
                <div className="qz-empty-ic"><Icon id="qi-x-c" /></div>
                <h3>Practice sets could not be loaded</h3>
                <p>{listError}</p>
              </div>
            )}

            <div className={`qz-empty${!listLoading && !listError && !visible.length ? " show" : ""}`}>
              <div className="qz-empty-ic"><Icon id="qi-search" /></div>
              <h3>No quizzes match that filter</h3>
              <p>Try a different subject, or clear the filters to see the full question bank.</p>
              <button type="button" className="qz-btn qz-btn--solid" onClick={resetFilters}>
                Clear filters <Icon id="qi-arrow" />
              </button>
            </div>

            {listMeta.hasMore && (
              <div className="qz-loadmore">
                <button
                  type="button"
                  className="qz-btn qz-btn--ghost"
                  disabled={listLoading}
                  onClick={loadMore}
                >
                  {listLoading ? "Loading…" : "Show more quizzes"} <Icon id="qi-arrow" />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ==================== 6 · PERFORMANCE INSIGHTS ====================
            SIGNED-IN ONLY. `summary` is null for a guest and for a signed-in
            learner with no submitted attempts, and this whole section is then
            absent — not zeroed, not greyed. That is the product decision:
            hidden, never faked. Do not add a placeholder variant. */}
        {summary && (
        <section className="qz-sec" id="qz-performance">
          <div className="qz-wrap">
            <div className="qz-head qz-rv">
              <p className="qz-eyebrow"><u>Your progress</u></p>
              <h2>Your <span className="qz-em">performance insights</span></h2>
              <p>Numbers update after every attempt so you always know which subject to practise next.</p>
            </div>

            <div className="qz-perf">
              <div className="qz-rings qz-rv qz-d1">
                {perfRings.map((r) => (
                  <div className="qz-ringcard" key={r.h} style={{ "--c": r.c }}>
                    <div className="qz-dial">
                      <svg viewBox="0 0 98 98">
                        <circle className="bg" cx="49" cy="49" r="43" />
                        <circle className="fg" cx="49" cy="49" r="43" data-ring={r.ring} data-circ="270" />
                      </svg>
                      <em data-num={r.v} data-suffix={r.suffix}>0{r.suffix}</em>
                    </div>
                    <div className="qz-ringcard-txt">
                      <h4>{r.h}</h4>
                      <p>{r.p}</p>
                      {r.d && (
                        <span className={`qz-delta${r.down ? " down" : ""}`}><Icon id={r.di} />{r.d}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {chartData.length > 0 && (
                <div className="qz-chartcard qz-rv qz-d2">
                  <h4>Accuracy by subject</h4>
                  <p>
                    Across the {nfmt(summary.totals.questions_answered)}{" "}
                    {summary.totals.questions_answered === 1 ? "question" : "questions"} you have answered.
                  </p>
                  <div className="qz-chart">
                    {chartData.map((d) => (
                      <div className="qz-col" key={d.slug} title={`${d.label} — ${d.accuracy}% accuracy`}>
                        <span className="qz-col-bar" style={{ "--c": d.color }} data-h={d.accuracy}>
                          <em className="qz-col-val" style={{ fontStyle: "normal" }}>{d.accuracy}%</em>
                        </span>
                        <span className="qz-col-lab">{d.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="qz-chart-legend">
                    {summary.best_subject && (
                      <span>Strongest: <b>{summary.best_subject.label} {summary.best_subject.accuracy}%</b></span>
                    )}
                    {summary.weak_subject && summary.weak_subject.slug !== summary.best_subject?.slug && (
                      <span>Weakest: <b>{summary.weak_subject.label} {summary.weak_subject.accuracy}%</b></span>
                    )}
                    <span>Target: <b>80% across all</b></span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        )}

        {/* ==================== 7 · RECENTLY ATTEMPTED ====================
            Signed-in only, same rule as section 6. */}
        {summary && summary.recent.length > 0 && (
        <section className="qz-sec qz-soft" id="qz-recent">
          <div className="qz-wrap">
            <div className="qz-head qz-rv">
              <p className="qz-eyebrow"><u>Pick up where you left off</u></p>
              <h2>Recently <span className="qz-em">attempted quizzes</span></h2>
              <p>Retake a set to beat your score, or open the review to re-read the explanations you got wrong.</p>
            </div>

            <div className="qz-recent">
              {summary.recent.map((a, i) => {
                const pct = a.total ? Math.round((a.score / a.total) * 100) : 0;
                return (
                  <div
                    className={`qz-attempt qz-rv qz-d${(i % 4) + 1}`}
                    key={a.attempt_id}
                    style={{ "--c": a.color }}
                  >
                    <div className="qz-attempt-ring">
                      <svg viewBox="0 0 62 62">
                        <circle className="bg" cx="31" cy="31" r="27" />
                        <circle className="fg" cx="31" cy="31" r="27" data-ring={pct} data-circ="170" />
                      </svg>
                      <em>{pct}%</em>
                    </div>
                    <div className="qz-attempt-txt">
                      <b>{a.set_title}</b>
                      <p className="qz-attempt-meta">
                        {a.subject} <i />{relativeDay(a.submitted_at)}
                        {a.seconds_spent !== null && <> <i />{mmss(a.seconds_spent)} spent</>}
                        <i />{a.total} questions
                      </p>
                    </div>
                    <div className="qz-attempt-score"><b>{a.score}/{a.total}</b><span>SCORE</span></div>
                    <div className="qz-attempt-act">
                      {/* Opens the REAL attempt by id. The fixture had to
                          fabricate a plausible past attempt here. */}
                      <button
                        type="button"
                        className="qz-btn qz-btn--quiet qz-btn--sm"
                        disabled={busy}
                        onClick={() => openReview(a.attempt_id, a.set_slug)}
                      >
                        Review
                      </button>
                      <button
                        type="button"
                        className="qz-btn qz-btn--ghost qz-btn--sm"
                        disabled={busy}
                        onClick={() => startQuiz(a.set_slug)}
                      >
                        Retake
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        )}

        {/* ==================== 8 · RECOMMENDED NEXT ====================
            Signed-in only, and additionally absent when there is nothing
            genuinely worth recommending — every published set already
            attempted, or the remaining ones resolve to no questions. An
            empty "what to practise next" is worse than none. */}
        {summary && summary.recommendations.length > 0 && (
        <section className="qz-sec" id="qz-recommended">
          <div className="qz-wrap">
            <div className="qz-head qz-rv">
              <p className="qz-eyebrow"><u>Suggested for you</u></p>
              <h2>What to <span className="qz-em">practise next</span></h2>
              <p>Picked from what you have already cleared and where your accuracy is still slipping.</p>
            </div>

            {summary.recent[0] && (
              <div style={{ textAlign: "center" }} className="qz-rv qz-d1">
                <span className="qz-rec-lead">
                  <span className="qz-rec-ic"><Icon id="qi-bulb" /></span>
                  Because you completed <b>{summary.recent[0].set_title}</b>
                </span>
              </div>
            )}

            <div className="qz-recs">
              {summary.recommendations.map((r, i) => (
                <article className={`qz-rec qz-rv qz-d${i + 1}`} key={r.slug} style={{ "--c": r.color }}>
                  <RecCover
                    color={r.color}
                    iconId={railIcon(r, i)}
                    index={i}
                    photo={r.cover_image || undefined}
                  >
                    <span className="qz-rec-subj">{r.subject}</span>
                    <span className="qz-rec-why"><Icon id="qi-zap" />{r.why}</span>
                  </RecCover>

                  <div className="qz-rec-body">
                    <h3>{r.title}</h3>
                    <p>{r.note}</p>
                    <div className="qz-rec-meta">
                      <span><Icon id="qi-help" />{r.question_count} questions</span>
                      <span><Icon id="qi-clock" />{r.minutes} min</span>
                      <span>{difficultyLabel(r.difficulty)}</span>
                    </div>
                    <button
                      type="button"
                      className="qz-btn qz-btn--solid"
                      disabled={busy}
                      onClick={() => startQuiz(r.slug)}
                    >
                      Start this quiz <Icon id="qi-arrow" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* ==================== 9 · FINAL CTA ==================== */}
        <section className="qz-sec qz-final">
          <span className="qz-final-glow" aria-hidden="true" />
          <div className="qz-wrap">
            <div className="qz-final-grid">
              <div className="qz-rv">
                <p className="qz-eyebrow"><u>Build the habit</u></p>
                <h2>Practise daily.<br />Improve consistently.</h2>
                <p>Ten questions a day is enough to move accuracy by double digits in a month. Start a set now — it takes ten minutes.</p>
                <div className="qz-final-cta">
                  <button
                    type="button"
                    className="qz-btn qz-btn--white"
                    disabled={busy}
                    onClick={() => (visible[0] ? startQuiz(visible[0].slug) : scrollToQuizzes())}
                  >
                    Start a quiz <Icon id="qi-arrow" />
                  </button>
                  <a className="qz-btn qz-btn--outline" href="#qz-subjects">
                    Explore subjects <Icon id="qi-arrow" />
                  </a>
                </div>
                <div className="qz-final-facts">
                  <div><b>1,000+</b><span>practice questions</span></div>
                  <div><b>16</b><span>ready quiz sets</span></div>
                  <div><b>10 min</b><span>average attempt</span></div>
                </div>
              </div>

              <div className="qz-streak qz-rv qz-d1">
                <div className="qz-streak-h">
                  <b>This week&apos;s practice</b>
                  <span>5 of 7 days</span>
                </div>
                <div className="qz-streak-days">
                  {[
                    ["Mon", true], ["Tue", true], ["Wed", true],
                    ["Thu", false], ["Fri", true], ["Sat", true],
                  ].map(([d, done]) => (
                    <div className={`qz-day${done ? " done" : ""}`} key={d}>
                      <i>{done ? <svg width="14" height="14" viewBox="0 0 24 24"><use href="#qi-check" /></svg> : "—"}</i>
                      <span>{d}</span>
                    </div>
                  ))}
                  <div className="qz-day today"><i>?</i><span>Sun</span></div>
                </div>
                <div className="qz-streak-foot">
                  <span className="qz-sf-ic"><Icon id="qi-fire" /></span>
                  <div><b>12-day streak</b><span>One more set keeps it alive today</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 5 · QUIZ PLAYER (overlay) ==================== */}
        <div className={`qz-scrim${railOpen ? " show" : ""}`} onClick={() => setRailOpen(false)} />

        <div className={`qz-player${playerOpen ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Quiz player">
          {player && (
            <>
              <div className="qz-pbar">
                <div className="qz-pbar-in">
                  <div className="qz-pbar-id">
                    <span className="qz-pbar-ic" style={{ "--c": sb.color }}><Icon id={sb.icon} /></span>
                    <div className="qz-pbar-txt">
                      <b>{player.quiz.title}</b>
                      <span>{sb.name} · {player.quiz.count} questions · {player.quiz.diff}</span>
                    </div>
                  </div>

                  <div className="qz-pbar-mid">
                    {!player.submitted && (
                      <div className="qz-pprog">
                        <div className="qz-pprog-track">
                          <div
                            className="qz-pprog-fill"
                            style={{ width: `${(tally.answered / player.quiz.count) * 100}%` }}
                          />
                        </div>
                        <b>{tally.answered}/{player.quiz.count}</b>
                      </div>
                    )}
                    <div className={`qz-timer${player.left <= 60 && !player.submitted ? " is-low" : ""}`}>
                      <Icon id="qi-clock" /><span>{mmss(player.left)}</span>
                    </div>
                  </div>

                  <div className="qz-pbar-act">
                    {!player.submitted && (
                      <>
                        <button type="button" className="qz-navtoggle" onClick={() => setRailOpen(true)}>
                          <Icon id="qi-grid" /><span>Questions</span>
                        </button>
                        <button
                          type="button"
                          className="qz-btn qz-btn--solid qz-btn--sm"
                          onClick={() => setDialogOpen(true)}
                        >
                          Submit
                        </button>
                      </>
                    )}
                    <button type="button" className="qz-close" aria-label="Exit quiz" onClick={requestExit}>
                      <Icon id="qi-x" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="qz-pbody" ref={bodyRef}>
                {!player.submitted ? (
                  <div className="qz-pgrid">
                    <div className="qz-qpanel">
                      <div className="qz-qtop">
                        <div className="qz-qnum">
                          <b>{player.i + 1}</b>
                          <span>Question {player.i + 1} of {player.quiz.count}</span>
                        </div>
                        <div className="qz-qtopics">
                          <span className="qz-topic">{sb.name}</span>
                          <span className="qz-topic">{q.t}</span>
                          <span className="qz-diff" data-d={player.quiz.diff}><i />{player.quiz.diff}</span>
                        </div>
                      </div>

                      <p className="qz-qtext">{q.q}</p>

                      <div className="qz-opts" role="radiogroup" aria-label="Answer options">
                        {q.o.map((opt, k) => (
                          <button
                            key={k}
                            type="button"
                            className="qz-opt"
                            role="radio"
                            aria-checked={player.answers[player.i] === k}
                            onClick={() => pickAnswer(k)}
                          >
                            <span className="qz-opt-k">{KEYS[k]}</span>
                            <span className="qz-opt-t">{opt}</span>
                          </button>
                        ))}
                      </div>

                      <div className="qz-qnav">
                        <button
                          type="button"
                          className="qz-btn qz-btn--quiet qz-btn--prev"
                          disabled={player.i === 0}
                          onClick={() => goTo(player.i - 1)}
                        >
                          <Icon id="qi-arrow" />Previous
                        </button>
                        <button
                          type="button"
                          className={`qz-btn qz-btn--mark${player.marked[player.i] ? " is-on" : ""}`}
                          onClick={toggleMark}
                        >
                          <Icon id="qi-flag" />{player.marked[player.i] ? "Marked for review" : "Mark for review"}
                        </button>
                        <span className="qz-spacer" />
                        <button type="button" className="qz-btn qz-btn--ghost" onClick={clearAnswer}>
                          Clear answer
                        </button>
                        <button
                          type="button"
                          className="qz-btn qz-btn--solid"
                          onClick={() => (player.i === player.quiz.count - 1 ? setDialogOpen(true) : goTo(player.i + 1))}
                        >
                          {player.i === player.quiz.count - 1
                            ? <>Save &amp; finish <Icon id="qi-check" /></>
                            : <>Save &amp; next <Icon id="qi-arrow" /></>}
                        </button>
                      </div>
                    </div>

                    {/* question navigator */}
                    <aside className={`qz-rail${railOpen ? " is-open" : ""}`}>
                      <div className="qz-rail-h">
                        <h4>Question navigator</h4>
                        <button
                          type="button"
                          className="qz-rail-close"
                          aria-label="Close navigator"
                          onClick={() => setRailOpen(false)}
                        >
                          <Icon id="qi-x" />
                        </button>
                      </div>

                      <div className="qz-nums">
                        {player.quiz.questions.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            className={`qz-num${i === player.i ? " is-current" : ""}`}
                            data-s={statusOf(i)}
                            aria-label={`Question ${i + 1}`}
                            onClick={() => goTo(i)}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>

                      <div className="qz-legend">
                        <div><i className="a" />Answered</div>
                        <div><i />Not answered</div>
                        <div><i className="r" />Marked for review</div>
                        <div><i className="s" />Seen, skipped</div>
                      </div>

                      <div className="qz-tally">
                        <div><b>{tally.answered}</b><span>Answered</span></div>
                        <div><b>{tally.review}</b><span>Review</span></div>
                        <div><b>{tally.left}</b><span>Left</span></div>
                      </div>

                      <button type="button" className="qz-btn qz-btn--solid" onClick={() => setDialogOpen(true)}>
                        Submit quiz <Icon id="qi-check" />
                      </button>
                      <p className="qz-rail-note">You can revisit any question before submitting.</p>
                    </aside>
                  </div>
                ) : (
                  <ResultView
                    player={player}
                    timeUp={timeUp}
                    filter={reviewFilter}
                    onFilter={setReviewFilter}
                    onRetake={(id) => startQuiz(id)}
                    onClose={closeQuiz}
                  />
                )}
              </div>
            </>
          )}
        </div>

        {/* confirm submit dialog */}
        {player && !player.submitted && (
          <div
            className={`qz-dialog${dialogOpen ? " is-open" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="qz-dialog-title"
          >
            <div className="qz-dialog-back" onClick={() => setDialogOpen(false)} />
            <div className="qz-dialog-box">
              <div className="qz-dialog-ic"><Icon id="qi-check-c" /></div>
              <h3 id="qz-dialog-title">Submit this attempt?</h3>
              <p>
                {tally.left
                  ? `You still have ${tally.left} ${tally.left === 1 ? "question" : "questions"} unanswered. Unanswered questions score zero.`
                  : "Every question is answered. You will see your score and the explanation for each question."}
              </p>
              <div className="qz-dialog-stats">
                <span>{tally.answered} answered</span>
                <span>{tally.left} unanswered</span>
                <span>{tally.review} marked</span>
                <span>{mmss(player.left)} left</span>
              </div>
              <div className="qz-dialog-act">
                <button type="button" className="qz-btn qz-btn--quiet" onClick={() => setDialogOpen(false)}>
                  Keep going
                </button>
                <button type="button" className="qz-btn qz-btn--solid" onClick={handleSubmit}>
                  Submit now
                </button>
              </div>
            </div>
          </div>
        )}

        <div className={`qz-toast${toast ? " show" : ""}`}>
          <Icon id="qi-check-c" /><span>{toast}</span>
        </div>
      </main>
    </>
  );
}
