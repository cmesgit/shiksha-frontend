import { lazy, Suspense, useEffect, useState} from "react";
import AlreadySignedIn from "../auth/AlreadySignedIn";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import ProtectedRoute from "../routes/ProtectedRoute";
import RequireRole from "../routes/RequireRole";
import HomePage from "./HomePage";
import useAnalytics from "../useAnalytics";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ProfileModalProvider } from "../contexts/ProfileModalContext";
import { useAuth } from "../contexts/AuthContext";
import { APP_DASHBOARD_URL, TEACHER_ACADEMY_URL, TEACHER_SKILL_URL } from "../config/urls";
import Profile from "../pages/Profile";
import { ExploreProvider } from "../explore/ExploreStore";
import ExploreToolbar from "../explore/ExploreToolbar";

import "../css/App.css";

const Dashboard        = lazy(() => import("./Dashboard"));
const FormFillup       = lazy(() => import("./FormFillup"));
const FacultySignup    = lazy(() => import("./FacultySignup"));
const Enroll           = lazy(() => import("./Enroll"));
const Courses          = lazy(() => import("./Courses"));
const NotFound         = lazy(() => import("./NotFound"));
const GeneralStudies   = lazy(() => import("./GeneralStudies"));
const Blogs            = lazy(() => import("./Blogs"));
const BlogDetail       = lazy(() => import("./BlogDetail"));
const CounsellingLanding    = lazy(() => import("../counselling/LandingPage"));
const CounsellingLibrary    = lazy(() => import("../counselling/LibraryPage"));
const CounsellingGuide      = lazy(() => import("../counselling/GuidePage"));
const CounsellingProfile    = lazy(() => import("../counselling/ProfileWizard"));
const CounsellingSpark      = lazy(() => import("../counselling/SparkFinder"));
const CounsellingPath       = lazy(() => import("../counselling/MyPathPage"));
const CounsellingMatches    = lazy(() => import("../counselling/MatchesPage"));
const CounsellingCounsellor = lazy(() => import("../counselling/CounsellorPage"));
const CounsellingAssessment = lazy(() => import("../counselling/AssessmentPage"));
// ── Instant Scholarship — pre-enrollment exam + discount flow ──
const ScholarshipLanding      = lazy(() => import("../scholarship/Landing"));
const ScholarshipCourse       = lazy(() => import("../scholarship/CourseSelect"));
const ScholarshipVerify       = lazy(() => import("../scholarship/Verify"));
const ScholarshipDetails      = lazy(() => import("../scholarship/Details"));
const ScholarshipEligibility  = lazy(() => import("../scholarship/Eligibility"));
const ScholarshipInstructions = lazy(() => import("../scholarship/Instructions"));
const ScholarshipExam         = lazy(() => import("../scholarship/Exam"));
const ScholarshipEvaluating   = lazy(() => import("../scholarship/Evaluating"));
const ScholarshipResult       = lazy(() => import("../scholarship/Result"));
const ScholarshipCheckout     = lazy(() => import("../scholarship/Checkout"));
const ScholarshipDone         = lazy(() => import("../scholarship/Confirmation"));
// ── Explore (Scribd-style document hub) — new module under src/explore ──
const Explore          = lazy(() => import("../explore/ExploreLanding"));
const ExploreBrowse    = lazy(() => import("../explore/ExploreBrowse"));
const DocumentPage     = lazy(() => import("../explore/DocumentPage"));
const AuthorPage       = lazy(() => import("../explore/AuthorPage"));
const CollectionsList  = lazy(() => import("../explore/CollectionsPage").then((m) => ({ default: m.CollectionsList })));
const CollectionPage   = lazy(() => import("../explore/CollectionsPage").then((m) => ({ default: m.CollectionPage })));
const ExploreUpload    = lazy(() => import("../explore/UploadPage"));
const ExploreDashboard = lazy(() => import("../explore/DashboardPage"));
const CurrentAffairs   = lazy(() => import("./CurrentAffairs"));
const CurrentAffairDetail = lazy(() => import("./CurrentAffairDetail"));
const Payment          = lazy(() => import("./Payment"));
const Upcoming         = lazy(() => import("./Upcoming"));
// /quiz picks between the Quiz Hub and the "coming soon" placeholder at
// runtime, on the public_quiz_hub_enabled flag. QuizRoute owns that choice
// and lazy-loads only the one it needs — see its header comment.
const QuizRoute        = lazy(() => import("./QuizRoute"));
const SkillBrowsePage  = lazy(() => import("../pages/SkillBrowsePage"));
const LiveLanding      = lazy(() => import("../pages/LiveLanding"));
const LivePreJoin      = lazy(() => import("../pages/LivePreJoin"));
const LiveSummary      = lazy(() => import("../pages/LiveSummary"));
const GroupSessionLive = lazy(() => import("../pages/GroupSessionLive"));
const ExpertProfilePage= lazy(() => import("../pages/ExpertProfilePage"));
const FacultyIntro     = lazy(() => import("../pages/FacultyIntro"));
const SkillIntro       = lazy(() => import("../pages/SkillIntro"));
const ModeratorPanel   = lazy(() => import("../moderator/ModeratorPanel"));
const ExploreModeratorPanel = lazy(() => import("../exploreModerator/ExploreModeratorPanel"));
const AboutUs          = lazy(() => import("./AboutUs"));
const Contact          = lazy(() => import("./Contact"));
const TermsCondition   = lazy(() => import("./TermsCondition"));
const PrivacyPolicy    = lazy(() => import("./PrivacyPolicy"));
const Faq              = lazy(() => import("./Faq"));
const Feedback         = lazy(() => import("./Feedback"));
const ProfilePicker    = lazy(() => import("../pages/ProfilePicker"));
const ManageProfiles   = lazy(() => import("../pages/ManageProfiles"));
const Login            = lazy(() => import("../auth/Login"));
const VerifyEmail      = lazy(() => import("../auth/VerifyEmail"));
const EmailVerified    = lazy(() => import("../auth/EmailVerified"));
const Register         = lazy(() => import("../auth/Register"));
const BecomeTeacher    = lazy(() => import("../auth/BecomeTeacher"));
const TeacherTrackIntro = lazy(() => import("../auth/TeacherTrackIntro"));
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

