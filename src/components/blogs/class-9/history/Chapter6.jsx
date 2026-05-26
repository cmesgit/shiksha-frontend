import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #0c0a08;
    --ink2:       #1c1810;
    --muted:      #7a6e58;
    --paper:      #faf7f2;
    --paper2:     #f0ead8;
    --paper3:     #e4dcc8;
    --sand:       #c8a050;
    --sand2:      #a07830;
    --sand-lt:    #fdf5e4;
    --teal:       #1a6060;
    --teal2:      #104848;
    --teal-lt:    #e0f0f0;
    --earth:      #6e4828;
    --earth2:     #4e3018;
    --green:      #3a6030;
    --green2:     #284820;
    --rule:       #d4c8a8;
    --dusk:       #3a2e50;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .pmw-root {
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
  }

  /* ─── HERO ─── */
  .pmw-hero {
    background: linear-gradient(160deg, #060402 0%, #100c06 50%, #0a0c08 100%);
    min-height: 88vh;
    display: flex; align-items: flex-end;
    position: relative; overflow: hidden;
    padding: 0 0 64px;
  }
  .pmw-hero-bg-num {
    position: absolute; bottom: -40px; right: -20px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(240px, 38vw, 520px); font-weight: 900; line-height: 1;
    color: rgba(255,255,255,0.022); letter-spacing: -0.04em;
    user-select: none; pointer-events: none;
  }
  /* Sand-dusk gradient top rule */
  .pmw-hero::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #6e4828, #c8a050, #e8c870, #c8a050, #6e4828);
  }
  .pmw-ring {
    position: absolute; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.016); pointer-events: none;
  }
  .pmw-hero-inner {
    max-width: 900px; width: 100%;
    margin: 0 auto; padding: 0 32px;
    position: relative; z-index: 1;
  }
  .pmw-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #c8a050; margin-bottom: 24px;
    display: flex; align-items: center; gap: 14px;
  }
  .pmw-overline::before, .pmw-overline::after {
    content: ''; flex: 0 0 40px; height: 1px; background: #c8a050;
  }
  .pmw-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(40px, 7.5vw, 84px); font-weight: 900;
    color: #fff; line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 32px;
  }
  .pmw-hero-title em        { font-style: normal; color: #c8a050; }
  .pmw-hero-title .teal-em  { color: #4acaca; }
  .pmw-hero-title .earth-em { color: #c87840; }
  .pmw-hero-bar {
    display: flex; flex-wrap: wrap; gap: 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 24px; margin-top: 8px;
  }
  .pmw-hero-bar-item {
    flex: 1 1 150px; padding: 0 24px 0 0;
    border-right: 1px solid rgba(255,255,255,0.1); margin-right: 24px;
  }
  .pmw-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .pmw-bar-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.35); margin-bottom: 5px;
  }
  .pmw-bar-value {
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600;
    color: rgba(255,255,255,0.75);
  }

  /* ─── BODY ─── */
  .pmw-body { max-width: 860px; margin: 0 auto; padding: 72px 32px 96px; }

  /* LEAD */
  .pmw-lead {
    border-left: 5px solid var(--sand);
    padding: 28px 36px; margin-bottom: 64px; background: var(--paper2);
  }
  .pmw-lead p {
    font-family: 'Poppins', sans-serif; font-size: 19px; font-weight: 500;
    color: var(--ink2); line-height: 1.78; margin: 0 0 14px;
  }
  .pmw-lead p:last-child { margin: 0; }
  .pmw-lead strong { color: var(--sand2); }

  /* SECTION HEADER */
  .pmw-sec-head {
    display: flex; align-items: flex-start; gap: 20px;
    margin-bottom: 28px; border-bottom: 2px solid var(--rule); padding-bottom: 18px;
  }
  .pmw-sec-num {
    font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900;
    color: var(--rule); line-height: 1; flex-shrink: 0; margin-top: 4px;
  }
  .pmw-sec-title-wrap { display: flex; flex-direction: column; justify-content: flex-end; }
  .pmw-sec-kicker {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--sand); margin-bottom: 4px;
  }
  .pmw-sec-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(22px, 3.5vw, 32px); font-weight: 900;
    color: var(--ink); line-height: 1.15; letter-spacing: -0.01em;
  }
  .pmw-sec-title span       { color: var(--sand); }
  .pmw-sec-title .teal-txt  { color: var(--teal); }
  .pmw-sec-title .earth-txt { color: var(--earth); }
  .pmw-sec-title .green-txt { color: var(--green); }
  .pmw-sec-title .red-txt   { color: #8b1a1a; }

  /* BODY TEXT */
  .pmw-body-text {
    font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 400;
    color: #1c1810; line-height: 1.82; margin-bottom: 24px;
  }
  .pmw-body-text strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── COMMUNITY PROFILE CARDS (horizontal strip) ── */
  .pmw-community-strip { margin-bottom: 48px; }
  .pmw-community-card {
    display: grid; grid-template-columns: 72px 1fr;
    gap: 0; margin-bottom: 2px; background: var(--rule);
  }
  .pmw-community-card:last-child { margin-bottom: 0; }
  .pmw-comm-icon-col {
    background: var(--sand); display: flex; align-items: center; justify-content: center;
    font-size: 28px;
  }
  .pmw-community-card:nth-child(2) .pmw-comm-icon-col { background: var(--earth); }
  .pmw-community-card:nth-child(3) .pmw-comm-icon-col { background: var(--teal); }
  .pmw-community-card:nth-child(4) .pmw-comm-icon-col { background: var(--green); }
  .pmw-community-card:nth-child(5) .pmw-comm-icon-col { background: var(--dusk); }
  .pmw-community-card:nth-child(6) .pmw-comm-icon-col { background: var(--sand2); }
  .pmw-comm-body { background: var(--paper); padding: 18px 24px; }
  .pmw-comm-name {
    font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 900;
    color: var(--ink); margin-bottom: 2px; letter-spacing: -0.01em;
  }
  .pmw-comm-region {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.16em; color: var(--sand); margin-bottom: 8px;
  }
  .pmw-community-card:nth-child(2) .pmw-comm-region { color: var(--earth); }
  .pmw-community-card:nth-child(3) .pmw-comm-region { color: var(--teal); }
  .pmw-community-card:nth-child(4) .pmw-comm-region { color: var(--green); }
  .pmw-community-card:nth-child(5) .pmw-comm-region { color: var(--dusk); }
  .pmw-community-card:nth-child(6) .pmw-comm-region { color: var(--sand2); }
  .pmw-comm-desc {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: #2a2010; line-height: 1.68;
  }
  .pmw-comm-desc strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ink); }

  /* ── MIGRATION FLOW — horizontal arrow layout ── */
  .pmw-migration {
    background: var(--ink); padding: 32px 36px; margin-bottom: 48px;
    border-top: 4px solid var(--sand);
  }
  .pmw-migration-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 14px;
  }
  .pmw-migration-title {
    font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900;
    color: #c8a050; margin-bottom: 24px;
  }
  .pmw-flow {
    display: grid; grid-template-columns: 1fr 40px 1fr;
    gap: 0; align-items: center; margin-bottom: 16px;
  }
  .pmw-flow-box {
    background: rgba(255,255,255,0.07); padding: 16px 18px; text-align: center;
  }
  .pmw-flow-season {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.16em; color: rgba(255,255,255,0.4); margin-bottom: 6px;
  }
  .pmw-flow-place {
    font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 900;
    color: #fff; margin-bottom: 4px;
  }
  .pmw-flow-detail {
    font-family: 'Inter', sans-serif; font-size: 13px;
    color: rgba(255,255,255,0.6); line-height: 1.5;
  }
  .pmw-flow-arrow {
    text-align: center; font-size: 20px; color: #c8a050;
  }
  .pmw-flow-who {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 600;
    color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.12em;
    margin-top: 8px; text-align: center; grid-column: 1 / -1;
  }

  /* ── SKILLS OF PASTORAL LIFE — icon grid ── */
  .pmw-skills-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 2px; background: var(--rule); margin-bottom: 48px;
  }
  .pmw-skill-card { background: var(--paper2); padding: 24px 24px; }
  .pmw-skill-icon { font-size: 32px; margin-bottom: 12px; }
  .pmw-skill-title {
    font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 900;
    color: var(--ink); margin-bottom: 8px;
  }
  .pmw-skill-body {
    font-family: 'Inter', sans-serif; font-size: 15px; color: #2a2010; line-height: 1.72;
  }
  .pmw-skill-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--sand2); }

  /* ── COLONIAL IMPACT — cause-effect horizontal band ── */
  .pmw-colonial-band {
    background: var(--earth); padding: 32px 36px; margin-bottom: 48px;
    position: relative; overflow: hidden;
  }
  .pmw-colonial-band::before {
    content: '⛓'; position: absolute; right: 20px; top: 10px;
    font-size: 140px; line-height: 1; pointer-events: none; opacity: 0.08;
  }
  .pmw-colonial-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.5); margin-bottom: 10px;
  }
  .pmw-colonial-head {
    font-family: 'Montserrat', sans-serif; font-size: clamp(18px,2.8vw,26px); font-weight: 900;
    color: #fff; margin-bottom: 14px; position: relative; z-index: 1;
  }
  .pmw-colonial-body {
    font-family: 'Inter', sans-serif; font-size: 16px;
    color: rgba(255,255,255,0.88); line-height: 1.78; position: relative; z-index: 1;
  }
  .pmw-colonial-body strong { color: #fff; font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── 4-BOX CAUSE GRID ── */
  .pmw-cause-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 2px; background: var(--rule); margin-bottom: 32px;
  }
  .pmw-cause-box { background: var(--paper); padding: 22px 22px; }
  .pmw-cause-box.dark { background: var(--ink2); }
  .pmw-cause-num {
    font-family: 'Montserrat', sans-serif; font-size: 36px; font-weight: 900;
    line-height: 1; margin-bottom: 8px; color: var(--rule);
  }
  .pmw-cause-box.dark .pmw-cause-num { color: rgba(255,255,255,0.1); }
  .pmw-cause-title {
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.14em; margin-bottom: 10px;
    color: var(--sand);
  }
  .pmw-cause-box.dark .pmw-cause-title { color: #c8a050; }
  .pmw-cause-desc {
    font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.7;
    color: #2a2010;
  }
  .pmw-cause-box.dark .pmw-cause-desc { color: rgba(255,255,255,0.68); }
  .pmw-cause-desc strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--earth); }
  .pmw-cause-box.dark .pmw-cause-desc strong { color: #f0c070; }

  /* ── EFFECTS STRIP — horizontal 5 boxes ── */
  .pmw-effects-strip {
    display: flex; flex-wrap: wrap; gap: 2px;
    background: var(--rule); margin-bottom: 48px;
  }
  .pmw-effect-box { flex: 1 1 120px; background: var(--paper3); padding: 20px 16px; text-align: center; }
  .pmw-effect-icon { font-size: 24px; margin-bottom: 8px; }
  .pmw-effect-label {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700;
    color: var(--earth2); text-transform: uppercase; letter-spacing: 0.1em; line-height: 1.4;
  }

  /* ── COPING TABLE ── */
  .pmw-coping {
    margin-bottom: 48px; background: var(--rule); display: grid;
    grid-template-columns: 1fr 1fr; gap: 2px;
  }
  .pmw-cope-card { background: var(--paper2); padding: 22px 22px; }
  .pmw-cope-card.teal { background: var(--teal); }
  .pmw-cope-icon { font-size: 26px; margin-bottom: 8px; }
  .pmw-cope-title {
    font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 900;
    color: var(--ink); margin-bottom: 8px;
  }
  .pmw-cope-card.teal .pmw-cope-title { color: #fff; }
  .pmw-cope-body {
    font-family: 'Inter', sans-serif; font-size: 14px; color: #2a2010; line-height: 1.7;
  }
  .pmw-cope-card.teal .pmw-cope-body { color: rgba(255,255,255,0.78); }
  .pmw-cope-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--teal); }
  .pmw-cope-card.teal .pmw-cope-body strong { color: #fff; }

  /* ── AFRICA — FULL-WIDTH DARK BLOCK ── */
  .pmw-africa {
    background: var(--teal); padding: 36px 36px 28px; margin-bottom: 48px;
    border-top: 4px solid var(--sand);
  }
  .pmw-africa-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.22em; color: rgba(255,255,255,0.4); margin-bottom: 14px;
  }
  .pmw-africa-head {
    font-family: 'Montserrat', sans-serif; font-size: clamp(18px,2.8vw,26px); font-weight: 900;
    color: #e8c840; margin-bottom: 18px;
  }
  .pmw-africa-stats {
    display: flex; flex-wrap: wrap; gap: 2px; background: rgba(0,0,0,0.2); margin-bottom: 20px;
  }
  .pmw-africa-stat { flex: 1 1 120px; background: rgba(255,255,255,0.07); padding: 16px 14px; text-align: center; }
  .pmw-africa-stat-val {
    font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900;
    color: #e8c840; margin-bottom: 4px;
  }
  .pmw-africa-stat-lbl {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.5); line-height: 1.4;
  }
  .pmw-africa-body {
    font-family: 'Inter', sans-serif; font-size: 15px;
    color: rgba(255,255,255,0.72); line-height: 1.78;
  }
  .pmw-africa-body strong { color: #fff; font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── MAASAI SOCIETY — 2-col contrast ── */
  .pmw-maasai-society {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0; background: var(--rule); margin-bottom: 48px;
  }
  .pmw-maasai-col { background: var(--paper2); padding: 28px 26px; }
  .pmw-maasai-col.dark { background: var(--dusk); border-left: 1px solid rgba(255,255,255,0.06); }
  .pmw-maasai-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.18em; margin-bottom: 14px;
  }
  .pmw-maasai-col:not(.dark) .pmw-maasai-label { color: var(--sand2); }
  .pmw-maasai-col.dark       .pmw-maasai-label { color: rgba(255,255,255,0.45); }
  .pmw-maasai-col ul { padding-left: 18px; margin: 0; }
  .pmw-maasai-col ul li { font-size: 15px; line-height: 1.74; margin-bottom: 9px; }
  .pmw-maasai-col:not(.dark) ul li { color: var(--ink2); }
  .pmw-maasai-col.dark       ul li { color: rgba(255,255,255,0.72); }
  .pmw-maasai-col ul li strong { font-family: 'Poppins', sans-serif; font-weight: 700; }
  .pmw-maasai-col:not(.dark) ul li strong { color: var(--ink); }
  .pmw-maasai-col.dark       ul li strong { color: #fff; }

  /* ── MAASAI CHANGES ── */
  .pmw-maasai-changes {
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    gap: 2px; background: var(--rule); margin-bottom: 48px;
  }
  .pmw-maasai-chg { background: var(--paper); padding: 22px 20px; }
  .pmw-maasai-chg.red { background: #6b1a1a; }
  .pmw-maasai-chg.amber { background: var(--earth2); }
  .pmw-maasai-chg-icon { font-size: 26px; margin-bottom: 10px; }
  .pmw-maasai-chg-title {
    font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 900;
    margin-bottom: 8px;
  }
  .pmw-maasai-chg:not(.red):not(.amber) .pmw-maasai-chg-title { color: var(--ink); }
  .pmw-maasai-chg.red   .pmw-maasai-chg-title { color: #fff; }
  .pmw-maasai-chg.amber .pmw-maasai-chg-title { color: #fff; }
  .pmw-maasai-chg-body {
    font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.7;
  }
  .pmw-maasai-chg:not(.red):not(.amber) .pmw-maasai-chg-body { color: #2a2010; }
  .pmw-maasai-chg.red   .pmw-maasai-chg-body { color: rgba(255,255,255,0.78); }
  .pmw-maasai-chg.amber .pmw-maasai-chg-body { color: rgba(255,255,255,0.78); }
  .pmw-maasai-chg-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; }
  .pmw-maasai-chg:not(.red):not(.amber) .pmw-maasai-chg-body strong { color: #8b1a1a; }
  .pmw-maasai-chg.red   .pmw-maasai-chg-body strong { color: #fff; }
  .pmw-maasai-chg.amber .pmw-maasai-chg-body strong { color: #f0c070; }

  /* ── INFO TABLE ── */
  .pmw-table-wrap { margin-bottom: 48px; border: 1px solid var(--rule); }
  .pmw-table-title {
    background: var(--ink); padding: 14px 24px;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    color: #c8a050; letter-spacing: 0.06em; text-transform: uppercase;
  }
  .pmw-table-row {
    display: grid; grid-template-columns: 180px 1fr;
    border-bottom: 1px solid var(--rule);
  }
  .pmw-table-row:last-child { border-bottom: none; }
  .pmw-table-key {
    background: var(--paper2); padding: 14px 18px;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    color: var(--sand2); border-right: 1px solid var(--rule);
    display: flex; align-items: center;
  }
  .pmw-table-val {
    padding: 14px 18px;
    font-family: 'Inter', sans-serif; font-size: 15px; line-height: 1.65; color: #374151;
  }
  .pmw-table-val strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── BULLET LIST ── */
  .pmw-list { margin: 0 0 28px; padding: 0; list-style: none; }
  .pmw-list li {
    font-size: 16px; line-height: 1.78; color: #1c1810;
    padding: 10px 0 10px 28px; position: relative;
    border-bottom: 1px solid var(--rule);
  }
  .pmw-list li:first-child { border-top: 1px solid var(--rule); }
  .pmw-list li::before {
    content: ''; position: absolute; left: 0; top: 18px;
    width: 10px; height: 10px;
    border: 2px solid var(--sand); transform: rotate(45deg);
  }
  .pmw-list li strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── PULL QUOTE ── */
  .pmw-pull-quote {
    margin: 40px 0; padding: 32px 40px;
    background: var(--ink); position: relative;
  }
  .pmw-pull-quote::before {
    content: '"'; position: absolute; top: -18px; left: 28px;
    font-family: 'Montserrat', sans-serif; font-size: 120px; font-weight: 900;
    color: var(--sand); line-height: 1;
  }
  .pmw-pull-quote p {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(17px,2.4vw,22px); font-weight: 800;
    color: #fff; line-height: 1.45; letter-spacing: -0.01em;
    position: relative; z-index: 1; margin-bottom: 12px;
  }
  .pmw-pull-quote cite {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600;
    color: #c8a050; text-transform: uppercase; letter-spacing: 0.12em; font-style: normal;
  }

  /* ── SECTION DIVIDER ── */
  .pmw-divider { display: flex; align-items: center; gap: 16px; margin: 56px 0; }
  .pmw-divider::before, .pmw-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .pmw-divider-mark { width: 10px; height: 10px; background: var(--sand); transform: rotate(45deg); flex-shrink: 0; }

  /* ── FAQ ── */
  .pmw-faq-header {
    border-bottom: 3px solid var(--ink); padding-bottom: 14px; margin-bottom: 0;
    display: flex; align-items: baseline; gap: 16px;
  }
  .pmw-faq-kicker {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--sand);
  }
  .pmw-faq-title {
    font-family: 'Montserrat', sans-serif; font-size: clamp(24px,4vw,34px); font-weight: 900;
    color: var(--ink); letter-spacing: -0.01em; margin: 20px 0 32px;
  }
  .pmw-faq-item { border-bottom: 1px solid var(--rule); overflow: hidden; }
  .pmw-faq-item.open { background: var(--paper2); }
  .pmw-faq-q {
    width: 100%; text-align: left; background: none; border: none; cursor: pointer;
    padding: 20px 0; display: grid; grid-template-columns: 1fr 32px;
    gap: 16px; align-items: start;
  }
  .pmw-faq-q-text {
    font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 600;
    color: var(--ink); line-height: 1.5; text-align: left; padding-left: 4px;
  }
  .pmw-faq-item.open .pmw-faq-q-text { color: var(--sand2); }
  .pmw-faq-icon {
    width: 28px; height: 28px; border: 1.5px solid var(--rule);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; color: var(--sand); flex-shrink: 0; margin-top: 2px;
  }
  .pmw-faq-item.open .pmw-faq-icon { background: var(--ink); border-color: var(--ink); color: #c8a050; }
  .pmw-faq-ans {
    display: none; padding: 0 4px 22px;
    font-size: 16px; line-height: 1.82; color: #374151;
  }
  .pmw-faq-ans.visible { display: block; }
  .pmw-faq-ans ul { padding-left: 20px; margin: 8px 0; }
  .pmw-faq-ans ul li { margin-bottom: 7px; }
  .pmw-faq-ans strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }
  .pmw-faq-ans p { margin: 0 0 10px; }
  .pmw-faq-ans p:last-child { margin: 0; }

  @media (max-width: 620px) {
    .pmw-hero           { min-height: auto; padding: 80px 0 48px; }
    .pmw-cause-grid     { grid-template-columns: 1fr; }
    .pmw-skills-grid    { grid-template-columns: 1fr; }
    .pmw-coping         { grid-template-columns: 1fr; }
    .pmw-maasai-society { grid-template-columns: 1fr; }
    .pmw-maasai-changes { grid-template-columns: 1fr; }
    .pmw-community-card { grid-template-columns: 56px 1fr; }
    .pmw-flow           { grid-template-columns: 1fr 28px 1fr; }
    .pmw-table-row      { grid-template-columns: 120px 1fr; }
  }
`;

const faqs = [
  {
    q: "What is nomadism? Who are the pastoral nomads of India's mountains?",
    a: (<>
      <p>Nomadism is the practice of moving from place to place rather than living in a fixed settlement — a way of life perfected over thousands of years by pastoral communities who followed their herds to wherever pastures were available. India has several distinct mountain pastoral communities:</p>
      <ul>
        <li><strong>Gujjar Bakarwals of Jammu and Kashmir:</strong> Pastoral nomads who move in groups called <em>Kafila</em>. Their movements are governed by cold and snow. In winters, when the high mountains are covered with snow, they move down to the low hills of the <strong>Shiwalik range</strong>. On the onset of summer, when snow melts and mountains become lush and green, they move back up to the mountains</li>
        <li><strong>Gaddi Shepherds of Himachal Pradesh:</strong> A similar cycle — they spend winter on the low Shiwalik hills and summers in <strong>Lahul and Spiti</strong></li>
        <li><strong>Gujjar cattle herders of Kumaon and Garhwal:</strong> They spend summers in the <em>bugyals</em> (high altitude meadows) and winters in the <em>bhabar</em> (forested foothills)</li>
        <li><strong>Bhotias, Sherpas, and Kinnauris:</strong> Follow the same cyclic movement which helps them <strong>adjust to seasonal changes and make best use of pastures</strong> at different altitudes throughout the year</li>
      </ul>
    </>),
  },
  {
    q: "Who are the pastoral communities of India's plateaus, plains and deserts?",
    a: (<>
      <p>India's flat and semi-arid regions also have rich pastoral traditions — communities whose seasonal movements followed rainfall, crop cycles, and pasture availability:</p>
      <ul>
        <li><strong>Dhangars of Maharashtra:</strong> Stay in the central plateau of Maharashtra during the monsoon — a semi-arid region. By October they begin moving towards <strong>Konkan</strong>. Here their cattle manure the fields and they are <strong>welcomed by the Konkani peasants</strong>. As soon as monsoon sets in, they retreat back to Maharashtra's semi-arid lands</li>
        <li><strong>Gollas</strong> (cattle herders) and <strong>Kurumas and Kurubas</strong> (sheep and goat herders) from Karnataka and Andhra — they live near the woods and in dry periods move to <strong>coastal tracts</strong></li>
        <li><strong>Banjaras</strong> of Uttar Pradesh, Punjab, Rajasthan, Madhya Pradesh, and Maharashtra — move to different places in search of <strong>good pastures</strong></li>
        <li><strong>Raikas of Rajasthan:</strong> Combine <strong>cultivation with pastoralism</strong>. When their grazing grounds become dry, they move to new and greener pastures</li>
      </ul>
    </>),
  },
  {
    q: "What skills sustained pastoral life? How did pastoralists manage their complex migrations?",
    a: (<>
      <p>Pastoral nomadism required extraordinary knowledge, planning, and social skills — it was far from random wandering. Pastoral life was sustained by:</p>
      <ul>
        <li><strong>Sense of judgement about timing:</strong> Knowing exactly <strong>how long one must stay in an area</strong> — long enough to use the pasture adequately but not so long as to destroy it</li>
        <li><strong>Knowledge of resources:</strong> To know precisely <strong>where they could find food and water</strong> — knowledge accumulated over generations about seasonal water sources, pasture quality, and route conditions</li>
        <li><strong>Timing calculations:</strong> The ability to <strong>assess and calculate the timings of movement</strong> — leaving before snow arrives, arriving after monsoon rains have greened the pastures</li>
        <li><strong>Relationships with farmers:</strong> The ability to <strong>set up relationships with farmers</strong> so that herds could graze on the harvested fields. This was mutually beneficial — herds fertilised the fields while pastoralists got access to crop residue as fodder</li>
        <li>This intricate knowledge system made nomadism not a primitive survival strategy but a <strong>sophisticated adaptation</strong> to the ecological rhythms of different landscapes</li>
      </ul>
    </>),
  },
  {
    q: "How did colonial rule change the lives of pastoralists in India?",
    a: (<>
      <p>Under colonial rule, the life of pastoralists changed completely — in every dimension. The colonial administration systematically dismantled the conditions that had made pastoral nomadism viable for centuries:</p>
      <ul>
        <li><strong>Grazing grounds became less:</strong> Colonial administration saw pastoral land as <strong>waste land that needed to be cultivated</strong>. In most areas, the grazing tracts used regularly by pastoralists were taken for cultivation — permanently removing their seasonal pastures</li>
        <li><strong>Movements were regulated:</strong> Forest Acts marked forests as <strong>Reserved and Protected</strong>, completely restricting the movement of pastoralists. The forests that had provided dry-season grazing were suddenly off-limits</li>
        <li><strong>Criminal Tribes Act 1871:</strong> The British distrusted mobile craftsmen, traders, and pastoralists. They preferred settled populations for control. The <strong>1871 Criminal Tribes Act classified many communities of craftsmen, traders, and pastoralists as criminal tribes</strong> — criminalising the very act of moving</li>
        <li><strong>Revenues increased:</strong> More taxes were imposed to increase revenue. <strong>Taxes on cattle went up rapidly</strong> — pastoralists suffered heavily as their income did not keep pace</li>
        <li><strong>Trade and crafts declined:</strong> Access to forests and markets was restricted; the <strong>trade, crafts, and agricultural produce of pastoral communities declined</strong> as their mobility was curtailed</li>
      </ul>
      <p><strong>Effects of these colonial changes:</strong></p>
      <ul>
        <li>Natural restoration of pastoral growth stopped</li>
        <li>Quality of pastures declined from overuse</li>
        <li>Intensive overgrazing as herds were forced onto smaller areas</li>
        <li>Serious shortage of pastures</li>
        <li>Cattle died due to scarcity of fodder</li>
      </ul>
    </>),
  },
  {
    q: "How did pastoralists cope with the changes brought by colonial rule?",
    a: (<>
      <p>Pastoral communities did not simply collapse under colonial pressure — they adapted, though often at great cost to their traditional way of life:</p>
      <ul>
        <li><strong>Reduced cattle numbers:</strong> Some reduced the number of cattle in their herds — accepting smaller livelihoods in exchange for being able to continue some pastoral activity within the restricted space available</li>
        <li><strong>Discovered new pastures:</strong> Some communities found and opened up new pasture routes — adapting their centuries-old migration patterns to navigate around reserved forests and cultivated land</li>
        <li><strong>Settled down:</strong> Some pastoral families bought land and began to lead a settled life — permanently giving up nomadism for agriculture</li>
        <li><strong>Became labourers:</strong> The most desperate outcome — some poor pastoralists borrowed money to survive. In due course of time they <strong>lost their cattle and sheep and became labourers</strong> — the complete destruction of their pastoral identity and independence</li>
        <li>These coping strategies show that pastoral communities were resilient and resourceful — but the systematic colonial destruction of their way of life meant that for many, there was no truly good option available</li>
      </ul>
    </>),
  },
  {
    q: "What is the situation of pastoralists in Africa? Who are the Maasai?",
    a: (<>
      <p>Africa has one of the world's largest pastoral traditions — even today, 22 million Africans depend on some form of pastoral activity for their livelihood. Major communities include the <strong>Bedouins, Berbers, Maasai, Somali, Boran, and Turkana</strong>.</p>
      <p>The <strong>Maasai</strong> cattle herders live primarily in East Africa and are one of the best-known pastoral communities in the world:</p>
      <ul>
        <li>Rules, laws, and regulations have <strong>changed their way of life</strong> dramatically — the most prominent problem being the <strong>continuous loss of grazing grounds</strong></li>
        <li><strong>Scramble for Africa:</strong> European powers divided Africa into colonies in the late 19th century — carving up territories with no regard for existing pastoral routes and traditions</li>
        <li><strong>Best grazing grounds taken over:</strong> White European settlers took over the best grazing lands, pushing Maasai onto marginal areas</li>
        <li><strong>Grazing grounds converted:</strong> Lands were turned into <strong>cultivated farms, national parks, and game reserves</strong> — all closed to Maasai herders</li>
        <li><strong>Confined to special reserves:</strong> Maasai were restricted to special reserves and could not move without <strong>special permits</strong>. They were not allowed to enter markets in white areas</li>
        <li>The <strong>Kaokoland herders</strong> faced a similar fate — confined to arid, marginal lands as the best pastures were taken</li>
        <li><strong>The logic of nomadism destroyed:</strong> Pastoralists are nomadic specifically to <strong>survive bad times like drought</strong> — by moving to greener pastures. When they could no longer move, their cattle died of starvation</li>
      </ul>
    </>),
  },
  {
    q: "What was the traditional social structure of the Maasai? How did colonial rule change it?",
    a: (<>
      <p>The Maasai had a distinct, well-organised social structure before colonial rule — which colonialism significantly disrupted:</p>
      <p><strong>Traditional Maasai Society:</strong></p>
      <ul>
        <li><strong>Elders:</strong> The ruling group — they decided the affairs of the community and settled disputes. Wisdom and age gave them authority</li>
        <li><strong>Warriors:</strong> Young men who carried out <strong>cattle raids</strong> (a traditional practice of accumulating wealth) and defended the community from threats</li>
      </ul>
      <p><strong>Changes brought by colonial rule:</strong></p>
      <ul>
        <li>The <strong>British appointed chiefs</strong> to administer the affairs of the tribe — imposing a new power structure that bypassed the traditional elder council</li>
        <li>These appointed chiefs were <strong>wealthy individuals with both pastoral and non-pastoral income</strong> — they lived settled lives and accumulated wealth under colonial patronage</li>
        <li><strong>Poor pastoralists</strong> went through bad times and worked as labourers — their poverty deepening as grazing lands shrank</li>
        <li>Two fundamental social changes resulted:
          <ul>
            <li>The <strong>traditional difference between elders and warriors was disturbed</strong> — the age-based authority system broke down</li>
            <li>A <strong>marked difference between the rich and poor emerged</strong> — something that had not existed in the same way in the more egalitarian traditional structure</li>
          </ul>
        </li>
      </ul>
    </>),
  },
  {
    q: "What are the new developments in pastoral societies? Is nomadism still relevant today?",
    a: (<>
      <p>Despite centuries of pressure from colonial policies and post-independence development, pastoral communities have shown remarkable resilience — and their way of life is gaining new recognition:</p>
      <ul>
        <li><strong>Restrictions strain existing pastures:</strong> With increasing restrictions on their mobility, pastoralists find it difficult to move in search of new pastures. This strains existing pastures through overgrazing, causing pastures to deteriorate. Conditions like drought worsen the situation dramatically</li>
        <li><strong>Active adaptation:</strong> Pastoralists are not passive victims — they actively adapt to new times by:
          <ul>
            <li>Finding new pastures and opening new routes</li>
            <li>Changing routes for annual movement</li>
            <li>Reducing their cattle numbers</li>
            <li>Pressing for their rights through political and legal channels</li>
          </ul>
        </li>
        <li><strong>Modern recognition of nomadism's value:</strong> It is being advocated today that <strong>pastoral nomadism is the best form of life suited to dry, semi-arid, and mountainous regions of the world</strong> — precisely the regions where settled agriculture fails</li>
        <li>Nomadism allows <strong>sustainable use of marginal lands</strong> that cannot support settled farming — by moving herds, pastoralists prevent overgrazing and allow natural restoration</li>
        <li>Climate change is making this recognition even more urgent — as droughts become more frequent, the nomadic strategy of mobility may be the only truly sustainable response in many regions</li>
      </ul>
    </>),
  },
];

export default function PastoralistsInTheModernWorld() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="pmw-root">

        {/* HERO */}
        <div className="pmw-hero">
          {[120, 240, 360, 480, 600].map((size, i) => (
            <div key={i} className="pmw-ring" style={{ width:`${size}px`, height:`${size}px`, top:'50%', left:'58%', transform:'translate(-50%,-50%)' }} />
          ))}
          <div className="pmw-hero-bg-num">05</div>
          <div className="pmw-hero-inner">
            <div className="pmw-overline">Class 9 · Social Science · History</div>
            <h1 className="pmw-hero-title">
              <em>Pastoralists</em><br />in the <span className="earth-em">Modern</span><br /><span className="teal-em">World</span>
            </h1>
            <div className="pmw-hero-bar">
              {[
                { label:"Subject",  value:"History" },
                { label:"Chapter",  value:"Chapter 5" },
                { label:"Period",   value:"19th–20th Century" },
                { label:"Regions",  value:"India & Africa" },
                { label:"FAQs",     value:"8 Questions" },
              ].map(({ label, value }) => (
                <div className="pmw-hero-bar-item" key={label}>
                  <div className="pmw-bar-label">{label}</div>
                  <div className="pmw-bar-value">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pmw-body">

          {/* LEAD */}
          <div className="pmw-lead">
            <p>
              Long before modern states drew borders and forest departments marked trees, pastoral nomads had already worked out the most efficient way to survive in some of the world's harshest landscapes: <strong>keep moving</strong>. Follow the rains. Follow the pastures. Follow the seasons.
            </p>
            <p>
              This chapter traces how <strong>colonial rule systematically destroyed this way of life</strong> in India and Africa — and how pastoral communities fought back, adapted, and continue to survive even today.
            </p>
          </div>

          {/* 1. Mountain Nomads */}
          <div className="pmw-sec-head">
            <div className="pmw-sec-num">1</div>
            <div className="pmw-sec-title-wrap">
              <div className="pmw-sec-kicker">The Mountain Nomads of India</div>
              <h2 className="pmw-sec-title">Nomadism as a <span>Way of Life</span></h2>
            </div>
          </div>

          <p className="pmw-body-text">
            India's mountain pastoral communities have practised seasonal migration for centuries — moving with precise timing between high altitude summer pastures and low-lying winter grazing grounds, their entire lives governed by the rhythm of snow and sun.
          </p>

          {/* Migration Flow — Gujjar Bakarwals */}
          <div className="pmw-migration">
            <div className="pmw-migration-label">Seasonal Migration Pattern</div>
            <div className="pmw-migration-title">Gujjar Bakarwals of Jammu & Kashmir — The Kafila</div>
            <div className="pmw-flow">
              <div className="pmw-flow-box">
                <div className="pmw-flow-season">Winter</div>
                <div className="pmw-flow-place">Shiwalik Hills</div>
                <div className="pmw-flow-detail">Low foothills — warm enough for cattle and goats when mountains are snow-covered</div>
              </div>
              <div className="pmw-flow-arrow">⇄</div>
              <div className="pmw-flow-box">
                <div className="pmw-flow-season">Summer</div>
                <div className="pmw-flow-place">High Mountains</div>
                <div className="pmw-flow-detail">Lush green mountain pastures — accessible once snow melts in warmer months</div>
              </div>
              <div className="pmw-flow-who">Move in groups called Kafila · governed by cold and snow</div>
            </div>

            <div className="pmw-migration-title" style={{fontSize:'16px', marginTop:'20px'}}>Gaddi Shepherds of Himachal Pradesh</div>
            <div className="pmw-flow">
              <div className="pmw-flow-box">
                <div className="pmw-flow-season">Winter</div>
                <div className="pmw-flow-place">Shiwalik Hills</div>
                <div className="pmw-flow-detail">Low altitude grazing — same winter pattern as the Gujjar Bakarwals</div>
              </div>
              <div className="pmw-flow-arrow">⇄</div>
              <div className="pmw-flow-box">
                <div className="pmw-flow-season">Summer</div>
                <div className="pmw-flow-place">Lahul & Spiti</div>
                <div className="pmw-flow-detail">High altitude valleys — green and accessible only in summer months</div>
              </div>
              <div className="pmw-flow-who">Gujjar cattle herders of Kumaon & Garhwal: summers in bugyals · winters in bhabar</div>
            </div>
          </div>

          <div className="pmw-divider"><div className="pmw-divider-mark" /></div>

          {/* 2. Plains & Desert Communities */}
          <div className="pmw-sec-head">
            <div className="pmw-sec-num">2</div>
            <div className="pmw-sec-title-wrap">
              <div className="pmw-sec-kicker">Plateaus, Plains & Deserts</div>
              <h2 className="pmw-sec-title">Pastoral Communities of <span>India</span></h2>
            </div>
          </div>

          <p className="pmw-body-text">
            India's flat and semi-arid regions have equally rich pastoral traditions — communities whose seasonal movements followed rainfall patterns, crop cycles, and the availability of pasture across very different landscapes from the mountains.
          </p>

          <div className="pmw-community-strip">
            {[
              { icon:"🐑", name:"Dhangars", region:"Maharashtra — Central Plateau & Konkan", desc:<>Stay in the <strong>central plateau</strong> during monsoon. By October they move to <strong>Konkan</strong> where their cattle manure the fields — making them <strong>welcome guests of Konkani farmers</strong>. They retreat back as monsoon arrives.</> },
              { icon:"🐄", name:"Gollas", region:"Karnataka & Andhra Pradesh", desc:<>Cattle herders who live <strong>near the woods</strong>. In dry periods they move to the <strong>coastal tracts</strong> where water and pasture are available year-round.</> },
              { icon:"🐐", name:"Kurumas & Kurubas", region:"Karnataka & Andhra Pradesh", desc:<>Sheep and goat herders — also live near the woods and <strong>move to coastal tracts in dry periods</strong>. Their livestock are better suited to drier, rougher terrain.</> },
              { icon:"🚶", name:"Banjaras", region:"UP, Punjab, Rajasthan, MP & Maharashtra", desc:<>Move to <strong>different places in search of good pastures</strong>. One of India's most widespread pastoral communities — their routes cross multiple states and seasons.</> },
              { icon:"🌵", name:"Raikas", region:"Rajasthan", desc:<>Uniquely combine <strong>cultivation with pastoralism</strong>. When their grazing grounds become dry, they move to <strong>new and greener pastures</strong> — blending farming and herding into one flexible livelihood.</> },
            ].map(({ icon, name, region, desc }) => (
              <div className="pmw-community-card" key={name}>
                <div className="pmw-comm-icon-col">{icon}</div>
                <div className="pmw-comm-body">
                  <div className="pmw-comm-name">{name}</div>
                  <div className="pmw-comm-region">{region}</div>
                  <div className="pmw-comm-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pmw-divider"><div className="pmw-divider-mark" /></div>

          {/* 3. Skills of Pastoral Life */}
          <div className="pmw-sec-head">
            <div className="pmw-sec-num">3</div>
            <div className="pmw-sec-title-wrap">
              <div className="pmw-sec-kicker">The Knowledge Behind the Migration</div>
              <h2 className="pmw-sec-title">Skills that <span>Sustained</span> Pastoral Life</h2>
            </div>
          </div>

          <p className="pmw-body-text">
            Nomadism was never random wandering. It required deep ecological knowledge, sophisticated planning, and strong social relationships — skills accumulated and refined across generations. Pastoral life was sustained by four core competencies:
          </p>

          <div className="pmw-skills-grid">
            <div className="pmw-skill-card">
              <div className="pmw-skill-icon">⏱️</div>
              <div className="pmw-skill-title">Judging How Long to Stay</div>
              <div className="pmw-skill-body">The sense of judgement to know <strong>exactly how long one must stay in an area</strong> — long enough to use the pasture well but not so long as to overgraze and destroy it. Leave too early, waste the pasture. Stay too late, destroy it.</div>
            </div>
            <div className="pmw-skill-card">
              <div className="pmw-skill-icon">🗺️</div>
              <div className="pmw-skill-title">Knowing Where to Find Resources</div>
              <div className="pmw-skill-body">To know precisely <strong>where they could find food and water</strong> — seasonal water sources, pasture quality, salt licks, emergency routes. This was encyclopedic geographical knowledge built up over many generations of movement.</div>
            </div>
            <div className="pmw-skill-card">
              <div className="pmw-skill-icon">📅</div>
              <div className="pmw-skill-title">Calculating Movement Timing</div>
              <div className="pmw-skill-body">The ability to <strong>assess and calculate the timings of their movement</strong> — leaving before the snow arrives, arriving after rains have greened the pastures. A miscalculation could mean losing the entire herd.</div>
            </div>
            <div className="pmw-skill-card">
              <div className="pmw-skill-icon">🤝</div>
              <div className="pmw-skill-title">Building Relationships with Farmers</div>
              <div className="pmw-skill-body">The ability to <strong>set up relationships with farmers</strong> so herds could graze on harvested fields. Mutual benefit: herds fertilised the fields, farmers provided access to crop residue as fodder. Social diplomacy as survival strategy.</div>
            </div>
          </div>

          <div className="pmw-pull-quote">
            <p>Pastoral nomadism was not primitive wandering — it was the most sophisticated ecological adaptation possible for living in landscapes where rainfall and pasture were scattered and seasonal.</p>
            <cite>— Nomadism as a Way of Life</cite>
          </div>

          <div className="pmw-divider"><div className="pmw-divider-mark" /></div>

          {/* 4. Colonial Changes */}
          <div className="pmw-sec-head">
            <div className="pmw-sec-num">4</div>
            <div className="pmw-sec-title-wrap">
              <div className="pmw-sec-kicker">British India</div>
              <h2 className="pmw-sec-title">Changes in Pastoral Life Due to <span className="earth-txt">Colonial Rule</span></h2>
            </div>
          </div>

          <p className="pmw-body-text">
            Under colonial rule the life of the pastoralists changed completely. Four colonial policies combined to systematically dismantle the conditions that had made nomadic pastoralism viable for centuries.
          </p>

          <div className="pmw-colonial-band">
            <div className="pmw-colonial-tag">The Colonial Assault — Four Simultaneous Attacks</div>
            <div className="pmw-colonial-head">How the British Destroyed Pastoral Life</div>
            <div className="pmw-colonial-body">
              Colonial administration saw pastoral land as <strong>waste land that needed to be cultivated</strong>. In most areas, the grazing tracts used regularly by pastoralists were <strong>taken for cultivation</strong>. Forests demarcated as Protected and Reserved <strong>completely restricted the movement of pastoralists</strong>. The British distrusted mobile craftsmen and traders — they preferred settled populations for proper control. The <strong>1871 Criminal Tribes Act classified many communities of craftsmen, traders, and pastoralists as criminal tribes</strong>. And <strong>more taxes were imposed</strong> — taxes on cattle went up rapidly. Pastoralists suffered heavily from all four changes simultaneously — their grazing grounds, their freedom of movement, their legal status, and their income were all attacked at once.
            </div>
          </div>

          <div className="pmw-cause-grid">
            <div className="pmw-cause-box">
              <div className="pmw-cause-num">01</div>
              <div className="pmw-cause-title">Grazing Lands Taken</div>
              <div className="pmw-cause-desc">All grazing land became <strong>cultivated farms</strong>. Colonial administration treated pastoral land as "waste" to be improved. The very ground pastoralists had used for generations was legally transferred to settled farming.</div>
            </div>
            <div className="pmw-cause-box dark">
              <div className="pmw-cause-num">02</div>
              <div className="pmw-cause-title">Forest Acts Restricted Movement</div>
              <div className="pmw-cause-desc">Forests were marked as <strong>Reserved and Protected</strong> — completely restricting pastoral movement into the forests that had always provided dry-season grazing. Some customary rights were granted, but the damage was severe.</div>
            </div>
            <div className="pmw-cause-box dark">
              <div className="pmw-cause-num">03</div>
              <div className="pmw-cause-title">Criminal Tribes Act 1871</div>
              <div className="pmw-cause-desc">British officials were suspicious of pastoral groups. The <strong>Criminal Tribes Act (1871) labelled nomadic communities as criminal by birth</strong> — making mobility itself a criminal act and subjecting these communities to constant police surveillance.</div>
            </div>
            <div className="pmw-cause-box">
              <div className="pmw-cause-num">04</div>
              <div className="pmw-cause-title">Taxes on Cattle Rose</div>
              <div className="pmw-cause-desc"><strong>Taxes imposed on cattle went up rapidly</strong>. To collect these taxes, colonial governments introduced a Pass system — pastoralists had to get permits to move, and tax collectors followed them on their routes.</div>
            </div>
          </div>

          {/* Effects strip */}
          <p className="pmw-body-text" style={{marginTop:'8px'}}>These four changes combined to produce devastating ecological and economic effects:</p>
          <div className="pmw-effects-strip">
            {[
              { icon:"🌱", label:"Natural Restoration of Pastoral Growth Stopped" },
              { icon:"📉", label:"Quality of Pastures Declined" },
              { icon:"🐄", label:"Intensive Overgrazing on Remaining Land" },
              { icon:"⚠️", label:"Serious Shortage of Pastures" },
              { icon:"💀", label:"Cattle Died Due to Scarcity of Fodder" },
            ].map(({ icon, label }) => (
              <div className="pmw-effect-box" key={label}>
                <div className="pmw-effect-icon">{icon}</div>
                <div className="pmw-effect-label">{label}</div>
              </div>
            ))}
          </div>

          <div className="pmw-divider"><div className="pmw-divider-mark" /></div>

          {/* 5. Coping with Changes */}
          <div className="pmw-sec-head">
            <div className="pmw-sec-num">5</div>
            <div className="pmw-sec-title-wrap">
              <div className="pmw-sec-kicker">Resilience & Adaptation</div>
              <h2 className="pmw-sec-title">Coping with <span>Changes</span></h2>
            </div>
          </div>

          <p className="pmw-body-text">
            Pastoral communities did not simply collapse. They adapted in different ways — some preserving more of their traditional life than others.
          </p>

          <div className="pmw-coping">
            <div className="pmw-cope-card">
              <div className="pmw-cope-icon">📉</div>
              <div className="pmw-cope-title">Reduced Cattle Numbers</div>
              <div className="pmw-cope-body">Some reduced the number of cattle in their herds — accepting a <strong>smaller livelihood</strong> in exchange for being able to continue some pastoral activity within the now-restricted space available to them.</div>
            </div>
            <div className="pmw-cope-card">
              <div className="pmw-cope-icon">🗺️</div>
              <div className="pmw-cope-title">Discovered New Pastures</div>
              <div className="pmw-cope-body">Some communities <strong>found new pasture routes</strong> — adapting centuries-old migration patterns to navigate around reserved forests and newly cultivated land. Nomadic flexibility as survival.</div>
            </div>
            <div className="pmw-cope-card teal">
              <div className="pmw-cope-icon">🏡</div>
              <div className="pmw-cope-title">Settled Down</div>
              <div className="pmw-cope-body">Some pastoral families <strong>bought land and began to lead a settled life</strong> — permanently giving up nomadism for agriculture. A fundamental identity change, trading freedom of movement for security of tenure.</div>
            </div>
            <div className="pmw-cope-card">
              <div className="pmw-cope-icon">⚒️</div>
              <div className="pmw-cope-title">Became Labourers</div>
              <div className="pmw-cope-body">The most tragic outcome — some poor pastoralists borrowed money to survive. In due course they <strong>lost their cattle and sheep and became labourers</strong>. The complete destruction of pastoral identity and independence.</div>
            </div>
          </div>

          <div className="pmw-divider"><div className="pmw-divider-mark" /></div>

          {/* 6. Pastoralism in Africa */}
          <div className="pmw-sec-head">
            <div className="pmw-sec-num">6</div>
            <div className="pmw-sec-title-wrap">
              <div className="pmw-sec-kicker">East Africa</div>
              <h2 className="pmw-sec-title">Pastoralism in <span className="teal-txt">Africa</span></h2>
            </div>
          </div>

          <p className="pmw-body-text">
            Africa has one of the world's largest and most diverse pastoral traditions. The same colonial logic that destroyed Indian pastoral life was applied across the African continent — with equally devastating results.
          </p>

          <div className="pmw-africa">
            <div className="pmw-africa-tag">Africa — The Scale of Pastoral Life</div>
            <div className="pmw-africa-head">22 Million Africans Still Depend on Pastoral Activity Today</div>
            <div className="pmw-africa-stats">
              {[
                { val:"22M+", lbl:"Africans Dependent on Pastoralism" },
                { val:"1770", lbl:"Kalangs Rebellion in Java" },
                { val:"1871", lbl:"Criminal Tribes Act India" },
                { val:"East\nAfrica", lbl:"Primary Maasai Territory" },
              ].map(({ val, lbl }) => (
                <div className="pmw-africa-stat" key={lbl}>
                  <div className="pmw-africa-stat-val" style={{whiteSpace:'pre-line'}}>{val}</div>
                  <div className="pmw-africa-stat-lbl" style={{whiteSpace:'pre-line'}}>{lbl}</div>
                </div>
              ))}
            </div>
            <div className="pmw-africa-body">
              Major pastoral communities of Africa include the <strong>Bedouins, Berbers, Maasai, Somali, Boran, and Turkana</strong>. The most prominent loss faced by all these communities has been the <strong>continuous loss of grazing grounds</strong> — through the European scramble for territorial possessions in Africa, the division of the region into different colonies, the takeover of best grazing grounds by white settlements, and the conversion of grazing grounds to cultivated land, <strong>national parks and game reserves</strong>. Communities like the <strong>Kaokoland herders</strong> faced a fate similar to the Maasai — pushed onto marginal, arid land as the best pastures were fenced off for others.
            </div>
          </div>

          <div className="pmw-divider"><div className="pmw-divider-mark" /></div>

          {/* 7. The Maasai */}
          <div className="pmw-sec-head">
            <div className="pmw-sec-num">7</div>
            <div className="pmw-sec-title-wrap">
              <div className="pmw-sec-kicker">East Africa</div>
              <h2 className="pmw-sec-title">The <span>Maasai</span> — Changes in Their Way of Life</h2>
            </div>
          </div>

          <p className="pmw-body-text">
            The Maasai cattle herders of East Africa had a well-structured, functioning society before European colonialism arrived. Colonial rule not only took their land — it restructured their entire social order.
          </p>

          <div className="pmw-maasai-society">
            <div className="pmw-maasai-col">
              <div className="pmw-maasai-label">Traditional Maasai Society</div>
              <ul>
                <li><strong>Elders</strong> — the ruling group who decided the affairs of the community and settled disputes. Authority based on age and wisdom</li>
                <li><strong>Warriors</strong> — young men who carried out <strong>cattle raids</strong> and defended the community from threats. Cattle raids were a traditional way of accumulating wealth</li>
                <li>Society was relatively equal — the traditional social hierarchy was based on <strong>age and function</strong>, not wealth</li>
                <li>Nomadism allowed the community to collectively respond to drought and crisis — no one group was trapped while others escaped</li>
              </ul>
            </div>
            <div className="pmw-maasai-col dark">
              <div className="pmw-maasai-label">After Colonial Rule</div>
              <ul>
                <li>The <strong>British appointed chiefs</strong> to administer tribal affairs — bypassing the traditional elder council entirely</li>
                <li>These appointed chiefs were <strong>wealthy individuals with pastoral and non-pastoral income</strong> — living settled lives under colonial patronage</li>
                <li><strong>Poor pastoralists</strong> went through bad times and became labourers — serving the very colonial system that had stripped them of land</li>
                <li>Traditional difference between <strong>elders and warriors was disturbed</strong> — the age-authority system broke down under the new colonial hierarchy</li>
                <li>A <strong>marked difference between rich and poor emerged</strong> — inequality within the community deepened dramatically</li>
              </ul>
            </div>
          </div>

          <div className="pmw-maasai-changes">
            <div className="pmw-maasai-chg">
              <div className="pmw-maasai-chg-icon">🏛️</div>
              <div className="pmw-maasai-chg-title">Confined to Reserves</div>
              <div className="pmw-maasai-chg-body">Maasai were restricted to <strong>special reserves</strong> and could not move without special permits. Nomadism — the foundation of their survival — became illegal.</div>
            </div>
            <div className="pmw-maasai-chg red">
              <div className="pmw-maasai-chg-icon">🚫</div>
              <div className="pmw-maasai-chg-title">Banned from Markets</div>
              <div className="pmw-maasai-chg-body">Maasai were <strong>not allowed to enter markets in white areas</strong>. Trade activities were adversely affected — cutting them off from the commercial economy entirely.</div>
            </div>
            <div className="pmw-maasai-chg amber">
              <div className="pmw-maasai-chg-icon">🐂</div>
              <div className="pmw-maasai-chg-title">Cattle Died of Starvation</div>
              <div className="pmw-maasai-chg-body">Pastoralists are nomadic specifically to <strong>survive droughts by moving</strong>. Once they could not shift to greener pastures, their cattle <strong>died of starvation</strong> — the entire logic of nomadism was destroyed.</div>
            </div>
          </div>

          <div className="pmw-divider"><div className="pmw-divider-mark" /></div>

          {/* 8. Developments in Pastoral Societies */}
          <div className="pmw-sec-head">
            <div className="pmw-sec-num">8</div>
            <div className="pmw-sec-title-wrap">
              <div className="pmw-sec-kicker">The Way Forward</div>
              <h2 className="pmw-sec-title">Developments Within <span className="green-txt">Pastoral Societies</span></h2>
            </div>
          </div>

          <p className="pmw-body-text">
            Despite centuries of pressure, pastoral communities have not disappeared. They have adapted, pressed for rights, and are gaining new recognition for the sustainability of their way of life.
          </p>

          <div className="pmw-table-wrap">
            <div className="pmw-table-title">How Pastoral Communities Are Adapting Today</div>
            {[
              ["Finding New Pastures",     <>Communities <strong>actively seek and open new pasture areas</strong> — adapting their traditional migration routes to navigate around restrictions, reserved forests, and new settlements.</>],
              ["Changing Routes",          <>Many communities have <strong>changed their annual migration routes</strong> in response to new restrictions — travelling longer or different paths to reach pastures that remain accessible.</>],
              ["Reducing Cattle Numbers",  <>To match reduced pasture availability, communities <strong>reduce herd sizes</strong> — accepting smaller incomes in exchange for being able to continue some pastoral activity.</>],
              ["Pressing for Rights",      <>Pastoral communities are increasingly <strong>organising politically</strong> to press for their rights — demanding legal access to traditional pastures, recognition of their routes, and removal of restrictive laws.</>],
              ["Modern Recognition",       <>It is being advocated today that <strong>pastoral nomadism is the best form of life suited to dry, semi-arid, and mountainous regions</strong> — precisely the landscapes where settled farming fails and nomadism thrives.</>],
              ["Overgrazing Problem",      <>With increasing restrictions on mobility, existing pastures are <strong>strained by overgrazing</strong>. Pastures deteriorate. Drought conditions worsen the situation — showing why mobility is ecologically essential, not optional.</>],
            ].map(([k, v]) => (
              <div className="pmw-table-row" key={k}>
                <div className="pmw-table-key">{k}</div>
                <div className="pmw-table-val">{v}</div>
              </div>
            ))}
          </div>

          <div className="pmw-pull-quote">
            <p>Pastoral nomadism is today recognised as the best form of life suited to dry, semi-arid, and mountainous regions — the very regions where settled agriculture fails and mobility means survival.</p>
            <cite>— Developments in Pastoral Societies</cite>
          </div>

          <div className="pmw-divider"><div className="pmw-divider-mark" /></div>

          {/* FAQ */}
          <div className="pmw-faq-header">
            <span className="pmw-faq-kicker">Exam Preparation</span>
          </div>
          <h2 className="pmw-faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, i) => (
            <div className={`pmw-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="pmw-faq-q" onClick={() => toggle(i)}>
                <span className="pmw-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="pmw-faq-icon">{openIndex === i ? "▴" : "▾"}</span>
              </button>
              <div className={`pmw-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
