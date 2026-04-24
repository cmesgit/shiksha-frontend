import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --photon:     #0ea5e9;
    --photon2:    #0369a1;
    --photon3:    #082f49;
    --photon-lt:  #e0f2fe;
    --photon-mid: #7dd3fc;
    --prism:      #8b5cf6;
    --prism2:     #5b21b6;
    --prism-lt:   #ede9fe;
    --prism-mid:  #c4b5fd;
    --amber:      #d97706;
    --amber2:     #92400e;
    --amber-lt:   #fffbeb;
    --amber-mid:  #fcd34d;
    --red:        #dc2626;
    --red-lt:     #fee2e2;
    --red-mid:    #fca5a5;
    --teal:       #0d9488;
    --teal-lt:    #ccfbf1;
    --teal-mid:   #5eead4;
    --paper:      #f0f8ff;
    --paper2:     #e1f0fa;
    --ink:        #030d18;
    --ink2:       #082035;
    --muted:      #4a6a80;
    --rule:       #bae0f5;
    --white:      #ffffff;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .lrr-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  /* ═══ HERO ═══ */
  .lrr-hero {
    background: linear-gradient(160deg, #010810 0%, #020f1e 45%, #041828 100%);
    min-height: 100vh; position: relative; overflow: hidden;
    display: flex; flex-direction: column; justify-content: center;
    padding: 80px 0 72px;
  }
  .lrr-hero::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 5px;
    background: linear-gradient(90deg,#8b5cf6 0%,#0ea5e9 25%,#06b6d4 50%,#10b981 70%,#f59e0b 85%,#ef4444 100%);
  }
  /* Light-ray grid */
  .lrr-hero-grid { display: none; }
  /* Prism glow blobs */
  .lrr-glow-1 { position:absolute; top:-8%; left:8%; width:520px; height:520px; border-radius:50%; background:radial-gradient(circle,rgba(14,165,233,0.15) 0%,transparent 65%); pointer-events:none; }
  .lrr-glow-2 { position:absolute; bottom:0; right:3%; width:420px; height:420px; border-radius:50%; background:radial-gradient(circle,rgba(139,92,246,0.12) 0%,transparent 65%); pointer-events:none; }
  .lrr-glow-3 { position:absolute; top:35%; right:28%; width:300px; height:300px; border-radius:50%; background:radial-gradient(circle,rgba(6,182,212,0.09) 0%,transparent 65%); pointer-events:none; }

  /* Prism SVG right side */
  .lrr-hero-prism { position:absolute; right:0; top:0; width:48%; height:100%; pointer-events:none; opacity:0.35; }

  .lrr-hero-inner { max-width:960px; width:100%; margin:0 auto; padding:0 40px; position:relative; z-index:2; }

  .lrr-subject-pill {
    display:inline-flex; align-items:center; gap:8px;
    border:1px solid rgba(14,165,233,0.4); background:rgba(14,165,233,0.1);
    border-radius:6px; padding:6px 16px; margin-bottom:28px;
    font-family:'Poppins',sans-serif; font-size:11px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; color:var(--photon-mid);
  }
  .lrr-pill-dot { width:6px; height:6px; border-radius:50%; background:var(--photon-mid); animation:lrr-pulse 2s infinite; }
  @keyframes lrr-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }

  .lrr-hero-eyebrow { font-family:'Poppins',sans-serif; font-size:11px; font-weight:600; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:14px; }

  .lrr-hero-title {
    font-family:'Montserrat',sans-serif; font-weight:900;
    font-size:clamp(42px,6vw,80px); line-height:1.0;
    letter-spacing:-0.02em; color:#fff; margin-bottom:10px;
  }
  .lrr-hero-title .t1 { display:block; }
  .lrr-hero-title .t2 { display:block; color:var(--photon-mid); font-style:italic; }

  .lrr-hero-desc { font-size:16px; color:rgba(255,255,255,0.55); line-height:1.8; max-width:540px; margin:20px 0 40px; font-family:'Inter',sans-serif; }

  .lrr-hero-stats { display:flex; gap:0; border:1px solid rgba(255,255,255,0.08); border-radius:10px; overflow:hidden; width:fit-content; flex-wrap:wrap; }
  .lrr-hero-stat { padding:14px 26px; border-right:1px solid rgba(255,255,255,0.08); }
  .lrr-hero-stat:last-child { border-right:none; }
  .lrr-stat-num { font-family:'Montserrat',sans-serif; font-size:22px; font-weight:800; color:var(--photon-mid); line-height:1; margin-bottom:4px; }
  .lrr-stat-label { font-size:11px; color:rgba(255,255,255,0.35); font-weight:500; letter-spacing:0.06em; font-family:'Poppins',sans-serif; }

  /* ═══ BODY ═══ */
  .lrr-body { max-width:920px; margin:0 auto; padding:80px 32px 100px; }

  /* ═══ INTRO ═══ */
  .lrr-intro { display:grid; grid-template-columns:3fr 2fr; gap:40px; margin-bottom:72px; align-items:start; }
  @media(max-width:640px){.lrr-intro{grid-template-columns:1fr;}}
  .lrr-intro-kicker { font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:var(--photon2); margin-bottom:12px; display:flex; align-items:center; gap:10px; }
  .lrr-intro-kicker::after { content:''; width:48px; height:1px; background:var(--photon-mid); }
  .lrr-intro-headline { font-family:'Montserrat',sans-serif; font-size:clamp(22px,3vw,30px); font-weight:800; color:var(--ink); line-height:1.2; margin-bottom:16px; }
  .lrr-intro-headline em { font-style:italic; color:var(--photon2); }
  .lrr-intro-body { font-size:16px; line-height:1.85; color:var(--ink2); margin-bottom:14px; }
  .lrr-intro-body strong { color:var(--photon3); font-weight:600; }
  .lrr-intro-sidebar { background:#010810; background-image:linear-gradient(160deg,#010810 0%,#041828 100%); border-radius:14px; padding:26px 22px; position:relative; overflow:hidden; }
  .lrr-intro-sidebar::before { content:''; position:absolute; top:-20px; right:-20px; width:100px; height:100px; border-radius:50%; background:rgba(14,165,233,0.1); }
  .lrr-sidebar-label { font-family:'Poppins',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(125,211,252,0.6); margin-bottom:12px; }
  .lrr-sidebar-title { font-family:'Montserrat',sans-serif; font-size:17px; font-weight:800; color:#fff; margin-bottom:14px; line-height:1.3; }
  .lrr-sidebar-list { list-style:none; padding:0; }
  .lrr-sidebar-item { display:flex; align-items:center; gap:10px; padding:7px 0; border-bottom:1px solid rgba(255,255,255,0.08); font-size:13px; color:rgba(255,255,255,0.75); }
  .lrr-sidebar-item:last-child { border-bottom:none; }
  .lrr-sidebar-num { font-family:'Montserrat',sans-serif; font-size:20px; font-weight:800; color:var(--photon-mid); flex-shrink:0; width:26px; line-height:1; }

  /* ═══ CHAPTER DIVIDER ═══ */
  .lrr-ch-divider { display:flex; align-items:center; gap:12px; margin:64px 0 48px; }
  .lrr-ch-divider::before, .lrr-ch-divider::after { content:''; flex:1; height:1px; background:#c8e4f5; min-width:12px; }
  .lrr-ch-badge {
    display:inline-flex; align-items:center; gap:10px;
    background:var(--photon2); border-radius:8px; padding:10px 20px;
    font-family:'Poppins',sans-serif; font-size:12px; font-weight:700;
    letter-spacing:0.1em; text-transform:uppercase; color:#fff;
    flex-shrink:0; max-width:70%; overflow:hidden;
  }
  .lrr-ch-num {
    font-family:'Montserrat',sans-serif; font-size:16px; color:var(--photon-mid);
    font-weight:800; white-space:nowrap; flex-shrink:0; line-height:1;
  }
  .lrr-ch-badge-text {
    white-space:normal; word-break:break-word; line-height:1.3;
  }
  @media(max-width:480px){
    .lrr-ch-divider { margin:48px 0 32px; gap:8px; }
    .lrr-ch-badge { font-size:10px; padding:8px 14px; gap:8px; max-width:75%; }
    .lrr-ch-num { font-size:14px; }
  }
  .lrr-ch-num { font-family:'Montserrat',sans-serif; font-size:16px; color:var(--photon-mid); font-weight:800; }

  /* ═══ SEC HEADER ═══ */
  .lrr-sec-head { margin-bottom:28px; }
  .lrr-sec-num { font-family:'Montserrat',sans-serif; font-size:80px; font-weight:900; color:var(--photon-lt); line-height:0.85; letter-spacing:-0.04em; display:block; margin-bottom:2px; }
  .lrr-sec-kicker { font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--photon2); margin-bottom:6px; }
  .lrr-sec-title { font-family:'Montserrat',sans-serif; font-size:clamp(22px,3vw,30px); font-weight:800; color:var(--ink); line-height:1.15; letter-spacing:-0.01em; border-bottom:2px solid #c8e4f5; padding-bottom:16px; }
  .lrr-sec-title span { color:var(--photon2); font-style:italic; }

  /* ═══ BODY TEXT ═══ */
  .lrr-body-text { font-size:15.5px; line-height:1.85; color:var(--ink2); margin-bottom:24px; }
  .lrr-body-text strong { color:var(--photon3); font-weight:600; }

  /* ═══ LAWS OF REFLECTION CARD ═══ */
  .lrr-laws-card {
    background:#f4faff; border-radius:16px; overflow:hidden;
    border:1.5px solid #c8e4f5; margin-bottom:28px;
    box-shadow:0 4px 24px rgba(14,165,233,0.1);
  }
  .lrr-laws-top {
    background:#041828;
    background-image:linear-gradient(135deg,#010810 0%,#041828 55%,#082f49 100%);
    padding:28px 32px; position:relative; overflow:hidden;
    display:flex; align-items:center; gap:16px;
  }
  .lrr-laws-top::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse at 70% 50%,rgba(14,165,233,0.12) 0%,transparent 60%); pointer-events:none; }
  .lrr-laws-icon { font-size:36px; position:relative; z-index:1; flex-shrink:0; }
  .lrr-laws-title-wrap { position:relative; z-index:1; }
  .lrr-laws-tag { font-family:'Poppins',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(125,211,252,0.6); margin-bottom:6px; }
  .lrr-laws-title { font-family:'Montserrat',sans-serif; font-size:20px; font-weight:800; color:#fff; line-height:1.2; }
  .lrr-laws-body { display:grid; grid-template-columns:1fr 1fr; }
  @media(max-width:580px){.lrr-laws-body{grid-template-columns:1fr;}}
  .lrr-law-item { padding:22px 26px; border-right:1.5px solid #c8e4f5; border-top:1.5px solid #c8e4f5; background:#f4faff; }
  .lrr-law-item:nth-child(even) { border-right:none; }
  .lrr-law-num { font-family:'Montserrat',sans-serif; font-size:40px; font-weight:900; color:var(--photon-lt); line-height:1; margin-bottom:6px; }
  .lrr-law-title { font-family:'Poppins',sans-serif; font-size:14px; font-weight:700; color:var(--photon2); margin-bottom:8px; }
  .lrr-law-desc { font-size:14px; line-height:1.7; color:var(--ink2); }
  .lrr-law-formula {
    display:inline-block; font-family:'Montserrat',sans-serif; font-size:22px; font-weight:800;
    color:var(--photon2); background:var(--photon-lt); padding:6px 18px; border-radius:8px;
    margin:10px 0; border:1.5px solid var(--photon-mid);
  }

  /* ═══ PLANE MIRROR IMAGE PROPERTIES ═══ */
  .lrr-mirror-props {
    display:grid; grid-template-columns:repeat(2,1fr); gap:16px; margin-bottom:28px;
  }
  @media(max-width:580px){.lrr-mirror-props{grid-template-columns:1fr;}}
  .lrr-mp-card {
    border-radius:12px; border:1.5px solid #c8e4f5; padding:20px 22px;
    background:#f4faff; display:flex; gap:14px; align-items:flex-start;
  }
  .lrr-mp-icon { font-size:26px; flex-shrink:0; margin-top:2px; }
  .lrr-mp-title { font-family:'Poppins',sans-serif; font-size:13px; font-weight:700; color:var(--photon2); margin-bottom:5px; }
  .lrr-mp-desc { font-size:13px; line-height:1.65; color:var(--ink2); }

  /* ═══ SPHERICAL MIRROR TERMS — GLOSSARY GRID ═══ */
  .lrr-terms-grid {
    display:grid; grid-template-columns:repeat(3,1fr); gap:1px;
    background:#c8e4f5; border:1.5px solid #c8e4f5; border-radius:14px;
    overflow:hidden; margin-bottom:28px;
  }
  @media(max-width:580px){.lrr-terms-grid{grid-template-columns:1fr;}}
  .lrr-term-cell { background:#f4faff; padding:18px 18px 16px; }
  .lrr-term-badge {
    display:inline-block; font-family:'Montserrat',sans-serif; font-size:11px; font-weight:800;
    background:var(--photon-lt); color:var(--photon2); padding:3px 10px; border-radius:4px;
    margin-bottom:8px; letter-spacing:0.04em;
  }
  .lrr-term-name { font-family:'Poppins',sans-serif; font-size:14px; font-weight:700; color:var(--ink); margin-bottom:5px; }
  .lrr-term-desc { font-size:13px; line-height:1.6; color:var(--muted); }
  .lrr-term-formula {
    font-family:'Montserrat',sans-serif; font-size:13px; font-weight:700;
    color:var(--photon2); margin-top:6px; display:inline-block;
    background:var(--photon-lt); padding:2px 10px; border-radius:4px;
  }

  /* ═══ MIRROR TYPE CARDS — CONCAVE vs CONVEX ═══ */
  .lrr-mirror-types { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:28px; }
  @media(max-width:580px){.lrr-mirror-types{grid-template-columns:1fr;}}
  .lrr-mt-card { border-radius:14px; overflow:hidden; border:1.5px solid #c8e4f5; box-shadow:0 2px 12px rgba(14,165,233,0.07); }
  .lrr-mt-hdr { padding:22px 22px 16px; }
  .lrr-mt-hdr.concave { background:#041828; background-image:linear-gradient(135deg,#020a14 0%,#041828 100%); }
  .lrr-mt-hdr.convex  { background:#140a20; background-image:linear-gradient(135deg,#140a20 0%,#2a1040 100%); }
  .lrr-mt-tag { font-family:'Poppins',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:rgba(255,255,255,0.45); margin-bottom:6px; }
  .lrr-mt-name { font-family:'Montserrat',sans-serif; font-size:19px; font-weight:800; margin-bottom:4px; }
  .lrr-mt-hdr.concave .lrr-mt-name { color:var(--photon-mid); }
  .lrr-mt-hdr.convex  .lrr-mt-name { color:var(--prism-mid); }
  .lrr-mt-alias { font-size:12px; color:rgba(255,255,255,0.4); font-style:italic; }
  .lrr-mt-body { padding:20px 22px; background:#f4faff; }
  .lrr-mt-item { display:flex; gap:12px; padding:10px 0; border-bottom:1px solid #c8e4f5; font-size:13.5px; color:#082035; line-height:1.65; align-items:flex-start; }
  .lrr-mt-item:last-child { border-bottom:none; }
  .lrr-mt-dot { min-width:7px; height:7px; border-radius:50%; margin-top:7px; flex-shrink:0; }
  .concave-dot { background:#0ea5e9; }
  .convex-dot  { background:#8b5cf6; }
  .lrr-mt-item strong { color:#0369a1; font-weight:700; }

  /* ═══ IMAGE TABLE — concave mirror ═══ */
  .lrr-img-table { width:100%; border-collapse:collapse; margin-bottom:28px; border-radius:12px; overflow:hidden; border:1.5px solid #c8e4f5; }
  .lrr-img-table thead tr { background:#0369a1; background-image:linear-gradient(90deg,#041828 0%,#0369a1 100%); }
  .lrr-img-table thead th { padding:12px 14px; font-family:'Poppins',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,255,255,0.85); text-align:left; }
  .lrr-img-table tbody tr:nth-child(odd)  { background:#f4faff; }
  .lrr-img-table tbody tr:nth-child(even) { background:#daeefa; }
  .lrr-img-table tbody tr:hover { background:#c8e4f5; }
  .lrr-img-table td { padding:11px 14px; font-size:13px; color:#082035; line-height:1.5; border-bottom:1px solid #c8e4f5; }
  .lrr-img-table td:first-child { font-weight:600; color:#0369a1; font-family:'Poppins',sans-serif; }
  .lrr-nature-real { display:inline-block; background:var(--photon-lt); color:var(--photon2); padding:2px 10px; border-radius:4px; font-size:11px; font-weight:700; font-family:'Poppins',sans-serif; }
  .lrr-nature-virt { display:inline-block; background:var(--prism-lt); color:var(--prism2); padding:2px 10px; border-radius:4px; font-size:11px; font-weight:700; font-family:'Poppins',sans-serif; }

  /* ═══ FORMULA BOX ═══ */
  .lrr-formula-box {
    background:#010810;
    background-image:linear-gradient(160deg,#010810 0%,#041828 100%);
    border-radius:14px; padding:28px 32px; margin-bottom:28px;
    border:1.5px solid rgba(14,165,233,0.3); position:relative; overflow:hidden;
  }
  .lrr-formula-box::before { content:''; position:absolute; top:-30px; right:-30px; width:140px; height:140px; border-radius:50%; background:radial-gradient(circle,rgba(14,165,233,0.1) 0%,transparent 65%); }
  .lrr-formula-label { font-family:'Poppins',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(125,211,252,0.6); margin-bottom:18px; }
  .lrr-formula-row { display:flex; align-items:flex-start; gap:24px; flex-wrap:wrap; margin-bottom:16px; }
  .lrr-formula-row:last-child { margin-bottom:0; }
  .lrr-formula-main {
    font-family:'Montserrat',sans-serif; font-size:clamp(18px,3vw,26px); font-weight:800;
    color:#fff; background:rgba(14,165,233,0.12); padding:12px 24px; border-radius:10px;
    border:1.5px solid rgba(14,165,233,0.25); letter-spacing:0.04em; white-space:nowrap;
  }
  .lrr-formula-main sub, .lrr-formula-main sup { font-size:0.65em; }
  .lrr-formula-vars { display:flex; flex-direction:column; gap:6px; }
  .lrr-formula-var { font-size:12px; color:rgba(255,255,255,0.55); font-family:'Inter',sans-serif; }
  .lrr-formula-var strong { color:var(--photon-mid); font-family:'Montserrat',sans-serif; }

  /* ═══ MAGNIFICATION STRIP ═══ */
  .lrr-mag-strip {
    display:grid; grid-template-columns:repeat(3,1fr); gap:1px;
    background:#c8e4f5; border:1.5px solid #c8e4f5; border-radius:12px;
    overflow:hidden; margin-bottom:28px;
  }
  @media(max-width:580px){.lrr-mag-strip{grid-template-columns:1fr;}}
  .lrr-mag-cell { background:#f4faff; padding:18px 20px; text-align:center; }
  .lrr-mag-val { font-family:'Montserrat',sans-serif; font-size:26px; font-weight:900; color:var(--photon2); margin-bottom:4px; }
  .lrr-mag-label { font-family:'Poppins',sans-serif; font-size:12px; font-weight:600; color:var(--ink); margin-bottom:4px; }
  .lrr-mag-desc { font-size:12px; color:var(--muted); line-height:1.5; }

  /* ═══ SIGN CONVENTION TABLE ═══ */
  .lrr-sign-card {
    background:#f4faff; border-radius:14px; border:1.5px solid #c8e4f5;
    overflow:hidden; margin-bottom:28px;
  }
  .lrr-sign-hdr { background:#010810; background-image:linear-gradient(90deg,#010810 0%,#041828 100%); padding:16px 24px; display:flex; align-items:center; gap:12px; }
  .lrr-sign-hdr-title { font-family:'Montserrat',sans-serif; font-size:16px; font-weight:800; color:#fff; }
  .lrr-sign-hdr-sub { font-size:12px; color:rgba(255,255,255,0.45); margin-left:auto; font-family:'Inter',sans-serif; }
  .lrr-sign-body { padding:0; }
  .lrr-sign-row { display:grid; grid-template-columns:2fr 1fr 1fr; border-bottom:1px solid #c8e4f5; }
  .lrr-sign-row:last-child { border-bottom:none; }
  .lrr-sign-row.hd { background:#daeefa; }
  .lrr-sign-cell { padding:12px 16px; font-size:13px; color:#082035; line-height:1.5; border-left:1px solid #c8e4f5; }
  .lrr-sign-cell:first-child { border-left:none; font-weight:600; color:#030d18; font-family:'Poppins',sans-serif; }
  .lrr-sign-row.hd .lrr-sign-cell { font-family:'Poppins',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; color:var(--photon2); }
  .lrr-sign-pos { color:var(--teal); font-weight:700; font-family:'Montserrat',sans-serif; }
  .lrr-sign-neg { color:var(--red); font-weight:700; font-family:'Montserrat',sans-serif; }

  /* ═══ REFRACTION CONTRAST BLOCK ═══ */
  .lrr-refraction-block {
    display:grid; grid-template-columns:1fr 1fr; margin-bottom:28px;
    border:1.5px solid #c8e4f5; border-radius:14px; overflow:hidden;
  }
  @media(max-width:580px){.lrr-refraction-block{grid-template-columns:1fr;}}
  .lrr-rb-left { background:#020a14; background-image:linear-gradient(160deg,#020a14 0%,#041828 100%); padding:28px 24px; }
  .lrr-rb-right { background:#f4faff; padding:28px 24px; border-left:1.5px solid #c8e4f5; }
  @media(max-width:580px){.lrr-rb-right{border-left:none; border-top:1.5px solid #c8e4f5;}}
  .lrr-rb-tag { font-family:'Poppins',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; margin-bottom:10px; }
  .lrr-rb-left .lrr-rb-tag { color:rgba(125,211,252,0.6); }
  .lrr-rb-right .lrr-rb-tag { color:#0369a1; }
  .lrr-rb-title { font-family:'Montserrat',sans-serif; font-size:17px; font-weight:800; margin-bottom:14px; line-height:1.3; }
  .lrr-rb-left .lrr-rb-title { color:#fff; }
  .lrr-rb-right .lrr-rb-title { color:#030d18; }
  .lrr-rb-item { display:flex; gap:10px; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.08); font-size:13px; line-height:1.65; align-items:flex-start; }
  .lrr-rb-right .lrr-rb-item { border-bottom-color:#c8e4f5; }
  .lrr-rb-item:last-child { border-bottom:none; }
  .lrr-rb-dot { min-width:7px; height:7px; border-radius:50%; margin-top:7px; flex-shrink:0; }
  .lrr-rb-left .lrr-rb-item { color:rgba(255,255,255,0.8); }
  .lrr-rb-right .lrr-rb-item { color:#082035; }
  .lrr-rb-left .lrr-rb-item strong { color:var(--photon-mid); }
  .lrr-rb-right .lrr-rb-item strong { color:#0369a1; }

  /* ═══ SNELL'S LAW BOX ═══ */
  .lrr-snell-box {
    background:#010810;
    background-image:linear-gradient(135deg,#010810,#031220);
    border-radius:14px;
    padding:28px 32px; margin-bottom:28px; border:1.5px solid rgba(14,165,233,0.25);
    display:grid; grid-template-columns:1fr 1fr; gap:28px; align-items:center;
  }
  @media(max-width:580px){.lrr-snell-box{grid-template-columns:1fr;}}
  .lrr-snell-label { font-family:'Poppins',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(125,211,252,0.5); margin-bottom:14px; grid-column:1/-1; }
  .lrr-snell-eq {
    font-family:'Montserrat',sans-serif; font-size:clamp(16px,2.5vw,22px); font-weight:800;
    color:#fff; text-align:center; padding:24px 18px; border-radius:10px;
    background:rgba(14,165,233,0.1); border:1.5px solid rgba(14,165,233,0.2);
    display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;
    min-height:140px;
  }
  .lrr-snell-eq-main { color:var(--photon-mid); font-size:1.2em; line-height:1.3; }
  .lrr-snell-eq-name { font-size:11px; color:rgba(255,255,255,0.4); font-family:'Poppins',sans-serif; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; margin-top:4px; }
  .lrr-snell-ri { display:flex; flex-direction:column; gap:10px; }
  .lrr-snell-ri-row { display:flex; align-items:center; gap:12px; padding:8px 12px; background:rgba(14,165,233,0.06); border-radius:8px; }
  .lrr-snell-ri-symbol { font-family:'Montserrat',sans-serif; font-size:16px; font-weight:800; color:var(--photon-mid); flex-shrink:0; width:36px; }
  .lrr-snell-ri-value { font-family:'Montserrat',sans-serif; font-size:18px; font-weight:800; color:#fff; flex-shrink:0; }
  .lrr-snell-ri-label { font-size:12px; color:rgba(255,255,255,0.45); font-family:'Inter',sans-serif; }

  /* ═══ PHENOMENON CARDS ═══ */
  .lrr-phenom-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:28px; }
  @media(max-width:640px){.lrr-phenom-cards{grid-template-columns:1fr;}}
  .lrr-phenom-card { border-radius:12px; border:1.5px solid #c8e4f5; background:#f4faff; padding:20px 18px; }
  .lrr-phenom-icon { font-size:28px; margin-bottom:10px; display:block; }
  .lrr-phenom-title { font-family:'Poppins',sans-serif; font-size:13px; font-weight:700; color:var(--photon2); margin-bottom:6px; }
  .lrr-phenom-desc { font-size:13px; line-height:1.65; color:var(--ink2); }

  /* ═══ LENS TYPE CARDS ═══ */
  .lrr-lens-types { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:28px; }
  @media(max-width:580px){.lrr-lens-types{grid-template-columns:1fr;}}
  .lrr-lt-card { border-radius:14px; overflow:hidden; border:1.5px solid #c8e4f5; box-shadow:0 2px 12px rgba(14,165,233,0.07); }
  .lrr-lt-hdr { padding:22px 22px 16px; }
  .lrr-lt-hdr.convex-l  { background:#041828; background-image:linear-gradient(135deg,#041828 0%,#0369a1 100%); }
  .lrr-lt-hdr.concave-l { background:#14082a; background-image:linear-gradient(135deg,#14082a 0%,#4c1d95 100%); }
  .lrr-lt-tag { font-family:'Poppins',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:rgba(255,255,255,0.45); margin-bottom:6px; }
  .lrr-lt-name { font-family:'Montserrat',sans-serif; font-size:20px; font-weight:800; margin-bottom:4px; }
  .lrr-lt-hdr.convex-l .lrr-lt-name { color:var(--photon-mid); }
  .lrr-lt-hdr.concave-l .lrr-lt-name { color:var(--prism-mid); }
  .lrr-lt-alias { font-size:12px; color:rgba(255,255,255,0.4); font-style:italic; }
  .lrr-lt-body { padding:20px 22px; background:#f4faff; }
  .lrr-lt-item { display:flex; gap:12px; padding:10px 0; border-bottom:1px solid #c8e4f5; font-size:13.5px; color:#082035; line-height:1.65; align-items:flex-start; }
  .lrr-lt-item:last-child { border-bottom:none; }
  .lrr-lt-dot { min-width:7px; height:7px; border-radius:50%; margin-top:7px; flex-shrink:0; }
  .convex-l-dot  { background:#0ea5e9; }
  .concave-l-dot { background:#8b5cf6; }
  .lrr-lt-item strong { color:#0369a1; font-weight:700; }

  /* ═══ LENS TERMS GRID ═══ */
  .lrr-lens-terms { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:28px; }
  @media(max-width:580px){.lrr-lens-terms{grid-template-columns:1fr;}}
  .lrr-lt2-card { border-radius:12px; border:1.5px solid #c8e4f5; background:#f4faff; padding:18px 16px; }
  .lrr-lt2-badge { display:inline-block; font-family:'Montserrat',sans-serif; font-size:10px; font-weight:800; background:var(--prism-lt); color:var(--prism2); padding:3px 10px; border-radius:4px; margin-bottom:8px; }
  .lrr-lt2-name { font-family:'Poppins',sans-serif; font-size:13px; font-weight:700; color:var(--ink); margin-bottom:5px; }
  .lrr-lt2-desc { font-size:12.5px; line-height:1.6; color:var(--muted); }

  /* ═══ POWER OF LENS CARD ═══ */
  .lrr-power-card {
    background:#f4faff; border-radius:16px; border:1.5px solid #c8e4f5;
    overflow:hidden; margin-bottom:28px;
  }
  .lrr-power-top {
    background:#010810;
    background-image:linear-gradient(90deg,#010810 0%,#082f49 100%);
    padding:20px 28px; display:flex; align-items:center; gap:16px;
  }
  .lrr-power-icon { font-size:32px; }
  .lrr-power-title-wrap {}
  .lrr-power-tag { font-family:'Poppins',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(125,211,252,0.55); margin-bottom:6px; }
  .lrr-power-title { font-family:'Montserrat',sans-serif; font-size:18px; font-weight:800; color:#fff; }
  .lrr-power-body { display:grid; grid-template-columns:1fr 1fr; }
  @media(max-width:580px){.lrr-power-body{grid-template-columns:1fr;}}
  .lrr-power-left { padding:24px 24px; border-right:1.5px solid #c8e4f5; }
  .lrr-power-right { padding:24px 24px; }
  @media(max-width:580px){.lrr-power-right{border-top:1.5px solid #c8e4f5;}}
  .lrr-power-section-title { font-family:'Poppins',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--photon2); margin-bottom:12px; }
  .lrr-power-formula-big {
    font-family:'Montserrat',sans-serif; font-size:clamp(18px,3vw,24px); font-weight:900;
    color:var(--photon2); background:var(--photon-lt); padding:12px 20px; border-radius:10px;
    display:inline-block; margin-bottom:14px; border:1.5px solid var(--photon-mid);
  }
  .lrr-power-note { font-size:13px; color:#082035; line-height:1.65; margin-bottom:8px; }
  .lrr-power-note strong { color:#0369a1; font-weight:600; }
  .lrr-power-row { display:flex; align-items:center; gap:12px; padding:9px 0; border-bottom:1px solid #c8e4f5; }
  .lrr-power-row:last-child { border-bottom:none; }
  .lrr-power-type { font-family:'Poppins',sans-serif; font-size:13px; font-weight:600; color:#030d18; flex:1; }
  .lrr-power-sign { font-family:'Montserrat',sans-serif; font-size:20px; font-weight:900; }
  .lrr-power-sign.pos { color:var(--teal); }
  .lrr-power-sign.neg { color:var(--red); }

  /* ═══ USES BLOCKS ═══ */
  .lrr-uses-block { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:28px; }
  @media(max-width:580px){.lrr-uses-block{grid-template-columns:1fr;}}
  .lrr-uses-card { border-radius:14px; overflow:hidden; border:1.5px solid #c8e4f5; box-shadow:0 2px 12px rgba(14,165,233,0.07); }
  .lrr-uses-hdr { padding:18px 22px; }
  .lrr-uses-hdr.cu { background:#020a14; background-image:linear-gradient(135deg,#020a14 0%,#041828 100%); }
  .lrr-uses-hdr.xo { background:#0a1420; background-image:linear-gradient(135deg,#0a1420 0%,#1a2840 100%); }
  .lrr-uses-hdr-title { font-family:'Montserrat',sans-serif; font-size:16px; font-weight:800; margin-bottom:4px; }
  .lrr-uses-hdr.cu .lrr-uses-hdr-title { color:var(--photon-mid); }
  .lrr-uses-hdr.xo .lrr-uses-hdr-title { color:var(--prism-mid); }
  .lrr-uses-tag { font-family:'Poppins',sans-serif; font-size:10px; color:rgba(255,255,255,0.4); }
  .lrr-uses-body { background:#f4faff; padding:18px 22px; }
  .lrr-uses-item { display:flex; gap:12px; padding:10px 0; border-bottom:1px solid #c8e4f5; font-size:13.5px; color:#082035; line-height:1.65; align-items:flex-start; }
  .lrr-uses-item:last-child { border-bottom:none; }
  .lrr-uses-num { font-family:'Montserrat',sans-serif; font-size:15px; font-weight:900; color:#0ea5e9; flex-shrink:0; width:22px; line-height:1.5; }

  /* ═══ ALERT BOX ═══ */
  .lrr-alert { border-radius:10px; padding:16px 20px; font-size:14px; line-height:1.7; margin-bottom:24px; border-left:4px solid; }
  .lrr-alert.blue { background:var(--photon-lt); border-color:var(--photon); color:var(--photon3); }
  .lrr-alert.purple { background:var(--prism-lt); border-color:var(--prism); color:var(--prism2); }
  .lrr-alert.amber { background:var(--amber-lt); border-color:var(--amber); color:var(--amber2); }
  .lrr-alert strong { font-weight:700; }

  /* ═══ PULL QUOTE ═══ */
  .lrr-pull-quote {
    background:#010810;
    background-image:linear-gradient(135deg,#010810 0%,#041828 100%);
    border-radius:14px;
    padding:28px 32px; margin-bottom:28px; position:relative; overflow:hidden;
    border:1.5px solid rgba(14,165,233,0.2);
  }
  .lrr-pull-quote::before {
    content:'"'; position:absolute; top:-10px; left:18px;
    font-family:'Montserrat',sans-serif; font-size:120px; font-weight:900;
    color:rgba(14,165,233,0.08); line-height:1;
  }
  .lrr-pull-quote p { font-family:'Poppins',sans-serif; font-size:16px; font-weight:500; color:rgba(255,255,255,0.75); line-height:1.8; position:relative; z-index:1; font-style:italic; }

  /* ═══ DIVIDER ═══ */
  .lrr-divider { display:flex; justify-content:center; padding:32px 0; margin-bottom:8px; }
  .lrr-divider-mark { width:48px; height:3px; background:linear-gradient(90deg,var(--photon),var(--prism)); border-radius:2px; }

  /* ═══ FAQ ═══ */
  .lrr-faq-header { text-align:center; margin-bottom:12px; }
  .lrr-faq-kicker { font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:var(--photon2); display:inline-block; padding:4px 14px; border:1px solid var(--photon-mid); border-radius:4px; background:var(--photon-lt); }
  .lrr-faq-title { font-family:'Montserrat',sans-serif; font-size:clamp(22px,3.5vw,30px); font-weight:900; color:var(--ink); text-align:center; margin-bottom:32px; letter-spacing:-0.01em; }
  .lrr-faq-item { border:1.5px solid #c8e4f5; border-radius:10px; margin-bottom:10px; overflow:hidden; background:#f4faff; }
  .lrr-faq-item.open { border-color:var(--photon-mid); background:#eaf6fe; }
  .lrr-faq-q { width:100%; background:none; border:none; padding:16px 20px; display:flex; justify-content:space-between; align-items:center; gap:16px; cursor:pointer; text-align:left; }
  .lrr-faq-q-text { font-family:'Poppins',sans-serif; font-size:14px; font-weight:600; color:#082035; line-height:1.5; }
  .lrr-faq-icon { font-size:18px; color:var(--photon2); flex-shrink:0; font-weight:700; }
  .lrr-faq-ans { max-height:0; overflow:hidden; transition:max-height 0.3s ease; font-size:14px; line-height:1.8; color:#082035; }
  .lrr-faq-ans.visible { max-height:500px; }
  .lrr-faq-ans-inner { padding:0 20px 18px; border-top:1px solid #c8e4f5; padding-top:14px; }
  .lrr-faq-ans strong { color:#0369a1; font-weight:600; }

  @media(max-width:640px){
    .lrr-hero-inner { padding:0 20px; }
    .lrr-body { padding:40px 16px 80px; }
    .lrr-hero-title { font-size:clamp(34px,10vw,52px); }
    .lrr-formula-box { padding:20px 18px; }
    .lrr-snell-box { padding:20px 18px; }
    .lrr-pull-quote { padding:22px 20px; }
    .lrr-sign-cell { padding:10px 12px; font-size:12px; }
    .lrr-img-table td, .lrr-img-table th { padding:9px 10px; font-size:12px; }
    .lrr-power-formula-big { font-size:18px; }
    .lrr-formula-main { font-size:18px; padding:10px 16px; }
    .lrr-hero-stats { width:100%; }
    .lrr-hero-stat { padding:12px 18px; }
  }
`;

const faqs = [
  {
    q: "What are the two laws of reflection?",
    a: <><strong>Law 1:</strong> The angle of incidence is always equal to the angle of reflection (∠i = ∠r). <strong>Law 2:</strong> The incident ray, the reflected ray, and the normal to the reflecting surface at the point of incidence all lie in the same plane. These laws apply to both plane and spherical mirrors.</>
  },
  {
    q: "What is the difference between a concave mirror and a convex mirror?",
    a: <><strong>Concave mirror</strong> — reflecting surface curves inward; also called a <em>converging mirror</em> because it converges parallel rays to a real focus point in front of the mirror. Used in torches, solar furnaces, dentist's mirrors. <strong>Convex mirror</strong> — reflecting surface curves outward; also called a <em>diverging mirror</em>. It always forms a virtual, erect, diminished image. Used as rear-view mirrors in vehicles because it provides a wide field of view.</>
  },
  {
    q: "What is the relationship between focal length (f) and radius of curvature (R)?",
    a: <>The focal length is exactly half the radius of curvature: <strong>f = R/2</strong>. This means the focus point F lies midway between the pole P and the centre of curvature C. For a concave mirror, both R and f are negative (by sign convention). For a convex mirror, both are positive.</>
  },
  {
    q: "State the mirror formula and explain each term.",
    a: <><strong>Mirror formula:</strong> 1/f = 1/v + 1/u, where <strong>f</strong> = focal length (distance from pole to focus), <strong>v</strong> = image distance (from pole), <strong>u</strong> = object distance (from pole). All distances are measured from the pole P. Distances in the direction of incident light are positive; against incident light are negative (New Cartesian sign convention). The relationship R = 2f also holds: 1/f = 1/v + 1/u.</>
  },
  {
    q: "What is magnification in a spherical mirror? What do positive and negative values mean?",
    a: <><strong>Magnification (m)</strong> = height of image / height of object = −v/u. If <strong>m &gt; 1</strong>: image is enlarged (magnified). If <strong>m = 1</strong>: image is the same size. If <strong>m &lt; 1</strong>: image is diminished. A <strong>negative m</strong> means the image is real and inverted. A <strong>positive m</strong> means the image is virtual and erect.</>
  },
  {
    q: "What is refraction of light? Why does it occur?",
    a: <><strong>Refraction</strong> is the bending of light when it passes from one transparent medium to another. It occurs because the <strong>speed of light changes</strong> as it enters a different medium. When light travels from a rarer medium (like air) to a denser medium (like glass), it <strong>bends towards the normal</strong> because its speed decreases. When it travels from denser to rarer, it <strong>bends away from the normal</strong> because its speed increases.</>
  },
  {
    q: "State Snell's Law of refraction.",
    a: <><strong>Snell's Law:</strong> The ratio of the sine of the angle of incidence to the sine of the angle of refraction is a constant for a given pair of media and given colour of light. Mathematically: <strong>sin i / sin r = n₂₁ = n₂/n₁</strong>. This constant is the refractive index of the second medium with respect to the first. It is also equal to the ratio of the speed of light in the first medium to the speed in the second medium.</>
  },
  {
    q: "What is the refractive index and what are its values for common materials?",
    a: <><strong>Refractive index (n)</strong> = speed of light in vacuum (c) / speed of light in medium (v). It has no units. Common values: <strong>Air ≈ 1.0003</strong> (approximately 1), <strong>Water (nw) = 1.33</strong>, <strong>Glass (ng) = 1.52</strong>. A higher refractive index means light travels slower in that medium. The speed of light in vacuum is c = 3×10⁸ m/s.</>
  },
  {
    q: "What happens when a ray of light passes through a rectangular glass slab?",
    a: <>When a light ray passes through a rectangular glass slab: (1) At the first surface (air to glass), the ray bends <strong>towards the normal</strong>. (2) At the second surface (glass to air), the ray bends <strong>away from the normal</strong>. The emergent ray is <strong>parallel to the incident ray</strong> but <strong>laterally displaced</strong> (shifted sideways). If the ray is incident normally (90° to the surface), it passes straight through without any bending.</>
  },
  {
    q: "What is the lens formula and how is it different from the mirror formula?",
    a: <><strong>Lens formula:</strong> 1/f = 1/v − 1/u. The key difference from the mirror formula (1/f = 1/v + 1/u) is the <strong>minus sign</strong> in the lens formula. All distances for lenses are measured from the <strong>optical centre O</strong>. For a convex lens, f is <strong>positive</strong>. For a concave lens, f is <strong>negative</strong>. This is opposite to mirrors where concave → negative f and convex → positive f.</>
  },
  {
    q: "What is power of a lens? What is its SI unit?",
    a: <><strong>Power of a lens (P)</strong> is defined as the reciprocal of its focal length: P = 1/f (when f is in metres). It measures the degree of convergence or divergence of light. <strong>SI unit: dioptre (D)</strong>. 1 dioptre = power of a lens with focal length of 1 metre. Convex lens (converging) has <strong>positive power</strong>. Concave lens (diverging) has <strong>negative power</strong>. When lenses are in contact: P<sub>net</sub> = P₁ + P₂ + P₃ + …</>
  },
  {
    q: "What is the nature of image formed by a concave mirror when the object is placed between F and P?",
    a: <>When an object is placed <strong>between the focus F and the pole P</strong> of a concave mirror, this is a special case. The image formed is: <strong>Virtual</strong> (cannot be obtained on a screen), <strong>Erect</strong> (same orientation as object), and <strong>Enlarged</strong> (magnified). The image is formed <strong>behind the mirror</strong>. This is why concave mirrors are used as shaving mirrors and by dentists — the face/teeth placed close to the mirror gives a magnified, erect, virtual image.</>
  },
];

export default function ChapterLightReflectionRefraction() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="lrr-root">

        {/* ══ HERO ══ */}
        <div className="lrr-hero">
          <div className="lrr-hero-grid" />
          <div className="lrr-glow-1" />
          <div className="lrr-glow-2" />
          <div className="lrr-glow-3" />

          {/* Prism + spectrum SVG watermark */}
          <svg className="lrr-hero-prism" viewBox="0 0 500 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="spectrumGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#8b5cf6" stopOpacity="0.9"/>
                <stop offset="17%"  stopColor="#3b82f6" stopOpacity="0.9"/>
                <stop offset="33%"  stopColor="#0ea5e9" stopOpacity="0.9"/>
                <stop offset="50%"  stopColor="#10b981" stopOpacity="0.9"/>
                <stop offset="67%"  stopColor="#eab308" stopOpacity="0.9"/>
                <stop offset="83%"  stopColor="#f97316" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.9"/>
              </linearGradient>
            </defs>
            {/* Prism shape */}
            <polygon points="250,80 80,520 420,520" fill="none" stroke="rgba(125,211,252,0.25)" strokeWidth="2"/>
            {/* Incident ray */}
            <line x1="50" y1="200" x2="200" y2="340" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeDasharray="6,4"/>
            {/* Spectrum rays spreading out */}
            {[
              {x2:450,y2:280,color:"rgba(139,92,246,0.6)"},
              {x2:460,y2:310,color:"rgba(59,130,246,0.6)"},
              {x2:468,y2:340,color:"rgba(14,165,233,0.6)"},
              {x2:470,y2:370,color:"rgba(16,185,129,0.6)"},
              {x2:468,y2:400,color:"rgba(234,179,8,0.6)"},
              {x2:462,y2:428,color:"rgba(249,115,22,0.6)"},
              {x2:450,y2:455,color:"rgba(239,68,68,0.6)"},
            ].map((r,i)=>(
              <line key={i} x1="260" y1="355" x2={r.x2} y2={r.y2} stroke={r.color} strokeWidth="2"/>
            ))}
            {/* Circle decoration */}
            <circle cx="400" cy="150" r="60" fill="none" stroke="rgba(14,165,233,0.12)" strokeWidth="1.5"/>
            <circle cx="400" cy="150" r="35" fill="none" stroke="rgba(14,165,233,0.08)" strokeWidth="1"/>
            {/* Ray annotations */}
            <circle cx="200" cy="340" r="4" fill="rgba(125,211,252,0.5)"/>
            <circle cx="260" cy="355" r="5" fill="rgba(125,211,252,0.7)"/>
            {/* Small normal lines */}
            <line x1="200" y1="290" x2="200" y2="390" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3,3"/>
          </svg>

          <div className="lrr-hero-inner">
            <div className="lrr-subject-pill">
              <span className="lrr-pill-dot" />
              Physics · Class X · Science
            </div>
            <div className="lrr-hero-eyebrow">Chapter 10 · NCERT Science</div>
            <h1 className="lrr-hero-title">
              <span className="t1">Light —</span>
              <span className="t2">Reflection &amp;</span>
              <span className="t1" style={{color:"#fff"}}>Refraction</span>
            </h1>
            <p className="lrr-hero-desc">
              From plane mirrors to powerful lenses — master laws of reflection, spherical mirrors, Snell's Law, refractive index, lens formulas, and power of a lens.
            </p>
            <div className="lrr-hero-stats">
              {[
                {num:"2", label:"Laws of Reflection"},
                {num:"6", label:"Mirror Positions"},
                {num:"1.52", label:"Glass Refr. Index"},
                {num:"D", label:"Power Unit (Dioptre)"},
              ].map(s => (
                <div className="lrr-hero-stat" key={s.label}>
                  <div className="lrr-stat-num">{s.num}</div>
                  <div className="lrr-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ BODY ══ */}
        <div className="lrr-body">

          {/* ── INTRO ── */}
          <div className="lrr-intro">
            <div>
              <div className="lrr-intro-kicker">Chapter Overview</div>
              <h2 className="lrr-intro-headline">The Science of <em>Light & Optics</em></h2>
              <p className="lrr-intro-body">
                <strong>Light</strong> is a form of energy that enables us to see objects. It travels from one point to another along a straight line — a property called <strong>rectilinear propagation</strong>. This chapter explores two key optical phenomena: <strong>reflection</strong> (light bouncing off surfaces) and <strong>refraction</strong> (light bending as it crosses media).
              </p>
              <p className="lrr-intro-body">
                We study how spherical mirrors — concave and convex — form images at different positions, how glass bends light according to Snell's Law, and how lenses focus light to create real and virtual images used in everything from eyeglasses to cameras.
              </p>
            </div>
            <div className="lrr-intro-sidebar">
              <div className="lrr-sidebar-label">Topics Covered</div>
              <div className="lrr-sidebar-title">What You'll Learn</div>
              <ul className="lrr-sidebar-list">
                {[
                  "Laws of Reflection & Plane Mirrors",
                  "Spherical Mirrors — Concave & Convex",
                  "Mirror Formula & Magnification",
                  "Refraction & Snell's Law",
                  "Refractive Index of Media",
                  "Spherical Lenses — Types & Image Formation",
                  "Lens Formula & Magnification",
                  "Power of a Lens (Dioptre)",
                ].map((t,i) => (
                  <li className="lrr-sidebar-item" key={i}>
                    <span className="lrr-sidebar-num">{i+1}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ════ SECTION 1: REFLECTION ════ */}
          <div className="lrr-ch-divider">
            <div className="lrr-ch-badge"><span className="lrr-ch-num">01</span><span className="lrr-ch-badge-text">Reflection of Light</span></div>
          </div>

          <div className="lrr-sec-head">
            <span className="lrr-sec-num">1</span>
            <div className="lrr-sec-kicker">Bouncing of Light</div>
            <h2 className="lrr-sec-title">Laws of Reflection & <span>Plane Mirrors</span></h2>
          </div>

          <p className="lrr-body-text">
            When light falls on a highly polished surface such as a mirror, most of it gets <strong>reflected</strong> back. Reflection follows two fundamental laws that hold for all types of mirrors — plane, concave, and convex.
          </p>

          {/* Laws card */}
          <div className="lrr-laws-card">
            <div className="lrr-laws-top">
              <span className="lrr-laws-icon">🔦</span>
              <div className="lrr-laws-title-wrap">
                <div className="lrr-laws-tag">Fundamental Principles</div>
                <div className="lrr-laws-title">The Two Laws of Reflection</div>
              </div>
            </div>
            <div className="lrr-laws-body">
              <div className="lrr-law-item">
                <div className="lrr-law-num">01</div>
                <div className="lrr-law-title">Equal Angles</div>
                <div className="lrr-law-desc">The angle of incidence is always equal to the angle of reflection.</div>
                <div className="lrr-law-formula">∠i = ∠r</div>
              </div>
              <div className="lrr-law-item">
                <div className="lrr-law-num">02</div>
                <div className="lrr-law-title">Coplanar Rays</div>
                <div className="lrr-law-desc">The incident ray, the reflected ray, and the normal to the reflecting surface at the point of incidence all lie in the same plane.</div>
              </div>
            </div>
          </div>

          {/* Plane mirror properties */}
          <p className="lrr-body-text"><strong>Image formed by a Plane Mirror</strong> — when an object is placed in front of a plane mirror, the image has these properties:</p>
          <div className="lrr-mirror-props">
            {[
              {icon:"👁️", title:"Virtual & Erect", desc:"The image is virtual (cannot be obtained on a screen) and erect (upright — same orientation as the object)."},
              {icon:"↔️", title:"Laterally Inverted", desc:"Left side of the object appears as the right side of the image, and vice versa."},
              {icon:"📏", title:"Same Size", desc:"The size of the image is exactly equal to the size of the object. Magnification = 1."},
              {icon:"📐", title:"Equal Distance", desc:"The image is as far behind the mirror as the object is in front of it. Object distance = Image distance."},
            ].map(p => (
              <div className="lrr-mp-card" key={p.title}>
                <span className="lrr-mp-icon">{p.icon}</span>
                <div>
                  <div className="lrr-mp-title">{p.title}</div>
                  <div className="lrr-mp-desc">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ════ SECTION 2: SPHERICAL MIRRORS ════ */}
          <div className="lrr-ch-divider">
            <div className="lrr-ch-badge"><span className="lrr-ch-num">02</span><span className="lrr-ch-badge-text">Spherical Mirrors</span></div>
          </div>

          <div className="lrr-sec-head">
            <span className="lrr-sec-num">2</span>
            <div className="lrr-sec-kicker">Curved Reflecting Surfaces</div>
            <h2 className="lrr-sec-title">Concave &amp; Convex <span>Mirrors</span></h2>
          </div>

          <p className="lrr-body-text">
            <strong>Spherical mirrors</strong> are mirrors whose reflecting surface is a part of a hollow sphere. Think of the curved surface of a shiny spoon — if it curves inward, it acts as a concave mirror; if outward, a convex mirror.
          </p>

          {/* Mirror types */}
          <div className="lrr-mirror-types">
            <div className="lrr-mt-card">
              <div className="lrr-mt-hdr concave">
                <div className="lrr-mt-tag">Reflects Inward</div>
                <div className="lrr-mt-name">Concave Mirror</div>
                <div className="lrr-mt-alias">Also called: Converging Mirror</div>
              </div>
              <div className="lrr-mt-body">
                {[
                  <><strong>Converges</strong> parallel rays to a real focus point in front of the mirror</>,
                  "Focal length (f) is negative by sign convention",
                  <><strong>Can form</strong> both real and virtual images depending on object position</>,
                  "Used in torches, solar furnaces, shaving mirrors, dentist mirrors",
                ].map((t,i) => (
                  <div className="lrr-mt-item" key={i}><span className="lrr-mt-dot concave-dot"/><span>{t}</span></div>
                ))}
              </div>
            </div>
            <div className="lrr-mt-card">
              <div className="lrr-mt-hdr convex">
                <div className="lrr-mt-tag">Reflects Outward</div>
                <div className="lrr-mt-name">Convex Mirror</div>
                <div className="lrr-mt-alias">Also called: Diverging Mirror</div>
              </div>
              <div className="lrr-mt-body">
                {[
                  <><strong>Diverges</strong> parallel rays — appears to come from a virtual focus behind the mirror</>,
                  "Focal length (f) is positive by sign convention",
                  <><strong>Always forms</strong> a virtual, erect, and diminished image</>,
                  "Used as rear-view mirrors — gives wide field of view",
                ].map((t,i) => (
                  <div className="lrr-mt-item" key={i}><span className="lrr-mt-dot convex-dot"/><span>{t}</span></div>
                ))}
              </div>
            </div>
          </div>

          {/* Key terms grid */}
          <p className="lrr-body-text"><strong>Key Terms</strong> related to spherical mirrors:</p>
          <div className="lrr-terms-grid">
            {[
              {sym:"P", name:"Pole", desc:"Geometric central point of the reflecting surface. All distances measured from here."},
              {sym:"C", name:"Centre of Curvature", desc:"Centre of the sphere of which the mirror forms a part. Distance PC = R."},
              {sym:"F", name:"Focus Point", desc:"Point where all parallel rays meet after reflection. Distance PF = f.", formula:"f = R/2"},
              {sym:"R", name:"Radius of Curvature", desc:"Separation between pole and centre of curvature. R = 2f always.", formula:"R = 2f"},
              {sym:"PA", name:"Principal Axis", desc:"Imaginary straight line joining the pole and the centre of curvature."},
              {sym:"A", name:"Aperture", desc:"The effective width (diameter) of the circular reflecting surface of the mirror."},
            ].map(t => (
              <div className="lrr-term-cell" key={t.sym}>
                <div className="lrr-term-badge">{t.sym}</div>
                <div className="lrr-term-name">{t.name}</div>
                <div className="lrr-term-desc">{t.desc}</div>
                {t.formula && <div className="lrr-term-formula">{t.formula}</div>}
              </div>
            ))}
          </div>

          {/* Image formation table */}
          <p className="lrr-body-text"><strong>Image Formation by Concave Mirror</strong> — for 6 different object positions:</p>
          <div style={{overflowX:"auto", marginBottom:"28px"}}>
            <table className="lrr-img-table">
              <thead>
                <tr>
                  <th>Object Position</th>
                  <th>Image Position</th>
                  <th>Size of Image</th>
                  <th>Nature</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["At Infinity","At Focus F","Highly diminished (point size)",<span className="lrr-nature-real">Real, Inverted</span>],
                  ["Beyond C","Between F & C","Small (diminished)",<span className="lrr-nature-real">Real, Inverted</span>],
                  ["At C","At C","Same size as object",<span className="lrr-nature-real">Real, Inverted</span>],
                  ["Between C & F","Beyond C","Enlarged",<span className="lrr-nature-real">Real, Inverted</span>],
                  ["At F","At Infinity","Highly enlarged",<span className="lrr-nature-real">Real, Inverted</span>],
                  ["Between F & P","Behind the mirror","Enlarged",<span className="lrr-nature-virt">Virtual, Erect</span>],
                ].map((r,i) => (
                  <tr key={i}>
                    {r.map((c,j) => <td key={j}>{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lrr-alert blue">
            🪞 <strong>Convex Mirror — Image Formation:</strong> A convex mirror always forms a <strong>virtual, erect, and diminished</strong> image between the pole (P) and the focus (F), regardless of where the object is placed (between infinity and the pole).
          </div>

          {/* Uses */}
          <div className="lrr-uses-block">
            <div className="lrr-uses-card">
              <div className="lrr-uses-hdr cu">
                <div className="lrr-uses-hdr-title">Uses of Concave Mirror</div>
                <div className="lrr-uses-tag">Converging mirror applications</div>
              </div>
              <div className="lrr-uses-body">
                {[
                  "Used in torches, search lights, and vehicle headlights to produce powerful parallel beams",
                  "Used as shaving mirror to see a large, magnified, virtual image of the face",
                  "Used by dentists to see enlarged images of teeth",
                  "Large concave mirrors used to focus sunlight in solar furnaces",
                ].map((t,i) => (
                  <div className="lrr-uses-item" key={i}><span className="lrr-uses-num">{i+1}</span><span>{t}</span></div>
                ))}
              </div>
            </div>
            <div className="lrr-uses-card">
              <div className="lrr-uses-hdr xo">
                <div className="lrr-uses-hdr-title">Uses of Convex Mirror</div>
                <div className="lrr-uses-tag">Diverging mirror applications</div>
              </div>
              <div className="lrr-uses-body">
                {[
                  "Used as rear-view mirrors in vehicles — gives erect image and a wider field of view",
                  "Used in security mirrors in shops and ATMs for wide surveillance coverage",
                  "Street lamp reflectors use convex mirrors to spread light over a large area",
                ].map((t,i) => (
                  <div className="lrr-uses-item" key={i}><span className="lrr-uses-num">{i+1}</span><span>{t}</span></div>
                ))}
              </div>
            </div>
          </div>

          {/* ════ SECTION 3: MIRROR FORMULA ════ */}
          <div className="lrr-ch-divider">
            <div className="lrr-ch-badge"><span className="lrr-ch-num">03</span><span className="lrr-ch-badge-text">Mirror Formula & Sign Convention</span></div>
          </div>

          <div className="lrr-sec-head">
            <span className="lrr-sec-num">3</span>
            <div className="lrr-sec-kicker">Mathematics of Mirrors</div>
            <h2 className="lrr-sec-title">Mirror Formula, Magnification <span>&amp; Sign Convention</span></h2>
          </div>

          {/* Sign convention table */}
          <div className="lrr-sign-card">
            <div className="lrr-sign-hdr">
              <span style={{fontSize:"24px"}}>📐</span>
              <div className="lrr-sign-hdr-title">New Cartesian Sign Convention — Spherical Mirrors</div>
              <div className="lrr-sign-hdr-sub">All distances from Pole (P)</div>
            </div>
            <div className="lrr-sign-body">
              <div className="lrr-sign-row hd">
                <div className="lrr-sign-cell">Quantity</div>
                <div className="lrr-sign-cell">Concave</div>
                <div className="lrr-sign-cell">Convex</div>
              </div>
              {[
                ["Object distance (u)","Always −ve","Always −ve"],
                ["Focal length (f)","Negative (−f)","Positive (+f)"],
                ["Image distance (v)","Real: −ve, Virtual: +ve","Always +ve (virtual)"],
                ["Object height (h)","Always +ve","Always +ve"],
                ["Image height (h')", "Real: −ve (inverted)","Always +ve (erect)"],
              ].map((r,i) => (
                <div className="lrr-sign-row" key={i}>
                  <div className="lrr-sign-cell">{r[0]}</div>
                  <div className="lrr-sign-cell">{r[1].includes("−") ? <span className="lrr-sign-neg">{r[1]}</span> : <span className="lrr-sign-pos">{r[1]}</span>}</div>
                  <div className="lrr-sign-cell">{r[2].includes("−") ? <span className="lrr-sign-neg">{r[2]}</span> : <span className="lrr-sign-pos">{r[2]}</span>}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mirror formula */}
          <div className="lrr-formula-box">
            <div className="lrr-formula-label">Mirror Formula</div>
            <div className="lrr-formula-row">
              <div className="lrr-formula-main">1/f = 1/v + 1/u</div>
              <div className="lrr-formula-vars">
                <div className="lrr-formula-var"><strong>f</strong> — focal length (pole to focus)</div>
                <div className="lrr-formula-var"><strong>v</strong> — image distance from pole</div>
                <div className="lrr-formula-var"><strong>u</strong> — object distance from pole</div>
                <div className="lrr-formula-var"><strong>R = 2f</strong> — radius of curvature</div>
              </div>
            </div>
            <div className="lrr-formula-label" style={{marginTop:"20px"}}>Magnification</div>
            <div className="lrr-formula-row">
              <div className="lrr-formula-main">m = h'/h = −v/u</div>
              <div className="lrr-formula-vars">
                <div className="lrr-formula-var"><strong>h'</strong> — height of image</div>
                <div className="lrr-formula-var"><strong>h</strong> — height of object</div>
                <div className="lrr-formula-var"><strong>−v/u</strong> — ratio of distances</div>
              </div>
            </div>
          </div>

          {/* Magnification strip */}
          <div className="lrr-mag-strip">
            <div className="lrr-mag-cell">
              <div className="lrr-mag-val">|m| &gt; 1</div>
              <div className="lrr-mag-label">Image is Magnified</div>
              <div className="lrr-mag-desc">Image is larger than the object</div>
            </div>
            <div className="lrr-mag-cell">
              <div className="lrr-mag-val">|m| = 1</div>
              <div className="lrr-mag-label">Same Size</div>
              <div className="lrr-mag-desc">Image equals object in size</div>
            </div>
            <div className="lrr-mag-cell">
              <div className="lrr-mag-val">|m| &lt; 1</div>
              <div className="lrr-mag-label">Image is Diminished</div>
              <div className="lrr-mag-desc">Image is smaller than the object</div>
            </div>
          </div>

          <div className="lrr-alert purple">
            💡 <strong>Sign tip:</strong> A <strong>negative magnification</strong> (m &lt; 0) means the image is <strong>real and inverted</strong>. A <strong>positive magnification</strong> (m &gt; 0) means the image is <strong>virtual and erect</strong>. Concave mirrors can produce both; convex mirrors always give positive m.
          </div>

          {/* ════ SECTION 4: REFRACTION ════ */}
          <div className="lrr-ch-divider">
            <div className="lrr-ch-badge"><span className="lrr-ch-num">04</span><span className="lrr-ch-badge-text">Refraction of Light</span></div>
          </div>

          <div className="lrr-sec-head">
            <span className="lrr-sec-num">4</span>
            <div className="lrr-sec-kicker">Bending of Light</div>
            <h2 className="lrr-sec-title">Refraction, Snell's Law <span>&amp; Refractive Index</span></h2>
          </div>

          <p className="lrr-body-text">
            <strong>Refraction</strong> is the bending of light as it travels from one transparent medium to another. It occurs because the <strong>speed of light changes</strong> when it enters a different medium. Light slows down when entering a denser medium, causing it to bend towards the normal; it speeds up in a rarer medium, bending away from the normal.
          </p>

          {/* Refraction contrast block */}
          <div className="lrr-refraction-block">
            <div className="lrr-rb-left">
              <div className="lrr-rb-tag">Rarer → Denser Medium</div>
              <div className="lrr-rb-title">Air to Glass (Bends Towards Normal)</div>
              {[
                <><strong>Speed decreases</strong> as light enters denser medium</>,
                "Refracted ray bends towards the normal",
                "Angle of refraction (r) < angle of incidence (i)",
                <><strong>Example:</strong> Light entering glass/water from air</>,
              ].map((t,i) => (
                <div className="lrr-rb-item" key={i}><span className="lrr-rb-dot" style={{background:"var(--photon-mid)"}}/><span>{t}</span></div>
              ))}
            </div>
            <div className="lrr-rb-right">
              <div className="lrr-rb-tag">Denser → Rarer Medium</div>
              <div className="lrr-rb-title">Glass to Air (Bends Away from Normal)</div>
              {[
                <><strong>Speed increases</strong> as light enters rarer medium</>,
                "Refracted ray bends away from the normal",
                "Angle of refraction (r) > angle of incidence (i)",
                <><strong>Example:</strong> Light exiting glass/water into air</>,
              ].map((t,i) => (
                <div className="lrr-rb-item" key={i}><span className="lrr-rb-dot" style={{background:"var(--photon)"}}/><span>{t}</span></div>
              ))}
            </div>
          </div>

          {/* Common phenomena */}
          <p className="lrr-body-text"><strong>Everyday phenomena due to refraction:</strong></p>
          <div className="lrr-phenom-cards">
            {[
              {icon:"🪨", title:"Raised Stone in Water", desc:"A stone at the bottom of a water tub appears to be raised (closer to the surface) because light bends away from normal when exiting water."},
              {icon:"🐟", title:"Fish Looks Bigger", desc:"A fish in an aquarium appears larger than its actual size because refraction of light at the water–air interface magnifies the image."},
              {icon:"✏️", title:"Pencil in Water", desc:"A pencil partially immersed in water appears displaced/bent at the interface of air and water — a classic refraction effect."},
            ].map(p => (
              <div className="lrr-phenom-card" key={p.title}>
                <span className="lrr-phenom-icon">{p.icon}</span>
                <div className="lrr-phenom-title">{p.title}</div>
                <div className="lrr-phenom-desc">{p.desc}</div>
              </div>
            ))}
          </div>

          {/* Glass slab */}
          <div className="lrr-alert blue">
            🔲 <strong>Refraction through a Rectangular Glass Slab:</strong> When a ray passes through a glass slab, it bends towards the normal at entry (air → glass) and away at exit (glass → air). The emergent ray is <strong>parallel to the incident ray</strong> but <strong>laterally displaced</strong>. If the ray is incident normally (0°), it passes straight through without bending.
          </div>

          {/* Snell's Law */}
          <div className="lrr-snell-box">
            <div className="lrr-snell-label">Snell's Law of Refraction &amp; Refractive Index</div>
            <div className="lrr-snell-eq">
              <div className="lrr-snell-eq-main">sin i / sin r = n₂/n₁ = n₂₁</div>
              <div className="lrr-snell-eq-name">— Snell's Law —</div>
              <div style={{fontSize:"12px",color:"rgba(255,255,255,0.45)",textAlign:"center",fontFamily:"'Inter',sans-serif",lineHeight:"1.6",maxWidth:"220px"}}>For a given colour &amp; pair of media, this ratio is always constant</div>
            </div>
            <div className="lrr-snell-ri">
              <div style={{fontFamily:"'Poppins',sans-serif",fontSize:"11px",fontWeight:"700",letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(125,211,252,0.55)",marginBottom:"10px"}}>Refractive Indices</div>
              {[
                {sym:"nw", val:"1.33", label:"Water — light travels slower than in air"},
                {sym:"ng", val:"1.52", label:"Glass — light travels slower than in water"},
                {sym:"na", val:"≈1.0", label:"Air — nearly same as vacuum"},
              ].map(r => (
                <div className="lrr-snell-ri-row" key={r.sym}>
                  <span className="lrr-snell-ri-symbol">{r.sym}</span>
                  <span className="lrr-snell-ri-value">{r.val}</span>
                  <span className="lrr-snell-ri-label">{r.label}</span>
                </div>
              ))}
              <div style={{marginTop:"12px",fontSize:"12px",color:"rgba(255,255,255,0.4)",fontFamily:"'Inter',sans-serif",padding:"8px 10px",background:"rgba(14,165,233,0.06)",borderRadius:"6px"}}>
                n = c/v &nbsp;&nbsp;|&nbsp;&nbsp; c = 3×10⁸ m/s
              </div>
            </div>
          </div>

          <p className="lrr-body-text">
            <strong>Laws of Refraction:</strong> (1) The incident ray, the refracted ray, and the normal to the interface at the point of incidence all lie in the same plane. (2) The ratio of sin(i) to sin(r) is a constant for a given pair of media — <strong>Snell's Law</strong>.
          </p>

          {/* ════ SECTION 5: SPHERICAL LENSES ════ */}
          <div className="lrr-ch-divider">
            <div className="lrr-ch-badge"><span className="lrr-ch-num">05</span><span className="lrr-ch-badge-text">Spherical Lenses</span></div>
          </div>

          <div className="lrr-sec-head">
            <span className="lrr-sec-num">5</span>
            <div className="lrr-sec-kicker">Transparent Curved Glass</div>
            <h2 className="lrr-sec-title">Convex &amp; Concave <span>Lenses</span></h2>
          </div>

          <p className="lrr-body-text">
            A <strong>lens</strong> is a transparent material (usually glass) bound by two surfaces, of which one or both are spherical. Unlike mirrors that reflect, lenses <strong>refract</strong> light. There are two main types based on the curvature of their surfaces.
          </p>

          {/* Lens types */}
          <div className="lrr-lens-types">
            <div className="lrr-lt-card">
              <div className="lrr-lt-hdr convex-l">
                <div className="lrr-lt-tag">Bulges Outward</div>
                <div className="lrr-lt-name">Convex Lens</div>
                <div className="lrr-lt-alias">Also called: Converging Lens</div>
              </div>
              <div className="lrr-lt-body">
                {[
                  <><strong>Converges</strong> a beam of parallel light rays to a real focus point (F₂) on the other side</>,
                  "Focal length (f) is always positive",
                  "Can form both real and virtual images depending on object position",
                  "Used in magnifying glasses, cameras, microscopes, human eye",
                ].map((t,i) => (
                  <div className="lrr-lt-item" key={i}><span className="lrr-lt-dot convex-l-dot"/><span>{t}</span></div>
                ))}
              </div>
            </div>
            <div className="lrr-lt-card">
              <div className="lrr-lt-hdr concave-l">
                <div className="lrr-lt-tag">Curves Inward</div>
                <div className="lrr-lt-name">Concave Lens</div>
                <div className="lrr-lt-alias">Also called: Diverging Lens</div>
              </div>
              <div className="lrr-lt-body">
                {[
                  <><strong>Diverges</strong> a beam of parallel light rays — rays appear to come from focus F₁ on the same side</>,
                  "Focal length (f) is always negative",
                  "Always forms a virtual, erect, and diminished image",
                  "Used in correcting short-sightedness (myopia)",
                ].map((t,i) => (
                  <div className="lrr-lt-item" key={i}><span className="lrr-lt-dot concave-l-dot"/><span>{t}</span></div>
                ))}
              </div>
            </div>
          </div>

          {/* Lens terms */}
          <p className="lrr-body-text"><strong>Key Terms for Spherical Lenses:</strong></p>
          <div className="lrr-lens-terms">
            {[
              {sym:"O", name:"Optical Centre", desc:"Central point of the lens. A ray passing through O goes straight without any deviation."},
              {sym:"F", name:"Principal Focus", desc:"Point where parallel rays converge (convex) or appear to diverge from (concave) after refraction."},
              {sym:"2F", name:"Centre of Curvature", desc:"Centre of the sphere of which each lens surface forms a part. Also called 2F₁ and 2F₂."},
              {sym:"f", name:"Focal Length", desc:"Distance between optical centre O and the principal focus F. Positive for convex, negative for concave."},
              {sym:"PA", name:"Principal Axis", desc:"Imaginary straight line passing through the two centres of curvature of the lens."},
              {sym:"A", name:"Aperture", desc:"Effective diameter of the circular outline of a spherical lens — determines light-gathering ability."},
            ].map(t => (
              <div className="lrr-lt2-card" key={t.sym}>
                <div className="lrr-lt2-badge">{t.sym}</div>
                <div className="lrr-lt2-name">{t.name}</div>
                <div className="lrr-lt2-desc">{t.desc}</div>
              </div>
            ))}
          </div>

          {/* Image formation table — convex lens */}
          <p className="lrr-body-text"><strong>Image Formation by Convex Lens</strong> — for all positions of object:</p>
          <div style={{overflowX:"auto", marginBottom:"28px"}}>
            <table className="lrr-img-table">
              <thead>
                <tr>
                  <th>Object Position</th>
                  <th>Image Position</th>
                  <th>Size</th>
                  <th>Nature</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["At Infinity","At Focus F₂","Highly diminished",<span className="lrr-nature-real">Real, Inverted</span>],
                  ["Beyond 2F₁","Between F₂ & 2F₂","Small (diminished)",<span className="lrr-nature-real">Real, Inverted</span>],
                  ["At 2F₁","At 2F₂","Same size",<span className="lrr-nature-real">Real, Inverted</span>],
                  ["Between F₁ & 2F₁","Beyond 2F₂","Enlarged",<span className="lrr-nature-real">Real, Inverted</span>],
                  ["At F₁","At Infinity","Highly enlarged",<span className="lrr-nature-real">Real, Inverted</span>],
                  ["Between F₁ & O","Same side as object","Enlarged",<span className="lrr-nature-virt">Virtual, Erect</span>],
                ].map((r,i) => (
                  <tr key={i}>
                    {r.map((c,j) => <td key={j}>{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="lrr-alert purple">
            🔍 <strong>Concave Lens — Image Formation:</strong> For any object position (from infinity to the optical centre), a concave lens always forms an image <strong>between F₁ and O</strong> on the same side as the object. The image is always <strong>virtual, erect, and diminished</strong>.
          </div>

          {/* ════ SECTION 6: LENS FORMULA & POWER ════ */}
          <div className="lrr-ch-divider">
            <div className="lrr-ch-badge"><span className="lrr-ch-num">06</span><span className="lrr-ch-badge-text">Lens Formula &amp; Power</span></div>
          </div>

          <div className="lrr-sec-head">
            <span className="lrr-sec-num">6</span>
            <div className="lrr-sec-kicker">Mathematics of Lenses</div>
            <h2 className="lrr-sec-title">Lens Formula, Magnification <span>&amp; Power of Lens</span></h2>
          </div>

          {/* Lens formula box */}
          <div className="lrr-formula-box">
            <div className="lrr-formula-label">Lens Formula</div>
            <div className="lrr-formula-row">
              <div className="lrr-formula-main">1/f = 1/v − 1/u</div>
              <div className="lrr-formula-vars">
                <div className="lrr-formula-var"><strong>f</strong> — focal length (O to focus F)</div>
                <div className="lrr-formula-var"><strong>v</strong> — image distance from optical centre O</div>
                <div className="lrr-formula-var"><strong>u</strong> — object distance from optical centre O</div>
                <div className="lrr-formula-var">Note: Minus sign (unlike mirror formula which uses +)</div>
              </div>
            </div>
            <div className="lrr-formula-label" style={{marginTop:"20px"}}>Magnification (Lens)</div>
            <div className="lrr-formula-row">
              <div className="lrr-formula-main">m = h'/h = v/u</div>
              <div className="lrr-formula-vars">
                <div className="lrr-formula-var"><strong>Note:</strong> Mirror formula uses −v/u, lens uses +v/u</div>
                <div className="lrr-formula-var">Real image → v is +ve → m is −ve (inverted)</div>
                <div className="lrr-formula-var">Virtual image → v is −ve → m is +ve (erect)</div>
              </div>
            </div>
          </div>

          {/* Lens sign convention */}
          <div className="lrr-sign-card" style={{marginBottom:"28px"}}>
            <div className="lrr-sign-hdr">
              <span style={{fontSize:"24px"}}>📏</span>
              <div className="lrr-sign-hdr-title">Sign Convention for Lenses</div>
              <div className="lrr-sign-hdr-sub">All distances from Optical Centre (O)</div>
            </div>
            <div className="lrr-sign-body">
              <div className="lrr-sign-row hd">
                <div className="lrr-sign-cell">Quantity</div>
                <div className="lrr-sign-cell">Convex Lens</div>
                <div className="lrr-sign-cell">Concave Lens</div>
              </div>
              {[
                ["Object distance (u)","Always −ve","Always −ve"],
                ["Focal length (f)","Always +ve","Always −ve"],
                ["Real image distance (v)","Positive (+v)","N/A (no real image)"],
                ["Virtual image distance (v)","Negative (−v)","Always −ve"],
                ["Object height (h)","Always +ve","Always +ve"],
              ].map((r,i) => (
                <div className="lrr-sign-row" key={i}>
                  <div className="lrr-sign-cell">{r[0]}</div>
                  <div className="lrr-sign-cell">{r[1].includes("−") ? <span className="lrr-sign-neg">{r[1]}</span> : <span className="lrr-sign-pos">{r[1]}</span>}</div>
                  <div className="lrr-sign-cell">{r[2].includes("−") ? <span className="lrr-sign-neg">{r[2]}</span> : <span className="lrr-sign-pos">{r[2]}</span>}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Power of lens */}
          <div className="lrr-power-card">
            <div className="lrr-power-top">
              <span className="lrr-power-icon">⚡</span>
              <div className="lrr-power-title-wrap">
                <div className="lrr-power-tag">Degree of Convergence / Divergence</div>
                <div className="lrr-power-title">Power of a Lens</div>
              </div>
            </div>
            <div className="lrr-power-body">
              <div className="lrr-power-left">
                <div className="lrr-power-section-title">Formula &amp; Unit</div>
                <div className="lrr-power-formula-big">P = 1/f</div>
                <p className="lrr-power-note"><strong>SI unit: Dioptre (D)</strong> — 1 dioptre = power of a lens with focal length of 1 metre.</p>
                <p className="lrr-power-note">If f is in metres: P = 1/f &nbsp;&nbsp;|&nbsp;&nbsp; If f is in cm: P = 100/f</p>
                <p className="lrr-power-note"><strong>Combined lenses in contact:</strong> P<sub>net</sub> = P₁ + P₂ + P₃ + …</p>
              </div>
              <div className="lrr-power-right">
                <div className="lrr-power-section-title">Sign of Power</div>
                {[
                  {type:"Convex (converging) lens", sign:"+ve", cls:"pos"},
                  {type:"Concave (diverging) lens", sign:"−ve", cls:"neg"},
                ].map(r => (
                  <div className="lrr-power-row" key={r.type}>
                    <span className="lrr-power-type">{r.type}</span>
                    <span className={`lrr-power-sign ${r.cls}`}>{r.sign}</span>
                  </div>
                ))}
                <div style={{marginTop:"16px",padding:"12px 14px",background:"var(--photon-lt)",borderRadius:"8px"}}>
                  <div style={{fontFamily:"Poppins,sans-serif",fontSize:"11px",fontWeight:"700",color:"var(--photon2)",marginBottom:"6px",textTransform:"uppercase",letterSpacing:"0.1em"}}>Quick Memory Aid</div>
                  <div style={{fontSize:"13px",color:"var(--ink2)",lineHeight:"1.6"}}>
                    Convex lens <strong>converges</strong> → <strong>+P</strong><br/>
                    Concave lens <strong>diverges</strong> → <strong>−P</strong><br/>
                    Higher |P| = shorter focal length = stronger lens
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lrr-pull-quote">
            <p>"When you look at a distant star through a telescope, or read the fine print with a magnifying glass, you are relying on the same two laws that govern all of optics — the constancy of the angle of reflection and the predictable bending of light at every interface between transparent media."</p>
          </div>

          {/* ═══ FAQ ═══ */}
          <div className="lrr-divider"><div className="lrr-divider-mark"/></div>
          <div className="lrr-faq-header"><span className="lrr-faq-kicker">Exam Preparation</span></div>
          <h2 className="lrr-faq-title">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div className={`lrr-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="lrr-faq-q" onClick={() => toggle(i)}>
                <span className="lrr-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="lrr-faq-icon">{openIndex === i ? "▴" : "▾"}</span>
              </button>
              <div className={`lrr-faq-ans${openIndex === i ? " visible" : ""}`}>
                <div className="lrr-faq-ans-inner">{faq.a}</div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
