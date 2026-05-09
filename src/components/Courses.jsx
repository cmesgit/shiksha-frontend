import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Courses.css';
import SubjectList from './SubjectList';
import { courseData, mbseCourseData } from '../data/courseData';
import BoardSvg from './BoardSvg';
import { useAuth } from '../contexts/AuthContext';
import { getMyEnrollmentRequests } from '../api/enrollments';
import { APP_URL } from '../config/urls';

import cbseImg from '../assets/courses/Cbse.png';
import icseImg from '../assets/courses/Icse.svg';
import ibImg from '../assets/courses/Ib.svg';
import niosImg from '../assets/courses/Nios.svg';
import aissceImg from '../assets/courses/Aissce.svg';
import bseapImg from '../assets/courses/Bseap.svg';
import mbseImg from '../assets/courses/Mbse.png';
import class8Img from '../assets/courses/class8.png';
import class9Img from '../assets/courses/class9.png';
import class10Img from '../assets/courses/class10.png';
import class11ArtsImg from '../assets/courses/class11-Arts.png';
import class11ComImg from '../assets/courses/class11-Com.png';
import class11SciImg from '../assets/courses/class11-Sci.png';
import class12ArtsImg from '../assets/courses/class12-Arts.png';
import class12ComImg from '../assets/courses/class12-Com.png';
import class12SciImg from '../assets/courses/class12-Sci.png';
import centralImg from '../assets/courses/central.jpeg';
import stateImg from '../assets/courses/state.jpeg';

const BOARD_GROUPS = [
  {
    id: 'central',
    title: 'Central Board',
    desc: 'National Curriculum Boards',
    image: centralImg,
  },
  {
    id: 'state',
    title: 'State Board',
    desc: 'Regional Curriculum Boards',
    image: stateImg,
  },
];

