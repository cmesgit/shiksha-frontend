import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=DM+Sans:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --void:      #05020f;
    --deep:      #0c0620;
    --neural:    #7c3aed;
    --neural2:   #5b21b6;
    --signal:    #a78bfa;
    --signal-lt: #ede9fe;
    --signal-mid:#c4b5fd;
    --fire:      #f59e0b;
    --fire-lt:   #fef3c7;
    --fire-mid:  #fcd34d;
    --synapse:   #06b6d4;
    --synapse-lt:#e0f2fe;
    --synapse-mid:#67e8f9;
    --hormone:   #ec4899;
    --hormone-lt:#fce7f3;
    --hormone-mid:#f9a8d4;
    --leaf:      #10b981;
    --leaf-lt:   #d1fae5;
    --leaf-mid:  #6ee7b7;
    --danger:    #ef4444;
    --danger-lt: #fee2e2;
    --paper:     #fafafa;
    --paper2:    #f3f0ff;
    --ink:       #0f0a1e;
    --ink2:      #1e1640;
    --muted:     #6b7280;
    --rule:      #e5e0f8;
    --white:     #ffffff;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .cc-root { font-family: 'DM Sans', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; font-size: 16px; }

  /* ═══ HERO — full dark neural/electric ═══ */
  .cc-hero {
    background: var(--void);
    min-height: 100vh; position: relative; overflow: hidden;
    display: flex; flex-direction: column; justify-content: center;
    padding: 80px 0 72px;
  }
  /* Circuit grid */
  .cc-hero-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(124,58,237,0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(124,58,237,0.08) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  /* Neural glow blobs */
  .cc-glow-1 { position:absolute; top:-10%; left:15%; width:500px; height:500px; border-radius:50%; background:radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 65%); pointer-events:none; }
  .cc-glow-2 { position:absolute; bottom:0%; right:5%; width:400px; height:400px; border-radius:50%; background:radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 65%); pointer-events:none; }
  .cc-glow-3 { position:absolute; top:40%; left:55%; width:300px; height:300px; border-radius:50%; background:radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 65%); pointer-events:none; }

  /* Neuron SVG illustration top-right */
  .cc-hero-neuron { position:absolute; top:0; right:0; width:55%; height:100%; pointer-events:none; opacity:0.35; }

  /* Top accent bar */
  .cc-hero::before { content:''; position:absolute; top:0; left:0; right:0; height:5px; background:linear-gradient(90deg,#7c3aed 0%,#06b6d4 33%,#ec4899 66%,#f59e0b 100%); }

  .cc-hero-inner { max-width:960px; width:100%; margin:0 auto; padding:0 40px; position:relative; z-index:2; }

  .cc-hero-tag {
    display:inline-flex; align-items:center; gap:8px;
    border:1px solid rgba(124,58,237,0.4); background:rgba(124,58,237,0.12);
    border-radius:6px; padding:6px 16px; margin-bottom:32px;
    font-size:11px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; color:var(--signal);
  }
  .cc-hero-tag-dot { width:6px; height:6px; border-radius:50%; background:var(--signal); animation:pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }

  .cc-hero-eyebrow { font-size:11px; font-weight:600; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:14px; font-family:'DM Sans',sans-serif; }

  .cc-hero-title {
    font-family:'Playfair Display',serif; font-weight:800;
    font-size:clamp(42px,6vw,78px); line-height:1.0;
    letter-spacing:-0.02em; color:#fff;
    margin-bottom:12px;
  }
  .cc-hero-title .t1 { display:block; }
  .cc-hero-title .t2 { display:block; color:var(--signal); }
  .cc-hero-title .t3 { display:block; color:rgba(255,255,255,0.25); font-size:0.55em; letter-spacing:0.01em; font-weight:700; margin-top:6px; }

  .cc-hero-desc { font-size:17px; color:rgba(255,255,255,0.5); line-height:1.8; max-width:520px; margin:24px 0 44px; }

  .cc-hero-stats { display:flex; gap:0; border:1px solid rgba(255,255,255,0.08); border-radius:10px; overflow:hidden; width:fit-content; }
  .cc-hero-stat { padding:16px 28px; border-right:1px solid rgba(255,255,255,0.08); }
  .cc-hero-stat:last-child { border-right:none; }
  .cc-stat-num { font-family:'Playfair Display',serif; font-size:24px; font-weight:800; color:#fff; line-height:1; margin-bottom:4px; }
  .cc-stat-label { font-size:11px; color:rgba(255,255,255,0.35); font-weight:500; letter-spacing:0.06em; }

  /* ═══ BODY ═══ */
  .cc-body { max-width:920px; margin:0 auto; padding:80px 32px 100px; }

  /* ═══ CHAPTER INTRO STRIP ═══ */
  .cc-intro {
    background:linear-gradient(135deg,var(--deep),#120840);
    border-radius:16px; padding:36px 40px; margin-bottom:72px;
    border:1px solid rgba(124,58,237,0.3); position:relative; overflow:hidden;
  }
  .cc-intro::after { content:'⚡'; position:absolute; right:32px; top:50%; transform:translateY(-50%); font-size:100px; opacity:0.06; }
  .cc-intro-kicker { font-family:'DM Sans',sans-serif; font-size:10px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:var(--signal); margin-bottom:12px; }
  .cc-intro p { font-size:17px; color:rgba(255,255,255,0.8); line-height:1.85; margin:0 0 12px; }
  .cc-intro p:last-child { margin:0; }
  .cc-intro strong { color:var(--signal-mid); font-weight:600; }

  /* ═══ CHAPTER DIVIDER ═══ */
  .cc-chapter-divider { display:flex; align-items:center; gap:20px; margin:64px 0 48px; }
  .cc-chapter-divider::before, .cc-chapter-divider::after { content:''; flex:1; height:1px; background:var(--rule); }
  .cc-ch-badge {
    display:flex; align-items:center; gap:10px;
    background:var(--neural); border-radius:8px; padding:9px 22px;
    font-family:'Playfair Display',serif; font-size:12px; font-weight:700;
    letter-spacing:0.1em; text-transform:uppercase; color:#fff; white-space:nowrap;
  }
  .cc-ch-badge-num { font-size:16px; color:var(--signal-mid); }

  /* ═══ SEC HEADER ═══ */
  .cc-sec-head { margin-bottom:28px; }
  .cc-sec-num { font-family:'Playfair Display',serif; font-size:88px; font-weight:800; color:var(--rule); line-height:0.85; letter-spacing:-0.04em; display:block; margin-bottom:2px; }
  .cc-sec-kicker { font-family:'DM Sans',sans-serif; font-size:10px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:var(--neural); margin-bottom:6px; }
  .cc-sec-title { font-family:'Playfair Display',serif; font-size:clamp(24px,3.5vw,34px); font-weight:800; color:var(--ink); line-height:1.15; border-bottom:2px solid var(--rule); padding-bottom:14px; }
  .cc-sec-title span { color:var(--neural); }

  /* ═══ BODY TEXT ═══ */
  .cc-body-text { font-size:16.5px; line-height:1.85; color:var(--ink2); margin-bottom:24px; }
  .cc-body-text strong { color:var(--neural2); font-weight:600; }

  /* ═══ DIVIDER ═══ */
  .cc-divider { margin:52px 0; display:flex; align-items:center; gap:14px; }
  .cc-divider::before, .cc-divider::after { content:''; flex:1; height:1px; background:var(--rule); }
  .cc-divider-mark { width:8px; height:8px; border-radius:50%; background:var(--neural); flex-shrink:0; }

  /* ═══ ALERT ═══ */
  .cc-alert { padding:14px 18px; border-radius:8px; font-size:14px; line-height:1.7; margin-bottom:16px; }
  .cc-alert.purple { background:var(--signal-lt); color:var(--neural2); border-left:4px solid var(--neural); }
  .cc-alert.cyan   { background:var(--synapse-lt); color:#0e7490;       border-left:4px solid var(--synapse); }
  .cc-alert.pink   { background:var(--hormone-lt); color:#9d174d;       border-left:4px solid var(--hormone); }
  .cc-alert.amber  { background:var(--fire-lt);    color:#92400e;       border-left:4px solid var(--fire); }
  .cc-alert.green  { background:var(--leaf-lt);    color:#065f46;       border-left:4px solid var(--leaf); }
  .cc-alert.red    { background:var(--danger-lt);  color:#991b1b;       border-left:4px solid var(--danger); }
  .cc-alert strong { font-weight:700; }

  /* ═══ PULL QUOTE ═══ */
  .cc-pull-quote { border-left:4px solid var(--neural); background:var(--signal-lt); padding:20px 28px; margin:28px 0; border-radius:0 8px 8px 0; }
  .cc-pull-quote p { font-family:'Playfair Display',serif; font-size:16px; font-weight:700; color:var(--neural2); line-height:1.65; margin:0; }

  /* ═══ NEURON ANATOMY CARD ═══ */
  .cc-neuron-card {
    background:var(--deep); border-radius:16px; padding:32px 36px;
    margin-bottom:28px; border:1px solid rgba(124,58,237,0.3); position:relative; overflow:hidden;
  }
  .cc-neuron-card::before { content:''; position:absolute; top:-40%; right:-10%; width:300px; height:300px; border-radius:50%; background:radial-gradient(circle,rgba(124,58,237,0.15) 0%,transparent 65%); }
  .cc-neuron-label { font-family:'DM Sans',sans-serif; font-size:10px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:rgba(167,139,250,0.7); margin-bottom:18px; }
  .cc-neuron-parts { display:flex; gap:0; flex-wrap:wrap; }
  .cc-neuron-part { flex:1; min-width:160px; padding:16px 18px; border-right:1px solid rgba(255,255,255,0.06); }
  .cc-neuron-part:last-child { border-right:none; }
  .cc-neuron-part-icon { font-size:24px; margin-bottom:10px; display:block; }
  .cc-neuron-part-name { font-family:'Playfair Display',serif; font-size:14px; font-weight:700; color:var(--signal-mid); margin-bottom:5px; }
  .cc-neuron-part-role { font-size:13px; color:rgba(255,255,255,0.55); line-height:1.6; }

  /* ═══ NEURON SVG ILLUSTRATION ═══ */
  .cc-neuron-illustration { background:var(--deep); border-radius:14px; padding:28px; margin-bottom:24px; border:1px solid rgba(124,58,237,0.25); display:flex; flex-direction:column; align-items:center; }
  .cc-neuron-svg-caption { font-family:'DM Sans',sans-serif; font-size:11px; color:rgba(167,139,250,0.6); margin-top:14px; text-align:center; letter-spacing:0.08em; }

  /* ═══ 3 NEURON TYPES ═══ */
  .cc-neuron-types { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:28px; }
  @media(max-width:640px){.cc-neuron-types{grid-template-columns:1fr;}}
  .cc-nt-card { border-radius:10px; overflow:hidden; border:1.5px solid var(--rule); display:flex; flex-direction:column; }
  .cc-nt-hdr { padding:18px 18px 12px; }
  .cc-nt-hdr.sensory  { background:linear-gradient(135deg,#1a0a3a,#2d1060); }
  .cc-nt-hdr.motor    { background:linear-gradient(135deg,#0a1a30,#102448); }
  .cc-nt-hdr.relay    { background:linear-gradient(135deg,#0a1e1a,#103028); }
  .cc-nt-icon { font-size:26px; display:block; margin-bottom:8px; }
  .cc-nt-name { font-family:'Playfair Display',serif; font-size:15px; font-weight:700; }
  .sensory .cc-nt-name { color:var(--signal-mid); }
  .motor   .cc-nt-name { color:var(--synapse-mid); }
  .relay   .cc-nt-name { color:var(--leaf-mid); }
  .cc-nt-sub { font-size:11px; color:rgba(255,255,255,0.45); margin-top:3px; }
  .cc-nt-body { padding:14px 18px; background:var(--white); flex:1; }
  .cc-nt-item { display:flex; gap:8px; font-size:14px; color:var(--ink2); padding:7px 0; border-bottom:1px solid var(--rule); line-height:1.6; align-items:flex-start; }
  .cc-nt-item:last-child { border-bottom:none; }
  .cc-nt-dot { min-width:6px; height:6px; border-radius:50%; margin-top:7px; flex-shrink:0; }
  .sensory-dot { background:var(--neural); }
  .motor-dot   { background:var(--synapse); }
  .relay-dot   { background:var(--leaf); }

  /* ═══ IMPULSE TRANSMISSION TIMELINE ═══ */
  .cc-impulse-box {
    background:var(--void); border-radius:14px; padding:28px 32px; margin-bottom:24px;
    border:1.5px solid rgba(124,58,237,0.35);
  }
  .cc-impulse-label { font-family:'DM Sans',sans-serif; font-size:10px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:rgba(167,139,250,0.7); margin-bottom:20px; }
  .cc-impulse-steps { display:flex; flex-direction:column; gap:0; }
  .cc-imp-step { display:flex; gap:16px; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.05); align-items:flex-start; }
  .cc-imp-step:last-child { border-bottom:none; }
  .cc-imp-icon { font-size:18px; min-width:32px; text-align:center; flex-shrink:0; margin-top:2px; }
  .cc-imp-content {}
  .cc-imp-state { font-family:'DM Sans',sans-serif; font-size:11px; font-weight:600; color:var(--signal); margin-bottom:4px; letter-spacing:0.06em; text-transform:uppercase; }
  .cc-imp-desc { font-size:14px; color:rgba(255,255,255,0.65); line-height:1.7; }
  .cc-imp-desc strong { color:var(--fire-mid); font-weight:600; }

  /* ═══ SYNAPSE CARD ═══ */
  .cc-synapse-card {
    display:grid; grid-template-columns:1fr 1fr; gap:0;
    border-radius:14px; overflow:hidden; border:1.5px solid rgba(6,182,212,0.3); margin-bottom:28px;
  }
  @media(max-width:600px){.cc-synapse-card{grid-template-columns:1fr;}}
  .cc-synapse-left { background:linear-gradient(160deg,#020c14,#061c28); padding:26px 24px; }
  .cc-synapse-right { background:var(--white); padding:26px 24px; border-left:2px solid var(--rule); }
  .cc-syn-badge { display:inline-block; padding:3px 12px; border-radius:100px; font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:12px; }
  .cc-synapse-left .cc-syn-badge { background:rgba(6,182,212,0.2); color:var(--synapse-mid); }
  .cc-synapse-right .cc-syn-badge { background:var(--signal-lt); color:var(--neural); }
  .cc-syn-title { font-family:'Playfair Display',serif; font-size:19px; font-weight:800; margin-bottom:8px; }
  .cc-synapse-left .cc-syn-title { color:#fff; }
  .cc-synapse-right .cc-syn-title { color:var(--ink); }
  .cc-syn-def { font-size:14.5px; line-height:1.75; margin-bottom:14px; }
  .cc-synapse-left .cc-syn-def { color:rgba(255,255,255,0.65); }
  .cc-synapse-right .cc-syn-def { color:var(--ink2); }
  .cc-syn-facts { display:flex; flex-direction:column; gap:8px; }
  .cc-syn-fact { display:flex; gap:8px; font-size:13px; line-height:1.6; align-items:flex-start; }
  .cc-synapse-left .cc-syn-fact { color:rgba(255,255,255,0.7); }
  .cc-synapse-right .cc-syn-fact { color:var(--ink2); }
  .cc-syn-dot { min-width:6px; height:6px; border-radius:50%; margin-top:7px; flex-shrink:0; }
  .cc-synapse-left .cc-syn-dot { background:var(--synapse); }
  .cc-synapse-right .cc-syn-dot { background:var(--neural); }
  .cc-syn-fact strong { font-weight:600; }
  .cc-synapse-left .cc-syn-fact strong { color:var(--synapse-mid); }
  .cc-synapse-right .cc-syn-fact strong { color:var(--neural2); }
  @media(max-width:600px){ .cc-synapse-right { border-left:none; border-top:2px solid var(--rule); } }

  /* ═══ REFLEX ARC FLOW ═══ */
  .cc-reflex-flow {
    background:var(--white); border-radius:14px; border:1.5px solid var(--rule);
    overflow:hidden; margin-bottom:28px;
    box-shadow:0 4px 24px rgba(124,58,237,0.06);
  }
  .cc-reflex-hdr { background:linear-gradient(90deg,var(--neural2),var(--neural)); padding:16px 24px; display:flex; align-items:center; gap:12px; }
  .cc-reflex-hdr-title { font-family:'Playfair Display',serif; font-size:16px; font-weight:800; color:#fff; }
  .cc-reflex-hdr-sub { font-size:12px; color:rgba(255,255,255,0.5); margin-left:auto; font-family:'DM Sans',sans-serif; }
  .cc-reflex-body { padding:28px; }
  .cc-reflex-steps { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; margin-bottom:24px; }
  .cc-reflex-step { display:flex; flex-direction:column; align-items:center; flex:1; min-width:100px; text-align:center; gap:8px; }
  .cc-reflex-step-circle { width:52px; height:52px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:20px; border:2px solid var(--rule); background:var(--paper2); }
  .cc-reflex-step-name { font-family:'Playfair Display',serif; font-size:12px; font-weight:700; color:var(--ink); }
  .cc-reflex-step-sub { font-size:11px; color:var(--muted); line-height:1.4; }
  .cc-reflex-arrow { font-size:22px; color:var(--neural); flex-shrink:0; }
  .cc-reflex-example {
    background:var(--signal-lt); border-radius:10px; padding:16px 20px;
    font-size:14px; color:var(--neural2); line-height:1.7;
    border-left:4px solid var(--neural);
  }
  .cc-reflex-example strong { font-weight:700; }

  /* ═══ BRAIN SECTIONS ═══ */
  .cc-brain-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:28px; }
  @media(max-width:640px){.cc-brain-grid{grid-template-columns:1fr;}}
  .cc-brain-card { border-radius:12px; overflow:hidden; border:1.5px solid var(--rule); display:flex; flex-direction:column; }
  .cc-brain-hdr { padding:18px 20px 14px; }
  .cc-brain-hdr.fore  { background:linear-gradient(135deg,#1a0840,#2d1464); }
  .cc-brain-hdr.mid   { background:linear-gradient(135deg,#062030,#0a3a50); }
  .cc-brain-hdr.hind  { background:linear-gradient(135deg,#180828,#2a0e44); }
  .cc-brain-hdr.cord  { background:linear-gradient(135deg,#0a1810,#142e1c); }
  .cc-brain-tag { font-size:9px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:rgba(255,255,255,0.4); margin-bottom:5px; font-family:'DM Sans',sans-serif; }
  .cc-brain-name { font-family:'Playfair Display',serif; font-size:18px; font-weight:800; color:#fff; margin-bottom:4px; }
  .fore .cc-brain-name { color:var(--signal-mid); }
  .mid  .cc-brain-name { color:var(--synapse-mid); }
  .hind .cc-brain-name { color:var(--hormone-mid); }
  .cord .cc-brain-name { color:var(--leaf-mid); }
  .cc-brain-parts { font-size:11px; color:rgba(255,255,255,0.4); font-family:'DM Sans',sans-serif; }
  .cc-brain-body { padding:16px 20px; background:var(--white); flex:1; }
  .cc-brain-item { display:flex; gap:9px; font-size:14px; color:var(--ink2); padding:7px 0; border-bottom:1px solid var(--rule); line-height:1.6; align-items:flex-start; }
  .cc-brain-item:last-child { border-bottom:none; }
  .cc-brain-dot { min-width:6px; height:6px; border-radius:50%; margin-top:7px; flex-shrink:0; }
  .fore-dot { background:var(--neural); }
  .mid-dot  { background:var(--synapse); }
  .hind-dot { background:var(--hormone); }
  .cord-dot { background:var(--leaf); }
  .cc-brain-item strong { color:var(--ink); font-weight:600; }

  /* ═══ MENINGES LAYERS ═══ */
  .cc-meninges {
    display:grid; grid-template-columns:repeat(3,1fr); gap:0;
    border:1.5px solid var(--rule); border-radius:12px; overflow:hidden; margin-bottom:24px;
  }
  .cc-meninges-layer { padding:18px 18px 20px; background:var(--white); border-right:1px solid var(--rule); text-align:center; }
  .cc-meninges-layer:last-child { border-right:none; }
  .cc-meninges-layer::before { content:''; display:block; height:4px; margin:-18px -18px 14px; }
  .cc-meninges-layer:nth-child(1)::before { background:var(--neural); }
  .cc-meninges-layer:nth-child(2)::before { background:var(--synapse); }
  .cc-meninges-layer:nth-child(3)::before { background:var(--leaf); }
  .cc-mening-order { font-family:'DM Sans',sans-serif; font-size:10px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:6px; }
  .cc-meninges-layer:nth-child(1) .cc-mening-order { color:var(--neural); }
  .cc-meninges-layer:nth-child(2) .cc-mening-order { color:var(--synapse); }
  .cc-meninges-layer:nth-child(3) .cc-mening-order { color:var(--leaf); }
  .cc-mening-name { font-family:'Playfair Display',serif; font-size:15px; font-weight:700; color:var(--ink); margin-bottom:5px; }
  .cc-mening-desc { font-size:12px; color:var(--muted); line-height:1.55; }

  /* ═══ ENDOCRINE GLAND CARDS ═══ */
  .cc-gland-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:28px; }
  @media(max-width:640px){.cc-gland-grid{grid-template-columns:1fr;}}
  .cc-gland-card { background:var(--white); border-radius:12px; border:1.5px solid var(--rule); overflow:hidden; display:flex; flex-direction:column; }
  .cc-gland-top { padding:16px 20px 12px; display:flex; align-items:flex-start; gap:12px; }
  .cc-gland-icon { font-size:28px; flex-shrink:0; margin-top:2px; }
  .cc-gland-info {}
  .cc-gland-tag { font-size:9px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; margin-bottom:3px; font-family:'DM Sans',sans-serif; }
  .cc-gland-name { font-family:'Playfair Display',serif; font-size:16px; font-weight:800; color:var(--ink); }
  .cc-gland-hormone { font-size:12px; font-weight:600; font-family:'DM Sans',sans-serif; margin-top:2px; }
  .cc-gland-body { padding:0 20px 18px; border-top:1px solid var(--rule); margin-top:10px; flex:1; }
  .cc-gland-row { display:flex; gap:8px; font-size:14px; color:var(--ink2); padding:7px 0; border-bottom:1px solid var(--rule); line-height:1.6; align-items:flex-start; }
  .cc-gland-row:last-child { border-bottom:none; }
  .cc-gland-row-dot { min-width:6px; height:6px; border-radius:50%; margin-top:7px; flex-shrink:0; }
  .cc-gland-row strong { font-weight:600; }
  /* gland color theming via data attribute */
  .cc-gland-card[data-color="purple"] .cc-gland-top { background:linear-gradient(135deg,#1a0840,#2d1464); }
  .cc-gland-card[data-color="purple"] .cc-gland-tag { color:var(--signal); }
  .cc-gland-card[data-color="purple"] .cc-gland-hormone { color:var(--signal); }
  .cc-gland-card[data-color="purple"] .cc-gland-name { color:#fff; }
  .cc-gland-card[data-color="purple"] .cc-gland-row-dot { background:var(--neural); }
  .cc-gland-card[data-color="purple"] .cc-gland-row strong { color:var(--neural2); }
  .cc-gland-card[data-color="cyan"] .cc-gland-top { background:linear-gradient(135deg,#021820,#042c38); }
  .cc-gland-card[data-color="cyan"] .cc-gland-tag { color:var(--synapse-mid); }
  .cc-gland-card[data-color="cyan"] .cc-gland-hormone { color:var(--synapse-mid); }
  .cc-gland-card[data-color="cyan"] .cc-gland-name { color:#fff; }
  .cc-gland-card[data-color="cyan"] .cc-gland-row-dot { background:var(--synapse); }
  .cc-gland-card[data-color="cyan"] .cc-gland-row strong { color:#0e7490; }
  .cc-gland-card[data-color="pink"] .cc-gland-top { background:linear-gradient(135deg,#2a0820,#481038); }
  .cc-gland-card[data-color="pink"] .cc-gland-tag { color:var(--hormone-mid); }
  .cc-gland-card[data-color="pink"] .cc-gland-hormone { color:var(--hormone-mid); }
  .cc-gland-card[data-color="pink"] .cc-gland-name { color:#fff; }
  .cc-gland-card[data-color="pink"] .cc-gland-row-dot { background:var(--hormone); }
  .cc-gland-card[data-color="pink"] .cc-gland-row strong { color:#9d174d; }
  .cc-gland-card[data-color="amber"] .cc-gland-top { background:linear-gradient(135deg,#1e0e00,#382000); }
  .cc-gland-card[data-color="amber"] .cc-gland-tag { color:var(--fire-mid); }
  .cc-gland-card[data-color="amber"] .cc-gland-hormone { color:var(--fire-mid); }
  .cc-gland-card[data-color="amber"] .cc-gland-name { color:#fff; }
  .cc-gland-card[data-color="amber"] .cc-gland-row-dot { background:var(--fire); }
  .cc-gland-card[data-color="amber"] .cc-gland-row strong { color:#92400e; }
  .cc-gland-card[data-color="green"] .cc-gland-top { background:linear-gradient(135deg,#021808,#043814); }
  .cc-gland-card[data-color="green"] .cc-gland-tag { color:var(--leaf-mid); }
  .cc-gland-card[data-color="green"] .cc-gland-hormone { color:var(--leaf-mid); }
  .cc-gland-card[data-color="green"] .cc-gland-name { color:#fff; }
  .cc-gland-card[data-color="green"] .cc-gland-row-dot { background:var(--leaf); }
  .cc-gland-card[data-color="green"] .cc-gland-row strong { color:#065f46; }
  .cc-gland-card[data-color="red"] .cc-gland-top { background:linear-gradient(135deg,#1e0202,#3a0808); }
  .cc-gland-card[data-color="red"] .cc-gland-tag { color:#fca5a5; }
  .cc-gland-card[data-color="red"] .cc-gland-hormone { color:#fca5a5; }
  .cc-gland-card[data-color="red"] .cc-gland-name { color:#fff; }
  .cc-gland-card[data-color="red"] .cc-gland-row-dot { background:var(--danger); }
  .cc-gland-card[data-color="red"] .cc-gland-row strong { color:#991b1b; }

  /* ═══ HORMONE CHARACTERISTICS ═══ */
  .cc-hormone-chars { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:28px; }
  @media(max-width:620px){.cc-hormone-chars{grid-template-columns:1fr 1fr;}}
  .cc-hc-item { background:var(--white); border:1.5px solid var(--rule); border-radius:10px; padding:16px 14px; text-align:center; border-top:3px solid var(--neural); }
  .cc-hc-item:nth-child(2){border-top-color:var(--synapse);}
  .cc-hc-item:nth-child(3){border-top-color:var(--hormone);}
  .cc-hc-item:nth-child(4){border-top-color:var(--fire);}
  .cc-hc-item:nth-child(5){border-top-color:var(--leaf);}
  .cc-hc-item:nth-child(6){border-top-color:var(--danger);}
  .cc-hc-icon { font-size:24px; display:block; margin-bottom:8px; }
  .cc-hc-title { font-family:'Playfair Display',serif; font-size:13px; font-weight:700; color:var(--ink); margin-bottom:4px; }
  .cc-hc-desc { font-size:11px; color:var(--muted); line-height:1.5; }

  /* ═══ FEEDBACK MECHANISM ═══ */
  .cc-feedback {
    background:var(--deep); border-radius:14px; padding:26px 30px; margin-bottom:28px;
    border:1px solid rgba(124,58,237,0.3);
  }
  .cc-feedback-label { font-family:'DM Sans',sans-serif; font-size:10px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:rgba(167,139,250,0.7); margin-bottom:16px; }
  .cc-feedback-row { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:10px; }
  .cc-feedback-box { background:rgba(255,255,255,0.07); border-radius:8px; padding:10px 16px; font-size:13px; font-weight:600; color:#fff; border:1px solid rgba(255,255,255,0.1); }
  .cc-feedback-arrow { font-size:20px; color:var(--signal); }
  .cc-feedback-desc { font-size:14px; color:rgba(255,255,255,0.55); line-height:1.7; margin-top:6px; }
  .cc-feedback-desc strong { color:var(--signal-mid); }

  /* ═══ PLANT MOVEMENTS ═══ */
  .cc-tropic-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:24px; }
  @media(max-width:620px){.cc-tropic-grid{grid-template-columns:1fr 1fr;}}
  .cc-tropic-card { background:var(--white); border-radius:10px; padding:18px 16px; border:1.5px solid var(--rule); border-top:3px solid var(--leaf); text-align:center; }
  .cc-tropic-card:nth-child(2){border-top-color:var(--fire);}
  .cc-tropic-card:nth-child(3){border-top-color:var(--synapse);}
  .cc-tropic-card:nth-child(4){border-top-color:var(--hormone);}
  .cc-tropic-card:nth-child(5){border-top-color:var(--neural);}
  .cc-tropic-icon { font-size:26px; display:block; margin-bottom:8px; }
  .cc-tropic-name { font-family:'Playfair Display',serif; font-size:13px; font-weight:700; color:var(--ink); margin-bottom:3px; }
  .cc-tropic-stim { font-size:12px; font-weight:700; font-family:'DM Sans',sans-serif; color:var(--leaf); margin-bottom:5px; }
  .cc-tropic-card:nth-child(2) .cc-tropic-stim { color:var(--fire); }
  .cc-tropic-card:nth-child(3) .cc-tropic-stim { color:var(--synapse); }
  .cc-tropic-card:nth-child(4) .cc-tropic-stim { color:var(--hormone); }
  .cc-tropic-card:nth-child(5) .cc-tropic-stim { color:var(--neural); }
  .cc-tropic-desc { font-size:11px; color:var(--muted); line-height:1.5; }

  /* ═══ PLANT HORMONES TABLE ═══ */
  .cc-phormone-table { border:1.5px solid var(--rule); border-radius:12px; overflow:hidden; margin-bottom:24px; }
  .cc-ph-head { display:grid; grid-template-columns:1.2fr 1.5fr 1.8fr; background:var(--ink); }
  .cc-ph-th { font-family:'DM Sans',sans-serif; font-size:10px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.5); padding:11px 16px; border-right:1px solid rgba(255,255,255,0.07); }
  .cc-ph-th:last-child{border-right:none;}
  .cc-ph-row { display:grid; grid-template-columns:1.2fr 1.5fr 1.8fr; border-bottom:1px solid var(--rule); align-items:center; }
  .cc-ph-row:last-child{border-bottom:none;}
  .cc-ph-row:nth-child(even){background:var(--paper2);}
  .cc-ph-cell { font-size:14px; color:var(--ink2); padding:12px 16px; border-right:1px solid var(--rule); line-height:1.5; }
  .cc-ph-cell:last-child{border-right:none;}
  .cc-ph-cell.name { font-family:'Playfair Display',serif; font-weight:700; color:var(--ink); }
  .cc-ph-cell.badge { }
  .cc-ph-badge { display:inline-block; padding:3px 10px; border-radius:100px; font-size:11px; font-weight:700; font-family:'DM Sans',sans-serif; }
  .ph-auxin     .cc-ph-badge { background:var(--leaf-lt); color:#065f46; }
  .ph-gibberel  .cc-ph-badge { background:var(--fire-lt); color:#92400e; }
  .ph-cytokinin .cc-ph-badge { background:var(--synapse-lt); color:#0e7490; }
  .ph-abscisic  .cc-ph-badge { background:var(--hormone-lt); color:#9d174d; }
  .ph-ethylene  .cc-ph-badge { background:var(--signal-lt); color:var(--neural2); }

  /* ═══ MOVEMENT COMPARE ═══ */
  .cc-movement-compare { display:grid; grid-template-columns:1fr 1fr; gap:0; border:1.5px solid var(--rule); border-radius:12px; overflow:hidden; margin-bottom:24px; }
  @media(max-width:600px){.cc-movement-compare{grid-template-columns:1fr;}}
  .cc-mv-col { padding:22px 22px 26px; }
  .cc-mv-col.tropic  { background:linear-gradient(160deg,#021808,#043818); }
  .cc-mv-col.nastic  { background:var(--white); border-left:2px solid var(--rule); }
  .cc-mv-badge { display:inline-block; padding:3px 12px; border-radius:100px; margin-bottom:12px; font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; font-family:'DM Sans',sans-serif; }
  .tropic .cc-mv-badge { background:rgba(16,185,129,0.2); color:var(--leaf-mid); }
  .nastic .cc-mv-badge { background:var(--signal-lt); color:var(--neural); }
  .cc-mv-title { font-family:'Playfair Display',serif; font-size:19px; font-weight:800; margin-bottom:6px; }
  .tropic .cc-mv-title { color:var(--leaf-mid); }
  .nastic .cc-mv-title { color:var(--ink); }
  .cc-mv-def { font-size:13px; margin-bottom:14px; line-height:1.65; }
  .tropic .cc-mv-def { color:rgba(255,255,255,0.6); }
  .nastic .cc-mv-def { color:var(--muted); }
  .cc-mv-list { list-style:none; padding:0; display:flex; flex-direction:column; gap:8px; }
  .cc-mv-item { display:flex; gap:8px; font-size:13px; line-height:1.6; align-items:flex-start; }
  .tropic .cc-mv-item { color:rgba(255,255,255,0.72); }
  .nastic .cc-mv-item { color:var(--ink2); }
  .cc-mv-dot { min-width:6px; height:6px; border-radius:50%; margin-top:7px; flex-shrink:0; }
  .tropic .cc-mv-dot { background:var(--leaf); }
  .nastic .cc-mv-dot { background:var(--neural); }
  .cc-mv-item strong { font-weight:600; }
  .tropic .cc-mv-item strong { color:var(--leaf-mid); }
  .nastic .cc-mv-item strong { color:var(--neural2); }
  @media(max-width:600px){.nastic{border-left:none;border-top:2px solid var(--rule);}}

  /* ═══ FAQ ═══ */
  .cc-faq-header { margin-bottom:12px; }
  .cc-faq-kicker { font-family:'DM Sans',sans-serif; font-size:11px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; color:var(--neural); background:var(--signal-lt); padding:6px 18px; border-radius:100px; }
  .cc-faq-title { font-family:'Playfair Display',serif; font-size:clamp(26px,4vw,36px); font-weight:800; color:var(--ink); letter-spacing:-0.02em; margin:16px 0 28px; }
  .cc-faq-item { border:1.5px solid var(--rule); border-radius:8px; margin-bottom:12px; overflow:hidden; background:var(--white); transition:border-color 0.2s; }
  .cc-faq-item.open { border-color:var(--neural); }
  .cc-faq-q { width:100%; background:none; border:none; cursor:pointer; display:flex; justify-content:space-between; align-items:center; padding:20px 24px; text-align:left; gap:16px; }
  .cc-faq-q-text { font-family:'DM Sans',sans-serif; font-size:15px; font-weight:600; color:var(--ink); line-height:1.5; }
  .cc-faq-item.open .cc-faq-q-text { color:var(--neural); }
  .cc-faq-icon { font-family:'Playfair Display',serif; font-size:22px; font-weight:800; color:var(--neural); flex-shrink:0; transition:transform 0.2s; }
  .cc-faq-item.open .cc-faq-icon { transform:rotate(45deg); }
  .cc-faq-ans { font-size:15px; color:var(--ink2); line-height:1.85; padding:0 24px; max-height:0; overflow:hidden; transition:max-height 0.35s ease,padding 0.35s ease; }
  .cc-faq-ans.visible { max-height:1000px; padding:0 24px 22px; }
  .cc-faq-ans strong { color:var(--neural2); font-weight:600; }
  .cc-faq-ans code { font-family:'DM Sans',sans-serif; font-size:12px; background:var(--signal-lt); padding:1px 7px; border-radius:3px; color:var(--neural2); }

  @media(max-width:700px){
    .cc-body{padding:48px 18px 72px;}
    .cc-hero-inner{padding:0 20px;}
    .cc-sec-num{font-size:60px;}
    .cc-reflex-steps{flex-direction:column;}
    .cc-reflex-arrow{transform:rotate(90deg);}
  }
`;

const faqs = [
  {
    q: "What is control and coordination? Which systems provide it in animals?",
    a: (<>Working together of various integrated body systems in response to changes in the surroundings for the maintenance of bodily functions is called <strong>control and coordination</strong>.<br/><br/>
      In animals, it is provided by two systems:<br/>
      • <strong>Nervous system</strong> — uses electrical and chemical impulses for fast, short-duration responses<br/>
      • <strong>Endocrine system</strong> — uses chemical messengers (hormones) for slow, long-lasting responses</>),
  },
  {
    q: "What is a neuron? Describe its structure and types.",
    a: (<><strong>Neurons</strong> are the functional units of the nervous system. They conduct messages as electrical and chemical impulses.<br/><br/>
      <strong>Structure:</strong><br/>
      • <strong>Cell body (Soma)</strong> — contains nucleus and cytoplasm<br/>
      • <strong>Dendrites</strong> — short branched extensions that receive impulses<br/>
      • <strong>Axon</strong> — long fibre that carries impulses away from cell body<br/>
      • <strong>Nerve endings</strong> — transmit impulses to next neuron or effector<br/><br/>
      <strong>Types of neurons:</strong><br/>
      • <strong>Sensory (afferent)</strong> — carries impulses from receptors to CNS<br/>
      • <strong>Motor (efferent)</strong> — carries impulses from CNS to effectors (muscles/glands)<br/>
      • <strong>Relay (interneuron)</strong> — connects sensory and motor neurons within CNS</>),
  },
  {
    q: "Explain the transmission of a nerve impulse. What is a synapse?",
    a: (<><strong>At rest (Polarised state):</strong> Outside of axon has more Na⁺ ions → positive charge outside, negative inside.<br/><br/>
      <strong>On stimulation (Depolarisation):</strong> Membrane becomes permeable → Na⁺ ions rush inside → charge reverses (negative outside, positive inside). This is the excited region.<br/><br/>
      <strong>Propagation:</strong> The depolarised region acts as a stimulus for the next region → impulse travels along the axon.<br/><br/>
      <strong>Repolarisation:</strong> Sodium pump uses ATP to push Na⁺ back outside → membrane returns to resting state.<br/><br/>
      <strong>Synapse:</strong> The tiny gap between the axon terminal of one neuron and the dendrite of the next neuron. Chemical neurotransmitters released at the synapse carry the signal across this gap.</>),
  },
  {
    q: "Describe the human brain — its parts and functions.",
    a: (<><strong>Protection:</strong> Enclosed in cranium (skull). Brain + spinal cord covered by <strong>meninges</strong> (3 layers: duramater → arachnoid → piamater). Space filled with <strong>CSF</strong> (cerebrospinal fluid).<br/><br/>
      <strong>Forebrain</strong> (cerebrum + thalamus + hypothalamus):<br/>
      • Thinking, intelligence, learning, memory, speech<br/>
      • Sensory and motor regions; hypothalamus controls body temperature, hunger, thirst<br/><br/>
      <strong>Midbrain:</strong> Controls sight and hearing responses<br/><br/>
      <strong>Hindbrain</strong> (pons + medulla + cerebellum):<br/>
      • Medulla controls involuntary actions — heartbeat, blood pressure, digestion, salivation<br/>
      • Cerebellum controls voluntary movements, posture, and body equilibrium</>),
  },
  {
    q: "What is a reflex action? Describe the reflex arc.",
    a: (<><strong>Reflex action:</strong> An automatic, involuntary, rapid response to a stimulus that does not involve conscious thought or the brain.<br/><br/>
      <strong>Reflex arc — pathway:</strong><br/>
      <code>Receptor → Sensory neuron → Spinal cord (Association neuron) → Motor neuron → Effector</code><br/><br/>
      • <strong>Receptor</strong> — sense organ detects the stimulus<br/>
      • <strong>Sensory neuron</strong> — carries impulse to spinal cord<br/>
      • <strong>Association neuron</strong> — transmits from sensory to motor neuron within spinal cord<br/>
      • <strong>Motor neuron</strong> — carries impulse to effector (muscle or gland)<br/>
      • <strong>Effector</strong> — muscle or gland that responds<br/><br/>
      <strong>Example:</strong> Touching a hot plate → hand pulls back immediately (before brain processes pain).</>),
  },
  {
    q: "What are hormones? What are their characteristics?",
    a: (<><strong>Hormones</strong> are chemical secretions produced by endocrine glands that bring about specific changes in the body.<br/><br/>
      <strong>Characteristics:</strong><br/>
      1. Act as <strong>chemical messengers</strong><br/>
      2. Secreted by living glands/cells/tissues<br/>
      3. Secreted in <strong>very small quantities</strong><br/>
      4. Travel via <strong>blood</strong> to reach specific target sites<br/>
      5. <strong>Slow in action</strong> but have <strong>long-lasting effects</strong><br/>
      6. Either <strong>accelerate or inhibit</strong> a reaction<br/><br/>
      Hormone production is regulated by a <strong>feedback mechanism</strong> (positive and negative) controlled by the pituitary gland.</>),
  },
  {
    q: "Describe all the major endocrine glands and their hormones.",
    a: (<><strong>Pituitary</strong> — pea-sized, base of brain. Growth Hormone (GH). Hyposecretion → dwarfism; Hypersecretion → gigantism (children), acromegaly (adults).<br/><br/>
      <strong>Thyroid</strong> — near trachea in neck. Thyroxine. Regulates metabolism. Hypo → goitre, myxoedema, cretinism; Hyper → high metabolism, bulging eyes, high BP.<br/><br/>
      <strong>Parathyroid</strong> — 4 glands on back of thyroid. PTH. Regulates blood calcium. Excess PTH → bones become soft (calcium removed).<br/><br/>
      <strong>Pancreas</strong> — Insulin + Glucagon. Regulate blood sugar. Insulin deficiency → Diabetes mellitus.<br/><br/>
      <strong>Adrenal</strong> — above each kidney. Cortex → Cortisol (regulates metabolism). Medulla → Adrenaline (fight-or-flight response).<br/><br/>
      <strong>Gonads</strong> — Testes → Testosterone (puberty, male features). Ovaries → Estrogen (female features; deficiency → infertility) + Progesterone.</>),
  },
  {
    q: "What is adrenaline? Why is it called the 'fight-or-flight' hormone?",
    a: (<><strong>Adrenaline</strong> (epinephrine) is a hormone secreted by the <strong>medulla of the adrenal gland</strong> in response to stress, danger, or excitement.<br/><br/>
      <strong>Effects on the body during stress:</strong><br/>
      • Heart rate increases — pumps more blood to muscles<br/>
      • Breathing rate increases — more oxygen intake<br/>
      • Blood glucose rises — more energy available<br/>
      • Blood diverted from digestive system to muscles<br/>
      • Pupils dilate — better vision<br/>
      • Non-essential functions slow down<br/><br/>
      All these effects prepare the body to either <strong>fight the threat or flee from it</strong> — hence the name "fight-or-flight hormone". It acts very rapidly unlike most other hormones.</>),
  },
  {
    q: "Explain tropic movements in plants with examples.",
    a: (<><strong>Tropic movements</strong> are directional movements of a specific part of a plant in response to an external stimulus. The direction of movement depends on the direction of the stimulus.<br/><br/>
      • <strong>Phototropism</strong> — response to light. Shoot grows towards light (positive); root grows away (negative). Caused by unequal distribution of auxin.<br/>
      • <strong>Geotropism</strong> — response to gravity. Root grows downward (positive geotropism); shoot grows upward (negative geotropism). Seen during seed germination.<br/>
      • <strong>Hydrotropism</strong> — response to water/moisture. Roots grow towards water.<br/>
      • <strong>Chemotropism</strong> — response to chemicals. Pollen tube grows towards ovule through chemical signals.<br/>
      • <strong>Thigmotropism</strong> — response to touch. Tendrils of climbing plants coil around support.<br/><br/>
      Tropic movements involve <strong>growth</strong> — if growth is stopped, the movement stops.</>),
  },
  {
    q: "What are nastic movements? How are they different from tropic movements?",
    a: (<><strong>Nastic movements</strong> occur in response to environmental stimuli, but unlike tropic movements, the direction of the response is NOT dependent on the direction of the stimulus.<br/><br/>
      <strong>Comparison:</strong><br/>
      • Tropic → direction determined by stimulus direction<br/>
      • Nastic → direction pre-determined by plant structure, not stimulus direction<br/><br/>
      <strong>Types of nastic movements:</strong><br/>
      • <strong>Thigmonastic</strong> — response to touch (e.g., Mimosa pudica / touch-me-not folds leaves when touched)<br/>
      • <strong>Thermonastic</strong> — response to temperature changes (e.g., tulip flowers open/close with temperature)<br/>
      • <strong>Photonastic</strong> — response to light intensity (e.g., daisy flowers open in day, close at night)<br/><br/>
      The movement of Mimosa pudica is a <strong>growth-independent nastic movement</strong> — it does not involve growth, unlike tropic movements.</>),
  },
  {
    q: "What are plant hormones (phytohormones)? Name them and give their functions.",
    a: (<><strong>Phytohormones</strong> are chemical substances produced naturally in plants that regulate growth and development.<br/><br/>
      1. <strong>Auxin</strong> — promotes growth of stem; responsible for phototropism (unequal distribution causes bending). Produced at shoot tip.<br/>
      2. <strong>Gibberellin</strong> — promotes stem elongation; helps in seed germination and fruit development.<br/>
      3. <strong>Cytokinin</strong> — promotes cell division (cytokinesis); delays ageing of leaves.<br/>
      4. <strong>Abscisic Acid (ABA)</strong> — promotes seed dormancy; causes stomata to close; inhibits growth (also called the "stress hormone").<br/>
      5. <strong>Ethylene</strong> — regulates fruit ripening; promotes fruit drop and leaf fall.<br/><br/>
      Growth hormones: Auxin, Gibberellin, Cytokinin (promoters). Inhibitor: Abscisic acid.</>),
  },
  {
    q: "Differentiate between growth-dependent and growth-independent movements in plants.",
    a: (<><strong>Growth-dependent movement:</strong><br/>
      • Movement is caused by differential growth of plant parts<br/>
      • If growth is prevented, movement stops<br/>
      • Examples: phototropism, geotropism (seed germination — root grows down, shoot grows up)<br/>
      • These are tropic movements<br/><br/>
      <strong>Growth-independent movement:</strong><br/>
      • Movement is NOT caused by growth<br/>
      • Does not involve any increase in size<br/>
      • Happens due to changes in turgor pressure (water in cells)<br/>
      • Example: Mimosa pudica (touch-me-not) folding leaves when touched — no growth involved<br/>
      • These are nastic movements</>),
  },
];

export default function ControlAndCoordination() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="cc-root">

        {/* ══════ HERO ══════ */}
        <div className="cc-hero">
          <div className="cc-hero-grid" />
          <div className="cc-glow-1" />
          <div className="cc-glow-2" />
          <div className="cc-glow-3" />

          {/* Neuron SVG watermark illustration */}
          <svg className="cc-hero-neuron" viewBox="0 0 600 700" xmlns="http://www.w3.org/2000/svg">
            {/* Cell body */}
            <ellipse cx="300" cy="350" rx="60" ry="55" fill="rgba(124,58,237,0.25)" stroke="rgba(167,139,250,0.4)" strokeWidth="1.5"/>
            <ellipse cx="300" cy="350" rx="30" ry="28" fill="rgba(124,58,237,0.35)" stroke="rgba(167,139,250,0.5)" strokeWidth="1"/>
            {/* Nucleus */}
            <ellipse cx="300" cy="350" rx="14" ry="13" fill="rgba(245,158,11,0.4)" stroke="rgba(253,211,77,0.5)" strokeWidth="1"/>
            {/* Axon */}
            <path d="M300 405 Q295 480 290 580" stroke="rgba(167,139,250,0.6)" strokeWidth="4" fill="none" strokeLinecap="round"/>
            {/* Myelin sheaths */}
            {[430,460,490,520,550].map((y,i) => (
              <ellipse key={i} cx={298-i*0.5} cy={y} rx="10" ry="14" fill="rgba(6,182,212,0.2)" stroke="rgba(103,232,249,0.35)" strokeWidth="1"/>
            ))}
            {/* Dendrites */}
            <path d="M260 330 Q200 290 150 260" stroke="rgba(167,139,250,0.5)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M255 345 Q185 330 130 320" stroke="rgba(167,139,250,0.45)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M265 360 Q210 370 160 380" stroke="rgba(167,139,250,0.4)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M270 318 Q240 270 220 240" stroke="rgba(167,139,250,0.45)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M285 310 Q275 250 265 200" stroke="rgba(167,139,250,0.4)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M310 308 Q330 255 345 210" stroke="rgba(167,139,250,0.4)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M325 320 Q380 285 430 265" stroke="rgba(167,139,250,0.45)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M335 340 Q400 340 450 335" stroke="rgba(167,139,250,0.4)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            {/* Terminal branches */}
            <path d="M290 580 Q270 610 255 640" stroke="rgba(167,139,250,0.4)" strokeWidth="2" fill="none"/>
            <path d="M290 580 Q295 615 290 650" stroke="rgba(167,139,250,0.35)" strokeWidth="2" fill="none"/>
            <path d="M290 580 Q310 610 325 638" stroke="rgba(167,139,250,0.4)" strokeWidth="2" fill="none"/>
            {/* Signal sparks */}
            {[[150,260],[130,320],[160,380]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="4" fill="rgba(245,158,11,0.6)" stroke="rgba(253,211,77,0.5)" strokeWidth="1"/>
            ))}
            {/* Labels */}
            <text x="200" y="248" fill="rgba(167,139,250,0.5)" fontSize="12" fontFamily="DM Sans" fontWeight="600">Dendrite</text>
            <text x="200" y="412" fill="rgba(103,232,249,0.5)" fontSize="12" fontFamily="DM Sans" fontWeight="600">Axon</text>
            <text x="218" y="358" fill="rgba(253,211,77,0.6)" fontSize="11" fontFamily="DM Sans" fontWeight="600">Cell body</text>
            <text x="312" y="628" fill="rgba(167,139,250,0.45)" fontSize="11" fontFamily="DM Sans" fontWeight="600">Nerve ending</text>
          </svg>

          <div className="cc-hero-inner">
            <div className="cc-hero-tag">
              <div className="cc-hero-tag-dot" />
              Biology · Class 10 · Chapter 2
            </div>
            <div className="cc-hero-eyebrow">// Science — CBSE / NCERT</div>
            <h1 className="cc-hero-title">
              <span className="t1">Control</span>
              <span className="t2">&amp; Coordination</span>
              <span className="t3">Nervous System · Hormones · Plant Responses</span>
            </h1>
            <p className="cc-hero-desc">
              Every split-second reaction, every emotion, every heartbeat — all controlled by an astonishing network of 86 billion neurons and a cascade of chemical messengers that shape how living organisms sense, respond, and adapt.
            </p>
            <div className="cc-hero-stats">
              {[
                { num:"86B", label:"Neurons in human brain" },
                { num:"120m/s", label:"Max nerve impulse speed" },
                { num:"9", label:"Major endocrine glands" },
                { num:"5", label:"Types of plant hormones" },
              ].map(s => (
                <div className="cc-hero-stat" key={s.label}>
                  <div className="cc-stat-num">{s.num}</div>
                  <div className="cc-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cc-body">

          {/* Intro */}
          <div className="cc-intro">
            <div className="cc-intro-kicker">// Chapter Overview</div>
            <p><strong>Control and coordination</strong> is the working together of various integrated body systems in response to changes in the surroundings — maintaining bodily functions and homeostasis. Without it, a living organism would simply fall apart.</p>
            <p>This chapter covers the <strong>nervous system</strong> (neurons, brain, spinal cord, reflexes), the <strong>endocrine system</strong> (hormones from 9+ glands), and <strong>plant responses</strong> (tropic/nastic movements and phytohormones).</p>
          </div>

          {/* ══ CHAPTER 1: NERVOUS SYSTEM ══ */}
          <div className="cc-chapter-divider">
            <div className="cc-ch-badge">
              <span className="cc-ch-badge-num">01</span>
              Nervous System
            </div>
          </div>

          <div className="cc-sec-head">
            <span className="cc-sec-num">1</span>
            <div className="cc-sec-kicker">// Electrical Signals</div>
            <h2 className="cc-sec-title">The Neuron — <span>Structure &amp; Types</span></h2>
          </div>
          <p className="cc-body-text"><strong>Neurons</strong> are the functional units of the nervous system — specialised cells that conduct messages as electrical and chemical impulses throughout the body.</p>

          {/* Neuron anatomy */}
          <div className="cc-neuron-card">
            <div className="cc-neuron-label">⚡ Anatomy of a Neuron</div>
            <div className="cc-neuron-parts">
              {[
                { icon:"🔵", name:"Cell Body (Soma)", role:"Contains the nucleus and cytoplasm. The metabolic centre of the neuron. All cellular functions originate here." },
                { icon:"🌿", name:"Dendrites", role:"Short, branched extensions of the cell body. Receive incoming signals from other neurons or sensory receptors." },
                { icon:"➡️", name:"Axon", role:"Long fibre that carries impulses away from the cell body to the next neuron or effector organ. Covered by myelin sheath for insulation." },
                { icon:"⚡", name:"Nerve Endings", role:"Terminal branches at the end of the axon. Release neurotransmitters into the synapse to transmit impulses to the next cell." },
              ].map(p => (
                <div className="cc-neuron-part" key={p.name}>
                  <span className="cc-neuron-part-icon">{p.icon}</span>
                  <div className="cc-neuron-part-name">{p.name}</div>
                  <div className="cc-neuron-part-role">{p.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3 neuron types */}
          <div className="cc-neuron-types">
            <div className="cc-nt-card">
              <div className="cc-nt-hdr sensory">
                <span className="cc-nt-icon">👁️</span>
                <div className="cc-nt-name">Sensory Neuron</div>
                <div className="cc-nt-sub">Also called afferent neuron</div>
              </div>
              <div className="cc-nt-body">
                {["Carries impulses FROM receptors TO the CNS","Brings information about the environment inward","Examples: neurons in eyes, ears, skin receptors"].map((t,i)=>(
                  <div className="cc-nt-item" key={i}><span className="cc-nt-dot sensory-dot"/><span>{t}</span></div>
                ))}
              </div>
            </div>
            <div className="cc-nt-card">
              <div className="cc-nt-hdr motor">
                <span className="cc-nt-icon">💪</span>
                <div className="cc-nt-name">Motor Neuron</div>
                <div className="cc-nt-sub">Also called efferent neuron</div>
              </div>
              <div className="cc-nt-body">
                {["Carries impulses FROM CNS TO effectors","Effectors are muscles or glands that respond","Produces the visible response/action"].map((t,i)=>(
                  <div className="cc-nt-item" key={i}><span className="cc-nt-dot motor-dot"/><span>{t}</span></div>
                ))}
              </div>
            </div>
            <div className="cc-nt-card">
              <div className="cc-nt-hdr relay">
                <span className="cc-nt-icon">🔗</span>
                <div className="cc-nt-name">Relay Neuron</div>
                <div className="cc-nt-sub">Also called interneuron</div>
              </div>
              <div className="cc-nt-body">
                {["Connects sensory and motor neurons","Located entirely within the CNS (brain/spinal cord)","Processes and integrates information"].map((t,i)=>(
                  <div className="cc-nt-item" key={i}><span className="cc-nt-dot relay-dot"/><span>{t}</span></div>
                ))}
              </div>
            </div>
          </div>

          {/* Nerve impulse transmission */}
          <div className="cc-divider"><div className="cc-divider-mark"/></div>
          <div className="cc-sec-head">
            <span className="cc-sec-num">2</span>
            <div className="cc-sec-kicker">// Electrochemical Signal</div>
            <h2 className="cc-sec-title">Transmission of <span>Nerve Impulse</span></h2>
          </div>

          <div className="cc-impulse-box">
            <div className="cc-impulse-label">⚡ How an Impulse Travels Along an Axon</div>
            <div className="cc-impulse-steps">
              {[
                { icon:"🟢", state:"RESTING STATE (Polarised)", desc:<>Outside axon membrane has more <strong>Na⁺ ions</strong> → <strong>positive charge outside</strong>, negative inside. Neuron is in polarised (resting) state. No signal travelling.</> },
                { icon:"⚡", state:"STIMULATION (Depolarisation)", desc:<>Stimulus arrives → membrane becomes permeable → <strong>Na⁺ ions rush inside</strong> → charge reverses. Outside becomes negative, inside positive. This region = <strong>excited/depolarised region</strong>.</> },
                { icon:"🌊", state:"PROPAGATION", desc:<>The depolarised region acts as stimulus for the <strong>neighbouring region</strong>, which also depolarises. This wave of depolarisation travels along the axon from point to point.</> },
                { icon:"🔁", state:"REPOLARISATION", desc:<>The previously excited area recovers: <strong>sodium pump</strong> uses <strong>ATP</strong> to actively transport Na⁺ back outside. Membrane returns to resting (polarised) state and is ready for the next impulse.</> },
              ].map((s,i) => (
                <div className="cc-imp-step" key={i}>
                  <div className="cc-imp-icon">{s.icon}</div>
                  <div className="cc-imp-content">
                    <div className="cc-imp-state">{s.state}</div>
                    <div className="cc-imp-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Synapse */}
          <div className="cc-synapse-card">
            <div className="cc-synapse-left">
              <span className="cc-syn-badge">Gap Junction</span>
              <div className="cc-syn-title">What is a Synapse?</div>
              <div className="cc-syn-def">A <strong>synapse</strong> is the tiny gap between the axon terminal of one neuron and the dendrite of the next neuron. It is where the electrical signal becomes chemical.</div>
              <div className="cc-syn-facts">
                {[
                  <><strong>Axon terminal</strong> releases chemical neurotransmitters into the gap</>,
                  "Neurotransmitters diffuse across the synapse",
                  <><strong>Receptors</strong> on the next dendrite bind them and regenerate the electrical impulse</>,
                  "Ensures one-way signal transmission",
                  <><strong>Medullary sheath</strong> insulates axons in a nerve, preventing signal mixing</>,
                ].map((t,i) => (
                  <div className="cc-syn-fact" key={i}><span className="cc-syn-dot"/><span>{t}</span></div>
                ))}
              </div>
            </div>
            <div className="cc-synapse-right">
              <span className="cc-syn-badge">Nerve vs Neuron</span>
              <div className="cc-syn-title">What is a Nerve?</div>
              <div className="cc-syn-def">A <strong>nerve</strong> is a collection of nerve fibres (axons) bundled together and enclosed in a tubular medullary sheath.</div>
              <div className="cc-syn-facts">
                {[
                  <><strong>Medullary sheath</strong> acts as electrical insulation</>,
                  "Prevents mixing of impulses in adjacent fibres",
                  "One nerve can contain thousands of axons",
                  <><strong>Neuron</strong> = single cell (structural unit)</>,
                  <><strong>Nerve</strong> = bundle of many axons (anatomical structure)</>,
                ].map((t,i) => (
                  <div className="cc-syn-fact" key={i}><span className="cc-syn-dot"/><span>{t}</span></div>
                ))}
              </div>
            </div>
          </div>

          {/* CNS/PNS */}
          <div className="cc-alert purple">
            🧠 <strong>Human nervous system</strong> is divided into: <strong>Central Nervous System (CNS)</strong> — brain + spinal cord, and <strong>Peripheral Nervous System (PNS)</strong> — all nerves connecting CNS to the rest of the body.
          </div>

          {/* Brain */}
          <div className="cc-divider"><div className="cc-divider-mark"/></div>
          <div className="cc-sec-head">
            <span className="cc-sec-num">3</span>
            <div className="cc-sec-kicker">// Command Centre</div>
            <h2 className="cc-sec-title">The Human <span>Brain</span></h2>
          </div>
          <p className="cc-body-text">Enclosed in the <strong>cranium</strong> (bony skull), the brain is protected by three meningeal layers and bathed in cerebrospinal fluid (CSF). It is divided into forebrain, midbrain, and hindbrain.</p>

          {/* Meninges */}
          <div className="cc-meninges">
            {[
              { order:"Outer Layer", name:"Dura Mater", desc:"Tough, thick outermost protective membrane" },
              { order:"Middle Layer", name:"Arachnoid", desc:"Spider-web like middle layer with CSF space" },
              { order:"Inner Layer", name:"Pia Mater", desc:"Thin, delicate innermost layer, closely follows brain surface" },
            ].map(m => (
              <div className="cc-meninges-layer" key={m.name}>
                <div className="cc-mening-order">{m.order}</div>
                <div className="cc-mening-name">{m.name}</div>
                <div className="cc-mening-desc">{m.desc}</div>
              </div>
            ))}
          </div>

          <div className="cc-brain-grid">
            <div className="cc-brain-card">
              <div className="cc-brain-hdr fore">
                <div className="cc-brain-tag">Brain Part 1</div>
                <div className="cc-brain-name">Forebrain</div>
                <div className="cc-brain-parts">Cerebrum · Thalamus · Hypothalamus</div>
              </div>
              <div className="cc-brain-body">
                {[
                  <><strong>Cerebrum</strong> — controls intelligence, learning, memory, thinking, speech</>,
                  "Largest part of the brain; highly convoluted surface (more folds = more surface area)",
                  "Has sensory regions (receive impulses) and motor regions (control muscle movement)",
                  <><strong>Hypothalamus</strong> — controls body temperature, hunger, thirst, sleep</>,
                  <><strong>Thalamus</strong> — relay station for sensory information</>,
                ].map((t,i)=>(<div className="cc-brain-item" key={i}><span className="cc-brain-dot fore-dot"/><span>{t}</span></div>))}
              </div>
            </div>
            <div className="cc-brain-card">
              <div className="cc-brain-hdr mid">
                <div className="cc-brain-tag">Brain Part 2</div>
                <div className="cc-brain-name">Midbrain</div>
                <div className="cc-brain-parts">Visual &amp; Auditory Reflex Centre</div>
              </div>
              <div className="cc-brain-body">
                {[
                  "Connects forebrain with hindbrain",
                  <><strong>Mainly concerned</strong> with sense of sight and hearing</>,
                  "Controls visual and auditory reflexes (e.g., turning head toward sound)",
                  "Controls some involuntary actions along with medulla",
                ].map((t,i)=>(<div className="cc-brain-item" key={i}><span className="cc-brain-dot mid-dot"/><span>{t}</span></div>))}
              </div>
            </div>
            <div className="cc-brain-card">
              <div className="cc-brain-hdr hind">
                <div className="cc-brain-tag">Brain Part 3</div>
                <div className="cc-brain-name">Hindbrain</div>
                <div className="cc-brain-parts">Pons · Medulla Oblongata · Cerebellum</div>
              </div>
              <div className="cc-brain-body">
                {[
                  <><strong>Medulla oblongata</strong> — controls vital involuntary actions: heartbeat, blood pressure, breathing, salivation, movement of food in alimentary canal</>,
                  <><strong>Cerebellum</strong> — controls voluntary movements, posture, balance and body equilibrium</>,
                  <><strong>Pons</strong> — relay centre; connects different parts of brain</>,
                ].map((t,i)=>(<div className="cc-brain-item" key={i}><span className="cc-brain-dot hind-dot"/><span>{t}</span></div>))}
              </div>
            </div>
            <div className="cc-brain-card">
              <div className="cc-brain-hdr cord">
                <div className="cc-brain-tag">Spinal Cord</div>
                <div className="cc-brain-name">Spinal Cord</div>
                <div className="cc-brain-parts">White Matter · Grey Matter · Central Canal</div>
              </div>
              <div className="cc-brain-body">
                {[
                  "Continuation of medulla oblongata; runs through vertebral column",
                  "Made of two halves fused together → central canal containing CSF",
                  <><strong>White matter</strong> (outer) — nerve fibres</>,
                  <><strong>Grey matter</strong> (inner) — cell bodies of neurons</>,
                  "Conducts impulses to/from brain; mediates spinal reflexes",
                ].map((t,i)=>(<div className="cc-brain-item" key={i}><span className="cc-brain-dot cord-dot"/><span>{t}</span></div>))}
              </div>
            </div>
          </div>

          {/* Reflex arc */}
          <div className="cc-divider"><div className="cc-divider-mark"/></div>
          <div className="cc-sec-head">
            <span className="cc-sec-num">4</span>
            <div className="cc-sec-kicker">// Automatic Response</div>
            <h2 className="cc-sec-title">Reflex Action <span>&amp; Reflex Arc</span></h2>
          </div>
          <p className="cc-body-text">A <strong>reflex action</strong> is an automatic, involuntary, rapid response to a stimulus — it bypasses the brain and is processed in the spinal cord, saving precious milliseconds.</p>

          <div className="cc-reflex-flow">
            <div className="cc-reflex-hdr">
              <span style={{fontSize:"18px"}}>⚡</span>
              <div className="cc-reflex-hdr-title">The Reflex Arc — Pathway of a Reflex</div>
              <div className="cc-reflex-hdr-sub">// Processed in spinal cord</div>
            </div>
            <div className="cc-reflex-body">
              <div className="cc-reflex-steps">
                {[
                  { emoji:"👁️", name:"Receptor",          sub:"Sense organ detects stimulus" },
                  { emoji:"↑",  name:"",                  sub:"", isArrow:true },
                  { emoji:"🔵", name:"Sensory Neuron",    sub:"Carries impulse to spinal cord" },
                  { emoji:"↑",  name:"",                  sub:"", isArrow:true },
                  { emoji:"🔗", name:"Association Neuron",sub:"In spinal cord; relays signal" },
                  { emoji:"↑",  name:"",                  sub:"", isArrow:true },
                  { emoji:"🔴", name:"Motor Neuron",      sub:"Carries impulse to effector" },
                  { emoji:"↑",  name:"",                  sub:"", isArrow:true },
                  { emoji:"💪", name:"Effector",           sub:"Muscle/gland responds" },
                ].map((s,i) => s.isArrow
                  ? <div className="cc-reflex-arrow" key={i}>→</div>
                  : <div className="cc-reflex-step" key={i}>
                      <div className="cc-reflex-step-circle">{s.emoji}</div>
                      <div className="cc-reflex-step-name">{s.name}</div>
                      <div className="cc-reflex-step-sub">{s.sub}</div>
                    </div>
                )}
              </div>
              <div className="cc-reflex-example">
                <strong>Classic Example:</strong> You touch a hot plate → pain receptor in skin detects heat → sensory neuron carries signal to spinal cord → relay neuron processes → motor neuron fires → hand muscles contract and pull away — all before the brain even consciously registers the pain!
              </div>
            </div>
          </div>

          <div className="cc-alert cyan">
            ⚡ <strong>3 types of responses:</strong> <strong>Reflex action</strong> — sudden, automatic, no brain involvement (e.g., touching hot object). <strong>Voluntary action</strong> — conscious, brain-controlled (e.g., writing, talking). <strong>Involuntary action</strong> — automatic, not consciously controlled (e.g., heartbeat, digestion).
          </div>

          {/* ══ CHAPTER 2: ENDOCRINE SYSTEM ══ */}
          <div className="cc-chapter-divider">
            <div className="cc-ch-badge">
              <span className="cc-ch-badge-num">02</span>
              Endocrine System
            </div>
          </div>

          <div className="cc-sec-head">
            <span className="cc-sec-num">5</span>
            <div className="cc-sec-kicker">// Chemical Messengers</div>
            <h2 className="cc-sec-title">Hormones <span>&amp; Endocrine Glands</span></h2>
          </div>
          <p className="cc-body-text"><strong>Hormones</strong> are chemical secretions produced by endocrine glands, released directly into the bloodstream, and carried to specific target organs. Unlike the nervous system, hormonal responses are slower but longer-lasting.</p>

          {/* Hormone characteristics */}
          <div className="cc-hormone-chars">
            {[
              { icon:"📨", title:"Chemical Messenger", desc:"Carry information from one organ to another via blood" },
              { icon:"💧", title:"Tiny Quantities", desc:"Produced and effective in very small amounts" },
              { icon:"🎯", title:"Target Specific", desc:"Act only on specific target cells, tissues or organs" },
              { icon:"⏱️", title:"Slow & Long-lasting", desc:"Slow in action but effects persist for long duration" },
              { icon:"⚖️", title:"Accelerate or Inhibit", desc:"Can speed up or slow down bodily reactions" },
              { icon:"🔄", title:"Feedback Regulated", desc:"Pituitary controls production via positive/negative feedback" },
            ].map(h => (
              <div className="cc-hc-item" key={h.title}>
                <span className="cc-hc-icon">{h.icon}</span>
                <div className="cc-hc-title">{h.title}</div>
                <div className="cc-hc-desc">{h.desc}</div>
              </div>
            ))}
          </div>

          {/* Feedback mechanism */}
          <div className="cc-feedback">
            <div className="cc-feedback-label">🔄 Feedback Mechanism — How Hormone Levels Are Regulated</div>
            <div className="cc-feedback-row">
              <div className="cc-feedback-box">Pituitary Gland</div>
              <div className="cc-feedback-arrow">→</div>
              <div className="cc-feedback-box">Releases stimulating hormone</div>
              <div className="cc-feedback-arrow">→</div>
              <div className="cc-feedback-box">Target gland produces hormone</div>
              <div className="cc-feedback-arrow">→</div>
              <div className="cc-feedback-box">Blood hormone level rises</div>
              <div className="cc-feedback-arrow">→</div>
              <div className="cc-feedback-box">Signals pituitary to reduce output</div>
            </div>
            <div className="cc-feedback-desc"><strong>Negative feedback</strong> — most common; high hormone level suppresses further production. <strong>Positive feedback</strong> — high level amplifies production (e.g., during childbirth). This self-regulating mechanism keeps hormone levels in precise balance.</div>
          </div>

          {/* Gland cards */}
          <div className="cc-gland-grid">
            <div className="cc-gland-card" data-color="purple">
              <div className="cc-gland-top">
                <span className="cc-gland-icon">🧠</span>
                <div className="cc-gland-info">
                  <div className="cc-gland-tag">Master Gland</div>
                  <div className="cc-gland-name">Pituitary Gland</div>
                  <div className="cc-gland-hormone">→ Growth Hormone (GH)</div>
                </div>
              </div>
              <div className="cc-gland-body">
                {[
                  "Pea-sized; located at base of the brain",
                  <><strong>Required for</strong> proper body growth and development</>,
                  <><strong>Hyposecretion</strong> of GH → Dwarfism (stunted growth)</>,
                  <><strong>Hypersecretion</strong> → Gigantism in children</>,
                  "Hypersecretion in adults → Acromegaly (enlarged extremities)",
                  "Controls all other endocrine glands — hence called the master gland",
                ].map((t,i)=>(<div className="cc-gland-row" key={i}><span className="cc-gland-row-dot"/><span>{t}</span></div>))}
              </div>
            </div>

            <div className="cc-gland-card" data-color="cyan">
              <div className="cc-gland-top">
                <span className="cc-gland-icon">🦋</span>
                <div className="cc-gland-info">
                  <div className="cc-gland-tag">Metabolism Gland</div>
                  <div className="cc-gland-name">Thyroid Gland</div>
                  <div className="cc-gland-hormone">→ Thyroxine</div>
                </div>
              </div>
              <div className="cc-gland-body">
                {[
                  "Located close to trachea in the neck; butterfly-shaped",
                  <><strong>Regulates metabolism</strong> — controls how fast body uses energy</>,
                  <><strong>Hyposecretion</strong> → Hypothyroidism → simple goitre, myxoedema, cretinism</>,
                  "Lack of iodine → thyroxine deficiency → goitre (enlarged thyroid)",
                  <><strong>Hypersecretion</strong> → Hyperthyroidism → high metabolism, bulging eyes, high BP, nervous tension</>,
                ].map((t,i)=>(<div className="cc-gland-row" key={i}><span className="cc-gland-row-dot"/><span>{t}</span></div>))}
              </div>
            </div>

            <div className="cc-gland-card" data-color="amber">
              <div className="cc-gland-top">
                <span className="cc-gland-icon">🦴</span>
                <div className="cc-gland-info">
                  <div className="cc-gland-tag">Calcium Regulator</div>
                  <div className="cc-gland-name">Parathyroid Gland</div>
                  <div className="cc-gland-hormone">→ Parathormone (PTH)</div>
                </div>
              </div>
              <div className="cc-gland-body">
                {[
                  "4 small glands on the back side of the thyroid gland",
                  <><strong>Regulates calcium ion levels</strong> in the bloodstream</>,
                  <><strong>Excess PTH</strong> → removes calcium from bones → bones become soft and fragile</>,
                  "Deficiency → muscle cramps, tetany",
                ].map((t,i)=>(<div className="cc-gland-row" key={i}><span className="cc-gland-row-dot"/><span>{t}</span></div>))}
              </div>
            </div>

            <div className="cc-gland-card" data-color="pink">
              <div className="cc-gland-top">
                <span className="cc-gland-icon">🍬</span>
                <div className="cc-gland-info">
                  <div className="cc-gland-tag">Sugar Regulator</div>
                  <div className="cc-gland-name">Pancreas</div>
                  <div className="cc-gland-hormone">→ Insulin + Glucagon</div>
                </div>
              </div>
              <div className="cc-gland-body">
                {[
                  "Both an endocrine and exocrine gland (mixed gland)",
                  <><strong>Insulin</strong> — lowers blood sugar; promotes glucose absorption into cells</>,
                  <><strong>Glucagon</strong> — raises blood sugar; promotes glucose release from liver</>,
                  <><strong>Insulin deficiency → Diabetes mellitus</strong> — high blood sugar (hyperglycaemia)</>,
                  "Together they maintain blood sugar homeostasis",
                ].map((t,i)=>(<div className="cc-gland-row" key={i}><span className="cc-gland-row-dot"/><span>{t}</span></div>))}
              </div>
            </div>

            <div className="cc-gland-card" data-color="red">
              <div className="cc-gland-top">
                <span className="cc-gland-icon">🚨</span>
                <div className="cc-gland-info">
                  <div className="cc-gland-tag">Stress Gland</div>
                  <div className="cc-gland-name">Adrenal Gland</div>
                  <div className="cc-gland-hormone">→ Adrenaline + Cortisol</div>
                </div>
              </div>
              <div className="cc-gland-body">
                {[
                  "Two adrenal glands — one on top of each kidney",
                  <><strong>Cortex</strong> → Cortisol — regulates rate of metabolism, anti-inflammatory</>,
                  <><strong>Medulla</strong> → Adrenaline — fight-or-flight hormone; prepares body for stress</>,
                  "Adrenaline: ↑ heart rate, ↑ breathing, ↑ blood glucose, dilates pupils",
                ].map((t,i)=>(<div className="cc-gland-row" key={i}><span className="cc-gland-row-dot"/><span>{t}</span></div>))}
              </div>
            </div>

            <div className="cc-gland-card" data-color="green">
              <div className="cc-gland-top">
                <span className="cc-gland-icon">⚧</span>
                <div className="cc-gland-info">
                  <div className="cc-gland-tag">Sex Glands</div>
                  <div className="cc-gland-name">Gonads</div>
                  <div className="cc-gland-hormone">→ Testosterone / Estrogen / Progesterone</div>
                </div>
              </div>
              <div className="cc-gland-body">
                {[
                  <><strong>Testes</strong> (males) → Testosterone; secretion begins at puberty</>,
                  "Testosterone: develops male secondary sexual characteristics",
                  <><strong>Ovaries</strong> (females) → Estrogen + Progesterone</>,
                  <><strong>Estrogen</strong> — female secondary characteristics; deficiency → infertility</>,
                  <><strong>Progesterone</strong> — prepares uterus for pregnancy, maintains it</>,
                ].map((t,i)=>(<div className="cc-gland-row" key={i}><span className="cc-gland-row-dot"/><span>{t}</span></div>))}
              </div>
            </div>
          </div>

          <div className="cc-pull-quote">
            <p>"Adrenaline is the body's own emergency alarm system — in under a second it redirects blood from your stomach to your muscles, dilates your pupils, spikes your heart rate, and floods your bloodstream with glucose. Fight or flight, decided chemically."</p>
          </div>

          {/* ══ CHAPTER 3: PLANT RESPONSES ══ */}
          <div className="cc-chapter-divider">
            <div className="cc-ch-badge">
              <span className="cc-ch-badge-num">03</span>
              Plant Responses
            </div>
          </div>

          <div className="cc-sec-head">
            <span className="cc-sec-num">6</span>
            <div className="cc-sec-kicker">// Plant Behaviour</div>
            <h2 className="cc-sec-title">Movement <span>in Plants</span></h2>
          </div>
          <p className="cc-body-text">Plants cannot move from place to place, but they respond to stimuli by showing <strong>movement of specific parts</strong>. These can be growth-dependent (tropic) or growth-independent (nastic).</p>

          {/* Tropic vs Nastic */}
          <div className="cc-movement-compare">
            <div className="cc-mv-col tropic">
              <span className="cc-mv-badge">Growth-dependent</span>
              <div className="cc-mv-title">🌱 Tropic Movement</div>
              <div className="cc-mv-def">Directional movement in response to stimulus. The direction of movement depends on the direction of the stimulus.</div>
              <ul className="cc-mv-list">
                {[
                  <><strong>Involves growth</strong> — if growth stopped, movement stops</>,
                  "Direction of movement = direction of stimulus",
                  <><strong>Phototropism</strong> — towards/away from light</>,
                  <><strong>Geotropism</strong> — roots downward, shoots upward (gravity)</>,
                  <><strong>Hydrotropism</strong> — towards moisture</>,
                  <><strong>Chemotropism</strong> — towards chemicals (pollen tube)</>,
                  <><strong>Thigmotropism</strong> — in response to touch (tendrils)</>,
                ].map((t,i)=>(<li className="cc-mv-item" key={i}><span className="cc-mv-dot"/><span>{t}</span></li>))}
              </ul>
            </div>
            <div className="cc-mv-col nastic">
              <span className="cc-mv-badge">Growth-independent</span>
              <div className="cc-mv-title">🌿 Nastic Movement</div>
              <div className="cc-mv-def">Response to environmental stimulus but direction of response is NOT determined by direction of stimulus.</div>
              <ul className="cc-mv-list">
                {[
                  <><strong>Does NOT involve growth</strong></>,
                  "Direction predetermined by plant structure",
                  "Caused by changes in turgor pressure in cells",
                  <><strong>Thigmonastic</strong> — Mimosa pudica (touch-me-not) folds leaves</>,
                  <><strong>Thermonastic</strong> — tulip flowers open/close with temperature</>,
                  <><strong>Photonastic</strong> — daisy opens in day, closes at night</>,
                  <><strong>Example:</strong> Mimosa pudica is growth-INDEPENDENT nastic movement</>,
                ].map((t,i)=>(<li className="cc-mv-item" key={i}><span className="cc-mv-dot"/><span>{t}</span></li>))}
              </ul>
            </div>
          </div>

          {/* Tropisms grid */}
          <div className="cc-tropic-grid">
            {[
              { icon:"☀️", name:"Phototropism",   stim:"→ Light",     desc:"Shoot grows towards light (positive). Root grows away from light (negative)." },
              { icon:"⬇️", name:"Geotropism",     stim:"→ Gravity",   desc:"Root grows downward (positive). Shoot grows upward (negative). Seen in seed germination." },
              { icon:"💧", name:"Hydrotropism",   stim:"→ Water",     desc:"Roots grow towards water/moisture in soil." },
              { icon:"🧪", name:"Chemotropism",   stim:"→ Chemicals", desc:"Pollen tube grows towards ovule through chemical signals in pistil." },
              { icon:"🤏", name:"Thigmotropism",  stim:"→ Touch",     desc:"Tendrils of climbing plants coil around support when touched." },
            ].map(t => (
              <div className="cc-tropic-card" key={t.name}>
                <span className="cc-tropic-icon">{t.icon}</span>
                <div className="cc-tropic-name">{t.name}</div>
                <div className="cc-tropic-stim">{t.stim}</div>
                <div className="cc-tropic-desc">{t.desc}</div>
              </div>
            ))}
          </div>

          {/* Plant hormones */}
          <div className="cc-divider"><div className="cc-divider-mark"/></div>
          <div className="cc-sec-head">
            <span className="cc-sec-num">7</span>
            <div className="cc-sec-kicker">// Phytohormones</div>
            <h2 className="cc-sec-title">Plant <span>Hormones</span></h2>
          </div>
          <p className="cc-body-text">Growth and development in plants is regulated by chemical substances called <strong>phytohormones</strong> (plant hormones). They control everything from root growth to fruit ripening.</p>

          <div className="cc-phormone-table">
            <div className="cc-ph-head">
              <div className="cc-ph-th">Hormone</div>
              <div className="cc-ph-th">Primary Function</div>
              <div className="cc-ph-th">Key Details</div>
            </div>
            {[
              { cls:"ph-auxin",     name:"Auxin",          fn:"Stem growth", badge:"Growth Promoter", detail:"Promotes growth of stem tip. Responsible for phototropism — unequal distribution causes bending toward light. Produced at shoot apex." },
              { cls:"ph-gibberel",  name:"Gibberellin",    fn:"Stem elongation", badge:"Growth Promoter", detail:"Promotes stem elongation, seed germination, and fruit development. Can cause plants to grow much taller." },
              { cls:"ph-cytokinin", name:"Cytokinin",      fn:"Cell division", badge:"Growth Promoter", detail:"Promotes cell division (cytokinesis). Delays ageing of leaves (senescence). Works with auxin to regulate growth." },
              { cls:"ph-abscisic",  name:"Abscisic Acid",  fn:"Dormancy & stress", badge:"Growth Inhibitor", detail:"Promotes seed dormancy; causes stomata to close during water stress; inhibits growth. Called the 'stress hormone'." },
              { cls:"ph-ethylene",  name:"Ethylene",       fn:"Fruit ripening", badge:"Ripening Agent", detail:"Only gaseous plant hormone. Regulates fruit ripening, promotes leaf/fruit/flower drop (abscission). Used commercially to ripen bananas." },
            ].map(h => (
              <div className={`cc-ph-row ${h.cls}`} key={h.name}>
                <div className="cc-ph-cell name">{h.name}</div>
                <div className="cc-ph-cell badge"><span className="cc-ph-badge">{h.badge}</span><br/><span style={{fontSize:"12px",color:"var(--muted)",marginTop:"4px",display:"block"}}>{h.fn}</span></div>
                <div className="cc-ph-cell">{h.detail}</div>
              </div>
            ))}
          </div>

          <div className="cc-alert green">
            🌱 <strong>Memory tip:</strong> <strong>A</strong>uxin (stem growth) · <strong>G</strong>ibberellin (elongation) · <strong>C</strong>ytokinin (cell division) · <strong>A</strong>bscisic acid (dormancy/inhibitor) · <strong>E</strong>thylene (ripening) — <em>"A Great Crop Awaits Everywhere"</em>
          </div>

          {/* FAQ */}
          <div className="cc-divider"><div className="cc-divider-mark"/></div>
          <div className="cc-faq-header"><span className="cc-faq-kicker">// Exam Preparation</span></div>
          <h2 className="cc-faq-title">Frequently Asked Questions</h2>
          {faqs.map((faq,i) => (
            <div className={`cc-faq-item${openIndex===i?" open":""}`} key={i}>
              <button className="cc-faq-q" onClick={()=>toggle(i)}>
                <span className="cc-faq-q-text">Q{i+1}. {faq.q}</span>
                <span className="cc-faq-icon">+</span>
              </button>
              <div className={`cc-faq-ans${openIndex===i?" visible":""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
