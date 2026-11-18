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
// ── Where the tabs point, and how that was settled ──────────────────
// The Admission Abroad board (#artboard-e1ccdaae93d6, read in the browser
// 2026-11-17) draws this bar with HOME active on a hero screen. So the bar
// is the PRODUCT's nav and `Home` is the product's home, not the site's.
//
// I originally shipped `Home` -> "/" and `Universities` -> /admission/abroad,
// reasoning from Navbar.jsx because the board could not be read from a
// Claude Code session at the time. That was wrong, and it is the reason
// /admission/abroad was split: Home is the hero, Universities is the 100-row
// directory at /admission/abroad/universities — the same shape the India
// side already had as /admission/india and /admission/india/all.
//
// `Sign up` from the board is NOT repeated here: the site Navbar renders its
// own ~40px above this bar, and it is the wrong control for a signed-in
// reader. `Talk to counsellor` has no Navbar equivalent and is kept.
//
// ── Guide ────────────────────────────────────────────────────────────
// Points at the CMS guide "Study Abroad — Admissions Handbook"
// (/counselling/guides/study-abroad), the exact twin of the India side's
// "Study in India — Admissions Handbook". There is NO Guide artboard — the
// design project holds only two boards, Admission in India v2 and Admission
// Abroad — so rather than invent a screen, this reuses the guide reader that
// already exists and is already linked from ten places.
//
// Imported 2026-11-17 from abroad2.0.docx (9 chapters, 216 sections) via
// `manage.py import_career_guides --only study-abroad`. abroad3.docx was
// NOT used: it is a composite of a handbook, a subject catalogue and ~53
// country guides, with 243 duplicate section titles.
//
// It was an inert "Soon" chip before the import, because a tab that
// navigates nowhere — or quietly lands on the INDIA guides — is the
// "advertises a screen that does not exist" trap this area keeps hitting.
//
// This bar renders INSIDE the gated screens, so it inherits
// `admission_abroad_enabled` from AdmissionAbroadRoute and cannot become a
// second, unguarded entrance.

import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdmissionHelpModal from "./AdmissionHelpModal";

// key, label, destination (null = not built yet)
const ABROAD_TABS = [
  ["home", "Home", "/admission/abroad"],
  ["universities", "Universities", "/admission/abroad/universities"],
  ["countries", "Countries", "/admission/abroad/countries"],
  ["guide", "Guide", "/counselling/guides/study-abroad"],
];

export default function AbroadNav({ current = "" }) {
  // 🔴 Driven on the board, not screenshotted: this button does not
  // navigate to /counselling/counsellors at all. It opens the same
  // lead-capture modal "Get admission help" buttons open, titled "Talk to
  // a study abroad counsellor" when reached from here with no
  // university context. See AdmissionHelpModal.jsx.
  const [helpOpen, setHelpOpen] = useState(false);

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
      <button className="ab-nav-cta" onClick={() => setHelpOpen(true)}>
        Talk to counsellor
      </button>
      <AdmissionHelpModal
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        title="Talk to a study abroad counsellor"
        subtitle="Share your details and a ShikshaCom counsellor will call you back."
      />
    </nav>
  );
}
