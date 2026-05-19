import React from "react";
import teachersData from "../data/teachersData";
import "../css/teachers-section.css";

const TeachersSection = () => {
  return (
    <section className="teachers-section">
      {/* ambient glow — mirrors hero-glow-2 */}
      <div className="teachers-glow"></div>

      <div className="teachers-container">
        <div className="teachers-header">
          <p className="teachers-subtitle">Our Faculty</p>
          <h2 className="teachers-title">Meet Our Expert Teachers</h2>
          <p className="teachers-description">
            Learn from experienced and dedicated teachers who guide students
            toward academic success.
          </p>
        </div>

        <div className="teachers-grid">
          {teachersData.map((teacher) => (
            <div className="teacher-card" key={teacher.id}>
              <div className="teacher-image-wrapper">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="teacher-image"
                  loading="lazy"
                />
              </div>

              <div className="teacher-info">
                <h3 className="teacher-name">{teacher.name}</h3>
                <p className="teacher-subject">{teacher.subject}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeachersSection;