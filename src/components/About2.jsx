import React, { useEffect, useRef } from "react";
import "../css/ShikshaHome.css";
import "../css/About2.css";
import { FaUsers, FaWrench, FaHome } from "react-icons/fa";
import { GiSprout } from "react-icons/gi";
import { useHomeContent } from "../hooks/useHomeContent";
import { sanitizeInline } from "../utils/sanitizeInline";

import img1 from "../assets/about-us/sticker_5.png";
import img2 from "../assets/about-us/sticker_2.png";
import img3 from "../assets/about-us/sticker_3.png";
import img4 from "../assets/about-us/sticker_4.png";
import img5 from "../assets/about-us/sticker_1.png";
import visionImg from "../assets/meet.jpeg";
import valuesImg from "../assets/studio.jpeg";

/* Every string below is a fallback only — the CMS ("about_hero",
   "about_vision", "about_mission", "about_values", "about_why" home-content
   sections) supplies the live copy the moment rows exist. With an empty CMS
   this file must render exactly what it always has, minus "DONT HACK US !!"
   (see HERO_DEFAULTS.eyebrow). Same "replace-if-present" convention as
   Cta.jsx / WhyChooseShiksha.jsx / Faq.jsx. */

const HERO_DEFAULTS = {
  eyebrow: "Empowerment Through Education",
  heading: "About",
  heading_secondary: "Us",
  subhead:
    "Through innovative technology, our intelligent platform empowers individuals to achieve their full potential and contribute positively to society.",
};

const VISION_DEFAULTS = {
  eyebrow: "Vision",
  heading: "Our",
  heading_secondary: "Vision",
  subhead:
    "At ShikshaCom, our vision is to provide learners with the skills and knowledge they need to thrive in the modern world. We aim to make education accessible, engaging, and effective for everyone, regardless of their background or location.",
  list_label: "Key Initiatives:",
};
const VISION_BULLETS_DEFAULT = [
  "Leveraging technology like online learning platforms, mobile schools, and digital resources to reach students in remote areas.",
  "Enabling individuals in remote areas to acquire knowledge and skills for personal growth.",
  "Supporting learners of all backgrounds, abilities, and learning styles.",
  "Raising awareness of non-traditional and diverse career opportunities.",
  "Bringing the classroom to your doorstep.",
].map((body, i) => ({ id: `d${i}`, body }));

const MISSION_DEFAULTS = {
  eyebrow: "Mission",
  heading: "Our",
  heading_secondary: "Mission",
  subhead:
    "At ShikshaCom, our mission is to deliver high-quality, accessible education using innovative technology and expert guidance. We are committed to empowering learners of all ages and backgrounds to achieve their full potential.",
};
// icon/tint key -> renderer. Unknown keys fall back to the hardcoded pillar
// at the same index (never a blank icon), per the CMS contract.
const PILLAR_ICON_COMPONENTS = { users: FaUsers, wrench: FaWrench, sprout: GiSprout, home: FaHome };
const PILLAR_TINT_VARS = {
  teal: "--teal",
  green: "--green",
  gold: "--gold",
  coral: "--coral",
  "coral-dark": "--coral-dark",
  violet: "--violet",
  blue: "--blue",
  pink: "--pink",
  red: "--red",
};
const PILLARS_DEFAULT = [
  { icon: "users", tint: "teal", title: "Fostering a supportive community" },
  { icon: "wrench", tint: "coral-dark", title: "Leveraging cutting-edge tools" },
  { icon: "sprout", tint: "green", title: "Making education inclusive, effective, and transformative" },
  { icon: "home", tint: "gold", title: "Bridging the gap in educational access between urban and rural settings" },
];

const VALUES_DEFAULTS = {
  eyebrow: "Values",
  heading: "Our",
  heading_secondary: "Value",
  subhead:
    "At ShikshaCom, our values are the foundation of everything we do. These values guide our decisions and inspire our team to create a positive impact in the world of education.",
  list_label: "Our Core Values:",
  list_label_secondary: "Digital Mode of Learning:",
};
const VALUES_CORE_DEFAULT = [
  { title: "Commitment to Excellence:", body: "Ensures we deliver the highest quality education." },
  { title: "Quality:", body: "In our content and services empowers learners to succeed." },
  { title: "Inclusivity:", body: "Welcomes and supports learners from all backgrounds." },
  { title: "Innovation:", body: "Drives us to continuously improve and adapt." },
].map((v, i) => ({ id: `d${i}`, ...v }));
const VALUES_DIGITAL_DEFAULT = [
  "Aims to enhance teaching and learning through technology integration.",
  "Mobile schools bring education directly to remote communities.",
  "Highly interactive platforms for accessible digital education.",
].map((body, i) => ({ id: `d${i}`, body }));

