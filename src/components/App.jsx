import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import ProtectedRoute from "../routes/ProtectedRoute";
import HomePage from "./HomePage";
import useAnalytics from "../useAnalytics";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RequireProfileComplete from "../routes/RequireProfileComplete";
import ProfileFillupModal from "./ProfileFillupModal";
import { ProfileModalProvider } from "../contexts/ProfileModalContext";
import { useAuth } from "../contexts/AuthContext";
import { APP_DASHBOARD_URL, TEACHER_DASHBOARD_URL } from "../config/urls";
import Profile from "../pages/Profile";

import "../css/App.css";

const Dashboard        = lazy(() => import("./Dashboard"));
const FormFillup       = lazy(() => import("./FormFillup"));
const Enroll           = lazy(() => import("./Enroll"));
const Courses          = lazy(() => import("./Courses"));
const Placements       = lazy(() => import("./Placements"));
const GeneralStudies   = lazy(() => import("./GeneralStudies"));
const Blogs            = lazy(() => import("./Blogs"));
const BlogDetail       = lazy(() => import("./BlogDetail"));
const Counselling      = lazy(() => import("./Counselling"));
const Explore          = lazy(() => import("./Explore"));
const CurrentAffairs   = lazy(() => import("./CurrentAffairs"));
const Payment          = lazy(() => import("./Payment"));
const SkillDevelopment = lazy(() => import("./SkillDevelopment"));
const Upcoming         = lazy(() => import("./Upcoming"));
const ExploreServices  = lazy(() => import("./ExploreServices"));
const SkillBrowsePage  = lazy(() => import("../pages/SkillBrowsePage"));
const ExpertProfilePage= lazy(() => import("../pages/ExpertProfilePage"));
const About            = lazy(() => import("./About"));
const About2           = lazy(() => import("./About2"));
const Vision           = lazy(() => import("./Vision"));
const Mission          = lazy(() => import("./Mission"));
const Values           = lazy(() => import("./Values"));
const WhySiksha        = lazy(() => import("./WhySiksha"));
const Contact          = lazy(() => import("./Contact"));
const TermsCondition   = lazy(() => import("./TermsCondition"));
const Faq              = lazy(() => import("./Faq"));
const Feedback         = lazy(() => import("./Feedback"));
const ProfilePicker    = lazy(() => import("../pages/ProfilePicker"));
const ManageProfiles   = lazy(() => import("../pages/ManageProfiles"));
const Login            = lazy(() => import("../auth/Login"));
const Signup           = lazy(() => import("../auth/Signup"));
const VerifyEmail      = lazy(() => import("../auth/VerifyEmail"));
const EmailVerified    = lazy(() => import("../auth/EmailVerified"));
const ForgotPassword   = lazy(() => import("../auth/ForgotPassword"));
const ThreadListPage   = lazy(() => import("../forum/ThreadListPage"));
const ThreadDetailPage = lazy(() => import("../forum/ThreadDetailPage"));
const CreateThreadPage = lazy(() => import("../forum/CreateThreadPage"));
const NotificationsPage = lazy(() => import("../forum/NotificationsPage"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Page({ children }) {
  return (
    <div className="page-content">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

function RouteFallback() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        width: 40, height: 40,
        border: "3px solid rgba(0,92,58,0.2)",
        borderTopColor: "#005c3a",
        borderRadius: "50%",
        animation: "appSpin 0.8s linear infinite",
      }} />
      <style>{`@keyframes appSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function RedirectExternal({ to }) {
  useEffect(() => { window.location.replace(to); }, [to]);
  return null;
}

function App() {
  const { isAuthenticated, isLearnerContext, isTeacherContext, loading } = useAuth();
  const location = useLocation();
  useAnalytics();

  // Adding a teaching track to an already-signed-in account is the one signup
  // flow allowed while authenticated (it skips email/username and just takes
  // the track application + password). Detect it so the guard lets it through.
  const isAddTrackSignup =
    new URLSearchParams(location.search).get("add_track") != null;

  // Show spinner while bootstrap runs — but keep the route tree mounted
  // (do NOT return null, that unmounts Routes and causes remount loops)
  if (loading) return <RouteFallback />;

  return (
    <ProfileModalProvider>
    <div className="app">
      <ScrollToTop />
      <ProfileFillupModal />

      <Suspense fallback={<RouteFallback />}>
      <Routes>
        {/* Home — always shows the landing page, never redirects away */}
        <Route path="/" element={<HomePage />} />

        {/* Protected app routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <RequireProfileComplete>
              <Page><Dashboard /></Page>
            </RequireProfileComplete>
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute><Page><Profile /></Page></ProtectedRoute>
        } />

        <Route path="/form-fillup" element={
          <ProtectedRoute>
            <RequireProfileComplete>
              <Page><FormFillup /></Page>
            </RequireProfileComplete>
          </ProtectedRoute>
        } />

        <Route path="/enroll/:courseId" element={
          <ProtectedRoute><Page><Enroll /></Page></ProtectedRoute>
        } />

        <Route path="/pick-profile" element={
          <ProtectedRoute><ProfilePicker /></ProtectedRoute>
        } />

        <Route path="/manage-profiles" element={
          <ProtectedRoute><Page><ManageProfiles /></Page></ProtectedRoute>
        } />

        {/*
          /login — only show the login form if the user is NOT authenticated.
          If they are authenticated:
            - learner context  → send to the student dashboard (cross-domain, hard redirect)
            - teacher context  → send to the teacher dashboard (cross-domain, hard redirect)
            - account context  → send to pick-profile (still on this domain)
        */}
        <Route path="/login" element={
          !isAuthenticated
            ? <Page><Login /></Page>
            : isLearnerContext
              ? <RedirectExternal to={APP_DASHBOARD_URL} />
              : isTeacherContext
                ? <RedirectExternal to={TEACHER_DASHBOARD_URL} />
                : <Navigate to="/pick-profile" replace />
        } />

        <Route path="/signup" element={
          (isAuthenticated && !isAddTrackSignup)
            ? <Navigate to="/" replace />
            : <Page><Signup /></Page>
        } />

        <Route path="/verify-email"   element={<VerifyEmail />} />
        <Route path="/email-verified" element={<EmailVerified />} />

        <Route path="/forgot-password" element={
          isAuthenticated ? <Navigate to="/" replace /> : <Page><ForgotPassword /></Page>
        } />

        {/* Public content pages */}
        <Route path="/about"           element={<Page><About2 /><About /></Page>} />
        <Route path="/vision"          element={<Page><Vision /></Page>} />
        <Route path="/mission"         element={<Page><Mission /></Page>} />
        <Route path="/values"          element={<Page><Values /></Page>} />
        <Route path="/why-shiksha"     element={<Page><WhySiksha /></Page>} />
        <Route path="/contact"         element={<Page><Contact /></Page>} />
        <Route path="/terms"           element={<Page><TermsCondition /></Page>} />
        <Route path="/faq"             element={<Page><Faq /></Page>} />
        <Route path="/feedback"        element={<Page><Feedback /></Page>} />
        <Route path="/courses"         element={<Page><Courses /></Page>} />
        <Route path="/placements"      element={<Page><Placements /></Page>} />
        <Route path="/general-studies" element={<Page><GeneralStudies /></Page>} />
        <Route path="/blogs"           element={<Page><Blogs /></Page>} />
        <Route path="/blogs/*"         element={<Page><BlogDetail /></Page>} />
        <Route path="/counselling"     element={<Page><Counselling /></Page>} />
        <Route path="/explore"         element={<Page><Explore /></Page>} />
        <Route path="/current-affairs" element={<Page><CurrentAffairs /></Page>} />
        <Route path="/skill-development" element={<SkillDevelopment />} />
        <Route path="/skill/browse"  element={<SkillBrowsePage />} />
        <Route path="/experts/:id"   element={<ExpertProfilePage />} />
        <Route path="/upcoming"        element={<Upcoming />} />
        <Route path="/payment"         element={<Page><Payment /></Page>} />
        <Route path="/forum"           element={<Page><ThreadListPage /></Page>} />
        <Route path="/forum/create"    element={<Page><CreateThreadPage /></Page>} />
        <Route path="/forum/notifications" element={<Page><NotificationsPage /></Page>} />
        <Route path="/forum/:threadId" element={<Page><ThreadDetailPage /></Page>} />
      </Routes>
      </Suspense>
    </div>
    </ProfileModalProvider>
  );
}

export default App;
