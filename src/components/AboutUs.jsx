import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/AboutUs.css";
import { useHomeContent } from "../hooks/useHomeContent";
import { sanitizeInline } from "../utils/sanitizeInline";
import { EcoIllustration, VisionScene, ValueScene } from "./about/aboutArt";
import { ICONS, icon } from "./about/aboutIcons";

/**
 * ShikshaCom — About Us.
 *
 * The design handoff ("About Us Updated Page Demo.html" and its AboutUs.jsx
 * port) shipped as a standalone, fully hardcoded page. This is that design
 * wired onto the same five CMS sections the page it replaces already used:
 *
 *   about_hero · about_vision · about_mission · about_values · about_why
 *
 * Those sections have live rows in production, so dropping the handoff in
 * as-is would have silently ended About-page editing for admins. Every string
 * and list below therefore follows the house "replace-if-present" convention —
 * the hardcoded value is the fallback, the CMS wins the moment a row exists.
 *
 * ⚠ The production rows currently hold the PREVIOUS page's copy ("About" /
 * "Us", "Our" / "Vision", …), not this design's. Until they are updated —
 * `manage.py seed_about_v2_copy` in shiksha-backend does exactly that — this
 * page renders the new layout with the old words. That is the wiring working
 * correctly, not a bug.
 *
 * What the handoff had that the CMS cannot yet drive, deliberately:
 *   · the closing CTA band — there is no `about_cta` section, and inventing one
 *     is a backend change this page should not smuggle in. Hardcoded.
 *   · the hero's five ecosystem node labels — `about_hero`'s five sticker rows
 *     carry an image and nothing else, and this design has no image slot for
 *     them. Editable only once those rows are given titles.
 *   · `about_values`' three `bullet` rows ("Digital Mode of Learning") — this
 *     design has no section for them. They are not rendered anywhere.
 */

/* ==========================================================================
   Fallback copy — the design handoff's own words, verbatim.
   ========================================================================== */

const HERO_DEFAULTS = {
  badge: "About ShikshaCom",
  heading: "Building better learning\nfor",
  heading_secondary: "every student.",
  subhead:
    "Through innovative technology, our intelligent platform empowers individuals to achieve their full potential and contribute positively to society — bringing structured, accessible education within reach of every learner.",
  cta_primary_label: "Why choose us",
  cta_primary_href: "#ap-why",
  cta_secondary_label: "Our vision",
  cta_secondary_href: "#ap-vision",
};

/* The hero's floating concept cards. `glyph` indexes into ICONS. */
const HERO_NODES_DEFAULT = [
  { glyph: "book", title: "Knowledge", subtitle: "Structured content", grad: "linear-gradient(135deg,#12b47a,#0B5B3E)" },
  { glyph: "people", title: "Learners", subtitle: "Every background", grad: "linear-gradient(135deg,#7C5CFC,#12b3a6)" },
  { glyph: "target", title: "Goals", subtitle: "Real outcomes", grad: "linear-gradient(135deg,#F59E0B,#E14D2A)" },
  { glyph: "bulb", title: "Ideas", subtitle: "Curiosity first", grad: "linear-gradient(135deg,#FFB21D,#F59E0B)" },
  { glyph: "monitor", title: "Online", subtitle: "Learn anywhere", grad: "linear-gradient(135deg,#3b82f6,#1d4ed8)" },
];

const VISION_DEFAULTS = {
  eyebrow: "Our Vision",
  heading: "A future where learning\nreaches",
  heading_secondary: "everyone.",
  subhead:
    "At ShikshaCom, our vision is to provide learners with the skills and knowledge they need to thrive in the modern world. We aim to make education accessible, engaging, and effective for everyone, regardless of their background or location.",
  list_label: "Five ways we get there — scroll to explore ↓",
  init_label: "Key initiatives",
  init_heading: "How we're making it happen",
  init_subhead: "Five commitments that turn our vision into everyday reality.",
};

/* The scroll-stacking initiative cards. `c` tints the numeral and icon, `soft`
   fills the card — both are set as inline custom properties the stylesheet
   reads, exactly as the handoff did. */
