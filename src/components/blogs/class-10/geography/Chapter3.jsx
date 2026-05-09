import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:      #0f172a;
    --muted:    #64748b;
    --accent:   #0369a1;
    --accent2:  #075985;
    --surface:  #f0f9ff;
    --card:     #ffffff;
    --border:   #bae6fd;
    --tag-bg:   #e0f2fe;
    --red:      #dc2626;
    --red-bg:   #fff1f2;
    --red-bd:   #fca5a5;
    --green:    #16a34a;
    --green-bg: #f0fdf4;
    --green-bd: #bbf7d0;
  }

  .blog-root {
    font-family: 'Inter', sans-serif;
    background: #f8fbff;
    color: var(--ink);
    min-height: 100vh;
  }

  /* ── Hero ── */
  .chapter3-hero {
  background: linear-gradient(135deg, #0c1a2e 0%, #0c3461 45%, #1e5fa8 100%);
  padding: 80px 24px 96px;
  position: relative;
  overflow: hidden;
}

.chapter3-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 15% 65%, rgba(56, 189, 248, 0.12) 0%, transparent 55%),
    radial-gradient(circle at 88% 20%, rgba(14, 116, 144, 0.18) 0%, transparent 50%);
}

.chapter3-hero-ripple {
  position: absolute;
  right: -60px;
  bottom: -60px;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  border: 2px solid rgba(56, 189, 248, 0.12);
  animation: chapter3-ripple 4s ease-out infinite;
}

.chapter3-hero-ripple:nth-child(2) {
  width: 500px;
  height: 500px;
  animation-delay: 1.2s;
}

.chapter3-hero-ripple:nth-child(3) {
  width: 620px;
  height: 620px;
  animation-delay: 2.4s;
}

@keyframes chapter3-ripple {
  0% {
    opacity: 0.5;
    transform: scale(0.85);
  }
  100% {
    opacity: 0;
    transform: scale(1.1);
  }
}

.chapter3-hero-inner {
  max-width: 820px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.chapter3-hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.3);
  color: #7dd3fc;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 100px;
  margin-bottom: 28px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.chapter3-hero-title {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(36px, 6vw, 62px);
  font-weight: 900;
  line-height: 1.08;
  color: #ffffff;
  margin: 0 0 20px;
  letter-spacing: -0.02em;
}

.chapter3-hero-title span {
  color: #38bdf8;
}

.chapter3-hero-sub {
  font-family: "Poppins", sans-serif;
  font-size: 17px;
  font-weight: 500;
  color: #bae6fd;
  line-height: 1.7;
  max-width: 600px;
  margin: 0 0 40px;
}

.chapter3-hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}

.chapter3-meta-chip {
  color: #7dd3fc;
  font-size: 14px;
  font-weight: 500;
}

