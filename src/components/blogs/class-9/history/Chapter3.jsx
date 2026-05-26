import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #0e0d0a;
    --ink2:       #1c1a14;
    --muted:      #6e6a5a;
    --paper:      #f8f6f0;
    --paper2:     #efece2;
    --paper3:     #e2ddd0;
    --steel:      #2e3d4f;
    --steel2:     #1c2a38;
    --amber:      #b8860b;
    --amber2:     #8b6508;
    --red:        #8b1a1a;
    --red2:       #6b1212;
    --rule:       #ccc8b8;
    --charcoal:   #2c2c2c;
    --rust:       #7a3a1a;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .nrh-root {
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
  }

  .nrh-hero {
    background: linear-gradient(160deg, #080808 0%, #0e0c10 50%, #100e08 100%);
    min-height: 88vh;
    display: flex; align-items: flex-end;
    position: relative; overflow: hidden;
    padding: 0 0 64px;
  }
  .nrh-hero-bg-num {
    position: absolute; bottom: -40px; right: -20px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(240px, 38vw, 520px); font-weight: 900; line-height: 1;
    color: rgba(255,255,255,0.022); letter-spacing: -0.04em;
    user-select: none; pointer-events: none;
  }
  .nrh-hero::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #1a1a1a, #b8860b, #4a4a4a, #b8860b, #1a1a1a);
  }
  .nrh-ring {
    position: absolute; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.018); pointer-events: none;
  }
  .nrh-hero-inner {
    max-width: 900px; width: 100%;
    margin: 0 auto; padding: 0 32px;
    position: relative; z-index: 1;
  }
  .nrh-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #c8a020; margin-bottom: 24px;
    display: flex; align-items: center; gap: 14px;
  }
  .nrh-overline::before, .nrh-overline::after {
    content: ''; flex: 0 0 40px; height: 1px; background: #c8a020;
  }
  .nrh-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(40px, 7.5vw, 84px); font-weight: 900;
    color: #fff; line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 32px;
  }
  .nrh-hero-title em       { font-style: normal; color: #c8a020; }
  .nrh-hero-title .red-em  { color: #e05555; }
  .nrh-hero-bar {
    display: flex; flex-wrap: wrap; gap: 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 24px; margin-top: 8px;
  }
  .nrh-hero-bar-item {
    flex: 1 1 150px; padding: 0 24px 0 0;
    border-right: 1px solid rgba(255,255,255,0.1); margin-right: 24px;
  }
  .nrh-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .nrh-bar-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.35); margin-bottom: 5px;
  }
  .nrh-bar-value {
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600;
    color: rgba(255,255,255,0.75);
  }

  .nrh-body { max-width: 860px; margin: 0 auto; padding: 72px 32px 96px; }

  .nrh-lead {
    border-left: 5px solid var(--amber);
    padding: 28px 36px; margin-bottom: 64px; background: var(--paper2);
  }
  .nrh-lead p {
    font-family: 'Poppins', sans-serif; font-size: 19px; font-weight: 500;
    color: var(--ink2); line-height: 1.78; margin: 0 0 14px;
  }
  .nrh-lead p:last-child { margin: 0; }
  .nrh-lead strong { color: var(--amber); }

  .nrh-sec-head {
    display: flex; align-items: flex-start; gap: 20px;
    margin-bottom: 28px; border-bottom: 2px solid var(--rule); padding-bottom: 18px;
  }
  .nrh-sec-num {
    font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900;
    color: var(--rule); line-height: 1; flex-shrink: 0; margin-top: 4px;
  }
  .nrh-sec-title-wrap { display: flex; flex-direction: column; justify-content: flex-end; }
  .nrh-sec-kicker {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--amber); margin-bottom: 4px;
  }
  .nrh-sec-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(22px, 3.5vw, 32px); font-weight: 900;
    color: var(--ink); line-height: 1.15; letter-spacing: -0.01em;
  }
  .nrh-sec-title span       { color: var(--amber); }
  .nrh-sec-title .red-txt   { color: var(--red); }
  .nrh-sec-title .steel-txt { color: var(--steel); }

  .nrh-body-text {
    font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 400;
    color: #1c1a14; line-height: 1.82; margin-bottom: 24px;
  }
  .nrh-body-text strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  .nrh-def-box {
    background: var(--ink); padding: 32px 36px;
    margin-bottom: 48px; border-top: 4px solid var(--amber);
  }
  .nrh-def-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; color: #c8a020; margin-bottom: 10px;
  }
  .nrh-def-term {
    font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900;
    color: #fff; letter-spacing: -0.02em; margin-bottom: 14px;
  }
  .nrh-def-text {
    font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 400;
    color: rgba(255,255,255,0.72); line-height: 1.8;
  }
  .nrh-def-text strong { color: #c8a020; font-family: 'Poppins', sans-serif; font-weight: 700; }

  .nrh-stat-row { display: flex; flex-wrap: wrap; gap: 2px; margin-bottom: 48px; background: var(--rule); }
  .nrh-stat-box { flex: 1 1 130px; background: var(--paper); padding: 24px 18px; text-align: center; }
  .nrh-stat-val {
    font-family: 'Montserrat', sans-serif; font-size: 26px; font-weight: 900;
    color: var(--steel); line-height: 1.1; margin-bottom: 6px; letter-spacing: -0.02em;
  }
  .nrh-stat-label {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 600;
    color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; line-height: 1.4;
  }

  .nrh-causes-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 2px; background: var(--rule); margin-bottom: 48px;
  }
  .nrh-cause-card { background: var(--paper); padding: 26px 24px; }
  .nrh-cause-card.dark  { background: var(--steel); }
  .nrh-cause-card.black { background: var(--ink); }
  .nrh-cause-icon { font-size: 28px; margin-bottom: 10px; }
  .nrh-cause-title {
    font-family: 'Montserrat', sans-serif; font-size: 17px; font-weight: 900;
    color: var(--ink); margin-bottom: 8px; letter-spacing: -0.01em;
  }
  .nrh-cause-card.dark  .nrh-cause-title { color: #fff; }
  .nrh-cause-card.black .nrh-cause-title { color: #c8a020; }
  .nrh-cause-body {
    font-family: 'Inter', sans-serif; font-size: 15px; color: #2c2a20; line-height: 1.74;
  }
  .nrh-cause-card.dark  .nrh-cause-body { color: rgba(255,255,255,0.72); }
  .nrh-cause-card.black .nrh-cause-body { color: rgba(255,255,255,0.68); }
  .nrh-cause-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; }
  .nrh-cause-card:not(.dark):not(.black) .nrh-cause-body strong { color: var(--red); }
  .nrh-cause-card.dark  .nrh-cause-body strong { color: #8aaec8; }
  .nrh-cause-card.black .nrh-cause-body strong { color: #c8a020; }

  .nrh-timeline { margin-bottom: 48px; }
  .nrh-tl-item {
    display: grid; grid-template-columns: 120px 1fr;
    gap: 0; border-bottom: 1px solid var(--rule);
  }
  .nrh-tl-item:first-child { border-top: 1px solid var(--rule); }
  .nrh-tl-year-col {
    padding: 22px 20px 22px 0;
    border-right: 3px solid var(--amber);
    display: flex; align-items: flex-start; justify-content: flex-end;
  }
  .nrh-tl-year {
    font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 900;
    color: var(--amber); letter-spacing: 0.04em; text-align: right; line-height: 1.3;
  }
  .nrh-tl-content { padding: 22px 0 22px 24px; }
  .nrh-tl-head {
    font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 700;
    color: var(--ink); margin-bottom: 6px;
  }
  .nrh-tl-desc {
    font-family: 'Inter', sans-serif; font-size: 15px;
    color: #2c2a20; line-height: 1.76;
  }
  .nrh-tl-desc strong { color: var(--amber); font-family: 'Poppins', sans-serif; font-weight: 700; }

  .nrh-hitler {
    display: grid; grid-template-columns: 80px 1fr;
    gap: 0; margin-bottom: 48px; background: var(--paper2);
    border-left: 5px solid var(--amber);
  }
  .nrh-hitler-initial-col {
    background: var(--charcoal); display: flex; align-items: center; justify-content: center;
  }
  .nrh-hitler-initial {
    font-family: 'Montserrat', sans-serif; font-size: 40px; font-weight: 900; color: #c8a020;
  }
  .nrh-hitler-content { padding: 24px 28px; }
  .nrh-hitler-name {
    font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900;
    color: var(--ink); margin-bottom: 4px; letter-spacing: -0.01em;
  }
  .nrh-hitler-role {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.14em; color: var(--amber); margin-bottom: 14px;
  }
  .nrh-hitler-content ul { padding-left: 18px; margin: 0; }
  .nrh-hitler-content ul li {
    font-size: 15px; line-height: 1.74; color: var(--ink2); margin-bottom: 7px;
  }
  .nrh-hitler-content ul li strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--amber2); }

  .nrh-propaganda {
    background: var(--steel); padding: 32px 36px; margin-bottom: 48px;
    border-top: 4px solid var(--amber); position: relative; overflow: hidden;
  }
  .nrh-propaganda-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.45); margin-bottom: 10px;
  }
  .nrh-propaganda-head {
    font-family: 'Montserrat', sans-serif; font-size: clamp(18px,2.8vw,26px); font-weight: 900;
    color: #c8a020; margin-bottom: 16px;
  }
  .nrh-propaganda-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .nrh-prop-item {
    background: rgba(255,255,255,0.06); padding: 16px 18px;
    border-left: 3px solid var(--amber);
  }
  .nrh-prop-icon { font-size: 20px; margin-bottom: 8px; }
  .nrh-prop-title {
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    color: #fff; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.1em;
  }
  .nrh-prop-desc {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: rgba(255,255,255,0.65); line-height: 1.68;
  }

  .nrh-destruct {
    background: var(--red); padding: 32px 36px; margin-bottom: 48px;
    position: relative; overflow: hidden;
  }
  .nrh-destruct-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.55); margin-bottom: 10px;
  }
  .nrh-destruct-head {
    font-family: 'Montserrat', sans-serif; font-size: clamp(18px,2.8vw,26px); font-weight: 900;
    color: #fff; margin-bottom: 14px;
  }
  .nrh-destruct-body {
    font-family: 'Inter', sans-serif; font-size: 16px;
    color: rgba(255,255,255,0.88); line-height: 1.78;
  }
  .nrh-destruct-body strong { color: #fff; font-family: 'Poppins', sans-serif; font-weight: 700; }

  .nrh-race-grid {
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    gap: 2px; background: var(--rule); margin-bottom: 48px;
  }
  .nrh-race-card { background: var(--paper); padding: 26px 22px; }
  .nrh-race-card.dark { background: var(--ink2); }
  .nrh-race-card.red  { background: var(--red2); }
  .nrh-race-icon { font-size: 26px; margin-bottom: 10px; }
  .nrh-race-title {
    font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 900;
    color: var(--ink); margin-bottom: 8px;
  }
  .nrh-race-card.dark .nrh-race-title { color: #c8a020; }
  .nrh-race-card.red  .nrh-race-title { color: #fff; }
  .nrh-race-body {
    font-family: 'Inter', sans-serif; font-size: 14px; color: #2c2a20; line-height: 1.72;
  }
  .nrh-race-card.dark .nrh-race-body { color: rgba(255,255,255,0.68); }
  .nrh-race-card.red  .nrh-race-body { color: rgba(255,255,255,0.82); }
  .nrh-race-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; }
  .nrh-race-card:not(.dark):not(.red) .nrh-race-body strong { color: var(--red); }
  .nrh-race-card.dark .nrh-race-body strong { color: #c8a020; }
  .nrh-race-card.red  .nrh-race-body strong { color: #fff; }

  .nrh-holocaust {
    background: var(--ink); padding: 36px 36px 28px; margin-bottom: 48px;
    border-top: 4px solid var(--red);
  }
  .nrh-holocaust-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.22em; color: rgba(255,255,255,0.4); margin-bottom: 14px;
  }
  .nrh-holocaust-head {
    font-family: 'Montserrat', sans-serif; font-size: clamp(18px,2.8vw,24px); font-weight: 900;
    color: #e05555; margin-bottom: 20px; letter-spacing: -0.01em;
  }
  .nrh-holocaust-phases { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .nrh-phase {
    background: rgba(255,255,255,0.05); padding: 18px 20px;
    border-top: 3px solid var(--red);
  }
  .nrh-phase-years {
    font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 900;
    color: #e05555; margin-bottom: 6px;
  }
  .nrh-phase-title {
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.55); margin-bottom: 12px;
  }
  .nrh-phase ul { padding-left: 16px; margin: 0; }
  .nrh-phase ul li {
    font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.68); margin-bottom: 7px;
  }
  .nrh-phase ul li strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: #fff; }

  .nrh-youth-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 2px; background: var(--rule); margin-bottom: 48px;
  }
  .nrh-youth-card { background: var(--paper2); padding: 26px 24px; }
  .nrh-youth-card.dark { background: var(--steel2); }
  .nrh-youth-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.18em; margin-bottom: 10px;
  }
  .nrh-youth-card:not(.dark) .nrh-youth-tag { color: var(--amber); }
  .nrh-youth-card.dark .nrh-youth-tag       { color: rgba(255,255,255,0.45); }
  .nrh-youth-title {
    font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 900;
    margin-bottom: 14px; letter-spacing: -0.01em;
  }
  .nrh-youth-card:not(.dark) .nrh-youth-title { color: var(--ink); }
  .nrh-youth-card.dark .nrh-youth-title       { color: #fff; }
  .nrh-youth-card ul { padding-left: 18px; margin: 0; }
  .nrh-youth-card ul li { font-size: 14px; line-height: 1.72; margin-bottom: 7px; }
  .nrh-youth-card:not(.dark) ul li { color: var(--ink2); }
  .nrh-youth-card.dark ul li       { color: rgba(255,255,255,0.68); }
  .nrh-youth-card ul li strong { font-family: 'Poppins', sans-serif; font-weight: 700; }
  .nrh-youth-card:not(.dark) ul li strong { color: var(--red); }
  .nrh-youth-card.dark ul li strong       { color: #fff; }

  .nrh-mother {
    background: var(--paper3); padding: 28px 36px; margin-bottom: 48px;
    border-left: 5px solid var(--rust);
  }
  .nrh-mother-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.2em; color: var(--rust); margin-bottom: 10px;
  }
  .nrh-mother-head {
    font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900;
    color: var(--ink); margin-bottom: 12px;
  }
  .nrh-mother-body {
    font-family: 'Inter', sans-serif; font-size: 16px; color: var(--ink2); line-height: 1.78;
  }
  .nrh-mother-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--rust); }

  .nrh-table-wrap { margin-bottom: 48px; border: 1px solid var(--rule); }
  .nrh-table-title {
    background: var(--ink); padding: 14px 24px;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    color: #c8a020; letter-spacing: 0.06em; text-transform: uppercase;
  }
  .nrh-table-row {
    display: grid; grid-template-columns: 200px 1fr;
    border-bottom: 1px solid var(--rule);
  }
  .nrh-table-row:last-child { border-bottom: none; }
  .nrh-table-key {
    background: var(--paper2); padding: 14px 18px;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    color: var(--amber2); border-right: 1px solid var(--rule);
    display: flex; align-items: center;
  }
  .nrh-table-val {
    padding: 14px 18px;
    font-family: 'Inter', sans-serif; font-size: 15px; line-height: 1.65; color: #374151;
  }
  .nrh-table-val strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  .nrh-list { margin: 0 0 28px; padding: 0; list-style: none; }
  .nrh-list li {
    font-size: 16px; line-height: 1.78; color: #1c1a14;
    padding: 10px 0 10px 28px; position: relative;
    border-bottom: 1px solid var(--rule);
  }
  .nrh-list li:first-child { border-top: 1px solid var(--rule); }
  .nrh-list li::before {
    content: ''; position: absolute; left: 0; top: 18px;
    width: 10px; height: 10px;
    border: 2px solid var(--amber); transform: rotate(45deg);
  }
  .nrh-list li strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  .nrh-pull-quote {
    margin: 40px 0; padding: 32px 40px;
    background: var(--ink); position: relative;
  }
  .nrh-pull-quote::before {
    content: '"'; position: absolute; top: -18px; left: 28px;
    font-family: 'Montserrat', sans-serif; font-size: 120px; font-weight: 900;
    color: var(--amber); line-height: 1;
  }
  .nrh-pull-quote p {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(17px,2.4vw,22px); font-weight: 800;
    color: #fff; line-height: 1.45; letter-spacing: -0.01em;
    position: relative; z-index: 1; margin-bottom: 12px;
  }
  .nrh-pull-quote cite {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600;
    color: #c8a020; text-transform: uppercase; letter-spacing: 0.12em; font-style: normal;
  }

  .nrh-divider { display: flex; align-items: center; gap: 16px; margin: 56px 0; }
  .nrh-divider::before, .nrh-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .nrh-divider-mark { width: 10px; height: 10px; background: var(--amber); transform: rotate(45deg); flex-shrink: 0; }

  .nrh-faq-header {
    border-bottom: 3px solid var(--ink); padding-bottom: 14px; margin-bottom: 0;
    display: flex; align-items: baseline; gap: 16px;
  }
  .nrh-faq-kicker {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--amber);
  }
  .nrh-faq-title {
    font-family: 'Montserrat', sans-serif; font-size: clamp(24px,4vw,34px); font-weight: 900;
    color: var(--ink); letter-spacing: -0.01em; margin: 20px 0 32px;
  }
  .nrh-faq-item { border-bottom: 1px solid var(--rule); overflow: hidden; }
  .nrh-faq-item.open { background: var(--paper2); }
  .nrh-faq-q {
    width: 100%; text-align: left; background: none; border: none; cursor: pointer;
    padding: 20px 0; display: grid; grid-template-columns: 1fr 32px;
    gap: 16px; align-items: start;
  }
  .nrh-faq-q-text {
    font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 600;
    color: var(--ink); line-height: 1.5; text-align: left; padding-left: 4px;
  }
  .nrh-faq-item.open .nrh-faq-q-text { color: var(--amber2); }
  .nrh-faq-icon {
    width: 28px; height: 28px; border: 1.5px solid var(--rule);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; color: var(--amber); flex-shrink: 0; margin-top: 2px;
  }
  .nrh-faq-item.open .nrh-faq-icon { background: var(--ink); border-color: var(--ink); color: #c8a020; }
  .nrh-faq-ans {
    display: none; padding: 0 4px 22px;
    font-size: 16px; line-height: 1.82; color: #374151;
  }
  .nrh-faq-ans.visible { display: block; }
  .nrh-faq-ans ul { padding-left: 20px; margin: 8px 0; }
  .nrh-faq-ans ul li { margin-bottom: 7px; }
  .nrh-faq-ans strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }
  .nrh-faq-ans p { margin: 0 0 10px; }
  .nrh-faq-ans p:last-child { margin: 0; }

  @media (max-width: 620px) {
    .nrh-hero             { min-height: auto; padding: 80px 0 48px; }
    .nrh-causes-grid      { grid-template-columns: 1fr; }
    .nrh-race-grid        { grid-template-columns: 1fr; }
    .nrh-youth-grid       { grid-template-columns: 1fr; }
    .nrh-holocaust-phases { grid-template-columns: 1fr; }
    .nrh-propaganda-grid  { grid-template-columns: 1fr; }
    .nrh-hitler           { grid-template-columns: 60px 1fr; }
    .nrh-tl-item          { grid-template-columns: 80px 1fr; }
    .nrh-table-row        { grid-template-columns: 120px 1fr; }
  }