const INITIATIVES_DEFAULT = [
  { glyph: "init1", c: "#0F9D6B", soft: "#ECF7F1", title: "Technology-led learning", body: "Leveraging technology like online learning platforms, mobile schools, and digital resources to reach students in remote areas." },
  { glyph: "init2", c: "#6D4EF0", soft: "#F1EEFE", title: "Knowledge for remote areas", body: "Enabling individuals in remote areas to acquire knowledge and skills for personal growth." },
  { glyph: "init3", c: "#2F6FE0", soft: "#EAF2FE", title: "Learning for everyone", body: "Supporting learners of all backgrounds, abilities, and learning styles." },
  { glyph: "init4", c: "#C77E09", soft: "#FDF4E3", title: "Career awareness", body: "Raising awareness of non-traditional and diverse career opportunities." },
  { glyph: "init5", c: "#0E9C90", soft: "#E7F6F4", title: "Classroom at your doorstep", body: "Bringing the classroom to your doorstep." },
];

const MISSION_DEFAULTS = {
  eyebrow: "Our Mission",
  heading: "What drives",
  heading_secondary: "everything we do",
  subhead:
    "At ShikshaCom, our mission is to deliver high-quality, accessible education using innovative technology and expert guidance. We are committed to empowering learners of all ages and backgrounds to achieve their full potential.",
};

/* The rotating stacked cards. `glyph` keys match the `icon` values already
   stored on the four live about_mission pillar rows. */
const MISSION_CARDS_DEFAULT = [
  { glyph: "users", grad: "linear-gradient(135deg,#12b47a 0%,#0B5B3E 100%)", tint: "#EAF6F0", ghost: "#0B5B3E", title: "Fostering a supportive community", body: "Bringing learners and mentors together so no one has to study alone." },
  { glyph: "wrench", grad: "linear-gradient(135deg,#7C5CFC 0%,#5b3fd6 100%)", tint: "#EFEBFD", ghost: "#7C5CFC", title: "Leveraging cutting-edge tools", body: "Modern learning technology that makes lessons clearer and more engaging." },
  { glyph: "sprout", grad: "linear-gradient(135deg,#3b82f6 0%,#1d4ed8 100%)", tint: "#EAF1FD", ghost: "#3b82f6", title: "Making education inclusive, effective, and transformative", body: "Learning that works for real students and changes what's possible for them." },
  { glyph: "home", grad: "linear-gradient(135deg,#FFB21D 0%,#E14D2A 100%)", tint: "#FDF3E4", ghost: "#E14D2A", title: "Bridging the gap in educational access between urban and rural settings", body: "Closing the distance so where you live no longer limits how you learn." },
];

const VALUES_DEFAULTS = {
  eyebrow: "Our Value",
  heading: "What we believe shapes",
  heading_secondary: "how we teach.",
  subhead:
    "At ShikshaCom, our values are the foundation of everything we do. These values guide our decisions and inspire our team to create a positive impact in the world of education.",
  list_label: "Our core values",
  chip: "Learning in Action",
};

const VALUES_DEFAULT = [
  { glyph: "medal", nb: "linear-gradient(135deg,#FFB21D 0%,#E14D2A 100%)", title: "Commitment to Excellence", body: "Ensures we deliver the highest quality education." },
  { glyph: "value2", nb: "linear-gradient(135deg,#3b82f6 0%,#1d4ed8 100%)", title: "Quality", body: "In our content and services empowers learners to succeed." },
  { glyph: "value3", nb: "linear-gradient(135deg,#22D3A6 0%,#0EA37E 100%)", title: "Inclusivity", body: "Welcomes and supports learners from all backgrounds." },
  { glyph: "value4", nb: "linear-gradient(135deg,#7C5CFC 0%,#5b3fd6 100%)", title: "Innovation", body: "Drives us to continuously improve and adapt." },
];

const WHY_DEFAULTS = {
  eyebrow: "Why ShikshaCom",
  heading: "Why choose",
  heading_secondary: "ShikshaCom?",
  subhead:
    "At ShikshaCom, we offer a unique learning experience designed to meet the needs of modern learners. Choose ShikshaCom for education that is effective, enjoyable, and accessible from anywhere.",
};

const WHY_CARDS_DEFAULT = [
  { glyph: "layers", grad: "linear-gradient(135deg,#12b47a 0%,#0B5B3E 100%)", title: "Interactive Courses", body: "Engage students with multimedia content, quizzes, and real-world projects." },
  { glyph: "video", grad: "linear-gradient(135deg,#F59E0B 0%,#E14D2A 100%)", title: "Live Classes", body: "Direct interaction with expert instructors, fostering a supportive learning environment." },
  { glyph: "gauge", grad: "linear-gradient(135deg,#7C5CFC 0%,#12b3a6 100%)", title: "Personalized Dashboards", body: "Track your progress and get content tailored to your learning pace and goals." },
  { glyph: "chat", grad: "linear-gradient(135deg,#3b82f6 0%,#1d4ed8 100%)", title: "Vibrant Community", body: "Connect with peers, share knowledge, and grow together in a thriving forum." },
];

