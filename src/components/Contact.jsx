import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import "../css/Contact.css";
import { useHomeContent } from "../hooks/useHomeContent";
import { sanitizeInline } from "../utils/sanitizeInline";
import { submitContactMessage, subscribeNewsletter } from "../api/contentApi";
import { ContactScene } from "./contact/contactArt";

/**
 * ShikshaCom — Contact Us.
 *
 * The design handoff ("ShikshaContact.html" and its ContactUs.jsx port) shipped
 * as a standalone, fully hardcoded page. This is that design rebuilt inside the
 * app, wired to the CMS section the page it replaces already used:
 *
 *   contact_hero  — the header block, plus its `contact_card` list items
 *
 * That section has live rows in production holding the PREVIOUS page's words
 * ("Contact ShikshaCom" / "Get in touch with us!"), so every string below is a
 * fallback only — the house "replace-if-present" convention. Until those rows
 * are updated (`manage.py seed_contact_v2_copy` in shiksha-backend does exactly
 * that) this page renders the new layout with the old copy. That is the wiring
 * working, not a bug. Same story as the /about redesign.
 *
 * THREE DELIBERATE DEPARTURES FROM THE HANDOFF
 *
 * 1. **Both forms are real.** The handoff faked success in the browser and
 *    threw the message away — a visitor was told "we got it" while nobody ever
 *    saw it. Both now POST to endpoints that store the submission
 *    (`content.ContactMessage` / `content.NewsletterSubscriber`), and a failed
 *    request is shown as a failure instead of a thank-you.
 *
 * 2. **Every desk email is info@shikshacom.com.** The handoff invented
 *    admissions@ / support@ / partners@ / careers@ addresses; only info@ is
 *    known to exist. Publishing the others would bounce real enquiries.
 *
 * 3. **The `<select>` options carry explicit values.** The handoff's options had
 *    none, so their value was their visible label. The API takes enum values
 *    (`student`, `admissions`, …). Labels are unchanged — this is invisible on
 *    screen and required for the submission to validate.
 *
 * Still hardcoded on purpose — page furniture, not content anyone edits: the
 * section headings, the "What happens next" steps, the four desks and the FAQ.
 * The CMS has no section for any of them and inventing five would be a backend
 * change this page should not smuggle in.
 */

/* The only address confirmed to exist. See departure 2 above. */
const CONTACT_EMAIL = "info@shikshacom.com";

/* ==========================================================================
   Icons — the handoff's inline SVGs, de-duplicated. Same paths, same
   stroke widths; several were repeated five or six times across the page.
   ========================================================================== */
const S = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const ICONS = {
  arrow: (
    <svg viewBox="0 0 24 24" {...S} strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" {...S} strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
  ),
  phoneThin: (
    <svg viewBox="0 0 24 24" {...S} strokeWidth="2.2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" {...S} strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" {...S} strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
  ),
  chatThin: (
    <svg viewBox="0 0 24 24" {...S} strokeWidth="2.2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" {...S} strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
  ),
  clockThin: (
    <svg viewBox="0 0 24 24" {...S} strokeWidth="2.2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" {...S} strokeWidth="2.2"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" /></svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" {...S} strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" {...S} strokeWidth="2"><path d="M3 21h18" /><path d="M5 21V8l7-5 7 5v13" /><path d="M10 21v-6h4v6" /></svg>
  ),
  send: (
    <svg viewBox="0 0 24 24" {...S} strokeWidth="2.4"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4z" /></svg>
  ),
  sendThin: (
    <svg viewBox="0 0 24 24" {...S} strokeWidth="2"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4z" /></svg>
  ),
  parcel: (
    <svg viewBox="0 0 24 24" {...S} strokeWidth="2"><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.7 4H7.3a2 2 0 0 0-1.8 1.1z" /></svg>
  ),
  cap: (
    <svg viewBox="0 0 24 24" {...S} strokeWidth="2"><path d="m22 9-10-5L2 9l10 5z" /><path d="M6 11.5V17c0 1.5 3 3 6 3s6-1.5 6-3v-5.5" /></svg>
  ),
  headset: (
    <svg viewBox="0 0 24 24" {...S} strokeWidth="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>
  ),
  people: (
    <svg viewBox="0 0 24 24" {...S} strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" {...S} strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" {...S} strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
  ),
  tick: (
    <svg viewBox="0 0 24 24" {...S} strokeWidth="3"><path d="m4 12 6 6L20 6" /></svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" {...S} strokeWidth="2.4"><path d="M12 5v14M5 12h14" /></svg>
  ),
};

