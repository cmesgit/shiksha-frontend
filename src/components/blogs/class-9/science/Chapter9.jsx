import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #1f1012;
    --ink2:       #382024;
    --muted:      #71515a;
    --paper:      #fff7f4;
    --paper2:     #fde8df;
    --accent:     #c2410c;
    --accent2:    #8a2c09;
    --accent-lt:  #ffedd5;
    --red:        #b91c1c;
    --red-lt:     #fee2e2;
    --green:      #15803d;
    --green-lt:   #dcfce7;
    --blue:       #1d4ed8;
    --blue-lt:    #dbeafe;
    --violet:     #6d28d9;
    --violet-lt:  #ede9fe;
    --amber:      #b45309;
    --amber-lt:   #fef3c7;
    --teal:       #0f766e;
    --teal-lt:    #ccfbf1;
    --rule:       #efb28d;
    --white:      #ffffff;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  .flm-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; overflow-x: hidden; }

  /* ══════════════════════════════════
     HERO — force vectors / collision theme
  ══════════════════════════════════ */
  .flm-hero {
    background: linear-gradient(135deg, #140302 0%, #260705 48%, #3a0b06 100%);
    min-height: 88vh; display: flex; align-items: flex-end;
    position: relative; overflow: hidden; padding: 0 0 64px;
  }
  @media (max-width: 700px) { .flm-hero { min-height: auto; align-items: flex-start; padding: 72px 0 48px; } }
  .flm-hero::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #c2410c 0%, #b91c1c 28%, #f59e0b 56%, #0f766e 78%, #6d28d9 100%);
  }
  .flm-hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(251,146,60,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251,146,60,0.06) 1px, transparent 1px),
      radial-gradient(circle, rgba(248,113,113,0.12) 1px, transparent 1px);
    background-size: 44px 44px, 44px 44px, 28px 28px; pointer-events: none;
  }
  .flm-vector-field { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
  .flm-vector-field span { position: absolute; display: block; height: 3px; background: linear-gradient(90deg, rgba(251,146,60,0), rgba(251,146,60,0.28)); border-radius: 999px; }
  .flm-vector-field span::after { content: ''; position: absolute; right: -1px; top: 50%; transform: translateY(-50%); border-left: 10px solid rgba(251,146,60,0.34); border-top: 6px solid transparent; border-bottom: 6px solid transparent; }
  .flm-vector-field span:nth-child(1) { width: 230px; right: 8%; top: 26%; transform: rotate(12deg); }
  .flm-vector-field span:nth-child(2) { width: 340px; left: 8%; top: 45%; transform: rotate(-8deg); }
  .flm-vector-field span:nth-child(3) { width: 270px; right: 19%; bottom: 24%; transform: rotate(-18deg); }
  .flm-force-ring {
    position: absolute; top: 50%; right: 5%; transform: translateY(-50%);
    width: clamp(160px, 25vw, 330px); height: clamp(160px, 25vw, 330px);
    border-radius: 50%; border: 1.5px solid rgba(251,146,60,0.14); pointer-events: none;
  }
  .flm-force-ring::before { content: ''; position: absolute; inset: 18%; border-radius: 50%; border: 1px dashed rgba(248,113,113,0.14); }
  .flm-force-ring::after { content: ''; position: absolute; inset: 39%; border-radius: 50%; background: rgba(251,146,60,0.08); box-shadow: 0 0 58px rgba(251,146,60,0.12); }
  .flm-glow-a { position: absolute; top: 14%; left: 5%; width: 310px; height: 310px; border-radius: 50%; background: radial-gradient(circle, rgba(248,113,113,0.18) 0%, transparent 68%); pointer-events: none; }
  .flm-glow-b { position: absolute; bottom: 9%; right: 18%; width: 230px; height: 230px; border-radius: 50%; background: radial-gradient(circle, rgba(245,158,11,0.13) 0%, transparent 72%); pointer-events: none; }
  .flm-hero-bg-num {
    position: absolute; bottom: -88px; right: -22px;
    font-family: 'Montserrat', sans-serif; font-size: clamp(210px, 35vw, 500px); font-weight: 900;
    line-height: 1; color: rgba(255,255,255,0.018); letter-spacing: -0.05em; user-select: none; pointer-events: none;
  }
  .flm-hero-inner { max-width: 900px; width: 100%; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
  .flm-overline { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #fdba74; margin-bottom: 24px; display: flex; align-items: center; gap: 14px; }
  .flm-overline::before, .flm-overline::after { content: ''; flex: 0 0 40px; height: 1px; background: #fdba74; }
  .flm-hero-title {
    font-family: 'Montserrat', sans-serif; font-size: clamp(34px, 7vw, 76px); font-weight: 900; color: #fff;
    line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 32px;
  }
  .flm-hero-title em { font-style: normal; color: #fdba74; }
  .flm-hero-title .flm-title-sub { display: block; color: #fecaca; }
  .flm-hero-bar { display: flex; flex-wrap: wrap; gap: 0; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; margin-top: 8px; }
  .flm-hero-bar-item { flex: 1 1 150px; padding: 0 24px 0 0; border-right: 1px solid rgba(255,255,255,0.08); margin-right: 24px; }
  .flm-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .flm-bar-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 5px; }
  .flm-bar-value { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.72); }

  /* ══════════════════════════════════
     BODY + COMMON ELEMENTS
  ══════════════════════════════════ */
  .flm-body { max-width: 880px; width: 100%; margin: 0 auto; padding: 72px 32px 100px; }
  .flm-intro {
    background: linear-gradient(135deg, #140302 0%, #3a0b06 100%);
    border-left: 5px solid var(--accent); border-radius: 5px; padding: 36px 40px;
    margin-bottom: 72px; position: relative; overflow: hidden;
  }
  .flm-intro::after { content: 'F'; position: absolute; right: 34px; top: 50%; transform: translateY(-50%); font-family: 'Montserrat', sans-serif; font-size: 128px; font-weight: 900; color: rgba(253,186,116,0.08); line-height: 1; }
  .flm-intro p { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 500; color: rgba(255,255,255,0.86); line-height: 1.8; margin: 0 0 14px; position: relative; z-index: 1; }
  .flm-intro p:last-child { margin: 0; }
  .flm-intro strong { color: #fdba74; }

  .flm-sec { margin-bottom: 8px; }
  .flm-divider { margin: 58px 0; display: flex; align-items: center; gap: 16px; }
  .flm-divider::before, .flm-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .flm-divider-mark { width: 9px; height: 9px; border-radius: 50%; background: var(--accent); flex-shrink: 0; box-shadow: 0 0 0 6px rgba(194,65,12,0.08); }

  .flm-sec-head { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 30px; border-bottom: 2px solid var(--rule); padding-bottom: 18px; }
  .flm-sec-num { font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900; color: var(--rule); line-height: 1; flex-shrink: 0; }
  .flm-sec-title-wrap { padding-top: 8px; }
  .flm-sec-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .flm-sec-title { font-family: 'Montserrat', sans-serif; font-size: clamp(22px, 3.6vw, 32px); font-weight: 900; color: var(--ink); line-height: 1.12; letter-spacing: -0.02em; }
  .flm-sec-title span { color: var(--accent); }
  .flm-body-text { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; color: var(--ink2); line-height: 1.85; margin-bottom: 28px; }
  .flm-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ══════════════════════════════════
     S1: BALANCED VS UNBALANCED FORCE
  ══════════════════════════════════ */
  .flm-force-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 28px; }
  @media (max-width: 680px) { .flm-force-grid { grid-template-columns: 1fr; } }
  .flm-force-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; }
  .flm-force-card.balanced { border-top: 5px solid var(--green); }
  .flm-force-card.unbalanced { border-top: 5px solid var(--red); }
  .flm-force-head { padding: 20px 22px 0; }
  .flm-force-tag { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 8px; }
  .flm-force-card.balanced .flm-force-tag { color: var(--green); }
  .flm-force-card.unbalanced .flm-force-tag { color: var(--red); }
  .flm-force-title { font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 10px; }
  .flm-force-text { font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.75; color: var(--ink2); padding: 0 22px 18px; }
  .flm-diagram { background: #fffaf7; border-top: 1px solid var(--rule); height: 260px; position: relative; overflow: hidden; }
  .flm-table-line { position: absolute; left: 12%; right: 12%; bottom: 78px; height: 8px; border-radius: 999px; background: #49322a; }
  .flm-block { position: absolute; left: 50%; bottom: 86px; transform: translateX(-50%); width: 96px; height: 54px; border-radius: 8px; background: linear-gradient(135deg, #fed7aa, #fb923c); border: 2px solid #9a3412; box-shadow: 0 10px 0 rgba(154,52,18,0.08); }
  .flm-arrow { position: absolute; height: 3px; background: var(--ink); border-radius: 999px; }
  .flm-arrow::after { content: ''; position: absolute; right: -2px; top: 50%; transform: translateY(-50%); border-left: 10px solid var(--ink); border-top: 6px solid transparent; border-bottom: 6px solid transparent; }
  .flm-arrow-label { position: absolute; font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; color: var(--ink2); white-space: normal; line-height: 1.25; max-width: 128px; }
  .flm-arrow.up { left: 50%; bottom: 148px; width: 52px; transform: translateX(-50%) rotate(-90deg); transform-origin: left center; background: var(--green); }
  .flm-arrow.up::after { border-left-color: var(--green); }
  .flm-arrow.down { left: 50%; bottom: 146px; width: 52px; transform: translateX(-50%) rotate(90deg); transform-origin: left center; background: var(--red); }
  .flm-arrow.down::after { border-left-color: var(--red); }
  .flm-label-n { left: 48%; top: 44px; color: var(--green); }
  .flm-label-w { left: calc(50% + 20px); top: 150px; color: var(--red); z-index: 5; background: rgba(255,237,213,0.86); padding: 0 4px; border-radius: 999px; }
  .flm-arrow.pull { left: 52%; top: 102px; width: 105px; background: var(--red); }
  .flm-arrow.pull::after { border-left-color: var(--red); }
  .flm-label-pull { left: auto; right: 18px; top: 78px; color: var(--red); text-align: right; }
  .flm-arrow.friction { right: 52%; top: 105px; width: 82px; transform: rotate(180deg); background: var(--muted); }
  .flm-arrow.friction::after { border-left-color: var(--muted); }
  .flm-label-friction { right: auto; left: 18px; top: 82px; color: var(--muted); text-align: left; }
  .flm-diagram-caption { position: absolute; left: 24px; right: 24px; bottom: 18px; font-family: 'Inter', sans-serif; font-size: 12.5px; color: var(--muted); line-height: 1.55; }
  .flm-force-card.unbalanced .flm-diagram { overflow: hidden; }
  .flm-force-card.unbalanced .flm-diagram-caption { padding-right: 6px; }

  .flm-result-strip { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 18px; }
  @media (max-width: 620px) { .flm-result-strip { grid-template-columns: 1fr; } }
  .flm-result-box { border-radius: 12px; padding: 18px 20px; font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.7; background: var(--white); border: 1.5px solid var(--rule); }
  .flm-result-box strong { font-family: 'Poppins', sans-serif; display: block; margin-bottom: 4px; }
  .flm-result-box.green { border-left: 5px solid var(--green); }
  .flm-result-box.red { border-left: 5px solid var(--red); }

  /* ══════════════════════════════════
     S2: FIRST LAW + INERTIA
  ══════════════════════════════════ */
  .flm-law-panel { background: linear-gradient(135deg, #140302, #3a0b06); color: #fff; border-radius: 12px; overflow: hidden; margin-bottom: 28px; position: relative; }
  .flm-law-panel::after { content: ''; position: absolute; right: -42px; bottom: -54px; width: 190px; height: 190px; border-radius: 50%; border: 1px dashed rgba(253,186,116,0.18); }
  .flm-law-inner { padding: 28px 30px; position: relative; z-index: 1; }
  .flm-law-no { font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 900; letter-spacing: 0.18em; text-transform: uppercase; color: #fdba74; margin-bottom: 10px; }
  .flm-law-title { font-family: 'Montserrat', sans-serif; font-size: clamp(24px, 4vw, 34px); font-weight: 900; letter-spacing: -0.03em; margin-bottom: 12px; }
  .flm-law-text { font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 500; color: rgba(255,255,255,0.84); line-height: 1.8; max-width: 720px; }
  .flm-inertia-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 18px; margin-bottom: 28px; }
  @media (max-width: 700px) { .flm-inertia-grid { grid-template-columns: 1fr; } }
  .flm-inertia-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 24px; position: relative; overflow: hidden; }
  .flm-inertia-card::before { content: ''; position: absolute; width: 130px; height: 130px; border-radius: 50%; right: -55px; top: -55px; background: rgba(194,65,12,0.06); }
  .flm-inertia-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; }
  .flm-inertia-title { font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900; margin-bottom: 10px; }
  .flm-inertia-text { font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.75; color: var(--ink2); }
  .flm-inertia-text strong { color: var(--accent2); font-weight: 600; }
  .flm-type-stack { display: grid; gap: 12px; }
  .flm-type-pill { background: var(--accent-lt); border-left: 5px solid var(--accent); border-radius: 10px; padding: 16px 18px; }
  .flm-type-title { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: var(--accent2); margin-bottom: 4px; }
  .flm-type-text { font-family: 'Inter', sans-serif; font-size: 13.2px; color: var(--ink2); line-height: 1.65; }
  .flm-mass-scale { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 22px 24px; margin-bottom: 28px; }
  .flm-scale-title { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; margin-bottom: 14px; }
  .flm-scale-row { display: grid; grid-template-columns: 90px 1fr 90px; gap: 14px; align-items: center; }
  .flm-scale-label { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; color: var(--muted); }
  .flm-scale-label:last-child { text-align: right; }
  .flm-scale-track { height: 12px; border-radius: 999px; background: linear-gradient(90deg, #fed7aa, #fb923c, #b91c1c); position: relative; }
  .flm-scale-track::before, .flm-scale-track::after { content: ''; position: absolute; top: 50%; transform: translateY(-50%); width: 18px; height: 18px; border-radius: 50%; background: #fff; border: 3px solid var(--accent); }
  .flm-scale-track::before { left: 8%; }
  .flm-scale-track::after { right: 8%; border-color: var(--red); }
  .flm-scale-note { margin-top: 12px; font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.65; }

  /* ══════════════════════════════════
     S3: MOMENTUM
  ══════════════════════════════════ */
  .flm-momentum-wrap { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 18px; margin-bottom: 30px; }
  @media (max-width: 700px) { .flm-momentum-wrap { grid-template-columns: 1fr; } }
  .flm-formula-card { background: linear-gradient(135deg, #111827, #1f2937); color: #fff; border-radius: 12px; padding: 26px 24px; position: relative; overflow: hidden; }
  .flm-formula-card::after { content: 'p'; position: absolute; right: 22px; bottom: -30px; font-family: 'Montserrat', sans-serif; font-size: 140px; font-weight: 900; color: rgba(255,255,255,0.045); }
  .flm-formula-kicker { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #fdba74; margin-bottom: 10px; }
  .flm-formula-title { font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900; margin-bottom: 12px; }
  .flm-formula-main { display: inline-flex; padding: 12px 16px; border-radius: 10px; background: rgba(253,186,116,0.12); border: 1px solid rgba(253,186,116,0.2); font-family: 'Poppins', sans-serif; font-size: 22px; font-weight: 700; color: #ffedd5; margin-bottom: 14px; }
  .flm-formula-text { font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.75); position: relative; z-index: 1; }
  .flm-momentum-details { display: grid; gap: 12px; }
  .flm-detail-item { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 18px 20px; display: grid; grid-template-columns: auto 1fr; gap: 16px; align-items: flex-start; }
  .flm-detail-icon { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; background: var(--accent-lt); color: var(--accent); }
  .flm-detail-title { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
  .flm-detail-text { font-family: 'Inter', sans-serif; font-size: 13.2px; line-height: 1.65; color: var(--ink2); }

  /* ══════════════════════════════════
     S4: SECOND LAW
  ══════════════════════════════════ */
  .flm-second-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 28px; }
  @media (max-width: 680px) { .flm-second-grid { grid-template-columns: 1fr; } }
  .flm-prop-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 22px 22px; position: relative; overflow: hidden; }
  .flm-prop-card.force { border-top: 5px solid var(--green); }
  .flm-prop-card.mass { border-top: 5px solid var(--red); }
  .flm-prop-symbol { font-family: 'Montserrat', sans-serif; font-size: 52px; font-weight: 900; line-height: 1; color: var(--rule); margin-bottom: 10px; }
  .flm-prop-title { font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900; margin-bottom: 8px; }
  .flm-prop-text { font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.75; color: var(--ink2); }
  .flm-equation-panel { background: linear-gradient(135deg, #1f0f0a, #4a1207); color: #fff; border-radius: 12px; overflow: hidden; margin-bottom: 28px; }
  .flm-equation-top { padding: 24px 26px; border-bottom: 1px solid rgba(255,255,255,0.1); display: grid; grid-template-columns: auto 1fr; gap: 20px; align-items: center; }
  .flm-eq-badge { width: 76px; height: 76px; border-radius: 20px; background: rgba(253,186,116,0.14); border: 1px solid rgba(253,186,116,0.24); display: flex; align-items: center; justify-content: center; font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900; color: #fdba74; }
  .flm-eq-title { font-family: 'Montserrat', sans-serif; font-size: 25px; font-weight: 900; margin-bottom: 6px; }
  .flm-eq-text { font-family: 'Inter', sans-serif; font-size: 14px; color: rgba(255,255,255,0.72); line-height: 1.7; }
  .flm-unit-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: rgba(255,255,255,0.1); }
  .flm-unit-box { background: rgba(20,3,2,0.58); padding: 18px 22px; }
  .flm-unit-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.42); margin-bottom: 6px; }
  .flm-unit-main { font-family: 'Poppins', sans-serif; font-size: 18px; font-weight: 700; color: #ffedd5; }
  .flm-momentum-rate { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 22px 24px; border-left: 5px solid var(--violet); }
  .flm-momentum-rate-title { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; color: var(--violet); margin-bottom: 8px; }
  .flm-momentum-rate-text { font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.75; color: var(--ink2); }

  /* ══════════════════════════════════
     S5: THIRD LAW
  ══════════════════════════════════ */
  .flm-action-panel { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; margin-bottom: 28px; }
  .flm-action-head { background: linear-gradient(135deg, #3a0b06, #111827); padding: 24px 26px; color: #fff; }
  .flm-action-kicker { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #fdba74; margin-bottom: 6px; }
  .flm-action-title { font-family: 'Montserrat', sans-serif; font-size: clamp(24px, 4vw, 34px); font-weight: 900; letter-spacing: -0.03em; }
  .flm-action-visual { position: relative; min-height: 230px; background: #fffaf7; padding: 34px 22px; overflow: hidden; }
  .flm-action-base { position: absolute; left: 8%; right: 8%; bottom: 52px; height: 10px; border-radius: 999px; background: #49322a; }
  .flm-action-object { position: absolute; top: 78px; width: 104px; height: 58px; border-radius: 10px; background: linear-gradient(135deg, #e0f2fe, #38bdf8); border: 2px solid #075985; }
  .flm-action-object.left { left: 20%; }
  .flm-action-object.right { right: 20%; background: linear-gradient(135deg, #fee2e2, #f87171); border-color: #991b1b; }
  .flm-action-arrow { position: absolute; top: 104px; height: 4px; border-radius: 999px; }
  .flm-action-arrow.rightward { left: calc(20% + 112px); width: 125px; background: var(--green); }
  .flm-action-arrow.rightward::after { content: ''; position: absolute; right: -2px; top: 50%; transform: translateY(-50%); border-left: 12px solid var(--green); border-top: 7px solid transparent; border-bottom: 7px solid transparent; }
  .flm-action-arrow.leftward { right: calc(20% + 112px); width: 125px; background: var(--red); transform: rotate(180deg); }
  .flm-action-arrow.leftward::after { content: ''; position: absolute; right: -2px; top: 50%; transform: translateY(-50%); border-left: 12px solid var(--red); border-top: 7px solid transparent; border-bottom: 7px solid transparent; }
  .flm-action-label { position: absolute; top: 48px; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; }
  .flm-action-label.action { left: 38%; color: var(--green); }
  .flm-action-label.reaction { right: 34%; color: var(--red); }
  .flm-action-note { position: absolute; left: 50%; bottom: 14px; transform: translateX(-50%); width: min(88%, 780px); font-family: 'Inter', sans-serif; font-size: 12.5px; line-height: 1.55; color: var(--muted); text-align: center; }
  .flm-horse-cart { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 30px; }
  @media (max-width: 700px) { .flm-horse-cart { grid-template-columns: 1fr; } }
  .flm-example-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 22px 24px; }
  .flm-example-card.question { border-left: 5px solid var(--red); }
  .flm-example-card.answer { border-left: 5px solid var(--green); }
  .flm-example-title { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; margin-bottom: 10px; }
  .flm-example-card.question .flm-example-title { color: var(--red); }
  .flm-example-card.answer .flm-example-title { color: var(--green); }
  .flm-example-text { font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.75; color: var(--ink2); }

  /* ══════════════════════════════════
     S6: CONSERVATION OF MOMENTUM
  ══════════════════════════════════ */
  .flm-conserve-panel { background: linear-gradient(135deg, #07231d, #0f766e); color: #fff; border-radius: 12px; overflow: hidden; margin-bottom: 28px; position: relative; }
  .flm-conserve-panel::after { content: ''; position: absolute; right: -42px; top: -50px; width: 170px; height: 170px; border-radius: 50%; border: 1px dashed rgba(204,251,241,0.18); }
  .flm-conserve-content { padding: 28px 30px; position: relative; z-index: 1; }
  .flm-conserve-kicker { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #99f6e4; margin-bottom: 8px; }
  .flm-conserve-title { font-family: 'Montserrat', sans-serif; font-size: clamp(24px, 4vw, 34px); font-weight: 900; letter-spacing: -0.03em; margin-bottom: 12px; }
  .flm-conserve-text { font-family: 'Inter', sans-serif; font-size: 15px; line-height: 1.75; color: rgba(255,255,255,0.82); max-width: 720px; }
  .flm-collision-strip { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 24px; margin-bottom: 28px; }
  .flm-collision-title { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; margin-bottom: 18px; color: var(--teal); }
  .flm-collision-track { position: relative; height: 110px; background: #f6fffc; border: 1px solid #bae6fd; border-radius: 10px; overflow: hidden; margin-bottom: 18px; }
  .flm-collision-track::before { content: ''; position: absolute; left: 6%; right: 6%; top: 50%; height: 4px; background: rgba(15,118,110,0.16); border-radius: 999px; }
  .flm-ball { position: absolute; top: 50%; transform: translateY(-50%); width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; color: #fff; }
  .flm-ball.a { left: 18%; background: var(--blue); box-shadow: 0 0 0 8px rgba(29,78,216,0.08); }
  .flm-ball.b { right: 18%; background: var(--accent); box-shadow: 0 0 0 8px rgba(194,65,12,0.08); }
  .flm-collision-arrow { position: absolute; top: 50%; height: 3px; width: 110px; background: var(--teal); border-radius: 999px; }
  .flm-collision-arrow::after { content: ''; position: absolute; right: -1px; top: 50%; transform: translateY(-50%); border-left: 10px solid var(--teal); border-top: 6px solid transparent; border-bottom: 6px solid transparent; }
  .flm-collision-arrow.a { left: calc(18% + 50px); }
  .flm-collision-arrow.b { right: calc(18% + 50px); transform: rotate(180deg); }
  .flm-conservation-formula { display: flex; align-items: center; justify-content: center; text-align: center; background: var(--teal-lt); border: 1px solid rgba(15,118,110,0.22); color: #115e59; border-radius: 10px; padding: 16px 18px; font-family: 'Poppins', sans-serif; font-size: clamp(15px, 3vw, 20px); font-weight: 700; line-height: 1.6; }

  /* ══════════════════════════════════
     REVISION + FAQ
  ══════════════════════════════════ */
  .flm-revision-box { background: var(--white); border: 1.5px solid var(--rule); border-radius: 14px; overflow: hidden; margin: 62px 0 72px; }
  .flm-revision-head { background: linear-gradient(135deg, #140302, #3a0b06); padding: 22px 26px; }
  .flm-revision-title { font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900; color: #fff; }
  .flm-revision-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--rule); }
  .flm-revision-point { background: #fffaf7; padding: 16px 20px; display: flex; gap: 12px; align-items: flex-start; font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.6; color: var(--ink2); }
  .flm-check { flex: 0 0 auto; width: 22px; height: 22px; border-radius: 50%; background: var(--accent); color: #fff; display: inline-flex; align-items: center; justify-content: center; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; }

  .flm-faq-title { font-family: 'Montserrat', sans-serif; font-size: clamp(28px, 5vw, 42px); font-weight: 900; letter-spacing: -0.035em; color: var(--ink); margin-bottom: 22px; }
  .flm-faq-list { display: grid; gap: 12px; }
  .flm-faq-item { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; }
  .flm-faq-item.open { border-color: rgba(194,65,12,0.35); box-shadow: 0 10px 28px rgba(194,65,12,0.08); }
  .flm-faq-q { width: 100%; border: none; background: transparent; display: flex; justify-content: space-between; align-items: center; gap: 16px; text-align: left; padding: 18px 20px; cursor: pointer; }
  .flm-faq-q-text { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 700; color: var(--ink); line-height: 1.45; }
  .flm-faq-icon { flex: 0 0 auto; width: 28px; height: 28px; border-radius: 50%; background: var(--accent-lt); color: var(--accent); display: inline-flex; align-items: center; justify-content: center; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; }
  .flm-faq-ans { display: none; padding: 0 20px 18px; font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.75; color: var(--ink2); }
  .flm-faq-ans.visible { display: block; }

  @media (max-width: 700px) {
    .flm-hero-inner { padding: 0 18px; }
    .flm-hero-title { font-size: clamp(38px, 11vw, 58px); margin-bottom: 24px; }
    .flm-overline { font-size: 10px; letter-spacing: 0.16em; }
    .flm-overline::before, .flm-overline::after { flex-basis: 26px; }
    .flm-hero-bar { gap: 12px; }
    .flm-hero-bar-item { flex: 1 1 120px; padding: 0 14px 0 0; margin-right: 14px; }
    .flm-bar-label { font-size: 9px; letter-spacing: 0.12em; }
    .flm-bar-value { font-size: 13px; }
    .flm-body { padding: 48px 18px 72px; }
    .flm-intro { padding: 26px 22px; margin-bottom: 58px; }
    .flm-intro p { font-size: 15.5px; }
    .flm-sec-head { gap: 14px; }
    .flm-sec-num { font-size: 44px; }
    .flm-diagram { height: 280px; }
    .flm-arrow.pull { width: 80px; }
    .flm-arrow.friction { width: 64px; }
    .flm-label-pull { left: auto; right: 16px; top: 78px; max-width: 104px; text-align: right; }
    .flm-label-friction { right: auto; left: 16px; top: 82px; max-width: 96px; text-align: left; }
    .flm-scale-row { grid-template-columns: minmax(68px, auto) minmax(120px, 1fr) minmax(74px, auto); gap: 8px; align-items: center; }
    .flm-equation-top { grid-template-columns: 1fr; }
    .flm-unit-row { grid-template-columns: 1fr; }
    .flm-action-object.left { left: 10%; }
    .flm-action-object.right { right: 10%; }
    .flm-action-arrow.rightward { left: calc(10% + 112px); width: 80px; }
    .flm-action-arrow.leftward { right: calc(10% + 112px); width: 80px; }
    .flm-action-label.action { left: 34%; }
    .flm-action-label.reaction { right: 26%; }
    .flm-collision-arrow { width: 64px; }
    .flm-revision-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 480px) {
    .flm-force-ring, .flm-hero-bg-num { opacity: 0.55; }
    .flm-force-title, .flm-inertia-title, .flm-prop-title { font-size: 20px; }
    .flm-diagram { height: 292px; }
    .flm-block { width: 82px; height: 50px; }
    .flm-action-visual { min-height: 260px; }
    .flm-action-object { width: 78px; height: 50px; }
    .flm-action-arrow.rightward { left: calc(10% + 86px); width: 58px; top: 102px; }
    .flm-action-arrow.leftward { right: calc(10% + 86px); width: 58px; top: 102px; }
    .flm-action-label.action { left: 24%; top: 44px; }
    .flm-action-label.reaction { right: 18%; top: 44px; }
    .flm-action-note { width: calc(100% - 32px); bottom: 12px; }
    .flm-arrow-label { font-size: 10px; max-width: 86px; }
    .flm-label-pull { right: 12px; top: 78px; }
    .flm-label-friction { left: 12px; top: 82px; }
    .flm-scale-row { grid-template-columns: 64px minmax(96px, 1fr) 72px; gap: 7px; }
    .flm-scale-label { font-size: 10.5px; letter-spacing: -0.01em; }

    .flm-collision-track { height: 126px; }
    .flm-ball.a { left: 12%; }
    .flm-ball.b { right: 12%; }
    .flm-collision-arrow.a { left: calc(12% + 50px); }
    .flm-collision-arrow.b { right: calc(12% + 50px); }
  }
`;

const faqs = [
  {
    q: "What is balanced force?",
    a: "Balanced force means the total force acting on a body cancels out. Because of this, there is no change in the state of rest or motion of the body."
  },
  {
    q: "What is unbalanced force?",
    a: "Unbalanced force means a net force acts on the body. It can change the state of rest or motion of the body."
  },
  {
    q: "What does the first law of motion state?",
    a: "A body at rest remains at rest and a body in uniform motion continues in uniform motion unless an external force is applied."
  },
  {
    q: "What is inertia?",
    a: "Inertia is the tendency of a body to resist any change in its state of rest or uniform motion along a straight line."
  },
  {
    q: "How is mass related to inertia?",
    a: "Mass is the measure of inertia. Greater mass means greater inertia, so a heavier object resists change in motion more strongly."
  },
  {
    q: "What is momentum?",
    a: "Momentum is the product of the mass and velocity of a body. It is a vector quantity and its SI unit is kg m/s."
  },
  {
    q: "What does the second law of motion explain?",
    a: "The second law explains that acceleration produced in a body is directly proportional to the applied force and inversely proportional to the mass of the body. It gives the relation F = ma."
  },
  {
    q: "What is one Newton?",
    a: "One Newton is the force required to produce an acceleration of 1 m/s² in a body of mass 1 kg. Therefore, 1 N = 1 kg × 1 m/s²."
  },
  {
    q: "What does the third law of motion state?",
    a: "For every action force, there is an equal and opposite reaction force."
  },
  {
    q: "What is conservation of momentum?",
    a: "Momentum of a system remains conserved when there is no net external force acting on the system. Momentum before collision equals momentum after collision."
  }
];

const revisionPoints = [
  "Balanced forces cancel each other and do not change the state of motion.",
  "Unbalanced force produces a net force and can change rest or motion.",
  "First law of motion is also linked with inertia.",
  "Inertia is the resistance to change in rest or uniform motion.",
  "Mass is the measure of inertia; more mass means more inertia.",
  "Momentum = Mass × Velocity and its SI unit is kg m/s.",
  "Second law gives F = ma and the unit of force is Newton.",
  "Third law says every action has an equal and opposite reaction.",
  "Momentum remains conserved if no net external force acts on the system."
];

export default function ForceAndLawsOfMotionChapter() {
  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (index) => setOpenIndex(openIndex === index ? -1 : index);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="flm-root">
        <div className="flm-hero">
          <div className="flm-hero-grid" />
          <div className="flm-vector-field"><span /><span /><span /></div>
          <div className="flm-force-ring" />
          <div className="flm-glow-a" />
          <div className="flm-glow-b" />
          <div className="flm-hero-bg-num">9</div>
          <div className="flm-hero-inner">
            <div className="flm-overline">Class 9 · Science · Chapter 9</div>
            <h1 className="flm-hero-title">
              Force and Laws<br />
              <em>of Motion</em>
            </h1>
            <div className="flm-hero-bar">
              <div className="flm-hero-bar-item">
                <div className="flm-bar-label">Subject</div>
                <div className="flm-bar-value">Science — Physics</div>
              </div>
              <div className="flm-hero-bar-item">
                <div className="flm-bar-label">Topics</div>
                <div className="flm-bar-value">Force · Inertia · Momentum</div>
              </div>
              <div className="flm-hero-bar-item">
                <div className="flm-bar-label">Board</div>
                <div className="flm-bar-value">CBSE · NCERT</div>
              </div>
              <div className="flm-hero-bar-item">
                <div className="flm-bar-label">FAQs</div>
                <div className="flm-bar-value">10 Questions</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flm-body">
          <div className="flm-intro">
            <p><strong>Force and Laws of Motion</strong> explains why bodies remain at rest, why moving bodies continue to move, and how force changes the motion of an object.</p>
            <p>This chapter connects balanced and unbalanced forces with inertia, momentum, Newton's three laws of motion, and conservation of momentum.</p>
          </div>

          {/* S1 */}
          <div className="flm-sec">
            <div className="flm-sec-head">
              <div className="flm-sec-num">1</div>
              <div className="flm-sec-title-wrap">
                <div className="flm-sec-kicker">Net Force</div>
                <h2 className="flm-sec-title">Balanced &amp; <span>Unbalanced Force</span></h2>
              </div>
            </div>
            <p className="flm-body-text">A force can either keep the body in the same state or change its state of rest or motion. The key difference depends on whether the total force becomes zero or not.</p>

            <div className="flm-force-grid">
              <div className="flm-force-card balanced">
                <div className="flm-force-head">
                  <div className="flm-force-tag">No Change in Motion</div>
                  <div className="flm-force-title">Balanced Force</div>
                </div>
                <div className="flm-force-text">If the total force acting on a body cancels out, there is no change in the state of rest or motion. The forces are called balanced forces.</div>
                <div className="flm-diagram">
                  <div className="flm-table-line" />
                  <div className="flm-block" />
                  <div className="flm-arrow up" />
                  <div className="flm-arrow down" />
                  <div className="flm-arrow-label flm-label-n">N</div>
                  <div className="flm-arrow-label flm-label-w">W</div>
                  <div className="flm-diagram-caption">Normal reaction balances the force due to gravity, so the block does not move vertically.</div>
                </div>
              </div>

              <div className="flm-force-card unbalanced">
                <div className="flm-force-head">
                  <div className="flm-force-tag">Change in Motion</div>
                  <div className="flm-force-title">Unbalanced Force</div>
                </div>
                <div className="flm-force-text">When a net force acts on a body, it can change the state of rest or motion. This is called unbalanced force.</div>
                <div className="flm-diagram">
                  <div className="flm-table-line" />
                  <div className="flm-block" />
                  <div className="flm-arrow pull" />
                  <div className="flm-arrow friction" />
                  <div className="flm-arrow-label flm-label-pull">Applied Pull Fa</div>
                  <div className="flm-arrow-label flm-label-friction">Friction Ff</div>
                  <div className="flm-diagram-caption">If the external pull is greater than friction, the block moves horizontally towards the right.</div>
                </div>
              </div>
            </div>

            <div className="flm-result-strip">
              <div className="flm-result-box green"><strong>Balanced Result</strong>No net force. No change in rest or motion.</div>
              <div className="flm-result-box red"><strong>Unbalanced Result</strong>Net force is present. Motion can change.</div>
            </div>
          </div>

          {/* S2 */}
          <div className="flm-divider"><div className="flm-divider-mark" /></div>
          <div className="flm-sec">
            <div className="flm-sec-head">
              <div className="flm-sec-num">2</div>
              <div className="flm-sec-title-wrap">
                <div className="flm-sec-kicker">Newton's First Law</div>
                <h2 className="flm-sec-title">First Law &amp; <span>Inertia</span></h2>
              </div>
            </div>

            <div className="flm-law-panel">
              <div className="flm-law-inner">
                <div className="flm-law-no">First Law of Motion</div>
                <div className="flm-law-title">A body continues its state unless external force acts.</div>
                <div className="flm-law-text">A body at rest remains at rest and a body in uniform motion continues its uniform motion unless an external force is applied.</div>
              </div>
            </div>

            <div className="flm-inertia-grid">
              <div className="flm-inertia-card">
                <div className="flm-inertia-label">Resistance to Change</div>
                <div className="flm-inertia-title">What is Inertia?</div>
                <div className="flm-inertia-text">Inertia is the tendency of a body to resist any change in its state of rest or uniform motion along a straight line. It explains why objects do not start or stop moving on their own.</div>
              </div>
              <div className="flm-inertia-card">
                <div className="flm-inertia-label">Types Mentioned</div>
                <div className="flm-type-stack">
                  <div className="flm-type-pill"><div className="flm-type-title">Inertia of Rest</div><div className="flm-type-text">A body at rest tends to remain at rest.</div></div>
                  <div className="flm-type-pill"><div className="flm-type-title">Inertia of Motion</div><div className="flm-type-text">A moving body tends to remain in uniform motion.</div></div>
                </div>
              </div>
            </div>

            <div className="flm-mass-scale">
              <div className="flm-scale-title">Mass is the measure of inertia</div>
              <div className="flm-scale-row">
                <div className="flm-scale-label">Less Mass</div>
                <div className="flm-scale-track" />
                <div className="flm-scale-label">More Mass</div>
              </div>
              <div className="flm-scale-note">More mass means more inertia. Therefore, a heavier object is harder to move, stop, or change in motion.</div>
            </div>
          </div>

          {/* S3 */}
          <div className="flm-divider"><div className="flm-divider-mark" /></div>
          <div className="flm-sec">
            <div className="flm-sec-head">
              <div className="flm-sec-num">3</div>
              <div className="flm-sec-title-wrap">
                <div className="flm-sec-kicker">Mass in Motion</div>
                <h2 className="flm-sec-title">Momentum &amp; <span>Its Unit</span></h2>
              </div>
            </div>
            <p className="flm-body-text"><strong>Momentum</strong> describes the quantity of motion possessed by a body. It depends on both mass and velocity.</p>

            <div className="flm-momentum-wrap">
              <div className="flm-formula-card">
                <div className="flm-formula-kicker">Formula</div>
                <div className="flm-formula-title">Momentum</div>
                <div className="flm-formula-main">p = m × v</div>
                <div className="flm-formula-text">Momentum is the product of mass and velocity. Since velocity has direction, momentum is also a vector quantity.</div>
              </div>
              <div className="flm-momentum-details">
                <div className="flm-detail-item"><div className="flm-detail-icon">m</div><div><div className="flm-detail-title">Mass</div><div className="flm-detail-text">Mass of the body contributes to momentum.</div></div></div>
                <div className="flm-detail-item"><div className="flm-detail-icon">v</div><div><div className="flm-detail-title">Velocity</div><div className="flm-detail-text">Velocity gives both magnitude and direction to momentum.</div></div></div>
                <div className="flm-detail-item"><div className="flm-detail-icon">SI</div><div><div className="flm-detail-title">SI Unit</div><div className="flm-detail-text">The SI unit of momentum is kg m/s.</div></div></div>
              </div>
            </div>
          </div>

          {/* S4 */}
          <div className="flm-divider"><div className="flm-divider-mark" /></div>
          <div className="flm-sec">
            <div className="flm-sec-head">
              <div className="flm-sec-num">4</div>
              <div className="flm-sec-title-wrap">
                <div className="flm-sec-kicker">Newton's Second Law</div>
                <h2 className="flm-sec-title">Force, Mass &amp; <span>Acceleration</span></h2>
              </div>
            </div>
            <p className="flm-body-text">The second law says that when force is applied to a body, acceleration is produced in the direction of the force. The acceleration increases with force and decreases with mass.</p>

            <div className="flm-second-grid">
              <div className="flm-prop-card force">
                <div className="flm-prop-symbol">F↑</div>
                <div className="flm-prop-title">Acceleration increases with force</div>
                <div className="flm-prop-text">Acceleration is directly proportional to the applied unbalanced force.</div>
              </div>
              <div className="flm-prop-card mass">
                <div className="flm-prop-symbol">m↑</div>
                <div className="flm-prop-title">Acceleration decreases with mass</div>
                <div className="flm-prop-text">Acceleration is inversely proportional to the mass of the body.</div>
              </div>
            </div>

            <div className="flm-equation-panel">
              <div className="flm-equation-top">
                <div className="flm-eq-badge">F</div>
                <div>
                  <div className="flm-eq-title">F = ma</div>
                  <div className="flm-eq-text">Force equals mass multiplied by acceleration. The direction of change in momentum is the same as the direction of the unbalanced force.</div>
                </div>
              </div>
              <div className="flm-unit-row">
                <div className="flm-unit-box"><div className="flm-unit-label">Unit of Force</div><div className="flm-unit-main">Newton (N)</div></div>
                <div className="flm-unit-box"><div className="flm-unit-label">One Newton</div><div className="flm-unit-main">1 N = 1 kg × 1 m/s<sup>2</sup></div></div>
              </div>
            </div>

            <div className="flm-momentum-rate">
              <div className="flm-momentum-rate-title">Rate of change of momentum</div>
              <div className="flm-momentum-rate-text">The rate of change of momentum is proportional to the applied unbalanced force. This is the momentum form of Newton's second law.</div>
            </div>
          </div>

          {/* S5 */}
          <div className="flm-divider"><div className="flm-divider-mark" /></div>
          <div className="flm-sec">
            <div className="flm-sec-head">
              <div className="flm-sec-num">5</div>
              <div className="flm-sec-title-wrap">
                <div className="flm-sec-kicker">Newton's Third Law</div>
                <h2 className="flm-sec-title">Action &amp; <span>Reaction</span></h2>
              </div>
            </div>

            <div className="flm-action-panel">
              <div className="flm-action-head">
                <div className="flm-action-kicker">Equal and Opposite</div>
                <div className="flm-action-title">For every action force, there is an equal and opposite reaction force.</div>
              </div>
              <div className="flm-action-visual">
                <div className="flm-action-base" />
                <div className="flm-action-object left" />
                <div className="flm-action-object right" />
                <div className="flm-action-arrow rightward" />
                <div className="flm-action-arrow leftward" />
                <div className="flm-action-label action">Action</div>
                <div className="flm-action-label reaction">Reaction</div>
                <div className="flm-action-note">The forces act on different bodies, are equal in magnitude, and opposite in direction.</div>
              </div>
            </div>

            <div className="flm-horse-cart">
              <div className="flm-example-card question">
                <div className="flm-example-title">Horse and Cart Question</div>
                <div className="flm-example-text">If the horse pulls the cart forward and the cart pulls the horse backward with equal force, why does the cart move forward?</div>
              </div>
              <div className="flm-example-card answer">
                <div className="flm-example-title">The Reason</div>
                <div className="flm-example-text">Apart from the pull between horse and cart, frictional force and the reaction of the ground are also present. The resultant of the ground reaction and friction helps the horse move the cart forward.</div>
              </div>
            </div>
          </div>

          {/* S6 */}
          <div className="flm-divider"><div className="flm-divider-mark" /></div>
          <div className="flm-sec">
            <div className="flm-sec-head">
              <div className="flm-sec-num">6</div>
              <div className="flm-sec-title-wrap">
                <div className="flm-sec-kicker">System Momentum</div>
                <h2 className="flm-sec-title">Conservation of <span>Momentum</span></h2>
              </div>
            </div>

            <div className="flm-conserve-panel">
              <div className="flm-conserve-content">
                <div className="flm-conserve-kicker">Principle</div>
                <div className="flm-conserve-title">Momentum remains conserved when no net external force acts.</div>
                <div className="flm-conserve-text">The total momentum of a system is always conserved when there is no net external force on the system. This means momentum before collision equals momentum after collision.</div>
              </div>
            </div>

            <div className="flm-collision-strip">
              <div className="flm-collision-title">Collision Formula</div>
              <div className="flm-collision-track">
                <div className="flm-ball a">A</div>
                <div className="flm-ball b">B</div>
                <div className="flm-collision-arrow a" />
                <div className="flm-collision-arrow b" />
              </div>
              <div className="flm-conservation-formula">m<sub>A</sub>u<sub>A</sub> + m<sub>B</sub>u<sub>B</sub> = m<sub>A</sub>v<sub>A</sub> + m<sub>B</sub>v<sub>B</sub></div>
            </div>
          </div>

          <div className="flm-revision-box">
            <div className="flm-revision-head"><div className="flm-revision-title">Quick Revision Snapshot</div></div>
            <div className="flm-revision-grid">
              {revisionPoints.map((point, i) => (
                <div className="flm-revision-point" key={i}><span className="flm-check">✓</span><span>{point}</span></div>
              ))}
            </div>
          </div>

          <h2 className="flm-faq-title">Frequently Asked Questions</h2>
          <div className="flm-faq-list">
            {faqs.map((item, i) => (
              <div className={`flm-faq-item ${openIndex === i ? 'open' : ''}`} key={i}>
                <button className="flm-faq-q" onClick={() => toggle(i)}>
                  <span className="flm-faq-q-text">{item.q}</span>
                  <span className="flm-faq-icon">{openIndex === i ? '▴' : '▾'}</span>
                </button>
                <div className={`flm-faq-ans ${openIndex === i ? 'visible' : ''}`}>{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
