import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

/* ── Clean SVG icons ── */
const Icon = ({ id, size = 20, color = "currentColor" }) => {
  const s = size, c = color;
  const icons = {
    zap:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    circuit:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>,
    ohm:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16z"/><path d="M9 18v2m6-2v2"/></svg>,
    thermo:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>,
    power:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>,
    fuse:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V2M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07"/></svg>,
    series:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="12" x2="6" y2="12"/><rect x="6" y="8" width="4" height="8" rx="1"/><line x1="10" y1="12" x2="14" y2="12"/><rect x="14" y="8" width="4" height="8" rx="1"/><line x1="18" y1="12" x2="22" y2="12"/></svg>,
    parallel: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="6" y1="5" x2="6" y2="19"/><line x1="18" y1="5" x2="18" y2="19"/><line x1="6" y1="8" x2="18" y2="8"/><line x1="6" y1="16" x2="18" y2="16"/></svg>,
    bulb:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>,
    ammeter:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14l4-8 4 8"/><line x1="9.5" y1="12" x2="14.5" y2="12"/></svg>,
    volt:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 8l4 8 4-8"/></svg>,
    atom:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z"/></svg>,
    info:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    warn:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    check:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  };
  return icons[id] || null;
};

const styles = `
  :root {
    --volt:      #f59e0b;
    --volt2:     #b45309;
    --volt3:     #451a03;
    --volt-lt:   #fef3c7;
    --volt-mid:  #fcd34d;
    --copper:    #ea580c;
    --copper-lt: #ffedd5;
    --copper-mid:#fdba74;
    --wire:      #1d4ed8;
    --wire-lt:   #dbeafe;
    --wire-mid:  #93c5fd;
    --heat:      #dc2626;
    --heat-lt:   #fee2e2;
    --heat-mid:  #fca5a5;
    --ohm:       #7c3aed;
    --ohm-lt:    #ede9fe;
    --ohm-mid:   #c4b5fd;
    --paper:     #fffbf0;
    --paper2:    #fef9e7;
    --ink:       #1c1917;
    --ink2:      #292524;
    --muted:     #78716c;
    --rule:      #fde68a;
    --white:     #ffffff;
  }
  * { box-sizing:border-box; margin:0; padding:0; }
  .elc-root { font-family:'Inter',sans-serif; background:var(--paper); color:var(--ink); min-height:100vh; }

  /* ═══ HERO ═══ */
  .elc-hero {
    background:linear-gradient(160deg,#0c0800 0%,#1a0f00 50%,#221400 100%);
    min-height:100vh; position:relative; overflow:hidden;
    display:flex; flex-direction:column; justify-content:center;
    padding:80px 0 72px;
  }
  .elc-hero::before {
    content:''; position:absolute; top:0; left:0; right:0; height:5px;
    background:linear-gradient(90deg,#f59e0b 0%,#ea580c 25%,#dc2626 50%,#7c3aed 72%,#1d4ed8 100%);
  }
  /* No grid in hero */
  .elc-hero-grid { display:none; }
  /* Circuit trace lines */
  .elc-trace-h { position:absolute; height:2px; background:linear-gradient(90deg,transparent,rgba(245,158,11,0.2),transparent); pointer-events:none; }
  .elc-trace-v { position:absolute; width:2px; background:linear-gradient(180deg,transparent,rgba(245,158,11,0.2),transparent); pointer-events:none; }

  .elc-glow-1 { position:absolute; top:-10%; left:5%; width:520px; height:520px; border-radius:50%; background:radial-gradient(circle,rgba(245,158,11,0.13) 0%,transparent 65%); pointer-events:none; }
  .elc-glow-2 { position:absolute; bottom:0; right:2%; width:420px; height:420px; border-radius:50%; background:radial-gradient(circle,rgba(124,58,237,0.1) 0%,transparent 65%); pointer-events:none; }
  .elc-glow-3 { position:absolute; top:35%; right:25%; width:300px; height:300px; border-radius:50%; background:radial-gradient(circle,rgba(234,88,12,0.08) 0%,transparent 65%); pointer-events:none; }

  /* Circuit SVG watermark */
  .elc-hero-svg { position:absolute; right:0; top:0; width:46%; height:100%; pointer-events:none; opacity:0.22; }

  .elc-hero-inner { max-width:960px; width:100%; margin:0 auto; padding:0 40px; position:relative; z-index:2; }

  .elc-subject-pill {
    display:inline-flex; align-items:center; gap:8px;
    border:1px solid rgba(245,158,11,0.4); background:rgba(245,158,11,0.1);
    border-radius:6px; padding:6px 16px; margin-bottom:28px;
    font-family:'Poppins',sans-serif; font-size:11px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; color:var(--volt-mid);
  }
  .elc-pill-dot { width:6px; height:6px; border-radius:50%; background:var(--volt-mid); animation:elc-pulse 2s infinite; }
  @keyframes elc-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }

  .elc-hero-eyebrow { font-family:'Poppins',sans-serif; font-size:11px; font-weight:600; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:14px; }
  .elc-hero-title {
    font-family:'Montserrat',sans-serif; font-weight:900;
    font-size:clamp(42px,6vw,82px); line-height:1.0;
    letter-spacing:-0.02em; color:#fff; margin-bottom:10px;
  }
  .elc-hero-title .t1 { display:block; }
  .elc-hero-title .t2 { display:block; color:var(--volt-mid); font-style:italic; }

  .elc-hero-desc { font-size:16px; color:rgba(255,255,255,0.5); line-height:1.85; max-width:520px; margin:22px 0 40px; }

  .elc-hero-stats { display:flex; gap:0; border:1px solid rgba(255,255,255,0.08); border-radius:10px; overflow:hidden; width:fit-content; flex-wrap:wrap; }
  .elc-hero-stat { padding:14px 26px; border-right:1px solid rgba(255,255,255,0.08); }
  .elc-hero-stat:last-child { border-right:none; }
  .elc-stat-num { font-family:'Montserrat',sans-serif; font-size:22px; font-weight:800; color:var(--volt-mid); line-height:1; margin-bottom:4px; }
  .elc-stat-label { font-size:11px; color:rgba(255,255,255,0.35); font-weight:500; letter-spacing:0.05em; font-family:'Poppins',sans-serif; }

  /* ═══ BODY ═══ */
  .elc-body { max-width:920px; margin:0 auto; padding:80px 32px 100px; }

  /* ═══ INTRO ═══ */
  .elc-intro { display:grid; grid-template-columns:3fr 2fr; gap:40px; margin-bottom:72px; align-items:start; }
  @media(max-width:640px){.elc-intro{grid-template-columns:1fr;}}
  .elc-intro-kicker { font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:var(--volt2); margin-bottom:12px; display:flex; align-items:center; gap:10px; }
  .elc-intro-kicker::after { content:''; width:44px; height:1px; background:var(--volt-mid); }
  .elc-intro-headline { font-family:'Montserrat',sans-serif; font-size:clamp(20px,3vw,28px); font-weight:800; color:var(--ink); line-height:1.2; margin-bottom:16px; }
  .elc-intro-headline em { font-style:italic; color:var(--volt2); }
  .elc-intro-body { font-size:15.5px; line-height:1.85; color:var(--ink2); margin-bottom:14px; }
  .elc-intro-body strong { color:var(--volt3); font-weight:600; }
  .elc-intro-sidebar { background:linear-gradient(160deg,#0c0800,#1a0f00); border-radius:14px; padding:26px 22px; position:relative; overflow:hidden; }
  .elc-intro-sidebar::before { content:''; position:absolute; top:-20px; right:-20px; width:100px; height:100px; border-radius:50%; background:rgba(245,158,11,0.1); }
  .elc-sidebar-label { font-family:'Poppins',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(252,211,77,0.55); margin-bottom:12px; }
  .elc-sidebar-title { font-family:'Montserrat',sans-serif; font-size:17px; font-weight:800; color:#fff; margin-bottom:14px; line-height:1.3; }
  .elc-sidebar-list { list-style:none; padding:0; }
  .elc-sidebar-item { display:flex; align-items:center; gap:10px; padding:7px 0; border-bottom:1px solid rgba(255,255,255,0.07); font-size:13px; color:rgba(255,255,255,0.72); }
  .elc-sidebar-item:last-child { border-bottom:none; }
  .elc-sidebar-num { font-family:'Montserrat',sans-serif; font-size:19px; font-weight:800; color:var(--volt-mid); flex-shrink:0; width:24px; line-height:1; }

  /* ═══ CHAPTER DIVIDER ═══ */
  .elc-ch-divider { display:flex; align-items:center; gap:12px; margin:64px 0 48px; }
  .elc-ch-divider::before, .elc-ch-divider::after { content:''; flex:1; height:1px; background:var(--rule); min-width:12px; }
  .elc-ch-badge {
    display:inline-flex; align-items:center; gap:10px;
    background:var(--volt2); border-radius:8px; padding:10px 20px;
    font-family:'Poppins',sans-serif; font-size:12px; font-weight:700;
    letter-spacing:0.1em; text-transform:uppercase; color:#fff;
    flex-shrink:0; max-width:72%;
  }
  .elc-ch-num { font-family:'Montserrat',sans-serif; font-size:16px; color:var(--volt-mid); font-weight:800; white-space:nowrap; flex-shrink:0; line-height:1; }
  .elc-ch-text { white-space:normal; word-break:break-word; line-height:1.3; }
  @media(max-width:480px){
    .elc-ch-divider{margin:48px 0 32px;gap:8px;}
    .elc-ch-badge{font-size:10px;padding:8px 14px;gap:8px;max-width:76%;}
    .elc-ch-num{font-size:14px;}
  }

  /* ═══ SECTION HEADER ═══ */
  .elc-sec-head { margin-bottom:28px; }
  .elc-sec-num { font-family:'Montserrat',sans-serif; font-size:80px; font-weight:900; color:var(--volt-lt); line-height:0.85; letter-spacing:-0.04em; display:block; margin-bottom:2px; }
  .elc-sec-kicker { font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--volt2); margin-bottom:6px; }
  .elc-sec-title { font-family:'Montserrat',sans-serif; font-size:clamp(20px,3vw,30px); font-weight:800; color:var(--ink); line-height:1.15; border-bottom:2px solid var(--rule); padding-bottom:16px; }
  .elc-sec-title span { color:var(--volt2); font-style:italic; }

  /* ═══ BODY TEXT ═══ */
  .elc-body-text { font-size:15.5px; line-height:1.85; color:var(--ink2); margin-bottom:24px; }
  .elc-body-text strong { color:var(--volt3); font-weight:600; }

  /* ═══ FUNDAMENTAL QUANTITIES — 3-card row ═══ */
  .elc-qty-grid {
    display:grid; grid-template-columns:repeat(3,1fr); gap:1px;
    background:var(--rule); border:1.5px solid var(--rule); border-radius:14px;
    overflow:hidden; margin-bottom:28px;
  }
  @media(max-width:580px){.elc-qty-grid{grid-template-columns:1fr;}}
  .elc-qty-cell { background:var(--white); padding:0; display:flex; flex-direction:column; }
  .elc-qty-top { padding:18px 18px 14px; }
  .elc-qty-cell:nth-child(1) .elc-qty-top { background:linear-gradient(135deg,#1c0d00,#3d1f00); }
  .elc-qty-cell:nth-child(2) .elc-qty-top { background:linear-gradient(135deg,#0a0f28,#1a2060); }
  .elc-qty-cell:nth-child(3) .elc-qty-top { background:linear-gradient(135deg,#1a0a30,#361268); }
  .elc-qty-sym { font-family:'Montserrat',sans-serif; font-size:36px; font-weight:900; line-height:1; margin-bottom:4px; }
  .elc-qty-cell:nth-child(1) .elc-qty-sym { color:var(--volt-mid); }
  .elc-qty-cell:nth-child(2) .elc-qty-sym { color:var(--wire-mid); }
  .elc-qty-cell:nth-child(3) .elc-qty-sym { color:var(--ohm-mid); }
  .elc-qty-name { font-family:'Poppins',sans-serif; font-size:13px; font-weight:700; color:#fff; }
  .elc-qty-body { padding:14px 18px 18px; flex:1; }
  .elc-qty-def  { font-size:13px; line-height:1.65; color:var(--ink2); margin-bottom:10px; }
  .elc-qty-formula {
    font-family:'Montserrat',sans-serif; font-size:15px; font-weight:800;
    display:inline-block; padding:5px 14px; border-radius:6px; margin-bottom:8px;
  }
  .elc-qty-cell:nth-child(1) .elc-qty-formula { background:var(--volt-lt); color:var(--volt2); }
  .elc-qty-cell:nth-child(2) .elc-qty-formula { background:var(--wire-lt); color:var(--wire); }
  .elc-qty-cell:nth-child(3) .elc-qty-formula { background:var(--ohm-lt);  color:var(--ohm); }
  .elc-qty-unit { font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; }
  .elc-qty-cell:nth-child(1) .elc-qty-unit { color:var(--volt2); }
  .elc-qty-cell:nth-child(2) .elc-qty-unit { color:var(--wire); }
  .elc-qty-cell:nth-child(3) .elc-qty-unit { color:var(--ohm); }
  .elc-qty-fact { font-size:12px; color:var(--muted); margin-top:6px; line-height:1.55; border-top:1px solid var(--rule); padding-top:8px; }

  /* ═══ OHM'S LAW — dark formula box ═══ */
  .elc-ohm-box {
    background:linear-gradient(160deg,#0c0800,#1a0f00);
    border-radius:14px; padding:28px 32px; margin-bottom:28px;
    border:1.5px solid rgba(245,158,11,0.25); position:relative; overflow:hidden;
    display:grid; grid-template-columns:1fr 1fr; gap:28px; align-items:center;
  }
  @media(max-width:580px){.elc-ohm-box{grid-template-columns:1fr;}}
  .elc-ohm-box::before { content:''; position:absolute; top:-30px; right:-30px; width:160px; height:160px; border-radius:50%; background:radial-gradient(circle,rgba(245,158,11,0.1) 0%,transparent 65%); }
  .elc-ohm-label { font-family:'Poppins',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(252,211,77,0.55); margin-bottom:14px; grid-column:1/-1; }
  .elc-ohm-eq {
    font-family:'Montserrat',sans-serif; font-size:clamp(18px,3vw,28px); font-weight:900;
    color:var(--volt-mid); text-align:center; padding:24px 18px; border-radius:10px;
    background:rgba(245,158,11,0.1); border:1.5px solid rgba(245,158,11,0.2);
    display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;
    min-height:130px; position:relative; z-index:1;
  }
  .elc-ohm-eq-main { color:var(--volt-mid); font-size:1.2em; line-height:1.2; }
  .elc-ohm-eq-tag { font-size:10px; color:rgba(255,255,255,0.4); font-family:'Poppins',sans-serif; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; margin-top:4px; }
  .elc-ohm-vars { display:flex; flex-direction:column; gap:10px; position:relative; z-index:1; }
  .elc-ohm-var-row { display:flex; align-items:center; gap:12px; padding:8px 12px; background:rgba(245,158,11,0.06); border-radius:8px; }
  .elc-ohm-var-sym { font-family:'Montserrat',sans-serif; font-size:16px; font-weight:900; color:var(--volt-mid); flex-shrink:0; width:32px; }
  .elc-ohm-var-name { font-size:12px; color:rgba(255,255,255,0.65); font-family:'Inter',sans-serif; flex:1; }
  .elc-ohm-var-unit { font-family:'Montserrat',sans-serif; font-size:12px; font-weight:700; color:rgba(255,255,255,0.4); flex-shrink:0; }

  /* ═══ GEORG OHM CARD ═══ */
  .elc-physicist-card {
    display:grid; grid-template-columns:auto 1fr; gap:0;
    border:1.5px solid var(--rule); border-radius:14px; overflow:hidden; margin-bottom:28px;
  }
  .elc-ph-left { background:linear-gradient(160deg,#0c0800,#1a0f00); padding:28px 22px; width:170px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:10px; flex-shrink:0; }
  .elc-ph-icon { display:flex; align-items:center; justify-content:center; width:54px; height:54px; border-radius:14px; background:rgba(245,158,11,0.15); }
  .elc-ph-name { font-family:'Montserrat',sans-serif; font-size:14px; font-weight:800; color:#fff; line-height:1.2; }
  .elc-ph-era  { font-size:11px; color:rgba(255,255,255,0.35); font-family:'Inter',sans-serif; }
  .elc-ph-right { background:var(--white); padding:24px 26px; }
  .elc-ph-title { font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:var(--volt2); margin-bottom:10px; }
  .elc-ph-body { font-size:14px; color:var(--ink2); line-height:1.75; }
  .elc-ph-body strong { color:var(--volt3); font-weight:600; }
  @media(max-width:560px){.elc-physicist-card{grid-template-columns:1fr;}.elc-ph-left{width:100%;padding:20px;flex-direction:row;gap:16px;}}

  /* ═══ RESISTIVITY TABLE ═══ */
  .elc-res-table { width:100%; border-collapse:collapse; margin-bottom:28px; border-radius:12px; overflow:hidden; border:1.5px solid #e2e8f0; }
  .elc-res-table thead tr { background:linear-gradient(90deg,#1c0800 0%,#b45309 100%); }
  .elc-res-table thead th { padding:12px 16px; font-family:'Poppins',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.09em; text-transform:uppercase; color:rgba(255,255,255,0.88); text-align:left; }
  .elc-res-table tbody tr:nth-child(odd)  { background:#ffffff; }
  .elc-res-table tbody tr:nth-child(even) { background:#fafafa; }
  .elc-res-table tbody tr:hover { background:var(--volt-lt); }
  .elc-res-table td { padding:11px 16px; font-size:13px; color:#1c1917; line-height:1.5; border-bottom:1px solid #e2e8f0; }
  .elc-res-table td:first-child { font-weight:700; color:var(--volt2); font-family:'Poppins',sans-serif; }

  /* ═══ SERIES vs PARALLEL — contrast block ═══ */
  .elc-sp-block {
    display:grid; grid-template-columns:1fr 1fr; margin-bottom:28px;
    border:1.5px solid var(--rule); border-radius:14px; overflow:hidden;
  }
  @media(max-width:580px){.elc-sp-block{grid-template-columns:1fr;}}
  .elc-sp-left  { background:linear-gradient(160deg,#0c0800,#1a0f00); padding:28px 24px; }
  .elc-sp-right { background:var(--white); padding:28px 24px; border-left:1.5px solid var(--rule); }
  @media(max-width:580px){.elc-sp-right{border-left:none;border-top:1.5px solid var(--rule);}}
  .elc-sp-tag { font-family:'Poppins',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; margin-bottom:10px; }
  .elc-sp-left .elc-sp-tag { color:rgba(252,211,77,0.6); }
  .elc-sp-right .elc-sp-tag { color:var(--wire); }
  .elc-sp-title { font-family:'Montserrat',sans-serif; font-size:17px; font-weight:800; margin-bottom:6px; line-height:1.3; }
  .elc-sp-left .elc-sp-title  { color:#fff; }
  .elc-sp-right .elc-sp-title { color:var(--ink); }
  .elc-sp-formula { font-family:'Montserrat',sans-serif; font-size:14px; font-weight:800; display:inline-block; padding:5px 14px; border-radius:6px; margin-bottom:14px; }
  .elc-sp-left .elc-sp-formula  { background:rgba(245,158,11,0.15); color:var(--volt-mid); border:1px solid rgba(245,158,11,0.2); }
  .elc-sp-right .elc-sp-formula { background:var(--wire-lt); color:var(--wire); border:1px solid var(--wire-mid); }
  .elc-sp-item { display:flex; gap:10px; padding:9px 0; border-bottom:1px solid rgba(255,255,255,0.07); font-size:13.5px; line-height:1.65; align-items:flex-start; }
  .elc-sp-right .elc-sp-item { border-bottom-color:var(--rule); }
  .elc-sp-item:last-child { border-bottom:none; }
  .elc-sp-dot { min-width:7px; height:7px; border-radius:50%; margin-top:7px; flex-shrink:0; }
  .elc-sp-left .elc-sp-item  { color:rgba(255,255,255,0.78); }
  .elc-sp-right .elc-sp-item { color:var(--ink2); }
  .elc-sp-left .elc-sp-item  strong { color:var(--volt-mid); }
  .elc-sp-right .elc-sp-item strong { color:var(--wire); }

  /* ═══ CIRCUIT DIAGRAM SVG CARD ═══ */
  .elc-circuit-card { background:linear-gradient(160deg,#0c0800,#1a0f00); border-radius:14px; padding:28px 32px; margin-bottom:28px; border:1.5px solid rgba(245,158,11,0.25); display:flex; flex-direction:column; align-items:center; }
  .elc-circuit-caption { font-family:'Poppins',sans-serif; font-size:11px; color:rgba(252,211,77,0.5); margin-top:14px; text-align:center; letter-spacing:0.08em; text-transform:uppercase; }

  /* ═══ SYMBOLS GRID ═══ */
  .elc-sym-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:28px; }
  @media(max-width:580px){.elc-sym-grid{grid-template-columns:1fr 1fr;}}
  .elc-sym-card { background:var(--white); border:1.5px solid var(--rule); border-radius:10px; padding:16px 14px; display:flex; flex-direction:column; align-items:center; gap:8px; text-align:center; }
  .elc-sym-icon { display:flex; align-items:center; justify-content:center; width:40px; height:40px; border-radius:8px; }
  .elc-sym-name { font-family:'Poppins',sans-serif; font-size:12px; font-weight:700; color:var(--ink); }
  .elc-sym-note { font-size:11px; color:var(--muted); line-height:1.45; }

  /* ═══ JOULE HEATING — formula box ═══ */
  .elc-joule-box {
    background:linear-gradient(160deg,#1a0000,#2e0000);
    border-radius:14px; padding:28px 32px; margin-bottom:28px;
    border:1.5px solid rgba(220,38,38,0.3); position:relative; overflow:hidden;
  }
  .elc-joule-box::before { content:''; position:absolute; top:-30px; right:-30px; width:160px; height:160px; border-radius:50%; background:radial-gradient(circle,rgba(220,38,38,0.1) 0%,transparent 65%); }
  .elc-joule-label { font-family:'Poppins',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(252,165,165,0.6); margin-bottom:18px; }
  .elc-joule-row { display:flex; align-items:flex-start; gap:24px; flex-wrap:wrap; margin-bottom:16px; position:relative; z-index:1; }
  .elc-joule-row:last-child { margin-bottom:0; }
  .elc-joule-eq {
    font-family:'Montserrat',sans-serif; font-size:clamp(16px,2.5vw,24px); font-weight:900;
    color:#fff; background:rgba(220,38,38,0.12); padding:12px 24px; border-radius:10px;
    border:1.5px solid rgba(220,38,38,0.25); letter-spacing:0.04em; white-space:nowrap;
  }
  .elc-joule-vars { display:flex; flex-direction:column; gap:6px; }
  .elc-joule-var { font-size:12px; color:rgba(255,255,255,0.55); }
  .elc-joule-var strong { color:var(--heat-mid); font-family:'Montserrat',sans-serif; }

  /* ═══ POWER FORMULAS — 3-strip ═══ */
  .elc-power-strip {
    display:grid; grid-template-columns:repeat(3,1fr); gap:1px;
    background:var(--rule); border:1.5px solid var(--rule); border-radius:12px;
    overflow:hidden; margin-bottom:28px;
  }
  @media(max-width:580px){.elc-power-strip{grid-template-columns:1fr;}}
  .elc-ps-cell { background:var(--white); padding:20px 18px; text-align:center; }
  .elc-ps-eq   { font-family:'Montserrat',sans-serif; font-size:22px; font-weight:900; color:var(--volt2); margin-bottom:4px; }
  .elc-ps-label { font-family:'Poppins',sans-serif; font-size:12px; font-weight:700; color:var(--ink); margin-bottom:4px; }
  .elc-ps-desc  { font-size:12px; color:var(--muted); line-height:1.5; }

  /* ═══ APPLICATIONS CARDS ═══ */
  .elc-apps-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:28px; }
  @media(max-width:640px){.elc-apps-grid{grid-template-columns:1fr;}}
  .elc-app-card { border-radius:12px; border:1.5px solid var(--rule); background:var(--white); padding:20px 18px; }
  .elc-app-icon { display:flex; align-items:center; justify-content:center; width:44px; height:44px; border-radius:10px; margin-bottom:12px; }
  .elc-app-title { font-family:'Poppins',sans-serif; font-size:13px; font-weight:700; color:var(--volt2); margin-bottom:6px; }
  .elc-app-desc  { font-size:13px; line-height:1.65; color:var(--ink2); }
  .elc-app-note  { font-size:12px; color:var(--muted); margin-top:8px; padding-top:8px; border-top:1px solid var(--rule); line-height:1.55; }

  /* ═══ ENERGY / COMMERCIAL UNITS ═══ */
  .elc-energy-block {
    display:grid; grid-template-columns:1fr 1fr; gap:0;
    border:1.5px solid var(--rule); border-radius:14px; overflow:hidden; margin-bottom:28px;
  }
  @media(max-width:580px){.elc-energy-block{grid-template-columns:1fr;}}
  .elc-en-left  { background:linear-gradient(160deg,#0c0800,#1a0f00); padding:28px 24px; }
  .elc-en-right { background:var(--white); padding:28px 24px; border-left:1.5px solid var(--rule); }
  @media(max-width:580px){.elc-en-right{border-left:none;border-top:1.5px solid var(--rule);}}
  .elc-en-tag { font-family:'Poppins',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; margin-bottom:10px; }
  .elc-en-left .elc-en-tag  { color:rgba(252,211,77,0.6); }
  .elc-en-right .elc-en-tag { color:var(--copper); }
  .elc-en-title { font-family:'Montserrat',sans-serif; font-size:17px; font-weight:800; margin-bottom:14px; }
  .elc-en-left .elc-en-title  { color:#fff; }
  .elc-en-right .elc-en-title { color:var(--ink); }
  .elc-en-item { display:flex; gap:10px; padding:9px 0; border-bottom:1px solid rgba(255,255,255,0.07); font-size:13.5px; line-height:1.65; align-items:flex-start; }
  .elc-en-right .elc-en-item  { border-bottom-color:var(--rule); }
  .elc-en-item:last-child { border-bottom:none; }
  .elc-en-dot { min-width:7px; height:7px; border-radius:50%; margin-top:7px; flex-shrink:0; }
  .elc-en-left .elc-en-item  { color:rgba(255,255,255,0.78); }
  .elc-en-right .elc-en-item { color:var(--ink2); }
  .elc-en-left .elc-en-item  strong { color:var(--volt-mid); }
  .elc-en-right .elc-en-item strong { color:var(--copper); }

  /* ═══ ALERT ═══ */
  .elc-alert { border-radius:10px; padding:14px 20px; font-size:14px; line-height:1.75; margin-bottom:24px; border-left:4px solid; display:flex; gap:12px; align-items:flex-start; }
  .elc-alert.gold   { background:var(--volt-lt);   border-color:var(--volt);   color:var(--volt3); }
  .elc-alert.copper { background:var(--copper-lt); border-color:var(--copper); color:#7c2d12; }
  .elc-alert.blue   { background:var(--wire-lt);   border-color:var(--wire);   color:#1e3a8a; }
  .elc-alert.red    { background:var(--heat-lt);   border-color:var(--heat);   color:#7f1d1d; }
  .elc-alert.purple { background:var(--ohm-lt);    border-color:var(--ohm);    color:#3b0764; }
  .elc-alert strong { font-weight:700; }
  .elc-alert-icon   { flex-shrink:0; margin-top:1px; }

  /* ═══ PULL QUOTE ═══ */
  .elc-pull-quote {
    background:linear-gradient(135deg,#0c0800,#1a0f00);
    border-radius:14px; padding:28px 32px; margin-bottom:28px; position:relative; overflow:hidden;
    border:1.5px solid rgba(245,158,11,0.2);
  }
  .elc-pull-quote::before {
    content:'"'; position:absolute; top:-10px; left:18px;
    font-family:'Montserrat',sans-serif; font-size:120px; font-weight:900;
    color:rgba(245,158,11,0.07); line-height:1;
  }
  .elc-pull-quote p { font-family:'Poppins',sans-serif; font-size:15px; font-weight:500; color:rgba(255,255,255,0.75); line-height:1.8; position:relative; z-index:1; font-style:italic; }

  /* ═══ DIVIDER ═══ */
  .elc-divider { display:flex; justify-content:center; padding:32px 0; margin-bottom:8px; }
  .elc-divider-mark { width:48px; height:3px; background:linear-gradient(90deg,var(--volt),var(--heat)); border-radius:2px; }

  /* ═══ FAQ ═══ */
  .elc-faq-header { text-align:center; margin-bottom:12px; }
  .elc-faq-kicker { font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:var(--volt2); display:inline-block; padding:4px 14px; border:1px solid var(--volt-mid); border-radius:4px; background:var(--volt-lt); }
  .elc-faq-title  { font-family:'Montserrat',sans-serif; font-size:clamp(22px,3.5vw,30px); font-weight:900; color:var(--ink); text-align:center; margin-bottom:32px; letter-spacing:-0.01em; }
  .elc-faq-item   { border:1.5px solid var(--rule); border-radius:10px; margin-bottom:10px; overflow:hidden; background:var(--white); }
  .elc-faq-item.open { border-color:var(--volt-mid); background:var(--paper2); }
  .elc-faq-q      { width:100%; background:none; border:none; padding:16px 20px; display:flex; justify-content:space-between; align-items:center; gap:16px; cursor:pointer; text-align:left; }
  .elc-faq-q-text { font-family:'Poppins',sans-serif; font-size:14px; font-weight:600; color:var(--ink2); line-height:1.5; }
  .elc-faq-icon   { font-size:18px; color:var(--volt2); flex-shrink:0; font-weight:700; }
  .elc-faq-ans    { max-height:0; overflow:hidden; transition:max-height 0.3s ease; font-size:14px; line-height:1.8; color:var(--ink2); }
  .elc-faq-ans.visible { max-height:600px; }
  .elc-faq-ans-inner { padding:0 20px 18px; border-top:1px solid var(--rule); padding-top:14px; }
  .elc-faq-ans strong { color:var(--volt2); font-weight:600; }

  @media(max-width:640px){
    .elc-hero-inner { padding:0 20px; }
    .elc-body { padding:40px 16px 80px; }
    .elc-hero-title { font-size:clamp(34px,10vw,52px); }
    .elc-ohm-box { padding:20px 18px; }
    .elc-joule-box { padding:20px 18px; }
    .elc-pull-quote { padding:22px 20px; }
    .elc-res-table td, .elc-res-table th { padding:9px 10px; font-size:12px; }
    .elc-hero-stats { width:100%; }
    .elc-hero-stat { padding:12px 18px; }
  }
`;

