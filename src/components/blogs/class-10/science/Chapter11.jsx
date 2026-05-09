import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

/* ── Inline SVG icons — no emoji ── */
const Icon = ({ id, size=22, color="currentColor" }) => {
  const s = size, c = color;
  const icons = {
    clock:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    mountain: <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 20 9 4 15 14 18 10 21 20"/></svg>,
    book:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    eye:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    star:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    sparkle:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v3m0 12v3M3 12h3m12 0h3m-3.3-6.7-2.1 2.1M8.4 15.6l-2.1 2.1m0-11.3 2.1 2.1m7.2 7.2 2.1 2.1"/></svg>,
    sunrise:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="9" x2="12" y2="2"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/><line x1="23" y1="22" x2="1" y2="22"/><polyline points="8 6 12 2 16 6"/></svg>,
    sky:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
    sun:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    signal:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49"/><path d="M7.76 7.76a6 6 0 0 0 0 8.49"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>,
    tree:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 22v-5l-5-3-5 3v5"/><path d="M12 2l4 6H8l4-6z"/><path d="M8 8l-2 6h12l-2-6"/></svg>,
    telescope:<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83"/></svg>,
    rainbow:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17a10 10 0 0 0-20 0"/><path d="M6 17a6 6 0 0 1 12 0"/><line x1="12" y1="17" x2="12" y2="17"/></svg>,
    apple:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 13.72 5 22 8 22c1.25 0 2.5-1.06 4-1.06z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>,
  };
  return icons[id] || null;
};

