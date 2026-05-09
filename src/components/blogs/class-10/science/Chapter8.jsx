import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=DM+Sans:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --rose:       #c2185b;
    --rose2:      #880e4f;
    --rose-lt:    #fce4ec;
    --rose-mid:   #f48fb1;
    --leaf:       #2e7d32;
    --leaf2:      #1b5e20;
    --leaf-lt:    #e8f5e9;
    --leaf-mid:   #a5d6a7;
    --amber:      #e65100;
    --amber-lt:   #fff3e0;
    --amber-mid:  #ffcc80;
    --sky:        #0277bd;
    --sky-lt:     #e1f5fe;
    --sky-mid:    #81d4fa;
    --purple:     #6a1b9a;
    --purple-lt:  #f3e5f5;
    --purple-mid: #ce93d8;
    --teal:       #00695c;
    --teal-lt:    #e0f2f1;
    --teal-mid:   #80cbc4;
    --cream:      #fdf6f0;
    --cream2:     #f5ebe0;
    --paper:      #fdf6f0;
    --paper2:     #f5ebe0;
    --ink:        #1a0a08;
    --ink2:       #2d1a14;
    --muted:      #6d4c41;
    --rule:       #e8d5c4;
    --white:      #ffffff;
    --eq-bg:      #1a0a08;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .hor-root { font-family: 'DM Sans', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  /* ═══ HERO — warm ivory split layout ═══ */
  .hor-hero {
    display: grid; grid-template-columns: 1.1fr 1fr;
    min-height: 100vh; position: relative; overflow: hidden;
  }
  @media(max-width:720px){.hor-hero{grid-template-columns:1fr; min-height:auto;}}

  .hor-hero-left {
    background: linear-gradient(160deg, #2e0018 0%, #5c0a2a 50%, #3a0820 100%);
    display: flex; flex-direction: column; justify-content: center;
    padding: 80px 52px 72px; position: relative; overflow: hidden;
    z-index: 1;
  }
  @media(max-width:720px){.hor-hero-left{padding:60px 24px 48px;}}

  /* Decorative circles */
  .hor-hero-left::before {
    content:''; position:absolute; top:-20%; right:-15%; width:420px; height:420px;
    border-radius:50%; background:radial-gradient(circle,rgba(194,24,91,0.2) 0%,transparent 65%);
    pointer-events:none;
  }
  .hor-hero-left::after {
    content:''; position:absolute; bottom:-10%; left:-10%; width:300px; height:300px;
    border-radius:50%; background:radial-gradient(circle,rgba(46,125,50,0.15) 0%,transparent 65%);
    pointer-events:none;
  }
  .hor-hero-grid {
    position:absolute; inset:0;
    background-image: linear-gradient(rgba(194,24,91,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(194,24,91,0.06) 1px, transparent 1px);
    background-size:52px 52px; pointer-events:none;
  }

  .hor-hero-right {
    background: var(--cream2);
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    padding: 48px 40px; gap: 20px;
  }
  @media(max-width:720px){.hor-hero-right{padding:32px 20px;}}

  /* hero right — two mini diagram cards */
  .hor-hero-diagram-pair { display:flex; flex-direction:column; gap:16px; width:100%; max-width:440px; }
  .hor-hero-diagram-card {
    background:var(--white); border-radius:14px; overflow:hidden;
    border:1.5px solid var(--rule); box-shadow:0 4px 20px rgba(194,24,91,0.08);
  }
  .hor-hero-diagram-label {
    background: linear-gradient(90deg,#2e0018,#5c0a2a);
    padding:8px 16px; font-size:10px; font-weight:700;
    letter-spacing:0.16em; text-transform:uppercase; color:var(--rose-mid);
  }
  .hor-hero-diagram-img { width:100%; display:block; max-height:200px; object-fit:contain; padding:12px; background:var(--white); }

  /* hero left content */
  .hor-subject-pill {
    display:inline-flex; align-items:center; gap:8px;
    border:1px solid rgba(194,24,91,0.4); background:rgba(194,24,91,0.15);
    border-radius:6px; padding:6px 16px; margin-bottom:28px;
    font-size:11px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; color:var(--rose-mid);
    position:relative; z-index:1;
  }
  .hor-subject-dot { width:6px; height:6px; border-radius:50%; background:var(--rose-mid); }

  .hor-hero-eyebrow {
    font-size:11px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase;
    color:rgba(255,255,255,0.3); margin-bottom:14px; position:relative; z-index:1;
  }
  .hor-hero-title {
    font-family:'Playfair Display',serif; font-weight:900;
    font-size:clamp(38px,5.5vw,70px); line-height:1.05;
    letter-spacing:-0.02em; color:#fff; margin-bottom:8px;
    position:relative; z-index:1;
  }
  .hor-hero-title .t1 { display:block; }
  .hor-hero-title .t2 { display:block; color:var(--rose-mid); font-style:italic; }
  .hor-hero-title .t3 { display:block; color:rgba(255,255,255,0.35); font-size:0.52em; font-style:normal; font-weight:700; letter-spacing:0.01em; margin-top:6px; }

  .hor-hero-desc {
    font-size:15px; color:rgba(255,255,255,0.55); line-height:1.8;
    max-width:440px; margin:20px 0 36px; position:relative; z-index:1;
  }
  .hor-hero-meta { display:flex; flex-wrap:wrap; gap:0; border-top:1px solid rgba(255,255,255,0.1); padding-top:24px; position:relative; z-index:1; }
  .hor-meta-item { padding:0 24px 0 0; border-right:1px solid rgba(255,255,255,0.1); margin-right:24px; }
  .hor-meta-item:last-child { border-right:none; margin-right:0; }
  .hor-meta-label { font-size:10px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:4px; }
  .hor-meta-value { font-size:14px; font-weight:600; color:rgba(255,255,255,0.75); }

  /* ═══ BODY ═══ */
  .hor-body { max-width:920px; margin:0 auto; padding:80px 32px 100px; }

  /* ═══ INTRO ═══ */
  .hor-intro {
    display:grid; grid-template-columns:3fr 2fr; gap:40px; margin-bottom:72px; align-items:start;
  }
  @media(max-width:640px){.hor-intro{grid-template-columns:1fr;}}
  .hor-intro-kicker {
    font-size:10px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase;
    color:var(--rose); margin-bottom:12px; display:flex; align-items:center; gap:10px;
  }
  .hor-intro-kicker::after { content:''; width:48px; height:1px; background:var(--rose-mid); }
  .hor-intro-headline {
    font-family:'Playfair Display',serif; font-size:clamp(22px,3vw,30px);
    font-weight:800; color:var(--ink); line-height:1.2; margin-bottom:16px;
  }
  .hor-intro-headline em { font-style:italic; color:var(--rose); }
  .hor-intro-body { font-size:16px; line-height:1.85; color:var(--ink2); margin-bottom:14px; }
  .hor-intro-body strong { color:var(--rose2); font-weight:600; }
  .hor-intro-sidebar {
    background:linear-gradient(160deg,#2e0018,#5c0a2a);
    border-radius:14px; padding:26px 22px; position:relative; overflow:hidden;
  }
  .hor-intro-sidebar::before { content:''; position:absolute; top:-20px; right:-20px; width:100px; height:100px; border-radius:50%; background:rgba(194,24,91,0.1); }
  .hor-sidebar-label { font-size:9px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(244,143,177,0.6); margin-bottom:12px; }
  .hor-sidebar-title { font-family:'Playfair Display',serif; font-size:17px; font-weight:800; color:#fff; margin-bottom:14px; line-height:1.3; }
  .hor-sidebar-list { list-style:none; padding:0; }
  .hor-sidebar-item { display:flex; align-items:center; gap:10px; padding:7px 0; border-bottom:1px solid rgba(255,255,255,0.07); font-size:13px; color:rgba(255,255,255,0.7); }
  .hor-sidebar-item:last-child { border-bottom:none; }
  .hor-sidebar-num { font-family:'Playfair Display',serif; font-size:20px; font-weight:800; color:var(--rose-mid); flex-shrink:0; width:26px; line-height:1; }

  /* ═══ CHAPTER DIVIDER ═══ */
  .hor-chapter-divider { display:flex; align-items:center; gap:20px; margin:64px 0 48px; }
  .hor-chapter-divider::before, .hor-chapter-divider::after { content:''; flex:1; height:1px; background:var(--rule); }
  .hor-ch-badge { display:flex; align-items:center; gap:10px; background:var(--rose); border-radius:8px; padding:9px 22px; font-family:'DM Sans',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#fff; white-space:nowrap; }
  .hor-ch-badge-num { font-size:16px; color:var(--rose-mid); font-family:'Playfair Display',serif; font-weight:800; }

  /* ═══ SECTION HEADER ═══ */
  .hor-sec-head { margin-bottom:28px; }
  .hor-sec-num { font-family:'Playfair Display',serif; font-size:80px; font-weight:900; color:var(--rose-lt); line-height:0.85; letter-spacing:-0.04em; display:block; margin-bottom:2px; }
  .hor-sec-kicker { font-size:10px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--rose); margin-bottom:6px; }
  .hor-sec-title { font-family:'Playfair Display',serif; font-size:clamp(22px,3.5vw,32px); font-weight:800; color:var(--ink); line-height:1.15; border-bottom:2px solid var(--rule); padding-bottom:14px; }
  .hor-sec-title span { color:var(--rose); font-style:italic; }

  /* ═══ BODY TEXT ═══ */
  .hor-body-text { font-size:16px; line-height:1.85; color:var(--ink2); margin-bottom:24px; }
  .hor-body-text strong { color:var(--rose2); font-weight:600; }

  /* ═══ DIVIDER ═══ */
  .hor-divider { margin:52px 0; display:flex; align-items:center; gap:14px; }
  .hor-divider::before, .hor-divider::after { content:''; flex:1; height:1px; background:var(--rule); }
  .hor-divider-mark { width:8px; height:8px; border-radius:50%; background:var(--rose); flex-shrink:0; }

  /* ═══ PULL QUOTE ═══ */
  .hor-pull-quote { border-left:5px solid var(--rose); background:var(--rose-lt); padding:22px 30px; margin:28px 0; border-radius:0 8px 8px 0; }
  .hor-pull-quote p { font-family:'Playfair Display',serif; font-size:17px; font-style:italic; font-weight:700; color:var(--rose2); line-height:1.7; margin:0; }

  /* ═══ ALERT ═══ */
  .hor-alert { padding:14px 18px; border-radius:8px; font-size:14px; line-height:1.7; margin-bottom:16px; }
  .hor-alert.rose   { background:var(--rose-lt); color:var(--rose2); border-left:4px solid var(--rose); }
  .hor-alert.green  { background:var(--leaf-lt); color:var(--leaf2); border-left:4px solid var(--leaf); }
  .hor-alert.amber  { background:var(--amber-lt); color:var(--amber); border-left:4px solid var(--amber); }
  .hor-alert.sky    { background:var(--sky-lt); color:var(--sky); border-left:4px solid var(--sky); }
  .hor-alert.purple { background:var(--purple-lt); color:var(--purple); border-left:4px solid var(--purple); }
  .hor-alert strong { font-weight:700; }

  /* ═══ SEXUAL VS ASEXUAL COMPARE ═══ */
  .hor-repro-compare { display:grid; grid-template-columns:1fr 1fr; gap:0; border:1.5px solid var(--rule); border-radius:12px; overflow:hidden; margin-bottom:28px; }
  @media(max-width:600px){.hor-repro-compare{grid-template-columns:1fr;}}
  .hor-rc-col { padding:24px 24px 28px; display:flex; flex-direction:column; }
  .hor-rc-col.sexual   { background:linear-gradient(160deg,#2e0018,#5c0a2a); }
  .hor-rc-col.asexual  { background:var(--white); border-left:2px solid var(--rule); }
  .hor-rc-badge { display:inline-block; padding:4px 14px; border-radius:100px; margin-bottom:12px; font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; }
  .sexual  .hor-rc-badge { background:rgba(194,24,91,0.25); color:var(--rose-mid); }
  .asexual .hor-rc-badge { background:var(--leaf-lt); color:var(--leaf); }
  .hor-rc-title { font-family:'Playfair Display',serif; font-size:22px; font-weight:800; margin-bottom:6px; }
  .sexual  .hor-rc-title { color:var(--rose-mid); }
  .asexual .hor-rc-title { color:var(--ink); }
  .hor-rc-def { font-size:13.5px; line-height:1.7; margin-bottom:16px; }
  .sexual  .hor-rc-def { color:rgba(255,255,255,0.6); }
  .asexual .hor-rc-def { color:var(--muted); }
  .hor-rc-list { display:flex; flex-direction:column; gap:8px; flex:1; }
  .hor-rc-item { display:flex; gap:9px; font-size:14px; line-height:1.65; align-items:flex-start; }
  .sexual  .hor-rc-item { color:rgba(255,255,255,0.75); }
  .asexual .hor-rc-item { color:var(--ink2); }
  .hor-rc-dot { min-width:6px; height:6px; border-radius:50%; margin-top:8px; flex-shrink:0; }
  .sexual  .hor-rc-dot { background:var(--rose-mid); }
  .asexual .hor-rc-dot { background:var(--leaf); }
  .hor-rc-item strong { font-weight:600; }
  .sexual  .hor-rc-item strong { color:var(--rose-mid); }
  .asexual .hor-rc-item strong { color:var(--leaf2); }
  @media(max-width:600px){ .asexual { border-left:none; border-top:2px solid var(--rule); } }

  /* ═══ FLOWER ANATOMY ═══ */
  .hor-flower-layout { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:28px; align-items:start; }
  @media(max-width:640px){.hor-flower-layout{grid-template-columns:1fr;}}
  .hor-flower-img-card { background:var(--white); border-radius:14px; overflow:hidden; border:1.5px solid var(--rule); box-shadow:0 4px 20px rgba(194,24,91,0.07); }
  .hor-flower-img-label { background:linear-gradient(90deg,#2e0018,#5c0a2a); padding:10px 16px; font-size:10px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:var(--rose-mid); }
  .hor-flower-img { width:100%; display:block; object-fit:contain; padding:16px; background:var(--white); max-height:280px; }
  .hor-flower-parts { display:flex; flex-direction:column; gap:12px; }
  .hor-flower-part { background:var(--white); border-radius:10px; padding:14px 16px; border:1.5px solid var(--rule); border-left:4px solid var(--rose); display:flex; flex-direction:column; }
  .hor-flower-part:nth-child(2) { border-left-color:var(--leaf); }
  .hor-flower-part:nth-child(3) { border-left-color:var(--amber); }
  .hor-flower-part:nth-child(4) { border-left-color:var(--sky); }
  .hor-fp-name { font-family:'Playfair Display',serif; font-size:15px; font-weight:800; color:var(--ink); margin-bottom:3px; }
  .hor-fp-tag  { font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:5px; }
  .hor-flower-part:nth-child(1) .hor-fp-tag { color:var(--rose); }
  .hor-flower-part:nth-child(2) .hor-fp-tag { color:var(--leaf); }
  .hor-flower-part:nth-child(3) .hor-fp-tag { color:var(--amber); }
  .hor-flower-part:nth-child(4) .hor-fp-tag { color:var(--sky); }
  .hor-fp-desc { font-size:13px; color:var(--muted); line-height:1.6; }
  .hor-fp-desc strong { color:var(--ink2); font-weight:600; }

  /* ═══ POLLINATION → FERTILIZATION FLOW ═══ */
  .hor-pollen-flow {
    background:var(--white); border-radius:14px; border:1.5px solid var(--rule);
    overflow:hidden; margin-bottom:28px;
  }
  .hor-pf-header { background:linear-gradient(90deg,var(--rose2),var(--rose)); padding:14px 24px; display:flex; align-items:center; gap:12px; }
  .hor-pf-title  { font-family:'Playfair Display',serif; font-size:16px; font-weight:800; color:#fff; }
  .hor-pf-sub    { font-size:12px; color:rgba(255,255,255,0.5); margin-left:auto; }
  .hor-pf-body   { padding:28px; }
  .hor-pf-steps  { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; margin-bottom:22px; }
  .hor-pf-step   { display:flex; flex-direction:column; align-items:center; flex:1; min-width:90px; text-align:center; gap:7px; }
  .hor-pf-circle { width:52px; height:52px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; border:2px solid var(--rule); background:var(--rose-lt); }
  .hor-pf-name   { font-family:'Playfair Display',serif; font-size:12px; font-weight:700; color:var(--ink); line-height:1.3; }
  .hor-pf-sub2   { font-size:11px; color:var(--muted); line-height:1.4; }
  .hor-pf-arrow  { font-size:24px; color:var(--rose); flex-shrink:0; }
  .hor-pf-result { background:var(--rose-lt); border-radius:10px; padding:16px 20px; border-left:4px solid var(--rose); font-size:14px; color:var(--rose2); line-height:1.7; }
  .hor-pf-result strong { font-weight:700; }

  /* ═══ DIAGRAM CARD (for reproductive system images) ═══ */
  .hor-diagram-card { background:var(--white); border-radius:14px; overflow:hidden; border:1.5px solid var(--rule); margin-bottom:24px; box-shadow:0 4px 20px rgba(0,0,0,0.05); }
  .hor-diagram-label { padding:12px 20px; font-size:10px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; }
  .hor-diagram-label.male   { background:linear-gradient(90deg,#0a1828,#102848); color:var(--sky-mid); }
  .hor-diagram-label.female { background:linear-gradient(90deg,#2e0018,#5c0a2a); color:var(--rose-mid); }
  .hor-diagram-label.plant  { background:linear-gradient(90deg,#1b2e10,#2e5c1a); color:var(--leaf-mid); }
  .hor-diagram-img { width:100%; display:block; object-fit:contain; padding:20px; background:var(--white); max-height:380px; }

  /* ═══ REPRODUCTIVE SYSTEM CARDS ═══ */
  .hor-repro-system { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:28px; }
  @media(max-width:640px){.hor-repro-system{grid-template-columns:1fr;}}
  .hor-rs-card { background:var(--white); border-radius:12px; border:1.5px solid var(--rule); display:flex; flex-direction:column; overflow:hidden; }
  .hor-rs-hdr  { padding:16px 20px 12px; }
  .hor-rs-hdr.male   { background:linear-gradient(135deg,#0a1828,#142848); }
  .hor-rs-hdr.female { background:linear-gradient(135deg,#2e0018,#5c0a2a); }
  .hor-rs-tag  { font-size:9px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; margin-bottom:5px; }
  .male   .hor-rs-tag { color:rgba(129,212,250,0.7); }
  .female .hor-rs-tag { color:rgba(244,143,177,0.7); }
  .hor-rs-name { font-family:'Playfair Display',serif; font-size:18px; font-weight:800; color:#fff; margin-bottom:4px; }
  .hor-rs-body { padding:16px 20px; flex:1; }
  .hor-rs-item { display:flex; gap:9px; font-size:14px; color:var(--ink2); padding:7px 0; border-bottom:1px solid var(--rule); line-height:1.65; align-items:flex-start; }
  .hor-rs-item:last-child { border-bottom:none; }
  .hor-rs-dot { min-width:6px; height:6px; border-radius:50%; margin-top:8px; flex-shrink:0; }
  .male-dot   { background:var(--sky); }
  .female-dot { background:var(--rose); }
  .hor-rs-item strong { font-weight:600; }

  /* ═══ EMBRYO DEVELOPMENT TIMELINE ═══ */
  .hor-embryo-timeline { background:var(--white); border-radius:14px; border:1.5px solid var(--rule); overflow:hidden; margin-bottom:28px; box-shadow:0 4px 20px rgba(0,0,0,0.04); }
  .hor-et-header { background:linear-gradient(90deg,#2e0018,var(--rose)); padding:14px 24px; display:flex; align-items:center; gap:12px; }
  .hor-et-title  { font-family:'Playfair Display',serif; font-size:16px; font-weight:800; color:#fff; }
  .hor-et-sub    { font-size:12px; color:rgba(255,255,255,0.5); margin-left:auto; }
  .hor-et-body   { padding:24px; }
  .hor-et-steps  { display:flex; flex-direction:column; gap:0; }
  .hor-et-step   { display:grid; grid-template-columns:52px 1fr; gap:0; }
  .hor-et-left   { display:flex; flex-direction:column; align-items:center; padding-top:4px; }
  .hor-et-circle { width:38px; height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:15px; border:2px solid var(--rule); background:var(--rose-lt); flex-shrink:0; z-index:1; }
  .hor-et-line   { flex:1; width:2px; background:var(--rule); margin:4px 0; }
  .hor-et-step:last-child .hor-et-line { display:none; }
  .hor-et-content { padding:0 0 22px 16px; }
  .hor-et-step:last-child .hor-et-content { padding-bottom:4px; }
  .hor-et-stage  { font-family:'Playfair Display',serif; font-size:15px; font-weight:800; color:var(--ink); margin-bottom:4px; }
  .hor-et-detail { font-size:13.5px; color:var(--ink2); line-height:1.7; }
  .hor-et-detail strong { color:var(--rose2); font-weight:600; }

  /* ═══ VEGETATIVE PROPAGATION METHODS ═══ */
  .hor-veg-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:24px; }
  @media(max-width:620px){.hor-veg-grid{grid-template-columns:1fr 1fr;}}
  .hor-veg-card { background:var(--white); border-radius:10px; padding:18px 16px; border:1.5px solid var(--rule); border-top:3px solid var(--leaf); text-align:center; }
  .hor-veg-card:nth-child(2){border-top-color:var(--amber);}
  .hor-veg-card:nth-child(3){border-top-color:var(--rose);}
  .hor-veg-card:nth-child(4){border-top-color:var(--sky);}
  .hor-veg-card:nth-child(5){border-top-color:var(--purple);}
  .hor-veg-card:nth-child(6){border-top-color:var(--teal);}
  .hor-veg-icon  { font-size:26px; display:block; margin-bottom:8px; }
  .hor-veg-name  { font-family:'Playfair Display',serif; font-size:14px; font-weight:700; color:var(--ink); margin-bottom:4px; }
  .hor-veg-eg    { font-size:11px; font-weight:700; margin-bottom:5px; }
  .hor-veg-card:nth-child(1) .hor-veg-eg { color:var(--leaf); }
  .hor-veg-card:nth-child(2) .hor-veg-eg { color:var(--amber); }
  .hor-veg-card:nth-child(3) .hor-veg-eg { color:var(--rose); }
  .hor-veg-card:nth-child(4) .hor-veg-eg { color:var(--sky); }
  .hor-veg-card:nth-child(5) .hor-veg-eg { color:var(--purple); }
  .hor-veg-card:nth-child(6) .hor-veg-eg { color:var(--teal); }
  .hor-veg-desc  { font-size:12px; color:var(--muted); line-height:1.5; }

  /* ═══ CUTTING IMAGE CARD ═══ */
  .hor-cutting-layout { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:28px; align-items:start; }
  @media(max-width:640px){.hor-cutting-layout{grid-template-columns:1fr;}}
  .hor-cutting-info { display:flex; flex-direction:column; gap:12px; }
  .hor-cutting-item { background:var(--white); border-radius:10px; padding:14px 16px; border:1.5px solid var(--rule); border-left:4px solid var(--leaf); }
  .hor-cutting-item:nth-child(2) { border-left-color:var(--amber); }
  .hor-cutting-item:nth-child(3) { border-left-color:var(--rose); }
  .hor-ci-title { font-family:'Playfair Display',serif; font-size:14px; font-weight:800; color:var(--ink); margin-bottom:4px; }
  .hor-ci-desc  { font-size:13px; color:var(--muted); line-height:1.6; }
  .hor-ci-desc strong { color:var(--ink2); font-weight:600; }

  /* ═══ ARTIFICIAL PROPAGATION TABLE ═══ */
  .hor-art-table { border:1.5px solid var(--rule); border-radius:12px; overflow:hidden; margin-bottom:24px; }
  .hor-at-head { display:grid; grid-template-columns:1.2fr 1.5fr 1.8fr; background:var(--ink); }
  .hor-at-th { font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.55); padding:11px 16px; border-right:1px solid rgba(255,255,255,0.07); }
  .hor-at-th:last-child{border-right:none;}
  .hor-at-row { display:grid; grid-template-columns:1.2fr 1.5fr 1.8fr; border-bottom:1px solid var(--rule); align-items:start; }
  .hor-at-row:last-child{border-bottom:none;}
  .hor-at-row:nth-child(even){background:var(--paper2);}
  .hor-at-cell { font-size:14px; color:var(--ink2); padding:12px 16px; border-right:1px solid var(--rule); line-height:1.55; }
  .hor-at-cell:last-child{border-right:none;}
  .hor-at-cell.method { font-family:'Playfair Display',serif; font-weight:700; color:var(--ink); }
  .hor-at-badge { display:inline-block; padding:3px 10px; border-radius:100px; font-size:11px; font-weight:700; }
  .hor-at-badge.natural  { background:var(--leaf-lt); color:var(--leaf2); }
  .hor-at-badge.artifici { background:var(--amber-lt); color:var(--amber); }
  @media(max-width:640px){
    .hor-at-head, .hor-at-row { grid-template-columns:1.2fr 1fr; }
    .hor-at-th:last-child, .hor-at-cell:last-child { display:none; }
  }

  /* ═══ ASEXUAL MODES ═══ */
  .hor-asex-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:28px; }
  @media(max-width:640px){.hor-asex-grid{grid-template-columns:1fr;}}
  .hor-asex-card { background:var(--white); border-radius:12px; border:1.5px solid var(--rule); display:flex; flex-direction:column; overflow:hidden; }
  .hor-asex-hdr  { padding:14px 18px 10px; }
  .hor-asex-hdr.fission     { background:linear-gradient(135deg,#1a1040,#2d1464); }
  .hor-asex-hdr.budding     { background:linear-gradient(135deg,#1a0820,#3a0e40); }
  .hor-asex-hdr.regen       { background:linear-gradient(135deg,#0a1e10,#143020); }
  .hor-asex-hdr.fragment    { background:linear-gradient(135deg,#1e1000,#3c2200); }
  .hor-asex-tag  { font-size:9px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:rgba(255,255,255,0.4); margin-bottom:4px; }
  .hor-asex-name { font-family:'Playfair Display',serif; font-size:16px; font-weight:800; color:#fff; margin-bottom:3px; }
  .fission  .hor-asex-name { color:#c4b5fd; }
  .budding  .hor-asex-name { color:var(--rose-mid); }
  .regen    .hor-asex-name { color:var(--leaf-mid); }
  .fragment .hor-asex-name { color:var(--amber-mid); }
  .hor-asex-eg   { font-size:11px; color:rgba(255,255,255,0.45); }
  .hor-asex-body { padding:14px 18px; flex:1; }
  .hor-asex-item { display:flex; gap:8px; font-size:14px; color:var(--ink2); padding:7px 0; border-bottom:1px solid var(--rule); line-height:1.6; align-items:flex-start; }
  .hor-asex-item:last-child { border-bottom:none; }
  .hor-asex-dot  { min-width:6px; height:6px; border-radius:50%; margin-top:8px; flex-shrink:0; }
  .fission-dot   { background:#7c3aed; }
  .budding-dot   { background:var(--rose); }
  .regen-dot     { background:var(--leaf); }
  .fragment-dot  { background:var(--amber); }
  .hor-asex-item strong { font-weight:600; }

  /* ═══ CONTRACEPTIVE METHODS ═══ */
  .hor-contra-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:24px; }
  @media(max-width:620px){.hor-contra-grid{grid-template-columns:1fr 1fr;}}
  .hor-contra-card { background:var(--white); border-radius:10px; padding:16px 14px; border:1.5px solid var(--rule); border-top:3px solid var(--rose); text-align:center; }
  .hor-contra-card:nth-child(2){border-top-color:var(--sky);}
  .hor-contra-card:nth-child(3){border-top-color:var(--purple);}
  .hor-contra-card:nth-child(4){border-top-color:var(--teal);}
  .hor-contra-card:nth-child(5){border-top-color:var(--amber);}
  .hor-contra-icon  { font-size:24px; display:block; margin-bottom:8px; }
  .hor-contra-name  { font-family:'Playfair Display',serif; font-size:13px; font-weight:700; color:var(--ink); margin-bottom:4px; }
  .hor-contra-eg    { font-size:12px; color:var(--muted); line-height:1.5; }

  /* ═══ STD ALERT BOX ═══ */
  .hor-std-box {
    background:linear-gradient(135deg,#1a0a08,#2d1214);
    border-radius:12px; padding:24px 28px; margin-bottom:24px;
    border:1px solid rgba(194,24,91,0.3);
  }
  .hor-std-label { font-size:10px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(244,143,177,0.7); margin-bottom:14px; }
  .hor-std-list  { display:flex; flex-wrap:wrap; gap:10px; }
  .hor-std-tag   { background:rgba(194,24,91,0.2); border:1px solid rgba(194,24,91,0.35); border-radius:100px; padding:5px 14px; font-size:13px; font-weight:600; color:var(--rose-mid); }

  /* ═══ FAQ ═══ */
  .hor-faq-header { margin-bottom:12px; }
  .hor-faq-kicker { font-size:11px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--rose); background:var(--rose-lt); padding:6px 18px; border-radius:100px; }
  .hor-faq-title { font-family:'Playfair Display',serif; font-size:clamp(26px,4vw,36px); font-weight:900; color:var(--ink); letter-spacing:-0.02em; margin:16px 0 28px; }
  .hor-faq-item { border:1.5px solid var(--rule); border-radius:8px; margin-bottom:12px; overflow:hidden; background:var(--white); transition:border-color 0.2s; }
  .hor-faq-item.open { border-color:var(--rose); }
  .hor-faq-q { width:100%; background:none; border:none; cursor:pointer; display:flex; justify-content:space-between; align-items:center; padding:20px 24px; text-align:left; gap:16px; }
  .hor-faq-q-text { font-family:'DM Sans',sans-serif; font-size:15px; font-weight:600; color:var(--ink); line-height:1.5; }
  .hor-faq-item.open .hor-faq-q-text { color:var(--rose); }
  .hor-faq-icon { font-family:'Playfair Display',serif; font-size:22px; font-weight:800; color:var(--rose); flex-shrink:0; transition:transform 0.2s; }
  .hor-faq-item.open .hor-faq-icon { transform:rotate(45deg); }
  .hor-faq-ans { font-size:14.5px; color:var(--ink2); line-height:1.85; padding:0 24px; max-height:0; overflow:hidden; transition:max-height 0.35s ease,padding 0.35s ease; }
  .hor-faq-ans.visible { max-height:1000px; padding:0 24px 22px; }
  .hor-faq-ans strong { color:var(--rose2); font-weight:600; }
  .hor-faq-ans code { font-family:'DM Sans',sans-serif; font-size:13px; background:var(--rose-lt); padding:1px 6px; border-radius:3px; color:var(--rose2); }

  @media(max-width:700px){
    .hor-body{padding:48px 18px 72px;}
    .hor-sec-num{font-size:60px;}
  }
`;

const faqs = [
  {
    q: "What is reproduction? Why is it important?",
    a: (<><strong>Reproduction</strong> is the biological process by which a living organism produces offspring similar to itself.<br/><br/>
      It is <strong>not essential for individual survival</strong>, but it is essential for the <strong>perpetuation (continuation) of the species</strong>. Without reproduction, species would become extinct.<br/><br/>
      Information is transferred from parents to offspring in the form of <strong>DNA (Deoxyribonucleic acid)</strong> — the genetic material found in chromosomes in the nucleus of each cell. Reproduction ensures this genetic information is passed on to the next generation.</>),
  },
  {
    q: "What are the two types of reproduction? How do they differ?",
    a: (<><strong>Sexual Reproduction:</strong><br/>
      • Requires <strong>two parents</strong> (male and female)<br/>
      • Involves fusion of male and female gametes (fertilisation)<br/>
      • Offspring have <strong>genetic variation</strong> — not identical to parents<br/>
      • Slower process; fewer offspring<br/>
      • Examples: Humans, flowering plants<br/><br/>
      <strong>Asexual Reproduction:</strong><br/>
      • Requires only <strong>one parent</strong><br/>
      • Does NOT involve fusion of gametes<br/>
      • Offspring are <strong>exact genetic copies</strong> (clones) of the parent<br/>
      • Faster; produces large numbers<br/>
      • Examples: Amoeba (fission), Hydra (budding), Planaria (regeneration)</>),
  },
  {
    q: "Describe the structure of a flower and its reproductive parts.",
    a: (<>A flower has four main parts (whorls):<br/><br/>
      1. <strong>Sepals</strong> — green, outermost; protect the flower bud. Collectively: <em>calyx</em><br/>
      2. <strong>Petals</strong> — colourful; attract pollinators. Collectively: <em>corolla</em><br/>
      3. <strong>Stamens</strong> — male reproductive organs; consist of <strong>anther</strong> (produces pollen/male gametes) and <strong>filament</strong> (stalk). Collectively: <em>androecium</em><br/>
      4. <strong>Carpels/Pistil</strong> — female reproductive organs; consist of <strong>stigma</strong> (receives pollen), <strong>style</strong> (tube), and <strong>ovary</strong> (contains ovules/eggs). Collectively: <em>gynoecium</em><br/><br/>
      <strong>Bisexual flowers</strong>: both stamens and carpels present (e.g., Hibiscus)<br/>
      <strong>Unisexual flowers</strong>: only stamens OR only carpels (e.g., Corn)</>),
  },
  {
    q: "What is pollination? What is fertilisation? What happens after fertilisation?",
    a: (<><strong>Pollination:</strong> Transfer of pollen grains from the anther of one flower to the stigma of the same or a different flower.<br/><br/>
      <strong>Fertilisation:</strong> Fusion of the male gamete (pollen) with the female gamete (egg/ovum) inside the ovule. Occurs after the pollen tube grows down through the style.<br/><br/>
      <strong>After fertilisation:</strong><br/>
      • <strong>Zygote</strong> → develops into <strong>embryo</strong><br/>
      • <strong>Ovule</strong> → develops into <strong>seed</strong><br/>
      • <strong>Ovary</strong> → develops into <strong>fruit</strong><br/><br/>
      The seed contains the embryo (future plant) and food reserve. The fruit protects the seed and aids dispersal.</>),
  },
  {
    q: "Describe the male and female reproductive systems in humans.",
    a: (<><strong>Male reproductive system:</strong><br/>
      • <strong>Testes</strong> (pair) — produce sperms (male gametes) and testosterone hormone<br/>
      • <strong>Vas deferens</strong> — carries sperms from testes<br/>
      • <strong>Prostate gland + Seminal vesicles</strong> — secrete fluids that form semen<br/>
      • <strong>Penis/Urethra</strong> — semen exits through here<br/><br/>
      <strong>Female reproductive system:</strong><br/>
      • <strong>Ovaries</strong> (pair) — contain thousands of eggs (female gametes); secrete estrogen and progesterone<br/>
      • <strong>Oviducts/Fallopian tubes</strong> — carries egg from ovary to uterus; site of fertilisation<br/>
      • <strong>Uterus</strong> — embryo implants and develops here during pregnancy<br/>
      • <strong>Vagina</strong> — sperms enter through here<br/><br/>
      Fertilisation occurs in the <strong>fallopian tube</strong>.</>),
  },
  {
    q: "What is menstruation? What is the menstrual cycle?",
    a: (<>Every month, one egg is released from an ovary (ovulation). The uterus lining (endometrium) thickens in preparation for a potential pregnancy.<br/><br/>
      <strong>If the egg is NOT fertilised:</strong><br/>
      The uterus lining breaks down and is shed along with blood and mucus through the vagina. This is called <strong>menstruation</strong>. It typically lasts <strong>2 to 8 days</strong> and recurs approximately every 28 days — forming the <strong>menstrual cycle</strong>.<br/><br/>
      <strong>If the egg IS fertilised:</strong><br/>
      The zygote implants in the uterus wall and menstruation does not occur. Pregnancy begins.</>),
  },
  {
    q: "Describe the development of an embryo from fertilisation to birth.",
    a: (<>1. <strong>Fertilisation</strong> — sperm + egg → <strong>zygote</strong> (in fallopian tube)<br/>
      2. <strong>Cleavage</strong> — zygote repeatedly divides → ball of cells<br/>
      3. <strong>Implantation</strong> — ball of cells attaches to uterus wall<br/>
      4. <strong>Embryo</strong> — cells differentiate into tissues and organs<br/>
      5. <strong>Foetus</strong> — embryo stage showing recognisable features of the mature organism (hands, legs, face)<br/>
      6. <strong>Gestation</strong> — foetus develops for <strong>nine months</strong> inside the mother's womb<br/>
      7. <strong>Birth</strong> — fully developed baby delivered<br/><br/>
      The <strong>placenta</strong> connects the embryo to the uterine wall, supplying nutrients and oxygen from the mother's blood.</>),
  },
  {
    q: "What is vegetative propagation? What are its advantages?",
    a: (<><strong>Vegetative propagation</strong> is a form of asexual reproduction in plants where new plants develop from vegetative parts (roots, stems, leaves) rather than seeds.<br/><br/>
      <strong>Natural examples:</strong><br/>
      • Potato — buds (eyes) on stem develop into plants<br/>
      • Bryophyllum — leaf margin buds grow into plants<br/>
      • Sweet potato / Dahlia — roots detach and give rise to new plants<br/><br/>
      <strong>Advantages:</strong><br/>
      1. Only method for <strong>seedless plants</strong> (sugarcane, banana, rose)<br/>
      2. Produces <strong>exact copies</strong> of parent plant<br/>
      3. Large numbers of plants produced quickly<br/>
      4. <strong>Disease-free</strong> plants can be propagated<br/>
      5. Plants bear fruit/flowers faster than seed-grown plants</>),
  },
  {
    q: "Explain the artificial methods of vegetative propagation.",
    a: (<><strong>1. Cutting:</strong><br/>
      • <em>Stem cutting</em> — short stem lengths planted in soil → develop adventitious roots. Examples: Rose, Coleus, Begonia<br/>
      • <em>Root cutting</em> — root pieces develop into plants. Examples: Lime, Tamarind<br/><br/>
      <strong>2. Layering:</strong><br/>
      • <em>Mound layering</em> — branch bent to touch soil; covered with soil; roots develop at node; then cut and planted<br/>
      • <em>Air layering</em> — part of stem bark removed, wrapped in moist cotton in a bag; roots develop; then cut off. Example: Rubber<br/><br/>
      <strong>3. Grafting:</strong><br/>
      • Root portion used = <strong>stock</strong>; stem portion used = <strong>scion</strong><br/>
      • Bud grafting — dormant bud grafted onto stock (e.g., Rose)<br/>
      • Stem grafting — scion inserted into cut stock (e.g., Mango, Apple, Citrus)<br/><br/>
      <strong>4. Tissue culture (Micropropagation):</strong><br/>
      Meristematic tissue grown in nutrient medium → callus → propagated into new plants. Used for orchids, bananas, disease-free plants.</>),
  },
  {
    q: "What is hybridisation? What are its advantages?",
    a: (<><strong>Hybridisation</strong> is the mating of two individuals of different genotypes to produce a hybrid with desirable characteristics.<br/><br/>
      <strong>Process:</strong><br/>
      1. Select male and female parent plants<br/>
      2. <strong>Emasculation</strong> — remove anthers from female flower<br/>
      3. <strong>Bagging</strong> — cover emasculated flower to prevent unwanted cross-pollination<br/>
      4. Transfer pollen from male parent to stigma of female parent<br/><br/>
      <strong>Advantages:</strong><br/>
      1. Higher yielding, better quality seeds<br/>
      2. Disease and drought resistant varieties<br/>
      3. Adaptation to wider range of habitats<br/>
      4. Insect and pest resistance<br/><br/>
      Examples: hybrid rice, hybrid wheat, hybrid maize</>),
  },
  {
    q: "Describe the different modes of asexual reproduction.",
    a: (<><strong>1. Fission</strong> — parent cell splits into two or more<br/>
      • Binary fission: single cell divides into 2 equal daughters (e.g., Amoeba, Bacteria)<br/>
      • Multiple fission: single cell divides into many simultaneously (e.g., Plasmodium, Amoeba)<br/><br/>
      <strong>2. Budding</strong> — new individual grows as a protrusion (bud) from parent; separates and becomes independent. Example: Hydra, Yeast<br/><br/>
      <strong>3. Regeneration</strong> — body parts regenerate into whole organisms. Example: Planaria (cut into pieces → each piece grows into complete organism), Hydra<br/><br/>
      <strong>4. Fragmentation</strong> — organism breaks into fragments; each fragment develops into new organism. Example: Lichens, Spirogyra<br/><br/>
      All these produce genetically identical offspring (clones) and require only one parent.</>),
  },
  {
    q: "What are sexually transmitted diseases (STDs)? What are contraceptive methods?",
    a: (<><strong>STDs</strong> are infections transferred through sexual contact:<br/>
      • HIV/AIDS — most serious; weakens immune system; no cure<br/>
      • Syphilis — bacterial; treatable with antibiotics<br/>
      • Gonorrhea — bacterial; treatable<br/>
      • Herpes — viral; causes sores<br/>
      Condoms provide significant protection against STDs.<br/><br/>
      <strong>Contraceptive methods:</strong><br/>
      • <strong>Natural</strong> — abstinence (avoiding sexual contact)<br/>
      • <strong>Barrier</strong> — condoms (male/female); physically prevent sperm from reaching egg<br/>
      • <strong>Oral contraceptives</strong> — hormonal pills; prevent ovulation<br/>
      • <strong>Implants</strong> — copper-T or loop inserted in uterus; prevents implantation<br/>
      • <strong>Surgical</strong> — Vasectomy (males: vas deferens cut); Tubectomy (females: fallopian tube cut/tied)</>),
  },
];

export default function HowDoOrganismsReproduce() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="hor-root">

        {/* ══════ HERO ══════ */}
        <div className="hor-hero">
          <div className="hor-hero-left">
            <div className="hor-hero-grid" />
            <div className="hor-subject-pill">
              <div className="hor-subject-dot" />
              Biology · Class 10 · Chapter 3
            </div>
            <div className="hor-hero-eyebrow">Science — CBSE / NCERT</div>
            <h1 className="hor-hero-title">
              <span className="t1">How do</span>
              <span className="t2">Organisms</span>
              <span className="t1" style={{color:"#fff"}}>Reproduce?</span>
              <span className="t3">Sexual · Asexual · Vegetative · Human Reproduction</span>
            </h1>
            <p className="hor-hero-desc">
              From a single Amoeba splitting in two to a flower's delicate dance with pollinators — reproduction is life's most fundamental drive to continue itself across generations.
            </p>
            <div className="hor-hero-meta">
              {[
                { label:"Subject",  value:"Biology" },
                { label:"Class",    value:"10th Standard" },
                { label:"Chapter",  value:"Chapter 3" },
                { label:"Board",    value:"CBSE / NCERT" },
              ].map(x => (
                <div className="hor-meta-item" key={x.label}>
                  <div className="hor-meta-label">{x.label}</div>
                  <div className="hor-meta-value">{x.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hor-hero-right">
            <div className="hor-hero-diagram-pair">
              <div className="hor-hero-diagram-card">
                <div className="hor-hero-diagram-label">🌸 Flower Structure — Parts of a Flower</div>
                <img src="/images/reproduction/flower-anatomy.png" alt="Flower anatomy diagram showing stigma, style, ovary, petal, sepal, anther, filament" style={{width:"100%",display:"block",padding:"16px",background:"var(--white)",maxHeight:"220px",objectFit:"contain"}} />
              </div>
              <div className="hor-hero-diagram-card">
                <div className="hor-hero-diagram-label">✂️ Stem Cutting — Vegetative Propagation</div>
                <img src="/images/reproduction/stem-cutting.png" alt="Stem cutting diagram showing parent plant, blade, cutting and planting process" style={{width:"100%",display:"block",padding:"16px",background:"var(--white)",maxHeight:"220px",objectFit:"contain"}} />
              </div>
            </div>
          </div>
        </div>

        <div className="hor-body">

          {/* Intro */}
          <div className="hor-intro">
            <div>
              <div className="hor-intro-kicker">Chapter Overview</div>
              <h2 className="hor-intro-headline">Life's Drive to <em>Continue Itself</em></h2>
              <p className="hor-intro-body"><strong>Reproduction</strong> is not essential for the survival of an individual — but it is absolutely essential for the survival of a species. This chapter covers two major strategies: <strong>asexual reproduction</strong> (one parent, exact clones) and <strong>sexual reproduction</strong> (two parents, genetic variation).</p>
              <p className="hor-intro-body">We explore reproduction in plants (vegetative propagation, flower structure, pollination), in simple organisms (Amoeba, Hydra, Planaria), and in humans — from puberty through embryo development to birth.</p>
            </div>
            <div className="hor-intro-sidebar">
              <div className="hor-sidebar-label">Topics covered</div>
              <div className="hor-sidebar-title">How do Organisms Reproduce</div>
              <ul className="hor-sidebar-list">
                {[
                  ["1","Reproduction — Types & DNA"],
                  ["2","Asexual Reproduction Modes"],
                  ["3","Sexual Reproduction in Plants"],
                  ["4","Vegetative Propagation"],
                  ["5","Human Reproductive System"],
                  ["6","Embryo Development & Birth"],
                  ["7","STDs & Contraception"],
                ].map(([n,t]) => (
                  <li className="hor-sidebar-item" key={n}>
                    <span className="hor-sidebar-num">{n}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ══ CH 1: TYPES OF REPRODUCTION ══ */}
          <div className="hor-chapter-divider">
            <div className="hor-ch-badge"><span className="hor-ch-badge-num">01</span>Types of Reproduction</div>
          </div>
          <div className="hor-sec-head">
            <span className="hor-sec-num">1</span>
            <div className="hor-sec-kicker">Fundamentals</div>
            <h2 className="hor-sec-title">Sexual vs <span>Asexual Reproduction</span></h2>
          </div>
          <p className="hor-body-text">Reproduction is the biological process by which organisms produce offspring. Information is passed from parent to offspring through <strong>DNA</strong> — the genetic material in chromosomes. There are two fundamentally different strategies:</p>

          <div className="hor-repro-compare">
            <div className="hor-rc-col sexual">
              <span className="hor-rc-badge">Two Parents</span>
              <div className="hor-rc-title">Sexual Reproduction</div>
              <div className="hor-rc-def">Requires fusion of male and female gametes. Offspring are genetically unique — not identical to either parent.</div>
              <div className="hor-rc-list">
                {[
                  <><strong>Two parents</strong> required — male and female</>,
                  "Involves fusion of male and female gametes (fertilisation)",
                  <><strong>More variation</strong> in offspring — allows natural selection</>,
                  "Slower; fewer offspring per cycle",
                  "Examples: Humans, flowering plants, most animals",
                ].map((t,i)=>(<div className="hor-rc-item" key={i}><span className="hor-rc-dot"/><span>{t}</span></div>))}
              </div>
            </div>
            <div className="hor-rc-col asexual">
              <span className="hor-rc-badge">One Parent</span>
              <div className="hor-rc-title">Asexual Reproduction</div>
              <div className="hor-rc-def">No fusion of gametes. Offspring are exact genetic copies (clones) of the parent. Only one parent involved.</div>
              <div className="hor-rc-list">
                {[
                  <><strong>Only one parent</strong> required</>,
                  "Does NOT involve fusion of gametes",
                  <><strong>Offspring are identical</strong> clones of parent</>,
                  "Faster; produces large numbers quickly",
                  "Examples: Amoeba, Hydra, Yeast, Planaria, Spirogyra",
                ].map((t,i)=>(<div className="hor-rc-item" key={i}><span className="hor-rc-dot"/><span>{t}</span></div>))}
              </div>
            </div>
          </div>

          <div className="hor-alert rose">
            🧬 <strong>DNA & Variation:</strong> DNA copying is never 100% perfect — small errors (mutations) create variation. Sexual reproduction adds more variation by combining DNA from two parents. Variation is the raw material for evolution.
          </div>

          {/* ══ CH 2: ASEXUAL MODES ══ */}
          <div className="hor-chapter-divider">
            <div className="hor-ch-badge"><span className="hor-ch-badge-num">02</span>Asexual Reproduction</div>
          </div>
          <div className="hor-sec-head">
            <span className="hor-sec-num">2</span>
            <div className="hor-sec-kicker">One-Parent Strategies</div>
            <h2 className="hor-sec-title">Modes of <span>Asexual Reproduction</span></h2>
          </div>
          <p className="hor-body-text">Asexual reproduction uses several mechanisms — all requiring only one parent and producing genetically identical offspring:</p>

          <div className="hor-asex-grid">
            <div className="hor-asex-card">
              <div className="hor-asex-hdr fission">
                <div className="hor-asex-tag">Mode 1</div>
                <div className="hor-asex-name">Fission</div>
                <div className="hor-asex-eg">Amoeba · Plasmodium · Bacteria</div>
              </div>
              <div className="hor-asex-body">
                {[
                  <><strong>Binary fission:</strong> Parent cell divides into 2 equal daughter cells. Example: Amoeba, Bacteria</>,
                  <><strong>Multiple fission:</strong> Single cell divides simultaneously into many daughter cells. Example: Plasmodium (malarial parasite), Amoeba (during unfavourable conditions)</>,
                  "Each daughter cell is an identical copy of the parent",
                ].map((t,i)=>(<div className="hor-asex-item" key={i}><span className="hor-asex-dot fission-dot"/><span>{t}</span></div>))}
              </div>
            </div>
            <div className="hor-asex-card">
              <div className="hor-asex-hdr budding">
                <div className="hor-asex-tag">Mode 2</div>
                <div className="hor-asex-name">Budding</div>
                <div className="hor-asex-eg">Hydra · Yeast</div>
              </div>
              <div className="hor-asex-body">
                {[
                  "New individual grows as a protrusion (bud) on the parent body",
                  "Bud grows, matures and eventually separates to become an independent organism",
                  <><strong>Hydra</strong> — small bud emerges from body wall, grows, detaches</>,
                  "Yeast reproduces by budding under suitable nutrient conditions",
                ].map((t,i)=>(<div className="hor-asex-item" key={i}><span className="hor-asex-dot budding-dot"/><span>{t}</span></div>))}
              </div>
            </div>
            <div className="hor-asex-card">
              <div className="hor-asex-hdr regen">
                <div className="hor-asex-tag">Mode 3</div>
                <div className="hor-asex-name">Regeneration</div>
                <div className="hor-asex-eg">Planaria · Hydra · Starfish</div>
              </div>
              <div className="hor-asex-body">
                {[
                  "Ability to regrow lost or injured body parts into complete organisms",
                  <><strong>Planaria</strong> — if cut into pieces, each piece regenerates into a complete new organism</>,
                  "Specialised cells (called neoblasts in Planaria) rapidly proliferate to replace missing parts",
                  "Not all organisms can regenerate — only those with highly undifferentiated cells",
                ].map((t,i)=>(<div className="hor-asex-item" key={i}><span className="hor-asex-dot regen-dot"/><span>{t}</span></div>))}
              </div>
            </div>
            <div className="hor-asex-card">
              <div className="hor-asex-hdr fragment">
                <div className="hor-asex-tag">Mode 4</div>
                <div className="hor-asex-name">Fragmentation</div>
                <div className="hor-asex-eg">Lichens · Spirogyra · Algae</div>
              </div>
              <div className="hor-asex-body">
                {[
                  "Parent body breaks into fragments — each fragment grows into a new organism",
                  <><strong>Spirogyra</strong> — filamentous alga breaks into pieces, each piece grows independently</>,
                  <><strong>Lichens</strong> — reproduce by fragmentation under harsh conditions</>,
                  "Different from regeneration — fragmentation is a reproductive strategy, not repair",
                ].map((t,i)=>(<div className="hor-asex-item" key={i}><span className="hor-asex-dot fragment-dot"/><span>{t}</span></div>))}
              </div>
            </div>
          </div>

          {/* ══ CH 3: PLANT SEXUAL REPRODUCTION ══ */}
          <div className="hor-chapter-divider">
            <div className="hor-ch-badge"><span className="hor-ch-badge-num">03</span>Sexual Reproduction in Plants</div>
          </div>
          <div className="hor-sec-head">
            <span className="hor-sec-num">3</span>
            <div className="hor-sec-kicker">Flowering Plants</div>
            <h2 className="hor-sec-title">Flower Structure <span>&amp; Pollination</span></h2>
          </div>
          <p className="hor-body-text">In <strong>angiosperms</strong> (flowering plants), the flower is the reproductive organ. It contains both male and female parts and facilitates sexual reproduction through pollination and fertilisation.</p>

          <div className="hor-flower-layout">
            <div className="hor-flower-img-card">
              <div className="hor-flower-img-label">🌸 Structure of a Flower — Parts &amp; Labels</div>
              <img src="/images/reproduction/flower-anatomy.png" alt="Labelled flower diagram" style={{width:"100%",display:"block",padding:"16px",background:"var(--white)",maxHeight:"280px",objectFit:"contain"}} />
            </div>
            <div className="hor-flower-parts">
              <div className="hor-flower-part">
                <div className="hor-fp-tag">Outermost Whorl</div>
                <div className="hor-fp-name">Sepals (Calyx)</div>
                <div className="hor-fp-desc"><strong>Green</strong> in colour. Protect the flower bud before it opens. Collectively called <strong>calyx</strong>.</div>
              </div>
              <div className="hor-flower-part">
                <div className="hor-fp-tag">2nd Whorl — Attract Pollinators</div>
                <div className="hor-fp-name">Petals (Corolla)</div>
                <div className="hor-fp-desc"><strong>Colourful</strong> structures that attract bees, butterflies, birds and other pollinators. Collectively called <strong>corolla</strong>.</div>
              </div>
              <div className="hor-flower-part">
                <div className="hor-fp-tag">Male Reproductive Part</div>
                <div className="hor-fp-name">Stamen (Androecium)</div>
                <div className="hor-fp-desc">Consists of <strong>anther</strong> (produces pollen = male gametes) and <strong>filament</strong> (stalk supporting anther). Pollen released when anther bursts.</div>
              </div>
              <div className="hor-flower-part">
                <div className="hor-fp-tag">Female Reproductive Part</div>
                <div className="hor-fp-name">Carpel / Pistil (Gynoecium)</div>
                <div className="hor-fp-desc">Consists of <strong>stigma</strong> (receives pollen), <strong>style</strong> (connects stigma to ovary), and <strong>ovary</strong> (contains ovules with female gametes).</div>
              </div>
            </div>
          </div>

          <div className="hor-alert green">
            🌺 <strong>Bisexual flowers</strong> have both stamens and carpels (e.g., Hibiscus, Rose). <strong>Unisexual flowers</strong> have either stamens OR carpels only (e.g., Corn, Papaya). Each ovule contains one egg cell (female gamete).
          </div>

          {/* Pollination to fertilisation flow */}
          <div className="hor-pollen-flow">
            <div className="hor-pf-header">
              <span style={{fontSize:"18px"}}>🌸</span>
              <div className="hor-pf-title">From Pollination to Fruit — The Complete Journey</div>
              <div className="hor-pf-sub">Sexual reproduction in angiosperms</div>
            </div>
            <div className="hor-pf-body">
              <div className="hor-pf-steps">
                {[
                  { emoji:"🌿", name:"Anther Bursts",       sub:"Pollen (♂ gametes) released" },
                  { isArrow:true },
                  { emoji:"💨", name:"Pollination",         sub:"Pollen lands on stigma" },
                  { isArrow:true },
                  { emoji:"🌱", name:"Pollen Tube Grows",   sub:"Down through style into ovule" },
                  { isArrow:true },
                  { emoji:"⚡", name:"Fertilisation",       sub:"♂ + ♀ gametes fuse → Zygote" },
                  { isArrow:true },
                  { emoji:"🍎", name:"Fruit & Seed Form",   sub:"Ovule→Seed; Ovary→Fruit" },
                ].map((s,i) => s.isArrow
                  ? <div className="hor-pf-arrow" key={i}>→</div>
                  : <div className="hor-pf-step" key={i}>
                      <div className="hor-pf-circle">{s.emoji}</div>
                      <div className="hor-pf-name">{s.name}</div>
                      <div className="hor-pf-sub2">{s.sub}</div>
                    </div>
                )}
              </div>
              <div className="hor-pf-result">
                <strong>After fertilisation:</strong> Zygote → Embryo · Ovule → Seed · Ovary → Fruit · Ovule integuments → Seed coat
              </div>
            </div>
          </div>

          {/* ══ CH 4: VEGETATIVE PROPAGATION ══ */}
          <div className="hor-chapter-divider">
            <div className="hor-ch-badge"><span className="hor-ch-badge-num">04</span>Vegetative Propagation</div>
          </div>
          <div className="hor-sec-head">
            <span className="hor-sec-num">4</span>
            <div className="hor-sec-kicker">Plants Reproducing Without Seeds</div>
            <h2 className="hor-sec-title">Natural &amp; Artificial <span>Vegetative Propagation</span></h2>
          </div>
          <p className="hor-body-text"><strong>Vegetative propagation</strong> is asexual reproduction in plants where new individuals develop from vegetative parts (root, stem, leaf) rather than seeds. It produces genetically identical plants.</p>

          {/* Natural methods */}
          <div className="hor-veg-grid">
            {[
              { icon:"🥔", name:"Stem (Tuber)",     eg:"Potato",       desc:"Buds (eyes) on potato surface develop into new plants when planted." },
              { icon:"🌿", name:"Leaf Buds",         eg:"Bryophyllum",  desc:"Leaf margin buds develop into tiny plantlets that fall and grow." },
              { icon:"🌱", name:"Roots",             eg:"Sweet Potato", desc:"Roots of sweet potato, dahlia detach and give rise to new plants." },
              { icon:"🌾", name:"Stem Cutting",      eg:"Sugarcane",    desc:"Sugarcane, rose, money plant reproduce by planted stem cuttings." },
              { icon:"🔗", name:"Layering",          eg:"Rubber, Rose", desc:"Branch bent to soil; roots form at node; then separated." },
              { icon:"🌳", name:"Grafting",          eg:"Mango, Apple", desc:"Stock (root) + Scion (stem) joined — combines best of two plants." },
            ].map(v => (
              <div className="hor-veg-card" key={v.name}>
                <span className="hor-veg-icon">{v.icon}</span>
                <div className="hor-veg-name">{v.name}</div>
                <div className="hor-veg-eg">{v.eg}</div>
                <div className="hor-veg-desc">{v.desc}</div>
              </div>
            ))}
          </div>

          {/* Cutting image + info */}
          <div className="hor-cutting-layout">
            <div className="hor-diagram-card">
              <div className="hor-diagram-label plant">✂️ Stem Cutting — Vegetative Propagation</div>
              <img src="/images/reproduction/stem-cutting.png" alt="Stem cutting propagation diagram" style={{width:"100%",display:"block",padding:"16px",background:"var(--white)",maxHeight:"280px",objectFit:"contain"}} />
            </div>
            <div className="hor-cutting-info">
              <div className="hor-cutting-item">
                <div className="hor-ci-title">Stem Cutting</div>
                <div className="hor-ci-desc">Short lengths of stem cut at a slant with a blade. Planted in soil (sand + compost). <strong>Adventitious roots</strong> develop from the cut end. Examples: Rose, Coleus, Begonia.</div>
              </div>
              <div className="hor-cutting-item">
                <div className="hor-ci-title">Root Cutting</div>
                <div className="hor-ci-desc">Root sections cut and placed in soil. Develop shoots and roots to become independent plants. Examples: <strong>Lime, Tamarind</strong>.</div>
              </div>
              <div className="hor-cutting-item">
                <div className="hor-ci-title">Tissue Culture (Micropropagation)</div>
                <div className="hor-ci-desc">Meristematic tissue grown in sterile nutrient medium → callus → new plants. Produces <strong>disease-free, large numbers</strong> of plants. Used for orchids, bananas, potato.</div>
              </div>
            </div>
          </div>

          {/* Artificial methods table */}
          <div className="hor-art-table">
            <div className="hor-at-head">
              <div className="hor-at-th">Method</div>
              <div className="hor-at-th">Type</div>
              <div className="hor-at-th">How it Works / Examples</div>
            </div>
            {[
              ["Stem Cutting",    "artificial", "Stem pieces planted in soil → adventitious roots form. Rose, Coleus, Begonia"],
              ["Root Cutting",    "artificial", "Root pieces placed in soil → develop into plants. Lime, Tamarind"],
              ["Mound Layering",  "artificial", "Branch bent to soil, covered; roots form at node; then cut. Many shrubs"],
              ["Air Layering",    "artificial", "Bark removed, wrapped in moist cotton in bag; roots form; then separated. Rubber"],
              ["Bud Grafting",    "artificial", "Dormant bud (scion) grafted onto root stock. Rose"],
              ["Stem Grafting",   "artificial", "Scion inserted into slit/cut stock; bound. Mango, Citrus, Apple"],
              ["Tissue Culture",  "artificial", "Meristematic cells → callus → plants in sterile medium. Orchids, Banana"],
              ["Stem (Tuber)",    "natural",    "Potato eyes (buds) develop into new plants when planted. Potato"],
              ["Leaf Propagation","natural",    "Bryophyllum leaf margin buds develop into plantlets. Bryophyllum"],
              ["Root Propagation","natural",    "Detached roots of sweet potato/dahlia grow into new plants"],
            ].map(([m,t,d]) => (
              <div className={`hor-at-row`} key={m}>
                <div className="hor-at-cell method">{m}</div>
                <div className="hor-at-cell"><span className={`hor-at-badge ${t === "natural" ? "natural" : "artifici"}`}>{t === "natural" ? "Natural" : "Artificial"}</span></div>
                <div className="hor-at-cell">{d}</div>
              </div>
            ))}
          </div>

          {/* ══ CH 5: HUMAN REPRODUCTION ══ */}
          <div className="hor-chapter-divider">
            <div className="hor-ch-badge"><span className="hor-ch-badge-num">05</span>Human Reproduction</div>
          </div>
          <div className="hor-sec-head">
            <span className="hor-sec-num">5</span>
            <div className="hor-sec-kicker">Reproductive Systems</div>
            <h2 className="hor-sec-title">Male &amp; Female <span>Reproductive Systems</span></h2>
          </div>
          <p className="hor-body-text"><strong>Puberty</strong> is the period when a young individual develops into a sexually mature adult — essential before reproduction can occur. The human reproductive systems are designed for the fusion of gametes and development of the embryo.</p>

          {/* Male diagram */}
          <div className="hor-diagram-card">
            <div className="hor-diagram-label male">♂ Male Reproductive System — Anatomy</div>
            <img src="/images/reproduction/male-reproductive-system.png" alt="Male reproductive system diagram" style={{width:"100%",display:"block",padding:"20px",background:"var(--white)",maxHeight:"380px",objectFit:"contain"}} />
          </div>

          {/* Female diagram */}
          <div className="hor-diagram-card">
            <div className="hor-diagram-label female">♀ Female Reproductive System — Anatomy</div>
            <img src="/images/reproduction/female-reproductive-system.png" alt="Female reproductive system diagram" style={{width:"100%",display:"block",padding:"20px",background:"var(--white)",maxHeight:"380px",objectFit:"contain"}} />
          </div>

          {/* System cards */}
          <div className="hor-repro-system">
            <div className="hor-rs-card">
              <div className="hor-rs-hdr male">
                <div className="hor-rs-tag">Male System</div>
                <div className="hor-rs-name">♂ Male Reproductive Organs</div>
              </div>
              <div className="hor-rs-body">
                {[
                  <><strong>Testes (pair)</strong> — produce sperms (male gametes) and testosterone hormone. Located in scrotum (outside body — lower temperature needed for sperm production)</>,
                  <><strong>Vas deferens</strong> — muscular tube that carries sperms from testes toward urethra</>,
                  <><strong>Seminal vesicles</strong> — secrete fluid that nourishes sperm; forms part of semen</>,
                  <><strong>Prostate gland</strong> — secretes fluid that activates sperm motility</>,
                  <><strong>Urethra</strong> — common passage for urine and semen (not simultaneously)</>,
                  <><strong>Sperms</strong> = male gametes with head (nucleus), middle piece (mitochondria), and tail (flagellum for movement)</>,
                ].map((t,i)=>(<div className="hor-rs-item" key={i}><span className="hor-rs-dot male-dot"/><span>{t}</span></div>))}
              </div>
            </div>
            <div className="hor-rs-card">
              <div className="hor-rs-hdr female">
                <div className="hor-rs-tag">Female System</div>
                <div className="hor-rs-name">♀ Female Reproductive Organs</div>
              </div>
              <div className="hor-rs-body">
                {[
                  <><strong>Ovaries (pair)</strong> — contain thousands of eggs (ova); secrete estrogen and progesterone</>,
                  <><strong>Fallopian tubes (oviducts)</strong> — carry egg from ovary to uterus; <strong>site of fertilisation</strong></>,
                  <><strong>Uterus (womb)</strong> — pear-shaped muscular organ; embryo implants and develops here</>,
                  <><strong>Endometrium</strong> — inner lining of uterus; thickens to receive embryo; shed during menstruation if no fertilisation</>,
                  <><strong>Cervix</strong> — lower narrow part of uterus; opening into vagina</>,
                  <><strong>Vagina</strong> — muscular canal; sperms enter here; also birth canal</>,
                ].map((t,i)=>(<div className="hor-rs-item" key={i}><span className="hor-rs-dot female-dot"/><span>{t}</span></div>))}
              </div>
            </div>
          </div>

          <div className="hor-alert rose">
            🩸 <strong>Menstruation:</strong> If the egg released each month is NOT fertilised, the uterus lining (endometrium) breaks down and is shed as blood and mucus through the vagina. Lasts 2–8 days; cycle repeats approximately every 28 days.
          </div>

          {/* Embryo development */}
          <div className="hor-divider"><div className="hor-divider-mark"/></div>
          <div className="hor-sec-head">
            <span className="hor-sec-num">6</span>
            <div className="hor-sec-kicker">From Zygote to Birth</div>
            <h2 className="hor-sec-title">Embryo Development <span>&amp; Birth</span></h2>
          </div>

          <div className="hor-embryo-timeline">
            <div className="hor-et-header">
              <span style={{fontSize:"18px"}}>🫀</span>
              <div className="hor-et-title">Journey from Fertilisation to Birth</div>
              <div className="hor-et-sub">9 months gestation period</div>
            </div>
            <div className="hor-et-body">
              <div className="hor-et-steps">
                {[
                  { emoji:"⚡", stage:"Fertilisation",    detail:<><strong>Sperm + Ovum</strong> fuse in the fallopian tube → <strong>Zygote</strong> formed. Contains full set of chromosomes (46 in humans).</> },
                  { emoji:"🔄", stage:"Cell Division",    detail:<>Zygote undergoes repeated mitotic divisions (cleavage) → forms a ball of cells called <strong>morula</strong>.</> },
                  { emoji:"🟣", stage:"Implantation",     detail:<>Ball of cells travels to uterus and <strong>implants in the uterine wall</strong>. Develops into blastocyst.</> },
                  { emoji:"🧬", stage:"Embryo Stage",     detail:<>Cells <strong>differentiate</strong> into tissues and organs. At this stage called <strong>embryo</strong>. Heart, limbs begin forming.</> },
                  { emoji:"👶", stage:"Foetus Stage",     detail:<><strong>Foetus</strong> — stage showing main recognisable features of mature organism (hands, legs, face, fingers). All major organs present.</> },
                  { emoji:"🤰", stage:"Gestation (9 months)", detail:<>Foetus develops inside mother's womb. <strong>Placenta</strong> provides nutrients and oxygen from mother's blood. Waste removed.</> },
                  { emoji:"🎉", stage:"Birth (Parturition)", detail:<>After ~9 months gestation, the fully developed baby is <strong>delivered</strong> through the birth canal (vagina).</> },
                ].map((s,i)=>(
                  <div className="hor-et-step" key={i}>
                    <div className="hor-et-left">
                      <div className="hor-et-circle">{s.emoji}</div>
                      <div className="hor-et-line"/>
                    </div>
                    <div className="hor-et-content">
                      <div className="hor-et-stage">{s.stage}</div>
                      <div className="hor-et-detail">{s.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hor-pull-quote">
            <p>"A single fertilised cell — smaller than the period at the end of this sentence — carries all the instructions to build a complete human being of 37 trillion cells over nine months."</p>
          </div>

          {/* ══ CH 6: STDs & CONTRACEPTION ══ */}
          <div className="hor-chapter-divider">
            <div className="hor-ch-badge"><span className="hor-ch-badge-num">06</span>STDs &amp; Contraception</div>
          </div>
          <div className="hor-sec-head">
            <span className="hor-sec-num">7</span>
            <div className="hor-sec-kicker">Health &amp; Family Planning</div>
            <h2 className="hor-sec-title">STDs &amp; <span>Contraceptive Methods</span></h2>
          </div>

          <div className="hor-std-box">
            <div className="hor-std-label">⚠️ Sexually Transmitted Diseases (STDs) — Spread through sexual contact</div>
            <div className="hor-std-list">
              {["HIV / AIDS","Syphilis","Gonorrhea","Herpes","HPV","Chlamydia"].map(s => (
                <span className="hor-std-tag" key={s}>{s}</span>
              ))}
            </div>
          </div>

          <div className="hor-alert amber">
            🛡️ <strong>Condoms</strong> provide significant protection against both STDs and unwanted pregnancy. HIV/AIDS has no cure — prevention is the only protection.
          </div>

          <div className="hor-contra-grid">
            {[
              { icon:"🚫", name:"Natural Method",        eg:"Abstinence — avoiding sexual contact entirely" },
              { icon:"🛡️", name:"Barrier Method",        eg:"Condoms (male/female) — physically block sperm" },
              { icon:"💊", name:"Oral Contraceptives",    eg:"Hormonal pills — prevent ovulation" },
              { icon:"🔩", name:"IUD / Implants",         eg:"Copper-T, loop — inserted in uterus; prevents implantation" },
              { icon:"✂️", name:"Surgical Methods",       eg:"Vasectomy (male) · Tubectomy (female) — permanent" },
            ].map(c=>(
              <div className="hor-contra-card" key={c.name}>
                <span className="hor-contra-icon">{c.icon}</span>
                <div className="hor-contra-name">{c.name}</div>
                <div className="hor-contra-eg">{c.eg}</div>
              </div>
            ))}
          </div>

          <div className="hor-alert green">
            🌱 <strong>Hybridisation advantages:</strong> Higher yield · Disease resistance · Drought resistance · Wider habitat adaptation · Pest resistance. Process: Selection → Emasculation → Bagging → Pollination.
          </div>

          {/* FAQ */}
          <div className="hor-divider"><div className="hor-divider-mark"/></div>
          <div className="hor-faq-header"><span className="hor-faq-kicker">Exam Preparation</span></div>
          <h2 className="hor-faq-title">Frequently Asked Questions</h2>
          {faqs.map((faq,i)=>(
            <div className={`hor-faq-item${openIndex===i?" open":""}`} key={i}>
              <button className="hor-faq-q" onClick={()=>toggle(i)}>
                <span className="hor-faq-q-text">Q{i+1}. {faq.q}</span>
                <span className="hor-faq-icon">+</span>
              </button>
              <div className={`hor-faq-ans${openIndex===i?" visible":""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
