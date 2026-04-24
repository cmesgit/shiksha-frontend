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
    tree:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L8 6h3v5H6l4 5h-2l4 5 4-5h-2l4-5h-5V6h3z"/></svg>,
    droplet:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
    recycle:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 19H4a1 1 0 0 1-.87-1.5L5 14"/><path d="M5 14l-.5 4"/><path d="M17 5h3a1 1 0 0 1 .87 1.5L19 10"/><path d="M19 10l.5-4"/><path d="M12 19l-2.5-4h5L12 19z"/><path d="M12 5l2.5 4h-5L12 5z"/></svg>,
    leaf:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1 1.52.5 7.3-4 11.3-2.5 2.2-5 3.2-8.5 4"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
    mountain:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3l4 8 5-5 5 15H2L8 3z"/></svg>,
    shield:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    users:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    person:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    factory:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M2 20V8l5 3V8l5 3V8l5 3V20"/><path d="M17 20V6"/></svg>,
    building:  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="9" y2="6"/><line x1="15" y1="6" x2="15" y2="6"/><line x1="9" y1="10" x2="9" y2="10"/><line x1="15" y1="10" x2="15" y2="10"/><line x1="9" y1="14" x2="9" y2="14"/></svg>,
    flame:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
    check:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    cross:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    warn:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    info:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    award:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
    minus:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    refresh:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></svg>,
  };
  return icons[id] || null;
};