const styles = `
  :root {
    --iris:      #059669;
    --iris2:     #047857;
    --iris3:     #022c22;
    --iris-lt:   #d1fae5;
    --iris-mid:  #6ee7b7;
    --amber:     #d97706;
    --amber2:    #92400e;
    --amber-lt:  #fef3c7;
    --amber-mid: #fcd34d;
    --rose:      #e11d48;
    --rose-lt:   #ffe4e6;
    --rose-mid:  #fda4af;
    --sky:       #0284c7;
    --sky-lt:    #e0f2fe;
    --sky-mid:   #7dd3fc;
    --violet:    #7c3aed;
    --violet-lt: #ede9fe;
    --violet-mid:#c4b5fd;
    --paper:     #f0fdf4;
    --paper2:    #dcfce7;
    --ink:       #052e16;
    --ink2:      #14532d;
    --muted:     #4b7a5e;
    --rule:      #a7f3d0;
    --white:     #ffffff;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .eye-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  /* ═══ HERO ═══ */
  .eye-hero {
    background: linear-gradient(160deg, #010f07 0%, #021a0e 50%, #041f10 100%);
    min-height: 100vh; position: relative; overflow: hidden;
    display: flex; flex-direction: column; justify-content: center;
    padding: 80px 0 72px;
  }
  .eye-hero::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 5px;
    background: linear-gradient(90deg,#7c3aed 0%,#0284c7 18%,#059669 36%,#d97706 55%,#e11d48 72%,#dc2626 85%,#7c3aed 100%);
  }
  /* Radial pupil grid */
  .eye-hero-grid { display: none; }
  .eye-glow-1 { position:absolute; top:-10%; left:5%; width:500px; height:500px; border-radius:50%; background:radial-gradient(circle,rgba(5,150,105,0.14) 0%,transparent 65%); pointer-events:none; }
  .eye-glow-2 { position:absolute; bottom:-5%; right:2%; width:420px; height:420px; border-radius:50%; background:radial-gradient(circle,rgba(124,58,237,0.1) 0%,transparent 65%); pointer-events:none; }
  .eye-glow-3 { position:absolute; top:30%; right:22%; width:280px; height:280px; border-radius:50%; background:radial-gradient(circle,rgba(217,119,6,0.08) 0%,transparent 65%); pointer-events:none; }

  /* Eye SVG watermark — right side */
  .eye-hero-svg { position:absolute; right:0; top:0; width:46%; height:100%; pointer-events:none; opacity:0.28; }

  .eye-hero-inner { max-width:960px; width:100%; margin:0 auto; padding:0 40px; position:relative; z-index:2; }

  .eye-subject-pill {
    display:inline-flex; align-items:center; gap:8px;
    border:1px solid rgba(5,150,105,0.45); background:rgba(5,150,105,0.1);
    border-radius:6px; padding:6px 16px; margin-bottom:28px;
    font-family:'Poppins',sans-serif; font-size:11px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; color:var(--iris-mid);
  }
  .eye-pill-dot { width:6px; height:6px; border-radius:50%; background:var(--iris-mid); animation:eye-pulse 2s infinite; }
  @keyframes eye-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }

  .eye-hero-eyebrow { font-family:'Poppins',sans-serif; font-size:11px; font-weight:600; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:14px; }

  .eye-hero-title {
    font-family:'Montserrat',sans-serif; font-weight:900;
    font-size:clamp(40px,6vw,78px); line-height:1.0;
    letter-spacing:-0.02em; color:#fff; margin-bottom:10px;
  }
  .eye-hero-title .t1 { display:block; }
  .eye-hero-title .t2 { display:block; color:var(--iris-mid); font-style:italic; }
  .eye-hero-title .t3 { display:block; }

  .eye-hero-desc { font-size:16px; color:rgba(255,255,255,0.5); line-height:1.85; max-width:520px; margin:22px 0 40px; }

  .eye-hero-stats { display:flex; gap:0; border:1px solid rgba(255,255,255,0.08); border-radius:10px; overflow:hidden; width:fit-content; flex-wrap:wrap; }
  .eye-hero-stat { padding:14px 26px; border-right:1px solid rgba(255,255,255,0.08); }
  .eye-hero-stat:last-child { border-right:none; }
  .eye-stat-num { font-family:'Montserrat',sans-serif; font-size:22px; font-weight:800; color:var(--iris-mid); line-height:1; margin-bottom:4px; }
  .eye-stat-label { font-size:11px; color:rgba(255,255,255,0.35); font-weight:500; letter-spacing:0.05em; font-family:'Poppins',sans-serif; }

  /* ═══ BODY ═══ */
  .eye-body { max-width:920px; margin:0 auto; padding:80px 32px 100px; }

  /* ═══ INTRO — 3fr + 2fr ═══ */
  .eye-intro { display:grid; grid-template-columns:3fr 2fr; gap:40px; margin-bottom:72px; align-items:start; }
  @media(max-width:640px){.eye-intro{grid-template-columns:1fr;}}
  .eye-intro-kicker { font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:var(--iris2); margin-bottom:12px; display:flex; align-items:center; gap:10px; }
  .eye-intro-kicker::after { content:''; width:44px; height:1px; background:var(--iris-mid); }
  .eye-intro-headline { font-family:'Montserrat',sans-serif; font-size:clamp(20px,3vw,28px); font-weight:800; color:var(--ink); line-height:1.2; margin-bottom:16px; }
  .eye-intro-headline em { font-style:italic; color:var(--iris2); }
  .eye-intro-body { font-size:15.5px; line-height:1.85; color:var(--ink2); margin-bottom:14px; }
  .eye-intro-body strong { color:var(--iris3); font-weight:600; }
  .eye-intro-sidebar { background:linear-gradient(160deg,#010f07 0%,#021a0e 100%); border-radius:14px; padding:26px 22px; position:relative; overflow:hidden; }
  .eye-intro-sidebar::before { content:''; position:absolute; top:-20px; right:-20px; width:100px; height:100px; border-radius:50%; background:rgba(5,150,105,0.1); }
  .eye-sidebar-label { font-family:'Poppins',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(110,231,183,0.6); margin-bottom:12px; }
  .eye-sidebar-title { font-family:'Montserrat',sans-serif; font-size:17px; font-weight:800; color:#fff; margin-bottom:14px; line-height:1.3; }
  .eye-sidebar-list { list-style:none; padding:0; }
  .eye-sidebar-item { display:flex; align-items:center; gap:10px; padding:7px 0; border-bottom:1px solid rgba(255,255,255,0.07); font-size:13px; color:rgba(255,255,255,0.72); }
  .eye-sidebar-item:last-child { border-bottom:none; }
  .eye-sidebar-num { font-family:'Montserrat',sans-serif; font-size:19px; font-weight:800; color:var(--iris-mid); flex-shrink:0; width:24px; line-height:1; }

  /* ═══ CHAPTER DIVIDER ═══ */
  .eye-ch-divider { display:flex; align-items:center; gap:12px; margin:64px 0 48px; }
  .eye-ch-divider::before, .eye-ch-divider::after { content:''; flex:1; height:1px; background:var(--rule); min-width:12px; }
  .eye-ch-badge {
    display:inline-flex; align-items:center; gap:10px;
    background:var(--iris2); border-radius:8px; padding:10px 20px;
    font-family:'Poppins',sans-serif; font-size:12px; font-weight:700;
    letter-spacing:0.1em; text-transform:uppercase; color:#fff;
    flex-shrink:0; max-width:72%;
  }
  .eye-ch-num { font-family:'Montserrat',sans-serif; font-size:16px; color:var(--iris-mid); font-weight:800; white-space:nowrap; flex-shrink:0; line-height:1; }
  .eye-ch-text { white-space:normal; word-break:break-word; line-height:1.3; }
  @media(max-width:480px){
    .eye-ch-divider{margin:48px 0 32px;gap:8px;}
    .eye-ch-badge{font-size:10px;padding:8px 14px;gap:8px;max-width:76%;}
    .eye-ch-num{font-size:14px;}
  }

  /* ═══ SECTION HEADER ═══ */
  .eye-sec-head { margin-bottom:28px; }
  .eye-sec-num { font-family:'Montserrat',sans-serif; font-size:80px; font-weight:900; color:var(--paper2); line-height:0.85; letter-spacing:-0.04em; display:block; margin-bottom:2px; }
  .eye-sec-kicker { font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--iris2); margin-bottom:6px; }
  .eye-sec-title { font-family:'Montserrat',sans-serif; font-size:clamp(20px,3vw,30px); font-weight:800; color:var(--ink); line-height:1.15; border-bottom:2px solid var(--rule); padding-bottom:16px; }
  .eye-sec-title span { color:var(--iris2); font-style:italic; }

  /* ═══ BODY TEXT ═══ */
  .eye-body-text { font-size:15.5px; line-height:1.85; color:var(--ink2); margin-bottom:24px; }
  .eye-body-text strong { color:var(--iris3); font-weight:600; }

  /* ═══ EYE PARTS — anatomy grid ═══ */
  .eye-parts-grid {
    display:grid; grid-template-columns:repeat(3,1fr); gap:16px;
    margin-bottom:28px;
  }
  @media(max-width:580px){.eye-parts-grid{grid-template-columns:1fr;}}
  .eye-part-cell {
    border-radius:12px; overflow:hidden;
    border:1.5px solid var(--rule);
    box-shadow:0 2px 10px rgba(5,150,105,0.07);
    display:flex; flex-direction:column;
  }
  .eye-part-top {
    padding:14px 16px 12px;
    display:flex; align-items:center; gap:10px;
  }
  .eye-part-cell:nth-child(1) .eye-part-top { background:linear-gradient(135deg,#021a0e,#064e3b); }
  .eye-part-cell:nth-child(2) .eye-part-top { background:linear-gradient(135deg,#001a2e,#0c3a5e); }
  .eye-part-cell:nth-child(3) .eye-part-top { background:linear-gradient(135deg,#0a2010,#166534); }
  .eye-part-cell:nth-child(4) .eye-part-top { background:linear-gradient(135deg,#1a1a1a,#2d2d2d); }
  .eye-part-cell:nth-child(5) .eye-part-top { background:linear-gradient(135deg,#1c1400,#3d2c00); }
  .eye-part-cell:nth-child(6) .eye-part-top { background:linear-gradient(135deg,#1e0840,#3b1278); }
  .eye-part-cell:nth-child(7) .eye-part-top { background:linear-gradient(135deg,#1a0010,#450028); }
  .eye-part-cell:nth-child(8) .eye-part-top { background:linear-gradient(135deg,#0a1428,#1e3a6e); }
  .eye-part-cell:nth-child(9) .eye-part-top { background:linear-gradient(135deg,#001c14,#064e3b); }
  .eye-part-num {
    font-family:'Montserrat',sans-serif; font-size:22px; font-weight:900;
    flex-shrink:0; width:28px; line-height:1;
  }
  .eye-part-cell:nth-child(1) .eye-part-num { color:var(--iris-mid); }
  .eye-part-cell:nth-child(2) .eye-part-num { color:var(--sky-mid); }
  .eye-part-cell:nth-child(3) .eye-part-num { color:var(--iris-mid); }
  .eye-part-cell:nth-child(4) .eye-part-num { color:#d4d4d4; }
  .eye-part-cell:nth-child(5) .eye-part-num { color:var(--amber-mid); }
  .eye-part-cell:nth-child(6) .eye-part-num { color:var(--violet-mid); }
  .eye-part-cell:nth-child(7) .eye-part-num { color:var(--rose-mid); }
  .eye-part-cell:nth-child(8) .eye-part-num { color:var(--sky-mid); }
  .eye-part-cell:nth-child(9) .eye-part-num { color:var(--iris-mid); }
  .eye-part-name { font-family:'Poppins',sans-serif; font-size:13px; font-weight:700; color:#fff; line-height:1.2; }
  .eye-part-body { padding:12px 16px 14px; background:var(--white); flex:1; }
  .eye-part-desc { font-size:12.5px; line-height:1.6; color:#374151; margin-bottom:8px; }
  .eye-part-note {
    font-family:'Poppins',sans-serif; font-size:10px; font-weight:700;
    letter-spacing:0.08em; text-transform:uppercase;
    padding:3px 10px; border-radius:4px; display:inline-block;
  }
  .eye-part-cell:nth-child(1) .eye-part-note { background:var(--iris-lt);   color:var(--iris2); }
  .eye-part-cell:nth-child(2) .eye-part-note { background:var(--sky-lt);    color:var(--sky); }
  .eye-part-cell:nth-child(3) .eye-part-note { background:var(--iris-lt);   color:var(--iris2); }
  .eye-part-cell:nth-child(4) .eye-part-note { background:#f5f5f5;           color:#525252; }
  .eye-part-cell:nth-child(5) .eye-part-note { background:var(--amber-lt);  color:var(--amber2); }
  .eye-part-cell:nth-child(6) .eye-part-note { background:var(--violet-lt); color:var(--violet); }
  .eye-part-cell:nth-child(7) .eye-part-note { background:var(--rose-lt);   color:var(--rose); }
  .eye-part-cell:nth-child(8) .eye-part-note { background:var(--sky-lt);    color:var(--sky); }
  .eye-part-cell:nth-child(9) .eye-part-note { background:var(--iris-lt);   color:var(--iris2); }

  /* ═══ EYE SVG DIAGRAM ═══ */
  .eye-diagram-wrap { background:linear-gradient(160deg,#010f07,#021a0e); border-radius:14px; padding:28px 32px; margin-bottom:28px; border:1.5px solid rgba(5,150,105,0.3); display:flex; flex-direction:column; align-items:center; }
  .eye-diagram-caption { font-family:'Poppins',sans-serif; font-size:11px; color:rgba(110,231,183,0.5); margin-top:14px; text-align:center; letter-spacing:0.08em; text-transform:uppercase; }

  /* ═══ PUPIL BEHAVIOUR — contrast block ═══ */
  .eye-pupil-block {
    display:grid; grid-template-columns:1fr 1fr; margin-bottom:28px;
    border:1.5px solid var(--rule); border-radius:14px; overflow:hidden;
  }
  @media(max-width:580px){.eye-pupil-block{grid-template-columns:1fr;}}
  .eye-pb-left  { background:linear-gradient(160deg,#010f07,#021a0e); padding:28px 24px; }
  .eye-pb-right { background:var(--white); padding:28px 24px; border-left:1.5px solid var(--rule); }
  @media(max-width:580px){.eye-pb-right{border-left:none;border-top:1.5px solid var(--rule);}}
  .eye-pb-tag { font-family:'Poppins',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; margin-bottom:10px; }
  .eye-pb-left .eye-pb-tag { color:rgba(110,231,183,0.6); }
  .eye-pb-right .eye-pb-tag { color:var(--amber2); }
  .eye-pb-title { font-family:'Montserrat',sans-serif; font-size:17px; font-weight:800; margin-bottom:14px; line-height:1.3; }
  .eye-pb-left .eye-pb-title { color:#fff; }
  .eye-pb-right .eye-pb-title { color:var(--ink); }
  .eye-pb-item { display:flex; gap:10px; padding:9px 0; border-bottom:1px solid rgba(255,255,255,0.07); font-size:13.5px; line-height:1.65; align-items:flex-start; }
  .eye-pb-right .eye-pb-item { border-bottom-color:var(--rule); }
  .eye-pb-item:last-child { border-bottom:none; }
  .eye-pb-dot { min-width:7px; height:7px; border-radius:50%; margin-top:7px; flex-shrink:0; }
  .eye-pb-left .eye-pb-item { color:rgba(255,255,255,0.78); }
  .eye-pb-right .eye-pb-item { color:var(--ink2); }
  .eye-pb-left .eye-pb-item strong { color:var(--iris-mid); }
  .eye-pb-right .eye-pb-item strong { color:var(--amber2); }

  /* ═══ ACCOMMODATION STRIP ═══ */
  .eye-accom-strip {
    display:grid; grid-template-columns:repeat(3,1fr); gap:1px;
    background:var(--rule); border:1.5px solid var(--rule); border-radius:12px;
    overflow:hidden; margin-bottom:28px;
  }
  @media(max-width:580px){.eye-accom-strip{grid-template-columns:1fr;}}
  .eye-ac-cell { background:var(--white); padding:18px 20px; text-align:center; }
  .eye-ac-icon { display:flex; align-items:center; justify-content:center; width:44px; height:44px; border-radius:10px; background:var(--iris-lt); margin:0 auto 10px; color:var(--iris2); }
  .eye-ac-icon.amber-ic { background:var(--amber-lt); color:var(--amber2); }
  .eye-ac-icon.sky-ic   { background:var(--sky-lt);   color:var(--sky); }
  .eye-ac-val { font-family:'Montserrat',sans-serif; font-size:14px; font-weight:800; color:var(--iris2); margin-bottom:4px; }
  .eye-ac-label { font-family:'Poppins',sans-serif; font-size:12px; font-weight:700; color:var(--ink); margin-bottom:4px; }
  .eye-ac-desc { font-size:12px; color:var(--muted); line-height:1.5; }

  /* ═══ DEFECTS — card grid ═══ */
  .eye-defects-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:28px; }
  @media(max-width:580px){.eye-defects-grid{grid-template-columns:1fr;}}
  .eye-def-card { border-radius:14px; overflow:hidden; border:1.5px solid var(--rule); box-shadow:0 2px 12px rgba(5,150,105,0.07); }
  .eye-def-hdr { padding:22px 22px 16px; }
  .eye-def-hdr.myopia  { background:linear-gradient(135deg,#1a0020,#2e0840); }
  .eye-def-hdr.hyper   { background:linear-gradient(135deg,#1a0800,#2e1500); }
  .eye-def-hdr.presby  { background:linear-gradient(135deg,#001820,#00303a); }
  .eye-def-hdr.cataract{ background:linear-gradient(135deg,#0a0a0a,#1a1a1a); }
  .eye-def-tag  { font-family:'Poppins',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:rgba(255,255,255,0.4); margin-bottom:6px; }
  .eye-def-name { font-family:'Montserrat',sans-serif; font-size:19px; font-weight:800; margin-bottom:4px; }
  .eye-def-hdr.myopia   .eye-def-name { color:var(--violet-mid); }
  .eye-def-hdr.hyper    .eye-def-name { color:var(--amber-mid); }
  .eye-def-hdr.presby   .eye-def-name { color:var(--sky-mid); }
  .eye-def-hdr.cataract .eye-def-name { color:#d4d4d4; }
  .eye-def-alias { font-size:12px; color:rgba(255,255,255,0.38); font-style:italic; }
  .eye-def-body { padding:20px 22px; background:var(--white); }
  .eye-def-item { display:flex; gap:12px; padding:9px 0; border-bottom:1px solid var(--rule); font-size:13.5px; color:var(--ink2); line-height:1.65; align-items:flex-start; }
  .eye-def-item:last-child { border-bottom:none; }
  .eye-def-dot { min-width:7px; height:7px; border-radius:50%; margin-top:7px; flex-shrink:0; }
  .myopia-dot   { background:var(--violet); }
  .hyper-dot    { background:var(--amber); }
  .presby-dot   { background:var(--sky); }
  .cataract-dot { background:#737373; }
  .eye-def-item strong { color:var(--iris2); font-weight:700; }

  /* ═══ DEFECTS COMPARISON TABLE ═══ */
  .eye-def-table { width:100%; border-collapse:collapse; margin-bottom:28px; border-radius:12px; overflow:hidden; border:1.5px solid #cbd5e1; }
  .eye-def-table thead tr { background:linear-gradient(90deg,#0a2e1a 0%,#047857 100%); }
  .eye-def-table thead th { padding:13px 16px; font-family:'Poppins',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.09em; text-transform:uppercase; color:rgba(255,255,255,0.9); text-align:left; }
  .eye-def-table tbody tr:nth-child(odd)  { background:#ffffff; }
  .eye-def-table tbody tr:nth-child(even) { background:#f8fafc; }
  .eye-def-table tbody tr:hover { background:#e2f5ec; }
  .eye-def-table td { padding:12px 16px; font-size:13px; color:#1e293b; line-height:1.55; border-bottom:1px solid #e2e8f0; }
  .eye-def-table td:first-child { font-weight:700; color:#047857; font-family:'Poppins',sans-serif; }
  .eye-badge-concave { display:inline-block; background:var(--violet-lt); color:var(--violet); padding:2px 10px; border-radius:4px; font-size:11px; font-weight:700; font-family:'Poppins',sans-serif; }
  .eye-badge-convex  { display:inline-block; background:var(--amber-lt); color:var(--amber2); padding:2px 10px; border-radius:4px; font-size:11px; font-weight:700; font-family:'Poppins',sans-serif; }
  .eye-badge-bifocal { display:inline-block; background:var(--sky-lt); color:var(--sky); padding:2px 10px; border-radius:4px; font-size:11px; font-weight:700; font-family:'Poppins',sans-serif; }
  .eye-badge-surgery { display:inline-block; background:#f5f5f5; color:#525252; padding:2px 10px; border-radius:4px; font-size:11px; font-weight:700; font-family:'Poppins',sans-serif; }

  /* ═══ PRISM SECTION ═══ */
  .eye-prism-block {
    background:linear-gradient(160deg,#010f07,#021a0e);
    border-radius:14px; padding:28px 32px; margin-bottom:28px;
    border:1.5px solid rgba(5,150,105,0.25); position:relative; overflow:hidden;
  }
  .eye-prism-block::before { content:''; position:absolute; top:-30px; right:-30px; width:140px; height:140px; border-radius:50%; background:radial-gradient(circle,rgba(5,150,105,0.1) 0%,transparent 65%); }
  .eye-prism-label { font-family:'Poppins',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(110,231,183,0.55); margin-bottom:18px; }
  .eye-prism-row { display:flex; align-items:flex-start; gap:24px; flex-wrap:wrap; margin-bottom:16px; }
  .eye-prism-row:last-child { margin-bottom:0; }
  .eye-prism-eq {
    font-family:'Montserrat',sans-serif; font-size:clamp(16px,2.5vw,22px); font-weight:800;
    color:#fff; background:rgba(5,150,105,0.12); padding:12px 24px; border-radius:10px;
    border:1.5px solid rgba(5,150,105,0.25); letter-spacing:0.04em; white-space:nowrap;
  }
  .eye-prism-vars { display:flex; flex-direction:column; gap:6px; }
  .eye-prism-var { font-size:12px; color:rgba(255,255,255,0.55); }
  .eye-prism-var strong { color:var(--iris-mid); font-family:'Montserrat',sans-serif; }

  /* ═══ SPECTRUM STRIP ═══ */
  .eye-spectrum-strip { display:flex; border-radius:10px; overflow:hidden; margin-bottom:28px; border:1.5px solid var(--rule); }
  .eye-spec-band { flex:1; padding:18px 6px; display:flex; flex-direction:column; align-items:center; gap:5px; }
  .eye-spec-band:nth-child(1){background:#4c1d95;}
  .eye-spec-band:nth-child(2){background:#1d4ed8;}
  .eye-spec-band:nth-child(3){background:#0369a1;}
  .eye-spec-band:nth-child(4){background:#065f46;}
  .eye-spec-band:nth-child(5){background:#854d0e;}
  .eye-spec-band:nth-child(6){background:#9a3412;}
  .eye-spec-band:nth-child(7){background:#7f1d1d;}
  .eye-spec-letter { font-family:'Montserrat',sans-serif; font-size:18px; font-weight:900; color:#fff; }
  .eye-spec-name   { font-family:'Poppins',sans-serif; font-size:9px; font-weight:600; color:rgba(255,255,255,0.65); text-transform:uppercase; letter-spacing:0.05em; text-align:center; line-height:1.3; }
  .eye-spec-wl     { font-family:'Inter',sans-serif; font-size:9px; color:rgba(255,255,255,0.4); }

  /* ═══ SCATTERING CARDS ═══ */
  .eye-scatter-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:28px; }
  @media(max-width:640px){.eye-scatter-cards{grid-template-columns:1fr;}}
  .eye-sc-card { border-radius:12px; border:1.5px solid var(--rule); background:var(--white); padding:20px 18px; }
  .eye-sc-icon { display:flex; align-items:center; justify-content:center; width:42px; height:42px; border-radius:10px; margin-bottom:12px; }
  .eye-sc-title { font-family:'Poppins',sans-serif; font-size:13px; font-weight:700; color:var(--iris2); margin-bottom:6px; }
  .eye-sc-desc { font-size:13px; line-height:1.65; color:var(--ink2); }
  .eye-sc-reason { font-size:12px; color:var(--muted); margin-top:8px; padding-top:8px; border-top:1px solid var(--rule); line-height:1.55; }

  /* ═══ ATMOSPHERIC REFRACTION TIMELINE ═══ */
  .eye-atm-list { display:flex; flex-direction:column; gap:0; margin-bottom:28px; border:1.5px solid var(--rule); border-radius:14px; overflow:hidden; }
  .eye-atm-item { display:grid; grid-template-columns:56px 1fr; background:var(--white); border-bottom:1px solid var(--rule); }
  .eye-atm-item:last-child { border-bottom:none; }
  .eye-atm-item:nth-child(even) { background:var(--paper); }
  .eye-atm-icon-col { display:flex; align-items:center; justify-content:center; padding:18px 0; background:var(--iris-lt); font-size:22px; }
  .eye-atm-content { padding:16px 20px; }
  .eye-atm-name { font-family:'Poppins',sans-serif; font-size:13px; font-weight:700; color:var(--iris2); margin-bottom:4px; }
  .eye-atm-desc { font-size:13px; color:var(--ink2); line-height:1.65; }
  .eye-atm-desc strong { color:var(--iris3); font-weight:600; }

  /* ═══ NEWTON CARD ═══ */
  .eye-newton-card {
    display:grid; grid-template-columns:auto 1fr; gap:0;
    border:1.5px solid var(--rule); border-radius:14px; overflow:hidden; margin-bottom:28px;
  }
  .eye-newton-left { background:linear-gradient(160deg,#010f07,#021a0e); padding:28px 24px; width:180px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:12px; }
  .eye-newton-right { background:var(--white); padding:24px 26px; }
  .eye-newton-icon { font-size:48px; }
  .eye-newton-name { font-family:'Montserrat',sans-serif; font-size:14px; font-weight:800; color:#fff; line-height:1.2; }
  .eye-newton-era  { font-size:11px; color:rgba(255,255,255,0.35); font-family:'Inter',sans-serif; }
  .eye-newton-title { font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:var(--iris2); margin-bottom:10px; }
  .eye-newton-body { font-size:14px; color:var(--ink2); line-height:1.75; }
  .eye-newton-body strong { color:var(--iris3); font-weight:600; }
  @media(max-width:560px){.eye-newton-card{grid-template-columns:1fr;}.eye-newton-left{width:100%;padding:20px;flex-direction:row;gap:18px;}}

  /* ═══ ALERT ═══ */
  .eye-alert { border-radius:10px; padding:16px 20px; font-size:14px; line-height:1.75; margin-bottom:24px; border-left:4px solid; }
  .eye-alert.green  { background:var(--iris-lt);   border-color:var(--iris);   color:var(--iris3); }
  .eye-alert.amber  { background:var(--amber-lt);  border-color:var(--amber);  color:var(--amber2); }
  .eye-alert.sky    { background:var(--sky-lt);    border-color:var(--sky);    color:#0c4a6e; }
  .eye-alert.violet { background:var(--violet-lt); border-color:var(--violet); color:#3b0764; }
  .eye-alert.rose   { background:var(--rose-lt);   border-color:var(--rose);   color:#881337; }
  .eye-alert strong { font-weight:700; }

  /* ═══ PULL QUOTE ═══ */
  .eye-pull-quote {
    background:linear-gradient(135deg,#010f07,#021a0e);
    border-radius:14px; padding:28px 32px; margin-bottom:28px; position:relative; overflow:hidden;
    border:1.5px solid rgba(5,150,105,0.2);
  }
  .eye-pull-quote::before {
    content:'"'; position:absolute; top:-10px; left:18px;
    font-family:'Montserrat',sans-serif; font-size:120px; font-weight:900;
    color:rgba(5,150,105,0.07); line-height:1;
  }
  .eye-pull-quote p { font-family:'Poppins',sans-serif; font-size:15px; font-weight:500; color:rgba(255,255,255,0.75); line-height:1.8; position:relative; z-index:1; font-style:italic; }

  /* ═══ DIVIDER ═══ */
  .eye-divider { display:flex; justify-content:center; padding:32px 0; margin-bottom:8px; }
  .eye-divider-mark { width:48px; height:3px; background:linear-gradient(90deg,var(--iris),var(--amber)); border-radius:2px; }

  /* ═══ FAQ ═══ */
  .eye-faq-header { text-align:center; margin-bottom:12px; }
  .eye-faq-kicker { font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:var(--iris2); display:inline-block; padding:4px 14px; border:1px solid var(--iris-mid); border-radius:4px; background:var(--iris-lt); }
  .eye-faq-title { font-family:'Montserrat',sans-serif; font-size:clamp(22px,3.5vw,30px); font-weight:900; color:var(--ink); text-align:center; margin-bottom:32px; letter-spacing:-0.01em; }
  .eye-faq-item { border:1.5px solid var(--rule); border-radius:10px; margin-bottom:10px; overflow:hidden; background:var(--white); }
  .eye-faq-item.open { border-color:var(--iris-mid); background:var(--paper); }
  .eye-faq-q { width:100%; background:none; border:none; padding:16px 20px; display:flex; justify-content:space-between; align-items:center; gap:16px; cursor:pointer; text-align:left; }
  .eye-faq-q-text { font-family:'Poppins',sans-serif; font-size:14px; font-weight:600; color:var(--ink2); line-height:1.5; }
  .eye-faq-icon { font-size:18px; color:var(--iris2); flex-shrink:0; font-weight:700; }
  .eye-faq-ans { max-height:0; overflow:hidden; transition:max-height 0.3s ease; font-size:14px; line-height:1.8; color:var(--ink2); }
  .eye-faq-ans.visible { max-height:600px; }
  .eye-faq-ans-inner { padding:0 20px 18px; border-top:1px solid var(--rule); padding-top:14px; }
  .eye-faq-ans strong { color:var(--iris2); font-weight:600; }

  @media(max-width:640px){
    .eye-hero-inner { padding:0 20px; }
    .eye-body { padding:40px 16px 80px; }
    .eye-hero-title { font-size:clamp(32px,10vw,50px); }
    .eye-prism-block { padding:20px 18px; }
    .eye-pull-quote { padding:22px 20px; }
    .eye-def-table td, .eye-def-table th { padding:9px 10px; font-size:12px; }
    .eye-hero-stats { width:100%; }
    .eye-hero-stat { padding:12px 18px; }
    .eye-spectrum-strip { flex-wrap:wrap; }
    .eye-spec-band { min-width:40px; }
  }
`;