const BOARD_OPTIONS = {
  central: [
    {
      id: 'cbse',
      title: 'CBSE',
      desc: 'Central Board of Secondary Education. Most widely followed board in India.',
      image: cbseImg,
    },
    {
      id: 'icse',
      title: 'ICSE',
      desc: 'Indian Certificate of Secondary Education.',
      image: icseImg,
      locked: true,
    },
    {
      id: 'ib',
      title: 'IB',
      desc: 'International Baccalaureate.',
      image: ibImg,
      locked: true,
    },
    {
      id: 'nios',
      title: 'NIOS',
      desc: 'The National Institute of Open Schooling.',
      image: niosImg,
      locked: true,
    },
    {
      id: 'aissce',
      title: 'AISSCE',
      desc: 'All India Senior School Certificate Examination.',
      image: aissceImg,
      locked: true,
    },
  ],
  state: [
    {
      id: 'mbse',
      title: 'MBSE',
      desc: 'Mizoram Board of School Education.',
      image: mbseImg,
    },
    { id: 'bseap',    title: 'BSEAP',    desc: 'Board of Secondary Education, Andhra Pradesh.',                              image: bseapImg, locked: true },
    { id: 'asseb',    title: 'ASSEB',    desc: 'Assam State School Education Board.',                                        boardCode: 'ASSEB',    locked: true },
    { id: 'bseb',     title: 'BSEB',     desc: 'Bihar School Examination Board.',                                            boardCode: 'BSEB',     locked: true },
    { id: 'cgbse',    title: 'CGBSE',    desc: 'Chhattisgarh Board of Secondary Education.',                                 boardCode: 'CGBSE',    locked: true },
    { id: 'gbshse',   title: 'GBSHSE',   desc: 'Goa Board of Secondary and Higher Secondary Education.',                     boardCode: 'GBSHSE',   locked: true },
    { id: 'gseb',     title: 'GSEB',     desc: 'Gujarat Secondary and Higher Secondary Education Board.',                    boardCode: 'GSEB',     locked: true },
    { id: 'bseh',     title: 'BSEH',     desc: 'Board of School Education Haryana.',                                         boardCode: 'BSEH',     locked: true },
    { id: 'hpbose',   title: 'HPBOSE',   desc: 'Himachal Pradesh Board of School Education.',                                boardCode: 'HPBOSE',   locked: true },
    { id: 'jac',      title: 'JAC',      desc: 'Jharkhand Academic Council.',                                                boardCode: 'JAC',      locked: true },
    { id: 'kseab',    title: 'KSEAB',    desc: 'Karnataka School Examination and Assessment Board.',                         boardCode: 'KSEAB',    locked: true },
    { id: 'kbpe',     title: 'KBPE',     desc: 'Kerala Board of Public Examinations.',                                       boardCode: 'KBPE',     locked: true },
    { id: 'mpbse',    title: 'MPBSE',    desc: 'Madhya Pradesh Board of Secondary Education.',                               boardCode: 'MPBSE',    locked: true },
    { id: 'msbshse',  title: 'MSBSHSE',  desc: 'Maharashtra State Board of Secondary and Higher Secondary Education.',       boardCode: 'MSBSHSE',  locked: true },
    { id: 'bosem',    title: 'BOSEM',    desc: 'Manipur Board of Secondary Education.',                                      boardCode: 'BOSEM',    locked: true },
    { id: 'cohsem',   title: 'COHSEM',   desc: 'Council of Higher Secondary Education, Manipur.',                           boardCode: 'COHSEM',   locked: true },
    { id: 'mbose',    title: 'MBOSE',    desc: 'Meghalaya Board of School Education.',                                       boardCode: 'MBOSE',    locked: true },
    { id: 'nbse',     title: 'NBSE',     desc: 'Nagaland Board of School Education.',                                        boardCode: 'NBSE',     locked: true },
    { id: 'bseodisha',title: 'BSE Odisha',desc: 'Board of Secondary Education, Odisha.',                                     boardCode: 'BSE Odisha', locked: true },
    { id: 'pseb',     title: 'PSEB',     desc: 'Punjab School Education Board.',                                             boardCode: 'PSEB',     locked: true },
    { id: 'rbse',     title: 'RBSE',     desc: 'Board of Secondary Education, Rajasthan.',                                   boardCode: 'RBSE',     locked: true },
    { id: 'tnbse',    title: 'TNBSE',    desc: 'Tamil Nadu State Board.',                                                    boardCode: 'TNBSE',    locked: true },
    { id: 'tsbse',    title: 'TSBSE',    desc: 'Telangana Board of Secondary Education.',                                    boardCode: 'TSBSE',    locked: true },
    { id: 'tbse',     title: 'TBSE',     desc: 'Tripura Board of Secondary Education.',                                      boardCode: 'TBSE',     locked: true },
    { id: 'upmsp',    title: 'UPMSP',    desc: 'Board of High School and Intermediate Education Uttar Pradesh.',             boardCode: 'UPMSP',    locked: true },
    { id: 'ubse',     title: 'UBSE',     desc: 'Uttarakhand Board of School Education.',                                     boardCode: 'UBSE',     locked: true },
    { id: 'wbbse',    title: 'WBBSE',    desc: 'West Bengal Board of Secondary Education.',                                  boardCode: 'WBBSE',    locked: true },
  ],
};

