import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #110818;
    --ink2:       #221030;
    --muted:      #6b5080;
    --paper:      #faf6ff;
    --paper2:     #f0e8fc;
    --accent:     #9b1fd4;
    --accent2:    #721099;
    --accent-lt:  #f0d6ff;
    --coral:      #e05533;
    --coral-lt:   #fdeee9;
    --teal:       #0e7c72;
    --teal-lt:    #d8f5f2;
    --gold:       #c47c00;
    --gold-lt:    #fff5d6;
    --rule:       #e0ceee;
    --white:      #ffffff;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .gie-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  /* HERO */
  .gie-hero {
    background: linear-gradient(135deg, #0a0312 0%, #180628 55%, #210838 100%);
    min-height: 88vh; display: flex; align-items: flex-end;
    position: relative; overflow: hidden; padding: 0 0 64px;
  }
  .gie-hero::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #9b1fd4 0%, #e05533 40%, #c47c00 70%, #0e7c72 100%);
  }
  .gie-hero-bg-num {
    position: absolute; bottom: -60px; right: -30px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(220px, 36vw, 500px); font-weight: 900;
    line-height: 1; color: rgba(255,255,255,0.022);
    letter-spacing: -0.04em; user-select: none; pointer-events: none;
  }
  .gie-globe {
    position: absolute; top: 50%; right: 5%; transform: translateY(-50%);
    width: clamp(160px, 22vw, 300px); height: clamp(160px, 22vw, 300px);
    border-radius: 50%; border: 1px solid rgba(155,31,212,0.15); pointer-events: none;
  }
  .gie-globe::before {
    content: ''; position: absolute; inset: 15%; border-radius: 50%;
    border: 1px solid rgba(155,31,212,0.1);
  }
  .gie-globe::after {
    content: ''; position: absolute; inset: 35%; border-radius: 50%;
    border: 1px solid rgba(155,31,212,0.08);
  }
  .gie-hero-line {
    position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    background: repeating-linear-gradient(-55deg, transparent, transparent 80px, rgba(155,31,212,0.025) 80px, rgba(155,31,212,0.025) 81px);
    pointer-events: none;
  }
  .gie-glow {
    position: absolute; top: 20%; left: 10%; width: 280px; height: 280px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(155,31,212,0.13) 0%, transparent 70%);
    pointer-events: none;
  }
  .gie-hero-inner { max-width: 900px; width: 100%; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
  .gie-overline {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; color: #d59bff;
    margin-bottom: 24px; display: flex; align-items: center; gap: 14px;
  }
  .gie-overline::before, .gie-overline::after { content: ''; flex: 0 0 40px; height: 1px; background: #d59bff; }
  .gie-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(38px, 7.5vw, 82px); font-weight: 900; color: #fff;
    line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 32px;
  }
  .gie-hero-title em   { font-style: normal; color: #d59bff; }
  .gie-hero-title .em2 { color: #ff9d7a; }
  .gie-hero-bar { display: flex; flex-wrap: wrap; gap: 0; border-top: 1px solid rgba(255,255,255,0.12); padding-top: 24px; margin-top: 8px; }
  .gie-hero-bar-item { flex: 1 1 180px; padding: 0 24px 0 0; border-right: 1px solid rgba(255,255,255,0.1); margin-right: 24px; }
  .gie-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .gie-bar-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 5px; }
  .gie-bar-value { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.75); }

  /* BODY */
  .gie-body { max-width: 860px; margin: 0 auto; padding: 72px 32px 96px; }

  /* INTRO CARD */
  .gie-intro-card {
    background: linear-gradient(135deg, #0a0312 0%, #210838 100%);
    border-left: 5px solid #9b1fd4; border-radius: 4px; padding: 36px 40px;
    margin-bottom: 64px; position: relative; overflow: hidden;
  }
  .gie-intro-card::after { content: '🌐'; position: absolute; right: 28px; top: 50%; transform: translateY(-50%); font-size: 72px; opacity: 0.1; }
  .gie-intro-card p { font-family: 'Poppins', sans-serif; font-size: 18px; font-weight: 500; color: rgba(255,255,255,0.88); line-height: 1.78; margin: 0 0 14px; }
  .gie-intro-card p:last-child { margin: 0; }
  .gie-intro-card strong { color: #d59bff; }

  /* SECTION HEADER */
  .gie-sec-head { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 32px; border-bottom: 2px solid var(--rule); padding-bottom: 18px; }
  .gie-sec-num { font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900; color: var(--rule); line-height: 1; flex-shrink: 0; }
  .gie-sec-title-wrap { padding-top: 8px; }
  .gie-sec-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .gie-sec-title { font-family: 'Montserrat', sans-serif; font-size: clamp(22px, 3.5vw, 30px); font-weight: 800; color: var(--ink); line-height: 1.15; letter-spacing: -0.02em; }
  .gie-sec-title span { color: var(--accent); }

  /* BODY TEXT */
  .gie-body-text { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; color: var(--ink2); line-height: 1.85; margin-bottom: 32px; }
  .gie-body-text strong { color: var(--accent2); font-weight: 600; }

  /* DIVIDER */
  .gie-divider { margin: 60px 0; display: flex; align-items: center; gap: 16px; }
  .gie-divider::before, .gie-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .gie-divider-mark { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

  /* TIMELINE */
  .gie-timeline { position: relative; padding-left: 56px; margin-bottom: 40px; }
  .gie-timeline::before { content: ''; position: absolute; left: 20px; top: 8px; bottom: 8px; width: 2px; background: linear-gradient(to bottom, var(--accent), var(--coral), var(--teal)); }
  .gie-tl-item { position: relative; margin-bottom: 36px; }
  .gie-tl-item:last-child { margin-bottom: 0; }
  .gie-tl-dot { position: absolute; left: -43px; top: 6px; width: 18px; height: 18px; border-radius: 50%; background: var(--accent); border: 3px solid var(--paper); box-shadow: 0 0 0 2px var(--accent); }
  .gie-tl-item:nth-child(2) .gie-tl-dot { background: var(--coral); box-shadow: 0 0 0 2px var(--coral); }
  .gie-tl-item:nth-child(3) .gie-tl-dot { background: var(--teal); box-shadow: 0 0 0 2px var(--teal); }
  .gie-tl-item:nth-child(4) .gie-tl-dot { background: var(--gold); box-shadow: 0 0 0 2px var(--gold); }
  .gie-tl-era { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 5px; }
  .gie-tl-item:nth-child(1) .gie-tl-era { color: var(--accent); }
  .gie-tl-item:nth-child(2) .gie-tl-era { color: var(--coral); }
  .gie-tl-item:nth-child(3) .gie-tl-era { color: var(--teal); }
  .gie-tl-item:nth-child(4) .gie-tl-era { color: var(--gold); }
  .gie-tl-head { font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 800; color: var(--ink); margin-bottom: 8px; letter-spacing: -0.01em; }
  .gie-tl-desc { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: var(--ink2); line-height: 1.75; }
  .gie-tl-desc strong { color: var(--accent2); font-weight: 600; }

  /* MNC DEF BANNER */
  .gie-def-banner {
    background: linear-gradient(135deg, #0a0312 0%, #210838 100%);
    border-radius: 8px; padding: 32px 36px; margin-bottom: 36px;
    display: flex; gap: 28px; align-items: center; flex-wrap: nowrap;
  }
  @media (max-width: 560px) {
    .gie-def-banner { flex-direction: column; align-items: flex-start; gap: 16px; padding: 24px 22px; }
    .gie-def-vline { display: none; }
  }
  .gie-def-acronym {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(40px, 8vw, 56px); font-weight: 900;
    color: #d59bff; line-height: 1; flex-shrink: 0;
    letter-spacing: -0.02em; align-self: center;
  }
  .gie-def-vline {
    width: 2px; background: rgba(255,255,255,0.15);
    align-self: stretch; flex-shrink: 0; min-height: 70px;
  }
  .gie-def-body { flex: 1; min-width: 0; }
  .gie-def-title { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 10px; }
  .gie-def-text { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: rgba(255,255,255,0.72); line-height: 1.75; }
  .gie-def-text strong { color: #d59bff; }

  /* ICON GRID */
  .gie-icon-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 36px; }
  @media (max-width: 640px) { .gie-icon-grid { grid-template-columns: 1fr; } }
  .gie-icon-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 8px; padding: 24px 20px; text-align: center; }
  .gie-icon-card-emoji { font-size: 36px; margin-bottom: 12px; display: block; }
  .gie-icon-card-title { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: var(--accent2); margin-bottom: 8px; }
  .gie-icon-card-text { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 400; color: var(--muted); line-height: 1.65; }

  /* MODES STRIP */
  .gie-modes-strip { display: flex; gap: 0; border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; margin-bottom: 36px; }
  @media (max-width: 640px) { .gie-modes-strip { flex-direction: column; } }
  .gie-mode-item { flex: 1; padding: 24px 20px; border-right: 1.5px solid var(--rule); background: var(--white); position: relative; }
  .gie-mode-item:last-child { border-right: none; }
  @media (max-width: 640px) { .gie-mode-item { border-right: none; border-bottom: 1.5px solid var(--rule); } .gie-mode-item:last-child { border-bottom: none; } }
  .gie-mode-num { font-family: 'Montserrat', sans-serif; font-size: 40px; font-weight: 900; color: var(--rule); line-height: 1; margin-bottom: 8px; }
  .gie-mode-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .gie-mode-title { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: var(--ink); margin-bottom: 8px; line-height: 1.3; }
  .gie-mode-text { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 400; color: var(--muted); line-height: 1.65; }
  .gie-mode-text strong { color: var(--accent2); font-weight: 600; }

  /* PROSE PANEL */
  .gie-prose-panel { display: flex; gap: 0; border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; margin-bottom: 36px; }
  @media (max-width: 600px) { .gie-prose-panel { flex-direction: column; } }
  .gie-prose-accent-bar { width: 6px; flex-shrink: 0; background: linear-gradient(to bottom, var(--accent), var(--teal)); }
  @media (max-width: 600px) { .gie-prose-accent-bar { width: auto; height: 6px; } }
  .gie-prose-body { padding: 28px 28px; background: var(--white); flex: 1; }
  .gie-prose-label { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); margin-bottom: 10px; }
  .gie-prose-heading { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; color: var(--ink); margin-bottom: 16px; letter-spacing: -0.01em; }
  .gie-prose-text { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: var(--ink2); line-height: 1.8; margin-bottom: 14px; }
  .gie-prose-text:last-child { margin-bottom: 0; }
  .gie-prose-text strong { color: var(--accent2); font-weight: 600; }

  /* FEATURE ROWS */
  .gie-feature-rows { margin-bottom: 36px; }
  .gie-feature-row { display: flex; gap: 0; margin-bottom: 16px; border: 1.5px solid var(--rule); border-radius: 6px; overflow: hidden; }
  .gie-feature-row:last-child { margin-bottom: 0; }
  .gie-fr-icon-col { width: 80px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 30px; }
  .gie-feature-row:nth-child(1) .gie-fr-icon-col { background: var(--accent-lt); }
  .gie-feature-row:nth-child(2) .gie-fr-icon-col { background: var(--coral-lt); }
  .gie-feature-row:nth-child(3) .gie-fr-icon-col { background: var(--teal-lt); }
  .gie-feature-row:nth-child(4) .gie-fr-icon-col { background: var(--gold-lt); }
  .gie-fr-body { flex: 1; padding: 18px 22px; background: var(--white); border-left: 1.5px solid var(--rule); }
  .gie-fr-title { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 5px; }
  .gie-fr-text { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400; color: var(--ink2); line-height: 1.7; }
  .gie-fr-text strong { color: var(--accent2); font-weight: 600; }

  /* LIB BLOCK */
  .gie-lib-block { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 36px; }
  @media (max-width: 620px) { .gie-lib-block { grid-template-columns: 1fr; } }
  .gie-lib-card { border-radius: 8px; padding: 28px 26px; border: 1.5px solid var(--rule); }
  .gie-lib-card.dark { background: linear-gradient(135deg, #0a0312, #210838); border-color: transparent; }
  .gie-lib-card.light { background: var(--white); }
  .gie-lib-icon { font-size: 32px; display: block; margin-bottom: 14px; }
  .gie-lib-tag { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 8px; }
  .gie-lib-card.dark  .gie-lib-tag { color: #d59bff; }
  .gie-lib-card.light .gie-lib-tag { color: var(--accent); }
  .gie-lib-title { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; margin-bottom: 16px; line-height: 1.2; letter-spacing: -0.01em; }
  .gie-lib-card.dark  .gie-lib-title { color: #fff; }
  .gie-lib-card.light .gie-lib-title { color: var(--ink); }
  .gie-lib-points { list-style: none; padding: 0; }
  .gie-lib-points li { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; padding: 9px 0 9px 22px; border-bottom: 1px solid rgba(0,0,0,0.06); position: relative; line-height: 1.65; }
  .gie-lib-card.dark  .gie-lib-points li { color: rgba(255,255,255,0.78); border-bottom-color: rgba(255,255,255,0.07); }
  .gie-lib-card.light .gie-lib-points li { color: var(--ink2); }
  .gie-lib-points li:last-child { border-bottom: none; }
  .gie-lib-points li::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 7px; height: 7px; border-radius: 50%; }
  .gie-lib-card.dark  .gie-lib-points li::before { background: #d59bff; }
  .gie-lib-card.light .gie-lib-points li::before { background: var(--accent); }
  .gie-lib-points li strong { font-weight: 600; }
  .gie-lib-card.dark  .gie-lib-points li strong { color: #d59bff; }
  .gie-lib-card.light .gie-lib-points li strong { color: var(--accent2); }

  /* WTO CALLOUT */
  .gie-wto-callout { background: var(--coral-lt); border: 1.5px solid #f5bcaa; border-left: 5px solid var(--coral); border-radius: 4px; padding: 24px 28px; margin-bottom: 36px; }
  .gie-wto-callout-head { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 700; color: var(--coral); margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
  .gie-wto-callout-text { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: #7a2010; line-height: 1.75; }
  .gie-wto-callout-text strong { color: var(--coral); font-weight: 600; }

  /* IMPACT LIST */
  .gie-impact-list { margin-bottom: 36px; }
  .gie-impact-item { display: flex; gap: 20px; align-items: flex-start; padding: 24px 0; border-bottom: 1.5px solid var(--rule); }
  .gie-impact-item:last-child { border-bottom: none; }
  .gie-impact-icon-wrap { width: 52px; height: 52px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 24px; flex-shrink: 0; }
  .gie-impact-icon-wrap.purple { background: var(--accent-lt); }
  .gie-impact-icon-wrap.coral  { background: var(--coral-lt); }
  .gie-impact-icon-wrap.teal   { background: var(--teal-lt); }
  .gie-impact-icon-wrap.gold   { background: var(--gold-lt); }
  .gie-impact-icon-wrap.dark   { background: var(--paper2); }
  .gie-impact-body { flex: 1; }
  .gie-impact-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 5px; }
  .gie-impact-item:nth-child(1) .gie-impact-label { color: var(--accent); }
  .gie-impact-item:nth-child(2) .gie-impact-label { color: var(--coral); }
  .gie-impact-item:nth-child(3) .gie-impact-label { color: var(--teal); }
  .gie-impact-item:nth-child(4) .gie-impact-label { color: var(--gold); }
  .gie-impact-item:nth-child(5) .gie-impact-label { color: var(--muted); }
  .gie-impact-title { font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 8px; line-height: 1.3; }
  .gie-impact-text { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: var(--ink2); line-height: 1.75; }
  .gie-impact-text strong { color: var(--accent2); font-weight: 600; }

  /* WINNERS / LOSERS */
  .gie-wl-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 36px; }
  @media (max-width: 580px) { .gie-wl-grid { grid-template-columns: 1fr; } }
  .gie-wl-card { border-radius: 8px; overflow: hidden; border: 1.5px solid var(--rule); }
  .gie-wl-header { padding: 18px 22px; }
  .gie-wl-card.win  .gie-wl-header { background: linear-gradient(135deg, #0a2a1a, #0d3520); }
  .gie-wl-card.lose .gie-wl-header { background: linear-gradient(135deg, #2a0a0a, #3a1010); }
  .gie-wl-badge { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 4px; padding: 4px 12px; border-radius: 100px; display: inline-block; }
  .gie-wl-card.win  .gie-wl-badge { background: rgba(110,231,168,0.15); color: #6ee7a8; }
  .gie-wl-card.lose .gie-wl-badge { background: rgba(248,113,113,0.15); color: #f87171; }
  .gie-wl-title { font-family: 'Montserrat', sans-serif; font-size: 17px; font-weight: 900; color: #fff; letter-spacing: -0.01em; }
  .gie-wl-body { padding: 20px 22px; background: var(--white); }
  .gie-wl-body ul { list-style: none; padding: 0; }
  .gie-wl-body ul li { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400; color: var(--ink2); padding: 8px 0 8px 18px; border-bottom: 1px solid var(--rule); position: relative; line-height: 1.6; }
  .gie-wl-body ul li:last-child { border-bottom: none; }
  .gie-wl-body ul li::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 6px; height: 6px; border-radius: 50%; }
  .gie-wl-card.win  .gie-wl-body ul li::before { background: #059669; }
  .gie-wl-card.lose .gie-wl-body ul li::before { background: var(--coral); }
  .gie-wl-body ul li strong { color: var(--accent2); font-weight: 600; }

  /* PULL QUOTE */
  .gie-pull-quote { border-left: 5px solid var(--accent); background: var(--accent-lt); padding: 26px 34px; margin: 36px 0; border-radius: 0 4px 4px 0; }
  .gie-pull-quote p { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 600; color: var(--accent2); line-height: 1.7; font-style: italic; margin: 0 0 10px; }
  .gie-pull-quote cite { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; color: var(--muted); font-style: normal; }

  /* GOVT ROLES */
  .gie-govt-roles { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 36px; }
  @media (max-width: 580px) { .gie-govt-roles { grid-template-columns: 1fr; } }
  .gie-govt-role-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 6px; padding: 20px 22px; border-top: 3px solid var(--accent); }
  .gie-govt-role-card:nth-child(2) { border-top-color: var(--coral); }
  .gie-govt-role-card:nth-child(3) { border-top-color: var(--teal); }
  .gie-govt-role-card:nth-child(4) { border-top-color: var(--gold); }
  .gie-govt-role-num { font-family: 'Montserrat', sans-serif; font-size: 32px; font-weight: 900; color: var(--rule); line-height: 1; margin-bottom: 6px; }
  .gie-govt-role-title { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: var(--accent2); margin-bottom: 8px; }
  .gie-govt-role-card:nth-child(2) .gie-govt-role-title { color: var(--coral); }
  .gie-govt-role-card:nth-child(3) .gie-govt-role-title { color: var(--teal); }
  .gie-govt-role-card:nth-child(4) .gie-govt-role-title { color: var(--gold); }
  .gie-govt-role-text { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400; color: var(--ink2); line-height: 1.7; }
  .gie-govt-role-text strong { color: var(--accent2); font-weight: 600; }

  /* PEOPLE BOX */
  .gie-people-box { background: linear-gradient(135deg, #0a0312 0%, #210838 100%); border-radius: 8px; padding: 30px 34px; margin-bottom: 36px; display: flex; gap: 24px; align-items: flex-start; flex-wrap: wrap; }
  .gie-people-icon { font-size: 44px; flex-shrink: 0; }
  .gie-people-content { flex: 1; min-width: 200px; }
  .gie-people-tag { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #d59bff; background: rgba(213,155,255,0.12); padding: 4px 12px; border-radius: 100px; display: inline-block; margin-bottom: 10px; }
  .gie-people-title { font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 900; color: #fff; margin-bottom: 10px; letter-spacing: -0.01em; }
  .gie-people-text { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: rgba(255,255,255,0.72); line-height: 1.75; }
  .gie-people-text strong { color: #d59bff; }

  /* DEFS BAND */
  .gie-defs-band { margin-bottom: 36px; }
  .gie-defs-band-title { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-bottom: 16px; }
  .gie-defs-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
  @media (max-width: 580px) { .gie-defs-row { grid-template-columns: 1fr; } }
  .gie-def-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 6px; padding: 18px 20px; border-left: 4px solid var(--accent); }
  .gie-def-card:nth-child(2) { border-left-color: var(--coral); }
  .gie-def-card:nth-child(3) { border-left-color: var(--teal); }
  .gie-def-card:nth-child(4) { border-left-color: var(--gold); }
  .gie-def-card-word { font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 900; color: var(--ink); margin-bottom: 6px; }
  .gie-def-card-meaning { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400; color: var(--ink2); line-height: 1.7; }
  .gie-def-card-meaning strong { color: var(--accent2); font-weight: 600; }

  /* FAQ */
  .gie-faq-header { margin-bottom: 12px; }
  .gie-faq-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); background: var(--accent-lt); padding: 6px 16px; border-radius: 100px; }
  .gie-faq-title { font-family: 'Montserrat', sans-serif; font-size: clamp(26px, 4vw, 36px); font-weight: 900; color: var(--ink); letter-spacing: -0.02em; margin-bottom: 28px; margin-top: 16px; }
  .gie-faq-item { border: 1.5px solid var(--rule); border-radius: 6px; margin-bottom: 12px; overflow: hidden; background: var(--white); transition: border-color 0.2s; }
  .gie-faq-item.open { border-color: var(--accent); }
  .gie-faq-q { width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; text-align: left; gap: 16px; }
  .gie-faq-q-text { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600; color: var(--ink); line-height: 1.5; }
  .gie-faq-item.open .gie-faq-q-text { color: var(--accent); }
  .gie-faq-icon { font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 700; color: var(--accent); flex-shrink: 0; transition: transform 0.2s; }
  .gie-faq-item.open .gie-faq-icon { transform: rotate(45deg); }
  .gie-faq-ans { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: var(--ink2); line-height: 1.8; padding: 0 24px; max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; }
  .gie-faq-ans.visible { max-height: 700px; padding: 0 24px 20px; }
  .gie-faq-ans strong { color: var(--accent2); font-weight: 600; }

  @media (max-width: 700px) {
    .gie-body { padding: 48px 20px 72px; }
    .gie-hero-inner { padding: 0 20px; }
    .gie-intro-card { padding: 24px 22px; }
    .gie-def-banner { padding: 24px 22px; }
    .gie-people-box { padding: 24px 22px; }
  }
`;

const faqs = [
  {
    q: "What is a Multinational Corporation (MNC)? How do MNCs spread production?",
    a: (<>An <strong>MNC (Multinational Corporation)</strong> is a company that owns or controls production in <strong>more than one country</strong>. MNCs spread production by setting up offices and factories where <strong>cheap labour and resources</strong> are available, close to markets, and by providing foreign investment. The most common route is <strong>buying up local companies</strong> and then expanding production. Many top MNCs have wealth exceeding the <strong>entire budget of a developing country government</strong>.</>),
  },
  {
    q: "What is foreign investment? Why do MNCs invest in developing countries?",
    a: (<><strong>Foreign investment</strong> is the investment made by MNCs — the money spent to buy assets such as <strong>land, buildings, machines, and equipment</strong> in another country. MNCs invest in developing countries because cheap labour is available, they can be closer to markets, and raw materials are easily accessible. Benefits to the local company include <strong>additional money for investment and access to the latest technology</strong>.</>),
  },
  {
    q: "What is foreign trade? How does it lead to integration of markets?",
    a: (<><strong>Foreign trade</strong> is the exchange of goods and services between countries. It leads to <strong>market integration</strong> because producers can reach beyond domestic markets, buyers get access to goods not produced locally, and goods travelling between countries <strong>link prices across markets</strong>. A large part of foreign trade is also <strong>controlled by MNCs</strong>, deepening global integration.</>),
  },
  {
    q: "What is globalisation? How is it different from just trade?",
    a: (<><strong>Globalisation</strong> is the process of <strong>rapid integration or interconnection between countries</strong>. It goes beyond trade — it includes movement of <strong>goods, services, investments, technology, and people</strong>. Earlier, only trade connected countries. Now, <strong>production itself is globally organised</strong> by MNCs. MNCs play a major role in driving this process.</>),
  },
  {
    q: "What factors have enabled globalisation?",
    a: (<>Two major factors:<br /><br /><strong>1. Technology:</strong> Improvements in <strong>transportation</strong> (faster cargo ships, air freight) reduced costs of moving goods. The development of <strong>ICT — internet, computers, telecommunications</strong> — allowed businesses to manage global operations in real time.<br /><br /><strong>2. Liberalisation:</strong> Governments removed <strong>trade barriers</strong>, allowing goods and investment to flow freely across borders. India began this process seriously in the <strong>early 1990s</strong>.</>),
  },
  {
    q: "What is liberalisation? Why did India liberalise its economy?",
    a: (<><strong>Liberalisation</strong> means <strong>removing barriers or restrictions</strong> set by the government on foreign trade and investment. After Independence, India protected domestic producers with import taxes. Over time, barriers were removed to attract <strong>foreign investment and technology</strong>, access global markets, and boost growth. As a result, goods could be easily imported/exported and <strong>foreign companies could set up in India</strong>.</>),
  },
  {
    q: "What is the WTO? What is the controversy around it?",
    a: (<>The <strong>World Trade Organisation (WTO)</strong> aims to <strong>liberalise international trade</strong> globally. The controversy: while WTO promotes free trade for all, in practice <strong>developed countries have unfairly retained their own trade barriers</strong>. Meanwhile, <strong>WTO rules have forced developing countries to remove their protections</strong> — an unequal arrangement that disadvantages poorer nations.</>),
  },
  {
    q: "What has been the impact of globalisation on India?",
    a: (<>Globalisation has had <strong>mixed impacts</strong>:<br /><br /><strong>Positive:</strong> Greater competition benefited <strong>urban consumers</strong> — better products, lower prices. MNC investment grew. Several Indian companies strengthened and some became <strong>multinationals themselves</strong> (e.g., Tata, Infosys). The <strong>IT/BPO sector boomed</strong>.<br /><br /><strong>Negative:</strong> Benefits have <strong>not been shared equally</strong>. Small producers, unorganised workers, and rural communities have largely been left behind — struggling to compete with cheap imports.</>),
  },
  {
    q: "What is fair globalisation? What can governments and people do?",
    a: (<><strong>Fair globalisation</strong> means creating opportunities for <strong>all people</strong> and sharing benefits equally. Governments can: protect all citizens (not just the rich), <strong>support small producers</strong> until they can compete, and use <strong>trade barriers strategically</strong>. People can: organise campaigns and representations — <strong>people's organisations have already influenced WTO decisions</strong>, demonstrating that ordinary citizens also have a voice.</>),
  },
  {
    q: "What are trade barriers? Why did India use them after Independence?",
    a: (<><strong>Trade barriers</strong> are government restrictions — such as <strong>tax on imports</strong> — that control or limit foreign trade. They make imported goods more expensive. The government can use them to control the <strong>volume, type, and quantity of goods</strong> entering the country. After Independence, India used trade barriers to <strong>protect domestic producers</strong> from foreign competition and give Indian industries time to develop.</>),
  },
];

export default function GlobalisationAndIndianEconomy() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="gie-root">

        {/* HERO */}
        <div className="gie-hero">
          <div className="gie-hero-line" />
          <div className="gie-glow" />
          <div className="gie-globe" />
          <div className="gie-hero-bg-num">04</div>
          <div className="gie-hero-inner">
            <div className="gie-overline">Economics · Class 10 · Chapter 4</div>
            <h1 className="gie-hero-title">
              <em>Globalisation</em><br />&amp; the <span className="em2">Indian</span><br />Economy
            </h1>
            <div className="gie-hero-bar">
              {[
                { label: "Subject",  value: "Economics" },
                { label: "Class",   value: "10th Standard" },
                { label: "Chapter", value: "Chapter 4" },
                { label: "Board",   value: "CBSE / NCERT" },
              ].map((x) => (
                <div className="gie-hero-bar-item" key={x.label}>
                  <div className="gie-bar-label">{x.label}</div>
                  <div className="gie-bar-value">{x.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="gie-body">

          <div className="gie-intro-card">
            <p>The world today is deeply interconnected — a smartphone is designed in California, assembled in China, with chips from South Korea and software from India. This is <strong>globalisation</strong> in action.</p>
            <p>But who gains and who loses? Understanding globalisation means understanding <strong>multinational corporations, trade policy, liberalisation</strong>, and the ongoing struggle for a world where these gains are shared fairly by all.</p>
          </div>

          {/* S1: History */}
          <div className="gie-sec-head">
            <div className="gie-sec-num">1</div>
            <div className="gie-sec-title-wrap">
              <div className="gie-sec-kicker">How It Began</div>
              <h2 className="gie-sec-title">Production <span>Across Countries</span> — A Brief History</h2>
            </div>
          </div>
          <p className="gie-body-text">The nature of global production has changed dramatically over centuries. From simple barter trade between neighbouring regions to today's globally dispersed supply chains — here is how the story unfolded.</p>
          <div className="gie-timeline">
            {[
              { era: "Before the 20th Century", head: "Colonial Trade Era", desc: <>Colonies like India <strong>exported raw materials and foodstuff</strong> to colonial powers and imported finished goods. Trade was the main — almost only — channel connecting distant countries. Production was largely organised within individual nations.</> },
              { era: "Mid-20th Century", head: "Rise of Multinational Corporations", desc: <>Large companies called <strong>Multinational Corporations (MNCs)</strong> emerged. They began setting up offices and factories in <strong>multiple countries</strong> — wherever they could get cheap labour and resources. Production was no longer confined to one country.</> },
              { era: "Late 20th Century", head: "Globalisation & Interlinking of Production", desc: <>MNCs began not just selling globally but <strong>producing globally</strong>. Different stages of production were dispersed across multiple countries. A single product could involve raw materials, components, and assembly from <strong>a dozen different nations</strong>.</> },
              { era: "21st Century", head: "Complex Global Supply Chains", desc: <>Production is organised in <strong>increasingly complex ways</strong>. MNCs exert strong influence on production at distant locations. The internet, faster transport, and open trade policies have made <strong>global integration deeper than ever before</strong>.</> },
            ].map((t, i) => (
              <div className="gie-tl-item" key={i}>
                <div className="gie-tl-dot" />
                <div className="gie-tl-era">{t.era}</div>
                <div className="gie-tl-head">{t.head}</div>
                <div className="gie-tl-desc">{t.desc}</div>
              </div>
            ))}
          </div>

          {/* S2: MNC */}
          <div className="gie-divider"><div className="gie-divider-mark" /></div>
          <div className="gie-sec-head">
            <div className="gie-sec-num">2</div>
            <div className="gie-sec-title-wrap">
              <div className="gie-sec-kicker">Key Player</div>
              <h2 className="gie-sec-title">Multinational Corporations — <span>The MNC</span></h2>
            </div>
          </div>
          <div className="gie-def-banner">
            <div className="gie-def-acronym">MNC</div>
            <div className="gie-def-vline" />
            <div className="gie-def-body">
              <div className="gie-def-title">Multinational Corporation</div>
              <div className="gie-def-text">A company that <strong>owns or controls production in more than one country</strong>. MNCs set up offices and factories in regions where they can get <strong>cheap labour and other resources</strong>. They are not only selling globally — more importantly, <strong>goods and services are produced globally</strong> by MNCs. Many top MNCs have wealth exceeding the <strong>entire budget of a developing country government</strong>.</div>
            </div>
          </div>
          <p className="gie-body-text">MNCs choose their locations carefully — seeking the most profitable combination of factors anywhere on the planet.</p>
          <div className="gie-icon-grid">
            {[
              { icon: "📍", title: "Close to Markets", text: "MNCs produce near where their customers are, cutting transport costs and delivery time." },
              { icon: "💼", title: "Cheap Labour", text: "Both skilled and unskilled labour at low costs — a major reason India and China attract MNCs." },
              { icon: "⚙️", title: "Factor Availability", text: "Access to raw materials, stable power supply, infrastructure, and other production inputs." },
            ].map((c) => (
              <div className="gie-icon-card" key={c.title}>
                <span className="gie-icon-card-emoji">{c.icon}</span>
                <div className="gie-icon-card-title">{c.title}</div>
                <div className="gie-icon-card-text">{c.text}</div>
              </div>
            ))}
          </div>
          <p className="gie-body-text">MNCs interact with local producers in <strong>three main ways</strong>:</p>
          <div className="gie-modes-strip">
            {[
              { label: "Mode 01", title: "Joint Production", text: <>MNC provides <strong>money for new machines</strong> and brings <strong>latest technology</strong>. Local company contributes infrastructure and market access.</> },
              { label: "Mode 02", title: "Buying Local Companies", text: <>The <strong>most common route</strong> — MNC acquires an existing local company and expands production under its own brand.</> },
              { label: "Mode 03", title: "Placing Orders", text: <>MNC places large orders with <strong>small local producers</strong> for goods — garments, shoes, sports items — sold under the MNC's brand.</> },
            ].map((m, i) => (
              <div className="gie-mode-item" key={i}>
                <div className="gie-mode-num">0{i + 1}</div>
                <div className="gie-mode-label">{m.label}</div>
                <div className="gie-mode-title">{m.title}</div>
                <div className="gie-mode-text">{m.text}</div>
              </div>
            ))}
          </div>

          {/* S3: Foreign Trade */}
          <div className="gie-divider"><div className="gie-divider-mark" /></div>
          <div className="gie-sec-head">
            <div className="gie-sec-num">3</div>
            <div className="gie-sec-title-wrap">
              <div className="gie-sec-kicker">Connecting Markets</div>
              <h2 className="gie-sec-title">Foreign Trade &amp; <span>Integration of Markets</span></h2>
            </div>
          </div>
          <div className="gie-prose-panel">
            <div className="gie-prose-accent-bar" />
            <div className="gie-prose-body">
              <div className="gie-prose-label">What Foreign Trade Does</div>
              <div className="gie-prose-heading">How Trade Connects the World</div>
              <div className="gie-prose-text">Foreign trade creates an opportunity for <strong>producers to reach beyond domestic markets</strong>. A farmer in India can sell mangoes in the UK; a German car manufacturer can sell in Mumbai. Trade dramatically expands the scale at which production becomes viable.</div>
              <div className="gie-prose-text">For <strong>buyers</strong>, imports offer choices far beyond what is domestically produced — technology, medicines, consumer goods that may not exist or be too expensive to make locally.</div>
              <div className="gie-prose-text">With the opening of trade, goods travel from one market to another, and <strong>prices in different countries become linked</strong>. This is <strong>market integration</strong> — connecting what were once separate local markets into one global marketplace.</div>
              <div className="gie-prose-text">A large part of foreign trade is also <strong>controlled by MNCs</strong> — adding another layer of global integration between production and markets.</div>
            </div>
          </div>

          {/* S4: Globalisation */}
          <div className="gie-divider"><div className="gie-divider-mark" /></div>
          <div className="gie-sec-head">
            <div className="gie-sec-num">4</div>
            <div className="gie-sec-title-wrap">
              <div className="gie-sec-kicker">The Big Idea</div>
              <h2 className="gie-sec-title">What is <span>Globalisation?</span></h2>
            </div>
          </div>
          <p className="gie-body-text">Globalisation is the <strong>process of rapid integration or interconnection between countries</strong>. More and more goods, services, investments, and technology are moving between countries at unprecedented speed and scale. MNCs are playing a <strong>major role</strong> in the globalisation process.</p>
          <div className="gie-defs-band">
            <div className="gie-defs-band-title">📌 Key Definitions — Chapter 4</div>
            <div className="gie-defs-row">
              {[
                { word: "Globalisation",      meaning: <>Process of <strong>rapid integration or interconnection between countries</strong> — goods, services, investments, and technology flow freely across borders.</> },
                { word: "Foreign Investment", meaning: <>Money spent by MNCs to buy <strong>assets like land, buildings, machines, and equipment</strong> in another country.</> },
                { word: "Liberalisation",     meaning: <><strong>Removing barriers or restrictions</strong> set by the government on foreign trade and foreign investment.</> },
                { word: "Trade Barrier",      meaning: <>A restriction — such as <strong>tax on imports</strong> — placed by the government to control or limit foreign trade.</> },
              ].map((d) => (
                <div className="gie-def-card" key={d.word}>
                  <div className="gie-def-card-word">{d.word}</div>
                  <div className="gie-def-card-meaning">{d.meaning}</div>
                </div>
              ))}
            </div>
          </div>

          {/* S5: Factors */}
          <div className="gie-divider"><div className="gie-divider-mark" /></div>
          <div className="gie-sec-head">
            <div className="gie-sec-num">5</div>
            <div className="gie-sec-title-wrap">
              <div className="gie-sec-kicker">What Made It Possible</div>
              <h2 className="gie-sec-title">Factors That <span>Enabled Globalisation</span></h2>
            </div>
          </div>
          <p className="gie-body-text">Globalisation did not happen by accident. Specific technological breakthroughs and deliberate policy decisions by governments <strong>created the conditions</strong> for it.</p>
          <div className="gie-feature-rows">
            {[
              { icon: "🚢", title: "Improvements in Transportation", text: <>Over the past 50 years, <strong>transportation technology</strong> has improved dramatically — faster cargo ships, refrigerated containers, air freight. The cost of moving goods across the globe has fallen sharply, making international trade viable for many more products.</> },
              { icon: "💻", title: "Information & Communication Technology (ICT)", text: <>The development of <strong>telecommunications, computers, and the internet</strong> has been even more remarkable. Businesses can manage global operations in real time. ICT has been a <strong>game-changer for globalisation</strong> — enabling complex global supply chains that were previously impossible.</> },
              { icon: "🔓", title: "Liberalisation of Trade & Investment Policy", text: <>Governments — including India's — <strong>removed trade barriers</strong> and opened their economies to foreign investment. Goods could be imported and exported easily, and foreign companies could <strong>set up factories and offices</strong> freely. India began this process seriously in the <strong>early 1990s</strong>.</> },
              { icon: "🏛️", title: "Role of the WTO & International Bodies", text: <>International organisations like the <strong>WTO (World Trade Organisation)</strong> pushed for free trade globally — pressuring countries, especially developing ones, to dismantle their protective trade barriers and open up to global competition.</> },
            ].map((r, i) => (
              <div className="gie-feature-row" key={i}>
                <div className="gie-fr-icon-col">{r.icon}</div>
                <div className="gie-fr-body">
                  <div className="gie-fr-title">{r.title}</div>
                  <div className="gie-fr-text">{r.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* S6: Liberalisation & WTO */}
          <div className="gie-divider"><div className="gie-divider-mark" /></div>
          <div className="gie-sec-head">
            <div className="gie-sec-num">6</div>
            <div className="gie-sec-title-wrap">
              <div className="gie-sec-kicker">Policy & Regulation</div>
              <h2 className="gie-sec-title">Liberalisation &amp; the <span>WTO</span></h2>
            </div>
          </div>
          <p className="gie-body-text">India's journey from a protected economy to a globally open one is a story of deliberate policy choices — and of international pressure. Understanding liberalisation and the WTO's role is essential to understanding how India entered the global economy.</p>
          <div className="gie-lib-block">
            <div className="gie-lib-card dark">
              <span className="gie-lib-icon">🔓</span>
              <div className="gie-lib-tag">India's Policy Shift</div>
              <div className="gie-lib-title">Liberalisation</div>
              <ul className="gie-lib-points">
                <li>Means <strong>removing barriers</strong> on foreign trade &amp; investment</li>
                <li>After Independence, India <strong>protected domestic industry</strong> with import taxes</li>
                <li>Protection was needed while Indian industries were still <strong>developing and weak</strong></li>
                <li>Barriers gradually removed — goods could be <strong>imported and exported easily</strong></li>
                <li>Foreign companies could now <strong>set up factories and offices</strong> in India</li>
                <li>Government became <strong>less restrictive</strong> — hence "liberal"</li>
              </ul>
            </div>
            <div className="gie-lib-card light">
              <span className="gie-lib-icon">🌐</span>
              <div className="gie-lib-tag">International Body</div>
              <div className="gie-lib-title">World Trade Organisation (WTO)</div>
              <ul className="gie-lib-points">
                <li>Aim: to <strong>liberalise international trade</strong> worldwide</li>
                <li>Claims all trade barriers are <strong>harmful and should be removed</strong></li>
                <li>Supposed to allow <strong>free trade for all</strong> equally</li>
                <li>In practice: <strong>developed countries unfairly retained</strong> their own barriers</li>
                <li>WTO rules forced <strong>developing countries to remove theirs</strong></li>
                <li>An <strong>unequal arrangement</strong> — major criticism of WTO</li>
              </ul>
            </div>
          </div>
          <div className="gie-wto-callout">
            <div className="gie-wto-callout-head">⚠️ The WTO Double Standard</div>
            <div className="gie-wto-callout-text">While the WTO promotes free trade for all, <strong>developed countries have unfairly retained their own trade barriers</strong> — subsidising their own farmers and industries. Yet <strong>WTO rules have forced developing countries like India to remove their protections</strong>. This creates an unequal playing field and is a major point of criticism against the WTO and the current globalisation framework.</div>
          </div>

          {/* S7: Impact */}
          <div className="gie-divider"><div className="gie-divider-mark" /></div>
          <div className="gie-sec-head">
            <div className="gie-sec-num">7</div>
            <div className="gie-sec-title-wrap">
              <div className="gie-sec-kicker">20 Years On</div>
              <h2 className="gie-sec-title">Impact of Globalisation <span>on India</span></h2>
            </div>
          </div>
          <p className="gie-body-text">In the last twenty years, globalisation of the Indian economy has <strong>come a long way</strong>. The impacts have been significant — but deeply <strong>uneven</strong>. Some have thrived; others have struggled.</p>
          <div className="gie-impact-list">
            {[
              { icon: "🛍️", cls: "purple", label: "Consumer Benefit", title: "Better Products, More Choices for Consumers", text: <>Greater competition among both local and foreign producers has been of advantage to <strong>consumers, particularly well-off urban sections</strong>. These people today enjoy much higher standards of living — better products, lower prices, and wider variety than was possible before globalisation.</> },
              { icon: "📈", cls: "coral",  label: "MNC Investment",   title: "Surge in Foreign Investment Into India", text: <><strong>MNCs have increased their investments in India</strong> over the past 20 years — in manufacturing, retail, technology, and services. This investment has been profitable for them, indicating India's growing attractiveness as a production and consumption hub.</> },
              { icon: "🏭", cls: "teal",   label: "Indian Companies Grow", title: "Stronger Indian Companies — Some Become MNCs", text: <>Several top Indian companies have <strong>benefited from increased competition</strong> by improving quality, efficiency, and scale. Some — like Tata, Infosys, and Wipro — have themselves <strong>emerged as multinationals</strong>, expanding operations globally.</> },
              { icon: "💻", cls: "gold",   label: "IT & Services Boom", title: "New Opportunities in IT and Service Sector", text: <>Globalisation has created <strong>new opportunities for companies providing services, particularly IT</strong>. India's IT and BPO sector boomed — connecting Indian software engineers and data analysts to global clients. This sector has transformed cities like Bengaluru and Hyderabad.</> },
              { icon: "⚖️", cls: "dark",   label: "The Other Side",   title: "Unequal Distribution of Benefits", text: <><strong>People with education, skills, and wealth</strong> have made the best use of new opportunities. But many people — small producers, workers in unorganised industries, rural communities — have <strong>not shared the benefits</strong>. Cheap imports have meant loss of livelihood for small businesses.</> },
            ].map((imp, i) => (
              <div className="gie-impact-item" key={i}>
                <div className={`gie-impact-icon-wrap ${imp.cls}`}>{imp.icon}</div>
                <div className="gie-impact-body">
                  <div className="gie-impact-label">{imp.label}</div>
                  <div className="gie-impact-title">{imp.title}</div>
                  <div className="gie-impact-text">{imp.text}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="gie-wl-grid">
            <div className="gie-wl-card win">
              <div className="gie-wl-header"><span className="gie-wl-badge">✅ Who Gained</span><div className="gie-wl-title">Winners of Globalisation</div></div>
              <div className="gie-wl-body"><ul>
                <li>Urban consumers — <strong>better products, more choices</strong></li>
                <li>Large Indian companies — <strong>grew stronger from competition</strong></li>
                <li>Indian IT/BPO sector — <strong>boomed with global demand</strong></li>
                <li>Some Indian companies became <strong>MNCs themselves</strong></li>
                <li>Educated, skilled workforce — <strong>higher paying jobs</strong></li>
                <li>MNCs investing in India — <strong>profits from cheap production</strong></li>
              </ul></div>
            </div>
            <div className="gie-wl-card lose">
              <div className="gie-wl-header"><span className="gie-wl-badge">❌ Who Lost Out</span><div className="gie-wl-title">Losers of Globalisation</div></div>
              <div className="gie-wl-body"><ul>
                <li>Small producers — <strong>couldn't compete with MNC scale</strong></li>
                <li>Workers in unorganised sector — <strong>job losses, wage cuts</strong></li>
                <li>Rural households — <strong>cheap imports hurt local produce</strong></li>
                <li>Labour-intensive industries — <strong>replaced by cheaper imports</strong></li>
                <li>Unskilled workers — <strong>fewer opportunities created for them</strong></li>
                <li>Developing nations — <strong>unfair WTO rules disadvantage them</strong></li>
              </ul></div>
            </div>
          </div>

          {/* S8: Fair Globalisation */}
          <div className="gie-divider"><div className="gie-divider-mark" /></div>
          <div className="gie-sec-head">
            <div className="gie-sec-num">8</div>
            <div className="gie-sec-title-wrap">
              <div className="gie-sec-kicker">The Way Forward</div>
              <h2 className="gie-sec-title">The Struggle for <span>Fair Globalisation</span></h2>
            </div>
          </div>
          <p className="gie-body-text">Globalisation itself is not inherently good or bad — it depends on <strong>who shapes the rules</strong> and whether the gains are distributed equitably. Fair globalisation means ensuring that development reaches everyone, not just those already privileged.</p>
          <div className="gie-pull-quote">
            <p>"Fair globalisation would create opportunities for all and ensure that the benefits of globalisation are shared better. The government can play a major role in making this possible."</p>
            <cite>— NCERT Economics, Chapter 4</cite>
          </div>
          <p className="gie-body-text">The government has a central responsibility — its policies must protect <strong>all people</strong>, not only the rich and the powerful.</p>
          <div className="gie-govt-roles">
            {[
              { title: "Protect All Citizens, Not Just the Powerful", text: <>Government policies must <strong>serve the interests of all sections</strong> — including poor farmers, small manufacturers, and unorganised workers — not just large corporations and wealthy investors.</> },
              { title: "Support Small Producers Until They Can Compete", text: <>Provide <strong>subsidies, training, credit, and market access</strong> to small producers so they can improve performance and eventually compete with MNCs on a level playing field.</> },
              { title: "Use Trade Barriers Strategically", text: <>When necessary, deploy <strong>trade barriers</strong> to protect vulnerable industries — especially during the period when they are still developing and cannot withstand full global competition.</> },
              { title: "Push for Fair Trade Rules at WTO", text: <>India and developing nations can push for <strong>fairer WTO rules</strong> that don't force them to remove protections while rich countries keep theirs. A level international playing field is essential.</> },
            ].map((r, i) => (
              <div className="gie-govt-role-card" key={i}>
                <div className="gie-govt-role-num">0{i + 1}</div>
                <div className="gie-govt-role-title">{r.title}</div>
                <div className="gie-govt-role-text">{r.text}</div>
              </div>
            ))}
          </div>
          <div className="gie-people-box">
            <div className="gie-people-icon">✊</div>
            <div className="gie-people-content">
              <div className="gie-people-tag">People Power</div>
              <div className="gie-people-title">People Can Drive Fair Globalisation Too</div>
              <div className="gie-people-text">In the past few years, <strong>massive campaigns and representations by people's organisations</strong> have influenced important decisions relating to trade and investments at the WTO. This has demonstrated that <strong>ordinary people also have a voice</strong> in shaping the rules of globalisation — and can use it to push for a fairer world.</div>
            </div>
          </div>

          {/* FAQ */}
          <div className="gie-divider"><div className="gie-divider-mark" /></div>
          <div className="gie-faq-header"><span className="gie-faq-kicker">Exam Preparation</span></div>
          <h2 className="gie-faq-title">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div className={`gie-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="gie-faq-q" onClick={() => toggle(i)}>
                <span className="gie-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="gie-faq-icon">+</span>
              </button>
              <div className={`gie-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