.chapter3-meta-dot {
  width: 4px;
  height: 4px;
  background: #38bdf8;
  border-radius: 50%;
  display: inline-block;
}
  }
  .meta-chip { color: #7dd3fc; font-size: 14px; font-weight: 500; }
  .meta-dot  { width: 4px; height: 4px; background: #38bdf8; border-radius: 50%; display: inline-block; }

  /* ── Body ── */
  .body-wrap {
    max-width: 820px;
    margin: 0 auto;
    padding: 64px 24px 80px;
  }

  /* ── Intro card ── */
  .definition-card {
    background: linear-gradient(135deg, #0c1a2e, #0c3461);
    border-radius: 20px;
    padding: 40px 44px;
    margin-bottom: 64px;
    position: relative;
    overflow: hidden;
  }
  .definition-card::after {
    content: '💧';
    position: absolute;
    top: 10px; right: 28px;
    font-size: 110px;
    opacity: 0.07;
    line-height: 1;
  }
  .definition-card p {
    font-family: 'Poppins', sans-serif;
    font-size: 19px;
    font-weight: 500;
    color: #bae6fd;
    line-height: 1.75;
    margin: 0 0 16px;
    position: relative;
    z-index: 1;
  }
  .definition-card p:last-child { margin: 0; }
  .definition-card strong { color: #38bdf8; }

  /* ── Section labels & titles ── */
  .section-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .section-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(26px, 4vw, 36px);
    font-weight: 800;
    color: var(--ink);
    line-height: 1.2;
    margin: 0 0 32px;
    letter-spacing: -0.01em;
  }
  .section-title .accent { color: var(--accent); }
  .section-title .red    { color: var(--red); }
  .section-title .green  { color: var(--green); }

  /* ── Causes of scarcity ── */
  .causes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
    margin-bottom: 64px;
  }
  .cause-card {
    background: var(--card);
    border: 1.5px solid var(--red-bd);
    border-radius: 16px;
    padding: 26px 24px;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .cause-card:hover {
    box-shadow: 0 8px 28px rgba(220,38,38,0.08);
    transform: translateY(-2px);
  }
  .cause-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 28px;
    font-weight: 900;
    color: #fca5a5;
    line-height: 1;
    margin-bottom: 10px;
  }
  .cause-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--red);
    margin: 0 0 10px;
  }
  .cause-card p {
    font-size: 15px;
    line-height: 1.7;
    color: #374151;
    margin: 0;
  }

  /* ── Divider ── */
  .divider {
    border: none;
    border-top: 2px solid var(--border);
    margin: 56px 0;
  }

  /* ── Dams intro quote card ── */
  .quote-card {
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
    border: 1.5px solid var(--border);
    border-radius: 20px;
    padding: 40px 44px;
    margin-bottom: 40px;
    position: relative;
    overflow: hidden;
  }
  .quote-card::before {
    content: '"';
    position: absolute;
    top: -24px; left: 20px;
    font-size: 160px;
    color: rgba(14,116,144,0.08);
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    line-height: 1;
  }
  .quote-card blockquote {
    font-family: 'Poppins', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--accent2);
    line-height: 1.6;
    margin: 0 0 12px;
    position: relative;
    z-index: 1;
    font-style: italic;
  }
  .quote-card cite {
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: var(--muted);
    font-style: normal;
  }

  /* ── Uses grid ── */
  .uses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 14px;
    margin-bottom: 40px;
  }
  .use-item {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 14px;
    padding: 20px 20px;
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }
  .use-icon {
    font-size: 26px;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .use-item h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: var(--accent2);
    margin: 0 0 4px;
  }
  .use-item p {
    font-size: 14px;
    line-height: 1.6;
    color: #475569;
    margin: 0;
  }

  /* ── Highlight info box ── */
  .info-box {
    background: var(--card);
    border-left: 4px solid var(--accent);
    border-radius: 0 12px 12px 0;
    padding: 22px 26px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  }
  .info-box h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--ink);
    margin: 0 0 6px;
  }
  .info-box p {
    font-size: 15px;
    line-height: 1.7;
    color: #374151;
    margin: 0;
  }

  /* ── Disadvantages ── */
  .disadv-list {
    list-style: none;
    padding: 0;
    margin: 0 0 56px;
  }
  .disadv-list li {
    background: var(--card);
    border: 1.5px solid var(--red-bd);
    border-radius: 14px;
    padding: 20px 24px 20px 20px;
    margin-bottom: 12px;
    font-size: 16px;
    line-height: 1.75;
    color: #374151;
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }
  .disadv-list li .bullet {
    width: 28px;
    height: 28px;
    background: var(--red-bg);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 14px;
    margin-top: 1px;
  }
  .disadv-list li strong { color: var(--red); }

  /* ── Rainwater harvesting region cards ── */
  .region-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 18px;
    margin-bottom: 56px;
  }
  .region-card {
    background: var(--green-bg);
    border: 1.5px solid var(--green-bd);
    border-radius: 16px;
    padding: 28px 26px;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .region-card:hover {
    box-shadow: 0 6px 24px rgba(22,163,74,0.1);
    transform: translateY(-2px);
  }
  .region-icon { font-size: 30px; margin-bottom: 12px; }
  .region-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--green);
    margin: 0 0 10px;
  }
  .region-card p {
    font-size: 15px;
    line-height: 1.7;
    color: #374151;
    margin: 0;
  }
  .region-card .method-tag {
    display: inline-block;
    background: #dcfce7;
    color: #166534;
    font-family: 'Poppins', sans-serif;
    font-size: 11px;
    font-weight: 700;
    padding: 3px 12px;
    border-radius: 100px;
    margin-bottom: 10px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  /* ── FAQ ── */
  .faq-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .faq-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(26px, 4vw, 36px);
    font-weight: 800;
    color: var(--ink);
    margin: 0 0 40px;
    letter-spacing: -0.01em;
  }
  .faq-item {
    border: 1.5px solid var(--border);
    border-radius: 16px;
    margin-bottom: 14px;
    overflow: hidden;
    background: var(--card);
    transition: box-shadow 0.2s;
  }
  .faq-item.open {
    box-shadow: 0 4px 20px rgba(3,105,161,0.1);
    border-color: var(--accent);
  }
  .faq-q {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    padding: 22px 26px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
  }
  .faq-q-text {
    font-family: 'Poppins', sans-serif;
    font-size: 17px;
    font-weight: 600;
    color: var(--ink);
    line-height: 1.5;
    text-align: left;
  }
  .faq-item.open .faq-q-text { color: var(--accent2); }
  .faq-icon {
    width: 28px; height: 28px;
    background: var(--tag-bg);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--accent2);
    font-size: 18px;
    font-weight: 700;
    transition: transform 0.3s;
    margin-top: 2px;
  }
  .faq-item.open .faq-icon { transform: rotate(45deg); background: var(--accent); color: #fff; }
  .faq-ans {
    display: none;
    padding: 0 26px 24px;
    font-size: 16px;
    line-height: 1.8;
    color: #374151;
  }
  .faq-ans.visible { display: block; }
  .faq-ans ul { padding-left: 20px; margin: 8px 0; }
  .faq-ans ul li { margin-bottom: 6px; }
  .faq-ans strong { color: var(--ink); font-family: 'Poppins', sans-serif; }
  .faq-ans p { margin: 0 0 10px; }
  .faq-ans p:last-child { margin: 0; }

  @media (max-width: 600px) {
    .definition-card { padding: 28px 24px; }
    .quote-card      { padding: 28px 24px; }
    .causes-grid, .uses-grid, .region-grid { grid-template-columns: 1fr; }
  }
`;

const faqs = [
  {
    q: "Why is water scarce despite Earth being covered with so much of it?",
    a: (<>
      <p>Earth's surface is covered <strong>three-quarters with water</strong>, but only a very small percentage is usable and accessible. Most water is saline (ocean water) or locked in glaciers. The usable portion — mainly <strong>surface run-off and groundwater</strong> — is renewed by the hydrological cycle, yet water scarcity persists due to:</p>
      <ul>
        <li>Uneven and seasonal rainfall distribution across regions</li>
        <li>Over-exploitation for domestic, industrial, and agricultural use</li>
        <li>Pollution by industrial chemicals and poor drainage systems</li>
        <li>Rising population creating unequal access to available resources</li>
      </ul>
    </>),
  },
  {
    q: "What are the main causes of water scarcity?",
    a: (<ul>
      <li><strong>Uneven Precipitation:</strong> Seasonal and annual rainfall varies by geography and time, causing regional imbalances</li>
      <li><strong>Over-Exploitation:</strong> Growing population and industrial demand deplete and pollute water bodies</li>
      <li><strong>Irrigated Agriculture:</strong> Individual water pumps lower groundwater levels, causing local scarcity and drought</li>
      <li><strong>Industries:</strong> Consume groundwater, generate hydroelectric demand, and discharge untreated chemicals into water bodies</li>
      <li><strong>Unplanned Drainage:</strong> Garbage dumping into water bodies makes them unfit for use</li>
    </ul>),
  },
  {
    q: "What are dams? List their uses.",
    a: (<>
      <p>Dams are <strong>hydraulic structures</strong> built to store water in a reservoir by restricting natural water flow. They serve multiple purposes:</p>
      <ul>
        <li>Irrigation of agricultural fields</li>
        <li>Electricity generation — e.g., <strong>Bhakra-Nangal Dam</strong> on Sutlej-Beas River for hydel power</li>
        <li>Domestic water supply</li>
        <li>Industrial water supply</li>
        <li>Flood control — e.g., <strong>Hirakud Dam</strong> on Mahanadi basin</li>
        <li>Recreational purposes, inland navigation, and fish breeding</li>
      </ul>
    </>),
  },
  {
    q: "Why did Jawaharlal Nehru call dams 'Temples of Modern India'?",
    a: (<p>Nehru used this phrase because he believed dams would be transformative for the nation — powering <strong>agricultural development, village economy growth, industrial expansion, and urban development</strong>. Just as temples are central to cultural and spiritual life, he saw dams as central to India's modern economic and social progress.</p>),
  },
  {
    q: "What are the disadvantages of dams?",
    a: (<ul>
      <li>Interrupted sediment flow causes <strong>sedimentation in reservoirs</strong>, harming aquatic life and fragmenting river ecosystems</li>
      <li><strong>Displacement of local communities</strong> from their land</li>
      <li>Encourages commercial crop farming over diverse agriculture — causes <strong>ecological imbalance</strong></li>
      <li>Creates <strong>inter-state and social disputes</strong> over water prioritisation</li>
      <li>Flood-control dams can <strong>trigger floods</strong> themselves through sedimentation or uncontrolled water release during heavy rainfall</li>
      <li><strong>Land degradation</strong> — floods caused by dam releases erode soil and destroy property</li>
    </ul>),
  },
  {
    q: "What is rainwater harvesting? How is it practised across different regions of India?",
    a: (<>
      <p>Rainwater harvesting is the collection and storage of rainwater for later use. It has been practised in India since ancient times and varies by region:</p>
      <ul>
        <li><strong>Western Himalayas:</strong> 'Guls' or 'Kuls' — diversion channels directing water for agriculture</li>
        <li><strong>Rajasthan:</strong> Rooftop rainwater harvesting — water collected from sloped roofs into large courtyard tanks through pipes</li>
        <li><strong>West Bengal:</strong> Inundation channels formed for irrigation during monsoon flooding</li>
        <li><strong>Arid & Semi-arid regions:</strong> Agricultural fields used as rain-fed storage structures to retain water and keep soil moist</li>
      </ul>
    </>),
  },
  {
    q: "What is the significance of the Bhakra-Nangal Dam and Hirakud Dam?",
    a: (<>
      <p><strong>Bhakra-Nangal Dam</strong> — Located on the Sutlej-Beas River Basin. One of India's largest multi-purpose dams, widely used for <strong>hydroelectric power (hydel power) production and irrigation</strong>.</p>
      <p><strong>Hirakud Dam</strong> — Located in the Mahanadi basin, Odisha. Built primarily for <strong>flood control</strong> in the flood-prone Mahanadi river valley, along with irrigation and power generation.</p>
    </>),
  },
];

export default function WaterResources() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="blog-root">

        {/* HERO */}
        <div className="chapter3-hero">
  <div className="chapter3-hero-ripple" />
  <div className="chapter3-hero-ripple" />
  <div className="chapter3-hero-ripple" />
  <div className="chapter3-hero-inner">
    <div className="chapter3-hero-tag">📚 Class 10 · Social Science · Geography</div>
    <h1 className="chapter3-hero-title">
      Water<br /><span>Resources</span>
    </h1>
    <p className="chapter3-hero-sub">
      Chapter 3 — Complete revision notes covering water scarcity, causes, dams and their uses, disadvantages, and rainwater harvesting methods across India.
    </p>
    <div className="chapter3-hero-meta">
      <span className="chapter3-meta-chip">💧 Geography</span>
      <span className="chapter3-meta-dot" />
      <span className="chapter3-meta-chip">📖 Revision Notes</span>
      <span className="chapter3-meta-dot" />
      <span className="chapter3-meta-chip">❓ 7 FAQs Included</span>
    </div>
  </div>
</div>

        <div className="body-wrap">

          {/* Intro */}
          <div className="definition-card">
            <p>Earth's surface is covered <strong>three-fourths with water</strong> — yet only a tiny fraction is usable and accessible to us. The usable portion is mainly <strong>surface run-off and groundwater</strong>, renewed by the hydrological cycle.</p>
            <p>Despite this, <strong>water scarcity persists</strong> — driven by uneven distribution, over-exploitation, pollution, and rapid population growth.</p>
          </div>

          {/* Causes of Scarcity */}
          <div className="section-label">The Problem</div>
          <h2 className="section-title">Causes of <span className="red">Water Scarcity</span></h2>

          <div className="causes-grid">
            {[
              { num:"01", title:"Uneven Precipitation",        desc:"Seasonal and annual rainfall varies greatly by geographical region and time, leading to regional water imbalances." },
              { num:"02", title:"Over-Exploitation",           desc:"Rising population and unequal access leads to excessive use of water for domestic and industrial purposes — and serious pollution." },
              { num:"03", title:"Irrigated Agriculture",       desc:"Crops require enormous quantities of water. Individual farm pumps lower groundwater levels significantly, causing local drought and scarcity." },
              { num:"04", title:"Industrial Demand",           desc:"Industries consume groundwater through pumping devices and also demand hydroelectric power, putting pressure on water systems." },
              { num:"05", title:"Untreated Chemical Discharge", desc:"Industries release hazardous, untreated chemicals directly into rivers, lakes, and other water bodies — rendering them unusable." },
              { num:"06", title:"Unplanned Drainage",          desc:"Garbage dumped into water bodies pollutes them severely, making the water unfit for any use." },
            ].map((c, i) => (
              <div className="cause-card" key={i}>
                <div className="cause-num">{c.num}</div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>

          <hr className="divider" />

          {/* Dams */}
          <div className="section-label">Solution 1</div>
          <h2 className="section-title">Dams — <span className="accent">Temples of Modern India</span></h2>

          <div className="quote-card">
            <blockquote>"Dams are the Temples of Modern India."</blockquote>
            <cite>— Jawaharlal Nehru, on the role of dams in agriculture, village economy, industry, and urban growth</cite>
          </div>

          <div className="info-box" style={{marginBottom:'32px'}}>
            <h4>🏗️ What is a Dam?</h4>
            <p>A dam is a <strong>hydraulic structure</strong> built to store water in a reservoir by restricting the natural flow of a river. The stored water can later be released for a variety of controlled uses — from irrigation to electricity generation.</p>
          </div>

          <div className="section-label">Uses of Dams</div>
          <h2 className="section-title">8 Major <span className="accent">Uses of Dams</span></h2>

          <div className="uses-grid">
            {[
              { icon:"🌾", title:"Irrigation",           desc:"Supplies water for irrigating agricultural fields — the primary use." },
              { icon:"⚡", title:"Electricity Generation", desc:"Bhakra-Nangal Dam (Sutlej-Beas Basin) is a major source of hydel power." },
              { icon:"🏠", title:"Domestic Water Supply", desc:"Provides clean water for household use to towns and cities." },
              { icon:"🏭", title:"Industrial Supply",     desc:"Supplies water needed by factories and manufacturers." },
              { icon:"🌊", title:"Flood Control",         desc:"Hirakud Dam (Mahanadi basin) is used to control and manage seasonal floods." },
              { icon:"🎡", title:"Recreation",            desc:"Reservoirs used for water parks and other recreational activities." },
              { icon:"🚢", title:"Inland Navigation",     desc:"Large reservoirs support waterway transport and navigation." },
              { icon:"🐟", title:"Fish Breeding",         desc:"Reservoirs provide controlled environments for aquaculture and fish breeding." },
            ].map((u, i) => (
              <div className="use-item" key={i}>
                <div className="use-icon">{u.icon}</div>
                <div>
                  <h4>{u.title}</h4>
                  <p>{u.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Key Dams */}
          <div className="info-box" style={{borderLeftColor:'#0369a1', marginBottom:'16px'}}>
            <h4>🏞️ Bhakra-Nangal Dam — Sutlej-Beas River Basin</h4>
            <p>One of India's largest multi-purpose dams. Widely used for <strong>hydroelectric (hydel) power production</strong> and large-scale irrigation across Punjab, Haryana, and Rajasthan.</p>
          </div>
          <div className="info-box" style={{borderLeftColor:'#0369a1', marginBottom:'56px'}}>
            <h4>🌊 Hirakud Dam — Mahanadi Basin, Odisha</h4>
            <p>Built primarily for <strong>flood control</strong> in the flood-prone Mahanadi valley. Also supports irrigation and hydroelectric power generation in the region.</p>
          </div>

          {/* Disadvantages */}
          <div className="section-label">The Downside</div>
          <h2 className="section-title">Disadvantages <span className="red">of Dams</span></h2>

          <ul className="disadv-list">
            {[
              { icon:"🪨", text: <><strong>Sedimentation & Fragmented Rivers:</strong> Interrupting water flow causes irregular sediment movement, increasing sedimentation in reservoirs and making aquatic migration difficult — harming biodiversity.</> },
              { icon:"🏘️", text: <><strong>Displacement of Local People:</strong> Reservoir flooding submerges villages and farmland, forcing local communities off their ancestral land.</> },
              { icon:"🌿", text: <><strong>Ecological Imbalance:</strong> High water availability encourages farmers to switch to water-intensive commercial crops, disrupting the natural ecological balance.</> },
              { icon:"⚖️", text: <><strong>Social & Inter-State Disputes:</strong> Dam water allocation creates conflicts between communities and even between states competing to prioritise their water needs.</> },
              { icon:"🌧️", text: <><strong>Floods Triggered by Dams:</strong> Sedimentation reduces reservoir capacity. During excessive rainfall, dams fail to hold water — and the controlled release of water itself can trigger devastating floods downstream.</> },
              { icon:"🏜️", text: <><strong>Land Degradation:</strong> Flood-related soil erosion (caused by dam-released water) leads to significant loss of agricultural land, property, and livelihoods.</> },
            ].map((d, i) => (
              <li key={i}>
                <div className="bullet">{d.icon}</div>
                <div>{d.text}</div>
              </li>
            ))}
          </ul>

          <hr className="divider" />

          {/* Rainwater Harvesting */}
          <div className="section-label">Solution 2</div>
          <h2 className="section-title">Rainwater <span className="green">Harvesting</span></h2>

          <div className="info-box" style={{borderLeftColor:'#16a34a', marginBottom:'32px'}}>
            <h4>🌧️ What is Rainwater Harvesting?</h4>
            <p>Rainwater harvesting is the collection and storage of rainwater for future use. It has been practised in India <strong>since ancient times</strong>, adapted to local climatic conditions and geography across different regions.</p>
          </div>

          <div className="section-label">Regional Methods</div>
          <h2 className="section-title">Harvesting Across <span className="green">India</span></h2>

          <div className="region-grid">
            {[
              {
                icon: "🏔️",
                tag: "Western Himalayas",
                title: "Guls & Kuls",
                desc: "Diversion channels — called 'guls' or 'kuls' — were built to redirect river and stream water for use in agriculture, channelling it to farms across hillside terrain.",
              },
              {
                icon: "🏜️",
                tag: "Rajasthan",
                title: "Rooftop Rainwater Harvesting",
                desc: "Rainwater flows from sloped rooftops through pipes into large underground tanks (as big as a room) placed in the courtyard of homes — storing water for the dry months.",
              },
              {
                icon: "🌾",
                tag: "West Bengal",
                title: "Inundation Channels",
                desc: "Special inundation channels were formed to divert monsoon floodwaters from rivers onto agricultural fields, providing controlled irrigation during the rainy season.",
              },
              {
                icon: "🌵",
                tag: "Arid & Semi-Arid Regions",
                title: "Rain-Fed Storage Fields",
                desc: "Agricultural fields were designed as rain-fed storage structures — allowing rainwater to stagnate and seep slowly into the soil, keeping it moist for crops through dry periods.",
              },
            ].map((r, i) => (
              <div className="region-card" key={i}>
                <div className="region-icon">{r.icon}</div>
                <div className="method-tag">{r.tag}</div>
                <h4>{r.title}</h4>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>

          <hr className="divider" />

          {/* FAQ */}
          <div className="faq-label">Practice Questions</div>
          <h2 className="faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, i) => (
            <div className={`faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="faq-q" onClick={() => toggle(i)}>
                <span className="faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="faq-icon">+</span>
              </button>
              <div className={`faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
