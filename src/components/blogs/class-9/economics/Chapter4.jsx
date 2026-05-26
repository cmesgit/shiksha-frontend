import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #0a1408;
    --ink2:       #162010;
    --muted:      #4e6840;
    --paper:      #f4faf0;
    --paper2:     #e6f4de;
    --accent:     #2d7a0a;
    --accent2:    #1e5a06;
    --accent-lt:  #d4f0bc;
    --gold:       #a86e00;
    --gold-lt:    #fff3d0;
    --rust:       #b83010;
    --rust-lt:    #fdeae4;
    --sky:        #0a5a8a;
    --sky-lt:     #d8eef8;
    --rule:       #bcdea8;
    --white:      #ffffff;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .fsi-root {
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
  }

  /* ─────────────────────────────────────────
     HERO — deep harvest-green gradient
  ───────────────────────────────────────── */
  .fsi-hero {
    background: linear-gradient(135deg, #030a02 0%, #091a04 50%, #0d2206 100%);
    min-height: 88vh;
    display: flex;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
    padding: 0 0 64px;
  }
  .fsi-hero::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 6px;
    background: linear-gradient(90deg, #2d7a0a 0%, #a86e00 50%, #0a5a8a 100%);
  }
  .fsi-hero-bg-num {
    position: absolute; bottom: -60px; right: -30px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(220px, 36vw, 500px);
    font-weight: 900; line-height: 1;
    color: rgba(255,255,255,0.022);
    letter-spacing: -0.04em;
    user-select: none; pointer-events: none;
  }
  /* Grain/wheat pattern */
  .fsi-hero-dots {
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(45,122,10,0.1) 1px, transparent 1px);
    background-size: 36px 36px;
    pointer-events: none;
  }
  /* Horizon sweep */
  .fsi-hero-horizon {
    position: absolute; bottom: 28%; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(45,122,10,0.2) 30%, rgba(168,110,0,0.15) 70%, transparent 100%);
    pointer-events: none;
  }
  .fsi-glow-a {
    position: absolute; top: 10%; right: 6%;
    width: 360px; height: 360px; border-radius: 50%;
    background: radial-gradient(circle, rgba(45,122,10,0.15) 0%, transparent 70%);
    pointer-events: none;
  }
  .fsi-glow-b {
    position: absolute; bottom: 15%; left: 5%;
    width: 250px; height: 250px; border-radius: 50%;
    background: radial-gradient(circle, rgba(168,110,0,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  .fsi-hero-inner {
    max-width: 900px; width: 100%;
    margin: 0 auto; padding: 0 32px;
    position: relative; z-index: 1;
  }
  .fsi-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #90e060; margin-bottom: 24px;
    display: flex; align-items: center; gap: 14px;
  }
  .fsi-overline::before, .fsi-overline::after {
    content: ''; flex: 0 0 40px; height: 1px; background: #90e060;
  }
  .fsi-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(40px, 8vw, 84px);
    font-weight: 900; color: #fff;
    line-height: 0.95; letter-spacing: -0.03em;
    margin-bottom: 32px;
  }
  .fsi-hero-title em   { font-style: normal; color: #90e060; }
  .fsi-hero-title .em2 { color: #fbbf24; }
  .fsi-hero-bar {
    display: flex; flex-wrap: wrap; gap: 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 24px; margin-top: 8px;
  }
  .fsi-hero-bar-item {
    flex: 1 1 180px;
    padding: 0 24px 0 0;
    border-right: 1px solid rgba(255,255,255,0.1);
    margin-right: 24px;
  }
  .fsi-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .fsi-bar-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.35); margin-bottom: 5px;
  }
  .fsi-bar-value {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 600;
    color: rgba(255,255,255,0.75);
  }

  /* ─────────── BODY ─────────── */
  .fsi-body {
    max-width: 860px;
    margin: 0 auto;
    padding: 72px 32px 96px;
  }

  /* ─────────── DARK INTRO CARD ─────────── */
  .fsi-intro-card {
    background: linear-gradient(135deg, #030a02 0%, #0d2206 100%);
    border-left: 5px solid #90e060;
    border-radius: 4px;
    padding: 36px 40px;
    margin-bottom: 64px;
    position: relative; overflow: hidden;
  }
  .fsi-intro-card::after {
    content: '🌾';
    position: absolute; right: 32px; top: 50%;
    transform: translateY(-50%);
    font-size: 80px; opacity: 0.1; line-height: 1;
  }
  .fsi-intro-card p {
    font-family: 'Poppins', sans-serif;
    font-size: 18px; font-weight: 500;
    color: rgba(255,255,255,0.88);
    line-height: 1.78; margin: 0 0 14px;
  }
  .fsi-intro-card p:last-child { margin: 0; }
  .fsi-intro-card strong { color: #90e060; }

  /* ─────────── SECTION HEADER ─────────── */
  .fsi-sec-head {
    display: flex; align-items: flex-start; gap: 20px;
    margin-bottom: 28px;
    border-bottom: 2px solid var(--rule);
    padding-bottom: 18px;
  }
  .fsi-sec-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 56px; font-weight: 900;
    color: var(--rule); line-height: 1; flex-shrink: 0;
  }
  @media (max-width: 600px) { .fsi-sec-num { font-size: 40px; } }
  .fsi-sec-title-wrap { padding-top: 8px; }
  .fsi-sec-kicker {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 6px;
  }
  .fsi-sec-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(22px, 3.5vw, 30px);
    font-weight: 800; color: var(--ink);
    line-height: 1.15; letter-spacing: -0.02em;
  }
  .fsi-sec-title span { color: var(--accent); }

  /* ─────────── BODY TEXT ─────────── */
  .fsi-body-text {
    font-family: 'Inter', sans-serif;
    font-size: 16px; font-weight: 400;
    color: var(--ink2); line-height: 1.85;
    margin-bottom: 28px;
  }
  .fsi-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── DIVIDER ─────────── */
  .fsi-divider {
    margin: 56px 0;
    display: flex; align-items: center; gap: 16px;
  }
  .fsi-divider::before, .fsi-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--rule);
  }
  .fsi-divider-mark {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--accent); flex-shrink: 0;
  }

  /* ─────────── 3-PILLAR AAA LAYOUT ─────────── */
  .fsi-aaa-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    border: 1.5px solid var(--rule);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 36px;
  }
  @media (max-width: 680px) { .fsi-aaa-row { grid-template-columns: 1fr; } }
  .fsi-aaa-col {
    padding: 28px 22px;
    border-right: 1.5px solid var(--rule);
  }
  .fsi-aaa-col:last-child { border-right: none; }
  @media (max-width: 680px) {
    .fsi-aaa-col { border-right: none; border-bottom: 1.5px solid var(--rule); }
    .fsi-aaa-col:last-child { border-bottom: none; }
  }
  .fsi-aaa-col.avail  { background: var(--accent-lt); }
  .fsi-aaa-col.access { background: var(--gold-lt); }
  .fsi-aaa-col.afford { background: var(--sky-lt); }
  .fsi-aaa-letter {
    font-family: 'Montserrat', sans-serif;
    font-size: 52px; font-weight: 900;
    line-height: 1; margin-bottom: 6px; opacity: 0.18;
  }
  .fsi-aaa-col.avail  .fsi-aaa-letter { color: var(--accent2); }
  .fsi-aaa-col.access .fsi-aaa-letter { color: var(--gold); }
  .fsi-aaa-col.afford .fsi-aaa-letter { color: var(--sky); }
  .fsi-aaa-icon  { font-size: 32px; margin-bottom: 8px; display: block; }
  .fsi-aaa-name {
    font-family: 'Montserrat', sans-serif;
    font-size: 17px; font-weight: 900;
    margin-bottom: 10px; letter-spacing: -0.01em;
  }
  .fsi-aaa-col.avail  .fsi-aaa-name { color: var(--accent2); }
  .fsi-aaa-col.access .fsi-aaa-name { color: var(--gold); }
  .fsi-aaa-col.afford .fsi-aaa-name { color: var(--sky); }
  .fsi-aaa-def {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2); line-height: 1.65;
    margin-bottom: 12px;
  }
  .fsi-aaa-col.avail  .fsi-aaa-def strong { color: var(--accent2); font-weight: 600; }
  .fsi-aaa-col.access .fsi-aaa-def strong { color: var(--gold); font-weight: 600; }
  .fsi-aaa-col.afford .fsi-aaa-def strong { color: var(--sky); font-weight: 600; }
  .fsi-aaa-example {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 600;
    padding: 6px 10px; border-radius: 4px; line-height: 1.5;
  }
  .fsi-aaa-col.avail  .fsi-aaa-example { background: rgba(45,122,10,0.1); color: var(--accent2); }
  .fsi-aaa-col.access .fsi-aaa-example { background: rgba(168,110,0,0.1); color: var(--gold); }
  .fsi-aaa-col.afford .fsi-aaa-example { background: rgba(10,90,138,0.1); color: var(--sky); }

  /* ─────────── DARK HIGHLIGHT ─────────── */
  .fsi-highlight {
    background: linear-gradient(135deg, #030a02 0%, #0d2206 100%);
    border-radius: 6px;
    padding: 28px 32px 28px 36px;
    margin-bottom: 36px;
    position: relative; overflow: hidden;
  }
  .fsi-highlight::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 4px; height: 100%;
    background: linear-gradient(180deg, #90e060, #fbbf24);
  }
  .fsi-highlight-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #90e060; margin-bottom: 10px;
  }
  .fsi-highlight-text {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 600;
    color: rgba(255,255,255,0.9); line-height: 1.7;
  }
  .fsi-highlight-text strong { color: #90e060; }

  /* ─────────── WHO IS FOOD INSECURE — CHIP GRID ─────────── */
  .fsi-insecure-wrap {
    background: linear-gradient(135deg, #030a02 0%, #0d2206 100%);
    border-radius: 8px; padding: 28px 26px;
    margin-bottom: 36px;
  }
  .fsi-insecure-label {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #90e060; margin-bottom: 18px; display: block;
  }
  .fsi-insecure-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  @media (max-width: 560px) { .fsi-insecure-cols { grid-template-columns: 1fr; } }
  .fsi-insecure-group-title {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: #fbbf24; margin-bottom: 10px;
    padding-bottom: 6px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  .fsi-insecure-chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .fsi-insecure-chip {
    background: rgba(144,224,96,0.1);
    border: 1px solid rgba(144,224,96,0.2);
    border-radius: 100px;
    padding: 5px 12px;
    font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 500;
    color: rgba(255,255,255,0.8);
  }

  /* ─────────── HUNGER — 2-TYPE SPLIT ─────────── */
  .fsi-hunger-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1.5px solid var(--rule);
    border-radius: 8px; overflow: hidden;
    margin-bottom: 36px;
  }
  @media (max-width: 600px) { .fsi-hunger-split { grid-template-columns: 1fr; } }
  .fsi-hs-col { padding: 26px 24px; }
  .fsi-hs-col.chronic  { background: var(--rust-lt); border-right: 1.5px solid var(--rule); }
  .fsi-hs-col.seasonal { background: var(--gold-lt); }
  @media (max-width: 600px) {
    .fsi-hs-col.chronic { border-right: none; border-bottom: 1.5px solid var(--rule); }
  }
  .fsi-hs-badge {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 100px;
    display: inline-block; margin-bottom: 10px;
  }
  .fsi-hs-col.chronic  .fsi-hs-badge { background: rgba(184,48,16,0.12); color: var(--rust); }
  .fsi-hs-col.seasonal .fsi-hs-badge { background: rgba(168,110,0,0.12); color: var(--gold); }
  .fsi-hs-icon { font-size: 32px; margin-bottom: 10px; display: block; }
  .fsi-hs-heading {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px; font-weight: 900; margin-bottom: 12px;
  }
  .fsi-hs-col.chronic  .fsi-hs-heading { color: var(--rust); }
  .fsi-hs-col.seasonal .fsi-hs-heading { color: var(--gold); }
  .fsi-hs-col ul { list-style: none; padding: 0; }
  .fsi-hs-col ul li {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2);
    padding: 8px 0 8px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.07);
    position: relative; line-height: 1.55;
  }
  .fsi-hs-col ul li:last-child { border-bottom: none; }
  .fsi-hs-col ul li::before {
    content: ''; position: absolute; left: 0; top: 14px;
    width: 6px; height: 6px; border-radius: 50%;
  }
  .fsi-hs-col.chronic  ul li::before { background: var(--rust); }
  .fsi-hs-col.seasonal ul li::before { background: var(--gold); }
  .fsi-hs-col ul li strong { font-weight: 600; }
  .fsi-hs-col.chronic  ul li strong { color: var(--rust); }
  .fsi-hs-col.seasonal ul li strong { color: var(--gold); }

  /* ─────────── SELF SUFFICIENCY — STAT BAND ─────────── */
  .fsi-stat-band {
    background: var(--paper2);
    border: 1.5px solid var(--rule);
    border-left: 5px solid var(--accent);
    border-radius: 4px;
    padding: 22px 28px;
    margin-bottom: 28px;
    display: flex; align-items: center; gap: 22px; flex-wrap: wrap;
  }
  .fsi-stat-band-icon { font-size: 40px; flex-shrink: 0; }
  .fsi-stat-band-text {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 600;
    color: var(--ink2); line-height: 1.65;
    flex: 1; min-width: 200px;
  }
  .fsi-stat-band-text strong { color: var(--accent2); }

  /* ─────────── SELF SUFFICIENCY REASONS — 4-CARD GRID ─────────── */
  .fsi-reasons-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 36px;
  }
  @media (max-width: 560px) { .fsi-reasons-grid { grid-template-columns: 1fr; } }
  .fsi-reason-card {
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-radius: 6px; padding: 18px 18px;
    display: flex; align-items: flex-start; gap: 14px;
  }
  .fsi-reason-letter {
    font-family: 'Montserrat', sans-serif;
    font-size: 22px; font-weight: 900;
    color: var(--accent); flex-shrink: 0;
    width: 32px; line-height: 1.2;
    border-right: 2px solid var(--rule);
    padding-right: 12px;
  }
  .fsi-reason-text {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2); line-height: 1.65;
  }
  .fsi-reason-text strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── PRODUCTION STAT ─────────── */
  .fsi-prod-stat {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 36px;
  }
  @media (max-width: 520px) { .fsi-prod-stat { grid-template-columns: 1fr; } }
  .fsi-ps-box {
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-top: 4px solid var(--accent);
    border-radius: 6px; padding: 22px 20px; text-align: center;
  }
  .fsi-ps-box.gold-top { border-top-color: var(--gold); }
  .fsi-ps-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 30px; font-weight: 900;
    color: var(--accent); line-height: 1.1; margin-bottom: 5px;
    letter-spacing: -0.02em;
  }
  .fsi-ps-box.gold-top .fsi-ps-num { color: var(--gold); }
  .fsi-ps-label {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    color: var(--ink); margin-bottom: 4px;
  }
  .fsi-ps-sub {
    font-family: 'Inter', sans-serif;
    font-size: 12px; color: var(--muted);
  }

  /* ─────────── BUFFER STOCK FLOW ─────────── */
  .fsi-flow {
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-radius: 8px; overflow: hidden;
    margin-bottom: 36px;
  }
  .fsi-flow-head {
    background: var(--accent2); color: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    padding: 14px 24px; letter-spacing: 0.04em;
  }
  .fsi-flow-steps {
    display: flex; align-items: stretch;
    flex-wrap: wrap;
  }
  .fsi-flow-step {
    flex: 1 1 140px;
    padding: 22px 16px; text-align: center;
    border-right: 1px solid var(--rule);
    position: relative;
  }
  .fsi-flow-step:last-child { border-right: none; }
  .fsi-flow-step::after {
    content: '→';
    position: absolute; right: -10px; top: 50%;
    transform: translateY(-50%);
    font-size: 18px; color: var(--rule);
    z-index: 1;
  }
  .fsi-flow-step:last-child::after { display: none; }
  @media (max-width: 600px) {
    .fsi-flow-steps { flex-direction: column; }
    .fsi-flow-step { border-right: none; border-bottom: 1px solid var(--rule); }
    .fsi-flow-step:last-child { border-bottom: none; }
    .fsi-flow-step::after { content: '↓'; right: auto; left: 50%; top: auto; bottom: -12px; transform: translateX(-50%); }
  }
  .fsi-flow-icon  { font-size: 28px; margin-bottom: 8px; display: block; }
  .fsi-flow-step-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px; font-weight: 900;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 4px;
  }
  .fsi-flow-step-name {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 700;
    color: var(--ink); margin-bottom: 4px;
  }
  .fsi-flow-step-desc {
    font-family: 'Inter', sans-serif;
    font-size: 12px; color: var(--muted); line-height: 1.5;
  }

  /* ─────────── TERM BOX ─────────── */
  .fsi-term-box {
    background: var(--paper2);
    border: 1.5px solid var(--rule);
    border-left: 5px solid var(--accent);
    border-radius: 4px; padding: 18px 26px;
    margin-bottom: 16px;
    display: flex; align-items: flex-start; gap: 16px;
  }
  .fsi-term-box.gold  { border-left-color: var(--gold); }
  .fsi-term-box.sky   { border-left-color: var(--sky); }
  .fsi-term-box.rust  { border-left-color: var(--rust); }
  .fsi-term-icon  { font-size: 26px; flex-shrink: 0; line-height: 1; margin-top: 2px; }
  .fsi-term-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 4px;
  }
  .fsi-term-box.gold .fsi-term-label { color: var(--gold); }
  .fsi-term-box.sky  .fsi-term-label { color: var(--sky); }
  .fsi-term-box.rust .fsi-term-label { color: var(--rust); }
  .fsi-term-name {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px; font-weight: 900;
    color: var(--ink); margin-bottom: 5px;
  }
  .fsi-term-def {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2); line-height: 1.7;
  }
  .fsi-term-def strong { color: var(--accent2); font-weight: 600; }
  .fsi-term-box.gold .fsi-term-def strong { color: var(--gold); }
  .fsi-term-box.sky  .fsi-term-def strong { color: var(--sky); }
  .fsi-term-box.rust .fsi-term-def strong { color: var(--rust); }

  /* ─────────── PDS — RATION CARDS GRID ─────────── */
  .fsi-card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px; margin-bottom: 36px;
  }
  @media (max-width: 640px) { .fsi-card-grid { grid-template-columns: 1fr; } }
  .fsi-rc-card {
    border-radius: 8px; padding: 24px 20px;
    border: 1.5px solid var(--rule); background: var(--white);
    text-align: center;
  }
  .fsi-rc-card.aay  { background: var(--rust-lt);  border-color: #f0a882; }
  .fsi-rc-card.bpl  { background: var(--accent-lt); border-color: #a8d98a; }
  .fsi-rc-card.apl  { background: var(--sky-lt);   border-color: #8acfdf; }
  .fsi-rc-icon { font-size: 36px; margin-bottom: 10px; display: block; }
  .fsi-rc-abbr {
    font-family: 'Montserrat', sans-serif;
    font-size: 22px; font-weight: 900;
    margin-bottom: 4px; letter-spacing: 0.04em;
  }
  .fsi-rc-card.aay .fsi-rc-abbr { color: var(--rust); }
  .fsi-rc-card.bpl .fsi-rc-abbr { color: var(--accent2); }
  .fsi-rc-card.apl .fsi-rc-abbr { color: var(--sky); }
  .fsi-rc-name {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    color: var(--ink); margin-bottom: 8px;
  }
  .fsi-rc-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13px; color: var(--muted); line-height: 1.5;
  }

  /* ─────────── FOOD INTERVENTION TIMELINE ─────────── */
  .fsi-timeline { margin-bottom: 36px; }
  .fsi-tl-item {
    display: flex; gap: 0; position: relative;
  }
  .fsi-tl-left {
    flex-shrink: 0; width: 96px;
    display: flex; flex-direction: column; align-items: center;
    position: relative; z-index: 1; padding-top: 16px;
  }
  .fsi-tl-item:not(:last-child) .fsi-tl-left::after {
    content: '';
    position: absolute; top: 36px; left: 50%;
    transform: translateX(-50%);
    width: 2px; height: 100%;
    background: var(--rule); z-index: 0;
  }
  .fsi-tl-dot {
    width: 14px; height: 14px; border-radius: 50%;
    border: 2.5px solid var(--accent);
    background: var(--white); position: relative; z-index: 1;
    margin-bottom: 6px;
  }
  .fsi-tl-year {
    font-family: 'Montserrat', sans-serif;
    font-size: 12px; font-weight: 900;
    color: var(--accent); text-align: center;
  }
  .fsi-tl-content {
    background: var(--white); border: 1.5px solid var(--rule);
    border-radius: 6px; padding: 16px 20px;
    margin-bottom: 12px; flex: 1;
  }
  .fsi-tl-content:hover { border-color: var(--accent); }
  .fsi-tl-name {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 700;
    color: var(--accent2); margin-bottom: 6px;
  }
  .fsi-tl-desc {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2); line-height: 1.6;
  }
  .fsi-tl-desc strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── PDS EVALUATION — PROS/CONS SPLIT ─────────── */
  .fsi-eval-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1.5px solid var(--rule);
    border-radius: 8px; overflow: hidden;
    margin-bottom: 36px;
  }
  @media (max-width: 600px) { .fsi-eval-split { grid-template-columns: 1fr; } }
  .fsi-eval-col { padding: 26px 24px; }
  .fsi-eval-col.pros { background: var(--accent-lt); border-right: 1.5px solid var(--rule); }
  .fsi-eval-col.cons { background: var(--rust-lt); }
  @media (max-width: 600px) {
    .fsi-eval-col.pros { border-right: none; border-bottom: 1.5px solid var(--rule); }
  }
  .fsi-eval-badge {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 100px;
    display: inline-block; margin-bottom: 10px;
  }
  .fsi-eval-col.pros .fsi-eval-badge { background: rgba(45,122,10,0.12); color: var(--accent2); }
  .fsi-eval-col.cons .fsi-eval-badge { background: rgba(184,48,16,0.12); color: var(--rust); }
  .fsi-eval-heading {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px; font-weight: 900; margin-bottom: 14px;
  }
  .fsi-eval-col.pros .fsi-eval-heading { color: var(--accent2); }
  .fsi-eval-col.cons .fsi-eval-heading { color: var(--rust); }
  .fsi-eval-col ul { list-style: none; padding: 0; }
  .fsi-eval-col ul li {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2);
    padding: 8px 0 8px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.07);
    position: relative; line-height: 1.55;
  }
  .fsi-eval-col ul li:last-child { border-bottom: none; }
  .fsi-eval-col ul li::before {
    content: ''; position: absolute; left: 0; top: 14px;
    width: 6px; height: 6px; border-radius: 50%;
  }
  .fsi-eval-col.pros ul li::before { background: var(--accent); }
  .fsi-eval-col.cons ul li::before { background: var(--rust); }
  .fsi-eval-col ul li strong { font-weight: 600; }
  .fsi-eval-col.pros ul li strong { color: var(--accent2); }
  .fsi-eval-col.cons ul li strong { color: var(--rust); }

  /* ─────────── COOPERATIVES SUCCESS DARK BLOCK ─────────── */
  .fsi-coop-strip {
    background: linear-gradient(135deg, #030a02 0%, #0d2206 100%);
    border-radius: 8px; padding: 32px;
    margin-bottom: 36px;
    display: grid; grid-template-columns: repeat(3,1fr); gap: 24px;
  }
  @media (max-width: 680px) {
    .fsi-coop-strip { grid-template-columns: 1fr; gap: 0; padding: 24px 20px; }
  }
  .fsi-coop-item {
    border-right: 1px solid rgba(255,255,255,0.1);
    padding-right: 24px;
  }
  .fsi-coop-item:last-child { border-right: none; padding-right: 0; }
  @media (max-width: 680px) {
    .fsi-coop-item {
      border-right: none; padding-right: 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 20px; margin-bottom: 20px;
    }
    .fsi-coop-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
  }
  .fsi-coop-icon { font-size: 32px; margin-bottom: 10px; display: block; }
  .fsi-coop-name {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; font-weight: 700; color: #90e060; margin-bottom: 6px;
  }
  .fsi-coop-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13px; color: rgba(255,255,255,0.72); line-height: 1.65;
  }
  .fsi-coop-desc strong { color: #fbbf24; font-weight: 600; }

  /* ─────────── PULL QUOTE ─────────── */
  .fsi-pull-quote {
    border-left: 4px solid var(--accent);
    padding: 20px 28px; background: var(--accent-lt);
    border-radius: 0 6px 6px 0; margin-bottom: 36px;
  }
  .fsi-pull-quote p {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 600;
    color: var(--accent2); line-height: 1.7;
    margin-bottom: 8px; font-style: italic;
  }
  .fsi-pull-quote cite {
    font-family: 'Inter', sans-serif;
    font-size: 13px; color: var(--muted); font-style: normal;
  }

  /* ─────────── TABLE ─────────── */
  .fsi-table-wrap {
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-radius: 6px; overflow: hidden; margin-bottom: 36px;
  }
  .fsi-table-title {
    background: var(--accent2); color: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    padding: 14px 22px; letter-spacing: 0.04em;
  }
  .fsi-table-row {
    display: grid;
    grid-template-columns: minmax(130px, 190px) 1fr;
    border-bottom: 1px solid var(--rule);
  }
  @media (max-width: 520px) { .fsi-table-row { grid-template-columns: 1fr; } }
  .fsi-table-row:last-child { border-bottom: none; }
  .fsi-table-key {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    color: var(--accent2); padding: 14px 18px;
    background: var(--paper2);
    border-right: 1px solid var(--rule);
    display: flex; align-items: center;
  }
  @media (max-width: 520px) {
    .fsi-table-key { border-right: none; border-bottom: 1px solid var(--rule); padding: 10px 16px; }
  }
  .fsi-table-val {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2);
    padding: 14px 18px; line-height: 1.6;
  }
  @media (max-width: 520px) { .fsi-table-val { padding: 10px 16px; } }
  .fsi-table-val strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── FAQ ─────────── */
  .fsi-faq-header { display: flex; align-items: center; gap: 14px; margin-bottom: 10px; }
  .fsi-faq-kicker {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--accent); padding: 4px 14px;
    border: 1.5px solid var(--accent); border-radius: 100px;
    display: inline-block;
  }
  .fsi-faq-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(24px, 4vw, 34px);
    font-weight: 900; color: var(--ink);
    letter-spacing: -0.025em; margin-bottom: 28px;
  }
  .fsi-faq-item {
    border: 1.5px solid var(--rule); border-radius: 6px;
    margin-bottom: 10px; overflow: hidden; background: var(--white);
  }
  .fsi-faq-item.open { border-color: var(--accent); }
  .fsi-faq-q {
    width: 100%; background: none; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 22px; gap: 16px; text-align: left;
  }
  .fsi-faq-q:hover { background: var(--paper2); }
  .fsi-faq-q-text {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 600;
    color: var(--ink); line-height: 1.5;
  }
  .fsi-faq-item.open .fsi-faq-q-text { color: var(--accent2); }
  .fsi-faq-icon { font-size: 20px; color: var(--accent); flex-shrink: 0; line-height: 1; user-select: none; }
  .fsi-faq-ans {
    display: none; font-family: 'Inter', sans-serif;
    font-size: 15px; color: var(--ink2);
    line-height: 1.8; padding: 0 22px 20px;
  }
  .fsi-faq-ans.visible { display: block; }
  .fsi-faq-ans strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── RESPONSIVE ─────────── */
  @media (max-width: 600px) {
    .fsi-body { padding: 48px 16px 72px; }
    .fsi-hero-inner { padding: 0 20px; }
    .fsi-intro-card { padding: 24px 20px; }
    .fsi-intro-card::after { display: none; }
    .fsi-tl-left { width: 70px; }
  }
