import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #1a0a0a;
    --ink2:       #2e1212;
    --muted:      #7a4a4a;
    --paper:      #fdf5f5;
    --paper2:     #f7e8e8;
    --accent:     #b01a1a;
    --accent2:    #8a0f0f;
    --accent-lt:  #ffd9d9;
    --amber:      #b06a00;
    --amber-lt:   #fff4d9;
    --teal:       #0a6e6e;
    --teal-lt:    #d9f5f5;
    --slate:      #2a3f5c;
    --slate-lt:   #dde8f5;
    --rule:       #e8c4c4;
    --white:      #ffffff;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .pac-root {
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
  }

  /* ─────────────────────────────────────────
     HERO — deep crimson-to-charcoal gradient
  ───────────────────────────────────────── */
  .pac-hero {
    background: linear-gradient(135deg, #0f0202 0%, #230505 50%, #2e0808 100%);
    min-height: 88vh;
    display: flex;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
    padding: 0 0 64px;
  }
  .pac-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 6px;
    background: linear-gradient(90deg, #b01a1a 0%, #b06a00 50%, #0a6e6e 100%);
  }
  .pac-hero-bg-num {
    position: absolute;
    bottom: -60px; right: -30px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(220px, 36vw, 500px);
    font-weight: 900; line-height: 1;
    color: rgba(255,255,255,0.022);
    letter-spacing: -0.04em;
    user-select: none; pointer-events: none;
  }
  /* Broken-grid watermark */
  .pac-hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(176,26,26,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(176,26,26,0.07) 1px, transparent 1px);
    background-size: 52px 52px;
    pointer-events: none;
  }
  /* Diagonal tear */
  .pac-hero-tear {
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 40%;
    background: linear-gradient(to top right, rgba(176,26,26,0.06) 0%, transparent 60%);
    pointer-events: none;
  }
  .pac-glow-a {
    position: absolute; top: 10%; right: 6%;
    width: 380px; height: 380px; border-radius: 50%;
    background: radial-gradient(circle, rgba(176,26,26,0.15) 0%, transparent 70%);
    pointer-events: none;
  }
  .pac-glow-b {
    position: absolute; bottom: 16%; left: 4%;
    width: 260px; height: 260px; border-radius: 50%;
    background: radial-gradient(circle, rgba(176,106,0,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  .pac-hero-inner {
    max-width: 900px; width: 100%;
    margin: 0 auto; padding: 0 32px;
    position: relative; z-index: 1;
  }
  .pac-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #ff9a9a; margin-bottom: 24px;
    display: flex; align-items: center; gap: 14px;
  }
  .pac-overline::before, .pac-overline::after {
    content: ''; flex: 0 0 40px; height: 1px; background: #ff9a9a;
  }
  .pac-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(42px, 8vw, 86px);
    font-weight: 900; color: #fff;
    line-height: 0.95; letter-spacing: -0.03em;
    margin-bottom: 32px;
  }
  .pac-hero-title em   { font-style: normal; color: #ff9a9a; }
  .pac-hero-title .em2 { color: #fbbf24; }
  .pac-hero-bar {
    display: flex; flex-wrap: wrap; gap: 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 24px; margin-top: 8px;
  }
  .pac-hero-bar-item {
    flex: 1 1 180px;
    padding: 0 24px 0 0;
    border-right: 1px solid rgba(255,255,255,0.1);
    margin-right: 24px;
  }
  .pac-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .pac-bar-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.35); margin-bottom: 5px;
  }
  .pac-bar-value {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 600;
    color: rgba(255,255,255,0.75);
  }

  /* ─────────────────────────────────────────
     BODY
  ───────────────────────────────────────── */
  .pac-body {
    max-width: 860px;
    margin: 0 auto;
    padding: 72px 32px 96px;
  }

  /* ─────────── DARK INTRO CARD ─────────── */
  .pac-intro-card {
    background: linear-gradient(135deg, #0f0202 0%, #2e0808 100%);
    border-left: 5px solid #ff9a9a;
    border-radius: 4px;
    padding: 36px 40px;
    margin-bottom: 64px;
    position: relative; overflow: hidden;
  }
  .pac-intro-card::after {
    content: '⚖️';
    position: absolute; right: 32px; top: 50%;
    transform: translateY(-50%);
    font-size: 80px; opacity: 0.1; line-height: 1;
  }
  .pac-intro-card p {
    font-family: 'Poppins', sans-serif;
    font-size: 18px; font-weight: 500;
    color: rgba(255,255,255,0.88);
    line-height: 1.78; margin: 0 0 14px;
  }
  .pac-intro-card p:last-child { margin: 0; }
  .pac-intro-card strong { color: #ff9a9a; }

  /* ─────────── SECTION HEADER ─────────── */
  .pac-sec-head {
    display: flex; align-items: flex-start; gap: 20px;
    margin-bottom: 28px;
    border-bottom: 2px solid var(--rule);
    padding-bottom: 18px;
  }
  .pac-sec-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 56px; font-weight: 900;
    color: var(--rule); line-height: 1; flex-shrink: 0;
  }
  @media (max-width: 600px) { .pac-sec-num { font-size: 40px; } }
  .pac-sec-title-wrap { padding-top: 8px; }
  .pac-sec-kicker {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 6px;
  }
  .pac-sec-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(22px, 3.5vw, 30px);
    font-weight: 800; color: var(--ink);
    line-height: 1.15; letter-spacing: -0.02em;
  }
  .pac-sec-title span { color: var(--accent); }

  /* ─────────── BODY TEXT ─────────── */
  .pac-body-text {
    font-family: 'Inter', sans-serif;
    font-size: 16px; font-weight: 400;
    color: var(--ink2); line-height: 1.85;
    margin-bottom: 28px;
  }
  .pac-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── DIVIDER ─────────── */
  .pac-divider {
    margin: 56px 0;
    display: flex; align-items: center; gap: 16px;
  }
  .pac-divider::before, .pac-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--rule);
  }
  .pac-divider-mark {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--accent); flex-shrink: 0;
  }

  /* ─────────── POVERTY FACES — ICON ROW ─────────── */
  .pac-faces-wrap {
    background: linear-gradient(135deg, #0f0202 0%, #2e0808 100%);
    border-radius: 8px;
    padding: 30px 28px;
    margin-bottom: 36px;
    display: flex; flex-wrap: wrap; gap: 14px;
    align-items: center;
  }
  .pac-faces-label {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #ff9a9a; width: 100%; margin-bottom: 4px;
  }
  .pac-face-chip {
    background: rgba(255,154,154,0.1);
    border: 1px solid rgba(255,154,154,0.2);
    border-radius: 100px;
    padding: 6px 14px;
    font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 500;
    color: rgba(255,255,255,0.8);
    white-space: nowrap;
  }

  /* ─────────── DEFINITION SPLIT — ECONOMIC vs SOCIAL ─────────── */
  .pac-dim-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1.5px solid var(--rule);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 36px;
  }
  @media (max-width: 600px) { .pac-dim-split { grid-template-columns: 1fr; } }
  .pac-dim-col { padding: 26px 24px; }
  .pac-dim-col.eco  { background: var(--accent-lt); border-right: 1.5px solid var(--rule); }
  .pac-dim-col.soc  { background: var(--slate-lt); }
  @media (max-width: 600px) {
    .pac-dim-col.eco { border-right: none; border-bottom: 1.5px solid var(--rule); }
  }
  .pac-dim-badge {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 100px;
    display: inline-block; margin-bottom: 10px;
  }
  .pac-dim-col.eco .pac-dim-badge { background: rgba(176,26,26,0.12); color: var(--accent2); }
  .pac-dim-col.soc .pac-dim-badge { background: rgba(42,63,92,0.12); color: var(--slate); }
  .pac-dim-heading {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px; font-weight: 900;
    margin-bottom: 12px;
  }
  .pac-dim-col.eco .pac-dim-heading { color: var(--accent2); }
  .pac-dim-col.soc .pac-dim-heading { color: var(--slate); }
  .pac-dim-col ul { list-style: none; padding: 0; }
  .pac-dim-col ul li {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2);
    padding: 8px 0 8px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.07);
    position: relative; line-height: 1.55;
  }
  .pac-dim-col ul li:last-child { border-bottom: none; }
  .pac-dim-col ul li::before {
    content: ''; position: absolute; left: 0; top: 14px;
    width: 6px; height: 6px; border-radius: 50%;
  }
  .pac-dim-col.eco ul li::before { background: var(--accent); }
  .pac-dim-col.soc ul li::before { background: var(--slate); }
  .pac-dim-col ul li strong { font-weight: 600; }
  .pac-dim-col.eco ul li strong { color: var(--accent2); }
  .pac-dim-col.soc ul li strong { color: var(--slate); }

  /* ─────────── DARK HIGHLIGHT ─────────── */
  .pac-highlight {
    background: linear-gradient(135deg, #0f0202 0%, #2e0808 100%);
    border-radius: 6px;
    padding: 28px 32px 28px 36px;
    margin-bottom: 36px;
    position: relative; overflow: hidden;
  }
  .pac-highlight::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 4px; height: 100%;
    background: linear-gradient(180deg, #ff9a9a, #fbbf24);
  }
  .pac-highlight-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #ff9a9a; margin-bottom: 10px;
  }
  .pac-highlight-text {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 600;
    color: rgba(255,255,255,0.9); line-height: 1.7;
  }
  .pac-highlight-text strong { color: #ff9a9a; }

  /* ─────────── POVERTY LINE STAT CARDS ─────────── */
  .pac-pl-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 36px;
  }
  @media (max-width: 640px) { .pac-pl-grid { grid-template-columns: 1fr; } }
  .pac-pl-card {
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-top: 4px solid var(--accent);
    border-radius: 6px;
    padding: 22px 18px; text-align: center;
  }
  .pac-pl-card.amber-top { border-top-color: var(--amber); }
  .pac-pl-card.teal-top  { border-top-color: var(--teal); }
  .pac-pl-icon  { font-size: 28px; margin-bottom: 8px; display: block; }
  .pac-pl-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 28px; font-weight: 900;
    line-height: 1.1; margin-bottom: 5px;
    letter-spacing: -0.02em;
  }
  .pac-pl-card .pac-pl-num           { color: var(--accent); }
  .pac-pl-card.amber-top .pac-pl-num { color: var(--amber); }
  .pac-pl-card.teal-top  .pac-pl-num { color: var(--teal); }
  .pac-pl-label {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    color: var(--ink); margin-bottom: 4px;
  }
  .pac-pl-sub {
    font-family: 'Inter', sans-serif;
    font-size: 12px; color: var(--muted); line-height: 1.4;
  }

  /* ─────────── POVERTY TREND TIMELINE ─────────── */
  .pac-trend {
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 36px;
  }
  .pac-trend-head {
    background: var(--accent2);
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    padding: 14px 24px; letter-spacing: 0.04em;
  }
  .pac-trend-row {
    display: flex; align-items: center;
    border-bottom: 1px solid var(--rule);
    padding: 16px 24px; gap: 20px;
  }
  .pac-trend-row:last-child { border-bottom: none; }
  .pac-trend-year {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px; font-weight: 900;
    color: var(--accent); flex-shrink: 0;
    width: 72px;
  }
  .pac-trend-pct {
    font-family: 'Montserrat', sans-serif;
    font-size: 26px; font-weight: 900;
    flex-shrink: 0; width: 64px;
  }
  .pac-trend-bar-wrap {
    flex: 1; height: 10px;
    background: var(--paper2);
    border-radius: 100px; overflow: hidden;
  }
  .pac-trend-bar {
    height: 100%; border-radius: 100px;
    background: linear-gradient(90deg, var(--accent), #e05a5a);
  }
  .pac-trend-note {
    font-family: 'Inter', sans-serif;
    font-size: 13px; color: var(--muted);
    flex-shrink: 0; text-align: right; width: 120px;
  }
  @media (max-width: 560px) {
    .pac-trend-note { display: none; }
    .pac-trend-year { width: 56px; font-size: 15px; }
    .pac-trend-pct  { width: 52px; font-size: 22px; }
  }

  /* ─────────── VULNERABLE GROUPS — 3 DARK CARDS ─────────── */
  .pac-vuln-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 36px;
  }
  @media (max-width: 680px) { .pac-vuln-grid { grid-template-columns: 1fr; } }
  .pac-vuln-card {
    background: linear-gradient(135deg, #0f0202 0%, #2e0808 100%);
    border-radius: 8px; padding: 24px 20px;
    border: 1px solid rgba(255,154,154,0.15);
  }
  .pac-vuln-icon  { font-size: 32px; margin-bottom: 10px; display: block; }
  .pac-vuln-name {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 700;
    color: #ff9a9a; margin-bottom: 8px;
  }
  .pac-vuln-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13px; color: rgba(255,255,255,0.72);
    line-height: 1.65;
  }
  .pac-vuln-desc strong { color: #fbbf24; font-weight: 600; }

  /* ─────────── INTERSTATE DISPARITY — COMPARISON TABLE ─────────── */
  .pac-table-wrap {
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-radius: 6px; overflow: hidden;
    margin-bottom: 36px;
  }
  .pac-table-title {
    background: var(--accent2); color: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    padding: 14px 22px; letter-spacing: 0.04em;
  }
  .pac-table-row {
    display: grid;
    grid-template-columns: minmax(130px, 200px) 1fr;
    border-bottom: 1px solid var(--rule);
  }
  @media (max-width: 520px) { .pac-table-row { grid-template-columns: 1fr; } }
  .pac-table-row:last-child { border-bottom: none; }
  .pac-table-key {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    color: var(--accent2); padding: 14px 18px;
    background: var(--paper2);
    border-right: 1px solid var(--rule);
    display: flex; align-items: center;
  }
  @media (max-width: 520px) {
    .pac-table-key { border-right: none; border-bottom: 1px solid var(--rule); padding: 10px 16px; }
  }
  .pac-table-val {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2);
    padding: 14px 18px; line-height: 1.6;
  }
  @media (max-width: 520px) { .pac-table-val { padding: 10px 16px; } }
  .pac-table-val strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── GLOBAL POVERTY SPLIT ─────────── */
  .pac-global-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1.5px solid var(--rule);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 36px;
  }
  @media (max-width: 600px) { .pac-global-split { grid-template-columns: 1fr; } }
  .pac-gs-col { padding: 26px 24px; }
  .pac-gs-col.world { background: var(--slate-lt); border-right: 1.5px solid var(--rule); }
  .pac-gs-col.india { background: var(--accent-lt); }
  @media (max-width: 600px) {
    .pac-gs-col.world { border-right: none; border-bottom: 1.5px solid var(--rule); }
  }
  .pac-gs-badge {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 100px;
    display: inline-block; margin-bottom: 10px;
  }
  .pac-gs-col.world .pac-gs-badge { background: rgba(42,63,92,0.12); color: var(--slate); }
  .pac-gs-col.india .pac-gs-badge { background: rgba(176,26,26,0.12); color: var(--accent2); }
  .pac-gs-heading {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px; font-weight: 900;
    margin-bottom: 14px;
  }
  .pac-gs-col.world .pac-gs-heading { color: var(--slate); }
  .pac-gs-col.india .pac-gs-heading { color: var(--accent2); }
  .pac-gs-col ul { list-style: none; padding: 0; }
  .pac-gs-col ul li {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2);
    padding: 8px 0 8px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.07);
    position: relative; line-height: 1.55;
  }
  .pac-gs-col ul li:last-child { border-bottom: none; }
  .pac-gs-col ul li::before {
    content: ''; position: absolute; left: 0; top: 14px;
    width: 6px; height: 6px; border-radius: 50%;
  }
  .pac-gs-col.world ul li::before { background: var(--slate); }
  .pac-gs-col.india ul li::before { background: var(--accent); }
  .pac-gs-col ul li strong { font-weight: 600; }
  .pac-gs-col.world ul li strong { color: var(--slate); }
  .pac-gs-col.india ul li strong { color: var(--accent2); }

  /* ─────────── CAUSES — NUMBERED FACTOR LIST ─────────── */
  .pac-causes-list { margin-bottom: 36px; }
  .pac-cause-item {
    display: flex; align-items: flex-start; gap: 18px;
    padding: 18px 22px;
    border: 1.5px solid var(--rule);
    border-left: 5px solid var(--accent);
    border-radius: 4px;
    background: var(--white);
    margin-bottom: 12px;
  }
  .pac-cause-item:nth-child(2) { border-left-color: var(--amber); }
  .pac-cause-item:nth-child(3) { border-left-color: var(--teal); }
  .pac-cause-item:nth-child(4) { border-left-color: var(--slate); }
  .pac-cause-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 30px; font-weight: 900;
    color: var(--rule); line-height: 1;
    flex-shrink: 0; min-width: 36px;
  }
  .pac-cause-right { flex: 1; }
  .pac-cause-head {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 700;
    color: var(--accent); margin-bottom: 6px;
  }
  .pac-cause-item:nth-child(2) .pac-cause-head { color: var(--amber); }
  .pac-cause-item:nth-child(3) .pac-cause-head { color: var(--teal); }
  .pac-cause-item:nth-child(4) .pac-cause-head { color: var(--slate); }
  .pac-cause-desc {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2); line-height: 1.7;
  }
  .pac-cause-desc strong { font-weight: 600; color: var(--accent2); }
  .pac-cause-item:nth-child(2) .pac-cause-desc strong { color: var(--amber); }
  .pac-cause-item:nth-child(3) .pac-cause-desc strong { color: var(--teal); }
  .pac-cause-item:nth-child(4) .pac-cause-desc strong { color: var(--slate); }

  /* ─────────── GOVT STRATEGY — 2-CARD SPLIT ─────────── */
  .pac-strategy-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 36px;
  }
  @media (max-width: 600px) { .pac-strategy-split { grid-template-columns: 1fr; } }
  .pac-strategy-card {
    border-radius: 8px; padding: 26px 24px;
    border: 1.5px solid var(--rule);
  }
  .pac-strategy-card.growth { background: var(--teal-lt); border-color: #8ad5d5; }
  .pac-strategy-card.target { background: var(--amber-lt); border-color: #e8cc80; }
  .pac-strategy-badge {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 100px;
    display: inline-block; margin-bottom: 10px;
  }
  .pac-strategy-card.growth .pac-strategy-badge { background: rgba(10,110,110,0.12); color: var(--teal); }
  .pac-strategy-card.target .pac-strategy-badge { background: rgba(176,106,0,0.12); color: var(--amber); }
  .pac-strategy-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px; font-weight: 900;
    margin-bottom: 12px;
  }
  .pac-strategy-card.growth .pac-strategy-title { color: var(--teal); }
  .pac-strategy-card.target .pac-strategy-title { color: var(--amber); }
  .pac-strategy-desc {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2); line-height: 1.7;
  }
  .pac-strategy-desc strong { font-weight: 600; }
  .pac-strategy-card.growth .pac-strategy-desc strong { color: var(--teal); }
  .pac-strategy-card.target .pac-strategy-desc strong { color: var(--amber); }

  /* ─────────── SCHEMES — TIMELINE CARDS ─────────── */
  .pac-schemes { margin-bottom: 36px; }
  .pac-scheme-item {
    display: flex; gap: 0;
    margin-bottom: 0; position: relative;
  }
  .pac-scheme-left {
    flex-shrink: 0; width: 100px;
    display: flex; flex-direction: column; align-items: center;
    position: relative; z-index: 1;
    padding-top: 16px;
  }
  .pac-scheme-item:not(:last-child) .pac-scheme-left::after {
    content: '';
    position: absolute; top: 36px; left: 50%;
    transform: translateX(-50%);
    width: 2px; height: calc(100% + 0px);
    background: var(--rule); z-index: 0;
  }
  .pac-scheme-dot {
    width: 14px; height: 14px; border-radius: 50%;
    border: 2.5px solid var(--accent);
    background: var(--white); flex-shrink: 0;
    position: relative; z-index: 1;
    margin-bottom: 6px;
  }
  .pac-scheme-year {
    font-family: 'Montserrat', sans-serif;
    font-size: 12px; font-weight: 900;
    color: var(--accent); letter-spacing: 0.04em;
    text-align: center;
  }
  .pac-scheme-content {
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-radius: 6px;
    padding: 16px 20px;
    margin-bottom: 12px;
    flex: 1;
  }
  .pac-scheme-content:hover { border-color: var(--accent); }
  .pac-scheme-name {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 700;
    color: var(--accent2); margin-bottom: 5px;
  }
  .pac-scheme-abbr {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 8px;
  }
  .pac-scheme-desc {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: var(--ink2); line-height: 1.6;
  }
  .pac-scheme-desc strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── NREGA HIGHLIGHT ─────────── */
  .pac-nrega {
    background: linear-gradient(135deg, #0f0202 0%, #2e0808 100%);
    border-radius: 8px; padding: 32px 36px;
    margin-bottom: 36px; position: relative; overflow: hidden;
  }
  .pac-nrega::after {
    content: '🏗️';
    position: absolute; right: 24px; top: 50%;
    transform: translateY(-50%);
    font-size: 72px; opacity: 0.1;
  }
  .pac-nrega-badge {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #ff9a9a;
    background: rgba(255,154,154,0.12);
    padding: 5px 14px; border-radius: 100px;
    display: inline-block; margin-bottom: 16px;
  }
  .pac-nrega-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 22px; font-weight: 900;
    color: #fff; margin-bottom: 20px; letter-spacing: -0.01em;
    line-height: 1.2;
  }
  .pac-nrega ul { list-style: none; padding: 0; }
  .pac-nrega ul li {
    font-family: 'Inter', sans-serif;
    font-size: 15px; color: rgba(255,255,255,0.8);
    padding: 9px 0 9px 22px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    position: relative; line-height: 1.65;
  }
  .pac-nrega ul li:last-child { border-bottom: none; }
  .pac-nrega ul li::before {
    content: '✓'; position: absolute; left: 0; top: 9px;
    color: #ff9a9a; font-size: 12px; font-weight: 700;
  }
  .pac-nrega ul li strong { color: #ff9a9a; }

  /* ─────────── PULL QUOTE ─────────── */
  .pac-pull-quote {
    border-left: 4px solid var(--accent);
    padding: 20px 28px;
    background: var(--accent-lt);
    border-radius: 0 6px 6px 0;
    margin-bottom: 36px;
  }
  .pac-pull-quote p {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 600;
    color: var(--accent2); line-height: 1.7;
    margin-bottom: 8px; font-style: italic;
  }
  .pac-pull-quote cite {
    font-family: 'Inter', sans-serif;
    font-size: 13px; color: var(--muted); font-style: normal;
  }

  /* ─────────── FAQ ─────────── */
  .pac-faq-header {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 10px;
  }
  .pac-faq-kicker {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--accent);
    padding: 4px 14px;
    border: 1.5px solid var(--accent);
    border-radius: 100px;
    display: inline-block;
  }
  .pac-faq-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(24px, 4vw, 34px);
    font-weight: 900; color: var(--ink);
    letter-spacing: -0.025em; margin-bottom: 28px;
  }
  .pac-faq-item {
    border: 1.5px solid var(--rule);
    border-radius: 6px; margin-bottom: 10px;
    overflow: hidden; background: var(--white);
  }
  .pac-faq-item.open { border-color: var(--accent); }
  .pac-faq-q {
    width: 100%; background: none; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 22px; gap: 16px; text-align: left;
  }
  .pac-faq-q:hover { background: var(--paper2); }
  .pac-faq-q-text {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 600;
    color: var(--ink); line-height: 1.5;
  }
  .pac-faq-item.open .pac-faq-q-text { color: var(--accent2); }
  .pac-faq-icon {
    font-size: 20px; color: var(--accent);
    flex-shrink: 0; line-height: 1; user-select: none;
  }
  .pac-faq-ans {
    display: none;
    font-family: 'Inter', sans-serif;
    font-size: 15px; color: var(--ink2);
    line-height: 1.8; padding: 0 22px 20px;
  }
  .pac-faq-ans.visible { display: block; }
  .pac-faq-ans strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── RESPONSIVE ─────────── */
  @media (max-width: 600px) {
    .pac-body { padding: 48px 16px 72px; }
    .pac-hero-inner { padding: 0 20px; }
    .pac-intro-card { padding: 24px 20px; }
    .pac-intro-card::after { display: none; }
    .pac-scheme-left { width: 72px; }
    .pac-nrega { padding: 24px 22px; }
    .pac-nrega::after { display: none; }
  }
