import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ps-white:   #ffffff;
    --ps-off:     #f7f6f3;
    --ps-light:   #eeecea;
    --ps-rule:    #d6d2cc;
    --ps-ink:     #111111;
    --ps-ink2:    #2a2a2a;
    --ps-muted:   #777066;
    --ps-teal:    #007a6e;
    --ps-teal2:   #005a51;
    --ps-teal-lt: #e0f2f0;
    --ps-amber:   #b45309;
    --ps-amber-lt:#fef3c7;
    --ps-red:     #b91c1c;
    --ps-red-lt:  #fee2e2;
    --ps-sky:     #0369a1;
    --ps-sky-lt:  #e0f2fe;
    --ps-black:   #0a0a0a;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ps-root {
    font-family: 'Inter', sans-serif;
    background: var(--ps-off);
    color: var(--ps-ink);
    min-height: 100vh;
  }

  /* ══════════════════════════════════════
     HERO — full bleed editorial magazine
  ══════════════════════════════════════ */
  .ps-hero {
    background: var(--ps-black);
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    position: relative;
    overflow: hidden;
  }

  /* animated diagonal stripe texture */
  .ps-hero::before {
    content: '';
    position: absolute; inset: 0;
    background: repeating-linear-gradient(
      -55deg,
      transparent,
      transparent 40px,
      rgba(255,255,255,0.012) 40px,
      rgba(255,255,255,0.012) 41px
    );
    pointer-events: none;
  }

  /* teal accent slab — left column */
  .ps-hero-slab {
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: 7px;
    background: var(--ps-teal);
  }

  /* Top nav bar */
  .ps-hero-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 28px 52px 0 52px;
    position: relative; z-index: 2;
  }
  .ps-hero-nav-brand {
    font-family: 'Montserrat', sans-serif;
    font-size: 12px; font-weight: 900;
    letter-spacing: 0.3em; text-transform: uppercase;
    color: rgba(255,255,255,0.3);
  }
  .ps-hero-nav-tag {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--ps-teal);
    border: 1px solid var(--ps-teal);
    padding: 4px 12px;
  }

  /* Center content */
  .ps-hero-center {
    display: flex; flex-direction: column; justify-content: center;
    padding: 0 52px;
    position: relative; z-index: 2;
  }
  .ps-hero-eyebrow {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.28em; text-transform: uppercase;
    color: var(--ps-teal); margin-bottom: 28px;
  }
  .ps-hero-h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(56px, 10vw, 120px);
    font-weight: 900; line-height: 0.88;
    letter-spacing: -0.04em;
    color: var(--ps-white);
    margin-bottom: 40px;
  }
  .ps-hero-h1 .ps-teal-word { color: var(--ps-teal); }

  .ps-hero-deck {
    max-width: 580px;
    font-family: 'Inter', sans-serif;
    font-size: 18px; font-weight: 400;
    line-height: 1.72; color: rgba(255,255,255,0.52);
    border-left: 3px solid var(--ps-teal);
    padding-left: 20px;
    margin-bottom: 52px;
  }
  .ps-hero-deck strong { color: rgba(255,255,255,0.80); font-weight: 500; }

  /* Stat strip in hero */
  .ps-hero-stats {
    display: flex; gap: 0;
    border-top: 1px solid rgba(255,255,255,0.08);
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .ps-hero-stat {
    flex: 1; padding: 22px 28px;
    border-right: 1px solid rgba(255,255,255,0.06);
  }
  .ps-hero-stat:last-child { border-right: none; }
  .ps-hero-stat-val {
    font-family: 'Montserrat', sans-serif;
    font-size: 32px; font-weight: 900; color: var(--ps-white);
    letter-spacing: -0.03em; line-height: 1; margin-bottom: 6px;
  }
  .ps-hero-stat-val span { color: var(--ps-teal); }
  .ps-hero-stat-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(255,255,255,0.28);
  }

  /* Bottom bar */
  .ps-hero-bottom {
    padding: 22px 52px;
    display: flex; align-items: center; gap: 32px;
    border-top: 1px solid rgba(255,255,255,0.06);
    position: relative; z-index: 2;
  }
  .ps-hero-bottom-item {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    display: flex; align-items: center; gap: 8px;
  }
  .ps-hero-bottom-item::before {
    content: ''; width: 4px; height: 4px;
    border-radius: 50%; background: var(--ps-teal); flex-shrink: 0;
  }

  /* ══════════════════════════════════════
     BODY
  ══════════════════════════════════════ */
  .ps-body {
    max-width: 920px; margin: 0 auto;
    padding: 80px 32px 100px;
  }

  /* ── SECTION LABEL (running header style) ── */
  .ps-run-label {
    display: flex; align-items: center; gap: 0;
    margin-bottom: 44px;
    border-top: 3px solid var(--ps-ink);
    padding-top: 14px;
  }
  .ps-run-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px; font-weight: 900;
    letter-spacing: 0.18em;
    color: var(--ps-white); background: var(--ps-ink);
    padding: 4px 10px; margin-right: 16px;
  }
  .ps-run-title {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--ps-muted);
    flex: 1;
  }
  .ps-run-topic {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--ps-teal);
  }

  /* ── BIG SECTION HEADLINE ── */
  .ps-sec-h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(28px, 4.5vw, 48px);
    font-weight: 900; line-height: 1.0;
    letter-spacing: -0.03em; color: var(--ps-ink);
    margin-bottom: 24px;
  }
  .ps-sec-h2 em { font-style: normal; color: var(--ps-teal); }
  .ps-sec-h2 .r { color: var(--ps-red); }
  .ps-sec-h2 .s { color: var(--ps-sky); }

  /* ── BODY PROSE ── */
  .ps-prose {
    font-family: 'Inter', sans-serif;
    font-size: 17px; color: var(--ps-ink2);
    line-height: 1.82; margin-bottom: 28px;
  }
  .ps-prose strong {
    font-family: 'Poppins', sans-serif; font-weight: 700;
    color: var(--ps-ink);
  }

  /* ── COUNTRY PROFILES — asymmetric magazine layout ── */
  .ps-countries {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    margin-bottom: 52px;
    border: 1px solid var(--ps-rule);
  }

  .ps-country {
    padding: 0;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .ps-country:last-child {
    border-left: 1px solid var(--ps-rule);
  }

  .ps-country-flag-bar {
    padding: 22px 28px 14px;
    display: flex; align-items: center; gap: 14px;
  }
  .ps-country-flag { font-size: 36px; line-height: 1; }
  .ps-country-name {
    font-family: 'Montserrat', sans-serif;
    font-size: 22px; font-weight: 900;
    color: var(--ps-ink); letter-spacing: -0.02em; line-height: 1.1;
  }
  .ps-country-status {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    margin-top: 3px;
  }
  .ps-country.success .ps-country-status { color: var(--ps-teal); }
  .ps-country.failure .ps-country-status { color: var(--ps-red); }

  /* Population donut-style visual */
  .ps-pop-visual {
    margin: 0 28px 20px;
    border-top: 1px solid var(--ps-rule);
    padding-top: 16px;
  }
  .ps-pop-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--ps-muted); margin-bottom: 10px;
  }
  .ps-pop-bar {
    height: 8px; border-radius: 2px;
    background: var(--ps-light);
    overflow: hidden; margin-bottom: 8px;
    display: flex;
  }
  .ps-pop-seg {
    height: 100%;
    transition: width 0.4s ease;
  }
  .ps-pop-legend {
    display: flex; flex-wrap: wrap; gap: 6px 16px;
    margin-top: 10px;
  }
  .ps-pop-item {
    display: flex; align-items: center; gap: 6px;
    font-family: 'Inter', sans-serif; font-size: 12px; color: var(--ps-ink2);
  }
  .ps-pop-dot {
    width: 8px; height: 8px; border-radius: 1px; flex-shrink: 0;
  }
  .ps-pop-pct {
    font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 900;
  }

  .ps-country-facts {
    padding: 0 28px 28px;
    flex: 1;
  }
  .ps-fact-row {
    display: flex; justify-content: space-between; align-items: flex-start;
    padding: 10px 0;
    border-bottom: 1px solid var(--ps-light);
    gap: 12px;
  }
  .ps-fact-row:last-child { border-bottom: none; }
  .ps-fact-key {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700;
    color: var(--ps-muted); flex-shrink: 0; padding-top: 1px;
  }
  .ps-fact-val {
    font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ps-ink2);
    line-height: 1.55; text-align: right; flex: 1;
  }
  .ps-fact-val strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ps-ink); }

  /* verdict banner */
  .ps-country-verdict {
    padding: 12px 20px;
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    display: flex; align-items: center; gap: 8px;
  }
  .ps-country.success .ps-country-verdict { background: var(--ps-teal2); color: #fff; }
  .ps-country.failure .ps-country-verdict { background: var(--ps-red); color: #fff; }

  /* ── SECTION BREAK ── */
  .ps-break {
    display: flex; align-items: center; gap: 0;
    margin: 60px 0;
  }
  .ps-break-line { flex: 1; height: 1px; background: var(--ps-rule); }
  .ps-break-pill {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--ps-muted); background: var(--ps-light);
    padding: 5px 16px; margin: 0 16px;
  }

  /* ── LARGE PULLOUT QUOTE — stark editorial ── */
  .ps-editorial {
    padding: 48px 0; margin-bottom: 52px;
    border-top: 3px solid var(--ps-ink);
    border-bottom: 1px solid var(--ps-rule);
  }
  .ps-editorial-q {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(22px, 3.5vw, 36px);
    font-weight: 900; line-height: 1.18;
    letter-spacing: -0.02em; color: var(--ps-ink);
    margin-bottom: 18px;
  }
  .ps-editorial-q em { font-style: normal; color: var(--ps-teal); }
  .ps-editorial-attr {
    font-family: 'Inter', sans-serif; font-size: 13px;
    color: var(--ps-muted); letter-spacing: 0.02em;
  }

  /* ── WHY POWER SHARING — big number layout ── */
  .ps-why-grid {
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    gap: 1px; background: var(--ps-rule);
    margin-bottom: 52px;
  }
  .ps-why-card {
    background: var(--ps-white);
    padding: 36px 28px;
    position: relative; overflow: hidden;
  }
  .ps-why-card::before {
    content: attr(data-n);
    position: absolute; bottom: -12px; right: -4px;
    font-family: 'Montserrat', sans-serif;
    font-size: 96px; font-weight: 900;
    color: rgba(0,0,0,0.04); line-height: 1;
    pointer-events: none; user-select: none;
  }
  .ps-why-card:first-child { background: var(--ps-teal2); }
  .ps-why-icon { font-size: 24px; margin-bottom: 18px; }
  .ps-why-head {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px; font-weight: 900;
    letter-spacing: -0.01em; margin-bottom: 10px; line-height: 1.25;
  }
  .ps-why-card:first-child .ps-why-head { color: #fff; }
  .ps-why-card:not(:first-child) .ps-why-head { color: var(--ps-ink); }
  .ps-why-body {
    font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.68;
  }
  .ps-why-card:first-child .ps-why-body { color: rgba(255,255,255,0.72); }
  .ps-why-card:not(:first-child) .ps-why-body { color: var(--ps-muted); }

  /* ── FORMS OF POWER SHARING — horizontal runway ── */
  .ps-forms {
    margin-bottom: 52px;
  }
  .ps-forms-intro {
    display: flex; align-items: flex-start; gap: 28px;
    margin-bottom: 32px;
  }
  .ps-forms-big {
    font-family: 'Montserrat', sans-serif;
    font-size: 72px; font-weight: 900;
    color: var(--ps-light); line-height: 1; flex-shrink: 0;
    letter-spacing: -0.04em;
  }
  .ps-forms-intro-text {
    font-family: 'Inter', sans-serif;
    font-size: 17px; color: var(--ps-ink2); line-height: 1.78;
    padding-top: 12px;
  }
  .ps-forms-intro-text strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ps-ink); }

  /* Form cards — left-thick-border style, all different */
  .ps-form-card {
    display: grid; grid-template-columns: 6px 1fr;
    margin-bottom: 12px; background: var(--ps-white);
    border: 1px solid var(--ps-rule);
  }
  .ps-form-accent { grid-row: 1; }
  .ps-form-content { padding: 24px 28px; }
  .ps-form-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    margin-bottom: 8px;
  }
  .ps-form-title {
    font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 900;
    color: var(--ps-ink); margin-bottom: 9px; letter-spacing: -0.01em;
  }
  .ps-form-desc {
    font-family: 'Inter', sans-serif; font-size: 15px;
    color: var(--ps-ink2); line-height: 1.70;
  }
  .ps-form-desc strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ps-ink); }
  .ps-form-example {
    margin-top: 10px; padding: 8px 14px;
    font-family: 'Inter', sans-serif; font-size: 13px;
    color: var(--ps-muted); font-style: italic;
    border-left: 2px solid var(--ps-rule);
  }

  /* ── BELGIUM MODEL — detailed block ── */
  .ps-belgium {
    margin-bottom: 52px;
  }
  .ps-belgium-header {
    background: var(--ps-ink); color: var(--ps-white);
    padding: 28px 32px;
    display: flex; align-items: flex-start; justify-content: space-between; gap: 24px;
  }
  .ps-belgium-flag-big { font-size: 52px; line-height: 1; }
  .ps-belgium-header-text { flex: 1; }
  .ps-belgium-header-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--ps-teal); margin-bottom: 6px;
  }
  .ps-belgium-header-title {
    font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900;
    color: var(--ps-white); letter-spacing: -0.02em; line-height: 1.15;
  }
  .ps-belgium-header-sub {
    margin-top: 8px; font-family: 'Inter', sans-serif;
    font-size: 14px; color: rgba(255,255,255,0.48); line-height: 1.5;
  }

  .ps-belgium-body {
    border: 1px solid var(--ps-rule); border-top: none;
    background: var(--ps-white);
  }
  .ps-bel-row {
    display: grid; grid-template-columns: 200px 1fr;
    border-bottom: 1px solid var(--ps-light);
  }
  .ps-bel-row:last-child { border-bottom: none; }
  .ps-bel-key {
    padding: 18px 20px; background: var(--ps-off);
    border-right: 1px solid var(--ps-rule);
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700;
    color: var(--ps-teal2); display: flex; align-items: flex-start;
    gap: 8px;
  }
  .ps-bel-key-icon { font-size: 16px; flex-shrink: 0; }
  .ps-bel-val {
    padding: 18px 24px;
    font-family: 'Inter', sans-serif; font-size: 15px;
    color: var(--ps-ink2); line-height: 1.68;
  }
  .ps-bel-val strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ps-ink); }

  /* ── SRI LANKA — warning/danger editorial block ── */
  .ps-srilanka {
    margin-bottom: 52px;
  }
  .ps-sl-header {
    background: var(--ps-red); padding: 28px 32px;
    display: flex; align-items: flex-start; justify-content: space-between; gap: 24px;
  }
  .ps-sl-header-text { flex: 1; }
  .ps-sl-header-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(255,255,255,0.55); margin-bottom: 6px;
  }
  .ps-sl-header-title {
    font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900;
    color: var(--ps-white); letter-spacing: -0.02em; line-height: 1.15;
  }
  .ps-sl-header-sub {
    margin-top: 8px; font-family: 'Inter', sans-serif;
    font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.5;
  }

  /* Timeline — events that led to civil war */
  .ps-sl-timeline {
    border: 1px solid var(--ps-rule); border-top: none;
    background: var(--ps-white);
  }
  .ps-sl-tl-row {
    display: grid; grid-template-columns: 80px 1fr;
    border-bottom: 1px solid var(--ps-light);
    min-height: 0;
  }
  .ps-sl-tl-row:last-child { border-bottom: none; }
  .ps-sl-year {
    background: var(--ps-off); padding: 18px 14px;
    border-right: 3px solid var(--ps-red);
    font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 900;
    color: var(--ps-red); display: flex;
    align-items: flex-start; justify-content: center;
    line-height: 1.2; text-align: center; padding-top: 20px;
  }
  .ps-sl-event { padding: 18px 24px; }
  .ps-sl-event-head {
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700;
    color: var(--ps-ink); margin-bottom: 6px;
  }
  .ps-sl-event-body {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: var(--ps-muted); line-height: 1.62;
  }
  .ps-sl-event-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ps-ink2); }

  /* ── MAJORITARIANISM callout ── */
  .ps-major {
    background: var(--ps-ink); color: var(--ps-white);
    padding: 40px 44px; margin-bottom: 52px;
    display: grid; grid-template-columns: auto 1fr; gap: 32px;
    align-items: center;
  }
  .ps-major-word {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(36px, 5vw, 52px); font-weight: 900;
    letter-spacing: -0.03em; line-height: 1;
    color: var(--ps-red); writing-mode: vertical-rl;
    text-orientation: mixed; transform: rotate(180deg);
    border-right: 2px solid rgba(255,255,255,0.1);
    padding-right: 24px;
  }
  .ps-major-def-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(255,255,255,0.32); margin-bottom: 12px;
  }
  .ps-major-def {
    font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 600;
    color: var(--ps-white); line-height: 1.6; margin-bottom: 18px;
  }
  .ps-major-consequence {
    font-family: 'Inter', sans-serif; font-size: 15px;
    color: rgba(255,255,255,0.55); line-height: 1.72;
  }
  .ps-major-consequence strong { color: var(--ps-red); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ── FAQ ── */
  .ps-faq-intro {
    display: flex; align-items: center; gap: 16px;
    margin-bottom: 12px;
  }
  .ps-faq-intro-line { flex: 1; height: 1px; background: var(--ps-rule); }
  .ps-faq-intro-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--ps-teal); background: var(--ps-teal-lt);
    padding: 5px 14px;
  }

  .ps-faq-h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 34px; font-weight: 900;
    color: var(--ps-ink); letter-spacing: -0.025em;
    margin-bottom: 30px;
  }

  .ps-faq-item {
    border-bottom: 1px solid var(--ps-rule);
    margin-bottom: 0;
  }
  .ps-faq-item:first-of-type { border-top: 1px solid var(--ps-rule); }

  .ps-faq-q {
    width: 100%; display: flex; justify-content: space-between;
    align-items: flex-start; gap: 20px;
    padding: 20px 0; background: none; border: none; cursor: pointer;
    text-align: left;
  }
  .ps-faq-q-text {
    font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600;
    color: var(--ps-ink2); line-height: 1.45; flex: 1;
  }
  .ps-faq-item.open .ps-faq-q-text { color: var(--ps-teal); }
  .ps-faq-icon {
    font-size: 18px; color: var(--ps-teal); flex-shrink: 0; margin-top: 2px;
  }

  .ps-faq-ans { max-height: 0; overflow: hidden; transition: max-height 0.32s ease; }
  .ps-faq-ans.open { max-height: 900px; }
  .ps-faq-ans-inner {
    padding-bottom: 22px;
    font-family: 'Inter', sans-serif; font-size: 15px;
    color: var(--ps-muted); line-height: 1.78;
  }
  .ps-faq-ans-inner strong { color: var(--ps-ink2); font-family: 'Poppins', sans-serif; font-weight: 600; }

  /* ── HERO RESPONSIVE FIXES ── */
  @media (max-width: 900px) {
    .ps-hero-nav  { padding: 22px 24px 0; }
    .ps-hero-center { padding: 32px 24px 0; }
    .ps-hero-bottom { padding: 16px 24px; gap: 18px; flex-wrap: wrap; }
    .ps-hero-stats .ps-hero-stat { padding: 18px 20px; }
  }

  @media (max-width: 600px) {
    .ps-hero { min-height: auto; padding-bottom: 0; }
    .ps-hero-nav {
      padding: 18px 18px 0;
      flex-direction: column; align-items: flex-start; gap: 10px;
    }
    .ps-hero-nav-tag { font-size: 9px; letter-spacing: 0.12em; padding: 4px 10px; }
    .ps-hero-nav-brand { font-size: 10px; letter-spacing: 0.2em; }

    .ps-hero-center { padding: 28px 18px 0; }
    .ps-hero-eyebrow { font-size: 10px; letter-spacing: 0.18em; margin-bottom: 16px; }
    .ps-hero-h1 {
      font-size: clamp(48px, 14vw, 72px);
      letter-spacing: -0.03em;
      margin-bottom: 24px;
    }
    .ps-hero-deck {
      font-size: 15px; max-width: 100%;
      margin-bottom: 32px;
      line-height: 1.65;
    }

    .ps-hero-stats { flex-wrap: wrap; }
    .ps-hero-stat {
      flex: 1 1 calc(50% - 1px);
      padding: 16px 16px;
      border-right: 1px solid rgba(255,255,255,0.06);
    }
    .ps-hero-stat:nth-child(2n) { border-right: none; }
    .ps-hero-stat:nth-child(n+3) { border-top: 1px solid rgba(255,255,255,0.06); }
    .ps-hero-stat-val { font-size: 24px; }
    .ps-hero-stat-label { font-size: 9px; }

    .ps-hero-bottom {
      padding: 14px 18px; gap: 10px;
      flex-wrap: wrap;
    }
    .ps-hero-bottom-item { font-size: 9px; letter-spacing: 0.08em; }
  }

  @media (max-width: 680px) {
    .ps-body { padding: 52px 20px 72px; }
    .ps-countries { grid-template-columns: 1fr; }
    .ps-country:last-child { border-left: none; border-top: 1px solid var(--ps-rule); }
    .ps-why-grid { grid-template-columns: 1fr; }
    .ps-bel-row { grid-template-columns: 1fr; }
    .ps-bel-key { border-right: none; border-bottom: 1px solid var(--ps-rule); }
    .ps-major { grid-template-columns: 1fr; }
    .ps-major-word { writing-mode: horizontal-tb; transform: none; border-right: none; border-bottom: 2px solid rgba(255,255,255,0.1); padding-right: 0; padding-bottom: 16px; margin-bottom: 0; }
    .ps-forms-big { font-size: 48px; }
    .ps-forms-intro { flex-direction: column; gap: 8px; }
  }
