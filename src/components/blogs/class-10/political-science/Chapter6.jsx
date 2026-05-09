import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --od-emerald:   #064e3b;
    --od-emerald2:  #022c22;
    --od-emerald3:  #065f46;
    --od-emerald4:  #047857;
    --od-lime:      #a3e635;
    --od-lime2:     #84cc16;
    --od-lime3:     #4d7c0f;
    --od-lime-lt:   #f7fee7;
    --od-lime-md:   #d9f99d;
    --od-cream:     #fafaf5;
    --od-cream2:    #f2f2eb;
    --od-cream3:    #e8e8de;
    --od-ink:       #0f1209;
    --od-ink2:      #1a2010;
    --od-muted:     #6b7560;
    --od-rule:      #d8ddd0;
    --od-red:       #dc2626;
    --od-red-lt:    #fef2f2;
    --od-amber:     #d97706;
    --od-amber-lt:  #fffbeb;
    --od-sky:       #0369a1;
    --od-sky-lt:    #eff6ff;
    --od-white:     #ffffff;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .od-root {
    font-family: 'Inter', sans-serif;
    background: var(--od-cream);
    color: var(--od-ink);
    min-height: 100vh;
  }

  /* HERO */
  .od-hero {
    background: var(--od-emerald2);
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    position: relative; overflow: hidden;
  }
  .od-hero::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 5px;
    background: linear-gradient(90deg, var(--od-lime3), var(--od-lime), #d9f99d, var(--od-lime), var(--od-lime3));
  }
  .od-hero-ghost {
    position: absolute; right: -20px; bottom: -40px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(220px, 36vw, 480px); font-weight: 900; line-height: 1;
    color: rgba(163,230,53,0.06); letter-spacing: -0.06em;
    pointer-events: none; user-select: none;
  }
  .od-hero-mesh {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(163,230,53,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(163,230,53,0.04) 1px, transparent 1px);
    background-size: 52px 52px;
    pointer-events: none;
  }
  .od-hero-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 28px 52px 0; position: relative; z-index: 2;
  }
  .od-nav-brand {
    font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 900;
    letter-spacing: 0.28em; text-transform: uppercase;
    color: rgba(255,255,255,0.25);
  }
  .od-nav-pill {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--od-lime); border: 1px solid rgba(163,230,53,0.35);
    padding: 5px 14px; background: rgba(163,230,53,0.07);
  }
  .od-hero-center {
    display: flex; flex-direction: column; justify-content: center;
    padding: 40px 52px 0; position: relative; z-index: 2;
  }
  .od-hero-eyebrow {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.26em; text-transform: uppercase;
    color: var(--od-lime); margin-bottom: 22px;
    display: flex; align-items: center; gap: 12px;
  }
  .od-hero-eyebrow::before {
    content: ''; width: 28px; height: 2px; background: var(--od-lime); flex-shrink: 0;
  }
  .od-hero-h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(38px, 7.5vw, 96px);
    font-weight: 900; line-height: 0.92;
    letter-spacing: -0.04em; color: #fff;
    margin-bottom: 32px;
  }
  .od-hero-h1 span { color: var(--od-lime); }
  .od-hero-deck {
    font-family: 'Inter', sans-serif; font-size: 17px; line-height: 1.74;
    color: rgba(255,255,255,0.46); max-width: 560px; margin-bottom: 48px;
    border-left: 3px solid rgba(163,230,53,0.4); padding-left: 20px;
  }
  .od-hero-deck strong { color: rgba(255,255,255,0.78); font-weight: 500; }
  .od-hero-stats {
    display: grid; grid-template-columns: repeat(4,1fr);
    border-top: 1px solid rgba(255,255,255,0.07);
  }
  .od-hero-stat {
    padding: 22px 24px;
    border-right: 1px solid rgba(255,255,255,0.06);
  }
  .od-hero-stat:last-child { border-right: none; }
  .od-hstat-val {
    font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900;
    color: var(--od-lime); line-height: 1; margin-bottom: 5px;
    letter-spacing: -0.02em;
  }
  .od-hstat-label {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: rgba(255,255,255,0.28);
  }
  .od-hero-bottom {
    padding: 16px 52px;
    display: flex; align-items: center; flex-wrap: wrap; gap: 0;
    border-top: 1px solid rgba(255,255,255,0.05);
    position: relative; z-index: 2;
  }
  .od-hbtm-item {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: rgba(255,255,255,0.20); white-space: nowrap;
    padding: 4px 18px 4px 0; margin-right: 18px;
    border-right: 1px solid rgba(255,255,255,0.08);
  }
  .od-hbtm-item:last-child { border-right: none; }

  /* BODY */
  .od-body { max-width: 960px; margin: 0 auto; padding: 80px 32px 100px; }

  /* SECTION MARKER */
  .od-sec {
    display: flex; align-items: center; gap: 0;
    margin-bottom: 36px;
    border-top: 3px solid var(--od-emerald);
    padding-top: 12px;
  }
  .od-sec-badge {
    font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 900;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--od-white); background: var(--od-emerald);
    padding: 5px 12px; margin-right: 16px; flex-shrink: 0;
  }
  .od-sec-title {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--od-muted); flex: 1;
  }
  .od-sec-note {
    font-family: 'Inter', sans-serif; font-size: 12px;
    color: var(--od-muted); font-style: italic;
  }

  /* H2 */
  .od-h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(24px, 3.5vw, 40px); font-weight: 900;
    line-height: 1.05; letter-spacing: -0.025em;
    color: var(--od-ink); margin-bottom: 20px;
  }
  .od-h2 em { font-style: normal; color: var(--od-emerald3); }

  /* PROSE */
  .od-prose {
    font-family: 'Inter', sans-serif; font-size: 17px;
    color: var(--od-ink2); line-height: 1.82; margin-bottom: 24px;
  }
  .od-prose strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--od-ink); }

  /* DIVIDER */
  .od-div {
    display: flex; align-items: center; gap: 16px; margin: 56px 0;
  }
  .od-div::before, .od-div::after {
    content: ''; flex: 1; height: 1px; background: var(--od-rule);
  }
  .od-div-mark {
    width: 8px; height: 8px; background: var(--od-lime2);
    clip-path: polygon(50% 0,100% 50%,50% 100%,0 50%);
    flex-shrink: 0;
  }

  /* DEFINITION BANNER */
  .od-def {
    background: var(--od-emerald); padding: 40px 44px; margin-bottom: 40px;
    position: relative; overflow: hidden;
  }
  .od-def::after {
    content: '✓'; position: absolute; right: 20px; bottom: -20px;
    font-size: 180px; line-height: 1;
    color: rgba(163,230,53,0.07); pointer-events: none;
  }
  .od-def-tag {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--od-lime); margin-bottom: 14px;
  }
  .od-def-text {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(17px, 2.4vw, 22px); font-weight: 800;
    color: #fff; line-height: 1.46;
    position: relative; z-index: 1; margin-bottom: 24px;
  }
  .od-def-text em { font-style: normal; color: var(--od-lime); }
  .od-def-chips {
    display: flex; flex-wrap: wrap; gap: 8px;
    position: relative; z-index: 1;
  }
  .od-def-chip {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600;
    color: rgba(255,255,255,0.7); background: rgba(163,230,53,0.12);
    border: 1px solid rgba(163,230,53,0.25);
    padding: 5px 14px;
    display: flex; align-items: center; gap: 8px;
  }
  .od-def-chip-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--od-lime); flex-shrink: 0;
  }

  /* 3 PILLARS */
  .od-pillars {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 0; margin-bottom: 40px;
    border: 1px solid var(--od-rule); overflow: hidden;
  }
  .od-pillar {
    padding: 28px 24px; background: var(--od-white);
    border-right: 1px solid var(--od-rule);
  }
  .od-pillar:last-child { border-right: none; }
  .od-pillar-top {
    display: flex; align-items: flex-start; justify-content: space-between;
    margin-bottom: 14px;
  }
  .od-pillar-icon { font-size: 28px; }
  .od-pillar-n {
    font-family: 'Montserrat', sans-serif; font-size: 36px; font-weight: 900;
    color: var(--od-cream3); letter-spacing: -0.03em; line-height: 1;
  }
  .od-pillar-title {
    font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 900;
    color: var(--od-ink); margin-bottom: 8px; letter-spacing: -0.01em;
    border-bottom: 2px solid var(--od-lime2); padding-bottom: 8px;
  }
  .od-pillar-body {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: var(--od-muted); line-height: 1.66;
  }
  .od-pillar-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--od-ink2); }

  /* DASHBOARD 2x2 */
  .od-dashboard {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0; margin-bottom: 40px;
    border: 1px solid var(--od-rule); overflow: hidden;
  }
  .od-dash-card {
    padding: 28px 28px; background: var(--od-white);
    border-right: 1px solid var(--od-rule);
    border-bottom: 1px solid var(--od-rule);
    display: flex; flex-direction: column;
  }
  .od-dash-card:nth-child(2n) { border-right: none; }
  .od-dash-card:nth-last-child(-n+2) { border-bottom: none; }
  .od-dash-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    margin-bottom: 12px;
  }
  .od-dash-icon { font-size: 26px; }
  .od-dash-status {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    padding: 3px 10px;
  }
  .od-dash-status.pass  { background: var(--od-lime-lt); color: var(--od-lime3); }
  .od-dash-status.mixed { background: var(--od-amber-lt); color: var(--od-amber); }
  .od-dash-status.warn  { background: var(--od-red-lt); color: var(--od-red); }
  .od-dash-status.good  { background: var(--od-sky-lt); color: var(--od-sky); }
  .od-dash-title {
    font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 900;
    color: var(--od-ink); margin-bottom: 10px; letter-spacing: -0.01em;
    line-height: 1.2;
  }
  .od-dash-body {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: var(--od-muted); line-height: 1.66; flex: 1;
  }
  .od-dash-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--od-ink2); }
  .od-dash-foot {
    margin-top: 14px; padding: 8px 12px;
    font-family: 'Inter', sans-serif; font-size: 13px;
    color: var(--od-muted); font-style: italic;
    border-left: 3px solid var(--od-rule);
  }

  /* COMPARE TABLE */
  .od-compare {
    margin-bottom: 40px; overflow: hidden;
    border: 1px solid var(--od-rule);
  }
  .od-compare-header {
    display: grid; grid-template-columns: 2fr 1fr 1fr;
    background: var(--od-emerald2); padding: 12px 20px; gap: 10px;
  }
  .od-compare-header div {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
  }
  .od-compare-header div:first-child { color: rgba(255,255,255,0.45); }
  .od-compare-header div:nth-child(2) { color: var(--od-lime); text-align: center; }
  .od-compare-header div:nth-child(3) { color: #fca5a5; text-align: center; }
  .od-compare-row {
    display: grid; grid-template-columns: 2fr 1fr 1fr;
    padding: 13px 20px; gap: 10px; align-items: center;
    border-bottom: 1px solid var(--od-rule);
    background: var(--od-white);
  }
  .od-compare-row:last-child { border-bottom: none; }
  .od-compare-row:nth-child(even) { background: var(--od-cream); }
  .od-compare-label {
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600;
    color: var(--od-ink2);
  }
  .od-compare-dem {
    font-family: 'Inter', sans-serif; font-size: 13px;
    color: var(--od-emerald3); font-weight: 500; text-align: center;
  }
  .od-compare-dict {
    font-family: 'Inter', sans-serif; font-size: 13px;
    color: var(--od-red); font-weight: 500; text-align: center;
  }

  /* PULL QUOTE */
  .od-pull {
    background: var(--od-emerald); padding: 44px 48px; margin-bottom: 40px;
    position: relative; overflow: hidden;
  }
  .od-pull::before {
    content: '"'; position: absolute; left: 14px; top: -10px;
    font-family: 'Georgia', serif; font-size: 160px; line-height: 1;
    color: rgba(163,230,53,0.1); pointer-events: none;
  }
  .od-pull-q {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(17px, 2.4vw, 22px); font-weight: 900;
    color: #fff; line-height: 1.42; margin-bottom: 14px;
    position: relative; z-index: 1;
  }
  .od-pull-q em { font-style: normal; color: var(--od-lime); }
  .od-pull-attr {
    font-family: 'Inter', sans-serif; font-size: 13px;
    color: rgba(255,255,255,0.38);
  }

  /* ALERT */
  .od-alert {
    padding: 16px 22px; margin-bottom: 22px;
    display: flex; gap: 14px; align-items: flex-start;
  }
  .od-alert.lime   { background: var(--od-lime-lt);  border-left: 4px solid var(--od-lime2); }
  .od-alert.amber  { background: var(--od-amber-lt); border-left: 4px solid var(--od-amber); }
  .od-alert.red    { background: var(--od-red-lt);   border-left: 4px solid var(--od-red); }
  .od-alert.sky    { background: var(--od-sky-lt);   border-left: 4px solid var(--od-sky); }
  .od-alert-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
  .od-alert-text {
    font-family: 'Inter', sans-serif; font-size: 15px;
    color: var(--od-ink2); line-height: 1.66;
  }
  .od-alert-text strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--od-ink); }

  /* DIGNITY GRID */
  .od-dignity {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 12px; margin-bottom: 40px;
  }
  .od-dignity-card {
    padding: 26px 24px; border: 1px solid var(--od-rule);
    background: var(--od-white);
  }
  .od-dignity-card:nth-child(1) { border-top: 4px solid var(--od-lime2); }
  .od-dignity-card:nth-child(2) { border-top: 4px solid var(--od-emerald3); }
  .od-dignity-card:nth-child(3) { border-top: 4px solid var(--od-amber); }
  .od-dignity-card:nth-child(4) { border-top: 4px solid var(--od-sky); }
  .od-dignity-icon { font-size: 26px; margin-bottom: 10px; }
  .od-dignity-title {
    font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 900;
    color: var(--od-ink); margin-bottom: 8px; letter-spacing: -0.01em;
  }
  .od-dignity-body {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: var(--od-muted); line-height: 1.66;
  }
  .od-dignity-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--od-ink2); }

  /* FAQ */
  .od-faq-header {
    display: flex; align-items: stretch; gap: 0; margin-bottom: 16px;
  }
  .od-faq-acc { width: 5px; background: var(--od-lime2); flex-shrink: 0; }
  .od-faq-header-inner {
    flex: 1; background: var(--od-lime-lt);
    border: 1px solid var(--od-lime-md); border-left: none;
    padding: 12px 22px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .od-faq-tag {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase; color: var(--od-lime3);
  }
  .od-faq-sub {
    font-family: 'Inter', sans-serif; font-size: 12px; color: var(--od-muted);
  }
  .od-faq-h2 {
    font-family: 'Montserrat', sans-serif; font-size: 32px; font-weight: 900;
    color: var(--od-ink); letter-spacing: -0.025em; margin-bottom: 24px;
  }
  .od-faq-item { border-bottom: 1px solid var(--od-rule); }
  .od-faq-item:first-of-type { border-top: 1px solid var(--od-rule); }
  .od-faq-item.open {
    border-left: 4px solid var(--od-lime2); margin-left: -4px;
    background: var(--od-lime-lt);
  }
  .od-faq-q {
    width: 100%; display: flex; justify-content: space-between;
    align-items: flex-start; gap: 20px;
    padding: 18px 0; background: none; border: none; cursor: pointer; text-align: left;
  }
  .od-faq-item.open .od-faq-q { padding-left: 14px; }
  .od-faq-q-text {
    font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600;
    color: var(--od-ink2); line-height: 1.45; flex: 1;
  }
  .od-faq-item.open .od-faq-q-text { color: var(--od-lime3); }
  .od-faq-icon { font-size: 18px; color: var(--od-lime2); flex-shrink: 0; margin-top: 2px; }
  .od-faq-ans { max-height: 0; overflow: hidden; transition: max-height 0.34s ease; }
  .od-faq-ans.open { max-height: 1000px; }
  .od-faq-ans-inner {
    padding: 2px 0 22px 14px;
    font-family: 'Inter', sans-serif; font-size: 15px;
    color: var(--od-muted); line-height: 1.80;
  }
  .od-faq-ans-inner strong { color: var(--od-ink2); font-family: 'Poppins', sans-serif; font-weight: 600; }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .od-hero-nav, .od-hero-center, .od-hero-bottom { padding-left: 28px; padding-right: 28px; }
    .od-hero-stats { grid-template-columns: 1fr 1fr; }
    .od-hero-stat:nth-child(2) { border-right: none; }
    .od-hero-stat:nth-child(3) { border-top: 1px solid rgba(255,255,255,0.06); }
    .od-pillars { grid-template-columns: 1fr; }
    .od-pillar { border-right: none; border-bottom: 1px solid var(--od-rule); }
    .od-pillar:last-child { border-bottom: none; }
  }
  @media (max-width: 640px) {
    .od-hero { min-height: auto; }
    .od-hero-nav { padding: 18px 18px 0; flex-direction: column; align-items: flex-start; gap: 10px; }
    .od-hero-center { padding: 28px 18px 0; }
    .od-hero-h1 { font-size: clamp(34px, 10vw, 60px); margin-bottom: 22px; }
    .od-hero-deck { font-size: 15px; max-width: 100%; margin-bottom: 28px; }
    .od-hero-bottom { padding: 12px 18px; }
    .od-hbtm-item { font-size: 10px; padding: 3px 12px 3px 0; margin-right: 12px; }
    .od-body { padding: 48px 18px 72px; }
    .od-dashboard { grid-template-columns: 1fr; }
    .od-dash-card { border-right: none; }
    .od-dash-card:nth-last-child(-n+2) { border-bottom: 1px solid var(--od-rule); }
    .od-dash-card:last-child { border-bottom: none; }
    .od-compare-header, .od-compare-row { grid-template-columns: 1.4fr 1fr 1fr; }
    .od-dignity { grid-template-columns: 1fr; }
    .od-def-chips { flex-direction: column; }
  }
