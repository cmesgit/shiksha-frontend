import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/Upcoming.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Upcoming = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // `key` is the string "default" only on the first entry of a history stack,
  // i.e. when this page was opened directly (deep link, new tab, shared URL).
  // Calling navigate(-1) there either does nothing or throws the visitor off
  // the site entirely, so fall back to the homepage.
  const goBack = () => {
    if (location.key && location.key !== 'default') navigate(-1);
    else navigate('/');
  };

  // Placements leads this list on purpose: the footer link, the homepage
  // "Placement & Opportunities" card and the navbar entry all land here, and
  // until now the page never mentioned placements at all — so every one of
  // those looked like a broken link to an unrelated roadmap.
  const upcomingFeatures = [
    {
      title: "Placements & Career Opportunities",
      description:
        "A dedicated placement board — openings, internships and career support for ShikshaCom learners.",
      status: "Coming Soon",
    },
    {
      title: "Teacher Registration Portal",
      description: "Complete registration system for educators to join our platform",
      status: "Coming Soon",
      
    },
    {
      title: "Expert Network",
      description: "Connect with industry experts for mentorship and guidance",
      status: "In Development",
    
    },
    {
      title: "Advanced Analytics Dashboard",
      description: "Comprehensive analytics for teachers and students",
      status: "Coming soon",
     
    },
    {
      title: "Mobile App Launch",
      description: "Native mobile applications for iOS and Android",
      status: "Coming Soon",
      
    },
    {
      title: "AI-Powered Learning Paths",
      description: "Personalized learning recommendations using AI",
      status: "Research Phase",
      
    },
    {
      title: "Virtual Reality Classrooms",
      description: "Immersive learning experiences in VR environments",
      status: "Concept Phase",
      
    }
  ];

  return (
    <div className="upcoming-page">
      <div className="upcoming-page-content">

        <Navbar />
        
        <div className="upcoming-container">
          <h1>Coming Soon</h1>
          <p className="upcoming-page-description">
            We're working hard to bring you exciting new features. Here's what's on our roadmap:
          </p>

          <div className="upcoming-features-grid">
            {upcomingFeatures.map((feature, index) => (
              <div key={index} className="upcoming-feature-card">
                <div className="upcoming-feature-header">
                  <h3>{feature.title}</h3>
                  <span className={`upcoming-status-badge ${feature.status.toLowerCase().replace(' ', '-')}`}>
                    {feature.status}
                  </span>
                </div>
                <p className="upcoming-feature-description">{feature.description}</p>
                <div className="upcoming-feature-footer">
                 
                </div>
              </div>
            ))}
          </div>

          <div className="upcoming-cta-section">
            {/* Was "Stay Updated" + a Notify Me button. There is no notify
                backend for this page, so the promise was never kept — the
                button only navigated to /contact. Copy now matches what the
                page can actually do. */}
            <h2>Have something in mind?</h2>
            <p>
              Tell us what you would like us to build next, or ask about
              anything on this roadmap.
            </p>
            <div className="upcoming-cta-links">
              <Link className="upcoming-cta-link" to="/contact">
                Contact us
              </Link>
            </div>
            <div className="upcoming-cta-buttons">
              <button type="button" className="upcoming-back-btn" onClick={goBack}>
                Back
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Upcoming;