/* No CMS section exists for the closing band — see the file header. */
const CTA_DEFAULTS = {
  eyebrow: "Join ShikshaCom",
  heading: "Ready to learn with ShikshaCom?",
  subhead:
    "Explore our courses and find the learning path that fits you — accessible, engaging and built for how you learn.",
  primary: { label: "Explore courses", to: "/courses" },
  secondary: { label: "Create free account", to: "/signup" },
};

/* Repeated decoration, identical on every card in its group — hoisted so the
   same path data is not written out five times. */
const ScardGhost = () => (
  <span className="ap-scard__ghost" aria-hidden="true"><svg viewBox="0 0 200 200" fill="none"><circle cx="150" cy="152" r="60" fill="currentColor" opacity=".12"/><circle cx="112" cy="128" r="60" stroke="currentColor" strokeWidth="2" opacity=".2"/></svg></span>
);
const MissionGhost = ({ tr }) => (
  <span className={tr ? "ap-ghost tr" : "ap-ghost"} aria-hidden="true"><svg viewBox="0 0 200 200" fill="none"><circle cx="148" cy="152" r="66" fill="currentColor" opacity=".10"/><circle cx="148" cy="152" r="66" stroke="currentColor" strokeWidth="1.5" opacity=".16"/><circle cx="86" cy="128" r="30" stroke="currentColor" strokeWidth="1.5" opacity=".13"/><circle cx="172" cy="92" r="11" fill="currentColor" opacity=".14"/></svg></span>
);

/* ==========================================================================
   CMS helpers
   ========================================================================== */

/* The handoff hard-codes a <br> inside three of its headings, which is a real
   design decision — "Building better learning / for every student." reads
   differently as one run-on line. A CMS string cannot carry markup, so a
   newline in the field is the break. Editors get the same control; a heading
   with no newline simply wraps naturally. */
function withBreaks(text) {
  const parts = String(text ?? "").split("\n");
  return parts.map((part, i) => (
    i === 0 ? part : <span key={i}><br />{part}</span>
  ));
}

/* CMS `body` fields are server-sanitized inline HTML and must render as HTML;
   the plain-text fallbacks must NOT go through dangerouslySetInnerHTML. Same
   branch About2.jsx and home/Faq.jsx use. */
function RichText({ as: Tag = "p", html, children, ...rest }) {
  return html
    ? <Tag {...rest} dangerouslySetInnerHTML={{ __html: sanitizeInline(html) }} />
    : <Tag {...rest}>{children}</Tag>;
}

/* Merge one CMS row over its same-index hardcoded card.
 *
 * Per-field rather than whole-row on purpose. The live rows are partially
 * filled — about_vision's five items carry a `body` and no `title`,
 * about_mission's four carry a `title` and no `body` — so replacing the whole
 * row would blank out whatever the editor left empty. About2.jsx documented
 * the same rule for its pillar icons: an unknown key falls back to the
 * hardcoded value at that index, never to nothing. */
function mergeRow(row, fallback) {
  return {
    ...fallback,
    ...(row.title ? { title: row.title } : null),
    ...(row.body ? { body: row.body, bodyIsHtml: true } : null),
    ...(row.subtitle ? { subtitle: row.subtitle } : null),
    glyph: (row.icon && ICONS[row.icon]) ? row.icon : fallback.glyph,
    key: row.id,
  };
}

/* Whole-list replace-if-present, then per-row merge. A CMS list shorter than
   the design's is honoured as-is (four initiative cards if an editor deleted
   one); rows beyond the design's length merge onto the last card's styling so
   a sixth card still gets a colour rather than rendering unstyled. */
function mergeList(rows, defaults) {
  if (!rows.length) return defaults.map((d, i) => ({ ...d, key: `d${i}` }));
  return rows.map((row, i) => mergeRow(row, defaults[i] || defaults[defaults.length - 1]));
}

/* ==========================================================================
   Behaviour 1 · reveal-on-scroll
   ========================================================================== */
