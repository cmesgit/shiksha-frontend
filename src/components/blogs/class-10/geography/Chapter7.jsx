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
    --accent:    #0f766e;
    --accent2:   #0d6b63;
    --surface:   #f0fdfa;
    --card:      #ffffff;
    --border:    #99f6e4;
    --border-lt: #ccfbf1;
    --tag-bg:    #f0fdfa;
    --green:     #15803d;
    --green-bg:  #f0fdf4;
    --green-bd:  #86efac;
    --blue:      #0369a1;
    --blue-bg:   #f0f9ff;
    --blue-bd:   #bae6fd;
    --amber:     #b45309;
    --amber-bg:  #fffbeb;
    --amber-bd:  #fde68a;
    --purple:    #7c3aed;
    --purple-bg: #faf5ff;
    --purple-bd: #ddd6fe;
  }

  .blog-root {
    font-family: 'Inter', sans-serif;
    background: #f7fffe;
    color: var(--ink);
    min-height: 100vh;
  }

  /* ── Hero ── */
  .chapter7-hero {
  background: linear-gradient(135deg, #012e28 0%, #065f52 45%, #0f766e 100%);
  padding: 80px 24px 96px;
  position: relative;
  overflow: hidden;
}

.chapter7-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 10% 65%, rgba(20, 184, 166, 0.14) 0%, transparent 55%),
    radial-gradient(circle at 88% 20%, rgba(15, 118, 110, 0.2) 0%, transparent 50%);
}

.chapter7-hero-inner {
  max-width: 820px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.chapter7-hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(20, 184, 166, 0.15);
  border: 1px solid rgba(20, 184, 166, 0.3);
  color: #5eead4;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 100px;
  margin-bottom: 28px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.chapter7-hero-title {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(36px, 6vw, 62px);
  font-weight: 900;
  line-height: 1.08;
  color: #ffffff;
  margin: 0 0 20px;
  letter-spacing: -0.02em;
}

.chapter7-hero-title span {
  color: #5eead4;
}

.chapter7-hero-sub {
  font-family: "Poppins", sans-serif;
  font-size: 17px;
  font-weight: 500;
  color: #99f6e4;
  line-height: 1.7;
  max-width: 620px;
  margin: 0 0 40px;
}

.chapter7-hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}

.chapter7-meta-chip {
  color: #5eead4;
  font-size: 14px;
  font-weight: 500;
}

