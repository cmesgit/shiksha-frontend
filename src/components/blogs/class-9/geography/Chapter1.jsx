import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:       #0f172a;
    --ink2:      #1e293b;
    --muted:     #64748b;
    --accent:    #b45309;
    --accent2:   #d97706;
    --indigo:    #4338ca;
    --indigo2:   #4f46e5;
    --indigo-bg: #eef2ff;
    --indigo-bd: #c7d2fe;
    --saffron:   #f97316;
    --saffron-bg:#fff7ed;
    --saffron-bd:#fed7aa;
    --green:     #15803d;
    --green-bg:  #f0fdf4;
    --green-bd:  #86efac;
    --card:      #ffffff;
    --surface:   #fafaf7;
    --border:    #fde68a;
  }

  .blog-root {
    font-family: 'Inter', sans-serif;
    background: #fafaf7;
    color: var(--ink);
    min-height: 100vh;
  }

  /* ── Hero ── */
  .isl-hero {
    background: linear-gradient(135deg, #0c0a1e 0%, #1e1b4b 40%, #312e81 75%, #3730a3 100%);
    padding: 80px 24px 96px;
    position: relative;
    overflow: hidden;
  }
  .isl-hero::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      radial-gradient(circle at 12% 60%, rgba(249,115,22,0.18) 0%, transparent 50%),
      radial-gradient(circle at 85% 15%, rgba(99,102,241,0.2) 0%, transparent 55%),
      radial-gradient(circle at 50% 90%, rgba(249,115,22,0.08) 0%, transparent 40%);
  }
  .isl-hero::after {
    content: '🌏';
    position: absolute;
    right: 40px; top: 40px;
    font-size: 120px;
    opacity: 0.08;
    line-height: 1;
  }
  .isl-hero-inner {
    max-width: 820px;
    margin: 0 auto;
    position: relative; z-index: 1;
  }
  .isl-hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(249,115,22,0.15);
    border: 1px solid rgba(249,115,22,0.35);
    color: #fdba74;
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 600;
    padding: 6px 16px; border-radius: 100px;
    margin-bottom: 28px;
    letter-spacing: 0.05em; text-transform: uppercase;
  }
  .isl-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 900; line-height: 1.07;
    color: #ffffff; margin: 0 0 20px;
    letter-spacing: -0.02em;
  }
  .isl-hero-title span { color: #fb923c; }
  .isl-hero-sub {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 500;
    color: #c7d2fe; line-height: 1.7;
    max-width: 620px; margin: 0 0 40px;
  }
  .isl-hero-meta { display: flex; flex-wrap: wrap; gap: 20px; align-items: center; }
  .isl-meta-chip { color: #a5b4fc; font-size: 14px; font-weight: 500; display: flex; align-items: center; gap: 7px; }
  .isl-meta-dot  { width: 4px; height: 4px; background: #818cf8; border-radius: 50%; display: inline-block; }

  /* ── Body ── */
  .isl-body {
    max-width: 820px;
    margin: 0 auto;
    padding: 64px 24px 80px;
  }

  /* ── Intro card ── */
  .isl-intro-card {
    background: linear-gradient(135deg, #0c0a1e, #1e1b4b);
    border-radius: 20px;
    padding: 40px 44px;
    margin-bottom: 64px;
    position: relative; overflow: hidden;
  }
  .isl-intro-card::after {
    content: '🌏';
    position: absolute; top: 12px; right: 28px;
    font-size: 110px; opacity: 0.07; line-height: 1;
  }
  .isl-intro-card p {
    font-family: 'Poppins', sans-serif;
    font-size: 19px; font-weight: 500;
    color: #c7d2fe; line-height: 1.75;
    margin: 0 0 16px; position: relative; z-index: 1;
  }
  .isl-intro-card p:last-child { margin: 0; }
  .isl-intro-card strong { color: #fb923c; }

  /* ── Tricolor stat strip ── */
  .isl-tricolor {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 56px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  }
  .isl-tri-block {
    padding: 28px 24px;
    text-align: center;
  }
  .isl-tri-block.saffron { background: linear-gradient(160deg, #ea580c, #f97316); }
  .isl-tri-block.white   { background: #ffffff; }
  .isl-tri-block.green2  { background: linear-gradient(160deg, #15803d, #16a34a); }
  .isl-tri-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 30px; font-weight: 900;
    margin-bottom: 6px;
  }
  .isl-tri-block.saffron .isl-tri-num,
  .isl-tri-block.green2  .isl-tri-num { color: #ffffff; }
  .isl-tri-block.white   .isl-tri-num { color: var(--indigo2); }
  .isl-tri-lbl {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 600; line-height: 1.4;
  }
  .isl-tri-block.saffron .isl-tri-lbl,
  .isl-tri-block.green2  .isl-tri-lbl { color: rgba(255,255,255,0.85); }
  .isl-tri-block.white   .isl-tri-lbl { color: var(--muted); }
  @media (max-width: 520px) {
    .isl-tricolor { grid-template-columns: 1fr; }
  }

  /* ── Section labels & titles ── */
  .isl-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 700; color: var(--indigo2);
    letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 10px;
  }
  .isl-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(26px, 4vw, 36px); font-weight: 800;
    color: var(--ink); line-height: 1.2;
    margin: 0 0 32px; letter-spacing: -0.01em;
  }
  .isl-title .orange  { color: var(--saffron); }
  .isl-title .indigo  { color: var(--indigo2); }
  .isl-title .green3  { color: var(--green); }

  /* ── Coordinate cards ── */
  .isl-coord-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 32px;
  }
  @media (max-width: 560px) { .isl-coord-grid { grid-template-columns: 1fr; } }
  .isl-coord-card {
    border-radius: 16px;
    padding: 26px 28px;
    border: 1.5px solid;
  }
  .isl-coord-card.lat { background: var(--saffron-bg); border-color: var(--saffron-bd); }
  .isl-coord-card.lon { background: var(--indigo-bg);  border-color: var(--indigo-bd); }
  .isl-coord-icon { font-size: 28px; margin-bottom: 12px; }
  .isl-coord-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.06em;
    margin: 0 0 6px;
  }
  .isl-coord-card.lat h4 { color: #9a3412; }
  .isl-coord-card.lon h4 { color: #3730a3; }
  .isl-coord-val {
    font-family: 'Montserrat', sans-serif;
    font-size: 22px; font-weight: 900;
    margin-bottom: 8px;
  }
  .isl-coord-card.lat .isl-coord-val { color: var(--saffron); }
  .isl-coord-card.lon .isl-coord-val { color: var(--indigo2); }
  .isl-coord-card p { font-size: 14px; color: var(--muted); line-height: 1.6; margin: 0; }

  /* ── Tropic banner ── */
  .isl-tropic-banner {
    background: linear-gradient(135deg, #fffbeb, #fef3c7);
    border: 1.5px solid #fcd34d;
    border-radius: 16px;
    padding: 28px 32px;
    margin-bottom: 24px;
    display: flex; align-items: flex-start; gap: 18px;
  }
  .isl-tropic-icon { font-size: 36px; flex-shrink: 0; margin-top: 2px; }
  .isl-tropic-banner h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 700;
    color: #78350f; margin: 0 0 8px;
  }
  .isl-tropic-banner p { font-size: 15px; color: #92400e; line-height: 1.7; margin: 0; }

  /* ── Meridian card ── */
  .isl-meridian-card {
    background: linear-gradient(135deg, #1e1b4b, #312e81);
    border-radius: 16px;
    padding: 28px 32px;
    margin-bottom: 40px;
    display: flex; align-items: flex-start; gap: 18px;
  }
  .isl-meridian-icon { font-size: 36px; flex-shrink: 0; }
  .isl-meridian-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 700;
    color: #a5b4fc; margin: 0 0 8px;
  }
  .isl-meridian-card p { font-size: 15px; color: #c7d2fe; line-height: 1.7; margin: 0; }
  .isl-meridian-card strong { color: #fb923c; }

  /* ── Divider ── */
  .isl-divider { border: none; border-top: 1.5px solid #e2e8f0; margin: 56px 0; }

  /* ── UTC strip ── */
  .isl-utc-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 40px;
  }
  @media (max-width: 520px) { .isl-utc-strip { grid-template-columns: 1fr; } }
  .isl-utc-box {
    border-radius: 14px; padding: 22px 18px;
    text-align: center; border: 1.5px solid;
  }
  .isl-utc-box.a { background: var(--indigo-bg); border-color: var(--indigo-bd); }
  .isl-utc-box.b { background: var(--saffron-bg); border-color: var(--saffron-bd); }
  .isl-utc-box.c { background: var(--green-bg); border-color: var(--green-bd); }
  .isl-utc-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 22px; font-weight: 900; margin-bottom: 6px;
  }
  .isl-utc-box.a .isl-utc-num { color: var(--indigo2); }
  .isl-utc-box.b .isl-utc-num { color: var(--saffron); }
  .isl-utc-box.c .isl-utc-num { color: var(--green); }
  .isl-utc-lbl {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 600; line-height: 1.4;
  }
  .isl-utc-box.a .isl-utc-lbl { color: #3730a3; }
  .isl-utc-box.b .isl-utc-lbl { color: #9a3412; }
  .isl-utc-box.c .isl-utc-lbl { color: #14532d; }

  /* ── Fact cards ── */
  .isl-facts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
    margin-bottom: 48px;
  }
  .isl-fact-card {
    background: var(--card);
    border-radius: 16px; padding: 26px 24px;
    border: 1.5px solid #e2e8f0;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .isl-fact-card:hover {
    box-shadow: 0 8px 28px rgba(67,56,202,0.1);
    transform: translateY(-2px);
  }
  .isl-fact-emoji { font-size: 28px; margin-bottom: 12px; }
  .isl-fact-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 700; color: var(--indigo2);
    margin: 0 0 6px; text-transform: uppercase; letter-spacing: 0.04em;
  }
  .isl-fact-card p { font-size: 15px; color: var(--ink2); line-height: 1.65; margin: 0; }
  .isl-fact-card strong { color: var(--saffron); }

  /* ── World split ── */
  .isl-world-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 48px;
    border: 1.5px solid #e2e8f0;
  }
  @media (max-width: 600px) { .isl-world-split { grid-template-columns: 1fr; } }
  .isl-world-col { padding: 32px 28px; }
  .isl-world-col.dark { background: linear-gradient(160deg, #0c0a1e, #1e1b4b); }
  .isl-world-col.light { background: var(--indigo-bg); border-left: 1.5px solid var(--indigo-bd); }
  .isl-world-col h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 17px; font-weight: 800; margin: 0 0 16px;
  }
  .isl-world-col.dark h3 { color: #fb923c; }
  .isl-world-col.light h3 { color: var(--indigo2); }
  .isl-world-col ul { margin: 0; padding-left: 18px; }
  .isl-world-col.dark ul li { font-size: 15px; color: #c7d2fe; line-height: 1.75; margin-bottom: 8px; }
  .isl-world-col.light ul li { font-size: 15px; color: var(--ink2); line-height: 1.75; margin-bottom: 8px; }

  /* ── Exchange cards ── */
  .isl-exchange {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 48px;
  }
  @media (max-width: 580px) { .isl-exchange { grid-template-columns: 1fr; } }
  .isl-exchange-card {
    border-radius: 18px; padding: 28px 26px; border: 1.5px solid;
  }
  .isl-exchange-card.gave { background: var(--green-bg); border-color: var(--green-bd); }
  .isl-exchange-card.got  { background: var(--saffron-bg); border-color: var(--saffron-bd); }
  .isl-exchange-card h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 17px; font-weight: 800; margin: 0 0 16px;
  }
  .isl-exchange-card.gave h3 { color: var(--green); }
  .isl-exchange-card.got  h3 { color: #9a3412; }
  .isl-exchange-card ul { margin: 0; padding-left: 18px; }
  .isl-exchange-card.gave ul li { font-size: 15px; color: #14532d; line-height: 1.75; margin-bottom: 8px; }
  .isl-exchange-card.got  ul li { font-size: 15px; color: #7c2d12; line-height: 1.75; margin-bottom: 8px; }

  /* ── Neighbours grid ── */
  .isl-nbr-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    gap: 14px;
    margin-bottom: 32px;
  }
  .isl-nbr-card {
    background: var(--card);
    border: 1.5px solid #e2e8f0;
    border-radius: 14px; padding: 20px 16px;
    text-align: center;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .isl-nbr-card:hover {
    box-shadow: 0 6px 20px rgba(67,56,202,0.1);
    transform: translateY(-2px);
  }
  .isl-nbr-flag { font-size: 32px; margin-bottom: 10px; }
  .isl-nbr-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 700; color: var(--ink); margin: 0 0 4px;
  }
  .isl-nbr-card p { font-size: 13px; color: var(--muted); margin: 0 0 8px; }
  .isl-nbr-badge {
    display: inline-block;
    font-size: 11px; font-weight: 700;
    font-family: 'Poppins', sans-serif;
    padding: 3px 10px; border-radius: 100px;
    letter-spacing: 0.05em; text-transform: uppercase;
  }
  .badge-land { background: #dcfce7; color: #166534; }
  .badge-sea  { background: #dbeafe; color: #1e40af; }

  /* ── Callout ── */
  .isl-callout {
    background: linear-gradient(135deg, #dbeafe, #eff6ff);
    border: 1.5px solid #93c5fd;
    border-radius: 16px; padding: 26px 30px;
    margin-bottom: 40px;
    display: flex; gap: 16px; align-items: flex-start;
  }
  .isl-callout-icon { font-size: 32px; flex-shrink: 0; }
  .isl-callout h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; font-weight: 700; color: #1e3a8a; margin: 0 0 6px;
  }
  .isl-callout p { font-size: 15px; color: #1e40af; line-height: 1.7; margin: 0; }

  /* ── Info box ── */
  .isl-info-box {
    background: var(--card);
    border-left: 4px solid var(--indigo2);
    border-radius: 0 12px 12px 0;
    padding: 20px 24px; margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  }
  .isl-info-box h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 700; color: var(--ink); margin: 0 0 6px;
  }
  .isl-info-box p { font-size: 15px; color: #374151; line-height: 1.7; margin: 0; }
  .isl-info-box strong { color: var(--indigo2); }

  /* ── FAQ ── */
  .isl-faq-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 700; color: var(--indigo2);
    letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 10px;
  }
  .isl-faq-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(24px, 4vw, 34px); font-weight: 800;
    color: var(--ink); margin: 0 0 32px; letter-spacing: -0.01em;
  }
  .faq-item {
    border: 1.5px solid #e2e8f0;
    border-radius: 14px; margin-bottom: 12px;
    overflow: hidden; background: var(--card);
    transition: border-color 0.2s;
  }
  .faq-item.open { border-color: var(--indigo-bd); }
  .faq-q {
    width: 100%; background: none; border: none; cursor: pointer;
    padding: 20px 24px;
    display: flex; justify-content: space-between; align-items: center;
    gap: 16px; text-align: left;
  }
  .faq-q-text {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; font-weight: 600; color: var(--ink); line-height: 1.5;
  }
  .faq-icon { font-size: 22px; font-weight: 700; color: var(--indigo2); flex-shrink: 0; line-height: 1; }
  .faq-ans {
    display: none;
    padding: 0 24px 20px;
    font-size: 15px; color: #374151; line-height: 1.75;
  }
  .faq-ans.visible { display: block; }
  .faq-ans strong { color: var(--indigo2); }
  .faq-ans p { margin: 0 0 12px; }
  .faq-ans p:last-child { margin: 0; }
`;

const faqs = [
  {
    q: "Where is India located? Describe its latitudinal and longitudinal extent.",
    a: <p>India lies entirely in the <strong>Northern Hemisphere</strong>. Its mainland extends between <strong>8°4'N to 37°6'N latitudes</strong> and <strong>68°7'E to 97°25'E longitudes</strong>. Both the latitudinal and longitudinal extent is approximately <strong>30 degrees</strong>.</p>,
  },
  {
    q: "What is the significance of the Tropic of Cancer passing through India?",
    a: <p>The <strong>Tropic of Cancer (23°30'N)</strong> passes almost through the middle of India, dividing it into two nearly equal halves. The northern part lies in the temperate zone while the southern part lies in the tropical zone — giving India a diverse climate.</p>,
  },
  {
    q: "What is India's Standard Meridian and why was it chosen?",
    a: <p>India's <strong>Standard Time</strong> is based on the <strong>82°30'E meridian</strong>, which passes near <strong>Mirzapur in Uttar Pradesh</strong>. It was chosen as it lies centrally with respect to India's longitudinal extent. India is <strong>5 hours and 30 minutes ahead of GMT</strong>.</p>,
  },
  {
    q: "Why does India's east-west extent appear smaller than the north-south extent?",
    a: <p>Although both extents span approximately 30 degrees, the <strong>east-west extent appears smaller</strong> because longitudes converge as we move towards the poles. At higher latitudes, the actual distance between two longitudes is less than at the equator.</p>,
  },
  {
    q: "Describe India's size and its position among world countries.",
    a: <p>India covers an area of <strong>3.28 million square kilometres</strong>, which is <strong>2.4% of the total geographical area of the world</strong>. It is the <strong>7th largest country</strong> in the world. It has a land boundary of about <strong>15,200 km</strong> and a total coastline of <strong>7,516.6 km</strong>.</p>,
  },
  {
    q: "How does India's central location benefit it in terms of world trade routes?",
    a: <p>India's <strong>central location</strong> between West and East Asia gives it a strategic advantage. The <strong>trans-Indian Ocean routes</strong> connect countries of Europe in the west with those of East and Southeast Asia in the east. India's <strong>protruding Deccan Peninsula</strong> extends into the Indian Ocean, allowing close contact with West Asia, Africa, Europe, and Southeast Asia.</p>,
  },
  {
    q: "Name India's neighbouring countries. Which ones share a land boundary and which share a sea boundary?",
    a: <><p><strong>Land boundary neighbours:</strong> Pakistan, Afghanistan, China, Nepal, Bhutan, Bangladesh, and Myanmar.</p><p><strong>Sea boundary neighbours:</strong> Maldives and Sri Lanka — both island countries to the south. Sri Lanka is separated from India by the <strong>Palk Strait</strong>.</p></>,
  },
  {
    q: "What contributions has India made to the world? What did India receive in return?",
    a: <><p><strong>India's contributions:</strong> Ideas and philosophies (Upanishads, Ramayana, Panchtantra), and mathematics (Indian numerals and the decimal system).</p><p><strong>India received:</strong> Influence on its architecture from Greek sculpture and architectural styles from West Asia.</p></>,
  },
  {
    q: "Why does India stand apart from the rest of Asia?",
    a: <p>India is separated from the rest of Asia by the <strong>mighty Himalayas</strong> to the north and the seas on three sides — the Arabian Sea (west), the Bay of Bengal (east), and the Indian Ocean (south). This natural boundary makes India a distinct sub-continent.</p>,
  },
  {
    q: "What is unique about India among all the countries in the world?",
    a: <p>India is the <strong>only country in the world that has an ocean named after it</strong> — the <strong>Indian Ocean</strong>. This reflects India's historical maritime importance and central position in ocean trade routes.</p>,
  },
];

export default function IndiaLocationBlog() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="blog-root">

        {/* ── Hero ── */}
        <div className="isl-hero">
          <div className="isl-hero-inner">
            <div className="isl-hero-tag">🌏 Class 9 · Geography · Chapter 1</div>
            <h1 className="isl-hero-title">
              India — Size<br /><span>and Location</span>
            </h1>
            <p className="isl-hero-sub">
              Explore India's geographical position on the globe — its coordinates, extent, strategic centrality, and its neighbourhood in South Asia.
            </p>
            <div className="isl-hero-meta">
              <span className="isl-meta-chip">📚 NCERT Class 9</span>
              <span className="isl-meta-dot" />
              <span className="isl-meta-chip">🗺️ Contemporary India — I</span>
              <span className="isl-meta-dot" />
              <span className="isl-meta-chip">⏱️ 12 min read</span>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="isl-body">

          {/* Intro card */}
          <div className="isl-intro-card">
            <p>India is one of the world's oldest civilisations and today stands as a <strong>rapidly developing nation</strong> making remarkable progress across multiple fields.</p>
            <p>Geographically, India occupies a <strong>unique and central position</strong> — straddling the ancient land and maritime routes between East and West. It lies entirely in the <strong>Northern Hemisphere</strong>, with the Tropic of Cancer dividing it into two nearly equal halves.</p>
            <p>With an area of <strong>3.28 million km²</strong>, India ranks as the <strong>7th largest country</strong> in the world — and is the only nation to have an ocean named after it.</p>
          </div>

          {/* Tricolor stat strip */}
          <div className="isl-tricolor">
            <div className="isl-tri-block saffron">
              <div className="isl-tri-num">3.28M km²</div>
              <div className="isl-tri-lbl">Total Area</div>
            </div>
            <div className="isl-tri-block white">
              <div className="isl-tri-num">7th</div>
              <div className="isl-tri-lbl">Largest Country in the World</div>
            </div>
            <div className="isl-tri-block green2">
              <div className="isl-tri-num">2.4%</div>
              <div className="isl-tri-lbl">of World's Geographical Area</div>
            </div>
          </div>

          {/* Location */}
          <div className="isl-label">Location</div>
          <h2 className="isl-title">India's Coordinates &amp; <span className="indigo">Extent</span></h2>

          <div className="isl-coord-grid">
            <div className="isl-coord-card lat">
              <div className="isl-coord-icon">↕️</div>
              <h4>Latitudinal Extent</h4>
              <div className="isl-coord-val">8°4'N — 37°6'N</div>
              <p>Spans approximately 30 degrees. Influences duration of day and night across regions.</p>
            </div>
            <div className="isl-coord-card lon">
              <div className="isl-coord-icon">↔️</div>
              <h4>Longitudinal Extent</h4>
              <div className="isl-coord-val">68°7'E — 97°25'E</div>
              <p>Also spans ~30 degrees. Appears smaller on maps because longitudes converge at higher latitudes.</p>
            </div>
          </div>

          <div className="isl-tropic-banner">
            <div className="isl-tropic-icon">☀️</div>
            <div>
              <h4>Tropic of Cancer — 23°30'N</h4>
              <p>Passes almost through the <strong>middle of India</strong>, dividing it into two nearly equal halves — the northern temperate zone and the southern tropical zone. It passes through Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram.</p>
            </div>
          </div>

          <div className="isl-meridian-card">
            <div className="isl-meridian-icon">🕐</div>
            <div>
              <h4>Standard Meridian — 82°30'E (IST)</h4>
              <p>India's Standard Time is based on <strong>82°30'E</strong>, passing near <strong>Mirzapur, Uttar Pradesh</strong>. India is <strong>5 hrs 30 min ahead of GMT</strong>. A single standard time was needed because India's 30° longitudinal span would otherwise create significant time differences between east and west.</p>
            </div>
          </div>

          <hr className="isl-divider" />

          {/* Size */}
          <div className="isl-label">Size</div>
          <h2 className="isl-title">India's <span className="orange">Physical Dimensions</span></h2>

          <div className="isl-utc-strip">
            <div className="isl-utc-box a">
              <div className="isl-utc-num">15,200 km</div>
              <div className="isl-utc-lbl">Land Boundary</div>
            </div>
            <div className="isl-utc-box b">
              <div className="isl-utc-num">7,516.6 km</div>
              <div className="isl-utc-lbl">Total Coastline</div>
            </div>
            <div className="isl-utc-box c">
              <div className="isl-utc-num">~30°</div>
              <div className="isl-utc-lbl">Both Lat &amp; Long Extent</div>
            </div>
          </div>

          <div className="isl-facts-grid">
            <div className="isl-fact-card">
              <div className="isl-fact-emoji">↕️</div>
              <h4>North–South Extent</h4>
              <p>About <strong>3,214 km</strong> from north to south. Latitudinal extent influences the <strong>duration of day and night</strong> across the country.</p>
            </div>
            <div className="isl-fact-card">
              <div className="isl-fact-emoji">↔️</div>
              <h4>East–West Extent</h4>
              <p>Approximately <strong>2,933 km</strong>. Appears smaller than north–south because longitudes converge at higher latitudes.</p>
            </div>
            <div className="isl-fact-card">
              <div className="isl-fact-emoji">🌊</div>
              <h4>Ocean Named After India</h4>
              <p>India is the <strong>only country</strong> in the world with an ocean named after it — the <strong>Indian Ocean</strong>.</p>
            </div>
            <div className="isl-fact-card">
              <div className="isl-fact-emoji">🏝️</div>
              <h4>Island Territories</h4>
              <p><strong>Lakshadweep</strong> (Arabian Sea) and <strong>Andaman &amp; Nicobar Islands</strong> (Bay of Bengal) are integral parts of India.</p>
            </div>
          </div>

          <hr className="isl-divider" />

          {/* India & World */}
          <div className="isl-label">India &amp; The World</div>
          <h2 className="isl-title">Strategic <span className="indigo">Position in Asia</span></h2>

          <div className="isl-world-split">
            <div className="isl-world-col dark">
              <h3>🛣️ Land Routes</h3>
              <ul>
                <li>India's contacts with the world via <strong>land routes are much older</strong> than its maritime contacts</li>
                <li>Himalayan passes enabled exchange with Central Asia, Persia, and China</li>
                <li>The Indian landmass is centrally located between <strong>West and East Asia</strong></li>
              </ul>
            </div>
            <div className="isl-world-col light">
              <h3>🚢 Maritime Routes</h3>
              <ul>
                <li>The <strong>trans-Indian Ocean routes</strong> connect the West with the East</li>
                <li>India's <strong>Deccan Peninsula</strong> protrudes into the ocean — close contact with Africa, West Asia, Southeast Asia &amp; Europe</li>
                <li>India's peninsular shape makes it a natural hub for maritime trade</li>
              </ul>
            </div>
          </div>

          {/* Cultural Exchange */}
          <div className="isl-label">Cultural Exchange</div>
          <h2 className="isl-title">What India <span className="green3">Gave</span> &amp; <span className="orange">Received</span></h2>

          <div className="isl-exchange">
            <div className="isl-exchange-card gave">
              <h3>🟢 India Gave to the World</h3>
              <ul>
                <li><strong>Philosophies:</strong> Upanishads, Ramayana, Panchtantra</li>
                <li><strong>Mathematics:</strong> Indian numerals and the decimal system</li>
                <li>Spread of <strong>Buddhism and Jainism</strong> across Asia</li>
                <li>Ayurveda, astronomy, and early scientific traditions</li>
              </ul>
            </div>
            <div className="isl-exchange-card got">
              <h3>🟠 India Received from the World</h3>
              <ul>
                <li><strong>Greek sculpture</strong> influenced Indian art and architectural forms</li>
                <li><strong>Architectural styles</strong> from West Asia shaped Indo-Islamic and Mughal architecture</li>
                <li>Persian and Arabic cultural and linguistic influences</li>
              </ul>
            </div>
          </div>

          <hr className="isl-divider" />

          {/* Neighbours */}
          <div className="isl-label">India's Neighbours</div>
          <h2 className="isl-title">Countries Sharing <span className="indigo">India's Borders</span></h2>

          <div className="isl-info-box" style={{marginBottom:'32px'}}>
            <h4>🇮🇳 India's Position in South Asia</h4>
            <p>India holds an <strong>important and central position in South Asia</strong>. It has <strong>28 States and 8 Union Territories</strong>. India has always maintained <strong>strong geographical and historical links</strong> with all its neighbours, yet stands apart from the rest of Asia as a distinct sub-continent.</p>
          </div>

          <div className="isl-nbr-grid">
            {[
              { flag:"🇵🇰", name:"Pakistan",    type:"land", note:"Northwest" },
              { flag:"🇦🇫", name:"Afghanistan", type:"land", note:"Northwest (PoK)" },
              { flag:"🇨🇳", name:"China",       type:"land", note:"Northern border" },
              { flag:"🇳🇵", name:"Nepal",       type:"land", note:"Northern border" },
              { flag:"🇧🇹", name:"Bhutan",      type:"land", note:"Northeast" },
              { flag:"🇧🇩", name:"Bangladesh",  type:"land", note:"Eastern border" },
              { flag:"🇲🇲", name:"Myanmar",     type:"land", note:"Eastern border" },
              { flag:"🇱🇰", name:"Sri Lanka",   type:"sea",  note:"Palk Strait — south" },
              { flag:"🇲🇻", name:"Maldives",    type:"sea",  note:"Island nation — south" },
            ].map((n, i) => (
              <div className="isl-nbr-card" key={i}>
                <div className="isl-nbr-flag">{n.flag}</div>
                <h4>{n.name}</h4>
                <p>{n.note}</p>
                <span className={`isl-nbr-badge ${n.type === "land" ? "badge-land" : "badge-sea"}`}>
                  {n.type === "land" ? "Land Border" : "Sea Border"}
                </span>
              </div>
            ))}
          </div>

          <div className="isl-callout">
            <div className="isl-callout-icon">🌊</div>
            <div>
              <h4>The Palk Strait</h4>
              <p><strong>Sri Lanka</strong> is separated from India by the <strong>Palk Strait</strong> — a narrow strip of sea between the two nations. Despite this separation, India and Sri Lanka share millennia-old cultural, religious, and trade ties.</p>
            </div>
          </div>

          <hr className="isl-divider" />

          {/* FAQ */}
          <div className="isl-faq-label">Practice Questions</div>
          <h2 className="isl-faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, i) => (
            <div className={`faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="faq-q" onClick={() => toggle(i)}>
                <span className="faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="faq-icon">{openIndex === i ? "−" : "+"}</span>
              </button>
              <div className={`faq-ans${openIndex === i ? " visible" : ""}`}>
                {faq.a}
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