function useRevealOnScroll(rootRef, deps) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const items = Array.from(root.querySelectorAll(".ap-rv"));
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return undefined;
    }

    /* Two departures from the handoff, both forced by the CMS:
       1. It called io.unobserve() on first reveal. Safe on a static page,
          not here — five fetches resolve after mount, each re-render
          re-applies className="ap-rv" and drops the imperative .in that
          React never knew about. An element revealed AND unobserved before
          that lands would be stranded at opacity:0 forever. This is the
          exact bug fixed once already on the page this replaces.
       2. Its deps were [rootRef], so it ran once, before any CMS row
          existed. Re-running on the fetched content re-observes nodes that
          did not exist on the first pass. classList.add is idempotent, so
          re-observing an already-revealed element costs nothing. */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/* ==========================================================================
   Behaviour 2 · header offset
   ==========================================================================
   The handoff pinned its sticky cards 94px from the top of a bare document.
   Here the page sits under a position:fixed Navbar whose height is 78px, or
   118px with the announcement bar showing, or 72/112px below 640px.

   SiteNav.css does publish a `--skn-header-h`, but it is a hardcoded
   :root{82px} that never moves, so it is wrong by 40px in precisely the case
   that breaks the layout. Measuring the live spacer is the only honest
   number. AboutUs.css reads the result as --ap-header-h. */
function useHeaderOffset(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const spacer = document.querySelector(".skn-spacer");
    if (!spacer) return undefined;

    const apply = () => {
      const h = Math.round(spacer.getBoundingClientRect().height);
      if (h > 0) root.style.setProperty("--ap-header-h", `${h}px`);
    };
    apply();

    /* The spacer changes height when the announcement bar is dismissed and at
       the 640px breakpoint — both resize it rather than remount it. */
    if (!("ResizeObserver" in window)) {
      window.addEventListener("resize", apply, { passive: true });
      return () => window.removeEventListener("resize", apply);
    }
    const ro = new ResizeObserver(apply);
    ro.observe(spacer);
    return () => ro.disconnect();
  }, [rootRef]);
}

/* ==========================================================================
   Behaviour 3 · Mission — auto-rotating stacked cards
   ========================================================================== */
/* fanned layout for each depth position (0 = front) */
const CARD_LAYOUTS = [
  { x: 0, y: 0, r: 0, s: 1, z: 40 },
  { x: 16, y: 14, r: 6, s: 0.94, z: 30 },
  { x: -14, y: 26, r: -7, s: 0.89, z: 20 },
  { x: 10, y: 36, r: 9, s: 0.85, z: 10 },
];

function useMissionCarousel(rootRef, cardKeys) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const stack = root.querySelector("#ap-mstack");
    if (!stack) return undefined;

    const cards = Array.from(stack.querySelectorAll(".ap-card"));
    const n = cards.length;
    if (!n) return undefined;

    const dots = Array.from(root.querySelectorAll(".ap-mdot"));
    const buttons = Array.from(root.querySelectorAll(".ap-mbtn"));
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let active = 0;
    let timer = null;

    const render = () => {
      cards.forEach((c, i) => {
        const pos = (i - active + n) % n;
        const L = CARD_LAYOUTS[Math.min(pos, CARD_LAYOUTS.length - 1)];
        c.style.transform = `translate(${L.x}px,${L.y}px) rotate(${L.r}deg) scale(${L.s})`;
        c.style.zIndex = L.z;
        c.style.opacity = pos < CARD_LAYOUTS.length ? "1" : "0";
        c.style.pointerEvents = pos === 0 ? "auto" : "none";
        c.setAttribute("aria-hidden", pos === 0 ? "false" : "true");
      });
      dots.forEach((d, idx) => d.classList.toggle("on", idx === active));
    };

    const go = (dir) => {
      active = (active + dir + n) % n;
      render();
    };

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
    const start = () => {
      if (reduce) return;
      stop();
      timer = setInterval(() => go(1), 3200);
    };
    const restart = () => {
      stop();
      start();
    };

    render();

    const onButton = (e) => {
      const btn = e.currentTarget;
      go(btn.getAttribute("data-dir") === "prev" ? -1 : 1);
      restart();
    };
    const onDot = (e) => {
      active = parseInt(e.currentTarget.getAttribute("data-i"), 10) || 0;
      render();
      restart();
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    buttons.forEach((b) => b.addEventListener("click", onButton));
    dots.forEach((d) => d.addEventListener("click", onDot));

    /* pause while the viewer is reading, resume after */
    stack.addEventListener("mouseenter", stop);
    stack.addEventListener("mouseleave", start);
    document.addEventListener("visibilitychange", onVisibility);

    start();

    return () => {
      stop();
      buttons.forEach((b) => b.removeEventListener("click", onButton));
      dots.forEach((d) => d.removeEventListener("click", onDot));
      stack.removeEventListener("mouseenter", stop);
      stack.removeEventListener("mouseleave", start);
      document.removeEventListener("visibilitychange", onVisibility);
    };
    /* cardKeys, not cardCount and not [rootRef].

       Counting was not enough and shipped broken. The fallback list and the CMS
       list are both 4 long, so a count dep never changes — but each card's React
       key goes from "d0".."d3" to the CMS row id when the fetch lands, and a
       changed key makes React destroy and recreate the element. This effect had
       already bound to the originals, so it spent the rest of the page's life
       driving four detached nodes: no transforms, no fan, all four cards stacked
       at the same coordinates with every title overlapping.

       Keying on identity re-runs the effect whenever React swaps the nodes,
       which is exactly when the listeners and transforms need rebinding. */
  }, [rootRef, cardKeys]);
}

