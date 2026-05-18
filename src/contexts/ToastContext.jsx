import { createContext, useContext, useState, useCallback, useEffect } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({ message, type = "success", duration = 3000 }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    try {
      const pending = sessionStorage.getItem("pending_toast");
      if (pending) {
        sessionStorage.removeItem("pending_toast");
        const { message, type, duration } = JSON.parse(pending);
        setToasts([{ id: Date.now(), message, type, duration }]);
      }
    } catch (_) { /* sessionStorage unavailable */ }
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onDismiss={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
