import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --gr-wine:      #5c1a2e;
    --gr-wine2:     #3d0f1e;
    --gr-wine3:     #7a2840;
    --gr-wine-lt:   #f5e8ec;
    --gr-wine-md:   #e8c4cc;
    --gr-rose:      #c4627a;
    --gr-rose2:     #a04860;
    --gr-rose-lt:   #fdf0f3;
    --gr-ivory:     #faf6f0;
    --gr-ivory2:    #f2ebe0;
    --gr-ivory3:    #e8ddd0;
    --gr-ink:       #1a0f0a;
    --gr-ink2:      #2e1e18;
    --gr-muted:     #8a6a60;
    --gr-rule:      #e0d0c4;
    --gr-amber:     #c47820;
    --gr-amber-lt:  #fef4e0;
    --gr-teal:      #1a6068;
    --gr-teal-lt:   #e0f0f2;
    --gr-white:     #ffffff;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .gr-root {
    font-family: 'Inter', sans-serif;
    background: var(--gr-ivory);
    color: var(--gr-ink);
    min-height: 100vh;
  }

  /* ══════════════════════════════════════
     HERO — simple top-nav style
  ══════════════════════════════════════ */
  .gr-hero {
    background: var(--gr-wine2);
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    position: relative;
    overflow: hidden;
  }
  .gr-hero::before {
    content: '';
    position: absolute; inset: 0;
    background: repeating-linear-gradient(
      -58deg, transparent, transparent 52px,
      rgba(255,255,255,0.012) 52px, rgba(255,255,255,0.012) 53px
    );
    pointer-events: none;
  }
  .gr-hero-topbar {
    position: absolute; top: 0; left: 0; right: 0;
    height: 5px;
    background: linear-gradient(90deg, var(--gr-wine3), var(--gr-rose), var(--gr-wine3));
  }
  .gr-hero-bg-num {
    position: absolute; bottom: -30px; right: -10px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(200px, 36vw, 460px); font-weight: 900; line-height: 1;
    color: rgba(255,255,255,0.025); letter-spacing: -0.05em;
    user-select: none; pointer-events: none;
  }

  /* Nav */
  .gr-hero-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 28px 52px 0;
    position: relative; z-index: 2;
  }
  .gr-nav-brand {
    font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 900;
    letter-spacing: 0.28em; text-transform: uppercase;
    color: rgba(255,255,255,0.28);
  }
  .gr-nav-pill {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--gr-rose); border: 1px solid rgba(196,98,122,0.42);
    padding: 5px 14px; background: rgba(196,98,122,0.07);
  }

  /* Center */
  .gr-hero-center {
    display: flex; flex-direction: column; justify-content: center;
    padding: 40px 52px 0;
    position: relative; z-index: 2;
  }
  .gr-hero-eyebrow {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.26em; text-transform: uppercase;
    color: var(--gr-rose); margin-bottom: 22px;
    display: flex; align-items: center; gap: 12px;
  }
  .gr-hero-eyebrow::before { content: ''; width: 28px; height: 2px; background: var(--gr-rose); flex-shrink: 0; }

  .gr-hero-h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(32px, 6vw, 96px);
    font-weight: 900; line-height: 0.95;
    letter-spacing: -0.035em; color: #fff;
    margin-bottom: 32px;
    word-break: break-word;
  }

  .gr-hero-deck {
    font-family: 'Inter', sans-serif; font-size: 17px; line-height: 1.74;
    color: rgba(255,255,255,0.46); max-width: 560px; margin-bottom: 48px;
    border-left: 3px solid rgba(196,98,122,0.4); padding-left: 20px;
  }
  .gr-hero-deck strong { color: rgba(255,255,255,0.78); font-weight: 500; }

  /* Stat strip */
  .gr-hero-stats {
    display: grid; grid-template-columns: repeat(4,1fr);
    border-top: 1px solid rgba(255,255,255,0.07);
  }
  .gr-hero-stat {
    padding: 22px 24px;
    border-right: 1px solid rgba(255,255,255,0.06);
  }
  .gr-hero-stat:last-child { border-right: none; }
  .gr-hero-stat-val {
    font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900;
    color: var(--gr-rose); line-height: 1; margin-bottom: 5px;
    letter-spacing: -0.02em;
  }
  .gr-hero-stat-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: rgba(255,255,255,0.22);
  }

  /* Bottom topics bar */
  .gr-hero-bottom {
    padding: 16px 52px;
    display: flex; align-items: center; gap: 0; flex-wrap: wrap;
    border-top: 1px solid rgba(255,255,255,0.05);
    position: relative; z-index: 2;
  }
  .gr-hero-btm-item {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(255,255,255,0.18);
    padding: 4px 18px 4px 0; margin-right: 18px;
    border-right: 1px solid rgba(255,255,255,0.08);
    white-space: nowrap;
  }
  .gr-hero-btm-item:last-child { border-right: none; }

  /* ══════════════════════════════════════
     BODY — asymmetric with sidebar accents
  ══════════════════════════════════════ */
  .gr-body { max-width: 960px; margin: 0 auto; padding: 80px 32px 100px; }

  /* ── TOPIC OPENER — big left label + content ── */
  .gr-topic-opener {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 0;
    margin-bottom: 52px;
    border-left: 5px solid var(--gr-wine);
  }
  .gr-topic-label {
    padding: 0 24px 0 20px;
    display: flex; flex-direction: column;
    justify-content: flex-start; gap: 8px;
    padding-top: 4px;
    border-right: 1px solid var(--gr-rule);
  }
  .gr-topic-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 48px; font-weight: 900;
    color: var(--gr-wine-md); line-height: 1;
    letter-spacing: -0.04em;
  }
  .gr-topic-name {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--gr-wine);
  }
  .gr-topic-content { padding: 0 0 0 32px; }

  /* ── HEADLINE ── */
  .gr-h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(26px, 3.8vw, 42px);
    font-weight: 900; line-height: 1.05;
    letter-spacing: -0.025em; color: var(--gr-ink);
    margin-bottom: 18px;
  }
  .gr-h2 em  { font-style: normal; color: var(--gr-wine3); }
  .gr-h2 .t  { color: var(--gr-teal); }
  .gr-h2 .a  { color: var(--gr-amber); }

  /* ── PROSE ── */
  .gr-prose {
    font-family: 'Inter', sans-serif; font-size: 17px;
    color: var(--gr-ink2); line-height: 1.82; margin-bottom: 24px;
  }
  .gr-prose strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--gr-ink); }

  /* ── DIVIDER ── */
  .gr-div {
    height: 1px; background: var(--gr-rule);
    margin: 56px 0; position: relative;
  }
  .gr-div::after {
    content: '';
    position: absolute; left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    width: 8px; height: 8px; background: var(--gr-wine);
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  }

  /* ── GENDER STATS — dramatic horizontal bar layout ── */
  .gr-gender-stats {
    margin-bottom: 40px;
    border: 1px solid var(--gr-rule);
    overflow: hidden;
  }
  .gr-gs-header {
    background: var(--gr-wine2); color: #fff;
    padding: 14px 24px;
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    display: flex; align-items: center; gap: 10px;
  }
  .gr-gs-row {
    display: grid; grid-template-columns: 180px 1fr auto;
    align-items: center; gap: 16px;
    padding: 14px 24px;
    border-bottom: 1px solid var(--gr-rule);
    background: var(--gr-white);
  }
  .gr-gs-row:last-child { border-bottom: none; }
  .gr-gs-row:nth-child(even) { background: var(--gr-ivory); }
  .gr-gs-label {
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    color: var(--gr-ink2);
  }
  .gr-gs-bar-wrap { position: relative; height: 10px; background: var(--gr-rule); border-radius: 1px; }
  .gr-gs-bar {
    position: absolute; left: 0; top: 0; bottom: 0;
    border-radius: 1px;
  }
  .gr-gs-val {
    font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 900;
    letter-spacing: -0.01em; white-space: nowrap;
  }

  /* ── REPRESENTATION BLOCK — two big numbers side by side ── */
  .gr-repr {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0; margin-bottom: 40px;
    border: 1px solid var(--gr-rule);
  }
  .gr-repr-cell {
    padding: 36px 32px; text-align: center;
    position: relative;
  }
  .gr-repr-cell:first-child {
    border-right: 1px solid var(--gr-rule);
    background: var(--gr-wine);
  }
  .gr-repr-cell:last-child { background: var(--gr-white); }
  .gr-repr-pct {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(52px, 8vw, 80px); font-weight: 900;
    line-height: 1; letter-spacing: -0.04em; margin-bottom: 10px;
  }
  .gr-repr-cell:first-child .gr-repr-pct { color: var(--gr-rose); }
  .gr-repr-cell:last-child .gr-repr-pct { color: var(--gr-wine); }
  .gr-repr-body {
    font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.60;
  }
  .gr-repr-cell:first-child .gr-repr-body { color: rgba(255,255,255,0.60); }
  .gr-repr-cell:last-child .gr-repr-body { color: var(--gr-muted); }
  .gr-repr-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; }
  .gr-repr-cell:first-child .gr-repr-body strong { color: rgba(255,255,255,0.90); }
  .gr-repr-cell:last-child .gr-repr-body strong { color: var(--gr-ink); }
  .gr-repr-tag {
    display: inline-block; margin-top: 14px;
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    padding: 4px 12px;
  }
  .gr-repr-cell:first-child .gr-repr-tag { background: rgba(255,255,255,0.10); color: rgba(255,255,255,0.55); }
  .gr-repr-cell:last-child .gr-repr-tag { background: var(--gr-wine-lt); color: var(--gr-wine); }

  /* ── COMMUNALISM FORMS — horizontal card strip ── */
  .gr-comm-forms {
    margin-bottom: 40px;
    display: flex; flex-direction: column; gap: 0;
    border: 1px solid var(--gr-rule); overflow: hidden;
  }
  .gr-comm-header {
    background: var(--gr-wine2);
    padding: 14px 24px;
    display: flex; align-items: center; gap: 12px;
    font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 900;
    color: #fff; letter-spacing: -0.01em;
  }
  .gr-comm-row {
    display: grid; grid-template-columns: 52px 1fr;
    border-bottom: 1px solid var(--gr-rule);
    background: var(--gr-white);
  }
  .gr-comm-row:last-child { border-bottom: none; }
  .gr-comm-row:nth-child(even) { background: var(--gr-ivory); }
  .gr-comm-icon {
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    border-right: 1px solid var(--gr-rule);
  }
  .gr-comm-text { padding: 14px 18px; }
  .gr-comm-head {
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    color: var(--gr-wine2); margin-bottom: 4px;
  }
  .gr-comm-body {
    font-family: 'Inter', sans-serif; font-size: 13px;
    color: var(--gr-muted); line-height: 1.58;
  }
  .gr-comm-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--gr-ink2); }

  /* ── SECULAR STATE — constitution pillars ── */
  .gr-secular {
    margin-bottom: 40px;
    background: var(--gr-teal);
    overflow: hidden;
  }
  .gr-sec-header {
    padding: 22px 32px;
    border-bottom: 1px solid rgba(255,255,255,0.12);
    display: flex; align-items: center; gap: 16px;
  }
  .gr-sec-icon { font-size: 28px; }
  .gr-sec-title {
    font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900;
    color: #fff; letter-spacing: -0.02em;
  }
  .gr-sec-sub {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.45); margin-top: 3px;
  }
  .gr-sec-pillars {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 1px; background: rgba(255,255,255,0.1);
  }
  .gr-sec-pillar {
    background: rgba(255,255,255,0.07);
    padding: 20px 24px;
    display: flex; gap: 14px; align-items: flex-start;
  }
  .gr-sec-pillar-n {
    font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900;
    color: rgba(255,255,255,0.18); line-height: 1; flex-shrink: 0; margin-top: 2px;
  }
  .gr-sec-pillar-text {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: rgba(255,255,255,0.70); line-height: 1.62;
  }
  .gr-sec-pillar-text strong { color: rgba(255,255,255,0.92); font-weight: 500; font-family: 'Poppins', sans-serif; }

  /* ── CASTE — timeline of change ── */
  .gr-caste-change {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 16px; margin-bottom: 40px;
  }
  .gr-cc-card {
    padding: 28px 26px; border: 1px solid var(--gr-rule);
    background: var(--gr-white); position: relative; overflow: hidden;
  }
  .gr-cc-card:first-child { border-top: 4px solid var(--gr-wine); }
  .gr-cc-card:last-child  { border-top: 4px solid var(--gr-teal); }
  .gr-cc-card::after {
    content: attr(data-icon);
    position: absolute; right: 10px; bottom: -8px;
    font-size: 72px; opacity: 0.06; line-height: 1;
    pointer-events: none;
  }
  .gr-cc-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    margin-bottom: 10px;
  }
  .gr-cc-card:first-child .gr-cc-tag { color: var(--gr-wine3); }
  .gr-cc-card:last-child  .gr-cc-tag { color: var(--gr-teal); }
  .gr-cc-title {
    font-family: 'Montserrat', sans-serif; font-size: 17px; font-weight: 900;
    color: var(--gr-ink); margin-bottom: 10px; letter-spacing: -0.01em;
  }
  .gr-cc-body {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: var(--gr-muted); line-height: 1.66;
  }
  .gr-cc-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--gr-ink2); }

  /* ── CASTE IN POLITICS — 2-column note layout ── */
  .gr-cip {
    margin-bottom: 40px;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1px solid var(--gr-rule);
  }
  .gr-cip-col { padding: 28px 28px; }
  .gr-cip-col:first-child { border-right: 1px solid var(--gr-rule); }
  .gr-cip-head {
    font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 900;
    color: var(--gr-ink); margin-bottom: 16px; letter-spacing: -0.01em;
    padding-bottom: 10px; border-bottom: 2px solid var(--gr-wine);
  }
  .gr-cip-item {
    display: flex; gap: 10px; align-items: flex-start;
    padding: 8px 0; border-bottom: 1px solid var(--gr-rule);
  }
  .gr-cip-item:last-child { border-bottom: none; }
  .gr-cip-bullet {
    width: 6px; height: 6px; background: var(--gr-wine);
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
    flex-shrink: 0; margin-top: 7px;
  }
  .gr-cip-text {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: var(--gr-ink2); line-height: 1.62;
  }
  .gr-cip-text strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--gr-ink); }

  /* ── ALERT ── */
  .gr-alert {
    padding: 16px 22px; margin-bottom: 22px;
    display: flex; gap: 14px; align-items: flex-start;
  }
  .gr-alert.wine   { background: var(--gr-wine-lt);  border-left: 4px solid var(--gr-wine3); }
  .gr-alert.amber  { background: var(--gr-amber-lt); border-left: 4px solid var(--gr-amber); }
  .gr-alert.teal   { background: var(--gr-teal-lt);  border-left: 4px solid var(--gr-teal); }
  .gr-alert-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
  .gr-alert-text {
    font-family: 'Inter', sans-serif; font-size: 15px;
    color: var(--gr-ink2); line-height: 1.66;
  }
  .gr-alert-text strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--gr-ink); }

  /* ── BIG PULL QUOTE ── */
  .gr-pull {
    background: var(--gr-wine2);
    padding: 44px 48px; margin-bottom: 44px;
    position: relative; overflow: hidden;
  }
  .gr-pull::before {
    content: '"';
    position: absolute; left: 20px; top: -10px;
    font-family: 'Georgia', serif; font-size: 140px; line-height: 1;
    color: rgba(255,255,255,0.07); pointer-events: none;
  }
  .gr-pull-q {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(17px, 2.5vw, 23px); font-weight: 800;
    color: #fff; line-height: 1.42; margin-bottom: 14px;
    position: relative; z-index: 1;
  }
  .gr-pull-q em { font-style: normal; color: var(--gr-rose); }
  .gr-pull-attr {
    font-family: 'Inter', sans-serif; font-size: 13px;
    color: rgba(255,255,255,0.38); font-style: normal;
  }

  /* ── FAQ ── */
  .gr-faq-header {
    display: flex; align-items: stretch; gap: 0;
    margin-bottom: 16px;
  }
  .gr-faq-accent { width: 5px; background: var(--gr-wine); flex-shrink: 0; }
  .gr-faq-header-inner {
    background: var(--gr-wine-lt);
    border: 1px solid var(--gr-wine-md); border-left: none;
    padding: 12px 22px;
    display: flex; align-items: center; justify-content: space-between;
    flex: 1;
  }
  .gr-faq-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--gr-wine2);
  }
  .gr-faq-sub {
    font-family: 'Inter', sans-serif; font-size: 12px;
    color: var(--gr-muted); font-style: italic;
  }
  .gr-faq-h2 {
    font-family: 'Montserrat', sans-serif; font-size: 32px; font-weight: 900;
    color: var(--gr-ink); letter-spacing: -0.025em; margin-bottom: 28px;
  }
  .gr-faq-item { border-bottom: 1px solid var(--gr-rule); }
  .gr-faq-item:first-of-type { border-top: 1px solid var(--gr-rule); }
  .gr-faq-item.open { border-left: 3px solid var(--gr-wine); margin-left: -3px; }
  .gr-faq-q {
    width: 100%; display: flex; justify-content: space-between;
    align-items: flex-start; gap: 20px;
    padding: 18px 0 18px 0; background: none; border: none; cursor: pointer; text-align: left;
  }
  .gr-faq-item.open .gr-faq-q { padding-left: 12px; }
  .gr-faq-q-text {
    font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600;
    color: var(--gr-ink2); line-height: 1.45; flex: 1;
  }
  .gr-faq-item.open .gr-faq-q-text { color: var(--gr-wine2); }
  .gr-faq-icon { font-size: 18px; color: var(--gr-wine3); flex-shrink: 0; margin-top: 2px; }
  .gr-faq-ans { max-height: 0; overflow: hidden; transition: max-height 0.34s ease; }
  .gr-faq-ans.open { max-height: 1000px; }
  .gr-faq-ans-inner {
    padding: 2px 0 22px 12px;
    font-family: 'Inter', sans-serif; font-size: 15px;
    color: var(--gr-muted); line-height: 1.80;
  }
  .gr-faq-ans-inner strong { color: var(--gr-ink2); font-family: 'Poppins', sans-serif; font-weight: 600; }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .gr-hero-nav, .gr-hero-center, .gr-hero-bottom { padding-left: 28px; padding-right: 28px; }
    .gr-hero-h1 { font-size: clamp(32px, 5.5vw, 72px); }
  }
  @media (max-width: 700px) {
    .gr-hero-nav, .gr-hero-center, .gr-hero-bottom { padding-left: 22px; padding-right: 22px; }
    .gr-hero-h1 { font-size: clamp(28px, 7vw, 52px); }
    .gr-hero-stats { grid-template-columns: 1fr 1fr; }
    .gr-hero-stat:nth-child(2) { border-right: none; }
    .gr-hero-stat:nth-child(3) { border-top: 1px solid rgba(255,255,255,0.06); }
    .gr-hero-deck { font-size: 15px; max-width: 100%; }
  }
  @media (max-width: 480px) {
    .gr-hero { min-height: auto; }
    .gr-hero-nav { padding: 16px 16px 0; flex-direction: column; align-items: flex-start; gap: 8px; }
    .gr-nav-pill { font-size: 9px; padding: 4px 10px; }
    .gr-hero-center { padding: 24px 16px 0; }
    .gr-hero-h1 { font-size: clamp(26px, 8.5vw, 44px); margin-bottom: 18px; }
    .gr-hero-deck { font-size: 14px; margin-bottom: 24px; padding-left: 14px; }
    .gr-hero-stats { grid-template-columns: 1fr 1fr; }
    .gr-hero-stat { padding: 14px 14px; }
    .gr-hero-stat-val { font-size: 22px; }
    .gr-hero-stat-label { font-size: 9px; }
    .gr-hero-bottom { padding: 12px 16px; gap: 0; }
    .gr-hero-btm-item { font-size: 9px; padding: 3px 10px 3px 0; margin-right: 10px; }
    .gr-body { padding: 48px 18px 72px; }
    .gr-topic-opener { grid-template-columns: 1fr; border-left: none; border-top: 5px solid var(--gr-wine); }
    .gr-topic-label { flex-direction: row; align-items: center; border-right: none; border-bottom: 1px solid var(--gr-rule); padding: 14px 0 14px 18px; gap: 14px; }
    .gr-topic-content { padding: 20px 0 0 0; }
    .gr-caste-change { grid-template-columns: 1fr; }
    .gr-cip { grid-template-columns: 1fr; }
    .gr-cip-col:first-child { border-right: none; border-bottom: 1px solid var(--gr-rule); }
    .gr-repr { grid-template-columns: 1fr; }
    .gr-repr-cell:first-child { border-right: none; border-bottom: 1px solid var(--gr-wine-md); }
    .gr-sec-pillars { grid-template-columns: 1fr; }
    .gr-gs-row { grid-template-columns: 120px 1fr auto; }
  }
