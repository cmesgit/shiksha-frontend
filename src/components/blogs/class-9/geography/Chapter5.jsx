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
    --forest:    #166534;
    --forest2:   #15803d;
    --forest-bg: #f0fdf4;
    --forest-bd: #86efac;
    --lime:      #65a30d;
    --lime-bg:   #f7fee7;
    --lime-bd:   #d9f99d;
    --amber:     #d97706;
    --amber-bg:  #fffbeb;
    --amber-bd:  #fde68a;
    --teal:      #0f766e;
    --teal-bg:   #f0fdfa;
    --teal-bd:   #99f6e4;
    --sky:       #0369a1;
    --sky-bg:    #f0f9ff;
    --sky-bd:    #bae6fd;
    --brown:     #92400e;
    --brown-bg:  #fff7ed;
    --brown-bd:  #fed7aa;
    --stone:     #57534e;
    --purple:    #7c3aed;
    --purple-bg: #f5f3ff;
    --purple-bd: #ddd6fe;
    --card:      #ffffff;
  }

  .blog-root {
    font-family: 'Inter', sans-serif;
    background: #f7fdf8;
    color: var(--ink);
    min-height: 100vh;
  }

  /* ── Hero ── */
  .nvw-hero {
    background: linear-gradient(135deg, #052e16 0%, #14532d 38%, #166534 72%, #15803d 100%);
    padding: 80px 24px 96px;
    position: relative; overflow: hidden;
  }
  .nvw-hero::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      radial-gradient(circle at 8% 68%, rgba(101,163,13,0.18) 0%, transparent 50%),
      radial-gradient(circle at 88% 15%, rgba(21,128,61,0.22) 0%, transparent 50%),
      radial-gradient(circle at 52% 92%, rgba(217,119,6,0.1) 0%, transparent 40%);
  }
  .nvw-hero::after {
    content: '🌿';
    position: absolute; right: 44px; top: 32px;
    font-size: 130px; opacity: 0.08; line-height: 1;
  }
  .nvw-hero-inner {
    max-width: 820px; margin: 0 auto;
    position: relative; z-index: 1;
  }
  .nvw-hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(101,163,13,0.18);
    border: 1px solid rgba(101,163,13,0.38);
    color: #bbf7d0;
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 600;
    padding: 6px 16px; border-radius: 100px;
    margin-bottom: 28px;
    letter-spacing: 0.05em; text-transform: uppercase;
  }
  .nvw-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 900; line-height: 1.07;
    color: #ffffff; margin: 0 0 20px;
    letter-spacing: -0.02em;
  }
  .nvw-hero-title span { color: #86efac; }
  .nvw-hero-sub {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 500;
    color: #bbf7d0; line-height: 1.7;
    max-width: 620px; margin: 0 0 40px;
  }
  .nvw-hero-meta { display: flex; flex-wrap: wrap; gap: 20px; align-items: center; }
  .nvw-meta-chip { color: #86efac; font-size: 14px; font-weight: 500; display: flex; align-items: center; gap: 7px; }
  .nvw-meta-dot  { width: 4px; height: 4px; background: #4ade80; border-radius: 50%; display: inline-block; }

  /* ── Body ── */
  .nvw-body {
    max-width: 820px; margin: 0 auto;
    padding: 64px 24px 80px;
  }

  /* ── Intro card ── */
  .nvw-intro-card {
    background: linear-gradient(135deg, #052e16, #14532d);
    border-radius: 20px; padding: 40px 44px;
    margin-bottom: 56px;
    position: relative; overflow: hidden;
  }
  .nvw-intro-card::after {
    content: '🦁';
    position: absolute; top: 8px; right: 28px;
    font-size: 120px; opacity: 0.07; line-height: 1;
  }
  .nvw-intro-card p {
    font-family: 'Poppins', sans-serif;
    font-size: 19px; font-weight: 500;
    color: #bbf7d0; line-height: 1.75;
    margin: 0 0 16px; position: relative; z-index: 1;
  }
  .nvw-intro-card p:last-child { margin: 0; }
  .nvw-intro-card strong { color: #86efac; }

  /* ── Biodiversity stat strip ── */
  .nvw-stat-strip {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 0; border-radius: 14px; overflow: hidden;
    border: 1.5px solid var(--forest-bd);
    margin-bottom: 56px;
    box-shadow: 0 4px 18px rgba(22,101,52,0.08);
  }
  @media (max-width: 580px) { .nvw-stat-strip { grid-template-columns: repeat(2, 1fr); } }
  .nvw-stat {
    padding: 24px 16px; text-align: center;
    border-right: 1.5px solid var(--forest-bd);
    background: var(--card);
  }
  .nvw-stat:last-child { border-right: none; }
  @media (max-width: 580px) {
    .nvw-stat:nth-child(2) { border-right: none; }
    .nvw-stat:nth-child(3) { border-top: 1.5px solid var(--forest-bd); }
    .nvw-stat:nth-child(4) { border-top: 1.5px solid var(--forest-bd); border-right: none; }
  }
  .nvw-stat-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 26px; font-weight: 900;
    color: var(--forest2); margin-bottom: 4px;
  }
  .nvw-stat-lbl {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 600;
    color: var(--muted); line-height: 1.4;
  }

  /* ── Labels & titles ── */
  .nvw-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 10px;
  }
  .nvw-label.grn  { color: var(--forest2); }
  .nvw-label.lim  { color: var(--lime); }
  .nvw-label.amb  { color: var(--amber); }
  .nvw-label.tl   { color: var(--teal); }
  .nvw-label.sky  { color: var(--sky); }
  .nvw-label.pur  { color: var(--purple); }
  .nvw-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(26px, 4vw, 36px); font-weight: 800;
    color: var(--ink); line-height: 1.2;
    margin: 0 0 28px; letter-spacing: -0.01em;
  }
  .nvw-title .grn  { color: var(--forest2); }
  .nvw-title .lim  { color: var(--lime); }
  .nvw-title .amb  { color: var(--amber); }
  .nvw-title .tl   { color: var(--teal); }
  .nvw-title .sky  { color: var(--sky); }
  .nvw-title .pur  { color: var(--purple); }

  /* ── Key terms row ── */
  .nvw-terms {
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 14px; margin-bottom: 48px;
  }
  @media (max-width: 520px) { .nvw-terms { grid-template-columns: 1fr; } }
  .nvw-term {
    background: var(--card);
    border: 1.5px solid var(--forest-bd);
    border-radius: 14px; padding: 20px 22px;
    border-left: 4px solid var(--forest2);
  }
  .nvw-term h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 700; color: var(--forest);
    text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;
  }
  .nvw-term p { font-size: 14px; color: var(--ink2); line-height: 1.65; margin: 0; }
  .nvw-term strong { color: var(--forest2); }

  /* ── Factors — two col ── */
  .nvw-factors {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0; border-radius: 18px; overflow: hidden;
    border: 1.5px solid var(--forest-bd); margin-bottom: 40px;
  }
  @media (max-width: 560px) { .nvw-factors { grid-template-columns: 1fr; } }
  .nvw-factor-col { padding: 28px 26px; }
  .nvw-factor-col.relief  { background: var(--amber-bg); }
  .nvw-factor-col.climate { background: var(--forest-bg); border-left: 1.5px solid var(--forest-bd); }
  @media (max-width: 560px) {
    .nvw-factor-col.climate { border-left: none; border-top: 1.5px solid var(--forest-bd); }
  }
  .nvw-factor-col h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 17px; font-weight: 800; margin: 0 0 14px;
  }
  .nvw-factor-col.relief  h3 { color: var(--amber); }
  .nvw-factor-col.climate h3 { color: var(--forest2); }
  .nvw-factor-col ul { margin: 0; padding-left: 18px; }
  .nvw-factor-col ul li { font-size: 15px; color: var(--ink2); line-height: 1.75; margin-bottom: 8px; }

  /* ── Ecosystem card ── */
  .nvw-eco {
    background: linear-gradient(135deg, #052e16, #14532d);
    border-radius: 18px; padding: 30px 34px;
    margin-bottom: 24px;
    display: flex; gap: 18px; align-items: flex-start;
  }
  .nvw-eco-icon { font-size: 40px; flex-shrink: 0; }
  @media (max-width: 480px) {
    .nvw-eco { flex-direction: column; align-items: center; text-align: center; }
  }
  .nvw-eco h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px; font-weight: 800; color: #86efac; margin: 0 0 10px;
  }
  .nvw-eco p { font-size: 15px; color: #bbf7d0; line-height: 1.75; margin: 0 0 8px; }
  .nvw-eco p:last-child { margin: 0; }
  .nvw-eco strong { color: #fde68a; }

  /* ── Divider ── */
  .nvw-divider { border: none; border-top: 1.5px solid #dcfce7; margin: 52px 0; }

  /* ── Forest type cards ── */
  .nvw-forest-card {
    border-radius: 20px; overflow: hidden;
    border: 1.5px solid; margin-bottom: 24px;
  }
  .nvw-forest-head {
    padding: 20px 26px;
    display: flex; align-items: center; gap: 16px;
    flex-wrap: wrap;
  }
  @media (max-width: 480px) {
    .nvw-forest-head { flex-direction: column; align-items: flex-start; gap: 10px; }
    .nvw-rain-badge { align-self: flex-start; }
  }
  .nvw-forest-icon { font-size: 32px; }
  .nvw-forest-head-text { flex: 1; }
  .nvw-forest-head-text h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px; font-weight: 800; color: #fff; margin: 0 0 4px;
  }
  .nvw-forest-head-text p {
    font-size: 13px; color: rgba(255,255,255,0.75);
    font-family: 'Poppins', sans-serif; font-weight: 500; margin: 0;
  }
  .nvw-rain-badge {
    font-family: 'Montserrat', sans-serif;
    font-size: 13px; font-weight: 900;
    padding: 6px 14px; border-radius: 100px;
    background: rgba(255,255,255,0.18); color: #fff;
    flex-shrink: 0; white-space: nowrap;
  }
  .nvw-forest-body {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0;
  }
  @media (max-width: 540px) { .nvw-forest-body { grid-template-columns: 1fr; } }
  .nvw-forest-col { padding: 20px 24px; }
  .nvw-forest-col h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 8px;
  }
  .nvw-forest-col ul { margin: 0; padding-left: 16px; }
  .nvw-forest-col ul li { font-size: 14px; color: var(--ink2); line-height: 1.7; margin-bottom: 5px; }

  /* Forest colour schemes */
  .nvw-forest-card.rain   { border-color: #166534; }
  .nvw-forest-card.rain   .nvw-forest-head { background: linear-gradient(135deg, #052e16, #166534); }
  .nvw-forest-card.rain   .nvw-forest-col:first-child { background: var(--forest-bg); }
  .nvw-forest-card.rain   .nvw-forest-col:last-child  { background: var(--lime-bg); border-left: 1.5px solid var(--lime-bd); }
  .nvw-forest-card.rain   .nvw-forest-col h4 { color: var(--forest); }
  @media (max-width: 540px) {
    .nvw-forest-card.rain .nvw-forest-col:last-child { border-left: none; border-top: 1.5px solid var(--lime-bd); }
  }

  .nvw-forest-card.dec    { border-color: var(--lime); }
  .nvw-forest-card.dec    .nvw-forest-head { background: linear-gradient(135deg, #1a2e05, #3f6212); }
  .nvw-forest-card.dec    .nvw-forest-col:first-child { background: var(--lime-bg); }
  .nvw-forest-card.dec    .nvw-forest-col:last-child  { background: #fefce8; border-left: 1.5px solid #fef08a; }
  .nvw-forest-card.dec    .nvw-forest-col h4 { color: var(--lime); }
  @media (max-width: 540px) {
    .nvw-forest-card.dec .nvw-forest-col:last-child { border-left: none; border-top: 1.5px solid #fef08a; }
  }

  .nvw-forest-card.thorn  { border-color: var(--amber); }
  .nvw-forest-card.thorn  .nvw-forest-head { background: linear-gradient(135deg, #3b1a08, #92400e); }
  .nvw-forest-card.thorn  .nvw-forest-col:first-child { background: var(--amber-bg); }
  .nvw-forest-card.thorn  .nvw-forest-col:last-child  { background: var(--brown-bg); border-left: 1.5px solid var(--brown-bd); }
  .nvw-forest-card.thorn  .nvw-forest-col h4 { color: var(--amber); }
  @media (max-width: 540px) {
    .nvw-forest-card.thorn .nvw-forest-col:last-child { border-left: none; border-top: 1.5px solid var(--brown-bd); }
  }

  .nvw-forest-card.montane{ border-color: var(--sky); }
  .nvw-forest-card.montane .nvw-forest-head { background: linear-gradient(135deg, #0c1a3b, #0369a1); }
  .nvw-forest-card.montane .nvw-forest-col:first-child { background: var(--sky-bg); }
  .nvw-forest-card.montane .nvw-forest-col:last-child  { background: var(--purple-bg); border-left: 1.5px solid var(--purple-bd); }
  .nvw-forest-card.montane .nvw-forest-col h4 { color: var(--sky); }
  @media (max-width: 540px) {
    .nvw-forest-card.montane .nvw-forest-col:last-child { border-left: none; border-top: 1.5px solid var(--purple-bd); }
  }

  .nvw-forest-card.mangro { border-color: var(--teal); }
  .nvw-forest-card.mangro .nvw-forest-head { background: linear-gradient(135deg, #042f2e, #0f766e); }
  .nvw-forest-card.mangro .nvw-forest-col:first-child { background: var(--teal-bg); }
  .nvw-forest-card.mangro .nvw-forest-col:last-child  { background: #f0fdf4; border-left: 1.5px solid var(--forest-bd); }
  .nvw-forest-card.mangro .nvw-forest-col h4 { color: var(--teal); }
  @media (max-width: 540px) {
    .nvw-forest-card.mangro .nvw-forest-col:last-child { border-left: none; border-top: 1.5px solid var(--forest-bd); }
  }

  /* ── Wildlife facts ── */
  .nvw-wildlife-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 14px; margin-bottom: 40px;
  }
  .nvw-wl-card {
    background: var(--card); border: 1.5px solid var(--forest-bd);
    border-radius: 14px; padding: 20px 18px;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .nvw-wl-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(22,101,52,0.1); }
  .nvw-wl-icon { font-size: 28px; margin-bottom: 10px; }
  .nvw-wl-card h4 {
    font-family: 'Montserrat', sans-serif;
    font-size: 22px; font-weight: 900; color: var(--forest2); margin: 0 0 4px;
  }
  .nvw-wl-card p { font-size: 14px; color: var(--muted); margin: 0; line-height: 1.5; }

  /* ── Unique to India callout ── */
  .nvw-unique {
    background: linear-gradient(135deg, #fef3c7, #fffbeb);
    border: 1.5px solid #fcd34d; border-radius: 18px;
    padding: 28px 32px; margin-bottom: 40px;
    display: flex; gap: 18px; align-items: flex-start;
  }
  .nvw-unique-icon { font-size: 40px; flex-shrink: 0; }
  @media (max-width: 480px) {
    .nvw-unique { flex-direction: column; align-items: center; text-align: center; }
  }
  .nvw-unique h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 700; color: #78350f; margin: 0 0 8px;
  }
  .nvw-unique p { font-size: 15px; color: #92400e; line-height: 1.7; margin: 0 0 8px; }
  .nvw-unique p:last-child { margin: 0; }

  /* ── Role of forests list ── */
  .nvw-roles {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px; margin-bottom: 40px;
  }
  .nvw-role-box {
    border-radius: 13px; padding: 18px 16px;
    border: 1.5px solid var(--forest-bd);
    background: var(--forest-bg); text-align: center;
  }
  .nvw-role-icon { font-size: 26px; margin-bottom: 8px; }
  .nvw-role-box p {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 600; color: var(--forest); margin: 0; line-height: 1.4;
  }

  /* ── Conservation section ── */
  .nvw-cons-split {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 14px; margin-bottom: 40px;
  }
  @media (max-width: 520px) { .nvw-cons-split { grid-template-columns: 1fr; } }
  .nvw-cons-card {
    border-radius: 16px; padding: 24px 22px; border: 1.5px solid;
  }
  .nvw-cons-card.threat { background: var(--brown-bg); border-color: var(--brown-bd); }
  .nvw-cons-card.protect { background: var(--forest-bg); border-color: var(--forest-bd); }
  .nvw-cons-card h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px; font-weight: 800; margin: 0 0 12px;
  }
  .nvw-cons-card.threat  h3 { color: var(--brown); }
  .nvw-cons-card.protect h3 { color: var(--forest2); }
  .nvw-cons-card ul { margin: 0; padding-left: 18px; }
  .nvw-cons-card ul li { font-size: 15px; line-height: 1.75; margin-bottom: 6px; }
  .nvw-cons-card.threat  ul li { color: var(--brown); }
  .nvw-cons-card.protect ul li { color: var(--forest); }

  /* ── Protected areas strip ── */
  .nvw-pa-strip {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 0; border-radius: 14px; overflow: hidden;
    border: 1.5px solid var(--forest-bd); margin-bottom: 48px;
    box-shadow: 0 4px 18px rgba(22,101,52,0.08);
  }
  @media (max-width: 520px) { .nvw-pa-strip { grid-template-columns: 1fr; } }
  .nvw-pa-box {
    padding: 28px 20px; text-align: center;
    border-right: 1.5px solid var(--forest-bd);
  }
  .nvw-pa-box:last-child { border-right: none; }
  @media (max-width: 520px) {
    .nvw-pa-box { border-right: none; border-bottom: 1.5px solid var(--forest-bd); }
    .nvw-pa-box:last-child { border-bottom: none; }
  }
  .nvw-pa-box.a { background: linear-gradient(160deg, #052e16, #14532d); }
  .nvw-pa-box.b { background: linear-gradient(160deg, #1a2e05, #3f6212); }
  .nvw-pa-box.c { background: linear-gradient(160deg, #042f2e, #0f766e); }
  .nvw-pa-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 36px; font-weight: 900; margin-bottom: 6px;
  }
  .nvw-pa-box.a .nvw-pa-num { color: #86efac; }
  .nvw-pa-box.b .nvw-pa-num { color: #bef264; }
  .nvw-pa-box.c .nvw-pa-num { color: #99f6e4; }
  .nvw-pa-lbl {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 600; line-height: 1.4;
  }
  .nvw-pa-box.a .nvw-pa-lbl,
  .nvw-pa-box.b .nvw-pa-lbl,
  .nvw-pa-box.c .nvw-pa-lbl { color: rgba(255,255,255,0.75); }

  /* ── FAQ ── */
  .nvw-faq-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 700; color: var(--forest2);
    letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 10px;
  }
  .nvw-faq-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(24px, 4vw, 34px); font-weight: 800;
    color: var(--ink); margin: 0 0 32px; letter-spacing: -0.01em;
  }
  .faq-item {
    border: 1.5px solid #dcfce7; border-radius: 14px;
    margin-bottom: 12px; overflow: hidden;
    background: var(--card); transition: border-color 0.2s;
  }
  .faq-item.open { border-color: var(--forest-bd); }
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
  .faq-icon { font-size: 22px; font-weight: 700; color: var(--forest2); flex-shrink: 0; line-height: 1; }
  .faq-ans {
    display: none; padding: 0 24px 20px;
    font-size: 15px; color: #374151; line-height: 1.75;
  }
  .faq-ans.visible { display: block; }
  .faq-ans strong { color: var(--forest2); }
  .faq-ans p { margin: 0 0 10px; }
  .faq-ans p:last-child { margin: 0; }
`;

const faqs = [
  {
    q: "What is natural vegetation? Distinguish between flora and fauna.",
    a: <p><strong>Natural vegetation</strong> refers to a plant community that grows naturally without human help and has remained undisturbed for a long time. <strong>Flora</strong> refers to plants of a specific region, while <strong>fauna</strong> refers to the animal species of that region. Vegetation that has been left undisturbed for a very long time is called <strong>virgin vegetation</strong>. Native Indian plant species are called <strong>endemic species</strong>; those that arrived from outside India are called <strong>exotic plants</strong>.</p>,
  },
  {
    q: "What are the main factors that determine natural vegetation in a region?",
    a: <>
      <p><strong>Relief factors:</strong> The nature of land — mountains, plains, plateaus, dry/wet regions — affects vegetation. Different soil types (sandy, deltaic, etc.) support different plants.</p>
      <p><strong>Climatic factors:</strong> Three main climatic factors determine vegetation — <strong>temperature</strong> (determines tropical to alpine types), <strong>photoperiod</strong> (sunlight duration affects growth rates — trees grow faster in summer), and <strong>precipitation</strong> (heavy rainfall areas have denser vegetation).</p>
    </>,
  },
  {
    q: "What is an ecosystem? What is a biome?",
    a: <p>An <strong>ecosystem</strong> is a system where all plants and animals in an area are interdependent and interrelated to each other and their physical environment. Human beings are an integral part of the ecosystem. A <strong>biome</strong> is a very large ecosystem on land having a distinct type of vegetation and animal life. Examples include the tropical rainforest biome, the grassland biome, and the desert biome.</p>,
  },
  {
    q: "Describe Tropical Evergreen Rainforests of India.",
    a: <p>Found in areas with <strong>more than 200 cm of rainfall</strong> and a warm, wet climate all year round. Characterised by <strong>luxurious trees, shrubs, and creepers</strong>. Trees have no fixed time to shed leaves, so forests appear evergreen throughout the year. Located in the <strong>Western Ghats, island groups, upper Assam, and Tamil Nadu</strong>. Animals found include elephants, monkeys, lemurs, and a large variety of birds, bats, sloth, and reptiles.</p>,
  },
  {
    q: "What are Tropical Deciduous Forests and how are they divided?",
    a: <>
      <p>Also called <strong>Monsoon Forests</strong>, these are the <strong>most widespread forests in India</strong>. Rainfall ranges between <strong>70–200 cm</strong>. Trees shed their leaves for about 6–8 weeks in the dry season.</p>
      <p>They are divided into: <strong>Moist Deciduous</strong> (rainfall 100–200 cm — found in northeast states, foothills of Himalayas, Jharkhand, West Odisha, Chhattisgarh, eastern slopes of Western Ghats) and <strong>Dry Deciduous</strong> (rainfall 70–100 cm — found in rainier parts of the peninsula and plains). Animals: lions, tigers, pigs, deer, elephants, birds, reptiles.</p>
    </>,
  },
  {
    q: "Describe Tropical Thorn Forests and Scrubs.",
    a: <p>Found where rainfall is <strong>less than 70 cm</strong> — the northwest part of the country and semi-arid areas of Gujarat, Rajasthan, MP, Chhattisgarh, UP, and Haryana. Plants have <strong>thick, small leaves</strong> to minimise evaporation and <strong>succulent stems</strong> to conserve water. Trees are widely spaced with thorny branches. Animals include rats, mice, rabbits, fox, wolf, tiger, and lion.</p>,
  },
  {
    q: "What are Montane Forests? Describe the vegetation belts with altitude.",
    a: <>
      <p>Montane forests show a <strong>succession of natural vegetation belts</strong> with increasing altitude — similar to the change from tropical to tundra regions.</p>
      <p>Belt progression: <strong>Tropical forests</strong> at the base → <strong>Subtropical forests</strong> (1,000–2,000 m) → <strong>Temperate forests</strong> (2,000–3,600 m) → <strong>Temperate grasslands</strong> (above 3,600 m) → <strong>Alpine vegetation</strong> (higher altitudes) → <strong>Tundra vegetation</strong> at the snow line. Animals include yaks, snow leopard, chiru, and Tibetan antelope in the Himalayas.</p>
    </>,
  },
  {
    q: "What are Mangrove Forests? Where are they found in India?",
    a: <p>Mangrove forests are found in <strong>tidal areas along coasts</strong> — areas influenced by tides. They feature <strong>dense mangroves</strong> with roots submerged underwater. Found in the <strong>delta regions of major rivers</strong> — especially the Ganga–Brahmaputra delta (Sundarbans). Also found along the coasts of Odisha, West Bengal, and the Andaman & Nicobar Islands. The famous <strong>Royal Bengal Tiger</strong> is the iconic animal of these forests.</p>,
  },
  {
    q: "What makes India's wildlife exceptional?",
    a: <>
      <p>India has over <strong>89,000 species of animals</strong>, <strong>1,200 species of birds</strong>, and <strong>2,500 species of fish</strong>. It accounts for 5–8% of the world's amphibians, reptiles, and mammals.</p>
      <p>India is the <strong>only country in the world that has both tigers and lions</strong>. The Himalayas have animals adapted to extreme cold. India is one of the <strong>twelve megabiodiversity countries</strong> of the world.</p>
    </>,
  },
  {
    q: "What steps has the government taken to conserve flora and fauna?",
    a: <p>The government has set up <strong>14 Biosphere Reserves</strong> to protect flora and fauna in their natural ecosystems. It has also established <strong>89 National Parks</strong> and <strong>49 Wildlife Sanctuaries</strong> to protect natural heritage. Various conservation programmes target specific endangered species like tigers (Project Tiger), elephants (Project Elephant), and crocodiles. Hunting and pollution remain the biggest threats, and legal frameworks like the Wildlife Protection Act have been enacted to check them.</p>,
  },
];

export default function NaturalVegetationBlog() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="blog-root">

        {/* ── Hero ── */}
        <div className="nvw-hero">
          <div className="nvw-hero-inner">
            <div className="nvw-hero-tag">🌿 Class 9 · Geography · Chapter 5</div>
            <h1 className="nvw-hero-title">
              Natural Vegetation<br /><span>&amp; Wildlife</span>
            </h1>
            <p className="nvw-hero-sub">
              From dense tropical rainforests to alpine meadows — explore India's extraordinary biodiversity, the five forest types, and the wildlife that calls them home.
            </p>
            <div className="nvw-hero-meta">
              <span className="nvw-meta-chip">📚 NCERT Class 9</span>
              <span className="nvw-meta-dot" />
              <span className="nvw-meta-chip">🗺️ Contemporary India — I</span>
              <span className="nvw-meta-dot" />
              <span className="nvw-meta-chip">⏱️ 14 min read</span>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="nvw-body">

          {/* Intro card */}
          <div className="nvw-intro-card">
            <p>India is one of the world's <strong>twelve megabiodiversity countries</strong> — home to over 47,000 plant species (10th in the world, 4th in Asia) and 89,000 animal species, making it one of the richest natural heritage nations on Earth.</p>
            <p>This extraordinary variety is shaped by India's diverse <strong>relief, climate, soils, and geography</strong> — from the icy Himalayas to tropical coasts, each zone nurturing its own distinct community of life.</p>
          </div>

          {/* Biodiversity stats */}
          <div className="nvw-stat-strip">
            <div className="nvw-stat">
              <div className="nvw-stat-num">47,000+</div>
              <div className="nvw-stat-lbl">Plant Species</div>
            </div>
            <div className="nvw-stat">
              <div className="nvw-stat-num">89,000+</div>
              <div className="nvw-stat-lbl">Animal Species</div>
            </div>
            <div className="nvw-stat">
              <div className="nvw-stat-num">1,200+</div>
              <div className="nvw-stat-lbl">Bird Species</div>
            </div>
            <div className="nvw-stat">
              <div className="nvw-stat-num">2,500+</div>
              <div className="nvw-stat-lbl">Fish Species</div>
            </div>
          </div>

          {/* Key Terms */}
          <div className="nvw-label grn">Key Concepts</div>
          <h2 className="nvw-title">Important <span className="grn">Definitions</span></h2>
          <div className="nvw-terms">
            {[
              { title:"Natural Vegetation", desc:"A plant community that grows naturally without human help and has remained undisturbed for a long time." },
              { title:"Virgin Vegetation", desc:"Natural vegetation that has been left undisturbed by humans for a long time. If purely Indian, it is called endemic; if from outside, it is called exotic." },
              { title:"Flora", desc:"The plants of a specific region or time period. India has over 47,000 plant species, including 15,000 flowering plants." },
              { title:"Fauna", desc:"The animal species of a specific region. India has 89,000 species of animals and rich freshwater and marine fish varieties." },
            ].map((t, i) => (
              <div className="nvw-term" key={i}>
                <h4>{t.title}</h4>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>

          {/* Factors */}
          <div className="nvw-label amb">Determining Factors</div>
          <h2 className="nvw-title">What Shapes <span className="amb">Flora &amp; Fauna?</span></h2>
          <div className="nvw-factors">
            <div className="nvw-factor-col relief">
              <h3>🏔️ Relief Factors</h3>
              <ul>
                <li>Nature of land — mountains, plains, plateaus</li>
                <li>Dry vs wet regions affect plant types</li>
                <li>Different <strong>soil types</strong> — sandy, deltaic, rocky — support different vegetation</li>
                <li>Altitude determines the succession of vegetation belts</li>
              </ul>
            </div>
            <div className="nvw-factor-col climate">
              <h3>🌦️ Climatic Factors</h3>
              <ul>
                <li><strong>Temperature</strong> — determines vegetation from tropical to alpine</li>
                <li><strong>Photoperiod</strong> — duration of sunlight varies growth; trees grow faster in summer</li>
                <li><strong>Precipitation</strong> — heavy rainfall = dense vegetation; sparse rainfall = scrublands</li>
                <li>Humidity in the air also significantly affects plant character</li>
              </ul>
            </div>
          </div>

          {/* Ecosystem */}
          <div className="nvw-eco">
            <div className="nvw-eco-icon">🌐</div>
            <div>
              <h3>Ecosystem &amp; Biome</h3>
              <p>An <strong>ecosystem</strong> is the system where all plants and animals in an area are <strong>interdependent and interrelated</strong> to each other and their physical environment. Human beings are an integral part of it.</p>
              <p>A <strong>biome</strong> is a very large ecosystem on land with a distinct type of vegetation and animal life. The <strong>greed of human beings</strong> leads to overutilisation of resources — threatening these ecosystems.</p>
            </div>
          </div>

          {/* Role of forests */}
          <div className="nvw-label grn">Why Forests Matter</div>
          <h2 className="nvw-title">Role of <span className="grn">Forests</span></h2>
          <div className="nvw-roles">
            {[
              { icon:"🌡️", text:"Modify local climate" },
              { icon:"🌊", text:"Control soil erosion" },
              { icon:"💧", text:"Regulate stream flow" },
              { icon:"💨", text:"Control wind force & temperature" },
              { icon:"🌧️", text:"Cause rainfall" },
              { icon:"🏘️", text:"Provide livelihoods for communities" },
            ].map((r, i) => (
              <div className="nvw-role-box" key={i}>
                <div className="nvw-role-icon">{r.icon}</div>
                <p>{r.text}</p>
              </div>
            ))}
          </div>

          <hr className="nvw-divider" />

          {/* Forest Types */}
          <div className="nvw-label grn">Types of Vegetation</div>
          <h2 className="nvw-title">India's Five <span className="grn">Forest Types</span></h2>

          {/* Tropical Rainforest */}
          <div className="nvw-forest-card rain">
            <div className="nvw-forest-head">
              <div className="nvw-forest-icon">🌳</div>
              <div className="nvw-forest-head-text">
                <h3>Tropical Evergreen Rainforests</h3>
                <p>Warm and wet climate all year — luxurious trees, shrubs &amp; creepers</p>
              </div>
              <div className="nvw-rain-badge">Rainfall &gt;200 cm</div>
            </div>
            <div className="nvw-forest-body">
              <div className="nvw-forest-col">
                <h4>📍 Location</h4>
                <ul>
                  <li>Western Ghats &amp; island groups</li>
                  <li>Upper parts of Assam</li>
                  <li>Tamil Nadu coast</li>
                </ul>
              </div>
              <div className="nvw-forest-col">
                <h4>🦎 Wildlife</h4>
                <ul>
                  <li>Elephants, monkeys, lemur</li>
                  <li>Bats, sloth, one-horned rhino</li>
                  <li>Variety of birds &amp; reptiles</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tropical Deciduous */}
          <div className="nvw-forest-card dec">
            <div className="nvw-forest-head">
              <div className="nvw-forest-icon">🍂</div>
              <div className="nvw-forest-head-text">
                <h3>Tropical Deciduous (Monsoon) Forests</h3>
                <p>Most widespread forests in India — shed leaves in dry season</p>
              </div>
              <div className="nvw-rain-badge">70–200 cm</div>
            </div>
            <div className="nvw-forest-body">
              <div className="nvw-forest-col">
                <h4>📍 Location</h4>
                <ul>
                  <li>Northeast states &amp; Himalayan foothills</li>
                  <li>Jharkhand, West Odisha, Chhattisgarh</li>
                  <li>Eastern slopes of Western Ghats</li>
                </ul>
              </div>
              <div className="nvw-forest-col">
                <h4>🦁 Wildlife</h4>
                <ul>
                  <li>Lion, tiger, pig, deer</li>
                  <li>Elephant, variety of birds</li>
                  <li>Reptiles &amp; amphibians</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Thorn Forests */}
          <div className="nvw-forest-card thorn">
            <div className="nvw-forest-head">
              <div className="nvw-forest-icon">🌵</div>
              <div className="nvw-forest-head-text">
                <h3>Tropical Thorn Forests &amp; Scrubs</h3>
                <p>Thick small leaves &amp; succulent stems to conserve water</p>
              </div>
              <div className="nvw-rain-badge">Rainfall &lt;70 cm</div>
            </div>
            <div className="nvw-forest-body">
              <div className="nvw-forest-col">
                <h4>📍 Location</h4>
                <ul>
                  <li>Northwestern India</li>
                  <li>Gujarat, Rajasthan, MP</li>
                  <li>Chhattisgarh, UP, Haryana</li>
                </ul>
              </div>
              <div className="nvw-forest-col">
                <h4>🦊 Wildlife</h4>
                <ul>
                  <li>Rats, mice, rabbits, fox</li>
                  <li>Wolf, tiger, lion</li>
                  <li>Camels, wild ass</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Montane */}
          <div className="nvw-forest-card montane">
            <div className="nvw-forest-head">
              <div className="nvw-forest-icon">🏔️</div>
              <div className="nvw-forest-head-text">
                <h3>Montane Forests</h3>
                <p>Succession of vegetation belts from tropical to tundra with altitude</p>
              </div>
              <div className="nvw-rain-badge">Altitude-based</div>
            </div>
            <div className="nvw-forest-body">
              <div className="nvw-forest-col">
                <h4>🧭 Altitude Belts</h4>
                <ul>
                  <li>1,000–2,000 m: Wet temperate forests</li>
                  <li>2,000–3,600 m: Temperate forests</li>
                  <li>Above 3,600 m: Alpine vegetation</li>
                </ul>
              </div>
              <div className="nvw-forest-col">
                <h4>🐆 Wildlife</h4>
                <ul>
                  <li>Snow leopard, yak, chiru</li>
                  <li>Tibetan antelope, bears</li>
                  <li>Various migratory birds</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mangrove */}
          <div className="nvw-forest-card mangro">
            <div className="nvw-forest-head">
              <div className="nvw-forest-icon">🌊</div>
              <div className="nvw-forest-head-text">
                <h3>Mangrove (Tidal) Forests</h3>
                <p>Tidal coastal areas — roots submerged underwater</p>
              </div>
              <div className="nvw-rain-badge">Coastal/Tidal</div>
            </div>
            <div className="nvw-forest-body">
              <div className="nvw-forest-col">
                <h4>📍 Location</h4>
                <ul>
                  <li>Ganga–Brahmaputra delta (Sundarbans)</li>
                  <li>Odisha &amp; West Bengal coast</li>
                  <li>Andaman &amp; Nicobar Islands</li>
                </ul>
              </div>
              <div className="nvw-forest-col">
                <h4>🐅 Wildlife</h4>
                <ul>
                  <li><strong>Royal Bengal Tiger</strong></li>
                  <li>Crocodiles, turtles, dolphins</li>
                  <li>Rich bird &amp; fish life</li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="nvw-divider" />

          {/* Wildlife */}
          <div className="nvw-label tl">Wildlife</div>
          <h2 className="nvw-title">India's <span className="tl">Wildlife Diversity</span></h2>

          <div className="nvw-wildlife-grid">
            {[
              { icon:"🐾", num:"89,000+", desc:"Species of animals" },
              { icon:"🦅", num:"1,200+", desc:"Species of birds" },
              { icon:"🐟", num:"2,500+", desc:"Species of fish" },
              { icon:"🐸", num:"5–8%", desc:"World's amphibians, reptiles & mammals" },
            ].map((w, i) => (
              <div className="nvw-wl-card" key={i}>
                <div className="nvw-wl-icon">{w.icon}</div>
                <h4>{w.num}</h4>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>

          <div className="nvw-unique">
            <div className="nvw-unique-icon">🏆</div>
            <div>
              <h4>Unique to India</h4>
              <p>India is the <strong>only country in the world</strong> that has both <strong>tigers and lions</strong>.</p>
              <p>The <strong>Himalayan region</strong> is home to animals specially adapted to survive in bitter cold — including the <strong>snow leopard, yak, Tibetan antelope (Chiru), and wild yak</strong>.</p>
            </div>
          </div>

          {/* Conservation */}
          <div className="nvw-label pur">Conservation</div>
          <h2 className="nvw-title">Threats &amp; <span className="pur">Protection</span></h2>

          <div className="nvw-cons-split">
            <div className="nvw-cons-card threat">
              <h3>⚠️ Threats to Wildlife</h3>
              <ul>
                <li>Hunting and poaching of animals</li>
                <li>Industrial and agricultural pollution</li>
                <li>Deforestation and habitat loss</li>
                <li>Overutilisation of resources by humans</li>
              </ul>
            </div>
            <div className="nvw-cons-card protect">
              <h3>✅ Government Protection Steps</h3>
              <ul>
                <li>14 Biosphere Reserves established</li>
                <li>89 National Parks created</li>
                <li>49 Wildlife Sanctuaries set up</li>
                <li>Project Tiger, Project Elephant launched</li>
              </ul>
            </div>
          </div>

          {/* Protected areas */}
          <div className="nvw-pa-strip">
            <div className="nvw-pa-box a">
              <div className="nvw-pa-num">14</div>
              <div className="nvw-pa-lbl">Biosphere Reserves</div>
            </div>
            <div className="nvw-pa-box b">
              <div className="nvw-pa-num">89</div>
              <div className="nvw-pa-lbl">National Parks</div>
            </div>
            <div className="nvw-pa-box c">
              <div className="nvw-pa-num">49</div>
              <div className="nvw-pa-lbl">Wildlife Sanctuaries</div>
            </div>
          </div>

          <hr className="nvw-divider" />

          {/* FAQ */}
          <div className="nvw-faq-label">Practice Questions</div>
          <h2 className="nvw-faq-title">Frequently Asked Questions</h2>

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
