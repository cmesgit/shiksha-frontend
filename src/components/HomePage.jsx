/**
 * HomePage.jsx — landing page shell.
 *
 * The previous section stack (Hero / About / Stats / AboutShiksha /
 * HowItWorks / LearningPathways / CoursePreview) has been replaced by
 * the redesigned page in ./home/HomeGreen.jsx. The old components are
 * left untouched in the repo for rollback and for the routes that
 * still use them (e.g. /about).
 */
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomeGreen from "./home/HomeGreen";

const HomePage = () => {
  return (
    <div className="page-content">
      <Navbar />
      <HomeGreen />
      <Footer />
    </div>
  );
};

export default HomePage;