const styles = `
  :root {
    --teal:      #0d9488;
    --teal2:     #115e59;
    --teal3:     #042f2e;
    --teal-lt:   #ccfbf1;
    --teal-mid:  #5eead4;
    --sky:       #0284c7;
    --sky-lt:    #e0f2fe;
    --sky-mid:   #7dd3fc;
    --amber:     #d97706;
    --amber-lt:  #fef3c7;
    --amber-mid: #fcd34d;
    --forest:    #166534;
    --forest-lt: #dcfce7;
    --forest-mid:#86efac;
    --rose:      #be123c;
    --rose-lt:   #ffe4e6;
    --slate:     #475569;
    --paper:     #f0fdfa;
    --paper2:    #ccfbf1;
    --ink:       #042f2e;
    --ink2:      #0f3e3b;
    --muted:     #64748b;
    --rule:      #99f6e4;
    --white:     #ffffff;
  }
  * { box-sizing:border-box; margin:0; padding:0; }
  .mnr-root { font-family:'Inter',sans-serif; background:var(--paper); color:var(--ink); min-height:100vh; }

  /* ═══ HERO ═══ */
  .mnr-hero {
    background:linear-gradient(160deg,#022c28 0%,#042f2e 50%,#064e4a 100%);
    min-height:100vh; position:relative; overflow:hidden;
    display:flex; flex-direction:column; justify-content:center;
    padding:80px 0 72px;
  }
  .mnr-hero::before {
    content:''; position:absolute; top:0; left:0; right:0; height:5px;
    background:linear-gradient(90deg,#0d9488 0%,#059669 20%,#0284c7 40%,#d97706 60%,#be123c 80%,#0d9488 100%);
  }
  .mnr-glow-1 { position:absolute; top:-8%; left:6%; width:540px; height:540px; border-radius:50%; background:radial-gradient(circle,rgba(13,148,136,0.18) 0%,transparent 65%); pointer-events:none; }
  .mnr-glow-2 { position:absolute; bottom:0; right:2%; width:440px; height:440px; border-radius:50%; background:radial-gradient(circle,rgba(5,150,105,0.12) 0%,transparent 65%); pointer-events:none; }
  .mnr-glow-3 { position:absolute; top:38%; right:26%; width:300px; height:300px; border-radius:50%; background:radial-gradient(circle,rgba(2,132,199,0.08) 0%,transparent 65%); pointer-events:none; }

  .mnr-hero-svg { position:absolute; right:0; top:0; width:48%; height:100%; pointer-events:none; opacity:0.22; }

  .mnr-hero-inner { max-width:960px; width:100%; margin:0 auto; padding:0 40px; position:relative; z-index:2; }

  .mnr-subject-pill {
    display:inline-flex; align-items:center; gap:8px;
    border:1px solid rgba(13,148,136,0.45); background:rgba(13,148,136,0.12);
    border-radius:6px; padding:6px 16px; margin-bottom:28px;
    font-family:'Poppins',sans-serif; font-size:11px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; color:var(--teal-mid);
  }
  .mnr-pill-dot { width:6px; height:6px; border-radius:50%; background:var(--teal-mid); animation:mnr-pulse 2s infinite; }
  @keyframes mnr-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }

  .mnr-hero-eyebrow { font-family:'Poppins',sans-serif; font-size:11px; font-weight:600; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:14px; }
  .mnr-hero-title {
    font-family:'Montserrat',sans-serif; font-weight:900;
    font-size:clamp(38px,6vw,72px); line-height:1.0;
    letter-spacing:-0.02em; color:#fff; margin-bottom:10px;
  }
  .mnr-hero-title .t1 { display:block; }
  .mnr-hero-title .t2 { display:block; color:var(--teal-mid); font-style:italic; }
  .mnr-hero-title .t3 { display:block; color:rgba(255,255,255,0.85); }

  .mnr-hero-desc { font-size:16px; color:rgba(255,255,255,0.5); line-height:1.85; max-width:540px; margin:22px 0 40px; }

  .mnr-hero-stats { display:flex; gap:0; border:1px solid rgba(255,255,255,0.08); border-radius:10px; overflow:hidden; width:fit-content; flex-wrap:wrap; }
  .mnr-hero-stat { padding:14px 26px; border-right:1px solid rgba(255,255,255,0.08); }
  .mnr-hero-stat:last-child { border-right:none; }
  .mnr-stat-num   { font-family:'Montserrat',sans-serif; font-size:22px; font-weight:800; color:var(--teal-mid); line-height:1; margin-bottom:4px; }
  .mnr-stat-label { font-size:11px; color:rgba(255,255,255,0.35); font-weight:500; letter-spacing:0.05em; font-family:'Poppins',sans-serif; }

  /* ═══ BODY ═══ */
  .mnr-body { max-width:920px; margin:0 auto; padding:80px 32px 100px; }

  /* ═══ INTRO (Ch13 pattern: 3fr + 2fr dark sidebar) ═══ */
  .mnr-intro { display:grid; grid-template-columns:3fr 2fr; gap:40px; margin-bottom:72px; align-items:start; }
  @media(max-width:640px){ .mnr-intro{grid-template-columns:1fr;} }
  .mnr-intro-kicker { font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:var(--teal2); margin-bottom:12px; display:flex; align-items:center; gap:10px; }
  .mnr-intro-kicker::after { content:''; width:44px; height:1px; background:var(--teal-mid); }
  .mnr-intro-headline { font-family:'Montserrat',sans-serif; font-size:clamp(20px,3vw,28px); font-weight:800; color:var(--ink); line-height:1.2; margin-bottom:16px; }
  .mnr-intro-headline em { font-style:italic; color:var(--teal2); }
  .mnr-intro-body-text { font-size:15.5px; line-height:1.85; color:var(--ink2); margin-bottom:14px; }
  .mnr-intro-body-text strong { color:var(--teal3); font-weight:600; }
  .mnr-intro-sidebar { background:linear-gradient(160deg,#022c28,#064e4a); border-radius:14px; padding:26px 22px; position:relative; overflow:hidden; }
  .mnr-intro-sidebar::before { content:''; position:absolute; top:-20px; right:-20px; width:100px; height:100px; border-radius:50%; background:rgba(13,148,136,0.14); }
  .mnr-sidebar-label { font-family:'Poppins',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(94,234,212,0.7); margin-bottom:12px; }
  .mnr-sidebar-title-lg { font-family:'Montserrat',sans-serif; font-size:17px; font-weight:800; color:#fff; margin-bottom:14px; line-height:1.3; }
  .mnr-sidebar-list-ul { list-style:none; padding:0; }
  .mnr-sidebar-item-li { display:flex; align-items:center; gap:10px; padding:7px 0; border-bottom:1px solid rgba(255,255,255,0.07); font-size:13px; color:rgba(255,255,255,0.72); }
  .mnr-sidebar-item-li:last-child { border-bottom:none; }
  .mnr-sidebar-num-lg { font-family:'Montserrat',sans-serif; font-size:19px; font-weight:800; color:var(--teal-mid); flex-shrink:0; width:24px; line-height:1; }

  /* ═══ CHAPTER DIVIDER BADGE ═══ */
  .mnr-ch-divider { display:flex; align-items:center; gap:12px; margin:64px 0 48px; }
  .mnr-ch-divider::before, .mnr-ch-divider::after { content:''; flex:1; height:1px; background:var(--rule); min-width:12px; }
  .mnr-ch-badge {
    display:inline-flex; align-items:center; gap:10px;
    background:var(--teal2); border-radius:8px; padding:10px 20px;
    font-family:'Poppins',sans-serif; font-size:12px; font-weight:700;
    letter-spacing:0.1em; text-transform:uppercase; color:#fff;
    flex-shrink:0; max-width:72%;
  }
  .mnr-ch-num { font-family:'Montserrat',sans-serif; font-size:16px; color:var(--teal-mid); font-weight:800; white-space:nowrap; flex-shrink:0; line-height:1; }
  .mnr-ch-text { white-space:normal; word-break:break-word; line-height:1.3; }
  @media(max-width:480px){
    .mnr-ch-divider{margin:48px 0 32px;gap:8px;}
    .mnr-ch-badge{font-size:10px;padding:8px 14px;gap:8px;max-width:76%;}
    .mnr-ch-num{font-size:14px;}
  }

  /* ═══ SECTION HEADER ═══ */
  .mnr-sec-head { margin-bottom:28px; }
  .mnr-sec-num   { font-family:'Montserrat',sans-serif; font-size:80px; font-weight:900; color:var(--teal-lt); line-height:0.85; letter-spacing:-0.04em; display:block; margin-bottom:2px; }
  .mnr-sec-kicker{ font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--teal2); margin-bottom:6px; }
  .mnr-sec-title { font-family:'Montserrat',sans-serif; font-size:clamp(20px,3vw,30px); font-weight:800; color:var(--ink); line-height:1.15; border-bottom:2px solid var(--rule); padding-bottom:16px; }
  .mnr-sec-title span { color:var(--teal2); font-style:italic; }

  /* ═══ BODY TEXT ═══ */
  .mnr-body-text { font-size:15.5px; line-height:1.85; color:var(--ink2); margin-bottom:24px; }
  .mnr-body-text p { margin-bottom:14px; }
  .mnr-body-text strong { color:var(--teal3); font-weight:600; }

  /* ═══ GANGA DATA TABLE ═══ */
  .mnr-ganga-wrap {
    background:var(--white); border:1.5px solid var(--rule); border-radius:14px;
    overflow:hidden; margin:28px 0;
    box-shadow:0 8px 24px -14px rgba(13,148,136,0.18);
  }
  .mnr-ganga-hdr {
    background:linear-gradient(90deg,#022c28 0%,#115e59 100%);
    padding:22px 26px; color:#fff;
  }
  .mnr-ganga-hdr-title { font-family:'Montserrat',sans-serif; font-size:17px; font-weight:800; margin-bottom:4px; }
  .mnr-ganga-hdr-sub { font-family:'Poppins',sans-serif; font-size:11px; color:var(--teal-mid); letter-spacing:0.1em; text-transform:uppercase; font-weight:600; }
  .mnr-ganga-body { padding:20px 26px; }
  .mnr-ganga-row {
    display:grid; grid-template-columns:200px 1fr 120px;
    gap:16px; align-items:center; padding:14px 0;
    border-bottom:1px dashed var(--rule);
  }
  .mnr-ganga-row:last-child { border-bottom:none; }
  .mnr-ganga-row.desired { background:var(--teal-lt); margin:0 -26px; padding:14px 26px; border-radius:8px; border-bottom:none; }
  .mnr-ganga-row.danger  { background:#fee2e2; margin:0 -26px; padding:14px 26px; border-radius:8px; border-bottom:none; }
  .mnr-ganga-label { font-family:'Poppins',sans-serif; font-size:14px; font-weight:600; color:var(--ink); }
  .mnr-ganga-bar-bg { height:14px; background:var(--paper2); border-radius:8px; overflow:hidden; position:relative; }
  .mnr-ganga-bar {
    height:100%; background:linear-gradient(90deg,var(--teal) 0%,var(--teal2) 100%);
    border-radius:8px;
  }
  .mnr-ganga-bar.danger { background:linear-gradient(90deg,#dc2626 0%,#7f1d1d 100%); }
  .mnr-ganga-bar.desired{ background:linear-gradient(90deg,#059669 0%,#065f46 100%); }
  .mnr-ganga-val { font-family:'Montserrat',sans-serif; font-size:14px; font-weight:800; color:var(--teal3); text-align:right; }
  .mnr-ganga-val.danger { color:#7f1d1d; }
  .mnr-ganga-val.desired{ color:#065f46; }
  .mnr-ganga-foot {
    font-family:'Inter',sans-serif; font-size:12px; color:var(--muted); font-style:italic;
    padding:12px 26px 18px; border-top:1px solid var(--rule);
  }
  @media(max-width:600px){ .mnr-ganga-row{grid-template-columns:1fr;} }

  /* ═══ HERO CARDS (Amrita / Chipko) ═══ */
  .mnr-hero-card {
    display:grid; grid-template-columns:auto 1fr; gap:0;
    border:1.5px solid var(--rule); border-radius:14px; overflow:hidden; margin-bottom:20px;
  }
  .mnr-hc-left {
    background:linear-gradient(160deg,#022c28,#064e4a);
    padding:28px 22px; width:180px;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    text-align:center; gap:10px; flex-shrink:0;
  }
  .mnr-hc-icon {
    display:flex; align-items:center; justify-content:center;
    width:54px; height:54px; border-radius:14px; background:rgba(13,148,136,0.22);
  }
  .mnr-hc-name { font-family:'Montserrat',sans-serif; font-size:13px; font-weight:800; color:#fff; line-height:1.25; }
  .mnr-hc-era  { font-size:11px; color:rgba(255,255,255,0.45); font-family:'Inter',sans-serif; }
  .mnr-hc-right { background:var(--white); padding:24px 28px; }
  .mnr-hc-title { font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:var(--teal2); margin-bottom:10px; }
  .mnr-hc-body  { font-size:14px; color:var(--ink2); line-height:1.75; }
  .mnr-hc-body strong { color:var(--teal3); font-weight:600; }
  @media(max-width:560px){.mnr-hero-card{grid-template-columns:1fr;}.mnr-hc-left{width:100%;padding:20px;flex-direction:row;gap:16px;}}

  /* ═══ 3 Rs ═══ */
  .mnr-3r-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin:32px 0; }
  @media(max-width:780px){.mnr-3r-grid{grid-template-columns:1fr;}}
  .mnr-3r-card {
    background:var(--white); border:1.5px solid var(--rule); border-radius:14px;
    padding:28px 24px; position:relative; overflow:hidden;
  }
  .mnr-3r-card::before {
    content:''; position:absolute; top:0; left:0; width:40px; height:4px;
    background:var(--teal); border-radius:0 0 4px 0;
  }
  .mnr-3r-card.alt1::before { background:var(--sky); }
  .mnr-3r-card.alt2::before { background:var(--amber); }
  .mnr-3r-icon {
    width:52px; height:52px; border-radius:12px;
    background:var(--teal-lt); color:var(--teal2);
    display:flex; align-items:center; justify-content:center;
    margin-bottom:16px;
  }
  .mnr-3r-card.alt1 .mnr-3r-icon { background:var(--sky-lt); color:#0369a1; }
  .mnr-3r-card.alt2 .mnr-3r-icon { background:var(--amber-lt); color:#92400e; }
  .mnr-3r-name { font-family:'Montserrat',sans-serif; font-size:22px; font-weight:900; color:var(--ink); margin-bottom:8px; letter-spacing:-0.01em; }
  .mnr-3r-desc { font-family:'Inter',sans-serif; font-size:14px; color:var(--ink2); line-height:1.65; }
  .mnr-3r-tag { display:inline-block; margin-top:12px; padding:3px 10px; border-radius:20px; background:var(--teal-lt); color:var(--teal2); font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; }
  .mnr-3r-card.alt1 .mnr-3r-tag { background:var(--sky-lt); color:#0369a1; }
  .mnr-3r-card.alt2 .mnr-3r-tag { background:var(--amber-lt); color:#92400e; }

  /* ═══ PULL QUOTE ═══ */
  .mnr-pull-quote {
    background:linear-gradient(160deg,var(--teal-lt) 0%,#fff 100%);
    border-left:4px solid var(--teal); border-radius:0 12px 12px 0;
    padding:24px 30px; margin:28px 0;
    font-family:'Montserrat',sans-serif; font-size:17px; font-weight:700;
    font-style:italic; color:var(--teal3); line-height:1.5; letter-spacing:-0.01em;
  }

  /* ═══ STAKEHOLDERS — wheel ═══ */
  .mnr-stake-block { margin:32px 0; }
  .mnr-stake-intro {
    background:var(--paper2); border-left:3px solid var(--teal);
    padding:18px 24px; border-radius:0 10px 10px 0;
    font-size:14.5px; color:var(--ink2); line-height:1.7; margin-bottom:24px;
  }
  .mnr-stake-intro strong { color:var(--teal3); }
  .mnr-stake-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
  @media(max-width:780px){.mnr-stake-grid{grid-template-columns:repeat(2,1fr);}}
  @media(max-width:440px){.mnr-stake-grid{grid-template-columns:1fr;}}
  .mnr-stake-card {
    background:var(--white); border:1.5px solid var(--rule); border-radius:12px;
    padding:20px 18px; display:flex; flex-direction:column; gap:8px;
  }
  .mnr-stake-icon {
    width:42px; height:42px; border-radius:10px;
    background:var(--teal-lt); color:var(--teal2);
    display:flex; align-items:center; justify-content:center;
    margin-bottom:4px;
  }
  .mnr-stake-num { font-family:'Montserrat',sans-serif; font-size:11px; font-weight:800; color:var(--teal); letter-spacing:0.1em; }
  .mnr-stake-name { font-family:'Montserrat',sans-serif; font-size:15px; font-weight:800; color:var(--ink); letter-spacing:-0.01em; }
  .mnr-stake-desc { font-family:'Inter',sans-serif; font-size:12.5px; color:var(--ink2); line-height:1.55; }

  /* ═══ CONTRAST BLOCK (Dams pros/cons) ═══ */
  .mnr-contrast {
    display:grid; grid-template-columns:1fr 1fr; gap:0; margin:28px 0;
    background:var(--white); border:1.5px solid var(--rule); border-radius:14px; overflow:hidden;
  }
  @media(max-width:720px){.mnr-contrast{grid-template-columns:1fr;}}
  .mnr-con-col { padding:28px 26px; }
  .mnr-con-col + .mnr-con-col { border-left:1.5px solid var(--rule); }
  @media(max-width:720px){.mnr-con-col + .mnr-con-col{border-left:none;border-top:1.5px solid var(--rule);}}
  .mnr-con-hdr { display:flex; align-items:center; gap:10px; margin-bottom:16px; padding-bottom:12px; border-bottom:1px dashed var(--rule); }
  .mnr-con-icon { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#fff; flex-shrink:0; }
  .mnr-con-icon.pro { background:var(--teal); }
  .mnr-con-icon.con { background:var(--rose); }
  .mnr-con-label { font-family:'Montserrat',sans-serif; font-size:16px; font-weight:800; color:var(--ink); letter-spacing:-0.01em; }
  .mnr-con-list { display:flex; flex-direction:column; gap:12px; }
  .mnr-con-item { display:flex; gap:12px; align-items:flex-start; }
  .mnr-con-dot { width:22px; height:22px; min-width:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-family:'Montserrat',sans-serif; font-size:12px; font-weight:800; flex-shrink:0; }
  .mnr-con-dot.pro { background:var(--teal-lt); color:var(--teal2); }
  .mnr-con-dot.con { background:var(--rose-lt); color:#9f1239; }
  .mnr-con-text { font-family:'Inter',sans-serif; font-size:13.5px; color:var(--ink2); line-height:1.55; padding-top:2px; }

  /* ═══ WATER HARVESTING TABLE ═══ */
  .mnr-wh-wrap {
    background:var(--white); border:1.5px solid var(--rule); border-radius:14px;
    overflow:hidden; margin:28px 0;
  }
  .mnr-wh-table { width:100%; border-collapse:collapse; }
  .mnr-wh-table thead tr { background:linear-gradient(90deg,#022c28 0%,#115e59 100%); }
  .mnr-wh-table thead th {
    color:#fff; font-family:'Poppins',sans-serif; font-size:11px; font-weight:700;
    letter-spacing:0.14em; text-transform:uppercase; padding:16px 20px; text-align:left;
  }
  .mnr-wh-table tbody tr { border-bottom:1px solid var(--rule); transition:none; }
  .mnr-wh-table tbody tr:last-child { border-bottom:none; }
  .mnr-wh-table tbody tr:nth-child(odd) { background:var(--paper); }
  .mnr-wh-table tbody td { padding:14px 20px; font-family:'Inter',sans-serif; font-size:13.5px; color:var(--ink2); }
  .mnr-wh-method { font-family:'Montserrat',sans-serif; font-weight:800; color:var(--teal3); font-size:14px; }
  .mnr-wh-state  { color:var(--muted); font-size:13px; }

  /* ═══ KHADIN DIAGRAM WRAPPER ═══ */
  .mnr-diagram-wrap {
    background:linear-gradient(160deg,#022c28 0%,#042f2e 100%);
    border-radius:14px; padding:28px 24px 20px; margin:28px 0;
    display:flex; flex-direction:column; align-items:center;
  }
  .mnr-diagram-title { font-family:'Poppins',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(94,234,212,0.7); margin-bottom:18px; }
  .mnr-diagram-caption { font-family:'Inter',sans-serif; font-size:12.5px; color:rgba(255,255,255,0.55); margin-top:14px; text-align:center; font-style:italic; max-width:480px; }

  /* ═══ ADVANTAGES LIST (Khadin) ═══ */
  .mnr-adv-list { display:flex; flex-direction:column; gap:10px; margin:20px 0; }
  .mnr-adv-item {
    display:grid; grid-template-columns:30px 1fr; gap:14px; align-items:center;
    background:var(--white); border:1px solid var(--rule); border-radius:10px;
    padding:14px 18px;
  }
  .mnr-adv-check {
    width:26px; height:26px; border-radius:50%; background:var(--teal-lt);
    color:var(--teal2); display:flex; align-items:center; justify-content:center;
  }
  .mnr-adv-text { font-family:'Inter',sans-serif; font-size:14px; color:var(--ink2); line-height:1.55; }
  .mnr-adv-text strong { color:var(--teal3); font-weight:600; }

  /* ═══ FOSSIL FUEL LIFESPAN BARS ═══ */
  .mnr-fuel-wrap {
    background:var(--white); border:1.5px solid var(--rule); border-radius:14px;
    padding:28px 28px; margin:28px 0;
    box-shadow:0 6px 20px -14px rgba(13,148,136,0.18);
  }
  .mnr-fuel-hdr { font-family:'Poppins',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--teal2); margin-bottom:6px; }
  .mnr-fuel-title { font-family:'Montserrat',sans-serif; font-size:18px; font-weight:800; color:var(--ink); margin-bottom:22px; letter-spacing:-0.01em; }
  .mnr-fuel-row { margin-bottom:18px; }
  .mnr-fuel-row:last-child { margin-bottom:0; }
  .mnr-fuel-label-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
  .mnr-fuel-name { font-family:'Montserrat',sans-serif; font-size:15px; font-weight:800; color:var(--ink); }
  .mnr-fuel-years { font-family:'Montserrat',sans-serif; font-size:16px; font-weight:900; color:var(--teal2); }
  .mnr-fuel-bar-bg { height:20px; background:var(--paper2); border-radius:10px; overflow:hidden; position:relative; border:1px solid var(--rule); }
  .mnr-fuel-bar { height:100%; border-radius:10px; display:flex; align-items:center; padding-left:12px; color:#fff; font-family:'Poppins',sans-serif; font-size:10.5px; font-weight:700; letter-spacing:0.08em; }
  .mnr-fuel-bar.coal { background:linear-gradient(90deg,#1f2937 0%,#111827 100%); width:100%; }
  .mnr-fuel-bar.petro { background:linear-gradient(90deg,#b45309 0%,#78350f 100%); width:20%; }
  .mnr-fuel-note { font-family:'Inter',sans-serif; font-size:12.5px; color:var(--muted); font-style:italic; margin-top:16px; padding-top:14px; border-top:1px dashed var(--rule); }

  /* ═══ ALERT BOX ═══ */
  .mnr-alert {
    background:var(--amber-lt); border:1px solid var(--amber-mid); border-left:3px solid var(--amber);
    border-radius:10px; padding:18px 22px; margin:20px 0;
    display:grid; grid-template-columns:24px 1fr; gap:14px; align-items:flex-start;
  }
  .mnr-alert-icon { color:var(--amber); padding-top:2px; }
  .mnr-alert-text { font-family:'Inter',sans-serif; font-size:14px; color:var(--ink2); line-height:1.65; }
  .mnr-alert-text strong { color:#92400e; font-weight:600; }

  .mnr-alert.teal {
    background:var(--teal-lt); border:1px solid var(--teal-mid); border-left:3px solid var(--teal);
  }
  .mnr-alert.teal .mnr-alert-icon { color:var(--teal2); }
  .mnr-alert.teal .mnr-alert-text strong { color:var(--teal3); }

  /* ═══ CONSERVATION TIPS ═══ */
  .mnr-tips-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:14px; margin:24px 0; }
  @media(max-width:640px){.mnr-tips-grid{grid-template-columns:1fr;}}
  .mnr-tip-card {
    display:grid; grid-template-columns:40px 1fr; gap:14px;
    background:var(--white); border:1px solid var(--rule); border-radius:10px;
    padding:16px 18px; align-items:center;
  }
  .mnr-tip-icon {
    width:36px; height:36px; border-radius:10px; background:var(--teal-lt); color:var(--teal2);
    display:flex; align-items:center; justify-content:center;
  }
  .mnr-tip-text { font-family:'Inter',sans-serif; font-size:13.5px; color:var(--ink2); line-height:1.55; }
  .mnr-tip-text strong { color:var(--teal3); font-weight:600; }

  /* ═══ FAQ ═══ */
  .mnr-faq-wrap { max-width:960px; margin:0 auto; padding:48px 32px 96px; }
  .mnr-faq-kicker { font-family:'Poppins',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:var(--teal2); margin-bottom:8px; }
  .mnr-faq-title { font-family:'Montserrat',sans-serif; font-size:clamp(28px,4vw,42px); font-weight:900; color:var(--ink); letter-spacing:-0.02em; margin-bottom:36px; line-height:1.1; }
  .mnr-faq-title span { color:var(--teal2); font-style:italic; }
  .mnr-faq-q { background:var(--white); border:1px solid var(--rule); border-radius:12px; margin-bottom:12px; overflow:hidden; }
  .mnr-faq-header {
    width:100%; display:grid; grid-template-columns:1fr 24px; gap:16px; align-items:center;
    padding:20px 26px; cursor:pointer; border:none; background:transparent;
    text-align:left; font-family:'Poppins',sans-serif; font-size:15.5px; font-weight:600;
    color:var(--ink); line-height:1.45;
  }
  .mnr-faq-header:hover { background:var(--paper); }
  .mnr-faq-icon { font-family:'Inter',sans-serif; font-size:18px; color:var(--teal); font-weight:700; display:flex; align-items:center; justify-content:center; width:24px; height:24px; }
  .mnr-faq-ans-inner {
    padding:0 26px 22px; font-family:'Inter',sans-serif; font-size:14.5px;
    color:var(--ink2); line-height:1.78; border-top:1px dashed var(--rule); padding-top:18px;
  }
  .mnr-faq-ans-inner strong { color:var(--teal3); font-weight:600; }
  .mnr-faq-ans-inner em { color:var(--teal2); font-style:italic; font-weight:500; }

  @media(max-width:640px){
    .mnr-hero-inner{padding:0 20px;}
    .mnr-body{padding:40px 16px 80px;}
    .mnr-hero-title{font-size:clamp(32px,10vw,50px);}
    .mnr-hero-stats{width:100%;}
    .mnr-hero-stat{padding:12px 18px;}
  }
`;

