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
    --blue:      #0369a1;
    --blue2:     #0284c7;
    --blue-bg:   #f0f9ff;
    --blue-bd:   #bae6fd;
    --teal:      #0f766e;
    --teal-bg:   #f0fdfa;
    --teal-bd:   #99f6e4;
    --indigo:    #4338ca;
    --indigo-bg: #eef2ff;
    --indigo-bd: #c7d2fe;
    --cyan:      #0891b2;
    --cyan-bg:   #ecfeff;
    --cyan-bd:   #a5f3fc;
    --green:     #15803d;
    --green-bg:  #f0fdf4;
    --green-bd:  #86efac;
    --amber:     #d97706;
    --amber-bg:  #fffbeb;
    --amber-bd:  #fde68a;
    --red:       #dc2626;
    --red-bg:    #fff1f2;
    --red-bd:    #fecdd3;
    --card:      #ffffff;
  }

  .blog-root {
    font-family: 'Inter', sans-serif;
    background: #f7fbff;
    color: var(--ink);
    min-height: 100vh;
  }

  /* ── Hero ── */
  .drn-hero {
    background: linear-gradient(135deg, #012e47 0%, #0c4a6e 40%, #0369a1 78%, #0284c7 100%);
    padding: 80px 24px 96px;
    position: relative; overflow: hidden;
  }
  .drn-hero::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      radial-gradient(circle at 10% 65%, rgba(14,165,233,0.2) 0%, transparent 50%),
      radial-gradient(circle at 88% 18%, rgba(6,182,212,0.18) 0%, transparent 52%),
      radial-gradient(circle at 50% 95%, rgba(2,132,199,0.1) 0%, transparent 40%);
  }
  .drn-hero::after {
    content: '🌊';
    position: absolute; right: 44px; top: 36px;
    font-size: 130px; opacity: 0.07; line-height: 1;
  }
  .drn-hero-inner {
    max-width: 820px; margin: 0 auto;
    position: relative; z-index: 1;
  }
  .drn-hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(14,165,233,0.15);
    border: 1px solid rgba(14,165,233,0.35);
    color: #7dd3fc;
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 600;
    padding: 6px 16px; border-radius: 100px;
    margin-bottom: 28px;
    letter-spacing: 0.05em; text-transform: uppercase;
  }
  .drn-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 900; line-height: 1.07;
    color: #ffffff; margin: 0 0 20px;
    letter-spacing: -0.02em;
  }
  .drn-hero-title span { color: #38bdf8; }
  .drn-hero-sub {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 500;
    color: #bae6fd; line-height: 1.7;
    max-width: 620px; margin: 0 0 40px;
  }
  .drn-hero-meta { display: flex; flex-wrap: wrap; gap: 20px; align-items: center; }
  .drn-meta-chip { color: #7dd3fc; font-size: 14px; font-weight: 500; display: flex; align-items: center; gap: 7px; }
  .drn-meta-dot  { width: 4px; height: 4px; background: #38bdf8; border-radius: 50%; display: inline-block; }

  /* ── Body ── */
  .drn-body {
    max-width: 820px; margin: 0 auto;
    padding: 64px 24px 80px;
  }

  /* ── Intro card ── */
  .drn-intro-card {
    background: linear-gradient(135deg, #012e47, #0c4a6e);
    border-radius: 20px; padding: 40px 44px;
    margin-bottom: 56px;
    position: relative; overflow: hidden;
  }
  .drn-intro-card::after {
    content: '💧';
    position: absolute; top: 8px; right: 28px;
    font-size: 120px; opacity: 0.07; line-height: 1;
  }
  .drn-intro-card p {
    font-family: 'Poppins', sans-serif;
    font-size: 19px; font-weight: 500;
    color: #bae6fd; line-height: 1.75;
    margin: 0 0 16px; position: relative; z-index: 1;
  }
  .drn-intro-card p:last-child { margin: 0; }
  .drn-intro-card strong { color: #38bdf8; }

  /* ── Key terms row ── */
  .drn-terms {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 0; border-radius: 14px; overflow: hidden;
    border: 1.5px solid var(--blue-bd);
    margin-bottom: 56px;
  }
  @media (max-width: 560px) { .drn-terms { grid-template-columns: 1fr; } }
  .drn-term {
    padding: 22px 20px; background: var(--card);
    border-right: 1.5px solid var(--blue-bd);
  }
  .drn-term:last-child { border-right: none; }
  @media (max-width: 560px) {
    .drn-term { border-right: none; border-bottom: 1.5px solid var(--blue-bd); }
    .drn-term:last-child { border-bottom: none; }
  }
  .drn-term-icon { font-size: 26px; margin-bottom: 10px; }
  .drn-term h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 700; color: var(--blue);
    text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;
  }
  .drn-term p { font-size: 14px; color: var(--ink2); line-height: 1.65; margin: 0; }

  /* ── Himalayan vs Peninsular compare ── */
  .drn-compare {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0; border-radius: 18px; overflow: hidden;
    border: 1.5px solid #e0f2fe; margin-bottom: 56px;
  }
  @media (max-width: 580px) { .drn-compare { grid-template-columns: 1fr; } }
  .drn-compare-col { padding: 30px 28px; }
  .drn-compare-col.him { background: linear-gradient(160deg, #012e47, #0c4a6e); }
  .drn-compare-col.pen { background: var(--teal-bg); border-left: 1.5px solid var(--teal-bd); }
  .drn-compare-col h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 17px; font-weight: 800; margin: 0 0 16px;
  }
  .drn-compare-col.him h3 { color: #38bdf8; }
  .drn-compare-col.pen h3 { color: var(--teal); }
  .drn-compare-col ul { margin: 0; padding-left: 18px; }
  .drn-compare-col.him ul li { font-size: 15px; color: #bae6fd; line-height: 1.75; margin-bottom: 8px; }
  .drn-compare-col.pen ul li { font-size: 15px; color: var(--ink2); line-height: 1.75; margin-bottom: 8px; }

  /* ── Section labels & titles ── */
  .drn-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 10px;
  }
  .drn-label.blue   { color: var(--blue); }
  .drn-label.teal   { color: var(--teal); }
  .drn-label.indigo { color: var(--indigo); }
  .drn-label.cyan   { color: var(--cyan); }
  .drn-label.green  { color: var(--green); }
  .drn-label.red    { color: var(--red); }
  .drn-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(26px, 4vw, 36px); font-weight: 800;
    color: var(--ink); line-height: 1.2;
    margin: 0 0 28px; letter-spacing: -0.01em;
  }
  .drn-title .blue   { color: var(--blue); }
  .drn-title .teal   { color: var(--teal); }
  .drn-title .indigo { color: var(--indigo); }
  .drn-title .cyan   { color: var(--cyan); }
  .drn-title .green  { color: var(--green); }
  .drn-title .amber  { color: var(--amber); }
  .drn-title .red    { color: var(--red); }

  /* ── River info box ── */
  .drn-info-box {
    background: var(--card);
    border-left: 4px solid var(--blue);
    border-radius: 0 12px 12px 0;
    padding: 20px 24px; margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  }
  .drn-info-box h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 700; color: var(--ink); margin: 0 0 6px;
  }
  .drn-info-box p { font-size: 15px; color: #374151; line-height: 1.7; margin: 0; }
  .drn-info-box strong { color: var(--blue); }

  /* ── River system card (for each major river) ── */
  .drn-river-card {
    border-radius: 18px; border: 1.5px solid;
    overflow: hidden; margin-bottom: 28px;
  }
  .drn-river-head {
    padding: 20px 26px;
    display: flex; align-items: center; gap: 14px;
  }
  .drn-river-icon { font-size: 30px; }
  .drn-river-head h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px; font-weight: 800;
    margin: 0 0 2px; color: #fff;
  }
  .drn-river-head p {
    font-size: 13px; color: rgba(255,255,255,0.75);
    font-family: 'Poppins', sans-serif; font-weight: 500; margin: 0;
  }
  .drn-river-body {
    padding: 22px 26px;
  }
  .drn-river-body ul { margin: 0; padding-left: 20px; }
  .drn-river-body ul li { font-size: 15px; color: var(--ink2); line-height: 1.75; margin-bottom: 8px; }
  .drn-river-body ul li:last-child { margin-bottom: 0; }

  /* River colour variants */
  .drn-river-card.indus  { border-color: #6366f1; }
  .drn-river-card.indus  .drn-river-head { background: linear-gradient(135deg, #1e1b4b, #4338ca); }
  .drn-river-card.indus  .drn-river-body { background: var(--indigo-bg); }

  .drn-river-card.ganga  { border-color: var(--blue-bd); }
  .drn-river-card.ganga  .drn-river-head { background: linear-gradient(135deg, #012e47, #0369a1); }
  .drn-river-card.ganga  .drn-river-body { background: var(--blue-bg); }

  .drn-river-card.brahma { border-color: var(--cyan-bd); }
  .drn-river-card.brahma .drn-river-head { background: linear-gradient(135deg, #0e4f5c, #0891b2); }
  .drn-river-card.brahma .drn-river-body { background: var(--cyan-bg); }

  /* ── Length badge ── */
  .drn-len-badge {
    display: inline-block;
    font-family: 'Montserrat', sans-serif;
    font-size: 12px; font-weight: 800;
    padding: 4px 12px; border-radius: 100px;
    margin-left: 8px; vertical-align: middle;
  }
  .drn-len-badge.ind { background: rgba(165,180,252,0.25); color: #c7d2fe; }
  .drn-len-badge.gan { background: rgba(56,189,248,0.25); color: #7dd3fc; }
  .drn-len-badge.brh { background: rgba(165,243,252,0.25); color: #a5f3fc; }

  /* ── Divider ── */
  .drn-divider { border: none; border-top: 1.5px solid #e0f2fe; margin: 52px 0; }

  /* ── Peninsular rivers grid ── */
  .drn-pen-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 16px; margin-bottom: 40px;
  }
  .drn-pen-card {
    border-radius: 16px; padding: 22px 20px;
    border: 1.5px solid; transition: transform 0.2s, box-shadow 0.2s;
  }
  .drn-pen-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.07); }
  .drn-pen-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; font-weight: 700; margin: 0 0 6px;
  }
  .drn-pen-card .drn-pen-len {
    font-family: 'Montserrat', sans-serif;
    font-size: 13px; font-weight: 800;
    margin-bottom: 10px;
  }
  .drn-pen-card p { font-size: 14px; color: var(--muted); line-height: 1.65; margin: 0; }
  .drn-pen-card.god { background: var(--teal-bg); border-color: var(--teal-bd); }
  .drn-pen-card.god h4 { color: var(--teal); }
  .drn-pen-card.god .drn-pen-len { color: var(--teal); }
  .drn-pen-card.mah { background: var(--blue-bg); border-color: var(--blue-bd); }
  .drn-pen-card.mah h4 { color: var(--blue); }
  .drn-pen-card.mah .drn-pen-len { color: var(--blue); }
  .drn-pen-card.kri { background: var(--indigo-bg); border-color: var(--indigo-bd); }
  .drn-pen-card.kri h4 { color: var(--indigo); }
  .drn-pen-card.kri .drn-pen-len { color: var(--indigo); }
  .drn-pen-card.kav { background: var(--cyan-bg); border-color: var(--cyan-bd); }
  .drn-pen-card.kav h4 { color: var(--cyan); }
  .drn-pen-card.kav .drn-pen-len { color: var(--cyan); }
  .drn-pen-card.nar { background: var(--green-bg); border-color: var(--green-bd); }
  .drn-pen-card.nar h4 { color: var(--green); }
  .drn-pen-card.nar .drn-pen-len { color: var(--green); }
  .drn-pen-card.tap { background: var(--amber-bg); border-color: var(--amber-bd); }
  .drn-pen-card.tap h4 { color: var(--amber); }
  .drn-pen-card.tap .drn-pen-len { color: var(--amber); }

  /* ── West vs East flowing banner ── */
  .drn-flow-split {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 14px; margin-bottom: 44px;
  }
  @media (max-width: 520px) { .drn-flow-split { grid-template-columns: 1fr; } }
  .drn-flow-card {
    border-radius: 14px; padding: 22px 20px; border: 1.5px solid;
    text-align: center;
  }
  .drn-flow-card.west { background: var(--green-bg); border-color: var(--green-bd); }
  .drn-flow-card.east { background: var(--blue-bg); border-color: var(--blue-bd); }
  .drn-flow-icon { font-size: 32px; margin-bottom: 10px; }
  .drn-flow-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 700; margin: 0 0 6px;
  }
  .drn-flow-card.west h4 { color: var(--green); }
  .drn-flow-card.east h4 { color: var(--blue); }
  .drn-flow-card p { font-size: 14px; color: var(--muted); margin: 0; line-height: 1.6; }

  /* ── Lakes section ── */
  .drn-lake-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 14px; margin-bottom: 36px;
  }
  .drn-lake-card {
    background: var(--card);
    border: 1.5px solid #e0f2fe;
    border-radius: 14px; padding: 20px 18px;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .drn-lake-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(3,105,161,0.1); }
  .drn-lake-icon { font-size: 26px; margin-bottom: 10px; }
  .drn-lake-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 700; color: var(--blue); margin: 0 0 6px;
    text-transform: uppercase; letter-spacing: 0.04em;
  }
  .drn-lake-card p { font-size: 14px; color: var(--ink2); line-height: 1.65; margin: 0; }

  /* ── Lakes benefits strip ── */
  .drn-benefit-strip {
    background: linear-gradient(135deg, #012e47, #0c4a6e);
    border-radius: 16px; padding: 28px 30px;
    margin-bottom: 44px;
  }
  .drn-benefit-strip h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 17px; font-weight: 800; color: #38bdf8; margin: 0 0 16px;
  }
  .drn-benefit-tags {
    display: flex; flex-wrap: wrap; gap: 10px;
  }
  .drn-btag {
    background: rgba(56,189,248,0.15);
    border: 1px solid rgba(56,189,248,0.3);
    color: #7dd3fc;
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 600;
    padding: 6px 14px; border-radius: 100px;
  }

  /* ── Economy section ── */
  .drn-econ-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 14px; margin-bottom: 36px;
  }
  .drn-econ-card {
    border-radius: 14px; padding: 22px 18px; text-align: center;
    border: 1.5px solid;
  }
  .drn-econ-card.a { background: var(--blue-bg); border-color: var(--blue-bd); }
  .drn-econ-card.b { background: var(--green-bg); border-color: var(--green-bd); }
  .drn-econ-card.c { background: var(--teal-bg); border-color: var(--teal-bd); }
  .drn-econ-card.d { background: var(--indigo-bg); border-color: var(--indigo-bd); }
  .drn-econ-icon { font-size: 30px; margin-bottom: 10px; }
  .drn-econ-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 700; margin: 0 0 4px;
  }
  .drn-econ-card.a h4 { color: var(--blue); }
  .drn-econ-card.b h4 { color: var(--green); }
  .drn-econ-card.c h4 { color: var(--teal); }
  .drn-econ-card.d h4 { color: var(--indigo); }
  .drn-econ-card p { font-size: 13px; color: var(--muted); margin: 0; line-height: 1.5; }

  /* ── Pollution alert ── */
  .drn-pollution {
    background: linear-gradient(135deg, #fff1f2, #ffe4e6);
    border: 1.5px solid #fca5a5;
    border-radius: 16px; padding: 28px 32px;
    margin-bottom: 40px;
  }
  .drn-pollution h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 19px; font-weight: 800; color: #7f1d1d; margin: 0 0 14px;
  }
  .drn-pollution ul { margin: 0; padding-left: 20px; }
  .drn-pollution ul li {
    font-size: 15px; color: #991b1b; line-height: 1.75; margin-bottom: 8px;
  }
  .drn-pollution ul li:last-child { margin-bottom: 0; }

  /* ── FAQ ── */
  .drn-faq-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 700; color: var(--blue);
    letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 10px;
  }
  .drn-faq-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(24px, 4vw, 34px); font-weight: 800;
    color: var(--ink); margin: 0 0 32px; letter-spacing: -0.01em;
  }
  .faq-item {
    border: 1.5px solid #e0f2fe;
    border-radius: 14px; margin-bottom: 12px;
    overflow: hidden; background: var(--card);
    transition: border-color 0.2s;
  }
  .faq-item.open { border-color: var(--blue-bd); }
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
  .faq-icon { font-size: 22px; font-weight: 700; color: var(--blue); flex-shrink: 0; line-height: 1; }
  .faq-ans {
    display: none; padding: 0 24px 20px;
    font-size: 15px; color: #374151; line-height: 1.75;
  }
  .faq-ans.visible { display: block; }
  .faq-ans strong { color: var(--blue); }
  .faq-ans p { margin: 0 0 10px; }
  .faq-ans p:last-child { margin: 0; }
`;

const faqs = [
  {
    q: "What is a drainage basin and a water divide?",
    a: <p>A <strong>drainage basin</strong> (or river basin) is an area drained by a single river system — all water from that area flows into one river. A <strong>water divide</strong> is an upland or ridge that separates two adjacent drainage systems, directing water into different river basins. Example: the Western Ghats act as the main water divide in peninsular India.</p>,
  },
  {
    q: "What are the key differences between Himalayan rivers and Peninsular rivers?",
    a: <>
      <p><strong>Himalayan Rivers:</strong> Both rain-fed and snow-fed — so they are <strong>perennial</strong> (flow throughout the year). They perform intense erosional activity in their upper course and carry large deposits of silt and sand in the lower course. They form meanders, oxbow lakes, and other depositional features.</p>
      <p><strong>Peninsular Rivers:</strong> Mostly <strong>seasonal</strong> — depend primarily on rainfall. They have shorter courses and smaller basins. Most originate in the Western Ghats and flow eastward into the Bay of Bengal.</p>
    </>,
  },
  {
    q: "Describe the Indus River System.",
    a: <p>The Indus rises near <strong>Lake Mansarovar in Tibet</strong> and enters India through Ladakh. In Kashmir, it is joined by the Zaskar, Nubra, and Shyok rivers. The rivers Satluj, Beas, Ravi, Chenab, and Jhelum join the Indus near <strong>Mithankot in Pakistan</strong>, and it finally flows into the <strong>Arabian Sea east of Karachi</strong>. With a total length of <strong>2,900 km</strong>, it is one of the longest rivers in the world. Its waters are distributed between India and Pakistan under the <strong>Indus Water Treaty of 1960</strong>.</p>,
  },
  {
    q: "Describe the Ganga River System and the Sunderban Delta.",
    a: <>
      <p>The headwaters of the Ganga are called <strong>Bhagirathi</strong>, fed by the Gangotri Glacier, joined by the <strong>Alaknanda at Devprayag</strong>. Major Himalayan tributaries include Ghaghara, Gandak, and Kosi. The <strong>Yamuna</strong> (from Yamunotri Glacier) joins Ganga at Allahabad. Peninsular tributaries — Chambal, Betwa, and Son — also join it.</p>
      <p>The Ganga joins the <strong>Brahmaputra</strong> to form the <strong>Meghna</strong>, which flows through Bangladesh into the Bay of Bengal. The resulting delta is the <strong>Sunderban Delta</strong> — the world's largest delta. The Ganga is over <strong>2,500 km</strong> long.</p>
    </>,
  },
  {
    q: "What are the special features of the Brahmaputra river?",
    a: <p>The Brahmaputra originates in <strong>Tibet</strong> close to the sources of the Indus and Satluj. Most of its course lies outside India. At <strong>Namcha Barwa</strong>, it makes a dramatic U-turn and enters <strong>Arunachal Pradesh</strong>. It flows through Assam, joined by tributaries Dibang, Lohit, and Kenula. It has a <strong>braided channel</strong> in Assam, forming many riverine islands — including <strong>Majuli</strong>, the world's largest riverine island. Unlike other rivers, the Brahmaputra carries huge deposits of silt, causing its bed to <strong>rise over time</strong>.</p>,
  },
  {
    q: "Why is the Godavari known as the 'Dakshin Ganga'?",
    a: <p>The <strong>Godavari</strong> is the largest peninsular river at about <strong>1,500 km</strong> long. It originates in <strong>Nasik, Maharashtra</strong> and its basin covers most parts of Maharashtra, Madhya Pradesh, Odisha, and Andhra Pradesh. Because of its <strong>great length, large drainage basin, and cultural importance</strong> — similar to the Ganga in North India — it is called <strong>Dakshin Ganga</strong> (Ganga of the South). Tributaries include Purna, Wardha, Pranhita, Manjra, Wainganga, and Penganga.</p>,
  },
  {
    q: "Describe the Narmada and Tapi rivers and why they flow westward.",
    a: <>
      <p><strong>Narmada:</strong> Rises in the <strong>Amarkantak hills</strong>. Flows westward through a <strong>rift valley formed by faulting</strong>. Near Jabalpur, it creates a spectacular gorge through marble rocks, and the <strong>Dhuadhar Falls</strong> are a major attraction. Drains into the Arabian Sea.</p>
      <p><strong>Tapi:</strong> Originates in <strong>Betul, Madhya Pradesh</strong> in the Satpura ranges. Also flows through a <strong>rift valley parallel to the Narmada</strong> but is much shorter. Covers parts of MP, Gujarat, and Maharashtra. Both rivers flow west because they occupy rift valleys and drain into the <strong>Arabian Sea</strong> rather than the Bay of Bengal.</p>
    </>,
  },
  {
    q: "How are lakes formed? What are their benefits?",
    a: <>
      <p>Lakes are formed in various ways: <strong>Oxbow lakes</strong> form when a river meanders and cuts off a loop; <strong>Glacial lakes</strong> form when glaciers carve basins filled by snowmelt; <strong>Tectonic lakes</strong> (like Wular Lake, J&K) form due to crustal movements; <strong>Man-made lakes</strong> are formed by damming rivers for hydropower.</p>
      <p>Benefits include: regulating river flow, <strong>preventing floods</strong>, aiding hydropower generation, moderating local climate, maintaining aquatic ecosystems, supporting tourism, and providing recreation.</p>
    </>,
  },
  {
    q: "What is the role of rivers in India's economy?",
    a: <p>Rivers are <strong>natural sources of fresh water</strong> essential for life. Major cities and civilisations grew on river banks. Rivers are used for <strong>irrigation</strong> (supporting India's agricultural economy), <strong>navigation</strong> (inland waterways), and <strong>hydropower generation</strong>. They also support fishing, industry, and cultural life. India's river systems are the backbone of its economy.</p>,
  },
  {
    q: "What are the causes and effects of river pollution in India?",
    a: <p>River water quality is affected by growing <strong>domestic, municipal, industrial, and agricultural demand</strong>. Heavy loads of <strong>untreated sewage and industrial effluents</strong> are discharged directly into rivers, destroying their natural <strong>self-cleansing capacity</strong>. This leads to loss of aquatic life, spread of waterborne diseases, and unusable water for downstream communities. Concern over rising pollution has led to the launch of various <strong>river-cleaning action plans</strong> (e.g., Namami Gange).</p>,
  },
];

export default function DrainageBlog() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="blog-root">

        {/* ── Hero ── */}
        <div className="drn-hero">
          <div className="drn-hero-inner">
            <div className="drn-hero-tag">💧 Class 9 · Geography · Chapter 3</div>
            <h1 className="drn-hero-title">
              Drainage —<br /><span>India's River Systems</span>
            </h1>
            <p className="drn-hero-sub">
              From the glaciers of the Himalayas to the plateaus of the peninsula — explore India's major river systems, their basins, and the vital role they play in the nation's economy.
            </p>
            <div className="drn-hero-meta">
              <span className="drn-meta-chip">📚 NCERT Class 9</span>
              <span className="drn-meta-dot" />
              <span className="drn-meta-chip">🗺️ Contemporary India — I</span>
              <span className="drn-meta-dot" />
              <span className="drn-meta-chip">⏱️ 15 min read</span>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="drn-body">

          {/* Intro card */}
          <div className="drn-intro-card">
            <p>'Drainage' describes the <strong>river system of an area</strong> — how water flows across the land through rivers and their tributaries to eventually reach the sea.</p>
            <p>India has two major river systems — the <strong>Himalayan rivers</strong> (perennial, snow-fed) and the <strong>Peninsular rivers</strong> (seasonal, rain-fed). Together, they form one of the most extensive and important drainage networks in the world.</p>
          </div>

          {/* Key terms */}
          <div className="drn-terms">
            <div className="drn-term">
              <div className="drn-term-icon">🏞️</div>
              <h4>Drainage Basin</h4>
              <p>An area drained by a single river system. All water within the basin flows into one main river.</p>
            </div>
            <div className="drn-term">
              <div className="drn-term-icon">⛰️</div>
              <h4>Water Divide</h4>
              <p>An upland ridge that separates two drainage systems, directing water into different rivers.</p>
            </div>
            <div className="drn-term">
              <div className="drn-term-icon">🔀</div>
              <h4>River System</h4>
              <p>A river along with all its tributaries — together they form one interconnected drainage network.</p>
            </div>
          </div>

          {/* Himalayan vs Peninsular */}
          <div className="drn-label blue">Types of Rivers</div>
          <h2 className="drn-title">Himalayan vs <span className="teal">Peninsular Rivers</span></h2>
          <div className="drn-compare">
            <div className="drn-compare-col him">
              <h3>🏔️ Himalayan Rivers</h3>
              <ul>
                <li>Both <strong>rain-fed and snow-fed</strong> — perennial (flow all year)</li>
                <li>Perform intensive <strong>erosional activity</strong> in upper course</li>
                <li>Carry huge loads of <strong>silt and sand</strong> in lower course</li>
                <li>Create meanders, <strong>oxbow lakes</strong> and depositional features</li>
                <li>Major rivers: Indus, Ganga, Brahmaputra</li>
              </ul>
            </div>
            <div className="drn-compare-col pen">
              <h3>🌿 Peninsular Rivers</h3>
              <ul>
                <li>Mostly <strong>seasonal</strong> — depend primarily on rainfall</li>
                <li>Comparatively <strong>smaller basins</strong></li>
                <li>Most originate in the <strong>Western Ghats</strong></li>
                <li>Most flow <strong>eastward</strong> into the Bay of Bengal</li>
                <li>Major rivers: Godavari, Mahanadi, Krishna, Kaveri</li>
              </ul>
            </div>
          </div>

          <hr className="drn-divider" />

          {/* Himalayan Rivers */}
          <div className="drn-label blue">The Himalayan Rivers</div>
          <h2 className="drn-title">Three Major <span className="blue">River Systems</span></h2>

          {/* Indus */}
          <div className="drn-river-card indus">
            <div className="drn-river-head">
              <div className="drn-river-icon">🏔️</div>
              <div>
                <h3>The Indus River System <span className="drn-len-badge ind">2,900 km</span></h3>
                <p>Origin: Lake Mansarovar, Tibet → Arabian Sea</p>
              </div>
            </div>
            <div className="drn-river-body">
              <ul>
                <li>Rises near <strong>Lake Mansarovar in Tibet</strong>; enters India in Ladakh (J&K)</li>
                <li>Kashmir tributaries: <strong>Zaskar, Nubra, Shyok</strong></li>
                <li>Satluj, Beas, Ravi, Chenab, and Jhelum join near <strong>Mithankot, Pakistan</strong></li>
                <li>Flows southward to empty into the <strong>Arabian Sea, east of Karachi</strong></li>
                <li>Waters shared between India and Pakistan via the <strong>Indus Water Treaty (1960)</strong></li>
              </ul>
            </div>
          </div>

          {/* Ganga */}
          <div className="drn-river-card ganga">
            <div className="drn-river-head">
              <div className="drn-river-icon">🌊</div>
              <div>
                <h3>The Ganga River System <span className="drn-len-badge gan">2,500+ km</span></h3>
                <p>Origin: Gangotri Glacier → Bay of Bengal (Sunderban Delta)</p>
              </div>
            </div>
            <div className="drn-river-body">
              <ul>
                <li>Headwaters called <strong>Bhagirathi</strong>, fed by Gangotri Glacier; joined by <strong>Alaknanda at Devprayag</strong></li>
                <li>Himalayan tributaries: <strong>Ghaghara, Gandak, Kosi</strong></li>
                <li><strong>Yamuna</strong> (from Yamunotri Glacier) joins at Allahabad (Prayagraj)</li>
                <li>Peninsular tributaries: <strong>Chambal, Betwa, Son</strong></li>
                <li><strong>Farakka</strong> (West Bengal) is the northernmost point of the Ganga Delta</li>
                <li>Joins Brahmaputra → forms <strong>Meghna</strong> → Bay of Bengal → <strong>Sunderban Delta</strong> (world's largest)</li>
              </ul>
            </div>
          </div>

          {/* Brahmaputra */}
          <div className="drn-river-card brahma">
            <div className="drn-river-head">
              <div className="drn-river-icon">🌀</div>
              <div>
                <h3>The Brahmaputra River System <span className="drn-len-badge brh">~2,900 km</span></h3>
                <p>Origin: Tibet → U-turn at Namcha Barwa → Assam → Bay of Bengal</p>
              </div>
            </div>
            <div className="drn-river-body">
              <ul>
                <li>Originates in <strong>Tibet</strong>, close to sources of Indus and Satluj; most course lies outside India</li>
                <li>Makes a dramatic <strong>U-turn at Namcha Barwa</strong> and enters Arunachal Pradesh</li>
                <li>Tributaries in India: <strong>Dibang, Lohit, Kenula</strong></li>
                <li>Has a <strong>braided channel</strong> throughout Assam — forms many riverine islands</li>
                <li>Contains <strong>Majuli</strong> — the world's largest riverine island</li>
                <li>Unusual: massive <strong>silt deposits raise its bed</strong> higher than the surrounding plains</li>
              </ul>
            </div>
          </div>

          <hr className="drn-divider" />

          {/* Peninsular Rivers */}
          <div className="drn-label teal">The Peninsular Rivers</div>
          <h2 className="drn-title">Major <span className="teal">Peninsular Basins</span></h2>

          <div className="drn-flow-split">
            <div className="drn-flow-card west">
              <div className="drn-flow-icon">⬅️</div>
              <h4>West-Flowing Rivers</h4>
              <p>Narmada, Tapi, Sabarmati, Mahi, Bharathpuzha, Periyar — drain into the Arabian Sea via estuaries</p>
            </div>
            <div className="drn-flow-card east">
              <div className="drn-flow-icon">➡️</div>
              <h4>East-Flowing Rivers</h4>
              <p>Mahanadi, Godavari, Krishna, Kaveri — originate in Western Ghats and drain into the Bay of Bengal</p>
            </div>
          </div>

          <div className="drn-info-box" style={{borderLeftColor:'#0f766e', marginBottom:'28px'}}>
            <h4>🗻 The Western Ghats — Main Water Divide</h4>
            <p>The <strong>Western Ghats</strong> act as the principal water divide in peninsular India. Rivers to the east flow into the Bay of Bengal; the Narmada and Tapi uniquely flow westward through <strong>rift valleys into the Arabian Sea</strong>.</p>
          </div>

          <div className="drn-pen-grid">
            {[
              { cls:"god", icon:"🌊", name:"Godavari", len:"~1,500 km", desc:"Largest peninsular river. Originates in Nasik, Maharashtra. Known as Dakshin Ganga. Drains into Bay of Bengal." },
              { cls:"mah", icon:"💧", name:"Mahanadi", len:"860 km", desc:"Rises in Chhattisgarh, flows through Odisha. Basin shared by Maharashtra, Odisha, Jharkhand & Chhattisgarh." },
              { cls:"kri", icon:"🏞️", name:"Krishna", len:"1,400 km", desc:"Rises near Mahabaleshwar. Tributaries: Bhima, Musi, Tungabhadra. Shared by Maharashtra, Karnataka & Andhra." },
              { cls:"kav", icon:"🌀", name:"Kaveri", len:"~760 km", desc:"Originates in Brahmagiri range, Western Ghats. Forms Sivasamudram — India's second largest waterfall." },
              { cls:"nar", icon:"⛰️", name:"Narmada", len:"~1,300 km", desc:"Rises in Amarkantak hills. Flows west through a rift valley. Dhuadhar Falls near Jabalpur. Drains into Arabian Sea." },
              { cls:"tap", icon:"🏔️", name:"Tapi", len:"~724 km", desc:"Originates in Betul, MP (Satpura ranges). Flows west parallel to Narmada through a rift valley." },
            ].map((r, i) => (
              <div className={`drn-pen-card ${r.cls}`} key={i}>
                <div style={{fontSize:'24px', marginBottom:'8px'}}>{r.icon}</div>
                <h4>{r.name}</h4>
                <div className="drn-pen-len">{r.len}</div>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>

          <hr className="drn-divider" />

          {/* Lakes */}
          <div className="drn-label cyan">Lakes</div>
          <h2 className="drn-title">Types of <span className="cyan">Lakes in India</span></h2>

          <div className="drn-lake-grid">
            {[
              { icon:"🔄", title:"Oxbow Lakes", desc:"Formed when a meandering river cuts off a loop from its main channel. Common in the Ganga plains." },
              { icon:"🧊", title:"Glacial Lakes", desc:"Formed when glaciers carve out a basin, later filled by snowmelt. Found in Himalayan regions." },
              { icon:"🌋", title:"Tectonic Lakes", desc:"Result of crustal movements. Example: Wular Lake in Jammu & Kashmir — one of the largest freshwater lakes in Asia." },
              { icon:"🏗️", title:"Man-Made Lakes", desc:"Created by damming rivers for hydroelectric power. Example: Gobind Sagar (Bhakra Dam), Nagarjunasagar." },
            ].map((l, i) => (
              <div className="drn-lake-card" key={i}>
                <div className="drn-lake-icon">{l.icon}</div>
                <h4>{l.title}</h4>
                <p>{l.desc}</p>
              </div>
            ))}
          </div>

          <div className="drn-benefit-strip">
            <h3>✅ Benefits of Lakes</h3>
            <div className="drn-benefit-tags">
              {["Regulate river flow","Prevent flooding","Aid hydropower","Moderate climate","Maintain aquatic ecosystem","Enhance natural beauty","Develop tourism","Provide recreation"].map((b, i) => (
                <span className="drn-btag" key={i}>{b}</span>
              ))}
            </div>
          </div>

          <hr className="drn-divider" />

          {/* Economy */}
          <div className="drn-label green">Economic Role</div>
          <h2 className="drn-title">Rivers &amp; <span className="green">India's Economy</span></h2>

          <div className="drn-econ-grid">
            <div className="drn-econ-card a">
              <div className="drn-econ-icon">💧</div>
              <h4>Fresh Water</h4>
              <p>Natural sources of water for drinking, household, and industrial use</p>
            </div>
            <div className="drn-econ-card b">
              <div className="drn-econ-icon">🌾</div>
              <h4>Irrigation</h4>
              <p>Vital for agriculture — India is primarily an agricultural economy</p>
            </div>
            <div className="drn-econ-card c">
              <div className="drn-econ-icon">⚡</div>
              <h4>Hydropower</h4>
              <p>Rivers power major hydroelectric projects across the country</p>
            </div>
            <div className="drn-econ-card d">
              <div className="drn-econ-icon">🚢</div>
              <h4>Navigation</h4>
              <p>Inland waterways reduce transport costs and support trade</p>
            </div>
          </div>

          {/* Pollution */}
          <div className="drn-pollution">
            <h3>⚠️ River Pollution — A Growing Crisis</h3>
            <ul>
              <li>Growing <strong>domestic, municipal, industrial, and agricultural demand</strong> puts pressure on river water quality</li>
              <li>Heavy loads of <strong>untreated sewage and industrial effluents</strong> are discharged directly into rivers</li>
              <li>This destroys the river's natural <strong>self-cleansing property</strong> — leading to dead zones and loss of aquatic life</li>
              <li>Concern over rising pollution has led to <strong>river-cleaning action plans</strong> — including projects like Namami Gange</li>
            </ul>
          </div>

          <hr className="drn-divider" />

          {/* FAQ */}
          <div className="drn-faq-label">Practice Questions</div>
          <h2 className="drn-faq-title">Frequently Asked Questions</h2>

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
