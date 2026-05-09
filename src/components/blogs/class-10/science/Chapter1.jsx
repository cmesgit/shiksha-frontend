import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

// Chemical equation component for clean rendering
const Eq = ({ children }) => (
  <span style={{
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: "14px",
    fontWeight: "600",
    background: "rgba(0,0,0,0.06)",
    padding: "2px 8px",
    borderRadius: "4px",
    letterSpacing: "0.02em",
    display: "inline-block",
    lineHeight: "1.6",
  }}>{children}</span>
);

// Sub/superscript helpers
const Sub = ({ n }) => <sub style={{ fontSize: "0.75em", lineHeight: 0 }}>{n}</sub>;
const Sup = ({ n }) => <sup style={{ fontSize: "0.75em", lineHeight: 0 }}>{n}</sup>;
const Arr = () => <span style={{ margin: "0 6px", color: "#e65c00", fontWeight: 700 }}>→</span>;
const Heat = () => <span style={{ fontSize: "11px", color: "#e65c00", fontWeight: 700, verticalAlign: "super", marginRight: "2px" }}>Δ</span>;

const styles = `
  :root {
    --ink:        #0e1a0e;
    --ink2:       #1a2e1a;
    --muted:      #4a6050;
    --paper:      #f3faf3;
    --paper2:     #e4f5e4;
    --accent:     #1a7a2e;
    --accent2:    #0f5c20;
    --accent-lt:  #d0f0d8;
    --orange:     #e65c00;
    --orange-lt:  #fff0e0;
    --red:        #c0251a;
    --red-lt:     #fdecea;
    --blue:       #1a4a9e;
    --blue-lt:    #ddeeff;
    --amber:      #b8860b;
    --amber-lt:   #fdf8e1;
    --rule:       #b8d8b8;
    --white:      #ffffff;
    --code-bg:    #f0f7f0;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .cre-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  /* ═══ HERO — dark forest/lab green ═══ */
  .cre-hero {
    background: linear-gradient(135deg, #040d04 0%, #081808 50%, #0a2010 100%);
    min-height: 88vh; display: flex; align-items: flex-end;
    position: relative; overflow: hidden; padding: 0 0 64px;
  }
  .cre-hero::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #1a7a2e 0%, #e65c00 45%, #1a4a9e 100%);
  }
  .cre-hero-bg-num {
    position: absolute; bottom: -60px; right: -30px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(220px, 36vw, 500px); font-weight: 900;
    line-height: 1; color: rgba(255,255,255,0.022);
    letter-spacing: -0.04em; user-select: none; pointer-events: none;
  }
  /* Molecule dot grid */
  .cre-hero-dots {
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(26,122,46,0.12) 1px, transparent 1px);
    background-size: 32px 32px; pointer-events: none;
  }
  /* Benzene ring watermark */
  .cre-hero-ring {
    position: absolute; top: 50%; right: 6%; transform: translateY(-50%);
    width: clamp(120px, 18vw, 240px); height: clamp(120px, 18vw, 240px);
    border-radius: 50%; border: 2px solid rgba(26,122,46,0.12); pointer-events: none;
  }
  .cre-hero-ring::before {
    content: ''; position: absolute; inset: 25%; border-radius: 50%;
    border: 2px solid rgba(26,122,46,0.08);
  }
  .cre-glow {
    position: absolute; top: 25%; left: 10%; width: 240px; height: 240px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(26,122,46,0.15) 0%, transparent 70%);
    pointer-events: none;
  }
  .cre-hero-inner { max-width: 900px; width: 100%; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
  .cre-overline {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; color: #6ee7a0;
    margin-bottom: 24px; display: flex; align-items: center; gap: 14px;
  }
  .cre-overline::before, .cre-overline::after { content: ''; flex: 0 0 40px; height: 1px; background: #6ee7a0; }
  .cre-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(36px, 7vw, 78px); font-weight: 900; color: #fff;
    line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 32px;
  }
  .cre-hero-title em   { font-style: normal; color: #6ee7a0; }
  .cre-hero-title .em2 { color: #fdba74; }
  .cre-hero-bar { display: flex; flex-wrap: wrap; gap: 0; border-top: 1px solid rgba(255,255,255,0.12); padding-top: 24px; margin-top: 8px; }
  .cre-hero-bar-item { flex: 1 1 160px; padding: 0 24px 0 0; border-right: 1px solid rgba(255,255,255,0.1); margin-right: 24px; }
  .cre-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .cre-bar-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 5px; }
  .cre-bar-value { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.75); }

  /* ═══ BODY ═══ */
  .cre-body { max-width: 860px; margin: 0 auto; padding: 72px 32px 96px; }

  /* ═══ DARK INTRO CARD ═══ */
  .cre-intro-card {
    background: linear-gradient(135deg, #040d04 0%, #0a2010 100%);
    border-left: 5px solid #1a7a2e; border-radius: 4px; padding: 36px 40px;
    margin-bottom: 64px; position: relative; overflow: hidden;
  }
  .cre-intro-card::after { content: '⚗️'; position: absolute; right: 28px; top: 50%; transform: translateY(-50%); font-size: 80px; opacity: 0.1; }
  .cre-intro-card p { font-family: 'Poppins', sans-serif; font-size: 18px; font-weight: 500; color: rgba(255,255,255,0.88); line-height: 1.78; margin: 0 0 14px; }
  .cre-intro-card p:last-child { margin: 0; }
  .cre-intro-card strong { color: #6ee7a0; }

  /* ═══ SECTION HEADER ═══ */
  .cre-sec-head { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 32px; border-bottom: 2px solid var(--rule); padding-bottom: 18px; }
  .cre-sec-num { font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900; color: var(--rule); line-height: 1; flex-shrink: 0; }
  .cre-sec-title-wrap { padding-top: 8px; }
  .cre-sec-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .cre-sec-title { font-family: 'Montserrat', sans-serif; font-size: clamp(22px, 3.5vw, 30px); font-weight: 800; color: var(--ink); line-height: 1.15; letter-spacing: -0.02em; }
  .cre-sec-title span { color: var(--accent); }

  /* ═══ BODY TEXT ═══ */
  .cre-body-text { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; color: var(--ink2); line-height: 1.85; margin-bottom: 28px; }
  .cre-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ═══ DIVIDER ═══ */
  .cre-divider { margin: 56px 0; display: flex; align-items: center; gap: 16px; }
  .cre-divider::before, .cre-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .cre-divider-mark { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

  /* ═══ INDICATORS OF CHEMICAL REACTION — 5-ICON GRID ═══ */
  .cre-indicators { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-bottom: 36px; }
  @media (max-width: 640px) { .cre-indicators { grid-template-columns: repeat(2, 1fr); } }
  .cre-indicator-card {
    background: var(--white); border: 1.5px solid var(--rule);
    border-radius: 8px; padding: 18px 14px; text-align: center;
    border-top: 3px solid var(--accent);
  }
  .cre-indicator-card:nth-child(2) { border-top-color: var(--orange); }
  .cre-indicator-card:nth-child(3) { border-top-color: var(--blue); }
  .cre-indicator-card:nth-child(4) { border-top-color: var(--red); }
  .cre-indicator-card:nth-child(5) { border-top-color: var(--amber); }
  .cre-indicator-icon { font-size: 28px; display: block; margin-bottom: 8px; }
  .cre-indicator-text { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; color: var(--ink2); line-height: 1.4; }

  /* ═══ EQUATION BOX — styled like a chalkboard equation ═══ */
  .cre-eq-box {
    background: #0f1f0f;
    border-radius: 8px; padding: 24px 28px; margin-bottom: 24px;
    border: 1px solid #1a3a1a;
    font-family: "'Courier New', Courier, monospace";
    position: relative;
  }
  .cre-eq-box-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(110,231,160,0.6); margin-bottom: 12px;
  }
  .cre-eq-line {
    display: flex; align-items: center; flex-wrap: wrap; gap: 6px;
    margin-bottom: 8px;
  }
  .cre-eq-line:last-child { margin-bottom: 0; }
  .cre-eq-name {
    font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 400;
    color: rgba(255,255,255,0.35); margin-top: 2px;
    display: block;
  }
  .cre-eq-substance {
    display: inline-flex; flex-direction: column; align-items: center; gap: 2px;
  }
  .cre-eq-formula {
    font-family: 'Courier New', Courier, monospace;
    font-size: 16px; font-weight: 700; color: #6ee7a0; letter-spacing: 0.04em;
    line-height: 1.2;
  }
  .cre-eq-formula sub { font-size: 0.72em; }
  .cre-eq-formula sup { font-size: 0.72em; }
  .cre-eq-arrow {
    font-size: 20px; color: #fdba74; font-weight: 700; margin: 0 8px; flex-shrink: 0;
  }
  .cre-eq-plus { font-size: 18px; color: rgba(255,255,255,0.5); margin: 0 4px; }
  .cre-eq-condition {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    color: #fdba74; background: rgba(253,186,116,0.1);
    padding: 2px 8px; border-radius: 4px; margin: 0 4px;
  }

  /* ═══ BALANCED EQUATION EXPLAINER ═══ */
  .cre-balance-box {
    background: var(--paper2); border: 1.5px solid var(--rule);
    border-radius: 8px; padding: 22px 26px; margin-bottom: 28px;
  }
  .cre-balance-title { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: var(--accent2); margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
  .cre-balance-rule {
    font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400;
    color: var(--ink2); line-height: 1.75; margin-bottom: 10px;
  }
  .cre-balance-rule strong { color: var(--accent2); font-weight: 600; }
  .cre-lhs-rhs {
    display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
    background: var(--white); border: 1.5px solid var(--rule); border-radius: 6px; padding: 16px 20px; margin-top: 14px;
  }
  .cre-side {
    flex: 1; min-width: 120px;
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; text-align: center;
  }
  .cre-side-label { font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
  .cre-side.lhs .cre-side-val { color: var(--accent2); }
  .cre-side.rhs .cre-side-val { color: var(--orange); }
  .cre-side-val { font-size: 17px; font-family: 'Montserrat', sans-serif; font-weight: 900; }
  .cre-equals { font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900; color: var(--rule); flex-shrink: 0; }

  /* ═══ REACTION TYPE CARDS — big colored blocks ═══ */
  .cre-rxn-card {
    border-radius: 8px; overflow: hidden;
    border: 1.5px solid var(--rule); margin-bottom: 20px;
  }
  .cre-rxn-card:last-child { margin-bottom: 0; }
  .cre-rxn-header { padding: 18px 24px; display: flex; align-items: center; gap: 16px; }
  .cre-rxn-icon { font-size: 28px; flex-shrink: 0; }
  .cre-rxn-meta { flex: 1; }
  .cre-rxn-tag { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.55); margin-bottom: 3px; }
  .cre-rxn-name { font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 900; color: #fff; letter-spacing: -0.01em; }
  .cre-rxn-body { padding: 20px 24px; background: var(--white); }
  .cre-rxn-def { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: var(--ink2); line-height: 1.7; margin-bottom: 16px; }
  .cre-rxn-def strong { color: var(--accent2); font-weight: 600; }
  .cre-rxn-examples-label { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }

  /* reaction type header colours */
  .cre-rxn-card.combination  .cre-rxn-header { background: linear-gradient(135deg, #0a2010, #1a4020); }
  .cre-rxn-card.decomp       .cre-rxn-header { background: linear-gradient(135deg, #2a1000, #4a1e00); }
  .cre-rxn-card.displacement .cre-rxn-header { background: linear-gradient(135deg, #0a1a3a, #142a5a); }
  .cre-rxn-card.double       .cre-rxn-header { background: linear-gradient(135deg, #2a0a2a, #3a1040); }
  .cre-rxn-card.redox        .cre-rxn-header { background: linear-gradient(135deg, #1a1000, #2a1e00); }

  /* equation sub-types inside a reaction card */
  .cre-sub-badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    padding: 4px 12px; border-radius: 100px; margin-bottom: 8px; margin-right: 6px;
  }
  .cre-sub-badge.exo  { background: var(--red-lt);    color: var(--red); }
  .cre-sub-badge.endo { background: var(--blue-lt);   color: var(--blue); }
  .cre-sub-badge.prec { background: var(--amber-lt);  color: var(--amber); }
  .cre-sub-badge.neut { background: var(--accent-lt); color: var(--accent2); }
  .cre-sub-badge.gas  { background: var(--orange-lt); color: var(--orange); }

  /* ═══ SINGLE EQUATION DISPLAY (dark box) ═══ */
  .cre-single-eq {
    background: #0f1f0f; border-radius: 6px; padding: 16px 20px; margin-bottom: 10px;
    display: flex; align-items: center; flex-wrap: wrap; gap: 4px;
    border: 1px solid #1e3a1e;
  }
  .cre-single-eq:last-of-type { margin-bottom: 0; }
  .cre-seq-formula { font-family: 'Courier New', Courier, monospace; font-size: 15px; font-weight: 700; color: #6ee7a0; }
  .cre-seq-formula sub { font-size: 0.72em; }
  .cre-seq-arrow { font-size: 18px; color: #fdba74; margin: 0 8px; }
  .cre-seq-plus  { font-size: 16px; color: rgba(255,255,255,0.4); margin: 0 4px; }
  .cre-seq-cond  { font-size: 11px; font-family: 'Poppins', sans-serif; font-weight: 700; color: #fdba74; background: rgba(253,186,116,0.15); padding: 2px 7px; border-radius: 3px; margin: 0 4px; }
  .cre-seq-note  { font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.4); margin-left: 10px; font-style: italic; }
  .cre-seq-name  { font-family: 'Inter', sans-serif; font-size: 11px; color: rgba(255,255,255,0.3); display: block; margin-top: 3px; }

  /* ═══ OXIDATION / REDUCTION SPLIT ═══ */
  .cre-redox-split { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px; }
  @media (max-width: 580px) { .cre-redox-split { grid-template-columns: 1fr; } }
  .cre-redox-half { border-radius: 8px; overflow: hidden; border: 1.5px solid var(--rule); }
  .cre-redox-half.ox  .cre-redox-hdr { background: linear-gradient(135deg, #2a1000, #4a1e00); }
  .cre-redox-half.red .cre-redox-hdr { background: linear-gradient(135deg, #0a1a3a, #142a5a); }
  .cre-redox-hdr { padding: 14px 18px; }
  .cre-redox-hdr-tag { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 2px; }
  .cre-redox-hdr-name { font-family: 'Montserrat', sans-serif; font-size: 17px; font-weight: 900; color: #fff; }
  .cre-redox-body { padding: 16px 18px; background: var(--white); }
  .cre-redox-def { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); line-height: 1.7; margin-bottom: 12px; }
  .cre-redox-def strong { color: var(--accent2); font-weight: 600; }

  /* ═══ EVERYDAY OXIDATION CARDS ═══ */
  .cre-everyday-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 28px; }
  @media (max-width: 580px) { .cre-everyday-grid { grid-template-columns: 1fr; } }
  .cre-everyday-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 6px; padding: 18px 20px; border-left: 4px solid var(--orange); }
  .cre-everyday-card:nth-child(2) { border-left-color: var(--red); }
  .cre-everyday-icon { font-size: 26px; margin-bottom: 8px; display: block; }
  .cre-everyday-title { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 700; color: var(--orange); margin-bottom: 6px; }
  .cre-everyday-card:nth-child(2) .cre-everyday-title { color: var(--red); }
  .cre-everyday-text { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); line-height: 1.7; }
  .cre-everyday-text strong { color: var(--accent2); font-weight: 600; }
  .cre-everyday-tip { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600; color: var(--muted); margin-top: 8px; padding: 6px 10px; background: var(--paper2); border-radius: 4px; }

  /* ═══ REDOX VISUAL BOX ═══ */
  .cre-redox-vis {
    background: #0f1f0f; border-radius: 8px; padding: 24px 28px; margin-bottom: 28px;
    border: 1px solid #1e3a1e;
  }
  .cre-redox-vis-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(110,231,160,0.6); margin-bottom: 16px; }
  .cre-redox-vis-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 10px; }
  .cre-redox-arrow-box {
    flex: 1; min-width: 200px;
    display: flex; flex-direction: column; align-items: center; gap: 4px; position: relative;
  }
  .cre-rv-bracket {
    width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 4px 0;
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
  }
  .cre-rv-bracket.ox  { color: #fdba74; }
  .cre-rv-bracket.red { color: #7dd3fc; }
  .cre-rv-bracket span { display: flex; align-items: center; gap: 4px; }
  .cre-rv-line { flex: 1; height: 1px; margin: 0 8px; }
  .cre-rv-bracket.ox  .cre-rv-line { background: rgba(253,186,116,0.4); }
  .cre-rv-bracket.red .cre-rv-line { background: rgba(125,211,252,0.4); }
  .cre-rv-eq-center {
    padding: 10px 0;
    font-family: 'Courier New', Courier, monospace; font-size: 17px; font-weight: 700;
    color: #6ee7a0; text-align: center; letter-spacing: 0.04em;
  }
  .cre-rv-eq-center sub { font-size: 0.72em; }

  /* ═══ SUMMARY TABLE ═══ */
  .cre-summary { border: 1.5px solid var(--rule); border-radius: 6px; overflow: hidden; margin-bottom: 36px; }
  .cre-summary-hdr { display: grid; grid-template-columns: 1.2fr 1.8fr 1fr; background: var(--ink); }
  .cre-summary-th { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #fff; padding: 12px 16px; border-right: 1px solid rgba(255,255,255,0.08); }
  .cre-summary-th:last-child { border-right: none; }
  .cre-summary-row { display: grid; grid-template-columns: 1.2fr 1.8fr 1fr; border-bottom: 1px solid var(--rule); }
  .cre-summary-row:last-child { border-bottom: none; }
  .cre-summary-row:nth-child(even) { background: var(--paper2); }
  .cre-summary-cell { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 400; color: var(--ink2); padding: 12px 16px; border-right: 1px solid var(--rule); line-height: 1.55; }
  .cre-summary-cell:first-child { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--accent2); }
  .cre-summary-cell:last-child { border-right: none; }
  .cre-summary-cell code { font-family: 'Courier New', Courier, monospace; font-size: 12px; background: var(--code-bg); padding: 1px 5px; border-radius: 3px; }

  /* ═══ PULL QUOTE ═══ */
  .cre-pull-quote { border-left: 5px solid var(--accent); background: var(--accent-lt); padding: 22px 30px; margin: 28px 0; border-radius: 0 4px 4px 0; }
  .cre-pull-quote p { font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 600; color: var(--accent2); line-height: 1.7; font-style: italic; margin: 0; }

  /* ═══ FAQ ═══ */
  .cre-faq-header { margin-bottom: 12px; }
  .cre-faq-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); background: var(--accent-lt); padding: 6px 16px; border-radius: 100px; }
  .cre-faq-title { font-family: 'Montserrat', sans-serif; font-size: clamp(26px, 4vw, 36px); font-weight: 900; color: var(--ink); letter-spacing: -0.02em; margin-bottom: 28px; margin-top: 16px; }
  .cre-faq-item { border: 1.5px solid var(--rule); border-radius: 6px; margin-bottom: 12px; overflow: hidden; background: var(--white); transition: border-color 0.2s; }
  .cre-faq-item.open { border-color: var(--accent); }
  .cre-faq-q { width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; text-align: left; gap: 16px; }
  .cre-faq-q-text { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600; color: var(--ink); line-height: 1.5; }
  .cre-faq-item.open .cre-faq-q-text { color: var(--accent); }
  .cre-faq-icon { font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 700; color: var(--accent); flex-shrink: 0; transition: transform 0.2s; }
  .cre-faq-item.open .cre-faq-icon { transform: rotate(45deg); }
  .cre-faq-ans { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: var(--ink2); line-height: 1.85; padding: 0 24px; max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; }
  .cre-faq-ans.visible { max-height: 800px; padding: 0 24px 22px; }
  .cre-faq-ans strong { color: var(--accent2); font-weight: 600; }
  .cre-faq-ans code { font-family: 'Courier New', Courier, monospace; font-size: 13px; background: var(--code-bg); padding: 1px 6px; border-radius: 3px; color: var(--orange); }

  @media (max-width: 700px) {
    .cre-body { padding: 48px 20px 72px; }
    .cre-hero-inner { padding: 0 20px; }
    .cre-intro-card { padding: 24px 22px; }
    .cre-eq-box { padding: 18px 18px; }
    .cre-rxn-body { padding: 16px 18px; }
    .cre-summary-hdr, .cre-summary-row { grid-template-columns: 1fr 1.4fr 0.8fr; }
  }
`;