/* ==========================================================================
   Behaviour 4 · scroll-stacking initiative cards (parallax depth: scale + dim)
   ========================================================================== */
function useInitiativeParallax(rootRef, cardKeys) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const cards = Array.from(root.querySelectorAll(".ap-scard"));
    if (!cards.length) return undefined;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      root.classList.add("ap-noparallax");
      return undefined;
    }

    let ticking = false;

    const update = () => {
      ticking = false;
      for (let i = 0; i < cards.length - 1; i++) {
        const card = cards[i];
        const next = cards[i + 1];
        const cTop = card.getBoundingClientRect().top;
        const nTop = next.getBoundingClientRect().top;
        const full = card.offsetHeight || 1;
        /* p: 0 when the next card is far below, →1 as it rises up to cover this one */
        const p = 1 - Math.min(Math.max((nTop - cTop) / full, 0), 1);
        const scale = 1 - p * 0.07; /* buried cards shrink to ~0.93 */
        const ty = -(p * 12); /* and drift up a touch */
        card.style.transform = `translateY(${ty.toFixed(2)}px) scale(${scale.toFixed(4)})`;
        card.style.opacity = (1 - p * 0.22).toFixed(3);
      }
      const last = cards[cards.length - 1];
      last.style.transform = "";
      last.style.opacity = "";
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    /* cardKeys for the same reason as the carousel above: the sticky stacking
       is pure CSS and keeps working, but this effect's scale/dim runs off a
       closure over the node list, so a key change silently left it animating
       five detached cards. */
  }, [rootRef, cardKeys]);
}

/* ==========================================================================
   Component
   ========================================================================== */
