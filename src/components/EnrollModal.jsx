import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  getCoursePublic,
  submitEnrollmentRequest,
  getMyEnrollmentRequests,
} from "../api/enrollments";
import { useToast } from "../contexts/ToastContext";
import { APP_URL } from "../config/urls";
import "../css/Enroll.css";

const QR_IMG = "/upi-qr-placeholder.png";

const formatRupees = (paise) =>
  paise === null || paise === undefined
    ? ""
    : `₹${(paise / 100).toLocaleString("en-IN")}`;

const EnrollModal = ({ courseId, onClose }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();

  const [course, setCourse] = useState(null);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [utr, setUtr] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [agreePayment, setAgreePayment] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [existingStatus, setExistingStatus] = useState(null);

  const initialPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== initialPath.current) onClose();
  }, [location.pathname]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    setLoadingCourse(true);
    getCoursePublic(courseId)
      .then((data) => {
        setCourse(data);
        if (data.price) setAmount(String(data.price / 100));
      })
      .catch((err) => {
        setFetchError(
          err?.response?.status === 404
            ? "Course not found."
            : "Unable to load course details."
        );
      })
      .finally(() => setLoadingCourse(false));
  }, [courseId]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    getMyEnrollmentRequests()
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data) ? data : data?.results || [];
        const match = list.find((r) => r?.course?.id === courseId);
        if (!match) return;
        if (match.status === "APPROVED") setExistingStatus("APPROVED");
        else if (match.status === "PENDING") setExistingStatus("PENDING");
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [user, courseId]);

  const profile = user?.profile || {};
  const profileComplete = user?.profile_complete;
  const fullName = [profile.first_name, profile.last_name].filter(Boolean).join(" ");

  const canSubmit =
    profileComplete &&
    utr.trim() &&
    paymentDate &&
    amount &&
    receipt &&
    agreePayment &&
    agreeTerms &&
    !submitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    const fd = new FormData();
    fd.append("course", courseId);
    fd.append("payment_method", paymentMethod);
    fd.append("utr_number", utr.trim());
    fd.append("payment_date", paymentDate);
    fd.append("amount_paid", String(Math.round(parseFloat(amount) * 100)));
    fd.append("receipt", receipt);

    try {
      await submitEnrollmentRequest(fd);
      showToast({ message: `Enrolled in ${course.title}! We'll verify your payment within 24 hrs.`, duration: 4000 });
      setSubmitted(true);
    } catch (err) {
      const detail =
        err?.response?.data?.detail ||
        (typeof err?.response?.data === "object"
          ? Object.values(err.response.data).flat().join(" ")
          : null) ||
        "Something went wrong. Please try again.";
      setSubmitError(detail);
    } finally {
      setSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const headerTitle = course
    ? `Enroll in ${course.title}`
    : "Course Enrollment";

  const headerSubtitle = loadingCourse
    ? "Fetching course details…"
    : fetchError
    ? "Something went wrong"
    : existingStatus === "APPROVED"
    ? "You are already enrolled in this course"
    : existingStatus === "PENDING"
    ? "Your enrollment is being reviewed"
    : submitted
    ? "Your request has been received"
    : "Pay via UPI · Upload receipt · Get approved within 24 hrs";

  const body = (() => {
    if (loadingCourse) {
      return (
        <div className="em-status">
          <div className="em-spinner" />
          <p>Loading course details…</p>
        </div>
      );
    }

    if (fetchError) {
      return (
        <div className="em-status">
          <div className="em-status__icon em-status__icon--error">✕</div>
          <p className="em-status__msg">{fetchError}</p>
          <button className="em-btn em-btn--outline" onClick={onClose}>Close</button>
        </div>
      );
    }

    if (existingStatus === "APPROVED") {
      return (
        <div className="em-status">
          <div className="em-status__icon em-status__icon--success">✓</div>
          <h3 className="em-status__heading">Already enrolled</h3>
          <p className="em-status__msg">
            You&apos;re already enrolled in <strong>{course.title}</strong>.
            Head to your dashboard to start learning.
          </p>
          <button className="em-btn em-btn--primary" onClick={() => { window.location.href = APP_URL; }}>
            Go to Dashboard
          </button>
        </div>
      );
    }

    if (existingStatus === "PENDING") {
      return (
        <div className="em-status">
          <div className="em-status__icon em-status__icon--pending">⏳</div>
          <h3 className="em-status__heading">Pending approval</h3>
          <p className="em-status__msg">
            Your enrollment request for <strong>{course.title}</strong> is under review.
            Our team will verify your payment within 24 hours.
          </p>
          <button className="em-btn em-btn--outline" onClick={onClose}>Got it</button>
        </div>
      );
    }

    if (submitted) {
      return (
        <div className="em-status">
          <div className="em-status__icon em-status__icon--success">✓</div>
          <h3 className="em-status__heading">Request submitted!</h3>
          <p className="em-status__msg">
            We&apos;ve received your enrollment request for <strong>{course.title}</strong>.
            Our team will approve your enrollment within 24 hours.
            You&apos;ll get an email confirmation once approved.
          </p>
          <button className="em-btn em-btn--primary" onClick={() => { window.location.href = APP_URL; }}>
            Go to Dashboard
          </button>
        </div>
      );
    }

    return (
      <div className="em-grid">
        {/* ── Left column ── */}
        <div className="em-col">

          {/* Course summary */}
          <div className="em-card">
            <p className="em-card__label">Course</p>
            <p className="em-card__course-name">{course.title}</p>
            {[course.board, course.stream].filter(Boolean).length > 0 && (
              <p className="em-card__meta">
                {[course.board, course.stream].filter(Boolean).join(" · ")}
              </p>
            )}
            <p className="em-card__price">{formatRupees(course.price)}</p>
            <span className="em-card__duration-badge">12-month subscription</span>
          </div>

          {/* QR */}
          <div className="em-card em-card--qr">
            <p className="em-card__label">Pay with UPI</p>
            <div className="em-qr-wrap">
              <img src={QR_IMG} alt="UPI QR code" className="em-qr" />
            </div>
            <p className="em-qr-hint">Scan with any UPI app · Then fill in the payment details →</p>
          </div>

          {/* Profile */}
          <div className="em-card">
            <p className="em-card__label">Your Details</p>
            {!profileComplete && (
              <div className="em-alert em-alert--warning">
                Profile incomplete — please complete it before enrolling.
              </div>
            )}
            <ul className="em-profile">
              <li><span>Name</span><strong>{fullName || "—"}</strong></li>
              <li><span>Email</span><strong>{user?.email || "—"}</strong></li>
              <li><span>Phone</span><strong>{profile.phone || "—"}</strong></li>
              <li><span>Class</span><strong>{[profile.current_class, profile.board].filter(Boolean).join(" · ") || "—"}</strong></li>
              <li><span>School</span><strong>{profile.school_name || "—"}</strong></li>
              <li>
                <span>Guardian</span>
                <strong>{profile.father_name || profile.mother_name || profile.guardian_name || "—"}</strong>
              </li>
            </ul>
            <Link to="/form-fillup" className="em-edit-link" onClick={onClose}>
              Edit profile →
            </Link>
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="em-col">
          <form className="em-card em-card--form" onSubmit={handleSubmit}>
            <p className="em-card__label">Payment Details</p>

            <div className="em-form-grid">
              <div className="em-field">
                <label>Payment Method</label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="UPI">UPI</option>
                  <option value="BANK">Bank Transfer</option>
                </select>
              </div>

              <div className="em-field">
                <label>Amount Paid (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 1500"
                  required
                />
              </div>

              <div className="em-field em-field--full">
                <label>UTR / Transaction ID</label>
                <input
                  type="text"
                  value={utr}
                  onChange={(e) => setUtr(e.target.value)}
                  placeholder="e.g. 420123456789"
                  required
                />
              </div>

              <div className="em-field">
                <label>Payment Date</label>
                <input
                  type="date"
                  value={paymentDate}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  required
                />
              </div>

              <div className="em-field em-field--full">
                <label>Payment Receipt (image)</label>
                <div className="em-file-wrap">
                  <label className="em-file-label">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setReceipt(e.target.files?.[0] || null)}
                      required
                    />
                    <span className="em-file-btn">Choose file</span>
                    <span className="em-file-name">{receipt ? receipt.name : "No file chosen"}</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="em-checks">
              <label className="em-check">
                <input
                  type="checkbox"
                  checked={agreePayment}
                  onChange={(e) => setAgreePayment(e.target.checked)}
                />
                <span>I confirm the payment details above are correct.</span>
              </label>
              <label className="em-check">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>
                  I agree to the{" "}
                  <Link to="/terms" target="_blank" className="em-inline-link">
                    Terms &amp; Refund Policy
                  </Link>.
                </span>
              </label>
            </div>

            {submitError && (
              <div className="em-alert em-alert--error">{submitError}</div>
            )}

            <button type="submit" className="em-btn em-btn--primary em-btn--submit" disabled={!canSubmit}>
              {submitting ? (
                <><span className="em-btn-spinner" /> Submitting…</>
              ) : (
                "Submit for Approval"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  })();

  return createPortal(
    <div className="em-overlay" onClick={handleOverlayClick}>
      <div className="em-modal" role="dialog" aria-modal="true" aria-label="Course Enrollment">

        {/* Dark-green header */}
        <div className="em-header">
          <div className="em-header__text">
            <h2 className="em-header__title">{headerTitle}</h2>
            <p className="em-header__subtitle">{headerSubtitle}</p>
          </div>
          <button className="em-header__close" onClick={onClose} aria-label="Close enrollment dialog">
            &#x2715;
          </button>
        </div>

        {/* Body */}
        <div className="em-body">
          {body}
        </div>

      </div>
    </div>,
    document.body
  );
};

export default EnrollModal;
