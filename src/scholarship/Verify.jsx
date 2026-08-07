// Screen 3 — Identity verification, "Step 2 of 6". Requires auth (this is
// the flow's actual auth gate — ProtectedRoute in App.jsx handles the
// ?next= redirect-to-login-and-back).
//
// Departs from the design prototype on purpose: the mockup shows 4 status
// ticks completing in ~3 seconds then auto-advancing. That's honest for
// digilocker/aadhaar_otp/manual ONLY once a vendor is wired or an admin has
// reviewed — those still land on status=pending and stay there. This screen
// submits for real and polls the real status for those methods.
//
// aadhaar_offline is different: it verifies SYNCHRONOUSLY against UIDAI's
// own published signing certificate (see backend scholarship/
// aadhaar_offline.py) — no vendor, no waiting, genuinely instant. Which
// methods are actually enabled is read from the server
// (getScholarshipConfig().verification_methods), not hardcoded — an admin
// can toggle any of them without a frontend deploy.
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { startGuardianVerification, getGuardianVerificationStatus, getScholarshipConfig } from "../api/scholarshipApi";
import ScholarshipShell from "./ScholarshipShell";

const UIDAI_GENERATE_URL =
  "https://uidai.gov.in/en/307-faqs/aadhaar-online-services/aadhaar-paperless-offline-e-kyc/10731-how-to-generate-offline-aadhaar-2.html";

const ALL_METHODS = [
  ["digilocker", "DigiLocker", "Your parent/guardian fetches verified school records directly from their DigiLocker account.", "Recommended"],
  ["aadhaar_offline", "Aadhaar (Offline e-KYC)", "Download your free Offline e-KYC file from the UIDAI portal and upload it here — verified instantly, no waiting.", "Free & instant"],
  ["aadhaar_otp", "Aadhaar OTP", "Your parent/guardian verifies with the mobile number registered against their Aadhaar.", "Fastest"],
  ["manual", "Manual document review", "Upload a school ID or marksheet. Reviewed within 24 hours.", "Fallback"],
];

const CTA_LABEL = {
  digilocker: "Verify with DigiLocker",
  aadhaar_offline: "Verify with Offline e-KYC",
  aadhaar_otp: "Verify with Aadhaar OTP",
  manual: "Verify with document upload",
};

