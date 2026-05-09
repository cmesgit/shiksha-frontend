import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #101126;
    --ink2:       #262645;
    --muted:      #62658a;
    --paper:      #f5f3ff;
    --paper2:     #e9e5ff;
    --accent:     #6d28d9;
    --accent2:    #4c1d95;
    --accent-lt:  #ede9fe;
    --cosmic:     #0b1026;
    --cyan:       #0891b2;
    --cyan-lt:    #cffafe;
    --gold:       #b45309;
    --gold-lt:    #fef3c7;
    --green:      #15803d;
    --green-lt:   #dcfce7;
    --rose:       #be123c;
    --rose-lt:    #ffe4e6;
    --blue:       #1d4ed8;
    --blue-lt:    #dbeafe;
    --rule:       #c4b5fd;
    --white:      #ffffff;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  .grav-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  /* ═════════════════ HERO — cosmic gravity theme ═════════════════ */
  .grav-hero {
    background: radial-gradient(circle at 70% 26%, rgba(34,211,238,0.11) 0%, transparent 28%),
                radial-gradient(circle at 18% 18%, rgba(167,139,250,0.16) 0%, transparent 32%),
                linear-gradient(135deg, #050617 0%, #0a0b24 48%, #120a2f 100%);
    min-height: 88vh;
    display: flex;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
    padding: 0 0 64px;
  }
  @media (max-width: 700px) { .grav-hero { min-height: auto; align-items: flex-start; padding: 72px 0 48px; } }
  .grav-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 6px;
    background: linear-gradient(90deg, #6d28d9 0%, #0891b2 36%, #f59e0b 70%, #be123c 100%);
  }
  .grav-hero-stars {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px);
    background-size: 32px 32px;
    opacity: 0.55;
    pointer-events: none;
  }
  .grav-orbit-system {
    position: absolute;
    top: 50%; right: 4%;
    width: clamp(170px, 26vw, 340px);
    height: clamp(170px, 26vw, 340px);
    transform: translateY(-50%);
    pointer-events: none;
  }
  .grav-orbit-system::before,
  .grav-orbit-system::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    border: 1.5px solid rgba(196,181,253,0.16);
  }
  .grav-orbit-system::before { inset: 3%; }
  .grav-orbit-system::after { inset: 22%; border-style: dashed; opacity: 0.75; }
  .grav-planet-big {
    position: absolute;
    left: 50%; top: 50%;
    width: 68px; height: 68px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: radial-gradient(circle at 35% 28%, rgba(255,255,255,0.35), rgba(109,40,217,0.18) 34%, rgba(109,40,217,0.05) 70%);
    border: 1px solid rgba(196,181,253,0.14);
  }
  .grav-planet-small {
    position: absolute;
    right: 18%; top: 20%;
    width: 16px; height: 16px;
    border-radius: 50%;
    background: rgba(34,211,238,0.35);
    box-shadow: 0 0 22px rgba(34,211,238,0.28);
  }
  .grav-glow-a { position: absolute; top: 14%; left: 5%; width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(109,40,217,0.20) 0%, transparent 70%); pointer-events: none; }
  .grav-glow-b { position: absolute; bottom: 8%; right: 18%; width: 230px; height: 230px; border-radius: 50%; background: radial-gradient(circle, rgba(8,145,178,0.13) 0%, transparent 72%); pointer-events: none; }
  .grav-hero-bg-num {
    position: absolute; bottom: -86px; right: -24px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(190px, 34vw, 470px);
    font-weight: 900;
    line-height: 1;
    color: rgba(255,255,255,0.018);
    letter-spacing: -0.06em;
    user-select: none;
    pointer-events: none;
  }
  .grav-hero-inner { max-width: 900px; width: 100%; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
  .grav-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #c4b5fd;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .grav-overline::before, .grav-overline::after { content: ''; flex: 0 0 40px; height: 1px; background: #c4b5fd; }
  .grav-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(38px, 8vw, 84px);
    font-weight: 900;
    color: #fff;
    line-height: 0.94;
    letter-spacing: -0.035em;
    margin-bottom: 32px;
  }
  .grav-hero-title em { font-style: normal; color: #c4b5fd; }
  .grav-hero-title .em2 { color: #67e8f9; }
  .grav-hero-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 24px;
    margin-top: 8px;
  }
  .grav-hero-bar-item { flex: 1 1 150px; padding: 0 24px 0 0; border-right: 1px solid rgba(255,255,255,0.08); margin-right: 24px; }
  .grav-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .grav-bar-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 5px; }
  .grav-bar-value { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.74); }
  @media (max-width: 700px) {
    .grav-hero-inner { padding: 0 18px; }
    .grav-overline { font-size: 10px; letter-spacing: 0.16em; }
    .grav-overline::before, .grav-overline::after { flex-basis: 28px; }
    .grav-hero-title { font-size: clamp(38px, 11vw, 58px); margin-bottom: 24px; }
    .grav-hero-bar { gap: 12px; }
    .grav-hero-bar-item { flex: 1 1 120px; padding: 0 14px 0 0; margin-right: 14px; }
    .grav-bar-label { font-size: 9px; letter-spacing: 0.12em; }
    .grav-bar-value { font-size: 13px; }
    .grav-orbit-system { opacity: 0.32; right: -22%; }
  }

  /* ═════════════════ BODY ═════════════════ */
  .grav-body { max-width: 900px; margin: 0 auto; padding: 72px 32px 100px; }
  @media (max-width: 700px) { .grav-body { padding: 48px 18px 72px; } }

  .grav-intro {
    background: linear-gradient(135deg, #050617 0%, #120a2f 100%);
    border-left: 5px solid var(--accent);
    border-radius: 6px;
    padding: 36px 40px;
    margin-bottom: 72px;
    position: relative;
    overflow: hidden;
  }
  .grav-intro::after { content: '🌌'; position: absolute; right: 28px; top: 50%; transform: translateY(-50%); font-size: 88px; opacity: 0.08; }
  .grav-intro p { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 500; color: rgba(255,255,255,0.86); line-height: 1.8; margin: 0 0 14px; position: relative; z-index: 1; }
  .grav-intro p:last-child { margin-bottom: 0; }
  .grav-intro strong { color: #c4b5fd; }
  @media (max-width: 700px) { .grav-intro { padding: 24px 20px; } .grav-intro p { font-size: 15px; } }

  .grav-divider { margin: 56px 0; display: flex; align-items: center; gap: 16px; }
  .grav-divider::before, .grav-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .grav-divider-mark { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

  .grav-sec { margin-bottom: 56px; }
  .grav-sec-head { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 30px; border-bottom: 2px solid var(--rule); padding-bottom: 18px; }
  .grav-sec-num { font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900; color: var(--rule); line-height: 1; flex-shrink: 0; }
  .grav-sec-title-wrap { padding-top: 8px; }
  .grav-sec-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .grav-sec-title { font-family: 'Montserrat', sans-serif; font-size: clamp(22px, 4vw, 32px); font-weight: 900; color: var(--ink); line-height: 1.15; letter-spacing: -0.02em; }
  .grav-sec-title span { color: var(--accent); }
  .grav-body-text { font-size: 16px; color: var(--ink2); line-height: 1.85; margin-bottom: 26px; }
  .grav-body-text strong { color: var(--accent2); font-weight: 700; }
  @media (max-width: 580px) {
    .grav-sec-head { gap: 14px; margin-bottom: 24px; }
    .grav-sec-num { font-size: 42px; }
    .grav-sec-title-wrap { padding-top: 4px; }
  }

  /* Law card */
  .grav-law-card {
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 14px 34px rgba(76,29,149,0.08);
  }
  .grav-law-top { padding: 26px; background: linear-gradient(135deg, #ede9fe 0%, #cffafe 100%); }
  .grav-law-title { font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900; color: var(--accent2); margin-bottom: 10px; }
  .grav-law-top p { font-size: 16px; line-height: 1.8; color: var(--ink2); }
  .grav-formula-band { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 18px; padding: 28px 26px; background: #fff; }
  .grav-mass { min-height: 112px; display: flex; align-items: center; justify-content: center; }
  .grav-body-orb { width: 86px; height: 86px; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #fff 0%, rgba(196,181,253,0.85) 20%, #6d28d9 74%); display: flex; align-items: center; justify-content: center; color: white; font-family: 'Montserrat', sans-serif; font-weight: 900; box-shadow: inset -10px -12px 28px rgba(0,0,0,0.16), 0 10px 24px rgba(109,40,217,0.2); }
  .grav-body-orb.small { width: 58px; height: 58px; background: radial-gradient(circle at 35% 30%, #fff 0%, rgba(103,232,249,0.8) 25%, #0891b2 74%); box-shadow: inset -8px -10px 20px rgba(0,0,0,0.14), 0 10px 24px rgba(8,145,178,0.18); }
  .grav-force-line { min-width: 210px; display: flex; align-items: center; gap: 8px; }
  .grav-arrow { flex: 1; height: 4px; border-radius: 999px; background: linear-gradient(90deg, #6d28d9, #0891b2); position: relative; }
  .grav-arrow.left::before { content: ''; position: absolute; left: -1px; top: 50%; transform: translateY(-50%); border-top: 8px solid transparent; border-bottom: 8px solid transparent; border-right: 12px solid #6d28d9; }
  .grav-arrow.right::after { content: ''; position: absolute; right: -1px; top: 50%; transform: translateY(-50%); border-top: 8px solid transparent; border-bottom: 8px solid transparent; border-left: 12px solid #0891b2; }
  .grav-distance-label { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; color: var(--muted); text-align: center; min-width: 34px; }
  .grav-law-bottom { border-top: 1px solid var(--rule); padding: 24px 26px; display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .grav-mini-fact { background: var(--paper); border-left: 4px solid var(--accent); border-radius: 8px; padding: 16px; }
  .grav-mini-fact strong { display: block; font-family: 'Poppins', sans-serif; color: var(--accent2); margin-bottom: 6px; }
  .grav-mini-fact span { color: var(--ink2); line-height: 1.65; }
  @media (max-width: 760px) {
    .grav-formula-band { grid-template-columns: 1fr; gap: 12px; }
    .grav-force-line { min-width: 100%; }
    .grav-law-bottom { grid-template-columns: 1fr; }
  }

  .grav-formula-box {
    background: #0b1026;
    color: white;
    border-radius: 10px;
    padding: 22px 24px;
    border-left: 5px solid var(--accent);
    margin: 22px 0;
  }
  .grav-formula-main { font-family: 'Montserrat', sans-serif; font-size: clamp(22px, 5vw, 36px); font-weight: 900; color: #c4b5fd; letter-spacing: -0.01em; margin-bottom: 12px; }
  .grav-formula-note { font-size: 15px; line-height: 1.75; color: rgba(255,255,255,0.78); }

  /* Kepler layout */
  .grav-kepler-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .grav-kepler-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 22px; position: relative; overflow: hidden; min-height: 240px; }
  .grav-kepler-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 5px; background: linear-gradient(90deg, var(--accent), var(--cyan)); }
  .grav-kepler-tag { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 10px; }
  .grav-kepler-card h3 { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; color: var(--ink); line-height: 1.15; margin-bottom: 12px; }
  .grav-kepler-card p { color: var(--ink2); line-height: 1.75; font-size: 15px; }
  .grav-orbit-visual { height: 88px; margin: 8px 0 16px; display: flex; align-items: center; justify-content: center; }
  .grav-ellipse { width: 154px; height: 72px; border: 3px solid var(--accent); border-radius: 50%; position: relative; transform: rotate(-10deg); opacity: 0.9; }
  .grav-ellipse::after { content: ''; position: absolute; width: 14px; height: 14px; border-radius: 50%; background: var(--gold); left: 22px; top: 50%; transform: translateY(-50%); }
  .grav-area-visual { height: 88px; margin: 8px 0 16px; display: flex; align-items: center; justify-content: center; gap: 8px; }
  .grav-area-piece { width: 58px; height: 58px; background: var(--cyan-lt); border: 2px solid var(--cyan); clip-path: polygon(0 0, 100% 24%, 72% 100%, 12% 76%); }
  .grav-area-piece.second { transform: rotate(42deg); background: var(--accent-lt); border-color: var(--accent); }
  .grav-constant-visual { height: 88px; margin: 8px 0 16px; display: flex; align-items: center; justify-content: center; }
  .grav-constant-pill { background: var(--accent-lt); color: var(--accent2); border: 1.5px solid var(--rule); border-radius: 999px; padding: 14px 18px; font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 24px; }
  @media (max-width: 820px) { .grav-kepler-grid { grid-template-columns: 1fr; } .grav-kepler-card { min-height: auto; } }

  /* Free fall */
  .grav-freefall-wrap { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 28px; overflow: hidden; }
  .grav-freefall-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 26px; align-items: center; }
  .grav-fall-stage { min-height: 250px; background: linear-gradient(180deg, #ede9fe 0%, #fff 100%); border-radius: 10px; position: relative; border: 1px solid var(--rule); overflow: hidden; }
  .grav-earth-line { position: absolute; left: 10%; right: 10%; bottom: 34px; height: 10px; border-radius: 999px; background: #4c1d95; }
  .grav-falling-ball { position: absolute; left: 50%; top: 34px; width: 42px; height: 42px; transform: translateX(-50%); border-radius: 50%; background: radial-gradient(circle at 35% 30%, #fff, #f59e0b 35%, #b45309 85%); box-shadow: 0 10px 20px rgba(180,83,9,0.18); }
  .grav-down-arrow { position: absolute; left: 50%; top: 92px; width: 4px; height: 86px; transform: translateX(-50%); border-radius: 999px; background: var(--rose); }
  .grav-down-arrow::after { content: ''; position: absolute; bottom: -1px; left: 50%; transform: translateX(-50%); border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 14px solid var(--rose); }
  .grav-g-label { position: absolute; left: calc(50% + 20px); top: 124px; font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--rose); font-size: 13px; }
  .grav-fall-content h3 { font-family: 'Montserrat', sans-serif; font-size: 26px; font-weight: 900; color: var(--accent2); margin-bottom: 14px; }
  .grav-fall-content p { color: var(--ink2); line-height: 1.85; margin-bottom: 12px; }
  .grav-g-box { background: var(--accent-lt); color: var(--accent2); border-left: 4px solid var(--accent); border-radius: 8px; padding: 14px 16px; font-family: 'Poppins', sans-serif; font-weight: 700; margin-top: 14px; }
  @media (max-width: 760px) { .grav-freefall-grid { grid-template-columns: 1fr; } .grav-fall-stage { min-height: 220px; } }

  /* Motion under gravity */
  .grav-equation-columns { display: grid; grid-template-columns: 1fr 1fr; border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; background: var(--white); }
  .grav-eq-col { padding: 26px; }
  .grav-eq-col:nth-child(2) { border-left: 1.5px solid var(--rule); }
  .grav-eq-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
  .grav-eq-head h3 { font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900; color: var(--ink); }
  .grav-eq-badge { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; color: var(--white); background: var(--accent); padding: 6px 10px; border-radius: 999px; white-space: nowrap; }
  .grav-eq-list { display: grid; gap: 12px; }
  .grav-eq-item { background: var(--paper); border: 1px solid var(--rule); border-radius: 8px; padding: 14px; font-family: 'Montserrat', sans-serif; font-weight: 900; color: var(--accent2); font-size: 19px; }
  .grav-tip-card { background: var(--gold-lt); border: 1.5px solid #facc15; border-radius: 10px; padding: 20px; margin-top: 22px; }
  .grav-tip-card h4 { font-family: 'Montserrat', sans-serif; font-weight: 900; color: var(--gold); margin-bottom: 10px; font-size: 19px; }
  .grav-tip-card ul { padding-left: 20px; color: var(--ink2); line-height: 1.8; }
  @media (max-width: 760px) { .grav-equation-columns { grid-template-columns: 1fr; } .grav-eq-col:nth-child(2) { border-left: none; border-top: 1.5px solid var(--rule); } }

  /* Mass weight */
  .grav-compare-panel { display: grid; grid-template-columns: 1fr 1fr; border-radius: 12px; overflow: hidden; border: 1.5px solid var(--rule); background: var(--white); }
  .grav-compare-side { padding: 28px; min-height: 230px; position: relative; overflow: hidden; }
  .grav-compare-side:first-child { background: linear-gradient(135deg, #0b1026 0%, #120a2f 100%); color: white; }
  .grav-compare-side:nth-child(2) { border-left: 1.5px solid var(--rule); }
  .grav-compare-label { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.65; margin-bottom: 10px; }
  .grav-compare-title { font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900; margin-bottom: 12px; }
  .grav-compare-side:first-child .grav-compare-title { color: #c4b5fd; }
  .grav-compare-side:nth-child(2) .grav-compare-title { color: var(--accent2); }
  .grav-compare-side p { line-height: 1.85; font-size: 16px; position: relative; z-index: 1; }
  .grav-weight-visual { margin-top: 20px; display: flex; align-items: center; gap: 14px; }
  .grav-scale-line { width: 70px; height: 8px; border-radius: 999px; background: var(--accent); }
  .grav-weight-arrow { width: 4px; height: 48px; background: var(--rose); position: relative; }
  .grav-weight-arrow::after { content: ''; position: absolute; bottom: -1px; left: 50%; transform: translateX(-50%); border-left: 9px solid transparent; border-right: 9px solid transparent; border-top: 13px solid var(--rose); }
  @media (max-width: 760px) { .grav-compare-panel { grid-template-columns: 1fr; } .grav-compare-side:nth-child(2) { border-left: none; border-top: 1.5px solid var(--rule); } }

  /* Pressure + density */
  .grav-concept-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .grav-concept-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 22px; min-height: 220px; position: relative; overflow: hidden; }
  .grav-concept-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 5px; background: var(--accent); }
  .grav-concept-icon { width: 44px; height: 44px; border-radius: 50%; background: var(--accent-lt); display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 16px; }
  .grav-concept-card h3 { font-family: 'Montserrat', sans-serif; font-size: 21px; font-weight: 900; color: var(--ink); margin-bottom: 12px; }
  .grav-concept-card p { color: var(--ink2); line-height: 1.75; font-size: 15px; }
  .grav-inline-formula { display: inline-block; margin-top: 12px; background: var(--paper); border: 1px solid var(--rule); color: var(--accent2); font-family: 'Poppins', sans-serif; font-weight: 700; padding: 8px 10px; border-radius: 8px; }
  @media (max-width: 820px) { .grav-concept-grid { grid-template-columns: 1fr; } .grav-concept-card { min-height: auto; } }

  /* Float sink */
  .grav-float-wrap { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; }
  .grav-water-stage { min-height: 260px; position: relative; background: linear-gradient(180deg, #fff 0%, #fff 42%, #cffafe 42%, #a5f3fc 100%); border-bottom: 1.5px solid var(--rule); }
  .grav-water-stage::before { content: ''; position: absolute; left: 0; right: 0; top: 42%; height: 12px; background: repeating-linear-gradient(90deg, rgba(8,145,178,0.3) 0 18px, rgba(255,255,255,0.4) 18px 36px); opacity: 0.8; }
  .grav-cork { position: absolute; left: 24%; top: 36%; width: 78px; height: 34px; border-radius: 999px; background: linear-gradient(90deg, #facc15, #b45309); border: 2px solid #92400e; transform: rotate(-3deg); }
  .grav-iron { position: absolute; right: 24%; bottom: 38px; width: 62px; height: 62px; border-radius: 8px; background: linear-gradient(135deg, #94a3b8, #334155); border: 2px solid #1e293b; }
  .grav-float-label { position: absolute; font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 13px; color: var(--ink); background: white; border: 1px solid var(--rule); border-radius: 999px; padding: 6px 10px; }
  .grav-float-label.cork { left: 20%; top: 27%; }
  .grav-float-label.iron { right: 18%; bottom: 108px; }
  .grav-float-rules { display: grid; grid-template-columns: 1fr 1fr; }
  .grav-rule-card { padding: 22px 24px; }
  .grav-rule-card:nth-child(2) { border-left: 1.5px solid var(--rule); }
  .grav-rule-card strong { display: block; font-family: 'Montserrat', sans-serif; color: var(--accent2); font-size: 20px; margin-bottom: 10px; }
  .grav-rule-card span { color: var(--ink2); line-height: 1.75; }
  @media (max-width: 680px) {
    .grav-water-stage { min-height: 230px; }
    .grav-cork { left: 16%; }
    .grav-iron { right: 15%; }
    .grav-float-label.cork { left: 10%; }
    .grav-float-label.iron { right: 9%; }
    .grav-float-rules { grid-template-columns: 1fr; }
    .grav-rule-card:nth-child(2) { border-left: none; border-top: 1.5px solid var(--rule); }
  }

  /* Relative density */
  .grav-rd-panel { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; }
  .grav-rd-main { padding: 28px; background: linear-gradient(135deg, #ede9fe, #fff); }
  .grav-rd-main h3 { font-family: 'Montserrat', sans-serif; font-size: 26px; font-weight: 900; color: var(--accent2); margin-bottom: 12px; }
  .grav-rd-main p { color: var(--ink2); line-height: 1.8; }
  .grav-rd-grid { display: grid; grid-template-columns: 1fr 1fr; }
  .grav-rd-card { padding: 24px; border-top: 1.5px solid var(--rule); }
  .grav-rd-card:nth-child(2) { border-left: 1.5px solid var(--rule); }
  .grav-rd-card h4 { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; color: var(--ink); margin-bottom: 12px; }
  .grav-rd-formula { background: #0b1026; color: #c4b5fd; border-radius: 8px; padding: 14px; font-family: 'Poppins', sans-serif; font-weight: 700; line-height: 1.65; overflow-wrap: anywhere; }
  .grav-rd-note { margin-top: 12px; color: var(--muted); line-height: 1.7; font-size: 14px; }
  @media (max-width: 760px) { .grav-rd-grid { grid-template-columns: 1fr; } .grav-rd-card:nth-child(2) { border-left: none; } }

  /* Buoyancy */
  .grav-buoyancy-card { background: linear-gradient(135deg, #0b1026 0%, #083344 100%); border-radius: 12px; padding: 30px; color: white; position: relative; overflow: hidden; }
  .grav-buoyancy-card::after { content: ''; position: absolute; right: -70px; top: -70px; width: 220px; height: 220px; border-radius: 50%; border: 1px solid rgba(103,232,249,0.18); }
  .grav-buoyancy-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: center; position: relative; z-index: 1; }
  .grav-buoy-title { font-family: 'Montserrat', sans-serif; font-size: 30px; font-weight: 900; color: #67e8f9; margin-bottom: 12px; }
  .grav-buoy-text { color: rgba(255,255,255,0.84); line-height: 1.85; margin-bottom: 16px; }
  .grav-buoy-list { display: grid; gap: 10px; }
  .grav-buoy-item { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px 14px; color: rgba(255,255,255,0.86); line-height: 1.6; }
  .grav-buoy-stage { min-height: 245px; position: relative; border-radius: 10px; background: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.08) 35%, rgba(103,232,249,0.22) 35%, rgba(103,232,249,0.12) 100%); border: 1px solid rgba(103,232,249,0.24); }
  .grav-submerged-box { position: absolute; left: 50%; top: 45%; transform: translate(-50%, -50%); width: 88px; height: 72px; border-radius: 8px; background: rgba(244,114,182,0.5); border: 2px solid rgba(251,207,232,0.7); }
  .grav-up-arrow { position: absolute; left: 50%; top: 55%; transform: translateX(-50%); width: 4px; height: 72px; background: #67e8f9; border-radius: 999px; }
  .grav-up-arrow::before { content: ''; position: absolute; top: -1px; left: 50%; transform: translateX(-50%); border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 14px solid #67e8f9; }
  .grav-buoy-label { position: absolute; left: 50%; bottom: 26px; transform: translateX(-50%); font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; color: #67e8f9; white-space: nowrap; }
  @media (max-width: 760px) { .grav-buoyancy-card { padding: 24px 20px; } .grav-buoyancy-grid { grid-template-columns: 1fr; } }

  /* FAQ */
  .grav-faq-wrap { margin-top: 74px; }
  .grav-faq-title { font-family: 'Montserrat', sans-serif; font-size: clamp(28px,5vw,42px); font-weight: 900; color: var(--ink); letter-spacing: -0.03em; margin-bottom: 22px; }
  .grav-faq-title span { color: var(--accent); }
  .grav-faq-list { display: grid; gap: 12px; }
  .grav-faq-item { background: var(--white); border: 1.5px solid var(--rule); border-radius: 10px; overflow: hidden; }
  .grav-faq-q { width: 100%; border: 0; background: transparent; padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; text-align: left; cursor: pointer; font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 700; color: var(--ink); }
  .grav-faq-icon { color: var(--accent); font-size: 18px; line-height: 1; flex-shrink: 0; }
  .grav-faq-a { padding: 0 20px 20px; color: var(--ink2); line-height: 1.8; font-size: 15px; }

  /* ═════════════ MOBILE DIAGRAM FIXES ═════════════ */
  @media (max-width: 760px) {
    /* Universal gravitation diagram: keep M and m side-by-side on mobile */
    .grav-formula-band {
      grid-template-columns: 74px minmax(130px, 1fr) 58px;
      gap: 10px;
      padding: 26px 16px;
      min-height: 210px;
      align-items: center;
    }
    .grav-mass { min-height: 92px; }
    .grav-body-orb { width: 70px; height: 70px; font-size: 17px; }
    .grav-body-orb.small { width: 50px; height: 50px; font-size: 14px; }
    .grav-force-line { min-width: 0; width: 100%; gap: 6px; }
    .grav-distance-label { min-width: 24px; font-size: 12px; }

    /* Free fall diagram: add breathing space so the ball and arrow do not look cropped */
    .grav-fall-stage { min-height: 280px; }
    .grav-falling-ball { top: 42px; width: 44px; height: 44px; }
    .grav-down-arrow { top: 116px; height: 88px; }
    .grav-g-label { top: 144px; left: calc(50% + 24px); font-size: 12px; white-space: nowrap; }
    .grav-earth-line { bottom: 48px; left: 10%; right: 10%; }

    /* Float/sink diagram: separate labels from objects on mobile */
    .grav-water-stage { min-height: 270px; background: linear-gradient(180deg, #fff 0%, #fff 40%, #cffafe 40%, #a5f3fc 100%); }
    .grav-water-stage::before { top: 40%; }
    .grav-cork { left: 14%; top: 38%; width: 76px; height: 34px; }
    .grav-iron { right: 15%; bottom: 48px; width: 60px; height: 60px; }
    .grav-float-label { font-size: 12px; padding: 5px 9px; z-index: 3; }
    .grav-float-label.cork { left: 10%; top: 24%; }
    .grav-float-label.iron { right: 8%; top: 35%; bottom: auto; }
  }

  @media (max-width: 420px) {
    .grav-formula-band {
      grid-template-columns: 66px minmax(96px, 1fr) 52px;
      gap: 7px;
      padding: 22px 12px;
      min-height: 196px;
    }
    .grav-body-orb { width: 62px; height: 62px; }
    .grav-body-orb.small { width: 46px; height: 46px; }
    .grav-arrow { height: 3px; }
    .grav-arrow.left::before { border-top-width: 7px; border-bottom-width: 7px; border-right-width: 10px; }
    .grav-arrow.right::after { border-top-width: 7px; border-bottom-width: 7px; border-left-width: 10px; }
    .grav-distance-label { font-size: 11px; min-width: 18px; }

    .grav-fall-stage { min-height: 270px; }
    .grav-falling-ball { top: 38px; }
    .grav-down-arrow { top: 112px; height: 84px; }
    .grav-g-label { top: 140px; left: calc(50% + 20px); }
    .grav-earth-line { bottom: 48px; }

    .grav-water-stage { min-height: 260px; }
    .grav-cork { left: 13%; top: 38%; width: 72px; height: 32px; }
    .grav-iron { right: 13%; bottom: 46px; width: 56px; height: 56px; }
    .grav-float-label.cork { left: 8%; top: 23%; }
    .grav-float-label.iron { right: 5%; top: 34%; }
  }

  @media (max-width: 520px) {
    .grav-body-text { font-size: 15px; }
    .grav-law-top, .grav-law-bottom, .grav-freefall-wrap, .grav-eq-col, .grav-compare-side, .grav-rd-main, .grav-rd-card { padding: 20px; }
    .grav-formula-box { padding: 20px; }
    .grav-faq-q { font-size: 15px; padding: 16px; }
    .grav-faq-a { padding: 0 16px 18px; }
  }
`;

const faqs = [
  {
    q: "What does the universal law of gravitation state?",
    a: "It states that the gravitational force between two masses is directly proportional to the product of their masses and inversely proportional to the square of the distance between them."
  },
  {
    q: "What is the value and unit of the universal gravitational constant G?",
    a: "The value of G is 6.673 × 10⁻¹¹ N m² kg⁻². It appears in the formula F = G M m / r²."
  },
  {
    q: "Why is gravitation called an inverse square law?",
    a: "Because the gravitational force becomes weaker in proportion to the square of the distance between two bodies. If distance increases, force decreases rapidly."
  },
  {
    q: "What is weight?",
    a: "Weight is the gravitational force acting on an object. It depends on the gravitational pull of another body such as the Earth, Moon, or Sun."
  },
  {
    q: "Why does weightlessness happen in outer space?",
    a: "In orbit, the weight of the orbiting body is used to provide the centripetal force needed to remain in that orbit. This gives the experience of weightlessness."
  },
  {
    q: "What are Kepler’s laws of planetary motion?",
    a: "Kepler’s laws say that planets move in elliptical orbits, a planet covers equal areas in equal time intervals, and r³/T² remains constant."
  },
  {
    q: "What is free fall?",
    a: "A body is in free fall when it falls towards the Earth due to the Earth’s gravity only. The acceleration of a freely falling body is g = 9.8 m/s²."
  },
  {
    q: "What values of g should be used in upward and downward motion?",
    a: "For upward motion, take g = −9.8 m/s² and final velocity at the highest point as 0. For downward motion, take g = 9.8 m/s² and for free fall take initial velocity as 0."
  },
  {
    q: "What is the difference between mass and weight?",
    a: "Mass is the amount of matter in a body. Weight is the force exerted on the body due to gravitational pull."
  },
  {
    q: "What is thrust and pressure?",
    a: "Thrust is the force acting perpendicular to a surface. Pressure is perpendicular force per unit area. Lesser area produces more pressure."
  },
  {
    q: "What is density?",
    a: "Density is mass per unit volume. Its SI unit is kg/m³. If a body is denser than the fluid, it sinks; if it is less dense than the fluid, it floats."
  },
  {
    q: "What is buoyancy?",
    a: "Buoyancy or buoyant force is the upward thrust exerted by a fluid on a partially or fully immersed object. It depends on the density of the fluid."
  },
  {
    q: "What does Archimedes’ principle state?",
    a: "It states that the upward force experienced by a body immersed in a fluid is equal to the weight of the fluid displaced by it."
  },
  {
    q: "What is a lactometer used for?",
    a: "A lactometer is used to measure the purity of milk."
  }
];

export default function Chapter10Gravitation() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="grav-root">
      <FontLink />
      <style>{styles}</style>

      <section className="grav-hero">
        <div className="grav-hero-stars" />
        <div className="grav-glow-a" />
        <div className="grav-glow-b" />
        <div className="grav-orbit-system">
          <div className="grav-planet-big" />
          <div className="grav-planet-small" />
        </div>
        <div className="grav-hero-bg-num">10</div>
        <div className="grav-hero-inner">
          <div className="grav-overline">Class 9 · Science · Chapter 10</div>
          <h1 className="grav-hero-title"><em>Gravitation</em></h1>
          <div className="grav-hero-bar">
            <div className="grav-hero-bar-item">
              <div className="grav-bar-label">Subject</div>
              <div className="grav-bar-value">Science — Physics</div>
            </div>
            <div className="grav-hero-bar-item">
              <div className="grav-bar-label">Core Idea</div>
              <div className="grav-bar-value">Gravity & Free Fall</div>
            </div>
            <div className="grav-hero-bar-item">
              <div className="grav-bar-label">Includes</div>
              <div className="grav-bar-value">Pressure, Density, Buoyancy</div>
            </div>
            <div className="grav-hero-bar-item">
              <div className="grav-bar-label">Format</div>
              <div className="grav-bar-value">Notes + FAQ</div>
            </div>
          </div>
        </div>
      </section>

      <main className="grav-body">
        <div className="grav-intro">
          <p><strong>Gravitation</strong> explains why objects fall towards Earth, why planets move around the Sun, and why floating and sinking happen in fluids.</p>
          <p>This chapter connects universal gravitational force with practical ideas like <strong>weight, pressure, density, buoyancy</strong> and <strong>Archimedes’ principle</strong>.</p>
        </div>

        <section className="grav-sec">
          <div className="grav-sec-head">
            <div className="grav-sec-num">01</div>
            <div className="grav-sec-title-wrap">
              <div className="grav-sec-kicker">Universal Attraction</div>
              <h2 className="grav-sec-title">Universal Law of <span>Gravitation</span></h2>
            </div>
          </div>

          <div className="grav-law-card">
            <div className="grav-law-top">
              <h3 className="grav-law-title">Every mass attracts every other mass.</h3>
              <p>The gravitational force between two bodies is directly proportional to the product of their masses and inversely proportional to the square of the distance between them.</p>
            </div>
            <div className="grav-formula-band">
              <div className="grav-mass"><div className="grav-body-orb">M</div></div>
              <div className="grav-force-line">
                <div className="grav-arrow left" />
                <div className="grav-distance-label">r</div>
                <div className="grav-arrow right" />
              </div>
              <div className="grav-mass"><div className="grav-body-orb small">m</div></div>
            </div>
            <div className="grav-law-bottom">
              <div className="grav-mini-fact">
                <strong>Mass relation</strong>
                <span>F ∝ M × m — larger masses attract each other with greater force.</span>
              </div>
              <div className="grav-mini-fact">
                <strong>Distance relation</strong>
                <span>F ∝ 1/r² — force decreases as the square of distance increases.</span>
              </div>
            </div>
          </div>

          <div className="grav-formula-box">
            <div className="grav-formula-main">F = G M m / r²</div>
            <div className="grav-formula-note">Here, M and m are the masses of two bodies, r is the distance between them, and G = 6.673 × 10⁻¹¹ N m² kg⁻².</div>
          </div>

          <p className="grav-body-text"><strong>Weight</strong> is the gravitational force acting on an object. Weightlessness in outer space happens because the weight of an orbiting body is used to provide the centripetal force required to remain in its orbit.</p>
        </section>

        <div className="grav-divider"><div className="grav-divider-mark" /></div>

        <section className="grav-sec">
          <div className="grav-sec-head">
            <div className="grav-sec-num">02</div>
            <div className="grav-sec-title-wrap">
              <div className="grav-sec-kicker">Planetary Motion</div>
              <h2 className="grav-sec-title">Kepler’s Laws of <span>Planets</span></h2>
            </div>
          </div>

          <div className="grav-kepler-grid">
            <div className="grav-kepler-card">
              <div className="grav-kepler-tag">Law 1</div>
              <div className="grav-orbit-visual"><div className="grav-ellipse" /></div>
              <h3>Elliptical Orbits</h3>
              <p>Planets move around the Sun in elliptical paths rather than perfect circular paths.</p>
            </div>
            <div className="grav-kepler-card">
              <div className="grav-kepler-tag">Law 2</div>
              <div className="grav-area-visual"><div className="grav-area-piece" /><div className="grav-area-piece second" /></div>
              <h3>Equal Area Rule</h3>
              <p>A planet covers equal areas in equal intervals of time during its motion.</p>
            </div>
            <div className="grav-kepler-card">
              <div className="grav-kepler-tag">Law 3</div>
              <div className="grav-constant-visual"><div className="grav-constant-pill">r³/T²</div></div>
              <h3>Constant Ratio</h3>
              <p>For planetary motion, the value of r³/T² remains constant.</p>
            </div>
          </div>
        </section>

        <div className="grav-divider"><div className="grav-divider-mark" /></div>

        <section className="grav-sec">
          <div className="grav-sec-head">
            <div className="grav-sec-num">03</div>
            <div className="grav-sec-title-wrap">
              <div className="grav-sec-kicker">Falling Bodies</div>
              <h2 className="grav-sec-title">Free Fall and <span>g</span></h2>
            </div>
          </div>

          <div className="grav-freefall-wrap">
            <div className="grav-freefall-grid">
              <div className="grav-fall-stage">
                <div className="grav-falling-ball" />
                <div className="grav-down-arrow" />
                <div className="grav-g-label">g = 9.8 m/s²</div>
                <div className="grav-earth-line" />
              </div>
              <div className="grav-fall-content">
                <h3>Falling under Earth’s gravity only</h3>
                <p>A body is said to be in <strong>free fall</strong> if it begins to fall downward towards Earth due to Earth’s gravity only.</p>
                <p>The acceleration of a freely falling body is called acceleration due to gravity.</p>
                <div className="grav-g-box">g = G M / R² = 9.8 m/s²</div>
              </div>
            </div>
          </div>

          <div className="grav-tip-card">
            <h4>Numerical Tips</h4>
            <ul>
              <li>For upward motion, take g = −9.8 m/s² and final velocity at the highest point as 0.</li>
              <li>For downward motion, take g = 9.8 m/s².</li>
              <li>For a freely falling body, take initial velocity as 0.</li>
            </ul>
          </div>
        </section>

        <div className="grav-divider"><div className="grav-divider-mark" /></div>

        <section className="grav-sec">
          <div className="grav-sec-head">
            <div className="grav-sec-num">04</div>
            <div className="grav-sec-title-wrap">
              <div className="grav-sec-kicker">Motion Equations</div>
              <h2 className="grav-sec-title">Equations Under <span>Gravity</span></h2>
            </div>
          </div>

          <div className="grav-equation-columns">
            <div className="grav-eq-col">
              <div className="grav-eq-head">
                <h3>Downward Motion</h3>
                <span className="grav-eq-badge">+g</span>
              </div>
              <div className="grav-eq-list">
                <div className="grav-eq-item">v = u + gt</div>
                <div className="grav-eq-item">s = ut + ½gt²</div>
                <div className="grav-eq-item">v² = u² + 2gs</div>
              </div>
            </div>
            <div className="grav-eq-col">
              <div className="grav-eq-head">
                <h3>Upward Motion</h3>
                <span className="grav-eq-badge">−g</span>
              </div>
              <div className="grav-eq-list">
                <div className="grav-eq-item">v = u − gt</div>
                <div className="grav-eq-item">s = ut − ½gt²</div>
                <div className="grav-eq-item">v² = u² − 2gs</div>
              </div>
            </div>
          </div>
        </section>

        <div className="grav-divider"><div className="grav-divider-mark" /></div>

        <section className="grav-sec">
          <div className="grav-sec-head">
            <div className="grav-sec-num">05</div>
            <div className="grav-sec-title-wrap">
              <div className="grav-sec-kicker">Mass vs Weight</div>
              <h2 className="grav-sec-title">Matter and <span>Force</span></h2>
            </div>
          </div>

          <div className="grav-compare-panel">
            <div className="grav-compare-side">
              <div className="grav-compare-label">Amount of matter</div>
              <h3 className="grav-compare-title">Mass</h3>
              <p>Mass is the amount of matter contained in a body. It does not mean gravitational pull.</p>
            </div>
            <div className="grav-compare-side">
              <div className="grav-compare-label">Gravitational force</div>
              <h3 className="grav-compare-title">Weight</h3>
              <p>Weight is the force exerted on a body due to the gravitational pull of another body such as Earth, Sun, or Moon.</p>
              <div className="grav-weight-visual">
                <div className="grav-scale-line" />
                <div className="grav-weight-arrow" />
              </div>
            </div>
          </div>
        </section>

        <div className="grav-divider"><div className="grav-divider-mark" /></div>

        <section className="grav-sec">
          <div className="grav-sec-head">
            <div className="grav-sec-num">06</div>
            <div className="grav-sec-title-wrap">
              <div className="grav-sec-kicker">Fluids & Surfaces</div>
              <h2 className="grav-sec-title">Thrust, Pressure and <span>Density</span></h2>
            </div>
          </div>

          <div className="grav-concept-grid">
            <div className="grav-concept-card">
              <div className="grav-concept-icon">↧</div>
              <h3>Thrust</h3>
              <p>Thrust is the force acting perpendicular to a surface.</p>
            </div>
            <div className="grav-concept-card">
              <div className="grav-concept-icon">▾</div>
              <h3>Pressure</h3>
              <p>Pressure is perpendicular force per unit area. Lesser area means more pressure.</p>
              <span className="grav-inline-formula">Pressure = Force / Area</span>
            </div>
            <div className="grav-concept-card">
              <div className="grav-concept-icon">ρ</div>
              <h3>Density</h3>
              <p>Density is mass per unit volume. Its SI unit is kg/m³.</p>
              <span className="grav-inline-formula">Density = Mass / Volume</span>
            </div>
          </div>

          <p className="grav-body-text" style={{ marginTop: "24px" }}>Sharp knives cut better than blunt ones because the same force acts on a smaller area, producing more pressure. Thin school-bag straps are uncomfortable for the same reason.</p>
        </section>

        <div className="grav-divider"><div className="grav-divider-mark" /></div>

        <section className="grav-sec">
          <div className="grav-sec-head">
            <div className="grav-sec-num">07</div>
            <div className="grav-sec-title-wrap">
              <div className="grav-sec-kicker">Density Rule</div>
              <h2 className="grav-sec-title">Why Objects <span>Float or Sink</span></h2>
            </div>
          </div>

          <div className="grav-float-wrap">
            <div className="grav-water-stage">
              <div className="grav-float-label cork">Cork floats</div>
              <div className="grav-cork" />
              <div className="grav-float-label iron">Iron sinks</div>
              <div className="grav-iron" />
            </div>
            <div className="grav-float-rules">
              <div className="grav-rule-card">
                <strong>Body density &gt; Fluid density</strong>
                <span>The body sinks in the fluid. Example: iron sinks in water.</span>
              </div>
              <div className="grav-rule-card">
                <strong>Body density &lt; Fluid density</strong>
                <span>The body floats in the fluid. Example: cork floats on water.</span>
              </div>
            </div>
          </div>
        </section>

        <div className="grav-divider"><div className="grav-divider-mark" /></div>

        <section className="grav-sec">
          <div className="grav-sec-head">
            <div className="grav-sec-num">08</div>
            <div className="grav-sec-title-wrap">
              <div className="grav-sec-kicker">Archimedes’ Principle</div>
              <h2 className="grav-sec-title">Relative Density and <span>Buoyancy</span></h2>
            </div>
          </div>

          <div className="grav-rd-panel">
            <div className="grav-rd-main">
              <h3>Relative Density by Archimedes’ Principle</h3>
              <p>If a solid is immersed in a liquid or water, it displaces liquid or water equal to its own volume. Relative density can be calculated using weights in air, liquid, and water.</p>
            </div>
            <div className="grav-rd-grid">
              <div className="grav-rd-card">
                <h4>Solid denser than water</h4>
                <div className="grav-rd-formula">R.D. = W₁ / (W₁ − W₂)</div>
                <div className="grav-rd-note">W₁ is weight of body in air and W₂ is weight of body in water.</div>
              </div>
              <div className="grav-rd-card">
                <h4>Liquid substance</h4>
                <div className="grav-rd-formula">R.D. = (W₁ − W₂) / (W₁ − W₃)</div>
                <div className="grav-rd-note">This compares weight of liquid displaced with weight of water displaced by the same body.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="grav-sec">
          <div className="grav-buoyancy-card">
            <div className="grav-buoyancy-grid">
              <div>
                <h2 className="grav-buoy-title">Buoyancy</h2>
                <p className="grav-buoy-text">Buoyant force is the upward thrust exerted by a fluid on a partially or fully immersed object. This is why an object appears to weigh less in water.</p>
                <div className="grav-buoy-list">
                  <div className="grav-buoy-item">Buoyant force = Weight of displaced liquid</div>
                  <div className="grav-buoy-item">Buoyant force = Volume immersed × Density of liquid × g</div>
                  <div className="grav-buoy-item">Archimedes’ principle: Upward force = Weight of displaced fluid</div>
                  <div className="grav-buoy-item">Lactometer measures purity of milk</div>
                </div>
              </div>
              <div className="grav-buoy-stage">
                <div className="grav-submerged-box" />
                <div className="grav-up-arrow" />
                <div className="grav-buoy-label">Upthrust / Buoyant force</div>
              </div>
            </div>
          </div>
        </section>

        <section className="grav-faq-wrap">
          <h2 className="grav-faq-title">Quick <span>FAQ Revision</span></h2>
          <div className="grav-faq-list">
            {faqs.map((item, index) => (
              <div className="grav-faq-item" key={item.q}>
                <button
                  className="grav-faq-q"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  aria-expanded={openFaq === index}
                >
                  <span>{item.q}</span>
                  <span className="grav-faq-icon">{openFaq === index ? "▴" : "▾"}</span>
                </button>
                {openFaq === index && <div className="grav-faq-a">{item.a}</div>}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
