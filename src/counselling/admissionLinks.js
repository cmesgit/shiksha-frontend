// PLACEMENT: src/counselling/admissionLinks.js   (NEW FILE — landing/frontend app)
//
// Decides whether a career's "Explore colleges in India →" button should
// deep-link into the Admission in India directory, or keep the coming-soon
// modal.
//
// WHY THIS EXISTS: the directory is NIRF 2025 top-50 **engineering**
// institutions — that is all the bundle shipped. But the Colleges tab is on
// every career detail page, including Medical, Law, Business and Civil
// Services. Wiring the button unconditionally would send a prospective
// doctor to a list of IITs and call it an answer. A coming-soon modal is a
// worse-looking but more honest result, so careers without coverage keep it.

import { PROGRAMS } from "./data/institutions";

// career key → the `programs` values in the dataset it should filter to.
// Only careers the engineering dataset genuinely covers appear here.
const CAREER_PROGRAMS = {
  Engineering: [],                       // no filter — the whole directory is engineering
  IT: ["Computer Science", "Information Technology", "AI & Data Science"],
};

/** True when we have real institutions to show for this career. */
export function hasAdmissionCoverage(careerKey) {
  return Object.prototype.hasOwnProperty.call(CAREER_PROGRAMS, careerKey);
}

/**
 * Deep link into the directory for a career, or null when uncovered.
 * Programme values are checked against the live PROGRAMS facet so a renamed
 * programme produces no filter rather than a filter that matches nothing
 * and renders an empty list.
 */
export function admissionLinkFor(careerKey) {
  if (!hasAdmissionCoverage(careerKey)) return null;
  const wanted = (CAREER_PROGRAMS[careerKey] || []).filter((p) => PROGRAMS.includes(p));
  const qs = wanted.length ? `?program=${encodeURIComponent(wanted.join(","))}` : "";
  return `/admission/india${qs}`;
}