const faqs = [
  {
    q: "What is the phenomenon responsible for the blue colour of the sky?",
    a: <><strong>Rayleigh scattering</strong> is responsible for the blue colour of the sky. The molecules of air and fine particles in the atmosphere are smaller than the wavelength of visible light. Blue light has a <strong>shorter wavelength</strong> than red light. According to Rayleigh scattering, scattering is inversely proportional to the 4th power of wavelength (∝ 1/λ⁴), so blue light is scattered <strong>much more</strong> than red. When sunlight enters the atmosphere, blue light gets scattered in all directions across the sky, making it appear blue. If there were no atmosphere, the sky would appear completely dark (as seen by astronauts in space).</>
  },
  {
    q: "What are the near point and far point of a normal human eye?",
    a: <><strong>Near Point:</strong> The minimum distance at which an object can be seen most distinctly without strain. For a normal eye, it is <strong>25 cm</strong> (also called the least distance of distinct vision).<br/><br/><strong>Far Point:</strong> The farthest point up to which the eye can see an object clearly. For a normal eye, it is at <strong>infinity</strong>.<br/><br/>The range of clear vision for a normal eye is therefore from 25 cm to infinity. In defective eyes these points shift — in myopia the far point comes closer, in hypermetropia the near point moves farther.</>
  },
  {
    q: "Name the component of the eye responsible for adjusting the focal length of the eye lens.",
    a: <><strong>Ciliary muscles</strong> are responsible for adjusting the focal length of the crystalline eye lens.<br/><br/>When ciliary muscles <strong>relax</strong>: the eye lens becomes thin → focal length increases → distant objects are seen clearly.<br/><br/>When ciliary muscles <strong>contract</strong>: the eye lens becomes thick → focal length decreases → nearby objects are seen clearly.<br/><br/>This entire ability of the eye to adjust focal length is called the <strong>power of accommodation</strong>.</>
  },
  {
    q: "Why does the sky appear dark to an astronaut instead of blue?",
    a: <>The sky appears blue to us on Earth because of <strong>scattering of sunlight</strong> by the molecules of the atmosphere. However, above the Earth's atmosphere (where astronauts are in space), there are <strong>no air molecules or dust particles</strong> to scatter sunlight. Since there is no scattering, there is no blue scattered light reaching the eyes. Therefore, the sky (space) appears <strong>completely dark/black</strong> to an astronaut.</>
  },
  {
    q: "What is Presbyopia? How is it corrected?",
    a: <><strong>Presbyopia</strong> is a vision defect that develops with old age. As a person ages:<br/>• Ciliary muscles gradually weaken<br/>• The flexibility of the eye lens decreases<br/><br/>This causes the near point to gradually recede (move farther away). A person may suffer from both myopia and hypermetropia simultaneously.<br/><br/><strong>Correction:</strong> <strong>Bifocal lenses</strong> — lenses that contain both concave (upper portion, for distant vision) and convex (lower portion, for near vision) in the same spectacle lens.</>
  },
  {
    q: "Name the three primary colours of light.",
    a: <>The three primary colours of light are <strong>Red, Blue, and Green</strong>.<br/><br/>These are different from primary colours in painting. When all three primary colours of light are combined in equal intensities, they produce <strong>white light</strong>. Various combinations produce other colours — for example, Red + Green = Yellow, Red + Blue = Magenta, Blue + Green = Cyan.</>
  },
  {
    q: "What is the nature of the image formed by the human eye?",
    a: <>The image formed by the human eye on the retina is:<br/>• <strong>Real</strong> — it is actually formed on the retina (light sensitive surface)<br/>• <strong>Inverted</strong> — the image is upside down on the retina<br/>• <strong>Diminished</strong> — the image is much smaller than the actual object<br/><br/>The brain interprets and corrects the inverted image so we perceive objects as upright. The light-sensitive cells (rods and cones) on the retina generate electrical signals when the image is formed, which are sent to the brain via the optic nerve.</>
  },
  {
    q: "What is dispersion of light? What causes it in a glass prism?",
    a: <><strong>Dispersion of light</strong> is the splitting of white light into its component colours (spectrum — VIBGYOR) when it passes through a transparent medium like a prism.<br/><br/>It occurs because different colours (wavelengths) of light travel at slightly different speeds in glass, and therefore bend by different amounts at each refracting surface. <strong>Violet light bends the most</strong> (highest deviation D) and <strong>red light bends the least</strong> (lowest deviation D). This produces the spectrum: Violet, Indigo, Blue, Green, Yellow, Orange, Red — VIBGYOR.<br/><br/>Isaac Newton was the first to obtain the spectrum of sunlight using a glass prism.</>
  },
  {
    q: "What is the Tyndall Effect?",
    a: <><strong>Tyndall Effect</strong> is the scattering of light by colloidal particles (fine particles suspended in a medium). When a beam of light strikes minute particles suspended in the atmosphere (dust, smoke, water droplets), the path of the beam becomes visible as a cone of scattered light.<br/><br/><strong>Examples:</strong><br/>• Sunlight passing through a canopy of a dense forest — the beam becomes visible<br/>• Headlights of a car in foggy conditions<br/>• A torch beam in a dusty room<br/><br/>The colour of scattered light depends on the size of particles — fine particles scatter shorter wavelengths (blue), larger particles scatter longer wavelengths (red), and very large particles scatter all wavelengths equally (white).</>
  },
  {
    q: "A student has difficulty reading the blackboard from the last row. What defect is this and how is it corrected?",
    a: <>The student is suffering from <strong>Myopia (Near-sightedness)</strong>. The student can see nearby objects clearly but cannot see distant objects (like a blackboard from far away).<br/><br/><strong>Cause:</strong> Either excessive curvature of the eye lens (too thick, decreased focal length) or elongation of the eyeball. The image forms in front of the retina instead of on it.<br/><br/><strong>Correction:</strong> Using a <strong>concave lens (diverging lens)</strong> of appropriate power. The concave lens diverges the incoming parallel rays so that they appear to come from the far point of the myopic eye, allowing the eye lens to then focus them correctly onto the retina.</>
  },
  {
    q: "Why does the sun appear red at sunrise and sunset but white at noon?",
    a: <><strong>At sunrise and sunset:</strong> The sun is near the horizon, so sunlight has to travel through a <strong>much longer path</strong> in the atmosphere. During this long journey, most of the blue light (shorter wavelength) gets <strong>scattered away</strong> by atmospheric particles. The light of longer wavelength — <strong>red and orange</strong> — passes through and reaches our eyes. Hence the sun appears red or orange.<br/><br/><strong>At noon:</strong> The sun is overhead and sunlight travels through a <strong>shorter path</strong> in the atmosphere. Only a little blue light is scattered. Almost all colours reach our eyes together, so the sun appears <strong>white (or yellowish-white)</strong>.</>
  },
  {
    q: "Why do stars twinkle but planets do not?",
    a: <><strong>Stars twinkle</strong> because they are extremely far away and act as <strong>point sources of light</strong>. As the starlight passes through different layers of the atmosphere (which have varying temperatures, densities and refractive indices), it undergoes continuous refraction. The apparent position of the star keeps fluctuating, and the amount of light entering the eye keeps varying — sometimes bright, sometimes faint. This variation appears as <strong>twinkling</strong>.<br/><br/><strong>Planets do not twinkle</strong> because they are much closer to Earth and appear as <strong>extended sources of light</strong> (a collection of many point sources). The twinkling effects from individual points cancel each other out, and the total light entering our eyes remains nearly constant — so planets appear steady.</>
  },
  {
    q: "Explain how a rainbow is formed.",
    a: <><strong>Rainbow</strong> is a natural spectrum of sunlight formed due to <strong>dispersion</strong> of sunlight by tiny water droplets suspended in the atmosphere after rain. Each water droplet acts like a small prism.<br/><br/><strong>Process (3 steps):</strong><br/>1. At point A (entering droplet): <strong>Refraction and dispersion</strong> — white light splits into VIBGYOR<br/>2. At point B (inside droplet): <strong>Total internal reflection</strong> — light reflects off the back of the droplet<br/>3. At point C (exiting droplet): <strong>Refraction and dispersion again</strong> — colours separate further<br/><br/><strong>Key facts:</strong><br/>• Rainbow always forms in a direction <strong>opposite to the sun</strong><br/>• Red appears at the top, violet at the bottom<br/>• Best seen in the morning (sun behind you, rainbow ahead)</>
  },
];

