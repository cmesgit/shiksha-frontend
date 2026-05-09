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
    sun:       <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>,
    wind:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2M12.59 19.41A2 2 0 1 0 14 16H2M17.73 7.73A2.5 2.5 0 1 1 19.5 12H2"/></svg>,
    droplet:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>,
    flame:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
    leaf:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1 1.52.5 7.3-4 11.3-2.5 2.2-5 3.2-8.5 4"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
    atom:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z"/></svg>,
    wave:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6c.6-.5 1.2-1 2.5-1C7 5 7 7 9.5 7s2.5-2 5-2c2.6 0 2.5 2 5 2 1.3 0 1.9-.5 2.5-1"/><path d="M2 12c.6-.5 1.2-1 2.5-1C7 11 7 13 9.5 13s2.5-2 5-2c2.6 0 2.5 2 5 2 1.3 0 1.9-.5 2.5-1"/><path d="M2 18c.6-.5 1.2-1 2.5-1C7 17 7 19 9.5 19s2.5-2 5-2c2.6 0 2.5 2 5 2 1.3 0 1.9-.5 2.5-1"/></svg>,
    thermo:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>,
    factory:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M2 20V8l5 3V8l5 3V8l5 3V20"/><path d="M17 20V6"/></svg>,
    battery:   <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="18" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/><line x1="6" y1="11" x2="6" y2="13"/><line x1="10" y1="11" x2="10" y2="13"/></svg>,
    warn:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    info:      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    check:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    cross:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    globe:     <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    sprout:    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>,
  };
  return icons[id] || null;
};

