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
      1. Take Assessment
    </div>

    <div className="step-card">
      2. AI Analysis
    </div>

    <div className="step-card">
      3. Career Matches
    </div>

    <div className="step-card">
      4. Admission Guidance
    </div>
  </div>
</div>
<div className="why-counselling">
  <h2>Why Use AI Counselling?</h2>

  <div className="why-grid">
    <div className="why-card">
      <div className="why-icon">🎯</div>
      <h3>Personalized Recommendations</h3>
      <p>Careers tailored to your interests and strengths.</p>
    </div>

    <div className="why-card">
      <div className="why-icon">🗺️</div>
      <h3>Career Roadmap</h3>
      <p>Clear guidance from school to your dream career.</p>
    </div>

    <div className="why-card">
      <div className="why-icon">🏫</div>
      <h3>College Suggestions</h3>
      <p>Find universities and courses that fit you.</p>
    </div>

    <div className="why-card">
      <div className="why-icon">🌍</div>
      <h3>Admission Guidance</h3>
      <p>Explore opportunities in India and abroad.</p>
    </div>
  </div>
</div>

<div className="popular-careers">
  <h2>Explore Career Paths</h2>

  <div className="careers-grid">
    <div className="career-pill">💻 Software Engineer</div>
    <div className="career-pill">🩺 Doctor</div>
    <div className="career-pill">⚖️ Lawyer</div>
    <div className="career-pill">📊 Data Scientist</div>
    <div className="career-pill">🏛️ Civil Servant</div>
    <div className="career-pill">🔬 Research Scientist</div>
  </div>
</div>
          <div className="upcoming-cta-section">
            <h2>Stay Updated</h2>
            <p>Get notified when counselling services go live!</p>
            <div className="upcoming-cta-buttons">
              <button className="upcoming-notify-btn">Notify Me</button>
              <button
                className="upcoming-back-btn"
                onClick={() => window.history.back()}
              >
                Back
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Counselling;
