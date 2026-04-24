import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ps5-slate:    #1c1f2e;
    --ps5-slate2:   #141620;
    --ps5-slate3:   #252840;
    --ps5-violet:   #7c3aed;
    --ps5-violet2:  #5b21b6;
    --ps5-violet-lt:#ede9fe;
    --ps5-violet-md:#ddd6fe;
    --ps5-silver:   #f4f5f8;
    --ps5-silver2:  #eaecf2;
    --ps5-silver3:  #d8dce8;
    --ps5-ink:      #0f1018;
    --ps5-ink2:     #1e2030;
    --ps5-muted:    #6b7280;
    --ps5-rule:     #d1d5e0;
    --ps5-red:      #dc2626;
    --ps5-red-lt:   #fef2f2;
    --ps5-green:    #059669;
    --ps5-green-lt: #ecfdf5;
    --ps5-amber:    #d97706;
    --ps5-amber-lt: #fffbeb;
    --ps5-white:    #ffffff;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ps5-root {
    font-family: 'Inter', sans-serif;
    background: var(--ps5-silver);
    color: var(--ps5-ink);
    min-height: 100vh;
  }

  /* ══════════════════════════════════════
     HERO — dark slate, top-nav style
  ══════════════════════════════════════ */
  .ps5-hero {
    background: var(--ps5-slate2);
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    position: relative; overflow: hidden;
  }
  /* violet top bar */
  .ps5-hero::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 5px;
    background: linear-gradient(90deg, var(--ps5-violet2), var(--ps5-violet), var(--ps5-violet2));
  }
  /* big ghost "5" */
  .ps5-hero-ghost {
    position: absolute; right: -20px; bottom: -40px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(220px, 38vw, 500px); font-weight: 900; line-height: 1;
    color: rgba(124,58,237,0.07); letter-spacing: -0.06em;
    pointer-events: none; user-select: none;
  }
  /* faint dot grid */
  .ps5-hero-dots {
    position: absolute; inset: 0;
    background-image: radial-gradient(rgba(124,58,237,0.18) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
  }

  /* Nav */
  .ps5-hero-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 28px 52px 0; position: relative; z-index: 2;
  }
  .ps5-nav-brand {
    font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 900;
    letter-spacing: 0.28em; text-transform: uppercase;
    color: rgba(255,255,255,0.25);
  }
  .ps5-nav-pill {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--ps5-violet); border: 1px solid rgba(124,58,237,0.4);
    padding: 5px 14px; background: rgba(124,58,237,0.08);
  }

  /* Center */
  .ps5-hero-center {
    display: flex; flex-direction: column; justify-content: center;
    padding: 40px 52px 0; position: relative; z-index: 2;
  }
  .ps5-hero-eyebrow {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.26em; text-transform: uppercase;
    color: var(--ps5-violet); margin-bottom: 22px;
    display: flex; align-items: center; gap: 12px;
  }
  .ps5-hero-eyebrow::before {
    content: ''; width: 28px; height: 2px;
    background: var(--ps5-violet); flex-shrink: 0;
  }
  .ps5-hero-h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(36px, 6.5vw, 88px);
    font-weight: 900; line-height: 0.94;
    letter-spacing: -0.04em; color: #fff;
    margin-bottom: 32px;
  }
  .ps5-hero-deck {
    font-family: 'Inter', sans-serif; font-size: 17px; line-height: 1.74;
    color: rgba(255,255,255,0.46); max-width: 560px;
    margin-bottom: 48px;
    border-left: 3px solid rgba(124,58,237,0.45);
    padding-left: 20px;
  }
  .ps5-hero-deck strong { color: rgba(255,255,255,0.78); font-weight: 500; }

  /* Stat strip */
  .ps5-hero-stats {
    display: grid; grid-template-columns: repeat(4,1fr);
    border-top: 1px solid rgba(255,255,255,0.07);
  }
  .ps5-hero-stat {
    padding: 22px 24px;
    border-right: 1px solid rgba(255,255,255,0.06);
  }
  .ps5-hero-stat:last-child { border-right: none; }
  .ps5-hstat-val {
    font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900;
    color: var(--ps5-violet); line-height: 1; margin-bottom: 5px;
    letter-spacing: -0.02em;
  }
  .ps5-hstat-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: rgba(255,255,255,0.22);
  }

  /* Bottom bar */
  .ps5-hero-bottom {
    padding: 16px 52px;
    display: flex; align-items: center; flex-wrap: wrap; gap: 0;
    border-top: 1px solid rgba(255,255,255,0.05);
    position: relative; z-index: 2;
  }
  .ps5-hbtm-item {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(255,255,255,0.18); white-space: nowrap;
    padding: 4px 18px 4px 0; margin-right: 18px;
    border-right: 1px solid rgba(255,255,255,0.08);
  }
  .ps5-hbtm-item:last-child { border-right: none; }

  /* ══════════════════════════════════════
     BODY — newspaper 3-col grid
  ══════════════════════════════════════ */
  .ps5-body {
    max-width: 980px; margin: 0 auto;
    padding: 72px 32px 100px;
  }

  /* ── MASTHEAD ── */
  .ps5-masthead {
    border-top: 4px solid var(--ps5-ink);
    border-bottom: 2px solid var(--ps5-ink);
    padding: 12px 0;
    display: flex; align-items: baseline; justify-content: space-between;
    margin-bottom: 40px;
  }
  .ps5-masthead-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(26px, 4.5vw, 52px); font-weight: 900;
    letter-spacing: -0.04em; color: var(--ps5-ink);
  }
  .ps5-masthead-meta {
    font-family: 'Inter', sans-serif; font-size: 12px;
    color: var(--ps5-muted); text-align: right; line-height: 1.5;
    flex-shrink: 0; padding-left: 24px;
  }

  /* ── NEWSPAPER 3-COLUMN ── */
  .ps5-newspage {
    display: grid;
    grid-template-columns: 1fr 1px 1fr 1px 1fr;
    gap: 0;
    margin-bottom: 48px;
  }
  .ps5-col-div {
    background: var(--ps5-rule);
    margin: 0 20px;
  }
  .ps5-news-col { }
  .ps5-news-col-hed {
    font-family: 'Poppins', sans-serif; font-size: 9px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--ps5-muted); border-bottom: 1px solid var(--ps5-rule);
    padding-bottom: 6px; margin-bottom: 14px;
  }
  .ps5-news-body {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: var(--ps5-ink2); line-height: 1.75;
  }
  .ps5-news-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ps5-ink); }
  .ps5-news-body p { margin-bottom: 10px; }
  .ps5-news-body p:last-child { margin-bottom: 0; }

  /* ── BREAKING NEWS BANNER ── */
  .ps5-breaking {
    background: var(--ps5-red);
    padding: 10px 20px;
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 4px;
  }
  .ps5-breaking-tag {
    font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 900;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #fff; background: rgba(255,255,255,0.18);
    padding: 3px 10px; flex-shrink: 0;
  }
  .ps5-breaking-text {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700;
    color: #fff; letter-spacing: 0.06em;
  }

  /* ── CASE STUDY CARDS — full-width newspaper layout ── */
  .ps5-case {
    margin-bottom: 4px; overflow: hidden;
  }
  .ps5-case-inner {
    display: grid; grid-template-columns: 200px 1fr;
    background: var(--ps5-white);
    border: 1px solid var(--ps5-rule);
    border-top: none;
  }
  .ps5-case-sidebar {
    padding: 28px 24px;
    border-right: 1px solid var(--ps5-rule);
    display: flex; flex-direction: column; gap: 16px;
  }
  .ps5-case:nth-child(1) .ps5-case-sidebar { background: var(--ps5-slate); }
  .ps5-case:nth-child(2) .ps5-case-sidebar { background: var(--ps5-violet2); }
  .ps5-case-flag { font-size: 40px; line-height: 1; }
  .ps5-case-country {
    font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 900;
    color: #fff; letter-spacing: -0.02em; line-height: 1.1;
  }
  .ps5-case-year {
    font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900;
    color: rgba(255,255,255,0.25); letter-spacing: -0.03em; line-height: 1;
  }
  .ps5-case-verdict {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    padding: 5px 10px; display: inline-block; margin-top: auto;
  }
  .ps5-case:nth-child(1) .ps5-case-verdict { background: rgba(124,58,237,0.25); color: #c4b5fd; }
  .ps5-case:nth-child(2) .ps5-case-verdict { background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.75); }

  .ps5-case-main { padding: 28px 32px; }
  .ps5-case-kicker {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--ps5-violet); margin-bottom: 8px;
  }
  .ps5-case-headline {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(16px, 2.2vw, 22px); font-weight: 900;
    color: var(--ps5-ink); letter-spacing: -0.02em;
    margin-bottom: 14px; line-height: 1.2;
    border-bottom: 1px solid var(--ps5-rule); padding-bottom: 12px;
  }
  .ps5-case-body {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: var(--ps5-ink2); line-height: 1.72; margin-bottom: 16px;
  }
  .ps5-case-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ps5-ink); }

  /* Demand chips */
  .ps5-demands {
    display: flex; flex-wrap: wrap; gap: 6px;
  }
  .ps5-demand {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 600;
    color: var(--ps5-violet2); background: var(--ps5-violet-lt);
    border: 1px solid var(--ps5-violet-md);
    padding: 4px 12px;
  }

  /* ── SECTION RULE ── */
  .ps5-sec-rule {
    display: flex; align-items: center; gap: 0;
    margin: 52px 0 36px;
    border-top: 3px solid var(--ps5-ink);
    padding-top: 10px;
  }
  .ps5-sec-rule-num {
    font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 900;
    letter-spacing: 0.12em; color: var(--ps5-white);
    background: var(--ps5-ink); padding: 4px 12px; margin-right: 14px; flex-shrink: 0;
  }
  .ps5-sec-rule-title {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--ps5-muted);
    flex: 1;
  }
  .ps5-sec-rule-right {
    font-family: 'Inter', sans-serif; font-size: 11px;
    color: var(--ps5-muted); font-style: italic;
  }

  /* ── H2 ── */
  .ps5-h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(24px, 3.5vw, 40px); font-weight: 900;
    line-height: 1.05; letter-spacing: -0.025em;
    color: var(--ps5-ink); margin-bottom: 20px;
  }
  .ps5-h2 em { font-style: normal; color: var(--ps5-violet); }
  .ps5-h2 .r { color: var(--ps5-red); }

  /* ── PROSE ── */
  .ps5-prose {
    font-family: 'Inter', sans-serif; font-size: 17px;
    color: var(--ps5-ink2); line-height: 1.82; margin-bottom: 24px;
  }
  .ps5-prose strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ps5-ink); }

  /* ── PRESSURE GROUPS — classified-ad grid ── */
  .ps5-classified {
    margin-bottom: 44px;
    border: 2px solid var(--ps5-ink);
    overflow: hidden;
  }
  .ps5-class-header {
    background: var(--ps5-ink); padding: 12px 20px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .ps5-class-header-title {
    font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 900;
    color: #fff; letter-spacing: -0.01em;
  }
  .ps5-class-header-sub {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(255,255,255,0.35);
  }
  .ps5-class-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0;
  }
  .ps5-class-cell {
    padding: 22px 24px;
    border-right: 1px solid var(--ps5-rule);
    border-bottom: 1px solid var(--ps5-rule);
  }
  .ps5-class-cell:nth-child(2n) { border-right: none; }
  .ps5-class-cell:nth-last-child(-n+2) { border-bottom: none; }
  .ps5-class-tag {
    font-family: 'Poppins', sans-serif; font-size: 9px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    padding: 2px 8px; margin-bottom: 8px; display: inline-block;
  }
  .ps5-class-cell:nth-child(1) .ps5-class-tag { background: var(--ps5-violet-lt); color: var(--ps5-violet2); }
  .ps5-class-cell:nth-child(2) .ps5-class-tag { background: var(--ps5-green-lt); color: var(--ps5-green); }
  .ps5-class-cell:nth-child(3) .ps5-class-tag { background: var(--ps5-amber-lt); color: var(--ps5-amber); }
  .ps5-class-cell:nth-child(4) .ps5-class-tag { background: var(--ps5-red-lt); color: var(--ps5-red); }
  .ps5-class-title {
    font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 900;
    color: var(--ps5-ink); margin-bottom: 8px; letter-spacing: -0.01em;
  }
  .ps5-class-body {
    font-family: 'Inter', sans-serif; font-size: 13px;
    color: var(--ps5-muted); line-height: 1.64;
  }
  .ps5-class-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ps5-ink2); }
  .ps5-class-eg {
    margin-top: 8px; padding: 6px 10px;
    font-family: 'Inter', sans-serif; font-size: 12px;
    color: var(--ps5-muted); font-style: italic;
    border-left: 2px solid var(--ps5-rule);
  }

  /* ── INFLUENCE METHODS — horizontal ticker style ── */
  .ps5-ticker {
    margin-bottom: 44px;
    overflow: hidden;
  }
  .ps5-ticker-header {
    background: var(--ps5-violet); padding: 10px 20px;
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: #fff;
    display: flex; align-items: center; gap: 12px;
  }
  .ps5-ticker-dot { width: 8px; height: 8px; background: #fff; border-radius: 50%; flex-shrink: 0; }
  .ps5-ticker-body {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 0; background: var(--ps5-rule);
  }
  .ps5-tick-item {
    background: var(--ps5-white); padding: 20px 20px;
    border-right: 1px solid var(--ps5-rule);
    display: flex; gap: 12px; align-items: flex-start;
  }
  .ps5-tick-item:last-child { border-right: none; }
  .ps5-tick-icon { font-size: 20px; flex-shrink: 0; }
  .ps5-tick-head {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700;
    color: var(--ps5-ink); margin-bottom: 4px;
  }
  .ps5-tick-body {
    font-family: 'Inter', sans-serif; font-size: 12px;
    color: var(--ps5-muted); line-height: 1.58;
  }

  /* ── PARTY-PRESSURE RELATIONSHIP ── */
  .ps5-relation {
    margin-bottom: 44px;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1px solid var(--ps5-rule);
  }
  .ps5-rel-col { padding: 28px 28px; background: var(--ps5-white); }
  .ps5-rel-col:first-child { border-right: 1px solid var(--ps5-rule); }
  .ps5-rel-head {
    font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 900;
    color: var(--ps5-ink); padding-bottom: 10px;
    border-bottom: 3px solid var(--ps5-violet); margin-bottom: 16px;
    letter-spacing: -0.01em;
  }
  .ps5-rel-item {
    display: flex; gap: 10px; align-items: flex-start;
    padding: 8px 0; border-bottom: 1px solid var(--ps5-silver2);
  }
  .ps5-rel-item:last-child { border-bottom: none; }
  .ps5-rel-dot {
    width: 5px; height: 5px; background: var(--ps5-violet);
    clip-path: polygon(50% 0,100% 50%,50% 100%,0 50%);
    flex-shrink: 0; margin-top: 7px;
  }
  .ps5-rel-text {
    font-family: 'Inter', sans-serif; font-size: 13px;
    color: var(--ps5-ink2); line-height: 1.60;
  }
  .ps5-rel-text strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ps5-ink); }

  /* ── VERDICT CALLOUT ── */
  .ps5-verdict {
    background: var(--ps5-slate);
    padding: 40px 44px; margin-bottom: 44px;
    position: relative; overflow: hidden;
  }
  .ps5-verdict::before {
    content: '⚡'; position: absolute; right: 20px; top: 10px;
    font-size: 120px; opacity: 0.06; line-height: 1; pointer-events: none;
  }
  .ps5-verdict-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--ps5-violet); margin-bottom: 14px;
  }
  .ps5-verdict-q {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(17px, 2.5vw, 22px); font-weight: 900;
    color: #fff; line-height: 1.4; margin-bottom: 16px;
  }
  .ps5-verdict-q em { font-style: normal; color: #c4b5fd; }
  .ps5-verdict-body {
    font-family: 'Inter', sans-serif; font-size: 15px;
    color: rgba(255,255,255,0.50); line-height: 1.72;
    max-width: 640px;
  }
  .ps5-verdict-body strong { color: rgba(255,255,255,0.80); font-weight: 500; }

  /* ── ALERT ── */
  .ps5-alert {
    padding: 16px 22px; margin-bottom: 22px;
    display: flex; gap: 14px; align-items: flex-start;
  }
  .ps5-alert.violet { background: var(--ps5-violet-lt); border-left: 4px solid var(--ps5-violet); }
  .ps5-alert.green  { background: var(--ps5-green-lt);  border-left: 4px solid var(--ps5-green); }
  .ps5-alert.amber  { background: var(--ps5-amber-lt);  border-left: 4px solid var(--ps5-amber); }
  .ps5-alert-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
  .ps5-alert-text { font-family: 'Inter', sans-serif; font-size: 15px; color: var(--ps5-ink2); line-height: 1.66; }
  .ps5-alert-text strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ps5-ink); }

  /* ── FAQ ── */
  .ps5-faq-rule {
    border-top: 3px solid var(--ps5-ink);
    padding-top: 10px; margin-bottom: 16px;
    display: flex; align-items: center; gap: 14px;
  }
  .ps5-faq-rule-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--ps5-white); background: var(--ps5-violet);
    padding: 4px 14px; flex-shrink: 0;
  }
  .ps5-faq-rule-line { flex: 1; height: 1px; background: var(--ps5-rule); }
  .ps5-faq-h2 {
    font-family: 'Montserrat', sans-serif; font-size: 32px; font-weight: 900;
    color: var(--ps5-ink); letter-spacing: -0.025em; margin-bottom: 24px;
  }
  .ps5-faq-item { border-bottom: 1px solid var(--ps5-rule); }
  .ps5-faq-item:first-of-type { border-top: 1px solid var(--ps5-rule); }
  .ps5-faq-item.open { background: var(--ps5-violet-lt); }
  .ps5-faq-q {
    width: 100%; display: flex; justify-content: space-between;
    align-items: flex-start; gap: 20px;
    padding: 18px 16px; background: none; border: none; cursor: pointer; text-align: left;
  }
  .ps5-faq-q-text {
    font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600;
    color: var(--ps5-ink2); line-height: 1.45; flex: 1;
  }
  .ps5-faq-item.open .ps5-faq-q-text { color: var(--ps5-violet2); }
  .ps5-faq-icon { font-size: 18px; color: var(--ps5-violet); flex-shrink: 0; margin-top: 2px; }
  .ps5-faq-ans { max-height: 0; overflow: hidden; transition: max-height 0.34s ease; }
  .ps5-faq-ans.open { max-height: 1000px; }
  .ps5-faq-ans-inner {
    padding: 2px 16px 22px;
    font-family: 'Inter', sans-serif; font-size: 15px;
    color: var(--ps5-muted); line-height: 1.80;
  }
  .ps5-faq-ans-inner strong { color: var(--ps5-ink2); font-family: 'Poppins', sans-serif; font-weight: 600; }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .ps5-hero-nav, .ps5-hero-center, .ps5-hero-bottom { padding-left: 28px; padding-right: 28px; }
    .ps5-hero-stats { grid-template-columns: 1fr 1fr; }
    .ps5-hero-stat:nth-child(2) { border-right: none; }
    .ps5-hero-stat:nth-child(3) { border-top: 1px solid rgba(255,255,255,0.06); }
    .ps5-newspage { grid-template-columns: 1fr 1px 1fr; }
    .ps5-newspage .ps5-news-col:last-child,
    .ps5-newspage .ps5-col-div:last-of-type { display: none; }
    .ps5-ticker-body { grid-template-columns: 1fr 1fr; }
    .ps5-ticker-body .ps5-tick-item:last-child { border-top: 1px solid var(--ps5-rule); grid-column: span 2; }
  }
  @media (max-width: 640px) {
    .ps5-hero { min-height: auto; }
    .ps5-hero-nav { padding: 18px 18px 0; flex-direction: column; align-items: flex-start; gap: 10px; }
    .ps5-hero-center { padding: 28px 18px 0; }
    .ps5-hero-h1 { font-size: clamp(30px, 9vw, 52px); margin-bottom: 20px; }
    .ps5-hero-deck { font-size: 15px; max-width: 100%; margin-bottom: 28px; }
    .ps5-hero-bottom { padding: 12px 18px; }
    .ps5-hbtm-item { font-size: 9px; padding: 3px 12px 3px 0; margin-right: 12px; }
    .ps5-body { padding: 48px 18px 72px; }
    .ps5-masthead { flex-direction: column; gap: 4px; }
    .ps5-masthead-meta { text-align: left; padding-left: 0; }
    .ps5-newspage { grid-template-columns: 1fr; }
    .ps5-newspage .ps5-col-div { display: none; }
    .ps5-news-col { margin-bottom: 20px; }
    .ps5-case-inner { grid-template-columns: 1fr; }
    .ps5-case-sidebar { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 12px; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); }
    .ps5-case-year { font-size: 20px; }
    .ps5-case-verdict { margin-top: 0; }
    .ps5-class-grid { grid-template-columns: 1fr; }
    .ps5-class-cell { border-right: none; }
    .ps5-class-cell:nth-last-child(-n+2) { border-bottom: 1px solid var(--ps5-rule); }
    .ps5-class-cell:last-child { border-bottom: none; }
    .ps5-ticker-body { grid-template-columns: 1fr; }
    .ps5-ticker-body .ps5-tick-item { border-right: none; border-bottom: 1px solid var(--ps5-rule); }
    .ps5-ticker-body .ps5-tick-item:last-child { border-bottom: none; }
    .ps5-relation { grid-template-columns: 1fr; }
    .ps5-rel-col:first-child { border-right: none; border-bottom: 1px solid var(--ps5-rule); }
  }