`;

const faqs = [
  {
    q: "What is gender division? How does it affect women in India?",
    a: <><strong>Gender division</strong> is the social discrimination that treats women as inferior to men and considers them incapable of performing tasks traditionally reserved for men. It involves a <strong>sexual division of labour</strong> — women are expected to take care of home and family while men dominate public life, especially politics and high-paid employment.<br/><br/>
    In India, gender division affects women in multiple ways:<br/>
    — <strong>Literacy:</strong> Women's literacy rate is only 54% vs 76% for men<br/>
    — <strong>Employment:</strong> Women are severely underrepresented in highly paid jobs<br/>
    — <strong>Wages:</strong> Despite the Equal Wages Act, women are paid less than men for identical work<br/>
    — <strong>Sex ratio:</strong> Sex-selective abortion has reduced the child sex ratio to only 927 girls per 1000 boys<br/>
    — <strong>Violence:</strong> Women face harassment, exploitation and violence in both public and private spheres</>
  },
  {
    q: "What is women's political representation in India? What is being demanded?",
    a: <><strong>Women's representation in Indian politics is extremely low:</strong><br/>
    — Only <strong>10% of Lok Sabha members</strong> are women<br/>
    — In state assemblies, women hold <strong>less than 5%</strong> of seats<br/><br/>
    <strong>What exists:</strong> Under the Panchayati Raj system, <strong>one-third of seats</strong> in panchayats and municipalities are reserved for women — this has been a genuine success in local governance.<br/><br/>
    <strong>What is demanded:</strong> Women's organisations and activists have long demanded that a similar <strong>reservation of at least one-third seats</strong> in the Lok Sabha and State Assemblies be created for women. This proposal has been pending before the government for <strong>more than a decade</strong>, making it one of the longest-pending legislative reforms in India.</>
  },
  {
    q: "What is communalism? What forms does it take in politics?",
    a: <><strong>Communalism</strong> is based on the belief that religion is the primary basis of social community — that all followers of one religion share the same fundamental interests, and that these interests are different from (or in conflict with) followers of other religions.<br/><br/>
    <strong>Forms of communalism in politics:</strong><br/>
    1. <strong>Religious prejudices and stereotypes</strong> — treating followers of other religions as inferior or threatening<br/>
    2. <strong>Majoritarian dominance</strong> — majority community using political power to impose its will on minorities<br/>
    3. <strong>Minority separatism</strong> — minority communities demanding separate political units or special treatment<br/>
    4. <strong>Political mobilisation on religious lines</strong> — appealing to religious emotions to win votes<br/>
    5. <strong>Communal violence</strong> — riots and massacres targeting religious minorities</>
  },
  {
    q: "Why is India called a secular state? What does the Constitution say?",
    a: <><strong>India is a secular state because of four constitutional provisions:</strong><br/><br/>
    1. There is <strong>no official religion</strong> of the Indian State — unlike countries like Pakistan (Islam) or England (Church of England).<br/>
    2. The Constitution gives all individuals and communities the <strong>freedom to profess, practise and propagate any religion</strong> — or to follow no religion at all.<br/>
    3. The Constitution <strong>prohibits discrimination on grounds of religion</strong> — no citizen can be denied rights or opportunities because of their religion.<br/>
    4. The Constitution allows the state to <strong>intervene in religious matters to ensure equality within religious communities</strong> — for example, to abolish discrimination against women within personal law.</>
  },
  {
    q: "What is the caste system? How has it changed in modern India?",
    a: <><strong>The caste system</strong> was a hereditary social hierarchy unique to India, based on the exclusion of 'outcaste' groups and the inhuman practice of untouchability. People were born into a caste and could not change it — their occupation, social status, and rights were all determined by birth.<br/><br/>
    <strong>How caste has weakened:</strong><br/>
    — <strong>Economic development</strong> created new occupations not tied to caste<br/>
    — <strong>Urbanisation</strong> broke down village-level caste enforcement<br/>
    — <strong>Literacy and education</strong> spread awareness of rights<br/>
    — <strong>Occupational mobility</strong> allowed people to move beyond traditional caste occupations<br/>
    — <strong>Weakening of landlords</strong> reduced caste-based power in rural areas<br/>
    — The <strong>Constitution prohibits caste discrimination</strong> and mandates affirmative action<br/><br/>
    However, caste has not disappeared — most people still marry within their caste, and untouchability has not ended completely.</>
  },
  {
    q: "How does caste affect politics in India? (Caste in Politics)",
    a: <><strong>Caste affects Indian politics in several ways:</strong><br/><br/>
    1. <strong>Candidate selection:</strong> When choosing election candidates, parties consider the <strong>caste composition of each constituency</strong> and nominate candidates from dominant castes to secure their votes.<br/>
    2. <strong>Government formation:</strong> Parties ensure that <strong>various castes and tribes are represented</strong> in the cabinet and government.<br/>
    3. <strong>Election appeals:</strong> Parties and candidates directly appeal to <strong>caste sentiment</strong> during elections. Some parties are strongly identified with certain castes.<br/>
    4. <strong>Vote banks:</strong> A caste "vote bank" means a <strong>large proportion of voters from that caste</strong> consistently vote for one party — but it never means all voters.<br/><br/>
    <strong>Important nuance:</strong> No constituency has a single-caste majority — every candidate needs votes from multiple castes to win. This limits purely caste-based politics.</>
  },
  {
    q: "How does politics affect caste? (Politics in Caste)",
    a: <><strong>Politics has also transformed caste</strong> — not just the other way around:<br/><br/>
    1. <strong>Caste groups expand:</strong> To gain more political strength, caste groups actively incorporate neighbouring castes and sub-castes that were previously excluded from them. Political mobilisation has made caste groups more inclusive and fluid.<br/><br/>
    2. <strong>Coalitions form:</strong> Various caste groups enter into political alliances and coalitions with other castes and communities — forcing negotiation, dialogue, and compromise between groups that previously had little interaction.<br/><br/>
    3. <strong>New categories emerge:</strong> Politics has created entirely new political identities like <strong>'backward castes'</strong> and <strong>'forward castes'</strong> — broad umbrella categories that didn't exist in the same political form before.<br/><br/>
    4. <strong>Consciousness raised:</strong> Universal adult franchise and one-person-one-vote has brought a <strong>new political consciousness among low-caste people</strong> — they now know their votes matter.</>
  },
  {
    q: "What is the role of religion in Indian politics? Is religion and politics mixed?",
    a: <>This is a nuanced question. <strong>Gandhi believed religion could never be completely separated from politics</strong> — values, ethics and moral frameworks inevitably inform political choices.<br/><br/>
    The chapter identifies several ways religion legitimately enters politics:<br/>
    — People have the right to express their <strong>needs as members of a religious community</strong> — e.g., demanding protection from communal riots<br/>
    — <strong>Religious minorities</strong> demanding that the government protect their rights is a legitimate political demand<br/>
    — The <strong>women's movement</strong> demanding that family laws of all religions not discriminate against women is a political demand rooted in both religious and gender justice<br/><br/>
    The problem arises when religion is used to <strong>divide people, fuel hatred, or claim political power exclusively for one community</strong>. That is communalism — and it is what India's secular constitution is designed to prevent.</>
  },
];

export default function GenderReligionCaste() {
  const [openIdx, setOpenIdx] = useState(null);
  const tog = (i) => setOpenIdx(openIdx === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="gr-root">

        {/* ══ HERO ══ */}
        <div className="gr-hero">
          <div className="gr-hero-topbar" />
          <div className="gr-hero-bg-num">4</div>

          <div className="gr-hero-nav">
            <div className="gr-nav-brand">Shikshacom · Civics</div>
            <div className="gr-nav-pill">Chapter 4 · Democratic Politics II</div>
          </div>

          <div className="gr-hero-center">
            <div className="gr-hero-eyebrow">CBSE Class 10 · Political Science</div>
            <h1 className="gr-hero-h1">Gender, Religion &amp; Caste</h1>
            <p className="gr-hero-deck">
              Gender, religion and caste are three social realities that deeply shape Indian politics.
              This chapter asks: <strong>when do social identities enrich democracy</strong>, and when do they divide it?
            </p>
            <div className="gr-hero-stats">
              <div className="gr-hero-stat">
                <div className="gr-hero-stat-val">54%</div>
                <div className="gr-hero-stat-label">Women's Literacy Rate</div>
              </div>
              <div className="gr-hero-stat">
                <div className="gr-hero-stat-val">~10%</div>
                <div className="gr-hero-stat-label">Women in Lok Sabha</div>
              </div>
              <div className="gr-hero-stat">
                <div className="gr-hero-stat-val">&lt;5%</div>
                <div className="gr-hero-stat-label">Women in State Assemblies</div>
              </div>
              <div className="gr-hero-stat">
                <div className="gr-hero-stat-val">927</div>
                <div className="gr-hero-stat-label">Child Sex Ratio (per 1000)</div>
              </div>
            </div>
          </div>

          <div className="gr-hero-bottom">
            {["Gender Division","Women in Politics","Religion & Politics","Communalism","Secular State","Caste Inequalities","Caste in Politics"].map(t => (
              <div className="gr-hero-btm-item" key={t}>{t}</div>
            ))}
          </div>
        </div>

        {/* ══ BODY ══ */}
        <div className="gr-body">

          {/* ── TOPIC 1: GENDER ── */}
          <div className="gr-topic-opener">
            <div className="gr-topic-label">
              <div className="gr-topic-num">01</div>
              <div className="gr-topic-name">Gender &amp; Politics</div>
            </div>
            <div className="gr-topic-content">
              <h2 className="gr-h2">Gender Division &amp; <em>Inequality</em></h2>
              <p className="gr-prose">
                <strong>Gender division</strong> refers to the social discrimination that treats women as inferior to men and excludes them from roles considered male preserves. A <strong>sexual division of labour</strong> operates in most societies — women dominate household and caregiving work while men dominate paid employment and public life. Political mobilisation around gender has been crucial in improving women's participation.
              </p>
            </div>
          </div>

          <div className="gr-gender-stats">
            <div className="gr-gs-header">⚡ Gender Inequality — Key Statistics in India</div>
            {[
              { label: "Women's Literacy", w: 54, wc: "#c4627a", wv: "54%", mv: "76% (Men)" },
              { label: "Lok Sabha Seats", w: 10, wc: "#c4627a", wv: "~10%", mv: "~90% (Men)" },
              { label: "State Assembly Seats", w: 5, wc: "#c4627a", wv: "<5%", mv: ">95% (Men)" },
              { label: "Child Sex Ratio (per 1000)", w: 92.7, wc: "#c47820", wv: "927 Girls", mv: "1000 Boys" },
            ].map((r, i) => (
              <div className="gr-gs-row" key={i}>
                <div className="gr-gs-label">{r.label}</div>
                <div className="gr-gs-bar-wrap">
                  <div className="gr-gs-bar" style={{ width: `${r.w}%`, background: r.wc }} />
                </div>
                <div className="gr-gs-val" style={{ color: r.wc }}>{r.wv}</div>
              </div>
            ))}
          </div>

          <div className="gr-alert wine">
            <div className="gr-alert-icon">⚖️</div>
            <div className="gr-alert-text">
              <strong>Equal Wages Act</strong> provides that equal wages must be paid for equal work. Despite this, women are paid less than men in most fields — even when performing the exact same tasks.
            </div>
          </div>

          <div className="gr-repr">
            <div className="gr-repr-cell">
              <div className="gr-repr-pct">~10%</div>
              <div className="gr-repr-body"><strong>Women in Lok Sabha</strong> — out of 543 elected seats, women hold roughly 10%. This is one of the lowest rates among major democracies.</div>
              <div className="gr-repr-tag">Lok Sabha</div>
            </div>
            <div className="gr-repr-cell">
              <div className="gr-repr-pct">&lt;5%</div>
              <div className="gr-repr-body"><strong>Women in State Assemblies</strong> — across all state legislatures, women hold less than 5% of seats. The demand for 1/3 reservation remains pending.</div>
              <div className="gr-repr-tag">State Assemblies</div>
            </div>
          </div>

          <div className="gr-div" />

          {/* ── TOPIC 2: RELIGION ── */}
          <div className="gr-topic-opener">
            <div className="gr-topic-label">
              <div className="gr-topic-num">02</div>
              <div className="gr-topic-name">Religion &amp; Politics</div>
            </div>
            <div className="gr-topic-content">
              <h2 className="gr-h2">When Religion Enters <em>Politics</em></h2>
              <p className="gr-prose">
                Religion and politics are not entirely separate in India. <strong>Gandhi believed religion could never be separated from politics</strong> — and many demands in Indian democracy are expressed through religious identity. The challenge is distinguishing <strong>legitimate religious political expression</strong> from <strong>communalism</strong> — which uses religion to divide and dominate.
              </p>
            </div>
          </div>

          <div className="gr-comm-forms">
            <div className="gr-comm-header">⚠ Five Forms of Communalism in Politics</div>
            {[
              { icon:"🧠", head:"Religious Prejudice & Stereotyping", body:<>Treating followers of other religions through <strong>preconceived stereotypes</strong> and believing one's own religion is superior to all others.</> },
              { icon:"👑", head:"Majoritarian Dominance", body:<>The majority community uses political power to <strong>impose its will</strong> on minorities — favouring its religion, language, and culture in state policy.</> },
              { icon:"✂️", head:"Minority Separatism", body:<>Minority communities, feeling excluded, demand a <strong>separate political unit</strong> or distinct political identity, further deepening divisions.</> },
              { icon:"📢", head:"Political Mobilisation on Religious Lines", body:<>Making <strong>special appeals to emotions of voters of one religion</strong> during elections — prioritising community loyalty over governance issues.</> },
              { icon:"🔥", head:"Communal Violence", body:<>The most extreme form — <strong>riots and massacres</strong> targeting religious communities. Most victims of communal riots are people from religious minorities.</> },
            ].map((r, i) => (
              <div className="gr-comm-row" key={i}>
                <div className="gr-comm-icon">{r.icon}</div>
                <div className="gr-comm-text">
                  <div className="gr-comm-head">{r.head}</div>
                  <div className="gr-comm-body">{r.body}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="gr-secular">
            <div className="gr-sec-header">
              <div className="gr-sec-icon">🏛️</div>
              <div>
                <div className="gr-sec-title">India as a Secular State</div>
                <div className="gr-sec-sub">Four constitutional guarantees</div>
              </div>
            </div>
            <div className="gr-sec-pillars">
              {[
                <><strong>No official religion</strong> — the Indian State has no state religion. No community's faith holds constitutional privilege over any other.</>,
                <><strong>Freedom of religion</strong> — all individuals and communities are free to profess, practise and propagate any religion, or none at all.</>,
                <><strong>No discrimination</strong> — the Constitution prohibits denial of rights or opportunities on the grounds of religion.</>,
                <><strong>State intervention for equality</strong> — the State may intervene in religious practices to ensure equality within religious communities (e.g., women's rights).</>,
              ].map((text, i) => (
                <div className="gr-sec-pillar" key={i}>
                  <div className="gr-sec-pillar-n">{i + 1}</div>
                  <div className="gr-sec-pillar-text">{text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="gr-div" />

          {/* ── TOPIC 3: CASTE ── */}
          <div className="gr-topic-opener">
            <div className="gr-topic-label">
              <div className="gr-topic-num">03</div>
              <div className="gr-topic-name">Caste &amp; Politics</div>
            </div>
            <div className="gr-topic-content">
              <h2 className="gr-h2"><em>Caste</em> — India's Unique Social Division</h2>
              <p className="gr-prose">
                The caste system — unique to India — was a hereditary hierarchy that determined a person's social status, occupation, and rights by birth. The most oppressive aspect was <strong>untouchability</strong>, the exclusion and dehumanisation of the lowest groups. While it is weakening, caste remains a powerful force in Indian society and politics.
              </p>
            </div>
          </div>

          <div className="gr-caste-change">
            <div className="gr-cc-card" data-icon="📉">
              <div className="gr-cc-tag">Why Caste Is Weakening</div>
              <div className="gr-cc-title">Forces Breaking Down Caste</div>
              <div className="gr-cc-body">
                <strong>Economic development</strong> created new jobs not tied to caste. <strong>Urbanisation</strong> broke village-level enforcement. <strong>Education and literacy</strong> spread awareness of rights. <strong>Occupational mobility</strong> freed people from hereditary roles. The <strong>weakening of landlords</strong> removed rural caste enforcers.
              </div>
            </div>
            <div className="gr-cc-card" data-icon="📜">
              <div className="gr-cc-tag">What Still Remains</div>
              <div className="gr-cc-title">Caste Hasn't Disappeared</div>
              <div className="gr-cc-body">
                <strong>Most people still marry within their own caste or tribe.</strong> Untouchability has not ended despite constitutional prohibition. Caste-based discrimination continues in rural areas. <strong>Constitutional protections</strong> and affirmative action exist but cannot fully undo centuries of systemic exclusion.
              </div>
            </div>
          </div>

          <div className="gr-pull">
            <div className="gr-pull-q">
              "Universal adult franchise and the principle of <em>one-person-one-vote</em> brought a new political consciousness among low-caste people. They now know their vote is as powerful as anyone else's."
            </div>
            <div className="gr-pull-attr">— Gender, Religion and Caste, NCERT Class 10</div>
          </div>

          <div className="gr-cip">
            <div className="gr-cip-col">
              <div className="gr-cip-head">Caste in Politics</div>
              {[
                <><strong>Candidate selection</strong> — parties pick candidates based on the caste composition of each constituency.</>,
                <><strong>Government formation</strong> — cabinets are formed to ensure various castes and tribes are represented.</>,
                <><strong>Electoral appeals</strong> — parties directly appeal to caste sentiment during campaigns.</>,
                <><strong>Vote banks</strong> — a large share of one caste votes for the same party, giving it a reliable base.</>,
              ].map((t, i) => (
                <div className="gr-cip-item" key={i}>
                  <div className="gr-cip-bullet" />
                  <div className="gr-cip-text">{t}</div>
                </div>
              ))}
            </div>
            <div className="gr-cip-col">
              <div className="gr-cip-head">Politics in Caste</div>
              {[
                <><strong>Caste groups expand</strong> — incorporate neighbouring sub-castes for greater political strength.</>,
                <><strong>Coalitions form</strong> — caste groups ally with others, forcing negotiation and dialogue.</>,
                <><strong>New categories emerge</strong> — 'backward' and 'forward' caste groups are political creations, not traditional ones.</>,
                <><strong>No single-caste majority</strong> — no constituency is dominated by one caste; every winner must appeal across caste lines.</>,
              ].map((t, i) => (
                <div className="gr-cip-item" key={i}>
                  <div className="gr-cip-bullet" />
                  <div className="gr-cip-text">{t}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="gr-alert teal">
            <div className="gr-alert-icon">✅</div>
            <div className="gr-alert-text">
              <strong>Key insight:</strong> Caste and politics influence each other in both directions — caste shapes how politics works, and political mobilisation changes how caste is understood, organised, and experienced.
            </div>
          </div>

          <div className="gr-div" />

          {/* ── FAQ ── */}
          <div className="gr-faq-header">
            <div className="gr-faq-accent" />
            <div className="gr-faq-header-inner">
              <div className="gr-faq-tag">Exam Preparation · Frequently Asked Questions</div>
              <div className="gr-faq-sub">8 questions covered</div>
            </div>
          </div>
          <h2 className="gr-faq-h2">All You Need to Know</h2>

          {faqs.map((faq, i) => (
            <div className={`gr-faq-item${openIdx === i ? " open" : ""}`} key={i}>
              <button className="gr-faq-q" onClick={() => tog(i)}>
                <span className="gr-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="gr-faq-icon">{openIdx === i ? "▴" : "▾"}</span>
              </button>
              <div className={`gr-faq-ans${openIdx === i ? " open" : ""}`}>
                <div className="gr-faq-ans-inner">{faq.a}</div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
