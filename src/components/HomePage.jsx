import Hero from "./Hero";
import About from "./About";
import Stats from "./Stats";
import HowItWorks from "./HowItWorks";
import Navbar from './Navbar';
import CoursePreview from './CoursePreview';
import Footer from './Footer';
import AboutShiksha from "./AboutShiksha";
import LearningPathways from "./LearningPathways";

const HomePage = () => {
  return (
    <div className="page-content">
      <Navbar />
   

      {/*NEW LANDING SECTIONS */}
      <Hero />
      <About />
      <Stats />
       <AboutShiksha />
      <HowItWorks />
      {/* EXISTING CONTENT */}
      <LearningPathways />
      <CoursePreview />
      <Footer />
      
    </div>
  );
};

export default HomePage;
