import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #0f1a10;
    --ink2:       #1c2e1e;
    --muted:      #4a6050;
    --paper:      #f3faf3;
    --paper2:     #e2f3e3;
    --accent:     #1a6b3c;
    --accent2:    #145530;
    --accent-lt:  #d1fae5;
    --amber:      #b45309;
    --amber-lt:   #fef3c7;
    --blue:       #1e40af;
    --blue-lt:    #dbeafe;
    --teal:       #0f766e;
    --teal-lt:    #ccfbf1;
    --purple:     #6d28d9;
    --purple-lt:  #ede9fe;
    --rose:       #be123c;
    --rose-lt:    #ffe4e6;
    --coral:      #c2410c;
    --coral-lt:   #ffedd5;
    --sky:        #0369a1;
    --sky-lt:     #e0f2fe;
    --rule:       #6ee7b7;
    --white:      #ffffff;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .div-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  .div-hero {
    background: linear-gradient(135deg, #020a03 0%, #061406 50%, #081c09 100%);
    min-height: 88vh; display: flex; align-items: flex-end;
    position: relative; overflow: hidden; padding: 0 0 64px;
  }
  @media (max-width: 700px) { .div-hero { min-height: auto; align-items: flex-start; padding: 72px 0 48px; } }
  .div-hero::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px; background: linear-gradient(90deg, #1a6b3c 0%, #0f766e 22%, #1e40af 44%, #6d28d9 64%, #be123c 82%, #b45309 100%); }
  .div-hero-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(26,107,60,0.18) 1px, transparent 1px); background-size: 28px 28px; pointer-events: none; }
  .div-hero-tree { position: absolute; top: 50%; right: 5%; transform: translateY(-50%); width: clamp(130px,20vw,260px); height: clamp(150px,24vw,300px); pointer-events: none; }
  .div-hero-tree::before { content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 3px; height: 60%; background: rgba(26,107,60,0.2); border-radius: 2px; }
  .div-hero-tree::after  { content: ''; position: absolute; top: 10%; left: 50%; transform: translateX(-50%); width: clamp(80px,14vw,170px); height: clamp(80px,14vw,170px); background: rgba(26,107,60,0.07); border-radius: 50% 50% 45% 45%; }
  .div-glow-a { position: absolute; top: 15%; left: 5%; width: 280px; height: 280px; border-radius: 50%; background: radial-gradient(circle, rgba(26,107,60,0.18) 0%, transparent 68%); pointer-events: none; }
  .div-glow-b { position: absolute; bottom: 8%; right: 20%; width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, rgba(15,118,110,0.1) 0%, transparent 70%); pointer-events: none; }
  .div-hero-bg-num { position: absolute; bottom: -80px; right: -20px; font-family: 'Montserrat', sans-serif; font-size: clamp(200px,34vw,480px); font-weight: 900; line-height: 1; color: rgba(255,255,255,0.018); letter-spacing: -0.04em; user-select: none; pointer-events: none; }
  .div-hero-inner { max-width: 900px; width: 100%; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
  .div-overline { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #6ee7b7; margin-bottom: 24px; display: flex; align-items: center; gap: 14px; }
  .div-overline::before, .div-overline::after { content: ''; flex: 0 0 40px; height: 1px; background: #6ee7b7; }
  .div-hero-title { font-family: 'Montserrat', sans-serif; font-size: clamp(32px,7vw,74px); font-weight: 900; color: #fff; line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 32px; }
  .div-hero-title em { font-style: normal; color: #6ee7b7; }
  .div-hero-bar { display: flex; flex-wrap: wrap; gap: 0; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; margin-top: 8px; }
  .div-hero-bar-item { flex: 1 1 150px; padding: 0 24px 0 0; border-right: 1px solid rgba(255,255,255,0.08); margin-right: 24px; }
  .div-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .div-bar-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 5px; }
  .div-bar-value { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.72); }
  @media (max-width: 700px) {
    .div-hero-bar { gap: 12px; } .div-hero-bar-item { flex: 1 1 120px; padding: 0 14px 0 0; margin-right: 14px; }
    .div-bar-label { font-size: 9px; } .div-bar-value { font-size: 13px; }
    .div-overline { font-size: 10px; } .div-hero-title { font-size: clamp(34px,10vw,54px); margin-bottom: 24px; }
    .div-hero-inner { padding: 0 18px; }
  }

  .div-body { max-width: 880px; margin: 0 auto; padding: 72px 32px 100px; }
  @media (max-width: 700px) { .div-body { padding: 48px 18px 72px; } }

  .div-intro { background: linear-gradient(135deg, #020a03, #081c09); border-left: 5px solid #1a6b3c; border-radius: 4px; padding: 36px 40px; margin-bottom: 72px; position: relative; overflow: hidden; }
  .div-intro::after { content: '🌿'; position: absolute; right: 28px; top: 50%; transform: translateY(-50%); font-size: 88px; opacity: 0.08; }
  .div-intro p { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 500; color: rgba(255,255,255,0.86); line-height: 1.8; margin: 0 0 14px; }
  .div-intro p:last-child { margin: 0; }
  .div-intro strong { color: #6ee7b7; }
  @media (max-width: 700px) { .div-intro { padding: 24px 20px; } .div-intro p { font-size: 15px; } }

  .div-sec { margin-bottom: 52px; }
  .div-sec-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--accent-lt); color: var(--accent2); font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; padding: 5px 14px; border-radius: 100px; margin-bottom: 14px; }
  .div-bdot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }
  .div-sec-title { font-family: 'Montserrat', sans-serif; font-size: clamp(22px,4vw,32px); font-weight: 900; color: var(--ink); letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 6px; }
  .div-sec-title span { color: var(--accent); }
  .div-sec-rule { width: 48px; height: 4px; border-radius: 2px; background: linear-gradient(90deg, var(--accent), #34d399); margin-bottom: 24px; }
  .div-body-text { font-family: 'Inter', sans-serif; font-size: 15.5px; color: var(--ink2); line-height: 1.85; margin-bottom: 24px; }
  .div-body-text strong { color: var(--accent2); font-weight: 600; }

  .div-divider { margin: 52px 0; display: flex; align-items: center; gap: 14px; }
  .div-divider::before, .div-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .div-divider-mark { font-size: 16px; flex-shrink: 0; line-height: 1; }

  .div-scroll-hint { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 600; color: var(--muted); margin-bottom: 8px; }
  .div-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; margin-bottom: 28px; border-radius: 10px; border: 1.5px solid var(--rule); }
  .div-table-wrap::-webkit-scrollbar { height: 5px; }
  .div-table-wrap::-webkit-scrollbar-track { background: var(--paper2); }
  .div-table-wrap::-webkit-scrollbar-thumb { background: var(--rule); border-radius: 3px; }
  .div-table { width: 100%; border-collapse: collapse; }
  .div-table th { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 13px 16px; color: #fff; text-align: left; white-space: nowrap; }
  .div-table td { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2); padding: 10px 16px; border-top: 1px solid var(--rule); border-right: 1px solid var(--rule); line-height: 1.55; }
  .div-table td:first-child { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--accent2); white-space: nowrap; }
  .div-table td:last-child { border-right: none; }
  .div-table tr:nth-child(even) td { background: var(--paper2); }

  .div-hierarchy-flow { background: linear-gradient(135deg, #020a03, #081c09); border-radius: 10px; padding: 26px 28px; margin-bottom: 24px; position: relative; overflow: hidden; }
  .div-hierarchy-flow::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(110,231,183,0.07) 1px, transparent 1px); background-size: 22px 22px; pointer-events: none; }
  .div-hf-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(110,231,183,0.6); margin-bottom: 16px; position: relative; }
  .div-hf-track { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; position: relative; }
  .div-hf-node { background: rgba(255,255,255,0.07); border: 1px solid rgba(110,231,183,0.2); border-radius: 6px; padding: 8px 14px; font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: #6ee7b7; white-space: nowrap; }
  .div-hf-arrow { font-size: 16px; color: rgba(110,231,183,0.5); flex-shrink: 0; }
  .div-hf-note { margin-top: 14px; font-family: 'Inter', sans-serif; font-size: 12.5px; color: rgba(255,255,255,0.5); line-height: 1.6; position: relative; }
  .div-hf-note strong { color: rgba(110,231,183,0.8); font-weight: 600; }
  @media (max-width: 700px) { .div-hierarchy-flow { padding: 18px 16px; } }

  .div-linnaeus-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 28px; }
  @media (max-width: 560px) { .div-linnaeus-pair { grid-template-columns: 1fr; } }
  .div-linn-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 8px; padding: 18px 20px; }
  .div-linn-card.div-lc1 { border-top: 4px solid var(--accent); }
  .div-linn-card.div-lc2 { border-top: 4px solid var(--amber); }
  .div-linn-title { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; margin-bottom: 8px; }
  .div-linn-card.div-lc1 .div-linn-title { color: var(--accent); }
  .div-linn-card.div-lc2 .div-linn-title { color: var(--amber); }
  .div-linn-text { font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.72; }
  .div-linn-text strong { font-weight: 600; color: var(--ink); }

  .div-kingdom-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; margin-bottom: 28px; }
  @media (max-width: 580px) { .div-kingdom-grid { grid-template-columns: 1fr; } }
  .div-kingdom-grid .div-k-card.div-k-animalia { grid-column: 1 / -1; }
  .div-k-card { border-radius: 10px; overflow: hidden; border: 1.5px solid var(--rule); background: var(--white); }
  .div-k-card.div-k-monera   .div-k-hdr { background: linear-gradient(135deg, #0f1a10, #1a6b3c); }
  .div-k-card.div-k-protist  .div-k-hdr { background: linear-gradient(135deg, #001e40, #1e40af); }
  .div-k-card.div-k-fungi    .div-k-hdr { background: linear-gradient(135deg, #1a0a00, #b45309); }
  .div-k-card.div-k-plantae  .div-k-hdr { background: linear-gradient(135deg, #001a10, #0f766e); }
  .div-k-card.div-k-animalia .div-k-hdr { background: linear-gradient(135deg, #1a0010, #be123c); }
  .div-k-card.div-k-monera   .div-k-dot { background: #1a6b3c; }
  .div-k-card.div-k-protist  .div-k-dot { background: #1e40af; }
  .div-k-card.div-k-fungi    .div-k-dot { background: #b45309; }
  .div-k-card.div-k-plantae  .div-k-dot { background: #0f766e; }
  .div-k-card.div-k-animalia .div-k-dot { background: #be123c; }
  .div-k-hdr  { padding: 14px 18px; display: flex; align-items: center; gap: 12px; }
  .div-k-icon { font-size: 26px; flex-shrink: 0; }
  .div-k-tag  { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 2px; }
  .div-k-name { font-family: 'Montserrat', sans-serif; font-size: 17px; font-weight: 900; color: #fff; }
  .div-k-body { padding: 14px 18px; background: var(--white); }
  .div-k-row  { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2); line-height: 1.65; padding: 5px 0; border-bottom: 1px solid var(--rule); display: flex; gap: 8px; }
  .div-k-row:last-child { border-bottom: none; }
  .div-k-dot  { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
  .div-k-row strong { font-weight: 600; color: var(--ink); }

  .div-plant-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
  .div-pd-item { display: grid; grid-template-columns: 200px 1fr; border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; background: var(--white); }
  @media (max-width: 580px) { .div-pd-item { grid-template-columns: 1fr; } }
  .div-pd-label { padding: 18px 16px; display: flex; flex-direction: column; justify-content: center; gap: 4px; }
  .div-pd-item.div-thallo  .div-pd-label { background: linear-gradient(160deg, #0a1a00, #3f6212); }
  .div-pd-item.div-bryo    .div-pd-label { background: linear-gradient(160deg, #001a10, #166534); }
  .div-pd-item.div-pterido .div-pd-label { background: linear-gradient(160deg, #001e40, #1e40af); }
  .div-pd-item.div-gymno   .div-pd-label { background: linear-gradient(160deg, #1a0a00, #b45309); }
  .div-pd-item.div-angio   .div-pd-label { background: linear-gradient(160deg, #1a0010, #be123c); }
  .div-pd-num  { font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900; color: rgba(255,255,255,0.15); line-height: 1; }
  .div-pd-name { font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 900; color: #fff; line-height: 1.2; }
  .div-pd-nick { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.5); margin-top: 2px; }
  .div-pd-body { padding: 16px 18px; background: var(--white); border-left: 1px solid var(--rule); }
  @media (max-width: 580px) { .div-pd-body { border-left: none; border-top: 1px solid var(--rule); } }
  .div-pd-eg   { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; color: var(--accent2); background: var(--accent-lt); padding: 3px 10px; border-radius: 100px; display: inline-block; margin-bottom: 10px; }
  .div-pd-feat { display: flex; flex-direction: column; gap: 4px; }
  .div-pd-point { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2); line-height: 1.6; display: flex; gap: 8px; }
  .div-pd-arrow { color: var(--accent); font-weight: 700; flex-shrink: 0; }

  .div-mono-di { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 24px; }
  @media (max-width: 480px) { .div-mono-di { grid-template-columns: 1fr; } }
  .div-md-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 8px; padding: 14px 16px; }
  .div-md-card.div-mono { border-left: 4px solid var(--teal); }
  .div-md-card.div-di   { border-left: 4px solid var(--rose); }
  .div-md-title { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; margin-bottom: 5px; }
  .div-md-card.div-mono .div-md-title { color: var(--teal); }
  .div-md-card.div-di   .div-md-title { color: var(--rose); }
  .div-md-text { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2); line-height: 1.65; }
  .div-md-text strong { font-weight: 600; color: var(--ink); }

  .div-phyla-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; margin-bottom: 28px; }
  @media (max-width: 580px) { .div-phyla-grid { grid-template-columns: 1fr; } }
  .div-phy-card { border-radius: 10px; overflow: hidden; border: 1.5px solid var(--rule); background: var(--white); }
  .div-phy-card.div-porif  .div-phy-hdr { background: linear-gradient(135deg, #0a1a00, #3f6212); }
  .div-phy-card.div-coel   .div-phy-hdr { background: linear-gradient(135deg, #001a10, #0f766e); }
  .div-phy-card.div-platy  .div-phy-hdr { background: linear-gradient(135deg, #001e40, #1e40af); }
  .div-phy-card.div-nemat  .div-phy-hdr { background: linear-gradient(135deg, #1a0040, #6d28d9); }
  .div-phy-card.div-anneli .div-phy-hdr { background: linear-gradient(135deg, #1a0a00, #c2410c); }
  .div-phy-card.div-arthro .div-phy-hdr { background: linear-gradient(135deg, #1a0010, #be123c); }
  .div-phy-card.div-mollus .div-phy-hdr { background: linear-gradient(135deg, #0f1a10, #b45309); }
  .div-phy-card.div-echino .div-phy-hdr { background: linear-gradient(135deg, #001a10, #0369a1); }
  .div-phy-card.div-porif  .div-phy-dot { background: #3f6212; }
  .div-phy-card.div-coel   .div-phy-dot { background: #0f766e; }
  .div-phy-card.div-platy  .div-phy-dot { background: #1e40af; }
  .div-phy-card.div-nemat  .div-phy-dot { background: #6d28d9; }
  .div-phy-card.div-anneli .div-phy-dot { background: #c2410c; }
  .div-phy-card.div-arthro .div-phy-dot { background: #be123c; }
  .div-phy-card.div-mollus .div-phy-dot { background: #b45309; }
  .div-phy-card.div-echino .div-phy-dot { background: #0369a1; }
  .div-phy-hdr  { padding: 14px 16px; display: flex; align-items: center; gap: 10px; }
  .div-phy-icon { font-size: 22px; flex-shrink: 0; }
  .div-phy-tag  { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 2px; }
  .div-phy-name { font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 900; color: #fff; }
  .div-phy-body { padding: 13px 16px; background: var(--white); }
  .div-phy-eg   { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; color: var(--accent2); background: var(--accent-lt); padding: 2px 9px; border-radius: 100px; display: inline-block; margin-bottom: 9px; }
  .div-phy-row  { font-family: 'Inter', sans-serif; font-size: 12.5px; color: var(--ink2); line-height: 1.6; padding: 4px 0; border-bottom: 1px solid var(--rule); display: flex; gap: 7px; }
  .div-phy-row:last-child { border-bottom: none; }
  .div-phy-dot  { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; margin-top: 7px; }
  .div-phy-row strong { font-weight: 600; color: var(--ink); }

  .div-quote { border-left: 5px solid var(--accent); background: var(--accent-lt); padding: 20px 28px; margin: 32px 0; border-radius: 0 8px 8px 0; }
  .div-quote p { font-family: 'Poppins', sans-serif; font-size: 15.5px; font-weight: 600; color: var(--accent2); line-height: 1.7; font-style: italic; margin: 0; }

  .div-faq-label   { display: inline-flex; align-items: center; gap: 8px; background: var(--accent-lt); color: var(--accent2); font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; padding: 5px 14px; border-radius: 100px; margin-bottom: 14px; }
  .div-faq-heading { font-family: 'Montserrat', sans-serif; font-size: clamp(24px,4vw,34px); font-weight: 900; color: var(--ink); letter-spacing: -0.02em; margin-bottom: 6px; }
  .div-faq-rule    { width: 48px; height: 4px; border-radius: 2px; background: linear-gradient(90deg, var(--accent), #34d399); margin-bottom: 28px; }
  .div-faq-item    { border: 1.5px solid var(--rule); border-radius: 8px; margin-bottom: 10px; overflow: hidden; background: var(--white); transition: border-color 0.2s, box-shadow 0.2s; }
  .div-faq-item.open { border-color: var(--accent); box-shadow: 0 2px 12px rgba(26,107,60,0.12); }
  .div-faq-q       { width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 18px 22px; text-align: left; gap: 16px; }
  .div-faq-q-text  { font-family: 'Poppins', sans-serif; font-size: 14.5px; font-weight: 600; color: var(--ink); line-height: 1.5; }
  .div-faq-item.open .div-faq-q-text { color: var(--accent); }
  .div-faq-icon    { font-size: 20px; color: var(--accent); flex-shrink: 0; line-height: 1; }
  .div-faq-ans     { font-family: 'Inter', sans-serif; font-size: 14.5px; color: var(--ink2); line-height: 1.85; padding: 0 22px; max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; }
  .div-faq-ans.visible { max-height: 1200px; padding: 0 22px 20px; }
  .div-faq-ans strong { color: var(--accent2); font-weight: 600; }
  @media (max-width: 700px) { .div-faq-q { padding: 16px; } .div-faq-ans.visible { padding: 0 16px 18px; } }
`;

const faqs = [
  { q: "What is classification? Why is it necessary?", a: (<>A <strong>classification</strong> is the identification, naming, and grouping of organisms into a formal system based on similarities in structures or evolutionary history.<br /><br />Why necessary: Makes study of millions of species possible; helps understand <strong>evolutionary relationships</strong>; allows prediction of characteristics of unknown organisms; forms the basis of scientific communication worldwide.</>) },
  { q: "What is the hierarchy of classification? Who developed it?", a: (<><strong>Carolus Linnaeus</strong> developed the hierarchy and wrote <em>Systema Naturae</em>. He also developed <strong>binomial nomenclature</strong>.<br /><br />Hierarchy (descending): <strong>Kingdom → Phylum/Division → Class → Order → Family → Genus → Species</strong><br /><br />Mnemonic: <strong>K</strong>ids <strong>P</strong>refer <strong>C</strong>heese <strong>O</strong>ver <strong>F</strong>ried <strong>G</strong>reen <strong>S</strong>pinach. Species is the basic unit.</>) },
  { q: "What are the five kingdoms proposed by Whittaker?", a: (<><strong>R.H. Whittaker</strong> (1969) proposed five kingdoms based on cell structure, cellularity, and mode of nutrition:<br /><br />1. <strong>Monera</strong>: Prokaryotic, unicellular (bacteria, cyanobacteria)<br />2. <strong>Protista</strong>: Eukaryotic, unicellular (Amoeba, Paramecium)<br />3. <strong>Fungi</strong>: Eukaryotic, multicellular, saprophytes, chitin cell wall<br />4. <strong>Plantae</strong>: Eukaryotic, multicellular, autotrophic, cellulose cell wall<br />5. <strong>Animalia</strong>: Eukaryotic, multicellular, heterotrophic, no cell wall</>) },
  { q: "Describe the five divisions of Kingdom Plantae.", a: (<>1. <strong>Thallophyta</strong>: No true root/stem/leaf; reproduce by spores. Examples: Spirogyra, Ulva.<br />2. <strong>Bryophyta</strong> (Amphibians of plant kingdom): No vascular tissue; stem/leaf-like structures; naked spores. Examples: mosses, Riccia.<br />3. <strong>Pteridophyta</strong>: Vascular tissue present; differentiated root/stem/leaf; naked spores. Examples: ferns, Marsilea.<br />4. <strong>Gymnospermae</strong>: Non-flowering; naked seeds; cones; xylem lacks vessels. Examples: Pinus, Cycas.<br />5. <strong>Angiospermae</strong>: Flowering; seeds inside fruits; 4-whorled flowers. Monocots (1 cotyledon) and Dicots (2 cotyledons).</>) },
  { q: "What is the difference between Gymnosperms and Angiosperms?", a: (<><strong>Gymnosperms:</strong> Non-flowering; seeds <strong>naked</strong>, not inside fruits; male and female cones; xylem lacks vessels; phloem lacks companion cells. Examples: Pinus, Cycas.<br /><br /><strong>Angiosperms:</strong> Flowering; seeds <strong>enclosed inside fruits</strong>; 4-whorled flowers (calyx, corolla, androecium, gynoecium); most advanced plant group. Divided into Monocots and Dicots.</>) },
  { q: "What are the major phyla of Non-chordata?", a: (<>1. <strong>Porifera</strong>: Cellular; marine; canal system. (Spongilla)<br />2. <strong>Coelenterata</strong>: Tissue; diploblastic; coelom. (Hydra)<br />3. <strong>Platyhelminthes</strong>: Bilateral; triploblastic; no coelom. (Flatworms)<br />4. <strong>Nematoda</strong>: Bilateral; triploblastic; pseudocoelom. (Ascaris)<br />5. <strong>Annelida</strong>: Bilateral; triploblastic; segmented; true coelom. (Earthworm)<br />6. <strong>Arthropoda</strong>: <strong>Largest phylum</strong>; jointed legs; open circulatory system. (Insects, crabs)<br />7. <strong>Mollusca</strong>: Bilateral; reduced coelom; open circulatory system. (Snails, octopus)<br />8. <strong>Echinodermata</strong>: Spiny skin; marine; calcium carbonate skeleton. (Starfish)</>) },
  { q: "What is the difference between Protochordata and Vertebrata?", a: (<>Both belong to Phylum Chordata and have a notochord.<br /><br /><strong>Protochordata:</strong> Notochord present only at <strong>some life stages</strong>. Examples: Herdmania, Amphioxus.<br /><br /><strong>Vertebrata:</strong> Notochord replaced by a true <strong>vertebral column</strong>. Divided into 5 classes: Pisces, Amphibia, Reptilia, Aves, Mammalia.</>) },
  { q: "Compare the five classes of Vertebrata.", a: (<>1. <strong>Pisces</strong>: Aquatic; scales; 2-chambered heart; cold-blooded; oviparous.<br />2. <strong>Amphibia</strong>: Water + land; no scales; 3-chambered heart; gills/skin/lungs; cold-blooded; oviparous.<br />3. <strong>Reptilia</strong>: Terrestrial; scales; 3-chambered heart (crocodile = 4); lungs; cold-blooded; oviparous.<br />4. <strong>Aves</strong>: Feathers; wings; 4-chambered heart; warm-blooded; oviparous.<br />5. <strong>Mammalia</strong>: Hair; mammary glands; 4-chambered heart; warm-blooded; mostly viviparous (platypus/Echidna = oviparous).</>) },
  { q: "What is the difference between cold-blooded and warm-blooded animals?", a: (<><strong>Cold-blooded (Poikilothermic):</strong> Body temperature changes with environment. Examples: fish, amphibians, reptiles.<br /><br /><strong>Warm-blooded (Homeothermic):</strong> Maintain constant body temperature regardless of surroundings. Examples: birds and mammals.<br /><br />Warm-blooded animals can be active in cold environments; cold-blooded animals become sluggish when it is cold.</>) },
  { q: "What is binomial nomenclature? Give examples.", a: (<><strong>Binomial nomenclature</strong> (Carolus Linnaeus): Each species gets a two-part name — <strong>Genus name</strong> (capitalised) + <strong>species name</strong> (lowercase). Written in italics.<br /><br />Examples: <em>Homo sapiens</em> (human), <em>Rosa indica</em> (Indian rose), <em>Felis domestica</em> (cat), <em>Panthera leo</em> (lion).<br /><br />This universal system gives every organism a unique, internationally recognised scientific name regardless of local language.</>) },
];

export default function DiversityInLivingOrganisms() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const kingdoms = [
    { cls:"div-k-monera",   icon:"🦠", tag:"Prokaryotic · Simplest",    name:"Monera",   rows:["Prokaryotic — no true nucleus or membrane-bound organelles.","All unicellular organisms.",<>Can be autotrophic or heterotrophic.</>,<>Examples: <strong>Bacteria, Cyanobacteria (Blue-green algae)</strong>.</>] },
    { cls:"div-k-protist",  icon:"🔬", tag:"Eukaryotic · Unicellular",   name:"Protista",  rows:["Unicellular, eukaryotic organisms.","Can be autotrophic or heterotrophic.",<>Examples: <strong>Amoeba, Paramecium, Diatoms</strong>.</>] },
    { cls:"div-k-fungi",    icon:"🍄", tag:"Eukaryotic · Saprophytic",   name:"Fungi",     rows:["Multicellular eukaryotic organisms.",<>Always <strong>heterotrophic (saprophytes)</strong> — feed on dead matter.</>,<>Cell wall made of <strong>chitin</strong>.</>,<>Examples: <strong>Yeast, Mushroom, Penicillium, Aspergillus</strong>.</>] },
    { cls:"div-k-plantae",  icon:"🌿", tag:"Eukaryotic · Autotrophic",   name:"Plantae",   rows:["Multicellular eukaryotic organisms.",<>Most contain <strong>chlorophyll</strong> — autotrophic.</>,<>Cell wall made of <strong>cellulose</strong>.</>,"Includes algae, mosses, ferns, and all seed plants."] },
    { cls:"div-k-animalia", icon:"🐾", tag:"Eukaryotic · Heterotrophic", name:"Animalia",  rows:["Multicellular eukaryotic organisms.",<>No cell wall; no chloroplast — <strong>heterotrophic</strong>.</>,<>Most are motile at some stage.</>,<>Includes all animals from sponges to mammals.</>] },
  ];

  const plantDivisions = [
    { cls:"div-thallo",  num:"1", name:"Thallophyta",    nick:"Algae",                       eg:"Spirogyra, Cladophora, Ulva", feats:["Plant body NOT differentiated into roots, stem, or leaves (thallus).","Reproduce by spores formed after fertilisation."] },
    { cls:"div-bryo",    num:"2", name:"Bryophyta",      nick:"Amphibians of Plant Kingdom",  eg:"Mosses, Riccia, Marchantia",  feats:["No specialised vascular tissue (no xylem/phloem).","Body has stem and leaf-like structures.","Naked spores — no seeds."] },
    { cls:"div-pterido", num:"3", name:"Pteridophyta",   nick:"First vascular plants",        eg:"Ferns, Marsilea, Equisetum",  feats:["Specialised vascular tissue (xylem + phloem) present.","Plant body differentiated into roots, stem, and leaves.","Naked spores — no seeds."] },
    { cls:"div-gymno",   num:"4", name:"Gymnospermae",   nick:"Naked seed plants",            eg:"Pinus, Cycas, Cedar, Fir",    feats:["Seed-bearing, non-flowering plants.","Seeds are NAKED — not enclosed inside fruits.","Male and female cones instead of flowers.","Xylem lacks vessels; phloem lacks companion cells."] },
    { cls:"div-angio",   num:"5", name:"Angiospermae",   nick:"Flowering plants",             eg:"All flowering plants",        feats:["Seeds enclosed inside fruits — most advanced plants.","Flowers have 4 whorls: calyx, corolla, androecium, gynoecium.","Two groups: Monocots (1 cotyledon) and Dicots (2 cotyledons)."] },
  ];

  const phyla = [
    { cls:"div-porif",  icon:"🧽", name:"Porifera",        eg:"Spongilla, Euplectella", rows:["Cellular level of organisation.",<><strong>Marine habitat</strong>, mostly.</>,<>Possess a <strong>canal system</strong> for circulating water.</>] },
    { cls:"div-coel",   icon:"🪸", name:"Coelenterata",    eg:"Hydra, Sea anemone",     rows:["Tissue level of organisation.",<><strong>Diploblastic</strong> — two cell layers.</>,<><strong>Coelom</strong> (body cavity) present.</>] },
    { cls:"div-platy",  icon:"🪱", name:"Platyhelminthes", eg:"Flatworms, Liver fluke", rows:["Bilateral symmetry.",<><strong>Triploblastic</strong> — three cell layers.</>,"No true internal body cavity (acoelomate)."] },
    { cls:"div-nemat",  icon:"🔴", name:"Nematoda",        eg:"Ascaris (roundworms)",   rows:["Bilaterally symmetrical; triploblastic.",<><strong>Pseudocoelom</strong> (false body cavity).</>,"Cylindrical, unsegmented body."] },
    { cls:"div-anneli", icon:"🪱", name:"Annelida",        eg:"Earthworm, Leech",       rows:["Bilaterally symmetrical; triploblastic.",<><strong>Segmented body</strong> — true coelom.</>,<>Well-developed closed circulatory system.</>] },
    { cls:"div-arthro", icon:"🦀", name:"Arthropoda",      eg:"Insects, Crabs, Spiders",rows:[<><strong>Largest animal phylum</strong>.</>,<><strong>Jointed legs</strong>; segmented body.</>,<><strong>Open circulatory system</strong>; blood-filled coelom.</>] },
    { cls:"div-mollus", icon:"🐌", name:"Mollusca",        eg:"Snails, Octopus, Pila",  rows:["Bilateral symmetry; little segmentation.","Reduced coelom.",<><strong>Open circulatory system</strong>; kidney-like excretory organ.</>] },
    { cls:"div-echino", icon:"⭐", name:"Echinodermata",   eg:"Starfish, Sea urchin",   rows:[<><strong>Spiny skin</strong> — free-living marine animals.</>,<>Triploblastic; <strong>coelomate</strong>.</>,<>Skeleton made of <strong>calcium carbonate</strong>.</>] },
  ];

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="div-root">
        <div className="div-hero">
          <div className="div-hero-dots" /><div className="div-hero-tree" />
          <div className="div-glow-a" /><div className="div-glow-b" />
          <div className="div-hero-bg-num">7</div>
          <div className="div-hero-inner">
            <div className="div-overline">Class 9 · Science · Chapter 7</div>
            <h1 className="div-hero-title">Diversity in<br /><em>Living Organisms</em></h1>
            <div className="div-hero-bar">
              {[["Subject","Science — Biology"],["Topics","Classification · Kingdoms · Phyla"],["Board","CBSE · NCERT"],["FAQs","10 Questions"]].map(([l,v])=>(
                <div className="div-hero-bar-item" key={l}><div className="div-bar-label">{l}</div><div className="div-bar-value">{v}</div></div>
              ))}
            </div>
          </div>
        </div>

        <div className="div-body">
          <div className="div-intro">
            <p>Earth hosts an estimated <strong>8.7 million species</strong> — from bacteria invisible to the eye to blue whales 30 metres long. To study this diversity, scientists classify life into groups based on shared characteristics.</p>
            <p>This chapter covers the <strong>hierarchy of classification</strong>, the five-kingdom system, plant divisions, and animal phyla — from the simplest sponge to complex vertebrates.</p>
          </div>

          {/* S1 */}
          <div className="div-sec">
            <div className="div-sec-badge"><div className="div-bdot" />Classification System</div>
            <h2 className="div-sec-title">Hierarchy of Classification <span>&amp; Binomial Nomenclature</span></h2>
            <div className="div-sec-rule" />
            <p className="div-body-text">Carolus Linnaeus developed a <strong>seven-level hierarchical system</strong>, moving from the broadest category (Kingdom) to the most specific (Species).</p>
            <div className="div-hierarchy-flow">
              <div className="div-hf-label">⬦ Classification Hierarchy — Descending Order</div>
              <div className="div-hf-track">
                {["Kingdom","Phylum / Division","Class","Order","Family","Genus","Species"].map((n,i,arr)=>(
                  <span key={n} style={{display:"flex",alignItems:"center",gap:"6px"}}>
                    <span className="div-hf-node">{n}</span>
                    {i < arr.length-1 && <span className="div-hf-arrow">→</span>}
                  </span>
                ))}
              </div>
              <div className="div-hf-note"><strong>Mnemonic:</strong> Kids Prefer Cheese Over Fried Green Spinach &nbsp;·&nbsp; <strong>Species</strong> is the basic unit</div>
            </div>
            <div className="div-linnaeus-pair">
              <div className="div-linn-card div-lc1">
                <div className="div-linn-title">Carolus Linnaeus</div>
                <div className="div-linn-text">Developed the hierarchy of classification. Published the famous book <strong><em>Systema Naturae</em></strong>. Also created the binomial nomenclature system used worldwide today.</div>
              </div>
              <div className="div-linn-card div-lc2">
                <div className="div-linn-title">Binomial Nomenclature</div>
                <div className="div-linn-text">Each species gets a two-part name: <strong>Genus</strong> (capitalised) + <strong>species</strong> (lowercase), written in italics. Example: <em>Rosa indica</em>, <em>Homo sapiens</em>.</div>
              </div>
            </div>
          </div>

          <div className="div-divider"><div className="div-divider-mark">🌿</div></div>

          {/* S2 */}
          <div className="div-sec">
            <div className="div-sec-badge"><div className="div-bdot" />R.H. Whittaker · 1969</div>
            <h2 className="div-sec-title">The Five-Kingdom <span>Classification</span></h2>
            <div className="div-sec-rule" />
            <p className="div-body-text">R.H. Whittaker proposed five kingdoms based on <strong>nature of cell</strong>, <strong>cellularity</strong>, and <strong>mode of nutrition</strong>.</p>
            <div className="div-kingdom-grid">
              {kingdoms.map((k,i)=>(
                <div className={`div-k-card ${k.cls}`} key={i}>
                  <div className="div-k-hdr">
                    <span className="div-k-icon">{k.icon}</span>
                    <div><div className="div-k-tag">{k.tag}</div><div className="div-k-name">Kingdom {k.name}</div></div>
                  </div>
                  <div className="div-k-body">
                    {k.rows.map((r,j)=><div className="div-k-row" key={j}><div className="div-k-dot"/><span>{r}</span></div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="div-divider"><div className="div-divider-mark">🌿</div></div>

          {/* S3 */}
          <div className="div-sec">
            <div className="div-sec-badge"><div className="div-bdot" />Kingdom Plantae</div>
            <h2 className="div-sec-title">Five Divisions of <span>Kingdom Plantae</span></h2>
            <div className="div-sec-rule" />
            <p className="div-body-text">Kingdom Plantae is divided into five divisions representing an evolutionary progression from simple undifferentiated algae to advanced flowering plants.</p>
            <div className="div-plant-list">
              {plantDivisions.map((d,i)=>(
                <div className={`div-pd-item ${d.cls}`} key={i}>
                  <div className="div-pd-label">
                    <div className="div-pd-num">{d.num}</div>
                    <div className="div-pd-name">{d.name}</div>
                    <div className="div-pd-nick">{d.nick}</div>
                  </div>
                  <div className="div-pd-body">
                    <span className="div-pd-eg">e.g. {d.eg}</span>
                    <div className="div-pd-feat">
                      {d.feats.map((f,j)=><div className="div-pd-point" key={j}><span className="div-pd-arrow">›</span><span>{f}</span></div>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="div-body-text" style={{marginBottom:"12px"}}>Angiosperms are divided into two major groups:</p>
            <div className="div-mono-di">
              <div className="div-md-card div-mono">
                <div className="div-md-title">🌾 Monocotyledons</div>
                <div className="div-md-text">Seeds with <strong>one cotyledon</strong>. Parallel venation. Fibrous root. Examples: <strong>maize, wheat, rice, grass, onion</strong>.</div>
              </div>
              <div className="div-md-card div-di">
                <div className="div-md-title">🌻 Dicotyledons</div>
                <div className="div-md-text">Seeds with <strong>two cotyledons</strong>. Reticulate venation. Tap root. Examples: <strong>sunflower, gram, mango, rose</strong>.</div>
              </div>
            </div>
          </div>

          <div className="div-divider"><div className="div-divider-mark">🌿</div></div>

          {/* S4 */}
          <div className="div-sec">
            <div className="div-sec-badge"><div className="div-bdot" />Kingdom Animalia — Non-Chordata</div>
            <h2 className="div-sec-title">Eight Phyla of <span>Non-Chordata</span></h2>
            <div className="div-sec-rule" />
            <p className="div-body-text">Animals without a notochord are called <strong>Non-chordates</strong>. They include eight major phyla, from cellular sponges to the highly developed arthropods — the largest animal phylum.</p>
            <div className="div-phyla-grid">
              {phyla.map((p,i)=>(
                <div className={`div-phy-card ${p.cls}`} key={i}>
                  <div className="div-phy-hdr">
                    <span className="div-phy-icon">{p.icon}</span>
                    <div><div className="div-phy-tag">Phylum</div><div className="div-phy-name">{p.name}</div></div>
                  </div>
                  <div className="div-phy-body">
                    <span className="div-phy-eg">e.g. {p.eg}</span>
                    {p.rows.map((r,j)=><div className="div-phy-row" key={j}><div className="div-phy-dot"/><span>{r}</span></div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="div-divider"><div className="div-divider-mark">🌿</div></div>

          {/* S5 */}
          <div className="div-sec">
            <div className="div-sec-badge"><div className="div-bdot" />Kingdom Animalia — Chordata</div>
            <h2 className="div-sec-title">Five Classes of <span>Vertebrata</span></h2>
            <div className="div-sec-rule" />
            <p className="div-body-text">Chordates with a true <strong>vertebral column</strong> are called Vertebrata, divided into five classes representing key steps in vertebrate evolution.</p>
            <div className="div-scroll-hint">← Swipe to see full comparison →</div>
            <div className="div-table-wrap">
              <table className="div-table" style={{minWidth:"700px"}}>
                <thead>
                  <tr>
                    <th style={{background:"#145530"}}>Class</th>
                    <th style={{background:"#0369a1"}}>Habitat</th>
                    <th style={{background:"#1e3a8a"}}>Heart</th>
                    <th style={{background:"#4a1d96"}}>Blood Temp</th>
                    <th style={{background:"#7f1d1d"}}>Reproduction</th>
                    <th style={{background:"#92400e"}}>Examples</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Pisces","Aquatic","2-chambered","Cold-blooded","Oviparous (eggs in water)","Sharks, Rohu, Tuna"],
                    ["Amphibia","Water + Land","3-chambered","Cold-blooded","Oviparous (eggs in water)","Frogs, Toads, Salamanders"],
                    ["Reptilia","Terrestrial","3-chambered (Croc=4)","Cold-blooded","Oviparous (eggs on land)","Lizard, Snake, Turtle, Crocodile"],
                    ["Aves","Land / Air","4-chambered","Warm-blooded","Oviparous","Sparrow, Eagle, Penguin"],
                    ["Mammalia","All habitats","4-chambered","Warm-blooded","Viviparous (mostly); Platypus/Echidna=oviparous","Humans, Whale, Kangaroo"],
                  ].map(([cl,...vals])=>(
                    <tr key={cl}><td>{cl}</td>{vals.map((v,i)=><td key={i}>{v}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="div-scroll-hint" style={{marginTop:"8px"}}>← Swipe to see body covering & respiration →</div>
            <div className="div-table-wrap">
              <table className="div-table" style={{minWidth:"580px"}}>
                <thead>
                  <tr>
                    <th style={{background:"#145530"}}>Class</th>
                    <th style={{background:"#0f766e"}}>Body Covering</th>
                    <th style={{background:"#1e40af"}}>Respiration</th>
                    <th style={{background:"#6d28d9"}}>Unique Feature</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Pisces","Scales","Gills","Streamlined body; bony or cartilaginous skeleton"],
                    ["Amphibia","Moist skin (no scales)","Gills + lungs + skin","Dual mode of life — water and land"],
                    ["Reptilia","Dry scales","Lungs only","Completely terrestrial; lay eggs on land"],
                    ["Aves","Feathers","Lungs","Forelimbs modified into wings for flight"],
                    ["Mammalia","Hair / fur","Lungs","Mammary glands to nourish young; mostly viviparous"],
                  ].map(([cl,...vals])=>(
                    <tr key={cl}><td>{cl}</td>{vals.map((v,i)=><td key={i}>{v}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="div-quote">
            <p>"Classification is not merely an organisational exercise — it reveals the evolutionary story of life. Every shared characteristic between species is evidence of a common ancestor, and every difference a record of divergent evolution."</p>
          </div>

          <div className="div-divider"><div className="div-divider-mark">🌿</div></div>
          <div className="div-faq-label"><div className="div-bdot" />Exam Preparation</div>
          <h2 className="div-faq-heading">Frequently Asked Questions</h2>
          <div className="div-faq-rule" />
          {faqs.map((faq,i)=>(
            <div className={`div-faq-item${openIndex===i?" open":""}`} key={i}>
              <button className="div-faq-q" onClick={()=>toggle(i)}>
                <span className="div-faq-q-text">Q{i+1}. {faq.q}</span>
                <span className="div-faq-icon">{openIndex===i?"▴":"▾"}</span>
              </button>
              <div className={`div-faq-ans${openIndex===i?" visible":""}`}>{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
