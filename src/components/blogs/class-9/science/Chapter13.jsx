import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #071713;
    --ink2:       #18342d;
    --muted:      #547067;
    --paper:      #f1fbf7;
    --paper2:     #dcf7ed;
    --accent:     #0f766e;
    --accent2:    #115e59;
    --accent-lt:  #ccfbf1;
    --mint:       #10b981;
    --mint-lt:    #d1fae5;
    --rose:       #be123c;
    --rose-lt:    #ffe4e6;
    --amber:      #b45309;
    --amber-lt:   #fef3c7;
    --blue:       #1d4ed8;
    --blue-lt:    #dbeafe;
    --violet:     #6d28d9;
    --violet-lt:  #ede9fe;
    --orange:     #c2410c;
    --orange-lt:  #ffedd5;
    --rule:       #5eead4;
    --white:      #ffffff;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  .ill-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  /* ═════════════════ HERO — medical mint + deep teal theme ═════════════════ */
  .ill-hero {
    background: radial-gradient(circle at 78% 24%, rgba(16,185,129,0.15) 0%, transparent 30%),
                radial-gradient(circle at 18% 22%, rgba(94,234,212,0.16) 0%, transparent 36%),
                linear-gradient(135deg, #03110e 0%, #06211c 50%, #08352d 100%);
    min-height: 88vh;
    display: flex;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
    padding: 0 0 64px;
  }
  @media (max-width: 700px) { .ill-hero { min-height: auto; align-items: flex-start; padding: 72px 0 48px; } }
  .ill-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 6px;
    background: linear-gradient(90deg, #0f766e 0%, #10b981 34%, #be123c 68%, #6d28d9 100%);
  }
  .ill-hero-grid {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(94,234,212,0.13) 1px, transparent 1px);
    background-size: 30px 30px;
    pointer-events: none;
  }
  .ill-hero-plus {
    position: absolute;
    top: 50%; right: 5%;
    width: clamp(170px, 27vw, 350px);
    height: clamp(170px, 27vw, 350px);
    transform: translateY(-50%);
    pointer-events: none;
    opacity: 0.34;
  }
  .ill-hero-plus::before,
  .ill-hero-plus::after {
    content: '';
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 16px;
    background: rgba(94,234,212,0.16);
    border: 1px solid rgba(94,234,212,0.18);
  }
  .ill-hero-plus::before { width: 42%; height: 86%; }
  .ill-hero-plus::after { width: 86%; height: 42%; }
  .ill-cell-ring {
    position: absolute;
    inset: 8%;
    border-radius: 50%;
    border: 1.5px dashed rgba(94,234,212,0.18);
  }
  .ill-cell-ring::after {
    content: '';
    position: absolute;
    inset: 32%;
    border-radius: 50%;
    background: rgba(16,185,129,0.12);
  }
  .ill-glow-a { position: absolute; top: 14%; left: 5%; width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(15,118,110,0.22) 0%, transparent 70%); pointer-events: none; }
  .ill-glow-b { position: absolute; bottom: 8%; right: 18%; width: 230px; height: 230px; border-radius: 50%; background: radial-gradient(circle, rgba(190,18,60,0.12) 0%, transparent 72%); pointer-events: none; }
  .ill-hero-bg-num {
    position: absolute;
    bottom: -86px; right: -26px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(190px, 34vw, 470px);
    font-weight: 900;
    line-height: 1;
    color: rgba(255,255,255,0.018);
    letter-spacing: -0.06em;
    user-select: none;
    pointer-events: none;
  }
  .ill-hero-inner { max-width: 900px; width: 100%; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
  .ill-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #5eead4;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .ill-overline::before, .ill-overline::after { content: ''; flex: 0 0 40px; height: 1px; background: #5eead4; }
  .ill-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(34px, 7.5vw, 78px);
    font-weight: 900;
    color: #fff;
    line-height: 0.94;
    letter-spacing: -0.035em;
    margin-bottom: 32px;
  }
  .ill-hero-title em { font-style: normal; color: #5eead4; }
  .ill-hero-title .em2 { color: #fda4af; }
  .ill-hero-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 24px;
    margin-top: 8px;
  }
  .ill-hero-bar-item { flex: 1 1 150px; padding: 0 24px 0 0; border-right: 1px solid rgba(255,255,255,0.08); margin-right: 24px; }
  .ill-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .ill-bar-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.30); margin-bottom: 5px; }
  .ill-bar-value { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.74); }
  @media (max-width: 700px) {
    .ill-hero-inner { padding: 0 18px; }
    .ill-overline { font-size: 10px; letter-spacing: 0.16em; }
    .ill-overline::before, .ill-overline::after { flex-basis: 28px; }
    .ill-hero-title { font-size: clamp(38px, 11vw, 58px); margin-bottom: 24px; }
    .ill-hero-bar { gap: 12px; }
    .ill-hero-bar-item { flex: 1 1 120px; padding: 0 14px 0 0; margin-right: 14px; }
    .ill-bar-label { font-size: 9px; letter-spacing: 0.12em; }
    .ill-bar-value { font-size: 13px; }
    .ill-hero-plus { opacity: 0.22; right: -25%; }
  }

  /* ═════════════════ BODY ═════════════════ */
  .ill-body { max-width: 930px; margin: 0 auto; padding: 72px 32px 100px; }
  @media (max-width: 700px) { .ill-body { padding: 48px 18px 72px; } }

  .ill-intro {
    background: linear-gradient(135deg, #03110e 0%, #08352d 100%);
    border-left: 5px solid var(--accent);
    border-radius: 6px;
    padding: 36px 40px;
    margin-bottom: 72px;
    position: relative;
    overflow: hidden;
  }
  .ill-intro::after { content: '✚'; position: absolute; right: 34px; top: 50%; transform: translateY(-50%); font-family: 'Montserrat', sans-serif; font-size: 106px; font-weight: 900; opacity: 0.08; }
  .ill-intro p { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 500; color: rgba(255,255,255,0.86); line-height: 1.8; margin: 0 0 14px; position: relative; z-index: 1; }
  .ill-intro p:last-child { margin-bottom: 0; }
  .ill-intro strong { color: #5eead4; }
  @media (max-width: 700px) { .ill-intro { padding: 24px 20px; } .ill-intro p { font-size: 15px; } }

  .ill-divider { margin: 56px 0; display: flex; align-items: center; gap: 16px; }
  .ill-divider::before, .ill-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .ill-divider-mark { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

  .ill-sec { margin-bottom: 58px; }
  .ill-sec-head { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 30px; border-bottom: 2px solid var(--rule); padding-bottom: 18px; }
  .ill-sec-num { font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900; color: var(--rule); line-height: 1; flex-shrink: 0; }
  .ill-sec-title-wrap { padding-top: 8px; }
  .ill-sec-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .ill-sec-title { font-family: 'Montserrat', sans-serif; font-size: clamp(22px, 4vw, 32px); font-weight: 900; color: var(--ink); line-height: 1.15; letter-spacing: -0.02em; }
  .ill-sec-title span { color: var(--accent); }
  .ill-body-text { font-size: 16px; color: var(--ink2); line-height: 1.85; margin-bottom: 26px; }
  .ill-body-text strong { color: var(--accent2); font-weight: 700; }
  @media (max-width: 580px) {
    .ill-sec-head { gap: 14px; margin-bottom: 24px; }
    .ill-sec-num { font-size: 42px; }
    .ill-sec-title-wrap { padding-top: 4px; }
  }

  /* Health vs Disease */
  .ill-hd-panel { background: var(--white); border: 1.5px solid var(--rule); border-radius: 14px; overflow: hidden; box-shadow: 0 16px 34px rgba(17,94,89,0.08); }
  .ill-hd-grid { display: grid; grid-template-columns: 1fr 1fr; }
  .ill-hd-card { padding: 30px; min-height: 280px; position: relative; overflow: hidden; }
  .ill-hd-card:first-child { background: linear-gradient(135deg, #ccfbf1 0%, #fff 100%); }
  .ill-hd-card:nth-child(2) { border-left: 1.5px solid var(--rule); background: linear-gradient(135deg, #fff 0%, #ffe4e6 100%); }
  .ill-hd-label { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
  .ill-hd-title { font-family: 'Montserrat', sans-serif; font-size: 30px; font-weight: 900; margin-bottom: 14px; letter-spacing: -0.02em; }
  .ill-hd-card:first-child .ill-hd-title { color: var(--accent2); }
  .ill-hd-card:nth-child(2) .ill-hd-title { color: var(--rose); }
  .ill-hd-card p { color: var(--ink2); line-height: 1.85; font-size: 16px; position: relative; z-index: 1; }
  .ill-hd-mark { position: absolute; right: 22px; bottom: 14px; font-family: 'Montserrat', sans-serif; font-size: 92px; font-weight: 900; opacity: 0.08; }
  .ill-sign-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 18px; }
  .ill-sign-mini { background: rgba(255,255,255,0.65); border: 1px solid rgba(15,118,110,0.18); border-radius: 10px; padding: 14px; }
  .ill-sign-mini strong { display: block; font-family: 'Poppins', sans-serif; font-size: 13px; color: var(--accent2); margin-bottom: 5px; }
  .ill-sign-mini span { color: var(--ink2); font-size: 14px; line-height: 1.55; }
  @media (max-width: 780px) { .ill-hd-grid { grid-template-columns: 1fr; } .ill-hd-card:nth-child(2) { border-left: none; border-top: 1.5px solid var(--rule); } }
  @media (max-width: 520px) { .ill-hd-card { padding: 22px; } .ill-sign-row { grid-template-columns: 1fr; } }

  /* Causes */
  .ill-cause-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .ill-cause-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; }
  .ill-cause-head { padding: 24px; background: linear-gradient(135deg, #ccfbf1, #fff); border-bottom: 1.5px solid var(--rule); }
  .ill-cause-head h3 { font-family: 'Montserrat', sans-serif; font-size: 25px; font-weight: 900; color: var(--accent2); margin-bottom: 8px; }
  .ill-cause-head p { color: var(--ink2); line-height: 1.7; }
  .ill-cause-list { padding: 22px 24px; display: grid; gap: 12px; }
  .ill-cause-item { display: grid; grid-template-columns: 34px 1fr; gap: 12px; align-items: flex-start; }
  .ill-cause-num { width: 34px; height: 34px; border-radius: 50%; background: var(--accent-lt); display: flex; align-items: center; justify-content: center; font-family: 'Montserrat', sans-serif; font-weight: 900; color: var(--accent2); font-size: 14px; }
  .ill-cause-item span { color: var(--ink2); line-height: 1.65; }
  .ill-cause-card.immediate .ill-cause-head { background: linear-gradient(135deg, #ffe4e6, #fff); }
  .ill-cause-card.immediate .ill-cause-head h3 { color: var(--rose); }
  @media (max-width: 760px) { .ill-cause-wrap { grid-template-columns: 1fr; } }

  /* Duration */
  .ill-duration-panel { background: linear-gradient(135deg, #03110e 0%, #08352d 100%); color: white; border-radius: 14px; padding: 30px; overflow: hidden; position: relative; }
  .ill-duration-panel::after { content: ''; position: absolute; right: -80px; top: -80px; width: 240px; height: 240px; border-radius: 50%; border: 1px solid rgba(94,234,212,0.18); }
  .ill-duration-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; position: relative; z-index: 1; }
  .ill-duration-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 24px; min-height: 220px; }
  .ill-duration-badge { display: inline-block; font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #5eead4; margin-bottom: 14px; }
  .ill-duration-card h3 { font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900; margin-bottom: 12px; }
  .ill-duration-card p { color: rgba(255,255,255,0.82); line-height: 1.8; }
  .ill-duration-examples { margin-top: 16px; display: flex; flex-wrap: wrap; gap: 8px; }
  .ill-duration-chip { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.14); color: rgba(255,255,255,0.88); border-radius: 999px; padding: 7px 10px; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; }
  @media (max-width: 760px) { .ill-duration-panel { padding: 24px 20px; } .ill-duration-grid { grid-template-columns: 1fr; } }

  /* infectious vs non */
  .ill-type-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .ill-type-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 26px; position: relative; overflow: hidden; min-height: 260px; }
  .ill-type-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 5px; background: var(--accent); }
  .ill-type-card.non::before { background: var(--rose); }
  .ill-type-icon { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--accent-lt); color: var(--accent2); font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 22px; margin-bottom: 16px; }
  .ill-type-card.non .ill-type-icon { background: var(--rose-lt); color: var(--rose); }
  .ill-type-card h3 { font-family: 'Montserrat', sans-serif; font-size: 25px; font-weight: 900; color: var(--ink); margin-bottom: 12px; }
  .ill-type-card p { color: var(--ink2); line-height: 1.8; margin-bottom: 12px; }
  .ill-type-example { background: var(--paper); border-left: 4px solid var(--accent); border-radius: 8px; padding: 12px 14px; color: var(--ink2); line-height: 1.65; }
  .ill-type-card.non .ill-type-example { border-left-color: var(--rose); }
  @media (max-width: 760px) { .ill-type-grid { grid-template-columns: 1fr; } }

  /* Agents */
  .ill-agent-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
  .ill-agent-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 18px; min-height: 230px; position: relative; overflow: hidden; }
  .ill-agent-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 5px; background: linear-gradient(90deg, var(--accent), var(--mint)); }
  .ill-agent-card h3 { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; color: var(--accent2); margin-bottom: 10px; }
  .ill-agent-card p { color: var(--ink2); line-height: 1.65; font-size: 14px; margin-bottom: 10px; }
  .ill-agent-ex { color: var(--muted); font-size: 13px; line-height: 1.55; }
  .ill-agent-orb { width: 46px; height: 46px; border-radius: 50%; margin-bottom: 14px; background: radial-gradient(circle at 34% 28%, #fff, var(--mint) 34%, var(--accent2) 88%); box-shadow: 0 8px 20px rgba(15,118,110,0.14); }
  .ill-agent-card:nth-child(2) .ill-agent-orb { background: radial-gradient(circle at 34% 28%, #fff, #fda4af 34%, #be123c 88%); }
  .ill-agent-card:nth-child(3) .ill-agent-orb { background: radial-gradient(circle at 34% 28%, #fff, #c4b5fd 34%, #6d28d9 88%); }
  .ill-agent-card:nth-child(4) .ill-agent-orb { background: radial-gradient(circle at 34% 28%, #fff, #bfdbfe 34%, #1d4ed8 88%); }
  .ill-agent-card:nth-child(5) .ill-agent-orb { background: radial-gradient(circle at 34% 28%, #fff, #fed7aa 34%, #c2410c 88%); }
  @media (max-width: 980px) { .ill-agent-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .ill-agent-grid { grid-template-columns: 1fr; } .ill-agent-card { min-height: auto; } }

  /* disease examples */
  .ill-disease-table-wrap { overflow-x: auto; background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; }
  .ill-disease-table { width: 100%; border-collapse: collapse; min-width: 760px; }
  .ill-disease-table th { background: linear-gradient(135deg, var(--accent2), var(--accent)); color: white; font-family: 'Poppins', sans-serif; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; padding: 15px; text-align: left; }
  .ill-disease-table td { border-top: 1px solid var(--rule); padding: 15px; color: var(--ink2); line-height: 1.6; vertical-align: top; }
  .ill-disease-table td:first-child { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--accent2); }
  .ill-mini-note { margin-top: 18px; background: var(--accent-lt); border-left: 4px solid var(--accent); border-radius: 8px; padding: 16px 18px; color: var(--ink2); line-height: 1.75; }

  /* transmission */
  .ill-transmission-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
  .ill-trans-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 18px; min-height: 230px; }
  .ill-trans-icon { width: 44px; height: 44px; border-radius: 50%; background: var(--accent-lt); display: flex; align-items: center; justify-content: center; margin-bottom: 14px; font-size: 21px; }
  .ill-trans-card h3 { font-family: 'Montserrat', sans-serif; font-size: 19px; font-weight: 900; color: var(--ink); margin-bottom: 10px; }
  .ill-trans-card p { color: var(--ink2); line-height: 1.65; font-size: 14px; }
  .ill-trans-card span { display: block; margin-top: 10px; color: var(--muted); font-size: 13px; line-height: 1.55; }
  @media (max-width: 980px) { .ill-transmission-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .ill-transmission-grid { grid-template-columns: 1fr; } .ill-trans-card { min-height: auto; } }

  /* deficiency */
  .ill-deficiency-panel { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; }
  .ill-deficiency-top { padding: 28px; background: linear-gradient(135deg, #fef3c7 0%, #fff 100%); }
  .ill-deficiency-top h3 { font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900; color: var(--amber); margin-bottom: 10px; }
  .ill-deficiency-top p { color: var(--ink2); line-height: 1.8; }
  .ill-deficiency-grid { display: grid; grid-template-columns: 1fr 1fr; }
  .ill-def-block { padding: 26px; border-top: 1.5px solid var(--rule); }
  .ill-def-block:nth-child(2) { border-left: 1.5px solid var(--rule); }
  .ill-def-block h4 { font-family: 'Montserrat', sans-serif; font-size: 23px; font-weight: 900; color: var(--accent2); margin-bottom: 14px; }
  .ill-def-table { width: 100%; border-collapse: collapse; }
  .ill-def-table th { background: var(--accent-lt); color: var(--accent2); font-family: 'Poppins', sans-serif; padding: 10px; text-align: left; font-size: 13px; }
  .ill-def-table td { border: 1px solid var(--rule); padding: 10px; color: var(--ink2); }
  .ill-def-table td:first-child { font-weight: 700; }
  .ill-malnutrition-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 26px; border-top: 1.5px solid var(--rule); }
  .ill-mal-card { background: var(--paper); border-left: 4px solid var(--amber); border-radius: 8px; padding: 16px; }
  .ill-mal-card strong { display: block; color: var(--amber); font-family: 'Poppins', sans-serif; margin-bottom: 8px; }
  .ill-mal-card span { color: var(--ink2); line-height: 1.7; }
  @media (max-width: 780px) { .ill-deficiency-grid, .ill-malnutrition-row { grid-template-columns: 1fr; } .ill-def-block:nth-child(2) { border-left: none; } }

  /* effects + immunity */
  .ill-effect-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
  .ill-effect-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 20px; min-height: 190px; }
  .ill-effect-card h3 { font-family: 'Montserrat', sans-serif; font-size: 21px; font-weight: 900; margin-bottom: 10px; }
  .ill-effect-card.local h3 { color: var(--accent2); }
  .ill-effect-card.general h3 { color: var(--rose); }
  .ill-effect-card.inflammation h3 { color: var(--violet); }
  .ill-effect-card p { color: var(--ink2); line-height: 1.7; }
  @media (max-width: 760px) { .ill-effect-grid { grid-template-columns: 1fr; } }

  .ill-immune-card { margin-top: 22px; background: linear-gradient(135deg, #03110e 0%, #08352d 100%); color: white; border-radius: 12px; padding: 30px; overflow: hidden; position: relative; }
  .ill-immune-card::after { content: ''; position: absolute; right: -70px; top: -70px; width: 220px; height: 220px; border-radius: 50%; border: 1px solid rgba(94,234,212,0.18); }
  .ill-immune-grid { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 28px; align-items: center; position: relative; z-index: 1; }
  .ill-immune-title { font-family: 'Montserrat', sans-serif; font-size: 30px; font-weight: 900; color: #5eead4; margin-bottom: 12px; }
  .ill-immune-text { color: rgba(255,255,255,0.84); line-height: 1.85; }
  .ill-immune-list { display: grid; gap: 10px; }
  .ill-immune-item { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; padding: 12px 14px; color: rgba(255,255,255,0.86); line-height: 1.65; }
  @media (max-width: 760px) { .ill-immune-card { padding: 24px 20px; } .ill-immune-grid { grid-template-columns: 1fr; } }

  /* Treatment and prevention */
  .ill-treatment-flow { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; }
  .ill-treatment-top { padding: 28px; background: linear-gradient(135deg, #ccfbf1 0%, #fff 100%); }
  .ill-treatment-top h3 { font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900; color: var(--accent2); margin-bottom: 10px; }
  .ill-treatment-top p { color: var(--ink2); line-height: 1.8; }
  .ill-treatment-steps { display: grid; grid-template-columns: 1fr 1fr; }
  .ill-treatment-step { padding: 26px; border-top: 1.5px solid var(--rule); }
  .ill-treatment-step:nth-child(2) { border-left: 1.5px solid var(--rule); }
  .ill-treatment-step h4 { font-family: 'Montserrat', sans-serif; font-size: 23px; font-weight: 900; color: var(--ink); margin-bottom: 10px; }
  .ill-treatment-step p { color: var(--ink2); line-height: 1.75; }
  @media (max-width: 760px) { .ill-treatment-steps { grid-template-columns: 1fr; } .ill-treatment-step:nth-child(2) { border-left: none; } }

  .ill-prevention-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 22px; }
  .ill-prevention-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 12px; padding: 24px; }
  .ill-prevention-card h3 { font-family: 'Montserrat', sans-serif; font-size: 25px; font-weight: 900; color: var(--accent2); margin-bottom: 14px; }
  .ill-prevention-card.specific h3 { color: var(--rose); }
  .ill-prevention-list { display: grid; gap: 10px; }
  .ill-prevention-item { display: grid; grid-template-columns: 24px 1fr; gap: 10px; color: var(--ink2); line-height: 1.65; }
  .ill-check { width: 24px; height: 24px; border-radius: 50%; background: var(--accent-lt); color: var(--accent2); display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 12px; }
  @media (max-width: 760px) { .ill-prevention-grid { grid-template-columns: 1fr; } }

  /* hygiene */
  .ill-hygiene-strip { margin-top: 22px; display: grid; grid-template-columns: 1fr 1fr; border: 1.5px solid var(--rule); border-radius: 12px; overflow: hidden; background: var(--white); }
  .ill-hygiene-box { padding: 24px; }
  .ill-hygiene-box:nth-child(2) { border-left: 1.5px solid var(--rule); }
  .ill-hygiene-box h3 { font-family: 'Montserrat', sans-serif; font-size: 23px; font-weight: 900; color: var(--accent2); margin-bottom: 10px; }
  .ill-hygiene-box p { color: var(--ink2); line-height: 1.75; }
  @media (max-width: 760px) { .ill-hygiene-strip { grid-template-columns: 1fr; } .ill-hygiene-box:nth-child(2) { border-left: none; border-top: 1.5px solid var(--rule); } }

  /* FAQ */
  .ill-faq-wrap { margin-top: 74px; }
  .ill-faq-title { font-family: 'Montserrat', sans-serif; font-size: clamp(28px,5vw,42px); font-weight: 900; color: var(--ink); letter-spacing: -0.03em; margin-bottom: 22px; }
  .ill-faq-title span { color: var(--accent); }
  .ill-faq-list { display: grid; gap: 12px; }
  .ill-faq-item { background: var(--white); border: 1.5px solid var(--rule); border-radius: 10px; overflow: hidden; }
  .ill-faq-q { width: 100%; border: 0; background: transparent; padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; text-align: left; cursor: pointer; font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 700; color: var(--ink); }
  .ill-faq-icon { color: var(--accent); font-size: 18px; line-height: 1; flex-shrink: 0; }
  .ill-faq-a { padding: 0 20px 20px; color: var(--ink2); line-height: 1.8; font-size: 15px; }

  @media (max-width: 520px) {
    .ill-body-text { font-size: 15px; }
    .ill-cause-head, .ill-cause-list, .ill-deficiency-top, .ill-def-block, .ill-malnutrition-row, .ill-treatment-top, .ill-treatment-step, .ill-prevention-card, .ill-hygiene-box { padding: 20px; }
    .ill-type-card, .ill-effect-card { padding: 20px; }
    .ill-faq-q { font-size: 15px; padding: 16px; }
    .ill-faq-a { padding: 0 16px 18px; }
  }
`;

const faqData = [
  {
    q: "What is health?",
    a: "Health is a state of physical, mental and social well-being. It includes harmony within the mind, body and soul of an organism."
  },
  {
    q: "What is disease?",
    a: "Disease is any condition that can lead to discomfort, distress, health problems and even death of the affected person."
  },
  {
    q: "What is the difference between symptoms and signs of disease?",
    a: "Symptoms are indications felt by the patient, such as headache, stomach pain and nausea. Signs are observations such as fever, vomiting and diarrhoea that can be noticed by a physician."
  },
  {
    q: "What is incubation period?",
    a: "Incubation period is the time interval between infection and the appearance of symptoms."
  },
  {
    q: "What are contributory causes of disease?",
    a: "Contributory causes include unhealthy conditions, improper public services and poverty. These conditions make disease more likely."
  },
  {
    q: "What are immediate causes of disease?",
    a: "Immediate causes are external causes like microorganisms. Viruses, bacteria and other microorganisms can directly cause disease."
  },
  {
    q: "What is the difference between acute and chronic disease?",
    a: "Acute diseases last for a short period, such as cold, cough and influenza. Chronic diseases last for a long period, such as diabetes and kidney stones."
  },
  {
    q: "What are infectious diseases?",
    a: "Infectious diseases are caused by infectious agents such as bacteria, viruses, protozoans and fungi. They can spread from an infected person to a healthy person."
  },
  {
    q: "What are non-infectious diseases?",
    a: "Non-infectious diseases are caused by internal causes such as excessive weight or genetic defects. Examples include high blood pressure and cancer."
  },
  {
    q: "Name some diseases caused by viruses.",
    a: "Diseases caused by viruses include influenza, common cold caused by Rhinovirus, dengue, AIDS and SARS."
  },
  {
    q: "Name some diseases caused by bacteria.",
    a: "Bacterial diseases include whooping cough, typhoid, cholera, anthrax, pneumonia, dysentery, plague and diphtheria."
  },
  {
    q: "What causes malaria?",
    a: "Malaria is caused by Plasmodium. The malarial parasite requires two hosts: humans and female Anopheles mosquito."
  },
  {
    q: "What are vectors?",
    a: "Vectors are animals that transfer disease-causing microorganisms from an infected person to others. Female mosquitoes can transfer malaria-causing Plasmodium."
  },
  {
    q: "What are local and general effects of disease?",
    a: "Local effects include swelling, pain and joint stiffness at the site of infection. General effects include fever, chills, headache, fatigue and loss of appetite."
  },
  {
    q: "What is inflammation?",
    a: "Inflammation is the process by which the body’s immune system responds to protect the body from infection."
  },
  {
    q: "What are specific defence mechanisms?",
    a: "Specific defence includes engulfing pathogens by white blood cells and producing specific antibodies against specific antigens."
  },
  {
    q: "What is vaccination?",
    a: "Vaccination protects the body from communicable diseases by administering agents that mimic the microbe. Vaccines are available against diseases such as tetanus, polio, measles, hepatitis B and whooping cough."
  },
  {
    q: "How can infectious diseases be prevented?",
    a: "They can be prevented through personal hygiene, public hygiene, safe drinking water, clean environment, proper nutrition, covering the mouth and nose while coughing or sneezing and vaccination."
  }
];

export default function Chapter13WhyDoWeFallIll() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="ill-root">
      <FontLink />
      <style>{styles}</style>

      <section className="ill-hero">
        <div className="ill-hero-grid" />
        <div className="ill-glow-a" />
        <div className="ill-glow-b" />
        <div className="ill-hero-plus"><div className="ill-cell-ring" /></div>
        <div className="ill-hero-bg-num">13</div>
        <div className="ill-hero-inner">
          <div className="ill-overline">Class 9 · Science · Chapter 13</div>
          <h1 className="ill-hero-title"><em>Why Do We</em><br /><span className="em2">Fall Ill?</span></h1>
          <div className="ill-hero-bar">
            <div className="ill-hero-bar-item">
              <div className="ill-bar-label">Subject</div>
              <div className="ill-bar-value">Science — Biology</div>
            </div>
            <div className="ill-hero-bar-item">
              <div className="ill-bar-label">Core Idea</div>
              <div className="ill-bar-value">Health & Disease</div>
            </div>
            <div className="ill-hero-bar-item">
              <div className="ill-bar-label">Includes</div>
              <div className="ill-bar-value">Infection, Immunity, Prevention</div>
            </div>
            <div className="ill-hero-bar-item">
              <div className="ill-bar-label">Format</div>
              <div className="ill-bar-value">Notes + FAQ</div>
            </div>
          </div>
        </div>
      </section>

      <main className="ill-body">
        <div className="ill-intro">
          <p><strong>Why Do We Fall Ill?</strong> explains the difference between health and disease, the causes of illness, how diseases spread, how the body defends itself and how diseases can be prevented.</p>
          <p>The chapter is important because it connects biology with daily life: hygiene, nutrition, immunity, vaccination, public health and infectious agents.</p>
        </div>

        <section className="ill-sec">
          <div className="ill-sec-head">
            <div className="ill-sec-num">01</div>
            <div className="ill-sec-title-wrap">
              <div className="ill-sec-kicker">Basic Concepts</div>
              <h2 className="ill-sec-title">Health, Disease, <span>Symptoms and Signs</span></h2>
            </div>
          </div>

          <div className="ill-hd-panel">
            <div className="ill-hd-grid">
              <div className="ill-hd-card">
                <div className="ill-hd-label">Well-being</div>
                <h3 className="ill-hd-title">Health</h3>
                <p>Health is a state of physical, mental and social well-being. It includes unity and harmony within the mind, body and soul of an organism.</p>
                <div className="ill-hd-mark">+</div>
              </div>
              <div className="ill-hd-card">
                <div className="ill-hd-label">Discomfort and distress</div>
                <h3 className="ill-hd-title">Disease</h3>
                <p>Disease is any condition that can lead to discomfort, distress, health problems and even death of the affected person.</p>
                <div className="ill-hd-mark">!</div>
              </div>
            </div>
            <div className="ill-sign-row" style={{ padding: "0 30px 30px" }}>
              <div className="ill-sign-mini"><strong>Symptoms</strong><span>Indications felt only by the patient, such as headache, stomach pain and nausea.</span></div>
              <div className="ill-sign-mini"><strong>Signs</strong><span>Indications observed by a physician, such as fever, vomiting and diarrhoea.</span></div>
            </div>
          </div>

          <div className="ill-mini-note"><strong>Incubation period:</strong> The time interval between infection and the appearance of symptoms.</div>
        </section>

        <div className="ill-divider"><div className="ill-divider-mark" /></div>

        <section className="ill-sec">
          <div className="ill-sec-head">
            <div className="ill-sec-num">02</div>
            <div className="ill-sec-title-wrap">
              <div className="ill-sec-kicker">Root Causes</div>
              <h2 className="ill-sec-title">Causes of <span>Diseases</span></h2>
            </div>
          </div>

          <div className="ill-cause-wrap">
            <div className="ill-cause-card">
              <div className="ill-cause-head">
                <h3>Contributory Causes</h3>
                <p>These conditions support the development or spread of diseases.</p>
              </div>
              <div className="ill-cause-list">
                <div className="ill-cause-item"><div className="ill-cause-num">1</div><span>Unhealthy conditions</span></div>
                <div className="ill-cause-item"><div className="ill-cause-num">2</div><span>Improper public services</span></div>
                <div className="ill-cause-item"><div className="ill-cause-num">3</div><span>Poverty and poor living conditions</span></div>
              </div>
            </div>
            <div className="ill-cause-card immediate">
              <div className="ill-cause-head">
                <h3>Immediate Causes</h3>
                <p>These are direct external causes, often infectious agents.</p>
              </div>
              <div className="ill-cause-list">
                <div className="ill-cause-item"><div className="ill-cause-num">1</div><span>Microorganisms such as viruses and bacteria</span></div>
                <div className="ill-cause-item"><div className="ill-cause-num">2</div><span>Other disease-causing organisms entering the body</span></div>
                <div className="ill-cause-item"><div className="ill-cause-num">3</div><span>External causes that disturb normal body functioning</span></div>
              </div>
            </div>
          </div>
        </section>

        <div className="ill-divider"><div className="ill-divider-mark" /></div>

        <section className="ill-sec">
          <div className="ill-sec-head">
            <div className="ill-sec-num">03</div>
            <div className="ill-sec-title-wrap">
              <div className="ill-sec-kicker">Duration Based</div>
              <h2 className="ill-sec-title">Acute and <span>Chronic</span> Diseases</h2>
            </div>
          </div>

          <div className="ill-duration-panel">
            <div className="ill-duration-grid">
              <div className="ill-duration-card">
                <div className="ill-duration-badge">Short duration</div>
                <h3>Acute Disease</h3>
                <p>Acute diseases last for a short period of time and usually show symptoms quickly.</p>
                <div className="ill-duration-examples"><span className="ill-duration-chip">Cold</span><span className="ill-duration-chip">Cough</span><span className="ill-duration-chip">Influenza</span></div>
              </div>
              <div className="ill-duration-card">
                <div className="ill-duration-badge">Long duration</div>
                <h3>Chronic Disease</h3>
                <p>Chronic diseases last for long periods and may affect the body for months or years.</p>
                <div className="ill-duration-examples"><span className="ill-duration-chip">Diabetes</span><span className="ill-duration-chip">Kidney stones</span></div>
              </div>
            </div>
          </div>
        </section>

        <div className="ill-divider"><div className="ill-divider-mark" /></div>

        <section className="ill-sec">
          <div className="ill-sec-head">
            <div className="ill-sec-num">04</div>
            <div className="ill-sec-title-wrap">
              <div className="ill-sec-kicker">Spread Based</div>
              <h2 className="ill-sec-title">Infectious and <span>Non-infectious</span> Diseases</h2>
            </div>
          </div>

          <div className="ill-type-grid">
            <div className="ill-type-card">
              <div className="ill-type-icon">I</div>
              <h3>Infectious / Communicable</h3>
              <p>Diseases caused by infectious agents such as bacteria, viruses, protozoans and fungi. They can spread from an infected person to a healthy person.</p>
              <div className="ill-type-example">Examples: influenza, common cold, dengue, cholera, typhoid.</div>
            </div>
            <div className="ill-type-card non">
              <div className="ill-type-icon">N</div>
              <h3>Non-infectious / Non-communicable</h3>
              <p>Diseases caused by internal causes such as excessive weight, genetic defects, nutrient deficiency, organ malfunction or bad habits.</p>
              <div className="ill-type-example">Examples: high blood pressure, cancer, diabetes, deficiency diseases.</div>
            </div>
          </div>
        </section>

        <div className="ill-divider"><div className="ill-divider-mark" /></div>

        <section className="ill-sec">
          <div className="ill-sec-head">
            <div className="ill-sec-num">05</div>
            <div className="ill-sec-title-wrap">
              <div className="ill-sec-kicker">Infectious Agents</div>
              <h2 className="ill-sec-title">Microbes that <span>Cause Diseases</span></h2>
            </div>
          </div>

          <div className="ill-agent-grid">
            <div className="ill-agent-card">
              <div className="ill-agent-orb" />
              <h3>Viruses</h3>
              <p>Tiny organisms that grow, multiply or reproduce only inside host cells.</p>
              <div className="ill-agent-ex">Influenza, cold, dengue, AIDS, SARS</div>
            </div>
            <div className="ill-agent-card">
              <div className="ill-agent-orb" />
              <h3>Bacteria</h3>
              <p>Unicellular organisms, larger than viruses. Some are harmful while some are beneficial.</p>
              <div className="ill-agent-ex">Typhoid, cholera, whooping cough, anthrax</div>
            </div>
            <div className="ill-agent-card">
              <div className="ill-agent-orb" />
              <h3>Fungi</h3>
              <p>Plant-like, eukaryotic, heterotrophic organisms.</p>
              <div className="ill-agent-ex">Athlete’s foot, candidiasis, ringworms</div>
            </div>
            <div className="ill-agent-card">
              <div className="ill-agent-orb" />
              <h3>Protozoa</h3>
              <p>Simple, primitive unicellular organisms often found in water.</p>
              <div className="ill-agent-ex">Amoebiasis, kala azar, malaria</div>
            </div>
            <div className="ill-agent-card">
              <div className="ill-agent-orb" />
              <h3>Worms</h3>
              <p>Multicellular parasites that may infect intestines of humans and animals.</p>
              <div className="ill-agent-ex">Diarrhoea, anaemia, liver rot</div>
            </div>
          </div>
        </section>

        <div className="ill-divider"><div className="ill-divider-mark" /></div>

        <section className="ill-sec">
          <div className="ill-sec-head">
            <div className="ill-sec-num">06</div>
            <div className="ill-sec-title-wrap">
              <div className="ill-sec-kicker">Important Examples</div>
              <h2 className="ill-sec-title">Diseases, Pathogens and <span>Key Facts</span></h2>
            </div>
          </div>

          <div className="ill-disease-table-wrap">
            <table className="ill-disease-table">
              <thead>
                <tr><th>Category</th><th>Disease</th><th>Pathogen / Agent</th><th>Important Point</th></tr>
              </thead>
              <tbody>
                <tr><td>Bacterial</td><td>Typhoid fever</td><td>Salmonella typhi</td><td>Widal test is used for confirmation.</td></tr>
                <tr><td>Bacterial</td><td>Pneumonia</td><td>Streptococcus pneumoniae and Haemophilus influenzae</td><td>It infects the alveoli of lungs.</td></tr>
                <tr><td>Viral</td><td>Common cold</td><td>Rhino viruses</td><td>A common infectious viral disease.</td></tr>
                <tr><td>Protozoan</td><td>Malaria</td><td>Plasmodium</td><td>Requires two hosts: humans and female Anopheles mosquito.</td></tr>
                <tr><td>Protozoan</td><td>Amoebiasis</td><td>Entamoeba histolytica</td><td>Also called amoebic dysentery.</td></tr>
                <tr><td>Helminthes</td><td>Ascariasis</td><td>Ascaris</td><td>A worm-related disease.</td></tr>
                <tr><td>Helminthes</td><td>Elephantiasis / Filariasis</td><td>Wuchereria bancrofti</td><td>A parasitic worm disease.</td></tr>
                <tr><td>Helminthes</td><td>Taeniasis</td><td>Taenia solium or Taenia saginata</td><td>Caused by tapeworm species.</td></tr>
                <tr><td>Fungal</td><td>Ringworms</td><td>Microsporum, Trichophyton and Epidermophyton</td><td>Common fungal skin infection.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="ill-divider"><div className="ill-divider-mark" /></div>

        <section className="ill-sec">
          <div className="ill-sec-head">
            <div className="ill-sec-num">07</div>
            <div className="ill-sec-title-wrap">
              <div className="ill-sec-kicker">Mode of Transmission</div>
              <h2 className="ill-sec-title">How Communicable Diseases <span>Spread</span></h2>
            </div>
          </div>

          <div className="ill-transmission-grid">
            <div className="ill-trans-card"><div className="ill-trans-icon">💨</div><h3>Air-borne</h3><p>Spread through coughing, sneezing, talking and droplets in air.</p><span>Cold, chicken pox, small pox, pneumonia, influenza, tuberculosis</span></div>
            <div className="ill-trans-card"><div className="ill-trans-icon">💧</div><h3>Water-borne</h3><p>Spread when excretions from infected persons mix with drinking water.</p><span>Cholera, typhoid, hepatitis A</span></div>
            <div className="ill-trans-card"><div className="ill-trans-icon">🍽</div><h3>Food-borne</h3><p>Caused by consuming food infected by disease-causing microbes.</p><span>Botulism, stomach infections</span></div>
            <div className="ill-trans-card"><div className="ill-trans-icon">🤝</div><h3>Contact</h3><p>Spread by contact with a diseased person or articles used by them.</p><span>Swine flu, ringworm, conjunctivitis</span></div>
            <div className="ill-trans-card"><div className="ill-trans-icon">🦟</div><h3>Vectors</h3><p>Animals that transfer microorganisms from infected persons to others.</p><span>Female mosquito transfers malaria-causing Plasmodium</span></div>
          </div>

          <div className="ill-mini-note"><strong>Other transmission routes:</strong> Physical contact may include sexually transmitted diseases such as syphilis, gonorrhoea and AIDS. Blood-to-blood contact can occur through blood transfusion or during pregnancy between mother and baby.</div>
        </section>

        <div className="ill-divider"><div className="ill-divider-mark" /></div>

        <section className="ill-sec">
          <div className="ill-sec-head">
            <div className="ill-sec-num">08</div>
            <div className="ill-sec-title-wrap">
              <div className="ill-sec-kicker">Nutrition and Deficiency</div>
              <h2 className="ill-sec-title">Non-communicable Diseases and <span>Malnutrition</span></h2>
            </div>
          </div>

          <div className="ill-deficiency-panel">
            <div className="ill-deficiency-top">
              <h3>Deficiency diseases occur due to lack of nutrients.</h3>
              <p>Non-communicable diseases can be caused by nutrient deficiency, malfunctioning of body organs, degenerative diseases and bad habits such as drug abuse.</p>
            </div>
            <div className="ill-malnutrition-row">
              <div className="ill-mal-card"><strong>Carbohydrate + Protein deficiency</strong><span>Leads to marasmus. Body becomes lean and thin, ribs become prominent and the child may suffer from mental retardation.</span></div>
              <div className="ill-mal-card"><strong>Protein deficiency</strong><span>Leads to Kwashiorkor. Belly protrudes, eyes bulge and legs become stick thin.</span></div>
            </div>
            <div className="ill-deficiency-grid">
              <div className="ill-def-block">
                <h4>Vitamin Deficiency</h4>
                <table className="ill-def-table">
                  <thead><tr><th>Deficiency of</th><th>Leads to</th></tr></thead>
                  <tbody>
                    <tr><td>Vitamin A</td><td>Night blindness</td></tr>
                    <tr><td>Vitamin B</td><td>Beri-beri</td></tr>
                    <tr><td>Vitamin C</td><td>Scurvy</td></tr>
                    <tr><td>Vitamin D</td><td>Rickets</td></tr>
                    <tr><td>Vitamin K</td><td>Haemorrhage</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="ill-def-block">
                <h4>Mineral Deficiency</h4>
                <table className="ill-def-table">
                  <thead><tr><th>Deficiency of</th><th>Leads to</th></tr></thead>
                  <tbody>
                    <tr><td>Iron</td><td>Anaemia</td></tr>
                    <tr><td>Calcium</td><td>Rickets</td></tr>
                    <tr><td>Sodium</td><td>Muscle cramps</td></tr>
                    <tr><td>Phosphorus</td><td>Bad teeth and bones</td></tr>
                    <tr><td>Iodine</td><td>Goitre</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <div className="ill-divider"><div className="ill-divider-mark" /></div>

        <section className="ill-sec">
          <div className="ill-sec-head">
            <div className="ill-sec-num">09</div>
            <div className="ill-sec-title-wrap">
              <div className="ill-sec-kicker">Body Response</div>
              <h2 className="ill-sec-title">Effects of Diseases and <span>Defence Mechanisms</span></h2>
            </div>
          </div>

          <div className="ill-effect-grid">
            <div className="ill-effect-card local"><h3>Local Effects</h3><p>Effects such as swelling, pain and joint stiffness occur only at the site of infection.</p></div>
            <div className="ill-effect-card general"><h3>General Effects</h3><p>Effects such as fever, chills, headache, fatigue and loss of appetite occur all over the body.</p></div>
            <div className="ill-effect-card inflammation"><h3>Inflammation</h3><p>Inflammation is the process by which the immune system responds to protect the body from infection.</p></div>
          </div>

          <div className="ill-immune-card">
            <div className="ill-immune-grid">
              <div>
                <h3 className="ill-immune-title">Specific Defence Mechanism</h3>
                <p className="ill-immune-text">Our body resists microbes through general and specific mechanisms. Specific defence targets particular pathogens and antigens.</p>
              </div>
              <div className="ill-immune-list">
                <div className="ill-immune-item">White blood cells help defend the body.</div>
                <div className="ill-immune-item">Monocytes mature into macrophages, which engulf invading pathogens.</div>
                <div className="ill-immune-item">Lymphocytes generate antibodies against antigens.</div>
                <div className="ill-immune-item">Specific antibodies prevent pathogen entry into cells or kill pathogens.</div>
                <div className="ill-immune-item">Ordinary substances like pollen, dust, fruits or vegetables may act as antigens and cause allergies.</div>
              </div>
            </div>
          </div>
        </section>

        <div className="ill-divider"><div className="ill-divider-mark" /></div>

        <section className="ill-sec">
          <div className="ill-sec-head">
            <div className="ill-sec-num">10</div>
            <div className="ill-sec-title-wrap">
              <div className="ill-sec-kicker">Control and Care</div>
              <h2 className="ill-sec-title">Treatment and <span>Prevention</span></h2>
            </div>
          </div>

          <div className="ill-treatment-flow">
            <div className="ill-treatment-top">
              <h3>Treatment works in two main ways.</h3>
              <p>Diseases may be treated by reducing their effects or by killing the actual cause of the disease.</p>
            </div>
            <div className="ill-treatment-steps">
              <div className="ill-treatment-step"><h4>Reducing the effect</h4><p>This approach reduces discomfort, fever, pain or other effects produced by the disease.</p></div>
              <div className="ill-treatment-step"><h4>Killing the cause</h4><p>This approach targets the disease-causing agent responsible for illness.</p></div>
            </div>
          </div>

          <div className="ill-prevention-grid">
            <div className="ill-prevention-card">
              <h3>General Ways</h3>
              <div className="ill-prevention-list">
                <div className="ill-prevention-item"><div className="ill-check">✓</div><div>Stay away from the diseased person.</div></div>
                <div className="ill-prevention-item"><div className="ill-check">✓</div><div>Ensure safe drinking water supply.</div></div>
                <div className="ill-prevention-item"><div className="ill-check">✓</div><div>Maintain a clean environment to prevent vectors like mosquitoes from breeding.</div></div>
                <div className="ill-prevention-item"><div className="ill-check">✓</div><div>Cover your mouth and nose while coughing or sneezing.</div></div>
                <div className="ill-prevention-item"><div className="ill-check">✓</div><div>Ensure proper nutrition so the immune system functions properly.</div></div>
              </div>
            </div>
            <div className="ill-prevention-card specific">
              <h3>Specific Ways</h3>
              <div className="ill-prevention-list">
                <div className="ill-prevention-item"><div className="ill-check">✓</div><div><strong>Vaccination:</strong> Protection by administering agents that mimic microbes.</div></div>
                <div className="ill-prevention-item"><div className="ill-check">✓</div><div>Vaccines are available against tetanus, polio, measles, hepatitis B, whooping cough and yellow fever.</div></div>
                <div className="ill-prevention-item"><div className="ill-check">✓</div><div>Vaccines can be prepared from dead germs, weakened germs, virulent germs or toxoids.</div></div>
                <div className="ill-prevention-item"><div className="ill-check">✓</div><div><strong>Immunization:</strong> Strengthening the immune system to fight microbes.</div></div>
              </div>
            </div>
          </div>

          <div className="ill-hygiene-strip">
            <div className="ill-hygiene-box"><h3>Personal Hygiene</h3><p>Includes cleanliness of the body, drinking clean water and maintaining habits that reduce infection risk.</p></div>
            <div className="ill-hygiene-box"><h3>Public Hygiene</h3><p>Includes cleaning water reservoirs, proper disposal of sewage and maintaining public cleanliness.</p></div>
          </div>
        </section>

        <section className="ill-faq-wrap">
          <h2 className="ill-faq-title">Quick <span>FAQ Revision</span></h2>
          <div className="ill-faq-list">
            {faqData.map((item, index) => (
              <div className="ill-faq-item" key={item.q}>
                <button
                  className="ill-faq-q"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  aria-expanded={openFaq === index}
                >
                  <span>{item.q}</span>
                  <span className="ill-faq-icon">{openFaq === index ? "▴" : "▾"}</span>
                </button>
                {openFaq === index && <div className="ill-faq-a">{item.a}</div>}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
