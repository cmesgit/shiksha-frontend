// PLACEMENT: src/counselling/AdmissionHelpModal.jsx   (NEW FILE)
//
// The lead-capture modal behind every "Get admission help" and "Talk to
// counsellor" control on the Admission Abroad board
// (claude.ai/artifact/4nxDHtLVf28SB9DTNzFxga#artboard-e1ccdaae93d6).
//
// ── Why this exists ──────────────────────────────────────────────────
// Every one of these buttons was shipped as a <Link to="/counselling/
// counsellors">, on the (never checked) assumption that it just navigated.
// Clicking it on the real board — not screenshotting it — showed it opens
// this modal instead, on BOTH the university-card button and the header's
// global button, with two copy variants sharing one field set:
//   * from a university: "Get admission help" / "...help you plan your
//     application to {University}."
//   * from the header:   "Talk to a study abroad counsellor" / "...a
//     ShikshaCom counsellor will call you back."
//
// ── Where it submits ─────────────────────────────────────────────────
// There is no dedicated "admission help" endpoint, and none was built for
// this — `/api/content/contact/` (ContactMessage) already exists for
// exactly this shape: a public, unauthenticated, durable lead with a
// `topic=admissions` choice that fits verbatim. Only wrinkle: that model
// required email and left phone optional, the REVERSE of this form (mobile
// required, email optional). Fixed with one migration making
// ContactMessage.email blank=True — approved explicitly rather than
// shimmed around, see the commit. `role` is always sent as "student": the
// board's form never asks for it, and a student is overwhelmingly the
// likely sender of a study-abroad enquiry.
//
// `message` is composed from the fields the backend has no column for
// (preferred country, course/study level, which university) rather than
// inventing new ContactMessage columns for a two-field addition.

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { submitContactMessage } from "../api/contentApi";

// Same pattern PhoneGate.jsx already validates against — Indian mobile,
// 10 digits, first digit 6-9. Backend does not enforce a phone format
// (CharField, no validators), so this is UX only; the message still gets
// through with a malformed number rather than losing the lead over a typo.
const PHONE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AdmissionHelpModal({ open, onClose, title, subtitle, defaultCountry = "", universityName }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState(defaultCountry);
  const [course, setCourse] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState("");
  const [done, setDone] = useState(false);
  const firstFieldRef = useRef(null);

  // Reset to a blank form each time the modal is freshly opened — a visitor
  // closing one university's form and opening another's should not see the
  // previous university's half-filled answers, only the new default country.
  useEffect(() => {
    if (open) {
      setName(""); setMobile(""); setEmail(""); setCourse("");
      setCountry(defaultCountry); setConsent(false); setErrors({});
      setFailed(""); setDone(false);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => firstFieldRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open, defaultCountry]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    setFailed("");

    const next = {};
    if (!name.trim()) next.name = true;
    if (!PHONE_RE.test(mobile.trim())) next.mobile = true;
    if (email.trim() && !EMAIL_RE.test(email.trim())) next.email = true;
    if (!consent) next.consent = true;
    setErrors(next);
    if (Object.keys(next).length) return;

    const messageLines = [
      universityName
        ? `Study abroad admission help request for ${universityName}.`
        : "Study abroad counsellor callback request.",
      `Preferred country: ${country.trim() || "Not specified"}.`,
      `Course / study level: ${course.trim() || "Not specified"}.`,
    ];

    setSending(true);
    try {
      await submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        phone: mobile.trim(),
        role: "student",
        topic: "admissions",
        message: messageLines.join(" "),
        consent: true,
      });
      setDone(true);
    } catch (err) {
      setFailed(
        err?.response?.status === 429
          ? "That's a lot of requests from this connection — please wait a little while and try again."
          : "Sorry — that couldn't be sent just now. Please try again in a moment."
      );
    } finally {
      setSending(false);
    }
  };

  return createPortal(
    <div className="ahm-mask" onClick={onClose}>
      <div className="ahm-box" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="ahm-head">
          <div>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
          <button className="ahm-x" onClick={onClose} aria-label="Close">×</button>
        </div>

        {done ? (
          <div className="ahm-done" role="status" aria-live="polite">
            <span className="ahm-done-tick" aria-hidden="true">✓</span>
            <h3>Thanks — we've got it.</h3>
            <p>A ShikshaCom counsellor will call you on {mobile} about study abroad admissions.</p>
            <button className="sc-btn green" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <label className="ahm-field">
              <span>Full name <i aria-hidden="true">*</i></span>
              <input ref={firstFieldRef} value={name} onChange={(e) => setName(e.target.value)}
                     className={errors.name ? "ahm-err" : ""} />
              {errors.name && <small className="ahm-errtx">Please tell us your name.</small>}
            </label>

            <label className="ahm-field">
              <span>Mobile number <i aria-hidden="true">*</i></span>
              <input value={mobile} onChange={(e) => setMobile(e.target.value)}
                     placeholder="10-digit Indian mobile" inputMode="numeric"
                     className={errors.mobile ? "ahm-err" : ""} />
              <small className="ahm-hint">We'll only use this to call you about study abroad admissions.</small>
              {errors.mobile && <small className="ahm-errtx">Enter a 10-digit mobile number starting with 6, 7, 8 or 9.</small>}
            </label>

            <label className="ahm-field">
              <span>Email (optional)</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                     className={errors.email ? "ahm-err" : ""} />
              {errors.email && <small className="ahm-errtx">That doesn't look like a valid email address.</small>}
            </label>

            <label className="ahm-field">
              <span>Preferred country</span>
              <input value={country} onChange={(e) => setCountry(e.target.value)} />
            </label>

            <label className="ahm-field">
              <span>Course / study level</span>
              <input value={course} onChange={(e) => setCourse(e.target.value)} placeholder="e.g. MS Computer Science" />
            </label>

            <label className={`ahm-consent${errors.consent ? " ahm-err" : ""}`}>
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
              <span>
                I agree that ShikshaCom may contact me by phone, SMS, WhatsApp or email about study
                abroad admissions, and I have read the privacy policy. I can withdraw consent at any time.
              </span>
            </label>

            {failed && <p className="ahm-errtx ahm-failed">{failed}</p>}

            <button className="sc-btn ahm-submit" type="submit" disabled={sending}>
              {sending ? "Submitting…" : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
