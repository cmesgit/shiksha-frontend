import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #071623;
    --ink2:       #183044;
    --muted:      #526b7d;
    --paper:      #f0f9ff;
    --paper2:     #e0f2fe;
    --accent:     #0369a1;
    --accent2:    #075985;
    --accent-lt:  #e0f2fe;
    --cyan:       #0891b2;
    --cyan-lt:    #cffafe;
    --indigo:     #4338ca;
    --indigo-lt:  #e0e7ff;
    --violet:     #7c3aed;
    --violet-lt:  #ede9fe;
    --rose:       #be123c;
    --rose-lt:    #ffe4e6;
    --green:      #15803d;
    --green-lt:   #dcfce7;
    --amber:      #b45309;
    --amber-lt:   #fef3c7;
    --rule:       #7dd3fc;
    --white:      #ffffff;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  .snd-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  /* ═════════════════ HERO — sound wave / deep blue theme ═════════════════ */
  .snd-hero {
    background: radial-gradient(circle at 74% 24%, rgba(34,211,238,0.14) 0%, transparent 28%),
                radial-gradient(circle at 18% 20%, rgba(67,56,202,0.18) 0%, transparent 34%),
                linear-gradient(135deg, #020617 0%, #06192d 50%, #082f49 100%);
    min-height: 88vh;
    display: flex;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
    padding: 0 0 64px;
  }
  @media (max-width: 700px) { .snd-hero { min-height: auto; align-items: flex-start; padding: 72px 0 48px; } }
  .snd-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 6px;
    background: linear-gradient(90deg, #0369a1 0%, #0891b2 32%, #4338ca 66%, #7c3aed 100%);
  }
  .snd-hero-grid {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(125,211,252,0.14) 1px, transparent 1px);
    background-size: 30px 30px;
    pointer-events: none;
    opacity: 0.72;
  }
  .snd-wave-mark {
    position: absolute;
    top: 50%; right: 4%;
    width: clamp(190px, 30vw, 390px);
    height: clamp(150px, 24vw, 300px);
    transform: translateY(-50%);
    pointer-events: none;
    opacity: 0.42;
  }
  .snd-wave-line,
  .snd-wave-line::before,
  .snd-wave-line::after {
    position: absolute;
    left: 0; right: 0;
    height: 44px;
    border: 2px solid rgba(125,211,252,0.20);
    border-left: 0;
    border-right: 0;
    border-bottom: 0;
    border-radius: 50%;
    content: '';
  }
  .snd-wave-line { top: 42%; transform: rotate(-6deg); }
  .snd-wave-line::before { top: -42px; transform: scaleX(0.82); }
  .snd-wave-line::after { top: 42px; transform: scaleX(0.82); }
  .snd-speaker-mark {
    position: absolute;
    left: 10%; top: 50%;
    width: 54px; height: 82px;
    transform: translateY(-50%);
  }
  .snd-speaker-mark::before {
    content: '';
    position: absolute;
    left: 0; top: 22px;
    width: 22px; height: 38px;
    background: rgba(125,211,252,0.18);
    border-radius: 4px;
  }
  .snd-speaker-mark::after {
    content: '';
    position: absolute;
    left: 18px; top: 10px;
    border-top: 31px solid transparent;
    border-bottom: 31px solid transparent;
    border-left: 36px solid rgba(125,211,252,0.16);
  }
  .snd-glow-a { position: absolute; top: 14%; left: 5%; width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(3,105,161,0.22) 0%, transparent 70%); pointer-events: none; }
  .snd-glow-b { position: absolute; bottom: 8%; right: 18%; width: 230px; height: 230px; border-radius: 50%; background: radial-gradient(circle, rgba(67,56,202,0.16) 0%, transparent 72%); pointer-events: none; }
  .snd-hero-bg-num {
    position: absolute;
    bottom: -86px; right: -28px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(190px, 34vw, 470px);
    font-weight: 900;
    line-height: 1;
    color: rgba(255,255,255,0.018);
    letter-spacing: -0.06em;
    user-select: none;
    pointer-events: none;
  }
  .snd-hero-inner { max-width: 900px; width: 100%; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
  .snd-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #7dd3fc;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .snd-overline::before, .snd-overline::after { content: ''; flex: 0 0 40px; height: 1px; background: #7dd3fc; }
  .snd-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(42px, 9vw, 92px);
    font-weight: 900;
    color: #fff;
    line-height: 0.94;
    letter-spacing: -0.04em;
    margin-bottom: 32px;
  }
  .snd-hero-title em { font-style: normal; color: #7dd3fc; }
  .snd-hero-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 24px;
    margin-top: 8px;
  }
  .snd-hero-bar-item { flex: 1 1 150px; padding: 0 24px 0 0; border-right: 1px solid rgba(255,255,255,0.08); margin-right: 24px; }
  .snd-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .snd-bar-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.30); margin-bottom: 5px; }
  .snd-bar-value { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.74); }
  @media (max-width: 700px) {
    .snd-hero-inner { padding: 0 18px; }
    .snd-overline { font-size: 10px; letter-spacing: 0.16em; }
    .snd-overline::before, .snd-overline::after { flex-basis: 28px; }
    .snd-hero-title { font-size: clamp(46px, 15vw, 70px); margin-bottom: 24px; }
    .snd-hero-bar { gap: 12px; }
    .snd-hero-bar-item { flex: 1 1 120px; padding: 0 14px 0 0; margin-right: 14px; }
    .snd-bar-label { font-size: 9px; letter-spacing: 0.12em; }
    .snd-bar-value { font-size: 13px; }
    .snd-wave-mark { opacity: 0.25; right: -24%; }
  }

  /* ═════════════════ BODY ═════════════════ */
  .snd-body { max-width: 920px; margin: 0 auto; padding: 72px 32px 100px; }
  @media (max-width: 700px) { .snd-body { padding: 48px 18px 72px; } }

  .snd-intro {
    background: linear-gradient(135deg, #020617 0%, #082f49 100%);
    border-left: 5px solid var(--accent);
    border-radius: 6px;
    padding: 36px 40px;
    margin-bottom: 72px;
    position: relative;
    overflow: hidden;
  }
  .snd-intro::after { content: '♪'; position: absolute; right: 34px; top: 50%; transform: translateY(-50%); font-family: 'Montserrat', sans-serif; font-size: 126px; font-weight: 900; opacity: 0.08; }
  .snd-intro p { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 500; color: rgba(255,255,255,0.86); line-height: 1.8; margin: 0 0 14px; position: relative; z-index: 1; }
  .snd-intro p:last-child { margin-bottom: 0; }
  .snd-intro strong { color: #7dd3fc; }
  @media (max-width: 700px) { .snd-intro { padding: 24px 20px; } .snd-intro p { font-size: 15px; } }

  .snd-divider { margin: 56px 0; display: flex; align-items: center; gap: 16px; }
  .snd-divider::before, .snd-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .snd-divider-mark { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

  .snd-sec { margin-bottom: 56px; }
  .snd-sec-head { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 30px; border-bottom: 2px solid var(--rule); padding-bottom: 18px; }
  .snd-sec-num { font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900; color: var(--rule); line-height: 1; flex-shrink: 0; }
  .snd-sec-title-wrap { padding-top: 8px; }
  .snd-sec-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .snd-sec-title { font-family: 'Montserrat', sans-serif; font-size: clamp(22px, 4vw, 32px); font-weight: 900; color: var(--ink); line-height: 1.15; letter-spacing: -0.02em; }
  .snd-sec-title span { color: var(--accent); }
  .snd-body-text { font-size: 16px; color: var(--ink2); line-height: 1.85; margin-bottom: 26px; }
  .snd-body-text strong { color: var(--accent2); font-weight: 700; }
  @media (max-width: 580px) {
    .snd-sec-head { gap: 14px; margin-bottom: 24px; }
    .snd-sec-num { font-size: 42px; }
    .snd-sec-title-wrap { padding-top: 4px; }
  }

  /* basics */
  .snd-basics-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 18px; align-items: stretch; }
  .snd-basic-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; box-shadow: 0 16px 34px rgba(7,89,133,0.08); }
  .snd-basic-top { padding: 26px; background: linear-gradient(135deg, #e0f2fe 0%, #cffafe 100%); }
  .snd-basic-top h3 { font-family: 'Montserrat', sans-serif; font-size: 26px; font-weight: 900; color: var(--accent2); margin-bottom: 10px; }
  .snd-basic-top p { color: var(--ink2); line-height: 1.8; }
  .snd-basic-list { padding: 24px 26px; display: grid; gap: 14px; }
  .snd-basic-point { display: grid; grid-template-columns: 28px 1fr; gap: 12px; align-items: flex-start; color: var(--ink2); line-height: 1.7; }
  .snd-basic-dot { width: 28px; height: 28px; border-radius: 50%; background: var(--accent-lt); color: var(--accent2); display: flex; align-items: center; justify-content: center; font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 12px; }
  .snd-speaker-card { background: linear-gradient(135deg, #020617 0%, #082f49 100%); border-radius: 12px; padding: 28px; color: white; position: relative; overflow: hidden; min-height: 350px; }
  .snd-speaker-title { font-family: 'Montserrat', sans-serif; font-size: 25px; font-weight: 900; color: #7dd3fc; margin-bottom: 10px; }
  .snd-speaker-card p { color: rgba(255,255,255,0.82); line-height: 1.8; position: relative; z-index: 2; }
  .snd-speaker-visual { position: absolute; left: 20px; right: 20px; bottom: 28px; height: 160px; display: flex; align-items: center; }
  .snd-speaker-shape { width: 86px; height: 90px; position: relative; flex-shrink: 0; }
  .snd-speaker-shape::before { content: ''; position: absolute; left: 0; top: 28px; width: 26px; height: 34px; border-radius: 4px; background: rgba(125,211,252,0.22); }
  .snd-speaker-shape::after { content: ''; position: absolute; left: 22px; top: 14px; border-top: 31px solid transparent; border-bottom: 31px solid transparent; border-left: 52px solid rgba(125,211,252,0.28); }
  .snd-rings { flex: 1; height: 110px; position: relative; min-width: 0; }
  .snd-ring { position: absolute; top: 50%; transform: translateY(-50%); border: 2px solid rgba(125,211,252,0.32); border-left: 0; border-radius: 50%; }
  .snd-ring.r1 { left: 4px; width: 64px; height: 70px; }
  .snd-ring.r2 { left: 44px; width: 94px; height: 94px; opacity: 0.8; }
  .snd-ring.r3 { left: 100px; width: 130px; height: 114px; opacity: 0.58; }
  @media (max-width: 820px) { .snd-basics-grid { grid-template-columns: 1fr; } .snd-speaker-card { min-height: 330px; } }

  /* wave types */
  .snd-wave-type-panel { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; }
  .snd-wave-type-grid { display: grid; grid-template-columns: 1fr 1fr; }
  .snd-wave-type { padding: 26px; min-height: 280px; position: relative; }
  .snd-wave-type:nth-child(2) { border-left: 1.5px solid var(--rule); }
  .snd-wave-type h3 { font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900; color: var(--accent2); margin-bottom: 12px; }
  .snd-wave-type p { color: var(--ink2); line-height: 1.75; margin-bottom: 18px; }
  .snd-longitudinal-visual { height: 110px; border-radius: 10px; border: 1px solid var(--rule); background: linear-gradient(90deg, #fff 0%, #e0f2fe 100%); position: relative; overflow: hidden; }
  .snd-dot-row { position: absolute; left: 16px; right: 16px; top: 50%; transform: translateY(-50%); height: 30px; display: flex; align-items: center; justify-content: space-between; }
  .snd-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); opacity: 0.48; }
  .snd-dot.close { margin-left: -8px; opacity: 0.92; background: var(--indigo); }
  .snd-parallel-arrow { position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%); width: 106px; height: 4px; background: var(--accent); border-radius: 999px; }
  .snd-parallel-arrow::after { content: ''; position: absolute; right: -1px; top: 50%; transform: translateY(-50%); border-top: 8px solid transparent; border-bottom: 8px solid transparent; border-left: 13px solid var(--accent); }
  .snd-transverse-visual { height: 110px; border-radius: 10px; border: 1px solid var(--rule); background: linear-gradient(90deg, #fff 0%, #e0f2fe 100%); position: relative; overflow: hidden; }
  .snd-sine { position: absolute; left: 20px; right: 20px; top: 50%; height: 2px; background: var(--muted); }
  .snd-sine::before { content: ''; position: absolute; left: 0; right: 0; top: -34px; height: 68px; background: repeating-radial-gradient(ellipse at center, transparent 0 31px, transparent 31px 100px); }
  .snd-wave-svg { position: absolute; left: 20px; right: 20px; top: 22px; height: 68px; }
  .snd-wave-svg svg { width: 100%; height: 100%; overflow: visible; }
  .snd-vertical-arrow { position: absolute; right: 28px; top: 28px; width: 4px; height: 58px; background: var(--rose); border-radius: 999px; }
  .snd-vertical-arrow::before { content: ''; position: absolute; top: -1px; left: 50%; transform: translateX(-50%); border-left: 8px solid transparent; border-right: 8px solid transparent; border-bottom: 12px solid var(--rose); }
  .snd-vertical-arrow::after { content: ''; position: absolute; bottom: -1px; left: 50%; transform: translateX(-50%); border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 12px solid var(--rose); }
  @media (max-width: 760px) { .snd-wave-type-grid { grid-template-columns: 1fr; } .snd-wave-type:nth-child(2) { border-left: none; border-top: 1.5px solid var(--rule); } }

  /* compression */
  .snd-compression-card { background: linear-gradient(135deg, #020617 0%, #083344 100%); color: white; border-radius: 12px; padding: 30px; overflow: hidden; position: relative; }
  .snd-compression-card::after { content: ''; position: absolute; right: -80px; top: -80px; width: 240px; height: 240px; border-radius: 50%; border: 1px solid rgba(125,211,252,0.18); }
  .snd-compression-grid { display: grid; grid-template-columns: 1fr 1.05fr; gap: 28px; align-items: center; position: relative; z-index: 1; }
  .snd-compression-title { font-family: 'Montserrat', sans-serif; font-size: 30px; font-weight: 900; color: #7dd3fc; margin-bottom: 12px; }
  .snd-compression-text { color: rgba(255,255,255,0.84); line-height: 1.85; }
  .snd-density-stage { min-height: 250px; border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; background: rgba(255,255,255,0.06); padding: 24px; display: flex; flex-direction: column; justify-content: center; gap: 24px; }
  .snd-cr-line { height: 42px; border-radius: 999px; background: repeating-linear-gradient(90deg, rgba(125,211,252,0.14) 0 8px, rgba(125,211,252,0.54) 8px 13px, rgba(255,255,255,0.08) 13px 28px); border: 1px solid rgba(125,211,252,0.18); }
  .snd-cr-labels { display: flex; justify-content: space-around; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.74); }
  .snd-cr-labels span:nth-child(odd) { color: #7dd3fc; }
  .snd-density-wave { height: 80px; position: relative; }
  .snd-density-wave svg { width: 100%; height: 100%; overflow: visible; }
  .snd-density-axis { position: absolute; left: 0; right: 0; top: 50%; height: 2px; background: rgba(255,255,255,0.3); }
  @media (max-width: 780px) { .snd-compression-card { padding: 24px 20px; } .snd-compression-grid { grid-template-columns: 1fr; } .snd-density-stage { min-height: 230px; } }

  /* characteristics */
  .snd-char-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .snd-char-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 20px; min-height: 180px; position: relative; overflow: hidden; }
  .snd-char-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 5px; background: linear-gradient(90deg, var(--accent), var(--cyan)); }
  .snd-char-symbol { font-family: 'Montserrat', sans-serif; font-size: 34px; font-weight: 900; color: var(--accent); margin-bottom: 12px; }
  .snd-char-card h3 { font-family: 'Montserrat', sans-serif; font-size: 19px; font-weight: 900; color: var(--ink); margin-bottom: 8px; }
  .snd-char-card p { color: var(--ink2); font-size: 14px; line-height: 1.65; }
  @media (max-width: 860px) { .snd-char-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 520px) { .snd-char-grid { grid-template-columns: 1fr; } }

  /* pitch loudness */
  .snd-compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .snd-compare-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; }
  .snd-compare-head { padding: 22px 24px; background: linear-gradient(135deg, #e0f2fe, #fff); border-bottom: 1.5px solid var(--rule); }
  .snd-compare-head h3 { font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900; color: var(--accent2); margin-bottom: 8px; }
  .snd-compare-head p { color: var(--ink2); line-height: 1.7; }
  .snd-compare-stage { padding: 22px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .snd-mini-wave { min-height: 128px; border: 1px solid var(--rule); border-radius: 10px; background: #fff; position: relative; overflow: hidden; padding: 12px; }
  .snd-mini-wave svg { width: 100%; height: 82px; overflow: visible; }
  .snd-mini-label { text-align: center; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; color: var(--muted); }
  @media (max-width: 860px) { .snd-compare-grid { grid-template-columns: 1fr; } }
  @media (max-width: 430px) { .snd-compare-stage { grid-template-columns: 1fr; } }

  /* music */
  .snd-music-panel { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; }
  .snd-music-top { padding: 28px; background: linear-gradient(135deg, #e0e7ff 0%, #e0f2fe 100%); }
  .snd-music-top h3 { font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900; color: var(--indigo); margin-bottom: 10px; }
  .snd-music-top p { color: var(--ink2); line-height: 1.8; }
  .snd-music-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
  .snd-music-card { padding: 22px; border-top: 1.5px solid var(--rule); min-height: 190px; }
  .snd-music-card + .snd-music-card { border-left: 1.5px solid var(--rule); }
  .snd-music-card h4 { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; color: var(--ink); margin-bottom: 10px; }
  .snd-music-card p { color: var(--ink2); line-height: 1.7; font-size: 15px; }
  .snd-note-row { display: flex; gap: 6px; margin-top: 14px; }
  .snd-note { width: 26px; height: 26px; border-radius: 50%; background: var(--indigo-lt); color: var(--indigo); display: flex; align-items: center; justify-content: center; font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; }
  @media (max-width: 820px) { .snd-music-grid { grid-template-columns: 1fr; } .snd-music-card + .snd-music-card { border-left: none; } }

  /* speed */
  .snd-speed-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .snd-speed-card { background: #020617; color: white; border-radius: 12px; border-left: 5px solid var(--accent); padding: 26px; min-height: 280px; }
  .snd-speed-card h3 { font-family: 'Montserrat', sans-serif; font-size: 27px; font-weight: 900; color: #7dd3fc; margin-bottom: 12px; }
  .snd-speed-formula { font-family: 'Montserrat', sans-serif; font-size: clamp(28px, 5vw, 42px); font-weight: 900; color: white; margin: 18px 0; }
  .snd-speed-card p { color: rgba(255,255,255,0.82); line-height: 1.75; }
  .snd-medium-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 26px; min-height: 280px; }
  .snd-medium-card h3 { font-family: 'Montserrat', sans-serif; font-size: 26px; font-weight: 900; color: var(--accent2); margin-bottom: 18px; }
  .snd-medium-order { display: grid; gap: 12px; }
  .snd-medium-pill { display: flex; align-items: center; justify-content: space-between; gap: 14px; background: var(--accent-lt); border: 1px solid var(--rule); border-radius: 10px; padding: 14px 16px; font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--accent2); }
  .snd-medium-pill span:last-child { color: var(--muted); font-size: 13px; }
  .snd-speed-note { margin-top: 16px; color: var(--ink2); line-height: 1.75; font-size: 15px; }
  @media (max-width: 760px) { .snd-speed-panel { grid-template-columns: 1fr; } }

  /* reflection */
  .snd-reflection-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .snd-reflect-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; }
  .snd-reflect-stage { height: 220px; background: linear-gradient(135deg, #fff, #e0f2fe); position: relative; border-bottom: 1.5px solid var(--rule); }
  .snd-wall { position: absolute; right: 32%; top: 30px; bottom: 30px; width: 6px; border-radius: 999px; background: var(--ink); }
  .snd-normal { position: absolute; left: 22%; right: 18%; top: 50%; height: 2px; background: rgba(82,107,125,0.35); border-top: 1px dashed rgba(82,107,125,0.45); }
  .snd-incident { position: absolute; left: 20%; top: 62px; width: 150px; height: 4px; background: var(--rose); border-radius: 999px; transform: rotate(28deg); transform-origin: right center; }
  .snd-incident::after { content: ''; position: absolute; right: -1px; top: 50%; transform: translateY(-50%); border-top: 8px solid transparent; border-bottom: 8px solid transparent; border-left: 13px solid var(--rose); }
  .snd-reflected { position: absolute; left: 20%; bottom: 62px; width: 150px; height: 4px; background: var(--green); border-radius: 999px; transform: rotate(-28deg); transform-origin: right center; }
  .snd-reflected::before { content: ''; position: absolute; left: -1px; top: 50%; transform: translateY(-50%); border-top: 8px solid transparent; border-bottom: 8px solid transparent; border-right: 13px solid var(--green); }
  .snd-reflect-body { padding: 24px; }
  .snd-reflect-body h3 { font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900; color: var(--accent2); margin-bottom: 12px; }
  .snd-reflect-body ul { padding-left: 20px; color: var(--ink2); line-height: 1.8; }
  .snd-echo-card { background: linear-gradient(135deg, #020617 0%, #082f49 100%); color: white; border-radius: 12px; padding: 26px; min-height: 330px; display: flex; flex-direction: column; justify-content: space-between; }
  .snd-echo-card h3 { font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900; color: #7dd3fc; margin-bottom: 12px; }
  .snd-echo-card p { color: rgba(255,255,255,0.84); line-height: 1.8; margin-bottom: 14px; }
  .snd-echo-list { display: grid; gap: 10px; }
  .snd-echo-item { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px 14px; color: rgba(255,255,255,0.86); line-height: 1.6; }
  @media (max-width: 820px) { .snd-reflection-grid { grid-template-columns: 1fr; } }
  @media (max-width: 520px) { .snd-reflect-stage { height: 200px; } .snd-incident, .snd-reflected { width: 116px; left: 18%; } }

  /* hearing */
  .snd-hearing-panel { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; }
  .snd-hearing-top { padding: 28px; background: linear-gradient(135deg, #cffafe 0%, #e0f2fe 100%); }
  .snd-hearing-top h3 { font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900; color: var(--accent2); margin-bottom: 10px; }
  .snd-hearing-top p { color: var(--ink2); line-height: 1.8; }
  .snd-hearing-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
  .snd-hearing-card { padding: 22px; border-top: 1.5px solid var(--rule); min-height: 180px; }
  .snd-hearing-card + .snd-hearing-card { border-left: 1.5px solid var(--rule); }
  .snd-hearing-card h4 { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; margin-bottom: 10px; }
  .snd-hearing-card p { color: var(--ink2); line-height: 1.7; }
  .snd-frequency-bar { margin-top: 18px; height: 14px; border-radius: 999px; background: linear-gradient(90deg, #7c3aed 0%, #0891b2 50%, #be123c 100%); position: relative; }
  .snd-frequency-mark { position: absolute; top: 22px; font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; color: var(--muted); transform: translateX(-50%); white-space: nowrap; }
  .snd-frequency-mark.low { left: 0; transform: translateX(0); }
  .snd-frequency-mark.mid { left: 50%; }
  .snd-frequency-mark.high { right: 0; transform: translateX(0); }
  @media (max-width: 820px) { .snd-hearing-grid { grid-template-columns: 1fr; } .snd-hearing-card + .snd-hearing-card { border-left: none; } }

  /* ultrasound */
  .snd-ultra-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .snd-ultra-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 26px; }
  .snd-ultra-card.highlight { background: linear-gradient(135deg, #020617 0%, #172554 100%); color: white; border-color: #60a5fa; }
  .snd-ultra-card h3 { font-family: 'Montserrat', sans-serif; font-size: 26px; font-weight: 900; color: var(--accent2); margin-bottom: 12px; }
  .snd-ultra-card.highlight h3 { color: #7dd3fc; }
  .snd-ultra-card p { color: var(--ink2); line-height: 1.8; margin-bottom: 16px; }
  .snd-ultra-card.highlight p { color: rgba(255,255,255,0.82); }
  .snd-app-list { display: grid; gap: 10px; }
  .snd-app-item { background: var(--accent-lt); border: 1px solid var(--rule); border-radius: 8px; padding: 12px 14px; color: var(--accent2); font-family: 'Poppins', sans-serif; font-weight: 700; line-height: 1.55; font-size: 14px; }
  .snd-ultra-card.highlight .snd-app-item { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.12); color: rgba(255,255,255,0.88); }
  @media (max-width: 760px) { .snd-ultra-grid { grid-template-columns: 1fr; } }

  /* ear */
  .snd-ear-panel { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; }
  .snd-ear-stage { min-height: 280px; background: linear-gradient(135deg, #fff, #e0f2fe); position: relative; border-bottom: 1.5px solid var(--rule); overflow: hidden; }
  .snd-ear-funnel { position: absolute; left: 16%; top: 58px; width: 120px; height: 160px; border-radius: 55% 45% 48% 52% / 50% 55% 45% 50%; background: linear-gradient(135deg, #fdba74, #fb7185); border: 3px solid rgba(190,18,60,0.55); }
  .snd-ear-canal { position: absolute; left: 31%; top: 126px; width: 190px; height: 28px; background: #fed7aa; border: 3px solid rgba(190,18,60,0.35); border-left: none; border-radius: 0 999px 999px 0; }
  .snd-eardrum { position: absolute; left: 49%; top: 106px; width: 16px; height: 70px; border-radius: 999px; background: var(--rose); }
  .snd-inner-ear { position: absolute; right: 20%; top: 86px; width: 110px; height: 110px; border-radius: 50%; border: 12px solid #7dd3fc; border-left-color: transparent; transform: rotate(18deg); }
  .snd-inner-ear::after { content: ''; position: absolute; right: 4px; top: 30px; width: 44px; height: 44px; border-radius: 50%; border: 8px solid #38bdf8; }
  .snd-signal-line { position: absolute; left: 56%; right: 22%; top: 140px; height: 4px; border-radius: 999px; background: var(--green); }
  .snd-ear-label { position: absolute; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; color: var(--accent2); background: white; border: 1px solid var(--rule); border-radius: 999px; padding: 6px 10px; white-space: nowrap; }
  .snd-ear-label.outer { left: 10%; top: 28px; }
  .snd-ear-label.drum { left: 44%; top: 78px; }
  .snd-ear-label.inner { right: 13%; top: 48px; }
  .snd-ear-body { padding: 26px; display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .snd-ear-note { background: var(--accent-lt); border-left: 4px solid var(--accent); border-radius: 8px; padding: 16px; color: var(--ink2); line-height: 1.75; }
  .snd-ear-note strong { color: var(--accent2); }
  @media (max-width: 760px) { .snd-ear-body { grid-template-columns: 1fr; } .snd-ear-stage { min-height: 260px; } .snd-ear-funnel { left: 9%; width: 96px; height: 140px; } .snd-ear-canal { left: 28%; width: 150px; } .snd-eardrum { left: 52%; } .snd-inner-ear { right: 8%; width: 84px; height: 84px; border-width: 9px; } .snd-ear-label.inner { right: 5%; } }
  @media (max-width: 430px) { .snd-ear-label { font-size: 11px; padding: 5px 8px; } .snd-ear-label.drum { left: 40%; } .snd-inner-ear { right: 5%; } }

  /* FAQ */
  .snd-faq-wrap { margin-top: 74px; }
  .snd-faq-title { font-family: 'Montserrat', sans-serif; font-size: clamp(28px,5vw,42px); font-weight: 900; color: var(--ink); letter-spacing: -0.03em; margin-bottom: 22px; }
  .snd-faq-title span { color: var(--accent); }
  .snd-faq-list { display: grid; gap: 12px; }
  .snd-faq-item { background: var(--white); border: 1.5px solid var(--rule); border-radius: 10px; overflow: hidden; }
  .snd-faq-q { width: 100%; border: 0; background: transparent; padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; text-align: left; cursor: pointer; font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 700; color: var(--ink); }
  .snd-faq-icon { color: var(--accent); font-size: 18px; line-height: 1; flex-shrink: 0; }
  .snd-faq-a { padding: 0 20px 20px; color: var(--ink2); line-height: 1.8; font-size: 15px; }

  @media (max-width: 520px) {
    .snd-body-text { font-size: 15px; }
    .snd-basic-top, .snd-basic-list, .snd-speaker-card, .snd-wave-type, .snd-compression-card, .snd-compare-head, .snd-compare-stage, .snd-music-top, .snd-music-card, .snd-speed-card, .snd-medium-card, .snd-reflect-body, .snd-echo-card, .snd-hearing-top, .snd-hearing-card, .snd-ultra-card, .snd-ear-body { padding: 20px; }
    .snd-char-card { padding: 18px; }
    .snd-speaker-visual { left: 16px; right: 16px; bottom: 22px; }
    .snd-ring.r3 { width: 104px; }
    .snd-faq-q { font-size: 15px; padding: 16px; }
    .snd-faq-a { padding: 0 16px 18px; }
  }
`;

const faqs = [
  {
    q: "What is sound?",
    a: "Sound is a form of energy produced by vibrations in an object. It needs a material medium for propagation and cannot travel through vacuum."
  },
  {
    q: "Why can sound not travel through vacuum?",
    a: "Sound is a mechanical wave and needs particles of a medium to vibrate. Since vacuum has no material particles, sound cannot travel through it."
  },
  {
    q: "What is a longitudinal wave?",
    a: "In a longitudinal wave, individual particles of the medium move parallel to the direction of wave propagation. Sound waves in air are longitudinal waves."
  },
  {
    q: "What is a transverse wave?",
    a: "In a transverse wave, particle movement is perpendicular to the direction of wave propagation."
  },
  {
    q: "What are compressions and rarefactions?",
    a: "Sound waves travel through a continuous medium by alternate compressions and rarefactions of the particles of the medium."
  },
  {
    q: "What is amplitude?",
    a: "Amplitude is the magnitude of maximum displacement of particles from their mean position. Loudness depends on amplitude."
  },
  {
    q: "What is wavelength?",
    a: "Wavelength is the distance between two consecutive compressions or two consecutive rarefactions. It is represented by λ."
  },
  {
    q: "What is frequency?",
    a: "Frequency is the number of oscillations per unit time. Its unit is hertz (Hz). Frequency = 1 / Time period."
  },
  {
    q: "What is pitch?",
    a: "Pitch depends on frequency. Higher frequency produces higher pitch."
  },
  {
    q: "What is quality or timbre?",
    a: "Quality or timbre helps us differentiate between two sounds of the same pitch and loudness."
  },
  {
    q: "What is the speed of sound formula?",
    a: "The speed of sound is v = ν × λ or v = fλ, where frequency and wavelength are related to velocity."
  },
  {
    q: "How does speed of sound vary in different media?",
    a: "The speed of sound is greatest in solids, less in liquids and least in gases. Speed in solid > speed in liquid > speed in gas."
  },
  {
    q: "What is an echo?",
    a: "Echo is the reflection of sound heard after a delay. It occurs because the sensation of sound persists in the human brain for a short time."
  },
  {
    q: "What is reverberation?",
    a: "Reverberation is the persistence of sound due to repeated reflection."
  },
  {
    q: "What is the normal hearing range of humans?",
    a: "The normal hearing range for humans is 20 Hz to 20,000 Hz. Rhinoceroses use infrasound below 20 Hz and bats use ultrasound above 20,000 Hz."
  },
  {
    q: "What are applications of ultrasound?",
    a: "Ultrasound is used for cleaning, detecting defects in metals, echocardiography, ultrasonography, breaking small kidney stones and SONAR."
  },
  {
    q: "What are the parts of the human ear?",
    a: "The human ear has three parts: outer ear, middle ear and inner ear. The eardrum vibrates and passes vibrations to the inner ear, after which signals go to the brain."
  }
];

export default function Chapter12Sound() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="snd-root">
      <FontLink />
      <style>{styles}</style>

      <section className="snd-hero">
        <div className="snd-hero-grid" />
        <div className="snd-glow-a" />
        <div className="snd-glow-b" />
        <div className="snd-wave-mark">
          <div className="snd-speaker-mark" />
          <div className="snd-wave-line" />
        </div>
        <div className="snd-hero-bg-num">12</div>
        <div className="snd-hero-inner">
          <div className="snd-overline">Class 9 · Science · Chapter 12</div>
          <h1 className="snd-hero-title"><em>Sound</em></h1>
          <div className="snd-hero-bar">
            <div className="snd-hero-bar-item">
              <div className="snd-bar-label">Subject</div>
              <div className="snd-bar-value">Science — Physics</div>
            </div>
            <div className="snd-hero-bar-item">
              <div className="snd-bar-label">Core Idea</div>
              <div className="snd-bar-value">Waves & Vibrations</div>
            </div>
            <div className="snd-hero-bar-item">
              <div className="snd-bar-label">Includes</div>
              <div className="snd-bar-value">Echo, Ultrasound, Ear</div>
            </div>
            <div className="snd-hero-bar-item">
              <div className="snd-bar-label">Format</div>
              <div className="snd-bar-value">Notes + FAQ</div>
            </div>
          </div>
        </div>
      </section>

      <main className="snd-body">
        <div className="snd-intro">
          <p><strong>Sound</strong> is a form of energy produced by vibrations. It travels as a wave through a material medium and cannot travel through vacuum.</p>
          <p>This chapter explains sound waves, compressions and rarefactions, characteristics of sound, speed of sound, echo, ultrasound, SONAR and the human ear.</p>
        </div>

        <section className="snd-sec">
          <div className="snd-sec-head">
            <div className="snd-sec-num">01</div>
            <div className="snd-sec-title-wrap">
              <div className="snd-sec-kicker">Vibration and Medium</div>
              <h2 className="snd-sec-title">What is <span>Sound?</span></h2>
            </div>
          </div>

          <div className="snd-basics-grid">
            <div className="snd-basic-card">
              <div className="snd-basic-top">
                <h3>Sound begins with vibration.</h3>
                <p>Sound is produced when an object vibrates. It is a form of energy and requires a material medium for propagation.</p>
              </div>
              <div className="snd-basic-list">
                <div className="snd-basic-point"><div className="snd-basic-dot">1</div><div>Sound cannot move through vacuum.</div></div>
                <div className="snd-basic-point"><div className="snd-basic-dot">2</div><div>The medium particles vibrate to and fro but do not move along with the sound.</div></div>
                <div className="snd-basic-point"><div className="snd-basic-dot">3</div><div>A school bell disturbs the air near it, and sound progresses because of this disturbance.</div></div>
              </div>
            </div>

            <div className="snd-speaker-card">
              <h3 className="snd-speaker-title">Vibration → Disturbance → Sound</h3>
              <p>Sound travels through the surrounding medium as nearby particles are disturbed and pass the disturbance forward.</p>
              <div className="snd-speaker-visual">
                <div className="snd-speaker-shape" />
                <div className="snd-rings">
                  <div className="snd-ring r1" />
                  <div className="snd-ring r2" />
                  <div className="snd-ring r3" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="snd-divider"><div className="snd-divider-mark" /></div>

        <section className="snd-sec">
          <div className="snd-sec-head">
            <div className="snd-sec-num">02</div>
            <div className="snd-sec-title-wrap">
              <div className="snd-sec-kicker">Wave Motion</div>
              <h2 className="snd-sec-title">Longitudinal and <span>Transverse</span> Waves</h2>
            </div>
          </div>

          <div className="snd-wave-type-panel">
            <div className="snd-wave-type-grid">
              <div className="snd-wave-type">
                <h3>Longitudinal Wave</h3>
                <p>Particles of the medium move in a direction parallel to the direction of wave propagation.</p>
                <div className="snd-longitudinal-visual">
                  <div className="snd-dot-row">
                    <span className="snd-dot" /><span className="snd-dot close" /><span className="snd-dot close" /><span className="snd-dot close" /><span className="snd-dot" /><span className="snd-dot" /><span className="snd-dot close" /><span className="snd-dot close" /><span className="snd-dot close" /><span className="snd-dot" />
                  </div>
                  <div className="snd-parallel-arrow" />
                </div>
              </div>
              <div className="snd-wave-type">
                <h3>Transverse Wave</h3>
                <p>Particles move perpendicular to the direction of wave propagation.</p>
                <div className="snd-transverse-visual">
                  <div className="snd-sine" />
                  <div className="snd-wave-svg">
                    <svg viewBox="0 0 220 70" preserveAspectRatio="none">
                      <path d="M0 35 C 18 2, 38 2, 56 35 S 94 68, 112 35 S 150 2, 168 35 S 204 68, 220 35" fill="none" stroke="#0369a1" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="snd-vertical-arrow" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="snd-divider"><div className="snd-divider-mark" /></div>

        <section className="snd-sec">
          <div className="snd-sec-head">
            <div className="snd-sec-num">03</div>
            <div className="snd-sec-title-wrap">
              <div className="snd-sec-kicker">Sound in Air</div>
              <h2 className="snd-sec-title">Compressions and <span>Rarefactions</span></h2>
            </div>
          </div>

          <div className="snd-compression-card">
            <div className="snd-compression-grid">
              <div>
                <h2 className="snd-compression-title">Sound moves as density variations.</h2>
                <p className="snd-compression-text">Sound waves propagate through a continuous medium by compressions and rarefactions of the particles that make up the medium.</p>
              </div>
              <div className="snd-density-stage">
                <div className="snd-cr-line" />
                <div className="snd-cr-labels"><span>C</span><span>R</span><span>C</span><span>R</span><span>C</span></div>
                <div className="snd-density-wave">
                  <div className="snd-density-axis" />
                  <svg viewBox="0 0 300 80" preserveAspectRatio="none">
                    <path d="M0 40 C 25 2, 50 2, 75 40 S 125 78, 150 40 S 200 2, 225 40 S 275 78, 300 40" fill="none" stroke="#7dd3fc" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="snd-divider"><div className="snd-divider-mark" /></div>

        <section className="snd-sec">
          <div className="snd-sec-head">
            <div className="snd-sec-num">04</div>
            <div className="snd-sec-title-wrap">
              <div className="snd-sec-kicker">Wave Terms</div>
              <h2 className="snd-sec-title">Characteristics of <span>Sound Waves</span></h2>
            </div>
          </div>

          <div className="snd-char-grid">
            <div className="snd-char-card">
              <div className="snd-char-symbol">A</div>
              <h3>Amplitude</h3>
              <p>Magnitude of maximum displacement from mean position.</p>
            </div>
            <div className="snd-char-card">
              <div className="snd-char-symbol">λ</div>
              <h3>Wavelength</h3>
              <p>Distance between two consecutive compressions or rarefactions.</p>
            </div>
            <div className="snd-char-card">
              <div className="snd-char-symbol">f</div>
              <h3>Frequency</h3>
              <p>Number of oscillations per unit time. Unit: Hertz (Hz).</p>
            </div>
            <div className="snd-char-card">
              <div className="snd-char-symbol">T</div>
              <h3>Time Period</h3>
              <p>Time taken by two consecutive compressions or rarefactions to cross a fixed point.</p>
            </div>
          </div>

          <p className="snd-body-text" style={{ marginTop: "24px" }}><strong>Frequency = 1 / Time period.</strong></p>
        </section>

        <div className="snd-divider"><div className="snd-divider-mark" /></div>

        <section className="snd-sec">
          <div className="snd-sec-head">
            <div className="snd-sec-num">05</div>
            <div className="snd-sec-title-wrap">
              <div className="snd-sec-kicker">Pitch and Loudness</div>
              <h2 className="snd-sec-title">How Sound <span>Feels</span></h2>
            </div>
          </div>

          <div className="snd-compare-grid">
            <div className="snd-compare-card">
              <div className="snd-compare-head">
                <h3>Pitch</h3>
                <p>Higher frequency means higher pitch.</p>
              </div>
              <div className="snd-compare-stage">
                <div className="snd-mini-wave">
                  <svg viewBox="0 0 160 82" preserveAspectRatio="none"><path d="M0 41 C 20 5, 40 5, 60 41 S 100 77, 120 41 S 150 5, 160 41" fill="none" stroke="#0369a1" strokeWidth="4" strokeLinecap="round" /></svg>
                  <div className="snd-mini-label">Low pitch</div>
                </div>
                <div className="snd-mini-wave">
                  <svg viewBox="0 0 160 82" preserveAspectRatio="none"><path d="M0 41 C 10 5, 22 5, 32 41 S 54 77, 64 41 S 86 5, 96 41 S 118 77, 128 41 S 150 5, 160 41" fill="none" stroke="#4338ca" strokeWidth="4" strokeLinecap="round" /></svg>
                  <div className="snd-mini-label">High pitch</div>
                </div>
              </div>
            </div>
            <div className="snd-compare-card">
              <div className="snd-compare-head">
                <h3>Loudness</h3>
                <p>Loudness is determined by amplitude.</p>
              </div>
              <div className="snd-compare-stage">
                <div className="snd-mini-wave">
                  <svg viewBox="0 0 160 82" preserveAspectRatio="none"><path d="M0 41 C 20 0, 40 0, 60 41 S 100 82, 120 41 S 150 0, 160 41" fill="none" stroke="#be123c" strokeWidth="4" strokeLinecap="round" /></svg>
                  <div className="snd-mini-label">High amplitude</div>
                </div>
                <div className="snd-mini-wave">
                  <svg viewBox="0 0 160 82" preserveAspectRatio="none"><path d="M0 41 C 20 24, 40 24, 60 41 S 100 58, 120 41 S 150 24, 160 41" fill="none" stroke="#0891b2" strokeWidth="4" strokeLinecap="round" /></svg>
                  <div className="snd-mini-label">Low amplitude</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="snd-divider"><div className="snd-divider-mark" /></div>

        <section className="snd-sec">
          <div className="snd-sec-head">
            <div className="snd-sec-num">06</div>
            <div className="snd-sec-title-wrap">
              <div className="snd-sec-kicker">Music Terms</div>
              <h2 className="snd-sec-title">Tone, Timbre and <span>Musical Scale</span></h2>
            </div>
          </div>

          <div className="snd-music-panel">
            <div className="snd-music-top">
              <h3>Sound quality helps us identify different sources.</h3>
              <p>Tone is the sound of a single frequency. Quality or timbre differentiates between two sounds of the same pitch and loudness.</p>
            </div>
            <div className="snd-music-grid">
              <div className="snd-music-card">
                <h4>Harmony and Melody</h4>
                <p>Harmony is the pleasant effect when two or more notes are sounded together. Melody is the pleasant effect when notes are sounded one after another.</p>
                <div className="snd-note-row"><div className="snd-note">Sa</div><div className="snd-note">Re</div><div className="snd-note">Ga</div></div>
              </div>
              <div className="snd-music-card">
                <h4>Dissonance and Consonance</h4>
                <p>An unpleasant sound is discord or dissonance. Pleasant simultaneous notes produce concord or consonance.</p>
              </div>
              <div className="snd-music-card">
                <h4>Scale and Octave</h4>
                <p>A musical interval is the ratio of frequencies of two notes. A musical scale is a series of notes separated by a fixed interval. A diatonic scale contains eight notes.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="snd-divider"><div className="snd-divider-mark" /></div>

        <section className="snd-sec">
          <div className="snd-sec-head">
            <div className="snd-sec-num">07</div>
            <div className="snd-sec-title-wrap">
              <div className="snd-sec-kicker">Wave Speed</div>
              <h2 className="snd-sec-title">Speed of <span>Sound</span></h2>
            </div>
          </div>

          <div className="snd-speed-panel">
            <div className="snd-speed-card">
              <h3>Velocity, frequency and wavelength</h3>
              <div className="snd-speed-formula">v = fλ</div>
              <p>Sound is a longitudinal wave that needs a material medium to travel. Its velocity, frequency and wavelength are related by v = fλ.</p>
            </div>
            <div className="snd-medium-card">
              <h3>Speed depends on medium</h3>
              <div className="snd-medium-order">
                <div className="snd-medium-pill"><span>Solid</span><span>Fastest</span></div>
                <div className="snd-medium-pill"><span>Liquid</span><span>Medium</span></div>
                <div className="snd-medium-pill"><span>Gas</span><span>Slowest</span></div>
              </div>
              <div className="snd-speed-note">Speed depends on temperature, pressure, humidity and nature of material. In air, speed of sound is 344 m s⁻¹ at 22°C.</div>
            </div>
          </div>

          <p className="snd-body-text" style={{ marginTop: "24px" }}><strong>Supersonic</strong> means the object travels faster than the speed of sound. The loud noise produced by a supersonic object is called a <strong>sonic boom</strong>.</p>
        </section>

        <div className="snd-divider"><div className="snd-divider-mark" /></div>

        <section className="snd-sec">
          <div className="snd-sec-head">
            <div className="snd-sec-num">08</div>
            <div className="snd-sec-title-wrap">
              <div className="snd-sec-kicker">Reflection</div>
              <h2 className="snd-sec-title">Reflection, Echo and <span>Reverberation</span></h2>
            </div>
          </div>

          <div className="snd-reflection-grid">
            <div className="snd-reflect-card">
              <div className="snd-reflect-stage">
                <div className="snd-wall" />
                <div className="snd-normal" />
                <div className="snd-incident" />
                <div className="snd-reflected" />
              </div>
              <div className="snd-reflect-body">
                <h3>Laws of reflection of sound</h3>
                <ul>
                  <li>Incident sound, reflected sound and normal lie in the same plane.</li>
                  <li>Angle of reflection is equal to angle of incidence.</li>
                </ul>
              </div>
            </div>
            <div className="snd-echo-card">
              <div>
                <h3>Echo and Reverberation</h3>
                <p>Echo is caused by reflection of sound. Reverberation is persistence of sound due to repeated reflection.</p>
              </div>
              <div className="snd-echo-list">
                <div className="snd-echo-item">Echo requires reflected sound and persistence of sound sensation in the brain.</div>
                <div className="snd-echo-item">Reflection of sound is used in loudspeakers, stethoscopes, curved ceilings and soundboards.</div>
                <div className="snd-echo-item">Curved walls reflect sound evenly to the audience in concert halls.</div>
              </div>
            </div>
          </div>
        </section>

        <div className="snd-divider"><div className="snd-divider-mark" /></div>

        <section className="snd-sec">
          <div className="snd-sec-head">
            <div className="snd-sec-num">09</div>
            <div className="snd-sec-title-wrap">
              <div className="snd-sec-kicker">Hearing Range</div>
              <h2 className="snd-sec-title">Infrasound, Ultrasound and <span>Hearing</span></h2>
            </div>
          </div>

          <div className="snd-hearing-panel">
            <div className="snd-hearing-top">
              <h3>Humans hear from 20 Hz to 20,000 Hz.</h3>
              <p>Sounds below 20 Hz are infrasound. Sounds above 20,000 Hz are ultrasound.</p>
              <div className="snd-frequency-bar">
                <div className="snd-frequency-mark low">&lt; 20 Hz</div>
                <div className="snd-frequency-mark mid">Human range</div>
                <div className="snd-frequency-mark high">&gt; 20,000 Hz</div>
              </div>
            </div>
            <div className="snd-hearing-grid">
              <div className="snd-hearing-card">
                <h4>Infrasound</h4>
                <p>Rhinoceroses use infrasound below 20 Hz.</p>
              </div>
              <div className="snd-hearing-card">
                <h4>Human Hearing</h4>
                <p>The normal human hearing range is 20 Hz to 20,000 Hz.</p>
              </div>
              <div className="snd-hearing-card">
                <h4>Ultrasound</h4>
                <p>Bats use ultrasound above 20,000 Hz.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="snd-divider"><div className="snd-divider-mark" /></div>

        <section className="snd-sec">
          <div className="snd-sec-head">
            <div className="snd-sec-num">10</div>
            <div className="snd-sec-title-wrap">
              <div className="snd-sec-kicker">Applications</div>
              <h2 className="snd-sec-title">Ultrasound and <span>SONAR</span></h2>
            </div>
          </div>

          <div className="snd-ultra-grid">
            <div className="snd-ultra-card highlight">
              <h3>Properties of ultrasound</h3>
              <p>Ultrasonic waves are high-frequency sound waves that cannot be heard or sensed by humans. They are energetic enough to penetrate human muscles.</p>
              <div className="snd-app-list">
                <div className="snd-app-item">Ultrasonography</div>
                <div className="snd-app-item">Echocardiography</div>
                <div className="snd-app-item">Breaking small kidney stones</div>
              </div>
            </div>
            <div className="snd-ultra-card">
              <h3>Applications</h3>
              <p>Ultrasound has many practical uses in medicine, industry and navigation.</p>
              <div className="snd-app-list">
                <div className="snd-app-item">Cleaning</div>
                <div className="snd-app-item">Detecting defects in metals</div>
                <div className="snd-app-item">SONAR: navigation, communication and underwater detection by ships and submarines</div>
              </div>
            </div>
          </div>
        </section>

        <div className="snd-divider"><div className="snd-divider-mark" /></div>

        <section className="snd-sec">
          <div className="snd-sec-head">
            <div className="snd-sec-num">11</div>
            <div className="snd-sec-title-wrap">
              <div className="snd-sec-kicker">Biology Link</div>
              <h2 className="snd-sec-title">Human Ear and <span>Hearing Aid</span></h2>
            </div>
          </div>

          <div className="snd-ear-panel">
            <div className="snd-ear-stage">
              <div className="snd-ear-label outer">Outer ear</div>
              <div className="snd-ear-label drum">Eardrum</div>
              <div className="snd-ear-label inner">Inner ear</div>
              <div className="snd-ear-funnel" />
              <div className="snd-ear-canal" />
              <div className="snd-eardrum" />
              <div className="snd-signal-line" />
              <div className="snd-inner-ear" />
            </div>
            <div className="snd-ear-body">
              <div className="snd-ear-note"><strong>Human ear:</strong> It has three parts — outer ear, middle ear and inner ear. The outer part is shaped like a funnel.</div>
              <div className="snd-ear-note"><strong>Eardrum:</strong> It is like a stretched rubber sheet. Sound vibrations make it vibrate and the signal goes to the brain.</div>
              <div className="snd-ear-note"><strong>Hearing aid:</strong> It amplifies sound and helps hearing-impaired people hear. It consists of a microphone, amplifier and speaker.</div>
              <div className="snd-ear-note"><strong>Safety:</strong> A noise level of 85 dB can damage the human ear.</div>
            </div>
          </div>
        </section>

        <section className="snd-faq-wrap">
          <h2 className="snd-faq-title">Quick <span>FAQ Revision</span></h2>
          <div className="snd-faq-list">
            {faqs.map((item, index) => (
              <div className="snd-faq-item" key={item.q}>
                <button
                  className="snd-faq-q"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  aria-expanded={openFaq === index}
                >
                  <span>{item.q}</span>
                  <span className="snd-faq-icon">{openFaq === index ? "▴" : "▾"}</span>
                </button>
                {openFaq === index && <div className="snd-faq-a">{item.a}</div>}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