`;

const faqs = [
  {
    q: "What was the popular movement for democracy in Nepal (2006)?",
    a: <><strong>Nepal's 2006 movement</strong> was an extraordinary popular uprising to restore democracy. Background: In 1990, democracy was established with the king nominally as head of state. However, when the king moved to concentrate power, all major political parties formed a <strong>Seven Party Alliance (SPA)</strong> and organised a four-day general strike in Kathmandu.<br/><br/>
    The movement saw active participation from <strong>Maoist insurgents</strong>, labour unions, indigenous organisations, teachers, lawyers and human rights groups. Their three main demands were: <strong>restoration of parliament, power to an all-party government, and a new constituent assembly</strong>.<br/><br/>
    On <strong>24 April 2006</strong>, the last day of the ultimatum, the king was forced to concede all three demands. <strong>Girija Prasad Koirala</strong> was chosen as the new PM of the interim government. The SPA and Maoists later agreed on how the new Constituent Assembly would be elected.</>
  },
  {
    q: "What was Bolivia's Water War (2000)?",
    a: <><strong>Bolivia's Water War</strong> was a landmark popular protest against water privatisation. Bolivia is a poor country in Latin America. The <strong>World Bank pressurised</strong> the Bolivian government to give up its control of municipal water supply. The government sold the water rights for the city of <strong>Cochabamba to a multinational company (MNC)</strong>.<br/><br/>
    The MNC immediately <strong>increased water prices four times</strong>, causing a spontaneous popular protest. A new alliance of <strong>labour leaders, human rights organisations and community groups</strong> — led by a non-political organisation called <strong>FEDECOR</strong> — forced MNC officials to flee the city and compelled the government to concede all protesters' demands.<br/><br/>
    The <strong>contract with the MNC was cancelled</strong> and water supply was restored to the municipality at old rates. This came to be known as Bolivia's Water War. The Socialist Party that supported this movement came to power in Bolivia in 2006.</>
  },
  {
    q: "How does democracy evolve through popular struggles?",
    a: <><strong>Democracy evolves through popular struggles</strong>, not just through formal elections and institutions. Three key points:<br/><br/>
    1. These struggles usually involve <strong>conflict between groups that currently hold power</strong> and those that aspire to a share of it.<br/>
    2. Such moments typically occur when a country is going through <strong>transition to democracy</strong>, <strong>expansion of democracy</strong>, or <strong>deepening of democracy</strong>.<br/>
    3. Democratic conflicts are resolved through <strong>mass mobilisation</strong> — bringing large numbers of ordinary citizens into active participation.<br/><br/>
    These mobilisations are organised through new political structures: <strong>political parties, pressure groups, and movement groups</strong>. Nepal and Bolivia are modern examples of this process.</>
  },
  {
    q: "What are pressure groups? How are they different from political parties?",
    a: <><strong>Pressure groups</strong> are organisations that attempt to influence government policies. They differ from political parties in a key way: <strong>pressure groups do NOT aim to directly control or share political power</strong> — they only seek to influence those who do.<br/><br/>
    They are formed when people with <strong>common occupations, interests, aspirations or opinions</strong> come together to achieve a common objective. Examples include trade unions, business associations, and professional groups.<br/><br/>
    <strong>Movements</strong> are similar to pressure groups in that they also try to influence politics rather than contest elections, but they differ in having a <strong>looser organisation, more informal decision-making</strong>, and depending much more on <strong>spontaneous mass participation</strong>.</>
  },
  {
    q: "What is the difference between sectional interest groups and public interest groups?",
    a: <><strong>Sectional Interest Groups:</strong><br/>
    — Represent a <strong>specific section of society</strong>: workers, employees, businesspersons, industrialists, religious communities, caste groups, etc.<br/>
    — Their principal concern is the <strong>betterment of their own members</strong>, not society in general.<br/>
    — Sometimes they represent a common or general interest that needs to be defended.<br/>
    — Members of the organisation benefit directly from its activities.<br/><br/>
    <strong>Public Interest Groups:</strong><br/>
    — Promote <strong>collective rather than selective good</strong><br/>
    — Aim to help <strong>groups other than their own members</strong><br/>
    — In some cases, members may also benefit alongside others, but the primary goal is broader public welfare.<br/>
    — Examples: environmental groups, human rights organisations, consumer protection groups</>
  },
  {
    q: "What are movement groups? Give examples.",
    a: <><strong>Movement groups</strong> are organisations that try to influence politics and policy but are not political parties. Two main types:<br/><br/>
    <strong>Issue-specific movements:</strong> Seek to achieve a single objective within a limited time frame. They have a clear leadership and some organisation. Their <strong>active life is usually short</strong> — once the issue is resolved, they may dissolve. Example: Nepalese Democratic Movement.<br/><br/>
    <strong>Generic/broad movements:</strong> Seek to achieve a broad goal in the long term. Example: <strong>Narmada Bachao Andolan</strong> — opposing large dam construction and demanding rights of displaced people.<br/><br/>
    The <strong>environmental movement</strong> is a label for a large number of organisations and issue-specific movements. <strong>NAPM (National Alliance for Peoples' Movements)</strong> coordinates the activities of many such movements in India, functioning as a loose umbrella organisation.</>
  },
  {
    q: "How do pressure groups and movements influence the government?",
    a: <><strong>Methods of influence include:</strong><br/><br/>
    1. <strong>Public campaigns</strong> — carrying out information campaigns, organising meetings, filing petitions to gain public support and sympathy<br/>
    2. <strong>Media pressure</strong> — trying to influence the media to give more attention to their issues<br/>
    3. <strong>Protest activities</strong> — organising strikes or disrupting government programmes<br/>
    4. <strong>Lobbying</strong> — business groups often employ professional lobbyists or sponsor expensive advertisements<br/>
    5. <strong>Official participation</strong> — some members participate in official government bodies and advisory committees<br/><br/>
    These methods allow groups outside formal politics to still shape public policy and government decisions.</>
  },
  {
    q: "What is the relationship between political parties and pressure groups?",
    a: <><strong>The relationship is complex and mutually reinforcing:</strong><br/><br/>
    1. Many pressure groups are <strong>formed or led by leaders of political parties</strong>, or function as extended arms of parties<br/>
    2. Most leaders of pressure groups are <strong>activists and leaders of parties</strong><br/>
    3. Sometimes, <strong>political parties grow out of movements</strong> — a successful movement transforms into a party (e.g., Bolivia's Socialist Party grew from the water privatisation movement)<br/>
    4. <strong>Movement groups raise new issues</strong> that are later taken up by political parties as part of their agenda<br/>
    5. Most <strong>new leadership of political parties comes from interest or movement groups</strong></>
  },
  {
    q: "Is the influence of pressure groups healthy for democracy?",
    a: <><strong>Yes, overall their influence is considered healthy</strong>, for three key reasons:<br/><br/>
    1. <strong>Counter to elite capture:</strong> Governments can come under pressure from small groups of rich and powerful people. Pressure groups and movements <strong>remind governments of the needs of ordinary citizens</strong>, counterbalancing elite influence.<br/><br/>
    2. <strong>Prevents dominance:</strong> Where different groups function actively, <strong>no single group can achieve dominance over society</strong> — power remains distributed.<br/><br/>
    3. <strong>Informed governance:</strong> The government gets to hear what <strong>different sections of the population want</strong>, leading to a rough balance of power and more representative policy-making.<br/><br/>
    The key is that multiple, competing groups function — not just one powerful lobby.</>
  },
];

export default function PopularStrugglesAndMovements() {
  const [openIdx, setOpenIdx] = useState(null);
  const tog = (i) => setOpenIdx(openIdx === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="ps5-root">

        {/* ══ HERO ══ */}
        <div className="ps5-hero">
          <div className="ps5-hero-dots" />
          <div className="ps5-hero-ghost">5</div>

          <div className="ps5-hero-nav">
            <div className="ps5-nav-brand">Shikshacom · Civics</div>
            <div className="ps5-nav-pill">Chapter 5 · Democratic Politics II</div>
          </div>

          <div className="ps5-hero-center">
            <div className="ps5-hero-eyebrow">CBSE Class 10 · Political Science</div>
            <h1 className="ps5-hero-h1">Popular Struggles<br />&amp; Movements</h1>
            <p className="ps5-hero-deck">
              Democracy is never handed down — it is <strong>fought for, again and again</strong>.
              From Nepal's streets to Bolivia's water crisis, this chapter shows how ordinary
              people organise to change the world.
            </p>
            <div className="ps5-hero-stats">
              <div className="ps5-hero-stat">
                <div className="ps5-hstat-val">2006</div>
                <div className="ps5-hstat-label">Nepal's Democracy Restored</div>
              </div>
              <div className="ps5-hero-stat">
                <div className="ps5-hstat-val">4×</div>
                <div className="ps5-hstat-label">Bolivia Water Price Hike</div>
              </div>
              <div className="ps5-hero-stat">
                <div className="ps5-hstat-val">SPA</div>
                <div className="ps5-hstat-label">Seven Party Alliance</div>
              </div>
              <div className="ps5-hero-stat">
                <div className="ps5-hstat-val">2</div>
                <div className="ps5-hstat-label">Types of Interest Groups</div>
              </div>
            </div>
          </div>

          <div className="ps5-hero-bottom">
            {["Nepal Movement","Bolivia Water War","Evolution of Democracy","Pressure Groups","Movement Groups","Political Parties","Healthy Influence?"].map(t => (
              <div className="ps5-hbtm-item" key={t}>{t}</div>
            ))}
          </div>
        </div>

        {/* ══ BODY ══ */}
        <div className="ps5-body">

          {/* ── MASTHEAD ── */}
          <div className="ps5-masthead">
            <div className="ps5-masthead-title">THE DEMOCRACY GAZETTE</div>
            <div className="ps5-masthead-meta">
              Chapter 5 · Democratic Politics II<br/>
              Popular Struggles &amp; Movements
            </div>
          </div>

          {/* ── 3-COL INTRO ── */}
          <div className="ps5-newspage">
            <div className="ps5-news-col">
              <div className="ps5-news-col-hed">The Core Idea</div>
              <div className="ps5-news-body">
                <p>Democracy does not simply exist — it <strong>evolves through popular struggle</strong>. Each expansion of rights, each constitutional reform, each protection of minorities has at some point required ordinary people to organise, protest and demand change.</p>
                <p>These struggles usually involve conflict between <strong>those who exercise power</strong> and those who aspire to a share of it.</p>
              </div>
            </div>
            <div className="ps5-col-div" />
            <div className="ps5-news-col">
              <div className="ps5-news-col-hed">When It Happens</div>
              <div className="ps5-news-body">
                <p>Such moments of democratic struggle typically occur during <strong>three phases</strong>: when a country is transitioning to democracy, when democracy is being expanded to include more people, or when democracy is being deepened to be more meaningful.</p>
                <p>Democratic conflicts are ultimately resolved through <strong>mass mobilisation</strong> — not just legal processes alone.</p>
              </div>
            </div>
            <div className="ps5-col-div" />
            <div className="ps5-news-col">
              <div className="ps5-news-col-hed">The Organisations</div>
              <div className="ps5-news-body">
                <p>These mobilisations are channelled through new political organisations: <strong>political parties, pressure groups, and movement groups</strong>. Each plays a different role.</p>
                <p>Nepal and Bolivia — the two case studies in this chapter — perfectly illustrate how <strong>diverse coalitions</strong> of organisations can force even resistant governments to change.</p>
              </div>
            </div>
          </div>

          {/* ── CASE STUDIES ── */}
          <div className="ps5-sec-rule">
            <div className="ps5-sec-rule-num">01</div>
            <div className="ps5-sec-rule-title">Case Studies</div>
            <div className="ps5-sec-rule-right">Two movements that changed history</div>
          </div>

          {/* Nepal */}
          <div className="ps5-case">
            <div className="ps5-breaking">
              <div className="ps5-breaking-tag">Breaking News</div>
              <div className="ps5-breaking-text">Nepal · April 2006 · King forced to concede all demands after mass uprising</div>
            </div>
            <div className="ps5-case-inner">
              <div className="ps5-case-sidebar">
                <div className="ps5-case-flag">🇳🇵</div>
                <div className="ps5-case-country">Nepal<br/>Democracy<br/>Movement</div>
                <div className="ps5-case-year">2006</div>
                <div className="ps5-case-verdict">✓ All demands won</div>
              </div>
              <div className="ps5-case-main">
                <div className="ps5-case-kicker">Popular Struggle · South Asia</div>
                <div className="ps5-case-headline">Seven Party Alliance Forces King to Restore Democracy After Four-Day Strike</div>
                <div className="ps5-case-body">
                  In 1990, democracy was established in Nepal with the king nominally remaining as head of state. When the king moved to consolidate power, all major political parties formed the <strong>Seven Party Alliance (SPA)</strong>. They organised a four-day general strike in Kathmandu, joined by <strong>Maoist insurgents, labour unions, indigenous organisations, teachers, lawyers and human rights groups</strong>.<br/><br/>
                  On <strong>24 April 2006</strong>, the last day of the ultimatum, the king conceded. <strong>Girija Prasad Koirala</strong> became PM of the interim government. The SPA and Maoists agreed on how the new Constituent Assembly would be elected — Nepal's democracy was restored.
                </div>
                <div className="ps5-demands">
                  {["Restoration of Parliament","Power to All-Party Government","New Constituent Assembly"].map(d => (
                    <div className="ps5-demand" key={d}>{d}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bolivia */}
          <div className="ps5-case">
            <div className="ps5-breaking">
              <div className="ps5-breaking-tag">Special Report</div>
              <div className="ps5-breaking-text">Bolivia · 2000 · Water privatisation reversed after mass protest — MNC officials flee city</div>
            </div>
            <div className="ps5-case-inner">
              <div className="ps5-case-sidebar">
                <div className="ps5-case-flag">🇧🇴</div>
                <div className="ps5-case-country">Bolivia<br/>Water<br/>War</div>
                <div className="ps5-case-year">2000</div>
                <div className="ps5-case-verdict">✓ Contract cancelled</div>
              </div>
              <div className="ps5-case-main">
                <div className="ps5-case-kicker">People vs Privatisation · Latin America</div>
                <div className="ps5-case-headline">Popular Alliance Forces Government to Cancel MNC Water Contract After 4× Price Hike</div>
                <div className="ps5-case-body">
                  Bolivia, a poor country in Latin America, was pressured by the <strong>World Bank</strong> to give up municipal water supply control. The government sold water rights for Cochabamba to a <strong>multinational company</strong>, which immediately raised water prices <strong>four times</strong>.<br/><br/>
                  This sparked spontaneous protest. A new alliance led by <strong>FEDECOR</strong> — comprising engineers, environmentalists, irrigation farmers, factory workers and students — forced MNC officials to flee and compelled the government to cancel the contract. Water was restored at old rates. The <strong>Socialist Party</strong> that backed this movement came to power in Bolivia in 2006.
                </div>
                <div className="ps5-demands">
                  {["Cancel MNC Contract","Restore Municipal Water","Return to Old Rates"].map(d => (
                    <div className="ps5-demand" key={d}>{d}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── PRESSURE GROUPS ── */}
          <div className="ps5-sec-rule">
            <div className="ps5-sec-rule-num">02</div>
            <div className="ps5-sec-rule-title">Pressure Groups &amp; Movements</div>
            <div className="ps5-sec-rule-right">Types and distinctions</div>
          </div>

          <h2 className="ps5-h2">Four Types of <em>Political Organisations</em></h2>
          <p className="ps5-prose">
            Besides political parties, democracy depends on a wide ecosystem of organisations that
            represent different interests, push for different causes, and keep power accountable.
            Understanding these types is crucial.
          </p>

          <div className="ps5-classified">
            <div className="ps5-class-header">
              <div className="ps5-class-header-title">Classification of Political Organisations</div>
              <div className="ps5-class-header-sub">Beyond Political Parties</div>
            </div>
            <div className="ps5-class-grid">
              {[
                {
                  tag: "Type A", title: "Sectional Interest Groups",
                  body: <>Represent a <strong>specific section</strong> of society — workers, employees, businesspersons, industrialists, religious communities or caste groups. Their principal concern is the <strong>betterment of their own members</strong>.</>,
                  eg: "e.g. Trade unions, business associations, caste groups"
                },
                {
                  tag: "Type B", title: "Public Interest Groups",
                  body: <>Promote <strong>collective rather than selective good</strong>. Aim to help groups other than their own members. Members may sometimes benefit too, but the goal is broader <strong>public welfare</strong>.</>,
                  eg: "e.g. Environmental groups, human rights organisations"
                },
                {
                  tag: "Type C", title: "Issue-Specific Movements",
                  body: <>Seek to achieve a <strong>single objective</strong> within a limited time frame. Have clear leadership and some organisation. <strong>Active life is usually short</strong> — they dissolve once the objective is achieved.</>,
                  eg: "e.g. Nepal Democratic Movement, Bolivia Water War"
                },
                {
                  tag: "Type D", title: "Generic/Broad Movements",
                  body: <>Seek to achieve a <strong>broad goal in the long term</strong>. More diffuse, loosely organised, depend on spontaneous participation. Can persist for decades. Often loosely coordinated by umbrella bodies.</>,
                  eg: "e.g. Narmada Bachao Andolan, Environmental movement, NAPM"
                },
              ].map((c, i) => (
                <div className="ps5-class-cell" key={i}>
                  <div className="ps5-class-tag">{c.tag}</div>
                  <div className="ps5-class-title">{c.title}</div>
                  <div className="ps5-class-body">{c.body}</div>
                  <div className="ps5-class-eg">{c.eg}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="ps5-alert violet">
            <div className="ps5-alert-icon">💡</div>
            <div className="ps5-alert-text">
              <strong>Key Distinction:</strong> Unlike political parties, pressure groups and movements do NOT aim to directly control or share political power — they only seek to <strong>influence</strong> those who do. This is the single most tested difference in exams.
            </div>
          </div>

          {/* ── INFLUENCE METHODS ── */}
          <div className="ps5-sec-rule">
            <div className="ps5-sec-rule-num">03</div>
            <div className="ps5-sec-rule-title">How They Influence Politics</div>
            <div className="ps5-sec-rule-right">Methods of pressure</div>
          </div>

          <div className="ps5-ticker">
            <div className="ps5-ticker-header">
              <div className="ps5-ticker-dot" />
              Methods Used by Pressure Groups &amp; Movements
            </div>
            <div className="ps5-ticker-body">
              {[
                { icon:"📢", head:"Public Campaigns", body:"Information campaigns, meetings and petitions to gain public support and sympathy for their goals." },
                { icon:"📰", head:"Media Pressure", body:"Influencing media to give more attention to issues they care about — shaping public narrative." },
                { icon:"✊", head:"Protest & Disruption", body:"Organising strikes or disrupting government programmes to force attention." },
                { icon:"💼", head:"Lobbying", body:"Business groups employ professional lobbyists or sponsor expensive advertisements to influence policy." },
                { icon:"🏛️", head:"Official Participation", body:"Some members join official government bodies and advisory committees to influence from within." },
                { icon:"🤝", head:"Coalition Building", body:"Forming alliances with political parties and other groups to amplify their voice and reach." },
              ].map((t, i) => (
                <div className="ps5-tick-item" key={i}>
                  <div className="ps5-tick-icon">{t.icon}</div>
                  <div>
                    <div className="ps5-tick-head">{t.head}</div>
                    <div className="ps5-tick-body">{t.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── PARTIES & PRESSURE ── */}
          <div className="ps5-sec-rule">
            <div className="ps5-sec-rule-num">04</div>
            <div className="ps5-sec-rule-title">Parties &amp; Pressure Groups</div>
            <div className="ps5-sec-rule-right">The relationship</div>
          </div>

          <div className="ps5-relation">
            <div className="ps5-rel-col">
              <div className="ps5-rel-head">How Pressure Groups Relate to Parties</div>
              {[
                <>Many pressure groups are <strong>formed or led by party leaders</strong> — or act as extended arms of parties.</>,
                <>Most pressure group leaders are also <strong>activists and leaders of political parties</strong>.</>,
                <>Sometimes political parties <strong>grow out of movements</strong> — a movement becomes a party when it seeks electoral power.</>,
                <>Movement groups <strong>raise new issues</strong> that are later adopted by political parties as part of their platform.</>,
              ].map((t, i) => (
                <div className="ps5-rel-item" key={i}>
                  <div className="ps5-rel-dot" />
                  <div className="ps5-rel-text">{t}</div>
                </div>
              ))}
            </div>
            <div className="ps5-rel-col">
              <div className="ps5-rel-head">How Parties Relate to Pressure Groups</div>
              {[
                <>Most <strong>new leadership of political parties</strong> comes from interest or movement groups — not from within traditional party structures.</>,
                <>Parties <strong>rely on pressure group networks</strong> for grassroots mobilisation during elections.</>,
                <>Parties often <strong>support or fund</strong> allied pressure groups to build their own influence base.</>,
                <>The <strong>Socialist Party in Bolivia</strong> came to power riding the wave of the water privatisation movement — a direct example of this link.</>,
              ].map((t, i) => (
                <div className="ps5-rel-item" key={i}>
                  <div className="ps5-rel-dot" />
                  <div className="ps5-rel-text">{t}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="ps5-verdict">
            <div className="ps5-verdict-label">Final Verdict · Is Their Influence Healthy?</div>
            <div className="ps5-verdict-q">
              Where different groups function actively,<br />
              <em>no single group can achieve dominance</em> over society.
            </div>
            <div className="ps5-verdict-body">
              Pressure groups and movements are healthy for democracy in three ways: they <strong>remind governments of ordinary citizens' needs</strong> when the rich and powerful try to dominate; they ensure <strong>no single group achieves monopoly power</strong>; and they help the government hear what <strong>different sections of the population want</strong> — leading to a rough but real balance of power.
            </div>
          </div>

          {/* ── FAQ ── */}
          <div className="ps5-faq-rule">
            <div className="ps5-faq-rule-tag">Exam Prep · FAQ</div>
            <div className="ps5-faq-rule-line" />
          </div>
          <h2 className="ps5-faq-h2">All You Need to Know</h2>

          {faqs.map((faq, i) => (
            <div className={`ps5-faq-item${openIdx === i ? " open" : ""}`} key={i}>
              <button className="ps5-faq-q" onClick={() => tog(i)}>
                <span className="ps5-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="ps5-faq-icon">{openIdx === i ? "▴" : "▾"}</span>
              </button>
              <div className={`ps5-faq-ans${openIdx === i ? " open" : ""}`}>
                <div className="ps5-faq-ans-inner">{faq.a}</div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
