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
    --muted:     #64748b;
    --accent:    #be123c;
    --accent2:   #9f1239;
    --surface:   #fff1f2;
    --card:      #ffffff;
    --border:    #fecdd3;
    --border-lt: #ffe4e6;
    --tag-bg:    #fff1f2;
    --green:     #15803d;
    --green-bg:  #f0fdf4;
    --green-bd:  #86efac;
    --blue:      #0369a1;
    --blue-bg:   #f0f9ff;
    --blue-bd:   #bae6fd;
    --amber:     #b45309;
    --amber-bg:  #fffbeb;
    --amber-bd:  #fde68a;
    --slate:     #475569;
  }

  .blog-root {
    font-family: 'Inter', sans-serif;
    background: #fff8f8;
    color: var(--ink);
    min-height: 100vh;
  }

  /* ── Hero ── */
  .chapter6-hero {
  background: linear-gradient(135deg, #1a0008 0%, #4c0519 45%, #9f1239 100%);
  padding: 80px 24px 96px;
  position: relative;
  overflow: hidden;
}

.chapter6-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 12% 60%, rgba(251, 113, 133, 0.12) 0%, transparent 55%),
    radial-gradient(circle at 88% 20%, rgba(190, 18, 60, 0.2) 0%, transparent 50%);
}

.chapter6-hero-inner {
  max-width: 820px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.chapter6-hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(251, 113, 133, 0.15);
  border: 1px solid rgba(251, 113, 133, 0.3);
  color: #fda4af;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 100px;
  margin-bottom: 28px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.chapter6-hero-title {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(36px, 6vw, 62px);
  font-weight: 900;
  line-height: 1.08;
  color: #ffffff;
  margin: 0 0 20px;
  letter-spacing: -0.02em;
}

.chapter6-hero-title span {
  color: #fda4af;
}

.chapter6-hero-sub {
  font-family: "Poppins", sans-serif;
  font-size: 17px;
  font-weight: 500;
  color: #fecdd3;
  line-height: 1.7;
  max-width: 620px;
  margin: 0 0 40px;
}

.chapter6-hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}

.chapter6-meta-chip {
  color: #fda4af;
  font-size: 14px;
  font-weight: 500;
}

