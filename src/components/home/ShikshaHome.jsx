import "../../css/ShikshaHome.css";
import Hero from "./Hero";
import WhyShiksha from "./WhyShiksha";
import TeachersStudents from "./TeachersStudents";
import BrowseCategories from "./BrowseCategories";
import FeaturedCourses from "./FeaturedCourses";
import WhyChooseShiksha from "./WhyChooseShiksha";
import Resources from "./Resources";
import Collaborate from "./Collaborate";
import Faq from "./Faq";
import Cta from "./Cta";

// Composed homepage — same section order as the current site and the
// design handoff's own ShikshaHome.jsx composer, confirmed identical
// during planning. Global theme tokens/resets (fonts, :root vars, .wrap/
// .sec/.btn/.rv primitives) are imported once here via ShikshaHome.css,
// not per-section.
export default function ShikshaHome() {
  return (
    <main>
      <Hero />
      <WhyShiksha />
      <TeachersStudents />
      <BrowseCategories />
      <FeaturedCourses />
      <WhyChooseShiksha />
      <Resources />
      <Collaborate />
      <Faq />
      <Cta />
    </main>
  );
}
