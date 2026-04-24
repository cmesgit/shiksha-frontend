import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #130a00;
    --ink2:       #241400;
    --muted:      #6b4a20;
    --paper:      #fdf8f0;
    --paper2:     #f5ead8;
    --accent:     #b85c00;
    --accent2:    #8a4000;
    --accent-lt:  #fde8cc;
    --silver:     #5a6a7a;
    --silver-lt:  #e8eef5;
    --blue:       #1444a8;
    --blue-lt:    #dce8ff;
    --red:        #b81a10;
    --red-lt:     #fde8e5;
    --green:      #0a6a30;
    --green-lt:   #d8f0e4;
    --purple:     #6a18a8;
    --purple-lt:  #eedcff;
    --rule:       #ddc8a8;
    --white:      #ffffff;
    --eq-bg:      #100800;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .mnm-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  /* ═══ HERO — deep bronze/copper ═══ */
  .mnm-hero {
    background: linear-gradient(135deg, #080400 0%, #180c00 50%, #241200 100%);
    min-height: 88vh; display: flex; align-items: flex-end;
    position: relative; overflow: hidden; padding: 0 0 64px;
  }
  .mnm-hero::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #b85c00 0%, #e8c060 30%, #c0c0c0 60%, #1444a8 100%);
  }
  .mnm-hero-bg-num {
    position: absolute; bottom: -60px; right: -30px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(220px, 36vw, 500px); font-weight: 900;
    line-height: 1; color: rgba(255,255,255,0.018);
    letter-spacing: -0.04em; user-select: none; pointer-events: none;
  }
  /* Periodic table grid watermark */
  .mnm-hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(184,92,0,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(184,92,0,0.06) 1px, transparent 1px);
    background-size: 52px 52px; pointer-events: none;
  }
  /* Metal sheen accent top-right */
  .mnm-hero-sheen {
    position: absolute; top: -20%; right: -5%;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,192,96,0.08) 0%, transparent 65%);
    pointer-events: none;
  }
  .mnm-glow {
    position: absolute; bottom: 15%; left: 6%; width: 260px; height: 260px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(184,92,0,0.14) 0%, transparent 70%);
    pointer-events: none;
  }
  .mnm-hero-inner { max-width: 900px; width: 100%; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
  .mnm-overline {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; color: #e8c060;
    margin-bottom: 24px; display: flex; align-items: center; gap: 14px;
  }
  .mnm-overline::before, .mnm-overline::after { content: ''; flex: 0 0 40px; height: 1px; background: #e8c060; }
  .mnm-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(38px, 8vw, 80px); font-weight: 900; color: #fff;
    line-height: 1; letter-spacing: -0.03em; margin-bottom: 32px;
  }
  .mnm-hero-title .em1 { color: #e8c060; font-style: normal; }
  .mnm-hero-title .em2 { color: #a0b8d0; font-style: normal; }
  .mnm-hero-title .em3 { color: rgba(255,255,255,0.5); font-style: normal; }
  .mnm-hero-bar { display: flex; flex-wrap: wrap; gap: 0; border-top: 1px solid rgba(255,255,255,0.12); padding-top: 24px; margin-top: 8px; }
  .mnm-hero-bar-item { flex: 1 1 130px; padding: 0 18px 0 0; border-right: 1px solid rgba(255,255,255,0.1); margin-right: 18px; }
  .mnm-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .mnm-bar-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 5px; }
  .mnm-bar-value { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.75); }

  /* ═══ BODY ═══ */
  .mnm-body { max-width: 860px; margin: 0 auto; padding: 72px 32px 96px; }

  /* ═══ INTRO CARD ═══ */
  .mnm-intro-card {
    background: linear-gradient(135deg, #080400 0%, #241200 100%);
    border-left: 5px solid #b85c00; border-radius: 4px; padding: 36px 40px;
    margin-bottom: 64px; position: relative; overflow: hidden;
  }
  .mnm-intro-card::after { content: '⚙️'; position: absolute; right: 28px; top: 50%; transform: translateY(-50%); font-size: 80px; opacity: 0.1; }
  .mnm-intro-card p { font-family: 'Poppins', sans-serif; font-size: 18px; font-weight: 500; color: rgba(255,255,255,0.88); line-height: 1.78; margin: 0 0 14px; }
  .mnm-intro-card p:last-child { margin: 0; }
  .mnm-intro-card strong { color: #e8c060; }

  /* ═══ SEC HEADER ═══ */
  .mnm-sec-head { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 32px; border-bottom: 2px solid var(--rule); padding-bottom: 18px; }
  .mnm-sec-num { font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900; color: var(--rule); line-height: 1; flex-shrink: 0; }
  .mnm-sec-title-wrap { padding-top: 8px; }
  .mnm-sec-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .mnm-sec-title { font-family: 'Montserrat', sans-serif; font-size: clamp(22px, 3.5vw, 30px); font-weight: 800; color: var(--ink); line-height: 1.15; letter-spacing: -0.02em; }
  .mnm-sec-title span { color: var(--accent); }

  /* ═══ BODY TEXT ═══ */
  .mnm-body-text { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; color: var(--ink2); line-height: 1.85; margin-bottom: 28px; }
  .mnm-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ═══ DIVIDER ═══ */
  .mnm-divider { margin: 56px 0; display: flex; align-items: center; gap: 16px; }
  .mnm-divider::before, .mnm-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .mnm-divider-mark { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

  /* ═══ METAL vs NON-METAL COMPARISON SPLIT ═══ */
  .mnm-compare-split {
    border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; margin-bottom: 28px;
  }
  .mnm-compare-hdr {
    display: grid; grid-template-columns: 1fr 1fr; background: var(--ink);
  }
  .mnm-compare-th {
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 14px 20px; border-right: 1px solid rgba(255,255,255,0.08);
  }
  .mnm-compare-th:last-child { border-right: none; }
  .mnm-compare-th.metal { color: #e8c060; }
  .mnm-compare-th.nonmetal { color: #a0b8d0; }
  .mnm-compare-row { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--rule); }
  .mnm-compare-row:last-child { border-bottom: none; }
  .mnm-compare-row:nth-child(even) { background: var(--paper2); }
  .mnm-compare-cell {
    font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 400;
    color: var(--ink2); padding: 13px 20px; border-right: 1px solid var(--rule); line-height: 1.6;
  }
  .mnm-compare-cell:last-child { border-right: none; }
  .mnm-compare-cell.metal-cell { border-left: 3px solid #e8c060; }
  .mnm-compare-cell strong { color: var(--accent2); font-weight: 600; }

  /* ═══ PROPERTY ICON GRID ═══ */
  .mnm-prop-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 28px; }
  @media (max-width: 660px) { .mnm-prop-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 360px) { .mnm-prop-grid { grid-template-columns: 1fr; } }
  .mnm-prop-card {
    background: var(--white); border: 1.5px solid var(--rule);
    border-radius: 8px; padding: 18px 14px; text-align: center;
    border-top: 3px solid var(--accent);
  }
  .mnm-prop-card:nth-child(2) { border-top-color: var(--silver); }
  .mnm-prop-card:nth-child(3) { border-top-color: var(--blue); }
  .mnm-prop-card:nth-child(4) { border-top-color: var(--green); }
  .mnm-prop-card:nth-child(5) { border-top-color: var(--red); }
  .mnm-prop-card:nth-child(6) { border-top-color: var(--purple); }
  .mnm-prop-card:nth-child(7) { border-top-color: #c04040; }
  .mnm-prop-card:nth-child(8) { border-top-color: #408040; }
  .mnm-prop-icon { font-size: 26px; display: block; margin-bottom: 8px; }
  .mnm-prop-title { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; color: var(--ink2); line-height: 1.4; margin-bottom: 4px; }
  .mnm-prop-desc { font-family: 'Inter', sans-serif; font-size: 11px; color: var(--muted); line-height: 1.5; }

  /* ═══ EQUATION BOX (dark) ═══ */
  .mnm-eq {
    background: var(--eq-bg); border-radius: 6px; padding: 13px 18px;
    margin-bottom: 10px; display: flex; align-items: center; flex-wrap: nowrap;
    gap: 5px; border: 1px solid rgba(184,92,0,0.25);
    overflow-x: auto; overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(184,92,0,0.4) transparent;
    min-width: 0;
  }
  .mnm-eq::-webkit-scrollbar { height: 4px; }
  .mnm-eq::-webkit-scrollbar-track { background: transparent; }
  .mnm-eq::-webkit-scrollbar-thumb { background: rgba(184,92,0,0.4); border-radius: 2px; }
  .mnm-eq:last-of-type { margin-bottom: 0; }
  .mnm-ef { font-family: 'Courier New', Courier, monospace; font-size: 15px; font-weight: 700; color: #e8c060; white-space: nowrap; flex-shrink: 0; }
  .mnm-ef sub { font-size: 0.72em; line-height: 0; }
  .mnm-ef sup { font-size: 0.72em; line-height: 0; }
  .mnm-arr { font-size: 17px; color: #fdba74; margin: 0 8px; flex-shrink: 0; white-space: nowrap; }
  .mnm-plus { font-size: 16px; color: rgba(255,255,255,0.38); margin: 0 4px; flex-shrink: 0; }
  .mnm-cond { font-size: 11px; font-family: 'Poppins', sans-serif; font-weight: 700; color: #fdba74; background: rgba(253,186,116,0.12); padding: 2px 7px; border-radius: 3px; margin: 0 4px; flex-shrink: 0; white-space: nowrap; }
  .mnm-note { font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.36); margin-left: 8px; font-style: italic; white-space: nowrap; flex-shrink: 0; }

  /* ═══ REACTION SECTION BLOCKS ═══ */
  .mnm-rxn-block { margin-bottom: 20px; border-radius: 6px; overflow: hidden; border: 1.5px solid var(--rule); display: flex; flex-direction: column; }
  .mnm-rxn-hdr {
    display: flex; align-items: center; gap: 12px; padding: 14px 18px; flex-wrap: wrap;
  }
  .mnm-rxn-hdr.copper  { background: linear-gradient(90deg, #1a0800, #2e1000); border-bottom: 1.5px solid rgba(184,92,0,0.3); }
  .mnm-rxn-hdr.silver  { background: linear-gradient(90deg, #0e1420, #182030); border-bottom: 1.5px solid rgba(90,106,122,0.3); }
  .mnm-rxn-hdr.gold    { background: linear-gradient(90deg, #181000, #282000); border-bottom: 1.5px solid rgba(184,150,0,0.3); }
  .mnm-rxn-hdr.iron    { background: linear-gradient(90deg, #080c14, #101828); border-bottom: 1.5px solid rgba(20,68,168,0.3); }
  .mnm-rxn-hdr.rust    { background: linear-gradient(90deg, #140400, #200800); border-bottom: 1.5px solid rgba(184,26,16,0.3); }
  .mnm-rxn-icon { font-size: 22px; flex-shrink: 0; }
  .mnm-rxn-meta { flex: 1; min-width: 100px; }
  .mnm-rxn-tag { font-family: 'Poppins', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 2px; }
  .mnm-rxn-name { font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 900; color: #fff; line-height: 1.2; }
  .mnm-rxn-gen {
    font-family: 'Courier New', Courier, monospace; font-size: 12px; font-weight: 700;
    color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.06);
    padding: 4px 10px; border-radius: 4px; white-space: nowrap;
    max-width: 100%; overflow: hidden; text-overflow: ellipsis;
  }
  @media (max-width: 500px) { .mnm-rxn-gen { display: none; } }
  .mnm-rxn-body { padding: 18px 20px; background: var(--white); flex: 1; }
  .mnm-rxn-body .mnm-body-text { margin-bottom: 14px; font-size: 15px; }

  /* ═══ REACTIVITY SERIES VISUAL ═══ */
  .mnm-reactivity {
    background: var(--eq-bg); border-radius: 8px; padding: 24px 24px; margin-bottom: 28px;
    border: 1px solid rgba(184,92,0,0.25);
  }
  .mnm-reactivity-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(232,192,96,0.6); margin-bottom: 16px; }
  .mnm-react-series {
    display: flex; align-items: center; flex-wrap: wrap; gap: 0; margin-bottom: 12px;
  }
  .mnm-react-item {
    display: flex; flex-direction: column; align-items: center; padding: 8px 10px;
    position: relative;
  }
  .mnm-react-symbol {
    font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 900;
    padding: 6px 10px; border-radius: 4px; margin-bottom: 4px; min-width: 36px; text-align: center;
  }
  .mnm-react-item.high   .mnm-react-symbol { background: rgba(184,26,16,0.25); color: #fca5a5; border: 1px solid rgba(184,26,16,0.4); }
  .mnm-react-item.mid    .mnm-react-symbol { background: rgba(184,92,0,0.25); color: #e8c060; border: 1px solid rgba(184,92,0,0.4); }
  .mnm-react-item.h      .mnm-react-symbol { background: rgba(6,148,184,0.25); color: #67e8f9; border: 1px solid rgba(6,148,184,0.4); }
  .mnm-react-item.low    .mnm-react-symbol { background: rgba(90,106,122,0.25); color: #a0b8d0; border: 1px solid rgba(90,106,122,0.4); }
  .mnm-react-label { font-family: 'Inter', sans-serif; font-size: 9px; color: rgba(255,255,255,0.3); white-space: nowrap; }
  .mnm-react-gt { font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 900; color: rgba(255,255,255,0.2); padding: 0 2px; line-height: 1; margin-top: -14px; }
  .mnm-react-legend { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
  .mnm-react-legend-item { display: flex; align-items: center; gap: 6px; font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.5); }
  .mnm-react-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

  /* ═══ REACTIVITY SERIES FEATURES ═══ */
  .mnm-rs-features { margin-bottom: 28px; }
  .mnm-rs-feature-item { display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--rule); align-items: flex-start; }
  .mnm-rs-feature-item:last-child { border-bottom: none; }
  .mnm-rs-badge {
    font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 900;
    width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center;
    justify-content: center; flex-shrink: 0; margin-top: 1px;
    background: var(--accent-lt); color: var(--accent2);
  }
  .mnm-rs-text { font-family: 'Inter', sans-serif; font-size: 15px; color: var(--ink2); line-height: 1.7; }
  .mnm-rs-text strong { color: var(--accent2); font-weight: 600; }

  /* ═══ EXTRACTION — 3-TIER DIAGRAM ═══ */
  .mnm-extract-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px; }
  @media (max-width: 660px) { .mnm-extract-grid { grid-template-columns: 1fr; } }
  .mnm-extract-card { border-radius: 8px; overflow: hidden; border: 1.5px solid var(--rule); display: flex; flex-direction: column; }
  .mnm-extract-hdr { padding: 16px 18px; flex-shrink: 0; }
  .mnm-extract-card:nth-child(1) .mnm-extract-hdr { background: linear-gradient(135deg, #1a0800, #2e1000); }
  .mnm-extract-card:nth-child(2) .mnm-extract-hdr { background: linear-gradient(135deg, #080c14, #101828); }
  .mnm-extract-card:nth-child(3) .mnm-extract-hdr { background: linear-gradient(135deg, #0e0e0e, #1a1a1a); }
  .mnm-extract-tag { font-family: 'Poppins', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 4px; }
  .mnm-extract-title { font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 900; color: #fff; line-height: 1.2; margin-bottom: 4px; }
  .mnm-extract-subtitle { font-family: 'Inter', sans-serif; font-size: 11px; color: rgba(255,255,255,0.4); }
  .mnm-extract-body { padding: 16px 18px; background: var(--white); flex: 1; }
  .mnm-extract-method { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; color: var(--accent); margin-bottom: 8px; }
  .mnm-extract-card:nth-child(2) .mnm-extract-method { color: var(--blue); }
  .mnm-extract-card:nth-child(3) .mnm-extract-method { color: var(--silver); }
  .mnm-extract-metals { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
  .mnm-metal-tag {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700;
    padding: 3px 10px; border-radius: 4px;
  }
  .mnm-extract-card:nth-child(1) .mnm-metal-tag { background: var(--accent-lt); color: var(--accent2); }
  .mnm-extract-card:nth-child(2) .mnm-metal-tag { background: var(--blue-lt);   color: var(--blue); }
  .mnm-extract-card:nth-child(3) .mnm-metal-tag { background: var(--silver-lt); color: var(--silver); }
  .mnm-extract-note { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2); line-height: 1.6; }

  /* ═══ IONIC COMPOUND PROPERTIES ═══ */
  .mnm-ionic-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 28px; }
  @media (max-width: 640px) { .mnm-ionic-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 400px) { .mnm-ionic-grid { grid-template-columns: 1fr; } }
  .mnm-ionic-card {
    background: var(--white); border: 1.5px solid var(--rule);
    border-radius: 6px; padding: 16px 14px; text-align: center;
    border-top: 3px solid var(--accent);
  }
  .mnm-ionic-card:nth-child(2) { border-top-color: var(--silver); }
  .mnm-ionic-card:nth-child(3) { border-top-color: var(--red); }
  .mnm-ionic-card:nth-child(4) { border-top-color: var(--blue); }
  .mnm-ionic-card:nth-child(5) { border-top-color: var(--green); }
  .mnm-ionic-card:nth-child(6) { border-top-color: var(--purple); }
  .mnm-ionic-icon { font-size: 24px; display: block; margin-bottom: 8px; }
  .mnm-ionic-title { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: var(--ink2); margin-bottom: 4px; }
  .mnm-ionic-detail { font-family: 'Inter', sans-serif; font-size: 12px; color: var(--muted); line-height: 1.5; }

  /* ═══ IONIC BONDING VISUAL ═══ */
  .mnm-ionic-bond {
    background: var(--eq-bg); border-radius: 8px; padding: 22px 24px; margin-bottom: 28px;
    border: 1px solid rgba(184,92,0,0.25);
  }
  .mnm-ionic-bond-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(232,192,96,0.6); margin-bottom: 16px; }
  .mnm-bond-example { margin-bottom: 18px; padding: 16px 18px; border-radius: 6px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); }
  .mnm-bond-example:last-child { margin-bottom: 0; }
  .mnm-bond-title { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: rgba(232,192,96,0.85); margin-bottom: 14px; }
  .mnm-bond-scroll-row {
    display: flex; align-items: center; gap: 10px;
    overflow-x: auto; overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin; scrollbar-color: rgba(184,92,0,0.4) transparent;
    padding-bottom: 6px; margin-bottom: 12px; white-space: nowrap;
  }
  .mnm-bond-scroll-row::-webkit-scrollbar { height: 4px; }
  .mnm-bond-scroll-row::-webkit-scrollbar-track { background: transparent; }
  .mnm-bond-scroll-row::-webkit-scrollbar-thumb { background: rgba(184,92,0,0.4); border-radius: 2px; }
  .mnm-bond-atom {
    font-family: 'Courier New', Courier, monospace; font-size: 15px; font-weight: 700;
    color: #e8c060; flex-shrink: 0; white-space: nowrap;
  }
  .mnm-bond-atom sup { font-size: 0.7em; vertical-align: super; line-height: 0; }
  .mnm-bond-atom sub { font-size: 0.7em; vertical-align: sub; line-height: 0; }
  .mnm-bond-cfg { font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 400; color: rgba(255,255,255,0.3); white-space: nowrap; display: none; }
  .mnm-bond-op { font-size: 16px; color: #fdba74; flex-shrink: 0; font-weight: 700; }
  .mnm-bond-sep { font-size: 20px; color: rgba(255,255,255,0.15); flex-shrink: 0; margin: 0 4px; }
  .mnm-bond-result-row {
    display: flex; align-items: center; gap: 10px;
    overflow-x: auto; overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin; scrollbar-color: rgba(184,92,0,0.3) transparent;
    padding-bottom: 2px;
  }
  .mnm-bond-result-row::-webkit-scrollbar { height: 3px; }
  .mnm-bond-result-row::-webkit-scrollbar-thumb { background: rgba(184,92,0,0.3); border-radius: 2px; }
  .mnm-bond-result-label { font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.38); flex-shrink: 0; white-space: nowrap; }
  .mnm-bond-result-eq { font-family: 'Courier New', Courier, monospace; font-size: 14px; font-weight: 700; color: #a0c8ff; white-space: nowrap; flex-shrink: 0; }
  .mnm-bond-result-eq sup { font-size: 0.72em; line-height: 0; }
  .mnm-bond-result-eq sub { font-size: 0.72em; line-height: 0; }

  /* ═══ CORROSION & ALLOYS ═══ */
  .mnm-corrosion-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px; }
  @media (max-width: 620px) { .mnm-corrosion-grid { grid-template-columns: 1fr; } }
  .mnm-corrosion-card { border-radius: 8px; overflow: hidden; border: 1.5px solid var(--rule); display: flex; flex-direction: column; }
  .mnm-corrosion-hdr { padding: 14px 18px; flex-shrink: 0; }
  .mnm-corrosion-card.rust    .mnm-corrosion-hdr { background: linear-gradient(135deg, #1a0400, #2e0800); }
  .mnm-corrosion-card.prevent .mnm-corrosion-hdr { background: linear-gradient(135deg, #031408, #062010); }
  .mnm-corrosion-hdr-tag { font-family: 'Poppins', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 2px; }
  .mnm-corrosion-hdr-name { font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 900; color: #fff; }
  .mnm-corrosion-body { padding: 16px 18px; background: var(--white); flex: 1; }
  .mnm-corrosion-def { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); line-height: 1.7; margin-bottom: 12px; }
  .mnm-corrosion-def strong { color: var(--accent2); font-weight: 600; }
  .mnm-corrosion-list { list-style: none; padding: 0; }
  .mnm-corrosion-list li { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); padding: 7px 0 7px 18px; border-bottom: 1px solid var(--rule); position: relative; line-height: 1.6; }
  .mnm-corrosion-list li:last-child { border-bottom: none; }
  .mnm-corrosion-list li::before { content: '▸'; position: absolute; left: 0; color: var(--accent); font-size: 10px; top: 9px; }
  .mnm-corrosion-list li strong { color: var(--accent2); font-weight: 600; }

  /* ═══ ALLOYS TABLE ═══ */
  .mnm-alloys { border: 1.5px solid var(--rule); border-radius: 6px; overflow: hidden; margin-bottom: 28px; }
  .mnm-alloys-hdr { display: grid; grid-template-columns: 1fr 1.5fr 1.2fr; background: var(--ink); }
  .mnm-alloy-th { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #e8c060; padding: 12px 16px; border-right: 1px solid rgba(255,255,255,0.08); }
  .mnm-alloy-th:last-child { border-right: none; }
  .mnm-alloy-row { display: grid; grid-template-columns: 1fr 1.5fr 1.2fr; border-bottom: 1px solid var(--rule); }
  .mnm-alloy-row:last-child { border-bottom: none; }
  .mnm-alloy-row:nth-child(even) { background: var(--paper2); }
  .mnm-alloy-cell { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); padding: 12px 16px; border-right: 1px solid var(--rule); line-height: 1.5; }
  .mnm-alloy-cell:first-child { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--accent2); }
  .mnm-alloy-cell:last-child { border-right: none; }

  /* ═══ SPECIAL CALLOUT — AQUA REGIA ═══ */
  .mnm-aqua-regia {
    background: linear-gradient(135deg, #100800, #201400);
    border-radius: 8px; padding: 22px 26px; margin-bottom: 28px;
    border: 1px solid rgba(184,150,0,0.3);
    display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap;
  }
  .mnm-aqua-icon { font-size: 36px; flex-shrink: 0; }
  .mnm-aqua-content { flex: 1; min-width: 200px; }
  .mnm-aqua-tag { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(232,192,96,0.7); background: rgba(232,192,96,0.08); padding: 3px 10px; border-radius: 100px; display: inline-block; margin-bottom: 8px; }
  .mnm-aqua-title { font-family: 'Montserrat', sans-serif; font-size: 17px; font-weight: 900; color: #e8c060; margin-bottom: 8px; letter-spacing: -0.01em; }
  .mnm-aqua-text { font-family: 'Inter', sans-serif; font-size: 14px; color: rgba(255,255,255,0.68); line-height: 1.75; }
  .mnm-aqua-text strong { color: #e8c060; }

  /* ═══ THERMITE & ELECTROLYTIC REDUCTION ═══ */
  .mnm-process-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px; }
  @media (max-width: 620px) { .mnm-process-grid { grid-template-columns: 1fr; } }
  .mnm-process-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 6px; padding: 20px 20px; border-left: 4px solid var(--accent); }
  .mnm-process-card:nth-child(2) { border-left-color: var(--blue); }
  .mnm-process-card:nth-child(3) { border-left-color: var(--green); }
  .mnm-process-card:nth-child(4) { border-left-color: var(--silver); }
  .mnm-process-icon { font-size: 24px; margin-bottom: 8px; display: block; }
  .mnm-process-title { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: var(--accent2); margin-bottom: 6px; }
  .mnm-process-card:nth-child(2) .mnm-process-title { color: var(--blue); }
  .mnm-process-card:nth-child(3) .mnm-process-title { color: var(--green); }
  .mnm-process-card:nth-child(4) .mnm-process-title { color: var(--silver); }
  .mnm-process-def { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); line-height: 1.7; margin-bottom: 10px; }
  .mnm-process-def strong { color: var(--accent2); font-weight: 600; }

  /* ═══ PULL QUOTE ═══ */
  .mnm-pull-quote { border-left: 5px solid var(--accent); background: var(--accent-lt); padding: 22px 30px; margin: 28px 0; border-radius: 0 4px 4px 0; }
  .mnm-pull-quote p { font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 600; color: var(--accent2); line-height: 1.7; font-style: italic; margin: 0; }

  /* ═══ FAQ ═══ */
  .mnm-faq-header { margin-bottom: 12px; }
  .mnm-faq-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); background: var(--accent-lt); padding: 6px 16px; border-radius: 100px; }
  .mnm-faq-title { font-family: 'Montserrat', sans-serif; font-size: clamp(26px, 4vw, 36px); font-weight: 900; color: var(--ink); letter-spacing: -0.02em; margin-bottom: 28px; margin-top: 16px; }
  .mnm-faq-item { border: 1.5px solid var(--rule); border-radius: 6px; margin-bottom: 12px; overflow: hidden; background: var(--white); transition: border-color 0.2s; }
  .mnm-faq-item.open { border-color: var(--accent); }
  .mnm-faq-q { width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; text-align: left; gap: 16px; }
  .mnm-faq-q-text { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600; color: var(--ink); line-height: 1.5; }
  .mnm-faq-item.open .mnm-faq-q-text { color: var(--accent); }
  .mnm-faq-icon { font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 700; color: var(--accent); flex-shrink: 0; transition: transform 0.2s; }
  .mnm-faq-item.open .mnm-faq-icon { transform: rotate(45deg); }
  .mnm-faq-ans { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: var(--ink2); line-height: 1.85; padding: 0 24px; max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; }
  .mnm-faq-ans.visible { max-height: 900px; padding: 0 24px 22px; }
  .mnm-faq-ans strong { color: var(--accent2); font-weight: 600; }
  .mnm-faq-ans code { font-family: 'Courier New', Courier, monospace; font-size: 13px; background: var(--accent-lt); padding: 1px 6px; border-radius: 3px; color: var(--accent2); }

  @media (max-width: 700px) {
    .mnm-body { padding: 48px 20px 72px; }
    .mnm-hero-inner { padding: 0 20px; }
    .mnm-intro-card { padding: 24px 22px; }
    .mnm-compare-cell { padding: 10px 12px; font-size: 13px; }
    .mnm-compare-th { padding: 12px 12px; font-size: 11px; }
    .mnm-alloys-hdr, .mnm-alloy-row { grid-template-columns: 1fr 1.2fr 1fr; }
    .mnm-alloy-cell { font-size: 12px; padding: 10px 10px; }
  }
`;

const faqs = [
  {
    q: "What are the physical properties of metals and non-metals?",
    a: (<><strong>Metals:</strong><br />
      Shining surface (metallic lustre), generally hard, malleable (beaten into sheets), ductile (drawn into wires — gold is most ductile), good conductors of heat and electricity, high melting point, sonorous (produce ringing sound).<br /><br />
      <strong>Non-metals:</strong><br />
      Found in all three states (solid, liquid, gas) at room temperature. Generally soft, no lustre (exception: iodine has lustre). Non-malleable, non-ductile. Poor conductors of heat and electricity (exception: graphite conducts electricity). Not sonorous.<br /><br />
      <strong>Special cases:</strong> Carbon has allotropes — diamond (hardest natural substance) and graphite (conducts electricity).</>),
  },
  {
    q: "How do metals react with oxygen? Give equations.",
    a: (<>Metals combine with oxygen to form <strong>metal oxides</strong>, which are <strong>basic in nature</strong>.<br /><br />
      <code>2Cu + O₂ → 2CuO</code><br />
      <code>4Al + 3O₂ → 2Al₂O₃</code><br /><br />
      Most metal oxides are <strong>insoluble in water</strong>. If soluble, they form alkalis:<br />
      <code>Na₂O + H₂O → 2NaOH</code><br />
      <code>K₂O + H₂O → 2KOH</code><br /><br />
      <strong>Na and K</strong> react very vigorously with oxygen, so they are kept immersed in kerosene.<br />
      <strong>Mg, Al, Zn, Pb</strong> form thin protective layers of oxides on their surface.</>),
  },
  {
    q: "How do metals react with water? Give equations for different metals.",
    a: (<>Different metals show different reactivity with water:<br /><br />
      <strong>K and Na</strong> (violent reaction with cold water):<br />
      <code>2K + 2H₂O → 2KOH + H₂</code><br />
      <code>2Na + 2H₂O → 2NaOH + H₂</code> — That's why they are not put in water<br /><br />
      <strong>Ca</strong> (less violent):<br />
      <code>Ca + 2H₂O → Ca(OH)₂ + H₂</code><br /><br />
      <strong>Mg</strong> — Does not react with cold water.<br /><br />
      <strong>Al, Zn, Fe</strong> — Do not react with H₂O but react with steam:<br />
      <code>2Al + 3H₂O → Al₂O₃ + 3H₂</code><br />
      <code>3Fe + 4H₂O → Fe₃O₄ + 4H₂</code></>),
  },
  {
    q: "How do metals react with acids? What is aqua regia?",
    a: (<><code>Metal + Dilute acid → Metal salt + H₂</code><br /><br />
      Important exceptions:<br />
      • <strong>H₂ does NOT evolve with HNO₃</strong> — HNO₃ is a strong oxidising agent and oxidises H₂ as it forms.<br />
      • <strong>Cu does not react</strong> with dilute H₂SO₄ or dilute HCl.<br /><br />
      <strong>Aqua Regia:</strong> A freshly prepared mixture of concentrated HCl and concentrated HNO₃ in <strong>3:1 ratio</strong>. It can dissolve <strong>gold and platinum</strong> — the most noble metals that don't dissolve in individual acids.</>),
  },
  {
    q: "What is the reactivity series? What are its key features?",
    a: (<>The reactivity series arranges metals in <strong>decreasing order of their electropositive character (reactivity)</strong>:<br /><br />
      <strong>K &gt; Na &gt; Ca &gt; Mg &gt; Al &gt; Zn &gt; Fe &gt; Pb &gt; H &gt; Cu &gt; Hg &gt; Ag &gt; Au</strong><br /><br />
      Key features:<br />
      • Metals at the top have <strong>greater reducing power</strong> — decreases going down.<br />
      • Metals at the top show <strong>greater tendency to get oxidised</strong>.<br />
      • Metals <strong>above hydrogen</strong> liberate H₂ from mineral acids.<br />
      • Metals at the top <strong>displace metals lower</strong> in the series from aqueous solutions of their salts.<br />
      • Metal oxides <strong>above Al cannot be reduced</strong> by common reducing agents; those below Al can.</>),
  },
  {
    q: "What is an ionic compound? What are the physical properties of ionic compounds?",
    a: (<>When a <strong>metal reacts with a non-metal</strong>, the metal transfers electrons to the non-metal, forming positively charged ions (cations) and negatively charged ions (anions). This electrostatic attraction is called an <strong>ionic bond</strong>.<br /><br />
      Example: Na (2,8,1) → Na⁺ (2,8) + e⁻ ; Cl + e⁻ → Cl⁻ (2,8,8) → NaCl<br /><br />
      Physical properties of ionic compounds:<br />
      1. <strong>Solid</strong><br />
      2. <strong>Hard</strong> — due to strong electrostatic attraction forces<br />
      3. <strong>Brittle</strong><br />
      4. <strong>High melting and boiling points</strong><br />
      5. <strong>Soluble in H₂O</strong>; insoluble in kerosene, petrol<br />
      6. <strong>Conduct electricity</strong> in aqueous solution (ions free to move)</>),
  },
  {
    q: "What is corrosion? What are the factors affecting corrosion and how can it be prevented?",
    a: (<><strong>Corrosion</strong> is the process of breaking down of metals due to their reactions with moisture and gases in air. <strong>Rusting of iron</strong> is the most common example.<br /><br />
      <strong>Factors affecting corrosion:</strong><br />
      • Reactive nature of metal — highly reactive metals corrode easily<br />
      • Presence of dissolved salts — act as electrolyte, increase rate<br />
      • Presence of pollutants — increase rate of corrosion<br />
      • Presence of less reactive metal nearby — makes more reactive metal susceptible<br /><br />
      <strong>Prevention methods:</strong><br />
      • Painting, oiling, greasing of iron articles (applied regularly)<br />
      • Coating with chromium or zinc — <strong>galvanisation</strong> (zinc on iron)<br />
      • <strong>Cathode protection</strong> — connecting iron with a more reactive metal (zinc) through a wire<br />
      • <strong>Alloying</strong> — mixing metals to form corrosion-resistant alloys</>),
  },
  {
    q: "What is an alloy? Give examples with compositions.",
    a: (<>An <strong>alloy</strong> is a <strong>homogeneous mixture of two or more elements</strong>, at least one of which is a metal.<br /><br />
      Common alloys:<br />
      • <strong>Stainless Steel</strong> — Iron + Nickel + Chromium (rust-resistant)<br />
      • <strong>Brass</strong> — Copper + Zinc<br />
      • <strong>Bronze</strong> — Copper + Tin<br /><br />
      Alloys are used to improve properties like strength, hardness, corrosion resistance, and appearance. Pure metals are often too soft or reactive for practical use.</>),
  },
  {
    q: "What are minerals and ores? How are metals extracted based on their reactivity?",
    a: (<><strong>Minerals</strong> are elements or compounds that occur naturally in the Earth's crust (lithosphere, hydrosphere, atmosphere).<br /><br />
      Extraction depends on reactivity:<br /><br />
      • <strong>Highly reactive metals</strong> (K, Na, Ca, Mg, Al) — extracted by <strong>electrolysis</strong><br />
      • <strong>Medium reactive metals</strong> (Zn, Fe, Pb, Cu) — extracted by <strong>carbon reduction</strong><br />
      • <strong>Low reactive metals</strong> (Ag, Au) — found in <strong>native form</strong>, minimal processing needed<br /><br />
      For middle active metals, two processes are used:<br />
      <strong>Roasting</strong> — Heating sulphide ore in excess air: <code>2ZnS + 3O₂ → 2ZnO + 2SO₂</code><br />
      <strong>Calcination</strong> — Heating carbonate ores in limited air: <code>ZnCO₃ → ZnO + CO₂</code></>),
  },
  {
    q: "What is the thermite reaction? What is electrolytic reduction?",
    a: (<><strong>Thermite Reaction:</strong><br />
      <code>Fe₂O₃ + 2Al → 2Fe + Al₂O₃ + Heat</code><br />
      Aluminium (more reactive) displaces iron from iron oxide. The reaction produces intense heat and is used in <strong>welding railway tracks</strong> (thermit welding).<br /><br />
      <strong>Electrolytic Reduction</strong> is used for highly reactive metals:<br />
      Example — Electrolysis of molten NaCl:<br />
      • Cathode: <code>Na⁺ + e⁻ → Na</code><br />
      • Anode: <code>2Cl⁻ → Cl₂ + 2e⁻</code><br />
      • Net: <code>2NaCl(l) → 2Na(s) + Cl₂(g)</code><br /><br />
      <strong>Electrolytic Refining:</strong> Impure metal = anode; thin strip of pure metal = cathode; metal salt solution = electrolyte. Pure metal deposits on cathode.</>),
  },
];

export default function MetalsAndNonMetals() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="mnm-root">

        {/* HERO */}
        <div className="mnm-hero">
          <div className="mnm-hero-grid" />
          <div className="mnm-hero-sheen" />
          <div className="mnm-glow" />
          <div className="mnm-hero-bg-num">03</div>
          <div className="mnm-hero-inner">
            <div className="mnm-overline">Science · Class 10 · Chemistry · Chapter 3</div>
            <h1 className="mnm-hero-title">
              <span className="em1">Metals</span><br />
              <span className="em3">&amp;</span><br />
              <span className="em2">Non-Metals</span>
            </h1>
            <div className="mnm-hero-bar">
              {[
                { label: "Subject",  value: "Chemistry" },
                { label: "Class",   value: "10th Standard" },
                { label: "Chapter", value: "Chapter 3" },
                { label: "Board",   value: "CBSE / NCERT" },
              ].map((x) => (
                <div className="mnm-hero-bar-item" key={x.label}>
                  <div className="mnm-bar-label">{x.label}</div>
                  <div className="mnm-bar-value">{x.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mnm-body">

          {/* Intro */}
          <div className="mnm-intro-card">
            <p>Every element in existence is either a <strong>metal or a non-metal</strong> — and understanding their properties, reactions, and extraction is fundamental to chemistry. From the <strong>gold in jewellery to the iron in bridges</strong>, this chapter covers the science behind the materials that build our world.</p>
            <p>This is one of the most important chapters for the board exam — cover every section carefully.</p>
          </div>

          {/* ── S1: PHYSICAL PROPERTIES ── */}
          <div className="mnm-sec-head">
            <div className="mnm-sec-num">1</div>
            <div className="mnm-sec-title-wrap">
              <div className="mnm-sec-kicker">What They Look & Feel Like</div>
              <h2 className="mnm-sec-title">Physical <span>Properties</span></h2>
            </div>
          </div>
          <p className="mnm-body-text">Metals and non-metals have strikingly different physical properties. Here are the key physical properties of metals, followed by a side-by-side comparison.</p>

          {/* Metal properties icon grid */}
          <div className="mnm-prop-grid">
            {[
              { icon:"✨", title:"Metallic Lustre",    desc:"Shining surface in pure state" },
              { icon:"🪨", title:"Generally Hard",      desc:"Hardness varies (Na/K are soft)" },
              { icon:"🔨", title:"Malleable",           desc:"Can be beaten into thin sheets" },
              { icon:"🧵", title:"Ductile",             desc:"Can be drawn into thin wires. Gold = most ductile" },
              { icon:"🔥", title:"Good Heat Conductor", desc:"Conduct heat easily" },
              { icon:"⚡", title:"Conduct Electricity", desc:"Good electrical conductors" },
              { icon:"🌡️", title:"High Melting Point",  desc:"Most metals have high MP" },
              { icon:"🔔", title:"Sonorous",            desc:"Produce ringing sound when struck" },
            ].map((p) => (
              <div className="mnm-prop-card" key={p.title}>
                <span className="mnm-prop-icon">{p.icon}</span>
                <div className="mnm-prop-title">{p.title}</div>
                <div className="mnm-prop-desc">{p.desc}</div>
              </div>
            ))}
          </div>

          {/* Comparison */}
          <div className="mnm-compare-split">
            <div className="mnm-compare-hdr">
              <div className="mnm-compare-th metal">⚙️ Metals</div>
              <div className="mnm-compare-th nonmetal">🌿 Non-Metals</div>
            </div>
            {[
              ["Generally hard and lustrous.", "Soft and have no lustre. (Exception: iodine has lustre)"],
              ["Malleable (beaten into sheets) and ductile (drawn into wires).", "Non-malleable and non-ductile."],
              ["Sonorous — produce ringing sound when struck.", "Not sonorous."],
              ["Good conductors of heat and electricity.", "Poor conductors of heat and electricity. (Exception: graphite conducts electricity)"],
              ["React with oxygen to produce basic metal oxides.", "React with oxygen to form non-metallic oxides, which are acidic in nature."],
              ["React with acids to produce metal salt and hydrogen gas.", "Do NOT react with acids."],
              ["Some react with bases to produce hydrogen gas.", "Reactions of non-metals with bases are complex."],
              ["Found mostly in solid state (except Mercury — liquid).", "Found in solid, liquid, and gas states at room temperature."],
            ].map(([m, nm], i) => (
              <div className="mnm-compare-row" key={i}>
                <div className="mnm-compare-cell metal-cell">{m}</div>
                <div className="mnm-compare-cell">{nm}</div>
              </div>
            ))}
          </div>

          <div className="mnm-pull-quote">
            <p>"Carbon is a special non-metal with allotropes — Diamond (hardest natural substance, non-conductor) and Graphite (soft, conducts electricity). Iodine, despite being a non-metal, has lustre."</p>
          </div>

          {/* ── S2: CHEMICAL REACTIONS ── */}
          <div className="mnm-divider"><div className="mnm-divider-mark" /></div>
          <div className="mnm-sec-head">
            <div className="mnm-sec-num">2</div>
            <div className="mnm-sec-title-wrap">
              <div className="mnm-sec-kicker">Chemical Behaviour</div>
              <h2 className="mnm-sec-title">Chemical <span>Reactions of Metals</span></h2>
            </div>
          </div>

          {/* Reaction with Oxygen */}
          <div className="mnm-rxn-block">
            <div className="mnm-rxn-hdr copper">
              <span className="mnm-rxn-icon">🔥</span>
              <div className="mnm-rxn-meta">
                <div className="mnm-rxn-tag">Reaction 01</div>
                <div className="mnm-rxn-name">Metals + Oxygen</div>
              </div>
              <span className="mnm-rxn-gen">Metal + O₂ → Metal Oxide (Basic)</span>
            </div>
            <div className="mnm-rxn-body">
              <p className="mnm-body-text" style={{marginBottom:"12px"}}>Metals combine with oxygen to form <strong>metal oxides, which are basic in nature</strong>. Most metal oxides are insoluble in water. If soluble, they form alkalis.</p>
              <div className="mnm-eq">
                <span className="mnm-ef">2Cu</span><span className="mnm-plus">+</span>
                <span className="mnm-ef">O<sub>2</sub></span>
                <span className="mnm-arr">→</span>
                <span className="mnm-ef">2CuO</span>
                <span className="mnm-note">Copper + Oxygen → Copper oxide</span>
              </div>
              <div className="mnm-eq">
                <span className="mnm-ef">4Al</span><span className="mnm-plus">+</span>
                <span className="mnm-ef">3O<sub>2</sub></span>
                <span className="mnm-arr">→</span>
                <span className="mnm-ef">2Al<sub>2</sub>O<sub>3</sub></span>
                <span className="mnm-note">Aluminium oxide</span>
              </div>
              <div className="mnm-eq" style={{marginTop:"8px"}}>
                <span className="mnm-ef">Na<sub>2</sub>O</span><span className="mnm-plus">+</span>
                <span className="mnm-ef">H<sub>2</sub>O</span>
                <span className="mnm-arr">→</span>
                <span className="mnm-ef">2NaOH</span>
                <span className="mnm-note">Soluble oxide → forms alkali</span>
              </div>
              <div className="mnm-eq">
                <span className="mnm-ef">K<sub>2</sub>O</span><span className="mnm-plus">+</span>
                <span className="mnm-ef">H<sub>2</sub>O</span>
                <span className="mnm-arr">→</span>
                <span className="mnm-ef">2KOH</span>
              </div>
              <div style={{marginTop:"12px", padding:"10px 14px", background:"var(--accent-lt)", borderRadius:"6px", fontFamily:"'Inter',sans-serif", fontSize:"14px", color:"var(--accent2)"}}>
                ⚠️ <strong>Na and K</strong> react very easily with O₂ — so they are kept immersed in <strong>kerosene</strong>. | <strong>Mg, Al, Zn, Pb</strong> form thin protective oxide layers on their surface.
              </div>
            </div>
          </div>

          {/* Reaction with Water */}
          <div className="mnm-rxn-block">
            <div className="mnm-rxn-hdr silver">
              <span className="mnm-rxn-icon">💧</span>
              <div className="mnm-rxn-meta">
                <div className="mnm-rxn-tag">Reaction 02</div>
                <div className="mnm-rxn-name">Metals + Water</div>
              </div>
              <span className="mnm-rxn-gen">Metal + H₂O → Metal Oxide/Hydroxide + H₂</span>
            </div>
            <div className="mnm-rxn-body">
              <p className="mnm-body-text" style={{marginBottom:"12px"}}>Different metals react with water at different rates depending on their reactivity. The product is a metal oxide + H₂. If oxide is soluble, metal hydroxide is formed.</p>
              <div className="mnm-eq">
                <span className="mnm-ef">2K</span><span className="mnm-plus">+</span>
                <span className="mnm-ef">2H<sub>2</sub>O</span>
                <span className="mnm-arr">→</span>
                <span className="mnm-ef">2KOH</span><span className="mnm-plus">+</span>
                <span className="mnm-ef">H<sub>2</sub>↑</span>
                <span className="mnm-note">Violent — not kept in water</span>
              </div>
              <div className="mnm-eq">
                <span className="mnm-ef">2Na</span><span className="mnm-plus">+</span>
                <span className="mnm-ef">2H<sub>2</sub>O</span>
                <span className="mnm-arr">→</span>
                <span className="mnm-ef">2NaOH</span><span className="mnm-plus">+</span>
                <span className="mnm-ef">H<sub>2</sub>↑</span>
                <span className="mnm-note">Violent reaction</span>
              </div>
              <div className="mnm-eq">
                <span className="mnm-ef">Ca</span><span className="mnm-plus">+</span>
                <span className="mnm-ef">2H<sub>2</sub>O</span>
                <span className="mnm-arr">→</span>
                <span className="mnm-ef">Ca(OH)<sub>2</sub></span><span className="mnm-plus">+</span>
                <span className="mnm-ef">H<sub>2</sub>↑</span>
                <span className="mnm-note">Less violent</span>
              </div>
              <div style={{margin:"8px 0", padding:"8px 14px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"4px"}}>
                <span style={{fontFamily:"'Inter',sans-serif", fontSize:"13px", color:"rgba(255,255,255,0.5)", fontStyle:"italic"}}>Mg → Does NOT react with cold H₂O</span>
              </div>
              <div className="mnm-eq">
                <span className="mnm-ef">2Al</span><span className="mnm-plus">+</span>
                <span className="mnm-ef">3H<sub>2</sub>O</span>
                <span className="mnm-arr">→</span>
                <span className="mnm-ef">Al<sub>2</sub>O<sub>3</sub></span><span className="mnm-plus">+</span>
                <span className="mnm-ef">3H<sub>2</sub>↑</span>
                <span className="mnm-note">Reacts with STEAM only</span>
              </div>
              <div className="mnm-eq">
                <span className="mnm-ef">3Fe</span><span className="mnm-plus">+</span>
                <span className="mnm-ef">4H<sub>2</sub>O</span>
                <span className="mnm-arr">→</span>
                <span className="mnm-ef">Fe<sub>3</sub>O<sub>4</sub></span><span className="mnm-plus">+</span>
                <span className="mnm-ef">4H<sub>2</sub>↑</span>
                <span className="mnm-note">Iron reacts with STEAM only</span>
              </div>
            </div>
          </div>

          {/* Reaction with Acids */}
          <div className="mnm-rxn-block">
            <div className="mnm-rxn-hdr gold">
              <span className="mnm-rxn-icon">⚗️</span>
              <div className="mnm-rxn-meta">
                <div className="mnm-rxn-tag">Reaction 03</div>
                <div className="mnm-rxn-name">Metals + Dilute Acids</div>
              </div>
              <span className="mnm-rxn-gen">Metal + Acid → Salt + H₂↑</span>
            </div>
            <div className="mnm-rxn-body">
              <p className="mnm-body-text" style={{marginBottom:"12px"}}>Metals react with dilute acids to produce <strong>metal salt and hydrogen gas</strong>.</p>
              <div className="mnm-eq">
                <span className="mnm-ef">Zn</span><span className="mnm-plus">+</span>
                <span className="mnm-ef">H<sub>2</sub>SO<sub>4</sub></span>
                <span className="mnm-arr">→</span>
                <span className="mnm-ef">ZnSO<sub>4</sub></span><span className="mnm-plus">+</span>
                <span className="mnm-ef">H<sub>2</sub>↑</span>
                <span className="mnm-note">Zinc + Sulphuric acid</span>
              </div>
              <div style={{marginTop:"12px", padding:"10px 14px", background:"var(--red-lt)", borderRadius:"6px", fontFamily:"'Inter',sans-serif", fontSize:"14px", color:"var(--red)"}}>
                ⚠️ <strong>H₂ does NOT evolve with HNO₃</strong> — it is a strong oxidising agent and oxidises H₂ as it forms. Also, <strong>Cu does not react</strong> with dilute H₂SO₄ or dilute HCl.
              </div>
            </div>
          </div>

          {/* Aqua Regia */}
          <div className="mnm-aqua-regia">
            <div className="mnm-aqua-icon">👑</div>
            <div className="mnm-aqua-content">
              <span className="mnm-aqua-tag">Special Mixture</span>
              <div className="mnm-aqua-title">Aqua Regia — "Royal Water"</div>
              <div className="mnm-aqua-text">
                A freshly-prepared mixture of <strong>concentrated HCl : concentrated HNO₃ in 3:1 ratio</strong>. It is the only substance that can <strong>dissolve gold and platinum</strong> — the most unreactive metals. Neither HCl nor HNO₃ alone can dissolve them.
              </div>
            </div>
          </div>

          {/* Reaction with Bases */}
          <div className="mnm-rxn-block">
            <div className="mnm-rxn-hdr iron">
              <span className="mnm-rxn-icon">🧪</span>
              <div className="mnm-rxn-meta">
                <div className="mnm-rxn-tag">Reaction 04</div>
                <div className="mnm-rxn-name">Metals + Bases</div>
              </div>
              <span className="mnm-rxn-gen">Metal + Base → Salt + H₂↑</span>
            </div>
            <div className="mnm-rxn-body">
              <p className="mnm-body-text" style={{marginBottom:"12px"}}>Some metals react with bases to produce <strong>hydrogen gas</strong>. Not all metals undergo this reaction — notably zinc and aluminium do.</p>
              <div className="mnm-eq">
                <span className="mnm-ef">2NaOH</span><span className="mnm-plus">+</span>
                <span className="mnm-ef">Zn</span>
                <span className="mnm-arr">→</span>
                <span className="mnm-ef">Na<sub>2</sub>ZnO<sub>2</sub></span><span className="mnm-plus">+</span>
                <span className="mnm-ef">H<sub>2</sub>↑</span>
                <span className="mnm-note">Sodium hydroxide + Zinc → Sodium zincate + Hydrogen</span>
              </div>
              <p style={{marginTop:"12px", fontFamily:"'Inter',sans-serif", fontSize:"14px", color:"var(--ink2)", lineHeight:"1.7"}}>
                Reactions of non-metals with bases are <strong>complex</strong> and vary widely.
              </p>
            </div>
          </div>

          {/* ── S3: REACTIVITY SERIES ── */}
          <div className="mnm-divider"><div className="mnm-divider-mark" /></div>
          <div className="mnm-sec-head">
            <div className="mnm-sec-num">3</div>
            <div className="mnm-sec-title-wrap">
              <div className="mnm-sec-kicker">Order of Reactivity</div>
              <h2 className="mnm-sec-title">The <span>Reactivity Series</span></h2>
            </div>
          </div>
          <p className="mnm-body-text">Metals are arranged in <strong>decreasing order of their reactivity</strong> (electropositive character). This series is one of the most important tools in predicting chemical reactions.</p>

          <div className="mnm-reactivity">
            <div className="mnm-reactivity-label">⬇️ Decreasing Reactivity — K to Au</div>
            <div className="mnm-react-series">
              {[
                {s:"K",  t:"high"}, {s:">",t:"gt"}, {s:"Na", t:"high"}, {s:">",t:"gt"},
                {s:"Ca", t:"high"}, {s:">",t:"gt"}, {s:"Mg", t:"high"}, {s:">",t:"gt"},
                {s:"Al", t:"high"}, {s:">",t:"gt"}, {s:"Zn", t:"mid"},  {s:">",t:"gt"},
                {s:"Fe", t:"mid"},  {s:">",t:"gt"}, {s:"Pb", t:"mid"},  {s:">",t:"gt"},
                {s:"H",  t:"h"},    {s:">",t:"gt"},
                {s:"Cu", t:"low"},  {s:">",t:"gt"}, {s:"Hg", t:"low"},  {s:">",t:"gt"},
                {s:"Ag", t:"low"},  {s:">",t:"gt"}, {s:"Au", t:"low"},
              ].map((item, i) => (
                item.t === "gt"
                  ? <span key={i} className="mnm-react-gt">&gt;</span>
                  : <div key={i} className={`mnm-react-item ${item.t}`}>
                      <span className="mnm-react-symbol">{item.s}</span>
                    </div>
              ))}
            </div>
            <div className="mnm-react-legend">
              <div className="mnm-react-legend-item"><div className="mnm-react-dot" style={{background:"#fca5a5"}} />Highly reactive — electrolysis for extraction</div>
              <div className="mnm-react-legend-item"><div className="mnm-react-dot" style={{background:"#e8c060"}} />Medium reactive — carbon reduction</div>
              <div className="mnm-react-legend-item"><div className="mnm-react-dot" style={{background:"#67e8f9"}} />Hydrogen (dividing line)</div>
              <div className="mnm-react-legend-item"><div className="mnm-react-dot" style={{background:"#a0b8d0"}} />Low reactive — found in native form</div>
            </div>
          </div>

          <p className="mnm-body-text">Key features of the Reactivity Series:</p>
          <div className="mnm-rs-features">
            {[
              { t:"Greater Reducing Power at Top", d:<>Metals at the top have <strong>greater reducing power</strong>. This power decreases as we move down the series.</> },
              { t:"Greater Oxidation Tendency at Top", d:<>Metals at the top show <strong>greater tendency to get oxidised</strong> — they lose electrons more easily.</> },
              { t:"Hydrogen Liberation from Acids", d:<>Metals <strong>above hydrogen</strong> in the reactivity series can <strong>liberate H₂ gas from mineral acids</strong>. Metals below hydrogen cannot.</> },
              { t:"Displacement from Salt Solutions", d:<>Metals at the top can <strong>displace metals lower</strong> in the series from aqueous solutions of their salts. Reactivity: Mg &gt; Al &gt; Zn &gt; Fe &gt; Cu</> },
              { t:"Reduction of Metal Oxides", d:<>Metal oxides <strong>above Al cannot be reduced</strong> by common reducing agents. Metal oxides <strong>below Al can be reduced</strong> by carbon or hydrogen.</> },
            ].map((f, i) => (
              <div className="mnm-rs-feature-item" key={i}>
                <div className="mnm-rs-badge">{i+1}</div>
                <div><div style={{fontFamily:"'Poppins',sans-serif", fontSize:"14px", fontWeight:700, color:"var(--accent2)", marginBottom:"4px"}}>{f.t}</div>
                <div className="mnm-rs-text">{f.d}</div></div>
              </div>
            ))}
          </div>

          {/* ── S4: IONIC BONDING ── */}
          <div className="mnm-divider"><div className="mnm-divider-mark" /></div>
          <div className="mnm-sec-head">
            <div className="mnm-sec-num">4</div>
            <div className="mnm-sec-title-wrap">
              <div className="mnm-sec-kicker">Electron Transfer</div>
              <h2 className="mnm-sec-title">Metals + Non-metals → <span>Ionic Bonding</span></h2>
            </div>
          </div>
          <p className="mnm-body-text">When a metal reacts with a non-metal, the metal <strong>transfers electrons</strong> to the non-metal. This creates oppositely charged ions held together by <strong>electrostatic attraction</strong> — called an ionic bond.</p>

          <div className="mnm-ionic-bond">
            <div className="mnm-ionic-bond-label">⚛️ Ionic Bond Formation — Examples</div>

            {/* NaCl */}
            <div className="mnm-bond-example">
              <div className="mnm-bond-title">Example 1: NaCl (Sodium Chloride)</div>

              <div className="mnm-bond-scroll-row">
                <span className="mnm-bond-atom">Na<span className="mnm-bond-cfg">(2,8,1)</span></span>
                <span className="mnm-bond-op">→</span>
                <span className="mnm-bond-atom">Na<sup>+</sup> + e<sup>−</sup><span className="mnm-bond-cfg">(2,8)</span></span>
                <span className="mnm-bond-sep">|</span>
                <span className="mnm-bond-atom">Cl + e<sup>−</sup><span className="mnm-bond-cfg">(2,8,7)</span></span>
                <span className="mnm-bond-op">→</span>
                <span className="mnm-bond-atom">Cl<sup>−</sup><span className="mnm-bond-cfg">(2,8,8)</span></span>
              </div>

              <div className="mnm-bond-result-row">
                <span className="mnm-bond-result-label">Combined:</span>
                <span className="mnm-bond-result-eq">Na<sup>+</sup> + Cl<sup>−</sup> → (Na<sup>+</sup>)(Cl<sup>−</sup>) = NaCl</span>
              </div>
            </div>

            {/* MgCl2 */}
            <div className="mnm-bond-example">
              <div className="mnm-bond-title">Example 2: MgCl₂ (Magnesium Chloride)</div>

              <div className="mnm-bond-scroll-row">
                <span className="mnm-bond-atom">Mg<span className="mnm-bond-cfg">(2,8,2)</span></span>
                <span className="mnm-bond-op">→</span>
                <span className="mnm-bond-atom">Mg<sup>2+</sup> + 2e<sup>−</sup><span className="mnm-bond-cfg">(2,8)</span></span>
                <span className="mnm-bond-sep">|</span>
                <span className="mnm-bond-atom">2Cl + 2e<sup>−</sup><span className="mnm-bond-cfg">(2,8,7 each)</span></span>
                <span className="mnm-bond-op">→</span>
                <span className="mnm-bond-atom">2Cl<sup>−</sup><span className="mnm-bond-cfg">(2,8,8 each)</span></span>
              </div>

              <div className="mnm-bond-result-row">
                <span className="mnm-bond-result-label">Combined:</span>
                <span className="mnm-bond-result-eq">Mg<sup>2+</sup> + 2Cl<sup>−</sup> → (Mg<sup>2+</sup>)(Cl<sup>−</sup>)<sub>2</sub></span>
              </div>
            </div>
          </div>

          {/* Physical Properties of Ionic Compounds */}
          <p className="mnm-body-text"><strong>Physical Properties of Ionic Compounds:</strong></p>
          <div className="mnm-ionic-grid">
            {[
              { icon:"🪨", title:"Solid",                   detail:"Exist in solid state only" },
              { icon:"💪", title:"Hard",                    detail:"Due to strong electrostatic attraction force" },
              { icon:"💥", title:"Brittle",                  detail:"Break when stress is applied along a plane" },
              { icon:"🌡️", title:"High Melting/Boiling Pt", detail:"Require large energy to break ionic bonds" },
              { icon:"💧", title:"Soluble in H₂O",           detail:"Insoluble in kerosene, petrol" },
              { icon:"⚡", title:"Conduct in H₂O Solution",  detail:"Free ions carry charge; solid state — cannot conduct" },
            ].map((p) => (
              <div className="mnm-ionic-card" key={p.title}>
                <span className="mnm-ionic-icon">{p.icon}</span>
                <div className="mnm-ionic-title">{p.title}</div>
                <div className="mnm-ionic-detail">{p.detail}</div>
              </div>
            ))}
          </div>

          {/* ── S5: EXTRACTION OF METALS ── */}
          <div className="mnm-divider"><div className="mnm-divider-mark" /></div>
          <div className="mnm-sec-head">
            <div className="mnm-sec-num">5</div>
            <div className="mnm-sec-title-wrap">
              <div className="mnm-sec-kicker">From Earth's Crust</div>
              <h2 className="mnm-sec-title">Extraction of <span>Metals</span></h2>
            </div>
          </div>
          <p className="mnm-body-text">Elements and compounds that occur naturally in the Earth's crust are called <strong>minerals</strong>. Different parts of earth include lithosphere, hydrosphere, and atmosphere. The method of extraction depends on a metal's position in the reactivity series.</p>

          <div className="mnm-extract-grid">
            <div className="mnm-extract-card">
              <div className="mnm-extract-hdr">
                <div className="mnm-extract-tag">Highly Reactive</div>
                <div className="mnm-extract-title">High Activity Metals</div>
                <div className="mnm-extract-subtitle">Top of Reactivity Series</div>
              </div>
              <div className="mnm-extract-body">
                <div className="mnm-extract-method">🔌 Electrolysis</div>
                <div className="mnm-extract-metals">
                  {["K","Na","Ca","Mg","Al"].map(m => <span className="mnm-metal-tag" key={m}>{m}</span>)}
                </div>
                <div className="mnm-extract-note">Cannot be reduced by carbon — too reactive. Extracted by passing electric current through molten ore.</div>
              </div>
            </div>
            <div className="mnm-extract-card">
              <div className="mnm-extract-hdr">
                <div className="mnm-extract-tag">Medium Reactive</div>
                <div className="mnm-extract-title">Middle Activity Metals</div>
                <div className="mnm-extract-subtitle">Middle of Reactivity Series</div>
              </div>
              <div className="mnm-extract-body">
                <div className="mnm-extract-method">🪵 Carbon Reduction</div>
                <div className="mnm-extract-metals">
                  {["Zn","Fe","Pb","Cu"].map(m => <span className="mnm-metal-tag" key={m}>{m}</span>)}
                </div>
                <div className="mnm-extract-note">Sulphide ores → Roasting. Carbonate ores → Calcination. Then reduced with carbon (coke).</div>
              </div>
            </div>
            <div className="mnm-extract-card">
              <div className="mnm-extract-hdr">
                <div className="mnm-extract-tag">Low Reactive</div>
                <div className="mnm-extract-title">Low Activity Metals</div>
                <div className="mnm-extract-subtitle">Bottom of Reactivity Series</div>
              </div>
              <div className="mnm-extract-body">
                <div className="mnm-extract-method">🏆 Found in Native Form</div>
                <div className="mnm-extract-metals">
                  {["Ag","Au"].map(m => <span className="mnm-metal-tag" key={m}>{m}</span>)}
                </div>
                <div className="mnm-extract-note">Least reactive — occur in free/native form in nature. Minimal processing needed.</div>
              </div>
            </div>
          </div>

          {/* Extraction equations */}
          <p className="mnm-body-text"><strong>Key extraction processes and equations:</strong></p>
          <div className="mnm-process-grid">
            <div className="mnm-process-card">
              <span className="mnm-process-icon">🔥</span>
              <div className="mnm-process-title">Roasting</div>
              <div className="mnm-process-def"><strong>Heating of sulphide ore in excess air.</strong> Converts sulphide to oxide.</div>
              <div className="mnm-eq" style={{background:"var(--paper2)", border:"1px solid var(--rule)"}}>
                <span style={{fontFamily:"'Courier New',monospace", fontSize:"13px", fontWeight:700, color:"var(--accent2)"}}>2ZnS + 3O<sub>2</sub></span>
                <span style={{color:"var(--accent)", margin:"0 6px", fontWeight:700}}>→</span>
                <span style={{fontFamily:"'Courier New',monospace", fontSize:"13px", fontWeight:700, color:"var(--accent2)"}}>2ZnO + 2SO<sub>2</sub></span>
              </div>
            </div>
            <div className="mnm-process-card">
              <span className="mnm-process-icon">🌬️</span>
              <div className="mnm-process-title">Calcination</div>
              <div className="mnm-process-def"><strong>Heating of carbonate ores in limited air.</strong> Converts carbonate to oxide.</div>
              <div className="mnm-eq" style={{background:"var(--blue-lt)", border:"1px solid #c0d0e8"}}>
                <span style={{fontFamily:"'Courier New',monospace", fontSize:"13px", fontWeight:700, color:"var(--blue)"}}>ZnCO<sub>3</sub></span>
                <span style={{color:"var(--blue)", margin:"0 6px", fontWeight:700}}>→</span>
                <span style={{fontFamily:"'Courier New',monospace", fontSize:"13px", fontWeight:700, color:"var(--blue)"}}>ZnO + CO<sub>2</sub></span>
              </div>
            </div>
            <div className="mnm-process-card">
              <span className="mnm-process-icon">⚡</span>
              <div className="mnm-process-title">Thermite Reaction</div>
              <div className="mnm-process-def"><strong>Al displaces Fe from Fe₂O₃.</strong> Intense heat — used in thermit welding of railway tracks.</div>
              <div className="mnm-eq" style={{background:"var(--green-lt)", border:"1px solid #a0d8b8"}}>
                <span style={{fontFamily:"'Courier New',monospace", fontSize:"13px", fontWeight:700, color:"var(--green)"}}>Fe<sub>2</sub>O<sub>3</sub> + 2Al</span>
                <span style={{color:"var(--green)", margin:"0 6px", fontWeight:700}}>→</span>
                <span style={{fontFamily:"'Courier New',monospace", fontSize:"13px", fontWeight:700, color:"var(--green)"}}>2Fe + Al<sub>2</sub>O<sub>3</sub> + Heat</span>
              </div>
            </div>
            <div className="mnm-process-card">
              <span className="mnm-process-icon">🔌</span>
              <div className="mnm-process-title">Electrolytic Reduction</div>
              <div className="mnm-process-def"><strong>For highly reactive metals.</strong> Electrolysis of molten NaCl — produces Na and Cl₂.</div>
              <div style={{background:"var(--silver-lt)", border:"1px solid var(--rule)", borderRadius:"4px", padding:"8px 10px"}}>
                <div style={{fontFamily:"'Courier New',monospace", fontSize:"12px", fontWeight:700, color:"var(--silver)", marginBottom:"4px"}}>Cathode: Na<sup>+</sup> + e<sup>−</sup> → Na</div>
                <div style={{fontFamily:"'Courier New',monospace", fontSize:"12px", fontWeight:700, color:"var(--silver)", marginBottom:"4px"}}>Anode: 2Cl<sup>−</sup> → Cl<sub>2</sub> + 2e<sup>−</sup></div>
                <div style={{fontFamily:"'Courier New',monospace", fontSize:"12px", fontWeight:700, color:"var(--silver)"}}>Net: 2NaCl → 2Na + Cl<sub>2</sub></div>
              </div>
            </div>
          </div>

          <div style={{background:"var(--paper2)", border:"1.5px solid var(--rule)", borderRadius:"6px", padding:"16px 20px", marginBottom:"28px"}}>
            <div style={{fontFamily:"'Poppins',sans-serif", fontSize:"12px", fontWeight:700, color:"var(--accent2)", marginBottom:"10px", letterSpacing:"0.1em", textTransform:"uppercase"}}>🔌 Electrolytic Refining of Metals</div>
            <div style={{fontFamily:"'Inter',sans-serif", fontSize:"15px", color:"var(--ink2)", lineHeight:"1.75"}}>
              • <strong>Anode</strong> — Impure metal (dissolves during electrolysis)<br/>
              • <strong>Cathode</strong> — Thin strip of pure metal (pure metal deposits here)<br/>
              • <strong>Electrolyte</strong> — Solution of a salt of the same metal<br/>
              Pure metal transfers from anode to cathode; impurities settle below anode as <strong>anode mud</strong>.
            </div>
          </div>

          {/* Low active metals extraction equations */}
          <p className="mnm-body-text"><strong>Extraction of low active metals (e.g., Mercury, Copper) — Heated in air:</strong></p>
          <div className="mnm-eq">
            <span className="mnm-ef">2HgS + 3O<sub>2</sub></span>
            <span className="mnm-arr">→</span>
            <span className="mnm-ef">2HgO + 2SO<sub>2</sub></span>
          </div>
          <div className="mnm-eq">
            <span className="mnm-ef">2HgO<sub>(s)</sub></span>
            <span className="mnm-arr">→</span>
            <span className="mnm-ef">2Hg<sub>(l)</sub> + O<sub>2</sub><sub>(g)</sub></span>
          </div>
          <div className="mnm-eq">
            <span className="mnm-ef">2Cu<sub>2</sub>S + 3O<sub>2</sub></span>
            <span className="mnm-arr">→</span>
            <span className="mnm-ef">2Cu<sub>2</sub>O<sub>(s)</sub> + 2SO<sub>2</sub><sub>(g)</sub></span>
          </div>
          <div className="mnm-eq" style={{marginBottom:"28px"}}>
            <span className="mnm-ef">2Cu<sub>2</sub>O + Cu<sub>2</sub>S</span>
            <span className="mnm-arr">→</span>
            <span className="mnm-ef">6Cu<sub>(s)</sub> + SO<sub>2</sub><sub>(g)</sub></span>
            <span className="mnm-note">All heated in air</span>
          </div>

          {/* ── S6: CORROSION & ALLOYS ── */}
          <div className="mnm-divider"><div className="mnm-divider-mark" /></div>
          <div className="mnm-sec-head">
            <div className="mnm-sec-num">6</div>
            <div className="mnm-sec-title-wrap">
              <div className="mnm-sec-kicker">Deterioration & Solutions</div>
              <h2 className="mnm-sec-title">Corrosion &amp; <span>Alloys</span></h2>
            </div>
          </div>
          <p className="mnm-body-text"><strong>Corrosion</strong> is the process of breaking down of metals because of their reactions with moisture and gases present in air. <strong>Rusting of iron</strong> is the most common example.</p>

          <div className="mnm-corrosion-grid">
            <div className="mnm-corrosion-card rust">
              <div className="mnm-corrosion-hdr">
                <div className="mnm-corrosion-hdr-tag">Causes</div>
                <div className="mnm-corrosion-hdr-name">Factors Affecting Corrosion</div>
              </div>
              <div className="mnm-corrosion-body">
                <div className="mnm-corrosion-def">Several factors <strong>increase the rate</strong> of corrosion:</div>
                <ul className="mnm-corrosion-list">
                  <li><strong>Reactive nature of metal</strong> — Highly reactive metals corrode more easily</li>
                  <li><strong>Dissolved salts</strong> — Act as electrolyte, increase corrosion rate significantly</li>
                  <li><strong>Presence of pollutants</strong> (acid rain, CO₂) — Increase corrosion rate</li>
                  <li><strong>Less reactive metal nearby</strong> — Makes the more reactive metal susceptible to corrosion</li>
                </ul>
              </div>
            </div>
            <div className="mnm-corrosion-card prevent">
              <div className="mnm-corrosion-hdr">
                <div className="mnm-corrosion-hdr-tag">Solutions</div>
                <div className="mnm-corrosion-hdr-name">Prevention Methods</div>
              </div>
              <div className="mnm-corrosion-body">
                <div className="mnm-corrosion-def">Corrosion can be prevented by blocking oxygen and moisture access:</div>
                <ul className="mnm-corrosion-list">
                  <li><strong>Painting, oiling, greasing</strong> — Applied regularly to prevent rusting</li>
                  <li><strong>Galvanisation</strong> — Depositing zinc layer on iron surface</li>
                  <li><strong>Chromium coating</strong> — Chromium or zinc applied on surface</li>
                  <li><strong>Cathode protection</strong> — Connecting iron with more reactive metal (zinc) via wire</li>
                  <li><strong>Alloying</strong> — Mixing metals to create corrosion-resistant alloys</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Alloys */}
          <p className="mnm-body-text"><strong>Alloy</strong> = a homogeneous mixture of two or more elements, at least one of which is a metal. Alloys are harder, stronger, and more corrosion-resistant than pure metals.</p>
          <div className="mnm-alloys">
            <div className="mnm-alloys-hdr">
              <div className="mnm-alloy-th">Alloy</div>
              <div className="mnm-alloy-th">Composition</div>
              <div className="mnm-alloy-th">Key Use</div>
            </div>
            {[
              ["Stainless Steel", "Iron + Nickel + Chromium",    "Cutlery, surgical tools, construction"],
              ["Brass",          "Copper + Zinc",                "Musical instruments, taps, fittings"],
              ["Bronze",         "Copper + Tin",                 "Statues, coins, bearings"],
              ["Solder",         "Lead + Tin",                   "Joining electrical wires (low melting point)"],
              ["Amalgam",        "Mercury + another metal",      "Dental fillings"],
            ].map(([a, b, c]) => (
              <div className="mnm-alloy-row" key={a}>
                <div className="mnm-alloy-cell">{a}</div>
                <div className="mnm-alloy-cell">{b}</div>
                <div className="mnm-alloy-cell">{c}</div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="mnm-divider"><div className="mnm-divider-mark" /></div>
          <div className="mnm-faq-header"><span className="mnm-faq-kicker">Exam Preparation</span></div>
          <h2 className="mnm-faq-title">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div className={`mnm-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="mnm-faq-q" onClick={() => toggle(i)}>
                <span className="mnm-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="mnm-faq-icon">+</span>
              </button>
              <div className={`mnm-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
