import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #1a1200;
    --ink2:       #2d2200;
    --muted:      #6b5a30;
    --paper:      #fdf8ee;
    --paper2:     #f5eccf;
    --accent:     #b45309;
    --accent2:    #92400e;
    --accent-lt:  #fef3c7;
    --teal:       #0f766e;
    --teal-lt:    #ccfbf1;
    --blue:       #1d4ed8;
    --blue-lt:    #dbeafe;
    --purple:     #7c3aed;
    --purple-lt:  #ede9fe;
    --red:        #be123c;
    --red-lt:     #ffe4e6;
    --green:      #15803d;
    --green-lt:   #dcfce7;
    --rule:       #e4c97a;
    --white:      #ffffff;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .imp-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  /* ═══ HERO — rich amber / dark amber-night ═══ */
  .imp-hero {
    background: linear-gradient(135deg, #120900 0%, #1e1000 50%, #2a1800 100%);
    min-height: 88vh; display: flex; align-items: flex-end;
    position: relative; overflow: hidden; padding: 0 0 64px;
  }
  @media (max-width: 700px) {
    .imp-hero { min-height: auto; align-items: flex-start; padding: 72px 0 48px; }
  }
  .imp-hero::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #b45309 0%, #0f766e 38%, #7c3aed 72%, #be123c 100%);
  }
  /* Hex grid bg */
  .imp-hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(180,83,9,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(180,83,9,0.07) 1px, transparent 1px);
    background-size: 40px 40px; pointer-events: none;
  }
  /* Molecule ring */
  .imp-hero-ring {
    position: absolute; top: 50%; right: 5%; transform: translateY(-50%);
    width: clamp(140px, 22vw, 280px); height: clamp(140px, 22vw, 280px);
    border-radius: 50%; border: 1.5px solid rgba(180,83,9,0.14); pointer-events: none;
  }
  .imp-hero-ring::before {
    content: ''; position: absolute; inset: 18%; border-radius: 50%;
    border: 1px dashed rgba(180,83,9,0.10);
  }
  .imp-hero-ring::after {
    content: ''; position: absolute; inset: 40%; border-radius: 50%;
    background: rgba(180,83,9,0.06);
  }
  /* Glow blobs */
  .imp-glow-a {
    position: absolute; top: 18%; left: 6%; width: 280px; height: 280px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(180,83,9,0.16) 0%, transparent 68%);
    pointer-events: none;
  }
  .imp-glow-b {
    position: absolute; bottom: 8%; right: 22%; width: 180px; height: 180px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(15,118,110,0.10) 0%, transparent 70%);
    pointer-events: none;
  }
  .imp-hero-bg-num {
    position: absolute; bottom: -80px; right: -20px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(200px, 34vw, 480px); font-weight: 900;
    line-height: 1; color: rgba(255,255,255,0.018);
    letter-spacing: -0.04em; user-select: none; pointer-events: none;
  }
  .imp-hero-inner { max-width: 900px; width: 100%; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
  .imp-overline {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; color: #fbbf24;
    margin-bottom: 24px; display: flex; align-items: center; gap: 14px;
  }
  .imp-overline::before, .imp-overline::after { content: ''; flex: 0 0 40px; height: 1px; background: #fbbf24; }
  .imp-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(32px, 7vw, 74px); font-weight: 900; color: #fff;
    line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 32px;
  }
  .imp-hero-title em   { font-style: normal; color: #fbbf24; }
  .imp-hero-title .em2 { color: #6ee7b7; }
  .imp-hero-bar { display: flex; flex-wrap: wrap; gap: 0; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; margin-top: 8px; }
  .imp-hero-bar-item { flex: 1 1 150px; padding: 0 24px 0 0; border-right: 1px solid rgba(255,255,255,0.08); margin-right: 24px; }
  .imp-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .imp-bar-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 5px; }
  .imp-bar-value { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.72); }

  /* ═══ BODY ═══ */
  .imp-body { max-width: 860px; margin: 0 auto; padding: 72px 32px 96px; }

  /* ═══ INTRO CARD ═══ */
  .imp-intro-card {
    background: linear-gradient(135deg, #120900 0%, #2a1800 100%);
    border-left: 5px solid #b45309; border-radius: 4px; padding: 36px 40px;
    margin-bottom: 64px; position: relative; overflow: hidden;
  }
  .imp-intro-card::after { content: '🧫'; position: absolute; right: 28px; top: 50%; transform: translateY(-50%); font-size: 88px; opacity: 0.08; }
  .imp-intro-card p { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 500; color: rgba(255,255,255,0.86); line-height: 1.8; margin: 0 0 14px; }
  .imp-intro-card p:last-child { margin: 0; }
  .imp-intro-card strong { color: #fbbf24; }

  /* ═══ DIVIDER ═══ */
  .imp-divider { margin: 56px 0; display: flex; align-items: center; gap: 16px; }
  .imp-divider::before, .imp-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .imp-divider-mark { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

  /* ═══ SECTION HEADER ═══ */
  .imp-sec-head { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 32px; border-bottom: 2px solid var(--rule); padding-bottom: 18px; }
  .imp-sec-num { font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900; color: var(--rule); line-height: 1; flex-shrink: 0; }
  .imp-sec-title-wrap { padding-top: 8px; }
  .imp-sec-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .imp-sec-title { font-family: 'Montserrat', sans-serif; font-size: clamp(20px, 3.5vw, 30px); font-weight: 800; color: var(--ink); line-height: 1.15; letter-spacing: -0.02em; }
  .imp-sec-title span { color: var(--accent); }

  /* ═══ BODY TEXT ═══ */
  .imp-body-text { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; color: var(--ink2); line-height: 1.85; margin-bottom: 28px; }
  .imp-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ═══ S1: MIXTURE vs SUBSTANCE — big split banner ═══ */
  .imp-split-banner { display: grid; grid-template-columns: 1fr 1fr; border-radius: 8px; overflow: hidden; border: 1.5px solid var(--rule); margin-bottom: 32px; }
  @media (max-width: 580px) { .imp-split-banner { grid-template-columns: 1fr; } }
  .imp-split-col { padding: 26px 24px; }
  .imp-split-col:first-child { background: linear-gradient(160deg, #1e1000, #2a1800); }
  .imp-split-col:last-child  { background: var(--white); border-left: 1.5px solid var(--rule); }
  @media (max-width: 580px) { .imp-split-col:last-child { border-left: none; border-top: 1.5px solid var(--rule); } }
  .imp-split-tag { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 6px; }
  .imp-split-col:first-child .imp-split-tag { color: rgba(251,191,36,0.6); }
  .imp-split-col:last-child  .imp-split-tag { color: var(--teal); }
  .imp-split-title { font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900; margin-bottom: 14px; }
  .imp-split-col:first-child .imp-split-title { color: #fff; }
  .imp-split-col:last-child  .imp-split-title { color: var(--teal); }
  .imp-split-point { font-family: 'Inter', sans-serif; font-size: 13.5px; line-height: 1.65; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.07); display: flex; gap: 8px; }
  .imp-split-col:last-child .imp-split-point { border-bottom-color: var(--rule); color: var(--ink2); }
  .imp-split-col:first-child .imp-split-point { color: rgba(255,255,255,0.72); }
  .imp-split-point:last-child { border-bottom: none; }
  .imp-split-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-top: 7px; }
  .imp-split-col:first-child .imp-split-dot { background: #fbbf24; }
  .imp-split-col:last-child  .imp-split-dot { background: var(--teal); }
  .imp-split-point strong { font-weight: 600; }
  .imp-split-col:first-child .imp-split-point strong { color: #fbbf24; }
  .imp-split-col:last-child  .imp-split-point strong  { color: var(--teal); }

  /* ═══ S1: Homogeneous vs Heterogeneous — badge cards ═══ */
  .imp-mix-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 28px; }
  @media (max-width: 560px) { .imp-mix-pair { grid-template-columns: 1fr; } }
  .imp-mix-card { border-radius: 8px; overflow: hidden; border: 1.5px solid var(--rule); }
  .imp-mix-hdr { padding: 16px 20px; }
  .imp-mix-hdr.homo  { background: linear-gradient(135deg, #0d2e26, #0f766e); }
  .imp-mix-hdr.hetro { background: linear-gradient(135deg, #2e1800, #b45309); }
  .imp-mix-hdr-tag { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 4px; }
  .imp-mix-hdr-name { font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 900; color: #fff; }
  .imp-mix-body { padding: 16px 20px; background: var(--white); }
  .imp-mix-def { font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.7; margin-bottom: 12px; }
  .imp-mix-def strong { font-weight: 600; color: var(--ink); }
  .imp-mix-examples { display: flex; flex-wrap: wrap; gap: 6px; }
  .imp-mix-tag-pill { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 100px; }
  .homo  .imp-mix-tag-pill { background: var(--teal-lt); color: var(--teal); }
  .hetro .imp-mix-tag-pill { background: var(--accent-lt); color: var(--accent); }

  /* 3-type subgrid */
  .imp-subtype-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 28px; }
  @media (max-width: 580px) { .imp-subtype-grid { grid-template-columns: 1fr; } }
  .imp-subtype-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 6px; padding: 14px 16px; }
  .imp-subtype-card.homo-sub  { border-top: 3px solid var(--teal); }
  .imp-subtype-card.hetro-sub { border-top: 3px solid var(--accent); }
  .imp-subtype-icon { font-size: 22px; margin-bottom: 6px; display: block; }
  .imp-subtype-name { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
  .imp-subtype-ex { font-family: 'Inter', sans-serif; font-size: 12px; color: var(--muted); line-height: 1.5; }

  /* ═══ S2: SOLUTION — solvent/solute layout ═══ */
  .imp-sol-split { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 28px; }
  @media (max-width: 560px) { .imp-sol-split { grid-template-columns: 1fr; } }
  .imp-sol-half { border-radius: 8px; overflow: hidden; border: 1.5px solid var(--rule); }
  .imp-sol-hdr.solvent { background: linear-gradient(135deg, #1e1460, #1d4ed8); padding: 16px 20px; }
  .imp-sol-hdr.solute  { background: linear-gradient(135deg, #4a0030, #be123c); padding: 16px 20px; }
  .imp-sol-hdr-tag  { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 4px; }
  .imp-sol-hdr-name { font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 900; color: #fff; }
  .imp-sol-body { padding: 16px 20px; background: var(--white); font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.7; }
  .imp-sol-body strong { font-weight: 600; color: var(--ink); }

  /* Properties of solution — 4 icon chips */
  .imp-prop-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 28px; }
  @media (max-width: 600px) { .imp-prop-row { grid-template-columns: repeat(2, 1fr); } }
  .imp-prop-chip { background: var(--white); border: 1.5px solid var(--rule); border-radius: 6px; padding: 14px 12px; text-align: center; border-bottom: 3px solid var(--accent); }
  .imp-prop-chip:nth-child(2) { border-bottom-color: var(--teal); }
  .imp-prop-chip:nth-child(3) { border-bottom-color: var(--blue); }
  .imp-prop-chip:nth-child(4) { border-bottom-color: var(--purple); }
  .imp-prop-chip-icon { font-size: 24px; display: block; margin-bottom: 6px; }
  .imp-prop-chip-text { font-family: 'Poppins', sans-serif; font-size: 11.5px; font-weight: 700; color: var(--ink2); line-height: 1.4; }

  /* ═══ S2: Concentration formulas — formula cards ═══ */
  .imp-formula-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 28px; }
  @media (max-width: 560px) { .imp-formula-grid { grid-template-columns: 1fr; } }
  .imp-formula-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 6px; padding: 18px 20px; }
  .imp-formula-card:nth-child(1) { border-left: 4px solid var(--accent); }
  .imp-formula-card:nth-child(2) { border-left: 4px solid var(--teal); }
  .imp-formula-card:nth-child(3) { border-left: 4px solid var(--blue); }
  .imp-formula-card:nth-child(4) { border-left: 4px solid var(--purple); }
  .imp-formula-card:nth-child(5) { border-left: 4px solid var(--red); }
  .imp-formula-card:nth-child(6) { border-left: 4px solid var(--green); }
  .imp-formula-label { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent); margin-bottom: 8px; }
  .imp-formula-card:nth-child(2) .imp-formula-label { color: var(--teal); }
  .imp-formula-card:nth-child(3) .imp-formula-label { color: var(--blue); }
  .imp-formula-card:nth-child(4) .imp-formula-label { color: var(--purple); }
  .imp-formula-card:nth-child(5) .imp-formula-label { color: var(--red); }
  .imp-formula-card:nth-child(6) .imp-formula-label { color: var(--green); }
  .imp-formula-abbr { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; color: var(--muted); margin-bottom: 10px; }
  .imp-formula-frac { display: flex; flex-direction: column; align-items: center; gap: 0; }
  .imp-formula-num { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink); font-weight: 500; text-align: center; padding-bottom: 3px; border-bottom: 1.5px solid var(--ink2); line-height: 1.4; }
  .imp-formula-den { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink); font-weight: 500; text-align: center; padding-top: 3px; line-height: 1.4; }
  .imp-formula-mult { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: var(--accent); margin-left: 8px; align-self: center; }
  .imp-formula-frac-row { display: flex; align-items: center; }

  /* ═══ S3: SOLUTION vs SUSPENSION vs COLLOID — 3-col comparison ═══ */
  .imp-three-compare { border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; margin-bottom: 32px; }
  .imp-three-hdr { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; }
  .imp-three-hdr-cell { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 14px 14px; color: #fff; }
  .imp-three-hdr-cell:nth-child(1) { background: var(--ink2); }
  .imp-three-hdr-cell:nth-child(2) { background: #0f766e; }
  .imp-three-hdr-cell:nth-child(3) { background: #1d4ed8; }
  .imp-three-hdr-cell:nth-child(4) { background: #7c3aed; }
  .imp-three-row { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; border-top: 1px solid var(--rule); }
  .imp-three-row:nth-child(even) { background: var(--paper2); }
  .imp-three-cell { font-family: 'Inter', sans-serif; font-size: 12.5px; color: var(--ink2); padding: 10px 14px; border-right: 1px solid var(--rule); line-height: 1.5; }
  .imp-three-cell:first-child { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ink); font-size: 12px; }
  .imp-three-cell:last-child { border-right: none; }
  .imp-three-cell.yes { color: var(--green); font-weight: 600; }
  .imp-three-cell.no  { color: var(--red);   font-weight: 600; }
  @media (max-width: 640px) {
    .imp-three-hdr, .imp-three-row { grid-template-columns: 1.1fr 0.85fr 0.85fr 0.85fr; }
    .imp-three-cell { font-size: 11px; padding: 8px 8px; }
    .imp-three-hdr-cell { font-size: 9px; padding: 12px 8px; }
  }

  /* ═══ COLLOID TYPES — 3×3 matrix ═══ */
  .imp-colloid-section-label { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin-bottom: 14px; padding: 8px 14px; background: var(--accent-lt); border-radius: 4px; display: inline-block; }
  .imp-colloid-table { border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; margin-bottom: 28px; }
  .imp-colloid-hdr { display: grid; grid-template-columns: 1.2fr 1fr 1fr 1fr; }
  .imp-colloid-hdr-cell { font-family: 'Poppins', sans-serif; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.09em; padding: 12px 12px; }
  .imp-colloid-hdr-cell:nth-child(1) { background: var(--ink); color: #fff; }
  .imp-colloid-hdr-cell:nth-child(2) { background: #2a1800; color: #fbbf24; }
  .imp-colloid-hdr-cell:nth-child(3) { background: #0d2e26; color: #6ee7b7; }
  .imp-colloid-hdr-cell:nth-child(4) { background: #1e1460; color: #93c5fd; }
  .imp-colloid-row { display: grid; grid-template-columns: 1.2fr 1fr 1fr 1fr; border-top: 1px solid var(--rule); }
  .imp-colloid-row:nth-child(even) { background: var(--paper2); }
  .imp-colloid-cell { font-family: 'Inter', sans-serif; font-size: 12.5px; color: var(--ink2); padding: 10px 12px; border-right: 1px solid var(--rule); line-height: 1.5; }
  .imp-colloid-cell:first-child { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ink); font-size: 12px; }
  .imp-colloid-cell:last-child { border-right: none; }
  @media (max-width: 640px) {
    .imp-colloid-hdr, .imp-colloid-row { grid-template-columns: 1fr 0.9fr 0.9fr 0.9fr; }
    .imp-colloid-cell, .imp-colloid-hdr-cell { font-size: 10px; padding: 8px 8px; }
  }

  /* Tyndall effect callout */
  .imp-tyndall { background: linear-gradient(135deg, #120900 0%, #2a1800 100%); border-radius: 8px; padding: 22px 28px; margin-bottom: 28px; display: flex; align-items: center; gap: 20px; }
  @media (max-width: 540px) { .imp-tyndall { flex-direction: column; text-align: center; } }
  .imp-tyndall-icon { font-size: 48px; flex-shrink: 0; }
  .imp-tyndall-title { font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 900; color: #fff; margin-bottom: 6px; }
  .imp-tyndall-text { font-family: 'Inter', sans-serif; font-size: 13.5px; color: rgba(255,255,255,0.70); line-height: 1.7; }
  .imp-tyndall-text strong { color: #fbbf24; font-weight: 600; }

  /* ═══ S4: SEPARATION METHODS — timeline / strip layout ═══ */
  .imp-sep-list { margin-bottom: 32px; }
  .imp-sep-item {
    display: grid; grid-template-columns: 180px 1fr;
    border: 1.5px solid var(--rule); border-radius: 6px; overflow: hidden; margin-bottom: 10px; background: var(--white);
  }
  @media (max-width: 580px) { .imp-sep-item { grid-template-columns: 1fr; } }
  .imp-sep-method { padding: 18px 16px; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 4px; }
  .imp-sep-method.evap   { background: linear-gradient(160deg, #2a1800, #92400e); }
  .imp-sep-method.centri { background: linear-gradient(160deg, #0d2e26, #0f766e); }
  .imp-sep-method.funnel { background: linear-gradient(160deg, #1e1460, #1d4ed8); }
  .imp-sep-method.subli  { background: linear-gradient(160deg, #4a0030, #be123c); }
  .imp-sep-method.chrom  { background: linear-gradient(160deg, #1a0060, #7c3aed); }
  .imp-sep-method.distil { background: linear-gradient(160deg, #0a2e00, #15803d); }
  .imp-sep-method.fdist  { background: linear-gradient(160deg, #1a1200, #b45309); }
  .imp-sep-method.cryst  { background: linear-gradient(160deg, #00293a, #0284c7); }
  .imp-sep-method-icon { font-size: 22px; }
  .imp-sep-method-name { font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 900; color: #fff; line-height: 1.2; }
  .imp-sep-desc { padding: 18px 20px; font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.7; border-left: 1px solid var(--rule); }
  @media (max-width: 580px) { .imp-sep-desc { border-left: none; border-top: 1px solid var(--rule); } }
  .imp-sep-desc strong { color: var(--accent2); font-weight: 600; }
  .imp-sep-desc .imp-sep-use { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; color: var(--muted); margin-top: 6px; padding: 4px 10px; background: var(--paper2); border-radius: 4px; display: inline-block; }

  /* ═══ S5: PHYSICAL vs CHEMICAL CHANGE — two independent cards ═══ */
  .imp-change-box { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 32px; }
  @media (max-width: 560px) { .imp-change-box { grid-template-columns: 1fr; } }
  .imp-change-card { border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; }
  .imp-change-hdr-cell { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 14px 20px; color: #fff; display: flex; align-items: center; gap: 10px; }
  .imp-change-card:first-child .imp-change-hdr-cell { background: linear-gradient(90deg, #0d2e26, #0f766e); }
  .imp-change-card:last-child  .imp-change-hdr-cell { background: linear-gradient(90deg, #2a1800, #b45309); }
  .imp-change-hdr-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .imp-change-card:first-child .imp-change-hdr-dot { background: #6ee7b7; }
  .imp-change-card:last-child  .imp-change-hdr-dot { background: #fbbf24; }
  .imp-change-col { padding: 16px 20px; background: var(--white); }
  .imp-change-row { display: flex; align-items: flex-start; gap: 10px; padding: 7px 0; border-bottom: 1px solid var(--rule); }
  .imp-change-row:last-child { border-bottom: none; }
  .imp-change-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
  .imp-change-card:first-child .imp-change-dot { background: var(--teal); }
  .imp-change-card:last-child  .imp-change-dot { background: var(--accent); }
  .imp-change-text { font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.65; }
  .imp-change-text strong { font-weight: 600; color: var(--ink); }

  /* ═══ S5: Mixture vs Compound — table ═══ */
  .imp-mc-table { border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; margin-bottom: 28px; }
  .imp-mc-hdr { display: grid; grid-template-columns: 1fr 1fr; }
  .imp-mc-hdr-cell { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 13px 18px; color: #fff; }
  .imp-mc-hdr-cell:first-child { background: #0f766e; }
  .imp-mc-hdr-cell:last-child  { background: #7c3aed; }
  .imp-mc-row { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid var(--rule); }
  .imp-mc-row:nth-child(even) { background: var(--paper2); }
  .imp-mc-cell { font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); padding: 12px 18px; border-right: 1px solid var(--rule); line-height: 1.55; }
  .imp-mc-cell:last-child { border-right: none; }
  .imp-mc-cell strong { font-weight: 600; color: var(--ink); }
  @media (max-width: 520px) { .imp-mc-cell { padding: 10px 12px; font-size: 12px; } }

  /* ═══ S6: ELEMENTS & COMPOUNDS — classification strip ═══ */
  .imp-elem-intro { background: var(--accent-lt); border-left: 5px solid var(--accent); border-radius: 0 6px 6px 0; padding: 18px 24px; margin-bottom: 24px; }
  .imp-elem-intro p { font-family: 'Poppins', sans-serif; font-size: 15.5px; font-weight: 600; color: var(--accent2); line-height: 1.7; margin: 0; }

  .imp-elem-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 28px; }
  @media (max-width: 600px) { .imp-elem-grid { grid-template-columns: repeat(2, 1fr); } }
  .imp-elem-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 6px; padding: 16px 14px; text-align: center; }
  .imp-elem-card:nth-child(1) { border-top: 3px solid var(--accent); }
  .imp-elem-card:nth-child(2) { border-top: 3px solid var(--teal); }
  .imp-elem-card:nth-child(3) { border-top: 3px solid var(--blue); }
  .imp-elem-card:nth-child(4) { border-top: 3px solid var(--purple); }
  .imp-elem-icon { font-size: 26px; display: block; margin-bottom: 8px; }
  .imp-elem-name { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
  .imp-elem-ex { font-family: 'Inter', sans-serif; font-size: 12px; color: var(--muted); line-height: 1.5; }

  /* pull quote */
  .imp-pull-quote { border-left: 5px solid var(--accent); background: var(--accent-lt); padding: 20px 28px; margin: 28px 0; border-radius: 0 4px 4px 0; }
  .imp-pull-quote p { font-family: 'Poppins', sans-serif; font-size: 15.5px; font-weight: 600; color: var(--accent2); line-height: 1.7; font-style: italic; margin: 0; }

  /* ═══ FAQ ═══ */
  .imp-faq-header { margin-bottom: 12px; }
  .imp-faq-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); background: var(--accent-lt); padding: 6px 16px; border-radius: 100px; }
  .imp-faq-title { font-family: 'Montserrat', sans-serif; font-size: clamp(24px, 4vw, 34px); font-weight: 900; color: var(--ink); letter-spacing: -0.02em; margin-bottom: 28px; margin-top: 16px; }
  .imp-faq-item { border: 1.5px solid var(--rule); border-radius: 6px; margin-bottom: 12px; overflow: hidden; background: var(--white); transition: border-color 0.2s; }
  .imp-faq-item.open { border-color: var(--accent); }
  .imp-faq-q { width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; text-align: left; gap: 16px; }
  .imp-faq-q-text { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600; color: var(--ink); line-height: 1.5; }
  .imp-faq-item.open .imp-faq-q-text { color: var(--accent); }
  .imp-faq-icon { font-size: 20px; font-weight: 700; color: var(--accent); flex-shrink: 0; line-height: 1; }
  .imp-faq-ans { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: var(--ink2); line-height: 1.85; padding: 0 24px; max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; }
  .imp-faq-ans.visible { max-height: 1000px; padding: 0 24px 22px; }
  .imp-faq-ans strong { color: var(--accent2); font-weight: 600; }

  @media (max-width: 700px) {
    .imp-body { padding: 48px 18px 72px; }
    .imp-hero-inner { padding: 0 18px; }
    .imp-intro-card { padding: 24px 20px; }
    .imp-faq-q { padding: 16px 18px; }
    .imp-faq-ans.visible { padding: 0 18px 18px; }
    .imp-hero-bar { gap: 12px; }
    .imp-hero-bar-item { flex: 1 1 120px; padding: 0 14px 0 0; margin-right: 14px; border-right: 1px solid rgba(255,255,255,0.08); }
    .imp-bar-label { font-size: 9px; letter-spacing: 0.12em; margin-bottom: 4px; }
    .imp-bar-value { font-size: 13px; }
    .imp-overline { font-size: 10px; letter-spacing: 0.16em; }
    .imp-hero-title { font-size: clamp(36px, 10vw, 56px); margin-bottom: 24px; }
    .imp-intro-card p { font-size: 15px; }
  }
`;

const faqs = [
  {
    q: "What is a mixture? What are its key characteristics?",
    a: (<>A <strong>mixture</strong> is a combination of two or more elements or compounds mixed together in any ratio, without forming a new compound.<br /><br />
      Key characteristics:<br />
      • Composition is <strong>variable</strong> — no fixed ratio of components.<br />
      • <strong>No new substance</strong> is formed; constituents retain their original properties.<br />
      • <strong>No fixed melting or boiling point</strong>.<br />
      • Components can be separated by <strong>physical methods</strong> (filtration, evaporation, etc.).<br />
      • Examples: sea water, air, chocolate milk, alloys.</>),
  },
  {
    q: "What is the difference between homogeneous and heterogeneous mixtures?",
    a: (<><strong>Homogeneous mixtures</strong> have a uniform composition throughout — they exist as a single phase with no visible boundary between components. Examples: sugar solution, vinegar, salt water, alloys.<br /><br />
      <strong>Heterogeneous mixtures</strong> have more than one phase. The components are not uniformly distributed and there is a <strong>visible boundary of separation</strong>. Examples: sand + sugar, chalk in water, smoke in air.<br /><br />
      Each type has three subtypes: solid, liquid, and gaseous. For example, alloys are solid homogeneous mixtures; milk is a liquid heterogeneous mixture (emulsion).</>),
  },
  {
    q: "What is a solution? What are its properties?",
    a: (<>A <strong>solution</strong> is a homogeneous mixture of two or more substances.<br /><br />
      Components:<br />
      • <strong>Solvent</strong> — the component present in larger amount that dissolves the other (e.g., water in salt water).<br />
      • <strong>Solute</strong> — the component present in smaller amount that gets dissolved (e.g., salt in salt water).<br /><br />
      Properties of a solution:<br />
      • Homogeneous mixture with <strong>uniform composition</strong>.<br />
      • Particles are <strong>extremely small</strong> (&lt;1 nm) — not visible to the naked eye.<br />
      • <strong>Light path not visible</strong> (no Tyndall effect).<br />
      • Solute <strong>cannot be separated by filtration</strong> — particles pass through filter paper.</>),
  },
  {
    q: "What are the different ways to express the concentration of a solution?",
    a: (<>Concentration tells us how much solute is present in a given amount of solution. Methods:<br /><br />
      • <strong>Mass % (w/w)</strong> = (Mass of component ÷ Total mass of solution) × 100<br />
      • <strong>Volume % (v/v)</strong> = (Volume of component ÷ Total volume of solution) × 100<br />
      • <strong>Mass by volume % (w/v)</strong> = (Mass of solute ÷ Total volume of solution) × 100<br />
      • <strong>Parts per million (ppm)</strong> = (Parts of component ÷ Total parts of all components) × 10⁶<br />
      • <strong>Mole fraction (x)</strong> = Moles of component ÷ Total moles of all components (sum of all mole fractions = 1)<br />
      • <strong>Molarity (M)</strong> = Moles of solute ÷ Volume of solution in litres<br />
      • <strong>Molality (m)</strong> = Moles of solute ÷ Mass of solvent in kg</>),
  },
  {
    q: "What is a suspension? How is it different from a solution?",
    a: (<>A <strong>suspension</strong> is a heterogeneous mixture of a solid and a liquid, where solid particles are suspended in the liquid medium (e.g., sand in water, chalk in water).<br /><br />
      Differences from a solution:<br />
      • Suspension particles are <strong>visible to the naked eye</strong>; solution particles are not.<br />
      • Suspension particles <strong>settle down</strong> on standing; solution is stable.<br />
      • Light path <strong>is visible</strong> in suspension; not in solution.<br />
      • Suspension can be separated by <strong>filtration</strong>; solution cannot.<br />
      • Suspension is <strong>heterogeneous</strong>; solution is homogeneous.</>),
  },
  {
    q: "What is a colloid? What is the Tyndall effect?",
    a: (<>A <strong>colloid</strong> is a type of mixture where one substance is dispersed evenly throughout another, but the particle size (1–100 nm) is intermediate — larger than a solution but smaller than a suspension.<br /><br />
      Properties:<br />
      • Heterogeneous mixture, but <strong>particles not visible</strong> to the naked eye.<br />
      • <strong>Light path visible</strong> (Tyndall effect).<br />
      • Particles do <strong>not settle down</strong> on standing.<br />
      • <strong>Cannot be separated by filtration</strong>.<br /><br />
      <strong>Tyndall effect</strong>: The scattering of a beam of light by colloidal particles. When a beam of light is passed through a colloid, the path of light becomes visible due to scattering. Example: milk, fog. This is how we see a beam of sunlight through a dusty room.</>),
  },
  {
    q: "How are colloids classified? Give examples.",
    a: (<>Colloids are classified based on the states of the <strong>dispersed phase</strong> and the <strong>dispersion medium</strong>:<br /><br />
      • <strong>Solid in liquid</strong> (Sol): Mud, milk of magnesia<br />
      • <strong>Liquid in liquid</strong> (Emulsion): Milk, cream<br />
      • <strong>Gas in liquid</strong> (Foam): Shaving cream<br />
      • <strong>Solid in solid</strong> (Solid sol): Coloured gemstone, ruby glass<br />
      • <strong>Liquid in solid</strong> (Gel): Cheese, jelly<br />
      • <strong>Gas in solid</strong> (Foam/solid): Sponge, foam rubber<br />
      • <strong>Solid in gas</strong> (Aerosol): Smoke, automobile exhaust<br />
      • <strong>Liquid in gas</strong> (Aerosol): Fog, cloud<br /><br />
      Also classified by interaction: <strong>hydrophilic</strong> (water-attracting) and <strong>hydrophobic</strong> (water-repelling) colloids.</>),
  },
  {
    q: "What are the main methods of separation and when are they used?",
    a: (<>Each method suits specific types of mixtures:<br /><br />
      • <strong>Evaporation</strong>: Volatile solvent + non-volatile solute (e.g., salt from seawater).<br />
      • <strong>Centrifugation</strong>: Cream from milk; blood cells from plasma in labs.<br />
      • <strong>Separating funnel</strong>: Immiscible liquids like oil and water; slag in iron extraction.<br />
      • <strong>Sublimation</strong>: Substances that sublime directly — ammonium chloride, camphor, naphthalene.<br />
      • <strong>Chromatography</strong>: Solutes that dissolve in the same solvent — separating dyes, pigments, drugs from blood.<br />
      • <strong>Distillation</strong>: Two miscible liquids with different boiling points (acetone + water).<br />
      • <strong>Fractional distillation</strong>: Boiling point difference &lt;25 K (petroleum products; liquid air into nitrogen, oxygen, etc.).<br />
      • <strong>Crystallisation</strong>: Purifying solids from solutions (copper sulphate, salt, alum).</>),
  },
  {
    q: "What is the difference between a physical change and a chemical change?",
    a: (<><strong>Physical change</strong>: Only the physical properties of a substance change. No new substance is formed, chemical composition stays the same, and most changes are reversible. Example: melting ice, dissolving sugar, cutting paper.<br /><br />
      <strong>Chemical change</strong>: The chemical composition of the substance changes. One or more new substances are formed with different properties. Most chemical changes are irreversible and always accompanied by a <strong>change in energy</strong>. Example: burning wood, rusting iron, cooking food.<br /><br />
      Key test: If new substance forms → chemical change. If only appearance/state changes → physical change.</>),
  },
  {
    q: "What is the difference between a mixture and a compound?",
    a: (<><strong>Mixture</strong>:<br />
      • Components mixed in any ratio; no new compound formed.<br />
      • Elements or compounds just mix — no chemical reaction.<br />
      • Properties of constituents remain unchanged.<br />
      • Can be separated by physical methods (filtration, distillation, etc.).<br /><br />
      <strong>Compound</strong>:<br />
      • Elements combine in a fixed definite proportion by a chemical reaction.<br />
      • A new substance with entirely new properties is formed.<br />
      • Cannot be separated by physical methods — requires chemical methods or electrolysis.<br /><br />
      Example: Air is a mixture (N₂ and O₂ in variable amounts); Water (H₂O) is a compound (H and O in fixed 2:1 ratio).</>),
  },
  {
    q: "What are elements and compounds? How are elements classified?",
    a: (<>An <strong>element</strong> is the basic form of matter that <strong>cannot be broken down into simpler substances</strong> by chemical reactions. Elements are the simplest pure substances. Examples: iron (Fe), oxygen (O), gold (Au), carbon (C).<br /><br />
      Elements are classified into four types:<br />
      • <strong>Metals</strong>: Lustrous, malleable, ductile, good conductors (iron, copper, gold).<br />
      • <strong>Non-metals</strong>: Brittle, poor conductors, usually gases or dull solids (oxygen, sulphur, carbon).<br />
      • <strong>Metalloids</strong>: Have properties of both metals and non-metals (silicon, germanium).<br />
      • <strong>Noble gases</strong>: Inert, extremely stable, do not react under normal conditions (helium, neon, argon).<br /><br />
      A <strong>compound</strong> is formed when two or more elements combine chemically in a <strong>fixed proportion</strong>. The properties of a compound are completely different from its constituent elements.</>),
  },
];

export default function IsMatterAroundUsPure() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="imp-root">

        {/* ══════ HERO ══════ */}
        <div className="imp-hero">
          <div className="imp-hero-grid" />
          <div className="imp-hero-ring" />
          <div className="imp-glow-a" />
          <div className="imp-glow-b" />
          <div className="imp-hero-bg-num">2</div>
          <div className="imp-hero-inner">
            <div className="imp-overline">Class 9 · Science · Chapter 2</div>
            <h1 className="imp-hero-title">
              Is Matter Around<br />
              <em>Us Pure?</em>
            </h1>
            <div className="imp-hero-bar">
              <div className="imp-hero-bar-item">
                <div className="imp-bar-label">Subject</div>
                <div className="imp-bar-value">Science — Chemistry</div>
              </div>
              <div className="imp-hero-bar-item">
                <div className="imp-bar-label">Topics</div>
                <div className="imp-bar-value">Mixtures · Solutions · Colloids</div>
              </div>
              <div className="imp-hero-bar-item">
                <div className="imp-bar-label">Board</div>
                <div className="imp-bar-value">CBSE · NCERT</div>
              </div>
              <div className="imp-hero-bar-item">
                <div className="imp-bar-label">FAQs</div>
                <div className="imp-bar-value">11 Questions</div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════ BODY ══════ */}
        <div className="imp-body">

          {/* Intro Card */}
          <div className="imp-intro-card">
            <p>
              Not everything around us is <strong>pure</strong>. Most substances we encounter daily — air, seawater, milk, alloys — are <strong>mixtures</strong>. This chapter explores how matter is classified, the types of mixtures, how solutions, suspensions, and colloids differ, how we separate mixtures, and what makes something a pure substance versus a compound.
            </p>
            <p>
              Understanding purity in chemistry forms the foundation of analytical science — from purifying medicines to separating petroleum products and testing blood in diagnostic labs.
            </p>
          </div>

          {/* ══ S1: Pure Substance vs Mixture ══ */}
          <div className="imp-sec-head">
            <div className="imp-sec-num">1</div>
            <div className="imp-sec-title-wrap">
              <div className="imp-sec-kicker">Classification</div>
              <h2 className="imp-sec-title">Pure Substance <span>vs Mixture</span></h2>
            </div>
          </div>
          <p className="imp-body-text">
            All matter can be broadly classified into <strong>pure substances</strong> (elements and compounds) and <strong>mixtures</strong>. A pure substance has a fixed composition and definite properties. A mixture consists of two or more substances combined in variable proportions.
          </p>

          <div className="imp-split-banner">
            <div className="imp-split-col">
              <div className="imp-split-tag">Mixture</div>
              <div className="imp-split-title">Mixed, Variable</div>
              {[
                { t: "Two or more substances combined in", b: "any ratio" },
                { t: "No fixed melting / boiling point", b: null },
                { t: "No new compound is formed", b: null },
                { t: "Constituents retain their own properties", b: null },
                { t: "Separated by physical methods", b: null },
                { t: "Examples: sea water, air, soil", b: null },
              ].map((p, i) => (
                <div className="imp-split-point" key={i}>
                  <div className="imp-split-dot" />
                  <span>{p.t}{p.b ? <> — <strong>{p.b}</strong></> : ""}</span>
                </div>
              ))}
            </div>
            <div className="imp-split-col">
              <div className="imp-split-tag">Pure Substance</div>
              <div className="imp-split-title" style={{color:"var(--teal)"}}>Fixed, Definite</div>
              {[
                { t: "Fixed composition and definite properties", b: null },
                { t: "Has a definite melting / boiling point", b: null },
                { t: "Cannot be separated by physical methods", b: null },
                { t: "Elements: simplest form, one type of atom", b: null },
                { t: "Compounds: fixed ratio of two or more elements", b: null },
                { t: "Examples: water, gold, sugar, NaCl", b: null },
              ].map((p, i) => (
                <div className="imp-split-point" key={i}>
                  <div className="imp-split-dot" />
                  <span>{p.t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Homo vs Hetero */}
          <div className="imp-mix-pair">
            <div className="imp-mix-card homo">
              <div className="imp-mix-hdr homo">
                <div className="imp-mix-hdr-tag">Type 1 · Single Phase</div>
                <div className="imp-mix-hdr-name">Homogeneous Mixture</div>
              </div>
              <div className="imp-mix-body">
                <div className="imp-mix-def"><strong>Same composition throughout</strong>. Only one phase — no visible line of separation between constituents. Also called a <strong>solution</strong> when liquid.</div>
                <div className="imp-mix-examples">
                  <span className="imp-mix-tag-pill">Sugar solution</span>
                  <span className="imp-mix-tag-pill">Vinegar</span>
                  <span className="imp-mix-tag-pill">Alloys</span>
                  <span className="imp-mix-tag-pill">Air</span>
                </div>
              </div>
            </div>
            <div className="imp-mix-card hetro">
              <div className="imp-mix-hdr hetro">
                <div className="imp-mix-hdr-tag">Type 2 · Multiple Phases</div>
                <div className="imp-mix-hdr-name">Heterogeneous Mixture</div>
              </div>
              <div className="imp-mix-body">
                <div className="imp-mix-def"><strong>Non-uniform composition</strong>. More than one phase with a <strong>visible boundary of separation</strong> between components.</div>
                <div className="imp-mix-examples">
                  <span className="imp-mix-tag-pill">Sand + sugar</span>
                  <span className="imp-mix-tag-pill">Chalk in water</span>
                  <span className="imp-mix-tag-pill">Smoke in air</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subtypes */}
          <p className="imp-body-text" style={{marginBottom:"14px"}}>Each type has three physical-state subtypes:</p>
          <div className="imp-subtype-grid">
            {[
              { cls: "homo-sub", icon: "🏗️", name: "Solid Homogeneous", ex: "Alloys (brass, bronze)" },
              { cls: "homo-sub", icon: "🫗",  name: "Liquid Homogeneous", ex: "Alcohol in water" },
              { cls: "homo-sub", icon: "🌬️", name: "Gas Homogeneous", ex: "Air (N₂ + O₂ + others)" },
              { cls: "hetro-sub", icon: "⚗️", name: "Solid Heterogeneous", ex: "Sand + sugar mixture" },
              { cls: "hetro-sub", icon: "🥛", name: "Solid-Liquid Hetero", ex: "Chalk in water" },
              { cls: "hetro-sub", icon: "💨", name: "Gaseous Heterogeneous", ex: "Smoke in air" },
            ].map((s, i) => (
              <div className={`imp-subtype-card ${s.cls}`} key={i}>
                <span className="imp-subtype-icon">{s.icon}</span>
                <div className="imp-subtype-name">{s.name}</div>
                <div className="imp-subtype-ex">{s.ex}</div>
              </div>
            ))}
          </div>

          {/* ══ S2: Solution ══ */}
          <div className="imp-divider"><div className="imp-divider-mark" /></div>
          <div className="imp-sec-head">
            <div className="imp-sec-num">2</div>
            <div className="imp-sec-title-wrap">
              <div className="imp-sec-kicker">Homogeneous Mixture</div>
              <h2 className="imp-sec-title">Solutions &amp; <span>Concentration</span></h2>
            </div>
          </div>
          <p className="imp-body-text">
            A <strong>solution</strong> is a homogeneous mixture of two or more substances. Every solution has a solvent and a solute, and its "strength" is described by its concentration.
          </p>

          <div className="imp-sol-split">
            <div className="imp-sol-half">
              <div className="imp-sol-hdr solvent">
                <div className="imp-sol-hdr-tag">Larger component · Dissolves the solute</div>
                <div className="imp-sol-hdr-name">🫙 Solvent</div>
              </div>
              <div className="imp-sol-body">
                The component present in <strong>larger amount</strong> that dissolves the other component. It determines the state of the solution. In salt water, <strong>water is the solvent</strong>.
              </div>
            </div>
            <div className="imp-sol-half">
              <div className="imp-sol-hdr solute">
                <div className="imp-sol-hdr-tag">Smaller component · Gets dissolved</div>
                <div className="imp-sol-hdr-name">🧂 Solute</div>
              </div>
              <div className="imp-sol-body">
                The component present in <strong>lesser quantity</strong> that dissolves in the solvent. In salt water, <strong>salt is the solute</strong>. It can be solid, liquid, or gas.
              </div>
            </div>
          </div>

          {/* Properties chips */}
          <p className="imp-body-text" style={{marginBottom:"14px"}}>Properties that identify a true solution:</p>
          <div className="imp-prop-row">
            {[
              { icon: "🔬", text: "Homogeneous throughout" },
              { icon: "👁️", text: "Particles not visible to naked eye" },
              { icon: "🔦", text: "Light path NOT visible" },
              { icon: "🪣", text: "Cannot separate by filtration" },
            ].map((p, i) => (
              <div className="imp-prop-chip" key={i}>
                <span className="imp-prop-chip-icon">{p.icon}</span>
                <div className="imp-prop-chip-text">{p.text}</div>
              </div>
            ))}
          </div>

          {/* Concentration formulas */}
          <p className="imp-body-text" style={{marginBottom:"14px"}}>Ways to express <strong>concentration of a solution</strong>:</p>
          <div className="imp-formula-grid">
            {[
              { label: "Mass % (w/w)", abbr: "Mass percentage", num: "Mass of component in solution × 100%", den: "Total mass of solution", mult: null },
              { label: "Volume % (v/v)", abbr: "Volume percentage", num: "Volume of component × 100%", den: "Total volume of solution", mult: null },
              { label: "Mass by Volume % (w/v)", abbr: "Weight / volume", num: "Mass of solute × 100%", den: "Total volume of solution", mult: null },
              { label: "Parts per Million", abbr: "ppm", num: "Parts of component × 10⁶", den: "Total parts of all components", mult: null },
              { label: "Mole Fraction (x)", abbr: "Σ mole fractions = 1", num: "Moles of component", den: "Total moles of all components", mult: null },
              { label: "Molarity (M)", abbr: "mol / L of solution", num: "Moles of solute", den: "Volume of solution in litres", mult: null },
            ].map((f, i) => (
              <div className="imp-formula-card" key={i}>
                <div className="imp-formula-label">{f.label}</div>
                <div className="imp-formula-abbr">{f.abbr}</div>
                <div className="imp-formula-frac-row">
                  <div className="imp-formula-frac">
                    <div className="imp-formula-num">{f.num}</div>
                    <div className="imp-formula-den">{f.den}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ══ S3: Solution vs Suspension vs Colloid ══ */}
          <div className="imp-divider"><div className="imp-divider-mark" /></div>
          <div className="imp-sec-head">
            <div className="imp-sec-num">3</div>
            <div className="imp-sec-title-wrap">
              <div className="imp-sec-kicker">Types of Mixtures</div>
              <h2 className="imp-sec-title">Solution · Suspension · <span>Colloid</span></h2>
            </div>
          </div>
          <p className="imp-body-text">
            Based on particle size and the visibility of components, liquid mixtures are classified into three types: solutions, suspensions, and colloids.
          </p>

          <div className="imp-three-compare">
            <div className="imp-three-hdr">
              <div className="imp-three-hdr-cell">Property</div>
              <div className="imp-three-hdr-cell">🫗 Solution</div>
              <div className="imp-three-hdr-cell">🌊 Suspension</div>
              <div className="imp-three-hdr-cell">🥛 Colloid</div>
            </div>
            {[
              ["Mixture type", "Homogeneous", "Heterogeneous", "Heterogeneous"],
              ["Particle size", "<1 nm", ">100 nm", "1–100 nm"],
              ["Visible to eye", "no", "yes", "no"],
              ["Tyndall effect", "no", "yes", "yes"],
              ["Settles down", "no", "yes", "no"],
              ["Filterable", "no", "yes", "no"],
              ["Example", "Salt water", "Sand+water", "Milk, fog"],
            ].map(([prop, s, su, c]) => (
              <div className="imp-three-row" key={prop}>
                <div className="imp-three-cell">{prop}</div>
                <div className={`imp-three-cell ${s === "no" ? "no" : s === "yes" ? "yes" : ""}`}>{s}</div>
                <div className={`imp-three-cell ${su === "no" ? "no" : su === "yes" ? "yes" : ""}`}>{su}</div>
                <div className={`imp-three-cell ${c === "no" ? "no" : c === "yes" ? "yes" : ""}`}>{c}</div>
              </div>
            ))}
          </div>

          {/* Colloid types table */}
          <div className="imp-colloid-section-label">Colloid Classification — Dispersed Phase × Dispersion Medium</div>
          <div className="imp-colloid-table">
            <div className="imp-colloid-hdr">
              <div className="imp-colloid-hdr-cell">Dispersion Medium ↓</div>
              <div className="imp-colloid-hdr-cell">Dispersed: Solid</div>
              <div className="imp-colloid-hdr-cell">Dispersed: Liquid</div>
              <div className="imp-colloid-hdr-cell">Dispersed: Gas</div>
            </div>
            {[
              ["Solid", "Solid sol (ruby glass)", "Gel (cheese, jelly)", "Foam (sponge, rubber)"],
              ["Liquid", "Sol (mud, milk of mag.)", "Emulsion (milk, cream)", "Foam (shaving cream)"],
              ["Gas", "Aerosol (smoke, exhaust)", "Aerosol (fog, cloud)", "All gases miscible"],
            ].map(([med, s, l, g]) => (
              <div className="imp-colloid-row" key={med}>
                <div className="imp-colloid-cell">{med}</div>
                <div className="imp-colloid-cell">{s}</div>
                <div className="imp-colloid-cell">{l}</div>
                <div className="imp-colloid-cell">{g}</div>
              </div>
            ))}
          </div>

          {/* Tyndall effect callout */}
          <div className="imp-tyndall">
            <div className="imp-tyndall-icon">🔦</div>
            <div>
              <div className="imp-tyndall-title">The Tyndall Effect</div>
              <div className="imp-tyndall-text">
                When a beam of light passes through a colloid, the <strong>colloidal particles scatter the light</strong>, making the path of the beam visible. This is called the Tyndall effect. It is seen in <strong>milk, fog, and smoke</strong> — but not in true solutions, where particles are too small to scatter light. This is also why a beam of sunlight appears visible through a dusty room.
              </div>
            </div>
          </div>

          {/* ══ S4: Separation Methods ══ */}
          <div className="imp-divider"><div className="imp-divider-mark" /></div>
          <div className="imp-sec-head">
            <div className="imp-sec-num">4</div>
            <div className="imp-sec-title-wrap">
              <div className="imp-sec-kicker">Techniques</div>
              <h2 className="imp-sec-title">Methods of <span>Separation</span></h2>
            </div>
          </div>
          <p className="imp-body-text">
            Mixtures can be separated using physical methods that exploit differences in physical properties — boiling point, solubility, density, particle size, or the ability to sublime.
          </p>

          <div className="imp-sep-list">
            {[
              { cls: "evap",   icon: "♨️",  name: "Evaporation",          desc: <>Used to separate a <strong>volatile solvent from a non-volatile solute</strong>. When the solution is heated, the solvent evaporates leaving the solute behind. <span className="imp-sep-use">Use: salt from seawater</span></> },
              { cls: "centri", icon: "🌀",  name: "Centrifugation",        desc: <>Based on the principle of <strong>density differences</strong>. The centrifuge spins the mixture at high speed, causing denser particles to settle. <span className="imp-sep-use">Use: cream from milk, blood tests, urine tests</span></> },
              { cls: "funnel", icon: "🫙",  name: "Separating Funnel",     desc: <>Used to separate <strong>immiscible liquids</strong> that form two distinct layers. The denser liquid settles at the bottom and is drained. <span className="imp-sep-use">Use: oil and water, slag in iron extraction</span></> },
              { cls: "subli",  icon: "🌫️", name: "Sublimation",            desc: <>Used when one component can <strong>sublime directly from solid to gas</strong> on heating. The vapour is collected and condensed elsewhere. <span className="imp-sep-use">Use: ammonium chloride, camphor, naphthalene, anthracene</span></> },
              { cls: "chrom",  icon: "🎨",  name: "Chromatography",        desc: <>Separates solutes that <strong>dissolve in the same solvent</strong> based on their different rates of movement on a stationary phase. <span className="imp-sep-use">Use: colours in dye, pigments, drugs from blood</span></> },
              { cls: "distil", icon: "⚗️",  name: "Distillation",          desc: <>Separates two <strong>miscible liquids with different boiling points</strong> by heating then condensing the vapours. <span className="imp-sep-use">Use: acetone + water, purifying water</span></> },
              { cls: "fdist",  icon: "🛢️",  name: "Fractional Distillation",desc: <>Used when the <strong>boiling point difference is less than 25 K</strong>. A fractionating column allows gradual separation. <span className="imp-sep-use">Use: petroleum refining, separating air into N₂, O₂, Ar</span></> },
              { cls: "cryst",  icon: "💎",  name: "Crystallisation",       desc: <>Separates pure solids from a solution by <strong>forming crystals on slow cooling</strong>. Impurities remain in solution. <span className="imp-sep-use">Use: purifying salt, copper sulphate, alum</span></> },
            ].map((s, i) => (
              <div className="imp-sep-item" key={i}>
                <div className={`imp-sep-method ${s.cls}`}>
                  <span className="imp-sep-method-icon">{s.icon}</span>
                  <div className="imp-sep-method-name">{s.name}</div>
                </div>
                <div className="imp-sep-desc">{s.desc}</div>
              </div>
            ))}
          </div>

          {/* ══ S5: Physical vs Chemical Change ══ */}
          <div className="imp-divider"><div className="imp-divider-mark" /></div>
          <div className="imp-sec-head">
            <div className="imp-sec-num">5</div>
            <div className="imp-sec-title-wrap">
              <div className="imp-sec-kicker">Types of Change</div>
              <h2 className="imp-sec-title">Physical vs <span>Chemical Change</span></h2>
            </div>
          </div>
          <p className="imp-body-text">
            Changes in matter are of two kinds. <strong>Physical changes</strong> alter only appearance or state; <strong>chemical changes</strong> alter the chemical composition to produce entirely new substances.
          </p>

          <div className="imp-change-box">
            <div className="imp-change-card">
              <div className="imp-change-hdr-cell">
                <div className="imp-change-hdr-dot" />
                Physical Change
              </div>
              <div className="imp-change-col">
                {[
                  "Change in physical properties only — shape, size, state",
                  "No new substance formed",
                  "Chemical composition stays the same",
                  "Usually reversible (e.g., melting, dissolving)",
                  "No energy change required",
                  "Examples: cutting paper, melting ice, boiling water",
                ].map((t, i) => (
                  <div className="imp-change-row" key={i}>
                    <div className="imp-change-dot" />
                    <div className="imp-change-text">{t}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="imp-change-card">
              <div className="imp-change-hdr-cell">
                <div className="imp-change-hdr-dot" />
                Chemical Change
              </div>
              <div className="imp-change-col">
                {[
                  "Change in chemical composition of the substance",
                  "One or more new substances formed",
                  "Chemical composition is different from original",
                  "Usually irreversible (e.g., burning, rusting)",
                  "Always accompanied by an energy change",
                  "Examples: burning wood, rusting iron, cooking",
                ].map((t, i) => (
                  <div className="imp-change-row" key={i}>
                    <div className="imp-change-dot" />
                    <div className="imp-change-text">{t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mixture vs Compound */}
          <p className="imp-body-text" style={{marginTop:"28px"}}>Closely related distinction — <strong>mixture vs compound</strong>:</p>
          <div className="imp-mc-table">
            <div className="imp-mc-hdr">
              <div className="imp-mc-hdr-cell">🫗 Mixture</div>
              <div className="imp-mc-hdr-cell">⚗️ Compound</div>
            </div>
            {[
              ["No new compound formed", "New compound is formed"],
              ["Elements or compounds just mix", "Elements react chemically"],
              ["Properties of constituents unchanged", "New substance has totally new properties"],
              ["Any ratio of mixing", "Fixed ratio (by mass)"],
              ["Separated by physical methods", "Separated only by chemical methods / electrolysis"],
            ].map(([m, c], i) => (
              <div className="imp-mc-row" key={i}>
                <div className="imp-mc-cell">{m}</div>
                <div className="imp-mc-cell">{c}</div>
              </div>
            ))}
          </div>

          {/* ══ S6: Elements & Compounds ══ */}
          <div className="imp-divider"><div className="imp-divider-mark" /></div>
          <div className="imp-sec-head">
            <div className="imp-sec-num">6</div>
            <div className="imp-sec-title-wrap">
              <div className="imp-sec-kicker">Pure Substances</div>
              <h2 className="imp-sec-title">Elements &amp; <span>Compounds</span></h2>
            </div>
          </div>

          <div className="imp-elem-intro">
            <p>A <strong>pure substance</strong> can be classified as either an element or a compound. Elements are the simplest — they cannot be broken down further by chemical reactions. Compounds are formed when two or more elements combine in a <strong>fixed chemical proportion</strong>.</p>
          </div>

          <p className="imp-body-text" style={{marginBottom:"14px"}}>Elements are classified into four categories:</p>
          <div className="imp-elem-grid">
            {[
              { icon: "🔩", name: "Metals",       ex: "Iron, copper, gold, silver — lustrous, malleable, ductile, conductors" },
              { icon: "🌑", name: "Non-metals",   ex: "Oxygen, carbon, sulphur — brittle, insulators, usually dull" },
              { icon: "🔲", name: "Metalloids",   ex: "Silicon, germanium — properties of both metals and non-metals" },
              { icon: "🫧", name: "Noble Gases",  ex: "Helium, neon, argon — inert, extremely stable, do not react" },
            ].map((e, i) => (
              <div className="imp-elem-card" key={i}>
                <span className="imp-elem-icon">{e.icon}</span>
                <div className="imp-elem-name">{e.name}</div>
                <div className="imp-elem-ex">{e.ex}</div>
              </div>
            ))}
          </div>

          <div className="imp-pull-quote">
            <p>"Pure chemistry begins with recognising what is pure. Most everyday substances are mixtures — and the power to separate and purify them underpins everything from medicine to metallurgy to environmental science."</p>
          </div>

          {/* ══ FAQ ══ */}
          <div className="imp-divider"><div className="imp-divider-mark" /></div>
          <div className="imp-faq-header"><span className="imp-faq-kicker">Exam Preparation</span></div>
          <h2 className="imp-faq-title">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div className={`imp-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="imp-faq-q" onClick={() => toggle(i)}>
                <span className="imp-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="imp-faq-icon">{openIndex === i ? "▴" : "▾"}</span>
              </button>
              <div className={`imp-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