const faqs = [
  {
    q: "Define the SI units of current, potential difference, resistance, electric power, and commercial energy.",
    a: <><strong>Current (I):</strong> Ampere (A) — 1A = 1 coulomb of charge flowing per second.<br/><br/><strong>Potential Difference (V):</strong> Volt (V) — 1V = 1 joule of work done per coulomb of charge.<br/><br/><strong>Resistance (R):</strong> Ohm (Ω) — 1Ω = resistance when 1V causes 1A to flow.<br/><br/><strong>Electric Power (P):</strong> Watt (W) — 1W = 1 joule of energy consumed per second.<br/><br/><strong>Commercial Energy:</strong> Kilowatt-hour (kWh) — 1 kWh = 3.6 × 10⁶ J. Also called "one unit" of electricity.</>
  },
  {
    q: "What is the conventional direction of flow of current?",
    a: <>Conventionally, electric current flows from the <strong>positive terminal</strong> to the <strong>negative terminal</strong> of a battery — i.e., from higher potential to lower potential in the external circuit.<br/><br/>This is opposite to the actual direction of flow of electrons (which flow from negative to positive terminal). The conventional direction was established before electrons were discovered, and it has been retained for historical and practical reasons.</>
  },
  {
    q: "Define resistivity. What are its SI units?",
    a: <><strong>Resistivity (ρ)</strong> is the resistance offered by a conductor of unit length and unit cross-sectional area. It is a property of the material itself, independent of its dimensions.<br/><br/>From the formula: R = ρl/A<br/><code>ρ = RA/l</code><br/><br/><strong>SI unit:</strong> Ω·m (ohm-metre)<br/><br/>Key facts: Resistivity increases with temperature for metals. Alloys generally have higher resistivity than pure metals. Resistivity of alloys is nearly constant over a range of temperatures — making them suitable for heating elements (e.g., Nichrome, Constantan).</>
  },
  {
    q: "On what factors does the resistance of a conductor depend?",
    a: <>Resistance of a conductor depends on:<br/><br/><strong>1. Length (l):</strong> R ∝ l — longer wire has more resistance (more collisions)<br/><strong>2. Cross-sectional Area (A):</strong> R ∝ 1/A — thicker wire has less resistance (more paths for electrons)<br/><strong>3. Nature of Material:</strong> R = ρl/A — ρ (resistivity) depends on material<br/><strong>4. Temperature:</strong> Resistance increases with temperature for metals (more atomic vibrations)<br/><br/>Combined formula: <strong>R = ρl/A</strong> where ρ = resistivity of the material.</>
  },
  {
    q: "How is the voltmeter and ammeter connected in an electric circuit?",
    a: <><strong>Ammeter:</strong> Always connected in <strong>series</strong> in the circuit. It measures current flowing through the circuit. An ammeter has <strong>very low resistance</strong> so that it does not significantly alter the current in the circuit.<br/><br/><strong>Voltmeter:</strong> Always connected in <strong>parallel</strong> across the two points between which potential difference is to be measured. It has <strong>very high resistance</strong> so that negligible current flows through it, and it does not disturb the potential difference being measured.</>
  },
  {
    q: "State Ohm's Law and draw the V-I graph.",
    a: <><strong>Ohm's Law:</strong> The electric current flowing through a conductor is directly proportional to the potential difference across its ends, provided the temperature and other physical conditions remain constant.<br/><br/>Mathematically: <strong>V ∝ I → V = IR</strong><br/><br/>Where R is the resistance (constant for a given conductor at constant temperature).<br/><br/><strong>V-I Graph:</strong> A straight line passing through the origin. The slope of the graph = R (resistance). A steeper slope means higher resistance. This linearity is only valid when temperature is constant.</>
  },
  {
    q: "What is the heating effect of electric current? Derive Joule's Law.",
    a: <>When current flows through a resistor, electrons collide with atoms, converting electrical energy to heat. This is the <strong>heating effect of electric current</strong>.<br/><br/><strong>Derivation:</strong><br/>Work done to move charge Q through potential difference V: W = VQ<br/>Since Q = It: W = VIt<br/>Using V = IR (Ohm's Law): W = (IR)It = <strong>H = I²Rt</strong><br/><br/><strong>Joule's Law:</strong> Heat produced H is:<br/>• Proportional to I² (square of current)<br/>• Proportional to R (resistance)<br/>• Proportional to t (time)<br/><br/>Applications: Electric iron, heater, toaster, oven, electric bulb filament, fuse wire.</>
  },
  {
    q: "Why does the filament of a bulb have a high melting point?",
    a: <>The filament of a bulb is made of <strong>Tungsten</strong> because of its very high melting point of <strong>3380°C</strong>.<br/><br/>When current flows through the filament, it heats up due to the heating effect of electric current. For the filament to glow and emit visible light, it must reach a very high temperature (around 2500–3000°C).<br/><br/>If the filament had a low melting point, it would melt and break before reaching the temperature needed to emit light. Tungsten retains structural integrity at these extreme temperatures, making it ideal for the purpose.</>
  },
  {
    q: "How does a fuse wire protect electrical appliances?",
    a: <>A <strong>fuse</strong> is a safety device made of an alloy with <strong>low melting point</strong> and <strong>high resistivity</strong> (e.g., alloys of Al, Cu, Fe, Pb).<br/><br/><strong>Working principle:</strong> The fuse is always connected in <strong>series</strong>. When a fault causes excessive current to flow, the fuse wire heats up rapidly (H = I²Rt). Since its melting point is low, it melts quickly, breaking the circuit before the excess current can damage the appliances.<br/><br/><strong>Common ratings:</strong> 1A, 2A, 3A, 5A, 10A — chosen based on the power rating of the appliance. A 1kW appliance at 220V draws ~4.54A → needs a 5A fuse.</>
  },
  {
    q: "Derive the formula for effective resistance in series and parallel.",
    a: <><strong>Series:</strong> Same current I flows through all. Different voltage across each.<br/>V = V₁ + V₂ + V₃ = IR₁ + IR₂ + IR₃ = I(R₁+R₂+R₃)<br/><strong>R_eff = R₁ + R₂ + R₃</strong> (maximum)<br/><br/><strong>Parallel:</strong> Same voltage V across all. Different current through each.<br/>I = I₁ + I₂ + I₃ = V/R₁ + V/R₂ + V/R₃ = V(1/R₁+1/R₂+1/R₃)<br/><strong>1/R_eff = 1/R₁ + 1/R₂ + 1/R₃</strong> (minimum effective resistance)<br/><br/><strong>Why parallel is used at home:</strong> Each appliance gets full voltage; if one fails, others continue to work; different appliances can draw different currents.</>
  },
  {
    q: "A wire of length L and resistance R is stretched so length is doubled and area halved. How do resistance and resistivity change?",
    a: <><strong>Original:</strong> R = ρL/A<br/><br/><strong>After stretching:</strong> New length = 2L, New area = A/2<br/>New R' = ρ(2L)/(A/2) = ρ × 2L × 2/A = 4ρL/A = <strong>4R</strong><br/><br/><strong>Resistance becomes 4 times the original.</strong><br/><br/><strong>Resistivity:</strong> Resistivity (ρ) is an intrinsic property of the material — it depends only on the nature of the material and temperature, NOT on shape or dimensions. So <strong>resistivity remains unchanged</strong> after stretching.</>
  },
  {
    q: "An appliance of 2kW works at 220V. Does it require a fuse of 5A?",
    a: <><strong>Given:</strong> P = 2 kW = 2000 W, V = 220 V<br/><br/>Using P = VI:<br/>I = P/V = 2000/220 = <strong>9.09 A</strong><br/><br/>Since the appliance draws ~9.1A, a <strong>5A fuse is NOT sufficient</strong> — it would blow even during normal operation.<br/><br/>A fuse rated at <strong>10A</strong> or higher should be used. The fuse rating must be slightly higher than the normal operating current, but low enough to blow during an overload or short circuit.</>
  },
];

export default function Chapter12Electricity() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="elc-root">

        {/* ══ HERO ══ */}
        <div className="elc-hero">
          <div className="elc-hero-grid" />
          {/* Decorative circuit traces */}
          <div className="elc-trace-h" style={{top:"22%",left:"48%",width:"40%",opacity:0.6}}/>
          <div className="elc-trace-h" style={{top:"55%",left:"52%",width:"30%",opacity:0.4}}/>
          <div className="elc-trace-v" style={{top:"18%",left:"60%",height:"35%",opacity:0.5}}/>
          <div className="elc-trace-v" style={{top:"50%",left:"72%",height:"28%",opacity:0.3}}/>
          <div className="elc-glow-1" />
          <div className="elc-glow-2" />
          <div className="elc-glow-3" />

          {/* Circuit board watermark SVG */}
          <svg className="elc-hero-svg" viewBox="0 0 500 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            {/* Circuit traces */}
            <line x1="50"  y1="150" x2="300" y2="150" stroke="rgba(245,158,11,0.3)" strokeWidth="2"/>
            <line x1="300" y1="150" x2="300" y2="300" stroke="rgba(245,158,11,0.3)" strokeWidth="2"/>
            <line x1="300" y1="300" x2="450" y2="300" stroke="rgba(245,158,11,0.3)" strokeWidth="2"/>
            <line x1="100" y1="350" x2="100" y2="500" stroke="rgba(245,158,11,0.25)" strokeWidth="2"/>
            <line x1="100" y1="500" x2="350" y2="500" stroke="rgba(245,158,11,0.25)" strokeWidth="2"/>
            <line x1="200" y1="200" x2="200" y2="400" stroke="rgba(234,88,12,0.2)" strokeWidth="1.5"/>
            <line x1="200" y1="400" x2="400" y2="400" stroke="rgba(234,88,12,0.2)" strokeWidth="1.5"/>
            {/* Component pads */}
            {[[300,150],[300,300],[100,350],[100,500],[200,200],[200,400]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="5" fill="rgba(245,158,11,0.5)"/>
            ))}
            {/* Resistor symbols */}
            <rect x="120" y="144" width="40" height="12" rx="2" fill="none" stroke="rgba(245,158,11,0.45)" strokeWidth="1.5"/>
            <rect x="280" y="294" width="40" height="12" rx="2" fill="none" stroke="rgba(245,158,11,0.45)" strokeWidth="1.5"/>
            {/* Battery symbol */}
            <line x1="180" y1="130" x2="180" y2="170" stroke="rgba(245,158,11,0.5)" strokeWidth="3"/>
            <line x1="170" y1="143" x2="190" y2="143" stroke="rgba(245,158,11,0.5)" strokeWidth="2"/>
            <line x1="165" y1="157" x2="195" y2="157" stroke="rgba(245,158,11,0.5)" strokeWidth="3"/>
            {/* Bulb */}
            <circle cx="380" cy="460" r="22" fill="none" stroke="rgba(245,158,11,0.35)" strokeWidth="1.5"/>
            <line x1="372" y1="452" x2="388" y2="468" stroke="rgba(245,158,11,0.35)" strokeWidth="1.5"/>
            <line x1="388" y1="452" x2="372" y2="468" stroke="rgba(245,158,11,0.35)" strokeWidth="1.5"/>
            {/* glow around bulb */}
            <circle cx="380" cy="460" r="32" fill="none" stroke="rgba(245,158,11,0.1)" strokeWidth="4"/>
            {/* Electrons flowing */}
            {[150,250,350,450].map((y,i)=>(
              <circle key={i} cx={80+i*15} cy={y} r="3" fill="rgba(29,78,216,0.5)"/>
            ))}
          </svg>

          <div className="elc-hero-inner">
            <div className="elc-subject-pill">
              <span className="elc-pill-dot" />
              Physics · Class X · Science
            </div>
            <div className="elc-hero-eyebrow">Chapter 12 · NCERT Science</div>
            <h1 className="elc-hero-title">
              <span className="t1">Electricity</span>
              <span className="t2">— Current, Resistance</span>
            </h1>
            <p className="elc-hero-desc">
              From the fundamental concept of electric charge to Ohm's Law, resistivity, series and parallel circuits, Joule's heating effect, and electric power — the complete chapter.
            </p>
            <div className="elc-hero-stats">
              {[
                {num:"V=IR",   label:"Ohm's Law"},
                {num:"H=I²Rt", label:"Joule's Law"},
                {num:"3.6×10⁶", label:"J in 1 kWh"},
                {num:"3380°C", label:"Tungsten m.pt."},
              ].map(s => (
                <div className="elc-hero-stat" key={s.label}>
                  <div className="elc-stat-num">{s.num}</div>
                  <div className="elc-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ BODY ══ */}
        <div className="elc-body">

          {/* ── INTRO ── */}
          <div className="elc-intro">
            <div>
              <div className="elc-intro-kicker">Chapter Overview</div>
              <h2 className="elc-intro-headline">The Science of <em>Electric Charge in Motion</em></h2>
              <p className="elc-intro-body">
                <strong>Electricity</strong> is the backbone of modern technology. At its core, it is simply the ordered flow of charged particles — electrons — through a conductor. Understanding electricity means understanding the rules that govern how charge flows, what opposes it, how it does work, and how that work becomes heat or light.
              </p>
              <p className="elc-intro-body">
                This chapter builds from first principles: what a charge is, what makes it flow (potential difference), what opposes flow (resistance), and how these are linked through <strong>Ohm's Law</strong>. We then explore how resistors combine in circuits, the <strong>heating effect of current</strong> (Joule's Law), and the commercial measurement of electrical energy.
              </p>
            </div>
            <div className="elc-intro-sidebar">
              <div className="elc-sidebar-label">Topics Covered</div>
              <div className="elc-sidebar-title">What You'll Learn</div>
              <ul className="elc-sidebar-list">
                {[
                  "Charge, Current & Potential Difference",
                  "Ohm's Law & Resistance",
                  "Factors Affecting Resistance",
                  "Resistivity of Materials",
                  "Series & Parallel Circuits",
                  "Joule's Heating Effect",
                  "Electric Power & Energy",
                  "Applications — Fuse, Bulb, Heating Devices",
                ].map((t,i) => (
                  <li className="elc-sidebar-item" key={i}>
                    <span className="elc-sidebar-num">{i+1}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ════ SECTION 1: FUNDAMENTALS ════ */}
          <div className="elc-ch-divider">
            <div className="elc-ch-badge"><span className="elc-ch-num">01</span><span className="elc-ch-text">Charge, Current &amp; Potential Difference</span></div>
          </div>

          <div className="elc-sec-head">
            <span className="elc-sec-num">1</span>
            <div className="elc-sec-kicker">Building Blocks of Electricity</div>
            <h2 className="elc-sec-title">Three Fundamental <span>Quantities</span></h2>
          </div>

          <p className="elc-body-text">
            Every concept in electricity traces back to these three quantities. Understand them precisely — their definitions, units, and relationships — and the rest of the chapter follows naturally.
          </p>

          <div className="elc-qty-grid">
            {/* Charge */}
            <div className="elc-qty-cell">
              <div className="elc-qty-top">
                <div className="elc-qty-sym">q</div>
                <div className="elc-qty-name">Electric Charge</div>
              </div>
              <div className="elc-qty-body">
                <div className="elc-qty-def">A fundamental property of matter. Electrons carry negative charge (−e), protons carry positive charge (+e). Charge is the source of all electrical phenomena.</div>
                <div className="elc-qty-formula">Q = ne</div>
                <div className="elc-qty-unit">SI Unit: Coulomb (C)</div>
                <div className="elc-qty-fact">e = 1.6×10⁻¹⁹ C · 1C contains ~6×10¹⁸ electrons · Symbol: q or Q</div>
              </div>
            </div>
            {/* Current */}
            <div className="elc-qty-cell">
              <div className="elc-qty-top">
                <div className="elc-qty-sym">I</div>
                <div className="elc-qty-name">Electric Current</div>
              </div>
              <div className="elc-qty-body">
                <div className="elc-qty-def">Rate of flow of electric charge through a cross-section of a conductor. Flows from +ve to −ve terminal conventionally (opposite to electron flow).</div>
                <div className="elc-qty-formula">I = Q/t</div>
                <div className="elc-qty-unit">SI Unit: Ampere (A)</div>
                <div className="elc-qty-fact">1A = 1C/s · mA = 10⁻³A · μA = 10⁻⁶A · Measured by Ammeter (series)</div>
              </div>
            </div>
            {/* Potential Difference */}
            <div className="elc-qty-cell">
              <div className="elc-qty-top">
                <div className="elc-qty-sym">V</div>
                <div className="elc-qty-name">Potential Difference</div>
              </div>
              <div className="elc-qty-body">
                <div className="elc-qty-def">Work done per unit charge to move a charge between two points in a circuit. Generated by chemical action inside a cell/battery.</div>
                <div className="elc-qty-formula">V = W/Q</div>
                <div className="elc-qty-unit">SI Unit: Volt (V)</div>
                <div className="elc-qty-fact">1V = 1J/1C · Measured by Voltmeter (parallel) · High resistance instrument</div>
              </div>
            </div>
          </div>

          {/* Circuit Symbols */}
          <div className="elc-sec-head" style={{marginTop:"48px"}}>
            <span className="elc-sec-num">2</span>
            <div className="elc-sec-kicker">Circuit Diagrams</div>
            <h2 className="elc-sec-title">Common Circuit <span>Symbols &amp; Instruments</span></h2>
          </div>
          <p className="elc-body-text">The standard symbols used in electric circuit diagrams — you must be able to draw and recognise all of these.</p>

          <div className="elc-sym-grid">
            {[
              {bg:"#fef3c7", ic:"#b45309", iconId:"atom",    name:"Cell",        note:"Single electrochemical unit. Has + and − terminals. Symbol: long thin line (+) and short thick line (−)."},
              {bg:"#fef3c7", ic:"#b45309", iconId:"zap",     name:"Battery",     note:"Two or more cells in series. Provides higher voltage than a single cell."},
              {bg:"#f0fdf4", ic:"#15803d", iconId:"circuit",  name:"Key (Switch)",note:"Open key = broken circuit, no current. Closed key = complete circuit, current flows."},
              {bg:"#dbeafe", ic:"#1d4ed8", iconId:"ammeter",  name:"Ammeter (A)", note:"Measures current. Always in series. Very low resistance. Symbol: circle with A."},
              {bg:"#ede9fe", ic:"#7c3aed", iconId:"volt",     name:"Voltmeter (V)",note:"Measures potential difference. Always in parallel. Very high resistance. Symbol: circle with V."},
              {bg:"#fef3c7", ic:"#b45309", iconId:"bulb",     name:"Electric Bulb",note:"Converts electrical energy to light and heat. Filament glows when current passes through it."},
              {bg:"#fee2e2", ic:"#dc2626", iconId:"ohm",      name:"Resistor (R)", note:"Opposes flow of current. Fixed resistance. Symbol: rectangle or zig-zag line."},
              {bg:"#ffedd5", ic:"#ea580c", iconId:"series",   name:"Rheostat (Rh)",note:"Variable resistor. Regulates current by varying resistance without changing voltage."},
              {bg:"#fef9c3", ic:"#ca8a04", iconId:"fuse",     name:"Fuse",         note:"Safety device. Low melting point alloy wire. Melts and breaks circuit during overload."},
            ].map(s => (
              <div className="elc-sym-card" key={s.name}>
                <div className="elc-sym-icon" style={{background:s.bg}}><Icon id={s.iconId} size={20} color={s.ic}/></div>
                <div className="elc-sym-name">{s.name}</div>
                <div className="elc-sym-note">{s.note}</div>
              </div>
            ))}
          </div>

          {/* ════ SECTION 2: OHM'S LAW ════ */}
          <div className="elc-ch-divider">
            <div className="elc-ch-badge"><span className="elc-ch-num">02</span><span className="elc-ch-text">Ohm's Law &amp; Resistance</span></div>
          </div>

          <div className="elc-sec-head">
            <span className="elc-sec-num">3</span>
            <div className="elc-sec-kicker">The Central Law of Circuits</div>
            <h2 className="elc-sec-title">Ohm's Law, Resistance <span>&amp; Resistivity</span></h2>
          </div>

          {/* Physicist card */}
          <div className="elc-physicist-card">
            <div className="elc-ph-left">
              <div className="elc-ph-icon"><Icon id="ohm" size={26} color="#fcd34d"/></div>
              <div className="elc-ph-name">Georg Simon Ohm</div>
              <div className="elc-ph-era">1787 – 1854</div>
            </div>
            <div className="elc-ph-right">
              <div className="elc-ph-title">Discovery of Ohm's Law</div>
              <div className="elc-ph-body">
                German physicist Georg Simon Ohm conducted systematic experiments using a circuit with a battery, resistor, ammeter, and voltmeter. He varied the potential difference and measured the resulting current, plotting V against I. <strong>The graph was always a straight line through the origin</strong> — proving a constant ratio V/I = R for any given conductor at constant temperature. This relationship, published in 1827, is now known as <strong>Ohm's Law</strong>.
              </div>
            </div>
          </div>

          {/* Ohm's Law formula box */}
          <div className="elc-ohm-box">
            <div className="elc-ohm-label">Ohm's Law — Mathematical Statement</div>
            <div className="elc-ohm-eq">
              <div className="elc-ohm-eq-main">V = I × R</div>
              <div className="elc-ohm-eq-tag">V ∝ I at constant temperature</div>
            </div>
            <div className="elc-ohm-vars">
              {[
                {sym:"V", name:"Potential Difference", unit:"Volts (V)"},
                {sym:"I", name:"Electric Current", unit:"Ampere (A)"},
                {sym:"R", name:"Resistance (constant)", unit:"Ohm (Ω)"},
                {sym:"1Ω", name:"When 1V causes 1A to flow", unit:"definition"},
              ].map(v => (
                <div className="elc-ohm-var-row" key={v.sym}>
                  <span className="elc-ohm-var-sym">{v.sym}</span>
                  <span className="elc-ohm-var-name">{v.name}</span>
                  <span className="elc-ohm-var-unit">{v.unit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="elc-alert gold">
            <span className="elc-alert-icon"><Icon id="info" size={17} color="#b45309"/></span>
            <span><strong>V-I Graph:</strong> The graph between V (y-axis) and I (x-axis) is a straight line through the origin for an ohmic conductor. The <strong>slope of the graph = R</strong>. A steeper slope = higher resistance. This linearity holds only when temperature is constant.</span>
          </div>

          {/* Resistivity section */}
          <p className="elc-body-text"><strong>Factors affecting resistance</strong> — and the formula that unifies them:</p>

          <div className="elc-ohm-box" style={{gridTemplateColumns:"1fr",gap:"16px"}}>
            <div className="elc-ohm-label">Resistance Formula — All Factors Combined</div>
            <div style={{display:"flex",gap:"24px",flexWrap:"wrap",alignItems:"center",position:"relative",zIndex:1}}>
              <div className="elc-ohm-eq" style={{minHeight:"auto",padding:"16px 28px"}}>
                <div className="elc-ohm-eq-main">R = ρ × l / A</div>
              </div>
              <div className="elc-ohm-vars" style={{flex:1}}>
                {[
                  {sym:"ρ", name:"Resistivity — depends on material nature & temperature", unit:"Ω·m"},
                  {sym:"l", name:"Length — R ∝ l (longer = more resistance)", unit:"metres"},
                  {sym:"A", name:"Cross-sectional Area — R ∝ 1/A (thicker = less resistance)", unit:"m²"},
                ].map(v => (
                  <div className="elc-ohm-var-row" key={v.sym}>
                    <span className="elc-ohm-var-sym">{v.sym}</span>
                    <span className="elc-ohm-var-name">{v.name}</span>
                    <span className="elc-ohm-var-unit">{v.unit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resistivity table */}
          <p className="elc-body-text"><strong>Resistivity values</strong> — comparing metals, alloys, and insulators:</p>
          <div style={{overflowX:"auto",marginBottom:"28px"}}>
            <table className="elc-res-table">
              <thead>
                <tr>
                  <th>Material</th>
                  <th>Type</th>
                  <th>Resistivity (Ω·m) at 20°C</th>
                  <th>Key Property / Use</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Silver",    "Metal",    "1.60 × 10⁻⁸", "Best conductor — used in precision instruments"],
                  ["Copper",    "Metal",    "1.62 × 10⁻⁸", "Electrical wiring — cheap, excellent conductor"],
                  ["Aluminium", "Metal",    "2.63 × 10⁻⁸", "Overhead power lines — lighter than copper"],
                  ["Tungsten",  "Metal",    "5.20 × 10⁻⁸", "Bulb filaments — very high melting point (3380°C)"],
                  ["Nichrome",  "Alloy",    "1.00 × 10⁻⁶",  "Heating elements — high ρ, doesn't oxidise easily"],
                  ["Constantan","Alloy",    "4.90 × 10⁻⁷",  "Resistance standards — stable over temperature"],
                  ["Glass",     "Insulator","10¹⁰ – 10¹⁴",  "Electrical insulation — very high resistance"],
                  ["Rubber",    "Insulator","10¹³ – 10¹⁶",  "Insulation coating on wires and cables"],
                ].map((r,i) => (
                  <tr key={i}>{r.map((c,j) => <td key={j}>{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="elc-alert copper">
            <span className="elc-alert-icon"><Icon id="info" size={17} color="#9a3412"/></span>
            <span><strong>Why alloys for heating elements?</strong> Alloys like Nichrome have high resistivity (generates more heat per unit length), do not oxidise (burn) easily at high temperatures, and have a nearly constant resistivity over a range of temperatures — making them ideal for electric irons, toasters, heaters.</span>
          </div>

          {/* ════ SECTION 3: SERIES & PARALLEL ════ */}
          <div className="elc-ch-divider">
            <div className="elc-ch-badge"><span className="elc-ch-num">03</span><span className="elc-ch-text">Series &amp; Parallel Circuits</span></div>
          </div>

          <div className="elc-sec-head">
            <span className="elc-sec-num">4</span>
            <div className="elc-sec-kicker">Combining Resistors</div>
            <h2 className="elc-sec-title">Series &amp; Parallel <span>Connections</span></h2>
          </div>

          <p className="elc-body-text">
            Resistors can be connected in two fundamental ways. The mode of connection determines how current and voltage are distributed, and what the effective total resistance becomes.
          </p>

          {/* Series vs Parallel diagram SVG */}
          <div className="elc-circuit-card">
            <svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",maxWidth:"480px"}}>
              {/* ── SERIES CIRCUIT (top half) ── */}
              <text x="10" y="18" fill="rgba(252,211,77,0.7)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700" textAnchor="start">SERIES</text>
              {/* Battery */}
              <line x1="30" y1="50" x2="30" y2="90" stroke="rgba(245,158,11,0.7)" strokeWidth="2"/>
              <line x1="22" y1="60" x2="38" y2="60" stroke="rgba(245,158,11,0.7)" strokeWidth="2.5"/>
              <line x1="18" y1="72" x2="42" y2="72" stroke="rgba(245,158,11,0.7)" strokeWidth="1.5"/>
              {/* Wires */}
              <line x1="30" y1="50" x2="30" y2="30" stroke="rgba(245,158,11,0.5)" strokeWidth="1.5"/>
              <line x1="30" y1="30" x2="460" y2="30" stroke="rgba(245,158,11,0.5)" strokeWidth="1.5"/>
              <line x1="460" y1="30" x2="460" y2="90" stroke="rgba(245,158,11,0.5)" strokeWidth="1.5"/>
              <line x1="30" y1="90" x2="30" y2="110" stroke="rgba(245,158,11,0.5)" strokeWidth="1.5"/>
              <line x1="30" y1="110" x2="460" y2="110" stroke="rgba(245,158,11,0.5)" strokeWidth="1.5"/>
              <line x1="460" y1="90" x2="460" y2="110" stroke="rgba(245,158,11,0.5)" strokeWidth="1.5"/>
              {/* R1 */}
              <rect x="120" y="24" width="60" height="12" rx="2" fill="none" stroke="rgba(245,158,11,0.7)" strokeWidth="1.5"/>
              <text x="150" y="22" fill="rgba(245,158,11,0.6)" fontSize="9" fontFamily="Poppins,sans-serif" textAnchor="middle">R₁</text>
              {/* R2 */}
              <rect x="220" y="24" width="60" height="12" rx="2" fill="none" stroke="rgba(245,158,11,0.7)" strokeWidth="1.5"/>
              <text x="250" y="22" fill="rgba(245,158,11,0.6)" fontSize="9" fontFamily="Poppins,sans-serif" textAnchor="middle">R₂</text>
              {/* R3 */}
              <rect x="320" y="24" width="60" height="12" rx="2" fill="none" stroke="rgba(245,158,11,0.7)" strokeWidth="1.5"/>
              <text x="350" y="22" fill="rgba(245,158,11,0.6)" fontSize="9" fontFamily="Poppins,sans-serif" textAnchor="middle">R₃</text>
              {/* Current arrows */}
              <text x="230" y="122" fill="rgba(245,158,11,0.5)" fontSize="9" fontFamily="Poppins,sans-serif" textAnchor="middle">→ Same current I through all →</text>
              {/* Reff label */}
              <text x="260" y="142" fill="rgba(252,211,77,0.8)" fontSize="10" fontFamily="Montserrat,sans-serif" fontWeight="800" textAnchor="middle">R_eff = R₁ + R₂ + R₃</text>

              {/* ── PARALLEL CIRCUIT (bottom half) ── */}
              <text x="10" y="168" fill="rgba(147,197,253,0.7)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700">PARALLEL</text>
              {/* Vertical bus lines */}
              <line x1="80"  y1="155" x2="80"  y2="195" stroke="rgba(147,197,253,0.6)" strokeWidth="2"/>
              <line x1="420" y1="155" x2="420" y2="195" stroke="rgba(147,197,253,0.6)" strokeWidth="2"/>
              {/* Three parallel branches */}
              {[163,175,187].map((y,i) => (
                <g key={i}>
                  <line x1="80" y1={y} x2="160" y2={y} stroke="rgba(147,197,253,0.5)" strokeWidth="1.5"/>
                  <rect x="160" y={y-5} width="60" height="10" rx="1" fill="none" stroke="rgba(147,197,253,0.65)" strokeWidth="1.5"/>
                  <text x="190" y={y-8} fill="rgba(147,197,253,0.55)" fontSize="8" fontFamily="Poppins,sans-serif" textAnchor="middle">R{i+1}</text>
                  <line x1="220" y1={y} x2="420" y2={y} stroke="rgba(147,197,253,0.5)" strokeWidth="1.5"/>
                </g>
              ))}
              <text x="250" y="200" fill="rgba(147,197,253,0.75)" fontSize="9" fontFamily="Montserrat,sans-serif" fontWeight="700" textAnchor="middle">1/R_eff = 1/R₁ + 1/R₂ + 1/R₃</text>
            </svg>
            <div className="elc-circuit-caption">Series vs Parallel — Circuit Diagrams &amp; Effective Resistance Formulae</div>
          </div>

          {/* Series vs Parallel comparison */}
          <div className="elc-sp-block">
            <div className="elc-sp-left">
              <div className="elc-sp-tag">Maximum Resistance</div>
              <div className="elc-sp-title">Series Connection</div>
              <div className="elc-sp-formula">R_eff = R₁ + R₂ + R₃</div>
              {[
                <><strong>Same current</strong> I flows through all resistors</>,
                <><strong>Voltage divides</strong>: V = V₁ + V₂ + V₃</>,
                "Effective resistance is always greater than any individual resistor",
                <><strong>Disadvantage:</strong> If one component fails, entire circuit breaks</>,
                "Different appliances need different currents — series can't provide this",
                "Used in: Christmas lights, fuse connections",
              ].map((t,i) => (
                <div className="elc-sp-item" key={i}><span className="elc-sp-dot" style={{background:"var(--volt-mid)"}}/><span>{t}</span></div>
              ))}
            </div>
            <div className="elc-sp-right">
              <div className="elc-sp-tag">Minimum Resistance</div>
              <div className="elc-sp-title">Parallel Connection</div>
              <div className="elc-sp-formula">1/R_eff = 1/R₁ + 1/R₂ + 1/R₃</div>
              {[
                <><strong>Same voltage</strong> V across all resistors</>,
                <><strong>Current divides</strong>: I = I₁ + I₂ + I₃</>,
                "Effective resistance is always less than the smallest individual resistor",
                <><strong>Advantage:</strong> If one fails, others continue to work independently</>,
                "Each appliance gets full voltage and draws its own required current",
                "Used in: Home wiring, electrical appliances",
              ].map((t,i) => (
                <div className="elc-sp-item" key={i}><span className="elc-sp-dot" style={{background:"var(--wire)"}}/><span>{t}</span></div>
              ))}
            </div>
          </div>

          {/* ════ SECTION 4: HEATING EFFECT ════ */}
          <div className="elc-ch-divider">
            <div className="elc-ch-badge"><span className="elc-ch-num">04</span><span className="elc-ch-text">Heating Effect &amp; Joule's Law</span></div>
          </div>

          <div className="elc-sec-head">
            <span className="elc-sec-num">5</span>
            <div className="elc-sec-kicker">Electrical Energy → Heat</div>
            <h2 className="elc-sec-title">Joule's Law of <span>Heating</span></h2>
          </div>

          <p className="elc-body-text">
            When current flows through a resistor, electrons collide with the atoms of the conductor, transferring kinetic energy to them. This energy appears as <strong>heat</strong>. The battery keeps supplying energy to maintain the flow. This is the <strong>heating effect of electric current</strong>.
          </p>

          <div className="elc-joule-box">
            <div className="elc-joule-label">Joule's Law of Heating — Derivation</div>
            <div className="elc-joule-row">
              <div className="elc-joule-eq">W = VQ = VIt</div>
              <div className="elc-joule-vars">
                <div className="elc-joule-var">Work done = Potential difference × Charge moved</div>
                <div className="elc-joule-var">Since Q = It → W = VIt</div>
                <div className="elc-joule-var"><strong>V = IR</strong> (Ohm's Law) → substituting:</div>
              </div>
            </div>
            <div className="elc-joule-row">
              <div className="elc-joule-eq">H = I²Rt</div>
              <div className="elc-joule-vars">
                <div className="elc-joule-var"><strong>H</strong> — heat produced (Joules)</div>
                <div className="elc-joule-var"><strong>I²</strong> — square of current (most important factor)</div>
                <div className="elc-joule-var"><strong>R</strong> — resistance of conductor (Ω)</div>
                <div className="elc-joule-var"><strong>t</strong> — time for which current flows (seconds)</div>
              </div>
            </div>
          </div>

          <div className="elc-alert red">
            <span className="elc-alert-icon"><Icon id="warn" size={17} color="#991b1b"/></span>
            <span><strong>Joule's Law Summary:</strong> H ∝ I² (doubling current → 4× the heat) · H ∝ R · H ∝ t · This is why fuses, heating coils, and bulb filaments all rely on the heating effect — the difference is in how much heat they're designed to tolerate.</span>
          </div>

          {/* Applications */}
          <div className="elc-apps-grid">
            {[
              {bg:"#fef3c7",ic:"#b45309",iconId:"thermo", title:"Electric Iron / Heater",  desc:"Nichrome coil has high resistivity — generates intense heat when current flows. H = I²Rt ensures sustained heating at the operating current.", note:"Alloy used: Nichrome (Ni + Cr). High ρ, doesn't oxidise."},
              {bg:"#fef3c7",ic:"#92400e",iconId:"bulb",   title:"Electric Bulb",            desc:"Tungsten filament reaches ~2700°C, emitting visible light. High melting point (3380°C) prevents the filament from melting at operating temperature.", note:"Filament: Tungsten. Inert gas (N₂/Ar) filled to reduce evaporation."},
              {bg:"#fee2e2",ic:"#991b1b",iconId:"fuse",   title:"Electric Fuse",            desc:"Low melting point alloy wire (Al, Cu, Fe, Pb). When excess current flows, I²Rt raises temperature, melting the fuse wire and breaking the circuit.", note:"Always in series. Ratings: 1A, 2A, 3A, 5A, 10A. Protects appliances."},
            ].map(a => (
              <div className="elc-app-card" key={a.title}>
                <div className="elc-app-icon" style={{background:a.bg}}><Icon id={a.iconId} size={20} color={a.ic}/></div>
                <div className="elc-app-title">{a.title}</div>
                <div className="elc-app-desc">{a.desc}</div>
                <div className="elc-app-note">{a.note}</div>
              </div>
            ))}
          </div>

          {/* ════ SECTION 5: POWER & ENERGY ════ */}
          <div className="elc-ch-divider">
            <div className="elc-ch-badge"><span className="elc-ch-num">05</span><span className="elc-ch-text">Electric Power &amp; Energy</span></div>
          </div>

          <div className="elc-sec-head">
            <span className="elc-sec-num">6</span>
            <div className="elc-sec-kicker">Rate of Energy Consumption</div>
            <h2 className="elc-sec-title">Electric Power, <span>Units &amp; Billing</span></h2>
          </div>

          <p className="elc-body-text">
            <strong>Electric Power</strong> is the rate at which electrical energy is consumed or dissipated in a circuit. It can be expressed in three equivalent forms using Ohm's Law.
          </p>

          <div className="elc-power-strip">
            <div className="elc-ps-cell">
              <div className="elc-ps-eq">P = VI</div>
              <div className="elc-ps-label">Voltage × Current</div>
              <div className="elc-ps-desc">Most general form. Used when both V and I are known.</div>
            </div>
            <div className="elc-ps-cell">
              <div className="elc-ps-eq">P = I²R</div>
              <div className="elc-ps-label">Current² × Resistance</div>
              <div className="elc-ps-desc">Used when current and resistance are known. From V = IR.</div>
            </div>
            <div className="elc-ps-cell">
              <div className="elc-ps-eq">P = V²/R</div>
              <div className="elc-ps-label">Voltage² ÷ Resistance</div>
              <div className="elc-ps-desc">Used when voltage and resistance are known. From I = V/R.</div>
            </div>
          </div>

          {/* Energy block */}
          <div className="elc-energy-block">
            <div className="elc-en-left">
              <div className="elc-en-tag">SI vs Commercial Unit</div>
              <div className="elc-en-title">Electrical Energy</div>
              {[
                <><strong>SI Unit:</strong> Joule (J) or Watt-second (Ws) — E = Pt</>,
                <><strong>Commercial Unit:</strong> Kilowatt-hour (kWh) — also called "1 unit"</>,
                <><strong>1 kWh = 1000W × 3600s = 3.6 × 10⁶ J</strong></>,
                <>Bills calculate: Units consumed = P(kW) × time(h)</>,
                <><strong>1 Horsepower = 746 W</strong> (non-SI but still used)</>,
              ].map((t,i) => (
                <div className="elc-en-item" key={i}><span className="elc-en-dot" style={{background:"var(--volt-mid)"}}/><span>{t}</span></div>
              ))}
            </div>
            <div className="elc-en-right">
              <div className="elc-en-tag">Watt — SI Unit of Power</div>
              <div className="elc-en-title">Power Definitions</div>
              {[
                <><strong>1 Watt:</strong> Power consumed when 1A flows at 1V potential difference</>,
                <>P = 1W when: V = 1V and I = 1A (since P = VI)</>,
                <><strong>kW = 10³ W</strong> &nbsp;·&nbsp; <strong>MW = 10⁶ W</strong></>,
                <>Fuse example: 1kW iron at 220V → I = 1000/220 ≈ <strong>4.54A</strong> → use <strong>5A fuse</strong></>,
                <>2kW appliance at 220V → I = 9.09A → use <strong>10A fuse</strong></>,
              ].map((t,i) => (
                <div className="elc-en-item" key={i}><span className="elc-en-dot" style={{background:"var(--copper)"}}/><span>{t}</span></div>
              ))}
            </div>
          </div>

          <div className="elc-alert blue">
            <span className="elc-alert-icon"><Icon id="info" size={17} color="#1e3a8a"/></span>
            <span><strong>Quick Fuse Rule:</strong> Calculate I = P/V for the appliance. Choose a fuse with a rating just above that current. A 1kW, 220V appliance draws 4.54A → 5A fuse. A 2kW, 220V appliance draws 9.09A → 10A fuse, NOT 5A.</span>
          </div>

          <div className="elc-pull-quote">
            <p>"Electricity is invisible — you cannot see an electron, you cannot watch current flow. What you can do is measure the voltage, the current, the resistance, and from those three numbers reconstruct the entire story of what is happening inside the wire."</p>
          </div>

          {/* ══ FAQ ══ */}
          <div className="elc-divider"><div className="elc-divider-mark"/></div>
          <div className="elc-faq-header"><span className="elc-faq-kicker">Exam Preparation</span></div>
          <h2 className="elc-faq-title">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div className={`elc-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="elc-faq-q" onClick={() => toggle(i)}>
                <span className="elc-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="elc-faq-icon">{openIndex === i ? "▴" : "▾"}</span>
              </button>
              <div className={`elc-faq-ans${openIndex === i ? " visible" : ""}`}>
                <div className="elc-faq-ans-inner">{faq.a}</div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
