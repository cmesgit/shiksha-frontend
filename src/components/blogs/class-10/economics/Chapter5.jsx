import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #0f1820;
    --ink2:       #1c2d3a;
    --muted:      #4a6275;
    --paper:      #f2f8fc;
    --paper2:     #e3f0f8;
    --accent:     #0070b8;
    --accent2:    #004f85;
    --accent-lt:  #d6eeff;
    --orange:     #d4600a;
    --orange-lt:  #fff0e3;
    --red:        #c0301e;
    --red-lt:     #fde8e5;
    --green:      #0a7a4a;
    --green-lt:   #d8f5e8;
    --rule:       #c0d8ea;
    --white:      #ffffff;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .cr-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  /* ═══ HERO ═══ */
  .cr-hero {
    background: linear-gradient(135deg, #020c14 0%, #051828 55%, #072035 100%);
    min-height: 88vh; display: flex; align-items: flex-end;
    position: relative; overflow: hidden; padding: 0 0 64px;
  }
  .cr-hero::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #0070b8 0%, #d4600a 50%, #0a7a4a 100%);
  }
  .cr-hero-bg-num {
    position: absolute; bottom: -60px; right: -30px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(220px, 36vw, 500px); font-weight: 900;
    line-height: 1; color: rgba(255,255,255,0.022);
    letter-spacing: -0.04em; user-select: none; pointer-events: none;
  }
  /* Shield watermark */
  .cr-hero-shield {
    position: absolute; top: 50%; right: 6%; transform: translateY(-50%);
    width: clamp(140px, 20vw, 260px); height: clamp(160px, 23vw, 300px);
    opacity: 0.04; pointer-events: none;
    font-size: clamp(140px, 20vw, 260px); line-height: 1;
    display: flex; align-items: center; justify-content: center;
    color: #fff;
  }
  /* Diagonal lines */
  .cr-hero-lines {
    position: absolute; inset: 0;
    background: repeating-linear-gradient(-50deg, transparent, transparent 60px, rgba(0,112,184,0.03) 60px, rgba(0,112,184,0.03) 61px);
    pointer-events: none;
  }
  .cr-glow {
    position: absolute; bottom: 20%; left: 8%;
    width: 260px; height: 260px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,112,184,0.14) 0%, transparent 70%);
    pointer-events: none;
  }
  .cr-hero-inner { max-width: 900px; width: 100%; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
  .cr-overline {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; color: #7dd3fc;
    margin-bottom: 24px; display: flex; align-items: center; gap: 14px;
  }
  .cr-overline::before, .cr-overline::after { content: ''; flex: 0 0 40px; height: 1px; background: #7dd3fc; }
  .cr-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(42px, 8vw, 86px); font-weight: 900; color: #fff;
    line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 32px;
  }
  .cr-hero-title em   { font-style: normal; color: #7dd3fc; }
  .cr-hero-title .em2 { color: #fdba74; }
  .cr-hero-bar { display: flex; flex-wrap: wrap; gap: 0; border-top: 1px solid rgba(255,255,255,0.12); padding-top: 24px; margin-top: 8px; }
  .cr-hero-bar-item { flex: 1 1 180px; padding: 0 24px 0 0; border-right: 1px solid rgba(255,255,255,0.1); margin-right: 24px; }
  .cr-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .cr-bar-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 5px; }
  .cr-bar-value { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.75); }

  /* ═══ BODY ═══ */
  .cr-body { max-width: 860px; margin: 0 auto; padding: 72px 32px 96px; }

  /* ═══ DARK INTRO CARD ═══ */
  .cr-intro-card {
    background: linear-gradient(135deg, #020c14 0%, #072035 100%);
    border-left: 5px solid #0070b8; border-radius: 4px; padding: 36px 40px;
    margin-bottom: 64px; position: relative; overflow: hidden;
  }
  .cr-intro-card::after { content: '🛡️'; position: absolute; right: 28px; top: 50%; transform: translateY(-50%); font-size: 80px; opacity: 0.08; }
  .cr-intro-card p { font-family: 'Poppins', sans-serif; font-size: 18px; font-weight: 500; color: rgba(255,255,255,0.88); line-height: 1.78; margin: 0 0 14px; }
  .cr-intro-card p:last-child { margin: 0; }
  .cr-intro-card strong { color: #7dd3fc; }

  /* ═══ SECTION HEADER ═══ */
  .cr-sec-head { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 32px; border-bottom: 2px solid var(--rule); padding-bottom: 18px; }
  .cr-sec-num { font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900; color: var(--rule); line-height: 1; flex-shrink: 0; }
  .cr-sec-title-wrap { padding-top: 8px; }
  .cr-sec-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .cr-sec-title { font-family: 'Montserrat', sans-serif; font-size: clamp(22px, 3.5vw, 30px); font-weight: 800; color: var(--ink); line-height: 1.15; letter-spacing: -0.02em; }
  .cr-sec-title span { color: var(--accent); }

  /* ═══ BODY TEXT ═══ */
  .cr-body-text { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; color: var(--ink2); line-height: 1.85; margin-bottom: 32px; }
  .cr-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ═══ DIVIDER ═══ */
  .cr-divider { margin: 60px 0; display: flex; align-items: center; gap: 16px; }
  .cr-divider::before, .cr-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .cr-divider-mark { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

  /* ═══ WHY MARKETS FAIL — PROSE PANEL ═══ */
  .cr-prose-panel { display: flex; gap: 0; border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; margin-bottom: 36px; }
  @media (max-width: 600px) { .cr-prose-panel { flex-direction: column; } }
  .cr-prose-bar { width: 6px; flex-shrink: 0; background: linear-gradient(to bottom, var(--accent), var(--orange)); }
  @media (max-width: 600px) { .cr-prose-bar { width: auto; height: 6px; } }
  .cr-prose-body { padding: 28px 28px; background: var(--white); flex: 1; }
  .cr-prose-label { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); margin-bottom: 10px; }
  .cr-prose-heading { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; color: var(--ink); margin-bottom: 16px; letter-spacing: -0.01em; }
  .cr-prose-text { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: var(--ink2); line-height: 1.8; margin-bottom: 14px; }
  .cr-prose-text:last-child { margin-bottom: 0; }
  .cr-prose-text strong { color: var(--accent2); font-weight: 600; }

  /* ═══ CONSUMER MOVEMENT TIMELINE ═══ */
  .cr-timeline { position: relative; padding-left: 56px; margin-bottom: 36px; }
  .cr-timeline::before { content: ''; position: absolute; left: 20px; top: 8px; bottom: 8px; width: 2px; background: linear-gradient(to bottom, var(--accent), var(--orange), var(--green)); }
  .cr-tl-item { position: relative; margin-bottom: 34px; }
  .cr-tl-item:last-child { margin-bottom: 0; }
  .cr-tl-dot { position: absolute; left: -43px; top: 6px; width: 18px; height: 18px; border-radius: 50%; background: var(--accent); border: 3px solid var(--paper); box-shadow: 0 0 0 2px var(--accent); }
  .cr-tl-item:nth-child(2) .cr-tl-dot { background: var(--orange); box-shadow: 0 0 0 2px var(--orange); }
  .cr-tl-item:nth-child(3) .cr-tl-dot { background: var(--green);  box-shadow: 0 0 0 2px var(--green); }
  .cr-tl-item:nth-child(4) .cr-tl-dot { background: #7c3aed;       box-shadow: 0 0 0 2px #7c3aed; }
  .cr-tl-era { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 5px; }
  .cr-tl-item:nth-child(1) .cr-tl-era { color: var(--accent); }
  .cr-tl-item:nth-child(2) .cr-tl-era { color: var(--orange); }
  .cr-tl-item:nth-child(3) .cr-tl-era { color: var(--green); }
  .cr-tl-item:nth-child(4) .cr-tl-era { color: #7c3aed; }
  .cr-tl-head { font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 800; color: var(--ink); margin-bottom: 8px; letter-spacing: -0.01em; }
  .cr-tl-desc { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: var(--ink2); line-height: 1.75; }
  .cr-tl-desc strong { color: var(--accent2); font-weight: 600; }

  /* ═══ SIX RIGHTS — BIG NUMBERED CARDS ═══ */
  .cr-rights-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 36px; }
  @media (max-width: 600px) { .cr-rights-grid { grid-template-columns: 1fr; } }
  .cr-right-card { border-radius: 8px; overflow: hidden; border: 1.5px solid var(--rule); background: var(--white); }
  .cr-right-header { padding: 16px 20px; display: flex; align-items: center; gap: 14px; }
  .cr-right-card:nth-child(1) .cr-right-header { background: linear-gradient(135deg, #003d6b, #004f85); }
  .cr-right-card:nth-child(2) .cr-right-header { background: linear-gradient(135deg, #5a2800, #7a3800); }
  .cr-right-card:nth-child(3) .cr-right-header { background: linear-gradient(135deg, #004d30, #006640); }
  .cr-right-card:nth-child(4) .cr-right-header { background: linear-gradient(135deg, #4a1060, #6b1880); }
  .cr-right-card:nth-child(5) .cr-right-header { background: linear-gradient(135deg, #6b1a10, #8a2218); }
  .cr-right-card:nth-child(6) .cr-right-header { background: linear-gradient(135deg, #1a3a6b, #243f7a); }
  .cr-right-num {
    font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900;
    color: rgba(255,255,255,0.2); line-height: 1; flex-shrink: 0;
  }
  .cr-right-icon { font-size: 24px; flex-shrink: 0; }
  .cr-right-name { font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 900; color: #fff; line-height: 1.2; }
  .cr-right-body { padding: 16px 20px; }
  .cr-right-text { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400; color: var(--ink2); line-height: 1.7; }
  .cr-right-text strong { color: var(--accent2); font-weight: 600; }
  .cr-right-tag {
    display: inline-block; margin-top: 10px;
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 100px;
    background: var(--accent-lt); color: var(--accent2);
  }
  .cr-right-card:nth-child(2) .cr-right-tag { background: var(--orange-lt); color: var(--orange); }
  .cr-right-card:nth-child(3) .cr-right-tag { background: var(--green-lt); color: var(--green); }
  .cr-right-card:nth-child(4) .cr-right-tag { background: #ede9fe; color: #6d28d9; }
  .cr-right-card:nth-child(5) .cr-right-tag { background: var(--red-lt); color: var(--red); }
  .cr-right-card:nth-child(6) .cr-right-tag { background: #dbeafe; color: #1d4ed8; }

  /* ═══ FACTORS — ICON FEATURE ROWS ═══ */
  .cr-factor-rows { margin-bottom: 36px; }
  .cr-factor-row { display: flex; gap: 0; margin-bottom: 14px; border: 1.5px solid var(--rule); border-radius: 6px; overflow: hidden; }
  .cr-factor-row:last-child { margin-bottom: 0; }
  .cr-factor-icon-col { width: 72px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 26px; }
  .cr-factor-row:nth-child(1) .cr-factor-icon-col { background: var(--accent-lt); }
  .cr-factor-row:nth-child(2) .cr-factor-icon-col { background: var(--orange-lt); }
  .cr-factor-row:nth-child(3) .cr-factor-icon-col { background: var(--green-lt); }
  .cr-factor-row:nth-child(4) .cr-factor-icon-col { background: var(--red-lt); }
  .cr-factor-body { flex: 1; padding: 15px 20px; background: var(--white); border-left: 1.5px solid var(--rule); }
  .cr-factor-title { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
  .cr-factor-text { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400; color: var(--ink2); line-height: 1.65; }
  .cr-factor-text strong { color: var(--accent2); font-weight: 600; }

  /* ═══ DUTIES — HORIZONTAL STRIP ═══ */
  .cr-duties-strip { display: flex; gap: 0; border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; margin-bottom: 36px; }
  @media (max-width: 640px) { .cr-duties-strip { flex-direction: column; } }
  .cr-duty-item { flex: 1; padding: 22px 18px; border-right: 1.5px solid var(--rule); background: var(--white); text-align: center; }
  .cr-duty-item:last-child { border-right: none; }
  @media (max-width: 640px) { .cr-duty-item { border-right: none; border-bottom: 1.5px solid var(--rule); text-align: left; } .cr-duty-item:last-child { border-bottom: none; } }
  .cr-duty-icon { font-size: 28px; display: block; margin-bottom: 10px; }
  .cr-duty-num { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 900; color: var(--rule); letter-spacing: 0.08em; margin-bottom: 4px; }
  .cr-duty-title { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: var(--accent2); margin-bottom: 6px; line-height: 1.3; }
  .cr-duty-text { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 400; color: var(--muted); line-height: 1.6; }

  /* ═══ COPRA — BIG DARK BOX ═══ */
  .cr-copra-box {
    background: linear-gradient(135deg, #020c14 0%, #072035 100%);
    border-radius: 8px; padding: 32px 36px; margin-bottom: 36px;
    position: relative; overflow: hidden;
  }
  .cr-copra-box::after { content: '⚖️'; position: absolute; right: 24px; top: 50%; transform: translateY(-50%); font-size: 80px; opacity: 0.08; }
  .cr-copra-badge { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #7dd3fc; background: rgba(125,211,252,0.1); padding: 5px 14px; border-radius: 100px; display: inline-block; margin-bottom: 16px; }
  .cr-copra-title { font-family: 'Montserrat', sans-serif; font-size: clamp(18px, 3vw, 24px); font-weight: 900; color: #fff; margin-bottom: 6px; letter-spacing: -0.01em; line-height: 1.2; }
  .cr-copra-sub { font-family: 'Inter', sans-serif; font-size: 14px; color: rgba(255,255,255,0.45); margin-bottom: 24px; }
  .cr-copra-ul { list-style: none; padding: 0; }
  .cr-copra-ul li { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: rgba(255,255,255,0.8); padding: 8px 0 8px 22px; border-bottom: 1px solid rgba(255,255,255,0.08); position: relative; line-height: 1.65; }
  .cr-copra-ul li:last-child { border-bottom: none; }
  .cr-copra-ul li::before { content: '✓'; position: absolute; left: 0; top: 8px; color: #7dd3fc; font-size: 12px; font-weight: 700; }
  .cr-copra-ul li strong { color: #7dd3fc; }

  /* ═══ THREE TIER COURTS — VISUAL PYRAMID STEPS ═══ */
  .cr-courts { margin-bottom: 36px; }
  .cr-courts-title { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-bottom: 16px; }
  .cr-court-item {
    display: flex; gap: 0; margin-bottom: 12px;
    border: 1.5px solid var(--rule); border-radius: 6px; overflow: visible;
  }
  .cr-court-item:last-child { margin-bottom: 0; }
  .cr-court-level {
    width: 110px; flex-shrink: 0; padding: 18px 16px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; gap: 4px;
    border-radius: 4px 0 0 4px;
  }
  .cr-court-level-blue   { background: #004f85; }
  .cr-court-level-green  { background: #006640; }
  .cr-court-level-brown  { background: #7a3800; }
  .cr-court-tier { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.5); }
  .cr-court-name { font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 900; color: #fff; line-height: 1.1; }
  .cr-court-body { flex: 1; padding: 18px 22px; background: var(--white); border-left: 1.5px solid var(--rule); border-radius: 0 4px 4px 0; }
  .cr-court-limit { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; margin-bottom: 4px; }
  .cr-court-limit-blue  { color: var(--accent2); }
  .cr-court-limit-green { color: var(--green); }
  .cr-court-limit-brown { color: var(--orange); }
  .cr-court-desc { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400; color: var(--ink2); line-height: 1.6; }
  .cr-court-desc strong { color: var(--accent2); font-weight: 600; }

  /* ═══ KEY FACTS — STAT BOXES ═══ */
  .cr-facts-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 36px; }
  @media (max-width: 600px) { .cr-facts-row { grid-template-columns: 1fr; } }
  .cr-fact-box { background: var(--white); border: 1.5px solid var(--rule); border-top: 4px solid var(--accent); border-radius: 4px; padding: 20px 16px; text-align: center; }
  .cr-fact-box:nth-child(2) { border-top-color: var(--orange); }
  .cr-fact-box:nth-child(3) { border-top-color: var(--green); }
  .cr-fact-num { font-family: 'Montserrat', sans-serif; font-size: 30px; font-weight: 900; color: var(--accent); line-height: 1; margin-bottom: 6px; }
  .cr-fact-box:nth-child(2) .cr-fact-num { color: var(--orange); }
  .cr-fact-box:nth-child(3) .cr-fact-num { color: var(--green); }
  .cr-fact-label { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600; color: var(--muted); line-height: 1.4; }
  .cr-fact-sub { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 400; color: var(--muted); margin-top: 4px; }

  /* ═══ DEMERITS — RED ALERT ROWS ═══ */
  .cr-demerits { margin-bottom: 36px; }
  .cr-demerit-item { display: flex; gap: 16px; align-items: flex-start; padding: 16px 20px; border: 1.5px solid #f5bcbc; border-radius: 6px; margin-bottom: 10px; background: var(--red-lt); }
  .cr-demerit-item:last-child { margin-bottom: 0; }
  .cr-demerit-icon { font-size: 20px; flex-shrink: 0; margin-top: 1px; }
  .cr-demerit-text { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: #7a1a1a; line-height: 1.7; }
  .cr-demerit-text strong { color: var(--red); font-weight: 600; }

  /* ═══ PULL QUOTE ═══ */
  .cr-pull-quote { border-left: 5px solid var(--accent); background: var(--accent-lt); padding: 26px 34px; margin: 36px 0; border-radius: 0 4px 4px 0; }
  .cr-pull-quote p { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 600; color: var(--accent2); line-height: 1.7; font-style: italic; margin: 0 0 10px; }
  .cr-pull-quote cite { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; color: var(--muted); font-style: normal; }

  /* ═══ QUALITY MARKS BAND ═══ */
  .cr-marks-band { background: var(--paper2); border: 1.5px solid var(--rule); border-radius: 8px; padding: 22px 28px; margin-bottom: 36px; }
  .cr-marks-band-title { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-bottom: 16px; }
  .cr-marks-row { display: flex; flex-wrap: wrap; gap: 12px; }
  .cr-mark-pill {
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    padding: 10px 20px; border-radius: 6px;
    display: flex; align-items: center; gap: 8px;
  }
  .cr-mark-pill.blue   { background: var(--accent-lt); color: var(--accent2); border: 1.5px solid #a8d8f5; }
  .cr-mark-pill.orange { background: var(--orange-lt); color: var(--orange);  border: 1.5px solid #f5c8a0; }
  .cr-mark-pill.green  { background: var(--green-lt);  color: var(--green);   border: 1.5px solid #9ad8ba; }
  .cr-mark-pill.purple { background: #ede9fe; color: #5b21b6; border: 1.5px solid #c4b5fd; }
  .cr-mark-pill.red    { background: var(--red-lt);  color: var(--red);   border: 1.5px solid #f5bcbc; }
  .cr-mark-desc { font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 400; color: var(--muted); margin-top: 2px; display: block; }

  /* ═══ NATIONAL DAY CALLOUT ═══ */
  .cr-day-callout {
    background: linear-gradient(135deg, #020c14, #072035);
    border-radius: 8px; padding: 28px 32px; margin-bottom: 36px;
    display: flex; align-items: center; gap: 24px; flex-wrap: wrap;
  }
  .cr-day-icon { font-size: 48px; flex-shrink: 0; }
  .cr-day-content { flex: 1; min-width: 200px; }
  .cr-day-tag { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #7dd3fc; background: rgba(125,211,252,0.1); padding: 4px 12px; border-radius: 100px; display: inline-block; margin-bottom: 10px; }
  .cr-day-title { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; color: #fff; margin-bottom: 8px; letter-spacing: -0.01em; }
  .cr-day-text { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: rgba(255,255,255,0.72); line-height: 1.7; }
  .cr-day-text strong { color: #fdba74; }

  /* ═══ FAQ ═══ */
  .cr-faq-header { margin-bottom: 12px; }
  .cr-faq-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); background: var(--accent-lt); padding: 6px 16px; border-radius: 100px; }
  .cr-faq-title { font-family: 'Montserrat', sans-serif; font-size: clamp(26px, 4vw, 36px); font-weight: 900; color: var(--ink); letter-spacing: -0.02em; margin-bottom: 28px; margin-top: 16px; }
  .cr-faq-item { border: 1.5px solid var(--rule); border-radius: 6px; margin-bottom: 12px; overflow: hidden; background: var(--white); transition: border-color 0.2s; }
  .cr-faq-item.open { border-color: var(--accent); }
  .cr-faq-q { width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; text-align: left; gap: 16px; }
  .cr-faq-q-text { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600; color: var(--ink); line-height: 1.5; }
  .cr-faq-item.open .cr-faq-q-text { color: var(--accent); }
  .cr-faq-icon { font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 700; color: var(--accent); flex-shrink: 0; transition: transform 0.2s; }
  .cr-faq-item.open .cr-faq-icon { transform: rotate(45deg); }
  .cr-faq-ans { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: var(--ink2); line-height: 1.8; padding: 0 24px; max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; }
  .cr-faq-ans.visible { max-height: 700px; padding: 0 24px 20px; }
  .cr-faq-ans strong { color: var(--accent2); font-weight: 600; }

  @media (max-width: 700px) {
    .cr-body { padding: 48px 20px 72px; }
    .cr-hero-inner { padding: 0 20px; }
    .cr-intro-card { padding: 24px 22px; }
    .cr-copra-box { padding: 24px 22px; }
    .cr-day-callout { padding: 22px 22px; }
    .cr-court-level { width: 82px; padding: 14px 10px; }
    .cr-court-name { font-size: 11px; }
  }
`;

const faqs = [
  {
    q: "Why are rules and regulations needed to protect consumers in the marketplace?",
    a: (<>Rules and regulations are needed because <strong>markets do not work fairly</strong> when producers are few and powerful while consumers purchase in small amounts and are scattered. Large companies with <strong>huge wealth, power, and reach can manipulate the market</strong>. At times, <strong>false information is passed through media</strong> and other sources to attract consumers. Without rules, exploitation is common — through hoarding, black marketing, adulteration, and overcharging.</>),
  },
  {
    q: "How did the Consumer Movement begin in India?",
    a: (<>The consumer movement in India began as a <strong>'social force'</strong> to protect and promote the interests of consumers against unethical and unfair trade practices. <strong>Rampant food shortages, hoarding, black marketing, adulteration of food and edible oil</strong> gave birth to the movement in an organised form in the <strong>1960s</strong>. Till the 1970s, consumer organisations wrote articles and held exhibitions. They also formed consumer groups to look into malpractices in <strong>ration shops</strong> and overcrowding in road transport. More recently, India witnessed an <strong>upsurge in the number of consumer groups</strong>.</>),
  },
  {
    q: "What are the six rights of consumers?",
    a: (<>The six consumer rights are:
      <br /><br />
      1. <strong>Right to Safety</strong> — protected against goods and services hazardous to life and property.
      <br />2. <strong>Right to be Informed</strong> — know the particulars of goods and services purchased; complain if product is defective; protest if sold above MRP.
      <br />3. <strong>Right to Choose</strong> — choose whether to continue receiving a service, regardless of age, gender, or nature of service.
      <br />4. <strong>Right to be Heard</strong> — grievances must be listened to.
      <br />5. <strong>Right to Seek Redressal</strong> — compensation depending on the degree of damage from unfair trade practices.
      <br />6. <strong>Right to Represent in Consumer Courts</strong> — consumer forums guide and represent individual consumers in consumer courts.</>),
  },
  {
    q: "What factors cause exploitation of consumers?",
    a: (<>Four main factors cause consumer exploitation:
      <br /><br />
      • <strong>Limited information</strong> — consumers lack full knowledge about products, ingredients, or pricing.
      <br />• <strong>Limited supplies</strong> — scarcity allows sellers to hoard and overcharge.
      <br />• <strong>Limited competition</strong> — monopolies or oligopolies can dictate unfair terms.
      <br />• <strong>Low literacy</strong> — illiterate or less-educated consumers cannot read labels, understand rights, or effectively complain.</>),
  },
  {
    q: "What are the duties of a consumer?",
    a: (<>Consumers also have responsibilities, not just rights:
      <br /><br />
      • Purchase <strong>quality-marked products</strong> such as ISI, AGMARK, Hallmark etc. — these certify that products meet safety and quality standards.
      <br />• Always <strong>ask for a cash memo</strong> for items purchased — it serves as proof of purchase and evidence in case of a complaint.
      <br />• <strong>Complain for genuine grievances</strong> — consumers must know their rights and actively exercise them to make the system work.</>),
  },
  {
    q: "What is COPRA 1986? What is the three-tier judicial machinery under it?",
    a: (<>The <strong>Consumer Protection Act, 1986 (COPRA)</strong> was enacted to protect and promote the interests of consumers. It set up a <strong>three-tier quasi-judicial machinery</strong> for redressal of consumer disputes:
      <br /><br />
      • <strong>District Level Court</strong> — handles cases involving claims up to <strong>Rs. 20 lakhs</strong>.
      <br />• <strong>State Level Court</strong> — handles cases between <strong>Rs. 20 lakhs and Rs. 1 crore</strong>.
      <br />• <strong>National Level Court</strong> — handles cases involving claims <strong>exceeding Rs. 1 crore</strong>.
      <br /><br />
      If a case is dismissed at the district level, the consumer can appeal at the state level and then the national level. India is one of the countries that have <strong>exclusive courts for consumer redressal</strong>.</>),
  },
  {
    q: "What are the demerits of the Consumer Redressal Process?",
    a: (<>The Consumer Redressal Process has several shortcomings:
      <br /><br />
      • It is becoming <strong>cumbersome, expensive, and time-consuming</strong>.
      <br />• Consumers often need to <strong>engage lawyers</strong> and attend multiple court proceedings.
      <br />• In most purchases, <strong>cash memos are not issued</strong>, so evidence is absent.
      <br />• Most market purchases are <strong>small retail sales</strong> — not worth the effort of legal action.
      <br />• <strong>Enforcement of laws protecting workers</strong>, especially in unorganised sectors, is weak.
      <br />• <strong>Rules and regulations for markets are often not followed</strong> in practice.</>),
  },
  {
    q: "What is the significance of 24 December in India?",
    a: (<>India observes <strong>24 December as National Consumers' Day</strong>. It was on this day that the Indian Parliament enacted the <strong>Consumer Protection Act in 1986</strong>. This day is observed to raise consumer awareness and celebrate the rights guaranteed under COPRA. India is one of the countries in the world that has <strong>exclusive courts dedicated to consumer redressal</strong>.</>),
  },
  {
    q: "What are consumer forums and consumer protection councils?",
    a: (<>The consumer movement in India has led to the formation of various organisations locally known as <strong>consumer forums or consumer protection councils</strong>. They:
      <br /><br />
      • <strong>Guide consumers</strong> on how to file cases in the consumer court.
      <br />• <strong>Represent individual consumers</strong> in consumer courts on many occasions.
      <br />• Receive <strong>financial support from the government</strong> for creating awareness among people.
      <br /><br />
      There are today <strong>more than 700 consumer groups</strong> in India, of which only about <strong>20–25 are well organised and recognised</strong> for their work.</>),
  },
  {
    q: "What are quality certification marks? Why should consumers look for them?",
    a: (<>Quality certification marks are symbols placed on products that certify they meet certain safety and quality standards set by authorised bodies. Consumers should buy products with these marks because they offer <strong>assurance of quality and safety</strong>:
      <br /><br />
      • <strong>ISI mark</strong> — for industrial products like electrical goods, cement, LPG cylinders.
      <br />• <strong>AGMARK</strong> — for agricultural and food products.
      <br />• <strong>Hallmark</strong> — for gold and silver jewellery purity.
      <br />• <strong>FPO</strong> — for fruit and vegetable products.
      <br />• <strong>Eco Mark</strong> — for environment-friendly products.
      <br /><br />
      It is a <strong>consumer's duty</strong> to look for these marks before purchasing.</>),
  },
];

export default function ConsumerRights() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="cr-root">

        {/* HERO */}
        <div className="cr-hero">
          <div className="cr-hero-lines" />
          <div className="cr-glow" />
          <div className="cr-hero-shield">🛡️</div>
          <div className="cr-hero-bg-num">05</div>
          <div className="cr-hero-inner">
            <div className="cr-overline">Economics · Class 10 · Chapter 5</div>
            <h1 className="cr-hero-title">
              <em>Consumer</em><br /><span className="em2">Rights</span>
            </h1>
            <div className="cr-hero-bar">
              {[
                { label: "Subject",  value: "Economics" },
                { label: "Class",   value: "10th Standard" },
                { label: "Chapter", value: "Chapter 5" },
                { label: "Board",   value: "CBSE / NCERT" },
              ].map((x) => (
                <div className="cr-hero-bar-item" key={x.label}>
                  <div className="cr-bar-label">{x.label}</div>
                  <div className="cr-bar-value">{x.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cr-body">

          {/* Intro */}
          <div className="cr-intro-card">
            <p>Every time you buy something — a packet of chips, a medicine, an electric appliance — you are a consumer. But are you protected if that product is defective, adulterated, or overpriced?</p>
            <p><strong>Consumer Rights</strong> exist to answer exactly that question. India has built a dedicated legal system — COPRA, consumer courts, and a growing movement — to ensure <strong>every buyer has rights, and every seller has accountability</strong>.</p>
          </div>

          {/* S1: Consumer in Marketplace */}
          <div className="cr-sec-head">
            <div className="cr-sec-num">1</div>
            <div className="cr-sec-title-wrap">
              <div className="cr-sec-kicker">The Problem</div>
              <h2 className="cr-sec-title">The Consumer in the <span>Marketplace</span></h2>
            </div>
          </div>
          <div className="cr-prose-panel">
            <div className="cr-prose-bar" />
            <div className="cr-prose-body">
              <div className="cr-prose-label">Why Consumers Need Protection</div>
              <div className="cr-prose-heading">An Unequal Playing Field</div>
              <div className="cr-prose-text">Rules and regulations are required for the <strong>protection of consumers in the marketplace</strong> because exploitation happens often. Markets do not work fairly when <strong>producers are few and powerful</strong> while consumers purchase in small amounts and are scattered.</div>
              <div className="cr-prose-text">Large companies with <strong>huge wealth, power, and reach</strong> can manipulate the market. They can set unfair prices, sell substandard goods, or withhold important information. At times, <strong>false information is passed through media</strong> and other sources to attract consumers who don't know better.</div>
              <div className="cr-prose-text">This power imbalance — large producers versus individual buyers — is precisely why <strong>a strong legal framework and consumer awareness are essential</strong> to ensure fair markets.</div>
            </div>
          </div>

          {/* Key facts */}
          <div className="cr-facts-row">
            <div className="cr-fact-box">
              <div className="cr-fact-num">700+</div>
              <div className="cr-fact-label">Consumer Groups in India</div>
              <div className="cr-fact-sub">Only 20–25 are well-organised</div>
            </div>
            <div className="cr-fact-box">
              <div className="cr-fact-num">1986</div>
              <div className="cr-fact-label">COPRA Enacted</div>
              <div className="cr-fact-sub">24 December — National Consumers' Day</div>
            </div>
            <div className="cr-fact-box">
              <div className="cr-fact-num">3-Tier</div>
              <div className="cr-fact-label">Consumer Court System</div>
              <div className="cr-fact-sub">District, State & National levels</div>
            </div>
          </div>

          {/* S2: Consumer Movement */}
          <div className="cr-divider"><div className="cr-divider-mark" /></div>
          <div className="cr-sec-head">
            <div className="cr-sec-num">2</div>
            <div className="cr-sec-title-wrap">
              <div className="cr-sec-kicker">History</div>
              <h2 className="cr-sec-title">The <span>Consumer Movement</span> in India</h2>
            </div>
          </div>
          <p className="cr-body-text">The consumer movement did not emerge overnight — it grew out of decades of struggle against exploitation, black marketing, and adulteration. Here is how it evolved over time.</p>
          <div className="cr-timeline">
            {[
              { era: "1960s", head: "Birth of the Movement", desc: <>Rampant <strong>food shortages, hoarding, black marketing, and adulteration of food and edible oil</strong> gave birth to the consumer movement in an organised form. It began as a social force to protect consumers against unethical and unfair trade practices.</> },
              { era: "Until 1970s", head: "Articles & Exhibitions", desc: <>Consumer organisations were largely engaged in <strong>writing articles and holding exhibitions</strong>. They formed consumer groups to look into <strong>malpractices in ration shops</strong> and overcrowding in road passenger transport — the everyday issues affecting ordinary Indians.</> },
              { era: "1980s", head: "COPRA — A Legal Milestone", desc: <>India enacted the <strong>Consumer Protection Act (COPRA) in 1986</strong> — a landmark law that established dedicated consumer courts at the district, state, and national levels. <strong>24 December</strong> was declared National Consumers' Day to mark this achievement.</> },
              { era: "Recent Years", head: "Upsurge in Consumer Groups", desc: <>India witnessed an <strong>upsurge in the number of consumer groups</strong>. Today, there are more than <strong>700 consumer groups</strong>, though only about 20–25 are well organised and recognised nationally. Consumer awareness has grown significantly.</> },
            ].map((t, i) => (
              <div className="cr-tl-item" key={i}>
                <div className="cr-tl-dot" />
                <div className="cr-tl-era">{t.era}</div>
                <div className="cr-tl-head">{t.head}</div>
                <div className="cr-tl-desc">{t.desc}</div>
              </div>
            ))}
          </div>

          {/* S3: Six Rights */}
          <div className="cr-divider"><div className="cr-divider-mark" /></div>
          <div className="cr-sec-head">
            <div className="cr-sec-num">3</div>
            <div className="cr-sec-title-wrap">
              <div className="cr-sec-kicker">Provided by Law</div>
              <h2 className="cr-sec-title">Six <span>Rights of Consumers</span></h2>
            </div>
          </div>
          <p className="cr-body-text">These rights are legally guaranteed to every consumer in India. Knowing them is the first step to exercising them — and to holding sellers and producers accountable.</p>
          <div className="cr-rights-grid">
            {[
              { num: "01", icon: "🛡️", name: "Right to Safety",       tag: "Protection",   text: <>Protected against the marketing of goods and services that are <strong>hazardous to life and property</strong>. Producers must strictly follow safety rules. Special attention applies to goods like electrical appliances, medicines, and food.</> },
              { num: "02", icon: "ℹ️", name: "Right to be Informed",   tag: "Transparency", text: <>Right to know the <strong>particulars of goods and services</strong> purchased. Can complain and seek compensation for defective products. Can protest if sold above the <strong>printed MRP (Maximum Retail Price)</strong>.</> },
              { num: "03", icon: "✅", name: "Right to Choose",        tag: "Freedom",       text: <>Any consumer — <strong>regardless of age, gender, or nature of service</strong> — has the right to choose whether to continue receiving a service. No coercion or forced bundling of services.</> },
              { num: "04", icon: "🗣️", name: "Right to be Heard",     tag: "Voice",         text: <>Consumers have the right to <strong>be heard in case of a grievance</strong>. Their complaints must be acknowledged and taken seriously by sellers, companies, and relevant authorities.</> },
              { num: "05", icon: "⚖️", name: "Right to Seek Redressal", tag: "Compensation", text: <>Right to seek redressal against <strong>unfair trade practices and exploitation</strong>. If damage is done, the consumer has the right to get <strong>compensation depending on the degree of damage</strong>.</> },
              { num: "06", icon: "🏛️", name: "Right to Represent",    tag: "Legal Access",  text: <>Consumer forums and protection councils <strong>guide consumers on how to file cases</strong> in consumer courts and also represent them. These voluntary organisations receive <strong>financial support from the government</strong>.</> },
            ].map((r) => (
              <div className="cr-right-card" key={r.num}>
                <div className="cr-right-header">
                  <div className="cr-right-num">{r.num}</div>
                  <span className="cr-right-icon">{r.icon}</span>
                  <div className="cr-right-name">{r.name}</div>
                </div>
                <div className="cr-right-body">
                  <div className="cr-right-text">{r.text}</div>
                  <span className="cr-right-tag">{r.tag}</span>
                </div>
              </div>
            ))}
          </div>

          {/* S4: Factors of exploitation */}
          <div className="cr-divider"><div className="cr-divider-mark" /></div>
          <div className="cr-sec-head">
            <div className="cr-sec-num">4</div>
            <div className="cr-sec-title-wrap">
              <div className="cr-sec-kicker">Root Causes</div>
              <h2 className="cr-sec-title">Factors Causing <span>Exploitation of Consumers</span></h2>
            </div>
          </div>
          <p className="cr-body-text">Consumer exploitation does not happen in a vacuum. Four key structural factors make consumers vulnerable to being cheated, overcharged, or misled.</p>
          <div className="cr-factor-rows">
            {[
              { icon: "📉", title: "Limited Information", text: <>Consumers often lack complete knowledge about <strong>product quality, ingredients, pricing, or their own rights</strong>. This information gap allows sellers to mislead buyers, pass off substandard goods, or charge more than the fair price.</> },
              { icon: "📦", title: "Limited Supplies", text: <>When goods are scarce, <strong>sellers can hoard products</strong> and create artificial shortages. This drives up prices and forces consumers to buy at inflated rates — a form of exploitation that was especially common in the 1960s with essential food items.</> },
              { icon: "🏭", title: "Limited Competition", text: <>When a market has <strong>only a few producers</strong> (monopoly or oligopoly), companies can dictate unfair terms, charge high prices, and deliver poor quality without losing customers who have no alternatives.</> },
              { icon: "📚", title: "Low Literacy", text: <>Illiterate or poorly educated consumers <strong>cannot read product labels, expiry dates, or ingredient lists</strong>. They may not understand MRP, quality marks, or even know their rights exist — making them easy targets for exploitation.</> },
            ].map((f, i) => (
              <div className="cr-factor-row" key={i}>
                <div className="cr-factor-icon-col">{f.icon}</div>
                <div className="cr-factor-body">
                  <div className="cr-factor-title">{f.title}</div>
                  <div className="cr-factor-text">{f.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* S5: Duties */}
          <div className="cr-divider"><div className="cr-divider-mark" /></div>
          <div className="cr-sec-head">
            <div className="cr-sec-num">5</div>
            <div className="cr-sec-title-wrap">
              <div className="cr-sec-kicker">Responsibilities</div>
              <h2 className="cr-sec-title">Duties <span>of Consumers</span></h2>
            </div>
          </div>
          <p className="cr-body-text">Rights come with responsibilities. A consumer who does not exercise their duties makes the marketplace weaker for everyone. Here are the key duties every consumer should follow.</p>
          <div className="cr-duties-strip">
            {[
              { icon: "🏷️", title: "Buy Quality-Marked Products",    text: "Always look for ISI, AGMARK, Hallmark etc. marks before buying — they certify safety and quality." },
              { icon: "🧾", title: "Always Ask for a Cash Memo",     text: "A cash memo is proof of purchase. Without it, you have no evidence to file a complaint." },
              { icon: "📣", title: "Complain When Wronged",          text: "Know your rights and actively use them. Filing complaints makes sellers accountable." },
            ].map((d, i) => (
              <div className="cr-duty-item" key={i}>
                <span className="cr-duty-icon">{d.icon}</span>
                <div className="cr-duty-num">DUTY 0{i + 1}</div>
                <div className="cr-duty-title">{d.title}</div>
                <div className="cr-duty-text">{d.text}</div>
              </div>
            ))}
          </div>

          {/* Quality Marks */}
          <div className="cr-marks-band">
            <div className="cr-marks-band-title">🏅 Quality Certification Marks — Know Before You Buy</div>
            <div className="cr-marks-row">
              {[
                { label: "ISI Mark",   desc: "Industrial products — electricals, cement, LPG", cls: "blue" },
                { label: "AGMARK",     desc: "Agricultural & food products",                   cls: "orange" },
                { label: "Hallmark",   desc: "Gold & silver jewellery purity",                 cls: "green" },
                { label: "FPO Mark",   desc: "Fruit & vegetable products",                     cls: "purple" },
                { label: "Eco Mark",   desc: "Environment-friendly products",                  cls: "red" },
              ].map((m) => (
                <div className={`cr-mark-pill ${m.cls}`} key={m.label}>
                  <div>
                    <strong>{m.label}</strong>
                    <span className="cr-mark-desc">{m.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* S6: COPRA */}
          <div className="cr-divider"><div className="cr-divider-mark" /></div>
          <div className="cr-sec-head">
            <div className="cr-sec-num">6</div>
            <div className="cr-sec-title-wrap">
              <div className="cr-sec-kicker">The Law</div>
              <h2 className="cr-sec-title">Consumer Protection Act — <span>COPRA 1986</span></h2>
            </div>
          </div>
          <div className="cr-copra-box">
            <div className="cr-copra-badge">Central Legislation · 1986</div>
            <div className="cr-copra-title">Consumer Protection Act, 1986 (COPRA)</div>
            <div className="cr-copra-sub">Enacted on 24 December 1986 · Observed as National Consumers' Day</div>
            <ul className="cr-copra-ul">
              <li>Purpose: to <strong>protect and promote the interests of consumers</strong> against exploitation</li>
              <li>Set up a <strong>three-tier quasi-judicial machinery</strong> at the district, state and national levels</li>
              <li>Enabled consumers to have the <strong>right to represent in consumer courts</strong></li>
              <li>If a case is dismissed at district level, consumer can <strong>appeal at state and then national level</strong></li>
              <li>India is one of very few countries with <strong>exclusive courts for consumer redressal</strong></li>
              <li>Supported by <strong>voluntary consumer organisations</strong> that receive government financial aid</li>
            </ul>
          </div>

          {/* Three-Tier Courts */}
          <div className="cr-courts">
            <div className="cr-courts-title">⚖️ Three-Tier Consumer Court System Under COPRA</div>
            {[
              { tier: "Tier 1", name: "District Level Court",  limit: "Up to ₹20 Lakhs",      lvlCls: "cr-court-level-blue",  limCls: "cr-court-limit-blue",  desc: <>Handles consumer disputes involving claims <strong>up to Rs. 20 lakhs</strong>. The first point of complaint for most consumers. If dismissed here, the case can be appealed upward.</> },
              { tier: "Tier 2", name: "State Level Court",     limit: "₹20 Lakhs – ₹1 Crore", lvlCls: "cr-court-level-green", limCls: "cr-court-limit-green", desc: <>Handles cases involving claims between <strong>Rs. 20 lakhs and Rs. 1 crore</strong>. Also hears appeals from district-level decisions.</> },
              { tier: "Tier 3", name: "National Level Court",  limit: "Above ₹1 Crore",        lvlCls: "cr-court-level-brown", limCls: "cr-court-limit-brown", desc: <>Handles cases involving claims <strong>exceeding Rs. 1 crore</strong>. The highest consumer court — final appeal before regular civil courts. Deals with the most serious consumer disputes.</> },
            ].map((c, i) => (
              <div className="cr-court-item" key={i}>
                <div className={`cr-court-level ${c.lvlCls}`}>
                  <div className="cr-court-tier">{c.tier}</div>
                  <div className="cr-court-name">{c.name}</div>
                </div>
                <div className="cr-court-body">
                  <div className={`cr-court-limit ${c.limCls}`}>{c.limit}</div>
                  <div className="cr-court-desc">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* S7: Demerits */}
          <div className="cr-divider"><div className="cr-divider-mark" /></div>
          <div className="cr-sec-head">
            <div className="cr-sec-num">7</div>
            <div className="cr-sec-title-wrap">
              <div className="cr-sec-kicker">Challenges</div>
              <h2 className="cr-sec-title">Demerits of the <span>Consumer Redressal Process</span></h2>
            </div>
          </div>
          <p className="cr-body-text">Despite the strong legal framework, the consumer redressal system in India has significant shortcomings that prevent many consumers from actually getting justice.</p>
          <div className="cr-demerits">
            {[
              { icon: "⏳", text: <>The Consumer Redressal Process is becoming <strong>cumbersome, expensive, and time-consuming</strong> — discouraging many consumers from pursuing their complaints.</> },
              { icon: "👨‍⚖️", text: <>Many times, consumers are required to <strong>engage lawyers</strong>. Cases require significant time for filing and attending multiple court proceedings.</> },
              { icon: "🧾", text: <>In most purchases, <strong>cash memos are not issued</strong>, which means evidence of the transaction is absent — making it hard to file or prove a complaint.</> },
              { icon: "🛒", text: <>Most purchases in the market are <strong>small retail sales</strong> — the low value of individual transactions makes legal action economically unviable for most consumers.</> },
              { icon: "⚠️", text: <>The <strong>enforcement of laws protecting workers</strong>, especially in the unorganised sector, remains weak — leaving a large section of the population vulnerable.</> },
              { icon: "📋", text: <><strong>Rules and regulations for the working of markets are often not followed</strong> in practice — meaning legal protections exist on paper but are not always enforced on the ground.</> },
            ].map((d, i) => (
              <div className="cr-demerit-item" key={i}>
                <span className="cr-demerit-icon">{d.icon}</span>
                <div className="cr-demerit-text">{d.text}</div>
              </div>
            ))}
          </div>

          {/* National Day */}
          <div className="cr-day-callout">
            <div className="cr-day-icon">📅</div>
            <div className="cr-day-content">
              <div className="cr-day-tag">National Observance</div>
              <div className="cr-day-title">24 December — National Consumers' Day</div>
              <div className="cr-day-text">India has been observing <strong>24 December as National Consumers' Day</strong>. It was on this day that the Indian Parliament enacted the Consumer Protection Act in 1986. India is one of the few countries in the world that has <strong>exclusive courts for consumer redressal</strong> — a testament to how seriously consumer rights are taken.</div>
            </div>
          </div>

          <div className="cr-pull-quote">
            <p>"The consumer movement in India has led to the formation of various organisations locally known as consumer forums or consumer protection councils — they guide and represent consumers in courts."</p>
            <cite>— NCERT Economics, Chapter 5</cite>
          </div>

          {/* FAQ */}
          <div className="cr-divider"><div className="cr-divider-mark" /></div>
          <div className="cr-faq-header"><span className="cr-faq-kicker">Exam Preparation</span></div>
          <h2 className="cr-faq-title">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div className={`cr-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="cr-faq-q" onClick={() => toggle(i)}>
                <span className="cr-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="cr-faq-icon">+</span>
              </button>
              <div className={`cr-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
