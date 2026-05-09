import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #0f1c1a;
    --ink2:       #1c2e2b;
    --muted:      #4a6560;
    --paper:      #f2fbf9;
    --paper2:     #dff5f0;
    --accent:     #0d7c6e;
    --accent2:    #09635a;
    --accent-lt:  #ccf5ee;
    --coral:      #e05a2b;
    --coral-lt:   #fde8df;
    --gold:       #b45309;
    --gold-lt:    #fef3c7;
    --purple:     #6d28d9;
    --purple-lt:  #ede9fe;
    --blue:       #1e40af;
    --blue-lt:    #dbeafe;
    --rose:       #be123c;
    --rose-lt:    #ffe4e6;
    --green:      #166534;
    --green-lt:   #dcfce7;
    --red:        #b91c1c;
    --red-lt:     #fee2e2;
    --rule:       #5eead4;
    --white:      #ffffff;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .t6-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  /* ══════════════════════════════════
     HERO
  ══════════════════════════════════ */
  .t6-hero {
    background: linear-gradient(135deg, #020e0c 0%, #061a16 50%, #092420 100%);
    min-height: 88vh; display: flex; align-items: flex-end;
    position: relative; overflow: hidden; padding: 0 0 64px;
  }
  @media (max-width: 700px) { .t6-hero { min-height: auto; align-items: flex-start; padding: 72px 0 48px; } }
  .t6-hero::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px; background: linear-gradient(90deg, #0d7c6e 0%, #e05a2b 30%, #6d28d9 58%, #be123c 80%, #b45309 100%); }
  .t6-hero-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(13,124,110,0.18) 1px, transparent 1px); background-size: 28px 28px; pointer-events: none; }
  .t6-hero-hex { position: absolute; top: 50%; right: 4%; transform: translateY(-50%); width: clamp(140px,22vw,270px); height: clamp(140px,22vw,270px); pointer-events: none; }
  .t6-hero-hex::before { content: ''; position: absolute; inset: 0; background: rgba(13,124,110,0.06); clip-path: polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%); }
  .t6-hero-hex::after  { content: ''; position: absolute; inset: 26%; background: rgba(13,124,110,0.05); clip-path: polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%); }
  .t6-glow-a { position: absolute; top: 15%; left: 5%; width: 280px; height: 280px; border-radius: 50%; background: radial-gradient(circle, rgba(13,124,110,0.18) 0%, transparent 68%); pointer-events: none; }
  .t6-glow-b { position: absolute; bottom: 8%; right: 20%; width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, rgba(224,90,43,0.1) 0%, transparent 70%); pointer-events: none; }
  .t6-hero-bg-num { position: absolute; bottom: -80px; right: -20px; font-family: 'Montserrat', sans-serif; font-size: clamp(200px,34vw,480px); font-weight: 900; line-height: 1; color: rgba(255,255,255,0.018); letter-spacing: -0.04em; user-select: none; pointer-events: none; }
  .t6-hero-inner { max-width: 900px; width: 100%; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
  .t6-overline { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #5eead4; margin-bottom: 24px; display: flex; align-items: center; gap: 14px; }
  .t6-overline::before, .t6-overline::after { content: ''; flex: 0 0 40px; height: 1px; background: #5eead4; }
  .t6-hero-title { font-family: 'Montserrat', sans-serif; font-size: clamp(36px,7.5vw,78px); font-weight: 900; color: #fff; line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 32px; }
  .t6-hero-title em { font-style: normal; color: #5eead4; }
  .t6-hero-bar { display: flex; flex-wrap: wrap; gap: 0; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; margin-top: 8px; }
  .t6-hero-bar-item { flex: 1 1 150px; padding: 0 24px 0 0; border-right: 1px solid rgba(255,255,255,0.08); margin-right: 24px; }
  .t6-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .t6-bar-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 5px; }
  .t6-bar-value { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.72); }
  @media (max-width: 700px) {
    .t6-hero-bar { gap: 12px; } .t6-hero-bar-item { flex: 1 1 120px; padding: 0 14px 0 0; margin-right: 14px; }
    .t6-bar-label { font-size: 9px; } .t6-bar-value { font-size: 13px; }
    .t6-overline { font-size: 10px; } .t6-hero-title { font-size: clamp(36px,10vw,56px); margin-bottom: 24px; }
    .t6-hero-inner { padding: 0 18px; }
  }

  /* ══════════════════════════════════
     BODY
  ══════════════════════════════════ */
  .t6-body { max-width: 880px; margin: 0 auto; padding: 72px 32px 100px; }
  @media (max-width: 700px) { .t6-body { padding: 48px 18px 72px; } }

  /* ══════════════════════════════════
     INTRO CARD
  ══════════════════════════════════ */
  .t6-intro { background: linear-gradient(135deg, #020e0c, #092420); border-left: 5px solid #0d7c6e; border-radius: 4px; padding: 36px 40px; margin-bottom: 72px; position: relative; overflow: hidden; }
  .t6-intro::after { content: '🧬'; position: absolute; right: 28px; top: 50%; transform: translateY(-50%); font-size: 88px; opacity: 0.08; }
  .t6-intro p { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 500; color: rgba(255,255,255,0.86); line-height: 1.8; margin: 0 0 14px; }
  .t6-intro p:last-child { margin: 0; }
  .t6-intro strong { color: #5eead4; }
  @media (max-width: 700px) { .t6-intro { padding: 24px 20px; } .t6-intro p { font-size: 15px; } }

  /* ══════════════════════════════════
     SECTION HEADER
  ══════════════════════════════════ */
  .t6-sec { margin-bottom: 52px; }
  .t6-sec-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--accent-lt); color: var(--accent2); font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; padding: 5px 14px; border-radius: 100px; margin-bottom: 14px; }
  .t6-badge-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }
  .t6-sec-title { font-family: 'Montserrat', sans-serif; font-size: clamp(22px,4vw,32px); font-weight: 900; color: var(--ink); letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 6px; }
  .t6-sec-title span { color: var(--accent); }
  .t6-sec-rule { width: 48px; height: 4px; border-radius: 2px; background: linear-gradient(90deg, var(--accent), #2dd4bf); margin-bottom: 24px; }
  .t6-body-text { font-family: 'Inter', sans-serif; font-size: 15.5px; color: var(--ink2); line-height: 1.85; margin-bottom: 24px; }
  .t6-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ══════════════════════════════════
     DIVIDER — hex cell shape
  ══════════════════════════════════ */
  .t6-divider { margin: 52px 0; display: flex; align-items: center; gap: 14px; }
  .t6-divider::before, .t6-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .t6-divider-mark { width: 20px; height: 20px; background: var(--accent); clip-path: polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%); flex-shrink: 0; }

  /* ══════════════════════════════════
     SCROLLABLE TABLE SHARED
  ══════════════════════════════════ */
  .t6-scroll-hint { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 600; color: var(--muted); margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
  .t6-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; margin-bottom: 28px; border-radius: 10px; border: 1.5px solid var(--rule); }
  .t6-table-wrap::-webkit-scrollbar { height: 5px; }
  .t6-table-wrap::-webkit-scrollbar-track { background: var(--paper2); }
  .t6-table-wrap::-webkit-scrollbar-thumb { background: var(--rule); border-radius: 3px; }
  .t6-table { width: 100%; border-collapse: collapse; }
  .t6-table th { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 13px 16px; color: #fff; text-align: left; white-space: nowrap; }
  .t6-table td { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2); padding: 11px 16px; border-top: 1px solid var(--rule); border-right: 1px solid var(--rule); line-height: 1.55; white-space: nowrap; }
  .t6-table td:first-child { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--accent2); white-space: normal; }
  .t6-table td:last-child { border-right: none; }
  .t6-table tr:nth-child(even) td { background: var(--paper2); }
  /* header cell colors set per table via inline style on th */

  /* ══════════════════════════════════
     S1: PLANT TISSUE TREE
  ══════════════════════════════════ */
  .t6-tree { background: linear-gradient(135deg, #020e0c, #092420); border-radius: 10px; padding: 28px; margin-bottom: 28px; position: relative; overflow: hidden; }
  .t6-tree::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(94,234,212,0.07) 1px, transparent 1px); background-size: 22px 22px; pointer-events: none; }
  .t6-tree-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(94,234,212,0.6); margin-bottom: 16px; position: relative; }
  .t6-tree-root { text-align: center; margin-bottom: 16px; position: relative; }
  .t6-tree-root-pill { display: inline-block; background: rgba(13,124,110,0.35); border: 1.5px solid rgba(94,234,212,0.3); border-radius: 8px; padding: 10px 28px; font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 900; color: #ccfef8; }
  .t6-tree-branches { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; position: relative; }
  @media (max-width: 500px) { .t6-tree-branches { grid-template-columns: 1fr; } }
  .t6-tree-branch { background: rgba(255,255,255,0.05); border: 1px solid rgba(94,234,212,0.15); border-radius: 8px; padding: 16px; }
  .t6-branch-name { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: #5eead4; margin-bottom: 7px; }
  .t6-branch-text { font-family: 'Inter', sans-serif; font-size: 12.5px; color: rgba(255,255,255,0.6); line-height: 1.65; }

  /* ══════════════════════════════════
     S2: SIMPLE PERMANENT TISSUE CARDS
  ══════════════════════════════════ */
  .t6-simple-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 24px; }
  @media (max-width: 620px) { .t6-simple-grid { grid-template-columns: 1fr; } }
  .t6-simple-card { border-radius: 10px; overflow: hidden; border: 1.5px solid var(--rule); background: var(--white); }
  /* Parenchyma */
  .t6-simple-card.t6-parench .t6-sc-hdr { background: linear-gradient(135deg, #003020, #166534); }
  .t6-simple-card.t6-parench .t6-sc-dot { background: #166534; }
  /* Collenchyma */
  .t6-simple-card.t6-collen  .t6-sc-hdr { background: linear-gradient(135deg, #001e40, #1e40af); }
  .t6-simple-card.t6-collen  .t6-sc-dot { background: #1e40af; }
  /* Sclerenchyma */
  .t6-simple-card.t6-scleren .t6-sc-hdr { background: linear-gradient(135deg, #1a0a00, #c2410c); }
  .t6-simple-card.t6-scleren .t6-sc-dot { background: #c2410c; }
  .t6-sc-hdr { padding: 14px 16px; }
  .t6-sc-tag  { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 3px; }
  .t6-sc-name { font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 900; color: #fff; }
  .t6-sc-body { padding: 14px 16px; background: var(--white); }
  .t6-sc-row  { font-family: 'Inter', sans-serif; font-size: 12.5px; color: var(--ink2); line-height: 1.65; padding: 5px 0; border-bottom: 1px solid var(--rule); display: flex; gap: 8px; }
  .t6-sc-row:last-child { border-bottom: none; }
  .t6-sc-dot  { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
  .t6-sc-row strong { font-weight: 600; color: var(--ink); }

  /* Subtypes: Chlorenchyma & Aerenchyma */
  .t6-subtype-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 28px; }
  @media (max-width: 500px) { .t6-subtype-row { grid-template-columns: 1fr; } }
  .t6-subtype-pill { background: var(--white); border: 1.5px solid var(--rule); border-radius: 8px; padding: 14px 16px; }
  .t6-subtype-pill.t6-chloro { border-left: 4px solid var(--green); }
  .t6-subtype-pill.t6-aerenc { border-left: 4px solid var(--accent); }
  .t6-subtype-name { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; margin-bottom: 5px; }
  .t6-subtype-pill.t6-chloro .t6-subtype-name { color: var(--green); }
  .t6-subtype-pill.t6-aerenc .t6-subtype-name { color: var(--accent); }
  .t6-subtype-text { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2); line-height: 1.65; }
  .t6-subtype-text strong { font-weight: 600; color: var(--ink); }

  /* ══════════════════════════════════
     S3: VASCULAR (XYLEM / PHLOEM)
  ══════════════════════════════════ */
  .t6-vasc-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 28px; }
  @media (max-width: 560px) { .t6-vasc-pair { grid-template-columns: 1fr; } }
  .t6-vasc-card { border-radius: 10px; overflow: hidden; border: 1.5px solid var(--rule); background: var(--white); }
  .t6-vasc-card.t6-xylem  .t6-vasc-hdr { background: linear-gradient(135deg, #001a10, #0f766e); }
  .t6-vasc-card.t6-phloem .t6-vasc-hdr { background: linear-gradient(135deg, #1a0040, #6d28d9); }
  .t6-vasc-card.t6-xylem  .t6-vasc-fn  { background: var(--accent-lt); color: var(--accent2); }
  .t6-vasc-card.t6-phloem .t6-vasc-fn  { background: var(--purple-lt); color: var(--purple); }
  .t6-vasc-hdr  { padding: 16px 18px; }
  .t6-vasc-tag  { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 4px; }
  .t6-vasc-name { font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 900; color: #fff; margin-bottom: 2px; }
  .t6-vasc-role { font-family: 'Inter', sans-serif; font-size: 12px; color: rgba(255,255,255,0.6); }
  .t6-vasc-body { padding: 14px 18px; background: var(--white); }
  .t6-vasc-fn   { font-family: 'Poppins', sans-serif; font-size: 12.5px; font-weight: 600; border-radius: 4px; padding: 7px 10px; margin-bottom: 12px; }
  .t6-vasc-cell-row { font-family: 'Inter', sans-serif; font-size: 12.5px; color: var(--ink2); padding: 6px 0; border-bottom: 1px solid var(--rule); display: flex; gap: 8px; align-items: center; line-height: 1.55; }
  .t6-vasc-cell-row:last-child { border-bottom: none; }
  .t6-badge-live { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 100px; flex-shrink: 0; background: var(--green-lt); color: var(--green); }
  .t6-badge-dead { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 100px; flex-shrink: 0; background: var(--red-lt);   color: var(--red); }

  /* ══════════════════════════════════
     S4: ANIMAL TISSUE — 4 overview cards
  ══════════════════════════════════ */
  .t6-animal-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; margin-bottom: 32px; }
  @media (max-width: 580px) { .t6-animal-grid { grid-template-columns: 1fr; } }
  .t6-ani-card { border-radius: 10px; overflow: hidden; border: 1.5px solid var(--rule); background: var(--white); }
  .t6-ani-card.t6-epith .t6-ani-hdr { background: linear-gradient(135deg, #001e40, #1e40af); }
  .t6-ani-card.t6-conn  .t6-ani-hdr { background: linear-gradient(135deg, #09271f, #0d7c6e); }
  .t6-ani-card.t6-musc  .t6-ani-hdr { background: linear-gradient(135deg, #1a0a00, #e05a2b); }
  .t6-ani-card.t6-nerv  .t6-ani-hdr { background: linear-gradient(135deg, #1a0040, #6d28d9); }
  .t6-ani-card.t6-epith .t6-ani-dot  { background: #1e40af; }
  .t6-ani-card.t6-conn  .t6-ani-dot  { background: var(--accent); }
  .t6-ani-card.t6-musc  .t6-ani-dot  { background: var(--coral); }
  .t6-ani-card.t6-nerv  .t6-ani-dot  { background: var(--purple); }
  .t6-ani-hdr  { padding: 16px 18px; display: flex; align-items: center; gap: 12px; }
  .t6-ani-icon { font-size: 28px; flex-shrink: 0; }
  .t6-ani-tag  { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 2px; }
  .t6-ani-name { font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 900; color: #fff; }
  .t6-ani-body  { padding: 14px 18px; background: var(--white); }
  .t6-ani-point { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2); line-height: 1.65; padding: 5px 0; border-bottom: 1px solid var(--rule); display: flex; gap: 8px; }
  .t6-ani-point:last-child { border-bottom: none; }
  .t6-ani-dot   { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
  .t6-ani-point strong { font-weight: 600; color: var(--ink); }

  /* ══════════════════════════════════
     S5: EPITHELIAL TABLE
  ══════════════════════════════════ */
  /* uses shared .t6-table-wrap / .t6-table */

  /* ══════════════════════════════════
     S6: CONNECTIVE TISSUE CARDS
  ══════════════════════════════════ */
  .t6-conn-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; margin-bottom: 28px; }
  @media (max-width: 560px) { .t6-conn-grid { grid-template-columns: 1fr; } }
  .t6-conn-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 8px; padding: 16px 18px; }
  .t6-conn-card.t6-cc1 { border-top: 4px solid var(--accent); }
  .t6-conn-card.t6-cc2 { border-top: 4px solid var(--coral); }
  .t6-conn-card.t6-cc3 { border-top: 4px solid var(--gold); }
  .t6-conn-card.t6-cc4 { border-top: 4px solid var(--blue); }
  .t6-conn-card.t6-cc5 { border-top: 4px solid var(--rose); }
  .t6-conn-card.t6-cc6 { border-top: 4px solid var(--purple); }
  .t6-conn-title { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; margin-bottom: 7px; }
  .t6-conn-card.t6-cc1 .t6-conn-title { color: var(--accent); }
  .t6-conn-card.t6-cc2 .t6-conn-title { color: var(--coral); }
  .t6-conn-card.t6-cc3 .t6-conn-title { color: var(--gold); }
  .t6-conn-card.t6-cc4 .t6-conn-title { color: var(--blue); }
  .t6-conn-card.t6-cc5 .t6-conn-title { color: var(--rose); }
  .t6-conn-card.t6-cc6 .t6-conn-title { color: var(--purple); }
  .t6-conn-text { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2); line-height: 1.7; }
  .t6-conn-text strong { font-weight: 600; color: var(--ink); }

  /* ══════════════════════════════════
     S7: MUSCLE — 3 cards
  ══════════════════════════════════ */
  .t6-muscle-trio { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-bottom: 24px; }
  @media (max-width: 640px) { .t6-muscle-trio { grid-template-columns: 1fr; } }
  .t6-musc-card { border-radius: 10px; overflow: hidden; border: 1.5px solid var(--rule); background: var(--white); }
  .t6-musc-card.t6-stri .t6-mc-hdr { background: linear-gradient(135deg, #1a0010, #be123c); }
  .t6-musc-card.t6-smoo .t6-mc-hdr { background: linear-gradient(135deg, #001e40, #1e40af); }
  .t6-musc-card.t6-card .t6-mc-hdr { background: linear-gradient(135deg, #060e02, #166534); }
  .t6-musc-card.t6-stri .t6-mc-lbl { color: var(--rose); }
  .t6-musc-card.t6-smoo .t6-mc-lbl { color: #1e40af; }
  .t6-musc-card.t6-card .t6-mc-lbl { color: var(--green); }
  .t6-mc-hdr  { padding: 14px 16px; }
  .t6-mc-tag  { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 3px; }
  .t6-mc-name { font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 900; color: #fff; }
  .t6-mc-body { padding: 14px 16px; background: var(--white); }
  .t6-mc-prop { display: flex; gap: 8px; align-items: flex-start; padding: 6px 0; border-bottom: 1px solid var(--rule); font-family: 'Inter', sans-serif; font-size: 12.5px; color: var(--ink2); line-height: 1.55; }
  .t6-mc-prop:last-child { border-bottom: none; }
  .t6-mc-lbl  { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; min-width: 60px; flex-shrink: 0; padding-top: 1px; }

  /* ══════════════════════════════════
     S8: NEURON DARK PANEL
  ══════════════════════════════════ */
  .t6-neuron-banner { background: linear-gradient(135deg, #020e0c, #092420); border-radius: 10px; padding: 26px 28px; margin-bottom: 24px; position: relative; overflow: hidden; }
  .t6-neuron-banner::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(94,234,212,0.07) 1px, transparent 1px); background-size: 22px 22px; pointer-events: none; }
  .t6-nb-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(94,234,212,0.6); margin-bottom: 16px; position: relative; }
  .t6-neuron-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; position: relative; }
  @media (max-width: 500px) { .t6-neuron-grid { grid-template-columns: 1fr; } }
  .t6-np { background: rgba(255,255,255,0.05); border: 1px solid rgba(94,234,212,0.15); border-radius: 8px; padding: 14px 16px; }
  .t6-np-name { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: #5eead4; margin-bottom: 5px; }
  .t6-np-text { font-family: 'Inter', sans-serif; font-size: 12.5px; color: rgba(255,255,255,0.62); line-height: 1.62; }
  @media (max-width: 700px) { .t6-neuron-banner { padding: 18px 16px; } }

  /* Synapse callout */
  .t6-synapse { background: var(--white); border: 1.5px solid var(--rule); border-left: 5px solid var(--accent); border-radius: 0 8px 8px 0; padding: 18px 22px; margin-bottom: 24px; }
  .t6-synapse-title { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: var(--accent2); margin-bottom: 6px; }
  .t6-synapse-text  { font-family: 'Inter', sans-serif; font-size: 13.5px; color: var(--ink2); line-height: 1.72; }
  .t6-synapse-text strong { font-weight: 600; color: var(--ink); }

  /* ══════════════════════════════════
     PULL QUOTE
  ══════════════════════════════════ */
  .t6-quote { border-left: 5px solid var(--accent); background: var(--accent-lt); padding: 20px 28px; margin: 32px 0; border-radius: 0 8px 8px 0; }
  .t6-quote p { font-family: 'Poppins', sans-serif; font-size: 15.5px; font-weight: 600; color: var(--accent2); line-height: 1.7; font-style: italic; margin: 0; }

  /* ══════════════════════════════════
     FAQ
  ══════════════════════════════════ */
  .t6-faq-label   { display: inline-flex; align-items: center; gap: 8px; background: var(--accent-lt); color: var(--accent2); font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; padding: 5px 14px; border-radius: 100px; margin-bottom: 14px; }
  .t6-faq-heading { font-family: 'Montserrat', sans-serif; font-size: clamp(24px,4vw,34px); font-weight: 900; color: var(--ink); letter-spacing: -0.02em; margin-bottom: 6px; }
  .t6-faq-rule    { width: 48px; height: 4px; border-radius: 2px; background: linear-gradient(90deg, var(--accent), #2dd4bf); margin-bottom: 28px; }
  .t6-faq-item    { border: 1.5px solid var(--rule); border-radius: 8px; margin-bottom: 10px; overflow: hidden; background: var(--white); transition: border-color 0.2s, box-shadow 0.2s; }
  .t6-faq-item.open { border-color: var(--accent); box-shadow: 0 2px 12px rgba(13,124,110,0.12); }
  .t6-faq-q       { width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 18px 22px; text-align: left; gap: 16px; }
  .t6-faq-q-text  { font-family: 'Poppins', sans-serif; font-size: 14.5px; font-weight: 600; color: var(--ink); line-height: 1.5; }
  .t6-faq-item.open .t6-faq-q-text { color: var(--accent); }
  .t6-faq-icon    { font-size: 20px; color: var(--accent); flex-shrink: 0; line-height: 1; }
  .t6-faq-ans     { font-family: 'Inter', sans-serif; font-size: 14.5px; color: var(--ink2); line-height: 1.85; padding: 0 22px; max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; }
  .t6-faq-ans.visible { max-height: 1200px; padding: 0 22px 20px; }
  .t6-faq-ans strong { color: var(--accent2); font-weight: 600; }
  @media (max-width: 700px) { .t6-faq-q { padding: 16px; } .t6-faq-ans.visible { padding: 0 16px 18px; } }
`;

const faqs = [
  { q: "What is a tissue? Why do multicellular organisms need tissues?",
    a: (<>A <strong>tissue</strong> is a group of similar cells that work together to perform a particular function.<br /><br />Unicellular organisms perform all functions with a single cell. In multicellular organisms, <strong>division of labour</strong> allows different cell groups to specialise — muscles for movement, nerves for signalling, epithelium for protection. This makes the organism far more efficient. Tissues are the structural basis of this specialisation.</>)},
  { q: "What are meristematic tissues? Name and locate their three types.",
    a: (<><strong>Meristematic tissues</strong> consist of actively dividing, undifferentiated cells with thin walls, dense cytoplasm, and a prominent nucleus. They are metabolically highly active.<br /><br />Three types based on location:<br />1. <strong>Apical meristem</strong> — growing tips of stems and roots → increases length.<br />2. <strong>Intercalary meristem</strong> — base of leaves or internodes → longitudinal growth.<br />3. <strong>Lateral meristem</strong> — lateral sides of stems and roots → increases girth/thickness (secondary growth).</>)},
  { q: "What are permanent tissues? How are they classified?",
    a: (<><strong>Permanent tissues</strong> are derived from meristematic tissues. Their cells have lost the ability to divide and have a definite shape, size, and function.<br /><br /><strong>Simple permanent</strong> — one cell type: Parenchyma, Collenchyma, Sclerenchyma.<br /><strong>Complex permanent</strong> — more than one cell type: Xylem and Phloem.</>)},
  { q: "Compare parenchyma, collenchyma, and sclerenchyma.",
    a: (<><strong>Parenchyma:</strong> Living cells, thin walls, large intercellular spaces. Functions: storage, photosynthesis (chlorenchyma), buoyancy (aerenchyma).<br /><br /><strong>Collenchyma:</strong> Living, elongated cells with walls thickened at corners; little intercellular space. Location: leaf stalks below epidermis. Function: flexibility and mechanical support.<br /><br /><strong>Sclerenchyma:</strong> Dead cells, long and narrow, lignin-deposited thick walls, NO intercellular spaces. Example: coconut husk, jute fibres. Function: rigidity and mechanical strength.</>)},
  { q: "What are xylem and phloem? What are they composed of?",
    a: (<><strong>Xylem</strong> — conducts water and minerals from roots upward to all parts.<br />Components: Tracheids, Vessels, Xylem parenchyma (living), Xylem fibres (dead). All except xylem parenchyma are <strong>non-living</strong>.<br /><br /><strong>Phloem</strong> — conducts food (sugars) from leaves to all parts.<br />Components: Sieve tubes, Companion cells, Phloem parenchyma (all living), Phloem fibres (dead). All except phloem fibres are <strong>living</strong>.<br /><br />Together they form <strong>vascular bundles</strong> — the plant's transport highway.</>)},
  { q: "What are epithelial tissues? Describe all four types.",
    a: (<><strong>Epithelial tissue</strong> covers all external surfaces, internal cavities, and organs. Cells are tightly packed with almost no intercellular space.<br /><br />Types:<br />• <strong>Squamous epithelium</strong>: Flat thin cells. Simple: mouth, oesophagus, lung alveoli. Stratified: skin (resists wear and tear).<br />• <strong>Cuboidal epithelium</strong>: Cube-shaped cells; mechanical support. Location: kidney tubules, salivary gland ducts.<br />• <strong>Columnar epithelium</strong>: Column-like cells; facilitates absorption/movement. Location: intestine, gut lining.<br />• <strong>Glandular epithelium</strong>: Specialised for secretion; forms multicellular glands (sweat, digestive glands).</>)},
  { q: "What are connective tissues? Describe their types.",
    a: (<><strong>Connective tissues</strong> connect, support, and bind body organs. They are the most diverse tissue type.<br /><br />• <strong>Areolar</strong>: Loose; supports internal organs; skin, muscles, around vessels.<br />• <strong>Adipose</strong>: Stores fat; insulates body; below skin, between organs.<br />• <strong>Ligament</strong>: Bone → Bone; very elastic; joints.<br />• <strong>Tendon</strong>: Bone → Muscle; strong, limited flexibility.<br />• <strong>Blood</strong>: Fluid connective tissue; plasma + RBCs + WBCs + Platelets; transports O₂, nutrients, hormones, waste.<br />• <strong>Lymph</strong>: Transparent yellowish fluid; immune defence; transports digested fats from intestine.</>)},
  { q: "Compare the three types of muscular tissue.",
    a: (<><strong>Striated (Skeletal):</strong> Voluntary, light/dark bands, long cylindrical unbranched cells, <strong>multinucleate</strong>. Location: limbs, tongue, pharynx, body wall.<br /><br /><strong>Smooth (Unstriated):</strong> Involuntary, no bands, spindle-shaped cells (pointed ends), <strong>uninucleate</strong>. Location: alimentary canal, bladder, blood vessels.<br /><br /><strong>Cardiac:</strong> <strong>Involuntary but striated</strong> — unique combination. Cylindrical, branched, uninucleate. Rhythmic contractions throughout life without fatigue. Found <strong>only in the heart</strong>.</>)},
  { q: "What is nervous tissue? Describe the structure of a neuron.",
    a: (<><strong>Nervous tissue</strong> is specialised for receiving and transmitting stimuli rapidly. Found in brain, spinal cord, and nerves. Functional unit = <strong>neuron</strong>.<br /><br />Parts of a neuron:<br />• <strong>Cell body (cyton)</strong>: nucleus, mitochondria, organelles; maintenance and growth.<br />• <strong>Dendrites</strong>: receive signals from adjacent neurons → conduct toward cell body.<br />• <strong>Axon</strong>: conducts signals away from cell body to next neuron or effector.<br />• <strong>Myelin sheath</strong>: fat-containing Schwann cells insulate axon; gaps = <strong>Nodes of Ranvier</strong>; enables fast transmission.<br /><br /><strong>Glial cells</strong>: support nervous tissue; do NOT conduct impulses.</>)},
  { q: "What is a synapse and how is a nerve impulse transmitted?",
    a: (<>A <strong>synapse</strong> is the junction formed where the axon endings of one neuron rest on the cell body of the next.<br /><br />Transmission:<br />1. Electrical signal travels along axon of neuron 1.<br />2. At axon terminal, <strong>neurotransmitter chemicals</strong> are released into the synaptic gap.<br />3. Neurotransmitters cross and bind to the dendrite of neuron 2.<br />4. A new electrical impulse is triggered in neuron 2.<br />5. This relay continues until the signal reaches the brain or target organ.</>)},
  { q: "What is blood and what is lymph? How do they differ?",
    a: (<><strong>Blood</strong> — fluid connective tissue pumped by the heart. Composed of plasma + RBCs (O₂ transport) + WBCs (immunity) + Platelets (clotting). Transports O₂, CO₂, nutrients, hormones, and waste.<br /><br /><strong>Lymph</strong> — transparent yellowish fluid in intercellular spaces, derived from blood plasma. Flows through the lymphatic system (not the heart). Functions: immune defence, transports nutrients, carries <strong>digested fats</strong> from intestine via lacteals.<br /><br />Key difference: Blood flows in a closed cardiovascular system; lymph flows in an open lymphatic system and returns fluid to blood.</>)},
];

export default function Tissues() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="t6-root">

        {/* ═══ HERO ═══ */}
        <div className="t6-hero">
          <div className="t6-hero-dots" />
          <div className="t6-hero-hex" />
          <div className="t6-glow-a" />
          <div className="t6-glow-b" />
          <div className="t6-hero-bg-num">6</div>
          <div className="t6-hero-inner">
            <div className="t6-overline">Class 9 · Science · Chapter 6</div>
            <h1 className="t6-hero-title"><em>Tissues</em></h1>
            <div className="t6-hero-bar">
              {[["Subject","Science — Biology"],["Topics","Plant · Animal · Neuron"],["Board","CBSE · NCERT"],["FAQs","11 Questions"]].map(([l,v])=>(
                <div className="t6-hero-bar-item" key={l}><div className="t6-bar-label">{l}</div><div className="t6-bar-value">{v}</div></div>
              ))}
            </div>
          </div>
        </div>

        <div className="t6-body">

          {/* Intro */}
          <div className="t6-intro">
            <p>As organisms became more complex, individual cells began <strong>specialising</strong> — grouping with similar cells to do specific jobs. These groups are called <strong>tissues</strong>.</p>
            <p>This chapter covers plant tissues (meristematic and permanent) and animal tissues (epithelial, connective, muscular, nervous) — right down to the neuron and how impulses travel across synapses.</p>
          </div>

          {/* ═══ S1: PLANT TISSUES ═══ */}
          <div className="t6-sec">
            <div className="t6-sec-badge"><div className="t6-badge-dot" />Plant Biology</div>
            <h2 className="t6-sec-title">Plant <span>Tissues</span></h2>
            <div className="t6-sec-rule" />
            <p className="t6-body-text">Plant tissues are classified by their capacity to divide: <strong>meristematic</strong> (actively dividing) and <strong>permanent</strong> (non-dividing, mature).</p>

            <div className="t6-tree">
              <div className="t6-tree-label">⬦ Plant Tissue Classification</div>
              <div className="t6-tree-root"><div className="t6-tree-root-pill">🌱 Plant Tissues</div></div>
              <div className="t6-tree-branches">
                <div className="t6-tree-branch">
                  <div className="t6-branch-name">Meristematic Tissues</div>
                  <div className="t6-branch-text">Actively dividing · Undifferentiated · Thin walls · Dense cytoplasm · Prominent nucleus<br /><br />→ Apical · Intercalary · Lateral</div>
                </div>
                <div className="t6-tree-branch">
                  <div className="t6-branch-name">Permanent Tissues</div>
                  <div className="t6-branch-text">Derived from meristematic · Lost dividing ability · Definite shape and function<br /><br />→ Simple Permanent · Complex Permanent</div>
                </div>
              </div>
            </div>

            <p className="t6-body-text" style={{marginBottom:"10px"}}>Three types of meristematic tissue differ by location and function:</p>
            <div className="t6-scroll-hint">← Swipe to see full table →</div>
            <div className="t6-table-wrap">
              <table className="t6-table" style={{minWidth:"480px"}}>
                <thead>
                  <tr>
                    <th style={{background:"#09635a"}}>Type</th>
                    <th style={{background:"#0f766e"}}>Location</th>
                    <th style={{background:"#166534"}}>Function</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Apical Meristem","Growing tips of stems and roots","Increases length of stems and roots"],
                    ["Intercalary Meristem","Base of leaves or internodes","Longitudinal growth of plants"],
                    ["Lateral Meristem","Lateral sides of stems and roots","Increases girth/thickness (secondary growth)"],
                  ].map(([t,l,f])=><tr key={t}><td>{t}</td><td>{l}</td><td>{f}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>

          <div className="t6-divider"><div className="t6-divider-mark" /></div>

          {/* ═══ S2: SIMPLE PERMANENT ═══ */}
          <div className="t6-sec">
            <div className="t6-sec-badge"><div className="t6-badge-dot" />Simple Permanent Tissues</div>
            <h2 className="t6-sec-title">Parenchyma · Collenchyma · <span>Sclerenchyma</span></h2>
            <div className="t6-sec-rule" />
            <p className="t6-body-text">Simple permanent tissues consist of <strong>one type of cell</strong> performing the same function. They handle storage, flexibility, and mechanical strength.</p>

            <div className="t6-simple-grid">
              <div className="t6-simple-card t6-parench">
                <div className="t6-sc-hdr">
                  <div className="t6-sc-tag">Living · Thin-walled</div>
                  <div className="t6-sc-name">🟢 Parenchyma</div>
                </div>
                <div className="t6-sc-body">
                  {["Unspecialised, loosely packed living cells.",
                    "Thin cell walls with large intercellular spaces.",
                    <>Most basic and <strong>most abundant</strong> plant tissue.</>,
                    <>Functions: <strong>storage, photosynthesis, buoyancy</strong>.</>,
                  ].map((t,i)=><div className="t6-sc-row" key={i}><div className="t6-sc-dot"/><span>{t}</span></div>)}
                </div>
              </div>
              <div className="t6-simple-card t6-collen">
                <div className="t6-sc-hdr">
                  <div className="t6-sc-tag">Living · Thickened corners</div>
                  <div className="t6-sc-name">🔵 Collenchyma</div>
                </div>
                <div className="t6-sc-body">
                  {["Living, elongated cells.",
                    "Walls irregularly thickened at corners.",
                    "Very little intercellular space.",
                    <>Location: leaf stalks below epidermis.</>,
                    <>Function: <strong>flexibility and mechanical support</strong>.</>,
                  ].map((t,i)=><div className="t6-sc-row" key={i}><div className="t6-sc-dot"/><span>{t}</span></div>)}
                </div>
              </div>
              <div className="t6-simple-card t6-scleren">
                <div className="t6-sc-hdr">
                  <div className="t6-sc-tag">Dead · Lignified · No spaces</div>
                  <div className="t6-sc-name">🟠 Sclerenchyma</div>
                </div>
                <div className="t6-sc-body">
                  {[<><strong>Dead cells</strong> — long, narrow, thick-walled.</>,
                    "Lignin deposits make walls very hard.",
                    "No intercellular spaces.",
                    "Example: husk of coconut, jute fibres.",
                    <>Function: <strong>rigidity and mechanical strength</strong>.</>,
                  ].map((t,i)=><div className="t6-sc-row" key={i}><div className="t6-sc-dot"/><span>{t}</span></div>)}
                </div>
              </div>
            </div>

            <p className="t6-body-text" style={{marginBottom:"12px"}}>Parenchyma has two important specialised forms:</p>
            <div className="t6-subtype-row">
              <div className="t6-subtype-pill t6-chloro">
                <div className="t6-subtype-name">🌿 Chlorenchyma</div>
                <div className="t6-subtype-text">Parenchyma containing <strong>chloroplasts</strong>. Performs <strong>photosynthesis</strong>. Found in leaves and green stems.</div>
              </div>
              <div className="t6-subtype-pill t6-aerenc">
                <div className="t6-subtype-name">🫧 Aerenchyma</div>
                <div className="t6-subtype-text">Parenchyma with <strong>large air cavities</strong>. Provides <strong>buoyancy</strong> to aquatic plants, helping them float.</div>
              </div>
            </div>
          </div>

          <div className="t6-divider"><div className="t6-divider-mark" /></div>

          {/* ═══ S3: COMPLEX PERMANENT ═══ */}
          <div className="t6-sec">
            <div className="t6-sec-badge"><div className="t6-badge-dot" />Complex Permanent Tissues</div>
            <h2 className="t6-sec-title">Xylem <span>&amp; Phloem</span></h2>
            <div className="t6-sec-rule" />
            <p className="t6-body-text">Complex permanent tissues are made of <strong>more than one cell type</strong> working together. They form the plant's vascular (transport) system.</p>

            <div className="t6-vasc-pair">
              <div className="t6-vasc-card t6-xylem">
                <div className="t6-vasc-hdr">
                  <div className="t6-vasc-tag">Water Conduction · Upward</div>
                  <div className="t6-vasc-name">🌊 Xylem</div>
                  <div className="t6-vasc-role">Roots → All plant parts</div>
                </div>
                <div className="t6-vasc-body">
                  <div className="t6-vasc-fn">Conducts water &amp; minerals from roots to all parts of the plant</div>
                  {[
                    {n:"Tracheids",         live:false},
                    {n:"Vessels",           live:false},
                    {n:"Xylem Parenchyma",  live:true},
                    {n:"Xylem Fibres",      live:false},
                  ].map((c,i)=>(
                    <div className="t6-vasc-cell-row" key={i}>
                      <span className={c.live?"t6-badge-live":"t6-badge-dead"}>{c.live?"Living":"Dead"}</span>
                      <span>{c.n}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="t6-vasc-card t6-phloem">
                <div className="t6-vasc-hdr">
                  <div className="t6-vasc-tag">Food Conduction · Downward</div>
                  <div className="t6-vasc-name">🍃 Phloem</div>
                  <div className="t6-vasc-role">Leaves → All plant parts</div>
                </div>
                <div className="t6-vasc-body">
                  <div className="t6-vasc-fn">Conducts food (photosynthates) from leaves to all parts of the plant</div>
                  {[
                    {n:"Sieve Tubes",        live:true},
                    {n:"Companion Cells",    live:true},
                    {n:"Phloem Parenchyma",  live:true},
                    {n:"Phloem Fibres",      live:false},
                  ].map((c,i)=>(
                    <div className="t6-vasc-cell-row" key={i}>
                      <span className={c.live?"t6-badge-live":"t6-badge-dead"}>{c.live?"Living":"Dead"}</span>
                      <span>{c.n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="t6-divider"><div className="t6-divider-mark" /></div>

          {/* ═══ S4: ANIMAL TISSUES OVERVIEW ═══ */}
          <div className="t6-sec">
            <div className="t6-sec-badge"><div className="t6-badge-dot" />Animal Biology</div>
            <h2 className="t6-sec-title">Animal Tissues — <span>Four Types</span></h2>
            <div className="t6-sec-rule" />
            <p className="t6-body-text">Animal tissues are classified into four types based on function. Each is highly specialised for its role in the body.</p>

            <div className="t6-animal-grid">
              <div className="t6-ani-card t6-epith">
                <div className="t6-ani-hdr"><span className="t6-ani-icon">🛡️</span><div><div className="t6-ani-tag">Covering &amp; lining</div><div className="t6-ani-name">Epithelial Tissue</div></div></div>
                <div className="t6-ani-body">
                  {["Tightly packed cells, almost no intercellular space.",
                    <>Covers external surfaces, internal cavities, and organs.</>,
                    "Types: Squamous, Cuboidal, Columnar, Glandular.",
                    "Stratified squamous epithelium = skin (resists wear and tear).",
                  ].map((t,i)=><div className="t6-ani-point" key={i}><div className="t6-ani-dot"/><span>{t}</span></div>)}
                </div>
              </div>
              <div className="t6-ani-card t6-conn">
                <div className="t6-ani-hdr"><span className="t6-ani-icon">🔗</span><div><div className="t6-ani-tag">Binding &amp; supporting</div><div className="t6-ani-name">Connective Tissue</div></div></div>
                <div className="t6-ani-body">
                  {[<>Connects, supports, and <strong>binds body organs</strong>.</>,
                    "Most diverse tissue type in the body.",
                    "Includes: areolar, adipose, cartilage, bone, blood, lymph.",
                    "Blood and lymph are fluid connective tissues.",
                  ].map((t,i)=><div className="t6-ani-point" key={i}><div className="t6-ani-dot"/><span>{t}</span></div>)}
                </div>
              </div>
              <div className="t6-ani-card t6-musc">
                <div className="t6-ani-hdr"><span className="t6-ani-icon">💪</span><div><div className="t6-ani-tag">Movement</div><div className="t6-ani-name">Muscular Tissue</div></div></div>
                <div className="t6-ani-body">
                  {[<>Enables <strong>movement</strong> of body parts and organs.</>,
                    "Three types: Striated, Smooth, Cardiac.",
                    "Striated = voluntary; Smooth = involuntary; Cardiac = involuntary striated.",
                    "Cardiac never fatigues — beats rhythmically lifelong.",
                  ].map((t,i)=><div className="t6-ani-point" key={i}><div className="t6-ani-dot"/><span>{t}</span></div>)}
                </div>
              </div>
              <div className="t6-ani-card t6-nerv">
                <div className="t6-ani-hdr"><span className="t6-ani-icon">⚡</span><div><div className="t6-ani-tag">Signal transmission</div><div className="t6-ani-name">Nervous Tissue</div></div></div>
                <div className="t6-ani-body">
                  {[<>Specialised for <strong>receiving and transmitting stimuli</strong> rapidly.</>,
                    "Found in brain, spinal cord, and nerves.",
                    <>Functional unit = <strong>neuron</strong>. Also contains glial (support) cells.</>,
                    "Neurons transmit signals via chemical synapses.",
                  ].map((t,i)=><div className="t6-ani-point" key={i}><div className="t6-ani-dot"/><span>{t}</span></div>)}
                </div>
              </div>
            </div>
          </div>

          <div className="t6-divider"><div className="t6-divider-mark" /></div>

          {/* ═══ S5: EPITHELIAL TYPES — scrollable table ═══ */}
          <div className="t6-sec">
            <div className="t6-sec-badge"><div className="t6-badge-dot" />Epithelial Tissue Types</div>
            <h2 className="t6-sec-title">Types of <span>Epithelial Tissue</span></h2>
            <div className="t6-sec-rule" />
            <p className="t6-body-text">Epithelial tissue is classified by cell shape and arrangement. Each type is suited to its location's specific demands — protection, absorption, or secretion.</p>
            <div className="t6-scroll-hint">← Swipe to see full table →</div>
            <div className="t6-table-wrap">
              <table className="t6-table" style={{minWidth:"580px"}}>
                <thead>
                  <tr>
                    <th style={{background:"#1e3a8a"}}>Type</th>
                    <th style={{background:"#1d4ed8"}}>Cell Shape</th>
                    <th style={{background:"#0369a1"}}>Location in Body</th>
                    <th style={{background:"#0f766e"}}>Function</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Simple Squamous","Flat, thin, scale-like","Mouth, oesophagus, lung alveoli, blood vessel walls","Diffusion, filtration; forms thin permeable lining"],
                    ["Stratified Squamous","Multiple flat cell layers","Skin (epidermis)","Protects against wear, tear, and abrasion"],
                    ["Cuboidal Epithelium","Cube-shaped cells","Kidney tubules, salivary gland ducts","Mechanical support; secretion and absorption"],
                    ["Columnar Epithelium","Tall, column-like cells","Inner lining of intestine and gut","Facilitates absorption and movement across barriers"],
                    ["Glandular Epithelium","Specialised secretory cells","Sweat glands, digestive glands","Secretion of substances (hormones, enzymes, mucus)"],
                  ].map(([t,s,l,f])=>(
                    <tr key={t}><td>{t}</td><td>{s}</td><td>{l}</td><td>{f}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="t6-divider"><div className="t6-divider-mark" /></div>

          {/* ═══ S6: CONNECTIVE TISSUE ═══ */}
          <div className="t6-sec">
            <div className="t6-sec-badge"><div className="t6-badge-dot" />Connective Tissue Types</div>
            <h2 className="t6-sec-title">Connective Tissue — <span>Classification</span></h2>
            <div className="t6-sec-rule" />
            <p className="t6-body-text">Connective tissue ranges from soft areolar tissue to rigid bone — and from elastic ligaments to flowing blood. It is the most diverse tissue type in the body.</p>
            <div className="t6-conn-grid">
              {[
                {cls:"t6-cc1", title:"Areolar Tissue",   text:<><strong>Loose connective tissue.</strong> Supports internal organs; aids tissue repair. Found in skin, muscles, around blood vessels and nerves.</>},
                {cls:"t6-cc2", title:"Adipose Tissue",   text:<><strong>Stores fats</strong> as energy reserve. Acts as a <strong>thermal insulator</strong>. Found below skin and between internal organs.</>},
                {cls:"t6-cc3", title:"Ligament",         text:<>Connects <strong>bone to bone</strong>. Very <strong>elastic</strong>. Dense regular connective tissue. Example: knee and ankle joints.</>},
                {cls:"t6-cc4", title:"Tendon",           text:<>Connects <strong>bone to muscle</strong>. Strong with <strong>limited flexibility</strong>. Dense regular connective tissue.</>},
                {cls:"t6-cc5", title:"Blood",            text:<><strong>Fluid connective tissue.</strong> Plasma + RBCs + WBCs + Platelets. Transports O₂, CO₂, nutrients, hormones, and waste.</>},
                {cls:"t6-cc6", title:"Lymph",            text:<>Transparent yellowish fluid in intercellular spaces. Part of <strong>immune defence</strong>. Carries digested fats from intestine.</>},
              ].map((c,i)=>(
                <div className={`t6-conn-card ${c.cls}`} key={i}>
                  <div className="t6-conn-title">{c.title}</div>
                  <div className="t6-conn-text">{c.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="t6-divider"><div className="t6-divider-mark" /></div>

          {/* ═══ S7: MUSCLE TISSUE ═══ */}
          <div className="t6-sec">
            <div className="t6-sec-badge"><div className="t6-badge-dot" />Muscular Tissue</div>
            <h2 className="t6-sec-title">Striated · Smooth · <span>Cardiac</span></h2>
            <div className="t6-sec-rule" />
            <p className="t6-body-text">Three types of muscle tissue — each with distinct structure, control, and location. These differences are high-frequency exam topics.</p>

            <div className="t6-muscle-trio">
              <div className="t6-musc-card t6-stri">
                <div className="t6-mc-hdr">
                  <div className="t6-mc-tag">Voluntary · Skeletal</div>
                  <div className="t6-mc-name">💪 Striated</div>
                </div>
                <div className="t6-mc-body">
                  {[{l:"Control",  v:"Voluntary"},
                    {l:"Bands",    v:"Light & dark striations"},
                    {l:"Shape",    v:"Long, cylindrical, unbranched"},
                    {l:"Nuclei",   v:"Multinucleate"},
                    {l:"Location", v:"Limbs, tongue, body wall, pharynx"},
                  ].map((r,i)=><div className="t6-mc-prop" key={i}><span className="t6-mc-lbl">{r.l}</span><span>{r.v}</span></div>)}
                </div>
              </div>
              <div className="t6-musc-card t6-smoo">
                <div className="t6-mc-hdr">
                  <div className="t6-mc-tag">Involuntary · Visceral</div>
                  <div className="t6-mc-name">🌀 Smooth</div>
                </div>
                <div className="t6-mc-body">
                  {[{l:"Control",  v:"Involuntary"},
                    {l:"Bands",    v:"No striations"},
                    {l:"Shape",    v:"Long, spindle-shaped (pointed ends)"},
                    {l:"Nuclei",   v:"Uninucleate"},
                    {l:"Location", v:"Alimentary canal, bladder, blood vessels"},
                  ].map((r,i)=><div className="t6-mc-prop" key={i}><span className="t6-mc-lbl">{r.l}</span><span>{r.v}</span></div>)}
                </div>
              </div>
              <div className="t6-musc-card t6-card">
                <div className="t6-mc-hdr">
                  <div className="t6-mc-tag">Involuntary · Striated</div>
                  <div className="t6-mc-name">❤️ Cardiac</div>
                </div>
                <div className="t6-mc-body">
                  {[{l:"Control",  v:"Involuntary (but striated)"},
                    {l:"Bands",    v:"Striations present"},
                    {l:"Shape",    v:"Cylindrical, branched"},
                    {l:"Nuclei",   v:"Uninucleate"},
                    {l:"Location", v:"Heart only — rhythmic lifelong"},
                  ].map((r,i)=><div className="t6-mc-prop" key={i}><span className="t6-mc-lbl">{r.l}</span><span>{r.v}</span></div>)}
                </div>
              </div>
            </div>

            <div className="t6-scroll-hint">← Swipe to compare all three muscle types →</div>
            <div className="t6-table-wrap">
              <table className="t6-table" style={{minWidth:"540px"}}>
                <thead>
                  <tr>
                    <th style={{background:"#7f1d1d"}}>Feature</th>
                    <th style={{background:"#be123c"}}>Striated</th>
                    <th style={{background:"#1e3a8a"}}>Smooth</th>
                    <th style={{background:"#14532d"}}>Cardiac</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Control",       "Voluntary",            "Involuntary",      "Involuntary"],
                    ["Striations",    "Present",              "Absent",           "Present"],
                    ["Cell shape",    "Cylindrical, unbranched","Spindle-shaped", "Cylindrical, branched"],
                    ["Nuclei",        "Multinucleate",        "Uninucleate",      "Uninucleate"],
                    ["Fatigue",       "Fatigues",             "Fatigues",         "Never fatigues"],
                    ["Location",      "Bones / limbs",        "Internal organs",  "Heart only"],
                  ].map(([f,...vals])=>(
                    <tr key={f}><td>{f}</td>{vals.map((v,i)=><td key={i}>{v}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="t6-divider"><div className="t6-divider-mark" /></div>

          {/* ═══ S8: NERVOUS TISSUE ═══ */}
          <div className="t6-sec">
            <div className="t6-sec-badge"><div className="t6-badge-dot" />Nervous Tissue</div>
            <h2 className="t6-sec-title">Neuron — Structure <span>&amp; Impulse Transmission</span></h2>
            <div className="t6-sec-rule" />
            <p className="t6-body-text">Nervous tissue is made of <strong>neurons</strong> — cells specialised for receiving stimuli and transmitting electrical signals at high speed. Found in the brain, spinal cord, and nerves.</p>

            <div className="t6-neuron-banner">
              <div className="t6-nb-label">⬦ Parts of a Neuron</div>
              <div className="t6-neuron-grid">
                {[
                  {name:"Cell Body (Cyton)",  text:"Contains nucleus, mitochondria, and organelles. Responsible for maintenance and growth of the neuron."},
                  {name:"Dendrites",          text:"Short branched extensions that receive signals from adjacent neurons and conduct them toward the cell body."},
                  {name:"Axon",              text:"Long fibre conducting messages away from the cell body toward the next neuron or muscle/gland."},
                  {name:"Myelin Sheath",      text:"Fat-containing Schwann cells insulating the axon for fast signal transmission. Gaps = Nodes of Ranvier."},
                ].map((p,i)=>(
                  <div className="t6-np" key={i}>
                    <div className="t6-np-name">{p.name}</div>
                    <div className="t6-np-text">{p.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="t6-synapse">
              <div className="t6-synapse-title">⚡ Synapse — How Impulses Jump Between Neurons</div>
              <div className="t6-synapse-text">
                A <strong>synapse</strong> is the junction where axon endings of one neuron rest on the cell body of the next. When an electrical impulse reaches the axon terminal, <strong>neurotransmitter chemicals</strong> are released into the synaptic gap. These cross the gap and trigger a new electrical impulse in the next neuron's dendrite — relaying signals all the way to the brain. Nervous tissue also contains <strong>glial (neuroglial) cells</strong> that provide structural support without conducting impulses.
              </div>
            </div>

            <div className="t6-scroll-hint" style={{marginTop:"8px"}}>← Swipe to compare nerve types →</div>
            <div className="t6-table-wrap">
              <table className="t6-table" style={{minWidth:"520px"}}>
                <thead>
                  <tr>
                    <th style={{background:"#4a1d96"}}>Type of Nerve</th>
                    <th style={{background:"#6d28d9"}}>Direction of Signal</th>
                    <th style={{background:"#0d7c6e"}}>Function</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Sensory Nerve","Sense organ → Brain / Spinal cord","Carries sensory impulses to central nervous system"],
                    ["Motor Nerve","Brain / Spinal cord → Muscle or gland","Carries motor commands from CNS to effectors"],
                    ["Mixed Nerve","Both directions","Contains both sensory and motor fibres"],
                  ].map(([t,d,f])=><tr key={t}><td>{t}</td><td>{d}</td><td>{f}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>

          <div className="t6-quote">
            <p>"A tissue is more than the sum of its cells — it is specialisation in action. From the rigid walls of sclerenchyma to the rhythmic beat of cardiac muscle, every tissue is evolution's elegant answer to a specific biological challenge."</p>
          </div>

          {/* ═══ FAQ ═══ */}
          <div className="t6-divider"><div className="t6-divider-mark" /></div>
          <div className="t6-faq-label"><div className="t6-badge-dot" />Exam Preparation</div>
          <h2 className="t6-faq-heading">Frequently Asked Questions</h2>
          <div className="t6-faq-rule" />
          {faqs.map((faq,i)=>(
            <div className={`t6-faq-item${openIndex===i?" open":""}`} key={i}>
              <button className="t6-faq-q" onClick={()=>toggle(i)}>
                <span className="t6-faq-q-text">Q{i+1}. {faq.q}</span>
                <span className="t6-faq-icon">{openIndex===i?"▴":"▾"}</span>
              </button>
              <div className={`t6-faq-ans${openIndex===i?" visible":""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
