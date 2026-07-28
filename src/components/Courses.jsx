import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../css/Courses.css';
import SubjectList from './SubjectList';
import EnrollModal from './EnrollModal';
import UnifiedCatalog from './courses/UnifiedCatalog';
import { useAuth } from '../contexts/AuthContext';
import { useProfileModal } from '../contexts/ProfileModalContext';
import { FORM_FILLUP_ENABLED } from '../config/featureFlags';
import { getMyEnrollmentRequests } from '../api/enrollments';
import { getPublicCourseDetail, getPublicCourseBySlug } from '../api/coursesApi';
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

  const [selectedBoard, setSelectedBoard] = useState(location.state?.selectedBoard || null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeCourse, setActiveCourse] = useState(null);
  // Seeded from navigation state so the navbar / homepage hero search can
  // deep-link into this page with a pre-filled query.
  const [searchQuery, setSearchQuery] = useState(location.state?.searchQuery || '');
  const [expandedClassId, setExpandedClassId] = useState(null);
  const [enrollmentStatusByCourseId, setEnrollmentStatusByCourseId] = useState({});
  const [enrollModalCourseId, setEnrollModalCourseId] = useState(null);
  const [activeCourseLoading, setActiveCourseLoading] = useState(false);
  // A homepage/showcase card linked to a specific real course (see
  // homeData/HomeGreen's `openCourseId` state key) can deep-link straight
  // into that class's expanded row — captured once on mount.
  const [pendingOpenCourseId] = useState(location.state?.openCourseId || null);

  // Real backend data: which boards currently have published courses (drives
  // "Coming Soon" locking) and the real course catalog for whichever board is
  // selected.
  const boards = usePublicBoards();
  const { classes: liveClasses, loading: classesLoading } = useBoardClasses(boards, selectedBoard);

  // Default board once boards have loaded and nothing is selected yet: a
  // navbar/homepage deep-link wins, then the remembered last board, then the
  // first unlocked board.
  useEffect(() => {
    if (!boards || selectedBoard) return;
    const resolve = (slug) => {
      const b = slug && boards.find((x) => x.slug === slug);
      return b && b.has_published_courses ? b : null;
    };
    const firstUnlocked = boards.find((b) => b.has_published_courses);
    const match =
      resolve(location.state?.selectedBoard) || resolve(loadLastBoard()) || firstUnlocked || boards[0];
    if (match) setSelectedBoard(match.slug);
  }, [boards, selectedBoard, location.state]);

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
      setActiveCourse({
        title: detail.title,
        desc: detail.description,
        price: `₹${Math.round(detail.price / 100).toLocaleString('en-IN')}`,
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
      if (activeCourse) setActiveCourse(null);
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

    getMyEnrollmentRequests()
      .then((data) => {
        if (cancelled) return;

        const list = Array.isArray(data) ? data : data?.results || [];
        const priority = { APPROVED: 3, PENDING: 2, REJECTED: 1 };
        const map = {};

        for (const req of list) {
          const cid = req?.course?.id;
          if (!cid) continue;

          const existing = map[cid];
          if (!existing || (priority[req.status] || 0) > (priority[existing] || 0)) {
            map[cid] = req.status;
          }
        }

        setEnrollmentStatusByCourseId(map);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeCourse]);

  useEffect(() => {
    if (location.state?.resetCourses) {
      setSelectedBoard(null);
      setExpandedClassId(null);
      setActiveCourse(null);
    }
    // Keep the search box in sync when a new query arrives via navigation
    // state (e.g. searching from the navbar while already on this page).
    if (location.state?.searchQuery != null) {
      setSearchQuery(location.state.searchQuery);
    }
  }, [location.state]);

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

    setActiveCourse({
      title: detail.title,
      desc: detail.description,
      price: `₹${Math.round(detail.price / 100).toLocaleString('en-IN')}`,
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
    const match = liveClasses.find((cls) => cls.courseIds?.[selectedBoard] === pendingOpenCourseId);
    if (match) setExpandedClassId(match.id);
  }, [pendingOpenCourseId, selectedBoard, expandedClassId, liveClasses]);

  const handleEnrollNow = (cls) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (FORM_FILLUP_ENABLED && user?.profile_complete === false) {
      openWithMessage('Please complete your profile to enroll in a course.');
      return;
    }

    const courseId = cls.courseIds?.[selectedBoard];

    if (!courseId) {
      alert(
        `${cls.title}${cls.subtitle ? ` (${cls.subtitle})` : ''} is not yet available for ${
          currentBoard?.name || 'this board'
        }.`
      );
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
    const activeCourseId = selectedClass?.courseIds?.[selectedBoard];
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
          onBack={() => setActiveCourse(null)}
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
          />
        )}
      </>
    );
  }

  return (
    <section className="courses-page">
      <div className="courses-container">
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
      {enrollModalCourseId && (
        <EnrollModal
          courseId={enrollModalCourseId}
          onClose={() => setEnrollModalCourseId(null)}
        />
      )}
    </section>
  );
};

export default Courses;
