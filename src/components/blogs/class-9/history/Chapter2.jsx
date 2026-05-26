import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:       #0d0a10;
    --ink2:      #1a1520;
    --muted:     #6e6478;
    --paper:     #f7f5fa;
    --paper2:    #eeebf5;
    --paper3:    #e2dced;
    --red:       #8b1a1a;
    --red2:      #6b1212;
    --red-lt:    #fce8e8;
    --gold:      #b8860b;
    --gold2:     #8b6508;
    --teal:      #0d6e6e;
    --teal2:     #094e4e;
    --rule:      #ccc4d8;
    --soviet:    #c0392b;
    --purple:    #5b2d8e;
    --purple2:   #3e1f66;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ser-root {
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
  }

  /* ─── HERO — deep revolutionary red-dark ─── */
  .ser-hero {
    background: linear-gradient(160deg, #080408 0%, #120810 45%, #100408 100%);
    min-height: 88vh;
    display: flex; align-items: flex-end;
    position: relative; overflow: hidden;
    padding: 0 0 64px;
  }
  .ser-hero-bg-num {
    position: absolute; bottom: -40px; right: -20px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(240px, 38vw, 520px); font-weight: 900; line-height: 1;
    color: rgba(255,255,255,0.022); letter-spacing: -0.04em;
    user-select: none; pointer-events: none;
  }
  /* Soviet red top rule */
  .ser-hero::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #8b1a1a, #c0392b, #e74c3c, #c0392b, #8b1a1a);
  }
  /* Star watermark rings */
  .ser-ring {
    position: absolute; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.018);
    pointer-events: none;
  }
  .ser-hero-inner {
    max-width: 900px; width: 100%;
    margin: 0 auto; padding: 0 32px;
    position: relative; z-index: 1;
  }
  .ser-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #e74c3c; margin-bottom: 24px;
    display: flex; align-items: center; gap: 14px;
  }
  .ser-overline::before, .ser-overline::after {
    content: ''; flex: 0 0 40px; height: 1px; background: #e74c3c;
  }
  .ser-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(38px, 7vw, 80px); font-weight: 900;
    color: #fff; line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 32px;
  }
  .ser-hero-title em        { font-style: normal; color: #e74c3c; }
  .ser-hero-title .gold-em  { color: #e8c040; }
  .ser-hero-title .purp-em  { color: #a67fd4; }
  .ser-hero-bar {
    display: flex; flex-wrap: wrap; gap: 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 24px; margin-top: 8px;
  }
  .ser-hero-bar-item {
    flex: 1 1 150px; padding: 0 24px 0 0;
    border-right: 1px solid rgba(255,255,255,0.1); margin-right: 24px;
  }
  .ser-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .ser-bar-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.35); margin-bottom: 5px;
  }
  .ser-bar-value {
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600;
    color: rgba(255,255,255,0.75);
  }

  /* ─── BODY ─── */
  .ser-body { max-width: 860px; margin: 0 auto; padding: 72px 32px 96px; }

  /* LEAD */
  .ser-lead {
    border-left: 5px solid var(--soviet);
    padding: 28px 36px; margin-bottom: 64px; background: var(--paper2);
  }
  .ser-lead p {
    font-family: 'Poppins', sans-serif; font-size: 19px; font-weight: 500;
    color: var(--ink2); line-height: 1.78; margin: 0 0 14px;
  }
  .ser-lead p:last-child { margin: 0; }
  .ser-lead strong { color: var(--soviet); }

  /* SECTION HEADER */
  .ser-sec-head {
    display: flex; align-items: flex-start; gap: 20px;
    margin-bottom: 28px; border-bottom: 2px solid var(--rule); padding-bottom: 18px;
  }
  .ser-sec-num {
    font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900;
    color: var(--rule); line-height: 1; flex-shrink: 0; margin-top: 4px;
  }
  .ser-sec-title-wrap { display: flex; flex-direction: column; justify-content: flex-end; }
  .ser-sec-kicker {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--soviet); margin-bottom: 4px;
  }
  .ser-sec-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(22px, 3.5vw, 32px); font-weight: 900;
    color: var(--ink); line-height: 1.15; letter-spacing: -0.01em;
  }
  .ser-sec-title span       { color: var(--soviet); }
  .ser-sec-title .gold      { color: var(--gold); }
  .ser-sec-title .teal      { color: var(--teal); }
  .ser-sec-title .purp      { color: var(--purple); }
  .ser-sec-title .red-txt   { color: #c0392b; }

  /* BODY TEXT */
  .ser-body-text {
    font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 400;
    color: #1a1520; line-height: 1.82; margin-bottom: 24px;
  }
  .ser-body-text strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── 3-WAY IDEOLOGY GRID ── */
  .ser-ideology-grid {
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    gap: 2px; background: var(--rule); margin-bottom: 48px;
  }
  .ser-ideo-card { padding: 28px 22px; }
  .ser-ideo-card.lib  { background: #f0f4ff; }
  .ser-ideo-card.rad  { background: #fff4e0; }
  .ser-ideo-card.con  { background: var(--paper); }
  .ser-ideo-icon { font-size: 32px; margin-bottom: 12px; }
  .ser-ideo-name {
    font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900;
    margin-bottom: 6px; letter-spacing: -0.01em;
  }
  .ser-ideo-card.lib  .ser-ideo-name { color: #1a3a8b; }
  .ser-ideo-card.rad  .ser-ideo-name { color: #8b4500; }
  .ser-ideo-card.con  .ser-ideo-name { color: var(--ink); }
  .ser-ideo-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.16em; margin-bottom: 14px;
  }
  .ser-ideo-card.lib .ser-ideo-tag  { color: #3a5cb8; }
  .ser-ideo-card.rad .ser-ideo-tag  { color: #c06000; }
  .ser-ideo-card.con .ser-ideo-tag  { color: var(--muted); }
  .ser-ideo-card ul { padding-left: 16px; margin: 0; }
  .ser-ideo-card ul li {
    font-size: 14px; line-height: 1.72; margin-bottom: 7px; color: var(--ink2);
  }
  .ser-ideo-card ul li strong { font-family:'Poppins',sans-serif; font-weight:700; }
  .ser-ideo-card.lib ul li strong  { color: #1a3a8b; }
  .ser-ideo-card.rad ul li strong  { color: #8b4500; }
  .ser-ideo-card.con ul li strong  { color: var(--ink); }

  /* ── DARK DEF BOX ── */
  .ser-def-box {
    background: var(--ink); padding: 32px 36px;
    margin-bottom: 48px; border-top: 4px solid var(--soviet);
  }
  .ser-def-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; color: #e74c3c; margin-bottom: 10px;
  }
  .ser-def-term {
    font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900;
    color: #fff; letter-spacing: -0.02em; margin-bottom: 14px;
  }
  .ser-def-text {
    font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 400;
    color: rgba(255,255,255,0.72); line-height: 1.8;
  }
  .ser-def-text strong { color: #e74c3c; font-family:'Poppins',sans-serif; font-weight:700; }

  /* ── PHILOSOPHER / THINKER CARD ── */
  .ser-thinker {
    display: grid; grid-template-columns: 80px 1fr;
    gap: 0; margin-bottom: 20px; background: var(--paper2);
    border-left: 5px solid var(--soviet);
  }
  .ser-thinker-initial-col {
    background: var(--soviet); display: flex; align-items: center; justify-content: center;
  }
  .ser-thinker-initial {
    font-family: 'Montserrat', sans-serif; font-size: 40px; font-weight: 900; color: #fff;
  }
  .ser-thinker-content { padding: 22px 26px; }
  .ser-thinker-name {
    font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900;
    color: var(--ink); margin-bottom: 3px; letter-spacing: -0.01em;
  }
  .ser-thinker-role {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.14em; color: var(--soviet); margin-bottom: 12px;
  }
  .ser-thinker-content ul { padding-left: 18px; margin: 0; }
  .ser-thinker-content ul li {
    font-size: 15px; line-height: 1.72; color: var(--ink2); margin-bottom: 7px;
  }
  .ser-thinker-content ul li strong { font-family:'Poppins',sans-serif; font-weight:700; color: var(--red); }

  /* ── STAT ROW ── */
  .ser-stat-row { display: flex; flex-wrap: wrap; gap: 2px; margin-bottom: 48px; background: var(--rule); }
  .ser-stat-box { flex: 1 1 130px; background: var(--paper); padding: 24px 18px; text-align: center; }
  .ser-stat-val {
    font-family: 'Montserrat', sans-serif; font-size: 26px; font-weight: 900;
    color: var(--soviet); line-height: 1.1; margin-bottom: 6px; letter-spacing: -0.02em;
  }
  .ser-stat-label {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 600;
    color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; line-height: 1.4;
  }

  /* ── TIMELINE ── */
  .ser-timeline { margin-bottom: 48px; }
  .ser-tl-item {
    display: grid; grid-template-columns: 120px 1fr;
    gap: 0; border-bottom: 1px solid var(--rule);
  }
  .ser-tl-item:first-child { border-top: 1px solid var(--rule); }
  .ser-tl-year-col {
    padding: 22px 20px 22px 0;
    border-right: 3px solid var(--soviet);
    display: flex; align-items: flex-start; justify-content: flex-end;
  }
  .ser-tl-year {
    font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 900;
    color: var(--soviet); letter-spacing: 0.04em; text-align: right; line-height: 1.3;
  }
  .ser-tl-content { padding: 22px 0 22px 24px; }
  .ser-tl-head {
    font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 700;
    color: var(--ink); margin-bottom: 6px;
  }
  .ser-tl-desc {
    font-family: 'Inter', sans-serif; font-size: 15px;
    color: #2a2030; line-height: 1.76;
  }
  .ser-tl-desc strong { color: var(--soviet); font-family:'Poppins',sans-serif; font-weight:700; }

  /* ── EVENT CARDS GRID ── */
  .ser-event-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 2px; background: var(--rule); margin-bottom: 48px;
  }
  .ser-event-card { background: var(--paper); padding: 26px 24px; }
  .ser-event-card.dark { background: var(--ink2); }
  .ser-event-card.red-bg { background: var(--soviet); }
  .ser-event-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.18em;
    color: var(--soviet); margin-bottom: 8px;
  }
  .ser-event-card.dark .ser-event-tag  { color: #e74c3c; }
  .ser-event-card.red-bg .ser-event-tag { color: rgba(255,255,255,0.6); }
  .ser-event-title {
    font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 900;
    color: var(--ink); margin-bottom: 12px; letter-spacing: -0.01em; line-height: 1.2;
  }
  .ser-event-card.dark .ser-event-title  { color: #fff; }
  .ser-event-card.red-bg .ser-event-title { color: #fff; }
  .ser-event-card ul { padding-left: 18px; margin: 0; }
  .ser-event-card ul li {
    font-size: 14px; line-height: 1.72; color: var(--ink2); margin-bottom: 7px;
  }
  .ser-event-card.dark ul li  { color: rgba(255,255,255,0.7); }
  .ser-event-card.red-bg ul li { color: rgba(255,255,255,0.88); }
  .ser-event-card ul li strong { font-family:'Poppins',sans-serif; font-weight:700; }
  .ser-event-card:not(.dark):not(.red-bg) ul li strong { color: var(--red); }
  .ser-event-card.dark ul li strong  { color: #fff; }
  .ser-event-card.red-bg ul li strong { color: #fff; }

  /* ── BLOODY SUNDAY HIGHLIGHT ── */
  .ser-bloody {
    background: var(--red); padding: 32px 36px; margin-bottom: 48px;
    position: relative; overflow: hidden;
  }
  .ser-bloody::before {
    content: '⚡'; position: absolute; right: 20px; top: 10px;
    font-size: 160px; line-height: 1; pointer-events: none; opacity: 0.08;
  }
  .ser-bloody-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.55);
    margin-bottom: 10px;
  }
  .ser-bloody-head {
    font-family: 'Montserrat', sans-serif; font-size: clamp(20px,3vw,28px); font-weight: 900;
    color: #fff; margin-bottom: 14px; letter-spacing: -0.01em; position: relative; z-index:1;
  }
  .ser-bloody-body {
    font-family: 'Inter', sans-serif; font-size: 16px;
    color: rgba(255,255,255,0.88); line-height: 1.78; position: relative; z-index:1;
  }
  .ser-bloody-body strong { color: #fff; font-family:'Poppins',sans-serif; font-weight:700; }

  /* ── OCTOBER REVOLUTION BLOCK ── */
  .ser-october {
    background: var(--ink); padding: 36px 36px 28px; margin-bottom: 48px;
    border-top: 4px solid var(--gold);
  }
  .ser-october-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.22em; color: rgba(255,255,255,0.4);
    margin-bottom: 14px;
  }
  .ser-october-head {
    font-family: 'Montserrat', sans-serif; font-size: clamp(18px,2.8vw,26px); font-weight: 900;
    color: #e8c040; margin-bottom: 18px; letter-spacing: -0.01em;
  }
  .ser-october-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .ser-october-col-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.16em; margin-bottom: 12px;
  }
  .ser-october-col-label.events { color: #e74c3c; }
  .ser-october-col-label.effects { color: #e8c040; }
  .ser-october-col ul { padding-left: 18px; margin: 0; }
  .ser-october-col ul li {
    font-size: 14px; line-height: 1.72; color: rgba(255,255,255,0.68); margin-bottom: 8px;
  }
  .ser-october-col ul li strong { font-family:'Poppins',sans-serif; font-weight:700; color: #fff; }

  /* ── CONTRAST BLOCK (2-col) ── */
  .ser-contrast {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0; background: var(--rule); margin-bottom: 48px;
  }
  .ser-contrast-col { background: var(--paper2); padding: 28px 26px; }
  .ser-contrast-col.dark { background: var(--ink2); border-left: 1px solid rgba(255,255,255,0.06); }
  .ser-contrast-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.18em; margin-bottom: 14px;
  }
  .ser-contrast-label.red-lbl   { color: var(--soviet); }
  .ser-contrast-label.gold-lbl  { color: var(--gold); }
  .ser-contrast-col ul { padding-left: 18px; margin: 0; }
  .ser-contrast-col ul li {
    font-size: 15px; line-height: 1.74; color: var(--ink2); margin-bottom: 9px;
  }
  .ser-contrast-col.dark ul li { color: rgba(255,255,255,0.72); }
  .ser-contrast-col ul li strong { font-family:'Poppins',sans-serif; font-weight:700; }
  .ser-contrast-col:not(.dark) ul li strong { color: var(--ink); }
  .ser-contrast-col.dark ul li strong { color: #fff; }

  /* ── CIVIL WAR BLOCK ── */
  .ser-civil {
    background: var(--purple); padding: 32px 36px; margin-bottom: 48px;
    position: relative; overflow: hidden;
  }
  .ser-civil::before {
    content: '⚔'; position: absolute; right: 20px; top: 10px;
    font-size: 160px; line-height: 1; pointer-events: none; opacity: 0.08;
  }
  .ser-civil-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.5); margin-bottom: 10px;
  }
  .ser-civil-head {
    font-family: 'Montserrat', sans-serif; font-size: clamp(18px,2.8vw,24px); font-weight: 900;
    color: #fff; margin-bottom: 16px; position: relative; z-index:1;
  }
  .ser-civil-factions {
    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px;
    position: relative; z-index:1;
  }
  .ser-faction {
    background: rgba(255,255,255,0.1); padding: 16px 16px;
    border-top: 3px solid transparent;
  }
  .ser-faction.red-f  { border-top-color: #e74c3c; }
  .ser-faction.white-f { border-top-color: #ccc; }
  .ser-faction.green-f { border-top-color: #4caf50; }
  .ser-faction-name {
    font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 900;
    color: #fff; margin-bottom: 6px;
  }
  .ser-faction-desc {
    font-family: 'Inter', sans-serif; font-size: 13px;
    color: rgba(255,255,255,0.7); line-height: 1.65;
  }
  .ser-faction-desc strong { font-family:'Poppins',sans-serif; font-weight:700; color: #fff; }

  /* ── INFO TABLE ── */
  .ser-table-wrap { margin-bottom: 48px; border: 1px solid var(--rule); }
  .ser-table-title {
    background: var(--ink); padding: 14px 24px;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    color: #e74c3c; letter-spacing: 0.06em; text-transform: uppercase;
  }
  .ser-table-row {
    display: grid; grid-template-columns: 180px 1fr;
    border-bottom: 1px solid var(--rule);
  }
  .ser-table-row:last-child { border-bottom: none; }
  .ser-table-key {
    background: var(--paper2); padding: 14px 18px;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    color: var(--soviet); border-right: 1px solid var(--rule);
    display: flex; align-items: center;
  }
  .ser-table-val {
    padding: 14px 18px;
    font-family: 'Inter', sans-serif; font-size: 15px; line-height: 1.65; color: #374151;
  }
  .ser-table-val strong { color: var(--ink); font-family:'Poppins',sans-serif; font-weight:700; }

  /* ── BULLET LIST ── */
  .ser-list { margin: 0 0 28px; padding: 0; list-style: none; }
  .ser-list li {
    font-size: 16px; line-height: 1.78; color: #1a1520;
    padding: 10px 0 10px 28px; position: relative;
    border-bottom: 1px solid var(--rule);
  }
  .ser-list li:first-child { border-top: 1px solid var(--rule); }
  .ser-list li::before {
    content: ''; position: absolute; left: 0; top: 18px;
    width: 10px; height: 10px;
    border: 2px solid var(--soviet); transform: rotate(45deg);
  }
  .ser-list li strong { color: var(--ink); font-family:'Poppins',sans-serif; font-weight:700; }

  /* ── PULL QUOTE ── */
  .ser-pull-quote {
    margin: 40px 0; padding: 32px 40px;
    background: var(--ink); position: relative;
  }
  .ser-pull-quote::before {
    content: '"'; position: absolute; top: -18px; left: 28px;
    font-family: 'Montserrat', sans-serif; font-size: 120px; font-weight: 900;
    color: var(--soviet); line-height: 1;
  }
  .ser-pull-quote p {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(17px,2.4vw,22px); font-weight: 800;
    color: #fff; line-height: 1.45; letter-spacing: -0.01em;
    position: relative; z-index: 1; margin-bottom: 12px;
  }
  .ser-pull-quote cite {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600;
    color: #e74c3c; text-transform: uppercase; letter-spacing: 0.12em; font-style: normal;
  }

  /* ── SECTION DIVIDER ── */
  .ser-divider { display: flex; align-items: center; gap: 16px; margin: 56px 0; }
  .ser-divider::before, .ser-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .ser-divider-mark { width: 10px; height: 10px; background: var(--soviet); transform: rotate(45deg); flex-shrink: 0; }

  /* ── FAQ ── */
  .ser-faq-header {
    border-bottom: 3px solid var(--ink); padding-bottom: 14px; margin-bottom: 0;
    display: flex; align-items: baseline; gap: 16px;
  }
  .ser-faq-kicker {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--soviet);
  }
  .ser-faq-title {
    font-family: 'Montserrat', sans-serif; font-size: clamp(24px,4vw,34px); font-weight: 900;
    color: var(--ink); letter-spacing: -0.01em; margin: 20px 0 32px;
  }
  .ser-faq-item { border-bottom: 1px solid var(--rule); overflow: hidden; }
  .ser-faq-item.open { background: var(--paper2); }
  .ser-faq-q {
    width: 100%; text-align: left; background: none; border: none; cursor: pointer;
    padding: 20px 0; display: grid; grid-template-columns: 1fr 32px;
    gap: 16px; align-items: start;
  }
  .ser-faq-q-text {
    font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 600;
    color: var(--ink); line-height: 1.5; text-align: left; padding-left: 4px;
  }
  .ser-faq-item.open .ser-faq-q-text { color: var(--red2); }
  .ser-faq-icon {
    width: 28px; height: 28px; border: 1.5px solid var(--rule);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; color: var(--soviet); flex-shrink: 0; margin-top: 2px;
    font-family: 'Poppins', sans-serif; font-weight: 700;
  }
  .ser-faq-item.open .ser-faq-icon { background: var(--ink); border-color: var(--ink); color: #e74c3c; }
  .ser-faq-ans {
    display: none; padding: 0 4px 22px;
    font-size: 16px; line-height: 1.82; color: #374151;
  }
  .ser-faq-ans.visible { display: block; }
  .ser-faq-ans ul { padding-left: 20px; margin: 8px 0; }
  .ser-faq-ans ul li { margin-bottom: 7px; }
  .ser-faq-ans strong { color: var(--ink); font-family:'Poppins',sans-serif; font-weight:700; }
  .ser-faq-ans p { margin: 0 0 10px; }
  .ser-faq-ans p:last-child { margin: 0; }

  @media (max-width: 620px) {
    .ser-hero          { min-height: auto; padding: 80px 0 48px; }
    .ser-ideology-grid { grid-template-columns: 1fr; }
    .ser-event-grid    { grid-template-columns: 1fr; }
    .ser-contrast      { grid-template-columns: 1fr; }
    .ser-october-grid  { grid-template-columns: 1fr; }
    .ser-civil-factions { grid-template-columns: 1fr; }
    .ser-thinker       { grid-template-columns: 60px 1fr; }
    .ser-tl-item       { grid-template-columns: 80px 1fr; }
    .ser-table-row     { grid-template-columns: 120px 1fr; }
  }
`;

const faqs = [
  {
    q: "What were the main differences between Liberals, Radicals, and Conservatives in 19th-century Europe?",
    a: (<>
      <p>After the French Revolution opened the possibility of dramatic social change, European thinkers split into three broad ideological camps — each with a distinct vision of what society should look like:</p>
      <ul>
        <li><strong>Liberals</strong> wanted a nation that <strong>tolerated all religions</strong> and stood firmly against the uncontrolled power of dynastic rulers. They advocated for individual rights, an elected parliamentary government, and a well-trained, independent judiciary. However, they were <strong>NOT democrats</strong> — they did not believe in universal adult franchise. They wanted rights for educated, propertied men — not all citizens.</li>
        <li><strong>Radicals</strong> wanted a nation where government was based on the <strong>majority of the population</strong>. They disliked the concentration of property in the hands of a few — though, crucially, they did not oppose the existence of private property altogether. They pushed for wider democracy and a more equal distribution of political power.</li>
        <li><strong>Conservatives</strong> resisted change entirely at first. However, after the revolutionary upheavals, many conservatives accepted the idea of gradual change — provided it was <strong>slow, connected to the past, and respectful of existing traditions and institutions</strong>. They feared that rapid change led to instability and violence.</li>
      </ul>
    </>),
  },
  {
    q: "What was Socialism in Europe? Who were the key thinkers and what did they believe?",
    a: (<>
      <p>Socialism emerged as a powerful response to the inequalities created by industrial capitalism in 19th-century Europe:</p>
      <ul>
        <li>Socialists were <strong>against private property</strong> and saw it as the root of all social evils. If property was privately owned, the owner could exploit workers for profit — which socialists saw as fundamentally unjust.</li>
        <li>Different socialists had different visions: some believed in <strong>cooperatives</strong> — where workers jointly owned and ran businesses — while others demanded that governments <strong>encourage and support cooperatives</strong> to replace private businesses.</li>
        <li><strong>Karl Marx</strong> and <strong>Friedrich Engels</strong> argued that industrial society was <strong>capitalist</strong> — built on the exploitation of workers by those who owned factories and capital. Marx believed that workers would eventually overthrow capitalism, leading to a <strong>communist society</strong> — one without private property, classes, or exploitation.</li>
        <li>To spread socialist ideas, workers formed an organisation called the <strong>Second International</strong> — a global network of socialist parties and trade unions.</li>
        <li>Workers in <strong>Germany and England</strong> began forming associations to fight for better living conditions, funds for members in distress, <strong>reduction of working hours</strong>, and the right to vote.</li>
      </ul>
    </>),
  },
  {
    q: "What was the social and economic condition of Russia before the Revolution?",
    a: (<>
      <p>In 1914, Russia under Tsar Nicholas II was a deeply unequal, largely agricultural society with growing industrial unrest:</p>
      <ul>
        <li>About <strong>85% of the Russian population were agriculturalists</strong> — peasant farmers who worked the land. Russia was far less industrialised than Western Europe.</li>
        <li>Industries were being set up, but they were mostly <strong>private property of industrialists</strong>. Workers in these factories had no rights, no unions, and faced brutal conditions.</li>
        <li>Workers were divided into groups but they <strong>would unite to strike work</strong> when deeply dissatisfied — showing collective class consciousness despite their divisions.</li>
        <li>Russian peasants were <strong>uniquely different from French or European peasants</strong> — they had no respect for the nobility. They also had a distinctive communal tradition: peasants <strong>pooled their land together and their commune divided it periodically</strong> among members.</li>
        <li>This communal land-sharing made Russian peasants seen as <strong>natural socialists</strong> — since they already practised collective ownership.</li>
        <li>All <strong>political parties were illegal in Russia before 1914</strong> — the Tsar ruled as an autocrat, refusing to share power with any elected body.</li>
      </ul>
    </>),
  },
  {
    q: "What was Bloody Sunday? What were its causes and consequences?",
    a: (<>
      <p>Bloody Sunday was one of the most pivotal events in Russian history — a massacre that transformed discontent into revolution:</p>
      <p><strong>Causes:</strong></p>
      <ul>
        <li>By 1904, prices of essential goods had risen so rapidly that <strong>real wages declined by 20%</strong> — workers were earning more nominally but could buy far less</li>
        <li>Four members of the <strong>Putilov Iron Works</strong> were dismissed, triggering immediate calls for action</li>
        <li>Over <strong>110,000 workers in St. Petersburg went on strike</strong> demanding a reduction in working hours and an increase in wages</li>
        <li>A peaceful procession was organised, led by <strong>Father Gapon</strong>, to march to the Tsar's Winter Palace and petition for workers' rights</li>
      </ul>
      <p><strong>What happened:</strong></p>
      <ul>
        <li>The procession was <strong>attacked by the police and Cossacks</strong> — soldiers fired on unarmed, peaceful marchers</li>
        <li>Over <strong>100 workers were killed</strong> — a shocking act of state violence against its own people</li>
      </ul>
      <p><strong>Consequences:</strong></p>
      <ul>
        <li>Strikes erupted across Russia in protest — the country was gripped by outrage</li>
        <li>People demanded a <strong>constituent assembly</strong> to draft a new constitution</li>
        <li>The Tsar was forced to allow the creation of an elected consultative Parliament — the <strong>Duma</strong></li>
        <li>However, the first Duma was dismissed within just <strong>75 days</strong>, and a second Duma was called — showing the Tsar's unwillingness to share real power</li>
      </ul>
    </>),
  },
  {
    q: "What happened during the February Revolution of 1917 in Petrograd? What were its effects?",
    a: (<>
      <p>The February Revolution of 1917 was a spontaneous popular uprising that ended the Tsarist regime in just a few dramatic days:</p>
      <p><strong>Events:</strong></p>
      <ul>
        <li>In the winter of 1917, <strong>Petrograd (St. Petersburg)</strong> was in crisis — food shortage in workers' quarters was severe</li>
        <li><strong>22 February</strong> — a lockout at a factory triggered workers of 50 other factories to join in sympathy strikes. <strong>Women led and participated</strong> in the strikes — this day became celebrated as <strong>International Women's Day</strong></li>
        <li>Workers surrounded fashionable areas and official buildings; the government imposed a curfew and called out cavalry and police</li>
        <li><strong>25 February</strong> — the government suspended the Duma; politicians publicly criticised this move</li>
        <li><strong>27 February</strong> — police headquarters were ransacked; cavalry refused to fire on demonstrators; soldiers mutinied and joined the striking workers, forming the <strong>Petrograd Soviet</strong></li>
        <li>Military commanders advised the Tsar to abdicate. The <strong>Tsar abdicated on 2nd March 1917</strong></li>
        <li>A <strong>Provisional Government</strong> was formed by Soviet and Duma leaders to run the country</li>
      </ul>
      <p><strong>Effects:</strong></p>
      <ul>
        <li>Restrictions on public meetings and associations were <strong>removed</strong></li>
        <li><strong>Soviets were set up everywhere</strong> across Russia</li>
        <li><strong>Factory committees</strong> formed and began questioning how industrialists ran their factories</li>
        <li><strong>Soldiers' committees</strong> were formed in the army</li>
        <li>The Provisional Government's power declined as <strong>Bolshevik influence grew</strong></li>
        <li>Peasants and socialist leaders pressed for <strong>redistribution of land</strong>; peasants seized land between July and September 1917</li>
      </ul>
    </>),
  },
  {
    q: "What happened during the October Revolution of 1917? What were its major effects?",
    a: (<>
      <p>The October Revolution was a planned, organised seizure of power by the Bolsheviks under Lenin — unlike the spontaneous February Revolution:</p>
      <p><strong>Events:</strong></p>
      <ul>
        <li><strong>16 October 1917</strong> — Lenin persuaded the Petrograd Soviet and Bolshevik Party to agree to a <strong>socialist seizure of power</strong>. A Military Revolutionary Committee was appointed to organise the uprising</li>
        <li><strong>24 October</strong> — the uprising began. Prime Minister Kerensky left the city to summon troops</li>
        <li>Military men loyal to the government seized Bolshevik newspaper buildings; pro-government troops were sent to protect the <strong>Winter Palace</strong> and take over telephone and telegraph offices</li>
        <li>The Military Revolutionary Committee ordered seizure of government offices and arrested ministers</li>
        <li>The warship <strong>Aurora shelled the Winter Palace</strong>. Other ships took over strategic points</li>
        <li>By night the city was taken over and <strong>ministers had surrendered</strong></li>
        <li>The All-Russian Congress of Soviets in Petrograd <strong>approved the Bolshevik action</strong></li>
        <li>By December, after heavy fighting in Moscow, the <strong>Bolsheviks controlled the Moscow-Petrograd area</strong></li>
      </ul>
      <p><strong>Effects:</strong></p>
      <ul>
        <li>Most industry and banks were <strong>nationalised in November 1917</strong></li>
        <li>Land was declared <strong>social property</strong> — peasants were allowed to seize the land of the nobility</li>
        <li>Use of <strong>old aristocratic titles was banned</strong>; new uniforms designed for army and officials</li>
        <li>Russia became a <strong>one-party state</strong>; trade unions were kept under party control</li>
        <li><strong>Centralised planning</strong> was introduced, leading to economic growth and increased industrial production</li>
        <li>An extended <strong>schooling system</strong> developed; collectivisation of farms started</li>
      </ul>
    </>),
  },
  {
    q: "What was the Russian Civil War? Who were the Reds, Whites, and Greens?",
    a: (<>
      <p>When the Bolsheviks seized power and ordered land redistribution, Russia plunged into a brutal civil war that lasted until 1921:</p>
      <ul>
        <li>The <strong>Russian army began to break up</strong> when the Bolsheviks ordered land redistribution — many officers refused to accept the new order</li>
        <li><strong>Non-Bolshevik socialists, liberals, and supporters of autocracy</strong> all condemned the Bolshevik uprising and formed their own armed forces</li>
        <li>These anti-Bolshevik forces were called the <strong>'Greens'</strong> — a broad coalition of socialists, liberals, and anarchists fighting against the Bolsheviks</li>
        <li>Pro-Tsar forces were called the <strong>'Whites'</strong> — they controlled most of the Russian empire at various points during the civil war</li>
        <li>The <strong>Bolshevik army was called the 'Reds'</strong> — the Red Army, built and commanded by Leon Trotsky</li>
        <li>The Whites were <strong>supported by French, American, British, and Japanese troops</strong> — foreign powers who feared the spread of communism and wanted to restore order</li>
        <li>Despite the odds, the <strong>Bolsheviks (Reds) won</strong> the civil war — due to superior organisation, control of the population centres, and the failure of their enemies to coordinate effectively</li>
      </ul>
    </>),
  },
  {
    q: "What was Stalin's policy of Collectivisation? Why was it introduced and what were its consequences?",
    a: (<>
      <p>Collectivisation was one of Stalin's most controversial and brutal policies — transforming Soviet agriculture at enormous human cost:</p>
      <ul>
        <li>Stalin believed that <strong>rich peasants (kulaks) and traders were hoarding grain supplies</strong> to create artificial shortages — deliberately sabotaging the socialist state</li>
        <li>The solution, he argued, was <strong>collectivisation</strong> — merging small individual farms into large, state-controlled collective farms (kolkhozy)</li>
        <li>Collectivisation would also allow the <strong>modernisation of Soviet agriculture</strong> using machines, modern techniques, and centralised planning — increasing production for rapid industrialisation</li>
        <li>Farmers who <strong>resisted collectivisation were punished, deported, or exiled</strong> to labour camps — particularly the kulaks, who were labelled class enemies</li>
        <li>The policy caused <strong>enormous human suffering</strong> — millions of peasants died in the famines of the early 1930s caused by forced collectivisation and grain requisitioning</li>
        <li>Despite its brutal implementation, collectivisation did allow the Soviet state to <strong>control and direct agricultural output</strong> to fund rapid industrial growth</li>
      </ul>
    </>),
  },
  {
    q: "What was the global influence of the Russian Revolution?",
    a: (<>
      <p>The Russian Revolution had a profound and lasting impact on the entire 20th century world:</p>
      <ul>
        <li>The Revolution proved for the first time that a <strong>working-class socialist government could actually seize and hold state power</strong> — inspiring communist and socialist movements globally</li>
        <li>By the <strong>1950s</strong>, it was widely recognised — both inside Russia and outside — that not everything was in keeping with the <strong>ideals of the Revolution</strong>. Rapid industrial and agricultural development had occurred, and the poor were being fed — but <strong>essential freedoms were being denied to citizens</strong></li>
        <li>The Soviet model inspired socialist and communist movements in <strong>China, Cuba, Vietnam, Korea, and across Africa and Latin America</strong> — reshaping global geopolitics throughout the Cold War</li>
        <li>However, <strong>in each country, the ideas of socialism were rethought in different ways</strong> — adapted to local conditions, cultures, and political realities rather than simply copying the Soviet model</li>
        <li>The Revolution's social ideals — equality, workers' rights, opposition to exploitation — continued to <strong>enjoy respect among Russians and socialists worldwide</strong>, even as the Soviet government betrayed many of those ideals in practice</li>
        <li>The tension between the Revolution's ideals and the reality of one-party authoritarian rule became the central contradiction of 20th-century socialism</li>
      </ul>
    </>),
  },
];

export default function SocialismInEuropeAndTheRussianRevolution() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="ser-root">

        {/* ── HERO ── */}
        <div className="ser-hero">
          {[120, 240, 360, 480, 600].map((size, i) => (
            <div key={i} className="ser-ring" style={{
              width:`${size}px`, height:`${size}px`,
              top:'50%', left:'62%',
              transform:'translate(-50%,-50%)',
            }} />
          ))}
          <div className="ser-hero-bg-num">02</div>
          <div className="ser-hero-inner">
            <div className="ser-overline">Class 9 · Social Science · History</div>
            <h1 className="ser-hero-title">
              <em>Socialism</em> in<br />Europe &amp; the<br /><span className="gold-em">Russian</span> <span className="purp-em">Revolution</span>
            </h1>
            <div className="ser-hero-bar">
              {[
                { label:"Subject",  value:"History" },
                { label:"Chapter",  value:"Chapter 2" },
                { label:"Period",   value:"1848 – 1924" },
                { label:"Region",   value:"Europe & Russia" },
                { label:"FAQs",     value:"9 Questions" },
              ].map(({ label, value }) => (
                <div className="ser-hero-bar-item" key={label}>
                  <div className="ser-bar-label">{label}</div>
                  <div className="ser-bar-value">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="ser-body">

          {/* LEAD */}
          <div className="ser-lead">
            <p>
              The French Revolution promised <strong>liberty, equality, and fraternity</strong>. But factories were filling up with exhausted workers earning starvation wages, and the wealthy were getting wealthier. A new question emerged: was political freedom enough — or did true equality require economic revolution too?
            </p>
            <p>
              This chapter traces the rise of <strong>socialist ideas in Europe</strong>, their collision with the crumbling Russian Tsarist empire, and the <strong>twin revolutions of 1917</strong> that shook the entire world — and whose echoes still shape global politics today.
            </p>
          </div>

          {/* ── 1. Age of Social Change ── */}
          <div className="ser-sec-head">
            <div className="ser-sec-num">1</div>
            <div className="ser-sec-title-wrap">
              <div className="ser-sec-kicker">Post-Revolution Europe</div>
              <h2 className="ser-sec-title">The Age of <span>Social Change</span></h2>
            </div>
          </div>

          <p className="ser-body-text">
            The French Revolution had opened up the possibility of creating <strong>dramatic change in the way society was structured</strong>. But not everyone in Europe wanted a complete transformation. Political thinkers divided into three distinct camps — each with a radically different idea of what the ideal society should look like.
          </p>

          <div className="ser-ideology-grid">
            <div className="ser-ideo-card lib">
              <div className="ser-ideo-icon">⚖️</div>
              <div className="ser-ideo-name">Liberals</div>
              <div className="ser-ideo-tag">Reform, Not Revolution</div>
              <ul>
                <li>Wanted a nation that <strong>tolerated all religions</strong> equally</li>
                <li>Against <strong>uncontrolled power</strong> of dynastic rulers</li>
                <li>Wanted <strong>rights for individuals</strong> — of speech, thought, property</li>
                <li>Argued for <strong>elected parliamentary government</strong> subject to an independent judiciary</li>
                <li>Were <strong>NOT democrats</strong> — did not believe in universal adult franchise</li>
                <li>Rights were for <strong>educated, propertied men</strong> only</li>
              </ul>
            </div>
            <div className="ser-ideo-card rad">
              <div className="ser-ideo-icon">✊</div>
              <div className="ser-ideo-name">Radicals</div>
              <div className="ser-ideo-tag">Majority Rule</div>
              <ul>
                <li>Wanted government based on the <strong>majority of the population</strong></li>
                <li>Disliked <strong>concentration of property in few hands</strong></li>
                <li>Did NOT oppose the existence of <strong>private property itself</strong></li>
                <li>Pushed for a much <strong>wider democracy</strong> than Liberals would accept</li>
                <li>Wanted political power shared with <strong>all citizens</strong>, not just the wealthy</li>
              </ul>
            </div>
            <div className="ser-ideo-card con">
              <div className="ser-ideo-icon">🏛️</div>
              <div className="ser-ideo-name">Conservatives</div>
              <div className="ser-ideo-tag">Tradition First</div>
              <ul>
                <li>Initially <strong>resisted all change</strong> completely</li>
                <li>After the Revolution, began accepting <strong>gradual, slow change</strong></li>
                <li>Change must have <strong>links to the past</strong> and respect tradition</li>
                <li>Feared that rapid change would lead to <strong>instability and violence</strong></li>
                <li>Believed existing <strong>institutions and hierarchies</strong> had proven their value over time</li>
              </ul>
            </div>
          </div>

          <div className="ser-divider"><div className="ser-divider-mark" /></div>

          {/* ── 2. Industries & Social Change ── */}
          <div className="ser-sec-head">
            <div className="ser-sec-num">2</div>
            <div className="ser-sec-title-wrap">
              <div className="ser-sec-kicker">Industrial Revolution</div>
              <h2 className="ser-sec-title">Industries &amp; <span className="teal">Social Change</span></h2>
            </div>
          </div>

          <p className="ser-body-text">
            This was also the age of the <strong>Industrial Revolution</strong> — a period of enormous economic transformation. Factories sprang up across Britain, France, and Germany. But the workers who powered them lived in misery.
          </p>

          <div className="ser-event-grid">
            <div className="ser-event-card">
              <div className="ser-event-tag">The Reality of the Factory</div>
              <div className="ser-event-title">Workers' Suffering</div>
              <ul>
                <li><strong>Men, women, and children</strong> were pushed into factories for gruellingly low wages</li>
                <li>Working hours were <strong>brutally long</strong> — 12 to 16 hours a day in dangerous conditions</li>
                <li>Child labour was widespread — children as young as <strong>5 or 6 worked in mines and factories</strong></li>
                <li>Workers had <strong>no legal rights</strong>, no unions, and no recourse against exploitation</li>
                <li>Industrial cities were overcrowded, polluted, and plagued by disease</li>
              </ul>
            </div>
            <div className="ser-event-card dark">
              <div className="ser-event-tag">The Owners' View</div>
              <div className="ser-event-title">Liberals & Radicals as Factory Owners</div>
              <ul>
                <li>Ironically, many Liberals and Radicals were themselves <strong>factory owners</strong></li>
                <li>They argued that individual effort must be <strong>encouraged and rewarded</strong></li>
                <li>Believed the benefits of industrialisation should <strong>eventually pass on to workers</strong> — through rising wages and better conditions over time</li>
                <li>But in practice, profit came before worker welfare — a contradiction that <strong>gave birth to socialism</strong></li>
              </ul>
            </div>
          </div>

          <div className="ser-divider"><div className="ser-divider-mark" /></div>

          {/* ── 3. Socialism in Europe ── */}
          <div className="ser-sec-head">
            <div className="ser-sec-num">3</div>
            <div className="ser-sec-title-wrap">
              <div className="ser-sec-kicker">A New Political Force</div>
              <h2 className="ser-sec-title">Socialism in <span>Europe</span></h2>
            </div>
          </div>

          <p className="ser-body-text">
            As industrial capitalism created ever-wider inequality, a powerful new political idea emerged to challenge it: <strong>Socialism</strong>. Socialists argued that the problem was not bad kings or unelected governments — the problem was <strong>private property itself</strong>, which allowed owners to exploit workers without limit.
          </p>

          <div className="ser-def-box">
            <div className="ser-def-label">Core Socialist Belief</div>
            <div className="ser-def-term">Why Socialists Opposed Private Property</div>
            <div className="ser-def-text">
              Socialists were against private property and saw it as the <strong>root of all social evils</strong>. If a person privately owned a factory, they could pay workers as little as they wished and keep all the profit. Workers had no share in what they produced. Some socialists believed the solution was <strong>cooperatives</strong> — businesses jointly owned and run by the workers themselves. Others demanded that <strong>governments must actively encourage and support cooperatives</strong> to replace private businesses. All agreed that as long as property was privately owned, exploitation was inevitable.
            </div>
          </div>

          <div className="ser-thinker">
            <div className="ser-thinker-initial-col">
              <div className="ser-thinker-initial">M</div>
            </div>
            <div className="ser-thinker-content">
              <div className="ser-thinker-name">Karl Marx</div>
              <div className="ser-thinker-role">German Philosopher · Father of Scientific Socialism · 1818–1883</div>
              <ul>
                <li>Argued that <strong>industrial society was capitalist</strong> — built on the systematic exploitation of workers (the proletariat) by owners of capital (the bourgeoisie)</li>
                <li>Workers produced all the wealth but received only a fraction of it as wages — the rest was <strong>surplus value captured by the capitalist</strong></li>
                <li>Believed that this exploitation would inevitably lead to <strong>class struggle and revolution</strong></li>
                <li>Marx believed a <strong>socialist society would free workers from capitalism</strong> — workers would own the means of production collectively</li>
                <li>The ultimate goal was a <strong>communist society</strong> — classless, stateless, and without private property or exploitation</li>
              </ul>
            </div>
          </div>

          <div className="ser-thinker" style={{marginBottom:'48px'}}>
            <div className="ser-thinker-initial-col">
              <div className="ser-thinker-initial">E</div>
            </div>
            <div className="ser-thinker-content">
              <div className="ser-thinker-name">Friedrich Engels</div>
              <div className="ser-thinker-role">German Philosopher · Marx's Collaborator · 1820–1895</div>
              <ul>
                <li>Co-authored the <strong>Communist Manifesto (1848)</strong> with Karl Marx — one of history's most influential political documents</li>
                <li>Together with Marx, argued that <strong>history was the history of class struggle</strong> — every era was defined by conflict between those who owned property and those who did not</li>
                <li>Engels financially supported Marx's research and writing throughout his life</li>
                <li>After Marx's death, Engels edited and published the remaining volumes of <strong>Das Kapital</strong> — Marx's masterwork analysing capitalism</li>
              </ul>
            </div>
          </div>

          <div className="ser-def-box" style={{borderTopColor:'var(--teal)'}}>
            <div className="ser-def-label">Organisation of Socialist Workers</div>
            <div className="ser-def-term">The Second International</div>
            <div className="ser-def-text">
              To spread socialist ideas and coordinate workers' movements across borders, socialists formed an organisation called the <strong>Second International</strong>. Workers in <strong>Germany and England</strong> began forming associations to fight for better living conditions. These associations set up <strong>funds for members in distress</strong>, campaigned for <strong>reduction of working hours</strong>, and fought for the <strong>right to vote</strong>. The idea was simple: workers in every country had more in common with each other than with the rich of their own nation.
            </div>
          </div>

          <div className="ser-divider"><div className="ser-divider-mark" /></div>

          {/* ── 4. Russia Before Revolution ── */}
          <div className="ser-sec-head">
            <div className="ser-sec-num">4</div>
            <div className="ser-sec-title-wrap">
              <div className="ser-sec-kicker">Tsar Nicholas II's Russia</div>
              <h2 className="ser-sec-title">Economy &amp; Society in <span>Russia</span></h2>
            </div>
          </div>

          <p className="ser-body-text">
            In <strong>1914</strong>, Russia was a vast empire under the autocratic rule of <strong>Tsar Nicholas II</strong>. It was a society of extreme contrasts — a tiny privileged nobility, a small but growing industrial working class, and an enormous, impoverished peasantry who made up the overwhelming bulk of the population.
          </p>

          <div className="ser-stat-row">
            {[
              { val:"85%",   label:"Population were Agriculturalists" },
              { val:"1898",  label:"Socialist Labour Party Founded" },
              { val:"20%",   label:"Real Wage Decline by 1904" },
              { val:"110K+", label:"Workers Struck in St. Petersburg" },
            ].map(({ val, label }) => (
              <div className="ser-stat-box" key={label}>
                <div className="ser-stat-val">{val}</div>
                <div className="ser-stat-label">{label}</div>
              </div>
            ))}
          </div>

          <div className="ser-table-wrap">
            <div className="ser-table-title">Key Features of Russian Society Before 1917</div>
            {[
              ["Agriculture",       <>About <strong>85% of Russians</strong> were agriculturalists — peasant farmers. Russia was far less industrialised than Britain, France or Germany.</>],
              ["Industry",          <>Industries were being set up but were mostly <strong>private property of industrialists</strong>. Workers had no rights — no unions, no legal protections, no minimum wage.</>],
              ["Workers",           <>Workers were divided into groups but would <strong>unite to strike</strong> when deeply dissatisfied. Strikes were illegal but happened frequently — showing growing class consciousness.</>],
              ["Peasants",          <>Russian peasants had <strong>no respect for the nobility</strong> — unlike French or European peasants. They had a unique communal tradition: they <strong>pooled their land</strong> and their commune periodically redistributed it among members.</>],
              ["Natural Socialists",<>Because peasants already practised communal land-sharing, they were seen as <strong>natural socialists</strong>. Many revolutionary thinkers believed peasants — not industrial workers — would lead the Russian revolution.</>],
              ["Lenin's View",      <>However, <strong>Lenin disagreed</strong>. He felt peasants were not one social group — they ranged from the rich (kulaks) to the landless poor — and could not be relied upon as a unified revolutionary force.</>],
              ["Political Parties", <>All political parties were <strong>illegal in Russia before 1914</strong>. The Tsar ruled as an absolute autocrat. The Russian Socialist Democratic Labour Party was secretly formed in <strong>1898</strong> and split into <strong>Bolsheviks and Mensheviks</strong>.</>],
            ].map(([k, v]) => (
              <div className="ser-table-row" key={k}>
                <div className="ser-table-key">{k}</div>
                <div className="ser-table-val">{v}</div>
              </div>
            ))}
          </div>

          <div className="ser-divider"><div className="ser-divider-mark" /></div>

          {/* ── 5. 1905 Revolution & Bloody Sunday ── */}
          <div className="ser-sec-head">
            <div className="ser-sec-num">5</div>
            <div className="ser-sec-title-wrap">
              <div className="ser-sec-kicker">The First Uprising</div>
              <h2 className="ser-sec-title">The 1905 Revolution &amp; <span className="red-txt">Bloody Sunday</span></h2>
            </div>
          </div>

          <p className="ser-body-text">
            Russia was an <strong>autocracy</strong> — the Tsar was not subject to parliament. By 1905, a combination of military defeat, rising prices, and worker desperation brought Russia to the brink. The movement culminated in one of the most shocking acts of state violence in modern history.
          </p>

          <div className="ser-bloody">
            <div className="ser-bloody-tag">January 1905 — St. Petersburg</div>
            <div className="ser-bloody-head">Bloody Sunday — The State Fires on Its Own People</div>
            <div className="ser-bloody-body">
              By 1904, prices of essential goods had risen so rapidly that <strong>real wages declined by 20%</strong>. When four workers at the Putilov Iron Works were dismissed, a call to action went out. Over <strong>110,000 workers in St. Petersburg</strong> went on strike demanding shorter working hours and higher wages. A peaceful procession was organised, led by <strong>Father Gapon</strong>, to march to the Tsar's Winter Palace and petition him directly. The procession was <strong>attacked by the police and Cossacks</strong>. Over <strong>100 workers were killed</strong> — shot down while marching peacefully. Strikes erupted across Russia. The people demanded a <strong>constituent assembly</strong>. The Tsar was forced to allow the creation of an elected consultative Parliament — the <strong>Duma</strong>. But he dismissed the first Duma within just <strong>75 days</strong> and called a second — showing he had no intention of genuinely sharing power.
            </div>
          </div>

          <div className="ser-divider"><div className="ser-divider-mark" /></div>

          {/* ── 6. WWI & Russia ── */}
          <div className="ser-sec-head">
            <div className="ser-sec-num">6</div>
            <div className="ser-sec-title-wrap">
              <div className="ser-sec-kicker">1914 – 1917</div>
              <h2 className="ser-sec-title">World War I &amp; the <span>Russian Empire</span></h2>
            </div>
          </div>

          <p className="ser-body-text">
            When war broke out in 1914, it was initially popular in Russia — anti-German sentiments ran high and people rallied around the Tsar. But the reality of the war quickly shattered that enthusiasm and pushed Russia to the breaking point.
          </p>

          <div className="ser-contrast">
            <div className="ser-contrast-col">
              <div className="ser-contrast-label red-lbl">Military Disaster</div>
              <ul>
                <li>Russian armies suffered <strong>catastrophic defeats</strong> in Germany and Austria</li>
                <li>There were <strong>7 million casualties</strong> — dead, wounded, and missing</li>
                <li>An additional <strong>3 million refugees</strong> were displaced across Russia</li>
                <li>The army was <strong>poorly equipped, poorly led</strong>, and increasingly demoralised</li>
                <li>Support for the war <strong>quickly grew thin</strong> among soldiers and civilians alike</li>
              </ul>
            </div>
            <div className="ser-contrast-col dark">
              <div className="ser-contrast-label gold-lbl">Economic Collapse at Home</div>
              <ul>
                <li>The war devastated the <strong>industrial economy</strong> — factories were disrupted</li>
                <li><strong>Labour shortage</strong> crippled production as men were conscripted into the army</li>
                <li><strong>Railway lines were shut down</strong> — cutting off food supply chains</li>
                <li><strong>Small workshops were closed</strong> — mass unemployment in cities</li>
                <li>Shortage of <strong>grain and bread</strong> — the same crisis that had sparked the 1905 Revolution returned, but worse</li>
              </ul>
            </div>
          </div>

          <div className="ser-pull-quote">
            <p>The war that was supposed to unite Russia behind the Tsar instead exposed every weakness of Tsarist rule — and handed the Bolsheviks their revolution.</p>
            <cite>— World War I and the Fall of the Tsar</cite>
          </div>

          <div className="ser-divider"><div className="ser-divider-mark" /></div>

          {/* ── 7. February Revolution ── */}
          <div className="ser-sec-head">
            <div className="ser-sec-num">7</div>
            <div className="ser-sec-title-wrap">
              <div className="ser-sec-kicker">Winter 1917 — Petrograd</div>
              <h2 className="ser-sec-title">The <span>February Revolution</span></h2>
            </div>
          </div>

          <p className="ser-body-text">
            In the bitter winter of 1917, Petrograd (St. Petersburg) was a city on the edge. Food had run out in the workers' quarters. The streets were cold, hungry, and angry. What began as a factory lockout became, within days, the end of 300 years of Tsarist rule.
          </p>

          <div className="ser-timeline">
            {[
              { year:"22 Feb", head:"The Lockout — Workers Unite", desc:<>A lockout at a factory triggered workers of <strong>50 other factories</strong> to join in sympathy. <strong>Women led and participated</strong> in the strikes prominently — this day is celebrated as <strong>International Women's Day</strong>. The government imposed a curfew as workers surrounded official buildings.</> },
              { year:"24–25\nFeb", head:"Cavalry and Police Called Out", desc:<>The government deployed the <strong>cavalry and police</strong> to monitor and suppress the crowds. On <strong>25 February</strong>, the government suspended the Duma — a dramatic escalation. Politicians publicly criticised this move. Workers returned to the streets in greater force.</> },
              { year:"27 Feb", head:"Police HQ Ransacked — Army Mutinies", desc:<>The <strong>police headquarters were ransacked</strong> by the crowds. The cavalry was called out again — but this time <strong>refused to fire on demonstrators</strong>. At a barracks, an officer was shot by his own regiment. Other regiments mutinied and <strong>voted to join the striking workers</strong>. Together they formed the <strong>Petrograd Soviet</strong> — a workers' and soldiers' council.</> },
              { year:"2 Mar\n1917", head:"Tsar Abdicates — Provisional Government Formed", desc:<>A delegation went to meet the Tsar. <strong>Military commanders advised him to abdicate</strong> — even his own generals had turned against him. The <strong>Tsar abdicated on 2nd March 1917</strong>. A <strong>Provisional Government</strong> was formed jointly by Soviet and Duma leaders to run the country.</> },
            ].map((t, i) => (
              <div className="ser-tl-item" key={i}>
                <div className="ser-tl-year-col">
                  <div className="ser-tl-year" style={{whiteSpace:'pre-line'}}>{t.year}</div>
                </div>
                <div className="ser-tl-content">
                  <div className="ser-tl-head">{t.head}</div>
                  <div className="ser-tl-desc">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="ser-event-grid">
            <div className="ser-event-card">
              <div className="ser-event-tag">Effects of February Revolution</div>
              <div className="ser-event-title">What Changed Immediately</div>
              <ul>
                <li>Restrictions on <strong>public meetings and associations were removed</strong></li>
                <li><strong>Soviets (workers' councils) were set up everywhere</strong> across Russia</li>
                <li><strong>Factory committees</strong> formed and began questioning how industrialists ran their factories</li>
                <li><strong>Soldiers' committees</strong> formed in the army — challenging officers' authority</li>
                <li>The Provisional Government's power <strong>declined rapidly</strong> as Bolshevik influence grew</li>
              </ul>
            </div>
            <div className="ser-event-card dark">
              <div className="ser-event-tag">The Unresolved Crisis</div>
              <div className="ser-event-title">The Dual Power Problem</div>
              <ul>
                <li>The <strong>Provisional Government</strong> wanted to continue the war — deeply unpopular with workers and soldiers</li>
                <li>It <strong>resisted workers' attempts to run factories</strong> and arrested their leaders</li>
                <li>Peasants and socialist leaders <strong>pressed for redistribution of land</strong></li>
                <li>Land committees formed; peasants <strong>seized land between July and September 1917</strong></li>
                <li><strong>Lenin and the Bolsheviks</strong> were waiting — promising "Peace, Land, and Bread"</li>
              </ul>
            </div>
          </div>

          <div className="ser-divider"><div className="ser-divider-mark" /></div>

          {/* ── 8. October Revolution ── */}
          <div className="ser-sec-head">
            <div className="ser-sec-num">8</div>
            <div className="ser-sec-title-wrap">
              <div className="ser-sec-kicker">24–25 October 1917</div>
              <h2 className="ser-sec-title">The <span>October Revolution</span></h2>
            </div>
          </div>

          <p className="ser-body-text">
            Unlike the spontaneous February Revolution, the <strong>October Revolution was a planned, organised seizure of power</strong> by the Bolsheviks under Lenin. Within 24 hours, the world had changed.
          </p>

          <div className="ser-october">
            <div className="ser-october-tag">The Bolshevik Seizure of Power — October 1917</div>
            <div className="ser-october-head">How Lenin's Bolsheviks Took Control in One Night</div>
            <div className="ser-october-grid">
              <div className="ser-october-col">
                <div className="ser-october-col-label events">Events — The Seizure</div>
                <ul>
                  <li><strong>16 October</strong> — Lenin convinced the Petrograd Soviet and Bolshevik Party to approve a socialist seizure of power. A <strong>Military Revolutionary Committee</strong> was appointed to organise it</li>
                  <li><strong>24 October</strong> — Uprising began. PM Kerensky fled the city to get troops. Government men seized Bolshevik newspaper offices; pro-government troops sent to protect the <strong>Winter Palace</strong></li>
                  <li>The MRC ordered seizure of <strong>government offices</strong> and arrested ministers</li>
                  <li>The warship <strong>Aurora shelled the Winter Palace</strong>. Other ships seized strategic points</li>
                  <li>By night the entire city was taken; <strong>ministers surrendered</strong>. The All-Russian Congress of Soviets approved Bolshevik action</li>
                  <li>By December — after heavy fighting in Moscow — Bolsheviks controlled the <strong>Moscow-Petrograd area</strong></li>
                </ul>
              </div>
              <div className="ser-october-col">
                <div className="ser-october-col-label effects">Immediate Effects</div>
                <ul>
                  <li>Most industry and banks <strong>nationalised in November 1917</strong></li>
                  <li>Land declared <strong>social property</strong> — peasants allowed to seize nobles' land</li>
                  <li><strong>Aristocratic titles abolished</strong> — new uniforms designed for army and officials</li>
                  <li>Russia became a <strong>one-party state</strong>; trade unions kept under party control</li>
                  <li><strong>Centralised planning</strong> introduced — led to rapid economic growth and rising industrial production</li>
                  <li>Extended <strong>schooling system</strong> developed across Russia</li>
                  <li><strong>Collectivisation of farms</strong> started — changing agriculture fundamentally</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="ser-divider"><div className="ser-divider-mark" /></div>

          {/* ── 9. Civil War ── */}
          <div className="ser-sec-head">
            <div className="ser-sec-num">9</div>
            <div className="ser-sec-title-wrap">
              <div className="ser-sec-kicker">1918 – 1921</div>
              <h2 className="ser-sec-title">The Russian <span className="purp">Civil War</span></h2>
            </div>
          </div>

          <p className="ser-body-text">
            The Bolshevik seizure of power was not accepted without a fight. When the Bolsheviks ordered land redistribution, the Russian army began to break up. Non-Bolshevik socialists, liberals, and supporters of autocracy all condemned the uprising — and took up arms against the new government.
          </p>

          <div className="ser-civil">
            <div className="ser-civil-tag">The Russian Civil War — 1918–1921</div>
            <div className="ser-civil-head">Three Armies, One Devastated Country</div>
            <div className="ser-civil-factions">
              <div className="ser-faction red-f">
                <div className="ser-faction-name">🔴 The Reds</div>
                <div className="ser-faction-desc">The <strong>Bolshevik Red Army</strong> — built by Leon Trotsky. Fought to defend the October Revolution and establish a socialist state. Despite being outnumbered, they had the advantage of controlling the major cities and industrial centres.</div>
              </div>
              <div className="ser-faction white-f">
                <div className="ser-faction-name">⚪ The Whites</div>
                <div className="ser-faction-desc">Pro-Tsar forces — <strong>supporters of the old autocracy</strong>. Controlled most of the Russian empire at various points. Supported by <strong>French, American, British, and Japanese troops</strong> — foreign powers terrified of communist contagion spreading to their own countries.</div>
              </div>
              <div className="ser-faction green-f">
                <div className="ser-faction-name">🟢 The Greens</div>
                <div className="ser-faction-desc">A broad anti-Bolshevik coalition of <strong>non-Bolshevik socialists, liberals, and anarchists</strong>. Formed their own armed troops to fight the Bolsheviks. Ultimately lacked the unity and organisation to prevail against the disciplined Red Army.</div>
              </div>
            </div>
          </div>

          <div className="ser-divider"><div className="ser-divider-mark" /></div>

          {/* ── 10. Making a Socialist Society ── */}
          <div className="ser-sec-head">
            <div className="ser-sec-num">10</div>
            <div className="ser-sec-title-wrap">
              <div className="ser-sec-kicker">Building the New State</div>
              <h2 className="ser-sec-title">Making a <span className="teal">Socialist Society</span></h2>
            </div>
          </div>

          <p className="ser-body-text">
            Even during the brutal civil war, the Bolsheviks were building a new kind of society. The state nationalised industries and banks, centralised economic planning, and invested in education and infrastructure on an unprecedented scale.
          </p>

          <ul className="ser-list">
            <li>The Bolsheviks kept <strong>industries and banks nationalised</strong> throughout the civil war — refusing to let private capital return</li>
            <li>A process of <strong>centralised planning</strong> was introduced — the state directed the entire economy, deciding what to produce, at what price, and in what quantity</li>
            <li><strong>Rapid construction and industrialisation</strong> began — factories, dams, railways were built at enormous speed</li>
            <li>An <strong>extended schooling system</strong> was developed — aiming to eliminate illiteracy across Russia's vast and diverse population</li>
            <li><strong>Collectivisation of farms</strong> began — merging small private farms into large state-controlled collectives</li>
          </ul>

          <div className="ser-divider"><div className="ser-divider-mark" /></div>

          {/* ── 11. Stalin & Collectivisation ── */}
          <div className="ser-sec-head">
            <div className="ser-sec-num">11</div>
            <div className="ser-sec-title-wrap">
              <div className="ser-sec-kicker">Soviet Agriculture</div>
              <h2 className="ser-sec-title">Stalin &amp; <span className="gold">Collective Farming</span></h2>
            </div>
          </div>

          <p className="ser-body-text">
            After Lenin's death, <strong>Joseph Stalin</strong> took power and pushed Soviet society through a brutal second revolution — the forced collectivisation of agriculture. What Lenin had built with ideology, Stalin would enforce with terror.
          </p>

          <div className="ser-event-grid">
            <div className="ser-event-card">
              <div className="ser-event-tag">Stalin's Logic</div>
              <div className="ser-event-title">Why Collectivise?</div>
              <ul>
                <li>Stalin believed <strong>rich peasants (kulaks) and traders were hoarding grain</strong> to create artificial shortages and sabotage the socialist state</li>
                <li>Collectivisation was the answer — <strong>merge small farms into large collective farms</strong> under state control</li>
                <li>This would allow modern machinery and techniques to <strong>modernise Soviet agriculture</strong></li>
                <li>Increased grain production would <strong>fund rapid industrialisation</strong> — the state's primary goal</li>
                <li>Collective farms would eliminate the kulak class and bring peasants under <strong>socialist organisation</strong></li>
              </ul>
            </div>
            <div className="ser-event-card dark">
              <div className="ser-event-tag">The Human Cost</div>
              <div className="ser-event-title">Resistance & Punishment</div>
              <ul>
                <li>Farmers who <strong>resisted collectivisation were punished, deported, or exiled</strong> to Siberian labour camps</li>
                <li>Particularly the <strong>kulaks</strong> — labelled enemies of the people and systematically persecuted</li>
                <li>The resulting disruption to agriculture caused <strong>devastating famines</strong> in the early 1930s — millions died</li>
                <li>Despite the suffering, the Soviet state achieved its goal: <strong>agricultural output came under state control</strong></li>
                <li>The grain was used to fund <strong>rapid heavy industrialisation</strong> — transforming the USSR into an industrial superpower</li>
              </ul>
            </div>
          </div>

          <div className="ser-divider"><div className="ser-divider-mark" /></div>

          {/* ── 12. Global Influence ── */}
          <div className="ser-sec-head">
            <div className="ser-sec-num">12</div>
            <div className="ser-sec-title-wrap">
              <div className="ser-sec-kicker">The 20th Century Legacy</div>
              <h2 className="ser-sec-title">Global <span>Influence</span></h2>
            </div>
          </div>

          <p className="ser-body-text">
            By the <strong>1950s</strong>, it was recognised both inside Russia and outside that <strong>not everything was in keeping with the ideals of the Russian Revolution</strong>. Though industries and agriculture had developed and the poor were being fed, the essential freedom to its citizens was being denied. Yet the social ideals of the Revolution still enjoyed deep respect — and its influence had spread far beyond Russia's borders.
          </p>

          <ul className="ser-list">
            <li>The Revolution proved that a <strong>workers' socialist government could seize and hold state power</strong> — inspiring communist movements in China, Cuba, Vietnam, Korea, and across Africa and Latin America</li>
            <li>Though rapid <strong>industrial and agricultural development</strong> was achieved, citizens were denied <strong>essential freedoms</strong> — a contradiction at the heart of Soviet socialism</li>
            <li>The social ideals of equality and workers' rights <strong>still enjoyed respect among Russians</strong> and socialists worldwide, even as the government betrayed many of those ideals</li>
            <li>In <strong>each country, the ideas of socialism were rethought in different ways</strong> — adapted to local conditions rather than simply copying the Soviet model</li>
            <li>The tension between revolutionary ideals and one-party authoritarian rule became the <strong>central contradiction of 20th-century socialism</strong> — one that ultimately contributed to the USSR's collapse in 1991</li>
          </ul>

          <div className="ser-pull-quote">
            <p>The Russian Revolution gave the world its boldest experiment in equality. Its success at industrialisation and its failure at freedom became the defining paradox of the entire 20th century.</p>
            <cite>— The Global Legacy of 1917</cite>
          </div>

          <div className="ser-divider"><div className="ser-divider-mark" /></div>

          {/* ── FAQ ── */}
          <div className="ser-faq-header">
            <span className="ser-faq-kicker">Exam Preparation</span>
          </div>
          <h2 className="ser-faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, i) => (
            <div className={`ser-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="ser-faq-q" onClick={() => toggle(i)}>
                <span className="ser-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="ser-faq-icon">{openIndex === i ? "▴" : "▾"}</span>
              </button>
              <div className={`ser-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
