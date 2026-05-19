import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import { useAuth } from "../contexts/AuthContext";
import { useProfileModal } from "../contexts/ProfileModalContext";
import FormFillup from "./FormFillup";
import ProfileSuccessModal from "./ProfileSuccessModal";
import "../css/ProfileFillupModal.css";

const ProfileFillupModal = () => {
  const { user, isAuthenticated } = useAuth();
  const { notification, clearNotification } = useProfileModal();
  const location = useLocation();
  const [dismissed, setDismissed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isIncomplete = isAuthenticated && user?.profile_complete === false;
  const isOnFormPage = location.pathname === "/form-fillup";

  // Force-reopen whenever a notification message is pushed (e.g. from enroll attempt)
  useEffect(() => {
    if (notification) setDismissed(false);
  }, [notification]);

  // Auto-close when profile becomes complete after submission
  useEffect(() => {
    if (user?.profile_complete === true) setDismissed(true);
  }, [user?.profile_complete]);

  const show = isIncomplete && !dismissed && !isOnFormPage;

  // Lock body scroll while open
  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [show]);

  const handleSkip = () => {
    clearNotification();
    setDismissed(true);
  };

  const handleSuccess = () => {
    clearNotification();
    setDismissed(true);
    setShowSuccess(true);
  };

  if (showSuccess) {
    return <ProfileSuccessModal onClose={() => setShowSuccess(false)} />;
  }

  if (!show) return null;

  return createPortal(
    <div className="pfm-overlay">
      <div
        className="pfm-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Complete your profile"
      >
        {/* Header */}
        <div className="pfm-header">
          <div className="pfm-header__text">
            <h2 className="pfm-header__title">Complete your profile</h2>
            <p className="pfm-header__subtitle">
              Help us personalise your learning experience — takes about 2 minutes
            </p>
          </div>
          <button
            className="pfm-header__skip"
            onClick={handleSkip}
            aria-label="Skip for now"
          >
            Fill up later
          </button>
        </div>

        {/* Notification banner — shown when triggered from enroll/subscribe */}
        {notification && (
          <div className="pfm-notification">
            <span className="pfm-notification__icon">⚠</span>
            <span>{notification}</span>
          </div>
        )}

        {/* Scrollable form body */}
        <div className="pfm-body">
          <FormFillup onSuccess={handleSuccess} />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProfileFillupModal;