/* ==========================================================================
   Fallback copy — the design handoff's own words, verbatim.
   ========================================================================== */

const HERO_DEFAULTS = {
  eyebrow: "Contact ShikshaCom",
  heading: "We would love to\nhear",
  heading_secondary: "from you.",
  subhead:
    "Whether it is a question about a course, help with your account, or a partnership you would like to discuss — send us a message and a real person from our team will get back to you, usually within one working day.",
};

/* The four detail tiles. `icon` keys match the values already stored on the
   live contact_card rows (`location`, `email`, `phone`); `building` is new and
   is what seed_contact_v2_copy sets on the regional office. `grad` has no CMS
   column of its own — an editor can override it through the row's `tint`. */
const CARDS_DEFAULT = [
  {
    icon: "location",
    grad: "linear-gradient(135deg,#12b47a 0%,#0B5B3E 100%)",
    title: "Head Office",
    body: "House No. 1473A<br>Maruti Vihar<br>Gurgaon, Haryana – 122002",
    note: "",
  },
  {
    icon: "building",
    grad: "linear-gradient(135deg,#7C5CFC 0%,#12b3a6 100%)",
    title: "Regional Office",
    body: "Hualngohmun Vengchhak<br>Near World Bank Road<br>Aizawl, Mizoram – 796005",
    note: "",
  },
  {
    icon: "email",
    grad: "linear-gradient(135deg,#F59E0B 0%,#E14D2A 100%)",
    title: "Email",
    body: CONTACT_EMAIL,
    note: "We reply within one working day.",
  },
  {
    icon: "phone",
    grad: "linear-gradient(135deg,#3b82f6 0%,#1d4ed8 100%)",
    title: "Phone",
    body: "+0124-4255138 (Haryana)<br>+0389-2300225 (Mizoram)<br>+91 3893570403 (Mizoram)",
    note: "",
  },
];

const CARD_GLYPHS = { location: "location", building: "building", email: "mail", phone: "phone" };

const STEPS = [
  {
    glyph: "parcel",
    nb: "linear-gradient(135deg,#12b47a,#0B5B3E)",
    ng: "rgba(15,157,107,.34)",
    nr: "rgba(15,157,107,.4)",
    title: "A person reads it",
    body: "Your message is read by a person and routed to the right desk the same day.",
  },
  {
    glyph: "sendThin",
    nb: "linear-gradient(135deg,#F59E0B,#E14D2A)",
    ng: "rgba(225,77,42,.3)",
    nr: "rgba(225,77,42,.38)",
    title: "You get a written reply",
    body: "A full answer lands in your inbox within one working day, Monday to Saturday.",
  },
  {
    glyph: "phone",
    nb: "linear-gradient(135deg,#7C5CFC,#12b3a6)",
    ng: "rgba(124,92,252,.3)",
    nr: "rgba(124,92,252,.38)",
    title: "We call if it needs talking through",
    body: "If it is easier on a call, we ring you back at a time that suits you.",
  },
];

const ROLES = [
  { value: "student", label: "Student" },
  { value: "parent", label: "Parent or guardian" },
  { value: "teacher", label: "Teacher or tutor" },
  { value: "school", label: "School or institution" },
  { value: "other", label: "Other" },
];

const TOPICS = [
  { value: "admissions", label: "Admissions & course enquiry" },
  { value: "support", label: "Student support (account, payment, access)" },
  { value: "partnerships", label: "Schools & partnerships" },
  { value: "careers", label: "Careers at ShikshaCom" },
  { value: "feedback", label: "Feedback or something else" },
];

