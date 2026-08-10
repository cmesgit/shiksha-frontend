/**
 * HomePage.jsx — landing page shell.
 *
 * Renders the redesigned homepage (./home/ShikshaHome.jsx — 10 real,
 * CMS-wired section components) which replaced the previous single-file
 * ./home/HomeGreen.jsx implementation.
 */
import Navbar from "./Navbar";
import Footer from "./Footer";
import ShikshaHome from "./home/ShikshaHome";

const HomePage = () => {
  return (
    <div className="page-content">
      <Navbar />
      <ShikshaHome />
      <Footer />
    </div>
  );
};

export default HomePage;