/* Scroll behaviour on navigation.
   This used to jump to the top on every pathname change and ignore the hash
   entirely, which broke every in-page anchor on the site: a deep link like
   /about#why-shiksha landed at the top of the page, because the browser's own
   hash scroll happens before React has rendered the target and this effect
   then reset the position to 0.
   Now a hash wins when its target exists, and lazy routes mean the target
   often isn't in the DOM on the first frame — so we retry briefly before
   giving up and going to the top. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }

    const id = decodeURIComponent(hash.slice(1));
    let frame = 0;
    let raf;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      // ~1s of frames: enough for a lazy route chunk to land, short enough
      // that a genuinely missing anchor doesn't leave the page stuck.
      if (frame++ < 60) raf = requestAnimationFrame(tryScroll);
      else window.scrollTo(0, 0);
    };

    raf = requestAnimationFrame(tryScroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
}

function Page({ children }) {
  const { pathname } = useLocation();
  return (
    <div className="page-content">
      <Navbar />
      <div key={pathname} className="page-fade">{children}</div>
      <Footer />
    </div>
  );
}

// Explore pages share a client-side library store (saved / following / etc.)
// and a persistent Explore toolbar (My Library / Moderator / Upload access).
function ExplorePage({ children }) {
  return (
    <ExploreProvider>
      <Page><ExploreToolbar />{children}</Page>
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

// Where to send a user who just authenticated on /login. Prefer wherever they
// were actually headed — an explicit ?next= (set by ForumContext.requireAuth)
// or the post_auth_redirect stored by ProtectedRoute — so logging in from the
// forum/explore/etc. returns there. Only when there is NO in-app destination do
// we fall back to the context dashboard (the old always-dashboard behaviour).
function LoginRedirect() {
  const { isLearnerContext, isTeacherContext, teacherInfo } = useAuth();
  const location = useLocation();
  const [showRedirect, setShowRedirect] = useState(false);

  const next = new URLSearchParams(location.search).get("next");
  let stored = null;
  try { stored = sessionStorage.getItem("post_auth_redirect"); } catch { /* unavailable */ }
  // `next` only wins when it's actually usable — otherwise an attacker-supplied
  // (or just stale) unsafe `?next=` would discard a legitimately stored
  // destination and leave it stranded for the next login in this tab.
  const isSafe = (v) => !!v && v.startsWith("/") && !v.startsWith("//")
    && !/^\/(login|signup|pick-profile|forgot-password|reset-password)(\/|\?|$)/.test(v);
  const target = isSafe(next) ? next : (isSafe(stored) ? stored : null);
  const isLocalTarget = !!target;

  useEffect(() => {
    if (isLocalTarget && stored) {
      try { sessionStorage.removeItem("post_auth_redirect"); } catch { /* noop */ }
    }
  }, [isLocalTarget, stored]);

  if (isLocalTarget) return <Navigate to={target} replace />;

  /* No pending destination means this wasn't the tail of a login — someone
     navigated to /login while already signed in. Offer the choice instead of
     bouncing them, so the page can actually be used to sign out or switch
     account. `showRedirect` opts back into the old behaviour. */
  if (!showRedirect) {
    return <AlreadySignedIn onContinue={() => setShowRedirect(true)} />;
  }

  if (isLearnerContext) return <RedirectExternal to={APP_DASHBOARD_URL} />;
  if (isTeacherContext) {
    const track = teacherInfo?.active_track;
    return <RedirectExternal to={track === "skill" ? TEACHER_SKILL_URL : TEACHER_ACADEMY_URL} />;
  }
  return <Navigate to="/pick-profile" replace />;
}

