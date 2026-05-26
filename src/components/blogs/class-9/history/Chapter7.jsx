import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #080c08;
    --ink2:       #141c14;
    --muted:      #6a7060;
    --paper:      #f8faf4;
    --paper2:     #eaf0e0;
    --paper3:     #dce8cc;
    --pitch:      #2e6020;
    --pitch2:     #1e4414;
    --pitch-lt:   #e4f0d8;
    --cream:      #c8a840;
    --cream2:     #9a7e28;
    --red:        #8b1a1a;
    --red2:       #6b1212;
    --navy:       #1a2a5a;
    --navy2:      #0e1c3e;
    --rule:       #b8cca8;
    --seam:       #c84820;
    --seam2:      #9a3214;
    --cork:       #c8a070;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ckt-root {
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
  }

  /* ─── HERO ─── */
  .ckt-hero {
    background: linear-gradient(160deg, #040804 0%, #081008 50%, #0a0a04 100%);
    min-height: 88vh;
    display: flex; align-items: flex-end;
    position: relative; overflow: hidden;
    padding: 0 0 64px;
  }
  .ckt-hero-bg-num {
    position: absolute; bottom: -40px; right: -20px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(240px, 38vw, 520px); font-weight: 900; line-height: 1;
    color: rgba(255,255,255,0.022); letter-spacing: -0.04em;
    user-select: none; pointer-events: none;
  }
  /* Cricket pitch green + seam red top rule */
  .ckt-hero::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #1e4414, #2e6020, #4a9030, #c84820, #4a9030, #2e6020, #1e4414);
  }
  .ckt-ring {
    position: absolute; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.016); pointer-events: none;
  }
  .ckt-hero-inner {
    max-width: 900px; width: 100%;
    margin: 0 auto; padding: 0 32px;
    position: relative; z-index: 1;
  }
  .ckt-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #4aaa30; margin-bottom: 24px;
    display: flex; align-items: center; gap: 14px;
  }
  .ckt-overline::before, .ckt-overline::after {
    content: ''; flex: 0 0 40px; height: 1px; background: #4aaa30;
  }
  .ckt-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(40px, 7.5vw, 84px); font-weight: 900;
    color: #fff; line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 32px;
  }
  .ckt-hero-title em        { font-style: normal; color: #4aaa30; }
  .ckt-hero-title .seam-em  { color: #e86030; }
  .ckt-hero-title .cream-em { color: #e8c840; }
  .ckt-hero-bar {
    display: flex; flex-wrap: wrap; gap: 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 24px; margin-top: 8px;
  }
  .ckt-hero-bar-item {
    flex: 1 1 150px; padding: 0 24px 0 0;
    border-right: 1px solid rgba(255,255,255,0.1); margin-right: 24px;
  }
  .ckt-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .ckt-bar-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.35); margin-bottom: 5px;
  }
  .ckt-bar-value {
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600;
    color: rgba(255,255,255,0.75);
  }

  /* ─── BODY ─── */
  .ckt-body { max-width: 860px; margin: 0 auto; padding: 72px 32px 96px; }

  /* LEAD */
  .ckt-lead {
    border-left: 5px solid var(--pitch);
    padding: 28px 36px; margin-bottom: 64px; background: var(--paper2);
  }
  .ckt-lead p {
    font-family: 'Poppins', sans-serif; font-size: 19px; font-weight: 500;
    color: var(--ink2); line-height: 1.78; margin: 0 0 14px;
  }
  .ckt-lead p:last-child { margin: 0; }
  .ckt-lead strong { color: var(--pitch); }

  /* SECTION HEADER */
  .ckt-sec-head {
    display: flex; align-items: flex-start; gap: 20px;
    margin-bottom: 28px; border-bottom: 2px solid var(--rule); padding-bottom: 18px;
  }
  .ckt-sec-num {
    font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900;
    color: var(--rule); line-height: 1; flex-shrink: 0; margin-top: 4px;
  }
  .ckt-sec-title-wrap { display: flex; flex-direction: column; justify-content: flex-end; }
  .ckt-sec-kicker {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--pitch); margin-bottom: 4px;
  }
  .ckt-sec-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(22px, 3.5vw, 32px); font-weight: 900;
    color: var(--ink); line-height: 1.15; letter-spacing: -0.01em;
  }
  .ckt-sec-title span       { color: var(--pitch); }
  .ckt-sec-title .seam-txt  { color: var(--seam); }
  .ckt-sec-title .cream-txt { color: var(--cream); }
  .ckt-sec-title .navy-txt  { color: var(--navy); }
  .ckt-sec-title .red-txt   { color: var(--red); }

  /* BODY TEXT */
  .ckt-body-text {
    font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 400;
    color: #141c14; line-height: 1.82; margin-bottom: 24px;
  }
  .ckt-body-text strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── PECULIARITIES — scoreboard style ── */
  .ckt-scoreboard {
    background: var(--ink); padding: 0; margin-bottom: 48px;
    border-top: 4px solid var(--pitch);
  }
  .ckt-scoreboard-header {
    background: var(--pitch); padding: 14px 24px;
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.7);
    display: flex; justify-content: space-between; align-items: center;
  }
  .ckt-scoreboard-title {
    font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 900; color: #fff;
  }
  .ckt-score-row {
    display: grid; grid-template-columns: 40px 1fr;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    align-items: stretch;
  }
  .ckt-score-row:last-child { border-bottom: none; }
  .ckt-score-num {
    background: rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 900;
    color: var(--pitch); border-right: 1px solid rgba(255,255,255,0.07);
  }
  .ckt-score-text {
    padding: 14px 20px;
    font-family: 'Inter', sans-serif; font-size: 15px;
    color: rgba(255,255,255,0.72); line-height: 1.65;
  }
  .ckt-score-text strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: #4aaa30; }

  /* ── LAWS 1744 — parchment card ── */
  .ckt-laws {
    background: var(--paper3); border: 1px solid var(--rule);
    padding: 32px 36px; margin-bottom: 48px;
    position: relative;
  }
  .ckt-laws::before {
    content: '📜'; position: absolute; right: 20px; top: 16px;
    font-size: 60px; opacity: 0.15; pointer-events: none;
  }
  .ckt-laws-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.2em; color: var(--seam); margin-bottom: 8px;
  }
  .ckt-laws-title {
    font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900;
    color: var(--ink); margin-bottom: 18px;
  }
  .ckt-laws-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 2px; background: var(--rule);
  }
  .ckt-law-item { background: var(--paper2); padding: 14px 16px; }
  .ckt-law-label {
    font-family: 'Poppins', sans-serif; font-size: 9px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.16em; color: var(--seam); margin-bottom: 4px;
  }
  .ckt-law-value {
    font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); line-height: 1.55;
  }
  .ckt-law-value strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--pitch); }

  /* ── EVOLUTION TIMELINE ── */
  .ckt-timeline { margin-bottom: 48px; }
  .ckt-tl-item {
    display: grid; grid-template-columns: 120px 1fr;
    gap: 0; border-bottom: 1px solid var(--rule);
  }
  .ckt-tl-item:first-child { border-top: 1px solid var(--rule); }
  .ckt-tl-year-col {
    padding: 22px 20px 22px 0;
    border-right: 3px solid var(--pitch);
    display: flex; align-items: flex-start; justify-content: flex-end;
  }
  .ckt-tl-year {
    font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 900;
    color: var(--pitch); letter-spacing: 0.04em; text-align: right; line-height: 1.3;
  }
  .ckt-tl-content { padding: 22px 0 22px 24px; }
  .ckt-tl-head {
    font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 700;
    color: var(--ink); margin-bottom: 6px;
  }
  .ckt-tl-desc {
    font-family: 'Inter', sans-serif; font-size: 15px; color: #1c2c1c; line-height: 1.76;
  }
  .ckt-tl-desc strong { color: var(--pitch); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── CHANGES CHECKLIST — 2-col with era badges ── */
  .ckt-changes {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 2px; background: var(--rule); margin-bottom: 48px;
  }
  .ckt-change-col { background: var(--paper2); padding: 24px 24px; }
  .ckt-change-col.dark { background: var(--pitch2); }
  .ckt-change-era {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.18em; margin-bottom: 14px;
    display: inline-block; padding: 4px 12px;
  }
  .ckt-change-col:not(.dark) .ckt-change-era {
    background: var(--pitch-lt); color: var(--pitch);
  }
  .ckt-change-col.dark .ckt-change-era {
    background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.6);
  }
  .ckt-change-col ul { padding-left: 0; margin: 0; list-style: none; }
  .ckt-change-col ul li {
    font-size: 14px; line-height: 1.72; margin-bottom: 8px;
    padding-left: 20px; position: relative;
  }
  .ckt-change-col ul li::before {
    content: '✓'; position: absolute; left: 0; color: var(--pitch); font-weight: 700; font-size: 13px;
  }
  .ckt-change-col.dark ul li { color: rgba(255,255,255,0.72); }
  .ckt-change-col:not(.dark) ul li { color: var(--ink2); }
  .ckt-change-col.dark ul li::before { color: #4aaa30; }
  .ckt-change-col ul li strong { font-family: 'Poppins', sans-serif; font-weight: 700; }
  .ckt-change-col:not(.dark) ul li strong { color: var(--ink); }
  .ckt-change-col.dark ul li strong { color: #fff; }

  /* ── CLASS DIVIDE — 2-col contrast ── */
  .ckt-class-divide {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0; background: var(--rule); margin-bottom: 48px;
  }
  .ckt-class-col { padding: 28px 26px; }
  .ckt-class-col.gent { background: var(--navy); }
  .ckt-class-col.pro  { background: var(--paper2); }
  .ckt-class-badge {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 12px;
    padding: 4px 12px; display: inline-block;
  }
  .ckt-class-col.gent .ckt-class-badge { background: rgba(255,255,255,0.1); color: #e8c840; }
  .ckt-class-col.pro  .ckt-class-badge { background: var(--pitch-lt); color: var(--pitch); }
  .ckt-class-name {
    font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900;
    margin-bottom: 6px;
  }
  .ckt-class-col.gent .ckt-class-name { color: #fff; }
  .ckt-class-col.pro  .ckt-class-name { color: var(--ink); }
  .ckt-class-sub {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 14px;
  }
  .ckt-class-col.gent .ckt-class-sub { color: rgba(255,255,255,0.45); }
  .ckt-class-col.pro  .ckt-class-sub { color: var(--muted); }
  .ckt-class-col ul { padding-left: 18px; margin: 0; }
  .ckt-class-col ul li { font-size: 14px; line-height: 1.72; margin-bottom: 8px; }
  .ckt-class-col.gent ul li { color: rgba(255,255,255,0.68); }
  .ckt-class-col.pro  ul li { color: var(--ink2); }
  .ckt-class-col ul li strong { font-family: 'Poppins', sans-serif; font-weight: 700; }
  .ckt-class-col.gent ul li strong { color: #e8c840; }
  .ckt-class-col.pro  ul li strong { color: var(--pitch); }

  /* ── SPREAD OF CRICKET — region cards ── */
  .ckt-region-strip { margin-bottom: 48px; }
  .ckt-region-card {
    display: grid; grid-template-columns: 72px 1fr;
    gap: 0; margin-bottom: 2px; background: var(--rule);
  }
  .ckt-region-icon-col {
    display: flex; align-items: center; justify-content: center;
    font-size: 26px;
  }
  .ckt-region-card:nth-child(1) .ckt-region-icon-col { background: var(--navy); }
  .ckt-region-card:nth-child(2) .ckt-region-icon-col { background: var(--seam); }
  .ckt-region-card:nth-child(3) .ckt-region-icon-col { background: var(--pitch); }
  .ckt-region-card:nth-child(4) .ckt-region-icon-col { background: var(--cream2); }
  .ckt-region-body { background: var(--paper); padding: 18px 24px; }
  .ckt-region-name {
    font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 900;
    color: var(--ink); margin-bottom: 2px;
  }
  .ckt-region-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.16em; margin-bottom: 8px;
  }
  .ckt-region-card:nth-child(1) .ckt-region-tag { color: var(--navy); }
  .ckt-region-card:nth-child(2) .ckt-region-tag { color: var(--seam); }
  .ckt-region-card:nth-child(3) .ckt-region-tag { color: var(--pitch); }
  .ckt-region-card:nth-child(4) .ckt-region-tag { color: var(--cream2); }
  .ckt-region-desc {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: #1c2c1c; line-height: 1.68;
  }
  .ckt-region-desc strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ink); }

  /* ── COMMUNAL CRICKET — dark block ── */
  .ckt-communal {
    background: var(--navy2); padding: 32px 36px; margin-bottom: 48px;
    border-top: 4px solid var(--cream);
  }
  .ckt-communal-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.22em; color: rgba(255,255,255,0.4); margin-bottom: 14px;
  }
  .ckt-communal-head {
    font-family: 'Montserrat', sans-serif; font-size: clamp(18px,2.8vw,24px); font-weight: 900;
    color: #e8c840; margin-bottom: 18px;
  }
  .ckt-communal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .ckt-communal-item {
    background: rgba(255,255,255,0.06); padding: 16px 18px;
    border-left: 3px solid var(--cream);
  }
  .ckt-communal-item-title {
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    color: #e8c840; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.1em;
  }
  .ckt-communal-item-body {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: rgba(255,255,255,0.65); line-height: 1.68;
  }
  .ckt-communal-item-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: #fff; }

  /* ── STAT ROW ── */
  .ckt-stat-row { display: flex; flex-wrap: wrap; gap: 2px; margin-bottom: 48px; background: var(--rule); }
  .ckt-stat-box { flex: 1 1 130px; background: var(--paper); padding: 24px 18px; text-align: center; }
  .ckt-stat-val {
    font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900;
    color: var(--pitch); line-height: 1.1; margin-bottom: 6px; letter-spacing: -0.02em;
  }
  .ckt-stat-label {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 600;
    color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; line-height: 1.4;
  }

  /* ── MODERN ERA — 3-col cards ── */
  .ckt-modern-grid {
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    gap: 2px; background: var(--rule); margin-bottom: 48px;
  }
  .ckt-modern-card { padding: 26px 22px; }
  .ckt-modern-card.m1 { background: var(--seam2); }
  .ckt-modern-card.m2 { background: var(--pitch); }
  .ckt-modern-card.m3 { background: var(--navy); }
  .ckt-modern-icon { font-size: 32px; margin-bottom: 12px; }
  .ckt-modern-title {
    font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 900;
    color: #fff; margin-bottom: 8px;
  }
  .ckt-modern-body {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: rgba(255,255,255,0.72); line-height: 1.7;
  }
  .ckt-modern-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: #fff; }

  /* ── KERRY PACKER BLOCK ── */
  .ckt-packer {
    background: var(--seam); padding: 32px 36px; margin-bottom: 48px;
    position: relative; overflow: hidden;
  }
  .ckt-packer::before {
    content: '📺'; position: absolute; right: 20px; top: 10px;
    font-size: 140px; line-height: 1; pointer-events: none; opacity: 0.1;
  }
  .ckt-packer-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.5); margin-bottom: 10px;
  }
  .ckt-packer-head {
    font-family: 'Montserrat', sans-serif; font-size: clamp(18px,2.8vw,26px); font-weight: 900;
    color: #fff; margin-bottom: 14px; position: relative; z-index: 1;
  }
  .ckt-packer-body {
    font-family: 'Inter', sans-serif; font-size: 16px;
    color: rgba(255,255,255,0.88); line-height: 1.78; position: relative; z-index: 1;
  }
  .ckt-packer-body strong { color: #fff; font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── INFO TABLE ── */
  .ckt-table-wrap { margin-bottom: 48px; border: 1px solid var(--rule); }
  .ckt-table-title {
    background: var(--ink); padding: 14px 24px;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    color: #4aaa30; letter-spacing: 0.06em; text-transform: uppercase;
  }
  .ckt-table-row {
    display: grid; grid-template-columns: 180px 1fr;
    border-bottom: 1px solid var(--rule);
  }
  .ckt-table-row:last-child { border-bottom: none; }
  .ckt-table-key {
    background: var(--paper2); padding: 14px 18px;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    color: var(--pitch); border-right: 1px solid var(--rule);
    display: flex; align-items: center;
  }
  .ckt-table-val {
    padding: 14px 18px;
    font-family: 'Inter', sans-serif; font-size: 15px; line-height: 1.65; color: #374151;
  }
  .ckt-table-val strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── BULLET LIST ── */
  .ckt-list { margin: 0 0 28px; padding: 0; list-style: none; }
  .ckt-list li {
    font-size: 16px; line-height: 1.78; color: #141c14;
    padding: 10px 0 10px 28px; position: relative;
    border-bottom: 1px solid var(--rule);
  }
  .ckt-list li:first-child { border-top: 1px solid var(--rule); }
  .ckt-list li::before {
    content: ''; position: absolute; left: 0; top: 18px;
    width: 10px; height: 10px;
    border: 2px solid var(--pitch); transform: rotate(45deg);
  }
  .ckt-list li strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── PULL QUOTE ── */
  .ckt-pull-quote {
    margin: 40px 0; padding: 32px 40px;
    background: var(--ink); position: relative;
  }
  .ckt-pull-quote::before {
    content: '"'; position: absolute; top: -18px; left: 28px;
    font-family: 'Montserrat', sans-serif; font-size: 120px; font-weight: 900;
    color: var(--pitch); line-height: 1;
  }
  .ckt-pull-quote p {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(17px,2.4vw,22px); font-weight: 800;
    color: #fff; line-height: 1.45; letter-spacing: -0.01em;
    position: relative; z-index: 1; margin-bottom: 12px;
  }
  .ckt-pull-quote cite {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600;
    color: #4aaa30; text-transform: uppercase; letter-spacing: 0.12em; font-style: normal;
  }

  /* ── DEF BOX ── */
  .ckt-def-box {
    background: var(--ink); padding: 32px 36px;
    margin-bottom: 48px; border-top: 4px solid var(--pitch);
  }
  .ckt-def-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; color: #4aaa30; margin-bottom: 10px;
  }
  .ckt-def-term {
    font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900;
    color: #fff; letter-spacing: -0.02em; margin-bottom: 14px;
  }
  .ckt-def-text {
    font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 400;
    color: rgba(255,255,255,0.72); line-height: 1.8;
  }
  .ckt-def-text strong { color: #4aaa30; font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── SECTION DIVIDER ── */
  .ckt-divider { display: flex; align-items: center; gap: 16px; margin: 56px 0; }
  .ckt-divider::before, .ckt-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .ckt-divider-mark { width: 10px; height: 10px; background: var(--pitch); transform: rotate(45deg); flex-shrink: 0; }

  /* ── FAQ ── */
  .ckt-faq-header {
    border-bottom: 3px solid var(--ink); padding-bottom: 14px; margin-bottom: 0;
    display: flex; align-items: baseline; gap: 16px;
  }
  .ckt-faq-kicker {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--pitch);
  }
  .ckt-faq-title {
    font-family: 'Montserrat', sans-serif; font-size: clamp(24px,4vw,34px); font-weight: 900;
    color: var(--ink); letter-spacing: -0.01em; margin: 20px 0 32px;
  }
  .ckt-faq-item { border-bottom: 1px solid var(--rule); overflow: hidden; }
  .ckt-faq-item.open { background: var(--paper2); }
  .ckt-faq-q {
    width: 100%; text-align: left; background: none; border: none; cursor: pointer;
    padding: 20px 0; display: grid; grid-template-columns: 1fr 32px;
    gap: 16px; align-items: start;
  }
  .ckt-faq-q-text {
    font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 600;
    color: var(--ink); line-height: 1.5; text-align: left; padding-left: 4px;
  }
  .ckt-faq-item.open .ckt-faq-q-text { color: var(--pitch2); }
  .ckt-faq-icon {
    width: 28px; height: 28px; border: 1.5px solid var(--rule);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; color: var(--pitch); flex-shrink: 0; margin-top: 2px;
  }
  .ckt-faq-item.open .ckt-faq-icon { background: var(--ink); border-color: var(--ink); color: #4aaa30; }
  .ckt-faq-ans {
    display: none; padding: 0 4px 22px;
    font-size: 16px; line-height: 1.82; color: #374151;
  }
  .ckt-faq-ans.visible { display: block; }
  .ckt-faq-ans ul { padding-left: 20px; margin: 8px 0; }
  .ckt-faq-ans ul li { margin-bottom: 7px; }
  .ckt-faq-ans strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }
  .ckt-faq-ans p { margin: 0 0 10px; }
  .ckt-faq-ans p:last-child { margin: 0; }

  @media (max-width: 620px) {
    .ckt-hero          { min-height: auto; padding: 80px 0 48px; }
    .ckt-changes       { grid-template-columns: 1fr; }
    .ckt-class-divide  { grid-template-columns: 1fr; }
    .ckt-modern-grid   { grid-template-columns: 1fr; }
    .ckt-communal-grid { grid-template-columns: 1fr; }
    .ckt-laws-grid     { grid-template-columns: 1fr; }
    .ckt-region-card   { grid-template-columns: 56px 1fr; }
    .ckt-tl-item       { grid-template-columns: 80px 1fr; }
    .ckt-table-row     { grid-template-columns: 120px 1fr; }
  }