const DESKS = [
  {
    tab: "Admissions",
    glyph: "cap",
    title: "Admissions & Courses",
    body: "Choosing between Class 10 and Class 12 tracks, board coverage, batch timings, fees or the free guest preview — this team walks you through it before you enrol.",
    rows: [
      { glyph: "mail", label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
      { glyph: "phone", label: "Phone", value: "+0124-4255138", href: "tel:+911244255138" },
      { glyph: "clock", label: "Hours", value: "Mon–Sat · 9:30 AM – 6:30 PM" },
    ],
    cta: { label: "Ask about a course", href: "#cp-message" },
  },
  {
    tab: "Student Support",
    glyph: "headset",
    title: "Student Support",
    body: "Already enrolled? Login trouble, missing recordings, payment receipts, doubt sessions or switching a batch — bring it here and we will sort it out.",
    rows: [
      { glyph: "mail", label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
      { glyph: "phone", label: "Phone", value: "+0389-2300225", href: "tel:+913892300225" },
      { glyph: "chat", label: "Response time", value: "Same day on working days" },
    ],
    cta: { label: "Report an issue", href: "#cp-message" },
  },
  {
    tab: "Partnerships",
    glyph: "people",
    title: "Schools & Partnerships",
    body: "Bringing ShikshaCom to a school, an NGO programme or a district initiative — including bulk licences, teacher training and co-branded course tracks.",
    rows: [
      { glyph: "mail", label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
      { glyph: "phone", label: "Phone", value: "+91 3893570403", href: "tel:+913893570403" },
      { glyph: "location", label: "Best reached at", value: "Gurgaon head office" },
    ],
    cta: { label: "Start a conversation", href: "#cp-message" },
  },
  {
    tab: "Careers",
    glyph: "briefcase",
    title: "Careers at ShikshaCom",
    body: "Teachers, content writers, engineers and campus mentors. Send a CV with a short note on what you would like to work on — we read every one.",
    rows: [
      { glyph: "mail", label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
      { glyph: "doc", label: "Please attach", value: "CV in PDF, under 5 MB" },
      { glyph: "clock", label: "You will hear back", value: "Within two weeks" },
    ],
    cta: { label: "Send your CV", href: `mailto:${CONTACT_EMAIL}` },
  },
];

const FAQS = [
  {
    q: "How quickly will someone reply to my message?",
    a: "Messages sent Monday to Saturday are answered within one working day, and usually the same day if they arrive before the afternoon. Anything sent on a Sunday or a public holiday is picked up the next working morning.",
  },
  {
    q: "I am already enrolled and cannot access my course. What do I do?",
    a: "Write to the Student Support desk with the email address you enrolled with and the name of the course. Access issues are treated as priority and are normally restored the same day.",
  },
  {
    q: "Can I visit one of your offices in person?",
    a: "Yes, both the Gurgaon head office and the Aizawl regional office welcome visitors between 9:30 AM and 6:30 PM on working days. Please call ahead so the right person is available when you arrive.",
  },
  {
    q: "Do you help schools and institutions, not just individual students?",
    a: "We do. Schools, NGOs and district programmes can work with us on bulk licences, teacher training and co-branded course tracks. The Partnerships tab above has the direct line for that team.",
  },
  {
    q: "Which languages can I write to you in?",
    a: "English and Hindi are handled by every desk. Mizo is supported by the Aizawl regional office, so questions in Mizo are best sent to the Mizoram numbers listed above.",
  },
];

/* ==========================================================================
   Helpers
   ========================================================================== */

/* A CMS string cannot carry the design's <br>. The convention established on
   /about is a newline in the field, rendered here.

   Fragment, NOT a wrapper <span>: the handoff's h1 is `text<br />text`, and
   wrapping each line adds two elements the design does not have. It made no
   visual difference — the h1's box measured identically either way — but it
   showed up as 626 vs 624 elements when diffing the whole tree against the
   reference, and "structurally identical" is worth having for free. */
function withBreaks(text) {
  const parts = String(text || "").split("\n");
  return parts.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

const EMAIL_RE = /[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+/;
/* Digits, spaces and hyphens only — deliberately NOT `(` or `)`, or
   "+0124-4255138 (Haryana)" would swallow the region into the phone number.
   It must also END on a digit: an open-ended `[\d\s-]{5,}` takes the separating
   space with it, and the remainder then renders as "…4255138(Haryana)" with the
   space eaten. Caught in the browser, not by any assertion. */
const PHONE_RE = /^\+?\d[\d\s-]{4,}\d/;

/**
 * "+0124-4255138" -> "tel:+911244255138".
 *
 * These numbers are written the way they are printed on Indian stationery: a
 * leading 0 is the domestic STD prefix, not a country code, so it has to be
 * replaced by +91 rather than kept. "+91 3893570403" is already country-coded
 * and passes straight through. Both forms appear in the live CMS rows.
 */
function telHref(raw) {
  const digits = String(raw).replace(/\D/g, "");
  if (!digits) return null;
  if (digits.startsWith("91") && digits.length >= 12) return `+${digits}`;
  if (digits.startsWith("0")) return `+91${digits.slice(1)}`;
  if (digits.length === 10) return `+91${digits}`;
  return `+${digits}`;
}

/**
 * Turn one CMS `body` into the design's <address><span> lines.
 *
 * The design links the email and phone values; a CMS row stores them as plain
 * text, so the link has to be derived. Splitting on <br> and reducing each line
 * to text loses any other inline markup an editor might have typed (bold, a
 * hand-written link) — an accepted trade, because this field holds addresses
 * and numbers and the alternative is a page full of unclickable phone numbers.
 */
function addressLines(body) {
  const clean = sanitizeInline(body || "");
  return clean
    .split(/<br\s*\/?>/i)
    .map((chunk) => {
      const el = document.createElement("div");
      el.innerHTML = chunk;
      return (el.textContent || "").trim();
    })
    .filter(Boolean);
}

function AddressLine({ text }) {
  const mail = text.match(EMAIL_RE);
  if (mail) {
    const [before, after] = text.split(mail[0]);
    return (
      <span>
        {before}
        <a href={`mailto:${mail[0]}`}>{mail[0]}</a>
        {after}
      </span>
    );
  }
  const tel = text.match(PHONE_RE);
  if (tel) {
    const number = tel[0].trim();
    const href = telHref(number);
    if (href) {
      return (
        <span>
          <a href={`tel:${href}`}>{number}</a>
          {text.slice(tel[0].length)}
        </span>
      );
    }
  }
  return <span>{text}</span>;
}

/* ==========================================================================
   Behaviour 1 · header offset
   ========================================================================== */
/* Copied from AboutUs.jsx. `--skn-header-h` is a hardcoded :root{82px} in
   SiteNav.css that never moves, while the real header is 78px / 118px with the
   announcement bar / 72px / 112px under 640px. Measuring the live spacer is the
   only way the in-page #cp-message jumps land in the right place. */
function useHeaderOffset(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const spacer = document.querySelector(".skn-spacer");
    if (!spacer) return undefined;

    const apply = () => {
      const h = Math.round(spacer.getBoundingClientRect().height);
      if (h > 0) root.style.setProperty("--cp-header-h", `${h}px`);
    };
    apply();

    if (!("ResizeObserver" in window)) {
      window.addEventListener("resize", apply, { passive: true });
      return () => window.removeEventListener("resize", apply);
    }
    const ro = new ResizeObserver(apply);
    ro.observe(spacer);
    return () => ro.disconnect();
  }, [rootRef]);
}

/* ==========================================================================
   Behaviour 2 · scroll reveal
   ========================================================================== */
/**
 * The handoff's own observer calls `unobserve()` on first intersection. That is
 * safe on a static document and fatal here: the CMS fetch lands after mount,
 * React re-renders with `className="cp-rv"` and drops the imperative `.cp-in`,
 * and nothing is left watching to put it back — the section stays at opacity 0
 * forever. Removed, and `deps` carries the CMS values so the observer re-runs
 * over the new nodes.
 *
 * `deps` must key on row IDENTITY, never on `.length`: the fallback and CMS
 * lists are both four cards long, so a length-keyed dep never changes, while a
 * changed React `key` makes React destroy and recreate the node. That exact bug
 * shipped on /about.
 *
 * ⚠ The revealed flag is a DATA ATTRIBUTE, not a class, and that is load-
 * bearing. React owns `className` on these nodes and rewrites it whenever its
 * value changes — so a `.cp-in` added imperatively here is wiped the instant
 * anything re-renders the element with a different class string. The FAQ items
 * do exactly that on every toggle (`cp-qa cp-rv` -> `cp-qa cp-rv cp-open`), and
 * because the card never leaves the viewport the observer never fires again to
 * put it back. The visible result was the whole card going to opacity 0 the
 * moment you opened it. React does not manage `data-rv`, so it survives.
 */
function useRevealOnScroll(rootRef, deps) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    /* Tell the stylesheet JS is alive, so `.cp-rv` may start invisible. Without
       this the page would be blank if this chunk ever failed to load. */
    root.classList.add("cp-js");

    const reveal = (el) => el.setAttribute("data-rv", "in");
    const items = Array.from(root.querySelectorAll(".cp-rv"));
    if (!("IntersectionObserver" in window)) {
      items.forEach(reveal);
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) reveal(e.target);
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef, deps]);
}

/* ==========================================================================
   Pieces
   ========================================================================== */

function InfoCard({ card, delay }) {
  const lines = useMemo(() => addressLines(card.body), [card.body]);
  return (
    <div
      className={`cp-icard cp-rv${delay ? ` ${delay}` : ""}`}
      style={{ "--grad": card.grad }}
    >
      <span className="cp-icard-ic">{ICONS[CARD_GLYPHS[card.icon] || "location"]}</span>
      <h3>{card.title}</h3>
      <address>
        {lines.map((line, i) => (
          <AddressLine key={i} text={line} />
        ))}
      </address>
      {card.note ? <small>{card.note}</small> : null}
    </div>
  );
}

function FaqItem({ item, index, open, onToggle }) {
  const answerRef = useRef(null);
  const [height, setHeight] = useState(0);

  /* max-height has to be a real number for the .35s transition to animate; a
     ResizeObserver keeps it right if the text rewraps (a phone rotating while
     the answer is open would otherwise clip it). */
  useEffect(() => {
    const el = answerRef.current;
    if (!el || !open) return undefined;
    const measure = () => setHeight(el.scrollHeight);
    measure();
    if (!("ResizeObserver" in window)) return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(el.firstElementChild || el);
    return () => ro.disconnect();
  }, [open]);

  return (
    <div className={`cp-qa cp-rv${open ? " cp-open" : ""}`}>
      <button
        className="cp-qa-q"
        type="button"
        aria-expanded={open}
        aria-controls={`cpa${index}`}
        onClick={onToggle}
      >
        <span>{item.q}</span>
        <span className="cp-qa-ic">{ICONS.plus}</span>
      </button>
      <div
        className="cp-qa-a"
        id={`cpa${index}`}
        ref={answerRef}
        style={{ maxHeight: open ? `${height}px` : 0 }}
      >
        <p>{item.a}</p>
      </div>
    </div>
  );
}

/* ==========================================================================
   The message form
   ========================================================================== */

const EMPTY_FORM = { name: "", email: "", phone: "", role: "", topic: "", message: "" };
const FORM_MAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateField(key, value) {
  const v = (value || "").trim();
  if (key === "phone") return true; // optional, and the handoff never rejected one
  if (!v) return false;
  if (key === "email") return FORM_MAIL_RE.test(v);
  if (key === "message") return v.length >= 10;
  return true;
}

function MessageForm() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [consentError, setConsentError] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState("");
  const [done, setDone] = useState(false);
  const doneRef = useRef(null);

  const set = (key) => (e) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    // Only re-validate a field already showing an error, so typing the first
    // character of an empty required field does not immediately scold you.
    setErrors((prev) =>
      prev[key] ? { ...prev, [key]: !validateField(key, value) } : prev
    );
  };

  const blur = (key) => () =>
    setErrors((prev) => ({ ...prev, [key]: !validateField(key, values[key]) }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setFailed("");

    const nextErrors = {};
    ["name", "email", "phone", "role", "topic", "message"].forEach((k) => {
      if (!validateField(k, values[k])) nextErrors[k] = true;
    });
    setErrors(nextErrors);
    setConsentError(!consent);

    if (Object.keys(nextErrors).length || !consent) {
      const firstBad = Object.keys(nextErrors)[0];
      const el = document.getElementById(firstBad ? `cp${firstBad}` : "cpOk");
      if (el) el.focus();
      return;
    }

    setSending(true);
    try {
      await submitContactMessage({ ...values, consent: true });
      setDone(true);
      // Scroll after paint, or the success card has not been rendered yet.
      requestAnimationFrame(() =>
        doneRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      );
    } catch (err) {
      const status = err?.response?.status;
      setFailed(
        status === 429
          ? "That is a lot of messages from this connection. Please wait a little while, or email us directly at " +
            `${CONTACT_EMAIL}.`
          : "Sorry — your message could not be sent just now. Please try again, or email us directly at " +
            `${CONTACT_EMAIL}.`
      );
    } finally {
      setSending(false);
    }
  };

  const fieldClass = (key) => `cp-field${errors[key] ? " cp-has-err" : ""}`;

  return (
    <>
      <form className={`cp-form${done ? " cp-off" : ""}`} id="cpForm" noValidate onSubmit={onSubmit}>
        <div className={fieldClass("name")}>
          <label htmlFor="cpname">Full name <i>*</i></label>
          <input type="text" id="cpname" name="name" placeholder="e.g. Ananya Sharma" autoComplete="name"
            value={values.name} onChange={set("name")} onBlur={blur("name")} />
          <span className="cp-err">Please tell us your name.</span>
        </div>

        <div className={fieldClass("email")}>
          <label htmlFor="cpemail">Email address <i>*</i></label>
          <input type="email" id="cpemail" name="email" placeholder="you@example.com" autoComplete="email"
            value={values.email} onChange={set("email")} onBlur={blur("email")} />
          <span className="cp-err">Please enter a valid email address.</span>
        </div>

        <div className={fieldClass("phone")}>
          <label htmlFor="cpphone">Phone number</label>
          <input type="tel" id="cpphone" name="phone" placeholder="+91 00000 00000" autoComplete="tel"
            value={values.phone} onChange={set("phone")} onBlur={blur("phone")} />
          <span className="cp-err">Please check this number.</span>
        </div>

        <div className={fieldClass("role")}>
          <label htmlFor="cprole">I am a <i>*</i></label>
          <select id="cprole" name="role" value={values.role} onChange={set("role")} onBlur={blur("role")}>
            <option value="">Select one</option>
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          <span className="cp-err">Please pick an option.</span>
        </div>

        <div className={`${fieldClass("topic")} cp-full`}>
          <label htmlFor="cptopic">What is this about? <i>*</i></label>
          <select id="cptopic" name="topic" value={values.topic} onChange={set("topic")} onBlur={blur("topic")}>
            <option value="">Select a topic</option>
            {TOPICS.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <span className="cp-err">Please pick a topic.</span>
        </div>

        <div className={`${fieldClass("message")} cp-full`}>
          <label htmlFor="cpmessage">Your message <i>*</i></label>
          <textarea id="cpmessage" name="message"
            placeholder="Tell us a little about what you need — the class, the course, or the issue you are facing."
            value={values.message} onChange={set("message")} onBlur={blur("message")} />
          <span className="cp-err">Please write a short message.</span>
        </div>

        <div className="cp-consent">
          <input type="checkbox" id="cpOk" name="consent" checked={consent}
            style={consentError ? { outline: "2px solid #E14D2A" } : undefined}
            onChange={(e) => { setConsent(e.target.checked); setConsentError(!e.target.checked); }} />
          <label htmlFor="cpOk">
            I agree that ShikshaCom may use these details to respond to my enquiry, as described in the{" "}
            <Link to="/terms">privacy policy</Link>.
          </label>
        </div>

        {failed ? <p className="cp-formerr" role="alert">{failed}</p> : null}

        <div className="cp-submit">
          <button className="cp-btn cp-btn--solid" type="submit" aria-busy={sending}>
            {sending ? "Sending…" : "Send message"}
            {ICONS.send}
          </button>
          <span className="cp-note">We never share your details with anyone else.</span>
        </div>
      </form>

      <div className={`cp-done${done ? " cp-on" : ""}`} id="cpDone" ref={doneRef} role="status" aria-live="polite">
        <span className="cp-tick">{ICONS.tick}</span>
        <h4>Thank you — message sent.</h4>
        <p>We have got it. Someone from the right team will write back to you within one working day.</p>
      </div>
    </>
  );
}

/* ==========================================================================
   The newsletter band
   ========================================================================== */

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [bad, setBad] = useState(false);
  const [sending, setSending] = useState(false);
  const inputRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = email.trim();
    if (!FORM_MAIL_RE.test(v)) {
      setBad(true);
      setMsg("Please enter a valid email address.");
      inputRef.current?.focus();
      return;
    }
    setSending(true);
    try {
      await subscribeNewsletter(v);
      setBad(false);
      setMsg("You are on the list — thank you for subscribing.");
      setEmail("");
    } catch (err) {
      setBad(true);
      setMsg(
        err?.response?.status === 429
          ? "Too many attempts from this connection. Please try again later."
          : "Sorry — we could not add you just now. Please try again in a moment."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <form className="cp-sub" id="cpSub" noValidate onSubmit={onSubmit}>
        <span className="cp-sub-ic" aria-hidden="true">{ICONS.mail}</span>
        <label htmlFor="cpSubMail" className="cp-sr"
          style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}>
          Your email address
        </label>
        <input ref={inputRef} type="email" id="cpSubMail" name="email" placeholder="Write Your E-mail"
          autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit" aria-busy={sending}>{sending ? "Sending…" : "Subscribe Now"}</button>
      </form>
      <p className={`cp-submsg${bad ? " cp-bad" : ""}`} id="cpSubMsg" role="status" aria-live="polite">{msg}</p>
    </>
  );
}