const WHY_DEFAULTS = {
  eyebrow: "Why Us",
  heading: "Why Choose",
  heading_secondary: "ShikshaCom?",
  subhead:
    "At ShikshaCom, we offer a unique learning experience designed to meet the needs of modern learners. Choose ShikshaCom for education that is effective, enjoyable, and accessible from anywhere.",
};
const WHY_DEFAULT = [
  { title: "Interactive Courses", body: "Engage students with multimedia content, quizzes, and real-world projects." },
  { title: "Live Classes", body: "Direct interaction with expert instructors, fostering a supportive learning environment." },
  { title: "Personalized Dashboards", body: "Track your progress and get content tailored to your learning pace and goals." },
  { title: "Vibrant Community", body: "Connect with peers, share knowledge, and grow together in a thriving forum." },
].map((v, i) => ({ id: `d${i}`, ...v }));

// Split heading, coral-accented on the secondary half — same two-part
// pattern as home/Hero.jsx and home/Faq.jsx.
function SplitHeading({ as: Tag = "h2", heading, secondary }) {
  return (
    <Tag>
      {heading}
      {secondary ? <> <span className="em">{secondary}</span></> : null}
    </Tag>
  );
}

// CMS `body` fields are server-sanitized HTML and must render as HTML;
// plain-text fallbacks must NOT go through dangerouslySetInnerHTML — same
// branch as home/Faq.jsx's item.html check.
function RichBody({ as: Tag = "span", html, children, ...rest }) {
  return html
    ? <Tag {...rest} dangerouslySetInnerHTML={{ __html: sanitizeInline(children) }} />
    : <Tag {...rest}>{children}</Tag>;
}

