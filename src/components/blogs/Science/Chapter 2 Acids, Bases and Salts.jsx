import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #060e18;
    --ink2:       #0e1e30;
    --muted:      #3a5570;
    --paper:      #f0f8ff;
    --paper2:     #ddf0fa;
    --accent:     #0694b8;
    --accent2:    #04708f;
    --accent-lt:  #cdf0fc;
    --red:        #c42b1a;
    --red-lt:     #fde8e5;
    --blue:       #1444b0;
    --blue-lt:    #dce8ff;
    --purple:     #7a1ab8;
    --purple-lt:  #f0dcff;
    --amber:      #b87800;
    --amber-lt:   #fff4d0;
    --green:      #0a7a3a;
    --green-lt:   #d8f5e4;
    --rule:       #b0d8ec;
    --white:      #ffffff;
    --eq-bg:      #040e18;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .abs-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  /* ═══ HERO — deep cyan/teal ═══ */
  .abs-hero {
    background: linear-gradient(135deg, #02080e 0%, #041420 50%, #062030 100%);
    min-height: 88vh; display: flex; align-items: flex-end;
    position: relative; overflow: hidden; padding: 0 0 64px;
  }
  .abs-hero::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #0694b8 0%, #c42b1a 40%, #7a1ab8 75%, #b87800 100%);
  }
  .abs-hero-bg-num {
    position: absolute; bottom: -60px; right: -30px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(220px, 36vw, 500px); font-weight: 900;
    line-height: 1; color: rgba(255,255,255,0.02);
    letter-spacing: -0.04em; user-select: none; pointer-events: none;
  }
  /* pH scale watermark */
  .abs-hero-ph {
    position: absolute; top: 50%; right: 4%; transform: translateY(-50%);
    font-family: 'Montserrat', sans-serif; font-size: clamp(80px, 14vw, 180px);
    font-weight: 900; color: rgba(6,148,184,0.07); letter-spacing: -0.04em;
    pointer-events: none; user-select: none; line-height: 1;
  }
  /* Hexagon pattern */
  .abs-hero-hex {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(6,148,184,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(6,148,184,0.05) 1px, transparent 1px);
    background-size: 48px 48px; pointer-events: none;
  }
  .abs-glow-a {
    position: absolute; top: 18%; left: 8%; width: 260px; height: 260px; border-radius: 50%;
    background: radial-gradient(circle, rgba(6,148,184,0.15) 0%, transparent 70%); pointer-events: none;
  }
  .abs-glow-b {
    position: absolute; bottom: 10%; right: 14%; width: 180px; height: 180px; border-radius: 50%;
    background: radial-gradient(circle, rgba(196,43,26,0.1) 0%, transparent 70%); pointer-events: none;
  }
  .abs-hero-inner { max-width: 900px; width: 100%; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
  .abs-overline {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; color: #67e8f9;
    margin-bottom: 24px; display: flex; align-items: center; gap: 14px;
  }
  .abs-overline::before, .abs-overline::after { content: ''; flex: 0 0 40px; height: 1px; background: #67e8f9; }
  .abs-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(42px, 10vw, 78px); font-weight: 900; color: #fff;
    line-height: 1; letter-spacing: -0.03em; margin-bottom: 32px;
  }
  .abs-hero-title .em1 { color: #67e8f9; font-style: normal; }
  .abs-hero-title .em2 { color: #fca5a5; font-style: normal; }
  .abs-hero-title .em3 { color: #fde68a; font-style: normal; }
  .abs-hero-bar { display: flex; flex-wrap: wrap; gap: 0; border-top: 1px solid rgba(255,255,255,0.12); padding-top: 24px; margin-top: 8px; }
  .abs-hero-bar-item { flex: 1 1 130px; padding: 0 16px 0 0; border-right: 1px solid rgba(255,255,255,0.1); margin-right: 16px; }
  .abs-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .abs-bar-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 5px; }
  .abs-bar-value { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.75); }

  /* ═══ BODY ═══ */
  .abs-body { max-width: 860px; margin: 0 auto; padding: 72px 32px 96px; }

  /* ═══ INTRO CARD ═══ */
  .abs-intro-card {
    background: linear-gradient(135deg, #02080e 0%, #062030 100%);
    border-left: 5px solid #0694b8; border-radius: 4px; padding: 36px 40px;
    margin-bottom: 64px; position: relative; overflow: hidden;
  }
  .abs-intro-card::after { content: '🧪'; position: absolute; right: 28px; top: 50%; transform: translateY(-50%); font-size: 80px; opacity: 0.1; }
  .abs-intro-card p { font-family: 'Poppins', sans-serif; font-size: 18px; font-weight: 500; color: rgba(255,255,255,0.88); line-height: 1.78; margin: 0 0 14px; }
  .abs-intro-card p:last-child { margin: 0; }
  .abs-intro-card strong { color: #67e8f9; }

  /* ═══ SEC HEADER ═══ */
  .abs-sec-head { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 32px; border-bottom: 2px solid var(--rule); padding-bottom: 18px; }
  .abs-sec-num { font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900; color: var(--rule); line-height: 1; flex-shrink: 0; }
  .abs-sec-title-wrap { padding-top: 8px; }
  .abs-sec-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .abs-sec-title { font-family: 'Montserrat', sans-serif; font-size: clamp(22px, 3.5vw, 30px); font-weight: 800; color: var(--ink); line-height: 1.15; letter-spacing: -0.02em; }
  .abs-sec-title span { color: var(--accent); }

  /* ═══ BODY TEXT ═══ */
  .abs-body-text { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; color: var(--ink2); line-height: 1.85; margin-bottom: 28px; }
  .abs-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ═══ DIVIDER ═══ */
  .abs-divider { margin: 56px 0; display: flex; align-items: center; gap: 16px; }
  .abs-divider::before, .abs-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .abs-divider-mark { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

  /* ═══ ACID vs BASE — BIG SPLIT PANEL ═══ */
  .abs-ab-split {
    display: grid; grid-template-columns: 1fr 1fr; gap: 0;
    border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; margin-bottom: 28px;
  }
  @media (max-width: 640px) { .abs-ab-split { grid-template-columns: 1fr; } }
  .abs-ab-col { padding: 28px 26px; }
  .abs-ab-col.acid { background: linear-gradient(160deg, #1a0404, #2e0808); }
  .abs-ab-col.base { background: linear-gradient(160deg, #02080e, #041a2e); }
  @media (max-width: 580px) { .abs-ab-col.acid { border-bottom: 1.5px solid var(--rule); } }
  .abs-ab-badge {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase; padding: 4px 12px;
    border-radius: 100px; display: inline-block; margin-bottom: 10px;
  }
  .abs-ab-col.acid .abs-ab-badge { background: rgba(196,43,26,0.2); color: #fca5a5; }
  .abs-ab-col.base .abs-ab-badge { background: rgba(6,148,184,0.2); color: #67e8f9; }
  .abs-ab-heading { font-family: 'Montserrat', sans-serif; font-size: 26px; font-weight: 900; margin-bottom: 14px; line-height: 1; }
  .abs-ab-col.acid .abs-ab-heading { color: #fca5a5; }
  .abs-ab-col.base .abs-ab-heading { color: #67e8f9; }
  .abs-ab-litmus {
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 600;
    padding: 8px 14px; border-radius: 6px; margin-bottom: 16px; display: inline-block;
  }
  .abs-ab-col.acid .abs-ab-litmus { background: rgba(196,43,26,0.15); color: #fca5a5; border: 1px solid rgba(196,43,26,0.3); }
  .abs-ab-col.base .abs-ab-litmus { background: rgba(6,148,184,0.15); color: #67e8f9; border: 1px solid rgba(6,148,184,0.3); }
  .abs-ab-col ul { list-style: none; padding: 0; }
  .abs-ab-col ul li {
    font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400;
    color: rgba(255,255,255,0.75); padding: 7px 0 7px 18px;
    border-bottom: 1px solid rgba(255,255,255,0.07); position: relative; line-height: 1.6;
  }
  .abs-ab-col ul li:last-child { border-bottom: none; }
  .abs-ab-col ul li::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 6px; height: 6px; border-radius: 50%; }
  .abs-ab-col.acid ul li::before { background: #fca5a5; }
  .abs-ab-col.base ul li::before { background: #67e8f9; }
  .abs-ab-col ul li strong { font-weight: 600; }
  .abs-ab-col.acid ul li strong { color: #fca5a5; }
  .abs-ab-col.base ul li strong { color: #67e8f9; }

  /* ═══ EQUATION BOX (dark) ═══ */
  .abs-eq-box {
    background: var(--eq-bg); border-radius: 6px; padding: 14px 16px;
    margin-bottom: 10px; display: flex; align-items: center; flex-wrap: wrap;
    gap: 4px; border: 1px solid rgba(6,148,184,0.2); overflow-x: auto;
  }
  .abs-eq-box:last-of-type { margin-bottom: 0; }
  .abs-ef { font-family: 'Courier New', Courier, monospace; font-size: 15px; font-weight: 700; color: #67e8f9; }
  .abs-ef sub { font-size: 0.72em; }
  .abs-ef sup { font-size: 0.72em; }
  .abs-arr { font-size: 18px; color: #fdba74; margin: 0 8px; }
  .abs-plus { font-size: 16px; color: rgba(255,255,255,0.4); margin: 0 5px; }
  .abs-cond { font-size: 11px; font-family: 'Poppins', sans-serif; font-weight: 700; color: #fdba74; background: rgba(253,186,116,0.12); padding: 2px 7px; border-radius: 3px; margin: 0 4px; }
  .abs-note { font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.38); margin-left: 10px; font-style: italic; }

  /* ═══ REACTION SECTIONS — STACKED FEATURE ROWS ═══ */
  .abs-rxn-section { margin-bottom: 28px; }
  .abs-rxn-section-hdr {
    display: flex; align-items: center; gap: 12px; padding: 14px 16px;
    border-radius: 6px 6px 0 0; border: 1.5px solid var(--rule); border-bottom: none;
    flex-wrap: wrap;
  }
  .abs-rxn-section-hdr.cyan    { background: linear-gradient(90deg, #031820, #042030); border-color: rgba(6,148,184,0.3); }
  .abs-rxn-section-hdr.red     { background: linear-gradient(90deg, #1a0404, #280808); border-color: rgba(196,43,26,0.3); }
  .abs-rxn-section-hdr.purple  { background: linear-gradient(90deg, #120a1e, #1e1030); border-color: rgba(122,26,184,0.3); }
  .abs-rxn-section-hdr.amber   { background: linear-gradient(90deg, #140e00, #201600); border-color: rgba(184,120,0,0.3); }
  .abs-rxn-section-hdr.green   { background: linear-gradient(90deg, #031408, #041e0c); border-color: rgba(10,122,58,0.3); }
  .abs-rxn-icon { font-size: 22px; flex-shrink: 0; }
  .abs-rxn-hdr-meta { flex: 1; min-width: 120px; }
  .abs-rxn-hdr-tag { font-family: 'Poppins', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 2px; }
  .abs-rxn-hdr-name { font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 900; color: #fff; line-height: 1.2; }
  .abs-rxn-gen {
    font-family: 'Courier New', Courier, monospace; font-size: 12px; font-weight: 700;
    color: rgba(255,255,255,0.55); background: rgba(255,255,255,0.06);
    padding: 5px 10px; border-radius: 4px; white-space: nowrap;
    overflow: hidden; text-overflow: ellipsis; max-width: 100%;
  }
  @media (max-width: 500px) { .abs-rxn-gen { display: none; } }
  .abs-rxn-body { padding: 16px 20px; border: 1.5px solid var(--rule); border-top: none; border-radius: 0 0 6px 6px; background: var(--white); }
  .abs-rxn-body .abs-body-text { margin-bottom: 14px; font-size: 15px; }

  /* ═══ pH SCALE VISUAL ═══ */
  .abs-ph-scale { margin-bottom: 28px; }
  .abs-ph-scale-title { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-bottom: 14px; }
  .abs-ph-bar {
    height: 32px; border-radius: 100px;
    background: linear-gradient(90deg,
      #c42b1a 0%, #e05533 8%, #e07000 16%, #b87800 24%,
      #a89000 32%, #6a9600 40%, #18a060 48%,
      #0694b8 56%, #0a70c8 64%, #1444b0 72%,
      #4a18a0 80%, #7a1ab8 88%, #9e10a0 100%);
    margin-bottom: 8px; position: relative;
  }
  .abs-ph-nums {
    display: flex; justify-content: space-between;
    padding: 0 2px; overflow-x: auto;
  }
  .abs-ph-num { font-family: 'Montserrat', sans-serif; font-size: clamp(9px, 2vw, 11px); font-weight: 900; color: var(--muted); flex-shrink: 0; }
  .abs-ph-labels { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; margin-top: 12px; }
  .abs-ph-label { text-align: center; padding: 10px 8px; border-radius: 6px; }
  .abs-ph-label.acid   { background: var(--red-lt); }
  .abs-ph-label.neutral { background: var(--green-lt); }
  .abs-ph-label.base   { background: var(--blue-lt); }
  .abs-ph-label-range { font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 900; margin-bottom: 3px; }
  .abs-ph-label.acid    .abs-ph-label-range { color: var(--red); }
  .abs-ph-label.neutral .abs-ph-label-range { color: var(--green); }
  .abs-ph-label.base    .abs-ph-label-range { color: var(--blue); }
  .abs-ph-label-text { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600; color: var(--muted); }

  /* ═══ pH FACTS GRID ═══ */
  .abs-ph-facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 28px; }
  @media (max-width: 640px) { .abs-ph-facts { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 400px) { .abs-ph-facts { grid-template-columns: 1fr; } }
  .abs-ph-fact { background: var(--white); border: 1.5px solid var(--rule); border-radius: 6px; padding: 16px 14px; text-align: center; }
  .abs-ph-fact-num { font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900; color: var(--accent); margin-bottom: 4px; line-height: 1; }
  .abs-ph-fact-label { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600; color: var(--muted); line-height: 1.4; }

  /* ═══ IONS IN WATER — DARK BANNER ═══ */
  .abs-ions-banner {
    background: var(--eq-bg); border-radius: 8px; padding: 24px 28px; margin-bottom: 28px;
    border: 1px solid rgba(6,148,184,0.2);
  }
  .abs-ions-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(103,232,249,0.6); margin-bottom: 16px; }
  .abs-ions-row { display: flex; gap: 24px; flex-wrap: wrap; }
  .abs-ions-item { flex: 1; min-width: 160px; }
  .abs-ions-tag { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; padding: 3px 10px; border-radius: 100px; display: inline-block; }
  .abs-ions-item.acid-ion .abs-ions-tag  { background: rgba(196,43,26,0.2); color: #fca5a5; }
  .abs-ions-item.base-ion .abs-ions-tag  { background: rgba(6,148,184,0.2); color: #67e8f9; }
  .abs-ions-eq { font-family: 'Courier New', Courier, monospace; font-size: 14px; font-weight: 700; color: #67e8f9; display: block; margin-bottom: 6px; }
  .abs-ions-eq sub { font-size: 0.72em; }
  .abs-ions-eq sup { font-size: 0.72em; }
  .abs-ions-note { font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.6; }
  .abs-ions-divider { width: 1px; background: rgba(255,255,255,0.08); flex-shrink: 0; align-self: stretch; }
  @media (max-width: 580px) { .abs-ions-divider { display: none; } }

  /* ═══ IMPORTANT SALTS — 3-COL CARDS ═══ */
  .abs-salts-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px; }
  @media (max-width: 740px) { .abs-salts-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 500px) { .abs-salts-grid { grid-template-columns: 1fr; } }
  .abs-salt-card { border-radius: 8px; overflow: hidden; border: 1.5px solid var(--rule); }
  .abs-salt-card-hdr { padding: 16px 18px; }
  .abs-salt-card:nth-child(1) .abs-salt-card-hdr { background: linear-gradient(135deg, #031820, #053040); }
  .abs-salt-card:nth-child(2) .abs-salt-card-hdr { background: linear-gradient(135deg, #0a1200, #162000); }
  .abs-salt-card:nth-child(3) .abs-salt-card-hdr { background: linear-gradient(135deg, #0a0618, #140e28); }
  .abs-salt-formula { font-family: 'Courier New', Courier, monospace; font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 2px; }
  .abs-salt-formula sub { font-size: 0.72em; }
  .abs-salt-name { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.5); }
  .abs-salt-body { padding: 16px 18px; background: var(--white); }
  .abs-salt-prep-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  .abs-salt-uses { list-style: none; padding: 0; margin-top: 12px; }
  .abs-salt-uses li { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2); padding: 5px 0 5px 16px; border-bottom: 1px solid var(--rule); position: relative; line-height: 1.5; }
  .abs-salt-uses li:last-child { border-bottom: none; }
  .abs-salt-uses li::before { content: '▸'; position: absolute; left: 0; color: var(--accent); font-size: 10px; top: 7px; }

  /* ═══ NACL ELECTROLYSIS — FLOW BOX ═══ */
  .abs-electro-box {
    background: var(--eq-bg); border-radius: 8px; padding: 24px 28px; margin-bottom: 28px;
    border: 1px solid rgba(6,148,184,0.2);
  }
  .abs-electro-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(103,232,249,0.6); margin-bottom: 16px; }
  .abs-electro-center { text-align: center; margin-bottom: 16px; }
  .abs-electro-source { display: inline-block; background: rgba(6,148,184,0.15); border: 1px solid rgba(6,148,184,0.3); border-radius: 6px; padding: 10px 20px; }
  .abs-electro-source-formula { font-family: 'Courier New', Courier, monospace; font-size: 18px; font-weight: 700; color: #67e8f9; }
  .abs-electro-source-sub { font-size: 12px; font-family: 'Poppins', sans-serif; color: rgba(255,255,255,0.4); margin-top: 2px; }
  .abs-electro-arrow-down { text-align: center; font-size: 20px; color: rgba(255,255,255,0.3); margin: 6px 0; }
  .abs-electro-condition { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; color: #fdba74; background: rgba(253,186,116,0.1); padding: 4px 14px; border-radius: 100px; display: inline-block; margin-bottom: 10px; }
  .abs-electro-products { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  @media (max-width: 640px) { .abs-electro-products { grid-template-columns: 1fr; } }
  .abs-electro-product { border-radius: 6px; padding: 14px 14px; text-align: center; }
  .abs-electro-product:nth-child(1) { background: rgba(6,148,184,0.1); border: 1px solid rgba(6,148,184,0.2); }
  .abs-electro-product:nth-child(2) { background: rgba(196,43,26,0.1); border: 1px solid rgba(196,43,26,0.2); }
  .abs-electro-product:nth-child(3) { background: rgba(122,26,184,0.1); border: 1px solid rgba(122,26,184,0.2); }
  .abs-ep-formula { font-family: 'Courier New', Courier, monospace; font-size: 17px; font-weight: 700; margin-bottom: 4px; }
  .abs-ep-formula sub { font-size: 0.72em; }
  .abs-electro-product:nth-child(1) .abs-ep-formula { color: #67e8f9; }
  .abs-electro-product:nth-child(2) .abs-ep-formula { color: #fca5a5; }
  .abs-electro-product:nth-child(3) .abs-ep-formula { color: #c4b5fd; }
  .abs-ep-location { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
  .abs-ep-uses { font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.5); line-height: 1.6; }

  /* ═══ KEY TERMS GRID ═══ */
  .abs-terms-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 28px; }
  @media (max-width: 640px) { .abs-terms-grid { grid-template-columns: 1fr; } }
  .abs-term-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 6px; padding: 16px 18px; border-left: 4px solid var(--accent); }
  .abs-term-card:nth-child(2) { border-left-color: var(--amber); }
  .abs-term-card:nth-child(3) { border-left-color: var(--purple); }
  .abs-term-card:nth-child(4) { border-left-color: var(--green); }
  .abs-term-word { font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 900; color: var(--ink); margin-bottom: 6px; }
  .abs-term-def { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); line-height: 1.7; }
  .abs-term-def strong { color: var(--accent2); font-weight: 600; }
  .abs-term-ex { font-family: 'Courier New', Courier, monospace; font-size: 12px; color: var(--accent); background: var(--accent-lt); padding: 3px 8px; border-radius: 4px; display: inline-block; margin-top: 6px; }
  .abs-term-ex sub { font-size: 0.72em; }

  /* ═══ PULL QUOTE ═══ */
  .abs-pull-quote { border-left: 5px solid var(--accent); background: var(--accent-lt); padding: 22px 30px; margin: 28px 0; border-radius: 0 4px 4px 0; }
  .abs-pull-quote p { font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 600; color: var(--accent2); line-height: 1.7; font-style: italic; margin: 0; }

  /* ═══ FAQ ═══ */
  .abs-faq-header { margin-bottom: 12px; }
  .abs-faq-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); background: var(--accent-lt); padding: 6px 16px; border-radius: 100px; }
  .abs-faq-title { font-family: 'Montserrat', sans-serif; font-size: clamp(26px, 4vw, 36px); font-weight: 900; color: var(--ink); letter-spacing: -0.02em; margin-bottom: 28px; margin-top: 16px; }
  .abs-faq-item { border: 1.5px solid var(--rule); border-radius: 6px; margin-bottom: 12px; overflow: hidden; background: var(--white); transition: border-color 0.2s; }
  .abs-faq-item.open { border-color: var(--accent); }
  .abs-faq-q { width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; text-align: left; gap: 16px; }
  .abs-faq-q-text { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600; color: var(--ink); line-height: 1.5; }
  .abs-faq-item.open .abs-faq-q-text { color: var(--accent); }
  .abs-faq-icon { font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 700; color: var(--accent); flex-shrink: 0; transition: transform 0.2s; }
  .abs-faq-item.open .abs-faq-icon { transform: rotate(45deg); }
  .abs-faq-ans { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: var(--ink2); line-height: 1.85; padding: 0 24px; max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; }
  .abs-faq-ans.visible { max-height: 800px; padding: 0 24px 22px; }
  .abs-faq-ans strong { color: var(--accent2); font-weight: 600; }
  .abs-faq-ans code { font-family: 'Courier New', Courier, monospace; font-size: 13px; background: var(--accent-lt); padding: 1px 6px; border-radius: 3px; color: var(--accent2); }

  @media (max-width: 700px) {
    .abs-body { padding: 48px 20px 72px; }
    .abs-hero-inner { padding: 0 20px; }
    .abs-intro-card { padding: 24px 22px; }
    .abs-electro-box { padding: 18px 18px; }
  }
`;

const faqs = [
  {
    q: "What is an acid? What is a base? How are they identified using litmus?",
    a: (<><strong>Acid:</strong> A substance that turns <strong>blue litmus paper red</strong>. In water, acids dissociate to release <strong>H⁺ ions (hydrogen ions)</strong>, which combine with water to form H₃O⁺ (hydronium ions).<br /><br />
      <strong>Base:</strong> A substance that turns <strong>red litmus paper blue</strong>. In water, bases dissociate to release <strong>OH⁻ ions (hydroxide ions)</strong>.<br /><br />
      <strong>Alkalis</strong> are bases that are soluble in water. Examples: KOH (potassium hydroxide), Mg(OH)₂ (magnesium hydroxide).<br /><br />
      <strong>Turmeric</strong> is a natural indicator — it turns red/brown in basic solutions.</>),
  },
  {
    q: "What happens when an acid reacts with a metal? Give an example.",
    a: (<>When an acid reacts with a metal, the <strong>metal displaces hydrogen</strong> from the acid, forming a salt and releasing hydrogen gas.<br /><br />
      General equation: <code>Metal + Acid → Salt + H₂</code><br /><br />
      Example: <code>Zn + H₂SO₄ → ZnSO₄ + H₂</code><br />
      Zinc + Sulphuric acid → Zinc sulphate + Hydrogen gas<br /><br />
      The <strong>hydrogen gas evolved can be tested</strong> with a burning matchstick — it burns with a pop sound.</>),
  },
  {
    q: "What happens when a metal oxide reacts with an acid?",
    a: (<>Metal oxides are <strong>basic in nature</strong>. When they react with an acid, they undergo a neutralisation reaction:<br /><br />
      <code>Metal oxide + Acid → Salt + Water</code><br /><br />
      Example: <code>CuO + H₂SO₄ → CuSO₄ + H₂O</code><br />
      Copper oxide + Sulphuric acid → Copper sulphate + Water<br /><br />
      This is because metal oxides react with acids just like a base reacts with an acid.</>),
  },
  {
    q: "What happens when a base reacts with a metal? Give an example.",
    a: (<>Certain metals react with strong bases to produce a salt and hydrogen gas.<br /><br />
      Example: <code>2NaOH + Zn → Na₂ZnO₂ + H₂</code><br />
      Sodium hydroxide + Zinc → Sodium zincate + Hydrogen gas<br /><br />
      Note: Not all metals react with bases — only some metals like zinc and aluminium undergo this reaction.</>),
  },
  {
    q: "What happens when an acid reacts with a metal carbonate or hydrogen carbonate?",
    a: (<><code>Carbonate/Bicarbonate + Acid → Salt + Water + CO₂</code><br /><br />
      Example: <code>Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂</code><br /><br />
      The <strong>CO₂ gas evolved</strong> turns lime water milky:<br />
      <code>Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O</code><br /><br />
      This milky white precipitate of <strong>calcium carbonate (CaCO₃)</strong> is the test for CO₂.</>),
  },
  {
    q: "What is neutralisation? Write the reaction of acid and base.",
    a: (<>When an acid reacts with a base, they neutralise each other to form <strong>salt and water</strong> only. This is called a <strong>neutralisation reaction</strong>.<br /><br />
      <code>Acid + Base → Salt + Water</code><br /><br />
      Example: <code>NaOH + HCl → NaCl + H₂O</code><br />
      Sodium hydroxide + Hydrochloric acid → Common salt + Water<br /><br />
      In water: Acids produce H⁺ ions; Bases produce OH⁻ ions. They combine to form water: H⁺ + OH⁻ → H₂O</>),
  },
  {
    q: "What is pH? What does it measure? What are the ranges?",
    a: (<><strong>pH</strong> is the measure of the <strong>concentration of H⁺ ions</strong> in a solution. It is measured on a scale of <strong>0 to 14</strong>.<br /><br />
      • <strong>pH &lt; 7</strong> → Acidic solution (higher H⁺ concentration)<br />
      • <strong>pH = 7</strong> → Neutral solution<br />
      • <strong>pH &gt; 7</strong> → Basic/Alkaline solution (higher OH⁻ concentration)<br /><br />
      Strong acid → very low pH (near 0)<br />
      Weak acid → pH slightly below 7<br />
      Strong base → very high pH (near 14)<br /><br />
      Human body pH = <strong>7.0 – 7.8</strong>; Salts have pH = 7</>),
  },
  {
    q: "How does pH change affect the human body and living organisms?",
    a: (<>Living organisms are sensitive to pH changes:
      <br /><br />
      • <strong>Tooth decay:</strong> Bacteria in the mouth produce acids that lower pH below 5.5, causing tooth enamel to dissolve.
      <br />• <strong>Stomach pain:</strong> Excess acid (low pH) in the stomach causes acidity/pain. Antacids (mild bases like NaHCO₃) neutralise the acid.
      <br />• <strong>Honey bee sting:</strong> Bee venom is acidic — causes burning pain. Applying baking soda (a base) neutralises it.
      <br />• <strong>Plants:</strong> Different plants need specific soil pH to grow. pH of soil affects nutrient availability.
      <br />• <strong>Chemical warfare:</strong> Animals and plants use chemical secretions (acids/bases) for self-defence.</>),
  },
  {
    q: "What is bleaching powder? How is it prepared and what are its uses?",
    a: (<><strong>Bleaching powder</strong> is calcium oxychloride — chemical formula <code>CaOCl₂</code>.<br /><br />
      <strong>Preparation:</strong><br />
      <code>Ca(OH)₂ + Cl₂ → CaOCl₂ + H₂O</code><br />
      Slaked lime reacts with chlorine gas to form bleaching powder.<br /><br />
      <strong>Uses:</strong><br />
      • Bleaching of cotton in textile industry<br />
      • Bleaching of wood pulp<br />
      • Bleaching clothes in laundry<br />
      • As an <strong>oxidising agent</strong><br />
      • As a <strong>disinfecting material</strong></>),
  },
  {
    q: "What is baking soda? What is washing soda? How are they prepared and used?",
    a: (<><strong>Baking soda</strong> = NaHCO₃ (Sodium hydrogen carbonate)<br />
      <strong>Preparation:</strong> <code>NaCl + H₂O + CO₂ + NH₃ → NH₄Cl + NaHCO₃</code><br />
      <strong>Uses:</strong> Making baking powder (with tartaric acid), ingredient in antacids, soda-acid fire extinguisher.<br /><br />
      <strong>Washing soda</strong> = Na₂CO₃·10H₂O (Sodium carbonate decahydrate)<br />
      <strong>Preparation:</strong> <code>Na₂CO₃ + 10H₂O → Na₂CO₃·10H₂O</code><br />
      <strong>Uses:</strong> Glass, soap, paper industries; making sodium compounds like borax; domestic cleaning agent; <strong>removing permanent hardness of water</strong>.</>),
  },
  {
    q: "What is water of crystallisation? What are hydrated and anhydrous substances?",
    a: (<><strong>Water of crystallisation</strong> refers to a <strong>fixed number of water molecules</strong> present in one formula unit of a salt.<br />
      Example: Gypsum = CaSO₄·2H₂O (water of crystallisation = 2)<br /><br />
      <strong>Hydrated substances:</strong> Substances containing water of crystallisation.<br />
      Example: <code>CuSO₄·5H₂O</code> (Blue vitriol — blue coloured)<br /><br />
      <strong>Anhydrous substances:</strong> Substances without water of crystallisation.<br />
      Example: <code>CuSO₄</code> (white), <code>NaCl</code><br /><br />
      <strong>Drying agents:</strong> Absorb moisture without chemical reaction — e.g., anhydrous CaCl₂<br />
      <strong>Dehydrating agents:</strong> Remove chemically bonded water — e.g., concentrated H₂SO₄</>),
  },
];

export default function AcidsBasesAndSalts() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="abs-root">

        {/* HERO */}
        <div className="abs-hero">
          <div className="abs-hero-hex" />
          <div className="abs-glow-a" />
          <div className="abs-glow-b" />
          <div className="abs-hero-ph">pH</div>
          <div className="abs-hero-bg-num">02</div>
          <div className="abs-hero-inner">
            <div className="abs-overline">Science · Class 10 · Chemistry · Chapter 2</div>
            <h1 className="abs-hero-title">
              <span className="em1">Acids,</span><br />
              <span className="em2">Bases</span><br />
              &amp; <span className="em3">Salts</span>
            </h1>
            <div className="abs-hero-bar">
              {[
                { label: "Subject",  value: "Chemistry" },
                { label: "Class",   value: "10th Standard" },
                { label: "Chapter", value: "Chapter 2" },
                { label: "Board",   value: "CBSE / NCERT" },
              ].map((x) => (
                <div className="abs-hero-bar-item" key={x.label}>
                  <div className="abs-bar-label">{x.label}</div>
                  <div className="abs-bar-value">{x.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="abs-body">

          {/* Intro */}
          <div className="abs-intro-card">
            <p>Acids make lemons sour and corrode metals. Bases make soap slippery and neutralise acids. Between them lies the <strong>pH scale</strong> — one of chemistry's most powerful tools for understanding the world around us.</p>
            <p>From the sting of a bee to the rust on iron, from baking bread to bleaching clothes — <strong>acids, bases, and salts are chemistry in everyday life</strong>.</p>
          </div>

          {/* S1: Acid vs Base */}
          <div className="abs-sec-head">
            <div className="abs-sec-num">1</div>
            <div className="abs-sec-title-wrap">
              <div className="abs-sec-kicker">Fundamentals</div>
              <h2 className="abs-sec-title">Acids vs <span>Bases</span> — The Core Difference</h2>
            </div>
          </div>
          <p className="abs-body-text">The most fundamental distinction in this chapter: acids release <strong>H⁺ ions</strong> in water; bases release <strong>OH⁻ ions</strong>. They can be identified using indicators like <strong>litmus</strong> or <strong>turmeric</strong>.</p>

          <div className="abs-ab-split">
            <div className="abs-ab-col acid">
              <span className="abs-ab-badge">Acid</span>
              <div className="abs-ab-heading">H⁺</div>
              <div className="abs-ab-litmus">🔴 Turns blue litmus RED</div>
              <ul>
                <li>Releases <strong>H⁺ ions</strong> in water</li>
                <li>H⁺ + H₂O → <strong>H₃O⁺</strong> (Hydronium ion)</li>
                <li><strong>pH &lt; 7</strong> — acidic solution</li>
                <li>Higher H⁺ = <strong>stronger acid</strong></li>
                <li>Examples: HCl, H₂SO₄, HNO₃, CH₃COOH</li>
                <li>Tastes sour (citric acid in lemon)</li>
              </ul>
            </div>
            <div className="abs-ab-col base">
              <span className="abs-ab-badge">Base / Alkali</span>
              <div className="abs-ab-heading">OH⁻</div>
              <div className="abs-ab-litmus">🔵 Turns red litmus BLUE</div>
              <ul>
                <li>Releases <strong>OH⁻ ions</strong> in water</li>
                <li>Bases soluble in water = <strong>Alkalis</strong></li>
                <li><strong>pH &gt; 7</strong> — basic solution</li>
                <li>Higher OH⁻ = <strong>stronger base</strong></li>
                <li>Examples: NaOH, KOH, Ca(OH)₂, Mg(OH)₂</li>
                <li>Feels soapy/slippery to touch</li>
              </ul>
            </div>
          </div>

          {/* Ions in water */}
          <div className="abs-ions-banner">
            <div className="abs-ions-label">🔬 Behaviour in Water Solution</div>
            <div className="abs-ions-row">
              <div className="abs-ions-item acid-ion">
                <span className="abs-ions-tag">Acid in Water</span>
                <code className="abs-ions-eq">HCl + H₂O → H₃O⁺ + Cl⁻</code>
                <code className="abs-ions-eq">NaOH →<sup>H₂O</sup> Na⁺ + OH⁻</code>
                <div className="abs-ions-note">Acid ionises → releases H⁺ which combines with H₂O to form H₃O⁺ (hydronium)</div>
              </div>
              <div className="abs-ions-divider" />
              <div className="abs-ions-item base-ion">
                <span className="abs-ions-tag">Base in Water</span>
                <code className="abs-ions-eq">NaOH → Na⁺ + OH⁻</code>
                <div className="abs-ions-note">Base ionises → releases OH⁻ ions into solution. Neutralisation: H⁺ + OH⁻ → H₂O</div>
              </div>
            </div>
          </div>

          {/* S2: Reactions */}
          <div className="abs-divider"><div className="abs-divider-mark" /></div>
          <div className="abs-sec-head">
            <div className="abs-sec-num">2</div>
            <div className="abs-sec-title-wrap">
              <div className="abs-sec-kicker">Chemical Reactions</div>
              <h2 className="abs-sec-title">Reactions of <span>Acids &amp; Bases</span></h2>
            </div>
          </div>

          {/* Acid + Metal */}
          <div className="abs-rxn-section">
            <div className="abs-rxn-section-hdr cyan">
              <span className="abs-rxn-icon">⚙️</span>
              <div className="abs-rxn-hdr-meta">
                <div className="abs-rxn-hdr-tag">Reaction Type</div>
                <div className="abs-rxn-hdr-name">Acid + Metal</div>
              </div>
              <span className="abs-rxn-gen">Metal + Acid → Salt + H₂↑</span>
            </div>
            <div className="abs-rxn-body">
              <p className="abs-body-text" style={{marginBottom:"12px"}}>Metals <strong>displace hydrogen from acids</strong>, forming a salt and releasing hydrogen gas.</p>
              <div className="abs-eq-box">
                <span className="abs-ef">Zn</span><span className="abs-plus">+</span>
                <span className="abs-ef">H<sub>2</sub>SO<sub>4</sub></span>
                <span className="abs-arr">→</span>
                <span className="abs-ef">ZnSO<sub>4</sub></span><span className="abs-plus">+</span>
                <span className="abs-ef">H<sub>2</sub>↑</span>
                <span className="abs-note">Zinc + Sulphuric acid → Zinc sulphate + Hydrogen gas</span>
              </div>
            </div>
          </div>

          {/* Metal Oxide + Acid */}
          <div className="abs-rxn-section">
            <div className="abs-rxn-section-hdr amber">
              <span className="abs-rxn-icon">🔶</span>
              <div className="abs-rxn-hdr-meta">
                <div className="abs-rxn-hdr-tag">Reaction Type</div>
                <div className="abs-rxn-hdr-name">Metal Oxide + Acid</div>
              </div>
              <span className="abs-rxn-gen">Metal Oxide + Acid → Salt + Water</span>
            </div>
            <div className="abs-rxn-body">
              <p className="abs-body-text" style={{marginBottom:"12px"}}><strong>Metal oxides are basic</strong>. They react with acids like a base reacts — producing salt and water.</p>
              <div className="abs-eq-box">
                <span className="abs-ef">CuO</span><span className="abs-plus">+</span>
                <span className="abs-ef">H<sub>2</sub>SO<sub>4</sub></span>
                <span className="abs-arr">→</span>
                <span className="abs-ef">CuSO<sub>4</sub></span><span className="abs-plus">+</span>
                <span className="abs-ef">H<sub>2</sub>O</span>
                <span className="abs-note">Copper oxide + Sulphuric acid → Copper sulphate + Water</span>
              </div>
            </div>
          </div>

          {/* Base + Metal */}
          <div className="abs-rxn-section">
            <div className="abs-rxn-section-hdr purple">
              <span className="abs-rxn-icon">⚗️</span>
              <div className="abs-rxn-hdr-meta">
                <div className="abs-rxn-hdr-tag">Reaction Type</div>
                <div className="abs-rxn-hdr-name">Base + Metal</div>
              </div>
              <span className="abs-rxn-gen">Base + Metal → Salt + H₂↑</span>
            </div>
            <div className="abs-rxn-body">
              <p className="abs-body-text" style={{marginBottom:"12px"}}>Certain metals (like Zn, Al) react with strong bases to form a salt and hydrogen gas.</p>
              <div className="abs-eq-box">
                <span className="abs-ef">2NaOH</span><span className="abs-plus">+</span>
                <span className="abs-ef">Zn</span>
                <span className="abs-arr">→</span>
                <span className="abs-ef">Na<sub>2</sub>ZnO<sub>2</sub></span><span className="abs-plus">+</span>
                <span className="abs-ef">H<sub>2</sub>↑</span>
                <span className="abs-note">Sodium zincate + Hydrogen gas</span>
              </div>
            </div>
          </div>

          {/* Acid + Carbonate */}
          <div className="abs-rxn-section">
            <div className="abs-rxn-section-hdr red">
              <span className="abs-rxn-icon">🫧</span>
              <div className="abs-rxn-hdr-meta">
                <div className="abs-rxn-hdr-tag">Reaction Type</div>
                <div className="abs-rxn-hdr-name">Acid + Metal Carbonate / Hydrogen Carbonate</div>
              </div>
              <span className="abs-rxn-gen">Carbonate + Acid → Salt + H₂O + CO₂↑</span>
            </div>
            <div className="abs-rxn-body">
              <p className="abs-body-text" style={{marginBottom:"12px"}}>CO₂ gas is evolved, which turns <strong>lime water milky</strong> — this is the test for CO₂.</p>
              <div className="abs-eq-box">
                <span className="abs-ef">Na<sub>2</sub>CO<sub>3</sub></span><span className="abs-plus">+</span>
                <span className="abs-ef">2HCl</span>
                <span className="abs-arr">→</span>
                <span className="abs-ef">2NaCl</span><span className="abs-plus">+</span>
                <span className="abs-ef">H<sub>2</sub>O</span><span className="abs-plus">+</span>
                <span className="abs-ef">CO<sub>2</sub>↑</span>
              </div>
              <div className="abs-eq-box" style={{marginTop:"8px"}}>
                <span className="abs-ef">Ca(OH)<sub>2</sub></span><span className="abs-plus">+</span>
                <span className="abs-ef">CO<sub>2</sub></span>
                <span className="abs-arr">→</span>
                <span className="abs-ef">CaCO<sub>3</sub>↓</span><span className="abs-plus">+</span>
                <span className="abs-ef">H<sub>2</sub>O</span>
                <span className="abs-note">Lime water turns milky — test for CO₂</span>
              </div>
            </div>
          </div>

          {/* Acid + Base — Neutralisation */}
          <div className="abs-rxn-section">
            <div className="abs-rxn-section-hdr green">
              <span className="abs-rxn-icon">⚖️</span>
              <div className="abs-rxn-hdr-meta">
                <div className="abs-rxn-hdr-tag">Special Reaction</div>
                <div className="abs-rxn-hdr-name">Acid + Base — Neutralisation</div>
              </div>
              <span className="abs-rxn-gen">Acid + Base → Salt + Water</span>
            </div>
            <div className="abs-rxn-body">
              <p className="abs-body-text" style={{marginBottom:"12px"}}>Acid and base neutralise each other completely. H⁺ + OH⁻ → H₂O. This is called a <strong>neutralisation reaction</strong>.</p>
              <div className="abs-eq-box">
                <span className="abs-ef">NaOH</span><span className="abs-plus">+</span>
                <span className="abs-ef">HCl</span>
                <span className="abs-arr">→</span>
                <span className="abs-ef">NaCl</span><span className="abs-plus">+</span>
                <span className="abs-ef">H<sub>2</sub>O</span>
                <span className="abs-note">Sodium hydroxide + HCl → Common salt + Water</span>
              </div>
            </div>
          </div>

          {/* S3: pH Scale */}
          <div className="abs-divider"><div className="abs-divider-mark" /></div>
          <div className="abs-sec-head">
            <div className="abs-sec-num">3</div>
            <div className="abs-sec-title-wrap">
              <div className="abs-sec-kicker">Measurement</div>
              <h2 className="abs-sec-title">The <span>pH Scale</span></h2>
            </div>
          </div>
          <p className="abs-body-text">pH measures the <strong>concentration of H⁺ ions</strong> in a solution on a scale of <strong>0 to 14</strong>. The lower the pH, the more acidic; the higher the pH, the more basic.</p>

          <div className="abs-ph-scale">
            <div className="abs-ph-scale-title">pH Scale — 0 to 14</div>
            <div className="abs-ph-bar" />
            <div className="abs-ph-nums">
              {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(n => (
                <div className="abs-ph-num" key={n}>{n}</div>
              ))}
            </div>
            <div className="abs-ph-labels">
              <div className="abs-ph-label acid">
                <div className="abs-ph-label-range">pH 0–6</div>
                <div className="abs-ph-label-text">Acidic</div>
              </div>
              <div className="abs-ph-label neutral">
                <div className="abs-ph-label-range">pH 7</div>
                <div className="abs-ph-label-text">Neutral</div>
              </div>
              <div className="abs-ph-label base">
                <div className="abs-ph-label-range">pH 8–14</div>
                <div className="abs-ph-label-text">Basic / Alkaline</div>
              </div>
            </div>
          </div>

          <div className="abs-ph-facts">
            {[
              { num:"7.0–7.8", label:"Human Body pH" },
              { num:"7",       label:"Neutral Salt pH" },
              { num:"5.5",     label:"pH below which tooth decay begins" },
              { num:"< 7",     label:"Acidic — higher H⁺ concentration" },
              { num:"= 7",     label:"Neutral solution" },
              { num:"> 7",     label:"Basic — higher OH⁻ concentration" },
            ].map((f) => (
              <div className="abs-ph-fact" key={f.num}>
                <div className="abs-ph-fact-num">{f.num}</div>
                <div className="abs-ph-fact-label">{f.label}</div>
              </div>
            ))}
          </div>

          <div className="abs-pull-quote">
            <p>"Plants and animals are sensitive to pH change. Even a small change in body or soil pH can cause disease, decay, or chemical self-defence reactions."</p>
          </div>

          {/* S4: Important Salts */}
          <div className="abs-divider"><div className="abs-divider-mark" /></div>
          <div className="abs-sec-head">
            <div className="abs-sec-num">4</div>
            <div className="abs-sec-title-wrap">
              <div className="abs-sec-kicker">Key Compounds</div>
              <h2 className="abs-sec-title">Important <span>Salts</span> — Preparation &amp; Uses</h2>
            </div>
          </div>
          <p className="abs-body-text">Three salts you must know thoroughly for the exam — their chemical formulae, how they are made, and what they are used for.</p>

          <div className="abs-salts-grid">
            {/* Bleaching Powder */}
            <div className="abs-salt-card">
              <div className="abs-salt-card-hdr">
                <div className="abs-salt-formula">CaOCl<sub>2</sub></div>
                <div className="abs-salt-name">Bleaching Powder</div>
              </div>
              <div className="abs-salt-body">
                <div className="abs-salt-prep-label">Preparation</div>
                <div className="abs-eq-box" style={{background:"var(--paper2)", border:"1px solid var(--rule)"}}>
                  <span style={{fontFamily:"'Courier New',monospace",fontSize:"13px",fontWeight:700,color:"var(--accent2)"}}>Ca(OH)<sub>2</sub></span>
                  <span style={{color:"var(--ink)",margin:"0 4px"}}>+</span>
                  <span style={{fontFamily:"'Courier New',monospace",fontSize:"13px",fontWeight:700,color:"var(--accent2)"}}>Cl<sub>2</sub></span>
                  <span style={{color:"var(--orange)",margin:"0 6px",fontWeight:700}}>→</span>
                  <span style={{fontFamily:"'Courier New',monospace",fontSize:"13px",fontWeight:700,color:"var(--accent2)"}}>CaOCl<sub>2</sub></span>
                  <span style={{color:"var(--ink)",margin:"0 4px"}}>+</span>
                  <span style={{fontFamily:"'Courier New',monospace",fontSize:"13px",fontWeight:700,color:"var(--accent2)"}}>H<sub>2</sub>O</span>
                </div>
                <ul className="abs-salt-uses">
                  <li>Bleaching cotton &amp; wood pulp</li>
                  <li>Bleaching clothes (laundry)</li>
                  <li>Oxidising agent</li>
                  <li>Disinfecting material</li>
                </ul>
              </div>
            </div>

            {/* Baking Soda */}
            <div className="abs-salt-card">
              <div className="abs-salt-card-hdr">
                <div className="abs-salt-formula">NaHCO<sub>3</sub></div>
                <div className="abs-salt-name">Baking Soda</div>
              </div>
              <div className="abs-salt-body">
                <div className="abs-salt-prep-label">Preparation</div>
                <div style={{fontFamily:"'Courier New',monospace",fontSize:"12px",color:"var(--accent2)",background:"var(--paper2)",border:"1px solid var(--rule)",borderRadius:"4px",padding:"8px 10px",marginBottom:"8px",lineHeight:"1.6"}}>
                  NaCl + H<sub>2</sub>O + CO<sub>2</sub> + NH<sub>3</sub><br/>→ NH<sub>4</sub>Cl + NaHCO<sub>3</sub>
                </div>
                <ul className="abs-salt-uses">
                  <li>Making baking powder (+ tartaric acid)</li>
                  <li>Ingredient in antacids</li>
                  <li>Soda-acid fire extinguisher</li>
                </ul>
              </div>
            </div>

            {/* Washing Soda */}
            <div className="abs-salt-card">
              <div className="abs-salt-card-hdr">
                <div className="abs-salt-formula">Na<sub>2</sub>CO<sub>3</sub>·10H<sub>2</sub>O</div>
                <div className="abs-salt-name">Washing Soda</div>
              </div>
              <div className="abs-salt-body">
                <div className="abs-salt-prep-label">Preparation</div>
                <div style={{fontFamily:"'Courier New',monospace",fontSize:"12px",color:"var(--accent2)",background:"var(--paper2)",border:"1px solid var(--rule)",borderRadius:"4px",padding:"8px 10px",marginBottom:"8px",lineHeight:"1.6"}}>
                  Na<sub>2</sub>CO<sub>3</sub> + 10H<sub>2</sub>O<br/>→ Na<sub>2</sub>CO<sub>3</sub>·10H<sub>2</sub>O
                </div>
                <ul className="abs-salt-uses">
                  <li>Glass, soap, paper industries</li>
                  <li>Making borax &amp; sodium compounds</li>
                  <li>Domestic cleaning agent</li>
                  <li>Removing permanent water hardness</li>
                </ul>
              </div>
            </div>
          </div>

          {/* S5: NaCl Electrolysis */}
          <div className="abs-divider"><div className="abs-divider-mark" /></div>
          <div className="abs-sec-head">
            <div className="abs-sec-num">5</div>
            <div className="abs-sec-title-wrap">
              <div className="abs-sec-kicker">Common Salt</div>
              <h2 className="abs-sec-title">Electrolysis of <span>NaCl</span> (Brine)</h2>
            </div>
          </div>
          <p className="abs-body-text">When an electric current is passed through an aqueous solution of common salt (NaCl — brine), it decomposes to give three important industrial products.</p>

          <div className="abs-electro-box">
            <div className="abs-electro-label">⚡ Electrolysis of Brine (NaCl solution)</div>
            <div className="abs-electro-center">
              <div className="abs-electro-source">
                <div className="abs-electro-source-formula">NaCl + H₂O</div>
                <div className="abs-electro-source-sub">Brine solution</div>
              </div>
            </div>
            <div className="abs-electro-arrow-down">↓</div>
            <div style={{textAlign:"center",marginBottom:"14px"}}>
              <span className="abs-electro-condition">Electric Current</span>
            </div>
            <div className="abs-electro-products">
              <div className="abs-electro-product">
                <div className="abs-ep-formula">H<sub>2</sub></div>
                <div className="abs-ep-location">Cathode</div>
                <div className="abs-ep-uses">Fuel, margarine production → combines with Cl₂ to form HCl</div>
              </div>
              <div className="abs-electro-product">
                <div className="abs-ep-formula">Cl<sub>2</sub></div>
                <div className="abs-ep-location">Anode</div>
                <div className="abs-ep-uses">Water treatment, swimming pools, PVC, disinfectants, CFC</div>
              </div>
              <div className="abs-electro-product">
                <div className="abs-ep-formula">NaOH</div>
                <div className="abs-ep-location">Solution</div>
                <div className="abs-ep-uses">De-greasing, soaps &amp; detergents, making bleach</div>
              </div>
            </div>
          </div>

          {/* S6: Water of Crystallisation & Key Terms */}
          <div className="abs-divider"><div className="abs-divider-mark" /></div>
          <div className="abs-sec-head">
            <div className="abs-sec-num">6</div>
            <div className="abs-sec-title-wrap">
              <div className="abs-sec-kicker">Definitions</div>
              <h2 className="abs-sec-title">Water of Crystallisation &amp; <span>Key Terms</span></h2>
            </div>
          </div>
          <p className="abs-body-text"><strong>Water of crystallisation</strong> is a fixed number of water molecules present in one formula unit of a crystalline salt. Example: Gypsum = CaSO₄·2H₂O (2 water molecules per formula unit).</p>

          <div className="abs-terms-grid">
            {[
              { word:"Hydrated Substance",    def:<>Contains <strong>water of crystallisation</strong> in its structure. Usually coloured.</>, ex:"CuSO₄·5H₂O (Blue vitriol — blue)" },
              { word:"Anhydrous Substance",   def:<>Does <strong>not contain</strong> water of crystallisation, or water has been removed. Usually white/colourless.</>, ex:"CuSO₄ (white), NaCl" },
              { word:"Drying Agent",          def:<>Absorbs moisture <strong>without undergoing a chemical reaction</strong>. Used to dry substances.</>, ex:"Anhydrous CaCl₂" },
              { word:"Dehydrating Agent",     def:<>Removes <strong>chemically bonded water</strong> from a compound through a chemical reaction.</>, ex:"Conc. H₂SO₄" },
            ].map((t) => (
              <div className="abs-term-card" key={t.word}>
                <div className="abs-term-word">{t.word}</div>
                <div className="abs-term-def">{t.def}</div>
                <code className="abs-term-ex">{t.ex}</code>
              </div>
            ))}
          </div>

          {/* Gypsum equation */}
          <div className="abs-eq-box">
            <span style={{fontFamily:"'Courier New',monospace",fontSize:"14px",fontWeight:700,color:"#67e8f9"}}>CaSO<sub>4</sub>·½H<sub>2</sub>O</span>
            <span className="abs-plus">+</span>
            <span style={{fontFamily:"'Courier New',monospace",fontSize:"14px",fontWeight:700,color:"#67e8f9"}}>1½H<sub>2</sub>O</span>
            <span className="abs-arr">→</span>
            <span style={{fontFamily:"'Courier New',monospace",fontSize:"14px",fontWeight:700,color:"#67e8f9"}}>CaSO<sub>4</sub>·2H<sub>2</sub>O</span>
            <span className="abs-note">Plaster of Paris → Gypsum (solid)</span>
          </div>

          {/* FAQ */}
          <div className="abs-divider"><div className="abs-divider-mark" /></div>
          <div className="abs-faq-header"><span className="abs-faq-kicker">Exam Preparation</span></div>
          <h2 className="abs-faq-title">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div className={`abs-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="abs-faq-q" onClick={() => toggle(i)}>
                <span className="abs-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="abs-faq-icon">+</span>
              </button>
              <div className={`abs-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