`;

const faqs = [
  {
    q: "How did cricket originate and develop as a game in England?",
    a: (<>
      <p>Cricket has one of the most fascinating origin stories in sports history:</p>
      <ul>
        <li>Cricket grew out of the many <strong>stick and ball games played in England nearly 500 years ago</strong>. By the 17th century it had evolved enough to be recognizable as a distinct game</li>
        <li>It became so popular that fans <strong>did not mind being fined for playing it on Sunday</strong> instead of going to church — a remarkable indicator of how much people loved the game</li>
        <li>Until the 18th century, <strong>cricket bats were curved in shape like hockey sticks</strong> — the straight bat came later as the game evolved</li>
        <li>The <strong>first written Laws of Cricket were established in 1744</strong>, specifying stumps (22 inches high), the pitch (22 yards), and ball weight (5–6 ounces) — but notably no limits on bat shape or size</li>
        <li>The <strong>world's first cricket club was formed in Hambledon in the 1760s</strong></li>
        <li>The <strong>Marylebone Cricket Club (MCC) was founded in 1787</strong> and in 1788 published its first revision of the laws, becoming the guardian of cricket's regulations</li>
        <li>The game matured through the <strong>Industrial Revolution</strong> but remained true to its rural English origins — refusing to replace traditional materials like willow and leather with industrial alternatives</li>
      </ul>
    </>),
  },
  {
    q: "What are the peculiarities of cricket? Why does the pitch have a set length but no fixed boundary size?",
    a: (<>
      <p>Cricket has several unique characteristics that set it apart from every other major sport — and each peculiarity has a historical explanation:</p>
      <ul>
        <li><strong>A match can last five days and still end in a draw</strong> — no other major sport has this feature. This reflects cricket's origins in an era before industrialisation, when life moved at a slow, unhurried pace</li>
        <li><strong>The pitch is specified at exactly 22 yards</strong> — but the size or shape of the ground is not. This is because cricket was originally played on <strong>commons — shared village land</strong>. Each common had a different shape and size, so standardising the ground was never part of the original game</li>
        <li><strong>No designed boundaries or boundary hits originally</strong> — the concept of a boundary line came later as grounds became more formal</li>
        <li>The rules of cricket were made <strong>before the Industrial Revolution</strong> — when there was no pressure to make games faster, more efficient, or more commercially driven</li>
        <li>Unlike virtually every other sport, cricket has <strong>refused to remake its tools with industrial or man-made materials</strong> — the bat is still made of willow, the ball still of leather and cork. Protective equipment has changed, but the core tools have not</li>
      </ul>
    </>),
  },
  {
    q: "What were the key changes in cricket during the 18th and 19th centuries?",
    a: (<>
      <p>Cricket underwent significant evolution across two centuries, transforming from a rough country game into a sophisticated, regulated sport:</p>
      <p><strong>2nd Half of 18th Century:</strong></p>
      <ul>
        <li>It became common to <strong>pitch the ball through the air</strong> (toss it up) rather than roll it along the ground</li>
        <li><strong>Curved bats were replaced by straight ones</strong> — a fundamental change to the game's technique</li>
        <li>Weight of ball was <strong>limited to between 5½ to 5¾ ounces</strong></li>
        <li><strong>Width of the bat was limited to four inches</strong> — preventing batsmen from using absurdly wide bats</li>
        <li><strong>A third stump became common</strong> — previously only two stumps were used</li>
        <li>Three days became the standard length of a major match</li>
        <li>The <strong>first six-seam cricket ball was introduced</strong></li>
      </ul>
      <p><strong>19th Century:</strong></p>
      <ul>
        <li>The <strong>wide ball rule was implemented</strong> — penalising bowlers for balls too far from the batsman</li>
        <li><strong>Exact circumference of the ball was specified</strong></li>
        <li>Protective equipment like <strong>pads and gloves became available</strong> — influenced by technological change, unlike the core tools</li>
        <li><strong>Boundaries were introduced</strong> — rather than fielders running to retrieve every shot</li>
        <li><strong>Overarm bowling became legal</strong> — a major revolution in bowling technique</li>
      </ul>
    </>),
  },
  {
    q: "How did cricket reflect English class divisions? Who were Amateurs and Players?",
    a: (<>
      <p>Cricket in England was not just a sport — it was a mirror of the rigid class hierarchy of English society:</p>
      <ul>
        <li>The organisation of cricket in England <strong>reflected the nature of English society</strong> — divided between the rich and the working class</li>
        <li><strong>Amateurs (Gentlemen):</strong> These were the <strong>rich who played for pleasure</strong>. They were called "Gentlemen" — and playing for money would have been considered beneath their dignity. Cricket was a leisure activity for them</li>
        <li><strong>Players (Professionals):</strong> These were the <strong>working-class professionals who played for money</strong> — cricket was their livelihood, not a leisure pursuit</li>
        <li><strong>Rules of cricket were made to favour the gentlemen</strong>. Gentlemen did most of the batting — batting being considered the superior, more elegant skill. Bowling was seen as the labour of the working class</li>
        <li>The superiority of gentlemen over professionals meant that <strong>only batsmen (gentlemen) became captains of teams</strong> — professional bowlers could never lead a team, regardless of their ability</li>
        <li>The famous quote: <strong>"The battle of Waterloo was won on the playing fields of Eton"</strong> — suggesting that cricket and team games taught the discipline and leadership qualities needed to run the British Empire</li>
        <li>Team games like Cricket and Rugby were credited with instilling <strong>discipline, hierarchy, honour, and leadership qualities</strong> — the values of empire builders</li>
      </ul>
    </>),
  },
  {
    q: "How did cricket spread to the colonies? How did it develop in the Caribbean?",
    a: (<>
      <p>Cricket's spread followed the routes of British colonialism — but its meaning and significance changed wherever it took root:</p>
      <ul>
        <li>Cricket <strong>remained a colonial game</strong> — its colonial nature made it difficult to be accepted by non-colonial countries. It was played in colonies either by <strong>white settlers or by local elites who wanted to copy their white masters</strong></li>
        <li>Unlike football which became a genuinely global sport, cricket stayed largely within the boundaries of the British Empire — which is why it is not played widely in continental Europe, the Americas (outside the Caribbean), or East Asia</li>
        <li><strong>In the Caribbean:</strong> Cricket became a sign of <strong>social and racial status</strong>. The Afro-Caribbean population was <strong>discouraged from playing cricket</strong> — it was a white sport</li>
        <li>Whites initially <strong>dominated the game in the Caribbean</strong></li>
        <li>It was not until <strong>1960 that Frank Worrell, a black player, led the West Indies team</strong> — a landmark moment in the history of racial equality in sport</li>
        <li>Success in cricket became a <strong>measure of racial equality and political progress</strong> in the Caribbean — winning at cricket against England meant something far beyond sport</li>
      </ul>
    </>),
  },
  {
    q: "How did cricket develop in India? What was the Pentangular tournament?",
    a: (<>
      <p>Cricket's development in India was deeply intertwined with colonialism, religion, and communal politics:</p>
      <ul>
        <li>The <strong>first Indian cricket club, the Calcutta Cricket Club, was established in 1792</strong></li>
        <li>The <strong>first Indian community to play cricket were the Parsis</strong>. They founded the <strong>Oriental Cricket Club in Bombay in 1848</strong> — setting a precedent for other communities</li>
        <li>Other Indians established clubs based on <strong>religious community</strong> — by the 1890s there was talk of a <strong>Hindu Gymkhana and Islam Gymkhana</strong></li>
        <li>The <strong>colonial government encouraged communal clubs and institutions</strong> — cricket began to be organised on communal and racial lines, reflecting the British policy of divide and rule</li>
        <li><strong>The Quadrangular Tournament</strong> was played by 4 teams: <strong>Europeans, Parsis, Hindus, and Muslims</strong>. It later became the <strong>Pentangular</strong> when a fifth team — "the Rest" — was added</li>
        <li>By the <strong>1930s and 1940s</strong>, many people including <strong>Mahatma Gandhi condemned the Pentangular</strong> for dividing India on communal lines</li>
        <li>Yet paradoxically, cricket also acted as a <strong>tool to unite Hindus</strong> — the Hindu team appointed <strong>Vitthal, a player from the lower class, as captain</strong>. This was a bold, progressive step against caste discrimination</li>
        <li>Through the early history, teams were not organised on geographical principles — it was <strong>not until 1932 that a national team was given the right to represent India in a Test match</strong>, with <strong>C.K. Nayudu as its maiden captain</strong></li>
      </ul>
    </>),
  },
  {
    q: "How did decolonisation change world cricket? What was the role of India?",
    a: (<>
      <p>Decolonisation did not just change politics — it fundamentally transformed the balance of power in world cricket:</p>
      <ul>
        <li><strong>Decolonisation was a process which led to the decline of English influence</strong> in many areas including sports</li>
        <li>Cricket was <strong>dominated until the 1970s by England and Australia</strong> — the old white Commonwealth nations. But with the emergence of Asian powers like India, their dominance declined</li>
        <li>The <strong>ICC (International Cricket Conference) was initially called the Imperial Cricket Conference</strong> — the name itself betrayed its colonial origins. It was later renamed the International Cricket Conference</li>
        <li>The <strong>colonial favour of world cricket during the 1950s and 1960s</strong> was visible from the fact that England, Australia, and New Zealand continued to play matches with <strong>South Africa</strong> — despite apartheid</li>
        <li>It was only with <strong>political pressure from Asian and African countries</strong> (recently decolonised), combined with liberal feeling in Britain, that forced English cricket authorities to <strong>cancel a South Africa tour in 1970</strong></li>
        <li>India became the dominant force in world cricket — with the <strong>largest viewership for the game</strong>, the centre of gravity of world cricket shifted to South Asia</li>
        <li>This shift was symbolised by the <strong>ICC moving its headquarters from London to tax-free Dubai</strong></li>
      </ul>
    </>),
  },
  {
    q: "What was Kerry Packer's contribution to the transformation of cricket? How did television and commerce change the game?",
    a: (<>
      <p>The 1970s was the decade in which cricket was transformed beyond recognition — largely through the vision of one Australian businessman:</p>
      <ul>
        <li><strong>1971 — First One-Day International:</strong> The first ODI was played between England and Australia in Melbourne — introducing a completely new format that would eventually become more popular than Test cricket</li>
        <li><strong>1977 — Kerry Packer's Revolution:</strong> An <strong>Australian television tycoon, Kerry Packer</strong>, changed the game forever. He saw cricket as a <strong>money-making televised sport</strong> — not just a gentleman's game</li>
        <li>He <strong>signed up 51 of the world's leading cricketers</strong> and for almost two years staged unofficial Tests and ODIs under the name of <strong>World Series Cricket</strong></li>
        <li>Packer proved conclusively that <strong>cricket was a marketable game which could generate huge revenue</strong> — forcing cricket's conservative administrators to acknowledge the commercial reality</li>
        <li><strong>Continuous television coverage made cricketers celebrities</strong> — household names recognised far beyond the cricket community</li>
        <li>Television <strong>expanded the audience dramatically</strong> — children became cricket fans; cricket reached smaller towns and villages that could never watch live matches</li>
        <li><strong>Multinational companies created a global market for cricket</strong> — sponsorships, endorsements, and broadcasting rights transformed the economics of the game</li>
        <li>India became the commercial epicentre — with the world's largest cricket viewership, Indian television rights became the most valuable in world cricket, and <strong>the game's centre of gravity shifted to South Asia</strong></li>
        <li>Innovations came from South Asia — the <strong>doosra and reverse swing are Pakistani innovations</strong> that changed bowling techniques globally</li>
      </ul>
    </>),
  },
];

export default function HistoryAndSportTheStoryOfCricket() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="ckt-root">

        {/* HERO */}
        <div className="ckt-hero">
          {[120, 240, 360, 480, 600].map((size, i) => (
            <div key={i} className="ckt-ring" style={{ width:`${size}px`, height:`${size}px`, top:'50%', left:'60%', transform:'translate(-50%,-50%)' }} />
          ))}
          <div className="ckt-hero-bg-num">07</div>
          <div className="ckt-hero-inner">
            <div className="ckt-overline">Class 9 · Social Science · History</div>
            <h1 className="ckt-hero-title">
              History &amp; <em>Sport</em><br />The Story of<br /><span className="seam-em">Cricket</span>
            </h1>
            <div className="ckt-hero-bar">
              {[
                { label:"Subject",  value:"History" },
                { label:"Chapter",  value:"Chapter 7" },
                { label:"Period",   value:"17th C – Present" },
                { label:"Origin",   value:"England" },
                { label:"FAQs",     value:"8 Questions" },
              ].map(({ label, value }) => (
                <div className="ckt-hero-bar-item" key={label}>
                  <div className="ckt-bar-label">{label}</div>
                  <div className="ckt-bar-value">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ckt-body">

          {/* LEAD */}
          <div className="ckt-lead">
            <p>
              Cricket is no ordinary sport. It is the only game where a match can last <strong>five days and still end in a draw</strong>, where the pitch is exactly 22 yards but the ground has no fixed boundary — and where the history of <strong>colonialism, class, race, and commerce</strong> is written in every rule, every record, and every rivalry.
            </p>
            <p>
              This chapter traces cricket from its origins in the commons of rural England to the billion-dollar media spectacle it is today — and how India became its undisputed capital.
            </p>
          </div>

          {/* 1. Origins & Peculiarities */}
          <div className="ckt-sec-head">
            <div className="ckt-sec-num">1</div>
            <div className="ckt-sec-title-wrap">
              <div className="ckt-sec-kicker">500 Years of Cricket</div>
              <h2 className="ckt-sec-title">Origins &amp; <span>Peculiarities</span></h2>
            </div>
          </div>

          <p className="ckt-body-text">
            Cricket grew out of stick and ball games played in England nearly <strong>500 years ago</strong>. By the 17th century it had evolved into a recognizable distinct game. It became so popular that fans did not mind being fined for playing it on Sunday instead of going to church. No other sport carries so many historical oddities built directly into its rules.
          </p>

          {/* Scoreboard-style peculiarities */}
          <div className="ckt-scoreboard">
            <div className="ckt-scoreboard-header">
              <span>Cricket's Unique Peculiarities</span>
              <span className="ckt-scoreboard-title">Why Cricket is Like No Other Sport</span>
            </div>
            {[
              ["Five-Day Draw",        <>A match can go on for <strong>five days and still end in a draw</strong> — no result, no winner. No other major sport in the world has this feature. It comes from cricket's pre-industrial origin when time was not a scarce resource.</>,],
              ["22 Yards — Fixed",     <>The <strong>length of the pitch is specified at exactly 22 yards</strong> — set in the first written laws of 1744. This single measurement has never changed in nearly 300 years of cricket.</>,],
              ["No Fixed Boundary",   <>But the <strong>size or shape of the ground is not specified</strong>. Cricket was played on commons — shared village land — and each common had a different shape. So the rules never standardised the ground.</>,],
              ["No Industrial Tools", <>Unlike every other modern sport, cricket has <strong>refused to remake its tools with industrial or man-made materials</strong>. Bat: still willow. Ball: still leather and cork. Core tools unchanged for centuries.</>,],
              ["Pre-Industrial Rules",<>Cricket rules were made <strong>before the Industrial Revolution</strong> when life moved at a slow pace. No pressure to make the game faster or more commercially driven — it wasn't a product, it was a pastime.</>,],
            ].map(([head, desc], i) => (
              <div className="ckt-score-row" key={i}>
                <div className="ckt-score-num">{i + 1}</div>
                <div className="ckt-score-text"><strong>{head}:</strong> {desc}</div>
              </div>
            ))}
          </div>

          <div className="ckt-divider"><div className="ckt-divider-mark" /></div>

          {/* 2. First Laws of Cricket */}
          <div className="ckt-sec-head">
            <div className="ckt-sec-num">2</div>
            <div className="ckt-sec-title-wrap">
              <div className="ckt-sec-kicker">1744</div>
              <h2 className="ckt-sec-title">The First Written <span>Laws of Cricket</span></h2>
            </div>
          </div>

          <p className="ckt-body-text">
            In <strong>1744</strong>, cricket got its first written laws — formalising what had been an informal game of variable rules. These laws were surprisingly specific about some things and completely silent on others.
          </p>

          <div className="ckt-laws">
            <div className="ckt-laws-tag">The First Written Laws of Cricket — 1744</div>
            <div className="ckt-laws-title">What the Laws Said — and What They Didn't</div>
            <div className="ckt-laws-grid">
              {[
                ["Umpires",        <><strong>Two umpires</strong> chosen from among the gentlemen present — they shall <strong>absolutely decide all disputes</strong></>,],
                ["Stumps",         <><strong>22 inches high</strong> stumps with a <strong>6 inch bail</strong> across them</>,],
                ["Ball",           <>Must be between <strong>5 to 6 ounces</strong> in weight</>,],
                ["Pitch Length",   <>Two sets of stumps <strong>22 yards apart</strong> — the one measurement that has never changed</>,],
                ["Bat Shape",      <><strong>No limits on shape or size of the bat</strong> — a batsman could bring any size bat he wished</>,],
                ["Ground Size",    <><strong>No specification of ground size or shape</strong> — each common had different dimensions</>,],
              ].map(([label, value], i) => (
                <div className="ckt-law-item" key={i}>
                  <div className="ckt-law-label">{label}</div>
                  <div className="ckt-law-value">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="ckt-stat-row">
            {[
              { val:"1744",   label:"First Written Laws" },
              { val:"1760s",  label:"First Cricket Club — Hambledon" },
              { val:"1787",   label:"MCC Founded" },
              { val:"22 yds", label:"Pitch Length — Unchanged Since 1744" },
            ].map(({ val, label }) => (
              <div className="ckt-stat-box" key={label}>
                <div className="ckt-stat-val">{val}</div>
                <div className="ckt-stat-label">{label}</div>
              </div>
            ))}
          </div>

          <div className="ckt-divider"><div className="ckt-divider-mark" /></div>

          {/* 3. Evolution of the Game */}
          <div className="ckt-sec-head">
            <div className="ckt-sec-num">3</div>
            <div className="ckt-sec-title-wrap">
              <div className="ckt-sec-kicker">18th & 19th Century</div>
              <h2 className="ckt-sec-title">How the Game <span>Evolved</span></h2>
            </div>
          </div>

          <p className="ckt-body-text">
            A series of changes transformed cricket in the 2nd half of the 18th century and continued through the 19th. The <strong>MCC, founded in 1787</strong>, became the guardian of cricket's laws — publishing revisions and standardising rules that had been inconsistent across different grounds and regions.
          </p>

          <div className="ckt-changes">
            <div className="ckt-change-col">
              <div className="ckt-change-era">2nd Half of 18th Century</div>
              <ul>
                <li>Became common to <strong>pitch the ball through the air</strong> rather than roll it</li>
                <li><strong>Curved bats replaced by straight ones</strong> — transforming batting technique</li>
                <li>Ball weight limited to <strong>5½ to 5¾ ounces</strong></li>
                <li><strong>Bat width limited to 4 inches</strong> — preventing absurdly wide bats</li>
                <li><strong>Third stump became common</strong> — previously only two stumps were used</li>
                <li>Three days became the <strong>standard length of a major match</strong></li>
                <li>First <strong>six-seam cricket ball</strong> introduced</li>
              </ul>
            </div>
            <div className="ckt-change-col dark">
              <div className="ckt-change-era">19th Century</div>
              <ul>
                <li><strong>Wide ball rule implemented</strong> — penalising bowlers for balls too far wide</li>
                <li><strong>Exact circumference of ball specified</strong></li>
                <li>Protective equipment — <strong>pads and gloves</strong> — became available, influenced by technology</li>
                <li><strong>Boundaries were introduced</strong> — no longer did fielders run after every hit</li>
                <li><strong>Overarm bowling became legal</strong> — the most revolutionary change in bowling</li>
                <li>Cricket matured during the <strong>Industrial Revolution</strong> but remained true to its rural English origins</li>
              </ul>
            </div>
          </div>

          <div className="ckt-divider"><div className="ckt-divider-mark" /></div>

          {/* 4. Class Divide */}
          <div className="ckt-sec-head">
            <div className="ckt-sec-num">4</div>
            <div className="ckt-sec-title-wrap">
              <div className="ckt-sec-kicker">Class & Cricket</div>
              <h2 className="ckt-sec-title">The Game &amp; <span className="navy-txt">English Society</span></h2>
            </div>
          </div>

          <p className="ckt-body-text">
            The organisation of cricket in England <strong>reflected the nature of English society</strong>. Players were divided into two sharply defined categories — and the rules of the game were written to preserve that division.
          </p>

          <div className="ckt-class-divide">
            <div className="ckt-class-col gent">
              <div className="ckt-class-badge">The Upper Class</div>
              <div className="ckt-class-name">Amateurs</div>
              <div className="ckt-class-sub">Called "Gentlemen" · Played for Pleasure</div>
              <ul>
                <li>The <strong>rich who played cricket for pleasure</strong> — not for money</li>
                <li>Playing for money was considered <strong>beneath their social status</strong></li>
                <li>Did most of the <strong>batting</strong> — considered the superior, elegant skill</li>
                <li><strong>Only batsmen (gentlemen) became captains</strong> — the rules were designed to preserve their leadership</li>
                <li>Cricket instilled in them <strong>discipline, hierarchy, and leadership</strong> — the qualities needed to run the empire</li>
              </ul>
            </div>
            <div className="ckt-class-col pro">
              <div className="ckt-class-badge">The Working Class</div>
              <div className="ckt-class-name">Players</div>
              <div className="ckt-class-sub">Called "Players" · Played for Money</div>
              <ul>
                <li>The <strong>professionals who played cricket for their livelihood</strong></li>
                <li>Cricket was not leisure — it was their <strong>source of income</strong></li>
                <li>Did most of the <strong>bowling</strong> — seen as the labour of the working class</li>
                <li><strong>Could never become captains</strong> — regardless of their skill or experience</li>
                <li>Their <strong>social inferiority was built into the rules</strong> — not just convention</li>
              </ul>
            </div>
          </div>

          <div className="ckt-pull-quote">
            <p>"The battle of Waterloo was won on the playing fields of Eton." Cricket and team games were credited with building the discipline, honour, and leadership that built — and ran — the British Empire.</p>
            <cite>— Cricket, Class & the British Empire</cite>
          </div>

          <div className="ckt-divider"><div className="ckt-divider-mark" /></div>

          {/* 5. Spread of Cricket */}
          <div className="ckt-sec-head">
            <div className="ckt-sec-num">5</div>
            <div className="ckt-sec-title-wrap">
              <div className="ckt-sec-kicker">Colonial Game</div>
              <h2 className="ckt-sec-title">The <span>Spread</span> of Cricket</h2>
            </div>
          </div>

          <p className="ckt-body-text">
            Cricket <strong>remained a colonial game</strong> — its colonial nature made it difficult to be accepted by countries outside the British Empire. It was played in colonies either by white settlers or by local elites who wished to copy their white masters. But wherever it spread, cricket took on new meanings.
          </p>

          <div className="ckt-region-strip">
            {[
              { icon:"🏏", name:"England — The Origin", tag:"Mother Country", desc:<>Cricket was born in the commons of rural England. Its rules reflected <strong>English class structure</strong> — Amateurs (gentlemen) vs Players (professionals). The MCC governed the game from Lord's Cricket Ground in London.</> },
              { icon:"🌴", name:"The Caribbean", tag:"Race & Resistance", desc:<>Cricket became a sign of <strong>social and racial status</strong>. Afro-Caribbean people were discouraged from playing. Whites dominated. It was only in <strong>1960 that Frank Worrell, a black player, became the West Indies captain</strong>. Success in cricket became a measure of <strong>racial equality and political progress</strong>.</> },
              { icon:"🇮🇳", name:"India", tag:"Religion & Nationalism", desc:<>Teams organised on <strong>communal and religious lines</strong> — Parsis, Hindus, Muslims, Europeans. The Quadrangular (later Pentangular) tournament divided cricket by community. Yet cricket also <strong>united Indians</strong> — appointing Vitthal, a lower-caste player, as captain was a bold step.</> },
              { icon:"🌍", name:"Why Not Everywhere?", tag:"Colonial Limitation", desc:<>Cricket's <strong>colonial oddness</strong> made it difficult to spread beyond the British Empire. Unlike football, it never became a truly global sport — it remains absent from continental Europe, most of the Americas, and East Asia. It followed the Empire, not humanity.</> },
            ].map(({ icon, name, tag, desc }) => (
              <div className="ckt-region-card" key={name}>
                <div className="ckt-region-icon-col">{icon}</div>
                <div className="ckt-region-body">
                  <div className="ckt-region-name">{name}</div>
                  <div className="ckt-region-tag">{tag}</div>
                  <div className="ckt-region-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="ckt-divider"><div className="ckt-divider-mark" /></div>

          {/* 6. Cricket, Race & Religion in India */}
          <div className="ckt-sec-head">
            <div className="ckt-sec-num">6</div>
            <div className="ckt-sec-title-wrap">
              <div className="ckt-sec-kicker">India — The Communal Story</div>
              <h2 className="ckt-sec-title">Cricket, <span className="red-txt">Race</span> &amp; <span className="cream-txt">Religion</span></h2>
            </div>
          </div>

          <p className="ckt-body-text">
            In India, cricket's history is inseparable from the history of communalism, colonialism, and eventually nationalism. The game that the British brought as a symbol of civilised culture became a battleground of identity.
          </p>

          <div className="ckt-communal">
            <div className="ckt-communal-tag">The Communal Structure of Indian Cricket</div>
            <div className="ckt-communal-head">From the Oriental Cricket Club to the Pentangular</div>
            <div className="ckt-communal-grid">
              {[
                { title:"Calcutta Cricket Club (1792)",  body:<>The <strong>first Indian cricket club</strong> established by the British in Calcutta — in the very year the colonial presence was consolidating.</> },
                { title:"Oriental Cricket Club (1848)",  body:<>The <strong>first Indian-community cricket club</strong> — founded by the <strong>Parsis</strong> in Bombay. The Parsis were the first Indian community to take to cricket, setting a precedent.</> },
                { title:"Hindu & Islam Gymkhanas",       body:<>By the 1890s, the <strong>Hindu Gymkhana and Islam Gymkhana</strong> were established. The <strong>colonial government encouraged communal clubs</strong> — reflecting its divide-and-rule strategy.</> },
                { title:"The Pentangular Tournament",    body:<>Started as the <strong>Quadrangular</strong> (Europeans, Parsis, Hindus, Muslims) and became the <strong>Pentangular</strong> when "the Rest" was added. By the 1930s, <strong>Gandhi condemned it</strong> for dividing India on communal lines.</> },
              ].map(({ title, body }) => (
                <div className="ckt-communal-item" key={title}>
                  <div className="ckt-communal-item-title">{title}</div>
                  <div className="ckt-communal-item-body">{body}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="ckt-def-box">
            <div className="ckt-def-label">Cricket as Unity</div>
            <div className="ckt-def-term">Vitthal — A Bold Step Against Caste</div>
            <div className="ckt-def-text">
              While critics rightly condemned the Pentangular for dividing India on communal lines, cricket also demonstrated its power to <strong>unite</strong>. The Hindu cricket team made a bold, progressive appointment: <strong>Mr. Vitthal, a player from the lower class, was made captain</strong>. In a rigidly hierarchical society, appointing a lower-caste man to lead was a powerful statement — cricket as a vehicle for social change. It was also not until <strong>1932 that India played its first Test match</strong>, with <strong>C.K. Nayudu as its maiden captain</strong> — marking India's arrival on the world cricket stage.
            </div>
          </div>

          <div className="ckt-divider"><div className="ckt-divider-mark" /></div>

          {/* 7. Decolonisation */}
          <div className="ckt-sec-head">
            <div className="ckt-sec-num">7</div>
            <div className="ckt-sec-title-wrap">
              <div className="ckt-sec-kicker">Power Shift</div>
              <h2 className="ckt-sec-title">Decolonisation &amp; <span>Sport</span></h2>
            </div>
          </div>

          <p className="ckt-body-text">
            Decolonisation after World War II did not just change flags and governments — it fundamentally altered the balance of power in world cricket. As former colonies gained independence, they demanded equal voice in how the game was governed.
          </p>

          <div className="ckt-table-wrap">
            <div className="ckt-table-title">How Decolonisation Changed World Cricket</div>
            {[
              ["ICC Name Change",        <>The <strong>Imperial Cricket Conference was renamed the International Cricket Conference</strong> — even the name change symbolised the shift from empire to equality</> ],
              ["South Africa Isolation", <>England, Australia, and New Zealand continued playing with <strong>apartheid South Africa</strong> — a colonial holdover. Political pressure from <strong>Asian and African countries</strong>, combined with liberal British opinion, forced English authorities to <strong>cancel South Africa's 1970 tour</strong></>],
              ["India's First Test (1932)",<>India started playing as an international team with <strong>C.K. Nayudu as maiden captain</strong> — the beginning of India's journey to world domination</>],
              ["Asian Powers Rise",      <>Cricket was dominated until the 1970s by <strong>England and Australia</strong>. The emergence of <strong>India, Pakistan, Sri Lanka, and the West Indies</strong> shifted the balance away from the old white Commonwealth</>],
              ["ICC Moves to Dubai",     <>The ultimate symbol of the power shift: the <strong>ICC headquarters moved from London to Dubai</strong> — acknowledging that the centre of cricket's commercial gravity had permanently shifted to South Asia</>],
            ].map(([k, v]) => (
              <div className="ckt-table-row" key={k}>
                <div className="ckt-table-key">{k}</div>
                <div className="ckt-table-val">{v}</div>
              </div>
            ))}
          </div>

          <div className="ckt-divider"><div className="ckt-divider-mark" /></div>

          {/* 8. Commerce, Media & Modern Cricket */}
          <div className="ckt-sec-head">
            <div className="ckt-sec-num">8</div>
            <div className="ckt-sec-title-wrap">
              <div className="ckt-sec-kicker">1970s – Present</div>
              <h2 className="ckt-sec-title">Commerce, Media &amp; <span>Cricket Today</span></h2>
            </div>
          </div>

          <p className="ckt-body-text">
            The 1970s was the decade in which cricket was <strong>transformed beyond recognition</strong> — from a stately gentleman's game into a global commercial spectacle. Two events in this decade changed everything forever.
          </p>

          <div className="ckt-packer">
            <div className="ckt-packer-tag">1977 — The Revolution</div>
            <div className="ckt-packer-head">Kerry Packer — The Man Who Changed Cricket Forever</div>
            <div className="ckt-packer-body">
              In <strong>1977</strong>, an <strong>Australian television tycoon, Kerry Packer</strong>, saw cricket as a <strong>money-making televised sport</strong> — not a gentleman's pastime. He signed up <strong>51 of the world's leading cricketers</strong> and for almost two years staged unofficial Tests and One-Day Internationals under the name of <strong>World Series Cricket</strong>. He drove home the point that <strong>cricket was a marketable game which could generate huge revenue</strong>. Continuous television coverage <strong>made cricketers celebrities</strong>. It expanded the audience massively — children became cricket fans; cricket reached <strong>smaller towns and villages</strong>. Multinational companies created a <strong>global market for cricket</strong>. This shifted the balance of power in cricket permanently — <strong>India has the largest viewership</strong> for the game and hence the <strong>game's centre of gravity shifted to South Asia</strong>.
            </div>
          </div>

          <div className="ckt-modern-grid">
            <div className="ckt-modern-card m1">
              <div className="ckt-modern-icon">📺</div>
              <div className="ckt-modern-title">Television Revolution</div>
              <div className="ckt-modern-body">Packer's <strong>World Series Cricket (1977)</strong> proved television could make cricketers celebrities and expand audiences to millions who never watched live matches. Changed the game's economics forever.</div>
            </div>
            <div className="ckt-modern-card m2">
              <div className="ckt-modern-icon">🏏</div>
              <div className="ckt-modern-title">One-Day Internationals</div>
              <div className="ckt-modern-body">The <strong>first ODI was played in 1971</strong> (England vs Australia, Melbourne). A faster format that could be broadcast in a single day — perfectly suited to television audiences and commercial sponsors.</div>
            </div>
            <div className="ckt-modern-card m3">
              <div className="ckt-modern-icon">🌏</div>
              <div className="ckt-modern-title">India's Dominance</div>
              <div className="ckt-modern-body">India's massive viewership made it cricket's commercial centre. <strong>ICC HQ moved from London to Dubai</strong>. Innovations like the <strong>doosra and reverse swing</strong> — both Pakistani — changed the game technically.</div>
            </div>
          </div>

          <div className="ckt-pull-quote">
            <p>India has the largest viewership for the game — and hence the game's centre of gravity has shifted permanently to South Asia. The empire's sport is now ruled by the empire's former subjects.</p>
            <cite>— Commerce, Media & Cricket Today</cite>
          </div>

          <div className="ckt-divider"><div className="ckt-divider-mark" /></div>

          {/* FAQ */}
          <div className="ckt-faq-header">
            <span className="ckt-faq-kicker">Exam Preparation</span>
          </div>
          <h2 className="ckt-faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, i) => (
            <div className={`ckt-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="ckt-faq-q" onClick={() => toggle(i)}>
                <span className="ckt-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="ckt-faq-icon">{openIndex === i ? "▴" : "▾"}</span>
              </button>
              <div className={`ckt-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
