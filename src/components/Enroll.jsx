import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getCoursePublic, submitEnrollmentRequest } from "../api/enrollments";
import { useToast } from "../contexts/ToastContext";
import { APP_URL } from "../config/urls";
import "../css/Enroll.css";

// Placeholder QR — swap out with the real UPI QR image file in /public or /assets
const QR_IMG = "/upi-qr-placeholder.png";

const formatRupees = (paise) =>
  paise === null || paise === undefined
    ? ""
    : `₹${(paise / 100).toLocaleString("en-IN")}`;

const Enroll = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

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

  if (loadingCourse) {
    return <div className="enroll-page"><div className="enroll-loading">Loading course...</div></div>;
  }

  if (fetchError) {
    return (
      <div className="enroll-page">
        <div className="enroll-loading">
          <p>{fetchError}</p>
          <button onClick={() => navigate("/courses")}>Back to Courses</button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="enroll-page">
        <div className="enroll-success">
          <h2>Request submitted!</h2>
          <p>
            We've received your enrollment request for <strong>{course.title}</strong>.
            Our team will verify your payment and approve your enrollment within 24 hours.
            You'll get an email confirmation once approved.
          </p>
          <button
            className="enroll-submit"
            onClick={() => {
              window.location.href = APP_URL;
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="enroll-page">
      <h1 className="enroll-title">Enroll in {course.title}</h1>
      <p className="enroll-subtitle">
        Pay via QR, upload receipt, and we'll approve your enrollment shortly.
      </p>

      <div className="enroll-grid">
        {/* LEFT: course + QR + profile summary */}
        <div>
          <div className="enroll-card">
            <h3>Course</h3>
            <div className="enroll-course-title">{course.title}</div>
            <div className="enroll-course-meta">
              {[course.board, course.stream].filter(Boolean).join(" · ")}
            </div>
            <div className="enroll-price">{formatRupees(course.price)}</div>
          </div>

          <div className="enroll-card" style={{ marginTop: 16 }}>
            <h3>Pay with UPI</h3>
            <div className="enroll-qr-wrapper">
              <img src={QR_IMG} alt="UPI QR code" className="enroll-qr" />
              <p className="enroll-qr-note">Scan with any UPI app to pay. Then fill the payment details.</p>
            </div>
          </div>

          <div className="enroll-card" style={{ marginTop: 16 }}>
            <h3>Your Details</h3>
            {!profileComplete && (
              <div className="enroll-profile-incomplete">
                Your profile is incomplete. Please complete it before enrolling.
              </div>
            )}
            <div className="enroll-profile-summary">
              <div><strong>Name:</strong> {fullName || "—"}</div>
              <div><strong>Email:</strong> {user?.email || "—"}</div>
              <div><strong>Phone:</strong> {profile.phone || "—"}</div>
              <div><strong>Class:</strong> {profile.current_class || "—"} · {profile.board || "—"}</div>
              <div><strong>School:</strong> {profile.school_name || "—"}</div>
              <div><strong>Guardian:</strong> {profile.father_name || profile.mother_name || profile.guardian_name || "—"}</div>
            </div>
            <Link to="/form-fillup" className="enroll-edit-link">Edit Profile →</Link>
          </div>
        </div>

        {/* RIGHT: payment-proof form */}
        <div>
          <form className="enroll-card" onSubmit={handleSubmit}>
            <h3>Payment Details</h3>

            <div className="enroll-form-grid">
              <div className="enroll-field">
                <label>Payment Method *</label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="UPI">UPI</option>
                  <option value="BANK">Bank Transfer</option>
                </select>
              </div>
              <div className="enroll-field">
                <label>Amount Paid (₹) *</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className="enroll-field">
                <label>UTR / Transaction ID *</label>
                <input
                  type="text"
                  value={utr}
                  onChange={(e) => setUtr(e.target.value)}
                  placeholder="e.g. 420123456789"
                  required
                />
              </div>
              <div className="enroll-field">
                <label>Payment Date *</label>
                <input
                  type="date"
                  value={paymentDate}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="enroll-form-grid full" style={{ marginTop: 12 }}>
              <div className="enroll-field">
                <label>Payment Receipt (image) *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setReceipt(e.target.files?.[0] || null)}
                  required
                />
              </div>
            </div>

            <div className="enroll-checkboxes">
              <label className="enroll-checkbox">
                <input
                  type="checkbox"
                  checked={agreePayment}
                  onChange={(e) => setAgreePayment(e.target.checked)}
                />
                <span>I confirm the payment details above are correct.</span>
              </label>
              <label className="enroll-checkbox">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>
                  I agree to the <Link to="/terms" target="_blank">Terms &amp; Refund Policy</Link>.
                </span>
              </label>
            </div>

            {submitError && <div className="enroll-error">{submitError}</div>}

            <button type="submit" className="enroll-submit" disabled={!canSubmit}>
              {submitting ? "Submitting..." : "Submit for Approval"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Enroll;
