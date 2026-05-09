import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #0c1a2e;
    --ink2:       #1a2d45;
    --muted:      #4a6080;
    --paper:      #f2f7fd;
    --paper2:     #e2eef9;
    --accent:     #1565c0;
    --accent2:    #0d47a1;
    --accent-lt:  #ddeeff;
    --teal:       #00838f;
    --teal-lt:    #e0f7fa;
    --purple:     #6a1b9a;
    --purple-lt:  #f3e5f5;
    --orange:     #e65100;
    --orange-lt:  #fff3e0;
    --red:        #b71c1c;
    --red-lt:     #ffebee;
    --green:      #1b5e20;
    --green-lt:   #e8f5e9;
    --rule:       #b8d0e8;
    --white:      #ffffff;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .mis-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  /* ═══ HERO — deep midnight-ocean blue ═══ */
  .mis-hero {
    background: linear-gradient(135deg, #020d1a 0%, #041830 50%, #062040 100%);
    min-height: 88vh; display: flex; align-items: flex-end;
    position: relative; overflow: hidden; padding: 0 0 64px;
  }
  @media (max-width: 700px) {
    .mis-hero { min-height: auto; align-items: flex-start; padding: 72px 0 48px; }
  }
  .mis-hero::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #1565c0 0%, #00838f 40%, #6a1b9a 100%);
  }
  /* Particle / atom dot grid */
  .mis-hero-dots {
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(21,101,192,0.18) 1px, transparent 1px);
    background-size: 30px 30px; pointer-events: none;
  }
  /* Atom ring watermark */
  .mis-hero-atom {
    position: absolute; top: 50%; right: 5%; transform: translateY(-50%);
    width: clamp(130px, 20vw, 260px); height: clamp(130px, 20vw, 260px);
    border-radius: 50%; border: 1.5px solid rgba(21,101,192,0.15); pointer-events: none;
  }
  .mis-hero-atom::before {
    content: ''; position: absolute; inset: 20%; border-radius: 50%;
    border: 1.5px dashed rgba(0,131,143,0.15);
  }
  .mis-hero-atom::after {
    content: ''; position: absolute; inset: 42%; border-radius: 50%;
    background: rgba(21,101,192,0.08);
  }
  /* Glow blob */
  .mis-hero-glow {
    position: absolute; top: 20%; left: 8%; width: 260px; height: 260px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(21,101,192,0.18) 0%, transparent 68%);
    pointer-events: none;
  }
  .mis-hero-glow2 {
    position: absolute; bottom: 10%; right: 20%; width: 180px; height: 180px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,131,143,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  /* Background chapter number */
  .mis-hero-bg-num {
    position: absolute; bottom: -80px; right: -20px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(200px, 34vw, 480px); font-weight: 900;
    line-height: 1; color: rgba(255,255,255,0.02);
    letter-spacing: -0.04em; user-select: none; pointer-events: none;
  }
  .mis-hero-inner { max-width: 900px; width: 100%; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
  .mis-overline {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; color: #64b5f6;
    margin-bottom: 24px; display: flex; align-items: center; gap: 14px;
  }
  .mis-overline::before, .mis-overline::after { content: ''; flex: 0 0 40px; height: 1px; background: #64b5f6; }
  .mis-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(34px, 7vw, 76px); font-weight: 900; color: #fff;
    line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 32px;
  }
  .mis-hero-title em   { font-style: normal; color: #64b5f6; }
  .mis-hero-title .em2 { color: #80deea; }
  .mis-hero-bar { display: flex; flex-wrap: wrap; gap: 0; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; margin-top: 8px; }
  .mis-hero-bar-item { flex: 1 1 150px; padding: 0 24px 0 0; border-right: 1px solid rgba(255,255,255,0.08); margin-right: 24px; }
  .mis-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .mis-bar-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 5px; }
  .mis-bar-value { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.72); }

  /* ═══ BODY ═══ */
  .mis-body { max-width: 860px; margin: 0 auto; padding: 72px 32px 96px; }

  /* ═══ INTRO CARD ═══ */
  .mis-intro-card {
    background: linear-gradient(135deg, #020d1a 0%, #062040 100%);
    border-left: 5px solid #1565c0; border-radius: 4px; padding: 36px 40px;
    margin-bottom: 64px; position: relative; overflow: hidden;
  }
  .mis-intro-card::after { content: '⚛️'; position: absolute; right: 28px; top: 50%; transform: translateY(-50%); font-size: 88px; opacity: 0.08; }
  .mis-intro-card p { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 500; color: rgba(255,255,255,0.86); line-height: 1.8; margin: 0 0 14px; }
  .mis-intro-card p:last-child { margin: 0; }
  .mis-intro-card strong { color: #64b5f6; }

  /* ═══ SECTION DIVIDER ═══ */
  .mis-divider { margin: 56px 0; display: flex; align-items: center; gap: 16px; }
  .mis-divider::before, .mis-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .mis-divider-mark { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

  /* ═══ SECTION HEADER ═══ */
  .mis-sec-head { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 32px; border-bottom: 2px solid var(--rule); padding-bottom: 18px; }
  .mis-sec-num { font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900; color: var(--rule); line-height: 1; flex-shrink: 0; }
  .mis-sec-title-wrap { padding-top: 8px; }
  .mis-sec-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .mis-sec-title { font-family: 'Montserrat', sans-serif; font-size: clamp(20px, 3.5vw, 30px); font-weight: 800; color: var(--ink); line-height: 1.15; letter-spacing: -0.02em; }
  .mis-sec-title span { color: var(--accent); }

  /* ═══ BODY TEXT ═══ */
  .mis-body-text { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; color: var(--ink2); line-height: 1.85; margin-bottom: 28px; }
  .mis-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ═══ S1: CHARACTERISTICS — 4-property cards ═══ */
  .mis-char-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 32px; }
  @media (max-width: 580px) { .mis-char-grid { grid-template-columns: 1fr; } }
  .mis-char-card {
    background: var(--white); border: 1.5px solid var(--rule); border-radius: 8px; padding: 22px 20px;
    border-top: 4px solid var(--accent); position: relative; overflow: hidden;
  }
  .mis-char-card:nth-child(2) { border-top-color: var(--teal); }
  .mis-char-card:nth-child(3) { border-top-color: var(--orange); }
  .mis-char-card:nth-child(4) { border-top-color: var(--purple); }
  .mis-char-icon { font-size: 30px; margin-bottom: 10px; display: block; }
  .mis-char-title { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: var(--accent); margin-bottom: 6px; }
  .mis-char-card:nth-child(2) .mis-char-title { color: var(--teal); }
  .mis-char-card:nth-child(3) .mis-char-title { color: var(--orange); }
  .mis-char-card:nth-child(4) .mis-char-title { color: var(--purple); }
  .mis-char-text { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); line-height: 1.7; }
  .mis-char-text strong { font-weight: 600; color: var(--ink); }

  /* ═══ S2: STATES — 3-column comparison table ═══ */
  .mis-states-table { border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; margin-bottom: 32px; }
  .mis-states-hdr { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; }
  .mis-states-hdr-cell {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    padding: 14px 16px; color: #fff;
  }
  .mis-states-hdr-cell:nth-child(1) { background: var(--ink2); }
  .mis-states-hdr-cell:nth-child(2) { background: #1565c0; }
  .mis-states-hdr-cell:nth-child(3) { background: #00838f; }
  .mis-states-hdr-cell:nth-child(4) { background: #4527a0; }
  .mis-states-row { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; border-top: 1px solid var(--rule); }
  .mis-states-row:nth-child(even) { background: var(--paper2); }
  .mis-states-cell {
    font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2);
    padding: 11px 16px; border-right: 1px solid var(--rule); line-height: 1.55;
  }
  .mis-states-cell:first-child { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ink); font-size: 12px; }
  .mis-states-cell:last-child { border-right: none; }
  .mis-states-cell.yes { color: var(--green); font-weight: 600; }
  .mis-states-cell.no { color: var(--red); font-weight: 600; }
  @media (max-width: 640px) {
    .mis-states-hdr, .mis-states-row { grid-template-columns: 1.2fr 0.9fr 0.9fr 0.9fr; }
    .mis-states-cell { font-size: 11px; padding: 9px 10px; }
    .mis-states-hdr-cell { font-size: 9px; padding: 12px 10px; }
  }

  /* ═══ S2: State blocks — big visual 3-col ═══ */
  .mis-state-trio { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 32px; }
  @media (max-width: 580px) { .mis-state-trio { grid-template-columns: 1fr; } }
  .mis-state-block { border-radius: 8px; overflow: hidden; border: 1.5px solid var(--rule); }
  .mis-state-block-hdr { padding: 16px 18px; }
  .mis-state-block-hdr.solid   { background: linear-gradient(135deg, #0d2a52, #1565c0); }
  .mis-state-block-hdr.liquid  { background: linear-gradient(135deg, #00474f, #00838f); }
  .mis-state-block-hdr.gas     { background: linear-gradient(135deg, #2e1065, #6a1b9a); }
  .mis-state-emoji { font-size: 28px; display: block; margin-bottom: 6px; }
  .mis-state-name { font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 900; color: #fff; letter-spacing: -0.01em; }
  .mis-state-body { padding: 14px 16px; background: var(--white); }
  .mis-state-prop { font-family: 'Inter', sans-serif; font-size: 12.5px; color: var(--ink2); line-height: 1.65; padding: 4px 0; border-bottom: 1px solid var(--rule); }
  .mis-state-prop:last-child { border-bottom: none; }
  .mis-state-prop::before { content: '›'; margin-right: 7px; font-weight: 700; color: var(--accent); }
  .mis-state-block.liquid .mis-state-prop::before { color: var(--teal); }
  .mis-state-block.gas    .mis-state-prop::before { color: var(--purple); }

  /* ═══ S3: SPECIAL STATES — Plasma & BEC side-by-side ═══ */
  .mis-special-split { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 32px; }
  @media (max-width: 560px) { .mis-special-split { grid-template-columns: 1fr; } }
  .mis-special-card { border-radius: 8px; overflow: hidden; border: 1.5px solid var(--rule); }
  .mis-special-hdr.plasma { background: linear-gradient(135deg, #b71c00, #e53935); padding: 18px 20px; }
  .mis-special-hdr.bec    { background: linear-gradient(135deg, #01579b, #0288d1); padding: 18px 20px; }
  .mis-special-tag { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.55); margin-bottom: 3px; }
  .mis-special-title { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; color: #fff; }
  .mis-special-body { padding: 18px 20px; background: var(--white); }
  .mis-special-item { display: flex; gap: 10px; align-items: flex-start; padding: 6px 0; border-bottom: 1px solid var(--rule); }
  .mis-special-item:last-child { border-bottom: none; }
  .mis-special-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
  .plasma .mis-special-dot { background: #e53935; }
  .bec    .mis-special-dot { background: #0288d1; }
  .mis-special-text { font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.65; }
  .mis-special-text strong { color: var(--ink); font-weight: 600; }

  /* ═══ S4: CHANGE OF STATE — arrow flow ═══ */
  .mis-flow-box {
    background: var(--ink); border-radius: 8px; padding: 28px 32px; margin-bottom: 28px;
    position: relative; overflow: hidden;
  }
  .mis-flow-box::before {
    content: ''; position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(100,181,246,0.06) 1px, transparent 1px);
    background-size: 24px 24px; pointer-events: none;
  }
  .mis-flow-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(100,181,246,0.6); margin-bottom: 20px; }
  .mis-flow-row { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
  .mis-flow-state {
    font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 900;
    color: #fff; background: rgba(255,255,255,0.08); padding: 10px 20px; border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.12); white-space: nowrap;
  }
  .mis-flow-arrow-wrap { display: flex; flex-direction: column; align-items: center; min-width: 70px; }
  .mis-flow-arrow-name { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.5); text-align: center; margin-bottom: 2px; letter-spacing: 0.04em; }
  .mis-flow-arrow-sym { font-size: 18px; color: #64b5f6; font-weight: 700; }
  .mis-flow-rev { color: #80deea; }
  .mis-flow-sub-label { font-family: 'Inter', sans-serif; font-size: 11px; color: rgba(255,255,255,0.35); text-align: center; }
  .mis-flow-note { margin-top: 16px; font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.6; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 14px; }
  .mis-flow-note strong { color: rgba(100,181,246,0.85); font-weight: 600; }

  /* ═══ S4: Term definition cards ═══ */
  .mis-term-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 28px; }
  @media (max-width: 560px) { .mis-term-grid { grid-template-columns: 1fr; } }
  .mis-term-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 6px; padding: 18px 20px; border-left: 4px solid var(--accent); }
  .mis-term-card:nth-child(2) { border-left-color: var(--teal); }
  .mis-term-card:nth-child(3) { border-left-color: var(--orange); }
  .mis-term-card:nth-child(4) { border-left-color: var(--purple); }
  .mis-term-name { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: var(--accent); margin-bottom: 6px; }
  .mis-term-card:nth-child(2) .mis-term-name { color: var(--teal); }
  .mis-term-card:nth-child(3) .mis-term-name { color: var(--orange); }
  .mis-term-card:nth-child(4) .mis-term-name { color: var(--purple); }
  .mis-term-def { font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.7; }
  .mis-term-def strong { color: var(--ink); font-weight: 600; }

  /* ═══ S5: PRESSURE EFFECT — contrast split block ═══ */
  .mis-pressure-box {
    border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; margin-bottom: 28px;
  }
  .mis-pressure-top { background: linear-gradient(135deg, #0d2a52, #1565c0); padding: 16px 24px; }
  .mis-pressure-top-title { font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 900; color: #fff; display: flex; align-items: center; gap: 10px; }
  .mis-pressure-body { display: grid; grid-template-columns: 1fr 1fr; background: var(--white); }
  @media (max-width: 520px) { .mis-pressure-body { grid-template-columns: 1fr; } }
  .mis-pressure-col { padding: 20px 22px; }
  .mis-pressure-col:last-child { border-left: 1px solid var(--rule); }
  @media (max-width: 520px) { .mis-pressure-col:last-child { border-left: none; border-top: 1px solid var(--rule); } }
  .mis-pressure-col-title { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 12px; }
  .mis-pressure-col:first-child .mis-pressure-col-title { color: var(--accent); }
  .mis-pressure-col:last-child  .mis-pressure-col-title { color: var(--teal); }
  .mis-pressure-item { display: flex; align-items: flex-start; gap: 10px; padding: 7px 0; border-bottom: 1px solid var(--rule); }
  .mis-pressure-item:last-child { border-bottom: none; }
  .mis-pressure-badge { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; padding: 2px 10px; border-radius: 100px; white-space: nowrap; flex-shrink: 0; }
  .mis-pressure-badge.down { background: var(--red-lt); color: var(--red); }
  .mis-pressure-badge.up   { background: var(--green-lt); color: var(--green); }
  .mis-pressure-item-text { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2); line-height: 1.6; }

  /* Dry Ice special callout */
  .mis-dry-ice { background: var(--paper2); border: 1.5px solid var(--rule); border-radius: 6px; padding: 16px 22px; margin-bottom: 28px; display: flex; align-items: center; gap: 16px; }
  .mis-dry-ice-icon { font-size: 36px; flex-shrink: 0; }
  .mis-dry-ice-text { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); line-height: 1.65; }
  .mis-dry-ice-text strong { color: var(--accent2); font-weight: 600; }

  /* ═══ S6: EVAPORATION — factor strips ═══ */
  .mis-evap-intro { background: var(--teal-lt); border-left: 5px solid var(--teal); border-radius: 0 6px 6px 0; padding: 20px 26px; margin-bottom: 28px; }
  .mis-evap-intro p { font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 600; color: var(--teal); line-height: 1.7; margin: 0; }
  .mis-evap-intro p strong { color: #004d50; }

  .mis-factor-list { margin-bottom: 32px; }
  .mis-factor-item {
    display: grid; grid-template-columns: 200px 1fr; align-items: stretch;
    border: 1.5px solid var(--rule); border-radius: 6px; overflow: hidden; margin-bottom: 10px; background: var(--white);
  }
  @media (max-width: 560px) { .mis-factor-item { grid-template-columns: 1fr; } }
  .mis-factor-label {
    padding: 16px 18px; display: flex; align-items: center; gap: 10px;
  }
  .mis-factor-label.up   { background: var(--green-lt); }
  .mis-factor-label.down { background: var(--red-lt); }
  .mis-factor-emoji { font-size: 22px; flex-shrink: 0; }
  .mis-factor-name { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; }
  .mis-factor-label.up   .mis-factor-name { color: var(--green); }
  .mis-factor-label.down .mis-factor-name { color: var(--red); }
  .mis-factor-arrow { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; }
  .mis-factor-label.up   .mis-factor-arrow { color: var(--green); }
  .mis-factor-label.down .mis-factor-arrow { color: var(--red); }
  .mis-factor-desc { padding: 16px 20px; font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.65; border-left: 1px solid var(--rule); }
  @media (max-width: 560px) { .mis-factor-desc { border-left: none; border-top: 1px solid var(--rule); } }
  .mis-factor-desc strong { color: var(--accent2); font-weight: 600; }

  /* Cooling effect callout */
  .mis-cooling { background: linear-gradient(135deg, #020d1a 0%, #041830 100%); border-radius: 8px; padding: 28px 32px; margin-bottom: 28px; display: flex; align-items: center; gap: 24px; }
  @media (max-width: 560px) { .mis-cooling { flex-direction: column; text-align: center; } }
  .mis-cooling-icon { font-size: 54px; flex-shrink: 0; }
  .mis-cooling-content {}
  .mis-cooling-title { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; color: #fff; margin-bottom: 8px; letter-spacing: -0.01em; }
  .mis-cooling-text { font-family: 'Inter', sans-serif; font-size: 14px; color: rgba(255,255,255,0.72); line-height: 1.75; }
  .mis-cooling-text strong { color: #64b5f6; font-weight: 600; }

  /* ═══ PULL QUOTE ═══ */
  .mis-pull-quote { border-left: 5px solid var(--accent); background: var(--accent-lt); padding: 20px 28px; margin: 28px 0; border-radius: 0 4px 4px 0; }
  .mis-pull-quote p { font-family: 'Poppins', sans-serif; font-size: 15.5px; font-weight: 600; color: var(--accent2); line-height: 1.7; font-style: italic; margin: 0; }

  /* ═══ FAQ ═══ */
  .mis-faq-header { margin-bottom: 12px; }
  .mis-faq-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); background: var(--accent-lt); padding: 6px 16px; border-radius: 100px; }
  .mis-faq-title { font-family: 'Montserrat', sans-serif; font-size: clamp(24px, 4vw, 34px); font-weight: 900; color: var(--ink); letter-spacing: -0.02em; margin-bottom: 28px; margin-top: 16px; }
  .mis-faq-item { border: 1.5px solid var(--rule); border-radius: 6px; margin-bottom: 12px; overflow: hidden; background: var(--white); transition: border-color 0.2s; }
  .mis-faq-item.open { border-color: var(--accent); }
  .mis-faq-q { width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; text-align: left; gap: 16px; }
  .mis-faq-q-text { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600; color: var(--ink); line-height: 1.5; }
  .mis-faq-item.open .mis-faq-q-text { color: var(--accent); }
  .mis-faq-icon { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 700; color: var(--accent); flex-shrink: 0; line-height: 1; }
  .mis-faq-ans { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: var(--ink2); line-height: 1.85; padding: 0 24px; max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; }
  .mis-faq-ans.visible { max-height: 1000px; padding: 0 24px 22px; }
  .mis-faq-ans strong { color: var(--accent2); font-weight: 600; }

  @media (max-width: 700px) {
    .mis-body { padding: 48px 18px 72px; }
    .mis-hero-inner { padding: 0 18px; }
    .mis-intro-card { padding: 24px 20px; }
    .mis-flow-box { padding: 20px 18px; }
    .mis-faq-q { padding: 16px 18px; }
    .mis-faq-ans.visible { padding: 0 18px 18px; }
    .mis-hero-bar { gap: 12px; }
    .mis-hero-bar-item { flex: 1 1 120px; padding: 0 14px 0 0; margin-right: 14px; }
    .mis-bar-label { font-size: 9px; letter-spacing: 0.12em; margin-bottom: 4px; }
    .mis-bar-value { font-size: 13px; }
    .mis-overline { font-size: 10px; letter-spacing: 0.16em; }
    .mis-hero-title { font-size: clamp(36px, 10vw, 56px); margin-bottom: 24px; }
    .mis-intro-card p { font-size: 15px; }
  }
`;

const faqs = [
  {
    q: "What is matter? What are its basic characteristics?",
    a: (<><strong>Matter</strong> is anything that occupies space and has mass. Everything around us — air, water, rocks, living things — is made of matter.<br /><br />
      Key characteristics of matter particles:<br />
      • <strong>Spaces between particles</strong> — Matter is not continuous; there are tiny gaps between particles.<br />
      • <strong>Constant motion</strong> — Particles move continuously; the movement increases with rising temperature.<br />
      • <strong>Mutual attraction</strong> — Particles attract each other. This force is strongest in solids, weaker in liquids, and weakest in gases.<br />
      • <strong>Atoms and molecules</strong> — Atoms are the smallest units that combine to form molecules, the building blocks of matter.</>),
  },
  {
    q: "What are the five states of matter?",
    a: (<>The five states of matter are:<br /><br />
      1. <strong>Solid</strong> — Definite shape, definite volume, rigid, negligible compressibility.<br />
      2. <strong>Liquid</strong> — No fixed shape but fixed volume, slightly compressible, can flow.<br />
      3. <strong>Gas</strong> — No fixed shape or volume, highly compressible, exerts pressure, rapid particle motion.<br />
      4. <strong>Plasma</strong> — Super-energetic ionised particles, no definite shape or volume; most common state in the universe (e.g., stars, lightning).<br />
      5. <strong>Bose-Einstein Condensate (BEC)</strong> — Formed by cooling an extremely low-density gas to near absolute zero; particles overlap and behave as one quantum entity; super-fluid and super-conductive.</>),
  },
  {
    q: "What is the difference between solids, liquids, and gases in terms of intermolecular forces and compressibility?",
    a: (<><strong>Intermolecular attraction</strong> decreases in the order: Solids &gt; Liquids &gt; Gases.<br /><br />
      • <strong>Solids</strong> — Very strong forces hold particles in fixed positions. Cannot be compressed; rigid with definite shape.<br />
      • <strong>Liquids</strong> — Moderate forces allow particles to move past each other. Slightly compressible; no fixed shape but fixed volume.<br />
      • <strong>Gases</strong> — Very weak forces; particles are far apart and move freely. Highly compressible; no fixed shape or volume.<br /><br />
      The compressibility order is: Gases &gt;&gt; Liquids &gt; Solids.</>),
  },
  {
    q: "What is the change of state? What role does heat play?",
    a: (<>A <strong>change of state</strong> occurs when a substance transitions from one physical state to another (e.g., solid → liquid → gas).<br /><br />
      Heat energy is the driving force: when heat is absorbed, it <strong>breaks the intermolecular forces of attraction</strong>, allowing particles to move more freely. The kinetic energy of particles increases.<br /><br />
      • <strong>Solid → Liquid</strong>: Melting (at melting point)<br />
      • <strong>Liquid → Gas</strong>: Vaporisation/Boiling (at boiling point)<br />
      • <strong>Solid → Gas directly</strong>: Sublimation (e.g., ammonium chloride, dry ice)<br />
      The reverse processes release heat: condensation, freezing, and deposition.</>),
  },
  {
    q: "What is melting point and latent heat?",
    a: (<><strong>Melting point</strong> is the temperature at which a solid changes into a liquid at normal atmospheric pressure. At this point, temperature remains <strong>constant</strong> until all the solid has melted — the absorbed heat is used only to break intermolecular bonds, not to raise temperature.<br /><br />
      <strong>Latent heat</strong> is the heat energy required to change the state of 1 kg of a substance at its transition temperature without any change in temperature. It is "hidden" within the material during a change of state.<br /><br />
      There are two types:<br />
      • <strong>Latent heat of fusion</strong> — heat needed to melt 1 kg of solid to liquid.<br />
      • <strong>Latent heat of vaporisation</strong> — heat needed to convert 1 kg of liquid to gas.</>),
  },
  {
    q: "What is sublimation? Give examples.",
    a: (<><strong>Sublimation</strong> is the direct conversion of a solid into a gas (or gas to solid) without passing through the liquid state.<br /><br />
      Examples:<br />
      • <strong>Ammonium chloride (NH₄Cl)</strong> — directly converts from solid to gas on heating.<br />
      • <strong>Dry Ice (solid CO₂)</strong> — directly converts to carbon dioxide gas at room temperature without melting.<br />
      • Camphor and naphthalene also sublime.<br /><br />
      Sublimation occurs because, at certain pressures, a substance can go directly from the solid phase to the vapour phase without the intermediate liquid phase becoming stable.</>),
  },
  {
    q: "How does pressure affect the melting point and boiling point of a substance?",
    a: (<>Pressure has opposite effects on melting point and boiling point:<br /><br />
      • <strong>Melting point decreases</strong> when pressure increases — Higher pressure makes it easier for a solid to become a liquid by reducing the space between particles.<br />
      • <strong>Boiling point increases</strong> when pressure increases — Higher pressure requires more energy (higher temperature) for liquid particles to escape into the gas phase.<br /><br />
      This is why water boils at less than 100°C on high mountains (lower atmospheric pressure) and at more than 100°C in a pressure cooker (higher pressure).</>),
  },
  {
    q: "What is evaporation? How is it different from boiling?",
    a: (<><strong>Evaporation</strong> is the conversion of a liquid into vapour at any temperature <strong>below its boiling point</strong>. It is a surface phenomenon — only the particles at the surface with enough kinetic energy escape into the gas phase.<br /><br />
      <strong>Differences from boiling:</strong><br />
      • Evaporation occurs at <strong>any temperature</strong>; boiling occurs only at the boiling point.<br />
      • Evaporation is a <strong>surface phenomenon</strong>; boiling happens throughout the liquid.<br />
      • Evaporation is slow and gradual; boiling is rapid and vigorous.<br />
      • Evaporation causes <strong>cooling</strong>; boiling does not produce a cooling effect on the surroundings.</>),
  },
  {
    q: "What are the factors affecting the rate of evaporation?",
    a: (<>Four key factors affect evaporation rate:<br /><br />
      1. <strong>Surface area</strong> — Larger surface area → faster evaporation (more particles exposed at the surface).<br />
      2. <strong>Temperature</strong> — Higher temperature → faster evaporation (particles have more kinetic energy).<br />
      3. <strong>Humidity</strong> — Higher humidity → slower evaporation (air is already saturated with water vapour, reducing net evaporation).<br />
      4. <strong>Wind speed</strong> — Higher wind speed → faster evaporation (wind removes vapour from the surface, maintaining a concentration gradient).<br /><br />
      This is why wet clothes dry faster on a hot, windy, low-humidity day spread out flat.</>),
  },
  {
    q: "Why does evaporation cause cooling?",
    a: (<>Evaporation causes cooling because the process requires <strong>latent heat</strong>. The particles that evaporate take this heat energy from the surface or the body they are in contact with, thereby <strong>lowering the temperature</strong> of the remaining liquid and the surface.<br /><br />
      Examples:<br />
      • We feel cool after sweating — sweat evaporates from our skin, taking body heat with it.<br />
      • Earthen pots (matkas) keep water cool — water seeps through the pores of the pot and evaporates, cooling the remaining water inside.<br />
      • Applying spirit on the skin feels cool — spirit is volatile and evaporates quickly, absorbing heat from the skin.</>),
  },
];

export default function MatterInOurSurroundings() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="mis-root">

        {/* ══════════════ HERO ══════════════ */}
        <div className="mis-hero">
          <div className="mis-hero-dots" />
          <div className="mis-hero-atom" />
          <div className="mis-hero-glow" />
          <div className="mis-hero-glow2" />
          <div className="mis-hero-bg-num">1</div>
          <div className="mis-hero-inner">
            <div className="mis-overline">Class 9 · Science · Chapter 1</div>
            <h1 className="mis-hero-title">
              Matter in Our<br />
              <em>Surroundings</em>
            </h1>
            <div className="mis-hero-bar">
              <div className="mis-hero-bar-item">
                <div className="mis-bar-label">Subject</div>
                <div className="mis-bar-value">Science — Chemistry</div>
              </div>
              <div className="mis-hero-bar-item">
                <div className="mis-bar-label">Topics</div>
                <div className="mis-bar-value">States · Changes · Evaporation</div>
              </div>
              <div className="mis-hero-bar-item">
                <div className="mis-bar-label">Board</div>
                <div className="mis-bar-value">CBSE · NCERT</div>
              </div>
              <div className="mis-hero-bar-item">
                <div className="mis-bar-label">FAQs</div>
                <div className="mis-bar-value">10 Questions</div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════ BODY ══════════════ */}
        <div className="mis-body">

          {/* Lead Intro */}
          <div className="mis-intro-card">
            <p>
              <strong>Everything in the universe is made of matter</strong> — from the air we breathe to the stars in the sky. Matter is defined as anything that has <strong>mass and occupies space</strong>. This chapter explores the physical nature of matter, its different states, the transitions between them, and the fascinating phenomenon of evaporation.
            </p>
            <p>
              Understanding matter at the particle level — how particles are arranged, how they move, and how they interact — unlocks the science behind everyday observations like why ice melts, why sweat cools us, and why pressure cookers cook food faster.
            </p>
          </div>

          {/* ══ S1: Characteristics of Matter Particles ══ */}
          <div className="mis-sec-head">
            <div className="mis-sec-num">1</div>
            <div className="mis-sec-title-wrap">
              <div className="mis-sec-kicker">Particle Nature</div>
              <h2 className="mis-sec-title">Characteristics of <span>Matter Particles</span></h2>
            </div>
          </div>
          <p className="mis-body-text">
            Matter is <strong>not continuous</strong> — it is made up of tiny particles (atoms and molecules). These particles have four fundamental properties that explain all physical behaviour of matter:
          </p>

          <div className="mis-char-grid">
            <div className="mis-char-card">
              <span className="mis-char-icon">🔬</span>
              <div className="mis-char-title">Atoms &amp; Molecules</div>
              <div className="mis-char-text"><strong>Atoms</strong> are the smallest possible units of matter. They combine to form <strong>molecules</strong>, which are the structural building blocks of all substances.</div>
            </div>
            <div className="mis-char-card">
              <span className="mis-char-icon">🌌</span>
              <div className="mis-char-title">Spaces Between Particles</div>
              <div className="mis-char-text">There are <strong>inter-particle spaces</strong> between matter particles. These spaces are largest in gases and smallest in solids — explaining diffusion and compressibility.</div>
            </div>
            <div className="mis-char-card">
              <span className="mis-char-icon">⚡</span>
              <div className="mis-char-title">Continuous Motion</div>
              <div className="mis-char-text">Particles are in <strong>constant random motion</strong>. This kinetic energy increases with temperature — which is why substances diffuse faster and evaporate quicker when heated.</div>
            </div>
            <div className="mis-char-card">
              <span className="mis-char-icon">🧲</span>
              <div className="mis-char-title">Intermolecular Attraction</div>
              <div className="mis-char-text">Particles <strong>attract each other</strong>. This force is <strong>highest in solids &gt; liquids &gt; gases</strong> — holding particles together and giving each state its unique properties.</div>
            </div>
          </div>

          {/* ══ S2: States of Matter ══ */}
          <div className="mis-divider"><div className="mis-divider-mark" /></div>
          <div className="mis-sec-head">
            <div className="mis-sec-num">2</div>
            <div className="mis-sec-title-wrap">
              <div className="mis-sec-kicker">Physical States</div>
              <h2 className="mis-sec-title">The Three Common <span>States of Matter</span></h2>
            </div>
          </div>
          <p className="mis-body-text">
            Matter commonly exists in <strong>three states</strong> — solid, liquid, and gas — each defined by how strongly particles are bound and how freely they move. Two exotic states (plasma and BEC) exist under extreme conditions.
          </p>

          <div className="mis-state-trio">
            <div className="mis-state-block solid">
              <div className="mis-state-block-hdr solid">
                <span className="mis-state-emoji">🧊</span>
                <div className="mis-state-name">Solid</div>
              </div>
              <div className="mis-state-body">
                <div className="mis-state-prop">Definite shape &amp; volume</div>
                <div className="mis-state-prop">Rigid — cannot flow</div>
                <div className="mis-state-prop">Cannot be compressed</div>
                <div className="mis-state-prop">Very strong attraction</div>
                <div className="mis-state-prop">Does not diffuse easily</div>
                <div className="mis-state-prop">Minimal particle motion</div>
              </div>
            </div>
            <div className="mis-state-block liquid">
              <div className="mis-state-block-hdr liquid">
                <span className="mis-state-emoji">💧</span>
                <div className="mis-state-name">Liquid</div>
              </div>
              <div className="mis-state-body">
                <div className="mis-state-prop">No fixed shape</div>
                <div className="mis-state-prop">Definite volume</div>
                <div className="mis-state-prop">Slightly compressible</div>
                <div className="mis-state-prop">Moderate attraction</div>
                <div className="mis-state-prop">Can diffuse in liquids</div>
                <div className="mis-state-prop">Moderate particle motion</div>
              </div>
            </div>
            <div className="mis-state-block gas">
              <div className="mis-state-block-hdr gas">
                <span className="mis-state-emoji">💨</span>
                <div className="mis-state-name">Gas</div>
              </div>
              <div className="mis-state-body">
                <div className="mis-state-prop">No fixed shape or volume</div>
                <div className="mis-state-prop">Highly compressible</div>
                <div className="mis-state-prop">Exerts pressure</div>
                <div className="mis-state-prop">Weakest attraction</div>
                <div className="mis-state-prop">Diffuses readily</div>
                <div className="mis-state-prop">High particle motion</div>
              </div>
            </div>
          </div>

          {/* Comparison table */}
          <div className="mis-states-table">
            <div className="mis-states-hdr">
              <div className="mis-states-hdr-cell">Property</div>
              <div className="mis-states-hdr-cell">🧊 Solid</div>
              <div className="mis-states-hdr-cell">💧 Liquid</div>
              <div className="mis-states-hdr-cell">💨 Gas</div>
            </div>
            {[
              ["Definite Shape", "yes", "no", "no"],
              ["Definite Volume", "yes", "yes", "no"],
              ["Compressibility", "no", "slight", "yes"],
              ["Rigidity", "yes", "no", "no"],
              ["Diffusion", "no", "slight", "yes"],
            ].map(([prop, s, l, g]) => (
              <div className="mis-states-row" key={prop}>
                <div className="mis-states-cell">{prop}</div>
                <div className={`mis-states-cell ${s === "yes" ? "yes" : s === "no" ? "no" : ""}`}>{s === "yes" ? "✔ Yes" : s === "no" ? "✘ No" : s}</div>
                <div className={`mis-states-cell ${l === "yes" ? "yes" : l === "no" ? "no" : ""}`}>{l === "yes" ? "✔ Yes" : l === "no" ? "✘ No" : l}</div>
                <div className={`mis-states-cell ${g === "yes" ? "yes" : g === "no" ? "no" : ""}`}>{g === "yes" ? "✔ Yes" : g === "no" ? "✘ No" : g}</div>
              </div>
            ))}
          </div>

          {/* ══ S3: Plasma & BEC ══ */}
          <div className="mis-divider"><div className="mis-divider-mark" /></div>
          <div className="mis-sec-head">
            <div className="mis-sec-num">3</div>
            <div className="mis-sec-title-wrap">
              <div className="mis-sec-kicker">Exotic States</div>
              <h2 className="mis-sec-title">Plasma &amp; <span>Bose-Einstein Condensate</span></h2>
            </div>
          </div>
          <p className="mis-body-text">
            Beyond the familiar three states, matter can exist in two extreme forms under extraordinary conditions of energy or temperature:
          </p>

          <div className="mis-special-split">
            <div className="mis-special-card">
              <div className="mis-special-hdr plasma">
                <div className="mis-special-tag">4th State · Extreme Heat</div>
                <div className="mis-special-title">🔥 Plasma</div>
              </div>
              <div className="mis-special-body plasma">
                {[
                  { text: "Super-energetic and super-excited particles (ionised gas)", key: "p1" },
                  { text: "No definite shape and volume", key: "p2" },
                  { text: "Most common state of matter in the universe (stars, lightning)", key: "p3" },
                  { text: "Influenced by electric and magnetic fields", key: "p4" },
                  { text: "Neon signs and fluorescent lamps contain plasma", key: "p5" },
                ].map(item => (
                  <div className="mis-special-item" key={item.key}>
                    <div className="mis-special-dot" />
                    <div className="mis-special-text">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mis-special-card">
              <div className="mis-special-hdr bec">
                <div className="mis-special-tag">5th State · Near Absolute Zero</div>
                <div className="mis-special-title">🧪 Bose-Einstein Condensate</div>
              </div>
              <div className="mis-special-body bec">
                {[
                  { text: "Super-unenergetic and super-cooled particles", key: "b1" },
                  { text: "Formed by cooling an extremely low-density gas to near 0 K", key: "b2" },
                  { text: "Particles overlap and behave as a single quantum entity", key: "b3" },
                  { text: "Super-fluid (flows without viscosity) and super-conductive", key: "b4" },
                  { text: "Predicted by Bose & Einstein; confirmed in 1995", key: "b5" },
                ].map(item => (
                  <div className="mis-special-item" key={item.key}>
                    <div className="mis-special-dot" />
                    <div className="mis-special-text">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══ S4: Change of State ══ */}
          <div className="mis-divider"><div className="mis-divider-mark" /></div>
          <div className="mis-sec-head">
            <div className="mis-sec-num">4</div>
            <div className="mis-sec-title-wrap">
              <div className="mis-sec-kicker">Interconversion</div>
              <h2 className="mis-sec-title">Change of <span>State</span></h2>
            </div>
          </div>
          <p className="mis-body-text">
            Matter can change from one state to another when <strong>heat energy is added or removed</strong>. The heat breaks or reforms intermolecular bonds, changing the arrangement and motion of particles. Temperature remains <strong>constant during a change of state</strong> as energy goes into the transition, not into raising temperature.
          </p>

          {/* Flow diagram */}
          <div className="mis-flow-box">
            <div className="mis-flow-label">⬦ State Transition Flow Diagram</div>
            <div className="mis-flow-row">
              <div className="mis-flow-state">🧊 Solid</div>
              <div className="mis-flow-arrow-wrap">
                <div className="mis-flow-arrow-name">Melting</div>
                <div className="mis-flow-arrow-sym">→</div>
                <div className="mis-flow-sub-label">[Heat added]</div>
              </div>
              <div className="mis-flow-state">💧 Liquid</div>
              <div className="mis-flow-arrow-wrap">
                <div className="mis-flow-arrow-name">Vaporisation</div>
                <div className="mis-flow-arrow-sym">→</div>
                <div className="mis-flow-sub-label">[Heat added]</div>
              </div>
              <div className="mis-flow-state">💨 Gas</div>
            </div>
            <div className="mis-flow-row">
              <div className="mis-flow-state">🧊 Solid</div>
              <div className="mis-flow-arrow-wrap">
                <div className="mis-flow-arrow-name">Freezing</div>
                <div className="mis-flow-arrow-sym mis-flow-rev">←</div>
                <div className="mis-flow-sub-label">[Heat removed]</div>
              </div>
              <div className="mis-flow-state">💧 Liquid</div>
              <div className="mis-flow-arrow-wrap">
                <div className="mis-flow-arrow-name">Condensation</div>
                <div className="mis-flow-arrow-sym mis-flow-rev">←</div>
                <div className="mis-flow-sub-label">[Heat removed]</div>
              </div>
              <div className="mis-flow-state">💨 Gas</div>
            </div>
            <div className="mis-flow-row">
              <div className="mis-flow-state">🧊 Solid</div>
              <div className="mis-flow-arrow-wrap">
                <div className="mis-flow-arrow-name">Sublimation ↔ Deposition</div>
                <div className="mis-flow-arrow-sym" style={{color:"#80deea"}}>⟷</div>
                <div className="mis-flow-sub-label">[Direct conversion]</div>
              </div>
              <div className="mis-flow-state">💨 Gas</div>
            </div>
            <div className="mis-flow-note">
              <strong>Key principle:</strong> During any change of state, temperature stays constant. Heat absorbed (or released) at this stage is the <strong>latent heat</strong> — used entirely to overcome (or form) intermolecular bonds, not to raise kinetic energy.
            </div>
          </div>

          {/* Term definition cards */}
          <div className="mis-term-grid">
            <div className="mis-term-card">
              <div className="mis-term-name">Melting Point</div>
              <div className="mis-term-def">Temperature at which a solid melts into a liquid at <strong>normal atmospheric pressure</strong>. Remains constant until all solid converts to liquid.</div>
            </div>
            <div className="mis-term-card">
              <div className="mis-term-name">Latent Heat</div>
              <div className="mis-term-def">Heat required to change state of <strong>1 kg</strong> of material at transition temperature without changing temperature. Stored within the material.</div>
            </div>
            <div className="mis-term-card">
              <div className="mis-term-name">Sublimation</div>
              <div className="mis-term-def">Direct conversion of <strong>solid → gas</strong> (or gas → solid) without passing through liquid state. Example: Ammonium chloride, camphor.</div>
            </div>
            <div className="mis-term-card">
              <div className="mis-term-name">Dry Ice</div>
              <div className="mis-term-def"><strong>Solid CO₂</strong> that directly converts to gaseous CO₂ at room temperature — a classic sublimation example used in cooling and special effects.</div>
            </div>
          </div>

          {/* ══ S5: Effect of Pressure ══ */}
          <div className="mis-divider"><div className="mis-divider-mark" /></div>
          <div className="mis-sec-head">
            <div className="mis-sec-num">5</div>
            <div className="mis-sec-title-wrap">
              <div className="mis-sec-kicker">External Conditions</div>
              <h2 className="mis-sec-title">Effect of Change of <span>Pressure</span></h2>
            </div>
          </div>
          <p className="mis-body-text">
            Pressure, like temperature, can change the state of matter. Applying or reducing pressure shifts the conditions needed for phase transitions, making substances melt or boil at different temperatures.
          </p>

          <div className="mis-pressure-box">
            <div className="mis-pressure-top">
              <div className="mis-pressure-top-title">🔩 When pressure is applied to a substance…</div>
            </div>
            <div className="mis-pressure-body">
              <div className="mis-pressure-col">
                <div className="mis-pressure-col-title">Effect on Melting Point</div>
                <div className="mis-pressure-item">
                  <span className="mis-pressure-badge down">↓ Decreases</span>
                  <div className="mis-pressure-item-text">Increased pressure forces particles closer, making it easier for solids to melt. Higher pressure → lower melting point.</div>
                </div>
                <div className="mis-pressure-item">
                  <span className="mis-pressure-badge down">↓ Example</span>
                  <div className="mis-pressure-item-text">Ice under pressure from a skate blade melts, providing lubrication — one reason ice skating works.</div>
                </div>
              </div>
              <div className="mis-pressure-col">
                <div className="mis-pressure-col-title">Effect on Boiling Point</div>
                <div className="mis-pressure-item">
                  <span className="mis-pressure-badge up">↑ Increases</span>
                  <div className="mis-pressure-item-text">More pressure means more energy (higher temperature) needed for liquid particles to escape into gas phase.</div>
                </div>
                <div className="mis-pressure-item">
                  <span className="mis-pressure-badge up">↑ Example</span>
                  <div className="mis-pressure-item-text">A pressure cooker raises the boiling point of water above 100°C, cooking food faster and at higher temperatures.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mis-dry-ice">
            <div className="mis-dry-ice-icon">🧊</div>
            <div className="mis-dry-ice-text">
              <strong>Dry Ice (Solid CO₂)</strong> directly converts to gaseous carbon dioxide at room temperature and atmospheric pressure — a real-world example of sublimation. It is widely used in refrigeration, fog effects in theatres, and food preservation.
            </div>
          </div>

          {/* ══ S6: Evaporation ══ */}
          <div className="mis-divider"><div className="mis-divider-mark" /></div>
          <div className="mis-sec-head">
            <div className="mis-sec-num">6</div>
            <div className="mis-sec-title-wrap">
              <div className="mis-sec-kicker">Surface Phenomenon</div>
              <h2 className="mis-sec-title">Evaporation &amp; Its <span>Factors</span></h2>
            </div>
          </div>

          <div className="mis-evap-intro">
            <p><strong>Evaporation</strong> is the conversion of a liquid into vapour at <strong>any temperature below its boiling point</strong>. Unlike boiling (bulk phenomenon), evaporation is a <strong>surface phenomenon</strong> — only the highest-energy particles at the surface escape into the gas phase.</p>
          </div>

          <p className="mis-body-text">Four factors control how quickly a liquid evaporates:</p>

          <div className="mis-factor-list">
            <div className="mis-factor-item">
              <div className="mis-factor-label up">
                <span className="mis-factor-emoji">📐</span>
                <div>
                  <div className="mis-factor-name">Surface Area</div>
                  <div className="mis-factor-arrow">↑ Increases rate</div>
                </div>
              </div>
              <div className="mis-factor-desc">A <strong>larger surface area</strong> exposes more liquid particles to the air. Clothes spread flat dry faster than crumpled ones; a wide plate lets water evaporate quicker than a tall glass.</div>
            </div>
            <div className="mis-factor-item">
              <div className="mis-factor-label up">
                <span className="mis-factor-emoji">🌡️</span>
                <div>
                  <div className="mis-factor-name">Temperature</div>
                  <div className="mis-factor-arrow">↑ Increases rate</div>
                </div>
              </div>
              <div className="mis-factor-desc"><strong>Higher temperature</strong> gives particles more kinetic energy, so more particles at the surface have enough energy to escape into the vapour phase. Wet clothes dry faster in summer heat.</div>
            </div>
            <div className="mis-factor-item">
              <div className="mis-factor-label down">
                <span className="mis-factor-emoji">💦</span>
                <div>
                  <div className="mis-factor-name">Humidity</div>
                  <div className="mis-factor-arrow">↑ Decreases rate</div>
                </div>
              </div>
              <div className="mis-factor-desc"><strong>Higher humidity</strong> means the air already contains more water vapour, reducing the concentration gradient that drives evaporation. Clothes take much longer to dry on humid monsoon days.</div>
            </div>
            <div className="mis-factor-item">
              <div className="mis-factor-label up">
                <span className="mis-factor-emoji">🌬️</span>
                <div>
                  <div className="mis-factor-name">Wind Speed</div>
                  <div className="mis-factor-arrow">↑ Increases rate</div>
                </div>
              </div>
              <div className="mis-factor-desc"><strong>Higher wind speed</strong> continuously removes vapour from the surface, maintaining a large concentration difference between the surface and the air, driving faster evaporation. A fan speeds up drying.</div>
            </div>
          </div>

          {/* Evaporation causes cooling */}
          <div className="mis-cooling">
            <div className="mis-cooling-icon">❄️</div>
            <div className="mis-cooling-content">
              <div className="mis-cooling-title">Evaporation Causes Cooling</div>
              <div className="mis-cooling-text">
                Evaporating particles take <strong>latent heat from the surface</strong> they leave behind, reducing its temperature. This is why we feel cool after sweating — evaporating sweat draws heat from the skin. Earthen pots (matkas) keep water cool because water seeps through pores and evaporates, taking heat with it.
              </div>
            </div>
          </div>

          <div className="mis-pull-quote">
            <p>"Evaporation is nature's cooling mechanism — the same principle that drives sweat cooling, earthen pots, and refrigeration. When particles escape as vapour, they carry energy away, leaving the rest cooler."</p>
          </div>

          {/* ══ FAQ ══ */}
          <div className="mis-divider"><div className="mis-divider-mark" /></div>
          <div className="mis-faq-header"><span className="mis-faq-kicker">Exam Preparation</span></div>
          <h2 className="mis-faq-title">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div className={`mis-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="mis-faq-q" onClick={() => toggle(i)}>
                <span className="mis-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="mis-faq-icon">{openIndex === i ? "▴" : "▾"}</span>
              </button>
              <div className={`mis-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
