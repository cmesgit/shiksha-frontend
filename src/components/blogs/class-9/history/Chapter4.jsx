import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #0a0e0a;
    --ink2:       #141e14;
    --muted:      #5e6e5e;
    --paper:      #f4f8f2;
    --paper2:     #e8f0e4;
    --paper3:     #d8e8d2;
    --forest:     #1e4d2e;
    --forest2:    #143620;
    --forest-lt:  #e4f0e4;
    --bark:       #6b4226;
    --bark2:      #4e2e18;
    --moss:       #4a6e3a;
    --moss2:      #344e28;
    --gold:       #b8860b;
    --gold2:      #8b6508;
    --red:        #8b1a1a;
    --rule:       #b8ccb0;
    --earth:      #7a5c3a;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .fsc-root {
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
  }

  /* ─── HERO — deep forest dark ─── */
  .fsc-hero {
    background: linear-gradient(155deg, #040a04 0%, #081408 50%, #0a0c06 100%);
    min-height: 88vh;
    display: flex; align-items: flex-end;
    position: relative; overflow: hidden;
    padding: 0 0 64px;
  }
  .fsc-hero-bg-num {
    position: absolute; bottom: -40px; right: -20px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(240px, 38vw, 520px); font-weight: 900; line-height: 1;
    color: rgba(255,255,255,0.022); letter-spacing: -0.04em;
    user-select: none; pointer-events: none;
  }
  /* Forest green top rule */
  .fsc-hero::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #143620, #2e7d40, #4caf50, #2e7d40, #143620);
  }
  /* Subtle tree-ring watermark */
  .fsc-ring {
    position: absolute; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.016); pointer-events: none;
  }
  .fsc-hero-inner {
    max-width: 900px; width: 100%;
    margin: 0 auto; padding: 0 32px;
    position: relative; z-index: 1;
  }
  .fsc-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #4caf50; margin-bottom: 24px;
    display: flex; align-items: center; gap: 14px;
  }
  .fsc-overline::before, .fsc-overline::after {
    content: ''; flex: 0 0 40px; height: 1px; background: #4caf50;
  }
  .fsc-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(40px, 7.5vw, 84px); font-weight: 900;
    color: #fff; line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 32px;
  }
  .fsc-hero-title em        { font-style: normal; color: #4caf50; }
  .fsc-hero-title .bark-em  { color: #c8843a; }
  .fsc-hero-title .gold-em  { color: #e8c040; }
  .fsc-hero-bar {
    display: flex; flex-wrap: wrap; gap: 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 24px; margin-top: 8px;
  }
  .fsc-hero-bar-item {
    flex: 1 1 150px; padding: 0 24px 0 0;
    border-right: 1px solid rgba(255,255,255,0.1); margin-right: 24px;
  }
  .fsc-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .fsc-bar-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.35); margin-bottom: 5px;
  }
  .fsc-bar-value {
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600;
    color: rgba(255,255,255,0.75);
  }

  /* ─── BODY ─── */
  .fsc-body { max-width: 860px; margin: 0 auto; padding: 72px 32px 96px; }

  /* LEAD */
  .fsc-lead {
    border-left: 5px solid var(--forest);
    padding: 28px 36px; margin-bottom: 64px; background: var(--paper2);
  }
  .fsc-lead p {
    font-family: 'Poppins', sans-serif; font-size: 19px; font-weight: 500;
    color: var(--ink2); line-height: 1.78; margin: 0 0 14px;
  }
  .fsc-lead p:last-child { margin: 0; }
  .fsc-lead strong { color: var(--forest); }

  /* SECTION HEADER */
  .fsc-sec-head {
    display: flex; align-items: flex-start; gap: 20px;
    margin-bottom: 28px; border-bottom: 2px solid var(--rule); padding-bottom: 18px;
  }
  .fsc-sec-num {
    font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900;
    color: var(--rule); line-height: 1; flex-shrink: 0; margin-top: 4px;
  }
  .fsc-sec-title-wrap { display: flex; flex-direction: column; justify-content: flex-end; }
  .fsc-sec-kicker {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--forest); margin-bottom: 4px;
  }
  .fsc-sec-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(22px, 3.5vw, 32px); font-weight: 900;
    color: var(--ink); line-height: 1.15; letter-spacing: -0.01em;
  }
  .fsc-sec-title span       { color: var(--forest); }
  .fsc-sec-title .bark-txt  { color: var(--bark); }
  .fsc-sec-title .gold-txt  { color: var(--gold); }
  .fsc-sec-title .red-txt   { color: var(--red); }
  .fsc-sec-title .moss-txt  { color: var(--moss); }

  /* BODY TEXT */
  .fsc-body-text {
    font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 400;
    color: #141e14; line-height: 1.82; margin-bottom: 24px;
  }
  .fsc-body-text strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── REASONS GRID (2-col cards) ── */
  .fsc-reasons-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 2px; background: var(--rule); margin-bottom: 48px;
  }
  .fsc-reason-card { background: var(--paper); padding: 26px 24px; }
  .fsc-reason-card.dark  { background: var(--forest); }
  .fsc-reason-card.bark  { background: var(--bark); }
  .fsc-reason-card.moss  { background: var(--paper2); }
  .fsc-reason-icon { font-size: 28px; margin-bottom: 10px; }
  .fsc-reason-title {
    font-family: 'Montserrat', sans-serif; font-size: 17px; font-weight: 900;
    margin-bottom: 8px; letter-spacing: -0.01em;
  }
  .fsc-reason-card:not(.dark):not(.bark) .fsc-reason-title { color: var(--ink); }
  .fsc-reason-card.dark  .fsc-reason-title { color: #fff; }
  .fsc-reason-card.bark  .fsc-reason-title { color: #fff; }
  .fsc-reason-body {
    font-family: 'Inter', sans-serif; font-size: 15px; line-height: 1.74;
  }
  .fsc-reason-card:not(.dark):not(.bark) .fsc-reason-body { color: #2a3a2a; }
  .fsc-reason-card.dark  .fsc-reason-body { color: rgba(255,255,255,0.78); }
  .fsc-reason-card.bark  .fsc-reason-body { color: rgba(255,255,255,0.78); }
  .fsc-reason-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; }
  .fsc-reason-card:not(.dark):not(.bark) .fsc-reason-body strong { color: var(--forest); }
  .fsc-reason-card.dark  .fsc-reason-body strong { color: #a8e0a8; }
  .fsc-reason-card.bark  .fsc-reason-body strong { color: #f0c080; }

  /* ── DEF BOX ── */
  .fsc-def-box {
    background: var(--ink); padding: 32px 36px;
    margin-bottom: 48px; border-top: 4px solid var(--forest);
  }
  .fsc-def-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; color: #4caf50; margin-bottom: 10px;
  }
  .fsc-def-term {
    font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900;
    color: #fff; letter-spacing: -0.02em; margin-bottom: 14px;
  }
  .fsc-def-text {
    font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 400;
    color: rgba(255,255,255,0.72); line-height: 1.8;
  }
  .fsc-def-text strong { color: #4caf50; font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── STAT ROW ── */
  .fsc-stat-row { display: flex; flex-wrap: wrap; gap: 2px; margin-bottom: 48px; background: var(--rule); }
  .fsc-stat-box { flex: 1 1 130px; background: var(--paper); padding: 24px 18px; text-align: center; }
  .fsc-stat-val {
    font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900;
    color: var(--forest); line-height: 1.1; margin-bottom: 6px; letter-spacing: -0.02em;
  }
  .fsc-stat-label {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 600;
    color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; line-height: 1.4;
  }

  /* ── FOREST TYPES TABLE ── */
  .fsc-forest-types {
    margin-bottom: 48px; background: var(--rule); display: grid;
    grid-template-columns: 1fr 1fr 1fr; gap: 2px;
  }
  .fsc-forest-type-card { background: var(--paper); padding: 26px 22px; }
  .fsc-forest-type-card.f1 { background: var(--forest); }
  .fsc-forest-type-card.f2 { background: var(--moss2); }
  .fsc-forest-type-card.f3 { background: var(--paper2); }
  .fsc-ft-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.18em; margin-bottom: 10px;
  }
  .fsc-forest-type-card.f1 .fsc-ft-label { color: rgba(255,255,255,0.5); }
  .fsc-forest-type-card.f2 .fsc-ft-label { color: rgba(255,255,255,0.5); }
  .fsc-forest-type-card.f3 .fsc-ft-label { color: var(--muted); }
  .fsc-ft-name {
    font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900;
    margin-bottom: 8px; letter-spacing: -0.01em;
  }
  .fsc-forest-type-card.f1 .fsc-ft-name { color: #fff; }
  .fsc-forest-type-card.f2 .fsc-ft-name { color: #fff; }
  .fsc-forest-type-card.f3 .fsc-ft-name { color: var(--ink); }
  .fsc-ft-access {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 12px;
    padding: 4px 10px; display: inline-block;
  }
  .fsc-forest-type-card.f1 .fsc-ft-access { background: rgba(255,255,255,0.15); color: #f87171; }
  .fsc-forest-type-card.f2 .fsc-ft-access { background: rgba(255,255,255,0.12); color: #fbbf24; }
  .fsc-forest-type-card.f3 .fsc-ft-access { background: var(--forest-lt); color: var(--forest); }
  .fsc-ft-desc {
    font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.72;
  }
  .fsc-forest-type-card.f1 .fsc-ft-desc { color: rgba(255,255,255,0.7); }
  .fsc-forest-type-card.f2 .fsc-ft-desc { color: rgba(255,255,255,0.72); }
  .fsc-forest-type-card.f3 .fsc-ft-desc { color: var(--ink2); }
  .fsc-ft-desc strong { font-family: 'Poppins', sans-serif; font-weight: 700; }
  .fsc-forest-type-card.f1 .fsc-ft-desc strong { color: #a8e0a8; }
  .fsc-forest-type-card.f2 .fsc-ft-desc strong { color: #d0f0a0; }
  .fsc-forest-type-card.f3 .fsc-ft-desc strong { color: var(--forest); }

  /* ── FOREST OFFICIALS TIMELINE-STYLE ── */
  .fsc-timeline { margin-bottom: 48px; }
  .fsc-tl-item {
    display: grid; grid-template-columns: 120px 1fr;
    gap: 0; border-bottom: 1px solid var(--rule);
  }
  .fsc-tl-item:first-child { border-top: 1px solid var(--rule); }
  .fsc-tl-year-col {
    padding: 22px 20px 22px 0;
    border-right: 3px solid var(--forest);
    display: flex; align-items: flex-start; justify-content: flex-end;
  }
  .fsc-tl-year {
    font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 900;
    color: var(--forest); letter-spacing: 0.04em; text-align: right; line-height: 1.3;
  }
  .fsc-tl-content { padding: 22px 0 22px 24px; }
  .fsc-tl-head {
    font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 700;
    color: var(--ink); margin-bottom: 6px;
  }
  .fsc-tl-desc {
    font-family: 'Inter', sans-serif; font-size: 15px; color: #2a3a2a; line-height: 1.76;
  }
  .fsc-tl-desc strong { color: var(--forest); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── CONTRAST BLOCK (2-col) ── */
  .fsc-contrast {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0; background: var(--rule); margin-bottom: 48px;
  }
  .fsc-contrast-col { background: var(--paper2); padding: 28px 26px; }
  .fsc-contrast-col.dark { background: var(--forest2); border-left: 1px solid rgba(255,255,255,0.06); }
  .fsc-contrast-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.18em; margin-bottom: 14px;
  }
  .fsc-contrast-label.forest-lbl { color: var(--forest); }
  .fsc-contrast-label.red-lbl    { color: var(--red); }
  .fsc-contrast-label.bark-lbl   { color: var(--bark); }
  .fsc-contrast-col ul { padding-left: 18px; margin: 0; }
  .fsc-contrast-col ul li { font-size: 15px; line-height: 1.74; margin-bottom: 9px; }
  .fsc-contrast-col:not(.dark) ul li { color: var(--ink2); }
  .fsc-contrast-col.dark ul li { color: rgba(255,255,255,0.72); }
  .fsc-contrast-col ul li strong { font-family: 'Poppins', sans-serif; font-weight: 700; }
  .fsc-contrast-col:not(.dark) ul li strong { color: var(--ink); }
  .fsc-contrast-col.dark ul li strong { color: #fff; }

  /* ── REBELLION HIGHLIGHT ── */
  .fsc-rebellion {
    background: var(--bark); padding: 32px 36px; margin-bottom: 48px;
    position: relative; overflow: hidden;
  }
  .fsc-rebellion::before {
    content: '🔥'; position: absolute; right: 20px; top: 10px;
    font-size: 140px; line-height: 1; pointer-events: none; opacity: 0.1;
  }
  .fsc-rebellion-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.5); margin-bottom: 10px;
  }
  .fsc-rebellion-head {
    font-family: 'Montserrat', sans-serif; font-size: clamp(18px,2.8vw,26px); font-weight: 900;
    color: #fff; margin-bottom: 14px; position: relative; z-index: 1;
  }
  .fsc-rebellion-body {
    font-family: 'Inter', sans-serif; font-size: 16px;
    color: rgba(255,255,255,0.88); line-height: 1.78; position: relative; z-index: 1;
  }
  .fsc-rebellion-body strong { color: #fff; font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── JAVA SECTION — GREEN DARK BLOCK ── */
  .fsc-java {
    background: var(--forest); padding: 36px 36px 28px; margin-bottom: 48px;
    border-top: 4px solid var(--gold);
  }
  .fsc-java-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.22em; color: rgba(255,255,255,0.4); margin-bottom: 14px;
  }
  .fsc-java-head {
    font-family: 'Montserrat', sans-serif; font-size: clamp(18px,2.8vw,24px); font-weight: 900;
    color: #e8c040; margin-bottom: 18px;
  }
  .fsc-java-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .fsc-java-col-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.16em; margin-bottom: 12px;
  }
  .fsc-java-col-label.people  { color: #a8e0a8; }
  .fsc-java-col-label.events  { color: #fbbf24; }
  .fsc-java-col ul { padding-left: 18px; margin: 0; }
  .fsc-java-col ul li {
    font-size: 14px; line-height: 1.72; color: rgba(255,255,255,0.68); margin-bottom: 8px;
  }
  .fsc-java-col ul li strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: #fff; }

  /* ── INFO TABLE ── */
  .fsc-table-wrap { margin-bottom: 48px; border: 1px solid var(--rule); }
  .fsc-table-title {
    background: var(--ink); padding: 14px 24px;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    color: #4caf50; letter-spacing: 0.06em; text-transform: uppercase;
  }
  .fsc-table-row {
    display: grid; grid-template-columns: 190px 1fr;
    border-bottom: 1px solid var(--rule);
  }
  .fsc-table-row:last-child { border-bottom: none; }
  .fsc-table-key {
    background: var(--paper2); padding: 14px 18px;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    color: var(--forest); border-right: 1px solid var(--rule);
    display: flex; align-items: center;
  }
  .fsc-table-val {
    padding: 14px 18px;
    font-family: 'Inter', sans-serif; font-size: 15px; line-height: 1.65; color: #374151;
  }
  .fsc-table-val strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── PERSON CARD ── */
  .fsc-person {
    display: grid; grid-template-columns: 80px 1fr;
    gap: 0; margin-bottom: 20px; background: var(--paper2);
    border-left: 5px solid var(--forest);
  }
  .fsc-person-initial-col {
    background: var(--forest); display: flex; align-items: center; justify-content: center;
  }
  .fsc-person-initial {
    font-family: 'Montserrat', sans-serif; font-size: 36px; font-weight: 900; color: #fff;
  }
  .fsc-person-content { padding: 20px 24px; }
  .fsc-person-name {
    font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900;
    color: var(--ink); margin-bottom: 3px;
  }
  .fsc-person-role {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.14em; color: var(--forest); margin-bottom: 12px;
  }
  .fsc-person-content ul { padding-left: 18px; margin: 0; }
  .fsc-person-content ul li {
    font-size: 15px; line-height: 1.72; color: var(--ink2); margin-bottom: 7px;
  }
  .fsc-person-content ul li strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--forest); }

  /* ── BULLET LIST ── */
  .fsc-list { margin: 0 0 28px; padding: 0; list-style: none; }
  .fsc-list li {
    font-size: 16px; line-height: 1.78; color: #141e14;
    padding: 10px 0 10px 28px; position: relative;
    border-bottom: 1px solid var(--rule);
  }
  .fsc-list li:first-child { border-top: 1px solid var(--rule); }
  .fsc-list li::before {
    content: ''; position: absolute; left: 0; top: 18px;
    width: 10px; height: 10px;
    border: 2px solid var(--forest); transform: rotate(45deg);
  }
  .fsc-list li strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── PULL QUOTE ── */
  .fsc-pull-quote {
    margin: 40px 0; padding: 32px 40px;
    background: var(--ink); position: relative;
  }
  .fsc-pull-quote::before {
    content: '"'; position: absolute; top: -18px; left: 28px;
    font-family: 'Montserrat', sans-serif; font-size: 120px; font-weight: 900;
    color: var(--forest); line-height: 1;
  }
  .fsc-pull-quote p {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(17px,2.4vw,22px); font-weight: 800;
    color: #fff; line-height: 1.45; letter-spacing: -0.01em;
    position: relative; z-index: 1; margin-bottom: 12px;
  }
  .fsc-pull-quote cite {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600;
    color: #4caf50; text-transform: uppercase; letter-spacing: 0.12em; font-style: normal;
  }

  /* ── SECTION DIVIDER ── */
  .fsc-divider { display: flex; align-items: center; gap: 16px; margin: 56px 0; }
  .fsc-divider::before, .fsc-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .fsc-divider-mark { width: 10px; height: 10px; background: var(--forest); transform: rotate(45deg); flex-shrink: 0; }

  /* ── FAQ ── */
  .fsc-faq-header {
    border-bottom: 3px solid var(--ink); padding-bottom: 14px; margin-bottom: 0;
    display: flex; align-items: baseline; gap: 16px;
  }
  .fsc-faq-kicker {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--forest);
  }
  .fsc-faq-title {
    font-family: 'Montserrat', sans-serif; font-size: clamp(24px,4vw,34px); font-weight: 900;
    color: var(--ink); letter-spacing: -0.01em; margin: 20px 0 32px;
  }
  .fsc-faq-item { border-bottom: 1px solid var(--rule); overflow: hidden; }
  .fsc-faq-item.open { background: var(--paper2); }
  .fsc-faq-q {
    width: 100%; text-align: left; background: none; border: none; cursor: pointer;
    padding: 20px 0; display: grid; grid-template-columns: 1fr 32px;
    gap: 16px; align-items: start;
  }
  .fsc-faq-q-text {
    font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 600;
    color: var(--ink); line-height: 1.5; text-align: left; padding-left: 4px;
  }
  .fsc-faq-item.open .fsc-faq-q-text { color: var(--forest2); }
  .fsc-faq-icon {
    width: 28px; height: 28px; border: 1.5px solid var(--rule);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; color: var(--forest); flex-shrink: 0; margin-top: 2px;
  }
  .fsc-faq-item.open .fsc-faq-icon { background: var(--ink); border-color: var(--ink); color: #4caf50; }
  .fsc-faq-ans {
    display: none; padding: 0 4px 22px;
    font-size: 16px; line-height: 1.82; color: #374151;
  }
  .fsc-faq-ans.visible { display: block; }
  .fsc-faq-ans ul { padding-left: 20px; margin: 8px 0; }
  .fsc-faq-ans ul li { margin-bottom: 7px; }
  .fsc-faq-ans strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }
  .fsc-faq-ans p { margin: 0 0 10px; }
  .fsc-faq-ans p:last-child { margin: 0; }

  @media (max-width: 620px) {
    .fsc-hero          { min-height: auto; padding: 80px 0 48px; }
    .fsc-reasons-grid  { grid-template-columns: 1fr; }
    .fsc-forest-types  { grid-template-columns: 1fr; }
    .fsc-contrast      { grid-template-columns: 1fr; }
    .fsc-java-grid     { grid-template-columns: 1fr; }
    .fsc-person        { grid-template-columns: 60px 1fr; }
    .fsc-tl-item       { grid-template-columns: 80px 1fr; }
    .fsc-table-row     { grid-template-columns: 120px 1fr; }
  }
`;

const faqs = [
  {
    q: "What is deforestation? What were the main reasons for deforestation under colonial rule?",
    a: (<>
      <p><strong>Deforestation</strong> refers to the disappearance of forests. Under colonial rule it became very <strong>systematic and extensive</strong> — not accidental but a deliberate policy. The main reasons were:</p>
      <ul>
        <li><strong>Growing population and demand for food:</strong> As population increased over the centuries, demand for food went up. Peasants extended the boundaries of cultivation by <strong>clearing forests</strong> to create farmland</li>
        <li><strong>British demand for commercial crops:</strong> The British encouraged production of commercial crops like <strong>jute, sugar, wheat, and cotton</strong> for their industries as raw material — these required large areas of cleared land</li>
        <li><strong>Forests seen as unproductive:</strong> The British thought forests were <strong>unproductive land</strong> as they yielded no revenue nor agricultural produce. Cultivation was viewed as a sign of progress — leaving forest standing was seen as wasteful</li>
        <li><strong>Timber for the Royal Navy:</strong> Oak forests in England were disappearing, leaving no timber supply for the shipbuilding industry. The <strong>forest resources of India were used to make ships for the Royal Navy</strong></li>
        <li><strong>Railways — land and fuel:</strong> The spread of railways required two things: land to be cleared for railway tracks, and <strong>wood as fuel for locomotives and for railway line sleepers (the wooden beams holding rails in place)</strong></li>
        <li><strong>Plantations:</strong> Large areas of natural forests were cleared for <strong>tea, coffee, and rubber plantations</strong>. Land was given to planters at cheap rates by the colonial government</li>
      </ul>
    </>),
  },
  {
    q: "What was Commercial Forestry? Who was Dietrich Brandis and what was his contribution?",
    a: (<>
      <p>Commercial Forestry was the British system of managing Indian forests primarily for timber production and commercial profit, rather than for the benefit of local communities:</p>
      <ul>
        <li>The British were worried that <strong>use of forests by local people and reckless felling by traders</strong> would destroy forests entirely — but their concern was protecting timber supply, not the ecosystem</li>
        <li>They invited <strong>Dietrich Brandis</strong>, a German expert, as the <strong>first Inspector General of Forests in India</strong> — bringing European scientific forestry methods to India</li>
        <li>Brandis set up the <strong>Indian Forest Service in 1864</strong> and helped formulate the <strong>Indian Forest Act of 1865</strong> — the first legal framework for controlling India's forests</li>
        <li>The <strong>Imperial Forest Research Institute</strong> was set up in <strong>Dehradun in 1906</strong> where scientific forestry was taught</li>
        <li><strong>Scientific forestry:</strong> In this system, forests with different kinds of trees were <strong>replaced by single-species plantations</strong>. Forest management plans were made by forest officials — they planned exactly how much had to be cut and how much replanted</li>
        <li>The result was that forests became managed like a crop — maximising timber output for commercial and military use, at the expense of biodiversity and local communities</li>
      </ul>
    </>),
  },
  {
    q: "What were Reserved Forests, Protected Forests, and Village Forests? How did the Forest Acts affect local people?",
    a: (<>
      <p>The Forest Acts divided forests into different categories with very different levels of access for local people:</p>
      <ul>
        <li><strong>Reserved Forests:</strong> These were the best and most valuable forests — the finest timber trees. <strong>Villagers could not enter these forests at all</strong>. No grazing, cutting, hunting, or collecting was permitted</li>
        <li><strong>Protected Forests:</strong> Villagers had some limited access — they could take wood for fuel and house building from here, but under strict regulations</li>
        <li><strong>Village Forests:</strong> The most accessible category — communities had greater rights to use these forests for local needs</li>
      </ul>
      <p><strong>Impact on local people:</strong></p>
      <ul>
        <li>Lives of forest communities and nearby villagers were <strong>entirely dependent on forests</strong> — their fuel, fodder, and even food came from forests</li>
        <li>As these people were <strong>not allowed to use forests</strong> freely under the new laws, their lives became extremely difficult</li>
        <li><strong>Shifting cultivation (swidden agriculture)</strong> was the traditional farming practice in many parts of Asia, Africa and South America. Colonial foresters opposed it because: it made it <strong>difficult to calculate taxes</strong>, they feared fires spreading, and believed trees couldn't grow on land used this way</li>
        <li>Banning shifting cultivation <strong>destroyed the livelihoods of entire communities</strong> who had practised this sustainable agriculture for generations</li>
        <li><strong>Hunting laws:</strong> Forest laws stopped villagers from hunting in the forests but <strong>encouraged it as a sport for the British</strong>. Colonisers believed wild animals were savage — just like Indian society — and it was their duty to "civilise" both</li>
      </ul>
    </>),
  },
  {
    q: "What new trade and employment opportunities came with colonial forestry? Were they beneficial?",
    a: (<>
      <p>Colonial control of forests created new economic opportunities — but they came with significant costs and were rarely truly beneficial to local communities:</p>
      <ul>
        <li>As the <strong>forest department took control of forests</strong>, new opportunities opened in forest-related trade — timber, forest products, and plantation labour</li>
        <li>The <strong>Mundurucu peoples of the Brazilian Amazon</strong> are one example of a community that engaged in new forest trade as colonial influence spread to their region</li>
        <li>However, with colonial influence, <strong>trade was completely regulated by the government</strong> — local people lost the freedom to trade independently</li>
        <li><strong>Large European trading firms were given the sole right</strong> to trade in forest products of particular areas — creating monopolies that excluded local traders</li>
        <li><strong>Many pastoral communities lost their means of livelihood</strong> — they could no longer graze animals in reserved forests, collect forest products, or practise seasonal migration through forest lands</li>
        <li>Most critically, the notes point out: <strong>"New opportunities of work did not always mean improved well-being for the people."</strong> People might have found employment as forest labourers or plantation workers — but at wages and conditions set entirely by colonial authorities, with no rights or security</li>
      </ul>
    </>),
  },
  {
    q: "What was the Bastar Rebellion? Why did the people of Bastar rebel against the British?",
    a: (<>
      <p>The Bastar Rebellion was one of the most significant forest rebellions in colonial India — a direct response to British forest policies that threatened the very identity and survival of forest communities:</p>
      <ul>
        <li><strong>Who are the people of Bastar:</strong> The people of Bastar held a deep, spiritual connection to their forests. They believed that <strong>the land was given to them by the earth and in return they looked after the earth</strong> — a profound sense of mutual responsibility with nature. Their entire <strong>cultural and social life was connected to the forest</strong></li>
        <li><strong>The trigger:</strong> When the British began implementing forest reservations in Bastar, it directly threatened this way of life. The initiative was taken by the <strong>Dhurwas of the Kanger forest</strong> — the area where reservation first took place</li>
        <li><strong>The rebellion:</strong> Forest communities rose up in rebellion against the changes imposed upon them. They refused to accept the loss of their forests and the livelihoods that depended on them</li>
        <li><strong>The British response:</strong> The British sent troops to suppress the rebellion. It took them <strong>three months to regain control</strong> — indicating the scale and determination of the uprising</li>
        <li><strong>The partial victory:</strong> A significant victory for the people of Bastar was that <strong>work on reservation was suspended and the area designated for reservation was reduced to half</strong> — showing that resistance could win concessions even from colonial authorities</li>
      </ul>
    </>),
  },
  {
    q: "What was the situation in Java under Dutch colonial rule? Who were the Kalangs?",
    a: (<>
      <p>Java — now famous as a rice-producing island of Indonesia — was once covered with forests. Under Dutch colonialism, it underwent the same process of systematic deforestation as India did under the British:</p>
      <ul>
        <li><strong>The Kalangs:</strong> The Kalangs were <strong>skilled forest cutters and shifting cultivators</strong> — a community whose entire livelihood and identity was built around the forests of Java</li>
        <li>They rose in <strong>rebellion against the Dutch in 1770</strong> — one of the earliest recorded forest rebellions against European colonialism in Southeast Asia. Their uprising was suppressed by Dutch forces</li>
        <li><strong>Scientific Forestry in Java:</strong> Forest laws were enacted in Java, modelled on European scientific forestry principles. The villagers <strong>resisted these laws</strong> just as Indian communities had. Forest timber was used for <strong>ships and railway sleepers</strong> — the same colonial industrial demands as in India</li>
        <li><strong>The balandongdiensten system:</strong> The Dutch government used this system for <strong>extracting free labour from villagers</strong> — essentially forced unpaid labour for the colonial forest economy. This system was deeply exploitative and resented by local communities</li>
      </ul>
    </>),
  },
  {
    q: "What was Samin's Movement in Java? How did the villagers protest?",
    a: (<>
      <p>Samin's Movement was a remarkable example of non-violent, principled resistance against Dutch colonial forest laws — long before such strategies became famous elsewhere in the world:</p>
      <ul>
        <li><strong>Surontiko Samin</strong> was from <strong>Randublatung village</strong> — a teak forest village in Java whose entire community depended on the forest</li>
        <li>Samin <strong>questioned the very legitimacy of state ownership of forests</strong> — arguing that the forests belonged to the communities that had lived in and cared for them for generations, not to the Dutch colonial government</li>
        <li>His ideas sparked a <strong>widespread movement</strong> across teak forest villages — demonstrating that the resistance was not just personal but reflected deep communal grievances</li>
        <li><strong>Methods of protest:</strong> The followers of Samin protested in creative, non-violent ways:
          <ul>
            <li><strong>Lying on the ground</strong> when Dutch surveyors came to survey the land — physically obstructing colonial measurement and appropriation</li>
            <li><strong>Refusing to pay taxes</strong> — a direct economic challenge to colonial authority</li>
            <li><strong>Refusing to perform labour</strong> — rejecting the balandongdiensten forced labour system entirely</li>
          </ul>
        </li>
        <li>Samin's movement demonstrated that ordinary forest villagers could resist colonial power through principled, peaceful non-cooperation — a strategy that would later inspire independence movements across Asia</li>
      </ul>
    </>),
  },
  {
    q: "How did the World Wars affect forests in India and Java?",
    a: (<>
      <p>Both World Wars had a devastating and accelerating impact on forests — ironically, in opposite ways in different colonies:</p>
      <p><strong>In India (British colonies):</strong></p>
      <ul>
        <li>The <strong>forest department cut freely</strong> during both World Wars to meet British wartime demands</li>
        <li>Enormous quantities of timber were extracted for railway sleepers, military construction, ships, and fuel — far beyond normal commercial rates</li>
        <li>The wartime emergency was used to justify bypassing the limited protections that even the Forest Acts had established</li>
        <li>Forest communities had no say — their forests were stripped for imperial war needs</li>
      </ul>
      <p><strong>In Java (Dutch colony, World War II):</strong></p>
      <ul>
        <li>The Dutch followed the <strong>"scorched earth" policy</strong> as Japanese forces advanced — <strong>destroying saw mills and burning logs of teak</strong> so that the Japanese could not benefit from the forest resources</li>
        <li>When the <strong>Japanese occupied the area</strong>, they <strong>forced the villagers to cut down forests</strong> at a rapid pace to meet their own military and industrial needs</li>
        <li>Java's forests were thus devastated twice — first by Dutch destruction, then by Japanese exploitation — leaving communities with nothing</li>
      </ul>
    </>),
  },
  {
    q: "What new developments have taken place in forest conservation? What is the role of local communities?",
    a: (<>
      <p>The lessons of colonial-era deforestation and the rebellions it sparked have gradually led to a fundamentally different approach to forests:</p>
      <ul>
        <li><strong>Shift from timber to conservation:</strong> <strong>Conservation and preservation of forests has now become the focus</strong> rather than timber extraction. Forests are valued for biodiversity, climate regulation, and ecological balance — not just commercial wood</li>
        <li><strong>Community involvement recognised as essential:</strong> It has been realised that <strong>if forests are to survive, the local community needs to be involved</strong>. Colonial forestry that excluded communities destroyed both forests and livelihoods. Modern conservation recognises that communities who depend on forests are its best protectors</li>
        <li><strong>Sacred groves in India:</strong> There are many examples in India where <strong>communities are conserving forests in sacred groves</strong> — patches of forest protected by religious and cultural traditions. These have survived for centuries because communities valued them</li>
        <li><strong>Community-based conservation:</strong> This looking after is done by <strong>each member of the village and everyone is involved</strong> — it is participatory, democratic, and effective in ways that top-down colonial management never was</li>
        <li>The colonial experience taught the world that forests cannot be saved by laws and guards alone — they survive because the people who live alongside them <strong>feel ownership, responsibility, and a deep connection</strong> to them</li>
      </ul>
    </>),
  },
];

export default function ForestSocietyAndColonialism() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="fsc-root">

        {/* HERO */}
        <div className="fsc-hero">
          {[120, 240, 360, 480, 600].map((size, i) => (
            <div key={i} className="fsc-ring" style={{ width:`${size}px`, height:`${size}px`, top:'50%', left:'60%', transform:'translate(-50%,-50%)' }} />
          ))}
          <div className="fsc-hero-bg-num">04</div>
          <div className="fsc-hero-inner">
            <div className="fsc-overline">Class 9 · Social Science · History</div>
            <h1 className="fsc-hero-title">
              <em>Forest</em> Society<br />&amp; <span className="bark-em">Colonialism</span>
            </h1>
            <div className="fsc-hero-bar">
              {[
                { label:"Subject",  value:"History" },
                { label:"Chapter",  value:"Chapter 4" },
                { label:"Period",   value:"19th–20th Century" },
                { label:"Regions",  value:"India & Java" },
                { label:"FAQs",     value:"9 Questions" },
              ].map(({ label, value }) => (
                <div className="fsc-hero-bar-item" key={label}>
                  <div className="fsc-bar-label">{label}</div>
                  <div className="fsc-bar-value">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="fsc-body">

          {/* LEAD */}
          <div className="fsc-lead">
            <p>
              For thousands of years, forest communities across Asia, Africa, and the Americas lived in deep harmony with their forests — depending on them for food, fuel, shelter, and identity. Then colonial rule arrived with a single-minded purpose: to extract timber, clear land, and collect revenue.
            </p>
            <p>
              This chapter traces how <strong>colonialism systematically destroyed forests</strong> and the communities that depended on them — and how those communities fought back through rebellions, movements, and quiet resistance.
            </p>
          </div>

          {/* 1. Deforestation */}
          <div className="fsc-sec-head">
            <div className="fsc-sec-num">1</div>
            <div className="fsc-sec-title-wrap">
              <div className="fsc-sec-kicker">The Vanishing Forests</div>
              <h2 className="fsc-sec-title"><span>Deforestation</span> Under Colonial Rule</h2>
            </div>
          </div>

          <p className="fsc-body-text">
            <strong>Deforestation</strong> — the disappearance of forests — is not new. But under colonial rule it became <strong>very systematic and extensive</strong>. Unlike the gradual clearing of earlier centuries, colonial deforestation was organised, large-scale, and driven by the demands of industrial Europe.
          </p>

          <div className="fsc-def-box">
            <div className="fsc-def-label">Key Term</div>
            <div className="fsc-def-term">Deforestation</div>
            <div className="fsc-def-text">
              The disappearance of forests — through clearing for agriculture, logging for timber, burning for plantations, or laying of railway tracks. Under <strong>colonial rule it became very systematic and extensive</strong> — driven not by local need but by imperial industrial demands. Colonial governments viewed forests as <strong>unproductive land</strong> and their clearing as "progress" — a mindset that destroyed ecosystems and communities that had sustained themselves in those forests for generations.
            </div>
          </div>

          <div className="fsc-stat-row">
            {[
              { val:"1864",    label:"Indian Forest Service Founded" },
              { val:"1865",    label:"Indian Forest Act Passed" },
              { val:"1906",    label:"Imperial Forest Research Institute, Dehradun" },
              { val:"1770",    label:"Kalangs Rebellion in Java" },
            ].map(({ val, label }) => (
              <div className="fsc-stat-box" key={label}>
                <div className="fsc-stat-val">{val}</div>
                <div className="fsc-stat-label">{label}</div>
              </div>
            ))}
          </div>

          <div className="fsc-divider"><div className="fsc-divider-mark" /></div>

          {/* 2. Reasons for Deforestation */}
          <div className="fsc-sec-head">
            <div className="fsc-sec-num">2</div>
            <div className="fsc-sec-title-wrap">
              <div className="fsc-sec-kicker">Why Forests Were Destroyed</div>
              <h2 className="fsc-sec-title">Reasons for <span>Deforestation</span></h2>
            </div>
          </div>

          <p className="fsc-body-text">
            Colonial deforestation was driven by multiple overlapping demands — from feeding a growing population to fuelling an industrial empire. Each of these reasons stripped another layer from India's ancient forests.
          </p>

          <div className="fsc-reasons-grid">
            <div className="fsc-reason-card">
              <div className="fsc-reason-icon">🌾</div>
              <div className="fsc-reason-title">Agriculture & Population Growth</div>
              <div className="fsc-reason-body">As <strong>population increased over the centuries</strong> and the demand for food went up, peasants extended the boundaries of cultivation by <strong>clearing forests</strong> to create new farmland. The British actively encouraged this — cultivation was viewed as a sign of progress.</div>
            </div>
            <div className="fsc-reason-card dark">
              <div className="fsc-reason-icon">🏭</div>
              <div className="fsc-reason-title">Commercial Crops for British Industry</div>
              <div className="fsc-reason-body">The British encouraged production of commercial crops like <strong>jute, sugar, wheat, and cotton</strong> for their industries as raw material. Vast forest areas were cleared to grow these crops — forests existed for empire, not for communities.</div>
            </div>
            <div className="fsc-reason-card bark">
              <div className="fsc-reason-icon">⚓</div>
              <div className="fsc-reason-title">Timber for the Royal Navy</div>
              <div className="fsc-reason-body">Oak forests in England were disappearing — there was <strong>no timber supply for the shipbuilding industry</strong>. The <strong>forest resources of India were used to make ships for the Royal Navy</strong>. India's forests were stripped to maintain British naval supremacy.</div>
            </div>
            <div className="fsc-reason-card moss">
              <div className="fsc-reason-icon">🚂</div>
              <div className="fsc-reason-title">Railways — Land & Sleepers</div>
              <div className="fsc-reason-body">The spread of railways required two things: <strong>land to be cleared to lay railway tracks</strong>, and <strong>wood as fuel for locomotives and for railway line sleepers</strong> (the wooden beams holding rails in place). Forests were felled at enormous scale to build and run the railways.</div>
            </div>
            <div className="fsc-reason-card">
              <div className="fsc-reason-icon">🍵</div>
              <div className="fsc-reason-title">Tea, Coffee & Rubber Plantations</div>
              <div className="fsc-reason-body"><strong>Large areas of natural forests were cleared</strong> for tea, coffee, and rubber plantations. Land was given to British planters at <strong>cheap rates</strong> by the colonial government — making forest clearance economically attractive for European entrepreneurs.</div>
            </div>
            <div className="fsc-reason-card dark">
              <div className="fsc-reason-icon">📊</div>
              <div className="fsc-reason-title">Forests Seen as "Unproductive"</div>
              <div className="fsc-reason-body">The British thought that forests were <strong>unproductive land</strong> as they yielded no revenue nor agricultural produce. Cultivation was viewed as a <strong>sign of progress</strong> — leaving forests standing was seen as wasteful backwardness. This colonial mindset justified mass deforestation.</div>
            </div>
          </div>

          <div className="fsc-divider"><div className="fsc-divider-mark" /></div>

          {/* 3. Commercial Forestry */}
          <div className="fsc-sec-head">
            <div className="fsc-sec-num">3</div>
            <div className="fsc-sec-title-wrap">
              <div className="fsc-sec-kicker">The British System</div>
              <h2 className="fsc-sec-title">Commercial <span>Forestry</span></h2>
            </div>
          </div>

          <p className="fsc-body-text">
            The British were worried that unregulated felling by traders and local use by communities would destroy all forests — but their concern was protecting timber <em>supply</em>, not ecosystems or communities. Their solution was to bring forests under centralised state control using European scientific methods.
          </p>

          <div className="fsc-person">
            <div className="fsc-person-initial-col"><div className="fsc-person-initial">B</div></div>
            <div className="fsc-person-content">
              <div className="fsc-person-name">Dietrich Brandis</div>
              <div className="fsc-person-role">German Expert · First Inspector General of Forests in India</div>
              <ul>
                <li>Invited by the British as a <strong>German expert on scientific forestry</strong> — bringing European forest management to India</li>
                <li>Set up the <strong>Indian Forest Service in 1864</strong> — the first organised government body for controlling India's forests</li>
                <li>Helped formulate the <strong>Indian Forest Act of 1865</strong> — the legal framework that transformed forests from community commons to state property</li>
                <li>His work laid the foundation for the <strong>Imperial Forest Research Institute</strong> set up in <strong>Dehradun in 1906</strong> where scientific forestry was formally taught</li>
              </ul>
            </div>
          </div>

          <div className="fsc-def-box" style={{borderTopColor:'var(--bark)'}}>
            <div className="fsc-def-label">The British Method</div>
            <div className="fsc-def-term">Scientific Forestry</div>
            <div className="fsc-def-text">
              In the <strong>scientific forestry system</strong>, natural forests with <strong>different kinds of trees were replaced by single-species plantations</strong>. Forest management plans were made by forest officials who planned exactly <strong>how much of the forest had to be cut and how much had to be replanted</strong>. This maximised timber yield but destroyed biodiversity. It also severed the deep relationship between forest communities and the mixed forests they had sustainably lived alongside for centuries. Forests became a crop — managed for profit, not for people.
            </div>
          </div>

          <div className="fsc-divider"><div className="fsc-divider-mark" /></div>

          {/* 4. Forest Types & Rules */}
          <div className="fsc-sec-head">
            <div className="fsc-sec-num">4</div>
            <div className="fsc-sec-title-wrap">
              <div className="fsc-sec-kicker">The Forest Acts</div>
              <h2 className="fsc-sec-title">Forest Classification &amp; <span>Rules</span></h2>
            </div>
          </div>

          <p className="fsc-body-text">
            The Forest Acts divided India's forests into three categories — each with different levels of access for local communities. For millions of people whose lives revolved around forests, these divisions meant the difference between survival and destitution.
          </p>

          <div className="fsc-forest-types">
            <div className="fsc-forest-type-card f1">
              <div className="fsc-ft-label">Category 1</div>
              <div className="fsc-ft-name">Reserved Forests</div>
              <div className="fsc-ft-access">🚫 No Access</div>
              <div className="fsc-ft-desc">The <strong>best and most valuable forests</strong>. Villagers could not enter these forests at all. No grazing, fuel collection, timber cutting, or hunting was permitted. Entirely reserved for colonial state use — primarily to supply <strong>the finest timber</strong> for the Royal Navy and railways.</div>
            </div>
            <div className="fsc-forest-type-card f2">
              <div className="fsc-ft-label">Category 2</div>
              <div className="fsc-ft-name">Protected Forests</div>
              <div className="fsc-ft-access">⚠️ Limited Access</div>
              <div className="fsc-ft-desc">Villagers could take <strong>wood for fuel and house building</strong> from here — under strict regulations. Grazing and other uses were limited. Provided some relief but with <strong>no guarantee of continued access</strong>.</div>
            </div>
            <div className="fsc-forest-type-card f3">
              <div className="fsc-ft-label">Category 3</div>
              <div className="fsc-ft-name">Village Forests</div>
              <div className="fsc-ft-access">✓ Community Access</div>
              <div className="fsc-ft-desc">The category with the most community access. <strong>Local needs for fuel, fodder, and some food</strong> could be met here. However, these were typically the least valuable forests — the best had already been reserved for colonial use.</div>
            </div>
          </div>

          <div className="fsc-contrast">
            <div className="fsc-contrast-col">
              <div className="fsc-contrast-label forest-lbl">Shifting Cultivation — What It Was</div>
              <ul>
                <li>Also called <strong>swidden agriculture</strong> — practised in many parts of Asia, Africa, and South America</li>
                <li>Farmers cleared a small patch of forest, cultivated it for a few years, then moved on — allowing it to <strong>regenerate naturally</strong></li>
                <li>A sustainable, time-tested practice that had maintained forest communities for centuries</li>
                <li>Depended on <strong>knowledge of the forest ecosystem</strong> and seasonal cycles built up over generations</li>
                <li>Did not permanently destroy forest — the land would regenerate once farming pressure was removed</li>
              </ul>
            </div>
            <div className="fsc-contrast-col dark">
              <div className="fsc-contrast-label red-lbl">Why the British Banned It</div>
              <ul>
                <li>Colonial foresters did <strong>not favour shifting cultivation</strong> — it moved around, making it <strong>difficult for the government to calculate taxes</strong></li>
                <li>Forest officials feared fire spreading from cleared plots to valuable timber forests</li>
                <li>They believed no trees could grow on land used for shifting cultivation — an assumption now known to be wrong</li>
                <li>Banning it <strong>destroyed livelihoods of entire communities</strong> who had no other form of agriculture</li>
                <li>They were forced to become settled farmers — on land often less fertile than the forest plots they had been using</li>
              </ul>
            </div>
          </div>

          <div className="fsc-divider"><div className="fsc-divider-mark" /></div>

          {/* 5. Hunting Laws & New Trade */}
          <div className="fsc-sec-head">
            <div className="fsc-sec-num">5</div>
            <div className="fsc-sec-title-wrap">
              <div className="fsc-sec-kicker">Double Standards</div>
              <h2 className="fsc-sec-title">Hunting Laws &amp; <span className="gold-txt">New Trade</span></h2>
            </div>
          </div>

          <p className="fsc-body-text">
            The forest laws revealed the deepest contradiction of colonial rule: the same activities that were <strong>criminal for local people were celebrated as sport for the British</strong>. Meanwhile, new economic opportunities in forest trade came at the cost of communities' independent livelihoods.
          </p>

          <div className="fsc-table-wrap">
            <div className="fsc-table-title">Forest Laws — A Study in Colonial Double Standards</div>
            {[
              ["Hunting by Villagers",    <>Forest laws <strong>stopped villagers from hunting</strong> in the forests — a practice that had been their source of food and livelihood for generations. It was now criminal.</> ],
              ["Hunting by British",      <>The same laws <strong>encouraged hunting as a big sport</strong> for the British. Grand hunts were organised; tigers, elephants, and lions were killed in enormous numbers for trophies. "Big game hunting" was celebrated as adventure.</>],
              ["The Justification",       <>The British felt that wild animals were <strong>savage, wild, and primitive — just like Indian society</strong> — and that it was their duty to "civilise" them. This racist reasoning justified the brutal destruction of India's wildlife.</>],
              ["New Trade",               <>With colonial control of forests, <strong>new trade opportunities opened</strong>. Example: the <strong>Mundurucu peoples of the Brazilian Amazon</strong> engaged in forest product trade. But trade was completely regulated by the colonial government.</>],
              ["European Monopolies",     <><strong>Large European trading firms were given the sole right to trade</strong> in forest products of particular areas — creating monopolies that excluded local traders and communities from benefiting from their own forests.</>],
              ["Pastoral Communities",    <><strong>Many pastoral communities lost their means of livelihood</strong> — they could no longer graze animals in reserved forests or access seasonal grazing lands their communities had used for centuries.</>],
              ["False Promise of Jobs",   <><strong>New opportunities of work did not always mean improved well-being</strong> for the people. Forest labour and plantation work offered employment — but under colonial conditions, with no rights and minimal pay.</>],
            ].map(([k, v]) => (
              <div className="fsc-table-row" key={k}>
                <div className="fsc-table-key">{k}</div>
                <div className="fsc-table-val">{v}</div>
              </div>
            ))}
          </div>

          <div className="fsc-divider"><div className="fsc-divider-mark" /></div>

          {/* 6. Forest Rebellions — Bastar */}
          <div className="fsc-sec-head">
            <div className="fsc-sec-num">6</div>
            <div className="fsc-sec-title-wrap">
              <div className="fsc-sec-kicker">Resistance</div>
              <h2 className="fsc-sec-title">Forest <span className="red-txt">Rebellions</span></h2>
            </div>
          </div>

          <p className="fsc-body-text">
            Forest communities did not simply accept the changes imposed upon them. Across India and the world, they fought back — defending not just their livelihoods but their identity, their culture, and their deep connection to the land.
          </p>

          <div className="fsc-rebellion">
            <div className="fsc-rebellion-tag">Central India — The Bastar Rebellion</div>
            <div className="fsc-rebellion-head">The People of Bastar Fight for Their Forest</div>
            <div className="fsc-rebellion-body">
              The people of Bastar held a profound, spiritual relationship with their forest. They believed that <strong>the land was given to them by the earth and in return they looked after the earth</strong>. Their entire cultural and social life was connected to the forest — it was not merely an economic resource but their identity. When the British began reserving forests in Bastar, the <strong>Dhurwas of the Kanger forest</strong> — where reservation first took place — took the initiative to resist. The rebellion spread rapidly. The British sent troops to suppress it. It took them <strong>three months to regain control</strong> — a measure of how determined and widespread the resistance was. The people of Bastar won a significant <strong>partial victory: work on reservation was suspended and the area designated for reservation was reduced to half</strong>. Resistance had forced real concessions from colonial power.
            </div>
          </div>

          <div className="fsc-divider"><div className="fsc-divider-mark" /></div>

          {/* 7. Changes in Java */}
          <div className="fsc-sec-head">
            <div className="fsc-sec-num">7</div>
            <div className="fsc-sec-title-wrap">
              <div className="fsc-sec-kicker">Dutch Indonesia</div>
              <h2 className="fsc-sec-title">Changes in <span className="moss-txt">Java</span></h2>
            </div>
          </div>

          <p className="fsc-body-text">
            Java is now famous as a rice-producing island of Indonesia. But once upon a time it was covered with forests. The Dutch were the colonisers in Java — and their approach to forests mirrored the British in India: extract timber, clear land, and control local communities who dared to resist.
          </p>

          <div className="fsc-java">
            <div className="fsc-java-tag">Dutch Java — Colonialism and Forest Resistance</div>
            <div className="fsc-java-head">Forests Stripped, Communities Broken — Then They Fought Back</div>
            <div className="fsc-java-grid">
              <div className="fsc-java-col">
                <div className="fsc-java-col-label people">The Communities</div>
                <ul>
                  <li><strong>The Kalangs</strong> — skilled forest cutters and shifting cultivators whose lives were built around Java's forests</li>
                  <li>Rose in <strong>rebellion against the Dutch in 1770</strong> — one of the earliest colonial forest rebellions in Southeast Asia. The uprising was suppressed</li>
                  <li><strong>Samin of Randublatung village</strong> — a teak forest village — questioned the state's right to own forests at all. His ideas sparked a widespread movement</li>
                  <li>Saminists protested by <strong>lying on the ground</strong> when Dutch surveyors came, <strong>refusing to pay taxes</strong>, and <strong>refusing to perform labour</strong></li>
                </ul>
              </div>
              <div className="fsc-java-col">
                <div className="fsc-java-col-label events">The Colonial System</div>
                <ul>
                  <li>Forest laws enacted in Java — villagers resisted. <strong>Forest timber used for ships and railway sleepers</strong> — same colonial industrial demands as India</li>
                  <li>The Dutch used the <strong>balandongdiensten system</strong> — extracting <strong>free forced labour from villagers</strong> for the forest economy</li>
                  <li><strong>World War II:</strong> The Dutch destroyed saw mills and <strong>burned teak logs</strong> (scorched earth policy) so Japan could not use them</li>
                  <li>The <strong>Japanese then forced villagers to cut down forests</strong> when they occupied the area — a second wave of devastation</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="fsc-divider"><div className="fsc-divider-mark" /></div>

          {/* 8. Impact on Forest Communities */}
          <div className="fsc-sec-head">
            <div className="fsc-sec-num">8</div>
            <div className="fsc-sec-title-wrap">
              <div className="fsc-sec-kicker">Human Cost</div>
              <h2 className="fsc-sec-title">Impact on <span>Forest Communities</span></h2>
            </div>
          </div>

          <p className="fsc-body-text">
            The forest laws did not just restrict where people could walk — they struck at the heart of communities whose entire existence was woven into the forest. The impact was felt in every aspect of daily life.
          </p>

          <ul className="fsc-list">
            <li>Lives of <strong>forest people and nearby villagers depended entirely upon forests</strong> — their various needs of <strong>fuel, fodder, and even food</strong> were all dependent on forest access</li>
            <li>As these people were <strong>not allowed to use forests</strong> under the new laws, their life became difficult in the most immediate, physical sense — no fuel to cook, no fodder to feed cattle, no food to survive</li>
            <li><strong>Shifting cultivators</strong> who had farmed forest land sustainably for generations were suddenly criminalised — and had no other farmland to turn to</li>
            <li><strong>Pastoral communities</strong> who moved their herds seasonally through forest grazing grounds lost their entire way of life — and no compensation was offered</li>
            <li>The <strong>hunting ban on villagers</strong> removed a critical food source, while the British turned the same activity into an aristocratic sport</li>
            <li>Communities who had <strong>known themselves as forest people</strong> — with an identity rooted in the forest — found their identity legally erased</li>
            <li>New employment in plantations and forest labour offered only <strong>poverty wages under harsh colonial conditions</strong> — it was exploitation, not opportunity</li>
          </ul>

          <div className="fsc-pull-quote">
            <p>The people of Bastar believed the land was given to them by the earth — and in return, they looked after the earth. Colonial law said the earth belonged to the state.</p>
            <cite>— Forest Society and Colonialism</cite>
          </div>

          <div className="fsc-divider"><div className="fsc-divider-mark" /></div>

          {/* 9. New Developments */}
          <div className="fsc-sec-head">
            <div className="fsc-sec-num">9</div>
            <div className="fsc-sec-title-wrap">
              <div className="fsc-sec-kicker">The Way Forward</div>
              <h2 className="fsc-sec-title">New <span className="moss-txt">Developments</span> — Conservation Today</h2>
            </div>
          </div>

          <p className="fsc-body-text">
            The lessons of colonial-era deforestation and the rebellions it sparked have gradually — slowly — led to a different approach. Conservation, rather than extraction, has become the governing principle. And communities, rather than being excluded, are now recognised as the forests' best protectors.
          </p>

          <div className="fsc-timeline">
            {[
              { year:"Old\nApproach",  head:"Timber Over Everything", desc:<>The colonial model treated forests as <strong>factories for producing timber</strong>. Conservation meant only ensuring there would be enough trees to cut in the future. Communities were excluded, their knowledge ignored, their rights abolished.</> },
              { year:"New\nFocus",    head:"Conservation & Preservation", desc:<><strong>Conservation and preservation of forests has now become the focus rather than timber</strong>. Forests are valued for biodiversity, climate regulation, water cycles, and ecological balance — not just commercial wood production.</> },
              { year:"Key\nInsight",  head:"Communities Must Be Involved", desc:<>It has been realised that <strong>if forests are to survive, the local community needs to be involved</strong>. Communities who depend on forests have the greatest stake in their survival. Colonial exclusion destroyed both forests and communities.</> },
              { year:"India\nToday",  head:"Sacred Groves — Community Conservation", desc:<>There are many examples in India where <strong>communities are conserving forests in sacred groves</strong>. This looking after is done by <strong>each member of the village — everyone is involved</strong>. These community-protected forests have sometimes survived when government-managed forests have not.</> },
            ].map((t, i) => (
              <div className="fsc-tl-item" key={i}>
                <div className="fsc-tl-year-col"><div className="fsc-tl-year" style={{whiteSpace:'pre-line'}}>{t.year}</div></div>
                <div className="fsc-tl-content">
                  <div className="fsc-tl-head">{t.head}</div>
                  <div className="fsc-tl-desc">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="fsc-pull-quote">
            <p>Forests cannot be saved by laws and guards alone. They survive because the people who live alongside them feel ownership, responsibility, and a deep connection to them.</p>
            <cite>— New Developments in Forest Conservation</cite>
          </div>

          <div className="fsc-divider"><div className="fsc-divider-mark" /></div>

          {/* FAQ */}
          <div className="fsc-faq-header">
            <span className="fsc-faq-kicker">Exam Preparation</span>
          </div>
          <h2 className="fsc-faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, i) => (
            <div className={`fsc-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="fsc-faq-q" onClick={() => toggle(i)}>
                <span className="fsc-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="fsc-faq-icon">{openIndex === i ? "▴" : "▾"}</span>
              </button>
              <div className={`fsc-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
