import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #211202;
    --ink2:       #34220d;
    --muted:      #7a5f34;
    --paper:      #fff8ed;
    --paper2:     #ffedd5;
    --accent:     #ea580c;
    --accent2:    #9a3412;
    --accent-lt:  #ffedd5;
    --gold:       #d97706;
    --gold-lt:    #fef3c7;
    --red:        #b91c1c;
    --red-lt:     #fee2e2;
    --green:      #15803d;
    --green-lt:   #dcfce7;
    --blue:       #1d4ed8;
    --blue-lt:    #dbeafe;
    --purple:     #7c3aed;
    --purple-lt:  #ede9fe;
    --teal:       #0f766e;
    --teal-lt:    #ccfbf1;
    --rule:       #fdba74;
    --white:      #ffffff;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  .we-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  .we-hero {
    background: radial-gradient(circle at 76% 28%, rgba(251,191,36,0.15) 0%, transparent 28%),
                radial-gradient(circle at 18% 22%, rgba(234,88,12,0.18) 0%, transparent 34%),
                linear-gradient(135deg, #160901 0%, #251004 48%, #351605 100%);
    min-height: 88vh;
    display: flex;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
    padding: 0 0 64px;
  }
  @media (max-width: 700px) { .we-hero { min-height: auto; align-items: flex-start; padding: 72px 0 48px; } }
  .we-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 6px;
    background: linear-gradient(90deg, #ea580c 0%, #f59e0b 32%, #16a34a 62%, #1d4ed8 100%);
  }
  .we-hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(251,146,60,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(251,146,60,0.07) 1px, transparent 1px);
    background-size: 38px 38px;
    pointer-events: none;
  }
  .we-energy-orbit {
    position: absolute;
    top: 50%; right: 4%;
    width: clamp(170px, 26vw, 340px);
    height: clamp(170px, 26vw, 340px);
    transform: translateY(-50%);
    pointer-events: none;
  }
  .we-energy-orbit::before {
    content: '';
    position: absolute;
    inset: 8%;
    border-radius: 50%;
    border: 1.5px solid rgba(251,191,36,0.17);
  }
  .we-energy-orbit::after {
    content: '';
    position: absolute;
    inset: 30%;
    border-radius: 50%;
    border: 1px dashed rgba(251,191,36,0.14);
  }
  .we-bolt {
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    width: 70px; height: 112px;
    clip-path: polygon(52% 0%, 18% 48%, 45% 48%, 32% 100%, 82% 36%, 55% 36%);
    background: linear-gradient(180deg, #fde68a, #f97316);
    opacity: 0.22;
  }
  .we-glow-a { position: absolute; top: 16%; left: 6%; width: 310px; height: 310px; border-radius: 50%; background: radial-gradient(circle, rgba(234,88,12,0.20) 0%, transparent 70%); pointer-events: none; }
  .we-glow-b { position: absolute; bottom: 8%; right: 20%; width: 230px; height: 230px; border-radius: 50%; background: radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 72%); pointer-events: none; }
  .we-hero-bg-num {
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
  .we-hero-inner { max-width: 900px; width: 100%; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
  .we-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #fdba74;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .we-overline::before, .we-overline::after { content: ''; flex: 0 0 40px; height: 1px; background: #fdba74; }
  .we-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(38px, 8vw, 82px);
    font-weight: 900;
    color: #fff;
    line-height: 0.94;
    letter-spacing: -0.035em;
    margin-bottom: 32px;
  }
  .we-hero-title em { font-style: normal; color: #fdba74; }
  .we-hero-title .em2 { color: #fef3c7; }
  .we-hero-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 24px;
    margin-top: 8px;
  }
  .we-hero-bar-item { flex: 1 1 150px; padding: 0 24px 0 0; border-right: 1px solid rgba(255,255,255,0.08); margin-right: 24px; }
  .we-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .we-bar-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.30); margin-bottom: 5px; }
  .we-bar-value { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.74); }
  @media (max-width: 700px) {
    .we-hero-inner { padding: 0 18px; }
    .we-overline { font-size: 10px; letter-spacing: 0.16em; }
    .we-overline::before, .we-overline::after { flex-basis: 28px; }
    .we-hero-title { font-size: clamp(38px, 11vw, 58px); margin-bottom: 24px; }
    .we-hero-bar { gap: 12px; }
    .we-hero-bar-item { flex: 1 1 120px; padding: 0 14px 0 0; margin-right: 14px; }
    .we-bar-label { font-size: 9px; letter-spacing: 0.12em; }
    .we-bar-value { font-size: 13px; }
    .we-energy-orbit { opacity: 0.3; right: -22%; }
  }

  .we-body { max-width: 900px; margin: 0 auto; padding: 72px 32px 100px; }
  @media (max-width: 700px) { .we-body { padding: 48px 18px 72px; } }

  .we-intro {
    background: linear-gradient(135deg, #160901 0%, #351605 100%);
    border-left: 5px solid var(--accent);
    border-radius: 6px;
    padding: 36px 40px;
    margin-bottom: 72px;
    position: relative;
    overflow: hidden;
  }
  .we-intro::after { content: '⚡'; position: absolute; right: 30px; top: 50%; transform: translateY(-50%); font-size: 96px; opacity: 0.08; }
  .we-intro p { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 500; color: rgba(255,255,255,0.86); line-height: 1.8; margin: 0 0 14px; position: relative; z-index: 1; }
  .we-intro p:last-child { margin-bottom: 0; }
  .we-intro strong { color: #fdba74; }
  @media (max-width: 700px) { .we-intro { padding: 24px 20px; } .we-intro p { font-size: 15px; } }

  .we-divider { margin: 56px 0; display: flex; align-items: center; gap: 16px; }
  .we-divider::before, .we-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .we-divider-mark { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

  .we-sec { margin-bottom: 56px; }
  .we-sec-head { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 30px; border-bottom: 2px solid var(--rule); padding-bottom: 18px; }
  .we-sec-num { font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900; color: var(--rule); line-height: 1; flex-shrink: 0; }
  .we-sec-title-wrap { padding-top: 8px; }
  .we-sec-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .we-sec-title { font-family: 'Montserrat', sans-serif; font-size: clamp(22px, 4vw, 32px); font-weight: 900; color: var(--ink); line-height: 1.15; letter-spacing: -0.02em; }
  .we-sec-title span { color: var(--accent); }
  .we-body-text { font-size: 16px; color: var(--ink2); line-height: 1.85; margin-bottom: 26px; }
  .we-body-text strong { color: var(--accent2); font-weight: 700; }
  @media (max-width: 580px) {
    .we-sec-head { gap: 14px; margin-bottom: 24px; }
    .we-sec-num { font-size: 42px; }
    .we-sec-title-wrap { padding-top: 4px; }
  }

  .we-work-panel { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; box-shadow: 0 16px 34px rgba(154,52,18,0.08); }
  .we-work-top { padding: 28px; background: linear-gradient(135deg, #ffedd5 0%, #fef3c7 100%); }
  .we-work-top h3 { font-family: 'Montserrat', sans-serif; font-size: 27px; font-weight: 900; color: var(--accent2); margin-bottom: 12px; }
  .we-work-top p { color: var(--ink2); line-height: 1.8; font-size: 16px; }
  .we-condition-grid { display: grid; grid-template-columns: 1fr 1fr; }
  .we-condition-card { padding: 26px; border-top: 1.5px solid var(--rule); min-height: 190px; }
  .we-condition-card:nth-child(2) { border-left: 1.5px solid var(--rule); }
  .we-condition-label { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
  .we-condition-card h4 { font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900; color: var(--ink); margin-bottom: 12px; }
  .we-condition-card p { color: var(--ink2); line-height: 1.75; }
  @media (max-width: 720px) { .we-condition-grid { grid-template-columns: 1fr; } .we-condition-card:nth-child(2) { border-left: none; } }

  .we-work-visual { margin-top: 24px; background: #fffaf2; border: 1.5px solid var(--rule); border-radius: 12px; padding: 26px; overflow: hidden; }
  .we-force-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .we-force-card { background: white; border: 1.5px solid var(--rule); border-radius: 10px; padding: 18px; min-height: 246px; display: flex; flex-direction: column; justify-content: space-between; }
  .we-force-stage { height: 132px; position: relative; background: linear-gradient(180deg, #fff 0%, #fff7ed 100%); border-radius: 8px; overflow: hidden; border: 1px solid #fed7aa; }
  .we-block { position: absolute; bottom: 24px; left: 38%; width: 62px; height: 46px; border-radius: 8px; background: linear-gradient(180deg, #fdba74, #fb923c); border: 2px solid var(--accent2); z-index: 2; }
  .we-ground { position: absolute; left: 12%; right: 12%; bottom: 18px; height: 7px; border-radius: 999px; background: #4a2c18; }
  .we-arrow-force, .we-arrow-displacement { position: absolute; height: 5px; border-radius: 999px; z-index: 3; }
  .we-arrow-force::after, .we-arrow-displacement::after { content: ''; position: absolute; right: -1px; top: 50%; transform: translateY(-50%); border-top: 9px solid transparent; border-bottom: 9px solid transparent; border-left: 13px solid currentColor; }
  .we-arrow-force { background: var(--red); color: var(--red); left: 16%; top: 34px; width: 92px; }
  .we-arrow-displacement { background: var(--green); color: var(--green); left: 16%; top: 68px; width: 92px; }
  .we-force-stage.negative .we-arrow-force { left: auto; right: 16%; transform: rotate(180deg); }
  .we-force-stage.negative .we-arrow-displacement { left: 16%; }
  .we-force-stage.none .we-arrow-force { left: 16%; top: 42px; }
  .we-arrow-displacement.perp { left: auto; right: 22%; top: 22px; width: 5px; height: 74px; }
  .we-arrow-displacement.perp::after { right: 50%; top: auto; bottom: -1px; transform: translateX(50%); border-left: 9px solid transparent; border-right: 9px solid transparent; border-top: 13px solid currentColor; border-bottom: 0; }
  .we-force-label, .we-disp-label {
    position: absolute;
    font-family: 'Poppins', sans-serif;
    font-size: 11px;
    font-weight: 700;
    line-height: 1;
    padding: 4px 7px;
    border-radius: 999px;
    background: rgba(255,255,255,0.94);
    box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    z-index: 4;
  }
  .we-force-label { color: var(--red); left: 16%; top: 18px; }
  .we-disp-label { color: var(--green); left: 16%; top: 52px; }
  .we-force-stage.negative .we-force-label { left: auto; right: 16%; }
  .we-force-stage.none .we-force-label { top: 26px; }
  .we-force-stage.none .we-disp-label { left: auto; right: 16%; top: 100px; }
  .we-force-title { font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 900; color: var(--accent2); margin: 14px 0 8px; }
  .we-force-card p { color: var(--ink2); line-height: 1.65; font-size: 14px; }
  @media (max-width: 860px) { .we-force-row { grid-template-columns: 1fr; } .we-force-card { min-height: auto; } .we-force-stage { height: 138px; } }

  .we-formula-strip { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 22px; }
  .we-formula-card { background: #1c0b03; color: white; border-radius: 12px; border-left: 5px solid var(--accent); padding: 24px; }
  .we-formula-title { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.44); margin-bottom: 12px; }
  .we-formula-main { font-family: 'Montserrat', sans-serif; font-size: clamp(24px, 5vw, 36px); font-weight: 900; color: #fdba74; margin-bottom: 10px; }
  .we-formula-note { color: rgba(255,255,255,0.78); line-height: 1.7; font-size: 15px; }
  @media (max-width: 720px) { .we-formula-strip { grid-template-columns: 1fr; } }

  .we-energy-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .we-energy-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; min-height: 320px; }
  .we-energy-card.dark { background: linear-gradient(135deg, #160901 0%, #351605 100%); color: white; }
  .we-energy-visual { height: 178px; position: relative; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #fff7ed, #fef3c7); border-bottom: 1.5px solid var(--rule); overflow: hidden; }
  .we-energy-card.dark .we-energy-visual { background: rgba(255,255,255,0.06); border-bottom-color: rgba(255,255,255,0.1); }
  .we-speed-lines { position: absolute; left: 24px; right: 24px; top: 50%; height: 2px; background: repeating-linear-gradient(90deg, rgba(234,88,12,0.22) 0 26px, transparent 26px 42px); }
  .we-moving-ball { width: 68px; height: 68px; border-radius: 50%; background: radial-gradient(circle at 35% 28%, #fff, #fb923c 32%, #c2410c 85%); box-shadow: 0 12px 24px rgba(194,65,12,0.22); position: relative; z-index: 1; }
  .we-hill { position: absolute; left: 0; right: 0; bottom: -22px; height: 100px; background: linear-gradient(135deg, rgba(251,191,36,0.42), rgba(234,88,12,0.36)); clip-path: polygon(0 100%, 72% 8%, 100% 100%); }
  .we-height-line { position: absolute; right: 22%; bottom: 20px; top: 28px; width: 4px; background: var(--green); border-radius: 999px; z-index: 3; }
  .we-height-line::before { content: ''; position: absolute; top: -1px; left: 50%; transform: translateX(-50%); border-left: 8px solid transparent; border-right: 8px solid transparent; border-bottom: 11px solid var(--green); }
  .we-height-line::after { content: 'h'; position: absolute; left: 12px; top: 44%; transform: translateY(-50%); font-family: 'Poppins', sans-serif; color: var(--green); font-weight: 700; background: rgba(255,255,255,0.96); padding: 2px 6px; border-radius: 999px; }
  .we-top-block { position: absolute; right: calc(22% - 24px); top: 16px; width: 46px; height: 40px; border-radius: 8px; background: linear-gradient(180deg, #fb923c, #c2410c); border: 2px solid #9a3412; z-index: 4; }
  .we-energy-body { padding: 24px; }
  .we-energy-kicker { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; }
  .we-energy-card.dark .we-energy-kicker { color: #fdba74; }
  .we-energy-body h3 { font-family: 'Montserrat', sans-serif; font-size: 25px; font-weight: 900; color: var(--ink); margin-bottom: 10px; }
  .we-energy-card.dark .we-energy-body h3 { color: #fdba74; }
  .we-energy-body p { color: var(--ink2); line-height: 1.8; }
  .we-energy-card.dark .we-energy-body p { color: rgba(255,255,255,0.82); }
  .we-mini-formula { margin-top: 14px; display: inline-block; background: var(--accent-lt); color: var(--accent2); border: 1px solid var(--rule); border-radius: 8px; padding: 9px 12px; font-family: 'Poppins', sans-serif; font-weight: 700; }
  .we-energy-card.dark .we-mini-formula { background: rgba(255,255,255,0.08); color: #fdba74; border-color: rgba(255,255,255,0.1); }
  @media (max-width: 780px) { .we-energy-grid { grid-template-columns: 1fr; } .we-energy-card { min-height: auto; } }

  .we-relation-panel { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 26px; margin-top: 22px; display: grid; grid-template-columns: 1fr 1fr; gap: 18px; align-items: stretch; }
  .we-relation-box { border-radius: 10px; padding: 20px; background: var(--paper); border: 1px solid var(--rule); }
  .we-relation-box h4 { font-family: 'Montserrat', sans-serif; color: var(--accent2); font-size: 21px; font-weight: 900; margin-bottom: 10px; }
  .we-relation-formula { font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900; color: var(--accent); margin-bottom: 10px; overflow-wrap: anywhere; }
  .we-relation-box p { color: var(--ink2); line-height: 1.7; }
  @media (max-width: 720px) { .we-relation-panel { grid-template-columns: 1fr; padding: 20px; } }

  .we-forms-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .we-form-pill { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 18px 12px; text-align: center; }
  .we-form-icon { width: 46px; height: 46px; margin: 0 auto 12px; border-radius: 50%; background: var(--accent-lt); display: flex; align-items: center; justify-content: center; font-size: 22px; }
  .we-form-pill span { display: block; font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--accent2); font-size: 14px; }
  @media (max-width: 760px) { .we-forms-grid { grid-template-columns: repeat(2, 1fr); } }

  .we-conserve-card { background: linear-gradient(135deg, #0f172a 0%, #451a03 100%); color: white; border-radius: 12px; padding: 30px; overflow: hidden; position: relative; }
  .we-conserve-card::after { content: ''; position: absolute; right: -70px; top: -70px; width: 230px; height: 230px; border-radius: 50%; border: 1px solid rgba(253,186,116,0.18); }
  .we-conserve-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: center; position: relative; z-index: 1; }
  .we-conserve-title { font-family: 'Montserrat', sans-serif; font-size: 30px; font-weight: 900; color: #fdba74; margin-bottom: 14px; }
  .we-conserve-text { color: rgba(255,255,255,0.84); line-height: 1.85; }
  .we-pendulum-stage { min-height: 240px; border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; position: relative; background: rgba(255,255,255,0.06); overflow: hidden; }
  .we-pivot { position: absolute; top: 28px; left: 50%; width: 14px; height: 14px; transform: translateX(-50%); background: #fdba74; border-radius: 50%; }
  .we-string { position: absolute; top: 40px; left: 50%; width: 2px; height: 116px; background: rgba(255,255,255,0.65); transform-origin: top center; transform: rotate(20deg); }
  .we-pendulum-ball { position: absolute; bottom: -26px; left: 50%; width: 52px; height: 52px; transform: translateX(-50%); border-radius: 50%; background: radial-gradient(circle at 35% 28%, #fff, #f97316 35%, #9a3412 86%); }
  .we-arc { position: absolute; left: 50%; top: 62px; width: 170px; height: 110px; transform: translateX(-50%); border-bottom: 2px dashed rgba(253,186,116,0.42); border-radius: 50%; }
  .we-pe-label, .we-ke-label { position: absolute; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; color: #fdba74; background: rgba(0,0,0,0.18); border-radius: 999px; padding: 6px 10px; }
  .we-pe-label { left: 22px; top: 84px; }
  .we-ke-label { right: 22px; bottom: 34px; color: #bbf7d0; }
  @media (max-width: 760px) { .we-conserve-card { padding: 24px 20px; } .we-conserve-grid { grid-template-columns: 1fr; } }

  .we-power-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .we-power-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 24px; min-height: 240px; }
  .we-power-card.highlight { background: linear-gradient(135deg, #ffedd5, #fff); }
  .we-power-card h3 { font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900; color: var(--accent2); margin-bottom: 12px; }
  .we-power-card p { color: var(--ink2); line-height: 1.8; margin-bottom: 12px; }
  .we-power-formulas { display: grid; gap: 10px; margin-top: 14px; }
  .we-power-formula { background: #1c0b03; color: #fdba74; border-radius: 8px; padding: 12px 14px; font-family: 'Poppins', sans-serif; font-weight: 700; overflow-wrap: anywhere; }
  @media (max-width: 760px) { .we-power-grid { grid-template-columns: 1fr; } }

  .we-unit-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; }
  .we-unit-top { padding: 28px; background: linear-gradient(135deg, #fef3c7, #ffedd5); }
  .we-unit-top h3 { font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900; color: var(--accent2); margin-bottom: 12px; }
  .we-unit-top p { color: var(--ink2); line-height: 1.8; }
  .we-unit-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
  .we-unit-box { padding: 24px; border-top: 1.5px solid var(--rule); }
  .we-unit-box + .we-unit-box { border-left: 1.5px solid var(--rule); }
  .we-unit-label { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  .we-unit-value { font-family: 'Montserrat', sans-serif; font-size: 23px; font-weight: 900; color: var(--accent); line-height: 1.2; }
  @media (max-width: 760px) { .we-unit-grid { grid-template-columns: 1fr; } .we-unit-box + .we-unit-box { border-left: none; } }

  .we-faq-wrap { margin-top: 74px; }
  .we-faq-title { font-family: 'Montserrat', sans-serif; font-size: clamp(28px,5vw,42px); font-weight: 900; color: var(--ink); letter-spacing: -0.03em; margin-bottom: 22px; }
  .we-faq-title span { color: var(--accent); }
  .we-faq-list { display: grid; gap: 12px; }
  .we-faq-item { background: var(--white); border: 1.5px solid var(--rule); border-radius: 10px; overflow: hidden; }
  .we-faq-q { width: 100%; border: 0; background: transparent; padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; text-align: left; cursor: pointer; font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 700; color: var(--ink); }
  .we-faq-icon { color: var(--accent); font-size: 18px; line-height: 1; flex-shrink: 0; }
  .we-faq-a { padding: 0 20px 20px; color: var(--ink2); line-height: 1.8; font-size: 15px; }

  @media (max-width: 520px) {
    .we-body-text { font-size: 15px; }
    .we-work-top, .we-condition-card, .we-work-visual, .we-formula-card, .we-energy-body, .we-relation-panel, .we-power-card, .we-unit-top, .we-unit-box { padding: 20px; }
    .we-force-stage { height: 136px; }
    .we-block { left: 40%; width: 54px; height: 40px; }
    .we-arrow-force, .we-arrow-displacement { width: 78px; }
    .we-arrow-force { left: 14%; }
    .we-arrow-displacement { left: 14%; }
    .we-force-stage.negative .we-arrow-force { right: 14%; }
    .we-arrow-displacement.perp { width: 5px; height: 68px; right: 20%; }
    .we-force-label, .we-disp-label { font-size: 10px; padding: 3px 6px; }
    .we-energy-visual { height: 164px; }
    .we-height-line { right: 19%; top: 26px; }
    .we-top-block { right: calc(19% - 22px); top: 16px; width: 42px; height: 36px; }
    .we-faq-q { font-size: 15px; padding: 16px; }
    .we-faq-a { padding: 0 16px 18px; }
  }
`;

const faqs = [
  {
    q: "What are the scientific conditions for work to be done?",
    a: "There must be displacement, and the displacement of the object must be in the direction of the applied force."
  },
  {
    q: "What is the formula and unit of work?",
    a: "Work done by a constant force is W = F × s, where s is displacement along the direction of force. The SI unit of work is joule. 1 J = 1 N m."
  },
  {
    q: "What is work done against gravity?",
    a: "Work done against gravity is equal to Weight × Height, so W = mgh."
  },
  {
    q: "When is work done negative?",
    a: "Work done is negative when force and displacement are in opposite directions."
  },
  {
    q: "When is no work done?",
    a: "No work is done when there is no displacement, such as when a boy pushes a wall, or when displacement is perpendicular to the applied force, such as centripetal force in circular motion."
  },
  {
    q: "What is energy?",
    a: "Energy is the capacity to do work. It can exist in various forms such as heat energy, mechanical energy, nuclear energy and light energy."
  },
  {
    q: "What is mechanical energy?",
    a: "Mechanical energy is the energy caused by the motion or the position and configuration of an object."
  },
  {
    q: "What is kinetic energy?",
    a: "A body possesses kinetic energy by virtue of its motion. The kinetic energy of wind is used in windmills to generate electricity."
  },
  {
    q: "What is potential energy?",
    a: "A body possesses potential energy by virtue of its position or configuration. Gravitational potential energy is PE = mgh."
  },
  {
    q: "What is the law of conservation of energy?",
    a: "The total amount of energy in a system always remains constant. Energy can change from one form to another, but it is not destroyed."
  },
  {
    q: "What is power?",
    a: "Power is the rate of doing work. Power can also be defined as the product of force and average speed: P = F × v."
  },
  {
    q: "What is one horsepower?",
    a: "1 horsepower is equal to 746 watts."
  },
  {
    q: "What is the commercial unit of energy?",
    a: "The commercial unit of energy is kilowatt-hour. 1 kWh = 3.6 × 10⁶ J, and 1 unit = 1 kWh."
  }
];

export default function Chapter11WorkAndEnergy() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="we-root">
      <FontLink />
      <style>{styles}</style>

      <section className="we-hero">
        <div className="we-hero-grid" />
        <div className="we-glow-a" />
        <div className="we-glow-b" />
        <div className="we-energy-orbit"><div className="we-bolt" /></div>
        <div className="we-hero-bg-num">11</div>
        <div className="we-hero-inner">
          <div className="we-overline">Class 9 · Science · Chapter 11</div>
          <h1 className="we-hero-title"><em>Work</em> and <span className="em2">Energy</span></h1>
          <div className="we-hero-bar">
            <div className="we-hero-bar-item">
              <div className="we-bar-label">Subject</div>
              <div className="we-bar-value">Science — Physics</div>
            </div>
            <div className="we-hero-bar-item">
              <div className="we-bar-label">Core Idea</div>
              <div className="we-bar-value">Work, Energy & Power</div>
            </div>
            <div className="we-hero-bar-item">
              <div className="we-bar-label">Includes</div>
              <div className="we-bar-value">K.E., P.E., kWh</div>
            </div>
            <div className="we-hero-bar-item">
              <div className="we-bar-label">Format</div>
              <div className="we-bar-value">Notes + FAQ</div>
            </div>
          </div>
        </div>
      </section>

      <main className="we-body">
        <div className="we-intro">
          <p><strong>Work and Energy</strong> connects force, displacement, motion and power into one simple idea: energy is the capacity to do work.</p>
          <p>This chapter explains when work is actually done, how energy appears as <strong>kinetic energy</strong> and <strong>potential energy</strong>, and how power and commercial energy units are calculated.</p>
        </div>

        <section className="we-sec">
          <div className="we-sec-head">
            <div className="we-sec-num">01</div>
            <div className="we-sec-title-wrap">
              <div className="we-sec-kicker">Scientific meaning</div>
              <h2 className="we-sec-title">When is <span>Work</span> Done?</h2>
            </div>
          </div>

          <div className="we-work-panel">
            <div className="we-work-top">
              <h3>Work needs both force and displacement.</h3>
              <p>For work to be done scientifically, there must be displacement and the displacement of the object must be in the direction of the applied force.</p>
            </div>
            <div className="we-condition-grid">
              <div className="we-condition-card">
                <div className="we-condition-label">Condition 1</div>
                <h4>There must be displacement</h4>
                <p>If the object does not move, work is not done even if force is applied.</p>
              </div>
              <div className="we-condition-card">
                <div className="we-condition-label">Condition 2</div>
                <h4>Force and displacement should align</h4>
                <p>Displacement should occur in the direction of the applied force for positive work.</p>
              </div>
            </div>
          </div>

          <div className="we-work-visual">
            <div className="we-force-row">
              <div className="we-force-card">
                <div className="we-force-stage">
                  <span className="we-force-label">Force</span>
                  <span className="we-disp-label">Displacement</span>
                  <div className="we-arrow-force" />
                  <div className="we-arrow-displacement" />
                  <div className="we-block" />
                  <div className="we-ground" />
                </div>
                <h4 className="we-force-title">Positive Work</h4>
                <p>Force and displacement are in the same direction.</p>
              </div>
              <div className="we-force-card">
                <div className="we-force-stage negative">
                  <span className="we-force-label">Force</span>
                  <span className="we-disp-label">Displacement</span>
                  <div className="we-arrow-force" />
                  <div className="we-arrow-displacement" />
                  <div className="we-block" />
                  <div className="we-ground" />
                </div>
                <h4 className="we-force-title">Negative Work</h4>
                <p>Force and displacement are in opposite directions.</p>
              </div>
              <div className="we-force-card">
                <div className="we-force-stage none">
                  <span className="we-force-label">Force</span>
                  <span className="we-disp-label">Displacement</span>
                  <div className="we-arrow-force" />
                  <div className="we-arrow-displacement perp" />
                  <div className="we-block" />
                  <div className="we-ground" />
                </div>
                <h4 className="we-force-title">No Work</h4>
                <p>No displacement, or displacement is perpendicular to force.</p>
              </div>
            </div>
          </div>

          <div className="we-formula-strip">
            <div className="we-formula-card">
              <div className="we-formula-title">Constant force</div>
              <div className="we-formula-main">W = F × s</div>
              <div className="we-formula-note">Work = Force × Displacement along the direction of force. Unit: Joule. 1 J = 1 N m.</div>
            </div>
            <div className="we-formula-card">
              <div className="we-formula-title">Against gravity</div>
              <div className="we-formula-main">W = mgh</div>
              <div className="we-formula-note">Work done against gravity = Weight × Height = mgh.</div>
            </div>
          </div>
        </section>

        <div className="we-divider"><div className="we-divider-mark" /></div>

        <section className="we-sec">
          <div className="we-sec-head">
            <div className="we-sec-num">02</div>
            <div className="we-sec-title-wrap">
              <div className="we-sec-kicker">Capacity to do work</div>
              <h2 className="we-sec-title">Energy and its <span>Forms</span></h2>
            </div>
          </div>

          <p className="we-body-text"><strong>Energy</strong> is the capacity to do work. It exists in many forms such as heat energy, mechanical energy, nuclear energy and light energy.</p>

          <div className="we-forms-grid">
            <div className="we-form-pill"><div className="we-form-icon">🔥</div><span>Heat Energy</span></div>
            <div className="we-form-pill"><div className="we-form-icon">⚙️</div><span>Mechanical Energy</span></div>
            <div className="we-form-pill"><div className="we-form-icon">☢️</div><span>Nuclear Energy</span></div>
            <div className="we-form-pill"><div className="we-form-icon">💡</div><span>Light Energy</span></div>
          </div>
        </section>

        <div className="we-divider"><div className="we-divider-mark" /></div>

        <section className="we-sec">
          <div className="we-sec-head">
            <div className="we-sec-num">03</div>
            <div className="we-sec-title-wrap">
              <div className="we-sec-kicker">Mechanical energy</div>
              <h2 className="we-sec-title">Kinetic and <span>Potential</span> Energy</h2>
            </div>
          </div>

          <p className="we-body-text"><strong>Mechanical energy</strong> is caused by the motion or the position and configuration of the object.</p>

          <div className="we-energy-grid">
            <div className="we-energy-card dark">
              <div className="we-energy-visual">
                <div className="we-speed-lines" />
                <div className="we-moving-ball" />
              </div>
              <div className="we-energy-body">
                <div className="we-energy-kicker">By virtue of motion</div>
                <h3>Kinetic Energy</h3>
                <p>A body possesses kinetic energy because of its motion. The kinetic energy of wind is used in windmills to generate electricity.</p>
                <span className="we-mini-formula">K.E. = ½mv²</span>
              </div>
            </div>
            <div className="we-energy-card">
              <div className="we-energy-visual">
                <div className="we-hill" />
                <div className="we-height-line" />
                <div className="we-top-block" />
              </div>
              <div className="we-energy-body">
                <div className="we-energy-kicker">By position or configuration</div>
                <h3>Potential Energy</h3>
                <p>A body possesses potential energy by virtue of its position or configuration.</p>
                <span className="we-mini-formula">Gravitational P.E. = mgh</span>
              </div>
            </div>
          </div>

          <div className="we-relation-panel">
            <div className="we-relation-box">
              <h4>K.E. proof idea</h4>
              <div className="we-relation-formula">v² − u² = 2as</div>
              <p>The equation of motion is used to derive the expression for kinetic energy.</p>
            </div>
            <div className="we-relation-box">
              <h4>K.E. and momentum</h4>
              <div className="we-relation-formula">K = p² / 2m</div>
              <p>This shows the relationship between kinetic energy and momentum.</p>
            </div>
          </div>
        </section>

        <div className="we-divider"><div className="we-divider-mark" /></div>

        <section className="we-sec">
          <div className="we-sec-head">
            <div className="we-sec-num">04</div>
            <div className="we-sec-title-wrap">
              <div className="we-sec-kicker">Energy transformation</div>
              <h2 className="we-sec-title">Law of Conservation of <span>Energy</span></h2>
            </div>
          </div>

          <div className="we-conserve-card">
            <div className="we-conserve-grid">
              <div>
                <h2 className="we-conserve-title">Energy remains constant.</h2>
                <p className="we-conserve-text">The total amount of energy in a system always remains constant. Energy may change from one form to another, but the total energy of the system remains conserved.</p>
              </div>
              <div className="we-pendulum-stage">
                <div className="we-arc" />
                <div className="we-pivot" />
                <div className="we-string"><div className="we-pendulum-ball" /></div>
                <div className="we-pe-label">More P.E.</div>
                <div className="we-ke-label">More K.E.</div>
              </div>
            </div>
          </div>
        </section>

        <div className="we-divider"><div className="we-divider-mark" /></div>

        <section className="we-sec">
          <div className="we-sec-head">
            <div className="we-sec-num">05</div>
            <div className="we-sec-title-wrap">
              <div className="we-sec-kicker">Rate of work</div>
              <h2 className="we-sec-title">Power and <span>Electric Energy</span></h2>
            </div>
          </div>

          <div className="we-power-grid">
            <div className="we-power-card highlight">
              <h3>Power</h3>
              <p>Power is defined as the rate of doing work.</p>
              <div className="we-power-formulas">
                <div className="we-power-formula">Power = Work / Time</div>
                <div className="we-power-formula">P = F × v</div>
                <div className="we-power-formula">1 Horse Power = 746 Watts</div>
              </div>
            </div>
            <div className="we-power-card">
              <h3>Electric Appliances</h3>
              <p>For electric appliances, power depends on voltage and current. Energy consumed in time t is power multiplied by time.</p>
              <div className="we-power-formulas">
                <div className="we-power-formula">Power = Voltage × Current</div>
                <div className="we-power-formula">Energy = Power × Time</div>
              </div>
            </div>
          </div>
        </section>

        <div className="we-divider"><div className="we-divider-mark" /></div>

        <section className="we-sec">
          <div className="we-sec-head">
            <div className="we-sec-num">06</div>
            <div className="we-sec-title-wrap">
              <div className="we-sec-kicker">Commercial unit</div>
              <h2 className="we-sec-title">Kilowatt-hour and <span>Units</span></h2>
            </div>
          </div>

          <div className="we-unit-card">
            <div className="we-unit-top">
              <h3>Electrical energy is measured in kWh.</h3>
              <p>The commercial unit of energy is kilowatt-hour. The electrical energy consumed in our houses is expressed in terms of units.</p>
            </div>
            <div className="we-unit-grid">
              <div className="we-unit-box">
                <div className="we-unit-label">Commercial unit</div>
                <div className="we-unit-value">kWh</div>
              </div>
              <div className="we-unit-box">
                <div className="we-unit-label">Conversion</div>
                <div className="we-unit-value">1 kWh = 3.6 × 10⁶ J</div>
              </div>
              <div className="we-unit-box">
                <div className="we-unit-label">Household billing</div>
                <div className="we-unit-value">1 unit = 1 kWh</div>
              </div>
            </div>
          </div>
        </section>

        <section className="we-faq-wrap">
          <h2 className="we-faq-title">Quick <span>FAQ Revision</span></h2>
          <div className="we-faq-list">
            {faqs.map((item, index) => (
              <div className="we-faq-item" key={item.q}>
                <button
                  className="we-faq-q"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  aria-expanded={openFaq === index}
                >
                  <span>{item.q}</span>
                  <span className="we-faq-icon">{openFaq === index ? "▴" : "▾"}</span>
                </button>
                {openFaq === index && <div className="we-faq-a">{item.a}</div>}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
