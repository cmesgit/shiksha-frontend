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
    --ink2:     #1e293b;
    --muted:    #64748b;
    --accent:   #b45309;
    --accent2:  #92400e;
    --surface:  #fffbeb;
    --card:     #ffffff;
    --border:   #fde68a;
    --tag-bg:   #fef9c3;
    --green:    #16a34a;
    --green-bg: #f0fdf4;
    --green-bd: #bbf7d0;
  }

  .blog-root {
    font-family: 'Inter', sans-serif;
    background: #fafaf7;
    color: var(--ink);
    min-height: 100vh;
  }

  .chapter2-hero {
  background: linear-gradient(135deg, #1c0a00 0%, #431407 45%, #7c2d12 100%);
  padding: 80px 24px 96px;
  position: relative;
  overflow: hidden;
}
.chapter2-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 10% 60%, rgba(251,191,36,0.1) 0%, transparent 55%),
    radial-gradient(circle at 90% 20%, rgba(180,83,9,0.18) 0%, transparent 50%);
}
.chapter2-hero-inner {
  max-width: 820px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.chapter2-hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(251,191,36,0.12);
  border: 1px solid rgba(251,191,36,0.28);
  color: #fcd34d;
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 100px;
  margin-bottom: 28px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.chapter2-hero-title {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(36px, 6vw, 62px);
  font-weight: 900;
  line-height: 1.08;
  color: #ffffff;
  margin: 0 0 20px;
  letter-spacing: -0.02em;
}
.chapter2-hero-title span { 
  color: #fbbf24; 
}
.chapter2-hero-sub {
  font-family: 'Poppins', sans-serif;
  font-size: 17px;
  font-weight: 500;
  color: #fed7aa;
  line-height: 1.7;
  max-width: 600px;
  margin: 0 0 40px;
}
.chapter2-hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}
  .meta-chip {
    color: #fcd34d;
    font-size: 14px;
    font-weight: 500;
  }
  .meta-dot {
    width: 4px; height: 4px;
    background: #fbbf24;
    border-radius: 50%;
    display: inline-block;
  }

  .body-wrap {
    max-width: 820px;
    margin: 0 auto;
    padding: 64px 24px 80px;
  }

  .definition-card {
    background: linear-gradient(135deg, #1c0a00, #431407);
    border-radius: 20px;
    padding: 40px 44px;
    margin-bottom: 64px;
    position: relative;
    overflow: hidden;
  }
  .definition-card p {
    font-family: 'Poppins', sans-serif;
    font-size: 19px;
    font-weight: 500;
    color: #fed7aa;
    line-height: 1.75;
    margin: 0 0 16px;
    position: relative;
    z-index: 1;
  }
  .definition-card p:last-child { margin: 0; }
  .definition-card strong { color: #fbbf24; }

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
  .section-title .green  { color: var(--green); }

  .species-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
    margin-bottom: 64px;
  }
  .species-card {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 16px;
    padding: 24px 22px;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .species-card:hover {
    box-shadow: 0 8px 28px rgba(180,83,9,0.1);
    transform: translateY(-2px);
  }
  .species-badge {
    display: inline-block;
    font-family: 'Poppins', sans-serif;
    font-size: 11px;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 100px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .badge-normal      { background:#dcfce7; color:#166534; }
  .badge-endangered  { background:#fee2e2; color:#991b1b; }
  .badge-vulnerable  { background:#ffedd5; color:#9a3412; }
  .badge-rare        { background:#fef9c3; color:#854d0e; }
  .badge-endemic     { background:#ede9fe; color:#5b21b6; }
  .badge-extinct     { background:#f1f5f9; color:#334155; }
  .species-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--ink);
    margin: 0 0 8px;
  }
  .species-card p {
    font-size: 15px;
    line-height: 1.65;
    color: #374151;
    margin: 0 0 10px;
  }
  .species-eg {
    font-size: 13px;
    color: var(--accent);
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
  }

  .alert-red {
    background: linear-gradient(135deg, #fff1f2, #ffe4e6);
    border: 1.5px solid #fca5a5;
    border-radius: 16px;
    padding: 32px 36px;
    margin-bottom: 40px;
  }
  .alert-red h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: #7f1d1d;
    margin: 0 0 16px;
  }
  .alert-red ul { margin: 0; padding-left: 20px; }
  .alert-red ul li {
    font-size: 16px;
    line-height: 1.75;
    color: #991b1b;
    margin-bottom: 8px;
  }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 16px;
    margin-bottom: 40px;
  }
  .stat-box {
    background: linear-gradient(135deg, #431407, #7c2d12);
    border-radius: 16px;
    padding: 28px 22px;
    text-align: center;
  }
  .stat-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 28px;
    font-weight: 900;
    color: #fbbf24;
    margin-bottom: 6px;
  }
  .stat-label {
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #fed7aa;
    line-height: 1.4;
  }

  .tiger-card {
    background: linear-gradient(135deg, #fffbeb, #fef3c7);
    border: 1.5px solid var(--border);
    border-radius: 20px;
    padding: 40px 44px;
    margin-bottom: 32px;
    position: relative;
    overflow: hidden;
  }
  .tiger-card h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: var(--ink);
    margin: 0 0 16px;
  }
  .tiger-card p {
    font-size: 17px;
    line-height: 1.75;
    color: #1c0a00;
    margin: 0 0 12px;
  }
  .tiger-card p:last-child { margin: 0; }

  .reserves-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 14px;
    margin-bottom: 48px;
  }
  .reserve-item {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 12px;
    padding: 18px 20px;
  }
  .reserve-item h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: var(--accent2);
    margin: 0 0 4px;
  }
  .reserve-item p {
    font-size: 14px;
    color: #6b7280;
    margin: 0;
  }

  .forest-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 18px;
    margin-bottom: 48px;
  }
  .forest-card {
    background: var(--green-bg);
    border: 1.5px solid var(--green-bd);
    border-radius: 16px;
    padding: 28px 24px;
  }
  .forest-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: var(--muted);
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .forest-card h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--green);
    margin: 0 0 10px;
  }
  .forest-card p {
    font-size: 15px;
    line-height: 1.7;
    color: #374151;
    margin: 0;
  }

  .info-box {
    background: var(--card);
    border-left: 4px solid var(--accent);
    border-radius: 0 12px 12px 0;
    padding: 24px 28px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  }
  .info-box h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--ink);
    margin: 0 0 8px;
  }
  .info-box p {
    font-size: 15px;
    line-height: 1.7;
    color: #374151;
    margin: 0;
  }

  .community-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 18px;
    margin-bottom: 48px;
  }
  .community-card {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 16px;
    padding: 26px 24px;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .community-card:hover {
    box-shadow: 0 6px 24px rgba(180,83,9,0.1);
    transform: translateY(-2px);
  }
  .community-icon { font-size: 30px; margin-bottom: 12px; }
  .community-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--ink);
    margin: 0 0 10px;
  }
  .community-card p {
    font-size: 15px;
    line-height: 1.7;
    color: #475569;
    margin: 0;
  }

  .divider {
    border: none;
    border-top: 2px solid var(--border);
    margin: 56px 0;
  }

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
    box-shadow: 0 4px 20px rgba(180,83,9,0.1);
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
`;

const faqs = [
  {
    q: "What was the list of animals that were added to the protected list?",
    a: (<>
      <p>The central government announced protection for gravely threatened animals including the <strong>tiger, one-horned rhinoceros, Kashmir stag (hangul)</strong>, three crocodile species — <strong>freshwater, saltwater, and Gharial</strong> — and the <strong>Asiatic lion</strong>.</p>
      <p>Partial or full legal protection was also extended to the <strong>Indian elephant, black buck, and snow leopard</strong>. Under Wildlife Acts of 1980 and 1986, several hundred <strong>butterflies, moths, beetles, and one dragonfly</strong> were added to the protected list.</p>
    </>),
  },
  {
    q: "What is biodiversity?",
    a: (<p>Biodiversity refers to the enormous variety of life on Earth that works <strong>interdependently</strong> as a closely knit network sustaining the ecosystem. India hosts one of the world's largest biodiversity systems — yet <strong>10% of its recorded wild flora and 20% of its mammals</strong> are on the threatened list.</p>),
  },
  {
    q: "Brief about Project Tiger.",
    a: (<>
      <p>By 1973, India's tiger population had crashed from an estimated <strong>55,000 to just 1,827</strong> due to habitat loss, poaching, prey depletion, and the illegal trade of tiger skins and bones. <strong>Project Tiger (1973)</strong> was launched to save tigers and preserve entire biotypes.</p>
      <p>Key reserves: Corbett (Uttarakhand), Sunderbans (West Bengal), Bandhavgarh (MP), Sariska (Rajasthan), Manas (Assam), Periyar (Kerala).</p>
    </>),
  },
  {
    q: "What are permanent forests?",
    a: (<p><strong>Reserved Forests + Protected Forests = Permanent Forests.</strong> These are maintained under strict government regulation for collecting timber and other natural products, and are legally protected from depletion or encroachment.</p>),
  },
  {
    q: "Why is aquatic diversity important for human communities?",
    a: (<p>Fisheries are a <strong>major income source</strong> for coastal communities. Rich aquatic diversity ensures a stable food supply and livelihood. Since all communities depend on water daily, healthy aquatic ecosystems directly support <strong>community health and food security</strong>.</p>),
  },
  {
    q: "What were the impacts of the Chipko Movement?",
    a: (<>
      <p>The Chipko Movement saved forests and united communities around environmental protection. Its impact includes:</p>
      <ul>
        <li><strong>Beej Bachao Andolan</strong> (Tehri & Navdanya) — stopped synthetic chemical use, proving organic farming yields sufficient harvests</li>
        <li><strong>Joint Forest Management (JFM)</strong> — community-led forest restoration, first started in Odisha in 1988</li>
      </ul>
    </>),
  },
  {
    q: "What were the reasons for the depletion of flora and fauna?",
    a: (<ul>
      <li>1951–1980: Over <strong>26,200 sq. km.</strong> of forest converted to agricultural land; shifting cultivation (jhum) in tribal belts</li>
      <li>Since 1951: Over <strong>5,000 sq. km.</strong> cleared for river valley projects (e.g., 40,000 hectares for Narmada Sagar Project)</li>
      <li><strong>Large-scale mining</strong> — dolomite mining threatening Buxa Tiger Reserve, West Bengal</li>
      <li>Poaching, hunting, over-exploitation, forest fires, pollution</li>
      <li><strong>Overpopulation</strong> in developing countries as a prime cause</li>
    </ul>),
  },
  {
    q: "Explain IUCN and JFM.",
    a: (<>
      <p><strong>IUCN</strong> — International Union for Conservation of Nature and Natural Resources. Classifies species as Normal, Endangered, Vulnerable, Rare, Endemic, or Extinct to guide global conservation priorities.</p>
      <p><strong>JFM</strong> — Joint Forest Management. Involves local communities in restoring and managing forests. First launched in <strong>Odisha in 1988</strong>.</p>
    </>),
  },
  {
    q: "What is Bhairodev Dakav 'Sonchuri'?",
    a: (<p>A community-led initiative in <strong>Alwar district, Rajasthan</strong> where five villages declared <strong>1,200 hectares of forest</strong> as a self-governed protected zone. The community established strict anti-hunting rules and actively protects the area from outside encroachment — a model of grassroots conservation.</p>),
  },
];

export default function ForestAndWildlife() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="blog-root">

        {/* HERO */}
      <div className="chapter2-hero">
  <div className="chapter2-hero-inner">
    <div className="chapter2-hero-tag">📚 Class 10 · Social Science · Geography</div>
    <h1 className="chapter2-hero-title">
      Forest & <span>Wildlife</span><br />Resources
    </h1>
    <p className="chapter2-hero-sub">
      Chapter 2 — Complete revision notes covering biodiversity, IUCN species classification, Project Tiger, forest types, community conservation, and environmental degradation.
    </p>
    <div className="chapter2-hero-meta">
      <span className="meta-chip">🌿 Geography</span>
      <span className="meta-dot" />
      <span className="meta-chip">📖 Revision Notes</span>
      <span className="meta-dot" />
      <span className="meta-chip">❓ 9 FAQs Included</span>
    </div>
  </div>
</div>

        <div className="body-wrap">

          {/* Intro */}
          <div className="definition-card">
            <p>Biodiversity is extremely diverse on Earth and works <strong>interdependently</strong>. It is a system of closely knit networks that sustains the entire ecosystem.</p>
            <p>India has one of the <strong>world's largest biodiversity</strong> systems — yet <strong>10% of its recorded wild flora</strong> and <strong>20% of its mammals</strong> are already on the threatened list.</p>
          </div>

          {/* IUCN Species */}
          <div className="section-label">IUCN Classification</div>
          <h2 className="section-title">Types of <span className="accent">Species</span></h2>
          <div className="species-grid">
            {[
              { badge:"Normal",      cls:"badge-normal",     title:"Normal Species",     desc:"Population levels are adequate for survival in the wild.",                                                   eg:"Pine, rodents" },
              { badge:"Endangered",  cls:"badge-endangered",  title:"Endangered Species", desc:"In danger of extinction — will decline if present conditions continue.",                                     eg:"Crocodile, rhino, lion-tailed macaque" },
              { badge:"Vulnerable",  cls:"badge-vulnerable",  title:"Vulnerable Species", desc:"At risk of moving into the endangered category in the near future.",                                        eg:"Asiatic elephant, dolphin, blue sheep" },
              { badge:"Rare",        cls:"badge-rare",        title:"Rare Species",       desc:"Small populations that could become endangered or vulnerable if conditions persist.",                        eg:"Asiatic buffalo, hornbill" },
              { badge:"Endemic",     cls:"badge-endemic",     title:"Endemic Species",    desc:"Found only within a limited geographical area and nowhere else on Earth.",                                  eg:"Andaman teal, Nicobar pigeon, Andaman wild pig, Mithun (Arunachal Pradesh)" },
              { badge:"Extinct",     cls:"badge-extinct",     title:"Extinct Species",    desc:"No longer found in areas where they were previously known to exist.",                                       eg:"Asiatic cheetah, pink-headed duck" },
            ].map((s,i) => (
              <div className="species-card" key={i}>
                <div className={`species-badge ${s.cls}`}>{s.badge}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
                <div className="species-eg">e.g. {s.eg}</div>
              </div>
            ))}
          </div>

          <hr className="divider" />

          {/* Degradation */}
          <div className="section-label">Human Impact</div>
          <h2 className="section-title">Causes of Environmental <span className="accent">Degradation</span></h2>
          <div className="stats-row">
            <div className="stat-box"><div className="stat-num">26,200</div><div className="stat-label">sq. km. of forest converted to agricultural land (1951–1980)</div></div>
            <div className="stat-box"><div className="stat-num">5,000+</div><div className="stat-label">sq. km. of forest cleared for river valley projects since 1951</div></div>
            <div className="stat-box"><div className="stat-num">40,000</div><div className="stat-label">hectares cleared for Narmada Sagar Project alone</div></div>
          </div>
          <div className="alert-red">
            <h3>⚠️ Key Causes of Flora & Fauna Depletion</h3>
            <ul>
              <li>Forest land converted to agriculture — <strong>shifting cultivation (jhum)</strong> in northeastern and central tribal belts</li>
              <li><strong>River valley projects</strong> requiring massive forest clearance since 1951</li>
              <li><strong>Large-scale mining</strong> — e.g., dolomite mining threatening Buxa Tiger Reserve, West Bengal</li>
              <li>Poaching, hunting, over-exploitation, <strong>forest fires</strong>, and pollution</li>
              <li><strong>Overpopulation</strong> in developing countries placing immense pressure on natural resources</li>
            </ul>
          </div>

          <hr className="divider" />

          {/* Conservation */}
          <div className="section-label">Government Action</div>
          <h2 className="section-title">Conservation of Forest <span className="green">& Wildlife</span></h2>
          <div className="info-box" style={{borderLeftColor:'#16a34a'}}>
            <h4>🛡️ Indian Wildlife (Protection) Act, 1972</h4>
            <p>Landmark legislation making various provisions for protecting habitats across India — the legal backbone of wildlife conservation in the country.</p>
          </div>
          <div className="info-box" style={{borderLeftColor:'#16a34a'}}>
            <h4>🦋 Wildlife Acts of 1980 & 1986</h4>
            <p>Added several hundred butterflies, moths, beetles, and one dragonfly to the list of legally protected species in India.</p>
          </div>
          <div className="info-box" style={{borderLeftColor:'#16a34a', marginBottom:'48px'}}>
            <h4>🐘 Partial & Full Legal Protection</h4>
            <p>Extended to Indian elephant, black buck, snow leopard, and several other species to prevent extinction.</p>
          </div>

          {/* Project Tiger */}
          <div className="section-label">Flagship Programme</div>
          <h2 className="section-title">Project <span className="accent">Tiger — 1973</span></h2>
          <div className="tiger-card">
            <h3>🐯 From 55,000 to 1,827 — A Crisis That Demanded Action</h3>
            <p>By 1973, India's tiger population had plunged from an estimated <strong>55,000 to just 1,827</strong> — driven by habitat loss, relentless poaching, depletion of prey, and illegal trade of tiger skins and bones used in traditional Asian medicines.</p>
            <p>Launched in <strong>1973</strong>, Project Tiger was not just about saving tigers — it was about <strong>preserving entire biotypes</strong> and the ecosystems they anchor.</p>
          </div>

          <div className="section-label">Tiger Reserves</div>
          <h2 className="section-title">Major Tiger <span className="accent">Reserves in India</span></h2>
          <div className="reserves-grid">
            {[
              { name:"Corbett National Park",      state:"Uttarakhand" },
              { name:"Sunderbans National Park",   state:"West Bengal" },
              { name:"Bandhavgarh National Park",  state:"Madhya Pradesh" },
              { name:"Sariska Wildlife Sanctuary", state:"Rajasthan" },
              { name:"Manas Tiger Reserve",        state:"Assam" },
              { name:"Periyar Tiger Reserve",      state:"Kerala" },
            ].map((r,i) => (
              <div className="reserve-item" key={i}>
                <h4>🐾 {r.name}</h4>
                <p>{r.state}</p>
              </div>
            ))}
          </div>

          <hr className="divider" />

          {/* Forest Types */}
          <div className="section-label">Classification</div>
          <h2 className="section-title">Types of <span className="green">Forests</span></h2>
          <div className="forest-grid">
            {[
              { num:"Type 01", title:"Reserved Forests",  desc:"Most vital for conservation. About half of total forest land is under this category — highest legal protection." },
              { num:"Type 02", title:"Protected Forests", desc:"One-third of total forest area declared by the Forest Department — protected from further depletion or encroachment." },
              { num:"Type 03", title:"Unclassed Forests", desc:"Owned by private individuals, government, or communities. Mostly includes forests and wasteland with varying protection." },
            ].map((f,i) => (
              <div className="forest-card" key={i}>
                <div className="forest-num">{f.num}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="info-box" style={{borderLeftColor:'#16a34a', marginBottom:'56px'}}>
            <h4>📌 Permanent Forests</h4>
            <p>Reserved Forests + Protected Forests = <strong>Permanent Forests</strong> — maintained for collecting timber and natural products under government regulation.</p>
          </div>

          {/* Community Conservation */}
          <div className="section-label">People Power</div>
          <h2 className="section-title">Community & <span className="accent">Conservation</span></h2>
          <div className="community-grid">
            {[
              { icon:"⚖️", title:"Sariska Tiger Reserve, Rajasthan",     desc:"Villagers fought against illegal mining by citing the Wildlife Protection Act — a landmark example of community-led legal conservation action." },
              { icon:"🌲", title:"Bhairodev Dakav 'Sonchuri'",            desc:"Five villages in Alwar, Rajasthan declared 1,200 hectares of forest as a self-governed protected zone with strict anti-hunting rules." },
              { icon:"🙏", title:"Sacred Groves",                         desc:"Religious beliefs have preserved several virgin forests in pristine form. These 'forests of Gods and Goddesses' harbour a wealth of rare species." },
              { icon:"🌺", title:"Tribal Worship Traditions",             desc:"Mundas and Santhals worship Mahua; Odisha & Bihar tribes revere tamarind and mango at weddings; peepal is sacred in Hindu society." },
              { icon:"🦚", title:"Bishnoi Villages, Rajasthan",           desc:"Blackbuck, peacocks, and nilgai are considered sacred and integral to Bishnoi culture — never harmed, making villages natural sanctuaries." },
              { icon:"🤝", title:"Joint Forest Management (JFM)",         desc:"A programme involving local communities in restoring and managing forests. First launched in Odisha in 1988 — now a national model." },
            ].map((c,i) => (
              <div className="community-card" key={i}>
                <div className="community-icon">{c.icon}</div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Movements */}
          <div className="section-label">Conservation Movements</div>
          <h2 className="section-title">People-Led <span className="green">Movements</span></h2>
          <div className="info-box" style={{borderLeftColor:'#16a34a'}}>
            <h4>🌳 Chipko Movement</h4>
            <p>Successfully saved forests by rallying communities to protect trees from being felled. Became a powerful symbol of environmental activism and inspired many follow-up conservation programmes across India.</p>
          </div>
          <div className="info-box" style={{borderLeftColor:'#16a34a', marginBottom:'0'}}>
            <h4>🌾 Beej Bachao Andolan — Tehri & Navdanya</h4>
            <p>Promoted stopping synthetic chemicals by demonstrating that sufficient crop yields are achievable without chemical fertilizers — championing traditional and organic farming methods.</p>
          </div>

          <hr className="divider" />

          {/* FAQ */}
          <div className="faq-label">Practice Questions</div>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div className={`faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="faq-q" onClick={() => toggle(i)}>
                <span className="faq-q-text">Q{i+1}. {faq.q}</span>
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
