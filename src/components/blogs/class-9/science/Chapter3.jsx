import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #0a0a1a;
    --ink2:       #1a1a2e;
    --muted:      #4a4a7a;
    --paper:      #f4f3ff;
    --paper2:     #e8e6ff;
    --accent:     #5b21b6;
    --accent2:    #4c1d95;
    --accent-lt:  #ede9fe;
    --violet:     #7c3aed;
    --teal:       #0e7490;
    --teal-lt:    #cffafe;
    --green:      #15803d;
    --green-lt:   #dcfce7;
    --orange:     #c2410c;
    --orange-lt:  #ffedd5;
    --pink:       #be185d;
    --pink-lt:    #fce7f3;
    --gold:       #b45309;
    --gold-lt:    #fef3c7;
    --rule:       #c4b5fd;
    --white:      #ffffff;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .am-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  /* ═══ HERO — deep violet / indigo night ═══ */
  .am-hero {
    background: linear-gradient(135deg, #06020f 0%, #100520 50%, #180830 100%);
    min-height: 88vh; display: flex; align-items: flex-end;
    position: relative; overflow: hidden; padding: 0 0 64px;
  }
  @media (max-width: 700px) {
    .am-hero { min-height: auto; align-items: flex-start; padding: 72px 0 48px; }
  }
  .am-hero::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #5b21b6 0%, #0e7490 35%, #be185d 68%, #b45309 100%);
  }
  /* Atom orbit rings */
  .am-hero-orbit {
    position: absolute; top: 50%; right: 4%; transform: translateY(-50%);
    width: clamp(140px, 22vw, 290px); height: clamp(140px, 22vw, 290px);
    border-radius: 50%; border: 1px solid rgba(139,92,246,0.18); pointer-events: none;
  }
  .am-hero-orbit::before {
    content: ''; position: absolute; inset: 16%; border-radius: 50%;
    border: 1px dashed rgba(139,92,246,0.12);
  }
  .am-hero-orbit::after {
    content: ''; position: absolute; inset: 38%; border-radius: 50%;
    background: rgba(91,33,182,0.08);
    border: 1px solid rgba(139,92,246,0.1);
  }
  /* Dot grid */
  .am-hero-dots {
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(139,92,246,0.14) 1px, transparent 1px);
    background-size: 28px 28px; pointer-events: none;
  }
  /* Glows */
  .am-glow-a {
    position: absolute; top: 15%; left: 5%; width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(91,33,182,0.18) 0%, transparent 68%); pointer-events: none;
  }
  .am-glow-b {
    position: absolute; bottom: 8%; right: 18%; width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(14,116,144,0.12) 0%, transparent 70%); pointer-events: none;
  }
  .am-hero-bg-num {
    position: absolute; bottom: -80px; right: -20px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(200px, 34vw, 480px); font-weight: 900;
    line-height: 1; color: rgba(255,255,255,0.018);
    letter-spacing: -0.04em; user-select: none; pointer-events: none;
  }
  .am-hero-inner { max-width: 900px; width: 100%; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
  .am-overline {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; color: #c4b5fd;
    margin-bottom: 24px; display: flex; align-items: center; gap: 14px;
  }
  .am-overline::before, .am-overline::after { content: ''; flex: 0 0 40px; height: 1px; background: #c4b5fd; }
  .am-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(36px, 7.5vw, 78px); font-weight: 900; color: #fff;
    line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 32px;
  }
  .am-hero-title em   { font-style: normal; color: #c4b5fd; }
  .am-hero-title .em2 { color: #67e8f9; }
  .am-hero-bar { display: flex; flex-wrap: wrap; gap: 0; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; margin-top: 8px; }
  .am-hero-bar-item { flex: 1 1 150px; padding: 0 24px 0 0; border-right: 1px solid rgba(255,255,255,0.08); margin-right: 24px; }
  .am-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .am-bar-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 5px; }
  .am-bar-value { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.72); }

  /* ═══ BODY ═══ */
  .am-body { max-width: 860px; margin: 0 auto; padding: 72px 32px 96px; }

  /* ═══ INTRO CARD ═══ */
  .am-intro-card {
    background: linear-gradient(135deg, #06020f 0%, #180830 100%);
    border-left: 5px solid #5b21b6; border-radius: 4px; padding: 36px 40px;
    margin-bottom: 64px; position: relative; overflow: hidden;
  }
  .am-intro-card::after { content: '⚛️'; position: absolute; right: 28px; top: 50%; transform: translateY(-50%); font-size: 88px; opacity: 0.08; }
  .am-intro-card p { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 500; color: rgba(255,255,255,0.86); line-height: 1.8; margin: 0 0 14px; }
  .am-intro-card p:last-child { margin: 0; }
  .am-intro-card strong { color: #c4b5fd; }

  /* ═══ DIVIDER ═══ */
  .am-divider { margin: 56px 0; display: flex; align-items: center; gap: 16px; }
  .am-divider::before, .am-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .am-divider-mark { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

  /* ═══ SECTION HEADER ═══ */
  .am-sec-head { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 32px; border-bottom: 2px solid var(--rule); padding-bottom: 18px; }
  .am-sec-num { font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900; color: var(--rule); line-height: 1; flex-shrink: 0; }
  .am-sec-title-wrap { padding-top: 8px; }
  .am-sec-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .am-sec-title { font-family: 'Montserrat', sans-serif; font-size: clamp(20px, 3.5vw, 30px); font-weight: 800; color: var(--ink); line-height: 1.15; letter-spacing: -0.02em; }
  .am-sec-title span { color: var(--accent); }

  /* ═══ BODY TEXT ═══ */
  .am-body-text { font-family: 'Inter', sans-serif; font-size: 16px; color: var(--ink2); line-height: 1.85; margin-bottom: 28px; }
  .am-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ═══ S1: DALTON — 3 postulate cards ═══ */
  .am-dalton-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 32px; }
  @media (max-width: 600px) { .am-dalton-grid { grid-template-columns: 1fr; } }
  .am-dalton-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; }
  .am-dalton-card-hdr { padding: 14px 18px; display: flex; align-items: center; gap: 12px; }
  .am-dalton-card:nth-child(1) .am-dalton-card-hdr { background: linear-gradient(135deg, #180830, #5b21b6); }
  .am-dalton-card:nth-child(2) .am-dalton-card-hdr { background: linear-gradient(135deg, #00293a, #0e7490); }
  .am-dalton-card:nth-child(3) .am-dalton-card-hdr { background: linear-gradient(135deg, #2a0018, #be185d); }
  .am-dalton-num { font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900; color: rgba(255,255,255,0.18); line-height: 1; }
  .am-dalton-hdr-text { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: #fff; }
  .am-dalton-body { padding: 16px 18px; font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.7; }
  .am-dalton-body strong { font-weight: 600; color: var(--ink); }

  /* ═══ S2: LAWS — two law blocks side by side ═══ */
  .am-law-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 32px; }
  @media (max-width: 560px) { .am-law-pair { grid-template-columns: 1fr; } }
  .am-law-card { border-radius: 8px; overflow: hidden; border: 1.5px solid var(--rule); }
  .am-law-hdr.conserv { background: linear-gradient(135deg, #180830, #5b21b6); padding: 18px 20px; }
  .am-law-hdr.constprop { background: linear-gradient(135deg, #003020, #15803d); padding: 18px 20px; }
  .am-law-tag  { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 4px; }
  .am-law-name { font-family: 'Montserrat', sans-serif; font-size: 17px; font-weight: 900; color: #fff; line-height: 1.2; }
  .am-law-body { padding: 18px 20px; background: var(--white); font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.75; }
  .am-law-body strong { font-weight: 600; color: var(--ink); }
  .am-law-formula { margin-top: 12px; background: var(--paper2); border-radius: 6px; padding: 10px 14px; font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600; color: var(--accent2); text-align: center; }

  /* ═══ S3: ATOM — property strip ═══ */
  .am-atom-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 28px; }
  @media (max-width: 580px) { .am-atom-strip { grid-template-columns: 1fr; } }
  .am-atom-chip { background: var(--white); border: 1.5px solid var(--rule); border-radius: 6px; padding: 16px 16px; border-left: 4px solid var(--accent); }
  .am-atom-chip:nth-child(2) { border-left-color: var(--teal); }
  .am-atom-chip:nth-child(3) { border-left-color: var(--pink); }
  .am-atom-chip-icon { font-size: 24px; margin-bottom: 8px; display: block; }
  .am-atom-chip-title { font-family: 'Poppins', sans-serif; font-size: 12.5px; font-weight: 700; color: var(--accent); margin-bottom: 5px; }
  .am-atom-chip:nth-child(2) .am-atom-chip-title { color: var(--teal); }
  .am-atom-chip:nth-child(3) .am-atom-chip-title { color: var(--pink); }
  .am-atom-chip-text { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2); line-height: 1.65; }
  .am-atom-chip-text strong { font-weight: 600; color: var(--ink); }

  /* Symbol box */
  .am-symbol-box { background: linear-gradient(135deg, #06020f, #180830); border-radius: 8px; padding: 24px 28px; margin-bottom: 28px; }
  .am-symbol-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(196,181,253,0.6); margin-bottom: 16px; }
  .am-symbol-row { display: flex; flex-wrap: wrap; gap: 10px; }
  .am-symbol-pill { background: rgba(255,255,255,0.06); border: 1px solid rgba(196,181,253,0.2); border-radius: 6px; padding: 8px 14px; display: flex; align-items: center; gap: 10px; }
  .am-symbol-el { font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 900; color: #c4b5fd; min-width: 28px; }
  .am-symbol-name { font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.55); }

  /* ═══ S4: ATOMIC MASS — definition cards ═══ */
  .am-mass-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 28px; }
  @media (max-width: 540px) { .am-mass-grid { grid-template-columns: 1fr; } }
  .am-mass-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 6px; padding: 18px 20px; }
  .am-mass-card:nth-child(1) { border-top: 4px solid var(--accent); }
  .am-mass-card:nth-child(2) { border-top: 4px solid var(--teal); }
  .am-mass-card:nth-child(3) { border-top: 4px solid var(--orange); }
  .am-mass-card:nth-child(4) { border-top: 4px solid var(--pink); }
  .am-mass-title { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: var(--accent); margin-bottom: 8px; }
  .am-mass-card:nth-child(2) .am-mass-title { color: var(--teal); }
  .am-mass-card:nth-child(3) .am-mass-title { color: var(--orange); }
  .am-mass-card:nth-child(4) .am-mass-title { color: var(--pink); }
  .am-mass-text { font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.7; }
  .am-mass-text strong { font-weight: 600; color: var(--ink); }
  .am-mass-formula { margin-top: 10px; background: var(--paper2); border-radius: 4px; padding: 8px 12px; font-family: 'Poppins', sans-serif; font-size: 12.5px; font-weight: 600; color: var(--accent2); }

  /* ═══ S5: MOLECULE & ION — 2-col contrast ═══ */
  .am-mol-ion { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 28px; }
  @media (max-width: 560px) { .am-mol-ion { grid-template-columns: 1fr; } }
  .am-mol-card { border-radius: 8px; overflow: hidden; border: 1.5px solid var(--rule); background: #ffffff; }
  .am-mol-hdr.molecule { background: linear-gradient(135deg, #00293a, #0e7490); padding: 18px 20px; }
  .am-mol-hdr.ion      { background: linear-gradient(135deg, #2a0018, #be185d); padding: 18px 20px; }
  .am-mol-tag  { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 4px; }
  .am-mol-name { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; color: #fff; }
  .am-mol-body { padding: 16px 20px; background: #ffffff; }
  .am-mol-point { font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.65; padding: 6px 0; border-bottom: 1px solid var(--rule); display: flex; gap: 8px; }
  .am-mol-point:last-child { border-bottom: none; }
  .am-mol-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-top: 7px; background: var(--teal); }
  .am-mol-card:last-child .am-mol-dot { background: var(--pink); }
  .am-mol-point strong { font-weight: 600; color: var(--ink); }

  /* Ion types: cation / anion */
  .am-ion-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 28px; }
  @media (max-width: 500px) { .am-ion-pair { grid-template-columns: 1fr; } }
  .am-ion-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 6px; padding: 16px 18px; text-align: center; }
  .am-ion-card.cation { border-bottom: 3px solid var(--orange); }
  .am-ion-card.anion  { border-bottom: 3px solid var(--teal); }
  .am-ion-charge { font-family: 'Montserrat', sans-serif; font-size: 36px; font-weight: 900; line-height: 1; margin-bottom: 6px; }
  .am-ion-card.cation .am-ion-charge { color: var(--orange); }
  .am-ion-card.anion  .am-ion-charge { color: var(--teal); }
  .am-ion-name  { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
  .am-ion-alias { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 600; color: var(--muted); margin-bottom: 8px; }
  .am-ion-text  { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2); line-height: 1.6; }

  /* ═══ S6: CHEMICAL FORMULA — steps ═══ */
  .am-formula-steps { margin-bottom: 28px; }
  .am-step { display: flex; gap: 16px; align-items: flex-start; padding: 16px 0; border-bottom: 1px solid var(--rule); }
  .am-step:last-child { border-bottom: none; }
  .am-step-num { font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900; color: var(--rule); line-height: 1; flex-shrink: 0; min-width: 36px; }
  .am-step-content {}
  .am-step-title { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: var(--accent2); margin-bottom: 4px; }
  .am-step-text  { font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.7; }
  .am-step-text strong { font-weight: 600; color: var(--ink); }

  /* Molecular vs formula unit mass */
  .am-mass-compare { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 28px; }
  @media (max-width: 500px) { .am-mass-compare { grid-template-columns: 1fr; } }
  .am-mass-cmp { background: var(--white); border: 1.5px solid var(--rule); border-radius: 6px; padding: 18px 20px; border-left: 4px solid var(--accent); }
  .am-mass-cmp:last-child { border-left-color: var(--teal); }
  .am-mass-cmp-title { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: var(--accent); margin-bottom: 8px; }
  .am-mass-cmp:last-child .am-mass-cmp-title { color: var(--teal); }
  .am-mass-cmp-text { font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.7; }
  .am-mass-cmp-text strong { font-weight: 600; color: var(--ink); }

  /* ═══ S7: MOLE CONCEPT — dark box flow ═══ */
  .am-mole-box {
    background: linear-gradient(135deg, #06020f, #180830); border-radius: 8px; padding: 28px 32px; margin-bottom: 28px;
    position: relative; overflow: hidden;
  }
  .am-mole-box::before {
    content: ''; position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(196,181,253,0.06) 1px, transparent 1px);
    background-size: 22px 22px; pointer-events: none;
  }
  .am-mole-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(196,181,253,0.6); margin-bottom: 16px; }
  .am-mole-avogadro { text-align: center; margin-bottom: 24px; }
  .am-mole-big-num { font-family: 'Montserrat', sans-serif; font-size: clamp(28px, 5vw, 42px); font-weight: 900; color: #c4b5fd; letter-spacing: -0.02em; line-height: 1; }
  .am-mole-big-sub { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.5); margin-top: 6px; }
  /* Mole flow — 3 rows */
  .am-mole-flow { display: flex; flex-direction: column; gap: 12px; }
  .am-mole-row { display: grid; grid-template-columns: 1fr 32px 1fr 32px 1fr; align-items: center; gap: 6px; }
  @media (max-width: 560px) { .am-mole-row { grid-template-columns: 1fr 24px 1fr 24px 1fr; gap: 4px; } }
  .am-mole-cell { background: rgba(255,255,255,0.06); border: 1px solid rgba(196,181,253,0.14); border-radius: 6px; padding: 10px 12px; font-family: 'Inter', sans-serif; font-size: 12.5px; color: rgba(255,255,255,0.78); line-height: 1.4; text-align: center; }
  @media (max-width: 560px) { .am-mole-cell { font-size: 11px; padding: 8px 8px; } }
  .am-mole-arrow { font-size: 18px; color: #c4b5fd; text-align: center; font-weight: 700; }
  .am-mole-formula-box { margin-top: 20px; background: rgba(255,255,255,0.04); border: 1px solid rgba(196,181,253,0.14); border-radius: 6px; padding: 14px 18px; text-align: center; }
  .am-mole-formula-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(196,181,253,0.5); margin-bottom: 8px; }
  .am-mole-frac { display: inline-flex; flex-direction: column; align-items: center; gap: 0; }
  .am-mole-frac-num { font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 700; color: #c4b5fd; padding-bottom: 3px; border-bottom: 2px solid rgba(196,181,253,0.5); }
  .am-mole-frac-den { font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 700; color: #c4b5fd; padding-top: 3px; }
  .am-mole-eq { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: rgba(196,181,253,0.7); margin: 0 12px; align-self: center; }

  /* ═══ S8: GAS LAWS — 2 law cards ═══ */
  .am-gas-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 28px; }
  @media (max-width: 560px) { .am-gas-pair { grid-template-columns: 1fr; } }
  .am-gas-card { border-radius: 8px; overflow: hidden; border: 1.5px solid var(--rule); }
  .am-gas-hdr.avogadro { background: linear-gradient(135deg, #001a2e, #0e7490); padding: 18px 20px; }
  .am-gas-hdr.gaylussac { background: linear-gradient(135deg, #1a0030, #5b21b6); padding: 18px 20px; }
  .am-gas-tag  { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 4px; }
  .am-gas-name { font-family: 'Montserrat', sans-serif; font-size: 17px; font-weight: 900; color: #fff; line-height: 1.2; }
  .am-gas-body { padding: 18px 20px; background: var(--white); }
  .am-gas-text { font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.75; margin-bottom: 12px; }
  .am-gas-text strong { font-weight: 600; color: var(--ink); }
  .am-gas-formula { background: var(--paper2); border-radius: 6px; padding: 10px 14px; font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: var(--accent2); text-align: center; }

  /* ═══ PULL QUOTE ═══ */
  .am-pull-quote { border-left: 5px solid var(--accent); background: var(--accent-lt); padding: 20px 28px; margin: 28px 0; border-radius: 0 4px 4px 0; }
  .am-pull-quote p { font-family: 'Poppins', sans-serif; font-size: 15.5px; font-weight: 600; color: var(--accent2); line-height: 1.7; font-style: italic; margin: 0; }

  /* ═══ FAQ ═══ */
  .am-faq-header { margin-bottom: 12px; }
  .am-faq-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); background: var(--accent-lt); padding: 6px 16px; border-radius: 100px; }
  .am-faq-title { font-family: 'Montserrat', sans-serif; font-size: clamp(24px, 4vw, 34px); font-weight: 900; color: var(--ink); letter-spacing: -0.02em; margin-bottom: 28px; margin-top: 16px; }
  .am-faq-item { border: 1.5px solid var(--rule); border-radius: 6px; margin-bottom: 12px; overflow: hidden; background: var(--white); transition: border-color 0.2s; }
  .am-faq-item.open { border-color: var(--accent); }
  .am-faq-q { width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; text-align: left; gap: 16px; }
  .am-faq-q-text { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600; color: var(--ink); line-height: 1.5; }
  .am-faq-item.open .am-faq-q-text { color: var(--accent); }
  .am-faq-icon { font-size: 20px; color: var(--accent); flex-shrink: 0; line-height: 1; }
  .am-faq-ans { font-family: 'Inter', sans-serif; font-size: 15px; color: var(--ink2); line-height: 1.85; padding: 0 24px; max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; }
  .am-faq-ans.visible { max-height: 1000px; padding: 0 24px 22px; }
  .am-faq-ans strong { color: var(--accent2); font-weight: 600; }

  @media (max-width: 700px) {
    .am-body { padding: 48px 18px 72px; }
    .am-hero-inner { padding: 0 18px; }
    .am-intro-card { padding: 24px 20px; }
    .am-intro-card p { font-size: 15px; }
    .am-hero-bar { gap: 12px; }
    .am-hero-bar-item { flex: 1 1 120px; padding: 0 14px 0 0; margin-right: 14px; }
    .am-bar-label { font-size: 9px; letter-spacing: 0.12em; }
    .am-bar-value { font-size: 13px; }
    .am-overline { font-size: 10px; letter-spacing: 0.16em; }
    .am-hero-title { font-size: clamp(36px, 10vw, 56px); margin-bottom: 24px; }
    .am-faq-q { padding: 16px 18px; }
    .am-faq-ans.visible { padding: 0 18px 18px; }
    .am-mole-box { padding: 20px 16px; }
  }
`;

const faqs = [
  {
    q: "What is Dalton's Atomic Theory? What are its main postulates?",
    a: (<>Dalton's Atomic Theory (1808) laid the foundation of modern chemistry. Key postulates:<br /><br />
      • All matter is made of very tiny particles called <strong>atoms</strong>.<br />
      • Atoms are <strong>indivisible</strong> — they cannot be created, destroyed, or broken further by chemical means.<br />
      • Atoms of the same element are <strong>identical</strong> in mass and properties; atoms of different elements differ.<br />
      • Atoms combine in <strong>simple whole-number ratios</strong> to form compounds.<br />
      • In a chemical reaction, atoms are <strong>rearranged</strong>, not created or destroyed.<br /><br />
      Note: Later discoveries showed atoms can be divided (into protons, neutrons, electrons), but Dalton's theory remains foundational for understanding chemical reactions.</>),
  },
  {
    q: "What is the Law of Conservation of Mass?",
    a: (<>The <strong>Law of Conservation of Mass</strong> states that <strong>mass can neither be created nor destroyed</strong> in a chemical reaction.<br /><br />
      This means the total mass of all reactants equals the total mass of all products in any chemical reaction.<br /><br />
      <strong>Example:</strong> If 4g of hydrogen reacts with 32g of oxygen to form water, then 36g of water is produced — no mass is gained or lost.<br /><br />
      This law was given by <strong>Antoine Lavoisier</strong> and is one of the most fundamental laws in chemistry.</>),
  },
  {
    q: "What is the Law of Constant Proportions?",
    a: (<>The <strong>Law of Constant Proportions</strong> (also called the Law of Definite Proportions) states that a chemical compound always contains the <strong>same elements in a fixed proportion by mass</strong>, regardless of the source or method of preparation.<br /><br />
      <strong>Example:</strong> Water (H₂O) always contains hydrogen and oxygen in the mass ratio 1:8, whether it is obtained from a river, rain, or a laboratory.<br /><br />
      This law was given by <strong>Joseph Proust</strong> in 1799. It confirms that compounds have a definite chemical composition.</>),
  },
  {
    q: "What is an atom? How is it represented?",
    a: (<>An <strong>atom</strong> is the smallest particle of matter that can take part in a chemical reaction. It can neither be created nor destroyed by chemical means.<br /><br />
      Key facts:<br />
      • The size of an atom is indicated by its <strong>atomic radius</strong>, expressed in nanometers (nm). Atoms are extremely small — 1 nm = 10⁻⁹ m.<br />
      • Atoms are represented by <strong>chemical symbols</strong> — one or two letters derived from the English or Latin name of the element.<br />
      • The symbol represents both the element and one atom of that element.<br /><br />
      Examples: H (Hydrogen), O (Oxygen), Na (Sodium — from Latin 'Natrium'), Fe (Iron — from Latin 'Ferrum'), Au (Gold — from Latin 'Aurum').</>),
  },
  {
    q: "What is atomic mass? What is gram atomic mass?",
    a: (<><strong>Atomic mass</strong> is the mass of one atom of an element. It is also called relative atomic mass because it is measured relative to the mass of a carbon-12 (C-12) isotope, which is assigned a mass of exactly 12 atomic mass units (u).<br /><br />
      <strong>Relative atomic mass</strong> = Mass of one atom of element ÷ Mass of one atom of hydrogen<br /><br />
      <strong>Gram atomic mass</strong> (molar mass of atoms) is the mass of one mole of atoms of an element, expressed in grams. It is numerically equal to the atomic mass in u.<br /><br />
      Example: Atomic mass of nitrogen = 14 u → Gram atomic mass of nitrogen = 14 g<br /><br />
      <strong>Gram molecular volume:</strong> The volume occupied by 1 gram molecule of any dry gas at STP = <strong>22.4 litres</strong>.</>),
  },
  {
    q: "What is a molecule? What is atomicity?",
    a: (<>A <strong>molecule</strong> is formed when two or more atoms of the same or different elements combine chemically. It is the smallest particle of a substance that has the chemical properties of that substance.<br /><br />
      <strong>Atomicity</strong> is the number of atoms that combine to form one molecule of an element or compound.<br /><br />
      Types based on atomicity:<br />
      • <strong>Monoatomic</strong>: 1 atom (noble gases — He, Ne, Ar)<br />
      • <strong>Diatomic</strong>: 2 atoms (H₂, O₂, N₂, Cl₂, HCl, CO)<br />
      • <strong>Triatomic</strong>: 3 atoms (O₃, H₂O, CO₂)<br />
      • <strong>Polyatomic</strong>: 4+ atoms (P₄, S₈, CH₄, C₆H₁₂O₆)</>),
  },
  {
    q: "What is an ion? What are cations and anions?",
    a: (<>An <strong>ion</strong> is a charged particle formed when an atom or group of atoms gains or loses electrons, giving it a net electric charge.<br /><br />
      • <strong>Cation</strong> (Positive ion): Formed when an atom <strong>loses electrons</strong>. Also called the basic radical. Example: Na⁺, Ca²⁺, Al³⁺<br />
      • <strong>Anion</strong> (Negative ion): Formed when an atom <strong>gains electrons</strong>. Also called the acidic radical. Example: Cl⁻, O²⁻, SO₄²⁻<br /><br />
      <strong>Ionic compounds</strong> are formed by the combination of cations and anions. They are held together by strong electrostatic attraction called ionic bonds. Examples: NaCl (Na⁺ + Cl⁻), MgO (Mg²⁺ + O²⁻).</>),
  },
  {
    q: "What is a chemical formula? How is it written?",
    a: (<>A <strong>chemical formula</strong> is the symbolic representation of the composition of a molecule, showing the symbols and numbers of each type of atom present.<br /><br />
      A <strong>molecular formula</strong> shows exactly which atoms and how many of each are in one molecule.<br /><br />
      To write a chemical formula, you need:<br />
      1. <strong>Symbols</strong> of the constituent elements.<br />
      2. <strong>Valency (combining capacity)</strong> of each element — then use the criss-cross method: swap the valencies as subscripts.<br /><br />
      Example: Magnesium (valency 2) + Oxygen (valency 2) → MgO<br />
      Aluminium (valency 3) + Oxygen (valency 2) → Al₂O₃ (criss-cross: 3 and 2 swap)</>),
  },
  {
    q: "What is molecular mass and formula unit mass?",
    a: (<><strong>Molecular mass</strong> is the sum of the atomic masses of all atoms present in one molecule of a substance.<br /><br />
      Example: Molecular mass of H₂O = 2(1) + 16 = 18 u<br /><br />
      <strong>Formula unit mass</strong> is the sum of the atomic masses of all atoms in one formula unit of a substance. This term is used for ionic compounds (which don't exist as discrete molecules but as a lattice of ions).<br /><br />
      Example: Formula unit mass of NaCl = 23 + 35.5 = 58.5 u<br /><br />
      For molecular compounds, molecular mass and formula unit mass are the same. For ionic compounds, formula unit mass is the correct term.</>),
  },
  {
    q: "What is the Mole Concept? What is Avogadro's number?",
    a: (<>The <strong>mole</strong> is the SI unit for amount of substance. <strong>One mole</strong> of a substance contains exactly <strong>6.022 × 10²³ particles</strong> (atoms, molecules, or ions).<br /><br />
      <strong>6.022 × 10²³</strong> is called <strong>Avogadro's number (Nₐ)</strong>.<br /><br />
      Key relationships:<br />
      • 1 mole of atoms = 6.022 × 10²³ atoms = atomic mass in grams<br />
      • 1 mole of molecules = 6.022 × 10²³ molecules = molecular mass in grams<br />
      • <strong>Molar mass</strong> = Mass of substance ÷ Number of moles<br /><br />
      The mole concept connects the microscopic world of atoms to measurable macroscopic quantities in the laboratory.</>),
  },
  {
    q: "What are Avogadro's Law and Gay-Lussac's Law?",
    a: (<><strong>Avogadro's Law:</strong> Under the same conditions of temperature and pressure, <strong>equal volumes of all gases contain equal numbers of moles</strong> (and hence equal numbers of molecules).<br /><br />
      This is why the molar volume of any gas at STP is <strong>22.4 litres</strong>.<br /><br />
      <strong>Gay-Lussac's Law:</strong> At <strong>constant volume</strong>, the pressure of a fixed amount of a gas is <strong>directly proportional to its absolute temperature</strong>.<br /><br />
      Formula: P₁/T₁ = P₂/T₂<br /><br />
      This explains why a sealed gas container can explode if strongly heated — pressure rises with temperature at constant volume.</>),
  },
];

export default function AtomsAndMolecules() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="am-root">

        {/* ══════ HERO ══════ */}
        <div className="am-hero">
          <div className="am-hero-dots" />
          <div className="am-hero-orbit" />
          <div className="am-glow-a" />
          <div className="am-glow-b" />
          <div className="am-hero-bg-num">3</div>
          <div className="am-hero-inner">
            <div className="am-overline">Class 9 · Science · Chapter 3</div>
            <h1 className="am-hero-title">
              Atoms &amp;<br />
              <em>Molecules</em>
            </h1>
            <div className="am-hero-bar">
              <div className="am-hero-bar-item">
                <div className="am-bar-label">Subject</div>
                <div className="am-bar-value">Science — Chemistry</div>
              </div>
              <div className="am-hero-bar-item">
                <div className="am-bar-label">Topics</div>
                <div className="am-bar-value">Atoms · Mole · Gas Laws</div>
              </div>
              <div className="am-hero-bar-item">
                <div className="am-bar-label">Board</div>
                <div className="am-bar-value">CBSE · NCERT</div>
              </div>
              <div className="am-hero-bar-item">
                <div className="am-bar-label">FAQs</div>
                <div className="am-bar-value">11 Questions</div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════ BODY ══════ */}
        <div className="am-body">

          {/* Intro */}
          <div className="am-intro-card">
            <p>
              What is matter truly made of? This chapter answers that question at the most fundamental level — <strong>atoms and molecules</strong>. From Dalton's atomic theory to the mole concept and gas laws, these ideas form the bedrock of all chemistry.
            </p>
            <p>
              Understanding how atoms combine, how mass is conserved, and how to count particles using the mole unlocks the ability to <strong>calculate, predict, and design</strong> every chemical reaction in science and industry.
            </p>
          </div>

          {/* ══ S1: Dalton's Atomic Theory ══ */}
          <div className="am-sec-head">
            <div className="am-sec-num">1</div>
            <div className="am-sec-title-wrap">
              <div className="am-sec-kicker">Historical Foundation</div>
              <h2 className="am-sec-title">Dalton's <span>Atomic Theory</span></h2>
            </div>
          </div>
          <p className="am-body-text">
            In 1808, John Dalton proposed a systematic atomic theory that explained the laws of chemical combination. It gave science its first rigorous model of the atom.
          </p>
          <div className="am-dalton-grid">
            {[
              { hdr: "Matter is Atomic", body: <>All matter is composed of extremely tiny particles called <strong>atoms</strong>. Atoms are the fundamental building blocks of all substances.</> },
              { hdr: "Atoms are Indivisible", body: <>Atoms <strong>cannot be divided, created, or destroyed</strong> by chemical means. They participate in reactions but are not broken down in the process.</> },
              { hdr: "Fixed Ratios in Compounds", body: <>Atoms combine in <strong>simple whole-number ratios</strong> to form compounds. Different compounds of the same elements have different ratios.</> },
            ].map((d, i) => (
              <div className="am-dalton-card" key={i}>
                <div className="am-dalton-card-hdr">
                  <div className="am-dalton-num">0{i+1}</div>
                  <div className="am-dalton-hdr-text">{d.hdr}</div>
                </div>
                <div className="am-dalton-body">{d.body}</div>
              </div>
            ))}
          </div>

          {/* ══ S2: Laws of Chemical Combination ══ */}
          <div className="am-divider"><div className="am-divider-mark" /></div>
          <div className="am-sec-head">
            <div className="am-sec-num">2</div>
            <div className="am-sec-title-wrap">
              <div className="am-sec-kicker">Fundamental Laws</div>
              <h2 className="am-sec-title">Laws of <span>Chemical Combination</span></h2>
            </div>
          </div>
          <p className="am-body-text">
            Two fundamental laws govern how elements combine to form compounds. These were discovered experimentally before atomic theory could explain them.
          </p>
          <div className="am-law-pair">
            <div className="am-law-card">
              <div className="am-law-hdr conserv">
                <div className="am-law-tag">Lavoisier · 1789</div>
                <div className="am-law-name">Law of Conservation of Mass</div>
              </div>
              <div className="am-law-body">
                Mass can <strong>neither be created nor destroyed</strong> in a chemical reaction. The total mass of reactants always equals the total mass of products.
                <div className="am-law-formula">Σ mass(reactants) = Σ mass(products)</div>
              </div>
            </div>
            <div className="am-law-card">
              <div className="am-law-hdr constprop">
                <div className="am-law-tag">Proust · 1799</div>
                <div className="am-law-name">Law of Constant Proportions</div>
              </div>
              <div className="am-law-body">
                A chemical compound always contains the <strong>same elements in a fixed proportion by mass</strong>, regardless of its source or how it was prepared.
                <div className="am-law-formula">H₂O: H:O = 1:8 always (by mass)</div>
              </div>
            </div>
          </div>

          {/* ══ S3: The Atom ══ */}
          <div className="am-divider"><div className="am-divider-mark" /></div>
          <div className="am-sec-head">
            <div className="am-sec-num">3</div>
            <div className="am-sec-title-wrap">
              <div className="am-sec-kicker">Building Block</div>
              <h2 className="am-sec-title">The <span>Atom</span> — Size, Symbol &amp; Mass</h2>
            </div>
          </div>
          <p className="am-body-text">
            An atom is the <strong>smallest particle of an element</strong> that retains the chemical identity of that element. It cannot be created or destroyed by chemical means.
          </p>
          <div className="am-atom-strip">
            <div className="am-atom-chip">
              <span className="am-atom-chip-icon">📏</span>
              <div className="am-atom-chip-title">Atomic Radius</div>
              <div className="am-atom-chip-text">The size of an atom is given by its <strong>atomic radius</strong>, expressed in <strong>nanometres (nm)</strong>. Atoms are unimaginably small — a human hair is ~80,000 atoms wide.</div>
            </div>
            <div className="am-atom-chip">
              <span className="am-atom-chip-icon">🔤</span>
              <div className="am-atom-chip-title">Chemical Symbols</div>
              <div className="am-atom-chip-text">Symbols are <strong>1–2 letters</strong> from the English or Latin name of the element. They represent the element and <strong>one atom</strong> of that element.</div>
            </div>
            <div className="am-atom-chip">
              <span className="am-atom-chip-icon">⚖️</span>
              <div className="am-atom-chip-title">Atomic Mass</div>
              <div className="am-atom-chip-text">Measured relative to <strong>C-12 isotope</strong> (mass = 12 u). Also called relative atomic mass. Expressed in atomic mass units (u).</div>
            </div>
          </div>

          {/* Symbol showcase */}
          <div className="am-symbol-box">
            <div className="am-symbol-label">⬦ Common Element Symbols — English &amp; Latin origins</div>
            <div className="am-symbol-row">
              {[
                { sym: "H",  name: "Hydrogen" },
                { sym: "O",  name: "Oxygen" },
                { sym: "C",  name: "Carbon" },
                { sym: "N",  name: "Nitrogen" },
                { sym: "Na", name: "Sodium (Natrium)" },
                { sym: "K",  name: "Potassium (Kalium)" },
                { sym: "Fe", name: "Iron (Ferrum)" },
                { sym: "Au", name: "Gold (Aurum)" },
                { sym: "Ag", name: "Silver (Argentum)" },
                { sym: "Cu", name: "Copper (Cuprum)" },
              ].map((s, i) => (
                <div className="am-symbol-pill" key={i}>
                  <div className="am-symbol-el">{s.sym}</div>
                  <div className="am-symbol-name">{s.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ══ S4: Atomic & Molecular Mass terms ══ */}
          <div className="am-divider"><div className="am-divider-mark" /></div>
          <div className="am-sec-head">
            <div className="am-sec-num">4</div>
            <div className="am-sec-title-wrap">
              <div className="am-sec-kicker">Measurement</div>
              <h2 className="am-sec-title">Mass Terms — <span>Atomic to Molar</span></h2>
            </div>
          </div>
          <p className="am-body-text">
            Chemistry uses several mass-related terms. Understanding each precisely is essential for calculations.
          </p>
          <div className="am-mass-grid">
            {[
              { title: "Atomic Mass", text: <>Mass of one atom of an element. Measured relative to C-12. Expressed in <strong>atomic mass units (u)</strong>. Example: O = 16 u, N = 14 u.</> },
              { title: "Gram Atomic Mass", text: <>Mass of <strong>one mole</strong> of atoms of an element, in grams. Numerically equal to atomic mass. Example: Gram atomic mass of N = <strong>14 g</strong>.</> },
              { title: "Relative Atomic Mass", text: <>Ratio of the mass of one atom of an element to the mass of <strong>one atom of hydrogen</strong> (taken as unity). Dimensionless.</> },
              { title: "Gram Molecular Volume", text: <>Volume occupied by <strong>1 gram molecule</strong> of any dry gas at STP. Experimentally = <strong>22.4 L</strong> for all gases.</>, formula: "1 gram molecule of gas = 22.4 L at STP" },
            ].map((m, i) => (
              <div className="am-mass-card" key={i}>
                <div className="am-mass-title">{m.title}</div>
                <div className="am-mass-text">{m.text}</div>
                {m.formula && <div className="am-mass-formula">{m.formula}</div>}
              </div>
            ))}
          </div>

          {/* ══ S5: Molecule & Ion ══ */}
          <div className="am-divider"><div className="am-divider-mark" /></div>
          <div className="am-sec-head">
            <div className="am-sec-num">5</div>
            <div className="am-sec-title-wrap">
              <div className="am-sec-kicker">Particles</div>
              <h2 className="am-sec-title">Molecules <span>&amp; Ions</span></h2>
            </div>
          </div>
          <p className="am-body-text">
            When atoms combine, they form <strong>molecules</strong> (neutral) or <strong>ions</strong> (charged). Both are fundamental particles found in chemical compounds.
          </p>

          <div className="am-mol-ion">
            <div className="am-mol-card">
              <div className="am-mol-hdr molecule">
                <div className="am-mol-tag">Neutral · Covalent</div>
                <div className="am-mol-name">🔗 Molecule</div>
              </div>
              <div className="am-mol-body">
                {[
                  { t: "Formed when two or more atoms combine chemically — same or different elements." },
                  { t: <>The number of atoms in a molecule = its <strong>atomicity</strong> (mono-, di-, tri-, poly-atomic).</> },
                  { t: "Molecules are neutral — no net electric charge." },
                  { t: "Examples: H₂O (2 atoms), O₂ (2 atoms), NH₃ (4 atoms), C₆H₁₂O₆ (24 atoms)" },
                ].map((p, i) => (
                  <div className="am-mol-point" key={i}>
                    <div className="am-mol-dot" />
                    <span>{p.t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="am-mol-card">
              <div className="am-mol-hdr ion">
                <div className="am-mol-tag">Charged · Ionic</div>
                <div className="am-mol-name">⚡ Ion</div>
              </div>
              <div className="am-mol-body">
                {[
                  { t: "Formed when an atom (or group of atoms) gains or loses electrons." },
                  { t: "Carries a net electric charge — positive or negative." },
                  { t: <>Ionic compounds form from the combination of <strong>cations + anions</strong>.</> },
                  { t: "Examples: NaCl (Na⁺ + Cl⁻), MgO (Mg²⁺ + O²⁻), CaCl₂" },
                ].map((p, i) => (
                  <div className="am-mol-point" key={i}>
                    <div className="am-mol-dot" />
                    <span>{p.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cation / Anion */}
          <div className="am-ion-pair">
            <div className="am-ion-card cation">
              <div className="am-ion-charge">+</div>
              <div className="am-ion-name">Cation</div>
              <div className="am-ion-alias">Basic Radical</div>
              <div className="am-ion-text">Formed when an atom <strong>loses electrons</strong>. Carries positive charge. Examples: Na⁺, Mg²⁺, Al³⁺, H⁺, Ca²⁺</div>
            </div>
            <div className="am-ion-card anion">
              <div className="am-ion-charge">−</div>
              <div className="am-ion-name">Anion</div>
              <div className="am-ion-alias">Acidic Radical</div>
              <div className="am-ion-text">Formed when an atom <strong>gains electrons</strong>. Carries negative charge. Examples: Cl⁻, O²⁻, SO₄²⁻, NO₃⁻, OH⁻</div>
            </div>
          </div>

          {/* ══ S6: Chemical Formula & Molecular Mass ══ */}
          <div className="am-divider"><div className="am-divider-mark" /></div>
          <div className="am-sec-head">
            <div className="am-sec-num">6</div>
            <div className="am-sec-title-wrap">
              <div className="am-sec-kicker">Representation</div>
              <h2 className="am-sec-title">Chemical Formula &amp; <span>Molecular Mass</span></h2>
            </div>
          </div>
          <p className="am-body-text">
            A <strong>chemical formula</strong> uses element symbols and subscript numbers to show what atoms — and how many of each — make up a molecule of a compound.
          </p>

          <div className="am-formula-steps">
            {[
              { title: "Know the symbols", text: <>Identify the <strong>chemical symbols</strong> of all elements in the compound. Use the periodic table.</> },
              { title: "Know the valencies", text: <>Find the <strong>combining capacity (valency)</strong> of each element. This tells you how many bonds each atom can form.</> },
              { title: "Apply the criss-cross rule", text: <>Swap the valencies of the two elements as subscripts. Simplify if possible. Example: Al (valency 3) + O (valency 2) → <strong>Al₂O₃</strong></> },
              { title: "Write and verify", text: <>The resulting formula should be <strong>electrically neutral</strong> (for ionic compounds, total positive charge = total negative charge).</> },
            ].map((s, i) => (
              <div className="am-step" key={i}>
                <div className="am-step-num">0{i+1}</div>
                <div className="am-step-content">
                  <div className="am-step-title">{s.title}</div>
                  <div className="am-step-text">{s.text}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="am-mass-compare">
            <div className="am-mass-cmp">
              <div className="am-mass-cmp-title">Molecular Mass</div>
              <div className="am-mass-cmp-text">Sum of <strong>atomic masses of all atoms</strong> in one molecule. Used for covalent compounds. Example: H₂O = 2(1) + 16 = <strong>18 u</strong></div>
            </div>
            <div className="am-mass-cmp">
              <div className="am-mass-cmp-title">Formula Unit Mass</div>
              <div className="am-mass-cmp-text">Sum of atomic masses in one <strong>formula unit</strong> of an ionic compound. Example: NaCl = 23 + 35.5 = <strong>58.5 u</strong></div>
            </div>
          </div>

          {/* ══ S7: Mole Concept ══ */}
          <div className="am-divider"><div className="am-divider-mark" /></div>
          <div className="am-sec-head">
            <div className="am-sec-num">7</div>
            <div className="am-sec-title-wrap">
              <div className="am-sec-kicker">Counting Particles</div>
              <h2 className="am-sec-title">The <span>Mole Concept</span></h2>
            </div>
          </div>
          <p className="am-body-text">
            Atoms are far too small to count individually. Chemists use the <strong>mole</strong> — a counting unit that bridges the atomic world and the laboratory world.
          </p>

          <div className="am-mole-box">
            <div className="am-mole-label">⬦ Avogadro's Number &amp; Mole Relationships</div>
            <div className="am-mole-avogadro">
              <div className="am-mole-big-num">6.022 × 10²³</div>
              <div className="am-mole-big-sub">Avogadro's Number — particles in 1 mole of any substance</div>
            </div>
            <div className="am-mole-flow">
              {[
                ["1 mole of any particle (atom, molecule, ion)", "→", "6.022×10²³ particles", "→", "Relative mass in grams"],
                ["1 mole of molecules", "→", "6.022×10²³ molecules", "→", "Molecular mass in grams"],
                ["1 mole of atoms", "→", "6.022×10²³ atoms", "→", "Atomic mass in grams"],
              ].map((row, i) => (
                <div className="am-mole-row" key={i}>
                  <div className="am-mole-cell">{row[0]}</div>
                  <div className="am-mole-arrow">{row[1]}</div>
                  <div className="am-mole-cell">{row[2]}</div>
                  <div className="am-mole-arrow">{row[3]}</div>
                  <div className="am-mole-cell">{row[4]}</div>
                </div>
              ))}
            </div>
            <div className="am-mole-formula-box">
              <div className="am-mole-formula-label">Molar Mass Formula</div>
              <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexWrap:"wrap", gap:"4px"}}>
                <div className="am-mole-frac">
                  <div className="am-mole-frac-num">Mass of substance</div>
                  <div className="am-mole-frac-den">Number of moles</div>
                </div>
                <div className="am-mole-eq" style={{fontFamily:"'Poppins',sans-serif", color:"rgba(196,181,253,0.7)", fontSize:"14px", fontWeight:700, margin:"0 10px"}}>= Molar Mass</div>
              </div>
            </div>
          </div>

          {/* ══ S8: Gas Laws ══ */}
          <div className="am-divider"><div className="am-divider-mark" /></div>
          <div className="am-sec-head">
            <div className="am-sec-num">8</div>
            <div className="am-sec-title-wrap">
              <div className="am-sec-kicker">Gaseous Behaviour</div>
              <h2 className="am-sec-title">Avogadro's &amp; <span>Gay-Lussac's Law</span></h2>
            </div>
          </div>
          <p className="am-body-text">
            Two important laws describe how gases behave in terms of volume, pressure, temperature, and moles.
          </p>

          <div className="am-gas-pair">
            <div className="am-gas-card">
              <div className="am-gas-hdr avogadro">
                <div className="am-gas-tag">Avogadro · Equal Volumes</div>
                <div className="am-gas-name">Avogadro's Law</div>
              </div>
              <div className="am-gas-body">
                <div className="am-gas-text">Under the same conditions of <strong>temperature and pressure</strong>, equal volumes of all gases contain equal numbers of moles (and molecules).</div>
                <div className="am-gas-formula">1 mole of any gas at STP = 22.4 L</div>
              </div>
            </div>
            <div className="am-gas-card">
              <div className="am-gas-hdr gaylussac">
                <div className="am-gas-tag">Gay-Lussac · P ∝ T</div>
                <div className="am-gas-name">Gay-Lussac's Law</div>
              </div>
              <div className="am-gas-body">
                <div className="am-gas-text">At <strong>constant volume</strong>, the pressure of a fixed amount of gas is <strong>directly proportional</strong> to its absolute temperature.</div>
                <div className="am-gas-formula">P₁ / T₁ = P₂ / T₂</div>
              </div>
            </div>
          </div>

          <div className="am-pull-quote">
            <p>"The mole is chemistry's great bridge — connecting the invisible world of atoms (6 × 10²³ of them!) to the grams we can weigh on a balance. Avogadro's number is perhaps the most important number in all of science."</p>
          </div>

          {/* ══ FAQ ══ */}
          <div className="am-divider"><div className="am-divider-mark" /></div>
          <div className="am-faq-header"><span className="am-faq-kicker">Exam Preparation</span></div>
          <h2 className="am-faq-title">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div className={`am-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="am-faq-q" onClick={() => toggle(i)}>
                <span className="am-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="am-faq-icon">{openIndex === i ? "▴" : "▾"}</span>
              </button>
              <div className={`am-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
