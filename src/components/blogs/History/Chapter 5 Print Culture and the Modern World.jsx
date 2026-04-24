import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:       #12100e;
    --ink2:      #1e1a16;
    --muted:     #7a6e62;
    --paper:     #faf7f2;
    --paper2:    #f2ece2;
    --paper3:    #e8dfd0;
    --press:     #2c4a2e;
    --press2:    #1a2e1c;
    --press-lt:  #e8f0e8;
    --ink-blue:  #1a2c4a;
    --ink-blue2: #0f1e33;
    --amber:     #c47a1a;
    --amber2:    #9a5e0f;
    --red:       #8b1a1a;
    --rule:      #cfc4b0;
    --parchment: #fdf6e8;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .pcm-root {
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
  }

  /* ─── HERO — deep ink-press dark ─── */
  .pcm-hero {
    background: linear-gradient(150deg, #080604 0%, #0f0c08 45%, #080a0f 100%);
    min-height: 88vh;
    display: flex; align-items: flex-end;
    position: relative; overflow: hidden;
    padding: 0 0 64px;
  }
  .pcm-hero-bg-num {
    position: absolute; bottom: -40px; right: -20px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(240px, 38vw, 520px); font-weight: 900; line-height: 1;
    color: rgba(255,255,255,0.022); letter-spacing: -0.04em;
    user-select: none; pointer-events: none;
  }
  /* Ink-green top rule */
  .pcm-hero::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #2c4a2e, #4a8c4e, #2c4a2e);
  }
  /* Faint ruled-lines watermark */
  .pcm-ruled-line {
    position: absolute; left: 0; right: 0;
    height: 1px; background: rgba(255,255,255,0.018);
    pointer-events: none;
  }
  .pcm-hero-inner {
    max-width: 900px; width: 100%;
    margin: 0 auto; padding: 0 32px;
    position: relative; z-index: 1;
  }
  .pcm-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #4a8c4e; margin-bottom: 24px;
    display: flex; align-items: center; gap: 14px;
  }
  .pcm-overline::before, .pcm-overline::after {
    content: ''; flex: 0 0 40px; height: 1px; background: #4a8c4e;
  }
  .pcm-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(40px, 7.5vw, 84px); font-weight: 900;
    color: #fff; line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 32px;
  }
  .pcm-hero-title em  { font-style: normal; color: #4a8c4e; }
  .pcm-hero-title .amber-em { color: #e8a030; }
  .pcm-hero-bar {
    display: flex; flex-wrap: wrap; gap: 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 24px; margin-top: 8px;
  }
  .pcm-hero-bar-item {
    flex: 1 1 160px; padding: 0 24px 0 0;
    border-right: 1px solid rgba(255,255,255,0.1); margin-right: 24px;
  }
  .pcm-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .pcm-bar-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.35); margin-bottom: 5px;
  }
  .pcm-bar-value {
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600;
    color: rgba(255,255,255,0.75);
  }

  /* ─── BODY ─── */
  .pcm-body { max-width: 860px; margin: 0 auto; padding: 72px 32px 96px; }

  /* LEAD */
  .pcm-lead {
    border-left: 5px solid var(--press);
    padding: 28px 36px; margin-bottom: 48px; background: var(--paper2);
  }
  .pcm-lead p {
    font-family: 'Poppins', sans-serif; font-size: 19px; font-weight: 500;
    color: var(--ink2); line-height: 1.78; margin: 0 0 14px;
  }
  .pcm-lead p:last-child { margin: 0; }
  .pcm-lead strong { color: var(--press); }

  /* SECTION HEADER */
  .pcm-sec-head {
    display: flex; align-items: flex-start; gap: 20px;
    margin-bottom: 28px; border-bottom: 2px solid var(--rule); padding-bottom: 18px;
  }
  .pcm-sec-num {
    font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900;
    color: var(--rule); line-height: 1; flex-shrink: 0; margin-top: 4px;
  }
  .pcm-sec-kicker {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--press); margin-bottom: 4px;
  }
  .pcm-sec-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(22px, 3.5vw, 32px); font-weight: 900;
    color: var(--ink); line-height: 1.15; letter-spacing: -0.01em;
  }
  .pcm-sec-title span   { color: var(--press); }
  .pcm-sec-title .amber { color: var(--amber); }
  .pcm-sec-title .blue  { color: var(--ink-blue); }
  .pcm-sec-title .red   { color: var(--red); }

  /* BODY TEXT */
  .pcm-body-text {
    font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 400;
    color: #1e1a16; line-height: 1.82; margin-bottom: 24px;
  }
  .pcm-body-text strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* PULL QUOTE */
  .pcm-pull-quote { margin: 40px 0; padding: 32px 40px; background: var(--ink); position: relative; }
  .pcm-pull-quote::before {
    content: '"'; position: absolute; top: -18px; left: 28px;
    font-family: 'Montserrat', sans-serif; font-size: 120px; font-weight: 900;
    color: var(--press); line-height: 1;
  }
  .pcm-pull-quote p {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(17px, 2.4vw, 22px); font-weight: 800;
    color: #fff; line-height: 1.45; letter-spacing: -0.01em;
    position: relative; z-index: 1; margin-bottom: 12px;
  }
  .pcm-pull-quote cite {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600;
    color: #4a8c4e; text-transform: uppercase; letter-spacing: 0.12em; font-style: normal;
  }

  /* ─── NEW: COUNTRY ORIGIN CARDS — 3 column ─── */
  .pcm-origin-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 2px; margin-bottom: 48px; background: var(--rule);
  }
  @media (max-width: 640px) { .pcm-origin-grid { grid-template-columns: 1fr; } }
  .pcm-origin-card { background: var(--paper); padding: 28px 24px; position: relative; }
  .pcm-origin-card:first-child { background: var(--ink); }
  .pcm-origin-card:nth-child(2) { background: var(--ink-blue); }
  .pcm-origin-flag { font-size: 40px; margin-bottom: 14px; font-family: "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif; }
  .pcm-origin-country {
    font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900;
    margin-bottom: 4px; letter-spacing: -0.01em;
  }
  .pcm-origin-card:first-child .pcm-origin-country { color: #fff; }
  .pcm-origin-card:nth-child(2) .pcm-origin-country { color: #fff; }
  .pcm-origin-card:last-child .pcm-origin-country { color: var(--ink); }
  .pcm-origin-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.14em; margin-bottom: 16px;
  }
  .pcm-origin-card:first-child .pcm-origin-tag { color: #4a8c4e; }
  .pcm-origin-card:nth-child(2) .pcm-origin-tag { color: #7ab4d4; }
  .pcm-origin-card:last-child .pcm-origin-tag { color: var(--amber); }
  .pcm-origin-card ul { padding-left: 18px; margin: 0; }
  .pcm-origin-card ul li { font-size: 14px; line-height: 1.72; margin-bottom: 7px; }
  .pcm-origin-card:first-child ul li { color: rgba(255,255,255,0.76); }
  .pcm-origin-card:nth-child(2) ul li { color: rgba(255,255,255,0.76); }
  .pcm-origin-card:last-child ul li { color: #374151; }
  .pcm-origin-card ul li strong { font-family: 'Poppins', sans-serif; font-weight: 700; }
  .pcm-origin-card:first-child ul li strong { color: #4a8c4e; }
  .pcm-origin-card:nth-child(2) ul li strong { color: #7ab4d4; }
  .pcm-origin-card:last-child ul li strong { color: var(--ink); }

  /* ─── NEW: GUTENBERG ANATOMY — large feature block ─── */
  .pcm-gutenberg {
    margin-bottom: 48px;
    background: var(--parchment);
    border: 1px solid var(--rule);
    border-top: 4px solid var(--press);
    overflow: hidden;
  }
  .pcm-gutenberg-header {
    background: var(--press);
    padding: 20px 28px;
    display: flex; align-items: center; gap: 20px;
  }
  .pcm-gutenberg-initial {
    font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900;
    color: rgba(255,255,255,0.15); line-height: 1; flex-shrink: 0;
  }
  .pcm-gutenberg-header-text {}
  .pcm-gutenberg-name {
    font-family: 'Montserrat', sans-serif; font-size: 26px; font-weight: 900;
    color: #fff; letter-spacing: -0.01em; margin-bottom: 3px;
  }
  .pcm-gutenberg-role {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.14em; color: rgba(255,255,255,0.55);
  }
  .pcm-gutenberg-body {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0;
  }
  @media (max-width: 600px) { .pcm-gutenberg-body { grid-template-columns: 1fr; } }
  .pcm-gutenberg-col { padding: 28px 28px; }
  .pcm-gutenberg-col:last-child { border-left: 1px solid var(--rule); }
  @media (max-width: 600px) {
    .pcm-gutenberg-col:last-child { border-left: none; border-top: 1px solid var(--rule); }
  }
  .pcm-gutenberg-col-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--press); margin-bottom: 12px;
  }
  .pcm-gutenberg-col ul { padding-left: 18px; margin: 0; }
  .pcm-gutenberg-col ul li { font-size: 15px; line-height: 1.74; color: #374151; margin-bottom: 8px; }
  .pcm-gutenberg-col ul li strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ink); }

  /* ─── NEW: TIMELINE with YEAR BADGES ─── */
  .pcm-timeline { margin-bottom: 48px; }
  .pcm-tl-item {
    display: grid; grid-template-columns: 110px 1fr;
    gap: 0; border-bottom: 1px solid var(--rule);
  }
  .pcm-tl-item:first-child { border-top: 1px solid var(--rule); }
  .pcm-tl-year-col {
    padding: 20px 20px 20px 0;
    border-right: 2px solid var(--press);
    display: flex; align-items: flex-start; justify-content: flex-end;
  }
  .pcm-tl-year {
    font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 900;
    color: var(--press); text-align: right; line-height: 1.25;
  }
  .pcm-tl-content { padding: 20px 0 20px 24px; }
  .pcm-tl-head {
    font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 700;
    color: var(--ink); margin-bottom: 8px;
  }
  .pcm-tl-desc { font-size: 15px; line-height: 1.74; color: #374151; }
  .pcm-tl-desc strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ─── NEW: IMPACT GRID — 2x2 cards ─── */
  .pcm-impact-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 2px; margin-bottom: 48px; background: var(--rule);
  }
  @media (max-width: 580px) { .pcm-impact-grid { grid-template-columns: 1fr; } }
  .pcm-impact-card { background: var(--paper); padding: 28px 26px; }
  .pcm-impact-card.dark { background: var(--ink); }
  .pcm-impact-card.green { background: var(--press); }
  .pcm-impact-card.blue  { background: var(--ink-blue); }
  .pcm-impact-icon { font-size: 32px; margin-bottom: 12px; }
  .pcm-impact-title {
    font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 900;
    margin-bottom: 10px; letter-spacing: -0.01em; line-height: 1.2;
  }
  .pcm-impact-card:not(.dark):not(.green):not(.blue) .pcm-impact-title { color: var(--ink); }
  .pcm-impact-card.dark .pcm-impact-title  { color: #fff; }
  .pcm-impact-card.green .pcm-impact-title { color: #fff; }
  .pcm-impact-card.blue .pcm-impact-title  { color: #fff; }
  .pcm-impact-body { font-size: 15px; line-height: 1.74; }
  .pcm-impact-card:not(.dark):not(.green):not(.blue) .pcm-impact-body { color: #374151; }
  .pcm-impact-card.dark .pcm-impact-body  { color: rgba(255,255,255,0.76); }
  .pcm-impact-card.green .pcm-impact-body { color: rgba(255,255,255,0.8); }
  .pcm-impact-card.blue .pcm-impact-body  { color: rgba(255,255,255,0.8); }
  .pcm-impact-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; }
  .pcm-impact-card:not(.dark):not(.green):not(.blue) .pcm-impact-body strong { color: var(--ink); }
  .pcm-impact-card.dark .pcm-impact-body strong  { color: #4a8c4e; }
  .pcm-impact-card.green .pcm-impact-body strong { color: #c8f0c8; }
  .pcm-impact-card.blue .pcm-impact-body strong  { color: #9ed0f0; }

  /* ─── NEW: NEWSPAPER STRIP — for India section ─── */
  .pcm-newspaper {
    margin-bottom: 48px;
    border: 1px solid var(--rule);
  }
  .pcm-newspaper-header {
    background: var(--ink); padding: 0;
    display: flex; align-items: stretch;
  }
  .pcm-newspaper-masthead {
    flex: 1; padding: 16px 24px;
    border-right: 1px solid rgba(255,255,255,0.1);
  }
  .pcm-newspaper-title-text {
    font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900;
    color: #fff; letter-spacing: -0.01em; margin-bottom: 3px;
  }
  .pcm-newspaper-sub {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.14em; color: #4a8c4e;
  }
  .pcm-newspaper-date {
    padding: 16px 20px; display: flex; align-items: center;
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600;
    color: rgba(255,255,255,0.4); text-align: right; line-height: 1.4;
  }
  .pcm-newspaper-body { padding: 0; }
  .pcm-newspaper-row {
    display: grid; grid-template-columns: 180px 1fr;
    border-bottom: 1px solid var(--rule);
  }
  .pcm-newspaper-row:last-child { border-bottom: none; }
  .pcm-newspaper-key {
    background: var(--paper2); padding: 14px 18px;
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    color: var(--press2); border-right: 1px solid var(--rule);
    display: flex; align-items: center;
  }
  .pcm-newspaper-val {
    padding: 14px 18px; font-size: 15px; line-height: 1.65; color: #374151;
  }
  .pcm-newspaper-val strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ─── NEW: CENSOR BLOCK — dramatic dark warning style ─── */
  .pcm-censor {
    margin-bottom: 48px;
    background: var(--red);
    padding: 0;
    overflow: hidden;
  }
  .pcm-censor-header {
    padding: 16px 28px;
    border-bottom: 1px solid rgba(255,255,255,0.15);
    display: flex; align-items: center; gap: 14px;
  }
  .pcm-censor-stamp {
    font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 900;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    border: 2px solid rgba(255,255,255,0.3); padding: 4px 10px;
    flex-shrink: 0;
  }
  .pcm-censor-headline {
    font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 900;
    color: #fff; letter-spacing: -0.01em;
  }
  .pcm-censor-body { padding: 24px 28px; }
  .pcm-censor-body ul { padding-left: 18px; margin: 0; }
  .pcm-censor-body ul li {
    font-size: 15px; line-height: 1.74;
    color: rgba(255,255,255,0.82); margin-bottom: 10px;
  }
  .pcm-censor-body ul li strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: #fff; }

  /* BULLET LIST */
  .pcm-list { margin: 0 0 28px; padding: 0; list-style: none; }
  .pcm-list li {
    font-size: 16px; line-height: 1.78; color: #1e1a16;
    padding: 10px 0 10px 28px; position: relative;
    border-bottom: 1px solid var(--rule);
  }
  .pcm-list li:first-child { border-top: 1px solid var(--rule); }
  .pcm-list li::before {
    content: ''; position: absolute; left: 0; top: 18px;
    width: 10px; height: 10px;
    border: 2px solid var(--press); transform: rotate(45deg);
  }
  .pcm-list li strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* SECTION DIVIDER */
  .pcm-divider { display: flex; align-items: center; gap: 16px; margin: 56px 0; }
  .pcm-divider::before, .pcm-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .pcm-divider-mark { width: 10px; height: 10px; background: var(--press); transform: rotate(45deg); flex-shrink: 0; }

  /* STAT ROW */
  .pcm-stat-row { display: flex; flex-wrap: wrap; gap: 2px; margin-bottom: 48px; background: var(--rule); }
  .pcm-stat-box { flex: 1 1 130px; background: var(--paper); padding: 24px 18px; text-align: center; }
  .pcm-stat-val {
    font-family: 'Montserrat', sans-serif; font-size: 26px; font-weight: 900;
    color: var(--press); line-height: 1.1; margin-bottom: 6px; letter-spacing: -0.02em;
  }
  .pcm-stat-label {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 600;
    color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; line-height: 1.4;
  }

  /* FAQ */
  .pcm-faq-header { border-bottom: 3px solid var(--ink); padding-bottom: 14px; margin-bottom: 0; display: flex; align-items: baseline; gap: 16px; }
  .pcm-faq-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--press); }
  .pcm-faq-title { font-family: 'Montserrat', sans-serif; font-size: clamp(24px, 4vw, 34px); font-weight: 900; color: var(--ink); letter-spacing: -0.01em; margin: 20px 0 32px; }
  .pcm-faq-item { border-bottom: 1px solid var(--rule); overflow: hidden; }
  .pcm-faq-item.open { background: var(--paper2); }
  .pcm-faq-q { width: 100%; text-align: left; background: none; border: none; cursor: pointer; padding: 20px 0; display: grid; grid-template-columns: 1fr 32px; gap: 16px; align-items: start; }
  .pcm-faq-q-text { font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 600; color: var(--ink); line-height: 1.5; text-align: left; padding-left: 4px; }
  .pcm-faq-item.open .pcm-faq-q-text { color: var(--press2); }
  .pcm-faq-icon { width: 28px; height: 28px; border: 1.5px solid var(--rule); display: flex; align-items: center; justify-content: center; font-size: 16px; color: var(--press); flex-shrink: 0; margin-top: 2px; font-family: 'Poppins', sans-serif; font-weight: 700; }
  .pcm-faq-item.open .pcm-faq-icon { background: var(--ink); border-color: var(--ink); color: #4a8c4e; }
  .pcm-faq-ans { display: none; padding: 0 4px 22px; font-size: 16px; line-height: 1.82; color: #374151; }
  .pcm-faq-ans.visible { display: block; }
  .pcm-faq-ans ul { padding-left: 20px; margin: 8px 0; }
  .pcm-faq-ans ul li { margin-bottom: 7px; }
  .pcm-faq-ans strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }
  .pcm-faq-ans p { margin: 0 0 10px; }
  .pcm-faq-ans p:last-child { margin: 0; }

  @media (max-width: 600px) {
    .pcm-hero { min-height: auto; padding: 80px 0 48px; }
    .pcm-tl-item { grid-template-columns: 80px 1fr; }
    .pcm-newspaper-row { grid-template-columns: 120px 1fr; }
  }
`;

const faqs = [
  {
    q: "Why did people in Europe welcome the print culture?",
    a: (<>
      <p>People in Europe welcomed print culture because it carried ideas that had never before reached the common person:</p>
      <ul>
        <li><strong>Revolutionary ideas spread:</strong> Books like Rousseau's <em>Social Contract</em> argued that governments could only govern with the <strong>consent of the governed</strong> — a radical idea that challenged the divine right of kings</li>
        <li><strong>Reason over blind faith:</strong> Print culture encouraged people to <strong>think, use logic, and question authority</strong> — they stopped simply believing what kings or the Church told them</li>
        <li><strong>Liberty and equality:</strong> These books talked about freedom and equality for all — directly attacking dictatorship and monarchy</li>
        <li><strong>Ideas traveled fast:</strong> For the first time, progressive thinkers like <strong>Voltaire and Rousseau</strong> could reach millions of ordinary readers, not just a privileged elite</li>
        <li>The spread of these revolutionary ideals through print acted as a <strong>catalyst for the French Revolution</strong> and subsequent nationalist revolutions across Europe</li>
      </ul>
    </>),
  },
  {
    q: "Why were some people not happy with the easy availability of printed books?",
    a: (<>
      <p>Not everyone celebrated the print revolution — powerful institutions felt directly threatened:</p>
      <ul>
        <li><strong>The Church's fear:</strong> The Roman Catholic Church feared that the easy availability of cheap books would result in the proliferation of <strong>irreligious ideas</strong> — people would stop listening to clergy sermons</li>
        <li><strong>Language barrier broken:</strong> These cheap books were written in <strong>colloquial language</strong>, not Latin — so ordinary people who didn't know Latin could read them, directly undermining the Church's authority</li>
        <li><strong>Protestant use:</strong> After Gutenberg's death, Protestants like <strong>Martin Luther</strong> used the printing press to spread ideas that challenged the Church — the Church had lost control of the medium it had once embraced</li>
        <li><strong>British India:</strong> In India, the British were deeply unhappy with printed books that <strong>propagated nationalism</strong>. When Bal Gangadhar Tilak wrote <em>Kesari</em> in support of Punjabi nationalists, he was <strong>jailed</strong></li>
        <li>The <strong>Vernacular Press Act of 1878</strong> was specifically passed to silence nationalist publications — a draconian censorship law</li>
      </ul>
    </>),
  },
  {
    q: "Write a brief note on the Gutenberg Press.",
    a: (<>
      <p>The Gutenberg Press was one of the most transformative inventions in human history:</p>
      <ul>
        <li><strong>Background:</strong> Johannes Gutenberg grew up on an agricultural estate where he observed how grapes and olives were pressed to extract liquids. He also worked as a <strong>goldsmith</strong>, creating lead moulds to produce trinkets of desired shapes</li>
        <li><strong>The invention:</strong> Drawing inspiration from the olive press and lead moulding, Gutenberg created <strong>movable metal type</strong> — metal alphabets that could be arranged into any sentence and reused</li>
        <li><strong>The mechanism:</strong> He used a press similar to the <strong>olive press to press paper against the inked metal types</strong>, producing clean printed text rapidly</li>
        <li><strong>Why it was revolutionary:</strong> Unlike wooden blocks, the metal type was <strong>durable, movable, and reusable</strong> — the same set of alphabets could print endless different sentences</li>
        <li><strong>The impact:</strong> Gutenberg's press triggered a print revolution — by the 16th century, <strong>200 million copies</strong> of printed books were in circulation across Europe</li>
      </ul>
    </>),
  },
  {
    q: "What was the theme of the earliest dated book, Diamond Sutra?",
    a: (<>
      <p>The <strong>Diamond Sutra</strong>, dated <strong>May 11, 868 AD</strong>, is regarded as the world's oldest known printed book. It was printed in Japan and contains profound Buddhist philosophy:</p>
      <ul>
        <li>The Diamond Sutra contains <strong>Buddhist sacred texts</strong> — it is a deeply philosophical and spiritual work</li>
        <li>Just as a diamond cuts through even the most complex materials, these Buddhist Sutras are meant to <strong>cut through the curtain of illusion</strong></li>
        <li>At its core, the book is about the concept of <strong>'not dwelling'</strong> — the attainment of <em>Prajna Paramita</em> (the perfection of wisdom)</li>
        <li>It was brought to Japan by <strong>Chinese missionaries</strong> who propagated the art of printing alongside Buddhism</li>
        <li>The Diamond Sutra represents both the <strong>earliest milestone of printing history</strong> and a foundational text of Buddhist thought</li>
      </ul>
    </>),
  },
  {
    q: "How did the print and the oral culture intermingle?",
    a: (<>
      <p>Print and oral culture did not replace each other — they worked together in a fascinating symbiosis:</p>
      <ul>
        <li>After Gutenberg's press made printed materials popular in the 15th century, there were still <strong>thousands of illiterate people</strong> who could not read</li>
        <li>To make books appealing to illiterate people, printers <strong>incorporated many illustrations</strong> — images that resonated emotionally and attracted the non-reading public</li>
        <li>Once people were drawn in by the illustrations, the <strong>contents were read aloud</strong> to groups — letting illiterate people know what was written</li>
        <li>This created a powerful loop: <strong>oral tradition helped propagate print culture</strong>, and print culture gave oral traditions richer, wider-reaching content to share</li>
        <li>The two traditions <strong>complemented each other perfectly</strong> — print reached the literate, oral reading spread those ideas to everyone else</li>
      </ul>
    </>),
  },
];

export default function PrintCultureAndTheModernWorld() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="pcm-root">

        {/* HERO */}
        <div className="pcm-hero">
          {[15, 25, 35, 50, 65, 75].map((top, i) => (
            <div className="pcm-ruled-line" key={i} style={{ top: `${top}%` }} />
          ))}
          <div className="pcm-hero-bg-num">05</div>
          <div className="pcm-hero-inner">
            <div className="pcm-overline">Class 10 · Social Science · History</div>
            <h1 className="pcm-hero-title">
              Print Culture<br />&amp; The <em>Modern</em><br /><span className="amber-em">World</span>
            </h1>
            <div className="pcm-hero-bar">
              {[
                { label:"Subject",  value:"History" },
                { label:"Chapter",  value:"Chapter 5" },
                { label:"Period",   value:"594 AD – 20th C" },
                { label:"Regions",  value:"China, Europe, India" },
                { label:"FAQs",     value:"5 Questions" },
              ].map((b, i) => (
                <div className="pcm-hero-bar-item" key={i}>
                  <div className="pcm-bar-label">{b.label}</div>
                  <div className="pcm-bar-value">{b.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pcm-body">

          {/* Lead */}
          <div className="pcm-lead">
            <p>More than 5,500 years ago, people began to write. But for millennia, knowledge traveled only as far as a human voice could carry it. It was the <strong>invention of printing</strong> that changed everything — sending ideas racing across continents, toppling empires, igniting revolutions, and lifting millions out of ignorance.</p>
            <p>From the <strong>woodblock presses of Tang Dynasty China</strong> to Gutenberg's movable type, from India's vernacular newspapers to the <strong>censored presses of colonial rule</strong> — this chapter traces the world-changing journey of the printed word.</p>
          </div>

          {/* Key Stats */}
          <div className="pcm-stat-row">
            {[
              { val:"594 AD",   label:"Woodblock Printing Begins" },
              { val:"868 AD",   label:"Diamond Sutra Printed" },
              { val:"15th C",   label:"Gutenberg's Press" },
              { val:"200M",     label:"Books in Circulation by 16th C" },
              { val:"1878",     label:"Vernacular Press Act" },
              { val:"8,000",    label:"Sheets/Hour by Rotary Press" },
            ].map((s, i) => (
              <div className="pcm-stat-box" key={i}>
                <div className="pcm-stat-val">{s.val}</div>
                <div className="pcm-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* 1 — Printing Origins */}
          <div className="pcm-sec-head">
            <div className="pcm-sec-num">1</div>
            <div className="pcm-sec-title-wrap">
              <div className="pcm-sec-kicker">Where It All Began</div>
              <h2 className="pcm-sec-title">The <span>Origins</span> of Printing</h2>
            </div>
          </div>

          <p className="pcm-body-text">
            Although the Sumerian civilisations used some primary forms of printing, <strong>China is considered the true birthplace of printing</strong>. From there, the art of the press traveled — first to Japan via Buddhist missionaries, then westward through the Silk Route to Europe, where it would eventually be transformed into one of history's most revolutionary technologies.
          </p>

          <div className="pcm-origin-grid">
            <div className="pcm-origin-card">
              <div className="pcm-origin-flag" style={{fontSize:'13px',fontFamily:"'Poppins',sans-serif",fontWeight:700,letterSpacing:'0.14em',color:'#4a8c4e',background:'rgba(74,140,78,0.15)',display:'inline-block',padding:'5px 12px',marginBottom:'14px'}}>CHINA · 中国</div>
              <div className="pcm-origin-country">China</div>
              <div className="pcm-origin-tag">Birthplace of Printing</div>
              <ul>
                <li><strong>Woodblock printing</strong> originated here — the world's first</li>
                <li>Woodblock printing began from <strong>594 AD</strong> onwards</li>
                <li>When the <strong>Tang Dynasty</strong> came to power in 618 AD, emperors greatly promoted woodblock printing</li>
                <li>Chinese paper traveled to Europe via the <strong>Silk Route</strong></li>
              </ul>
            </div>
            <div className="pcm-origin-card">
              <div className="pcm-origin-flag" style={{fontSize:'13px',fontFamily:"'Poppins',sans-serif",fontWeight:700,letterSpacing:'0.14em',color:'#7ab4d4',background:'rgba(122,180,212,0.15)',display:'inline-block',padding:'5px 12px',marginBottom:'14px'}}>JAPAN · 日本</div>
              <div className="pcm-origin-country">Japan</div>
              <div className="pcm-origin-tag">Buddhism & Books</div>
              <ul>
                <li><strong>Chinese missionaries</strong> propagated the art of printing to spread Buddhism</li>
                <li>Hand printing technology arrived in Japan from <strong>768 AD onwards</strong></li>
                <li><strong>Diamond Sutra</strong> — the world's oldest known printed book, dated <strong>May 11, 868 AD</strong></li>
                <li>A book of <strong>Buddhist sacred texts</strong> about the concept of 'not dwelling' and Prajna Paramita</li>
              </ul>
            </div>
            <div className="pcm-origin-card">
              <div className="pcm-origin-flag" style={{fontSize:'13px',fontFamily:"'Poppins',sans-serif",fontWeight:700,letterSpacing:'0.14em',color:'#c47a1a',background:'rgba(196,122,26,0.12)',display:'inline-block',padding:'5px 12px',marginBottom:'14px'}}>EUROPE · 欧洲</div>
              <div className="pcm-origin-country">Europe</div>
              <div className="pcm-origin-tag">The Silk Route Delivers</div>
              <ul>
                <li>Before Chinese paper arrived, Europeans wrote on <strong>Vellum (animal skin)</strong> — expensive and available only to aristocrats</li>
                <li><strong>Marco Polo</strong> brought knowledge of printing to Italy in 1295</li>
                <li>As woodblock printing spread in Italy, the <strong>cost of books fell</strong> dramatically</li>
                <li>Demand grew beyond what woodblock printing could satisfy — setting the stage for <strong>Gutenberg</strong></li>
              </ul>
            </div>
          </div>

          <div className="pcm-divider"><div className="pcm-divider-mark" /></div>

          {/* 2 — Gutenberg */}
          <div className="pcm-sec-head">
            <div className="pcm-sec-num">2</div>
            <div className="pcm-sec-title-wrap">
              <div className="pcm-sec-kicker">The Game Changer — 15th Century</div>
              <h2 className="pcm-sec-title">Johannes <span>Gutenberg</span> & The Press</h2>
            </div>
          </div>

          <p className="pcm-body-text">
            As demand for books grew across Europe, woodblock printing could no longer keep up. Wooden blocks were <strong>slow to make, not durable, and not movable</strong> — once carved for one text, they were useless for another. Into this gap stepped a German craftsman with two unusual inspirations: an <strong>olive press and a goldsmith's mould</strong>.
          </p>

          <div className="pcm-gutenberg">
            <div className="pcm-gutenberg-header">
              <div className="pcm-gutenberg-initial">G</div>
              <div className="pcm-gutenberg-header-text">
                <div className="pcm-gutenberg-name">Johannes Gutenberg</div>
                <div className="pcm-gutenberg-role">Inventor of the Movable-Type Printing Press · 15th Century</div>
              </div>
            </div>
            <div className="pcm-gutenberg-body">
              <div className="pcm-gutenberg-col">
                <div className="pcm-gutenberg-col-label">His Inspirations</div>
                <ul>
                  <li>Grew up on an <strong>agricultural estate</strong> — observed how grapes and olives were pressed to extract liquids in a screw press</li>
                  <li>Worked as a <strong>goldsmith</strong> — used lead moulds to produce trinkets and jewellery of precise, desired shapes</li>
                  <li>Combined both ideas: <strong>lead moulds to cast metal type + a press to imprint it on paper</strong></li>
                </ul>
              </div>
              <div className="pcm-gutenberg-col">
                <div className="pcm-gutenberg-col-label">Why It Was Revolutionary</div>
                <ul>
                  <li>Used <strong>movable metal alphabets</strong> — the same set could be rearranged to print any sentence, endlessly reused</li>
                  <li><strong>Metal was durable</strong> — unlike fragile wooden blocks that wore out quickly</li>
                  <li>Pressed paper against <strong>inked metal type</strong> — clean, fast, consistent output</li>
                  <li>By the 16th century, <strong>200 million copies</strong> of printed books were in circulation — a direct result of his invention</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pcm-divider"><div className="pcm-divider-mark" /></div>

          {/* 3 — Print Revolution */}
          <div className="pcm-sec-head">
            <div className="pcm-sec-num">3</div>
            <div className="pcm-sec-title-wrap">
              <div className="pcm-sec-kicker">Ideas Unleashed</div>
              <h2 className="pcm-sec-title">The <span>Print Revolution</span></h2>
            </div>
          </div>

          <p className="pcm-body-text">
            There was no internet, no smartphones, no television in the 16th century. <strong>Books became the medium</strong> through which ideas, knowledge, science, and revolution spread. As prices fell and literacy rose, an entirely new reading public emerged — people who had previously relied only on oral methods to learn about the world.
          </p>

          <div className="pcm-impact-grid">
            <div className="pcm-impact-card green">
              <div className="pcm-impact-icon">📚</div>
              <div className="pcm-impact-title">A New Reading Public</div>
              <div className="pcm-impact-body">As the cost of books fell, <strong>millions of new readers</strong> emerged who had previously depended entirely on word-of-mouth. Cheap <strong>chapbooks</strong> were produced for the poor. Periodicals, scientific documents, philosophical and political books all flooded the market.</div>
            </div>
            <div className="pcm-impact-card">
              <div className="pcm-impact-icon">🖼️</div>
              <div className="pcm-impact-title">Reaching the Illiterate</div>
              <div className="pcm-impact-body">Printers used <strong>heavy illustrations</strong> to attract people who couldn't read. Books were then <strong>read aloud</strong> to groups — so oral and print culture intermingled, each strengthening the other. No one was left out of the knowledge revolution.</div>
            </div>
            <div className="pcm-impact-card blue">
              <div className="pcm-impact-icon">⛪</div>
              <div className="pcm-impact-title">The Church — From Friend to Foe</div>
              <div className="pcm-impact-body">Gutenberg first showed the Church how printing could <strong>spread its teachings</strong> — so they were initially allies. But after his death, <strong>Protestants like Martin Luther</strong> used the press against the Church. The Roman Catholic Church concluded cheap books would spread <strong>anti-Christian ideas</strong> and undermine clerical authority.</div>
            </div>
            <div className="pcm-impact-card dark">
              <div className="pcm-impact-icon">⚙️</div>
              <div className="pcm-impact-title">Technology Advances</div>
              <div className="pcm-impact-body"><strong>Richard Hoe</strong> made the rotary printing press dramatically more efficient — using four cylinders (one for type, three to feed paper) making <strong>8,000 sheets per hour</strong> possible. Black and white print eventually gave way to <strong>coloured print</strong>.</div>
            </div>
          </div>

          <div className="pcm-pull-quote">
            <p>Voltaire and Rousseau didn't just write books. They lit fires — and the printing press made sure those fires spread to every corner of Europe.</p>
            <cite>— Print Culture & The French Revolution</cite>
          </div>

          {/* 4 — Print and Revolution */}
          <div className="pcm-divider"><div className="pcm-divider-mark" /></div>

          <div className="pcm-sec-head">
            <div className="pcm-sec-num">4</div>
            <div className="pcm-sec-title-wrap">
              <div className="pcm-sec-kicker">Ideas into Action</div>
              <h2 className="pcm-sec-title"><span>Print</span> &amp; Revolution</h2>
            </div>
          </div>

          <p className="pcm-body-text">
            Printed books spread <strong>progressive ideas across Europe</strong> like wildfire. Thanks to philosophers like <strong>Voltaire and Rousseau</strong>, people began questioning assumptions they had held their entire lives. Was the king truly divinely appointed? Was the Church's authority absolute? Were inequality and monarchy natural or man-made?
          </p>

          <ul className="pcm-list">
            <li>People learned to <strong>use reason and logic</strong> — they stopped blindly accepting the word of kings or clergy</li>
            <li>Rousseau's <strong>Social Contract</strong> proposed that government could only govern with the <strong>consent of the governed</strong> — a radical overturning of all existing political thought</li>
            <li>The spread of these revolutionary ideals through print acted as a <strong>direct catalyst for the French Revolution</strong> and later nationalist uprisings</li>
            <li>The Church too tried to spread propaganda through printed books — but <strong>people had already learned to think critically</strong> and take everything with a grain of salt</li>
            <li>Literacy increased dramatically in the <strong>17th and 18th centuries</strong> — many schools were set up, demand for children's books soared, and new types of publications emerged</li>
          </ul>

          <div className="pcm-divider"><div className="pcm-divider-mark" /></div>

          {/* 5 — Print in India */}
          <div className="pcm-sec-head">
            <div className="pcm-sec-num">5</div>
            <div className="pcm-sec-title-wrap">
              <div className="pcm-sec-kicker">The Indian Chapter</div>
              <h2 className="pcm-sec-title">Print Culture in <span>India</span></h2>
            </div>
          </div>

          <p className="pcm-body-text">
            Before print culture reached India, knowledge was preserved in <strong>manuscripts made of palm leaves</strong> — fragile, rare, and accessible only to the elite. The arrival of the printing press transformed Indian society in ways both liberating and contentious.
          </p>

          {/* Timeline — Print in India */}
          <div className="pcm-timeline">
            {[
              { year:"Before Print",    head:"Manuscripts on Palm Leaves", desc:<>Indians preserved knowledge in <strong>palm leaf manuscripts</strong> — beautifully crafted but fragile, rare, and accessible only to a privileged few. Ideas traveled slowly, orally, or by hand-copying.</> },
              { year:"Goa — Portuguese",head:"First Printing Press in India", desc:<>The <strong>Portuguese Missionaries</strong> brought the printing press to India, arriving in Goa. This was the first introduction of mechanised printing to the Indian subcontinent.</> },
              { year:"Bengal Gazette",  head:"Indian Newspapers Emerge", desc:<>Indians began printing their own newspapers. <strong>Bengal Gazette</strong> was among the earliest. <strong>Vernacular newspapers</strong> followed — Raja Ram Mohan Roy's <em>Samvad Kamudi</em>, the Persian <em>Shamsul Akhbar</em>, and Gujarati <em>Bombay Samachar</em>.</> },
              { year:"From 1870",       head:"Satirical Cartoons & Caricatures", desc:<>Newspapers began carrying <strong>satirical cartoons and caricatures</strong> from 1870 onwards — a powerful new form of political commentary that could criticise the British even without words.</> },
              { year:"Reform Era",      head:"Women, Dalits & Social Reform", desc:<>Women were <strong>encouraged to read by liberal fathers and husbands</strong> — in orthodox households they learned secretly. Books targeting women readers emerged. Reformers like <strong>Jyotiba Phule</strong> and <strong>B.R. Ambedkar</strong> published on social issues. Cheap printed books gave voice to the poor.</> },
            ].map((t, i) => (
              <div className="pcm-tl-item" key={i}>
                <div className="pcm-tl-year-col">
                  <div className="pcm-tl-year" style={{whiteSpace:'pre-line'}}>{t.year}</div>
                </div>
                <div className="pcm-tl-content">
                  <div className="pcm-tl-head">{t.head}</div>
                  <div className="pcm-tl-desc">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Vernacular Newspapers Table */}
          <div className="pcm-newspaper">
            <div className="pcm-newspaper-header">
              <div className="pcm-newspaper-masthead">
                <div className="pcm-newspaper-title-text">India's Vernacular Press</div>
                <div className="pcm-newspaper-sub">Key Publications of the Era</div>
              </div>
              <div className="pcm-newspaper-date">19th Century<br />India</div>
            </div>
            <div className="pcm-newspaper-body">
              {[
                ["Samvad Kamudi",    "Bengali newspaper founded by Raja Ram Mohan Roy — a landmark in Indian social reform journalism"],
                ["Shamsul Akhbar",  "Persian-language newspaper that became an important voice for Muslim readers and the educated elite"],
                ["Bombay Samachar", "Gujarati-language newspaper — one of the oldest continuously published newspapers in Asia"],
                ["Bengal Gazette",  "One of the earliest Indian newspapers — critically reported on the East India Company's activities"],
                ["Kesari",          "Bal Gangadhar Tilak's powerful nationalist newspaper — its editor was jailed by the British for its bold coverage"],
              ].map(([k, v]) => (
                <div className="pcm-newspaper-row" key={k}>
                  <div className="pcm-newspaper-key">{k}</div>
                  <div className="pcm-newspaper-val">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pcm-divider"><div className="pcm-divider-mark" /></div>

          {/* 6 — Censorship */}
          <div className="pcm-sec-head">
            <div className="pcm-sec-num">6</div>
            <div className="pcm-sec-title-wrap">
              <div className="pcm-sec-kicker">The British Crackdown</div>
              <h2 className="pcm-sec-title">Muffling the <span className="red">Press</span></h2>
            </div>
          </div>

          <p className="pcm-body-text">
            The more powerfully print culture spread nationalist ideas across India, the more aggressively the British tried to silence it. But censorship only made the nationalist press stronger — every act of suppression created new martyrs and new publications.
          </p>

          <div className="pcm-censor">
            <div className="pcm-censor-header">
              <div className="pcm-censor-stamp">CENSORED</div>
              <div className="pcm-censor-headline">British Press Suppression in India</div>
            </div>
            <div className="pcm-censor-body">
              <ul>
                <li>During the <strong>initial years of the East India Company</strong>, critics like Hickey who exposed the Company's wrongdoings were <strong>silenced and shut down</strong></li>
                <li>After the <strong>Sepoy Mutiny of 1857</strong>, the British began systematically <strong>censoring Indian newspapers and radical books</strong> — fearing the power of a free press to incite rebellion</li>
                <li>In <strong>1878, the draconian Vernacular Press Act</strong> was passed — one of the most severe attacks on press freedom in Indian history. It specifically targeted vernacular (Indian-language) newspapers</li>
                <li>The Act gave magistrates sweeping powers to <strong>seize printing equipment and stop publication</strong> of any newspaper deemed seditious</li>
                <li><strong>Bal Gangadhar Tilak</strong> wrote <em>Kesari</em> to voice the Indian Nationalist Movement — he was <strong>jailed</strong> by the British for his journalism</li>
                <li>But paradoxically, <strong>the more the British tried to silence the press, the more nationalist newspapers emerged</strong> — suppression only fuelled the movement</li>
              </ul>
            </div>
          </div>

          <div className="pcm-pull-quote">
            <p>Every time the British jailed an editor or seized a printing press, ten more newspapers rose in its place. Censorship could not stop an idea whose time had come.</p>
            <cite>— The Nationalist Press of India</cite>
          </div>

          <div className="pcm-divider"><div className="pcm-divider-mark" /></div>

          {/* FAQ */}
          <div className="pcm-faq-header">
            <span className="pcm-faq-kicker">Exam Preparation</span>
          </div>
          <h2 className="pcm-faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, i) => (
            <div className={`pcm-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="pcm-faq-q" onClick={() => toggle(i)}>
                <span className="pcm-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="pcm-faq-icon">{openIndex === i ? "▴" : "▾"}</span>
              </button>
              <div className={`pcm-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
