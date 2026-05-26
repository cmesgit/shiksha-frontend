import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #10090a;
    --ink2:       #1e1014;
    --muted:      #7a6068;
    --paper:      #faf6f7;
    --paper2:     #f3eced;
    --paper3:     #e8dede;
    --crimson:    #9b1a2e;
    --crimson2:   #7a1222;
    --crimson-lt: #fce8ec;
    --gold:       #b8860b;
    --gold2:      #8b6508;
    --navy:       #1a2a4a;
    --navy2:      #0f1c33;
    --rule:       #d4c0c4;
    --liberty:    #2c5282;
    --green:      #1a5c2a;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .tfr-root {
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
  }

  /* ─── HERO ─── */
  .tfr-hero {
    background: linear-gradient(155deg, #0a0406 0%, #140a0c 45%, #0a0c14 100%);
    min-height: 88vh;
    display: flex; align-items: flex-end;
    position: relative; overflow: hidden;
    padding: 0 0 64px;
  }
  .tfr-hero-bg-num {
    position: absolute; bottom: -40px; right: -20px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(240px, 38vw, 520px); font-weight: 900; line-height: 1;
    color: rgba(255,255,255,0.022); letter-spacing: -0.04em;
    user-select: none; pointer-events: none;
  }
  /* French tricolor top rule */
  .tfr-hero::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #002395 33%, #ffffff 33%, #ffffff 66%, #ED2939 66%);
  }
  .tfr-ring {
    position: absolute; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.018);
    pointer-events: none;
  }
  .tfr-hero-inner {
    max-width: 900px; width: 100%;
    margin: 0 auto; padding: 0 32px;
    position: relative; z-index: 1;
  }
  .tfr-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #e84060; margin-bottom: 24px;
    display: flex; align-items: center; gap: 14px;
  }
  .tfr-overline::before, .tfr-overline::after {
    content: ''; flex: 0 0 40px; height: 1px; background: #e84060;
  }
  .tfr-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(44px, 8vw, 88px); font-weight: 900;
    color: #fff; line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 32px;
  }
  .tfr-hero-title em       { font-style: normal; color: #e84060; }
  .tfr-hero-title .blue-em { color: #6b96d4; }
  .tfr-hero-title .gold-em { color: #e8c040; }
  .tfr-hero-bar {
    display: flex; flex-wrap: wrap; gap: 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 24px; margin-top: 8px;
  }
  .tfr-hero-bar-item {
    flex: 1 1 150px; padding: 0 24px 0 0;
    border-right: 1px solid rgba(255,255,255,0.1); margin-right: 24px;
  }
  .tfr-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .tfr-bar-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.35); margin-bottom: 5px;
  }
  .tfr-bar-value {
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600;
    color: rgba(255,255,255,0.75);
  }

  /* ─── BODY ─── */
  .tfr-body { max-width: 860px; margin: 0 auto; padding: 72px 32px 96px; }

  /* LEAD */
  .tfr-lead {
    border-left: 5px solid var(--crimson);
    padding: 28px 36px; margin-bottom: 64px; background: var(--paper2);
  }
  .tfr-lead p {
    font-family: 'Poppins', sans-serif; font-size: 19px; font-weight: 500;
    color: var(--ink2); line-height: 1.78; margin: 0 0 14px;
  }
  .tfr-lead p:last-child { margin: 0; }
  .tfr-lead strong { color: var(--crimson); }

  /* SECTION HEADER */
  .tfr-sec-head {
    display: flex; align-items: flex-start; gap: 20px;
    margin-bottom: 28px; border-bottom: 2px solid var(--rule); padding-bottom: 18px;
  }
  .tfr-sec-num {
    font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900;
    color: var(--rule); line-height: 1; flex-shrink: 0; margin-top: 4px;
  }
  .tfr-sec-title-wrap { display: flex; flex-direction: column; justify-content: flex-end; }
  .tfr-sec-kicker {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--crimson); margin-bottom: 4px;
  }
  .tfr-sec-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(22px, 3.5vw, 32px); font-weight: 900;
    color: var(--ink); line-height: 1.15; letter-spacing: -0.01em;
  }
  .tfr-sec-title span        { color: var(--crimson); }
  .tfr-sec-title .gold       { color: var(--gold); }
  .tfr-sec-title .navy       { color: var(--navy); }
  .tfr-sec-title .red        { color: #c0392b; }
  .tfr-sec-title .green-txt  { color: var(--green); }

  /* BODY TEXT */
  .tfr-body-text {
    font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 400;
    color: #1e1014; line-height: 1.82; margin-bottom: 24px;
  }
  .tfr-body-text strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── ESTATE GRID — 3 columns ── */
  .tfr-estate-grid {
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    gap: 2px; background: var(--rule); margin-bottom: 48px;
  }
  .tfr-estate-card { background: var(--paper); padding: 28px 22px; }
  .tfr-estate-card.dark { background: var(--ink); }
  .tfr-estate-num {
    font-family: 'Montserrat', sans-serif; font-size: 48px; font-weight: 900;
    line-height: 1; margin-bottom: 10px; letter-spacing: -0.03em; color: var(--rule);
  }
  .tfr-estate-card.dark .tfr-estate-num { color: rgba(255,255,255,0.1); }
  .tfr-estate-name {
    font-family: 'Montserrat', sans-serif; font-size: 17px; font-weight: 900;
    color: var(--ink); margin-bottom: 4px; letter-spacing: -0.01em;
  }
  .tfr-estate-card.dark .tfr-estate-name { color: #fff; }
  .tfr-estate-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.16em;
    color: var(--crimson); margin-bottom: 14px;
  }
  .tfr-estate-card.dark .tfr-estate-tag { color: #e84060; }
  .tfr-estate-card ul { padding-left: 16px; margin: 0; }
  .tfr-estate-card ul li {
    font-size: 14px; line-height: 1.7; color: var(--ink2); margin-bottom: 7px;
  }
  .tfr-estate-card.dark ul li { color: rgba(255,255,255,0.72); }
  .tfr-estate-card ul li strong { font-family:'Poppins',sans-serif; font-weight:700; color: var(--crimson); }
  .tfr-estate-card.dark ul li strong { color: #e84060; }

  /* ── DARK DEF BOX ── */
  .tfr-def-box {
    background: var(--ink); padding: 32px 36px;
    margin-bottom: 48px; border-top: 4px solid var(--crimson);
  }
  .tfr-def-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; color: #e84060; margin-bottom: 10px;
  }
  .tfr-def-term {
    font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900;
    color: #fff; letter-spacing: -0.02em; margin-bottom: 14px;
  }
  .tfr-def-text {
    font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 400;
    color: rgba(255,255,255,0.72); line-height: 1.8;
  }
  .tfr-def-text strong { color: #e84060; font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── PHILOSOPHER ROW ── */
  .tfr-phil-row {
    display: grid; grid-template-columns: 1fr 1fr; gap: 2px;
    background: var(--rule); margin-bottom: 48px;
  }
  .tfr-phil-card { background: var(--paper2); padding: 28px 26px; }
  .tfr-phil-initial {
    width: 52px; height: 52px; background: var(--navy);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Montserrat', sans-serif; font-size: 26px; font-weight: 900; color: #fff;
    margin-bottom: 14px;
  }
  .tfr-phil-name {
    font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900;
    color: var(--ink); margin-bottom: 4px;
  }
  .tfr-phil-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.16em; color: var(--navy); margin-bottom: 14px;
  }
  .tfr-phil-card ul { padding-left: 18px; margin: 0; }
  .tfr-phil-card ul li {
    font-size: 15px; line-height: 1.72; color: var(--ink2); margin-bottom: 7px;
  }
  .tfr-phil-card ul li strong { font-family:'Poppins',sans-serif; font-weight:700; color: var(--navy); }

  /* ── STAT ROW ── */
  .tfr-stat-row { display: flex; flex-wrap: wrap; gap: 2px; margin-bottom: 48px; background: var(--rule); }
  .tfr-stat-box { flex: 1 1 130px; background: var(--paper); padding: 24px 18px; text-align: center; }
  .tfr-stat-val {
    font-family: 'Montserrat', sans-serif; font-size: 26px; font-weight: 900;
    color: var(--crimson); line-height: 1.1; margin-bottom: 6px; letter-spacing: -0.02em;
  }
  .tfr-stat-label {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 600;
    color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; line-height: 1.4;
  }

  /* ── TIMELINE ── */
  .tfr-timeline { margin-bottom: 48px; }
  .tfr-tl-item {
    display: grid; grid-template-columns: 120px 1fr;
    gap: 0; border-bottom: 1px solid var(--rule);
  }
  .tfr-tl-item:first-child { border-top: 1px solid var(--rule); }
  .tfr-tl-year-col {
    padding: 22px 20px 22px 0;
    border-right: 3px solid var(--crimson);
    display: flex; align-items: flex-start; justify-content: flex-end;
  }
  .tfr-tl-year {
    font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 900;
    color: var(--crimson); letter-spacing: 0.04em; text-align: right; line-height: 1.3;
  }
  .tfr-tl-content { padding: 22px 0 22px 24px; }
  .tfr-tl-head {
    font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 700;
    color: var(--ink); margin-bottom: 6px;
  }
  .tfr-tl-desc {
    font-family: 'Inter', sans-serif; font-size: 15px;
    color: #3d2832; line-height: 1.76;
  }
  .tfr-tl-desc strong { color: var(--crimson); font-family:'Poppins',sans-serif; font-weight:700; }

  /* ── POLITICAL GROUPS ── */
  .tfr-groups {
    background: var(--navy); padding: 36px 36px 28px; margin-bottom: 48px;
    border-top: 4px solid var(--liberty);
  }
  .tfr-groups-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.22em; color: rgba(255,255,255,0.45);
    margin-bottom: 20px;
  }
  .tfr-groups-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .tfr-group-card {
    background: rgba(255,255,255,0.06); padding: 20px 22px;
    border-left: 3px solid var(--liberty);
  }
  .tfr-group-card.red-left { border-left-color: var(--crimson); }
  .tfr-group-card.gold-left { border-left-color: #e8c040; }
  .tfr-group-name {
    font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 900;
    color: #fff; margin-bottom: 4px;
  }
  .tfr-group-sub {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.14em; color: #6b96d4; margin-bottom: 10px;
  }
  .tfr-group-card.red-left  .tfr-group-sub { color: #e84060; }
  .tfr-group-card.gold-left .tfr-group-sub { color: #e8c040; }
  .tfr-group-desc {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: rgba(255,255,255,0.65); line-height: 1.7;
  }
  .tfr-group-desc strong { color: #fff; font-family:'Poppins',sans-serif; font-weight:700; }

  /* ── JACOBIN HIGHLIGHT ── */
  .tfr-jacobin {
    background: var(--crimson); padding: 32px 36px; margin-bottom: 48px;
    position: relative; overflow: hidden;
  }
  .tfr-jacobin::before {
    content: 'J'; position: absolute; right: -10px; top: -30px;
    font-family: 'Montserrat', sans-serif; font-size: 200px; font-weight: 900;
    color: rgba(0,0,0,0.12); line-height: 1; pointer-events: none;
  }
  .tfr-jacobin-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.6);
    margin-bottom: 10px;
  }
  .tfr-jacobin-head {
    font-family: 'Montserrat', sans-serif; font-size: clamp(20px,3vw,26px); font-weight: 900;
    color: #fff; margin-bottom: 14px; letter-spacing: -0.01em; position: relative; z-index: 1;
  }
  .tfr-jacobin-body {
    font-family: 'Inter', sans-serif; font-size: 16px;
    color: rgba(255,255,255,0.85); line-height: 1.78; position: relative; z-index: 1;
  }
  .tfr-jacobin-body strong { color: #fff; font-family:'Poppins',sans-serif; font-weight:700; }

  /* ── TWO-COL CONTRAST BLOCK ── */
  .tfr-contrast {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0; background: var(--rule); margin-bottom: 48px;
  }
  .tfr-contrast-col { background: var(--paper2); padding: 28px 26px; }
  .tfr-contrast-col.dark { background: var(--ink2); border-left: 1px solid rgba(255,255,255,0.06); }
  .tfr-contrast-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.18em; margin-bottom: 14px;
  }
  .tfr-contrast-label.pos { color: var(--green); }
  .tfr-contrast-label.neg { color: var(--crimson); }
  .tfr-contrast-label.gold-lbl { color: var(--gold); }
  .tfr-contrast-col ul { padding-left: 18px; margin: 0; }
  .tfr-contrast-col ul li {
    font-size: 15px; line-height: 1.74; color: var(--ink2); margin-bottom: 9px;
  }
  .tfr-contrast-col.dark ul li { color: rgba(255,255,255,0.72); }
  .tfr-contrast-col ul li strong { font-family:'Poppins',sans-serif; font-weight:700; color: var(--ink); }
  .tfr-contrast-col.dark ul li strong { color: #fff; }

  /* ── NAPOLEON CARD ── */
  .tfr-napoleon {
    display: grid; grid-template-columns: 80px 1fr;
    gap: 0; margin-bottom: 48px; background: var(--paper2);
    border-left: 5px solid var(--gold);
  }
  .tfr-napoleon-initial-col {
    background: var(--gold); display: flex; align-items: center; justify-content: center;
  }
  .tfr-napoleon-initial {
    font-family: 'Montserrat', sans-serif; font-size: 40px; font-weight: 900; color: #fff;
  }
  .tfr-napoleon-content { padding: 24px 28px; }
  .tfr-napoleon-name {
    font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900;
    color: var(--ink); margin-bottom: 4px; letter-spacing: -0.01em;
  }
  .tfr-napoleon-role {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.14em; color: var(--gold); margin-bottom: 14px;
  }
  .tfr-napoleon-content ul { padding-left: 18px; margin: 0; }
  .tfr-napoleon-content ul li {
    font-size: 15px; line-height: 1.74; color: var(--ink2); margin-bottom: 7px;
  }
  .tfr-napoleon-content ul li strong { font-family:'Poppins',sans-serif; font-weight:700; color: var(--gold2); }

  /* ── SLAVERY BLOCK ── */
  .tfr-slavery {
    background: var(--ink); padding: 32px 36px; margin-bottom: 48px;
    border-top: 4px solid var(--gold);
  }
  .tfr-slavery-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.45);
    margin-bottom: 10px;
  }
  .tfr-slavery-head {
    font-family: 'Montserrat', sans-serif; font-size: clamp(18px,2.8vw,24px); font-weight: 900;
    color: #fff; margin-bottom: 16px;
  }
  .tfr-slavery-body ul { padding-left: 20px; margin: 0; }
  .tfr-slavery-body ul li {
    font-size: 15px; line-height: 1.76; color: rgba(255,255,255,0.72); margin-bottom: 9px;
  }
  .tfr-slavery-body ul li strong { font-family:'Poppins',sans-serif; font-weight:700; color: #e8c040; }

  /* ── LEGACY GRID ── */
  .tfr-legacy-grid {
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    gap: 2px; background: var(--rule); margin-bottom: 48px;
  }
  .tfr-legacy-card { background: var(--paper); padding: 26px 22px; }
  .tfr-legacy-icon { font-size: 28px; margin-bottom: 10px; }
  .tfr-legacy-title {
    font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 900;
    color: var(--ink); margin-bottom: 8px;
  }
  .tfr-legacy-body {
    font-family: 'Inter', sans-serif; font-size: 14px; color: #3d2832; line-height: 1.74;
  }
  .tfr-legacy-body strong { font-family:'Poppins',sans-serif; font-weight:700; color: var(--crimson); }

  /* ── PULL QUOTE ── */
  .tfr-pull-quote {
    margin: 40px 0; padding: 32px 40px;
    background: var(--ink); position: relative;
  }
  .tfr-pull-quote::before {
    content: '"'; position: absolute; top: -18px; left: 28px;
    font-family: 'Montserrat', sans-serif; font-size: 120px; font-weight: 900;
    color: var(--crimson); line-height: 1;
  }
  .tfr-pull-quote p {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(17px,2.4vw,22px); font-weight: 800;
    color: #fff; line-height: 1.45; letter-spacing: -0.01em;
    position: relative; z-index: 1; margin-bottom: 12px;
  }
  .tfr-pull-quote cite {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600;
    color: #e84060; text-transform: uppercase; letter-spacing: 0.12em; font-style: normal;
  }

  /* ── BULLET LIST ── */
  .tfr-list { margin: 0 0 28px; padding: 0; list-style: none; }
  .tfr-list li {
    font-size: 16px; line-height: 1.78; color: #1e1014;
    padding: 10px 0 10px 28px; position: relative;
    border-bottom: 1px solid var(--rule);
  }
  .tfr-list li:first-child { border-top: 1px solid var(--rule); }
  .tfr-list li::before {
    content: ''; position: absolute; left: 0; top: 18px;
    width: 10px; height: 10px;
    border: 2px solid var(--crimson); transform: rotate(45deg);
  }
  .tfr-list li strong { color: var(--ink); font-family:'Poppins',sans-serif; font-weight:700; }

  /* ── SECTION DIVIDER ── */
  .tfr-divider { display: flex; align-items: center; gap: 16px; margin: 56px 0; }
  .tfr-divider::before, .tfr-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .tfr-divider-mark { width: 10px; height: 10px; background: var(--crimson); transform: rotate(45deg); flex-shrink: 0; }

  /* ── FAQ ── */
  .tfr-faq-header {
    border-bottom: 3px solid var(--ink); padding-bottom: 14px; margin-bottom: 0;
    display: flex; align-items: baseline; gap: 16px;
  }
  .tfr-faq-kicker {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--crimson);
  }
  .tfr-faq-title {
    font-family: 'Montserrat', sans-serif; font-size: clamp(24px,4vw,34px); font-weight: 900;
    color: var(--ink); letter-spacing: -0.01em; margin: 20px 0 32px;
  }
  .tfr-faq-item { border-bottom: 1px solid var(--rule); overflow: hidden; }
  .tfr-faq-item.open { background: var(--paper2); }
  .tfr-faq-q {
    width: 100%; text-align: left; background: none; border: none; cursor: pointer;
    padding: 20px 0; display: grid; grid-template-columns: 1fr 32px;
    gap: 16px; align-items: start;
  }
  .tfr-faq-q-text {
    font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 600;
    color: var(--ink); line-height: 1.5; text-align: left; padding-left: 4px;
  }
  .tfr-faq-item.open .tfr-faq-q-text { color: var(--crimson2); }
  .tfr-faq-icon {
    width: 28px; height: 28px; border: 1.5px solid var(--rule);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; color: var(--crimson); flex-shrink: 0; margin-top: 2px;
    font-family: 'Poppins', sans-serif; font-weight: 700;
  }
  .tfr-faq-item.open .tfr-faq-icon { background: var(--ink); border-color: var(--ink); color: #e84060; }
  .tfr-faq-ans {
    display: none; padding: 0 4px 22px;
    font-size: 16px; line-height: 1.82; color: #374151;
  }
  .tfr-faq-ans.visible { display: block; }
  .tfr-faq-ans ul { padding-left: 20px; margin: 8px 0; }
  .tfr-faq-ans ul li { margin-bottom: 7px; }
  .tfr-faq-ans strong { color: var(--ink); font-family:'Poppins',sans-serif; font-weight:700; }
  .tfr-faq-ans p { margin: 0 0 10px; }
  .tfr-faq-ans p:last-child { margin: 0; }

  @media (max-width: 620px) {
    .tfr-hero          { min-height: auto; padding: 80px 0 48px; }
    .tfr-estate-grid   { grid-template-columns: 1fr; }
    .tfr-phil-row      { grid-template-columns: 1fr; }
    .tfr-groups-grid   { grid-template-columns: 1fr; }
    .tfr-contrast      { grid-template-columns: 1fr; }
    .tfr-legacy-grid   { grid-template-columns: 1fr; }
    .tfr-napoleon      { grid-template-columns: 60px 1fr; }
    .tfr-tl-item       { grid-template-columns: 80px 1fr; }
  }
`;

const faqs = [
  {
    q: "What was the condition of France before the French Revolution?",
    a: (<>
      <p>France before the Revolution was in a state of deep crisis — economically, socially, and politically:</p>
      <ul>
        <li><strong>Financial collapse:</strong> When Louis XVI ascended the throne in 1774, France was drowning in debt of <strong>2 billion livres</strong>. Costly wars, especially French support for the American Revolution, had emptied the treasury completely</li>
        <li><strong>Unjust social structure:</strong> French society was divided into <strong>three Estates</strong>. The First (Clergy) and Second (Nobility) enjoyed enormous privileges and paid almost no taxes, while the Third Estate — comprising nearly 98% of the population — bore the entire burden of taxation</li>
        <li><strong>Subsistence crisis:</strong> France's population was growing rapidly, which increased the demand for grain. Bad harvests led to soaring bread prices. The poor could barely afford food — a classic <strong>subsistence crisis</strong></li>
        <li><strong>Growing inequality:</strong> The gap between the rich and poor was widening dangerously. Even within the Third Estate, there were wealthy merchants and professionals alongside desperately poor peasants, artisans, and landless labourers</li>
        <li><strong>Rising middle class with new ideas:</strong> An educated, enlightened middle class had emerged that rejected the idea of privilege by birth. They were inspired by philosophers like <strong>Locke and Rousseau</strong> who argued for natural rights, equality, and accountable government</li>
      </ul>
    </>),
  },
  {
    q: "What was the Subsistence Crisis? What caused it in France?",
    a: (<>
      <p>A <strong>Subsistence Crisis</strong> is an extreme situation where the basic means of livelihood — particularly food — become dangerously scarce and unaffordable for a large portion of the population.</p>
      <p>In France, the subsistence crisis was caused by several interlocking factors:</p>
      <ul>
        <li><strong>Population explosion:</strong> The population of France grew rapidly in the 18th century, dramatically increasing the demand for grain and food</li>
        <li><strong>Bad harvests:</strong> Several consecutive poor harvests between 1788–89 reduced the grain supply precisely when demand was at its highest — a catastrophic combination</li>
        <li><strong>Rising bread prices:</strong> As grain became scarce, bread prices skyrocketed. Bread was the staple diet of the poor — when they could no longer afford it, starvation threatened millions</li>
        <li><strong>Widening inequality:</strong> The rich hoarded grain or speculated on prices, while the poor had no reserves to fall back on. The gap between the rich and poor widened to breaking point</li>
        <li><strong>Wage stagnation:</strong> While prices rose sharply, wages for workers and artisans barely increased — meaning real purchasing power collapsed</li>
        <li>This crisis was a direct trigger of the Revolution — hungry, desperate people were far more willing to march on Versailles and storm the Bastille</li>
      </ul>
    </>),
  },
  {
    q: "Who were the philosophers that influenced the French Revolution? What were their ideas?",
    a: (<>
      <p>The French Revolution was as much a revolution of ideas as it was of actions. Key philosophers whose ideas shaped the revolutionary spirit include:</p>
      <ul>
        <li><strong>John Locke (English Philosopher):</strong> Argued that all people are born with natural rights — <em>life, liberty, and property</em> — that no government can take away. He believed that if a government violated these rights, the people had the right to overthrow it. This idea directly challenged absolute monarchy</li>
        <li><strong>Jean-Jacques Rousseau (French Philosopher):</strong> His concept of the <em>Social Contract</em> argued that governments derive their authority from the <strong>consent of the people</strong>. Sovereignty belongs to the nation, not the king. He also championed equality and popular democracy</li>
        <li><strong>Montesquieu:</strong> Proposed the separation of powers — that legislative, executive, and judicial powers should be held by different bodies to prevent tyranny</li>
        <li>These ideas spread through <strong>salons, coffee houses, books, and newspapers</strong> — and were even read aloud in public spaces to reach the illiterate</li>
        <li>The <strong>American Constitution and its Bill of Rights</strong> was itself an important example of these political theories being put into practice — and it inspired French revolutionaries greatly</li>
        <li>While the philosophers did not directly lead the Revolution, their ideas <strong>planted the seeds of revolutionary thought</strong> in the minds of the educated middle class who then led the uprising</li>
      </ul>
    </>),
  },
  {
    q: "What were the major stages of the French Revolution from 1789 to 1799?",
    a: (<>
      <p>The French Revolution passed through several dramatic and distinct phases over a decade:</p>
      <ul>
        <li><strong>1789 — The Outbreak:</strong> Louis XVI called the Estates-General to pass new taxes. The Third Estate formed the National Assembly, the Bastille was stormed on 14 July, and peasant revolts spread across the countryside — marking the official start of the Revolution</li>
        <li><strong>1789, Aug 26 — Declaration of Rights of Man:</strong> The National Assembly adopted the Declaration of the Rights of Man and Citizen — guaranteeing liberty, equality, and fraternity as fundamental rights</li>
        <li><strong>1791 — Constitutional Monarchy:</strong> The National Assembly completed a new constitution that <strong>limited the king's powers</strong> and guaranteed basic rights to all. France became a constitutional monarchy</li>
        <li><strong>1792–93 — Republic Declared:</strong> France abolished the monarchy entirely. The National Assembly was replaced by the Convention. <strong>King Louis XVI and Queen Marie Antoinette were executed</strong> in 1793</li>
        <li><strong>1793–94 — The Reign of Terror:</strong> Robespierre's Committee of Public Safety executed thousands of so-called "enemies of the republic." It was France's darkest revolutionary period — until Robespierre himself was executed in 1794</li>
        <li><strong>1795 — The Directory:</strong> The Jacobin Republic was overthrown. A new five-man Directorate ruled France — but it proved corrupt and unstable</li>
        <li><strong>1799 — Napoleon's Rise:</strong> Napoleon Bonaparte seized power as First Consul, ending the Revolution and beginning a new era of empire</li>
      </ul>
    </>),
  },
  {
    q: "Why were women disappointed with the outcome of the French Revolution?",
    a: (<>
      <p>Women played a vital and active role throughout the Revolution — yet they were systematically excluded from its political gains:</p>
      <ul>
        <li><strong>Active participants:</strong> Women of the Third Estate worked for wages (which were lower than men's), participated in food riots, and marched on Versailles demanding bread and rights</li>
        <li><strong>Political clubs and newspapers:</strong> Women started their own political clubs and newspapers to discuss and voice their interests — one of the most important being the demand for <strong>equal political rights</strong></li>
        <li><strong>Denied the right to vote:</strong> Despite their contributions, the new constitutions classified women as <strong>passive citizens</strong> who could not vote or hold political office</li>
        <li><strong>Clubs were banned:</strong> In 1793, the revolutionary government <strong>banned women's political clubs</strong> — silencing their organised voices entirely</li>
        <li><strong>Limited legal improvements:</strong> Some laws were introduced to improve women's social position (such as the right to divorce), but political equality remained out of reach</li>
        <li><strong>Long wait for voting rights:</strong> Women in France finally won the right to vote only in <strong>1946</strong> — a full <strong>157 years</strong> after the Revolution that supposedly stood for liberty and equality for all</li>
        <li>The Revolution's failure to include women revealed that its ideals of liberty and equality were, in practice, limited to men of property</li>
      </ul>
    </>),
  },
  {
    q: "What was the Abolition of Slavery in the context of the French Revolution?",
    a: (<>
      <p>Slavery was a major economic and moral issue that the French Revolution addressed — though inconsistently and incompletely:</p>
      <ul>
        <li><strong>Triangular slave trade:</strong> In the 18th century, a <strong>triangular slave trade</strong> operated between Europe, Africa, and the Americas. European goods went to Africa, enslaved Africans were shipped to the Americas, and raw materials (sugar, cotton, tobacco) came back to Europe</li>
        <li><strong>No early criticism:</strong> Despite the Revolution's ideals of liberty and equality, there was <strong>very little criticism of slavery in France initially</strong> — because slavery was enormously profitable for French merchants and colonial plantation owners</li>
        <li><strong>No laws passed against it initially:</strong> Even after 1789, the revolutionary government was reluctant to abolish slavery because it feared the economic loss from the colonies</li>
        <li><strong>1794 — First abolition:</strong> The Convention finally voted to <strong>free all slaves in French colonies in 1794</strong> — a landmark decision influenced by the Haitian slave revolt led by Toussaint L'Ouverture</li>
        <li><strong>Napoleon reintroduces slavery (1804):</strong> Shamefully, just 10 years later, <strong>Napoleon reintroduced slavery</strong> in the French colonies to protect economic interests — directly betraying the Revolution's ideals</li>
        <li><strong>Final abolition in 1848:</strong> Slavery was permanently and finally abolished in all French colonies only in <strong>1848</strong> — nearly 60 years after the Revolution began</li>
      </ul>
    </>),
  },
  {
    q: "How did the French Revolution change everyday life in France?",
    a: (<>
      <p>The years following 1789 brought sweeping, tangible changes to the daily lives of ordinary French people:</p>
      <ul>
        <li><strong>Abolition of censorship:</strong> One of the most important new laws was the <strong>abolition of censorship</strong> — people could now speak, write, and publish freely without fear of royal or Church punishment</li>
        <li><strong>Liberty and equality in practice:</strong> The revolutionary governments passed laws to translate the ideals of liberty and equality into everyday reality — not just paper declarations</li>
        <li><strong>End of feudal dues:</strong> On the <strong>Night of August 4, 1789</strong>, the National Assembly abolished the rights of the aristocracy — ending feudal dues, serfdom, and hereditary privileges overnight</li>
        <li><strong>Civil Constitution of the Clergy (1790):</strong> The Church was nationalised — church lands were taken over by the state, and clergy became employees of the nation rather than the Pope</li>
        <li><strong>New calendar, metric system:</strong> The revolutionary government introduced a new republican calendar and the metric system as part of rationalising French daily life</li>
        <li><strong>Ideas spreading to Europe:</strong> The ideas of liberty and democratic rights spread from France to the rest of Europe during the 19th century — inspiring nationalist and democratic movements across the continent</li>
        <li>The <strong>most important legacy</strong> of the Revolution in everyday life was the permanent shift in how people thought about their relationship with the government — citizens with rights, not subjects with obligations</li>
      </ul>
    </>),
  },
  {
    q: "Who was Napoleon Bonaparte and what was his role after the French Revolution?",
    a: (<>
      <p>Napoleon Bonaparte was the military genius who brought the revolutionary decade to a close and built an empire from its ruins:</p>
      <ul>
        <li><strong>Rise to power:</strong> Napoleon was a brilliant military general who rose to prominence during the Revolutionary Wars. In <strong>1799</strong>, he overthrew the weak Directory government and became <strong>First Consul of France</strong></li>
        <li><strong>Emperor of France (1804):</strong> In 1804, Napoleon <strong>crowned himself Emperor of France</strong> — famously taking the crown from the Pope and placing it on his own head at Notre-Dame Cathedral, symbolising that his power came from himself, not the Church</li>
        <li><strong>Conquests across Europe:</strong> He set out to conquer neighbouring European countries, <strong>dispossessing dynasties and creating kingdoms</strong> where he placed members of his own family as rulers</li>
        <li><strong>Moderniser of Europe:</strong> Napoleon saw himself as a moderniser. He introduced sweeping reforms — the <strong>Napoleonic Code</strong>, a unified legal system based on revolutionary principles of equality before the law, that still forms the basis of civil law in France and many other countries</li>
        <li><strong>Abolished feudalism:</strong> Wherever Napoleon conquered, he abolished feudal systems and introduced modern administrative structures, standardised weights and measures, and promoted merit over birth</li>
        <li><strong>Defeated at Waterloo (1815):</strong> After years of conquest, Napoleon was finally and decisively defeated at the <strong>Battle of Waterloo in 1815</strong> by a coalition of European powers — ending his empire and his political career</li>
        <li>Napoleon was the paradox of the Revolution — he spread its ideals of liberty and rational law across Europe, while simultaneously abolishing the democracy it had created</li>
      </ul>
    </>),
  },
];

export default function TheFrenchRevolution() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="tfr-root">

        {/* ── HERO ── */}
        <div className="tfr-hero">
          {[120, 220, 320, 420, 520, 620].map((size, i) => (
            <div key={i} className="tfr-ring" style={{
              width: `${size}px`, height: `${size}px`,
              top: '50%', left: '60%',
              transform: 'translate(-50%, -50%)',
            }} />
          ))}
          <div className="tfr-hero-bg-num">01</div>
          <div className="tfr-hero-inner">
            <div className="tfr-overline">Class 9 · Social Science · History</div>
            <h1 className="tfr-hero-title">
              The <em>French</em><br /><span className="gold-em">Revolution</span>
            </h1>
            <div className="tfr-hero-bar">
              {[
                { label:"Subject",  value:"History" },
                { label:"Chapter",  value:"Chapter 1" },
                { label:"Period",   value:"1774 – 1799" },
                { label:"Country",  value:"France" },
                { label:"FAQs",     value:"8 Questions" },
              ].map(({ label, value }) => (
                <div className="tfr-hero-bar-item" key={label}>
                  <div className="tfr-bar-label">{label}</div>
                  <div className="tfr-bar-value">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="tfr-body">

          {/* LEAD */}
          <div className="tfr-lead">
            <p>
              In <strong>1789</strong>, the people of France did something that had never been done at such scale in history — they dismantled an absolute monarchy, abolished the privileges of centuries-old nobility, and declared that power belonged to the people. It was messy, violent, and contradictory. But it changed the world forever.
            </p>
            <p>
              The <strong>French Revolution</strong> gave birth to the ideas of <strong>liberty, equality, and fraternity</strong> that form the foundation of every modern democracy. This chapter traces every stage — from the crumbling Ancien Régime to the rise of Napoleon Bonaparte.
            </p>
          </div>

          {/* ── 1. French Society ── */}
          <div className="tfr-sec-head">
            <div className="tfr-sec-num">1</div>
            <div className="tfr-sec-title-wrap">
              <div className="tfr-sec-kicker">Late 18th Century</div>
              <h2 className="tfr-sec-title">French Society &amp; the <span>Three Estates</span></h2>
            </div>
          </div>

          <p className="tfr-body-text">
            In <strong>1774</strong>, Louis XVI — just 20 years old and from the Bourbon dynasty — ascended the throne of France. He inherited a treasury that was completely empty, and a nation drowning in debt of <strong>2 billion livres</strong>. The only way out seemed to be raising taxes further. But who would pay? The answer lay in how French society was structured.
          </p>

          <div className="tfr-estate-grid">
            <div className="tfr-estate-card">
              <div className="tfr-estate-num">I</div>
              <div className="tfr-estate-name">The Clergy</div>
              <div className="tfr-estate-tag">First Estate · Privileged</div>
              <ul>
                <li>The Church and its representatives</li>
                <li>Held enormous land wealth across France</li>
                <li><strong>Exempt from paying taxes</strong></li>
                <li>Enjoyed royal favour and political influence</li>
                <li>Controlled education and social services</li>
              </ul>
            </div>
            <div className="tfr-estate-card">
              <div className="tfr-estate-num">II</div>
              <div className="tfr-estate-name">The Nobility</div>
              <div className="tfr-estate-tag">Second Estate · Privileged</div>
              <ul>
                <li>Aristocrats and feudal lords</li>
                <li>Held political power and military titles</li>
                <li><strong>Largely exempt from heavy taxes</strong></li>
                <li>Controlled large estates and peasant labour</li>
                <li>Lived lavishly at the royal court of Versailles</li>
              </ul>
            </div>
            <div className="tfr-estate-card dark">
              <div className="tfr-estate-num">III</div>
              <div className="tfr-estate-name">Everybody Else</div>
              <div className="tfr-estate-tag">Third Estate · Taxed</div>
              <ul>
                <li><strong>Big businessmen &amp; merchants</strong></li>
                <li>Court officials &amp; lawyers</li>
                <li>Peasants, artisans, servants</li>
                <li><strong>Landless labourers</strong></li>
                <li>Bore <strong>all the tax burden</strong> of the state</li>
                <li>Some rich, most desperately poor</li>
              </ul>
            </div>
          </div>

          <div className="tfr-stat-row">
            {[
              { val:"1774",    label:"Louis XVI on Throne" },
              { val:"2 Bn",   label:"Livres of Debt" },
              { val:"3",      label:"Estates in Society" },
              { val:"98%",    label:"Population in 3rd Estate" },
            ].map(({ val, label }) => (
              <div className="tfr-stat-box" key={label}>
                <div className="tfr-stat-val">{val}</div>
                <div className="tfr-stat-label">{label}</div>
              </div>
            ))}
          </div>

          <div className="tfr-divider"><div className="tfr-divider-mark" /></div>

          {/* ── 2. Subsistence Crisis ── */}
          <div className="tfr-sec-head">
            <div className="tfr-sec-num">2</div>
            <div className="tfr-sec-title-wrap">
              <div className="tfr-sec-kicker">The Hunger Crisis</div>
              <h2 className="tfr-sec-title">The Struggle for <span>Survival</span></h2>
            </div>
          </div>

          <p className="tfr-body-text">
            France's population was growing rapidly, and so was the demand for grain. But harvests were failing. Bread — the staple diet of the poor — became unaffordable. The gap between the rich and poor widened to a dangerous breaking point. This was France's <strong>Subsistence Crisis</strong>.
          </p>

          <div className="tfr-def-box">
            <div className="tfr-def-label">Key Term — Must Know for Exams</div>
            <div className="tfr-def-term">Subsistence Crisis</div>
            <div className="tfr-def-text">
              An <strong>extreme situation where the basic means of livelihood are endangered</strong>. In 18th-century France, this meant that ordinary people — especially peasants, artisans, and the urban poor — could not afford sufficient food to survive. Population growth increased demand for grain; bad harvests crashed supply; and prices soared beyond what common wages could cover. A crisis of survival that pushed millions to the brink — and eventually, to revolution.
            </div>
          </div>

          <ul className="tfr-list">
            <li><strong>Population growth</strong> increased the demand for food grains across France, straining supply</li>
            <li><strong>Bad harvests in 1788–89</strong> dramatically reduced grain available for the market</li>
            <li>Bread prices <strong>skyrocketed</strong> while wages remained stagnant — real purchasing power of the poor collapsed</li>
            <li>The gap between the <strong>rich and the poor widened</strong> alarmingly, with the wealthy hoarding supplies</li>
            <li>This economic desperation was a <strong>direct cause of popular revolt</strong> — hungry people had nothing left to lose</li>
          </ul>

          <div className="tfr-divider"><div className="tfr-divider-mark" /></div>

          {/* ── 3. Growing Middle Class ── */}
          <div className="tfr-sec-head">
            <div className="tfr-sec-num">3</div>
            <div className="tfr-sec-title-wrap">
              <div className="tfr-sec-kicker">Ideas that Changed Everything</div>
              <h2 className="tfr-sec-title">The Growing <span className="navy">Middle Class</span></h2>
            </div>
          </div>

          <p className="tfr-body-text">
            The 18th century witnessed the emergence of a powerful, educated <strong>middle class</strong> — merchants, lawyers, doctors, and intellectuals — who had wealth but no political power. They believed passionately that no group in society should be <strong>privileged by birth alone</strong>. Their weapon was ideas. These ideas were put forward by philosophers, discussed intensively in <strong>salons and coffee houses</strong>, and spread among the people through books, newspapers, and pamphlets — even read aloud in public spaces.
          </p>

          <div className="tfr-phil-row">
            <div className="tfr-phil-card">
              <div className="tfr-phil-initial">L</div>
              <div className="tfr-phil-name">John Locke</div>
              <div className="tfr-phil-tag">English Philosopher · Social Contract Theory</div>
              <ul>
                <li>Argued all people are born with <strong>natural rights</strong> — life, liberty, and property</li>
                <li>No government can legitimately take these rights away</li>
                <li>If a government <strong>violates these rights</strong>, the people have the right to overthrow it</li>
                <li>Directly challenged the idea of <strong>absolute monarchy by divine right</strong></li>
                <li>His ideas of <strong>natural rights and limited government</strong> influenced both the American and French Revolutions</li>
              </ul>
            </div>
            <div className="tfr-phil-card">
              <div className="tfr-phil-initial">R</div>
              <div className="tfr-phil-name">Jean-Jacques Rousseau</div>
              <div className="tfr-phil-tag">French Philosopher · The Social Contract</div>
              <ul>
                <li>Argued that <strong>sovereignty belongs to the people</strong>, not the king</li>
                <li>Government's authority comes from the <strong>consent of the governed</strong></li>
                <li>The Social Contract: citizens give up some freedoms in exchange for <strong>protection of their remaining rights</strong></li>
                <li>Championed equality and democratic participation for all citizens</li>
                <li>His ideas were a <strong>direct intellectual blueprint</strong> for the French Revolution's Declaration of Rights</li>
              </ul>
            </div>
          </div>

          <div className="tfr-def-box">
            <div className="tfr-def-label">Important Influence</div>
            <div className="tfr-def-term">The American Constitution — An Inspiration</div>
            <div className="tfr-def-text">
              The <strong>American Constitution and its guarantee of individual rights</strong> was an enormously important example of political theory being put into practice. France had financially supported the American Revolution — and many French soldiers returned home having seen a republic actually work. The American example showed French revolutionaries that kings could be replaced by <strong>constitutions and elected governments</strong>. These ideas were debated in salons, spread through books and newspapers, and were even <strong>read aloud</strong> in public to reach those who could not read.
            </div>
          </div>

          <div className="tfr-divider"><div className="tfr-divider-mark" /></div>

          {/* ── 4. Outbreak of Revolution ── */}
          <div className="tfr-sec-head">
            <div className="tfr-sec-num">4</div>
            <div className="tfr-sec-title-wrap">
              <div className="tfr-sec-kicker">The Spark — 1789</div>
              <h2 className="tfr-sec-title">Outbreak of the <span>Revolution</span></h2>
            </div>
          </div>

          <p className="tfr-body-text">
            The French Revolution did not happen in a single moment — it built slowly through years of discontent and then exploded in 1789. When Louis XVI convened the <strong>Estates-General</strong> to vote on new taxes, he unknowingly lit the fuse.
          </p>

          <div className="tfr-groups">
            <div className="tfr-groups-label">Why the Estates-General Triggered the Revolution</div>
            <div className="tfr-groups-grid">
              <div className="tfr-group-card">
                <div className="tfr-group-name">The Estates-General is Called</div>
                <div className="tfr-group-sub">May 5, 1789 — Versailles</div>
                <div className="tfr-group-desc">Louis XVI called the Estates-General — an assembly that had not met since 1614 — to get approval for new taxes to solve the financial crisis. Votes were cast per <strong>Estate</strong>, meaning the two privileged estates could always outvote the Third <strong>2-to-1</strong>, regardless of population.</div>
              </div>
              <div className="tfr-group-card red-left">
                <div className="tfr-group-name">The Third Estate Walks Out</div>
                <div className="tfr-group-sub">Defiance — A Historic Break</div>
                <div className="tfr-group-desc">The Third Estate demanded that votes be counted <strong>per head, not per Estate</strong>. The King refused. In a dramatic act of defiance, the Third Estate representatives <strong>walked out of the assembly</strong> — refusing to participate in a rigged system any longer.</div>
              </div>
              <div className="tfr-group-card gold-left">
                <div className="tfr-group-name">The National Assembly is Born</div>
                <div className="tfr-group-sub">Tennis Court Oath — June 20, 1789</div>
                <div className="tfr-group-desc">The Third Estate declared itself the <strong>National Assembly</strong> — the true representative body of France. Meeting in a tennis court, they swore the Tennis Court Oath: they would not disband until France had a new constitution. The King and Clergy ultimately <strong>conceded</strong>.</div>
              </div>
              <div className="tfr-group-card">
                <div className="tfr-group-name">The Bastille is Stormed</div>
                <div className="tfr-group-sub">July 14, 1789 — The Revolution Begins</div>
                <div className="tfr-group-desc">On <strong>14 July 1789</strong>, an angry Paris mob stormed the Bastille prison — a hated symbol of royal tyranny. The fortress fell. This date marks the <strong>official start of the French Revolution</strong> and is still celebrated as Bastille Day — France's national holiday.</div>
              </div>
            </div>
          </div>

          <div className="tfr-divider"><div className="tfr-divider-mark" /></div>

          {/* ── 5. Timeline ── */}
          <div className="tfr-sec-head">
            <div className="tfr-sec-num">5</div>
            <div className="tfr-sec-title-wrap">
              <div className="tfr-sec-kicker">1770s – 1799</div>
              <h2 className="tfr-sec-title">Complete <span>Timeline</span> of the Revolution</h2>
            </div>
          </div>

          <p className="tfr-body-text">
            The Revolution unfolded over a dramatic decade. Every year brought a new upheaval — from economic crisis and popular revolt to republic, terror, and finally empire. Study this timeline carefully — exam questions frequently ask about specific dates and events.
          </p>

          <div className="tfr-timeline">
            {[
              { year:"1770s–\n1780s", head:"Economic Decline", desc:<>The French Government sank into <strong>deep financial debt</strong>. Years of costly wars, including support for the American Revolution, had emptied the treasury. Tax revenue was insufficient; 2 billion livres of debt mounted.</> },
              { year:"1788–\n1789",   head:"Bad Harvest, High Prices, Food Riots", desc:<>Catastrophic harvests across France caused <strong>grain shortages and soaring bread prices</strong>. Food riots broke out across the countryside. The poor faced starvation — creating the subsistence crisis that would explode into revolution.</> },
              { year:"May 5\n1789",   head:"Estates-General Convened", desc:<>Louis XVI called the <strong>Estates-General</strong> at Versailles to pass proposals for new taxes. The Third Estate demanded per-head voting instead of per-Estate voting and was refused — setting off the chain reaction of revolution.</> },
              { year:"July 14\n1789", head:"National Assembly Formed — Bastille Stormed", desc:<>The <strong>National Assembly</strong> was declared by the Third Estate. On <strong>July 14</strong>, a Paris mob stormed the Bastille fortress. The <strong>French Revolution officially begins</strong>. Peasant revolts spread across the countryside.</> },
              { year:"Aug 4\n1789",   head:"Night of August 4 — End of Aristocratic Rights", desc:<>In a dramatic overnight session, the National Assembly voted to abolish the <strong>feudal privileges of the aristocracy</strong> — ending serfdom, feudal dues, and hereditary privileges that had defined French society for centuries.</> },
              { year:"Aug 26\n1789",  head:"Declaration of the Rights of Man", desc:<>The National Assembly adopted the <strong>Declaration of the Rights of Man and Citizen</strong> — one of history's most important documents. It declared liberty, equality, popular sovereignty, and freedom of expression as fundamental rights.</> },
              { year:"1790",          head:"Civil Constitution of the Clergy", desc:<>The Church was <strong>nationalised</strong>. Church lands were seized by the state; clergy became state employees. The Civil Constitution of the Clergy fundamentally dismantled the Church's independent power and wealth in France.</> },
              { year:"1791",          head:"Constitutional Monarchy Established", desc:<>The National Assembly completed the draft of a new constitution. The <strong>Constitution of 1791</strong> converted France from absolute monarchy to a <strong>constitutional monarchy</strong> with limited royal powers and guaranteed basic rights to all.</> },
              { year:"1792",          head:"Austria and Prussia Attack Revolutionary France", desc:<><strong>Austria and Prussia</strong>, alarmed by the Revolution's spread and the threat to their own monarchies, declared war on France. This foreign invasion stoked revolutionary nationalism and pushed France towards more radical measures.</> },
              { year:"1792–\n1793",   head:"Monarchy Abolished — Republic Declared", desc:<>France abolished the monarchy entirely. The National Convention replaced the National Assembly. <strong>King Louis XVI and Queen Marie Antoinette were executed by guillotine in 1793</strong>. France was now a full Republic.</> },
              { year:"1792–\n1794",   head:"The Reign of Terror", desc:<><strong>Robespierre's Committee of Public Safety</strong> repelled foreign invaders but also executed thousands of "enemies of the people" within France itself. Britain, Netherlands, Spain also at war with France. A period of brutal, paranoid violence.</> },
              { year:"1794",          head:"Robespierre Executed — The Directory", desc:<>Robespierre was arrested and <strong>executed by guillotine on 28 July 1794</strong> — the Terror consuming its own architect. France was then governed by a <strong>Directory</strong>, a committee of five men, from 26 October 1795.</> },
              { year:"1799",          head:"Napoleon Bonaparte Becomes Leader", desc:<>The weak and corrupt Directory was overthrown by <strong>Napoleon Bonaparte</strong>, who became First Consul. The French Revolution officially ended. A decade of upheaval gave way to the age of Napoleon — and ultimately, empire.</> },
            ].map((t, i) => (
              <div className="tfr-tl-item" key={i}>
                <div className="tfr-tl-year-col">
                  <div className="tfr-tl-year" style={{ whiteSpace:'pre-line' }}>{t.year}</div>
                </div>
                <div className="tfr-tl-content">
                  <div className="tfr-tl-head">{t.head}</div>
                  <div className="tfr-tl-desc">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="tfr-divider"><div className="tfr-divider-mark" /></div>

          {/* ── 6. Reign of Terror ── */}
          <div className="tfr-sec-head">
            <div className="tfr-sec-num">6</div>
            <div className="tfr-sec-title-wrap">
              <div className="tfr-sec-kicker">1793 – 1794</div>
              <h2 className="tfr-sec-title">The <span className="red">Reign of Terror</span></h2>
            </div>
          </div>

          <p className="tfr-body-text">
            After the Republic was declared, the most radical phase of the Revolution began. <strong>Robespierre</strong> and his <strong>Committee of Public Safety</strong> took control and ruled through fear. Anyone suspected of being an enemy of the republic — noble, priest, moderate revolutionary, or ordinary citizen — faced the guillotine.
          </p>

          <div className="tfr-jacobin">
            <div className="tfr-jacobin-tag">The Terror — 1793–1794 — Robespierre's France</div>
            <div className="tfr-jacobin-head">When the Revolution Turned on Itself</div>
            <div className="tfr-jacobin-body">
              Robespierre followed a <strong>policy of severe control and repression</strong>. He executed all the so-called "enemies of the republic" — a category that grew wider and more paranoid by the day. Thousands were guillotined: former allies, moderates, the Girondins, aristocrats, clergy, and ordinary people accused without evidence. The Committee of Public Safety simultaneously <strong>repelled foreign invaders</strong> from Austria, Prussia, Britain, the Netherlands, and Spain — defending the Republic while terrorising its own people. The violence finally consumed its architect: <strong>Robespierre himself was arrested and executed in 1794</strong>. The Terror ended — leaving France traumatised, exhausted, and desperate for stability.
            </div>
          </div>

          <div className="tfr-divider"><div className="tfr-divider-mark" /></div>

          {/* ── 7. Women's Revolution ── */}
          <div className="tfr-sec-head">
            <div className="tfr-sec-num">7</div>
            <div className="tfr-sec-title-wrap">
              <div className="tfr-sec-kicker">The Other Revolution</div>
              <h2 className="tfr-sec-title">Women's <span>Revolution</span></h2>
            </div>
          </div>

          <p className="tfr-body-text">
            From the very beginning, women were <strong>active participants</strong> in the events that brought about revolutionary change in France. They were not spectators — they marched, organised, wrote, and demanded. Yet the Revolution that promised liberty to all largely failed to deliver it to women.
          </p>

          <div className="tfr-contrast">
            <div className="tfr-contrast-col">
              <div className="tfr-contrast-label pos">What Women Did</div>
              <ul>
                <li>Most women of the Third Estate <strong>worked for a living</strong> — as market sellers, seamstresses, domestic workers — earning wages <strong>lower than men's</strong></li>
                <li>Participated in <strong>food riots and political marches</strong> — including the famous Women's March on Versailles in 1789</li>
                <li>Started their own <strong>political clubs and newspapers</strong> to discuss and voice their interests</li>
                <li>Demanded that women must enjoy the <strong>same political rights as men</strong> — including the right to vote</li>
                <li>Some laws were introduced to <strong>improve women's legal position</strong> — such as the right to divorce</li>
              </ul>
            </div>
            <div className="tfr-contrast-col dark">
              <div className="tfr-contrast-label neg">What Women Were Denied</div>
              <ul>
                <li>Classified as <strong>passive citizens</strong> in the new Constitution — excluded from voting and holding political office</li>
                <li>Women's <strong>political clubs were banned</strong> by the revolutionary government in 1793</li>
                <li>Despite fighting for the Revolution, women were <strong>excluded from its political gains</strong></li>
                <li>The struggle for equal rights <strong>continued for generations</strong> — and continues in parts of the world today</li>
                <li>Women in France finally won the right to vote only in <strong>1946</strong> — 157 years after the Revolution</li>
              </ul>
            </div>
          </div>

          <div className="tfr-pull-quote">
            <p>The Revolution proclaimed liberty for all — but meant liberty for men. Women would wait another 157 years for the right to vote in France.</p>
            <cite>— The Unfinished Revolution</cite>
          </div>

          <div className="tfr-divider"><div className="tfr-divider-mark" /></div>

          {/* ── 8. Abolition of Slavery ── */}
          <div className="tfr-sec-head">
            <div className="tfr-sec-num">8</div>
            <div className="tfr-sec-title-wrap">
              <div className="tfr-sec-kicker">Liberty's Contradiction</div>
              <h2 className="tfr-sec-title">The Abolition of <span className="gold">Slavery</span></h2>
            </div>
          </div>

          <p className="tfr-body-text">
            While France proclaimed liberty and equality at home, it continued to profit from the brutal <strong>triangular slave trade</strong> across the Atlantic. The contradiction between the Revolution's ideals and the reality of French colonial slavery was glaring — and it took decades to resolve.
          </p>

          <div className="tfr-slavery">
            <div className="tfr-slavery-tag">Slavery &amp; The French Revolution — Key Facts</div>
            <div className="tfr-slavery-head">From Triangle Trade to Final Abolition — A Slow, Shameful Journey</div>
            <div className="tfr-slavery-body">
              <ul>
                <li><strong>Triangular slave trade:</strong> A three-way trade existed between <strong>Europe, Africa, and the Americas</strong> — European goods to Africa, enslaved Africans to American plantations, raw materials (sugar, cotton, tobacco) back to Europe. France was a major participant</li>
                <li><strong>No criticism initially:</strong> Despite the Revolution's ideals, in the 18th century there was <strong>very little criticism of slavery in France</strong>. No laws were passed against it — because it was enormously profitable</li>
                <li><strong>1794 — First abolition:</strong> After years of the Haitian slave revolt, the Convention finally voted to <strong>free all slaves in the French colonies</strong>. It was a landmark — but not a lasting — decision</li>
                <li><strong>Napoleon reintroduces slavery (1804):</strong> Just ten years later, <strong>Napoleon reintroduced slavery</strong> in the French colonies to protect economic interests — a direct betrayal of revolutionary ideals</li>
                <li><strong>Final abolition — 1848:</strong> Slavery was <strong>permanently abolished in all French colonies only in 1848</strong> — nearly 60 years after the Revolution that had promised liberty to all human beings</li>
              </ul>
            </div>
          </div>

          <div className="tfr-divider"><div className="tfr-divider-mark" /></div>

          {/* ── 9. Revolution & Everyday Life ── */}
          <div className="tfr-sec-head">
            <div className="tfr-sec-num">9</div>
            <div className="tfr-sec-title-wrap">
              <div className="tfr-sec-kicker">Life After 1789</div>
              <h2 className="tfr-sec-title">The Revolution &amp; <span className="green-txt">Everyday Life</span></h2>
            </div>
          </div>

          <p className="tfr-body-text">
            The years following 1789 in France saw sweeping, tangible changes in the lives of ordinary men, women, and children. The revolutionary governments took it upon themselves to pass laws that would translate the ideals of <strong>liberty and equality into everyday practice</strong>. The Revolution was not just about kings and constitutions — it touched daily life at every level.
          </p>

          <ul className="tfr-list">
            <li><strong>Abolition of censorship:</strong> One of the most important laws that came into effect — people could now speak, write, and publish freely without fear of royal or Church punishment</li>
            <li><strong>Night of August 4:</strong> The National Assembly abolished the rights of the aristocracy overnight — ending feudal dues, serfdom, and hereditary privileges in a single dramatic session</li>
            <li><strong>Civil Constitution of the Clergy (1790):</strong> Church lands were nationalised and clergy became state employees — breaking the Church's centuries-old independent power</li>
            <li><strong>New legal equality:</strong> Courts applied the same laws to all citizens equally — nobles and commoners faced the same justice for the first time in French history</li>
            <li><strong>Ideas spread to Europe:</strong> The ideas of <strong>liberty and democratic rights</strong> were the most important legacy of the French Revolution — they spread from France to the rest of Europe during the 19th century, inspiring nationalist and democratic movements everywhere</li>
            <li><strong>A new relationship between citizen and state:</strong> The most profound everyday change — people now thought of themselves as <strong>citizens with rights</strong>, not subjects with only obligations to an absolute ruler</li>
          </ul>

          <div className="tfr-divider"><div className="tfr-divider-mark" /></div>

          {/* ── 10. Napoleon Bonaparte ── */}
          <div className="tfr-sec-head">
            <div className="tfr-sec-num">10</div>
            <div className="tfr-sec-title-wrap">
              <div className="tfr-sec-kicker">The Revolution Ends — 1799–1815</div>
              <h2 className="tfr-sec-title">Napoleon <span className="gold">Bonaparte</span></h2>
            </div>
          </div>

          <p className="tfr-body-text">
            After a decade of revolution, terror, and instability, France was desperate for a strong and competent leader. It found one in a brilliant Corsican military general who would first save the Republic — and then dismantle it.
          </p>

          <div className="tfr-napoleon">
            <div className="tfr-napoleon-initial-col">
              <div className="tfr-napoleon-initial">N</div>
            </div>
            <div className="tfr-napoleon-content">
              <div className="tfr-napoleon-name">Napoleon Bonaparte</div>
              <div className="tfr-napoleon-role">First Consul 1799 · Emperor of France 1804 · Defeated 1815</div>
              <ul>
                <li>In <strong>1799</strong>, Napoleon overthrew the weak Directory and became <strong>First Consul of France</strong> — ending the Revolution</li>
                <li>In <strong>1804</strong>, he <strong>crowned himself Emperor of France</strong> — taking the crown from the Pope's hands and placing it on his own head at Notre-Dame Cathedral</li>
                <li>Set out to conquer neighbouring European countries, <strong>dispossessing dynasties</strong> and placing members of his own family on foreign thrones</li>
                <li>He <strong>saw himself as a moderniser of Europe</strong> — introducing sweeping reforms with long-lasting effects across the continent</li>
                <li>Introduced the <strong>Napoleonic Code</strong> — a unified legal system based on revolutionary principles of equality before the law, still the basis of civil law in France and many countries today</li>
                <li>Wherever he conquered, he <strong>abolished feudalism</strong>, introduced rational administration, and promoted merit over birth</li>
                <li>Finally and decisively <strong>defeated at the Battle of Waterloo in 1815</strong> — ending his empire and his political career forever</li>
              </ul>
            </div>
          </div>

          <div className="tfr-pull-quote">
            <p>Napoleon spread the Revolution's ideals — equality before the law, abolition of feudalism — across Europe. And then replaced the Republic those ideals had created with an Empire of his own.</p>
            <cite>— The Paradox of Napoleon Bonaparte</cite>
          </div>

          {/* ── 11. Legacy ── */}
          <div className="tfr-divider"><div className="tfr-divider-mark" /></div>

          <div className="tfr-sec-head">
            <div className="tfr-sec-num">11</div>
            <div className="tfr-sec-title-wrap">
              <div className="tfr-sec-kicker">Why It Still Matters</div>
              <h2 className="tfr-sec-title">Legacy of the <span>Revolution</span></h2>
            </div>
          </div>

          <p className="tfr-body-text">
            The ideas of <strong>liberty and democratic rights</strong> were the most important legacy of the French Revolution. These spread from France to the rest of Europe during the 19th century and continue to shape our world today.
          </p>

          <div className="tfr-legacy-grid">
            <div className="tfr-legacy-card">
              <div className="tfr-legacy-icon">⚖️</div>
              <div className="tfr-legacy-title">Democracy &amp; Rights</div>
              <div className="tfr-legacy-body">The Declaration of Rights became a <strong>model for constitutions worldwide</strong>. Equality before law, individual rights, and popular sovereignty are now cornerstones of every modern democracy.</div>
            </div>
            <div className="tfr-legacy-card">
              <div className="tfr-legacy-icon">🌍</div>
              <div className="tfr-legacy-title">Global Inspiration</div>
              <div className="tfr-legacy-body">The Revolution inspired uprisings across <strong>Latin America, Haiti, and Europe</strong>. The 1848 revolutions across Europe were directly fuelled by the ideals of 1789. <em>Liberté, Égalité, Fraternité</em> became a global slogan.</div>
            </div>
            <div className="tfr-legacy-card">
              <div className="tfr-legacy-icon">📜</div>
              <div className="tfr-legacy-title">The Napoleonic Code</div>
              <div className="tfr-legacy-body">Napoleon codified revolutionary principles into a <strong>unified legal code (1804)</strong> that forms the basis of civil law in France, Quebec, Louisiana, and many countries to this day.</div>
            </div>
          </div>

          <div className="tfr-divider"><div className="tfr-divider-mark" /></div>

          {/* ── FAQ ── */}
          <div className="tfr-faq-header">
            <span className="tfr-faq-kicker">Exam Preparation</span>
          </div>
          <h2 className="tfr-faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, i) => (
            <div className={`tfr-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="tfr-faq-q" onClick={() => toggle(i)}>
                <span className="tfr-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="tfr-faq-icon">{openIndex === i ? "▴" : "▾"}</span>
              </button>
              <div className={`tfr-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