export default function AboutUs() {
  const rootRef = useRef(null);

  const hero = useHomeContent("about_hero");
  const vision = useHomeContent("about_vision");
  const mission = useHomeContent("about_mission");
  const values = useHomeContent("about_values");
  const why = useHomeContent("about_why");

  /* ── Hero ── */
  const heroBadge = hero.block?.eyebrow || HERO_DEFAULTS.badge;
  const heroHeading = hero.block?.heading || HERO_DEFAULTS.heading;
  const heroHeadingSecondary = hero.block?.heading_secondary ?? HERO_DEFAULTS.heading_secondary;
  const heroSubhead = hero.block?.subhead || HERO_DEFAULTS.subhead;
  const heroCtaPrimary = {
    label: hero.block?.cta_primary_label || HERO_DEFAULTS.cta_primary_label,
    href: hero.block?.cta_primary_href || HERO_DEFAULTS.cta_primary_href,
  };
  const heroCtaSecondary = {
    label: hero.block?.cta_secondary_label || HERO_DEFAULTS.cta_secondary_label,
    href: hero.block?.cta_secondary_href || HERO_DEFAULTS.cta_secondary_href,
  };
  /* The five sticker rows on production hold an image and nothing else, and
     this design's nodes are icon + label + sublabel with no image slot. So the
     CMS only takes over once someone gives those rows titles — otherwise every
     node would render blank. */
  const heroCmsNodes = hero.items.filter((i) => i.variant === "sticker" && i.title);
  const heroNodes = mergeList(heroCmsNodes, HERO_NODES_DEFAULT);

  /* ── Vision ── */
  const visionEyebrow = vision.block?.eyebrow || VISION_DEFAULTS.eyebrow;
  const visionHeading = vision.block?.heading || VISION_DEFAULTS.heading;
  const visionHeadingSecondary = vision.block?.heading_secondary ?? VISION_DEFAULTS.heading_secondary;
  const visionSubhead = vision.block?.subhead || VISION_DEFAULTS.subhead;
  const visionListLabel = vision.block?.extra?.list_label || VISION_DEFAULTS.list_label;
  /* The handoff marks its inline scene as the swap point for a real photo, and
     HomeContentBlock has carried the field all along. A CMS upload wins. */
  const visionImage = vision.block?.img || null;
  const initiatives = mergeList(
    vision.items.filter((i) => i.variant === "default"),
    INITIATIVES_DEFAULT
  );

  /* ── Mission ── */
  const missionEyebrow = mission.block?.eyebrow || MISSION_DEFAULTS.eyebrow;
  const missionHeading = mission.block?.heading || MISSION_DEFAULTS.heading;
  const missionHeadingSecondary = mission.block?.heading_secondary ?? MISSION_DEFAULTS.heading_secondary;
  const missionSubhead = mission.block?.subhead || MISSION_DEFAULTS.subhead;
  const missionCards = mergeList(
    mission.items.filter((i) => i.variant === "pillar"),
    MISSION_CARDS_DEFAULT
  );

  /* ── Values ── */
  const valuesEyebrow = values.block?.eyebrow || VALUES_DEFAULTS.eyebrow;
  const valuesHeading = values.block?.heading || VALUES_DEFAULTS.heading;
  const valuesHeadingSecondary = values.block?.heading_secondary ?? VALUES_DEFAULTS.heading_secondary;
  const valuesSubhead = values.block?.subhead || VALUES_DEFAULTS.subhead;
  const valuesListLabel = values.block?.extra?.list_label || VALUES_DEFAULTS.list_label;
  const valuesImage = values.block?.img || null;
  const valuesList = mergeList(
    values.items.filter((i) => i.variant === "default"),
    VALUES_DEFAULT
  );

  /* ── Why ── */
  const whyEyebrow = why.block?.eyebrow || WHY_DEFAULTS.eyebrow;
  const whyHeading = why.block?.heading || WHY_DEFAULTS.heading;
  const whyHeadingSecondary = why.block?.heading_secondary ?? WHY_DEFAULTS.heading_secondary;
  const whySubhead = why.block?.subhead || WHY_DEFAULTS.subhead;
  const whyCards = mergeList(
    why.items.filter((i) => i.variant === "numbered"),
    WHY_CARDS_DEFAULT
  );

  useHeaderOffset(rootRef);
  useRevealOnScroll(rootRef, [
    hero.block, vision.block, mission.block, values.block, why.block,
    hero.items, vision.items, mission.items, values.items, why.items,
  ]);
  useMissionCarousel(rootRef, missionCards.map((c) => c.key).join("|"));
  useInitiativeParallax(rootRef, initiatives.map((c) => c.key).join("|"));

  return (
    <main className="about-page" ref={rootRef}>

      {/* ============================ 1 · HERO ============================ */}
      <section className="ap-hero">
        <div className="ap-wrap">
          <div className="ap-hero-grid">

            <div className="ap-hero-copy ap-rv">
              <span className="ap-badge"><i></i>{heroBadge}</span>
              <h1>
                {withBreaks(heroHeading)}
                {heroHeadingSecondary ? <> <span className="ap-em">{heroHeadingSecondary}</span></> : null}
              </h1>
              <RichText className="ap-hero-sub" html={hero.block?.body}>{heroSubhead}</RichText>
              <div className="ap-hero-cta">
                <a className="ap-btn ap-btn--solid" href={heroCtaPrimary.href}>{heroCtaPrimary.label}
                  {ICONS.arrow}</a>
                <a className="ap-btn ap-btn--ghost" href={heroCtaSecondary.href}>{heroCtaSecondary.label}
                  {ICONS.eye}</a>
              </div>
            </div>

            {/* learning ecosystem — the five concepts as floating cards */}
            <div className="ap-eco ap-rv ap-d2" aria-hidden="true">
              <span className="ap-spark s1"></span>
              <span className="ap-spark s2"></span>
              <span className="ap-spark s3"></span>

              <div className="ap-eco-disc">
                <div className="ap-eco-core">
                  <EcoIllustration />
                </div>
              </div>

              {heroNodes.slice(0, 5).map((node, i) => (
                <div className={`ap-node n${i + 1}`} key={node.key}>
                  <span className="ap-node-ic" style={{ background: node.grad }}>
                    {icon(node.glyph, ICONS.book)}
                  </span>
                  <div><b>{node.title}</b><span>{node.subtitle}</span></div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ============================ 2 · OUR VISION ============================ */}
      <section className="ap-sec ap-soft" id="ap-vision">
        <span className="ap-dots"></span>
        <div className="ap-wrap">
          <div className="ap-split">

            <div className="ap-copy ap-rv">
              <span className="ap-eyebrow"><u>{visionEyebrow}</u></span>
              <h2>
                {withBreaks(visionHeading)}
                {visionHeadingSecondary ? <> <span className="ap-em">{visionHeadingSecondary}</span></> : null}
              </h2>
              <RichText html={vision.block?.body}>{visionSubhead}</RichText>
              <span className="ap-sublabel">{visionListLabel}</span>
            </div>

            <div className="ap-media ap-rv ap-d2">
              <span className="ap-media__shape"></span>
              <div className="ap-media__frame">
                {visionImage
                  ? <img className="ap-media__scene" src={visionImage} alt="" />
                  : <VisionScene />}
              </div>
              <div className="ap-chip tl">
                <span className="ap-chip-ic" style={{ background: 'var(--ap-emerald)' }}>{ICONS.shield}</span>
                Classroom to your doorstep
              </div>
              <div className="ap-chip br">
                <span className="ap-dot"></span>Reaching remote areas
              </div>
            </div>

          </div>

          {/* KEY INITIATIVES — scroll-stacking swipe cards */}
          <div className="ap-initiatives">
            <div className="ap-init-head ap-rv">
              <span className="ap-sublabel">{VISION_DEFAULTS.init_label}</span>
              <h3>{VISION_DEFAULTS.init_heading}</h3>
              <p>{VISION_DEFAULTS.init_subhead}</p>
            </div>

            <div className="ap-stack">
              {initiatives.map((card, i) => (
                <article
                  className="ap-scard"
                  key={card.key}
                  style={{ '--i': String(i), '--c': card.c, '--soft': card.soft }}
                >
                  <span className="ap-scard__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <ScardGhost />
                  <span className="ap-scard__ic">{icon(card.glyph, ICONS.init1)}</span>
                  <span className="ap-scard__k">{card.subtitle || `Initiative ${String(i + 1).padStart(2, "0")}`}</span>
                  <h4>{card.title}</h4>
                  <RichText html={card.bodyIsHtml ? card.body : null}>{card.body}</RichText>
                </article>
              ))}
            </div>

            <div className="ap-stack-hint" aria-hidden="true">
              Scroll to stack
              {ICONS.caretDown}
            </div>
          </div>

        </div>
      </section>

      {/* ============================ 3 · OUR MISSION ============================ */}
      <section className="ap-sec" id="ap-mission">
        <div className="ap-wrap">
          <div className="ap-mission-split">

            {/* LEFT: copy */}
            <div className="ap-mission-copy ap-rv">
              <span className="ap-eyebrow"><u>{missionEyebrow}</u></span>
              <h2>
                {withBreaks(missionHeading)}
                {missionHeadingSecondary ? <> <span className="ap-em">{missionHeadingSecondary}</span></> : null}
              </h2>
              <RichText html={mission.block?.body}>{missionSubhead}</RichText>
            </div>

            {/* RIGHT: rotating stacked cards */}
            <div className="ap-mission-stage ap-rv ap-d1">
              <div className="ap-mstack" id="ap-mstack" aria-roledescription="carousel">
                {missionCards.map((card) => (
                  <article
                    className="ap-card"
                    key={card.key}
                    style={{ '--grad': card.grad, '--tint': card.tint, '--ghost': card.ghost }}
                  >
                    <MissionGhost tr />
                    <MissionGhost />
                    <span className="ap-card-ic">{icon(card.glyph, ICONS.users)}</span>
                    <h3>{card.title}</h3>
                    <RichText html={card.bodyIsHtml ? card.body : null}>{card.body}</RichText>
                  </article>
                ))}
              </div>

              <div className="ap-mnav">
                <button className="ap-mbtn" type="button" data-dir="prev" aria-label="Previous card">
                  {ICONS.caretLeft}
                </button>
                <div className="ap-mdots" id="ap-mdots" aria-hidden="true">
                  {missionCards.map((card, i) => (
                    <button
                      className={i === 0 ? "ap-mdot on" : "ap-mdot"}
                      key={card.key}
                      type="button"
                      data-i={i}
                      aria-label={`Go to card ${i + 1}`}
                    ></button>
                  ))}
                </div>
                <button className="ap-mbtn" type="button" data-dir="next" aria-label="Next card">
                  {ICONS.caretRight}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================ 4 · OUR VALUE ============================ */}
      <section className="ap-sec ap-emerald-band" id="ap-value">
        <div className="ap-wrap">
          <div className="ap-split rev">

            <div className="ap-media on-dark ap-rv">
              <span className="ap-media__shape tl"></span>
              <div className="ap-media__frame">
                {valuesImage
                  ? <img className="ap-media__scene" src={valuesImage} alt="" />
                  : <ValueScene />}
              </div>
              <div className="ap-chip br">
                <span className="ap-chip-ic" style={{ background: 'var(--ap-emerald)' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></span>
                {VALUES_DEFAULTS.chip}
              </div>
            </div>

            <div className="ap-copy ap-rv ap-d2">
              <span className="ap-eyebrow"><u>{valuesEyebrow}</u></span>
              <h2>
                {withBreaks(valuesHeading)}
                {valuesHeadingSecondary ? <><br /><span className="ap-mark">{valuesHeadingSecondary}</span></> : null}
              </h2>
              <RichText html={values.block?.body}>{valuesSubhead}</RichText>

              <span className="ap-sublabel">{valuesListLabel}</span>
              <ol className="ap-vtl">
                {valuesList.map((item, i) => (
                  <li
                    className={`ap-vtl-item ap-rv${i ? ` ap-d${i}` : ""}`}
                    key={item.key}
                    style={{ '--nb': item.nb }}
                  >
                    <span className="ap-vtl-node">
                      <span className="ap-vtl-step">{i + 1}</span>
                      {icon(item.glyph, ICONS.medal)}
                    </span>
                    <div className="ap-vtl-body">
                      <b>{item.title}</b>
                      <RichText html={item.bodyIsHtml ? item.body : null}>{item.body}</RichText>
                    </div>
                  </li>
                ))}
              </ol>

            </div>

          </div>
        </div>
      </section>

      {/* ======================= 5 · WHY CHOOSE SHIKSHACOM ======================= */}
      <section className="ap-sec ap-soft" id="ap-why">
        <span className="ap-dots"></span>
        <div className="ap-wrap">
          <div className="ap-head ap-rv">
            <span className="ap-eyebrow"><u>{whyEyebrow}</u></span>
            <h2>
              {withBreaks(whyHeading)}
              {whyHeadingSecondary ? <> <span className="ap-em">{whyHeadingSecondary}</span></> : null}
            </h2>
            <RichText html={why.block?.body}>{whySubhead}</RichText>
          </div>

          <div className="ap-why">
            {whyCards.map((card, i) => (
              <article
                className={`ap-wcard ap-rv${i ? ` ap-d${i}` : ""}`}
                key={card.key}
                style={{ '--grad': card.grad }}
              >
                <span className="ap-wnum">{String(i + 1).padStart(2, "0")}</span>
                <span className="ap-card-ic">{icon(card.glyph, ICONS.layers)}</span>
                <h3>{card.title}</h3>
                <RichText html={card.bodyIsHtml ? card.body : null}>{card.body}</RichText>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ 6 · CTA ============================ */}
      <section className="ap-sec" style={{ paddingTop: '0' }}>
        <div className="ap-wrap">
          <div className="ap-cta ap-rv">
            <svg className="ap-cwm a" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
            <svg className="ap-cwm b" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5"/></svg>
            <span className="ap-eyebrow"><u>{CTA_DEFAULTS.eyebrow}</u></span>
            <h2>{CTA_DEFAULTS.heading}</h2>
            <p>{CTA_DEFAULTS.subhead}</p>
            <div className="ap-cta-actions">
              {/* The handoff left both of these as href="#". */}
              <Link className="ap-btn ap-btn--white" to={CTA_DEFAULTS.primary.to}>{CTA_DEFAULTS.primary.label}
                {ICONS.arrow}</Link>
              <Link className="ap-btn ap-btn--outline" to={CTA_DEFAULTS.secondary.to}>{CTA_DEFAULTS.secondary.label}
                {ICONS.userPlus}</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
