import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./css/index.css";
import App from "./components/App.jsx";

import { AuthProvider } from "./contexts/AuthContext.jsx";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import AuthLoader from "./components/AuthLoader.jsx";
import { NotificationProvider } from "./contexts/NotificationContext";
import { ToastProvider } from "./contexts/ToastContext";
import TourMount from "./tour/TourMount.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <NotificationProvider>
            <LanguageProvider>
              <TourMount>
                <AuthLoader>
                  <App />
                </AuthLoader>
              </TourMount>
            </LanguageProvider>
          </NotificationProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
