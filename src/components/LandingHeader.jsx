import { Link } from 'react-router-dom';
import '../css/LandingHeader.css';

const LandingHeader = () => {
  return (
    <div className="landing-header">
      <div className="search-section">
        <input
          type="text"
          placeholder="Search courses, teachers, topics..."
          className="search-bar"
        />
      </div>
      <Link to="/courses" className="demo-btn">demo</Link>
    </div>
  );
};

export default LandingHeader;
