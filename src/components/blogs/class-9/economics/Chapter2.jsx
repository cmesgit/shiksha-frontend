import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #120a1c;
    --ink2:       #241535;
    --muted:      #6b5580;
    --paper:      #fdf6ff;
    --paper2:     #f3e8ff;
    --accent:     #7c2d9e;
    --accent2:    #5b1a78;
    --accent-lt:  #f0d9ff;
    --coral:      #d44d2a;
    --coral-lt:   #fdeee8;
    --teal:       #0a7a72;
    --teal-lt:    #d9f5f2;
    --amber:      #b06a00;
    --amber-lt:   #fff4d9;
    --rule:       #dfc8f5;
    --white:      #ffffff;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .par-root {
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
  }

  /* ─────────────────────────────────────────
     HERO — deep violet-to-midnight gradient
  ───────────────────────────────────────── */
  .par-hero {
    background: linear-gradient(135deg, #0a0314 0%, #180528 50%, #1e063a 100%);
    min-height: 88vh;
    display: flex;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
    padding: 0 0 64px;
  }
  .par-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 6px;
    background: linear-gradient(90deg, #7c2d9e 0%, #d44d2a 50%, #0a7a72 100%);
  }
  .par-hero-bg-num {
    position: absolute;
    bottom: -60px; right: -30px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(220px, 36vw, 500px);
    font-weight: 900; line-height: 1;
    color: rgba(255,255,255,0.022);
    letter-spacing: -0.04em;
    user-select: none; pointer-events: none;
  }
  /* Human silhouette dot-matrix watermark */
  .par-hero-dots {
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(124,45,158,0.1) 1px, transparent 1px);
    background-size: 34px 34px;
    pointer-events: none;
  }
  /* Diagonal sweep */
  .par-hero-sweep {
    position: absolute;
    top: 0; right: -100px;
    width: 500px; height: 100%;
    background: linear-gradient(135deg, transparent 40%, rgba(212,77,42,0.05) 100%);
    pointer-events: none;
  }
  .par-glow-a {
    position: absolute; top: 10%; right: 6%;
    width: 360px; height: 360px; border-radius: 50%;
    background: radial-gradient(circle, rgba(124,45,158,0.16) 0%, transparent 70%);
    pointer-events: none;
  }
  .par-glow-b {
    position: absolute; bottom: 14%; left: 5%;
    width: 240px; height: 240px; border-radius: 50%;
    background: radial-gradient(circle, rgba(212,77,42,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  .par-hero-inner {
    max-width: 900px; width: 100%;
    margin: 0 auto; padding: 0 32px;
    position: relative; z-index: 1;
  }
  .par-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #d4a0ff; margin-bottom: 24px;
    display: flex; align-items: center; gap: 14px;
  }
  .par-overline::before, .par-overline::after {
    content: ''; flex: 0 0 40px; height: 1px; background: #d4a0ff;
  }
  .par-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(42px, 8vw, 86px);
    font-weight: 900; color: #fff;
    line-height: 0.95; letter-spacing: -0.03em;
    margin-bottom: 32px;
  }
  .par-hero-title em   { font-style: normal; color: #d4a0ff; }
  .par-hero-title .em2 { color: #ff9a7a; }
  .par-hero-bar {
    display: flex; flex-wrap: wrap; gap: 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 24px; margin-top: 8px;
  }
  .par-hero-bar-item {
    flex: 1 1 180px;
    padding: 0 24px 0 0;
    border-right: 1px solid rgba(255,255,255,0.1);
    margin-right: 24px;
  }
  .par-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .par-bar-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.35); margin-bottom: 5px;
  }
  .par-bar-value {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 600;
    color: rgba(255,255,255,0.75);
  }

  /* ─────────────────────────────────────────
     BODY
  ───────────────────────────────────────── */
  .par-body {
    max-width: 860px;
    margin: 0 auto;
    padding: 72px 32px 96px;
  }

  /* ─────────── DARK INTRO CARD ─────────── */
  .par-intro-card {
    background: linear-gradient(135deg, #0a0314 0%, #1e063a 100%);
    border-left: 5px solid #d4a0ff;
    border-radius: 4px;
    padding: 36px 40px;
    margin-bottom: 64px;
    position: relative; overflow: hidden;
  }
  .par-intro-card::after {
    content: '🧠';
    position: absolute; right: 32px; top: 50%;
    transform: translateY(-50%);
    font-size: 80px; opacity: 0.1; line-height: 1;
  }
  .par-intro-card p {
    font-family: 'Poppins', sans-serif;
    font-size: 18px; font-weight: 500;
    color: rgba(255,255,255,0.88);
    line-height: 1.78; margin: 0 0 14px;
  }
  .par-intro-card p:last-child { margin: 0; }
  .par-intro-card strong { color: #d4a0ff; }

  /* ─────────── SECTION HEADER ─────────── */
  .par-sec-head {
    display: flex; align-items: flex-start; gap: 20px;
    margin-bottom: 28px;
    border-bottom: 2px solid var(--rule);
    padding-bottom: 18px;
  }
  .par-sec-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 56px; font-weight: 900;
    color: var(--rule); line-height: 1; flex-shrink: 0;
  }
  @media (max-width: 600px) { .par-sec-num { font-size: 40px; } }
  .par-sec-title-wrap { padding-top: 8px; }
  .par-sec-kicker {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 6px;
  }
  .par-sec-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(22px, 3.5vw, 30px);
    font-weight: 800; color: var(--ink);
    line-height: 1.15; letter-spacing: -0.02em;
  }
  .par-sec-title span { color: var(--accent); }

  /* ─────────── BODY TEXT ─────────── */
  .par-body-text {
    font-family: 'Inter', sans-serif;
    font-size: 16px; font-weight: 400;
    color: var(--ink2); line-height: 1.85;
    margin-bottom: 28px;
  }
  .par-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── DIVIDER ─────────── */
  .par-divider {
    margin: 56px 0;
    display: flex; align-items: center; gap: 16px;
  }
  .par-divider::before, .par-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--rule);
  }
  .par-divider-mark {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--accent); flex-shrink: 0;
  }

  /* ─────────── KEY CONCEPT — DARK HIGHLIGHT ─────────── */
  .par-highlight {
    background: linear-gradient(135deg, #0a0314 0%, #1e063a 100%);
    border-radius: 6px;
    padding: 28px 32px 28px 36px;
    margin-bottom: 36px;
    position: relative; overflow: hidden;
  }
  .par-highlight::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 4px; height: 100%;
    background: linear-gradient(180deg, #d4a0ff, #ff9a7a);
  }
  .par-highlight-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #d4a0ff; margin-bottom: 10px;
  }
  .par-highlight-text {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 600;
    color: rgba(255,255,255,0.9); line-height: 1.7;
  }
  .par-highlight-text strong { color: #d4a0ff; }

  /* ─────────── PEOPLE AS RESOURCE vs HUMAN CAPITAL — BIG SPLIT ─────────── */
  .par-concept-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1.5px solid var(--rule);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 36px;
  }
  @media (max-width: 600px) { .par-concept-split { grid-template-columns: 1fr; } }
  .par-cs-col { padding: 28px 26px; }
  .par-cs-col.left  { background: var(--accent-lt); border-right: 1.5px solid var(--rule); }
  .par-cs-col.right { background: var(--teal-lt); }
  @media (max-width: 600px) {
    .par-cs-col.left { border-right: none; border-bottom: 1.5px solid var(--rule); }
  }
  .par-cs-badge {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    padding: 3px 12px; border-radius: 100px;
    display: inline-block; margin-bottom: 10px;
  }
  .par-cs-col.left  .par-cs-badge { background: rgba(124,45,158,0.14); color: var(--accent2); }
  .par-cs-col.right .par-cs-badge { background: rgba(10,122,114,0.14); color: var(--teal); }
  .par-cs-icon  { font-size: 36px; margin-bottom: 8px; display: block; }
  .par-cs-heading {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px; font-weight: 900;
    margin-bottom: 12px; letter-spacing: -0.01em;
  }
  .par-cs-col.left  .par-cs-heading { color: var(--accent2); }
  .par-cs-col.right .par-cs-heading { color: var(--teal); }
  .par-cs-def {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2); line-height: 1.7;
    margin-bottom: 14px;
  }
  .par-cs-col.left  .par-cs-def strong { color: var(--accent2); font-weight: 600; }
  .par-cs-col.right .par-cs-def strong { color: var(--teal); font-weight: 600; }
  .par-cs-note {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 600;
    padding: 8px 12px; border-radius: 4px;
    line-height: 1.5;
  }
  .par-cs-col.left  .par-cs-note { background: rgba(124,45,158,0.1); color: var(--accent2); }
  .par-cs-col.right .par-cs-note { background: rgba(10,122,114,0.1); color: var(--teal); }

  /* ─────────── ECONOMIC vs NON-ECONOMIC — CONTRAST BLOCK ─────────── */
  .par-eco-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1.5px solid var(--rule);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 36px;
  }
  @media (max-width: 600px) { .par-eco-split { grid-template-columns: 1fr; } }
  .par-eco-col { padding: 26px 24px; }
  .par-eco-col.eco   { background: var(--coral-lt); border-right: 1.5px solid var(--rule); }
  .par-eco-col.noneco{ background: var(--amber-lt); }
  @media (max-width: 600px) {
    .par-eco-col.eco { border-right: none; border-bottom: 1.5px solid var(--rule); }
  }
  .par-eco-badge {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 100px;
    display: inline-block; margin-bottom: 10px;
  }
  .par-eco-col.eco    .par-eco-badge { background: rgba(212,77,42,0.12); color: var(--coral); }
  .par-eco-col.noneco .par-eco-badge { background: rgba(176,106,0,0.12); color: var(--amber); }
  .par-eco-heading {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px; font-weight: 900;
    margin-bottom: 12px;
  }
  .par-eco-col.eco    .par-eco-heading { color: var(--coral); }
  .par-eco-col.noneco .par-eco-heading { color: var(--amber); }
  .par-eco-col ul { list-style: none; padding: 0; }
  .par-eco-col ul li {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2);
    padding: 8px 0 8px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.07);
    position: relative; line-height: 1.55;
  }
  .par-eco-col ul li:last-child { border-bottom: none; }
  .par-eco-col ul li::before {
    content: ''; position: absolute; left: 0; top: 14px;
    width: 6px; height: 6px; border-radius: 50%;
  }
  .par-eco-col.eco    ul li::before { background: var(--coral); }
  .par-eco-col.noneco ul li::before { background: var(--amber); }
  .par-eco-col ul li strong { font-weight: 600; }
  .par-eco-col.eco    ul li strong { color: var(--coral); }
  .par-eco-col.noneco ul li strong { color: var(--amber); }

  /* ─────────── 3-SECTOR STRIP (dark) ─────────── */
  .par-sector-strip {
    background: linear-gradient(135deg, #0a0314 0%, #1e063a 100%);
    border-radius: 8px;
    padding: 36px 32px;
    margin-bottom: 36px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;
  }
  @media (max-width: 720px) {
    .par-sector-strip { grid-template-columns: 1fr; padding: 28px 24px; gap: 0; }
  }
  .par-sector-item {
    padding: 0;
    border-right: 1px solid rgba(255,255,255,0.1);
    padding-right: 24px;
  }
  .par-sector-item:last-child { border-right: none; padding-right: 0; }
  @media (max-width: 720px) {
    .par-sector-item {
      border-right: none;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-right: 0; padding-bottom: 20px; margin-bottom: 20px;
    }
    .par-sector-item:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
  }
  .par-sector-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px; font-weight: 900;
    letter-spacing: 0.2em; text-transform: uppercase;
    margin-bottom: 8px; display: block;
  }
  .par-sector-item:nth-child(1) .par-sector-num { color: #d4a0ff; }
  .par-sector-item:nth-child(2) .par-sector-num { color: #ff9a7a; }
  .par-sector-item:nth-child(3) .par-sector-num { color: #5eead4; }
  .par-sector-icon { font-size: 30px; margin-bottom: 10px; display: block; }
  .par-sector-name {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; font-weight: 700;
    color: #fff; margin-bottom: 8px;
  }
  .par-sector-def {
    font-family: 'Inter', sans-serif;
    font-size: 13px; color: rgba(255,255,255,0.7);
    line-height: 1.65; margin-bottom: 10px;
  }
  .par-sector-examples {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 600;
    line-height: 1.5;
  }
  .par-sector-item:nth-child(1) .par-sector-examples { color: #d4a0ff; }
  .par-sector-item:nth-child(2) .par-sector-examples { color: #ff9a7a; }
  .par-sector-item:nth-child(3) .par-sector-examples { color: #5eead4; }

  /* ─────────── QUALITY OF POPULATION — STAT GRID ─────────── */
  .par-qual-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 36px;
  }
  @media (max-width: 640px) { .par-qual-grid { grid-template-columns: 1fr; } }
  .par-qual-card {
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-top: 4px solid var(--accent);
    border-radius: 6px;
    padding: 24px 18px; text-align: center;
  }
  .par-qual-card.coral-top { border-top-color: var(--coral); }
  .par-qual-card.teal-top  { border-top-color: var(--teal); }
  .par-qual-icon  { font-size: 28px; margin-bottom: 8px; display: block; }
  .par-qual-title {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 700;
    color: var(--accent); margin-bottom: 8px;
  }
  .par-qual-card.coral-top .par-qual-title { color: var(--coral); }
  .par-qual-card.teal-top  .par-qual-title { color: var(--teal); }
  .par-qual-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13px; color: var(--ink2); line-height: 1.6;
  }

  /* ─────────── EDUCATION SECTION — CARD GRID ─────────── */
  .par-card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 36px;
  }
  @media (max-width: 600px) { .par-card-grid { grid-template-columns: 1fr; } }
  .par-card {
    border-radius: 6px; padding: 26px 26px 22px;
    border: 1.5px solid var(--rule); background: var(--white);
  }
  .par-card.violet { background: var(--accent-lt); border-color: #c4a0e8; }
  .par-card.coral  { background: var(--coral-lt);  border-color: #f0b09a; }
  .par-card.teal   { background: var(--teal-lt);   border-color: #8ad5d0; }
  .par-card.amber  { background: var(--amber-lt);  border-color: #e8cc80; }
  .par-card.dark {
    background: linear-gradient(135deg, #0a0314, #1e063a);
    border-color: transparent;
  }
  .par-card-tag {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    margin-bottom: 10px; color: var(--accent);
  }
  .par-card.coral  .par-card-tag { color: var(--coral); }
  .par-card.teal   .par-card-tag { color: var(--teal); }
  .par-card.amber  .par-card-tag { color: var(--amber); }
  .par-card.dark   .par-card-tag { color: #d4a0ff; }
  .par-card-title {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 700;
    color: var(--ink); margin-bottom: 14px; line-height: 1.3;
  }
  .par-card.coral  .par-card-title { color: var(--coral); }
  .par-card.teal   .par-card-title { color: var(--teal); }
  .par-card.amber  .par-card-title { color: var(--amber); }
  .par-card.dark   .par-card-title { color: #fff; }
  .par-card ul { list-style: none; padding: 0; }
  .par-card ul li {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2);
    padding: 7px 0 7px 18px;
    border-bottom: 1px solid rgba(0,0,0,0.07);
    position: relative; line-height: 1.55;
  }
  .par-card ul li:last-child { border-bottom: none; }
  .par-card ul li::before {
    content: ''; position: absolute; left: 0; top: 14px;
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent);
  }
  .par-card.coral  ul li::before { background: var(--coral); }
  .par-card.teal   ul li::before { background: var(--teal); }
  .par-card.amber  ul li::before { background: var(--amber); }
  .par-card.dark   ul li::before { background: #d4a0ff; }
  .par-card ul li strong { font-weight: 600; color: var(--accent2); }
  .par-card.coral  ul li strong { color: var(--coral); }
  .par-card.teal   ul li strong { color: var(--teal); }
  .par-card.amber  ul li strong { color: var(--amber); }
  .par-card.dark   ul li { color: rgba(255,255,255,0.8); border-bottom-color: rgba(255,255,255,0.08); }
  .par-card.dark   ul li strong { color: #d4a0ff; }

  /* ─────────── HEALTH STATS — BEFORE / AFTER ─────────── */
  .par-health-compare {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 36px;
  }
  @media (max-width: 520px) { .par-health-compare { grid-template-columns: 1fr; } }
  .par-hc-box {
    border-radius: 6px; padding: 24px 22px;
    text-align: center;
    border: 1.5px solid var(--rule);
  }
  .par-hc-box.before { background: var(--coral-lt); border-color: #f0b09a; }
  .par-hc-box.after  { background: var(--teal-lt);  border-color: #8ad5d0; }
  .par-hc-era {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    margin-bottom: 10px; display: inline-block;
    padding: 3px 10px; border-radius: 100px;
  }
  .par-hc-box.before .par-hc-era { background: rgba(212,77,42,0.12); color: var(--coral); }
  .par-hc-box.after  .par-hc-era { background: rgba(10,122,114,0.12); color: var(--teal); }
  .par-hc-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 42px; font-weight: 900;
    line-height: 1; margin-bottom: 4px;
  }
  .par-hc-box.before .par-hc-num { color: var(--coral); }
  .par-hc-box.after  .par-hc-num { color: var(--teal); }
  .par-hc-label {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 600;
    color: var(--ink2); margin-bottom: 4px;
  }
  .par-hc-sub {
    font-family: 'Inter', sans-serif;
    font-size: 12px; color: var(--muted);
  }

  /* ─────────── IMR STAT BAND ─────────── */
  .par-imr-band {
    background: linear-gradient(135deg, #0a0314 0%, #1e063a 100%);
    border-radius: 6px; padding: 24px 32px;
    margin-bottom: 36px;
    display: flex; align-items: center; gap: 24px;
    flex-wrap: wrap;
  }
  .par-imr-band-icon { font-size: 40px; flex-shrink: 0; }
  .par-imr-band-text {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 600;
    color: rgba(255,255,255,0.88); line-height: 1.7;
    flex: 1; min-width: 200px;
  }
  .par-imr-band-text strong { color: #ff9a7a; }

  /* ─────────── TERM BOX ─────────── */
  .par-term-box {
    background: var(--paper2);
    border: 1.5px solid var(--rule);
    border-left: 5px solid var(--accent);
    border-radius: 4px;
    padding: 18px 26px;
    margin-bottom: 16px;
    display: flex; align-items: flex-start; gap: 16px;
  }
  .par-term-box.coral  { border-left-color: var(--coral); }
  .par-term-box.teal   { border-left-color: var(--teal); }
  .par-term-box.amber  { border-left-color: var(--amber); }
  .par-term-icon  { font-size: 26px; flex-shrink: 0; line-height: 1; margin-top: 2px; }
  .par-term-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 4px;
  }
  .par-term-box.coral .par-term-label { color: var(--coral); }
  .par-term-box.teal  .par-term-label { color: var(--teal); }
  .par-term-box.amber .par-term-label { color: var(--amber); }
  .par-term-name {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px; font-weight: 900;
    color: var(--ink); margin-bottom: 5px;
  }
  .par-term-def {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2); line-height: 1.7;
  }
  .par-term-def strong { color: var(--accent2); font-weight: 600; }
  .par-term-box.coral .par-term-def strong { color: var(--coral); }
  .par-term-box.teal  .par-term-def strong { color: var(--teal); }
  .par-term-box.amber .par-term-def strong { color: var(--amber); }

  /* ─────────── UNEMPLOYMENT — 2-TYPE TIMELINE CARDS ─────────── */
  .par-unemp-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 36px;
  }
  @media (max-width: 600px) { .par-unemp-grid { grid-template-columns: 1fr; } }
  .par-unemp-card {
    border-radius: 8px; padding: 28px 26px;
    position: relative; overflow: hidden;
  }
  .par-unemp-card.seasonal {
    background: linear-gradient(135deg, #1e063a 0%, #2d0a54 100%);
    border: 1.5px solid rgba(212,160,255,0.2);
  }
  .par-unemp-card.disguised {
    background: linear-gradient(135deg, #0a1e3a 0%, #0a2a54 100%);
    border: 1.5px solid rgba(94,234,212,0.2);
  }
  .par-unemp-card-badge {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    padding: 4px 12px; border-radius: 100px;
    display: inline-block; margin-bottom: 14px;
  }
  .par-unemp-card.seasonal  .par-unemp-card-badge { background: rgba(212,160,255,0.15); color: #d4a0ff; }
  .par-unemp-card.disguised .par-unemp-card-badge { background: rgba(94,234,212,0.15); color: #5eead4; }
  .par-unemp-card-icon { font-size: 36px; margin-bottom: 10px; display: block; }
  .par-unemp-card-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px; font-weight: 900;
    color: #fff; margin-bottom: 14px; letter-spacing: -0.01em;
  }
  .par-unemp-card ul { list-style: none; padding: 0; }
  .par-unemp-card ul li {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: rgba(255,255,255,0.78);
    padding: 8px 0 8px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    position: relative; line-height: 1.6;
  }
  .par-unemp-card ul li:last-child { border-bottom: none; }
  .par-unemp-card ul li::before {
    content: ''; position: absolute; left: 0; top: 14px;
    width: 6px; height: 6px; border-radius: 50%;
  }
  .par-unemp-card.seasonal  ul li::before { background: #d4a0ff; }
  .par-unemp-card.disguised ul li::before { background: #5eead4; }
  .par-unemp-card ul li strong { font-weight: 600; }
  .par-unemp-card.seasonal  ul li strong { color: #d4a0ff; }
  .par-unemp-card.disguised ul li strong { color: #5eead4; }

  /* ─────────── CONSEQUENCES — NUMBERED ROWS ─────────── */
  .par-consequence-list { margin-bottom: 36px; }
  .par-cons-item {
    display: flex; align-items: flex-start; gap: 18px;
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-radius: 6px;
    padding: 18px 22px;
    margin-bottom: 10px;
  }
  .par-cons-item:hover { border-color: var(--accent); }
  .par-cons-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 28px; font-weight: 900;
    color: var(--rule); line-height: 1; flex-shrink: 0;
    min-width: 36px;
  }
  .par-cons-text {
    font-family: 'Inter', sans-serif;
    font-size: 15px; color: var(--ink2); line-height: 1.7;
    padding-top: 4px;
  }
  .par-cons-text strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── EDUCATION GDP STAT ─────────── */
  .par-gdp-strip {
    background: var(--paper2);
    border: 1.5px solid var(--rule);
    border-left: 5px solid var(--accent);
    border-radius: 4px;
    padding: 20px 28px;
    margin-bottom: 28px;
    display: flex; align-items: center; gap: 24px; flex-wrap: wrap;
  }
  .par-gdp-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 44px; font-weight: 900;
    color: var(--accent); line-height: 1; flex-shrink: 0;
  }
  .par-gdp-text {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 600;
    color: var(--ink2); line-height: 1.65; flex: 1; min-width: 180px;
  }
  .par-gdp-text strong { color: var(--accent2); }

  /* ─────────── PULL QUOTE ─────────── */
  .par-pull-quote {
    border-left: 4px solid var(--accent);
    padding: 20px 28px;
    background: var(--accent-lt);
    border-radius: 0 6px 6px 0;
    margin-bottom: 36px;
  }
  .par-pull-quote p {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 600;
    color: var(--accent2); line-height: 1.7;
    margin-bottom: 8px; font-style: italic;
  }
  .par-pull-quote cite {
    font-family: 'Inter', sans-serif;
    font-size: 13px; color: var(--muted); font-style: normal;
  }

  /* ─────────── TABLE ─────────── */
  .par-table-wrap {
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-radius: 6px; overflow: hidden;
    margin-bottom: 36px;
  }
  .par-table-title {
    background: var(--accent2); color: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    padding: 14px 22px; letter-spacing: 0.04em;
  }
  .par-table-row {
    display: grid;
    grid-template-columns: minmax(120px, 190px) 1fr;
    border-bottom: 1px solid var(--rule);
  }
  @media (max-width: 520px) { .par-table-row { grid-template-columns: 1fr; } }
  .par-table-row:last-child { border-bottom: none; }
  .par-table-key {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    color: var(--accent2); padding: 14px 18px;
    background: var(--paper2);
    border-right: 1px solid var(--rule);
    display: flex; align-items: center;
  }
  @media (max-width: 520px) {
    .par-table-key { border-right: none; border-bottom: 1px solid var(--rule); padding: 10px 16px; }
  }
  .par-table-val {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2);
    padding: 14px 18px; line-height: 1.6;
  }
  @media (max-width: 520px) { .par-table-val { padding: 10px 16px; } }
  .par-table-val strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── FAQ ─────────── */
  .par-faq-header {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 10px;
  }
  .par-faq-kicker {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--accent);
    padding: 4px 14px;
    border: 1.5px solid var(--accent);
    border-radius: 100px;
    display: inline-block;
  }
  .par-faq-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(24px, 4vw, 34px);
    font-weight: 900; color: var(--ink);
    letter-spacing: -0.025em;
    margin-bottom: 28px;
  }
  .par-faq-item {
    border: 1.5px solid var(--rule);
    border-radius: 6px;
    margin-bottom: 10px;
    overflow: hidden;
    background: var(--white);
  }
  .par-faq-item.open { border-color: var(--accent); }
  .par-faq-q {
    width: 100%; background: none; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 22px; gap: 16px; text-align: left;
  }
  .par-faq-q:hover { background: var(--paper2); }
  .par-faq-q-text {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 600;
    color: var(--ink); line-height: 1.5;
  }
  .par-faq-item.open .par-faq-q-text { color: var(--accent2); }
  .par-faq-icon {
    font-size: 20px; color: var(--accent);
    flex-shrink: 0; line-height: 1; user-select: none;
  }
  .par-faq-ans {
    display: none;
    font-family: 'Inter', sans-serif;
    font-size: 15px; color: var(--ink2);
    line-height: 1.8; padding: 0 22px 20px;
  }
  .par-faq-ans.visible { display: block; }
  .par-faq-ans strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── RESPONSIVE ─────────── */
  @media (max-width: 600px) {
    .par-body { padding: 48px 16px 72px; }
    .par-hero-inner { padding: 0 20px; }
    .par-intro-card { padding: 24px 20px; }
    .par-intro-card::after { display: none; }
    .par-health-compare { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 400px) {
    .par-health-compare { grid-template-columns: 1fr; }
  }
`;

const faqs = [
  {
    q: "What does 'People as Resource' mean?",
    a: "'People as Resource' is a way of referring to a country's working population in terms of their existing productive skills and abilities. It means that people — when educated, trained, and kept healthy — are not just mouths to feed but become productive assets for the nation. Just like land and physical capital are resources that contribute to production, human beings with skills and knowledge are equally valuable as a resource. The term emphasises that population should be seen as an asset rather than a liability."
  },
  {
    q: "What is human capital? How is it formed?",
    a: "Human capital is the stock of skill, knowledge, and productive ability embodied in human beings. It is formed by investing in people through education, training, and health care. When the existing human resource is developed — by becoming educated, skilled, and healthy — it turns into human capital. Human capital is considered superior to other resources like land and physical capital because it can use and add value to those resources. For example, Japan lacks natural resources but has invested heavily in human capital and is today a developed nation."
  },
  {
    q: "What are economic activities? Give examples.",
    a: "Economic activities are activities undertaken to earn money or to satisfy material wants. They include all actions that result in the production, distribution, or consumption of goods and services. Examples include: the work of farmers, shopkeepers, manufacturers, doctors, lawyers, taxi drivers, factory workers, and teachers. Economic activities are also called market activities because they take place in the market and have a monetary value. All work for which a person is paid falls under economic activity."
  },
  {
    q: "What is the difference between market activities and non-market activities?",
    a: "Market activities (economic activities) are those performed for pay or profit — they are included in the national income calculation. Examples: a carpenter making furniture for sale, a teacher teaching in a school for a salary. Non-market activities are production for self-consumption — goods or services produced and consumed by the same person or family without being sold. Example: a woman cooking food for her own family, a farmer growing food for his own household. Non-market activities are not counted in national income even though they create value."
  },
  {
    q: "What are non-economic activities? How are they different from economic activities?",
    a: "Non-economic activities are activities not undertaken for any monetary gain. They are also called unpaid activities. Examples include: doing puja-paath (religious activities), housekeeping, helping the poor or disabled, caring for elderly parents, volunteering. The key difference is that economic activities involve monetary compensation while non-economic activities do not. Importantly, much of the domestic work done by women — cooking, cleaning, childcare — falls into the non-economic category, making it invisible in official economic statistics despite being essential."
  },
  {
    q: "What are the three sectors of economic activity? Explain each.",
    a: "Economic activities are classified into three sectors: (1) Primary Sector — activities that directly exploit natural resources. Includes agriculture, forestry, animal husbandry, fishing, poultry farming, and mining. Goods are produced by exploiting nature. (2) Secondary Sector — activities that process or manufacture raw materials. Includes small-scale and large-scale manufacturing, and construction. (3) Tertiary Sector (Service Sector) — activities that provide services rather than goods. Includes transport, education, banking, insurance, health, and tourism. This sector supports the primary and secondary sectors."
  },
  {
    q: "What determines the quality of population? Why is it important?",
    a: "The quality of population depends on three main factors: (1) Literacy rate — the proportion of educated people determines how skilled and productive the workforce can be. (2) Life expectancy — how long people live, which reflects the overall health standards of the nation. (3) Skill formation — the level of vocational and professional training available. High-quality population means more productivity, better governance, innovation, and economic growth. A country with a large but uneducated and unhealthy population cannot develop as effectively as one with a smaller but highly educated and healthy population."
  },
  {
    q: "What is the role of education in human resource development?",
    a: "Education is the most important component of human resource development. It contributes in several ways: it enhances national income by making workers more productive; it enriches cultural life; it increases the efficiency of governance; and it helps individuals lead better lives. Recognising this, government expenditure on education as a percentage of GDP rose from 0.64% in 1951–52 to 3.98% in 2002–03 (national goal is 6% of GDP). The government launched 'Sarva Shiksha Abhiyan' (SSA) to provide elementary education to all children below 14 years. However, problems like poor quality of schooling, high dropout rates, and uneven literacy between males/females and urban/rural areas remain challenges."
  },
  {
    q: "What is Sarva Shiksha Abhiyan? Why was it launched?",
    a: "Sarva Shiksha Abhiyan (SSA) is a government programme launched to provide elementary education to all children in India below the age of 14. It was launched because despite having 7.68 lakh schools by 2004–05, education quality was diluted by poor schooling infrastructure and high dropout rates. SSA aims to make free and compulsory education a reality, reduce gender and social gaps in literacy, and bring all children into school. It is a significant step towards Universal Elementary Education (UEE) in India and aligns with the constitutional provision of the Right to Education."
  },
  {
    q: "How has India's health status improved over time? Give statistics.",
    a: "India has shown considerable improvement in health standards since independence: Life expectancy at birth rose from 37.2 years in 1951 to 63.9 years in 2001 — indicating that people are living much longer due to better nutrition, sanitation, and medical care. Infant Mortality Rate (IMR) — the number of children dying before age one per 1000 live births — fell dramatically from 147 (at independence) to 47 by 2010. India has built a vast health infrastructure of hospitals, primary health centres, and dispensaries. However, much more investment is needed, especially in rural areas where health facilities are inadequate."
  },
  {
    q: "What is infant mortality rate (IMR)?",
    a: "Infant Mortality Rate (IMR) refers to the death of a child under one year of age per 1000 live births in a given year. It is a key indicator of a country's health standard and quality of life. A high IMR indicates poor nutrition, weak healthcare, and inadequate sanitation. India's IMR has improved significantly from 147 at the time of independence to 47 by 2010, reflecting improvements in healthcare infrastructure, vaccination programmes, and maternal health services. However, there remains a large gap between rural and urban IMR in India."
  },
  {
    q: "What is unemployment? Who is considered unemployed in India?",
    a: "Unemployment exists when people who are willing to work at prevailing wage rates cannot find jobs. In India, when counting the unemployed, we refer to those in the age group of 15–59 years. Children below 15 years of age and elderly people above 60 are not counted in the unemployed category. Unemployment is an indicator of a depressed economy — when it rises, it signals that the economy is not generating enough productive opportunities to absorb the willing workforce, leading to waste of human resources."
  },
  {
    q: "What is seasonal unemployment? Who faces it most?",
    a: "Seasonal unemployment occurs when people fail to get work during some months of the year — particularly during the off-season in agriculture. Farm labourers face this problem the most. In India, agriculture is largely dependent on the monsoon and has distinct sowing and harvesting seasons. During the months between these seasons, farm workers have no work and thus no income. To address this, the government introduced schemes like MGNREGA (Mahatma Gandhi National Rural Employment Guarantee Act) to provide alternative employment during off-season periods."
  },
  {
    q: "What is disguised unemployment? How is it different from open unemployment?",
    a: "Disguised unemployment is a situation where more workers are engaged in a job than are actually needed. The extra workers appear to be working but their marginal productivity is zero — removing them would not reduce total output. It is most common in the agricultural sector in rural India, where land holdings are small and cannot productively absorb all family members who work on them. Unlike open unemployment (where a person has no job at all), in disguised unemployment the person appears employed but is essentially redundant in that job. It arises due to excessive population pressure on agriculture."
  },
  {
    q: "What are the consequences of unemployment?",
    a: "Unemployment has serious economic and social consequences: (i) Wastage of manpower — unemployed people represent wasted human potential. Skills that could contribute to the economy go unused. (ii) Increased economic overload — the unemployed depend on the working population, increasing the dependency ratio and burdening the economy. (iii) Social unrest — unemployment can lead to frustration, poverty, crime, and social tension. An increase in unemployment is a key indicator of a depressed economy and can trigger wider instability if not addressed through policy."
  },
];

export default function ChapterPeopleAsResource() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>

      <div className="par-root">

        {/* ══════════════════ HERO ══════════════════ */}
        <div className="par-hero">
          <div className="par-hero-dots" />
          <div className="par-hero-sweep" />
          <div className="par-glow-a" />
          <div className="par-glow-b" />
          <div className="par-hero-bg-num">2</div>

          <div className="par-hero-inner">
            <div className="par-overline">Class 9 · Economics · Chapter 2</div>
            <h1 className="par-hero-title">
              People<br />
              <em>As</em><br />
              <span className="em2">Resource</span>
            </h1>
            <div className="par-hero-bar">
              <div className="par-hero-bar-item">
                <div className="par-bar-label">Subject</div>
                <div className="par-bar-value">Economics — Class 9</div>
              </div>
              <div className="par-hero-bar-item">
                <div className="par-bar-label">Chapter</div>
                <div className="par-bar-value">2 — People As Resource</div>
              </div>
              <div className="par-hero-bar-item">
                <div className="par-bar-label">Key Concepts</div>
                <div className="par-bar-value">Human Capital · Education · Health · Unemployment</div>
              </div>
              <div className="par-hero-bar-item">
                <div className="par-bar-label">Read Time</div>
                <div className="par-bar-value">⏱️ 12 min read</div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════ BODY ══════════════════ */}
        <div className="par-body">

          {/* ── LEAD INTRO CARD ── */}
          <div className="par-intro-card">
            <p>
              A country's <strong>population</strong> can be its greatest asset — or its biggest burden. The difference lies in investment. When people are educated, trained, and kept healthy, they transform from a mere demographic number into <strong>human capital</strong> — a productive, wealth-creating force that drives national growth.
            </p>
            <p>
              This chapter explores how human beings perform economic activities, how population quality is measured through education and health, and why <strong>unemployment</strong> is a critical challenge for a developing economy like India.
            </p>
          </div>

          {/* ══ SECTION 1: People as Resource vs Human Capital ══ */}
          <div className="par-sec-head">
            <div className="par-sec-num">1</div>
            <div className="par-sec-title-wrap">
              <div className="par-sec-kicker">Core Concept</div>
              <h2 className="par-sec-title">People as Resource &amp; <span>Human Capital</span></h2>
            </div>
          </div>

          <p className="par-body-text">
            The phrase <strong>"People as Resource"</strong> shifts how we think about population — from a problem to be managed into a <strong>productive resource</strong> to be invested in. The key bridge between the two is human capital formation.
          </p>

          <div className="par-concept-split">
            <div className="par-cs-col left">
              <div className="par-cs-badge">Term 1</div>
              <span className="par-cs-icon">👥</span>
              <div className="par-cs-heading">People as Resource</div>
              <div className="par-cs-def">
                Refers to the working population of a country in terms of their <strong>existing productive skills and abilities</strong>. Looks at population from a supply-of-labour perspective.
              </div>
              <div className="par-cs-note">
                Population = potential resource when it has skills &amp; ability to work
              </div>
            </div>
            <div className="par-cs-col right">
              <div className="par-cs-badge">Term 2</div>
              <span className="par-cs-icon">🧠</span>
              <div className="par-cs-heading">Human Capital</div>
              <div className="par-cs-def">
                The stock of <strong>skill and productive knowledge</strong> embodied in human beings. Formed when population is provided with better education, training, and health care.
              </div>
              <div className="par-cs-note">
                Human Capital is superior — it uses land &amp; physical capital and adds value to them
              </div>
            </div>
          </div>

          <div className="par-highlight">
            <div className="par-highlight-label">Key Insight — Japan's Example</div>
            <div className="par-highlight-text">
              Japan has <strong>no rich natural resources</strong>, yet is one of the world's most developed nations. The reason? Massive investment in <strong>human capital through education and health</strong>. This proves that people — not land or minerals — are a nation's most valuable resource.
            </div>
          </div>

          {/* ══ SECTION 2: Economic Activities ══ */}
          <div className="par-divider"><div className="par-divider-mark" /></div>

          <div className="par-sec-head">
            <div className="par-sec-num">2</div>
            <div className="par-sec-title-wrap">
              <div className="par-sec-kicker">Types of Activities</div>
              <h2 className="par-sec-title">Economic &amp; <span>Non-Economic Activities</span></h2>
            </div>
          </div>

          <p className="par-body-text">
            Human beings perform many activities. These can be broadly grouped into <strong>economic</strong> (for monetary gain) and <strong>non-economic</strong> (not for monetary gain) activities. Understanding this distinction is essential to measuring a nation's productive output.
          </p>

          <div className="par-eco-split">
            <div className="par-eco-col eco">
              <div className="par-eco-badge">Monetary</div>
              <div className="par-eco-heading">Economic Activities</div>
              <ul>
                <li>Undertaken for <strong>monetary gain</strong> or to satisfy wants</li>
                <li>Also called <strong>market activities</strong></li>
                <li>Counted in national income (GDP)</li>
                <li>Examples: <strong>farmers, shopkeepers, doctors</strong></li>
                <li>Factory workers, lawyers, taxi drivers</li>
                <li>Also includes <strong>self-employed</strong> persons</li>
              </ul>
            </div>
            <div className="par-eco-col noneco">
              <div className="par-eco-badge">Non-Monetary</div>
              <div className="par-eco-heading">Non-Economic Activities</div>
              <ul>
                <li>NOT undertaken for <strong>any monetary gain</strong></li>
                <li>Also called <strong>unpaid activities</strong></li>
                <li>NOT counted in national income</li>
                <li>Examples: <strong>puja-paath, housekeeping</strong></li>
                <li>Helping the poor or disabled</li>
                <li>Domestic work by <strong>women in households</strong></li>
              </ul>
            </div>
          </div>

          <div className="par-term-box amber">
            <div className="par-term-icon">🏪</div>
            <div>
              <div className="par-term-label">Important Distinction</div>
              <div className="par-term-name">Market vs Non-Market Activities</div>
              <div className="par-term-def">
                <strong>Market activities</strong> = economic activities (production for sale/trade). <strong>Non-market activities</strong> = production for self-consumption — e.g., a farmer growing food only for his own family. Non-market activities have value but are excluded from official GDP calculation.
              </div>
            </div>
          </div>

          {/* ══ SECTION 3: Classification of Economic Activities ══ */}
          <div className="par-divider"><div className="par-divider-mark" /></div>

          <div className="par-sec-head">
            <div className="par-sec-num">3</div>
            <div className="par-sec-title-wrap">
              <div className="par-sec-kicker">Sectors of the Economy</div>
              <h2 className="par-sec-title">Three Sectors of <span>Economic Activity</span></h2>
            </div>
          </div>

          <p className="par-body-text">
            Economic activities are classified into <strong>three main sectors</strong>. Each sector represents a different stage of production and type of work that people perform in an economy.
          </p>

          <div className="par-sector-strip">
            <div className="par-sector-item">
              <span className="par-sector-num">Primary</span>
              <span className="par-sector-icon">🌾</span>
              <div className="par-sector-name">Primary Sector</div>
              <div className="par-sector-def">
                Goods produced by directly exploiting nature. Involves extraction of raw materials from the earth or sea.
              </div>
              <div className="par-sector-examples">Agriculture · Forestry · Animal Husbandry · Fishing · Poultry · Mining</div>
            </div>
            <div className="par-sector-item">
              <span className="par-sector-num">Secondary</span>
              <span className="par-sector-icon">🏭</span>
              <div className="par-sector-name">Secondary Sector</div>
              <div className="par-sector-def">
                Raw materials from the primary sector are processed and manufactured into finished goods.
              </div>
              <div className="par-sector-examples">Small Manufacturing · Large Manufacturing · Construction</div>
            </div>
            <div className="par-sector-item">
              <span className="par-sector-num">Tertiary</span>
              <span className="par-sector-icon">🏦</span>
              <div className="par-sector-name">Tertiary Sector</div>
              <div className="par-sector-def">
                Also called the Service Sector. Provides various services that support the other two sectors and daily life.
              </div>
              <div className="par-sector-examples">Transport · Education · Banking · Insurance · Health · Tourism</div>
            </div>
          </div>

          <div className="par-term-box">
            <div className="par-term-icon">👩‍🍳</div>
            <div>
              <div className="par-term-label">Division of Labour — Women</div>
              <div className="par-term-name">Traditional Role of Women in India</div>
              <div className="par-term-def">
                In India, there is traditionally a <strong>division of labour between men and women</strong>. Women generally look after domestic affairs — cooking, washing clothes, cleaning utensils, housekeeping, and caring for children. These activities are <strong>non-economic</strong> (unpaid) yet form the foundation of family and social life.
              </div>
            </div>
          </div>

          {/* ══ SECTION 4: Quality of Population ══ */}
          <div className="par-divider"><div className="par-divider-mark" /></div>

          <div className="par-sec-head">
            <div className="par-sec-num">4</div>
            <div className="par-sec-title-wrap">
              <div className="par-sec-kicker">Measuring Human Capital</div>
              <h2 className="par-sec-title">Quality of <span>Population</span></h2>
            </div>
          </div>

          <p className="par-body-text">
            The quality of a country's population determines how effectively it can serve as human capital. Quality is measured not by numbers alone but by three key indicators.
          </p>

          <div className="par-qual-grid">
            <div className="par-qual-card">
              <span className="par-qual-icon">📚</span>
              <div className="par-qual-title">Literacy Rate</div>
              <div className="par-qual-desc">Proportion of educated people. An educated population is more productive, innovative, and capable of skilled work. Literacy is uneven between males/females and urban/rural areas.</div>
            </div>
            <div className="par-qual-card coral-top">
              <span className="par-qual-icon">❤️</span>
              <div className="par-qual-title">Life Expectancy</div>
              <div className="par-qual-desc">How long people live on average. Reflects overall health, nutrition, and sanitation standards. India's life expectancy rose from 37.2 years (1951) to 63.9 years (2001).</div>
            </div>
            <div className="par-qual-card teal-top">
              <span className="par-qual-icon">⚙️</span>
              <div className="par-qual-title">Skill Formation</div>
              <div className="par-qual-desc">The level of vocational training and professional capability in the population. Skilled workers are more productive and command better wages in the labour market.</div>
            </div>
          </div>

          {/* ══ SECTION 5: Role of Education ══ */}
          <div className="par-divider"><div className="par-divider-mark" /></div>

          <div className="par-sec-head">
            <div className="par-sec-num">5</div>
            <div className="par-sec-title-wrap">
              <div className="par-sec-kicker">First Pillar</div>
              <h2 className="par-sec-title">Role of <span>Education</span></h2>
            </div>
          </div>

          <p className="par-body-text">
            Education is the <strong>most important component</strong> of human resource development. It is the primary tool through which a nation transforms its population into productive human capital.
          </p>

          <div className="par-card-grid">
            <div className="par-card violet">
              <div className="par-card-tag">What Education Contributes</div>
              <div className="par-card-title">Benefits of Education</div>
              <ul>
                <li>Contributes to <strong>growth of society</strong></li>
                <li>Enhances <strong>national income</strong> by raising productivity</li>
                <li>Increases <strong>cultural richness</strong></li>
                <li>Improves <strong>efficiency of governance</strong></li>
                <li>Enables individuals to earn better and live better</li>
              </ul>
            </div>
            <div className="par-card dark">
              <div className="par-card-tag">Sarva Shiksha Abhiyan</div>
              <div className="par-card-title">Education for All</div>
              <ul>
                <li>Goal: <strong>elementary education for all</strong> children below 14</li>
                <li>7.68 lakh schools existed by <strong>2004–05</strong></li>
                <li>High <strong>dropout rates</strong> remain a challenge</li>
                <li>Poor quality schooling dilutes impact</li>
                <li>Literacy is <strong>uneven</strong> — male &gt; female, urban &gt; rural</li>
              </ul>
            </div>
          </div>

          <div className="par-gdp-strip">
            <div className="par-gdp-num">3.98%</div>
            <div className="par-gdp-text">
              Government expenditure on education as % of GDP rose from <strong>0.64% in 1951–52</strong> to <strong>3.98% in 2002–03</strong>. The national goal is <strong>6% of GDP</strong> — still not achieved.
            </div>
          </div>

          <div className="par-pull-quote">
            <p>"Investment in human capital via education and medical care can give high returns in the future."</p>
            <cite>— NCERT Economics, Class 9, Chapter 2</cite>
          </div>

          {/* ══ SECTION 6: Role of Health ══ */}
          <div className="par-divider"><div className="par-divider-mark" /></div>

          <div className="par-sec-head">
            <div className="par-sec-num">6</div>
            <div className="par-sec-title-wrap">
              <div className="par-sec-kicker">Second Pillar</div>
              <h2 className="par-sec-title">Role of <span>Health</span></h2>
            </div>
          </div>

          <p className="par-body-text">
            Health is the second vital component of human resource development. The <strong>efficiency of workers</strong> depends largely on their physical and mental health. A sick population cannot be a productive population.
          </p>

          {/* Life Expectancy Before vs After */}
          <div className="par-health-compare">
            <div className="par-hc-box before">
              <div className="par-hc-era">1951</div>
              <div className="par-hc-num">37.2</div>
              <div className="par-hc-label">Years Life Expectancy</div>
              <div className="par-hc-sub">At the time of independence</div>
            </div>
            <div className="par-hc-box after">
              <div className="par-hc-era">2001</div>
              <div className="par-hc-num">63.9</div>
              <div className="par-hc-label">Years Life Expectancy</div>
              <div className="par-hc-sub">Significant improvement in 50 years</div>
            </div>
          </div>

          <div className="par-imr-band">
            <div className="par-imr-band-icon">👶</div>
            <div className="par-imr-band-text">
              <strong>Infant Mortality Rate</strong> (death of a child under one year per 1000 live births) fell from <strong>147 at independence</strong> to just <strong>47 by 2010</strong> — a massive improvement reflecting better maternal care, vaccination, and nutrition programmes.
            </div>
          </div>

          <div className="par-card-grid">
            <div className="par-card teal">
              <div className="par-card-tag">Progress Made</div>
              <div className="par-card-title">Health Improvements</div>
              <ul>
                <li>Life expectancy: <strong>37.2 → 63.9 years</strong> (1951–2001)</li>
                <li>IMR: <strong>147 → 47</strong> per 1000 births (by 2010)</li>
                <li>Vast health infrastructure built across India</li>
                <li>Primary health centres in most villages</li>
                <li>National immunisation programmes introduced</li>
              </ul>
            </div>
            <div className="par-card coral">
              <div className="par-card-tag">Challenges Remaining</div>
              <div className="par-card-title">What Still Needs Work</div>
              <ul>
                <li>Rural areas still <strong>lack adequate facilities</strong></li>
                <li>Doctor and nurse shortage in villages</li>
                <li>Malnutrition affects large sections</li>
                <li>High out-of-pocket medical expenses</li>
                <li><strong>Much more investment</strong> in health still needed</li>
              </ul>
            </div>
          </div>

          {/* ══ SECTION 7: Unemployment ══ */}
          <div className="par-divider"><div className="par-divider-mark" /></div>

          <div className="par-sec-head">
            <div className="par-sec-num">7</div>
            <div className="par-sec-title-wrap">
              <div className="par-sec-kicker">Key Challenge</div>
              <h2 className="par-sec-title">Unemployment in <span>India</span></h2>
            </div>
          </div>

          <p className="par-body-text">
            Unemployment exists when people who are <strong>willing to work at prevailing wage rates</strong> cannot find jobs. In India, the unemployed are counted in the <strong>age group of 15–59 years</strong>. Children below 15 and elderly above 60 are excluded.
          </p>

          <div className="par-term-box teal">
            <div className="par-term-icon">📉</div>
            <div>
              <div className="par-term-label">Economic Signal</div>
              <div className="par-term-name">Unemployment as an Indicator</div>
              <div className="par-term-def">
                An <strong>increase in unemployment is an indicator of a depressed economy</strong>. When unemployment rises, it signals that the economy is not generating enough productive opportunities, demand is falling, and human resources are being wasted.
              </div>
            </div>
          </div>

          {/* Two types of unemployment */}
          <div className="par-unemp-grid">
            <div className="par-unemp-card seasonal">
              <div className="par-unemp-card-badge">Type 1</div>
              <span className="par-unemp-card-icon">🌦️</span>
              <div className="par-unemp-card-title">Seasonal Unemployment</div>
              <ul>
                <li>People fail to get work during <strong>off-season months</strong></li>
                <li>Common among <strong>farm labourers</strong></li>
                <li>Agriculture has distinct sowing &amp; harvest seasons</li>
                <li>Workers have <strong>no income between seasons</strong></li>
                <li>MGNREGA provides alternative employment</li>
              </ul>
            </div>
            <div className="par-unemp-card disguised">
              <div className="par-unemp-card-badge">Type 2</div>
              <span className="par-unemp-card-icon">👁️</span>
              <div className="par-unemp-card-title">Disguised Unemployment</div>
              <ul>
                <li>More workers engaged than <strong>actually required</strong></li>
                <li>Extra workers have <strong>zero marginal productivity</strong></li>
                <li>Removing them won't reduce total output</li>
                <li>Found mainly in <strong>rural agriculture</strong></li>
                <li>Caused by excess population pressure on land</li>
              </ul>
            </div>
          </div>

          {/* Consequences */}
          <p className="par-body-text">
            <strong>Consequences of Unemployment</strong> — unemployment is not just an individual problem. It has serious cascading effects on the economy and society:
          </p>

          <div className="par-consequence-list">
            <div className="par-cons-item">
              <div className="par-cons-num">01</div>
              <div className="par-cons-text">
                <strong>Wastage of manpower resource</strong> — people who could contribute to economic output remain idle. Their skills, energy, and potential go unused, reducing the nation's productive capacity.
              </div>
            </div>
            <div className="par-cons-item">
              <div className="par-cons-num">02</div>
              <div className="par-cons-text">
                <strong>Increased economic overload</strong> — the unemployed become financially dependent on the working population. This raises the <strong>dependency ratio</strong>, burdening the economy and reducing per-capita consumption.
              </div>
            </div>
            <div className="par-cons-item">
              <div className="par-cons-num">03</div>
              <div className="par-cons-text">
                <strong>Social unrest and tension</strong> — persistent unemployment leads to frustration, poverty, crime, and social instability. Young unemployed populations are especially vulnerable to radicalisation and social disruption.
              </div>
            </div>
          </div>

          {/* Summary table */}
          <div className="par-table-wrap">
            <div className="par-table-title">📊 Quick Revision — Key Facts</div>
            {[
              ["GDP on Education", "Rose from 0.64% (1951–52) to 3.98% (2002–03). National goal: 6% of GDP"],
              ["Schools (2004–05)", "7.68 lakh schools in India — but quality and dropout rates remain concerns"],
              ["Life Expectancy", "Improved from 37.2 years (1951) to 63.9 years (2001)"],
              ["Infant Mortality", "Fell from 147 (independence) to 47 per 1000 births (2010)"],
              ["Unemployed Age Group", "15–59 years. Below 15 and above 60 are not counted"],
              ["Japan's Lesson", "No rich natural resources → invested in human capital → became a developed nation"],
            ].map(([k, v]) => (
              <div className="par-table-row" key={k}>
                <div className="par-table-key">{k}</div>
                <div className="par-table-val">{v}</div>
              </div>
            ))}
          </div>

          {/* ══ FAQ SECTION ══ */}
          <div className="par-divider"><div className="par-divider-mark" /></div>

          <div className="par-faq-header">
            <span className="par-faq-kicker">Exam Preparation</span>
          </div>
          <h2 className="par-faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, i) => (
            <div className={`par-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="par-faq-q" onClick={() => toggle(i)}>
                <span className="par-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="par-faq-icon">{openIndex === i ? "▴" : "▾"}</span>
              </button>
              <div className={`par-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
