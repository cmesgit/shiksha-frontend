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
    --accent:   #7c3aed;
    --accent2:  #6d28d9;
    --surface:  #f5f3ff;
    --card:     #ffffff;
    --border:   #ddd6fe;
    --border-lt:#ede9fe;
    --tag-bg:   #ede9fe;
    --green:    #15803d;
    --green-bg: #f0fdf4;
    --green-bd: #86efac;
    --blue:     #0369a1;
    --blue-bg:  #f0f9ff;
    --blue-bd:  #bae6fd;
    --amber:    #b45309;
    --amber-bg: #fffbeb;
    --amber-bd: #fde68a;
    --red:      #b91c1c;
    --red-bg:   #fff1f2;
    --red-bd:   #fca5a5;
  }

  .blog-root {
    font-family: 'Inter', sans-serif;
    background: #fafaff;
    color: var(--ink);
    min-height: 100vh;
  }

  /* ── Hero ── */
  .chapter5-hero {
  background: linear-gradient(135deg, #1e0050 0%, #3b0764 45%, #5b21b6 100%);
  padding: 80px 24px 96px;
  position: relative;
  overflow: hidden;
}

.chapter5-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 12% 60%, rgba(167, 139, 250, 0.14) 0%, transparent 55%),
    radial-gradient(circle at 88% 20%, rgba(124, 58, 237, 0.18) 0%, transparent 50%);
}

.chapter5-hero-inner {
  max-width: 820px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.chapter5-hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(167, 139, 250, 0.15);
  border: 1px solid rgba(167, 139, 250, 0.3);
  color: #c4b5fd;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 100px;
  margin-bottom: 28px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.chapter5-hero-title {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(36px, 6vw, 62px);
  font-weight: 900;
  line-height: 1.08;
  color: #ffffff;
  margin: 0 0 20px;
  letter-spacing: -0.02em;
}

.chapter5-hero-title span {
  color: #a78bfa;
}

.chapter5-hero-sub {
  font-family: "Poppins", sans-serif;
  font-size: 17px;
  font-weight: 500;
  color: #ddd6fe;
  line-height: 1.7;
  max-width: 620px;
  margin: 0 0 40px;
}

.chapter5-hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}

.chapter5-meta-chip {
  color: #c4b5fd;
  font-size: 14px;
  font-weight: 500;
}