const About2 = () => {
  const rootRef = useRef(null);

  const hero = useHomeContent("about_hero");
  const vision = useHomeContent("about_vision");
  const mission = useHomeContent("about_mission");
  const values = useHomeContent("about_values");
  const why = useHomeContent("about_why");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    // No IntersectionObserver (or an environment that never fires it) must
    // not leave the whole page at opacity:0 — same guard as home/Faq.jsx.
    if (typeof IntersectionObserver === "undefined") {
      root.querySelectorAll(".rv").forEach((el) => el.classList.add("in"));
      return undefined;
    }

    // Same imperative reveal-on-scroll used by Cta.jsx / WhyChooseShiksha.jsx
    // / TeachersStudents.jsx etc.: every .rv on this page has a static
    // className (nothing here re-renders className from other state the way
    // Faq's open/closed cards do), so classList.add("in") is safe and this
    // page doesn't need Faq's React-state workaround.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    root.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // ── Hero ──
  const heroEyebrow = hero.block?.eyebrow || HERO_DEFAULTS.eyebrow;
  const heroHeading = hero.block?.heading || HERO_DEFAULTS.heading;
  const heroHeadingSecondary = hero.block?.heading_secondary || HERO_DEFAULTS.heading_secondary;
  const heroSubhead = hero.block?.subhead || HERO_DEFAULTS.subhead;

  // ── Vision ──
  const visionEyebrow = vision.block?.eyebrow || VISION_DEFAULTS.eyebrow;
  const visionHeading = vision.block?.heading || VISION_DEFAULTS.heading;
  const visionHeadingSecondary = vision.block?.heading_secondary || VISION_DEFAULTS.heading_secondary;
  const visionSubhead = vision.block?.subhead || VISION_DEFAULTS.subhead;
  const visionListLabel = vision.block?.extra?.list_label || VISION_DEFAULTS.list_label;
  const visionCmsBullets = vision.items.filter((i) => i.variant === "default");
  const visionUsingCms = visionCmsBullets.length > 0;
  const visionBullets = visionUsingCms ? visionCmsBullets : VISION_BULLETS_DEFAULT;

  // ── Mission ──
  const missionEyebrow = mission.block?.eyebrow || MISSION_DEFAULTS.eyebrow;
  const missionHeading = mission.block?.heading || MISSION_DEFAULTS.heading;
  const missionHeadingSecondary = mission.block?.heading_secondary || MISSION_DEFAULTS.heading_secondary;
  const missionSubhead = mission.block?.subhead || MISSION_DEFAULTS.subhead;
  const missionCmsPillars = mission.items.filter((i) => i.variant === "pillar");
  const pillars = missionCmsPillars.length > 0 ? missionCmsPillars : PILLARS_DEFAULT;

  // ── Values ──
  const valuesEyebrow = values.block?.eyebrow || VALUES_DEFAULTS.eyebrow;
  const valuesHeading = values.block?.heading || VALUES_DEFAULTS.heading;
  const valuesHeadingSecondary = values.block?.heading_secondary || VALUES_DEFAULTS.heading_secondary;
  const valuesSubhead = values.block?.subhead || VALUES_DEFAULTS.subhead;
  const valuesListLabel = values.block?.extra?.list_label || VALUES_DEFAULTS.list_label;
  const valuesListLabelSecondary = values.block?.extra?.list_label_secondary || VALUES_DEFAULTS.list_label_secondary;
  const valuesCmsCore = values.items.filter((i) => i.variant === "default");
  const valuesUsingCms = valuesCmsCore.length > 0;
  const valuesCore = valuesUsingCms ? valuesCmsCore : VALUES_CORE_DEFAULT;
  const valuesCmsDigital = values.items.filter((i) => i.variant === "bullet");
  const valuesDigitalUsingCms = valuesCmsDigital.length > 0;
  const valuesDigital = valuesDigitalUsingCms ? valuesCmsDigital : VALUES_DIGITAL_DEFAULT;

  // ── Why ──
  const whyEyebrow = why.block?.eyebrow || WHY_DEFAULTS.eyebrow;
  const whyHeading = why.block?.heading || WHY_DEFAULTS.heading;
  const whyHeadingSecondary = why.block?.heading_secondary || WHY_DEFAULTS.heading_secondary;
  const whySubhead = why.block?.subhead || WHY_DEFAULTS.subhead;
  const whyCms = why.items.filter((i) => i.variant === "numbered");
  const whyUsingCms = whyCms.length > 0;
  const whyCards = whyUsingCms ? whyCms : WHY_DEFAULT;

  return (
    <div className="about-page" ref={rootRef}>

      {/* ── 1. About Us ── */}
      <section id="about-us" className="sec">
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><u>{heroEyebrow}</u></span>
            <SplitHeading as="h1" heading={heroHeading} secondary={heroHeadingSecondary} />
            <p>{heroSubhead}</p>
          </div>
          <div className="ap-img-row rv">
            {[img1, img2, img3, img4, img5].map((img, i) => (
              <div className="ap-img-wrap" key={i} style={{ "--i": i }}>
                <img src={img} alt={`classroom ${i + 1}`} />
                <div className="ap-img-overlay"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Our Vision ── */}
      <section id="vision" className="sec peach">
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><u>{visionEyebrow}</u></span>
            <SplitHeading heading={visionHeading} secondary={visionHeadingSecondary} />
          </div>
          <div className="ap-card ap-row rv">
            <div className="ap-card-text">
              <p>{visionSubhead}</p>
              <p className="ap-label">{visionListLabel}</p>
              <ul className="ap-list">
                {visionBullets.map((item) => (
                  <RichBody as="li" key={item.id} html={visionUsingCms}>{item.body}</RichBody>
                ))}
              </ul>
            </div>
            <div className="ap-card-img">
              <img src={visionImg} alt="Vision" />
              <div className="ap-img-shine"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Our Mission ── */}
      <section id="mission" className="sec">
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><u>{missionEyebrow}</u></span>
            <SplitHeading heading={missionHeading} secondary={missionHeadingSecondary} />
            <p>{missionSubhead}</p>
          </div>
          <div className="ap-pillars">
            {pillars.map((p, i) => {
              const fallback = PILLARS_DEFAULT[i % PILLARS_DEFAULT.length];
              const IconComp = PILLAR_ICON_COMPONENTS[p.icon] || PILLAR_ICON_COMPONENTS[fallback.icon];
              const tintVar = PILLAR_TINT_VARS[p.tint] || PILLAR_TINT_VARS[fallback.tint];
              const label = p.title || fallback.title;
              return (
                <div
                  className="ap-pillar rv"
                  key={p.id ?? i}
                  style={{ "--delay": `${i * 100}ms` }}
                >
                  <div className="ap-circle" style={{ "--tint": `var(${tintVar})` }}>
                    <IconComp />
                  </div>
                  <p className="ap-pillar-label">{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Our Value ── */}
      <section id="values" className="sec peach">
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><u>{valuesEyebrow}</u></span>
            <SplitHeading heading={valuesHeading} secondary={valuesHeadingSecondary} />
          </div>
          <div className="ap-card ap-row ap-row-reverse rv">
            <div className="ap-card-img">
              <img src={valuesImg} alt="Values" />
              <div className="ap-img-shine"></div>
            </div>
            <div className="ap-card-text">
              <p>{valuesSubhead}</p>
              <p className="ap-label">{valuesListLabel}</p>
              <ul className="ap-list">
                {valuesCore.map((item) => (
                  <li key={item.id}>
                    <strong>{item.title}</strong>{" "}
                    <RichBody html={valuesUsingCms}>{item.body}</RichBody>
                  </li>
                ))}
              </ul>
              <p className="ap-label">{valuesListLabelSecondary}</p>
              <ul className="ap-list">
                {valuesDigital.map((item) => (
                  <RichBody as="li" key={item.id} html={valuesDigitalUsingCms}>{item.body}</RichBody>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Why Choose ShikshaCom? ── */}
      <section id="why-shiksha" className="sec">
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><u>{whyEyebrow}</u></span>
            <SplitHeading heading={whyHeading} secondary={whyHeadingSecondary} />
            <p>{whySubhead}</p>
          </div>
          <div className="ap-why-cards">
            {whyCards.map((f, i) => (
              <div
                className="ap-why-card rv"
                key={f.id ?? i}
                style={{ "--delay": `${i * 90}ms` }}
              >
                <span className="ap-why-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="ap-why-title">{f.title}</h3>
                <RichBody as="p" className="ap-why-desc" html={whyUsingCms}>{f.body}</RichBody>
                <div className="ap-why-line"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About2;
