import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import "../css/ProfileSuccessModal.css";

const DURATION = 20;

const ProfileSuccessModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(DURATION);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Countdown — auto-close at 0
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(interval);
          handleClose();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [handleClose]);

  // Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [handleClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleExploreCourses = () => {
    handleClose();
    navigate("/courses");
  };

  const progress = (secondsLeft / DURATION) * 100;

  return createPortal(
    <div className="psm-overlay">
      <div className="psm-card" role="dialog" aria-modal="true" aria-label="Profile complete">

        {/* Close button */}
        <button className="psm-close" onClick={handleClose} aria-label="Close">
          &#x2715;
        </button>

        {/* Checkmark icon */}
        <div className="psm-icon-wrap">
          <svg
            className="psm-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Text */}
        <h2 className="psm-title">You&apos;re all set!</h2>
        <p className="psm-message">
          Thank you for completing your profile. You can now browse and enroll
          in any course on <strong>ShikshaCom</strong> — your learning journey
          starts right here. Explore our courses and take the next step towards
          your goals today!
        </p>

        {/* Actions */}
        <div className="psm-actions">
          <button className="psm-btn psm-btn--primary" onClick={handleExploreCourses}>
            Explore Courses
          </button>
          <button className="psm-btn psm-btn--outline" onClick={handleClose}>
            Close
          </button>
        </div>

        {/* Countdown progress bar */}
        <div className="psm-countdown">
          <div
            className="psm-countdown__bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="psm-countdown__label">
          Closes in {secondsLeft}s
        </p>

      </div>
    </div>,
    document.body
  );
};

export default ProfileSuccessModal;