.chapter5-meta-dot {
  width: 4px;
  height: 4px;
  background: #a78bfa;
  border-radius: 50%;
  display: inline-block;
}

  .meta-chip { color: #c4b5fd; font-size: 14px; font-weight: 500; }
  .meta-dot  { width: 4px; height: 4px; background: #a78bfa; border-radius: 50%; display: inline-block; }

  /* ── Body ── */
  .body-wrap {
    max-width: 820px;
    margin: 0 auto;
    padding: 64px 24px 80px;
  }

  /* ── Intro card ── */
  .definition-card {
    background: linear-gradient(135deg, #1e0050, #3b0764);
    border-radius: 20px;
    padding: 40px 44px;
    margin-bottom: 64px;
    position: relative;
    overflow: hidden;
  }
  .definition-card::after {
    content: '⛏️';
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
    color: #ddd6fe;
    line-height: 1.75;
    margin: 0 0 16px;
    position: relative; z-index: 1;
  }
  .definition-card p:last-child { margin: 0; }
  .definition-card strong { color: #a78bfa; }

  /* ── Def boxes ── */
  .def-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 24px;
    position: relative; z-index: 1;
  }
  .def-box {
    background: rgba(167,139,250,0.12);
    border: 1px solid rgba(167,139,250,0.25);
    border-radius: 14px;
    padding: 20px 22px;
  }
  .def-box h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #a78bfa;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin: 0 0 8px;
  }
  .def-box p {
    font-family: 'Inter', sans-serif;
    font-size: 15px !important;
    color: #c4b5fd !important;
    line-height: 1.65 !important;
    margin: 0 !important;
  }

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
  .section-title .green  { color: var(--green); }
  .section-title .blue   { color: var(--blue); }
  .section-title .amber  { color: var(--amber); }

  /* ── Classification cards ── */
  .class-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 64px;
  }
  @media (max-width: 640px) { .class-grid { grid-template-columns: 1fr; } }
  .class-card {
    border-radius: 18px;
    padding: 30px 28px;
    border: 1.5px solid;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .class-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.08); transform: translateY(-2px); }
  .class-card.metallic    { background: var(--green-bg); border-color: var(--green-bd); }
  .class-card.nonmetallic { background: var(--blue-bg);  border-color: var(--blue-bd); }
  .class-icon { font-size: 32px; margin-bottom: 14px; }
  .class-card h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 10px;
  }
  .class-card.metallic    h3 { color: var(--green); }
  .class-card.nonmetallic h3 { color: var(--blue); }
  .class-card p {
    font-size: 15px;
    line-height: 1.7;
    color: #374151;
    margin: 0 0 16px;
  }
  .badge-row { display: flex; flex-wrap: wrap; gap: 8px; }
  .badge {
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 100px;
    border: 1px solid;
  }
  .badge.green  { color: var(--green); border-color: var(--green-bd); background: var(--green-bg); }
  .badge.blue   { color: var(--blue);  border-color: var(--blue-bd);  background: var(--blue-bg); }
  .badge.amber  { color: var(--amber); border-color: var(--amber-bd); background: var(--amber-bg); }
  .badge.purple { color: var(--accent2); border-color: var(--border); background: var(--tag-bg); }

  /* ── Mineral cards ── */
  .mineral-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 18px;
    margin-bottom: 32px;
  }
  .mineral-card {
    background: var(--card);
    border: 1.5px solid var(--border-lt);
    border-radius: 16px;
    padding: 26px 24px;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .mineral-card:hover { box-shadow: 0 6px 24px rgba(124,58,237,0.1); transform: translateY(-2px); }
  .mineral-top { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
  .mineral-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; flex-shrink: 0;
    background: var(--tag-bg);
    border: 1px solid var(--border);
  }
  .mineral-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--ink);
    margin: 0 0 3px;
  }
  .mineral-type {
    font-family: 'Poppins', sans-serif;
    font-size: 11px;
    font-weight: 600;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }
  .mineral-card p {
    font-size: 15px;
    line-height: 1.7;
    color: #374151;
    margin: 0 0 14px;
  }

  /* ── Distribution table ── */
  .dist-table-wrap {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 56px;
  }
  .dist-table-head {
    background: var(--tag-bg);
    padding: 16px 24px;
    border-bottom: 1.5px solid var(--border);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .dist-table-head span {
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: var(--accent2);
  }
  table { width: 100%; border-collapse: collapse; }
  thead th {
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: var(--accent2);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 12px 24px;
    text-align: left;
    background: var(--surface);
    border-bottom: 1.5px solid var(--border-lt);
  }
  tbody td {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    color: #374151;
    padding: 13px 24px;
    border-bottom: 1px solid var(--border-lt);
  }
  tbody tr:last-child td { border-bottom: none; }
  tbody tr:hover td { background: var(--surface); }
  .td-state {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    color: var(--ink);
  }

  /* ── Coal timeline ── */
  .coal-wrap {
    background: var(--amber-bg);
    border: 1.5px solid var(--amber-bd);
    border-radius: 20px;
    padding: 36px 40px;
    margin-bottom: 40px;
  }
  .coal-wrap h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: var(--amber);
    margin: 0 0 28px;
  }
  .timeline {
    position: relative;
    padding-left: 28px;
  }
  .timeline::before {
    content: '';
    position: absolute;
    left: 6px; top: 8px; bottom: 8px;
    width: 2px;
    background: linear-gradient(to bottom, var(--amber), var(--amber-bd));
    border-radius: 2px;
  }
  .tl-item { position: relative; margin-bottom: 26px; }
  .tl-item:last-child { margin-bottom: 0; }
  .tl-item::before {
    content: '';
    position: absolute;
    left: -26px; top: 6px;
    width: 12px; height: 12px;
    background: var(--amber);
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 0 0 2px var(--amber);
  }
  .tl-stage {
    font-family: 'Poppins', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: var(--amber);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 3px;
  }
  .tl-name {
    font-family: 'Montserrat', sans-serif;
    font-size: 17px;
    font-weight: 800;
    color: var(--ink);
    margin-bottom: 5px;
  }
  .tl-desc {
    font-size: 15px;
    line-height: 1.65;
    color: #374151;
    margin-bottom: 6px;
  }
  .tl-tag {
    display: inline-block;
    background: var(--amber-bd);
    color: var(--amber2, var(--amber));
    font-family: 'Poppins', sans-serif;
    font-size: 11px;
    font-weight: 700;
    padding: 3px 12px;
    border-radius: 100px;
  }

  /* ── Energy cards ── */
  .energy-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 18px;
    margin-bottom: 56px;
  }
  .energy-card {
    background: var(--card);
    border: 1.5px solid var(--border-lt);
    border-radius: 16px;
    padding: 26px 24px;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .energy-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.08); transform: translateY(-2px); }
  .energy-emoji { font-size: 30px; margin-bottom: 12px; }
  .energy-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--ink);
    margin: 0 0 6px;
  }
  .energy-sub {
    font-family: 'Poppins', sans-serif;
    font-size: 11px;
    font-weight: 600;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin-bottom: 12px;
  }
  .energy-card p {
    font-size: 15px;
    line-height: 1.7;
    color: #374151;
    margin: 0 0 12px;
  }
  .energy-fact {
    background: var(--surface);
    border-left: 3px solid var(--accent);
    border-radius: 0 8px 8px 0;
    padding: 8px 14px;
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: var(--accent2);
  }

  /* ── Renewable cards ── */
  .renew-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 18px;
    margin-bottom: 56px;
  }
  .renew-card {
    background: var(--green-bg);
    border: 1.5px solid var(--green-bd);
    border-radius: 16px;
    padding: 26px 24px;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .renew-card:hover { box-shadow: 0 6px 24px rgba(22,163,74,0.1); transform: translateY(-2px); }
  .renew-emoji { font-size: 30px; margin-bottom: 12px; }
  .renew-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--green);
    margin: 0 0 10px;
  }
  .renew-card p {
    font-size: 15px;
    line-height: 1.7;
    color: #374151;
    margin: 0 0 12px;
  }
  .renew-location {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: var(--green);
    background: #dcfce7;
    border: 1px solid var(--green-bd);
    border-radius: 100px;
    padding: 4px 12px;
  }

  /* ── Stat row ── */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 16px;
    margin-bottom: 40px;
  }
  .stat-box {
    background: linear-gradient(135deg, #1e0050, #3b0764);
    border-radius: 16px;
    padding: 28px 22px;
    text-align: center;
  }
  .stat-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 26px;
    font-weight: 900;
    color: #a78bfa;
    margin-bottom: 6px;
  }
  .stat-label {
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #ddd6fe;
    line-height: 1.45;
  }

  /* ── Info box ── */
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
    margin: 0 0 8px;
  }
  .info-box p {
    font-size: 15px;
    line-height: 1.7;
    color: #374151;
    margin: 0;
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
    border: 1.5px solid var(--border-lt);
    border-radius: 16px;
    margin-bottom: 14px;
    overflow: hidden;
    background: var(--card);
    transition: box-shadow 0.2s;
  }
  .faq-item.open {
    box-shadow: 0 4px 20px rgba(124,58,237,0.1);
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
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    color: var(--accent2);
    font-size: 18px; font-weight: 700;
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
    .def-row { grid-template-columns: 1fr; }
    .coal-wrap { padding: 28px 24px; }
  }
