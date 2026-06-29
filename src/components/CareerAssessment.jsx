import { useState } from "react";
import "../css/Upcoming.css";

const CareerAssessment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
  name: "",
  age: "",
  classLevel: "",
  country: "",
  state: "",
  interests: [],
  skills: [],
  goals: [],
});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const interests = [
  "Programming",
  "Mathematics",
  "Science",
  "Business",
  "Art",
  "Sports",
  "Teaching",
  "Research",
  "Music",
  "Social Work",
  "Technology",
  "Writing"
];
  const skills = [
  "Problem Solving",
  "Communication",
  "Leadership",
  "Creativity",
  "Critical Thinking",
  "Public Speaking",
  "Teamwork",
  "Mathematics",
  "Coding",
  "Writing",
  "Research",
  "Design"
];
  const goals = [
  "High Salary",
  "Job Security",
  "Helping People",
  "Research",
  "Travel Opportunities",
  "Work-Life Balance",
  "Government Job",
  "Entrepreneurship",
  "Higher Studies",
  "Creativity"
];
  const toggleInterest = (interest) => {
  setFormData((prev) => ({
    ...prev,
    interests: prev.interests.includes(interest)
      ? prev.interests.filter((i) => i !== interest)
      : [...prev.interests, interest]
  }));
};
  const toggleSkill = (skill) => {
  setFormData((prev) => ({
    ...prev,
    skills: prev.skills.includes(skill)
      ? prev.skills.filter((s) => s !== skill)
      : [...prev.skills, skill]
  }));
};
  const toggleGoal = (goal) => {
  setFormData((prev) => ({
    ...prev,
    goals: prev.goals.includes(goal)
      ? prev.goals.filter((g) => g !== goal)
      : [...prev.goals, goal]
  }));
};
  const getRecommendations = () => {
  const recommendations = [];

  if (
    formData.interests.includes("Programming") ||
    formData.skills.includes("Coding")
  ) {
    recommendations.push({
      title: "💻 Software Engineer",
      description:
        "Great for people who enjoy technology, coding and problem solving."
    });
  }

  if (
    formData.interests.includes("Science") &&
    formData.goals.includes("Helping People")
  ) {
    recommendations.push({
      title: "🩺 Doctor",
      description:
        "Ideal for students who love science and want to help others."
    });
  }

  if (
    formData.interests.includes("Research")
  ) {
    recommendations.push({
      title: "🔬 Research Scientist",
      description:
        "Perfect for curious minds who enjoy discovery and innovation."
    });
  }

  if (
    formData.goals.includes("Government Job")
  ) {
    recommendations.push({
      title: "🏛️ Civil Servant",
      description:
        "A good choice for those seeking public service and job security."
    });
  }

  if (
    formData.interests.includes("Business")
  ) {
    recommendations.push({
      title: "💼 Entrepreneur",
      description:
        "Suitable for people with leadership and business interests."
    });
  }

  return recommendations;
};
  return (
    <div className="upcoming-page">
      <div className="upcoming-container">

        <h1>Career Assessment</h1>

        <p className="upcoming-page-description">
          Let's get to know you first.
        </p>
 <div className="assessment-progress">
  <div
  className="assessment-progress-bar"
  style={{ width: `${step * 20}%` }}
></div>
</div>

<div className="assessment-step">
  Step {step} of 5 • Personal Information
</div>

       <div className="assessment-card">

  {step === 1 && (
    <>
      <div className="assessment-field">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </div>

      <div className="assessment-field">
        <label>Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter your age"
        />
      </div>

      <div className="assessment-field">
        <label>Class</label>
        <select
          name="classLevel"
          value={formData.classLevel}
          onChange={handleChange}
        >
          <option value="">Select Class</option>
          <option>Class 8</option>
          <option>Class 9</option>
          <option>Class 10</option>
          <option>Class 11</option>
          <option>Class 12</option>
          <option>College</option>
        </select>
      </div>

      <div className="assessment-field">
        <label>Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
        />
      </div>

      <div className="assessment-field">
        <label>State</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="State"
        />
      </div>

      <button
        className="assessment-next-btn"
        onClick={() => setStep(2)}
      >
        Continue
      </button>
    </>
  )}

  {step === 2 && (
    <>
      <h2>Select Your Interests</h2>

      <p className="assessment-subtitle">
        Choose all topics that interest you.
      </p>

      <div className="interests-grid">
        {interests.map((interest) => (
          <div
            key={interest}
            className={`interest-card ${
              formData.interests.includes(interest)
                ? "selected"
                : ""
            }`}
            onClick={() => toggleInterest(interest)}
          >
            {interest}
          </div>
        ))}
      </div>

      <button
        className="assessment-next-btn"
        onClick={() => setStep(3)}
      >
        Continue
      </button>
    </>
  )}
  {step === 3 && (
  <>
    <h2>Select Your Skills</h2>

    <p className="assessment-subtitle">
      Choose skills that describe you.
    </p>

    <div className="interests-grid">
      {skills.map((skill) => (
        <div
          key={skill}
          className={`interest-card ${
            formData.skills.includes(skill)
              ? "selected"
              : ""
          }`}
          onClick={() => toggleSkill(skill)}
        >
          {skill}
        </div>
      ))}
    </div>

    <button
      className="assessment-next-btn"
      onClick={() => setStep(4)}
    >
      Continue
    </button>
  </>
)}
 {step === 4 && (
  <>
    <h2>What Are Your Goals?</h2>

    <p className="assessment-subtitle">
      Select what matters most to you.
    </p>

    <div className="interests-grid">
      {goals.map((goal) => (
        <div
          key={goal}
          className={`interest-card ${
            formData.goals.includes(goal)
              ? "selected"
              : ""
          }`}
          onClick={() => toggleGoal(goal)}
        >
          {goal}
        </div>
      ))}
    </div>

    <button
      className="assessment-next-btn"
      onClick={() => setStep(5)}
    >
      View Results
    </button>
  </>
)}
 {step === 5 && (
  <>
    <h2>Your Career Recommendations</h2>

    <p className="assessment-subtitle">
      Based on your interests, skills and goals.
    </p>

    {getRecommendations().length > 0 ? (
      getRecommendations().map((career, index) => (
        <div className="results-card" key={index}>
          <h3>{career.title}</h3>
          <p>{career.description}</p>
        </div>
      ))
    ) : (
      <div className="results-card">
        <h3>🌟 Explore More Careers</h3>
        <p>
          We couldn't determine a specific career path yet.
          Try selecting more interests and skills.
        </p>
      </div>
    )}
  </>
)}
</div>
      </div>
    </div>
  );
};

export default CareerAssessment;