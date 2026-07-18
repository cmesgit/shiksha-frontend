import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import ProtectedRoute from "../routes/ProtectedRoute";
import RequireRole from "../routes/RequireRole";
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
import { ExploreProvider } from "../explore/ExploreStore";

import "../css/App.css";

const Dashboard        = lazy(() => import("./Dashboard"));
const FormFillup       = lazy(() => import("./FormFillup"));
const FacultySignup    = lazy(() => import("./FacultySignup"));
const Enroll           = lazy(() => import("./Enroll"));
const Courses          = lazy(() => import("./Courses"));
const Placements       = lazy(() => import("./Placements"));
const GeneralStudies   = lazy(() => import("./GeneralStudies"));
const Blogs            = lazy(() => import("./Blogs"));
const BlogDetail       = lazy(() => import("./BlogDetail"));
const CounsellingLanding    = lazy(() => import("../counselling/LandingPage"));
const CounsellingLibrary    = lazy(() => import("../counselling/LibraryPage"));
const CounsellingGuide      = lazy(() => import("../counselling/GuidePage"));
const CounsellingProfile    = lazy(() => import("../counselling/ProfileWizard"));
const CounsellingPath       = lazy(() => import("../counselling/MyPathPage"));
const CounsellingMatches    = lazy(() => import("../counselling/MatchesPage"));
const CounsellingCounsellor = lazy(() => import("../counselling/CounsellorPage"));
const CounsellingAssessment = lazy(() => import("../counselling/AssessmentPage"));
// ── Explore (Scribd-style document hub) — new module under src/explore ──
const Explore          = lazy(() => import("../explore/ExploreLanding"));
const ExploreBrowse    = lazy(() => import("../explore/ExploreBrowse"));
const DocumentPage     = lazy(() => import("../explore/DocumentPage"));
const AuthorPage       = lazy(() => import("../explore/AuthorPage"));
const CollectionsList  = lazy(() => import("../explore/CollectionsPage").then((m) => ({ default: m.CollectionsList })));
const CollectionPage   = lazy(() => import("../explore/CollectionsPage").then((m) => ({ default: m.CollectionPage })));
const ExploreLibrary   = lazy(() => import("../explore/LibraryPage"));
const ExploreUpload    = lazy(() => import("../explore/UploadPage"));
// Legacy research-hub landing kept for its own route.
const ResearchHub      = lazy(() => import("./explore/ResearchHub"));
const CurrentAffairs   = lazy(() => import("./CurrentAffairs"));
const Payment          = lazy(() => import("./Payment"));
// Retired: the old skill mini-app at /skill-development now redirects to
// /skill/browse. Kept here (commented) for reference / quick rollback.
// const SkillDevelopment = lazy(() => import("./SkillDevelopment"));
const Upcoming         = lazy(() => import("./Upcoming"));
const ExploreServices  = lazy(() => import("./ExploreServices"));
const SkillBrowsePage  = lazy(() => import("../pages/SkillBrowsePage"));
const ExpertProfilePage= lazy(() => import("../pages/ExpertProfilePage"));
const FacultyIntro     = lazy(() => import("../pages/FacultyIntro"));
const ModeratorPanel   = lazy(() => import("../moderator/ModeratorPanel"));
const ExploreModeratorPanel = lazy(() => import("../exploreModerator/ExploreModeratorPanel"));
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
const ResendVerification = lazy(() => import("./ResendVerification"));
const ForgotPassword   = lazy(() => import("../auth/ForgotPassword"));
// Forum (redesign) — a nested route tree under a shared ForumLayout.
const ForumLayout       = lazy(() => import("../forum/ForumLayout"));
const FeedPage          = lazy(() => import("../forum/pages/FeedPage"));
const ThreadPage        = lazy(() => import("../forum/pages/ThreadPage"));
const AskPage           = lazy(() => import("../forum/pages/AskPage"));
const SpacesPage        = lazy(() => import("../forum/pages/SpacesPage"));
const SpacePage         = lazy(() => import("../forum/pages/SpacePage"));
const CreateSpacePage   = lazy(() => import("../forum/pages/CreateSpacePage"));
const CategoriesPage    = lazy(() => import("../forum/pages/CategoriesPage"));
const CategoryPage      = lazy(() => import("../forum/pages/CategoryPage"));
const ForumSearchPage   = lazy(() => import("../forum/pages/SearchPage"));
const SavedPage         = lazy(() => import("../forum/pages/SavedPage"));
const AnswerQueuePage   = lazy(() => import("../forum/pages/AnswerQueuePage"));
const NotificationsPage = lazy(() => import("../forum/pages/NotificationsPage"));
const ForumProfilePage  = lazy(() => import("../forum/pages/ProfilePage"));
const UserProfilePage   = lazy(() => import("../forum/pages/UserProfilePage"));
const ForumDashboardPage = lazy(() => import("../forum/pages/DashboardPage"));

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