`;

const faqs = [
  {
    q: "What is poverty? How is it defined in India?",
    a: "Poverty is usually defined using income and consumption levels. In India, poverty is defined as the lack of common necessities like food, clothing, shelter, safe drinking water, medical care, and education — things that determine the quality of life. Poverty has both economic dimensions (low income, low consumption) and social dimensions (illiteracy, lack of health access, social exclusion). It is not just about money — it includes deprivation of basic human needs and social rights."
  },
  {
    q: "What are the social indicators of poverty?",
    a: "Beyond income, poverty is now measured through social indicators such as: illiteracy level, lack of access to health care, lack of job opportunities, lack of access to safe drinking water, poor sanitation, and social exclusion. Social exclusion refers to the process by which poor people are excluded from the community of better-off people — they are denied access to social networks, opportunities, and resources that others take for granted. These social dimensions make poverty a much broader challenge than just low income."
  },
  {
    q: "What is vulnerability in the context of poverty?",
    a: "Vulnerability describes the greater probability of certain communities or individuals becoming, or remaining, poor in the coming years. Vulnerable groups face higher risks of falling into poverty. The most vulnerable include: people from backward castes (SC/ST households), widows, physically handicapped individuals, and communities in disaster-prone regions. They are more exposed to risks from natural disasters, economic shocks, and social discrimination. Vulnerability is an important concept because it helps identify who needs protection before they become poor."
  },
  {
    q: "What is the poverty line? How is it determined in India?",
    a: "The poverty line is the minimum level of income or consumption required to satisfy basic needs. A person is considered poor if their income or consumption falls below this minimum level. The poverty line varies with time and place. For 2009–10, the poverty line was fixed at Rs. 673 per month for rural areas and Rs. 860 per month for urban areas. It is estimated periodically by conducting sample surveys by the National Sample Survey Organisation (NSSO). The World Bank defines poverty globally as earning less than $1.25 per day."
  },
  {
    q: "How has poverty changed over time in India?",
    a: "Poverty in India has declined significantly in percentage terms: it was around 55% in 1973, fell to 36% in 1993, and further declined to 26% in 2000. However, in absolute numbers, the figure remains very large — around 30 crore people still live in poverty. This means that while the proportion has improved, the sheer size of India's population means millions remain poor. This is an important distinction: percentage-wise improvement can mask the huge number of people still affected."
  },
  {
    q: "Which social groups are most vulnerable to poverty in India?",
    a: "The social groups most vulnerable to poverty in India are: Scheduled Caste (SC) and Scheduled Tribe (ST) households — they face structural discrimination, lack of land ownership, and limited access to education and jobs. Within poor families, inequality is even sharper: old people, women, and female children are often denied equal access to the family's available resources — making them the 'poorest of the poor.' Gender inequality inside households means women bear a disproportionate burden of poverty."
  },
  {
    q: "What are inter-state disparities in poverty in India?",
    a: "Poverty is not evenly distributed across India's states. In 20 states and union territories, the poverty ratio is below the national average. The poorest states are Orissa (47% poverty ratio) and Bihar (43% poverty ratio). The lowest incidence of poverty is found in Jammu & Kashmir with a poverty ratio of just 3.5%. These disparities reflect differences in agricultural productivity, industrial development, governance, infrastructure, and historical factors. Reducing inter-state inequality is one of India's major policy challenges."
  },
  {
    q: "What is the global poverty scenario? How does India compare?",
    a: "Globally, there has been a substantial decline in poverty. However, it is marked by great regional differences. Poverty has declined most significantly in China and South-East Asian countries due to rapid economic growth and targeted policies. The World Bank defines global poverty as earning less than $1.25 per day. The Millennium Development Goals (MDGs) of the United Nations called for reducing the proportion of people below the poverty line to half the 1990 level by 2015. India has made progress but still has one of the largest populations of poor in the world."
  },
  {
    q: "What are the main causes of poverty in India?",
    a: "The main causes of poverty in India are: (1) Historical — British colonial rule led to low economic development, deindustrialisation, and exploitation of resources. (2) Population growth — rapid growth, especially among the poor, divides limited resources among more people. (3) Limited employment — agriculture and industry have failed to generate enough jobs for the growing workforce. (4) Unequal distribution of resources — land reforms after independence were poorly implemented, leaving millions of rural poor without land. (5) Social factors — expenditure on social occasions like marriages and festivals, debt traps, and the joint family system reducing individual work incentive."
  },
  {
    q: "What is the government's two-pronged strategy for poverty reduction?",
    a: "The government's strategy to reduce poverty has been twofold: (1) Promotion of economic growth — the idea that a growing economy creates more jobs, raises incomes, and increases government revenue for social spending. Growth is necessary but not sufficient. (2) Targeted poverty alleviation programmes — specific schemes directed at the poor to directly improve their living conditions, provide employment, food security, and access to credit. Both are necessary together — growth without redistribution benefits mostly the better-off, while redistribution without growth is unsustainable."
  },
  {
    q: "Name and explain the major poverty alleviation programmes in India.",
    a: "Key poverty alleviation programmes include: (1) Prime Minister Rojgar Yojana (PMRY, 1993) — creates self-employment for educated unemployed youth in rural areas and small towns. (2) Rural Employment Generation Programme (REGP, 1995) — self-employment in rural areas. (3) Swarna Jayanti Gram Swarojgar Yojana (SGSY, 1999) — aims to bring poor families above the poverty line through self-help groups. (4) Pradhan Mantri Gramodaya Yojana (PMGY, 2000) — focuses on village-level development. (5) Antyodaya Anna Yojana (AAY) — subsidised food for the poorest of the poor and elderly. (6) National Food for Work Programme (NFWP, 2004) — food for those who work on public projects. (7) NREGA (2005) — 100 days of assured employment per year per rural household."
  },
  {
    q: "What is NREGA? Why is it significant?",
    a: "The National Rural Employment Guarantee Act (NREGA), passed in September 2005, is one of India's most significant anti-poverty measures. It provides 100 days of assured employment every year to every rural household in 200 districts (later expanded nationwide). Workers are paid a minimum wage for public works like building roads, wells, and ponds. Its significance: it provides a legal guarantee of employment (not just a scheme), creates durable community assets, reduces distress migration, and gives rural workers a direct cash income during lean agricultural seasons. It was later renamed MGNREGA (Mahatma Gandhi NREGA)."
  },
  {
    q: "What are the challenges ahead in fighting poverty in India?",
    a: "Despite significant progress, several challenges remain: (1) Wide regional disparities — poverty is still very high in some states while much lower in others. (2) Need to broaden the definition — from 'minimum subsistence level' to a 'reasonable level of living' that includes dignity and opportunity. (3) Health care for all — millions still lack access to quality healthcare. (4) Education and skill development — especially for girls and rural children. (5) Job security — providing stable, well-paying employment. (6) Gender equality — women and girls are disproportionately affected by poverty and must be empowered. These challenges require sustained political will, resources, and inclusive policies."
  },
];

export default function ChapterPovertyAsAChallenge() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>

      <div className="pac-root">

        {/* ══════════════════ HERO ══════════════════ */}
        <div className="pac-hero">
          <div className="pac-hero-grid" />
          <div className="pac-hero-tear" />
          <div className="pac-glow-a" />
          <div className="pac-glow-b" />
          <div className="pac-hero-bg-num">3</div>

          <div className="pac-hero-inner">
            <div className="pac-overline">Class 9 · Economics · Chapter 3</div>
            <h1 className="pac-hero-title">
              Poverty<br />
              <em>As A</em><br />
              <span className="em2">Challenge</span>
            </h1>
            <div className="pac-hero-bar">
              <div className="pac-hero-bar-item">
                <div className="pac-bar-label">Subject</div>
                <div className="pac-bar-value">Economics — Class 9</div>
              </div>
              <div className="pac-hero-bar-item">
                <div className="pac-bar-label">Chapter</div>
                <div className="pac-bar-value">3 — Poverty As A Challenge</div>
              </div>
              <div className="pac-hero-bar-item">
                <div className="pac-bar-label">Key Concepts</div>
                <div className="pac-bar-value">Poverty Line · Causes · Schemes · NREGA</div>
              </div>
              <div className="pac-hero-bar-item">
                <div className="pac-bar-label">Read Time</div>
                <div className="pac-bar-value">⏱️ 13 min read</div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════ BODY ══════════════════ */}
        <div className="pac-body">

          {/* ── LEAD INTRO CARD ── */}
          <div className="pac-intro-card">
            <p>
              Every day we pass people who are <strong>landless labourers, daily-wage workers, beggars, and child labourers</strong> — invisible to policy yet central to the story of India's development. About <strong>30 crore people</strong> still live in poverty in India.
            </p>
            <p>
              This chapter unpacks how poverty is defined and measured, who is most vulnerable, what causes it, and what India's government has done — through laws and schemes — to fight it. It also challenges us to think beyond numbers and see poverty as a <strong>human and social problem</strong>.
            </p>
          </div>

          {/* ══ SECTION 1: Understanding Poverty ══ */}
          <div className="pac-sec-head">
            <div className="pac-sec-num">1</div>
            <div className="pac-sec-title-wrap">
              <div className="pac-sec-kicker">Defining the Problem</div>
              <h2 className="pac-sec-title">Understanding <span>Poverty</span></h2>
            </div>
          </div>

          <p className="pac-body-text">
            Poverty is not just about money. It is the absence of the <strong>basic necessities and opportunities</strong> needed to live a decent life. In India, it means lacking food, clothing, shelter, safe drinking water, medical care, and education.
          </p>

          {/* Faces of poverty chips */}
          <div className="pac-faces-wrap">
            <div className="pac-faces-label">Who Are The Poor? — Faces of Poverty in India</div>
            {["Landless labourers","Jhuggi dwellers","Daily wage workers","Child labourers in dhabas","Rickshaw-pullers","Domestic servants","Cobblers","Beggars","Construction site workers","Migrant farm workers"].map(f => (
              <div className="pac-face-chip" key={f}>{f}</div>
            ))}
          </div>

          {/* Economic vs Social dimensions */}
          <div className="pac-dim-split">
            <div className="pac-dim-col eco">
              <div className="pac-dim-badge">Dimension 1</div>
              <div className="pac-dim-heading">Economic Poverty</div>
              <ul>
                <li>Measured by <strong>income &amp; consumption levels</strong></li>
                <li>Below minimum level needed for basic needs</li>
                <li>Lack of food, clothing, shelter</li>
                <li>No access to safe <strong>drinking water</strong></li>
                <li>Cannot afford medical care</li>
                <li>Children unable to attend school</li>
              </ul>
            </div>
            <div className="pac-dim-col soc">
              <div className="pac-dim-badge">Dimension 2</div>
              <div className="pac-dim-heading">Social Poverty</div>
              <ul>
                <li>Illiteracy — no education access</li>
                <li>Lack of <strong>job opportunities</strong></li>
                <li>No access to health care</li>
                <li>Poor sanitation conditions</li>
                <li><strong>Social exclusion</strong> from better-off community</li>
                <li>Denied participation in social life</li>
              </ul>
            </div>
          </div>

          <div className="pac-highlight">
            <div className="pac-highlight-label">Key Concept — Social Exclusion</div>
            <div className="pac-highlight-text">
              <strong>Social exclusion</strong> means the poor are generally excluded from the community of better-off people. They are denied access to social networks, job opportunities, credit, and basic services — creating a self-reinforcing cycle of poverty that is hard to escape.
            </div>
          </div>

          {/* Vulnerability term box */}
          <div className="pac-dim-split">
            <div className="pac-dim-col eco">
              <div className="pac-dim-badge">Concept</div>
              <div className="pac-dim-heading">Vulnerability</div>
              <ul>
                <li>Greater probability of <strong>becoming or staying poor</strong></li>
                <li>Describes risk level of certain groups</li>
                <li>Higher risk during <strong>natural disasters</strong></li>
                <li>Cannot cope with economic shocks</li>
                <li>No savings or safety net</li>
              </ul>
            </div>
            <div className="pac-dim-col soc">
              <div className="pac-dim-badge">Who Is Vulnerable</div>
              <div className="pac-dim-heading">Most At Risk</div>
              <ul>
                <li>People from <strong>backward castes</strong> (SC/ST)</li>
                <li>Widows without family support</li>
                <li><strong>Physically handicapped</strong> individuals</li>
                <li>Women and female children in poor families</li>
                <li>Communities in disaster-prone regions</li>
              </ul>
            </div>
          </div>

          {/* ══ SECTION 2: Poverty Line ══ */}
          <div className="pac-divider"><div className="pac-divider-mark" /></div>

          <div className="pac-sec-head">
            <div className="pac-sec-num">2</div>
            <div className="pac-sec-title-wrap">
              <div className="pac-sec-kicker">Measuring Poverty</div>
              <h2 className="pac-sec-title">The <span>Poverty Line</span></h2>
            </div>
          </div>

          <p className="pac-body-text">
            The poverty line is a <strong>minimum threshold of income or consumption</strong>. Anyone below it is considered poor. It is not a fixed absolute — it varies with time and place, reflecting changing costs of living.
          </p>

          <div className="pac-pl-grid">
            <div className="pac-pl-card">
              <span className="pac-pl-icon">🏘️</span>
              <div className="pac-pl-num">₹673</div>
              <div className="pac-pl-label">Rural Poverty Line</div>
              <div className="pac-pl-sub">Per person per month (2009–10)</div>
            </div>
            <div className="pac-pl-card amber-top">
              <span className="pac-pl-icon">🏙️</span>
              <div className="pac-pl-num">₹860</div>
              <div className="pac-pl-label">Urban Poverty Line</div>
              <div className="pac-pl-sub">Per person per month (2009–10)</div>
            </div>
            <div className="pac-pl-card teal-top">
              <span className="pac-pl-icon">🌍</span>
              <div className="pac-pl-num">$1.25</div>
              <div className="pac-pl-label">World Bank Definition</div>
              <div className="pac-pl-sub">Per person per day (global threshold)</div>
            </div>
          </div>

          <p className="pac-body-text">
            The poverty line is estimated periodically by conducting sample surveys by the <strong>National Sample Survey Organisation (NSSO)</strong>. It is based on a minimum calorie intake requirement — 2400 calories/day in rural areas and 2100 calories/day in urban areas — plus spending on non-food items.
          </p>

          {/* ══ SECTION 3: Estimates of Poverty ══ */}
          <div className="pac-divider"><div className="pac-divider-mark" /></div>

          <div className="pac-sec-head">
            <div className="pac-sec-num">3</div>
            <div className="pac-sec-title-wrap">
              <div className="pac-sec-kicker">Data Over Time</div>
              <h2 className="pac-sec-title">Estimates &amp; <span>Trends of Poverty</span></h2>
            </div>
          </div>

          <p className="pac-body-text">
            India has made significant progress in reducing the <strong>percentage</strong> of population below the poverty line. However, in absolute numbers, poverty remains massive given India's population size.
          </p>

          {/* Trend bar chart */}
          <div className="pac-trend">
            <div className="pac-trend-head">📉 Poverty Incidence in India — Decline Over Decades</div>
            {[
              { year:"1973", pct:"55%", bar:100, note:"At its peak" },
              { year:"1993", pct:"36%", bar:65,  note:"Declined 19 pts" },
              { year:"2000", pct:"26%", bar:47,  note:"Further decline" },
            ].map(r => (
              <div className="pac-trend-row" key={r.year}>
                <div className="pac-trend-year">{r.year}</div>
                <div className="pac-trend-pct" style={{color: r.year==="1973"?"#b01a1a": r.year==="1993"?"#b06a00":"#0a6e6e"}}>{r.pct}</div>
                <div className="pac-trend-bar-wrap">
                  <div className="pac-trend-bar" style={{width:`${r.bar}%`, background: r.year==="1973"?"linear-gradient(90deg,#b01a1a,#e05a5a)": r.year==="1993"?"linear-gradient(90deg,#b06a00,#e09a00)":"linear-gradient(90deg,#0a6e6e,#1aa8a8)"}} />
                </div>
                <div className="pac-trend-note">{r.note}</div>
              </div>
            ))}
          </div>

          <div className="pac-highlight">
            <div className="pac-highlight-label">Important Distinction</div>
            <div className="pac-highlight-text">
              Poverty in India has <strong>declined in percentage terms</strong> — from 55% to 26%. But in absolute numbers it is still <strong>huge — about 30 crore people</strong>. A 1% drop in a country of 140 crore is still 1.4 crore people. This is why poverty remains India's most urgent challenge.
            </div>
          </div>

          {/* Vulnerable groups */}
          <div className="pac-vuln-grid">
            <div className="pac-vuln-card">
              <span className="pac-vuln-icon">🏡</span>
              <div className="pac-vuln-name">SC/ST Households</div>
              <div className="pac-vuln-desc">Most vulnerable social groups. Face <strong>structural discrimination</strong>, landlessness, and limited access to education and formal employment.</div>
            </div>
            <div className="pac-vuln-card">
              <span className="pac-vuln-icon">👩</span>
              <div className="pac-vuln-name">Women &amp; Female Children</div>
              <div className="pac-vuln-desc">In poor families, old people, women, and female children are denied <strong>equal access to the family's resources</strong>. They are the <strong>poorest of the poor.</strong></div>
            </div>
            <div className="pac-vuln-card">
              <span className="pac-vuln-icon">🗺️</span>
              <div className="pac-vuln-name">Orissa &amp; Bihar</div>
              <div className="pac-vuln-desc">Poorest states — Orissa at <strong>47%</strong> and Bihar at <strong>43%</strong> poverty ratio. Lowest is J&amp;K at <strong>3.5%</strong>. Sharp inter-state disparity.</div>
            </div>
          </div>

          {/* Interstate table */}
          <div className="pac-table-wrap">
            <div className="pac-table-title">📊 Inter-State Poverty Disparities</div>
            {[
              ["Orissa","Poverty ratio of 47% — one of the poorest states in India"],
              ["Bihar","Poverty ratio of 43% — second poorest state"],
              ["National Average","Poverty ratio around 26% (as of 2000)"],
              ["20 States/UTs","Have poverty ratio below the national average"],
              ["J&K (Lowest)","Poverty ratio of just 3.5% — lowest in the country"],
            ].map(([k,v]) => (
              <div className="pac-table-row" key={k}>
                <div className="pac-table-key">{k}</div>
                <div className="pac-table-val">{v}</div>
              </div>
            ))}
          </div>

          {/* ══ SECTION 4: Global Poverty ══ */}
          <div className="pac-divider"><div className="pac-divider-mark" /></div>

          <div className="pac-sec-head">
            <div className="pac-sec-num">4</div>
            <div className="pac-sec-title-wrap">
              <div className="pac-sec-kicker">The Bigger Picture</div>
              <h2 className="pac-sec-title">Global <span>Poverty Scenario</span></h2>
            </div>
          </div>

          <div className="pac-global-split">
            <div className="pac-gs-col world">
              <div className="pac-gs-badge">Global</div>
              <div className="pac-gs-heading">World Poverty</div>
              <ul>
                <li><strong>Substantial decline</strong> in global poverty overall</li>
                <li>But marked by <strong>great regional differences</strong></li>
                <li>China &amp; South-East Asia: <strong>biggest declines</strong></li>
                <li>World Bank threshold: <strong>$1.25/day</strong></li>
                <li>UN MDG: halve 1990 poverty levels by 2015</li>
              </ul>
            </div>
            <div className="pac-gs-col india">
              <div className="pac-gs-badge">India</div>
              <div className="pac-gs-heading">India's Position</div>
              <ul>
                <li>~30 crore people still below poverty line</li>
                <li>One of the <strong>largest poor populations</strong> globally</li>
                <li>Progress slower than China &amp; East Asia</li>
                <li>Percentage has fallen but <strong>absolute numbers huge</strong></li>
                <li>Regional disparities make problem complex</li>
              </ul>
            </div>
          </div>

          {/* ══ SECTION 5: Causes of Poverty ══ */}
          <div className="pac-divider"><div className="pac-divider-mark" /></div>

          <div className="pac-sec-head">
            <div className="pac-sec-num">5</div>
            <div className="pac-sec-title-wrap">
              <div className="pac-sec-kicker">Root Analysis</div>
              <h2 className="pac-sec-title">Causes of <span>Poverty in India</span></h2>
            </div>
          </div>

          <p className="pac-body-text">
            Poverty in India is the result of multiple overlapping historical, economic, and social forces. No single cause explains it fully — understanding each is key to designing effective solutions.
          </p>

          <div className="pac-causes-list">
            <div className="pac-cause-item">
              <div className="pac-cause-num">01</div>
              <div className="pac-cause-right">
                <div className="pac-cause-head">Colonial Legacy</div>
                <div className="pac-cause-desc">
                  A major historical reason is the <strong>low level of economic development under British colonial rule</strong>. British policies deindustrialised India, extracted wealth, destroyed traditional crafts, and left behind a poorly developed economy with low productivity and widespread rural poverty.
                </div>
              </div>
            </div>
            <div className="pac-cause-item">
              <div className="pac-cause-num">02</div>
              <div className="pac-cause-right">
                <div className="pac-cause-head">Rapid Population Growth</div>
                <div className="pac-cause-desc">
                  <strong>Rapid growth of population</strong>, particularly among the poor, is a major cause. More people means the same resources must be divided further. Agricultural land, jobs, and government services are stretched thin, reducing per-capita income and welfare.
                </div>
              </div>
            </div>
            <div className="pac-cause-item">
              <div className="pac-cause-num">03</div>
              <div className="pac-cause-right">
                <div className="pac-cause-head">Limited Employment Generation</div>
                <div className="pac-cause-desc">
                  Agriculture has <strong>failed to generate sufficient employment</strong> for farm labourers. Similarly, industries could not absorb all job seekers. This creates large pools of unemployed and underemployed workers, especially in rural areas, keeping wages low and poverty high.
                </div>
              </div>
            </div>
            <div className="pac-cause-item">
              <div className="pac-cause-num">04</div>
              <div className="pac-cause-right">
                <div className="pac-cause-head">Unequal Distribution of Resources &amp; Social Factors</div>
                <div className="pac-cause-desc">
                  <strong>Unequal distribution of land</strong> keeps millions of rural poor landless. Land reforms post-Independence were poorly implemented. Social causes include heavy spending on festivals and weddings, leading to debt traps. The <strong>joint family system</strong> has also discouraged individual initiative and hard work.
                </div>
              </div>
            </div>
          </div>

          {/* ══ SECTION 6: Government Steps ══ */}
          <div className="pac-divider"><div className="pac-divider-mark" /></div>

          <div className="pac-sec-head">
            <div className="pac-sec-num">6</div>
            <div className="pac-sec-title-wrap">
              <div className="pac-sec-kicker">Policy Response</div>
              <h2 className="pac-sec-title">Government Steps for <span>Poverty Alleviation</span></h2>
            </div>
          </div>

          <p className="pac-body-text">
            India's government has adopted a <strong>two-pronged strategy</strong> to reduce poverty. Both are necessary — growth alone is not enough, and targeted programmes without a growing economy cannot be sustained.
          </p>

          <div className="pac-strategy-split">
            <div className="pac-strategy-card growth">
              <div className="pac-strategy-badge">Prong 1</div>
              <div className="pac-strategy-title">Economic Growth</div>
              <div className="pac-strategy-desc">
                Promoting overall <strong>economic growth</strong> creates more jobs, raises national income, and generates government revenue that can be spent on social welfare. A growing economy lifts more people out of poverty indirectly through rising employment and wages.
              </div>
            </div>
            <div className="pac-strategy-card target">
              <div className="pac-strategy-badge">Prong 2</div>
              <div className="pac-strategy-title">Targeted Programmes</div>
              <div className="pac-strategy-desc">
                Specific <strong>anti-poverty schemes</strong> directed at the poor — providing employment, food, credit, and skill development. These directly improve the living conditions of the poorest who may not benefit from general economic growth quickly enough.
              </div>
            </div>
          </div>

          {/* Schemes timeline */}
          <div className="pac-schemes">
            {[
              { year:"1993", name:"Prime Minister Rojgar Yojana", abbr:"PMRY", desc:"Creates self-employment opportunities for educated unemployed youth in rural areas and small towns." },
              { year:"1995", name:"Rural Employment Generation Programme", abbr:"REGP", desc:"Launched to create self-employment opportunities in rural areas through setting up village industries." },
              { year:"1999", name:"Swarna Jayanti Gram Swarojgar Yojana", abbr:"SGSY", desc:"Aims at bringing assisted poor families above the poverty line through self-help groups and credit support." },
              { year:"2000", name:"Pradhan Mantri Gramodaya Yojana", abbr:"PMGY", desc:"Focuses on village-level development — covering primary health, primary education, rural shelter, nutrition, and drinking water." },
              { year:"2001", name:"Antyodaya Anna Yojana", abbr:"AAY", desc:"Provides highly subsidised food grains to the poorest of the poor families and elderly persons." },
              { year:"2004", name:"National Food for Work Programme", abbr:"NFWP", desc:"Provides food to people doing public work projects in the most food-insecure districts of India." },
            ].map(s => (
              <div className="pac-scheme-item" key={s.abbr}>
                <div className="pac-scheme-left">
                  <div className="pac-scheme-dot" />
                  <div className="pac-scheme-year">{s.year}</div>
                </div>
                <div className="pac-scheme-content">
                  <div className="pac-scheme-abbr">{s.abbr}</div>
                  <div className="pac-scheme-name">{s.name}</div>
                  <div className="pac-scheme-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* NREGA highlight */}
          <div className="pac-nrega">
            <div className="pac-nrega-badge">Landmark Legislation — 2005</div>
            <div className="pac-nrega-title">National Rural Employment Guarantee Act (NREGA)</div>
            <ul>
              <li>Passed in <strong>September 2005</strong> — a legal guarantee, not just a scheme</li>
              <li>Provides <strong>100 days of assured employment</strong> every year</li>
              <li>Covers every rural household in <strong>200 districts</strong> (later expanded)</li>
              <li>Workers paid at <strong>minimum wage rates</strong></li>
              <li>Creates durable community assets — roads, wells, ponds</li>
              <li>Reduces <strong>distress migration</strong> from rural to urban areas</li>
              <li>Later renamed <strong>MGNREGA</strong> — Mahatma Gandhi NREGA</li>
            </ul>
          </div>

          {/* ══ SECTION 7: Challenges Ahead ══ */}
          <div className="pac-divider"><div className="pac-divider-mark" /></div>

          <div className="pac-sec-head">
            <div className="pac-sec-num">7</div>
            <div className="pac-sec-title-wrap">
              <div className="pac-sec-kicker">The Road Ahead</div>
              <h2 className="pac-sec-title">Challenges <span>Still Ahead</span></h2>
            </div>
          </div>

          <p className="pac-body-text">
            Though poverty has declined, <strong>poverty reduction remains India's most compelling challenge</strong>. The next phase requires both broadening the goal and deepening the effort.
          </p>

          <div className="pac-table-wrap">
            <div className="pac-table-title">🎯 Key Challenges Ahead</div>
            {[
              ["Regional Disparities","Wide gap between states — must address why some states remain far poorer than others"],
              ["Broaden Definition","Shift from 'minimum subsistence' to a 'reasonable level of living' with dignity"],
              ["Health Care for All","Millions lack access to quality healthcare — a fundamental right, not a privilege"],
              ["Education &amp; Skills","Especially for girls and rural children — education is the surest route out of poverty"],
              ["Job Security","Providing stable, well-paying employment — not just 100 days of NREGA work"],
              ["Gender Equality","Women are disproportionately poor — empowering women is central to poverty reduction"],
            ].map(([k,v]) => (
              <div className="pac-table-row" key={k}>
                <div className="pac-table-key" dangerouslySetInnerHTML={{__html: k}} />
                <div className="pac-table-val">{v}</div>
              </div>
            ))}
          </div>

          <div className="pac-pull-quote">
            <p>"We must broaden the definition of poverty from a minimum subsistence level of living to a reasonable level of living."</p>
            <cite>— NCERT Economics, Class 9, Chapter 3</cite>
          </div>

          {/* ══ FAQ SECTION ══ */}
          <div className="pac-divider"><div className="pac-divider-mark" /></div>

          <div className="pac-faq-header">
            <span className="pac-faq-kicker">Exam Preparation</span>
          </div>
          <h2 className="pac-faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, i) => (
            <div className={`pac-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="pac-faq-q" onClick={() => toggle(i)}>
                <span className="pac-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="pac-faq-icon">{openIndex === i ? "▴" : "▾"}</span>
              </button>
              <div className={`pac-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
