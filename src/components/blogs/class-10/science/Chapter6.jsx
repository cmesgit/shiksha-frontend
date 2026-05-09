import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --leaf:       #1a5c0e;
    --leaf2:      #0e3c08;
    --leaf-lt:    #e8f5e2;
    --leaf-mid:   #c4e8b8;
    --bark:       #5c3a1e;
    --bark-lt:    #f5ede4;
    --bark-mid:   #d4b89a;
    --sun:        #d4880a;
    --sun-lt:     #fef3e0;
    --sun-mid:    #f9d898;
    --blood:      #b01820;
    --blood-lt:   #fde8e8;
    --blood-mid:  #f4b0b0;
    --sky:        #1a5a9c;
    --sky-lt:     #e4f0fc;
    --sky-mid:    #a8ccf0;
    --soil:       #4a3018;
    --soil-lt:    #f2ebe4;
    --paper:      #faf8f4;
    --paper2:     #f0ebe2;
    --ink:        #1a140c;
    --ink2:       #2e2318;
    --muted:      #6a5840;
    --teal:       #0a7878;
    --teal-lt:    #ccf0f0;
    --rule:       #d8cfc0;
    --white:      #ffffff;
    --caption:    #8a7868;
    --eq-bg:      #0a1a06;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .lp-root { font-family: 'DM Sans', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  /* ═══ HERO — editorial magazine style ═══ */
  .lp-hero {
    background: var(--leaf2);
    min-height: 100vh; display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative; overflow: hidden;
  }
  @media (max-width: 720px) { .lp-hero { grid-template-columns: 1fr; min-height: auto; } }

  .lp-hero-left {
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 80px 48px 72px 52px; position: relative; z-index: 2;
  }
  .lp-hero-right {
    position: relative; overflow: hidden;
    background: linear-gradient(160deg, #0a2e06 0%, #1a5c0e 60%, #0e3c08 100%);
  }
  @media (max-width: 720px) { .lp-hero-right { height: 300px; } .lp-hero-left { padding: 48px 24px 48px; } }

  /* Cell / leaf SVG watermark */
  .lp-hero-cells {
    position: absolute; inset: 0; opacity: 0.12;
    background-image:
      radial-gradient(circle at 20% 30%, rgba(144,238,100,0.6) 0%, transparent 40%),
      radial-gradient(circle at 70% 60%, rgba(100,200,80,0.5) 0%, transparent 35%),
      radial-gradient(circle at 50% 80%, rgba(180,255,140,0.4) 0%, transparent 30%);
  }
  .lp-hero-leaf-pattern {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      radial-gradient(ellipse 60px 80px at 25% 20%, rgba(80,200,40,0.08) 0%, transparent 100%),
      radial-gradient(ellipse 40px 60px at 75% 40%, rgba(100,220,60,0.06) 0%, transparent 100%),
      radial-gradient(ellipse 80px 50px at 45% 75%, rgba(60,180,30,0.07) 0%, transparent 100%);
  }

  .lp-subject-pill {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(42,122,24,0.25); border: 1px solid rgba(144,238,100,0.3);
    border-radius: 100px; padding: 6px 16px; margin-bottom: 28px;
    font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
    color: #90ee60; letter-spacing: 0.14em; text-transform: uppercase;
  }
  .lp-subject-dot { width: 6px; height: 6px; border-radius: 50%; background: #90ee60; }

  .lp-hero-eyebrow {
    font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.4);
    margin-bottom: 16px;
  }
  .lp-hero-title {
    font-family: 'Playfair Display', serif; font-weight: 900;
    font-size: clamp(44px, 6vw, 80px); color: #fff;
    line-height: 1.0; letter-spacing: -0.02em; margin-bottom: 10px;
  }
  .lp-hero-title-italic {
    font-family: 'Playfair Display', serif; font-weight: 700; font-style: italic;
    font-size: clamp(28px, 4vw, 52px); color: #90ee60;
    line-height: 1.1; letter-spacing: -0.01em; margin-bottom: 32px; display: block;
  }
  .lp-hero-desc {
    font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 400;
    color: rgba(255,255,255,0.6); line-height: 1.75; max-width: 420px; margin-bottom: 40px;
  }
  .lp-hero-meta {
    display: flex; gap: 32px; flex-wrap: wrap;
    border-top: 1px solid rgba(255,255,255,0.1); padding-top: 28px;
  }
  .lp-meta-item {}
  .lp-meta-label { font-size: 10px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 4px; }
  .lp-meta-value { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.75); }

  /* Right side illustrated SVG */
  .lp-hero-illustration { width: 100%; height: 100%; display: block; }

  /* ═══ BODY ═══ */
  .lp-body { max-width: 900px; margin: 0 auto; padding: 80px 32px 100px; }

  /* ═══ CHAPTER INTRO ═══ */
  .lp-intro {
    display: grid; grid-template-columns: 3fr 2fr; gap: 40px;
    margin-bottom: 72px; align-items: start;
  }
  @media (max-width: 640px) { .lp-intro { grid-template-columns: 1fr; } }
  .lp-intro-text {}
  .lp-intro-kicker {
    font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; color: var(--leaf);
    margin-bottom: 14px; display: flex; align-items: center; gap: 10px;
  }
  .lp-intro-kicker::after { content: ''; flex: 1; height: 1px; background: var(--leaf-mid); max-width: 60px; }
  .lp-intro-headline {
    font-family: 'Playfair Display', serif; font-size: clamp(24px, 3.5vw, 34px);
    font-weight: 800; color: var(--ink); line-height: 1.2; margin-bottom: 18px;
    letter-spacing: -0.01em;
  }
  .lp-intro-headline em { font-style: italic; color: var(--leaf); }
  .lp-intro-body {
    font-size: 16px; line-height: 1.85; color: var(--ink2); margin-bottom: 16px;
  }
  .lp-intro-body strong { color: var(--leaf2); font-weight: 600; }
  .lp-intro-sidebar {
    background: var(--leaf2); border-radius: 12px; padding: 28px 24px;
    position: relative; overflow: hidden;
  }
  .lp-intro-sidebar::before {
    content: ''; position: absolute; top: -20px; right: -20px;
    width: 100px; height: 100px; border-radius: 50%;
    background: rgba(144,238,100,0.08);
  }
  .lp-sidebar-label {
    font-size: 9px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(144,238,100,0.6); margin-bottom: 14px;
  }
  .lp-sidebar-title {
    font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700;
    color: #fff; margin-bottom: 16px; line-height: 1.3;
  }
  .lp-sidebar-list { list-style: none; padding: 0; }
  .lp-sidebar-item {
    display: flex; align-items: center; gap: 10px; padding: 8px 0;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    font-size: 13px; color: rgba(255,255,255,0.7); line-height: 1.5;
  }
  .lp-sidebar-item:last-child { border-bottom: none; }
  .lp-sidebar-num {
    font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700;
    color: #90ee60; flex-shrink: 0; line-height: 1; width: 28px;
  }

  /* ═══ CHAPTER DIVIDER ═══ */
  .lp-chapter-divider {
    display: flex; align-items: center; gap: 20px; margin: 64px 0 48px;
  }
  .lp-chapter-divider::before, .lp-chapter-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--rule);
  }
  .lp-chapter-pill {
    display: flex; align-items: center; gap: 10px;
    background: var(--leaf); border-radius: 100px;
    padding: 8px 20px; white-space: nowrap;
  }
  .lp-chapter-pill-num {
    font-family: 'Playfair Display', serif; font-size: 13px; font-weight: 700;
    color: #90ee60;
  }
  .lp-chapter-pill-text {
    font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase; color: #fff;
  }

  /* ═══ SECTION HEADER ═══ */
  .lp-sec-head { margin-bottom: 28px; }
  .lp-sec-num {
    font-family: 'Playfair Display', serif; font-size: 72px; font-weight: 900;
    color: var(--leaf-mid); line-height: 0.8; letter-spacing: -0.04em;
    margin-bottom: -4px; display: block;
  }
  .lp-sec-kicker {
    font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--leaf); margin-bottom: 6px;
  }
  .lp-sec-title {
    font-family: 'Playfair Display', serif; font-size: clamp(24px, 3vw, 32px);
    font-weight: 800; color: var(--ink); line-height: 1.15; letter-spacing: -0.01em;
    border-bottom: 2px solid var(--rule); padding-bottom: 16px;
  }
  .lp-sec-title span { color: var(--leaf); font-style: italic; }

  /* ═══ BODY TEXT ═══ */
  .lp-body-text {
    font-size: 15.5px; line-height: 1.85; color: var(--ink2); margin-bottom: 24px;
  }
  .lp-body-text strong { color: var(--leaf2); font-weight: 600; }

  /* ═══ PHOTOSYNTHESIS ILLUSTRATED CARD ═══ */
  .lp-photo-card {
    background: var(--white); border-radius: 16px; overflow: hidden;
    border: 1.5px solid var(--rule); margin-bottom: 28px;
    box-shadow: 0 4px 24px rgba(26,92,14,0.08);
  }
  .lp-photo-card-top {
    background: linear-gradient(135deg, #041e04 0%, #0a3a06 50%, #123814 100%);
    padding: 32px 36px 28px; position: relative; overflow: hidden;
  }
  .lp-photo-card-top::before {
    content: ''; position: absolute; inset: 0;
    background-image: radial-gradient(ellipse at 70% 50%, rgba(144,238,100,0.08) 0%, transparent 60%);
  }
  .lp-photo-label {
    font-size: 9px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(144,238,100,0.6); margin-bottom: 12px; position: relative; z-index: 1;
  }
  .lp-photo-equation {
    font-family: 'DM Sans', sans-serif; font-size: clamp(12px, 2.5vw, 16px);
    font-weight: 600; color: #fff; position: relative; z-index: 1;
    display: flex; align-items: center; flex-wrap: wrap; gap: 8px; line-height: 2;
  }
  .lp-photo-eq-item {
    display: flex; flex-direction: column; align-items: center; gap: 2px;
  }
  .lp-photo-eq-formula {
    font-family: 'DM Sans', sans-serif; font-size: clamp(14px, 2.5vw, 18px);
    font-weight: 700; color: #90ee60;
  }
  .lp-photo-eq-formula sub { font-size: 0.7em; }
  .lp-photo-eq-name { font-size: 10px; color: rgba(255,255,255,0.45); font-weight: 500; }
  .lp-photo-eq-arrow { font-size: 22px; color: rgba(255,255,255,0.4); align-self: flex-start; padding-top: 4px; }
  .lp-photo-eq-plus  { font-size: 20px; color: rgba(255,255,255,0.3); align-self: flex-start; padding-top: 4px; }
  .lp-photo-eq-cond  {
    display: flex; flex-direction: column; align-items: center;
    font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
    color: #f9d898; background: rgba(249,216,152,0.12); padding: 6px 12px; border-radius: 4px;
    align-self: flex-start; margin-top: 4px; gap: 2px;
  }
  .lp-photo-card-body {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
  }
  @media (max-width: 640px) { .lp-photo-card-body { grid-template-columns: 1fr 1fr; } }
  .lp-photo-raw {
    padding: 18px 16px; border-right: 1px solid var(--rule); border-top: 1px solid var(--rule);
    text-align: center;
  }
  .lp-photo-raw:last-child { border-right: none; }
  .lp-photo-raw-icon { font-size: 28px; display: block; margin-bottom: 8px; }
  .lp-photo-raw-name { font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 3px; }
  .lp-photo-raw-desc { font-size: 11px; color: var(--muted); line-height: 1.4; }

  /* ═══ PLANT ILLUSTRATION (SVG inline) ═══ */
  .lp-illustration-wrap {
    background: var(--leaf-lt); border-radius: 16px; padding: 24px;
    margin-bottom: 28px; border: 1.5px solid var(--leaf-mid);
    display: flex; flex-direction: column; align-items: center;
  }
  .lp-illustration-caption {
    font-size: 12px; color: var(--caption); text-align: center; margin-top: 12px;
    font-style: italic; font-family: 'DM Sans', sans-serif;
  }

  /* ═══ TWO PHASES OF PHOTOSYNTHESIS ═══ */
  .lp-phases {
    display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 28px;
  }
  @media (max-width: 620px) { .lp-phases { grid-template-columns: 1fr; } }
  .lp-phase-card { border-radius: 12px; overflow: hidden; border: 1.5px solid var(--rule); }
  .lp-phase-hdr { padding: 18px 20px 14px; }
  .lp-phase-hdr.light { background: linear-gradient(135deg, #2a1a00, #604000); }
  .lp-phase-hdr.dark  { background: linear-gradient(135deg, #0a1a2a, #142840); }
  .lp-phase-tag {
    font-size: 9px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(255,255,255,0.45); margin-bottom: 6px;
  }
  .lp-phase-name {
    font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700;
    color: #fff; line-height: 1.2;
  }
  .lp-phase-hdr.light .lp-phase-name { color: #f9d898; }
  .lp-phase-hdr.dark  .lp-phase-name { color: #90d0ff; }
  .lp-phase-body { padding: 16px 20px; background: var(--white); }
  .lp-phase-item {
    display: flex; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--rule);
    font-size: 13px; color: var(--ink2); line-height: 1.6;
  }
  .lp-phase-item:last-child { border-bottom: none; }
  .lp-phase-dot { min-width: 6px; height: 6px; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
  .light-dot { background: var(--sun); }
  .dark-dot  { background: var(--sky); }
  .lp-phase-item strong { color: var(--ink); font-weight: 600; }

  /* ═══ PHOTOLYSIS REACTIONS ═══ */
  .lp-reactions-box {
    background: #081a04; border-radius: 10px; padding: 24px 28px; margin-bottom: 24px;
    border: 1.5px solid rgba(42,122,24,0.4);
  }
  .lp-reactions-label {
    font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
    color: #6ee8a0; margin-bottom: 16px; opacity: 0.8;
  }
  .lp-rxn-row {
    display: flex; align-items: center; flex-wrap: wrap; gap: 8px;
    padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .lp-rxn-row:last-child { border-bottom: none; }
  .lp-rxn-num {
    font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 700;
    color: #6ee8a0; min-width: 28px; opacity: 0.7;
  }
  .lp-rxn-f {
    font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700;
    color: #90ee60; white-space: nowrap;
  }
  .lp-rxn-f sub { font-size: 0.7em; }
  .lp-rxn-f sup { font-size: 0.7em; }
  .lp-rxn-arr { font-size: 18px; color: #f9d898; margin: 0 4px; font-weight: 700; }
  .lp-rxn-plus { font-size: 16px; color: rgba(255,255,255,0.5); margin: 0 2px; font-weight: 700; }
  .lp-rxn-cond {
    font-size: 11px; font-weight: 700; color: #f9d898;
    background: rgba(249,216,152,0.15); padding: 3px 10px; border-radius: 4px;
    border: 1px solid rgba(249,216,152,0.25);
  }
  .lp-rxn-note { font-size: 11px; color: rgba(255,255,255,0.45); font-style: italic; margin-left: 4px; }

  /* ═══ NUTRITION TYPES — 3 BIG CARDS ═══ */
  .lp-nutrition-types { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px; }
  @media (max-width: 640px) { .lp-nutrition-types { grid-template-columns: 1fr; } }
  .lp-nt-card { border-radius: 12px; overflow: hidden; border: 1.5px solid var(--rule); }
  .lp-nt-hdr { padding: 20px 18px 14px; }
  .lp-nt-hdr.auto    { background: linear-gradient(135deg, #041e04, #0a3a06); }
  .lp-nt-hdr.hetero  { background: linear-gradient(135deg, #1a0808, #380a0a); }
  .lp-nt-hdr.special { background: linear-gradient(135deg, #041a10, #0a3020); }
  .lp-nt-icon { font-size: 28px; margin-bottom: 10px; display: block; }
  .lp-nt-name {
    font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700;
    color: #fff; margin-bottom: 4px;
  }
  .lp-nt-hdr.auto   .lp-nt-name { color: #90ee60; }
  .lp-nt-hdr.hetero .lp-nt-name { color: #fca5a5; }
  .lp-nt-hdr.special .lp-nt-name { color: #a0f0c0; }
  .lp-nt-sub { font-size: 11px; color: rgba(255,255,255,0.5); font-weight: 500; }
  .lp-nt-body { padding: 14px 18px 4px; background: var(--white); }
  .lp-nt-item {
    display: flex; gap: 10px; font-size: 13px; color: var(--ink2);
    padding: 9px 0; border-bottom: 1px solid var(--rule); line-height: 1.6;
    align-items: flex-start;
  }
  .lp-nt-item:last-child { border-bottom: none; }
  .lp-nt-dot { min-width: 6px; height: 6px; border-radius: 50%; margin-top: 7px; flex-shrink: 0; }
  .auto-dot    { background: #1a5c0e; }
  .hetero-dot  { background: #b01820; }
  .special-dot { background: #0a7878; }
  .lp-nt-item strong { color: var(--ink); font-weight: 700; }

  /* ═══ DIGESTIVE SYSTEM — FLOW ═══ */
  .lp-digestion-flow {
    background: var(--white); border-radius: 16px; border: 1.5px solid var(--rule);
    overflow: hidden; margin-bottom: 28px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  }
  .lp-df-header {
    background: linear-gradient(90deg, #0e3808, #1a5c0e);
    padding: 16px 24px; display: flex; align-items: center; gap: 12px;
  }
  .lp-df-header-title {
    font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: #fff;
  }
  .lp-df-header-sub { font-size: 12px; color: rgba(255,255,255,0.55); margin-left: auto; }
  .lp-df-body { padding: 24px; }
  .lp-df-steps { display: flex; flex-direction: column; gap: 0; }
  .lp-df-step {
    display: grid; grid-template-columns: 56px 1fr; gap: 0;
    position: relative;
  }
  .lp-df-step-left {
    display: flex; flex-direction: column; align-items: center; padding-top: 4px;
  }
  .lp-df-step-circle {
    width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; font-weight: 700; border: 2px solid var(--rule);
    background: var(--white); position: relative; z-index: 1;
  }
  .lp-df-step-line {
    flex: 1; width: 2px; background: var(--rule); margin: 4px 0;
  }
  .lp-df-step:last-child .lp-df-step-line { display: none; }
  .lp-df-step-content { padding: 0 0 24px 16px; }
  .lp-df-step:last-child .lp-df-step-content { padding-bottom: 4px; }
  .lp-df-step-organ {
    font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 700;
    color: var(--ink); margin-bottom: 4px;
  }
  .lp-df-step-detail { font-size: 13.5px; color: var(--ink2); line-height: 1.7; }
  .lp-df-step-detail strong { color: var(--leaf2); font-weight: 600; }
  .lp-df-enzyme-row {
    display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;
  }
  .lp-df-enzyme {
    display: inline-flex; align-items: center; gap: 5px;
    background: var(--leaf-lt); border: 1px solid var(--leaf-mid);
    border-radius: 100px; padding: 3px 12px;
    font-size: 11px; font-weight: 600; color: var(--leaf2);
  }
  .lp-df-enzyme-arrow { font-size: 10px; color: var(--muted); }

  /* ═══ TEETH DIAGRAM ═══ */
  .lp-teeth-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
  @media (max-width: 620px) { .lp-teeth-grid { grid-template-columns: 1fr 1fr; } }
  .lp-tooth-card {
    background: var(--white); border: 1.5px solid var(--rule); border-radius: 10px;
    padding: 16px 14px; text-align: center; border-top: 3px solid var(--leaf);
  }
  .lp-tooth-card:nth-child(2) { border-top-color: var(--sun); }
  .lp-tooth-card:nth-child(3) { border-top-color: var(--blood); }
  .lp-tooth-card:nth-child(4) { border-top-color: var(--sky); }
  .lp-tooth-icon  { font-size: 24px; display: block; margin-bottom: 8px; }
  .lp-tooth-name  { font-family: 'Playfair Display', serif; font-size: 14px; font-weight: 700; color: var(--ink); margin-bottom: 3px; }
  .lp-tooth-count { font-size: 12px; color: var(--leaf); font-weight: 600; margin-bottom: 4px; }
  .lp-tooth-role  { font-size: 11px; color: var(--muted); line-height: 1.4; }

  /* ═══ AMOEBA FEEDING STRIP ═══ */
  .lp-amoeba-strip {
    background: linear-gradient(135deg, #04100a, #0a200e);
    border-radius: 12px; padding: 24px 28px; margin-bottom: 24px;
    border: 1px solid rgba(42,122,24,0.3);
  }
  .lp-amoeba-label {
    font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(144,238,100,0.6); margin-bottom: 16px;
  }
  .lp-amoeba-steps { display: flex; gap: 0; overflow-x: auto; }
  .lp-amoeba-step {
    display: flex; flex-direction: column; align-items: center; min-width: 120px;
    flex: 1; padding: 0 8px; text-align: center; position: relative;
  }
  .lp-amoeba-step::after {
    content: '→'; position: absolute; right: -8px; top: 20px;
    font-size: 18px; color: rgba(255,255,255,0.2); z-index: 2;
  }
  .lp-amoeba-step:last-child::after { display: none; }
  .lp-amoeba-circle {
    width: 48px; height: 48px; border-radius: 50%; margin: 0 auto 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
  }
  .lp-amoeba-step-name { font-size: 12px; font-weight: 600; color: #fff; margin-bottom: 4px; }
  .lp-amoeba-step-desc { font-size: 11px; color: rgba(255,255,255,0.5); line-height: 1.5; }

  /* ═══ RESPIRATION COMPARE ═══ */
  .lp-resp-compare {
    display: grid; grid-template-columns: 1fr 1fr; gap: 0;
    border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden;
    margin-bottom: 28px;
  }
  @media (max-width: 620px) { .lp-resp-compare { grid-template-columns: 1fr; } }
  .lp-resp-col { padding: 24px 24px 28px; }
  .lp-resp-col.aerobic   { background: linear-gradient(160deg, #040c04, #0a2008); }
  .lp-resp-col.anaerobic { background: var(--white); border-left: 2px solid var(--rule); }
  .lp-resp-badge {
    display: inline-block; padding: 4px 14px; border-radius: 100px; margin-bottom: 12px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  }
  .aerobic   .lp-resp-badge { background: rgba(42,122,24,0.25); color: #90ee60; }
  .anaerobic .lp-resp-badge { background: var(--blood-lt); color: var(--blood); }
  .lp-resp-title {
    font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700;
    margin-bottom: 6px;
  }
  .aerobic   .lp-resp-title { color: #90ee60; }
  .anaerobic .lp-resp-title { color: var(--ink); }
  .lp-resp-atp {
    font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 900;
    line-height: 1; margin-bottom: 16px;
  }
  .aerobic   .lp-resp-atp { color: #f9d898; }
  .anaerobic .lp-resp-atp { color: var(--blood); }
  .lp-resp-atp-label {
    font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    margin-bottom: 16px;
  }
  .aerobic   .lp-resp-atp-label { color: rgba(255,255,255,0.4); }
  .anaerobic .lp-resp-atp-label { color: var(--muted); }
  .lp-resp-steps { display: flex; flex-direction: column; gap: 10px; }
  .lp-resp-step {
    display: flex; gap: 10px; font-size: 13px; line-height: 1.6;
  }
  .aerobic   .lp-resp-step { color: rgba(255,255,255,0.7); }
  .anaerobic .lp-resp-step { color: var(--ink2); }
  .lp-resp-step-dot { min-width: 6px; height: 6px; border-radius: 50%; margin-top: 7px; flex-shrink: 0; }
  .aerobic   .lp-resp-step-dot { background: #90ee60; }
  .anaerobic .lp-resp-step-dot { background: var(--blood); }
  .lp-resp-step strong { font-weight: 600; }
  .aerobic   .lp-resp-step strong { color: #f9d898; }
  .anaerobic .lp-resp-step strong { color: var(--blood); }
  @media (max-width: 620px) { .anaerobic { border-left: none; border-top: 2px solid var(--rule); } }

  /* ═══ HUMAN RESPIRATORY SYSTEM — ORGANS STRIP ═══ */
  .lp-resp-organs {
    display: flex; gap: 0; border: 1.5px solid var(--rule); border-radius: 10px;
    overflow: hidden; margin-bottom: 24px; flex-wrap: wrap;
  }
  .lp-resp-organ {
    flex: 1; min-width: 120px; padding: 16px 14px; text-align: center;
    border-right: 1px solid var(--rule); background: var(--white);
  }
  .lp-resp-organ:last-child { border-right: none; }
  .lp-resp-organ-icon { font-size: 22px; display: block; margin-bottom: 6px; }
  .lp-resp-organ-name { font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 3px; }
  .lp-resp-organ-role { font-size: 11px; color: var(--muted); line-height: 1.4; }

  /* ═══ TRANSPORT — XYLEM / PHLOEM SPLIT ═══ */
  .lp-transport-split {
    display: grid; grid-template-columns: 1fr 1fr; gap: 0;
    border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden;
    margin-bottom: 28px;
  }
  @media (max-width: 620px) { .lp-transport-split { grid-template-columns: 1fr; } }
  .lp-tp-col { padding: 22px 22px 26px; }
  .lp-tp-col.xylem  { background: linear-gradient(160deg, #1a0a00, #3a1800); }
  .lp-tp-col.phloem { background: var(--white); border-left: 2px solid var(--rule); }
  .lp-tp-badge { display: inline-block; padding: 3px 12px; border-radius: 100px; margin-bottom: 12px; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
  .xylem  .lp-tp-badge { background: rgba(212,136,10,0.2); color: #f9d898; }
  .phloem .lp-tp-badge { background: var(--leaf-lt); color: var(--leaf); }
  .lp-tp-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; margin-bottom: 4px; }
  .xylem  .lp-tp-title { color: #f9d898; }
  .phloem .lp-tp-title { color: var(--ink); }
  .lp-tp-carries { font-size: 13px; margin-bottom: 14px; }
  .xylem  .lp-tp-carries { color: rgba(255,255,255,0.55); }
  .phloem .lp-tp-carries { color: var(--muted); }
  .lp-tp-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; }
  .lp-tp-item { display: flex; gap: 8px; font-size: 13px; line-height: 1.6; }
  .xylem  .lp-tp-item { color: rgba(255,255,255,0.7); }
  .phloem .lp-tp-item { color: var(--ink2); }
  .lp-tp-dot { min-width: 6px; height: 6px; border-radius: 50%; margin-top: 7px; flex-shrink: 0; }
  .xylem  .lp-tp-dot { background: #f9d898; }
  .phloem .lp-tp-dot { background: var(--leaf); }
  .lp-tp-item strong { font-weight: 600; }
  .xylem  .lp-tp-item strong { color: #f9d898; }
  .phloem .lp-tp-item strong { color: var(--leaf2); }
  @media (max-width: 620px) { .phloem { border-left: none; border-top: 2px solid var(--rule); } }

  /* ═══ HUMAN CIRCULATION ═══ */
  .lp-circulation-card {
    background: var(--blood-lt); border: 1.5px solid var(--blood-mid);
    border-radius: 12px; padding: 28px; margin-bottom: 24px;
  }
  .lp-circ-header { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
  .lp-circ-icon { font-size: 40px; }
  .lp-circ-title-wrap {}
  .lp-circ-tag { font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--blood); margin-bottom: 4px; }
  .lp-circ-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--ink); }
  .lp-circ-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  @media (max-width: 580px) { .lp-circ-grid { grid-template-columns: 1fr; } }
  .lp-circ-item {
    background: var(--white); border-radius: 8px; padding: 14px 16px;
    border-left: 4px solid var(--blood);
  }
  .lp-circ-item:nth-child(2) { border-left-color: var(--sky); }
  .lp-circ-item:nth-child(3) { border-left-color: var(--leaf); }
  .lp-circ-item:nth-child(4) { border-left-color: var(--sun); }
  .lp-circ-item-title { font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 5px; }
  .lp-circ-item-body  { font-size: 13px; color: var(--ink2); line-height: 1.65; }
  .lp-circ-item-body strong { color: var(--blood); font-weight: 600; }

  /* ═══ HEART CHAMBERS ═══ */
  .lp-heart-chambers {
    display: grid; grid-template-columns: 1fr 1fr; gap: 2px;
    border-radius: 10px; overflow: hidden; margin-bottom: 24px; border: 1.5px solid var(--blood-mid);
  }
  .lp-chamber {
    padding: 18px 20px; background: var(--white); position: relative;
  }
  .lp-chamber::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
  .lp-chamber.ra::before { background: var(--blood); }
  .lp-chamber.rv::before { background: var(--blood); }
  .lp-chamber.la::before { background: var(--sky); }
  .lp-chamber.lv::before { background: var(--sky); }
  .lp-chamber-side { font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 4px; }
  .ra .lp-chamber-side, .rv .lp-chamber-side { color: var(--blood); }
  .la .lp-chamber-side, .lv .lp-chamber-side { color: var(--sky); }
  .lp-chamber-name { font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
  .lp-chamber-desc { font-size: 12px; color: var(--muted); line-height: 1.5; }

  /* ═══ EXCRETORY SYSTEM ═══ */
  .lp-kidney-card {
    background: var(--white); border-radius: 16px; overflow: hidden;
    border: 1.5px solid var(--rule); margin-bottom: 24px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  }
  .lp-kidney-top {
    background: linear-gradient(135deg, #300808, #5a1010);
    padding: 20px 24px; display: flex; align-items: center; gap: 16px;
  }
  .lp-kidney-icon { font-size: 36px; }
  .lp-kidney-title-wrap {}
  .lp-kidney-tag { font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(252,165,165,0.6); margin-bottom: 4px; }
  .lp-kidney-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #fff; }
  .lp-kidney-stat { margin-left: auto; text-align: right; }
  .lp-kidney-stat-num { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; color: #fca5a5; line-height: 1; }
  .lp-kidney-stat-label { font-size: 11px; color: rgba(255,255,255,0.45); }
  .lp-kidney-body { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; }
  @media (max-width: 600px) { .lp-kidney-body { grid-template-columns: 1fr; } }
  .lp-kidney-part { padding: 18px 18px; border-right: 1px solid var(--rule); }
  .lp-kidney-part:last-child { border-right: none; }
  .lp-kidney-part-icon { font-size: 20px; margin-bottom: 8px; display: block; }
  .lp-kidney-part-name { font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
  .lp-kidney-part-role { font-size: 12px; color: var(--muted); line-height: 1.55; }

  /* ═══ URINE COMPOSITION ═══ */
  .lp-urine-bar {
    background: var(--white); border: 1.5px solid var(--rule); border-radius: 10px;
    padding: 20px 22px; margin-bottom: 24px;
  }
  .lp-urine-label { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-bottom: 14px; }
  .lp-urine-track { height: 28px; border-radius: 100px; overflow: hidden; display: flex; margin-bottom: 12px; }
  .lp-urine-seg { display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; }
  .lp-urine-seg.water { background: var(--sky); color: #fff; flex: 95; }
  .lp-urine-seg.urea  { background: var(--sun); color: var(--ink); flex: 2.5; }
  .lp-urine-seg.other { background: var(--blood); color: #fff; flex: 2.5; }
  .lp-urine-legend { display: flex; gap: 20px; flex-wrap: wrap; }
  .lp-urine-legend-item { display: flex; align-items: center; gap: 7px; font-size: 12px; color: var(--muted); }
  .lp-urine-legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

  /* ═══ PLANT EXCRETION ═══ */
  .lp-plant-exc { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 24px; }
  @media (max-width: 620px) { .lp-plant-exc { grid-template-columns: 1fr 1fr; } }
  .lp-pe-card {
    background: var(--white); border-radius: 10px; padding: 18px 16px;
    border: 1.5px solid var(--rule); border-top: 3px solid var(--leaf); text-align: center;
  }
  .lp-pe-card:nth-child(2) { border-top-color: var(--sun); }
  .lp-pe-card:nth-child(3) { border-top-color: var(--sky); }
  .lp-pe-card:nth-child(4) { border-top-color: var(--blood); }
  .lp-pe-card:nth-child(5) { border-top-color: var(--bark); }
  .lp-pe-icon  { font-size: 24px; display: block; margin-bottom: 8px; }
  .lp-pe-title { font-size: 13px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
  .lp-pe-desc  { font-size: 11px; color: var(--muted); line-height: 1.5; }

  /* ═══ PULL QUOTE ═══ */
  .lp-pull-quote {
    border-left: 5px solid var(--leaf); background: var(--leaf-lt);
    padding: 22px 30px; margin: 28px 0; border-radius: 0 6px 6px 0;
  }
  .lp-pull-quote p {
    font-family: 'Playfair Display', serif; font-size: 17px; font-style: italic;
    font-weight: 700; color: var(--leaf2); line-height: 1.7; margin: 0;
  }

  /* ═══ ALERT ═══ */
  .lp-alert { padding: 12px 18px; border-radius: 8px; font-size: 14px; line-height: 1.7; margin-bottom: 16px; }
  .lp-alert.green  { background: var(--leaf-lt); color: var(--leaf2); border-left: 4px solid var(--leaf); }
  .lp-alert.gold   { background: var(--sun-lt);  color: var(--bark);  border-left: 4px solid var(--sun); }
  .lp-alert.red    { background: var(--blood-lt); color: var(--blood); border-left: 4px solid var(--blood); }
  .lp-alert.blue   { background: var(--sky-lt);  color: var(--sky);   border-left: 4px solid var(--sky); }
  .lp-alert strong { font-weight: 700; }

  /* ═══ DIVIDER ═══ */
  .lp-divider { margin: 56px 0; display: flex; align-items: center; gap: 16px; }
  .lp-divider::before, .lp-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .lp-divider-mark { width: 8px; height: 8px; border-radius: 50%; background: var(--leaf); flex-shrink: 0; }

  /* ═══ FAQ ═══ */
  .lp-faq-header { margin-bottom: 12px; }
  .lp-faq-kicker {
    font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--leaf); background: var(--leaf-lt); padding: 6px 18px; border-radius: 100px;
  }
  .lp-faq-title {
    font-family: 'Playfair Display', serif; font-size: clamp(26px, 4vw, 36px);
    font-weight: 800; color: var(--ink); letter-spacing: -0.02em; margin: 16px 0 28px;
  }
  .lp-faq-item {
    border: 1.5px solid var(--rule); border-radius: 8px; margin-bottom: 12px;
    overflow: hidden; background: var(--white); transition: border-color 0.2s;
  }
  .lp-faq-item.open { border-color: var(--leaf); }
  .lp-faq-q {
    width: 100%; background: none; border: none; cursor: pointer;
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px 24px; text-align: left; gap: 16px;
  }
  .lp-faq-q-text { font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; color: var(--ink); line-height: 1.5; }
  .lp-faq-item.open .lp-faq-q-text { color: var(--leaf); }
  .lp-faq-icon { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--leaf); flex-shrink: 0; transition: transform 0.2s; }
  .lp-faq-item.open .lp-faq-icon { transform: rotate(45deg); }
  .lp-faq-ans { font-size: 14.5px; color: var(--ink2); line-height: 1.85; padding: 0 24px; max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; }
  .lp-faq-ans.visible { max-height: 1000px; padding: 0 24px 22px; }
  .lp-faq-ans strong { color: var(--leaf2); font-weight: 600; }
  .lp-faq-ans code { font-family: 'DM Sans', monospace; font-size: 13px; background: var(--leaf-lt); padding: 1px 6px; border-radius: 3px; color: var(--leaf2); }

  @media (max-width: 700px) {
    .lp-body { padding: 48px 18px 72px; }
    .lp-sec-num { font-size: 52px; }
  }
`;

const faqs = [
  {
    q: "What is photosynthesis? Write the equation.",
    a: (<><strong>Photosynthesis</strong> is the process by which green plants synthesise food from CO₂ and water in the presence of sunlight and chlorophyll.<br /><br />
      <strong>Equation:</strong><br />
      <code>6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</code> (in presence of Sunlight and Chlorophyll)<br />
      Or simply: <code>Carbon dioxide + Water → Carbohydrate + Oxygen</code><br /><br />
      <strong>Raw materials:</strong> Chlorophyll, sunlight, CO₂, water<br />
      <strong>Products:</strong> Glucose, oxygen (and water)<br />
      <strong>Site:</strong> Leaves (contain chlorophyll in chloroplasts)</>),
  },
  {
    q: "What are the two phases of photosynthesis?",
    a: (<><strong>1. Photochemical Phase (Light reaction):</strong><br />
      Requires light. Occurs in thylakoid membranes. Involves:<br />
      • <code>NADP⁺ + e⁻ + H⁺ → NADPH</code> (enzyme-catalysed)<br />
      • <code>2O → O₂</code> (Photolysis of water)<br />
      • <code>ADP + Phosphate → ATP</code> (Phosphorylation)<br /><br />
      <strong>2. Biosynthetic Phase (Dark reaction / Calvin cycle):</strong><br />
      Does NOT require light directly — but happens during daytime as well. CO₂ is fixed using ATP and NADPH produced in the light reaction to form glucose. This is where carbohydrates are actually manufactured.<br /><br />
      <strong>Evidence:</strong> Presence of starch in leaves confirms photosynthesis has occurred.</>),
  },
  {
    q: "How is sunlight and chlorophyll proved essential for photosynthesis?",
    a: (<><strong>Experiment 1 — Sunlight is essential:</strong><br />
      1. Place a green plant in dark room for 1–2 days (to use up all stored starch).<br />
      2. Cover part of a leaf with black paper clips on both sides.<br />
      3. Expose plant to bright sunlight for a few hours.<br />
      4. Remove the leaf, decolourise with alcohol, test with iodine solution.<br />
      <strong>Result:</strong> Covered (dark) portion shows NO starch; uncovered portion shows blue-black colour (starch present). ✓ Sunlight is essential.<br /><br />
      <strong>Experiment 2 — Chlorophyll is essential:</strong><br />
      1. Use a variegated plant (has green and non-green patches e.g. croton).<br />
      2. Keep in dark 2–3 days, then expose to sunlight for 6 hours.<br />
      3. Pluck a leaf, trace the green areas, decolourise, test with iodine.<br />
      <strong>Result:</strong> Only the green (chlorophyll-containing) areas turn blue-black. ✓ Chlorophyll is essential.</>),
  },
  {
    q: "Describe the human digestive system — all organs and their functions.",
    a: (<><strong>Alimentary canal:</strong> Mouth → Pharynx → Oesophagus → Stomach → Small Intestine → Large Intestine → Rectum → Anus<br /><br />
      <strong>Mouth:</strong> Teeth (molars/premolars — chewing; canines — tearing; incisors — cutting). Salivary amylase breaks starch → sugar. Tongue helps chewing and swallowing.<br /><br />
      <strong>Oesophagus:</strong> Carries food to stomach via peristalsis (wave-like muscle movement).<br /><br />
      <strong>Stomach:</strong> Secretes mucus (protects lining), HCl (acidic medium, kills bacteria), digestive juices (pepsin — proteins → polypeptides; rennin — milk protein → curd).<br /><br />
      <strong>Small intestine (7.5 m long):</strong> Complete digestion of carbohydrates, proteins, fats. Villi increase absorption surface. Liver (bile — fat emulsification) and pancreas (amylase — starch; lipase — fats) assist here. Maltase, sucrase, lactase, peptidase complete digestion.<br /><br />
      <strong>Large intestine:</strong> Absorbs water and salts from undigested material.<br />
      <strong>Rectum/Anus:</strong> Stores and egests faeces (excretion of undigested waste).</>),
  },
  {
    q: "How does Amoeba feed? What is holozoic nutrition?",
    a: (<><strong>Holozoic nutrition</strong> involves ingestion of solid food, its digestion, absorption, and egestion of undigested waste.<br /><br />
      <strong>Amoeba's feeding process:</strong><br />
      1. Amoeba senses prey (algae, protozoans, rotifers, other small Amoeba).<br />
      2. It extends <strong>pseudopodia</strong> (false feet — finger-like projections) around the prey.<br />
      3. The prey gets engulfed and trapped in a <strong>food vacuole</strong>.<br />
      4. Digestive enzymes <strong>amylase</strong> (breaks complex carbohydrates) and <strong>protease</strong> (breaks proteins) are secreted into the food vacuole.<br />
      5. Digested food is absorbed for growth, maintenance, and multiplication.<br />
      6. Undigested food is egested out via pseudopodia.</>),
  },
  {
    q: "Compare aerobic and anaerobic respiration.",
    a: (<><strong>Aerobic respiration:</strong><br />
      • Uses molecular oxygen to oxidise food<br />
      • Yields <strong>38 ATP</strong> molecules<br />
      • Step 1: Glucose (6C) → Pyruvate (3C) in cytoplasm (glycolysis)<br />
      • Step 2: Pyruvate → CO₂ + H₂O in <strong>mitochondria</strong> (ATP produced)<br />
      • Complete oxidation of glucose<br /><br />
      <strong>Anaerobic respiration:</strong><br />
      • Does NOT use oxygen<br />
      • Yields only <strong>2 ATP</strong> molecules<br />
      • Step 1: Glycolysis in cytoplasm → 2 pyruvate<br />
      • Step 2: In <strong>yeast</strong> → ethanol + CO₂ + energy; In <strong>muscle cells</strong> → lactic acid + energy<br />
      • Lactic acid build-up in muscles causes cramps during heavy exercise</>),
  },
  {
    q: "How does transportation occur in plants? Explain xylem and phloem.",
    a: (<><strong>Transportation in plants</strong> moves food, water, and minerals between different parts.<br /><br />
      <strong>Xylem:</strong> Conducts water and minerals from soil (via roots) upward to leaves and other parts.<br />
      Transport occurs due to: (1) Transpiration pull — water evaporating from stomata creates a suction force; (2) Root pressure; (3) Difference in pressure gradient.<br /><br />
      <strong>Phloem:</strong> Transports food (mainly glucose/sucrose) from leaves (where it is made) to all other parts of the plant — including roots, growing shoots, fruits etc.<br />
      Components: companion cells, sieve tubes, phloem parenchyma, fibres.<br />
      <strong>Translocation</strong> through phloem requires energy in the form of ATP (obtained from respiration).<br /><br />
      <strong>Key difference:</strong> Xylem = upward water transport; Phloem = food transport in both directions.</>),
  },
  {
    q: "Describe the human circulatory system. What is double circulation?",
    a: (<><strong>Circulatory system</strong> consists of: the heart, blood vessels (arteries, veins, capillaries), and blood.<br /><br />
      <strong>Blood components:</strong> RBCs (carry oxygen via haemoglobin), WBCs (immunity), platelets (clotting), plasma (transports dissolved nutrients, CO₂, hormones).<br /><br />
      <strong>Blood vessels:</strong><br />
      • Arteries — carry oxygenated blood (except pulmonary artery)<br />
      • Veins — carry deoxygenated blood (except pulmonary vein)<br />
      • Capillaries — thin-walled, allow exchange of gases/nutrients<br /><br />
      <strong>Heart chambers:</strong> Right auricle, right ventricle (receives/pumps deoxygenated blood from body), left auricle, left ventricle (receives/pumps oxygenated blood from lungs).<br /><br />
      <strong>Double circulation:</strong> Blood passes through the heart <strong>twice</strong> in each cardiac cycle — once through the pulmonary circuit (heart → lungs → heart) and once through the systemic circuit (heart → body → heart). Ensures efficient delivery of oxygen.</>),
  },
  {
    q: "Describe the human excretory system. How is urine formed?",
    a: (<><strong>Excretion</strong> is the removal of harmful metabolic waste products from the body.<br /><br />
      <strong>Human excretory system:</strong> Pair of kidneys → ureters → urinary bladder → urethra<br /><br />
      <strong>Kidney:</strong> Main excretory organ. Divided into outer cortex and inner medulla. Basic unit = <strong>nephron</strong> (components: glomerulus, Bowman's capsule, renal tubule).<br /><br />
      <strong>Urine formation in nephron:</strong><br />
      1. Blood is filtered in glomerulus (under pressure) into Bowman's capsule<br />
      2. Useful substances (glucose, water, salts) are reabsorbed in renal tubule<br />
      3. Remaining waste fluid (urine) passes to ureter<br /><br />
      <strong>Urine composition:</strong> 95% water, 2.5% urea, 2.5% other waste products. Human kidneys produce 1–1.8 L urine per day.<br /><br />
      <strong>Dialysis:</strong> Used when kidneys fail — blood is filtered through an artificial kidney machine.</>),
  },
  {
    q: "How do plants excrete waste products?",
    a: (<>Plants use several strategies to remove metabolic wastes:<br /><br />
      1. <strong>Stomata:</strong> Oxygen (by-product of photosynthesis) and CO₂ (from respiration) are released through stomata.<br />
      2. <strong>Transpiration:</strong> Excess water absorbed from roots is lost as water vapour through stomata. This is the main way plants lose water.<br />
      3. <strong>Vacuoles:</strong> Some waste products (resins, gums, tannins) are stored in cell vacuoles.<br />
      4. <strong>Old xylem tissues:</strong> Waste materials are stored here permanently.<br />
      5. <strong>Leaves:</strong> Some waste products accumulate in leaves — when leaves fall, wastes are removed with them.<br />
      6. <strong>Roots:</strong> Some plants excrete waste materials through their roots into the soil.</>),
  },
  {
    q: "What is transpiration? What is its significance?",
    a: (<><strong>Transpiration</strong> is the evaporation of water from plant surfaces, primarily through <strong>stomata</strong> on leaves.<br /><br />
      <strong>Process:</strong> Water absorbed by roots travels up through xylem vessels to leaves. At the leaf surface, water evaporates through stomata openings into the atmosphere.<br /><br />
      <strong>Significance / Importance:</strong><br />
      1. Creates <strong>transpiration pull</strong> — the main force that drives upward movement of water in tall plants<br />
      2. Cools the plant (evaporative cooling)<br />
      3. Helps in absorption and upward movement of mineral nutrients<br />
      4. Maintains water balance in the plant<br />
      5. Acts as a method of <strong>excretion</strong> — removes excess water<br /><br />
      <strong>Stomata:</strong> Each stoma is surrounded by two guard cells that control opening and closing.</>),
  },
  {
    q: "What is the role of haemoglobin in transport?",
    a: (<><strong>Haemoglobin</strong> is the red-coloured respiratory pigment found in RBCs (red blood cells).<br /><br />
      <strong>Functions:</strong><br />
      1. <strong>Oxygen transport:</strong> Haemoglobin combines with oxygen in the lungs (where O₂ concentration is high) to form oxyhaemoglobin. This is then transported to body cells where O₂ is released for cellular respiration.<br />
      2. <strong>CO₂ transport:</strong> Some CO₂ (waste product of respiration) is transported by haemoglobin back to the lungs for exhalation. (Most CO₂ is transported as bicarbonate ions in plasma.)<br /><br />
      <strong>Without haemoglobin:</strong> Blood would carry far too little oxygen to sustain life — haemoglobin increases blood's oxygen-carrying capacity about 70 times.</>),
  },
];

export default function LifeProcesses() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="lp-root">

        {/* ═══ HERO ═══ */}
        <div className="lp-hero">
          <div className="lp-hero-left">
            <div className="lp-subject-pill">
              <div className="lp-subject-dot" />
              Biology · Class 10 · Chapter 1
            </div>
            <div className="lp-hero-eyebrow">Science — CBSE / NCERT</div>
            <h1 className="lp-hero-title">Life</h1>
            <span className="lp-hero-title-italic">Processes</span>
            <p className="lp-hero-desc">
              Every living organism — from a single-celled Amoeba to the human body — performs essential life processes: nutrition, respiration, transportation, and excretion. This chapter covers them all.
            </p>
            <div className="lp-hero-meta">
              {[
                { label: "Subject",   value: "Biology" },
                { label: "Class",     value: "10th Standard" },
                { label: "Chapter",   value: "Chapter 1" },
                { label: "Board",     value: "CBSE / NCERT" },
              ].map(x => (
                <div className="lp-meta-item" key={x.label}>
                  <div className="lp-meta-label">{x.label}</div>
                  <div className="lp-meta-value">{x.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="lp-hero-right">
            <div className="lp-hero-cells" />
            <div className="lp-hero-leaf-pattern" />
            {/* Illustrated plant SVG */}
            <svg className="lp-hero-illustration" viewBox="0 0 480 600" xmlns="http://www.w3.org/2000/svg">
              {/* Sky background */}
              <rect width="480" height="600" fill="none"/>
              {/* Sun rays */}
              <circle cx="380" cy="80" r="50" fill="rgba(249,216,152,0.12)"/>
              <circle cx="380" cy="80" r="35" fill="rgba(249,216,152,0.18)"/>
              <circle cx="380" cy="80" r="22" fill="rgba(249,216,152,0.3)"/>
              {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i) => (
                <line key={i}
                  x1={380 + 26*Math.cos(deg*Math.PI/180)}
                  y1={80  + 26*Math.sin(deg*Math.PI/180)}
                  x2={380 + 55*Math.cos(deg*Math.PI/180)}
                  y2={80  + 55*Math.sin(deg*Math.PI/180)}
                  stroke="rgba(249,216,152,0.35)" strokeWidth="2" strokeLinecap="round"/>
              ))}
              {/* Sunlight arrows */}
              <line x1="320" y1="60" x2="200" y2="220" stroke="rgba(249,216,152,0.3)" strokeWidth="1.5" strokeDasharray="6,4"/>
              <line x1="350" y1="90" x2="230" y2="270" stroke="rgba(249,216,152,0.25)" strokeWidth="1.5" strokeDasharray="6,4"/>
              <line x1="310" y1="100" x2="160" y2="290" stroke="rgba(249,216,152,0.2)" strokeWidth="1.5" strokeDasharray="6,4"/>
              {/* Soil */}
              <rect x="0" y="490" width="480" height="110" fill="rgba(74,48,24,0.5)" rx="0"/>
              <rect x="0" y="490" width="480" height="8" fill="rgba(58,88,48,0.6)"/>
              {/* Stem */}
              <path d="M240 490 Q238 400 240 310 Q242 240 238 180" stroke="rgba(90,160,60,0.9)" strokeWidth="8" fill="none" strokeLinecap="round"/>
              {/* Roots */}
              <path d="M240 490 Q220 520 190 540" stroke="rgba(120,80,40,0.5)" strokeWidth="4" fill="none" strokeLinecap="round"/>
              <path d="M240 490 Q260 525 290 545" stroke="rgba(120,80,40,0.5)" strokeWidth="4" fill="none" strokeLinecap="round"/>
              <path d="M235 510 Q210 540 185 560" stroke="rgba(120,80,40,0.4)" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M245 510 Q270 542 295 562" stroke="rgba(120,80,40,0.4)" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M238 530 Q240 560 238 580" stroke="rgba(120,80,40,0.35)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              {/* Water drops near roots */}
              <ellipse cx="170" cy="530" rx="4" ry="6" fill="rgba(100,180,255,0.5)"/>
              <ellipse cx="310" cy="535" rx="4" ry="6" fill="rgba(100,180,255,0.5)"/>
              <ellipse cx="200" cy="555" rx="3" ry="5" fill="rgba(100,180,255,0.4)"/>
              {/* Big leaf left */}
              <path d="M238 300 Q170 240 140 200 Q180 210 200 240 Q180 190 200 160 Q230 200 238 250 Z"
                fill="rgba(60,160,40,0.85)" stroke="rgba(40,120,20,0.6)" strokeWidth="1"/>
              <path d="M238 300 Q200 260 180 230" stroke="rgba(40,120,20,0.5)" strokeWidth="1" fill="none"/>
              <path d="M230 280 Q195 255 178 240" stroke="rgba(40,120,20,0.4)" strokeWidth="0.8" fill="none"/>
              {/* Big leaf right */}
              <path d="M240 260 Q310 200 350 165 Q310 185 298 215 Q315 170 300 148 Q268 185 250 230 Z"
                fill="rgba(50,150,30,0.85)" stroke="rgba(30,110,15,0.6)" strokeWidth="1"/>
              <path d="M240 260 Q285 220 310 195" stroke="rgba(30,110,15,0.5)" strokeWidth="1" fill="none"/>
              {/* Medium leaf */}
              <path d="M238 380 Q180 340 160 310 Q190 320 205 345 Q185 305 200 285 Q225 315 235 355 Z"
                fill="rgba(70,170,50,0.8)" stroke="rgba(40,120,20,0.5)" strokeWidth="1"/>
              {/* Small leaf right */}
              <path d="M241 340 Q290 310 310 290 Q285 300 278 320 Q292 285 280 270 Q258 295 248 325 Z"
                fill="rgba(65,165,45,0.8)" stroke="rgba(35,115,15,0.5)" strokeWidth="1"/>
              {/* CO2 arrows in */}
              <text x="92" y="225" fill="rgba(255,255,255,0.7)" fontSize="11" fontWeight="600" fontFamily="DM Sans, sans-serif">CO₂</text>
              <line x1="148" y1="222" x2="170" y2="222" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" markerEnd="url(#arr)"/>
              {/* O2 arrows out */}
              <text x="92" y="268" fill="rgba(144,238,100,0.8)" fontSize="11" fontWeight="600" fontFamily="DM Sans, sans-serif">O₂</text>
              <line x1="148" y1="264" x2="170" y2="252" stroke="rgba(144,238,100,0.5)" strokeWidth="1.5"/>
              {/* Chlorophyll label */}
              <text x="292" y="185" fill="rgba(144,238,100,0.7)" fontSize="10" fontFamily="DM Sans, sans-serif" fontWeight="600">Chlorophyll</text>
              <line x1="290" y1="190" x2="278" y2="200" stroke="rgba(144,238,100,0.4)" strokeWidth="1"/>
              {/* Water label */}
              <text x="155" y="500" fill="rgba(100,180,255,0.7)" fontSize="10" fontFamily="DM Sans, sans-serif" fontWeight="600">Water &amp; Minerals</text>
              {/* Light energy label */}
              <text x="302" y="58" fill="rgba(249,216,152,0.8)" fontSize="11" fontFamily="DM Sans, sans-serif" fontWeight="700">Light energy</text>
              <defs>
                <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,255,255,0.4)"/>
                </marker>
              </defs>
            </svg>
          </div>
        </div>

        <div className="lp-body">

          {/* Intro */}
          <div className="lp-intro">
            <div className="lp-intro-text">
              <div className="lp-intro-kicker">Chapter Overview</div>
              <h2 className="lp-intro-headline">The Four Essential <em>Life Processes</em></h2>
              <p className="lp-intro-body">
                A living organism is defined not just by its structure, but by the <strong>processes it performs</strong> to stay alive. These life processes include obtaining and using food (nutrition), breaking food down for energy (respiration), moving substances within the body (transportation), and removing metabolic wastes (excretion).
              </p>
              <p className="lp-intro-body">
                This chapter studies each of these processes in both <strong>plants and humans</strong> — from the elegant chemistry of a leaf in sunlight to the beating of a four-chambered heart.
              </p>
            </div>
            <div className="lp-intro-sidebar">
              <div className="lp-sidebar-label">Topics in this chapter</div>
              <div className="lp-sidebar-title">Life Processes</div>
              <ul className="lp-sidebar-list">
                {[
                  ["1", "Autotrophic Nutrition & Photosynthesis"],
                  ["2", "Heterotrophic Nutrition & Human Digestion"],
                  ["3", "Respiration — Aerobic & Anaerobic"],
                  ["4", "Transportation — Plants & Humans"],
                  ["5", "Excretion — Kidneys & Plants"],
                ].map(([n, t]) => (
                  <li className="lp-sidebar-item" key={n}>
                    <span className="lp-sidebar-num">{n}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ══ CHAPTER 1: NUTRITION ══ */}
          <div className="lp-chapter-divider">
            <div className="lp-chapter-pill">
              <span className="lp-chapter-pill-num">01</span>
              <span className="lp-chapter-pill-text">Nutrition</span>
            </div>
          </div>

          <div className="lp-sec-head">
            <span className="lp-sec-num">1</span>
            <div className="lp-sec-kicker">How Living Things Get Food</div>
            <h2 className="lp-sec-title">Autotrophic Nutrition <span>&amp; Photosynthesis</span></h2>
          </div>

          <p className="lp-body-text">
            <strong>Autotrophic nutrition</strong> is the synthesis of food using simple inorganic substances. Green plants, algae, and some bacteria perform it via <strong>photosynthesis</strong> — they are called <strong>producers</strong> and form the first link of every food chain on Earth.
          </p>

          {/* Photosynthesis illustrated equation card */}
          <div className="lp-photo-card">
            <div className="lp-photo-card-top">
              <div className="lp-photo-label">The Equation of Life</div>
              <div className="lp-photo-equation">
                <div className="lp-photo-eq-item">
                  <span className="lp-photo-eq-formula">6CO<sub>2</sub></span>
                  <span className="lp-photo-eq-name">Carbon dioxide</span>
                </div>
                <span className="lp-photo-eq-plus">+</span>
                <div className="lp-photo-eq-item">
                  <span className="lp-photo-eq-formula">6H<sub>2</sub>O</span>
                  <span className="lp-photo-eq-name">Water</span>
                </div>
                <div className="lp-photo-eq-cond">
                  <span>Sunlight</span>
                  <span style={{borderTop:"1px solid rgba(255,255,255,0.2)",paddingTop:"2px"}}>Chlorophyll</span>
                </div>
                <span className="lp-photo-eq-arrow">→</span>
                <div className="lp-photo-eq-item">
                  <span className="lp-photo-eq-formula">C<sub>6</sub>H<sub>12</sub>O<sub>6</sub></span>
                  <span className="lp-photo-eq-name">Glucose</span>
                </div>
                <span className="lp-photo-eq-plus">+</span>
                <div className="lp-photo-eq-item">
                  <span className="lp-photo-eq-formula">6O<sub>2</sub></span>
                  <span className="lp-photo-eq-name">Oxygen</span>
                </div>
              </div>
            </div>
            <div className="lp-photo-card-body">
              {[
                { icon:"☀️", name:"Sunlight",    desc:"Ultimate energy source. Trapped by chlorophyll." },
                { icon:"🌿", name:"Chlorophyll", desc:"Green pigment in leaves. Converts light → chemical energy." },
                { icon:"💨", name:"CO₂",         desc:"Absorbed from air through stomata on leaf surface." },
                { icon:"💧", name:"Water",        desc:"Absorbed from soil by roots, transported to leaves." },
              ].map(r => (
                <div className="lp-photo-raw" key={r.name}>
                  <span className="lp-photo-raw-icon">{r.icon}</span>
                  <div className="lp-photo-raw-name">{r.name}</div>
                  <div className="lp-photo-raw-desc">{r.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Two phases */}
          <p className="lp-body-text">Photosynthesis occurs in <strong>two phases</strong>:</p>
          <div className="lp-phases">
            <div className="lp-phase-card">
              <div className="lp-phase-hdr light">
                <div className="lp-phase-tag">Phase 1</div>
                <div className="lp-phase-name">Photochemical Phase ☀️</div>
              </div>
              <div className="lp-phase-body">
                {[
                  ["Requires","Direct sunlight"],
                  ["Location","Thylakoid membranes of chloroplast"],
                  ["Photolysis","Water molecules are split"],
                  ["Products","ATP (energy), NADPH, O₂ released"],
                ].map(([k,v]) => (
                  <div className="lp-phase-item" key={k}>
                    <span className="lp-phase-dot light-dot"/>
                    <span><strong>{k}:</strong> {v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lp-phase-card">
              <div className="lp-phase-hdr dark">
                <div className="lp-phase-tag">Phase 2</div>
                <div className="lp-phase-name">Biosynthetic Phase 🌙</div>
              </div>
              <div className="lp-phase-body">
                {[
                  ["Requires","Does not require light directly"],
                  ["Timing","Occurs during daytime as well"],
                  ["Process","CO₂ fixed using ATP and NADPH"],
                  ["Products","Glucose (carbohydrate) synthesised"],
                ].map(([k,v]) => (
                  <div className="lp-phase-item" key={k}>
                    <span className="lp-phase-dot dark-dot"/>
                    <span><strong>{k}:</strong> {v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Photolysis reactions */}
          <div className="lp-reactions-box">
            <div className="lp-reactions-label">⚗️ Reactions in the Photochemical Phase (Photolysis)</div>
            <div className="lp-rxn-row">
              <span className="lp-rxn-num">(i)</span>
              <span className="lp-rxn-f">NADP<sup>+</sup></span>
              <span className="lp-rxn-plus">+</span>
              <span className="lp-rxn-f">e<sup>–</sup></span>
              <span className="lp-rxn-plus">+</span>
              <span className="lp-rxn-f">H<sup>+</sup></span>
              <span className="lp-rxn-cond">enzyme</span>
              <span className="lp-rxn-arr">→</span>
              <span className="lp-rxn-f">NADPH</span>
              <span className="lp-rxn-note">Reduction of NADP</span>
            </div>
            <div className="lp-rxn-row">
              <span className="lp-rxn-num">(ii)</span>
              <span className="lp-rxn-f">2O</span>
              <span className="lp-rxn-arr">→</span>
              <span className="lp-rxn-f">O<sub>2</sub></span>
              <span className="lp-rxn-note">Oxygen released</span>
            </div>
            <div className="lp-rxn-row">
              <span className="lp-rxn-num">(iii)</span>
              <span className="lp-rxn-f">ADP</span>
              <span className="lp-rxn-plus">+</span>
              <span className="lp-rxn-f">Phosphate</span>
              <span className="lp-rxn-arr">→</span>
              <span className="lp-rxn-f">ATP</span>
              <span className="lp-rxn-note">Phosphorylation — energy stored</span>
            </div>
          </div>

          <div className="lp-alert green">
            🌿 <strong>Key fact:</strong> The presence of starch in leaves confirms that photosynthesis has occurred. Iodine solution turns blue-black in the presence of starch. Sun is the <strong>ultimate source of energy</strong> — all life on Earth depends on photosynthesis.
          </div>

          {/* Heterotrophic Nutrition */}
          <div className="lp-divider"><div className="lp-divider-mark"/></div>
          <div className="lp-sec-head">
            <span className="lp-sec-num">2</span>
            <div className="lp-sec-kicker">Types of Eaters</div>
            <h2 className="lp-sec-title">Heterotrophic <span>Nutrition</span></h2>
          </div>
          <p className="lp-body-text">
            <strong>Heterotrophs</strong> cannot make their own food — they depend on other organisms. They include herbivores, carnivores, omnivores, decomposers, and organisms that use holozoic, parasitic, or saprophytic modes of nutrition.
          </p>

          <div className="lp-nutrition-types">
            <div className="lp-nt-card">
              <div className="lp-nt-hdr auto">
                <span className="lp-nt-icon">🌱</span>
                <div className="lp-nt-name">Autotrophs</div>
                <div className="lp-nt-sub">Producers — make own food</div>
              </div>
              <div className="lp-nt-body">
                {["Green plants, algae, some bacteria","Use photosynthesis or chemosynthesis","Form first link in all food chains","Called producers — source of energy for all"].map((t,i) => (
                  <div className="lp-nt-item" key={i}><span className="lp-nt-dot auto-dot"/><span>{t}</span></div>
                ))}
              </div>
            </div>
            <div className="lp-nt-card">
              <div className="lp-nt-hdr hetero">
                <span className="lp-nt-icon">🦁</span>
                <div className="lp-nt-name">Heterotrophs</div>
                <div className="lp-nt-sub">Consumers — depend on others</div>
              </div>
              <div className="lp-nt-body">
                {[
                  <><strong>Herbivores</strong> — eat plants directly (cow, rabbit)</>,
                  <><strong>Carnivores</strong> — eat herbivores (lion, eagle)</>,
                  <><strong>Omnivores</strong> — eat both (bear, rat, humans)</>,
                  <><strong>Decomposers</strong> — break down dead matter (bacteria, fungi)</>,
                ].map((t,i) => (
                  <div className="lp-nt-item" key={i}><span className="lp-nt-dot hetero-dot"/><span>{t}</span></div>
                ))}
              </div>
            </div>
            <div className="lp-nt-card">
              <div className="lp-nt-hdr special">
                <span className="lp-nt-icon">🔬</span>
                <div className="lp-nt-name">3 Types of Heterotrophic</div>
                <div className="lp-nt-sub">Feeding strategies</div>
              </div>
              <div className="lp-nt-body">
                {[
                  <><strong>Holozoic</strong> — solid food ingested, digested inside (Amoeba, humans)</>,
                  <><strong>Parasitic</strong> — feeds on living host (tapeworm, lice, Cuscuta)</>,
                  <><strong>Saprophytic</strong> — absorbs nutrients from dead matter (Rhizopus, mushroom)</>,
                ].map((t,i) => (
                  <div className="lp-nt-item" key={i}><span className="lp-nt-dot special-dot"/><span>{t}</span></div>
                ))}
              </div>
            </div>
          </div>

          {/* Human Digestive System */}
          <div className="lp-divider"><div className="lp-divider-mark"/></div>
          <div className="lp-sec-head">
            <span className="lp-sec-num">3</span>
            <div className="lp-sec-kicker">Human Nutrition</div>
            <h2 className="lp-sec-title">The Human <span>Digestive System</span></h2>
          </div>
          <p className="lp-body-text">
            <strong>Digestion</strong> is the mechanical and chemical reduction of ingested food into small molecules that can be absorbed. The human alimentary canal is about <strong>9 metres long</strong> from mouth to anus.
          </p>

          {/* Teeth */}
          <div className="lp-teeth-grid">
            {[
              { icon:"🦷", name:"Incisors",   count:"4 per jaw", role:"Cutting & biting food" },
              { icon:"🦴", name:"Canines",    count:"2 per jaw", role:"Piercing & tearing food" },
              { icon:"🔲", name:"Premolars",  count:"4 per jaw", role:"Chewing & grinding food" },
              { icon:"⬛", name:"Molars",     count:"6 per jaw", role:"Chewing & grinding food" },
            ].map(t => (
              <div className="lp-tooth-card" key={t.name}>
                <span className="lp-tooth-icon">{t.icon}</span>
                <div className="lp-tooth-name">{t.name}</div>
                <div className="lp-tooth-count">{t.count}</div>
                <div className="lp-tooth-role">{t.role}</div>
              </div>
            ))}
          </div>

          <div className="lp-alert gold">
            💡 Humans have <strong>two sets of teeth</strong> in their lifetime — milk teeth (deciduous) and permanent teeth. Saliva contains <strong>salivary amylase</strong> which begins starch → sugar digestion right in the mouth.
          </div>

          {/* Digestion flow */}
          <div className="lp-digestion-flow">
            <div className="lp-df-header">
              <span style={{fontSize:"20px"}}>🫁</span>
              <div className="lp-df-header-title">Journey of Food — Alimentary Canal</div>
              <div className="lp-df-header-sub">~9 metres from mouth to anus</div>
            </div>
            <div className="lp-df-body">
              <div className="lp-df-steps">
                {[
                  { emoji:"👄", organ:"Mouth", detail:<>Teeth break food mechanically. <strong>Salivary amylase</strong> (in saliva) begins chemical digestion — starch → maltose/sugar. Tongue helps chewing and swallowing.</>, enzymes:[] },
                  { emoji:"🌀", organ:"Oesophagus", detail:<>No digestion here. Food is pushed down to stomach by <strong>peristalsis</strong> — wave-like contractions of the muscular walls.</>, enzymes:[] },
                  { emoji:"🫙", organ:"Stomach", detail:<>Mixes food with digestive juices. Inner lining secretes: <strong>Mucus</strong> (protects lining), <strong>HCl</strong> (acidic medium, kills bacteria), digestive enzymes.</>,
                    enzymes:[["Pepsin","Proteins → Polypeptides"],["Rennin","Soluble milk protein → Curd"]] },
                  { emoji:"🧫", organ:"Small Intestine", detail:<>Longest part (~7.5 m). <strong>Complete digestion</strong> of carbohydrates, proteins and fats. <strong>Villi</strong> (finger-like projections) absorb digested food. Liver (bile — fat emulsification) and pancreas assist.</>,
                    enzymes:[["Amylase","Starch → Maltose"],["Lipase","Fats → Fatty acids + Glycerol"],["Maltase","Maltose → Glucose"],["Sucrase","Sucrose → Glucose"],["Lactase","Lactose → Glucose"],["Peptidase","Polypeptides → Amino acids"]] },
                  { emoji:"💧", organ:"Large Intestine", detail:<>Receives undigested and unabsorbed material. <strong>Absorbs water and salts</strong>. Remaining waste becomes semi-solid faeces stored in rectum.</>, enzymes:[] },
                  { emoji:"🚪", organ:"Anus (Egestion)", detail:<>Undigested waste is expelled from the body as <strong>faeces</strong>. This process is called <strong>egestion</strong>.</>, enzymes:[] },
                ].map((s, i) => (
                  <div className="lp-df-step" key={i}>
                    <div className="lp-df-step-left">
                      <div className="lp-df-step-circle">{s.emoji}</div>
                      <div className="lp-df-step-line"/>
                    </div>
                    <div className="lp-df-step-content">
                      <div className="lp-df-step-organ">{s.organ}</div>
                      <div className="lp-df-step-detail">{s.detail}</div>
                      {s.enzymes.length > 0 && (
                        <div className="lp-df-enzyme-row">
                          {s.enzymes.map(([e,a]) => (
                            <span className="lp-df-enzyme" key={e}>
                              <strong>{e}</strong>
                              <span className="lp-df-enzyme-arrow">→</span>
                              <span>{a}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Amoeba */}
          <div className="lp-pull-quote">
            <p>"Amoeba — a single-celled organism — demonstrates holozoic nutrition with astonishing elegance: it extends pseudopodia (false feet) to engulf prey into a food vacuole, digests it there, absorbs the nutrients, and ejects the waste — all without a single specialised organ."</p>
          </div>

          <div className="lp-amoeba-strip">
            <div className="lp-amoeba-label">🔬 Amoeba — How it feeds (Holozoic Nutrition)</div>
            <div className="lp-amoeba-steps">
              {[
                { icon:"🟢", bg:"rgba(42,122,24,0.25)", name:"Ingestion", desc:"Pseudopodia extend around prey and engulf it" },
                { icon:"🫧", bg:"rgba(20,68,168,0.25)", name:"Food Vacuole", desc:"Prey trapped inside food vacuole" },
                { icon:"⚗️", bg:"rgba(184,136,10,0.25)", name:"Digestion", desc:"Amylase & protease secreted into vacuole" },
                { icon:"✅", bg:"rgba(10,120,120,0.25)", name:"Absorption", desc:"Digested food absorbed for growth" },
                { icon:"🚪", bg:"rgba(192,26,24,0.25)", name:"Egestion", desc:"Undigested waste expelled via pseudopodia" },
              ].map(s => (
                <div className="lp-amoeba-step" key={s.name}>
                  <div className="lp-amoeba-circle" style={{background: s.bg}}>{s.icon}</div>
                  <div className="lp-amoeba-step-name">{s.name}</div>
                  <div className="lp-amoeba-step-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ══ CHAPTER 2: RESPIRATION ══ */}
          <div className="lp-chapter-divider">
            <div className="lp-chapter-pill">
              <span className="lp-chapter-pill-num">02</span>
              <span className="lp-chapter-pill-text">Respiration</span>
            </div>
          </div>

          <div className="lp-sec-head">
            <span className="lp-sec-num">4</span>
            <div className="lp-sec-kicker">Energy Release</div>
            <h2 className="lp-sec-title">Respiration — <span>Aerobic &amp; Anaerobic</span></h2>
          </div>
          <p className="lp-body-text">
            <strong>Respiration</strong> is the process by which living organisms break down food (glucose) to release energy in the form of ATP. It involves the consumption of oxygen and liberation of CO₂ and water.
          </p>

          {/* Aerobic vs Anaerobic */}
          <div className="lp-resp-compare">
            <div className="lp-resp-col aerobic">
              <span className="lp-resp-badge">With Oxygen</span>
              <div className="lp-resp-title">Aerobic Respiration</div>
              <div className="lp-resp-atp">38</div>
              <div className="lp-resp-atp-label">ATP molecules produced</div>
              <div className="lp-resp-steps">
                {[
                  <><strong>Step 1 — Glycolysis (Cytoplasm):</strong> Glucose (6C) → 2 Pyruvate (3C)</>,
                  <><strong>Step 2 — Krebs Cycle (Mitochondria):</strong> Pyruvate → CO₂ + H₂O</>,
                  <><strong>Products:</strong> CO₂, water, 38 ATP</>,
                  <><strong>Location:</strong> Cytoplasm → Mitochondria</>,
                  <><strong>Examples:</strong> All higher organisms, most cells</>,
                ].map((t,i) => (
                  <div className="lp-resp-step" key={i}>
                    <span className="lp-resp-step-dot"/>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lp-resp-col anaerobic">
              <span className="lp-resp-badge">Without Oxygen</span>
              <div className="lp-resp-title">Anaerobic Respiration</div>
              <div className="lp-resp-atp">2</div>
              <div className="lp-resp-atp-label">ATP molecules produced</div>
              <div className="lp-resp-steps">
                {[
                  <><strong>Step 1 — Glycolysis (Cytoplasm):</strong> Glucose → 2 Pyruvate</>,
                  <><strong>In Yeast:</strong> Pyruvate → Ethanol + CO₂ + Energy</>,
                  <><strong>In Muscle cells:</strong> Pyruvate → Lactic acid + Energy</>,
                  <><strong>Lactic acid</strong> build-up causes muscle cramps during exercise</>,
                  <><strong>Used by:</strong> Yeast (fermentation), bacteria, muscle cells</>,
                ].map((t,i) => (
                  <div className="lp-resp-step" key={i}>
                    <span className="lp-resp-step-dot"/>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Human respiratory system */}
          <p className="lp-body-text"><strong>Human respiratory system</strong> includes the following organs in order:</p>
          <div className="lp-resp-organs">
            {[
              { icon:"👃", name:"Nose / Nasal Cavity", role:"Filters, warms, and humidifies air" },
              { icon:"🫁", name:"Pharynx", role:"Passage for air to trachea" },
              { icon:"🌀", name:"Trachea", role:"Windpipe — carries air to lungs" },
              { icon:"🌿", name:"Bronchi", role:"Two branches into each lung" },
              { icon:"🔀", name:"Bronchioles", role:"Further branch within lungs" },
              { icon:"🫧", name:"Alveoli", role:"Tiny air sacs — site of gas exchange" },
            ].map(o => (
              <div className="lp-resp-organ" key={o.name}>
                <span className="lp-resp-organ-icon">{o.icon}</span>
                <div className="lp-resp-organ-name">{o.name}</div>
                <div className="lp-resp-organ-role">{o.role}</div>
              </div>
            ))}
          </div>

          <div className="lp-alert blue">
            🫧 <strong>Alveoli</strong> are the sites of gas exchange. O₂ from alveoli passes into blood; CO₂ from blood passes into alveoli to be exhaled. <strong>Haemoglobin</strong> in RBCs is the respiratory pigment responsible for transporting both O₂ and CO₂.
          </div>

          {/* ══ CHAPTER 3: TRANSPORTATION ══ */}
          <div className="lp-chapter-divider">
            <div className="lp-chapter-pill">
              <span className="lp-chapter-pill-num">03</span>
              <span className="lp-chapter-pill-text">Transportation</span>
            </div>
          </div>

          <div className="lp-sec-head">
            <span className="lp-sec-num">5</span>
            <div className="lp-sec-kicker">Moving Substances Around</div>
            <h2 className="lp-sec-title">Transportation in <span>Plants &amp; Humans</span></h2>
          </div>
          <p className="lp-body-text">
            <strong>Transportation</strong> is a life process where substances synthesised or absorbed in one part of the organism are carried to other parts. In plants, xylem and phloem serve this role; in humans, the circulatory system does.
          </p>

          {/* Xylem / Phloem */}
          <div className="lp-transport-split">
            <div className="lp-tp-col xylem">
              <span className="lp-tp-badge">Water Transport</span>
              <div className="lp-tp-title">🌊 Xylem</div>
              <div className="lp-tp-carries">Carries: Water + Minerals (upward)</div>
              <ul className="lp-tp-list">
                {[
                  <><strong>Source:</strong> Soil → Roots → Stem → Leaves</>,
                  <><strong>Transpiration pull</strong> — main force driving water upward</>,
                  <strong>Root pressure</strong>,
                  "Difference in pressure gradient",
                  "One-way upward transport",
                  "Dead cells form xylem vessels",
                ].map((t,i) => (
                  <li className="lp-tp-item" key={i}><span className="lp-tp-dot"/><span>{t}</span></li>
                ))}
              </ul>
            </div>
            <div className="lp-tp-col phloem">
              <span className="lp-tp-badge">Food Transport</span>
              <div className="lp-tp-title">🍃 Phloem</div>
              <div className="lp-tp-carries">Carries: Food / Sucrose (both directions)</div>
              <ul className="lp-tp-list">
                {[
                  <><strong>Source:</strong> Leaves → all other parts</>,
                  "Process called translocation",
                  <><strong>Requires energy (ATP)</strong> from respiration</>,
                  "Components: sieve tubes, companion cells, phloem parenchyma, fibres",
                  "Transports sucrose, amino acids, hormones",
                  "Living cells form phloem",
                ].map((t,i) => (
                  <li className="lp-tp-item" key={i}><span className="lp-tp-dot"/><span>{t}</span></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Human circulation */}
          <div className="lp-circulation-card">
            <div className="lp-circ-header">
              <span className="lp-circ-icon">❤️</span>
              <div className="lp-circ-title-wrap">
                <div className="lp-circ-tag">Human Circulatory System</div>
                <div className="lp-circ-title">Heart, Blood &amp; Blood Vessels</div>
              </div>
            </div>
            <div className="lp-circ-grid">
              {[
                { title:"Double Circulation", body:<>Blood passes through the heart <strong>twice</strong> per cardiac cycle — pulmonary circuit (heart→lungs→heart) and systemic circuit (heart→body→heart).</> },
                { title:"Blood Components", body:<><strong>RBCs</strong> (carry O₂ via haemoglobin), <strong>WBCs</strong> (immunity), <strong>Platelets</strong> (clotting), <strong>Plasma</strong> (transports nutrients, hormones, CO₂).</> },
                { title:"Blood Vessels", body:<><strong>Arteries</strong> — oxygenated blood (except pulmonary artery). <strong>Veins</strong> — deoxygenated blood (except pulmonary vein). <strong>Capillaries</strong> — exchange of gases and nutrients.</> },
                { title:"Lymphatic System", body:<>Transports <strong>immune cells (lymphocytes)</strong>. Lymph — a colourless fluid — returns to the blood after collecting waste from tissues.</> },
              ].map(c => (
                <div className="lp-circ-item" key={c.title}>
                  <div className="lp-circ-item-title">{c.title}</div>
                  <div className="lp-circ-item-body">{c.body}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Heart chambers */}
          <p className="lp-body-text">The human heart has <strong>four chambers</strong>:</p>
          <div className="lp-heart-chambers">
            {[
              { cls:"ra", side:"Right Side", name:"Right Auricle", desc:"Receives deoxygenated blood from all parts of body" },
              { cls:"la", side:"Left Side",  name:"Left Auricle",  desc:"Receives oxygenated blood from the lungs" },
              { cls:"rv", side:"Right Side", name:"Right Ventricle", desc:"Pumps deoxygenated blood to lungs (pulmonary circuit)" },
              { cls:"lv", side:"Left Side",  name:"Left Ventricle",  desc:"Pumps oxygenated blood to entire body (systemic circuit)" },
            ].map(c => (
              <div className={`lp-chamber ${c.cls}`} key={c.name}>
                <div className="lp-chamber-side">{c.side}</div>
                <div className="lp-chamber-name">{c.name}</div>
                <div className="lp-chamber-desc">{c.desc}</div>
              </div>
            ))}
          </div>

          {/* ══ CHAPTER 4: EXCRETION ══ */}
          <div className="lp-chapter-divider">
            <div className="lp-chapter-pill">
              <span className="lp-chapter-pill-num">04</span>
              <span className="lp-chapter-pill-text">Excretion</span>
            </div>
          </div>

          <div className="lp-sec-head">
            <span className="lp-sec-num">6</span>
            <div className="lp-sec-kicker">Removing Waste</div>
            <h2 className="lp-sec-title">Excretion in <span>Humans &amp; Plants</span></h2>
          </div>
          <p className="lp-body-text">
            <strong>Excretion</strong> is the process of removing harmful metabolic waste products produced in the cells of living organisms. In humans, the kidneys are the primary excretory organs; plants use various methods.
          </p>

          {/* Kidney card */}
          <div className="lp-kidney-card">
            <div className="lp-kidney-top">
              <span className="lp-kidney-icon">🫘</span>
              <div className="lp-kidney-title-wrap">
                <div className="lp-kidney-tag">Main Excretory Organ</div>
                <div className="lp-kidney-title">The Kidney</div>
              </div>
              <div className="lp-kidney-stat">
                <div className="lp-kidney-stat-num">1–1.8L</div>
                <div className="lp-kidney-stat-label">urine per day</div>
              </div>
            </div>
            <div className="lp-kidney-body">
              {[
                { icon:"🔬", name:"Nephron", role:"Basic filtering unit. Contains glomerulus, Bowman's capsule, and renal tubule. Blood is filtered here under pressure." },
                { icon:"🌊", name:"Ureter", role:"Carries urine from each kidney to the urinary bladder." },
                { icon:"💧", name:"Urinary Bladder + Urethra", role:"Bladder stores urine; urethra carries it out of the body during urination." },
              ].map(p => (
                <div className="lp-kidney-part" key={p.name}>
                  <span className="lp-kidney-part-icon">{p.icon}</span>
                  <div className="lp-kidney-part-name">{p.name}</div>
                  <div className="lp-kidney-part-role">{p.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Urine composition */}
          <div className="lp-urine-bar">
            <div className="lp-urine-label">Composition of Urine</div>
            <div className="lp-urine-track">
              <div className="lp-urine-seg water">95%</div>
              <div className="lp-urine-seg urea">2.5%</div>
              <div className="lp-urine-seg other">2.5%</div>
            </div>
            <div className="lp-urine-legend">
              <div className="lp-urine-legend-item"><div className="lp-urine-legend-dot" style={{background:"var(--sky)"}}/>Water — 95%</div>
              <div className="lp-urine-legend-item"><div className="lp-urine-legend-dot" style={{background:"var(--sun)"}}/>Urea — 2.5%</div>
              <div className="lp-urine-legend-item"><div className="lp-urine-legend-dot" style={{background:"var(--blood)"}}/>Other wastes (salts, creatinine) — 2.5%</div>
            </div>
          </div>

          <div className="lp-alert red">
            🏥 <strong>Dialysis</strong> — when kidneys fail, blood is filtered through an <strong>artificial kidney machine</strong>. The process mimics nephron filtration and removes urea and other waste products from the blood.
          </div>

          {/* Plant excretion */}
          <p className="lp-body-text"><strong>Excretion in Plants</strong> — plants use several strategies to eliminate wastes:</p>
          <div className="lp-plant-exc">
            {[
              { icon:"🌬️", title:"Stomata", desc:"O₂ (photosynthesis by-product) and CO₂ (respiration waste) released through stomata in leaves." },
              { icon:"💦", title:"Transpiration", desc:"Excess water lost as vapour through stomata — also cools the plant." },
              { icon:"🧫", title:"Vacuoles", desc:"Resins, gums, tannins, and other waste stored in cell vacuoles." },
              { icon:"🪵", title:"Old Xylem", desc:"Waste products stored permanently in old, dead xylem (heartwood) tissues." },
              { icon:"🍂", title:"Leaf Fall", desc:"Wastes accumulated in leaves are removed when leaves fall seasonally." },
            ].map(p => (
              <div className="lp-pe-card" key={p.title}>
                <span className="lp-pe-icon">{p.icon}</span>
                <div className="lp-pe-title">{p.title}</div>
                <div className="lp-pe-desc">{p.desc}</div>
              </div>
            ))}
          </div>

          <div className="lp-pull-quote">
            <p>"Transpiration is both a waste-removal mechanism and the engine that drives water transport in plants — the evaporation of water from leaves creates a continuous upward pull through the xylem, lifting water from roots to the very tips of the tallest trees."</p>
          </div>

          {/* FAQ */}
          <div className="lp-divider"><div className="lp-divider-mark"/></div>
          <div className="lp-faq-header"><span className="lp-faq-kicker">Exam Preparation</span></div>
          <h2 className="lp-faq-title">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div className={`lp-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="lp-faq-q" onClick={() => toggle(i)}>
                <span className="lp-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="lp-faq-icon">+</span>
              </button>
              <div className={`lp-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
