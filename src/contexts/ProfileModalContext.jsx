import { createContext, useContext, useState, useCallback } from "react";

const ProfileModalContext = createContext(null);

export const ProfileModalProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const openWithMessage = useCallback((msg = null) => {
    setNotification(msg);
  }, []);

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return (
    <ProfileModalContext.Provider value={{ notification, openWithMessage, clearNotification }}>
      {children}
    </ProfileModalContext.Provider>
  );
};

export const useProfileModal = () => useContext(ProfileModalContext);
