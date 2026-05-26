import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #0f160a;
    --ink2:       #1e2f14;
    --muted:      #556b42;
    --paper:      #f3f8ef;
    --paper2:     #e5f0dc;
    --accent:     #3a7d0a;
    --accent2:    #2a5c07;
    --accent-lt:  #d9f0c4;
    --gold:       #b07a00;
    --gold-lt:    #fff7e0;
    --rust:       #c0430a;
    --rust-lt:    #fdeee7;
    --sky:        #0a6b8a;
    --sky-lt:     #daf0f7;
    --rule:       #c3dab3;
    --white:      #ffffff;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .pal-root {
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
  }

  /* ─────────────────────────────────────────
     HERO — deep forest-green dark gradient
  ───────────────────────────────────────── */
  .pal-hero {
    background: linear-gradient(135deg, #050d02 0%, #0b1e05 50%, #112905 100%);
    min-height: 88vh;
    display: flex;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
    padding: 0 0 64px;
  }
  /* Top accent bar */
  .pal-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 6px;
    background: linear-gradient(90deg, #3a7d0a 0%, #b07a00 50%, #0a6b8a 100%);
  }
  /* Ghost chapter number */
  .pal-hero-bg-num {
    position: absolute;
    bottom: -60px; right: -30px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(220px, 36vw, 500px);
    font-weight: 900; line-height: 1;
    color: rgba(255,255,255,0.022);
    letter-spacing: -0.04em;
    user-select: none; pointer-events: none;
  }
  /* Wheat field dot watermark */
  .pal-hero-dots {
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(58,125,10,0.09) 1px, transparent 1px);
    background-size: 38px 38px;
    pointer-events: none;
  }
  /* Horizon line accent */
  .pal-hero-horizon {
    position: absolute;
    bottom: 30%;
    left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(58,125,10,0.18) 30%, rgba(176,122,0,0.14) 70%, transparent 100%);
    pointer-events: none;
  }
  /* Glow blobs */
  .pal-glow-a {
    position: absolute; top: 12%; right: 7%;
    width: 340px; height: 340px; border-radius: 50%;
    background: radial-gradient(circle, rgba(58,125,10,0.14) 0%, transparent 70%);
    pointer-events: none;
  }
  .pal-glow-b {
    position: absolute; bottom: 18%; left: 5%;
    width: 220px; height: 220px; border-radius: 50%;
    background: radial-gradient(circle, rgba(176,122,0,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  .pal-hero-inner {
    max-width: 900px; width: 100%;
    margin: 0 auto; padding: 0 32px;
    position: relative; z-index: 1;
  }
  .pal-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #8fda50; margin-bottom: 24px;
    display: flex; align-items: center; gap: 14px;
  }
  .pal-overline::before, .pal-overline::after {
    content: ''; flex: 0 0 40px; height: 1px; background: #8fda50;
  }
  .pal-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(42px, 8vw, 86px);
    font-weight: 900; color: #fff;
    line-height: 0.95; letter-spacing: -0.03em;
    margin-bottom: 32px;
  }
  .pal-hero-title em   { font-style: normal; color: #8fda50; }
  .pal-hero-title .em2 { color: #fbbf24; }
  .pal-hero-bar {
    display: flex; flex-wrap: wrap; gap: 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 24px; margin-top: 8px;
  }
  .pal-hero-bar-item {
    flex: 1 1 180px;
    padding: 0 24px 0 0;
    border-right: 1px solid rgba(255,255,255,0.1);
    margin-right: 24px;
  }
  .pal-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .pal-bar-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.35); margin-bottom: 5px;
  }
  .pal-bar-value {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 600;
    color: rgba(255,255,255,0.75);
  }

  /* ─────────────────────────────────────────
     BODY
  ───────────────────────────────────────── */
  .pal-body {
    max-width: 860px;
    margin: 0 auto;
    padding: 72px 32px 96px;
  }

  /* ─────────── DARK INTRO CARD ─────────── */
  .pal-intro-card {
    background: linear-gradient(135deg, #050d02 0%, #112905 100%);
    border-left: 5px solid #8fda50;
    border-radius: 4px;
    padding: 36px 40px;
    margin-bottom: 64px;
    position: relative; overflow: hidden;
  }
  .pal-intro-card::after {
    content: '🌾';
    position: absolute; right: 32px; top: 50%;
    transform: translateY(-50%);
    font-size: 80px; opacity: 0.1; line-height: 1;
  }
  .pal-intro-card p {
    font-family: 'Poppins', sans-serif;
    font-size: 18px; font-weight: 500;
    color: rgba(255,255,255,0.88);
    line-height: 1.78; margin: 0 0 14px;
  }
  .pal-intro-card p:last-child { margin: 0; }
  .pal-intro-card strong { color: #8fda50; }

  /* ─────────── SECTION HEADER ─────────── */
  .pal-sec-head {
    display: flex; align-items: flex-start; gap: 20px;
    margin-bottom: 28px;
    border-bottom: 2px solid var(--rule);
    padding-bottom: 18px;
  }
  .pal-sec-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 56px; font-weight: 900;
    color: var(--rule); line-height: 1; flex-shrink: 0;
  }
  .pal-sec-title-wrap { padding-top: 8px; }
  .pal-sec-kicker {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 6px;
  }
  .pal-sec-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(22px, 3.5vw, 30px);
    font-weight: 800; color: var(--ink);
    line-height: 1.15; letter-spacing: -0.02em;
  }
  .pal-sec-title span { color: var(--accent); }

  /* ─────────── BODY TEXT ─────────── */
  .pal-body-text {
    font-family: 'Inter', sans-serif;
    font-size: 16px; font-weight: 400;
    color: var(--ink2); line-height: 1.85;
    margin-bottom: 28px;
  }
  .pal-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── DIVIDER ─────────── */
  .pal-divider {
    margin: 56px 0;
    display: flex; align-items: center; gap: 16px;
  }
  .pal-divider::before, .pal-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--rule);
  }
  .pal-divider-mark {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--accent); flex-shrink: 0;
  }

  /* ─────────── VILLAGE SNAPSHOT — STAT GRID ─────────── */
  .pal-village-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 36px;
  }
  @media (max-width: 500px) { .pal-village-grid { grid-template-columns: 1fr 1fr; } }
  .pal-vstat {
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-top: 4px solid var(--accent);
    border-radius: 6px;
    padding: 22px 18px 18px;
    text-align: center;
  }
  .pal-vstat.gold-top  { border-top-color: var(--gold); }
  .pal-vstat.sky-top   { border-top-color: var(--sky); }
  .pal-vstat.rust-top  { border-top-color: var(--rust); }
  .pal-vstat.dk-top    { border-top-color: #8fda50; }
  .pal-vstat-icon  { font-size: 28px; margin-bottom: 8px; display: block; }
  .pal-vstat-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 26px; font-weight: 900;
    color: var(--ink); letter-spacing: -0.02em;
    line-height: 1.1; margin-bottom: 4px;
  }
  .pal-vstat.gold-top .pal-vstat-num { color: var(--gold); }
  .pal-vstat.sky-top  .pal-vstat-num { color: var(--sky); }
  .pal-vstat.rust-top .pal-vstat-num { color: var(--rust); }
  .pal-vstat-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 600;
    color: var(--muted); line-height: 1.4;
  }

  /* ─────────── VILLAGE MAP CARD ─────────── */
  .pal-map-card {
    background: linear-gradient(135deg, #0b1e05 0%, #1a3a08 100%);
    border-radius: 8px;
    padding: 32px 36px;
    margin-bottom: 36px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }
  @media (max-width: 600px) { .pal-map-card { grid-template-columns: 1fr; padding: 24px 20px; } }
  .pal-map-left { padding-right: 28px; border-right: 1px solid rgba(255,255,255,0.1); }
  .pal-map-right { padding-left: 28px; }
  @media (max-width: 600px) {
    .pal-map-left  { padding-right: 0; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 22px; margin-bottom: 22px; }
    .pal-map-right { padding-left: 0; }
  }
  .pal-map-badge {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: #8fda50; margin-bottom: 10px;
    display: inline-block;
  }
  .pal-map-heading {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px; font-weight: 900;
    color: #fff; margin-bottom: 14px;
    line-height: 1.2;
  }
  .pal-map-list { list-style: none; padding: 0; }
  .pal-map-list li {
    font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 400;
    color: rgba(255,255,255,0.75);
    padding: 8px 0 8px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    position: relative; line-height: 1.55;
  }
  .pal-map-list li:last-child { border-bottom: none; }
  .pal-map-list li::before {
    content: ''; position: absolute; left: 0; top: 50%;
    transform: translateY(-50%);
    width: 6px; height: 6px; border-radius: 50%;
    background: #8fda50;
  }
  .pal-map-list li strong { color: #8fda50; font-weight: 600; }

  /* ─────────── FACTORS OF PRODUCTION — 3-PILLAR LAYOUT ─────────── */
  .pal-factors-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    border: 1.5px solid var(--rule);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 36px;
  }
  @media (max-width: 700px) { .pal-factors-row { grid-template-columns: 1fr; } }
  .pal-factor-col {
    padding: 28px 24px;
    border-right: 1.5px solid var(--rule);
    background: var(--white);
  }
  .pal-factor-col:last-child { border-right: none; }
  @media (max-width: 700px) {
    .pal-factor-col { border-right: none; border-bottom: 1.5px solid var(--rule); }
    .pal-factor-col:last-child { border-bottom: none; }
  }
  .pal-factor-col.land   { background: var(--accent-lt); }
  .pal-factor-col.labour { background: var(--gold-lt); }
  .pal-factor-col.capital{ background: var(--sky-lt); }
  .pal-factor-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 40px; font-weight: 900;
    opacity: 0.14; line-height: 1;
    margin-bottom: 4px;
  }
  .pal-factor-col.land   .pal-factor-num { color: var(--accent2); }
  .pal-factor-col.labour .pal-factor-num { color: var(--gold); }
  .pal-factor-col.capital .pal-factor-num { color: var(--sky); }
  .pal-factor-icon { font-size: 32px; margin-bottom: 10px; display: block; }
  .pal-factor-name {
    font-family: 'Montserrat', sans-serif;
    font-size: 17px; font-weight: 900;
    margin-bottom: 12px; letter-spacing: -0.01em;
  }
  .pal-factor-col.land   .pal-factor-name { color: var(--accent2); }
  .pal-factor-col.labour .pal-factor-name { color: var(--gold); }
  .pal-factor-col.capital .pal-factor-name { color: var(--sky); }
  .pal-factor-def {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2);
    line-height: 1.65; margin-bottom: 14px;
  }
  .pal-factor-col.land   .pal-factor-def strong { color: var(--accent2); font-weight: 600; }
  .pal-factor-col.labour .pal-factor-def strong { color: var(--gold); font-weight: 600; }
  .pal-factor-col.capital .pal-factor-def strong { color: var(--sky); font-weight: 600; }
  .pal-factor-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .pal-factor-tag {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 600;
    padding: 3px 10px; border-radius: 100px;
  }
  .pal-factor-col.land   .pal-factor-tag { background: rgba(58,125,10,0.12); color: var(--accent2); }
  .pal-factor-col.labour .pal-factor-tag { background: rgba(176,122,0,0.12); color: var(--gold); }
  .pal-factor-col.capital .pal-factor-tag { background: rgba(10,107,138,0.12); color: var(--sky); }

  /* ─────────── CAPITAL TYPES — SPLIT CONTRAST ─────────── */
  .pal-cap-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1.5px solid var(--rule);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 36px;
  }
  @media (max-width: 580px) { .pal-cap-split { grid-template-columns: 1fr; } }
  .pal-cap-col { padding: 26px 24px; }
  .pal-cap-col.fixed   { background: var(--sky-lt);  border-right: 1.5px solid var(--rule); }
  .pal-cap-col.working { background: var(--gold-lt); }
  @media (max-width: 580px) {
    .pal-cap-col.fixed { border-right: none; border-bottom: 1.5px solid var(--rule); }
  }
  .pal-cap-badge {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 100px;
    display: inline-block; margin-bottom: 10px;
  }
  .pal-cap-col.fixed   .pal-cap-badge { background: rgba(10,107,138,0.12); color: var(--sky); }
  .pal-cap-col.working .pal-cap-badge { background: rgba(176,122,0,0.12); color: var(--gold); }
  .pal-cap-heading {
    font-family: 'Montserrat', sans-serif;
    font-size: 19px; font-weight: 900;
    margin-bottom: 14px; letter-spacing: -0.01em;
  }
  .pal-cap-col.fixed   .pal-cap-heading { color: var(--sky); }
  .pal-cap-col.working .pal-cap-heading { color: var(--gold); }
  .pal-cap-col ul { list-style: none; padding: 0; }
  .pal-cap-col ul li {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2);
    padding: 7px 0 7px 18px;
    border-bottom: 1px solid rgba(0,0,0,0.07);
    position: relative; line-height: 1.55;
  }
  .pal-cap-col ul li:last-child { border-bottom: none; }
  .pal-cap-col ul li::before {
    content: ''; position: absolute; left: 0; top: 14px;
    width: 6px; height: 6px; border-radius: 50%;
  }
  .pal-cap-col.fixed   ul li::before { background: var(--sky); }
  .pal-cap-col.working ul li::before { background: var(--gold); }
  .pal-cap-col ul li strong { font-weight: 600; }
  .pal-cap-col.fixed   ul li strong { color: var(--sky); }
  .pal-cap-col.working ul li strong { color: var(--gold); }

  /* ─────────── DARK HIGHLIGHT BLOCK ─────────── */
  .pal-highlight {
    background: linear-gradient(135deg, #0b1e05 0%, #1a3a08 100%);
    border-radius: 6px;
    padding: 28px 32px;
    margin-bottom: 36px;
    position: relative; overflow: hidden;
  }
  .pal-highlight::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 4px; height: 100%;
    background: linear-gradient(180deg, #8fda50, #fbbf24);
  }
  .pal-highlight-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #8fda50; margin-bottom: 10px;
  }
  .pal-highlight-text {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 600;
    color: rgba(255,255,255,0.9);
    line-height: 1.7;
  }
  .pal-highlight-text strong { color: #8fda50; }

  /* ─────────── FARMING CHANGES TIMELINE ─────────── */
  .pal-timeline { margin-bottom: 36px; }
  .pal-tl-item {
    display: flex;
    gap: 20px;
    margin-bottom: 0;
    position: relative;
  }
  .pal-tl-item:not(:last-child) .pal-tl-line {
    position: absolute;
    left: 19px; top: 40px;
    width: 2px; height: calc(100% + 0px);
    background: var(--rule);
    z-index: 0;
  }
  .pal-tl-dot-wrap {
    flex-shrink: 0; width: 40px;
    display: flex; flex-direction: column; align-items: center;
    position: relative; z-index: 1;
    padding-top: 4px;
  }
  .pal-tl-dot {
    width: 14px; height: 14px; border-radius: 50%;
    border: 2.5px solid var(--accent);
    background: var(--white);
    flex-shrink: 0;
  }
  .pal-tl-content {
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-radius: 6px;
    padding: 18px 20px;
    margin-bottom: 16px;
    flex: 1;
  }
  .pal-tl-content:hover { border-color: var(--accent); }
  .pal-tl-year {
    font-family: 'Montserrat', sans-serif;
    font-size: 13px; font-weight: 900;
    color: var(--accent); letter-spacing: 0.04em;
    margin-bottom: 5px;
  }
  .pal-tl-head {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; font-weight: 700;
    color: var(--ink); margin-bottom: 8px;
  }
  .pal-tl-desc {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2); line-height: 1.65;
  }
  .pal-tl-desc strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── MULTIPLE CROPPING + GREEN REVOLUTION CARDS ─────────── */
  .pal-card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 36px;
  }
  @media (max-width: 620px) { .pal-card-grid { grid-template-columns: 1fr; } }
  .pal-card {
    border-radius: 6px; padding: 26px 26px 22px;
    border: 1.5px solid var(--rule); background: var(--white);
  }
  .pal-card.green  { background: var(--accent-lt); border-color: #a8d98a; }
  .pal-card.gold   { background: var(--gold-lt);   border-color: #e8cc80; }
  .pal-card.rust   { background: var(--rust-lt);   border-color: #f0a882; }
  .pal-card.sky    { background: var(--sky-lt);    border-color: #8acfdf; }
  .pal-card.dark {
    background: linear-gradient(135deg, #0b1e05, #1a3a08);
    border-color: transparent;
  }
  .pal-card-tag {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    margin-bottom: 10px;
    color: var(--accent);
  }
  .pal-card.gold .pal-card-tag  { color: var(--gold); }
  .pal-card.rust .pal-card-tag  { color: var(--rust); }
  .pal-card.sky  .pal-card-tag  { color: var(--sky); }
  .pal-card.dark .pal-card-tag  { color: #8fda50; }
  .pal-card-title {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 700;
    color: var(--ink); margin-bottom: 14px; line-height: 1.3;
  }
  .pal-card.gold .pal-card-title { color: var(--gold); }
  .pal-card.rust .pal-card-title { color: var(--rust); }
  .pal-card.sky  .pal-card-title { color: var(--sky); }
  .pal-card.dark .pal-card-title { color: #fff; }
  .pal-card ul { list-style: none; padding: 0; }
  .pal-card ul li {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2);
    padding: 7px 0 7px 18px;
    border-bottom: 1px solid rgba(0,0,0,0.07);
    position: relative; line-height: 1.55;
  }
  .pal-card ul li:last-child { border-bottom: none; }
  .pal-card ul li::before {
    content: ''; position: absolute; left: 0; top: 14px;
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent);
  }
  .pal-card.gold ul li::before { background: var(--gold); }
  .pal-card.rust ul li::before { background: var(--rust); }
  .pal-card.sky  ul li::before { background: var(--sky); }
  .pal-card.dark ul li::before { background: #8fda50; }
  .pal-card ul li strong { font-weight: 600; }
  .pal-card.gold ul li strong { color: var(--gold); }
  .pal-card.rust ul li strong { color: var(--rust); }
  .pal-card.sky  ul li strong { color: var(--sky); }
  .pal-card.dark ul li { color: rgba(255,255,255,0.8); border-bottom-color: rgba(255,255,255,0.08); }
  .pal-card.dark ul li strong { color: #8fda50; }

  /* ─────────── LABOUR SECTION — CONTRAST STRIP ─────────── */
  .pal-labour-strip {
    background: linear-gradient(135deg, #0b1e05 0%, #1a3a08 100%);
    border-radius: 8px;
    padding: 36px 32px;
    margin-bottom: 36px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;
  }
  @media (max-width: 720px) {
    .pal-labour-strip {
      grid-template-columns: 1fr;
      padding: 28px 24px;
      gap: 20px;
    }
    .pal-labour-item {
      display: flex; align-items: flex-start; gap: 16px; text-align: left;
    }
    .pal-labour-icon { margin-bottom: 0; flex-shrink: 0; }
  }
  .pal-labour-item { text-align: center; }
  .pal-labour-icon { font-size: 36px; margin-bottom: 10px; display: block; }
  .pal-labour-head {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 700;
    color: #8fda50; margin-bottom: 8px;
  }
  .pal-labour-text {
    font-family: 'Inter', sans-serif;
    font-size: 13px; color: rgba(255,255,255,0.72);
    line-height: 1.65;
  }
  .pal-labour-text strong { color: #fbbf24; font-weight: 600; }

  /* ─────────── CAPITAL — TERM BOXES ─────────── */
  .pal-term-box {
    background: var(--paper2);
    border: 1.5px solid var(--rule);
    border-left: 5px solid var(--accent);
    border-radius: 4px;
    padding: 18px 26px;
    margin-bottom: 16px;
    display: flex; align-items: flex-start; gap: 16px;
  }
  .pal-term-box.gold  { border-left-color: var(--gold); }
  .pal-term-box.sky   { border-left-color: var(--sky); }
  .pal-term-box.rust  { border-left-color: var(--rust); }
  .pal-term-icon  { font-size: 26px; flex-shrink: 0; line-height: 1; margin-top: 2px; }
  .pal-term-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 4px;
  }
  .pal-term-box.gold  .pal-term-label { color: var(--gold); }
  .pal-term-box.sky   .pal-term-label { color: var(--sky); }
  .pal-term-box.rust  .pal-term-label { color: var(--rust); }
  .pal-term-name {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px; font-weight: 900;
    color: var(--ink); margin-bottom: 5px;
  }
  .pal-term-def {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2); line-height: 1.65;
  }
  .pal-term-def strong { color: var(--accent2); font-weight: 600; }
  .pal-term-box.gold  .pal-term-def strong { color: var(--gold); }
  .pal-term-box.sky   .pal-term-def strong { color: var(--sky); }

  /* ─────────── NON-FARM ACTIVITIES — ICON GRID ─────────── */
  .pal-nonfarm-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 36px;
  }
  @media (max-width: 500px) { .pal-nonfarm-grid { grid-template-columns: 1fr 1fr; } }
  .pal-nf-card {
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-radius: 8px;
    padding: 20px 14px;
    text-align: center;
    transition: border-color 0.2s;
  }
  .pal-nf-card:hover { border-color: var(--accent); }
  .pal-nf-icon { font-size: 32px; margin-bottom: 8px; display: block; }
  .pal-nf-name {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    color: var(--ink); margin-bottom: 4px;
  }
  .pal-nf-sub {
    font-family: 'Inter', sans-serif;
    font-size: 12px; color: var(--muted); line-height: 1.4;
  }

  /* ─────────── NON-FARM STAT BAND ─────────── */
  .pal-stat-band {
    background: var(--paper2);
    border: 1.5px solid var(--rule);
    border-radius: 6px;
    padding: 24px 30px;
    margin-bottom: 36px;
    display: flex; align-items: center; gap: 24px;
    flex-wrap: wrap;
  }
  .pal-stat-band-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 52px; font-weight: 900;
    color: var(--rust); line-height: 1;
    flex-shrink: 0;
  }
  .pal-stat-band-text {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 600;
    color: var(--ink2); line-height: 1.65;
    flex: 1; min-width: 200px;
  }
  .pal-stat-band-text strong { color: var(--rust); }

  /* ─────────── TABLE ─────────── */
  .pal-table-wrap {
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 36px;
  }
  .pal-table-title {
    background: var(--accent2);
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    padding: 14px 22px;
    letter-spacing: 0.04em;
  }
  .pal-table-row {
    display: grid;
    grid-template-columns: minmax(120px, 180px) 1fr;
    border-bottom: 1px solid var(--rule);
  }
  @media (max-width: 520px) {
    .pal-table-row { grid-template-columns: 1fr; }
  }
  .pal-table-row:last-child { border-bottom: none; }
  .pal-table-key {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    color: var(--accent2); padding: 14px 18px;
    background: var(--paper2);
    border-right: 1px solid var(--rule);
    display: flex; align-items: center;
  }
  @media (max-width: 520px) {
    .pal-table-key {
      border-right: none;
      border-bottom: 1px solid var(--rule);
      padding: 10px 16px;
    }
  }
  .pal-table-val {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2);
    padding: 14px 18px; line-height: 1.6;
  }
  @media (max-width: 520px) { .pal-table-val { padding: 10px 16px; } }
  .pal-table-val strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── PULL QUOTE ─────────── */
  .pal-pull-quote {
    border-left: 4px solid var(--accent);
    padding: 20px 28px;
    background: var(--accent-lt);
    border-radius: 0 6px 6px 0;
    margin-bottom: 36px;
  }
  .pal-pull-quote p {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 600;
    color: var(--accent2); line-height: 1.7;
    margin-bottom: 8px; font-style: italic;
  }
  .pal-pull-quote cite {
    font-family: 'Inter', sans-serif;
    font-size: 13px; color: var(--muted);
    font-style: normal;
  }

  /* ─────────── FAQ ─────────── */
  .pal-faq-header {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 10px;
  }
  .pal-faq-kicker {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--accent);
    padding: 4px 14px;
    border: 1.5px solid var(--accent);
    border-radius: 100px;
    display: inline-block;
  }
  .pal-faq-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(24px, 4vw, 34px);
    font-weight: 900; color: var(--ink);
    letter-spacing: -0.025em;
    margin-bottom: 28px;
  }
  .pal-faq-item {
    border: 1.5px solid var(--rule);
    border-radius: 6px;
    margin-bottom: 10px;
    overflow: hidden;
    background: var(--white);
  }
  .pal-faq-item.open { border-color: var(--accent); }
  .pal-faq-q {
    width: 100%; background: none; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 22px; gap: 16px; text-align: left;
  }
  .pal-faq-q:hover { background: var(--paper2); }
  .pal-faq-q-text {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 600;
    color: var(--ink); line-height: 1.5;
  }
  .pal-faq-item.open .pal-faq-q-text { color: var(--accent2); }
  .pal-faq-icon {
    font-family: 'Inter', sans-serif;
    font-size: 20px; font-weight: 400;
    color: var(--accent); flex-shrink: 0; line-height: 1;
    user-select: none;
  }
  .pal-faq-ans {
    display: none;
    font-family: 'Inter', sans-serif;
    font-size: 15px; color: var(--ink2);
    line-height: 1.8; padding: 0 22px 20px;
  }
  .pal-faq-ans.visible { display: block; }
  .pal-faq-ans strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── RESPONSIVE ─────────── */
  @media (max-width: 600px) {
    .pal-body { padding: 48px 16px 72px; }
    .pal-hero-inner { padding: 0 20px; }
    .pal-intro-card { padding: 24px 20px; }
    .pal-intro-card::after { display: none; }
    .pal-sec-num { font-size: 40px; }
    .pal-card-grid { grid-template-columns: 1fr; }
    .pal-cap-split { grid-template-columns: 1fr; }
    .pal-cap-col.fixed { border-right: none; border-bottom: 1.5px solid var(--rule); }
  }
`;

const faqs = [
  {
    q: "What is Palampur? Why is it used in Class 9 Economics?",
    a: "Palampur is a hypothetical (imaginary) village used by NCERT to explain various economic concepts in a rural Indian setting. It is a model village with about 450 families, located 3 km from Raiganj and close to Shahpur town. It is used because it is a well-rounded example — it has electricity, roads, schools, a health centre, and both farming and non-farming activities, making it ideal to illustrate concepts like factors of production, cropping patterns, labour markets, and rural economic activity."
  },
  {
    q: "What are the main features/infrastructure of Palampur?",
    a: "Palampur has: about 450 families living there; well-connected roads to neighbouring villages and towns; most houses are electrified; two primary schools and one high school; a government primary health centre and a primary dispensary. It is located 3 km from Raiganj (a big village) and Shahpur is its nearest town."
  },
  {
    q: "What are the main production activities in Palampur?",
    a: "Farming is the main production activity in Palampur, and most people depend on it for their livelihood. Non-farming activities such as dairy, small-scale manufacturing (weavers, potters, etc.), and transport are also carried out but on a limited scale. The village thus shows a mix of farm and non-farm activities found in rural India."
  },
  {
    q: "What are factors of production? Name and explain each.",
    a: "Factors of production are the basic requirements needed to produce goods and services. There are three main factors: (1) Land — includes all free gifts of nature such as soil, water, forests, and minerals. (2) Labour — means human effort, both physical and mental, used in production. (3) Capital — physical capital is required for production and includes fixed capital (tools, machines, buildings) and working capital (raw materials like seeds for farmers, yarn for weavers, and money in hand)."
  },
  {
    q: "What is fixed capital and what is working capital?",
    a: "Fixed capital refers to tools, machines, and buildings used repeatedly over a long period in production. They are durable and not consumed in a single use. Working capital refers to raw materials and money in hand that are used up during the production process. Examples of working capital: seeds for a farmer, yarn for a weaver. Both types together form the physical capital required for production."
  },
  {
    q: "What important changes occurred in farm activities in Palampur?",
    a: "Two major changes improved farm output from the same land: (1) Multiple Cropping — growing more than one crop on the same piece of land in a year, made possible by irrigation. (2) Use of Modern Farming Methods — use of HYV (High Yielding Variety) seeds, chemical fertilizers, pesticides, and machinery. These changes, which began in the late 1960s, led to a substantial increase in land productivity, known as the Green Revolution. Farmers of Punjab, Haryana, and western Uttar Pradesh were the first to adopt these methods."
  },
  {
    q: "What is the Green Revolution? What are its drawbacks?",
    a: "The Green Revolution refers to the dramatic increase in agricultural productivity in India (especially from the late 1960s) due to the introduction of High Yielding Variety (HYV) seeds, chemical fertilizers, pesticides, and modern irrigation. It transformed India from a food-deficit country to a surplus one. However, its drawbacks include: overuse of chemical fertilizers and pesticides causing soil degradation; over-extraction of groundwater leading to falling water tables; reduced soil fertility over time. Farmers in Punjab are particularly facing these problems today."
  },
  {
    q: "How do small, medium, and large farmers differ in terms of labour?",
    a: "Small farmers generally provide their own family labour to work on their fields — they cannot afford to hire workers. Medium and large farmers, on the other hand, hire labourers to work on their fields because the scale of their farming operations is larger. There are many landless families in Palampur who work as labourers. Due to the surplus of labourers, they often do not receive the minimum wages set by the government. As a result, some labourers migrate to cities in search of better wages and work."
  },
  {
    q: "How do different categories of farmers arrange capital?",
    a: "All categories of farmers — small, medium, and large — require capital for farming, especially since modern farming needs a great deal of capital. Large farmers usually have their own savings or can take formal loans. Small farmers face difficulty and borrow from large farmers, village moneylenders, or traders who supply them inputs like seeds and fertilizers. This often puts small farmers at a disadvantage because they may pay very high rates of interest, leading to debt."
  },
  {
    q: "What is marketable surplus?",
    a: "Marketable surplus is that part of the farm produce which is sold in the market after the farmer retains a portion for self-consumption. Farmers produce crops using land, labour, and capital. They keep enough for their own household needs and sell the rest. Small farmers have very little surplus output because their production is just enough (or barely enough) for their own needs. It is the medium and large farmers who have substantial surplus produce to sell in the market and thus earn significant cash income."
  },
  {
    q: "What are non-farm activities? Give examples. How widespread are they in rural India?",
    a: "Non-farm activities are economic activities in rural areas that are not directly related to cultivation of crops. Examples include: dairy (keeping cattle and selling milk), small-scale manufacturing (weavers, potters, blacksmiths), transport (carrying goods and people by rickshaws, tractors, trucks), and petty trade or shops. According to the chapter, out of every 100 workers in rural India, only 24 are engaged in non-farm activities. This shows that the vast majority of rural workers still depend on farming, and non-farm activities are limited but growing in importance."
  },
];

export default function ChapterPalampur() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>

      <div className="pal-root">
        {/* ══════════════════ HERO ══════════════════ */}
        <div className="pal-hero">
          <div className="pal-hero-dots" />
          <div className="pal-hero-horizon" />
          <div className="pal-glow-a" />
          <div className="pal-glow-b" />
          <div className="pal-hero-bg-num">1</div>

          <div className="pal-hero-inner">
            <div className="pal-overline">Class 9 · Economics · Chapter 1</div>

            <h1 className="pal-hero-title">
              The Story of<br />
              <em>Village</em><br />
              <span className="em2">Palampur</span>
            </h1>

            <div className="pal-hero-bar">
              <div className="pal-hero-bar-item">
                <div className="pal-bar-label">Subject</div>
                <div className="pal-bar-value">Economics — Class 9</div>
              </div>
              <div className="pal-hero-bar-item">
                <div className="pal-bar-label">Chapter</div>
                <div className="pal-bar-value">1 — Village Palampur</div>
              </div>
              <div className="pal-hero-bar-item">
                <div className="pal-bar-label">Key Concepts</div>
                <div className="pal-bar-value">Production · Land · Labour · Capital</div>
              </div>
              <div className="pal-hero-bar-item">
                <div className="pal-bar-label">Read Time</div>
                <div className="pal-bar-value">⏱️ 10 min read</div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════ BODY ══════════════════ */}
        <div className="pal-body">

          {/* ── LEAD INTRO CARD ── */}
          <div className="pal-intro-card">
            <p>
              Palampur is a <strong>model village</strong> created by NCERT to help us understand how a typical Indian village functions economically. Through its farming activities, labour patterns, and limited non-farm work, it illustrates the three fundamental <strong>factors of production</strong> — land, labour, and capital.
            </p>
            <p>
              This chapter is the foundation of Class 9 Economics. It explains how goods and services are produced in a rural economy and how different people — from large landowners to landless labourers — participate in (and are affected by) economic activity.
            </p>
          </div>

          {/* ══ SECTION 1: Village Palampur ══ */}
          <div className="pal-sec-head">
            <div className="pal-sec-num">1</div>
            <div className="pal-sec-title-wrap">
              <div className="pal-sec-kicker">Introduction</div>
              <h2 className="pal-sec-title">Village <span>Palampur</span> — An Overview</h2>
            </div>
          </div>

          <p className="pal-body-text">
            Palampur is a small <strong>hypothetical village</strong> used as a case study to understand rural economic life in India. With about 450 families, basic infrastructure, and a mix of farming and non-farming activities, it represents a fairly developed Indian village.
          </p>

          {/* Village stat grid */}
          <div className="pal-village-grid">
            <div className="pal-vstat">
              <span className="pal-vstat-icon">👨‍👩‍👧‍👦</span>
              <div className="pal-vstat-num">450</div>
              <div className="pal-vstat-label">Families in the village</div>
            </div>
            <div className="pal-vstat gold-top">
              <span className="pal-vstat-icon">📏</span>
              <div className="pal-vstat-num gold-top">3 km</div>
              <div className="pal-vstat-label">Distance from Raiganj</div>
            </div>
            <div className="pal-vstat sky-top">
              <span className="pal-vstat-icon">🏫</span>
              <div className="pal-vstat-num">2 + 1</div>
              <div className="pal-vstat-label">Primary schools + High school</div>
            </div>
            <div className="pal-vstat rust-top">
              <span className="pal-vstat-icon">🏥</span>
              <div className="pal-vstat-num">1 + 1</div>
              <div className="pal-vstat-label">Health Centre + Dispensary</div>
            </div>
            <div className="pal-vstat dk-top">
              <span className="pal-vstat-icon">⚡</span>
              <div className="pal-vstat-num">Most</div>
              <div className="pal-vstat-label">Houses are electrified</div>
            </div>
            <div className="pal-vstat gold-top">
              <span className="pal-vstat-icon">🛣️</span>
              <div className="pal-vstat-num">Well</div>
              <div className="pal-vstat-label">Connected by roads</div>
            </div>
          </div>

          {/* Village connectivity card */}
          <div className="pal-map-card">
            <div className="pal-map-left">
              <div className="pal-map-badge">Location</div>
              <div className="pal-map-heading">Where is Palampur?</div>
              <ul className="pal-map-list">
                <li>Located <strong>3 km from Raiganj</strong> (a big village)</li>
                <li><strong>Shahpur</strong> is the nearest town</li>
                <li>Well connected to neighbouring villages and towns</li>
                <li>Roads link it to markets and services outside</li>
              </ul>
            </div>
            <div className="pal-map-right">
              <div className="pal-map-badge">Main Activity</div>
              <div className="pal-map-heading">Economy of Palampur</div>
              <ul className="pal-map-list">
                <li><strong>Farming</strong> is the main production activity</li>
                <li>Most people depend on farming for their livelihood</li>
                <li>Non-farm activities exist but on a <strong>limited scale</strong></li>
                <li>Dairy, small manufacturing, transport are examples</li>
              </ul>
            </div>
          </div>

          {/* ══ SECTION 2: Factors of Production ══ */}
          <div className="pal-divider"><div className="pal-divider-mark" /></div>

          <div className="pal-sec-head">
            <div className="pal-sec-num">2</div>
            <div className="pal-sec-title-wrap">
              <div className="pal-sec-kicker">Core Concept</div>
              <h2 className="pal-sec-title">Factors of <span>Production</span></h2>
            </div>
          </div>

          <p className="pal-body-text">
            To produce any good or service, three basic requirements are needed. These are called the <strong>factors of production</strong>. Every productive activity — whether farming wheat in Palampur or manufacturing goods in a city — uses some combination of these three factors.
          </p>

          {/* 3-pillar layout */}
          <div className="pal-factors-row">
            <div className="pal-factor-col land">
              <span className="pal-factor-icon">🌍</span>
              <div className="pal-factor-name">Land</div>
              <div className="pal-factor-def">
                Land includes all <strong>free gifts of nature</strong> — everything provided by the natural environment that is used in production.
              </div>
              <div className="pal-factor-tags">
                <span className="pal-factor-tag">Soil</span>
                <span className="pal-factor-tag">Water</span>
                <span className="pal-factor-tag">Forests</span>
                <span className="pal-factor-tag">Minerals</span>
              </div>
            </div>
            <div className="pal-factor-col labour">
              <span className="pal-factor-icon">💪</span>
              <div className="pal-factor-name">Labour</div>
              <div className="pal-factor-def">
                Labour means <strong>human effort</strong> used in production — including both physical work (ploughing, weaving) and mental work (planning, managing).
              </div>
              <div className="pal-factor-tags">
                <span className="pal-factor-tag">Physical</span>
                <span className="pal-factor-tag">Mental</span>
                <span className="pal-factor-tag">Skilled</span>
                <span className="pal-factor-tag">Unskilled</span>
              </div>
            </div>
            <div className="pal-factor-col capital">
              <span className="pal-factor-icon">⚙️</span>
              <div className="pal-factor-name">Capital</div>
              <div className="pal-factor-def">
                Physical capital includes all <strong>man-made tools and resources</strong> used in production — divided into fixed capital and working capital.
              </div>
              <div className="pal-factor-tags">
                <span className="pal-factor-tag">Fixed</span>
                <span className="pal-factor-tag">Working</span>
                <span className="pal-factor-tag">Machines</span>
                <span className="pal-factor-tag">Seeds</span>
              </div>
            </div>
          </div>

          {/* Fixed vs Working Capital Split */}
          <div className="pal-cap-split">
            <div className="pal-cap-col fixed">
              <div className="pal-cap-badge">Type 1</div>
              <div className="pal-cap-heading">Fixed Capital</div>
              <ul>
                <li>Used <strong>repeatedly</strong> over many production cycles</li>
                <li>Not consumed in a single use</li>
                <li>Examples: <strong>tools, machines, buildings</strong></li>
                <li>Tractor, pump set, barn — all fixed capital</li>
                <li>Long-lasting and durable</li>
              </ul>
            </div>
            <div className="pal-cap-col working">
              <div className="pal-cap-badge">Type 2</div>
              <div className="pal-cap-heading">Working Capital</div>
              <ul>
                <li>Used <strong>up during production</strong> — consumed once</li>
                <li>Must be replenished each production cycle</li>
                <li>Examples: <strong>seeds, fertilizers, yarn, money</strong></li>
                <li>A farmer's seeds are working capital</li>
                <li>Cash in hand is also working capital</li>
              </ul>
            </div>
          </div>

          {/* ══ SECTION 3: Changes in Farming ══ */}
          <div className="pal-divider"><div className="pal-divider-mark" /></div>

          <div className="pal-sec-head">
            <div className="pal-sec-num">3</div>
            <div className="pal-sec-title-wrap">
              <div className="pal-sec-kicker">Agricultural Revolution</div>
              <h2 className="pal-sec-title">Important Changes in <span>Farm Activities</span></h2>
            </div>
          </div>

          <p className="pal-body-text">
            Land area available for cultivation is <strong>virtually fixed</strong> — India could not simply create more farmland. So to produce more food, farmers had to find ways to produce more from the <em>same land</em>. Two key changes made this possible.
          </p>

          <div className="pal-highlight">
            <div className="pal-highlight-label">Key Fact</div>
            <div className="pal-highlight-text">
              Some wasteland in India was converted into cultivable land after <strong>1960</strong>, but the main strategy was increasing productivity through <strong>multiple cropping</strong> and <strong>modern farming methods</strong>, leading to the Green Revolution.
            </div>
          </div>

          {/* Timeline of changes */}
          <div className="pal-timeline">
            <div className="pal-tl-item">
              <div className="pal-tl-dot-wrap">
                <div className="pal-tl-dot" />
                <div className="pal-tl-line" />
              </div>
              <div className="pal-tl-content">
                <div className="pal-tl-year">Change 1</div>
                <div className="pal-tl-head">Multiple Cropping</div>
                <div className="pal-tl-desc">
                  Growing <strong>more than one crop</strong> on the same piece of land in the same year. Made possible by improved irrigation (canals, tube wells). Instead of one kharif crop, a farmer could now also grow rabi and a summer crop, <strong>tripling the use of the same land.</strong>
                </div>
              </div>
            </div>
            <div className="pal-tl-item">
              <div className="pal-tl-dot-wrap">
                <div className="pal-tl-dot" />
                <div className="pal-tl-line" />
              </div>
              <div className="pal-tl-content">
                <div className="pal-tl-year">Change 2</div>
                <div className="pal-tl-head">Modern Farming Methods</div>
                <div className="pal-tl-desc">
                  Introduction of <strong>HYV (High Yielding Variety) seeds</strong>, chemical fertilizers, insecticides, pesticides, and mechanisation (tractors, harvesters). These dramatically increased the yield per hectare — the same land now produced much more than before.
                </div>
              </div>
            </div>
            <div className="pal-tl-item">
              <div className="pal-tl-dot-wrap">
                <div className="pal-tl-dot" />
                <div className="pal-tl-line" />
              </div>
              <div className="pal-tl-content">
                <div className="pal-tl-year">Late 1960s — Result</div>
                <div className="pal-tl-head">The Green Revolution</div>
                <div className="pal-tl-desc">
                  The combined effect of multiple cropping and modern methods caused a <strong>substantial increase in land productivity</strong>, called the Green Revolution. Farmers of <strong>Punjab, Haryana, and Western Uttar Pradesh</strong> were the first to adopt these methods in India.
                </div>
              </div>
            </div>
            <div className="pal-tl-item">
              <div className="pal-tl-dot-wrap">
                <div className="pal-tl-dot" style={{borderColor: "var(--rust)"}} />
              </div>
              <div className="pal-tl-content">
                <div className="pal-tl-year" style={{color: "var(--rust)"}}>Drawback</div>
                <div className="pal-tl-head">Land Degradation</div>
                <div className="pal-tl-desc">
                  <strong>Overuse of chemical fertilizers, pesticides, and water</strong> is resulting in land degradation, soil exhaustion, and falling groundwater levels. Farmers in <strong>Punjab</strong> are particularly facing these problems today.
                </div>
              </div>
            </div>
          </div>

          {/* Multiple Cropping & Green Revolution cards */}
          <div className="pal-card-grid">
            <div className="pal-card green">
              <div className="pal-card-tag">Method 1</div>
              <div className="pal-card-title">Multiple Cropping</div>
              <ul>
                <li>More than one crop per year on same land</li>
                <li>Requires <strong>year-round irrigation</strong></li>
                <li>Kharif + Rabi + Summer crops possible</li>
                <li>No extra land needed</li>
                <li>Increases annual farm income</li>
              </ul>
            </div>
            <div className="pal-card gold">
              <div className="pal-card-tag">Method 2</div>
              <div className="pal-card-title">Modern Farming Methods</div>
              <ul>
                <li><strong>HYV seeds</strong> give much higher yield</li>
                <li>Chemical <strong>fertilizers</strong> increase soil nutrients</li>
                <li>Pesticides protect crops from insects</li>
                <li>Tractors and machines save time</li>
                <li>Requires <strong>more capital investment</strong></li>
              </ul>
            </div>
          </div>

          {/* ══ SECTION 4: Labour ══ */}
          <div className="pal-divider"><div className="pal-divider-mark" /></div>

          <div className="pal-sec-head">
            <div className="pal-sec-num">4</div>
            <div className="pal-sec-title-wrap">
              <div className="pal-sec-kicker">Second Factor</div>
              <h2 className="pal-sec-title">Labour — The <span>Human Factor</span></h2>
            </div>
          </div>

          <p className="pal-body-text">
            After land, <strong>labour</strong> is the next essential factor of production. In Palampur, different categories of farmers deal with labour in different ways depending on the size of their land holdings.
          </p>

          <div className="pal-labour-strip">
            <div className="pal-labour-item">
              <span className="pal-labour-icon">🌱</span>
              <div className="pal-labour-head">Small Farmers</div>
              <div className="pal-labour-text">
                Provide their own <strong>family labour</strong>. Cannot afford to hire workers. The entire family — including women and children — works on the field.
              </div>
            </div>
            <div className="pal-labour-item">
              <span className="pal-labour-icon">🧑‍🌾</span>
              <div className="pal-labour-head">Medium &amp; Large Farmers</div>
              <div className="pal-labour-text">
                Hire <strong>wage labourers</strong> to work on their fields. Can afford to pay because their income from larger land holdings is substantial.
              </div>
            </div>
            <div className="pal-labour-item">
              <span className="pal-labour-icon">👷</span>
              <div className="pal-labour-head">Landless Labourers</div>
              <div className="pal-labour-text">
                Many landless families in Palampur work as labourers. <strong>Surplus labour</strong> means wages stay below the government minimum. Some <strong>migrate to cities.</strong>
              </div>
            </div>
          </div>

          <div className="pal-term-box">
            <div className="pal-term-icon">⚠️</div>
            <div>
              <div className="pal-term-label">Important Issue</div>
              <div className="pal-term-name">Minimum Wages Not Paid</div>
              <div className="pal-term-def">
                Because the number of labourers far exceeds the work available in Palampur, landless labourers are <strong>not paid the minimum wages</strong> set by the government. The excess supply of labour gives them very little bargaining power. This forces many to <strong>migrate to cities</strong> in search of better-paying work.
              </div>
            </div>
          </div>

          {/* ══ SECTION 5: Capital ══ */}
          <div className="pal-divider"><div className="pal-divider-mark" /></div>

          <div className="pal-sec-head">
            <div className="pal-sec-num">5</div>
            <div className="pal-sec-title-wrap">
              <div className="pal-sec-kicker">Third Factor</div>
              <h2 className="pal-sec-title">Capital — and How <span>Farmers Arrange It</span></h2>
            </div>
          </div>

          <p className="pal-body-text">
            Capital is the third factor of production. <strong>All categories of farmers</strong> — small, medium, and large — require capital. Modern farming in particular demands a large amount of capital: for HYV seeds, fertilizers, irrigation, machinery, and more.
          </p>

          <div className="pal-term-box sky">
            <div className="pal-term-icon">🏦</div>
            <div>
              <div className="pal-term-label">Large &amp; Medium Farmers</div>
              <div className="pal-term-name">Capital from Own Savings</div>
              <div className="pal-term-def">
                Large farmers generally have <strong>their own savings</strong> from past harvests to invest as capital. They also have access to formal bank loans. They can afford to buy HYV seeds, chemical fertilizers, and machinery without depending on others.
              </div>
            </div>
          </div>

          <div className="pal-term-box rust">
            <div className="pal-term-icon">😟</div>
            <div>
              <div className="pal-term-label">Small Farmers</div>
              <div className="pal-term-name">Capital through Borrowing</div>
              <div className="pal-term-def">
                Small farmers often cannot afford the cost of modern farming from their own pockets. They borrow from <strong>large farmers, village moneylenders, or traders</strong> who supply them inputs for cultivation. These loans often carry <strong>very high interest rates</strong>, putting small farmers at risk of perpetual debt.
              </div>
            </div>
          </div>

          {/* ══ SECTION 6: Sale of Surplus / Marketable Surplus ══ */}
          <div className="pal-divider"><div className="pal-divider-mark" /></div>

          <div className="pal-sec-head">
            <div className="pal-sec-num">6</div>
            <div className="pal-sec-title-wrap">
              <div className="pal-sec-kicker">Farm Output</div>
              <h2 className="pal-sec-title">Sale of Surplus &amp; <span>Marketable Surplus</span></h2>
            </div>
          </div>

          <p className="pal-body-text">
            After producing crops using land, labour, and capital, farmers <strong>retain a part for self-consumption</strong> and sell the remaining part in the nearby market. The portion sold is called the <strong>marketable surplus</strong>.
          </p>

          <div className="pal-table-wrap">
            <div className="pal-table-title">📊 Marketable Surplus by Farmer Type</div>
            <div className="pal-table-row">
              <div className="pal-table-key">Definition</div>
              <div className="pal-table-val">The part of farm produce that is <strong>sold in the market</strong> after retaining enough for the farmer's own family consumption.</div>
            </div>
            <div className="pal-table-row">
              <div className="pal-table-key">Small Farmers</div>
              <div className="pal-table-val">Have <strong>little or no surplus</strong>. Their production barely meets their own family's needs. Very little is left to sell.</div>
            </div>
            <div className="pal-table-row">
              <div className="pal-table-key">Medium &amp; Large Farmers</div>
              <div className="pal-table-val">Have <strong>substantial surplus</strong> produce for selling in the market. They are the main suppliers to agricultural markets and earn significant cash incomes.</div>
            </div>
            <div className="pal-table-row">
              <div className="pal-table-key">Why It Matters</div>
              <div className="pal-table-val">Marketable surplus determines <strong>who benefits</strong> from higher market prices. Large farmers gain more; small farmers remain largely outside market exchange.</div>
            </div>
          </div>

          <div className="pal-pull-quote">
            <p>"Farmers produce crops on their lands using land, labour and capital — they retain part for self-consumption and sell the surplus in the nearby market."</p>
            <cite>— NCERT Economics, Class 9, Chapter 1</cite>
          </div>

          {/* ══ SECTION 7: Non-Farm Activities ══ */}
          <div className="pal-divider"><div className="pal-divider-mark" /></div>

          <div className="pal-sec-head">
            <div className="pal-sec-num">7</div>
            <div className="pal-sec-title-wrap">
              <div className="pal-sec-kicker">Beyond Farming</div>
              <h2 className="pal-sec-title">Non-Farm <span>Activities</span></h2>
            </div>
          </div>

          <p className="pal-body-text">
            Not everyone in Palampur is engaged in farming. A variety of <strong>non-farm activities</strong> also exist in the village, providing livelihoods to a smaller section of the population.
          </p>

          <div className="pal-stat-band">
            <div className="pal-stat-band-num">24</div>
            <div className="pal-stat-band-text">
              Out of every <strong>100 rural workers in India</strong>, only <strong>24</strong> are engaged in non-farm activities. The remaining 76 still depend on agriculture, highlighting how overwhelmingly agrarian rural India remains.
            </div>
          </div>

          {/* Non-farm activity icon grid */}
          <div className="pal-nonfarm-grid">
            <div className="pal-nf-card">
              <span className="pal-nf-icon">🐄</span>
              <div className="pal-nf-name">Dairy</div>
              <div className="pal-nf-sub">Keeping cattle, selling milk</div>
            </div>
            <div className="pal-nf-card">
              <span className="pal-nf-icon">🧶</span>
              <div className="pal-nf-name">Weaving</div>
              <div className="pal-nf-sub">Small-scale cloth production</div>
            </div>
            <div className="pal-nf-card">
              <span className="pal-nf-icon">🏺</span>
              <div className="pal-nf-name">Pottery</div>
              <div className="pal-nf-sub">Making pots and clay goods</div>
            </div>
            <div className="pal-nf-card">
              <span className="pal-nf-icon">🚛</span>
              <div className="pal-nf-name">Transport</div>
              <div className="pal-nf-sub">Carrying goods and people</div>
            </div>
          </div>

          <div className="pal-card-grid">
            <div className="pal-card sky">
              <div className="pal-card-tag">Why Non-Farm Activities Matter</div>
              <div className="pal-card-title">Supplementing Farm Income</div>
              <ul>
                <li>Farm income alone is often <strong>not enough</strong> for many families</li>
                <li>Non-farm activities provide <strong>additional cash income</strong></li>
                <li>Help reduce dependence on the <strong>monsoon and harvest</strong></li>
                <li>Dairy work provides <strong>year-round income</strong></li>
                <li>Transport work benefits from <strong>road connectivity</strong></li>
              </ul>
            </div>
            <div className="pal-card dark">
              <div className="pal-card-tag">Small Scale Manufacturing</div>
              <div className="pal-card-title">Cottage Industries</div>
              <ul>
                <li>Weavers produce cloth using <strong>handlooms</strong></li>
                <li>Potters make earthen pots and utensils</li>
                <li>Blacksmiths make tools for farming</li>
                <li>Usually <strong>family-run</strong>, home-based operations</li>
                <li>Part of India's traditional <strong>rural craft economy</strong></li>
              </ul>
            </div>
          </div>

          {/* ══ FAQ SECTION ══ */}
          <div className="pal-divider"><div className="pal-divider-mark" /></div>

          <div className="pal-faq-header">
            <span className="pal-faq-kicker">Exam Preparation</span>
          </div>
          <h2 className="pal-faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, i) => (
            <div className={`pal-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="pal-faq-q" onClick={() => toggle(i)}>
                <span className="pal-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="pal-faq-icon">{openIndex === i ? "▴" : "▾"}</span>
              </button>
              <div className={`pal-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
