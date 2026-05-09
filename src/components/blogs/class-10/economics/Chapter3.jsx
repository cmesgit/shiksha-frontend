import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #0f1a14;
    --ink2:       #1c2e22;
    --muted:      #4f6a59;
    --paper:      #f2f8f4;
    --paper2:     #e4f0e8;
    --accent:     #0d7a45;
    --accent2:    #085c33;
    --accent-lt:  #d8f0e3;
    --gold:       #b76e00;
    --gold-lt:    #fff4d9;
    --red:        #c0392b;
    --red-lt:     #fdecea;
    --slate:      #1a3a5c;
    --slate-lt:   #deeaf7;
    --rule:       #c2dace;
    --white:      #ffffff;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .mac-root {
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
  }

  /* ─────────── HERO ─────────── */
  .mac-hero {
    background: linear-gradient(135deg, #050f08 0%, #0a1f10 50%, #0d2a15 100%);
    min-height: 88vh;
    display: flex;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
    padding: 0 0 64px;
  }
  .mac-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 6px;
    background: linear-gradient(90deg, #0d7a45 0%, #b76e00 50%, #1a3a5c 100%);
  }
  .mac-hero-bg-num {
    position: absolute;
    bottom: -60px; right: -30px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(220px, 36vw, 500px);
    font-weight: 900;
    line-height: 1;
    color: rgba(255,255,255,0.025);
    letter-spacing: -0.04em;
    user-select: none; pointer-events: none;
  }
  /* Currency symbol watermark */
  .mac-hero-symbol {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(180px, 28vw, 380px);
    font-weight: 900;
    color: rgba(255,255,255,0.02);
    user-select: none; pointer-events: none;
    line-height: 1;
  }
  /* Dot grid */
  .mac-hero-dots {
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(13,122,69,0.1) 1px, transparent 1px);
    background-size: 36px 36px;
    pointer-events: none;
  }
  .mac-glow-a {
    position: absolute; top: 12%; right: 8%;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(13,122,69,0.14) 0%, transparent 70%);
    pointer-events: none;
  }
  .mac-glow-b {
    position: absolute; bottom: 15%; left: 6%;
    width: 220px; height: 220px; border-radius: 50%;
    background: radial-gradient(circle, rgba(183,110,0,0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  .mac-hero-inner {
    max-width: 900px; width: 100%;
    margin: 0 auto; padding: 0 32px;
    position: relative; z-index: 1;
  }
  .mac-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #6ee7a8; margin-bottom: 24px;
    display: flex; align-items: center; gap: 14px;
  }
  .mac-overline::before, .mac-overline::after {
    content: ''; flex: 0 0 40px; height: 1px; background: #6ee7a8;
  }
  .mac-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(42px, 8vw, 86px);
    font-weight: 900; color: #fff;
    line-height: 0.95; letter-spacing: -0.03em;
    margin-bottom: 32px;
  }
  .mac-hero-title em   { font-style: normal; color: #6ee7a8; }
  .mac-hero-title .em2 { color: #fbbf24; }
  .mac-hero-bar {
    display: flex; flex-wrap: wrap; gap: 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 24px; margin-top: 8px;
  }
  .mac-hero-bar-item {
    flex: 1 1 180px;
    padding: 0 24px 0 0;
    border-right: 1px solid rgba(255,255,255,0.1);
    margin-right: 24px;
  }
  .mac-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .mac-bar-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.35); margin-bottom: 5px;
  }
  .mac-bar-value {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 600;
    color: rgba(255,255,255,0.75);
  }

  /* ─────────── BODY ─────────── */
  .mac-body {
    max-width: 860px;
    margin: 0 auto;
    padding: 72px 32px 96px;
  }

  /* ─────────── DARK INTRO CARD ─────────── */
  .mac-intro-card {
    background: linear-gradient(135deg, #050f08 0%, #0d2a15 100%);
    border-left: 5px solid #0d7a45;
    border-radius: 4px;
    padding: 36px 40px;
    margin-bottom: 64px;
    position: relative; overflow: hidden;
  }
  .mac-intro-card::after {
    content: '₹';
    position: absolute; right: 32px; top: 50%;
    transform: translateY(-50%);
    font-family: 'Montserrat', sans-serif;
    font-size: 96px; font-weight: 900;
    color: rgba(255,255,255,0.04);
    line-height: 1;
  }
  .mac-intro-card p {
    font-family: 'Poppins', sans-serif;
    font-size: 18px; font-weight: 500;
    color: rgba(255,255,255,0.88);
    line-height: 1.78; margin: 0 0 14px;
  }
  .mac-intro-card p:last-child { margin: 0; }
  .mac-intro-card strong { color: #6ee7a8; }

  /* ─────────── SECTION HEADER ─────────── */
  .mac-sec-head {
    display: flex; align-items: flex-start; gap: 20px;
    margin-bottom: 28px;
    border-bottom: 2px solid var(--rule);
    padding-bottom: 18px;
  }
  .mac-sec-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 56px; font-weight: 900;
    color: var(--rule); line-height: 1; flex-shrink: 0;
  }
  .mac-sec-title-wrap { padding-top: 8px; }
  .mac-sec-kicker {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 6px;
  }
  .mac-sec-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(22px, 3.5vw, 30px);
    font-weight: 800; color: var(--ink);
    line-height: 1.15; letter-spacing: -0.02em;
  }
  .mac-sec-title span { color: var(--accent); }

  /* ─────────── BODY TEXT ─────────── */
  .mac-body-text {
    font-family: 'Inter', sans-serif;
    font-size: 16px; font-weight: 400;
    color: var(--ink2); line-height: 1.85;
    margin-bottom: 28px;
  }
  .mac-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── DIVIDER ─────────── */
  .mac-divider {
    margin: 56px 0;
    display: flex; align-items: center; gap: 16px;
  }
  .mac-divider::before, .mac-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--rule);
  }
  .mac-divider-mark {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--accent); flex-shrink: 0;
  }

  /* ─────────── BARTER VS MONEY — SPLIT ─────────── */
  .mac-barter-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1.5px solid var(--rule);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 36px;
  }
  @media (max-width: 580px) { .mac-barter-split { grid-template-columns: 1fr; } }
  .mac-bs-col { padding: 28px 26px; }
  .mac-bs-col.barter { background: var(--red-lt); border-right: 1.5px solid var(--rule); }
  .mac-bs-col.money  { background: var(--accent-lt); }
  @media (max-width: 580px) { .mac-bs-col.barter { border-right: none; border-bottom: 1.5px solid var(--rule); } }
  .mac-bs-badge {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    padding: 4px 12px; border-radius: 100px;
    display: inline-block; margin-bottom: 10px;
  }
  .mac-bs-col.barter .mac-bs-badge { background: rgba(192,57,43,0.12); color: var(--red); }
  .mac-bs-col.money  .mac-bs-badge { background: rgba(13,122,69,0.12); color: var(--accent2); }
  .mac-bs-heading {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px; font-weight: 900;
    margin-bottom: 16px; letter-spacing: -0.01em;
  }
  .mac-bs-col.barter .mac-bs-heading { color: var(--red); }
  .mac-bs-col.money  .mac-bs-heading { color: var(--accent2); }
  .mac-bs-col ul { list-style: none; padding: 0; }
  .mac-bs-col ul li {
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 400;
    padding: 8px 0 8px 18px;
    border-bottom: 1px solid rgba(0,0,0,0.07);
    position: relative; line-height: 1.6;
  }
  .mac-bs-col.barter ul li { color: #7b1a12; }
  .mac-bs-col.money  ul li { color: var(--ink2); }
  .mac-bs-col ul li:last-child { border-bottom: none; }
  .mac-bs-col ul li::before {
    content: ''; position: absolute; left: 0; top: 50%;
    transform: translateY(-50%);
    width: 6px; height: 6px; border-radius: 50%;
  }
  .mac-bs-col.barter ul li::before { background: var(--red); }
  .mac-bs-col.money  ul li::before { background: var(--accent); }
  .mac-bs-col ul li strong { font-weight: 600; }
  .mac-bs-col.barter ul li strong { color: var(--red); }
  .mac-bs-col.money  ul li strong { color: var(--accent2); }

  /* ─────────── KEY TERM BOX ─────────── */
  .mac-term-box {
    background: var(--paper2);
    border: 1.5px solid var(--rule);
    border-left: 5px solid var(--accent);
    border-radius: 4px;
    padding: 20px 28px;
    margin-bottom: 20px;
    display: flex; align-items: flex-start; gap: 18px;
  }
  .mac-term-icon {
    font-size: 28px; flex-shrink: 0; line-height: 1; margin-top: 2px;
  }
  .mac-term-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 5px;
  }
  .mac-term-name {
    font-family: 'Montserrat', sans-serif;
    font-size: 17px; font-weight: 900;
    color: var(--ink); margin-bottom: 6px;
    letter-spacing: -0.01em;
  }
  .mac-term-def {
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 400;
    color: var(--ink2); line-height: 1.7;
  }
  .mac-term-def strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── MODERN MONEY CARDS ─────────── */
  .mac-money-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 36px;
  }
  @media (max-width: 680px) { .mac-money-grid { grid-template-columns: 1fr; } }
  .mac-money-card {
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-top: 4px solid var(--accent);
    border-radius: 6px;
    padding: 22px 20px;
  }
  .mac-money-card.gold-top { border-top-color: var(--gold); }
  .mac-money-card.slate-top { border-top-color: var(--slate); }
  .mac-money-card-icon { font-size: 30px; margin-bottom: 10px; display: block; }
  .mac-money-card-title {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 700;
    color: var(--ink); margin-bottom: 10px;
  }
  .mac-money-card ul { list-style: none; padding: 0; }
  .mac-money-card ul li {
    font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 400;
    color: var(--ink2);
    padding: 6px 0 6px 16px;
    border-bottom: 1px solid var(--rule);
    position: relative; line-height: 1.55;
  }
  .mac-money-card ul li:last-child { border-bottom: none; }
  .mac-money-card ul li::before {
    content: ''; position: absolute; left: 0; top: 50%;
    transform: translateY(-50%);
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--accent);
  }
  .mac-money-card.gold-top  ul li::before { background: var(--gold); }
  .mac-money-card.slate-top ul li::before { background: var(--slate); }
  .mac-money-card ul li strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── CARD GRID (2-col) ─────────── */
  .mac-card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 36px;
  }
  @media (max-width: 620px) { .mac-card-grid { grid-template-columns: 1fr; } }
  .mac-card {
    border-radius: 6px; padding: 28px 28px 24px;
    border: 1.5px solid var(--rule); background: var(--white);
  }
  .mac-card.dark {
    background: linear-gradient(135deg, #050f08, #0d2a15);
    border-color: transparent;
  }
  .mac-card.gold  { background: var(--gold-lt); border-color: #f0d08a; }
  .mac-card.red   { background: var(--red-lt);  border-color: #f5a9a2; }
  .mac-card.slate { background: var(--slate-lt); border-color: #a8c8e8; }

  .mac-card-tag {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 10px;
  }
  .mac-card.dark  .mac-card-tag  { color: #6ee7a8; }
  .mac-card.gold  .mac-card-tag  { color: var(--gold); }
  .mac-card.red   .mac-card-tag  { color: var(--red); }
  .mac-card.slate .mac-card-tag  { color: var(--slate); }

  .mac-card-title {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 700;
    color: var(--ink); margin-bottom: 14px; line-height: 1.3;
  }
  .mac-card.dark  .mac-card-title { color: #fff; }
  .mac-card.gold  .mac-card-title { color: var(--gold); }
  .mac-card.red   .mac-card-title { color: var(--red); }
  .mac-card.slate .mac-card-title { color: var(--slate); }

  .mac-card ul { list-style: none; padding: 0; }
  .mac-card ul li {
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 400;
    color: var(--ink2);
    padding: 7px 0 7px 18px;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    position: relative; line-height: 1.6;
  }
  .mac-card.dark  ul li { color: rgba(255,255,255,0.78); border-bottom-color: rgba(255,255,255,0.07); }
  .mac-card.gold  ul li { color: #6b3d00; border-bottom-color: rgba(183,110,0,0.12); }
  .mac-card.red   ul li { color: #7b1a12; border-bottom-color: rgba(192,57,43,0.12); }
  .mac-card.slate ul li { color: #0f2540; border-bottom-color: rgba(26,58,92,0.12); }
  .mac-card ul li:last-child { border-bottom: none; }
  .mac-card ul li::before {
    content: ''; position: absolute; left: 0; top: 50%;
    transform: translateY(-50%);
    width: 6px; height: 6px; border-radius: 50%; background: var(--accent);
  }
  .mac-card.dark  ul li::before { background: #6ee7a8; }
  .mac-card.gold  ul li::before { background: var(--gold); }
  .mac-card.red   ul li::before { background: var(--red); }
  .mac-card.slate ul li::before { background: var(--slate); }
  .mac-card ul li strong { color: var(--accent2); font-weight: 600; }
  .mac-card.dark  ul li strong { color: #6ee7a8; }
  .mac-card.gold  ul li strong { color: var(--gold); }
  .mac-card.red   ul li strong { color: var(--red); }
  .mac-card.slate ul li strong { color: var(--slate); }

  /* ─────────── TABLE ─────────── */
  .mac-table-wrap {
    border: 1.5px solid var(--rule);
    border-radius: 6px; overflow: hidden;
    margin-bottom: 36px;
  }
  .mac-table-title {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    background: var(--ink); color: #fff;
    padding: 14px 24px;
  }
  .mac-table-row { display: flex; border-bottom: 1px solid var(--rule); }
  .mac-table-row:last-child { border-bottom: none; }
  .mac-table-key {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    color: var(--accent2);
    width: 210px; flex-shrink: 0;
    padding: 14px 20px;
    background: var(--paper2);
    border-right: 1px solid var(--rule);
    display: flex; align-items: center;
  }
  .mac-table-val {
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 400;
    color: var(--ink2); padding: 14px 20px;
    line-height: 1.65; flex: 1;
  }
  .mac-table-val strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── HOW BANKS WORK — FLOW ─────────── */
  .mac-flow {
    display: flex;
    align-items: stretch;
    gap: 0;
    margin-bottom: 36px;
    border: 1.5px solid var(--rule);
    border-radius: 8px;
    overflow: hidden;
  }
  @media (max-width: 600px) { .mac-flow { flex-direction: column; } }
  .mac-flow-step {
    flex: 1;
    padding: 24px 20px;
    border-right: 1.5px solid var(--rule);
    text-align: center;
    background: var(--white);
    position: relative;
  }
  .mac-flow-step:last-child { border-right: none; }
  @media (max-width: 600px) {
    .mac-flow-step { border-right: none; border-bottom: 1.5px solid var(--rule); }
    .mac-flow-step:last-child { border-bottom: none; }
  }
  .mac-flow-icon { font-size: 32px; display: block; margin-bottom: 10px; }
  .mac-flow-num {
    position: absolute; top: 12px; left: 14px;
    font-family: 'Montserrat', sans-serif;
    font-size: 11px; font-weight: 900;
    color: var(--rule);
  }
  .mac-flow-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 6px;
  }
  .mac-flow-title {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 700;
    color: var(--ink); margin-bottom: 8px;
  }
  .mac-flow-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 400;
    color: var(--muted); line-height: 1.6;
  }
  .mac-flow-desc strong { color: var(--accent2); font-weight: 600; }
  /* Arrow connector */
  .mac-flow-arrow {
    display: flex; align-items: center; justify-content: center;
    width: 0; overflow: visible;
    position: relative; z-index: 2;
  }

  /* ─────────── BANK INCOME BOX ─────────── */
  .mac-income-box {
    background: linear-gradient(135deg, #050f08 0%, #0d2a15 100%);
    border-radius: 8px;
    padding: 28px 32px;
    margin-bottom: 36px;
    display: flex; align-items: center; gap: 28px; flex-wrap: wrap;
  }
  .mac-income-formula {
    display: flex; align-items: center; gap: 12px;
    flex-wrap: wrap;
  }
  .mac-formula-pill {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    padding: 8px 18px; border-radius: 100px;
  }
  .mac-formula-pill.high { background: rgba(192,57,43,0.25); color: #f87171; }
  .mac-formula-pill.low  { background: rgba(13,122,69,0.25); color: #6ee7a8; }
  .mac-formula-pill.res  { background: rgba(183,110,0,0.25); color: #fbbf24; }
  .mac-formula-op {
    font-family: 'Montserrat', sans-serif;
    font-size: 22px; font-weight: 900; color: rgba(255,255,255,0.4);
  }
  .mac-income-text {
    font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 400;
    color: rgba(255,255,255,0.65);
    line-height: 1.7; flex: 1; min-width: 180px;
  }
  .mac-income-text strong { color: #6ee7a8; }

  /* ─────────── TERMS OF CREDIT CARDS ─────────── */
  .mac-terms-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 36px;
  }
  @media (max-width: 600px) { .mac-terms-grid { grid-template-columns: 1fr; } }
  .mac-term-card {
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-radius: 6px;
    padding: 22px 22px 18px;
  }
  .mac-term-card-icon { font-size: 26px; margin-bottom: 10px; display: block; }
  .mac-term-card-title {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 700;
    color: var(--accent2); margin-bottom: 8px;
  }
  .mac-term-card-text {
    font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 400;
    color: var(--ink2); line-height: 1.7;
  }
  .mac-term-card-text strong { color: var(--accent2); font-weight: 600; }

  /* ─────────── FORMAL vs INFORMAL COMPARE ─────────── */
  .mac-fi-table {
    border: 1.5px solid var(--rule);
    border-radius: 8px; overflow: hidden;
    margin-bottom: 36px;
  }
  .mac-fi-head {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    background: var(--ink);
  }
  .mac-fi-th {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: #fff; padding: 14px 16px;
    border-right: 1px solid rgba(255,255,255,0.1);
  }
  .mac-fi-th:last-child { border-right: none; }
  .mac-fi-th.green { color: #6ee7a8; }
  .mac-fi-th.red   { color: #f87171; }
  .mac-fi-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-bottom: 1px solid var(--rule);
  }
  .mac-fi-row:last-child { border-bottom: none; }
  .mac-fi-row:nth-child(even) { background: var(--paper2); }
  .mac-fi-cell {
    font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 400;
    color: var(--ink2);
    padding: 13px 16px;
    border-right: 1px solid var(--rule);
    line-height: 1.55;
  }
  .mac-fi-cell:last-child { border-right: none; }
  .mac-fi-cell.aspect {
    font-family: 'Poppins', sans-serif;
    font-weight: 700; color: var(--accent2);
    background: var(--paper2);
  }

  /* ─────────── STAT BLOCKS ─────────── */
  .mac-stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 36px;
  }
  @media (max-width: 620px) { .mac-stats-row { grid-template-columns: 1fr; } }
  .mac-stat {
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-top: 4px solid var(--accent);
    border-radius: 4px;
    padding: 22px 18px; text-align: center;
  }
  .mac-stat.red-top   { border-top-color: var(--red); }
  .mac-stat.gold-top  { border-top-color: var(--gold); }
  .mac-stat-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 34px; font-weight: 900;
    color: var(--accent); line-height: 1; margin-bottom: 6px;
  }
  .mac-stat.red-top  .mac-stat-num { color: var(--red); }
  .mac-stat.gold-top .mac-stat-num { color: var(--gold); }
  .mac-stat-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 600;
    color: var(--muted); line-height: 1.4;
  }
  .mac-stat-sub {
    font-family: 'Inter', sans-serif;
    font-size: 11px; font-weight: 400;
    color: var(--muted); margin-top: 4px;
  }

  /* ─────────── PULL QUOTE ─────────── */
  .mac-pull-quote {
    border-left: 5px solid var(--accent);
    background: var(--accent-lt);
    padding: 26px 34px;
    margin: 36px 0;
    border-radius: 0 4px 4px 0;
  }
  .mac-pull-quote p {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 600;
    color: var(--accent2); line-height: 1.7;
    font-style: italic; margin: 0 0 10px;
  }
  .mac-pull-quote cite {
    font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 500;
    color: var(--muted); font-style: normal;
  }

  /* ─────────── SHG BOX ─────────── */
  .mac-shg-box {
    background: linear-gradient(135deg, #0a1f10 0%, #0d2a15 100%);
    border-radius: 8px;
    padding: 32px 36px;
    margin-bottom: 36px;
    position: relative; overflow: hidden;
  }
  .mac-shg-box::after {
    content: '🤝';
    position: absolute; right: 24px; top: 50%;
    transform: translateY(-50%);
    font-size: 72px; opacity: 0.1;
  }
  .mac-shg-badge {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #6ee7a8;
    background: rgba(110,231,168,0.12);
    padding: 5px 14px; border-radius: 100px;
    display: inline-block; margin-bottom: 16px;
  }
  .mac-shg-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 22px; font-weight: 900;
    color: #fff; margin-bottom: 8px; letter-spacing: -0.01em;
  }
  .mac-shg-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: rgba(255,255,255,0.55);
    margin-bottom: 20px;
  }
  .mac-shg-box ul { list-style: none; padding: 0; }
  .mac-shg-box ul li {
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 400;
    color: rgba(255,255,255,0.8);
    padding: 8px 0 8px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    position: relative; line-height: 1.65;
  }
  .mac-shg-box ul li:last-child { border-bottom: none; }
  .mac-shg-box ul li::before {
    content: '✓'; position: absolute; left: 0; top: 8px;
    color: #6ee7a8; font-size: 12px; font-weight: 700;
  }
  .mac-shg-box ul li strong { color: #6ee7a8; }

  /* ─────────── RBI HIGHLIGHT ─────────── */
  .mac-rbi-box {
    background: var(--slate-lt);
    border: 1.5px solid #a8c8e8;
    border-left: 5px solid var(--slate);
    border-radius: 4px;
    padding: 24px 28px;
    margin-bottom: 28px;
    display: flex; align-items: flex-start; gap: 18px;
  }
  .mac-rbi-icon { font-size: 32px; flex-shrink: 0; }
  .mac-rbi-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 17px; font-weight: 900;
    color: var(--slate); margin-bottom: 8px;
  }
  .mac-rbi-text {
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 400;
    color: #1a3a5c; line-height: 1.7;
  }
  .mac-rbi-text strong { color: var(--slate); font-weight: 600; }

  /* ─────────── DEBT TRAP WARNING ─────────── */
  .mac-warning {
    background: var(--red-lt);
    border: 1.5px solid #f5a9a2;
    border-left: 5px solid var(--red);
    border-radius: 4px;
    padding: 22px 28px;
    margin-bottom: 28px;
  }
  .mac-warning-head {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 700;
    color: var(--red); margin-bottom: 8px;
    display: flex; align-items: center; gap: 8px;
  }
  .mac-warning-text {
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 400;
    color: #7b1a12; line-height: 1.7;
  }
  .mac-warning-text strong { color: var(--red); font-weight: 600; }

  /* ─────────── FAQ ─────────── */
  .mac-faq-header { margin-bottom: 12px; }
  .mac-faq-kicker {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--accent); background: var(--accent-lt);
    padding: 6px 16px; border-radius: 100px;
  }
  .mac-faq-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(26px, 4vw, 36px);
    font-weight: 900; color: var(--ink);
    letter-spacing: -0.02em;
    margin-bottom: 28px; margin-top: 16px;
  }
  .mac-faq-item {
    border: 1.5px solid var(--rule);
    border-radius: 6px; margin-bottom: 12px;
    overflow: hidden; background: var(--white);
    transition: border-color 0.2s;
  }
  .mac-faq-item.open { border-color: var(--accent); }
  .mac-faq-q {
    width: 100%; background: none; border: none; cursor: pointer;
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px 24px; text-align: left; gap: 16px;
  }
  .mac-faq-q-text {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 600;
    color: var(--ink); line-height: 1.5;
  }
  .mac-faq-item.open .mac-faq-q-text { color: var(--accent); }
  .mac-faq-icon {
    font-family: 'Montserrat', sans-serif;
    font-size: 22px; font-weight: 700;
    color: var(--accent); flex-shrink: 0;
    transition: transform 0.2s;
  }
  .mac-faq-item.open .mac-faq-icon { transform: rotate(45deg); }
  .mac-faq-ans {
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 400;
    color: var(--ink2); line-height: 1.8;
    padding: 0 24px; max-height: 0; overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
  }
  .mac-faq-ans.visible { max-height: 700px; padding: 0 24px 20px; }
  .mac-faq-ans strong { color: var(--accent2); font-weight: 600; }

  @media (max-width: 700px) {
    .mac-body { padding: 48px 20px 72px; }
    .mac-hero-inner { padding: 0 20px; }
    .mac-intro-card { padding: 24px 24px; }
    .mac-table-key { width: 140px; font-size: 12px; padding: 12px 12px; }
    .mac-table-val { font-size: 14px; padding: 12px 12px; }
    .mac-income-box { padding: 22px 22px; }
    .mac-shg-box { padding: 24px 24px; }
  }
`;

const faqs = [
  {
    q: "What is the barter system? What is double coincidence of wants?",
    a: (
      <>
        The <strong>barter system</strong> is a system where goods are directly exchanged without the use of money.
        For a barter exchange to happen, both parties must want exactly what the other has to offer — this is called
        <strong> double coincidence of wants</strong>. For example, a farmer who wants shoes must find a cobbler
        who wants wheat in return. Money eliminates this problem by acting as a <strong>medium of exchange</strong>,
        removing the need for double coincidence.
      </>
    ),
  },
  {
    q: "What are modern forms of money? Who authorises currency in India?",
    a: (
      <>
        Modern forms of money include <strong>currency (paper notes and coins)</strong> and <strong>demand
        deposits with banks</strong>. Currency is accepted because it is <strong>authorised by the government</strong>.
        In India, the <strong>Reserve Bank of India (RBI) issues currency notes</strong> on behalf of the central
        government. No other individual or organisation is allowed to issue currency. By law, no individual in India
        can legally <strong>refuse a payment made in rupees</strong>.
      </>
    ),
  },
  {
    q: "What are demand deposits? What is a cheque?",
    a: (
      <>
        <strong>Demand deposits</strong> are deposits with banks that can be withdrawn on demand (at any time) by the
        account holder. They are considered money because they can be used for payments. A <strong>cheque</strong> is a
        paper instructing the bank to <strong>pay a specific amount from the person's account</strong> to the person in
        whose name the cheque is issued. The facility of cheques against demand deposits allows payments to be settled
        <strong> directly without using cash</strong>.
      </>
    ),
  },
  {
    q: "How do banks mediate between depositors and borrowers? How do they earn income?",
    a: (
      <>
        Banks accept deposits and pay interest to depositors. They use the <strong>major portion of these deposits
        to give out loans</strong> to borrowers at a higher interest rate. They keep only a small proportion as cash
        reserve to pay depositors who want to withdraw. Banks <strong>mediate between those with surplus funds</strong>
        (depositors) and those in need of funds (borrowers). Their main income is the <strong>difference between the
        interest charged on loans and the interest paid on deposits</strong>.
      </>
    ),
  },
  {
    q: "What are the terms of credit?",
    a: (
      <>
        Every loan agreement specifies certain conditions collectively called <strong>terms of credit</strong>. They include:
        <br /><br />
        • <strong>Interest rate</strong> — the rate the borrower must pay along with repayment of the principal.
        <br />
        • <strong>Collateral</strong> — an asset owned by the borrower used as a guarantee until the loan is repaid.
        <br />
        • <strong>Documentation requirement</strong> — paperwork required to apply for and obtain the loan.
        <br />
        • <strong>Mode of repayment</strong> — how and when the loan must be repaid.
      </>
    ),
  },
  {
    q: "What is collateral? Give examples.",
    a: (
      <>
        <strong>Collateral</strong> is an asset that the borrower owns and uses as a guarantee to the lender until the
        loan is repaid. If the borrower fails to repay, the lender has the right to sell the collateral to recover the
        loan amount. Examples of collateral include: <strong>land, building, vehicle, livestock, and deposits
        with banks</strong>. The absence of collateral is one of the main reasons why the poor are unable to access
        bank loans.
      </>
    ),
  },
  {
    q: "What is the role of the RBI in supervising formal credit?",
    a: (
      <>
        The <strong>Reserve Bank of India (RBI)</strong> supervises the functioning of formal sources of loans. Its role includes:
        <br /><br />
        • Monitoring that banks maintain a <strong>minimum cash balance</strong> from deposits received.
        <br />
        • Requiring banks to <strong>periodically submit information</strong> on how much they are lending, to whom, and at what interest rate.
        <br />
        • Ensuring banks follow fair lending practices.
        <br /><br />
        There is <strong>no such supervisory body for the informal sector</strong> — informal lenders can charge any rate and use unfair means to recover money.
      </>
    ),
  },
  {
    q: "What is the difference between formal and informal sector credit?",
    a: (
      <>
        <strong>Formal sector credit</strong> comes from banks and cooperatives. It is supervised by the RBI,
        charges regulated interest rates, requires documentation, and is generally cheaper.
        <br /><br />
        <strong>Informal sector credit</strong> comes from moneylenders, traders, employers, relatives, and friends.
        There is <strong>no regulation or supervision</strong>. Lenders can charge any interest rate and use
        unfair means to recover money. The cost of borrowing is <strong>much higher</strong> for the poor who depend on it.
      </>
    ),
  },
  {
    q: "Who gets formal credit and who gets informal credit in India?",
    a: (
      <>
        There is a sharp inequality in access to credit in India:
        <br /><br />
        • <strong>85% of loans taken by poor urban households</strong> come from informal sources.
        <br />
        • <strong>90% of loans taken by richer urban households</strong> come from formal sources (only 10% from informal).
        <br />
        • The formal sector meets only about <strong>half the total credit needs of rural people</strong> — the rest comes from informal sources.
        <br /><br />
        Rich households access cheap formal credit; <strong>poor households pay high informal rates</strong>. This inequality must be addressed for equitable development.
      </>
    ),
  },
  {
    q: "What are Self-Help Groups (SHGs)? Why were they formed?",
    a: (
      <>
        <strong>Self-Help Groups (SHGs)</strong> are groups of poor people (mainly women) who pool their savings
        and lend to members at reasonable rates. They were formed because:
        <br /><br />
        • Banks are <strong>not present everywhere</strong> in rural India.
        <br />
        • Getting a bank loan is difficult — the <strong>absence of collateral</strong> is a major barrier.
        <br />
        • Moneylenders charge very high rates, <strong>keep no records</strong>, and harass poor borrowers.
        <br /><br />
        SHGs provide an alternative to exploitative informal lenders and help the poor access <strong>organised,
        affordable credit</strong> without collateral.
      </>
    ),
  },
  {
    q: "Why is cheap and affordable credit important for development?",
    a: (
      <>
        Cheap and affordable credit is crucial because:
        <br /><br />
        • High cost of borrowing means a <strong>large part of earnings goes to repaying loans</strong> instead of improving living standards.
        <br />
        • Informal loans can trap poor households in a <strong>debt cycle</strong> — borrowing more to repay earlier debts.
        <br />
        • Affordable credit allows farmers, small businesses, and households to <strong>invest, grow, and improve income</strong>.
        <br />
        • It is necessary that <strong>formal credit is distributed more equally</strong> so that the poor benefit from cheaper loans and are not left dependent on exploitative moneylenders.
      </>
    ),
  },
];

export default function MoneyAndCredit() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="mac-root">

        {/* ── HERO ── */}
        <div className="mac-hero">
          <div className="mac-hero-dots" />
          <div className="mac-hero-symbol">₹</div>
          <div className="mac-glow-a" />
          <div className="mac-glow-b" />
          <div className="mac-hero-bg-num">03</div>
          <div className="mac-hero-inner">
            <div className="mac-overline">Economics · Class 10 · Chapter 3</div>
            <h1 className="mac-hero-title">
              <em>Money</em> &amp;<br />
              <span className="em2">Credit</span>
            </h1>
            <div className="mac-hero-bar">
              {[
                { label: "Subject",  value: "Economics" },
                { label: "Class",   value: "10th Standard" },
                { label: "Chapter", value: "Chapter 3" },
                { label: "Board",   value: "CBSE / NCERT" },
              ].map((x) => (
                <div className="mac-hero-bar-item" key={x.label}>
                  <div className="mac-bar-label">{x.label}</div>
                  <div className="mac-bar-value">{x.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="mac-body">

          {/* Intro */}
          <div className="mac-intro-card">
            <p>
              <strong>Money</strong> is the lifeblood of a modern economy — it acts as a medium of exchange,
              eliminating the cumbersome need for a double coincidence of wants that plagued the ancient barter system.
            </p>
            <p>
              But access to <strong>credit</strong> — and at what cost — determines who can grow and who stays trapped.
              Understanding the formal and informal credit systems is key to understanding India's development challenge.
            </p>
          </div>

          {/* ── SECTION 1: Money as Medium of Exchange ── */}
          <div className="mac-sec-head">
            <div className="mac-sec-num">1</div>
            <div className="mac-sec-title-wrap">
              <div className="mac-sec-kicker">Core Concept</div>
              <h2 className="mac-sec-title">Money as a <span>Medium of Exchange</span></h2>
            </div>
          </div>

          <p className="mac-body-text">
            A person holding money can exchange it for <strong>any commodity or service</strong> they want.
            This is why everyone prefers to receive payments in money. But before money existed, people used
            the barter system — which had a critical flaw.
          </p>

          <div className="mac-term-box">
            <div className="mac-term-icon">🔄</div>
            <div>
              <div className="mac-term-label">Key Concept</div>
              <div className="mac-term-name">Double Coincidence of Wants</div>
              <div className="mac-term-def">
                A situation in the barter system where <strong>what one person wants to sell is exactly what the
                other person wants to buy</strong>. Both parties must agree to sell and buy each other's
                commodities simultaneously — a condition that is very hard to meet in practice.
              </div>
            </div>
          </div>

          <div className="mac-barter-split">
            <div className="mac-bs-col barter">
              <span className="mac-bs-badge">❌ Old System</span>
              <div className="mac-bs-heading">Barter System</div>
              <ul>
                <li>Goods exchanged <strong>directly without money</strong></li>
                <li>Requires <strong>double coincidence of wants</strong></li>
                <li>Very difficult to find the <strong>right trading partner</strong></li>
                <li>No common measure of value</li>
                <li>Very <strong>inefficient</strong> for a complex economy</li>
                <li>Examples: grain, cattle used as early money in India</li>
              </ul>
            </div>
            <div className="mac-bs-col money">
              <span className="mac-bs-badge">✅ Modern System</span>
              <div className="mac-bs-heading">Money Economy</div>
              <ul>
                <li>Money acts as <strong>intermediate step</strong> in exchange</li>
                <li><strong>Eliminates</strong> need for double coincidence</li>
                <li>Seller accepts money, buys <strong>what they need separately</strong></li>
                <li>Common measure of value for all goods</li>
                <li>Enables <strong>complex, large-scale trade</strong></li>
                <li>Anyone can transact with anyone, anytime</li>
              </ul>
            </div>
          </div>

          {/* ── SECTION 2: Modern Forms of Money ── */}
          <div className="mac-divider"><div className="mac-divider-mark" /></div>

          <div className="mac-sec-head">
            <div className="mac-sec-num">2</div>
            <div className="mac-sec-title-wrap">
              <div className="mac-sec-kicker">What is Money Today</div>
              <h2 className="mac-sec-title">Modern <span>Forms of Money</span></h2>
            </div>
          </div>

          <p className="mac-body-text">
            Before coins were introduced, a variety of objects served as money — grains and cattle in ancient India.
            Today, <strong>modern forms of money</strong> include currency and bank deposits, both closely linked to
            the banking system.
          </p>

          <div className="mac-money-grid">
            <div className="mac-money-card">
              <span className="mac-money-card-icon">💵</span>
              <div className="mac-money-card-title">Currency</div>
              <ul>
                <li>Paper notes and <strong>coins</strong></li>
                <li>Authorised by the <strong>government of India</strong></li>
                <li><strong>RBI</strong> issues notes on behalf of central government</li>
                <li>No one else can legally <strong>issue currency</strong></li>
                <li>No one can <strong>legally refuse</strong> rupee payment</li>
              </ul>
            </div>
            <div className="mac-money-card gold-top">
              <span className="mac-money-card-icon">🏦</span>
              <div className="mac-money-card-title">Demand Deposits</div>
              <ul>
                <li>Money held in a <strong>bank account</strong></li>
                <li>Can be <strong>withdrawn on demand</strong> anytime</li>
                <li>Banks pay <strong>interest</strong> on deposits</li>
                <li>Can be used to make <strong>payments via cheque</strong></li>
                <li>Constitutes <strong>money</strong> in the modern economy</li>
              </ul>
            </div>
            <div className="mac-money-card slate-top">
              <span className="mac-money-card-icon">📝</span>
              <div className="mac-money-card-title">Cheque</div>
              <ul>
                <li>Paper <strong>instructing the bank</strong> to pay</li>
                <li>Pays a <strong>specific amount</strong> from an account</li>
                <li>Made in the name of the <strong>payee</strong></li>
                <li>Settles payments <strong>without cash</strong></li>
                <li>Works only if buyer has a <strong>bank account</strong></li>
              </ul>
            </div>
          </div>

          <div className="mac-pull-quote">
            <p>
              "Demand deposits are accepted widely as a means of payment — along with currency, they constitute
              money in the modern economy. Modern forms of money are closely linked to the working of the banking system."
            </p>
            <cite>— NCERT Economics, Chapter 3</cite>
          </div>

          {/* ── SECTION 3: Loan Activities of Banks ── */}
          <div className="mac-divider"><div className="mac-divider-mark" /></div>

          <div className="mac-sec-head">
            <div className="mac-sec-num">3</div>
            <div className="mac-sec-title-wrap">
              <div className="mac-sec-kicker">The Banking Mechanism</div>
              <h2 className="mac-sec-title">Loan Activities <span>of Banks</span></h2>
            </div>
          </div>

          <p className="mac-body-text">
            Banks don't just store money — they <strong>put deposits to work</strong>. They keep only a small fraction
            as cash reserve and lend out the rest, mediating between those with surplus and those in need.
          </p>

          {/* Flow */}
          <div className="mac-flow">
            <div className="mac-flow-step">
              <div className="mac-flow-num">01</div>
              <span className="mac-flow-icon">👥</span>
              <div className="mac-flow-label">Depositors</div>
              <div className="mac-flow-title">People Deposit Money</div>
              <div className="mac-flow-desc">Account holders deposit money and earn <strong>interest</strong> from the bank</div>
            </div>
            <div className="mac-flow-step">
              <div className="mac-flow-num">02</div>
              <span className="mac-flow-icon">🏦</span>
              <div className="mac-flow-label">The Bank</div>
              <div className="mac-flow-title">Keeps Small Cash Reserve</div>
              <div className="mac-flow-desc">Retains small portion for daily withdrawals; lends out the <strong>major portion</strong></div>
            </div>
            <div className="mac-flow-step">
              <div className="mac-flow-num">03</div>
              <span className="mac-flow-icon">📤</span>
              <div className="mac-flow-label">Borrowers</div>
              <div className="mac-flow-title">Loans Extended</div>
              <div className="mac-flow-desc">Loans given at <strong>higher interest rate</strong> to those who need funds</div>
            </div>
            <div className="mac-flow-step">
              <div className="mac-flow-num">04</div>
              <span className="mac-flow-icon">💰</span>
              <div className="mac-flow-label">Bank Income</div>
              <div className="mac-flow-title">Profit from Spread</div>
              <div className="mac-flow-desc">Difference between interest <strong>charged vs paid</strong> is the bank's main income</div>
            </div>
          </div>

          <div className="mac-income-box">
            <div className="mac-income-formula">
              <span className="mac-formula-pill high">Higher Rate on Loans</span>
              <span className="mac-formula-op">−</span>
              <span className="mac-formula-pill low">Lower Rate on Deposits</span>
              <span className="mac-formula-op">=</span>
              <span className="mac-formula-pill res">Bank's Income</span>
            </div>
            <div className="mac-income-text">
              This <strong>interest rate spread</strong> is the main source of income for banks. It also
              means borrowers always pay more than depositors earn — the key reason affordable credit matters so much.
            </div>
          </div>

          {/* ── SECTION 4: Terms of Credit ── */}
          <div className="mac-divider"><div className="mac-divider-mark" /></div>

          <div className="mac-sec-head">
            <div className="mac-sec-num">4</div>
            <div className="mac-sec-title-wrap">
              <div className="mac-sec-kicker">Loan Conditions</div>
              <h2 className="mac-sec-title">Terms <span>of Credit</span></h2>
            </div>
          </div>

          <p className="mac-body-text">
            Every loan agreement specifies a set of conditions that the borrower must meet. Together,
            these are called the <strong>terms of credit</strong> — they determine how easy or hard it is for someone to borrow.
          </p>

          <div className="mac-terms-grid">
            <div className="mac-term-card">
              <span className="mac-term-card-icon">📈</span>
              <div className="mac-term-card-title">Interest Rate</div>
              <div className="mac-term-card-text">
                The rate the borrower must pay to the lender along with repayment of the <strong>principal amount</strong>.
                Formal sector interest rates are regulated; informal rates can be exploitatively high.
              </div>
            </div>
            <div className="mac-term-card">
              <span className="mac-term-card-icon">🏠</span>
              <div className="mac-term-card-title">Collateral</div>
              <div className="mac-term-card-text">
                An <strong>asset owned by the borrower</strong> used as a guarantee to the lender until the
                loan is repaid. If the borrower defaults, the lender can sell the collateral to recover the money.
              </div>
            </div>
            <div className="mac-term-card">
              <span className="mac-term-card-icon">📋</span>
              <div className="mac-term-card-title">Documentation Requirement</div>
              <div className="mac-term-card-text">
                <strong>Paperwork and proof</strong> required before a loan is granted — identity, income,
                asset ownership etc. This is a major barrier for the poor and rural borrowers.
              </div>
            </div>
            <div className="mac-term-card">
              <span className="mac-term-card-icon">🗓️</span>
              <div className="mac-term-card-title">Mode of Repayment</div>
              <div className="mac-term-card-text">
                The <strong>schedule and method of repayment</strong> — whether in instalments, lump sum,
                annually, monthly, or after harvest. Flexible repayment terms help poor borrowers significantly.
              </div>
            </div>
          </div>

          {/* ── SECTION 5: Formal vs Informal Credit ── */}
          <div className="mac-divider"><div className="mac-divider-mark" /></div>

          <div className="mac-sec-head">
            <div className="mac-sec-num">5</div>
            <div className="mac-sec-title-wrap">
              <div className="mac-sec-kicker">Two Worlds of Credit</div>
              <h2 className="mac-sec-title">Formal vs <span>Informal Sector Credit</span></h2>
            </div>
          </div>

          <p className="mac-body-text">
            Loans in India can be grouped into two major categories based on their source.
            The difference between them has enormous consequences for the borrower — especially for the poor.
          </p>

          <div className="mac-rbi-box">
            <div className="mac-rbi-icon">🏛️</div>
            <div>
              <div className="mac-rbi-title">Reserve Bank of India (RBI) — Regulator of Formal Credit</div>
              <div className="mac-rbi-text">
                The RBI <strong>supervises all formal sector lenders</strong> — banks and cooperatives. Banks must
                maintain a <strong>minimum cash balance</strong>, periodically report their lending activities
                (how much, to whom, at what rate), and follow fair practices. There is <strong>no equivalent
                regulator for the informal sector</strong> — moneylenders operate without oversight.
              </div>
            </div>
          </div>

          <div className="mac-fi-table">
            <div className="mac-fi-head">
              <div className="mac-fi-th">Aspect</div>
              <div className="mac-fi-th green">Formal Sector</div>
              <div className="mac-fi-th red">Informal Sector</div>
            </div>
            {[
              ["Sources",         "Banks, cooperatives",                   "Moneylenders, traders, employers, relatives, friends"],
              ["Supervisor",      "Reserve Bank of India (RBI)",           "No regulatory body"],
              ["Interest Rate",   "Regulated — relatively low",            "Unregulated — very high"],
              ["Documentation",   "Required — formal paperwork",           "Often none or minimal"],
              ["Collateral",      "Usually required",                      "May not require — but higher risk to borrower"],
              ["Fair Practices",  "Legally enforced",                      "No enforcement — unfair means possible"],
              ["Cost to Borrower","Lower — affordable",                    "Much higher — burdens borrowers"],
              ["Who Mainly Uses", "Rich households, urban borrowers",      "Poor households, rural areas"],
            ].map(([a, b, c]) => (
              <div className="mac-fi-row" key={a}>
                <div className="mac-fi-cell aspect">{a}</div>
                <div className="mac-fi-cell">{b}</div>
                <div className="mac-fi-cell">{c}</div>
              </div>
            ))}
          </div>

          {/* ── SECTION 6: Who Gets What ── */}
          <div className="mac-divider"><div className="mac-divider-mark" /></div>

          <div className="mac-sec-head">
            <div className="mac-sec-num">6</div>
            <div className="mac-sec-title-wrap">
              <div className="mac-sec-kicker">Credit Inequality in India</div>
              <h2 className="mac-sec-title">Formal &amp; Informal Credit — <span>Who Gets What?</span></h2>
            </div>
          </div>

          <p className="mac-body-text">
            The distribution of formal credit in India is deeply <strong>unequal</strong>. The rich access
            cheap formal loans while the poor pay high informal rates — widening the gap further.
          </p>

          <div className="mac-stats-row">
            <div className="mac-stat red-top">
              <div className="mac-stat-num">85%</div>
              <div className="mac-stat-label">Poor Urban Households — Informal Loans</div>
              <div className="mac-stat-sub">of total loans taken are from informal sources</div>
            </div>
            <div className="mac-stat gold-top">
              <div className="mac-stat-num">90%</div>
              <div className="mac-stat-label">Rich Urban Households — Formal Loans</div>
              <div className="mac-stat-sub">of total loans from formal (cheaper) sources</div>
            </div>
            <div className="mac-stat">
              <div className="mac-stat-num">~50%</div>
              <div className="mac-stat-label">Rural Credit Needs Met by Formal Sector</div>
              <div className="mac-stat-sub">Remaining half still from informal sources</div>
            </div>
          </div>

          <div className="mac-warning">
            <div className="mac-warning-head">⚠️ The Debt Trap</div>
            <div className="mac-warning-text">
              The higher cost of borrowing in the informal sector means a <strong>large part of the
              borrower's earnings goes to repaying the loan</strong>. When a poor household cannot repay,
              they borrow more — falling into a <strong>debt trap</strong>. This cycle prevents escape
              from poverty and reinforces inequality. Cheap and <strong>affordable credit is crucial
              for the country's development</strong>.
            </div>
          </div>

          <div className="mac-card-grid">
            <div className="mac-card slate">
              <div className="mac-card-tag">What Must Change</div>
              <div className="mac-card-title">Expanding Formal Credit</div>
              <ul>
                <li>Banks &amp; cooperatives must <strong>increase lending</strong> in rural areas</li>
                <li>Reduce <strong>dependence on informal sources</strong> of credit</li>
                <li>Formal credit must be <strong>distributed more equally</strong></li>
                <li>Poor must <strong>benefit from cheaper loans</strong></li>
                <li>Address collateral barrier — <strong>explore alternatives</strong></li>
              </ul>
            </div>
            <div className="mac-card dark">
              <div className="mac-card-tag">Why Banks Fail the Poor</div>
              <div className="mac-card-title">Barriers to Formal Credit</div>
              <ul>
                <li>Banks <strong>not present everywhere</strong> in rural India</li>
                <li><strong>Absence of collateral</strong> — major barrier for poor</li>
                <li>Complex <strong>documentation requirements</strong></li>
                <li>Moneylenders are <strong>more accessible</strong> — known personally</li>
                <li>But moneylenders <strong>charge exploitative rates</strong></li>
                <li>No record-keeping — borrowers left with <strong>no protection</strong></li>
              </ul>
            </div>
          </div>

          {/* ── SECTION 7: SHGs ── */}
          <div className="mac-divider"><div className="mac-divider-mark" /></div>

          <div className="mac-sec-head">
            <div className="mac-sec-num">7</div>
            <div className="mac-sec-title-wrap">
              <div className="mac-sec-kicker">Alternative Credit Solution</div>
              <h2 className="mac-sec-title">Self-Help Groups <span>for the Poor</span></h2>
            </div>
          </div>

          <p className="mac-body-text">
            To bridge the gap between the poor and formal credit, a new model emerged in recent years —
            the <strong>Self-Help Group (SHG)</strong>. It allows the poor to organise themselves,
            save collectively, and access credit without the barriers of the formal banking system.
          </p>

          <div className="mac-shg-box">
            <div className="mac-shg-badge">Newer Model · Rural Credit</div>
            <div className="mac-shg-title">Self-Help Groups (SHGs)</div>
            <div className="mac-shg-subtitle">A community-based solution for affordable credit access</div>
            <ul>
              <li>Groups of <strong>poor people (mainly women)</strong> who come together to pool savings regularly</li>
              <li>Members can <strong>borrow from the group pool</strong> at reasonable interest rates</li>
              <li>Decisions on savings, loans, and interest rates are <strong>taken by the group democratically</strong></li>
              <li>No collateral required — <strong>social trust within the group</strong> acts as the guarantee</li>
              <li>Once a group has a track record, <strong>banks are willing to lend</strong> to the entire group</li>
              <li>Moneylenders cannot charge high rates — <strong>exploitation reduced significantly</strong></li>
              <li>Moneylenders also often keep <strong>no transaction records</strong> — SHGs maintain proper accounts</li>
              <li>Help poor households become <strong>self-reliant</strong> and financially empowered</li>
            </ul>
          </div>

          <div className="mac-table-wrap">
            <div className="mac-table-title">📋 Why SHGs Work — Key Advantages Over Moneylenders</div>
            {[
              ["Interest Rate",     "Reasonable rates set by the group — much lower than moneylender rates"],
              ["Collateral",        "Not required — group solidarity and trust act as guarantee"],
              ["Record Keeping",    "Proper records maintained — transparent for all members"],
              ["Harassment",        "No harassment — democratic group governance"],
              ["Bank Access",       "Once established, group can access bank loans collectively"],
              ["Empowerment",       "Especially empowers rural women — financial independence and voice"],
            ].map(([k, v]) => (
              <div className="mac-table-row" key={k}>
                <div className="mac-table-key">{k}</div>
                <div className="mac-table-val">{v}</div>
              </div>
            ))}
          </div>

          {/* ── FAQ ── */}
          <div className="mac-divider"><div className="mac-divider-mark" /></div>

          <div className="mac-faq-header">
            <span className="mac-faq-kicker">Exam Preparation</span>
          </div>
          <h2 className="mac-faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, i) => (
            <div className={`mac-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="mac-faq-q" onClick={() => toggle(i)}>
                <span className="mac-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="mac-faq-icon">+</span>
              </button>
              <div className={`mac-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
