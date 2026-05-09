import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800&family=DM+Sans:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --navy:       #0a1628;
    --navy2:      #061020;
    --navy-lt:    #e8eef8;
    --navy-mid:   #a8b8d8;
    --gold:       #c8960a;
    --gold2:      #9a7008;
    --gold-lt:    #fef9e7;
    --gold-mid:   #f9d84a;
    --gold-bright:#ffd700;
    --teal:       #0e7490;
    --teal-lt:    #e0f7fa;
    --teal-mid:   #67e8f9;
    --green:      #166534;
    --green-lt:   #dcfce7;
    --green-mid:  #86efac;
    --red:        #991b1b;
    --red-lt:     #fee2e2;
    --red-mid:    #fca5a5;
    --purple:     #6b21a8;
    --purple-lt:  #f3e8ff;
    --purple-mid: #d8b4fe;
    --amber:      #b45309;
    --amber-lt:   #fffbeb;
    --amber-mid:  #fcd34d;
    --paper:      #f8f9fc;
    --paper2:     #eef1f8;
    --ink:        #060d1a;
    --ink2:       #0e1e35;
    --muted:      #4a5568;
    --rule:       #d1d9e8;
    --white:      #ffffff;
  }
  * { box-sizing:border-box; margin:0; padding:0; }
  .hae-root { font-family:'DM Sans',sans-serif; background:var(--paper); color:var(--ink); min-height:100vh; }

  /* ═══ HERO ═══ */
  .hae-hero {
    background:linear-gradient(160deg,#020810 0%,#060d1a 45%,#0a1628 100%);
    min-height:100vh; position:relative; overflow:hidden;
    display:flex; flex-direction:column; justify-content:center;
    padding:80px 0 72px;
  }
  .hae-hero::before { content:''; position:absolute; top:0; left:0; right:0; height:5px; background:linear-gradient(90deg,#c8960a 0%,#ffd700 25%,#0e7490 50%,#6b21a8 75%,#166534 100%); }
  /* DNA helix grid */
  .hae-hero-grid {
    position:absolute; inset:0; pointer-events:none;
    background-image:linear-gradient(rgba(200,150,10,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(200,150,10,0.06) 1px,transparent 1px);
    background-size:56px 56px;
  }
  .hae-glow-1 { position:absolute; top:-5%; left:10%; width:500px; height:500px; border-radius:50%; background:radial-gradient(circle,rgba(200,150,10,0.12) 0%,transparent 65%); pointer-events:none; }
  .hae-glow-2 { position:absolute; bottom:5%; right:5%; width:400px; height:400px; border-radius:50%; background:radial-gradient(circle,rgba(14,116,144,0.1) 0%,transparent 65%); pointer-events:none; }
  .hae-glow-3 { position:absolute; top:35%; right:30%; width:280px; height:280px; border-radius:50%; background:radial-gradient(circle,rgba(107,33,168,0.08) 0%,transparent 65%); pointer-events:none; }

  /* DNA SVG right side */
  .hae-hero-dna { position:absolute; right:0; top:0; width:45%; height:100%; pointer-events:none; opacity:0.4; }

  .hae-hero-inner { max-width:960px; width:100%; margin:0 auto; padding:0 40px; position:relative; z-index:2; }

  .hae-subject-pill {
    display:inline-flex; align-items:center; gap:8px;
    border:1px solid rgba(200,150,10,0.4); background:rgba(200,150,10,0.12);
    border-radius:6px; padding:6px 16px; margin-bottom:28px;
    font-size:11px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; color:var(--gold-mid);
  }
  .hae-pill-dot { width:6px; height:6px; border-radius:50%; background:var(--gold-mid); }

  .hae-hero-eyebrow { font-size:11px; font-weight:600; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:14px; }

  .hae-hero-title {
    font-family:'Playfair Display',serif; font-weight:900;
    font-size:clamp(40px,6vw,78px); line-height:1.0;
    letter-spacing:-0.02em; color:#fff; margin-bottom:10px;
  }
  .hae-hero-title .t1 { display:block; }
  .hae-hero-title .t2 { display:block; color:var(--gold-mid); font-style:italic; }
  .hae-hero-title .t3 { display:block; color:rgba(255,255,255,0.3); font-size:0.5em; font-style:normal; font-weight:700; letter-spacing:0.01em; margin-top:6px; }

  .hae-hero-desc { font-size:16px; color:rgba(255,255,255,0.55); line-height:1.8; max-width:540px; margin:20px 0 40px; }

  .hae-hero-stats { display:flex; gap:0; border:1px solid rgba(255,255,255,0.08); border-radius:10px; overflow:hidden; width:fit-content; flex-wrap:wrap; }
  .hae-hero-stat { padding:14px 26px; border-right:1px solid rgba(255,255,255,0.08); }
  .hae-hero-stat:last-child { border-right:none; }
  .hae-stat-num { font-family:'Playfair Display',serif; font-size:22px; font-weight:800; color:var(--gold-mid); line-height:1; margin-bottom:4px; }
  .hae-stat-label { font-size:11px; color:rgba(255,255,255,0.35); font-weight:500; letter-spacing:0.06em; }

  /* ═══ BODY ═══ */
  .hae-body { max-width:920px; margin:0 auto; padding:80px 32px 100px; }

  /* ═══ INTRO ═══ */
  .hae-intro { display:grid; grid-template-columns:3fr 2fr; gap:40px; margin-bottom:72px; align-items:start; }
  @media(max-width:640px){.hae-intro{grid-template-columns:1fr;}}
  .hae-intro-kicker { font-size:10px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:var(--gold); margin-bottom:12px; display:flex; align-items:center; gap:10px; }
  .hae-intro-kicker::after { content:''; width:48px; height:1px; background:var(--gold-mid); }
  .hae-intro-headline { font-family:'Playfair Display',serif; font-size:clamp(22px,3vw,30px); font-weight:800; color:var(--ink); line-height:1.2; margin-bottom:16px; }
  .hae-intro-headline em { font-style:italic; color:var(--gold); }
  .hae-intro-body { font-size:16px; line-height:1.85; color:var(--ink2); margin-bottom:14px; }
  .hae-intro-body strong { color:var(--navy); font-weight:600; }
  .hae-intro-sidebar { background:linear-gradient(160deg,#060d1a,#0a1e30); border-radius:14px; padding:26px 22px; position:relative; overflow:hidden; }
  .hae-intro-sidebar::before { content:''; position:absolute; top:-20px; right:-20px; width:100px; height:100px; border-radius:50%; background:rgba(200,150,10,0.08); }
  .hae-sidebar-label { font-size:9px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(249,216,74,0.6); margin-bottom:12px; }
  .hae-sidebar-title { font-family:'Playfair Display',serif; font-size:17px; font-weight:800; color:#fff; margin-bottom:14px; line-height:1.3; }
  .hae-sidebar-list { list-style:none; padding:0; }
  .hae-sidebar-item { display:flex; align-items:center; gap:10px; padding:7px 0; border-bottom:1px solid rgba(255,255,255,0.07); font-size:13px; color:rgba(255,255,255,0.7); }
  .hae-sidebar-item:last-child { border-bottom:none; }
  .hae-sidebar-num { font-family:'Playfair Display',serif; font-size:20px; font-weight:800; color:var(--gold-mid); flex-shrink:0; width:26px; line-height:1; }

  /* ═══ CHAPTER DIVIDER ═══ */
  .hae-chapter-divider { display:flex; align-items:center; gap:20px; margin:64px 0 48px; }
  .hae-chapter-divider::before, .hae-chapter-divider::after { content:''; flex:1; height:1px; background:var(--rule); }
  .hae-ch-badge { display:flex; align-items:center; gap:10px; background:var(--navy); border-radius:8px; padding:9px 22px; font-size:12px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#fff; white-space:nowrap; }
  .hae-ch-num { font-family:'Playfair Display',serif; font-size:16px; color:var(--gold-mid); font-weight:800; }

  /* ═══ SEC HEADER ═══ */
  .hae-sec-head { margin-bottom:28px; }
  .hae-sec-num { font-family:'Playfair Display',serif; font-size:80px; font-weight:900; color:var(--navy-lt); line-height:0.85; letter-spacing:-0.04em; display:block; margin-bottom:2px; }
  .hae-sec-kicker { font-size:10px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold); margin-bottom:6px; }
  .hae-sec-title { font-family:'Playfair Display',serif; font-size:clamp(22px,3.5vw,32px); font-weight:800; color:var(--ink); line-height:1.15; border-bottom:2px solid var(--rule); padding-bottom:14px; }
  .hae-sec-title span { color:var(--gold); font-style:italic; }

  /* ═══ BODY TEXT ═══ */
  .hae-body-text { font-size:16px; line-height:1.85; color:var(--ink2); margin-bottom:24px; }
  .hae-body-text strong { color:var(--navy); font-weight:600; }

  /* ═══ DIVIDER ═══ */
  .hae-divider { margin:52px 0; display:flex; align-items:center; gap:14px; }
  .hae-divider::before, .hae-divider::after { content:''; flex:1; height:1px; background:var(--rule); }
  .hae-divider-mark { width:8px; height:8px; border-radius:50%; background:var(--gold); flex-shrink:0; }

  /* ═══ ALERT ═══ */
  .hae-alert { padding:14px 18px; border-radius:8px; font-size:14px; line-height:1.7; margin-bottom:16px; }
  .hae-alert.gold   { background:var(--gold-lt);   color:var(--gold2);   border-left:4px solid var(--gold); }
  .hae-alert.teal   { background:var(--teal-lt);   color:var(--teal);    border-left:4px solid var(--teal); }
  .hae-alert.green  { background:var(--green-lt);  color:var(--green);   border-left:4px solid var(--green); }
  .hae-alert.red    { background:var(--red-lt);    color:var(--red);     border-left:4px solid var(--red); }
  .hae-alert.purple { background:var(--purple-lt); color:var(--purple);  border-left:4px solid var(--purple); }
  .hae-alert.navy   { background:var(--navy-lt);   color:var(--navy);    border-left:4px solid var(--navy); }
  .hae-alert strong { font-weight:700; }

  /* ═══ PULL QUOTE ═══ */
  .hae-pull-quote { border-left:5px solid var(--gold); background:var(--gold-lt); padding:22px 30px; margin:28px 0; border-radius:0 8px 8px 0; }
  .hae-pull-quote p { font-family:'Playfair Display',serif; font-size:17px; font-style:italic; font-weight:700; color:var(--gold2); line-height:1.7; margin:0; }

  /* ═══ HEREDITY TERMS GRID ═══ */
  .hae-terms-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:28px; }
  @media(max-width:640px){.hae-terms-grid{grid-template-columns:1fr 1fr;}}
  .hae-term-card { background:var(--white); border-radius:10px; padding:16px 16px; border:1.5px solid var(--rule); border-top:3px solid var(--gold); }
  .hae-term-card:nth-child(2){border-top-color:var(--teal);}
  .hae-term-card:nth-child(3){border-top-color:var(--green);}
  .hae-term-card:nth-child(4){border-top-color:var(--red);}
  .hae-term-card:nth-child(5){border-top-color:var(--purple);}
  .hae-term-card:nth-child(6){border-top-color:var(--amber);}
  .hae-term-card:nth-child(7){border-top-color:var(--navy);}
  .hae-term-card:nth-child(8){border-top-color:var(--gold);}
  .hae-term-card:nth-child(9){border-top-color:var(--teal);}
  .hae-term-name { font-family:'Playfair Display',serif; font-size:14px; font-weight:800; color:var(--ink); margin-bottom:4px; }
  .hae-term-eg   { font-size:11px; font-weight:700; color:var(--gold); margin-bottom:5px; font-style:italic; }
  .hae-term-card:nth-child(2) .hae-term-eg{color:var(--teal);}
  .hae-term-card:nth-child(3) .hae-term-eg{color:var(--green);}
  .hae-term-card:nth-child(4) .hae-term-eg{color:var(--red);}
  .hae-term-card:nth-child(5) .hae-term-eg{color:var(--purple);}
  .hae-term-card:nth-child(6) .hae-term-eg{color:var(--amber);}
  .hae-term-card:nth-child(7) .hae-term-eg{color:var(--navy);}
  .hae-term-card:nth-child(8) .hae-term-eg{color:var(--gold);}
  .hae-term-card:nth-child(9) .hae-term-eg{color:var(--teal);}
  .hae-term-def  { font-size:12.5px; color:var(--muted); line-height:1.55; }

  /* ═══ MENDEL EXPERIMENTS TIMELINE ═══ */
  .hae-mendel-timeline { background:var(--white); border-radius:14px; border:1.5px solid var(--rule); overflow:hidden; margin-bottom:28px; box-shadow:0 4px 20px rgba(10,22,40,0.06); }
  .hae-mt-header { background:linear-gradient(90deg,var(--navy2),var(--navy)); padding:14px 24px; display:flex; align-items:center; gap:12px; }
  .hae-mt-title { font-family:'Playfair Display',serif; font-size:16px; font-weight:800; color:#fff; }
  .hae-mt-sub   { font-size:12px; color:rgba(255,255,255,0.45); margin-left:auto; }
  .hae-mt-body  { padding:24px; }
  .hae-mt-steps { display:flex; flex-direction:column; gap:0; }
  .hae-mt-step  { display:grid; grid-template-columns:52px 1fr; }
  .hae-mt-left  { display:flex; flex-direction:column; align-items:center; padding-top:4px; }
  .hae-mt-circle { width:38px; height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:15px; border:2px solid var(--rule); background:var(--gold-lt); flex-shrink:0; z-index:1; }
  .hae-mt-line  { flex:1; width:2px; background:var(--rule); margin:4px 0; }
  .hae-mt-step:last-child .hae-mt-line { display:none; }
  .hae-mt-content { padding:0 0 22px 16px; }
  .hae-mt-step:last-child .hae-mt-content { padding-bottom:4px; }
  .hae-mt-stage { font-family:'Playfair Display',serif; font-size:15px; font-weight:800; color:var(--ink); margin-bottom:4px; }
  .hae-mt-detail { font-size:14px; color:var(--ink2); line-height:1.75; }
  .hae-mt-detail strong { color:var(--gold2); font-weight:600; }

  /* ═══ PUNNETT SQUARE ═══ */
  .hae-punnett-layout { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:28px; align-items:start; }
  @media(max-width:640px){.hae-punnett-layout{grid-template-columns:1fr;}}
  .hae-punnett-card { background:var(--white); border-radius:14px; overflow:hidden; border:1.5px solid var(--rule); box-shadow:0 4px 16px rgba(10,22,40,0.06); }
  .hae-punnett-label { padding:10px 16px; font-size:10px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; }
  .hae-punnett-label.mono { background:linear-gradient(90deg,#060d1a,#0e1e35); color:var(--gold-mid); }
  .hae-punnett-label.di   { background:linear-gradient(90deg,#06141a,#0a2430); color:var(--teal-mid); }
  .hae-punnett-wrap { padding:20px; display:flex; flex-direction:column; align-items:center; gap:16px; }
  /* Grid table */
  .hae-punnett-table { border-collapse:collapse; }
  .hae-punnett-table td { width:52px; height:44px; border:1.5px solid var(--rule); text-align:center; font-family:'Playfair Display',serif; font-size:15px; font-weight:700; }
  .hae-punnett-table td.header-cell { background:var(--navy); color:var(--gold-mid); font-size:14px; }
  .hae-punnett-table td.dominant { background:rgba(22,101,52,0.12); color:var(--green); }
  .hae-punnett-table td.hetero   { background:rgba(200,150,10,0.12); color:var(--gold2); }
  .hae-punnett-table td.recessive{ background:rgba(153,27,27,0.1); color:var(--red); }
  .hae-punnett-ratio { font-size:13px; color:var(--muted); text-align:center; line-height:1.6; }
  .hae-punnett-ratio strong { color:var(--ink); font-weight:700; font-family:'Playfair Display',serif; font-size:15px; }
  .hae-ratio-badge { display:inline-block; background:var(--navy); color:var(--gold-mid); border-radius:6px; padding:4px 14px; font-family:'Playfair Display',serif; font-size:16px; font-weight:800; margin:6px 0; }

  /* ═══ MENDEL'S LAWS CARDS ═══ */
  .hae-laws-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:28px; }
  @media(max-width:640px){.hae-laws-grid{grid-template-columns:1fr;}}
  .hae-law-card { background:var(--white); border-radius:12px; border:1.5px solid var(--rule); display:flex; flex-direction:column; overflow:hidden; }
  .hae-law-hdr  { padding:18px 18px 12px; }
  .hae-law-hdr.dom  { background:linear-gradient(135deg,#060d1a,#0e1e35); }
  .hae-law-hdr.seg  { background:linear-gradient(135deg,#06141a,#0e2430); }
  .hae-law-hdr.ind  { background:linear-gradient(135deg,#100616,#201030); }
  .hae-law-num  { font-family:'Playfair Display',serif; font-size:11px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:5px; }
  .dom .hae-law-num { color:rgba(249,216,74,0.6); }
  .seg .hae-law-num { color:rgba(103,232,249,0.6); }
  .ind .hae-law-num { color:rgba(216,180,254,0.6); }
  .hae-law-name { font-family:'Playfair Display',serif; font-size:16px; font-weight:800; color:#fff; margin-bottom:3px; }
  .dom .hae-law-name { color:var(--gold-mid); }
  .seg .hae-law-name { color:var(--teal-mid); }
  .ind .hae-law-name { color:var(--purple-mid); }
  .hae-law-body { padding:14px 18px; flex:1; }
  .hae-law-item { display:flex; gap:9px; font-size:14px; color:var(--ink2); padding:7px 0; border-bottom:1px solid var(--rule); line-height:1.6; align-items:flex-start; }
  .hae-law-item:last-child { border-bottom:none; }
  .hae-law-dot  { min-width:6px; height:6px; border-radius:50%; margin-top:8px; flex-shrink:0; }
  .dom-dot  { background:var(--gold); }
  .seg-dot  { background:var(--teal); }
  .ind-dot  { background:var(--purple); }
  .hae-law-item strong { font-weight:600; color:var(--ink); }

  /* ═══ DOMINANCE COMPARE ═══ */
  .hae-dominance-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:28px; }
  @media(max-width:640px){.hae-dominance-grid{grid-template-columns:1fr;}}
  .hae-dom-card { background:var(--white); border-radius:10px; overflow:hidden; border:1.5px solid var(--rule); display:flex; flex-direction:column; }
  .hae-dom-hdr  { padding:16px 16px 10px; }
  .hae-dom-hdr.complete   { background:linear-gradient(135deg,#060d1a,#0e1e35); }
  .hae-dom-hdr.incomplete { background:linear-gradient(135deg,#06141a,#0e2430); }
  .hae-dom-hdr.codominant { background:linear-gradient(135deg,#100616,#201030); }
  .hae-dom-tag  { font-size:9px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:rgba(255,255,255,0.45); margin-bottom:4px; }
  .hae-dom-name { font-family:'Playfair Display',serif; font-size:16px; font-weight:800; }
  .complete   .hae-dom-name { color:var(--gold-mid); }
  .incomplete .hae-dom-name { color:var(--teal-mid); }
  .codominant .hae-dom-name { color:var(--purple-mid); }
  .hae-dom-body { padding:14px 16px; flex:1; }
  .hae-dom-item { display:flex; gap:8px; font-size:13.5px; color:var(--ink2); padding:6px 0; border-bottom:1px solid var(--rule); line-height:1.6; align-items:flex-start; }
  .hae-dom-item:last-child { border-bottom:none; }
  .hae-dom-dot  { min-width:6px; height:6px; border-radius:50%; margin-top:7px; flex-shrink:0; }
  .complete-dot   { background:var(--gold); }
  .incomplete-dot { background:var(--teal); }
  .codominant-dot { background:var(--purple); }
  .hae-dom-item strong { color:var(--ink); font-weight:600; }

  /* ═══ SEX DETERMINATION ═══ */
  .hae-sex-det {
    background:var(--navy2); border-radius:14px; padding:28px 32px; margin-bottom:24px;
    border:1px solid rgba(200,150,10,0.25); position:relative; overflow:hidden;
  }
  .hae-sex-det::before { content:''; position:absolute; top:-30px; right:-30px; width:180px; height:180px; border-radius:50%; background:radial-gradient(circle,rgba(200,150,10,0.1) 0%,transparent 65%); }
  .hae-sex-label { font-size:10px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(249,216,74,0.6); margin-bottom:18px; }
  .hae-sex-grid { display:grid; grid-template-columns:1fr auto 1fr; gap:20px; align-items:center; margin-bottom:20px; }
  @media(max-width:580px){.hae-sex-grid{grid-template-columns:1fr;}}
  .hae-sex-parent { background:rgba(255,255,255,0.06); border-radius:10px; padding:16px 18px; text-align:center; border:1px solid rgba(255,255,255,0.1); }
  .hae-sex-parent-label { font-size:10px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:6px; }
  .hae-sex-parent.female .hae-sex-parent-label { color:rgba(244,143,177,0.7); }
  .hae-sex-parent.male   .hae-sex-parent-label { color:rgba(129,212,250,0.7); }
  .hae-sex-chrom { font-family:'Playfair Display',serif; font-size:26px; font-weight:900; margin-bottom:6px; }
  .female .hae-sex-chrom { color:#f9a8d4; }
  .male   .hae-sex-chrom { color:#93c5fd; }
  .hae-sex-formula { font-size:13px; color:rgba(255,255,255,0.55); }
  .hae-sex-cross { font-size:28px; color:rgba(255,255,255,0.2); font-weight:300; text-align:center; }
  .hae-sex-offspring { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .hae-sex-off-card { background:rgba(255,255,255,0.06); border-radius:8px; padding:14px; text-align:center; border:1px solid rgba(255,255,255,0.08); }
  .hae-sex-off-label { font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:5px; }
  .hae-sex-off-card.girl .hae-sex-off-label { color:#f9a8d4; }
  .hae-sex-off-card.boy  .hae-sex-off-label { color:#93c5fd; }
  .hae-sex-off-chrom { font-family:'Playfair Display',serif; font-size:20px; font-weight:800; margin-bottom:4px; }
  .girl .hae-sex-off-chrom { color:#f9a8d4; }
  .boy  .hae-sex-off-chrom { color:#93c5fd; }
  .hae-sex-off-desc { font-size:12px; color:rgba(255,255,255,0.5); }
  .hae-sex-note { font-size:13px; color:rgba(255,255,255,0.6); line-height:1.7; margin-top:14px; padding-top:14px; border-top:1px solid rgba(255,255,255,0.08); }
  .hae-sex-note strong { color:var(--gold-mid); }

  /* ═══ EVOLUTION CAUSES ═══ */
  .hae-evolution-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:28px; }
  @media(max-width:640px){.hae-evolution-grid{grid-template-columns:1fr;}}
  .hae-evo-card { background:var(--white); border-radius:12px; border:1.5px solid var(--rule); display:flex; flex-direction:column; overflow:hidden; }
  .hae-evo-hdr  { padding:18px 18px 12px; }
  .hae-evo-hdr.natural { background:linear-gradient(135deg,#061408,#0e2810); }
  .hae-evo-hdr.genetic { background:linear-gradient(135deg,#060e1a,#0a1830); }
  .hae-evo-hdr.geo     { background:linear-gradient(135deg,#140a04,#281a08); }
  .hae-evo-icon  { font-size:26px; display:block; margin-bottom:8px; }
  .hae-evo-name  { font-family:'Playfair Display',serif; font-size:16px; font-weight:800; }
  .natural .hae-evo-name { color:var(--green-mid); }
  .genetic .hae-evo-name { color:var(--navy-mid); }
  .geo     .hae-evo-name { color:var(--amber-mid); }
  .hae-evo-body  { padding:14px 18px; flex:1; }
  .hae-evo-item  { display:flex; gap:8px; font-size:13.5px; color:var(--ink2); padding:7px 0; border-bottom:1px solid var(--rule); line-height:1.6; align-items:flex-start; }
  .hae-evo-item:last-child { border-bottom:none; }
  .hae-evo-dot   { min-width:6px; height:6px; border-radius:50%; margin-top:7px; flex-shrink:0; }
  .natural-dot { background:var(--green); }
  .genetic-dot { background:var(--teal); }
  .geo-dot     { background:var(--amber); }
  .hae-evo-item strong { color:var(--ink); font-weight:600; }

  /* ═══ HOMOLOGOUS VS ANALOGOUS ═══ */
  .hae-organ-compare { display:grid; grid-template-columns:1fr 1fr; gap:0; border:1.5px solid var(--rule); border-radius:12px; overflow:hidden; margin-bottom:28px; }
  @media(max-width:600px){.hae-organ-compare{grid-template-columns:1fr;}}
  .hae-oc-col { padding:24px 24px 28px; display:flex; flex-direction:column; }
  .hae-oc-col.homo   { background:linear-gradient(160deg,#060d1a,#0e1e35); }
  .hae-oc-col.analog { background:var(--white); border-left:2px solid var(--rule); }
  .hae-oc-badge { display:inline-block; padding:4px 14px; border-radius:100px; margin-bottom:12px; font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; }
  .homo   .hae-oc-badge { background:rgba(200,150,10,0.2); color:var(--gold-mid); }
  .analog .hae-oc-badge { background:var(--teal-lt); color:var(--teal); }
  .hae-oc-title { font-family:'Playfair Display',serif; font-size:21px; font-weight:800; margin-bottom:6px; }
  .homo   .hae-oc-title { color:var(--gold-mid); }
  .analog .hae-oc-title { color:var(--ink); }
  .hae-oc-def { font-size:13.5px; line-height:1.7; margin-bottom:14px; }
  .homo   .hae-oc-def { color:rgba(255,255,255,0.6); }
  .analog .hae-oc-def { color:var(--muted); }
  .hae-oc-list { display:flex; flex-direction:column; gap:8px; flex:1; }
  .hae-oc-item { display:flex; gap:9px; font-size:14px; line-height:1.65; align-items:flex-start; }
  .homo   .hae-oc-item { color:rgba(255,255,255,0.75); }
  .analog .hae-oc-item { color:var(--ink2); }
  .hae-oc-dot { min-width:6px; height:6px; border-radius:50%; margin-top:8px; flex-shrink:0; }
  .homo   .hae-oc-dot { background:var(--gold-mid); }
  .analog .hae-oc-dot { background:var(--teal); }
  .hae-oc-item strong { font-weight:600; }
  .homo   .hae-oc-item strong { color:var(--gold-mid); }
  .analog .hae-oc-item strong { color:var(--teal); }
  @media(max-width:600px){.analog{border-left:none;border-top:2px solid var(--rule);}}

  /* ═══ FOSSILS CARD ═══ */
  .hae-fossil-card {
    background:linear-gradient(135deg,#060d1a,#0e1e35);
    border-radius:14px; padding:28px 32px; margin-bottom:28px;
    border:1px solid rgba(200,150,10,0.25);
  }
  .hae-fossil-label { font-size:10px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(249,216,74,0.6); margin-bottom:16px; }
  .hae-fossil-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  @media(max-width:580px){.hae-fossil-grid{grid-template-columns:1fr;}}
  .hae-fossil-section {}
  .hae-fossil-section-title { font-family:'Playfair Display',serif; font-size:15px; font-weight:800; color:var(--gold-mid); margin-bottom:10px; }
  .hae-fossil-item { display:flex; gap:8px; font-size:13px; color:rgba(255,255,255,0.65); padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.06); line-height:1.6; align-items:flex-start; }
  .hae-fossil-item:last-child { border-bottom:none; }
  .hae-fossil-dot { min-width:6px; height:6px; border-radius:50%; background:var(--gold); margin-top:7px; flex-shrink:0; }
  .hae-fossil-item strong { color:var(--gold-mid); font-weight:600; }

  /* ═══ EYE EVOLUTION STRIP ═══ */
  .hae-eye-strip { display:flex; gap:0; border:1.5px solid var(--rule); border-radius:12px; overflow:hidden; margin-bottom:24px; flex-wrap:wrap; }
  .hae-eye-step { flex:1; min-width:120px; padding:16px 14px; text-align:center; border-right:1px solid var(--rule); background:var(--white); }
  .hae-eye-step:last-child { border-right:none; }
  .hae-eye-icon { font-size:24px; display:block; margin-bottom:8px; }
  .hae-eye-name { font-family:'Playfair Display',serif; font-size:13px; font-weight:700; color:var(--ink); margin-bottom:3px; }
  .hae-eye-org  { font-size:11px; font-weight:700; color:var(--gold); margin-bottom:4px; }
  .hae-eye-desc { font-size:11px; color:var(--muted); line-height:1.4; }

  /* ═══ TRAITS COMPARE ═══ */
  .hae-traits-compare { display:grid; grid-template-columns:1fr 1fr; gap:0; border:1.5px solid var(--rule); border-radius:12px; overflow:hidden; margin-bottom:28px; }
  @media(max-width:600px){.hae-traits-compare{grid-template-columns:1fr;}}
  .hae-tc-col { padding:22px 22px 26px; display:flex; flex-direction:column; }
  .hae-tc-col.acquired  { background:linear-gradient(160deg,#0e0606,#1e0a0a); }
  .hae-tc-col.inherited { background:var(--white); border-left:2px solid var(--rule); }
  .hae-tc-badge { display:inline-block; padding:4px 14px; border-radius:100px; margin-bottom:12px; font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; }
  .acquired  .hae-tc-badge { background:rgba(153,27,27,0.25); color:var(--red-mid); }
  .inherited .hae-tc-badge { background:var(--green-lt); color:var(--green); }
  .hae-tc-title { font-family:'Playfair Display',serif; font-size:20px; font-weight:800; margin-bottom:6px; }
  .acquired  .hae-tc-title { color:var(--red-mid); }
  .inherited .hae-tc-title { color:var(--ink); }
  .hae-tc-def { font-size:13.5px; line-height:1.7; margin-bottom:14px; }
  .acquired  .hae-tc-def { color:rgba(255,255,255,0.6); }
  .inherited .hae-tc-def { color:var(--muted); }
  .hae-tc-list { display:flex; flex-direction:column; gap:8px; flex:1; }
  .hae-tc-item { display:flex; gap:9px; font-size:14px; line-height:1.65; align-items:flex-start; }
  .acquired  .hae-tc-item { color:rgba(255,255,255,0.72); }
  .inherited .hae-tc-item { color:var(--ink2); }
  .hae-tc-dot { min-width:6px; height:6px; border-radius:50%; margin-top:8px; flex-shrink:0; }
  .acquired  .hae-tc-dot { background:var(--red-mid); }
  .inherited .hae-tc-dot { background:var(--green); }
  .hae-tc-item strong { font-weight:600; }
  .acquired  .hae-tc-item strong { color:var(--red-mid); }
  .inherited .hae-tc-item strong { color:var(--green); }
  @media(max-width:600px){.inherited{border-left:none;border-top:2px solid var(--rule);}}

  /* ═══ SPECIATION DARK CARD ═══ */
  .hae-speciation-card {
    background:var(--navy2); border-radius:12px; padding:24px 28px; margin-bottom:24px;
    border:1px solid rgba(200,150,10,0.2); display:flex; gap:20px; align-items:flex-start; flex-wrap:wrap;
  }
  .hae-spec-icon { font-size:36px; flex-shrink:0; }
  .hae-spec-content {}
  .hae-spec-tag { font-size:10px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:rgba(249,216,74,0.6); background:rgba(200,150,10,0.1); padding:3px 10px; border-radius:100px; display:inline-block; margin-bottom:8px; }
  .hae-spec-title { font-family:'Playfair Display',serif; font-size:17px; font-weight:900; color:var(--gold-mid); margin-bottom:8px; }
  .hae-spec-text  { font-size:14px; color:rgba(255,255,255,0.65); line-height:1.75; }
  .hae-spec-text strong { color:var(--gold-mid); }

  /* ═══ FAQ ═══ */
  .hae-faq-header { margin-bottom:12px; }
  .hae-faq-kicker { font-size:11px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:var(--gold); background:var(--gold-lt); padding:6px 18px; border-radius:100px; }
  .hae-faq-title { font-family:'Playfair Display',serif; font-size:clamp(26px,4vw,36px); font-weight:900; color:var(--ink); letter-spacing:-0.02em; margin:16px 0 28px; }
  .hae-faq-item { border:1.5px solid var(--rule); border-radius:8px; margin-bottom:12px; overflow:hidden; background:var(--white); transition:border-color 0.2s; }
  .hae-faq-item.open { border-color:var(--gold); }
  .hae-faq-q { width:100%; background:none; border:none; cursor:pointer; display:flex; justify-content:space-between; align-items:center; padding:20px 24px; text-align:left; gap:16px; }
  .hae-faq-q-text { font-family:'DM Sans',sans-serif; font-size:15px; font-weight:600; color:var(--ink); line-height:1.5; }
  .hae-faq-item.open .hae-faq-q-text { color:var(--gold2); }
  .hae-faq-icon { font-family:'Playfair Display',serif; font-size:22px; font-weight:800; color:var(--gold); flex-shrink:0; transition:transform 0.2s; }
  .hae-faq-item.open .hae-faq-icon { transform:rotate(45deg); }
  .hae-faq-ans { font-size:14.5px; color:var(--ink2); line-height:1.85; padding:0 24px; max-height:0; overflow:hidden; transition:max-height 0.35s ease,padding 0.35s ease; }
  .hae-faq-ans.visible { max-height:1000px; padding:0 24px 22px; }
  .hae-faq-ans strong { color:var(--navy); font-weight:600; }
  .hae-faq-ans code { font-family:'DM Sans',sans-serif; font-size:13px; background:var(--gold-lt); padding:1px 6px; border-radius:3px; color:var(--gold2); }

  @media(max-width:700px){
    .hae-body{padding:48px 18px 72px;}
    .hae-sec-num{font-size:60px;}
  }
`;

const faqs = [
  {
    q: "What is heredity? What is the difference between acquired and inherited traits?",
    a: (<><strong>Heredity</strong> is the transmission of characteristics or traits from parents to offspring through DNA.<br/><br/>
      <strong>Acquired traits:</strong><br/>
      • Traits an individual develops during their lifetime (e.g., a scar from injury, a developed muscle from exercise)<br/>
      • Involves changes in non-reproductive (somatic) tissues<br/>
      • <strong>Cannot be passed on to progeny</strong> — not encoded in DNA<br/><br/>
      <strong>Inherited traits:</strong><br/>
      • Traits received from ancestors; encoded in DNA<br/>
      • Involves changes in DNA or reproductive tissues<br/>
      • <strong>Transmitted to offspring</strong> through gametes<br/>
      • Examples: eye colour, blood group, height<br/><br/>
      <strong>Variations</strong> are differences among individuals of a species. They can be <strong>heritable</strong> (genetic, passed to offspring) or <strong>non-heritable</strong> (acquired during lifetime).</>),
  },
  {
    q: "Who was Gregor Mendel? What did he discover?",
    a: (<>Gregor Mendel (1822–1884) was an Austrian monk who is called the <strong>Father of Genetics</strong>. He conducted experiments on <strong>Pisum sativum (garden pea)</strong> and proposed that heredity is controlled by discrete units called <strong>factors</strong> (now called <strong>genes</strong>).<br/><br/>
      <strong>Why pea plants?</strong><br/>
      • Easy to grow and have short generation time<br/>
      • Have clearly contrasting traits (tall/dwarf, round/wrinkled seeds, etc.)<br/>
      • Can be self-pollinated or cross-pollinated easily<br/>
      • Used <strong>7 pairs of contrasting characters</strong><br/><br/>
      <strong>Key terms introduced by Mendel:</strong><br/>
      • <strong>Dominant</strong> — trait that expresses itself (e.g., T = Tall)<br/>
      • <strong>Recessive</strong> — trait masked by dominant (e.g., t = dwarf)<br/>
      • <strong>Homozygous</strong> — both factors same (TT or tt)<br/>
      • <strong>Heterozygous</strong> — factors different (Tt)</>),
  },
  {
    q: "Explain the monohybrid cross. What ratios are obtained?",
    a: (<><strong>Monohybrid cross</strong> involves only one pair of contrasting characters.<br/><br/>
      <strong>Example — Tall (TT) × Dwarf (tt):</strong><br/><br/>
      <strong>F1 generation:</strong> All plants are Tt (heterozygous tall). Only tall phenotype visible — dominant trait expressed.<br/><br/>
      <strong>F2 generation</strong> (self-pollination of F1 Tt × Tt):<br/>
      • TT (pure tall) — 1<br/>
      • Tt (hybrid tall) — 2<br/>
      • tt (pure dwarf) — 1<br/><br/>
      <strong>Phenotypic ratio: 3 Tall : 1 Dwarf = 3:1</strong><br/>
      <strong>Genotypic ratio: 1 TT : 2 Tt : 1 tt = 1:2:1</strong><br/><br/>
      <strong>Laws derived from monohybrid cross:</strong><br/>
      1. <strong>Law of Dominance</strong> — only one trait expressed in F1; both in F2<br/>
      2. <strong>Law of Segregation</strong> — two alleles separate during gamete formation</>),
  },
  {
    q: "What is a dihybrid cross? What is the Law of Independent Assortment?",
    a: (<><strong>Dihybrid cross</strong> involves two pairs of contrasting characters.<br/><br/>
      <strong>Example:</strong> Round Yellow seeds (RRYY) × Wrinkled Green seeds (rryy)<br/><br/>
      <strong>F1:</strong> All RrYy — Round Yellow (both dominant traits expressed)<br/><br/>
      <strong>F2 phenotypic ratio: 9 : 3 : 3 : 1</strong><br/>
      • 9 Round Yellow<br/>
      • 3 Round Green<br/>
      • 3 Wrinkled Yellow<br/>
      • 1 Wrinkled Green<br/><br/>
      <strong>Law of Independent Assortment:</strong> Members of different pairs of alleles assort independently into gametes. This means the inheritance of one trait does not affect the inheritance of another (for genes on different chromosomes).</>),
  },
  {
    q: "What is incomplete dominance? What is co-dominance?",
    a: (<><strong>Incomplete Dominance:</strong><br/>
      One allele is not completely dominant over the other. The heterozygote shows an intermediate phenotype.<br/>
      Example: Snapdragon flower — Red (RR) × White (rr) → Pink (Rr) in F1<br/>
      F2: 1 Red : 2 Pink : 1 White<br/>
      <strong>Both phenotypic and genotypic ratios are 1:2:1</strong><br/><br/>
      <strong>Co-dominance:</strong><br/>
      Both alleles are equally dominant and expressed simultaneously in heterozygous condition.<br/>
      Example: <strong>ABO blood group in humans</strong><br/>
      • Blood group AB — both Iᴬ and Iᴮ alleles expressed together<br/>
      • ABO blood group is also an example of <strong>multiple alleles</strong> (3 alleles: Iᴬ, Iᴮ, i control one trait)<br/><br/>
      <strong>Key difference:</strong> Incomplete dominance → blended intermediate; Co-dominance → both expressed distinctly</>),
  },
  {
    q: "How is sex determined in humans?",
    a: (<><strong>Chromosomal basis of sex determination:</strong><br/><br/>
      Humans have 46 chromosomes = 22 pairs of autosomes + 1 pair of sex chromosomes<br/><br/>
      • <strong>Females: 44 + XX</strong> — two X chromosomes<br/>
      • <strong>Males: 44 + XY</strong> — one X and one Y chromosome<br/><br/>
      <strong>How sex of baby is determined:</strong><br/>
      • Female produces only one type of gamete: <strong>22 + X</strong><br/>
      • Male produces two types of gametes: <strong>22 + X</strong> or <strong>22 + Y</strong><br/><br/>
      • If 22+X sperm fertilises egg (22+X) → <strong>44+XX = Girl</strong><br/>
      • If 22+Y sperm fertilises egg (22+X) → <strong>44+XY = Boy</strong><br/><br/>
      <strong>Sex of the baby is determined by the father's gamete</strong> (X or Y sperm) — NOT the mother. Therefore, blaming the mother for the sex of a child has no scientific basis.</>),
  },
  {
    q: "What are homologous and analogous organs? Give examples.",
    a: (<><strong>Homologous organs:</strong><br/>
      Organs that are similar in <strong>structure and origin</strong> (same evolutionary origin) but perform <strong>different functions</strong> in different organisms.<br/>
      • Same basic bone structure (humerus, radius, ulna, carpals)<br/>
      • Examples: Forelimb of human (grasping), whale (swimming), bat (flying), horse (running)<br/>
      • Evidence of <strong>divergent evolution</strong> — common ancestor, different adaptations<br/><br/>
      <strong>Analogous organs:</strong><br/>
      Organs that perform <strong>similar functions</strong> but have <strong>different structures and origins</strong>.<br/>
      • Examples: Wings of a bird vs wings of an insect; eyes of octopus vs eyes of vertebrates<br/>
      • Evidence of <strong>convergent evolution</strong> — different ancestors, similar environmental pressures<br/><br/>
      <strong>Memory tip:</strong> Homo = same structure; Analog = same function</>),
  },
  {
    q: "What are fossils? How are they formed? What is their importance?",
    a: (<><strong>Fossils</strong> are preserved remains or impressions of organisms that once existed on Earth.<br/>
      The science of studying fossils is called <strong>Palaeontology</strong>.<br/><br/>
      <strong>Formation of fossils:</strong><br/>
      1. Organism dies and soft parts decay; hard parts (bones, shells) remain<br/>
      2. Hard parts get buried under sediments of sand<br/>
      3. Sediment layers accumulate over millions of years<br/>
      4. Hard parts absorb minerals from surroundings → become mineralised<br/>
      5. Sedimentary rock forms around them → fossils preserved in rock layers<br/><br/>
      <strong>Importance of fossils:</strong><br/>
      1. Tell us about types of life forms that existed in the past<br/>
      2. Show how living things have changed over time (evolutionary evidence)<br/>
      3. Indicate the time period when a life form existed (via radioactive dating)<br/>
      4. Provide evidence for evolutionary relationships between species</>),
  },
  {
    q: "What are the causes of evolution?",
    a: (<><strong>1. Natural Selection (Darwin's theory):</strong><br/>
      Process where individuals better adapted to their environment survive and reproduce more successfully. Traits that improve survival are passed on; unfavourable traits are eliminated over time.<br/><br/>
      <strong>2. Genetic Drift:</strong><br/>
      Accidental/random change in the frequency of alleles in a <strong>small population</strong>. Not driven by adaptation — purely by chance. Can cause traits to become common or disappear regardless of their usefulness.<br/><br/>
      <strong>3. Geographical Isolation:</strong><br/>
      When two sub-populations of the same species are separated by a geographical barrier (river, mountain, ocean), they cannot interbreed. They accumulate different mutations and adaptations over generations → eventually become different species (<strong>speciation</strong>).<br/><br/>
      <strong>Speciation</strong> = formation of new species from existing ones through accumulated changes.</>),
  },
  {
    q: "What is the relationship between evolution and classification?",
    a: (<>Evolution and classification are closely interlinked:<br/><br/>
      • <strong>Classification</strong> is based on shared characteristics<br/>
      • The more characteristics two species share, the more closely they are related<br/>
      • Species with recent common ancestors share more characteristics<br/>
      • We can group species → supergroups with more distant common ancestors<br/><br/>
      <strong>Key principle:</strong> More shared characteristics = more recent common ancestor = closer evolutionary relationship<br/><br/>
      Example: Chimpanzees share ~98.7% of DNA with humans — they are our closest living relatives. Both descended from a common ancestor.<br/><br/>
      <strong>Evolution of eye (example of increasing complexity):</strong><br/>
      1. Simple photosensitive eyespot (flatworms)<br/>
      2. Pit eyes — light/dark discrimination (nautilus)<br/>
      3. Compound eyes — thousands of units (insects)<br/>
      4. Highly complex camera-type eye (humans)</>),
  },
  {
    q: "What does 'evolution is not always progress' mean? What is the origin of humans?",
    a: (<><strong>Evolution ≠ Progress:</strong><br/>
      Evolution simply creates more complex body designs — but simpler body designs are NOT inefficient or inferior.<br/>
      • <strong>Bacteria</strong> have the simplest body design yet are the most numerous organisms on Earth<br/>
      • Humans are only <strong>one branch</strong> of evolution — NOT the "highest" or "most evolved" species<br/>
      • Every surviving species is equally "evolved" for its own niche<br/><br/>
      <strong>Human origin:</strong><br/>
      • All modern humans belong to a single species: <strong>Homo sapiens</strong><br/>
      • We <strong>all come from Africa</strong> — modern humans originated in Africa ~200,000 years ago<br/>
      • Some ancestors migrated out of Africa; others stayed<br/>
      • Migrants gradually spread across the entire planet<br/>
      • <strong>There is no biological basis for "human races"</strong> — all humans are one species with minor surface variations</>),
  },
];

export default function HeredityAndEvolution() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="hae-root">

        {/* ══════ HERO ══════ */}
        <div className="hae-hero">
          <div className="hae-hero-grid" />
          <div className="hae-glow-1" />
          <div className="hae-glow-2" />
          <div className="hae-glow-3" />

          {/* DNA double helix SVG */}
          <svg className="hae-hero-dna" viewBox="0 0 400 700" xmlns="http://www.w3.org/2000/svg">
            {/* Left strand */}
            <path d={`M 80 ${Array.from({length:14},(_,i)=>i).map(i=>`${80+60*Math.sin(i*50*Math.PI/180)} ${50+i*44}`).join(' L ')}`}
              stroke="rgba(200,150,10,0.5)" strokeWidth="3" fill="none" strokeLinecap="round"/>
            {/* Right strand */}
            <path d={`M 320 ${Array.from({length:14},(_,i)=>i).map(i=>`${320-60*Math.sin(i*50*Math.PI/180)} ${50+i*44}`).join(' L ')}`}
              stroke="rgba(14,116,144,0.5)" strokeWidth="3" fill="none" strokeLinecap="round"/>
            {/* Base pairs (rungs) */}
            {Array.from({length:12},(_,i) => {
              const y = 72 + i*50;
              const xL = 80 + 60*Math.sin((i+0.5)*50*Math.PI/180);
              const xR = 320 - 60*Math.sin((i+0.5)*50*Math.PI/180);
              const colors = ["rgba(200,150,10,0.5)","rgba(14,116,144,0.5)","rgba(107,33,168,0.4)","rgba(22,101,52,0.5)"];
              return (
                <g key={i}>
                  <line x1={xL} y1={y} x2={(xL+xR)/2-8} y2={y} stroke={colors[i%4]} strokeWidth="2.5" strokeLinecap="round"/>
                  <line x1={(xL+xR)/2+8} y1={y} x2={xR} y2={y} stroke={colors[(i+2)%4]} strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx={(xL+xR)/2-8} cy={y} r="5" fill={colors[i%4]}/>
                  <circle cx={(xL+xR)/2+8} cy={y} r="5" fill={colors[(i+2)%4]}/>
                </g>
              );
            })}
            {/* Node dots on strands */}
            {Array.from({length:14},(_,i) => {
              const y = 50+i*44;
              const xL = 80+60*Math.sin(i*50*Math.PI/180);
              const xR = 320-60*Math.sin(i*50*Math.PI/180);
              return (
                <g key={i}>
                  <circle cx={xL} cy={y} r="5" fill="rgba(200,150,10,0.7)"/>
                  <circle cx={xR} cy={y} r="5" fill="rgba(14,116,144,0.7)"/>
                </g>
              );
            })}
            <text x="120" y="660" fontSize="13" fontFamily="DM Sans,sans-serif" fontWeight="700" fill="rgba(200,150,10,0.4)" letterSpacing="3">DNA Double Helix</text>
          </svg>

          <div className="hae-hero-inner">
            <div className="hae-subject-pill">
              <div className="hae-pill-dot" />
              Biology · Class 10 · Chapter 4
            </div>
            <div className="hae-hero-eyebrow">Science — CBSE / NCERT</div>
            <h1 className="hae-hero-title">
              <span className="t1">Heredity</span>
              <span className="t2">&amp; Evolution</span>
              <span className="t3">Mendel · Genetics · DNA · Natural Selection · Fossils</span>
            </h1>
            <p className="hae-hero-desc">
              Why do children resemble their parents? How did the diversity of life arise? From Mendel's pea plant experiments to Darwin's natural selection — this chapter unlocks the science of inheritance and the story of life's transformation over billions of years.
            </p>
            <div className="hae-hero-stats">
              {[
                { num:"7",    label:"Mendel's contrasting pairs" },
                { num:"3:1",  label:"Monohybrid F2 ratio" },
                { num:"9:3:3:1", label:"Dihybrid F2 ratio" },
                { num:"46",   label:"Human chromosomes" },
              ].map(s => (
                <div className="hae-hero-stat" key={s.label}>
                  <div className="hae-stat-num">{s.num}</div>
                  <div className="hae-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hae-body">

          {/* Intro */}
          <div className="hae-intro">
            <div>
              <div className="hae-intro-kicker">Chapter Overview</div>
              <h2 className="hae-intro-headline">Why You Look Like <em>Your Parents</em></h2>
              <p className="hae-intro-body"><strong>Heredity</strong> is the transmission of traits from parents to offspring through DNA. <strong>Evolution</strong> explains how populations change over generations through natural selection, genetic drift, and geographical isolation.</p>
              <p className="hae-intro-body">This chapter covers Mendel's laws of inheritance, sex determination, speciation, fossils, and the evolutionary origin of humans — connecting genetics to the grand story of life on Earth.</p>
            </div>
            <div className="hae-intro-sidebar">
              <div className="hae-sidebar-label">Topics in this chapter</div>
              <div className="hae-sidebar-title">Heredity &amp; Evolution</div>
              <ul className="hae-sidebar-list">
                {[
                  ["1","Heredity — DNA, Traits, Variations"],
                  ["2","Mendel's Experiments & Laws"],
                  ["3","Monohybrid & Dihybrid Crosses"],
                  ["4","Incomplete Dominance & Codominance"],
                  ["5","Sex Determination in Humans"],
                  ["6","Causes of Evolution"],
                  ["7","Fossils, Homologous & Analogous Organs"],
                ].map(([n,t])=>(
                  <li className="hae-sidebar-item" key={n}>
                    <span className="hae-sidebar-num">{n}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ══ CH 1: HEREDITY & TRAITS ══ */}
          <div className="hae-chapter-divider">
            <div className="hae-ch-badge"><span className="hae-ch-num">01</span>Heredity &amp; Traits</div>
          </div>
          <div className="hae-sec-head">
            <span className="hae-sec-num">1</span>
            <div className="hae-sec-kicker">Inheritance</div>
            <h2 className="hae-sec-title">Acquired vs <span>Inherited Traits</span></h2>
          </div>
          <p className="hae-body-text"><strong>Heredity</strong> is the transmission of characteristics from parents to offspring. <strong>Variations</strong> are differences among individuals of a species. Basis of heredity: each trait is influenced by both maternal and paternal DNA.</p>

          <div className="hae-traits-compare">
            <div className="hae-tc-col acquired">
              <span className="hae-tc-badge">Not Heritable</span>
              <div className="hae-tc-title">Acquired Traits</div>
              <div className="hae-tc-def">Traits developed during an individual's lifetime due to environment or experience. NOT passed to offspring.</div>
              <div className="hae-tc-list">
                {[
                  <><strong>Changes in non-reproductive</strong> (somatic) tissue only</>,
                  "Cannot be passed on to progeny",
                  <><strong>Examples:</strong> scar from injury, developed muscles, tanned skin</>,
                  "Not encoded in DNA of gametes",
                  "Lost when the individual dies",
                ].map((t,i)=>(<div className="hae-tc-item" key={i}><span className="hae-tc-dot"/><span>{t}</span></div>))}
              </div>
            </div>
            <div className="hae-tc-col inherited">
              <span className="hae-tc-badge">Heritable</span>
              <div className="hae-tc-title">Inherited Traits</div>
              <div className="hae-tc-def">Traits encoded in DNA and transmitted from parents to offspring through gametes (reproductive cells).</div>
              <div className="hae-tc-list">
                {[
                  <><strong>Changes in DNA or reproductive tissue</strong></>,
                  "Transmitted to progeny through gametes",
                  <><strong>Examples:</strong> eye colour, blood group, height, ear lobe shape</>,
                  "Basis of heredity — present in every cell of offspring",
                  "Can show variation due to sexual reproduction mixing DNA",
                ].map((t,i)=>(<div className="hae-tc-item" key={i}><span className="hae-tc-dot"/><span>{t}</span></div>))}
              </div>
            </div>
          </div>

          {/* Key terms */}
          <div className="hae-terms-grid">
            {[
              { name:"Dominant Trait",    eg:'e.g., T = Tallness',       def:"Trait that expresses itself over another contrasting trait. Written in upper case." },
              { name:"Recessive Trait",   eg:'e.g., t = shortness',      def:"Trait that cannot express in presence of dominant. Written in lower case." },
              { name:"Homozygous",        eg:'e.g., TT or tt',           def:"Both factors/alleles for a trait are the same (pure breeding)." },
              { name:"Heterozygous",      eg:'e.g., Tt',                 def:"Two different alleles for a trait are present (hybrid)." },
              { name:"Genotype",          eg:'e.g., TT, Tt, tt',         def:"Genetic constitution of an organism — the actual allele combination." },
              { name:"Phenotype",         eg:'e.g., Tall, dwarf',        def:"Observable physical traits or characteristics of an organism." },
              { name:"Genotypic Ratio",   eg:'1:2:1 in F2',              def:"Expected ratio of genotypes produced by a particular cross." },
              { name:"Phenotypic Ratio",  eg:'3:1 in monohybrid',        def:"Expected ratio of phenotypes produced by a particular cross." },
              { name:"Alleles",           eg:'T and t',                  def:"Alternative forms of the same gene occupying the same locus on homologous chromosomes." },
            ].map(t=>(
              <div className="hae-term-card" key={t.name}>
                <div className="hae-term-name">{t.name}</div>
                <div className="hae-term-eg">{t.eg}</div>
                <div className="hae-term-def">{t.def}</div>
              </div>
            ))}
          </div>

          {/* ══ CH 2: MENDEL'S EXPERIMENTS ══ */}
          <div className="hae-chapter-divider">
            <div className="hae-ch-badge"><span className="hae-ch-num">02</span>Mendel's Experiments</div>
          </div>
          <div className="hae-sec-head">
            <span className="hae-sec-num">2</span>
            <div className="hae-sec-kicker">Garden Pea Experiments</div>
            <h2 className="hae-sec-title">Mendel's Work <span>&amp; Laws</span></h2>
          </div>
          <p className="hae-body-text">Gregor Mendel performed experiments on <strong>Pisum sativum</strong> (garden pea) using 7 contrasting pairs of characters. He proposed that heredity is controlled by discrete units called <strong>factors</strong> — now known as <strong>genes</strong>.</p>

          {/* Experiment timeline */}
          <div className="hae-mendel-timeline">
            <div className="hae-mt-header">
              <span style={{fontSize:"18px"}}>🧪</span>
              <div className="hae-mt-title">Stages of Mendel's Monohybrid Experiment</div>
              <div className="hae-mt-sub">Tall (TT) × Dwarf (tt)</div>
            </div>
            <div className="hae-mt-body">
              <div className="hae-mt-steps">
                {[
                  { emoji:"🌱", stage:"Selection of Parents", detail:<>Selected <strong>true-breeding</strong> plants with contrasting traits. Pure tall (TT) and pure dwarf (tt) pea plants. True-breeding = same phenotype for many generations.</> },
                  { emoji:"🤝", stage:"Cross-Pollination → F1 Generation", detail:<>Crossed TT × tt. All F1 offspring were <strong>heterozygous tall (Tt)</strong>. Only the dominant trait (tallness) was visible. Recessive trait (dwarfism) was hidden but not lost.</> },
                  { emoji:"🔄", stage:"Self-Pollination of F1 → F2 Generation", detail:<>F1 plants (Tt) were self-pollinated. F2 generation gave ratio: <strong>3 Tall : 1 Dwarf</strong>. Phenotypic ratio = 3:1. Genotypic ratio = 1 TT : 2 Tt : 1 tt = 1:2:1.</> },
                  { emoji:"🌾", stage:"Dihybrid Cross", detail:<>Crossed Round Yellow (RRYY) × Wrinkled Green (rryy). F1: all RrYy (Round Yellow). F2 phenotypic ratio: <strong>9 Round Yellow : 3 Round Green : 3 Wrinkled Yellow : 1 Wrinkled Green = 9:3:3:1</strong>.</> },
                ].map((s,i)=>(
                  <div className="hae-mt-step" key={i}>
                    <div className="hae-mt-left">
                      <div className="hae-mt-circle">{s.emoji}</div>
                      <div className="hae-mt-line"/>
                    </div>
                    <div className="hae-mt-content">
                      <div className="hae-mt-stage">{s.stage}</div>
                      <div className="hae-mt-detail">{s.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Punnett squares */}
          <div className="hae-punnett-layout">
            <div className="hae-punnett-card">
              <div className="hae-punnett-label mono">Monohybrid Cross — Tt × Tt</div>
              <div className="hae-punnett-wrap">
                <table className="hae-punnett-table">
                  <tbody>
                    <tr>
                      <td className="header-cell"></td>
                      <td className="header-cell">T</td>
                      <td className="header-cell">t</td>
                    </tr>
                    <tr>
                      <td className="header-cell">T</td>
                      <td className="dominant">TT</td>
                      <td className="hetero">Tt</td>
                    </tr>
                    <tr>
                      <td className="header-cell">t</td>
                      <td className="hetero">Tt</td>
                      <td className="recessive">tt</td>
                    </tr>
                  </tbody>
                </table>
                <div className="hae-punnett-ratio">
                  Phenotypic ratio: <div className="hae-ratio-badge">3 Tall : 1 Dwarf</div>
                  Genotypic ratio: 1 TT : 2 Tt : 1 tt<br/>
                  <strong>3:1 phenotype · 1:2:1 genotype</strong>
                </div>
              </div>
            </div>
            <div className="hae-punnett-card">
              <div className="hae-punnett-label di">Incomplete Dominance — Rr × Rr</div>
              <div className="hae-punnett-wrap">
                <table className="hae-punnett-table">
                  <tbody>
                    <tr>
                      <td className="header-cell"></td>
                      <td className="header-cell">R</td>
                      <td className="header-cell">r</td>
                    </tr>
                    <tr>
                      <td className="header-cell">R</td>
                      <td className="dominant">RR</td>
                      <td className="hetero">Rr</td>
                    </tr>
                    <tr>
                      <td className="header-cell">r</td>
                      <td className="hetero">Rr</td>
                      <td className="recessive">rr</td>
                    </tr>
                  </tbody>
                </table>
                <div className="hae-punnett-ratio">
                  Phenotypic ratio: <div className="hae-ratio-badge" style={{background:"var(--teal)",color:"#fff"}}>1 Red : 2 Pink : 1 White</div>
                  Both phenotypic &amp; genotypic ratios = <strong>1:2:1</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Mendel's Laws */}
          <div className="hae-laws-grid">
            <div className="hae-law-card">
              <div className="hae-law-hdr dom">
                <div className="hae-law-num">First Law</div>
                <div className="hae-law-name">Law of Dominance</div>
              </div>
              <div className="hae-law-body">
                {[
                  <><strong>Only one</strong> parental trait (dominant) gets expressed in F1 generation</>,
                  "Both dominant and recessive traits get expressed in F2 generation",
                  <><strong>Recessive trait</strong> is not lost — just masked by dominant in F1</>,
                  "Based on observations of monohybrid cross",
                ].map((t,i)=>(<div className="hae-law-item" key={i}><span className="hae-law-dot dom-dot"/><span>{t}</span></div>))}
              </div>
            </div>
            <div className="hae-law-card">
              <div className="hae-law-hdr seg">
                <div className="hae-law-num">Second Law</div>
                <div className="hae-law-name">Law of Segregation</div>
              </div>
              <div className="hae-law-body">
                {[
                  "Two alleles for a trait segregate from each other during gamete formation",
                  <><strong>Each gamete</strong> receives only one allele of each gene pair</>,
                  "Alleles reunite at fertilisation",
                  "Also called Law of Purity of Gametes",
                ].map((t,i)=>(<div className="hae-law-item" key={i}><span className="hae-law-dot seg-dot"/><span>{t}</span></div>))}
              </div>
            </div>
            <div className="hae-law-card">
              <div className="hae-law-hdr ind">
                <div className="hae-law-num">Third Law</div>
                <div className="hae-law-name">Law of Independent Assortment</div>
              </div>
              <div className="hae-law-body">
                {[
                  "Members of different pairs of alleles assort independently into gametes",
                  "One trait's inheritance does not affect another's",
                  "Based on dihybrid cross observations",
                  <><strong>Gives 9:3:3:1</strong> phenotypic ratio in dihybrid F2</>,
                ].map((t,i)=>(<div className="hae-law-item" key={i}><span className="hae-law-dot ind-dot"/><span>{t}</span></div>))}
              </div>
            </div>
          </div>

          {/* ══ CH 3: DOMINANCE TYPES ══ */}
          <div className="hae-chapter-divider">
            <div className="hae-ch-badge"><span className="hae-ch-num">03</span>Types of Dominance</div>
          </div>
          <div className="hae-sec-head">
            <span className="hae-sec-num">3</span>
            <div className="hae-sec-kicker">Beyond Simple Dominance</div>
            <h2 className="hae-sec-title">Complete, Incomplete <span>&amp; Co-dominance</span></h2>
          </div>

          <div className="hae-dominance-grid">
            <div className="hae-dom-card">
              <div className="hae-dom-hdr complete">
                <div className="hae-dom-tag">Type 1</div>
                <div className="hae-dom-name">Complete Dominance</div>
              </div>
              <div className="hae-dom-body">
                {[
                  <><strong>One allele completely masks</strong> the other in heterozygous condition</>,
                  "Phenotypic ratio in F2: 3:1",
                  "Genotypic ratio in F2: 1:2:1",
                  <><strong>Example:</strong> Tall (T) dominant over Dwarf (t) in pea plant</>,
                ].map((t,i)=>(<div className="hae-dom-item" key={i}><span className="hae-dom-dot complete-dot"/><span>{t}</span></div>))}
              </div>
            </div>
            <div className="hae-dom-card">
              <div className="hae-dom-hdr incomplete">
                <div className="hae-dom-tag">Type 2</div>
                <div className="hae-dom-name">Incomplete Dominance</div>
              </div>
              <div className="hae-dom-body">
                {[
                  <><strong>Neither allele completely dominant</strong> — intermediate phenotype in Rr</>,
                  "Both phenotypic and genotypic ratios = 1:2:1",
                  <><strong>Example:</strong> Snapdragon — Red (RR) × White (rr) → Pink (Rr)</>,
                  "Pink flowers in F1; 1 Red : 2 Pink : 1 White in F2",
                ].map((t,i)=>(<div className="hae-dom-item" key={i}><span className="hae-dom-dot incomplete-dot"/><span>{t}</span></div>))}
              </div>
            </div>
            <div className="hae-dom-card">
              <div className="hae-dom-hdr codominant">
                <div className="hae-dom-tag">Type 3</div>
                <div className="hae-dom-name">Co-dominance</div>
              </div>
              <div className="hae-dom-body">
                {[
                  <><strong>Both alleles equally dominant</strong> — both expressed together in heterozygote</>,
                  <><strong>Example:</strong> ABO blood group in humans</>,
                  "Blood group AB — both Iᴬ and Iᴮ expressed simultaneously",
                  <><strong>Multiple alleles</strong> — ABO controlled by 3 alleles: Iᴬ, Iᴮ, i</>,
                ].map((t,i)=>(<div className="hae-dom-item" key={i}><span className="hae-dom-dot codominant-dot"/><span>{t}</span></div>))}
              </div>
            </div>
          </div>

          {/* ══ CH 4: SEX DETERMINATION ══ */}
          <div className="hae-chapter-divider">
            <div className="hae-ch-badge"><span className="hae-ch-num">04</span>Sex Determination</div>
          </div>
          <div className="hae-sec-head">
            <span className="hae-sec-num">4</span>
            <div className="hae-sec-kicker">Chromosomal Basis</div>
            <h2 className="hae-sec-title">Sex Determination <span>in Humans</span></h2>
          </div>
          <p className="hae-body-text">Humans have <strong>46 chromosomes</strong> — 22 pairs of <strong>autosomes</strong> (non-sex chromosomes) + 1 pair of <strong>sex chromosomes</strong> (X and Y).</p>

          <div className="hae-sex-det">
            <div className="hae-sex-label">🧬 Chromosomal Sex Determination</div>
            <div className="hae-sex-grid">
              <div className="hae-sex-parent female">
                <div className="hae-sex-parent-label">Mother (Female)</div>
                <div className="hae-sex-chrom">XX</div>
                <div className="hae-sex-formula">44 + XX</div>
              </div>
              <div className="hae-sex-cross">×</div>
              <div className="hae-sex-parent male">
                <div className="hae-sex-parent-label">Father (Male)</div>
                <div className="hae-sex-chrom">XY</div>
                <div className="hae-sex-formula">44 + XY</div>
              </div>
            </div>
            <div style={{fontSize:"13px",color:"rgba(255,255,255,0.5)",marginBottom:"14px",textAlign:"center"}}>
              Each parent contributes 23 chromosomes to the offspring ↓
            </div>
            <div style={{fontSize:"12px",color:"rgba(255,255,255,0.5)",marginBottom:"12px",textAlign:"center"}}>
              Mother always gives: <strong style={{color:"#f9a8d4"}}>22 + X</strong> &nbsp;|&nbsp; Father gives: <strong style={{color:"#93c5fd"}}>22 + X</strong> or <strong style={{color:"#93c5fd"}}>22 + Y</strong>
            </div>
            <div className="hae-sex-offspring">
              <div className="hae-sex-off-card girl">
                <div className="hae-sex-off-label">♀ Girl</div>
                <div className="hae-sex-off-chrom">XX</div>
                <div className="hae-sex-off-desc">22+X (from mother) + 22+X (from father) = 44+XX</div>
              </div>
              <div className="hae-sex-off-card boy">
                <div className="hae-sex-off-label">♂ Boy</div>
                <div className="hae-sex-off-chrom">XY</div>
                <div className="hae-sex-off-desc">22+X (from mother) + 22+Y (from father) = 44+XY</div>
              </div>
            </div>
            <div className="hae-sex-note">
              <strong>Key fact:</strong> Sex of the baby is determined by the <strong>type of male gamete (X or Y sperm)</strong> that fuses with the female gamete. The mother always contributes an X chromosome — she has no role in determining sex. Therefore, blaming the mother for the sex of a child is scientifically incorrect.
            </div>
          </div>

          {/* ══ CH 5: EVOLUTION ══ */}
          <div className="hae-chapter-divider">
            <div className="hae-ch-badge"><span className="hae-ch-num">05</span>Evolution</div>
          </div>
          <div className="hae-sec-head">
            <span className="hae-sec-num">5</span>
            <div className="hae-sec-kicker">How Species Change Over Time</div>
            <h2 className="hae-sec-title">Causes of <span>Evolution</span></h2>
          </div>
          <p className="hae-body-text"><strong>Evolution</strong> is the change in heritable characteristics of biological populations over successive generations. It leads to new species through accumulated changes. <strong>Speciation</strong> = formation of new species.</p>

          <div className="hae-evolution-grid">
            <div className="hae-evo-card">
              <div className="hae-evo-hdr natural">
                <span className="hae-evo-icon">🌿</span>
                <div className="hae-evo-name">Natural Selection</div>
              </div>
              <div className="hae-evo-body">
                {[
                  <><strong>Darwin's theory</strong> — survival of the fittest</>,
                  "Individuals better adapted to environment survive and reproduce more",
                  "Favourable traits increase in population frequency over generations",
                  "Unfavourable traits decrease and may be eliminated",
                  <><strong>Example:</strong> Antibiotic resistance in bacteria, dark moths on soot-covered trees</>,
                ].map((t,i)=>(<div className="hae-evo-item" key={i}><span className="hae-evo-dot natural-dot"/><span>{t}</span></div>))}
              </div>
            </div>
            <div className="hae-evo-card">
              <div className="hae-evo-hdr genetic">
                <span className="hae-evo-icon">🎲</span>
                <div className="hae-evo-name">Genetic Drift</div>
              </div>
              <div className="hae-evo-body">
                {[
                  <><strong>Accidental/random</strong> change in allele frequency in small populations</>,
                  "NOT driven by adaptation — purely by chance",
                  "Can cause beneficial traits to disappear, harmful traits to spread",
                  <><strong>Bottleneck effect</strong> — small population after disaster may not represent original gene pool</>,
                ].map((t,i)=>(<div className="hae-evo-item" key={i}><span className="hae-evo-dot genetic-dot"/><span>{t}</span></div>))}
              </div>
            </div>
            <div className="hae-evo-card">
              <div className="hae-evo-hdr geo">
                <span className="hae-evo-icon">🏔️</span>
                <div className="hae-evo-name">Geographical Isolation</div>
              </div>
              <div className="hae-evo-body">
                {[
                  "Physical barrier separates a population into two groups",
                  "Separated groups cannot interbreed",
                  "Each group accumulates different mutations and adaptations",
                  "Over many generations → become too different to interbreed = new species",
                  <><strong>Speciation</strong> — the formation of new distinct species</>,
                ].map((t,i)=>(<div className="hae-evo-item" key={i}><span className="hae-evo-dot geo-dot"/><span>{t}</span></div>))}
              </div>
            </div>
          </div>

          {/* ══ CH 6: EVIDENCE FOR EVOLUTION ══ */}
          <div className="hae-chapter-divider">
            <div className="hae-ch-badge"><span className="hae-ch-num">06</span>Evidence for Evolution</div>
          </div>
          <div className="hae-sec-head">
            <span className="hae-sec-num">6</span>
            <div className="hae-sec-kicker">Fossils · Organs · Classification</div>
            <h2 className="hae-sec-title">Homologous, Analogous <span>&amp; Fossils</span></h2>
          </div>

          {/* Homologous vs Analogous */}
          <div className="hae-organ-compare">
            <div className="hae-oc-col homo">
              <span className="hae-oc-badge">Divergent Evolution</span>
              <div className="hae-oc-title">Homologous Organs</div>
              <div className="hae-oc-def">Similar in <strong>structure and origin</strong> but perform different functions. Evidence of common ancestry.</div>
              <div className="hae-oc-list">
                {[
                  <><strong>Same basic bone structure</strong> — humerus, radius, ulna, carpals</>,
                  "Different functions in different organisms",
                  <><strong>Human arm</strong> (grasping) · <strong>Whale flipper</strong> (swimming)</>,
                  <><strong>Bat wing</strong> (flying) · <strong>Horse forelimb</strong> (running)</>,
                  "Shows divergent evolution from a common ancestor",
                  <><strong>Also called:</strong> Vestigial organs (e.g., human appendix, coccyx)</>,
                ].map((t,i)=>(<div className="hae-oc-item" key={i}><span className="hae-oc-dot"/><span>{t}</span></div>))}
              </div>
            </div>
            <div className="hae-oc-col analog">
              <span className="hae-oc-badge">Convergent Evolution</span>
              <div className="hae-oc-title">Analogous Organs</div>
              <div className="hae-oc-def">Similar in <strong>function</strong> but different in structure and origin. Different organisms evolved similar solutions.</div>
              <div className="hae-oc-list">
                {[
                  <><strong>Different structure and origin</strong> — not from same ancestor</>,
                  "Same function due to similar environmental pressures",
                  <><strong>Bird wing</strong> vs <strong>Insect wing</strong> — both for flying, totally different structure</>,
                  <><strong>Eye of octopus</strong> vs <strong>Eye of vertebrate</strong> — similar function, different origin</>,
                  "Shows convergent evolution — different lineages, similar adaptations",
                ].map((t,i)=>(<div className="hae-oc-item" key={i}><span className="hae-oc-dot"/><span>{t}</span></div>))}
              </div>
            </div>
          </div>

          {/* Fossils */}
          <div className="hae-fossil-card">
            <div className="hae-fossil-label">🦕 Fossils — Evidence from the Past</div>
            <div className="hae-fossil-grid">
              <div className="hae-fossil-section">
                <div className="hae-fossil-section-title">How Fossils Form</div>
                {[
                  "Organism dies; soft parts decay; hard parts (bones, shells) remain",
                  "Hard parts buried under sediments of sand",
                  "Sediment layers accumulate over millions of years",
                  "Hard parts absorb minerals → mineralised",
                  "Sedimentary rock forms → fossils preserved inside rock layers",
                ].map((t,i)=>(<div className="hae-fossil-item" key={i}><span className="hae-fossil-dot"/><span>{t}</span></div>))}
              </div>
              <div className="hae-fossil-section">
                <div className="hae-fossil-section-title">Importance of Fossils</div>
                {[
                  <><strong>Types of life</strong> that existed in the past</>,
                  <><strong>How organisms changed</strong> over time (evolutionary change)</>,
                  <><strong>Age of life forms</strong> — when they existed (radioactive dating)</>,
                  "Provide evidence for evolutionary relationships",
                  <><strong>Palaeontology</strong> = science of studying fossils</>,
                ].map((t,i)=>(<div className="hae-fossil-item" key={i}><span className="hae-fossil-dot"/><span>{t}</span></div>))}
              </div>
            </div>
          </div>

          {/* Eye evolution */}
          <p className="hae-body-text"><strong>Evolution of the eye</strong> — example of increasing complexity over evolutionary time:</p>
          <div className="hae-eye-strip">
            {[
              { icon:"🔵", name:"Eyespot",       org:"Flatworms",  desc:"Simple patch of photosensitive cells. Can detect light/dark only." },
              { icon:"👁️", name:"Pit Eye",       org:"Nautilus",   desc:"Depression in eyespot → can determine direction of light." },
              { icon:"🔮", name:"Compound Eye",  org:"Insects",    desc:"Thousands of ommatidia units. Wide field of view." },
              { icon:"🎯", name:"Camera Eye",    org:"Fish, Birds",desc:"Single lens focuses image on retina. Good resolution." },
              { icon:"🧠", name:"Complex Eye",   org:"Humans",     desc:"Highly complex; colour vision, depth perception, image processing by brain." },
            ].map(e=>(
              <div className="hae-eye-step" key={e.name}>
                <span className="hae-eye-icon">{e.icon}</span>
                <div className="hae-eye-name">{e.name}</div>
                <div className="hae-eye-org">{e.org}</div>
                <div className="hae-eye-desc">{e.desc}</div>
              </div>
            ))}
          </div>

          {/* Speciation */}
          <div className="hae-speciation-card">
            <div className="hae-spec-icon">🌍</div>
            <div className="hae-spec-content">
              <span className="hae-spec-tag">Human Origin</span>
              <div className="hae-spec-title">We All Come From Africa</div>
              <div className="hae-spec-text">
                All modern humans are <strong>Homo sapiens</strong> — a single species. About 200,000 years ago, our ancestors originated in <strong>Africa</strong>. Some migrated out; others stayed. The migrants spread across the entire planet. There is <strong>no biological basis for human "races"</strong> — all humans are one species. We differ only in surface features shaped by local environments over thousands of years. Humans are just <strong>one branch of evolution</strong> — not the "highest" or culminating species.
              </div>
            </div>
          </div>

          <div className="hae-pull-quote">
            <p>"Evolution simply creates more complex body designs — but bacteria with the simplest body design are still the most widely found organisms on Earth. Progress is not the right word for evolution. Adaptation is."</p>
          </div>

          {/* FAQ */}
          <div className="hae-divider"><div className="hae-divider-mark"/></div>
          <div className="hae-faq-header"><span className="hae-faq-kicker">Exam Preparation</span></div>
          <h2 className="hae-faq-title">Frequently Asked Questions</h2>
          {faqs.map((faq,i)=>(
            <div className={`hae-faq-item${openIndex===i?" open":""}`} key={i}>
              <button className="hae-faq-q" onClick={()=>toggle(i)}>
                <span className="hae-faq-q-text">Q{i+1}. {faq.q}</span>
                <span className="hae-faq-icon">+</span>
              </button>
              <div className={`hae-faq-ans${openIndex===i?" visible":""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