const CLASSES = [
  {
    id: 'class8',
    title: 'Class 8',
    price: '₹1,500',
    image: class8Img,
    duration: '1 Year',
    fee: '1500',
    access: 'Full Course Access',
    mode: 'Online',
    courseIds: {
      cbse: '3b54e0cf-9e17-4652-b5de-110735c1ed8e',
      mbse: '2b24c4a0-787e-4a0d-acf3-29e9f4e921cf',
    },
  },
  {
    id: 'class9',
    title: 'Class 9',
    price: '₹1,500',
    image: class9Img,
    duration: '1 Year',
    fee: '1500',
    access: 'Full Course Access',
    mode: 'Online',
    courseIds: {
      cbse: '26b5b4ce-5b0a-4381-a492-c134676881f2',
      mbse: '9fac2eae-5a90-411e-994d-d2613923cddf',
    },
  },
  {
    id: 'class10',
    title: 'Class 10',
    price: '₹1,500',
    image: class10Img,
    duration: '1 Year',
    fee: '1500',
    access: 'Full Course Access',
    mode: 'Online',
    courseIds: {
      cbse: '41ec43ac-bac7-4a68-b5d6-eda2acd85585',
      mbse: 'cfe07ab8-1508-4c14-8181-8ba21d4cb331',
    },
  },
  {
    id: 'class11science',
    title: 'Class 11',
    subtitle: 'Science',
    price: '₹1,500',
    image: class11SciImg,
    duration: '1 Year',
    fee: '1500',
    access: 'Full Course Access',
    mode: 'Online',
    courseIds: {
      mbse: 'eb7700aa-a95b-4eeb-a4e4-cdffe9c27a73',
    },
  },
  {
    id: 'class11commerce',
    title: 'Class 11',
    subtitle: 'Commerce',
    price: '₹1,500',
    image: class11ComImg,
    duration: '1 Year',
    fee: '1500',
    access: 'Full Course Access',
    mode: 'Online',
    courseIds: {
      mbse: '51724c07-b13a-4413-85d8-d7cf2561fabb',
    },
  },
  {
    id: 'class11arts',
    title: 'Class 11',
    subtitle: 'Arts',
    price: '₹1,500',
    image: class11ArtsImg,
    duration: '1 Year',
    fee: '1500',
    access: 'Full Course Access',
    mode: 'Online',
    courseIds: {
      mbse: '24056c0b-1d46-411a-912d-5fecd2b8d90f',
    },
  },
  {
    id: 'class12science',
    title: 'Class 12',
    subtitle: 'Science',
    price: '₹1,500',
    image: class12SciImg,
    duration: '1 Year',
    fee: '1500',
    access: 'Full Course Access',
    mode: 'Online',
    courseIds: {
      mbse: '6493ae70-6f47-48e9-b3a7-cb345432cf0d',
    },
  },
  {
    id: 'class12commerce',
    title: 'Class 12',
    subtitle: 'Commerce',
    price: '₹1,500',
    image: class12ComImg,
    duration: '1 Year',
    fee: '1500',
    access: 'Full Course Access',
    mode: 'Online',
    courseIds: {
      mbse: '933a79ca-b5ed-4df4-926d-2d241c3efde9',
    },
  },
  {
    id: 'class12arts',
    title: 'Class 12',
    subtitle: 'Arts',
    price: '₹1,500',
    image: class12ArtsImg,
    duration: '1 Year',
    fee: '1500',
    access: 'Full Course Access',
    mode: 'Online',
    courseIds: {
      mbse: 'e0ccb831-57d4-49a1-818f-cc6d234db5af',
    },
  },
];

const SectionHeader = ({ title, subtitle, trail = [], onTrailClick, rightSlot }) => (
  <div className="courses-hero">
    {trail.length > 0 && (
      <div className="courses-breadcrumb">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;

          return (
            <span key={item.key}>
              <button
                type="button"
                className={`courses-breadcrumb__item ${isLast ? 'is-active' : ''}`}
                onClick={() => !isLast && onTrailClick(item.key)}
                disabled={isLast}
              >
                {item.label}
              </button>
              {!isLast && <span className="courses-breadcrumb__sep">&gt;</span>}
            </span>
          );
        })}
      </div>
    )}

    <div className="courses-hero__row">
      <h1 className="courses-title">{title}</h1>
      {rightSlot && <div className="courses-hero__right">{rightSlot}</div>}
    </div>
    {subtitle && <p className="courses-subtitle">{subtitle}</p>}
  </div>
);

const CourseTile = ({
  image,
  boardCode,
  title,
  subtitle,
  desc,
  price,
  buttonText = 'Browse',
  onClick,
  locked = false,
}) => {
  const handleClick = locked ? undefined : onClick;

  return (
    <article
      className={`courses-tile${locked ? ' courses-tile--locked' : ''}`}
      onClick={handleClick}
      role={locked ? 'img' : 'button'}
      tabIndex={locked ? -1 : 0}
      onKeyDown={(e) => {
        if (!locked && (e.key === 'Enter' || e.key === ' ')) onClick();
      }}
    >
      {locked && (
        <div className="courses-tile__coming-soon">
          <span className="courses-tile__lock-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <span className="courses-tile__coming-label">Coming Soon</span>
        </div>
      )}

      <div className="courses-tile__imageWrap">
        {image ? (
          <img src={image} alt={title} className="courses-tile__image" />
        ) : boardCode ? (
          <BoardSvg code={boardCode} />
        ) : (
          <div className="courses-tile__imagePlaceholder">Course Image</div>
        )}
      </div>

      <div className="courses-tile__content">
        {subtitle && <span className="courses-tile__tag">{subtitle}</span>}
        <h3 className="courses-tile__title">{title}</h3>
        {desc && <p className="courses-tile__desc">{desc}</p>}

        <div className="courses-tile__footer">
          {price ? <span className="courses-tile__price">{price}</span> : <span />}
          <button
            type="button"
            className="courses-tile__btn"
            disabled={locked}
            onClick={(e) => {
              e.stopPropagation();
              if (!locked) onClick();
            }}
          >
            {locked ? 'Coming Soon' : buttonText}
          </button>
        </div>
      </div>
    </article>
  );
};

