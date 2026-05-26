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
    --brown:     #92400e;
    --brown2:    #78350f;
    --stone:     #57534e;
    --amber:     #d97706;
    --amber-bg:  #fffbeb;
    --amber-bd:  #fde68a;
    --sky:       #0369a1;
    --sky-bg:    #f0f9ff;
    --sky-bd:    #bae6fd;
    --green:     #15803d;
    --green-bg:  #f0fdf4;
    --green-bd:  #86efac;
    --sand:      #b45309;
    --sand-bg:   #fff7ed;
    --sand-bd:   #fed7aa;
    --slate:     #475569;
    --card:      #ffffff;
  }

  .blog-root {
    font-family: 'Inter', sans-serif;
    background: #faf9f7;
    color: var(--ink);
    min-height: 100vh;
  }

  /* ── Hero ── */
  .pfi-hero {
    background: linear-gradient(135deg, #1c0a00 0%, #3b1a08 35%, #713f12 70%, #92400e 100%);
    padding: 80px 24px 96px;
    position: relative;
    overflow: hidden;
  }
  .pfi-hero::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      radial-gradient(circle at 8% 70%, rgba(217,119,6,0.2) 0%, transparent 50%),
      radial-gradient(circle at 88% 18%, rgba(146,64,14,0.22) 0%, transparent 52%),
      radial-gradient(circle at 55% 95%, rgba(217,119,6,0.1) 0%, transparent 40%);
  }
  .pfi-hero::after {
    content: '⛰️';
    position: absolute; right: 48px; top: 36px;
    font-size: 130px; opacity: 0.07; line-height: 1;
  }
  .pfi-hero-inner {
    max-width: 820px; margin: 0 auto;
    position: relative; z-index: 1;
  }
  .pfi-hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(217,119,6,0.15);
    border: 1px solid rgba(217,119,6,0.35);
    color: #fcd34d;
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 600;
    padding: 6px 16px; border-radius: 100px;
    margin-bottom: 28px;
    letter-spacing: 0.05em; text-transform: uppercase;
  }
  .pfi-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 900; line-height: 1.07;
    color: #ffffff; margin: 0 0 20px;
    letter-spacing: -0.02em;
  }
  .pfi-hero-title span { color: #fbbf24; }
  .pfi-hero-sub {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 500;
    color: #fde68a; line-height: 1.7;
    max-width: 620px; margin: 0 0 40px;
  }
  .pfi-hero-meta { display: flex; flex-wrap: wrap; gap: 20px; align-items: center; }
  .pfi-meta-chip { color: #fcd34d; font-size: 14px; font-weight: 500; display: flex; align-items: center; gap: 7px; }
  .pfi-meta-dot  { width: 4px; height: 4px; background: #fbbf24; border-radius: 50%; display: inline-block; }

  /* ── Body ── */
  .pfi-body {
    max-width: 820px; margin: 0 auto;
    padding: 64px 24px 80px;
  }

  /* ── Intro card ── */
  .pfi-intro-card {
    background: linear-gradient(135deg, #1c0a00, #3b1a08);
    border-radius: 20px; padding: 40px 44px;
    margin-bottom: 56px;
    position: relative; overflow: hidden;
  }
  .pfi-intro-card::after {
    content: '🏔️';
    position: absolute; top: 8px; right: 28px;
    font-size: 120px; opacity: 0.07; line-height: 1;
  }
  .pfi-intro-card p {
    font-family: 'Poppins', sans-serif;
    font-size: 19px; font-weight: 500;
    color: #fde68a; line-height: 1.75;
    margin: 0 0 16px; position: relative; z-index: 1;
  }
  .pfi-intro-card p:last-child { margin: 0; }
  .pfi-intro-card strong { color: #fbbf24; }

  /* ── Six Divisions showcase strip ── */
  .pfi-six-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 56px;
  }
  @media (max-width: 580px) { .pfi-six-strip { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 380px) { .pfi-six-strip { grid-template-columns: 1fr; } }
  .pfi-div-box {
    border-radius: 14px; padding: 22px 18px;
    border: 1.5px solid; text-align: center;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .pfi-div-box:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
  .pfi-div-box.d1 { background: #fff7ed; border-color: #fed7aa; }
  .pfi-div-box.d2 { background: var(--sky-bg); border-color: var(--sky-bd); }
  .pfi-div-box.d3 { background: var(--amber-bg); border-color: var(--amber-bd); }
  .pfi-div-box.d4 { background: #fefce8; border-color: #fef08a; }
  .pfi-div-box.d5 { background: var(--green-bg); border-color: var(--green-bd); }
  .pfi-div-box.d6 { background: #f0f9ff; border-color: #bae6fd; }
  .pfi-div-icon { font-size: 30px; margin-bottom: 10px; }
  .pfi-div-box h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 700;
    margin: 0 0 4px;
  }
  .pfi-div-box.d1 h4 { color: #9a3412; }
  .pfi-div-box.d2 h4 { color: var(--sky); }
  .pfi-div-box.d3 h4 { color: var(--brown); }
  .pfi-div-box.d4 h4 { color: #713f12; }
  .pfi-div-box.d5 h4 { color: var(--green); }
  .pfi-div-box.d6 h4 { color: #0c4a6e; }
  .pfi-div-box p { font-size: 12px; color: var(--muted); margin: 0; line-height: 1.5; }

  /* ── Plate tectonics callout ── */
  .pfi-tect-card {
    background: linear-gradient(135deg, #1e1b4b, #312e81);
    border-radius: 18px; padding: 32px 36px;
    margin-bottom: 48px;
    display: flex; gap: 20px; align-items: flex-start;
  }
  .pfi-tect-icon {
    font-size: 40px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    min-width: 44px;
  }
  @media (max-width: 520px) {
    .pfi-tect-card { flex-direction: column; align-items: center; text-align: center; }
    .pfi-tect-icon { font-size: 48px; }
  }
  .pfi-tect-card h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 19px; font-weight: 800;
    color: #a5b4fc; margin: 0 0 10px;
  }
  .pfi-tect-card p { font-size: 15px; color: #c7d2fe; line-height: 1.75; margin: 0 0 10px; }
  .pfi-tect-card p:last-child { margin: 0; }
  .pfi-tect-card strong { color: #fbbf24; }

  /* ── Gondwana banner ── */
  .pfi-gondwana {
    background: linear-gradient(135deg, #fef3c7, #fffbeb);
    border: 1.5px solid #fcd34d;
    border-radius: 16px; padding: 26px 30px;
    margin-bottom: 48px;
    display: flex; gap: 16px; align-items: flex-start;
  }
  .pfi-gondwana-icon { font-size: 36px; flex-shrink: 0; }
  .pfi-gondwana h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 700;
    color: #78350f; margin: 0 0 8px;
  }
  .pfi-gondwana p { font-size: 15px; color: #92400e; line-height: 1.7; margin: 0; }
  .pfi-gondwana strong { color: var(--brown2); }

  /* ── Section labels & titles ── */
  .pfi-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 10px;
  }
  .pfi-label.brn { color: var(--brown); }
  .pfi-label.sky { color: var(--sky); }
  .pfi-label.grn { color: var(--green); }
  .pfi-label.snd { color: var(--sand); }
  .pfi-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(26px, 4vw, 36px); font-weight: 800;
    color: var(--ink); line-height: 1.2;
    margin: 0 0 28px; letter-spacing: -0.01em;
  }
  .pfi-title .amber  { color: var(--amber); }
  .pfi-title .sky    { color: var(--sky); }
  .pfi-title .green  { color: var(--green); }
  .pfi-title .sand   { color: var(--sand); }
  .pfi-title .brown  { color: var(--brown); }

  /* ── Himalayas — 3 ranges stacked cards ── */
  .pfi-range-stack {
    display: flex; flex-direction: column; gap: 0;
    border-radius: 18px; overflow: hidden;
    border: 1.5px solid #e7e5e4;
    margin-bottom: 32px;
  }
  .pfi-range-row {
    display: flex; align-items: stretch;
    border-bottom: 1.5px solid #e7e5e4;
  }
  .pfi-range-row:last-child { border-bottom: none; }
  .pfi-range-num {
    width: 80px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 13px; font-weight: 900;
    letter-spacing: 0.04em; text-transform: uppercase;
    writing-mode: horizontal-tb;
    padding: 24px 8px;
    line-height: 1.4;
  }
  .pfi-range-row.r1 .pfi-range-num { background: #1c0a00; color: #fcd34d; }
  .pfi-range-row.r2 .pfi-range-num { background: #3b1a08; color: #fde68a; }
  .pfi-range-row.r3 .pfi-range-num { background: #713f12; color: #fef3c7; }
  .pfi-range-body { padding: 22px 24px; flex: 1; }
  .pfi-range-body h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; font-weight: 700; color: var(--ink); margin: 0 0 4px;
  }
  .pfi-range-alt {
    font-family: 'Montserrat', sans-serif;
    font-size: 13px; font-weight: 800;
    color: var(--amber); margin-bottom: 8px;
  }
  .pfi-range-body p { font-size: 14px; color: var(--muted); line-height: 1.65; margin: 0; }

  /* ── Himalayan sections — horizontal chips ── */
  .pfi-sections-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px; margin-bottom: 32px;
  }
  @media (max-width: 520px) { .pfi-sections-grid { grid-template-columns: 1fr; } }
  .pfi-sec-card {
    background: var(--card);
    border: 1.5px solid #e7e5e4;
    border-radius: 14px; padding: 20px 22px;
    border-left: 4px solid var(--amber);
  }
  .pfi-sec-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 700;
    color: var(--brown); margin: 0 0 6px;
  }
  .pfi-sec-card p { font-size: 14px; color: var(--slate); line-height: 1.65; margin: 0; }

  /* ── Duns info box ── */
  .pfi-info-box {
    border-radius: 0 14px 14px 0;
    padding: 20px 24px; margin-bottom: 24px;
    border-left: 4px solid;
    background: var(--card);
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  }
  .pfi-info-box h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 700;
    color: var(--ink); margin: 0 0 6px;
  }
  .pfi-info-box p { font-size: 15px; color: #374151; line-height: 1.7; margin: 0; }
  .pfi-info-box strong { color: var(--brown); }

  /* ── Divider ── */
  .pfi-divider { border: none; border-top: 1.5px solid #e7e5e4; margin: 52px 0; }

  /* ── Northern Plains 4 zones — timeline-style ── */
  .pfi-zones {
    position: relative;
    padding-left: 36px;
    margin-bottom: 40px;
  }
  .pfi-zones::before {
    content: '';
    position: absolute; left: 12px; top: 0; bottom: 0;
    width: 3px; background: linear-gradient(to bottom, #d97706, #0369a1);
    border-radius: 2px;
  }
  .pfi-zone-item {
    position: relative; margin-bottom: 28px;
  }
  .pfi-zone-item:last-child { margin-bottom: 0; }
  .pfi-zone-dot {
    position: absolute; left: -30px; top: 6px;
    width: 14px; height: 14px;
    border-radius: 50%; border: 3px solid var(--card);
    box-shadow: 0 0 0 2px;
  }
  .pfi-zone-item:nth-child(1) .pfi-zone-dot { background: #92400e; box-shadow: 0 0 0 2px #92400e; }
  .pfi-zone-item:nth-child(2) .pfi-zone-dot { background: #0369a1; box-shadow: 0 0 0 2px #0369a1; }
  .pfi-zone-item:nth-child(3) .pfi-zone-dot { background: #d97706; box-shadow: 0 0 0 2px #d97706; }
  .pfi-zone-item:nth-child(4) .pfi-zone-dot { background: #15803d; box-shadow: 0 0 0 2px #15803d; }
  .pfi-zone-item h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; font-weight: 700;
    margin: 0 0 6px;
  }
  .pfi-zone-item:nth-child(1) h4 { color: #92400e; }
  .pfi-zone-item:nth-child(2) h4 { color: #0369a1; }
  .pfi-zone-item:nth-child(3) h4 { color: #d97706; }
  .pfi-zone-item:nth-child(4) h4 { color: #15803d; }
  .pfi-zone-item p { font-size: 15px; color: var(--slate); line-height: 1.7; margin: 0; }

  /* ── Peninsular plateau — two-col contrast ── */
  .pfi-plat-split {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0; border-radius: 20px; overflow: hidden;
    border: 1.5px solid #e7e5e4; margin-bottom: 32px;
  }
  @media (max-width: 580px) { .pfi-plat-split { grid-template-columns: 1fr; } }
  .pfi-plat-col { padding: 28px 26px; }
  .pfi-plat-col.central { background: var(--amber-bg); }
  .pfi-plat-col.deccan  { background: var(--sand-bg); border-left: 1.5px solid var(--sand-bd); }
  .pfi-plat-col h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 17px; font-weight: 800; margin: 0 0 14px;
  }
  .pfi-plat-col.central h3 { color: var(--brown); }
  .pfi-plat-col.deccan  h3 { color: var(--sand); }
  .pfi-plat-col ul { margin: 0; padding-left: 18px; }
  .pfi-plat-col ul li { font-size: 15px; line-height: 1.75; margin-bottom: 8px; color: var(--ink2); }

  /* ── Ghats compare ── */
  .pfi-ghats {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 14px; margin-bottom: 40px;
  }
  @media (max-width: 520px) { .pfi-ghats { grid-template-columns: 1fr; } }
  .pfi-ghat-card {
    border-radius: 16px; padding: 24px 22px; border: 1.5px solid;
  }
  .pfi-ghat-card.west { background: var(--green-bg); border-color: var(--green-bd); }
  .pfi-ghat-card.east { background: var(--sky-bg); border-color: var(--sky-bd); }
  .pfi-ghat-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 700; margin: 0 0 8px;
  }
  .pfi-ghat-card.west h4 { color: var(--green); }
  .pfi-ghat-card.east h4 { color: var(--sky); }
  .pfi-ghat-peak {
    font-family: 'Montserrat', sans-serif;
    font-size: 22px; font-weight: 900; margin-bottom: 6px;
  }
  .pfi-ghat-card.west .pfi-ghat-peak { color: var(--green); }
  .pfi-ghat-card.east .pfi-ghat-peak { color: var(--sky); }
  .pfi-ghat-card p { font-size: 14px; color: var(--slate); line-height: 1.65; margin: 0; }

  /* ── Desert facts ── */
  .pfi-desert-card {
    background: linear-gradient(135deg, #fef9c3, #fef3c7);
    border: 1.5px solid #fde047;
    border-radius: 18px; padding: 32px 36px;
    margin-bottom: 32px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
  }
  @media (max-width: 540px) { .pfi-desert-card { grid-template-columns: 1fr; } }
  .pfi-desert-stat h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 32px; font-weight: 900; color: #92400e; margin: 0 0 4px;
  }
  .pfi-desert-stat p { font-size: 14px; color: #78350f; font-weight: 600; margin: 0; }
  .pfi-desert-info h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 700; color: #713f12; margin: 0 0 8px;
  }
  .pfi-desert-info p { font-size: 14px; color: #92400e; line-height: 1.7; margin: 0; }

  /* ── Coastal plains — two columns (West/East) ── */
  .pfi-coast-wrap {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 16px; margin-bottom: 32px;
  }
  @media (max-width: 560px) { .pfi-coast-wrap { grid-template-columns: 1fr; } }
  .pfi-coast-card {
    border-radius: 16px; padding: 24px 22px; border: 1.5px solid;
  }
  .pfi-coast-card.west { background: var(--green-bg); border-color: var(--green-bd); }
  .pfi-coast-card.east { background: var(--sky-bg); border-color: var(--sky-bd); }
  .pfi-coast-card h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px; font-weight: 800; margin: 0 0 12px;
  }
  .pfi-coast-card.west h3 { color: var(--green); }
  .pfi-coast-card.east h3 { color: var(--sky); }
  .pfi-coast-seg {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    padding: 5px 12px; border-radius: 8px;
    display: inline-block; margin-bottom: 6px;
  }
  .pfi-coast-card.west .pfi-coast-seg { background: #dcfce7; color: #166534; }
  .pfi-coast-card.east .pfi-coast-seg { background: #dbeafe; color: #1e40af; }
  .pfi-coast-card p { font-size: 14px; color: var(--slate); line-height: 1.65; margin: 4px 0 10px; }

  /* ── Islands — side-by-side ── */
  .pfi-island-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 16px; margin-bottom: 40px;
  }
  @media (max-width: 520px) { .pfi-island-grid { grid-template-columns: 1fr; } }
  .pfi-island-card {
    background: linear-gradient(160deg, #0c4a6e, #0369a1);
    border-radius: 18px; padding: 28px 24px; color: #fff;
  }
  .pfi-island-card h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px; font-weight: 800; color: #7dd3fc; margin: 0 0 10px;
  }
  .pfi-island-card ul { margin: 0; padding-left: 18px; }
  .pfi-island-card ul li { font-size: 14px; color: #bae6fd; line-height: 1.75; margin-bottom: 6px; }

  /* ── Complementary roles banner ── */
  .pfi-roles-strip {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 0; border-radius: 14px; overflow: hidden;
    margin-bottom: 48px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.07);
  }
  @media (max-width: 580px) { .pfi-roles-strip { grid-template-columns: repeat(2, 1fr); } }
  .pfi-role-block { padding: 24px 16px; text-align: center; }
  .pfi-role-block.r1 { background: #92400e; }
  .pfi-role-block.r2 { background: #0369a1; }
  .pfi-role-block.r3 { background: #d97706; }
  .pfi-role-block.r4 { background: #15803d; }
  .pfi-role-icon { font-size: 28px; margin-bottom: 8px; }
  .pfi-role-name {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    color: rgba(255,255,255,0.9); margin-bottom: 4px;
  }
  .pfi-role-desc {
    font-size: 12px; color: rgba(255,255,255,0.7);
    font-family: 'Inter', sans-serif; line-height: 1.4;
  }

  /* ── FAQ ── */
  .pfi-faq-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 700; color: var(--brown);
    letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 10px;
  }
  .pfi-faq-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(24px, 4vw, 34px); font-weight: 800;
    color: var(--ink); margin: 0 0 32px; letter-spacing: -0.01em;
  }
  .faq-item {
    border: 1.5px solid #e7e5e4;
    border-radius: 14px; margin-bottom: 12px;
    overflow: hidden; background: var(--card);
    transition: border-color 0.2s;
  }
  .faq-item.open { border-color: var(--amber-bd); }
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
  .faq-icon { font-size: 22px; font-weight: 700; color: var(--brown); flex-shrink: 0; line-height: 1; }
  .faq-ans {
    display: none; padding: 0 24px 20px;
    font-size: 15px; color: #374151; line-height: 1.75;
  }
  .faq-ans.visible { display: block; }
  .faq-ans strong { color: var(--brown); }
  .faq-ans p { margin: 0 0 10px; }
  .faq-ans p:last-child { margin: 0; }
`;

const faqs = [
  {
    q: "What are the major physiographic divisions of India?",
    a: <p>India has <strong>six major physiographic divisions</strong>: (i) The Himalayan Mountains, (ii) The Northern Plains, (iii) The Peninsular Plateau, (iv) The Indian Desert, (v) The Coastal Plains, and (vi) The Islands. Each region has distinct features and contributes to India's rich natural resource base.</p>,
  },
  {
    q: "What is Gondwana land and what is its connection to India?",
    a: <p><strong>Gondwana land</strong> was an ancient supercontinent that broke apart millions of years ago. It comprised what is today India, Australia, South Africa, South America, and Antarctica. India's <strong>peninsular plateau</strong> is made from one of the oldest landmasses that formed part of Gondwana land — which is why it consists of ancient crystalline, igneous, and metamorphic rocks.</p>,
  },
  {
    q: "Describe the three parallel ranges of the Himalayas.",
    a: <>
      <p><strong>1. Himadri (Great / Inner Himalayas):</strong> The highest and most continuous range, with an average height of 6,000 m. Contains the highest peaks in the world.</p>
      <p><strong>2. Himachal (Middle Himalayas):</strong> Altitude between 3,700–4,500 m. Includes ranges like Pir Panjal, Dhauladhar, and Mahabharat. Famous for hill stations.</p>
      <p><strong>3. Shivalik (Outer Himalayas):</strong> The outermost and lowest range, with an average altitude of 900–1,100 m. Made of unconsolidated sediments.</p>
    </>,
  },
  {
    q: "What are the four sections of the Himalayas from west to east?",
    a: <>
      <p><strong>1. Punjab Himalayas</strong> — between the Indus and Satluj rivers.</p>
      <p><strong>2. Kumaon Himalayas</strong> — between the Satluj and Kali rivers.</p>
      <p><strong>3. Nepal Himalayas</strong> — between the Kali and Tista rivers.</p>
      <p><strong>4. Assam Himalayas (Eastern Himalayas)</strong> — between the Tista and Dibang (Tsangpo) rivers.</p>
    </>,
  },
  {
    q: "Describe the four sub-divisions of the Northern Plains.",
    a: <>
      <p><strong>1. Bhabar:</strong> A narrow 8–16 km wide belt of pebbles at the foot of the Shiwaliks. Rivers disappear underground here.</p>
      <p><strong>2. Terai:</strong> Lies south of Bhabar — a wet, marshy region with forests and wildlife. Previously malarial, now largely cleared for farming.</p>
      <p><strong>3. Bangar:</strong> Older alluvial plain that rises above the flood plains. Contains calcareous deposits called Kankar.</p>
      <p><strong>4. Khadar:</strong> Younger alluvial deposits in the flood plains — renewed every year and very fertile.</p>
    </>,
  },
  {
    q: "What is the Peninsular Plateau and how is it formed?",
    a: <p>The Peninsular Plateau is a <strong>tableland</strong> formed due to the breaking and drifting of the Gondwana land. It is composed of old <strong>crystalline, igneous, and metamorphic rocks</strong>. It has two broad divisions — the <strong>Central Highlands</strong> (north of the Narmada) and the <strong>Deccan Plateau</strong> (south of the Narmada, triangular in shape). A distinct feature is the <strong>Deccan Trap</strong> — a black soil area formed from ancient volcanic lava flows.</p>,
  },
  {
    q: "Compare the Western Ghats and Eastern Ghats.",
    a: <>
      <p><strong>Western Ghats:</strong> Form the western edge of the Deccan Plateau. They are <strong>continuous and higher</strong>, with the highest peak being <strong>Anaimudi (2,695 m)</strong>. They act as a barrier to the southwest monsoon.</p>
      <p><strong>Eastern Ghats:</strong> Form the eastern edge of the Deccan Plateau. They are <strong>discontinuous and lower</strong>, with the highest peak being <strong>Mahendragiri (1,501 m)</strong>. They are dissected by rivers flowing into the Bay of Bengal.</p>
    </>,
  },
  {
    q: "What are the characteristic features of the Indian Desert?",
    a: <p>The Indian Desert (Thar Desert) lies towards the <strong>western margins of the Aravalli Hills</strong>. It is an undulating sandy plain with crescent-shaped dunes called <strong>barchans</strong> covering large areas. It receives very little rainfall — around <strong>150 mm per year</strong>. The <strong>Luni</strong> is the only large river in this region. Despite harsh conditions, it supports its own unique ecosystem.</p>,
  },
  {
    q: "Describe the coastal plains of India.",
    a: <>
      <p><strong>Western Coastal Plains</strong> are narrow strips flanking the Western Ghats. From north to south they are: <strong>Konkan (Mumbai–Goa)</strong>, <strong>Kannad Plain</strong>, and <strong>Malabar Coast</strong>.</p>
      <p><strong>Eastern Coastal Plains</strong> are wider and more level, flanking the Bay of Bengal. From north to south they are: <strong>Northern Circars</strong> and the <strong>Coromandal Coast</strong>.</p>
    </>,
  },
  {
    q: "Describe the island groups of India.",
    a: <>
      <p><strong>Lakshadweep Islands:</strong> Located in the Arabian Sea close to Kerala. Formerly known as Laccadive, Minicoy, and Amindive. They are coral islands.</p>
      <p><strong>Andaman and Nicobar Islands:</strong> Located in the Bay of Bengal. They form an elongated chain and are an elevated portion of <strong>submarine mountains</strong>. They have a rich biodiversity and strategic importance.</p>
    </>,
  },
  {
    q: "How do the different physiographic regions of India complement each other?",
    a: <p>Each region plays a vital economic role — <strong>Mountains</strong> are the source of forests, rivers, and water; <strong>Plains</strong> are fertile agricultural zones that produce food grains; <strong>Plateaus</strong> are rich storehouses of minerals and energy resources; <strong>Coastal areas</strong> support fishing industries and serve as natural ports for trade. Together they make India a <strong>resource-rich and self-sufficient nation</strong>.</p>,
  },
];

export default function PhysicalFeaturesIndiaBlog() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="blog-root">

        {/* ── Hero ── */}
        <div className="pfi-hero">
          <div className="pfi-hero-inner">
            <div className="pfi-hero-tag">🏔️ Class 9 · Geography · Chapter 2</div>
            <h1 className="pfi-hero-title">
              Physical Features<br /><span>of India</span>
            </h1>
            <p className="pfi-hero-sub">
              From the towering Himalayas to the sandy Thar Desert, explore India's six major physiographic divisions and the geological story behind them.
            </p>
            <div className="pfi-hero-meta">
              <span className="pfi-meta-chip">📚 NCERT Class 9</span>
              <span className="pfi-meta-dot" />
              <span className="pfi-meta-chip">🗺️ Contemporary India — I</span>
              <span className="pfi-meta-dot" />
              <span className="pfi-meta-chip">⏱️ 15 min read</span>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="pfi-body">

          {/* Intro card */}
          <div className="pfi-intro-card">
            <p>India is a <strong>large landmass formed during different geological periods</strong>, giving it an extraordinary variety of physical landscapes. From icy peaks to tropical coasts, from fertile plains to rocky plateaus — India has all major physical features of the Earth.</p>
            <p>The soil colour, rock type, and relief features all <strong>vary from region to region</strong>. These features are the outcome of processes like weathering, erosion, and deposition — all explained through the <strong>Theory of Plate Tectonics</strong>.</p>
          </div>

          {/* 6 divisions */}
          <div className="pfi-label brn">Physiographic Divisions</div>
          <h2 className="pfi-title">India's Six <span className="amber">Physical Regions</span></h2>

          <div className="pfi-six-strip">
            {[
              { cls:"d1", icon:"🏔️", title:"The Himalayan Mountains", sub:"Young fold mountains — loftiest barriers" },
              { cls:"d2", icon:"🌾", title:"The Northern Plains", sub:"Alluvial plains — most fertile region" },
              { cls:"d3", icon:"🪨", title:"The Peninsular Plateau", sub:"Ancient tableland — rich in minerals" },
              { cls:"d4", icon:"🏜️", title:"The Indian Desert", sub:"Sandy dunes — western Rajasthan" },
              { cls:"d5", icon:"🌊", title:"The Coastal Plains", sub:"East & west coasts — ports & fishing" },
              { cls:"d6", icon:"🏝️", title:"The Islands", sub:"Lakshadweep & Andaman-Nicobar" },
            ].map((d, i) => (
              <div className={`pfi-div-box ${d.cls}`} key={i}>
                <div className="pfi-div-icon">{d.icon}</div>
                <h4>{d.title}</h4>
                <p>{d.sub}</p>
              </div>
            ))}
          </div>

          {/* Plate Tectonics */}
          <div className="pfi-tect-card">
            <div className="pfi-tect-icon">🌍</div>
            <div>
              <h3>Theory of Plate Tectonics</h3>
              <p>According to this theory, the Earth's crust is made up of <strong>seven major and several minor plates</strong> that are constantly moving. This movement causes stress in the crust, leading to <strong>folding, faulting, and volcanic activity</strong>.</p>
              <p>Plates interact at three types of boundaries — <strong>Convergent</strong> (plates collide), <strong>Divergent</strong> (plates move apart), and <strong>Transform</strong> (plates slide past each other). The Himalayas were formed when the Indian plate collided with the Eurasian plate.</p>
            </div>
          </div>

          {/* Gondwana */}
          <div className="pfi-gondwana">
            <div className="pfi-gondwana-icon">🌐</div>
            <div>
              <h4>Gondwana Land — The Ancient Supercontinent</h4>
              <p>India's peninsular part is one of the <strong>oldest landmasses on Earth</strong>. It was once part of <strong>Gondwana land</strong> — a single supercontinent comprising India, <strong>Australia, South Africa, South America, and Antarctica</strong>. When Gondwana broke apart, the Indian plate drifted northward and collided with Eurasia, giving rise to the Himalayas.</p>
            </div>
          </div>

          <hr className="pfi-divider" />

          {/* Himalayas */}
          <div className="pfi-label brn">The Himalayas</div>
          <h2 className="pfi-title">Three Parallel <span className="amber">Mountain Ranges</span></h2>

          <div className="pfi-info-box" style={{borderLeftColor:'#d97706', marginBottom:'24px'}}>
            <h4>📐 Dimensions of the Himalayas</h4>
            <p>The Himalayas extend for <strong>2,400 km</strong> from west to east, and their width varies from <strong>400 km in Kashmir</strong> to <strong>150 km in Arunachal Pradesh</strong>. They are young-fold mountains — the <strong>loftiest and most rugged</strong> mountain barriers in the world.</p>
          </div>

          <div className="pfi-range-stack">
            <div className="pfi-range-row r1">
              <div className="pfi-range-num">Range 1</div>
              <div className="pfi-range-body">
                <h4>Himadri — The Great / Inner Himalayas</h4>
                <div className="pfi-range-alt">Avg. Height: ~6,000 m</div>
                <p>The highest, most continuous range. Contains the world's highest peaks including Mt. Everest. The core is composed of granite rocks. The folds are asymmetric and have a steep southern slope.</p>
              </div>
            </div>
            <div className="pfi-range-row r2">
              <div className="pfi-range-num">Range 2</div>
              <div className="pfi-range-body">
                <h4>Himachal — The Middle Himalayas</h4>
                <div className="pfi-range-alt">Altitude: 3,700–4,500 m</div>
                <p>Also called the Lesser Himalayas. Includes the <strong>Pir Panjal, Dhauladhar, and Mahabharat</strong> ranges. Famous hill stations like Shimla, Mussoorie, Nainital, and Darjeeling are located here.</p>
              </div>
            </div>
            <div className="pfi-range-row r3">
              <div className="pfi-range-num">Range 3</div>
              <div className="pfi-range-body">
                <h4>Shivalik — The Outer Himalayas</h4>
                <div className="pfi-range-alt">Altitude: 900–1,100 m</div>
                <p>The outermost, lowest range. Made of unconsolidated sediments brought down by rivers. Longitudinal valleys between the Lesser Himalayas and Shivalik are called <strong>Duns</strong> (e.g., Dehradun).</p>
              </div>
            </div>
          </div>

          <div className="pfi-label brn" style={{marginTop:'32px'}}>Regional Divisions</div>
          <h2 className="pfi-title">Himalayas — <span className="amber">West to East</span></h2>

          <div className="pfi-sections-grid">
            {[
              { title:"Punjab Himalayas", desc:"Between the Indus and Satluj rivers. Known for its deep gorges and fast-flowing rivers." },
              { title:"Kumaon Himalayas", desc:"Between the Satluj and Kali rivers. Home to famous peaks and pilgrimage sites." },
              { title:"Nepal Himalayas", desc:"Between the Kali and Tista rivers. Contains the world's highest peaks including Mt. Everest." },
              { title:"Assam Himalayas", desc:"Between the Tista and Dibang (Tsangpo) rivers. Also called Eastern Himalayas." },
            ].map((s, i) => (
              <div className="pfi-sec-card" key={i}>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>

          <hr className="pfi-divider" />

          {/* Northern Plains */}
          <div className="pfi-label sky">The Northern Plains</div>
          <h2 className="pfi-title">Alluvial Plains — <span className="sky">Four Zones</span></h2>

          <div className="pfi-info-box" style={{borderLeftColor:'#0369a1', marginBottom:'28px'}}>
            <h4>📊 Key Facts — Northern Plains</h4>
            <p>Formed by the interplay of three river systems — the <strong>Indus, Ganga, and Brahmaputra</strong>. The plains spread over <strong>7 lakh sq. km</strong>, are about <strong>2,400 km long</strong> and <strong>240–320 km broad</strong>. Rivers deposit alluvium here, building one of the most fertile regions on Earth.</p>
          </div>

          <div className="pfi-zones">
            <div className="pfi-zone-item">
              <div className="pfi-zone-dot"></div>
              <h4>🟤 Bhabar</h4>
              <p>A narrow <strong>8–16 km wide</strong> belt of pebbles deposited by rivers at the foothills of the Shiwaliks. Rivers disappear underground in this zone. Lies right at the base of the mountains.</p>
            </div>
            <div className="pfi-zone-item">
              <div className="pfi-zone-dot"></div>
              <h4>🔵 Terai</h4>
              <p>Lies south of Bhabar. A <strong>wet, swampy, and forested</strong> region where the underground streams of Bhabar re-emerge. Rich in wildlife — was once malarial. Now largely cleared for cultivation.</p>
            </div>
            <div className="pfi-zone-item">
              <div className="pfi-zone-dot"></div>
              <h4>🟡 Bangar</h4>
              <p><strong>Older alluvial deposits</strong> that rise above the level of the flood plains. Less fertile, with calcareous deposits called <strong>Kankar</strong> in the lower layers. Also called Bhangar in Bengal.</p>
            </div>
            <div className="pfi-zone-item">
              <div className="pfi-zone-dot"></div>
              <h4>🟢 Khadar</h4>
              <p><strong>Younger alluvium</strong> deposited in the active flood plains. Renewed almost every year during floods — making this the <strong>most fertile</strong> zone of the Northern Plains. Ideal for agriculture.</p>
            </div>
          </div>

          <hr className="pfi-divider" />

          {/* Peninsular Plateau */}
          <div className="pfi-label brn">The Peninsular Plateau</div>
          <h2 className="pfi-title">Ancient Tableland — <span className="brown">Two Divisions</span></h2>

          <div className="pfi-info-box" style={{borderLeftColor:'#d97706', marginBottom:'24px'}}>
            <h4>🪨 Origin of the Plateau</h4>
            <p>The Peninsular Plateau is a <strong>tableland formed by the breaking and drifting of Gondwana land</strong>. Composed of ancient <strong>crystalline, igneous, and metamorphic rocks</strong>. A distinctive feature is the <strong>Deccan Trap</strong> — a vast black soil area formed from ancient volcanic lava flows, ideal for cotton cultivation.</p>
          </div>

          <div className="pfi-plat-split">
            <div className="pfi-plat-col central">
              <h3>🟡 Central Highlands</h3>
              <ul>
                <li>Lies <strong>north of River Narmada</strong></li>
                <li>Eastward extensions known as <strong>Bundelkhand</strong> and <strong>Baghelkhand</strong></li>
                <li><strong>Chhota Nagpur Plateau</strong> is the further eastern extension — drained by the Damodar river</li>
                <li>Rivers flow west to east, eventually joining the Bay of Bengal</li>
              </ul>
            </div>
            <div className="pfi-plat-col deccan">
              <h3>🟠 Deccan Plateau</h3>
              <ul>
                <li>A <strong>triangular landmass</strong> south of the Narmada</li>
                <li>Western edge marked by <strong>Western Ghats</strong>; eastern edge by <strong>Eastern Ghats</strong></li>
                <li>Generally slopes from west to east</li>
                <li>Contains the famous <strong>Deccan Trap</strong> (black soil/lava plateau)</li>
              </ul>
            </div>
          </div>

          <div className="pfi-ghats">
            <div className="pfi-ghat-card west">
              <h4>🟢 Western Ghats</h4>
              <div className="pfi-ghat-peak">Anaimudi — 2,695 m</div>
              <p>Continuous, higher range running parallel to the west coast. Acts as a barrier to the southwest monsoon. Also called Sahyadri in Maharashtra.</p>
            </div>
            <div className="pfi-ghat-card east">
              <h4>🔵 Eastern Ghats</h4>
              <div className="pfi-ghat-peak">Mahendragiri — 1,501 m</div>
              <p>Discontinuous, lower, and less prominent. Dissected by major rivers like the Mahanadi, Godavari, Krishna, and Kaveri flowing into the Bay of Bengal.</p>
            </div>
          </div>

          <hr className="pfi-divider" />

          {/* Indian Desert */}
          <div className="pfi-label snd">The Indian Desert</div>
          <h2 className="pfi-title">The Thar — <span className="sand">Sandy Expanse</span></h2>

          <div className="pfi-desert-card">
            <div className="pfi-desert-stat">
              <h3>&lt;150 mm</h3>
              <p>Annual Rainfall — extremely arid</p>
            </div>
            <div className="pfi-desert-info">
              <h4>🏜️ Key Features</h4>
              <p>Undulating sandy plains with <strong>barchans</strong> (crescent-shaped dunes) covering large areas. Located towards the <strong>western margins of the Aravalli Hills</strong>. The <strong>Luni</strong> is the only large river in this region.</p>
            </div>
          </div>

          <hr className="pfi-divider" />

          {/* Coastal Plains */}
          <div className="pfi-label grn">The Coastal Plains</div>
          <h2 className="pfi-title">West &amp; East <span className="green">Coastal Strips</span></h2>

          <div className="pfi-coast-wrap">
            <div className="pfi-coast-card west">
              <h3>🌊 Western Coastal Plains</h3>
              <p>Narrow strips flanking the Western Ghats. Divided from north to south:</p>
              <span className="pfi-coast-seg">Konkan (Mumbai–Goa)</span>
              <p>Northern coastal belt — hilly and narrow</p>
              <span className="pfi-coast-seg">Kannad Plain</span>
              <p>Central Karnataka coast</p>
              <span className="pfi-coast-seg">Malabar Coast</span>
              <p>Southern strip along Kerala — famous for backwaters</p>
            </div>
            <div className="pfi-coast-card east">
              <h3>🌊 Eastern Coastal Plains</h3>
              <p>Wider and more level plains along the Bay of Bengal. Divided from north to south:</p>
              <span className="pfi-coast-seg">Northern Circars</span>
              <p>Northern coastal strip — Odisha and northern Andhra</p>
              <span className="pfi-coast-seg">Coromandal Coast</span>
              <p>Southern strip — Tamil Nadu and southern Andhra coast</p>
            </div>
          </div>

          <hr className="pfi-divider" />

          {/* Islands */}
          <div className="pfi-label sky">The Islands</div>
          <h2 className="pfi-title">India's <span className="sky">Island Groups</span></h2>

          <div className="pfi-island-grid">
            <div className="pfi-island-card">
              <h3>🏝️ Lakshadweep Islands</h3>
              <ul>
                <li>Located in the <strong>Arabian Sea</strong>, close to Kerala</li>
                <li>Formerly known as <strong>Laccadive, Minicoy, and Amindive</strong></li>
                <li>Coral islands — small in area but rich in marine biodiversity</li>
                <li>Kavaratti is the administrative capital</li>
              </ul>
            </div>
            <div className="pfi-island-card">
              <h3>🏝️ Andaman &amp; Nicobar Islands</h3>
              <ul>
                <li>Located in the <strong>Bay of Bengal</strong></li>
                <li>An elongated chain of islands — elevated portion of <strong>submarine mountains</strong></li>
                <li>Rich tropical biodiversity and thick forests</li>
                <li>Port Blair is the administrative capital</li>
              </ul>
            </div>
          </div>

          {/* Complementary roles */}
          <div className="pfi-label brn">Why All Regions Matter</div>
          <h2 className="pfi-title" style={{marginBottom:'20px'}}>Regions That <span className="amber">Complement Each Other</span></h2>

          <div className="pfi-roles-strip">
            <div className="pfi-role-block r1">
              <div className="pfi-role-icon">🏔️</div>
              <div className="pfi-role-name">Mountains</div>
              <div className="pfi-role-desc">Source of forests &amp; water</div>
            </div>
            <div className="pfi-role-block r2">
              <div className="pfi-role-icon">🌾</div>
              <div className="pfi-role-name">Plains</div>
              <div className="pfi-role-desc">Provide food grains</div>
            </div>
            <div className="pfi-role-block r3">
              <div className="pfi-role-icon">🪨</div>
              <div className="pfi-role-name">Plateaus</div>
              <div className="pfi-role-desc">Storehouse of minerals</div>
            </div>
            <div className="pfi-role-block r4">
              <div className="pfi-role-icon">🐟</div>
              <div className="pfi-role-name">Coasts</div>
              <div className="pfi-role-desc">Fishing &amp; port trade</div>
            </div>
          </div>

          <hr className="pfi-divider" />

          {/* FAQ */}
          <div className="pfi-faq-label">Practice Questions</div>
          <h2 className="pfi-faq-title">Frequently Asked Questions</h2>

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
