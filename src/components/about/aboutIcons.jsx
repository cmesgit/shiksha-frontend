/* ============================================================================
   AboutUs — icon set
   ----------------------------------------------------------------------------
   Every small inline SVG the About Us design handoff uses, lifted verbatim from
   its AboutUs.jsx and keyed so the CMS can pick one by name.

   Why a registry and not react-icons: the handoff draws its own 24×24 stroked
   set, and the page's CSS sizes and colours them by class (.ap-card-ic svg,
   .ap-scard__ic svg, …). Swapping in react-icons would change every glyph on
   the page. About2.jsx mapped `icon` keys to react-icons components; this is the
   same contract with the handoff's own artwork behind it.

   The four mission keys — users / wrench / sprout / home — are NOT arbitrary:
   they are the exact `icon` values already stored on the four live
   `about_mission` pillar rows in production. Renaming one silently drops that
   card back to its index fallback.
   ============================================================================ */

import ScribbleIcon from "../icons/ScribbleIcon";

export const ICONS = {
  /* mission pillar 1 · supportive community */
  users: <ScribbleIcon name="users" />,
  /* mission pillar 2 · cutting-edge tools */
  wrench: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  /* mission pillar 3 · inclusive education */
  sprout: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>,
  /* mission pillar 4 · urban-rural gap */
  home: <ScribbleIcon name="home" />,
  /* initiative 01 · technology-led learning */
  init1: <ScribbleIcon name="laptop" />,
  /* initiative 02 · knowledge for remote areas */
  init2: <ScribbleIcon name="globe" />,
  /* initiative 03 · learning for everyone */
  init3: <ScribbleIcon name="users" />,
  /* initiative 04 · career awareness */
  init4: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  /* initiative 05 · classroom at your doorstep */
  init5: <ScribbleIcon name="home" />,
  /* why 01 · interactive courses */
  layers: <ScribbleIcon name="courses" />,
  /* why 02 · live classes */
  video: <ScribbleIcon name="video" />,
  /* why 03 · personalised dashboards */
  gauge: <ScribbleIcon name="dashboard" />,
  /* why 04 · vibrant community */
  chat: <ScribbleIcon name="message" />,
  /* value 1 · commitment to excellence */
  medal: <ScribbleIcon name="award" />,
  /* value 2 · quality */
  value2: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7z"/></svg>,
  /* value 3 · inclusivity */
  value3: <ScribbleIcon name="users" />,
  /* value 4 · innovation */
  value4: <ScribbleIcon name="idea" />,
  /* hero node · knowledge */
  book: <ScribbleIcon name="book" />,
  /* hero node · learners */
  people: <ScribbleIcon name="users" />,
  /* hero node · goals */
  target: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  /* hero node · ideas */
  bulb: <ScribbleIcon name="idea" />,
  /* hero node · online */
  monitor: <ScribbleIcon name="laptop" />,
  /* button chevron */
  arrow: <ScribbleIcon name="arrow-right" />,
  /* "Our vision" button */
  eye: <ScribbleIcon name="eye" />,
  /* vision chip */
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  /* carousel previous */
  caretLeft: <ScribbleIcon name="arrow-left" />,
  /* carousel next */
  caretRight: <ScribbleIcon name="arrow-right" />,
  /* "scroll to stack" hint */
  caretDown: <ScribbleIcon name="chevron-down" />,
  /* "create free account" CTA */
  userPlus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>,
};

/* Unknown or empty CMS icon keys must never render a hole where a glyph should
   be, so callers pass the hardcoded same-index icon as `fallback` — the same
   rule About2.jsx documented for its pillar icons. */
export function icon(key, fallback = null) {
  return (key && ICONS[key]) || fallback;
}
