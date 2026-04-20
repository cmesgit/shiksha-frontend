import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Courses.css';
import SubjectList from './SubjectList';
import { courseData, mbseCourseData } from '../data/courseData';

import cbseImg from '../assets/courses/Cbse.png';
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
  ],
  state: [
    {
      id: 'mbse',
      title: 'MBSE',
      desc: 'Mizoram Board of School Education.',
      image: mbseImg,
    },
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

const SectionHeader = ({ title, subtitle, trail = [], onTrailClick }) => (
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

    <h1 className="courses-title">{title}</h1>
    {subtitle && <p className="courses-subtitle">{subtitle}</p>}
  </div>
);

const CourseTile = ({
  image,
  title,
  subtitle,
  desc,
  price,
  buttonText = 'Browse',
  onClick,
}) => {
  return (
    <article
      className="courses-tile"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
    >
      <div className="courses-tile__imageWrap">
        {image ? (
          <img src={image} alt={title} className="courses-tile__image" />
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
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            {buttonText}
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
}) => {
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
            className="courses-tile__btn courses-tile__btn--primary"
            onClick={(e) => {
              e.stopPropagation();
              onEnroll();
            }}
          >
            ENROLL NOW
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

const Courses = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedBoardGroup, setSelectedBoardGroup] = useState(
    location.state?.selectedBoardGroup || null
  );
  const [selectedBoard, setSelectedBoard] = useState(location.state?.selectedBoard || null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeCourse, setActiveCourse] = useState(null);

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

  const handleTrailClick = (key) => {
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
    setSelectedBoardGroup(groupId);
    setSelectedBoard(null);
    setSelectedClass(null);
    setActiveCourse(null);
  };

  const handleBoardSelect = (boardId) => {
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
    navigate(`/enroll/${courseId}`);
  };

  if (activeCourse) {
    return (
      <SubjectList
        course={activeCourse}
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
          />

          <div className="courses-grid courses-grid--classes">
            {CLASSES.map((cls) => (
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
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (selectedBoardGroup) {
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
          />

          <div className="courses-grid courses-grid--board-options">
            {(BOARD_OPTIONS[selectedBoardGroup] || []).map((board) => (
              <CourseTile
                key={board.id}
                image={board.image}
                title={board.title}
                desc={board.desc}
                buttonText="Browse"
                onClick={() => handleBoardSelect(board.id)}
              />
            ))}
          </div>
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
        />

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
      </div>
    </section>
  );
};

export default Courses;