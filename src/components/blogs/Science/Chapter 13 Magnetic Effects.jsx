import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

/* ── SVG Icons ── */
const Icon = ({ id, size = 20, color = "currentColor" }) => {
  const s = size, c = color;
  const icons = {
    magnet:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 15H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2"/><path d="M18 15h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2"/><line x1="6" y1="3" x2="6" y2="15"/><line x1="18" y1="3" x2="18" y2="15"/><path d="M6 19a4 4 0 0 0 8 0V15H6v4z"/></svg>,
    compass:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
    zap:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    hand:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>,
    motor:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
    coil:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12c0-2 2-3 4-3s4 1 4 3-2 3-4 3-4-1-4-3z"/><path d="M10 12c0-2 2-3 4-3s4 1 4 3-2 3-4 3-4-1-4-3z"/><line x1="2" y1="12" x2="2" y2="6"/><line x1="22" y1="12" x2="22" y2="6"/></svg>,
    wave:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-8 4 16 3-8h4"/></svg>,
    home:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    warn:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    info:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    generator:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
    wire:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l2-6 4 12 2-6h4"/></svg>,
    shield:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    person:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  };
  return icons[id] || null;
};

const styles = `
  :root {
    --mag:      #dc2626;
    --mag2:     #991b1b;
    --mag3:     #450a0a;
    --mag-lt:   #fee2e2;
    --mag-mid:  #fca5a5;
    --indigo:   #4f46e5;
    --indigo-lt:#e0e7ff;
    --indigo-mid:#a5b4fc;
    --teal:     #0d9488;
    --teal-lt:  #ccfbf1;
    --teal-mid: #5eead4;
    --amber:    #d97706;
    --amber-lt: #fef3c7;
    --amber-mid:#fcd34d;
    --slate:    #475569;
    --paper:    #fff5f5;
    --paper2:   #fef2f2;
    --ink:      #1c0a0a;
    --ink2:     #2d1010;
    --muted:    #78716c;
    --rule:     #fecaca;
    --white:    #ffffff;
  }
  * { box-sizing:border-box; margin:0; padding:0; }
  .mag-root { font-family:'Inter',sans-serif; background:var(--paper); color:var(--ink); min-height:100vh; }

  /* ═══ HERO ═══ */
  .mag-hero {
    background:linear-gradient(160deg,#0a0000 0%,#1a0505 50%,#200808 100%);
    min-height:100vh; position:relative; overflow:hidden;
    display:flex; flex-direction:column; justify-content:center;
    padding:80px 0 72px;
  }
  .mag-hero::before {
    content:''; position:absolute; top:0; left:0; right:0; height:5px;
    background:linear-gradient(90deg,#dc2626 0%,#f97316 20%,#eab308 38%,#4f46e5 58%,#0d9488 78%,#dc2626 100%);
  }
  .mag-glow-1 { position:absolute; top:-8%; left:6%; width:540px; height:540px; border-radius:50%; background:radial-gradient(circle,rgba(220,38,38,0.14) 0%,transparent 65%); pointer-events:none; }
  .mag-glow-2 { position:absolute; bottom:0; right:2%; width:440px; height:440px; border-radius:50%; background:radial-gradient(circle,rgba(79,70,229,0.1) 0%,transparent 65%); pointer-events:none; }
  .mag-glow-3 { position:absolute; top:38%; right:26%; width:300px; height:300px; border-radius:50%; background:radial-gradient(circle,rgba(13,148,136,0.08) 0%,transparent 65%); pointer-events:none; }

  /* Magnetic field lines SVG watermark */
  .mag-hero-svg { position:absolute; right:0; top:0; width:48%; height:100%; pointer-events:none; opacity:0.2; }

  .mag-hero-inner { max-width:960px; width:100%; margin:0 auto; padding:0 40px; position:relative; z-index:2; }

  .mag-subject-pill {
    display:inline-flex; align-items:center; gap:8px;
    border:1px solid rgba(220,38,38,0.4); background:rgba(220,38,38,0.1);
    border-radius:6px; padding:6px 16px; margin-bottom:28px;
    font-family:'Poppins',sans-serif; font-size:11px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; color:var(--mag-mid);
  }
  .mag-pill-dot { width:6px; height:6px; border-radius:50%; background:var(--mag-mid); animation:mag-pulse 2s infinite; }
  @keyframes mag-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }

  .mag-hero-eyebrow { font-family:'Poppins',sans-serif; font-size:11px; font-weight:600; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:14px; }
  .mag-hero-title {
    font-family:'Montserrat',sans-serif; font-weight:900;
    font-size:clamp(38px,6vw,76px); line-height:1.0;
    letter-spacing:-0.02em; color:#fff; margin-bottom:10px;
  }
  .mag-hero-title .t1 { display:block; }
  .mag-hero-title .t2 { display:block; color:var(--mag-mid); font-style:italic; }
  .mag-hero-title .t3 { display:block; color:rgba(255,255,255,0.85); }

  .mag-hero-desc { font-size:16px; color:rgba(255,255,255,0.5); line-height:1.85; max-width:520px; margin:22px 0 40px; }

  .mag-hero-stats { display:flex; gap:0; border:1px solid rgba(255,255,255,0.08); border-radius:10px; overflow:hidden; width:fit-content; flex-wrap:wrap; }
  .mag-hero-stat { padding:14px 26px; border-right:1px solid rgba(255,255,255,0.08); }
  .mag-hero-stat:last-child { border-right:none; }
  .mag-stat-num   { font-family:'Montserrat',sans-serif; font-size:22px; font-weight:800; color:var(--mag-mid); line-height:1; margin-bottom:4px; }
  .mag-stat-label { font-size:11px; color:rgba(255,255,255,0.35); font-weight:500; letter-spacing:0.05em; font-family:'Poppins',sans-serif; }

  /* ═══ BODY ═══ */
  .mag-body { max-width:920px; margin:0 auto; padding:80px 32px 100px; }

  /* ═══ INTRO 3fr + 2fr ═══ */
  .mag-intro { display:grid; grid-template-columns:3fr 2fr; gap:40px; margin-bottom:72px; align-items:start; }
  @media(max-width:640px){.mag-intro{grid-template-columns:1fr;}}
  .mag-intro-kicker { font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:var(--mag2); margin-bottom:12px; display:flex; align-items:center; gap:10px; }
  .mag-intro-kicker::after { content:''; width:44px; height:1px; background:var(--mag-mid); }
  .mag-intro-headline { font-family:'Montserrat',sans-serif; font-size:clamp(20px,3vw,28px); font-weight:800; color:var(--ink); line-height:1.2; margin-bottom:16px; }
  .mag-intro-headline em { font-style:italic; color:var(--mag2); }
  .mag-intro-body { font-size:15.5px; line-height:1.85; color:var(--ink2); margin-bottom:14px; }
  .mag-intro-body strong { color:var(--mag3); font-weight:600; }
  .mag-intro-sidebar { background:linear-gradient(160deg,#0a0000,#1a0505); border-radius:14px; padding:26px 22px; position:relative; overflow:hidden; }
  .mag-intro-sidebar::before { content:''; position:absolute; top:-20px; right:-20px; width:100px; height:100px; border-radius:50%; background:rgba(220,38,38,0.1); }
  .mag-sidebar-label { font-family:'Poppins',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(252,165,165,0.6); margin-bottom:12px; }
  .mag-sidebar-title { font-family:'Montserrat',sans-serif; font-size:17px; font-weight:800; color:#fff; margin-bottom:14px; line-height:1.3; }
  .mag-sidebar-list { list-style:none; padding:0; }
  .mag-sidebar-item { display:flex; align-items:center; gap:10px; padding:7px 0; border-bottom:1px solid rgba(255,255,255,0.07); font-size:13px; color:rgba(255,255,255,0.72); }
  .mag-sidebar-item:last-child { border-bottom:none; }
  .mag-sidebar-num { font-family:'Montserrat',sans-serif; font-size:19px; font-weight:800; color:var(--mag-mid); flex-shrink:0; width:24px; line-height:1; }

  /* ═══ CHAPTER DIVIDER ═══ */
  .mag-ch-divider { display:flex; align-items:center; gap:12px; margin:64px 0 48px; }
  .mag-ch-divider::before, .mag-ch-divider::after { content:''; flex:1; height:1px; background:var(--rule); min-width:12px; }
  .mag-ch-badge {
    display:inline-flex; align-items:center; gap:10px;
    background:var(--mag2); border-radius:8px; padding:10px 20px;
    font-family:'Poppins',sans-serif; font-size:12px; font-weight:700;
    letter-spacing:0.1em; text-transform:uppercase; color:#fff;
    flex-shrink:0; max-width:72%;
  }
  .mag-ch-num  { font-family:'Montserrat',sans-serif; font-size:16px; color:var(--mag-mid); font-weight:800; white-space:nowrap; flex-shrink:0; line-height:1; }
  .mag-ch-text { white-space:normal; word-break:break-word; line-height:1.3; }
  @media(max-width:480px){
    .mag-ch-divider{margin:48px 0 32px;gap:8px;}
    .mag-ch-badge{font-size:10px;padding:8px 14px;gap:8px;max-width:76%;}
    .mag-ch-num{font-size:14px;}
  }

  /* ═══ SECTION HEADER ═══ */
  .mag-sec-head { margin-bottom:28px; }
  .mag-sec-num   { font-family:'Montserrat',sans-serif; font-size:80px; font-weight:900; color:var(--mag-lt); line-height:0.85; letter-spacing:-0.04em; display:block; margin-bottom:2px; }
  .mag-sec-kicker{ font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--mag2); margin-bottom:6px; }
  .mag-sec-title { font-family:'Montserrat',sans-serif; font-size:clamp(20px,3vw,30px); font-weight:800; color:var(--ink); line-height:1.15; border-bottom:2px solid var(--rule); padding-bottom:16px; }
  .mag-sec-title span { color:var(--mag2); font-style:italic; }

  /* ═══ BODY TEXT ═══ */
  .mag-body-text { font-size:15.5px; line-height:1.85; color:var(--ink2); margin-bottom:24px; }
  .mag-body-text strong { color:var(--mag3); font-weight:600; }

  /* ═══ PHYSICIST CARD ═══ */
  .mag-physicist-card {
    display:grid; grid-template-columns:auto 1fr; gap:0;
    border:1.5px solid var(--rule); border-radius:14px; overflow:hidden; margin-bottom:28px;
  }
  .mag-ph-left { background:linear-gradient(160deg,#0a0000,#1a0505); padding:28px 22px; width:170px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:10px; flex-shrink:0; }
  .mag-ph-icon { display:flex; align-items:center; justify-content:center; width:54px; height:54px; border-radius:14px; background:rgba(220,38,38,0.18); }
  .mag-ph-name { font-family:'Montserrat',sans-serif; font-size:13px; font-weight:800; color:#fff; line-height:1.25; }
  .mag-ph-era  { font-size:11px; color:rgba(255,255,255,0.35); font-family:'Inter',sans-serif; }
  .mag-ph-right { background:var(--white); padding:24px 26px; }
  .mag-ph-title { font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:var(--mag2); margin-bottom:10px; }
  .mag-ph-body  { font-size:14px; color:var(--ink2); line-height:1.75; }
  .mag-ph-body strong { color:var(--mag3); font-weight:600; }
  @media(max-width:560px){.mag-physicist-card{grid-template-columns:1fr;}.mag-ph-left{width:100%;padding:20px;flex-direction:row;gap:16px;}}

  /* ═══ FIELD LINES PROPERTIES — gap:1px grid ═══ */
  .mag-props-grid {
    display:grid; grid-template-columns:repeat(3,1fr); gap:1px;
    background:var(--rule); border:1.5px solid var(--rule); border-radius:14px;
    overflow:hidden; margin-bottom:28px;
  }
  @media(max-width:580px){.mag-props-grid{grid-template-columns:1fr;}}
  .mag-prop-cell { background:var(--white); padding:0; display:flex; flex-direction:column; }
  .mag-prop-top  { padding:16px 18px 12px; }
  .mag-prop-cell:nth-child(1) .mag-prop-top { background:linear-gradient(135deg,#1a0000,#3d0a0a); }
  .mag-prop-cell:nth-child(2) .mag-prop-top { background:linear-gradient(135deg,#0a0a28,#1e1e5e); }
  .mag-prop-cell:nth-child(3) .mag-prop-top { background:linear-gradient(135deg,#001a14,#004d3a); }
  .mag-prop-num  { font-family:'Montserrat',sans-serif; font-size:30px; font-weight:900; line-height:1; margin-bottom:4px; }
  .mag-prop-cell:nth-child(1) .mag-prop-num { color:var(--mag-mid); }
  .mag-prop-cell:nth-child(2) .mag-prop-num { color:var(--indigo-mid); }
  .mag-prop-cell:nth-child(3) .mag-prop-num { color:var(--teal-mid); }
  .mag-prop-name { font-family:'Poppins',sans-serif; font-size:12px; font-weight:700; color:#fff; }
  .mag-prop-body { padding:14px 18px 16px; flex:1; font-size:13px; line-height:1.65; color:#374151; }
  .mag-prop-badge { display:inline-block; font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; padding:3px 10px; border-radius:4px; margin-top:8px; }
  .mag-prop-cell:nth-child(1) .mag-prop-badge { background:var(--mag-lt);    color:var(--mag2); }
  .mag-prop-cell:nth-child(2) .mag-prop-badge { background:var(--indigo-lt); color:var(--indigo); }
  .mag-prop-cell:nth-child(3) .mag-prop-badge { background:var(--teal-lt);   color:var(--teal); }

  /* ═══ FIELD DIAGRAMS SVG CARD ═══ */
  .mag-diagram-wrap { background:linear-gradient(160deg,#0a0000,#1a0505); border-radius:14px; padding:28px 32px; margin-bottom:28px; border:1.5px solid rgba(220,38,38,0.25); display:flex; flex-direction:column; align-items:center; }
  .mag-diagram-caption { font-family:'Poppins',sans-serif; font-size:11px; color:rgba(252,165,165,0.5); margin-top:14px; text-align:center; letter-spacing:0.08em; text-transform:uppercase; }

  /* ═══ HAND RULES — contrast block ═══ */
  .mag-rules-block {
    display:grid; grid-template-columns:1fr 1fr; margin-bottom:28px;
    border:1.5px solid var(--rule); border-radius:14px; overflow:hidden;
  }
  @media(max-width:580px){.mag-rules-block{grid-template-columns:1fr;}}
  .mag-rl-left  { background:linear-gradient(160deg,#0a0000,#1a0505); padding:28px 24px; }
  .mag-rl-right { background:var(--white); padding:28px 24px; border-left:1.5px solid var(--rule); }
  @media(max-width:580px){.mag-rl-right{border-left:none;border-top:1.5px solid var(--rule);}}
  .mag-rl-tag   { font-family:'Poppins',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; margin-bottom:10px; }
  .mag-rl-left .mag-rl-tag  { color:rgba(252,165,165,0.6); }
  .mag-rl-right .mag-rl-tag { color:var(--indigo); }
  .mag-rl-title { font-family:'Montserrat',sans-serif; font-size:17px; font-weight:800; margin-bottom:10px; line-height:1.3; }
  .mag-rl-left .mag-rl-title  { color:#fff; }
  .mag-rl-right .mag-rl-title { color:var(--ink); }
  .mag-rl-hand  { font-family:'Montserrat',sans-serif; font-size:12px; font-weight:800; display:inline-block; padding:4px 14px; border-radius:6px; margin-bottom:14px; }
  .mag-rl-left .mag-rl-hand  { background:rgba(220,38,38,0.18); color:var(--mag-mid); border:1px solid rgba(220,38,38,0.25); }
  .mag-rl-right .mag-rl-hand { background:var(--indigo-lt); color:var(--indigo); border:1px solid var(--indigo-mid); }
  .mag-rl-fingers { display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-bottom:14px; }
  .mag-rl-finger  { border-radius:8px; padding:10px 10px; text-align:center; }
  .mag-rl-left .mag-rl-finger  { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); }
  .mag-rl-right .mag-rl-finger { background:var(--paper); border:1px solid var(--rule); }
  .mag-rl-fname { font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; margin-bottom:3px; }
  .mag-rl-left .mag-rl-fname  { color:var(--mag-mid); }
  .mag-rl-right .mag-rl-fname { color:var(--indigo); }
  .mag-rl-fval  { font-size:11px; line-height:1.4; }
  .mag-rl-left .mag-rl-fval  { color:rgba(255,255,255,0.65); }
  .mag-rl-right .mag-rl-fval { color:var(--ink2); }
  .mag-rl-rule  { font-size:13px; line-height:1.7; }
  .mag-rl-left .mag-rl-rule  { color:rgba(255,255,255,0.72); }
  .mag-rl-right .mag-rl-rule { color:var(--ink2); }
  .mag-rl-rule strong { font-weight:600; }
  .mag-rl-left .mag-rl-rule  strong { color:var(--mag-mid); }
  .mag-rl-right .mag-rl-rule strong { color:var(--indigo); }
  .mag-rl-app   { margin-top:12px; padding:10px 14px; border-radius:8px; font-size:12.5px; line-height:1.6; }
  .mag-rl-left .mag-rl-app  { background:rgba(220,38,38,0.1); color:rgba(255,255,255,0.65); }
  .mag-rl-right .mag-rl-app { background:var(--indigo-lt); color:#312e81; }
  .mag-rl-app strong { font-weight:700; }

  /* ═══ EMI EXPERIMENTS — timeline list ═══ */
  .mag-emi-list { display:flex; flex-direction:column; gap:0; margin-bottom:28px; border:1.5px solid var(--rule); border-radius:14px; overflow:hidden; }
  .mag-emi-item { display:grid; grid-template-columns:56px 1fr; background:var(--white); border-bottom:1px solid var(--rule); }
  .mag-emi-item:last-child { border-bottom:none; }
  .mag-emi-item:nth-child(even) { background:var(--paper); }
  .mag-emi-icon-col { display:flex; align-items:center; justify-content:center; padding:18px 0; }
  .mag-emi-content  { padding:16px 20px; }
  .mag-emi-name     { font-family:'Poppins',sans-serif; font-size:13px; font-weight:700; color:var(--mag2); margin-bottom:4px; }
  .mag-emi-desc     { font-size:13px; color:var(--ink2); line-height:1.65; }
  .mag-emi-desc strong { color:var(--mag3); font-weight:600; }

  /* ═══ AC vs DC TABLE ═══ */
  .mag-acdc-table { width:100%; border-collapse:collapse; margin-bottom:28px; border-radius:12px; overflow:hidden; border:1.5px solid #e2e8f0; }
  .mag-acdc-table thead tr { background:linear-gradient(90deg,#450a0a 0%,#991b1b 100%); }
  .mag-acdc-table thead th { padding:13px 16px; font-family:'Poppins',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.09em; text-transform:uppercase; color:rgba(255,255,255,0.9); text-align:left; }
  .mag-acdc-table tbody tr:nth-child(odd)  { background:#ffffff; }
  .mag-acdc-table tbody tr:nth-child(even) { background:#fafafa; }
  .mag-acdc-table tbody tr:hover { background:var(--mag-lt); }
  .mag-acdc-table td { padding:12px 16px; font-size:13px; color:#1c1917; line-height:1.5; border-bottom:1px solid #e2e8f0; }
  .mag-acdc-table td:first-child { font-weight:700; color:var(--mag2); font-family:'Poppins',sans-serif; }
  .mag-badge-ac { display:inline-block; background:var(--mag-lt);    color:var(--mag2);    padding:2px 10px; border-radius:4px; font-size:11px; font-weight:700; font-family:'Poppins',sans-serif; }
  .mag-badge-dc { display:inline-block; background:var(--indigo-lt); color:var(--indigo);  padding:2px 10px; border-radius:4px; font-size:11px; font-weight:700; font-family:'Poppins',sans-serif; }

  /* ═══ DOMESTIC WIRING CARDS ═══ */
  .mag-wire-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:28px; }
  @media(max-width:580px){.mag-wire-cards{grid-template-columns:1fr;}}
  .mag-wire-card  { border-radius:12px; overflow:hidden; border:1.5px solid #e2e8f0; display:flex; flex-direction:column; background:#ffffff; }
  .mag-wire-top   { padding:18px 18px 14px; display:flex; align-items:center; gap:12px; }
  .mag-wire-top.live    { background:linear-gradient(135deg,#450a0a,#7f1d1d); }
  .mag-wire-top.neutral { background:linear-gradient(135deg,#0f172a,#1e293b); }
  .mag-wire-top.earth   { background:linear-gradient(135deg,#052e16,#14532d); }
  .mag-wire-swatch { width:20px; height:20px; border-radius:50%; flex-shrink:0; border:2px solid rgba(255,255,255,0.3); }
  .mag-wire-name   { font-family:'Montserrat',sans-serif; font-size:15px; font-weight:800; color:#fff; }
  .mag-wire-body   { padding:14px 18px 16px; background:#ffffff; flex:1; }
  .mag-wire-item   { display:flex; gap:9px; font-size:13px; color:#374151; padding:7px 0; border-bottom:1px solid #f0f0f0; line-height:1.6; align-items:flex-start; }
  .mag-wire-item:last-child { border-bottom:none; padding-bottom:0; }
  .mag-wire-dot    { min-width:6px; height:6px; border-radius:50%; margin-top:7px; flex-shrink:0; }
  .mag-wire-item strong { font-weight:600; color:#111827; }

  /* ═══ SAFETY CARDS ═══ */
  .mag-safety-cards { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:28px; }
  @media(max-width:580px){.mag-safety-cards{grid-template-columns:1fr;}}
  .mag-safety-card { border-radius:12px; border:1.5px solid #e2e8f0; overflow:hidden; }
  .mag-safety-hdr  { padding:18px 20px 14px; display:flex; align-items:center; gap:12px; }
  .mag-safety-hdr.short    { background:linear-gradient(135deg,#450a0a,#7f1d1d); }
  .mag-safety-hdr.overload { background:linear-gradient(135deg,#1c1400,#3d2c00); }
  .mag-safety-icon { display:flex; align-items:center; justify-content:center; width:38px; height:38px; border-radius:8px; background:rgba(255,255,255,0.1); flex-shrink:0; }
  .mag-safety-name { font-family:'Montserrat',sans-serif; font-size:16px; font-weight:800; color:#fff; }
  .mag-safety-body { padding:16px 20px; background:#ffffff; }
  .mag-safety-item { display:flex; gap:10px; font-size:13.5px; color:#374151; padding:8px 0; border-bottom:1px solid #e2e8f0; line-height:1.65; align-items:flex-start; }
  .mag-safety-item:last-child { border-bottom:none; }
  .mag-safety-dot  { min-width:7px; height:7px; border-radius:50%; margin-top:7px; flex-shrink:0; }
  .mag-safety-item strong { font-weight:600; color:#111827; }

  /* ═══ ALERT ═══ */
  .mag-alert { border-radius:10px; padding:14px 20px; font-size:14px; line-height:1.75; margin-bottom:24px; border-left:4px solid; display:flex; gap:12px; align-items:flex-start; }
  .mag-alert.red    { background:var(--mag-lt);    border-color:var(--mag);    color:var(--mag3); }
  .mag-alert.indigo { background:var(--indigo-lt); border-color:var(--indigo); color:#312e81; }
  .mag-alert.teal   { background:var(--teal-lt);   border-color:var(--teal);   color:#134e4a; }
  .mag-alert.amber  { background:var(--amber-lt);  border-color:var(--amber);  color:#78350f; }
  .mag-alert strong { font-weight:700; }
  .mag-alert-icon   { flex-shrink:0; margin-top:1px; }

  /* ═══ PULL QUOTE ═══ */
  .mag-pull-quote {
    background:linear-gradient(135deg,#0a0000,#1a0505);
    border-radius:14px; padding:28px 32px; margin-bottom:28px; position:relative; overflow:hidden;
    border:1.5px solid rgba(220,38,38,0.2);
  }
  .mag-pull-quote::before {
    content:'"'; position:absolute; top:-10px; left:18px;
    font-family:'Montserrat',sans-serif; font-size:120px; font-weight:900;
    color:rgba(220,38,38,0.07); line-height:1;
  }
  .mag-pull-quote p { font-family:'Poppins',sans-serif; font-size:15px; font-weight:500; color:rgba(255,255,255,0.75); line-height:1.8; position:relative; z-index:1; font-style:italic; }

  /* ═══ DIVIDER ═══ */
  .mag-divider { display:flex; justify-content:center; padding:32px 0; margin-bottom:8px; }
  .mag-divider-mark { width:48px; height:3px; background:linear-gradient(90deg,var(--mag),var(--indigo)); border-radius:2px; }

  /* ═══ FAQ ═══ */
  .mag-faq-header { text-align:center; margin-bottom:12px; }
  .mag-faq-kicker { font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:var(--mag2); display:inline-block; padding:4px 14px; border:1px solid var(--mag-mid); border-radius:4px; background:var(--mag-lt); }
  .mag-faq-title  { font-family:'Montserrat',sans-serif; font-size:clamp(22px,3.5vw,30px); font-weight:900; color:var(--ink); text-align:center; margin-bottom:32px; letter-spacing:-0.01em; }
  .mag-faq-item   { border:1.5px solid var(--rule); border-radius:10px; margin-bottom:10px; overflow:hidden; background:var(--white); }
  .mag-faq-item.open { border-color:var(--mag-mid); background:var(--paper2); }
  .mag-faq-q      { width:100%; background:none; border:none; padding:16px 20px; display:flex; justify-content:space-between; align-items:center; gap:16px; cursor:pointer; text-align:left; }
  .mag-faq-q-text { font-family:'Poppins',sans-serif; font-size:14px; font-weight:600; color:var(--ink2); line-height:1.5; }
  .mag-faq-icon   { font-size:18px; color:var(--mag2); flex-shrink:0; font-weight:700; }
  .mag-faq-ans    { max-height:0; overflow:hidden; transition:max-height 0.3s ease; font-size:14px; line-height:1.8; color:var(--ink2); }
  .mag-faq-ans.visible { max-height:700px; }
  .mag-faq-ans-inner { padding:0 20px 18px; border-top:1px solid var(--rule); padding-top:14px; }
  .mag-faq-ans strong { color:var(--mag2); font-weight:600; }

  @media(max-width:640px){
    .mag-hero-inner{padding:0 20px;}
    .mag-body{padding:40px 16px 80px;}
    .mag-hero-title{font-size:clamp(32px,10vw,50px);}
    .mag-pull-quote{padding:22px 20px;}
    .mag-acdc-table td,.mag-acdc-table th{padding:9px 10px;font-size:12px;}
    .mag-hero-stats{width:100%;}
    .mag-hero-stat{padding:12px 18px;}
  }
`;

