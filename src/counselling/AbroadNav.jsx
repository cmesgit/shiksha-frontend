// PLACEMENT: src/counselling/AbroadNav.jsx   (NEW FILE — landing/frontend app)
//
// The Admission Abroad product sub-nav: Home · Universities · Countries · Guide.
//
// WHY IT EXISTS: `/admission/abroad/countries` shipped to dev with ZERO inbound
// links — the route was reachable only by typing the URL. Nothing on
// /admission/abroad, nothing in Navbar.jsx and nothing on the counselling
// landing pointed at it. This bar is the door.
//
// ── Where the four tabs come from ────────────────────────────────────
// The design board (`~/Downloads/Admission in India design.pdf`, exported
// 2026-11-17 — the filename says India, the board is Admission Abroad) draws
// a header row of exactly these four, with the current one as a filled
// dark-green pill, plus `Talk to counsellor` and `Sign up` at the right.
//
// ── The two readings that had to be resolved, and why ────────────────
//   * `Home` points at the SITE home. The board draws this row where our
//     Navbar sits, and our Navbar's own home is the brand logo → "/"
//     (Navbar.jsx:830). The board is that row redrawn, not a second nav
//     below it. Navbar also names exactly ONE Admission Abroad destination,
//     `/admission/abroad` (Navbar.jsx:204-210), which is why `Universities`
//     takes it rather than a new route: that page IS the universities
//     directory — its own H2 is "Explore universities abroad" and its stat
//     tile reads "Universities 100". Splitting it would have invented a
//     Home screen no board specifies and changed a URL already live on prod.
//   * `Sign up` is NOT repeated here. The site Navbar renders its own Sign Up
//     ~40px above this bar, and it is the wrong control entirely for a
//     signed-in reader. `Talk to counsellor` has no Navbar equivalent, is a
//     real destination, and is kept.
//
// ── Guide ────────────────────────────────────────────────────────────
// There is no study-abroad guide screen. The tab is rendered as the board
// draws it but inert, marked "Soon" — the same thing Navbar.jsx does with
// `soon: true` for Industrial/Specialized Skills, and Content Studio's nav
// does for its unbuilt screens. A tab that navigates nowhere, or quietly
// lands on the INDIA guides, would be the "advertises a screen that does not
// exist" trap this area keeps falling into.
//
// This bar renders INSIDE the gated screens, so it inherits
// `admission_abroad_enabled` from AdmissionAbroadRoute and cannot become a
// second, unguarded entrance.

import React from "react";
import { Link } from "react-router-dom";

// key, label, destination (null = not built yet)
export const ABROAD_TABS = [
  ["home", "Home", "/"],
  ["universities", "Universities", "/admission/abroad"],
  ["countries", "Countries", "/admission/abroad/countries"],
  ["guide", "Guide", null],
];

export default function AbroadNav({ current = "" }) {
  return (
    <nav className="ab-nav" aria-label="Admission Abroad">
      <div className="ab-nav-tabs">
        {ABROAD_TABS.map(([key, label, to]) => {
          const on = key === current;
          if (!to) {
            return (
              <span key={key} className="ab-navlink is-soon">
                {label}
                <span className="ab-nav-soon">Soon</span>
              </span>
            );
          }
          return (
            <Link
              key={key}
              to={to}
              className={`ab-navlink${on ? " on" : ""}`}
              aria-current={on ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
      </div>
      <Link className="ab-nav-cta" to="/counselling/counsellors">
        Talk to counsellor
      </Link>
    </nav>
  );
}