`;

const faqs = [
  {
    q: "Why was the Weimar Republic unpopular in Germany? What were its inherent weaknesses?",
    a: (<>
      <p>The Weimar Republic was Germany's first democratic experiment — but it was born in defeat and never truly accepted:</p>
      <ul>
        <li><strong>Born in shame:</strong> The Republic was established after Germany's humiliating defeat in WWI. Many Germans blamed the new government for "stabbing Germany in the back" by accepting defeat and signing the Treaty of Versailles</li>
        <li><strong>The Versailles Shame:</strong> The Treaty imposed enormous war reparations, stripped Germany of territories, and blamed Germany entirely for WWI. Germans held the Weimar Republic directly responsible for accepting these terms</li>
        <li><strong>Economic devastation:</strong> Hyperinflation in 1923 wiped out savings. The Wall Street Crash of 1929 devastated the economy further. Social unrest filled the gap</li>
        <li><strong>Political instability:</strong> The Weimar Republic was plagued by uprisings — including the communist Spartacist revolt. Supporters of the Republic were attacked in nationalist circles. Soldiers were placed above civilians; aggressive nationalism replaced democratic values</li>
        <li><strong>Constitutional defect 1 — Proportional Representation:</strong> Made it nearly impossible for any single party to win a clear majority, resulting in weak coalition governments that could not act decisively in a crisis</li>
        <li><strong>Constitutional defect 2 — Article 48:</strong> Gave the President powers to impose emergency rule, suspend civil rights, and govern by decree — a provision Hitler would later use catastrophically to legally seize dictatorial powers</li>
      </ul>
    </>),
  },
  {
    q: "What economic crises led to Hitler's rise? Explain hyperinflation and the Great Depression.",
    a: (<>
      <p>Hitler's rise was directly fuelled by two catastrophic economic shocks within a decade:</p>
      <p><strong>Hyperinflation (1923):</strong></p>
      <ul>
        <li>When Germany <strong>refused to pay war reparations</strong>, France occupied the Ruhr — Germany's leading industrial area</li>
        <li>Germany retaliated by <strong>printing paper currency recklessly</strong> — flooding the economy with worthless money</li>
        <li>The value of the German mark <strong>collapsed completely</strong> — a wheelbarrow of cash could not buy a loaf of bread</li>
        <li>Middle-class savings were wiped out overnight — creating mass desperation and fury</li>
      </ul>
      <p><strong>The Great Depression (1929–1933):</strong></p>
      <ul>
        <li>Between 1924–1928, Germany had some stability — but built entirely on <strong>short-term loans from the USA</strong></li>
        <li>When the <strong>Wall Street Exchange crashed in 1929</strong>, the USA recalled its loans — the German economy collapsed immediately</li>
        <li>Massive unemployment and business failures swept Germany</li>
        <li>The middle class was gripped by the <strong>fear of proletarianisation</strong> — the terror of falling from comfortable lives into poverty</li>
        <li>This economic desperation made millions receptive to Hitler's promises of jobs, strength, and national glory</li>
      </ul>
    </>),
  },
  {
    q: "How did Hitler rise to power? What strategies did he use?",
    a: (<>
      <p>Hitler's rise from obscure Austrian-born soldier to dictator of Germany is one of history's most studied catastrophes:</p>
      <ul>
        <li><strong>Background:</strong> Hitler was born in Austria in 1889. He earned medals for bravery during WWI. Germany's defeat horrified him; the Treaty of Versailles made him furious — providing the emotional fuel for his political career</li>
        <li><strong>Joining politics:</strong> Hitler joined the German Workers' Party and <strong>renamed it the National Socialist German Workers' Party (NSDAP)</strong> — the Nazi Party</li>
        <li><strong>Mass movement through the Depression:</strong> Nazism only became a mass movement during the <strong>Great Depression</strong>. Economic desperation was its greatest recruiter</li>
        <li><strong>Powerful oratory:</strong> Hitler was a <strong>powerful and extraordinarily effective speaker</strong> — stirring emotions, tapping national shame, channelling anger toward scapegoats</li>
        <li><strong>Messiah propaganda:</strong> Nazi propaganda skilfully <strong>projected Hitler as a messiah and saviour</strong> — a god-like figure who alone could restore German greatness</li>
        <li><strong>Promises of strength and jobs:</strong> He promised a <strong>strong nation where all would get employment</strong> — the two things most Germans desperately wanted</li>
        <li><strong>Spectacle and ritual:</strong> Used significant rituals, symbols, and <strong>mass spectacles</strong> — enormous rallies creating the impression of unstoppable national destiny</li>
        <li><strong>Chancellor on 30 January 1933:</strong> Achieved the highest cabinet position through legal means — then dismantled democracy from within</li>
      </ul>
    </>),
  },
  {
    q: "How did Hitler destroy democracy in Germany after becoming Chancellor?",
    a: (<>
      <p>Once Hitler gained power legally, he moved with terrifying speed to dismantle every democratic institution:</p>
      <ul>
        <li><strong>30 January 1933</strong> — Hitler became Chancellor through legal constitutional means</li>
        <li><strong>Fire Decree — 28 February 1933:</strong> The Reichstag fire was used as pretext to suspend <strong>civic rights — freedom of speech, press, and assembly — all abolished overnight</strong></li>
        <li><strong>Communists arrested:</strong> Communists were hurriedly packed off to <strong>newly established concentration camps</strong> — the first political prisoners of the Nazi regime</li>
        <li><strong>All political parties banned:</strong> Germany became a one-party Nazi state — opposition was completely eliminated</li>
        <li><strong>Surveillance forces created:</strong> The Gestapo (secret police) and SS were established to <strong>control the population and rule with impunity</strong> — no citizen was safe from arbitrary arrest</li>
        <li><strong>Economic recovery:</strong> Economist <strong>Hjalmar Schacht</strong> was given responsibility for economic recovery — aiming for full employment through a <strong>state-funded work creation programme</strong>, giving Hitler the economic credibility to consolidate power</li>
        <li>Democracy was destroyed not by a military coup but by <strong>legally elected leaders using emergency powers</strong> — a chilling lesson about democracy's fragility</li>
      </ul>
    </>),
  },
  {
    q: "What was Hitler's foreign policy and how did it lead to World War II?",
    a: (<>
      <p>Hitler's foreign policy was a calculated, step-by-step strategy to undo Versailles and conquer living space in the East:</p>
      <ul>
        <li><strong>1933 — Left the League of Nations</strong>, signalling Germany would no longer be bound by international law</li>
        <li><strong>1936 — Reoccupied the Rhineland</strong> (demilitarised under Versailles) — France and England did nothing, emboldening further aggression</li>
        <li><strong>1938 — Anschluss:</strong> Germany and Austria integrated under the slogan <strong>"One people, One empire, One leader"</strong></li>
        <li><strong>1938 — Sudetenland taken from Czechoslovakia</strong> — with the <strong>unspoken support of England</strong>, which pursued appeasement hoping to avoid war</li>
        <li><strong>War as economic policy:</strong> Hitler chose war as a <strong>way out of the economic crisis</strong> — resources were to be accumulated through territorial expansion</li>
        <li><strong>September 1939 — Poland invaded:</strong> Triggered declarations of war from France and England — <strong>World War II began</strong></li>
        <li><strong>USA enters the war</strong> after Japan (Hitler's ally) <strong>bombed Pearl Harbour</strong></li>
        <li><strong>1945 — Defeat:</strong> The war ended with Hitler's defeat. US bombing of Hiroshima and Nagasaki ended WWII entirely</li>
      </ul>
    </>),
  },
  {
    q: "What was the Nazi world view? What was Lebensraum?",
    a: (<>
      <p>Nazi ideology was a coherent, systematic worldview that claimed scientific authority for its racism:</p>
      <ul>
        <li><strong>Racial hierarchy over equality:</strong> According to Nazism, there was <strong>no equality between people — only racial hierarchy</strong>. Nordic Aryans sat at the top; others ranked below; some groups were deemed subhuman</li>
        <li><strong>Racial utopia:</strong> The Nazis dreamed of creating an <strong>exclusive racial community of pure Germans</strong> by physically eliminating all those considered undesirable — Jews, Gypsies, Blacks, Russians, Poles, disabled people, even certain Germans</li>
        <li><strong>Pseudoscientific racism:</strong> Hitler believed in <strong>pseudo-scientific theories of race</strong> claiming racial characteristics were biological — making conversion or integration impossible. The only solution was <strong>total physical elimination</strong></li>
        <li><strong>Lebensraum (Living Space):</strong> The geopolitical concept that Germany needed to expand eastward — into Eastern Europe and Russia — to provide <strong>living space and resources for the German race</strong>. Eastern peoples were to be displaced or enslaved to make room for Aryan settlers. This concept directly caused both the Holocaust and World War II</li>
      </ul>
    </>),
  },
  {
    q: "What was the Holocaust? Describe the two phases of persecution of the Jews.",
    a: (<>
      <p>The Holocaust was the systematic, state-organised murder of six million Jews — the most horrific genocide in modern history, proceeding in two distinct phases:</p>
      <p><strong>Phase 1: 1933–1938 — Terror, Impoverishment & Segregation</strong></p>
      <ul>
        <li>Nazis <strong>terrorised, impoverished, and segregated the Jews</strong> — stripping citizenship, jobs, and rights through a series of laws</li>
        <li>The goal: make life so unbearable that Jews would <strong>voluntarily leave Germany</strong></li>
        <li>Nuremberg Laws (1935) — stripped Jews of German citizenship entirely; forced to wear the yellow Star of David</li>
        <li>Kristallnacht (1938) — nationwide pogrom destroying Jewish businesses, homes, and synagogues</li>
      </ul>
      <p><strong>Phase 2: 1939–1945 — Concentration and Mass Murder</strong></p>
      <ul>
        <li>Aimed at <strong>concentrating Jews in certain areas</strong> — first ghettos, then concentration camps</li>
        <li>Jews transported from across occupied Europe to <strong>death camps in Poland</strong></li>
        <li>Murdered in <strong>gas chambers</strong> — industrial-scale killing on an unprecedented scale</li>
        <li>An estimated <strong>6 million Jews killed</strong>, along with millions of Roma, Soviet prisoners, disabled people, and others</li>
        <li>Survivors just wanted to live long enough — even for a few hours — to <strong>tell the world about the Holocaust</strong></li>
      </ul>
    </>),
  },
  {
    q: "How did the Nazi regime use education and youth organisations to spread its ideology?",
    a: (<>
      <p>Hitler understood that the future of Nazism lay with Germany's children — the entire education system was transformed into an indoctrination machine:</p>
      <ul>
        <li><strong>Schools purged:</strong> All schools were given <strong>Nazi-approved German teachers</strong> — Jewish and politically unreliable teachers were dismissed</li>
        <li><strong>Children divided:</strong> Categorised into <strong>"desirable" and "undesirable"</strong> — Jewish, Romani, and disabled children were excluded from mainstream schools</li>
        <li><strong>Textbooks rewritten:</strong> All textbooks rewrote history to glorify Germany, demonise Jews, and promote Aryan racial superiority</li>
        <li><strong>Sport as aggression training:</strong> Sport in schools was explicitly designed to <strong>nurture the spirit of violence and aggression</strong> — producing future soldiers, not thoughtful citizens</li>
        <li><strong>Age 10 — Jungvolk:</strong> Boys entered the <em>Jungvolk</em> (Young Folk) — the first stage of formal Nazi indoctrination</li>
        <li><strong>Age 14 — Hitler Youth:</strong> All boys joined <em>Hitler Youth</em> — trained in Nazi ideology, militarism, and physical fitness</li>
        <li><strong>Age 18 — Labour Service:</strong> Mandatory state labour before military conscription</li>
        <li>A generation raised from childhood knowing nothing else — making resistance psychologically nearly impossible</li>
      </ul>
    </>),
  },
  {
    q: "What was the Nazi Cult of Motherhood? How were women treated in Nazi Germany?",
    a: (<>
      <p>In Nazi Germany, women were assigned a deeply restrictive role — valued primarily as biological producers of the Aryan race:</p>
      <ul>
        <li>Women were told to be <strong>good mothers and rear pure-blooded Aryan children</strong> — their primary duty was reproduction, not professional achievement</li>
        <li>They were <strong>actively encouraged to produce as many children as possible</strong> — mothers of four or more children received the Honour Cross of the German Mother</li>
        <li>Women were expected to be the <strong>bearers of Aryan culture and race</strong> — guardians of racial purity in the home</li>
        <li>Women were <strong>excluded from professional and political life</strong> — a direct reversal of the rights gained under the Weimar Republic</li>
        <li>Women who had children with non-Aryans were publicly shamed and punished</li>
        <li>The Nazi Cult of Motherhood reduced women to <strong>biological instruments of the state's racial programme</strong> — value measured entirely in children produced, not individual rights or freedoms</li>
      </ul>
    </>),
  },
  {
    q: "What was the art of Nazi propaganda? How did it work on the minds of the people?",
    a: (<>
      <p>The Nazi regime ran arguably the most sophisticated propaganda operation in history — using every medium to reshape how people thought and felt:</p>
      <ul>
        <li><strong>All media controlled:</strong> Films, pictures, radio, posters, and newspapers — all brought under state control through <strong>Joseph Goebbels' Ministry of Propaganda</strong></li>
        <li><strong>Emotions over reason:</strong> Nazism <strong>worked on minds and emotions</strong> — tapping fear, anger, national shame, and pride, then directing those feelings toward Jews and other "undesirables"</li>
        <li><strong>Hitler as messiah:</strong> Propaganda <strong>projected Hitler as a saviour</strong> — enormous Nuremberg rallies created the impression of supernatural authority and unstoppable destiny</li>
        <li><strong>Hatred normalised through repetition:</strong> Films, posters, and radio broadcasts spread <strong>hatred for Jews relentlessly</strong> — portraying them as subhuman, as rats, as a plague. Repetition normalised hatred</li>
        <li><strong>Language controlled:</strong> New euphemisms were created for murder and genocide — ordinary people could participate without fully confronting what they were doing</li>
        <li><strong>The ultimate achievement:</strong> People came to <strong>see the world through Nazi eyes and speak the Nazi language</strong>. Even Jews began to internalise Nazi stereotypes about themselves — demonstrating the terrifying power of sustained propaganda on its victims</li>
        <li>Knowledge of the Holocaust came to light only <strong>after the war ended</strong> — the full scale was hidden until the liberation of the camps</li>
      </ul>
    </>),
  },
];

export default function NazismAndTheRiseOfHitler() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="nrh-root">

        {/* HERO */}
        <div className="nrh-hero">
          {[120, 240, 360, 480, 600].map((size, i) => (
            <div key={i} className="nrh-ring" style={{ width:`${size}px`, height:`${size}px`, top:'50%', left:'60%', transform:'translate(-50%,-50%)' }} />
          ))}
          <div className="nrh-hero-bg-num">03</div>
          <div className="nrh-hero-inner">
            <div className="nrh-overline">Class 9 · Social Science · History</div>
            <h1 className="nrh-hero-title">
              <em>Nazism</em> &amp;<br />the Rise of<br /><span className="red-em">Hitler</span>
            </h1>
            <div className="nrh-hero-bar">
              {[
                { label:"Subject", value:"History" },
                { label:"Chapter", value:"Chapter 3" },
                { label:"Period",  value:"1919 – 1945" },
                { label:"Country", value:"Germany" },
                { label:"FAQs",    value:"10 Questions" },
              ].map(({ label, value }) => (
                <div className="nrh-hero-bar-item" key={label}>
                  <div className="nrh-bar-label">{label}</div>
                  <div className="nrh-bar-value">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="nrh-body">

          {/* LEAD */}
          <div className="nrh-lead">
            <p>How does a democracy die? In Germany between 1919 and 1933, the answer was delivered with devastating clarity. A nation humiliated by war, crushed by reparations, and broken by economic collapse turned to a <strong>charismatic demagogue</strong> who promised to restore its greatness.</p>
            <p>What followed was one of the most catastrophic chapters in human history — a systematic dismantling of democracy, a reign of terror, and the <strong>Holocaust</strong>: the industrialised murder of six million Jews and millions of others. This chapter examines how it happened — and why it must never be forgotten.</p>
          </div>

          {/* 1. Weimar Republic */}
          <div className="nrh-sec-head">
            <div className="nrh-sec-num">1</div>
            <div className="nrh-sec-title-wrap">
              <div className="nrh-sec-kicker">Post-WWI Germany</div>
              <h2 className="nrh-sec-title">Birth of the <span>Weimar Republic</span></h2>
            </div>
          </div>

          <p className="nrh-body-text">Germany fought the First World War (1914–1918) alongside the Austrian Empire and against the Allies — England, France, and Russia. Initially Germany made gains, occupying France and Belgium. But the Allies won in <strong>1918</strong>, the Kaiser abdicated, and parliamentary parties rebuilt Germany on democratic foundations. A National Assembly at <strong>Weimar</strong> established a democratic constitution with a federal structure. But the Republic was never truly accepted — it was born in the shadow of defeat and the humiliation of Versailles.</p>

          <div className="nrh-def-box">
            <div className="nrh-def-label">The New German State — 1919</div>
            <div className="nrh-def-term">The Weimar Republic — Born in Defeat</div>
            <div className="nrh-def-text">The Republic's leaders had signed the <strong>Treaty of Versailles</strong> — imposing massive war reparations, stripping Germany of territories, limiting its military, and placing the entire blame for WWI on Germany. Many Germans held the Weimar Republic responsible not just for the <strong>defeat in war</strong>, but the <strong>disgrace at Versailles</strong>. The supporters of the Republic were criticised and became easy targets in conservative nationalist circles. Soldiers came to be placed above civilians. Aggressive war propaganda and national honour became important. The <strong>fragile democracy could not survive</strong> this combination of humiliation, economic collapse, and political radicalism.</div>
          </div>

          <div className="nrh-stat-row">
            {[
              { val:"1914–18", label:"World War I" },
              { val:"1919",    label:"Weimar Republic Founded" },
              { val:"1923",    label:"Hyperinflation Crisis" },
              { val:"1929",    label:"Wall Street Crash" },
            ].map(({ val, label }) => (
              <div className="nrh-stat-box" key={label}>
                <div className="nrh-stat-val">{val}</div>
                <div className="nrh-stat-label">{label}</div>
              </div>
            ))}
          </div>

          <div className="nrh-divider"><div className="nrh-divider-mark" /></div>

          {/* 2. Effects of War & Political Radicalism */}
          <div className="nrh-sec-head">
            <div className="nrh-sec-num">2</div>
            <div className="nrh-sec-title-wrap">
              <div className="nrh-sec-kicker">Wounds of Defeat</div>
              <h2 className="nrh-sec-title">Effects of War &amp; <span>Political Radicalism</span></h2>
            </div>
          </div>

          <p className="nrh-body-text">WWI had a devastating psychological and financial impact on all of Europe. From being a creditor, Europe became a debtor. Germany suffered uniquely — not just the trauma of defeat but the added poison of being blamed for it. At the same time, the birth of the Weimar Republic coincided with internal communist uprisings, heightening the sense of chaos and crisis.</p>

          <div className="nrh-causes-grid">
            <div className="nrh-cause-card">
              <div className="nrh-cause-icon">💸</div>
              <div className="nrh-cause-title">Europe Becomes a Debtor</div>
              <div className="nrh-cause-body">From being a major creditor, Europe emerged from WWI as a massive debtor. Germany owed crippling reparations. The war had shattered economic foundations across the continent — and Germany bore the heaviest burden through the <strong>Treaty of Versailles</strong>.</div>
            </div>
            <div className="nrh-cause-card dark">
              <div className="nrh-cause-icon">🪖</div>
              <div className="nrh-cause-title">Soldiers Above Citizens</div>
              <div className="nrh-cause-body">A dangerous cultural shift occurred: <strong>soldiers were placed above civilians</strong> in social prestige. Aggressive war propaganda and national honour became dominant values — civilian democratic governance was seen as weak and shameful by comparison.</div>
            </div>
            <div className="nrh-cause-card black">
              <div className="nrh-cause-icon">🔴</div>
              <div className="nrh-cause-title">Spartacist League Uprising</div>
              <div className="nrh-cause-body">The Republic's birth coincided with the <strong>Spartacist League uprising</strong> — modelled on the Bolshevik Revolution in Russia. The Spartacists founded the <strong>Communist Party of Germany</strong>, adding a radical left-wing threat to the already unstable political landscape and <strong>paving the way for Hitler</strong>.</div>
            </div>
            <div className="nrh-cause-card">
              <div className="nrh-cause-icon">🏛️</div>
              <div className="nrh-cause-title">Two Fatal Constitutional Defects</div>
              <div className="nrh-cause-body"><strong>Proportional Representation</strong> made stable majority governments impossible — resulting in perpetually weak coalitions. <strong>Article 48</strong> gave the President emergency powers to suspend civil rights and rule by decree — the exact provision Hitler would exploit to legally seize dictatorial control.</div>
            </div>
          </div>

          <div className="nrh-divider"><div className="nrh-divider-mark" /></div>

          {/* 3. Economic Crisis */}
          <div className="nrh-sec-head">
            <div className="nrh-sec-num">3</div>
            <div className="nrh-sec-title-wrap">
              <div className="nrh-sec-kicker">1923 & 1929</div>
              <h2 className="nrh-sec-title">Hyperinflation &amp; <span>The Depression</span></h2>
            </div>
          </div>

          <p className="nrh-body-text">Germany was struck by two devastating economic crises within a decade. Each destroyed whatever stability had been achieved, pushing more desperate people toward extremist solutions.</p>

          <div className="nrh-timeline">
            {[
              { year:"1923",       head:"Hyperinflation — The Mark Collapses",         desc:<>As Germany <strong>refused to pay war reparations</strong>, France occupied the Ruhr — Germany's leading industrial area. Germany retaliated by <strong>printing paper currency recklessly</strong>. The value of the mark collapsed completely. Prices of goods soared — there was hyperinflation. Middle-class savings were destroyed overnight.</> },
              { year:"1924–\n1928",head:"Fragile Stability — Built on Sand",           desc:<>Germany had some stability — but it was built entirely on <strong>short-term loans from the USA</strong>. German recovery was not organic; it was borrowed. The moment American lending stopped, the entire structure would collapse.</> },
              { year:"1929",       head:"Wall Street Crash — The Floor Gives Way",     desc:<>The <strong>Wall Street Exchange crashed in October 1929</strong>. America recalled its loans. The German economy was hit badly. Businesses closed, banks failed, millions lost jobs. The middle class was gripped by the <strong>fear of proletarianisation</strong> — of falling from comfortable lives into poverty.</> },
              { year:"1929–\n33",  head:"Great Depression — Hitler's Opportunity",      desc:<>Massive social unrest swept Germany. Desperate, humiliated people were looking for someone to blame — and someone to save them. The Nazi Party, previously a fringe movement, <strong>became a mass movement</strong> as the Depression deepened.</> },
            ].map((t, i) => (
              <div className="nrh-tl-item" key={i}>
                <div className="nrh-tl-year-col"><div className="nrh-tl-year" style={{whiteSpace:'pre-line'}}>{t.year}</div></div>
                <div className="nrh-tl-content">
                  <div className="nrh-tl-head">{t.head}</div>
                  <div className="nrh-tl-desc">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="nrh-table-wrap">
            <div className="nrh-table-title">Inherent Defects of the Weimar Constitution</div>
            {[
              ["Proportional Representation", <>Made it nearly impossible for any single party to win a clear majority, resulting in <strong>permanently weak coalition governments</strong> that could not act decisively in a crisis.</>],
              ["Article 48",                  <>Gave the President the powers to <strong>impose emergency rule, suspend civil rights, and govern by decree</strong> — without parliamentary approval. Hitler exploited this to seize dictatorial powers legally.</>],
            ].map(([k, v]) => (
              <div className="nrh-table-row" key={k}>
                <div className="nrh-table-key">{k}</div>
                <div className="nrh-table-val">{v}</div>
              </div>
            ))}
          </div>

          <div className="nrh-divider"><div className="nrh-divider-mark" /></div>

          {/* 4. Hitler's Rise */}
          <div className="nrh-sec-head">
            <div className="nrh-sec-num">4</div>
            <div className="nrh-sec-title-wrap">
              <div className="nrh-sec-kicker">The Demagogue</div>
              <h2 className="nrh-sec-title">Hitler's <span>Rise to Power</span></h2>
            </div>
          </div>

          <p className="nrh-body-text">Into Germany's crisis stepped a man who had channelled his personal rage at defeat into a political movement. Adolf Hitler was not simply a product of circumstances — he was an extraordinarily skilled political operator who understood exactly how to exploit a traumatised nation.</p>

          <div className="nrh-hitler">
            <div className="nrh-hitler-initial-col"><div className="nrh-hitler-initial">H</div></div>
            <div className="nrh-hitler-content">
              <div className="nrh-hitler-name">Adolf Hitler</div>
              <div className="nrh-hitler-role">Born Austria 1889 · Chancellor 30 Jan 1933 · Führer 1934 · Died 1945</div>
              <ul>
                <li>Born in <strong>Austria in 1889</strong>. Earned medals for bravery in WWI. Germany's defeat horrified him; the <strong>Treaty of Versailles made him furious</strong></li>
                <li>Joined the German Workers' Party and <strong>renamed it the National Socialist German Workers' Party (NSDAP)</strong> — the Nazi Party</li>
                <li>Nazism became a <strong>mass movement only during the Great Depression</strong> — economic despair was its greatest recruiter</li>
                <li>A <strong>powerful and effective speaker</strong> — capable of stirring enormous crowds with speeches about national betrayal and glory</li>
                <li>Nazi propaganda <strong>projected Hitler as a messiah and saviour</strong> — a near-divine figure who alone could restore German greatness</li>
                <li>Promised a <strong>strong nation where all would get employment</strong></li>
                <li>Used <strong>significant rituals, spectacles, and mass mobilisation</strong> — enormous rallies creating the impression of unstoppable national destiny</li>
                <li>Achieved the highest cabinet position — <strong>Chancellor on 30 January 1933</strong></li>
              </ul>
            </div>
          </div>

          <div className="nrh-divider"><div className="nrh-divider-mark" /></div>

          {/* 5. Destruction of Democracy */}
          <div className="nrh-sec-head">
            <div className="nrh-sec-num">5</div>
            <div className="nrh-sec-title-wrap">
              <div className="nrh-sec-kicker">January 1933 Onward</div>
              <h2 className="nrh-sec-title">Destruction of <span className="red-txt">Democracy</span></h2>
            </div>
          </div>

          <p className="nrh-body-text">Hitler had gained power legally. Now he moved with terrifying speed to ensure he could never be removed by legal means. Within months of becoming Chancellor, Germany's democracy had been completely dismantled.</p>

          <div className="nrh-destruct">
            <div className="nrh-destruct-tag">28 February 1933 — The Fire Decree</div>
            <div className="nrh-destruct-head">How Hitler Killed German Democracy</div>
            <div className="nrh-destruct-body">
              On <strong>30 January 1933</strong>, Hitler became Chancellor. The <strong>Fire Decree of 28 February 1933</strong> suspended civic rights — <strong>freedom of speech, press and assembly were abolished overnight</strong>. <strong>Communists were hurriedly packed off to newly established concentration camps</strong>. <strong>All political parties were banned</strong> — Germany became a one-party Nazi state. <strong>Special surveillance and security forces</strong> were created to control the people and rule with impunity. No citizen was safe from arbitrary arrest. Economist <strong>Hjalmar Schacht</strong> was given responsibility for economic recovery through a <strong>state-funded work creation programme</strong> aiming at full production and full employment — giving Hitler the economic credibility to consolidate total power.
            </div>
          </div>

          <div className="nrh-divider"><div className="nrh-divider-mark" /></div>

          {/* 6. Foreign Policy & WW2 */}
          <div className="nrh-sec-head">
            <div className="nrh-sec-num">6</div>
            <div className="nrh-sec-title-wrap">
              <div className="nrh-sec-kicker">1933 – 1945</div>
              <h2 className="nrh-sec-title">Foreign Policy &amp; <span className="red-txt">World War II</span></h2>
            </div>
          </div>

          <p className="nrh-body-text">Hitler's foreign policy was a calculated, step-by-step strategy to undo Versailles, rebuild military power, and conquer living space in the East. Each step bolder than the last. He chose <strong>war as a way out of the economic crisis</strong> — resources were to be accumulated through expansion of territory.</p>

          <div className="nrh-timeline">
            {[
              { year:"1933",       head:"Left the League of Nations",             desc:<>Hitler pulled Germany out of the <strong>League of Nations</strong> — signalling Germany would no longer be bound by international law.</> },
              { year:"1936",       head:"Reoccupied the Rhineland",               desc:<>Sent troops into the Rhineland — a direct violation of the Treaty of Versailles. France and England did nothing. <strong>Each unanswered aggression emboldened the next.</strong></> },
              { year:"1938",       head:"Anschluss — Austria Integrated",         desc:<>Germany and Austria were integrated under the slogan: <strong>"One people, One empire, One leader."</strong> International objections were ignored.</> },
              { year:"1938",       head:"Sudetenland Taken from Czechoslovakia", desc:<>Took the German-speaking Sudetenland with <strong>unspoken support of England</strong> — which pursued appeasement hoping to satisfy Hitler's territorial ambitions without war.</> },
              { year:"Sept\n1939", head:"Poland Invaded — World War II Begins",  desc:<>Germany invaded Poland. <strong>France and England declared war.</strong> World War II had begun. The USA initially resisted involvement.</> },
              { year:"1941",       head:"USA Enters the War",                     desc:<>When Japan — Hitler's ally — <strong>bombarded Pearl Harbour</strong>, the USA entered the war. The balance shifted decisively against the Axis powers.</> },
              { year:"1945",       head:"Hitler's Defeat — War Ends",             desc:<>The war ended in <strong>1945 with Hitler's defeat</strong>. The <strong>US bombing of Hiroshima and Nagasaki</strong> forced Japan's surrender, ending World War II entirely.</> },
            ].map((t, i) => (
              <div className="nrh-tl-item" key={i}>
                <div className="nrh-tl-year-col"><div className="nrh-tl-year" style={{whiteSpace:'pre-line'}}>{t.year}</div></div>
                <div className="nrh-tl-content">
                  <div className="nrh-tl-head">{t.head}</div>
                  <div className="nrh-tl-desc">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="nrh-divider"><div className="nrh-divider-mark" /></div>

          {/* 7. Nazi World View */}
          <div className="nrh-sec-head">
            <div className="nrh-sec-num">7</div>
            <div className="nrh-sec-title-wrap">
              <div className="nrh-sec-kicker">Ideology of Hate</div>
              <h2 className="nrh-sec-title">The Nazi <span>World View</span></h2>
            </div>
          </div>

          <p className="nrh-body-text">Nazi ideology was not simply prejudice — it was a coherent, systematic worldview that claimed scientific authority for its racism. According to Nazi ideology there was <strong>no equality between people, but only racial hierarchy</strong>.</p>

          <div className="nrh-race-grid">
            <div className="nrh-race-card">
              <div className="nrh-race-icon">🔺</div>
              <div className="nrh-race-title">Racial Hierarchy</div>
              <div className="nrh-race-body">Nazis wanted a society of <strong>pure and healthy Nordic Aryans</strong>. They dreamed of creating an exclusive racial community by <strong>physically eliminating all those considered undesirable</strong>. This hierarchy was presented as biological fact, not opinion.</div>
            </div>
            <div className="nrh-race-card dark">
              <div className="nrh-race-icon">🌍</div>
              <div className="nrh-race-title">Lebensraum — Living Space</div>
              <div className="nrh-race-body">The other aspect of Hitler's ideology was the geopolitical concept of <strong>Lebensraum</strong> — Germany needed to expand eastward to provide <strong>living space and resources for the German race</strong>. Eastern peoples — Poles, Russians — were to be displaced or enslaved for Aryan settlers.</div>
            </div>
            <div className="nrh-race-card red">
              <div className="nrh-race-icon">⚠️</div>
              <div className="nrh-race-title">Who Was "Undesirable"</div>
              <div className="nrh-race-body">Jews, Gypsies, Blacks, Russians, Poles, <strong>even certain Germans</strong>, and those with physical or mental disabilities. All classified as undesirable — to be <strong>physically eliminated</strong> to create the pure Aryan community.</div>
            </div>
          </div>

          <div className="nrh-def-box" style={{borderTopColor:'var(--red)'}}>
            <div className="nrh-def-label">Pseudoscientific Racism</div>
            <div className="nrh-def-term">Why Conversion Was No Solution — Only Total Elimination</div>
            <div className="nrh-def-text">Hitler believed in <strong>pseudo-scientific theories of race</strong> which said that conversion was no solution to the Jewish problem. Since racial characteristics were claimed to be biological and hereditary, a Jewish person who converted to Christianity was still, in Nazi ideology, irredeemably Jewish. The problem was in the blood. Therefore, it had to be solved through <strong>their total elimination</strong> — not integration or emigration. This pseudoscience gave genocide its horrifying internal logic.</div>
          </div>

          <div className="nrh-divider"><div className="nrh-divider-mark" /></div>

          {/* 8. Holocaust */}
          <div className="nrh-sec-head">
            <div className="nrh-sec-num">8</div>
            <div className="nrh-sec-title-wrap">
              <div className="nrh-sec-kicker">Crimes Against Humanity</div>
              <h2 className="nrh-sec-title">The <span className="red-txt">Holocaust</span> — Two Phases</h2>
            </div>
          </div>

          <p className="nrh-body-text">Jews were the worst sufferers in Nazi Germany. The Holocaust — the systematic state-organised murder of six million Jews — did not happen suddenly. It escalated in two distinct, increasingly brutal phases over twelve years. Genocide and war became <strong>two sides of the same coin</strong>.</p>

          <div className="nrh-holocaust">
            <div className="nrh-holocaust-tag">The Systematic Destruction of a People</div>
            <div className="nrh-holocaust-head">From Persecution to Extermination — 1933 to 1945</div>
            <div className="nrh-holocaust-phases">
              <div className="nrh-phase">
                <div className="nrh-phase-years">1933 – 1938</div>
                <div className="nrh-phase-title">Phase 1 — Terror, Impoverishment & Segregation</div>
                <ul>
                  <li>Nazis <strong>terrorised, pauperised and segregated</strong> the Jews — stripping citizenship, jobs, and rights</li>
                  <li><strong>Compelling them to leave the country</strong> — making life so unbearable that emigration seemed the only option</li>
                  <li>Nuremberg Laws (1935) — stripped Jews of <strong>German citizenship entirely</strong></li>
                  <li>Jews forced to wear the <strong>yellow Star of David</strong> to publicly identify them</li>
                  <li><strong>Kristallnacht (1938)</strong> — nationwide pogrom destroying Jewish businesses, homes, and synagogues</li>
                </ul>
              </div>
              <div className="nrh-phase">
                <div className="nrh-phase-years">1939 – 1945</div>
                <div className="nrh-phase-title">Phase 2 — Concentration & Mass Murder</div>
                <ul>
                  <li>Aimed at <strong>concentrating them in certain areas</strong> — then killing them in <strong>gas chambers in Poland</strong></li>
                  <li>Jews transported from all occupied Europe to <strong>death camps in Poland</strong></li>
                  <li>Industrial-scale murder — <strong>6 million Jews killed</strong>, along with millions of others</li>
                  <li>Wannsee Conference (1942) — formalised the "Final Solution": <strong>total extermination of all European Jews</strong></li>
                  <li>Survivors just wanted to live — even for <strong>a few hours — to tell the world about the Holocaust</strong></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="nrh-def-box" style={{borderTopColor:'var(--amber)'}}>
            <div className="nrh-def-label">The Racial Utopia in Practice</div>
            <div className="nrh-def-term">Occupied Poland — Genocide and War as One</div>
            <div className="nrh-def-text">Genocide and war became two sides of the same coin. <strong>Occupied Poland was divided</strong>. Poles were forced to leave their homes and properties behind — to be occupied by <strong>ethnic Germans brought in from occupied Europe</strong>. This was Lebensraum made real: one people displaced and murdered so another could settle their land. The Holocaust was not a side effect of the war — it was <strong>central to the Nazi vision</strong> of what the war was for. It was only after the war ended that the world came to know the full scale of what had happened.</div>
          </div>

          <div className="nrh-pull-quote">
            <p>The Jews just wanted to live — even if it was for a few hours — to tell the world about the Holocaust.</p>
            <cite>— Knowledge of the Holocaust</cite>
          </div>

          <div className="nrh-divider"><div className="nrh-divider-mark" /></div>

          {/* 9. Youth */}
          <div className="nrh-sec-head">
            <div className="nrh-sec-num">9</div>
            <div className="nrh-sec-title-wrap">
              <div className="nrh-sec-kicker">Indoctrination from Childhood</div>
              <h2 className="nrh-sec-title">Youth in <span>Nazi Germany</span></h2>
            </div>
          </div>

          <p className="nrh-body-text">Hitler felt that a strong Nazi society could be established only by teaching Nazi ideology to children. The entire education system was transformed into an indoctrination machine — capturing minds before they could think critically or remember any other way of life.</p>

          <div className="nrh-youth-grid">
            <div className="nrh-youth-card">
              <div className="nrh-youth-tag">Schools Nazified</div>
              <div className="nrh-youth-title">Education as Indoctrination</div>
              <ul>
                <li>All schools were given <strong>German (Nazi-approved) teachers</strong> — Jewish and politically unreliable teachers dismissed</li>
                <li>Children divided into <strong>"desirable" and "undesirable"</strong> — Jewish, Romani, and disabled children excluded</li>
                <li><strong>Textbooks were rewritten</strong> to glorify Germany, demonise Jews, and promote Aryan racial superiority</li>
                <li>Sport in schools designed to <strong>nurture the spirit of violence and aggression</strong> — producing future soldiers, not thoughtful citizens</li>
              </ul>
            </div>
            <div className="nrh-youth-card dark">
              <div className="nrh-youth-tag">The Nazi Youth Pipeline</div>
              <div className="nrh-youth-title">From Jungvolk to Labour Service</div>
              <ul>
                <li><strong>Age 10</strong> — Boys entered <em>Jungvolk</em> (Young Folk) — first stage of formal Nazi indoctrination</li>
                <li><strong>Age 14</strong> — All boys joined <em>Hitler Youth</em> — trained in Nazi ideology, militarism, and physical fitness</li>
                <li><strong>Age 18</strong> — Boys joined the <em>Labour Service</em> — mandatory state labour before military conscription</li>
                <li>A generation knowing <strong>nothing but Nazi ideology from childhood</strong> — making resistance psychologically nearly impossible</li>
              </ul>
            </div>
          </div>

          <div className="nrh-divider"><div className="nrh-divider-mark" /></div>

          {/* 10. Cult of Motherhood */}
          <div className="nrh-sec-head">
            <div className="nrh-sec-num">10</div>
            <div className="nrh-sec-title-wrap">
              <div className="nrh-sec-kicker">Women Under Nazism</div>
              <h2 className="nrh-sec-title">The Nazi Cult of <span>Motherhood</span></h2>
            </div>
          </div>

          <div className="nrh-mother">
            <div className="nrh-mother-tag">Women's Role in the Nazi State</div>
            <div className="nrh-mother-head">Bearers of the Aryan Race — Nothing More</div>
            <div className="nrh-mother-body">Women were told to be <strong>good mothers and rear pure-blooded Aryan children</strong>. They were <strong>encouraged to produce many children</strong> — mothers with four or more received the Honour Cross of the German Mother. Women had to be the <strong>bearers of the Aryan culture and race</strong> — guardians of racial purity in the home. Women were <strong>excluded from professional and political life</strong> — a direct reversal of rights gained under the Weimar Republic. Women who had children with non-Aryans were publicly shamed and punished. The Nazi Cult of Motherhood reduced women to <strong>biological instruments of the state's racial programme</strong> — their value measured entirely in children produced, not individual rights or freedoms.</div>
          </div>

          <div className="nrh-divider"><div className="nrh-divider-mark" /></div>

          {/* 11. Propaganda */}
          <div className="nrh-sec-head">
            <div className="nrh-sec-num">11</div>
            <div className="nrh-sec-title-wrap">
              <div className="nrh-sec-kicker">Manufacturing Hatred</div>
              <h2 className="nrh-sec-title">The Art of <span>Propaganda</span></h2>
            </div>
          </div>

          <p className="nrh-body-text">The Nazi regime used language and media with care and often to great effect. Under <strong>Joseph Goebbels</strong>, every medium was weaponised — not to inform, but to reshape how people thought, felt, and hated.</p>

          <div className="nrh-propaganda">
            <div className="nrh-propaganda-tag">Ministry of Propaganda — Every Medium Controlled</div>
            <div className="nrh-propaganda-head">Every Medium Controlled — Every Emotion Weaponised</div>
            <div className="nrh-propaganda-grid">
              {[
                { icon:"🎬", title:"Films",           desc:"Nazi films depicted Jews as subhumans — normalising hatred through repeated visual imagery. Riefenstahl's films glorified Hitler as a god-like figure at enormous Nuremberg rallies." },
                { icon:"📻", title:"Radio",           desc:"Cheap radios mass-produced so every German household could hear Hitler's speeches and Nazi messaging. Radio was the era's most powerful mass communication tool — and the Nazis owned it." },
                { icon:"🪧", title:"Posters & Images",desc:"Vivid propaganda posters covered public spaces — celebrating Aryan strength and demonising Jews. Visual imagery bypassed rational thought and worked directly on emotion and instinct." },
                { icon:"📰", title:"Newspapers",      desc:"All press brought under state control. Only approved stories were published. Jews were portrayed consistently as Germany's enemy — in every edition, every day, relentlessly." },
              ].map(({ icon, title, desc }) => (
                <div className="nrh-prop-item" key={title}>
                  <div className="nrh-prop-icon">{icon}</div>
                  <div className="nrh-prop-title">{title}</div>
                  <div className="nrh-prop-desc">{desc}</div>
                </div>
              ))}
            </div>
          </div>

          <ul className="nrh-list" style={{marginTop:'32px'}}>
            <li>Nazism <strong>worked on the minds of the people</strong> — tapped their emotions and turned their hatred and anger at those marked as undesirable</li>
            <li>People came to <strong>see the world through Nazi eyes and speak the Nazi language</strong> — hatred was normalised through relentless repetition</li>
            <li>At times even <strong>Jews began to believe in the Nazi stereotypes</strong> about themselves — demonstrating the terrifying power of sustained propaganda on its own victims</li>
            <li>Knowledge about the Holocaust came to light <strong>only after the war ended</strong> — the full scale of atrocities was hidden from the outside world until the liberation of the camps in 1945</li>
          </ul>

          <div className="nrh-pull-quote">
            <p>People saw the world through Nazi eyes and spoke the Nazi language. The greatest crime of propaganda was not what it made people do — it was what it made them believe was normal.</p>
            <cite>— Crimes Against Humanity & Nazi Propaganda</cite>
          </div>

          <div className="nrh-divider"><div className="nrh-divider-mark" /></div>

          {/* FAQ */}
          <div className="nrh-faq-header">
            <span className="nrh-faq-kicker">Exam Preparation</span>
          </div>
          <h2 className="nrh-faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, i) => (
            <div className={`nrh-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="nrh-faq-q" onClick={() => toggle(i)}>
                <span className="nrh-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="nrh-faq-icon">{openIndex === i ? "▴" : "▾"}</span>
              </button>
              <div className={`nrh-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
