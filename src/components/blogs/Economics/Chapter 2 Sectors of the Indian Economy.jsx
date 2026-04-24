import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #120a1f;
    --ink2:       #241535;
    --muted:      #6b5a82;
    --paper:      #f7f4fc;
    --paper2:     #ede8f7;
    --accent:     #7c3aed;
    --accent2:    #5b21b6;
    --accent-lt:  #ede9fe;
    --emerald:    #059669;
    --emerald-lt: #d1fae5;
    --amber:      #d97706;
    --amber-lt:   #fef3c7;
    --rose:       #e11d48;
    --rose-lt:    #ffe4e6;
    --rule:       #d8cff0;
    --white:      #ffffff;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .sie-root {
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
  }

  /* ─── HERO ─── */
  .sie-hero {
    background: linear-gradient(135deg, #0a0414 0%, #160830 50%, #1e0a42 100%);
    min-height: 88vh;
    display: flex;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
    padding: 0 0 64px;
  }
  .sie-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 6px;
    background: linear-gradient(90deg, #7c3aed 0%, #059669 50%, #d97706 100%);
  }
  .sie-hero-bg-num {
    position: absolute;
    bottom: -60px; right: -30px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(220px, 36vw, 500px);
    font-weight: 900;
    line-height: 1;
    color: rgba(255,255,255,0.025);
    letter-spacing: -0.04em;
    user-select: none;
    pointer-events: none;
  }
  /* Hexagon grid watermark */
  .sie-hero-pattern {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(124,58,237,0.08) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }
  /* Glow blobs */
  .sie-glow-a {
    position: absolute;
    top: 15%; right: 6%;
    width: 320px; height: 320px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%);
    pointer-events: none;
  }
  .sie-glow-b {
    position: absolute;
    bottom: 10%; left: 5%;
    width: 240px; height: 240px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(5,150,105,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  .sie-hero-inner {
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding: 0 32px;
    position: relative;
    z-index: 1;
  }
  .sie-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #c4b5fd;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .sie-overline::before, .sie-overline::after {
    content: '';
    flex: 0 0 40px; height: 1px;
    background: #c4b5fd;
  }
  .sie-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(36px, 7vw, 80px);
    font-weight: 900;
    color: #fff;
    line-height: 0.95;
    letter-spacing: -0.03em;
    margin-bottom: 32px;
  }
  .sie-hero-title em   { font-style: normal; color: #c4b5fd; }
  .sie-hero-title .em2 { color: #6ee7b7; }
  .sie-hero-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 24px;
    margin-top: 8px;
  }
  .sie-hero-bar-item {
    flex: 1 1 180px;
    padding: 0 24px 0 0;
    border-right: 1px solid rgba(255,255,255,0.1);
    margin-right: 24px;
  }
  .sie-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .sie-bar-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.35); margin-bottom: 5px;
  }
  .sie-bar-value {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 600;
    color: rgba(255,255,255,0.75);
  }

  /* ─── BODY ─── */
  .sie-body {
    max-width: 860px;
    margin: 0 auto;
    padding: 72px 32px 96px;
  }

  /* ─── DARK INTRO CARD ─── */
  .sie-intro-card {
    background: linear-gradient(135deg, #0a0414 0%, #1e0a42 100%);
    border-left: 5px solid #7c3aed;
    border-radius: 4px;
    padding: 36px 40px;
    margin-bottom: 64px;
    position: relative;
    overflow: hidden;
  }
  .sie-intro-card::after {
    content: '⚙️';
    position: absolute;
    right: 28px; top: 50%;
    transform: translateY(-50%);
    font-size: 64px;
    opacity: 0.1;
  }
  .sie-intro-card p {
    font-family: 'Poppins', sans-serif;
    font-size: 18px; font-weight: 500;
    color: rgba(255,255,255,0.88);
    line-height: 1.78;
    margin: 0 0 14px;
  }
  .sie-intro-card p:last-child { margin: 0; }
  .sie-intro-card strong { color: #c4b5fd; }

  /* ─── SECTION HEADER ─── */
  .sie-sec-head {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 28px;
    border-bottom: 2px solid var(--rule);
    padding-bottom: 18px;
  }
  .sie-sec-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 56px; font-weight: 900;
    color: var(--rule);
    line-height: 1; flex-shrink: 0;
  }
  .sie-sec-title-wrap { padding-top: 8px; }
  .sie-sec-kicker {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 6px;
  }
  .sie-sec-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(22px, 3.5vw, 30px);
    font-weight: 800;
    color: var(--ink);
    line-height: 1.15;
    letter-spacing: -0.02em;
  }
  .sie-sec-title span { color: var(--accent); }

  /* ─── BODY TEXT ─── */
  .sie-body-text {
    font-family: 'Inter', sans-serif;
    font-size: 16px; font-weight: 400;
    color: var(--ink2);
    line-height: 1.85;
    margin-bottom: 28px;
  }
  .sie-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ─── DIVIDER ─── */
  .sie-divider {
    margin: 56px 0;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .sie-divider::before, .sie-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--rule);
  }
  .sie-divider-mark {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
  }

  /* ─── THREE SECTORS — BIG FEATURE CARDS ─── */
  .sie-sectors-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 36px;
  }
  @media (max-width: 680px) { .sie-sectors-grid { grid-template-columns: 1fr; } }

  .sie-sector-card {
    border-radius: 8px;
    overflow: hidden;
    border: 1.5px solid var(--rule);
    background: var(--white);
  }
  .sie-sector-header {
    padding: 20px 22px 16px;
    position: relative;
  }
  .sie-sector-card.primary .sie-sector-header   { background: linear-gradient(135deg, #065f46, #047857); }
  .sie-sector-card.secondary .sie-sector-header { background: linear-gradient(135deg, #1e40af, #1d4ed8); }
  .sie-sector-card.tertiary .sie-sector-header  { background: linear-gradient(135deg, #6d28d9, #7c3aed); }

  .sie-sector-icon {
    font-size: 32px;
    display: block;
    margin-bottom: 10px;
  }
  .sie-sector-tag {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.6);
    margin-bottom: 4px;
  }
  .sie-sector-name {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px; font-weight: 900;
    color: #fff; letter-spacing: -0.01em;
  }
  .sie-sector-alias {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 600;
    color: rgba(255,255,255,0.55);
    margin-top: 2px;
  }
  .sie-sector-body {
    padding: 20px 22px 22px;
  }
  .sie-sector-body ul {
    list-style: none; padding: 0;
  }
  .sie-sector-body ul li {
    font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 400;
    color: var(--ink2);
    padding: 7px 0 7px 18px;
    border-bottom: 1px solid var(--rule);
    position: relative;
    line-height: 1.55;
  }
  .sie-sector-body ul li:last-child { border-bottom: none; }
  .sie-sector-body ul li::before {
    content: '';
    position: absolute;
    left: 0; top: 50%;
    transform: translateY(-50%);
    width: 6px; height: 6px;
    border-radius: 50%;
  }
  .sie-sector-card.primary   .sie-sector-body ul li::before { background: var(--emerald); }
  .sie-sector-card.secondary .sie-sector-body ul li::before { background: #3b82f6; }
  .sie-sector-card.tertiary  .sie-sector-body ul li::before { background: var(--accent); }
  .sie-sector-body ul li strong { color: var(--accent2); font-weight: 600; }

  /* ─── EXAMPLES BAND ─── */
  .sie-examples-band {
    background: var(--paper2);
    border: 1.5px solid var(--rule);
    border-radius: 8px;
    padding: 24px 28px;
    margin-bottom: 36px;
  }
  .sie-examples-band-title {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 16px;
  }
  .sie-examples-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  @media (max-width: 600px) { .sie-examples-row { grid-template-columns: 1fr; } }
  .sie-ex-col { }
  .sie-ex-label {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    margin-bottom: 8px;
    padding: 4px 12px;
    border-radius: 100px;
    display: inline-block;
  }
  .sie-ex-label.green  { background: var(--emerald-lt); color: var(--emerald); }
  .sie-ex-label.blue   { background: #dbeafe; color: #1d4ed8; }
  .sie-ex-label.purple { background: var(--accent-lt); color: var(--accent2); }
  .sie-ex-items {
    font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 400;
    color: var(--ink2);
    line-height: 1.8;
  }

  /* ─── GDP BOX ─── */
  .sie-gdp-box {
    background: linear-gradient(135deg, #0a0414 0%, #1e0a42 100%);
    border-radius: 8px;
    padding: 32px 36px;
    margin-bottom: 36px;
    display: flex;
    align-items: center;
    gap: 32px;
    flex-wrap: wrap;
  }
  .sie-gdp-acronym {
    font-family: 'Montserrat', sans-serif;
    font-size: 52px; font-weight: 900;
    color: #c4b5fd;
    letter-spacing: -0.02em;
    flex-shrink: 0;
    line-height: 1;
  }
  .sie-gdp-divider {
    width: 2px; height: 80px;
    background: rgba(255,255,255,0.12);
    flex-shrink: 0;
  }
  @media (max-width: 540px) { .sie-gdp-divider { display: none; } }
  .sie-gdp-content { flex: 1; min-width: 200px; }
  .sie-gdp-heading {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; font-weight: 700;
    color: #fff; margin-bottom: 10px;
  }
  .sie-gdp-text {
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 400;
    color: rgba(255,255,255,0.72);
    line-height: 1.75;
  }
  .sie-gdp-text strong { color: #c4b5fd; }

  /* ─── STAT BOXES ─── */
  .sie-stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 36px;
  }
  @media (max-width: 620px) { .sie-stats-row { grid-template-columns: 1fr; } }
  .sie-stat-box {
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-top: 4px solid var(--accent);
    border-radius: 4px;
    padding: 24px 20px;
    text-align: center;
  }
  .sie-stat-box.green { border-top-color: var(--emerald); }
  .sie-stat-box.amber { border-top-color: var(--amber); }
  .sie-stat-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 32px; font-weight: 900;
    color: var(--accent); line-height: 1; margin-bottom: 6px;
  }
  .sie-stat-box.green .sie-stat-num { color: var(--emerald); }
  .sie-stat-box.amber .sie-stat-num { color: var(--amber); }
  .sie-stat-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 600;
    color: var(--muted); line-height: 1.4;
  }
  .sie-stat-sub {
    font-family: 'Inter', sans-serif;
    font-size: 11px; font-weight: 400;
    color: var(--muted); margin-top: 4px;
  }

  /* ─── CARD GRID (2-col) ─── */
  .sie-card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 36px;
  }
  @media (max-width: 620px) { .sie-card-grid { grid-template-columns: 1fr; } }

  .sie-card {
    border-radius: 6px;
    padding: 28px 28px 24px;
    border: 1.5px solid var(--rule);
    background: var(--white);
  }
  .sie-card.dark {
    background: linear-gradient(135deg, #0a0414, #1e0a42);
    border-color: transparent;
  }
  .sie-card.green { background: var(--emerald-lt); border-color: #6ee7b7; }
  .sie-card.amber { background: var(--amber-lt); border-color: #fcd34d; }
  .sie-card.rose  { background: var(--rose-lt); border-color: #fca5a5; }

  .sie-card-tag {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 10px;
  }
  .sie-card.dark .sie-card-tag  { color: #c4b5fd; }
  .sie-card.green .sie-card-tag { color: var(--emerald); }
  .sie-card.amber .sie-card-tag { color: var(--amber); }
  .sie-card.rose  .sie-card-tag { color: var(--rose); }

  .sie-card-title {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 700;
    color: var(--ink);
    margin-bottom: 14px; line-height: 1.3;
  }
  .sie-card.dark .sie-card-title  { color: #fff; }
  .sie-card.green .sie-card-title { color: var(--emerald); }
  .sie-card.amber .sie-card-title { color: var(--amber); }
  .sie-card.rose  .sie-card-title { color: var(--rose); }

  .sie-card ul { list-style: none; padding: 0; }
  .sie-card ul li {
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 400;
    color: var(--ink2);
    padding: 7px 0 7px 18px;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    position: relative;
    line-height: 1.6;
  }
  .sie-card.dark  ul li { color: rgba(255,255,255,0.78); border-bottom-color: rgba(255,255,255,0.07); }
  .sie-card.green ul li { color: #064e3b; border-bottom-color: rgba(5,150,105,0.15); }
  .sie-card.amber ul li { color: #78350f; border-bottom-color: rgba(217,119,6,0.15); }
  .sie-card.rose  ul li { color: #881337; border-bottom-color: rgba(225,29,72,0.15); }
  .sie-card ul li:last-child { border-bottom: none; }
  .sie-card ul li::before {
    content: '';
    position: absolute; left: 0; top: 50%;
    transform: translateY(-50%);
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent);
  }
  .sie-card.dark  ul li::before { background: #c4b5fd; }
  .sie-card.green ul li::before { background: var(--emerald); }
  .sie-card.amber ul li::before { background: var(--amber); }
  .sie-card.rose  ul li::before { background: var(--rose); }
  .sie-card ul li strong { color: var(--accent2); font-weight: 600; }
  .sie-card.dark  ul li strong { color: #c4b5fd; }
  .sie-card.green ul li strong { color: #065f46; }
  .sie-card.amber ul li strong { color: #92400e; }
  .sie-card.rose  ul li strong { color: #9f1239; }

  /* ─── TABLE ─── */
  .sie-table-wrap {
    border: 1.5px solid var(--rule);
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 36px;
  }
  .sie-table-title {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    letter-spacing: 0.08em;
    background: var(--ink);
    color: #fff;
    padding: 14px 24px;
    text-transform: uppercase;
  }
  .sie-table-row {
    display: flex;
    border-bottom: 1px solid var(--rule);
  }
  .sie-table-row:last-child { border-bottom: none; }
  .sie-table-key {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    color: var(--accent2);
    width: 220px; flex-shrink: 0;
    padding: 14px 20px;
    background: var(--paper2);
    border-right: 1px solid var(--rule);
    display: flex; align-items: center;
  }
  .sie-table-val {
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 400;
    color: var(--ink2);
    padding: 14px 20px;
    line-height: 1.65; flex: 1;
  }
  .sie-table-val strong { color: var(--accent2); font-weight: 600; }

  /* ─── PULL QUOTE ─── */
  .sie-pull-quote {
    border-left: 5px solid var(--accent);
    background: var(--accent-lt);
    padding: 28px 36px;
    margin: 36px 0;
    border-radius: 0 4px 4px 0;
  }
  .sie-pull-quote p {
    font-family: 'Poppins', sans-serif;
    font-size: 18px; font-weight: 600;
    color: var(--accent2);
    line-height: 1.7;
    font-style: italic;
    margin: 0 0 12px;
  }
  .sie-pull-quote cite {
    font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 500;
    color: var(--muted); font-style: normal;
  }

  /* ─── MGNREGA HIGHLIGHT BOX ─── */
  .sie-mgnrega {
    background: linear-gradient(135deg, #064e3b 0%, #065f46 100%);
    border-radius: 8px;
    padding: 32px 36px;
    margin-bottom: 36px;
    position: relative;
    overflow: hidden;
  }
  .sie-mgnrega::after {
    content: '🏛️';
    position: absolute;
    right: 24px; top: 50%;
    transform: translateY(-50%);
    font-size: 72px; opacity: 0.12;
  }
  .sie-mgnrega-badge {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #6ee7b7;
    background: rgba(110,231,183,0.15);
    padding: 5px 14px;
    border-radius: 100px;
    display: inline-block;
    margin-bottom: 16px;
  }
  .sie-mgnrega-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 22px; font-weight: 900;
    color: #fff; margin-bottom: 20px;
    letter-spacing: -0.01em;
    line-height: 1.2;
  }
  .sie-mgnrega ul { list-style: none; padding: 0; }
  .sie-mgnrega ul li {
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 400;
    color: rgba(255,255,255,0.8);
    padding: 8px 0 8px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    position: relative; line-height: 1.65;
  }
  .sie-mgnrega ul li:last-child { border-bottom: none; }
  .sie-mgnrega ul li::before {
    content: '✓';
    position: absolute; left: 0; top: 8px;
    color: #6ee7b7; font-size: 12px; font-weight: 700;
  }
  .sie-mgnrega ul li strong { color: #6ee7b7; }

  /* ─── COMPARISON TABLE: ORGANISED VS UNORGANISED ─── */
  .sie-compare-table {
    border: 1.5px solid var(--rule);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 36px;
  }
  .sie-compare-table-head {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    background: var(--ink);
  }
  .sie-compare-th {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: #fff;
    padding: 14px 16px;
    border-right: 1px solid rgba(255,255,255,0.1);
  }
  .sie-compare-th:last-child { border-right: none; }
  .sie-compare-th.purple { color: #c4b5fd; }
  .sie-compare-th.green  { color: #6ee7b7; }
  .sie-compare-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-bottom: 1px solid var(--rule);
  }
  .sie-compare-row:last-child { border-bottom: none; }
  .sie-compare-row:nth-child(even) { background: var(--paper2); }
  .sie-compare-cell {
    font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 400;
    color: var(--ink2);
    padding: 13px 16px;
    border-right: 1px solid var(--rule);
    line-height: 1.55;
  }
  .sie-compare-cell:last-child { border-right: none; }
  .sie-compare-cell.aspect {
    font-family: 'Poppins', sans-serif;
    font-weight: 700; color: var(--accent2);
    background: var(--paper2);
  }
  .sie-compare-row:nth-child(even) .sie-compare-cell.aspect { background: var(--paper2); }

  /* ─── PUBLIC vs PRIVATE SPLIT ─── */
  .sie-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1.5px solid var(--rule);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 36px;
  }
  @media (max-width: 580px) { .sie-split { grid-template-columns: 1fr; } }
  .sie-split-col { padding: 28px 26px; }
  .sie-split-col.pub  { background: linear-gradient(160deg, #0a0414, #1e0a42); border-right: 1.5px solid var(--rule); }
  .sie-split-col.priv { background: var(--white); }
  @media (max-width: 580px) { .sie-split-col.pub { border-right: none; border-bottom: 1.5px solid var(--rule); } }
  .sie-split-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    margin-bottom: 8px;
    display: inline-block;
    padding: 4px 12px;
    border-radius: 100px;
  }
  .sie-split-col.pub  .sie-split-label { background: rgba(196,181,253,0.15); color: #c4b5fd; }
  .sie-split-col.priv .sie-split-label { background: var(--amber-lt); color: var(--amber); }
  .sie-split-heading {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px; font-weight: 900;
    margin-bottom: 16px;
    letter-spacing: -0.01em;
  }
  .sie-split-col.pub  .sie-split-heading { color: #fff; }
  .sie-split-col.priv .sie-split-heading { color: var(--ink); }
  .sie-split-col ul { list-style: none; padding: 0; }
  .sie-split-col ul li {
    font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 400;
    padding: 8px 0 8px 18px;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    position: relative; line-height: 1.6;
  }
  .sie-split-col.pub ul li { color: rgba(255,255,255,0.78); border-bottom-color: rgba(255,255,255,0.08); }
  .sie-split-col.priv ul li { color: var(--ink2); }
  .sie-split-col ul li:last-child { border-bottom: none; }
  .sie-split-col ul li::before {
    content: '';
    position: absolute; left: 0; top: 50%;
    transform: translateY(-50%);
    width: 6px; height: 6px; border-radius: 50%;
  }
  .sie-split-col.pub  ul li::before { background: #c4b5fd; }
  .sie-split-col.priv ul li::before { background: var(--amber); }
  .sie-split-col ul li strong { font-weight: 600; }
  .sie-split-col.pub  ul li strong { color: #c4b5fd; }
  .sie-split-col.priv ul li strong { color: var(--amber); }

  /* ─── WHY TERTIARY GREW — REASONS LIST ─── */
  .sie-reasons {
    counter-reset: reason-counter;
    margin-bottom: 36px;
  }
  .sie-reason-item {
    display: flex;
    gap: 20px;
    padding: 20px 0;
    border-bottom: 1px solid var(--rule);
    align-items: flex-start;
  }
  .sie-reason-item:last-child { border-bottom: none; }
  .sie-reason-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 28px; font-weight: 900;
    color: var(--accent);
    flex-shrink: 0;
    line-height: 1;
    width: 40px;
    text-align: right;
    opacity: 0.35;
  }
  .sie-reason-body { flex: 1; }
  .sie-reason-head {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 700;
    color: var(--ink); margin-bottom: 6px;
  }
  .sie-reason-desc {
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 400;
    color: var(--ink2); line-height: 1.7;
  }
  .sie-reason-desc strong { color: var(--accent2); font-weight: 600; }

  /* ─── EMPLOYMENT GAP VISUAL ─── */
  .sie-emp-gap {
    background: var(--paper2);
    border: 1.5px solid var(--rule);
    border-radius: 8px;
    padding: 28px 32px;
    margin-bottom: 36px;
  }
  .sie-emp-gap-title {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 700;
    color: var(--ink); margin-bottom: 20px;
    letter-spacing: -0.01em;
  }
  .sie-bar-row { margin-bottom: 16px; }
  .sie-bar-row:last-child { margin-bottom: 0; }
  .sie-bar-label-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }
  .sie-bar-name {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 600;
    color: var(--ink2);
  }
  .sie-bar-pct {
    font-family: 'Montserrat', sans-serif;
    font-size: 14px; font-weight: 800;
    color: var(--accent2);
  }
  .sie-bar-track {
    height: 10px;
    background: rgba(0,0,0,0.08);
    border-radius: 100px;
    overflow: hidden;
  }
  .sie-bar-fill {
    height: 100%;
    border-radius: 100px;
    transition: width 0.4s ease;
  }

  /* ─── UNORGANISED SECTOR PEOPLE ─── */
  .sie-unorg-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 36px;
  }
  @media (max-width: 600px) { .sie-unorg-grid { grid-template-columns: 1fr; } }
  .sie-unorg-card {
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-radius: 6px;
    padding: 18px 20px;
  }
  .sie-unorg-zone {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 8px;
  }
  .sie-unorg-title {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 700;
    color: var(--accent2); margin-bottom: 10px;
  }
  .sie-unorg-tags {
    display: flex; flex-wrap: wrap; gap: 6px;
  }
  .sie-unorg-tag {
    font-family: 'Inter', sans-serif;
    font-size: 12px; font-weight: 500;
    color: var(--ink2);
    background: var(--paper2);
    border: 1px solid var(--rule);
    padding: 4px 10px;
    border-radius: 4px;
  }

  /* ─── FAQ ─── */
  .sie-faq-header { margin-bottom: 12px; }
  .sie-faq-kicker {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--accent);
    background: var(--accent-lt);
    padding: 6px 16px;
    border-radius: 100px;
  }
  .sie-faq-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(26px, 4vw, 36px);
    font-weight: 900;
    color: var(--ink);
    letter-spacing: -0.02em;
    margin-bottom: 28px; margin-top: 16px;
  }
  .sie-faq-item {
    border: 1.5px solid var(--rule);
    border-radius: 6px;
    margin-bottom: 12px;
    overflow: hidden;
    background: var(--white);
    transition: border-color 0.2s;
  }
  .sie-faq-item.open { border-color: var(--accent); }
  .sie-faq-q {
    width: 100%; background: none; border: none;
    cursor: pointer;
    display: flex; justify-content: space-between;
    align-items: center;
    padding: 20px 24px; text-align: left; gap: 16px;
  }
  .sie-faq-q-text {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 600;
    color: var(--ink); line-height: 1.5;
  }
  .sie-faq-item.open .sie-faq-q-text { color: var(--accent); }
  .sie-faq-icon {
    font-family: 'Montserrat', sans-serif;
    font-size: 22px; font-weight: 700;
    color: var(--accent); flex-shrink: 0;
    transition: transform 0.2s;
  }
  .sie-faq-item.open .sie-faq-icon { transform: rotate(45deg); }
  .sie-faq-ans {
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 400;
    color: var(--ink2); line-height: 1.8;
    padding: 0 24px;
    max-height: 0; overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
  }
  .sie-faq-ans.visible { max-height: 700px; padding: 0 24px 20px; }
  .sie-faq-ans strong { color: var(--accent2); font-weight: 600; }

  @media (max-width: 700px) {
    .sie-body { padding: 48px 20px 72px; }
    .sie-hero-inner { padding: 0 20px; }
    .sie-intro-card { padding: 24px 24px; }
    .sie-table-key { width: 140px; font-size: 12px; padding: 12px 12px; }
    .sie-table-val { font-size: 14px; padding: 12px 12px; }
    .sie-gdp-box { padding: 24px 24px; }
    .sie-mgnrega { padding: 24px 24px; }
  }
`;

const faqs = [
  {
    q: "What is the primary sector? Give examples.",
    a: (
      <>
        The <strong>primary sector</strong> includes all activities that involve the direct use of natural resources.
        It forms the base for all other products we subsequently make. Since most natural products come from
        agriculture, dairy, fishing, and forestry, it is also called the <strong>agriculture and related sector</strong>.
        Examples: cultivation of cotton, wheat farming, fishing, mining, dairy farming, and forestry.
      </>
    ),
  },
  {
    q: "What is the secondary sector? Why is it called the industrial sector?",
    a: (
      <>
        The <strong>secondary sector</strong> covers activities in which <strong>natural products are changed into
        other forms through manufacturing</strong>. It is the next step after the primary sector.
        Since it gradually became associated with different kinds of industries, it is also called the
        <strong> industrial sector</strong>. Examples: cotton → cloth, iron ore → steel, wheat → flour → biscuits.
      </>
    ),
  },
  {
    q: "What is the tertiary sector? Why is it called the service sector?",
    a: (
      <>
        The <strong>tertiary sector</strong> includes activities that help in the development of the primary and
        secondary sectors. These activities <strong>generate services rather than goods</strong>, so it is also
        called the <strong>service sector</strong>. Examples include transport, storage, communication, banking,
        trade, hospitals, education, tourism, and IT services.
      </>
    ),
  },
  {
    q: "What is GDP? How is it calculated?",
    a: (
      <>
        <strong>GDP (Gross Domestic Product)</strong> is the value of all final goods and services produced
        within a country during a particular year. It is calculated by adding the <strong>value of final goods
        and services</strong> produced in the three sectors (primary + secondary + tertiary). Only <strong>final
        goods</strong> are counted — intermediate goods are excluded to avoid double counting. GDP shows how big
        the economy is.
      </>
    ),
  },
  {
    q: "Why has the tertiary sector become the largest producing sector in India?",
    a: (
      <>
        The tertiary sector has surpassed the primary sector in GDP contribution since 2011–12 due to four reasons:
        <br /><br />
        1. <strong>Basic services</strong> like hospitals, schools, and post offices are essential and must be provided by the government.
        <br />
        2. <strong>Agriculture and industry growth</strong> creates demand for transport, trade, and storage services.
        <br />
        3. <strong>Rising incomes</strong> lead to demand for services like restaurants, tourism, private schools, and hospitals.
        <br />
        4. <strong>New ICT-based services</strong> (IT, BPO) have become important and essential over the past decade.
      </>
    ),
  },
  {
    q: "What is disguised unemployment? Give an example.",
    a: (
      <>
        <strong>Disguised unemployment</strong> (also called hidden unemployment) occurs when more people are
        employed in a job than are actually needed. If some workers are removed, <strong>production is not
        affected</strong>. This is common in the agricultural sector in India — more than half the workers are
        in agriculture, but they produce only a quarter of the GDP. For example, if 5 people are working on a
        farm that only needs 3 workers, 2 are disguisedly unemployed.
      </>
    ),
  },
  {
    q: "What is MGNREGA 2005? What does it guarantee?",
    a: (
      <>
        The <strong>Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA), 2005</strong> is a law
        that implements the <strong>Right to Work</strong> in India. It guarantees:
        <br /><br />
        • <strong>100 days of employment per year</strong> to all people who are able and in need of work.
        <br />
        • If the government fails to provide employment, it must pay <strong>unemployment allowances</strong>.
        <br /><br />
        Its purpose is to create employment and reduce rural poverty and disguised unemployment.
      </>
    ),
  },
  {
    q: "What is the difference between organised and unorganised sectors?",
    a: (
      <>
        <strong>Organised sector:</strong> Enterprises where terms of employment are regular and workers
        have assured work. They follow formal processes, procedures, and government regulations. Workers get
        job security, provident fund, paid leave, and other benefits.
        <br /><br />
        <strong>Unorganised sector:</strong> Characterised by small, scattered units largely outside government
        control. Jobs are <strong>low-paid, irregular, and insecure</strong>. No formal benefits are provided.
        It includes street vendors, small farmers, construction workers, domestic workers, etc.
      </>
    ),
  },
  {
    q: "Who works in the unorganised sector in rural and urban India?",
    a: (
      <>
        <strong>In rural areas:</strong> The unorganised sector mostly comprises <strong>landless agricultural
        labourers, small and marginal farmers, sharecroppers, and artisans</strong>. Nearly 80% of rural
        households fall in the small and marginal farmer category.
        <br /><br />
        <strong>In urban areas:</strong> It includes workers in <strong>small-scale industries, casual
        construction workers, street vendors, head-load workers, garment makers, rag pickers,
        and domestic workers</strong>.
      </>
    ),
  },
  {
    q: "What is the difference between public sector and private sector?",
    a: (
      <>
        <strong>Public sector:</strong> The government owns most assets and provides all services.
        Its purpose is not just to earn profits but to <strong>serve society</strong> — especially in areas
        where the private sector would charge high rates or refuse to invest. Funded through taxes and
        government revenue.
        <br /><br />
        <strong>Private sector:</strong> Ownership of assets and delivery of services is in the hands of
        <strong> private individuals or companies</strong>. Activities are guided by the <strong>motive to earn profits</strong>.
        Examples: private schools, private hospitals, Tata, Reliance.
      </>
    ),
  },
  {
    q: "Why does the government need to support the public sector?",
    a: (
      <>
        The government must support the public sector because:
        <br /><br />
        • There are services society needs but which the <strong>private sector will not provide at a reasonable cost</strong>.
        <br />
        • Collecting money from thousands of users of shared facilities is difficult.
        <br />
        • The government must <strong>provide health and education facilities for all</strong>.
        <br />
        • Government must take care of the <strong>poorest and most ignored regions</strong> through increased spending.
        <br />
        • Some activities require heavy investment — the government must <strong>bear part of the cost</strong> to ensure continuity.
      </>
    ),
  },
];

export default function SectorsOfIndianEconomy() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>

      <div className="sie-root">

        {/* ── HERO ── */}
        <div className="sie-hero">
          <div className="sie-hero-pattern" />
          <div className="sie-glow-a" />
          <div className="sie-glow-b" />
          <div className="sie-hero-bg-num">02</div>

          <div className="sie-hero-inner">
            <div className="sie-overline">Economics · Class 10 · Chapter 2</div>

            <h1 className="sie-hero-title">
              <em>Sectors</em> of the<br />
              <span className="em2">Indian</span> Economy
            </h1>

            <div className="sie-hero-bar">
              {[
                { label: "Subject",   value: "Economics" },
                { label: "Class",     value: "10th Standard" },
                { label: "Chapter",   value: "Chapter 2" },
                { label: "Board",     value: "CBSE / NCERT" },
              ].map((x) => (
                <div className="sie-hero-bar-item" key={x.label}>
                  <div className="sie-bar-label">{x.label}</div>
                  <div className="sie-bar-value">{x.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="sie-body">

          {/* Dark intro card */}
          <div className="sie-intro-card">
            <p>
              Every economic activity in a country can be classified into three sectors — <strong>Primary,
              Secondary, and Tertiary</strong>. Understanding these sectors helps us analyse how
              a nation produces wealth, where people work, and why some sectors grow faster than others.
            </p>
            <p>
              India's economy tells a remarkable story: while the <strong>tertiary (service) sector
              now contributes the most to GDP</strong>, more than half the workforce still depends
              on the primary sector — a gap at the heart of India's development challenge.
            </p>
          </div>

          {/* ── SECTION 1: Three Sectors ── */}
          <div className="sie-sec-head">
            <div className="sie-sec-num">1</div>
            <div className="sie-sec-title-wrap">
              <div className="sie-sec-kicker">Foundation Concepts</div>
              <h2 className="sie-sec-title">The Three <span>Sectors of Economic Activity</span></h2>
            </div>
          </div>

          <p className="sie-body-text">
            All production activities in an economy are grouped into three sectors based on
            the <strong>nature of the activity</strong> — whether it uses natural resources directly,
            transforms them, or provides supporting services.
          </p>

          <div className="sie-sectors-grid">
            {/* Primary */}
            <div className="sie-sector-card primary">
              <div className="sie-sector-header">
                <span className="sie-sector-icon">🌾</span>
                <div className="sie-sector-tag">Also Known As</div>
                <div className="sie-sector-name">Primary Sector</div>
                <div className="sie-sector-alias">Agriculture &amp; Related Sector</div>
              </div>
              <div className="sie-sector-body">
                <ul>
                  <li>Directly uses <strong>natural resources</strong></li>
                  <li>Forms the <strong>base</strong> for all other products</li>
                  <li>Includes agriculture, dairy, fishing, forestry</li>
                  <li>Example: <strong>cultivation of cotton</strong></li>
                  <li>Largest <strong>employer</strong> in India still today</li>
                </ul>
              </div>
            </div>
            {/* Secondary */}
            <div className="sie-sector-card secondary">
              <div className="sie-sector-header">
                <span className="sie-sector-icon">🏭</span>
                <div className="sie-sector-tag">Also Known As</div>
                <div className="sie-sector-name">Secondary Sector</div>
                <div className="sie-sector-alias">Industrial Sector</div>
              </div>
              <div className="sie-sector-body">
                <ul>
                  <li>Natural products <strong>changed into other forms</strong></li>
                  <li>Through <strong>manufacturing</strong> processes</li>
                  <li>Next step after primary sector</li>
                  <li>Involves <strong>industrial activity</strong></li>
                  <li>Example: <strong>cotton → cloth, wheat → flour</strong></li>
                </ul>
              </div>
            </div>
            {/* Tertiary */}
            <div className="sie-sector-card tertiary">
              <div className="sie-sector-header">
                <span className="sie-sector-icon">🛎️</span>
                <div className="sie-sector-tag">Also Known As</div>
                <div className="sie-sector-name">Tertiary Sector</div>
                <div className="sie-sector-alias">Service Sector</div>
              </div>
              <div className="sie-sector-body">
                <ul>
                  <li>Helps develop primary &amp; <strong>secondary sectors</strong></li>
                  <li>Generates <strong>services</strong>, not goods</li>
                  <li>Largest <strong>GDP contributor</strong> in India (2011–12 onwards)</li>
                  <li>Fastest growing sector in India</li>
                  <li>Example: <strong>transport, banking, IT, trade</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Examples band */}
          <div className="sie-examples-band">
            <div className="sie-examples-band-title">📋 Sector-wise Examples at a Glance</div>
            <div className="sie-examples-row">
              <div className="sie-ex-col">
                <span className="sie-ex-label green">Primary</span>
                <div className="sie-ex-items">Farming · Dairy · Fishing · Mining · Forestry · Poultry · Animal Husbandry</div>
              </div>
              <div className="sie-ex-col">
                <span className="sie-ex-label blue">Secondary</span>
                <div className="sie-ex-items">Textile mills · Steel plants · Bakeries · Automobile manufacturing · Construction</div>
              </div>
              <div className="sie-ex-col">
                <span className="sie-ex-label purple">Tertiary</span>
                <div className="sie-ex-items">Banking · Transport · Communication · Trade · Storage · IT · Tourism · Hospitals</div>
              </div>
            </div>
          </div>

          {/* ── SECTION 2: GDP ── */}
          <div className="sie-divider"><div className="sie-divider-mark" /></div>

          <div className="sie-sec-head">
            <div className="sie-sec-num">2</div>
            <div className="sie-sec-title-wrap">
              <div className="sie-sec-kicker">Measuring the Economy</div>
              <h2 className="sie-sec-title">Comparing Sectors — <span>GDP</span></h2>
            </div>
          </div>

          <p className="sie-body-text">
            To compare production across sectors, economists count only <strong>final goods and services</strong>
            — not intermediate goods. An intermediate good (like wheat sold to a flour mill) is used up
            in producing a final good (like biscuits), so counting both would lead to <strong>double counting</strong>.
          </p>

          <div className="sie-gdp-box">
            <div className="sie-gdp-acronym">GDP</div>
            <div className="sie-gdp-divider" />
            <div className="sie-gdp-content">
              <div className="sie-gdp-heading">Gross Domestic Product</div>
              <div className="sie-gdp-text">
                The <strong>sum of value of all final goods and services produced</strong> within a country
                during a particular year. It is calculated by adding production across all three sectors:
                <strong> Primary + Secondary + Tertiary = GDP</strong>. GDP shows how big the economy is.
              </div>
            </div>
          </div>

          <div className="sie-pull-quote">
            <p>
              "Only final goods and services must be counted. Intermediate goods are used up in producing
              final goods — counting them again would be double counting."
            </p>
            <cite>— NCERT Economics, Chapter 2</cite>
          </div>

          {/* ── SECTION 3: India's Sectors in GDP & Employment ── */}
          <div className="sie-divider"><div className="sie-divider-mark" /></div>

          <div className="sie-sec-head">
            <div className="sie-sec-num">3</div>
            <div className="sie-sec-title-wrap">
              <div className="sie-sec-kicker">India's Economy in Numbers</div>
              <h2 className="sie-sec-title">Primary, Secondary &amp; Tertiary — <span>India's Story</span></h2>
            </div>
          </div>

          <p className="sie-body-text">
            Over the <strong>forty years between 1971–72 and 2011–12</strong>, production in all three
            sectors increased — but the <strong>tertiary sector grew the most</strong>. By 2011–12,
            the tertiary sector replaced the primary sector as the <strong>largest producing sector in India</strong>.
            However, employment patterns have not shifted at the same pace.
          </p>

          <div className="sie-stats-row">
            <div className="sie-stat-box green">
              <div className="sie-stat-num">50%+</div>
              <div className="sie-stat-label">Workers in Primary Sector</div>
              <div className="sie-stat-sub">But produce only ~25% of GDP</div>
            </div>
            <div className="sie-stat-box">
              <div className="sie-stat-num">75%</div>
              <div className="sie-stat-label">GDP from Secondary + Tertiary</div>
              <div className="sie-stat-sub">But employ less than half the people</div>
            </div>
            <div className="sie-stat-box amber">
              <div className="sie-stat-num">#1</div>
              <div className="sie-stat-label">Tertiary Sector in GDP</div>
              <div className="sie-stat-sub">Largest producing sector since 2011–12</div>
            </div>
          </div>

          {/* Employment gap visual */}
          <div className="sie-emp-gap">
            <div className="sie-emp-gap-title">📊 The Employment–GDP Gap in India</div>
            <div className="sie-bar-row">
              <div className="sie-bar-label-row">
                <span className="sie-bar-name">Primary Sector — Share of Workers</span>
                <span className="sie-bar-pct">~52%</span>
              </div>
              <div className="sie-bar-track">
                <div className="sie-bar-fill" style={{ width: "52%", background: "#059669" }} />
              </div>
            </div>
            <div className="sie-bar-row">
              <div className="sie-bar-label-row">
                <span className="sie-bar-name">Primary Sector — Share of GDP</span>
                <span className="sie-bar-pct">~25%</span>
              </div>
              <div className="sie-bar-track">
                <div className="sie-bar-fill" style={{ width: "25%", background: "#34d399" }} />
              </div>
            </div>
            <div className="sie-bar-row">
              <div className="sie-bar-label-row">
                <span className="sie-bar-name">Secondary + Tertiary — Share of GDP</span>
                <span className="sie-bar-pct">~75%</span>
              </div>
              <div className="sie-bar-track">
                <div className="sie-bar-fill" style={{ width: "75%", background: "#7c3aed" }} />
              </div>
            </div>
            <div className="sie-bar-row">
              <div className="sie-bar-label-row">
                <span className="sie-bar-name">Secondary + Tertiary — Share of Workers</span>
                <span className="sie-bar-pct">&lt;50%</span>
              </div>
              <div className="sie-bar-track">
                <div className="sie-bar-fill" style={{ width: "48%", background: "#a78bfa" }} />
              </div>
            </div>
          </div>

          {/* ── SECTION 4: Why Tertiary Grew ── */}
          <div className="sie-divider"><div className="sie-divider-mark" /></div>

          <div className="sie-sec-head">
            <div className="sie-sec-num">4</div>
            <div className="sie-sec-title-wrap">
              <div className="sie-sec-kicker">Key Reasons</div>
              <h2 className="sie-sec-title">Why Did the <span>Tertiary Sector</span> Grow So Fast?</h2>
            </div>
          </div>

          <div className="sie-reasons">
            {[
              {
                head: "Basic Services are Essential",
                desc: <>In any country, services like <strong>hospitals, educational institutions, post and telegraph services</strong> are required. In a developing country, the <strong>government has to take responsibility</strong> for providing these basic services to all citizens.</>
              },
              {
                head: "Agriculture &amp; Industry Create Demand for Services",
                desc: <>The development of agriculture and industry leads to the development of services such as <strong>transport, trade, and storage</strong>. As the primary and secondary sectors grow, they naturally demand more tertiary support.</>
              },
              {
                head: "Rising Incomes — Demand for More Services",
                desc: <>As income levels rise, certain sections of people start demanding many more services like <strong>eating out, tourism, shopping, private hospitals, and private schools</strong>. A wealthier population spends more on services.</>
              },
              {
                head: "New ICT-based Services",
                desc: <>Over the past decade or so, new services based on <strong>information and communication technology (IT, BPO, e-commerce)</strong> have become important and essential — transforming India into a global services hub.</>
              },
            ].map((r, i) => (
              <div className="sie-reason-item" key={i}>
                <div className="sie-reason-num">0{i + 1}</div>
                <div className="sie-reason-body">
                  <div className="sie-reason-head">{r.head}</div>
                  <div className="sie-reason-desc">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── SECTION 5: Disguised Unemployment ── */}
          <div className="sie-divider"><div className="sie-divider-mark" /></div>

          <div className="sie-sec-head">
            <div className="sie-sec-num">5</div>
            <div className="sie-sec-title-wrap">
              <div className="sie-sec-kicker">Hidden Problem</div>
              <h2 className="sie-sec-title">Disguised Unemployment &amp; <span>How to Create More Jobs</span></h2>
            </div>
          </div>

          <div className="sie-card-grid">
            <div className="sie-card dark">
              <div className="sie-card-tag">Concept</div>
              <div className="sie-card-title">Disguised Unemployment</div>
              <ul>
                <li>More workers in agriculture than <strong>actually needed</strong></li>
                <li>Removing some workers does <strong>not reduce output</strong></li>
                <li>Workers appear employed but are <strong>underemployed</strong></li>
                <li>Hidden — unlike open unemployment, <strong>not visible</strong></li>
                <li>Also seen in urban <strong>service sector</strong> — street vendors, cart pushers</li>
                <li>These workers <strong>earn very little</strong> with no better options</li>
              </ul>
            </div>
            <div className="sie-card">
              <div className="sie-card-tag">Solutions</div>
              <div className="sie-card-title">Creating More Employment</div>
              <ul>
                <li>Identify, promote, and locate <strong>labour-intensive industries</strong></li>
                <li>Planning Commission: <strong>20 lakh jobs</strong> possible in education sector alone</li>
                <li>Improving <strong>tourism</strong> can create 5 lakh+ additional jobs per year</li>
                <li>Every state has potential for <strong>regional employment growth</strong></li>
                <li>Government enacted the <strong>Right to Work</strong> through MGNREGA 2005</li>
              </ul>
            </div>
          </div>

          {/* MGNREGA Box */}
          <div className="sie-mgnrega">
            <div className="sie-mgnrega-badge">Government Act · 2005</div>
            <div className="sie-mgnrega-title">Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA), 2005</div>
            <ul>
              <li>Implements the <strong>Right to Work</strong> in India</li>
              <li>Guarantees <strong>100 days of employment per year</strong> to all people who are able and in need of work</li>
              <li>Applies to <strong>rural areas</strong> — targets agricultural underemployment directly</li>
              <li>If the government fails to provide employment, it must pay <strong>unemployment allowances</strong></li>
              <li>A landmark policy recognising that creating employment <strong>takes time and planning</strong></li>
            </ul>
          </div>

          {/* ── SECTION 6: Organised vs Unorganised ── */}
          <div className="sie-divider"><div className="sie-divider-mark" /></div>

          <div className="sie-sec-head">
            <div className="sie-sec-num">6</div>
            <div className="sie-sec-title-wrap">
              <div className="sie-sec-kicker">Nature of Work</div>
              <h2 className="sie-sec-title">Organised vs <span>Unorganised Sector</span></h2>
            </div>
          </div>

          <p className="sie-body-text">
            Sectors can also be divided based on whether they operate under <strong>formal rules and
            regulations</strong>. This distinction matters enormously for worker rights, job security, and wages.
          </p>

          <div className="sie-compare-table">
            <div className="sie-compare-table-head">
              <div className="sie-compare-th">Aspect</div>
              <div className="sie-compare-th purple">Organised Sector</div>
              <div className="sie-compare-th green">Unorganised Sector</div>
            </div>
            {[
              ["Employment Terms", "Regular, assured work", "Irregular, not secure"],
              ["Government Control", "Subject to formal rules & regulations", "Largely outside government control"],
              ["Scale", "Larger, structured enterprises", "Small, scattered units"],
              ["Wages", "Regular, fair wages", "Low-paid, often irregular"],
              ["Benefits", "PF, paid leave, healthcare, etc.", "No formal benefits"],
              ["Job Security", "High — contracts in place", "Low — can be dismissed anytime"],
              ["Since 1990s", "Many workers losing jobs (downsizing)", "Number of workers is growing"],
            ].map(([a, b, c]) => (
              <div className="sie-compare-row" key={a}>
                <div className="sie-compare-cell aspect">{a}</div>
                <div className="sie-compare-cell">{b}</div>
                <div className="sie-compare-cell">{c}</div>
              </div>
            ))}
          </div>

          <p className="sie-body-text">
            Nearly <strong>80% of rural households in India</strong> are in the small and marginal farmer
            category — part of the unorganised sector. Protecting these workers is a critical development challenge.
          </p>

          <div className="sie-unorg-grid">
            <div className="sie-unorg-card">
              <div className="sie-unorg-zone">Rural Unorganised Sector</div>
              <div className="sie-unorg-title">Who Works Here?</div>
              <div className="sie-unorg-tags">
                {["Landless labourers", "Small farmers", "Marginal farmers", "Sharecroppers", "Artisans"].map(t => (
                  <span className="sie-unorg-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
            <div className="sie-unorg-card">
              <div className="sie-unorg-zone">Urban Unorganised Sector</div>
              <div className="sie-unorg-title">Who Works Here?</div>
              <div className="sie-unorg-tags">
                {["Small-scale industry workers", "Construction workers", "Street vendors", "Head-load workers", "Garment makers", "Rag pickers", "Domestic workers"].map(t => (
                  <span className="sie-unorg-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── SECTION 7: Public vs Private ── */}
          <div className="sie-divider"><div className="sie-divider-mark" /></div>

          <div className="sie-sec-head">
            <div className="sie-sec-num">7</div>
            <div className="sie-sec-title-wrap">
              <div className="sie-sec-kicker">Ownership Classification</div>
              <h2 className="sie-sec-title">Public Sector vs <span>Private Sector</span></h2>
            </div>
          </div>

          <p className="sie-body-text">
            Sectors can also be classified based on <strong>ownership of assets and who delivers services</strong>.
            The public sector serves society; the private sector serves profit — and both play essential roles.
          </p>

          <div className="sie-split">
            <div className="sie-split-col pub">
              <span className="sie-split-label">Government Owned</span>
              <div className="sie-split-heading">Public Sector</div>
              <ul>
                <li>Government owns <strong>most assets</strong> and provides all services</li>
                <li>Purpose is <strong>not just to earn profits</strong> but to serve all</li>
                <li>Funded through <strong>taxes and government revenue</strong></li>
                <li>Provides services private sector <strong>will not at reasonable cost</strong></li>
                <li>Must provide <strong>health &amp; education</strong> for all citizens</li>
                <li>Takes care of <strong>poorest and most ignored regions</strong></li>
                <li>Government bears cost for activities <strong>private sector won't sustain</strong></li>
                <li>Examples: <strong>Railways, Post Office, BSNL, AIIMS, government schools</strong></li>
              </ul>
            </div>
            <div className="sie-split-col priv">
              <span className="sie-split-label">Privately Owned</span>
              <div className="sie-split-heading">Private Sector</div>
              <ul>
                <li>Ownership in hands of <strong>private individuals or companies</strong></li>
                <li>Guided by motive to <strong>earn profits</strong></li>
                <li>Provides goods &amp; services <strong>at market rates</strong></li>
                <li>May charge <strong>high rates</strong> for essential services</li>
                <li>Government may need to <strong>subsidise</strong> private sector in some areas</li>
                <li>Since 1990s: growing in many <strong>previously public sectors</strong></li>
                <li>Examples: <strong>Tata, Reliance, private hospitals, private schools</strong></li>
              </ul>
            </div>
          </div>

          <div className="sie-card-grid">
            <div className="sie-card green">
              <div className="sie-card-tag">Why Government Must Spend</div>
              <div className="sie-card-title">Responsibility of Public Sector</div>
              <ul>
                <li>Collect money from <strong>thousands of users</strong> of shared facilities</li>
                <li>Provide <strong>pollution-free environment</strong> — market can't do this</li>
                <li>Ensure <strong>unadulterated medicines</strong> and safe food</li>
                <li>Build <strong>large infrastructure</strong> — dams, roads, ports</li>
                <li>Pay attention to <strong>human development aspects</strong></li>
              </ul>
            </div>
            <div className="sie-card amber">
              <div className="sie-card-tag">Social Obligation</div>
              <div className="sie-card-title">Protecting the Marginalised</div>
              <ul>
                <li>Nearly <strong>80% rural households</strong> are small/marginal farmers</li>
                <li>Unorganised workers need <strong>legal protection</strong> and minimum wages</li>
                <li>Government must ensure <strong>job security</strong> for informal workers</li>
                <li>Support for <strong>poorest and most ignored regions</strong> through spending</li>
                <li>Public provisioning where <strong>private sector fails</strong> to reach</li>
              </ul>
            </div>
          </div>

          {/* ── FAQ ── */}
          <div className="sie-divider"><div className="sie-divider-mark" /></div>

          <div className="sie-faq-header">
            <span className="sie-faq-kicker">Exam Preparation</span>
          </div>
          <h2 className="sie-faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, i) => (
            <div className={`sie-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="sie-faq-q" onClick={() => toggle(i)}>
                <span className="sie-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="sie-faq-icon">+</span>
              </button>
              <div className={`sie-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
