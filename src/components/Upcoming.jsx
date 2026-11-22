import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/Upcoming.css';
import Navbar from './Navbar';
import Footer from './Footer';
import ScribbleIcon from './icons/ScribbleIcon';
import { HeroDeco } from './hero/HeroLook';

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
    <div className="upcoming-page up-fresh hl-scope">
      <div className="upcoming-page-content">

        <Navbar />

        {/* Same hero look as the other pages (components/hero), kept simple
            here: centred, no illustration, and led by "Coming soon" — the
            placement board is what every "Placement" link promises. */}
        <header className="fh-hero up-simple">
          <HeroDeco />
          <div className="fh-wrap">
            <div className="fh-body">
              <span className="up-soon"><i />Coming soon</span>
              <h1 className="fh-title">
                <span className="fh-lead">Placements &amp; career support</span>
                <span className="fh-punch">are on their way.</span>
              </h1>
              <p className="fh-sub">
                A dedicated placement board with openings, internships and career support is
                coming to ShikshaCom.
              </p>
              <div className="fh-cta-row">
                <Link className="fh-btn fh-btn-primary" to="/contact">
                  Contact us
                  <ScribbleIcon name="arrow-right" size={17} />
                </Link>
                <button type="button" className="fh-btn fh-btn-ghost" onClick={goBack}>
                  Back
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="upcoming-container">
          <div className="up-head">
            <h2>Also on our roadmap</h2>
            <p>What else we are building, and where each piece stands.</p>
          </div>

          <div className="upcoming-features-grid">
            {/* Placements (the first entry) is the hero above, so it is not
                repeated as a card. */}
            {upcomingFeatures.slice(1).map((feature, index) => (
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
          {/* The old closing "Have something in mind?" card repeated the
              hero's Contact us / Back buttons, so it was dropped. */}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Upcoming;