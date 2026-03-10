import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Courses.css';

const SUBJECT_DESC = 'Description: The details of the course like the type of board, syllabus covered, etc';

export const courseCards = [
  {
    id: 'class8', title: 'Class 8',
    desc: 'All Subjects included in the MBSC Academic syllabus', price: '₹1,500',
    subjects: [
      { name: 'Mathematics', desc: SUBJECT_DESC },
      { name: 'English',     desc: SUBJECT_DESC },
      { name: 'Mizo',        desc: SUBJECT_DESC },
      { name: 'Science',     desc: SUBJECT_DESC },
      { name: 'Social Science', desc: SUBJECT_DESC },
    ],
  },
  {
    id: 'class9', title: 'Class 9',
    desc: 'All Subjects included in the MBSC Academic syllabus', price: '₹1,500',
    subjects: [
      { name: 'Mathematics', desc: SUBJECT_DESC },
      { name: 'English',     desc: SUBJECT_DESC },
      { name: 'Mizo',        desc: SUBJECT_DESC },
      { name: 'Science',     desc: SUBJECT_DESC },
      { name: 'Social Science', desc: SUBJECT_DESC },
    ],
  },
  {
    id: 'class10', title: 'Class 10',
    desc: 'All Subjects included in the MBSC Academic syllabus', price: '₹1,500',
    subjects: [
      { name: 'Mathematics', desc: SUBJECT_DESC },
      { name: 'English',     desc: SUBJECT_DESC },
      { name: 'Mizo',        desc: SUBJECT_DESC },
      { name: 'Science',     desc: SUBJECT_DESC },
      { name: 'Social Science', desc: SUBJECT_DESC },
    ],
  },
  {
    id: 'class11arts', title: 'Class 11 (Arts)',
    desc: 'All Subjects included in the MBSC Academic syllabus', price: '₹1,500',
    subjects: [
      { name: 'History',           desc: SUBJECT_DESC },
      { name: 'Geography',         desc: SUBJECT_DESC },
      { name: 'Political Science', desc: SUBJECT_DESC },
      { name: 'English',           desc: SUBJECT_DESC },
      { name: 'Mizo',              desc: SUBJECT_DESC },
    ],
  },
  {
    id: 'class11commerce', title: 'Class 11 (Commerce)',
    desc: 'All Subjects included in the MBSC Academic syllabus', price: '₹1,500',
    subjects: [
      { name: 'Accountancy',      desc: SUBJECT_DESC },
      { name: 'Business Studies', desc: SUBJECT_DESC },
      { name: 'Economics',        desc: SUBJECT_DESC },
      { name: 'Mathematics',      desc: SUBJECT_DESC },
      { name: 'English',          desc: SUBJECT_DESC },
    ],
  },
  {
    id: 'class11science', title: 'Class 11 (Science)',
    desc: 'All Subjects included in the MBSC Academic syllabus', price: '₹1,500',
    subjects: [
      { name: 'Physics',    desc: SUBJECT_DESC },
      { name: 'Chemistry',  desc: SUBJECT_DESC },
      { name: 'Biology',    desc: SUBJECT_DESC },
      { name: 'Mathematics',desc: SUBJECT_DESC },
      { name: 'English',    desc: SUBJECT_DESC },
    ],
  },
  {
    id: 'class12arts', title: 'Class 12 (Arts)',
    desc: 'All Subjects included in the MBSC Academic syllabus', price: '₹1,500',
    subjects: [
      { name: 'History',           desc: SUBJECT_DESC },
      { name: 'Geography',         desc: SUBJECT_DESC },
      { name: 'Political Science', desc: SUBJECT_DESC },
      { name: 'English',           desc: SUBJECT_DESC },
      { name: 'Mizo',              desc: SUBJECT_DESC },
    ],
  },
  {
    id: 'class12commerce', title: 'Class 12 (Commerce)',
    desc: 'All Subjects included in the MBSC Academic syllabus', price: '₹1,500',
    subjects: [
      { name: 'Accountancy',      desc: SUBJECT_DESC },
      { name: 'Business Studies', desc: SUBJECT_DESC },
      { name: 'Economics',        desc: SUBJECT_DESC },
      { name: 'Mathematics',      desc: SUBJECT_DESC },
      { name: 'English',          desc: SUBJECT_DESC },
    ],
  },
  {
    id: 'class12science', title: 'Class 12 (Science)',
    desc: 'All Subjects included in the MBSC Academic syllabus', price: '₹1,500',
    subjects: [
      { name: 'Physics',    desc: SUBJECT_DESC },
      { name: 'Chemistry',  desc: SUBJECT_DESC },
      { name: 'Biology',    desc: SUBJECT_DESC },
      { name: 'Mathematics',desc: SUBJECT_DESC },
      { name: 'English',    desc: SUBJECT_DESC },
    ],
  },
];

/* Reusable card used by both Courses page and CoursePreview */
export const CourseCard = ({ course, onArrowClick }) => (
  <div className="course-card">
    <div className="course-card-img" />
    <div className="course-card-body">
      <h3 className="course-card-title">{course.title}</h3>
      <p className="course-card-desc">{course.desc}</p>
      <div className="course-card-footer">
        <span className="course-card-price">{course.price}</span>
        <button className="course-arrow-btn" onClick={() => onArrowClick(course)}>→</button>
      </div>
    </div>
  </div>
);

const Courses = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (selectedCourse) {
    return (
      <div className="courses-page">
        <div className="course-detail">
          <h2 className="detail-title">{selectedCourse.title}</h2>
          <p className="detail-subtitle">
            Explore the subjects included in the {selectedCourse.title} Courses
          </p>

          <div className="subject-list">
            {selectedCourse.subjects.map((subj, i) => (
              <div className="subject-card" key={i}>
                <p className="subject-name">{subj.name}</p>
                <p className="subject-desc">{subj.desc}</p>
              </div>
            ))}
          </div>

          <div className="detail-footer">
            <span className="detail-price">{selectedCourse.price}</span>
            <button
              className="buy-btn"
              onClick={() =>
                navigate('/payment', {
                  state: { className: selectedCourse.title, price: selectedCourse.price },
                })
              }
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-page">
      <div className="courses-full-header">
        <h1 className="courses-full-title">Online Courses</h1>
        <p className="courses-full-subtitle">Explore the Courses we provide in our website</p>
      </div>

      <div className="courses-grid-wrap">
        <div className="courses-grid">
          {courseCards.map((course) => (
            <CourseCard key={course.id} course={course} onArrowClick={setSelectedCourse} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
