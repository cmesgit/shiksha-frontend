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
  // Requested running order: hero → who it's for → live collaboration →
  // what's on offer (featured, then categories) → support → why us → faq → cta.
  //
  // why_shiksha sits next to why_choose on purpose. They are two separate CMS
  // sections that both answer "why ShikshaCom" ("Why learners choose Shiksha"
  // and "Why choose ShikshaCom?"), and splitting them across the page read as
  // the same pitch twice. Adjacent, they read as one block — and either can be
  // hidden outright with its HomeSectionOrder.is_visible toggle in the admin
  // page editor without touching this list.
  "hero", "teachers_students", "collaborate", "featured_courses",
  "browse_categories", "resources", "why_choose", "why_shiksha", "faq", "cta",
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
