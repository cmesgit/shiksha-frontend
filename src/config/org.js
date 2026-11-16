// PLACEMENT: src/config/org.js   (NEW FILE — landing/frontend app)
//
// The company's legal identity and registered office, in one place.
//
// ── Why this file exists ─────────────────────────────────────────────
// The street address was hardcoded in five places and disagreed with
// itself: the two legal pages said "House No. – 1473" while the footer
// and the contact page said "1473A". A reader comparing the Terms page
// to the footer sees two different buildings, which is exactly the kind
// of thing that undermines a legal notice.
//
// "1473A" is the authoritative value. The CMS seed that writes the live
// contact rows uses it (`content/management/commands/seed_contact_v2_copy.py`)
// and its test asserts it (`content/tests/test_seed_contact_copy.py:37`),
// so the address a visitor sees on /contact has always been 1473A. The
// legal pages were the outliers.
//
// Separator style follows the live CMS rows: no dash after "House No.",
// an en-dash before the postcode.

export const ORG_LEGAL_NAME = "CM Engineering Solution";
export const ORG_TRADING_NAME = "ShikshaCom Learning Management System";
export const ORG_CONTACT_EMAIL = "info@shikshacom.com";

/** Registered office, as structured parts — build whatever shape you need. */
export const REGISTERED_OFFICE = {
  line1: "House No. 1473A",
  line2: "Maruti Vihar",
  city: "Gurgaon",
  state: "Haryana",
  postcode: "122002",
  country: "India",
};

/** One-line form, for running prose ("…registered office at {X}."). */
export const REGISTERED_OFFICE_INLINE =
  `${REGISTERED_OFFICE.line1}, ${REGISTERED_OFFICE.line2}, ` +
  `${REGISTERED_OFFICE.city}, ${REGISTERED_OFFICE.state} – ${REGISTERED_OFFICE.postcode}`;

/** Address-block lines, for a <address>/card rendered one line per entry. */
export const REGISTERED_OFFICE_LINES = [
  REGISTERED_OFFICE.line1,
  REGISTERED_OFFICE.line2,
  `${REGISTERED_OFFICE.city}, ${REGISTERED_OFFICE.state}`,
  `Pin – ${REGISTERED_OFFICE.postcode}`,
];

/** HTML form with <br>, for CMS-shaped card bodies that are sanitised inline. */
export const REGISTERED_OFFICE_HTML =
  `${REGISTERED_OFFICE.line1}<br>${REGISTERED_OFFICE.line2}` +
  `<br>${REGISTERED_OFFICE.city}, ${REGISTERED_OFFICE.state} – ${REGISTERED_OFFICE.postcode}`;
