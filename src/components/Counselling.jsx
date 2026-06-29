import "../css/Upcoming.css";
import { Link } from "react-router-dom";


const Counselling = () => {
  const counsellingServices = [
  {
    title: "Career Assessment",
    description:
      "AI-powered career recommendations based on your interests and skills.",
    icon: "🧠"
  },
  {
    title: "Admission in India",
    description:
      "Explore colleges, courses and entrance exams in India.",
    icon: "🎓"
  },
  {
    title: "Admission Abroad",
    description:
      "Discover universities, scholarships and study abroad opportunities.",
    icon: "✈️"
  }
];

  return (
    <div className="upcoming-page">
      <div className="upcoming-page-content">

      <div className="upcoming-container">
        <div className="counselling-hero">
  <h1>Career Counselling</h1>

  <p>
    Discover careers that match your interests,
    personality and goals.
  </p>

  <Link to="/counselling/assessment">
  <button className="counselling-start-btn">
    Start Career Assessment
  </button>
</Link>
</div>
<h2 className="section-title">
  Our Services
</h2>

          <div className="services-grid">
  {counsellingServices.map((service, index) => (
    <div key={index} className="service-card">
      <div className="service-icon">
        {service.icon}
      </div>

      <h3>{service.title}</h3>

      <p>{service.description}</p>
    </div>
  ))}
</div>
<div className="how-it-works">
  <h2>How It Works</h2>

  <div className="steps-grid">
    <div className="step-card">
      <span className="step-icon">📝</span>
      <h3>Assessment</h3>
      <p>Answer questions about yourself.</p>
    </div>

    <div className="step-card">
      <span className="step-icon">🤖</span>
      <h3>Analysis</h3>
      <p>AI analyzes your preferences.</p>
    </div>

    <div className="step-card">
      <span className="step-icon">🎯</span>
      <h3>Careers</h3>
      <p>Receive career recommendations.</p>
    </div>

    <div className="step-card">
      <span className="step-icon">🎓</span>
      <h3>Admissions</h3>
      <p>Explore colleges and universities.</p>
    </div>
  </div>
</div>

        </div>

      </div>
    </div>
  );
};

export default Counselling;