.chapter6-meta-dot {
  width: 4px;
  height: 4px;
  background: #fda4af;
  border-radius: 50%;
  display: inline-block;
}
  .meta-chip { color: #fda4af; font-size: 14px; font-weight: 500; }
  .meta-dot  { width: 4px; height: 4px; background: #fda4af; border-radius: 50%; display: inline-block; }

  /* ── Body ── */
  .body-wrap {
    max-width: 820px;
    margin: 0 auto;
    padding: 64px 24px 80px;
  }

  /* ── Intro card ── */
  .definition-card {
    background: linear-gradient(135deg, #1a0008, #4c0519);
    border-radius: 20px;
    padding: 40px 44px;
    margin-bottom: 64px;
    position: relative;
    overflow: hidden;
  }
  .definition-card::after {
    content: '🏭';
    position: absolute; top: 10px; right: 28px;
    font-size: 110px; opacity: 0.07; line-height: 1;
  }
  .definition-card p {
    font-family: 'Poppins', sans-serif;
    font-size: 19px; font-weight: 500;
    color: #fecdd3; line-height: 1.75;
    margin: 0 0 16px;
    position: relative; z-index: 1;
  }
  .definition-card p:last-child { margin: 0; }
  .definition-card strong { color: #fda4af; }

  /* ── Section labels & titles ── */
  .section-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.12em; text-transform: uppercase;
    margin-bottom: 10px;
  }
  .section-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(26px, 4vw, 36px); font-weight: 800;
    color: var(--ink); line-height: 1.2;
    margin: 0 0 32px; letter-spacing: -0.01em;
  }
  .section-title .accent { color: var(--accent); }
  .section-title .green  { color: var(--green); }
  .section-title .blue   { color: var(--blue); }
  .section-title .amber  { color: var(--amber); }

  /* ── Importance cards ── */
  .importance-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
    margin-bottom: 56px;
  }
  .imp-card {
    background: var(--card);
    border: 1.5px solid var(--border-lt);
    border-radius: 16px;
    padding: 26px 24px;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .imp-card:hover { box-shadow: 0 8px 28px rgba(190,18,60,0.1); transform: translateY(-2px); }
  .imp-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 32px; font-weight: 900;
    color: var(--border); line-height: 1;
    margin-bottom: 10px;
  }
  .imp-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; font-weight: 700;
    color: var(--accent); margin: 0 0 8px;
  }
  .imp-card p {
    font-size: 15px; line-height: 1.7;
    color: #374151; margin: 0;
  }

  /* ── Location info box ── */
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
    font-size: 16px; font-weight: 700;
    color: var(--ink); margin: 0 0 8px;
  }
  .info-box p {
    font-size: 15px; line-height: 1.7;
    color: #374151; margin: 0;
  }

  /* ── Industry sections ── */
  .industry-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 18px;
    margin-bottom: 40px;
  }
  .industry-card {
    background: var(--card);
    border: 1.5px solid var(--border-lt);
    border-radius: 16px;
    padding: 28px 24px;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .industry-card:hover { box-shadow: 0 6px 24px rgba(190,18,60,0.1); transform: translateY(-2px); }
  .industry-emoji { font-size: 30px; margin-bottom: 12px; }
  .industry-card h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 700;
    color: var(--ink); margin: 0 0 10px;
  }
  .industry-card ul {
    padding-left: 18px; margin: 0;
  }
  .industry-card ul li {
    font-size: 15px; line-height: 1.7;
    color: #374151; margin-bottom: 5px;
  }
  .industry-card ul li:last-child { margin: 0; }

  /* ── Highlight card (green / amber / blue) ── */
  .highlight-card {
    border-radius: 18px;
    padding: 32px 36px;
    margin-bottom: 32px;
    border: 1.5px solid;
  }
  .highlight-card.green  { background: var(--green-bg); border-color: var(--green-bd); }
  .highlight-card.amber  { background: var(--amber-bg); border-color: var(--amber-bd); }
  .highlight-card.blue   { background: var(--blue-bg);  border-color: var(--blue-bd);  }
  .highlight-card h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px; font-weight: 800; margin: 0 0 14px;
  }
  .highlight-card.green h3 { color: var(--green); }
  .highlight-card.amber h3 { color: var(--amber); }
  .highlight-card.blue  h3 { color: var(--blue); }
  .highlight-card p {
    font-size: 16px; line-height: 1.75;
    color: #374151; margin: 0 0 10px;
  }
  .highlight-card p:last-child { margin: 0; }
  .highlight-card ul { padding-left: 20px; margin: 8px 0 0; }
  .highlight-card ul li {
    font-size: 15px; line-height: 1.7;
    color: #374151; margin-bottom: 6px;
  }

  /* ── Properties list ── */
  .prop-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 14px;
    margin-bottom: 16px;
  }
  .prop-box {
    background: var(--blue-bg);
    border: 1.5px solid var(--blue-bd);
    border-radius: 12px;
    padding: 18px 18px;
    text-align: center;
  }
  .prop-icon { font-size: 26px; margin-bottom: 8px; }
  .prop-box h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 700;
    color: var(--blue); margin: 0;
  }

  /* ── Pollution section ── */
  .pollution-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    margin-bottom: 40px;
  }
  .pollution-card {
    background: var(--card);
    border-radius: 16px;
    padding: 26px 22px;
    border: 1.5px solid;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .pollution-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.08); transform: translateY(-2px); }
  .pollution-card.air     { border-color: #fdba74; background: #fff7ed; }
  .pollution-card.water   { border-color: #bae6fd; background: #f0f9ff; }
  .pollution-card.thermal { border-color: #fca5a5; background: #fff1f2; }
  .pollution-card.noise   { border-color: #d8b4fe; background: #faf5ff; }
  .pollution-icon { font-size: 28px; margin-bottom: 12px; }
  .pollution-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; font-weight: 700; margin: 0 0 10px;
  }
  .pollution-card.air     h4 { color: #c2410c; }
  .pollution-card.water   h4 { color: var(--blue); }
  .pollution-card.thermal h4 { color: var(--accent); }
  .pollution-card.noise   h4 { color: #7c3aed; }
  .pollution-card p {
    font-size: 15px; line-height: 1.7;
    color: #374151; margin: 0;
  }

  /* ── Control list ── */
  .control-list {
    list-style: none; padding: 0; margin: 0 0 56px;
  }
  .control-list li {
    background: var(--card);
    border: 1.5px solid var(--green-bd);
    border-radius: 14px;
    padding: 18px 22px 18px 18px;
    margin-bottom: 12px;
    font-size: 16px; line-height: 1.75;
    color: #374151;
    display: flex; gap: 14px; align-items: flex-start;
  }
  .ctrl-bullet {
    width: 28px; height: 28px;
    background: var(--green-bg);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; font-size: 14px;
    margin-top: 2px;
  }
  .control-list li strong { color: var(--green); }

  /* ── Stat row ── */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 16px;
    margin-bottom: 48px;
  }
  .stat-box {
    background: linear-gradient(135deg, #1a0008, #4c0519);
    border-radius: 16px; padding: 28px 22px; text-align: center;
  }
  .stat-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 28px; font-weight: 900;
    color: #fda4af; margin-bottom: 6px;
  }
  .stat-label {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 600;
    color: #fecdd3; line-height: 1.45;
  }

  /* ── Divider ── */
  .divider {
    border: none;
    border-top: 2px solid var(--border-lt);
    margin: 56px 0;
  }

  /* ── FAQ ── */
  .faq-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.12em; text-transform: uppercase;
    margin-bottom: 10px;
  }
  .faq-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(26px, 4vw, 36px); font-weight: 800;
    color: var(--ink); margin: 0 0 40px; letter-spacing: -0.01em;
  }
  .faq-item {
    border: 1.5px solid var(--border-lt);
    border-radius: 16px; margin-bottom: 14px;
    overflow: hidden; background: var(--card);
    transition: box-shadow 0.2s;
  }
  .faq-item.open {
    box-shadow: 0 4px 20px rgba(190,18,60,0.1);
    border-color: var(--accent);
  }
  .faq-q {
    width: 100%; text-align: left;
    background: none; border: none; cursor: pointer;
    padding: 22px 26px;
    display: flex; justify-content: space-between;
    align-items: flex-start; gap: 16px;
  }
  .faq-q-text {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 600;
    color: var(--ink); line-height: 1.5; text-align: left;
  }
  .faq-item.open .faq-q-text { color: var(--accent2); }
  .faq-icon {
    width: 28px; height: 28px;
    background: var(--tag-bg); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; color: var(--accent2);
    font-size: 18px; font-weight: 700;
    transition: transform 0.3s; margin-top: 2px;
  }
  .faq-item.open .faq-icon { transform: rotate(45deg); background: var(--accent); color: #fff; }
  .faq-ans {
    display: none; padding: 0 26px 24px;
    font-size: 16px; line-height: 1.8; color: #374151;
  }
  .faq-ans.visible { display: block; }
  .faq-ans ul { padding-left: 20px; margin: 8px 0; }
  .faq-ans ul li { margin-bottom: 6px; }
  .faq-ans strong { color: var(--ink); font-family: 'Poppins', sans-serif; }
  .faq-ans p { margin: 0 0 10px; }
  .faq-ans p:last-child { margin: 0; }

  @media (max-width: 600px) {
    .definition-card { padding: 28px 24px; }
    .highlight-card { padding: 24px 20px; }
    .industry-grid, .pollution-grid, .importance-grid { grid-template-columns: 1fr; }
  }
`;

const faqs = [
  {
    q: "Why is manufacturing considered the backbone of economic development?",
    a: (<>
      <p>Manufacturing is considered the backbone of development for several key reasons:</p>
      <ul>
        <li>It <strong>stimulates the economy</strong> and helps the nation prosper</li>
        <li>It is instrumental in <strong>eradicating unemployment and poverty</strong></li>
        <li>Export of manufactured products increases trade and commerce, earning <strong>foreign currency</strong></li>
        <li>It contributes to the <strong>modernisation of agriculture</strong> through the creation of jobs in secondary and tertiary sectors</li>
        <li>The manufacturing sector has grown at around <strong>7% annually</strong> over the past decade</li>
      </ul>
    </>),
  },
  {
    q: "What factors determine industrial location?",
    a: (<>
      <p>Industrial location is determined by the availability of:</p>
      <ul>
        <li><strong>Raw materials, labour, capital, power, and market</strong></li>
        <li>Manufacturing tends to settle where all these factors are available or can be arranged most <strong>cheaply</strong></li>
        <li>Cities provide markets and services such as <strong>banks, insurance, transportation, labour, and financial advisory services</strong></li>
        <li>Many industries join forces to benefit from <strong>agglomeration economies</strong> — the advantages offered by urban centres</li>
        <li>Before independence, most units were located at foreign trade hubs: <strong>Mumbai, Kolkata, Chennai</strong></li>
      </ul>
    </>),
  },
  {
    q: "What is the cotton textile industry and why is it important?",
    a: (<p>The cotton textile industry is closely associated with agriculture — providing livelihoods for <strong>farmers, cotton boll pickers, and workers</strong> engaged in ginning, spinning, weaving, dyeing, design, packaging, and sewing. It is India's <strong>only industry that is autonomous and comprehensive in the value chain</strong> — from raw materials to higher value-added products. It also supports chemicals, packaging, and engineering industries.</p>),
  },
  {
    q: "What do you know about the jute textile industry?",
    a: (<p>India is the <strong>leading producer of raw jute and jute products</strong> in the world. Most jute mills are situated in <strong>West Bengal, along the banks of the Hugli River</strong>. Jute is known as the "golden fibre" and is used for making sacks, bags, ropes, and other packaging materials.</p>),
  },
  {
    q: "Write a note on the sugar industry in India.",
    a: (<p>India ranks <strong>second as a global sugar producer</strong> but is the <strong>largest producer of Gur and Khandsari</strong> (traditional unrefined sugar products). The sugar industry is <strong>seasonally based</strong> — it operates during the sugarcane harvesting season and requires sugarcane as its primary raw material.</p>),
  },
  {
    q: "Why is iron and steel considered a heavy industry?",
    a: (<p>Iron and steel is considered a <strong>heavy industry</strong> because all raw materials (iron ore, coal, limestone) as well as finished goods are <strong>heavy and bulky</strong>, resulting in high transport costs. It is the backbone industry on which all other industries — heavy, medium, and light — depend for their machinery and infrastructure.</p>),
  },
  {
    q: "Why is India not able to realise its full potential in iron and steel production?",
    a: (<ul>
      <li><strong>Expensive and limited availability of coking coal</strong></li>
      <li><strong>Decrease in labour productivity</strong></li>
      <li><strong>Inconsistent supply of energy</strong></li>
      <li><strong>Poor infrastructure</strong> — affecting transportation and logistics</li>
    </ul>),
  },
  {
    q: "What are the properties of aluminium that make it useful?",
    a: (<>
      <p>Aluminium smelting is the <strong>second largest metallurgy industry in India</strong>. Bauxite is its raw material. Properties that make aluminium highly useful:</p>
      <ul>
        <li><strong>Lightweight</strong> — much lighter than steel</li>
        <li><strong>Corrosion resistant</strong></li>
        <li>A <strong>good heat conductor</strong></li>
        <li><strong>Malleable</strong> — can be shaped easily</li>
        <li>Becomes <strong>tougher when mixed with other metals</strong></li>
      </ul>
      <p>It is used in manufacturing <strong>aeroplanes, utensils, and wires</strong> as an alternative to steel, copper, zinc, and lead.</p>
    </>),
  },
  {
    q: "Differentiate between organic and inorganic chemicals.",
    a: (<>
      <p><strong>Inorganic chemicals</strong> include sulphuric acid, nitric acid, alkalies, soda ash, and caustic soda — used in industrial processes.</p>
      <p><strong>Organic chemicals</strong> include petrochemical products used in the manufacture of <strong>synthetic fibres, synthetic rubber, plastics, dyes, medicines, and pharmaceutical products</strong>.</p>
    </>),
  },
  {
    q: "Write a note on the fertilizer industry in India.",
    a: (<>
      <p>The fertilizer industry produces:</p>
      <ul>
        <li><strong>Nitrogenous fertilizers</strong> — mainly urea</li>
        <li><strong>Phosphatic fertilizers</strong> and ammonium phosphate (DAP)</li>
        <li><strong>Complex fertilizers</strong> — combination of nitrogen (N), phosphate (P), and potash (K)</li>
      </ul>
      <p><strong>Potash</strong> is entirely imported as India has no commercially usable reserves. <strong>Gujarat, Tamil Nadu, UP, Punjab, and Kerala</strong> account for half of the total fertilizer output.</p>
    </>),
  },
  {
    q: "What industries cause water pollution? What substances do they release?",
    a: (<>
      <p>Major water-polluting industries: <strong>paper, pulp, chemical, textile & dyeing, petroleum refineries, tanneries, and electroplating industries</strong>.</p>
      <p>They release into water bodies: dyes, detergents, acids, salts, <strong>heavy metals (lead, mercury)</strong>, pesticides, fertilizers, synthetic chemicals with carbon, plastics, and rubber.</p>
    </>),
  },
  {
    q: "What are the four types of industrial pollution? Explain each.",
    a: (<ul>
      <li><strong>Air Pollution:</strong> Caused by undesirable gases like sulphur dioxide and carbon monoxide, and suspended particles — dust, fog, and smoke from industries</li>
      <li><strong>Water Pollution:</strong> Caused by organic and inorganic industrial waste discharged into rivers — dyes, acids, heavy metals, pesticides, plastics</li>
      <li><strong>Thermal Pollution:</strong> Hot water from factories and thermal power plants drained into rivers and ponds before cooling — raises water temperature and harms aquatic life</li>
      <li><strong>Noise Pollution:</strong> Unwanted sounds cause irritation, stress, hearing impairment, increased heart rate, and raised blood pressure</li>
    </ul>),
  },
  {
    q: "What measures can be taken to control industrial pollution?",
    a: (<ul>
      <li>Minimise water usage through <strong>reuse and recycling</strong></li>
      <li>Collect <strong>rainwater</strong> to meet water requirements</li>
      <li><strong>Treat warm water and effluents</strong> before releasing into rivers and ponds</li>
      <li>Install <strong>electrostatic dust collectors, fabric filters, scrubbers, and inertial separators</strong> in smoke stacks to reduce airborne particles</li>
      <li>Use <strong>oil and gas instead of coal</strong> in plants to reduce smoke</li>
      <li><strong>Redesign machines</strong> to make them more energy-efficient and reduce noise</li>
    </ul>),
  },
  {
    q: "What is the significance of the information technology and electronics industry?",
    a: (<p>The electronics industry covers a broad range of products — from transistors to televisions, telephones, cellular telecommunications, radar, and computers. It has created <strong>millions of jobs in India</strong>. <strong>Bengaluru</strong> is well known as India's <strong>electronics capital</strong> and is home to numerous IT firms and tech parks.</p>),
  },
  {
    q: "What is agglomeration economy?",
    a: (<p>Agglomeration economy refers to the <strong>benefits that industries gain by locating close together in urban centres</strong>. Cities provide shared services like banks, insurance, transportation, labour, and consultants, reducing individual costs. Many industries join forces to take advantage of these benefits, leading to <strong>major industrial agglomeration</strong> in cities.</p>),
  },
];

export default function ManufacturingIndustries() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="blog-root">

        {/* HERO */}
       <div className="chapter6-hero">
  <div className="chapter6-hero-inner">
    <div className="chapter6-hero-tag">📚 Class 10 · Social Science · Geography</div>
    <h1 className="chapter6-hero-title">Manufacturing <span>Industries</span></h1>
    <p className="chapter6-hero-sub">
      Chapter 6 — Complete revision notes covering importance of manufacturing, industrial location, agro-based & mineral-based industries, industrial pollution, and environmental control measures.
    </p>
    <div className="chapter6-hero-meta">
      <span className="chapter6-meta-chip">🏭 Geography</span>
      <span className="chapter6-meta-dot" />
      <span className="chapter6-meta-chip">📖 Revision Notes</span>
      <span className="chapter6-meta-dot" />
      <span className="chapter6-meta-chip">❓ 15 FAQs Included</span>
    </div>
  </div>
</div>

        <div className="body-wrap">

          {/* Intro */}
          <div className="definition-card">
            <p>Manufacturing is the <strong>backbone of economic development</strong> — transforming raw materials into finished goods that drive trade, employment, and national prosperity.</p>
            <p>About <strong>two-thirds of India's population</strong> depends on agriculture, yet manufacturing is what propels the nation from a developing to a developed economy by creating jobs in the secondary and tertiary sectors.</p>
          </div>

          {/* Key stats */}
          <div className="stats-row">
            <div className="stat-box"><div className="stat-num">7%</div><div className="stat-label">Annual growth rate of manufacturing sector over last decade</div></div>
            <div className="stat-box"><div className="stat-num">2nd</div><div className="stat-label">India's rank in global sugar production</div></div>
            <div className="stat-box"><div className="stat-num">1st</div><div className="stat-label">India's rank in production of Gur and Khandsari</div></div>
            <div className="stat-box"><div className="stat-num">2nd</div><div className="stat-label">Aluminium smelting — 2nd largest metallurgy industry in India</div></div>
          </div>

          {/* Importance */}
          <div className="section-label">Why it Matters</div>
          <h2 className="section-title">Importance of <span className="accent">Manufacturing</span></h2>
          <div className="importance-grid">
            {[
              { num:"01", title:"Economic Growth",       desc:"Stimulates the economy and helps the nation prosper by converting raw materials into value-added products." },
              { num:"02", title:"Employment & Poverty",  desc:"Instrumental in eradicating unemployment and poverty by creating jobs across the production chain." },
              { num:"03", title:"Foreign Currency",      desc:"Export of manufactured products increases trade and commerce, earning much-needed foreign exchange." },
              { num:"04", title:"Agricultural Modernisation", desc:"Creates jobs in secondary and tertiary sectors which in turn contributes to modernising agriculture." },
            ].map((c, i) => (
              <div className="imp-card" key={i}>
                <div className="imp-num">{c.num}</div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Industrial Location */}
          <div className="section-label">Location Factors</div>
          <h2 className="section-title">Industrial <span className="accent">Location</span></h2>
          <div className="info-box" style={{borderLeftColor:'#be123c', marginBottom:'16px'}}>
            <h4>📍 Key Location Factors</h4>
            <p>Industrial sites are inherently complex — determined by availability of <strong>raw materials, labour, capital, power, and market</strong>. Manufacturing activity tends to settle where all factors are available or can be arranged most cheaply.</p>
          </div>
          <div className="info-box" style={{borderLeftColor:'#be123c', marginBottom:'16px'}}>
            <h4>🏙️ Agglomeration Economies</h4>
            <p>Cities provide markets and services such as <strong>banks, insurance, transportation, labour, and financial advisory services</strong>. Many industries cluster in urban centres to take advantage of these shared benefits — called <strong>agglomeration economies</strong>.</p>
          </div>
          <div className="info-box" style={{borderLeftColor:'#be123c', marginBottom:'56px'}}>
            <h4>📜 Pre-Independence Industrial Pattern</h4>
            <p>Before independence, most manufacturing units were located at <strong>foreign trade hubs — Mumbai, Kolkata, Chennai</strong> — creating pockets of industrially developed urban centres surrounded by vast agricultural rural areas.</p>
          </div>

          <hr className="divider" />

          {/* Agro-based Industries */}
          <div className="section-label">Agro-Based Industries</div>
          <h2 className="section-title">Industries Based on <span className="green">Agricultural Produce</span></h2>

          <div className="industry-grid">
            <div className="industry-card">
              <div className="industry-emoji">🧵</div>
              <h3>Cotton Textiles</h3>
              <ul>
                <li>India's <strong>only autonomous & comprehensive</strong> industry in the value chain — from raw material to finished product</li>
                <li>Provides livelihood for farmers, cotton pickers, and workers in ginning, spinning, weaving, dyeing, design, packaging, and sewing</li>
                <li>Supports chemicals, packaging, and engineering industries</li>
                <li>Contributes to industrial production, employment, and foreign exchange</li>
              </ul>
            </div>
            <div className="industry-card">
              <div className="industry-emoji">🌿</div>
              <h3>Jute Textiles</h3>
              <ul>
                <li>India is the <strong>leading producer</strong> of raw jute and jute products globally</li>
                <li>Most mills are situated in <strong>West Bengal</strong>, along the banks of the <strong>Hugli River</strong></li>
                <li>Used for sacks, bags, ropes, carpets, and packaging materials</li>
                <li>Also known as the "golden fibre"</li>
              </ul>
            </div>
            <div className="industry-card">
              <div className="industry-emoji">🍬</div>
              <h3>Sugar Industry</h3>
              <ul>
                <li>India is the <strong>2nd largest global sugar producer</strong></li>
                <li><strong>Largest producer of Gur and Khandsari</strong> (traditional unrefined sugar) in the world</li>
                <li>Seasonally based — operates during sugarcane harvesting season</li>
                <li>Requires sugarcane as its primary raw material</li>
              </ul>
            </div>
          </div>

          <hr className="divider" />

          {/* Mineral-based Industries */}
          <div className="section-label">Mineral-Based Industries</div>
          <h2 className="section-title">Industries Using <span className="accent">Minerals & Metals</span></h2>

          {/* Iron & Steel */}
          <div className="highlight-card amber">
            <h3>🔩 Iron and Steel Industry</h3>
            <p>The <strong>backbone industry</strong> — all other industries (heavy, medium, and light) depend on it for machinery and infrastructure. Considered heavy because all raw materials and finished goods are bulky, resulting in high transport costs.</p>
            <p>India is a major iron and steel producer, but cannot realise full potential due to:</p>
            <ul>
              <li>Expensive and limited availability of <strong>coking coal</strong></li>
              <li>Decrease in <strong>labour productivity</strong></li>
              <li>Inconsistent supply of <strong>energy</strong></li>
              <li>Poor <strong>infrastructure</strong></li>
            </ul>
          </div>

          {/* Aluminium */}
          <div className="section-label">Second Largest Metallurgy</div>
          <h2 className="section-title">Aluminium <span className="blue">Smelting</span></h2>
          <div className="info-box" style={{borderLeftColor:'#0369a1', marginBottom:'24px'}}>
            <h4>🪨 Raw Material: Bauxite</h4>
            <p>Aluminium smelting is the <strong>second largest metallurgy industry in India</strong>. Used in manufacturing <strong>aeroplanes, utensils, and wires</strong> — a popular alternative to steel, copper, zinc, and lead.</p>
          </div>
          <div className="prop-grid" style={{marginBottom:'48px'}}>
            {[
              { icon:"🪶", title:"Lightweight" },
              { icon:"🛡️", title:"Corrosion Resistant" },
              { icon:"🌡️", title:"Good Heat Conductor" },
              { icon:"🔧", title:"Malleable" },
              { icon:"💪", title:"Tough when Alloyed" },
            ].map((p, i) => (
              <div className="prop-box" key={i}>
                <div className="prop-icon">{p.icon}</div>
                <h4>{p.title}</h4>
              </div>
            ))}
          </div>

          {/* Chemical */}
          <div className="industry-grid" style={{marginBottom:'48px'}}>
            <div className="industry-card">
              <div className="industry-emoji">🧪</div>
              <h3>Chemical Industries</h3>
              <ul>
                <li>Consists of large and small-scale plants — rapid growth in both sectors</li>
                <li><strong>Inorganic:</strong> Sulphuric acid, nitric acid, alkalies, soda ash, caustic soda</li>
                <li><strong>Organic:</strong> Petrochemicals — synthetic fibres, rubber, plastics, dyes, medicines, pharmaceuticals</li>
              </ul>
            </div>
            <div className="industry-card">
              <div className="industry-emoji">🌱</div>
              <h3>Fertilizer Industry</h3>
              <ul>
                <li><strong>Nitrogenous fertilizers</strong> (mainly urea), phosphatic fertilizers, DAP, and complex fertilizers (N+P+K)</li>
                <li><strong>Potash</strong> entirely imported — India has no commercial reserves</li>
                <li>Gujarat, Tamil Nadu, UP, Punjab & Kerala = <strong>50% of fertilizer output</strong></li>
              </ul>
            </div>
            <div className="industry-card">
              <div className="industry-emoji">🏗️</div>
              <h3>Cement Industry</h3>
              <ul>
                <li>Critical for construction of homes, plants, bridges, roads, airports, dams</li>
                <li>Depends on <strong>bulky raw materials</strong> — limestone, silica, and gypsum</li>
              </ul>
            </div>
            <div className="industry-card">
              <div className="industry-emoji">🚗</div>
              <h3>Automobile Industry</h3>
              <ul>
                <li>Manufactures trucks, buses, cars, motorcycles, scooters, three-wheelers</li>
                <li>Found around <strong>Delhi, Gurugram, Mumbai, Pune, Chennai, Kolkata, Lucknow, Indore, Hyderabad, Jamshedpur, Bengaluru</strong></li>
              </ul>
            </div>
            <div className="industry-card">
              <div className="industry-emoji">💻</div>
              <h3>IT & Electronics Industry</h3>
              <ul>
                <li>Covers transistors, TVs, telephones, cellular, radar, computers, and telecom equipment</li>
                <li>Has brought <strong>millions of jobs</strong> to India</li>
                <li><strong>Bengaluru</strong> = India's <strong>Electronics Capital</strong></li>
              </ul>
            </div>
          </div>

          <hr className="divider" />

          {/* Pollution */}
          <div className="section-label">Environmental Impact</div>
          <h2 className="section-title">Industrial Pollution &amp; <span className="accent">Degradation</span></h2>

          <div className="pollution-grid">
            <div className="pollution-card air">
              <div className="pollution-icon">💨</div>
              <h4>Air Pollution</h4>
              <p>Caused by high proportions of undesirable gases — <strong>sulphur dioxide and carbon monoxide</strong>. Airborne particles include solid and liquid matter such as dust, fog, and smoke from industrial chimneys.</p>
            </div>
            <div className="pollution-card water">
              <div className="pollution-icon">🌊</div>
              <h4>Water Pollution</h4>
              <p>Caused by organic and inorganic industrial waste discharged into rivers. Culprits include paper, pulp, chemical, textile, dyeing, petroleum refineries, tanneries — releasing dyes, acids, <strong>heavy metals (lead, mercury)</strong>, pesticides, and plastics.</p>
            </div>
            <div className="pollution-card thermal">
              <div className="pollution-icon">🌡️</div>
              <h4>Thermal Pollution</h4>
              <p>Occurs when <strong>warm water from factories and thermal power plants</strong> is drained into rivers and ponds before cooling — raising water temperature and killing aquatic life.</p>
            </div>
            <div className="pollution-card noise">
              <div className="pollution-icon">🔊</div>
              <h4>Noise Pollution</h4>
              <p>Unwanted industrial sounds cause irritation, stress, <strong>hearing impairment, increased heart rate and blood pressure</strong>, and other physiological health effects on workers and nearby residents.</p>
            </div>
          </div>

          {/* Control measures */}
          <div className="section-label">Solutions</div>
          <h2 className="section-title">Controlling Environmental <span className="green">Degradation</span></h2>

          <ul className="control-list">
            {[
              { icon:"♻️", text: <><strong>Reuse and Recycle Water:</strong> Minimise freshwater consumption by reusing and recycling industrial water wherever possible.</> },
              { icon:"🌧️", text: <><strong>Rainwater Collection:</strong> Collect rainwater to meet industrial water requirements and reduce dependence on groundwater sources.</> },
              { icon:"🧹", text: <><strong>Treat Effluents:</strong> Treat warm water and industrial effluents before releasing them into rivers and ponds to prevent thermal and chemical pollution.</> },
              { icon:"🏭", text: <><strong>Smoke Stack Filters:</strong> Install electrostatic dust collectors, fabric filters, scrubbers, and inertial separators in industrial smoke stacks to reduce airborne particulate matter.</> },
              { icon:"⛽", text: <><strong>Cleaner Fuels:</strong> Use oil and gas instead of coal in plants to significantly reduce smoke and particulate emissions.</> },
              { icon:"🔧", text: <><strong>Efficient Machines:</strong> Redesign and upgrade machinery to make it more energy-efficient and reduce industrial noise levels.</> },
            ].map((item, i) => (
              <li key={i}>
                <div className="ctrl-bullet">{item.icon}</div>
                <div>{item.text}</div>
              </li>
            ))}
          </ul>

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