const faqs = [
  {
    q: "What is the frequency of AC used in India?",
    a: <>The frequency of AC (Alternating Current) used in India is <strong>50 Hz</strong>. This means the current completes 50 cycles per second, or changes its direction <strong>100 times per second</strong> (every 1/100th of a second). In comparison, the USA uses 60 Hz AC. The domestic supply in India is at 220V, 50Hz.</>
  },
  {
    q: "Where are iron filings collected more in a magnetic field pattern?",
    a: <>Iron filings are collected more <strong>near the poles</strong> of the magnet — i.e., at the two ends (North and South poles). This is because the magnetic field is strongest at the poles, where the field lines are most closely packed (dense). The closeness of field lines represents field strength — the more closely packed, the stronger the field. The field is weakest in the middle region between the poles.</>
  },
  {
    q: "Who discovered electromagnetic induction?",
    a: <><strong>Michael Faraday</strong> discovered electromagnetic induction. He demonstrated that a changing magnetic field induces an electric current in a nearby conductor. His experiments (1831) showed that relative motion between a magnet and a coil, or a change in current in one coil, induces a current in a neighbouring coil. This principle is the foundation of <strong>electric generators, transformers, and inductors</strong>.</>
  },
  {
    q: "Why does a compass needle get deflected near a bar magnet?",
    a: <>A compass needle is itself a small bar magnet. When it is brought near a bar magnet, it experiences the <strong>magnetic force</strong> of the external magnet. The North pole of the compass needle is attracted toward the South pole of the bar magnet (and repelled by its North pole), causing the needle to <strong>align along the magnetic field lines</strong> of the bar magnet and deflect from its original north-south position.</>
  },
  {
    q: "If both the coil and the magnet are stationary, will there be deflection in the galvanometer?",
    a: <><strong>No</strong> — there will be no deflection in the galvanometer if both the coil and the magnet are stationary.<br/><br/>According to Faraday's law of electromagnetic induction, an EMF (and hence current) is induced only when there is a <strong>change in the magnetic flux</strong> through the coil. When both are stationary, the magnetic flux through the coil remains constant, so no change occurs, no EMF is induced, and no current flows.</>
  },
  {
    q: "Why do magnetic field lines not intersect each other?",
    a: <>Magnetic field lines cannot intersect each other because at any point in a magnetic field, <strong>there can be only one direction of the magnetic field</strong>. If two field lines intersected at a point, it would mean the magnetic field has two different directions at that point simultaneously — which is physically impossible. The tangent drawn at the point of intersection would give two directions, which contradicts the definition of a magnetic field direction at a point.</>
  },
  {
    q: "What is the advantage of AC over DC?",
    a: <><strong>AC can be transmitted over long distances with much lower energy loss</strong> compared to DC. This is because AC voltage can be easily stepped up using a transformer before transmission (at high voltage, current is low, so I²R losses are minimised) and then stepped down at the receiving end. DC cannot be easily transformed. This makes AC far more economical for power transmission — which is why the national power grid uses AC.</>
  },
  {
    q: "What is short circuiting? What causes it?",
    a: <><strong>Short circuit</strong> occurs when the live wire and neutral wire come into direct contact with each other (or when the resistance of the circuit becomes nearly zero).<br/><br/><strong>Causes:</strong> Damage or wear in the insulation of wires, faulty appliances, or direct accidental contact between the two wires.<br/><br/><strong>Effect:</strong> The circuit resistance becomes negligible → a very large current flows (from Ohm's law: I = V/R, if R→0 then I→∞). This generates enormous heat (H = I²Rt), which can melt wires, cause sparks, and start fires. A <strong>fuse</strong> prevents damage by melting and breaking the circuit.</>
  },
  {
    q: "When is the force on a current-carrying conductor in a magnetic field maximum?",
    a: <>The force on a current-carrying conductor placed in a magnetic field is <strong>maximum when the conductor is perpendicular to the magnetic field</strong> (i.e., the angle between the current direction and the field direction is 90°).<br/><br/>The force is given by F = BIL sinθ, where θ is the angle between the current and the field. When θ = 90°, sin90° = 1, so F = BIL (maximum). When the conductor is parallel to the field (θ = 0°), the force is zero.</>
  },
  {
    q: "Name the rules for: (a) force on current-carrying conductor in magnetic field, (b) direction of magnetic field around a conductor, (c) direction of induced current.",
    a: <><strong>(a) Force on current-carrying conductor:</strong> <em>Fleming's Left Hand Rule</em> — stretch the thumb, forefinger, and middle finger of the left hand mutually perpendicular. Forefinger → magnetic field (F), Middle finger → current (C), Thumb → force/motion (M). Application: Electric Motor.<br/><br/><strong>(b) Direction of magnetic field around a conductor:</strong> <em>Right Hand Thumb Rule (Maxwell's Corkscrew Rule)</em> — hold the conductor in the right hand with the thumb pointing in the direction of current; the curled fingers indicate the direction of magnetic field lines.<br/><br/><strong>(c) Direction of induced current:</strong> <em>Fleming's Right Hand Rule</em> — stretch the thumb, forefinger, and middle finger of the right hand mutually perpendicular. Forefinger → field (F), Thumb → motion (M), Middle finger → induced current (C). Application: Electric Generator.</>
  },
  {
    q: "What is a solenoid? Where is the magnetic field uniform inside it?",
    a: <><strong>Solenoid:</strong> A coil of many circular turns of insulated copper wire wrapped closely in the shape of a cylinder. It behaves like a bar magnet when current flows through it — one end acts as North pole, the other as South pole.<br/><br/><strong>Uniform field:</strong> The magnetic field inside a solenoid is <strong>uniform throughout the interior</strong> — the field lines inside are parallel and equally spaced straight lines. This means the field has the same magnitude and direction at all interior points. The field is strongest and most uniform near the centre of the solenoid.<br/><br/>Use: A soft iron core placed inside becomes an <strong>electromagnet</strong> — much stronger than a permanent magnet and can be switched on/off.</>
  },
  {
    q: "Explain the domestic electric circuit with wire colours and functions.",
    a: <><strong>Supply:</strong> 220V, 50Hz AC. Three wires enter every home:<br/><br/><strong>Live Wire (Red insulation):</strong> At high potential of 220V. Carries current to appliances. Dangerous to touch.<br/><br/><strong>Neutral Wire (Black insulation):</strong> At zero potential. Completes the circuit. The potential difference between live and neutral = 220V.<br/><br/><strong>Earth Wire (Green insulation):</strong> Connected to a copper plate buried deep in the earth near the house. The metallic body of every appliance is connected to earth wire. Provides a low-resistance path — if any leakage current reaches the metallic body, it flows to earth (0V), keeping the body at zero potential and protecting the user from electric shock.<br/><br/><strong>Home circuit has two branches:</strong> 15A circuit (high-power — ACs, geysers) and 5A circuit (low-power — lights, fans). All appliances are connected in parallel so each gets 220V and can be switched independently.</>
  },
];