`;

const faqs = [
  {
    q: "What is power sharing? Why is it important in a democracy?",
    a: <>
      <strong>Power sharing</strong> is the distribution of governmental authority among various organs, levels, groups, and institutions so that no single entity holds all power. It is important in a democracy because:
      <br/><br/>
      1. It <strong>reduces the possibility of conflict</strong> between social groups by ensuring all communities have a stake in governance.<br/>
      2. It brings <strong>stability to political order</strong> — governments that include multiple voices are less likely to face violent opposition.<br/>
      3. Power sharing is the <strong>very essence of democracy</strong> — citizen participation and voice are its defining features.<br/>
      4. An intelligent division between <strong>legislature, executive, and judiciary</strong> prevents the abuse of state power.<br/>
      5. It ensures that decisions reflect <strong>broad consensus</strong> rather than the will of a single ruler or party.
    </>
  },
  {
    q: "Describe the Belgian model of power sharing. Why is it considered unique?",
    a: <>
      Belgium is a small European country with a <strong>complex linguistic divide</strong> — 59% Dutch-speaking Flemish, 40% French-speaking Walloons, plus a small German-speaking minority. In Brussels, 80% speak French. The minority French-speaking community was economically stronger, creating tensions.
      <br/><br/>
      The <strong>Belgian model</strong> is considered unique because:
      <br/><br/>
      1. The <strong>central government</strong> has equal numbers of French and Dutch-speaking ministers.<br/>
      2. <strong>Special laws</strong> require support from majorities in both linguistic groups — neither can override the other.<br/>
      3. <strong>Powers are devolved</strong> to regional state governments (Flanders and Wallonia).<br/>
      4. <strong>Brussels</strong> has a separate government with equal representation for both communities.<br/>
      5. A special <strong>community government</strong> elected by each language group handles cultural, educational, and language-related issues.<br/><br/>
      This model has successfully <strong>prevented civil strife</strong> and is cited globally as a model for managing diversity.
    </>
  },
  {
    q: "What happened in Sri Lanka? How is it different from Belgium?",
    a: <>
      Sri Lanka gained independence in <strong>1948</strong> with a diverse population: <strong>74% Sinhala</strong> speakers (mostly Buddhist) and <strong>18% Tamil</strong> speakers (mostly Hindu or Muslim), plus 7% Christians.
      <br/><br/>
      Instead of accommodating diversity, the Sinhala-majority government pursued <strong>majoritarian policies</strong>:
      <br/><br/>
      1. In <strong>1956</strong>, Sinhala was declared the <strong>only official language</strong>, sidelining Tamil.<br/>
      2. <strong>Preferential policies</strong> favoured Sinhala applicants in universities and government jobs.<br/>
      3. The constitution directed the state to <strong>foster and protect Buddhism</strong>, alienating non-Buddhists.<br/>
      4. Tamil demands for equal rights, regional autonomy, and official language recognition were <strong>denied</strong>.<br/>
      5. By the 1980s, organisations demanding a separate Tamil state (<strong>Tamil Eelam</strong>) formed, escalating into <strong>civil war</strong>.<br/><br/>
      <strong>Unlike Belgium</strong>, Sri Lanka chose majoritarianism over power sharing — with devastating consequences.
    </>
  },
  {
    q: "What is majoritarianism? How did it affect Sri Lanka?",
    a: <>
      <strong>Majoritarianism</strong> is the belief that the majority community in a country should be able to rule however it wishes, ignoring the rights and interests of minority communities.
      <br/><br/>
      In Sri Lanka, the government used its Sinhala majority to systematically <strong>exclude Tamil people</strong> from language rights, educational opportunities, and government jobs. This created a deep sense of <strong>alienation and injustice</strong> among Tamil communities.
      <br/><br/>
      The consequences were severe: Tamils formed political organisations demanding equal rights, which escalated into demands for a separate state (Tamil Eelam), and ultimately into a <strong>brutal civil war</strong> that lasted decades, causing massive loss of life and displacement. Sri Lanka is the textbook example of why <strong>majority rule without minority protection destroys nations</strong>.
    </>
  },
  {
    q: "What are the four forms of power sharing? Explain each.",
    a: <>
      <strong>1. Horizontal Division of Power</strong><br/>
      Power is shared among different <em>organs of government</em> at the same level — Legislature, Executive, and Judiciary. Each checks the others. Example: Judges are appointed by the executive but can strike down executive actions.<br/><br/>
      <strong>2. Vertical Division of Power (Federalism)</strong><br/>
      Power is shared among <em>governments at different levels</em> — central, state, and local. The central government delegates powers downward. This is called a <strong>federal arrangement</strong>.<br/><br/>
      <strong>3. Power Among Social Groups</strong><br/>
      Power is distributed among <em>religious, linguistic, and social groups</em>. Constitutional provisions ensure representation of women and weaker sections in legislatures and administration.<br/><br/>
      <strong>4. Power Among Political Parties and Movements</strong><br/>
      Political parties, pressure groups, and movements influence those in power. When parties <strong>form a coalition</strong> to contest elections and win, they form a <strong>coalition government</strong> and directly share power.
    </>
  },
  {
    q: "What is the difference between horizontal and vertical division of power?",
    a: <>
      <strong>Horizontal Division:</strong> Power is shared among organs at the <em>same level</em> of government — Legislature makes laws, Executive implements them, Judiciary interprets them and checks both. No organ is supreme; each acts as a check on the other. This prevents concentration of power.<br/><br/>
      <strong>Vertical Division:</strong> Power is shared across <em>different levels</em> of government — central/national government, state/provincial governments, and local bodies (municipalities, panchayats). The central government has supreme authority but delegates specific powers to lower levels. This is the basis of <strong>federalism</strong>.<br/><br/>
      Think of horizontal as <em>side-by-side</em> sharing and vertical as <em>top-to-bottom</em> sharing of the same national power.
    </>
  },
  {
    q: "Why should power be shared? Give prudential and moral reasons.",
    a: <>
      <strong>Prudential (Practical) Reasons:</strong><br/>
      Power sharing helps avoid conflict. When different groups share power, they have a stake in the system and are less likely to rebel. It brings stability and efficiency to governance. It reduces the risk of tyranny and misuse of power by any single entity.<br/><br/>
      <strong>Moral (Ethical) Reasons:</strong><br/>
      Power sharing is intrinsically desirable — it is the very <em>spirit of democracy</em>. Citizens have a fundamental right to participate in governance. Concentrating power in one group or individual violates democratic principles. Recognising the legitimate rights of all groups to participate in governance is a moral obligation in a diverse society.
    </>
  },
  {
    q: "What is a community government? How does it work in Belgium?",
    a: <>
      A <strong>community government</strong> is a government elected by people belonging to a specific language community — regardless of where they live in the country. In Belgium, there are separate community governments for Dutch speakers, French speakers, and German speakers.<br/><br/>
      These community governments have the authority to deal with <strong>cultural, educational, and language-related issues</strong>. This means that a French-speaking Belgian living in Brussels can vote for the French community government which then manages the schools, cultural institutions, and language policies affecting that community specifically.<br/><br/>
      This is a uniquely creative power-sharing solution that gives communities <strong>cultural autonomy</strong> without geographic separation.
    </>
  },
];

export default function PowerSharing() {
  const [openIdx, setOpenIdx] = useState(null);
  const tog = (i) => setOpenIdx(openIdx === i ? null : i);

  const formCards = [
    {
      color: "#007a6e",
      tag: "Form 1 · Legislature / Executive / Judiciary",
      title: "Horizontal Division",
      desc: <>Power shared among <strong>different organs of government at the same level</strong>. The legislature makes law, the executive implements it, and the judiciary interprets it — each checking the others. This creates a <strong>balance of power</strong> and prevents any single organ from becoming all-powerful.</>,
      eg: "Example: In India, the Supreme Court can declare a law made by Parliament unconstitutional.",
    },
    {
      color: "#0369a1",
      tag: "Form 2 · Centre / State / Local",
      title: "Vertical Division (Federalism)",
      desc: <>Power shared among <strong>governments at different levels</strong> — national, state, and local bodies. The central government delegates powers downward to state governments, and further to local institutions. This is the basis of <strong>federal government</strong>.</>,
      eg: "Example: India's Constitution divides powers between the Union List, State List, and Concurrent List.",
    },
    {
      color: "#b45309",
      tag: "Form 3 · Religious & Linguistic Groups",
      title: "Among Social Groups",
      desc: <>Power shared among <strong>different social communities</strong>. Constitutional and legal provisions ensure that socially weaker sections, religious minorities, linguistic groups, and women are <strong>represented in legislatures and administration</strong>.</>,
      eg: "Example: Reservation of seats in Parliament for Scheduled Castes and Scheduled Tribes.",
    },
    {
      color: "#7c3aed",
      tag: "Form 4 · Parties, Pressure Groups & Movements",
      title: "Among Political Parties",
      desc: <>Political parties, pressure groups, and social movements <strong>control or influence those in power</strong>. When parties contest elections in an alliance and win, they form a <strong>coalition government</strong> and directly share power.</>,
      eg: "Example: India's coalition governments of the 1990s where multiple parties shared cabinet positions.",
    },
  ];

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="ps-root">

        {/* ══ HERO ══ */}
        <div className="ps-hero">
          <div className="ps-hero-slab" />

          <div className="ps-hero-nav">
            <div className="ps-hero-nav-brand">Shikshacom · Civics</div>
            <div className="ps-hero-nav-tag">Chapter 1 · Democratic Politics II</div>
          </div>

          <div className="ps-hero-center">
            <div className="ps-hero-eyebrow">CBSE Class 10 · Political Science</div>
            <h1 className="ps-hero-h1">
              Power<br />
              <span className="ps-teal-word">Sharing</span>
            </h1>
            <p className="ps-hero-deck">
              Two nations. One chose to <strong>share power</strong> and build lasting peace.
              The other chose majority domination — and descended into civil war.
              This chapter asks: what does democracy actually demand of us?
            </p>
            <div className="ps-hero-stats">
              <div className="ps-hero-stat">
                <div className="ps-hero-stat-val">2</div>
                <div className="ps-hero-stat-label">Countries Studied</div>
              </div>
              <div className="ps-hero-stat">
                <div className="ps-hero-stat-val"><span>4</span></div>
                <div className="ps-hero-stat-label">Forms of Power Sharing</div>
              </div>
              <div className="ps-hero-stat">
                <div className="ps-hero-stat-val">1956</div>
                <div className="ps-hero-stat-label">Year Sri Lanka's Crisis Began</div>
              </div>
              <div className="ps-hero-stat">
                <div className="ps-hero-stat-val">3</div>
                <div className="ps-hero-stat-label">Languages in Belgium</div>
              </div>
            </div>
          </div>

          <div className="ps-hero-bottom">
            <div className="ps-hero-bottom-item">Belgium Model</div>
            <div className="ps-hero-bottom-item">Sri Lanka Conflict</div>
            <div className="ps-hero-bottom-item">Forms of Power Sharing</div>
            <div className="ps-hero-bottom-item">Why Power Sharing Matters</div>
          </div>
        </div>

        {/* ══ BODY ══ */}
        <div className="ps-body">

          {/* ── SECTION 1: Two Nations ── */}
          <div className="ps-run-label">
            <div className="ps-run-num">01</div>
            <div className="ps-run-title">Two Case Studies</div>
            <div className="ps-run-topic">Belgium · Sri Lanka</div>
          </div>

          <h2 className="ps-sec-h2">Two Nations,<br />Two <em>Choices</em></h2>
          <p className="ps-prose">
            Belgium and Sri Lanka both faced the same challenge — governing a multi-ethnic, multi-linguistic society.
            Their responses could not have been more different, and neither could their outcomes. Together they form
            the core lesson of this chapter: <strong>power sharing is not a concession — it is a survival strategy.</strong>
          </p>

          {/* Country profiles */}
          <div className="ps-countries">
            {/* Belgium */}
            <div className="ps-country success">
              <div className="ps-country-flag-bar">
                <div className="ps-country-flag">🇧🇪</div>
                <div>
                  <div className="ps-country-name">Belgium</div>
                  <div className="ps-country-status">Model of Power Sharing</div>
                </div>
              </div>

              <div className="ps-pop-visual">
                <div className="ps-pop-label">Population by Language</div>
                <div className="ps-pop-bar">
                  <div className="ps-pop-seg" style={{width:"59%", background:"#007a6e"}} />
                  <div className="ps-pop-seg" style={{width:"40%", background:"#b45309"}} />
                  <div className="ps-pop-seg" style={{width:"1%", background:"#6b7280"}} />
                </div>
                <div className="ps-pop-legend">
                  <div className="ps-pop-item"><div className="ps-pop-dot" style={{background:"#007a6e"}} /><span><span className="ps-pop-pct">59%</span> Dutch (Flemish)</span></div>
                  <div className="ps-pop-item"><div className="ps-pop-dot" style={{background:"#b45309"}} /><span><span className="ps-pop-pct">40%</span> French (Walloon)</span></div>
                  <div className="ps-pop-item"><div className="ps-pop-dot" style={{background:"#6b7280"}} /><span><span className="ps-pop-pct">1%</span> German</span></div>
                </div>
              </div>

              <div className="ps-country-facts">
                <div className="ps-fact-row">
                  <div className="ps-fact-key">Capital</div>
                  <div className="ps-fact-val"><strong>Brussels</strong> — 80% French, 20% Dutch</div>
                </div>
                <div className="ps-fact-row">
                  <div className="ps-fact-key">Key Tension</div>
                  <div className="ps-fact-val">Minority French community was <strong>economically stronger</strong> than the Dutch majority</div>
                </div>
                <div className="ps-fact-row">
                  <div className="ps-fact-key">Solution</div>
                  <div className="ps-fact-val"><strong>Unique constitutional power-sharing</strong> model — equal ministers, community govts, devolved powers</div>
                </div>
                <div className="ps-fact-row">
                  <div className="ps-fact-key">Outcome</div>
                  <div className="ps-fact-val"><strong>Civil strife prevented</strong> — model studied worldwide</div>
                </div>
              </div>
              <div className="ps-country-verdict">✓ &nbsp; Success — Peaceful Coexistence Achieved</div>
            </div>

            {/* Sri Lanka */}
            <div className="ps-country failure">
              <div className="ps-country-flag-bar">
                <div className="ps-country-flag">🇱🇰</div>
                <div>
                  <div className="ps-country-name">Sri Lanka</div>
                  <div className="ps-country-status">Case Study in Majoritarianism</div>
                </div>
              </div>

              <div className="ps-pop-visual">
                <div className="ps-pop-label">Population by Language</div>
                <div className="ps-pop-bar">
                  <div className="ps-pop-seg" style={{width:"74%", background:"#1e40af"}} />
                  <div className="ps-pop-seg" style={{width:"13%", background:"#b91c1c"}} />
                  <div className="ps-pop-seg" style={{width:"6%", background:"#c27803"}} />
                  <div className="ps-pop-seg" style={{width:"7%", background:"#6b7280"}} />
                </div>
                <div className="ps-pop-legend">
                  <div className="ps-pop-item"><div className="ps-pop-dot" style={{background:"#1e40af"}} /><span><span className="ps-pop-pct">74%</span> Sinhala</span></div>
                  <div className="ps-pop-item"><div className="ps-pop-dot" style={{background:"#b91c1c"}} /><span><span className="ps-pop-pct">13%</span> Sri Lankan Tamil</span></div>
                  <div className="ps-pop-item"><div className="ps-pop-dot" style={{background:"#c27803"}} /><span><span className="ps-pop-pct">5%</span> Indian Tamil</span></div>
                  <div className="ps-pop-item"><div className="ps-pop-dot" style={{background:"#6b7280"}} /><span><span className="ps-pop-pct">7%</span> Christians</span></div>
                </div>
              </div>

              <div className="ps-country-facts">
                <div className="ps-fact-row">
                  <div className="ps-fact-key">Independence</div>
                  <div className="ps-fact-val"><strong>1948</strong> — emerged as independent nation</div>
                </div>
                <div className="ps-fact-row">
                  <div className="ps-fact-key">Key Tension</div>
                  <div className="ps-fact-val">Sinhala majority used state power to <strong>sideline Tamils</strong> in language, jobs, education</div>
                </div>
                <div className="ps-fact-row">
                  <div className="ps-fact-key">"Solution"</div>
                  <div className="ps-fact-val"><strong>Majoritarianism</strong> — majority simply imposed its will, ignoring minority rights</div>
                </div>
                <div className="ps-fact-row">
                  <div className="ps-fact-key">Outcome</div>
                  <div className="ps-fact-val"><strong>Decades of civil war</strong> — thousands killed, nation torn</div>
                </div>
              </div>
              <div className="ps-country-verdict">✕ &nbsp; Failure — Civil War, Massive Destruction</div>
            </div>
          </div>

          {/* ── SECTION 2: Belgium Deep Dive ── */}
          <div className="ps-break">
            <div className="ps-break-line" />
            <div className="ps-break-pill">The Belgian Model</div>
            <div className="ps-break-line" />
          </div>

          <div className="ps-run-label">
            <div className="ps-run-num">02</div>
            <div className="ps-run-title">Case Study 1</div>
            <div className="ps-run-topic">The Belgian Solution</div>
          </div>

          <h2 className="ps-sec-h2">How Belgium <em>Solved</em><br />Its Diversity Problem</h2>
          <p className="ps-prose">
            Belgium's constitution was carefully redesigned to ensure that <strong>no community could dominate another</strong>. The result is one of the most intricate power-sharing architectures in the world — and it has held together for decades.
          </p>

          <div className="ps-belgium">
            <div className="ps-belgium-header">
              <div className="ps-belgium-header-text">
                <div className="ps-belgium-header-label">The Belgian Constitutional Model · Europe</div>
                <div className="ps-belgium-header-title">Five Pillars of Power Sharing</div>
                <div className="ps-belgium-header-sub">How Belgium engineered peaceful coexistence between two unequal linguistic communities</div>
              </div>
              <div className="ps-belgium-flag-big">🇧🇪</div>
            </div>
            <div className="ps-belgium-body">
              {[
                {icon:"🏛️", key:"Central Government", val:<>French and Dutch-speaking ministers are <strong>in equal numbers</strong> in the central government. Even though Dutch speakers are a larger proportion of the population, neither group holds numerical dominance in the cabinet.</>},
                {icon:"⚖️", key:"Special Laws", val:<>Some important laws require the <strong>approval of a majority from each linguistic group separately</strong> — one community cannot outvote the other on sensitive issues. This is a veto right for both communities.</>},
                {icon:"🗺️", key:"Regional Governments", val:<>Many powers of the central government have been <strong>devolved to the state governments</strong> of Flanders (Dutch) and Wallonia (French). These regions govern themselves on most local matters.</>},
                {icon:"🏙️", key:"Brussels Government", val:<>Brussels, the capital and a mixed city, has a <strong>separate government with equal representation</strong> for both communities — even though French speakers form 80% of Brussels' population.</>},
                {icon:"👥", key:"Community Government", val:<>A special <strong>community government elected by each language group</strong> (not by territory) handles cultural, educational, and language-related matters — giving communities cultural self-governance regardless of where they live.</>},
              ].map((r, i) => (
                <div className="ps-bel-row" key={i}>
                  <div className="ps-bel-key"><span className="ps-bel-key-icon">{r.icon}</span>{r.key}</div>
                  <div className="ps-bel-val">{r.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── SECTION 3: Sri Lanka Deep Dive ── */}
          <div className="ps-break">
            <div className="ps-break-line" />
            <div className="ps-break-pill">Sri Lanka's Tragedy</div>
            <div className="ps-break-line" />
          </div>

          <div className="ps-run-label">
            <div className="ps-run-num">03</div>
            <div className="ps-run-title">Case Study 2</div>
            <div className="ps-run-topic">How Majoritarianism Causes Civil War</div>
          </div>

          <h2 className="ps-sec-h2">Sri Lanka: When<br />Majority <span className="r">Rules</span> Without Limits</h2>
          <p className="ps-prose">
            Sri Lanka's government made a series of deliberate choices to favour the Sinhala-Buddhist majority at the direct expense of Tamil minorities. Each step deepened Tamil alienation — until there was no path left except armed conflict.
          </p>

          <div className="ps-srilanka">
            <div className="ps-sl-header">
              <div className="ps-sl-header-text">
                <div className="ps-sl-header-label">Timeline of Exclusion · Sri Lanka</div>
                <div className="ps-sl-header-title">The Road to Civil War</div>
                <div className="ps-sl-header-sub">How step-by-step majoritarian policies pushed a nation from diversity to destruction</div>
              </div>
              <div style={{fontSize:"44px", lineHeight:1}}>🇱🇰</div>
            </div>
            <div className="ps-sl-timeline">
              {[
                {yr:"1948", head:"Independence", body:<>Sri Lanka emerges as an independent nation. Population includes <strong>74% Sinhala</strong> and <strong>18% Tamil</strong> speakers. Both communities have hopes for a shared future.</>},
                {yr:"1956", head:"Sinhala Only Act", body:<>A landmark law declares <strong>Sinhala as the only official language</strong>, completely disregarding Tamil. Tamil speakers — nearly a quarter of the population — are suddenly excluded from official communication.</>},
                {yr:"1956+", head:"Preferential Policies", body:<>Governments introduce <strong>preferential treatment for Sinhala applicants</strong> in university admissions and government jobs. Tamil youth find doors closing systematically.</>},
                {yr:"1972", head:"Constitutional Buddhism", body:<>A new constitution gives the state the duty to <strong>protect and foster Buddhism</strong>, further marginalising Tamil Hindus, Muslims, and Christians in the national identity.</>},
                {yr:"1970s", head:"Tamil Political Mobilisation", body:<>Sri Lankan Tamils launch <strong>political parties and struggles</strong> demanding official language recognition, regional autonomy, and equal opportunity. All demands are denied by the Sinhala-dominated government.</>},
                {yr:"1980s", head:"Armed Conflict Begins", body:<>Several organisations form demanding a <strong>separate Tamil Eelam state</strong> in northern and eastern Sri Lanka. Tensions boil over into full-scale <strong>civil war</strong> that would last decades.</>},
              ].map((r, i) => (
                <div className="ps-sl-tl-row" key={i}>
                  <div className="ps-sl-year">{r.yr}</div>
                  <div className="ps-sl-event">
                    <div className="ps-sl-event-head">{r.head}</div>
                    <div className="ps-sl-event-body">{r.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Majoritarianism definition callout */}
          <div className="ps-major">
            <div className="ps-major-word">MAJOR&shy;ITAR&shy;IAN&shy;ISM</div>
            <div>
              <div className="ps-major-def-label">Definition · Key Term</div>
              <div className="ps-major-def">
                The belief and practice of allowing the majority community to govern as it wishes, disregarding the rights, cultures, languages, and aspirations of minority communities.
              </div>
              <div className="ps-major-consequence">
                In Sri Lanka, majoritarianism meant that the <strong>74% Sinhala majority</strong> used its electoral strength to systematically strip Tamils of language rights, job opportunities, and cultural recognition — ultimately causing one of South Asia's longest civil wars and costing tens of thousands of lives. The lesson: <strong>democracy requires protecting minorities, not just empowering majorities.</strong>
              </div>
            </div>
          </div>

          {/* ── SECTION 4: Why Power Sharing ── */}
          <div className="ps-break">
            <div className="ps-break-line" />
            <div className="ps-break-pill">The Theory</div>
            <div className="ps-break-line" />
          </div>

          <div className="ps-run-label">
            <div className="ps-run-num">04</div>
            <div className="ps-run-title">Why Is It Desirable?</div>
            <div className="ps-run-topic">Prudential & Moral Reasons</div>
          </div>

          <h2 className="ps-sec-h2">Why Power Sharing<br />Is <em>Desirable</em></h2>

          <div className="ps-editorial">
            <div className="ps-editorial-q">
              "Power sharing is not a <em>compromise</em> — it is the very essence of democracy. The question isn't whether to share power, but how creatively to do so."
            </div>
            <div className="ps-editorial-attr">— Democratic Politics II, NCERT Class 10</div>
          </div>

          <div className="ps-why-grid">
            <div className="ps-why-card" data-n="1">
              <div className="ps-why-icon">🕊️</div>
              <div className="ps-why-head">Reduces Conflict</div>
              <div className="ps-why-body">Power sharing reduces the possibility of conflict between social groups. When all communities have a stake in governance, they have less reason to rebel or turn to violence.</div>
            </div>
            <div className="ps-why-card" data-n="2">
              <div className="ps-why-icon">🏗️</div>
              <div className="ps-why-head">Brings Political Stability</div>
              <div className="ps-why-body">Governments that include multiple voices and communities tend to be more stable. Exclusion creates resentment; inclusion creates investment in the system.</div>
            </div>
            <div className="ps-why-card" data-n="3">
              <div className="ps-why-icon">🗳️</div>
              <div className="ps-why-head">Soul of Democracy</div>
              <div className="ps-why-body">Power sharing is the very essence of democracy — a system defined by citizen participation. Concentrating power in one group violates this fundamental principle.</div>
            </div>
          </div>

          {/* ── SECTION 5: Forms ── */}
          <div className="ps-break">
            <div className="ps-break-line" />
            <div className="ps-break-pill">Four Forms</div>
            <div className="ps-break-line" />
          </div>

          <div className="ps-run-label">
            <div className="ps-run-num">05</div>
            <div className="ps-run-title">Forms of Power Sharing</div>
            <div className="ps-run-topic">Legislature · Federalism · Communities · Parties</div>
          </div>

          <h2 className="ps-sec-h2"><em>Four Ways</em><br />Power Can Be Shared</h2>

          <div className="ps-forms">
            <div className="ps-forms-intro">
              <div className="ps-forms-big">4</div>
              <div className="ps-forms-intro-text">
                Modern democracies have developed <strong>four distinct types of power-sharing arrangements</strong> — each operating at a different level of governance, and each solving a different kind of power concentration problem. Together they form a complete architecture of democratic governance.
              </div>
            </div>

            {formCards.map((card, i) => (
              <div className="ps-form-card" key={i}>
                <div className="ps-form-accent" style={{background: card.color}} />
                <div className="ps-form-content">
                  <div className="ps-form-tag" style={{color: card.color}}>{card.tag}</div>
                  <div className="ps-form-title">{card.title}</div>
                  <div className="ps-form-desc">{card.desc}</div>
                  <div className="ps-form-example">{card.eg}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── FAQ ── */}
          <div className="ps-break">
            <div className="ps-break-line" />
            <div className="ps-break-pill">Exam Prep</div>
            <div className="ps-break-line" />
          </div>

          <div className="ps-faq-intro">
            <div className="ps-faq-intro-line" />
            <div className="ps-faq-intro-tag">Frequently Asked Questions</div>
            <div className="ps-faq-intro-line" />
          </div>
          <h2 className="ps-faq-h2">All You Need to Know</h2>

          {faqs.map((faq, i) => (
            <div className={`ps-faq-item${openIdx === i ? " open" : ""}`} key={i}>
              <button className="ps-faq-q" onClick={() => tog(i)}>
                <span className="ps-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="ps-faq-icon">{openIdx === i ? "▴" : "▾"}</span>
              </button>
              <div className={`ps-faq-ans${openIdx === i ? " open" : ""}`}>
                <div className="ps-faq-ans-inner">{faq.a}</div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
