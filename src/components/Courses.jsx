import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../css/Courses.css';
import SubjectList from './SubjectList';
import EnrollModal from './EnrollModal';
import UnifiedCatalog from './courses/UnifiedCatalog';
import CoursesHero from './courses/CoursesHero';
import CoursesStrip from './courses/CoursesStrip';
import CoursesPromo, { CoursesFinalCta } from './courses/CoursesPromo';
import Faq from './home/Faq';
import { useAuth } from '../contexts/AuthContext';
import { useProfileModal } from '../contexts/ProfileModalContext';
import { useToast } from '../contexts/ToastContext';
import { FORM_FILLUP_ENABLED } from '../config/featureFlags';
import { getMyEnrollmentRequests } from '../api/enrollments';
import { getPublicCourseDetail, getPublicCourseBySlug, getMyEnrolledCourses } from '../api/coursesApi';
import { usePublicBoards, useBoardClasses } from '../hooks/usePublicCourses';
import { APP_URL } from '../config/urls';

const LAST_BOARD_KEY = 'shiksha.courses.lastBoard';

function loadLastBoard() {
  try {
    return localStorage.getItem(LAST_BOARD_KEY);
  } catch {
    return null;
  }
}

function saveLastBoard(slug) {
  try {
    localStorage.setItem(LAST_BOARD_KEY, slug);
  } catch {
    // private-mode / storage-full — remembering the board is a nicety, not required
  }
}