const ClassCourseTile = ({
  image,
  title,
  subtitle,
  desc,
  duration,
  fee,
  access,
  mode,
  onViewDetails,
  onEnroll,
  enrollmentStatus,
}) => {
  const isEnrolled = enrollmentStatus === 'APPROVED';
  const isPending = enrollmentStatus === 'PENDING';

  let enrollBtnLabel = 'ENROLL NOW';
  let enrollBtnClass = 'courses-tile__btn courses-tile__btn--primary';
  if (isEnrolled) {
    enrollBtnLabel = 'ENROLLED';
    enrollBtnClass += ' courses-tile__btn--enrolled';
  } else if (isPending) {
    enrollBtnLabel = 'PENDING APPROVAL';
    enrollBtnClass += ' courses-tile__btn--pending';
  }

  return (
    <article
      className="courses-tile courses-tile--detailed"
      role="button"
      tabIndex={0}
      onClick={onViewDetails}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onViewDetails();
      }}
    >
      <div className="courses-tile__imageWrap">
        {image ? (
          <img
            src={image}
            alt={`${title}${subtitle ? ` ${subtitle}` : ''}`}
            className="courses-tile__image"
          />
        ) : (
          <div className="courses-tile__imagePlaceholder">Course Image</div>
        )}
      </div>

      <div className="courses-tile__content courses-tile__content--detailed">
        <div className="courses-tile__heading">
          <h3 className="courses-tile__title">{title}</h3>
          {subtitle && <span className="courses-tile__stream">{subtitle}</span>}
        </div>

        {desc && <p className="courses-tile__desc">{desc}</p>}

        <div className="courses-details-box">
          <div className="courses-details-box__item">
            <span>Duration:</span>
            <strong>{duration}</strong>
          </div>

          <div className="courses-details-box__item">
            <span>Fee:</span>
            <strong>₹{fee}/month</strong>
          </div>

          <div className="courses-details-box__item">
            <span>Access:</span>
            <strong>{access}</strong>
          </div>

          <div className="courses-details-box__item">
            <span>Mode:</span>
            <strong>{mode}</strong>
          </div>
        </div>

        <div className="courses-tile__actions">
          <button
            type="button"
            className={enrollBtnClass}
            disabled={isPending}
            onClick={(e) => {
              e.stopPropagation();
              if (isPending) return;
              onEnroll();
            }}
          >
            {enrollBtnLabel}
          </button>

          <button
            type="button"
            className="courses-tile__btn courses-tile__btn--secondary"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
};

const ALL_BOARDS = [
  ...BOARD_OPTIONS.central.map((b) => ({ ...b, groupId: 'central', groupLabel: 'Central Board' })),
  ...BOARD_OPTIONS.state.map((b) => ({ ...b, groupId: 'state', groupLabel: 'State Board' })),
];