.chapter7-meta-dot {
  width: 4px;
  height: 4px;
  background: #5eead4;
  border-radius: 50%;
  display: inline-block;
}
 

  /* ── Body ── */
  .body-wrap {
    max-width: 820px;
    margin: 0 auto;
    padding: 64px 24px 80px;
  }

  /* ── Intro card ── */
  .definition-card {
    background: linear-gradient(135deg, #012e28, #065f52);
    border-radius: 20px;
    padding: 40px 44px;
    margin-bottom: 64px;
    position: relative; overflow: hidden;
  }
  .definition-card::after {
    content: '🛣️';
    position: absolute; top: 10px; right: 28px;
    font-size: 110px; opacity: 0.07; line-height: 1;
  }
  .definition-card p {
    font-family: 'Poppins', sans-serif;
    font-size: 19px; font-weight: 500;
    color: #99f6e4; line-height: 1.75;
    margin: 0 0 16px; position: relative; z-index: 1;
  }
  .definition-card p:last-child { margin: 0; }
  .definition-card strong { color: #5eead4; }

  /* ── Def boxes inside intro card ── */
  .def-row {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 14px; margin-top: 24px;
    position: relative; z-index: 1;
  }
  @media (max-width: 640px) { .def-row { grid-template-columns: 1fr; } }
  .def-box {
    background: rgba(20,184,166,0.12);
    border: 1px solid rgba(20,184,166,0.25);
    border-radius: 14px; padding: 18px 20px;
  }
  .def-box h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    color: #5eead4;
    text-transform: uppercase; letter-spacing: 0.06em;
    margin: 0 0 6px;
  }
  .def-box p {
    font-family: 'Inter', sans-serif;
    font-size: 14px !important;
    color: #99f6e4 !important;
    line-height: 1.6 !important;
    margin: 0 !important;
  }

  /* ── Stat row ── */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 16px; margin-bottom: 56px;
  }
  .stat-box {
    background: linear-gradient(135deg, #012e28, #065f52);
    border-radius: 16px; padding: 28px 22px; text-align: center;
  }
  .stat-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 28px; font-weight: 900;
    color: #5eead4; margin-bottom: 6px;
  }
  .stat-label {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 600;
    color: #99f6e4; line-height: 1.45;
  }

  /* ── Section labels & titles ── */
  .section-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 700; color: var(--accent);
    letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 10px;
  }
  .section-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(26px, 4vw, 36px); font-weight: 800;
    color: var(--ink); line-height: 1.2;
    margin: 0 0 32px; letter-spacing: -0.01em;
  }
  .section-title .accent  { color: var(--accent); }
  .section-title .green   { color: var(--green); }
  .section-title .blue    { color: var(--blue); }
  .section-title .amber   { color: var(--amber); }
  .section-title .purple  { color: var(--purple); }

  /* ── Road class cards (like season cards) ── */
  .road-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 18px; margin-bottom: 32px;
  }
  .road-card { border-radius: 18px; padding: 28px 24px; border: 1.5px solid; }
  .road-card.golden  { background: #fffbeb; border-color: #fde68a; }
  .road-card.national{ background: var(--blue-bg); border-color: var(--blue-bd); }
  .road-card.state   { background: var(--green-bg); border-color: var(--green-bd); }
  .road-card.district{ background: var(--surface); border-color: var(--border); }
  .road-card.border  { background: #fff1f2; border-color: #fecdd3; }
  .road-card.other   { background: var(--purple-bg); border-color: var(--purple-bd); }
  .road-badge {
    display: inline-block;
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    padding: 4px 14px; border-radius: 100px;
    text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 12px;
  }
  .road-card.golden   .road-badge { background: #fde68a; color: #78350f; }
  .road-card.national .road-badge { background: var(--blue-bd); color: #1e3a8a; }
  .road-card.state    .road-badge { background: var(--green-bd); color: #14532d; }
  .road-card.district .road-badge { background: var(--border); color: #0d6b63; }
  .road-card.border   .road-badge { background: #fecdd3; color: #9f1239; }
  .road-card.other    .road-badge { background: var(--purple-bd); color: #581c87; }
  .road-card h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 700; margin: 0 0 10px;
  }
  .road-card.golden   h3 { color: #92400e; }
  .road-card.national h3 { color: var(--blue); }
  .road-card.state    h3 { color: var(--green); }
  .road-card.district h3 { color: var(--accent); }
  .road-card.border   h3 { color: #be123c; }
  .road-card.other    h3 { color: var(--purple); }
  .road-card p { font-size: 15px; line-height: 1.7; color: #374151; margin: 0; }

  /* ── Info box ── */
  .info-box {
    background: var(--card);
    border-left: 4px solid var(--accent);
    border-radius: 0 12px 12px 0;
    padding: 22px 26px; margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  }
  .info-box h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; font-weight: 700;
    color: var(--ink); margin: 0 0 8px;
  }
  .info-box p { font-size: 15px; line-height: 1.7; color: #374151; margin: 0; }

  /* ── Transport cards (like industry cards) ── */
  .transport-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 18px; margin-bottom: 40px;
  }
  .transport-card {
    background: var(--card);
    border: 1.5px solid var(--border-lt);
    border-radius: 16px; padding: 28px 24px;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .transport-card:hover { box-shadow: 0 6px 24px rgba(15,118,110,0.12); transform: translateY(-2px); }
  .transport-emoji { font-size: 30px; margin-bottom: 12px; }
  .transport-card h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 700;
    color: var(--ink); margin: 0 0 10px;
  }
  .transport-card ul { padding-left: 18px; margin: 0; }
  .transport-card ul li {
    font-size: 15px; line-height: 1.7;
    color: #374151; margin-bottom: 5px;
  }
  .transport-card ul li:last-child { margin: 0; }

  /* ── Highlight card ── */
  .highlight-card {
    border-radius: 18px; padding: 32px 36px;
    margin-bottom: 32px; border: 1.5px solid;
  }
  .highlight-card.green  { background: var(--green-bg); border-color: var(--green-bd); }
  .highlight-card.amber  { background: var(--amber-bg); border-color: var(--amber-bd); }
  .highlight-card.blue   { background: var(--blue-bg);  border-color: var(--blue-bd); }
  .highlight-card.teal   { background: var(--surface);  border-color: var(--border); }
  .highlight-card.purple { background: var(--purple-bg); border-color: var(--purple-bd); }
  .highlight-card h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px; font-weight: 800; margin: 0 0 14px;
  }
  .highlight-card.green  h3 { color: var(--green); }
  .highlight-card.amber  h3 { color: var(--amber); }
  .highlight-card.blue   h3 { color: var(--blue); }
  .highlight-card.teal   h3 { color: var(--accent); }
  .highlight-card.purple h3 { color: var(--purple); }
  .highlight-card p { font-size: 16px; line-height: 1.75; color: #374151; margin: 0 0 10px; }
  .highlight-card p:last-child { margin: 0; }
  .highlight-card ul { padding-left: 20px; margin: 8px 0 0; }
  .highlight-card ul li { font-size: 15px; line-height: 1.7; color: #374151; margin-bottom: 6px; }
  .highlight-card ul li:last-child { margin: 0; }

  /* ── Waterway / port mineral cards ── */
  .mineral-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 18px; margin-bottom: 32px;
  }
  .mineral-card {
    background: var(--card);
    border: 1.5px solid var(--border-lt);
    border-radius: 16px; padding: 26px 24px;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .mineral-card:hover { box-shadow: 0 6px 24px rgba(15,118,110,0.1); transform: translateY(-2px); }
  .mineral-top { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
  .mineral-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; flex-shrink: 0;
    background: var(--tag-bg); border: 1px solid var(--border);
  }
  .mineral-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; font-weight: 700;
    color: var(--ink); margin: 0 0 3px;
  }
  .mineral-type {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 600;
    color: var(--muted); text-transform: uppercase; letter-spacing: 0.07em;
  }
  .mineral-card p { font-size: 15px; line-height: 1.7; color: #374151; margin: 0 0 12px; }
  .badge-row { display: flex; flex-wrap: wrap; gap: 8px; }
  .badge {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 600;
    padding: 4px 12px; border-radius: 100px; border: 1px solid;
  }
  .badge.teal   { color: var(--accent);  border-color: var(--border);    background: var(--surface); }
  .badge.green  { color: var(--green);   border-color: var(--green-bd);  background: var(--green-bg); }
  .badge.blue   { color: var(--blue);    border-color: var(--blue-bd);   background: var(--blue-bg); }
  .badge.amber  { color: var(--amber);   border-color: var(--amber-bd);  background: var(--amber-bg); }
  .badge.purple { color: var(--purple);  border-color: var(--purple-bd); background: var(--purple-bg); }

  /* ── Distribution table ── */
  .dist-table-wrap {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 16px; overflow: hidden;
    margin-bottom: 40px;
  }
  .dist-table-head {
    background: var(--tag-bg);
    padding: 16px 24px; border-bottom: 1.5px solid var(--border);
    display: flex; align-items: center; gap: 10px;
  }
  .dist-table-head span {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 700; color: var(--accent2);
  }
  table { width: 100%; border-collapse: collapse; }
  thead th {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 700; color: var(--accent2);
    text-transform: uppercase; letter-spacing: 0.08em;
    padding: 12px 24px; text-align: left;
    background: var(--surface); border-bottom: 1.5px solid var(--border-lt);
  }
  tbody td {
    font-family: 'Inter', sans-serif;
    font-size: 15px; color: #374151;
    padding: 13px 24px; border-bottom: 1px solid var(--border-lt);
  }
  tbody tr:last-child td { border-bottom: none; }
  tbody tr:hover td { background: var(--surface); }
  .td-bold { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ink); }

  /* ── Trade balance cards ── */
  .trade-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 20px; margin-bottom: 32px;
  }
  @media (max-width: 600px) { .trade-grid { grid-template-columns: 1fr; } }
  .trade-card { border-radius: 18px; padding: 28px 24px; border: 1.5px solid; }
  .trade-card.fav   { background: var(--green-bg); border-color: var(--green-bd); }
  .trade-card.unfav { background: #fff1f2; border-color: #fecdd3; }
  .trade-card h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 700; margin: 0 0 10px;
  }
  .trade-card.fav   h3 { color: var(--green); }
  .trade-card.unfav h3 { color: #be123c; }
  .trade-card p { font-size: 15px; line-height: 1.7; color: #374151; margin: 0; }

  /* ── Tourism cards ── */
  .tourism-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 14px; margin-bottom: 48px;
  }
  .tourism-box {
    background: var(--amber-bg);
    border: 1.5px solid var(--amber-bd);
    border-radius: 14px; padding: 20px 18px; text-align: center;
  }
  .tourism-icon { font-size: 28px; margin-bottom: 10px; }
  .tourism-box h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 700; color: var(--amber); margin: 0;
  }

  /* ── Divider ── */
  .divider { border: none; border-top: 2px solid var(--border-lt); margin: 56px 0; }

  /* ── FAQ ── */
  .faq-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 700; color: var(--accent);
    letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 10px;
  }
  .faq-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(26px, 4vw, 36px); font-weight: 800;
    color: var(--ink); margin: 0 0 40px; letter-spacing: -0.01em;
  }
  .faq-item {
    border: 1.5px solid var(--border-lt); border-radius: 16px;
    margin-bottom: 14px; overflow: hidden; background: var(--card);
    transition: box-shadow 0.2s;
  }
  .faq-item.open { box-shadow: 0 4px 20px rgba(15,118,110,0.12); border-color: var(--accent); }
  .faq-q {
    width: 100%; text-align: left; background: none; border: none; cursor: pointer;
    padding: 22px 26px; display: flex; justify-content: space-between;
    align-items: flex-start; gap: 16px;
  }
  .faq-q-text {
    font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 600;
    color: var(--ink); line-height: 1.5; text-align: left;
  }
  .faq-item.open .faq-q-text { color: var(--accent2); }
  .faq-icon {
    width: 28px; height: 28px; background: var(--tag-bg); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; color: var(--accent2); font-size: 18px; font-weight: 700;
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
    .road-grid, .transport-grid, .mineral-grid, .tourism-grid { grid-template-columns: 1fr; }
  }
`;

const faqs = [
  {
    q: "Why are roads preferred over railways in India for transportation?",
    a: (<>
      <p>Roads are preferred over railways for several reasons:</p>
      <ul>
        <li>Roads are <strong>much cheaper to build</strong> than rail lines</li>
        <li>Roads can <strong>negotiate higher slopes</strong> and can be built through mountains like the Himalayas</li>
        <li>Roads cover <strong>geographically difficult areas</strong> where railways cannot be built</li>
        <li>Roads offer <strong>door-to-door service</strong> — goods can be transported directly to the destination</li>
        <li><strong>Highway transportation is economical</strong> for short and medium distances</li>
        <li>Roads <strong>connect railway stations, airports, and seaports</strong>, acting as a feeder network</li>
      </ul>
    </>),
  },
  {
    q: "What are the six classes of roads in India?",
    a: (<ul>
      <li><strong>Golden Quadrilateral Super Highways:</strong> Connects Delhi, Kolkata, Chennai, Mumbai — built and maintained by NHAI</li>
      <li><strong>National Highways:</strong> Major highways maintained by Central PWD; NH-1 (Delhi–Amritsar) is the historic Sher-Shah Suri Marg</li>
      <li><strong>State Highways:</strong> Connect state capital to district headquarters; maintained by State PWD</li>
      <li><strong>District Roads:</strong> Connect district headquarters to other locations; managed by Zila Parishad</li>
      <li><strong>Other Roads:</strong> Rural roads connecting villages and towns to cities; boosted by Pradhan Mantri Grameen Sadak Yojana</li>
      <li><strong>Border Roads:</strong> Built and maintained by Border Roads Organization (est. 1960) in northern and northeastern border regions</li>
    </ul>),
  },
  {
    q: "What is the Golden Quadrilateral? Who maintains it?",
    a: (<p>The <strong>Golden Quadrilateral</strong> is a system of super highways connecting India's four main metropolitan cities — <strong>Delhi, Kolkata, Chennai, and Mumbai</strong>. It forms a quadrilateral shape on the map. These road projects are delivered and maintained through the <strong>National Highway Authority of India (NHAI)</strong>.</p>),
  },
  {
    q: "What are metalled and unmetalled roads?",
    a: (<>
      <p><strong>Metalled roads</strong> are paved roads made from cement, concrete, or coal bitumen. They are <strong>all-season highways</strong> — usable throughout the year including the rainy season.</p>
      <p><strong>Unmetalled roads</strong> are unpaved roads that <strong>become unusable during the rainy season</strong> as they get muddy and waterlogged. These are found mainly in rural and remote areas.</p>
    </>),
  },
  {
    q: "What problems does railway transportation face in India?",
    a: (<ul>
      <li><strong>Sandy plains:</strong> Railroad lines on sandy desert plains are difficult to establish and maintain</li>
      <li><strong>Peninsular hilly terrain:</strong> Tracks must be laid across low hills, interstices (gaps), and tunnels — expensive and complex</li>
      <li><strong>Himalayan regions:</strong> High elevations, low population, and lack of economic opportunities make railway construction unfavourable</li>
      <li><strong>Wide river crossings:</strong> Bridge construction across wide river beds is necessary and very costly</li>
    </ul>),
  },
  {
    q: "What are pipelines used for in India?",
    a: (<>
      <p>The pipeline system uses underground pipes for the <strong>transportation and distribution of fluids</strong>. In India, pipelines are used to transport:</p>
      <ul>
        <li>Water, crude oil, and petroleum products</li>
        <li>Natural gas to power plants and fertilizer factories</li>
        <li>Solids (processed into slurry/manure form) can also be transported via pipelines</li>
      </ul>
      <p>The three major pipeline networks are:</p>
      <ul>
        <li><strong>Hazira (Gujarat) → Jagdishpur (UP)</strong></li>
        <li><strong>Salaya (Gujarat) → Jalandhar (Punjab)</strong></li>
        <li><strong>Upper Assam oil fields → Kanpur (UP)</strong></li>
      </ul>
    </>),
  },
  {
    q: "Why are waterways considered the best mode of transport for heavy goods?",
    a: (<p>Waterways are the <strong>least expensive method of transportation</strong> and most suitable for transporting <strong>large and heavy goods</strong>. They are <strong>energy efficient and environmentally friendly</strong> compared to road and rail. They require no construction of tracks or roads — natural rivers and coastal routes serve as the transport network.</p>),
  },
  {
    q: "Name the national waterways of India.",
    a: (<ul>
      <li><strong>N.W. No. 1:</strong> Ganga river between Allahabad and Haldia — 1620 km</li>
      <li><strong>N.W. No. 2:</strong> Brahmaputra river between Sadiya and Dhubri — 891 km</li>
      <li><strong>N.W. No. 3:</strong> West-Coast Canal in Kerala (Kottapurma–Kollam, Udyogamandal and Champakkara canals) — 205 km</li>
      <li><strong>N.W. No. 4:</strong> Godavari and Krishna rivers with Kakinada–Puducherry canal stretch — 1078 km</li>
      <li><strong>N.W. No. 5:</strong> Brahmani river, Matai river, Mahanadi and Brahmani delta channels and East Coast Canal — 588 km</li>
    </ul>),
  },
  {
    q: "Name the major seaports of India and their specialities.",
    a: (<ul>
      <li><strong>Mumbai</strong> — Largest harbour with a natural and well-protected harbour</li>
      <li><strong>Marmagao (Goa)</strong> — India's most important iron ore exporting port</li>
      <li><strong>Kandla (Kachchh)</strong> — First harbour developed post-independence; also called Port of Deendayal</li>
      <li><strong>Kochchi</strong> — Located at the entrance to a lagoon on the southwest coast</li>
      <li><strong>Mangalore (Karnataka)</strong> — Handles export of iron ore</li>
      <li><strong>Chennai</strong> — One of the oldest manmade harbours in India</li>
      <li><strong>Tuticorin</strong> — Located at the extreme southeast of India</li>
      <li><strong>Kolkata</strong> — An interior river harbour</li>
      <li><strong>Visakhapatnam</strong> — The deepest, enclosed, and well-protected port</li>
      <li><strong>Paradwip (Odisha)</strong> — Specialises in exporting iron ore</li>
      <li><strong>Haldia</strong> — Developed as a subsidiary port to ease pressure on Kolkata port</li>
    </ul>),
  },
  {
    q: "What are the advantages and disadvantages of air transport?",
    a: (<>
      <p><strong>Advantages:</strong></p>
      <ul>
        <li>The <strong>quickest, most comfortable, and most prestigious</strong> mode of transport</li>
        <li>Facilitates access to <strong>high mountains, bleak deserts, dense forests, and long ocean routes</strong></li>
        <li>Air India provides both <strong>domestic and international</strong> services</li>
        <li>Pawan Hans Helicopters provides services in <strong>inaccessible and difficult terrain</strong> including offshore oil and gas areas</li>
      </ul>
      <p><strong>Disadvantage:</strong> Air travel is <strong>very expensive</strong> — not accessible for ordinary people. It was nationalised in 1953.</p>
    </>),
  },
  {
    q: "What is international trade? What is a trade balance?",
    a: (<>
      <p><strong>International trade</strong> is the trade of goods and services between different countries. It is regarded as the <strong>national economic barometer</strong> — reflecting the economic health of a country.</p>
      <ul>
        <li><strong>Favourable trade balance:</strong> When the value of <strong>exports exceeds</strong> the value of imports</li>
        <li><strong>Unfavourable trade balance:</strong> When the value of <strong>imports is greater</strong> than the value of exports</li>
      </ul>
    </>),
  },
  {
    q: "What are India's major exports and imports?",
    a: (<>
      <p><strong>Major Exports from India:</strong> Precious stones and jewellery, chemicals and related products, agriculture and related products.</p>
      <p><strong>Major Imports into India:</strong> Crude oil and petroleum products, gemstones and jewellery, chemicals and related products, base metals, electronic goods, machinery, and agriculture and related products.</p>
    </>),
  },
  {
    q: "How does tourism act as a trade? What are its benefits?",
    a: (<>
      <p>Over <strong>15 million people</strong> contribute directly to the tourism industry in India. Tourism acts as a trade by generating foreign exchange and creating employment. Its benefits include:</p>
      <ul>
        <li>Helps develop <strong>international understanding</strong> of Indian culture and heritage</li>
        <li>International tourists visit India for <strong>heritage, ecotourism, adventure, cultural, medical, and business tourism</strong></li>
        <li><strong>Encourages national integration</strong> by bringing people from different regions together</li>
        <li>Supports <strong>local craftwork and cultural activities</strong> — sustaining traditional arts and livelihoods</li>
      </ul>
    </>),
  },
  {
    q: "What is the postal system in India and how does it work?",
    a: (<>
      <p>India has the <strong>largest postal service in the world</strong>. It handles parcels and personal written communications.</p>
      <ul>
        <li><strong>First-class mail:</strong> Cards and envelopes — carried by air between stations</li>
        <li><strong>Second-class mail:</strong> Book packages, recorded journals, and periodicals — transported by land and marine routes</li>
      </ul>
    </>),
  },
  {
    q: "What is the Border Roads Organisation and why was it established?",
    a: (<p>The <strong>Border Roads Organisation (BRO)</strong> was established in <strong>1960</strong> to build and maintain strategically important roads in the <strong>northern and northeastern border regions</strong> of India. These roads are critical for national defence and for connecting remote border areas with the rest of the country. BRO also helps in maintaining access during emergencies in these difficult terrains.</p>),
  },
];

export default function LifelinesOfNationalEconomy() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="blog-root">

        {/* HERO */}
      <div className="chapter7-hero">
  <div className="chapter7-hero-inner">
    <div className="chapter7-hero-tag">📚 Class 10 · Social Science · Geography</div>
    <h1 className="chapter7-hero-title">Lifelines of <span>National Economy</span></h1>
    <p className="chapter7-hero-sub">
      Chapter 7 — Complete revision notes covering roadways, railways, pipelines, waterways, airways, international trade, and tourism as a trade.
    </p>
    <div className="chapter7-hero-meta">
      <span className="chapter7-meta-chip">🛣️ Geography</span>
      <span className="chapter7-meta-dot" />
      <span className="chapter7-meta-chip">📖 Revision Notes</span>
      <span className="chapter7-meta-dot" />
      <span className="chapter7-meta-chip">❓ 15 FAQs Included</span>
    </div>
  </div>
</div>

        <div className="body-wrap">

          {/* Intro */}
          <div className="definition-card">
            <p>Transport, communication, and trade are the <strong>lifelines of a nation's economy</strong> — they connect people, resources, and markets across the country and the world.</p>
            <p>There are three important areas of our planet where we can move goods and services — <strong>land, water, and air</strong> — forming the three pillars of India's transportation network.</p>
            <div className="def-row">
              <div className="def-box">
                <h4>🚗 Land</h4>
                <p>Roads and railways — the backbone of internal movement of goods and people across the country.</p>
              </div>
              <div className="def-box">
                <h4>🌊 Water</h4>
                <p>Rivers, canals, and sea routes — cheapest and most energy-efficient mode for heavy goods.</p>
              </div>
              <div className="def-box">
                <h4>✈️ Air</h4>
                <p>Fastest mode of transport — connects remote regions including mountains, deserts, and forests.</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-box"><div className="stat-num">54.7L</div><div className="stat-label">Kilometres of road network in India — one of the world's largest</div></div>
            <div className="stat-box"><div className="stat-num">1620</div><div className="stat-label">Km — longest national waterway (NW-1) along the Ganga</div></div>
            <div className="stat-box"><div className="stat-num">1953</div><div className="stat-label">Year air transport was nationalised in India</div></div>
            <div className="stat-box"><div className="stat-num">15M+</div><div className="stat-label">People directly contributing to India's tourism industry</div></div>
          </div>

          <hr className="divider" />

          {/* Roadways */}
          <div className="section-label">Roadways</div>
          <h2 className="section-title">India's Road <span className="accent">Network</span></h2>

          <div className="info-box" style={{borderLeftColor:'#0f766e', marginBottom:'28px'}}>
            <h4>🛣️ Why Roads Over Railways?</h4>
            <p>Roads are cheaper to build, can negotiate higher slopes, cover geographically difficult areas, offer <strong>door-to-door service</strong>, are economical for highway transport, and connect train stations, airports, and seaports.</p>
          </div>

          <div className="road-grid" style={{marginBottom:'40px'}}>
            <div className="road-card golden">
              <div className="road-badge">Super Highways</div>
              <h3>Golden Quadrilateral</h3>
              <p>Connects four main metropolitan cities — <strong>Delhi, Kolkata, Chennai, Mumbai</strong>. Built and maintained by the <strong>National Highway Authority of India (NHAI)</strong>.</p>
            </div>
            <div className="road-card national">
              <div className="road-badge">National</div>
              <h3>National Highways</h3>
              <p>Laid and maintained by the <strong>Central Public Works Department (CPWD)</strong>. <strong>NH-1 (Delhi–Amritsar)</strong> is the historic Sher-Shah Suri Marg.</p>
            </div>
            <div className="road-card state">
              <div className="road-badge">State</div>
              <h3>State Highways</h3>
              <p>Connect state capital to district headquarters. Built and maintained by the <strong>State Public Works Department (PWD)</strong>.</p>
            </div>
            <div className="road-card district">
              <div className="road-badge">District</div>
              <h3>District Roads</h3>
              <p>Connect district headquarters to other locations in the district. Managed by the <strong>Zila Parishad</strong>.</p>
            </div>
            <div className="road-card border">
              <div className="road-badge">Border</div>
              <h3>Border Roads</h3>
              <p>Built and maintained by the <strong>Border Roads Organisation (est. 1960)</strong> in northern and northeastern border regions for strategic importance.</p>
            </div>
            <div className="road-card other">
              <div className="road-badge">Rural</div>
              <h3>Other / Rural Roads</h3>
              <p>Connect rural areas and towns to cities. Received a strong boost under the <strong>Pradhan Mantri Grameen Sadak Yojana</strong>.</p>
            </div>
          </div>

          <div className="dist-table-wrap">
            <div className="dist-table-head"><span>🏗️ Types of Roads by Construction Material</span></div>
            <table>
              <thead><tr><th>Type</th><th>Material</th><th>All-Season?</th></tr></thead>
              <tbody>
                <tr><td className="td-bold">Metalled Roads</td><td>Cement, concrete, or coal bitumen</td><td>✅ Yes — usable year-round</td></tr>
                <tr><td className="td-bold">Unmetalled Roads</td><td>Unpaved / natural surface</td><td>❌ No — unusable during rainy season</td></tr>
              </tbody>
            </table>
          </div>

          <hr className="divider" />

          {/* Railways */}
          <div className="section-label">Railways</div>
          <h2 className="section-title">Rail Transport &amp; <span className="accent">Its Challenges</span></h2>

          <div className="info-box" style={{borderLeftColor:'#0f766e', marginBottom:'16px'}}>
            <h4>🚂 Role of Railways</h4>
            <p>Railways are the <strong>primary means of transport</strong> for transporting large loads and bulky goods over long and short distances in India. They have increased greatly in economic importance over time.</p>
          </div>

          <div className="highlight-card amber">
            <h3>⚠️ Problems Faced by Railway Transportation</h3>
            <ul>
              <li><strong>Sandy plains:</strong> Railroad lines on sandy desert plains are difficult to establish and maintain</li>
              <li><strong>Hilly peninsular terrain:</strong> Tracks must be laid across low hills, interstices, and tunnels — highly complex and expensive</li>
              <li><strong>Himalayan regions:</strong> High elevations, sparse population, and lack of economic opportunities make construction unfavourable</li>
              <li><strong>Wide rivers:</strong> Bridge construction across wide river beds is necessary and very costly</li>
            </ul>
          </div>

          <hr className="divider" />

          {/* Pipelines */}
          <div className="section-label">Pipelines</div>
          <h2 className="section-title">Pipeline <span className="accent">Transport Network</span></h2>

          <div className="info-box" style={{borderLeftColor:'#0f766e', marginBottom:'24px'}}>
            <h4>🔧 What Are Pipelines Used For?</h4>
            <p>Pipelines are usually underground and used to transport <strong>water, crude oil, petroleum products, natural gas, and fertilizers</strong> to power plants and industrial units. Even solids processed into slurry can be carried in a pipeline.</p>
          </div>

          <div className="mineral-grid" style={{marginBottom:'48px'}}>
            {[
              { icon:"⛽", name:"Hazira → Jagdishpur", type:"Pipeline Network 1", desc:"Connects Hazira in Gujarat to Jagdishpur in Uttar Pradesh.", badges:[{label:"Gujarat",cls:"teal"},{label:"Uttar Pradesh",cls:"teal"}] },
              { icon:"🛢️", name:"Salaya → Jalandhar",  type:"Pipeline Network 2", desc:"Connects Salaya in Gujarat to Jalandhar in Punjab.", badges:[{label:"Gujarat",cls:"teal"},{label:"Punjab",cls:"teal"}] },
              { icon:"🏭", name:"Assam → Kanpur",      type:"Pipeline Network 3", desc:"Runs from oil fields in upper Assam to Kanpur in Uttar Pradesh.", badges:[{label:"Assam",cls:"teal"},{label:"Kanpur, UP",cls:"teal"}] },
            ].map((m, i) => (
              <div className="mineral-card" key={i}>
                <div className="mineral-top">
                  <div className="mineral-icon">{m.icon}</div>
                  <div><h4>{m.name}</h4><div className="mineral-type">{m.type}</div></div>
                </div>
                <p>{m.desc}</p>
                <div className="badge-row">{m.badges.map(b => <span key={b.label} className={`badge ${b.cls}`}>{b.label}</span>)}</div>
              </div>
            ))}
          </div>

          <hr className="divider" />

          {/* Waterways */}
          <div className="section-label">Waterways</div>
          <h2 className="section-title">National <span className="blue">Waterways</span></h2>

          <div className="info-box" style={{borderLeftColor:'#0369a1', marginBottom:'24px'}}>
            <h4>🌊 Why Waterways?</h4>
            <p>Waterways are the <strong>least expensive method of transportation</strong>. Most suitable for large and heavy goods. They are <strong>energy efficient and environmentally friendly</strong> — requiring no roads, rails, or costly infrastructure to build.</p>
          </div>

          <div className="dist-table-wrap" style={{marginBottom:'32px'}}>
            <div className="dist-table-head"><span>🚢 National Waterways of India</span></div>
            <table>
              <thead><tr><th>Waterway</th><th>Route</th><th>Length</th></tr></thead>
              <tbody>
                <tr><td className="td-bold">N.W. No. 1</td><td>Ganga — Allahabad to Haldia</td><td>1620 km</td></tr>
                <tr><td className="td-bold">N.W. No. 2</td><td>Brahmaputra — Sadiya to Dhubri</td><td>891 km</td></tr>
                <tr><td className="td-bold">N.W. No. 3</td><td>West-Coast Canal, Kerala (Kottapurma–Kollam, Udyogamandal & Champakkara)</td><td>205 km</td></tr>
                <tr><td className="td-bold">N.W. No. 4</td><td>Godavari & Krishna rivers + Kakinada–Puducherry canal</td><td>1078 km</td></tr>
                <tr><td className="td-bold">N.W. No. 5</td><td>Brahmani + Matai rivers, Mahanadi & Brahmani delta, East Coast Canal</td><td>588 km</td></tr>
              </tbody>
            </table>
          </div>

          <div className="info-box" style={{borderLeftColor:'#0369a1', marginBottom:'48px'}}>
            <h4>🛶 Internal Waterways</h4>
            <p>Internal waterways in India include <strong>Mandavi, Zuari and Cumberjua rivers, Sunderbans, Barak river</strong>, and <strong>Kerala backwaters</strong> — all used for local waterborne transport.</p>
          </div>

          {/* Sea Ports */}
          <div className="section-label">Major Sea Ports</div>
          <h2 className="section-title">India's Key <span className="blue">Seaports</span></h2>

          <div className="mineral-grid">
            {[
              { icon:"⚓", name:"Mumbai",         type:"West Coast",  desc:"Largest harbour with a natural and well-protected harbour.", badges:[{label:"Largest Harbour",cls:"blue"}] },
              { icon:"⚓", name:"Marmagao (Goa)", type:"West Coast",  desc:"India's most important iron ore exporting port.", badges:[{label:"Iron Ore Export",cls:"amber"}] },
              { icon:"⚓", name:"Kandla (Kachchh)",type:"West Coast", desc:"First harbour developed post-independence. Also called Port of Deendayal.", badges:[{label:"1st Post-Independence",cls:"teal"}] },
              { icon:"⚓", name:"Kochchi",         type:"West Coast", desc:"Located at the entrance to a lagoon on the southwest extremity of India.", badges:[{label:"Lagoon Entrance",cls:"green"}] },
              { icon:"⚓", name:"Mangalore (Karnataka)", type:"West Coast", desc:"Handles the export of iron ore from Karnataka.", badges:[{label:"Iron Ore Export",cls:"amber"}] },
              { icon:"⚓", name:"Chennai",         type:"East Coast",  desc:"One of the oldest manmade harbours in India.", badges:[{label:"Oldest Manmade",cls:"purple"}] },
              { icon:"⚓", name:"Tuticorin",       type:"East Coast",  desc:"Located at the extreme southeast of India.", badges:[{label:"Extreme Southeast",cls:"teal"}] },
              { icon:"⚓", name:"Kolkata",         type:"East Coast",  desc:"An interior river harbour located upstream on the Hugli River.", badges:[{label:"Interior River Port",cls:"blue"}] },
              { icon:"⚓", name:"Visakhapatnam",   type:"East Coast",  desc:"The deepest, enclosed, and well-protected port in India.", badges:[{label:"Deepest Port",cls:"purple"}] },
              { icon:"⚓", name:"Paradwip (Odisha)",type:"East Coast", desc:"Specialises in the export of iron ore.", badges:[{label:"Iron Ore Export",cls:"amber"}] },
              { icon:"⚓", name:"Haldia",          type:"East Coast",  desc:"Developed as a subsidiary port to ease pressure on Kolkata port.", badges:[{label:"Subsidiary to Kolkata",cls:"teal"}] },
            ].map((m, i) => (
              <div className="mineral-card" key={i}>
                <div className="mineral-top">
                  <div className="mineral-icon">{m.icon}</div>
                  <div><h4>{m.name}</h4><div className="mineral-type">{m.type}</div></div>
                </div>
                <p>{m.desc}</p>
                <div className="badge-row">{m.badges.map(b => <span key={b.label} className={`badge ${b.cls}`}>{b.label}</span>)}</div>
              </div>
            ))}
          </div>

          <hr className="divider" />

          {/* Airways */}
          <div className="section-label">Airways</div>
          <h2 className="section-title">Air <span className="accent">Transport</span></h2>

          <div className="transport-grid">
            <div className="transport-card">
              <div className="transport-emoji">✈️</div>
              <h3>Air India</h3>
              <ul>
                <li>Provides <strong>domestic and international air services</strong></li>
                <li>Air transport was <strong>nationalised in 1953</strong></li>
                <li>The quickest, most comfortable, and most prestigious mode of transport</li>
                <li>Facilitates access to high mountains, deserts, forests, and oceans</li>
              </ul>
            </div>
            <div className="transport-card">
              <div className="transport-emoji">🚁</div>
              <h3>Pawan Hans Helicopters Ltd.</h3>
              <ul>
                <li>Provides <strong>helicopter services to ONGC</strong> for offshore oil and gas activities</li>
                <li>Operates in <strong>inaccessible and difficult terrain</strong></li>
                <li>Serves remote areas that fixed-wing aircraft cannot reach</li>
              </ul>
            </div>
          </div>

          <div className="highlight-card teal" style={{marginBottom:'48px'}}>
            <h3>⚠️ Limitation of Air Transport</h3>
            <p>Despite its advantages, air travel is <strong>very expensive</strong> and is not accessible for ordinary people. It remains a mode of transport primarily used by businesses and higher-income travellers.</p>
          </div>

          <hr className="divider" />

          {/* Communication */}
          <div className="section-label">Communication</div>
          <h2 className="section-title">Communication <span className="accent">Systems</span></h2>

          <div className="info-box" style={{borderLeftColor:'#0f766e', marginBottom:'16px'}}>
            <h4>📮 India's Postal Service</h4>
            <p>India has the <strong>largest postal service in the world</strong>. It handles parcels and personal written communications. <strong>First-class mail</strong> (cards and envelopes) is carried by air. <strong>Second-class mail</strong> (book packages, journals, periodicals) is transported by land and marine routes.</p>
          </div>
          <div className="info-box" style={{borderLeftColor:'#0f766e', marginBottom:'48px'}}>
            <h4>📺 Mass Communication</h4>
            <p>Individual and mass communication — including <strong>television, radio, press, and cinema</strong> — are the primary means of communication within the country. Long-range communication is now possible without the physical movement of the communicator or receiver.</p>
          </div>

          <hr className="divider" />

          {/* International Trade */}
          <div className="section-label">International Trade</div>
          <h2 className="section-title">Trade &amp; <span className="accent">Commerce</span></h2>

          <div className="info-box" style={{borderLeftColor:'#0f766e', marginBottom:'28px'}}>
            <h4>🌐 What is International Trade?</h4>
            <p>Trade of goods and services between different countries is called <strong>international trade</strong>. It is regarded as the <strong>national economic barometer</strong> — reflecting the economic strength of a country. Exports and imports are its building blocks.</p>
          </div>

          <div className="trade-grid" style={{marginBottom:'36px'}}>
            <div className="trade-card fav">
              <h3>✅ Favourable Trade Balance</h3>
              <p>When the <strong>value of exports exceeds the value of imports</strong>. This brings in more foreign currency than goes out — beneficial for the national economy.</p>
            </div>
            <div className="trade-card unfav">
              <h3>❌ Unfavourable Trade Balance</h3>
              <p>When the <strong>value of imports is greater than the value of exports</strong>. The country spends more foreign currency than it earns — a deficit situation.</p>
            </div>
          </div>

          <div className="highlight-card blue">
            <h3>📦 India's Exports &amp; Imports</h3>
            <p><strong>Major Exports from India:</strong> Precious stones and jewellery · Chemicals and related products · Agriculture and related products</p>
            <p><strong>Major Imports into India:</strong> Crude oil and petroleum products · Gemstones and jewellery · Chemicals · Base metals · Electronic goods · Machinery · Agriculture and related products</p>
          </div>

          <hr className="divider" />

          {/* Tourism */}
          <div className="section-label">Tourism as a Trade</div>
          <h2 className="section-title">Tourism &amp; <span className="amber">Its Role</span></h2>

          <div className="info-box" style={{borderLeftColor:'#b45309', marginBottom:'28px'}}>
            <h4>🌍 Tourism in India</h4>
            <p>Over <strong>15 million people</strong> contribute directly to the tourism industry. International tourists travel to India for <strong>heritage, ecotourism, adventure, cultural, medical, and business tourism</strong> — making it a significant source of foreign exchange and employment.</p>
          </div>

          <div className="tourism-grid">
            {[
              { icon:"🏛️", title:"Heritage Tourism" },
              { icon:"🌿", title:"Ecotourism" },
              { icon:"🧗", title:"Adventure Tourism" },
              { icon:"🎭", title:"Cultural Tourism" },
              { icon:"🏥", title:"Medical Tourism" },
              { icon:"💼", title:"Business Tourism" },
            ].map((t, i) => (
              <div className="tourism-box" key={i}>
                <div className="tourism-icon">{t.icon}</div>
                <h4>{t.title}</h4>
              </div>
            ))}
          </div>

          <div className="highlight-card green">
            <h3>🌟 Benefits of Tourism</h3>
            <ul>
              <li>Assists in developing <strong>international understanding</strong> of Indian culture and heritage</li>
              <li><strong>Encourages national integration</strong> — brings people of different regions together</li>
              <li>Supports <strong>local craftwork and cultural activities</strong> — sustaining traditional arts and rural livelihoods</li>
              <li>Generates <strong>foreign exchange earnings</strong> and creates widespread employment</li>
            </ul>
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