const faqs = [
  {
    q: "What is a chemical reaction? What are its indicators?",
    a: (<>A <strong>chemical reaction</strong> is a process in which reactants are converted into products through the breaking and forming of chemical bonds. At least one of the following changes indicates a chemical reaction has occurred:
      <br /><br />
      • <strong>Change in state</strong> (solid → liquid → gas)<br />
      • <strong>Change in colour</strong><br />
      • <strong>Evolution of a gas</strong><br />
      • <strong>Change in temperature</strong> (heat released or absorbed)<br />
      • <strong>Formation of a precipitate</strong> (insoluble solid formed in solution)</>),
  },
  {
    q: "What is a chemical equation? What is a balanced chemical equation?",
    a: (<>A <strong>chemical equation</strong> is the symbolic representation of a chemical reaction using chemical formulae, signs, symbols, and directions. Reactants are on the <strong>left-hand side (LHS)</strong> and products on the <strong>right-hand side (RHS)</strong>, separated by an arrow (→).
      <br /><br />
      A <strong>balanced chemical equation</strong> is one where the <strong>total number of atoms of each element on the LHS equals the total number on the RHS</strong> — following the Law of Conservation of Mass.<br /><br />
      Example: <code>CO(g) + 2H₂(g) → CH₃OH(l)</code> [at 340 atm]</>),
  },
  {
    q: "What is a combination reaction? Give examples.",
    a: (<>A <strong>combination reaction</strong> is one where <strong>two or more reactants combine to form a single product</strong>.
      <br /><br />
      Examples:<br />
      • <code>CaO(s) + H₂O(l) → Ca(OH)₂(aq)</code> — Quicklime + Water → Slaked lime<br />
      • <code>C(s) + O₂(g) → CO₂(g)</code> — Carbon + Oxygen → Carbon dioxide<br />
      • <code>2H₂(g) + O₂(g) → 2H₂O(l)</code> — Hydrogen + Oxygen → Water<br /><br />
      Most combination reactions are <strong>exothermic</strong> — they release heat.</>),
  },
  {
    q: "What is the difference between exothermic and endothermic reactions?",
    a: (<><strong>Exothermic reactions</strong> release heat/energy during the reaction. Most combination reactions are exothermic.<br />
      Example: <code>CaO(s) + H₂O(l) → Ca(OH)₂(aq)</code> + Heat<br /><br />
      <strong>Endothermic reactions</strong> absorb heat/energy during the reaction. All decomposition reactions are endothermic.<br />
      Example: <code>½N₂(g) + O₂(g) → NO₂(g)</code> (absorbs heat)<br /><br />
      Key rule: <strong>All decomposition reactions are endothermic</strong>. Most combination reactions are exothermic.</>),
  },
  {
    q: "What is a decomposition reaction? Give examples.",
    a: (<>A <strong>decomposition reaction</strong> is one where <strong>a single reactant breaks down into two or more simpler products</strong>. All decomposition reactions are endothermic (absorb heat).
      <br /><br />
      Examples:<br />
      • <code>2FeSO₄ →(Δ) Fe₂O₃ + SO₂ + SO₃</code> — Ferrous sulphate → Ferric oxide + gases<br />
      • <code>CaCO₃ →(Δ) CaO + CO₂</code> — Limestone → Quicklime + Carbon dioxide<br />
      • <code>2AgCl →(Δ) 2Ag + Cl₂</code> — Silver chloride → Silver + Chlorine</>),
  },
  {
    q: "What is a displacement reaction? Give examples.",
    a: (<>In a <strong>displacement reaction</strong>, a <strong>more reactive metal displaces a less reactive metal</strong> from its compound in aqueous solution. A less reactive metal cannot displace a more reactive one.
      <br /><br />
      Examples:<br />
      • <code>CuSO₄(aq) + Zn(s) → ZnSO₄(aq) + Cu(s)</code><br />
      Zinc (more reactive) displaces Copper from Copper sulphate solution. Solution changes from <strong>blue (CuSO₄) to colourless (ZnSO₄)</strong> and red copper deposits appear.<br /><br />
      • <code>Fe(s) + CuSO₄(aq) → Cu(s) + FeSO₄(aq)</code><br />
      Iron displaces Copper from Copper sulphate solution.</>),
  },
  {
    q: "What is a double displacement reaction? What are precipitation, neutralisation, and gas-forming reactions?",
    a: (<>A <strong>double displacement reaction</strong> involves the <strong>exchange of ions between two compounds</strong>.
      <br /><br />
      <code>Na₂SO₄(aq) + BaCl₂(s) → BaSO₄(aq) + 2NaCl(s)</code>
      <br /><br />
      Three special types of double displacement:
      <br /><br />
      • <strong>Precipitation reaction</strong>: Two aqueous solutions react, and one product is an <strong>insoluble salt (precipitate)</strong>.<br />
      • <strong>Neutralisation reaction</strong>: An acid reacts with a base, producing only <strong>salt and water</strong>.<br />
      • <strong>Gas-forming reaction</strong>: One product <strong>decomposes into or is formed as a gas</strong>.</>),
  },
  {
    q: "What is oxidation and reduction? Define with examples.",
    a: (<><strong>Oxidation</strong>: A substance <strong>gains oxygen OR loses hydrogen</strong>.
      <br />
      Example: <code>2Cu + O₂ →(Heat) 2CuO</code> — Copper gains oxygen → oxidised
      <br /><br />
      <strong>Reduction</strong>: A substance <strong>loses oxygen OR gains hydrogen</strong>.
      <br />
      Example: <code>CuO + H₂ →(Heat) Cu + H₂O</code> — CuO loses oxygen → reduced
      <br /><br />
      <strong>Redox reaction</strong>: A reaction where <strong>oxidation and reduction occur simultaneously</strong>. In the above example, CuO is reduced to Cu while H₂ is oxidised to H₂O.</>),
  },
  {
    q: "What is corrosion? What is rancidity? How are they related to oxidation?",
    a: (<><strong>Corrosion</strong> is the process where a <strong>metal is oxidised by the action of air (oxygen) and moisture</strong>, gradually deteriorating the metal. Example: Rusting of iron, greening of copper. <em>Prevention: metals are coated with paint, grease, or other metals.</em>
      <br /><br />
      <strong>Rancidity</strong> occurs when <strong>fats and oils are oxidised</strong> — their smell and taste change, making food unfit for consumption. <em>Prevention: food is stored in air-tight containers; antioxidants are added.</em>
      <br /><br />
      Both corrosion and rancidity are examples of <strong>oxidation in everyday life</strong>.</>),
  },
  {
    q: "How do you balance a chemical equation? What are the steps?",
    a: (<>To balance a chemical equation, follow these steps:
      <br /><br />
      <strong>Step 1:</strong> Write the <strong>unbalanced equation</strong> with correct chemical formulae of all reactants and products.
      <br />
      <strong>Step 2:</strong> Count the number of atoms of each element on both sides.
      <br />
      <strong>Step 3:</strong> Balance the element that appears in the <strong>maximum number of formulae first</strong> by adjusting coefficients.
      <br />
      <strong>Step 4:</strong> Balance <strong>other atoms</strong> one by one.
      <br />
      <strong>Step 5:</strong> Verify — total atoms of each element on LHS must equal RHS.
      <br /><br />
      The key principle is the <strong>Law of Conservation of Mass</strong>: matter is neither created nor destroyed in a chemical reaction.</>),
  },
];

