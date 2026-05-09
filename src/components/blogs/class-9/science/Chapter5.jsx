import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:       #0d1f0d;
    --ink2:      #1a2e1a;
    --muted:     #527252;
    --paper:     #f4faf2;
    --paper2:    #e3f5de;
    --accent:    #2d7a2d;
    --accent2:   #1e5c1e;
    --accent-lt: #d4f4d4;
    --lime:      #65a30d;
    --lime-lt:   #f7fee7;
    --teal:      #0f766e;
    --teal-lt:   #ccfbf1;
    --blue:      #1d4ed8;
    --blue-lt:   #dbeafe;
    --purple:    #7c3aed;
    --purple-lt: #ede9fe;
    --orange:    #c2410c;
    --orange-lt: #ffedd5;
    --rose:      #be123c;
    --rose-lt:   #ffe4e6;
    --gold:      #92400e;
    --gold-lt:   #fef3c7;
    --rule:      #86efac;
    --white:     #ffffff;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .bio-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  /* ═══ HERO ═══ */
  .bio-hero {
    background: linear-gradient(135deg, #020d02 0%, #061806 50%, #082408 100%);
    min-height: 88vh; display: flex; align-items: flex-end;
    position: relative; overflow: hidden; padding: 0 0 64px;
  }
  @media (max-width: 700px) { .bio-hero { min-height: auto; align-items: flex-start; padding: 72px 0 48px; } }
  .bio-hero::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px; background: linear-gradient(90deg, #2d7a2d 0%, #0f766e 30%, #7c3aed 60%, #be123c 85%, #92400e 100%); }
  .bio-hero-dots { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(45,122,45,0.16) 1px, transparent 1px); background-size: 28px 28px; pointer-events: none; }
  .bio-hero-cell {
    position: absolute; top: 50%; right: 4%; transform: translateY(-50%);
    width: clamp(140px, 22vw, 280px); height: clamp(150px, 24vw, 300px);
    border-radius: 60% 40% 55% 45% / 50% 55% 45% 50%;
    border: 1.5px solid rgba(45,122,45,0.18); pointer-events: none;
  }
  .bio-hero-cell::before { content: ''; position: absolute; inset: 18%; border-radius: 50%; border: 1px dashed rgba(45,122,45,0.12); }
  .bio-hero-cell::after  { content: ''; position: absolute; inset: 38%; border-radius: 50%; background: rgba(45,122,45,0.07); }
  .bio-glow-a { position: absolute; top: 15%; left: 5%; width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(45,122,45,0.18) 0%, transparent 68%); pointer-events: none; }
  .bio-glow-b { position: absolute; bottom: 8%; right: 22%; width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle, rgba(15,118,110,0.1) 0%, transparent 70%); pointer-events: none; }
  .bio-hero-bg-num { position: absolute; bottom: -80px; right: -20px; font-family: 'Montserrat', sans-serif; font-size: clamp(200px, 34vw, 480px); font-weight: 900; line-height: 1; color: rgba(255,255,255,0.018); letter-spacing: -0.04em; user-select: none; pointer-events: none; }
  .bio-hero-inner { max-width: 900px; width: 100%; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
  .bio-overline { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #86efac; margin-bottom: 24px; display: flex; align-items: center; gap: 14px; }
  .bio-overline::before, .bio-overline::after { content: ''; flex: 0 0 40px; height: 1px; background: #86efac; }
  .bio-hero-title { font-family: 'Montserrat', sans-serif; font-size: clamp(36px, 7.5vw, 76px); font-weight: 900; color: #fff; line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 32px; }
  .bio-hero-title em { font-style: normal; color: #86efac; }
  .bio-hero-bar { display: flex; flex-wrap: wrap; gap: 0; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; margin-top: 8px; }
  .bio-hero-bar-item { flex: 1 1 150px; padding: 0 24px 0 0; border-right: 1px solid rgba(255,255,255,0.08); margin-right: 24px; }
  .bio-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .bio-bar-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 5px; }
  .bio-bar-value { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.72); }
  @media (max-width: 700px) {
    .bio-hero-bar { gap: 12px; } .bio-hero-bar-item { flex: 1 1 120px; padding: 0 14px 0 0; margin-right: 14px; }
    .bio-bar-label { font-size: 9px; letter-spacing: 0.12em; } .bio-bar-value { font-size: 13px; }
    .bio-overline { font-size: 10px; letter-spacing: 0.16em; }
    .bio-hero-title { font-size: clamp(36px, 10vw, 56px); margin-bottom: 24px; }
    .bio-hero-inner { padding: 0 18px; }
  }

  /* ═══ BODY ═══ */
  .bio-body { max-width: 880px; margin: 0 auto; padding: 72px 32px 100px; }
  @media (max-width: 700px) { .bio-body { padding: 48px 18px 72px; } }

  /* ═══ INTRO ═══ */
  .bio-intro { background: linear-gradient(135deg, #020d02 0%, #082408 100%); border-left: 5px solid #2d7a2d; border-radius: 4px; padding: 36px 40px; margin-bottom: 72px; position: relative; overflow: hidden; }
  .bio-intro::after { content: '🔬'; position: absolute; right: 28px; top: 50%; transform: translateY(-50%); font-size: 88px; opacity: 0.08; }
  .bio-intro p { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 500; color: rgba(255,255,255,0.86); line-height: 1.8; margin: 0 0 14px; }
  .bio-intro p:last-child { margin: 0; }
  .bio-intro strong { color: #86efac; }
  @media (max-width: 700px) { .bio-intro { padding: 24px 20px; } .bio-intro p { font-size: 15px; } }

  /* ═══ SECTION HEADER — new bio pill+rule style ═══ */
  .bio-sec { margin-bottom: 52px; }
  .bio-sec-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--accent-lt); color: var(--accent2); font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; padding: 5px 14px; border-radius: 100px; margin-bottom: 14px; }
  .bio-sec-badge-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }
  .bio-sec-title { font-family: 'Montserrat', sans-serif; font-size: clamp(22px, 4vw, 32px); font-weight: 900; color: var(--ink); letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 6px; }
  .bio-sec-title span { color: var(--accent); }
  .bio-sec-rule { width: 48px; height: 4px; border-radius: 2px; background: linear-gradient(90deg, var(--accent), var(--lime)); margin-bottom: 24px; }
  .bio-body-text { font-family: 'Inter', sans-serif; font-size: 15.5px; color: var(--ink2); line-height: 1.85; margin-bottom: 24px; }
  .bio-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ═══ S1: MILESTONES — horizontal scroll timeline ═══ */
  .bio-timeline-scroll { overflow-x: auto; padding-bottom: 14px; margin-bottom: 36px; -webkit-overflow-scrolling: touch; }
  .bio-timeline-scroll::-webkit-scrollbar { height: 4px; }
  .bio-timeline-scroll::-webkit-scrollbar-track { background: var(--paper2); border-radius: 2px; }
  .bio-timeline-scroll::-webkit-scrollbar-thumb { background: var(--rule); border-radius: 2px; }
  .bio-tl-track { display: flex; gap: 0; align-items: flex-start; min-width: max-content; position: relative; padding-top: 20px; }
  .bio-tl-track::before { content: ''; position: absolute; top: 27px; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--accent), var(--lime), var(--teal)); z-index: 0; }
  .bio-tl-node { display: flex; flex-direction: column; align-items: center; width: 175px; flex-shrink: 0; padding: 0 8px; position: relative; z-index: 1; }
  .bio-tl-dot { width: 16px; height: 16px; border-radius: 50%; border: 3px solid var(--white); flex-shrink: 0; margin-bottom: 14px; box-shadow: 0 0 0 2px var(--rule); }
  .bio-tl-node:nth-child(1) .bio-tl-dot { background: var(--accent); }
  .bio-tl-node:nth-child(2) .bio-tl-dot { background: var(--teal); }
  .bio-tl-node:nth-child(3) .bio-tl-dot { background: var(--blue); }
  .bio-tl-node:nth-child(4) .bio-tl-dot { background: var(--purple); }
  .bio-tl-node:nth-child(5) .bio-tl-dot { background: var(--orange); }
  .bio-tl-node:nth-child(6) .bio-tl-dot { background: var(--rose); }
  .bio-tl-node:nth-child(7) .bio-tl-dot { background: var(--gold); }
  .bio-tl-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 8px; padding: 13px 13px; width: 100%; }
  .bio-tl-name { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; color: var(--ink); margin-bottom: 5px; line-height: 1.3; }
  .bio-tl-contrib { font-family: 'Inter', sans-serif; font-size: 11.5px; color: var(--ink2); line-height: 1.55; }
  .bio-tl-contrib em { font-style: normal; font-weight: 600; color: var(--accent2); }

  /* Cell Theory 3 blocks */
  .bio-theory-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 32px; }
  @media (max-width: 600px) { .bio-theory-row { grid-template-columns: 1fr; } }
  .bio-theory-block { border-radius: 10px; overflow: hidden; border: 1.5px solid var(--rule); background: var(--white); }
  .bio-theory-accent { height: 5px; }
  .bio-theory-block:nth-child(1) .bio-theory-accent { background: var(--accent); }
  .bio-theory-block:nth-child(2) .bio-theory-accent { background: var(--teal); }
  .bio-theory-block:nth-child(3) .bio-theory-accent { background: var(--blue); }
  .bio-theory-inner { padding: 18px 18px; }
  .bio-theory-num { font-family: 'Montserrat', sans-serif; font-size: 38px; font-weight: 900; color: var(--paper2); line-height: 1; margin-bottom: 6px; }
  .bio-theory-text { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); line-height: 1.7; }
  .bio-theory-text strong { font-weight: 600; color: var(--ink); }

  /* ═══ S2: PRO vs EUK — asymmetric contrast ═══ */
  .bio-cell-compare { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-radius: 10px; overflow: hidden; border: 1.5px solid var(--rule); margin-bottom: 32px; }
  @media (max-width: 560px) { .bio-cell-compare { grid-template-columns: 1fr; } }
  .bio-cc-col { padding: 24px 22px; }
  .bio-cc-col.pro { background: linear-gradient(160deg, #1a0a00, #c2410c 140%); }
  .bio-cc-col.euk { background: var(--white); border-left: 1px solid var(--rule); }
  @media (max-width: 560px) { .bio-cc-col.euk { border-left: none; border-top: 1px solid var(--rule); } }
  .bio-cc-tag { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 4px; }
  .bio-cc-col.pro .bio-cc-tag { color: rgba(255,255,255,0.5); }
  .bio-cc-col.euk .bio-cc-tag { color: var(--accent); }
  .bio-cc-name { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; margin-bottom: 16px; }
  .bio-cc-col.pro .bio-cc-name { color: #fff; }
  .bio-cc-col.euk .bio-cc-name { color: var(--ink); }
  .bio-cc-row { display: flex; gap: 9px; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-family: 'Inter', sans-serif; font-size: 13px; line-height: 1.6; }
  .bio-cc-col.euk .bio-cc-row { border-bottom-color: var(--rule); color: var(--ink2); }
  .bio-cc-col.pro .bio-cc-row { color: rgba(255,255,255,0.75); }
  .bio-cc-row:last-child { border-bottom: none; }
  .bio-cc-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
  .bio-cc-col.pro .bio-cc-dot { background: #fdba74; }
  .bio-cc-col.euk .bio-cc-dot { background: var(--accent); }
  .bio-cc-col.pro .bio-cc-row strong { color: #fed7aa; }
  .bio-cc-col.euk .bio-cc-row strong { color: var(--ink); font-weight: 600; }

  /* ═══ S3: DIFFUSION & OSMOSIS ═══ */
  .bio-transport { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 32px; }
  @media (max-width: 560px) { .bio-transport { grid-template-columns: 1fr; } }
  .bio-tp-card { border-radius: 10px; padding: 24px 22px; border: 1.5px solid var(--rule); background: var(--white); position: relative; overflow: hidden; }
  .bio-tp-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; }
  .bio-tp-card.diff::before { background: linear-gradient(90deg, var(--teal), var(--lime)); }
  .bio-tp-card.osmo::before { background: linear-gradient(90deg, var(--purple), var(--blue)); }
  .bio-tp-icon { font-size: 36px; margin-bottom: 10px; display: block; }
  .bio-tp-title { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; color: var(--ink); margin-bottom: 8px; }
  .bio-tp-def { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); line-height: 1.75; margin-bottom: 12px; }
  .bio-tp-def strong { font-weight: 600; color: var(--ink); }
  .bio-tp-key { border-radius: 6px; padding: 9px 12px; font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600; line-height: 1.5; }
  .bio-tp-card.diff .bio-tp-key { background: var(--teal-lt); color: var(--teal); }
  .bio-tp-card.osmo .bio-tp-key { background: var(--purple-lt); color: var(--purple); }

  /* ═══ S4: ORGANELLES — 2-col magazine cards ═══ */
  .bio-organelle-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 36px; }
  @media (max-width: 580px) { .bio-organelle-grid { grid-template-columns: 1fr; } }
  .bio-org-card { border-radius: 10px; overflow: hidden; border: 1.5px solid var(--rule); background: var(--white); }
  .bio-org-top { padding: 16px 18px; display: flex; align-items: center; gap: 12px; }
  .bio-org-card.cwall   .bio-org-top { background: linear-gradient(135deg, #003020, #15803d); }
  .bio-org-card.plasma  .bio-org-top { background: linear-gradient(135deg, #001430, #1d4ed8); }
  .bio-org-card.cyto    .bio-org-top { background: linear-gradient(135deg, #00293a, #0f766e); }
  .bio-org-card.nucleus .bio-org-top { background: linear-gradient(135deg, #1e0060, #7c3aed); }
  .bio-org-card.vacuole .bio-org-top { background: linear-gradient(135deg, #2a0018, #be123c); }
  .bio-org-card.er      .bio-org-top { background: linear-gradient(135deg, #1a1200, #92400e); }
  .bio-org-card.golgi   .bio-org-top { background: linear-gradient(135deg, #1a0800, #c2410c); }
  .bio-org-card.lyso    .bio-org-top { background: linear-gradient(135deg, #2a0000, #b91c1c); }
  .bio-org-card.mito    .bio-org-top { background: linear-gradient(135deg, #001a10, #15803d); }
  .bio-org-card.plastid .bio-org-top { background: linear-gradient(135deg, #0d2e00, #65a30d); }
  .bio-org-emoji { font-size: 28px; flex-shrink: 0; }
  .bio-org-tag  { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 2px; }
  .bio-org-name { font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 900; color: #fff; line-height: 1.2; }
  .bio-org-bottom { padding: 14px 18px; }
  .bio-org-desc { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2); line-height: 1.7; margin-bottom: 10px; }
  .bio-org-desc strong { font-weight: 600; color: var(--ink); }
  .bio-org-fns { display: flex; flex-wrap: wrap; gap: 5px; }
  .bio-fn-tag { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 100px; }
  .bio-org-card.cwall   .bio-fn-tag { background: #dcfce7; color: #15803d; }
  .bio-org-card.plasma  .bio-fn-tag { background: var(--blue-lt); color: var(--blue); }
  .bio-org-card.cyto    .bio-fn-tag { background: var(--teal-lt); color: var(--teal); }
  .bio-org-card.nucleus .bio-fn-tag { background: var(--purple-lt); color: var(--purple); }
  .bio-org-card.vacuole .bio-fn-tag { background: var(--rose-lt); color: var(--rose); }
  .bio-org-card.er      .bio-fn-tag { background: var(--gold-lt); color: var(--gold); }
  .bio-org-card.golgi   .bio-fn-tag { background: var(--orange-lt); color: var(--orange); }
  .bio-org-card.lyso    .bio-fn-tag { background: #fee2e2; color: #b91c1c; }
  .bio-org-card.mito    .bio-fn-tag { background: #dcfce7; color: #15803d; }
  .bio-org-card.plastid .bio-fn-tag { background: var(--lime-lt); color: var(--lime); }

  /* ═══ S5: NUCLEUS dark panel ═══ */
  .bio-nucleus-banner { background: linear-gradient(135deg, #020d02, #082408); border-radius: 10px; padding: 28px 30px; margin-bottom: 28px; position: relative; overflow: hidden; }
  .bio-nucleus-banner::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(134,239,172,0.06) 1px, transparent 1px); background-size: 22px 22px; }
  .bio-nb-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(134,239,172,0.6); margin-bottom: 18px; position: relative; }
  .bio-nb-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; position: relative; }
  @media (max-width: 500px) { .bio-nb-grid { grid-template-columns: 1fr; } }
  .bio-nb-part { background: rgba(255,255,255,0.05); border: 1px solid rgba(134,239,172,0.14); border-radius: 8px; padding: 14px 16px; }
  .bio-nb-part-name { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: #86efac; margin-bottom: 5px; }
  .bio-nb-part-text { font-family: 'Inter', sans-serif; font-size: 12.5px; color: rgba(255,255,255,0.62); line-height: 1.62; }
  @media (max-width: 700px) { .bio-nucleus-banner { padding: 20px 16px; } }

  /* Chromosome types */
  .bio-chrom-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 28px; }
  @media (max-width: 580px) { .bio-chrom-row { grid-template-columns: repeat(2, 1fr); } }
  .bio-chrom-pill { background: var(--white); border: 1.5px solid var(--rule); border-radius: 8px; padding: 14px 12px; text-align: center; }
  .bio-chrom-pill:nth-child(1) { border-bottom: 3px solid var(--accent); }
  .bio-chrom-pill:nth-child(2) { border-bottom: 3px solid var(--teal); }
  .bio-chrom-pill:nth-child(3) { border-bottom: 3px solid var(--orange); }
  .bio-chrom-pill:nth-child(4) { border-bottom: 3px solid var(--rose); }
  .bio-cp-emoji { font-size: 20px; margin-bottom: 6px; display: block; }
  .bio-cp-name { font-family: 'Poppins', sans-serif; font-size: 12.5px; font-weight: 700; margin-bottom: 4px; }
  .bio-chrom-pill:nth-child(1) .bio-cp-name { color: var(--accent); }
  .bio-chrom-pill:nth-child(2) .bio-cp-name { color: var(--teal); }
  .bio-chrom-pill:nth-child(3) .bio-cp-name { color: var(--orange); }
  .bio-chrom-pill:nth-child(4) .bio-cp-name { color: var(--rose); }
  .bio-cp-pos { font-family: 'Inter', sans-serif; font-size: 11.5px; color: var(--muted); line-height: 1.5; }

  /* ═══ S6: PLANT vs ANIMAL — horizontal scroll table ═══ */
  .bio-scroll-hint { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 600; color: var(--muted); margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
  .bio-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; margin-bottom: 32px; border-radius: 10px; border: 1.5px solid var(--rule); }
  .bio-table-wrap::-webkit-scrollbar { height: 5px; }
  .bio-table-wrap::-webkit-scrollbar-track { background: var(--paper2); }
  .bio-table-wrap::-webkit-scrollbar-thumb { background: var(--rule); border-radius: 3px; }
  .bio-cmp-table { width: 100%; min-width: 520px; border-collapse: collapse; }
  .bio-cmp-table th { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 13px 16px; color: #fff; text-align: left; white-space: nowrap; }
  .bio-cmp-table th:nth-child(1) { background: var(--ink2); }
  .bio-cmp-table th:nth-child(2) { background: #15803d; }
  .bio-cmp-table th:nth-child(3) { background: #1d4ed8; }
  .bio-cmp-table td { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2); padding: 10px 16px; border-top: 1px solid var(--rule); border-right: 1px solid var(--rule); white-space: nowrap; }
  .bio-cmp-table td:first-child { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ink); font-size: 12.5px; }
  .bio-cmp-table td:last-child { border-right: none; }
  .bio-cmp-table tr:nth-child(even) td { background: var(--paper2); }
  .bio-cmp-table .yes { color: #15803d; font-weight: 700; }
  .bio-cmp-table .no  { color: #b91c1c; font-weight: 700; }

  /* ═══ DIVIDER — organic leaf ═══ */
  .bio-divider { margin: 52px 0; display: flex; align-items: center; gap: 14px; }
  .bio-divider::before, .bio-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .bio-divider-leaf { width: 28px; height: 16px; background: var(--accent); border-radius: 0 50% 0 50%; flex-shrink: 0; transform: rotate(45deg); }

  /* ═══ PULL QUOTE ═══ */
  .bio-quote { border-left: 5px solid var(--accent); background: var(--accent-lt); padding: 20px 28px; margin: 32px 0; border-radius: 0 8px 8px 0; }
  .bio-quote p { font-family: 'Poppins', sans-serif; font-size: 15.5px; font-weight: 600; color: var(--accent2); line-height: 1.7; font-style: italic; margin: 0; }

  /* ═══ FAQ ═══ */
  .bio-faq-label { display: inline-flex; align-items: center; gap: 8px; background: var(--accent-lt); color: var(--accent2); font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; padding: 5px 14px; border-radius: 100px; margin-bottom: 14px; }
  .bio-faq-heading { font-family: 'Montserrat', sans-serif; font-size: clamp(24px, 4vw, 34px); font-weight: 900; color: var(--ink); letter-spacing: -0.02em; margin-bottom: 6px; }
  .bio-faq-rule { width: 48px; height: 4px; border-radius: 2px; background: linear-gradient(90deg, var(--accent), var(--lime)); margin-bottom: 28px; }
  .bio-faq-item { border: 1.5px solid var(--rule); border-radius: 8px; margin-bottom: 10px; overflow: hidden; background: var(--white); transition: border-color 0.2s, box-shadow 0.2s; }
  .bio-faq-item.open { border-color: var(--accent); box-shadow: 0 2px 12px rgba(45,122,45,0.1); }
  .bio-faq-q { width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 18px 22px; text-align: left; gap: 16px; }
  .bio-faq-q-text { font-family: 'Poppins', sans-serif; font-size: 14.5px; font-weight: 600; color: var(--ink); line-height: 1.5; }
  .bio-faq-item.open .bio-faq-q-text { color: var(--accent); }
  .bio-faq-icon { font-size: 20px; color: var(--accent); flex-shrink: 0; line-height: 1; }
  .bio-faq-ans { font-family: 'Inter', sans-serif; font-size: 14.5px; color: var(--ink2); line-height: 1.85; padding: 0 22px; max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; }
  .bio-faq-ans.visible { max-height: 1000px; padding: 0 22px 20px; }
  .bio-faq-ans strong { color: var(--accent2); font-weight: 600; }
  @media (max-width: 700px) { .bio-faq-q { padding: 16px 16px; } .bio-faq-ans.visible { padding: 0 16px 18px; } }
`;

const faqs = [
  { q: "What is a cell? What are its key properties?",
    a: (<>A <strong>cell</strong> is the smallest structural and functional unit of life, capable of performing all living functions independently.<br /><br />Key properties:<br />• Too small to be seen with the naked eye — requires a microscope.<br />• Shape and size vary between organisms and within the same organism.<br />• All living cells perform: <strong>respiration, growth, metabolism, and cell division</strong>.<br />• Cells arise only from pre-existing cells (Virchow's principle).<br />• All cells share a fundamental structure: plasma membrane, cytoplasm, and genetic material.</>) },
  { q: "What is the Cell Theory? Who proposed it?",
    a: (<>The <strong>Cell Theory</strong> was proposed by <strong>Schleiden &amp; Schwann</strong> (1838–39) and later extended by <strong>Virchow</strong> (1855):<br /><br />1. All plants and animals are composed of <strong>cells</strong>.<br />2. The <strong>cell is the basic unit of life</strong>.<br />3. <strong>All cells arise from pre-existing cells</strong> ("Omnis cellula e cellula").<br /><br />The third postulate explained cell reproduction and ruled out spontaneous generation.</>) },
  { q: "What is the difference between prokaryotic and eukaryotic cells?",
    a: (<><strong>Prokaryotic:</strong> No membrane-bound nucleus (nucleoid only), no membrane-bound organelles, unicellular (bacteria, algae), smaller and simpler.<br /><br /><strong>Eukaryotic:</strong> True nucleus with nuclear membrane, membrane-bound organelles present, usually multicellular. <strong>Yeast</strong> is a unicellular eukaryote — an important exception.</>) },
  { q: "What is the cell wall? What are its functions?",
    a: (<>The <strong>cell wall</strong> is the outermost rigid layer in plant cells, fungal cells, and most bacteria. <strong>Absent in animal cells.</strong><br /><br />Composition: Plant = <strong>cellulose</strong>; Bacteria = <strong>peptidoglycan</strong>.<br /><br />Functions: protects organelles, maintains definite cell shape, prevents osmotic bursting in dilute solutions, allows free passage of water and small molecules.</>) },
  { q: "What is the plasma membrane? What are its functions?",
    a: (<>The <strong>plasma membrane</strong> is the outermost covering of all animal cells, and lies just inside the cell wall in plant cells. It is a <strong>fluid mosaic</strong> of phospholipids and proteins — <strong>selectively permeable</strong>.<br /><br />Functions: selective transport (in/out), endocytosis (engulfs material), exocytosis (expels material), cell communication and signalling, protects intracellular contents.</>) },
  { q: "What is the difference between diffusion and osmosis?",
    a: (<><strong>Diffusion:</strong> Spontaneous movement of any molecules from <strong>high → low concentration</strong>. No membrane needed. Examples: O₂ entering blood, CO₂ leaving cells, perfume spreading.<br /><br /><strong>Osmosis:</strong> Movement of <strong>water only</strong> from dilute (high water concentration) to concentrated solution (low water concentration) through a <strong>selectively permeable membrane</strong>.<br /><br />Endosmosis = water enters cell (hypotonic solution) → turgid. Exosmosis = water leaves cell (hypertonic solution) → plasmolysis.</>) },
  { q: "What is the nucleus? Describe its structure and functions.",
    a: (<>The <strong>nucleus</strong> is the control centre ("director") of the cell. It contains the cell's genetic material and directs all activities.<br /><br />Structure: <strong>Nuclear membrane</strong> (double, with pores) → <strong>Nucleoplasm</strong> (fluid inside) → <strong>Nucleolus</strong> (makes rRNA/ribosomes) → <strong>Chromatin</strong> (DNA + histones, condenses into chromosomes during division).<br /><br />Functions: controls metabolism, stores hereditary DNA, directs protein synthesis via mRNA.</>) },
  { q: "What are chromosomes? Name and describe the 4 types.",
    a: (<><strong>Chromosomes</strong> are condensed chromatin threads visible during cell division. Each carries genes (DNA). The <strong>centromere</strong> is the primary constriction.<br /><br />Based on centromere position:<br />1. <strong>Metacentric</strong> — middle; equal arms; V-shaped.<br />2. <strong>Sub-metacentric</strong> — off-centre; unequal arms; L-shaped.<br />3. <strong>Acrocentric</strong> — near one end; one very short arm.<br />4. <strong>Telocentric</strong> — at terminal end; rod-shaped, one arm.<br /><br />A <strong>satellite</strong> = small segment separated from the main chromosome by a secondary constriction.</>) },
  { q: "What is mitochondria? Why is it called the powerhouse of the cell?",
    a: (<><strong>Mitochondria</strong> are double membrane-bound organelles in all eukaryotic cells.<br /><br />Structure: Smooth outer membrane + inner membrane folded into <strong>cristae</strong> (↑ surface area) + matrix (contains enzymes, <strong>its own DNA</strong> and ribosomes).<br /><br />Called the <strong>"Powerhouse of the Cell"</strong> because it is the site of <strong>aerobic cellular respiration</strong>, producing <strong>ATP</strong> — the universal energy currency. Its own DNA supports the endosymbiotic theory of its origin.</>) },
  { q: "What are plastids? Where are they found and what are their types?",
    a: (<><strong>Plastids</strong> are large organelles found <strong>only in plant cells</strong> (absent in animal cells). Have their own DNA and ribosomes.<br /><br />Types:<br />1. <strong>Chloroplasts</strong> (green) — contain <strong>chlorophyll</strong>; site of <strong>photosynthesis</strong>.<br />2. <strong>Chromoplasts</strong> (coloured) — contain <strong>carotene, xanthophyll</strong>; give colour to flowers and fruits.<br />3. <strong>Leucoplasts</strong> (colourless) — store starch, oils, or proteins.<br /><br />Functions: photosynthesis, colouring of plant parts, food storage.</>) },
  { q: "What is the endoplasmic reticulum? Compare SER and RER.",
    a: (<>The <strong>ER</strong> is a network of membranous tubules, vesicles, and cisternae — the cell's internal transport highway.<br /><br /><strong>SER</strong> (no ribosomes): synthesises <strong>fats &amp; lipids</strong>, detoxifies drugs, carbohydrate metabolism.<br /><strong>RER</strong> (ribosomes attached): site of <strong>protein synthesis &amp; transport</strong>, glycosylation; sends proteins to Golgi.</>) },
  { q: "What is the Golgi apparatus? What are lysosomes?",
    a: (<><strong>Golgi apparatus</strong> (Camillo Golgi, 1898): stacked flattened cisternae. Called the "post office" of the cell. Functions: <strong>packages, modifies, and ships</strong> cell products; forms lysosomes.<br /><br /><strong>Lysosomes</strong>: membrane-bound sacs with <strong>digestive (hydrolytic) enzymes</strong>. Called the <strong>"suicidal bag"</strong> — if ruptured, enzymes digest the cell itself (autolysis). Functions: digests foreign material, removes worn-out organelles, keeps cell clean.</>) },
];

export default function FundamentalUnitOfLife() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const organelles = [
    { cls:"cwall",   icon:"🧱", tag:"Plants · Fungi · Bacteria only",    name:"Cell Wall",           desc:<>Outermost rigid layer. Plant = <strong>cellulose</strong>; Bacteria = <strong>peptidoglycan</strong>. Absent in animal cells.</>,               fns:["Structural support","Prevents osmotic bursting","Protects organelles"] },
    { cls:"plasma",  icon:"🫧", tag:"All cells · Selectively permeable",  name:"Plasma Membrane",     desc:<><strong>Fluid mosaic</strong> of phospholipids and proteins. Controls entry/exit. Site of endocytosis and exocytosis.</>,                    fns:["Selective transport","Endocytosis & Exocytosis","Cell signalling"] },
    { cls:"cyto",    icon:"🌊", tag:"Fluid matrix of the cell",           name:"Cytoplasm",            desc:<>Fluid containing all organelles. <strong>Cytoskeleton</strong> within maintains cell shape. Site of glycolysis and many reactions.</>,       fns:["Site of reactions","Cytoskeleton support","Cytoplasmic streaming"] },
    { cls:"nucleus", icon:"🔵", tag:"\"Director\" · Contains DNA",        name:"Nucleus",              desc:<><strong>Double nuclear membrane</strong> with pores. Contains nucleoplasm, nucleolus, and chromatin (DNA + histones).</>,                   fns:["Controls cell activities","Stores hereditary DNA","Nucleolus → rRNA"] },
    { cls:"vacuole", icon:"💧", tag:"Large in plants · Small in animals", name:"Vacuole",              desc:<>Enclosed by <strong>tonoplast</strong>. Single large vacuole in plants; small and numerous in animal cells.</>,                            fns:["Turgidity in plants","Stores sugars & amino acids","Expels excess water"] },
    { cls:"er",      icon:"🕸️", tag:"SER · RER",                          name:"Endoplasmic Reticulum",desc:<><strong>RER</strong> (ribosomes): protein transport, glycosylation. <strong>SER</strong>: lipid synthesis, detoxification of drugs.</>,   fns:["Protein transport (RER)","Lipid synthesis (SER)","Detoxification (SER)"] },
    { cls:"golgi",   icon:"📦", tag:"\"Post office\" of cell · 1898",     name:"Golgi Apparatus",     desc:<>Stacked cisternae. <strong>Packages, modifies, and ships</strong> cell products. Also forms lysosomes.</>,                                  fns:["Packaging & secretion","Forms lysosomes","Protein modification"] },
    { cls:"lyso",    icon:"💥", tag:"\"Suicidal bag\" of cell",           name:"Lysosome",             desc:<>Contains <strong>digestive enzymes</strong>. Keeps cell clean. Can digest own cell when ruptured (autolysis).</>,                           fns:["Digests foreign material","Removes worn organelles","Autolysis if ruptured"] },
    { cls:"mito",    icon:"⚡", tag:"\"Powerhouse of the cell\"",          name:"Mitochondria",         desc:<><strong>Double membrane</strong> with cristae. Has its own DNA and ribosomes. Site of aerobic respiration → <strong>ATP</strong>.</>,      fns:["Cellular respiration","Produces ATP","Own DNA — semi-autonomous"] },
    { cls:"plastid", icon:"🌿", tag:"Plants only · Own DNA & ribosomes",  name:"Plastids",             desc:<><strong>Chloroplasts</strong> (photosynthesis), <strong>Chromoplasts</strong> (colour pigments), <strong>Leucoplasts</strong> (food storage).</>,fns:["Photosynthesis (chloro)","Plant colour (chromo)","Food storage (leuco)"] },
  ];

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="bio-root">

        {/* HERO */}
        <div className="bio-hero">
          <div className="bio-hero-dots" />
          <div className="bio-hero-cell" />
          <div className="bio-glow-a" />
          <div className="bio-glow-b" />
          <div className="bio-hero-bg-num">5</div>
          <div className="bio-hero-inner">
            <div className="bio-overline">Class 9 · Science · Chapter 5</div>
            <h1 className="bio-hero-title">The Fundamental<br /><em>Unit of Life</em></h1>
            <div className="bio-hero-bar">
              {[["Subject","Science — Biology"],["Topics","Cell · Organelles · Nucleus"],["Board","CBSE · NCERT"],["FAQs","12 Questions"]].map(([l,v])=>(
                <div className="bio-hero-bar-item" key={l}><div className="bio-bar-label">{l}</div><div className="bio-bar-value">{v}</div></div>
              ))}
            </div>
          </div>
        </div>

        <div className="bio-body">

          {/* Intro */}
          <div className="bio-intro">
            <p>What is the smallest unit of life? A <strong>cell</strong>. Every living organism — from a single bacterium to a blue whale — is built from cells. Some organisms are just one cell; others have trillions working in perfect coordination.</p>
            <p>This chapter explores what cells are made of, how they're organised, and how each organelle contributes to the cell's survival, growth, and reproduction.</p>
          </div>

          {/* S1: Milestones & Cell Theory */}
          <div className="bio-sec">
            <div className="bio-sec-badge"><div className="bio-sec-badge-dot" />History</div>
            <h2 className="bio-sec-title">Milestones &amp; <span>Cell Theory</span></h2>
            <div className="bio-sec-rule" />
            <p className="bio-body-text">Our understanding of cells grew over centuries through discoveries by biologists, microscope inventors, and theorists — each building on the last.</p>
            <div className="bio-timeline-scroll">
              <div className="bio-tl-track">
                {[
                  {name:"Robert Hooke",      contrib:<>Discovered cells (1665) in cork; coined the term <em>"cell"</em></>},
                  {name:"A. van Leeuwenhoek",contrib:<>Built first simple microscope with <em>biconvex lenses</em>; discovered microorganisms</>},
                  {name:"Robert Brown",       contrib:<>Discovered the <em>nucleus</em> inside plant cells (1831)</>},
                  {name:"Purkinje",           contrib:<>Coined the term <em>"protoplasm"</em> for living cell substance</>},
                  {name:"Schleiden & Schwann",contrib:<>Proposed the <em>Cell Theory</em> — all organisms are made of cells (1838–39)</>},
                  {name:"Rudolf Virchow",     contrib:<>Extended it — <em>all cells arise from pre-existing cells</em> (1855)</>},
                  {name:"Camillo Golgi",      contrib:<>First described the <em>Golgi apparatus</em> (1898)</>},
                ].map((n,i)=>(
                  <div className="bio-tl-node" key={i}>
                    <div className="bio-tl-dot" />
                    <div className="bio-tl-card">
                      <div className="bio-tl-name">{n.name}</div>
                      <div className="bio-tl-contrib">{n.contrib}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="bio-body-text" style={{marginBottom:"14px"}}>The <strong>Cell Theory</strong> has three core postulates:</p>
            <div className="bio-theory-row">
              {[
                {n:"01", text:<>All plants and animals are composed of <strong>cells</strong> — the cell is the structural unit of all living organisms.</>},
                {n:"02", text:<>The <strong>cell is the basic unit of life</strong> — the smallest entity capable of performing all living functions.</>},
                {n:"03", text:<>All cells arise from <strong>pre-existing cells</strong> — "Omnis cellula e cellula" (Virchow, 1855).</>},
              ].map((b,i)=>(
                <div className="bio-theory-block" key={i}>
                  <div className="bio-theory-accent" />
                  <div className="bio-theory-inner">
                    <div className="bio-theory-num">{b.n}</div>
                    <div className="bio-theory-text">{b.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bio-divider"><div className="bio-divider-leaf" /></div>

          {/* S2: Pro vs Euk */}
          <div className="bio-sec">
            <div className="bio-sec-badge"><div className="bio-sec-badge-dot" />Classification</div>
            <h2 className="bio-sec-title">Prokaryotic <span>vs Eukaryotic</span> Cell</h2>
            <div className="bio-sec-rule" />
            <p className="bio-body-text">Cells are fundamentally classified into two types based on the organisation of their nuclear material.</p>
            <div className="bio-cell-compare">
              <div className="bio-cc-col pro">
                <div className="bio-cc-tag">Primitive · No true nucleus</div>
                <div className="bio-cc-name">🦠 Prokaryotic</div>
                {[
                  <>Nuclear region = <strong>nucleoid</strong> — no nuclear membrane</>,
                  "No membrane-bound organelles",
                  "Unicellular: bacteria, blue-green algae",
                  "Smaller, simpler structure",
                  "Cell wall present (peptidoglycan in bacteria)",
                ].map((t,i)=><div className="bio-cc-row" key={i}><div className="bio-cc-dot"/><span>{t}</span></div>)}
              </div>
              <div className="bio-cc-col euk">
                <div className="bio-cc-tag">Advanced · True nucleus</div>
                <div className="bio-cc-name">🌿 Eukaryotic</div>
                {[
                  <>Well-defined nucleus with <strong>nuclear membrane</strong></>,
                  "Membrane-bound organelles present",
                  <><strong>Yeast</strong> = unicellular eukaryote (exception)</>,
                  "Larger, more complex structure",
                  "Cell wall in plants (cellulose); absent in animals",
                ].map((t,i)=><div className="bio-cc-row" key={i}><div className="bio-cc-dot"/><span>{t}</span></div>)}
              </div>
            </div>
          </div>

          <div className="bio-divider"><div className="bio-divider-leaf" /></div>

          {/* S3: Diffusion & Osmosis */}
          <div className="bio-sec">
            <div className="bio-sec-badge"><div className="bio-sec-badge-dot" />Transport</div>
            <h2 className="bio-sec-title">Diffusion <span>&amp; Osmosis</span></h2>
            <div className="bio-sec-rule" />
            <p className="bio-body-text">Cells continuously exchange materials with their environment. Two passive transport processes govern this movement.</p>
            <div className="bio-transport">
              <div className="bio-tp-card diff">
                <span className="bio-tp-icon">↔️</span>
                <div className="bio-tp-title">Diffusion</div>
                <div className="bio-tp-def">Spontaneous movement of molecules from a region of <strong>high concentration</strong> to a region of <strong>low concentration</strong>. No membrane required. Continues until equilibrium.</div>
                <div className="bio-tp-key">Examples: O₂ entering blood from lungs · CO₂ leaving cells · perfume spreading in a room</div>
              </div>
              <div className="bio-tp-card osmo">
                <span className="bio-tp-icon">🌊</span>
                <div className="bio-tp-title">Osmosis</div>
                <div className="bio-tp-def">Movement of <strong>water molecules only</strong> from high concentration (dilute) to low concentration (concentrated) through a <strong>selectively permeable membrane</strong>.</div>
                <div className="bio-tp-key">Endosmosis: water enters → turgid cell · Exosmosis: water leaves → plasmolysis</div>
              </div>
            </div>
          </div>

          <div className="bio-divider"><div className="bio-divider-leaf" /></div>

          {/* S4: Organelles */}
          <div className="bio-sec">
            <div className="bio-sec-badge"><div className="bio-sec-badge-dot" />Structural Components</div>
            <h2 className="bio-sec-title">Cell Organelles — <span>Structure &amp; Function</span></h2>
            <div className="bio-sec-rule" />
            <p className="bio-body-text">Each organelle is a specialised structure with a specific role — together they keep the cell alive, functional, and able to reproduce.</p>
            <div className="bio-organelle-grid">
              {organelles.map((o,i)=>(
                <div className={`bio-org-card ${o.cls}`} key={i}>
                  <div className="bio-org-top">
                    <span className="bio-org-emoji">{o.icon}</span>
                    <div>
                      <div className="bio-org-tag">{o.tag}</div>
                      <div className="bio-org-name">{o.name}</div>
                    </div>
                  </div>
                  <div className="bio-org-bottom">
                    <div className="bio-org-desc">{o.desc}</div>
                    <div className="bio-org-fns">{o.fns.map((f,j)=><span className="bio-fn-tag" key={j}>{f}</span>)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bio-divider"><div className="bio-divider-leaf" /></div>

          {/* S5: Nucleus */}
          <div className="bio-sec">
            <div className="bio-sec-badge"><div className="bio-sec-badge-dot" />Control Centre</div>
            <h2 className="bio-sec-title">Nucleus — <span>Structure &amp; Chromosomes</span></h2>
            <div className="bio-sec-rule" />
            <p className="bio-body-text">The nucleus is the most important organelle — the <strong>director of the cell</strong>. It stores DNA and controls all cellular reproduction and chemical activities.</p>
            <div className="bio-nucleus-banner">
              <div className="bio-nb-label">⬦ Parts of the Nucleus</div>
              <div className="bio-nb-grid">
                {[
                  {name:"Nuclear Membrane", text:"Double-layered membrane enclosing the nucleus. Contains nuclear pores for selective transport."},
                  {name:"Nucleoplasm",      text:"Fluid matrix inside the nuclear membrane. Contains nucleoli and chromatin."},
                  {name:"Nucleolus",        text:"Dense body inside the nucleus. Site of ribosomal RNA (rRNA) synthesis — produces ribosomes."},
                  {name:"Chromatin",        text:"DNA + histone proteins + non-histone proteins + RNA. Condenses into chromosomes during cell division."},
                ].map((p,i)=>(
                  <div className="bio-nb-part" key={i}>
                    <div className="bio-nb-part-name">{p.name}</div>
                    <div className="bio-nb-part-text">{p.text}</div>
                  </div>
                ))}
              </div>
            </div>
            <p className="bio-body-text" style={{marginBottom:"14px"}}>Chromosomes are classified into <strong>4 types</strong> based on centromere position:</p>
            <div className="bio-chrom-row">
              {[
                {icon:"⚖️", name:"Metacentric",      pos:"Centromere at middle — two equal arms, V-shaped."},
                {icon:"↙️", name:"Sub-metacentric",  pos:"Centromere off-centre — unequal arms, L-shaped."},
                {icon:"📍", name:"Acrocentric",      pos:"Centromere near one end — one very short arm."},
                {icon:"▬",  name:"Telocentric",      pos:"Centromere at terminal end — rod-shaped, one arm."},
              ].map((c,i)=>(
                <div className="bio-chrom-pill" key={i}>
                  <span className="bio-cp-emoji">{c.icon}</span>
                  <div className="bio-cp-name">{c.name}</div>
                  <div className="bio-cp-pos">{c.pos}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bio-divider"><div className="bio-divider-leaf" /></div>

          {/* S6: Plant vs Animal — scrollable */}
          <div className="bio-sec">
            <div className="bio-sec-badge"><div className="bio-sec-badge-dot" />Comparison</div>
            <h2 className="bio-sec-title">Plant Cell <span>vs Animal Cell</span></h2>
            <div className="bio-sec-rule" />
            <p className="bio-body-text">Both plant and animal cells are eukaryotic and share many organelles, but differ in several key structural features.</p>
            <div className="bio-scroll-hint">← Swipe to see full table on mobile →</div>
            <div className="bio-table-wrap">
              <table className="bio-cmp-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>🌿 Plant Cell</th>
                    <th>🐾 Animal Cell</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Cell Wall",             "✔ Present (cellulose)",       "✘ Absent",           "yes","no"],
                    ["Plasma Membrane",        "✔ Present",                   "✔ Present",          "yes","yes"],
                    ["Plastids",              "✔ Present",                   "✘ Absent",           "yes","no"],
                    ["Large Central Vacuole", "✔ Present (single, large)",   "✘ Small, numerous",  "yes","no"],
                    ["Lysosomes",             "Rare / absent",               "✔ Present",          "","yes"],
                    ["Centrioles",            "✘ Absent",                    "✔ Present",          "no","yes"],
                    ["Chloroplasts",          "✔ Present",                   "✘ Absent",           "yes","no"],
                    ["Mitochondria",          "✔ Present",                   "✔ Present",          "yes","yes"],
                    ["Golgi Apparatus",       "✔ Present",                   "✔ Present",          "yes","yes"],
                    ["Nucleus",               "✔ Present",                   "✔ Present",          "yes","yes"],
                  ].map(([feat,p,a,pc,ac])=>(
                    <tr key={feat}>
                      <td>{feat}</td>
                      <td className={pc==="yes"?"yes":pc==="no"?"no":""}>{p}</td>
                      <td className={ac==="yes"?"yes":ac==="no"?"no":""}>{a}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bio-quote">
            <p>"The cell is the theatre of every physiological act. Understanding its organelles is understanding life itself — from how energy is made, to how hereditary information is stored and passed on to every new generation."</p>
          </div>

          {/* FAQ */}
          <div className="bio-divider"><div className="bio-divider-leaf" /></div>
          <div className="bio-faq-label"><div className="bio-sec-badge-dot" />Exam Preparation</div>
          <h2 className="bio-faq-heading">Frequently Asked Questions</h2>
          <div className="bio-faq-rule" />
          {faqs.map((faq,i)=>(
            <div className={`bio-faq-item${openIndex===i?" open":""}`} key={i}>
              <button className="bio-faq-q" onClick={()=>toggle(i)}>
                <span className="bio-faq-q-text">Q{i+1}. {faq.q}</span>
                <span className="bio-faq-icon">{openIndex===i?"▴":"▾"}</span>
              </button>
              <div className={`bio-faq-ans${openIndex===i?" visible":""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
