import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #0a1508;
    --ink2:       #182614;
    --muted:      #4a6040;
    --paper:      #f2faf0;
    --paper2:     #e0f5da;
    --accent:     #166534;
    --accent2:    #14532d;
    --accent-lt:  #dcfce7;
    --red:        #b91c1c;
    --red-lt:     #fee2e2;
    --blue:       #1e40af;
    --blue-lt:    #dbeafe;
    --orange:     #c2410c;
    --orange-lt:  #ffedd5;
    --gold:       #a16207;
    --gold-lt:    #fef9c3;
    --teal:       #0f766e;
    --teal-lt:    #ccfbf1;
    --rule:       #86efac;
    --white:      #ffffff;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .sta-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  /* ═══ HERO — deep forest green / emerald night ═══ */
  .sta-hero {
    background: linear-gradient(135deg, #020a02 0%, #051a08 50%, #082010 100%);
    min-height: 88vh; display: flex; align-items: flex-end;
    position: relative; overflow: hidden; padding: 0 0 64px;
  }
  @media (max-width: 700px) {
    .sta-hero { min-height: auto; align-items: flex-start; padding: 72px 0 48px; }
  }
  .sta-hero::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #166534 0%, #1e40af 35%, #b91c1c 65%, #a16207 100%);
  }
  /* Orbit rings watermark */
  .sta-hero-orbit {
    position: absolute; top: 50%; right: 5%; transform: translateY(-50%);
    width: clamp(150px, 24vw, 300px); height: clamp(150px, 24vw, 300px);
    border-radius: 50%; border: 1px solid rgba(22,101,52,0.16); pointer-events: none;
  }
  .sta-hero-orbit::before {
    content: ''; position: absolute; inset: 14%; border-radius: 50%;
    border: 1px dashed rgba(22,101,52,0.12);
  }
  .sta-hero-orbit::after {
    content: ''; position: absolute; inset: 36%; border-radius: 50%;
    background: rgba(22,101,52,0.07);
    border: 1px solid rgba(22,101,52,0.1);
  }
  /* nucleus dot */
  .sta-hero-nucleus {
    position: absolute; top: 50%; right: 5%;
    width: clamp(150px, 24vw, 300px); height: clamp(150px, 24vw, 300px);
    transform: translateY(-50%); pointer-events: none;
    display: flex; align-items: center; justify-content: center;
  }
  .sta-hero-nucleus::after {
    content: ''; display: block; width: 10px; height: 10px; border-radius: 50%;
    background: rgba(22,101,52,0.25);
  }
  /* Grid */
  .sta-hero-grid {
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(22,101,52,0.14) 1px, transparent 1px);
    background-size: 30px 30px; pointer-events: none;
  }
  .sta-glow-a {
    position: absolute; top: 15%; left: 5%; width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(22,101,52,0.18) 0%, transparent 68%); pointer-events: none;
  }
  .sta-glow-b {
    position: absolute; bottom: 8%; right: 22%; width: 180px; height: 180px; border-radius: 50%;
    background: radial-gradient(circle, rgba(30,64,175,0.10) 0%, transparent 70%); pointer-events: none;
  }
  .sta-hero-bg-num {
    position: absolute; bottom: -80px; right: -20px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(200px, 34vw, 480px); font-weight: 900;
    line-height: 1; color: rgba(255,255,255,0.018);
    letter-spacing: -0.04em; user-select: none; pointer-events: none;
  }
  .sta-hero-inner { max-width: 900px; width: 100%; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
  .sta-overline {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; color: #86efac;
    margin-bottom: 24px; display: flex; align-items: center; gap: 14px;
  }
  .sta-overline::before, .sta-overline::after { content: ''; flex: 0 0 40px; height: 1px; background: #86efac; }
  .sta-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(36px, 7.5vw, 78px); font-weight: 900; color: #fff;
    line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 32px;
  }
  .sta-hero-title em   { font-style: normal; color: #86efac; }
  .sta-hero-title .em2 { color: #93c5fd; }
  .sta-hero-bar { display: flex; flex-wrap: wrap; gap: 0; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; margin-top: 8px; }
  .sta-hero-bar-item { flex: 1 1 150px; padding: 0 24px 0 0; border-right: 1px solid rgba(255,255,255,0.08); margin-right: 24px; }
  .sta-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .sta-bar-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 5px; }
  .sta-bar-value { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.72); }

  /* ═══ BODY ═══ */
  .sta-body { max-width: 860px; margin: 0 auto; padding: 72px 32px 96px; }

  /* ═══ INTRO CARD ═══ */
  .sta-intro-card {
    background: linear-gradient(135deg, #020a02 0%, #082010 100%);
    border-left: 5px solid #166534; border-radius: 4px; padding: 36px 40px;
    margin-bottom: 64px; position: relative; overflow: hidden;
  }
  .sta-intro-card::after { content: '⚛️'; position: absolute; right: 28px; top: 50%; transform: translateY(-50%); font-size: 88px; opacity: 0.08; }
  .sta-intro-card p { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 500; color: rgba(255,255,255,0.86); line-height: 1.8; margin: 0 0 14px; }
  .sta-intro-card p:last-child { margin: 0; }
  .sta-intro-card strong { color: #86efac; }

  /* ═══ DIVIDER ═══ */
  .sta-divider { margin: 56px 0; display: flex; align-items: center; gap: 16px; }
  .sta-divider::before, .sta-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .sta-divider-mark { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

  /* ═══ SECTION HEADER ═══ */
  .sta-sec-head { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 32px; border-bottom: 2px solid var(--rule); padding-bottom: 18px; }
  .sta-sec-num { font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900; color: var(--rule); line-height: 1; flex-shrink: 0; }
  .sta-sec-title-wrap { padding-top: 8px; }
  .sta-sec-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .sta-sec-title { font-family: 'Montserrat', sans-serif; font-size: clamp(20px, 3.5vw, 30px); font-weight: 800; color: var(--ink); line-height: 1.15; letter-spacing: -0.02em; }
  .sta-sec-title span { color: var(--accent); }

  /* ═══ BODY TEXT ═══ */
  .sta-body-text { font-family: 'Inter', sans-serif; font-size: 16px; color: var(--ink2); line-height: 1.85; margin-bottom: 28px; }
  .sta-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ═══ S1: SUBATOMIC PARTICLES — 3 inventor cards ═══ */
  .sta-particle-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 32px; }
  @media (max-width: 600px) { .sta-particle-grid { grid-template-columns: 1fr; } }
  .sta-particle-card { background: #ffffff; border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; }
  .sta-particle-hdr { padding: 16px 18px; }
  .sta-particle-card:nth-child(1) .sta-particle-hdr { background: linear-gradient(135deg, #1e0020, #7c3aed); }
  .sta-particle-card:nth-child(2) .sta-particle-hdr { background: linear-gradient(135deg, #1a0a00, #c2410c); }
  .sta-particle-card:nth-child(3) .sta-particle-hdr { background: linear-gradient(135deg, #001a10, #166534); }
  .sta-particle-symbol { font-family: 'Montserrat', sans-serif; font-size: 32px; font-weight: 900; color: #fff; line-height: 1; margin-bottom: 2px; }
  .sta-particle-name { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.65); }
  .sta-particle-body { padding: 14px 18px; background: #ffffff; }
  .sta-particle-row { display: flex; align-items: baseline; gap: 8px; padding: 5px 0; border-bottom: 1px solid var(--rule); }
  .sta-particle-row:last-child { border-bottom: none; }
  .sta-particle-lbl { font-family: 'Poppins', sans-serif; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); min-width: 68px; flex-shrink: 0; }
  .sta-particle-val { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2); line-height: 1.5; }
  .sta-particle-val strong { font-weight: 600; color: var(--ink); }

  /* ═══ S2: ATOMIC MODELS — timeline style ═══ */
  .sta-timeline { position: relative; padding-left: 32px; margin-bottom: 32px; }
  .sta-timeline::before { content: ''; position: absolute; left: 10px; top: 0; bottom: 0; width: 2px; background: var(--rule); }
  .sta-tl-item { position: relative; margin-bottom: 24px; }
  .sta-tl-item:last-child { margin-bottom: 0; }
  .sta-tl-dot { position: absolute; left: -28px; top: 14px; width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--white); z-index: 1; }
  .sta-tl-item:nth-child(1) .sta-tl-dot { background: var(--gold); }
  .sta-tl-item:nth-child(2) .sta-tl-dot { background: #7c3aed; }
  .sta-tl-item:nth-child(3) .sta-tl-dot { background: var(--orange); }
  .sta-tl-item:nth-child(4) .sta-tl-dot { background: var(--blue); }
  .sta-tl-card { background: #ffffff; border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; }
  .sta-tl-hdr { padding: 14px 20px; display: flex; align-items: center; gap: 14px; }
  .sta-tl-item:nth-child(1) .sta-tl-hdr { background: linear-gradient(135deg, #1a1200, #a16207); }
  .sta-tl-item:nth-child(2) .sta-tl-hdr { background: linear-gradient(135deg, #1e0020, #7c3aed); }
  .sta-tl-item:nth-child(3) .sta-tl-hdr { background: linear-gradient(135deg, #1a0a00, #c2410c); }
  .sta-tl-item:nth-child(4) .sta-tl-hdr { background: linear-gradient(135deg, #001430, #1e40af); }
  .sta-tl-scientist { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 2px; }
  .sta-tl-model-name { font-family: 'Montserrat', sans-serif; font-size: 17px; font-weight: 900; color: #fff; }
  .sta-tl-body { padding: 16px 20px; background: #ffffff; }
  .sta-tl-point { font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.65; padding: 5px 0; border-bottom: 1px solid var(--rule); display: flex; gap: 10px; }
  .sta-tl-point:last-child { border-bottom: none; }
  .sta-tl-dot-sm { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-top: 7px; }
  .sta-tl-item:nth-child(1) .sta-tl-dot-sm { background: var(--gold); }
  .sta-tl-item:nth-child(2) .sta-tl-dot-sm { background: #7c3aed; }
  .sta-tl-item:nth-child(3) .sta-tl-dot-sm { background: var(--orange); }
  .sta-tl-item:nth-child(4) .sta-tl-dot-sm { background: var(--blue); }
  .sta-tl-point strong { font-weight: 600; color: var(--ink); }

  /* Rutherford drawbacks — red callout */
  .sta-drawback-box { background: #ffffff; border: 1.5px solid var(--red-lt); border-left: 5px solid var(--red); border-radius: 6px; padding: 20px 24px; margin: 0 0 28px; }
  .sta-drawback-title { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--red); margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
  .sta-drawback-item { display: flex; gap: 10px; padding: 6px 0; border-bottom: 1px solid var(--red-lt); font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.65; }
  .sta-drawback-item:last-child { border-bottom: none; }
  .sta-drawback-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--red); flex-shrink: 0; margin-top: 7px; }

  /* ═══ S3: BOHR MODEL — shell capacity table ═══ */
  .sta-bohr-box { background: linear-gradient(135deg, #020a02, #082010); border-radius: 8px; padding: 26px 30px; margin-bottom: 28px; }
  .sta-bohr-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(134,239,172,0.6); margin-bottom: 18px; }
  .sta-bohr-formula { text-align: center; margin-bottom: 22px; }
  .sta-bohr-formula-big { font-family: 'Montserrat', sans-serif; font-size: clamp(24px, 4vw, 36px); font-weight: 900; color: #86efac; }
  .sta-bohr-formula-sub { font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(255,255,255,0.45); margin-top: 4px; }
  .sta-shell-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
  @media (max-width: 500px) { .sta-shell-row { grid-template-columns: repeat(2, 1fr); } }
  .sta-shell-cell { background: rgba(255,255,255,0.05); border: 1px solid rgba(134,239,172,0.14); border-radius: 6px; padding: 12px 10px; text-align: center; }
  .sta-shell-name { font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900; color: #86efac; line-height: 1; margin-bottom: 4px; }
  .sta-shell-num { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; color: rgba(134,239,172,0.55); letter-spacing: 0.1em; margin-bottom: 8px; }
  .sta-shell-cap { font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.6); }
  .sta-shell-cap strong { color: #fff; font-size: 15px; font-family: 'Poppins', sans-serif; font-weight: 700; display: block; margin-bottom: 2px; }

  /* Bohr postulates */
  .sta-bohr-postulates { margin-bottom: 28px; }
  .sta-bohr-post { display: flex; gap: 16px; padding: 14px 0; border-bottom: 1px solid var(--rule); }
  .sta-bohr-post:last-child { border-bottom: none; }
  .sta-bohr-post-num { font-family: 'Montserrat', sans-serif; font-size: 26px; font-weight: 900; color: var(--rule); line-height: 1; flex-shrink: 0; min-width: 32px; }
  .sta-bohr-post-text { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); line-height: 1.75; padding-top: 4px; }
  .sta-bohr-post-text strong { font-weight: 600; color: var(--accent2); }

  /* ═══ S4: ATOMIC NUMBER, VALENCY, ISOTOPES, ISOBARS ═══ */
  .sta-concept-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 28px; }
  @media (max-width: 540px) { .sta-concept-grid { grid-template-columns: 1fr; } }
  .sta-concept-card { background: #ffffff; border: 1.5px solid var(--rule); border-radius: 6px; padding: 18px 20px; }
  .sta-concept-card:nth-child(1) { border-top: 4px solid var(--accent); }
  .sta-concept-card:nth-child(2) { border-top: 4px solid var(--blue); }
  .sta-concept-card:nth-child(3) { border-top: 4px solid var(--orange); }
  .sta-concept-card:nth-child(4) { border-top: 4px solid var(--red); }
  .sta-concept-title { font-family: 'Poppins', sans-serif; font-size: 13.5px; font-weight: 700; margin-bottom: 8px; }
  .sta-concept-card:nth-child(1) .sta-concept-title { color: var(--accent); }
  .sta-concept-card:nth-child(2) .sta-concept-title { color: var(--blue); }
  .sta-concept-card:nth-child(3) .sta-concept-title { color: var(--orange); }
  .sta-concept-card:nth-child(4) .sta-concept-title { color: var(--red); }
  .sta-concept-text { font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.75; }
  .sta-concept-text strong { font-weight: 600; color: var(--ink); }
  .sta-concept-formula { margin-top: 10px; background: var(--paper2); border-radius: 4px; padding: 8px 12px; font-family: 'Poppins', sans-serif; font-size: 12.5px; font-weight: 700; color: var(--accent2); }

  /* Isotopes vs Isobars compare */
  .sta-iso-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 28px; }
  @media (max-width: 540px) { .sta-iso-pair { grid-template-columns: 1fr; } }
  .sta-iso-card { border-radius: 8px; overflow: hidden; border: 1.5px solid var(--rule); background: #ffffff; }
  .sta-iso-hdr.isotope { background: linear-gradient(135deg, #001430, #1e40af); padding: 16px 20px; }
  .sta-iso-hdr.isobar  { background: linear-gradient(135deg, #1a0a00, #c2410c); padding: 16px 20px; }
  .sta-iso-tag  { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 4px; }
  .sta-iso-name { font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 900; color: #fff; }
  .sta-iso-body { padding: 16px 20px; background: #ffffff; }
  .sta-iso-def  { font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.7; margin-bottom: 10px; }
  .sta-iso-def strong { font-weight: 600; color: var(--ink); }
  .sta-iso-eg   { background: var(--paper2); border-radius: 4px; padding: 8px 12px; font-family: 'Poppins', sans-serif; font-size: 12.5px; font-weight: 700; color: var(--accent2); }

  /* Atomic mass formula box */
  .sta-mass-box { background: var(--paper2); border: 1.5px solid var(--rule); border-radius: 8px; padding: 20px 24px; margin-bottom: 28px; display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
  .sta-mass-box-icon { font-size: 36px; flex-shrink: 0; }
  .sta-mass-box-content {}
  .sta-mass-box-title { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: var(--accent2); margin-bottom: 6px; }
  .sta-mass-box-formula { font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 900; color: var(--accent); }

  /* ═══ PULL QUOTE ═══ */
  .sta-pull-quote { border-left: 5px solid var(--accent); background: var(--accent-lt); padding: 20px 28px; margin: 28px 0; border-radius: 0 4px 4px 0; }
  .sta-pull-quote p { font-family: 'Poppins', sans-serif; font-size: 15.5px; font-weight: 600; color: var(--accent2); line-height: 1.7; font-style: italic; margin: 0; }

  /* ═══ FAQ ═══ */
  .sta-faq-header { margin-bottom: 12px; }
  .sta-faq-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); background: var(--accent-lt); padding: 6px 16px; border-radius: 100px; }
  .sta-faq-title { font-family: 'Montserrat', sans-serif; font-size: clamp(24px, 4vw, 34px); font-weight: 900; color: var(--ink); letter-spacing: -0.02em; margin-bottom: 28px; margin-top: 16px; }
  .sta-faq-item { border: 1.5px solid var(--rule); border-radius: 6px; margin-bottom: 12px; overflow: hidden; background: #ffffff; transition: border-color 0.2s; }
  .sta-faq-item.open { border-color: var(--accent); }
  .sta-faq-q { width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; text-align: left; gap: 16px; }
  .sta-faq-q-text { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600; color: var(--ink); line-height: 1.5; }
  .sta-faq-item.open .sta-faq-q-text { color: var(--accent); }
  .sta-faq-icon { font-size: 20px; color: var(--accent); flex-shrink: 0; line-height: 1; }
  .sta-faq-ans { font-family: 'Inter', sans-serif; font-size: 15px; color: var(--ink2); line-height: 1.85; padding: 0 24px; max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; }
  .sta-faq-ans.visible { max-height: 1000px; padding: 0 24px 22px; }
  .sta-faq-ans strong { color: var(--accent2); font-weight: 600; }

  @media (max-width: 700px) {
    .sta-body { padding: 48px 18px 72px; }
    .sta-hero-inner { padding: 0 18px; }
    .sta-intro-card { padding: 24px 20px; }
    .sta-intro-card p { font-size: 15px; }
    .sta-hero-bar { gap: 12px; }
    .sta-hero-bar-item { flex: 1 1 120px; padding: 0 14px 0 0; margin-right: 14px; }
    .sta-bar-label { font-size: 9px; letter-spacing: 0.12em; }
    .sta-bar-value { font-size: 13px; }
    .sta-overline { font-size: 10px; letter-spacing: 0.16em; }
    .sta-hero-title { font-size: clamp(36px, 10vw, 56px); margin-bottom: 24px; }
    .sta-faq-q { padding: 16px 18px; }
    .sta-faq-ans.visible { padding: 0 18px 18px; }
    .sta-timeline { padding-left: 24px; }
    .sta-bohr-box { padding: 20px 16px; }
  }
`;

const faqs = [
  {
    q: "What are the three fundamental subatomic particles? Who discovered each?",
    a: (<>An atom is composed of three fundamental subatomic particles:<br /><br />
      1. <strong>Electron</strong> — Negatively charged. Discovered by <strong>J. J. Thomson</strong> using the cathode ray experiment (1897). Mass ≈ 1/1840 of a proton.<br />
      2. <strong>Proton</strong> — Positively charged. Discovered by <strong>E. Goldstein</strong> via canal ray experiments. Found in the nucleus. Mass ≈ 1 u.<br />
      3. <strong>Neutron</strong> — Electrically neutral (no charge). Discovered by <strong>J. Chadwick</strong> in 1932. Found in the nucleus. Mass ≈ 1 u.<br /><br />
      Together, protons and neutrons form the nucleus, while electrons orbit around it in shells.</>),
  },
  {
    q: "What is Thomson's atomic model? What were its key features?",
    a: (<><strong>Thomson's Atomic Model</strong> (also called the "plum pudding model", 1904):<br /><br />
      • An atom is a <strong>sphere of uniform positive charge</strong>, like a ball of positive electricity.<br />
      • Electrons (negatively charged) are <strong>embedded</strong> within this positive sphere, like plums in a pudding.<br />
      • The atom is <strong>electrically neutral</strong> overall — the positive charge of the sphere exactly cancels the total negative charge of the electrons.<br /><br />
      <strong>Limitation:</strong> Thomson's model could not explain the results of Rutherford's gold foil experiment, where most alpha particles passed straight through the atom. A uniform positive sphere would have deflected all particles slightly, not allowed most to pass through.</>),
  },
  {
    q: "What was Rutherford's gold foil experiment? What did it prove?",
    a: (<><strong>Rutherford's Alpha Scattering Experiment (1909):</strong><br /><br />
      Alpha particles (positively charged, heavy) were fired at a thin gold foil. A detector screen surrounded the foil.<br /><br />
      <strong>Observations:</strong><br />
      • Most alpha particles passed <strong>straight through</strong> — atom is mostly empty space.<br />
      • A small fraction were <strong>deflected at large angles</strong> — some hit a dense positive region.<br />
      • Very few bounced <strong>straight back</strong> — the positive charge is concentrated in a tiny, dense core.<br /><br />
      <strong>Conclusions:</strong><br />
      • Atom has a tiny, dense, positively charged <strong>nucleus</strong> at the centre.<br />
      • Electrons revolve in circular orbits around the nucleus.<br />
      • The nucleus is very small compared to the overall size of the atom — most of the atom is empty space.</>),
  },
  {
    q: "What are the drawbacks of Rutherford's atomic model?",
    a: (<>Rutherford's model had three major drawbacks:<br /><br />
      1. <strong>Stability problem:</strong> According to classical physics, an electron moving in a circular orbit should continuously emit electromagnetic radiation, lose energy, and spiral into the nucleus. This would make atoms unstable — but atoms are stable. The model couldn't explain this.<br /><br />
      2. <strong>No electron arrangement:</strong> The model gave no information about how electrons are distributed around the nucleus, their energy levels, or the electronic structure of atoms.<br /><br />
      3. <strong>Cannot explain atomic spectra:</strong> If electrons radiated energy continuously, they should produce a continuous spectrum. But atoms emit only specific wavelengths (line spectrum). Rutherford's model had no explanation for this.</>),
  },
  {
    q: "What is Bohr's atomic model? What are its main postulates?",
    a: (<><strong>Bohr's Atomic Model</strong> (Neils Bohr, 1913) addressed Rutherford's shortcomings:<br /><br />
      Key postulates:<br />
      1. Electrons revolve around the nucleus in <strong>fixed, specific circular orbits</strong> called <strong>energy levels</strong> (or shells), labelled K, L, M, N (or 1, 2, 3, 4).<br />
      2. While revolving in these orbits, electrons <strong>do NOT emit energy</strong> — these are stable orbits.<br />
      3. Each shell can hold a <strong>maximum of 2n²</strong> electrons (n = shell number): K=2, L=8, M=18, N=32.<br />
      4. Electrons can jump between shells by absorbing or emitting energy equal to the difference between energy levels — this explains atomic spectra.<br /><br />
      Bohr's model successfully explained the hydrogen spectrum and the concept of stable electron shells.</>),
  },
  {
    q: "What is the formula for maximum electrons in a shell? Give examples for each shell.",
    a: (<>The maximum number of electrons a shell can hold is given by the formula <strong>2n²</strong>, where n is the shell number.<br /><br />
      • <strong>K shell (n=1):</strong> 2 × 1² = <strong>2 electrons</strong><br />
      • <strong>L shell (n=2):</strong> 2 × 2² = <strong>8 electrons</strong><br />
      • <strong>M shell (n=3):</strong> 2 × 3² = <strong>18 electrons</strong><br />
      • <strong>N shell (n=4):</strong> 2 × 4² = <strong>32 electrons</strong><br /><br />
      Note: While 2n² gives the theoretical maximum, in practice the outermost shell never holds more than 8 electrons (octet rule), and the second outermost never holds more than 18. These rules are important for understanding valency and chemical bonding.</>),
  },
  {
    q: "What is valency? How is it determined?",
    a: (<><strong>Valency</strong> is the combining capacity of an atom — how many bonds it can form with other atoms.<br /><br />
      It depends on the number of electrons in the <strong>outermost shell</strong> (valence electrons):<br /><br />
      • If the outermost shell has <strong>1, 2, 3, or 4</strong> electrons → valency = that number (tendency to lose electrons).<br />
      • If the outermost shell has <strong>5, 6, or 7</strong> electrons → valency = 8 minus that number (tendency to gain electrons).<br />
      • If the outermost shell is <strong>completely filled</strong> (8 electrons, or 2 for helium) → valency = 0 (inert/noble gases).<br /><br />
      Examples: Na (2,8,1) → valency 1; O (2,6) → valency 2; N (2,5) → valency 3; C (2,4) → valency 4.</>),
  },
  {
    q: "What is atomic number and atomic mass?",
    a: (<><strong>Atomic Number (Z)</strong> = Number of protons in the nucleus of an atom.<br />
      • In a neutral atom, atomic number also equals the number of electrons.<br />
      • It uniquely identifies an element — no two elements have the same atomic number.<br />
      • Example: Carbon has Z = 6 (6 protons, 6 electrons).<br /><br />
      <strong>Atomic Mass (A)</strong> = Number of protons + Number of neutrons in the nucleus.<br />
      • Also called mass number.<br />
      • Formula: A = Z + N (where N = number of neutrons)<br />
      • Therefore: <strong>Number of neutrons = Atomic mass − Atomic number</strong><br />
      • Example: Carbon-12 has A = 12, Z = 6, so N = 12 − 6 = 6 neutrons.</>),
  },
  {
    q: "What are isotopes? Give examples and state their uses.",
    a: (<><strong>Isotopes</strong> are atoms of the same element that have the <strong>same atomic number but different atomic masses</strong>. They differ in the number of neutrons.<br /><br />
      Examples:<br />
      • Hydrogen isotopes: Protium (¹H, 0 neutrons), Deuterium (²H, 1 neutron), Tritium (³H, 2 neutrons) — all have Z = 1.<br />
      • Carbon isotopes: ¹²C (6 neutrons) and ¹⁴C (8 neutrons) — both have Z = 6.<br />
      • Chlorine: ³⁵Cl (75%) and ³⁷Cl (25%) — average atomic mass = 35.5 u.<br /><br />
      Uses of isotopes:<br />
      • <strong>¹⁴C</strong>: Radiocarbon dating of fossils.<br />
      • <strong>U-235</strong>: Nuclear fuel in reactors.<br />
      • <strong>I-131</strong>: Treatment of thyroid cancer.<br />
      • <strong>Co-60</strong>: Cancer radiotherapy.</>),
  },
  {
    q: "What are isobars? How are they different from isotopes?",
    a: (<><strong>Isobars</strong> are atoms of <strong>different elements</strong> that have the <strong>same atomic mass but different atomic numbers</strong>. They differ in the number of protons (and hence electrons).<br /><br />
      Example: Calcium (Ca) and Argon (Ar) are isobars — both have atomic mass 40, but Ca has Z = 20 and Ar has Z = 18.<br /><br />
      <strong>Comparison with Isotopes:</strong><br />
      • <strong>Isotopes</strong>: Same Z (same element), different A (different neutrons). Example: ¹²C and ¹⁴C.<br />
      • <strong>Isobars</strong>: Same A (different elements), different Z (different protons). Example: ⁴⁰Ca and ⁴⁰Ar.<br /><br />
      Isotopes are atoms of the same element; isobars are atoms of different elements.</>),
  },
];

export default function StructureOfTheAtom() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="sta-root">

        {/* ══════ HERO ══════ */}
        <div className="sta-hero">
          <div className="sta-hero-grid" />
          <div className="sta-hero-orbit" />
          <div className="sta-hero-nucleus" />
          <div className="sta-glow-a" />
          <div className="sta-glow-b" />
          <div className="sta-hero-bg-num">4</div>
          <div className="sta-hero-inner">
            <div className="sta-overline">Class 9 · Science · Chapter 4</div>
            <h1 className="sta-hero-title">
              Structure of<br />
              <em>the Atom</em>
            </h1>
            <div className="sta-hero-bar">
              <div className="sta-hero-bar-item">
                <div className="sta-bar-label">Subject</div>
                <div className="sta-bar-value">Science — Chemistry</div>
              </div>
              <div className="sta-hero-bar-item">
                <div className="sta-bar-label">Topics</div>
                <div className="sta-bar-value">Models · Bohr · Isotopes</div>
              </div>
              <div className="sta-hero-bar-item">
                <div className="sta-bar-label">Board</div>
                <div className="sta-bar-value">CBSE · NCERT</div>
              </div>
              <div className="sta-hero-bar-item">
                <div className="sta-bar-label">FAQs</div>
                <div className="sta-bar-value">10 Questions</div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════ BODY ══════ */}
        <div className="sta-body">

          {/* Intro */}
          <div className="sta-intro-card">
            <p>
              Atoms were once thought to be the ultimate, indivisible building blocks of matter. This chapter dismantles that idea — revealing that atoms have an <strong>internal structure</strong> made of electrons, protons, and neutrons.
            </p>
            <p>
              From Thomson's plum pudding to Bohr's energy shells, the history of atomic models shows how science evolves through experiment and revision. Understanding this structure explains valency, isotopes, and the behaviour of all chemical elements.
            </p>
          </div>

          {/* ══ S1: Subatomic Particles ══ */}
          <div className="sta-sec-head">
            <div className="sta-sec-num">1</div>
            <div className="sta-sec-title-wrap">
              <div className="sta-sec-kicker">Discovery</div>
              <h2 className="sta-sec-title">The Three <span>Subatomic Particles</span></h2>
            </div>
          </div>
          <p className="sta-body-text">
            Atoms are <strong>not indivisible</strong>. They are composed of three fundamental charged particles, each discovered through ingenious experiments:
          </p>

          <div className="sta-particle-grid">
            {[
              {
                sym: "e⁻", name: "Electron",
                rows: [
                  { lbl: "Charge", val: <>Negative (−1)</> },
                  { lbl: "Mass", val: <>≈ 1/1840 of a proton</> },
                  { lbl: "Location", val: <>Orbits around nucleus</> },
                  { lbl: "Discovered by", val: <><strong>J. J. Thomson</strong> — cathode ray experiment</> },
                ]
              },
              {
                sym: "p⁺", name: "Proton",
                rows: [
                  { lbl: "Charge", val: <>Positive (+1)</> },
                  { lbl: "Mass", val: <>≈ 1 u (1.67 × 10⁻²⁷ kg)</> },
                  { lbl: "Location", val: <>Inside the nucleus</> },
                  { lbl: "Discovered by", val: <><strong>E. Goldstein</strong> — canal ray experiment</> },
                ]
              },
              {
                sym: "n⁰", name: "Neutron",
                rows: [
                  { lbl: "Charge", val: <>Neutral (0)</> },
                  { lbl: "Mass", val: <>≈ 1 u (slightly  proton)</> },
                  { lbl: "Location", val: <>Inside the nucleus</> },
                  { lbl: "Discovered by", val: <><strong>J. Chadwick</strong> — 1932</> },
                ]
              },
            ].map((p, i) => (
              <div className="sta-particle-card" key={i}>
                <div className="sta-particle-hdr">
                  <div className="sta-particle-symbol">{p.sym}</div>
                  <div className="sta-particle-name">{p.name}</div>
                </div>
                <div className="sta-particle-body">
                  {p.rows.map((r, j) => (
                    <div className="sta-particle-row" key={j}>
                      <div className="sta-particle-lbl">{r.lbl}</div>
                      <div className="sta-particle-val">{r.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ══ S2: Atomic Models — Timeline ══ */}
          <div className="sta-divider"><div className="sta-divider-mark" /></div>
          <div className="sta-sec-head">
            <div className="sta-sec-num">2</div>
            <div className="sta-sec-title-wrap">
              <div className="sta-sec-kicker">Historical Evolution</div>
              <h2 className="sta-sec-title">Atomic Models — <span>From Dalton to Bohr</span></h2>
            </div>
          </div>
          <p className="sta-body-text">
            Our understanding of atomic structure evolved through four major models, each built upon — and correcting — the previous one.
          </p>

          <div className="sta-timeline">
            {/* Dalton */}
            <div className="sta-tl-item">
              <div className="sta-tl-dot" />
              <div className="sta-tl-card">
                <div className="sta-tl-hdr">
                  <div>
                    <div className="sta-tl-scientist">John Dalton · 1808</div>
                    <div className="sta-tl-model-name">Dalton's Atomic Model</div>
                  </div>
                </div>
                <div className="sta-tl-body">
                  {["Atom is the smallest, indivisible particle of matter.",
                    "Cannot be created or destroyed in chemical reactions.",
                    "All atoms of an element are identical; different elements have different atoms.",
                    "Limitation: Could not explain the internal structure of the atom."
                  ].map((t, i) => (
                    <div className="sta-tl-point" key={i}>
                      <div className="sta-tl-dot-sm" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Thomson */}
            <div className="sta-tl-item">
              <div className="sta-tl-dot" />
              <div className="sta-tl-card">
                <div className="sta-tl-hdr">
                  <div>
                    <div className="sta-tl-scientist">J. J. Thomson · 1904</div>
                    <div className="sta-tl-model-name">Thomson's "Plum Pudding" Model</div>
                  </div>
                </div>
                <div className="sta-tl-body">
                  {["Atom is a sphere of uniform positive charge.",
                    "Electrons (negative) are embedded within the positive sphere — like plums in pudding.",
                    "Atom is electrically neutral overall — positive and negative charges balance.",
                    "Limitation: Rutherford's gold foil experiment disproved this model."
                  ].map((t, i) => (
                    <div className="sta-tl-point" key={i}>
                      <div className="sta-tl-dot-sm" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rutherford */}
            <div className="sta-tl-item">
              <div className="sta-tl-dot" />
              <div className="sta-tl-card">
                <div className="sta-tl-hdr">
                  <div>
                    <div className="sta-tl-scientist">Ernest Rutherford · 1911</div>
                    <div className="sta-tl-model-name">Rutherford's Nuclear Model</div>
                  </div>
                </div>
                <div className="sta-tl-body">
                  {["All positive charge (protons) concentrated in a tiny, dense nucleus at the centre.",
                    "Electrons revolve in circular orbits around the nucleus.",
                    "The nucleus is extremely small compared to the total size of the atom.",
                    "Most of the atom is empty space — proven by most alpha particles passing through gold foil."
                  ].map((t, i) => (
                    <div className="sta-tl-point" key={i}>
                      <div className="sta-tl-dot-sm" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bohr */}
            <div className="sta-tl-item">
              <div className="sta-tl-dot" />
              <div className="sta-tl-card">
                <div className="sta-tl-hdr">
                  <div>
                    <div className="sta-tl-scientist">Neils Bohr · 1913</div>
                    <div className="sta-tl-model-name">Bohr's Planetary Model</div>
                  </div>
                </div>
                <div className="sta-tl-body">
                  {["Electrons revolve in specific, fixed orbits called energy levels (K, L, M, N…).",
                    "Electrons do NOT emit energy while revolving in these fixed orbits — atoms are stable.",
                    "Maximum electrons per shell: 2n² (K=2, L=8, M=18, N=32).",
                    "Electrons emit/absorb energy only when jumping between shells — explains atomic spectra."
                  ].map((t, i) => (
                    <div className="sta-tl-point" key={i}>
                      <div className="sta-tl-dot-sm" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Rutherford drawbacks */}
          <div className="sta-drawback-box">
            <div className="sta-drawback-title">⚠ Drawbacks of Rutherford's Model</div>
            {[
              "Could not explain atomic stability — accelerating electrons should radiate energy and spiral into the nucleus.",
              "Gave no information about the distribution of electrons around the nucleus or their energy levels.",
              "Could not explain the atomic spectra — why atoms emit only specific wavelengths of light.",
            ].map((t, i) => (
              <div className="sta-drawback-item" key={i}>
                <div className="sta-drawback-dot" />
                <span>{t}</span>
              </div>
            ))}
          </div>

          {/* ══ S3: Bohr's Model Detail ══ */}
          <div className="sta-divider"><div className="sta-divider-mark" /></div>
          <div className="sta-sec-head">
            <div className="sta-sec-num">3</div>
            <div className="sta-sec-title-wrap">
              <div className="sta-sec-kicker">Electron Shells</div>
              <h2 className="sta-sec-title">Bohr's Model — <span>Energy Levels &amp; Shells</span></h2>
            </div>
          </div>
          <p className="sta-body-text">
            Bohr and Bury proposed that electrons occupy <strong>discrete energy shells</strong> around the nucleus. Each shell has a maximum electron capacity given by the formula <strong>2n²</strong>.
          </p>

          <div className="sta-bohr-box">
            <div className="sta-bohr-label">⬦ Shell Capacity Formula &amp; Values</div>
            <div className="sta-bohr-formula">
              <div className="sta-bohr-formula-big">Max electrons = 2n²</div>
              <div className="sta-bohr-formula-sub">n = shell number (1, 2, 3, 4…)</div>
            </div>
            <div className="sta-shell-row">
              {[
                { name: "K", num: "n = 1", cap: 2 },
                { name: "L", num: "n = 2", cap: 8 },
                { name: "M", num: "n = 3", cap: 18 },
                { name: "N", num: "n = 4", cap: 32 },
              ].map((s) => (
                <div className="sta-shell-cell" key={s.name}>
                  <div className="sta-shell-name">{s.name}</div>
                  <div className="sta-shell-num">{s.num}</div>
                  <div className="sta-shell-cap">
                    <strong>{s.cap}</strong>
                    electrons max
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sta-bohr-postulates">
            {[
              { text: <>Electrons revolve around the nucleus in <strong>specific, fixed circular orbits</strong> called energy levels or shells — labelled K, L, M, N (or 1, 2, 3, 4).</> },
              { text: <>While moving in these permitted orbits, electrons <strong>do not radiate energy</strong>. These are called stationary states or stable orbits.</> },
              { text: <>Each shell can hold a <strong>maximum of 2n²</strong> electrons. The outermost shell never holds more than <strong>8 electrons</strong> (octet rule).</> },
              { text: <>When an electron <strong>jumps from a higher to a lower energy level</strong>, it emits a photon of energy equal to the difference between the two levels — this explains atomic spectra.</> },
            ].map((p, i) => (
              <div className="sta-bohr-post" key={i}>
                <div className="sta-bohr-post-num">0{i + 1}</div>
                <div className="sta-bohr-post-text">{p.text}</div>
              </div>
            ))}
          </div>

          {/* ══ S4: Atomic Number, Mass, Valency ══ */}
          <div className="sta-divider"><div className="sta-divider-mark" /></div>
          <div className="sta-sec-head">
            <div className="sta-sec-num">4</div>
            <div className="sta-sec-title-wrap">
              <div className="sta-sec-kicker">Key Definitions</div>
              <h2 className="sta-sec-title">Atomic Number, Mass <span>&amp; Valency</span></h2>
            </div>
          </div>
          <p className="sta-body-text">
            Three fundamental quantities describe every atom — its atomic number, atomic mass, and valency. Together they define an element's identity and chemical behaviour.
          </p>

          <div className="sta-concept-grid">
            <div className="sta-concept-card">
              <div className="sta-concept-title">Atomic Number (Z)</div>
              <div className="sta-concept-text">Number of <strong>protons</strong> in the nucleus. In a neutral atom, equals the number of electrons. Uniquely identifies each element.
                <div className="sta-concept-formula">Z = Number of protons = Number of electrons</div>
              </div>
            </div>
            <div className="sta-concept-card">
              <div className="sta-concept-title">Atomic Mass (A)</div>
              <div className="sta-concept-text">Sum of <strong>protons + neutrons</strong> in the nucleus. Also called mass number.
                <div className="sta-concept-formula">A = Protons + Neutrons → Neutrons = A − Z</div>
              </div>
            </div>
            <div className="sta-concept-card">
              <div className="sta-concept-title">Valency</div>
              <div className="sta-concept-text">The <strong>combining capacity</strong> of an atom. Determined by electrons in the outermost shell. If outermost shell has ≤4 electrons → valency = that number. If &gt;4 → valency = 8 minus that number.</div>
            </div>
            <div className="sta-concept-card">
              <div className="sta-concept-title">Electronic Configuration</div>
              <div className="sta-concept-text">Distribution of electrons across shells. Written as 2, 8, 18, 32… Example: Sodium (Z=11) → <strong>2, 8, 1</strong>. The last number gives the valence electrons → valency = 1.</div>
            </div>
          </div>

          {/* ══ S5: Isotopes & Isobars ══ */}
          <div className="sta-divider"><div className="sta-divider-mark" /></div>
          <div className="sta-sec-head">
            <div className="sta-sec-num">5</div>
            <div className="sta-sec-title-wrap">
              <div className="sta-sec-kicker">Atomic Variants</div>
              <h2 className="sta-sec-title">Isotopes <span>&amp; Isobars</span></h2>
            </div>
          </div>
          <p className="sta-body-text">
            Not all atoms of the same element are identical in mass — and atoms of different elements can share the same mass number. These are the concepts of <strong>isotopes</strong> and <strong>isobars</strong>.
          </p>

          <div className="sta-iso-pair">
            <div className="sta-iso-card">
              <div className="sta-iso-hdr isotope">
                <div className="sta-iso-tag">Same Z · Different A</div>
                <div className="sta-iso-name">🔵 Isotopes</div>
              </div>
              <div className="sta-iso-body">
                <div className="sta-iso-def">Atoms of the <strong>same element</strong> with the same atomic number but <strong>different atomic masses</strong>. They differ in the number of neutrons.</div>
                <div className="sta-iso-eg">¹H, ²H (Deuterium), ³H (Tritium) — all have Z=1<br />¹²C and ¹⁴C — both have Z=6<br />³⁵Cl and ³⁷Cl — both have Z=17</div>
              </div>
            </div>
            <div className="sta-iso-card">
              <div className="sta-iso-hdr isobar">
                <div className="sta-iso-tag">Same A · Different Z</div>
                <div className="sta-iso-name">🟠 Isobars</div>
              </div>
              <div className="sta-iso-body">
                <div className="sta-iso-def">Atoms of <strong>different elements</strong> with the same atomic mass but <strong>different atomic numbers</strong>. They differ in number of protons.</div>
                <div className="sta-iso-eg">⁴⁰Ca (Z=20) and ⁴⁰Ar (Z=18) — both A=40<br />¹⁴C (Z=6) and ¹⁴N (Z=7) — both A=14</div>
              </div>
            </div>
          </div>

          <div className="sta-mass-box">
            <div className="sta-mass-box-icon">⚛️</div>
            <div className="sta-mass-box-content">
              <div className="sta-mass-box-title">Quick Formula — Finding Neutrons</div>
              <div className="sta-mass-box-formula">Neutrons = Atomic Mass (A) − Atomic Number (Z)</div>
            </div>
          </div>

          <div className="sta-pull-quote">
            <p>"Every atomic model was a stepping stone — Thomson disproved Dalton, Rutherford disproved Thomson, and Bohr fixed Rutherford. Science advances not by being right the first time, but by being willing to be corrected."</p>
          </div>

          {/* ══ FAQ ══ */}
          <div className="sta-divider"><div className="sta-divider-mark" /></div>
          <div className="sta-faq-header"><span className="sta-faq-kicker">Exam Preparation</span></div>
          <h2 className="sta-faq-title">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div className={`sta-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="sta-faq-q" onClick={() => toggle(i)}>
                <span className="sta-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="sta-faq-icon">{openIndex === i ? "▴" : "▾"}</span>
              </button>
              <div className={`sta-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
