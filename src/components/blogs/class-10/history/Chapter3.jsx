import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:      #0d0d1a;
    --ink2:     #1a1a2e;
    --muted:    #5a5a7a;
    --paper:    #f4f4fb;
    --paper2:   #eaeaf5;
    --ocean:    #1a4a7a;
    --ocean2:   #0f3560;
    --ocean-lt: #e3eef8;
    --teal:     #0d7377;
    --teal2:    #094e52;
    --amber:    #c47c00;
    --amber2:   #9a6000;
    --rule:     #c8c8e0;
    --red:      #8b1a1a;
    --rust:     #a0522d;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .mgw-root {
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
  }

  /* ─────────────────────────────────────────
     HERO — deep ocean night
  ───────────────────────────────────────── */
  .mgw-hero {
    background: linear-gradient(135deg, #040812 0%, #060d1f 50%, #040c14 100%);
    min-height: 88vh;
    display: flex;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
    padding: 0 0 64px;
  }
  .mgw-hero-bg-num {
    position: absolute;
    bottom: -40px;
    right: -20px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(240px, 38vw, 520px);
    font-weight: 900;
    line-height: 1;
    color: rgba(255,255,255,0.025);
    letter-spacing: -0.04em;
    user-select: none;
    pointer-events: none;
  }
  /* Horizontal teal rule at top */
  .mgw-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 5px;
    background: linear-gradient(90deg, #0d7377, #14a3a8, #0d7377);
  }
  /* Globe grid watermark */
  .mgw-globe-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.03);
    pointer-events: none;
  }
  .mgw-hero-inner {
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding: 0 32px;
    position: relative;
    z-index: 1;
  }
  .mgw-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #14a3a8;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .mgw-overline::before,
  .mgw-overline::after {
    content: '';
    flex: 0 0 40px;
    height: 1px;
    background: #14a3a8;
  }
  .mgw-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(40px, 7.5vw, 84px);
    font-weight: 900;
    color: #fff;
    line-height: 0.95;
    letter-spacing: -0.03em;
    margin-bottom: 32px;
  }
  .mgw-hero-title em {
    font-style: normal;
    color: #14a3a8;
  }
  .mgw-hero-title .amber-em {
    color: #f5a623;
  }
  .mgw-hero-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 24px;
    margin-top: 8px;
  }
  .mgw-hero-bar-item {
    flex: 1 1 160px;
    padding: 0 24px 0 0;
    border-right: 1px solid rgba(255,255,255,0.1);
    margin-right: 24px;
  }
  .mgw-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .mgw-bar-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 5px;
  }
  .mgw-bar-value {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 600;
    color: rgba(255,255,255,0.75);
  }

  /* ─────────────────────────────────────────
     BODY WRAPPER
  ───────────────────────────────────────── */
  .mgw-body {
    max-width: 860px;
    margin: 0 auto;
    padding: 72px 32px 96px;
  }

  /* ─────────────────────────────────────────
     LEAD INTRO
  ───────────────────────────────────────── */
  .mgw-lead {
    border-left: 5px solid var(--teal);
    padding: 28px 36px;
    margin-bottom: 64px;
    background: var(--paper2);
  }
  .mgw-lead p {
    font-family: 'Poppins', sans-serif;
    font-size: 19px; font-weight: 500;
    color: var(--ink2);
    line-height: 1.78;
    margin: 0 0 14px;
  }
  .mgw-lead p:last-child { margin: 0; }
  .mgw-lead strong { color: var(--teal); }

  /* ─────────────────────────────────────────
     DEFINITION BOX
  ───────────────────────────────────────── */
  .mgw-def-box {
    background: var(--ink);
    padding: 32px 36px;
    margin-bottom: 48px;
    border-top: 4px solid var(--teal);
  }
  .mgw-def-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #14a3a8;
    margin-bottom: 10px;
  }
  .mgw-def-term {
    font-family: 'Montserrat', sans-serif;
    font-size: 26px; font-weight: 900;
    color: #fff;
    letter-spacing: -0.02em;
    margin-bottom: 14px;
  }
  .mgw-def-text {
    font-family: 'Inter', sans-serif;
    font-size: 17px; font-weight: 400;
    color: rgba(255,255,255,0.72);
    line-height: 1.8;
  }
  .mgw-def-text strong { color: #14a3a8; font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ─────────────────────────────────────────
     SECTION HEADER
  ───────────────────────────────────────── */
  .mgw-sec-head {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 28px;
    border-bottom: 2px solid var(--rule);
    padding-bottom: 18px;
  }
  .mgw-sec-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 56px; font-weight: 900;
    color: var(--rule);
    line-height: 1;
    flex-shrink: 0;
    margin-top: 4px;
  }
  .mgw-sec-kicker {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--teal);
    margin-bottom: 4px;
  }
  .mgw-sec-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(22px, 3.5vw, 32px); font-weight: 900;
    color: var(--ink);
    line-height: 1.15;
    letter-spacing: -0.01em;
  }
  .mgw-sec-title span { color: var(--teal); }
  .mgw-sec-title .amber { color: var(--amber); }
  .mgw-sec-title .red   { color: var(--red); }
  .mgw-sec-title .ocean { color: var(--ocean); }

  /* ─────────────────────────────────────────
     BODY TEXT
  ───────────────────────────────────────── */
  .mgw-body-text {
    font-family: 'Inter', sans-serif;
    font-size: 17px; font-weight: 400;
    color: #1a1a2e;
    line-height: 1.82;
    margin-bottom: 24px;
  }
  .mgw-body-text strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ─────────────────────────────────────────
     PULL QUOTE
  ───────────────────────────────────────── */
  .mgw-pull-quote {
    margin: 40px 0;
    padding: 32px 40px;
    background: var(--ink);
    position: relative;
  }
  .mgw-pull-quote::before {
    content: '"';
    position: absolute;
    top: -18px; left: 28px;
    font-family: 'Montserrat', sans-serif;
    font-size: 120px; font-weight: 900;
    color: #14a3a8;
    line-height: 1;
  }
  .mgw-pull-quote p {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(17px, 2.4vw, 22px); font-weight: 800;
    color: #fff;
    line-height: 1.45;
    letter-spacing: -0.01em;
    position: relative; z-index: 1;
    margin-bottom: 12px;
  }
  .mgw-pull-quote cite {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 600;
    color: #14a3a8;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-style: normal;
  }

  /* ─────────────────────────────────────────
     BULLET LIST
  ───────────────────────────────────────── */
  .mgw-list {
    margin: 0 0 28px;
    padding: 0;
    list-style: none;
  }
  .mgw-list li {
    font-size: 16px; line-height: 1.78;
    color: #1a1a2e;
    padding: 10px 0 10px 28px;
    position: relative;
    border-bottom: 1px solid var(--rule);
  }
  .mgw-list li:first-child { border-top: 1px solid var(--rule); }
  .mgw-list li::before {
    content: '';
    position: absolute;
    left: 0; top: 18px;
    width: 10px; height: 10px;
    border: 2px solid var(--teal);
    transform: rotate(45deg);
    flex-shrink: 0;
  }
  .mgw-list li strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ─────────────────────────────────────────
     THREE FLOWS — horizontal stat strip
  ───────────────────────────────────────── */
  .mgw-flows {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2px;
    margin-bottom: 48px;
    background: var(--rule);
  }
  @media (max-width: 580px) { .mgw-flows { grid-template-columns: 1fr; } }
  .mgw-flow-card {
    background: var(--paper);
    padding: 32px 28px;
    text-align: center;
  }
  .mgw-flow-icon {
    font-size: 40px;
    margin-bottom: 14px;
    display: block;
  }
  .mgw-flow-name {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px; font-weight: 900;
    color: var(--teal);
    margin-bottom: 10px;
    letter-spacing: -0.01em;
  }
  .mgw-flow-desc {
    font-family: 'Inter', sans-serif;
    font-size: 15px; line-height: 1.72;
    color: #374151;
  }
  .mgw-flow-desc strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ink); }

  /* ─────────────────────────────────────────
     TIMELINE
  ───────────────────────────────────────── */
  .mgw-timeline {
    margin-bottom: 48px;
  }
  .mgw-tl-item {
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 0;
    border-bottom: 1px solid var(--rule);
  }
  .mgw-tl-item:first-child { border-top: 1px solid var(--rule); }
  .mgw-tl-year-col {
    padding: 20px 20px 20px 0;
    border-right: 2px solid var(--teal);
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
  }
  .mgw-tl-year {
    font-family: 'Montserrat', sans-serif;
    font-size: 15px; font-weight: 900;
    color: var(--teal);
    text-align: right;
    line-height: 1.25;
  }
  .mgw-tl-content {
    padding: 20px 0 20px 24px;
  }
  .mgw-tl-head {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; font-weight: 700;
    color: var(--ink);
    margin-bottom: 8px;
  }
  .mgw-tl-desc {
    font-size: 15px; line-height: 1.74;
    color: #374151;
  }
  .mgw-tl-desc strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ─────────────────────────────────────────
     TWO-COLUMN CARD GRID
  ───────────────────────────────────────── */
  .mgw-card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    margin-bottom: 48px;
    background: var(--rule);
  }
  @media (max-width: 580px) { .mgw-card-grid { grid-template-columns: 1fr; } }
  .mgw-card {
    background: var(--paper);
    padding: 28px 28px;
  }
  .mgw-card.dark { background: var(--ink); }
  .mgw-card.ocean-bg { background: var(--ocean); }
  .mgw-card-tag {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--teal);
    margin-bottom: 8px;
  }
  .mgw-card.dark .mgw-card-tag,
  .mgw-card.ocean-bg .mgw-card-tag { color: #14a3a8; }
  .mgw-card-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px; font-weight: 900;
    margin-bottom: 14px;
    letter-spacing: -0.01em;
    line-height: 1.2;
  }
  .mgw-card:not(.dark):not(.ocean-bg) .mgw-card-title { color: var(--ink); }
  .mgw-card.dark .mgw-card-title { color: #fff; }
  .mgw-card.ocean-bg .mgw-card-title { color: #fff; }
  .mgw-card ul { padding-left: 18px; margin: 0; }
  .mgw-card ul li {
    font-size: 15px; line-height: 1.74; margin-bottom: 7px;
  }
  .mgw-card:not(.dark):not(.ocean-bg) ul li { color: #374151; }
  .mgw-card.dark ul li { color: rgba(255,255,255,0.76); }
  .mgw-card.ocean-bg ul li { color: rgba(255,255,255,0.8); }
  .mgw-card ul li strong { font-family: 'Poppins', sans-serif; font-weight: 700; }
  .mgw-card:not(.dark):not(.ocean-bg) ul li strong { color: var(--ink); }
  .mgw-card.dark ul li strong { color: #14a3a8; }
  .mgw-card.ocean-bg ul li strong { color: #f5a623; }
  .mgw-card p {
    font-size: 15px; line-height: 1.74; margin-bottom: 8px;
  }
  .mgw-card:not(.dark):not(.ocean-bg) p { color: #374151; }
  .mgw-card.dark p { color: rgba(255,255,255,0.76); }
  .mgw-card.ocean-bg p { color: rgba(255,255,255,0.8); }
  .mgw-card p:last-child { margin: 0; }
  .mgw-card p strong { font-family: 'Poppins', sans-serif; font-weight: 700; }
  .mgw-card:not(.dark):not(.ocean-bg) p strong { color: var(--ink); }
  .mgw-card.dark p strong { color: #14a3a8; }

  /* ─────────────────────────────────────────
     INFO TABLE
  ───────────────────────────────────────── */
  .mgw-table-wrap {
    margin-bottom: 48px;
    border: 1px solid var(--rule);
  }
  .mgw-table-title {
    background: var(--ink);
    padding: 14px 24px;
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 700;
    color: #14a3a8;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .mgw-table-row {
    display: grid;
    grid-template-columns: 170px 1fr;
    border-bottom: 1px solid var(--rule);
  }
  .mgw-table-row:last-child { border-bottom: none; }
  .mgw-table-key {
    background: var(--paper2);
    padding: 14px 18px;
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    color: var(--teal2);
    border-right: 1px solid var(--rule);
    display: flex; align-items: center;
  }
  .mgw-table-val {
    padding: 14px 18px;
    font-size: 15px; line-height: 1.68;
    color: #374151;
  }
  .mgw-table-val strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ─────────────────────────────────────────
     STAT / CALLOUT ROW
  ───────────────────────────────────────── */
  .mgw-stat-row {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    margin-bottom: 48px;
    background: var(--rule);
  }
  .mgw-stat-box {
    flex: 1 1 130px;
    background: var(--paper);
    padding: 24px 18px;
    text-align: center;
  }
  .mgw-stat-val {
    font-family: 'Montserrat', sans-serif;
    font-size: 28px; font-weight: 900;
    color: var(--teal);
    line-height: 1.1;
    margin-bottom: 6px;
    letter-spacing: -0.02em;
  }
  .mgw-stat-label {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 600;
    color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.1em;
    line-height: 1.4;
  }

  /* ─────────────────────────────────────────
     NATION / REGION STRIP
  ───────────────────────────────────────── */
  .mgw-nation-strip { margin-bottom: 48px; }
  .mgw-nation-row {
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: 20px;
    align-items: start;
    padding: 22px 0;
    border-bottom: 1px solid var(--rule);
  }
  .mgw-nation-row:first-child { border-top: 1px solid var(--rule); }
  .mgw-nation-flag-col { font-size: 34px; line-height: 1; padding-top: 4px; }
  .mgw-nation-name {
    font-family: 'Montserrat', sans-serif;
    font-size: 19px; font-weight: 900;
    color: var(--ink); margin-bottom: 10px;
    letter-spacing: -0.01em;
  }
  .mgw-nation-row ul { padding-left: 18px; margin: 0; }
  .mgw-nation-row ul li {
    font-size: 15px; line-height: 1.72;
    color: #374151; margin-bottom: 6px;
  }
  .mgw-nation-row ul li strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ─────────────────────────────────────────
     SECTION DIVIDER
  ───────────────────────────────────────── */
  .mgw-divider {
    display: flex; align-items: center; gap: 16px;
    margin: 56px 0;
  }
  .mgw-divider::before,
  .mgw-divider::after {
    content: ''; flex: 1;
    height: 1px; background: var(--rule);
  }
  .mgw-divider-mark {
    width: 10px; height: 10px;
    background: var(--teal);
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  /* ─────────────────────────────────────────
     FAQ
  ───────────────────────────────────────── */
  .mgw-faq-header {
    border-bottom: 3px solid var(--ink);
    padding-bottom: 14px;
    margin-bottom: 0;
    display: flex; align-items: baseline; gap: 16px;
  }
  .mgw-faq-kicker {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--teal);
  }
  .mgw-faq-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(24px, 4vw, 34px); font-weight: 900;
    color: var(--ink);
    letter-spacing: -0.01em;
    margin: 20px 0 32px;
  }
  .mgw-faq-item {
    border-bottom: 1px solid var(--rule);
    overflow: hidden;
  }
  .mgw-faq-item.open { background: var(--paper2); }
  .mgw-faq-q {
    width: 100%; text-align: left;
    background: none; border: none; cursor: pointer;
    padding: 20px 0;
    display: grid;
    grid-template-columns: 1fr 32px;
    gap: 16px; align-items: start;
  }
  .mgw-faq-q-text {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; font-weight: 600;
    color: var(--ink); line-height: 1.5; text-align: left;
    padding-left: 4px;
  }
  .mgw-faq-item.open .mgw-faq-q-text { color: var(--teal2); }
  .mgw-faq-icon {
    width: 28px; height: 28px;
    border: 1.5px solid var(--rule);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; font-weight: 700;
    color: var(--teal);
    transition: transform 0.3s, background 0.2s;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .mgw-faq-item.open .mgw-faq-icon {
    transform: rotate(45deg);
    background: var(--ink);
    border-color: var(--ink);
    color: #14a3a8;
  }
  .mgw-faq-ans {
    display: none;
    padding: 0 4px 22px;
    font-size: 16px; line-height: 1.82; color: #374151;
  }
  .mgw-faq-ans.visible { display: block; }
  .mgw-faq-ans ul { padding-left: 20px; margin: 8px 0; }
  .mgw-faq-ans ul li { margin-bottom: 7px; }
  .mgw-faq-ans strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }
  .mgw-faq-ans p { margin: 0 0 10px; }
  .mgw-faq-ans p:last-child { margin: 0; }

  @media (max-width: 600px) {
    .mgw-hero { min-height: auto; padding: 80px 0 48px; }
    .mgw-tl-item { grid-template-columns: 80px 1fr; }
    .mgw-table-row { grid-template-columns: 120px 1fr; }
    .mgw-stat-box { flex: 1 1 120px; }
  }
`;

const faqs = [
  {
    q: "State the effect of potatoes on the poor population of Europe and the effects of the Great Potato Famine.",
    a: (<>
      <p>Potatoes were a crop that <strong>incredibly transformed the lives of poor Europeans</strong>. They allowed the poor to feed themselves properly and live longer — a vegetable so nutritious that it single-handedly raised living standards for the working poor across the continent.</p>
      <p>However, the <strong>Great Potato Famine of 1846–1849</strong> was catastrophic:</p>
      <ul>
        <li>Irish farmers became <strong>dangerously dependent</strong> on the potato as their primary crop</li>
        <li>When the famine struck, approximately <strong>1,000,000 people died of starvation</strong> between 1845 and 1851 — either from hunger or hunger-related diseases</li>
        <li>A further <strong>1 million Irish people emigrated</strong> to other countries in search of work and food</li>
        <li>Ireland effectively <strong>lost a quarter of its entire population</strong> during these years — one of the most devastating demographic disasters in European history</li>
      </ul>
    </>),
  },
  {
    q: "How was indentured labour the new system of slavery?",
    a: (<>
      <p>The indentured labour system, though officially not called slavery, functioned in deeply similar ways:</p>
      <ul>
        <li><strong>Deception during recruitment:</strong> Poor migrant workers were recruited by agents who gave them <strong>false information</strong> about working and living conditions. Most workers were entirely unaware of the long sea journeys involved</li>
        <li><strong>Bonded contracts:</strong> Workers were under a <strong>strict contract to work for a specific employer</strong> — they had no freedom to choose their employer or leave without facing legal consequences</li>
        <li><strong>Violence and imprisonment:</strong> Workers were <strong>beaten and sometimes imprisoned</strong> for any resistance or refusal to comply</li>
        <li><strong>Terrible living conditions:</strong> On arrival, labourers discovered the <strong>actual harsh working and living conditions</strong> — very different from what they had been promised</li>
        <li>This exploitative system was finally <strong>abolished in 1921</strong></li>
      </ul>
    </>),
  },
  {
    q: "What is the Corn Law?",
    a: (<>
      <p>The <strong>Corn Law was introduced in Britain in 1804</strong>. According to this law:</p>
      <ul>
        <li>The <strong>landowners who dominated the Parliament</strong> used their political power to protect their profits</li>
        <li>A <strong>duty (tax) was imposed on imported corn</strong>, making foreign grain more expensive than domestically grown produce</li>
        <li>This effectively <strong>protected British landowners</strong> from cheaper foreign competition and kept domestic bread prices artificially high</li>
      </ul>
    </>),
  },
  {
    q: "List the effects of the Corn Law.",
    a: (<>
      <p>The Corn Law had wide-ranging consequences on Britain's economy and society:</p>
      <ul>
        <li><strong>Growth in British wheat farming</strong> — and a sharp <strong>hike in bread prices</strong>, making basic food unaffordable for the poor</li>
        <li><strong>Widespread unemployment</strong> in the agricultural industry as the system became unsustainable</li>
        <li><strong>Boosted the rise of the capitalist class</strong> in urban areas — industrialists who wanted cheap food for their workers eventually forced the repeal of the Corn Laws</li>
        <li><strong>Mass migration from agriculture to industry</strong> — unemployed agricultural labourers shifted to the industrial division</li>
        <li>After repeal, <strong>cheap food imports flooded Britain</strong>, and huge areas of agricultural land were left uncultivated, fundamentally changing the rural economy</li>
      </ul>
    </>),
  },
  {
    q: "Name the three flows within international economic exchanges.",
    a: (<>
      <p>Economists and historians identify <strong>three key flows</strong> that powered international economic exchanges:</p>
      <ul>
        <li><strong>Flow of Trade:</strong> The movement of goods — trade in crops, minerals, textiles, and manufactured goods across international borders</li>
        <li><strong>Flow of Labour:</strong> Migration of workers and people looking for employment — from their home countries to foreign lands in search of better opportunities</li>
        <li><strong>Flow of Capital:</strong> The movement of money and investments — both <strong>long-term investments</strong> (building factories, plantations) and <strong>short-term capital flows</strong> across the globe</li>
      </ul>
    </>),
  },
  {
    q: "Why were Europeans attracted to Africa?",
    a: (<>
      <p>Europeans were attracted to Africa for a combination of economic and strategic reasons:</p>
      <ul>
        <li>Africa was extraordinarily rich in <strong>mineral resources and vast, fertile land</strong> that Europeans wanted to exploit</li>
        <li>Europeans established <strong>multiple plantations and mines</strong>, extracting resources and importing the profits back to Europe</li>
        <li>The <strong>Rinderpest cattle plague of the 1880s</strong> had already destroyed more than half of African communities' livelihoods — mine owners and colonial governments then <strong>monopolised what remained of the cattle</strong>, forcing the indigenous African population into the labour market</li>
        <li>Africa had a <strong>comparatively weak military</strong> and could not effectively resist the superior British and European military forces</li>
        <li>The destruction of African self-sufficiency created a <strong>captive labour force</strong> that served European colonial economic interests</li>
      </ul>
    </>),
  },
  {
    q: "How was Britain economically affected after the First World War?",
    a: (<>
      <p>The First World War left Britain economically devastated in multiple ways:</p>
      <ul>
        <li>Britain had <strong>borrowed heavily from the United States</strong> to fund the war — leaving it burdened with <strong>massive external debts</strong> after the war ended</li>
        <li>The war <strong>severely shook Britain's position in the Indian market</strong> — with the rise of anti-British sentiment in India, <strong>Indian industries were actively promoted</strong> while British industries were damaged</li>
        <li><strong>Widespread unemployment</strong> and sharp declines in both industrial and agricultural production were observed</li>
        <li>Britain could no longer compete with the growing industrial powers of <strong>Japan, the USA, and Germany</strong></li>
        <li>Britain went from being the world's largest creditor nation to a <strong>debtor nation</strong> — a historic shift in the global economic order</li>
      </ul>
    </>),
  },
  {
    q: "How did food items facilitate long-distance cultural exchanges?",
    a: (<>
      <p>Food has been one of the most powerful vehicles of cultural exchange throughout history:</p>
      <ul>
        <li>Travellers and traders introduced <strong>new crops and food items</strong> as they moved across continents and cultures</li>
        <li>It is popularly believed that <strong>noodles travelled from China</strong> and were eventually transformed into <strong>Spaghetti in Italy</strong></li>
        <li>Arab traders are credited with <strong>introducing pasta to Sicily</strong>, an island in Italy — demonstrating how Arab-European trade shaped European cuisine</li>
        <li>Foods like <strong>potatoes, soya, groundnuts, maize, tomatoes, and chillies</strong> from the Americas were introduced to Europe and Asia through the Columbian Exchange after 1492</li>
        <li>These food exchanges were inseparable from <strong>broader cultural, religious, and commercial exchanges</strong> — trade routes were also culture routes</li>
      </ul>
    </>),
  },
  {
    q: "What is NIEO?",
    a: (<>
      <p><strong>NIEO stands for New International Economic Order.</strong></p>
      <ul>
        <li>It was demanded by the <strong>G-77 group — a coalition of 77 developing countries</strong></li>
        <li>The G-77 nations sought complete control over their <strong>national resources, raw materials, and indigenously manufactured goods</strong></li>
        <li>NIEO was meant to establish a new global economic system that gave developing nations <strong>fair and equitable access</strong> to international markets</li>
        <li>It was supported by <strong>NAM (Non-Aligned Movement) and the UNO</strong> as most Asian and African countries gained independence and sought economic sovereignty</li>
        <li>The demand arose because the existing post-war economic order was seen as heavily biased towards the <strong>already wealthy industrialised nations</strong></li>
      </ul>
    </>),
  },
  {
    q: "Which crop grown in India was exported by the British to China?",
    a: (<>
      <p><strong>Opium</strong> was the crop grown in India and exported to China by the British.</p>
      <ul>
        <li>Opium was <strong>widely cultivated across India</strong> under British colonial agricultural policy</li>
        <li>The British <strong>exported opium to China</strong> on a massive scale, creating widespread addiction among the Chinese population</li>
        <li>The <strong>money earned through opium exports</strong> was then used to <strong>finance the import of tea and other goods from China</strong> — funding Britain's enormous appetite for Chinese tea</li>
        <li>This created the <strong>infamous triangular trade</strong> between Britain, India, and China — one of the most exploitative economic arrangements in colonial history, and a direct cause of the <strong>Opium Wars</strong></li>
      </ul>
    </>),
  },
];

export default function MakingOfGlobalWorld() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="mgw-root">

        {/* ── HERO ── */}
        <div className="mgw-hero">
          {/* Globe rings */}
          <div className="mgw-globe-ring" style={{width:600,height:600,top:'50%',left:'60%',transform:'translate(-50%,-50%)'}} />
          <div className="mgw-globe-ring" style={{width:400,height:400,top:'50%',left:'60%',transform:'translate(-50%,-50%)'}} />
          <div className="mgw-globe-ring" style={{width:200,height:200,top:'50%',left:'60%',transform:'translate(-50%,-50%)'}} />
          <div className="mgw-hero-bg-num">03</div>
          <div className="mgw-hero-inner">
            <div className="mgw-overline">Class 10 · Social Science · History</div>
            <h1 className="mgw-hero-title">
              The Making of<br />a <em>Global</em><br /><span className="amber-em">World</span>
            </h1>
            <div className="mgw-hero-bar">
              <div className="mgw-hero-bar-item">
                <div className="mgw-bar-label">Subject</div>
                <div className="mgw-bar-value">History</div>
              </div>
              <div className="mgw-hero-bar-item">
                <div className="mgw-bar-label">Chapter</div>
                <div className="mgw-bar-value">Chapter 3</div>
              </div>
              <div className="mgw-hero-bar-item">
                <div className="mgw-bar-label">Period</div>
                <div className="mgw-bar-value">Ancient – 1960s</div>
              </div>
              <div className="mgw-hero-bar-item">
                <div className="mgw-bar-label">FAQs</div>
                <div className="mgw-bar-value">10 Questions</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mgw-body">

          {/* Lead */}
          <div className="mgw-lead">
            <p>Long before the word "globalisation" existed, the world was already deeply connected. <strong>Silk Routes</strong> carried silk and spices across continents. <strong>Ships carried diseases that decimated empires.</strong> Food from the Americas transformed European diets. Silver from Mexico funded Asian trade.</p>
            <p>This chapter traces how the world became one economic system — from <strong>ancient trade routes</strong> to the <strong>Bretton Woods institutions</strong>, through famines, wars, depressions, and the remarkable resilience of ordinary people who kept the world moving.</p>
          </div>

          {/* Globalisation definition */}
          <div className="mgw-def-box">
            <div className="mgw-def-label">Definition</div>
            <div className="mgw-def-term">What is Globalisation?</div>
            <div className="mgw-def-text">
              Globalisation is an <strong>economic system</strong> associated with the free movement of <strong>technology, goods, people, and ideas</strong> across the world. It describes the rapid and increasing interdependence of the world's cultures, populations, and economies — a change generally brought about by <strong>cross-border trade</strong> between different countries. Globalisation integrates national economies with the global economy, increasing the value of the national marketplace and helping countries gain recognition and development.
            </div>
          </div>

          {/* Key Stats */}
          <div className="mgw-stat-row">
            {[
              { val: "15th C", label: "Silk Routes Peak" },
              { val: "1804",   label: "Corn Law Introduced" },
              { val: "1880s",  label: "Rinderpest in Africa" },
              { val: "1914–18",label: "First World War" },
              { val: "1929",   label: "Great Depression Begins" },
              { val: "1921",   label: "Indentured Labour Abolished" },
            ].map((s, i) => (
              <div className="mgw-stat-box" key={i}>
                <div className="mgw-stat-val">{s.val}</div>
                <div className="mgw-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* 1. Silk Routes */}
          <div className="mgw-sec-head">
            <div className="mgw-sec-num">1</div>
            <div className="mgw-sec-title-wrap">
              <div className="mgw-sec-kicker">Ancient Connections</div>
              <h2 className="mgw-sec-title">The <span>Silk Routes</span></h2>
            </div>
          </div>

          <p className="mgw-body-text">
            The Silk Routes were one of the <strong>most important trade and cultural arteries</strong> of the ancient world — linking distant civilisations long before the modern era. These routes existed <strong>before the Christian Era</strong> and thrived to their peak until the <strong>15th century</strong>.
          </p>

          <p className="mgw-body-text">
            Historians have identified <strong>several Silk Routes</strong> — both <strong>land and sea links</strong> — that were used for trading crucial goods like <strong>textiles, precious metals, spices, and ideas</strong>. They were far more than trade routes: they were channels of cultural exchange.
          </p>

          <ul className="mgw-list">
            <li>A <strong>great example of booming pre-modern trade</strong> and the growing cultural relationships between distant places across the world</li>
            <li><strong>Religious preachers</strong> from Buddhism, Christianity, and Islam all travelled through these routes, spreading their faiths</li>
            <li>Knowledge, goods, customs, and crafts were all exchanged — the <strong>Indian subcontinent</strong> was a key hub in this network</li>
            <li>Both <strong>land routes across Central Asia</strong> and <strong>sea routes through the Indian Ocean</strong> formed part of the larger Silk Road network</li>
            <li><strong>Food items like noodles</strong> (from China) and pasta (introduced by Arabs to Sicily) spread across cultures through these very routes</li>
          </ul>

          <div className="mgw-divider"><div className="mgw-divider-mark" /></div>

          {/* 2. Conquest, Trade, Disease */}
          <div className="mgw-sec-head">
            <div className="mgw-sec-num">2</div>
            <div className="mgw-sec-title-wrap">
              <div className="mgw-sec-kicker">The Columbian Exchange</div>
              <h2 className="mgw-sec-title">Conquest, Trade &amp; <span className="red">Disease</span></h2>
            </div>
          </div>

          <p className="mgw-body-text">
            When European powers arrived in the Americas, the world changed forever. The Portuguese and Spanish conquest and the <strong>colonisation of America</strong> set off a chain of economic and biological consequences that reshaped every continent.
          </p>

          <div className="mgw-card-grid">
            <div className="mgw-card dark">
              <div className="mgw-card-tag">Biological Warfare</div>
              <div className="mgw-card-title">The Deadliest Weapon: Smallpox</div>
              <p>The most deadly weapon the Spanish conquerors used was not the sword — it was <strong>smallpox germs</strong>. American original inhabitants had <strong>almost zero immunity</strong> against such diseases, and entire civilisations were wiped out by European pathogens.</p>
            </div>
            <div className="mgw-card">
              <div className="mgw-card-tag">Economic Impact</div>
              <div className="mgw-card-title">Silver, Minerals & Wealth</div>
              <ul>
                <li>America's discovery opened up <strong>vast fertile lands, minerals, and new crops</strong> that paved the way for global change</li>
                <li><strong>Silver and precious metal mines</strong> in Mexico and Peru <strong>dramatically boosted Europe's wealth</strong></li>
                <li>This wealth was used to <strong>fund trade with Asian countries</strong>, fundamentally changing global commerce</li>
                <li>Opium grown in <strong>India was exported to China</strong> by the British — proceeds funded the import of Chinese tea</li>
              </ul>
            </div>
          </div>

          <div className="mgw-divider"><div className="mgw-divider-mark" /></div>

          {/* 3. Three Flows */}
          <div className="mgw-sec-head">
            <div className="mgw-sec-num">3</div>
            <div className="mgw-sec-title-wrap">
              <div className="mgw-sec-kicker">The Engine of Globalisation</div>
              <h2 className="mgw-sec-title">Three <span>Flows</span> of the Global Economy</h2>
            </div>
          </div>

          <p className="mgw-body-text">International economic exchanges are driven by three distinct but interconnected flows. Understanding these is essential to understanding how the global economy works:</p>

          <div className="mgw-flows">
            <div className="mgw-flow-card">
              <span className="mgw-flow-icon">📦</span>
              <div className="mgw-flow-name">Flow of Trade</div>
              <div className="mgw-flow-desc">Trade in <strong>goods, crops, minerals</strong>, and manufactured products across international borders — the most visible form of global connection.</div>
            </div>
            <div className="mgw-flow-card">
              <span className="mgw-flow-icon">👷</span>
              <div className="mgw-flow-name">Flow of Labour</div>
              <div className="mgw-flow-desc"><strong>Migration of workers</strong> and people seeking employment — from indentured labourers shipped to the Caribbean to modern migrants crossing continents.</div>
            </div>
            <div className="mgw-flow-card">
              <span className="mgw-flow-icon">💰</span>
              <div className="mgw-flow-name">Flow of Capital</div>
              <div className="mgw-flow-desc">Movement of money for both <strong>long-term investments</strong> (factories, plantations) and <strong>short-term capital flows</strong> — financing trade and development globally.</div>
            </div>
          </div>

          <div className="mgw-divider"><div className="mgw-divider-mark" /></div>

          {/* 4. 19th Century Britain */}
          <div className="mgw-sec-head">
            <div className="mgw-sec-num">4</div>
            <div className="mgw-sec-title-wrap">
              <div className="mgw-sec-kicker">The Nineteenth Century</div>
              <h2 className="mgw-sec-title">Britain, Corn Laws &amp; <span>Food Trade</span></h2>
            </div>
          </div>

          <p className="mgw-body-text">
            The 19th century saw Britain transformed by industrialisation — and with it came an <strong>enormous population boom</strong> that dramatically increased demand for food grains. The political battles over food imports defined the era.
          </p>

          <div className="mgw-table-wrap">
            <div className="mgw-table-title">🌾 Britain's Food Economy — 19th Century</div>
            {[
              ["Corn Laws (1804)", "Landowners who dominated Parliament imposed duties on imported corn to protect their profits — keeping bread prices artificially high"],
              ["After Repeal", "Cheaper imported food flooded Britain — British agriculture couldn't compete, and vast areas of land were left uncultivated"],
              ["Transport Revolution", "Food was transported via ships and railways — linking distant agricultural regions to British markets"],
              ["Other Imports", "Rubber, cotton, and coal also formed key parts of Britain's import trade alongside food"],
              ["Technology", "Refrigerated ships enabled animals to be butchered and shipped to Europe as frozen meat — revolutionary for global food trade"],
            ].map(([k, v]) => (
              <div className="mgw-table-row" key={k}>
                <div className="mgw-table-key">{k}</div>
                <div className="mgw-table-val">{v}</div>
              </div>
            ))}
          </div>

          <p className="mgw-body-text">The <strong>significant technological inventions of the 19th century</strong> — the telegraph, railways, and steamships — fundamentally transformed the speed and scale of global trade. The invention of the <strong>refrigerated ship</strong> was particularly revolutionary: for the first time, meat could be butchered at the source and shipped in frozen form to distant markets in Europe.</p>

          <div className="mgw-divider"><div className="mgw-divider-mark" /></div>

          {/* 5. Rinderpest & Africa */}
          <div className="mgw-sec-head">
            <div className="mgw-sec-num">5</div>
            <div className="mgw-sec-title-wrap">
              <div className="mgw-sec-kicker">Africa & Colonial Exploitation</div>
              <h2 className="mgw-sec-title">Rinderpest &amp; <span className="amber">Africa</span></h2>
            </div>
          </div>

          <p className="mgw-body-text">
            Africa in the late 19th century became a target of European colonial ambition — attracted by its abundant <strong>minerals and land resources</strong>. The continent's tragedy was compounded by a catastrophic disease that destroyed African self-sufficiency and forced its people into colonial labour markets.
          </p>

          <div className="mgw-card-grid">
            <div className="mgw-card">
              <div className="mgw-card-tag">Cattle Plague · 1880s</div>
              <div className="mgw-card-title">Rinderpest</div>
              <ul>
                <li>Rinderpest was a <strong>deadly and rapidly spreading cattle plague</strong> that swept across Africa in the 1880s</li>
                <li>It was carried by <strong>infected cattle imported from British Asia</strong></li>
                <li>The plague <strong>devastated more than half of African communities' livelihoods</strong>, which were built around cattle farming</li>
                <li>Mine and plantation owners, along with colonial governments, <strong>monopolised what remained of the cattle</strong> — forcing the African population into the labour market with no alternatives</li>
              </ul>
            </div>
            <div className="mgw-card dark">
              <div className="mgw-card-tag">Colonial Exploitation</div>
              <div className="mgw-card-title">Why Europeans Came to Africa</div>
              <ul>
                <li>Attracted by <strong>rich mineral resources</strong> and vast, fertile land</li>
                <li>Europeans established <strong>plantations and mines</strong>, shipping extracted resources back to Europe</li>
                <li>Africa's comparatively <strong>weak military</strong> could not resist the superior British and European armed forces</li>
                <li>The destruction of African self-sufficiency created a <strong>captive and controlled labour force</strong> — a deliberate colonial strategy</li>
              </ul>
            </div>
          </div>

          <div className="mgw-divider"><div className="mgw-divider-mark" /></div>

          {/* 6. Indentured Labour */}
          <div className="mgw-sec-head">
            <div className="mgw-sec-num">6</div>
            <div className="mgw-sec-title-wrap">
              <div className="mgw-sec-kicker">Labour Migration from India</div>
              <h2 className="mgw-sec-title">Indentured <span>Labour</span> — The New Slavery</h2>
            </div>
          </div>

          <p className="mgw-body-text">
            <strong>Indentured labour</strong> referred to a bonded labourer who was under a strict contract to work for a particular employer. In practice, it was slavery by another name — a system of deception, coercion, and exploitation that stripped workers of their rights and freedom.
          </p>

          <div className="mgw-nation-strip">
            {[
              { flag: "🇬🇾", name: "Guyana & Caribbean Islands", points: [<>Indian indentured labourers were widely recruited to work in <strong>Guyana, the Caribbean islands, Surinam, Fiji, and Mauritius</strong></>, <>Recruitment was done by <strong>deceiving workers</strong> — false promises of good wages and conditions</>, <>On arrival, labourers discovered the <strong>actual harsh working and living conditions</strong> — nothing like what they had been told</>, <>Workers were <strong>beaten, imprisoned, and had no legal recourse</strong> against their employers</>] },
              { flag: "🇮🇳", name: "India — The Source of Labour", points: [<>Indian workers were among the <strong>most heavily recruited</strong> for indentured labour schemes across the British Empire</>, <>Agents <strong>falsely presented working conditions</strong>, leaving most workers unaware of the long sea journeys they would face</>, <>The poverty and lack of economic opportunity in India made workers <strong>vulnerable to deception</strong></>, <>This form of bonded labour was finally <strong>abolished in 1921</strong>, following years of sustained protest and advocacy</>] },
            ].map((n, i) => (
              <div className="mgw-nation-row" key={i}>
                <div className="mgw-nation-flag-col">{n.flag}</div>
                <div>
                  <div className="mgw-nation-name">{n.name}</div>
                  <ul>{n.points.map((p, j) => <li key={j}>{p}</li>)}</ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mgw-divider"><div className="mgw-divider-mark" /></div>

          {/* 7. First World War & Inter-War */}
          <div className="mgw-sec-head">
            <div className="mgw-sec-num">7</div>
            <div className="mgw-sec-title-wrap">
              <div className="mgw-sec-kicker">1914 – 1939</div>
              <h2 className="mgw-sec-title">The <span className="red">World Wars</span> &amp; Inter-War Economy</h2>
            </div>
          </div>

          <p className="mgw-body-text">
            Over <strong>30 nations declared war between 1914 and 1918</strong>. The majority were on the side of the <strong>Allies</strong> — Serbia, Russia, France, Britain, Italy, and the United States. They were opposed by the <strong>Central Powers</strong> — Germany, Austria-Hungary, Bulgaria, and the Ottoman Empire. Europe was the real epicentre.
          </p>

          <div className="mgw-pull-quote">
            <p>The First World War didn't just destroy lives — it shattered the global economy that had taken a century to build.</p>
            <cite>— The Inter-War Economic Crisis</cite>
          </div>

          <ul className="mgw-list">
            <li>The war led to <strong>mass production of tanks, machine guns, chemical weapons, and aircraft</strong> — transforming warfare forever</li>
            <li><strong>Men of working age were recruited as soldiers</strong> from across the globe — devastating the agricultural and industrial workforce</li>
            <li>Europe experienced <strong>economic hardships and political instability</strong> — which were then compounded by the Second World War just two decades later</li>
            <li><strong>Britain borrowed heavily from the USA</strong> to fund the war — ending the conflict burdened with <strong>massive external debts</strong></li>
            <li>Britain could no longer compete with <strong>Japan, the USA, and Germany</strong> in industrial production</li>
            <li><strong>Indian industries were promoted</strong> as anti-British sentiment rose — further damaging British industrial dominance</li>
          </ul>

          <div className="mgw-divider"><div className="mgw-divider-mark" /></div>

          {/* 8. Great Depression */}
          <div className="mgw-sec-head">
            <div className="mgw-sec-num">8</div>
            <div className="mgw-sec-title-wrap">
              <div className="mgw-sec-kicker">1929 – Mid 1930s</div>
              <h2 className="mgw-sec-title">The <span className="red">Great Depression</span></h2>
            </div>
          </div>

          <p className="mgw-body-text">
            The Great Depression was a period of <strong>catastrophic global economic collapse between 1929 and the mid-1930s</strong>. It was the most severe economic crisis the modern world had ever seen — and its effects reached from American boardrooms to Indian farming villages.
          </p>

          <div className="mgw-card-grid">
            <div className="mgw-card dark">
              <div className="mgw-card-tag">Root Causes</div>
              <div className="mgw-card-title">What Caused the Depression?</div>
              <ul>
                <li><strong>Agricultural overproduction</strong> — too much food supply drove prices down catastrophically</li>
                <li><strong>Disintegration of the US banking system</strong> — many banks went bankrupt, wiping out savings</li>
                <li><strong>Withdrawal of US loans</strong> from multiple countries, triggering global financial cascades</li>
                <li>A combination of these factors created a <strong>self-reinforcing downward spiral</strong> in the global economy</li>
              </ul>
            </div>
            <div className="mgw-card">
              <div className="mgw-card-tag">Global Effects</div>
              <div className="mgw-card-title">Consequences Worldwide</div>
              <ul>
                <li><strong>Huge global decline</strong> in employment, production, trade, and income simultaneously</li>
                <li>The <strong>agricultural sector</strong> was severely affected — prices collapsed, farms failed</li>
                <li>In India, <strong>rates of exports and imports extensively declined</strong> as prices fell sharply</li>
                <li><strong>Bengal jute cultivators</strong> were among the most affected communities in India</li>
                <li>A major <strong>population shift from villages to towns and cities</strong> as rural livelihoods collapsed</li>
              </ul>
            </div>
          </div>

          <div className="mgw-divider"><div className="mgw-divider-mark" /></div>

          {/* 9. Bretton Woods & Post-War */}
          <div className="mgw-sec-head">
            <div className="mgw-sec-num">9</div>
            <div className="mgw-sec-title-wrap">
              <div className="mgw-sec-kicker">The Post-War New Order</div>
              <h2 className="mgw-sec-title"><span>Bretton Woods</span> &amp; Global Institutions</h2>
            </div>
          </div>

          <p className="mgw-body-text">
            After the Second World War ended, the <strong>USA and USSR emerged as the two new superpowers</strong>. To prevent another devastating economic collapse, the world's nations came together to design a new global financial architecture.
          </p>

          <div className="mgw-table-wrap">
            <div className="mgw-table-title">🏛️ Bretton Woods Institutions</div>
            {[
              ["Conference",   "United Nations Monetary and Financial Conference — held at Bretton Woods, New Hampshire, USA"],
              ["World Bank",   "International Bank for Reconstruction and Development (IBRD) — established for post-war reconstruction and development financing"],
              ["IMF",          "International Monetary Fund — founded to handle the external surpluses and deficits of member nations and stabilise currencies"],
              ["Bretton Twins","World Bank and IMF were famously called the 'Bretton Twins' — they commenced operations in 1957"],
              ["Exchange Rate","The system operated on fixed exchange rates — providing stability for international trade and investment"],
            ].map(([k, v]) => (
              <div className="mgw-table-row" key={k}>
                <div className="mgw-table-key">{k}</div>
                <div className="mgw-table-val">{v}</div>
              </div>
            ))}
          </div>

          <div className="mgw-divider"><div className="mgw-divider-mark" /></div>

          {/* 10. Decolonisation & NIEO */}
          <div className="mgw-sec-head">
            <div className="mgw-sec-num">10</div>
            <div className="mgw-sec-title-wrap">
              <div className="mgw-sec-kicker">Independence & Sovereignty</div>
              <h2 className="mgw-sec-title">Decolonisation &amp; <span>NIEO</span></h2>
            </div>
          </div>

          <p className="mgw-body-text">
            In the decades following World War II, most countries in Asia and Africa gained their independence. But political freedom was not enough — newly independent nations also sought <strong>economic sovereignty</strong> and demanded a fairer share of the global economic order.
          </p>

          <ul className="mgw-list">
            <li>Most countries in <strong>Asia and Africa became independent</strong> in the post-war period</li>
            <li><strong>NAM (Non-Aligned Movement) and the UNO</strong> actively supported the independence movements</li>
            <li>Developing countries coordinated themselves into the <strong>G-77 group</strong> — a coalition of 77 developing nations</li>
            <li>The G-77 demanded a <strong>New International Economic Order (NIEO)</strong> — a system giving member countries complete control over their <strong>raw materials, national resources, and indigenously produced goods</strong></li>
            <li>NIEO challenged the existing global economic order dominated by wealthy industrialised nations and sought <strong>equitable access to international markets</strong> for developing countries</li>
          </ul>

          <div className="mgw-pull-quote">
            <p>Globalization is not new. From silk routes to steamships, from indentured labour to the IMF — humanity has always been more connected than it realised.</p>
            <cite>— The Long Arc of Global History</cite>
          </div>

          <div className="mgw-divider"><div className="mgw-divider-mark" /></div>

          {/* FAQ */}
          <div className="mgw-faq-header">
            <span className="mgw-faq-kicker">Exam Preparation</span>
          </div>
          <h2 className="mgw-faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, i) => (
            <div className={`mgw-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="mgw-faq-q" onClick={() => toggle(i)}>
                <span className="mgw-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="mgw-faq-icon">+</span>
              </button>
              <div className={`mgw-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
