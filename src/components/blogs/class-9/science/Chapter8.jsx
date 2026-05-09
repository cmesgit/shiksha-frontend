import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #09131f;
    --ink2:       #17293d;
    --muted:      #4d637d;
    --paper:      #f1f7fb;
    --paper2:     #e0eff8;
    --accent:     #0f6ea8;
    --accent2:    #084e7d;
    --accent-lt:  #d8efff;
    --cyan:       #0891b2;
    --cyan-lt:    #cffafe;
    --violet:     #6d28d9;
    --violet-lt:  #ede9fe;
    --green:      #15803d;
    --green-lt:   #dcfce7;
    --orange:     #c2410c;
    --orange-lt:  #ffedd5;
    --rose:       #be123c;
    --rose-lt:    #ffe4e6;
    --gold:       #a16207;
    --gold-lt:    #fef3c7;
    --rule:       #a7cde2;
    --white:      #ffffff;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  .mot-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; overflow-x: hidden; }

  /* ══════════════════════════════════
     HERO — velocity lines / graph grid
  ══════════════════════════════════ */
  .mot-hero {
    background: linear-gradient(135deg, #020814 0%, #061426 48%, #071b34 100%);
    min-height: 88vh; display: flex; align-items: flex-end;
    position: relative; overflow: hidden; padding: 0 0 64px;
  }
  @media (max-width: 700px) { .mot-hero { min-height: auto; align-items: flex-start; padding: 72px 0 48px; } }
  .mot-hero::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #0f6ea8 0%, #0891b2 30%, #6d28d9 58%, #c2410c 82%, #a16207 100%);
  }
  .mot-hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(125, 211, 252, 0.055) 1px, transparent 1px),
      linear-gradient(90deg, rgba(125, 211, 252, 0.055) 1px, transparent 1px),
      radial-gradient(circle, rgba(14,165,233,0.12) 1px, transparent 1px);
    background-size: 46px 46px, 46px 46px, 28px 28px;
    pointer-events: none;
  }
  .mot-hero-track {
    position: absolute; top: 50%; right: 4%; transform: translateY(-50%);
    width: clamp(170px, 28vw, 340px); height: clamp(120px, 18vw, 220px);
    border-bottom: 2px solid rgba(125,211,252,0.18); border-left: 2px solid rgba(125,211,252,0.11);
    pointer-events: none;
  }
  .mot-hero-track::before {
    content: ''; position: absolute; left: 8%; bottom: 18%; width: 82%; height: 2px;
    background: linear-gradient(90deg, rgba(125,211,252,0.1), rgba(125,211,252,0.5));
    transform: rotate(-18deg); transform-origin: left center;
  }
  .mot-hero-track::after {
    content: ''; position: absolute; right: 7%; bottom: 44%; width: 12px; height: 12px; border-radius: 50%;
    background: rgba(125,211,252,0.32); box-shadow: 0 0 38px rgba(125,211,252,0.35);
  }
  .mot-speed-lines { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
  .mot-speed-lines span { position: absolute; height: 1px; background: linear-gradient(90deg, transparent, rgba(125,211,252,0.18), transparent); transform: rotate(-8deg); }
  .mot-speed-lines span:nth-child(1) { width: 260px; right: 8%; top: 24%; }
  .mot-speed-lines span:nth-child(2) { width: 420px; left: 8%; top: 42%; }
  .mot-speed-lines span:nth-child(3) { width: 320px; right: 19%; bottom: 22%; }
  .mot-glow-a { position: absolute; top: 14%; left: 6%; width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 68%); pointer-events: none; }
  .mot-glow-b { position: absolute; bottom: 10%; right: 20%; width: 220px; height: 220px; border-radius: 50%; background: radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 72%); pointer-events: none; }
  .mot-hero-bg-num {
    position: absolute; bottom: -88px; right: -22px;
    font-family: 'Montserrat', sans-serif; font-size: clamp(210px, 35vw, 500px); font-weight: 900;
    line-height: 1; color: rgba(255,255,255,0.018); letter-spacing: -0.05em;
    user-select: none; pointer-events: none;
  }
  .mot-hero-inner { max-width: 900px; width: 100%; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
  .mot-overline {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; color: #7dd3fc;
    margin-bottom: 24px; display: flex; align-items: center; gap: 14px;
  }
  .mot-overline::before, .mot-overline::after { content: ''; flex: 0 0 40px; height: 1px; background: #7dd3fc; }
  .mot-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(42px, 9vw, 92px); font-weight: 900; color: #fff;
    line-height: 0.88; letter-spacing: -0.045em; margin-bottom: 32px;
  }
  .mot-hero-title em { font-style: normal; color: #7dd3fc; }
  .mot-hero-title .mot-title-sub { display: block; color: #c4b5fd; }
  .mot-hero-bar { display: flex; flex-wrap: wrap; gap: 0; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; margin-top: 8px; }
  .mot-hero-bar-item { flex: 1 1 150px; padding: 0 24px 0 0; border-right: 1px solid rgba(255,255,255,0.08); margin-right: 24px; }
  .mot-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .mot-bar-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 5px; }
  .mot-bar-value { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.72); }

  /* ══════════════════════════════════
     BODY + COMMON ELEMENTS
  ══════════════════════════════════ */
  .mot-body { max-width: 880px; width: 100%; margin: 0 auto; padding: 72px 32px 100px; }
  .mot-intro {
    background: linear-gradient(135deg, #020814 0%, #071b34 100%);
    border-left: 5px solid var(--accent); border-radius: 5px; padding: 36px 40px;
    margin-bottom: 72px; position: relative; overflow: hidden;
  }
  .mot-intro::after { content: '↗'; position: absolute; right: 34px; top: 50%; transform: translateY(-50%); font-family: 'Montserrat', sans-serif; font-size: 120px; font-weight: 900; color: rgba(125,211,252,0.08); line-height: 1; }
  .mot-intro p { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 500; color: rgba(255,255,255,0.86); line-height: 1.8; margin: 0 0 14px; position: relative; z-index: 1; }
  .mot-intro p:last-child { margin: 0; }
  .mot-intro strong { color: #7dd3fc; }

  .mot-sec { margin-bottom: 8px; }
  .mot-divider { margin: 58px 0; display: flex; align-items: center; gap: 16px; }
  .mot-divider::before, .mot-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .mot-divider-mark { width: 9px; height: 9px; border-radius: 50%; background: var(--accent); flex-shrink: 0; box-shadow: 0 0 0 6px rgba(15,110,168,0.08); }

  .mot-sec-head { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 30px; border-bottom: 2px solid var(--rule); padding-bottom: 18px; }
  .mot-sec-num { font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900; color: var(--rule); line-height: 1; flex-shrink: 0; }
  .mot-sec-title-wrap { padding-top: 8px; }
  .mot-sec-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .mot-sec-title { font-family: 'Montserrat', sans-serif; font-size: clamp(22px, 3.6vw, 32px); font-weight: 900; color: var(--ink); line-height: 1.12; letter-spacing: -0.02em; }
  .mot-sec-title span { color: var(--accent); }
  .mot-body-text { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; color: var(--ink2); line-height: 1.85; margin-bottom: 28px; }
  .mot-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ══════════════════════════════════
     S1: MOTION + REFERENCE FRAME
  ══════════════════════════════════ */
  .mot-definition-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: 18px; margin-bottom: 30px; }
  @media (max-width: 660px) { .mot-definition-grid { grid-template-columns: 1fr; } }
  .mot-def-card {
    background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 24px;
    position: relative; overflow: hidden; min-height: 230px;
  }
  .mot-def-card.primary { background: linear-gradient(135deg, #061426, #08233d); border-color: rgba(125,211,252,0.28); color: #fff; }
  .mot-def-card.primary::after { content: ''; position: absolute; width: 170px; height: 170px; border-radius: 50%; border: 1px dashed rgba(125,211,252,0.18); right: -52px; bottom: -52px; }
  .mot-def-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 10px; }
  .mot-def-card.primary .mot-def-label { color: #7dd3fc; }
  .mot-def-title { font-family: 'Montserrat', sans-serif; font-size: 26px; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 12px; }
  .mot-def-text { font-family: 'Inter', sans-serif; font-size: 15px; line-height: 1.75; color: var(--ink2); }
  .mot-def-card.primary .mot-def-text { color: rgba(255,255,255,0.78); }
  .mot-def-text strong { color: var(--accent2); font-weight: 600; }
  .mot-def-card.primary .mot-def-text strong { color: #e0f2fe; }

  .mot-reference-mini { border-left: 4px solid var(--cyan); padding-left: 18px; margin-top: 16px; }
  .mot-reference-mini .mot-mini-title { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: var(--cyan); margin-bottom: 5px; }
  .mot-reference-mini .mot-mini-text { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2); line-height: 1.7; }

  /* ══════════════════════════════════
     S2: DISTANCE VS DISPLACEMENT
  ══════════════════════════════════ */
  .mot-path-panel { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; margin-bottom: 26px; }
  .mot-path-top { background: linear-gradient(135deg, #041830, #073d5c); padding: 18px 22px; color: #fff; }
  .mot-path-tag { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.17em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 4px; }
  .mot-path-title { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; color: #fff; }
  .mot-path-visual { padding: 30px 22px 26px; background: var(--white); }
  .mot-path-line { position: relative; height: 132px; max-width: 620px; margin: 0 auto 10px; overflow: visible; }
  .mot-path-line::after { content: ''; position: absolute; left: 50%; top: 6px; bottom: 12px; width: 34px; transform: translateX(-50%); background: rgba(15,110,168,0.06); border-radius: 18px; z-index: 0; }
  .mot-point { position: absolute; top: 55px; width: 18px; height: 18px; border-radius: 50%; background: var(--accent); z-index: 3; box-shadow: 0 0 0 7px rgba(15,110,168,0.09); }
  .mot-point.a { left: 4%; }
  .mot-point.b { right: 4%; }
  .mot-point-label { position: absolute; top: -34px; left: 50%; transform: translateX(-50%); font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; color: var(--accent2); white-space: nowrap; }
  .mot-point.b .mot-point-label { transform: translateX(-50%); }
  .mot-straight-path { position: absolute; left: 7%; right: 7%; top: 64px; height: 3px; background: linear-gradient(90deg, var(--green), var(--green)); z-index: 1; }
  .mot-curved-path {
    position: absolute; left: 8%; right: 8%; top: 24px; height: 76px;
    border-top: 3px dashed var(--orange); border-radius: 50% 50% 0 0; z-index: 2;
  }
  .mot-path-legend { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 8px; padding-top: 18px; border-top: 1px solid var(--rule); position: relative; z-index: 4; }
  @media (max-width: 560px) { .mot-path-legend { grid-template-columns: 1fr; } }
  .mot-legend-item { border: 1.5px solid var(--rule); border-radius: 9px; padding: 16px 18px; background: #f8fcff; min-width: 0; }
  .mot-legend-item.distance { border-left: 4px solid var(--orange); }
  .mot-legend-item.displacement { border-left: 4px solid var(--green); }
  .mot-legend-title { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; margin-bottom: 4px; }
  .mot-legend-item.distance .mot-legend-title { color: var(--orange); }
  .mot-legend-item.displacement .mot-legend-title { color: var(--green); }
  .mot-legend-text { font-family: 'Inter', sans-serif; font-size: 13px; line-height: 1.65; color: var(--ink2); }

  .mot-compare-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; border-radius: 10px; border: 1.5px solid var(--rule); margin-bottom: 28px; }
  .mot-compare-wrap::-webkit-scrollbar { height: 5px; }
  .mot-compare-wrap::-webkit-scrollbar-track { background: var(--paper2); }
  .mot-compare-wrap::-webkit-scrollbar-thumb { background: var(--rule); border-radius: 3px; }
  .mot-compare-table { width: 100%; border-collapse: collapse; min-width: 560px; }
  .mot-compare-table th { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #fff; padding: 14px 16px; text-align: left; white-space: nowrap; }
  .mot-compare-table th:nth-child(1) { background: var(--ink2); }
  .mot-compare-table th:nth-child(2) { background: var(--orange); }
  .mot-compare-table th:nth-child(3) { background: var(--green); }
  .mot-compare-table td { font-family: 'Inter', sans-serif; font-size: 13.2px; color: var(--ink2); line-height: 1.6; padding: 12px 16px; border-top: 1px solid var(--rule); border-right: 1px solid var(--rule); }
  .mot-compare-table td:first-child { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ink); }
  .mot-compare-table td:last-child { border-right: none; }
  .mot-compare-table tr:nth-child(even) td { background: var(--paper2); }

  /* ══════════════════════════════════
     S3: SPEED VS VELOCITY
  ══════════════════════════════════ */
  .mot-rate-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 26px; }
  @media (max-width: 620px) { .mot-rate-grid { grid-template-columns: 1fr; } }
  .mot-rate-card { border-radius: 12px; overflow: hidden; border: 1.5px solid var(--rule); background: var(--white); }
  .mot-rate-card.speed .mot-rate-head { background: linear-gradient(135deg, #3b1600, #c2410c); }
  .mot-rate-card.velocity .mot-rate-head { background: linear-gradient(135deg, #03183a, #0f6ea8); }
  .mot-rate-head { padding: 18px 20px; color: #fff; display: flex; align-items: center; gap: 14px; }
  .mot-rate-icon { font-size: 32px; line-height: 1; }
  .mot-rate-tag { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.52); margin-bottom: 3px; }
  .mot-rate-title { font-family: 'Montserrat', sans-serif; font-size: 21px; font-weight: 900; }
  .mot-rate-body { padding: 18px 20px; }
  .mot-formula-pill { display: inline-flex; align-items: center; justify-content: center; background: var(--paper2); color: var(--accent2); border: 1px solid var(--rule); border-radius: 8px; padding: 10px 14px; font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 14px; margin-bottom: 12px; }
  .mot-rate-card.speed .mot-formula-pill { background: var(--orange-lt); color: var(--orange); border-color: rgba(194,65,12,0.18); }
  .mot-rate-card.velocity .mot-formula-pill { background: var(--accent-lt); color: var(--accent2); border-color: rgba(15,110,168,0.18); }
  .mot-rate-text { font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.7; color: var(--ink2); }
  .mot-rate-note { margin-top: 12px; padding: 12px 14px; border-radius: 8px; background: var(--cyan-lt); color: #075985; font-family: 'Inter', sans-serif; font-size: 13.2px; line-height: 1.65; border-left: 4px solid var(--cyan); }
  .mot-rate-note strong { color: #164e63; font-weight: 600; }

  .mot-odometer-box { background: linear-gradient(135deg, #061426, #071b34); color: #fff; border-radius: 12px; padding: 22px 24px; display: grid; grid-template-columns: auto 1fr; gap: 18px; align-items: center; margin-bottom: 28px; position: relative; overflow: hidden; }
  .mot-odometer-box::after { content: ''; position: absolute; right: -40px; bottom: -48px; width: 180px; height: 180px; border-radius: 50%; border: 1px dashed rgba(125,211,252,0.18); }
  .mot-odo-icon { width: 62px; height: 62px; border-radius: 50%; background: rgba(125,211,252,0.14); border: 1px solid rgba(125,211,252,0.22); display: flex; align-items: center; justify-content: center; font-size: 30px; }
  .mot-odo-title { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; color: #e0f2fe; margin-bottom: 4px; }
  .mot-odo-text { font-family: 'Inter', sans-serif; font-size: 14px; color: rgba(255,255,255,0.72); line-height: 1.7; position: relative; z-index: 1; }

  /* ══════════════════════════════════
     S4: UNIFORM / NON-UNIFORM MOTION
  ══════════════════════════════════ */
  .mot-motion-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 30px; }
  @media (max-width: 620px) { .mot-motion-pair { grid-template-columns: 1fr; } }
  .mot-motion-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 22px 20px; position: relative; overflow: hidden; }
  .mot-motion-card.uniform { border-top: 5px solid var(--green); }
  .mot-motion-card.nonuniform { border-top: 5px solid var(--rose); }
  .mot-motion-card::before { content: ''; position: absolute; width: 130px; height: 130px; border-radius: 50%; right: -56px; top: -58px; background: rgba(15,110,168,0.05); }
  .mot-motion-tag { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 9px; }
  .mot-motion-card.uniform .mot-motion-tag { color: var(--green); }
  .mot-motion-card.nonuniform .mot-motion-tag { color: var(--rose); }
  .mot-motion-name { font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900; color: var(--ink); margin-bottom: 10px; letter-spacing: -0.01em; }
  .mot-motion-text { font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.75; color: var(--ink2); }
  .mot-mini-track { height: 54px; margin-top: 16px; position: relative; background: var(--paper); border-radius: 8px; border: 1px solid var(--rule); overflow: hidden; }
  .mot-mini-track::before { content: ''; position: absolute; left: 16px; right: 16px; top: 27px; height: 2px; background: var(--rule); }
  .mot-dot { position: absolute; top: 21px; width: 12px; height: 12px; border-radius: 50%; background: var(--accent); }
  .mot-motion-card.uniform .mot-dot:nth-child(1) { left: 15%; } .mot-motion-card.uniform .mot-dot:nth-child(2) { left: 35%; } .mot-motion-card.uniform .mot-dot:nth-child(3) { left: 55%; } .mot-motion-card.uniform .mot-dot:nth-child(4) { left: 75%; }
  .mot-motion-card.nonuniform .mot-dot:nth-child(1) { left: 12%; } .mot-motion-card.nonuniform .mot-dot:nth-child(2) { left: 24%; } .mot-motion-card.nonuniform .mot-dot:nth-child(3) { left: 48%; } .mot-motion-card.nonuniform .mot-dot:nth-child(4) { left: 82%; }
  .mot-motion-card.uniform .mot-dot { background: var(--green); }
  .mot-motion-card.nonuniform .mot-dot { background: var(--rose); }

  /* ══════════════════════════════════
     S5: ACCELERATION
  ══════════════════════════════════ */
  .mot-accel-hero { background: linear-gradient(135deg, #041830, #062e4f); border-radius: 12px; padding: 26px; margin-bottom: 24px; color: #fff; position: relative; overflow: hidden; }
  .mot-accel-hero::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(125,211,252,0.08) 1px, transparent 1px); background-size: 22px 22px; }
  .mot-accel-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(125,211,252,0.65); margin-bottom: 8px; position: relative; }
  .mot-accel-title { font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900; margin-bottom: 8px; position: relative; }
  .mot-accel-text { font-family: 'Inter', sans-serif; font-size: 14.5px; color: rgba(255,255,255,0.75); line-height: 1.75; max-width: 650px; position: relative; }
  .mot-accel-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 13px; margin-bottom: 28px; }
  @media (max-width: 680px) { .mot-accel-grid { grid-template-columns: 1fr; } }
  .mot-accel-card { background: var(--white); border-radius: 10px; border: 1.5px solid var(--rule); padding: 18px; }
  .mot-accel-card.pos { border-left: 5px solid var(--green); }
  .mot-accel-card.neg { border-left: 5px solid var(--orange); }
  .mot-accel-card.zero { border-left: 5px solid var(--violet); }
  .mot-accel-icon { font-size: 28px; margin-bottom: 8px; display: block; }
  .mot-accel-name { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; margin-bottom: 6px; }
  .mot-accel-card.pos .mot-accel-name { color: var(--green); }
  .mot-accel-card.neg .mot-accel-name { color: var(--orange); }
  .mot-accel-card.zero .mot-accel-name { color: var(--violet); }
  .mot-accel-desc { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2); line-height: 1.65; }
  .mot-accel-types { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 28px; }
  @media (max-width: 560px) { .mot-accel-types { grid-template-columns: 1fr; } }
  .mot-type-block { background: var(--paper2); border: 1.5px solid var(--rule); border-radius: 10px; padding: 18px; }
  .mot-type-title { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: var(--accent2); margin-bottom: 6px; }
  .mot-type-text { font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.7; }

  /* ══════════════════════════════════
     S6: GRAPH CARDS
  ══════════════════════════════════ */
  .mot-graph-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 30px; }
  @media (max-width: 760px) { .mot-graph-grid { grid-template-columns: 1fr; } }
  .mot-graph-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; }
  .mot-graph-head { padding: 17px 20px; background: linear-gradient(135deg, #061426, #08233d); color: #fff; }
  .mot-graph-kicker { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 3px; }
  .mot-graph-title { font-family: 'Montserrat', sans-serif; font-size: clamp(17px, 4.5vw, 20px); font-weight: 900; line-height: 1.18; letter-spacing: -0.01em; overflow-wrap: anywhere; }
  .mot-graph-area { padding: 30px 24px 24px 48px; overflow: hidden; }
  .mot-graph-box { height: 178px; border-left: 2px solid var(--ink2); border-bottom: 2px solid var(--ink2); position: relative; background-image: linear-gradient(rgba(167,205,226,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(167,205,226,0.35) 1px, transparent 1px); background-size: 28px 28px; margin: 0 0 26px 0; }
  .mot-graph-box::before { content: ''; position: absolute; left: 15%; bottom: 18%; width: 70%; height: 3px; background: var(--accent); transform: rotate(-26deg); transform-origin: left center; border-radius: 4px; }
  .mot-graph-card.vel .mot-graph-box::before { transform: rotate(0deg); bottom: 48%; background: var(--violet); }
  .mot-y-label, .mot-x-label { position: absolute; font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; }
  .mot-y-label { left: -36px; top: 52px; writing-mode: vertical-rl; transform: rotate(180deg); transform-origin: center; }
  .mot-x-label { right: 2px; bottom: -24px; }
  .mot-graph-note { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2); line-height: 1.65; }
  .mot-graph-note strong { font-weight: 600; color: var(--accent2); }

  /* ══════════════════════════════════
     S7: EQUATIONS OF MOTION
  ══════════════════════════════════ */
  .mot-equation-stack { display: grid; gap: 14px; margin-bottom: 28px; }
  .mot-equation-card { display: grid; grid-template-columns: 92px 1fr; background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; }
  @media (max-width: 520px) { .mot-equation-card { grid-template-columns: 1fr; } }
  .mot-eq-left { background: linear-gradient(135deg, #061426, #08233d); color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px 10px; }
  .mot-eq-no { font-family: 'Montserrat', sans-serif; font-size: 34px; font-weight: 900; color: #7dd3fc; line-height: 1; }
  .mot-eq-label { font-family: 'Poppins', sans-serif; font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.42); margin-top: 4px; }
  .mot-eq-main { padding: 18px 22px; display: grid; grid-template-columns: 1.1fr 1fr; gap: 18px; align-items: center; }
  @media (max-width: 650px) { .mot-eq-main { grid-template-columns: 1fr; gap: 10px; } }
  .mot-eq-formula { font-family: 'Montserrat', sans-serif; font-size: clamp(23px, 4vw, 32px); font-weight: 900; color: var(--accent2); letter-spacing: -0.01em; }
  .mot-eq-formula sup { font-size: 0.55em; }
  .mot-eq-use { font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.7; border-left: 3px solid var(--rule); padding-left: 14px; }
  .mot-symbol-box { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-bottom: 30px; }
  @media (max-width: 640px) { .mot-symbol-box { grid-template-columns: repeat(2, 1fr); } }
  .mot-symbol-pill { background: var(--paper2); border: 1px solid var(--rule); border-radius: 8px; padding: 11px 12px; }
  .mot-symbol { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; color: var(--accent2); display: block; margin-bottom: 2px; }
  .mot-symbol-name { font-family: 'Inter', sans-serif; font-size: 12px; color: var(--ink2); line-height: 1.35; }

  /* ══════════════════════════════════
     S8: CIRCULAR MOTION
  ══════════════════════════════════ */
  .mot-circular-panel { background: linear-gradient(135deg, #07031a, #12103a); border-radius: 14px; padding: 28px; color: #fff; margin-bottom: 30px; position: relative; overflow: hidden; }
  .mot-circular-panel::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(196,181,253,0.08) 1px, transparent 1px); background-size: 24px 24px; }
  .mot-circular-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 24px; align-items: center; position: relative; }
  @media (max-width: 660px) { .mot-circular-grid { grid-template-columns: 1fr; } }
  .mot-orbit-visual { min-height: 250px; display: flex; align-items: center; justify-content: center; position: relative; }
  .mot-orbit { width: 210px; height: 210px; border: 2px dashed rgba(196,181,253,0.44); border-radius: 50%; position: relative; }
  .mot-orbit::before { content: ''; position: absolute; inset: 48%; border-radius: 50%; background: rgba(196,181,253,0.35); box-shadow: 0 0 36px rgba(196,181,253,0.4); }
  .mot-orbit::after { content: ''; position: absolute; width: 18px; height: 18px; border-radius: 50%; background: #7dd3fc; right: 18px; top: 40px; box-shadow: 0 0 24px rgba(125,211,252,0.55); }
  .mot-radius-line { position: absolute; left: 50%; top: 50%; width: 72px; height: 2px; background: rgba(125,211,252,0.5); transform: rotate(-39deg); transform-origin: left center; }
  .mot-radius-line::after { content: 'r'; position: absolute; left: 34px; top: -18px; font-family: 'Poppins', sans-serif; color: #7dd3fc; font-weight: 700; }
  .mot-circ-content { position: relative; }
  .mot-circ-kicker { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(196,181,253,0.65); margin-bottom: 8px; }
  .mot-circ-title { font-family: 'Montserrat', sans-serif; font-size: 26px; font-weight: 900; margin-bottom: 10px; }
  .mot-circ-text { font-family: 'Inter', sans-serif; font-size: 14.5px; line-height: 1.75; color: rgba(255,255,255,0.75); margin-bottom: 16px; }
  .mot-circ-formula { display: inline-flex; align-items: center; border: 1px solid rgba(196,181,253,0.28); background: rgba(196,181,253,0.09); border-radius: 10px; padding: 12px 16px; font-family: 'Montserrat', sans-serif; font-size: 25px; font-weight: 900; color: #e0f2fe; margin-bottom: 14px; }
  .mot-circ-detail { font-family: 'Inter', sans-serif; font-size: 13.2px; line-height: 1.7; color: rgba(255,255,255,0.68); }
  .mot-circ-detail strong { color: #c4b5fd; font-weight: 600; }

  /* ══════════════════════════════════
     QUICK REVISION
  ══════════════════════════════════ */
  .mot-revision-box { border-radius: 14px; overflow: hidden; border: 1.5px solid var(--rule); background: var(--white); margin-top: 4px; margin-bottom: 46px; }
  .mot-revision-head { background: linear-gradient(135deg, #041830, #073d5c); padding: 18px 22px; }
  .mot-revision-title { font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900; color: #fff; }
  .mot-revision-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; }
  @media (max-width: 580px) { .mot-revision-grid { grid-template-columns: 1fr; } }
  .mot-revision-point { padding: 15px 18px; display: flex; gap: 10px; border-top: 1px solid var(--rule); border-right: 1px solid var(--rule); font-family: 'Inter', sans-serif; font-size: 13.5px; line-height: 1.6; color: var(--ink2); }
  .mot-revision-point:nth-child(even) { border-right: none; }
  .mot-revision-point strong { color: var(--accent2); font-weight: 600; }
  .mot-check { width: 20px; height: 20px; border-radius: 50%; background: var(--green-lt); color: var(--green); display: flex; align-items: center; justify-content: center; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; flex-shrink: 0; }

  /* ══════════════════════════════════
     FAQ ACCORDION
  ══════════════════════════════════ */
  .mot-faq-title { font-family: 'Montserrat', sans-serif; font-size: clamp(24px, 4vw, 34px); font-weight: 900; color: var(--ink); letter-spacing: -0.02em; margin-bottom: 28px; margin-top: 18px; }
  .mot-faq-item { border: 1.5px solid var(--rule); border-radius: 8px; margin-bottom: 12px; overflow: hidden; background: var(--white); transition: border-color 0.2s; }
  .mot-faq-item.open { border-color: var(--accent); }
  .mot-faq-q { width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; text-align: left; gap: 16px; }
  .mot-faq-q-text { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600; color: var(--ink); line-height: 1.5; }
  .mot-faq-item.open .mot-faq-q-text { color: var(--accent); }
  .mot-faq-icon { font-size: 20px; color: var(--accent); flex-shrink: 0; line-height: 1; }
  .mot-faq-ans { font-family: 'Inter', sans-serif; font-size: 15px; color: var(--ink2); line-height: 1.85; padding: 0 24px; max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; }
  .mot-faq-ans.visible { max-height: 1200px; padding: 0 24px 22px; }
  .mot-faq-ans strong { color: var(--accent2); font-weight: 600; }

  @media (max-width: 700px) {
    .mot-body { padding: 48px 18px 72px; }
    .mot-hero-inner { padding: 0 18px; }
    .mot-hero-bar { gap: 12px; }
    .mot-hero-bar-item { flex: 1 1 120px; padding: 0 14px 0 0; margin-right: 14px; }
    .mot-bar-label { font-size: 9px; letter-spacing: 0.12em; }
    .mot-bar-value { font-size: 13px; }
    .mot-overline { font-size: 10px; letter-spacing: 0.16em; }
    .mot-hero-title { font-size: clamp(46px, 14vw, 72px); margin-bottom: 24px; }
    .mot-intro { padding: 24px 20px; }
    .mot-intro p { font-size: 15px; }
    .mot-sec-head { gap: 14px; }
    .mot-sec-num { font-size: 44px; }
    .mot-odometer-box { grid-template-columns: 1fr; }
    .mot-path-visual { padding: 28px 14px 22px; }
    .mot-path-line { height: 128px; }
    .mot-path-legend { gap: 12px; padding-top: 16px; }
    .mot-legend-item { padding: 14px 15px; }
    .mot-graph-head { padding: 16px 18px; }
    .mot-graph-area { padding: 28px 18px 24px 42px; }
    .mot-graph-box { height: 170px; margin-bottom: 26px; }
    .mot-y-label { left: -32px; top: 50px; }
    .mot-faq-q { padding: 16px 18px; }
    .mot-faq-ans.visible { padding: 0 18px 18px; }
  }

  @media (max-width: 420px) {
    .mot-graph-title { font-size: 16px; }
    .mot-graph-area { padding-left: 40px; padding-right: 14px; }
    .mot-graph-box { height: 162px; background-size: 24px 24px; }
    .mot-y-label { left: -31px; top: 48px; font-size: 9px; }
    .mot-x-label { font-size: 9px; }
  }
`;

const faqs = [
  {
    q: "What is motion?",
    a: (<>Motion is the <strong>change in position of a body with respect to a reference point or reference frame</strong>. A body is called moving only when its position changes compared with that chosen reference point.</>),
  },
  {
    q: "What is linear motion?",
    a: (<>Linear motion is the motion of a body <strong>along a straight line</strong>. In this motion, the body changes its position with time while following a straight path.</>),
  },
  {
    q: "What is the difference between distance and displacement?",
    a: (<><strong>Distance</strong> is the total path length covered by a body between two points. <strong>Displacement</strong> is the shortest distance between the initial and final points. Distance depends on the actual path, while displacement depends only on the starting and ending positions.</>),
  },
  {
    q: "What is speed? How is distance measured in vehicles?",
    a: (<><strong>Speed</strong> is the rate of change of distance with time. Distance travelled by vehicles can be measured by an <strong>odometer</strong>.</>),
  },
  {
    q: "What is velocity?",
    a: (<><strong>Velocity</strong> is the rate of change of displacement with time. It has both <strong>magnitude and direction</strong>, so change in either speed or direction changes velocity.</>),
  },
  {
    q: "When is the magnitude of velocity equal to average speed?",
    a: (<>The magnitude of velocity becomes equal to the magnitude of average speed <strong>only when there is no change in direction</strong>. This usually happens when a body moves along a straight line in one direction.</>),
  },
  {
    q: "What is uniform motion and non-uniform motion?",
    a: (<><strong>Uniform motion</strong> means velocity remains constant — there is no change in speed or direction. <strong>Non-uniform motion</strong> means velocity changes with time due to change in speed, direction, or both.</>),
  },
  {
    q: "What is acceleration?",
    a: (<>A body is said to be accelerating when its <strong>velocity changes with time</strong>. Acceleration may happen because speed changes, direction changes, or both change.</>),
  },
  {
    q: "What are uniform and non-uniform acceleration?",
    a: (<><strong>Uniform acceleration</strong> means velocity changes by equal amounts in equal intervals of time. <strong>Non-uniform acceleration</strong> means the change in velocity is not equal in equal time intervals.</>),
  },
  {
    q: "When is acceleration positive, negative, or zero?",
    a: (<>Acceleration is <strong>positive</strong> when velocity increases with time, <strong>negative</strong> when velocity decreases with time, and <strong>zero</strong> when velocity does not change.</>),
  },
  {
    q: "What are the equations of motion?",
    a: (<>The three equations of motion are:<br /><br />1. <strong>v = u + at</strong><br />2. <strong>s = ut + ½at²</strong><br />3. <strong>v² = u² + 2as</strong><br /><br />Here, <strong>u</strong> = initial velocity, <strong>v</strong> = final velocity, <strong>a</strong> = acceleration, <strong>s</strong> = displacement, and <strong>t</strong> = time.</>),
  },
  {
    q: "What is circular motion and uniform circular motion?",
    a: (<>A body is in <strong>circular motion</strong> when it moves around a fixed point. The speed in circular motion can be written as <strong>v = 2πr/T</strong>. If the speed of rotation is constant, the circular motion is called <strong>uniform circular motion</strong>.</>),
  },
];

export default function Motion() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const revisionPoints = [
    <><strong>Motion</strong> is always judged with respect to a reference point.</>,
    <><strong>Distance</strong> is total path length; <strong>displacement</strong> is shortest distance.</>,
    <><strong>Speed</strong> uses distance; <strong>velocity</strong> uses displacement and direction.</>,
    <><strong>Uniform motion</strong> means no change in velocity.</>,
    <><strong>Acceleration</strong> means velocity changes with time.</>,
    <><strong>Circular motion</strong> has continuous change in direction.</>,
  ];

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="mot-root">

        {/* ══════ HERO ══════ */}
        <div className="mot-hero">
          <div className="mot-hero-grid" />
          <div className="mot-hero-track" />
          <div className="mot-speed-lines"><span /><span /><span /></div>
          <div className="mot-glow-a" />
          <div className="mot-glow-b" />
          <div className="mot-hero-bg-num">8</div>
          <div className="mot-hero-inner">
            <div className="mot-overline">Class 9 · Science · Chapter 8</div>
            <h1 className="mot-hero-title">
              <em>Motion</em>
              <span className="mot-title-sub">in Physics</span>
            </h1>
            <div className="mot-hero-bar">
              {[["Subject","Science — Physics"],["Topics","Speed · Velocity · Acceleration"],["Board","CBSE · NCERT"],["FAQs","12 Questions"]].map(([l,v])=>(
                <div className="mot-hero-bar-item" key={l}><div className="mot-bar-label">{l}</div><div className="mot-bar-value">{v}</div></div>
              ))}
            </div>
          </div>
        </div>

        <div className="mot-body">

          {/* Lead Intro */}
          <div className="mot-intro">
            <p><strong>Motion</strong> is one of the most basic ideas in physics. We describe motion by observing how the position of a body changes with time compared to a reference point.</p>
            <p>This chapter builds the foundation for <strong>distance, displacement, speed, velocity, acceleration, graphs, equations of motion</strong>, and circular motion — the core language used to study moving objects.</p>
          </div>

          {/* S1 */}
          <div className="mot-sec">
            <div className="mot-sec-head">
              <div className="mot-sec-num">1</div>
              <div className="mot-sec-title-wrap">
                <div className="mot-sec-kicker">Basic Idea</div>
                <h2 className="mot-sec-title">Motion &amp; <span>Reference Frame</span></h2>
              </div>
            </div>
            <p className="mot-body-text">A body is said to be in motion only when its <strong>position changes with respect to a reference frame or reference point</strong>. Without a reference point, motion cannot be judged properly.</p>

            <div className="mot-definition-grid">
              <div className="mot-def-card primary">
                <div className="mot-def-label">Definition</div>
                <div className="mot-def-title">What is Motion?</div>
                <div className="mot-def-text">Motion is the <strong>change in position of a body</strong> with respect to the reference frame or reference point.</div>
              </div>
              <div className="mot-def-card">
                <div className="mot-def-label">Straight Line Motion</div>
                <div className="mot-def-title">Linear Motion</div>
                <div className="mot-def-text">A moving body is in <strong>linear motion</strong> when it changes its position with time along a straight line.</div>
                <div className="mot-reference-mini">
                  <div className="mot-mini-title">Example</div>
                  <div className="mot-mini-text">A body moving on a straight road without changing direction.</div>
                </div>
              </div>
            </div>
          </div>

          {/* S2 */}
          <div className="mot-divider"><div className="mot-divider-mark" /></div>
          <div className="mot-sec">
            <div className="mot-sec-head">
              <div className="mot-sec-num">2</div>
              <div className="mot-sec-title-wrap">
                <div className="mot-sec-kicker">Path vs Shortest Route</div>
                <h2 className="mot-sec-title">Distance &amp; <span>Displacement</span></h2>
              </div>
            </div>
            <p className="mot-body-text"><strong>Distance</strong> measures the actual path covered by a body, while <strong>displacement</strong> measures the shortest distance between the initial and final positions.</p>

            <div className="mot-path-panel">
              <div className="mot-path-top">
                <div className="mot-path-tag">Visual Difference</div>
                <div className="mot-path-title">Actual Path vs Shortest Path</div>
              </div>
              <div className="mot-path-visual">
                <div className="mot-path-line">
                  <div className="mot-curved-path" />
                  <div className="mot-straight-path" />
                  <div className="mot-point a"><span className="mot-point-label">Start</span></div>
                  <div className="mot-point b"><span className="mot-point-label">End</span></div>
                </div>
                <div className="mot-path-legend">
                  <div className="mot-legend-item distance">
                    <div className="mot-legend-title">Distance</div>
                    <div className="mot-legend-text">Total path length actually covered by the body.</div>
                  </div>
                  <div className="mot-legend-item displacement">
                    <div className="mot-legend-title">Displacement</div>
                    <div className="mot-legend-text">Shortest distance between the two points.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mot-compare-wrap">
              <table className="mot-compare-table">
                <thead>
                  <tr>
                    <th>Basis</th>
                    <th>Distance</th>
                    <th>Displacement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Meaning</td><td>Path length covered by a body between two points.</td><td>Shortest distance between two points.</td></tr>
                  <tr><td>Depends on</td><td>Actual path followed.</td><td>Initial and final position only.</td></tr>
                  <tr><td>Direction</td><td>Direction is not considered.</td><td>Direction is considered.</td></tr>
                  <tr><td>Value</td><td>Always positive or zero.</td><td>Can be positive, negative, or zero depending on direction.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* S3 */}
          <div className="mot-divider"><div className="mot-divider-mark" /></div>
          <div className="mot-sec">
            <div className="mot-sec-head">
              <div className="mot-sec-num">3</div>
              <div className="mot-sec-title-wrap">
                <div className="mot-sec-kicker">Rate of Motion</div>
                <h2 className="mot-sec-title">Speed &amp; <span>Velocity</span></h2>
              </div>
            </div>
            <p className="mot-body-text">Speed and velocity both describe how fast a body moves, but they are not the same. <strong>Speed</strong> is based on distance, while <strong>velocity</strong> is based on displacement and direction.</p>

            <div className="mot-rate-grid">
              <div className="mot-rate-card speed">
                <div className="mot-rate-head">
                  <span className="mot-rate-icon">🏁</span>
                  <div><div className="mot-rate-tag">Distance Based</div><div className="mot-rate-title">Speed</div></div>
                </div>
                <div className="mot-rate-body">
                  <div className="mot-formula-pill">Speed = Distance ÷ Time</div>
                  <div className="mot-rate-text">Speed is the <strong>rate of change of position in distance</strong>. It tells how fast the body covers path length.</div>
                </div>
              </div>
              <div className="mot-rate-card velocity">
                <div className="mot-rate-head">
                  <span className="mot-rate-icon">🧭</span>
                  <div><div className="mot-rate-tag">Direction Based</div><div className="mot-rate-title">Velocity</div></div>
                </div>
                <div className="mot-rate-body">
                  <div className="mot-formula-pill">Velocity = Displacement ÷ Time</div>
                  <div className="mot-rate-text">Velocity is the <strong>rate of change of displacement</strong>. It has both magnitude and direction.</div>
                </div>
              </div>
            </div>

            <div className="mot-odometer-box">
              <div className="mot-odo-icon">⏱️</div>
              <div>
                <div className="mot-odo-title">Odometer Connection</div>
                <div className="mot-odo-text">Distance travelled by a vehicle is measured using an <strong>odometer</strong>. It records total path length, not displacement.</div>
              </div>
            </div>

            <div className="mot-rate-note"><strong>Important:</strong> The magnitude of velocity becomes equal to the magnitude of average speed only when there is <strong>no change in direction</strong>.</div>
          </div>

          {/* S4 */}
          <div className="mot-divider"><div className="mot-divider-mark" /></div>
          <div className="mot-sec">
            <div className="mot-sec-head">
              <div className="mot-sec-num">4</div>
              <div className="mot-sec-title-wrap">
                <div className="mot-sec-kicker">Based on Velocity</div>
                <h2 className="mot-sec-title">Uniform &amp; <span>Non-Uniform Motion</span></h2>
              </div>
            </div>
            <p className="mot-body-text">The nature of motion depends on whether velocity remains constant or changes with time. A change in speed, direction, or both makes the motion non-uniform.</p>

            <div className="mot-motion-pair">
              <div className="mot-motion-card uniform">
                <div className="mot-motion-tag">Constant Velocity</div>
                <div className="mot-motion-name">Uniform Motion</div>
                <div className="mot-motion-text">A body is in uniform motion if there is <strong>no change in velocity</strong> — no change in speed or direction.</div>
                <div className="mot-mini-track"><span className="mot-dot" /><span className="mot-dot" /><span className="mot-dot" /><span className="mot-dot" /></div>
              </div>
              <div className="mot-motion-card nonuniform">
                <div className="mot-motion-tag">Changing Velocity</div>
                <div className="mot-motion-name">Non-Uniform Motion</div>
                <div className="mot-motion-text">A body is in non-uniform motion when velocity changes with time — due to change in speed, direction, or both.</div>
                <div className="mot-mini-track"><span className="mot-dot" /><span className="mot-dot" /><span className="mot-dot" /><span className="mot-dot" /></div>
              </div>
            </div>
          </div>

          {/* S5 */}
          <div className="mot-divider"><div className="mot-divider-mark" /></div>
          <div className="mot-sec">
            <div className="mot-sec-head">
              <div className="mot-sec-num">5</div>
              <div className="mot-sec-title-wrap">
                <div className="mot-sec-kicker">Change in Velocity</div>
                <h2 className="mot-sec-title">Acceleration &amp; <span>Its Cases</span></h2>
              </div>
            </div>

            <div className="mot-accel-hero">
              <div className="mot-accel-label">Core Definition</div>
              <div className="mot-accel-title">Acceleration means velocity changes with time.</div>
              <div className="mot-accel-text">A body is accelerating when its velocity changes. This change may be because the speed increases, speed decreases, or direction changes.</div>
            </div>

            <div className="mot-accel-types">
              <div className="mot-type-block">
                <div className="mot-type-title">Uniform Acceleration</div>
                <div className="mot-type-text">Uniform change in velocity with time. Velocity changes by equal amounts in equal intervals of time.</div>
              </div>
              <div className="mot-type-block">
                <div className="mot-type-title">Non-Uniform Acceleration</div>
                <div className="mot-type-text">Non-uniform change in velocity with time. Velocity does not change equally in equal intervals.</div>
              </div>
            </div>

            <div className="mot-accel-grid">
              <div className="mot-accel-card pos">
                <span className="mot-accel-icon">⬆️</span>
                <div className="mot-accel-name">Positive Acceleration</div>
                <div className="mot-accel-desc">Velocity of the moving body increases with time.</div>
              </div>
              <div className="mot-accel-card neg">
                <span className="mot-accel-icon">⬇️</span>
                <div className="mot-accel-name">Negative Acceleration</div>
                <div className="mot-accel-desc">Velocity of the moving body decreases with time.</div>
              </div>
              <div className="mot-accel-card zero">
                <span className="mot-accel-icon">➖</span>
                <div className="mot-accel-name">Zero Acceleration</div>
                <div className="mot-accel-desc">Velocity of the moving body does not change.</div>
              </div>
            </div>
          </div>

          {/* S6 */}
          <div className="mot-divider"><div className="mot-divider-mark" /></div>
          <div className="mot-sec">
            <div className="mot-sec-head">
              <div className="mot-sec-num">6</div>
              <div className="mot-sec-title-wrap">
                <div className="mot-sec-kicker">Graphical Study</div>
                <h2 className="mot-sec-title">Distance-Time &amp; <span>Velocity-Time Graphs</span></h2>
              </div>
            </div>
            <p className="mot-body-text">Graphs help us study motion visually. A <strong>distance-time graph</strong> shows how distance changes with time, while a <strong>velocity-time graph</strong> shows how velocity changes with time.</p>

            <div className="mot-graph-grid">
              <div className="mot-graph-card dist">
                <div className="mot-graph-head"><div className="mot-graph-kicker">Graph 1</div><div className="mot-graph-title">Distance-Time Graph</div></div>
                <div className="mot-graph-area">
                  <div className="mot-graph-box"><span className="mot-y-label">Distance</span><span className="mot-x-label">Time</span></div>
                  <div className="mot-graph-note">Shows how the <strong>distance covered</strong> changes with time.</div>
                </div>
              </div>
              <div className="mot-graph-card vel">
                <div className="mot-graph-head"><div className="mot-graph-kicker">Graph 2</div><div className="mot-graph-title">Velocity-Time Graph</div></div>
                <div className="mot-graph-area">
                  <div className="mot-graph-box"><span className="mot-y-label">Velocity</span><span className="mot-x-label">Time</span></div>
                  <div className="mot-graph-note">Shows how the <strong>velocity of a body</strong> changes with time.</div>
                </div>
              </div>
            </div>
          </div>

          {/* S7 */}
          <div className="mot-divider"><div className="mot-divider-mark" /></div>
          <div className="mot-sec">
            <div className="mot-sec-head">
              <div className="mot-sec-num">7</div>
              <div className="mot-sec-title-wrap">
                <div className="mot-sec-kicker">Numerical Base</div>
                <h2 className="mot-sec-title">Equations of <span>Motion</span></h2>
              </div>
            </div>
            <p className="mot-body-text">The equations of motion connect displacement, velocity, acceleration, and time. They are used for solving basic motion numericals.</p>

            <div className="mot-equation-stack">
              <div className="mot-equation-card">
                <div className="mot-eq-left"><div className="mot-eq-no">1</div><div className="mot-eq-label">Equation</div></div>
                <div className="mot-eq-main"><div className="mot-eq-formula">v = u + at</div><div className="mot-eq-use">Used when final velocity depends on initial velocity, acceleration, and time.</div></div>
              </div>
              <div className="mot-equation-card">
                <div className="mot-eq-left"><div className="mot-eq-no">2</div><div className="mot-eq-label">Equation</div></div>
                <div className="mot-eq-main"><div className="mot-eq-formula">s = ut + ½at<sup>2</sup></div><div className="mot-eq-use">Used to calculate displacement when time and acceleration are known.</div></div>
              </div>
              <div className="mot-equation-card">
                <div className="mot-eq-left"><div className="mot-eq-no">3</div><div className="mot-eq-label">Equation</div></div>
                <div className="mot-eq-main"><div className="mot-eq-formula">v<sup>2</sup> = u<sup>2</sup> + 2as</div><div className="mot-eq-use">Useful when time is not directly given in the question.</div></div>
              </div>
            </div>

            <div className="mot-symbol-box">
              {[['u','Initial velocity'],['v','Final velocity'],['a','Acceleration'],['s','Displacement'],['t','Time']].map(([s,n])=>(
                <div className="mot-symbol-pill" key={s}><span className="mot-symbol">{s}</span><span className="mot-symbol-name">{n}</span></div>
              ))}
            </div>
          </div>

          {/* S8 */}
          <div className="mot-divider"><div className="mot-divider-mark" /></div>
          <div className="mot-sec">
            <div className="mot-sec-head">
              <div className="mot-sec-num">8</div>
              <div className="mot-sec-title-wrap">
                <div className="mot-sec-kicker">Motion Around a Fixed Point</div>
                <h2 className="mot-sec-title">Circular &amp; <span>Uniform Circular Motion</span></h2>
              </div>
            </div>

            <div className="mot-circular-panel">
              <div className="mot-circular-grid">
                <div className="mot-orbit-visual"><div className="mot-orbit"><div className="mot-radius-line" /></div></div>
                <div className="mot-circ-content">
                  <div className="mot-circ-kicker">Circular Path</div>
                  <div className="mot-circ-title">Motion around a fixed point</div>
                  <div className="mot-circ-text">A body is said to be in circular motion when it rotates or moves around a fixed point.</div>
                  <div className="mot-circ-formula">v = 2πr / T</div>
                  <div className="mot-circ-detail"><strong>r</strong> = radius of the circular path &nbsp;·&nbsp; <strong>T</strong> = time period. If the speed of rotation is constant, then the circular motion is <strong>uniform circular motion</strong>.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Revision */}
          <div className="mot-revision-box">
            <div className="mot-revision-head"><div className="mot-revision-title">Quick Revision Snapshot</div></div>
            <div className="mot-revision-grid">
              {revisionPoints.map((point, i) => (
                <div className="mot-revision-point" key={i}><span className="mot-check">✓</span><span>{point}</span></div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <h2 className="mot-faq-title">Frequently Asked Questions</h2>
          <div className="mot-faq-list">
            {faqs.map((item, i) => (
              <div className={`mot-faq-item ${openIndex === i ? 'open' : ''}`} key={i}>
                <button className="mot-faq-q" onClick={() => toggle(i)}>
                  <span className="mot-faq-q-text">{item.q}</span>
                  <span className="mot-faq-icon">{openIndex === i ? '▴' : '▾'}</span>
                </button>
                <div className={`mot-faq-ans ${openIndex === i ? 'visible' : ''}`}>{item.a}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