`;

const faqs = [
  {
    q: "What is a mineral?",
    a: (<p>A mineral is a <strong>naturally occurring, homogeneous substance</strong> found in the Earth's crust with a definite chemical composition and a crystalline structure. Minerals are valuable natural resources used as fuel and as sources for ferrous and non-ferrous metals.</p>),
  },
  {
    q: "What is an ore?",
    a: (<p>An ore is a type of rock in which <strong>metallic minerals are present in concentrated form</strong>. Ores must be refined or processed before the metals can be extracted from them for practical use.</p>),
  },
  {
    q: "What are the main types of minerals?",
    a: (<>
      <p>Minerals are broadly classified into two types:</p>
      <ul>
        <li><strong>Metallic Minerals</strong> — contain metals and are processed to extract them. Further divided into Ferrous (iron-containing), Non-Ferrous, and Precious metals</li>
        <li><strong>Non-Metallic Minerals</strong> — contain no metal but are used for extracting non-metals like mica, sulphur, marble, and limestone</li>
      </ul>
    </>),
  },
  {
    q: "What are ferrous minerals? Give examples.",
    a: (<p>Ferrous minerals are those that <strong>contain iron</strong>. Key examples are iron ore and manganese. Iron ore is the backbone of modern civilization — used from tiny pins to gigantic skyscrapers. Manganese acts as a <strong>'cleanser'</strong> in steel manufacturing and is also used in bleaching powder, pesticides, and paint.</p>),
  },
  {
    q: "What are the four types of iron ore?",
    a: (<ul>
      <li><strong>Magnetite</strong> — highest quality, black in colour, highest iron content</li>
      <li><strong>Hematite</strong> — good quality, reddish in colour, most commercially mined</li>
      <li><strong>Limonite</strong> — lower grade iron ore</li>
      <li><strong>Siderite</strong> — lowest quality iron ore</li>
    </ul>),
  },
  {
    q: "Where is iron ore found in India?",
    a: (<ul>
      <li><strong>Odisha</strong> — Gorumahisani, Badampahar in Mayurbhanj</li>
      <li><strong>Jharkhand</strong> — Singhbhum, Noamundi</li>
      <li><strong>Chhattisgarh</strong> — Dalli-Rajhara, Bailadila in Bastar</li>
      <li><strong>Goa</strong> — Bicholim, Ratnagiri District</li>
      <li><strong>Karnataka</strong> — Kudremukh in Chikmagalur, Bellary District</li>
    </ul>),
  },
  {
    q: "What are non-ferrous minerals? Give examples.",
    a: (<p>Non-ferrous minerals are <strong>metallic minerals that do not contain iron</strong>. Examples: <strong>Copper</strong> — used in electric wires, electronics, and chemical industries. <strong>Bauxite</strong> — source of aluminium, which is light and resistant to corrosion.</p>),
  },
  {
    q: "Where is copper ore mined in India?",
    a: (<p>Copper ore is mined in <strong>Balaghat (Madhya Pradesh)</strong>, <strong>Singhbhum (Jharkhand)</strong>, and <strong>Khetri (Rajasthan)</strong>.</p>),
  },
  {
    q: "What is bauxite and which state leads its production?",
    a: (<p>Bauxite is a rock consisting of <strong>aluminium oxides</strong>. Aluminium derived from it is light, resistant to corrosion, and combines the strength of metals like iron. <strong>Odisha</strong> is the leading producer; important districts include Koraput and Sambalpur.</p>),
  },
  {
    q: "What is mica and where is it found?",
    a: (<p>Mica is a <strong>non-metallic mineral</strong> with thin, brittle crystal layers that can be split into sheets. It has low power loss and high voltage resistance, making it ideal for electrical and electronic industries. Key mining areas: <strong>Koderma and Hazaribagh (Jharkhand)</strong>, Ajmer (Rajasthan), and Nellore (Andhra Pradesh).</p>),
  },
  {
    q: "What are conventional energy resources?",
    a: (<p>Conventional energy resources are those used on a <strong>large commercial scale</strong> for generating power over a long time. They include non-renewable fossil fuels — coal, petroleum, and natural gas — as well as running water (hydroelectricity). They are <strong>not eco-friendly</strong> because they emit greenhouse gases.</p>),
  },
  {
    q: "What are the four stages of coal formation?",
    a: (<ul>
      <li><strong>Peat</strong> — first stage, lowest carbon content</li>
      <li><strong>Lignite (Brown Coal)</strong> — 30–40% carbon, used in some power plants</li>
      <li><strong>Bituminous</strong> — 40–80% carbon, the most widely used commercial coal</li>
      <li><strong>Anthracite</strong> — ~90% carbon, hardest and highest quality coal</li>
    </ul>),
  },
  {
    q: "Where are major coalfields located in India?",
    a: (<p>The primary source is the <strong>Damodar Valley (Gondwana coal)</strong>. Major coalfields include <strong>Jharia, Bokaro, and Giridih in Jharkhand</strong>. The Gondwana coal belt also extends through Chhattisgarh, West Bengal, Madhya Pradesh, and Odisha.</p>),
  },
  {
    q: "Why is petroleum called 'liquid gold'?",
    a: (<p>Petroleum is called <strong>'liquid gold'</strong> because it has the broadest range of domestic and industrial uses — from fuel for vehicles to raw material for plastics, medicines, and fertilizers. It is formed from dead plants and animals buried in rocky strata on the ocean floor over millions of years.</p>),
  },
  {
    q: "What is the regional distribution of petroleum in India?",
    a: (<ul>
      <li><strong>Bombay High</strong> — 60–63% of India's total petroleum production</li>
      <li><strong>Gujarat (Ankleshwar)</strong> — about 18–19% of output</li>
      <li><strong>Assam (Digboi)</strong> — India's oldest oil field, about 16% of output</li>
    </ul>),
  },
  {
    q: "What are non-conventional energy resources?",
    a: (<p>Non-conventional energy resources are <strong>eco-friendly, renewable, and do not emit harmful greenhouse gases</strong>. They include solar energy, wind energy, biogas, tidal energy, and geothermal energy. Being natural 'flow' resources, they are inexhaustible and sustainable — ideal for long-term energy security.</p>),
  },
  {
    q: "Where is India's largest solar plant located?",
    a: (<p>India's largest solar plant is located at <strong>Madhapur, near Bhuj in Gujarat</strong>.</p>),
  },
  {
    q: "Where is the largest wind farm cluster in India?",
    a: (<p>The largest wind farm cluster is in <strong>Tamil Nadu, from Nagercoil to Madurai</strong>. Wind energy plants are also concentrated along the coastal areas of Gujarat and Maharashtra due to steady, high-speed coastal winds.</p>),
  },
  {
    q: "What is geothermal energy? Where is it found in India?",
    a: (<p>Geothermal energy is <strong>heat energy present in rocks deep within the Earth</strong>. Groundwater absorbs heat from these rocks, and when it reaches the surface as steam, it can drive turbines to produce electricity. <strong>Parvati Valley near Manikaran in Himachal Pradesh</strong> is a key geothermal location in India.</p>),
  },
  {
    q: "What is nuclear energy and where are nuclear minerals found in India?",
    a: (<p>Nuclear energy is released when atoms of one element change into those of another (<strong>nuclear fission/fusion</strong>). India has <strong>uranium deposits in Rajasthan and Singhbhum (Jharkhand)</strong>, and high-grade <strong>thorium in the monazite sands along the coast of Kerala</strong>.</p>),
  },
];

export default function MineralsAndEnergyResources() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="blog-root">

        {/* HERO */}
        <div className="chapter5-hero">
  <div className="chapter5-hero-inner">
    <div className="chapter5-hero-tag">📚 Class 10 · Social Science · Geography</div>
    <h1 className="chapter5-hero-title">Minerals &amp; <span>Energy</span> Resources</h1>
    <p className="chapter5-hero-sub">
      Chapter 5 — Complete revision notes covering types of minerals, ferrous & non-ferrous minerals, conventional energy resources, coal formation, petroleum, and renewable energy sources.
    </p>
    <div className="chapter5-hero-meta">
      <span className="chapter5-meta-chip">⛏️ Geography</span>
      <span className="chapter5-meta-dot" />
      <span className="chapter5-meta-chip">📖 Revision Notes</span>
      <span className="chapter5-meta-dot" />
      <span className="chapter5-meta-chip">❓ 20 FAQs Included</span>
    </div>
  </div>
</div>

        <div className="body-wrap">

          {/* Intro */}
          <div className="definition-card">
            <p>Everything from a <strong>tiny pin to a towering skyscraper</strong> is made of metal — and metals come from minerals. Earth's crust is composed of minerals, which are the most valuable natural resources usable as fuel and as sources for ferrous and non-ferrous metals.</p>
            <p>Alongside minerals, we depend on <strong>energy resources</strong> — both conventional and non-conventional — which together power India's economic growth.</p>
            <div className="def-row">
              <div className="def-box">
                <h4>Mineral</h4>
                <p>A naturally occurring, homogeneous substance in the Earth's crust with a definite chemical composition and crystalline structure.</p>
              </div>
              <div className="def-box">
                <h4>Ore</h4>
                <p>A rock in which metallic minerals are present in concentrated form. Must be refined before metals can be extracted.</p>
              </div>
            </div>
          </div>

          {/* Classification */}
          <div className="section-label">Classification</div>
          <h2 className="section-title">Types of <span className="accent">Minerals</span></h2>
          <div className="class-grid">
            <div className="class-card metallic">
              <div className="class-icon">🔩</div>
              <h3>Metallic Minerals</h3>
              <p>Minerals that contain metals and are processed to extract them. Further divided into ferrous, non-ferrous, and precious metals.</p>
              <div className="badge-row">
                <span className="badge green">Ferrous: Iron, Manganese</span>
                <span className="badge blue">Non-Ferrous: Copper, Tin</span>
                <span className="badge amber">Precious: Gold, Silver</span>
              </div>
            </div>
            <div className="class-card nonmetallic">
              <div className="class-icon">💡</div>
              <h3>Non-Metallic Minerals</h3>
              <p>Contain no metal but are used for extracting valuable non-metal substances vital for construction, chemicals, and electronics.</p>
              <div className="badge-row">
                <span className="badge blue">Mica</span>
                <span className="badge blue">Sulphur</span>
                <span className="badge blue">Marble</span>
                <span className="badge blue">Limestone</span>
                <span className="badge blue">Phosphorus</span>
              </div>
            </div>
          </div>

          <hr className="divider" />

          {/* Ferrous Minerals */}
          <div className="section-label">Ferrous Minerals</div>
          <h2 className="section-title">Iron Ore &amp; <span className="accent">Manganese</span></h2>
          <div className="mineral-grid">
            {[
              { icon:"⬛", name:"Magnetite", type:"Iron Ore · Best Quality",     desc:"The most refined quality of iron ore. Black in colour with the highest iron content — ideal for high-grade steel manufacture.", badge:"Highest Grade", badgeCls:"purple" },
              { icon:"🟥", name:"Hematite",  type:"Iron Ore · Good Quality",     desc:"Good quality, reddish iron ore. Most widely distributed and commercially mined type across India.", badge:"Commercial Grade", badgeCls:"amber" },
              { icon:"🔬", name:"Manganese", type:"Ferrous Mineral",             desc:"When added to iron, acts as a 'cleanser' removing impurities in steel. Also used in bleaching powder, pesticides, and paint.", badge:"Multi-use", badgeCls:"green" },
            ].map((m, i) => (
              <div className="mineral-card" key={i}>
                <div className="mineral-top">
                  <div className="mineral-icon">{m.icon}</div>
                  <div>
                    <h4>{m.name}</h4>
                    <div className="mineral-type">{m.type}</div>
                  </div>
                </div>
                <p>{m.desc}</p>
                <span className={`badge ${m.badgeCls}`}>{m.badge}</span>
              </div>
            ))}
          </div>

          <div className="dist-table-wrap">
            <div className="dist-table-head">
              <span>📍 Distribution of Iron Ore in India</span>
            </div>
            <table>
              <thead><tr><th>State</th><th>Mining Areas</th></tr></thead>
              <tbody>
                {[
                  ["Odisha",        "Gorumahisani, Badampahar in Mayurbhanj"],
                  ["Jharkhand",     "Singhbhum, Noamundi"],
                  ["Chhattisgarh",  "Dalli-Rajhara, Bailadila in Bastar District"],
                  ["Goa",           "Bicholim, Ratnagiri District"],
                  ["Karnataka",     "Kudremukh in Chikmagalur, Bellary District"],
                ].map(([state, area]) => (
                  <tr key={state}><td className="td-state">{state}</td><td>{area}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Non-Ferrous & Non-Metallic */}
          <div className="section-label">Non-Ferrous & Non-Metallic</div>
          <h2 className="section-title">Copper, Bauxite <span className="accent">&amp; Mica</span></h2>
          <div className="mineral-grid">
            {[
              { icon:"🟠", name:"Copper",  type:"Non-Ferrous Mineral", desc:"A ductile metal and excellent conductor of electricity. Used in electric wires, electronics, and chemical industries.", badges:[{label:"Balaghat, MP",cls:"amber"},{label:"Singhbhum, JH",cls:"amber"},{label:"Khetri, RJ",cls:"amber"}] },
              { icon:"🪨", name:"Bauxite", type:"Non-Ferrous Mineral", desc:"Rock consisting of aluminium oxides. Aluminium is light, corrosion-resistant, and combines the strength of iron. Odisha is the leading producer.", badges:[{label:"Koraput, Odisha",cls:"blue"},{label:"Sambalpur, Odisha",cls:"blue"}] },
              { icon:"✨", name:"Mica",    type:"Non-Metallic Mineral", desc:"Thin, brittle crystal layers that split into sheets. Low power loss and high voltage resistance — ideal for electrical and electronic industries.", badges:[{label:"Koderma, JH",cls:"purple"},{label:"Ajmer, RJ",cls:"purple"},{label:"Nellore, AP",cls:"purple"}] },
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

          {/* Conventional Energy */}
          <div className="section-label">Conventional Energy</div>
          <h2 className="section-title">Fossil Fuels &amp; <span className="amber">Hydropower</span></h2>

          {/* Coal stages */}
          <div className="coal-wrap">
            <h3>🪨 Stages of Coal Formation</h3>
            <div className="timeline">
              {[
                { stage:"Stage 1", name:"Peat",                  desc:"The earliest stage. Partially decomposed plant matter with the lowest carbon content and energy output.", tag:"Lowest Carbon" },
                { stage:"Stage 2", name:"Lignite (Brown Coal)",   desc:"Soft brownish coal with 30–40% carbon content. Used in some thermal power plants.", tag:"30–40% Carbon" },
                { stage:"Stage 3", name:"Bituminous Coal",        desc:"Most popular in commercial use. Widely used in industry and thermal power generation.", tag:"40–80% Carbon · Most Widely Used" },
                { stage:"Stage 4", name:"Anthracite (Hard Coal)", desc:"Hardest and highest quality coal. Burns with most heat and least smoke.", tag:"~90% Carbon · Highest Quality" },
              ].map((t, i) => (
                <div className="tl-item" key={i}>
                  <div className="tl-stage">{t.stage}</div>
                  <div className="tl-name">{t.name}</div>
                  <div className="tl-desc">{t.desc}</div>
                  <span className="tl-tag">{t.tag}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="energy-grid">
            {[
              { emoji:"🪨", title:"Coal",            sub:"Fossil Fuel",        desc:"Essential source of power. Provides heat and steam for industries. Primary source is Damodar Valley (Gondwana coal).", fact:"Key fields: Jharia, Bokaro, Giridih — Jharkhand" },
              { emoji:"🛢️", title:"Petroleum",       sub:"Liquid Gold",        desc:"Formed from dead plants and animals in rocky ocean-floor strata. Broadest range of domestic and industrial uses. Bombay High leads production.", fact:"60–63% from Bombay High; oldest field at Digboi, Assam" },
              { emoji:"💨", title:"Natural Gas",     sub:"Clean Fossil Fuel",  desc:"Cleanest conventional fuel — emits less CO₂ than coal or petroleum. Increasingly used in power generation and industry.", fact:"Lower CO₂ emissions vs coal & petroleum" },
              { emoji:"💧", title:"Hydroelectricity",sub:"Running Water",      desc:"River water stored by dams falls over turbine blades to generate electricity. Renewable and clean but depends on water availability.", fact:"Bhakra Nangal · Damodar Valley · Hirakud" },
              { emoji:"🔥", title:"Thermal Power",  sub:"Fossil-Fuel Based",  desc:"Generated by burning coal, petroleum, or natural gas. Steam produced drives turbines. Most common power generation method in India.", fact:"Fuelled by coal, petroleum & natural gas" },
              { emoji:"⚛️", title:"Nuclear Energy",  sub:"Atomic Power",       desc:"Energy released when atoms of one element change into another. Uranium in Rajasthan & Jharkhand; thorium in Kerala's coastal monazite sands.", fact:"Uranium: Rajasthan, Singhbhum · Thorium: Kerala" },
            ].map((e, i) => (
              <div className="energy-card" key={i}>
                <div className="energy-emoji">{e.emoji}</div>
                <h4>{e.title}</h4>
                <div className="energy-sub">{e.sub}</div>
                <p>{e.desc}</p>
                <div className="energy-fact">{e.fact}</div>
              </div>
            ))}
          </div>

          <hr className="divider" />

          {/* Non-Conventional Energy */}
          <div className="section-label">Non-Conventional Energy</div>
          <h2 className="section-title">Renewable &amp; <span className="green">Eco-Friendly Energy</span></h2>

          <div className="stats-row">
            <div className="stat-box"><div className="stat-num">☀️</div><div className="stat-label">Largest solar plant near Bhuj, Gujarat</div></div>
            <div className="stat-box"><div className="stat-num">💨</div><div className="stat-label">Largest wind farm: Nagercoil to Madurai, Tamil Nadu</div></div>
            <div className="stat-box"><div className="stat-num">🌊</div><div className="stat-label">Tidal energy: Gulf of Kutch & Bay of Bengal</div></div>
          </div>

          <div className="renew-grid">
            {[
              { emoji:"☀️", title:"Solar Energy",      desc:"Heat from the sun captured by solar collectors. Used in solar cookers, water heating, air heating, crop dryers, and refrigerators.", loc:"Madhapur, Bhuj, Gujarat" },
              { emoji:"💨", title:"Wind Energy",       desc:"Coastal areas of Tamil Nadu, Gujarat, and Maharashtra have steady high-speed winds ideal for wind turbines. Tamil Nadu leads with the largest wind farm cluster.", loc:"Nagercoil–Madurai, Tamil Nadu" },
              { emoji:"🌿", title:"Biogas Energy",     desc:"Gaseous mixture (mainly methane & CO₂) from breakdown of organic matter — kitchen waste, agricultural waste, sewage. Low-cost and widely accessible fuel.", loc:"Organic waste sources" },
              { emoji:"🌊", title:"Tidal Energy",      desc:"Energy extracted from ocean tides. Most viable in coastal regions near the Bay of Bengal and Gulf of Kutch along India's west coast.", loc:"Gulf of Kutch & Bay of Bengal" },
              { emoji:"🌋", title:"Geothermal Energy", desc:"Heat from rocks deep in the Earth. Groundwater absorbs this heat and emerges as steam at the surface to drive turbines. Clean, safe, and sustainable.", loc:"Parvati Valley, Manikaran, HP" },
              { emoji:"⚛️", title:"Nuclear Energy",    desc:"Released when atoms change from one element to another. Produces massive energy with minimal greenhouse gas emissions compared to fossil fuels.", loc:"Rajasthan · Jharkhand · Kerala" },
            ].map((r, i) => (
              <div className="renew-card" key={i}>
                <div className="renew-emoji">{r.emoji}</div>
                <h4>{r.title}</h4>
                <p>{r.desc}</p>
                <span className="renew-location">📍 {r.loc}</span>
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