// Explore pages share a client-side library store (saved / following / etc.).
function ExplorePage({ children }) {
  return (
    <ExploreProvider>
      <Page>{children}</Page>
    </ExploreProvider>
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
  const { isAuthenticated, isLearnerContext, isTeacherContext, loading, activeProfile } = useAuth();
  const location = useLocation();
  useAnalytics();

  // Counselling is PROFILE-level: intake, matches, bookings and assessments
  // belong to the active learner profile. Key its data routes by the active
  // profile id so an in-place profile switch remounts them (fresh fetch, and no
  // risk of a form loaded for one profile saving under another).
  const cKey = activeProfile?.id || "acct";

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
          <ProtectedRoute><Page><ProfilePicker /></Page></ProtectedRoute>
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
        <Route path="/resend-verification" element={<ResendVerification />} />

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
        <Route path="/faculty/signup"  element={<FacultySignup />} />
        
        <Route path="/counselling"                    element={<Page><CounsellingLanding /></Page>} />
        <Route path="/counselling/guides"             element={<Page><CounsellingLibrary /></Page>} />
        <Route path="/counselling/guides/:slug"       element={<Page><CounsellingGuide /></Page>} />
        <Route path="/counselling/profile"            element={<Page key={cKey}><CounsellingProfile /></Page>} />
        <Route path="/counselling/path"               element={<Page key={cKey}><CounsellingPath /></Page>} />
        <Route path="/counselling/counsellors"        element={<Page key={cKey}><CounsellingMatches /></Page>} />
        <Route path="/counselling/counsellors/:id"    element={<Page key={cKey}><CounsellingCounsellor /></Page>} />
        <Route path="/counselling/appointments/:id/assessment"
               element={<Page key={cKey}><CounsellingAssessment /></Page>} />
        <Route path="/counselling/assessment"
               element={<Navigate to="/counselling/counsellors" replace />} />
        <Route path="/explore"                 element={<ExplorePage><Explore /></ExplorePage>} />
        <Route path="/explore/browse"          element={<ExplorePage><ExploreBrowse /></ExplorePage>} />
        <Route path="/explore/doc/:id"         element={<ExplorePage><DocumentPage /></ExplorePage>} />
        <Route path="/explore/author/:id"      element={<ExplorePage><AuthorPage /></ExplorePage>} />
        <Route path="/explore/collections"     element={<ExplorePage><CollectionsList /></ExplorePage>} />
        <Route path="/explore/collections/:id" element={<ExplorePage><CollectionPage /></ExplorePage>} />
        <Route path="/explore/library"         element={<ExplorePage><ExploreLibrary /></ExplorePage>} />
        <Route path="/explore/upload"          element={<ExplorePage><ExploreUpload /></ExplorePage>} />
        <Route path="/explore/research-hub" element={<Page><ResearchHub /></Page>} />
        {/* Explore Moderation panel — the SECOND, separate moderator surface
            (distinct from the forum's /moderator). Renders the shared site
            <Navbar /> itself (like /moderator), so it sits outside the
            <Page>/<ExplorePage> wrapper but still reads as part of the site.
            Gated on the documents.moderate RBAC permission (backend
            IsDocumentsModerator is the real boundary). */}
        <Route path="/explore/moderator" element={
          <RequireRole permissions={["documents.moderate"]} roles={["ADMIN", "MODERATOR"]}>
            <ExploreModeratorPanel />
          </RequireRole>
        } />
        <Route path="/current-affairs" element={<Page><CurrentAffairs /></Page>} />
        {/* Legacy mini-app retired — redirect to the live, login-gated pages.
            Keeps old links/bookmarks working. The new canonical pages are
            /skill/browse (directory) and /experts/:id (profile + book + message). */}
        <Route path="/skill-development" element={<Navigate to="/skill/browse" replace />} />
        <Route path="/skill/browse"  element={<SkillBrowsePage />} />
        <Route path="/experts/:id"   element={<ExpertProfilePage />} />

        {/*
          Faculty / Academy entry points.

          The teacher app's TrackSwitcher sends a Guest expert who taps the
          locked "Academy" tab to `${HOME_URL}/become-faculty` (and the reverse
          — a Faculty teacher tapping the locked "Skill Dev" tab — to
          `${HOME_URL}/expert-apply`). Those routes lived nowhere on this app,
          so the redirect landed on "No routes matched location".

          • /become-faculty → the FacultyIntro landing page. It explains the
            Faculty track and routes into the add-a-track signup
            (?add_track=academy). It renders WITHOUT the marketing <Page>
            chrome — it ships its own nav (see FacultyIntro.jsx).
          • /expert-apply → adding the Skill (Guest) track. Faculty→Skill is
            blocked by policy server-side, but we still send them into the
            signup add-track flow so they get a clear in-product explanation
            instead of a dead link.
        */}
        <Route path="/become-faculty" element={<FacultyIntro />} />
        <Route path="/expert-apply"   element={<Navigate to="/signup?role=teacher&add_track=skill" replace />} />

        {/*
          Moderator Panel — ported from the internal Admin-dashboard app so
          moderators/admins can moderate the forum without leaving this site.
          Gated on the ADMIN/MODERATOR role (same server-side IsForumModerator/
          is_staff checks on the backend remain the real security boundary —
          this route is lazy-loaded so anonymous visitors never download it).
          Sits outside the marketing <Page> wrapper but renders the shared
          site <Navbar /> itself (same integration the forum uses), so it reads
          as part of the site rather than a standalone tool.
        */}
        <Route path="/moderator" element={
          <RequireRole permissions={["forum.moderate"]} roles={["ADMIN", "MODERATOR"]}>
            <ModeratorPanel />
          </RequireRole>
        } />

        <Route path="/upcoming"        element={<Upcoming />} />
        <Route path="/payment"         element={<Page><Payment /></Page>} />
        {/* Forum renders its OWN chrome (topstrip/header/sitenav) to match the
            standalone design, so it sits outside the marketing <Page> wrapper —
            same precedent as /moderator and /become-faculty. */}
        <Route path="/forum" element={<ForumLayout />}>
          <Route index element={<FeedPage />} />
          <Route path="dashboard" element={<ForumDashboardPage />} />
          <Route path="thread/:id" element={<ThreadPage />} />
          <Route path="ask" element={<AskPage />} />
          <Route path="spaces" element={<SpacesPage />} />
          <Route path="spaces/new" element={<CreateSpacePage />} />
          <Route path="space/:slug" element={<SpacePage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="category/:id" element={<CategoryPage />} />
          <Route path="search" element={<ForumSearchPage />} />
          <Route path="saved" element={<SavedPage />} />
          <Route path="answer-queue" element={<AnswerQueuePage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="profile" element={<ForumProfilePage />} />
          <Route path="u/:username" element={<UserProfilePage />} />
        </Route>
      </Routes>
      </Suspense>
    </div>
    </ProfileModalProvider>
  );
}

export default App;
