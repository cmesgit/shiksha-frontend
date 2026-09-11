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
import DemoVideoButton from "./home/DemoVideoButton";

const HomePage = () => {
  return (
    <div className="page-content">
      <Navbar />
      {/* A sibling, not a ShikshaHome section: it is position:fixed, so the
          CMS section order has nothing to say about it, and a key absent from
          the backend's HomeSection enum is filtered out of that list anyway.
          Renders null until a demo clip is published. */}
      <DemoVideoButton />
      <ShikshaHome />
      <Footer />
    </div>
  );
};

export default HomePage;
