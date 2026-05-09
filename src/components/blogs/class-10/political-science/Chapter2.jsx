import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --fd-saffron:   #e07b00;
    --fd-saffron2:  #b85f00;
    --fd-saffron3:  #7a3d00;
    --fd-saffron-lt:#fff4e6;
    --fd-saffron-md:#ffe0b2;
    --fd-gold:      #f5a623;
    --fd-gold-lt:   #fff8e1;
    --fd-navy:      #1a2340;
    --fd-navy2:     #0d1526;
    --fd-navy-lt:   #e8ecf5;
    --fd-green:     #2d6a4f;
    --fd-green-lt:  #d8f3dc;
    --fd-red:       #c0392b;
    --fd-red-lt:    #fdecea;
    --fd-ink:       #1a1208;
    --fd-ink2:      #2e2010;
    --fd-muted:     #7a6040;
    --fd-rule:      #e0d0b8;
    --fd-bg:        #faf7f2;
    --fd-bg2:       #f5efe4;
    --fd-white:     #ffffff;
    --fd-shadow:    0 2px 20px rgba(224,123,0,0.10);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .fd-root {
    font-family: 'Inter', sans-serif;
    background: var(--fd-bg);
    color: var(--fd-ink);
    min-height: 100vh;
  }

  /* ══════════════════════════════════════
     HERO — warm saffron dark, constitutional
  ══════════════════════════════════════ */
  .fd-hero {
    background: var(--fd-navy2);
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    position: relative;
    overflow: hidden;
  }

  /* Diagonal warm texture */
  .fd-hero::after {
    content: '';
    position: absolute; inset: 0;
    background: repeating-linear-gradient(
      62deg,
      transparent,
      transparent 60px,
      rgba(224,123,0,0.025) 60px,
      rgba(224,123,0,0.025) 61px
    );
    pointer-events: none;
  }

  /* Saffron glow top-right */
  .fd-hero-glow {
    position: absolute; top: -120px; right: -120px;
    width: 560px; height: 560px; border-radius: 50%;
    background: radial-gradient(circle, rgba(224,123,0,0.18) 0%, transparent 68%);
    pointer-events: none;
  }

  /* Bottom saffron stripe */
  .fd-hero-stripe {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--fd-saffron3), var(--fd-saffron), var(--fd-gold), var(--fd-saffron), var(--fd-saffron3));
  }

  /* Ashoka Chakra ghost */
  .fd-hero-chakra {
    position: absolute; right: -60px; top: 50%;
    transform: translateY(-50%);
    width: 500px; height: 500px;
    border: 1px solid rgba(224,123,0,0.08);
    border-radius: 50%;
    pointer-events: none;
  }
  .fd-hero-chakra::before {
    content: '';
    position: absolute; inset: 30px;
    border: 1px solid rgba(224,123,0,0.06);
    border-radius: 50%;
  }
  .fd-hero-chakra::after {
    content: '';
    position: absolute; inset: 70px;
    border: 1px solid rgba(224,123,0,0.05);
    border-radius: 50%;
  }

  /* Nav */
  .fd-hero-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 28px 52px 0;
    position: relative; z-index: 2;
  }
  .fd-hero-nav-brand {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px; font-weight: 900;
    letter-spacing: 0.28em; text-transform: uppercase;
    color: rgba(255,255,255,0.28);
  }
  .fd-hero-nav-pill {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--fd-gold);
    border: 1px solid rgba(245,166,35,0.4);
    padding: 5px 14px;
    background: rgba(245,166,35,0.07);
  }

  /* Main content */
  .fd-hero-body {
    display: flex; flex-direction: column; justify-content: center;
    padding: 40px 52px 0;
    position: relative; z-index: 2;
  }
  .fd-hero-eyebrow {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.26em; text-transform: uppercase;
    color: var(--fd-saffron); margin-bottom: 24px;
    display: flex; align-items: center; gap: 12px;
  }
  .fd-hero-eyebrow::before {
    content: ''; width: 32px; height: 2px; background: var(--fd-saffron); flex-shrink: 0;
  }

  .fd-hero-h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(40px, 8vw, 104px);
    font-weight: 900; line-height: 1; white-space: nowrap;
    letter-spacing: -0.04em; color: #fff;
    margin-bottom: 36px;
  }
  .fd-hero-h1 .fd-orange { color: #fff; }

  .fd-hero-sub {
    font-family: 'Inter', sans-serif;
    font-size: 17px; line-height: 1.76;
    color: rgba(255,255,255,0.46);
    max-width: 560px; margin-bottom: 48px;
  }
  .fd-hero-sub strong { color: rgba(255,255,255,0.75); font-weight: 500; }

  /* Fact chips */
  .fd-hero-chips {
    display: flex; flex-wrap: wrap; gap: 10px;
    margin-bottom: 52px;
  }
  .fd-chip {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600;
    color: rgba(255,255,255,0.55);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 7px 16px;
    display: flex; align-items: center; gap: 8px;
  }
  .fd-chip-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--fd-saffron); flex-shrink: 0;
  }

  /* Hero stat bar */
  .fd-hero-stats {
    display: grid; grid-template-columns: repeat(4, 1fr);
    border-top: 1px solid rgba(255,255,255,0.07);
  }
  .fd-hero-stat {
    padding: 24px 28px;
    border-right: 1px solid rgba(255,255,255,0.06);
  }
  .fd-hero-stat:last-child { border-right: none; }
  .fd-stat-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 28px; font-weight: 900;
    color: var(--fd-gold); line-height: 1; margin-bottom: 5px;
    letter-spacing: -0.02em;
  }
  .fd-stat-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(255,255,255,0.24);
  }

  /* Hero bottom */
  .fd-hero-bottom {
    padding: 18px 52px;
    display: flex; align-items: center; gap: 0;
    border-top: 1px solid rgba(255,255,255,0.05);
    position: relative; z-index: 2;
    overflow-x: auto;
  }
  .fd-hero-bottom-item {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(255,255,255,0.2);
    padding: 0 20px 0 0; margin-right: 20px;
    border-right: 1px solid rgba(255,255,255,0.08);
    white-space: nowrap;
  }
  .fd-hero-bottom-item:last-child { border-right: none; }

  /* ══════════════════════════════════════
     BODY
  ══════════════════════════════════════ */
  .fd-body {
    max-width: 940px; margin: 0 auto;
    padding: 80px 32px 100px;
  }

  /* ── SECTION BAND LABEL ── */
  .fd-band {
    display: flex; align-items: stretch; gap: 0;
    margin-bottom: 40px;
  }
  .fd-band-accent {
    width: 5px; background: var(--fd-saffron); flex-shrink: 0;
  }
  .fd-band-inner {
    background: var(--fd-saffron-lt);
    border: 1px solid var(--fd-saffron-md);
    border-left: none;
    padding: 12px 20px;
    flex: 1;
    display: flex; align-items: center; justify-content: space-between;
  }
  .fd-band-num {
    font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 900;
    letter-spacing: 0.14em; color: var(--fd-saffron2);
    background: var(--fd-saffron-md); padding: 3px 10px; margin-right: 14px;
    flex-shrink: 0;
  }
  .fd-band-title {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--fd-saffron2); flex: 1;
  }
  .fd-band-sub {
    font-family: 'Inter', sans-serif; font-size: 11px;
    color: var(--fd-muted); font-style: italic;
  }

  /* ── HEADLINE ── */
  .fd-h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(26px, 4vw, 44px);
    font-weight: 900; line-height: 1.05;
    letter-spacing: -0.025em; color: var(--fd-ink);
    margin-bottom: 20px;
  }
  .fd-h2 em { font-style: normal; color: var(--fd-saffron); }
  .fd-h2 .g  { color: var(--fd-green); }
  .fd-h2 .r  { color: var(--fd-red); }
  .fd-h2 .nb { color: var(--fd-navy); }

  /* ── PROSE ── */
  .fd-prose {
    font-family: 'Inter', sans-serif; font-size: 17px;
    color: var(--fd-ink2); line-height: 1.82; margin-bottom: 28px;
  }
  .fd-prose strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--fd-ink); }

  /* ── DIVIDER ── */
  .fd-div {
    display: flex; align-items: center; gap: 0;
    margin: 60px 0;
  }
  .fd-div::before, .fd-div::after {
    content: ''; flex: 1; height: 1px; background: var(--fd-rule);
  }
  .fd-div-mark {
    width: 6px; height: 6px; background: var(--fd-saffron);
    margin: 0 16px; flex-shrink: 0;
    transform: rotate(45deg);
  }

  /* ── DEFINITION CARD (hero concept) ── */
  .fd-def-card {
    background: var(--fd-navy);
    padding: 44px 48px; margin-bottom: 40px;
    position: relative; overflow: hidden;
  }
  .fd-def-card::before {
    content: '§';
    position: absolute; right: 24px; top: -10px;
    font-family: 'Montserrat', sans-serif; font-size: 160px; font-weight: 900;
    color: rgba(224,123,0,0.07); line-height: 1;
    pointer-events: none;
  }
  .fd-def-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--fd-gold); margin-bottom: 14px;
  }
  .fd-def-text {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(17px, 2.5vw, 22px); font-weight: 800;
    color: #fff; line-height: 1.45; letter-spacing: -0.01em;
    position: relative; z-index: 1;
  }
  .fd-def-text em { font-style: normal; color: var(--fd-gold); }

  /* ── FEATURES GRID — checklist style ── */
  .fd-features {
    margin-bottom: 44px;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0; background: var(--fd-rule);
    border: 1px solid var(--fd-rule);
  }
  .fd-feat {
    background: var(--fd-white);
    padding: 22px 24px;
    border-right: 1px solid var(--fd-rule);
    border-bottom: 1px solid var(--fd-rule);
    display: flex; gap: 14px; align-items: flex-start;
  }
  .fd-feat:nth-child(2n) { border-right: none; }
  .fd-feat-check {
    width: 22px; height: 22px; flex-shrink: 0;
    background: var(--fd-saffron-lt);
    border: 2px solid var(--fd-saffron);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; color: var(--fd-saffron2); font-weight: 900;
    margin-top: 2px;
  }
  .fd-feat-text {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: var(--fd-ink2); line-height: 1.65;
  }
  .fd-feat-text strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--fd-ink); }

  /* ── FEDERATION TYPES — side-by-side contrast ── */
  .fd-types {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0; margin-bottom: 44px;
  }
  .fd-type {
    padding: 36px 32px;
    position: relative;
  }
  .fd-type.coming {
    background: var(--fd-navy);
    border-right: none;
  }
  .fd-type.holding {
    background: var(--fd-saffron);
    border-left: none;
  }
  .fd-type-badge {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    padding: 4px 12px; margin-bottom: 16px;
    display: inline-block;
  }
  .fd-type.coming .fd-type-badge { background: rgba(245,166,35,0.15); color: var(--fd-gold); }
  .fd-type.holding .fd-type-badge { background: rgba(0,0,0,0.15); color: rgba(255,255,255,0.8); }
  .fd-type-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px; font-weight: 900;
    letter-spacing: -0.02em; margin-bottom: 14px; line-height: 1.15;
  }
  .fd-type.coming .fd-type-title { color: #fff; }
  .fd-type.holding .fd-type-title { color: #fff; }
  .fd-type-body {
    font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.70;
    margin-bottom: 18px;
  }
  .fd-type.coming .fd-type-body { color: rgba(255,255,255,0.60); }
  .fd-type.holding .fd-type-body { color: rgba(255,255,255,0.80); }
  .fd-type-eg {
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600;
    padding: 10px 14px;
  }
  .fd-type.coming .fd-type-eg { background: rgba(245,166,35,0.10); color: var(--fd-gold); }
  .fd-type.holding .fd-type-eg { background: rgba(0,0,0,0.18); color: rgba(255,255,255,0.85); }
  .fd-type-eg span { font-weight: 700; }

  /* ── THREE TIER PYRAMID — visual hierarchy ── */
  .fd-tiers {
    margin-bottom: 44px;
  }
  .fd-tier-row {
    display: flex; align-items: stretch; gap: 0;
    margin-bottom: 4px;
  }
  .fd-tier-num {
    width: 52px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900;
    color: var(--fd-white);
  }
  .fd-tier-row:nth-child(1) .fd-tier-num { background: var(--fd-navy2); }
  .fd-tier-row:nth-child(2) .fd-tier-num { background: var(--fd-saffron2); }
  .fd-tier-row:nth-child(3) .fd-tier-num { background: var(--fd-green); }

  .fd-tier-body {
    flex: 1; padding: 20px 24px;
    border: 1px solid var(--fd-rule); border-left: none;
    background: var(--fd-white);
  }
  .fd-tier-title {
    font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 900;
    color: var(--fd-ink); margin-bottom: 5px; letter-spacing: -0.01em;
  }
  .fd-tier-desc {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: var(--fd-muted); line-height: 1.62;
  }
  .fd-tier-desc strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--fd-ink2); }
  .fd-tier-tag {
    display: inline-block; margin-top: 8px;
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    padding: 3px 10px;
  }
  .fd-tier-row:nth-child(1) .fd-tier-tag { background: var(--fd-navy-lt); color: var(--fd-navy); }
  .fd-tier-row:nth-child(2) .fd-tier-tag { background: var(--fd-saffron-lt); color: var(--fd-saffron2); }
  .fd-tier-row:nth-child(3) .fd-tier-tag { background: var(--fd-green-lt); color: var(--fd-green); }

  /* ── THREE LISTS TABLE ── */
  .fd-lists {
    margin-bottom: 44px;
    border: 1px solid var(--fd-rule); overflow: hidden;
  }
  .fd-lists-header {
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    background: var(--fd-navy2);
  }
  .fd-lists-header-cell {
    padding: 16px 20px;
    border-right: 1px solid rgba(255,255,255,0.08);
    text-align: center;
  }
  .fd-lists-header-cell:last-child { border-right: none; }
  .fd-lists-col-title {
    font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 900;
    color: #fff; margin-bottom: 3px;
  }
  .fd-lists-col-who {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
  }
  .fd-lists-header-cell:nth-child(1) .fd-lists-col-who { color: var(--fd-gold); }
  .fd-lists-header-cell:nth-child(2) .fd-lists-col-who { color: #86efac; }
  .fd-lists-header-cell:nth-child(3) .fd-lists-col-who { color: #93c5fd; }

  .fd-lists-body {
    display: grid; grid-template-columns: 1fr 1fr 1fr;
  }
  .fd-lists-col {
    padding: 18px 20px;
    border-right: 1px solid var(--fd-rule);
  }
  .fd-lists-col:last-child { border-right: none; }
  .fd-lists-col:nth-child(1) { background: var(--fd-gold-lt); }
  .fd-lists-col:nth-child(2) { background: var(--fd-bg); }
  .fd-lists-col:nth-child(3) { background: var(--fd-navy-lt); }

  .fd-list-item {
    font-family: 'Inter', sans-serif; font-size: 13px;
    color: var(--fd-ink2); padding: 6px 0;
    border-bottom: 1px solid var(--fd-rule);
    display: flex; align-items: flex-start; gap: 8px; line-height: 1.5;
  }
  .fd-list-item:last-child { border-bottom: none; }
  .fd-list-bullet { flex-shrink: 0; margin-top: 5px; }
  .fd-lists-col:nth-child(1) .fd-list-bullet { color: var(--fd-saffron); }
  .fd-lists-col:nth-child(2) .fd-list-bullet { color: var(--fd-green); }
  .fd-lists-col:nth-child(3) .fd-list-bullet { color: var(--fd-navy); }

  .fd-lists-note {
    background: var(--fd-saffron-lt);
    border-top: 1px solid var(--fd-saffron-md);
    padding: 12px 20px;
    font-family: 'Inter', sans-serif; font-size: 13px;
    color: var(--fd-saffron3); line-height: 1.6;
  }
  .fd-lists-note strong { font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── CALLOUT BOX (full-width dark) ── */
  .fd-callout {
    background: var(--fd-navy); color: #fff;
    padding: 36px 40px; margin-bottom: 44px;
    border-left: 6px solid var(--fd-saffron);
  }
  .fd-callout-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--fd-gold); margin-bottom: 12px;
  }
  .fd-callout-text {
    font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 600;
    color: #fff; line-height: 1.6; margin-bottom: 14px;
  }
  .fd-callout-sub {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: rgba(255,255,255,0.52); line-height: 1.68;
  }
  .fd-callout-sub strong { color: rgba(255,255,255,0.80); font-weight: 500; }

  /* ── CENTRE-STATE TIMELINE ── */
  .fd-cs-timeline {
    margin-bottom: 44px;
    position: relative;
  }
  .fd-cs-row {
    display: grid; grid-template-columns: 100px 1fr;
    gap: 0; border-bottom: 1px solid var(--fd-rule);
    background: var(--fd-white);
  }
  .fd-cs-row:first-child { border-top: 1px solid var(--fd-rule); }
  .fd-cs-year {
    padding: 20px 16px;
    border-right: 4px solid var(--fd-saffron);
    background: var(--fd-bg2);
    font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 900;
    color: var(--fd-saffron2); text-align: center;
    display: flex; align-items: center; justify-content: center; line-height: 1.2;
  }
  .fd-cs-content { padding: 20px 24px; }
  .fd-cs-head {
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700;
    color: var(--fd-ink); margin-bottom: 6px;
  }
  .fd-cs-body {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: var(--fd-muted); line-height: 1.65;
  }
  .fd-cs-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--fd-ink2); }

  /* ── DECENTRALISATION — panchayati raj diagram ── */
  .fd-panchayat {
    margin-bottom: 44px;
  }
  .fd-panch-row {
    display: flex; gap: 0; margin-bottom: 4px; align-items: stretch;
  }
  .fd-panch-level {
    flex-shrink: 0; width: 160px;
    padding: 16px 14px;
    display: flex; flex-direction: column; justify-content: center;
    border-right: 3px solid;
  }
  .fd-panch-row:nth-child(1) .fd-panch-level { background: #1a2340; border-color: var(--fd-saffron); }
  .fd-panch-row:nth-child(2) .fd-panch-level { background: #2e3d1a; border-color: var(--fd-green); }
  .fd-panch-row:nth-child(3) .fd-panch-level { background: #3d2a0a; border-color: var(--fd-gold); }
  .fd-panch-row:nth-child(4) .fd-panch-level { background: #1a1208; border-color: var(--fd-muted); }

  .fd-panch-level-name {
    font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 900;
    letter-spacing: 0.02em; color: #fff; margin-bottom: 3px;
  }
  .fd-panch-level-hindi {
    font-family: 'Inter', sans-serif; font-size: 11px;
    color: rgba(255,255,255,0.4);
  }

  .fd-panch-content {
    flex: 1; background: var(--fd-white);
    border: 1px solid var(--fd-rule); border-left: none;
    padding: 16px 22px;
  }
  .fd-panch-title {
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    color: var(--fd-ink); margin-bottom: 5px;
  }
  .fd-panch-desc {
    font-family: 'Inter', sans-serif; font-size: 13px;
    color: var(--fd-muted); line-height: 1.60;
  }
  .fd-panch-desc strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--fd-ink2); }

  /* ── KEY FACTS STRIP ── */
  .fd-facts-strip {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 0; background: var(--fd-rule);
    margin-bottom: 44px;
  }
  .fd-facts-cell {
    background: var(--fd-white);
    padding: 24px 20px; text-align: center;
    border-right: 1px solid var(--fd-rule);
  }
  .fd-facts-cell:last-child { border-right: none; }
  .fd-facts-big {
    font-family: 'Montserrat', sans-serif; font-size: 34px; font-weight: 900;
    color: var(--fd-saffron); letter-spacing: -0.03em; margin-bottom: 5px;
    line-height: 1;
  }
  .fd-facts-label {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--fd-muted);
  }

  /* ── ALERT ── */
  .fd-alert {
    padding: 18px 22px; margin-bottom: 22px;
    display: flex; gap: 14px; align-items: flex-start;
    border-radius: 0;
  }
  .fd-alert.saffron { background: var(--fd-saffron-lt); border-left: 4px solid var(--fd-saffron); }
  .fd-alert.green   { background: var(--fd-green-lt);   border-left: 4px solid var(--fd-green); }
  .fd-alert.red     { background: var(--fd-red-lt);     border-left: 4px solid var(--fd-red); }
  .fd-alert-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
  .fd-alert-text {
    font-family: 'Inter', sans-serif; font-size: 15px;
    color: var(--fd-ink2); line-height: 1.66;
  }
  .fd-alert-text strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--fd-ink); }

  /* ── FAQ ── */
  .fd-faq-band {
    display: flex; align-items: center; gap: 16px; margin-bottom: 16px;
  }
  .fd-faq-band-line { flex: 1; height: 1px; background: var(--fd-rule); }
  .fd-faq-band-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--fd-saffron2); background: var(--fd-saffron-lt);
    border: 1px solid var(--fd-saffron-md); padding: 5px 16px;
  }

  .fd-faq-h2 {
    font-family: 'Montserrat', sans-serif; font-size: 32px; font-weight: 900;
    color: var(--fd-ink); letter-spacing: -0.025em; margin-bottom: 28px;
  }

  .fd-faq-item {
    border-bottom: 1px solid var(--fd-rule);
  }
  .fd-faq-item:first-of-type { border-top: 1px solid var(--fd-rule); }
  .fd-faq-item.open { border-bottom-color: var(--fd-saffron-md); }

  .fd-faq-q {
    width: 100%; display: flex; justify-content: space-between;
    align-items: flex-start; gap: 20px;
    padding: 20px 0; background: none; border: none; cursor: pointer;
    text-align: left;
  }
  .fd-faq-q-text {
    font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600;
    color: var(--fd-ink2); line-height: 1.45; flex: 1;
  }
  .fd-faq-item.open .fd-faq-q-text { color: var(--fd-saffron2); }
  .fd-faq-icon { font-size: 18px; color: var(--fd-saffron); flex-shrink: 0; margin-top: 2px; }

  .fd-faq-ans { max-height: 0; overflow: hidden; transition: max-height 0.34s ease; }
  .fd-faq-ans.open { max-height: 1000px; }
  .fd-faq-ans-inner {
    padding-bottom: 22px;
    font-family: 'Inter', sans-serif; font-size: 15px;
    color: var(--fd-muted); line-height: 1.80;
  }
  .fd-faq-ans-inner strong { color: var(--fd-ink2); font-family: 'Poppins', sans-serif; font-weight: 600; }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .fd-hero-nav, .fd-hero-body, .fd-hero-bottom { padding-left: 28px; padding-right: 28px; }
    .fd-hero-stats { grid-template-columns: repeat(2, 1fr); }
    .fd-hero-stat:nth-child(2) { border-right: none; }
    .fd-hero-stat:nth-child(3) { border-top: 1px solid rgba(255,255,255,0.06); }
  }
  @media (max-width: 620px) {
    .fd-hero { min-height: auto; }
    .fd-hero-nav { padding: 18px 18px 0; flex-direction: column; align-items: flex-start; gap: 10px; }
    .fd-hero-nav-pill { font-size: 9px; }
    .fd-hero-body { padding: 28px 18px 0; }
    .fd-hero-h1 { font-size: clamp(50px, 15vw, 80px); margin-bottom: 24px; }
    .fd-hero-sub { font-size: 15px; max-width: 100%; margin-bottom: 28px; }
    .fd-hero-chips { margin-bottom: 32px; }
    .fd-hero-stats { grid-template-columns: 1fr 1fr; }
    .fd-hero-bottom { padding: 14px 18px; gap: 0; }
    .fd-hero-bottom-item { font-size: 9px; padding: 0 12px 0 0; margin-right: 12px; }
    .fd-body { padding: 48px 18px 72px; }
    .fd-features { grid-template-columns: 1fr; }
    .fd-feat:nth-child(2n) { border-right: 1px solid var(--fd-rule); }
    .fd-types { grid-template-columns: 1fr; }
    .fd-lists-header, .fd-lists-body { grid-template-columns: 1fr; }
    .fd-lists-header-cell, .fd-lists-col { border-right: none; border-bottom: 1px solid var(--fd-rule); }
    .fd-facts-strip { grid-template-columns: 1fr 1fr; }
    .fd-facts-cell:nth-child(2) { border-right: none; }
    .fd-facts-cell:nth-child(3) { border-top: 1px solid var(--fd-rule); }
    .fd-panch-level { width: 110px; }
  }