const Courses = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { slug: slugParam } = useParams();
  const { isAuthenticated, user } = useAuth();
  const { openWithMessage } = useProfileModal();
  const { showToast } = useToast();

  // Deep-link intent reaches this page two ways: router `state` (homepage
  // cards, navbar links) or query params (?board=&group=&open=&q=). State is
  // invisible in the URL, so it does not survive a reload, a shared link, or
  // the login round-trip below — the query form is what makes those work. Both
  // are read here, with state winning when present.
  const deepLink = useMemo(() => {
    const q = new URLSearchParams(location.search);
    return {
      selectedBoard: location.state?.selectedBoard || q.get('board') || null,
      selectedBoardGroup: location.state?.selectedBoardGroup || q.get('group') || null,
      openCourseId: location.state?.openCourseId || q.get('open') || null,
      searchQuery: location.state?.searchQuery || q.get('q') || '',
    };
  }, [location.state, location.search]);

  const [selectedBoard, setSelectedBoard] = useState(deepLink.selectedBoard);
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeCourse, setActiveCourse] = useState(null);
  // Set alongside `activeCourse` on every path that opens the detail view
  // (catalog click AND direct /courses/:slug visit) so Enroll/Subscribe
  // never depends on `selectedClass`, which only the catalog-click path sets.
  const [activeCourseId, setActiveCourseId] = useState(null);
  // Seeded from navigation state so the navbar / homepage hero search can
  // deep-link into this page with a pre-filled query.
  const [searchQuery, setSearchQuery] = useState(deepLink.searchQuery);
  const [expandedClassId, setExpandedClassId] = useState(null);
  const [enrollmentStatusByCourseId, setEnrollmentStatusByCourseId] = useState({});
  const [enrollModalCourseId, setEnrollModalCourseId] = useState(null);
  const [activeCourseLoading, setActiveCourseLoading] = useState(false);
  // A homepage/showcase card linked to a specific real course (see
  // homeData/HomeGreen's `openCourseId` state key) can deep-link straight
  // into that class's expanded row — captured once on mount.
  const [pendingOpenCourseId] = useState(deepLink.openCourseId);
  const catalogRef = useRef(null);

  // Real backend data: which boards currently have published courses (drives
  // "Coming Soon" locking) and the real course catalog for whichever board is
  // selected.
  const boards = usePublicBoards();
  const { classes: liveClasses, loading: classesLoading } = useBoardClasses(boards, selectedBoard);

  // Default board once boards have loaded and nothing is selected yet: a
  // navbar/homepage deep-link wins (a specific board, or — from the navbar's
  // "View All Central/State Boards" link — just a board_type group, in which
  // case the first unlocked board in that group stands in for it), then the
  // remembered last board, then the first unlocked board overall.
  useEffect(() => {
    if (!boards || selectedBoard) return;
    const resolve = (slug) => {
      const b = slug && boards.find((x) => x.slug === slug);
      return b && b.has_published_courses ? b : null;
    };
    const resolveGroup = (group) => {
      const boardType = (group || '').toUpperCase();
      if (!boardType) return null;
      return boards.find((b) => b.board_type === boardType && b.has_published_courses) || null;
    };
    const firstUnlocked = boards.find((b) => b.has_published_courses);
    const match =
      resolve(deepLink.selectedBoard) ||
      resolveGroup(deepLink.selectedBoardGroup) ||
      resolve(loadLastBoard()) ||
      firstUnlocked ||
      boards[0];
    if (match) setSelectedBoard(match.slug);
  }, [boards, selectedBoard, deepLink]);

  // Direct visit to /courses/<slug> ("Syllabus" gives this a real, shareable
  // URL) — resolve the course by slug and open it straight to the detail
  // view. Guarded on `activeCourse` so it never re-fires after the learner
  // navigates elsewhere on this page.
  useEffect(() => {
    if (!slugParam || !boards || activeCourse) return;
    let cancelled = false;
    setActiveCourseLoading(true);
    getPublicCourseBySlug(slugParam).then((detail) => {
      if (cancelled) return;
      setActiveCourseLoading(false);
      if (!detail) return;
      const liveBoard = detail.board ? boards.find((b) => b.name === detail.board.name) : null;
      if (liveBoard) setSelectedBoard(liveBoard.slug);
      setActiveCourseId(detail.id);
      setActiveCourse({
        title: detail.title,
        desc: detail.description,
        price: `₹${Math.round(detail.price / 100).toLocaleString('en-IN')}`,
        thumbnail: detail.thumbnail,
        highlights: detail.details?.highlights,
        includes: detail.details?.includes,
        topics: (detail.subjects || []).map((s) => ({
          title: s.name,
          textbook: s.textbook,
          chapters: (s.chapters || []).map((c) => c.title),
        })),
      });
    });
    return () => {
      cancelled = true;
    };
  }, [slugParam, boards, activeCourse]);

  // The catalog itself never pushes history (board switch / search / expand
  // are all plain state updates) — the only history entry this page ever
  // creates is the Syllabus -> /courses/:slug transition, so browser Back
  // from there just needs to return to the catalog.
  useEffect(() => {
    const handleBrowserBack = () => {
      if (activeCourse) {
        setActiveCourse(null);
        setActiveCourseId(null);
      }
    };
    window.addEventListener('popstate', handleBrowserBack);
    return () => {
      window.removeEventListener('popstate', handleBrowserBack);
    };
  }, [activeCourse]);

  useEffect(() => {
    if (!isAuthenticated) {
      setEnrollmentStatusByCourseId({});
      return;
    }

    let cancelled = false;

    const priority = { APPROVED: 3, PENDING: 2, REJECTED: 1 };

    // Two independent sources, merged: the manual-UPI review queue
    // (EnrollmentRequest, via /enrollments/requests/mine/) and the learner's
    // real active enrollments (/courses/my/). A free-enroll writes only the
    // latter — FreeEnrollView creates an Enrollment/Subscription directly and
    // never touches EnrollmentRequest — so relying on the request queue alone
    // makes a free-enrolled course look un-enrolled forever unless the
    // learner happens to click all the way through to "Start Learning"
    // before closing the popup. Real enrollment always wins as APPROVED.
    Promise.all([getMyEnrollmentRequests(), getMyEnrolledCourses()])
      .then(([reqData, enrolled]) => {
        if (cancelled) return;

        const list = Array.isArray(reqData) ? reqData : reqData?.results || [];
        const map = {};

        for (const req of list) {
          const cid = req?.course?.id;
          if (!cid) continue;

          const existing = map[cid];
          if (!existing || (priority[req.status] || 0) > (priority[existing] || 0)) {
            map[cid] = req.status;
          }
        }

        for (const course of enrolled) {
          if (course?.id) map[course.id] = 'APPROVED';
        }

        setEnrollmentStatusByCourseId(map);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  // Called by EnrollModal the instant a free-enroll succeeds, so the catalog
  // reflects it immediately even if the learner closes the popup (✕, Escape,
  // backdrop click) instead of clicking through to "Start Learning" — without
  // this, enrollmentStatusByCourseId is only refreshed on page load/auth
  // change, so the "Enroll Now" button would still invite a re-enroll.
  const handleEnrolled = (courseId) => {
    setEnrollmentStatusByCourseId((prev) => ({ ...prev, [courseId]: 'APPROVED' }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeCourse]);

  // Applies a given `location.state` payload at most once. Without this,
  // including `selectedBoard` in the deps below (needed so a *new*
  // navigation while already on this page can still switch boards) meant
  // every manual board-chip click re-ran this effect, which re-derived
  // `target` from the same still-unconsumed `location.state.selectedBoard`
  // and immediately reverted the click back to the deep-linked board —
  // the new board's list never got a chance to render until the user
  // toggled back and forth (or refreshed, which drops the stale state).
  const appliedLocationStateRef = useRef(null);

  useEffect(() => {
    if (!boards) return; // wait for the board list before resolving slug/group
    if (appliedLocationStateRef.current === location.state) return;
    appliedLocationStateRef.current = location.state;

    if (location.state?.resetCourses) {
      setSelectedBoard(null);
      setExpandedClassId(null);
      setActiveCourse(null);
      setActiveCourseId(null);
    }
    // Keep the search box in sync when a new query arrives via navigation
    // state (e.g. searching from the navbar while already on this page).
    if (location.state?.searchQuery != null) {
      setSearchQuery(location.state.searchQuery);
    }
    // A navbar/homepage course link clicked while already sitting on this
    // page (same route, fresh `state`) should still switch boards — the
    // initial-mount default-board effect above only ever fires once.
    const wantedSlug = location.state?.selectedBoard;
    const wantedGroup = location.state?.selectedBoardGroup;
    let target = wantedSlug && boards.find((b) => b.slug === wantedSlug && b.has_published_courses);
    if (!target && wantedGroup) {
      target = boards.find((b) => b.board_type === wantedGroup.toUpperCase() && b.has_published_courses);
    }
    if (target) {
      setSelectedBoard(target.slug);
      setExpandedClassId(null);
      // Don't clobber an explicit searchQuery arriving in the same state
      // payload (handled just above) — only clear it for a plain board switch.
      if (location.state?.searchQuery == null) setSearchQuery('');
      saveLastBoard(target.slug);
    }
  }, [location.state, boards]);

  useEffect(() => {
    setEnrollModalCourseId(null);
  }, [location.pathname]);

  const currentBoard = useMemo(
    () => (boards && selectedBoard ? boards.find((b) => b.slug === selectedBoard) : null),
    [boards, selectedBoard]
  );
  const currentBoardGroupLabel =
    currentBoard?.board_type === 'CENTRAL'
      ? 'Central Board'
      : currentBoard?.board_type === 'STATE'
      ? 'State Board'
      : undefined;

  const handleSelectBoard = (slug) => {
    setSelectedBoard(slug);
    setExpandedClassId(null);
    setSearchQuery('');
    saveLastBoard(slug);
  };

  const handleToggleExpand = (id, forceOpen = false) => {
    setExpandedClassId((prev) => (forceOpen ? id : prev === id ? null : id));
  };

  const handleSyllabus = async (cls) => {
    setSelectedClass(cls);
    setActiveCourseLoading(true);

    const courseId = cls.courseIds?.[selectedBoard];
    const detail = await getPublicCourseDetail(courseId);
    setActiveCourseLoading(false);

    if (!detail) return; // unpublished/not found — stay on the catalog

    setActiveCourseId(courseId);
    setActiveCourse({
      title: detail.title,
      desc: detail.description,
      price: `₹${Math.round(detail.price / 100).toLocaleString('en-IN')}`,
      thumbnail: detail.thumbnail,
      highlights: detail.details?.highlights,
      includes: detail.details?.includes,
      topics: (detail.subjects || []).map((s) => ({
        title: s.name,
        textbook: s.textbook,
        chapters: (s.chapters || []).map((c) => c.title),
      })),
    });

    // Give this course a real, shareable URL.
    if (detail.slug) {
      window.history.pushState({ activeCourse: true }, '', `/courses/${detail.slug}`);
    }
  };

  // Once the board's real class list has loaded, auto-expand the specific
  // class a showcase card deep-linked to (see `pendingOpenCourseId` above) —
  // in place, not a full navigation into the detail view. Guarded on
  // `!expandedClassId` so this only ever fires once.
  useEffect(() => {
    if (!pendingOpenCourseId || !selectedBoard || expandedClassId || liveClasses.length === 0) return;
    // Compare as strings: course ids are numbers in router state but always
    // strings out of a query param, so a strict === silently missed every
    // ?open= deep link (and every post-login return).
    const wanted = String(pendingOpenCourseId);
    const match = liveClasses.find((cls) => String(cls.courseIds?.[selectedBoard]) === wanted);
    if (match) setExpandedClassId(match.id);
  }, [pendingOpenCourseId, selectedBoard, expandedClassId, liveClasses]);

  const handleEnrollNow = (cls) => {
    if (!isAuthenticated) {
      // Come back to the exact class they were enrolling in. This used to be a
      // bare navigate('/login'), which threw away the board AND the class: the
      // learner signed up, landed on a dashboard, and had to rediscover the
      // course from scratch — the single most expensive drop-off on the page.
      // Encoded as query params (not router state) because only the URL
      // survives the redirect; LoginRedirect in App.jsx validates `next`.
      const back = new URLSearchParams();
      if (selectedBoard) back.set('board', selectedBoard);
      const wantedId = cls.courseIds?.[selectedBoard];
      if (wantedId) back.set('open', String(wantedId));
      navigate(`/login?next=${encodeURIComponent(`/courses?${back}`)}`);
      return;
    }

    if (FORM_FILLUP_ENABLED && user?.profile_complete === false) {
      openWithMessage('Please complete your profile to enroll in a course.');
      return;
    }

    const courseId = cls.courseIds?.[selectedBoard];

    if (!courseId) {
      showToast({
        type: 'error',
        message: `${cls.title}${cls.subtitle ? ` (${cls.subtitle})` : ''} is not yet available for ${
          currentBoard?.name || 'this board'
        }.`
      });
      return;
    }

    if (enrollmentStatusByCourseId[courseId] === 'APPROVED') {
      window.location.href = APP_URL;
      return;
    }

    setEnrollModalCourseId(courseId);
  };

  if (activeCourseLoading) {
    return (
      <section className="courses-page">
        <div className="courses-container">
          <p className="courses-search-empty">Loading course…</p>
        </div>
      </section>
    );
  }

  if (activeCourse) {
    return (
      <>
        <SubjectList
          course={activeCourse}
          courseId={activeCourseId}
          enrollmentStatus={enrollmentStatusByCourseId[activeCourseId]}
          boardGroup={currentBoardGroupLabel}
          board={currentBoard?.name}
          selectedClass={
            selectedClass?.subtitle
              ? `${selectedClass.title} (${selectedClass.subtitle})`
              : selectedClass?.title
          }
          onBack={() => {
            // Clearing state alone isn't enough: on a direct /courses/:slug
            // visit (or a courses/:slug entry reached via pushState from the
            // catalog), the URL is still the slug route, so the slug-fetch
            // effect above just refetches the same course and reopens this
            // same view. Navigate off the slug route so it can't re-fire.
            setActiveCourse(null);
            setActiveCourseId(null);
            navigate('/courses', { replace: true });
          }}
          onEnroll={() => {
            if (!isAuthenticated) { navigate('/login'); return; }
            if (FORM_FILLUP_ENABLED && user?.profile_complete === false) {
              openWithMessage('Please complete your profile to subscribe to a course.');
              return;
            }
            setEnrollModalCourseId(activeCourseId);
          }}
        />
        {enrollModalCourseId && (
          <EnrollModal
            courseId={enrollModalCourseId}
            onClose={() => setEnrollModalCourseId(null)}
            onEnrolled={handleEnrolled}
          />
        )}
      </>
    );
  }

  return (
    <section className="courses-page">
      <CoursesHero
        onBrowse={() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' })}
        onBrowseCategories={() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' })}
      />
      <CoursesStrip />
      {/* Not .courses-container (legacy wrapper, own 28/18/14px responsive
          padding scheme) — .wrap is the real site-wide gutter (ShikshaHome.css)
          the hero/programs tiles above and the reused Faq section below
          all share, so the catalog's edges line up with them at every
          viewport width instead of drifting. */}
      <div className="wrap" ref={catalogRef}>
        <UnifiedCatalog
          boards={boards}
          selectedBoard={selectedBoard}
          onSelectBoard={handleSelectBoard}
          classes={liveClasses}
          classesLoading={classesLoading}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          expandedClassId={expandedClassId}
          onToggleExpand={handleToggleExpand}
          enrollmentStatusByCourseId={enrollmentStatusByCourseId}
          onEnroll={handleEnrollNow}
          onSyllabus={handleSyllabus}
        />
      </div>
      <CoursesPromo onBrowse={() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <Faq />
      <CoursesFinalCta onBrowse={() => catalogRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      {enrollModalCourseId && (
        <EnrollModal
          courseId={enrollModalCourseId}
          onClose={() => setEnrollModalCourseId(null)}
          onEnrolled={handleEnrolled}
        />
      )}
    </section>
  );
};

export default Courses;
