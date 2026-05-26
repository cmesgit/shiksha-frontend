import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #0f172a;
    --ink2:       #1e293b;
    --muted:      #64748b;
    --violet:     #7c3aed;
    --violet2:    #6d28d9;
    --violet-bg:  #f5f3ff;
    --violet-bd:  #ddd6fe;
    --rose:       #e11d48;
    --rose-bg:    #fff1f2;
    --rose-bd:    #fecdd3;
    --orange:     #ea580c;
    --orange-bg:  #fff7ed;
    --orange-bd:  #fed7aa;
    --sky:        #0284c7;
    --sky-bg:     #f0f9ff;
    --sky-bd:     #bae6fd;
    --teal:       #0f766e;
    --teal-bg:    #f0fdfa;
    --teal-bd:    #99f6e4;
    --amber:      #d97706;
    --amber-bg:   #fffbeb;
    --amber-bd:   #fde68a;
    --green:      #15803d;
    --green-bg:   #f0fdf4;
    --green-bd:   #86efac;
    --card:       #ffffff;
  }

  .blog-root {
    font-family: 'Inter', sans-serif;
    background: #faf8ff;
    color: var(--ink);
    min-height: 100vh;
  }

  /* ── Hero ── */
  .clm-hero {
    background: linear-gradient(135deg, #1a0533 0%, #3b0764 38%, #6d28d9 72%, #7c3aed 100%);
    padding: 80px 24px 96px;
    position: relative; overflow: hidden;
  }
  .clm-hero::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      radial-gradient(circle at 10% 65%, rgba(251,191,36,0.14) 0%, transparent 50%),
      radial-gradient(circle at 88% 18%, rgba(124,58,237,0.22) 0%, transparent 52%),
      radial-gradient(circle at 55% 95%, rgba(234,88,12,0.1) 0%, transparent 40%);
  }
  .clm-hero::after {
    content: '🌧️';
    position: absolute; right: 44px; top: 36px;
    font-size: 130px; opacity: 0.07; line-height: 1;
  }
  .clm-hero-inner {
    max-width: 820px; margin: 0 auto;
    position: relative; z-index: 1;
  }
  .clm-hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(251,191,36,0.15);
    border: 1px solid rgba(251,191,36,0.32);
    color: #fde68a;
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 600;
    padding: 6px 16px; border-radius: 100px;
    margin-bottom: 28px;
    letter-spacing: 0.05em; text-transform: uppercase;
  }
  .clm-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 900; line-height: 1.07;
    color: #ffffff; margin: 0 0 20px;
    letter-spacing: -0.02em;
  }
  .clm-hero-title span { color: #c4b5fd; }
  .clm-hero-sub {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 500;
    color: #ddd6fe; line-height: 1.7;
    max-width: 620px; margin: 0 0 40px;
  }
  .clm-hero-meta { display: flex; flex-wrap: wrap; gap: 20px; align-items: center; }
  .clm-meta-chip { color: #c4b5fd; font-size: 14px; font-weight: 500; display: flex; align-items: center; gap: 7px; }
  .clm-meta-dot  { width: 4px; height: 4px; background: #a78bfa; border-radius: 50%; display: inline-block; }

  /* ── Body ── */
  .clm-body {
    max-width: 820px; margin: 0 auto;
    padding: 64px 24px 80px;
  }

  /* ── Intro card ── */
  .clm-intro-card {
    background: linear-gradient(135deg, #1a0533, #3b0764);
    border-radius: 20px; padding: 40px 44px;
    margin-bottom: 56px;
    position: relative; overflow: hidden;
  }
  .clm-intro-card::after {
    content: '🌦️';
    position: absolute; top: 8px; right: 28px;
    font-size: 120px; opacity: 0.07; line-height: 1;
  }
  .clm-intro-card p {
    font-family: 'Poppins', sans-serif;
    font-size: 19px; font-weight: 500;
    color: #ddd6fe; line-height: 1.75;
    margin: 0 0 16px; position: relative; z-index: 1;
  }
  .clm-intro-card p:last-child { margin: 0; }
  .clm-intro-card strong { color: #c4b5fd; }

  /* ── Weather vs Climate split card ── */
  .clm-wvc {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0; border-radius: 16px; overflow: hidden;
    border: 1.5px solid var(--violet-bd);
    margin-bottom: 48px;
  }
  @media (max-width: 540px) { .clm-wvc { grid-template-columns: 1fr; } }
  .clm-wvc-col { padding: 28px 26px; }
  .clm-wvc-col.weather { background: var(--sky-bg); }
  .clm-wvc-col.climate { background: var(--violet-bg); border-left: 1.5px solid var(--violet-bd); }
  @media (max-width: 540px) {
    .clm-wvc-col.climate { border-left: none; border-top: 1.5px solid var(--violet-bd); }
  }
  .clm-wvc-col h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 17px; font-weight: 800; margin: 0 0 10px;
  }
  .clm-wvc-col.weather h3 { color: var(--sky); }
  .clm-wvc-col.climate h3 { color: var(--violet); }
  .clm-wvc-col p { font-size: 15px; color: var(--ink2); line-height: 1.7; margin: 0 0 10px; }
  .clm-wvc-col p:last-child { margin: 0; }
  .clm-wvc-tag {
    display: inline-block;
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    padding: 3px 10px; border-radius: 100px;
    letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 10px;
  }
  .clm-wvc-col.weather .clm-wvc-tag { background: #dbeafe; color: #1e40af; }
  .clm-wvc-col.climate .clm-wvc-tag { background: #ede9fe; color: #5b21b6; }

  /* ── Elements strip ── */
  .clm-elements {
    display: grid; grid-template-columns: repeat(5, 1fr);
    gap: 10px; margin-bottom: 52px;
  }
  @media (max-width: 600px) { .clm-elements { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 380px) { .clm-elements { grid-template-columns: repeat(2, 1fr); } }
  .clm-el-box {
    background: var(--card);
    border: 1.5px solid var(--violet-bd);
    border-radius: 12px; padding: 18px 10px;
    text-align: center;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .clm-el-box:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(124,58,237,0.1); }
  .clm-el-icon { font-size: 26px; margin-bottom: 8px; }
  .clm-el-box p {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 700;
    color: var(--violet); margin: 0;
    line-height: 1.3;
  }

  /* ── Section labels & titles ── */
  .clm-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 10px;
  }
  .clm-label.vio  { color: var(--violet); }
  .clm-label.org  { color: var(--orange); }
  .clm-label.sky  { color: var(--sky); }
  .clm-label.teal { color: var(--teal); }
  .clm-label.amb  { color: var(--amber); }
  .clm-label.grn  { color: var(--green); }
  .clm-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(26px, 4vw, 36px); font-weight: 800;
    color: var(--ink); line-height: 1.2;
    margin: 0 0 28px; letter-spacing: -0.01em;
  }
  .clm-title .vio  { color: var(--violet); }
  .clm-title .org  { color: var(--orange); }
  .clm-title .sky  { color: var(--sky); }
  .clm-title .teal { color: var(--teal); }
  .clm-title .amb  { color: var(--amber); }
  .clm-title .grn  { color: var(--green); }
  .clm-title .rose { color: var(--rose); }

  /* ── Climatic controls hexagon-style grid ── */
  .clm-controls {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px; margin-bottom: 48px;
  }
  @media (max-width: 540px) { .clm-controls { grid-template-columns: repeat(2, 1fr); } }
  .clm-ctrl-card {
    background: var(--card);
    border: 1.5px solid #e9d5ff;
    border-radius: 16px; padding: 22px 18px;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .clm-ctrl-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,58,237,0.1); }
  .clm-ctrl-icon { font-size: 28px; margin-bottom: 10px; }
  .clm-ctrl-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 700; color: var(--violet2);
    margin: 0 0 6px; text-transform: uppercase; letter-spacing: 0.04em;
  }
  .clm-ctrl-card p { font-size: 14px; color: var(--ink2); line-height: 1.65; margin: 0; }

  /* ── Himalayan shield callout ── */
  .clm-shield {
    background: linear-gradient(135deg, #1a0533, #3b0764);
    border-radius: 16px; padding: 26px 30px;
    margin-bottom: 40px;
    display: flex; gap: 18px; align-items: flex-start;
  }
  .clm-shield-icon { font-size: 38px; flex-shrink: 0; }
  @media (max-width: 480px) {
    .clm-shield { flex-direction: column; align-items: center; text-align: center; }
  }
  .clm-shield h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 700; color: #c4b5fd; margin: 0 0 8px;
  }
  .clm-shield p { font-size: 15px; color: #ddd6fe; line-height: 1.7; margin: 0; }
  .clm-shield strong { color: #fde68a; }

  /* ── Info box ── */
  .clm-info-box {
    background: var(--card);
    border-left: 4px solid var(--violet);
    border-radius: 0 12px 12px 0;
    padding: 20px 24px; margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  }
  .clm-info-box h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 700; color: var(--ink); margin: 0 0 6px;
  }
  .clm-info-box p { font-size: 15px; color: #374151; line-height: 1.7; margin: 0; }
  .clm-info-box strong { color: var(--violet); }

  /* ── Divider ── */
  .clm-divider { border: none; border-top: 1.5px solid #ede9fe; margin: 52px 0; }

  /* ── Monsoon mechanism — numbered steps ── */
  .clm-steps {
    display: flex; flex-direction: column; gap: 16px;
    margin-bottom: 40px;
  }
  .clm-step {
    display: flex; gap: 18px; align-items: flex-start;
  }
  .clm-step-num {
    width: 38px; height: 38px; flex-shrink: 0;
    background: var(--violet); color: #fff;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 15px; font-weight: 900;
  }
  .clm-step-body { flex: 1; padding-top: 4px; }
  .clm-step-body h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 700; color: var(--ink); margin: 0 0 4px;
  }
  .clm-step-body p { font-size: 14px; color: var(--muted); line-height: 1.65; margin: 0; }

  /* ── El Nino / Southern Oscillation cards ── */
  .clm-enso {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 16px; margin-bottom: 40px;
  }
  @media (max-width: 520px) { .clm-enso { grid-template-columns: 1fr; } }
  .clm-enso-card {
    border-radius: 16px; padding: 24px 22px; border: 1.5px solid;
  }
  .clm-enso-card.so { background: var(--sky-bg); border-color: var(--sky-bd); }
  .clm-enso-card.el { background: var(--orange-bg); border-color: var(--orange-bd); }
  .clm-enso-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 700; margin: 0 0 8px;
  }
  .clm-enso-card.so h4 { color: var(--sky); }
  .clm-enso-card.el h4 { color: var(--orange); }
  .clm-enso-card p { font-size: 15px; color: var(--ink2); line-height: 1.7; margin: 0; }

  /* ── Four Seasons — timeline cards ── */
  .clm-seasons {
    display: flex; flex-direction: column; gap: 0;
    border-radius: 20px; overflow: hidden;
    border: 1.5px solid #e9d5ff;
    margin-bottom: 40px;
  }
  .clm-season-row {
    display: flex; align-items: stretch;
    border-bottom: 1.5px solid #e9d5ff;
  }
  .clm-season-row:last-child { border-bottom: none; }
  .clm-season-tag {
    width: 100px; flex-shrink: 0;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 22px 10px; text-align: center;
    gap: 6px;
  }
  .clm-season-row.s1 .clm-season-tag { background: linear-gradient(160deg, #0c4a6e, #0369a1); }
  .clm-season-row.s2 .clm-season-tag { background: linear-gradient(160deg, #7c2d12, #ea580c); }
  .clm-season-row.s3 .clm-season-tag { background: linear-gradient(160deg, #1e1b4b, #4338ca); }
  .clm-season-row.s4 .clm-season-tag { background: linear-gradient(160deg, #14532d, #16a34a); }
  .clm-season-emoji { font-size: 26px; }
  .clm-season-name {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    color: rgba(255,255,255,0.85);
    text-transform: uppercase; letter-spacing: 0.04em;
    line-height: 1.3;
  }
  .clm-season-body {
    flex: 1; padding: 22px 24px;
  }
  .clm-season-row.s1 .clm-season-body { background: var(--sky-bg); }
  .clm-season-row.s2 .clm-season-body { background: var(--orange-bg); }
  .clm-season-row.s3 .clm-season-body { background: var(--violet-bg); }
  .clm-season-row.s4 .clm-season-body { background: var(--teal-bg); }
  .clm-season-body h4 {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px; font-weight: 800; margin: 0 0 8px;
  }
  .clm-season-row.s1 .clm-season-body h4 { color: var(--sky); }
  .clm-season-row.s2 .clm-season-body h4 { color: var(--orange); }
  .clm-season-row.s3 .clm-season-body h4 { color: var(--violet); }
  .clm-season-row.s4 .clm-season-body h4 { color: var(--teal); }
  .clm-season-body ul { margin: 0; padding-left: 18px; }
  .clm-season-body ul li { font-size: 14px; color: var(--ink2); line-height: 1.7; margin-bottom: 6px; }
  .clm-season-body ul li:last-child { margin-bottom: 0; }

  /* ── Special weather phenomena chips ── */
  .clm-phenomena {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 14px; margin-bottom: 40px;
  }
  .clm-phen-card {
    background: var(--card);
    border: 1.5px solid #e9d5ff;
    border-radius: 14px; padding: 20px 18px;
    transition: transform 0.2s;
  }
  .clm-phen-card:hover { transform: translateY(-2px); }
  .clm-phen-icon { font-size: 28px; margin-bottom: 10px; }
  .clm-phen-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 700; color: var(--violet2);
    margin: 0 0 6px;
  }
  .clm-phen-card p { font-size: 14px; color: var(--muted); line-height: 1.6; margin: 0; }

  /* ── Rainfall range bar ── */
  .clm-rainfall {
    background: linear-gradient(135deg, #1a0533, #3b0764);
    border-radius: 18px; padding: 30px 34px;
    margin-bottom: 44px;
  }
  .clm-rainfall h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px; font-weight: 800; color: #c4b5fd; margin: 0 0 20px;
  }
  .clm-rf-row {
    display: flex; align-items: center; gap: 14px; margin-bottom: 14px;
  }
  .clm-rf-row:last-child { margin-bottom: 0; }
  .clm-rf-label {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 600; color: #ddd6fe;
    width: 200px; flex-shrink: 0; line-height: 1.4;
  }
  .clm-rf-bar-wrap {
    flex: 1; background: rgba(255,255,255,0.1); border-radius: 100px; height: 14px;
  }
  .clm-rf-bar {
    height: 100%; border-radius: 100px;
  }
  .clm-rf-bar.high { background: linear-gradient(90deg, #38bdf8, #818cf8); width: 100%; }
  .clm-rf-bar.mid  { background: linear-gradient(90deg, #a78bfa, #c4b5fd); width: 55%; }
  .clm-rf-bar.low  { background: linear-gradient(90deg, #fde68a, #fbbf24); width: 18%; }
  .clm-rf-val {
    font-family: 'Montserrat', sans-serif;
    font-size: 13px; font-weight: 800; color: #fde68a;
    width: 60px; text-align: right; flex-shrink: 0;
  }

  /* ── Unifying Bond ── */
  .clm-unity {
    background: linear-gradient(135deg, #f0fdf4, #dcfce7);
    border: 1.5px solid var(--green-bd);
    border-radius: 18px; padding: 32px 36px;
    margin-bottom: 44px;
    display: flex; gap: 18px; align-items: flex-start;
  }
  .clm-unity-icon { font-size: 40px; flex-shrink: 0; }
  @media (max-width: 480px) {
    .clm-unity { flex-direction: column; align-items: center; text-align: center; }
  }
  .clm-unity h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px; font-weight: 800; color: var(--green); margin: 0 0 10px;
  }
  .clm-unity p { font-size: 15px; color: #14532d; line-height: 1.75; margin: 0; }

  /* ── FAQ ── */
  .clm-faq-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 700; color: var(--violet);
    letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 10px;
  }
  .clm-faq-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(24px, 4vw, 34px); font-weight: 800;
    color: var(--ink); margin: 0 0 32px; letter-spacing: -0.01em;
  }
  .faq-item {
    border: 1.5px solid #ede9fe;
    border-radius: 14px; margin-bottom: 12px;
    overflow: hidden; background: var(--card);
    transition: border-color 0.2s;
  }
  .faq-item.open { border-color: var(--violet-bd); }
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
  .faq-icon { font-size: 22px; font-weight: 700; color: var(--violet); flex-shrink: 0; line-height: 1; }
  .faq-ans {
    display: none; padding: 0 24px 20px;
    font-size: 15px; color: #374151; line-height: 1.75;
  }
  .faq-ans.visible { display: block; }
  .faq-ans strong { color: var(--violet); }
  .faq-ans p { margin: 0 0 10px; }
  .faq-ans p:last-child { margin: 0; }
`;

const faqs = [
  {
    q: "What is the difference between weather and climate?",
    a: <p><strong>Weather</strong> refers to the state of the atmosphere over a specific area at any given point of time — it changes from day to day. <strong>Climate</strong> is the generalised weather condition of a place averaged over a long period of <strong>30 years</strong>. Elements of both include temperature, atmospheric pressure, wind, humidity, and precipitation. India has a <strong>monsoon type of climate</strong>.</p>,
  },
  {
    q: "What are the major factors that affect India's climate?",
    a: <>
      <p>The major factors (climatic controls) are:</p>
      <p><strong>Latitude:</strong> The Tropic of Cancer divides India — the southern part is tropical, the north is temperate. <strong>Altitude:</strong> Temperature decreases with height. <strong>Pressure & Winds:</strong> Seasonal reversal of winds drives the monsoon. <strong>Distance from Sea:</strong> Coastal areas have moderate climate; interiors experience extremes (continentality). <strong>Ocean Currents:</strong> Affect temperature of coastal areas. <strong>Relief Features:</strong> The Himalayas block cold Central Asian winds and force monsoon winds upward.</p>
    </>,
  },
  {
    q: "What is the Coriolis force and how does it affect winds?",
    a: <p>The <strong>Coriolis force</strong> is an apparent force caused by the <strong>Earth's rotation</strong>. It deflects winds to the right in the Northern Hemisphere and to the left in the Southern Hemisphere. This force causes the monsoon winds to change direction seasonally — blowing from the northeast in winter and reversing to bring moisture from the southwest in summer.</p>,
  },
  {
    q: "What are jet streams and western cyclonic disturbances?",
    a: <>
      <p><strong>Jet streams</strong> are narrow belts of high-speed westerly winds at high altitudes (above <strong>12,000 m</strong>) in the troposphere. The westerly jet stream moves north of the Himalayas in summer, allowing the monsoon to advance. In winter, a tropical easterly jet stream develops over the peninsula.</p>
      <p><strong>Western cyclonic disturbances</strong> are weather phenomena of the <strong>winter months</strong>, carried by the westerly flow from the <strong>Mediterranean region</strong>. They bring rainfall to northwestern India and snowfall to the Himalayas in winter.</p>
    </>,
  },
  {
    q: "Explain the mechanism of the Indian Monsoon.",
    a: <>
      <p>The Indian monsoon is driven by several interconnected factors:</p>
      <p>1. <strong>Differential heating</strong> of land and water creates pressure differences. 2. The <strong>ITCZ</strong> shifts northward in summer, drawing winds from the south. 3. <strong>High pressure east of Madagascar</strong> drives moisture-laden winds toward India. 4. <strong>Intense heating of the Tibetan Plateau</strong> creates strong updrafts. 5. The <strong>westerly jet stream shifts north</strong> of the Himalayas, and the tropical easterly jet stream develops — together triggering the monsoon. Changes in <strong>Southern Oscillation (SO)</strong> and <strong>El Niño</strong> also influence monsoon strength.</p>
    </>,
  },
  {
    q: "What is El Niño and how does it affect India's monsoon?",
    a: <p><strong>El Niño</strong> is a warm ocean current that flows past the Peruvian coast every <strong>2 to 5 years</strong>, replacing the cold Peruvian current. It causes a rise in sea surface temperature in the eastern Pacific, which disrupts global atmospheric circulation patterns. When El Niño is active, India often experiences <strong>weaker monsoon rains</strong>, leading to drought conditions in some parts of the country.</p>,
  },
  {
    q: "Describe the four seasons of India.",
    a: <>
      <p><strong>1. Cold Weather Season (Winter — Dec to Feb):</strong> Northeast trade winds prevail. Days are warm, nights cold. Frost in the north; Himalayan slopes get snowfall.</p>
      <p><strong>2. Hot Weather Season (Summer — Mar to May):</strong> Rising temperature and falling pressure in northern India. Hot, dry 'Loo' winds blow during the day. Dust storms and 'Kaal Baisakhi' in West Bengal.</p>
      <p><strong>3. Advancing Monsoon (Rainy — June to Sep):</strong> Southwest monsoon arrives at Kerala by first week of June. Has wet and dry 'breaks'. Forms the Sunderban Delta with the Brahmaputra.</p>
      <p><strong>4. Retreating Monsoon (Oct to Nov):</strong> Gradual withdrawal from northwest. 'October heat' — oppressive due to high temperature and humidity. Cyclonic depressions form over Bay of Bengal.</p>
    </>,
  },
  {
    q: "What is 'Loo' and 'Kaal Baisakhi'?",
    a: <>
      <p><strong>Loo:</strong> Strong, gusty, hot, and dry winds that blow during the day over <strong>north and northwestern India</strong> during the hot weather season (May–June). Temperatures can exceed 45°C. Exposure to Loo can be fatal.</p>
      <p><strong>Kaal Baisakhi:</strong> Localised violent thunderstorms in <strong>West Bengal</strong> (and Bangladesh) occurring in the pre-monsoon season. Associated with violent winds, torrential downpours, and hail. The name means "calamity of the month of Baisakh".</p>
    </>,
  },
  {
    q: "How is rainfall distributed across India?",
    a: <p>Rainfall in India is <strong>highly variable and unevenly distributed</strong>. The <strong>western coast and northeastern India</strong> receive the highest rainfall — up to <strong>400 cm</strong> annually. The <strong>northern plains</strong> show a decrease in rainfall from east to west. <strong>Western Rajasthan and adjoining areas</strong> receive the least — around <strong>60 cm</strong> annually. Areas of high rainfall are prone to floods; areas of low rainfall are drought-prone.</p>,
  },
  {
    q: "How is monsoon a 'unifying bond' for India?",
    a: <p>The monsoon acts as a <strong>unifying bond</strong> because nearly every aspect of Indian life revolves around it. <strong>Farmers</strong> depend on it for crops, <strong>festival dates</strong> are planned around the seasonal cycle, and the <strong>needs of plants, animals, and humans</strong> are all shaped by it. Despite India's vast diversity in geography, language, and culture, the shared anticipation and dependence on the monsoon connects all Indians — making it a powerful <strong>cultural and ecological unifier</strong>.</p>,
  },
];

export default function ClimateBlog() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="blog-root">

        {/* ── Hero ── */}
        <div className="clm-hero">
          <div className="clm-hero-inner">
            <div className="clm-hero-tag">🌧️ Class 9 · Geography · Chapter 4</div>
            <h1 className="clm-hero-title">
              Climate —<br /><span>India's Monsoon World</span>
            </h1>
            <p className="clm-hero-sub">
              From the icy Himalayan shields to scorching Loo winds and life-giving monsoons — understand the forces that shape India's extraordinary climate.
            </p>
            <div className="clm-hero-meta">
              <span className="clm-meta-chip">📚 NCERT Class 9</span>
              <span className="clm-meta-dot" />
              <span className="clm-meta-chip">🗺️ Contemporary India — I</span>
              <span className="clm-meta-dot" />
              <span className="clm-meta-chip">⏱️ 14 min read</span>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="clm-body">

          {/* Intro card */}
          <div className="clm-intro-card">
            <p>India has a <strong>monsoon type of climate</strong> — defined by a dramatic seasonal reversal of winds that brings rain to a billion lives. The climate varies enormously across regions, from tropical coasts to alpine peaks.</p>
            <p>Temperature, rainfall, and seasons all differ from one corner of India to another, <strong>shaping the food, dress, professions, and festivals</strong> of its people. Understanding climate is understanding India itself.</p>
          </div>

          {/* Weather vs Climate */}
          <div className="clm-label vio">Fundamentals</div>
          <h2 className="clm-title">Weather vs <span className="vio">Climate</span></h2>

          <div className="clm-wvc">
            <div className="clm-wvc-col weather">
              <span className="clm-wvc-tag">Short Term</span>
              <h3>☁️ Weather</h3>
              <p>State of the atmosphere over a specific area <strong>at any point of time</strong>. Changes day to day and even hour to hour.</p>
              <p>Example: "It is raining in Delhi today."</p>
            </div>
            <div className="clm-wvc-col climate">
              <span className="clm-wvc-tag">Long Term</span>
              <h3>🌦️ Climate</h3>
              <p>Generalised weather conditions of a place averaged over a <strong>30-year period</strong>. Stable, predictable patterns.</p>
              <p>Example: "Mumbai has a hot and wet climate."</p>
            </div>
          </div>

          {/* Elements */}
          <div className="clm-label vio">Elements of Weather &amp; Climate</div>
          <div className="clm-elements">
            {[
              { icon:"🌡️", label:"Temperature" },
              { icon:"🌬️", label:"Atmospheric Pressure" },
              { icon:"💨", label:"Wind" },
              { icon:"💧", label:"Humidity" },
              { icon:"🌧️", label:"Precipitation" },
            ].map((e, i) => (
              <div className="clm-el-box" key={i}>
                <div className="clm-el-icon">{e.icon}</div>
                <p>{e.label}</p>
              </div>
            ))}
          </div>

          <hr className="clm-divider" />

          {/* Climatic Controls */}
          <div className="clm-label vio">Climatic Controls</div>
          <h2 className="clm-title">Factors Affecting <span className="vio">India's Climate</span></h2>

          <div className="clm-controls">
            {[
              { icon:"🌐", title:"Latitude", desc:"Tropic of Cancer divides India. Southern India is tropical; northern India is temperate. Temperature generally decreases from equator to poles." },
              { icon:"⛰️", title:"Altitude", desc:"Temperature and air pressure decrease with height. Hill stations are cooler than plains at the same latitude." },
              { icon:"💨", title:"Pressure & Winds", desc:"Seasonal reversal of wind direction drives the monsoon — northeast in winter, southwest in summer bringing moisture." },
              { icon:"🌊", title:"Distance from Sea", desc:"Coastal areas have moderate temperatures. Interior regions experience temperature extremes — called 'continentality'." },
              { icon:"🌀", title:"Ocean Currents", desc:"Warm and cold ocean currents affect the temperature and rainfall of coastal areas they flow past." },
              { icon:"🏔️", title:"Relief Features", desc:"Mountains act as barriers. The Himalayas block cold Central Asian winds and force monsoon winds to rise and shed rain." },
            ].map((c, i) => (
              <div className="clm-ctrl-card" key={i}>
                <div className="clm-ctrl-icon">{c.icon}</div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="clm-shield">
            <div className="clm-shield-icon">🛡️</div>
            <div>
              <h4>The Himalayan Shield</h4>
              <p>The Himalayas act as a <strong>protective barrier</strong> — preventing the bitterly cold winds from Central Asia from sweeping into the Indian subcontinent. Without the Himalayas, north India would experience far harsher winters. They also force the monsoon winds upward, causing heavy rainfall on the windward side.</p>
            </div>
          </div>

          <hr className="clm-divider" />

          {/* Monsoon Mechanism */}
          <div className="clm-label org">The Indian Monsoon</div>
          <h2 className="clm-title">How the <span className="org">Monsoon Works</span></h2>

          <div className="clm-info-box" style={{borderLeftColor:'#ea580c', marginBottom:'28px'}}>
            <h4>🌬️ What is a Monsoon?</h4>
            <p>Monsoon is a <strong>seasonal reversal of wind direction</strong> throughout the year. The word 'monsoon' was named by <strong>Arab traders</strong> who noticed these winds. It is characterised by a sudden <strong>'burst'</strong> — a sharp onset with continuous heavy rainfall over several days.</p>
          </div>

          <div className="clm-steps">
            {[
              { title:"Differential Heating of Land & Water", desc:"Land heats up faster than water in summer, creating low pressure over the Indian subcontinent and drawing in moist winds from the sea." },
              { title:"Inter Tropical Convergence Zone (ITCZ)", desc:"A broad trough of low pressure in equatorial latitudes where northeast and southeast trade winds converge. Shifts northward in summer over the Ganga plain." },
              { title:"High Pressure East of Madagascar", desc:"A high-pressure area in the southern Indian Ocean drives moisture-laden winds northward toward India." },
              { title:"Intense Heating of Tibetan Plateau", desc:"The plateau heats up intensely in summer, creating strong upper-air anticyclones that help pull the monsoon northward." },
              { title:"Jet Stream Shifts", desc:"The westerly jet stream moves north of the Himalayas in summer; the tropical easterly jet stream develops over the peninsula — both trigger and sustain the monsoon." },
            ].map((s, i) => (
              <div className="clm-step" key={i}>
                <div className="clm-step-num">{i + 1}</div>
                <div className="clm-step-body">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* El Nino / SO */}
          <div className="clm-enso">
            <div className="clm-enso-card so">
              <h4>🌐 Southern Oscillation (SO)</h4>
              <p>A periodic change in <strong>pressure conditions over the southern oceans</strong>. When pressure is high over the Pacific Ocean, it tends to be low over the Indian Ocean and vice versa — directly affecting the strength of the Indian monsoon.</p>
            </div>
            <div className="clm-enso-card el">
              <h4>🌊 El Niño Effect</h4>
              <p>A warm ocean current flowing past the <strong>Peruvian coast every 2–5 years</strong>, replacing the cold Peruvian current. When El Niño is active, India often gets <strong>weaker monsoon rains</strong> and drought conditions.</p>
            </div>
          </div>

          <hr className="clm-divider" />

          {/* Four Seasons */}
          <div className="clm-label amb">The Seasons</div>
          <h2 className="clm-title">India's <span className="amb">Four Seasons</span></h2>

          <div className="clm-seasons">
            <div className="clm-season-row s1">
              <div className="clm-season-tag">
                <span className="clm-season-emoji">❄️</span>
                <span className="clm-season-name">Cold Weather Season</span>
              </div>
              <div className="clm-season-body">
                <h4>Winter — December to February</h4>
                <ul>
                  <li>Northeast trade winds prevail over India</li>
                  <li>Days are warm; nights are cold</li>
                  <li>Frost common in northern plains; snowfall on higher Himalayan slopes</li>
                  <li>Western cyclonic disturbances bring winter rain to northwest India</li>
                </ul>
              </div>
            </div>
            <div className="clm-season-row s2">
              <div className="clm-season-tag">
                <span className="clm-season-emoji">☀️</span>
                <span className="clm-season-name">Hot Weather Season</span>
              </div>
              <div className="clm-season-body">
                <h4>Summer — March to May</h4>
                <ul>
                  <li>Rising temperature and <strong>falling air pressure</strong> in northern India</li>
                  <li>Hot, dry <strong>'Loo'</strong> winds blow during the day in north and northwest India</li>
                  <li>Dust storms common in northern India</li>
                  <li><strong>'Kaal Baisakhi'</strong> — violent thunderstorms in West Bengal with hail and heavy rain</li>
                </ul>
              </div>
            </div>
            <div className="clm-season-row s3">
              <div className="clm-season-tag">
                <span className="clm-season-emoji">🌧️</span>
                <span className="clm-season-name">Advancing Monsoon</span>
              </div>
              <div className="clm-season-body">
                <h4>Rainy Season — June to September</h4>
                <ul>
                  <li>Monsoon arrives at Kerala's southern tip in the <strong>first week of June</strong></li>
                  <li>Arabian Sea and Bay of Bengal branches merge over the northwestern Ganga plains</li>
                  <li>Monsoon has '<strong>breaks</strong>' — alternating wet and dry spells</li>
                  <li>Can cause <strong>floods in one area and droughts in another</strong> simultaneously</li>
                </ul>
              </div>
            </div>
            <div className="clm-season-row s4">
              <div className="clm-season-tag">
                <span className="clm-season-emoji">🍂</span>
                <span className="clm-season-name">Retreating Monsoon</span>
              </div>
              <div className="clm-season-body">
                <h4>Transition — October to November</h4>
                <ul>
                  <li>Gradual withdrawal begins from <strong>northwestern India in early September</strong></li>
                  <li>'<strong>October heat</strong>' — oppressive conditions due to high temperature and humidity together</li>
                  <li>Low pressure shifts to the Bay of Bengal — cyclonic depressions from the Andaman Sea</li>
                  <li>Withdrawal complete from northern plains by <strong>early October</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Special phenomena */}
          <div className="clm-label vio">Special Weather Phenomena</div>
          <div className="clm-phenomena">
            {[
              { icon:"🌪️", title:"Loo", desc:"Hot, dry, gusty winds blowing in the day over north & northwest India during summer. Temperatures can exceed 45°C — potentially fatal." },
              { icon:"⛈️", title:"Kaal Baisakhi", desc:"Violent localised thunderstorms in West Bengal during the pre-monsoon period. Accompanied by violent winds, hail, and torrential rain." },
              { icon:"🌩️", title:"Monsoon Burst", desc:"A sudden onset of the monsoon — rapid increase in rainfall continuing for several days that marks the official arrival of monsoon season." },
              { icon:"🌀", title:"Cyclonic Depressions", desc:"Form over the Andaman Sea during retreating monsoon season (Oct–Nov). Move west, bringing heavy rain to the Coromandal Coast." },
            ].map((p, i) => (
              <div className="clm-phen-card" key={i}>
                <div className="clm-phen-icon">{p.icon}</div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Rainfall distribution */}
          <div className="clm-rainfall">
            <h3>🌧️ Rainfall Distribution Across India</h3>
            <div className="clm-rf-row">
              <div className="clm-rf-label">Western Coast &amp; Northeast India</div>
              <div className="clm-rf-bar-wrap"><div className="clm-rf-bar high"></div></div>
              <div className="clm-rf-val">~400 cm</div>
            </div>
            <div className="clm-rf-row">
              <div className="clm-rf-label">Northern Plains (East to West decreasing)</div>
              <div className="clm-rf-bar-wrap"><div className="clm-rf-bar mid"></div></div>
              <div className="clm-rf-val">~100 cm</div>
            </div>
            <div className="clm-rf-row">
              <div className="clm-rf-label">Western Rajasthan &amp; Adjoining Areas</div>
              <div className="clm-rf-bar-wrap"><div className="clm-rf-bar low"></div></div>
              <div className="clm-rf-val">~60 cm</div>
            </div>
          </div>

          {/* Unifying Bond */}
          <div className="clm-unity">
            <div className="clm-unity-icon">🤝</div>
            <div>
              <h3>Monsoon — India's Unifying Bond</h3>
              <p>The dependence of farmers on rain, the change in seasonal cycle, festival dates, the needs of humans, plants, and animals — all revolve around the monsoon. Despite India's vast diversity in culture, language, and geography, the monsoon connects every Indian in a <strong>shared cycle of anticipation, celebration, and renewal</strong>. It is truly the <strong>heartbeat of the Indian subcontinent</strong>.</p>
            </div>
          </div>

          <hr className="clm-divider" />

          {/* FAQ */}
          <div className="clm-faq-label">Practice Questions</div>
          <h2 className="clm-faq-title">Frequently Asked Questions</h2>

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