export default function Verify() {
  const navigate = useNavigate();
  const [enabledMethods, setEnabledMethods] = useState(null);
  const [method, setMethod] = useState(null);
  const [consent, setConsent] = useState(false);
  const [file, setFile] = useState(null);
  const [ekycZip, setEkycZip] = useState(null);
  const [shareCode, setShareCode] = useState("");
  const [status, setStatus] = useState(null); // null | record
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const pollRef = useRef(null);

  useEffect(() => {
    let alive = true;
    getScholarshipConfig().then((cfg) => {
      if (!alive) return;
      const methods = cfg.verification_methods || {};
      setEnabledMethods(methods);
      const firstEnabled = ALL_METHODS.find(([key]) => methods[key])?.[0] || null;
      setMethod(firstEnabled);
    });
    getGuardianVerificationStatus().then((rec) => { if (alive) setStatus(rec); });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (status?.status === "verified") {
      const t = setTimeout(() => navigate("/scholarship/details"), 700);
      return () => clearTimeout(t);
    }
    if (status?.status === "pending") {
      pollRef.current = setInterval(async () => {
        const rec = await getGuardianVerificationStatus();
        setStatus(rec);
      }, 4000);
      return () => clearInterval(pollRef.current);
    }
  }, [status, navigate]);

  const handleSubmit = async () => {
    if (!consent) { setError("Please confirm the consent statement above."); return; }
    if (method === "manual" && !file) { setError("Please choose a document to upload."); return; }
    if (method === "aadhaar_offline" && (!ekycZip || !shareCode.trim())) {
      setError("Please choose your e-KYC ZIP file and enter its share code.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const rec = await startGuardianVerification(
        method,
        method === "manual"
          ? { manualDocument: file }
          : method === "aadhaar_offline"
            ? { ekycZip, shareCode: shareCode.trim() }
            : {}
      );
      setStatus(rec);
    } catch (err) {
      setError(
        err.response?.data?.detail
        || err.response?.data?.method?.[0]
        || err.response?.data?.manual_document
        || "Couldn't submit verification. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (status?.status === "verified") {
    return (
      <ScholarshipShell step="verify">
        <div className="sch-flow-col sch-narrow" style={{ textAlign: "center", paddingTop: 80 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--sch-green)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 20px" }}>✓</div>
          <h1 className="sch-flow-h1">Identity confirmed.</h1>
          <p className="sch-flow-lead" style={{ margin: "0 auto" }}>Continuing to educational details…</p>
        </div>
      </ScholarshipShell>
    );
  }

  if (status?.status === "pending") {
    return (
      <ScholarshipShell step="verify">
        <div className="sch-flow-col sch-narrow" style={{ textAlign: "center", paddingTop: 80 }}>
          <div className="sch-spinner" style={{ margin: "0 auto 24px" }} />
          <h1 className="sch-flow-h1">Verification submitted.</h1>
          <p className="sch-flow-lead" style={{ margin: "0 auto" }}>
            {status.method === "manual"
              ? "A team member reviews document uploads within 24 hours. This page will continue automatically once approved — you can safely close it and come back."
              : "We're waiting on confirmation from the verification provider. This page will continue automatically once it's done."}
          </p>
        </div>
      </ScholarshipShell>
    );
  }

  if (status?.status === "rejected") {
    return (
      <ScholarshipShell step="verify">
        <div className="sch-flow-col sch-narrow" style={{ textAlign: "center", paddingTop: 60 }}>
          <h1 className="sch-flow-h1">We couldn't verify that.</h1>
          <p className="sch-flow-lead" style={{ margin: "0 auto" }}>{status.rejection_reason || "Please try a different verification method."}</p>
          <button className="sch-btn sch-btn-primary" onClick={() => setStatus(null)}>Try again</button>
        </div>
      </ScholarshipShell>
    );
  }

  const visibleMethods = ALL_METHODS.filter(([key]) => enabledMethods?.[key]);

  return (
    <ScholarshipShell step="verify">
      <div className="sch-flow-col" style={{ maxWidth: 900 }}>
        <div style={{ display: "inline-block", background: "var(--sch-green-tint)", color: "var(--sch-green-text-on-tint)", borderRadius: 999, padding: "6px 14px", fontSize: 12.5, fontWeight: 600, marginBottom: 20 }}>
          Secure · one attempt per person per academic year
        </div>
        <h1 className="sch-flow-h1">Verify your identity.</h1>
        <p className="sch-flow-lead">
          A parent or guardian completes this step, not the student — it binds this scholarship attempt to a real,
          verified person rather than an email address, so it can't be repeated by creating new accounts.
        </p>

        {enabledMethods === null ? (
          <p style={{ color: "var(--sch-ink-45)" }}>Loading verification options…</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
            {visibleMethods.map(([key, title, desc, tag]) => (
              <div
                key={key}
                onClick={() => setMethod(key)}
                className="sch-card"
                style={{
                  padding: "20px 22px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer",
                  borderColor: method === key ? "var(--sch-green)" : undefined,
                }}
              >
                <span style={{
                  width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                  border: `2px solid ${method === key ? "var(--sch-green)" : "var(--sch-border-strong)"}`,
                  background: method === key ? "var(--sch-green)" : "transparent", boxShadow: method === key ? "inset 0 0 0 3px #fff" : "none",
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{title}</div>
                  <div style={{ fontSize: 13, color: "var(--sch-ink-60)" }}>{desc}</div>
                </div>
                <span className="sch-kicker" style={{ letterSpacing: ".08em" }}>{tag}</span>
              </div>
            ))}
          </div>
        )}

        {method === "manual" && (
          <div className="sch-field" style={{ maxWidth: 400, marginBottom: 24 }}>
            <label>School ID or marksheet</label>
            <input type="file" accept="image/*,.pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </div>
        )}

        {method === "aadhaar_offline" && (
          <div className="sch-card" style={{ padding: 20, marginBottom: 24, maxWidth: 480 }}>
            <p style={{ fontSize: 13.5, color: "var(--sch-ink-60)", marginBottom: 14 }}>
              Download your Aadhaar Paperless Offline e-KYC ZIP from{" "}
              <a href={UIDAI_GENERATE_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--sch-green)" }}>
                UIDAI's official portal
              </a>{" "}
              — you'll set a 4-character Share Code while downloading it. Upload that ZIP and its share code below;
              we verify UIDAI's own digital signature on it directly, with no third party involved.
            </p>
            <div className="sch-field" style={{ marginBottom: 14 }}>
              <label>Offline e-KYC ZIP file</label>
              <input type="file" accept=".zip" onChange={(e) => setEkycZip(e.target.files?.[0] || null)} />
            </div>
            <div className="sch-field">
              <label>Share code</label>
              <input value={shareCode} onChange={(e) => setShareCode(e.target.value)} maxLength={4} placeholder="e.g. A1B2" />
            </div>
          </div>
        )}

        <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13.5, color: "var(--sch-ink-80)", marginBottom: 20, maxWidth: 560 }}>
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} style={{ marginTop: 3 }} />
          I confirm I am this student's parent or guardian and consent to identity verification for the Instant
          Scholarship program.
        </label>

        {error && <p style={{ color: "var(--sch-danger)", fontSize: 13.5, marginBottom: 16 }}>{error}</p>}

        <button className="sch-btn sch-btn-primary" disabled={submitting || !method} onClick={handleSubmit}>
          {submitting ? "Submitting…" : method ? CTA_LABEL[method] : "No verification method available"}
        </button>

        <p className="sch-lock-note" style={{ maxWidth: 480 }}>
          Shiksha receives only your name, date of birth and a verification reference. No document images are stored
          beyond what's needed for review, and Aadhaar numbers are never stored in any form.
        </p>
      </div>
    </ScholarshipShell>
  );
}