const styles = `
  :root {
    --solar:      #7c3aed;
    --solar2:     #6d28d9;
    --solar3:     #2e1065;
    --solar-lt:   #ede9fe;
    --solar-mid:  #c4b5fd;
    --green:      #059669;
    --green-lt:   #d1fae5;
    --green-mid:  #6ee7b7;
    --sky:        #0284c7;
    --sky-lt:     #e0f2fe;
    --sky-mid:    #7dd3fc;
    --rose:       #be123c;
    --rose-lt:    #ffe4e6;
    --slate:      #475569;
    --paper:      #faf8ff;
    --paper2:     #f5f3ff;
    --ink:        #130a29;
    --ink2:       #1e1445;
    --muted:      #6b7280;
    --rule:       #ddd6fe;
    --white:      #ffffff;
  }
  * { box-sizing:border-box; margin:0; padding:0; }
  .soe-root { font-family:'Inter',sans-serif; background:var(--paper); color:var(--ink); min-height:100vh; }

  /* ═══ HERO ═══ */
  .soe-hero {
    background:linear-gradient(160deg,#0a0524 0%,#14092e 50%,#1e0f4a 100%);
    min-height:100vh; position:relative; overflow:hidden;
    display:flex; flex-direction:column; justify-content:center;
    padding:80px 0 72px;
  }
  .soe-hero::before {
    content:''; position:absolute; top:0; left:0; right:0; height:5px;
    background:linear-gradient(90deg,#7c3aed 0%,#0ea5e9 20%,#10b981 40%,#f59e0b 60%,#dc2626 80%,#7c3aed 100%);
  }
  .soe-glow-1 { position:absolute; top:-8%; left:6%; width:540px; height:540px; border-radius:50%; background:radial-gradient(circle,rgba(124,58,237,0.16) 0%,transparent 65%); pointer-events:none; }
  .soe-glow-2 { position:absolute; bottom:0; right:2%; width:440px; height:440px; border-radius:50%; background:radial-gradient(circle,rgba(14,165,233,0.1) 0%,transparent 65%); pointer-events:none; }
  .soe-glow-3 { position:absolute; top:38%; right:26%; width:300px; height:300px; border-radius:50%; background:radial-gradient(circle,rgba(245,158,11,0.08) 0%,transparent 65%); pointer-events:none; }

  /* Decorative SVG watermark */
  .soe-hero-svg { position:absolute; right:0; top:0; width:48%; height:100%; pointer-events:none; opacity:0.2; }

  .soe-hero-inner { max-width:960px; width:100%; margin:0 auto; padding:0 40px; position:relative; z-index:2; }

  .soe-subject-pill {
    display:inline-flex; align-items:center; gap:8px;
    border:1px solid rgba(124,58,237,0.4); background:rgba(124,58,237,0.1);
    border-radius:6px; padding:6px 16px; margin-bottom:28px;
    font-family:'Poppins',sans-serif; font-size:11px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; color:var(--solar-mid);
  }
  .soe-pill-dot { width:6px; height:6px; border-radius:50%; background:var(--solar-mid); animation:soe-pulse 2s infinite; }
  @keyframes soe-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }

  .soe-hero-eyebrow { font-family:'Poppins',sans-serif; font-size:11px; font-weight:600; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:14px; }
  .soe-hero-title {
    font-family:'Montserrat',sans-serif; font-weight:900;
    font-size:clamp(38px,6vw,76px); line-height:1.0;
    letter-spacing:-0.02em; color:#fff; margin-bottom:10px;
  }
  .soe-hero-title .t1 { display:block; }
  .soe-hero-title .t2 { display:block; color:var(--solar-mid); font-style:italic; }
  .soe-hero-title .t3 { display:block; color:rgba(255,255,255,0.85); }

  .soe-hero-desc { font-size:16px; color:rgba(255,255,255,0.5); line-height:1.85; max-width:520px; margin:22px 0 40px; }

  .soe-hero-stats { display:flex; gap:0; border:1px solid rgba(255,255,255,0.08); border-radius:10px; overflow:hidden; width:fit-content; flex-wrap:wrap; }
  .soe-hero-stat { padding:14px 26px; border-right:1px solid rgba(255,255,255,0.08); }
  .soe-hero-stat:last-child { border-right:none; }
  .soe-stat-num   { font-family:'Montserrat',sans-serif; font-size:22px; font-weight:800; color:var(--solar-mid); line-height:1; margin-bottom:4px; }
  .soe-stat-num sup { font-size:0.6em; font-weight:700; }
  .soe-stat-label { font-size:11px; color:rgba(255,255,255,0.35); font-weight:500; letter-spacing:0.05em; font-family:'Poppins',sans-serif; }

  /* ═══ BODY ═══ */
  .soe-body { max-width:920px; margin:0 auto; padding:80px 32px 100px; }

  /* ═══ INTRO 3fr + 2fr (Ch13 pattern) ═══ */
  .soe-intro { display:grid; grid-template-columns:3fr 2fr; gap:40px; margin-bottom:72px; align-items:start; }
  @media(max-width:640px){ .soe-intro{grid-template-columns:1fr;} }
  .soe-intro-kicker { font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:var(--solar2); margin-bottom:12px; display:flex; align-items:center; gap:10px; }
  .soe-intro-kicker::after { content:''; width:44px; height:1px; background:var(--solar-mid); }
  .soe-intro-headline { font-family:'Montserrat',sans-serif; font-size:clamp(20px,3vw,28px); font-weight:800; color:var(--ink); line-height:1.2; margin-bottom:16px; }
  .soe-intro-headline em { font-style:italic; color:var(--solar2); }
  .soe-intro-body-text { font-size:15.5px; line-height:1.85; color:var(--ink2); margin-bottom:14px; }
  .soe-intro-body-text strong { color:var(--solar3); font-weight:600; }
  .soe-intro-sidebar { background:linear-gradient(160deg,#0a0524,#14092e); border-radius:14px; padding:26px 22px; position:relative; overflow:hidden; }
  .soe-intro-sidebar::before { content:''; position:absolute; top:-20px; right:-20px; width:100px; height:100px; border-radius:50%; background:rgba(124,58,237,0.14); }
  .soe-sidebar-label { font-family:'Poppins',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(196,181,253,0.7); margin-bottom:12px; }
  .soe-sidebar-title-lg { font-family:'Montserrat',sans-serif; font-size:17px; font-weight:800; color:#fff; margin-bottom:14px; line-height:1.3; }
  .soe-sidebar-list-ul { list-style:none; padding:0; }
  .soe-sidebar-item-li { display:flex; align-items:center; gap:10px; padding:7px 0; border-bottom:1px solid rgba(255,255,255,0.07); font-size:13px; color:rgba(255,255,255,0.72); }
  .soe-sidebar-item-li:last-child { border-bottom:none; }
  .soe-sidebar-num-lg { font-family:'Montserrat',sans-serif; font-size:19px; font-weight:800; color:var(--solar-mid); flex-shrink:0; width:24px; line-height:1; }

  @media(max-width:640px){
    .soe-hero-inner{padding:0 20px;}
    .soe-body{padding:40px 16px 80px;}
    .soe-hero-title{font-size:clamp(32px,10vw,50px);}
    .soe-hero-stats{width:100%;}
    .soe-hero-stat{padding:12px 18px;}
  }
  .soe-sec-head { margin-bottom:28px; }
  .soe-sec-num { font-family:'Montserrat',sans-serif; font-size:80px; font-weight:900; color:var(--solar-lt); line-height:0.85; letter-spacing:-0.04em; display:block; margin-bottom:2px; }
  .soe-sec-kicker { font-family:'Poppins',sans-serif; font-size:10.5px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--solar2); margin-bottom:6px; }
  .soe-sec-title { font-family:'Montserrat',sans-serif; font-size:clamp(22px,3vw,32px); font-weight:800; color:var(--ink); line-height:1.15; border-bottom:2px solid var(--rule); padding-bottom:16px; }
  .soe-sec-title span { color:var(--solar2); font-style:italic; }

  /* ═══ BODY TEXT ═══ */
  .soe-body-text { font-family:'Inter',sans-serif; font-size:15.5px; line-height:1.78; color:var(--ink2); margin-bottom:20px; }
  .soe-body-text p { margin-bottom:14px; }
  .soe-body-text strong { color:var(--solar2); font-weight:600; }

  /* ═══ CHAPTER DIVIDER BADGE (Ch13 pattern) ═══ */
  .soe-ch-divider { display:flex; align-items:center; gap:12px; margin:64px 0 48px; }
  .soe-ch-divider::before, .soe-ch-divider::after { content:''; flex:1; height:1px; background:var(--rule); min-width:12px; }
  .soe-ch-badge {
    display:inline-flex; align-items:center; gap:10px;
    background:var(--solar2); border-radius:8px; padding:10px 20px;
    font-family:'Poppins',sans-serif; font-size:12px; font-weight:700;
    letter-spacing:0.1em; text-transform:uppercase; color:#fff;
    flex-shrink:0; max-width:72%;
  }
  .soe-ch-num  { font-family:'Montserrat',sans-serif; font-size:16px; color:var(--solar-mid); font-weight:800; white-space:nowrap; flex-shrink:0; line-height:1; }
  .soe-ch-text { white-space:normal; word-break:break-word; line-height:1.3; }
  @media(max-width:480px){
    .soe-ch-divider{margin:48px 0 32px;gap:8px;}
    .soe-ch-badge{font-size:10px;padding:8px 14px;gap:8px;max-width:76%;}
    .soe-ch-num{font-size:14px;}
  }

  /* ═══ CRITERIA — 4 BIG CARDS FOR "GOOD ENERGY SOURCE" ═══ */
  .soe-criteria-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin:28px 0 16px; }
  @media(max-width:800px){ .soe-criteria-grid{grid-template-columns:repeat(2,1fr);} }
  .soe-crit-card {
    background:linear-gradient(160deg,#f5f3ff 0%,#fff 100%);
    border:1px solid var(--rule); border-radius:12px;
    padding:22px 20px; position:relative; overflow:hidden;
  }
  .soe-crit-card::before { content:""; position:absolute; top:0; left:0; width:40px; height:3px; background:var(--solar); border-radius:0 0 3px 0; }
  .soe-crit-num { font-family:'Montserrat',sans-serif; font-size:32px; font-weight:900; color:var(--solar); line-height:1; margin-bottom:10px; }
  .soe-crit-title { font-family:'Poppins',sans-serif; font-size:13.5px; font-weight:700; color:var(--ink); margin-bottom:6px; letter-spacing:-0.01em; }
  .soe-crit-desc { font-family:'Inter',sans-serif; font-size:12.5px; color:var(--muted); line-height:1.55; }

  /* ═══ RENEWABLE vs NON-RENEWABLE CONTRAST ═══ */
  .soe-contrast {
    display:grid; grid-template-columns:1fr 1fr; gap:0; margin:32px 0;
    background:var(--white); border-radius:14px; overflow:hidden;
    border:1px solid var(--rule); box-shadow:0 8px 24px -12px rgba(124,58,237,0.1);
  }
  @media(max-width:760px){ .soe-contrast{grid-template-columns:1fr;} }
  .soe-contrast-col { padding:32px 28px; }
  .soe-contrast-col + .soe-contrast-col { border-left:1px solid var(--rule); }
  @media(max-width:760px){ .soe-contrast-col + .soe-contrast-col { border-left:none; border-top:1px solid var(--rule); } }
  .soe-con-tag { display:inline-block; padding:5px 12px; border-radius:20px; font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; margin-bottom:14px; }
  .soe-con-tag.renew { background:var(--green-lt); color:#065f46; }
  .soe-con-tag.nonrenew { background:var(--rose-lt); color:#9f1239; }
  .soe-con-title { font-family:'Montserrat',sans-serif; font-size:22px; font-weight:800; color:var(--ink); margin-bottom:12px; letter-spacing:-0.01em; }
  .soe-con-desc { font-family:'Inter',sans-serif; font-size:14px; color:var(--ink2); line-height:1.65; margin-bottom:16px; }
  .soe-con-list { display:flex; flex-direction:column; gap:10px; }
  .soe-con-item { display:flex; gap:10px; align-items:flex-start; font-family:'Inter',sans-serif; font-size:13.5px; color:var(--ink2); line-height:1.5; }
  .soe-con-dot { width:6px; height:6px; border-radius:50%; margin-top:7px; flex-shrink:0; }
  .soe-con-dot.renew { background:var(--green); }
  .soe-con-dot.nonrenew { background:var(--rose); }
  .soe-con-examples { margin-top:16px; padding-top:16px; border-top:1px dashed var(--rule); font-family:'Poppins',sans-serif; font-size:11.5px; font-weight:600; color:var(--muted); letter-spacing:0.05em; }

  /* ═══ CONVENTIONAL SOURCES — TIMELINE STYLE ═══ */
  .soe-conv-block { margin:32px 0; }
  .soe-conv-intro { background:var(--paper2); border-left:3px solid var(--solar); padding:20px 26px; border-radius:0 10px 10px 0; font-family:'Inter',sans-serif; font-size:14.5px; color:var(--ink2); line-height:1.7; margin-bottom:28px; }
  .soe-conv-list { display:flex; flex-direction:column; gap:18px; }
  .soe-conv-item {
    background:var(--white); border:1px solid var(--rule); border-radius:14px;
    display:grid; grid-template-columns:72px 1fr; overflow:hidden;
  }
  .soe-conv-icon-col {
    background:linear-gradient(160deg,var(--solar) 0%,var(--solar2) 100%);
    display:flex; align-items:center; justify-content:center;
    color:#fff;
  }
  .soe-conv-content { padding:22px 26px; }
  .soe-conv-tag { font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:var(--solar2); margin-bottom:4px; }
  .soe-conv-name { font-family:'Montserrat',sans-serif; font-size:19px; font-weight:800; color:var(--ink); margin-bottom:8px; letter-spacing:-0.01em; }
  .soe-conv-desc { font-family:'Inter',sans-serif; font-size:14px; color:var(--ink2); line-height:1.65; }
  .soe-conv-desc strong { color:var(--solar2); font-weight:600; }

  /* ═══ DIAGRAM WRAPPER ═══ */
  .soe-diagram-wrap {
    background:linear-gradient(160deg,#14092e 0%,#0a0524 100%);
    border-radius:14px; padding:28px 24px 20px; margin:24px 0;
    display:flex; flex-direction:column; align-items:center;
    box-shadow:0 12px 32px -14px rgba(109,40,217,0.35);
  }
  .soe-diagram-title {
    font-family:'Poppins',sans-serif; font-size:11px; font-weight:700;
    letter-spacing:0.2em; text-transform:uppercase; color:rgba(196,181,253,0.7);
    margin-bottom:18px;
  }
  .soe-diagram-caption {
    font-family:'Inter',sans-serif; font-size:12.5px; color:rgba(255,255,255,0.55);
    margin-top:14px; text-align:center; font-style:italic; max-width:480px;
  }

  /* ═══ PROS/CONS PARALLEL COLS (Wind) ═══ */
  .soe-pc-wrap {
    display:grid; grid-template-columns:1fr 1fr; gap:0;
    background:var(--white); border-radius:14px; overflow:hidden;
    border:1px solid var(--rule); margin:24px 0;
  }
  @media(max-width:700px){ .soe-pc-wrap{grid-template-columns:1fr;} }
  .soe-pc-col { padding:28px 26px; }
  .soe-pc-col + .soe-pc-col { border-left:1px solid var(--rule); }
  @media(max-width:700px){ .soe-pc-col + .soe-pc-col { border-left:none; border-top:1px solid var(--rule); } }
  .soe-pc-hdr { display:flex; align-items:center; gap:10px; margin-bottom:18px; padding-bottom:14px; border-bottom:1px dashed var(--rule); }
  .soe-pc-icon { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#fff; }
  .soe-pc-icon.pro { background:var(--green); }
  .soe-pc-icon.con { background:var(--rose); }
  .soe-pc-label { font-family:'Montserrat',sans-serif; font-size:16px; font-weight:800; color:var(--ink); letter-spacing:-0.01em; }
  .soe-pc-list { display:flex; flex-direction:column; gap:12px; }
  .soe-pc-item { display:flex; gap:12px; align-items:flex-start; }
  .soe-pc-num { font-family:'Montserrat',sans-serif; font-size:13px; font-weight:800; min-width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .soe-pc-num.pro { background:var(--green-lt); color:#065f46; }
  .soe-pc-num.con { background:var(--rose-lt); color:#9f1239; }
  .soe-pc-text { font-family:'Inter',sans-serif; font-size:13.5px; color:var(--ink2); line-height:1.55; padding-top:2px; }

  /* ═══ SOLAR DEVICES GRID ═══ */
  .soe-dev-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; margin:24px 0; }
  @media(max-width:700px){ .soe-dev-grid{grid-template-columns:1fr;} }
  .soe-dev-card {
    background:var(--white); border:1px solid var(--rule); border-radius:12px;
    padding:24px 22px; position:relative; transition:none;
  }
  .soe-dev-card::before { content:""; position:absolute; top:0; left:24px; width:32px; height:3px; background:var(--solar); border-radius:0 0 3px 3px; }
  .soe-dev-icon {
    width:44px; height:44px; border-radius:10px;
    background:var(--solar-lt); color:var(--solar2);
    display:flex; align-items:center; justify-content:center;
    margin-bottom:14px;
  }
  .soe-dev-name { font-family:'Montserrat',sans-serif; font-size:17px; font-weight:800; color:var(--ink); margin-bottom:8px; letter-spacing:-0.01em; }
  .soe-dev-desc { font-family:'Inter',sans-serif; font-size:13.5px; color:var(--ink2); line-height:1.6; }

  /* ═══ KEY NUMBER / FORMULA BOX ═══ */
  .soe-formula-box {
    background:linear-gradient(160deg,#14092e 0%,#0a0524 100%);
    color:#fff; border-radius:14px; padding:28px 32px; margin:24px 0;
    display:grid; grid-template-columns:1fr auto; gap:32px; align-items:center;
  }
  @media(max-width:680px){ .soe-formula-box{grid-template-columns:1fr; gap:18px;} }
  .soe-formula-label { font-family:'Poppins',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(196,181,253,0.7); margin-bottom:8px; }
  .soe-formula-main { font-family:'Montserrat',sans-serif; font-size:34px; font-weight:900; color:var(--solar-mid); line-height:1.1; letter-spacing:-0.02em; }
  .soe-formula-main sup { font-size:0.55em; font-weight:700; }
  .soe-formula-desc { font-family:'Inter',sans-serif; font-size:13.5px; color:rgba(255,255,255,0.72); line-height:1.6; max-width:260px; }

  /* ═══ OCEAN — 3-CARD HORIZONTAL STRIP ═══ */
  .soe-ocean-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin:24px 0; }
  @media(max-width:800px){ .soe-ocean-grid{grid-template-columns:1fr;} }
  .soe-ocean-card {
    background:linear-gradient(170deg,#0284c7 0%,#075985 100%);
    color:#fff; border-radius:14px; padding:24px 22px;
    display:flex; flex-direction:column; gap:10px;
    box-shadow:0 10px 24px -14px rgba(2,132,199,0.4);
  }
  .soe-ocean-icon {
    width:42px; height:42px; border-radius:10px;
    background:rgba(255,255,255,0.14);
    display:flex; align-items:center; justify-content:center;
    color:#e0f2fe; margin-bottom:6px;
  }
  .soe-ocean-tag { font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:rgba(186,230,253,0.8); }
  .soe-ocean-name { font-family:'Montserrat',sans-serif; font-size:18px; font-weight:800; letter-spacing:-0.01em; }
  .soe-ocean-desc { font-family:'Inter',sans-serif; font-size:13px; color:rgba(224,242,254,0.88); line-height:1.6; }

  /* ═══ NUCLEAR — FISSION vs FUSION CONTRAST ═══ */
  .soe-nuc-wrap {
    display:grid; grid-template-columns:1fr 1fr; gap:0;
    background:var(--white); border-radius:14px; overflow:hidden;
    border:1px solid var(--rule); margin:24px 0;
    box-shadow:0 8px 24px -14px rgba(190,18,60,0.15);
  }
  @media(max-width:760px){ .soe-nuc-wrap{grid-template-columns:1fr;} }
  .soe-nuc-col { padding:30px 28px; }
  .soe-nuc-col + .soe-nuc-col { border-left:1px solid var(--rule); }
  @media(max-width:760px){ .soe-nuc-col + .soe-nuc-col { border-left:none; border-top:1px solid var(--rule); } }
  .soe-nuc-tag { display:inline-block; padding:5px 12px; border-radius:20px; font-family:'Poppins',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; margin-bottom:14px; }
  .soe-nuc-tag.fiss { background:#fef3c7; color:#92400e; }
  .soe-nuc-tag.fuse { background:#dbeafe; color:#1e40af; }
  .soe-nuc-name { font-family:'Montserrat',sans-serif; font-size:24px; font-weight:800; color:var(--ink); margin-bottom:12px; letter-spacing:-0.01em; }
  .soe-nuc-desc { font-family:'Inter',sans-serif; font-size:14px; color:var(--ink2); line-height:1.7; margin-bottom:12px; }
  .soe-nuc-eq { font-family:'Montserrat',sans-serif; font-size:13px; font-weight:700; color:var(--solar2); background:var(--paper2); padding:10px 14px; border-radius:8px; border:1px dashed var(--rule); margin-top:8px; }

  /* ═══ NUCLEAR PLANTS LIST ═══ */
  .soe-plants-block { background:var(--paper2); border-radius:12px; padding:22px 26px; margin:20px 0; border-left:3px solid var(--rose); }
  .soe-plants-label { font-family:'Poppins',sans-serif; font-size:10.5px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--rose); margin-bottom:10px; }
  .soe-plants-list { display:flex; flex-wrap:wrap; gap:10px; }
  .soe-plant-pill { background:var(--white); border:1px solid var(--rule); padding:6px 14px; border-radius:20px; font-family:'Poppins',sans-serif; font-size:12.5px; font-weight:600; color:var(--ink); }

  /* ═══ PULL QUOTE ═══ */
  .soe-pull-quote {
    background:linear-gradient(160deg,var(--solar-lt) 0%,#f5f3ff 100%);
    border-left:4px solid var(--solar); border-radius:0 12px 12px 0;
    padding:26px 32px; margin:32px 0;
    font-family:'Montserrat',sans-serif; font-size:19px; font-weight:700;
    font-style:italic; color:var(--solar3); line-height:1.5; letter-spacing:-0.01em;
  }

  /* ═══ ALERT BOX ═══ */
  .soe-alert {
    background:#f5f3ff; border:1px solid var(--solar-mid); border-left:3px solid var(--solar);
    border-radius:10px; padding:18px 22px; margin:20px 0;
    display:grid; grid-template-columns:24px 1fr; gap:14px; align-items:flex-start;
  }
  .soe-alert-icon { color:var(--solar); padding-top:2px; }
  .soe-alert-text { font-family:'Inter',sans-serif; font-size:14px; color:var(--ink2); line-height:1.65; }
  .soe-alert-text strong { color:var(--solar2); font-weight:600; }

  /* ═══ FAQ ═══ */
  .soe-faq-wrap { max-width:960px; margin:0 auto; padding:48px 24px 96px; }
  .soe-faq-kicker { font-family:'Poppins',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:var(--solar2); margin-bottom:8px; }
  .soe-faq-title { font-family:'Montserrat',sans-serif; font-size:clamp(28px,4vw,42px); font-weight:900; color:var(--ink); letter-spacing:-0.02em; margin-bottom:36px; line-height:1.1; }
  .soe-faq-title span { color:var(--solar2); font-style:italic; }
  .soe-faq-q {
    background:var(--white); border:1px solid var(--rule); border-radius:12px;
    margin-bottom:12px; overflow:hidden;
  }
  .soe-faq-header {
    width:100%; display:grid; grid-template-columns:1fr 24px; gap:16px; align-items:center;
    padding:20px 26px; cursor:pointer; border:none; background:transparent;
    text-align:left; font-family:'Poppins',sans-serif; font-size:15.5px; font-weight:600;
    color:var(--ink); line-height:1.45;
  }
  .soe-faq-header:hover { background:var(--paper2); }
  .soe-faq-q-text { letter-spacing:-0.005em; }
  .soe-faq-icon { font-family:'Inter',sans-serif; font-size:18px; color:var(--solar); font-weight:700; display:flex; align-items:center; justify-content:center; width:24px; height:24px; }
  .soe-faq-ans-inner {
    padding:0 26px 22px; font-family:'Inter',sans-serif; font-size:14.5px;
    color:var(--ink2); line-height:1.78; border-top:1px dashed var(--rule); padding-top:18px;
  }
  .soe-faq-ans-inner strong { color:var(--solar2); font-weight:600; }
  .soe-faq-ans-inner em { color:var(--rose); font-style:italic; font-weight:500; }

  /* ═══ DIVIDER MARK ═══ */
  .soe-divider { display:flex; align-items:center; justify-content:center; gap:14px; padding:20px 0 4px; }
  .soe-divider-mark { width:8px; height:8px; border-radius:50%; background:var(--solar-mid); }
  .soe-divider-line { width:60px; height:2px; background:var(--rule); border-radius:2px; }
`;