`;

const faqs = [
  {
    q: "What is food security? Explain its three dimensions.",
    a: "Food security means the availability, accessibility, and affordability of food to all people at all times. (1) Availability means food production within the country and import of food to meet any shortfall. (2) Accessibility means food is within the reach of every person — physically present near them. (3) Affordability means individuals have enough money to buy sufficient, nutritious food. All three must exist together for true food security. A country can produce enough food (availability) but if poor people cannot afford it (affordability), food insecurity still exists."
  },
  {
    q: "Who are the food insecure people in India?",
    a: "Food insecurity affects different groups: In rural areas — landless and small farmers, traditional artisans (weavers, potters, blacksmiths), service providers (barbers, washermen), petty self-employed workers, and destitute people. In urban areas — people in ill-paid occupations and casual labourers. Socially — SCs, STs, and some sections of OBCs who are landless or have low land productivity. Biologically — a large proportion of pregnant and nursing mothers and children under 5 years are food insecure. The poorest section of society is always food insecure."
  },
  {
    q: "What is famine? How is it different from starvation?",
    a: "Starvation is the condition of extreme hunger when people do not get enough food over a period. If starvation continues for a longer period across a region, it turns into famine. A famine is characterised by widespread deaths due to starvation and epidemics caused by the forced use of contaminated water or decaying food, and loss of body resistance due to prolonged starvation. Natural calamities like earthquakes, droughts, floods, and tsunamis can trigger starvation, which if not addressed, can become famine. The Bengal Famine of 1943 is a famous historical example."
  },
  {
    q: "What are the two types of hunger? Explain.",
    a: "Hunger has two dimensions: (1) Chronic Hunger — experienced by people who are always poor and food insecure. They never have enough income or resources to buy adequate food. This is a permanent condition for the poorest sections. (2) Seasonal Hunger — occurs when people cannot get work for the whole year. In rural areas, it is caused by the seasonal nature of agricultural activities — farm labourers have no work during the off-season. In urban areas, it is caused by the casual nature of work — workers are not employed year-round. Thus seasonal hunger is linked to unemployment patterns."
  },
  {
    q: "Why did India need self-sufficiency in food grains after Independence?",
    a: "After the partition of India in 1947, the country experienced an acute shortage of food grains. The government realised the urgent need to become self-sufficient in food grain production for four key reasons: (a) To feed the rapidly rising population; (b) To fight against natural calamities like droughts, floods, and cyclones that periodically reduce farm output; (c) To reduce dependence on imports of food grains, which drain foreign exchange; (d) To control the prices of food grains and prevent inflation from hurting the poor."
  },
  {
    q: "How has India achieved food security? What role did the Green Revolution play?",
    a: "Since the advent of the Green Revolution in the 1960s, India has avoided famine even during adverse weather conditions. The Green Revolution introduced HYV seeds, chemical fertilisers, pesticides, and improved irrigation to dramatically increase food grain production. India's total food grain production rose from 7.23 million tonnes in Punjab and Haryana in 1964–65 to a record 218 million tonnes nationally in 2009–10. India has become self-sufficient in food grains over the last 30 years due to the variety of crops grown across the country and the food security system developed by the government. However, a few states like Orissa have lagged behind."
  },
  {
    q: "What is buffer stock? What is its purpose?",
    a: "Buffer stock is the stock of food grains — mainly wheat and rice — procured by the government through the Food Corporation of India (FCI). The FCI purchases wheat and rice from farmers of surplus states at a pre-announced Minimum Support Price (MSP). This stock serves two purposes: (1) It ensures food is available during times of shortage, poor harvest, or natural calamities; (2) It allows the government to distribute food to the poor at subsidised prices (called Issue Price) through the Public Distribution System. In July 2002, the FCI's stock was 63 million tonnes — well above the minimum buffer norm of 24.3 million tonnes."
  },
  {
    q: "What is the Minimum Support Price (MSP)? What is the Issue Price?",
    a: "Minimum Support Price (MSP) is the price pre-announced by the government at which the Food Corporation of India (FCI) purchases wheat and rice from farmers in surplus states. It is fixed before the sowing season so farmers know what price they will receive for their produce, encouraging them to grow more. Issue Price is the price at which food procured by the FCI is distributed to the poorer sections of society through ration shops — it is lower than the market price. The difference between what the government pays (MSP) and what it charges the poor (Issue Price) is borne by the government as a food subsidy."
  },
  {
    q: "What is the Public Distribution System (PDS)? How does it work?",
    a: "The Public Distribution System (PDS) is a system through which food procured by the FCI is distributed to the poor through government-regulated ration shops (also called fair price shops). Consumers are issued ration cards entitling them to buy a fixed quantity of food grains at subsidised prices each month. Rationing was introduced in India around 1940 after the Bengal Famine. There are three kinds of ration cards: (a) Antyodaya cards for the poorest of the poor; (b) BPL cards for those below the poverty line; (c) APL cards for those above the poverty line. PDS has proved most effective at stabilising prices and making food available at affordable prices."
  },
  {
    q: "What are the three important food intervention programmes introduced in the mid-1970s?",
    a: "In the wake of high poverty levels in the mid-1970s, three important food intervention programmes were introduced: (1) Public Distribution System (PDS) — already in existence but strengthened to cover more poor people; (2) Integrated Child Development Services (ICDS) launched in 1975 — provided nutrition, health, and education services to children under 6 and pregnant/nursing mothers; (3) Food for Work Programme (1977–78) — provided food grains as wages to poor people working on public construction projects. In 2000, two more schemes were added: Antyodaya Anna Yojana (AAY) for the poorest of the poor and Annapurna Scheme (APS) for indigent senior citizens."
  },
  {
    q: "What are the shortcomings or criticisms of the PDS?",
    a: "Despite its importance, the PDS has faced severe criticism: (1) Excessive food stocks — in July 2002, FCI held 63 million tonnes vs the buffer norm of only 24.3 million tonnes; grain was rotting in godowns or being eaten by rats while people went hungry. (2) Paradox of excess stocks and starvation — while government granaries overflow, millions of poor cannot afford to buy food. (3) Malpractice by PDS dealers — dealers divert subsidised grain to the open market for profit. (4) Exclusion errors — many genuinely poor people are excluded from the system due to incorrect BPL lists. (5) Poor quality food grains distributed at ration shops."
  },
  {
    q: "What is the 'paradox of excess stocks and starvation'?",
    a: "The paradox of excess stocks and starvation refers to the strange situation in India where government godowns overflow with excess food grain stocks, yet large numbers of poor people go hungry. In July 2002, FCI's stock was 63 million tonnes — more than double the required buffer norm of 24.3 million tonnes. Yet starvation continued among the poor. The main reason is that poor families do not have enough money or income to buy food even if it is available at subsidised rates. Additionally, PDS dealer malpractice diverts food away from the poor. This paradox highlights that food insecurity is not just about availability — affordability is equally critical."
  },
  {
    q: "What role do cooperatives play in food security in India?",
    a: "In southern and western parts of India, cooperatives play an important role in food security by providing affordable food and dairy products to consumers. Key examples: (1) Mother Dairy — supplies milk and vegetables at controlled prices in Delhi; it is a success story of cooperative dairy farming. (2) Amul — based in Gujarat, it is one of the world's largest dairy cooperatives, procuring milk from millions of small farmers and selling dairy products nationally and internationally. (3) Maharashtra's Academy of Development Science (ADS) — facilitated a network of NGOs and set up grain banks in Maharashtra to ensure food access for the rural poor. These cooperatives demonstrate community-based solutions to food security."
  },
];

export default function ChapterFoodSecurityInIndia() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>

      <div className="fsi-root">

        {/* ══════════════════ HERO ══════════════════ */}
        <div className="fsi-hero">
          <div className="fsi-hero-dots" />
          <div className="fsi-hero-horizon" />
          <div className="fsi-glow-a" />
          <div className="fsi-glow-b" />
          <div className="fsi-hero-bg-num">4</div>

          <div className="fsi-hero-inner">
            <div className="fsi-overline">Class 9 · Economics · Chapter 4</div>
            <h1 className="fsi-hero-title">
              Food<br />
              <em>Security</em><br />
              <span className="em2">In India</span>
            </h1>
            <div className="fsi-hero-bar">
              <div className="fsi-hero-bar-item">
                <div className="fsi-bar-label">Subject</div>
                <div className="fsi-bar-value">Economics — Class 9</div>
              </div>
              <div className="fsi-hero-bar-item">
                <div className="fsi-bar-label">Chapter</div>
                <div className="fsi-bar-value">4 — Food Security in India</div>
              </div>
              <div className="fsi-hero-bar-item">
                <div className="fsi-bar-label">Key Concepts</div>
                <div className="fsi-bar-value">Buffer Stock · PDS · MSP · Hunger</div>
              </div>
              <div className="fsi-hero-bar-item">
                <div className="fsi-bar-label">Read Time</div>
                <div className="fsi-bar-value">⏱️ 13 min read</div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════ BODY ══════════════════ */}
        <div className="fsi-body">

          {/* ── LEAD INTRO CARD ── */}
          <div className="fsi-intro-card">
            <p>
              India feeds over 1.4 billion people — yet millions go to bed hungry every night. <strong>Food security</strong> is not just about producing enough food. It is about ensuring that every person can <strong>access and afford</strong> nutritious food at all times, even during droughts, floods, or economic downturns.
            </p>
            <p>
              This chapter explores how India measures and tackles food insecurity — from the <strong>Green Revolution and buffer stocks</strong> to the Public Distribution System and cooperative success stories like Amul and Mother Dairy.
            </p>
          </div>

          {/* ══ SECTION 1: What Is Food Security? ══ */}
          <div className="fsi-sec-head">
            <div className="fsi-sec-num">1</div>
            <div className="fsi-sec-title-wrap">
              <div className="fsi-sec-kicker">The Foundation</div>
              <h2 className="fsi-sec-title">What Is <span>Food Security?</span></h2>
            </div>
          </div>

          <p className="fsi-body-text">
            Food security means <strong>availability, accessibility, and affordability</strong> of food to all people at all times. These three pillars must all exist simultaneously — a failure in any one creates food insecurity.
          </p>

          {/* AAA 3-pillar */}
          <div className="fsi-aaa-row">
            <div className="fsi-aaa-col avail">
              <div className="fsi-aaa-letter">A</div>
              <span className="fsi-aaa-icon">🌾</span>
              <div className="fsi-aaa-name">Availability</div>
              <div className="fsi-aaa-def">
                Enough food must exist in the country through <strong>domestic production</strong> or imports to feed the entire population.
              </div>
              <div className="fsi-aaa-example">Food production + Imports of food</div>
            </div>
            <div className="fsi-aaa-col access">
              <div className="fsi-aaa-letter">A</div>
              <span className="fsi-aaa-icon">🚚</span>
              <div className="fsi-aaa-name">Accessibility</div>
              <div className="fsi-aaa-def">
                Food must be <strong>within the physical reach</strong> of every person — distributed across all regions including remote rural areas.
              </div>
              <div className="fsi-aaa-example">Food within reach of every person</div>
            </div>
            <div className="fsi-aaa-col afford">
              <div className="fsi-aaa-letter">A</div>
              <span className="fsi-aaa-icon">💰</span>
              <div className="fsi-aaa-name">Affordability</div>
              <div className="fsi-aaa-def">
                Every person must have <strong>enough money or purchasing power</strong> to buy sufficient and nutritious food.
              </div>
              <div className="fsi-aaa-example">Enough income to buy food</div>
            </div>
          </div>

          <div className="fsi-highlight">
            <div className="fsi-highlight-label">Key Fact</div>
            <div className="fsi-highlight-text">
              The <strong>poorest section of society</strong> is food insecure all the time. Even people above the poverty line can become food insecure during <strong>natural calamities</strong> like earthquakes, droughts, floods, and tsunamis, which can destroy livelihoods and food supplies overnight.
            </div>
          </div>

          {/* ══ SECTION 2: Who Is Food Insecure? ══ */}
          <div className="fsi-divider"><div className="fsi-divider-mark" /></div>

          <div className="fsi-sec-head">
            <div className="fsi-sec-num">2</div>
            <div className="fsi-sec-title-wrap">
              <div className="fsi-sec-kicker">The Affected</div>
              <h2 className="fsi-sec-title">Who Is <span>Food Insecure?</span></h2>
            </div>
          </div>

          <div className="fsi-insecure-wrap">
            <span className="fsi-insecure-label">Food-Insecure People in India</span>
            <div className="fsi-insecure-cols">
              <div>
                <div className="fsi-insecure-group-title">🌾 Rural Areas</div>
                <div className="fsi-insecure-chips">
                  {["Landless labourers","Small farmers","Weavers / Potters","Blacksmiths","Barbers","Washermen","Petty self-employed","Destitute people"].map(c => (
                    <div className="fsi-insecure-chip" key={c}>{c}</div>
                  ))}
                </div>
              </div>
              <div>
                <div className="fsi-insecure-group-title">🏙️ Urban Areas &amp; Social Groups</div>
                <div className="fsi-insecure-chips">
                  {["Ill-paid workers","Casual labourers","SC households","ST households","OBC lower castes","Pregnant mothers","Nursing mothers","Children under 5"].map(c => (
                    <div className="fsi-insecure-chip" key={c}>{c}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ══ SECTION 3: Hunger ══ */}
          <div className="fsi-divider"><div className="fsi-divider-mark" /></div>

          <div className="fsi-sec-head">
            <div className="fsi-sec-num">3</div>
            <div className="fsi-sec-title-wrap">
              <div className="fsi-sec-kicker">Dimensions of Deprivation</div>
              <h2 className="fsi-sec-title">Types of <span>Hunger</span></h2>
            </div>
          </div>

          <p className="fsi-body-text">
            Hunger is the most direct expression of food insecurity. It has two distinct dimensions that affect different groups in different ways.
          </p>

          <div className="fsi-hunger-split">
            <div className="fsi-hs-col chronic">
              <div className="fsi-hs-badge">Type 1</div>
              <span className="fsi-hs-icon">😔</span>
              <div className="fsi-hs-heading">Chronic Hunger</div>
              <ul>
                <li>Affects the <strong>permanently poor</strong></li>
                <li>Food insecure <strong>all the time</strong></li>
                <li>Never enough income for adequate food</li>
                <li>Leads to malnutrition over years</li>
                <li>Most severe among landless labourers</li>
              </ul>
            </div>
            <div className="fsi-hs-col seasonal">
              <div className="fsi-hs-badge">Type 2</div>
              <span className="fsi-hs-icon">🌦️</span>
              <div className="fsi-hs-heading">Seasonal Hunger</div>
              <ul>
                <li>Occurs during <strong>certain months</strong> of the year</li>
                <li>Rural: caused by <strong>off-season in agriculture</strong></li>
                <li>Urban: caused by <strong>casual / irregular work</strong></li>
                <li>Linked directly to unemployment patterns</li>
                <li>Worse in drought or flood years</li>
              </ul>
            </div>
          </div>

          <div className="fsi-term-box rust">
            <div className="fsi-term-icon">⚠️</div>
            <div>
              <div className="fsi-term-label">Escalation</div>
              <div className="fsi-term-name">Starvation → Famine</div>
              <div className="fsi-term-def">
                Natural calamities may lead to <strong>starvation</strong>. Starvation continuing over a longer period turns into <strong>famine</strong> — characterised by widespread deaths, epidemics from contaminated water/food, and loss of body resistance due to prolonged hunger.
              </div>
            </div>
          </div>

          {/* ══ SECTION 4: Food Self-Sufficiency ══ */}
          <div className="fsi-divider"><div className="fsi-divider-mark" /></div>

          <div className="fsi-sec-head">
            <div className="fsi-sec-num">4</div>
            <div className="fsi-sec-title-wrap">
              <div className="fsi-sec-kicker">National Goal</div>
              <h2 className="fsi-sec-title">Need for <span>Self-Sufficiency</span> in Food Grains</h2>
            </div>
          </div>

          <p className="fsi-body-text">
            After India's painful partition in 1947, the country faced <strong>acute shortages of food grains</strong>. The government realised that depending on imports was dangerous — self-sufficiency became a national priority.
          </p>

          <div className="fsi-reasons-grid">
            {[
              { letter:"a", text:"To <strong>feed the rising population</strong> — India's population was growing fast and needed more food every year" },
              { letter:"b", text:"To <strong>fight natural calamities</strong> like droughts, floods, and cyclones that periodically destroy harvests" },
              { letter:"c", text:"To <strong>reduce import of food grains</strong> — importing food drains foreign exchange and creates dependence on other nations" },
              { letter:"d", text:"To <strong>control prices</strong> of food grains — ensuring the poor can afford basic food without inflation" },
            ].map(r => (
              <div className="fsi-reason-card" key={r.letter}>
                <div className="fsi-reason-letter">{r.letter}</div>
                <div className="fsi-reason-text" dangerouslySetInnerHTML={{__html: r.text}} />
              </div>
            ))}
          </div>

          {/* Production stats */}
          <div className="fsi-prod-stat">
            <div className="fsi-ps-box">
              <div className="fsi-ps-num">7.23 MT</div>
              <div className="fsi-ps-label">Food Production</div>
              <div className="fsi-ps-sub">Punjab &amp; Haryana, 1964–65</div>
            </div>
            <div className="fsi-ps-box gold-top">
              <div className="fsi-ps-num">218 MT</div>
              <div className="fsi-ps-label">Record Production</div>
              <div className="fsi-ps-sub">India, 2009–10</div>
            </div>
          </div>

          <div className="fsi-stat-band">
            <div className="fsi-stat-band-icon">🟢</div>
            <div className="fsi-stat-band-text">
              Since the <strong>Green Revolution of the 1960s</strong>, India has avoided famine even during adverse weather. India became <strong>self-sufficient in food grains</strong> in the last 30 years — a remarkable achievement. However, a few states like <strong>Orissa</strong> have still lagged behind in food production.
            </div>
          </div>

          {/* ══ SECTION 5: Buffer Stock & FCI ══ */}
          <div className="fsi-divider"><div className="fsi-divider-mark" /></div>

          <div className="fsi-sec-head">
            <div className="fsi-sec-num">5</div>
            <div className="fsi-sec-title-wrap">
              <div className="fsi-sec-kicker">Government Mechanism</div>
              <h2 className="fsi-sec-title">Buffer Stock &amp; <span>The FCI</span></h2>
            </div>
          </div>

          <p className="fsi-body-text">
            The government created a systematic food storage and distribution mechanism to ensure food reaches the poor even in bad years. The <strong>Food Corporation of India (FCI)</strong> is at the heart of this system.
          </p>

          {/* Flow diagram */}
          <div className="fsi-flow">
            <div className="fsi-flow-head">⚙️ How the Buffer Stock System Works</div>
            <div className="fsi-flow-steps">
              <div className="fsi-flow-step">
                <span className="fsi-flow-icon">👨‍🌾</span>
                <div className="fsi-flow-step-num">Step 1</div>
                <div className="fsi-flow-step-name">Farmers Sell</div>
                <div className="fsi-flow-step-desc">FCI buys wheat &amp; rice from surplus state farmers</div>
              </div>
              <div className="fsi-flow-step">
                <span className="fsi-flow-icon">💵</span>
                <div className="fsi-flow-step-num">Step 2</div>
                <div className="fsi-flow-step-name">MSP Paid</div>
                <div className="fsi-flow-step-desc">At pre-announced Minimum Support Price</div>
              </div>
              <div className="fsi-flow-step">
                <span className="fsi-flow-icon">🏗️</span>
                <div className="fsi-flow-step-num">Step 3</div>
                <div className="fsi-flow-step-name">Buffer Stock</div>
                <div className="fsi-flow-step-desc">Grain stored in FCI godowns as buffer</div>
              </div>
              <div className="fsi-flow-step">
                <span className="fsi-flow-icon">🏪</span>
                <div className="fsi-flow-step-num">Step 4</div>
                <div className="fsi-flow-step-name">PDS Shops</div>
                <div className="fsi-flow-step-desc">Distributed to poor via ration shops at Issue Price</div>
              </div>
            </div>
          </div>

          <div className="fsi-term-box">
            <div className="fsi-term-icon">📦</div>
            <div>
              <div className="fsi-term-label">Key Term</div>
              <div className="fsi-term-name">Buffer Stock</div>
              <div className="fsi-term-def">
                Stock of food grains (wheat and rice) procured by the government through the <strong>Food Corporation of India (FCI)</strong>. Used to distribute food during shortage periods and stabilise market prices. In July 2002, FCI held <strong>63 million tonnes</strong> — far above the minimum buffer norm of <strong>24.3 million tonnes</strong>.
              </div>
            </div>
          </div>

          <div className="fsi-term-box gold">
            <div className="fsi-term-icon">💰</div>
            <div>
              <div className="fsi-term-label">Key Term</div>
              <div className="fsi-term-name">Minimum Support Price (MSP)</div>
              <div className="fsi-term-def">
                The price <strong>pre-announced by the government</strong> at which FCI purchases food grains from farmers. Set before the sowing season to encourage production. Ensures farmers receive a <strong>guaranteed minimum income</strong> regardless of market fluctuations.
              </div>
            </div>
          </div>

          <div className="fsi-term-box sky">
            <div className="fsi-term-icon">🏷️</div>
            <div>
              <div className="fsi-term-label">Key Term</div>
              <div className="fsi-term-name">Issue Price</div>
              <div className="fsi-term-def">
                The price at which food procured by FCI is <strong>distributed to the poor</strong> through ration shops — always <strong>lower than the market price</strong>. The gap between MSP and Issue Price is covered by the government as a <strong>food subsidy</strong>.
              </div>
            </div>
          </div>

          {/* ══ SECTION 6: PDS ══ */}
          <div className="fsi-divider"><div className="fsi-divider-mark" /></div>

          <div className="fsi-sec-head">
            <div className="fsi-sec-num">6</div>
            <div className="fsi-sec-title-wrap">
              <div className="fsi-sec-kicker">Distribution Network</div>
              <h2 className="fsi-sec-title">Public Distribution <span>System (PDS)</span></h2>
            </div>
          </div>

          <p className="fsi-body-text">
            The Public Distribution System (PDS) is the government's main tool to distribute food to the poor. It operates through a nationwide network of <strong>ration shops (fair price shops)</strong> where cardholders can buy subsidised food grains.
          </p>

          <div className="fsi-term-box">
            <div className="fsi-term-icon">📜</div>
            <div>
              <div className="fsi-term-label">Historical Note</div>
              <div className="fsi-term-name">Origins of Rationing in India</div>
              <div className="fsi-term-def">
                Rationing was introduced in India around <strong>1940</strong> — in the wake of the Bengal Famine. The PDS (as it exists today) has evolved since then into a comprehensive food distribution network covering the entire country.
              </div>
            </div>
          </div>

          {/* Ration Cards */}
          <div className="fsi-card-grid">
            <div className="fsi-rc-card aay">
              <span className="fsi-rc-icon">🔴</span>
              <div className="fsi-rc-abbr">AAY</div>
              <div className="fsi-rc-name">Antyodaya Anna Yojana</div>
              <div className="fsi-rc-desc">For the <strong>poorest of the poor</strong>. Highest subsidy. Specifically targets families with no steady income.</div>
            </div>
            <div className="fsi-rc-card bpl">
              <span className="fsi-rc-icon">🟡</span>
              <div className="fsi-rc-abbr">BPL</div>
              <div className="fsi-rc-name">Below Poverty Line</div>
              <div className="fsi-rc-desc">For households <strong>below the poverty line</strong>. Subsidised food at rates below market price.</div>
            </div>
            <div className="fsi-rc-card apl">
              <span className="fsi-rc-icon">🟢</span>
              <div className="fsi-rc-abbr">APL</div>
              <div className="fsi-rc-name">Above Poverty Line</div>
              <div className="fsi-rc-desc">For households <strong>above the poverty line</strong>. Available at near-market prices through PDS.</div>
            </div>
          </div>

          {/* Intervention programmes timeline */}
          <p className="fsi-body-text">
            In the mid-1970s, with high poverty levels, <strong>three important food intervention programmes</strong> were introduced. More were added over the decades:
          </p>

          <div className="fsi-timeline">
            {[
              { year:"Pre-1970s", name:"Public Distribution System (PDS)", desc:"Already in existence — strengthened and expanded to cover more poor households across the country." },
              { year:"1975", name:"Integrated Child Development Services (ICDS)", desc:"Provides nutrition, healthcare, and early education to <strong>children under 6</strong> and pregnant/nursing mothers." },
              { year:"1977–78", name:"Food for Work Programme", desc:"Provides <strong>food grains as wages</strong> to poor people engaged in public construction and infrastructure work." },
              { year:"2000", name:"Antyodaya Anna Yojana (AAY)", desc:"Provides <strong>highly subsidised food</strong> to the poorest of the poor — identified as the most vulnerable households." },
              { year:"2000", name:"Annapurna Scheme (APS)", desc:"Targets <strong>indigent senior citizens</strong> — elderly poor who are not covered under the National Old Age Pension Scheme." },
            ].map(s => (
              <div className="fsi-tl-item" key={s.name}>
                <div className="fsi-tl-left">
                  <div className="fsi-tl-dot" />
                  <div className="fsi-tl-year">{s.year}</div>
                </div>
                <div className="fsi-tl-content">
                  <div className="fsi-tl-name">{s.name}</div>
                  <div className="fsi-tl-desc" dangerouslySetInnerHTML={{__html: s.desc}} />
                </div>
              </div>
            ))}
          </div>

          {/* ══ SECTION 7: Evaluation of PDS ══ */}
          <div className="fsi-divider"><div className="fsi-divider-mark" /></div>

          <div className="fsi-sec-head">
            <div className="fsi-sec-num">7</div>
            <div className="fsi-sec-title-wrap">
              <div className="fsi-sec-kicker">Critical Evaluation</div>
              <h2 className="fsi-sec-title">PDS — <span>Success &amp; Shortcomings</span></h2>
            </div>
          </div>

          <div className="fsi-eval-split">
            <div className="fsi-eval-col pros">
              <div className="fsi-eval-badge">✓ Achievements</div>
              <div className="fsi-eval-heading">What PDS Has Done Well</div>
              <ul>
                <li>Most effective tool for <strong>stabilising food prices</strong></li>
                <li>Makes food available at <strong>affordable prices</strong></li>
                <li>Has helped India <strong>avoid famine</strong> since the 1960s</li>
                <li>Nationwide network of fair price shops</li>
                <li>AAY targets the <strong>poorest of the poor</strong> specifically</li>
              </ul>
            </div>
            <div className="fsi-eval-col cons">
              <div className="fsi-eval-badge">✗ Shortcomings</div>
              <div className="fsi-eval-heading">Criticisms &amp; Failures</div>
              <ul>
                <li>Grain <strong>rots in godowns</strong> or eaten by rats</li>
                <li>PDS dealer <strong>malpractice</strong> — diversion to open market</li>
                <li>Many genuine poor <strong>excluded from BPL lists</strong></li>
                <li>Paradox: full granaries <strong>yet people go hungry</strong></li>
                <li>Poor quality of food distributed at ration shops</li>
              </ul>
            </div>
          </div>

          <div className="fsi-highlight">
            <div className="fsi-highlight-label">The Paradox</div>
            <div className="fsi-highlight-text">
              In July 2002, FCI held <strong>63 million tonnes</strong> of grain — more than double the required buffer norm of 24.3 million tonnes. Yet people went hungry. The reason: the poor simply <strong>don't have enough money to buy food</strong> — even at subsidised prices. Availability without affordability is not food security.
            </div>
          </div>

          {/* ══ SECTION 8: Cooperatives ══ */}
          <div className="fsi-divider"><div className="fsi-divider-mark" /></div>

          <div className="fsi-sec-head">
            <div className="fsi-sec-num">8</div>
            <div className="fsi-sec-title-wrap">
              <div className="fsi-sec-kicker">Community Solutions</div>
              <h2 className="fsi-sec-title">Role of <span>Cooperatives</span></h2>
            </div>
          </div>

          <p className="fsi-body-text">
            In the southern and western parts of India, <strong>cooperatives and NGOs</strong> have stepped in to ensure food security where government systems have gaps. These are inspiring success stories of community-driven solutions.
          </p>

          <div className="fsi-coop-strip">
            <div className="fsi-coop-item">
              <span className="fsi-coop-icon">🥛</span>
              <div className="fsi-coop-name">Mother Dairy</div>
              <div className="fsi-coop-desc">Supplies <strong>milk and vegetables</strong> at controlled prices in Delhi. A cooperative success in affordable urban food security.</div>
            </div>
            <div className="fsi-coop-item">
              <span className="fsi-coop-icon">🧀</span>
              <div className="fsi-coop-name">Amul (Gujarat)</div>
              <div className="fsi-coop-desc">World's largest dairy cooperative. Procures milk from <strong>millions of small farmers</strong>, sells nationally &amp; internationally. Model of farmer empowerment.</div>
            </div>
            <div className="fsi-coop-item">
              <span className="fsi-coop-icon">🏦</span>
              <div className="fsi-coop-name">ADS Grain Banks (Maharashtra)</div>
              <div className="fsi-coop-desc">Maharashtra's Academy of Development Science facilitated a network of <strong>NGOs and grain banks</strong> to ensure food access for the rural poor.</div>
            </div>
          </div>

          {/* Quick Revision Table */}
          <div className="fsi-table-wrap">
            <div className="fsi-table-title">📊 Quick Revision — Key Facts</div>
            {[
              ["Food Security Pillars","Availability · Accessibility · Affordability"],
              ["FCI Buffer Stock (2002)","63 million tonnes — vs buffer norm of only 24.3 million tonnes"],
              ["MSP","Pre-announced price at which FCI buys from farmers"],
              ["Issue Price","Subsidised price at which PDS distributes food to the poor"],
              ["Rationing introduced","Around 1940 — after the Bengal Famine"],
              ["Green Revolution","Since 1960s — India has avoided famine; Punjab/Haryana led production growth"],
              ["AAY (2000)","For the poorest of the poor — highest food subsidy"],
              ["Amul / Mother Dairy","Cooperative success stories in food security"],
            ].map(([k,v]) => (
              <div className="fsi-table-row" key={k}>
                <div className="fsi-table-key">{k}</div>
                <div className="fsi-table-val">{v}</div>
              </div>
            ))}
          </div>

          <div className="fsi-pull-quote">
            <p>"While the granaries of the government are overflowing with excess stocks of food, we also find people without food — a paradox that highlights affordability as the real challenge."</p>
            <cite>— NCERT Economics, Class 9, Chapter 4</cite>
          </div>

          {/* ══ FAQ SECTION ══ */}
          <div className="fsi-divider"><div className="fsi-divider-mark" /></div>

          <div className="fsi-faq-header">
            <span className="fsi-faq-kicker">Exam Preparation</span>
          </div>
          <h2 className="fsi-faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, i) => (
            <div className={`fsi-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="fsi-faq-q" onClick={() => toggle(i)}>
                <span className="fsi-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="fsi-faq-icon">{openIndex === i ? "▴" : "▾"}</span>
              </button>
              <div className={`fsi-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