export default function Chapter13MagneticEffects() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="mag-root">

        {/* ══ HERO ══ */}
        <div className="mag-hero">
          <div className="mag-glow-1" />
          <div className="mag-glow-2" />
          <div className="mag-glow-3" />

          {/* Magnetic field lines SVG watermark */}
          <svg className="mag-hero-svg" viewBox="0 0 500 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            {/* Bar magnet */}
            <rect x="210" y="310" width="80" height="80" rx="4" fill="none" stroke="rgba(220,38,38,0.4)" strokeWidth="2"/>
            <text x="222" y="358" fill="rgba(220,38,38,0.5)" fontSize="16" fontFamily="Montserrat,sans-serif" fontWeight="900">N</text>
            <rect x="210" y="390" width="80" height="80" rx="4" fill="none" stroke="rgba(100,116,139,0.35)" strokeWidth="2"/>
            <text x="222" y="438" fill="rgba(100,116,139,0.45)" fontSize="16" fontFamily="Montserrat,sans-serif" fontWeight="900">S</text>
            {/* Field lines from N pole outward */}
            {/* Top arc lines */}
            {[40,70,100,130].map((r,i) => (
              <ellipse key={i} cx="250" cy="280" rx={r} ry={r*0.55} fill="none" stroke="rgba(220,38,38,0.18)" strokeWidth="1.5"/>
            ))}
            {/* Bottom arc lines */}
            {[40,70,100,130].map((r,i) => (
              <ellipse key={i+4} cx="250" cy="500" rx={r} ry={r*0.55} fill="none" stroke="rgba(100,116,139,0.15)" strokeWidth="1.5"/>
            ))}
            {/* Side connecting lines */}
            <path d="M210,350 Q130,390 210,430" fill="none" stroke="rgba(220,38,38,0.2)" strokeWidth="1.5"/>
            <path d="M290,350 Q370,390 290,430" fill="none" stroke="rgba(220,38,38,0.2)" strokeWidth="1.5"/>
            <path d="M210,330 Q80,390 210,450" fill="none" stroke="rgba(220,38,38,0.14)" strokeWidth="1.5"/>
            <path d="M290,330 Q420,390 290,450" fill="none" stroke="rgba(220,38,38,0.14)" strokeWidth="1.5"/>
            {/* Arrow heads on field lines — N to S outside */}
            <polygon points="248,242 252,242 250,248" fill="rgba(220,38,38,0.4)"/>
            <polygon points="248,532 252,532 250,526" fill="rgba(100,116,139,0.3)"/>
            {/* Compass needles scattered */}
            {[[140,240],[360,240],[100,390],[400,390],[140,530],[360,530]].map(([x,y],i)=>(
              <g key={i}>
                <ellipse cx={x} cy={y} rx="10" ry="5" fill="none" stroke="rgba(220,38,38,0.2)" strokeWidth="1"/>
                <line x1={x-9} y1={y} x2={x+9} y2={y} stroke="rgba(220,38,38,0.35)" strokeWidth="1.5"/>
                <circle cx={x+9} cy={y} r="2" fill="rgba(220,38,38,0.45)"/>
              </g>
            ))}
          </svg>

          <div className="mag-hero-inner">
            <div className="mag-subject-pill">
              <span className="mag-pill-dot" />
              Physics · Class X · Science
            </div>
            <div className="mag-hero-eyebrow">Chapter 13 · NCERT Science</div>
            <h1 className="mag-hero-title">
              <span className="t1">Magnetic Effects</span>
              <span className="t2">of Electric</span>
              <span className="t3">Current</span>
            </h1>
            <p className="mag-hero-desc">
              From Oersted's compass to Fleming's rules — explore magnetic fields, solenoids, electromagnetic induction, electric motors, generators, and domestic wiring.
            </p>
            <div className="mag-hero-stats">
              {[
                {num:"1820",   label:"Oersted's Discovery"},
                {num:"F=BIL", label:"Force on Conductor"},
                {num:"50 Hz",  label:"AC Frequency India"},
                {num:"220 V",  label:"Domestic Supply"},
              ].map(s => (
                <div className="mag-hero-stat" key={s.label}>
                  <div className="mag-stat-num">{s.num}</div>
                  <div className="mag-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ BODY ══ */}
        <div className="mag-body">

          {/* ── INTRO ── */}
          <div className="mag-intro">
            <div>
              <div className="mag-intro-kicker">Chapter Overview</div>
              <h2 className="mag-intro-headline">Where <em>Electricity Meets Magnetism</em></h2>
              <p className="mag-intro-body">
                For centuries, electricity and magnetism were thought to be completely separate phenomena. In 1820, <strong>Hans Christian Oersted</strong> changed everything — a simple compass needle near a current-carrying wire deflected, revealing that electric current produces a magnetic field. This discovery sparked a revolution that gave us motors, generators, and the entire modern electrical infrastructure.
              </p>
              <p className="mag-intro-body">
                This chapter explores that link systematically: how current creates magnetic fields (in wires, loops, and solenoids), how magnetic fields exert force on current-carrying conductors, and how changing magnetic fields <strong>induce electric currents</strong> (electromagnetic induction). We finish with AC vs DC, and the domestic wiring system in our homes.
              </p>
            </div>
            <div className="mag-intro-sidebar">
              <div className="mag-sidebar-label">Topics Covered</div>
              <div className="mag-sidebar-title">What You'll Learn</div>
              <ul className="mag-sidebar-list">
                {[
                  "Oersted's Experiment",
                  "Magnetic Field & Field Lines",
                  "Right Hand Thumb Rule",
                  "Magnetic Field — Straight Wire, Loop, Solenoid",
                  "Force on Current-Carrying Conductor",
                  "Fleming's Left & Right Hand Rules",
                  "Electromagnetic Induction",
                  "AC vs DC & Domestic Circuits",
                ].map((t,i) => (
                  <li className="mag-sidebar-item" key={i}>
                    <span className="mag-sidebar-num">{i+1}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ════ SECTION 1: OERSTED & FIELD LINES ════ */}
          <div className="mag-ch-divider">
            <div className="mag-ch-badge"><span className="mag-ch-num">01</span><span className="mag-ch-text">Oersted's Experiment &amp; Magnetic Fields</span></div>
          </div>

          <div className="mag-sec-head">
            <span className="mag-sec-num">1</span>
            <div className="mag-sec-kicker">The Discovery That Changed Physics</div>
            <h2 className="mag-sec-title">Oersted's Experiment <span>&amp; Magnetic Field Lines</span></h2>
          </div>

          {/* Oersted card */}
          <div className="mag-physicist-card">
            <div className="mag-ph-left">
              <div className="mag-ph-icon"><Icon id="compass" size={26} color="#fca5a5"/></div>
              <div className="mag-ph-name">Hans Christian Oersted</div>
              <div className="mag-ph-era">1777 – 1851</div>
            </div>
            <div className="mag-ph-right">
              <div className="mag-ph-title">The Experiment That United Electricity and Magnetism</div>
              <div className="mag-ph-body">
                Oersted placed a compass needle parallel to a copper wire (XY). When current was passed through the wire, <strong>the compass needle deflected</strong>. When the current was reversed, the needle deflected in the opposite direction. When the current was stopped, the needle returned to rest.<br/><br/>
                <strong>Conclusion:</strong> A current-carrying conductor produces a magnetic field around it. Electricity and magnetism are linked. The unit of magnetic field strength — the <strong>Oersted</strong> — is named in his honour. His research became the foundation for radio, television, and electric motors.
              </div>
            </div>
          </div>

          {/* Field lines SVG diagram — clean textbook symmetric version */}
          <div className="mag-diagram-wrap">
            <svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",maxWidth:"520px"}}>
              <defs>
                {/* Arrow marker — auto-orient, points along path direction */}
                <marker id="mArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0.5 L5,3 L0,5.5 z" fill="rgba(252,165,165,0.85)"/>
                </marker>
                <marker id="mArrFaint" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0.5 L5,3 L0,5.5 z" fill="rgba(252,165,165,0.45)"/>
                </marker>
              </defs>

              {/* ══ BAR MAGNET: N left (x=170–280), S right (x=280–390) centred at y=150 ══ */}
              {/* N pole */}
              <rect x="170" y="128" width="110" height="44" rx="4"
                fill="rgba(220,38,38,0.28)" stroke="rgba(220,38,38,0.65)" strokeWidth="1.8"/>
              <text x="225" y="156" fill="rgba(255,255,255,0.95)" fontSize="20"
                fontFamily="Montserrat,sans-serif" fontWeight="900" textAnchor="middle">N</text>
              {/* S pole */}
              <rect x="280" y="128" width="110" height="44" rx="4"
                fill="rgba(96,130,200,0.22)" stroke="rgba(120,160,220,0.6)" strokeWidth="1.8"/>
              <text x="335" y="156" fill="rgba(180,210,255,0.92)" fontSize="20"
                fontFamily="Montserrat,sans-serif" fontWeight="900" textAnchor="middle">S</text>

              {/*
                ══ FIELD LINE APPROACH — textbook standard:
                   • Lines exit PERPENDICULAR from the RIGHT face of N (x=280)
                   • Lines arc symmetrically ABOVE and BELOW
                   • Lines enter PERPENDICULAR into the LEFT face of S (also x=280)
                   • The LEFT end of N (x=170) also has lines looping left and returning
                   • Everything is symmetric top↔bottom
                   • Arrows placed at the midpoint of each arc (N→S outside)
                   • Inside magnet: S→N (left-pointing arrows)
                ══
              */}

              {/* ── LINES exiting RIGHT face of N (x=280), arcing OVER TOP, entering S left face (x=280) ── */}
              {/* tight arc — exits N top-right, arcs to y≈92, enters S top-right */}
              <path d="M280,132 Q280,92 335,92 Q390,92 390,150 Q390,208 335,208 Q280,208 280,168"
                fill="none" stroke="rgba(252,165,165,0.82)" strokeWidth="1.8" markerMid="url(#mArr)"/>
              {/* medium arc */}
              <path d="M280,130 Q280,62 335,62 Q420,62 420,150 Q420,238 335,238 Q280,238 280,170"
                fill="none" stroke="rgba(252,165,165,0.62)" strokeWidth="1.6" markerMid="url(#mArrFaint)"/>
              {/* wide arc */}
              <path d="M280,128 Q282,28 335,28 Q462,28 462,150 Q462,272 335,272 Q282,272 280,172"
                fill="none" stroke="rgba(252,165,165,0.4)" strokeWidth="1.4" markerMid="url(#mArrFaint)"/>

              {/* ── LINES exiting LEFT face of N (x=170), arcing LEFT, looping back ── */}
              {/* tight left arc */}
              <path d="M170,132 Q170,92 225,92 Q280,92 280,132"
                fill="none" stroke="rgba(252,165,165,0.82)" strokeWidth="1.8" markerMid="url(#mArr)"/>
              {/* medium left arc */}
              <path d="M170,130 Q170,62 225,62 Q280,62 280,130"
                fill="none" stroke="rgba(252,165,165,0.62)" strokeWidth="1.6" markerMid="url(#mArrFaint)"/>
              {/* wide left arc */}
              <path d="M170,128 Q168,28 225,28 Q282,28 280,128"
                fill="none" stroke="rgba(252,165,165,0.4)" strokeWidth="1.4" markerMid="url(#mArrFaint)"/>

              {/* ── MIRROR: BOTTOM arcs — exit N right face bottom, arc below, enter S left face bottom ── */}
              {/* tight bottom-right arc */}
              <path d="M280,168 Q280,208 335,208 Q390,208 390,150 Q390,92 335,92 Q280,92 280,132"
                fill="none" stroke="rgba(252,165,165,0.0)" strokeWidth="0"/>
              {/* (already covered by the right arc above which is a full ellipse — no need to re-draw) */}

              {/* ── BOTTOM mirror of left arcs ── */}
              {/* tight bottom-left */}
              <path d="M170,168 Q170,208 225,208 Q280,208 280,168"
                fill="none" stroke="rgba(252,165,165,0.82)" strokeWidth="1.8" markerMid="url(#mArr)"/>
              {/* medium bottom-left */}
              <path d="M170,170 Q170,238 225,238 Q280,238 280,170"
                fill="none" stroke="rgba(252,165,165,0.62)" strokeWidth="1.6" markerMid="url(#mArrFaint)"/>
              {/* wide bottom-left */}
              <path d="M170,172 Q168,272 225,272 Q282,272 280,172"
                fill="none" stroke="rgba(252,165,165,0.4)" strokeWidth="1.4" markerMid="url(#mArrFaint)"/>

              {/* ── INSIDE MAGNET: parallel evenly-spaced lines S→N (right tip to left tip) ── */}
              {/* 5 lines spread evenly across the magnet height — no pinching at centre */}
              <line x1="390" y1="134" x2="170" y2="134" stroke="rgba(252,165,165,0.60)" strokeWidth="1.4"/>
              <polygon points="178,131 168,134 178,137" fill="rgba(252,165,165,0.75)"/>

              <line x1="390" y1="142" x2="170" y2="142" stroke="rgba(252,165,165,0.52)" strokeWidth="1.4"/>
              <polygon points="178,139 168,142 178,145" fill="rgba(252,165,165,0.65)"/>

              <line x1="390" y1="150" x2="170" y2="150" stroke="rgba(252,165,165,0.45)" strokeWidth="1.3"/>
              <polygon points="178,147 168,150 178,153" fill="rgba(252,165,165,0.58)"/>

              <line x1="390" y1="158" x2="170" y2="158" stroke="rgba(252,165,165,0.52)" strokeWidth="1.4"/>
              <polygon points="178,155 168,158 178,161" fill="rgba(252,165,165,0.65)"/>

              <line x1="390" y1="166" x2="170" y2="166" stroke="rgba(252,165,165,0.60)" strokeWidth="1.4"/>
              <polygon points="178,163 168,166 178,169" fill="rgba(252,165,165,0.75)"/>

              {/* ── LABELS ── */}
              {/* "Outside: N→S" label left */}
              <text x="82" y="148" fill="rgba(252,165,165,0.6)" fontSize="9"
                fontFamily="Poppins,sans-serif" fontWeight="600" textAnchor="middle">Outside</text>
              <text x="82" y="160" fill="rgba(252,165,165,0.6)" fontSize="9"
                fontFamily="Poppins,sans-serif" fontWeight="600" textAnchor="middle">N → S</text>

              {/* "Outside: N→S" label right */}
              <text x="478" y="148" fill="rgba(252,165,165,0.6)" fontSize="9"
                fontFamily="Poppins,sans-serif" fontWeight="600" textAnchor="middle">Outside</text>
              <text x="478" y="160" fill="rgba(252,165,165,0.6)" fontSize="9"
                fontFamily="Poppins,sans-serif" fontWeight="600" textAnchor="middle">N → S</text>

              {/* "Inside: S→N" label */}
              <text x="280" y="186" fill="rgba(180,200,230,0.55)" fontSize="9"
                fontFamily="Poppins,sans-serif" fontWeight="600" textAnchor="middle">Inside: S → N</text>

              {/* Density note — top */}
              <text x="225" y="18" fill="rgba(252,165,165,0.4)" fontSize="9"
                fontFamily="Poppins,sans-serif" textAnchor="middle">Dense near poles</text>
              <text x="335" y="18" fill="rgba(252,165,165,0.4)" fontSize="9"
                fontFamily="Poppins,sans-serif" textAnchor="middle">= stronger field</text>

            </svg>
            <div className="mag-diagram-caption">Magnetic Field Lines around a Bar Magnet — symmetric, exit N face · arc · enter S face</div>
          </div>

          {/* Properties of field lines */}
          <div className="mag-props-grid">
            <div className="mag-prop-cell">
              <div className="mag-prop-top">
                <div className="mag-prop-num">01</div>
                <div className="mag-prop-name">Direction</div>
              </div>
              <div className="mag-prop-body">
                Outside the magnet: field lines go from <strong>North to South</strong> pole. Inside the magnet: from South to North pole. They are therefore <strong>closed, continuous curves</strong> with no beginning or end.
                <div className="mag-prop-badge">N→S outside · S→N inside</div>
              </div>
            </div>
            <div className="mag-prop-cell">
              <div className="mag-prop-top">
                <div className="mag-prop-num">02</div>
                <div className="mag-prop-name">Field Strength</div>
              </div>
              <div className="mag-prop-body">
                The <strong>closeness (density) of field lines represents field strength</strong>. Where lines are packed tightly together, the magnetic field is strong. Where lines are spread far apart, the field is weak. Near the poles = strong; middle region = weaker.
                <div className="mag-prop-badge">Closer lines = stronger field</div>
              </div>
            </div>
            <div className="mag-prop-cell">
              <div className="mag-prop-top">
                <div className="mag-prop-num">03</div>
                <div className="mag-prop-name">No Intersection</div>
              </div>
              <div className="mag-prop-body">
                Two magnetic field lines can <strong>never intersect each other</strong>. If they did, the tangent at the intersection point would give two different directions for the magnetic field at that point — which is impossible, since there can only be one direction at any point.
                <div className="mag-prop-badge">One direction per point only</div>
              </div>
            </div>
          </div>

          {/* ════ SECTION 2: RIGHT HAND THUMB RULE ════ */}
          <div className="mag-ch-divider">
            <div className="mag-ch-badge"><span className="mag-ch-num">02</span><span className="mag-ch-text">Right Hand Thumb Rule &amp; Field Patterns</span></div>
          </div>

          <div className="mag-sec-head">
            <span className="mag-sec-num">2</span>
            <div className="mag-sec-kicker">Direction of Magnetic Field</div>
            <h2 className="mag-sec-title">Right Hand Thumb Rule <span>&amp; Field Configurations</span></h2>
          </div>

          <p className="mag-body-text">
            The <strong>Right Hand Thumb Rule</strong> (also called Maxwell's Corkscrew Rule) gives the direction of the magnetic field around a current-carrying conductor. Hold the conductor in your right hand so that your <strong>thumb points in the direction of current</strong> — your <strong>curled fingers</strong> then indicate the direction of the circular magnetic field lines around the wire.
          </p>

          {/* Field configurations SVG */}
          <div className="mag-diagram-wrap">
            <svg viewBox="0 0 520 220" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",maxWidth:"480px"}}>

              {/* ── STRAIGHT WIRE (left) ── */}
              <text x="65" y="18" fill="rgba(252,165,165,0.75)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700" textAnchor="middle">Straight Wire</text>
              {/* Wire */}
              <line x1="65" y1="25" x2="65" y2="195" stroke="rgba(245,158,11,0.8)" strokeWidth="3" strokeLinecap="round"/>
              <polygon points="62,28 68,28 65,22" fill="rgba(245,158,11,0.8)"/>
              <text x="72" y="115" fill="rgba(245,158,11,0.6)" fontSize="9" fontFamily="Poppins,sans-serif">I →</text>
              {/* Circular field lines */}
              {[18,30,42].map((r,i) => (
                <circle key={i} cx="65" cy="110" r={r} fill="none" stroke="rgba(220,38,38,0.4)" strokeWidth="1.5" strokeDasharray={i===2?"4,3":"none"}/>
              ))}
              <polygon points="83,92 80,98 87,96" fill="rgba(220,38,38,0.5)"/>
              <text x="18" y="195" fill="rgba(220,38,38,0.5)" fontSize="9" fontFamily="Poppins,sans-serif">Concentric circles</text>

              {/* ── CIRCULAR LOOP (centre) ── */}
              <text x="260" y="18" fill="rgba(252,165,165,0.75)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700" textAnchor="middle">Circular Loop</text>
              <ellipse cx="260" cy="110" rx="50" ry="18" fill="none" stroke="rgba(245,158,11,0.7)" strokeWidth="2.5"/>
              <polygon points="257,92 263,92 260,86" fill="rgba(245,158,11,0.7)"/>
              {/* Field at centre — straight line */}
              <line x1="260" y1="130" x2="260" y2="170" stroke="rgba(220,38,38,0.55)" strokeWidth="2" strokeDasharray="4,3"/>
              <polygon points="257,130 263,130 260,124" fill="rgba(220,38,38,0.55)"/>
              {/* Curved field lines outside */}
              <path d="M210,110 Q210,60 260,55 Q310,60 310,110" fill="none" stroke="rgba(220,38,38,0.3)" strokeWidth="1.5"/>
              <text x="230" y="185" fill="rgba(220,38,38,0.5)" fontSize="9" fontFamily="Poppins,sans-serif">Straight at centre</text>

              {/* ── SOLENOID (right) ── */}
              <text x="435" y="18" fill="rgba(252,165,165,0.75)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700" textAnchor="middle">Solenoid</text>
              {/* Solenoid coil suggestion */}
              {[0,1,2,3,4].map(i => (
                <ellipse key={i} cx="435" cy={75+i*24} rx="30" ry="10" fill="none" stroke="rgba(245,158,11,0.5)" strokeWidth="2"/>
              ))}
              {/* N and S poles */}
              <text x="392" y="120" fill="rgba(220,38,38,0.7)" fontSize="12" fontFamily="Montserrat,sans-serif" fontWeight="900">S</text>
              <text x="464" y="120" fill="rgba(220,38,38,0.8)" fontSize="12" fontFamily="Montserrat,sans-serif" fontWeight="900">N</text>
              {/* Uniform field lines inside */}
              <line x1="405" y1="105" x2="462" y2="105" stroke="rgba(220,38,38,0.5)" strokeWidth="1.5"/>
              <line x1="405" y1="117" x2="462" y2="117" stroke="rgba(220,38,38,0.5)" strokeWidth="1.5"/>
              <line x1="405" y1="129" x2="462" y2="129" stroke="rgba(220,38,38,0.4)" strokeWidth="1.5"/>
              <polygon points="459,102 465,105 459,108" fill="rgba(220,38,38,0.55)"/>
              <polygon points="459,114 465,117 459,120" fill="rgba(220,38,38,0.55)"/>
              <text x="390" y="185" fill="rgba(220,38,38,0.5)" fontSize="9" fontFamily="Poppins,sans-serif">Uniform inside</text>
            </svg>
            <div className="mag-diagram-caption">Magnetic Field Patterns — Straight Wire · Circular Loop · Solenoid</div>
          </div>

          <div className="mag-alert indigo" style={{display:"flex",gap:"12px",alignItems:"flex-start"}}>
            <span style={{flexShrink:0,marginTop:"1px"}}><Icon id="info" size={17} color="#4338ca"/></span>
            <span><strong>Solenoid acts like a bar magnet:</strong> One end behaves as North pole, the other as South pole. The field inside is <strong>uniform</strong> (parallel straight lines, equal spacing). A soft iron core placed inside becomes a powerful <strong>electromagnet</strong> — can be switched on/off with the current.</span>
          </div>

          {/* ════ SECTION 3: FLEMING'S RULES ════ */}
          <div className="mag-ch-divider">
            <div className="mag-ch-badge"><span className="mag-ch-num">03</span><span className="mag-ch-text">Fleming's Rules — Motor &amp; Generator</span></div>
          </div>

          <div className="mag-sec-head">
            <span className="mag-sec-num">3</span>
            <div className="mag-sec-kicker">Two Rules, Two Machines</div>
            <h2 className="mag-sec-title">Fleming's Left &amp; Right <span>Hand Rules</span></h2>
          </div>

          <p className="mag-body-text">
            John Ambrose Fleming gave two complementary hand rules that describe the relationship between magnetic field, current, and force/motion — one for motors (left hand) and one for generators (right hand). The key mnemonic is <strong>MFC — Mother Father Child</strong> (Motion/Force · Field · Current).
          </p>

          <div className="mag-rules-block">
            <div className="mag-rl-left">
              <div className="mag-rl-tag">Electric Motor Principle</div>
              <div className="mag-rl-title">Fleming's Left Hand Rule</div>
              <div className="mag-rl-hand">LEFT hand · F → M → C</div>
              <div className="mag-rl-fingers">
                {[
                  {f:"Forefinger",v:"Magnetic Field (F)"},
                  {f:"Middle finger",v:"Current (C)"},
                  {f:"Thumb",v:"Force / Motion (M)"},
                ].map(r => (
                  <div className="mag-rl-finger" key={r.f}>
                    <div className="mag-rl-fname">{r.f}</div>
                    <div className="mag-rl-fval">{r.v}</div>
                  </div>
                ))}
              </div>
              <div className="mag-rl-rule">
                Stretch the <strong>thumb, forefinger, and middle finger</strong> of your left hand so they are mutually perpendicular. If forefinger points in the direction of the <strong>magnetic field</strong> and middle finger in the direction of <strong>current</strong>, the thumb points in the direction of the <strong>force (motion)</strong> on the conductor.
              </div>
              <div className="mag-rl-app"><strong>Application:</strong> Electric Motor — converts electrical energy into mechanical energy.</div>
            </div>
            <div className="mag-rl-right">
              <div className="mag-rl-tag">Electric Generator Principle</div>
              <div className="mag-rl-title">Fleming's Right Hand Rule</div>
              <div className="mag-rl-hand">RIGHT hand · M → F → C</div>
              <div className="mag-rl-fingers">
                {[
                  {f:"Forefinger",v:"Magnetic Field (F)"},
                  {f:"Middle finger",v:"Induced Current (C)"},
                  {f:"Thumb",v:"Motion of Conductor (M)"},
                ].map(r => (
                  <div className="mag-rl-finger" key={r.f}>
                    <div className="mag-rl-fname">{r.f}</div>
                    <div className="mag-rl-fval">{r.v}</div>
                  </div>
                ))}
              </div>
              <div className="mag-rl-rule">
                Stretch the <strong>thumb, forefinger, and middle finger</strong> of your right hand so they are mutually perpendicular. If forefinger points in the direction of the <strong>magnetic field</strong> and thumb in the direction of <strong>motion of conductor</strong>, the middle finger points in the direction of the <strong>induced current</strong>.
              </div>
              <div className="mag-rl-app"><strong>Application:</strong> Electric Generator — converts mechanical energy into electrical energy.</div>
            </div>
          </div>

          {/* ════ SECTION 4: ELECTROMAGNETIC INDUCTION ════ */}
          <div className="mag-ch-divider">
            <div className="mag-ch-badge"><span className="mag-ch-num">04</span><span className="mag-ch-text">Electromagnetic Induction</span></div>
          </div>

          <div className="mag-sec-head">
            <span className="mag-sec-num">4</span>
            <div className="mag-sec-kicker">Faraday's Discovery</div>
            <h2 className="mag-sec-title">Electromagnetic Induction <span>&amp; Faraday's Experiments</span></h2>
          </div>

          <p className="mag-body-text">
            <strong>Michael Faraday</strong> discovered that a changing magnetic field can induce an electric current in a conductor. The key condition: there must be <strong>relative motion</strong> between the magnet and the coil, or a <strong>change in current</strong> in a nearby coil. A stationary magnet and stationary coil produce no current.
          </p>

          <div className="mag-emi-list">
            {[
              {
                bg:"#fee2e2", ic:"#991b1b", iconId:"magnet",
                name:"Experiment 1 — Self Induction (Magnet & Coil)",
                desc:<>When the <strong>north pole of a bar magnet is moved towards the coil</strong>, the galvanometer deflects to one side (say, right). When the magnet is moved away, it deflects to the other side (left). If the magnet is kept <strong>stationary</strong>, there is no deflection. The same results occur when the coil is moved instead of the magnet. <strong>Conclusion:</strong> It is the relative motion that matters — not which one moves. The change in magnetic flux induces an EMF and current in the coil.</>
              },
              {
                bg:"#e0e7ff", ic:"#4338ca", iconId:"coil",
                name:"Experiment 2 — Mutual Induction (Coil 1 & Coil 2)",
                desc:<>Two coils are placed near each other. Coil 1 (primary) is connected to a battery and key; Coil 2 (secondary) is connected to a galvanometer. When the key is <strong>plugged in</strong> (circuit closed), the galvanometer deflects momentarily in one direction. When the key is <strong>plugged out</strong> (circuit opened), it deflects in the opposite direction. During steady current, no deflection. <strong>Conclusion:</strong> A change in current in the primary coil changes the magnetic field, which then induces current in the secondary coil. This is <strong>Electromagnetic Induction</strong>.</>
              },
              {
                bg:"#ccfbf1", ic:"#0f766e", iconId:"generator",
                name:"Application — Electric Generator",
                desc:<>An electric generator is based on electromagnetic induction. When a rectangular coil rotates in a uniform magnetic field, the magnetic flux through it changes continuously, inducing an alternating EMF. This converts <strong>mechanical energy into electrical energy</strong>. The induced current is maximum when the coil plane is parallel to the field (greatest rate of change of flux) and zero when the coil is perpendicular to the field. This produces <strong>AC (Alternating Current)</strong>.</>
              },
            ].map(e => (
              <div className="mag-emi-item" key={e.name}>
                <div className="mag-emi-icon-col" style={{background:e.bg}}>
                  <Icon id={e.iconId} size={22} color={e.ic}/>
                </div>
                <div className="mag-emi-content">
                  <div className="mag-emi-name">{e.name}</div>
                  <div className="mag-emi-desc">{e.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ════ SECTION 5: AC vs DC ════ */}
          <div className="mag-ch-divider">
            <div className="mag-ch-badge"><span className="mag-ch-num">05</span><span className="mag-ch-text">AC vs DC &amp; Domestic Circuits</span></div>
          </div>

          <div className="mag-sec-head">
            <span className="mag-sec-num">5</span>
            <div className="mag-sec-kicker">Current Types &amp; Home Wiring</div>
            <h2 className="mag-sec-title">AC vs DC, Domestic Wiring <span>&amp; Safety</span></h2>
          </div>

          <p className="mag-body-text">
            Electric current comes in two fundamental forms. Understanding the difference is essential for both exam questions and real-world electrical safety.
          </p>

          <div style={{overflowX:"auto",marginBottom:"28px"}}>
            <table className="mag-acdc-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>AC — Alternating Current</th>
                  <th>DC — Direct Current</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Direction","Changes periodically after equal intervals","Does not change — unidirectional"],
                  ["Frequency","50 Hz (India), 60 Hz (USA)",<span className="mag-badge-dc">0 Hz</span>],
                  ["Waveform","Sinusoidal wave (oscillates)","Constant horizontal line"],
                  ["Generation","AC Generator (alternator)","Battery, cell, DC generator"],
                  ["Transmission","Easy — voltage stepped up/down by transformers","Difficult over long distances"],
                  ["Domestic use",<span className="mag-badge-ac">220V, 50Hz in India</span>,"Used in electronics, batteries"],
                  ["Advantage","Transmitted long distances with low energy loss","Stable — used in electronic devices"],
                ].map((r,i) => (
                  <tr key={i}>{r.map((c,j) => <td key={j}>{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mag-alert red" style={{display:"flex",gap:"12px",alignItems:"flex-start"}}>
            <span style={{flexShrink:0,marginTop:"1px"}}><Icon id="info" size={17} color="#991b1b"/></span>
            <span><strong>Why AC for power transmission?</strong> At high voltage, current is low (P = VI, same power). Lower current means lower I²R heating losses in transmission lines. AC transformers can step voltage up before transmission and down before use — DC has no equivalent device. This makes AC far more economical for the national grid.</span>
          </div>

          {/* Domestic wiring — 3 wire cards */}
          <p className="mag-body-text"><strong>Domestic Electric Circuit</strong> — India supplies 220V, 50Hz AC through three wires:</p>

          <div className="mag-wire-cards">
            <div className="mag-wire-card">
              <div className="mag-wire-top live">
                <div className="mag-wire-swatch" style={{background:"#ef4444"}}/>
                <div className="mag-wire-name">Live Wire</div>
              </div>
              <div className="mag-wire-body">
                {[
                  <><strong>Colour:</strong> Red insulation</>,
                  <><strong>Potential:</strong> 220V (high potential)</>,
                  "Carries current from the supply to appliances",
                  <><strong>Dangerous:</strong> Never touch — causes severe shock</>,
                  "Also called the positive/phase wire",
                ].map((t,i) => (
                  <div className="mag-wire-item" key={i}>
                    <span className="mag-wire-dot" style={{background:"#ef4444"}}/>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mag-wire-card">
              <div className="mag-wire-top neutral">
                <div className="mag-wire-swatch" style={{background:"#64748b"}}/>
                <div className="mag-wire-name">Neutral Wire</div>
              </div>
              <div className="mag-wire-body">
                {[
                  <><strong>Colour:</strong> Black insulation</>,
                  <><strong>Potential:</strong> Zero (0V)</>,
                  "Completes the circuit back to the substation",
                  "Potential difference between live and neutral = 220V",
                  "Usually safe to touch (but avoid in practice)",
                ].map((t,i) => (
                  <div className="mag-wire-item" key={i}>
                    <span className="mag-wire-dot" style={{background:"#64748b"}}/>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mag-wire-card">
              <div className="mag-wire-top earth">
                <div className="mag-wire-swatch" style={{background:"#22c55e"}}/>
                <div className="mag-wire-name">Earth Wire</div>
              </div>
              <div className="mag-wire-body">
                {[
                  <><strong>Colour:</strong> Green insulation</>,
                  <><strong>Potential:</strong> Zero (connected to earth)</>,
                  "Connected to a copper plate buried deep in the ground",
                  "Metallic body of every appliance connected to it",
                  <><strong>Safety:</strong> Any leakage current flows to earth (0V) — user protected from shock</>,
                ].map((t,i) => (
                  <div className="mag-wire-item" key={i}>
                    <span className="mag-wire-dot" style={{background:"#22c55e"}}/>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mag-alert amber" style={{display:"flex",gap:"12px",alignItems:"flex-start"}}>
            <span style={{flexShrink:0,marginTop:"1px"}}><Icon id="home" size={17} color="#92400e"/></span>
            <span><strong>Home Circuit Rules:</strong> Each appliance has its own ON/OFF switch · All appliances connected in <strong>parallel</strong> (so each gets 220V and can work independently) · Two circuits: <strong>15A</strong> for high-power appliances (ACs, geysers) and <strong>5A</strong> for low-power (lights, fans, TV).</span>
          </div>

          {/* Short circuit & Overloading */}
          <div className="mag-safety-cards">
            <div className="mag-safety-card">
              <div className="mag-safety-hdr short">
                <div className="mag-safety-icon"><Icon id="warn" size={20} color="#fca5a5"/></div>
                <div className="mag-safety-name">Short Circuiting</div>
              </div>
              <div className="mag-safety-body">
                {[
                  <><strong>Cause:</strong> Live and neutral wires come into direct contact due to damaged insulation or faulty appliance</>,
                  <><strong>Effect:</strong> Resistance → nearly zero · Current → extremely large (I = V/R, R≈0)</>,
                  <><strong>H = I²Rt:</strong> Enormous heat generated in live wire → sparks → fire → damage</>,
                  <><strong>Prevention:</strong> Fuse wire melts and breaks the circuit before damage spreads</>,
                ].map((t,i) => (
                  <div className="mag-safety-item" key={i}>
                    <span className="mag-safety-dot" style={{background:"var(--mag)"}}/>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mag-safety-card">
              <div className="mag-safety-hdr overload">
                <div className="mag-safety-icon"><Icon id="zap" size={20} color="#fcd34d"/></div>
                <div className="mag-safety-name">Overloading</div>
              </div>
              <div className="mag-safety-body">
                {[
                  <><strong>Cause 1:</strong> Too many appliances connected to a single socket at once</>,
                  <><strong>Cause 2:</strong> Accidental rise in supply voltage beyond rated value</>,
                  <><strong>Effect:</strong> Total current exceeds wire's capacity → wire overheats</>,
                  <><strong>Prevention:</strong> Fuse — melts when excess current flows, breaking the circuit safely</>,
                ].map((t,i) => (
                  <div className="mag-safety-item" key={i}>
                    <span className="mag-safety-dot" style={{background:"var(--amber)"}}/>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mag-pull-quote">
            <p>"Oersted's compass needle trembled, and with that tremble the world changed. Every electric motor spinning in every machine on Earth, every generator lighting every city, every transformer in every power line — all trace their lineage back to that one moment when a wire carrying current made a compass needle move."</p>
          </div>

          {/* ══ FAQ ══ */}
          <div className="mag-divider"><div className="mag-divider-mark"/></div>
          <div className="mag-faq-header"><span className="mag-faq-kicker">Exam Preparation</span></div>
          <h2 className="mag-faq-title">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div className={`mag-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="mag-faq-q" onClick={() => toggle(i)}>
                <span className="mag-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="mag-faq-icon">{openIndex === i ? "▴" : "▾"}</span>
              </button>
              <div className={`mag-faq-ans${openIndex === i ? " visible" : ""}`}>
                <div className="mag-faq-ans-inner">{faq.a}</div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