/* /signup → /register, or → /become-a-teacher when the old link was one of the
   add-a-track deep links. Those carried ?add_track= purely to bypass the
   "signup is for logged-out visitors" guard, because adding a track used to
   mean re-entering signup while already signed in. It doesn't any more. */
function RetiredSignupRedirect() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const addTrack = params.get("add_track");
  if (addTrack) {
    return <Navigate to={`/become-a-teacher?track=${encodeURIComponent(addTrack)}`} replace />;
  }
  if (params.get("role") === "teacher") {
    return <Navigate to="/register?intent=teach" replace />;
  }
  params.delete("role");
  const qs = params.toString();
  return <Navigate to={`/register${qs ? `?${qs}` : ""}`} replace />;
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

  // Show spinner while bootstrap runs — but keep the route tree mounted
  // (do NOT return null, that unmounts Routes and causes remount loops)
  if (loading) return <RouteFallback />;

  return (
    <ProfileModalProvider>
    <div className="app">
      <ScrollToTop />

      <Suspense fallback={<RouteFallback />}>
      <Routes>
        {/* Home — always shows the landing page, never redirects away */}
        <Route path="/" element={<HomePage />} />

        {/* Protected app routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Page><Dashboard /></Page></ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute><Page><Profile /></Page></ProtectedRoute>
        } />

        <Route path="/form-fillup" element={
          <ProtectedRoute><Page><FormFillup /></Page></ProtectedRoute>
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
          Once authenticated, <LoginRedirect> decides where to go: back to the
          in-app page they came from (?next= / post_auth_redirect) if any, else
          the context dashboard (learner/teacher) or pick-profile.
        */}
        <Route path="/login" element={
          !isAuthenticated
            ? <Login />
            : <LoginRedirect />
        } />

        {/* Account-first registration. /signup below is the older role-first
            flow, still mounted because it serves the add-a-track path until
            Phase 8 retires it. New links should point here. */}
        <Route path="/register" element={
          isAuthenticated ? <Navigate to="/" replace /> : <Register />
        } />

        {/* Adding a teaching identity from inside the product — the
            replacement for re-entering signup to add a track. Requires a
            session; that is the whole point. */}
        {/* SIGNED OUT it serves the public faculty-vs-Skill-Dev chooser
            instead: every marketing "Become a teacher" entry point links
            here, and those visitors have no account yet — a login wall is the
            wrong first answer to "how do I teach here?". `loading` is already
            handled above (RouteFallback), so this cannot flash the wrong one. */}
        <Route path="/become-a-teacher" element={
          isAuthenticated
            ? <Page><BecomeTeacher /></Page>
            : <Page><TeacherTrackIntro /></Page>
        } />

        {/* /signup is RETIRED (Phase 8). It redirects rather than 404s
            because the path is in the wild — old emails, bookmarks, and
            anything already indexed. The query string is preserved so
            ?next= and ?intent= survive the hop. */}
        <Route path="/signup" element={<RetiredSignupRedirect />} />

        <Route path="/verify-email"   element={<VerifyEmail />} />
        <Route path="/email-verified" element={<EmailVerified />} />
        <Route path="/resend-verification" element={<ResendVerification />} />

        <Route path="/forgot-password" element={
          isAuthenticated ? <Navigate to="/" replace /> : <ForgotPassword />
        } />

        {/* Public content pages */}
        {/* About.jsx was gutted to `() => null` long ago; mounting it here
            only cost a lazy chunk fetch that rendered nothing. */}
        <Route path="/about"           element={<Page><AboutUs /></Page>} />
        {/* These four were standalone pages that hand-copied the matching
            /about section. They had already drifted apart — /why-shiksha
            showed Interactive Courses' description under "Personalized
            Dashboards", and /vision's second bullet had gained a clause the
            About page never had. Now that /about is CMS-driven, keeping four
            hardcoded copies would guarantee they drift again and would make
            an editor's change look like it silently did nothing. Nothing
            links here except the homepage's Why Choose CTA; redirecting
            keeps every existing URL and bookmark working.

            The fragments below are the AboutUs redesign's section ids, which
            are `ap-`-prefixed and use the singular "value". The previous page
            used bare `#vision` / `#values` / `#why-shiksha`; leaving those in
            place would have quietly dumped all four of these URLs at the top
            of the page instead of the section they name, since an unmatched
            fragment is not an error. */}
        <Route path="/vision"          element={<Navigate to="/about#ap-vision" replace />} />
        <Route path="/mission"         element={<Navigate to="/about#ap-mission" replace />} />
        <Route path="/values"          element={<Navigate to="/about#ap-value" replace />} />
        <Route path="/why-shiksha"     element={<Navigate to="/about#ap-why" replace />} />
        <Route path="/contact"         element={<Page><Contact /></Page>} />
        <Route path="/terms"           element={<Page><TermsCondition /></Page>} />
        {/* Register.jsx has linked /privacy since launch; until now it 404'd. */}
        <Route path="/privacy"         element={<Page><PrivacyPolicy /></Page>} />
        <Route path="/privacy-policy"  element={<Navigate to="/privacy" replace />} />
        <Route path="/faq"             element={<Page><Faq /></Page>} />
        <Route path="/quiz"            element={<Page><QuizRoute /></Page>} />
        <Route path="/feedback"        element={<Page><Feedback /></Page>} />
        <Route path="/courses"         element={<Page><Courses /></Page>} />
        <Route path="/courses/:slug"   element={<Page><Courses /></Page>} />
        <Route path="/general-studies" element={<Page><GeneralStudies /></Page>} />
        <Route path="/blogs"           element={<Page><Blogs /></Page>} />
        {/* More specific than the wildcard below — React Router ranks static
            segments above wildcards regardless of declaration order, so this
            always wins for any path starting with /blogs/hi/, but declaring
            it first keeps the intent readable. Hindi is the only translated
            locale today (see BlogDetail.jsx); English stays unprefixed so
            every existing /blogs/<slug> link keeps working unchanged. */}
        <Route path="/blogs/hi/*"      element={<Page><BlogDetail locale="hi" /></Page>} />
        <Route path="/blogs/*"         element={<Page><BlogDetail locale="en" /></Page>} />
        <Route path="/faculty/signup"  element={<FacultySignup />} />
        
        <Route path="/counselling"                    element={<Page><CounsellingLanding /></Page>} />
        <Route path="/counselling/guides"             element={<Page><CounsellingLibrary /></Page>} />
        <Route path="/counselling/guides/:slug"       element={<Page><CounsellingGuide /></Page>} />
        <Route path="/counselling/profile"            element={<Page key={cKey}><CounsellingProfile /></Page>} />
        <Route path="/counselling/spark"              element={<Page key={cKey}><CounsellingSpark /></Page>} />
        <Route path="/counselling/path"               element={<Page key={cKey}><CounsellingPath /></Page>} />
        <Route path="/counselling/counsellors"        element={<Page key={cKey}><CounsellingMatches /></Page>} />
        <Route path="/counselling/counsellors/:id"    element={<Page key={cKey}><CounsellingCounsellor /></Page>} />
        <Route path="/counselling/appointments/:id/assessment"
               element={<Page key={cKey}><CounsellingAssessment /></Page>} />
        <Route path="/counselling/assessment"
               element={<Navigate to="/counselling/counsellors" replace />} />

        {/* Instant Scholarship — landing + course pick are public; identity
            verification onward requires an account (that's the actual auth
            gate — see Verify.jsx). Exam/Evaluating are intentionally full-
            screen with no <Page> shell at all, per the design brief. */}
        <Route path="/scholarship"                       element={<Page><ScholarshipLanding /></Page>} />
        <Route path="/scholarship/course"                element={<ScholarshipCourse />} />
        <Route path="/scholarship/verify"                element={<ProtectedRoute><ScholarshipVerify /></ProtectedRoute>} />
        <Route path="/scholarship/details"               element={<ProtectedRoute><ScholarshipDetails /></ProtectedRoute>} />
        <Route path="/scholarship/eligibility"            element={<ProtectedRoute><ScholarshipEligibility /></ProtectedRoute>} />
        <Route path="/scholarship/instructions"           element={<ProtectedRoute><ScholarshipInstructions /></ProtectedRoute>} />
        <Route path="/scholarship/exam/:sessionId"        element={<ProtectedRoute><ScholarshipExam /></ProtectedRoute>} />
        <Route path="/scholarship/evaluating/:sessionId"  element={<ProtectedRoute><ScholarshipEvaluating /></ProtectedRoute>} />
        <Route path="/scholarship/result/:sessionId"      element={<ProtectedRoute><ScholarshipResult /></ProtectedRoute>} />
        <Route path="/scholarship/checkout/:sessionId"    element={<ProtectedRoute><ScholarshipCheckout /></ProtectedRoute>} />
        <Route path="/scholarship/done"                   element={<ProtectedRoute><ScholarshipDone /></ProtectedRoute>} />

        <Route path="/explore"                 element={<ExplorePage><Explore /></ExplorePage>} />
        <Route path="/explore/browse"          element={<ExplorePage><ExploreBrowse /></ExplorePage>} />
        <Route path="/explore/doc/:id"         element={<ExplorePage><DocumentPage /></ExplorePage>} />
        <Route path="/explore/author/:id"      element={<ExplorePage><AuthorPage /></ExplorePage>} />
        <Route path="/explore/collections"     element={<ExplorePage><CollectionsList /></ExplorePage>} />
        <Route path="/explore/collections/:id" element={<ExplorePage><CollectionPage /></ExplorePage>} />
        {/* Orphaned page (no in-app link); DashboardPage.jsx is its superset. Redirect protects any bookmarked links. */}
        <Route path="/explore/library"         element={<Navigate to="/explore/dashboard" replace />} />
        <Route path="/explore/dashboard"       element={<ExplorePage><ExploreDashboard /></ExplorePage>} />
        <Route path="/explore/upload"          element={<ExplorePage><ExploreUpload /></ExplorePage>} />
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
        <Route path="/current-affairs/:slug" element={<Page><CurrentAffairDetail /></Page>} />
        {/* Legacy mini-app retired — redirect to the live, login-gated pages.
            Keeps old links/bookmarks working. The new canonical pages are
            /skill/browse (directory) and /experts/:id (profile + book + message). */}
        <Route path="/skill-development" element={<Navigate to="/skill/browse" replace />} />
        <Route path="/skill/browse"  element={<SkillBrowsePage />} />
        <Route path="/experts/:id"   element={<ExpertProfilePage />} />
        <Route path="/live"          element={<LiveLanding />} />
        {/* Pre-join lobby (screen 03, design_handoff_live_sessions) — device
            check + entitlement/limits preflight + "Ask to join". Declared
            BEFORE the bare /live/room/:id route below so the router doesn't
            need any special-casing (React Router already ranks the more
            specific static "/lobby" segment above the param-only route
            regardless of order, but declaring it first keeps the intent
            readable, same precedent as the /blogs/hi/* comment above). */}
        <Route path="/live/room/:id/lobby" element={
          <ProtectedRoute><LivePreJoin /></ProtectedRoute>
        } />
        <Route path="/live/room/:id" element={
          <ProtectedRoute><GroupSessionLive /></ProtectedRoute>
        } />
        {/* Post-session summary (screen 09) — Phase 5. Reached via the room's
            own T-0 cap-based timeout redirect (?reason=timeout) or a plain
            Leave/End. Renders its own Navbar/Footer, same convention as
            LivePreJoin above (no <Page> wrapper). */}
        <Route path="/live/session/:id/summary" element={
          <ProtectedRoute><LiveSummary /></ProtectedRoute>
        } />

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
          • /become-expert → the SkillIntro landing page, the mirror of the
            above. Added 2026-09-09; until then Skill Dev had NO landing page
            and no public entry point at all, while Academy had both plus a
            standalone wizard. Same self-contained shape as FacultyIntro.
          • /expert-apply → kept as a permanent alias, because the teacher
            app's TrackSwitcher has been sending Faculty teachers here for a
            long time and those builds are already in the wild. It used to
            <Navigate> straight into /become-a-teacher, which is a
            ProtectedRoute — so a signed-out visitor was bounced to /login
            with nothing explaining what they were signing in FOR. It now
            lands on the intro page, which routes correctly for both.
            (The Faculty→Skill policy block referred to in the old comment
            here was removed on 2026-09-06 — both directions work now.)
        */}
        <Route path="/become-faculty" element={<FacultyIntro />} />
        <Route path="/become-expert"  element={<SkillIntro />} />
        <Route path="/expert-apply"   element={<Navigate to="/become-expert" replace />} />

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

        {/*
          Catch-all 404. MUST stay last — React Router v6 ranks static routes
          above this one, so it only wins when nothing else matched.

          Before this existed an unmatched path rendered an empty <div
          className="app"> — a blank white page, no nav, no way back (React
          Router just logged "No routes matched location"). That is why
          /become-faculty and /expert-apply above were patched in one at a
          time as broken links got reported. New dead links now land here
          instead of nowhere.
        */}
        <Route path="*" element={<Page><NotFound /></Page>} />
      </Routes>
      </Suspense>
    </div>
    </ProfileModalProvider>
  );
}

export default App;