/* ==========================================================================
   Page
   ========================================================================== */

export default function Contact() {
  const rootRef = useRef(null);
  const { block, items } = useHomeContent("contact_hero");
  const [tab, setTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const tabRefs = useRef([]);

  const heroEyebrow = block?.eyebrow || HERO_DEFAULTS.eyebrow;
  const heroHeading = block?.heading || HERO_DEFAULTS.heading;
  const heroSecondary =
    block?.heading_secondary || (block?.heading ? "" : HERO_DEFAULTS.heading_secondary);
  const heroSub = block?.subhead || HERO_DEFAULTS.subhead;

  /* Being list items rather than four fixed slots is the point: an editor can
     add a third office or retire a phone line without a deploy. Merge is
     per-FIELD, not per-row — prod rows carry `title` and `body` but no
     `subtitle`, and a whole-row replace would blank whatever was left empty. */
  const cmsCards = useMemo(
    () => items.filter((i) => i.variant === "contact_card"),
    [items]
  );
  const cards = useMemo(() => {
    if (!cmsCards.length) return CARDS_DEFAULT.map((c, i) => ({ ...c, key: `d${i}` }));
    return cmsCards.map((row, i) => {
      const fallback = CARDS_DEFAULT[i % CARDS_DEFAULT.length];
      return {
        key: `cms-${row.id}`,
        icon: row.icon || fallback.icon,
        grad: row.tint || fallback.grad,
        title: row.title || fallback.title,
        body: row.body || fallback.body,
        note: row.subtitle || "",
      };
    });
  }, [cmsCards]);

  useHeaderOffset(rootRef);
  useRevealOnScroll(
    rootRef,
    `${block?.id ?? "none"}|${cards.map((c) => c.key).join(",")}`
  );

  const onTabKey = useCallback(
    (e, i) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      const n = (i + (e.key === "ArrowRight" ? 1 : DESKS.length - 1)) % DESKS.length;
      setTab(n);
      tabRefs.current[n]?.focus();
    },
    []
  );

  return (
    <main className="contact-page" ref={rootRef}>

      {/* ============================ 1 · HERO ============================ */}
      <section className="cp-hero">
        <div className="cp-wrap">
          <div className="cp-hero-grid">

            <div className="cp-hero-copy cp-rv">
              <span className="cp-badge"><i></i>{heroEyebrow}</span>
              <h1>
                {withBreaks(heroHeading)}
                {heroSecondary ? <> <span className="cp-em">{heroSecondary}</span></> : null}
              </h1>
              <p className="cp-hero-sub">{heroSub}</p>

              <div className="cp-hero-cta">
                <a className="cp-btn cp-btn--solid" href="#cp-message">Send a message{ICONS.arrow}</a>
                <a className="cp-btn cp-btn--ghost" href="tel:+911244255138">Call us{ICONS.phoneThin}</a>
              </div>

              <div className="cp-facts">
                <span className="cp-fact">{ICONS.clockThin}Mon–Sat · 9:30 AM – 6:30 PM</span>
                <span className="cp-fact">{ICONS.chatThin}Replies within 24 hours</span>
                <span className="cp-fact">{ICONS.globe}Support in English &amp; Hindi</span>
              </div>
            </div>

            {/* illustration */}
            <div className="cp-eco cp-rv cp-d2">
              <span className="cp-spark cp-s1" aria-hidden="true"></span>
              <span className="cp-spark cp-s2" aria-hidden="true"></span>
              <span className="cp-spark cp-s3" aria-hidden="true"></span>

              <div className="cp-eco-disc">
                <div className="cp-eco-art"><ContactScene /></div>
              </div>

              <div className="cp-chip cp-fa">
                <span className="cp-chip-ic" style={{ background: "linear-gradient(135deg,#12b47a,#0B5B3E)" }}>{ICONS.chat}</span>
                <div><b>Support desk open</b><span>Mon–Sat, 9:30–6:30</span></div>
              </div>
              <div className="cp-chip cp-fb">
                <span className="cp-chip-ic" style={{ background: "linear-gradient(135deg,#F59E0B,#E14D2A)" }}>{ICONS.mail}</span>
                <div><b>Email us</b><span>Reply within 24 hrs</span></div>
              </div>
              <div className="cp-chip cp-fc">
                <span className="cp-chip-ic" style={{ background: "linear-gradient(135deg,#3b82f6,#1d4ed8)" }}>{ICONS.phone}</span>
                <div><b>Call back</b><span>At a time you pick</span></div>
              </div>
              <div className="cp-chip cp-fd">
                <span className="cp-chip-ic" style={{ background: "linear-gradient(135deg,#7C5CFC,#12b3a6)" }}>{ICONS.location}</span>
                <div><b>Two offices</b><span>Gurgaon &amp; Aizawl</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= 2 · CONTACT DETAILS ======================= */}
      <section className="cp-sec" style={{ paddingTop: "clamp(30px,4vw,54px)" }}>
        <div className="cp-wrap">
          <div className="cp-head cp-rv">
            <span className="cp-eyebrow"><u>Reach Us</u></span>
            <h2>Where to find <span className="cp-em">ShikshaCom</span></h2>
            <p>Two offices, one team. Write, call or drop by — whichever is easiest for you.</p>
          </div>

          <div className="cp-info">
            {cards.map((card, i) => (
              <InfoCard key={card.key} card={card} delay={i % 4 ? `cp-d${i % 4}` : ""} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================= 3 · MESSAGE FORM ========================= */}
      <section className="cp-sec cp-soft" id="cp-message">
        <span className="cp-dots"></span>
        <div className="cp-wrap">
          <div className="cp-split">

            <div className="cp-copy cp-rv">
              <span className="cp-eyebrow"><u>Send a Message</u></span>
              <h2>Tell us what you<br />need <span className="cp-em">help with.</span></h2>
              <p>Fill in the form and it lands directly with the team that can actually answer it — no
                ticket queue, no copy-paste replies. The more detail you give us, the more useful our
                first response will be.</p>

              <span className="cp-sublabel">What happens next</span>
              <ol className="cp-tl">
                {STEPS.map((s, i) => (
                  <li className="cp-tl-item" key={s.title}>
                    <span className="cp-tl-node" style={{ "--nb": s.nb, "--ng": s.ng, "--nr": s.nr }}>
                      {ICONS[s.glyph]}
                      <i className="cp-tl-step">{i + 1}</i>
                    </span>
                    <div className="cp-tl-body"><b>{s.title}</b><p>{s.body}</p></div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="cp-formcard cp-rv cp-d2">
              <h3>Write to us</h3>
              <p>Fields marked with <i style={{ color: "var(--cp-emerald)", fontStyle: "normal" }}>*</i> are required.</p>
              <MessageForm />
            </div>

          </div>
        </div>
      </section>

      {/* ============================ 4 · DESKS ============================ */}
      <section className="cp-sec">
        <div className="cp-wrap">
          <div className="cp-head cp-rv">
            <span className="cp-eyebrow"><u>Direct Lines</u></span>
            <h2>Reach the <span className="cp-em">right desk</span></h2>
            <p>Skip the general inbox. Pick what your question is about and contact that team directly.</p>
          </div>

          <div className="cp-rv cp-d1">
            <div className="cp-tabs" role="tablist" aria-label="Contact departments">
              {DESKS.map((d, i) => (
                <button
                  key={d.tab}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  className="cp-tab"
                  type="button"
                  role="tab"
                  aria-selected={tab === i}
                  aria-controls={`cp-p${i}`}
                  id={`cp-t${i}`}
                  onClick={() => setTab(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  {d.tab}
                </button>
              ))}
            </div>

            {DESKS.map((d, i) => (
              <div
                key={d.tab}
                className={`cp-panel${tab === i ? " cp-on" : ""}`}
                id={`cp-p${i}`}
                role="tabpanel"
                aria-labelledby={`cp-t${i}`}
              >
                <div className="cp-deck">
                  <div className="cp-deck-l">
                    <span className="cp-deck-ic">{ICONS[d.glyph]}</span>
                    <h3>{d.title}</h3>
                    <p>{d.body}</p>
                  </div>
                  <div className="cp-deck-r">
                    {d.rows.map((r) => {
                      const inner = (
                        <>
                          <span className="cp-row-ic">{ICONS[r.glyph]}</span>
                          <div className="cp-row-tx">
                            <span className="cp-row-lab">{r.label}</span>
                            <b>{r.value}</b>
                          </div>
                        </>
                      );
                      return r.href ? (
                        <a className="cp-row" href={r.href} key={r.label}>{inner}</a>
                      ) : (
                        <div className="cp-row" key={r.label}>{inner}</div>
                      );
                    })}
                    <a className="cp-btn cp-btn--solid" href={d.cta.href}>{d.cta.label}{ICONS.arrow}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================= 5 · FAQ ============================= */}
      <section className="cp-sec cp-soft">
        <div className="cp-wrap">
          <div className="cp-head cp-rv">
            <span className="cp-eyebrow"><u>Questions</u></span>
            <h2>Before you <span className="cp-em">write in</span></h2>
            <p>A few things people ask us most often — the answer may already be here.</p>
          </div>

          <div className="cp-faq">
            {FAQS.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                index={i}
                open={openFaq === i}
                onToggle={() => setOpenFaq((cur) => (cur === i ? null : i))}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========================= 6 · NEWSLETTER CTA ========================= */}
      <section className="cp-sec" style={{ paddingTop: "clamp(30px,4vw,54px)" }}>
        <div className="cp-wrap">
          <div className="cp-cta cp-rv">
            <svg className="cp-cwm cp-a" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></svg>
            <svg className="cp-cwm cp-b" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>

            <span className="cp-eyebrow"><u>Stay in the loop</u></span>
            <h2>Subscribe to our newsletter<br />&amp; get every update.</h2>
            <p>New course launches, batch dates, exam notes and study tips — one email a month, nothing else.</p>

            <NewsletterForm />
          </div>
        </div>
      </section>

    </main>
  );
}
