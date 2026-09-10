import { useEffect, useState } from "react";
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
import TickerBand from "./TickerBand";
import { getHomeSectionOrder } from "../../api/contentApi";

// Keys match content.HomeSection on the backend exactly.
const SECTION_COMPONENTS = {
  hero: Hero,
  why_shiksha: WhyShiksha,
  teachers_students: TeachersStudents,
  browse_categories: BrowseCategories,
  featured_courses: FeaturedCourses,
  why_choose: WhyChooseShiksha,
  resources: Resources,
  collaborate: Collaborate,
  faq: Faq,
  cta: Cta,
  ticker_band: TickerBand,
};

// Same order as the current site and the design handoff's own composer —
// used for the first paint (no flash of blank homepage) and as a fallback
// if the CMS order table is ever empty/unreachable, so admin-configurable
// ordering can never take the homepage down.
const DEFAULT_ORDER = [
  "hero", "why_shiksha", "teachers_students", "browse_categories",
  "featured_courses", "why_choose", "resources", "collaborate", "faq", "cta",
  // Appended last for the same reason content/0039 appends its
  // HomeSectionOrder row: this fallback must not reshuffle a homepage an
  // admin has already arranged. The band renders null when empty, so its
  // position only matters once there is something in it.
  "ticker_band",
];

export default function ShikshaHome() {
  const [order, setOrder] = useState(DEFAULT_ORDER);

  useEffect(() => {
    let alive = true;
    getHomeSectionOrder().then((rows) => {
      if (!alive) return;
      const sections = (rows || [])
        .map((r) => r.section)
        .filter((section) => SECTION_COMPONENTS[section]);
      if (sections.length) setOrder(sections);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <main>
      {order.map((section) => {
        const Section = SECTION_COMPONENTS[section];
        return Section ? <Section key={section} /> : null;
      })}
    </main>
  );
}