`;

const faqs = [
  {
    q: "What is meant by 'outcomes of democracy'? What should democracy ideally produce?",
    a: <><strong>Outcomes of democracy</strong> refer to the actual results and achievements that a democratic form of government is expected to deliver to its citizens.<br/><br/>
    Democracy should ideally produce:<br/>
    1. A government that is <strong>accountable</strong> — answerable for its decisions<br/>
    2. A government that is <strong>responsive</strong> — sensitive to citizens' needs and expectations<br/>
    3. <strong>Transparent governance</strong> — citizens can question and enquire about government functioning<br/>
    4. <strong>Legitimate decisions</strong> — since they are debated and negotiated, they are more acceptable<br/>
    5. A government that is truly <strong>people's own</strong> — ruled by elected representatives<br/><br/>
    However, democratic governments are noted to be <strong>not very efficient at proactively sharing information</strong> with the public — a key limitation.</>
  },
  {
    q: "Does democracy perform better than dictatorship economically?",
    a: <><strong>Not necessarily — at least not in raw growth figures.</strong><br/><br/>
    Studies of the period <strong>1950–2000</strong> showed that dictatorships had a <strong>slightly higher average rate of economic development</strong> than democracies. This is often because authoritarian governments can make decisions faster without debate.<br/><br/>
    However, <strong>democracy is still preferred</strong> because:<br/>
    — It delivers many other positive outcomes (dignity, freedom, accountability)<br/>
    — Economic growth alone does not define the quality of governance<br/>
    — Dictatorship's growth often comes at the cost of human rights and freedoms<br/>
    — Democratic economies tend to be more stable over the long term<br/><br/>
    <strong>Key exam point:</strong> This does NOT mean dictatorship is better — democracy must be evaluated on multiple dimensions, not just GDP growth.</>
  },
  {
    q: "How does democracy handle inequality and poverty?",
    a: <><strong>Democracy's record on inequality is mixed — and this is an important honest assessment from the chapter.</strong><br/><br/>
    Democracy is built on <strong>political equality</strong> — one person, one vote. This is a genuine achievement.<br/><br/>
    However, <strong>democracies often coexist with huge economic disparities</strong>. Political equality does not automatically translate into economic equality. The poor vote but may not always benefit proportionately from policy.<br/><br/>
    The key tension: Democracy guarantees <strong>equal political rights</strong> but cannot guarantee <strong>equal economic outcomes</strong>. The chapter honestly acknowledges this — democracies are built on political equality but large economic disparities persist.</>
  },
  {
    q: "How does democracy accommodate social diversity?",
    a: <><strong>Democracy handles social diversity through two key principles:</strong><br/><br/>
    1. <strong>Both majority AND minority opinions must be considered</strong> — for a democracy to function efficiently, it cannot simply override minority voices.<br/><br/>
    2. <strong>Rule of majority must NOT apply in matters of religion, language or race</strong> — these are areas where constitutional protections override the will of the numerical majority.<br/><br/>
    This is what distinguishes genuine democracy from majoritarian rule. Democracies that protect minority rights survive; those that don't descend into civil conflict.</>
  },
  {
    q: "How does democracy promote dignity and freedom of citizens?",
    a: <><strong>Democracy's most profound contribution is moral — it affirms the equal worth of every human being.</strong><br/><br/>
    1. <strong>Universal dignity</strong> — every citizen deserves equal rights and respect regardless of caste, class, gender or religion<br/>
    2. <strong>Women's equality</strong> — women receive equal political status and opportunity to participate in democratic processes<br/>
    3. <strong>Caste and class equality</strong> — people from discriminated castes and classes are given <strong>equal status and opportunity of participation</strong> in the democratic process<br/>
    4. <strong>Freedom of expression</strong> — citizens can freely express views, criticise government, and organise around causes<br/><br/>
    These are dignities that authoritarian systems do not guarantee — democracy's deepest justification.</>
  },
  {
    q: "What is the difference between an accountable and a responsive government?",
    a: <><strong>Accountable Government:</strong> A government that is answerable for its decisions. Citizens, courts, and the legislature can question, review, and reverse government decisions. Enforced through elections, RTI, judicial review, and press freedom.<br/><br/>
    <strong>Responsive Government:</strong> A government that actively addresses the needs and expectations of citizens — not just technically following rules, but genuinely serving public interests.<br/><br/>
    <strong>Democracy aims for both</strong> — but governments sometimes satisfy accountability requirements while still being slow or ineffective at responding to what people actually need.</>
  },
  {
    q: "Why is democratic decision-making more acceptable even if it's slower?",
    a: <>In a democracy, <strong>decisions are debated and negotiated</strong> before being implemented. This involves multiple stakeholders which makes the process slower than in authoritarian systems.<br/><br/>
    However, this makes decisions <strong>more acceptable and effective</strong> because:<br/>
    1. People whose representatives participated feel the outcome is <strong>legitimate</strong><br/>
    2. Multiple perspectives reduce blind spots<br/>
    3. Even those who disagree accept the result because the <strong>process was fair</strong><br/>
    4. Implemented policies face less resistance from citizens who understand how they were made<br/><br/>
    This is why democratic governance tends to be more <strong>stable and durable</strong> in the long run.</>
  },
  {
    q: "Why is democracy called 'people's own government'?",
    a: <>Democracy is called people's own government because it is <strong>of the people, by the people, and for the people</strong>.<br/><br/>
    Citizens <strong>choose their own representatives</strong> through free and fair elections. Those representatives are <strong>accountable to the people</strong> — removable at the next election if they fail.<br/><br/>
    Laws and policies in a democracy ultimately <strong>reflect the will of citizens</strong>, not a ruler or foreign power. This creates a sense of <strong>ownership and identification</strong> with governance.<br/><br/>
    This is also why most people across the world — even when dissatisfied with their specific government — <strong>prefer democracy as a system</strong> over alternatives.</>
  },
];

export default function OutcomesOfDemocracy() {
  const [openIdx, setOpenIdx] = useState(null);
  const tog = (i) => setOpenIdx(openIdx === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="od-root">

        <div className="od-hero">
          <div className="od-hero-mesh" />
          <div className="od-hero-ghost">7</div>

          <div className="od-hero-nav">
            <div className="od-nav-brand">Shikshacom · Civics</div>
            <div className="od-nav-pill">Chapter 7 · Democratic Politics II</div>
          </div>

          <div className="od-hero-center">
            <div className="od-hero-eyebrow">CBSE Class 10 · Political Science</div>
            <h1 className="od-hero-h1">Outcomes of<br /><span>Democracy</span></h1>
            <p className="od-hero-deck">
              Democracy is more than just elections — but does it actually <strong>deliver</strong>?
              This chapter evaluates democracy's real-world performance across five dimensions:
              accountability, growth, equality, diversity, and human dignity.
            </p>
            <div className="od-hero-stats">
              <div className="od-hero-stat">
                <div className="od-hstat-val">5</div>
                <div className="od-hstat-label">Outcomes Evaluated</div>
              </div>
              <div className="od-hero-stat">
                <div className="od-hstat-val">50yr</div>
                <div className="od-hstat-label">Growth Data 1950–2000</div>
              </div>
              <div className="od-hero-stat">
                <div className="od-hstat-val">✓</div>
                <div className="od-hstat-label">People's Own Govt</div>
              </div>
              <div className="od-hero-stat">
                <div className="od-hstat-val">≠</div>
                <div className="od-hstat-label">Political ≠ Economic Equality</div>
              </div>
            </div>
          </div>

          <div className="od-hero-bottom">
            {["Accountable Govt","Responsive Govt","Economic Growth","Inequality","Social Diversity","Dignity & Freedom"].map(t => (
              <div className="od-hbtm-item" key={t}>{t}</div>
            ))}
          </div>
        </div>

        <div className="od-body">

          <div className="od-sec">
            <div className="od-sec-badge">01</div>
            <div className="od-sec-title">What Democracy Should Deliver</div>
            <div className="od-sec-note">The promise vs the reality</div>
          </div>

          <div className="od-def">
            <div className="od-def-tag">Core Expectation · Democracy's Promise</div>
            <div className="od-def-text">
              Democracy is a form of government that creates <em>opportunities for citizens to achieve their goals</em> — producing a government that is both accountable and responsive to the needs of its people.
            </div>
            <div className="od-def-chips">
              {["Accountable to Citizens","Responsive to Needs","Transparent Functioning","Legitimate Decisions","People's Own Government"].map(c => (
                <div className="od-def-chip" key={c}>
                  <div className="od-def-chip-dot" />{c}
                </div>
              ))}
            </div>
          </div>

          <h2 className="od-h2">Three Things Democracy <em>Must</em> Guarantee</h2>

          <div className="od-pillars">
            {[
              { icon:"🏛️", n:"1", title:"Accountable Government", body:<>Leaders must <strong>answer for their decisions</strong>. Elections, RTI, judiciary and a free press enforce accountability. Citizens can remove governments that fail them.</> },
              { icon:"📋", n:"2", title:"Responsive Government", body:<>Government must actively <strong>respond to citizens' needs</strong> — not just technically exist, but genuinely serve. Accountability without responsiveness is hollow.</> },
              { icon:"🔍", n:"3", title:"Transparent Government", body:<>Citizens have the <strong>right to question and enquire</strong> about how the government functions. Opacity breeds corruption; transparency builds trust.</> },
            ].map((p, i) => (
              <div className="od-pillar" key={i}>
                <div className="od-pillar-top">
                  <div className="od-pillar-icon">{p.icon}</div>
                  <div className="od-pillar-n">{p.n}</div>
                </div>
                <div className="od-pillar-title">{p.title}</div>
                <div className="od-pillar-body">{p.body}</div>
              </div>
            ))}
          </div>

          <div className="od-alert amber">
            <div className="od-alert-icon">⚠️</div>
            <div className="od-alert-text">
              <strong>Noted Limitation:</strong> Democratic governments are not very efficient when it comes to <strong>proactively sharing information</strong> with people. Citizens must often actively seek information rather than receiving it automatically.
            </div>
          </div>

          <div className="od-div"><div className="od-div-mark" /></div>

          <div className="od-sec">
            <div className="od-sec-badge">02</div>
            <div className="od-sec-title">Performance of Democracy</div>
            <div className="od-sec-note">How democracy scores on five measures</div>
          </div>

          <h2 className="od-h2">The <em>Democracy Dashboard</em>: 5 Outcomes</h2>
          <p className="od-prose">The chapter honestly evaluates five key dimensions — the assessment is neither fully positive nor negative. Democracy has genuine achievements and genuine limitations.</p>

          <div className="od-dashboard">
            {[
              { icon:"📈", status:"mixed", statusLabel:"Mixed", title:"Economic Growth & Development",
                body:<>Between <strong>1950–2000</strong>, dictatorships showed a <strong>higher average rate of economic development</strong> than democracies. However, democracy is still preferred for its many other positive outcomes. Economic growth is not the only measure of a good society.</>,
                foot:"Key: Growth ≠ the only measure. Democracy offers more." },
              { icon:"⚖️", status:"warn", statusLabel:"Challenge", title:"Reduction of Inequality & Poverty",
                body:<>Democracies are built on <strong>political equality</strong> — one person, one vote. But they often coexist with <strong>huge economic disparities</strong>. Political equality does not automatically produce economic equality.</>,
                foot:"Political equality ≠ economic equality. Ongoing challenge." },
              { icon:"🌐", status:"good", statusLabel:"Strength", title:"Accommodation of Social Diversity",
                body:<>Democracy's greatest structural strength — it requires that both <strong>majority and minority opinions be considered</strong>. Rule of majority must <strong>not prevail in matters of religion, language or race</strong>.</>,
                foot:"Rule of majority ≠ suppression of minorities." },
              { icon:"🕊️", status:"pass", statusLabel:"Pass", title:"Dignity & Freedom of Citizens",
                body:<>Democracy <strong>promotes dignity and freedom</strong> for all. Women and people from discriminated castes and classes receive <strong>equal status and equal opportunity</strong> to participate in the democratic process.</>,
                foot:"Unique to democracy — no other system guarantees this." },
            ].map((d, i) => (
              <div className="od-dash-card" key={i}>
                <div className="od-dash-header">
                  <div className="od-dash-icon">{d.icon}</div>
                  <div className={`od-dash-status ${d.status}`}>{d.statusLabel}</div>
                </div>
                <div className="od-dash-title">{d.title}</div>
                <div className="od-dash-body">{d.body}</div>
                <div className="od-dash-foot">{d.foot}</div>
              </div>
            ))}
          </div>

          <div className="od-div"><div className="od-div-mark" /></div>

          <div className="od-sec">
            <div className="od-sec-badge">03</div>
            <div className="od-sec-title">Democracy vs Dictatorship</div>
            <div className="od-sec-note">Side-by-side comparison</div>
          </div>

          <h2 className="od-h2">How Does Democracy <em>Compare</em>?</h2>

          <div className="od-compare">
            <div className="od-compare-header">
              <div>Dimension</div>
              <div>✅ Democracy</div>
              <div>❌ Dictatorship</div>
            </div>
            {[
              ["Economic Growth (1950–2000)","Slightly lower avg","Higher average rate"],
              ["Political Freedom","Fully guaranteed","Absent"],
              ["Accountability to Citizens","Strong mechanisms","None"],
              ["Transparent Functioning","Constitutional right","Not guaranteed"],
              ["Dignity & Equal Status","Legally protected","Often violated"],
              ["Peaceful Transfer of Power","Via elections","Often violent"],
              ["Long-term Stability","High — legitimate rule","Depends on ruler"],
              ["Minority Rights","Constitutionally protected","Majority may dominate"],
            ].map(([label, dem, dict], i) => (
              <div className="od-compare-row" key={i}>
                <div className="od-compare-label">{label}</div>
                <div className="od-compare-dem">{dem}</div>
                <div className="od-compare-dict">{dict}</div>
              </div>
            ))}
          </div>

          <div className="od-alert lime">
            <div className="od-alert-icon">💡</div>
            <div className="od-alert-text">
              <strong>Key Exam Takeaway:</strong> Between 1950–2000, dictatorships had higher economic growth — but democracy is still preferred because growth is not the only measure. Dignity, freedom, accountability and minority rights matter equally.
            </div>
          </div>

          <div className="od-div"><div className="od-div-mark" /></div>

          <div className="od-sec">
            <div className="od-sec-badge">04</div>
            <div className="od-sec-title">Dignity & Freedom</div>
            <div className="od-sec-note">Democracy's deepest achievement</div>
          </div>

          <h2 className="od-h2">Why <em>Dignity</em> Matters Most</h2>
          <p className="od-prose">Of all democracy's outcomes, the promotion of <strong>human dignity and individual freedom</strong> may be the most profound — the only system that constitutionally commits to treating every person as equally deserving of rights and respect.</p>

          <div className="od-dignity">
            {[
              { icon:"🗳️", title:"Political Equality", body:<>Every citizen gets <strong>exactly one vote</strong> — the billionaire and the daily-wage worker both count equally. Foundational and unique to democracy.</> },
              { icon:"👩", title:"Women's Equality", body:<><strong>Women are given equal status</strong> and opportunity to participate in the democratic process — a reversal of centuries of exclusion from public life.</> },
              { icon:"⚡", title:"Caste & Class Equality", body:<>People from <strong>discriminated castes and classes</strong> receive equal status and opportunity of participation — enshrined in the Constitution.</> },
              { icon:"🔒", title:"Freedom of Expression", body:<>Citizens can <strong>freely express opinions, criticise the government</strong>, and organise around causes they believe in — absent in authoritarian systems.</> },
            ].map((d, i) => (
              <div className="od-dignity-card" key={i}>
                <div className="od-dignity-icon">{d.icon}</div>
                <div className="od-dignity-title">{d.title}</div>
                <div className="od-dignity-body">{d.body}</div>
              </div>
            ))}
          </div>

          <div className="od-pull">
            <div className="od-pull-q">
              "Economic growth can happen under dictatorship — but <em>dignity, freedom and the right to question your government</em> cannot. These are democracy's gifts that no growth statistic can replace."
            </div>
            <div className="od-pull-attr">— Outcomes of Democracy, NCERT Class 10</div>
          </div>

          <div className="od-faq-header">
            <div className="od-faq-acc" />
            <div className="od-faq-header-inner">
              <div className="od-faq-tag">Exam Preparation · FAQ</div>
              <div className="od-faq-sub">8 questions · Complete coverage</div>
            </div>
          </div>
          <h2 className="od-faq-h2">All You Need to Know</h2>

          {faqs.map((faq, i) => (
            <div className={`od-faq-item${openIdx === i ? " open" : ""}`} key={i}>
              <button className="od-faq-q" onClick={() => tog(i)}>
                <span className="od-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="od-faq-icon">{openIdx === i ? "▴" : "▾"}</span>
              </button>
              <div className={`od-faq-ans${openIdx === i ? " open" : ""}`}>
                <div className="od-faq-ans-inner">{faq.a}</div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