export default function Chapter11HumanEyeColourfulWorld() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="eye-root">

        {/* ══ HERO ══ */}
        <div className="eye-hero">
          <div className="eye-hero-grid" />
          <div className="eye-glow-1" />
          <div className="eye-glow-2" />
          <div className="eye-glow-3" />

          {/* Eye + spectrum SVG watermark */}
          <svg className="eye-hero-svg" viewBox="0 0 500 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="irisGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%"  stopColor="#059669" stopOpacity="0.5"/>
                <stop offset="40%" stopColor="#047857" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#022c22" stopOpacity="0"/>
              </radialGradient>
            </defs>
            {/* Large eye outline */}
            <ellipse cx="250" cy="320" rx="220" ry="130" fill="none" stroke="rgba(5,150,105,0.18)" strokeWidth="2"/>
            {/* Iris circle */}
            <circle cx="250" cy="320" r="90" fill="none" stroke="rgba(5,150,105,0.2)" strokeWidth="1.5"/>
            <circle cx="250" cy="320" r="90" fill="url(#irisGrad)"/>
            {/* Iris lines */}
            {Array.from({length:16}).map((_,i)=>(
              <line key={i}
                x1={250+90*Math.cos(i*Math.PI/8)} y1={320+90*Math.sin(i*Math.PI/8)}
                x2={250+35*Math.cos(i*Math.PI/8)} y2={320+35*Math.sin(i*Math.PI/8)}
                stroke="rgba(5,150,105,0.15)" strokeWidth="1"/>
            ))}
            {/* Pupil */}
            <circle cx="250" cy="320" r="34" fill="rgba(0,0,0,0.55)"/>
            {/* Catchlight */}
            <circle cx="237" cy="307" r="9" fill="rgba(255,255,255,0.08)"/>
            {/* Eyelid curves */}
            <path d="M30,320 Q250,180 470,320" fill="none" stroke="rgba(5,150,105,0.15)" strokeWidth="1.5"/>
            <path d="M30,320 Q250,460 470,320" fill="none" stroke="rgba(5,150,105,0.15)" strokeWidth="1.5"/>
            {/* Spectrum fan from pupil */}
            {[
              {angle:-60,color:"rgba(124,58,237,0.5)"},
              {angle:-45,color:"rgba(37,99,235,0.5)"},
              {angle:-30,color:"rgba(2,132,199,0.5)"},
              {angle:-15,color:"rgba(5,150,105,0.5)"},
              {angle:0,  color:"rgba(202,138,4,0.5)"},
              {angle:15, color:"rgba(234,88,12,0.5)"},
              {angle:30, color:"rgba(220,38,38,0.5)"},
            ].map((r,i)=>{
              const rad = r.angle*Math.PI/180;
              return <line key={i} x1="250" y1="320"
                x2={250+260*Math.cos(rad)} y2={320+260*Math.sin(rad)}
                stroke={r.color} strokeWidth="1.5"/>;
            })}
            {/* Optic nerve suggestion */}
            <circle cx="250" cy="320" r="130" fill="none" stroke="rgba(5,150,105,0.07)" strokeWidth="1"/>
            <circle cx="250" cy="320" r="180" fill="none" stroke="rgba(5,150,105,0.05)" strokeWidth="1"/>
          </svg>

          <div className="eye-hero-inner">
            <div className="eye-subject-pill">
              <span className="eye-pill-dot" />
              Biology · Physics · Class X · Science
            </div>
            <div className="eye-hero-eyebrow">Chapter 11 · NCERT Science</div>
            <h1 className="eye-hero-title">
              <span className="t1">The Human Eye</span>
              <span className="t2">&amp; the Colourful</span>
              <span className="t3">World</span>
            </h1>
            <p className="eye-hero-desc">
              From the anatomy of the eye to the physics of rainbows — explore vision defects, dispersion, atmospheric refraction, and why the sky is blue.
            </p>
            <div className="eye-hero-stats">
              {[
                {num:"8",    label:"Parts of the Eye"},
                {num:"4",    label:"Vision Defects"},
                {num:"25cm", label:"Normal Near Point"},
                {num:"VIBGYOR", label:"Spectrum Colours"},
              ].map(s => (
                <div className="eye-hero-stat" key={s.label}>
                  <div className="eye-stat-num">{s.num}</div>
                  <div className="eye-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ BODY ══ */}
        <div className="eye-body">

          {/* ── INTRO ── */}
          <div className="eye-intro">
            <div>
              <div className="eye-intro-kicker">Chapter Overview</div>
              <h2 className="eye-intro-headline">The Eye — Nature's <em>Finest Optical Instrument</em></h2>
              <p className="eye-intro-body">
                The <strong>human eye</strong> is a remarkable sense organ that works like a camera. It captures real, inverted images on its light-sensitive surface — the retina — and sends electrical signals to the brain via the optic nerve. The brain then interprets these signals, and we perceive the world around us.
              </p>
              <p className="eye-intro-body">
                Beyond the anatomy of the eye, this chapter explores the optical phenomena of nature: <strong>rainbow formation</strong> due to dispersion, <strong>twinkling of stars</strong> and advance sunrise due to atmospheric refraction, and the <strong>blue colour of the sky</strong> due to Rayleigh scattering of light.
              </p>
            </div>
            <div className="eye-intro-sidebar">
              <div className="eye-sidebar-label">Topics Covered</div>
              <div className="eye-sidebar-title">What You'll Learn</div>
              <ul className="eye-sidebar-list">
                {[
                  "Parts of the Human Eye",
                  "Power of Accommodation",
                  "Defects of Vision & Correction",
                  "Refraction Through a Prism",
                  "Dispersion & Spectrum",
                  "Rainbow Formation",
                  "Atmospheric Refraction",
                  "Scattering of Light (Tyndall Effect)",
                ].map((t,i) => (
                  <li className="eye-sidebar-item" key={i}>
                    <span className="eye-sidebar-num">{i+1}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ════ SECTION 1: HUMAN EYE ════ */}
          <div className="eye-ch-divider">
            <div className="eye-ch-badge"><span className="eye-ch-num">01</span><span className="eye-ch-text">The Human Eye</span></div>
          </div>

          <div className="eye-sec-head">
            <span className="eye-sec-num">1</span>
            <div className="eye-sec-kicker">Anatomy of Vision</div>
            <h2 className="eye-sec-title">Parts of the Eye <span>&amp; Their Functions</span></h2>
          </div>

          <p className="eye-body-text">
            The human eye is approximately <strong>spherical in shape</strong> with a diameter of about 2.3 cm. It forms a <strong>real, inverted, and diminished</strong> image on the retina. Here are all the key parts and their functions:
          </p>

          {/* Eye SVG diagram */}
          <div className="eye-diagram-wrap">
            <svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",maxWidth:"560px"}}>

              {/* ── Eyeball sclera (white of eye) ── */}
              <ellipse cx="300" cy="170" rx="148" ry="148" fill="rgba(255,255,255,0.06)" stroke="rgba(110,231,183,0.35)" strokeWidth="2"/>

              {/* ── Vitreous humour interior ── */}
              <ellipse cx="300" cy="170" rx="146" ry="146" fill="rgba(5,150,105,0.05)"/>

              {/* ── Retina — thick red arc exactly at the back wall ── */}
              <path d="M308,30 Q455,170 308,310" fill="none" stroke="rgba(239,68,68,0.75)" strokeWidth="5" strokeLinecap="round"/>
              {/* Retina inner lining (faint fill edge) */}
              <path d="M308,30 Q455,170 308,310" fill="none" stroke="rgba(239,68,68,0.15)" strokeWidth="12"/>

              {/* ── Optic nerve — exits from back of retina (blind spot) ── */}
              <line x1="448" y1="170" x2="510" y2="170" stroke="rgba(239,68,68,0.65)" strokeWidth="5" strokeLinecap="round"/>
              {/* Blind spot dot on retina */}
              <circle cx="448" cy="170" r="5" fill="rgba(239,68,68,0.8)"/>

              {/* ── Cornea — stronger, more prominent front bulge ── */}
              <path d="M152,170 Q122,120 122,170 Q122,220 152,170" fill="rgba(56,189,248,0.2)" stroke="rgba(56,189,248,0.8)" strokeWidth="2.5"/>

              {/* ── Aqueous humour (chamber between cornea and lens) ── */}
              <path d="M152,135 Q188,118 188,170 Q188,222 152,205" fill="rgba(125,211,252,0.1)" stroke="rgba(125,211,252,0.25)" strokeWidth="1"/>

              {/* ── Iris ring ── */}
              <circle cx="168" cy="170" r="30" fill="rgba(5,150,105,0.3)" stroke="rgba(5,150,105,0.75)" strokeWidth="2"/>
              {/* Iris texture lines */}
              {Array.from({length:8}).map((_,i)=>(
                <line key={i}
                  x1={168+30*Math.cos(i*Math.PI/4)} y1={170+30*Math.sin(i*Math.PI/4)}
                  x2={168+14*Math.cos(i*Math.PI/4)} y2={170+14*Math.sin(i*Math.PI/4)}
                  stroke="rgba(5,150,105,0.35)" strokeWidth="1"/>
              ))}
              {/* ── Pupil — clearly black opening in centre of iris ── */}
              <circle cx="168" cy="170" r="13" fill="#000" stroke="rgba(30,30,30,0.9)" strokeWidth="1.5"/>
              {/* tiny catchlight so pupil reads as opening not solid disc */}
              <circle cx="163" cy="165" r="3" fill="rgba(255,255,255,0.12)"/>

              {/* ── Crystalline lens — biconvex shape ── */}
              <path d="M200,145 Q220,170 200,195 Q180,170 200,145" fill="rgba(252,211,77,0.22)" stroke="rgba(252,211,77,0.7)" strokeWidth="2"/>

              {/* ── Ciliary muscles — clearly attached to lens edges ── */}
              <path d="M198,145 Q215,132 228,138" fill="none" stroke="rgba(167,139,250,0.7)" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M198,195 Q215,208 228,202" fill="none" stroke="rgba(167,139,250,0.7)" strokeWidth="2.5" strokeLinecap="round"/>
              {/* Ciliary body blobs */}
              <ellipse cx="228" cy="138" rx="7" ry="10" fill="rgba(167,139,250,0.4)" stroke="rgba(167,139,250,0.65)" strokeWidth="1.5"/>
              <ellipse cx="228" cy="202" rx="7" ry="10" fill="rgba(167,139,250,0.4)" stroke="rgba(167,139,250,0.65)" strokeWidth="1.5"/>

              {/* ══ LIGHT RAYS ══ */}
              {/* Incoming parallel rays (from object on left) */}
              <line x1="22" y1="138" x2="122" y2="153" stroke="rgba(255,255,220,0.55)" strokeWidth="1.8" strokeDasharray="5,3"/>
              <line x1="22" y1="170" x2="122" y2="170" stroke="rgba(255,255,220,0.7)"  strokeWidth="2"   strokeDasharray="5,3"/>
              <line x1="22" y1="202" x2="122" y2="187" stroke="rgba(255,255,220,0.55)" strokeWidth="1.8" strokeDasharray="5,3"/>

              {/* Strong refraction at cornea — rays bend sharply inward */}
              <line x1="122" y1="153" x2="152" y2="157" stroke="rgba(255,255,220,0.55)" strokeWidth="1.8"/>
              <line x1="122" y1="170" x2="152" y2="170" stroke="rgba(255,255,220,0.7)"  strokeWidth="2"/>
              <line x1="122" y1="187" x2="152" y2="183" stroke="rgba(255,255,220,0.55)" strokeWidth="1.8"/>

              {/* Through pupil/iris gap — converging via lens */}
              <line x1="152" y1="157" x2="202" y2="159" stroke="rgba(255,255,220,0.45)" strokeWidth="1.5"/>
              <line x1="152" y1="170" x2="202" y2="170" stroke="rgba(255,255,220,0.6)"  strokeWidth="1.8"/>
              <line x1="152" y1="183" x2="202" y2="181" stroke="rgba(255,255,220,0.45)" strokeWidth="1.5"/>

              {/* After lens — rays converge sharply TO A POINT ON THE RETINA */}
              {/* Focus point = exactly on the retina arc at x≈390, y=170 */}
              <line x1="202" y1="159" x2="390" y2="170" stroke="rgba(255,230,100,0.55)" strokeWidth="1.5"/>
              <line x1="202" y1="170" x2="390" y2="170" stroke="rgba(255,230,100,0.7)"  strokeWidth="2"/>
              <line x1="202" y1="181" x2="390" y2="170" stroke="rgba(255,230,100,0.55)" strokeWidth="1.5"/>

              {/* Image point — bright dot exactly ON the retina arc */}
              <circle cx="390" cy="170" r="5" fill="rgba(255,220,50,0.95)" stroke="rgba(255,200,0,0.8)" strokeWidth="1.5"/>
              {/* Small glow around image point */}
              <circle cx="390" cy="170" r="9" fill="rgba(255,220,50,0.18)"/>

              {/* ══ LABELS ══ */}
              {/* Object label */}
              <text x="4" y="135" fill="rgba(255,255,200,0.55)" fontSize="9" fontFamily="Poppins,sans-serif" fontWeight="600">Object</text>

              {/* Cornea — top-left */}
              <text x="62" y="94" fill="rgba(56,189,248,0.9)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700">Cornea</text>
              <text x="54" y="106" fill="rgba(56,189,248,0.65)" fontSize="8.5" fontFamily="Poppins,sans-serif">(main refracting surface)</text>
              <line x1="104" y1="104" x2="128" y2="138" stroke="rgba(56,189,248,0.45)" strokeWidth="1" strokeDasharray="3,2"/>

              {/* Iris */}
              <text x="58" y="148" fill="rgba(5,150,105,0.9)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700">Iris</text>
              <line x1="80" y1="148" x2="142" y2="157" stroke="rgba(5,150,105,0.45)" strokeWidth="1" strokeDasharray="3,2"/>

              {/* Pupil */}
              <text x="58" y="175" fill="rgba(200,200,200,0.75)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700">Pupil</text>
              <text x="52" y="186" fill="rgba(180,180,180,0.5)" fontSize="8" fontFamily="Poppins,sans-serif">(opening)</text>
              <line x1="88" y1="174" x2="156" y2="170" stroke="rgba(200,200,200,0.35)" strokeWidth="1" strokeDasharray="3,2"/>

              {/* Eye Lens */}
              <text x="178" y="82" fill="rgba(252,211,77,0.9)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700">Eye Lens</text>
              <line x1="198" y1="84" x2="200" y2="145" stroke="rgba(252,211,77,0.45)" strokeWidth="1" strokeDasharray="3,2"/>

              {/* Ciliary Muscles */}
              <text x="234" y="100" fill="rgba(167,139,250,0.9)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700">Ciliary Muscles</text>
              <text x="234" y="112" fill="rgba(167,139,250,0.55)" fontSize="8" fontFamily="Poppins,sans-serif">(control lens shape)</text>
              <line x1="248" y1="114" x2="230" y2="135" stroke="rgba(167,139,250,0.4)" strokeWidth="1" strokeDasharray="3,2"/>

              {/* Aqueous Humour */}
              <text x="104" y="225" fill="rgba(125,211,252,0.7)" fontSize="9" fontFamily="Poppins,sans-serif" fontWeight="600">Aqueous Humour</text>

              {/* Retina — with spelling fixed */}
              <text x="310" y="26" fill="rgba(239,68,68,0.9)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700">Retina</text>
              <line x1="320" y1="30" x2="336" y2="52" stroke="rgba(239,68,68,0.45)" strokeWidth="1" strokeDasharray="3,2"/>

              {/* Image label — next to the dot ON the retina */}
              <text x="358" y="156" fill="rgba(255,220,50,0.9)" fontSize="9" fontFamily="Poppins,sans-serif" fontWeight="700">Image</text>
              <text x="354" y="167" fill="rgba(255,220,50,0.65)" fontSize="8" fontFamily="Poppins,sans-serif">(on retina)</text>

              {/* Optic Nerve */}
              <text x="468" y="158" fill="rgba(239,68,68,0.75)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700">Optic</text>
              <text x="468" y="171" fill="rgba(239,68,68,0.75)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700">Nerve</text>

              {/* Vitreous Humour */}
              <text x="320" y="210" fill="rgba(110,231,183,0.45)" fontSize="9" fontFamily="Poppins,sans-serif" fontWeight="600">Vitreous Humour</text>

              {/* Blind spot label */}
              <text x="420" y="192" fill="rgba(239,68,68,0.5)" fontSize="8" fontFamily="Poppins,sans-serif">(blind spot)</text>

            </svg>
            <div className="eye-diagram-caption">Cross-section of the Human Eye — Labelled Diagram</div>
          </div>

          {/* Parts grid */}
          <div className="eye-parts-grid">
            {[
              {num:"01", name:"Cornea",          desc:"Thin transparent membrane — forms the bulge on front of eyeball. Most refraction of light occurs here at its outer surface.",  note:"Main refracting surface"},
              {num:"02", name:"Eyeball",         desc:"Approximately spherical, diameter ~2.3 cm. Houses all optical components of the eye.",                                          note:"~2.3 cm diameter"},
              {num:"03", name:"Iris",            desc:"Dark muscular diaphragm behind cornea. Controls the size of the pupil by expanding or contracting in response to light.",       note:"Controls pupil size"},
              {num:"04", name:"Pupil",           desc:"Black circular opening between aqueous humour and lens. Regulates the amount of light entering the eye — like a camera aperture.", note:"Variable aperture"},
              {num:"05", name:"Crystalline Lens",desc:"Convex lens made of fibrous jelly-like material. Provides focused, real, inverted image on retina.",                            note:"Focuses on retina"},
              {num:"06", name:"Ciliary Muscles", desc:"Attached to the edges of the eye lens. Change the curvature of the lens → change its focal length → enable accommodation.",   note:"Power of accommodation"},
              {num:"07", name:"Retina",          desc:"Thin light-sensitive membrane at back of eye. Contains rods (dim light) and cones (colour). Generates electrical signals.",     note:"Light-sensitive surface"},
              {num:"08", name:"Optic Nerve",     desc:"Carries electrical signals from retina to the brain. The brain interprets these signals as visual images.",                     note:"Brain connection"},
              {num:"+",  name:"Vitreous Humour", desc:"Transparent jelly-like fluid filling the main chamber of the eyeball behind the lens. Maintains the spherical shape of the eye.", note:"Fills eyeball"},
            ].map(p => (
              <div className="eye-part-cell" key={p.num}>
                <div className="eye-part-top">
                  <span className="eye-part-num">{p.num}</span>
                  <div className="eye-part-name">{p.name}</div>
                </div>
                <div className="eye-part-body">
                  <div className="eye-part-desc">{p.desc}</div>
                  <div className="eye-part-note">{p.note}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="eye-alert green" style={{display:"flex",gap:"12px",alignItems:"flex-start"}}>
            <span style={{flexShrink:0,marginTop:"1px"}}><Icon id="clock" size={18} color="#047857"/></span>
            <span><strong>Persistence of Vision:</strong> The sensation of an object continues in the eye for about <strong>1/16th of a second</strong> after the object is removed. This is the basis of motion pictures — film plays at 24 frames per second, which is faster than 1/16 s, so images appear continuous.</span>
          </div>

          {/* ════ SECTION 2: ACCOMMODATION ════ */}
          <div className="eye-ch-divider">
            <div className="eye-ch-badge"><span className="eye-ch-num">02</span><span className="eye-ch-text">Power of Accommodation</span></div>
          </div>

          <div className="eye-sec-head">
            <span className="eye-sec-num">2</span>
            <div className="eye-sec-kicker">Auto-Focus System</div>
            <h2 className="eye-sec-title">Accommodation &amp; <span>Pupil Function</span></h2>
          </div>

          <p className="eye-body-text">
            The ability of the eye lens to <strong>adjust its focal length</strong> to see objects at different distances is called the <strong>Power of Accommodation</strong>. This is achieved through the ciliary muscles which change the curvature (and therefore focal length) of the crystalline lens.
          </p>

          <div className="eye-accom-strip">
            {[
              {iconId:"mountain", iconCls:"", val:"Ciliary Muscles RELAX", label:"For Distant Objects", desc:"Lens becomes thin → focal length increases → distant objects seen clearly. Far point of normal eye = Infinity."},
              {iconId:"book",     iconCls:"amber-ic", val:"Ciliary Muscles CONTRACT", label:"For Near Objects", desc:"Lens becomes thick → focal length decreases → nearby objects seen clearly. Near point of normal eye = 25 cm."},
              {iconId:"eye",      iconCls:"sky-ic", val:"25 cm to ∞", label:"Normal Vision Range", desc:"The range between near point (25 cm) and far point (∞) over which a normal eye can see clearly without strain."},
            ].map(c => (
              <div className="eye-ac-cell" key={c.val}>
                <div className={`eye-ac-icon ${c.iconCls}`}><Icon id={c.iconId} size={20}/></div>
                <div className="eye-ac-val">{c.val}</div>
                <div className="eye-ac-label">{c.label}</div>
                <div className="eye-ac-desc">{c.desc}</div>
              </div>
            ))}
          </div>

          {/* Pupil behaviour */}
          <div className="eye-pupil-block">
            <div className="eye-pb-left">
              <div className="eye-pb-tag">In Bright Light</div>
              <div className="eye-pb-title">Iris Contracts the Pupil</div>
              {[
                <><strong>Pupil becomes smaller</strong> — less light enters the eye</>,
                "Protects the retina from excessive light intensity",
                "Example: stepping out of a dark cinema hall into bright sunlight — eyes squint temporarily",
                <><strong>Iris muscle contracts</strong>, reducing pupil diameter</>,
              ].map((t,i) => (
                <div className="eye-pb-item" key={i}><span className="eye-pb-dot" style={{background:"var(--iris-mid)"}}/><span>{t}</span></div>
              ))}
            </div>
            <div className="eye-pb-right">
              <div className="eye-pb-tag">In Dim Light</div>
              <div className="eye-pb-title">Iris Expands the Pupil</div>
              {[
                <><strong>Pupil becomes larger</strong> — more light enters the eye</>,
                "Ensures sufficient light reaches the retina in dark conditions",
                "Example: entering a dark cinema hall from bright sunlight — takes time to see",
                <><strong>Iris muscle relaxes</strong> — pupil opens completely when iris is fully relaxed</>,
              ].map((t,i) => (
                <div className="eye-pb-item" key={i}><span className="eye-pb-dot" style={{background:"var(--amber)"}}/><span>{t}</span></div>
              ))}
            </div>
          </div>

          {/* ════ SECTION 3: DEFECTS ════ */}
          <div className="eye-ch-divider">
            <div className="eye-ch-badge"><span className="eye-ch-num">03</span><span className="eye-ch-text">Defects of Vision &amp; Correction</span></div>
          </div>

          <div className="eye-sec-head">
            <span className="eye-sec-num">3</span>
            <div className="eye-sec-kicker">When the Eye Fails</div>
            <h2 className="eye-sec-title">Vision Defects <span>&amp; Their Correction</span></h2>
          </div>

          <p className="eye-body-text">
            Sometimes the eye loses its ability to see objects clearly at certain distances. This happens due to changes in the shape of the eyeball, curvature of the lens, or weakening of ciliary muscles. There are four main defects of vision.
          </p>

          <div className="eye-defects-grid">
            {[
              {cls:"myopia", dotCls:"myopia-dot", tag:"Near-Sightedness", name:"Myopia", alias:"Cannot see distant objects", items:[
                <><strong>Symptoms:</strong> Distant objects blurry; nearby objects clear</>,
                <><strong>Cause 1:</strong> Excessive curvature of eye lens — lens becomes too thick, focal length decreases</>,
                <><strong>Cause 2:</strong> Elongation of the eyeball — image forms in front of the retina</>,
                <><strong>Correction:</strong> Concave (diverging) lens of appropriate power</>,
              ]},
              {cls:"hyper", dotCls:"hyper-dot", tag:"Far-Sightedness", name:"Hypermetropia", alias:"Cannot see nearby objects", items:[
                <><strong>Symptoms:</strong> Nearby objects blurry; distant objects clear</>,
                <><strong>Cause 1:</strong> Eye lens too thin — focal length increases, image forms behind retina</>,
                <><strong>Cause 2:</strong> Eyeball too small — image cannot form on retina</>,
                <><strong>Correction:</strong> Convex (converging) lens of appropriate power</>,
              ]},
              {cls:"presby", dotCls:"presby-dot", tag:"Age-Related", name:"Presbyopia", alias:"Old-age vision defect", items:[
                <><strong>Symptoms:</strong> Near point recedes with age; may have both myopia and hypermetropia</>,
                <><strong>Cause 1:</strong> Gradual weakening of ciliary muscles with age</>,
                <><strong>Cause 2:</strong> Decreasing flexibility of eye lens over time</>,
                <><strong>Correction:</strong> Bifocal lenses — concave on top (distance), convex on bottom (near)</>,
              ]},
              {cls:"cataract", dotCls:"cataract-dot", tag:"Eye Disease", name:"Cataract", alias:"Clouding of eye lens", items:[
                <><strong>Symptoms:</strong> Image cannot be seen distinctly — blurring and haziness</>,
                <><strong>Cause:</strong> Eye lens becomes milky and cloudy over time</>,
                <><strong>Severity:</strong> Can cause partial or even complete loss of vision if untreated</>,
                <><strong>Correction:</strong> Surgical removal of the cloudy lens (cataract surgery)</>,
              ]},
            ].map(d => (
              <div className="eye-def-card" key={d.cls}>
                <div className={`eye-def-hdr ${d.cls}`}>
                  <div className="eye-def-tag">{d.tag}</div>
                  <div className="eye-def-name">{d.name}</div>
                  <div className="eye-def-alias">{d.alias}</div>
                </div>
                <div className="eye-def-body">
                  {d.items.map((item,i) => (
                    <div className="eye-def-item" key={i}>
                      <span className={`eye-def-dot ${d.dotCls}`}/><span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <p className="eye-body-text"><strong>Quick Comparison — Vision Defects at a Glance:</strong></p>
          <div style={{overflowX:"auto", marginBottom:"28px"}}>
            <table className="eye-def-table">
              <thead>
                <tr>
                  <th>Defect</th>
                  <th>Cannot See</th>
                  <th>Image Forms</th>
                  <th>Cause</th>
                  <th>Correction Lens</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Myopia","Distant objects","In front of retina","Thick lens / long eyeball",<span className="eye-badge-concave">Concave</span>],
                  ["Hypermetropia","Near objects","Behind retina","Thin lens / small eyeball",<span className="eye-badge-convex">Convex</span>],
                  ["Presbyopia","Near + Distant","Behind retina (near)","Weak ciliary muscles + inflexible lens",<span className="eye-badge-bifocal">Bifocal</span>],
                  ["Cataract","Both (hazy)","Blocked/diffuse","Milky, cloudy lens",<span className="eye-badge-surgery">Surgery</span>],
                ].map((r,i) => (
                  <tr key={i}>{r.map((c,j) => <td key={j}>{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ════ SECTION 4: PRISM & DISPERSION ════ */}
          <div className="eye-ch-divider">
            <div className="eye-ch-badge"><span className="eye-ch-num">04</span><span className="eye-ch-text">Prism, Dispersion &amp; Rainbow</span></div>
          </div>

          <div className="eye-sec-head">
            <span className="eye-sec-num">4</span>
            <div className="eye-sec-kicker">Splitting White Light</div>
            <h2 className="eye-sec-title">Dispersion Through a Prism <span>&amp; Rainbow</span></h2>
          </div>

          <p className="eye-body-text">
            A <strong>glass prism</strong> has two triangular bases and three rectangular lateral faces. When white light enters a prism, it splits into a band of colours — this is called <strong>dispersion</strong>. The angle between the two lateral refracting faces is the <strong>Angle of Prism</strong>.
          </p>

          {/* Prism SVG diagram */}
          <div className="eye-diagram-wrap" style={{marginBottom:"24px"}}>
            <svg viewBox="0 0 540 260" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",maxWidth:"500px"}}>
              {/* Prism */}
              <polygon points="210,40 100,220 320,220" fill="rgba(125,211,252,0.07)" stroke="rgba(110,231,183,0.4)" strokeWidth="2"/>
              {/* Angle of prism label */}
              <text x="192" y="36" fill="rgba(110,231,183,0.7)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="600">A</text>
              <text x="86" y="232" fill="rgba(110,231,183,0.5)" fontSize="10" fontFamily="Poppins,sans-serif">B</text>
              <text x="322" y="232" fill="rgba(110,231,183,0.5)" fontSize="10" fontFamily="Poppins,sans-serif">C</text>

              {/* Normal lines at surfaces */}
              <line x1="155" y1="90" x2="185" y2="180" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4,3"/>
              <line x1="265" y1="90" x2="235" y2="180" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4,3"/>

              {/* Incident white ray */}
              <line x1="40" y1="110" x2="158" y2="130" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5"/>
              <text x="22" y="105" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Poppins,sans-serif">White</text>
              <text x="22" y="117" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Poppins,sans-serif">light</text>
              {/* Angle of incidence label */}
              <text x="128" y="108" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Poppins,sans-serif">i</text>

              {/* Refracted rays inside prism — bundled */}
              <line x1="158" y1="130" x2="258" y2="148" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>

              {/* Emergent spectrum rays */}
              {[
                {y1:142,y2:66, x2:390, color:"rgba(124,58,237,0.8)", label:"V"},
                {y1:144,y2:82, x2:388, color:"rgba(37,99,235,0.8)",  label:"I"},
                {y1:146,y2:98, x2:390, color:"rgba(2,132,199,0.8)",  label:"B"},
                {y1:148,y2:114,x2:392, color:"rgba(5,150,105,0.8)",  label:"G"},
                {y1:150,y2:130,x2:394, color:"rgba(202,138,4,0.8)",  label:"Y"},
                {y1:152,y2:146,x2:394, color:"rgba(234,88,12,0.8)",  label:"O"},
                {y1:154,y2:162,x2:392, color:"rgba(220,38,38,0.8)",  label:"R"},
              ].map((r,i) => (
                <g key={i}>
                  <line x1="258" y1={r.y1} x2={r.x2} y2={r.y2} stroke={r.color} strokeWidth="1.8"/>
                  <text x={r.x2+4} y={r.y2+4} fill={r.color} fontSize="11" fontFamily="Montserrat,sans-serif" fontWeight="800">{r.label}</text>
                </g>
              ))}

              {/* Angle of deviation arc */}
              <path d="M40,110 Q80,80 95,120" fill="none" stroke="rgba(252,211,77,0.4)" strokeWidth="1" strokeDasharray="3,2"/>
              <text x="52" y="90" fill="rgba(252,211,77,0.7)" fontSize="9" fontFamily="Poppins,sans-serif">D</text>

              {/* Emergent angle label */}
              <text x="330" y="130" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="Poppins,sans-serif">e (emergent angle)</text>

              {/* Labels */}
              <text x="175" y="180" fill="rgba(110,231,183,0.4)" fontSize="9" fontFamily="Poppins,sans-serif">Prism (glass)</text>
              <text x="380" y="180" fill="rgba(110,231,183,0.6)" fontSize="9" fontFamily="Poppins,sans-serif">Spectrum</text>
            </svg>
            <div className="eye-diagram-caption">Dispersion of white light through a Glass Prism → VIBGYOR spectrum</div>
          </div>

          <div className="eye-prism-block">
            <div className="eye-prism-label">Key Terms — Prism &amp; Dispersion</div>
            <div className="eye-prism-row">
              <div className="eye-prism-eq">D = Angle of Deviation</div>
              <div className="eye-prism-vars">
                <div className="eye-prism-var"><strong>D</strong> — angle between the incident ray extended and the emergent ray</div>
                <div className="eye-prism-var"><strong>D (violet) &gt; D (red)</strong> — violet bends most, red bends least</div>
                <div className="eye-prism-var"><strong>i</strong> — angle of incidence &nbsp;·&nbsp; <strong>e</strong> — angle of emergence</div>
              </div>
            </div>
            <div className="eye-prism-row">
              <div className="eye-prism-eq">Dispersion → VIBGYOR</div>
              <div className="eye-prism-vars">
                <div className="eye-prism-var">White light splits because different colours have different wavelengths → different refractive indices → different angles of bending in glass</div>
                <div className="eye-prism-var"><strong>Violet</strong>: shortest wavelength → bends most &nbsp;·&nbsp; <strong>Red</strong>: longest wavelength → bends least</div>
              </div>
            </div>
          </div>

          {/* VIBGYOR strip */}
          <div className="eye-spectrum-strip">
            {[
              {l:"V",name:"Violet",   wl:"380–450nm"},
              {l:"I",name:"Indigo",   wl:"450–425nm"},
              {l:"B",name:"Blue",     wl:"450–495nm"},
              {l:"G",name:"Green",    wl:"495–570nm"},
              {l:"Y",name:"Yellow",   wl:"570–590nm"},
              {l:"O",name:"Orange",   wl:"590–620nm"},
              {l:"R",name:"Red",      wl:"620–750nm"},
            ].map(s => (
              <div className="eye-spec-band" key={s.l}>
                <span className="eye-spec-letter">{s.l}</span>
                <span className="eye-spec-name">{s.name}</span>
                <span className="eye-spec-wl">{s.wl}</span>
              </div>
            ))}
          </div>

          {/* Newton card */}
          <div className="eye-newton-card">
            <div className="eye-newton-left">
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"56px",height:"56px",borderRadius:"14px",background:"rgba(5,150,105,0.15)"}}><Icon id="apple" size={28} color="#6ee7b7"/></div>
              <div className="eye-newton-name">Isaac Newton</div>
              <div className="eye-newton-era">1666 AD</div>
            </div>
            <div className="eye-newton-right">
              <div className="eye-newton-title">Newton's Prism Experiments</div>
              <div className="eye-newton-body">
                Newton was the <strong>first person to obtain the spectrum of sunlight</strong> using a glass prism. He tried splitting the spectrum further with a second prism — but no new colours appeared.<br/><br/>
                In the landmark experiment, he placed a second prism <strong>inverted</strong> with respect to the first and passed the VIBGYOR spectrum through it. <strong>White light emerged</strong> from the other side — proving that white light is a mixture of all seven colours, and that the colours of the spectrum are not added by the prism but are already present in sunlight.<br/><br/>
                <strong>Conclusion:</strong> The sun is made up of seven visible colours — VIBGYOR.
              </div>
            </div>
          </div>

          {/* Rainbow */}
          <div className="eye-alert amber" style={{display:"flex",gap:"12px",alignItems:"flex-start"}}>
            <span style={{flexShrink:0,marginTop:"1px"}}><Icon id="rainbow" size={18} color="#d97706"/></span>
            <span><strong>Rainbow Formation:</strong> Water droplets in the atmosphere act as tiny prisms. Light undergoes <strong>refraction + dispersion</strong> (at entry point A), then <strong>total internal reflection</strong> (at point B inside droplet), then <strong>refraction + dispersion again</strong> (at exit point C). Rainbow always forms in the direction <strong>opposite to the sun</strong>. Red is at the top, violet at the bottom.</span>
          </div>

          {/* ════ SECTION 5: ATMOSPHERIC REFRACTION ════ */}
          <div className="eye-ch-divider">
            <div className="eye-ch-badge"><span className="eye-ch-num">05</span><span className="eye-ch-text">Atmospheric Refraction</span></div>
          </div>

          <div className="eye-sec-head">
            <span className="eye-sec-num">5</span>
            <div className="eye-sec-kicker">Light in Earth's Atmosphere</div>
            <h2 className="eye-sec-title">Atmospheric Refraction <span>&amp; Its Effects</span></h2>
          </div>

          <p className="eye-body-text">
            The atmosphere has layers with <strong>varying temperature, density, and refractive index</strong>. As light passes through these layers it undergoes continuous refraction. This gives rise to several fascinating natural phenomena.
          </p>

          <div className="eye-atm-list">
            {[
              {iconId:"star",    iconColor:"#fcd34d", bg:"#fffbeb", name:"Apparent Position of Stars", desc:<>Stars appear <strong>higher than their actual position</strong>. As starlight enters Earth's atmosphere (denser medium), it continuously bends towards the normal. The observer traces the ray back in a straight line to find an apparent position that is higher than actual.</>},
              {iconId:"sparkle", iconColor:"#7dd3fc", bg:"#e0f2fe", name:"Twinkling of Stars",          desc:<>Stars are <strong>point sources of light</strong> at enormous distances. The atmosphere keeps changing — so the apparent position shifts and the amount of light entering the eye fluctuates. This fluctuation appears as <strong>twinkling</strong>. <strong>Planets don't twinkle</strong> — they're closer and appear as extended sources, so fluctuations cancel out.</>},
              {iconId:"sunrise", iconColor:"#f97316", bg:"#fff7ed", name:"Advance Sunrise & Delayed Sunset", desc:<>Due to atmospheric refraction, the sun is visible <strong>about 2 minutes before actual sunrise</strong> and <strong>about 2 minutes after actual sunset</strong>. The sun's light bends around Earth's curvature through refraction, making it visible before it's geometrically above the horizon.</>},
            ].map(a => (
              <div className="eye-atm-item" key={a.name}>
                <div className="eye-atm-icon-col" style={{background:a.bg}}>
                  <Icon id={a.iconId} size={22} color={a.iconColor}/>
                </div>
                <div className="eye-atm-content">
                  <div className="eye-atm-name">{a.name}</div>
                  <div className="eye-atm-desc">{a.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ════ SECTION 6: SCATTERING ════ */}
          <div className="eye-ch-divider">
            <div className="eye-ch-badge"><span className="eye-ch-num">06</span><span className="eye-ch-text">Scattering of Light</span></div>
          </div>

          <div className="eye-sec-head">
            <span className="eye-sec-num">6</span>
            <div className="eye-sec-kicker">Tyndall Effect &amp; Rayleigh Scattering</div>
            <h2 className="eye-sec-title">Why the Sky is Blue <span>&amp; the Sun Turns Red</span></h2>
          </div>

          <p className="eye-body-text">
            When a beam of light strikes minute particles suspended in the atmosphere (dust, smoke, water droplets), <strong>Tyndall Effect</strong> occurs — the path of the beam becomes visible. The colour of scattered light depends on the size of the scattering particles. <strong>Rayleigh scattering</strong> tells us: scattering ∝ 1/λ⁴ — shorter wavelengths scatter far more than longer ones.
          </p>

          <div className="eye-scatter-cards">
            {[
              {iconId:"sky",     bg:"#dbeafe", ic:"#1d4ed8", title:"Blue Sky",              desc:"Molecules of air and fine particles are smaller than the wavelength of visible light. Blue light (shorter wavelength) scatters far more than red. Scattered blue light reaches our eyes from all directions → sky appears blue.", reason:"Rayleigh scattering: blue λ shorter → scatters ~5.5× more than red"},
              {iconId:"sunrise", bg:"#fff7ed", ic:"#c2410c", title:"Red Sunrise & Sunset",  desc:"Sun is near the horizon — sunlight travels a much longer path through the atmosphere. Most blue light scatters away. Only longer wavelength red/orange reaches our eyes → sun appears red.", reason:"Blue light scattered away over long path; red light (longer λ) survives"},
              {iconId:"sky",     bg:"#f8fafc", ic:"#64748b", title:"White Clouds",           desc:"Water droplets forming clouds are much larger than wavelengths of visible light. They scatter all wavelengths almost equally → all colours combine → clouds appear white (grey when thick).", reason:"Large particle size → uniform scattering of all wavelengths"},
              {iconId:"sun",     bg:"#fefce8", ic:"#ca8a04", title:"White Sun at Noon",      desc:"Sun is overhead — sunlight travels the shortest path through atmosphere. Very little blue is scattered. Almost all colours reach our eyes together → sun appears white.", reason:"Short atmospheric path → minimal scattering of any colour"},
              {iconId:"signal",  bg:"#fef2f2", ic:"#dc2626", title:"Red Danger Signals",     desc:"Red has the longest wavelength in visible spectrum. It scatters the least when striking small particles (fog, smoke). Visible clearly even at large distances → used in traffic signals.", reason:"Maximum wavelength → minimum scattering → maximum range"},
              {iconId:"tree",    bg:"#f0fdf4", ic:"#15803d", title:"Tyndall Effect in Forest",desc:"Sunlight passing through a canopy of dense forest becomes visible as a cone of light. Dust particles and water droplets scatter light laterally, making the beam path visible.", reason:"Colloidal particles scatter light → path becomes visible (Tyndall)"},
            ].map(c => (
              <div className="eye-sc-card" key={c.title}>
                <div className="eye-sc-icon" style={{background:c.bg}}><Icon id={c.iconId} size={20} color={c.ic}/></div>
                <div className="eye-sc-title">{c.title}</div>
                <div className="eye-sc-desc">{c.desc}</div>
                <div className="eye-sc-reason">{c.reason}</div>
              </div>
            ))}
          </div>

          <div className="eye-alert sky" style={{display:"flex",gap:"12px",alignItems:"flex-start"}}>
            <span style={{flexShrink:0,marginTop:"1px"}}><Icon id="telescope" size={18} color="#0284c7"/></span>
            <span><strong>No Atmosphere = Dark Sky:</strong> If Earth had no atmosphere, there would be no scattering of light at all. The sky would appear <strong>completely dark/black</strong> even during daytime — exactly as it appears to astronauts in space.</span>
          </div>

          <div className="eye-pull-quote">
            <p>"The blue of the sky, the red of the setting sun, the silver of the stars, the arc of the rainbow — all are written in a single law: light scatters, bends, and splits differently at every wavelength. The whole colourful world is just physics, painted in frequencies."</p>
          </div>

          {/* ══ FAQ ══ */}
          <div className="eye-divider"><div className="eye-divider-mark"/></div>
          <div className="eye-faq-header"><span className="eye-faq-kicker">Exam Preparation</span></div>
          <h2 className="eye-faq-title">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div className={`eye-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="eye-faq-q" onClick={() => toggle(i)}>
                <span className="eye-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="eye-faq-icon">{openIndex === i ? "▴" : "▾"}</span>
              </button>
              <div className={`eye-faq-ans${openIndex === i ? " visible" : ""}`}>
                <div className="eye-faq-ans-inner">{faq.a}</div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
