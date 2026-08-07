// Screen 10 — Checkout, "Step 6 of 6". Calls the SAME real enrollment
// endpoints Enroll.jsx uses (getPaymentConfig / freeEnroll) rather than a
// parallel enrollment path, so a scholarship applicant lands in the exact
// same Enrollment/Subscription record a regular paying student would.
//
// Only the free-launch path is fully wired end to end right now: the
// server-side discount application for manual-UPI/Razorpay checkout is
// documented future work (see enrollments/payments.py — RazorpayProvider is
// still a stub), so those modes hand off to the existing /enroll/:courseId
// screen honestly rather than faking a paid-checkout UI that doesn't apply
// the discount yet.
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPaymentConfig, freeEnroll } from "../api/enrollments";
import { getExamResult } from "../api/scholarshipApi";
import ScholarshipShell from "./ScholarshipShell";
import { clearFlowCourseId } from "./flowState";

export default function Checkout() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [paymentConfig, setPaymentConfig] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getExamResult(sessionId).then(setResult).catch(() => navigate("/scholarship"));
    getPaymentConfig().then(setPaymentConfig);
  }, [sessionId, navigate]);

  if (!result) {
    return <ScholarshipShell step="checkout"><div className="sch-flow-col">Loading…</div></ScholarshipShell>;
  }

  const fmt = (paise) => `₹${Math.round(paise / 100).toLocaleString("en-IN")}`;
  const discountPaise = Math.round((result.course.price * result.awarded_discount_pct) / 100);
  const finalPaise = result.course.price - discountPaise;

  const handleEnroll = async () => {
    setEnrolling(true);
    setError("");
    try {
      await freeEnroll(result.course.id);
      clearFlowCourseId();
      navigate("/scholarship/done", {
        state: { courseTitle: result.course.title, savedPaise: discountPaise },
      });
    } catch {
      setError("Couldn't complete enrolment. Please try again.");
      setEnrolling(false);
    }
  };

  return (
    <ScholarshipShell step="checkout">
      <div className="sch-flow-col" style={{ maxWidth: 1000 }}>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 560px" }}>
            <h1 className="sch-flow-h1">Complete your enrolment.</h1>
            <div style={{
              background: "var(--sch-green-tint)", border: "1px solid var(--sch-green-border-tint)", color: "var(--sch-green-text-on-tint)",
              borderRadius: 12, padding: 16, display: "flex", alignItems: "center", gap: 12, marginBottom: 28, fontSize: 14,
            }}>
              <span style={{ fontWeight: 700 }}>✓</span>
              Your {result.awarded_discount_pct}% scholarship is already applied. No coupon code needed.
            </div>

            {paymentConfig?.is_free ? (
              <p style={{ color: "var(--sch-ink-60)", fontSize: 14.5, lineHeight: 1.6 }}>
                Courses are free during launch — your scholarship is recorded and will apply automatically as a real
                discount once paid pricing begins.
              </p>
            ) : (
              <div className="sch-card" style={{ padding: 20, fontSize: 14 }}>
                <p style={{ marginBottom: 12 }}>
                  Paid checkout with your scholarship applied isn't available in this flow yet — head to the course
                  page to complete payment; your scholarship will be applied there.
                </p>
                <Link to={`/enroll/${result.course.id}`} className="sch-btn sch-btn-secondary">Go to course checkout</Link>
              </div>
            )}
            {error && <p style={{ color: "var(--sch-danger)", fontSize: 13.5, marginTop: 16 }}>{error}</p>}
          </div>

          <div style={{ flex: "0 1 360px" }}>
            <div style={{ position: "sticky", top: 24 }} className="sch-card">
              <div style={{ padding: 22 }}>
                <div className="sch-serif" style={{ fontSize: 20, marginBottom: 4 }}>{result.course.title}</div>
                <div style={{ fontSize: 13, color: "var(--sch-ink-45)", marginBottom: 20 }}>Class {result.course.class_level} · Full year access</div>
                <Row label="Original course price" value={fmt(result.course.price)} />
                <Row label={`Scholarship discount (${result.awarded_discount_pct}%)`} value={`−${fmt(discountPaise)}`} green />
                <div className="sch-serif" style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 600, borderTop: "1px solid var(--sch-border-faint)", paddingTop: 16, marginTop: 8, marginBottom: 20 }}>
                  <span>Final price</span><span>{fmt(finalPaise)}</span>
                </div>
                {paymentConfig?.is_free && (
                  <button className="sch-btn sch-btn-primary" style={{ width: "100%" }} disabled={enrolling} onClick={handleEnroll}>
                    {enrolling ? "Enrolling…" : `Pay ${fmt(0)}`}
                  </button>
                )}
                <p style={{ textAlign: "center", fontSize: 12, color: "var(--sch-ink-45)", marginTop: 10 }}>Scholarship valid for this course only</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScholarshipShell>
  );
}

function Row({ label, value, green }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14.5, padding: "8px 0", color: green ? "var(--sch-green)" : undefined }}>
      <span style={{ color: green ? "var(--sch-green)" : "var(--sch-ink-60)" }}>{label}</span>
      <span style={{ fontWeight: 600 }}>{value}</span>
    </div>
  );
}