/* ═══════════════════════════════════════════
   FAQ DATA (all PDF questions covered)
═══════════════════════════════════════════ */
const faqData = [
  {
    q: "Why is it necessary to conserve our environment?",
    a: <>The environment provides us with all the <strong>natural resources</strong> — soil, air, water, forests, minerals, wildlife, coal and petroleum — that humans depend on for survival. <em>Conservation</em> ensures these resources remain available for future generations, maintains <strong>ecological balance</strong>, protects biodiversity, and prevents long-term damage like climate change, pollution, and loss of species. Without conservation, short-term gains would destroy the very systems that sustain life on Earth.</>
  },
  {
    q: "Define sustainable development.",
    a: <><strong>Sustainable development</strong> is the use of resources wisely to meet the needs of the <em>present generation</em> without compromising the ability of <em>future generations</em> to meet their own needs. It balances three goals: <strong>economic growth, environmental protection, and social equity</strong>. In the context of natural resources, it means managing forests, water, coal, and petroleum in ways that don't exhaust them or damage the ecosystem.</>
  },
  {
    q: "Name any two exhaustible resources.",
    a: <>Two exhaustible (non-renewable) resources are <strong>coal</strong> and <strong>petroleum</strong>. Both are fossil fuels formed from the disintegration of biomass over millions of years. At current rates of consumption, <em>petroleum is expected to last around 40 years</em> and <em>coal around 200 years</em> — hence the urgency to use them judiciously and develop renewable alternatives.</>
  },
  {
    q: "What is the most conducive pH range for the life of fresh water plants?",
    a: <>The most conducive pH range for fresh water plants and aquatic life is <strong>pH 6.5 to 7.5</strong> — slightly acidic to neutral. Significant deviation from this range — caused by industrial effluents, acid rain, or agricultural runoff — disrupts aquatic ecosystems and can kill fish, plants and microorganisms. pH is one of the key indicators used to assess water pollution.</>
  },
  {
    q: "List two advantages of water harvesting.",
    a: <><strong>(i) Recharges groundwater:</strong> Water harvesting structures help replenish underground aquifers, raising the water table and ensuring supply in dry months.<br/><br/><strong>(ii) Prevents wastage and ecological imbalance:</strong> Captured water doesn't run off or evaporate uselessly. In systems like <em>Khadin</em>, the water also provides moisture for vegetation, avoids breeding grounds for mosquitoes, and protects groundwater from human and animal waste.</>
  },
  {
    q: "Why is reuse better than recycle?",
    a: <><strong>Reuse is better than recycle because it saves energy.</strong> When we reuse an item (like a glass jar or plastic container) we simply wash and use it again — no energy is spent on processing. Recycling, on the other hand, requires <em>collection, transportation, cleaning, melting/shredding, and reshaping</em> — all of which consume significant energy and can release pollutants. Reuse also keeps items in circulation longer before they eventually enter the recycling stream.</>
  },
  {
    q: "What are Khadins? Where are they found?",
    a: <><strong>Khadins</strong> are an ancient water-harvesting system found in the arid <strong>Jaisalmer region of Rajasthan</strong>. They consist of an earthen embankment (bund) built across the lower hill slopes to capture rainwater runoff. The water collects behind the bund and slowly seeps into the soil, recharging wells and providing moisture for cultivation.<br/><br/><strong>Advantages:</strong> water doesn't evaporate (seeps underground), recharges wells, provides soil moisture for vegetation, doesn't breed mosquitoes, and protects groundwater from contamination.</>
  },
  {
    q: "List two steps you would take to conserve electricity in your house.",
    a: <><strong>(i) Replace incandescent bulbs with LEDs or CFLs</strong> — these use up to 80% less electricity for the same light output.<br/><br/><strong>(ii) Switch off lights, fans, and appliances when not in use.</strong> Unplug chargers and turn off standby power on TVs and computers.<br/><br/>Additional measures: use <strong>BEE 5-star rated appliances</strong>, take the <strong>stairs instead of the lift</strong>, use <strong>natural daylight</strong>, and set air conditioners at 24–26°C instead of lower temperatures.</>
  },
  {
    q: "Who are called stakeholders?",
    a: <>A <strong>stakeholder</strong> is any person or group that has an <em>interest or concern</em> in a resource and its management. In the context of forests, there are four main stakeholders:<br/><br/><strong>(i) Local people</strong> who live in or near the forest and depend on it for firewood, food, and livelihood;<br/><strong>(ii) The Forest Department</strong> of the Government, which owns and controls forest land;<br/><strong>(iii) Industrialists</strong> who use forest products (wood, resin, bamboo, etc.);<br/><strong>(iv) Wildlife &amp; nature enthusiasts</strong> / conservationists who want to preserve nature.<br/><br/>Successful forest management requires balancing the needs of all four groups.</>
  },
  {
    q: "Name some traditional water harvesting systems in India.",
    a: <>India has a rich heritage of locale-specific water harvesting systems:<br/><br/><strong>Khadin, tanks, nadis</strong> — Rajasthan<br/><strong>Bandharas, tals</strong> — Maharashtra<br/><strong>Bundhis</strong> — Madhya Pradesh and Uttar Pradesh<br/><strong>Pynes, ahars</strong> — Bihar<br/><strong>Kulhs</strong> — Himachal Pradesh<br/><strong>Ponds</strong> — Jammu region<br/><strong>Eris (tanks)</strong> — Tamil Nadu<br/><strong>Bawlis</strong> — Delhi and nearby regions (stepwells)<br/><br/>These techniques were developed over centuries and are <em>locale-specific</em>, designed to prevent mismanagement and over-exploitation.</>
  },
  {
    q: "How is mining a cause of pollution?",
    a: <>Mining causes several kinds of pollution:<br/><br/><strong>(i) Land degradation:</strong> Removes vegetation and topsoil, leaves behind huge pits and spoil heaps that cannot easily be reclaimed.<br/><strong>(ii) Air pollution:</strong> Dust particles from blasting and crushing, plus toxic gases from processing.<br/><strong>(iii) Water pollution:</strong> Acid mine drainage, heavy metals (arsenic, mercury, lead) leach into rivers and groundwater.<br/><strong>(iv) Noise pollution</strong> and disruption of wildlife habitats.<br/><strong>(v) Solid waste:</strong> Slag and tailings pile up as long-term hazards.</>
  },
  {
    q: "Make a list of four forest products that we use.",
    a: <>Four commonly used forest products are:<br/><br/><strong>(i) Timber / wood</strong> — for construction, furniture, paper.<br/><strong>(ii) Firewood &amp; charcoal</strong> — fuel for cooking and heating.<br/><strong>(iii) Resins, gums &amp; latex</strong> — raw materials for industries (turpentine, rubber, varnish).<br/><strong>(iv) Medicinal plants &amp; herbs</strong> — source of Ayurvedic and modern medicines. Others include bamboo, cane, honey, tendu leaves (bidi), and fodder.</>
  },
  {
    q: "How is burning of fossil fuels affecting our environment?",
    a: <>Burning fossil fuels releases several harmful gases:<br/><br/><strong>(i) Carbon dioxide (CO₂):</strong> A greenhouse gas that traps heat in the atmosphere, causing <em>global warming</em> and climate change.<br/><strong>(ii) Sulphur oxides (SO₂)</strong> and <strong>Nitrogen oxides (NOₓ):</strong> Acidic in nature, they dissolve in rainwater to produce <em>acid rain</em>, which damages buildings, soil, forests, and aquatic life.<br/><strong>(iii) Carbon monoxide (CO):</strong> Highly toxic, causes respiratory problems.<br/><strong>(iv) Particulate matter &amp; soot:</strong> Causes air pollution, respiratory diseases, and smog in cities.</>
  },
  {
    q: "Suggest two measures for controlling CO₂ levels in the atmosphere.",
    a: <><strong>(i) Afforestation and reforestation</strong> — planting trees on a large scale. Trees absorb CO₂ during photosynthesis and act as <em>carbon sinks</em>. Protecting existing forests from being cut is equally important.<br/><br/><strong>(ii) Shift to renewable energy</strong> — replace fossil fuel-based electricity with <strong>solar, wind, hydro, and nuclear</strong> power, which emit little to no CO₂. Improving <em>energy efficiency</em> of buildings and vehicles, using public transport, and adopting electric vehicles also reduce CO₂ output.</>
  },
  {
    q: "Why should we conserve forest and wildlife?",
    a: <>Forests and wildlife deserve conservation because:<br/><br/><strong>(i) Biodiversity:</strong> Forests are <em>hotspots of biodiversity</em> — home to countless species of plants, animals, fungi, and microorganisms. Loss of any species disturbs the ecological balance.<br/><strong>(ii) Ecological services:</strong> Forests regulate climate, produce oxygen, absorb CO₂, prevent soil erosion, maintain the water cycle, and support pollination.<br/><strong>(iii) Resources:</strong> Forests provide timber, medicinal plants, food, fodder, and raw materials for industries.<br/><strong>(iv) Cultural &amp; livelihood value:</strong> Many indigenous communities depend on forests for their way of life.</>
  },
  {
    q: "What are three main problems from dams?",
    a: <><strong>(i) Social displacement:</strong> Large numbers of people — often tribal and farming communities — are forcibly displaced from their homes and land, frequently without adequate compensation or rehabilitation.<br/><br/><strong>(ii) Environmental damage:</strong> Construction of big dams causes <em>deforestation</em>, submergence of large forest areas, loss of biological diversity, and disruption of river ecosystems. Fish migration is blocked and downstream flow is altered.<br/><br/><strong>(iii) Economic waste:</strong> Huge amounts of public money are invested, but proportionate benefits often don't reach the people. Water is <em>not distributed equitably</em> — those near the dam get plenty, while farmers far away remain without.</>
  },
  {
    q: "How can you reduce energy consumption at your level?",
    a: <>At a personal level, you can significantly reduce energy consumption through:<br/><br/><strong>(i) Use CFL or LED bulbs</strong> instead of incandescent ones — they use 1/4th the energy for the same light.<br/><strong>(ii) Switch off appliances when not in use</strong> — lights, fans, TV, geyser, chargers. Avoid standby mode.<br/><strong>(iii) Use public transport, cycle, or walk</strong> instead of private vehicles wherever possible — saves petrol and reduces CO₂.<br/><br/>Additional: take stairs instead of the lift, use solar water heaters, air-dry clothes instead of using the dryer, and choose BEE 5-star rated appliances.</>
  },
  {
    q: "Explain the meaning of Reduce, Recycle and Reuse in your own words.",
    a: <><strong>Reduce:</strong> Use <em>less</em> of a resource in the first place — turn off the tap while brushing, take shorter showers, switch off unused lights and fans, avoid buying things you don't need. This is the most powerful of the three.<br/><br/><strong>Reuse:</strong> Use the <em>same item</em> again and again for the same or different purposes before throwing it away — refill water bottles, use jam jars as storage containers, pass down clothes. <em>Reuse saves energy</em> because nothing needs reprocessing.<br/><br/><strong>Recycle:</strong> When something truly can't be reused, <em>segregate</em> the waste (paper, plastic, glass, metal) so it can be reprocessed into new products. Recycling saves raw materials but consumes energy during processing — which is why it ranks third.</>
  },
  {
    q: "What is the main objective of water harvesting techniques? Name 3 ancient water harvesting structures used in India. Mention 3 causes for failure to sustain water availability underground.",
    a: <><strong>Main objective:</strong> To develop <em>primary resources of land and water</em> and produce <em>secondary resources of plants and animals</em> in a manner that does <strong>not cause ecological imbalance</strong>. The goal is to capture rainwater where it falls, recharge groundwater, and ensure year-round availability for agriculture and drinking.<br/><br/><strong>Three ancient structures:</strong> <em>Khadin</em> (Rajasthan), <em>Kulhs</em> (Himachal Pradesh), <em>Bawlis / Stepwells</em> (Delhi region). Others include Pynes in Bihar, Eris in Tamil Nadu, and Bandharas in Maharashtra.<br/><br/><strong>Three causes of failure to sustain groundwater:</strong><br/>(i) <strong>Loss of vegetation cover</strong> — removes the sponge that allows rainfall to seep in.<br/>(ii) <strong>Diversion for high water-demanding crops</strong> (like sugarcane, rice in dry areas) exceeds natural recharge.<br/>(iii) <strong>Industrial and urban pollution</strong> plus <em>less rainfall</em> due to climate change further deplete groundwater.</>
  },
  {
    q: "Discuss the damage caused to forests by (a) building rest houses for tourists, (b) grazing domestic animals, (c) tourists throwing litter in national parks.",
    a: <><strong>(a) Building rest houses:</strong> Requires clearing trees, disturbs wildlife habitats, introduces noise and light pollution, and fragments continuous forest. Construction debris and drainage damage soil. Tourist influx then brings more vehicles and further disturbance.<br/><br/><strong>(b) Grazing domestic animals:</strong> Cattle and goats eat tender shoots, preventing natural regeneration of forest plants. Their hooves compact the soil, reducing water infiltration. They also spread diseases to wild herbivores and compete for the same food — starving native species.<br/><br/><strong>(c) Tourist litter (plastic bottles, wrappers):</strong> Plastic takes centuries to decompose and pollutes the soil and water. Wild animals mistake plastic for food and die from intestinal blockage. Chemicals from plastics leach into the ecosystem. The visual damage also undermines the forest's ecological character.</>
  }
];

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
export default function Chapter16ManagementOfNaturalResources() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <FontLink />
      <style>{styles}</style>

      <div className="mnr-root">

        {/* ══════════ HERO ══════════ */}
        <div className="mnr-hero">
          <div className="mnr-glow-1" />
          <div className="mnr-glow-2" />
          <div className="mnr-glow-3" />

          {/* Watermark: tree + water drops + recycling */}
          <svg className="mnr-hero-svg" viewBox="0 0 500 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            {/* Big tree silhouette */}
            <g transform="translate(250,350)">
              <path d="M0,200 L0,80" stroke="rgba(13,148,136,0.4)" strokeWidth="8" strokeLinecap="round"/>
              <circle cx="0" cy="40" r="80" fill="none" stroke="rgba(13,148,136,0.3)" strokeWidth="2"/>
              <circle cx="-35" cy="20" r="50" fill="none" stroke="rgba(13,148,136,0.25)" strokeWidth="2"/>
              <circle cx="40" cy="30" r="45" fill="none" stroke="rgba(13,148,136,0.25)" strokeWidth="2"/>
              <circle cx="-20" cy="-30" r="35" fill="none" stroke="rgba(13,148,136,0.25)" strokeWidth="2"/>
              <circle cx="25" cy="-25" r="30" fill="none" stroke="rgba(13,148,136,0.25)" strokeWidth="2"/>
            </g>
            {/* Water drops */}
            <g opacity="0.5">
              <path d="M100,150 Q92,135 100,120 Q108,135 100,150z" fill="rgba(94,234,212,0.35)"/>
              <path d="M80,220 Q72,205 80,190 Q88,205 80,220z" fill="rgba(94,234,212,0.3)"/>
              <path d="M420,180 Q412,165 420,150 Q428,165 420,180z" fill="rgba(94,234,212,0.3)"/>
              <path d="M380,100 Q372,85 380,70 Q388,85 380,100z" fill="rgba(94,234,212,0.25)"/>
              <path d="M60,100 Q52,85 60,70 Q68,85 60,100z" fill="rgba(94,234,212,0.25)"/>
            </g>
            {/* Recycling triangle (bottom-right) */}
            <g transform="translate(400,600)" opacity="0.45">
              <path d="M-25,10 L0,-35 L25,10 Z" fill="none" stroke="rgba(94,234,212,0.6)" strokeWidth="2"/>
              <polygon points="-20,8 -15,4 -15,12" fill="rgba(94,234,212,0.7)"/>
              <polygon points="20,8 15,4 15,12" fill="rgba(94,234,212,0.7)"/>
              <polygon points="-2,-30 2,-30 0,-36" fill="rgba(94,234,212,0.7)"/>
            </g>
            {/* Mountain range (left-bottom) */}
            <g opacity="0.35" transform="translate(0,600)">
              <polygon points="0,80 60,20 100,50 150,10 200,60 200,80" fill="none" stroke="rgba(13,148,136,0.5)" strokeWidth="1.5"/>
            </g>
          </svg>

          <div className="mnr-hero-inner">
            <div className="mnr-subject-pill">
              <span className="mnr-pill-dot" />
              Biology · Class X · Science
            </div>
            <div className="mnr-hero-eyebrow">Chapter 16 · NCERT Science</div>
            <h1 className="mnr-hero-title">
              <span className="t1">Management of</span>
              <span className="t2">Natural</span>
              <span className="t3">Resources</span>
            </h1>
            <p className="mnr-hero-desc">
              From the Ganga Action Plan to Chipko Andolan, from Khadin systems in Rajasthan to the 3Rs — how we conserve forests, water, wildlife and fossil fuels for the generations to come.
            </p>
            <div className="mnr-hero-stats">
              {[
                {num:"450", label:"Desired Coliform MPN"},
                {num:"40 yrs", label:"Petroleum Reserves"},
                {num:"200 yrs", label:"Coal Reserves"},
                {num:"1985",   label:"Ganga Action Plan"},
              ].map((s,i) => (
                <div className="mnr-hero-stat" key={i}>
                  <div className="mnr-stat-num">{s.num}</div>
                  <div className="mnr-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════ BODY ══════════ */}
        <div className="mnr-body">

          {/* ══ INTRO 3fr+2fr with dark sidebar ══ */}
          <div className="mnr-intro">
            <div>
              <div className="mnr-intro-kicker">Chapter Overview</div>
              <h2 className="mnr-intro-headline">Using <em>What the Earth Gives Us</em> — Wisely</h2>
              <p className="mnr-intro-body-text">
                Nature gives us <strong>soil, air, water, forests, wildlife, coal and petroleum</strong> — everything we need to survive. But these resources are finite, and humans have consumed them faster than the planet can renew them. <strong>Management of natural resources</strong> is the practice of using these gifts in a way that doesn't exhaust them or damage the ecosystem that produced them.
              </p>
              <p className="mnr-intro-body-text">
                This chapter explores how India manages its natural wealth — through <strong>laws and Acts</strong>, grassroots movements like <strong>Chipko Andolan</strong>, multi-crore projects like the <strong>Ganga Action Plan</strong>, everyday practices like the <strong>3Rs</strong>, and ancient water-harvesting systems like <strong>Khadins, Kulhs and Bawlis</strong>. Conservation is not a single law or machine — it's a way of thinking.
              </p>
            </div>
            <div className="mnr-intro-sidebar">
              <div className="mnr-sidebar-label">Topics Covered</div>
              <div className="mnr-sidebar-title-lg">What You'll Learn</div>
              <ul className="mnr-sidebar-list-ul">
                {[
                  "Natural Resources & Conservation",
                  "Ganga Action Plan (1985)",
                  "Chipko Andolan & Amrita Devi",
                  "3Rs — Reduce, Reuse, Recycle",
                  "Forest Stakeholders",
                  "Water as a Resource",
                  "Dams — Pros & Cons",
                  "Ancient Water Harvesting",
                  "Coal & Petroleum Reserves",
                ].map((t,i) => (
                  <li className="mnr-sidebar-item-li" key={i}>
                    <span className="mnr-sidebar-num-lg">{i+1}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ═══════════ SECTION 1: GANGA ACTION PLAN & CONSERVATION ═══════════ */}
          <div className="mnr-ch-divider">
            <div className="mnr-ch-badge"><span className="mnr-ch-num">01</span><span className="mnr-ch-text">Ganga Action Plan &amp; Conservation Heroes</span></div>
          </div>

          <div className="mnr-sec-head">
            <span className="mnr-sec-num">1</span>
            <div className="mnr-sec-kicker">Cleaning a Holy River</div>
            <h2 className="mnr-sec-title">The Ganga Action Plan <span>&amp; Conservation Movements</span></h2>
          </div>

          <div className="mnr-body-text">
            <p>
              Nature gives us the basic resources — <strong>soil, air, water, forests, wildlife, coal and petroleum</strong>. To protect these, governments and citizens have created <strong>national and international laws and Acts</strong>. One of India's most famous projects is the <strong>Ganga Action Plan</strong>, a multi-crore project launched in <strong>1985</strong> to improve the quality of the river Ganga.
            </p>
            <p>
              A 1993–1994 survey measured <strong>total coliform</strong> — a group of bacteria found in the human intestine, used as an indicator of sewage contamination. Measurements were in <strong>MPN/100 ml</strong> (Most Probable Number per 100 ml of water). The results revealed just how badly polluted the river had become:
            </p>
          </div>

          {/* Ganga data table with visual bars */}
          <div className="mnr-ganga-wrap">
            <div className="mnr-ganga-hdr">
              <div className="mnr-ganga-hdr-title">Ganga Coliform Levels, 1993–94</div>
              <div className="mnr-ganga-hdr-sub">Units: MPN / 100 ml · Lower is cleaner</div>
            </div>
            <div className="mnr-ganga-body">
              <div className="mnr-ganga-row desired">
                <div className="mnr-ganga-label">Minimum desired level</div>
                <div className="mnr-ganga-bar-bg"><div className="mnr-ganga-bar desired" style={{width:"32%"}}></div></div>
                <div className="mnr-ganga-val desired">450</div>
              </div>
              <div className="mnr-ganga-row">
                <div className="mnr-ganga-label">Minimum found in Rishikesh</div>
                <div className="mnr-ganga-bar-bg"><div className="mnr-ganga-bar" style={{width:"46%"}}></div></div>
                <div className="mnr-ganga-val">600–650</div>
              </div>
              <div className="mnr-ganga-row danger">
                <div className="mnr-ganga-label">Maximum found in Kannauj</div>
                <div className="mnr-ganga-bar-bg"><div className="mnr-ganga-bar danger" style={{width:"100%"}}></div></div>
                <div className="mnr-ganga-val danger">1400</div>
              </div>
            </div>
            <div className="mnr-ganga-foot">
              Even at Rishikesh — where the river emerges pristine from the Himalayas — coliform was already above the desired level. By Kannauj, it had tripled. This data launched the first scientific clean-up of the Ganga.
            </div>
          </div>

          {/* Amrita Devi card */}
          <div className="mnr-hero-card">
            <div className="mnr-hc-left">
              <div className="mnr-hc-icon"><Icon id="award" size={26} color="#5eead4"/></div>
              <div className="mnr-hc-name">Amrita Devi Bishnoi</div>
              <div className="mnr-hc-era">18th Century · Rajasthan</div>
            </div>
            <div className="mnr-hc-right">
              <div className="mnr-hc-title">National Award for Wildlife Conservation</div>
              <div className="mnr-hc-body">
                The <strong>Amrita Devi Bishnoi National Award for Wildlife Conservation</strong> honours the memory of Amrita Devi, who along with <strong>363 other villagers</strong> of the Bishnoi community lost her life in <strong>1730</strong> while protecting <em>Khejri trees</em> from being cut in Rajasthan. The villagers hugged the trees and refused to let them fall — the earliest recorded Chipko-like movement, and a founding moment of Indian environmentalism.
              </div>
            </div>
          </div>

          {/* Chipko card */}
          <div className="mnr-hero-card">
            <div className="mnr-hc-left">
              <div className="mnr-hc-icon"><Icon id="tree" size={26} color="#5eead4"/></div>
              <div className="mnr-hc-name">Chipko Andolan</div>
              <div className="mnr-hc-era">Early 1970s · Garhwal</div>
            </div>
            <div className="mnr-hc-right">
              <div className="mnr-hc-title">Grassroot Forest Movement</div>
              <div className="mnr-hc-body">
                <strong>Chipko</strong> (literally "to hug") originated in Garhwal in the <strong>early 1970s</strong> as a grassroot effort to end the <em>alienation of people from their forest</em>. Villagers — mostly women — would hug trees to prevent contractors from felling them. In <strong>1972</strong>, a parallel movement protected the <strong>Sal forests of West Bengal</strong>. These movements established a powerful principle: those who depend on forests should have a say in managing them.
              </div>
            </div>
          </div>

          <div className="mnr-pull-quote">
            "Loss of biodiversity may lead to a loss of ecological stability — an imbalance the Earth cannot easily repair."
          </div>

          {/* ═══════════ SECTION 2: THREE R's ═══════════ */}
          <div className="mnr-ch-divider">
            <div className="mnr-ch-badge"><span className="mnr-ch-num">02</span><span className="mnr-ch-text">The Three R's to Save the Environment</span></div>
          </div>

          <div className="mnr-sec-head">
            <span className="mnr-sec-num">2</span>
            <div className="mnr-sec-kicker">A Simple Rule, Huge Impact</div>
            <h2 className="mnr-sec-title">Reduce, Reuse <span>&amp; Recycle</span></h2>
          </div>

          <div className="mnr-body-text">
            <p>
              The <strong>3 Rs</strong> are the simplest framework for conserving natural resources. They aren't in random order — <strong>Reduce first, Reuse second, Recycle last</strong>, because each step consumes a little more energy than the previous one. Always prefer the higher rung when you can.
            </p>
          </div>

          <div className="mnr-3r-grid">
            <div className="mnr-3r-card">
              <div className="mnr-3r-icon"><Icon id="minus" size={24}/></div>
              <div className="mnr-3r-name">Reduce</div>
              <div className="mnr-3r-desc">
                Use <strong>less</strong> of a resource in the first place. Save what you would have used — turn off unused lights and fans, take shorter showers, buy only what you need. The cleanest resource is the one never used.
              </div>
              <span className="mnr-3r-tag">Save the resource</span>
            </div>
            <div className="mnr-3r-card alt1">
              <div className="mnr-3r-icon"><Icon id="refresh" size={24}/></div>
              <div className="mnr-3r-name">Reuse</div>
              <div className="mnr-3r-desc">
                Use the <strong>same item</strong> again and again for the same or a different purpose. Refill water bottles, turn jars into storage, pass on clothes. <em>Reuse is better than recycling because it saves energy.</em>
              </div>
              <span className="mnr-3r-tag">Use it again</span>
            </div>
            <div className="mnr-3r-card alt2">
              <div className="mnr-3r-icon"><Icon id="recycle" size={24}/></div>
              <div className="mnr-3r-name">Recycle</div>
              <div className="mnr-3r-desc">
                <strong>Segregate</strong> waste (paper, plastic, glass, metal) so it can be reprocessed into new products. Recycling saves raw materials but still consumes energy during processing — so it ranks third.
              </div>
              <span className="mnr-3r-tag">Turn waste into things</span>
            </div>
          </div>

          <div className="mnr-alert teal">
            <div className="mnr-alert-icon"><Icon id="info" size={22}/></div>
            <div className="mnr-alert-text">
              <strong>Why this order matters:</strong> Reducing uses no energy (you just don't do something). Reusing uses a tiny amount (washing a jar). Recycling uses a lot — collection, transportation, cleaning, melting, reshaping. So every time you reach for an R, try the top one first.
            </div>
          </div>

          {/* ═══════════ SECTION 3: STAKEHOLDERS ═══════════ */}
          <div className="mnr-ch-divider">
            <div className="mnr-ch-badge"><span className="mnr-ch-num">03</span><span className="mnr-ch-text">Forest Stakeholders &amp; Sustainable Management</span></div>
          </div>

          <div className="mnr-sec-head">
            <span className="mnr-sec-num">3</span>
            <div className="mnr-sec-kicker">Who Has a Stake in the Forest?</div>
            <h2 className="mnr-sec-title">Forest Conservation <span>&amp; Stakeholders</span></h2>
          </div>

          <div className="mnr-body-text">
            <p>
              Forests are <strong>biodiversity hotspots</strong> — areas packed with bacteria, fungi, flowering plants, insects, birds, and mammals. The <em>biodiversity</em> of a region is simply the number of species of different life forms found there. Loss of biodiversity leads to <strong>ecological imbalance</strong> — one lost species weakens the whole web.
            </p>
            <p>
              A <strong>stakeholder</strong> is anyone with an interest or concern in a resource. Successful forest management means <em>balancing the needs of four different groups</em>, each of whom sees the forest through a different lens:
            </p>
          </div>

          <div className="mnr-stake-block">
            <div className="mnr-stake-intro">
              Sustainable management means using forest resources <strong>wisely</strong> so that enough remains for future generations — and the interests of all four stakeholder groups are balanced against each other.
            </div>
            <div className="mnr-stake-grid">
              <div className="mnr-stake-card">
                <div className="mnr-stake-icon"><Icon id="person" size={22}/></div>
                <div className="mnr-stake-num">01</div>
                <div className="mnr-stake-name">Local People</div>
                <div className="mnr-stake-desc">Communities living in or near the forest who depend on it for firewood, food, fodder, and daily livelihood.</div>
              </div>
              <div className="mnr-stake-card">
                <div className="mnr-stake-icon"><Icon id="building" size={22}/></div>
                <div className="mnr-stake-num">02</div>
                <div className="mnr-stake-name">Forest Department</div>
                <div className="mnr-stake-desc">Government body that owns forest land and controls access to its resources through laws and permits.</div>
              </div>
              <div className="mnr-stake-card">
                <div className="mnr-stake-icon"><Icon id="factory" size={22}/></div>
                <div className="mnr-stake-num">03</div>
                <div className="mnr-stake-name">Industrialists</div>
                <div className="mnr-stake-desc">Businesses that use forest products — timber, resin, bamboo, herbs, tendu leaves — as raw materials for production.</div>
              </div>
              <div className="mnr-stake-card">
                <div className="mnr-stake-icon"><Icon id="leaf" size={22}/></div>
                <div className="mnr-stake-num">04</div>
                <div className="mnr-stake-name">Wildlife Enthusiasts</div>
                <div className="mnr-stake-desc">Conservationists and nature lovers who want to preserve forests and wildlife for their ecological and intrinsic value.</div>
              </div>
            </div>
          </div>

          {/* ═══════════ SECTION 4: WATER & DAMS ═══════════ */}
          <div className="mnr-ch-divider">
            <div className="mnr-ch-badge"><span className="mnr-ch-num">04</span><span className="mnr-ch-text">Water as a Resource — Dams &amp; Harvesting</span></div>
          </div>

          <div className="mnr-sec-head">
            <span className="mnr-sec-num">4</span>
            <div className="mnr-sec-kicker">The Most Basic Resource</div>
            <h2 className="mnr-sec-title">Water, Dams <span>&amp; Ancient Harvesting</span></h2>
          </div>

          <div className="mnr-body-text">
            <p>
              Water is the basic necessity for all <strong>terrestrial forms of life</strong>. Regions of water scarcity closely correlate with regions of acute poverty — water poverty and economic poverty travel together. Failure to sustain water availability has resulted from <strong>loss of vegetation cover, diversion for high water-demanding crops, pollution from industries and urban waste, and less rainfall</strong>.
            </p>
            <p>
              For centuries, Indians used <strong>dams, tanks, and canals</strong> to manage water. Today's large dams are descendants of those traditions — but modern scale brings modern problems.
            </p>
          </div>

          {/* Dams pros/cons */}
          <div className="mnr-contrast">
            <div className="mnr-con-col">
              <div className="mnr-con-hdr">
                <div className="mnr-con-icon pro"><Icon id="check" size={18} color="#fff"/></div>
                <div className="mnr-con-label">Advantages of Dams</div>
              </div>
              <div className="mnr-con-list">
                <div className="mnr-con-item"><div className="mnr-con-dot pro">1</div><div className="mnr-con-text">Ensure <strong>adequate water for irrigation</strong>, especially in dry seasons.</div></div>
                <div className="mnr-con-item"><div className="mnr-con-dot pro">2</div><div className="mnr-con-text">Generate <strong>hydroelectricity</strong> — clean, renewable power.</div></div>
                <div className="mnr-con-item"><div className="mnr-con-dot pro">3</div><div className="mnr-con-text">Provide <strong>continuous supply of water</strong> to towns and villages year-round.</div></div>
              </div>
            </div>
            <div className="mnr-con-col">
              <div className="mnr-con-hdr">
                <div className="mnr-con-icon con"><Icon id="cross" size={18} color="#fff"/></div>
                <div className="mnr-con-label">Disadvantages</div>
              </div>
              <div className="mnr-con-list">
                <div className="mnr-con-item"><div className="mnr-con-dot con">1</div><div className="mnr-con-text"><strong>No equitable distribution</strong> — farmers near the dam get plenty; those far away get little.</div></div>
                <div className="mnr-con-item"><div className="mnr-con-dot con">2</div><div className="mnr-con-text">Large numbers of people are <strong>displaced without compensation</strong>.</div></div>
                <div className="mnr-con-item"><div className="mnr-con-dot con">3</div><div className="mnr-con-text">Involves <strong>huge amounts of public money</strong> without proportionate benefits.</div></div>
                <div className="mnr-con-item"><div className="mnr-con-dot con">4</div><div className="mnr-con-text">Causes <strong>deforestation</strong> and loss of biological diversity from submergence.</div></div>
              </div>
            </div>
          </div>

          {/* Water harvesting intro */}
          <h3 style={{fontFamily:"'Montserrat',sans-serif",fontSize:"22px",fontWeight:800,color:"var(--ink)",marginTop:"40px",marginBottom:"10px",letterSpacing:"-0.01em"}}>
            Water Harvesting — <span style={{color:"var(--teal2)",fontStyle:"italic"}}>an ancient Indian art</span>
          </h3>
          <div className="mnr-body-text">
            <p>
              The <strong>aim of water harvesting</strong> is to develop primary resources of land and water, and to produce secondary resources of plants and animals — in a way that <strong>doesn't cause ecological imbalance</strong>. India has a rich heritage of <em>locale-specific</em> harvesting systems, each designed for its own terrain and climate, preventing mismanagement and over-exploitation.
            </p>
          </div>

          {/* Water harvesting table */}
          <div className="mnr-wh-wrap">
            <table className="mnr-wh-table">
              <thead>
                <tr>
                  <th style={{width:"40%"}}>Ancient Method</th>
                  <th>State / Region</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="mnr-wh-method">Khadin, Tanks, Nadis</td><td className="mnr-wh-state">Rajasthan</td></tr>
                <tr><td className="mnr-wh-method">Bandharas, Tals</td><td className="mnr-wh-state">Maharashtra</td></tr>
                <tr><td className="mnr-wh-method">Bundhis</td><td className="mnr-wh-state">Madhya Pradesh &amp; Uttar Pradesh</td></tr>
                <tr><td className="mnr-wh-method">Pynes, Ahars</td><td className="mnr-wh-state">Bihar</td></tr>
                <tr><td className="mnr-wh-method">Kulhs</td><td className="mnr-wh-state">Himachal Pradesh</td></tr>
                <tr><td className="mnr-wh-method">Ponds</td><td className="mnr-wh-state">Jammu region</td></tr>
                <tr><td className="mnr-wh-method">Eris (Tanks)</td><td className="mnr-wh-state">Tamil Nadu</td></tr>
                <tr><td className="mnr-wh-method">Bawlis (Stepwells)</td><td className="mnr-wh-state">Delhi &amp; nearby regions</td></tr>
              </tbody>
            </table>
          </div>

          {/* Khadin diagram */}
          <div className="mnr-diagram-wrap">
            <div className="mnr-diagram-title">The Khadin System — Rajasthan</div>
            <svg viewBox="0 0 560 280" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",maxWidth:"520px"}}>
              {/* Hill slope (left) */}
              <path d="M0,240 L0,100 Q60,60 140,100 L220,130 L240,180 L240,260 L0,260 Z"
                    fill="rgba(13,148,136,0.18)" stroke="rgba(94,234,212,0.5)" strokeWidth="1.5"/>
              <text x="80" y="80" fill="rgba(94,234,212,0.9)" fontSize="11" fontFamily="Poppins,sans-serif" fontWeight="700">HILL SLOPE</text>
              {/* Rainwater arrows flowing down */}
              {[60,100,140,180].map((x,i)=>(
                <g key={i}>
                  <line x1={x} y1={50+i*8} x2={x+20} y2={70+i*8} stroke="rgba(125,211,252,0.7)" strokeWidth="1.5"/>
                  <polygon points={`${x+18},${70+i*8-3} ${x+22},${70+i*8} ${x+18},${70+i*8+3}`} fill="rgba(125,211,252,0.8)"/>
                </g>
              ))}
              <text x="85" y="40" fill="rgba(125,211,252,0.95)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700">RAINFALL → RUNOFF</text>
              {/* Earthen bund (the Khadin embankment) */}
              <path d="M240,180 L280,140 L320,180 L320,260 L240,260 Z"
                    fill="rgba(180,130,90,0.5)" stroke="rgba(217,119,6,0.8)" strokeWidth="2"/>
              <text x="280" y="135" fill="rgba(252,211,77,0.95)" fontSize="11" fontFamily="Poppins,sans-serif" fontWeight="700" textAnchor="middle">BUND</text>
              {/* Water ponding behind the bund (left side) */}
              <path d="M200,180 L240,180 L280,160 L280,180 Z"
                    fill="rgba(125,211,252,0.55)" stroke="rgba(125,211,252,0.8)" strokeWidth="1.2"/>
              <text x="240" y="175" fill="rgba(224,242,254,0.95)" fontSize="9" fontFamily="Poppins,sans-serif" fontWeight="700" textAnchor="middle">water ponds</text>
              {/* Cultivated field (downstream) */}
              <rect x="320" y="180" width="230" height="60" fill="rgba(16,185,129,0.22)" stroke="rgba(94,234,212,0.5)" strokeWidth="1.5"/>
              <text x="435" y="170" fill="rgba(94,234,212,0.95)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700" textAnchor="middle">CULTIVATED LAND</text>
              {/* Crops */}
              {[345,375,405,435,465,495,525].map((x,i)=>(
                <g key={i}>
                  <line x1={x} y1="200" x2={x} y2="215" stroke="rgba(16,185,129,0.7)" strokeWidth="1.2"/>
                  <circle cx={x} cy="198" r="2.5" fill="rgba(94,234,212,0.8)"/>
                </g>
              ))}
              {/* Seepage arrows going down (key to khadin) */}
              {[255,270,285,300].map((x,i)=>(
                <g key={`seep${i}`}>
                  <line x1={x} y1="180" x2={x} y2="215" stroke="rgba(125,211,252,0.6)" strokeWidth="1.2" strokeDasharray="2,2"/>
                  <polygon points={`${x-3},${213} ${x+3},${213} ${x},${218}`} fill="rgba(125,211,252,0.7)"/>
                </g>
              ))}
              <text x="275" y="235" fill="rgba(125,211,252,0.85)" fontSize="9" fontFamily="Poppins,sans-serif" fontWeight="700" textAnchor="middle">seepage → groundwater</text>
              {/* Recharge well */}
              <rect x="460" y="210" width="20" height="30" fill="rgba(2,44,40,0.6)" stroke="rgba(94,234,212,0.7)" strokeWidth="1.5"/>
              <rect x="460" y="228" width="20" height="12" fill="rgba(125,211,252,0.5)"/>
              <text x="470" y="258" fill="rgba(94,234,212,0.9)" fontSize="9" fontFamily="Poppins,sans-serif" fontWeight="700" textAnchor="middle">WELL</text>
            </svg>
            <div className="mnr-diagram-caption">
              Rainwater runs off the hill slope and collects behind an earthen bund. Instead of evaporating, it <em>seeps into the ground</em>, recharging wells and providing soil moisture for crops — all without creating mosquito-breeding stagnant pools.
            </div>
          </div>

          <div className="mnr-adv-list">
            <div className="mnr-adv-item">
              <div className="mnr-adv-check"><Icon id="check" size={16}/></div>
              <div className="mnr-adv-text">Water <strong>does not evaporate</strong> — it seeps underground and is preserved.</div>
            </div>
            <div className="mnr-adv-item">
              <div className="mnr-adv-check"><Icon id="check" size={16}/></div>
              <div className="mnr-adv-text"><strong>Recharges wells</strong> and provides moisture for vegetation and crops.</div>
            </div>
            <div className="mnr-adv-item">
              <div className="mnr-adv-check"><Icon id="check" size={16}/></div>
              <div className="mnr-adv-text">Does <strong>not provide breeding ground for mosquitoes</strong> (no stagnant surface water).</div>
            </div>
            <div className="mnr-adv-item">
              <div className="mnr-adv-check"><Icon id="check" size={16}/></div>
              <div className="mnr-adv-text">Groundwater is <strong>protected from human and animal waste contamination</strong>.</div>
            </div>
          </div>

          {/* ═══════════ SECTION 5: COAL & PETROLEUM ═══════════ */}
          <div className="mnr-ch-divider">
            <div className="mnr-ch-badge"><span className="mnr-ch-num">05</span><span className="mnr-ch-text">Coal &amp; Petroleum — The Fossil Fuel Clock</span></div>
          </div>

          <div className="mnr-sec-head">
            <span className="mnr-sec-num">5</span>
            <div className="mnr-sec-kicker">The Resources Running Out</div>
            <h2 className="mnr-sec-title">Coal &amp; Petroleum <span>— Use Them Wisely</span></h2>
          </div>

          <div className="mnr-body-text">
            <p>
              <strong>Coal and petroleum</strong> are generally called <strong>fossil fuels</strong>. They were formed from the disintegration of biomass over <em>millions of years</em>. No matter how carefully we use them, they will <strong>get exhausted in the future</strong>. Both fuels also contain <strong>hydrogen, nitrogen and sulphur</strong> — which turn into pollutants when burnt.
            </p>
          </div>

          {/* Fossil fuel lifespan visual */}
          <div className="mnr-fuel-wrap">
            <div className="mnr-fuel-hdr">Estimated Reserves at Current Consumption</div>
            <div className="mnr-fuel-title">How long will our fossil fuels last?</div>

            <div className="mnr-fuel-row">
              <div className="mnr-fuel-label-row">
                <div className="mnr-fuel-name">Coal</div>
                <div className="mnr-fuel-years">~ 200 years</div>
              </div>
              <div className="mnr-fuel-bar-bg">
                <div className="mnr-fuel-bar coal">200 YEARS</div>
              </div>
            </div>

            <div className="mnr-fuel-row">
              <div className="mnr-fuel-label-row">
                <div className="mnr-fuel-name">Petroleum</div>
                <div className="mnr-fuel-years">~ 40 years</div>
              </div>
              <div className="mnr-fuel-bar-bg">
                <div className="mnr-fuel-bar petro">40 YRS</div>
              </div>
            </div>

            <div className="mnr-fuel-note">
              Petroleum, once the star of industrial civilization, is now projected to run out within a human lifetime at current consumption rates. Coal lasts five times longer — but burning it is the <em>biggest single driver</em> of climate change.
            </div>
          </div>

          <h3 style={{fontFamily:"'Montserrat',sans-serif",fontSize:"20px",fontWeight:800,color:"var(--ink)",marginTop:"32px",marginBottom:"14px",letterSpacing:"-0.01em"}}>
            Why use fossil fuels <span style={{color:"var(--teal2)",fontStyle:"italic"}}>judiciously?</span>
          </h3>

          <div className="mnr-tips-grid">
            <div className="mnr-tip-card">
              <div className="mnr-tip-icon"><Icon id="users" size={20}/></div>
              <div className="mnr-tip-text">Use <strong>public transport</strong> instead of private vehicles — cuts petrol use and CO₂ drastically.</div>
            </div>
            <div className="mnr-tip-card">
              <div className="mnr-tip-icon"><Icon id="flame" size={20}/></div>
              <div className="mnr-tip-text">Use <strong>CFL or LED bulbs</strong> — they use a fraction of the electricity of incandescents.</div>
            </div>
            <div className="mnr-tip-card">
              <div className="mnr-tip-icon"><Icon id="mountain" size={20}/></div>
              <div className="mnr-tip-text">Take the <strong>stairs</strong> instead of the lift wherever you can — saves a surprising amount of power.</div>
            </div>
            <div className="mnr-tip-card">
              <div className="mnr-tip-icon"><Icon id="shield" size={20}/></div>
              <div className="mnr-tip-text"><strong>Switch off</strong> lights, fans, and appliances when not in use. Unplug standby chargers.</div>
            </div>
          </div>

          <div className="mnr-alert">
            <div className="mnr-alert-icon"><Icon id="warn" size={22}/></div>
            <div className="mnr-alert-text">
              <strong>The real point:</strong> Fossil fuels are not just finite — they're also <em>polluting</em>. Every litre of petrol and every kilogram of coal contributes to the greenhouse effect, acid rain, and smog. Using them wisely buys humanity time to shift to renewables.
            </div>
          </div>

          <div className="mnr-pull-quote">
            "Conservation is not about locking nature away from people — it is about weaving people back into nature."
          </div>

        </div>

        {/* ══════════ FAQ ══════════ */}
        <section className="mnr-faq-wrap">
          <div className="mnr-faq-kicker">End of Chapter · Practice</div>
          <h2 className="mnr-faq-title">Frequently Asked <span>Questions</span></h2>

          {faqData.map((item, idx) => (
            <div key={idx} className="mnr-faq-q">
              <button
                className="mnr-faq-header"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                aria-expanded={openFaq === idx}
              >
                <span>Q{idx + 1}. {item.q}</span>
                <span className="mnr-faq-icon">{openFaq === idx ? "▴" : "▾"}</span>
              </button>
              {openFaq === idx && (
                <div className="mnr-faq-ans-inner">{item.a}</div>
              )}
            </div>
          ))}
        </section>

      </div>
    </>
  );
}