/* ═══════════════════════════════════════════
   FAQ DATA
═══════════════════════════════════════════ */
const faqData = [
  {
    q: "What is a good source of energy?",
    a: <>A good source of energy is one that has <strong>high calorific value</strong>, is <strong>easily accessible</strong>, is <strong>easy to store and transport</strong>, and is <strong>economical</strong>. It should also be safe to use and cause minimal environmental damage on burning or harnessing.</>
  },
  {
    q: "What is the full form of CNG and LPG?",
    a: <><strong>CNG</strong> stands for <em>Compressed Natural Gas</em>, and <strong>LPG</strong> stands for <em>Liquefied Petroleum Gas</em>. CNG is mainly methane (CH₄) stored at high pressure and used in vehicles, while LPG is a mixture of propane and butane used as cooking gas in households.</>
  },
  {
    q: "What is the minimum wind velocity required to obtain useful energy with a windmill?",
    a: <>The minimum wind speed required for a windmill to serve as a useful source of energy is <strong>15–20 km/h</strong> (commonly cited as 20 km/h). Below this speed, the turbine blades don't rotate fast enough to generate sustained electricity.</>
  },
  {
    q: "Name the main constituent of biogas.",
    a: <>The main constituent of biogas is <strong>methane (CH₄)</strong>, which forms about <strong>75%</strong> of it. Biogas also contains carbon dioxide, hydrogen, and hydrogen sulphide in smaller amounts. It burns without smoke, leaves no residue like ash, and has a high heat capacity — making it an excellent fuel.</>
  },
  {
    q: "Give two examples of fossil fuels.",
    a: <>Two common examples of fossil fuels are <strong>coal</strong> and <strong>petroleum</strong>. A third is <strong>natural gas</strong>. These are formed from buried remains of plants and animals over millions of years under high temperature and pressure, and are <em>non-renewable</em> sources of energy.</>
  },
  {
    q: "Name the device which directly converts solar energy into electric energy.",
    a: <>A <strong>solar cell</strong> (also called a photovoltaic cell) directly converts solar energy into electrical energy. It produces a voltage of about <strong>0.5–1 V</strong> and around <strong>0.7 W</strong> of electricity. Solar cells are typically made from <strong>silicon</strong>, with <strong>silver</strong> used for connecting cells together. A large arrangement of solar cells connected together is called a <strong>solar panel</strong>.</>
  },
  {
    q: "What does OTEC stand for?",
    a: <><strong>OTEC</strong> stands for <em>Ocean Thermal Energy Conversion</em>. It is a method of generating electricity by using the <strong>temperature difference between warm surface water and cold deep-sea water</strong>. For an OTEC plant to work, the temperature difference between the surface and water at a depth of 2 km must be at least <strong>20°C</strong>. The warm water boils a liquid like ammonia, and the vapour drives a turbine connected to a generator. The cold deep water is then pumped up to condense the vapour back to liquid.</>
  },
  {
    q: "What is nuclear energy?",
    a: <><strong>Nuclear energy</strong> is the energy stored in the <strong>nucleus of an atom</strong>, released during nuclear reactions. It comes in two forms:<br/><br/><strong>Nuclear fission:</strong> The nucleus of a heavy atom (like Uranium-235) is bombarded with a low-energy neutron and splits into lighter nuclei, releasing a huge amount of energy.<br/><br/><strong>Nuclear fusion:</strong> Two lighter nuclei join together to form a heavier nucleus, releasing a tremendous amount of energy — this is the process that powers the sun.<br/><br/>Nuclear fission is used in <strong>nuclear reactors</strong> to produce electricity. Major nuclear power plants in India include <em>Tarapur, Rana Pratap Sagar, and Kalpakkam</em>.</>
  },
  {
    q: "Which is a renewable source of energy: solar energy, coal, petroleum, or biogas?",
    a: <>Out of these, <strong>solar energy</strong> and <strong>biogas</strong> are renewable sources. Solar energy comes from the Sun, which is virtually inexhaustible, and biogas is produced continuously from organic waste. <strong>Coal</strong> and <strong>petroleum</strong> are <em>non-renewable</em> — once used up, they cannot be replenished within human timescales since they took millions of years to form.</>
  },
  {
    q: "Which source of energy would you use to heat your food and why?",
    a: <>A <strong>solar cooker</strong> or an <strong>LPG stove</strong> would be ideal choices. A solar cooker is preferred because it uses <strong>renewable solar energy</strong>, causes <strong>no pollution</strong>, is economical to run, and can cook multiple foods simultaneously. However, it cannot fry or bake, and cannot work at night or on cloudy days — in which case LPG becomes a cleaner option than burning coal or wood.</>
  },
  {
    q: "State two disadvantages of using fossil fuels as a source of energy.",
    a: <><strong>(i) Air pollution and acid rain:</strong> Burning fossil fuels releases oxides of carbon, nitrogen, and sulphur, which are acidic in nature and cause air pollution and acid rain.<br/><br/><strong>(ii) Greenhouse effect and global warming:</strong> Large quantities of CO₂ released during combustion trap heat in the atmosphere, enhancing the greenhouse effect and contributing to climate change. Additionally, fossil fuels are <em>non-renewable</em> and will eventually be exhausted.</>
  },
  {
    q: "Write two disadvantages of constructing high-rise dams.",
    a: <><strong>(i)</strong> Large areas of land are submerged, destroying the natural habitat of flora and fauna and displacing human settlements. The rotting of submerged vegetation releases <strong>methane (CH₄)</strong> — a powerful greenhouse gas.<br/><br/><strong>(ii)</strong> Big dams pose serious environmental risks such as <strong>earthquakes, landslides, and flooding</strong> if they fail. They also block fish migration and alter river ecosystems downstream.</>
  },
  {
    q: "Give two limitations and two advantages of a windmill.",
    a: <><strong>Advantages:</strong><br/>(i) It is <strong>eco-friendly</strong> and causes no pollution.<br/>(ii) It is an <strong>efficient renewable source</strong> with no recurring costs for electricity production.<br/><br/><strong>Limitations:</strong><br/>(i) Wind energy farms need <strong>large areas of land</strong>.<br/>(ii) It's difficult to get regular wind speeds of 15–20 km/h, so windmills don't produce electricity continuously. The initial setup cost is also very high and blades require high maintenance.</>
  },
  {
    q: "Name three forms of energy of the oceans that can be converted into usable energy forms.",
    a: <>The three forms are:<br/><br/><strong>(i) Wave energy:</strong> Strong winds blowing across the sea generate waves. The kinetic energy of these moving waves rotates the turbine of a generator to produce electricity.<br/><br/><strong>(ii) Tidal energy:</strong> Tides are caused by the gravitational pull of the Moon on ocean water. A dam is built across a narrow opening to the sea, and turbines fixed at the opening convert tidal energy to electricity.<br/><br/><strong>(iii) Ocean Thermal Energy (OTEC):</strong> The temperature difference between warm surface water and cold deep water (≥20°C) is used to boil a liquid like ammonia. The vapour drives a turbine, and the cold deep water condenses it back.</>
  },
  {
    q: "Explain the principle on which the solar cooker works.",
    a: <>A solar cooker works on the principle of <strong>greenhouse effect</strong> combined with the <strong>absorption of heat by black surfaces</strong>. The box is painted <strong>black inside</strong> because black absorbs maximum heat. A <strong>glass plate</strong> covers the top — it allows shorter-wavelength sunlight to pass in but prevents the longer-wavelength infrared radiation (re-emitted by the hot interior) from escaping. This traps heat inside and raises the temperature. <strong>Plane mirrors</strong> act as reflectors to focus more sunlight into the box, further increasing the temperature (typically up to 100–140°C).</>
  },
  {
    q: "Write the advantages and disadvantages of using a solar cooker.",
    a: <><strong>Advantages:</strong><br/>(i) Uses <em>freely available, renewable</em> solar energy.<br/>(ii) <em>Pollution-free</em> — no fuel is burnt.<br/>(iii) More than one food item can be cooked simultaneously.<br/>(iv) Preserves nutrients since cooking is slow and at moderate temperatures.<br/><br/><strong>Disadvantages:</strong><br/>(i) Cannot be used for <em>frying or baking</em> (temperature is too low).<br/>(ii) Cannot be used at night or on cloudy days.<br/>(iii) The direction of the reflector must be adjusted from time to time to keep facing the Sun.</>
  },
  {
    q: "How does a hydroelectric power plant operate?",
    a: <>A hydroelectric power plant converts the <strong>potential energy of stored water</strong> into electricity. A <strong>dam</strong> is built across a river to store water at a height in a <strong>reservoir</strong>. When the sluice gates are opened, water rushes down through pipes and falls with great force on the <strong>blades of a turbine</strong>. The rotating turbine turns the shaft of a <strong>generator (dynamo)</strong>, which converts mechanical energy into electrical energy. The water then flows back to the river. About <strong>25% of India's electricity requirement</strong> is met through hydro power plants.</>
  },
  {
    q: "Why is charcoal considered a better fuel than wood?",
    a: <>Charcoal is better than wood because:<br/><br/><strong>(i)</strong> It does <em>not</em> contain water or other volatile materials that are present in wood.<br/><br/><strong>(ii)</strong> It burns <strong>without smoke and without flame</strong>, causing less air pollution.<br/><br/><strong>(iii)</strong> It has a <strong>higher calorific value</strong> than wood, so less fuel produces more heat. Charcoal is produced by burning wood in a limited supply of oxygen.</>
  },
  {
    q: "Why is the solar cooker box covered with a plane glass plate?",
    a: <>The glass plate acts as a <strong>one-way trap for heat</strong>. It allows <em>shorter-wavelength infrared radiation</em> from the Sun to pass through into the box, but does <em>not</em> allow the <em>longer-wavelength infrared radiation</em> re-emitted by the hot objects inside to escape. This creates a <strong>greenhouse effect</strong>, causing the temperature inside the box to rise and allowing food to cook. Without the glass plate, heat would escape by radiation and convection, and the temperature would not rise enough to cook.</>
  },
  {
    q: "Why is nuclear fission reaction considered better than burning fossil fuels?",
    a: <>Nuclear fission is considered better because:<br/><br/><strong>(i) Enormous energy release:</strong> The fission of 1 kg of Uranium-235 releases energy equivalent to burning <strong>2,500 tonnes of coal</strong>.<br/><br/><strong>(ii) Long-lasting fuel:</strong> The nuclear fuel is inserted <em>once</em> and produces energy over a long period of time — no constant refuelling needed.<br/><br/><strong>(iii) No air pollution:</strong> Unlike fossil fuels, fission does <em>not</em> release CO₂, SO₂ or NO₂, so there is no direct greenhouse or acid rain contribution. However, it produces <strong>radioactive waste</strong> which must be disposed of carefully.</>
  },
  {
    q: "Why is the use of wood as a domestic fuel not considered good?",
    a: <><strong>(i)</strong> Burning wood produces <strong>a lot of smoke</strong>, which causes air pollution and respiratory problems.<br/><br/><strong>(ii)</strong> Cutting trees for firewood leads to <strong>deforestation</strong>, loss of wildlife habitat, and soil erosion — trees also take decades to grow back.<br/><br/><strong>(iii)</strong> Wood has a <strong>low calorific value</strong> compared to cleaner fuels like LPG or biogas, making it inefficient.</>
  },
  {
    q: "Distinguish between renewable and non-renewable sources of energy. Which is better and why?",
    a: <><strong>Renewable sources</strong> (solar, wind, biogas, hydro, geothermal, ocean) are <em>naturally replenished</em> and will last for a very long time — essentially forever on human timescales. They are generally <em>clean</em> and eco-friendly.<br/><br/><strong>Non-renewable sources</strong> (coal, petroleum, natural gas) were formed over millions of years and are finite — once consumed, they cannot be replenished within practical timescales. They <em>pollute</em> the environment and contribute to global warming.<br/><br/><strong>Renewable sources are better</strong> because they are <em>inexhaustible</em>, <em>pollution-free</em>, and sustainable. However, they currently cost more to set up and may not be reliable in all locations, so a gradual transition is needed.</>
  }
];

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
export default function Chapter14SourcesOfEnergy() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <FontLink />
      <style>{styles}</style>

      <div className="soe-root">
        {/* ══════════ HERO ══════════ */}
        <div className="soe-hero">
          <div className="soe-glow-1" />
          <div className="soe-glow-2" />
          <div className="soe-glow-3" />

          {/* Energy sources SVG watermark */}
          <svg className="soe-hero-svg" viewBox="0 0 500 700" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            {/* Sun at top */}
            <circle cx="250" cy="180" r="55" fill="none" stroke="rgba(124,58,237,0.3)" strokeWidth="2"/>
            <circle cx="250" cy="180" r="35" fill="rgba(124,58,237,0.08)"/>
            {/* Sun rays */}
            {Array.from({length:12}).map((_,i)=>{
              const angle = (i*30)*Math.PI/180;
              const x1 = 250 + Math.cos(angle)*65;
              const y1 = 180 + Math.sin(angle)*65;
              const x2 = 250 + Math.cos(angle)*82;
              const y2 = 180 + Math.sin(angle)*82;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(196,181,253,0.35)" strokeWidth="2" strokeLinecap="round"/>;
            })}
            {/* Windmill blades (middle left) */}
            <circle cx="130" cy="400" r="4" fill="rgba(196,181,253,0.5)"/>
            <line x1="130" y1="400" x2="130" y2="355" stroke="rgba(196,181,253,0.35)" strokeWidth="2.5"/>
            <line x1="130" y1="400" x2="170" y2="420" stroke="rgba(196,181,253,0.35)" strokeWidth="2.5"/>
            <line x1="130" y1="400" x2="90" y2="420" stroke="rgba(196,181,253,0.35)" strokeWidth="2.5"/>
            <line x1="130" y1="400" x2="130" y2="500" stroke="rgba(196,181,253,0.25)" strokeWidth="2"/>
            {/* Atom (middle right) */}
            <g transform="translate(370,400)">
              <ellipse cx="0" cy="0" rx="45" ry="18" fill="none" stroke="rgba(124,58,237,0.3)" strokeWidth="1.5"/>
              <ellipse cx="0" cy="0" rx="45" ry="18" fill="none" stroke="rgba(124,58,237,0.25)" strokeWidth="1.5" transform="rotate(60)"/>
              <ellipse cx="0" cy="0" rx="45" ry="18" fill="none" stroke="rgba(124,58,237,0.2)" strokeWidth="1.5" transform="rotate(120)"/>
              <circle cx="0" cy="0" r="4" fill="rgba(196,181,253,0.6)"/>
            </g>
            {/* Water waves (bottom) */}
            <path d="M40,600 Q100,585 160,600 T280,600 T400,600 T480,600" fill="none" stroke="rgba(124,58,237,0.25)" strokeWidth="2"/>
            <path d="M40,620 Q100,605 160,620 T280,620 T400,620 T480,620" fill="none" stroke="rgba(124,58,237,0.2)" strokeWidth="2"/>
            <path d="M40,640 Q100,625 160,640 T280,640 T400,640 T480,640" fill="none" stroke="rgba(124,58,237,0.15)" strokeWidth="2"/>
            {/* Lightning/spark accents */}
            <polygon points="80,250 95,275 88,275 100,300" fill="none" stroke="rgba(245,158,11,0.35)" strokeWidth="1.5"/>
            <polygon points="420,250 405,275 412,275 400,300" fill="none" stroke="rgba(245,158,11,0.35)" strokeWidth="1.5"/>
          </svg>

          <div className="soe-hero-inner">
            <div className="soe-subject-pill">
              <span className="soe-pill-dot" />
              Physics · Class X · Science
            </div>
            <div className="soe-hero-eyebrow">Chapter 14 · NCERT Science</div>
            <h1 className="soe-hero-title">
              <span className="t1">Sources</span>
              <span className="t2">of</span>
              <span className="t3">Energy</span>
            </h1>
            <p className="soe-hero-desc">
              From burning coal to harnessing sunlight — explore how humanity powers itself. Conventional and non-conventional sources, solar cookers, biogas plants, wind farms, ocean energy and nuclear reactors.
            </p>
            <div className="soe-hero-stats">
              {[
                {num:<>1.4 kJ/s·m<sup>2</sup></>, label:"Solar Constant"},
                {num:"75%",   label:"Methane in Biogas"},
                {num:"25%",   label:"India's Hydro Share"},
                {num:"5th",   label:"India Wind Rank"},
              ].map((s,i) => (
                <div className="soe-hero-stat" key={i}>
                  <div className="soe-stat-num">{s.num}</div>
                  <div className="soe-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════ BODY ══════════ */}
        <div className="soe-body">

          {/* ══ INTRO (Ch13 pattern: 3fr + 2fr dark sidebar) ══ */}
          <div className="soe-intro">
            <div>
              <div className="soe-intro-kicker">Chapter Overview</div>
              <h2 className="soe-intro-headline">Where <em>Every Watt Begins</em></h2>
              <p className="soe-intro-body-text">
                Energy comes in many forms and can be converted from one to another. Drop a plate and its <strong>potential energy</strong> becomes sound. Light a candle and <strong>chemical energy</strong> becomes heat and light. But where does the electricity in our homes, the fuel in our vehicles, and the power behind our factories actually come from?
              </p>
              <p className="soe-intro-body-text">
                This chapter maps the entire landscape of energy sources — from ancient <strong>fossil fuels</strong> formed over millions of years, to modern <strong>solar cells</strong> and <strong>nuclear reactors</strong>, to futuristic <strong>OTEC plants</strong> that tap the ocean's warmth. We'll see why no single source is perfect, and why the choice of energy defines the fate of our planet.
              </p>
            </div>
            <div className="soe-intro-sidebar">
              <div className="soe-sidebar-label">Topics Covered</div>
              <div className="soe-sidebar-title-lg">What You'll Learn</div>
              <ul className="soe-sidebar-list-ul">
                {[
                  "What Makes a Good Energy Source",
                  "Renewable vs Non-Renewable",
                  "Fossil Fuels & Thermal Plants",
                  "Hydro Power & Big Dams",
                  "Biomass & Biogas Plants",
                  "Wind Energy & Windmills",
                  "Solar Cookers, Cells & Panels",
                  "Sea, Geothermal & Nuclear Energy",
                ].map((t,i) => (
                  <li className="soe-sidebar-item-li" key={i}>
                    <span className="soe-sidebar-num-lg">{i+1}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ══════════ SECTIONS START BELOW ══════════ */}

          {/* ═══ SECTION 1: GOOD ENERGY SOURCE + RENEWABLE DIVIDE ═══ */}
          <div className="soe-ch-divider">
            <div className="soe-ch-badge"><span className="soe-ch-num">01</span><span className="soe-ch-text">Good Energy Source &amp; Renewable Divide</span></div>
          </div>
          <section>
            <div className="soe-sec-head">
              <span className="soe-sec-num">1</span>
              <div className="soe-sec-kicker">The Foundation</div>
              <h2 className="soe-sec-title">What Makes a <span>Good Energy Source?</span></h2>
            </div>

            <div className="soe-body-text">
              <p>
                Before we dive into specific sources, we need to know what to look for. A <strong>good source of energy</strong> is judged on four key criteria — get all four right, and you have a reliable fuel for an economy.
              </p>
            </div>

            {/* 4 Criteria Cards */}
            <div className="soe-criteria-grid">
              <div className="soe-crit-card">
                <div className="soe-crit-num">01</div>
                <div className="soe-crit-title">High Calorific Value</div>
                <div className="soe-crit-desc">Produces a large amount of heat per unit mass burned.</div>
              </div>
              <div className="soe-crit-card">
                <div className="soe-crit-num">02</div>
                <div className="soe-crit-title">Easily Accessible</div>
                <div className="soe-crit-desc">Available in sufficient quantity, not limited to rare regions.</div>
              </div>
              <div className="soe-crit-card">
                <div className="soe-crit-num">03</div>
                <div className="soe-crit-title">Easy to Store &amp; Transport</div>
                <div className="soe-crit-desc">Can be safely moved and stockpiled without hazard or rapid loss.</div>
              </div>
              <div className="soe-crit-card">
                <div className="soe-crit-num">04</div>
                <div className="soe-crit-title">Economical</div>
                <div className="soe-crit-desc">Cost-effective to extract, process, and deliver to the end user.</div>
              </div>
            </div>

            <div className="soe-pull-quote">
              "Among the sources of energy, some get exhausted — those are non-renewable. Others never run out — those are renewable."
            </div>

            {/* Renewable vs Non-renewable Contrast */}
            <div className="soe-contrast">
              <div className="soe-contrast-col">
                <div className="soe-con-tag renew">Renewable</div>
                <div className="soe-con-title">Never Run Out</div>
                <div className="soe-con-desc">Replenished naturally by the Sun, wind, water cycles, or biological processes on timescales that matter for humans. Typically cleaner and more sustainable.</div>
                <div className="soe-con-list">
                  <div className="soe-con-item"><div className="soe-con-dot renew"></div>Solar radiation from the Sun</div>
                  <div className="soe-con-item"><div className="soe-con-dot renew"></div>Wind — powered by uneven heating</div>
                  <div className="soe-con-item"><div className="soe-con-dot renew"></div>Flowing water (hydro)</div>
                  <div className="soe-con-item"><div className="soe-con-dot renew"></div>Ocean waves &amp; tidal energy</div>
                  <div className="soe-con-item"><div className="soe-con-dot renew"></div>Geothermal heat from Earth's core</div>
                  <div className="soe-con-item"><div className="soe-con-dot renew"></div>Biomass &amp; biogas from organic waste</div>
                </div>
                <div className="soe-con-examples">Sun · Wind · Water · Biomass · Geothermal</div>
              </div>
              <div className="soe-contrast-col">
                <div className="soe-con-tag nonrenew">Non-Renewable</div>
                <div className="soe-con-title">Will Get Exhausted</div>
                <div className="soe-con-desc">Formed over millions of years from buried plant and animal remains. Reserves are finite — once burned, they're gone for human timescales. Major polluters.</div>
                <div className="soe-con-list">
                  <div className="soe-con-item"><div className="soe-con-dot nonrenew"></div>Coal — fossilised plant matter</div>
                  <div className="soe-con-item"><div className="soe-con-dot nonrenew"></div>Petroleum — crude oil from ancient marine life</div>
                  <div className="soe-con-item"><div className="soe-con-dot nonrenew"></div>Natural gas — often found alongside oil</div>
                  <div className="soe-con-item"><div className="soe-con-dot nonrenew"></div>Nuclear fuels like Uranium (finite ore)</div>
                </div>
                <div className="soe-con-examples">Coal · Petroleum · Natural Gas</div>
              </div>
            </div>
          </section>

          <div className="soe-ch-divider">
            <div className="soe-ch-badge"><span className="soe-ch-num">02</span><span className="soe-ch-text">Conventional Sources — Fossil Fuels, Hydro &amp; Biomass</span></div>
          </div>

          {/* ═══ SECTION 2: CONVENTIONAL SOURCES ═══ */}
          <section>
            <div className="soe-sec-head">
              <span className="soe-sec-num">2</span>
              <div className="soe-sec-kicker">The Old Giants</div>
              <h2 className="soe-sec-title">Conventional Sources <span>— Fossil Fuels, Hydro &amp; Biomass</span></h2>
            </div>

            <div className="soe-conv-intro">
              <strong>Conventional sources</strong> are those humanity has used for decades or centuries — coal and petroleum power thermal plants, dammed rivers generate hydroelectricity, and agricultural waste fuels biogas plants. They dominate our grids today, but each comes with serious trade-offs.
            </div>

            <div className="soe-conv-list">
              <div className="soe-conv-item">
                <div className="soe-conv-icon-col"><Icon id="flame" size={28} color="#fff"/></div>
                <div className="soe-conv-content">
                  <div className="soe-conv-tag">01 · Fossil Fuel</div>
                  <div className="soe-conv-name">Coal &amp; Petroleum</div>
                  <div className="soe-conv-desc">
                    Fuels formed over <strong>millions of years</strong> from buried plant and animal remains under heat and pressure. India holds about <strong>6% of world coal reserves</strong> — enough for roughly 250 more years at current rates. But burning them releases oxides of carbon, nitrogen, and sulphur, which are <strong>acidic</strong> and cause <strong>air pollution, acid rain, and the greenhouse effect</strong>.
                  </div>
                </div>
              </div>

              <div className="soe-conv-item">
                <div className="soe-conv-icon-col"><Icon id="factory" size={28} color="#fff"/></div>
                <div className="soe-conv-content">
                  <div className="soe-conv-tag">02 · Conversion Plant</div>
                  <div className="soe-conv-name">Thermal Power Plant</div>
                  <div className="soe-conv-desc">
                    Huge amounts of fossil fuel are burnt to heat water and produce <strong>steam</strong>. The steam is directed onto the blades of a <strong>turbine</strong>, spinning the rotor. This mechanical motion turns the shaft of a generator, which converts it into electricity. The chain: <em>chemical → heat → kinetic → electrical</em>.
                  </div>
                </div>
              </div>

              <div className="soe-conv-item">
                <div className="soe-conv-icon-col"><Icon id="droplet" size={28} color="#fff"/></div>
                <div className="soe-conv-content">
                  <div className="soe-conv-tag">03 · Hydro Power</div>
                  <div className="soe-conv-name">Hydroelectric Plant</div>
                  <div className="soe-conv-desc">
                    Converts the <strong>potential energy of stored water</strong> into electricity. Since natural waterfalls are rare, we build <strong>large dams</strong> across rivers. Water stored high in the reservoir rushes down, turns turbine blades, which drive generators. Around <strong>25% of India's energy requirement</strong> comes from hydro.
                  </div>
                </div>
              </div>

              <div className="soe-conv-item">
                <div className="soe-conv-icon-col"><Icon id="leaf" size={28} color="#fff"/></div>
                <div className="soe-conv-content">
                  <div className="soe-conv-tag">04 · Biomass</div>
                  <div className="soe-conv-name">Biogas Plant &amp; Charcoal</div>
                  <div className="soe-conv-desc">
                    Biomass — firewood, cattle dung, crop waste, bagasse — has <strong>low calorific value</strong> and produces a lot of smoke when burnt raw. Technology fixes this: cow dung becomes efficient <strong>biogas</strong> (75% methane) through anaerobic decomposition. <strong>Charcoal</strong>, made by heating wood with limited O₂, burns without smoke and has high calorific value — it strips out the water and volatiles.
                  </div>
                </div>
              </div>
            </div>

            {/* Hydropower SVG diagram */}
            <div className="soe-diagram-wrap">
              <div className="soe-diagram-title">Hydroelectric Power Plant</div>
              <svg viewBox="0 0 560 320" xmlns="http://www.w3.org/2000/svg" style={{width:"100%", maxWidth:"520px"}}>
                {/* Sky */}
                <rect x="0" y="0" width="560" height="320" fill="transparent"/>
                {/* Reservoir water (high) */}
                <rect x="380" y="40" width="180" height="120" fill="rgba(125,211,252,0.35)" stroke="rgba(125,211,252,0.6)" strokeWidth="1.5"/>
                <path d="M380,50 Q420,45 460,50 T540,50" fill="none" stroke="rgba(224,242,254,0.7)" strokeWidth="1.2"/>
                <path d="M380,60 Q420,55 460,60 T540,60" fill="none" stroke="rgba(224,242,254,0.5)" strokeWidth="1"/>
                <text x="470" y="32" fill="rgba(186,230,253,0.9)" fontSize="11" fontFamily="Poppins,sans-serif" fontWeight="600" textAnchor="middle">RESERVOIR</text>
                {/* Dam wall */}
                <path d="M340,40 L380,40 L380,220 L340,220 Z" fill="rgba(156,163,175,0.4)" stroke="rgba(209,213,219,0.7)" strokeWidth="1.5"/>
                <text x="360" y="34" fill="rgba(196,181,253,0.85)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="600" textAnchor="middle">DAM</text>
                {/* Penstock pipe (water rushing down) */}
                <path d="M380,130 L340,130 L200,200 L180,210" fill="none" stroke="rgba(125,211,252,0.8)" strokeWidth="14" strokeLinecap="round"/>
                <path d="M380,130 L340,130 L200,200" fill="none" stroke="rgba(224,242,254,0.5)" strokeWidth="3"/>
                {/* Turbine */}
                <circle cx="180" cy="215" r="22" fill="rgba(139,92,246,0.25)" stroke="rgba(196,181,253,0.8)" strokeWidth="2"/>
                <g transform="translate(180,215)">
                  <line x1="0" y1="-18" x2="0" y2="18" stroke="rgba(196,181,253,0.9)" strokeWidth="2"/>
                  <line x1="-18" y1="0" x2="18" y2="0" stroke="rgba(196,181,253,0.9)" strokeWidth="2"/>
                  <line x1="-13" y1="-13" x2="13" y2="13" stroke="rgba(196,181,253,0.9)" strokeWidth="2"/>
                  <line x1="-13" y1="13" x2="13" y2="-13" stroke="rgba(196,181,253,0.9)" strokeWidth="2"/>
                  <circle cx="0" cy="0" r="4" fill="rgba(196,181,253,1)"/>
                </g>
                <text x="180" y="254" fill="rgba(196,181,253,0.8)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="600" textAnchor="middle">TURBINE</text>
                {/* Shaft to generator */}
                <line x1="158" y1="215" x2="90" y2="215" stroke="rgba(196,181,253,0.6)" strokeWidth="2" strokeDasharray="3,3"/>
                {/* Generator */}
                <rect x="40" y="195" width="50" height="40" rx="4" fill="rgba(124,58,237,0.3)" stroke="rgba(196,181,253,0.8)" strokeWidth="1.8"/>
                <text x="65" y="219" fill="#fff" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700" textAnchor="middle">GEN</text>
                <text x="65" y="252" fill="rgba(196,181,253,0.8)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="600" textAnchor="middle">GENERATOR</text>
                {/* Electric lines going up */}
                <path d="M40,205 Q30,160 25,110" fill="none" stroke="rgba(252,211,77,0.7)" strokeWidth="1.5"/>
                <path d="M25,110 L20,80 M25,110 L30,80" stroke="rgba(252,211,77,0.7)" strokeWidth="1.5"/>
                <text x="25" y="70" fill="rgba(252,211,77,0.9)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="600" textAnchor="middle">TO GRID</text>
                {/* Downstream river */}
                <path d="M180,240 Q140,250 100,255 Q60,260 0,262" fill="none" stroke="rgba(125,211,252,0.55)" strokeWidth="5" strokeLinecap="round"/>
                <text x="90" y="280" fill="rgba(125,211,252,0.7)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="600" textAnchor="middle">TO RIVER</text>
                {/* Sluice gate arrow */}
                <line x1="390" y1="200" x2="410" y2="200" stroke="rgba(196,181,253,0.5)" strokeWidth="1"/>
                <text x="440" y="204" fill="rgba(196,181,253,0.7)" fontSize="9" fontFamily="Poppins,sans-serif" fontWeight="600">sluice gate</text>
              </svg>
              <div className="soe-diagram-caption">
                Stored water at height → rushes down the penstock → turns turbine blades → spins generator shaft → produces electricity.
              </div>
            </div>

            <div className="soe-alert">
              <div className="soe-alert-icon"><Icon id="warn" size={22}/></div>
              <div className="soe-alert-text">
                <strong>Disadvantages of big dams:</strong> Submerging of large areas of flora, fauna, and human settlements. Rotting of submerged vegetation releases <strong>methane (CH₄)</strong> — a potent greenhouse gas. Dams also pose risks of earthquakes and landslides.
              </div>
            </div>

            {/* Biogas plant diagram */}
            <div className="soe-diagram-wrap">
              <div className="soe-diagram-title">Biogas (Gobar Gas) Plant</div>
              <svg viewBox="0 0 560 280" xmlns="http://www.w3.org/2000/svg" style={{width:"100%", maxWidth:"520px"}}>
                {/* Ground line */}
                <line x1="0" y1="220" x2="560" y2="220" stroke="rgba(180,130,90,0.4)" strokeWidth="1"/>
                {/* Underground digester (circle, partly underground) */}
                <circle cx="280" cy="180" r="80" fill="rgba(124,58,237,0.1)" stroke="rgba(196,181,253,0.6)" strokeWidth="1.8"/>
                {/* Gas dome on top */}
                <path d="M225,180 A55,55 0 0 1 335,180 Z" fill="rgba(124,58,237,0.25)" stroke="rgba(196,181,253,0.8)" strokeWidth="1.8"/>
                <text x="280" y="155" fill="rgba(196,181,253,0.9)" fontSize="11" fontFamily="Poppins,sans-serif" fontWeight="700" textAnchor="middle">GAS DOME</text>
                {/* Slurry level */}
                <line x1="228" y1="182" x2="332" y2="182" stroke="rgba(180,130,90,0.6)" strokeWidth="1" strokeDasharray="3,3"/>
                <text x="280" y="210" fill="rgba(180,130,90,0.9)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="600" textAnchor="middle">SLURRY (cow dung + water)</text>
                {/* Inlet (left) — slurry in */}
                <path d="M160,150 L220,175 L220,195 L160,170 Z" fill="rgba(180,130,90,0.3)" stroke="rgba(180,130,90,0.7)" strokeWidth="1.5"/>
                <text x="155" y="140" fill="rgba(196,181,253,0.9)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700" textAnchor="middle">SLURRY IN</text>
                <path d="M155,145 L165,155" stroke="rgba(180,130,90,0.7)" strokeWidth="1.5"/>
                <polygon points="163,155 172,158 168,150" fill="rgba(180,130,90,0.7)"/>
                {/* Gas outlet (top) */}
                <line x1="280" y1="125" x2="280" y2="85" stroke="rgba(252,211,77,0.8)" strokeWidth="3"/>
                <rect x="270" y="75" width="20" height="12" rx="2" fill="rgba(252,211,77,0.4)" stroke="rgba(252,211,77,0.9)" strokeWidth="1.5"/>
                <text x="280" y="65" fill="rgba(252,211,77,0.95)" fontSize="11" fontFamily="Poppins,sans-serif" fontWeight="700" textAnchor="middle">GAS OUTLET</text>
                {/* Pipe to stove */}
                <path d="M290,81 Q380,60 430,80" fill="none" stroke="rgba(252,211,77,0.7)" strokeWidth="2"/>
                <circle cx="432" cy="82" r="6" fill="rgba(139,92,246,0.4)" stroke="rgba(252,211,77,0.9)" strokeWidth="1.5"/>
                <text x="455" y="86" fill="rgba(252,211,77,0.85)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="600">stove</text>
                {/* Outlet (right) — manure out */}
                <path d="M340,175 L400,150 L400,170 L340,195 Z" fill="rgba(180,130,90,0.3)" stroke="rgba(180,130,90,0.7)" strokeWidth="1.5"/>
                <text x="410" y="140" fill="rgba(162,201,137,0.95)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700" textAnchor="middle">MANURE OUT</text>
                <path d="M410,145 L400,155" stroke="rgba(162,201,137,0.8)" strokeWidth="1.5"/>
                <polygon points="402,155 393,158 397,150" fill="rgba(162,201,137,0.8)"/>
                {/* Labels */}
                <text x="280" y="260" fill="rgba(196,181,253,0.7)" fontSize="11" fontFamily="Poppins,sans-serif" fontWeight="600" textAnchor="middle" fontStyle="italic">
                  anaerobic decomposition by microbes → 75% CH₄
                </text>
              </svg>
              <div className="soe-diagram-caption">
                Cow dung + water slurry enters the digester. Microbes break it down anaerobically, producing biogas (mostly methane). The gas collects in the dome and flows to kitchen stoves. Spent slurry exits as nitrogen-rich manure.
              </div>
            </div>

          </section>

          <div className="soe-ch-divider">
            <div className="soe-ch-badge"><span className="soe-ch-num">03</span><span className="soe-ch-text">Wind Energy &amp; Wind Farms</span></div>
          </div>

          {/* ═══ SECTION 3: WIND ENERGY ═══ */}
          <section>
            <div className="soe-sec-head">
              <span className="soe-sec-num">3</span>
              <div className="soe-sec-kicker">Harnessing Moving Air</div>
              <h2 className="soe-sec-title">Wind Energy <span>&amp; Wind Farms</span></h2>
            </div>

            <div className="soe-body-text">
              <p>
                <strong>Unequal heating</strong> of landmasses and water bodies by solar radiation creates pressure differences, which generate air movement — the wind. This kinetic energy can lift water from wells or, more importantly, generate electricity. A windmill's rotating blades spin the rotor of a turbine connected to a dynamo.
              </p>
              <p>
                A single windmill is tiny in output, so many are built together across open land — a <strong>wind energy farm</strong>. <strong>India ranks 5th</strong> in the world for wind-power generation; full exploitation of the country's wind potential could produce nearly <strong>45,000 MW</strong> of electricity.
              </p>
            </div>

            <div className="soe-formula-box">
              <div>
                <div className="soe-formula-label">Minimum Wind Speed Required</div>
                <div className="soe-formula-main">15–20 km/h</div>
              </div>
              <div className="soe-formula-desc">
                Below this speed, the blades don't rotate fast enough to generate useful sustained electricity. Steady winds are critical.
              </div>
            </div>

            {/* Advantages vs Limitations */}
            <div className="soe-pc-wrap">
              <div className="soe-pc-col">
                <div className="soe-pc-hdr">
                  <div className="soe-pc-icon pro"><Icon id="check" size={18} color="#fff"/></div>
                  <div className="soe-pc-label">Advantages</div>
                </div>
                <div className="soe-pc-list">
                  <div className="soe-pc-item"><div className="soe-pc-num pro">1</div><div className="soe-pc-text"><strong>Eco-friendly</strong> — no air pollution, no greenhouse gases, no ash.</div></div>
                  <div className="soe-pc-item"><div className="soe-pc-num pro">2</div><div className="soe-pc-text">An <strong>efficient renewable source</strong> — the wind keeps blowing as long as the Sun heats the Earth.</div></div>
                  <div className="soe-pc-item"><div className="soe-pc-num pro">3</div><div className="soe-pc-text"><strong>No recurring expenses</strong> for fuel — once installed, electricity is essentially free.</div></div>
                </div>
              </div>
              <div className="soe-pc-col">
                <div className="soe-pc-hdr">
                  <div className="soe-pc-icon con"><Icon id="cross" size={18} color="#fff"/></div>
                  <div className="soe-pc-label">Limitations</div>
                </div>
                <div className="soe-pc-list">
                  <div className="soe-pc-item"><div className="soe-pc-num con">1</div><div className="soe-pc-text">Wind farms need <strong>large areas of land</strong> — unsuitable for densely populated regions.</div></div>
                  <div className="soe-pc-item"><div className="soe-pc-num con">2</div><div className="soe-pc-text">Difficulty in getting <strong>regular wind speeds</strong> of 15–20 km/h all year round.</div></div>
                  <div className="soe-pc-item"><div className="soe-pc-num con">3</div><div className="soe-pc-text"><strong>High initial cost</strong> of setting up a wind farm.</div></div>
                  <div className="soe-pc-item"><div className="soe-pc-num con">4</div><div className="soe-pc-text"><strong>High maintenance</strong> of blades, exposed to sun, rain, and storms.</div></div>
                </div>
              </div>
            </div>
          </section>

          <div className="soe-ch-divider">
            <div className="soe-ch-badge"><span className="soe-ch-num">04</span><span className="soe-ch-text">Solar Energy — Cookers, Cells &amp; Panels</span></div>
          </div>

          {/* ═══ SECTION 4: SOLAR ENERGY ═══ */}
          <section>
            <div className="soe-sec-head">
              <span className="soe-sec-num">4</span>
              <div className="soe-sec-kicker">Non-Conventional Energy · Pt 1</div>
              <h2 className="soe-sec-title">Solar Energy <span>— Cookers, Cells &amp; Panels</span></h2>
            </div>

            <div className="soe-body-text">
              <p>
                The energy emitted by the Sun as heat and light is <strong>solar energy</strong>. It reaches the outer edge of Earth's atmosphere at a remarkably constant rate — a value we call the <strong>solar constant</strong>.
              </p>
            </div>

            <div className="soe-formula-box">
              <div>
                <div className="soe-formula-label">Solar Constant</div>
                <div className="soe-formula-main">1.4 kJ/s·m<sup>2</sup></div>
              </div>
              <div className="soe-formula-desc">
                The amount of solar energy received per second per square metre at the outer edge of Earth's atmosphere. Much of this is reflected or absorbed before reaching the ground.
              </div>
            </div>

            <div className="soe-body-text">
              <p>
                Solar heating devices exploit two simple physics tricks: <strong>black surfaces absorb more heat</strong> than white or shiny ones, and <strong>glass plates</strong> let short-wavelength sunlight in but block the longer-wavelength infrared radiation from escaping — trapping heat inside. This is the <em>greenhouse effect</em>, put to useful work.
              </p>
            </div>

            {/* Solar devices grid */}
            <div className="soe-dev-grid">
              <div className="soe-dev-card">
                <div className="soe-dev-icon"><Icon id="thermo" size={22}/></div>
                <div className="soe-dev-name">Solar Cooker</div>
                <div className="soe-dev-desc">Box-type cooker: rectangular plastic/wood box, inner walls painted <strong>black</strong>, covered with a <strong>glass plate</strong>, with <strong>plane mirrors</strong> as reflectors to focus rays and raise temperature.</div>
              </div>
              <div className="soe-dev-card">
                <div className="soe-dev-icon"><Icon id="battery" size={22}/></div>
                <div className="soe-dev-name">Solar Cell</div>
                <div className="soe-dev-desc">Directly converts solar energy into electricity. Develops <strong>0.5–1 V</strong> and produces about <strong>0.7 W</strong>. Made from <strong>silicon</strong>; <strong>silver</strong> is used for inter-cell connections.</div>
              </div>
              <div className="soe-dev-card">
                <div className="soe-dev-icon"><Icon id="flame" size={22}/></div>
                <div className="soe-dev-name">Solar Furnace</div>
                <div className="soe-dev-desc">Uses an array of curved mirrors to focus sunlight to a single point, reaching extremely high temperatures — used in industrial heating and materials research.</div>
              </div>
              <div className="soe-dev-card">
                <div className="soe-dev-icon"><Icon id="droplet" size={22}/></div>
                <div className="soe-dev-name">Solar Water Heater</div>
                <div className="soe-dev-desc">Water circulates through black pipes inside a glass-covered insulated box. Sunlight heats the water for domestic use — popular in rooftops across India.</div>
              </div>
            </div>

            {/* Solar cooker diagram */}
            <div className="soe-diagram-wrap">
              <div className="soe-diagram-title">Box-Type Solar Cooker</div>
              <svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg" style={{width:"100%", maxWidth:"520px"}}>
                {/* Sun rays */}
                {[0,1,2,3,4].map(i => {
                  const x = 80 + i*30;
                  return <line key={i} x1={x} y1="20" x2={x+60} y2="120" stroke="rgba(252,211,77,0.7)" strokeWidth="1.5"/>;
                })}
                {[0,1,2,3,4].map(i => {
                  const x = 80 + i*30;
                  return <polygon key={`a${i}`} points={`${x+60-4},${120-4} ${x+60},${120} ${x+60-6},${120-1}`} fill="rgba(252,211,77,0.7)"/>;
                })}
                <text x="120" y="15" fill="rgba(252,211,77,0.95)" fontSize="11" fontFamily="Poppins,sans-serif" fontWeight="700">SUN RAYS</text>
                {/* Plane mirror (tilted at top) */}
                <polygon points="140,130 370,60 380,75 150,145" fill="rgba(200,200,220,0.5)" stroke="rgba(224,231,255,0.8)" strokeWidth="1.5"/>
                <text x="260" y="55" fill="rgba(224,231,255,0.9)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700" textAnchor="middle">PLANE MIRROR (reflector)</text>
                {/* Reflected rays going down into box */}
                {[0,1,2].map(i => {
                  const x = 200 + i*40;
                  return <line key={`r${i}`} x1={x} y1="120" x2={x-20} y2="200" stroke="rgba(252,211,77,0.85)" strokeWidth="1.5"/>;
                })}
                {[0,1,2].map(i => {
                  const x = 200 + i*40 - 20;
                  return <polygon key={`ra${i}`} points={`${x-3},${200-6} ${x},${200} ${x-6},${200-3}`} fill="rgba(252,211,77,0.85)"/>;
                })}
                {/* Wooden outer box */}
                <rect x="130" y="200" width="300" height="60" fill="rgba(120,53,15,0.45)" stroke="rgba(124,58,237,0.7)" strokeWidth="2"/>
                <text x="430" y="237" fill="rgba(196,181,253,0.9)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="600">WOODEN BOX</text>
                {/* Inner metallic (black) box */}
                <rect x="155" y="215" width="250" height="40" fill="rgba(10,10,10,0.7)" stroke="rgba(196,181,253,0.6)" strokeWidth="1.5"/>
                <text x="155" y="275" fill="rgba(196,181,253,0.85)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="600">INNER METALLIC (BLACK) BOX</text>
                {/* Glass cover (line on top of inner box) */}
                <line x1="155" y1="215" x2="405" y2="215" stroke="rgba(186,230,253,0.9)" strokeWidth="2.5"/>
                <text x="105" y="215" fill="rgba(186,230,253,0.95)" fontSize="10" fontFamily="Poppins,sans-serif" fontWeight="700" textAnchor="end">GLASS COVER →</text>
                {/* Black container (cooking pot inside) */}
                <rect x="245" y="225" width="70" height="22" fill="rgba(30,30,30,0.9)" stroke="rgba(196,181,253,0.5)" strokeWidth="1"/>
                <text x="280" y="240" fill="rgba(196,181,253,0.95)" fontSize="9" fontFamily="Poppins,sans-serif" fontWeight="700" textAnchor="middle">FOOD</text>
              </svg>
              <div className="soe-diagram-caption">
                Plane mirror focuses sunlight into the box. Short infrared passes through glass, is absorbed by the black interior, raises temperature; long infrared can't escape — food cooks slowly.
              </div>
            </div>

            {/* Solar cell uses */}
            <div className="soe-body-text">
              <p>
                A <strong>solar panel</strong> is just many solar cells connected together. Panels power everyday electronics — <strong>calculators, watches, street lights</strong> — and critical systems like <strong>artificial satellites, space probes,</strong> and <strong>remote-area radio &amp; wireless transmission</strong>. They need almost zero maintenance, have no moving parts, and don't need a Sun-tracking device, though efficiency is still modest and upfront cost is high.
              </p>
            </div>
          </section>

          <div className="soe-ch-divider">
            <div className="soe-ch-badge"><span className="soe-ch-num">05</span><span className="soe-ch-text">Sea, Geothermal &amp; Nuclear Power</span></div>
          </div>

          {/* ═══ SECTION 5: SEA, GEOTHERMAL & NUCLEAR ═══ */}
          <section>
            <div className="soe-sec-head">
              <span className="soe-sec-num">5</span>
              <div className="soe-sec-kicker">Non-Conventional Energy · Pt 2</div>
              <h2 className="soe-sec-title">Sea, Geothermal <span>&amp; Nuclear Power</span></h2>
            </div>

            <div className="soe-body-text">
              <p>
                Beyond sun and wind, the Earth itself holds vast reservoirs of energy — in the motion of its oceans, the heat of its interior, and the nuclei of its atoms. These non-conventional sources are promising, but each has technical and environmental challenges.
              </p>
            </div>

            {/* Ocean 3-card grid */}
            <div className="soe-ocean-grid">
              <div className="soe-ocean-card">
                <div className="soe-ocean-icon"><Icon id="wave" size={22}/></div>
                <div className="soe-ocean-tag">Form 1</div>
                <div className="soe-ocean-name">Wave Energy</div>
                <div className="soe-ocean-desc">Strong winds across the sea generate waves. The kinetic energy of moving water rotates the turbine of a generator. <em>Limitation:</em> when the wind stops, so does electricity.</div>
              </div>
              <div className="soe-ocean-card">
                <div className="soe-ocean-icon"><Icon id="droplet" size={22}/></div>
                <div className="soe-ocean-tag">Form 2</div>
                <div className="soe-ocean-name">Tidal Energy</div>
                <div className="soe-ocean-desc">Tides are caused by the <strong>gravitational pull of the Moon</strong>. A dam across a narrow sea opening traps rising water; turbines at the opening convert the flow into electricity.</div>
              </div>
              <div className="soe-ocean-card">
                <div className="soe-ocean-icon"><Icon id="thermo" size={22}/></div>
                <div className="soe-ocean-tag">Form 3</div>
                <div className="soe-ocean-name">OTEC</div>
                <div className="soe-ocean-desc"><strong>Ocean Thermal Energy Conversion.</strong> Needs ≥20°C difference between surface and 2 km-deep water. Warm water boils ammonia; vapour drives a turbine; cold deep water condenses it.</div>
              </div>
            </div>

            {/* Geothermal */}
            <div className="soe-conv-item" style={{marginTop:"24px"}}>
              <div className="soe-conv-icon-col" style={{background:"linear-gradient(160deg,#dc2626 0%,#7f1d1d 100%)"}}>
                <Icon id="sprout" size={28} color="#fff"/>
              </div>
              <div className="soe-conv-content">
                <div className="soe-conv-tag" style={{color:"#be123c"}}>Earth's Inner Heat</div>
                <div className="soe-conv-name">Geothermal Energy</div>
                <div className="soe-conv-desc">
                  Energy stored as heat inside the Earth. Pipes are sunk through holes drilled in the Earth's crust to reach pockets of <strong>underground steam</strong>. The <strong>high-pressure steam</strong> rotates turbines of a generator, producing electricity. Found near volcanic regions and hot springs — Iceland and New Zealand run significant portions of their grids on it.
                </div>
              </div>
            </div>

            {/* Nuclear: Fission vs Fusion */}
            <h3 style={{fontFamily:"'Montserrat',sans-serif",fontSize:"22px",fontWeight:800,color:"var(--ink)",marginTop:"36px",marginBottom:"8px",letterSpacing:"-0.01em"}}>
              Nuclear Energy — <span style={{color:"var(--solar2)",fontStyle:"italic"}}>splitting &amp; merging atoms</span>
            </h3>
            <div className="soe-body-text">
              <p>
                Nuclear energy is the energy stored in the <strong>nucleus of an atom</strong>, released during two kinds of reactions.
              </p>
            </div>

            <div className="soe-nuc-wrap">
              <div className="soe-nuc-col">
                <div className="soe-nuc-tag fiss">Nuclear Fission</div>
                <div className="soe-nuc-name">Splitting a Heavy Nucleus</div>
                <div className="soe-nuc-desc">
                  The nucleus of a heavy atom like <strong>Uranium-235</strong>, when bombarded with a <strong>low-energy neutron</strong>, splits into lighter nuclei — releasing a <strong>huge amount of energy</strong>. This is the process used in nuclear reactors to produce electricity.
                </div>
                <div className="soe-nuc-eq">¹n + ²³⁵U → fragments + energy + neutrons</div>
              </div>
              <div className="soe-nuc-col">
                <div className="soe-nuc-tag fuse">Nuclear Fusion</div>
                <div className="soe-nuc-name">Merging Light Nuclei</div>
                <div className="soe-nuc-desc">
                  Two <strong>lighter nuclei</strong> (like hydrogen isotopes) join together to form a heavier nucleus, releasing a <strong>tremendous amount of energy</strong>. This is how the <em>Sun and stars</em> produce energy — and what fusion research hopes to achieve on Earth.
                </div>
                <div className="soe-nuc-eq">²H + ³H → ⁴He + n + energy</div>
              </div>
            </div>

            <div className="soe-plants-block">
              <div className="soe-plants-label">Major Nuclear Power Plants in India</div>
              <div className="soe-plants-list">
                <div className="soe-plant-pill">Tarapur (Maharashtra)</div>
                <div className="soe-plant-pill">Rana Pratap Sagar (Rajasthan)</div>
                <div className="soe-plant-pill">Kalpakkam (Tamil Nadu)</div>
                <div className="soe-plant-pill">Narora (UP)</div>
                <div className="soe-plant-pill">Kaiga (Karnataka)</div>
              </div>
            </div>

            <div className="soe-pc-wrap">
              <div className="soe-pc-col">
                <div className="soe-pc-hdr">
                  <div className="soe-pc-icon pro"><Icon id="check" size={18} color="#fff"/></div>
                  <div className="soe-pc-label">Nuclear Pros</div>
                </div>
                <div className="soe-pc-list">
                  <div className="soe-pc-item"><div className="soe-pc-num pro">1</div><div className="soe-pc-text"><strong>Enormous energy</strong> per unit fuel — 1 kg Uranium ≈ 2,500 tonnes of coal.</div></div>
                  <div className="soe-pc-item"><div className="soe-pc-num pro">2</div><div className="soe-pc-text">Nuclear fuel is inserted <strong>once</strong> and produces energy over a long period.</div></div>
                </div>
              </div>
              <div className="soe-pc-col">
                <div className="soe-pc-hdr">
                  <div className="soe-pc-icon con"><Icon id="cross" size={18} color="#fff"/></div>
                  <div className="soe-pc-label">Nuclear Cons</div>
                </div>
                <div className="soe-pc-list">
                  <div className="soe-pc-item"><div className="soe-pc-num con">1</div><div className="soe-pc-text"><strong>Very high installation cost</strong> for reactor and safety systems.</div></div>
                  <div className="soe-pc-item"><div className="soe-pc-num con">2</div><div className="soe-pc-text">Risk of <strong>environmental contamination</strong> from improper disposal of radioactive waste.</div></div>
                </div>
              </div>
            </div>

            {/* Environmental consequences */}
            <div className="soe-alert">
              <div className="soe-alert-icon"><Icon id="globe" size={22}/></div>
              <div className="soe-alert-text">
                <strong>Environmental consequences:</strong> Every energy source — renewable or not — has an impact. Use <strong>clean fuels like CNG</strong> to reduce greenhouse effect. Even manufacturing solar cells causes some environmental damage. Use energy <em>judiciously</em>, and the world lasts longer.
              </div>
            </div>

            <div className="soe-pull-quote">
              "The cheapest, cleanest, safest unit of energy is the one you never used in the first place."
            </div>

          </section>

        </div>

        {/* ══════════ FAQ ══════════ */}
        <section className="soe-faq-wrap">
          <div className="soe-faq-kicker">End of Chapter · Practice</div>
          <h2 className="soe-faq-title">Frequently Asked <span>Questions</span></h2>

          {faqData.map((item, idx) => (
            <div key={idx} className="soe-faq-q">
              <button
                className="soe-faq-header"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                aria-expanded={openFaq === idx}
              >
                <span className="soe-faq-q-text">{item.q}</span>
                <span className="soe-faq-icon">{openFaq === idx ? "▴" : "▾"}</span>
              </button>
              {openFaq === idx && (
                <div className="soe-faq-ans-inner">{item.a}</div>
              )}
            </div>
          ))}
        </section>

      </div>
    </>
  );
}
