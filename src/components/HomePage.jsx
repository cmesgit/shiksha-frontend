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
import DemoVideoProvider from "./home/DemoVideoProvider";

const HomePage = () => {
  return (
    <div className="page-content">
      <Navbar />
      {/* Wraps the sections rather than sitting beside them so Hero can offer
          the same clips inline; renders nothing until a clip has a URL. */}
      <DemoVideoProvider>
        <ShikshaHome />
      </DemoVideoProvider>
      <Footer />
    </div>
  );
};

export default HomePage;