export default function ChemicalReactionsAndEquations() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="cre-root">

        {/* HERO */}
        <div className="cre-hero">
          <div className="cre-hero-dots" />
          <div className="cre-glow" />
          <div className="cre-hero-ring" />
          <div className="cre-hero-bg-num">01</div>
          <div className="cre-hero-inner">
            <div className="cre-overline">Science · Class 10 · Chemistry · Chapter 1</div>
            <h1 className="cre-hero-title">
              <em>Chemical</em><br />
              <span className="em2">Reactions</span><br />
              &amp; Equations
            </h1>
            <div className="cre-hero-bar">
              {[
                { label: "Subject",  value: "Chemistry" },
                { label: "Class",   value: "10th Standard" },
                { label: "Chapter", value: "Chapter 1" },
                { label: "Board",   value: "CBSE / NCERT" },
              ].map((x) => (
                <div className="cre-hero-bar-item" key={x.label}>
                  <div className="cre-bar-label">{x.label}</div>
                  <div className="cre-bar-value">{x.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cre-body">

          {/* Intro */}
          <div className="cre-intro-card">
            <p>Chemistry is the science of <strong>change</strong>. Every time iron rusts, food cooks, or a rocket launches — a chemical reaction is at work. This chapter builds the language of chemistry: how to <strong>write, read, balance, and classify</strong> chemical reactions.</p>
            <p>Master these fundamentals and you have the foundation for all of Class 10 Chemistry.</p>
          </div>

          {/* S1: Indicators */}
          <div className="cre-sec-head">
            <div className="cre-sec-num">1</div>
            <div className="cre-sec-title-wrap">
              <div className="cre-sec-kicker">How to Recognise</div>
              <h2 className="cre-sec-title">Indicators of a <span>Chemical Reaction</span></h2>
            </div>
          </div>
          <p className="cre-body-text">In a chemical reaction, at least <strong>one of the following changes</strong> will occur. These observable changes tell us that new substances have been formed.</p>
          <div className="cre-indicators">
            {[
              { icon: "🧊→💧", label: "Change in State",        color: "var(--accent)" },
              { icon: "🎨",    label: "Change in Colour",       color: "var(--orange)" },
              { icon: "💨",    label: "Evolution of a Gas",     color: "var(--blue)" },
              { icon: "🌡️",   label: "Change in Temperature",   color: "var(--red)" },
              { icon: "🌫️",   label: "Formation of Precipitate",color: "var(--amber)" },
            ].map((ind) => (
              <div className="cre-indicator-card" key={ind.label}>
                <span className="cre-indicator-icon">{ind.icon}</span>
                <div className="cre-indicator-text">{ind.label}</div>
              </div>
            ))}
          </div>

          {/* S2: Chemical Equation & Balancing */}
          <div className="cre-divider"><div className="cre-divider-mark" /></div>
          <div className="cre-sec-head">
            <div className="cre-sec-num">2</div>
            <div className="cre-sec-title-wrap">
              <div className="cre-sec-kicker">Writing Chemistry</div>
              <h2 className="cre-sec-title">Chemical <span>Equations</span> &amp; Balancing</h2>
            </div>
          </div>
          <p className="cre-body-text">A <strong>chemical equation</strong> is the symbolic representation of a chemical reaction using formulae, signs, symbols, and directions. Reactants go on the <strong>left (LHS)</strong>, products on the <strong>right (RHS)</strong>.</p>

          <div className="cre-balance-box">
            <div className="cre-balance-title">⚖️ The Golden Rule — Law of Conservation of Mass</div>
            <div className="cre-balance-rule">A balanced equation must have the <strong>total number of atoms of each element equal on both sides</strong>. Matter cannot be created or destroyed in a chemical reaction.</div>
            <div className="cre-lhs-rhs">
              <div className="cre-side lhs">
                <div className="cre-side-label">Left-Hand Side</div>
                <div className="cre-side-val">Reactants</div>
              </div>
              <div className="cre-equals">=</div>
              <div className="cre-side rhs">
                <div className="cre-side-label">Right-Hand Side</div>
                <div className="cre-side-val">Products</div>
              </div>
            </div>
          </div>

          {/* Example balanced equation */}
          <div className="cre-eq-box">
            <div className="cre-eq-box-label">✅ Example — Balanced Equation</div>
            <div className="cre-eq-line">
              <div className="cre-eq-substance">
                <span className="cre-eq-formula">CO<sub>(g)</sub></span>
                <span className="cre-eq-name">Carbon monoxide</span>
              </div>
              <span className="cre-eq-plus">+</span>
              <div className="cre-eq-substance">
                <span className="cre-eq-formula">2H<sub>2</sub><sub>(g)</sub></span>
                <span className="cre-eq-name">Hydrogen</span>
              </div>
              <span className="cre-eq-condition">340 atm</span>
              <span className="cre-eq-arrow">→</span>
              <div className="cre-eq-substance">
                <span className="cre-eq-formula">CH<sub>3</sub>OH<sub>(l)</sub></span>
                <span className="cre-eq-name">Methanol</span>
              </div>
            </div>
          </div>

          <div className="cre-balance-box">
            <div className="cre-balance-title">📝 Steps to Balance an Equation</div>
            {[
              { n:"1", t:"Write reactants and products", d:"Use correct chemical formulae for all substances involved." },
              { n:"2", t:"Identify atom counts on each side", d:"Count every atom of every element on LHS and RHS." },
              { n:"3", t:"Balance the most complex formula first", d:"Add coefficients (not subscripts) to balance the element appearing in maximum formulae." },
              { n:"4", t:"Balance remaining atoms", d:"Work through each remaining element systematically." },
              { n:"5", t:"Verify — LHS atoms = RHS atoms", d:"Check every element is balanced. Never change subscripts — only coefficients." },
            ].map((s) => (
              <div key={s.n} style={{ display:"flex", gap:"12px", padding:"8px 0", borderBottom:"1px solid var(--rule)", alignItems:"flex-start" }}>
                <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:"18px", fontWeight:900, color:"var(--rule)", flexShrink:0, width:"22px" }}>{s.n}</span>
                <div>
                  <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:"14px", fontWeight:700, color:"var(--accent2)", marginBottom:"2px" }}>{s.t}</div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px", color:"var(--ink2)", lineHeight:"1.6" }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>

          {/* S3: Types of Reactions */}
          <div className="cre-divider"><div className="cre-divider-mark" /></div>
          <div className="cre-sec-head">
            <div className="cre-sec-num">3</div>
            <div className="cre-sec-title-wrap">
              <div className="cre-sec-kicker">Classification</div>
              <h2 className="cre-sec-title">Types of <span>Chemical Reactions</span></h2>
            </div>
          </div>
          <p className="cre-body-text">Chemical reactions can be classified into several types based on the nature of the change. Each type has a distinct pattern — learn the pattern and you can identify any reaction.</p>

          {/* Summary mini-table first */}
          <div className="cre-summary">
            <div className="cre-summary-hdr">
              <div className="cre-summary-th">Reaction Type</div>
              <div className="cre-summary-th">What Happens</div>
              <div className="cre-summary-th">Heat?</div>
            </div>
            {[
              ["Combination",         "A + B → AB (two → one)",                      "Exothermic (mostly)"],
              ["Decomposition",       "AB → A + B (one → many)",                     "Endothermic (always)"],
              ["Displacement",        "A + BC → AC + B (more reactive displaces)",   "—"],
              ["Double Displacement", "AB + CD → AD + CB (ion exchange)",            "—"],
              ["Redox",               "Oxidation + Reduction simultaneously",        "Varies"],
            ].map(([a, b, c]) => (
              <div className="cre-summary-row" key={a}>
                <div className="cre-summary-cell">{a}</div>
                <div className="cre-summary-cell">{b}</div>
                <div className="cre-summary-cell">{c}</div>
              </div>
            ))}
          </div>

          {/* 1. Combination */}
          <div className="cre-rxn-card combination">
            <div className="cre-rxn-header">
              <span className="cre-rxn-icon">🔗</span>
              <div className="cre-rxn-meta">
                <div className="cre-rxn-tag">Type 01</div>
                <div className="cre-rxn-name">Combination Reaction</div>
              </div>
            </div>
            <div className="cre-rxn-body">
              <div className="cre-rxn-def"><strong>Two or more reactants combine to form one single product.</strong> General form: A + B → AB. Most combination reactions are <strong>exothermic</strong> (release heat).</div>
              <span className="cre-sub-badge exo">🔥 Exothermic</span>
              <div className="cre-rxn-examples-label">Examples</div>
              <div className="cre-single-eq">
                <span className="cre-seq-formula">CaO<sub>(s)</sub></span>
                <span className="cre-seq-plus">+</span>
                <span className="cre-seq-formula">H<sub>2</sub>O<sub>(l)</sub></span>
                <span className="cre-seq-arrow">→</span>
                <span className="cre-seq-formula">Ca(OH)<sub>2</sub><sub>(aq)</sub></span>
                <span className="cre-seq-note">Quicklime + Water → Slaked lime [exothermic]</span>
              </div>
              <div className="cre-single-eq">
                <span className="cre-seq-formula">C<sub>(s)</sub></span>
                <span className="cre-seq-plus">+</span>
                <span className="cre-seq-formula">O<sub>2</sub><sub>(g)</sub></span>
                <span className="cre-seq-arrow">→</span>
                <span className="cre-seq-formula">CO<sub>2</sub><sub>(g)</sub></span>
                <span className="cre-seq-note">Carbon + Oxygen → Carbon dioxide</span>
              </div>
              <div className="cre-single-eq">
                <span className="cre-seq-formula">2H<sub>2</sub><sub>(g)</sub></span>
                <span className="cre-seq-plus">+</span>
                <span className="cre-seq-formula">O<sub>2</sub><sub>(g)</sub></span>
                <span className="cre-seq-arrow">→</span>
                <span className="cre-seq-formula">2H<sub>2</sub>O<sub>(l)</sub></span>
                <span className="cre-seq-note">Hydrogen + Oxygen → Water</span>
              </div>
            </div>
          </div>

          {/* 2. Decomposition */}
          <div className="cre-rxn-card decomp">
            <div className="cre-rxn-header">
              <span className="cre-rxn-icon">💥</span>
              <div className="cre-rxn-meta">
                <div className="cre-rxn-tag">Type 02</div>
                <div className="cre-rxn-name">Decomposition Reaction</div>
              </div>
            </div>
            <div className="cre-rxn-body">
              <div className="cre-rxn-def"><strong>A single reactant breaks down into two or more simpler products.</strong> General form: AB → A + B. All decomposition reactions are <strong>endothermic</strong> — they absorb heat/energy.</div>
              <span className="cre-sub-badge endo">❄️ Always Endothermic</span>
              <div className="cre-rxn-examples-label">Examples</div>
              <div className="cre-single-eq">
                <span className="cre-seq-formula">2FeSO<sub>4</sub></span>
                <span className="cre-seq-cond">Δ</span>
                <span className="cre-seq-arrow">→</span>
                <span className="cre-seq-formula">Fe<sub>2</sub>O<sub>3</sub></span>
                <span className="cre-seq-plus">+</span>
                <span className="cre-seq-formula">SO<sub>2</sub></span>
                <span className="cre-seq-plus">+</span>
                <span className="cre-seq-formula">SO<sub>3</sub></span>
                <span className="cre-seq-note">Ferrous sulphate → Ferric oxide + gases</span>
              </div>
              <div className="cre-single-eq">
                <span className="cre-seq-formula">CaCO<sub>3</sub></span>
                <span className="cre-seq-cond">Δ</span>
                <span className="cre-seq-arrow">→</span>
                <span className="cre-seq-formula">CaO</span>
                <span className="cre-seq-plus">+</span>
                <span className="cre-seq-formula">CO<sub>2</sub></span>
                <span className="cre-seq-note">Limestone → Quicklime + Carbon dioxide</span>
              </div>
              <div className="cre-single-eq">
                <span className="cre-seq-formula">2AgCl</span>
                <span className="cre-seq-cond">Sunlight</span>
                <span className="cre-seq-arrow">→</span>
                <span className="cre-seq-formula">2Ag</span>
                <span className="cre-seq-plus">+</span>
                <span className="cre-seq-formula">Cl<sub>2</sub></span>
                <span className="cre-seq-note">Silver chloride → Silver + Chlorine</span>
              </div>
            </div>
          </div>

          {/* 3. Displacement */}
          <div className="cre-rxn-card displacement">
            <div className="cre-rxn-header">
              <span className="cre-rxn-icon">⚔️</span>
              <div className="cre-rxn-meta">
                <div className="cre-rxn-tag">Type 03</div>
                <div className="cre-rxn-name">Displacement Reaction</div>
              </div>
            </div>
            <div className="cre-rxn-body">
              <div className="cre-rxn-def">A <strong>more reactive metal displaces a less reactive metal</strong> from its compound in aqueous solution. A less reactive metal <strong>cannot</strong> displace a more reactive metal.</div>
              <div className="cre-rxn-examples-label">Examples</div>
              <div className="cre-single-eq">
                <span className="cre-seq-formula">CuSO<sub>4</sub><sub>(aq)</sub></span>
                <span className="cre-seq-plus">+</span>
                <span className="cre-seq-formula">Zn<sub>(s)</sub></span>
                <span className="cre-seq-arrow">→</span>
                <span className="cre-seq-formula">ZnSO<sub>4</sub><sub>(aq)</sub></span>
                <span className="cre-seq-plus">+</span>
                <span className="cre-seq-formula">Cu<sub>(s)</sub></span>
                <span className="cre-seq-note">Blue → Colourless + Red copper deposits</span>
              </div>
              <div className="cre-single-eq">
                <span className="cre-seq-formula">Fe<sub>(s)</sub></span>
                <span className="cre-seq-plus">+</span>
                <span className="cre-seq-formula">CuSO<sub>4</sub><sub>(aq)</sub></span>
                <span className="cre-seq-arrow">→</span>
                <span className="cre-seq-formula">Cu<sub>(s)</sub></span>
                <span className="cre-seq-plus">+</span>
                <span className="cre-seq-formula">FeSO<sub>4</sub><sub>(aq)</sub></span>
                <span className="cre-seq-note">Iron displaces Copper</span>
              </div>
            </div>
          </div>

          {/* 4. Double Displacement */}
          <div className="cre-rxn-card double">
            <div className="cre-rxn-header">
              <span className="cre-rxn-icon">🔄</span>
              <div className="cre-rxn-meta">
                <div className="cre-rxn-tag">Type 04</div>
                <div className="cre-rxn-name">Double Displacement Reaction</div>
              </div>
            </div>
            <div className="cre-rxn-body">
              <div className="cre-rxn-def"><strong>Exchange of ions occurs between two compounds.</strong> Both compounds swap their respective ions. Includes precipitation, neutralisation, and gas-forming reactions.</div>
              <span className="cre-sub-badge prec">🌫️ Precipitation</span>
              <span className="cre-sub-badge neut">🧪 Neutralisation</span>
              <span className="cre-sub-badge gas">💨 Gas-Forming</span>
              <div className="cre-rxn-examples-label" style={{marginTop:"12px"}}>Main Example — Double Displacement</div>
              <div className="cre-single-eq">
                <span className="cre-seq-formula">Na<sub>2</sub>SO<sub>4</sub><sub>(aq)</sub></span>
                <span className="cre-seq-plus">+</span>
                <span className="cre-seq-formula">BaCl<sub>2</sub><sub>(s)</sub></span>
                <span className="cre-seq-arrow">→</span>
                <span className="cre-seq-formula">BaSO<sub>4</sub><sub>(aq)</sub></span>
                <span className="cre-seq-plus">+</span>
                <span className="cre-seq-formula">2NaCl<sub>(s)</sub></span>
                <span className="cre-seq-note">Sodium sulphate + Barium chloride → ions exchanged</span>
              </div>
              <div style={{ marginTop:"14px" }}>
                {[
                  { type:"Precipitation", def:"Two aqueous solutions react; one product is an insoluble salt (precipitate) formed." },
                  { type:"Neutralisation", def:"An acid reacts with a base; only salt and water are products." },
                  { type:"Gas-forming", def:"One product decomposes into or is formed as a gaseous compound." },
                ].map(d => (
                  <div key={d.type} style={{ padding:"8px 0", borderBottom:"1px solid var(--rule)" }}>
                    <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:"13px", fontWeight:700, color:"var(--accent2)" }}>{d.type}: </span>
                    <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px", color:"var(--ink2)", lineHeight:"1.6" }}>{d.def}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* S4: Oxidation, Reduction & Redox */}
          <div className="cre-divider"><div className="cre-divider-mark" /></div>
          <div className="cre-sec-head">
            <div className="cre-sec-num">4</div>
            <div className="cre-sec-title-wrap">
              <div className="cre-sec-kicker">Electron Transfer</div>
              <h2 className="cre-sec-title">Oxidation, Reduction &amp; <span>Redox</span></h2>
            </div>
          </div>
          <p className="cre-body-text">Oxidation and reduction always occur <strong>simultaneously</strong> in a reaction — one cannot happen without the other. Together they form a <strong>Redox reaction</strong>.</p>

          <div className="cre-redox-split">
            <div className="cre-redox-half ox">
              <div className="cre-redox-hdr">
                <div className="cre-redox-hdr-tag">Oxidation</div>
                <div className="cre-redox-hdr-name">Gains O₂ / Loses H₂</div>
              </div>
              <div className="cre-redox-body">
                <div className="cre-redox-def">A substance is <strong>oxidised</strong> when it <strong>gains oxygen</strong> or <strong>loses hydrogen</strong>.</div>
                <div className="cre-single-eq" style={{background:"var(--paper2)", border:"1px solid var(--rule)"}}>
                  <span className="cre-seq-formula" style={{color:"var(--orange)"}}>2Cu</span>
                  <span className="cre-seq-plus" style={{color:"var(--ink)"}}>+</span>
                  <span className="cre-seq-formula" style={{color:"var(--orange)"}}>O<sub>2</sub></span>
                  <span style={{color:"var(--orange)", margin:"0 8px", fontWeight:700}}>→</span>
                  <span className="cre-seq-formula" style={{color:"var(--orange)"}}>2CuO</span>
                  <span className="cre-seq-cond" style={{background:"var(--orange-lt)", color:"var(--orange)"}}>Heat</span>
                  <span className="cre-seq-note" style={{color:"var(--muted)"}}>Cu is oxidised</span>
                </div>
              </div>
            </div>
            <div className="cre-redox-half red">
              <div className="cre-redox-hdr">
                <div className="cre-redox-hdr-tag">Reduction</div>
                <div className="cre-redox-hdr-name">Loses O₂ / Gains H₂</div>
              </div>
              <div className="cre-redox-body">
                <div className="cre-redox-def">A substance is <strong>reduced</strong> when it <strong>loses oxygen</strong> or <strong>gains hydrogen</strong>.</div>
                <div className="cre-single-eq" style={{background:"var(--paper2)", border:"1px solid var(--rule)"}}>
                  <span className="cre-seq-formula" style={{color:"var(--blue)"}}>CuO</span>
                  <span className="cre-seq-plus" style={{color:"var(--ink)"}}>+</span>
                  <span className="cre-seq-formula" style={{color:"var(--blue)"}}>H<sub>2</sub></span>
                  <span style={{color:"var(--blue)", margin:"0 8px", fontWeight:700}}>→</span>
                  <span className="cre-seq-formula" style={{color:"var(--blue)"}}>Cu</span>
                  <span className="cre-seq-plus" style={{color:"var(--ink)"}}>+</span>
                  <span className="cre-seq-formula" style={{color:"var(--blue)"}}>H<sub>2</sub>O</span>
                  <span className="cre-seq-note" style={{color:"var(--muted)"}}>CuO is reduced</span>
                </div>
              </div>
            </div>
          </div>

          {/* Redox visual */}
          <div className="cre-redox-vis">
            <div className="cre-redox-vis-label">🔁 Redox Reaction — Simultaneous Oxidation &amp; Reduction</div>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:"11px", fontWeight:700, color:"rgba(253,186,116,0.8)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"4px" }}>← OXIDATION (H₂ gains O₂) →</div>
              <div className="cre-rv-eq-center">CuO + H<sub>2</sub> → Cu + H<sub>2</sub>O</div>
              <div style={{ fontFamily:"'Poppins',sans-serif", fontSize:"11px", fontWeight:700, color:"rgba(125,211,252,0.8)", letterSpacing:"0.1em", textTransform:"uppercase", marginTop:"4px" }}>← REDUCTION (CuO loses O₂) →</div>
            </div>
          </div>

          {/* S5: Oxidation in Everyday Life */}
          <div className="cre-divider"><div className="cre-divider-mark" /></div>
          <div className="cre-sec-head">
            <div className="cre-sec-num">5</div>
            <div className="cre-sec-title-wrap">
              <div className="cre-sec-kicker">Real-World Chemistry</div>
              <h2 className="cre-sec-title">Oxidation in <span>Everyday Life</span></h2>
            </div>
          </div>
          <p className="cre-body-text">Oxidation isn't just a lab phenomenon — it happens all around us. Two important everyday examples are <strong>corrosion</strong> and <strong>rancidity</strong>.</p>

          <div className="cre-everyday-grid">
            <div className="cre-everyday-card">
              <span className="cre-everyday-icon">🔩</span>
              <div className="cre-everyday-title">Corrosion</div>
              <div className="cre-everyday-text">When a <strong>metal is oxidised by the action of air (oxygen) and moisture</strong>, it gradually deteriorates. The most common example is <strong>rusting of iron</strong> and greening of copper.
              </div>
              <div className="cre-everyday-tip">💡 Prevention: Metals are coated with paint, oil, grease, zinc (galvanisation) or other metals.</div>
            </div>
            <div className="cre-everyday-card">
              <span className="cre-everyday-icon">🧈</span>
              <div className="cre-everyday-title">Rancidity</div>
              <div className="cre-everyday-text">When <strong>fats and oils are oxidised</strong>, their smell and taste change, making food unpleasant or unsafe to eat. This is why butter and ghee turn bad when left open.</div>
              <div className="cre-everyday-tip">💡 Prevention: Store food in air-tight containers; add antioxidants; use nitrogen flushing in packets.</div>
            </div>
          </div>

          <div className="cre-pull-quote">
            <p>"Corrosion and rancidity are both caused by oxidation — a slow but continuous reaction between oxygen in air and metals or fats. Prevention means blocking oxygen access."</p>
          </div>

          {/* FAQ */}
          <div className="cre-divider"><div className="cre-divider-mark" /></div>
          <div className="cre-faq-header"><span className="cre-faq-kicker">Exam Preparation</span></div>
          <h2 className="cre-faq-title">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div className={`cre-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="cre-faq-q" onClick={() => toggle(i)}>
                <span className="cre-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="cre-faq-icon">+</span>
              </button>
              <div className={`cre-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
