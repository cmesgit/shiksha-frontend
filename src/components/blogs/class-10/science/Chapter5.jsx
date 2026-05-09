import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #040e08;
    --ink2:       #0a1e10;
    --muted:      #2e5438;
    --paper:      #f0faf2;
    --paper2:     #daf0e0;
    --accent:     #0a7a3c;
    --accent2:    #065828;
    --accent-lt:  #ccf0d8;
    --gold:       #b88800;
    --gold-lt:    #fff4cc;
    --blue:       #1444a8;
    --blue-lt:    #dce8ff;
    --red:        #b81a20;
    --red-lt:     #fde8ea;
    --purple:     #6a10a8;
    --purple-lt:  #eedcff;
    --teal:       #0a7878;
    --teal-lt:    #ccf0f0;
    --rule:       #a8d8b8;
    --white:      #ffffff;
    --eq-bg:      #020c04;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .pce-root { font-family: 'Inter', sans-serif; background: var(--paper); color: var(--ink); min-height: 100vh; }

  /* ═══ HERO — deep forest green / emerald ═══ */
  .pce-hero {
    background: linear-gradient(135deg, #010802 0%, #031408 50%, #051e0c 100%);
    min-height: 88vh; display: flex; align-items: flex-end;
    position: relative; overflow: hidden; padding: 0 0 64px;
  }
  .pce-hero::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #0a7a3c 0%, #b88800 30%, #1444a8 60%, #6a10a8 100%);
  }
  .pce-hero-bg-num {
    position: absolute; bottom: -60px; right: -30px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(220px, 36vw, 500px); font-weight: 900;
    line-height: 1; color: rgba(255,255,255,0.018);
    letter-spacing: -0.04em; user-select: none; pointer-events: none;
  }
  .pce-hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(10,122,60,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(10,122,60,0.07) 1px, transparent 1px);
    background-size: 52px 52px; pointer-events: none;
  }
  .pce-hero-sheen {
    position: absolute; top: -20%; right: -5%;
    width: 420px; height: 420px; border-radius: 50%;
    background: radial-gradient(circle, rgba(10,122,60,0.1) 0%, transparent 65%);
    pointer-events: none;
  }
  .pce-hero-glow {
    position: absolute; bottom: 15%; left: 6%;
    width: 260px; height: 260px; border-radius: 50%;
    background: radial-gradient(circle, rgba(184,136,0,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .pce-hero-inner { max-width: 900px; width: 100%; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
  .pce-overline {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; color: #6ee8a0;
    margin-bottom: 24px; display: flex; align-items: center; gap: 14px;
  }
  .pce-overline::before, .pce-overline::after { content: ''; flex: 0 0 40px; height: 1px; background: #6ee8a0; }
  .pce-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(34px, 7.5vw, 78px); font-weight: 900; color: #fff;
    line-height: 1; letter-spacing: -0.03em; margin-bottom: 32px;
  }
  .pce-hero-title .em1 { color: #6ee8a0; font-style: normal; }
  .pce-hero-title .em2 { color: #fde68a; font-style: normal; }
  .pce-hero-title .em3 { color: rgba(255,255,255,0.45); font-style: normal; }
  .pce-hero-bar { display: flex; flex-wrap: wrap; gap: 0; border-top: 1px solid rgba(255,255,255,0.12); padding-top: 24px; margin-top: 8px; }
  .pce-hero-bar-item { flex: 1 1 130px; padding: 0 18px 0 0; border-right: 1px solid rgba(255,255,255,0.1); margin-right: 18px; }
  .pce-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .pce-bar-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 5px; }
  .pce-bar-value { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.75); }

  /* ═══ BODY ═══ */
  .pce-body { max-width: 860px; margin: 0 auto; padding: 72px 32px 96px; }

  /* ═══ INTRO CARD ═══ */
  .pce-intro-card {
    background: linear-gradient(135deg, #010802 0%, #051e0c 100%);
    border-left: 5px solid #0a7a3c; border-radius: 4px; padding: 36px 40px;
    margin-bottom: 64px; position: relative; overflow: hidden;
  }
  .pce-intro-card::after { content: '⚗️'; position: absolute; right: 28px; top: 50%; transform: translateY(-50%); font-size: 80px; opacity: 0.08; }
  .pce-intro-card p { font-family: 'Poppins', sans-serif; font-size: 18px; font-weight: 500; color: rgba(255,255,255,0.88); line-height: 1.78; margin: 0 0 14px; }
  .pce-intro-card p:last-child { margin: 0; }
  .pce-intro-card strong { color: #6ee8a0; }

  /* ═══ SEC HEADER ═══ */
  .pce-sec-head { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 32px; border-bottom: 2px solid var(--rule); padding-bottom: 18px; }
  .pce-sec-num { font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900; color: var(--rule); line-height: 1; flex-shrink: 0; }
  .pce-sec-title-wrap { padding-top: 8px; }
  .pce-sec-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin-bottom: 6px; }
  .pce-sec-title { font-family: 'Montserrat', sans-serif; font-size: clamp(22px, 3.5vw, 30px); font-weight: 800; color: var(--ink); line-height: 1.15; letter-spacing: -0.02em; }
  .pce-sec-title span { color: var(--accent); }

  /* ═══ DIVIDER ═══ */
  .pce-divider { margin: 56px 0; display: flex; align-items: center; gap: 16px; }
  .pce-divider::before, .pce-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .pce-divider-mark { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }

  /* ═══ BODY TEXT ═══ */
  .pce-body-text { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 400; color: var(--ink2); line-height: 1.85; margin-bottom: 28px; }
  .pce-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ═══ PULL QUOTE ═══ */
  .pce-pull-quote { border-left: 5px solid var(--accent); background: var(--accent-lt); padding: 22px 30px; margin: 28px 0; border-radius: 0 4px 4px 0; }
  .pce-pull-quote p { font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 600; color: var(--accent2); line-height: 1.7; font-style: italic; margin: 0; }

  /* ═══ ALERT BOX ═══ */
  .pce-alert { padding: 12px 16px; border-radius: 6px; font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.7; margin-bottom: 16px; }
  .pce-alert.green  { background: var(--accent-lt); color: var(--accent2); }
  .pce-alert.red    { background: var(--red-lt);    color: var(--red); }
  .pce-alert.gold   { background: var(--gold-lt);   color: var(--gold); }
  .pce-alert.blue   { background: var(--blue-lt);   color: var(--blue); }
  .pce-alert.purple { background: var(--purple-lt); color: var(--purple); }
  .pce-alert strong { font-weight: 700; }

  /* ═══ HIGHLIGHT CARD (dark) ═══ */
  .pce-highlight-card { background: linear-gradient(135deg, #020c04, #0a1e0e); border: 1.5px solid rgba(10,122,60,0.4); border-radius: 6px; padding: 22px 24px; margin-bottom: 20px; display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap; }
  .pce-hl-icon { font-size: 36px; flex-shrink: 0; }
  .pce-hl-content { flex: 1; min-width: 200px; }
  .pce-hl-tag { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(110,232,160,0.8); background: rgba(10,122,60,0.15); padding: 3px 10px; border-radius: 100px; display: inline-block; margin-bottom: 8px; }
  .pce-hl-title { font-family: 'Montserrat', sans-serif; font-size: 17px; font-weight: 900; color: #6ee8a0; margin-bottom: 8px; }
  .pce-hl-text { font-family: 'Inter', sans-serif; font-size: 14px; color: rgba(255,255,255,0.68); line-height: 1.75; }
  .pce-hl-text strong { color: #fde68a; }

  /* ═══ COMPARE TABLE ═══ */
  .pce-compare-split { border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; margin-bottom: 28px; }
  .pce-compare-hdr { display: grid; grid-template-columns: 1fr 1fr; background: var(--ink); }
  .pce-compare-th { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 14px 20px; border-right: 1px solid rgba(255,255,255,0.08); }
  .pce-compare-th:last-child { border-right: none; }
  .pce-compare-th.left-col  { color: #6ee8a0; }
  .pce-compare-th.right-col { color: #fde68a; }
  .pce-compare-row { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--rule); }
  .pce-compare-row:last-child { border-bottom: none; }
  .pce-compare-row:nth-child(even) { background: var(--paper2); }
  .pce-compare-cell { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); padding: 13px 20px; border-right: 1px solid var(--rule); line-height: 1.6; }
  .pce-compare-cell:last-child { border-right: none; }
  .pce-compare-cell.left-border { border-left: 3px solid var(--accent); }
  .pce-compare-cell strong { color: var(--accent2); font-weight: 600; }

  /* ═══ TIMELINE — Scientists ═══ */
  .pce-timeline { position: relative; margin-bottom: 32px; padding-left: 32px; }
  .pce-timeline::before { content: ''; position: absolute; left: 10px; top: 0; bottom: 0; width: 2px; background: var(--rule); }
  .pce-tl-item { position: relative; margin-bottom: 28px; }
  .pce-tl-item:last-child { margin-bottom: 0; }
  .pce-tl-dot { position: absolute; left: -27px; top: 6px; width: 14px; height: 14px; border-radius: 50%; background: var(--accent); border: 3px solid var(--paper); box-shadow: 0 0 0 2px var(--accent); flex-shrink: 0; }
  .pce-tl-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; }
  .pce-tl-hdr { background: linear-gradient(90deg, var(--ink), #0a1e10); padding: 14px 20px; display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
  .pce-tl-year { font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 900; color: #6ee8a0; background: rgba(10,122,60,0.2); padding: 3px 10px; border-radius: 4px; letter-spacing: 0.06em; flex-shrink: 0; }
  .pce-tl-name { font-family: 'Montserrat', sans-serif; font-size: 17px; font-weight: 800; color: #fff; flex: 1; }
  .pce-tl-law  { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.5); letter-spacing: 0.1em; text-transform: uppercase; }
  .pce-tl-body { padding: 18px 20px; }
  .pce-tl-body-text { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); line-height: 1.8; margin-bottom: 12px; }
  .pce-tl-body-text:last-child { margin-bottom: 0; }
  .pce-tl-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ═══ TRIAD TABLE ═══ */
  .pce-triad-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px; }
  @media (max-width: 600px) { .pce-triad-grid { grid-template-columns: 1fr; } }
  .pce-triad-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; }
  .pce-triad-top { padding: 14px 18px 10px; display: flex; flex-direction: column; align-items: center; }
  .pce-triad-title { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.7); margin-bottom: 8px; }
  .pce-triad-elements { display: flex; flex-direction: column; gap: 4px; width: 100%; }
  .pce-triad-el { font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 900; color: #fff; text-align: center; padding: 5px; border-radius: 4px; background: rgba(255,255,255,0.1); }
  .pce-triad-body { padding: 12px 18px 14px; }
  .pce-triad-note { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--muted); line-height: 1.6; }
  .pce-triad-note strong { color: var(--accent2); font-weight: 600; }
  .pce-triad-card:nth-child(1) .pce-triad-top { background: linear-gradient(135deg, #0a2010, #0a5028); }
  .pce-triad-card:nth-child(2) .pce-triad-top { background: linear-gradient(135deg, #0a1830, #0a2878); }
  .pce-triad-card:nth-child(3) .pce-triad-top { background: linear-gradient(135deg, #280830, #501870); }

  /* ═══ OCTAVES TABLE ═══ */
  .pce-octave-table { border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; margin-bottom: 20px; }
  .pce-oct-head { display: grid; grid-template-columns: 90px repeat(7, 1fr); background: var(--ink); }
  .pce-oct-th { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.55); padding: 10px 8px; border-right: 1px solid rgba(255,255,255,0.08); text-align: center; }
  .pce-oct-th:last-child { border-right: none; }
  .pce-oct-row { display: grid; grid-template-columns: 90px repeat(7, 1fr); border-bottom: 1px solid var(--rule); }
  .pce-oct-row:last-child { border-bottom: none; }
  .pce-oct-row:nth-child(even) { background: var(--paper2); }
  .pce-oct-cell { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--ink2); padding: 9px 8px; border-right: 1px solid var(--rule); text-align: center; line-height: 1.4; }
  .pce-oct-cell:last-child { border-right: none; }
  .pce-oct-cell.label { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; color: var(--accent2); text-align: left; padding-left: 12px; }
  .pce-oct-cell.highlight { font-weight: 700; color: var(--accent); background: var(--accent-lt); }
  @media (max-width: 660px) {
    .pce-oct-head, .pce-oct-row { grid-template-columns: 60px repeat(7, 1fr); }
    .pce-oct-cell { font-size: 11px; padding: 7px 4px; }
  }

  /* ═══ PROPERTY ICON GRID ═══ */
  .pce-prop-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 28px; }
  @media (max-width: 660px) { .pce-prop-grid { grid-template-columns: repeat(2, 1fr); } }
  .pce-prop-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 8px; padding: 18px 14px; text-align: center; border-top: 3px solid var(--accent); }
  .pce-prop-card:nth-child(2) { border-top-color: var(--gold); }
  .pce-prop-card:nth-child(3) { border-top-color: var(--blue); }
  .pce-prop-card:nth-child(4) { border-top-color: var(--red); }
  .pce-prop-card:nth-child(5) { border-top-color: var(--purple); }
  .pce-prop-card:nth-child(6) { border-top-color: var(--teal); }
  .pce-prop-card:nth-child(7) { border-top-color: #c04040; }
  .pce-prop-card:nth-child(8) { border-top-color: #408090; }
  .pce-prop-icon  { font-size: 26px; display: block; margin-bottom: 8px; }
  .pce-prop-title { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; color: var(--ink2); line-height: 1.4; margin-bottom: 4px; }
  .pce-prop-desc  { font-family: 'Inter', sans-serif; font-size: 11px; color: var(--muted); line-height: 1.5; }

  /* ═══ MENDELEEV ACHIEVEMENTS / LIMITATIONS SPLIT ═══ */
  .pce-ach-lim { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; margin-bottom: 28px; }
  @media (max-width: 600px) { .pce-ach-lim { grid-template-columns: 1fr; } }
  .pce-ach-col { padding: 24px 24px 28px; }
  .pce-ach-col.ach { background: linear-gradient(160deg, #010802, #061808); }
  .pce-ach-col.lim { background: var(--white); border-left: 2px solid var(--rule); }
  .pce-ach-col-title { font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 800; margin-bottom: 16px; }
  .ach .pce-ach-col-title { color: #6ee8a0; }
  .lim .pce-ach-col-title { color: var(--red); }
  .pce-ach-list { display: flex; flex-direction: column; gap: 10px; }
  .pce-ach-item { display: flex; gap: 10px; font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.7; }
  .ach .pce-ach-item { color: rgba(255,255,255,0.72); }
  .lim .pce-ach-item { color: var(--ink2); }
  .pce-ach-dot { min-width: 7px; height: 7px; border-radius: 50%; margin-top: 8px; flex-shrink: 0; }
  .ach .pce-ach-dot { background: #6ee8a0; }
  .lim .pce-ach-dot { background: var(--red); }
  .pce-ach-item strong { color: #fde68a; font-weight: 700; }
  .lim .pce-ach-item strong { color: var(--red); }

  /* ═══ MODERN PERIODIC TABLE INFO ═══ */
  .pce-modern-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px; }
  @media (max-width: 620px) { .pce-modern-grid { grid-template-columns: 1fr; } }
  .pce-modern-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 6px; padding: 20px; border-left: 4px solid var(--accent); }
  .pce-modern-card:nth-child(2) { border-left-color: var(--gold); }
  .pce-modern-card:nth-child(3) { border-left-color: var(--blue); }
  .pce-modern-card:nth-child(4) { border-left-color: var(--purple); }
  .pce-modern-icon  { font-size: 24px; margin-bottom: 8px; display: block; }
  .pce-modern-title { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: var(--accent); margin-bottom: 6px; }
  .pce-modern-card:nth-child(2) .pce-modern-title { color: var(--gold); }
  .pce-modern-card:nth-child(3) .pce-modern-title { color: var(--blue); }
  .pce-modern-card:nth-child(4) .pce-modern-title { color: var(--purple); }
  .pce-modern-def { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); line-height: 1.7; }
  .pce-modern-def strong { font-weight: 600; }

  /* ═══ GROUPS TABLE ═══ */
  .pce-groups-table { border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; margin-bottom: 20px; }
  .pce-gt-head { display: grid; grid-template-columns: 1.2fr 1fr 1.8fr; background: var(--ink); }
  .pce-gt-th { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.55); padding: 12px 16px; border-right: 1px solid rgba(255,255,255,0.08); }
  .pce-gt-th:last-child { border-right: none; }
  .pce-gt-row { display: grid; grid-template-columns: 1.2fr 1fr 1.8fr; border-bottom: 1px solid var(--rule); align-items: center; }
  .pce-gt-row:last-child { border-bottom: none; }
  .pce-gt-row:nth-child(even) { background: var(--paper2); }
  .pce-gt-cell { font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); padding: 12px 16px; border-right: 1px solid var(--rule); line-height: 1.5; }
  .pce-gt-cell:last-child { border-right: none; }
  .pce-gt-cell.grp-badge { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 13px; color: var(--accent); background: var(--accent-lt); border-radius: 4px; padding: 3px 10px; display: inline-block; }

  /* ═══ TRENDS — period / group arrows ═══ */
  .pce-trends { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 28px; }
  @media (max-width: 620px) { .pce-trends { grid-template-columns: 1fr; } }
  .pce-trend-card { background: var(--white); border: 1.5px solid var(--rule); border-radius: 8px; overflow: hidden; }
  .pce-trend-hdr { padding: 14px 18px 10px; }
  .pce-trend-hdr.down  { background: linear-gradient(90deg, #030c06, #062014); }
  .pce-trend-hdr.right { background: linear-gradient(90deg, #080410, #200840); }
  .pce-trend-title { font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 800; color: #fff; margin-bottom: 4px; }
  .pce-trend-subtitle { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.5); letter-spacing: 0.1em; text-transform: uppercase; }
  .pce-trend-body { padding: 16px 18px; }
  .pce-trend-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; font-family: 'Inter', sans-serif; font-size: 14px; color: var(--ink2); line-height: 1.55; }
  .pce-trend-row:last-child { margin-bottom: 0; }
  .pce-trend-arrow-up   { font-size: 18px; color: var(--accent); flex-shrink: 0; }
  .pce-trend-arrow-down { font-size: 18px; color: var(--red); flex-shrink: 0; }
  .pce-trend-row strong { color: var(--accent2); font-weight: 700; }

  /* ═══ PERIODICITY DARK CARD ═══ */
  .pce-periodicity-card { background: linear-gradient(135deg, #020c04, #0a1e0e); border: 1.5px solid rgba(10,122,60,0.3); border-radius: 6px; padding: 24px 26px; margin-bottom: 20px; }
  .pce-per-title { font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 800; color: #6ee8a0; margin-bottom: 12px; }
  .pce-per-desc  { font-family: 'Inter', sans-serif; font-size: 14px; color: rgba(255,255,255,0.65); line-height: 1.8; margin-bottom: 16px; }
  .pce-per-parts { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  @media (max-width: 540px) { .pce-per-parts { grid-template-columns: 1fr; } }
  .pce-per-part { background: rgba(255,255,255,0.05); border-radius: 6px; padding: 14px; }
  .pce-per-part-name { font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; color: #a0e8b8; margin-bottom: 5px; letter-spacing: 0.06em; }
  .pce-per-part-desc { font-family: 'Inter', sans-serif; font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.6; }

  /* ═══ ELEMENT BLOCK (like Periodic Table element) ═══ */
  .pce-element-showcase { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; margin-bottom: 20px; }
  @media (max-width: 600px) { .pce-element-showcase { grid-template-columns: repeat(3, 1fr); } }
  .pce-el-box { background: var(--white); border: 1.5px solid var(--rule); border-radius: 6px; padding: 10px 8px; text-align: center; border-top: 3px solid var(--accent); }
  .pce-el-box:nth-child(2) { border-top-color: var(--gold); }
  .pce-el-box:nth-child(3) { border-top-color: var(--blue); }
  .pce-el-box:nth-child(4) { border-top-color: var(--red); }
  .pce-el-box:nth-child(5) { border-top-color: var(--purple); }
  .pce-el-box:nth-child(6) { border-top-color: var(--teal); }
  .pce-el-num  { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; color: var(--muted); }
  .pce-el-sym  { font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900; color: var(--ink); line-height: 1.1; }
  .pce-el-name { font-family: 'Inter', sans-serif; font-size: 10px; color: var(--muted); margin-top: 2px; }

  /* ═══ FAQ ═══ */
  .pce-faq-header { margin-bottom: 12px; }
  .pce-faq-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); background: var(--accent-lt); padding: 6px 16px; border-radius: 100px; }
  .pce-faq-title { font-family: 'Montserrat', sans-serif; font-size: clamp(26px, 4vw, 36px); font-weight: 900; color: var(--ink); letter-spacing: -0.02em; margin-bottom: 28px; margin-top: 16px; }
  .pce-faq-item { border: 1.5px solid var(--rule); border-radius: 6px; margin-bottom: 12px; overflow: hidden; background: var(--white); transition: border-color 0.2s; }
  .pce-faq-item.open { border-color: var(--accent); }
  .pce-faq-q { width: 100%; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; text-align: left; gap: 16px; }
  .pce-faq-q-text { font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600; color: var(--ink); line-height: 1.5; }
  .pce-faq-item.open .pce-faq-q-text { color: var(--accent); }
  .pce-faq-icon { font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 700; color: var(--accent); flex-shrink: 0; transition: transform 0.2s; }
  .pce-faq-item.open .pce-faq-icon { transform: rotate(45deg); }
  .pce-faq-ans { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 400; color: var(--ink2); line-height: 1.85; padding: 0 24px; max-height: 0; overflow: hidden; transition: max-height 0.35s ease, padding 0.35s ease; }
  .pce-faq-ans.visible { max-height: 900px; padding: 0 24px 22px; }
  .pce-faq-ans strong { color: var(--accent2); font-weight: 600; }
  .pce-faq-ans code { font-family: 'Courier New', Courier, monospace; font-size: 13px; background: var(--accent-lt); padding: 1px 6px; border-radius: 3px; color: var(--accent2); }

  @media (max-width: 700px) {
    .pce-body { padding: 48px 20px 72px; }
    .pce-hero-inner { padding: 0 20px; }
    .pce-intro-card { padding: 24px 22px; }
    .pce-compare-cell { padding: 10px 12px; font-size: 13px; }
    .pce-compare-th { padding: 12px 12px; font-size: 11px; }
    .pce-ach-col.lim { border-left: none; border-top: 2px solid var(--rule); }
  }
`;

const faqs = [
  {
    q: "Why was the classification of elements necessary?",
    a: (<>As more and more elements were discovered, studying them individually became very difficult and confusing. Classification was necessary to <strong>organise elements into groups based on similar properties</strong>, making their study more convenient and systematic.<br /><br />The earliest classification simply divided elements into <strong>metals and non-metals</strong>. Over time, more sophisticated classification systems were developed — first by Döbereiner, then Newlands, then Mendeleev, and finally the modern periodic table.</>),
  },
  {
    q: "What is Döbereiner's Law of Triads? Give examples.",
    a: (<>Döbereiner was the first to show a <strong>relationship between atomic masses and properties</strong> of elements. He observed that when elements were arranged in groups of three (triads) in increasing order of atomic mass, the <strong>atomic mass of the middle element was approximately the average of the first and third</strong>.<br /><br />
      <strong>Examples of Döbereiner's Triads:</strong><br />
      • Li (7), Na (23), K (39) — Na ≈ (7+39)/2 = 23 ✓<br />
      • Ca (40), Sr (88), Ba (137) — Sr ≈ (40+137)/2 = 88.5 ✓<br />
      • Cl (35.5), Br (80), I (127) — Br ≈ (35.5+127)/2 = 81.3 ✓<br /><br />
      <strong>Limitation:</strong> Not all known elements could be grouped into triads — only a few worked.</>),
  },
  {
    q: "What is Newlands' Law of Octaves? What are its limitations?",
    a: (<>Newlands arranged all known elements in <strong>increasing order of atomic mass</strong> and observed that every 8th element had properties similar to the 1st element — like notes in a musical octave (sa re ga ma pa dha ni).<br /><br />
      For example: H, Li, Be, B, C, N, O — the 8th element F had properties similar to H.<br /><br />
      <strong>Limitations of Newlands' Law of Octaves:</strong><br />
      • It worked only for <strong>lighter elements up to calcium</strong> — failed for heavier elements<br />
      • When <strong>noble gases</strong> were discovered later, the law completely broke down<br />
      • He placed <strong>two elements in the same slot</strong> (like Co and Ni) to maintain the pattern<br />
      • Some unlike elements were placed together — e.g., Fe was placed far from Co and Ni, which are chemically similar</>),
  },
  {
    q: "What is Mendeleev's Periodic Law? What are his achievements?",
    a: (<><strong>Mendeleev's Periodic Law:</strong> "The properties of elements are a <strong>periodic function of their atomic masses</strong>."<br /><br />
      He arranged all 63 known elements in order of increasing atomic mass into rows (periods) and columns (groups) based on similar properties.<br /><br />
      <strong>Achievements of Mendeleev's Periodic Table:</strong><br />
      1. He <strong>left gaps</strong> for undiscovered elements so that known elements didn't have to be displaced — and predicted their properties accurately<br />
      2. He predicted the existence of <strong>Gallium</strong> and called it <strong>eka-aluminium</strong> (later discovered and matched his predictions exactly)<br />
      3. He predicted <strong>Germanium</strong> (eka-silicon) and Scandium (eka-boron)<br />
      4. When <strong>noble gases</strong> were discovered later (He, Ne, Ar…), they were placed in a new Group 0 <strong>without disturbing</strong> any other element's position</>),
  },
  {
    q: "What are the limitations of Mendeleev's Periodic Table?",
    a: (<><strong>Limitations of Mendeleev's Periodic Table:</strong><br /><br />
      1. <strong>Position of hydrogen was unexplained</strong> — H has properties of both alkali metals (Group 1) and halogens (Group 17). Mendeleev could not decide where to place it.<br /><br />
      2. <strong>Position of isotopes was not explained</strong> — Isotopes of the same element have different atomic masses. If arranged by atomic mass, they would need separate positions, but they have the same chemical properties.<br /><br />
      3. <strong>Anomalous pairs</strong> — Some elements with higher atomic mass were placed before elements with lower atomic mass to maintain chemical similarity:<br />
      • Argon (39.9) placed before Potassium (39.1)<br />
      • Cobalt (58.9) placed before Nickel (58.6)<br />
      • Tellurium (127.6) placed before Iodine (126.9)</>),
  },
  {
    q: "What is the Modern Periodic Law? How is it different from Mendeleev's?",
    a: (<><strong>Modern Periodic Law (Henry Moseley, 1913):</strong> "The properties of elements are a periodic function of their <strong>atomic numbers</strong>."<br /><br />
      Moseley discovered that atomic number (number of protons), not atomic mass, is the more fundamental property of an element.<br /><br />
      <strong>Key difference from Mendeleev:</strong><br />
      • Mendeleev used <strong>atomic mass</strong> as the basis — led to anomalous pairs<br />
      • Modern law uses <strong>atomic number</strong> — all anomalies are resolved<br />
      • The position of isotopes is now justified — they have the same atomic number, so they go in the same position<br />
      • The position of hydrogen remains debatable but is placed in Group 1 by convention</>),
  },
  {
    q: "Describe the structure of the Modern Periodic Table.",
    a: (<>The Modern Periodic Table has:<br /><br />
      • <strong>7 Periods</strong> (horizontal rows) — elements in the same period have the same number of occupied electron shells (same valence shell)<br />
      • <strong>18 Groups</strong> (vertical columns) — elements in the same group have the same number of valence electrons and similar chemical properties<br /><br />
      <strong>Classification of elements:</strong><br />
      • <strong>Groups 1, 2 and 13–18</strong>: Representative elements (s-block and p-block)<br />
      • <strong>Groups 3–12</strong>: Transition elements (d-block)<br />
      • <strong>Period 6, atomic nos. 58–71</strong>: Lanthanoids (f-block)<br />
      • <strong>Period 7, atomic nos. 90–103</strong>: Actinoids (f-block)<br /><br />
      <strong>Position of metals vs non-metals:</strong><br />
      • <strong>Metals</strong> — left-hand side of the table<br />
      • <strong>Non-metals</strong> — right-hand side of the table<br />
      • <strong>Metalloids</strong> (semiconductors like Si, Ge) — along the staircase dividing line</>),
  },
  {
    q: "How does atomic size vary in the periodic table?",
    a: (<><strong>Atomic size = radius of an atom</strong> (distance from nucleus to outermost electron shell).<br /><br />
      <strong>Down the group (increasing atomic number in same group):</strong><br />
      → Atomic size <strong>INCREASES</strong><br />
      Reason: A new electron shell is added with each period, increasing the distance of outermost electrons from the nucleus. Also, inner shell electrons shield the outer electrons from nuclear attraction.<br /><br />
      <strong>Across a period (left to right):</strong><br />
      → Atomic size <strong>DECREASES</strong><br />
      Reason: The number of protons (nuclear charge) increases while electrons are added to the <strong>same shell</strong>. Greater nuclear pull draws electrons closer to the nucleus, reducing atomic size.</>),
  },
  {
    q: "How does valency change across a period and down a group?",
    a: (<><strong>Valency</strong> is the combining capacity of an element — determined by the number of valence electrons (or electrons needed to complete the octet).<br /><br />
      <strong>Down a group:</strong><br />
      → Valency remains the <strong>SAME</strong><br />
      Reason: All elements in a group have the same number of valence electrons. E.g., all alkali metals (Group 1) have valency 1.<br /><br />
      <strong>Across a period (left to right):</strong><br />
      → Valency <strong>first increases then decreases</strong><br />
      Pattern: 1 → 2 → 3 → 4 → 3 → 2 → 1 → 0<br />
      Example for Period 3: Na(1) Mg(2) Al(3) Si(4) P(3) S(2) Cl(1) Ar(0)<br /><br />
      This happens because valency depends on the number of electrons in the outermost shell, which increases from 1 to 4 and then the tendency to gain electrons kicks in (8−n pattern).</>),
  },
  {
    q: "How does metallic character change in the periodic table?",
    a: (<><strong>Metallic character</strong> refers to the tendency of an atom to <strong>lose electrons</strong> (form positive ions). It is related to ionisation energy — lower ionisation energy = higher metallic character.<br /><br />
      <strong>Down a group:</strong><br />
      → Metallic character <strong>INCREASES</strong><br />
      Reason: Atomic size increases → outermost electrons are farther from nucleus → held less tightly → easier to lose → more metallic<br /><br />
      <strong>Across a period (left to right):</strong><br />
      → Metallic character <strong>DECREASES</strong><br />
      Reason: Nuclear charge increases → electrons held more tightly → harder to lose → less metallic → more non-metallic<br /><br />
      This is why metals are on the <strong>left side</strong> of the periodic table and non-metals are on the <strong>right side</strong>.</>),
  },
  {
    q: "What is ionisation energy and how does it vary in the periodic table?",
    a: (<><strong>Ionisation energy</strong> is the energy required to <strong>remove the outermost electron</strong> from a gaseous atom.<br /><br />
      <strong>Across a period (left to right):</strong><br />
      → Ionisation energy <strong>INCREASES</strong><br />
      Reason: Nuclear charge increases, atomic size decreases, outermost electrons are held more tightly → more energy needed to remove them<br /><br />
      <strong>Down a group:</strong><br />
      → Ionisation energy <strong>DECREASES</strong><br />
      Reason: Atomic size increases, more electron shells provide shielding → outer electrons are less tightly held → less energy needed to remove them<br /><br />
      <strong>Electron gain enthalpy</strong> (energy released when an electron is added) follows the <strong>same trend</strong> — increases across a period (left to right) and decreases down a group.</>),
  },
  {
    q: "Why do elements in the same group show similar properties?",
    a: (<>Elements in the same <strong>group</strong> have the <strong>same number of electrons in their valence (outermost) shell</strong>.<br /><br />
      Chemical properties of elements are determined primarily by their valence electrons — they determine:<br />
      • How many bonds the element forms (valency)<br />
      • Whether it tends to lose or gain electrons<br />
      • What compounds it forms<br /><br />
      Since all elements in a group have the same number of valence electrons, they exhibit <strong>similar chemical behaviour</strong>. For example:<br />
      • All Group 1 elements (Li, Na, K…) have 1 valence electron → all react vigorously with water → all form MOH<br />
      • All Group 17 elements (F, Cl, Br, I) have 7 valence electrons → all need 1 electron → all form HX acids</>),
  },
  {
    q: "What is meant by periodicity in properties? Why do elements show periodicity?",
    a: (<><strong>Periodicity</strong> means the <strong>regular repetition of properties</strong> of elements at regular intervals when arranged in order of increasing atomic number.<br /><br />
      Elements show periodicity because of their <strong>valence shell electronic configuration</strong>. When we move through the periodic table, after filling one shell completely, a new shell starts filling — and elements with the same number of valence electrons repeat similar chemical properties.<br /><br />
      For example:<br />
      • Period 2 starts with Li (2,1) and ends with Ne (2,8)<br />
      • Period 3 starts with Na (2,8,1) — similar to Li — and ends with Ar (2,8,8)<br /><br />
      Na and Li both have 1 valence electron → same group → same periodicity in properties. This pattern repeats across every period.</>),
  },
];

export default function PeriodicClassificationOfElements() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="pce-root">

        {/* ═══ HERO ═══ */}
        <div className="pce-hero">
          <div className="pce-hero-grid" />
          <div className="pce-hero-sheen" />
          <div className="pce-hero-glow" />
          <div className="pce-hero-bg-num">05</div>
          <div className="pce-hero-inner">
            <div className="pce-overline">Science · Class 10 · Chemistry · Chapter 5</div>
            <h1 className="pce-hero-title">
              <span className="em1">Periodic</span><br />
              <span className="em3">Classification</span><br />
              <span className="em2">of Elements</span>
            </h1>
            <div className="pce-hero-bar">
              {[
                { label: "Subject",  value: "Chemistry" },
                { label: "Class",   value: "10th Standard" },
                { label: "Chapter", value: "Chapter 5" },
                { label: "Board",   value: "CBSE / NCERT" },
              ].map((x) => (
                <div className="pce-hero-bar-item" key={x.label}>
                  <div className="pce-bar-label">{x.label}</div>
                  <div className="pce-bar-value">{x.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pce-body">

          {/* Intro */}
          <div className="pce-intro-card">
            <p>With over 118 elements discovered, studying each one individually would be impossible. <strong>Periodic classification</strong> groups elements with similar properties together — making chemistry organised, predictable, and learnable.</p>
            <p>This chapter traces the journey from Döbereiner's Triads (1817) to Newlands' Octaves, Mendeleev's genius, and finally the <strong>Modern Periodic Table</strong> — along with trends in atomic size, valency, metallic character, and ionisation energy.</p>
          </div>

          {/* ── S1: EARLY ATTEMPTS ── */}
          <div className="pce-sec-head">
            <div className="pce-sec-num">1</div>
            <div className="pce-sec-title-wrap">
              <div className="pce-sec-kicker">History of Classification</div>
              <h2 className="pce-sec-title">Early Attempts at <span>Classification</span></h2>
            </div>
          </div>
          <p className="pce-body-text">
            The classification of elements was necessary to make their study more convenient. The earliest classification was simply grouping elements as <strong>metals and non-metals</strong>. As more elements were discovered, scientists searched for deeper patterns linking atomic masses to properties.
          </p>

          {/* Döbereiner */}
          <div className="pce-timeline">

            <div className="pce-tl-item">
              <div className="pce-tl-dot" />
              <div className="pce-tl-card">
                <div className="pce-tl-hdr">
                  <span className="pce-tl-year">1817</span>
                  <span className="pce-tl-name">Döbereiner</span>
                  <span className="pce-tl-law">Law of Triads</span>
                </div>
                <div className="pce-tl-body">
                  <div className="pce-tl-body-text">
                    Döbereiner was the <strong>first person to illustrate the relationship between atomic masses and properties</strong>. He arranged elements in groups of three called <strong>triads</strong>, in increasing order of atomic mass. He observed that the atomic mass of the <strong>middle element was approximately the arithmetic mean of the first and third</strong>.
                  </div>
                  <div className="pce-tl-body-text">
                    The properties of the middle element were also intermediate between those of the first and third element.
                  </div>
                  <div className="pce-triad-grid" style={{marginTop:"14px"}}>
                    <div className="pce-triad-card">
                      <div className="pce-triad-top">
                        <div className="pce-triad-title">Triad 1</div>
                        <div className="pce-triad-elements">
                          <div className="pce-triad-el">Li</div>
                          <div className="pce-triad-el">Na</div>
                          <div className="pce-triad-el">K</div>
                        </div>
                      </div>
                      <div className="pce-triad-body">
                        <div className="pce-triad-note">Atomic masses: 7, 23, 39<br /><strong>Na ≈ (7+39)/2 = 23 ✓</strong></div>
                      </div>
                    </div>
                    <div className="pce-triad-card">
                      <div className="pce-triad-top">
                        <div className="pce-triad-title">Triad 2</div>
                        <div className="pce-triad-elements">
                          <div className="pce-triad-el">Ca</div>
                          <div className="pce-triad-el">Sr</div>
                          <div className="pce-triad-el">Ba</div>
                        </div>
                      </div>
                      <div className="pce-triad-body">
                        <div className="pce-triad-note">Atomic masses: 40, 88, 137<br /><strong>Sr ≈ (40+137)/2 = 88.5 ✓</strong></div>
                      </div>
                    </div>
                    <div className="pce-triad-card">
                      <div className="pce-triad-top">
                        <div className="pce-triad-title">Triad 3</div>
                        <div className="pce-triad-elements">
                          <div className="pce-triad-el">Cl</div>
                          <div className="pce-triad-el">Br</div>
                          <div className="pce-triad-el">I</div>
                        </div>
                      </div>
                      <div className="pce-triad-body">
                        <div className="pce-triad-note">Atomic masses: 35.5, 80, 127<br /><strong>Br ≈ (35.5+127)/2 = 81.3 ✓</strong></div>
                      </div>
                    </div>
                  </div>
                  <div className="pce-tl-body-text" style={{marginTop:"14px"}}>
                    <strong>Limitation:</strong> Not all known elements could be grouped into triads. Only a few elements fit this pattern.
                  </div>
                </div>
              </div>
            </div>

            {/* Newlands */}
            <div className="pce-tl-item">
              <div className="pce-tl-dot" />
              <div className="pce-tl-card">
                <div className="pce-tl-hdr">
                  <span className="pce-tl-year">1866</span>
                  <span className="pce-tl-name">Newlands</span>
                  <span className="pce-tl-law">Law of Octaves</span>
                </div>
                <div className="pce-tl-body">
                  <div className="pce-tl-body-text">
                    Newlands arranged all known elements in <strong>increasing order of their atomic masses</strong>. He observed that every <strong>8th element had properties similar to the 1st</strong> — just like notes of music (sa re ga ma pa dha ni). This was called the <strong>Law of Octaves</strong>.
                  </div>
                  <div className="pce-octave-table" style={{marginBottom:"14px"}}>
                    <div className="pce-oct-head">
                      <div className="pce-oct-th" style={{textAlign:"left",paddingLeft:"12px"}}>Notes</div>
                      <div className="pce-oct-th">Sa</div>
                      <div className="pce-oct-th">Re</div>
                      <div className="pce-oct-th">Ga</div>
                      <div className="pce-oct-th">Ma</div>
                      <div className="pce-oct-th">Pa</div>
                      <div className="pce-oct-th">Dha</div>
                      <div className="pce-oct-th">Ni</div>
                    </div>
                    <div className="pce-oct-row">
                      <div className="pce-oct-cell label">Row 1</div>
                      <div className="pce-oct-cell highlight">H</div>
                      <div className="pce-oct-cell">Li</div>
                      <div className="pce-oct-cell">Be</div>
                      <div className="pce-oct-cell">B</div>
                      <div className="pce-oct-cell">C</div>
                      <div className="pce-oct-cell">N</div>
                      <div className="pce-oct-cell">O</div>
                    </div>
                    <div className="pce-oct-row">
                      <div className="pce-oct-cell label">Row 2</div>
                      <div className="pce-oct-cell highlight">F</div>
                      <div className="pce-oct-cell">Na</div>
                      <div className="pce-oct-cell">Mg</div>
                      <div className="pce-oct-cell">Al</div>
                      <div className="pce-oct-cell">Si</div>
                      <div className="pce-oct-cell">P</div>
                      <div className="pce-oct-cell">S</div>
                    </div>
                    <div className="pce-oct-row">
                      <div className="pce-oct-cell label">Row 3</div>
                      <div className="pce-oct-cell highlight">Cl</div>
                      <div className="pce-oct-cell">K</div>
                      <div className="pce-oct-cell">Ca</div>
                      <div className="pce-oct-cell">Cr</div>
                      <div className="pce-oct-cell">Ti</div>
                      <div className="pce-oct-cell">Mn</div>
                      <div className="pce-oct-cell">Fe</div>
                    </div>
                    <div className="pce-oct-row">
                      <div className="pce-oct-cell label">Row 4</div>
                      <div className="pce-oct-cell" style={{fontSize:"10px"}}>Co&amp;Ni</div>
                      <div className="pce-oct-cell">Cu</div>
                      <div className="pce-oct-cell">Zn</div>
                      <div className="pce-oct-cell">Y</div>
                      <div className="pce-oct-cell">In</div>
                      <div className="pce-oct-cell">As</div>
                      <div className="pce-oct-cell">Se</div>
                    </div>
                  </div>
                  <div className="pce-alert red">
                    ⚠️ <strong>Limitations:</strong> Applicable only to lighter elements (up to Ca). When noble gases were discovered, the law broke down completely. Newlands placed two elements (Co and Ni) in the same slot, and unlike elements were sometimes grouped together.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── S2: MENDELEEV ── */}
          <div className="pce-divider"><div className="pce-divider-mark" /></div>
          <div className="pce-sec-head">
            <div className="pce-sec-num">2</div>
            <div className="pce-sec-title-wrap">
              <div className="pce-sec-kicker">Atomic Mass Based</div>
              <h2 className="pce-sec-title">Mendeleev's <span>Periodic Table</span></h2>
            </div>
          </div>
          <p className="pce-body-text">
            Mendeleev arranged all <strong>63 known elements</strong> in order of increasing atomic masses and grouped elements with similar properties in the same vertical column (group). He formulated the <strong>Mendeleev's Periodic Law</strong>:
          </p>

          <div className="pce-highlight-card">
            <div className="pce-hl-icon">📜</div>
            <div className="pce-hl-content">
              <span className="pce-hl-tag">Mendeleev's Periodic Law</span>
              <div className="pce-hl-title">Properties are a Periodic Function of Atomic Mass</div>
              <div className="pce-hl-text">
                "The properties of elements are a <strong>periodic function of their atomic masses</strong>." — Mendeleev arranged elements so that elements with similar properties appeared in the same vertical group, and left gaps for undiscovered elements.
              </div>
            </div>
          </div>

          <div className="pce-ach-lim">
            <div className="pce-ach-col ach">
              <div className="pce-ach-col-title">✓ Achievements</div>
              <div className="pce-ach-list">
                {[
                  [null, "Left gaps in the periodic table for undiscovered elements — so known elements didn't need to be moved when new ones were found"],
                  ["Eka-Aluminium", "Predicted the existence of Gallium and called it eka-aluminium — its properties matched exactly when discovered later"],
                  ["Eka-Silicon", "Predicted Germanium (eka-silicon) with nearly perfect properties — confirmed on discovery in 1886"],
                  ["Noble Gases", "When noble gases (He, Ne, Ar, Kr, Xe, Rn) were discovered later, they fit into a new Group 0 without disturbing any existing element's position"],
                ].map(([bold, text], i) => (
                  <div className="pce-ach-item" key={i}>
                    <div className="pce-ach-dot" />
                    <span>{bold && <strong>{bold}: </strong>}{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pce-ach-col lim">
              <div className="pce-ach-col-title">✗ Limitations</div>
              <div className="pce-ach-list">
                {[
                  ["Position of Hydrogen", "Failed to explain the position of hydrogen — it could fit in Group 1 (like alkali metals) or Group 17 (like halogens)"],
                  ["Isotopes", "Could not explain the position of isotopes — isotopes of the same element have different atomic masses but same chemical properties"],
                  ["Anomalous Pairs", "Some elements with higher atomic mass were placed before elements with lower atomic mass: Ar(39.9) before K(39.1), Co before Ni, Te before I"],
                ].map(([bold, text], i) => (
                  <div className="pce-ach-item" key={i}>
                    <div className="pce-ach-dot" />
                    <span><strong>{bold}: </strong>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── S3: MODERN PERIODIC TABLE ── */}
          <div className="pce-divider"><div className="pce-divider-mark" /></div>
          <div className="pce-sec-head">
            <div className="pce-sec-num">3</div>
            <div className="pce-sec-title-wrap">
              <div className="pce-sec-kicker">Atomic Number Based</div>
              <h2 className="pce-sec-title">The Modern <span>Periodic Table</span></h2>
            </div>
          </div>

          <div className="pce-highlight-card">
            <div className="pce-hl-icon">⚛️</div>
            <div className="pce-hl-content">
              <span className="pce-hl-tag">Modern Periodic Law — Henry Moseley (1913)</span>
              <div className="pce-hl-title">Properties are a Periodic Function of Atomic Number</div>
              <div className="pce-hl-text">
                "The properties of elements are a periodic function of their <strong>atomic numbers</strong>, not their atomic masses." — This resolved all anomalies in Mendeleev's table. Atomic number (= proton number) is the true fundamental property of an element.
              </div>
            </div>
          </div>

          <p className="pce-body-text">The modern periodic table consists of <strong>7 Periods</strong> (horizontal rows) and <strong>18 Groups</strong> (vertical columns). Elements in the same period have the same number of electron shells; elements in the same group have the same number of valence electrons.</p>

          <div className="pce-modern-grid">
            <div className="pce-modern-card">
              <span className="pce-modern-icon">↕️</span>
              <div className="pce-modern-title">7 Periods (Rows)</div>
              <div className="pce-modern-def">Elements in the same period have the <strong>same valence shell</strong>. Period number = number of electron shells. Period 1 has 2 elements; Period 2 and 3 have 8 each.</div>
            </div>
            <div className="pce-modern-card">
              <span className="pce-modern-icon">↔️</span>
              <div className="pce-modern-title">18 Groups (Columns)</div>
              <div className="pce-modern-def">Elements in the same group have the <strong>same number of valence electrons</strong> → similar chemical properties → same valency.</div>
            </div>
            <div className="pce-modern-card">
              <span className="pce-modern-icon">⬅️</span>
              <div className="pce-modern-title">Metals (Left Side)</div>
              <div className="pce-modern-def">Metals are present on the <strong>left-hand side</strong> of the periodic table. They tend to lose electrons and form positive ions.</div>
            </div>
            <div className="pce-modern-card">
              <span className="pce-modern-icon">➡️</span>
              <div className="pce-modern-title">Non-metals (Right Side)</div>
              <div className="pce-modern-def">Non-metals are present on the <strong>right-hand side</strong>. They tend to gain electrons. Metalloids lie along the dividing staircase line.</div>
            </div>
          </div>

          <p className="pce-body-text"><strong>Classification of Groups in the Modern Periodic Table:</strong></p>

          <div className="pce-groups-table">
            <div className="pce-gt-head">
              <div className="pce-gt-th">Groups</div>
              <div className="pce-gt-th">Category</div>
              <div className="pce-gt-th">Notes</div>
            </div>
            {[
              ["Groups 1, 2 &  13–18", "Representative Elements", "s-block (Gr. 1–2) and p-block (Gr. 13–18). Most commonly studied elements."],
              ["Groups 3–12",          "Transition Elements",      "d-block elements. Metals with variable valency. Include Fe, Cu, Zn, Cr, Mn etc."],
              ["Period 6, At. No. 58–71", "Lanthanoids",           "f-block. Rare earth elements placed separately below the main table."],
              ["Period 7, At. No. 90–103", "Actinoids",            "f-block. Radioactive elements. Include Uranium (U), Thorium (Th), Plutonium (Pu)."],
            ].map(([grp, cat, note]) => (
              <div className="pce-gt-row" key={grp}>
                <div className="pce-gt-cell"><span className="pce-gt-cell grp-badge">{grp}</span></div>
                <div className="pce-gt-cell" style={{fontWeight:600}}>{cat}</div>
                <div className="pce-gt-cell">{note}</div>
              </div>
            ))}
          </div>

          <div className="pce-alert blue">
            💡 <strong>Why are elements in the same group similar?</strong> They all have the <strong>same number of valence electrons</strong>, so they show the same valency and similar chemical reactions.
          </div>

          {/* Showcase some elements */}
          <p className="pce-body-text">Some key elements from the Modern Periodic Table:</p>
          <div className="pce-element-showcase">
            {[
              {num:1,  sym:"H",  name:"Hydrogen"},
              {num:6,  sym:"C",  name:"Carbon"},
              {num:8,  sym:"O",  name:"Oxygen"},
              {num:11, sym:"Na", name:"Sodium"},
              {num:17, sym:"Cl", name:"Chlorine"},
              {num:26, sym:"Fe", name:"Iron"},
            ].map(el => (
              <div className="pce-el-box" key={el.sym}>
                <div className="pce-el-num">{el.num}</div>
                <div className="pce-el-sym">{el.sym}</div>
                <div className="pce-el-name">{el.name}</div>
              </div>
            ))}
          </div>

          {/* ── S4: TRENDS IN PERIODIC TABLE ── */}
          <div className="pce-divider"><div className="pce-divider-mark" /></div>
          <div className="pce-sec-head">
            <div className="pce-sec-num">4</div>
            <div className="pce-sec-title-wrap">
              <div className="pce-sec-kicker">Periodic Trends</div>
              <h2 className="pce-sec-title">Trends in the <span>Periodic Table</span></h2>
            </div>
          </div>
          <p className="pce-body-text">
            Properties of elements change in predictable patterns as we move across a period (left to right) or down a group. These are called <strong>periodic trends</strong>. Understanding them lets you predict the properties of any element from its position.
          </p>

          <div className="pce-trends">
            <div className="pce-trend-card">
              <div className="pce-trend-hdr down">
                <div className="pce-trend-title">⬇ Down a Group</div>
                <div className="pce-trend-subtitle">Same number of valence e⁻; more shells</div>
              </div>
              <div className="pce-trend-body">
                <div className="pce-trend-row"><span className="pce-trend-arrow-up">↑</span><span><strong>Atomic Size</strong> increases — new shell added each period</span></div>
                <div className="pce-trend-row"><span className="pce-trend-arrow-up">↑</span><span><strong>Metallic character</strong> increases — outer e⁻ farther from nucleus, easier to lose</span></div>
                <div className="pce-trend-row"><span className="pce-trend-arrow-down">↓</span><span><strong>Ionisation energy</strong> decreases — outer e⁻ less tightly held</span></div>
                <div className="pce-trend-row"><span className="pce-trend-arrow-down">↓</span><span><strong>Electron gain enthalpy</strong> decreases</span></div>
                <div className="pce-trend-row"><span className="pce-trend-arrow-up">→</span><span><strong>Valency</strong> remains the SAME (same valence e⁻ count)</span></div>
              </div>
            </div>
            <div className="pce-trend-card">
              <div className="pce-trend-hdr right">
                <div className="pce-trend-title">→ Across a Period (L to R)</div>
                <div className="pce-trend-subtitle">Same shell; increasing nuclear charge</div>
              </div>
              <div className="pce-trend-body">
                <div className="pce-trend-row"><span className="pce-trend-arrow-down">↓</span><span><strong>Atomic Size</strong> decreases — more protons pull electrons closer</span></div>
                <div className="pce-trend-row"><span className="pce-trend-arrow-down">↓</span><span><strong>Metallic character</strong> decreases — harder to lose electrons</span></div>
                <div className="pce-trend-row"><span className="pce-trend-arrow-up">↑</span><span><strong>Ionisation energy</strong> increases — electrons held more tightly</span></div>
                <div className="pce-trend-row"><span className="pce-trend-arrow-up">↑</span><span><strong>Electron gain enthalpy</strong> increases</span></div>
                <div className="pce-trend-row"><span className="pce-trend-arrow-up">↑↓</span><span><strong>Valency</strong> first increases (1→4) then decreases (4→0)</span></div>
              </div>
            </div>
          </div>

          {/* Atomic size deep dive */}
          <div className="pce-sec-head" style={{marginTop:"40px"}}>
            <div className="pce-sec-num">4a</div>
            <div className="pce-sec-title-wrap">
              <div className="pce-sec-kicker">Trend 1</div>
              <h2 className="pce-sec-title">Atomic <span>Size</span></h2>
            </div>
          </div>
          <p className="pce-body-text">Atomic size refers to the radius of an atom — the distance from the nucleus to the outermost electron shell.</p>

          <div className="pce-compare-split">
            <div className="pce-compare-hdr">
              <div className="pce-compare-th left-col">⬇ Down the Group</div>
              <div className="pce-compare-th right-col">→ Across a Period (L to R)</div>
            </div>
            {[
              ["Atomic size INCREASES ↑", "Atomic size DECREASES ↓"],
              ["New electron shells are added with each period", "Electrons added to the SAME shell — no new shell"],
              ["More shells = greater distance of outermost electrons from nucleus", "Nuclear charge (protons) increases → stronger pull on electrons → smaller radius"],
              ["Inner shells also shield outer electrons from nuclear pull", "All electrons in the same shell → shielding is minimal"],
              ["Example: Li < Na < K < Rb < Cs (down Group 1)", "Example: Na > Mg > Al > Si > P > S > Cl (Period 3)"],
            ].map(([l, r], i) => (
              <div className="pce-compare-row" key={i}>
                <div className="pce-compare-cell left-border">{l}</div>
                <div className="pce-compare-cell">{r}</div>
              </div>
            ))}
          </div>

          {/* Valency deep dive */}
          <div className="pce-sec-head" style={{marginTop:"40px"}}>
            <div className="pce-sec-num">4b</div>
            <div className="pce-sec-title-wrap">
              <div className="pce-sec-kicker">Trend 2</div>
              <h2 className="pce-sec-title">Valency <span>Trends</span></h2>
            </div>
          </div>
          <p className="pce-body-text">
            <strong>Valency</strong> is the combining capacity of an element, determined by the number of electrons in the outermost shell (valence electrons). The valence shell must have 8 electrons (octet) for stability — valency is either the number of valence electrons (if ≤ 4) or 8 minus that number (if {'>'} 4).
          </p>

          <div className="pce-prop-grid">
            {[
              { icon:"1️⃣", title:"Group 1 — Valency 1",  desc:"Li, Na, K, Rb, Cs — 1 valence e⁻ → lose 1 to form M⁺" },
              { icon:"2️⃣", title:"Group 2 — Valency 2",  desc:"Be, Mg, Ca, Sr, Ba — 2 valence e⁻ → lose 2 to form M²⁺" },
              { icon:"3️⃣", title:"Group 13 — Valency 3", desc:"B, Al, Ga, In — 3 valence e⁻ → lose 3 or form 3 bonds" },
              { icon:"4️⃣", title:"Group 14 — Valency 4", desc:"C, Si, Ge, Sn — 4 valence e⁻ → form 4 covalent bonds" },
              { icon:"3️⃣", title:"Group 15 — Valency 3", desc:"N, P, As — 5 valence e⁻ → needs 3 more (8−5=3)" },
              { icon:"2️⃣", title:"Group 16 — Valency 2", desc:"O, S, Se — 6 valence e⁻ → needs 2 more (8−6=2)" },
              { icon:"1️⃣", title:"Group 17 — Valency 1", desc:"F, Cl, Br, I — 7 valence e⁻ → needs 1 more (8−7=1)" },
              { icon:"0️⃣", title:"Group 18 — Valency 0", desc:"He, Ne, Ar — 8 valence e⁻ (full octet) → inert/noble" },
            ].map(p => (
              <div className="pce-prop-card" key={p.title}>
                <span className="pce-prop-icon">{p.icon}</span>
                <div className="pce-prop-title">{p.title}</div>
                <div className="pce-prop-desc">{p.desc}</div>
              </div>
            ))}
          </div>

          <div className="pce-alert green">
            ✅ <strong>Key rule:</strong> Valency remains <strong>same down the group</strong> (same number of valence electrons). Across a period, valency <strong>first increases (1→4) then decreases (3→2→1→0)</strong>.
          </div>

          {/* Metallic character */}
          <div className="pce-sec-head" style={{marginTop:"40px"}}>
            <div className="pce-sec-num">4c</div>
            <div className="pce-sec-title-wrap">
              <div className="pce-sec-kicker">Trend 3</div>
              <h2 className="pce-sec-title">Metallic <span>Character</span></h2>
            </div>
          </div>
          <p className="pce-body-text">
            <strong>Metallic character</strong> is the tendency of an atom to lose electrons and form positive ions. Higher metallic character = lower ionisation energy = larger atomic size.
          </p>

          <div className="pce-compare-split">
            <div className="pce-compare-hdr">
              <div className="pce-compare-th left-col">⬇ Down the Group</div>
              <div className="pce-compare-th right-col">→ Across Period (L to R)</div>
            </div>
            {[
              ["Metallic character INCREASES ↑", "Metallic character DECREASES ↓"],
              ["Atomic size increases → outer electrons farther away", "Atomic size decreases → outer electrons held tightly"],
              ["Outer electrons more easily lost → easier to form M⁺", "Harder to lose electrons → non-metallic character increases"],
              ["Example: Na is less metallic than K, which is less than Rb", "Example: Na > Mg > Al > Si > P > S > Cl > Ar"],
            ].map(([l, r], i) => (
              <div className="pce-compare-row" key={i}>
                <div className="pce-compare-cell left-border">{l}</div>
                <div className="pce-compare-cell">{r}</div>
              </div>
            ))}
          </div>

          <div className="pce-pull-quote">
            <p>"Metals are on the left side of the periodic table, non-metals on the right — because metallic character decreases from left to right across a period. The most reactive metal (Caesium/Francium) is at the bottom-left; the most reactive non-metal (Fluorine) is at the top-right."</p>
          </div>

          {/* Ionisation energy */}
          <div className="pce-sec-head" style={{marginTop:"40px"}}>
            <div className="pce-sec-num">4d</div>
            <div className="pce-sec-title-wrap">
              <div className="pce-sec-kicker">Trend 4</div>
              <h2 className="pce-sec-title">Ionisation Energy <span>&amp; Electron Gain Enthalpy</span></h2>
            </div>
          </div>
          <p className="pce-body-text">
            <strong>Ionisation energy</strong> is the energy required to remove the outermost electron from a neutral gaseous atom. <strong>Electron gain enthalpy</strong> is the energy change when an electron is added to a neutral gaseous atom. Both follow the same periodic trend.
          </p>

          <div className="pce-periodicity-card">
            <div className="pce-per-title">📊 Ionisation Energy &amp; Electron Gain Enthalpy — Trends</div>
            <div className="pce-per-desc">
              Both ionisation energy and electron gain enthalpy follow the same pattern: they <strong>increase left to right across a period</strong> and <strong>decrease down a group</strong>.
            </div>
            <div className="pce-per-parts">
              <div className="pce-per-part">
                <div className="pce-per-part-name">↑ Increases — Across Period (L→R)</div>
                <div className="pce-per-part-desc">Nuclear charge increases. Atomic size decreases. Outermost electrons held more tightly. More energy needed to remove them. Non-metallic character increases.</div>
              </div>
              <div className="pce-per-part">
                <div className="pce-per-part-name">↓ Decreases — Down a Group</div>
                <div className="pce-per-part-desc">Atomic size increases. More electron shells provide greater shielding. Outer electrons are less tightly held. Less energy needed to remove them. Metallic character increases.</div>
              </div>
            </div>
          </div>

          <div className="pce-alert gold">
            ⚡ <strong>Connection:</strong> High ionisation energy = hard to lose electrons = <strong>non-metallic character</strong>. Low ionisation energy = easy to lose electrons = <strong>metallic character</strong>. Fluorine has the highest electron gain enthalpy — it most readily accepts electrons.
          </div>

          {/* ── S5: PERIODICITY ── */}
          <div className="pce-divider"><div className="pce-divider-mark" /></div>
          <div className="pce-sec-head">
            <div className="pce-sec-num">5</div>
            <div className="pce-sec-title-wrap">
              <div className="pce-sec-kicker">Why the Table Works</div>
              <h2 className="pce-sec-title">Periodicity in <span>Properties</span></h2>
            </div>
          </div>
          <p className="pce-body-text">
            <strong>Elements show periodicity</strong> because of their <strong>valence shell electronic configuration</strong>. As we move through the periodic table in order of increasing atomic number, after one shell is completely filled, the next shell starts filling — and elements with the same number of valence electrons repeat similar properties at regular intervals.
          </p>
          <p className="pce-body-text">
            All elements showing periodicity in properties have the <strong>same number of electrons in the last (valence) shell</strong>. For example:
          </p>

          <div className="pce-compare-split">
            <div className="pce-compare-hdr">
              <div className="pce-compare-th left-col">Element</div>
              <div className="pce-compare-th right-col">Configuration → Period &amp; Group</div>
            </div>
            {[
              ["Li (Z=3)",  "2,1 → Period 2, Group 1 — 1 valence e⁻"],
              ["Na (Z=11)", "2,8,1 → Period 3, Group 1 — 1 valence e⁻ (same as Li)"],
              ["K (Z=19)",  "2,8,8,1 → Period 4, Group 1 — 1 valence e⁻ (same as Na)"],
              ["O (Z=8)",   "2,6 → Period 2, Group 16 — 6 valence e⁻"],
              ["S (Z=16)",  "2,8,6 → Period 3, Group 16 — 6 valence e⁻ (same as O)"],
              ["Ne (Z=10)", "2,8 → Period 2, Group 18 — 8 valence e⁻ (complete octet)"],
              ["Ar (Z=18)", "2,8,8 → Period 3, Group 18 — 8 valence e⁻ (same as Ne)"],
            ].map(([l, r], i) => (
              <div className="pce-compare-row" key={i}>
                <div className="pce-compare-cell left-border" style={{fontFamily:"'Poppins',sans-serif",fontWeight:700}}>{l}</div>
                <div className="pce-compare-cell">{r}</div>
              </div>
            ))}
          </div>

          <div className="pce-alert green">
            ✅ <strong>Summary:</strong> Same group = same valence electrons = same chemical properties. Period number = number of electron shells. Atomic number increases left to right and top to bottom. This is why the periodic table is the most powerful tool in chemistry.
          </div>

          {/* FAQ */}
          <div className="pce-divider"><div className="pce-divider-mark" /></div>
          <div className="pce-faq-header"><span className="pce-faq-kicker">Exam Preparation</span></div>
          <h2 className="pce-faq-title">Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div className={`pce-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="pce-faq-q" onClick={() => toggle(i)}>
                <span className="pce-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="pce-faq-icon">+</span>
              </button>
              <div className={`pce-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
