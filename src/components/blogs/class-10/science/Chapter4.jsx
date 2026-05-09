import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #060d18;
    --ink2:       #0e1a2e;
    --muted:      #3a5070;
    --paper:      #f0f4fa;
    --paper2:     #e2eaf8;
    --accent:     #1a44b8;
    --accent2:    #0e2e8a;
    --accent-lt:  #d8e4fc;
    --gold:       #b88a00;
    --gold-lt:    #fff4cc;
    --green:      #0a6a38;
    --green-lt:   #d4f0e4;
    --red:        #b81a20;
    --red-lt:     #fde8ea;
    --purple:     #6a10a8;
    --purple-lt:  #eedcff;
    --teal:       #0a8070;
    --teal-lt:    #ccf0ea;
    --rule:       #c0cce8;
    --white:      #ffffff;
    --eq-bg:      #040810;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .cac-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  /* ═══ HERO — deep carbon black / indigo ═══ */
  .cac-hero {
    background: linear-gradient(135deg, #020408 0%, #060c1e 50%, #0a1230 100%);
    min-height: 88vh; display: flex; align-items: flex-end;
    position: relative; overflow: hidden; padding: 0 0 64px;
  }
  .cac-hero::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #1a44b8 0%, #b88a00 30%, #0a8070 60%, #6a10a8 100%);
  }
  .cac-hero-bg-num {
    position: absolute; bottom: -60px; right: -30px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(220px, 36vw, 500px); font-weight: 900;
    line-height: 1; color: rgba(255,255,255,0.018);
    letter-spacing: -0.04em; user-select: none; pointer-events: none;
  }
  .cac-hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(26,68,184,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(26,68,184,0.07) 1px, transparent 1px);
    background-size: 52px 52px; pointer-events: none;
  }
  .cac-hero-sheen {
    position: absolute; top: -20%; right: -5%;
    width: 420px; height: 420px; border-radius: 50%;
    background: radial-gradient(circle, rgba(26,68,184,0.1) 0%, transparent 65%);
    pointer-events: none;
  }
  .cac-hero-glow {
    position: absolute; bottom: 15%; left: 6%;
    width: 260px; height: 260px; border-radius: 50%;
    background: radial-gradient(circle, rgba(184,138,0,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .cac-hero-inner { max-width: 900px; width: 100%; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
  .cac-overline {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; color: #7ca0f8;
    margin-bottom: 24px; display: flex; align-items: center; gap: 14px;
  }
  .cac-overline::before, .cac-overline::after { content: ''; flex: 0 0 40px; height: 1px; background: #7ca0f8; }
  .cac-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(38px, 8vw, 80px); font-weight: 900; color: #fff;
    line-height: 1; letter-spacing: -0.03em; margin-bottom: 32px;
  }
  .cac-hero-title .em1 { color: #7ca0f8; font-style: normal; }
  .cac-hero-title .em2 { color: #f0d070; font-style: normal; }
  .cac-hero-title .em3 { color: rgba(255,255,255,0.45); font-style: normal; }
  .cac-hero-bar { display: flex; flex-wrap: wrap; gap: 0; border-top: 1px solid rgba(255,255,255,0.12); padding-top: 24px; margin-top: 8px; }
  .cac-hero-bar-item { flex: 1 1 130px; padding: 0 18px 0 0; border-right: 1px solid rgba(255,255,255,0.1); margin-right: 18px; }
  .cac-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .cac-bar-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 5px; }
  .cac-bar-value { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.75); }

  /* ═══ BODY ═══ */
  .cac-body { max-width: 860px; margin: 0 auto; padding: 72px 32px 96px; }

  /* ═══ INTRO CARD ═══ */
  .cac-intro-card {
    background: linear-gradient(135deg, #020408 0%, #0a1230 100%);
    border-left: 5px solid #1a44b8; border-radius: 4px; padding: 36px 40px;
    margin-bottom: 64px; position: relative; overflow: hidden;
  }
  .cac-intro-card::after { content: '⚛'; position: absolute; right: 28px; top: 50%; transform: translateY(-50%); font-size: 80px; opacity: 0.08; }
  .cac-intro-card p { font-family: 'Poppins', sans-serif; font-size: 18px; font-weight: 500; color: rgba(255,255,255,0.88); line-height: 1.78; margin: 0 0 14px; }
  .cac-intro-card p:last-child { margin: 0; }
  .cac-intro-card strong { color: #7ca0f8; }

  /* ═══ SEC HEADER ═══ */
  .cac-sec-head { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 32px; border-bottom: 2px solid var(--rule); padding-bottom: 18px; }
  .cac-sec-num { font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900; color: var(--rule); line-height: 1; flex-shrink: 0; }
  .cac-sec-title-wrap { padding-top: 8px; }
  .cac-sec-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .cac-sec-title { font-family: 'Montserrat', sans-serif; font-size: clamp(22px, 3.5vw, 30px); font-weight: 800; color: var(--ink); line-height: 1.15; letter-spacing: -0.02em; }
  .cac-sec-title span { color: var(--accent); }

  /* ═══ DIVIDER ═══ */
  .cac-divider { margin: 56px 0; display: flex; align-items: center; gap: 16px; }
  .cac-divider::before, .cac-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .cac-divider-mark { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

  /* ═══ BODY TEXT ═══ */
  .cac-body-text { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; color: var(--ink2); line-height: 1.85; margin-bottom: 28px; }
  .cac-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ═══ EQUATION BOX ═══ */
  .cac-eq {
    background: var(--eq-bg); border-radius: 6px; padding: 13px 18px;
    margin-bottom: 10px; display: flex; align-items: center; flex-wrap: nowrap;
    gap: 5px; border: 1px solid rgba(26,68,184,0.25);
    overflow-x: auto; overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin; scrollbar-color: rgba(26,68,184,0.4) transparent;
    min-width: 0;
  }
  .cac-eq::-webkit-scrollbar { height: 4px; }
  .cac-eq::-webkit-scrollbar-track { background: transparent; }
  .cac-eq::-webkit-scrollbar-thumb { background: rgba(26,68,184,0.4); border-radius: 2px; }
  .cac-ef { font-family: 'Courier New', Courier, monospace; font-size: 15px; font-weight: 700; color: #7ca0f8; white-space: nowrap; flex-shrink: 0; }
  .cac-ef sub { font-size: 0.72em; line-height: 0; }
  .cac-ef sup { font-size: 0.72em; line-height: 0; }
  .cac-arr { font-size: 17px; color: #a0c0ff; margin: 0 8px; flex-shrink: 0; white-space: nowrap; }
  .cac-plus { font-size: 16px; color: rgba(255,255,255,0.38); margin: 0 4px; flex-shrink: 0; }
  .cac-cond { font-size: 11px; font-family: 'Poppins', sans-serif; font-weight: 700; color: #f0d070; background: rgba(240,208,112,0.12); padding: 2px 7px; border-radius: 3px; margin: 0 4px; flex-shrink: 0; white-space: nowrap; }
  .cac-note { font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.36); margin-left: 8px; font-style: italic; white-space: nowrap; flex-shrink: 0; }

  /* ═══ PULL QUOTE ═══ */
  .cac-pull-quote { border-left: 5px solid var(--accent); background: var(--accent-lt); padding: 22px 30px; margin: 28px 0; border-radius: 0 4px 4px 0; }
  .cac-pull-quote p { font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 600; color: var(--accent2); line-height: 1.7; font-style: italic; margin: 0; }

  /* ═══ ALERT BOX ═══ */
  .cac-alert { padding: 12px 16px; border-radius: 6px; font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.7; margin-bottom: 16px; }
  .cac-alert.blue   { background: var(--accent-lt); color: var(--accent2); }
  .cac-alert.red    { background: var(--red-lt);    color: var(--red); }
  .cac-alert.gold   { background: var(--gold-lt);   color: var(--gold); }
  .cac-alert.green  { background: var(--green-lt);  color: var(--green); }
  .cac-alert.purple { background: var(--purple-lt); color: var(--purple); }
  .cac-alert strong { font-weight: 700; }

  /* ═══ ALLOTROPE CARDS ═══ */
  .cac-allotrope-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px; }
  @media (max-width: 640px) { .cac-allotrope-grid { grid-template-columns: 1fr; } }
  .cac-allotrope-card { border-radius: 8px; overflow: hidden; border: 1.5px solid var(--rule); }
  .cac-allotrope-top  { padding: 22px 20px 16px; }
  .cac-allotrope-icon { font-size: 32px; display: block; margin-bottom: 8px; }
  .cac-allotrope-name { font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 800; margin-bottom: 4px; }
  .cac-allotrope-sub  { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 600; opacity: 0.7; }
  .cac-allotrope-body { padding: 14px 20px 18px; background: var(--white); }
  .cac-allotrope-fact { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2); line-height: 1.7; margin-bottom: 6px; }
  .cac-allotrope-fact:last-child { margin: 0; }
  .cac-allotrope-fact strong { color: var(--accent2); font-weight: 600; }
  .cac-allotrope-card.diamond .cac-allotrope-top { background: linear-gradient(135deg, #1a1030, #3a2070); color: #e0d0ff; }
  .cac-allotrope-card.diamond .cac-allotrope-name { color: #e0d0ff; }
  .cac-allotrope-card.graphite .cac-allotrope-top { background: linear-gradient(135deg, #181c2a, #282e50); color: #c8d8ff; }
  .cac-allotrope-card.graphite .cac-allotrope-name { color: #c8d8ff; }
  .cac-allotrope-card.bucky .cac-allotrope-top { background: linear-gradient(135deg, #001818, #003838); color: #a0f0e0; }
  .cac-allotrope-card.bucky .cac-allotrope-name { color: #a0f0e0; }

  /* ═══ PROPERTY ICON GRID ═══ */
  .cac-prop-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 28px; }
  @media (max-width: 660px) { .cac-prop-grid { grid-template-columns: repeat(2, 1fr); } }
  .cac-prop-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 8px; padding: 18px 14px; text-align: center; border-top: 3px solid var(--accent); }
  .cac-prop-card:nth-child(2) { border-top-color: var(--gold); }
  .cac-prop-card:nth-child(3) { border-top-color: var(--green); }
  .cac-prop-card:nth-child(4) { border-top-color: var(--red); }
  .cac-prop-card:nth-child(5) { border-top-color: var(--purple); }
  .cac-prop-card:nth-child(6) { border-top-color: var(--teal); }
  .cac-prop-icon  { font-size: 26px; display: block; margin-bottom: 8px; }
  .cac-prop-title { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; color: var(--ink2); line-height: 1.4; margin-bottom: 4px; }
  .cac-prop-desc  { font-family: 'Inter', sans-serif; font-size: 11px; color: var(--muted); line-height: 1.5; }

  /* ═══ REACTION BLOCK ═══ */
  .cac-rxn-block { margin-bottom: 20px; border-radius: 6px; overflow: hidden; border: 1.5px solid var(--rule); display: flex; flex-direction: column; }
  .cac-rxn-hdr { display: flex; align-items: center; gap: 12px; padding: 14px 18px; flex-wrap: wrap; }
  .cac-rxn-hdr.blue   { background: linear-gradient(90deg, #0e2060, #1a44b8); }
  .cac-rxn-hdr.red    { background: linear-gradient(90deg, #500808, #a01818); }
  .cac-rxn-hdr.green  { background: linear-gradient(90deg, #063018, #0a6030); }
  .cac-rxn-hdr.purple { background: linear-gradient(90deg, #300850, #6a10a8); }
  .cac-rxn-icon { font-size: 22px; flex-shrink: 0; }
  .cac-rxn-meta { flex: 1; }
  .cac-rxn-tag  { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.55); margin-bottom: 2px; }
  .cac-rxn-name { font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 800; color: #fff; }
  .cac-rxn-gen  { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.65); margin-left: auto; white-space: nowrap; }
  .cac-rxn-body { background: var(--white); padding: 18px 20px; }

  /* ═══ COMPARE TABLE ═══ */
  .cac-compare-split { border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; margin-bottom: 28px; }
  .cac-compare-hdr { display: grid; grid-template-columns: 1fr 1fr; background: var(--ink); }
  .cac-compare-th { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 14px 20px; border-right: 1px solid rgba(255,255,255,0.08); }
  .cac-compare-th:last-child { border-right: none; }
  .cac-compare-th.left-col  { color: #7ca0f8; }
  .cac-compare-th.right-col { color: #f0d070; }
  .cac-compare-row { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--rule); }
  .cac-compare-row:last-child { border-bottom: none; }
  .cac-compare-row:nth-child(even) { background: var(--paper2); }
  .cac-compare-cell { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); padding: 13px 20px; border-right: 1px solid var(--rule); line-height: 1.6; }
  .cac-compare-cell:last-child { border-right: none; }
  .cac-compare-cell.left-border { border-left: 3px solid var(--accent); }
  .cac-compare-cell strong { color: var(--accent2); font-weight: 600; }

  /* ═══ SPECIAL HIGHLIGHT CARD ═══ */
  .cac-highlight-card { background: linear-gradient(135deg, #060c1e, #0e1a3a); border: 1.5px solid rgba(26,68,184,0.4); border-radius: 6px; padding: 22px 24px; margin-bottom: 20px; display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap; }
  .cac-hl-icon { font-size: 36px; flex-shrink: 0; }
  .cac-hl-content { flex: 1; min-width: 200px; }
  .cac-hl-tag { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(124,160,248,0.8); background: rgba(26,68,184,0.15); padding: 3px 10px; border-radius: 100px; display: inline-block; margin-bottom: 8px; }
  .cac-hl-title { font-family: 'Montserrat', sans-serif; font-size: 17px; font-weight: 900; color: #7ca0f8; margin-bottom: 8px; }
  .cac-hl-text { font-family: 'Inter', sans-serif; font-size: 14px; color: rgba(255,255,255,0.68); line-height: 1.75; }
  .cac-hl-text strong { color: #f0d070; }

  /* ═══ FUNCTIONAL GROUP TABLE ═══ */
  .cac-fg-table { border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; margin-bottom: 20px; }
  .cac-fg-head { display: grid; grid-template-columns: 1.5fr 1fr 1fr; background: var(--ink); }
  .cac-fg-th { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.55); padding: 12px 16px; border-right: 1px solid rgba(255,255,255,0.08); }
  .cac-fg-th:last-child { border-right: none; }
  .cac-fg-row { display: grid; grid-template-columns: 1.5fr 1fr 1fr; border-bottom: 1px solid var(--rule); align-items: center; }
  .cac-fg-row:last-child { border-bottom: none; }
  .cac-fg-row:nth-child(even) { background: var(--paper2); }
  .cac-fg-cell { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); padding: 11px 16px; border-right: 1px solid var(--rule); line-height: 1.5; }
  .cac-fg-cell:last-child { border-right: none; }
  .cac-fg-cell.formula { font-family: 'Courier New', monospace; font-size: 14px; font-weight: 700; color: var(--accent2); }

  /* ═══ STEP FLOW ═══ */
  .cac-steps { margin-bottom: 20px; display: flex; flex-direction: column; border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; background: var(--white); }
  .cac-step { display: flex; gap: 18px; padding: 18px 22px; border-bottom: 1px solid var(--rule); align-items: flex-start; }
  .cac-step:last-child { border-bottom: none; }
  .cac-step-num { min-width: 34px; height: 34px; border-radius: 50%; background: var(--accent); color: #fff; display: flex; align-items: center; justify-content: center; font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 800; flex-shrink: 0; }
  .cac-step-title { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: var(--ink); margin-bottom: 3px; }
  .cac-step-desc  { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--muted); line-height: 1.65; }

  /* ═══ SUFFIX TABLE ═══ */
  .cac-suffix-table { border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; margin-bottom: 20px; }
  .cac-st-head { display: grid; grid-template-columns: 1.5fr 1fr 1.5fr; background: var(--ink); }
  .cac-st-th { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.55); padding: 12px 18px; border-right: 1px solid rgba(255,255,255,0.08); }
  .cac-st-th:last-child { border-right: none; }
  .cac-st-row { display: grid; grid-template-columns: 1.5fr 1fr 1.5fr; border-bottom: 1px solid var(--rule); align-items: center; }
  .cac-st-row:last-child { border-bottom: none; }
  .cac-st-row:nth-child(even) { background: var(--paper2); }
  .cac-st-cell { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); padding: 11px 18px; border-right: 1px solid var(--rule); }
  .cac-st-cell:last-child { border-right: none; }
  .cac-st-suffix  { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 13px; color: var(--accent); background: var(--accent-lt); border-radius: 4px; padding: 2px 10px; display: inline-block; }
  .cac-st-formula { font-family: 'Courier New', monospace; font-size: 13px; font-weight: 700; color: var(--accent2); }

  /* ═══ PROCESS GRID ═══ */
  .cac-process-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px; }
  @media (max-width: 620px) { .cac-process-grid { grid-template-columns: 1fr; } }
  .cac-process-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 6px; padding: 20px; border-left: 4px solid var(--accent); }
  .cac-process-card:nth-child(2) { border-left-color: var(--red); }
  .cac-process-card:nth-child(3) { border-left-color: var(--green); }
  .cac-process-card:nth-child(4) { border-left-color: var(--gold); }
  .cac-process-icon  { font-size: 24px; margin-bottom: 8px; display: block; }
  .cac-process-title { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: var(--accent); margin-bottom: 6px; }
  .cac-process-card:nth-child(2) .cac-process-title { color: var(--red); }
  .cac-process-card:nth-child(3) .cac-process-title { color: var(--green); }
  .cac-process-card:nth-child(4) .cac-process-title { color: var(--gold); }
  .cac-process-def { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); line-height: 1.7; }
  .cac-process-def strong { font-weight: 600; }

  /* ═══ MICELLE DARK CARD ═══ */
  .cac-micelle-card { background: linear-gradient(135deg, #040810, #0a1228); border: 1.5px solid rgba(26,68,184,0.3); border-radius: 6px; padding: 24px 26px; margin-bottom: 20px; }
  .cac-micelle-title { font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 800; color: #7ca0f8; margin-bottom: 12px; }
  .cac-micelle-desc  { font-family: 'Inter', sans-serif; font-size: 14px; color: rgba(255,255,255,0.65); line-height: 1.8; margin-bottom: 16px; }
  .cac-micelle-parts { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  @media (max-width: 540px) { .cac-micelle-parts { grid-template-columns: 1fr; } }
  .cac-micelle-part { background: rgba(255,255,255,0.05); border-radius: 6px; padding: 14px; }
  .cac-micelle-part-name { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; color: #a0c0ff; margin-bottom: 5px; letter-spacing: 0.06em; }
  .cac-micelle-part-desc { font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.6; }

  /* ═══ FAQ ═══ */
  .cac-faq-header { margin-bottom: 12px; }
  .cac-faq-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); background: var(--accent-lt); padding: 6px 16px; border-radius: 100px; }
  .cac-faq-title { font-family: 'Montserrat', sans-serif; font-size: clamp(26px, 4vw, 36px); font-weight: 900; color: var(--ink); letter-spacing: -0.02em; margin-bottom: 28px; margin-top: 16px; }
  .cac-faq-item { border: 1.5px solid var(--rule); border-radius: 6px; margin-bottom: 12px; overflow: hidden; background: var(--white); transition: border-color 0.2s; }
  .cac-faq-item.open { border-color: var(--accent); }
  .cac-faq-q { width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; text-align: left; gap: 16px; }
  .cac-faq-q-text { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600; color: var(--ink); line-height: 1.5; }
  .cac-faq-item.open .cac-faq-q-text { color: var(--accent); }
  .cac-faq-icon { font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 700; color: var(--accent); flex-shrink: 0; transition: transform 0.2s; }
  .cac-faq-item.open .cac-faq-icon { transform: rotate(45deg); }
  .cac-faq-ans { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: var(--ink2); line-height: 1.85; padding: 0 24px; max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; }
  .cac-faq-ans.visible { max-height: 900px; padding: 0 24px 22px; }
  .cac-faq-ans strong { color: var(--accent2); font-weight: 600; }
  .cac-faq-ans code { font-family: 'Courier New', Courier, monospace; font-size: 13px; background: var(--accent-lt); padding: 1px 6px; border-radius: 3px; color: var(--accent2); }

  @media (max-width: 700px) {
    .cac-body { padding: 48px 20px 72px; }
    .cac-hero-inner { padding: 0 20px; }
    .cac-intro-card { padding: 24px 22px; }
    .cac-compare-cell { padding: 10px 12px; font-size: 13px; }
    .cac-compare-th { padding: 12px 12px; font-size: 11px; }
    .cac-st-head, .cac-st-row { grid-template-columns: 1.5fr 1fr; }
    .cac-st-th:last-child, .cac-st-cell:last-child { display: none; }
    .cac-fg-head, .cac-fg-row { grid-template-columns: 1.5fr 1fr; }
    .cac-fg-th:last-child, .cac-fg-cell:last-child { display: none; }
  }
`;

const faqs = [
  {
    q: "Why does carbon always form covalent bonds?",
    a: (<>Carbon has <strong>4 valence electrons</strong> (configuration 2,4). To form an ionic bond it would have to either lose all 4 electrons (forming C⁴⁺ — requires enormous energy) or gain 4 electrons (forming C⁴⁻ — very unstable). Neither is feasible.<br /><br />So carbon achieves stability by <strong>sharing electrons</strong> with other atoms, forming <strong>covalent bonds</strong>. It can form 4 covalent bonds simultaneously — with H, O, N, S, halogens, or other carbon atoms.</>),
  },
  {
    q: "What is catenation? Why is it special to carbon?",
    a: (<><strong>Catenation</strong> is the ability of an element to bond with its own atoms through covalent bonds to form long chains.<br /><br />Carbon shows extraordinary catenation because <strong>C–C bonds are very strong and stable</strong>. Carbon can form:<br />
      • <strong>Straight chains</strong> — e.g., n-butane<br />
      • <strong>Branched chains</strong> — e.g., 2-methylpropane<br />
      • <strong>Ring structures</strong> — e.g., cyclohexane, benzene<br />
      • <strong>Single, double, and triple bonds</strong> with itself<br /><br />
      Silicon also shows limited catenation, but <strong>no other element does it as extensively as carbon</strong> — which is why millions of carbon compounds exist.</>),
  },
  {
    q: "What are allotropes? Compare diamond, graphite and buckminsterfullerene.",
    a: (<><strong>Allotropes</strong> are different structural forms of the same element — chemically identical but physically very different.<br /><br />
      <strong>Diamond:</strong> Each C bonds to 4 others in a rigid 3D tetrahedral lattice. Hardest natural substance. Does NOT conduct electricity. Used in cutting tools and jewellery.<br /><br />
      <strong>Graphite:</strong> C atoms in hexagonal layers, each C bonded to 3 others. Layers slide — soft and slippery. Conducts electricity (one free e⁻ per atom). Used in pencils, lubricants, electrodes.<br /><br />
      <strong>Buckminsterfullerene (C₆₀):</strong> 60 C atoms forming a hollow sphere of 20 hexagons + 12 pentagons. Named after architect Buckminster Fuller. Used in nanotechnology.<br /><br />
      <strong>Amorphous forms:</strong> Charcoal, coke, coal, lampblack — no regular crystal structure.</>),
  },
  {
    q: "What is the difference between saturated and unsaturated hydrocarbons?",
    a: (<><strong>Saturated hydrocarbons (Alkanes):</strong><br />
      • Contain only <strong>single bonds</strong> (C–C) between carbons<br />
      • General formula: <code>CₙH₂ₙ₊₂</code><br />
      • Example: Methane (CH₄), Ethane (C₂H₆), Propane (C₃H₈)<br />
      • Less reactive — undergo substitution reactions<br /><br />
      <strong>Unsaturated hydrocarbons:</strong><br />
      • <strong>Alkenes</strong> — at least one double bond (C=C); formula <code>CₙH₂ₙ</code> — e.g., Ethene (C₂H₄)<br />
      • <strong>Alkynes</strong> — at least one triple bond (C≡C); formula <code>CₙH₂ₙ₋₂</code> — e.g., Ethyne (C₂H₂)<br />
      • More reactive — can undergo addition reactions</>),
  },
  {
    q: "What is a functional group? What is a homologous series?",
    a: (<><strong>Functional group:</strong> An atom or group of atoms that determines the characteristic chemical properties of an organic compound.<br /><br />
      Key groups: <code>–OH</code> (alcohol), <code>–CHO</code> (aldehyde), <code>{'>'}C=O</code> (ketone), <code>–COOH</code> (carboxylic acid), <code>–Cl/–Br</code> (halo group).<br /><br />
      <strong>Homologous series:</strong> A series of organic compounds that differ from consecutive members by –CH₂– (14 mass units), have the same functional group, and follow the same general formula. All members show similar chemical properties but gradually changing physical properties (e.g., increasing boiling point with chain length).<br /><br />
      Example: CH₄ → C₂H₆ → C₃H₈ → C₄H₁₀ (alkane homologous series)</>),
  },
  {
    q: "How do you name organic compounds using IUPAC nomenclature?",
    a: (<>IUPAC naming follows these steps:<br /><br />
      <strong>Step I</strong> — Select longest continuous C chain → gives root word: <code>meth(1) eth(2) prop(3) but(4) pent(5) hex(6)</code><br />
      <strong>Step II</strong> — Number from end nearest to a branch or functional group (lowest locant).<br />
      <strong>Step III</strong> — Name and number substituents alphabetically as prefixes (e.g., 2-methyl, 3-chloro).<br />
      <strong>Step IV</strong> — Add suffix for functional group: <code>-ane / -ene / -yne / -ol / -al / -one / -oic acid</code><br />
      <strong>Step V</strong> — Give functional group the lowest possible position number.<br />
      <strong>Step VI</strong> — Fill remaining valencies with hydrogen atoms.</>),
  },
  {
    q: "What are the four types of chemical reactions of carbon compounds?",
    a: (<><strong>1. Combustion:</strong> Carbon compounds burn in O₂ → CO₂ + H₂O + heat &amp; light.<br />
      <code>CH₄ + 2O₂ → CO₂ + 2H₂O + Heat</code><br />
      Incomplete combustion gives CO (toxic) or soot (C).<br /><br />
      <strong>2. Oxidation:</strong> Alcohols are oxidised to carboxylic acids using alkaline KMnO₄ or K₂Cr₂O₇.<br />
      <code>CH₃CH₂OH → CH₃COOH</code> (Alk. KMnO₄ / heat)<br /><br />
      <strong>3. Addition:</strong> Unsaturated compounds + H₂ → saturated (Ni catalyst) — called hydrogenation. Used to make vanaspati ghee.<br />
      <code>RCH=CHR + H₂ → RCH₂–CH₂R</code> (Ni catalyst)<br /><br />
      <strong>4. Substitution:</strong> H atoms in saturated hydrocarbons replaced by halogens in sunlight.<br />
      <code>CH₄ + Cl₂ → CH₃Cl + HCl</code> (sunlight)</>),
  },
  {
    q: "What are the properties and chemical reactions of ethanol?",
    a: (<><strong>Ethanol</strong> (CH₃CH₂OH) — ethyl alcohol.<br /><br />
      <strong>Physical:</strong> Liquid at room temperature · good solvent · miscible with water in all proportions.<br /><br />
      <strong>Chemical reactions:</strong><br />
      • With Na metal: <code>2Na + 2CH₃CH₂OH → 2CH₃CH₂O⁻Na⁺ + H₂↑</code><br />
      • Dehydration (hot conc. H₂SO₄): <code>CH₃CH₂OH → CH₂=CH₂ + H₂O</code> (forms ethene)<br />
      • Oxidation (KMnO₄): <code>CH₃CH₂OH → CH₃COOH</code> (ethanoic acid)<br /><br />
      <strong>Uses:</strong> Antiseptic, solvent in medicines &amp; perfumes, alcoholic beverages, fuel blending.</>),
  },
  {
    q: "What is ethanoic acid? What are esterification and saponification?",
    a: (<><strong>Ethanoic acid</strong> (CH₃COOH) — common name: acetic acid. Dilute aqueous solution = <strong>vinegar</strong>.<br />
      Colourless, pungent-smelling liquid, miscible with water. It is a <strong>weak acid</strong>.<br /><br />
      <strong>Esterification:</strong> Reaction of a carboxylic acid with an alcohol (acid catalyst) → ester + water. Esters have fruity fragrance.<br />
      <code>CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O</code><br /><br />
      <strong>Saponification:</strong> Hydrolysis of an ester in the presence of NaOH → alcohol + sodium carboxylate salt. This is the <strong>basis of soap making</strong>.<br /><br />
      Other reactions: with NaOH → sodium ethanoate + water; with Na₂CO₃ → CO₂ gas evolved.</>),
  },
  {
    q: "How are soaps made? Why do soaps not work in hard water?",
    a: (<><strong>Soap preparation:</strong> Fats/oils are heated with NaOH (saponification). NaCl is added to precipitate the soap out of solution.<br /><br />
      <strong>Why soaps fail in hard water:</strong><br />
      Hard water contains <strong>Ca²⁺ and Mg²⁺ salts</strong>. When soap is added, it reacts with these ions to form insoluble <strong>calcium/magnesium stearate — scum</strong>. This wastes soap and leaves white residue on fabric.<br /><br />
      <strong>Detergents vs Soaps:</strong><br />
      • Detergents work in hard water — no scum formation<br />
      • Detergents are more soluble and have stronger cleansing action<br />
      • Detergents work in acidic medium; soaps do not<br />
      • Soaps are biodegradable; many detergents may not be</>),
  },
  {
    q: "What is a micelle? How does soap remove oily dirt?",
    a: (<>Soap molecules have two different ends:<br />
      • <strong>Hydrophilic head</strong> — the ionic carboxylate end; attracted to water<br />
      • <strong>Hydrophobic tail</strong> — the long hydrocarbon chain; repels water, attracted to oil/grease<br /><br />
      When soap is mixed into dirty water:<br />
      1. Hydrophobic tails embed into the <strong>oil/grease droplet</strong><br />
      2. Hydrophilic heads face <strong>outward into water</strong><br />
      3. This forms a spherical cluster called a <strong>micelle</strong><br />
      4. Grease is trapped inside the micelle — emulsified<br />
      5. Micelles stay suspended and are <strong>washed away</strong> with rinsing water<br /><br />
      Soap removes grease that water alone cannot dissolve because water is polar and cannot interact with non-polar oil.</>),
  },
  {
    q: "What is structural isomerism? Give examples.",
    a: (<>Compounds with the <strong>same molecular formula but different structural arrangements</strong> are called <strong>isomers</strong>; the phenomenon is <strong>isomerism</strong>.<br /><br />
      Example: C₄H₁₀ has two isomers:<br />
      • <strong>n-Butane</strong> — straight chain C–C–C–C<br />
      • <strong>2-Methylpropane</strong> — branched C–C(–C)–C<br /><br />
      <strong>Types of structural isomerism:</strong><br />
      • <strong>Chain isomerism</strong> — different carbon skeleton<br />
      • <strong>Position isomerism</strong> — different position of functional group or multiple bond<br />
      • <strong>Functional group isomerism</strong> — different functional groups (e.g., alcohol vs ether from C₂H₆O)<br />
      • <strong>Metamerism</strong> — different C atoms on either side of the functional group</>),
  },
];

export default function CarbonAndItsCompounds() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="cac-root">

        {/* ═══ HERO ═══ */}
        <div className="cac-hero">
          <div className="cac-hero-grid" />
          <div className="cac-hero-sheen" />
          <div className="cac-hero-glow" />
          <div className="cac-hero-bg-num">04</div>
          <div className="cac-hero-inner">
            <div className="cac-overline">Science · Class 10 · Chemistry · Chapter 4</div>
            <h1 className="cac-hero-title">
              <span className="em1">Carbon</span><br />
              <span className="em3">&amp; Its</span><br />
              <span className="em2">Compounds</span>
            </h1>
            <div className="cac-hero-bar">
              {[
                { label: "Subject",  value: "Chemistry" },
                { label: "Class",   value: "10th Standard" },
                { label: "Chapter", value: "Chapter 4" },
                { label: "Board",   value: "CBSE / NCERT" },
              ].map((x) => (
                <div className="cac-hero-bar-item" key={x.label}>
                  <div className="cac-bar-label">{x.label}</div>
                  <div className="cac-bar-value">{x.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cac-body">

          {/* Intro */}
          <div className="cac-intro-card">
            <p>Carbon is the <strong>6th element</strong> in the periodic table — yet it forms more compounds than all other elements combined. From the graphite in your pencil to the <strong>DNA in your cells</strong>, carbon is the backbone of all life and organic chemistry.</p>
            <p>This chapter covers covalent bonding, allotropes, catenation, hydrocarbons, functional groups, IUPAC nomenclature, chemical reactions of carbon compounds, and soaps &amp; detergents.</p>
          </div>

          {/* ── S1: COVALENT BONDS & ALLOTROPES ── */}
          <div className="cac-sec-head">
            <div className="cac-sec-num">1</div>
            <div className="cac-sec-title-wrap">
              <div className="cac-sec-kicker">Electron Sharing</div>
              <h2 className="cac-sec-title">Covalent Bonds <span>&amp; Allotropes</span></h2>
            </div>
          </div>
          <p className="cac-body-text">
            <strong>Covalent bonds</strong> are formed by the mutual sharing of electrons. Both atoms contribute and both own the shared electrons. Carbon (configuration 2,4) has 4 valence electrons — losing or gaining 4 is energetically impossible, so it <strong>always shares</strong>, forming exactly 4 covalent bonds.
          </p>

          <div className="cac-highlight-card">
            <div className="cac-hl-icon">⚛️</div>
            <div className="cac-hl-content">
              <span className="cac-hl-tag">Carbon's Valency</span>
              <div className="cac-hl-title">Why Carbon Always Forms 4 Bonds</div>
              <div className="cac-hl-text">
                Carbon (atomic no. 6, configuration 2,4) has <strong>4 valence electrons</strong>. Losing all 4 → C⁴⁺ (needs enormous energy). Gaining 4 → C⁴⁻ (highly unstable). The only option: <strong>share all 4</strong> with other atoms through covalent bonds. This gives carbon its extraordinary ability to form chains, rings, and millions of compounds.
              </div>
            </div>
          </div>

          <p className="cac-body-text"><strong>Allotropes</strong> are different structural forms of the same element — same chemistry, vastly different physical properties. Carbon has three main allotropes:</p>

          <div className="cac-allotrope-grid">
            <div className="cac-allotrope-card diamond">
              <div className="cac-allotrope-top">
                <span className="cac-allotrope-icon">💎</span>
                <div className="cac-allotrope-name">Diamond</div>
                <div className="cac-allotrope-sub">3D Tetrahedral Network</div>
              </div>
              <div className="cac-allotrope-body">
                <div className="cac-allotrope-fact">Each C bonded to <strong>4 other C atoms</strong> — rigid lattice</div>
                <div className="cac-allotrope-fact"><strong>Hardest</strong> known natural substance</div>
                <div className="cac-allotrope-fact">Does <strong>not conduct</strong> electricity (no free e⁻)</div>
                <div className="cac-allotrope-fact">Used in cutting tools &amp; jewellery</div>
              </div>
            </div>
            <div className="cac-allotrope-card graphite">
              <div className="cac-allotrope-top">
                <span className="cac-allotrope-icon">✏️</span>
                <div className="cac-allotrope-name">Graphite</div>
                <div className="cac-allotrope-sub">Layered Hexagonal Sheets</div>
              </div>
              <div className="cac-allotrope-body">
                <div className="cac-allotrope-fact">Each C bonded to <strong>3 others</strong>; layers slide easily</div>
                <div className="cac-allotrope-fact"><strong>Soft &amp; slippery</strong> — good lubricant</div>
                <div className="cac-allotrope-fact"><strong>Conducts electricity</strong> (one free e⁻ per atom)</div>
                <div className="cac-allotrope-fact">Used in pencils, electrodes, batteries</div>
              </div>
            </div>
            <div className="cac-allotrope-card bucky">
              <div className="cac-allotrope-top">
                <span className="cac-allotrope-icon">⚽</span>
                <div className="cac-allotrope-name">Buckminster&shy;fullerene</div>
                <div className="cac-allotrope-sub">C₆₀ — "Buckyball"</div>
              </div>
              <div className="cac-allotrope-body">
                <div className="cac-allotrope-fact"><strong>60 C atoms</strong> — hollow sphere shape</div>
                <div className="cac-allotrope-fact">20 hexagons + 12 pentagons</div>
                <div className="cac-allotrope-fact">Named after <strong>Buckminster Fuller</strong></div>
                <div className="cac-allotrope-fact">Used in nanotechnology research</div>
              </div>
            </div>
          </div>

          <div className="cac-alert gold">
            ⚠️ <strong>Amorphous forms of carbon</strong> — non-crystalline, no ordered structure: <strong>Charcoal</strong>, <strong>Lampblack (soot)</strong>, <strong>Coal</strong>, and <strong>Coke</strong>.
          </div>

          {/* ── S2: CATENATION & HYDROCARBONS ── */}
          <div className="cac-divider"><div className="cac-divider-mark" /></div>
          <div className="cac-sec-head">
            <div className="cac-sec-num">2</div>
            <div className="cac-sec-title-wrap">
              <div className="cac-sec-kicker">Self-Bonding &amp; Organic Basics</div>
              <h2 className="cac-sec-title">Catenation <span>&amp; Hydrocarbons</span></h2>
            </div>
          </div>
          <p className="cac-body-text">
            <strong>Catenation</strong> is the ability of an element to bond with its own atoms through covalent bonds. Carbon shows <strong>extensive catenation</strong> — forming chains, branched chains, and ring structures using single, double, and triple bonds with itself.
          </p>

          <div className="cac-prop-grid">
            {[
              { icon:"⛓️", title:"Straight Chain",    desc:"C atoms linked linearly — e.g., n-butane (C–C–C–C)" },
              { icon:"🌿", title:"Branched Chain",    desc:"Carbon chain with side groups — e.g., 2-methylpropane" },
              { icon:"⭕", title:"Ring / Cyclic",     desc:"C atoms in a closed loop — e.g., cyclohexane, benzene" },
              { icon:"—",  title:"Single Bond (C–C)", desc:"Saturated; alkanes; CₙH₂ₙ₊₂" },
              { icon:"=",  title:"Double Bond (C=C)", desc:"Unsaturated; alkenes; CₙH₂ₙ" },
              { icon:"≡",  title:"Triple Bond (C≡C)", desc:"Unsaturated; alkynes; CₙH₂ₙ₋₂" },
            ].map(p => (
              <div className="cac-prop-card" key={p.title}>
                <span className="cac-prop-icon">{p.icon}</span>
                <div className="cac-prop-title">{p.title}</div>
                <div className="cac-prop-desc">{p.desc}</div>
              </div>
            ))}
          </div>

          <p className="cac-body-text">Compounds containing only carbon and hydrogen are called <strong>hydrocarbons</strong>. Key comparison:</p>

          <div className="cac-compare-split">
            <div className="cac-compare-hdr">
              <div className="cac-compare-th left-col">Saturated Hydrocarbons</div>
              <div className="cac-compare-th right-col">Unsaturated Hydrocarbons</div>
            </div>
            {[
              ["Only single bonds (C–C) between carbons", "Contain double (C=C) or triple (C≡C) bonds"],
              ["Called Alkanes — formula CₙH₂ₙ₊₂", "Alkenes (CₙH₂ₙ) or Alkynes (CₙH₂ₙ₋₂)"],
              ["e.g., Methane (CH₄), Ethane (C₂H₆)", "e.g., Ethene (C₂H₄), Ethyne (C₂H₂)"],
              ["Less reactive — undergo substitution", "More reactive — undergo addition reactions"],
              ["IUPAC suffix: -ane", "IUPAC suffix: -ene or -yne"],
            ].map(([l, r], i) => (
              <div className="cac-compare-row" key={i}>
                <div className="cac-compare-cell left-border">{l}</div>
                <div className="cac-compare-cell">{r}</div>
              </div>
            ))}
          </div>

          <div className="cac-pull-quote">
            <p>"Aliphatic compounds have straight or branched chain structures. Aromatic compounds contain a ring system with a characteristic odour — the first member is Benzene (C₆H₆). Alicyclic compounds are saturated ring structures."</p>
          </div>

          {/* ── S3: FUNCTIONAL GROUPS & NOMENCLATURE ── */}
          <div className="cac-divider"><div className="cac-divider-mark" /></div>
          <div className="cac-sec-head">
            <div className="cac-sec-num">3</div>
            <div className="cac-sec-title-wrap">
              <div className="cac-sec-kicker">Naming &amp; Reactive Centres</div>
              <h2 className="cac-sec-title">Functional Groups <span>&amp; Nomenclature</span></h2>
            </div>
          </div>
          <p className="cac-body-text">
            A <strong>functional group</strong> is an atom or group of atoms that determines the characteristic chemical properties of a compound. When carbon bonds with O, N, S, or halogens, these heteroatoms confer specific properties to the compound.
          </p>

          <div className="cac-fg-table">
            <div className="cac-fg-head">
              <div className="cac-fg-th">Functional Group Name</div>
              <div className="cac-fg-th">Formula</div>
              <div className="cac-fg-th">Heteroatom</div>
            </div>
            {[
              ["Halo group (Chloro / Bromo)", "–Cl / –Br", "Chlorine / Bromine"],
              ["Alcohol (Hydroxyl group)",    "–OH",       "Oxygen"],
              ["Aldehyde",                    "–CHO",      "Oxygen"],
              ["Ketone",                      ">C=O",      "Oxygen"],
              ["Carboxylic Acid",             "–COOH",     "Oxygen"],
            ].map(([name, formula, atom]) => (
              <div className="cac-fg-row" key={name}>
                <div className="cac-fg-cell">{name}</div>
                <div className="cac-fg-cell formula">{formula}</div>
                <div className="cac-fg-cell">{atom}</div>
              </div>
            ))}
          </div>

          <p className="cac-body-text">
            A <strong>homologous series</strong> is a series of compounds differing by –CH₂– (14 mass units), with the same functional group and general formula. The <strong>IUPAC system</strong> gives every compound a unique, structure-based name:
          </p>

          <div className="cac-steps">
            {[
              ["I",   "Longest Carbon Chain",            "Select the longest continuous C chain — gives root word: meth(1), eth(2), prop(3), but(4), pent(5), hex(6)…"],
              ["II",  "Number the Chain",                 "Number from the end nearest a branch or functional group — lowest locant rule."],
              ["III", "Name Substituents as Prefixes",    "Identify side chains, number and name them alphabetically as prefixes (2-methyl, 3-chloro…)."],
              ["IV",  "Add Functional Group Suffix",      "Determine the suffix from the functional group: -ane / -ene / -yne / -ol / -al / -one / -oic acid."],
              ["V",   "Lowest Number for Functional Group","Give the functional group the lowest possible position number."],
              ["VI",  "Complete Valencies with Hydrogen", "Fill all remaining carbon valencies by attaching hydrogen atoms."],
            ].map(([num, title, desc]) => (
              <div className="cac-step" key={num}>
                <div className="cac-step-num">{num}</div>
                <div>
                  <div className="cac-step-title">{title}</div>
                  <div className="cac-step-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="cac-suffix-table">
            <div className="cac-st-head">
              <div className="cac-st-th">Compound Class</div>
              <div className="cac-st-th">Suffix / Prefix</div>
              <div className="cac-st-th">General Formula</div>
            </div>
            {[
              ["Alkanes",          "-ane",       "CₙH₂ₙ₊₂"],
              ["Alkenes",          "-ene",       "CₙH₂ₙ"],
              ["Alkynes",          "-yne",       "CₙH₂ₙ₋₂"],
              ["Alkyl Halides",    "halo-",      "CₙH₂ₙ₊₁X"],
              ["Alcohols",         "-ol",        "CₙH₂ₙ₊₁OH"],
              ["Aldehydes",        "-al",        "CₙH₂ₙ₊₁CHO"],
              ["Carboxylic Acids", "-oic acid",  "CₙH₂ₙ₊₁COOH"],
            ].map(([name, suf, formula]) => (
              <div className="cac-st-row" key={name}>
                <div className="cac-st-cell">{name}</div>
                <div className="cac-st-cell"><span className="cac-st-suffix">{suf}</span></div>
                <div className="cac-st-cell"><span className="cac-st-formula">{formula}</span></div>
              </div>
            ))}
          </div>

          {/* ── S4: CHEMICAL REACTIONS ── */}
          <div className="cac-divider"><div className="cac-divider-mark" /></div>
          <div className="cac-sec-head">
            <div className="cac-sec-num">4</div>
            <div className="cac-sec-title-wrap">
              <div className="cac-sec-kicker">Reactivity</div>
              <h2 className="cac-sec-title">Chemical <span>Reactions of Carbon Compounds</span></h2>
            </div>
          </div>
          <p className="cac-body-text">Carbon compounds undergo four main types of reactions. Each has a different mechanism and produces different products.</p>

          <div className="cac-rxn-block">
            <div className="cac-rxn-hdr blue">
              <span className="cac-rxn-icon">🔥</span>
              <div className="cac-rxn-meta">
                <div className="cac-rxn-tag">Reaction 01</div>
                <div className="cac-rxn-name">Combustion</div>
              </div>
              <span className="cac-rxn-gen">Carbon compound + O₂ → CO₂ + H₂O + Heat</span>
            </div>
            <div className="cac-rxn-body">
              <p className="cac-body-text" style={{marginBottom:"12px"}}>All carbon compounds burn in excess O₂ to give <strong>CO₂, H₂O, heat and light</strong>. Incomplete combustion → CO (toxic) or soot.</p>
              <div className="cac-eq">
                <span className="cac-ef">C</span><span className="cac-plus">+</span>
                <span className="cac-ef">O<sub>2</sub></span>
                <span className="cac-arr">→</span>
                <span className="cac-ef">CO<sub>2</sub></span>
              </div>
              <div className="cac-eq">
                <span className="cac-ef">CH<sub>4</sub></span><span className="cac-plus">+</span>
                <span className="cac-ef">2O<sub>2</sub></span>
                <span className="cac-arr">→</span>
                <span className="cac-ef">CO<sub>2</sub></span><span className="cac-plus">+</span>
                <span className="cac-ef">2H<sub>2</sub>O</span><span className="cac-plus">+</span>
                <span className="cac-ef">Heat &amp; Light</span>
              </div>
              <div className="cac-eq">
                <span className="cac-ef">CH<sub>3</sub>CH<sub>2</sub>OH</span><span className="cac-plus">+</span>
                <span className="cac-ef">O<sub>2</sub></span>
                <span className="cac-arr">→</span>
                <span className="cac-ef">CO<sub>2</sub></span><span className="cac-plus">+</span>
                <span className="cac-ef">H<sub>2</sub>O</span><span className="cac-plus">+</span>
                <span className="cac-ef">Heat</span>
                <span className="cac-note">Ethanol combustion</span>
              </div>
            </div>
          </div>

          <div className="cac-rxn-block">
            <div className="cac-rxn-hdr green">
              <span className="cac-rxn-icon">🧪</span>
              <div className="cac-rxn-meta">
                <div className="cac-rxn-tag">Reaction 02</div>
                <div className="cac-rxn-name">Oxidation</div>
              </div>
              <span className="cac-rxn-gen">Alcohol → Carboxylic Acid (oxidising agent)</span>
            </div>
            <div className="cac-rxn-body">
              <p className="cac-body-text" style={{marginBottom:"12px"}}>Using oxidising agents like <strong>alkaline KMnO₄</strong> or <strong>acidified K₂Cr₂O₇</strong>, alcohols are oxidised to carboxylic acids.</p>
              <div className="cac-eq">
                <span className="cac-ef">CH<sub>3</sub>CH<sub>2</sub>OH</span>
                <span className="cac-cond">Alk. KMnO₄ / Heat</span>
                <span className="cac-arr">→</span>
                <span className="cac-ef">CH<sub>3</sub>COOH</span>
                <span className="cac-note">Ethanol → Ethanoic acid</span>
              </div>
            </div>
          </div>

          <div className="cac-rxn-block">
            <div className="cac-rxn-hdr purple">
              <span className="cac-rxn-icon">⚗️</span>
              <div className="cac-rxn-meta">
                <div className="cac-rxn-tag">Reaction 03</div>
                <div className="cac-rxn-name">Addition Reaction</div>
              </div>
              <span className="cac-rxn-gen">Unsaturated + H₂ → Saturated</span>
            </div>
            <div className="cac-rxn-body">
              <p className="cac-body-text" style={{marginBottom:"12px"}}>Unsaturated hydrocarbons react with H₂ in presence of <strong>nickel catalyst</strong> → saturated hydrocarbons. Called <strong>hydrogenation</strong>. Used to make vanaspati ghee from vegetable oils.</p>
              <div className="cac-eq">
                <span className="cac-ef">RCH=CHR</span><span className="cac-plus">+</span>
                <span className="cac-ef">H<sub>2</sub></span>
                <span className="cac-cond">Ni catalyst</span>
                <span className="cac-arr">→</span>
                <span className="cac-ef">RCH<sub>2</sub>–CH<sub>2</sub>R</span>
                <span className="cac-note">Double bond removed; now saturated</span>
              </div>
            </div>
          </div>

          <div className="cac-rxn-block">
            <div className="cac-rxn-hdr red">
              <span className="cac-rxn-icon">☀️</span>
              <div className="cac-rxn-meta">
                <div className="cac-rxn-tag">Reaction 04</div>
                <div className="cac-rxn-name">Substitution Reaction</div>
              </div>
              <span className="cac-rxn-gen">C–H + Halogen → C–X + HX (sunlight)</span>
            </div>
            <div className="cac-rxn-body">
              <p className="cac-body-text" style={{marginBottom:"12px"}}>In saturated hydrocarbons, H atoms are replaced by halogen atoms <strong>in the presence of sunlight</strong>. A free radical chain reaction.</p>
              <div className="cac-eq">
                <span className="cac-ef">CH<sub>4</sub></span><span className="cac-plus">+</span>
                <span className="cac-ef">Cl<sub>2</sub></span>
                <span className="cac-cond">Sunlight</span>
                <span className="cac-arr">→</span>
                <span className="cac-ef">CH<sub>3</sub>Cl</span><span className="cac-plus">+</span>
                <span className="cac-ef">HCl</span>
                <span className="cac-note">Methane + Chlorine → Chloromethane + HCl</span>
              </div>
            </div>
          </div>

          {/* ── S5: ETHANOL & ETHANOIC ACID ── */}
          <div className="cac-divider"><div className="cac-divider-mark" /></div>
          <div className="cac-sec-head">
            <div className="cac-sec-num">5</div>
            <div className="cac-sec-title-wrap">
              <div className="cac-sec-kicker">Important Carbon Compounds</div>
              <h2 className="cac-sec-title">Ethanol <span>&amp; Ethanoic Acid</span></h2>
            </div>
          </div>
          <p className="cac-body-text">Two most important carbon compounds at this level — ethanol (an alcohol) and ethanoic acid (a carboxylic acid).</p>

          <div className="cac-process-grid">
            <div className="cac-process-card">
              <span className="cac-process-icon">🍶</span>
              <div className="cac-process-title">Ethanol — Physical Properties</div>
              <div className="cac-process-def">Liquid at room temperature · Good solvent · Completely miscible with water in all proportions</div>
            </div>
            <div className="cac-process-card">
              <span className="cac-process-icon">🧂</span>
              <div className="cac-process-title">Ethanol + Sodium Metal</div>
              <div className="cac-process-def"><strong>2Na + 2CH₃CH₂OH → 2CH₃CH₂O⁻Na⁺ + H₂↑</strong><br />Sodium ethoxide formed; H₂ gas evolved</div>
            </div>
            <div className="cac-process-card">
              <span className="cac-process-icon">♨️</span>
              <div className="cac-process-title">Ethanol — Dehydration</div>
              <div className="cac-process-def">Hot conc. H₂SO₄:<br /><strong>CH₃CH₂OH → CH₂=CH₂ + H₂O</strong><br />(Forms ethene — an alkene)</div>
            </div>
            <div className="cac-process-card">
              <span className="cac-process-icon">🍾</span>
              <div className="cac-process-title">Ethanoic Acid — Properties</div>
              <div className="cac-process-def">Colourless, pungent liquid · Weak acid · Miscible with water · Dilute solution = <strong>vinegar</strong></div>
            </div>
          </div>

          <div className="cac-highlight-card">
            <div className="cac-hl-icon">🍋</div>
            <div className="cac-hl-content">
              <span className="cac-hl-tag">Esterification &amp; Saponification</span>
              <div className="cac-hl-title">Two Key Reactions of Ethanoic Acid</div>
              <div className="cac-hl-text">
                <strong>Esterification:</strong> CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O (acid catalyst). Esters have fruity fragrance; used in perfumes &amp; flavourings.<br /><br />
                <strong>Saponification (reverse):</strong> Ester + NaOH → Alcohol + RCOONa — the basis of <strong>soap making</strong> from fats and oils.
              </div>
            </div>
          </div>

          <p className="cac-body-text">Other reactions of ethanoic acid:</p>
          <div className="cac-eq">
            <span className="cac-ef">CH<sub>3</sub>COOH</span><span className="cac-plus">+</span>
            <span className="cac-ef">NaOH</span>
            <span className="cac-arr">→</span>
            <span className="cac-ef">CH<sub>3</sub>COONa</span><span className="cac-plus">+</span>
            <span className="cac-ef">H<sub>2</sub>O</span>
            <span className="cac-note">Sodium ethanoate formed</span>
          </div>
          <div className="cac-eq">
            <span className="cac-ef">2CH<sub>3</sub>COOH</span><span className="cac-plus">+</span>
            <span className="cac-ef">Na<sub>2</sub>CO<sub>3</sub></span>
            <span className="cac-arr">→</span>
            <span className="cac-ef">2CH<sub>3</sub>COONa</span><span className="cac-plus">+</span>
            <span className="cac-ef">H<sub>2</sub>O</span><span className="cac-plus">+</span>
            <span className="cac-ef">CO<sub>2</sub>↑</span>
            <span className="cac-note">CO₂ gas evolved with carbonates</span>
          </div>

          {/* ── S6: SOAPS & DETERGENTS ── */}
          <div className="cac-divider"><div className="cac-divider-mark" /></div>
          <div className="cac-sec-head">
            <div className="cac-sec-num">6</div>
            <div className="cac-sec-title-wrap">
              <div className="cac-sec-kicker">Cleansing Agents</div>
              <h2 className="cac-sec-title">Soaps <span>&amp; Detergents</span></h2>
            </div>
          </div>
          <p className="cac-body-text">
            <strong>Soaps</strong> are sodium or potassium salts of long-chain fatty acids. Prepared by heating oils/fats with NaOH (saponification), then adding NaCl to precipitate the soap (salting out).<br /><br />
            <strong>Detergents</strong> are ammonium or sulphonate salts of long hydrocarbon chains. Prepared by treating petroleum hydrocarbons with conc. H₂SO₄ then NaOH.
          </p>

          <div className="cac-micelle-card">
            <div className="cac-micelle-title">🧼 Cleansing Action — How Micelles Work</div>
            <div className="cac-micelle-desc">
              Soap molecules have two distinct ends. When soap is added to dirty water, the <strong>hydrophobic tails</strong> embed into oil/grease while <strong>hydrophilic heads</strong> face outward toward water. This forms a spherical cluster called a <strong>micelle</strong>. The trapped grease stays emulsified and is washed away with rinsing water.
            </div>
            <div className="cac-micelle-parts">
              <div className="cac-micelle-part">
                <div className="cac-micelle-part-name">Hydrophilic Head (Ionic)</div>
                <div className="cac-micelle-part-desc">Water-loving. The carboxylate/ionic end. Points outward into water in the micelle.</div>
              </div>
              <div className="cac-micelle-part">
                <div className="cac-micelle-part-name">Hydrophobic Tail (Hydrocarbon)</div>
                <div className="cac-micelle-part-desc">Water-fearing. Long hydrocarbon chain. Points inward into the oil droplet.</div>
              </div>
            </div>
          </div>

          <div className="cac-alert red">
            ⚠️ <strong>Soaps fail in hard water</strong> — Ca²⁺ and Mg²⁺ salts in hard water react with soap to form insoluble <strong>scum</strong> (calcium/magnesium stearate), wasting soap and leaving residue on fabric.
          </div>

          <div className="cac-compare-split">
            <div className="cac-compare-hdr">
              <div className="cac-compare-th left-col">🧼 Soaps</div>
              <div className="cac-compare-th right-col">🫧 Detergents</div>
            </div>
            {[
              ["Salts of long-chain fatty acids + NaOH", "Sulphonate/ammonium salts from petroleum"],
              ["Made by saponification of fats", "Made from petroleum + conc. H₂SO₄ + NaOH"],
              ["Do NOT work in hard water — form scum", "Work efficiently in hard water — no scum"],
              ["Do NOT work in acidic medium", "Work in acidic, neutral, and alkaline media"],
              ["Biodegradable — eco-friendly", "May not be biodegradable"],
              ["Weaker cleansing action", "Stronger cleansing action; more soluble"],
            ].map(([l, r], i) => (
              <div className="cac-compare-row" key={i}>
                <div className="cac-compare-cell left-border">{l}</div>
                <div className="cac-compare-cell">{r}</div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="cac-divider"><div className="cac-divider-mark" /></div>
          <div className="cac-faq-header"><span className="cac-faq-kicker">Exam Preparation</span></div>
          <h2 className="cac-faq-title">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div className={`cac-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="cac-faq-q" onClick={() => toggle(i)}>
                <span className="cac-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="cac-faq-icon">+</span>
              </button>
              <div className={`cac-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