const Courses = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [selectedBoardGroup, setSelectedBoardGroup] = useState(
    location.state?.selectedBoardGroup || null
  );
  const [selectedBoard, setSelectedBoard] = useState(location.state?.selectedBoard || null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeCourse, setActiveCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [enrollmentStatusByCourseId, setEnrollmentStatusByCourseId] = useState({});

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
        // APPROVED wins over PENDING wins over REJECTED when multiple requests exist.
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
      .catch(() => {
        // Non-fatal — default to no known status; button stays "ENROLL NOW".
      });
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedBoardGroup, selectedBoard, selectedClass, activeCourse]);

  useEffect(() => {
    if (location.state?.resetCourses) {
      setSelectedBoardGroup(null);
      setSelectedBoard(null);
      setSelectedClass(null);
      setActiveCourse(null);
    }
  }, [location.state]);

  const currentBoardGroup = useMemo(
    () => BOARD_GROUPS.find((item) => item.id === selectedBoardGroup),
    [selectedBoardGroup]
  );

  const currentBoard = useMemo(() => {
    if (!selectedBoardGroup || !selectedBoard) return null;
    return BOARD_OPTIONS[selectedBoardGroup]?.find((item) => item.id === selectedBoard) || null;
  }, [selectedBoardGroup, selectedBoard]);

  const resolvedCourseData = useMemo(() => {
    if (selectedBoard === 'mbse') return mbseCourseData;
    return courseData;
  }, [selectedBoard]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const pool = selectedBoardGroup
      ? (BOARD_OPTIONS[selectedBoardGroup] || [])
      : ALL_BOARDS;
    return pool.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.desc.toLowerCase().includes(q) ||
        (b.groupLabel || '').toLowerCase().includes(q)
    );
  }, [searchQuery, selectedBoardGroup]);

  const handleSearchBoardSelect = (board) => {
    if (board.locked) return;
    setSearchQuery('');
    setSelectedBoardGroup(board.groupId);
    setSelectedBoard(board.id);
    setSelectedClass(null);
    setActiveCourse(null);
  };

  const handleTrailClick = (key) => {
    setSearchQuery('');
    if (key === 'boards') {
      setSelectedBoardGroup(null);
      setSelectedBoard(null);
      setSelectedClass(null);
      setActiveCourse(null);
      return;
    }

    if (key === 'boardGroup') {
      setSelectedBoard(null);
      setSelectedClass(null);
      setActiveCourse(null);
      return;
    }

    if (key === 'board') {
      setSelectedClass(null);
      setActiveCourse(null);
    }
  };

  const handleBoardGroupSelect = (groupId) => {
    setSearchQuery('');
    setSelectedBoardGroup(groupId);
    setSelectedBoard(null);
    setSelectedClass(null);
    setActiveCourse(null);
  };

  const handleBoardSelect = (boardId) => {
    setSearchQuery('');
    setSelectedBoard(boardId);
    setSelectedClass(null);
    setActiveCourse(null);
  };

  const handleClassSelect = (cls) => {
    setSelectedClass(cls);
    const course = resolvedCourseData[cls.id];
    if (course) {
      setActiveCourse(course);
    }
  };

  const handleEnrollNow = (cls) => {
    const courseId = cls.courseIds?.[selectedBoard];
    if (!courseId) {
      alert(`${cls.title}${cls.subtitle ? ` (${cls.subtitle})` : ''} is not yet available for ${currentBoard?.title || 'this board'}.`);
      return;
    }
    if (enrollmentStatusByCourseId[courseId] === 'APPROVED') {
      window.location.href = APP_URL;
      return;
    }
  
navigate(`/enroll/${courseId}`);
  };

  const searchBar = (placeholder = 'Search boards…') => (
    <div className="courses-search-box">
      <svg className="courses-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        className="courses-search-input"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button className="courses-search-clear" onClick={() => setSearchQuery('')} aria-label="Clear">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );

  if (activeCourse) {
    return (
      <SubjectList
        course={activeCourse}
        courseId={selectedClass?.courseIds?.[selectedBoard]}
        enrollmentStatus={
          enrollmentStatusByCourseId[selectedClass?.courseIds?.[selectedBoard]]
        }
        boardGroup={currentBoardGroup?.title}
        board={currentBoard?.title}
        selectedClass={
          selectedClass?.subtitle
            ? `${selectedClass.title} (${selectedClass.subtitle})`
            : selectedClass?.title
        }
        onBack={(level) => {
          if (level === 'boards') {
            setSelectedBoardGroup(null);
            setSelectedBoard(null);
            setSelectedClass(null);
            setActiveCourse(null);
            return;
          }

          if (level === 'boardGroup') {
            setSelectedBoard(null);
            setSelectedClass(null);
            setActiveCourse(null);
            return;
          }

          if (level === 'board') {
            setSelectedClass(null);
            setActiveCourse(null);
            return;
          }

          if (level === 'class') {
            setActiveCourse(null);
          }
        }}
      />
    );
  }

  if (selectedBoard) {
    const classesToShow = searchQuery.trim()
      ? CLASSES.filter((cls) =>
          `${cls.title} ${cls.subtitle || ''}`.toLowerCase().includes(searchQuery.trim().toLowerCase())
        )
      : CLASSES;

    return (
      <section className="courses-page">
        <div className="courses-container">
          <SectionHeader
            title="Courses"
            subtitle=""
            trail={[
              { key: 'boards', label: 'Boards' },
              { key: 'boardGroup', label: currentBoardGroup?.title || 'Board Type' },
              { key: 'board', label: currentBoard?.title || 'Board' },
            ]}
            onTrailClick={handleTrailClick}
            rightSlot={searchBar('Search course…')}
          />

          {searchQuery.trim() && (
            <p className="courses-search-count">
              {classesToShow.length} result{classesToShow.length !== 1 ? 's' : ''} for &ldquo;{searchQuery.trim()}&rdquo;
            </p>
          )}

          {classesToShow.length > 0 ? (
            <div className="courses-grid courses-grid--classes">
              {classesToShow.map((cls) => {
                const cid = cls.courseIds?.[selectedBoard];
                const status = cid ? enrollmentStatusByCourseId[cid] : undefined;
                return (
                  <ClassCourseTile
                    key={cls.id}
                    image={cls.image}
                    title={cls.title}
                    subtitle={cls.subtitle}
                    desc={cls.desc}
                    duration={cls.duration}
                    fee={cls.fee}
                    access={cls.access}
                    mode={cls.mode}
                    onViewDetails={() => handleClassSelect(cls)}
                    onEnroll={() => handleEnrollNow(cls)}
                    enrollmentStatus={status}
                  />
                );
              })}
            </div>
          ) : (
            <p className="courses-search-empty">No classes found for &ldquo;{searchQuery.trim()}&rdquo;</p>
          )}
        </div>
      </section>
    );
  }

  if (selectedBoardGroup) {
    const boardsToShow = searchQuery.trim()
      ? searchResults
      : (BOARD_OPTIONS[selectedBoardGroup] || []);

    return (
      <section className="courses-page">
        <div className="courses-container">
          <SectionHeader
            title={currentBoardGroup?.title || 'Boards'}
            subtitle=""
            trail={[
              { key: 'boards', label: 'Boards' },
              { key: 'boardGroup', label: currentBoardGroup?.title || 'Board Type' },
            ]}
            onTrailClick={handleTrailClick}
            rightSlot={searchBar()}
          />

          {searchQuery.trim() && (
            <p className="courses-search-count">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for &ldquo;{searchQuery.trim()}&rdquo;
            </p>
          )}

          {boardsToShow.length > 0 ? (
            <div className="courses-grid courses-grid--board-options">
              {boardsToShow.map((board) => (
                <CourseTile
                  key={board.id}
                  image={board.image}
                  boardCode={board.boardCode}
                  title={board.title}
                  desc={board.desc}
                  buttonText="Browse"
                  locked={board.locked}
                  onClick={() => handleBoardSelect(board.id)}
                />
              ))}
            </div>
          ) : (
            <p className="courses-search-empty">No boards found for &ldquo;{searchQuery.trim()}&rdquo;</p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="courses-page">
      <div className="courses-container">
        <SectionHeader
          title="Boards"
          subtitle=""
          trail={[{ key: 'boards', label: 'Boards' }]}
          onTrailClick={handleTrailClick}
          rightSlot={searchBar}
        />

        {searchQuery.trim() ? (
          searchResults.length > 0 ? (
            <div>
              <p className="courses-search-count">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for &ldquo;{searchQuery.trim()}&rdquo;</p>
              <div className="courses-grid courses-grid--board-options">
                {searchResults.map((board) => (
                  <div key={board.id} className="courses-search-result">
                    <span className="courses-search-group-tag">{board.groupLabel}</span>
                    <CourseTile
                      image={board.image}
                      boardCode={board.boardCode}
                      title={board.title}
                      desc={board.desc}
                      buttonText="Browse"
                      locked={board.locked}
                      onClick={() => handleSearchBoardSelect(board)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="courses-search-empty">No boards found for &ldquo;{searchQuery.trim()}&rdquo;</p>
          )
        ) : (
          <div className="courses-grid courses-grid--boards">
            {BOARD_GROUPS.map((board) => (
              <CourseTile
                key={board.id}
                image={board.image}
                title={board.title}
                desc={board.desc}
                buttonText="Browse"
                onClick={() => handleBoardGroupSelect(board.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;