`;

const faqs = [
  {
    q: "What is federalism? What are its key features?",
    a: <><strong>Federalism</strong> is a system of government in which power is divided between a central authority and various constituent units (states/provinces). Both levels govern the same citizens but have their own jurisdiction.<br/><br/>
    Key features: <strong>(1)</strong> Two or more levels of government. <strong>(2)</strong> Each tier has its own jurisdiction in legislation, taxation and administration. <strong>(3)</strong> The existence of each tier is <strong>constitutionally guaranteed</strong>. <strong>(4)</strong> Fundamental constitutional provisions can only be changed with <strong>mutual consent</strong> of both levels. <strong>(5)</strong> Courts interpret the constitution and adjudicate disputes. <strong>(6)</strong> Each tier has clearly specified <strong>sources of revenue</strong>. <strong>(7)</strong> It promotes unity while accommodating regional diversity.</>
  },
  {
    q: "What is the difference between 'Coming Together' and 'Holding Together' federations?",
    a: <><strong>Coming Together Federations:</strong> Independent sovereign states voluntarily come together to form a larger union. They pool their sovereignty for greater security while retaining their own identity. All constituent states generally have <strong>equal powers</strong> vis-à-vis the federal government. Examples: <strong>USA, Switzerland, Australia</strong>.<br/><br/>
    <strong>Holding Together Federations:</strong> A large country with diverse regions decides to divide power between the centre and constituent units. Different units may have <strong>unequal powers</strong> — some units may be granted special powers. India is a holding together federation. Example: <strong>India, Spain, Belgium</strong>.<br/><br/>
    The key difference is whether states formed the centre (coming together) or the centre created the states (holding together).</>
  },
  {
    q: "What are the three lists in the Indian Constitution? Explain each.",
    a: <><strong>Union List:</strong> Contains subjects of national importance — defence, foreign affairs, banking, communications, currency. <strong>Only the Union (central) government</strong> can make laws on these subjects. Currently has 100 subjects.<br/><br/>
    <strong>State List:</strong> Contains subjects of state and local importance — police, trade, commerce, agriculture, irrigation. <strong>Only state governments</strong> can make laws on these subjects. Currently has 61 subjects.<br/><br/>
    <strong>Concurrent List:</strong> Contains subjects of common interest to both — education, forests, trade unions, marriage, adoption, succession. <strong>Both Union and state governments</strong> can make laws. In case of conflict, the <strong>Union law prevails</strong>. Has 52 subjects.<br/><br/>
    <strong>Residuary subjects</strong> — those not in any list — are handled by the Union government alone.</>
  },
  {
    q: "How does the Indian judiciary play a role in federalism?",
    a: <>The judiciary plays a crucial <strong>adjudicatory role</strong> in Indian federalism. Since both the Union and states sometimes claim authority over the same subject, disputes arise. The <strong>High Courts and Supreme Court</strong> have the right to resolve such disputes.<br/><br/>
    The Supreme Court acts as the final interpreter of the Constitution and can declare any law — whether made by Parliament or a state legislature — unconstitutional if it violates the division of powers. This judicial oversight ensures that neither the centre nor the states can overstep their constitutional boundaries, maintaining the <strong>federal balance</strong>.</>
  },
  {
    q: "What are linguistic states? Why were they created?",
    a: <>In <strong>1947 and the years following independence</strong>, India reorganised its states primarily on a <strong>linguistic basis</strong> — grouping people who spoke the same language into the same state. This was done to:<br/><br/>
    1. <strong>Recognise linguistic and cultural differences</strong> of various parts of the country.<br/>
    2. Make <strong>administration easier</strong> — governance in one's own language is more effective.<br/>
    3. <strong>Unite the country</strong> by giving linguistic communities their own political identity within the federation rather than letting unaddressed grievances fuel separatism.<br/><br/>
    Contrary to fears that linguistic states would break up India, the creation of linguistic states actually <strong>strengthened national unity</strong>.</>
  },
  {
    q: "What is India's language policy? Why wasn't Hindi made the sole official language?",
    a: <><strong>India's official language is Hindi</strong>, but the Constitution recognises <strong>21 other Scheduled Languages</strong>. Central government examinations can be taken in any scheduled language, and each state has its own official language.<br/><br/>
    Originally, the Constitution planned to phase out English as an official language by <strong>1965</strong>. However, <strong>non-Hindi speaking states</strong> (particularly in South India) strongly opposed this — they feared that making Hindi the only official language would disadvantage their citizens in national competitions and jobs.<br/><br/>
    As a result, both <strong>Hindi and English continue as official languages</strong> of the Union. This is a classic example of power sharing — the majority language did not simply override minority language rights.</>
  },
  {
    q: "How did Centre-State relations change after 1990?",
    a: <><strong>Before 1990:</strong> The central government frequently misused constitutional powers to <strong>dismiss state governments</strong> controlled by rival parties and impose President's Rule, even on flimsy grounds. This undermined genuine federalism.<br/><br/>
    <strong>After 1990:</strong> India entered the era of <strong>coalition governments</strong> at the centre. No single national party could win an outright majority, so they needed to form alliances with regional parties. This fundamentally changed the power equation:<br/><br/>
    1. Regional parties became essential partners in national governance.<br/>
    2. A new culture of <strong>power sharing and respect for state autonomy</strong> emerged.<br/>
    3. The centre became far more careful about interfering in state matters.<br/><br/>
    This shift made Indian federalism more genuine and balanced in practice.</>
  },
  {
    q: "What is decentralisation? What changes were made in 1992?",
    a: <><strong>Decentralisation</strong> refers to the transfer of power from the central and state governments to <strong>local government bodies</strong> at the village, block, and district level. It makes government more responsive to local needs and ensures direct citizen participation.<br/><br/>
    The <strong>1992 Constitutional Amendment</strong> was a landmark — it gave constitutional status to local self-government and mandated:<br/><br/>
    1. <strong>Regular elections</strong> for local government bodies — mandatory.<br/>
    2. <strong>Reservation of seats</strong> for Scheduled Castes, Scheduled Tribes and Other Backward Classes.<br/>
    3. At least <strong>one-third of all positions reserved for women</strong>.<br/>
    4. Creation of <strong>State Election Commissions</strong> in every state to conduct local elections.<br/>
    5. State governments required to <strong>share revenue</strong> with local bodies.</>
  },
  {
    q: "What is Panchayati Raj? Describe its three levels.",
    a: <><strong>Panchayati Raj</strong> is India's system of rural local self-government. It has three tiers:<br/><br/>
    <strong>1. Gram Panchayat (Village Level):</strong> Covers one village or a group of villages. Consists of ward members (Panch) and a <strong>president/Sarpanch</strong> directly elected by adult voters. It is the primary decision-making body for village-level matters. Supervised by the <strong>Gram Sabha</strong> (all adult voters), which must meet 2–3 times a year to approve budget and review performance.<br/><br/>
    <strong>2. Panchayat Samiti/Block/Mandal (Intermediate Level):</strong> A group of Gram Panchayats form a Panchayat Samiti. Members are elected by all Panchayat members in that area.<br/><br/>
    <strong>3. Zilla Parishad (District Level):</strong> All Panchayat Samitis and Mandals in a district form the Zilla Parishad. Most members are elected; MPs and MLAs of the district are also members. Headed by an elected chairperson.</>
  },
];

export default function Federalism() {
  const [openIdx, setOpenIdx] = useState(null);
  const tog = (i) => setOpenIdx(openIdx === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="fd-root">

        {/* ══ HERO ══ */}
        <div className="fd-hero">
          <div className="fd-hero-glow" />
          <div className="fd-hero-chakra" />
          <div className="fd-hero-stripe" />

          <div className="fd-hero-nav">
            <div className="fd-hero-nav-brand">Shikshacom · Civics</div>
            <div className="fd-hero-nav-pill">Chapter 2 · Democratic Politics II</div>
          </div>

          <div className="fd-hero-body">
            <div className="fd-hero-eyebrow">CBSE Class 10 · Political Science</div>
            <h1 className="fd-hero-h1">
              Federalism
            </h1>
            <p className="fd-hero-sub">
              How does a country as vast and diverse as India hold together? The answer lies in
              <strong> federalism</strong> — a constitutional design that divides power between the
              centre and the states, creating unity without uniformity.
            </p>
            <div className="fd-hero-chips">
              {["What is Federalism","Types of Federation","Three Lists","Linguistic States","Centre-State Relations","Panchayati Raj"].map(c => (
                <div className="fd-chip" key={c}><div className="fd-chip-dot" />{c}</div>
              ))}
            </div>
            <div className="fd-hero-stats">
              <div className="fd-hero-stat">
                <div className="fd-stat-num">3</div>
                <div className="fd-stat-label">Legislative Lists</div>
              </div>
              <div className="fd-hero-stat">
                <div className="fd-stat-num">3</div>
                <div className="fd-stat-label">Tiers of Government</div>
              </div>
              <div className="fd-hero-stat">
                <div className="fd-stat-num">1992</div>
                <div className="fd-stat-label">Decentralisation Amendment</div>
              </div>
              <div className="fd-hero-stat">
                <div className="fd-stat-num">36L+</div>
                <div className="fd-stat-label">Elected Local Reps</div>
              </div>
            </div>
          </div>

          <div className="fd-hero-bottom">
            {["Federalism Definition","Coming vs Holding Together","Union · State · Concurrent Lists","Linguistic States","Language Policy","Centre-State Relations","Decentralisation","Panchayati Raj"].map(t => (
              <div className="fd-hero-bottom-item" key={t}>{t}</div>
            ))}
          </div>
        </div>

        {/* ══ BODY ══ */}
        <div className="fd-body">

          {/* ── 1: What is Federalism ── */}
          <div className="fd-band">
            <div className="fd-band-accent" />
            <div className="fd-band-inner">
              <div className="fd-band-num">01</div>
              <div className="fd-band-title">Definition & Core Concept</div>
              <div className="fd-band-sub">What makes a government federal?</div>
            </div>
          </div>

          <h2 className="fd-h2">What Is <em>Federalism</em>?</h2>

          <div className="fd-def-card">
            <div className="fd-def-tag">Constitutional Definition</div>
            <div className="fd-def-text">
              Federalism is a system of government in which power is <em>divided</em> between a central authority and various constituent units of the country — with both levels enjoying independent authority over their own domains.
            </div>
          </div>

          <p className="fd-prose">
            In a federal system, there are at least <strong>two levels of government</strong> — one for the entire country responsible for national issues, and governments at the state level for everyday concerns. Crucially, neither level can simply abolish or override the other — both are <strong>constitutionally protected</strong>.
          </p>

          <h2 className="fd-h2" style={{fontSize:"clamp(20px,2.8vw,30px)", marginBottom:"16px"}}>7 Key <em>Features</em> of Federalism</h2>
          <div className="fd-features">
            {[
              <><strong>Two or more levels</strong> of government exist simultaneously over the same territory and citizens.</>,
              <>Each tier has its own <strong>jurisdiction in legislation, taxation and administration</strong> — their domains don't simply overlap.</>,
              <>The existence and authority of each tier is <strong>constitutionally guaranteed</strong> — it cannot be abolished by the other.</>,
              <>Fundamental constitutional provisions can only be changed with <strong>mutual consent</strong> of both levels of government.</>,
              <><strong>Courts have the power</strong> to interpret the constitution and adjudicate disputes between levels of government.</>,
              <>Sources of <strong>revenue for each level are clearly specified</strong> — ensuring financial autonomy and smooth functioning.</>,
              <>Federalism both <strong>safeguards national unity</strong> and accommodates regional diversity — it does both simultaneously.</>,
            ].map((text, i) => (
              <div className="fd-feat" key={i}>
                <div className="fd-feat-check">✓</div>
                <div className="fd-feat-text">{text}</div>
              </div>
            ))}
          </div>

          <div className="fd-div"><div className="fd-div-mark" /></div>

          {/* ── 2: Types ── */}
          <div className="fd-band">
            <div className="fd-band-accent" />
            <div className="fd-band-inner">
              <div className="fd-band-num">02</div>
              <div className="fd-band-title">Types of Federation</div>
              <div className="fd-band-sub">How federations are formed</div>
            </div>
          </div>

          <h2 className="fd-h2">Coming Together <em>vs</em><br />Holding Together</h2>
          <p className="fd-prose">
            Federations form in two fundamentally different ways — from the bottom up, or from the top down.
            The difference matters because it shapes how power is distributed between the centre and the states.
          </p>

          <div className="fd-types">
            <div className="fd-type coming">
              <div className="fd-type-badge">Type 1</div>
              <div className="fd-type-title">Coming Together<br />Federation</div>
              <div className="fd-type-body">
                Independent, sovereign states voluntarily come together to form a bigger unit.
                They pool their sovereignty to increase security while retaining their own
                distinct identities. All constituent states generally have <strong>equal powers</strong> relative to the federal government.
              </div>
              <div className="fd-type-eg">🌍 Examples: <span>USA · Switzerland · Australia</span></div>
            </div>
            <div className="fd-type holding">
              <div className="fd-type-badge">Type 2</div>
              <div className="fd-type-title">Holding Together<br />Federation</div>
              <div className="fd-type-body">
                A large, diverse country decides to divide its power between the national government and constituent units. Different states may have <strong>unequal powers</strong> — some may be granted special status or additional autonomy.
              </div>
              <div className="fd-type-eg">🇮🇳 Examples: <span>India · Spain · Belgium</span></div>
            </div>
          </div>

          <div className="fd-alert saffron">
            <div className="fd-alert-icon">🇮🇳</div>
            <div className="fd-alert-text">
              <strong>India is a "Holding Together" federation</strong> — powers are vested in state governments that function under the overall supervision of the Union government. India's diversity demanded this top-down distribution of power.
            </div>
          </div>

          <div className="fd-div"><div className="fd-div-mark" /></div>

          {/* ── 3: Three Tier System ── */}
          <div className="fd-band">
            <div className="fd-band-accent" />
            <div className="fd-band-inner">
              <div className="fd-band-num">03</div>
              <div className="fd-band-title">Three-Tier System</div>
              <div className="fd-band-sub">India's unique three-level governance</div>
            </div>
          </div>

          <h2 className="fd-h2">India's <em>Three-Tier</em><br />Government</h2>
          <p className="fd-prose">
            Unlike most federations that have two levels, India has a <strong>three-tier system</strong> — making it one of the most decentralised large democracies in the world.
          </p>

          <div className="fd-tiers">
            {[
              { n:"1", title:"Union Government", hindi:"Central Government", desc:<>Responsible for <strong>national issues</strong> — defence, foreign affairs, currency, railways, communications. Laws made by Parliament cover the entire country.</>, tag:"National Level" },
              { n:"2", title:"State Governments", hindi:"Rajya Sarkar", desc:<>Handle <strong>state and local concerns</strong> — police, agriculture, trade, irrigation. Laws made by state legislatures apply within each state.</>, tag:"State Level" },
              { n:"3", title:"Local Self-Government", hindi:"Panchayats & Municipalities", desc:<>Introduced constitutionally in <strong>1992</strong>. Gram Panchayats for villages; Municipalities and Municipal Corporations for urban areas. Directly elected by citizens.</>, tag:"Local Level" },
            ].map((t, i) => (
              <div className="fd-tier-row" key={i}>
                <div className="fd-tier-num">{t.n}</div>
                <div className="fd-tier-body">
                  <div className="fd-tier-title">{t.title}</div>
                  <div className="fd-tier-desc">{t.desc}</div>
                  <div className="fd-tier-tag">{t.tag}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="fd-div"><div className="fd-div-mark" /></div>

          {/* ── 4: Three Lists ── */}
          <div className="fd-band">
            <div className="fd-band-accent" />
            <div className="fd-band-inner">
              <div className="fd-band-num">04</div>
              <div className="fd-band-title">Distribution of Powers</div>
              <div className="fd-band-sub">Union List · State List · Concurrent List</div>
            </div>
          </div>

          <h2 className="fd-h2">The <em>Three Lists</em>:<br />Who Governs What?</h2>
          <p className="fd-prose">
            The Indian Constitution uses a <strong>three-list system</strong> to clearly assign which level of government has authority over which subjects — preventing both confusion and conflict.
          </p>

          <div className="fd-lists">
            <div className="fd-lists-header">
              <div className="fd-lists-header-cell">
                <div className="fd-lists-col-title">Union List</div>
                <div className="fd-lists-col-who">Centre Only · 100 Subjects</div>
              </div>
              <div className="fd-lists-header-cell">
                <div className="fd-lists-col-title">State List</div>
                <div className="fd-lists-col-who">States Only · 61 Subjects</div>
              </div>
              <div className="fd-lists-header-cell">
                <div className="fd-lists-col-title">Concurrent List</div>
                <div className="fd-lists-col-who">Both · 52 Subjects</div>
              </div>
            </div>
            <div className="fd-lists-body">
              <div className="fd-lists-col">
                {["Defence","Foreign Affairs","Banking","Communications","Currency","Railways","Income Tax"].map(s => (
                  <div className="fd-list-item" key={s}>
                    <span className="fd-list-bullet">▸</span>{s}
                  </div>
                ))}
              </div>
              <div className="fd-lists-col">
                {["Police","Agriculture","Irrigation","Trade & Commerce","Land","Public Health","State Taxes"].map(s => (
                  <div className="fd-list-item" key={s}>
                    <span className="fd-list-bullet">▸</span>{s}
                  </div>
                ))}
              </div>
              <div className="fd-lists-col">
                {["Education","Forests","Trade Unions","Marriage","Adoption","Succession","Criminal Law"].map(s => (
                  <div className="fd-list-item" key={s}>
                    <span className="fd-list-bullet">▸</span>{s}
                  </div>
                ))}
              </div>
            </div>
            <div className="fd-lists-note">
              ⚠ <strong>Conflict Rule:</strong> On Concurrent List subjects, if there is a conflict between a Union law and a State law, the <strong>Union law prevails</strong>. Residuary subjects (not in any list) belong exclusively to the Union government.
            </div>
          </div>

          <div className="fd-div"><div className="fd-div-mark" /></div>

          {/* ── 5: Linguistic States & Language ── */}
          <div className="fd-band">
            <div className="fd-band-accent" />
            <div className="fd-band-inner">
              <div className="fd-band-num">05</div>
              <div className="fd-band-title">Linguistic States & Language Policy</div>
              <div className="fd-band-sub">How language shaped India's map</div>
            </div>
          </div>

          <h2 className="fd-h2"><em>Linguistic</em> States<br />&amp; Language Policy</h2>
          <p className="fd-prose">
            India's linguistic and cultural diversity is extraordinary. Post-independence, the country reorganised its state boundaries on a <strong>linguistic basis</strong> — a decision that was controversial at the time but ultimately proved to be a masterstroke for national unity.
          </p>

          <div className="fd-facts-strip">
            <div className="fd-facts-cell">
              <div className="fd-facts-big">21</div>
              <div className="fd-facts-label">Scheduled Languages</div>
            </div>
            <div className="fd-facts-cell">
              <div className="fd-facts-big">1965</div>
              <div className="fd-facts-label">Year English Was to Stop (Didn't)</div>
            </div>
            <div className="fd-facts-cell">
              <div className="fd-facts-big">Hindi</div>
              <div className="fd-facts-label">Official Language of Union</div>
            </div>
            <div className="fd-facts-cell">
              <div className="fd-facts-big">Both</div>
              <div className="fd-facts-label">Hindi + English Continue</div>
            </div>
          </div>

          <div className="fd-callout">
            <div className="fd-callout-label">Key Insight · Language Policy</div>
            <div className="fd-callout-text">Why did English survive as an official language despite the Constitution planning to phase it out by 1965?</div>
            <div className="fd-callout-sub">
              Non-Hindi speaking states — especially South Indian states — <strong>strongly opposed Hindi becoming the sole official language</strong>. They argued it would give an unfair advantage to Hindi-speaking candidates in national exams and government jobs. Their resistance was powerful enough to keep <strong>both Hindi and English as official languages of the Union</strong>. This is federalism working as intended — the linguistic majority could not simply override the minority's legitimate concerns.
            </div>
          </div>

          <div className="fd-div"><div className="fd-div-mark" /></div>

          {/* ── 6: Centre-State Relations ── */}
          <div className="fd-band">
            <div className="fd-band-accent" />
            <div className="fd-band-inner">
              <div className="fd-band-num">06</div>
              <div className="fd-band-title">Centre-State Relations</div>
              <div className="fd-band-sub">From domination to genuine sharing</div>
            </div>
          </div>

          <h2 className="fd-h2">Centre–State <em>Relations</em>:<br />Before &amp; After 1990</h2>
          <p className="fd-prose">
            On paper, India has always been federal. In practice, the centre–state relationship evolved significantly — and the turning point was <strong>1990</strong>.
          </p>

          <div className="fd-cs-timeline">
            {[
              { yr:"Pre-1990", head:"Central Dominance", body:<>The central government <strong>frequently dismissed state governments</strong> controlled by rival parties using President's Rule — often without genuine constitutional cause. The federal balance was heavily tilted toward the centre.</>},
              { yr:"1990", head:"Coalition Era Begins", body:<>No single national party won an outright majority. To form governments, national parties had to <strong>ally with regional parties</strong>. This fundamentally changed power dynamics.</>},
              { yr:"Post-1990", head:"New Culture of Power Sharing", body:<>A new culture of <strong>respecting state autonomy</strong> emerged. Regional parties gained genuine influence at the national level. The centre became far more cautious about interfering in state matters.</>},
              { yr:"Today", head:"Genuine Federalism", body:<>India now has a more balanced federal relationship — though tensions remain. The <strong>Supreme Court</strong> and constitutional norms increasingly protect states from central overreach.</>},
            ].map((r, i) => (
              <div className="fd-cs-row" key={i}>
                <div className="fd-cs-year">{r.yr}</div>
                <div className="fd-cs-content">
                  <div className="fd-cs-head">{r.head}</div>
                  <div className="fd-cs-body">{r.body}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="fd-div"><div className="fd-div-mark" /></div>

          {/* ── 7: Decentralisation ── */}
          <div className="fd-band">
            <div className="fd-band-accent" />
            <div className="fd-band-inner">
              <div className="fd-band-num">07</div>
              <div className="fd-band-title">Decentralisation & Panchayati Raj</div>
              <div className="fd-band-sub">Power to the people at the grassroots</div>
            </div>
          </div>

          <h2 className="fd-h2"><em>Decentralisation</em>:<br />Power to the Village</h2>
          <p className="fd-prose">
            Even federalism between centre and states leaves most citizens untouched — they live in villages and towns, far from state capitals. <strong>Decentralisation</strong> brings government to their doorstep. The 1992 Constitutional Amendment made this mandatory and gave it constitutional force.
          </p>

          <div className="fd-alert green">
            <div className="fd-alert-icon">📜</div>
            <div className="fd-alert-text">
              <strong>1992 Constitutional Amendment:</strong> Made local self-government constitutionally mandatory. Regular elections, reservations for SC/ST/OBC and women (1/3 minimum), State Election Commissions, and revenue sharing — all became constitutional obligations.
            </div>
          </div>

          <h2 className="fd-h2" style={{fontSize:"clamp(18px,2.6vw,28px)", margin:"28px 0 16px"}}>Panchayati Raj — <em>Rural Structure</em></h2>

          <div className="fd-panchayat">
            {[
              { name:"Zilla Parishad", hindi:"District Level", title:"District Council", desc:<>All Panchayat Samitis and Mandals in a district. Mostly elected members; <strong>MPs and MLAs</strong> of the district also members. Headed by an elected chairperson.</> },
              { name:"Panchayat Samiti", hindi:"Block / Mandal Level", title:"Block Council", desc:<>A group of Gram Panchayats form a Panchayat Samiti or Block. Members are <strong>elected by all panchayat members</strong> in the area.</> },
              { name:"Gram Panchayat", hindi:"Village Level", title:"Village Council", desc:<>One village or group of villages. Ward members (Panch) and <strong>Sarpanch</strong> directly elected by adult voters. Supervised by the <strong>Gram Sabha</strong> — all adult voters — meeting 2–3 times/year.</> },
              { name:"Urban Bodies", hindi:"Municipalities & Corporations", title:"Town & City Level", desc:<>Municipalities for towns; <strong>Municipal Corporations</strong> for big cities. Headed by Municipal Chairperson or <strong>Mayor</strong> respectively. All elected by citizens.</> },
            ].map((r, i) => (
              <div className="fd-panch-row" key={i}>
                <div className="fd-panch-level">
                  <div className="fd-panch-level-name">{r.name}</div>
                  <div className="fd-panch-level-hindi">{r.hindi}</div>
                </div>
                <div className="fd-panch-content">
                  <div className="fd-panch-title">{r.title}</div>
                  <div className="fd-panch-desc">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="fd-alert saffron">
            <div className="fd-alert-icon">🗳️</div>
            <div className="fd-alert-text">
              There are about <strong>36 lakh (3.6 million) elected representatives</strong> in Panchayats and Municipalities across India — making it one of the largest exercises in democratic self-governance in human history.
            </div>
          </div>

          <div className="fd-div"><div className="fd-div-mark" /></div>

          {/* ── FAQ ── */}
          <div className="fd-faq-band">
            <div className="fd-faq-band-line" />
            <div className="fd-faq-band-tag">Exam Preparation · FAQ</div>
            <div className="fd-faq-band-line" />
          </div>

          <h2 className="fd-faq-h2">All You Need to Know</h2>

          {faqs.map((faq, i) => (
            <div className={`fd-faq-item${openIdx === i ? " open" : ""}`} key={i}>
              <button className="fd-faq-q" onClick={() => tog(i)}>
                <span className="fd-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="fd-faq-icon">{openIdx === i ? "▴" : "▾"}</span>
              </button>
              <div className={`fd-faq-ans${openIdx === i ? " open" : ""}`}>
                <div className="fd-faq-ans-inner">{faq.a}</div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
