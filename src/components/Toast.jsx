import { useEffect, useState } from "react";
import ScribbleIcon from "./icons/ScribbleIcon";

const icons = {
  success: (
    <ScribbleIcon name="check" size={20} />
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  info: (
    <ScribbleIcon name="info" size={20} />
  ),
};

const Toast = ({ id, message, type = "success", duration = 3000, onDismiss }) => {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const enterTimer = requestAnimationFrame(() => setVisible(true));

    const leaveTimer = setTimeout(() => {
      setLeaving(true);
      setTimeout(() => onDismiss(id), 350);
    }, duration);

    return () => {
      cancelAnimationFrame(enterTimer);
      clearTimeout(leaveTimer);
    };
  }, [id, duration, onDismiss]);

  const handleClose = () => {
    setLeaving(true);
    setTimeout(() => onDismiss(id), 350);
  };

  return (
    <div
      className={`toast toast--${type} ${visible ? "toast--visible" : ""} ${leaving ? "toast--leaving" : ""}`}
    >
      <span className="toast__icon">{icons[type]}</span>
      <span className="toast__message">{message}</span>
      <button className="toast__close" onClick={handleClose} aria-label="Dismiss">
        <ScribbleIcon name="close" size={14} />
      </button>
      <div
        className="toast__progress"
        style={{ animationDuration: `${duration}ms` }}
      />
    </div>
  );
};

export default Toast;
