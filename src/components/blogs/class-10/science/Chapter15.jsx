import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=DM+Sans:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --forest:     #14532d;
    --forest2:    #052e16;
    --forest-lt:  #dcfce7;
    --forest-mid: #86efac;
    --sky:        #0369a1;
    --sky2:       #0c4a6e;
    --sky-lt:     #e0f2fe;
    --sky-mid:    #7dd3fc;
    --sun:        #b45309;
    --sun-lt:     #fffbeb;
    --sun-mid:    #fcd34d;
    --earth:      #78350f;
    --earth-lt:   #fef3c7;
    --earth-mid:  #fbbf24;
    --danger:     #991b1b;
    --danger-lt:  #fee2e2;
    --danger-mid: #fca5a5;
    --teal:       #0f766e;
    --teal-lt:    #ccfbf1;
    --teal-mid:   #5eead4;
    --purple:     #6d28d9;
    --purple-lt:  #ede9fe;
    --purple-mid: #c4b5fd;
    --paper:      #f0faf4;
    --paper2:     #e6f7ec;
    --ink:        #071a0e;
    --ink2:       #0f2d1a;
    --muted:      #3d6b4f;
    --rule:       #c3e6cf;
    --white:      #ffffff;
  }
  * { box-sizing:border-box; margin:0; padding:0; }
  .oe-root { font-family:'DM Sans',sans-serif; background:var(--paper); color:var(--ink); min-height:100vh; }

  /* ═══ HERO ═══ */
  .oe-hero {
    background:linear-gradient(160deg,#020f06 0%,#052e16 50%,#071a0e 100%);
    min-height:100vh; position:relative; overflow:hidden;
    display:flex; flex-direction:column; justify-content:center;
    padding:80px 0 72px;
  }
  .oe-hero::before { content:''; position:absolute; top:0; left:0; right:0; height:5px; background:linear-gradient(90deg,#14532d 0%,#22c55e 20%,#0369a1 40%,#0ea5e9 60%,#b45309 80%,#ef4444 100%); }
  .oe-hero-grid {
    position:absolute; inset:0; pointer-events:none;
    background-image:linear-gradient(rgba(20,83,45,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(20,83,45,0.1) 1px,transparent 1px);
    background-size:52px 52px;
  }
  .oe-glow-1 { position:absolute; top:-5%; left:5%; width:480px; height:480px; border-radius:50%; background:radial-gradient(circle,rgba(20,83,45,0.2) 0%,transparent 65%); pointer-events:none; }
  .oe-glow-2 { position:absolute; bottom:0%; right:5%; width:380px; height:380px; border-radius:50%; background:radial-gradient(circle,rgba(3,105,161,0.15) 0%,transparent 65%); pointer-events:none; }
  .oe-glow-3 { position:absolute; top:30%; right:20%; width:260px; height:260px; border-radius:50%; background:radial-gradient(circle,rgba(180,83,9,0.1) 0%,transparent 65%); pointer-events:none; }

  /* Ecosystem SVG watermark */
  .oe-hero-eco { position:absolute; right:0; top:0; width:48%; height:100%; pointer-events:none; opacity:0.3; }

  .oe-hero-inner { max-width:960px; width:100%; margin:0 auto; padding:0 40px; position:relative; z-index:2; }

  .oe-subject-pill {
    display:inline-flex; align-items:center; gap:8px;
    border:1px solid rgba(20,83,45,0.5); background:rgba(20,83,45,0.2);
    border-radius:6px; padding:6px 16px; margin-bottom:28px;
    font-size:11px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; color:var(--forest-mid);
  }
  .oe-pill-dot { width:6px; height:6px; border-radius:50%; background:var(--forest-mid); }
  .oe-hero-eyebrow { font-size:11px; font-weight:600; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:14px; }
  .oe-hero-title {
    font-family:'Playfair Display',serif; font-weight:900;
    font-size:clamp(42px,6vw,80px); line-height:1.0;
    letter-spacing:-0.02em; color:#fff; margin-bottom:10px;
  }
  .oe-hero-title .t1 { display:block; }
  .oe-hero-title .t2 { display:block; color:var(--forest-mid); font-style:italic; }
  .oe-hero-title .t3 { display:block; color:rgba(255,255,255,0.3); font-size:0.5em; font-style:normal; font-weight:700; letter-spacing:0.01em; margin-top:6px; }
  .oe-hero-desc { font-size:16px; color:rgba(255,255,255,0.55); line-height:1.8; max-width:540px; margin:20px 0 40px; }
  .oe-hero-stats { display:flex; gap:0; border:1px solid rgba(255,255,255,0.08); border-radius:10px; overflow:hidden; width:fit-content; flex-wrap:wrap; }
  .oe-hero-stat { padding:14px 26px; border-right:1px solid rgba(255,255,255,0.08); }
  .oe-hero-stat:last-child { border-right:none; }
  .oe-stat-num { font-family:'Playfair Display',serif; font-size:22px; font-weight:800; color:var(--forest-mid); line-height:1; margin-bottom:4px; }
  .oe-stat-label { font-size:11px; color:rgba(255,255,255,0.35); font-weight:500; letter-spacing:0.06em; }

  /* ═══ BODY ═══ */
  .oe-body { max-width:920px; margin:0 auto; padding:80px 32px 100px; }

  /* ═══ INTRO ═══ */
  .oe-intro { display:grid; grid-template-columns:3fr 2fr; gap:40px; margin-bottom:72px; align-items:start; }
  @media(max-width:640px){.oe-intro{grid-template-columns:1fr;}}
  .oe-intro-kicker { font-size:10px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:var(--forest); margin-bottom:12px; display:flex; align-items:center; gap:10px; }
  .oe-intro-kicker::after { content:''; width:48px; height:1px; background:var(--forest-mid); }
  .oe-intro-headline { font-family:'Playfair Display',serif; font-size:clamp(22px,3vw,30px); font-weight:800; color:var(--ink); line-height:1.2; margin-bottom:16px; }
  .oe-intro-headline em { font-style:italic; color:var(--forest); }
  .oe-intro-body { font-size:16px; line-height:1.85; color:var(--ink2); margin-bottom:14px; }
  .oe-intro-body strong { color:var(--forest2); font-weight:600; }
  .oe-intro-sidebar { background:linear-gradient(160deg,#020f06,#052e16); border-radius:14px; padding:26px 22px; position:relative; overflow:hidden; }
  .oe-intro-sidebar::before { content:''; position:absolute; top:-20px; right:-20px; width:100px; height:100px; border-radius:50%; background:rgba(20,83,45,0.15); }
  .oe-sidebar-label { font-size:9px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(134,239,172,0.6); margin-bottom:12px; }
  .oe-sidebar-title { font-family:'Playfair Display',serif; font-size:17px; font-weight:800; color:#fff; margin-bottom:14px; line-height:1.3; }
  .oe-sidebar-list { list-style:none; padding:0; }
  .oe-sidebar-item { display:flex; align-items:center; gap:10px; padding:7px 0; border-bottom:1px solid rgba(255,255,255,0.07); font-size:13px; color:rgba(255,255,255,0.7); }
  .oe-sidebar-item:last-child { border-bottom:none; }
  .oe-sidebar-num { font-family:'Playfair Display',serif; font-size:20px; font-weight:800; color:var(--forest-mid); flex-shrink:0; width:26px; line-height:1; }

  /* ═══ CHAPTER DIVIDER ═══ */
  .oe-chapter-divider { display:flex; align-items:center; gap:20px; margin:64px 0 48px; }
  .oe-chapter-divider::before, .oe-chapter-divider::after { content:''; flex:1; height:1px; background:var(--rule); }
  .oe-ch-badge { display:flex; align-items:center; gap:10px; background:var(--forest); border-radius:8px; padding:9px 22px; font-size:12px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#fff; white-space:nowrap; }
  .oe-ch-num { font-family:'Playfair Display',serif; font-size:16px; color:var(--forest-mid); font-weight:800; }

  /* ═══ SEC HEADER ═══ */
  .oe-sec-head { margin-bottom:28px; }
  .oe-sec-num { font-family:'Playfair Display',serif; font-size:80px; font-weight:900; color:var(--forest-lt); line-height:0.85; letter-spacing:-0.04em; display:block; margin-bottom:2px; }
  .oe-sec-kicker { font-size:10px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--forest); margin-bottom:6px; }
  .oe-sec-title { font-family:'Playfair Display',serif; font-size:clamp(22px,3.5vw,32px); font-weight:800; color:var(--ink); line-height:1.15; border-bottom:2px solid var(--rule); padding-bottom:14px; }
  .oe-sec-title span { color:var(--forest); font-style:italic; }

  /* ═══ BODY TEXT ═══ */
  .oe-body-text { font-size:16px; line-height:1.85; color:var(--ink2); margin-bottom:24px; }
  .oe-body-text strong { color:var(--forest2); font-weight:600; }

  /* ═══ DIVIDER ═══ */
  .oe-divider { margin:52px 0; display:flex; align-items:center; gap:14px; }
  .oe-divider::before, .oe-divider::after { content:''; flex:1; height:1px; background:var(--rule); }
  .oe-divider-mark { width:8px; height:8px; border-radius:50%; background:var(--forest); flex-shrink:0; }

  /* ═══ ALERT ═══ */
  .oe-alert { padding:14px 18px; border-radius:8px; font-size:14px; line-height:1.7; margin-bottom:16px; }
  .oe-alert.green  { background:var(--forest-lt); color:var(--forest2); border-left:4px solid var(--forest); }
  .oe-alert.sky    { background:var(--sky-lt); color:var(--sky2); border-left:4px solid var(--sky); }
  .oe-alert.danger { background:var(--danger-lt); color:var(--danger); border-left:4px solid var(--danger); }
  .oe-alert.sun    { background:var(--sun-lt); color:var(--earth); border-left:4px solid var(--sun); }
  .oe-alert.teal   { background:var(--teal-lt); color:var(--teal); border-left:4px solid var(--teal); }
  .oe-alert strong { font-weight:700; }

  /* ═══ PULL QUOTE ═══ */
  .oe-pull-quote { border-left:5px solid var(--forest); background:var(--forest-lt); padding:22px 30px; margin:28px 0; border-radius:0 8px 8px 0; }
  .oe-pull-quote p { font-family:'Playfair Display',serif; font-size:17px; font-style:italic; font-weight:700; color:var(--forest2); line-height:1.7; margin:0; }

  /* ═══ WASTE COMPARE ═══ */
  .oe-waste-compare { display:grid; grid-template-columns:1fr 1fr; gap:0; border:1.5px solid var(--rule); border-radius:12px; overflow:hidden; margin-bottom:28px; }
  @media(max-width:600px){.oe-waste-compare{grid-template-columns:1fr;}}
  .oe-wc-col { padding:24px 24px 28px; display:flex; flex-direction:column; }
  .oe-wc-col.biodeg    { background:linear-gradient(160deg,#020f06,#052e16); }
  .oe-wc-col.nonbiodeg { background:var(--white); border-left:2px solid var(--rule); }
  .oe-wc-badge { display:inline-block; padding:4px 14px; border-radius:100px; margin-bottom:12px; font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; }
  .biodeg    .oe-wc-badge { background:rgba(20,83,45,0.3); color:var(--forest-mid); }
  .nonbiodeg .oe-wc-badge { background:var(--danger-lt); color:var(--danger); }
  .oe-wc-title { font-family:'Playfair Display',serif; font-size:21px; font-weight:800; margin-bottom:6px; }
  .biodeg    .oe-wc-title { color:var(--forest-mid); }
  .nonbiodeg .oe-wc-title { color:var(--ink); }
  .oe-wc-def { font-size:13.5px; line-height:1.7; margin-bottom:14px; }
  .biodeg    .oe-wc-def { color:rgba(255,255,255,0.6); }
  .nonbiodeg .oe-wc-def { color:var(--muted); }
  .oe-wc-list { display:flex; flex-direction:column; gap:8px; flex:1; }
  .oe-wc-item { display:flex; gap:9px; font-size:14px; line-height:1.65; align-items:flex-start; }
  .biodeg    .oe-wc-item { color:rgba(255,255,255,0.75); }
  .nonbiodeg .oe-wc-item { color:var(--ink2); }
  .oe-wc-dot { min-width:6px; height:6px; border-radius:50%; margin-top:8px; flex-shrink:0; }
  .biodeg    .oe-wc-dot { background:var(--forest-mid); }
  .nonbiodeg .oe-wc-dot { background:var(--danger); }
  .oe-wc-item strong { font-weight:600; }
  .biodeg    .oe-wc-item strong { color:var(--forest-mid); }
  .nonbiodeg .oe-wc-item strong { color:var(--danger); }
  @media(max-width:600px){.nonbiodeg{border-left:none;border-top:2px solid var(--rule);}}

  /* ═══ 7Rs GRID ═══ */
  .oe-7r-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:28px; }
  @media(max-width:640px){.oe-7r-grid{grid-template-columns:repeat(2,1fr);}}
  .oe-7r-card { background:var(--white); border-radius:10px; padding:16px 14px; border:1.5px solid var(--rule); text-align:center; border-top:3px solid var(--forest); }
  .oe-7r-card:nth-child(2){border-top-color:var(--teal);}
  .oe-7r-card:nth-child(3){border-top-color:var(--sky);}
  .oe-7r-card:nth-child(4){border-top-color:var(--sun);}
  .oe-7r-card:nth-child(5){border-top-color:var(--purple);}
  .oe-7r-card:nth-child(6){border-top-color:var(--danger);}
  .oe-7r-card:nth-child(7){border-top-color:var(--earth);}
  .oe-7r-icon { font-size:24px; display:block; margin-bottom:8px; }
  .oe-7r-name { font-family:'Playfair Display',serif; font-size:15px; font-weight:800; color:var(--ink); margin-bottom:4px; }
  .oe-7r-desc { font-size:12px; color:var(--muted); line-height:1.5; }

  /* ═══ ECOLOGICAL HIERARCHY ═══ */
  .oe-hierarchy { display:flex; flex-direction:column; gap:0; margin-bottom:28px; border:1.5px solid var(--rule); border-radius:14px; overflow:hidden; }
  .oe-hier-row { display:grid; grid-template-columns:180px 1fr; align-items:center; border-bottom:1px solid var(--rule); }
  .oe-hier-row:last-child { border-bottom:none; }
  .oe-hier-label { padding:16px 20px; display:flex; align-items:center; gap:12px; }
  .oe-hier-icon  { font-size:22px; flex-shrink:0; }
  .oe-hier-name  { font-family:'Playfair Display',serif; font-size:15px; font-weight:800; color:var(--ink); }
  .oe-hier-desc  { padding:16px 20px; font-size:14px; color:var(--ink2); line-height:1.65; border-left:1px solid var(--rule); }
  .oe-hier-desc strong { color:var(--forest2); font-weight:600; }
  .oe-hier-row:nth-child(odd) { background:var(--paper2); }
  .oe-hier-row:nth-child(even){ background:var(--white); }

  /* ═══ ECOSYSTEM COMPONENTS ═══ */
  .oe-eco-components { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:28px; }
  @media(max-width:640px){.oe-eco-components{grid-template-columns:1fr;}}
  .oe-eco-card { background:var(--white); border-radius:12px; border:1.5px solid var(--rule); display:flex; flex-direction:column; overflow:hidden; }
  .oe-eco-hdr  { padding:16px 18px 12px; }
  .oe-eco-hdr.abiotic  { background:linear-gradient(135deg,#021020,#062040); }
  .oe-eco-hdr.biotic   { background:linear-gradient(135deg,#020f06,#052e16); }
  .oe-eco-tag  { font-size:9px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; margin-bottom:5px; }
  .abiotic .oe-eco-tag { color:rgba(125,211,252,0.7); }
  .biotic  .oe-eco-tag { color:rgba(134,239,172,0.7); }
  .oe-eco-name { font-family:'Playfair Display',serif; font-size:17px; font-weight:800; color:#fff; }
  .abiotic .oe-eco-name { color:var(--sky-mid); }
  .biotic  .oe-eco-name { color:var(--forest-mid); }
  .oe-eco-body { padding:14px 18px; flex:1; }
  .oe-eco-item { display:flex; gap:8px; font-size:14px; color:var(--ink2); padding:7px 0; border-bottom:1px solid var(--rule); line-height:1.6; align-items:flex-start; }
  .oe-eco-item:last-child { border-bottom:none; }
  .oe-eco-dot  { min-width:6px; height:6px; border-radius:50%; margin-top:8px; flex-shrink:0; }
  .abiotic-dot { background:var(--sky); }
  .biotic-dot  { background:var(--forest); }
  .oe-eco-item strong { color:var(--ink); font-weight:600; }

  /* ═══ TROPHIC LEVELS PYRAMID ═══ */
  .oe-pyramid-wrap { background:var(--white); border-radius:14px; border:1.5px solid var(--rule); overflow:hidden; margin-bottom:28px; box-shadow:0 4px 20px rgba(20,83,45,0.07); }
  .oe-pyramid-header { background:linear-gradient(90deg,var(--forest2),var(--forest)); padding:14px 24px; display:flex; align-items:center; gap:12px; }
  .oe-pyramid-title { font-family:'Playfair Display',serif; font-size:16px; font-weight:800; color:#fff; }
  .oe-pyramid-sub   { font-size:12px; color:rgba(255,255,255,0.5); margin-left:auto; }
  .oe-pyramid-body  { padding:28px; display:flex; flex-direction:column; align-items:center; gap:0; }
  .oe-trophic-level { display:flex; align-items:center; gap:16px; width:100%; max-width:640px; margin-bottom:8px; }
  .oe-tl-bar-wrap   { flex:1; display:flex; align-items:center; }
  .oe-tl-bar        { height:46px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; color:#fff; padding:0 16px; position:relative; transition:width 0.3s; }
  .oe-tl-bar span   { white-space:nowrap; font-size:12px; }
  .oe-tl-info       { min-width:160px; }
  .oe-tl-num        { font-family:'Playfair Display',serif; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:2px; }
  .oe-tl-name       { font-family:'Playfair Display',serif; font-size:14px; font-weight:800; color:var(--ink); }
  .oe-tl-eg         { font-size:12px; color:var(--muted); }
  .oe-tl-energy     { font-family:'Playfair Display',serif; font-size:13px; font-weight:700; min-width:80px; text-align:right; }
  .oe-pyramid-note  { background:var(--forest-lt); border-radius:10px; padding:14px 20px; font-size:14px; color:var(--forest2); line-height:1.7; width:100%; max-width:640px; border-left:4px solid var(--forest); margin-top:12px; }
  .oe-pyramid-note strong { font-weight:700; }

  /* ═══ FOOD CHAIN FLOW ═══ */
  .oe-foodchain-flow {
    background:var(--white); border-radius:14px; border:1.5px solid var(--rule);
    overflow:hidden; margin-bottom:28px;
  }
  .oe-fc-header { background:linear-gradient(90deg,var(--forest2),var(--forest)); padding:14px 24px; display:flex; align-items:center; gap:12px; }
  .oe-fc-title  { font-family:'Playfair Display',serif; font-size:16px; font-weight:800; color:#fff; }
  .oe-fc-sub    { font-size:12px; color:rgba(255,255,255,0.5); margin-left:auto; }
  .oe-fc-body   { padding:24px; }
  .oe-fc-steps  { display:flex; align-items:center; justify-content:flex-start; flex-wrap:wrap; gap:8px; margin-bottom:20px; }
  .oe-fc-step   { display:flex; flex-direction:column; align-items:center; text-align:center; gap:6px; min-width:80px; flex:1; }
  .oe-fc-circle { width:52px; height:52px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; border:2px solid var(--rule); background:var(--forest-lt); }
  .oe-fc-name   { font-family:'Playfair Display',serif; font-size:11px; font-weight:700; color:var(--ink); line-height:1.3; }
  .oe-fc-sub2   { font-size:10px; color:var(--muted); }
  .oe-fc-arrow  { font-size:22px; color:var(--forest); flex-shrink:0; }
  .oe-fc-examples { display:flex; flex-direction:column; gap:10px; }
  .oe-fc-eg-row { display:flex; align-items:center; gap:8px; background:var(--paper2); border-radius:8px; padding:10px 16px; flex-wrap:wrap; }
  .oe-fc-eg-label { font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--forest); min-width:80px; }
  .oe-fc-eg-chain { display:flex; align-items:center; gap:6px; flex-wrap:wrap; }
  .oe-fc-eg-item { font-size:13px; font-weight:600; color:var(--ink2); background:var(--white); border:1px solid var(--rule); border-radius:6px; padding:3px 10px; }
  .oe-fc-eg-arr  { font-size:14px; color:var(--forest); }

  /* ═══ 10% LAW CARD ═══ */
  .oe-ten-law {
    background:linear-gradient(135deg,#020f06,#052e16);
    border-radius:14px; padding:28px 32px; margin-bottom:28px;
    border:1px solid rgba(20,83,45,0.4); position:relative; overflow:hidden;
  }
  .oe-ten-law::after { content:'10%'; position:absolute; right:24px; top:50%; transform:translateY(-50%); font-family:'Playfair Display',serif; font-size:100px; font-weight:900; color:rgba(134,239,172,0.06); line-height:1; }
  .oe-ten-label { font-size:10px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(134,239,172,0.6); margin-bottom:16px; }
  .oe-ten-title { font-family:'Playfair Display',serif; font-size:22px; font-weight:800; color:var(--forest-mid); margin-bottom:12px; }
  .oe-ten-desc  { font-size:15px; color:rgba(255,255,255,0.7); line-height:1.8; margin-bottom:20px; }
  .oe-ten-desc strong { color:var(--forest-mid); }
  .oe-ten-flow  { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
  .oe-ten-box   { background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); border-radius:8px; padding:10px 16px; text-align:center; }
  .oe-ten-box-num   { font-family:'Playfair Display',serif; font-size:18px; font-weight:800; color:var(--forest-mid); }
  .oe-ten-box-label { font-size:11px; color:rgba(255,255,255,0.5); margin-top:2px; }
  .oe-ten-arr   { font-size:18px; color:rgba(255,255,255,0.25); }
  .oe-ten-loss  { font-size:11px; color:rgba(255,255,255,0.35); text-align:center; margin-top:2px; }

  /* ═══ BIOMAGNIFICATION CARD ═══ */
  .oe-biomag-card { background:var(--white); border-radius:14px; border:1.5px solid var(--rule); overflow:hidden; margin-bottom:28px; }
  .oe-biomag-top  { background:linear-gradient(90deg,#3b0000,#6b0000); padding:14px 24px; display:flex; align-items:center; gap:12px; }
  .oe-biomag-title { font-family:'Playfair Display',serif; font-size:16px; font-weight:800; color:#fff; }
  .oe-biomag-body  { padding:24px; display:grid; grid-template-columns:1fr 1fr; gap:20px; align-items:start; }
  @media(max-width:580px){.oe-biomag-body{grid-template-columns:1fr;}}
  .oe-biomag-def  { font-size:15px; color:var(--ink2); line-height:1.8; }
  .oe-biomag-def strong { color:var(--danger); font-weight:600; }
  .oe-biomag-levels { display:flex; flex-direction:column; gap:8px; }
  .oe-biomag-level { padding:10px 12px; border-radius:8px; border:1px solid var(--rule); }
  .oe-biomag-level-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; }
  .oe-biomag-level-name { font-size:13px; font-weight:700; color:var(--ink2); }
  .oe-biomag-level-name strong { color:var(--danger); }
  .oe-biomag-level-conc { font-size:12px; font-weight:700; color:var(--muted); white-space:nowrap; margin-left:8px; }
  .oe-biomag-level-track { width:100%; height:14px; background:rgba(0,0,0,0.06); border-radius:100px; overflow:hidden; }
  .oe-biomag-level-bar { height:14px; border-radius:100px; flex-shrink:0; }

  /* ═══ OZONE DEPLETION ═══ */
  .oe-ozone-card {
    background:linear-gradient(135deg,#020915,#051428);
    border-radius:14px; padding:28px 32px; margin-bottom:28px;
    border:1px solid rgba(3,105,161,0.3); position:relative; overflow:hidden;
  }
  .oe-ozone-card::before { content:''; position:absolute; top:-30%; right:-10%; width:280px; height:280px; border-radius:50%; background:radial-gradient(circle,rgba(3,105,161,0.15) 0%,transparent 65%); }
  .oe-ozone-label { font-size:10px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(125,211,252,0.7); margin-bottom:16px; }
  .oe-ozone-header { display:flex; align-items:flex-start; gap:20px; margin-bottom:20px; flex-wrap:wrap; }
  .oe-ozone-icon  { font-size:48px; flex-shrink:0; }
  .oe-ozone-intro { flex:1; }
  .oe-ozone-title { font-family:'Playfair Display',serif; font-size:20px; font-weight:800; color:var(--sky-mid); margin-bottom:8px; }
  .oe-ozone-desc  { font-size:14px; color:rgba(255,255,255,0.65); line-height:1.75; }
  .oe-ozone-desc strong { color:var(--sky-mid); }
  .oe-ozone-grid  { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  @media(max-width:580px){.oe-ozone-grid{grid-template-columns:1fr;}}
  .oe-ozone-section-title { font-family:'Playfair Display',serif; font-size:14px; font-weight:800; color:var(--sky-mid); margin-bottom:10px; }
  .oe-ozone-item  { display:flex; gap:8px; font-size:13px; color:rgba(255,255,255,0.65); padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.06); line-height:1.6; align-items:flex-start; }
  .oe-ozone-item:last-child { border-bottom:none; }
  .oe-ozone-dot   { min-width:6px; height:6px; border-radius:50%; background:var(--sky-mid); margin-top:7px; flex-shrink:0; }
  .oe-ozone-item strong { color:var(--sky-mid); font-weight:600; }
  /* Reaction box */
  .oe-rxn-box { background:rgba(255,255,255,0.05); border-radius:8px; padding:14px 18px; margin:14px 0; border:1px solid rgba(255,255,255,0.08); }
  .oe-rxn-row { display:flex; align-items:center; gap:8px; padding:7px 0; border-bottom:1px solid rgba(255,255,255,0.06); flex-wrap:wrap; }
  .oe-rxn-row:last-child { border-bottom:none; }
  .oe-rxn-num  { font-size:10px; font-weight:700; color:rgba(125,211,252,0.5); min-width:22px; }
  .oe-rxn-f    { font-size:14px; font-weight:700; color:var(--sky-mid); }
  .oe-rxn-f sub, .oe-rxn-f sup { font-size:0.7em; }
  .oe-rxn-arr  { font-size:16px; color:rgba(255,255,255,0.3); }
  .oe-rxn-note { font-size:11px; color:rgba(255,255,255,0.4); font-style:italic; margin-left:6px; }

  /* ═══ FAQ ═══ */
  .oe-faq-header { margin-bottom:12px; }
  .oe-faq-kicker { font-size:11px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--forest); background:var(--forest-lt); padding:6px 18px; border-radius:100px; }
  .oe-faq-title  { font-family:'Playfair Display',serif; font-size:clamp(26px,4vw,36px); font-weight:900; color:var(--ink); letter-spacing:-0.02em; margin:16px 0 28px; }
  .oe-faq-item   { border:1.5px solid var(--rule); border-radius:8px; margin-bottom:12px; overflow:hidden; background:var(--white); transition:border-color 0.2s; }
  .oe-faq-item.open { border-color:var(--forest); }
  .oe-faq-q      { width:100%; background:none; border:none; cursor:pointer; display:flex; justify-content:space-between; align-items:center; padding:20px 24px; text-align:left; gap:16px; }
  .oe-faq-q-text { font-family:'DM Sans',sans-serif; font-size:15px; font-weight:600; color:var(--ink); line-height:1.5; }
  .oe-faq-item.open .oe-faq-q-text { color:var(--forest); }
  .oe-faq-icon   { font-family:'Playfair Display',serif; font-size:22px; font-weight:800; color:var(--forest); flex-shrink:0; transition:transform 0.2s; }
  .oe-faq-item.open .oe-faq-icon { transform:rotate(45deg); }
  .oe-faq-ans    { font-size:14.5px; color:var(--ink2); line-height:1.85; padding:0 24px; max-height:0; overflow:hidden; transition:max-height 0.35s ease,padding 0.35s ease; }
  .oe-faq-ans.visible { max-height:1000px; padding:0 24px 22px; }
  .oe-faq-ans strong { color:var(--forest2); font-weight:600; }
  .oe-faq-ans code   { font-family:'DM Sans',sans-serif; font-size:13px; background:var(--forest-lt); padding:1px 6px; border-radius:3px; color:var(--forest2); }

  @media(max-width:700px){
    .oe-body{padding:48px 18px 72px;}
    .oe-sec-num{font-size:60px;}
  }
`;

const faqs = [
  {
    q: "What are biodegradable and non-biodegradable wastes? Give examples.",
    a: (<><strong>Biodegradable wastes:</strong><br/>
      Wastes that can be broken down by biological processes (decomposed by microbes using enzymes).<br/>
      • Mainly produced from plant and animal sources<br/>
      • Examples: food scraps, vegetable peels, paper, cotton, wood, dead leaves, dung<br/>
      • Microbes digest and consume this organic waste<br/><br/>
      <strong>Non-biodegradable wastes:</strong><br/>
      Wastes that cannot be broken down by biological processes.<br/>
      • Usually man-made substances<br/>
      • Examples: plastic, metal, glass, DDT, synthetic fibres, nuclear waste<br/>
      • Persist in the environment for very long periods<br/>
      • Often toxic and accumulate in food chains (biomagnification)<br/><br/>
      <strong>Waste management:</strong> Use blue bins for non-biodegradable, green bins for biodegradable. Follow the 7 Rs: Reduce, Reuse, Recycle, Refuse, Rethink, Research, Regulation.</>),
  },
  {
    q: "What is the ecological hierarchy? Define each level.",
    a: (<><strong>Ecological hierarchy</strong> (from smallest to largest):<br/><br/>
      1. <strong>Organism</strong> — basic unit; can be unicellular (Amoeba, Paramecium) or multicellular (humans, trees)<br/>
      2. <strong>Population</strong> — group of individuals of the SAME species in a geographical area at a particular time<br/>
      3. <strong>Community</strong> — all individuals of DIFFERENT species living in the same geographical area<br/>
      4. <strong>Ecosystem</strong> — both living (biotic) AND non-living (abiotic) components of an area interacting together<br/>
      5. <strong>Biosphere</strong> — sum total of ALL ecosystems on Earth and their interactions<br/><br/>
      <strong>Key distinction:</strong> Population = same species; Community = different species</>),
  },
  {
    q: "What are the components of an ecosystem? Distinguish between biotic and abiotic factors.",
    a: (<><strong>Abiotic factors</strong> — non-living components:<br/>
      Light, temperature, water, air, soil, minerals, humidity, pH<br/><br/>
      <strong>Biotic factors</strong> — living organisms, classified by feeding:<br/>
      • <strong>Autotrophs/Producers</strong> — make own food from inorganic raw materials (plants, algae) — 1st trophic level<br/>
      • <strong>Herbivores/Primary consumers</strong> — feed on plants (deer, grasshopper, sheep) — 2nd trophic level<br/>
      • <strong>Carnivores/Secondary consumers</strong> — eat herbivores (frog, cat, spider) — 3rd trophic level<br/>
      • <strong>Tertiary consumers</strong> — eat secondary consumers (eagle, shark) — 4th trophic level<br/>
      • <strong>Omnivores</strong> — eat both plants and animals (bear, humans)<br/>
      • <strong>Decomposers</strong> — break down dead organic matter; recycle nutrients (bacteria, fungi)<br/><br/>
      <strong>Functions of ecosystem:</strong> Productivity (organic matter production) and Decomposition/recycling of nutrients</>),
  },
  {
    q: "What is a food chain? What is a food web?",
    a: (<><strong>Food chain:</strong> A linear sequence of organisms where each organism is eaten by the next member.<br/>
      Energy flows from producers → consumers in one direction.<br/><br/>
      <strong>Example:</strong><br/>
      <code>Plants → Grasshopper → Frog → Snake → Eagle</code><br/><br/>
      <strong>Generalised food chain:</strong><br/>
      <code>Producers → Primary consumers → Secondary consumers → Tertiary consumers → Decomposers</code><br/><br/>
      <strong>Food web:</strong> An interconnected network of multiple food chains in an ecosystem. More realistic than a single food chain — most organisms eat more than one type of food.<br/><br/>
      <strong>Trophic level:</strong> The position or level of an organism in a food chain based on its source of nutrition. Producers = 1st trophic level; herbivores = 2nd trophic level, etc.</>),
  },
  {
    q: "Explain the 10% law of energy transfer. Why are food chains short?",
    a: (<><strong>10% Law (Lindemann's Law):</strong><br/>
      Only <strong>10% of the energy</strong> is transferred from one trophic level to the next higher trophic level. The remaining 90% is lost as heat during metabolic processes.<br/><br/>
      <strong>Example:</strong><br/>
      • Producers absorb: 1,000,000 J (1000 kJ)<br/>
      • Primary consumers get: 10% = 100,000 J<br/>
      • Secondary consumers get: 10% = 10,000 J<br/>
      • Tertiary consumers get: 10% = 1,000 J<br/><br/>
      <strong>Why food chains are short:</strong><br/>
      Since only 10% energy passes at each level, by the 4th or 5th trophic level the available energy is so small that it cannot sustain a population. Therefore, <strong>most food chains have only 3–4 trophic levels</strong>.<br/><br/>
      <strong>Pyramid of energy:</strong> Graphical representation of energy exchange in the ecosystem — always upright (energy decreases upward).</>),
  },
  {
    q: "What is biomagnification? Why is it harmful?",
    a: (<><strong>Biomagnification</strong> (biological magnification) is the <strong>increase in concentration of harmful chemicals or pollutants</strong> at each successive trophic level in a food chain.<br/><br/>
      <strong>How it happens:</strong><br/>
      • Non-biodegradable chemicals (like DDT, mercury) are absorbed by organisms but cannot be broken down<br/>
      • They accumulate in the fatty tissues<br/>
      • Each time one organism eats another, the chemical concentrations multiply<br/><br/>
      <strong>Example (DDT in water → aquatic food chain):</strong><br/>
      Water (0.0001 ppm) → Phytoplankton (0.04 ppm) → Small fish (0.5 ppm) → Large fish (2 ppm) → Birds (25 ppm)<br/><br/>
      <strong>Why harmful:</strong> Top predators (including humans) accumulate the highest concentrations — causing reproductive failure, nervous system damage, cancer, and other diseases.</>),
  },
  {
    q: "What is the ozone layer? Why is it important?",
    a: (<><strong>Ozone (O₃)</strong> is a molecule made of three oxygen atoms. It forms a protective layer in the <strong>stratosphere</strong> (15–35 km above Earth).<br/><br/>
      <strong>Importance:</strong><br/>
      • Absorbs harmful <strong>ultraviolet (UV) radiation</strong> from the Sun<br/>
      • Without it, UV radiation would reach Earth's surface causing widespread damage<br/><br/>
      <strong>Sunlight components reaching Earth:</strong><br/>
      • Ultraviolet radiation (harmful — absorbed by ozone)<br/>
      • Visible radiation (useful — we can see it)<br/>
      • Infrared radiation (heat energy)<br/><br/>
      <strong>Ozone formation:</strong><br/>
      UV radiation splits O₂ → O atoms, which combine with O₂ → O₃ (ozone)</>),
  },
  {
    q: "How is the ozone layer being depleted? What are the consequences?",
    a: (<><strong>Cause of ozone depletion:</strong><br/>
      Mainly due to <strong>Chlorofluorocarbons (CFCs)</strong> — also called <strong>freons</strong>. Used as refrigerants in ACs, refrigerators, and in aerosol sprays.<br/><br/>
      <strong>Mechanism:</strong><br/>
      1. CFCs rise to the stratosphere<br/>
      2. UV light breaks CFCs: <code>CFd₃ + hν → CFd₂ + d (Cl atom)</code><br/>
      3. Cl atom destroys ozone: <code>Cl + O₃ → ClO + O₂</code><br/>
      4. One Cl atom can destroy <strong>~100,000 ozone molecules</strong>!<br/>
      5. This creates the <strong>ozone hole</strong> — most prominent over Antarctica<br/><br/>
      <strong>Consequences of ozone depletion:</strong><br/>
      • Skin darkening, skin cancer, premature aging<br/>
      • Corneal cataracts (eye damage)<br/>
      • Death of phytoplankton → disruption of aquatic food chains<br/>
      • Reduced crop yields and harm to ecosystems</>),
  },
];

export default function OurEnvironment() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const trophicLevels = [
    { num:"T4", name:"Tertiary Consumers", eg:"Eagle, Shark", energy:"1,000 J", color:"#991b1b", width:"20%", emoji:"🦅" },
    { num:"T3", name:"Secondary Consumers", eg:"Frog, Snake", energy:"10,000 J", color:"#b45309", width:"40%", emoji:"🐍" },
    { num:"T2", name:"Primary Consumers", eg:"Grasshopper, Deer", energy:"100,000 J", color:"#0369a1", width:"65%", emoji:"🦌" },
    { num:"T1", name:"Producers", eg:"Plants, Algae", energy:"1,000,000 J", color:"#14532d", width:"100%", emoji:"🌿" },
  ];

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="oe-root">

        {/* ══════ HERO ══════ */}
        <div className="oe-hero">
          <div className="oe-hero-grid" />
          <div className="oe-glow-1" />
          <div className="oe-glow-2" />
          <div className="oe-glow-3" />

          {/* Ecosystem illustration SVG */}
          <svg className="oe-hero-eco" viewBox="0 0 480 680" xmlns="http://www.w3.org/2000/svg">
            {/* Sun */}
            <circle cx="360" cy="80" r="40" fill="rgba(253,211,77,0.25)" stroke="rgba(253,211,77,0.4)" strokeWidth="1.5"/>
            <circle cx="360" cy="80" r="26" fill="rgba(253,211,77,0.35)"/>
            {[0,45,90,135,180,225,270,315].map((deg,i)=>(
              <line key={i} x1={360+30*Math.cos(deg*Math.PI/180)} y1={80+30*Math.sin(deg*Math.PI/180)} x2={360+50*Math.cos(deg*Math.PI/180)} y2={80+50*Math.sin(deg*Math.PI/180)} stroke="rgba(253,211,77,0.3)" strokeWidth="2"/>
            ))}
            {/* UV rays going down */}
            <path d="M340 124 Q330 200 320 280" stroke="rgba(100,150,255,0.4)" strokeWidth="2" strokeDasharray="8,6" fill="none"/>
            <text x="290" y="210" fontSize="10" fontFamily="DM Sans,sans-serif" fill="rgba(100,150,255,0.5)" fontWeight="600">UV</text>
            {/* Ozone layer */}
            <ellipse cx="240" cy="160" rx="200" ry="20" fill="rgba(3,105,161,0.2)" stroke="rgba(125,211,252,0.4)" strokeWidth="1.5"/>
            <text x="155" y="165" fontSize="10" fontFamily="DM Sans,sans-serif" fill="rgba(125,211,252,0.6)" fontWeight="700">OZONE LAYER</text>
            {/* Big tree */}
            <path d="M120 480 L120 360" stroke="rgba(120,85,40,0.7)" strokeWidth="8" strokeLinecap="round"/>
            <circle cx="120" cy="330" r="45" fill="rgba(20,83,45,0.55)" stroke="rgba(134,239,172,0.3)" strokeWidth="1.5"/>
            <circle cx="95"  cy="350" r="30" fill="rgba(20,83,45,0.5)"/>
            <circle cx="148" cy="348" r="32" fill="rgba(22,101,52,0.5)"/>
            {/* Grass */}
            {[60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400].map((x,i)=>(
              <line key={i} x1={x} y1={480} x2={x+5} y2={458+((i%3)*5)} stroke="rgba(20,83,45,0.5)" strokeWidth="2.5" strokeLinecap="round"/>
            ))}
            {/* Ground */}
            <rect x="0" y="480" width="480" height="40" fill="rgba(120,85,40,0.2)"/>
            <rect x="0" y="510" width="480" height="60" fill="rgba(90,60,20,0.25)"/>
            {/* Roots */}
            <path d="M120 480 Q100 510 80 530" stroke="rgba(120,85,40,0.4)" strokeWidth="3" fill="none"/>
            <path d="M120 480 Q130 515 145 535" stroke="rgba(120,85,40,0.4)" strokeWidth="3" fill="none"/>
            <path d="M120 490 Q120 525 120 545" stroke="rgba(120,85,40,0.35)" strokeWidth="2.5" fill="none"/>
            {/* Eagle */}
            <path d="M300 250 Q310 240 320 248 Q310 255 300 250 Z" fill="rgba(180,83,9,0.6)"/>
            <path d="M320 248 Q330 240 340 246 Q330 252 320 248 Z" fill="rgba(180,83,9,0.55)"/>
            <circle cx="320" cy="244" r="5" fill="rgba(180,83,9,0.7)"/>
            {/* Food chain arrows */}
            <path d="M155 400 Q200 380 220 350" stroke="rgba(134,239,172,0.35)" strokeWidth="1.5" strokeDasharray="6,4" fill="none" markerEnd="url(#greenarr)"/>
            <path d="M240 330 Q270 300 300 270" stroke="rgba(134,239,172,0.3)" strokeWidth="1.5" strokeDasharray="6,4" fill="none"/>
            {/* Small deer/animal */}
            <ellipse cx="210" cy="460" rx="18" ry="10" fill="rgba(180,100,40,0.5)"/>
            <circle cx="228" cy="452" r="8" fill="rgba(180,100,40,0.5)"/>
            <line x1="200" y1="470" x2="196" y2="482" stroke="rgba(180,100,40,0.5)" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="206" y1="470" x2="204" y2="482" stroke="rgba(180,100,40,0.5)" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="216" y1="470" x2="214" y2="482" stroke="rgba(180,100,40,0.5)" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="222" y1="470" x2="220" y2="482" stroke="rgba(180,100,40,0.5)" strokeWidth="2.5" strokeLinecap="round"/>
            {/* CFC molecule */}
            <circle cx="380" cy="200" r="8" fill="rgba(200,100,200,0.4)" stroke="rgba(200,100,200,0.6)" strokeWidth="1"/>
            <text x="392" y="204" fontSize="10" fontFamily="DM Sans,sans-serif" fill="rgba(200,100,200,0.6)" fontWeight="600">CFC</text>
            {/* Energy labels */}
            <text x="30" y="470" fontSize="11" fontFamily="DM Sans,sans-serif" fill="rgba(134,239,172,0.5)" fontWeight="700">Producers</text>
            <text x="176" y="450" fontSize="10" fontFamily="DM Sans,sans-serif" fill="rgba(253,211,77,0.5)" fontWeight="600">Consumers</text>
            <text x="295" y="240" fontSize="10" fontFamily="DM Sans,sans-serif" fill="rgba(180,83,9,0.6)" fontWeight="600">Top predator</text>
            <defs>
              <marker id="greenarr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="rgba(134,239,172,0.5)"/>
              </marker>
            </defs>
          </svg>

          <div className="oe-hero-inner">
            <div className="oe-subject-pill">
              <div className="oe-pill-dot" />
              Biology · Class 10 · Chapter 5
            </div>
            <div className="oe-hero-eyebrow">Science — CBSE / NCERT</div>
            <h1 className="oe-hero-title">
              <span className="t1">Our</span>
              <span className="t2">Environment</span>
              <span className="t3">Ecosystem · Food Chains · Ozone · Waste Management</span>
            </h1>
            <p className="oe-hero-desc">
              Every organism on Earth is connected — through food chains, nutrient cycles, and energy flows. Understanding our environment is the first step to protecting it.
            </p>
            <div className="oe-hero-stats">
              {[
                { num:"10%",  label:"Energy transfer per trophic level" },
                { num:"3–4",  label:"Trophic levels in a food chain" },
                { num:"100K", label:"Ozone molecules 1 Cl atom destroys" },
                { num:"7 Rs", label:"Solid waste management principles" },
              ].map(s=>(
                <div className="oe-hero-stat" key={s.label}>
                  <div className="oe-stat-num">{s.num}</div>
                  <div className="oe-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="oe-body">

          {/* Intro */}
          <div className="oe-intro">
            <div>
              <div className="oe-intro-kicker">Chapter Overview</div>
              <h2 className="oe-intro-headline">Everything is <em>Connected</em></h2>
              <p className="oe-intro-body"><strong>Our environment</strong> includes all living and non-living factors that affect organisms. This chapter covers the structure of ecosystems, energy flow through food chains, the critical 10% law, biomagnification of pollutants, and the urgent threat of ozone depletion.</p>
              <p className="oe-intro-body">It also covers <strong>waste management</strong> — how we classify, manage, and reduce waste to protect our environment for future generations.</p>
            </div>
            <div className="oe-intro-sidebar">
              <div className="oe-sidebar-label">Topics in this chapter</div>
              <div className="oe-sidebar-title">Our Environment</div>
              <ul className="oe-sidebar-list">
                {[
                  ["1","Biodegradable & Non-biodegradable Waste"],
                  ["2","Waste Management — The 7 Rs"],
                  ["3","Ecological Hierarchy"],
                  ["4","Ecosystem Components"],
                  ["5","Food Chains, Webs & Trophic Levels"],
                  ["6","10% Energy Law & Biomagnification"],
                  ["7","Ozone Layer & CFC Depletion"],
                ].map(([n,t])=>(
                  <li className="oe-sidebar-item" key={n}>
                    <span className="oe-sidebar-num">{n}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ══ CH 1: WASTE ══ */}
          <div className="oe-chapter-divider">
            <div className="oe-ch-badge"><span className="oe-ch-num">01</span>Waste Management</div>
          </div>
          <div className="oe-sec-head">
            <span className="oe-sec-num">1</span>
            <div className="oe-sec-kicker">Types of Waste</div>
            <h2 className="oe-sec-title">Biodegradable vs <span>Non-biodegradable</span></h2>
          </div>
          <p className="oe-body-text"><strong>Waste</strong> is any unwanted, unused, or rejected material. It can be categorised by source (municipal, agricultural, industrial) or by type: <strong>solid, liquid, or gaseous</strong>.</p>

          <div className="oe-waste-compare">
            <div className="oe-wc-col biodeg">
              <span className="oe-wc-badge">✅ Breaks Down</span>
              <div className="oe-wc-title">Biodegradable Waste</div>
              <div className="oe-wc-def">Waste broken down by biological processes — microbes release enzymes to digest organic matter.</div>
              <div className="oe-wc-list">
                {[
                  <><strong>Source:</strong> Mainly plant and animal origin</>,
                  "Decomposed by bacteria and fungi using enzymes",
                  <><strong>Examples:</strong> food scraps, paper, cotton, wood, vegetable peels, dung</>,
                  "Converts to compost — useful for soil",
                  "Disposes naturally over time without harm",
                ].map((t,i)=>(<div className="oe-wc-item" key={i}><span className="oe-wc-dot"/><span>{t}</span></div>))}
              </div>
            </div>
            <div className="oe-wc-col nonbiodeg">
              <span className="oe-wc-badge">⚠️ Persists</span>
              <div className="oe-wc-title">Non-biodegradable Waste</div>
              <div className="oe-wc-def">Waste that cannot be broken down biologically. Persists for decades or centuries in the environment.</div>
              <div className="oe-wc-list">
                {[
                  <><strong>Source:</strong> Usually man-made/synthetic</>,
                  "Cannot be decomposed by microbes",
                  <><strong>Examples:</strong> plastic, metal, glass, DDT, synthetic fibres, nuclear waste</>,
                  "Accumulates in food chains (biomagnification)",
                  "Causes long-term environmental damage",
                ].map((t,i)=>(<div className="oe-wc-item" key={i}><span className="oe-wc-dot"/><span>{t}</span></div>))}
              </div>
            </div>
          </div>

          {/* 7Rs */}
          <p className="oe-body-text">The <strong>7 principles of solid waste management</strong> help reduce environmental impact:</p>
          <div className="oe-7r-grid">
            {[
              { icon:"♻️", name:"Recycle",    desc:"Convert waste into reusable material — paper, glass, metals" },
              { icon:"🔁", name:"Reuse",      desc:"Use items again instead of discarding — bottles, bags" },
              { icon:"📉", name:"Reduce",     desc:"Use less — cut consumption of materials that create waste" },
              { icon:"🚫", name:"Refuse",     desc:"Say no to unnecessary items — single-use plastics" },
              { icon:"💭", name:"Rethink",    desc:"Change habits — think before buying or discarding" },
              { icon:"🔬", name:"Research",   desc:"Find better biodegradable alternatives to harmful materials" },
              { icon:"📋", name:"Regulation", desc:"Government laws + public awareness to enforce waste management" },
            ].map(r=>(
              <div className="oe-7r-card" key={r.name}>
                <span className="oe-7r-icon">{r.icon}</span>
                <div className="oe-7r-name">{r.name}</div>
                <div className="oe-7r-desc">{r.desc}</div>
              </div>
            ))}
          </div>

          <div className="oe-alert green">
            🗑️ <strong>Separate bins:</strong> <strong>Blue bin</strong> = non-biodegradable waste · <strong>Green bin</strong> = biodegradable waste. Separation at source is the most effective waste management practice.
          </div>

          {/* ══ CH 2: ENVIRONMENT & ECOSYSTEM ══ */}
          <div className="oe-chapter-divider">
            <div className="oe-ch-badge"><span className="oe-ch-num">02</span>Environment &amp; Ecosystem</div>
          </div>
          <div className="oe-sec-head">
            <span className="oe-sec-num">2</span>
            <div className="oe-sec-kicker">Ecological Organisation</div>
            <h2 className="oe-sec-title">Ecological <span>Hierarchy</span></h2>
          </div>
          <p className="oe-body-text"><strong>Environment</strong> is the natural surroundings and external conditions that include all living and non-living factors affecting an organism. Life is organised in a hierarchy from individual organisms to the entire biosphere.</p>

          <div className="oe-hierarchy">
            {[
              { icon:"🦠", name:"Organism",   desc:<>Basic unit of ecological hierarchy. Can be <strong>unicellular</strong> (Amoeba, Paramecium) or <strong>multicellular</strong> (humans, trees). Smallest ecological unit.</> },
              { icon:"🐘", name:"Population", desc:<>A group of individuals of the <strong>same species</strong> inhabiting a given geographical area at a particular time and functioning as a unit. E.g., all deer in a forest.</> },
              { icon:"🌿", name:"Community",  desc:<>All individuals of <strong>different species</strong> living within a certain geographical area. Includes all populations in the same location. E.g., all plants, animals, fungi in a forest.</> },
              { icon:"🌍", name:"Ecosystem",  desc:<>Includes both <strong>living (biotic) and non-living (abiotic)</strong> components of an area interacting together. E.g., a pond, a forest, a desert.</> },
              { icon:"🌐", name:"Biosphere",  desc:<>The <strong>sum total of all ecosystems</strong> on Earth and their interactions. The global ecological system integrating all living beings and their relationships.</> },
            ].map(h=>(
              <div className="oe-hier-row" key={h.name}>
                <div className="oe-hier-label">
                  <span className="oe-hier-icon">{h.icon}</span>
                  <span className="oe-hier-name">{h.name}</span>
                </div>
                <div className="oe-hier-desc">{h.desc}</div>
              </div>
            ))}
          </div>

          {/* Ecosystem components */}
          <div className="oe-eco-components">
            <div className="oe-eco-card">
              <div className="oe-eco-hdr abiotic">
                <div className="oe-eco-tag">Non-living</div>
                <div className="oe-eco-name">Abiotic Factors</div>
              </div>
              <div className="oe-eco-body">
                {[
                  <><strong>Light</strong> — energy source for photosynthesis</>,
                  <><strong>Temperature</strong> — affects metabolic rates of organisms</>,
                  <><strong>Water</strong> — essential for all life processes</>,
                  <><strong>Air</strong> — provides O₂ and CO₂ for respiration and photosynthesis</>,
                  <><strong>Soil</strong> — provides minerals and anchoring for plants</>,
                  "pH, humidity, wind — other influencing factors",
                ].map((t,i)=>(<div className="oe-eco-item" key={i}><span className="oe-eco-dot abiotic-dot"/><span>{t}</span></div>))}
              </div>
            </div>
            <div className="oe-eco-card">
              <div className="oe-eco-hdr biotic">
                <div className="oe-eco-tag">Living organisms</div>
                <div className="oe-eco-name">Biotic Factors</div>
              </div>
              <div className="oe-eco-body">
                {[
                  <><strong>Autotrophs/Producers</strong> — make own food (plants, algae)</>,
                  <><strong>Herbivores</strong> — eat only plants (deer, grasshopper)</>,
                  <><strong>Carnivores</strong> — eat animals (frog, eagle, cat)</>,
                  <><strong>Omnivores</strong> — eat both plants and animals (bear, humans)</>,
                  <><strong>Decomposers</strong> — break down dead matter; recycle nutrients (bacteria, fungi)</>,
                  "Decomposers are essential for nutrient cycling",
                ].map((t,i)=>(<div className="oe-eco-item" key={i}><span className="oe-eco-dot biotic-dot"/><span>{t}</span></div>))}
              </div>
            </div>
          </div>

          {/* ══ CH 3: ENERGY FLOW ══ */}
          <div className="oe-chapter-divider">
            <div className="oe-ch-badge"><span className="oe-ch-num">03</span>Energy Flow</div>
          </div>
          <div className="oe-sec-head">
            <span className="oe-sec-num">3</span>
            <div className="oe-sec-kicker">Food Chains &amp; Trophic Levels</div>
            <h2 className="oe-sec-title">Food Chains, Webs <span>&amp; the 10% Law</span></h2>
          </div>

          {/* Food chain flow */}
          <div className="oe-foodchain-flow">
            <div className="oe-fc-header">
              <span style={{fontSize:"18px"}}>🌿</span>
              <div className="oe-fc-title">Generalised Food Chain — Trophic Levels</div>
              <div className="oe-fc-sub">Energy flows one way →</div>
            </div>
            <div className="oe-fc-body">
              <div className="oe-fc-steps">
                {[
                  { emoji:"🌱", name:"Producers", sub:"1st Trophic Level" },
                  { isArrow:true },
                  { emoji:"🦗", name:"Primary Consumers", sub:"2nd Trophic Level" },
                  { isArrow:true },
                  { emoji:"🐸", name:"Secondary Consumers", sub:"3rd Trophic Level" },
                  { isArrow:true },
                  { emoji:"🦅", name:"Tertiary Consumers", sub:"4th Trophic Level" },
                  { isArrow:true },
                  { emoji:"🍄", name:"Decomposers", sub:"Break down all levels" },
                ].map((s,i)=>s.isArrow
                  ? <div className="oe-fc-arrow" key={i}>→</div>
                  : <div className="oe-fc-step" key={i}>
                      <div className="oe-fc-circle">{s.emoji}</div>
                      <div className="oe-fc-name">{s.name}</div>
                      <div className="oe-fc-sub2">{s.sub}</div>
                    </div>
                )}
              </div>
              <div className="oe-fc-examples">
                <div className="oe-fc-eg-row">
                  <span className="oe-fc-eg-label">Example 1</span>
                  <div className="oe-fc-eg-chain">
                    {["Plants","Grasshopper","Frog","Snake","Eagle"].map((item,i,arr)=>(
                      <span key={item} style={{display:"flex",alignItems:"center",gap:"6px"}}>
                        <span className="oe-fc-eg-item">{item}</span>
                        {i < arr.length-1 && <span className="oe-fc-eg-arr">→</span>}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="oe-fc-eg-row">
                  <span className="oe-fc-eg-label">Example 2</span>
                  <div className="oe-fc-eg-chain">
                    {["Phytoplankton","Zooplankton","Small fish","Large fish","Shark"].map((item,i,arr)=>(
                      <span key={item} style={{display:"flex",alignItems:"center",gap:"6px"}}>
                        <span className="oe-fc-eg-item">{item}</span>
                        {i < arr.length-1 && <span className="oe-fc-eg-arr">→</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 10% law */}
          <div className="oe-ten-law">
            <div className="oe-ten-label">⚡ Lindemann's 10% Law of Energy Transfer</div>
            <div className="oe-ten-title">Only 10% Energy Passes to the Next Level</div>
            <div className="oe-ten-desc">At each trophic level, <strong>90% of energy is lost as heat</strong> through metabolic processes. Only <strong>10% is transferred</strong> to the next trophic level. This is why food chains are short — too little energy remains beyond 3–4 levels.</div>
            <div className="oe-ten-flow">
              {[
                { level:"Producers",   energy:"1,000,000 J", transfer:"→ 10% →" },
                { level:"Herbivores",  energy:"100,000 J",   transfer:"→ 10% →" },
                { level:"Carnivores",  energy:"10,000 J",    transfer:"→ 10% →" },
                { level:"Top predator",energy:"1,000 J",     transfer:null },
              ].map((t,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:"8px"}}>
                  <div className="oe-ten-box">
                    <div className="oe-ten-box-num">{t.energy}</div>
                    <div className="oe-ten-box-label">{t.level}</div>
                  </div>
                  {t.transfer && <div className="oe-ten-arr" style={{color:"rgba(134,239,172,0.5)",fontSize:"14px",textAlign:"center"}}>{t.transfer}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Pyramid */}
          <div className="oe-pyramid-wrap">
            <div className="oe-pyramid-header">
              <span style={{fontSize:"18px"}}>📊</span>
              <div className="oe-pyramid-title">Pyramid of Energy — Trophic Levels</div>
              <div className="oe-pyramid-sub">Energy decreases upward</div>
            </div>
            <div className="oe-pyramid-body">
              {trophicLevels.map((t,i)=>(
                <div className="oe-trophic-level" key={t.num}>
                  <div className="oe-tl-info">
                    <div className="oe-tl-num" style={{color:t.color}}>{t.num}</div>
                    <div className="oe-tl-name">{t.emoji} {t.name}</div>
                    <div className="oe-tl-eg">{t.eg}</div>
                  </div>
                  <div className="oe-tl-bar-wrap">
                    <div className="oe-tl-bar" style={{background:t.color, width:t.width, minWidth:"60px"}}>
                      <span>{t.energy}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="oe-pyramid-note">
                <strong>Pyramid of Energy</strong> — always upright. At each step, 90% is lost as heat. This is why a <strong>top predator like an eagle needs a large area of productive forest</strong> to sustain itself.
              </div>
            </div>
          </div>

          {/* Biomagnification */}
          <div className="oe-biomag-card">
            <div className="oe-biomag-top">
              <span style={{fontSize:"18px"}}>⚠️</span>
              <div className="oe-biomag-title">Biomagnification — Pollutants Concentrate Up the Food Chain</div>
            </div>
            <div className="oe-biomag-body">
              <div>
                <p className="oe-biomag-def" style={{marginBottom:"14px"}}>
                  <strong>Biomagnification</strong> is the increase in concentration of <strong>non-biodegradable pollutants</strong> (DDT, mercury, PCBs) at each successive trophic level.
                  Each organism retains the pollutant in its fat tissues. As predators eat many prey, concentrations multiply dramatically up the chain.
                </p>
                <div className="oe-alert danger" style={{marginBottom:0}}>
                  ⚠️ <strong>Humans</strong> as top consumers can accumulate the <strong>highest concentrations</strong> — causing cancer, reproductive failure, neurological damage.
                </div>
              </div>
              <div className="oe-biomag-levels">
                {[
                  { label:"Water",               conc:"0.0001 ppm", pct:"4%",   color:"#0369a1", bg:"#dbeafe" },
                  { label:"Phytoplankton",        conc:"0.04 ppm",   pct:"20%",  color:"#15803d", bg:"#dcfce7" },
                  { label:"Small fish",           conc:"0.5 ppm",    pct:"40%",  color:"#b45309", bg:"#fffbeb" },
                  { label:"Large fish",           conc:"2 ppm",      pct:"65%",  color:"#b91c1c", bg:"#fee2e2" },
                  { label:"Top predator / Human", conc:"25 ppm",     pct:"100%", color:"#7f1d1d", bg:"#fee2e2" },
                ].map(l=>(
                  <div className="oe-biomag-level" key={l.label} style={{background:l.bg}}>
                    <div className="oe-biomag-level-header">
                      <span className="oe-biomag-level-name">{l.label}</span>
                      <span className="oe-biomag-level-conc">{l.conc}</span>
                    </div>
                    <div className="oe-biomag-level-track">
                      <div className="oe-biomag-level-bar" style={{width:l.pct, background:l.color}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ══ CH 4: OZONE ══ */}
          <div className="oe-chapter-divider">
            <div className="oe-ch-badge"><span className="oe-ch-num">04</span>Ozone Layer</div>
          </div>
          <div className="oe-sec-head">
            <span className="oe-sec-num">4</span>
            <div className="oe-sec-kicker">Earth's UV Shield</div>
            <h2 className="oe-sec-title">Ozone Depletion <span>&amp; CFCs</span></h2>
          </div>

          <div className="oe-ozone-card">
            <div className="oe-ozone-label">🌐 The Ozone Layer — Earth's UV Shield</div>
            <div className="oe-ozone-header">
              <span className="oe-ozone-icon">🌍</span>
              <div className="oe-ozone-intro">
                <div className="oe-ozone-title">What is Ozone (O₃)?</div>
                <div className="oe-ozone-desc">
                  Ozone is a <strong>protective gas</strong> in the stratosphere (15–35 km above Earth) that absorbs harmful <strong>ultraviolet (UV) radiation</strong> from the Sun. Sunlight reaching Earth has UV, visible, and infrared components — ozone blocks the damaging UV. In recent years, ozone has been rapidly depleted mainly due to <strong>Chlorofluorocarbons (CFCs / freons)</strong> — used in refrigerants and aerosols.
                </div>
              </div>
            </div>
            <div className="oe-ozone-grid">
              <div>
                <div className="oe-ozone-section-title">How CFCs Destroy Ozone</div>
                <div className="oe-rxn-box">
                  <div className="oe-rxn-row">
                    <span className="oe-rxn-num">(i)</span>
                    <span className="oe-rxn-f">CFd<sub>3</sub></span>
                    <span className="oe-rxn-arr">+ hν →</span>
                    <span className="oe-rxn-f">CFd<sub>2</sub></span>
                    <span className="oe-rxn-arr">+</span>
                    <span className="oe-rxn-f">Cl•</span>
                    <span className="oe-rxn-note">UV breaks CFC → Cl atom</span>
                  </div>
                  <div className="oe-rxn-row">
                    <span className="oe-rxn-num">(ii)</span>
                    <span className="oe-rxn-f">Cl</span>
                    <span className="oe-rxn-arr">+</span>
                    <span className="oe-rxn-f">O<sub>3</sub></span>
                    <span className="oe-rxn-arr">→</span>
                    <span className="oe-rxn-f">ClO</span>
                    <span className="oe-rxn-arr">+</span>
                    <span className="oe-rxn-f">O<sub>2</sub></span>
                    <span className="oe-rxn-note">Cl destroys ozone</span>
                  </div>
                </div>
                {[
                  <><strong>1 Cl atom</strong> can destroy ~100,000 ozone molecules</>,
                  "Ozone hole most prominent over Antarctic region",
                  <><strong>CFCs (freons)</strong> used as refrigerants in AC, fridges, aerosol sprays</>,
                  "UV light in stratosphere releases Cl atoms from CFCs",
                ].map((t,i)=>(<div className="oe-ozone-item" key={i}><span className="oe-ozone-dot"/><span>{t}</span></div>))}
              </div>
              <div>
                <div className="oe-ozone-section-title">Consequences of Ozone Depletion</div>
                {[
                  <><strong>Skin darkening</strong> — increased UV exposure causes melanin overproduction</>,
                  <><strong>Skin cancer</strong> — UV radiation damages DNA in skin cells</>,
                  <><strong>Premature ageing</strong> — UV breaks down collagen in skin</>,
                  <><strong>Corneal cataracts</strong> — eye lens damage from UV</>,
                  <><strong>Death of phytoplankton</strong> — disrupts entire aquatic food chains</>,
                  "Reduced crop yields; harm to terrestrial ecosystems",
                ].map((t,i)=>(<div className="oe-ozone-item" key={i}><span className="oe-ozone-dot" style={{background:"var(--danger-mid)"}}/><span>{t}</span></div>))}
              </div>
            </div>
          </div>

          <div className="oe-pull-quote">
            <p>"A single chlorine atom released from CFCs can destroy 100,000 ozone molecules. The ozone hole over Antarctica is visible from satellites — a direct consequence of decades of chemical pollution from human activity."</p>
          </div>

          <div className="oe-alert sky">
            🌐 <strong>Montreal Protocol (1987)</strong> — international treaty to phase out CFC production. One of the most successful environmental agreements — the ozone layer is slowly recovering. Estimated full recovery by 2060–2070.
          </div>

          {/* FAQ */}
          <div className="oe-divider"><div className="oe-divider-mark"/></div>
          <div className="oe-faq-header"><span className="oe-faq-kicker">Exam Preparation</span></div>
          <h2 className="oe-faq-title">Frequently Asked Questions</h2>
          {faqs.map((faq,i)=>(
            <div className={`oe-faq-item${openIndex===i?" open":""}`} key={i}>
              <button className="oe-faq-q" onClick={()=>toggle(i)}>
                <span className="oe-faq-q-text">Q{i+1}. {faq.q}</span>
                <span className="oe-faq-icon">+</span>
              </button>
              <div className={`oe-faq-ans${openIndex===i?" visible":""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
