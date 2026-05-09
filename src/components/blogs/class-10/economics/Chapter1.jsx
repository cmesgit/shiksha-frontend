import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:        #0d1520;
    --ink2:       #1a2535;
    --muted:      #4a5f7a;
    --paper:      #f2f6fb;
    --paper2:     #e4edf8;
    --accent:     #0a6ebd;
    --accent2:    #084f8a;
    --accent-lt:  #deeeff;
    --gold:       #c47d00;
    --gold-lt:    #fff8e6;
    --teal:       #047a72;
    --teal-lt:    #e0f5f3;
    --rule:       #c0d4ea;
    --white:      #ffffff;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .dev-root {
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
  }

  /* ─────────────────────────────────────────
     HERO — deep ocean-blue dark gradient
  ───────────────────────────────────────── */
  .dev-hero {
    background: linear-gradient(135deg, #020d1a 0%, #051a32 45%, #07264a 100%);
    min-height: 88vh;
    display: flex;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
    padding: 0 0 64px;
  }

  /* Top accent bar — teal to gold */
  .dev-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 6px;
    background: linear-gradient(90deg, #0a6ebd 0%, #047a72 50%, #c47d00 100%);
  }

  /* Ghost chapter number */
  .dev-hero-bg-num {
    position: absolute;
    bottom: -60px;
    right: -30px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(220px, 36vw, 500px);
    font-weight: 900;
    line-height: 1;
    color: rgba(255,255,255,0.025);
    letter-spacing: -0.04em;
    user-select: none;
    pointer-events: none;
  }

  /* Floating grid lines watermark */
  .dev-hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(10,110,189,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(10,110,189,0.06) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  /* Glowing circle accent */
  .dev-hero-glow {
    position: absolute;
    top: 10%;
    right: 8%;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(10,110,189,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .dev-hero-inner {
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding: 0 32px;
    position: relative;
    z-index: 1;
  }

  .dev-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #4db8ff;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .dev-overline::before,
  .dev-overline::after {
    content: '';
    flex: 0 0 40px;
    height: 1px;
    background: #4db8ff;
  }

  .dev-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(44px, 8vw, 88px);
    font-weight: 900;
    color: #fff;
    line-height: 0.95;
    letter-spacing: -0.03em;
    margin-bottom: 32px;
  }
  .dev-hero-title em {
    font-style: normal;
    color: #4db8ff;
  }
  .dev-hero-title .gold-em {
    color: #f5b942;
  }

  .dev-hero-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 24px;
    margin-top: 8px;
  }
  .dev-hero-bar-item {
    flex: 1 1 180px;
    padding: 0 24px 0 0;
    border-right: 1px solid rgba(255,255,255,0.1);
    margin-right: 24px;
  }
  .dev-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .dev-bar-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 5px;
  }
  .dev-bar-value {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 600;
    color: rgba(255,255,255,0.75);
  }

  /* ─────────────────────────────────────────
     BODY WRAPPER
  ───────────────────────────────────────── */
  .dev-body {
    max-width: 860px;
    margin: 0 auto;
    padding: 72px 32px 96px;
  }

  /* ─────────────────────────────────────────
     DARK INTRO CARD
  ───────────────────────────────────────── */
  .dev-intro-card {
    background: linear-gradient(135deg, #051a32 0%, #07264a 100%);
    border-left: 5px solid #4db8ff;
    border-radius: 4px;
    padding: 36px 40px;
    margin-bottom: 64px;
    position: relative;
    overflow: hidden;
  }
  .dev-intro-card::after {
    content: '💡';
    position: absolute;
    right: 28px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 56px;
    opacity: 0.12;
  }
  .dev-intro-card p {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 500;
    color: rgba(255,255,255,0.88);
    line-height: 1.78;
    margin: 0 0 14px;
  }
  .dev-intro-card p:last-child { margin: 0; }
  .dev-intro-card strong { color: #4db8ff; }

  /* ─────────────────────────────────────────
     SECTION HEADER
  ───────────────────────────────────────── */
  .dev-sec-head {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 28px;
    border-bottom: 2px solid var(--rule);
    padding-bottom: 18px;
  }
  .dev-sec-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 56px;
    font-weight: 900;
    color: var(--rule);
    line-height: 1;
    flex-shrink: 0;
  }
  .dev-sec-title-wrap { padding-top: 8px; }
  .dev-sec-kicker {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 6px;
  }
  .dev-sec-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(22px, 3.5vw, 30px);
    font-weight: 800;
    color: var(--ink);
    line-height: 1.15;
    letter-spacing: -0.02em;
  }
  .dev-sec-title span { color: var(--accent); }

  /* ─────────────────────────────────────────
     BODY TEXT
  ───────────────────────────────────────── */
  .dev-body-text {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: var(--ink2);
    line-height: 1.85;
    margin-bottom: 28px;
  }
  .dev-body-text strong { color: var(--accent2); font-weight: 600; }

  /* ─────────────────────────────────────────
     DIVIDER
  ───────────────────────────────────────── */
  .dev-divider {
    margin: 56px 0;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .dev-divider::before,
  .dev-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--rule);
  }
  .dev-divider-mark {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--accent);
    flex-shrink: 0;
  }

  /* ─────────────────────────────────────────
     HIGHLIGHT CARDS GRID (2-col)
  ───────────────────────────────────────── */
  .dev-card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 36px;
  }
  @media (max-width: 620px) {
    .dev-card-grid { grid-template-columns: 1fr; }
  }

  .dev-card {
    border-radius: 6px;
    padding: 28px 28px 24px;
    border: 1.5px solid var(--rule);
    background: var(--white);
  }
  .dev-card.dark {
    background: linear-gradient(135deg, #051a32, #0a2b4d);
    border-color: transparent;
    color: rgba(255,255,255,0.85);
  }
  .dev-card.teal {
    background: var(--teal-lt);
    border-color: #9fd7d4;
  }
  .dev-card.gold {
    background: var(--gold-lt);
    border-color: #f0c96a;
  }
  .dev-card-tag {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 10px;
  }
  .dev-card.dark .dev-card-tag { color: #7dcfff; }
  .dev-card.teal .dev-card-tag { color: var(--teal); }
  .dev-card.gold .dev-card-tag { color: var(--gold); }

  .dev-card-title {
    font-family: 'Poppins', sans-serif;
    font-size: 17px; font-weight: 700;
    color: var(--ink);
    margin-bottom: 14px;
    line-height: 1.3;
  }
  .dev-card.dark .dev-card-title { color: #fff; }
  .dev-card.teal .dev-card-title { color: var(--teal); }
  .dev-card.gold .dev-card-title { color: var(--gold); }

  .dev-card ul {
    list-style: none;
    padding: 0;
  }
  .dev-card ul li {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 400;
    color: var(--ink2);
    padding: 7px 0 7px 18px;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    position: relative;
    line-height: 1.6;
  }
  .dev-card.dark ul li { color: rgba(255,255,255,0.78); border-bottom-color: rgba(255,255,255,0.07); }
  .dev-card ul li:last-child { border-bottom: none; }
  .dev-card ul li::before {
    content: '';
    position: absolute;
    left: 0; top: 50%;
    transform: translateY(-50%);
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--accent);
  }
  .dev-card.dark ul li::before { background: #4db8ff; }
  .dev-card.teal ul li::before { background: var(--teal); }
  .dev-card.gold ul li::before { background: var(--gold); }
  .dev-card ul li strong { color: var(--accent2); font-weight: 600; }
  .dev-card.dark ul li strong { color: #7dcfff; }

  /* ─────────────────────────────────────────
     STAT BOXES ROW
  ───────────────────────────────────────── */
  .dev-stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 36px;
  }
  @media (max-width: 620px) {
    .dev-stats-row { grid-template-columns: 1fr; }
  }
  .dev-stat-box {
    background: var(--white);
    border: 1.5px solid var(--rule);
    border-top: 4px solid var(--accent);
    border-radius: 4px;
    padding: 24px 20px;
    text-align: center;
  }
  .dev-stat-box.gold-top { border-top-color: var(--gold); }
  .dev-stat-box.teal-top { border-top-color: var(--teal); }

  .dev-stat-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 30px; font-weight: 900;
    color: var(--accent);
    line-height: 1;
    margin-bottom: 6px;
  }
  .dev-stat-box.gold-top .dev-stat-num { color: var(--gold); }
  .dev-stat-box.teal-top .dev-stat-num { color: var(--teal); }

  .dev-stat-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 600;
    color: var(--muted);
    line-height: 1.4;
  }
  .dev-stat-sub {
    font-family: 'Inter', sans-serif;
    font-size: 11px; font-weight: 400;
    color: var(--muted);
    margin-top: 4px;
  }

  /* ─────────────────────────────────────────
     INFO / KEY TERMS TABLE
  ───────────────────────────────────────── */
  .dev-table-wrap {
    border: 1.5px solid var(--rule);
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 36px;
  }
  .dev-table-title {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    letter-spacing: 0.08em;
    background: var(--ink);
    color: #fff;
    padding: 14px 24px;
    text-transform: uppercase;
  }
  .dev-table-row {
    display: flex;
    border-bottom: 1px solid var(--rule);
  }
  .dev-table-row:last-child { border-bottom: none; }
  .dev-table-key {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    color: var(--accent2);
    width: 200px;
    flex-shrink: 0;
    padding: 14px 20px;
    background: var(--paper2);
    border-right: 1px solid var(--rule);
    display: flex;
    align-items: center;
  }
  .dev-table-val {
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 400;
    color: var(--ink2);
    padding: 14px 20px;
    line-height: 1.65;
    flex: 1;
  }
  .dev-table-val strong { color: var(--accent2); font-weight: 600; }

  /* ─────────────────────────────────────────
     COMPARISON BLOCK (Kerala vs Maharashtra vs Bihar)
  ───────────────────────────────────────── */
  .dev-compare-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 36px;
  }
  @media (max-width: 640px) {
    .dev-compare-grid { grid-template-columns: 1fr; }
  }
  .dev-compare-card {
    border-radius: 6px;
    padding: 24px 20px;
    border: 1.5px solid var(--rule);
    background: var(--white);
    text-align: center;
  }
  .dev-compare-card.rank1 {
    background: linear-gradient(160deg, #051a32, #0a3060);
    border-color: transparent;
  }
  .dev-compare-card.rank2 {
    background: var(--teal-lt);
    border-color: #9fd7d4;
  }
  .dev-compare-card.rank3 {
    background: var(--gold-lt);
    border-color: #f0c96a;
  }
  .dev-compare-rank {
    font-family: 'Montserrat', sans-serif;
    font-size: 36px; font-weight: 900;
    line-height: 1;
    margin-bottom: 8px;
  }
  .dev-compare-card.rank1 .dev-compare-rank { color: #4db8ff; }
  .dev-compare-card.rank2 .dev-compare-rank { color: var(--teal); }
  .dev-compare-card.rank3 .dev-compare-rank { color: var(--gold); }
  .dev-compare-state {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 700;
    margin-bottom: 4px;
  }
  .dev-compare-card.rank1 .dev-compare-state { color: #fff; }
  .dev-compare-card.rank2 .dev-compare-state { color: var(--teal); }
  .dev-compare-card.rank3 .dev-compare-state { color: var(--gold); }
  .dev-compare-label {
    font-family: 'Inter', sans-serif;
    font-size: 12px; font-weight: 400;
    color: var(--muted);
    margin-bottom: 14px;
  }
  .dev-compare-card.rank1 .dev-compare-label { color: rgba(255,255,255,0.45); }
  .dev-compare-note {
    font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 400;
    line-height: 1.6;
    color: var(--ink2);
    text-align: left;
  }
  .dev-compare-card.rank1 .dev-compare-note { color: rgba(255,255,255,0.78); }
  .dev-compare-card.rank2 .dev-compare-note { color: #1a5e5a; }
  .dev-compare-card.rank3 .dev-compare-note { color: #7a4d00; }

  /* ─────────────────────────────────────────
     PULL QUOTE
  ───────────────────────────────────────── */
  .dev-pull-quote {
    border-left: 5px solid var(--accent);
    background: var(--accent-lt);
    padding: 28px 36px;
    margin: 36px 0;
    border-radius: 0 4px 4px 0;
  }
  .dev-pull-quote p {
    font-family: 'Poppins', sans-serif;
    font-size: 18px; font-weight: 600;
    color: var(--accent2);
    line-height: 1.7;
    font-style: italic;
    margin: 0 0 12px;
  }
  .dev-pull-quote cite {
    font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 500;
    color: var(--muted);
    font-style: normal;
  }

  /* ─────────────────────────────────────────
     GOALS LIST — horizontal pill tags
  ───────────────────────────────────────── */
  .dev-goals-wrap {
    margin-bottom: 36px;
  }
  .dev-goals-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 16px;
  }
  .dev-goals-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .dev-pill {
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 600;
    padding: 8px 18px;
    border-radius: 100px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .dev-pill.blue  { background: var(--accent-lt); color: var(--accent2); }
  .dev-pill.teal  { background: var(--teal-lt);   color: var(--teal); }
  .dev-pill.gold  { background: var(--gold-lt);   color: var(--gold); }
  .dev-pill.dark  { background: #e8edf5;           color: var(--ink2); }

  /* ─────────────────────────────────────────
     SUSTAINABILITY STEPS — vertical track
  ───────────────────────────────────────── */
  .dev-track {
    position: relative;
    padding-left: 52px;
    margin-bottom: 36px;
  }
  .dev-track::before {
    content: '';
    position: absolute;
    left: 18px; top: 8px; bottom: 8px;
    width: 2px;
    background: linear-gradient(to bottom, var(--accent), var(--teal));
  }
  .dev-track-item {
    position: relative;
    margin-bottom: 32px;
  }
  .dev-track-item:last-child { margin-bottom: 0; }
  .dev-track-dot {
    position: absolute;
    left: -40px; top: 4px;
    width: 16px; height: 16px;
    border-radius: 50%;
    background: var(--accent);
    border: 3px solid var(--paper);
    box-shadow: 0 0 0 2px var(--accent);
  }
  .dev-track-item:nth-child(2) .dev-track-dot { background: var(--teal); box-shadow: 0 0 0 2px var(--teal); }
  .dev-track-item:nth-child(3) .dev-track-dot { background: var(--gold); box-shadow: 0 0 0 2px var(--gold); }
  .dev-track-item:nth-child(4) .dev-track-dot { background: #e05252; box-shadow: 0 0 0 2px #e05252; }
  .dev-track-head {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; font-weight: 700;
    color: var(--ink);
    margin-bottom: 7px;
  }
  .dev-track-desc {
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 400;
    color: var(--ink2);
    line-height: 1.7;
  }
  .dev-track-desc strong { color: var(--accent2); font-weight: 600; }

  /* ─────────────────────────────────────────
     FAQ SECTION
  ───────────────────────────────────────── */
  .dev-faq-header {
    margin-bottom: 12px;
  }
  .dev-faq-kicker {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    background: var(--accent-lt);
    padding: 6px 16px;
    border-radius: 100px;
  }
  .dev-faq-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(26px, 4vw, 36px);
    font-weight: 900;
    color: var(--ink);
    letter-spacing: -0.02em;
    margin-bottom: 28px;
    margin-top: 16px;
  }
  .dev-faq-item {
    border: 1.5px solid var(--rule);
    border-radius: 6px;
    margin-bottom: 12px;
    overflow: hidden;
    background: var(--white);
    transition: border-color 0.2s;
  }
  .dev-faq-item.open {
    border-color: var(--accent);
  }
  .dev-faq-q {
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    text-align: left;
    gap: 16px;
  }
  .dev-faq-q-text {
    font-family: 'Poppins', sans-serif;
    font-size: 15px; font-weight: 600;
    color: var(--ink);
    line-height: 1.5;
  }
  .dev-faq-item.open .dev-faq-q-text { color: var(--accent); }
  .dev-faq-icon {
    font-family: 'Montserrat', sans-serif;
    font-size: 22px; font-weight: 700;
    color: var(--accent);
    flex-shrink: 0;
    transition: transform 0.2s;
  }
  .dev-faq-item.open .dev-faq-icon { transform: rotate(45deg); }

  .dev-faq-ans {
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 400;
    color: var(--ink2);
    line-height: 1.8;
    padding: 0 24px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
  }
  .dev-faq-ans.visible {
    max-height: 600px;
    padding: 0 24px 20px;
  }
  .dev-faq-ans strong { color: var(--accent2); font-weight: 600; }

  /* ─────────────────────────────────────────
     RESPONSIVE
  ───────────────────────────────────────── */
  @media (max-width: 700px) {
    .dev-body { padding: 48px 20px 72px; }
    .dev-hero-inner { padding: 0 20px; }
    .dev-intro-card { padding: 24px 24px; }
    .dev-table-key { width: 130px; font-size: 12px; padding: 12px 14px; }
    .dev-table-val { font-size: 14px; padding: 12px 14px; }
  }
`;

const faqs = [
  {
    q: "What is development? What do different people seek from development?",
    a: (
      <>
        Development refers to the idea of <strong>progress</strong> — fulfilling aspirations and desires about how we would like to live.
        Different people seek different things: a <strong>landless rural labourer</strong> may want regular work and better wages;
        a <strong>prosperous farmer</strong> may want higher support prices for crops; an <strong>urban woman</strong> may want equal
        treatment and security. What is development for one person may even be <strong>destructive for another</strong>.
      </>
    ),
  },
  {
    q: "What is per capita income? Why is it used to compare countries?",
    a: (
      <>
        <strong>Per capita income</strong> is the average income, calculated by dividing the total income of a country by its total population.
        Total income alone is not useful for comparison because countries differ in population size.
        Per capita income gives a <strong>fairer basis for comparison</strong> between countries with different populations.
      </>
    ),
  },
  {
    q: "What are rich countries and low-income countries as per the World Bank?",
    a: (
      <>
        According to the <strong>World Development Report</strong> by the World Bank (2013 data):
        Countries with per capita income of <strong>USD 12,736 per annum or above</strong> are called <strong>rich countries</strong>.
        Countries with per capita income of <strong>USD 1,570 or less</strong> are called <strong>low-income countries</strong>.
        India falls in the <strong>low middle-income</strong> category with a per capita income of just US$1,570 in 2013.
      </>
    ),
  },
  {
    q: "Why is income alone not an adequate measure of development?",
    a: (
      <>
        Income alone does not capture <strong>quality of life</strong>. Money cannot buy a pollution-free environment, ensure
        unadulterated medicines, or protect from infectious diseases without community-level public health measures.
        People also need <strong>equal treatment, freedom, security, and respect</strong> — things not easily measured
        but very important to life. Development requires a <strong>mix of goals</strong>, not just higher income.
      </>
    ),
  },
  {
    q: "What are public facilities? Give examples.",
    a: (
      <>
        <strong>Public facilities</strong> are goods and services that money alone cannot easily buy — things that depend
        on collective provision. Examples include: <strong>pollution-free environment, unadulterated medicines,
        protection from infectious disease, safe drinking water, public schools, and hospitals</strong>.
        These require government action and community-wide effort, and cannot be purchased individually by most citizens.
      </>
    ),
  },
  {
    q: "What is Human Development?",
    a: (
      <>
        <strong>Human Development</strong> refers to the development of an individual in such a way that they are able to
        earn and <strong>fulfill their materialistic and non-materialistic desires</strong>. It goes beyond income to include
        access to education, health, dignity, and freedom. A higher per capita income country does not necessarily rank
        highest in human development — for example, <strong>Kerala ranks higher than Maharashtra</strong> on social indicators
        despite Maharashtra having a higher per capita income.
      </>
    ),
  },
  {
    q: "What is sustainability of development? Why is it important?",
    a: (
      <>
        <strong>Sustainability of development</strong> means development that meets the needs of the present without
        compromising the ability of future generations to meet their own needs. Scientists have warned since the
        second half of the 20th century that <strong>current levels of development are not sustainable</strong>. For example,
        over-extraction of <strong>groundwater beyond natural replenishment rates</strong> is unsustainable.
        Environmental degradation crosses national boundaries, making this a <strong>global concern</strong>.
      </>
    ),
  },
  {
    q: "How should we compare different states or countries for development?",
    a: (
      <>
        We compare countries or states using one or more important <strong>characteristics or indicators</strong>:
        <br /><br />
        • <strong>Per Capita Income</strong> — most commonly used; higher income = more developed
        <br />
        • <strong>Infant Mortality Rate (IMR)</strong> — children dying before age 1 per 1000 live births
        <br />
        • <strong>Literacy Rate</strong> — percentage of literate population aged 7 and above
        <br />
        • <strong>Net Attendance Ratio</strong> — enrollment in schools
        <br /><br />
        Using <strong>multiple criteria</strong> gives a more complete and fair picture of development.
      </>
    ),
  },
  {
    q: "What is national development? How can it be achieved?",
    a: (
      <>
        <strong>National development</strong> means thinking about a <strong>fair and just path for all citizens</strong>
        — asking whether there is a better way of doing things that serves everyone.
        Since different people have conflicting notions of development, it is only through a <strong>democratic
        political process</strong> that these hopes and possibilities can be achieved in real life.
      </>
    ),
  },
];

export default function Development() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>

      <div className="dev-root">

        {/* ── HERO ── */}
        <div className="dev-hero">
          <div className="dev-hero-grid" />
          <div className="dev-hero-glow" />
          <div className="dev-hero-bg-num">01</div>

          <div className="dev-hero-inner">
            <div className="dev-overline">Economics · Class 10 · Chapter 1</div>

            <h1 className="dev-hero-title">
              <em>Develop</em>
              <span className="gold-em">ment</span>
            </h1>

            <div className="dev-hero-bar">
              {[
                { label: "Subject",   value: "Economics" },
                { label: "Class",     value: "10th Standard" },
                { label: "Chapter",   value: "Chapter 1" },
                { label: "Board",     value: "CBSE / NCERT" },
              ].map((x) => (
                <div className="dev-hero-bar-item" key={x.label}>
                  <div className="dev-bar-label">{x.label}</div>
                  <div className="dev-bar-value">{x.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="dev-body">

          {/* Dark intro card */}
          <div className="dev-intro-card">
            <p>
              <strong>Development</strong> is more than just income — it is about fulfilling human aspirations,
              ensuring equal opportunities, and building a society where every individual can live with
              dignity, freedom, and security.
            </p>
            <p>
              It is only through a <strong>democratic political process</strong> that the hopes and
              possibilities of all people can be achieved in real life.
            </p>
          </div>

          {/* ── SECTION 1: What Development Promises ── */}
          <div className="dev-sec-head">
            <div className="dev-sec-num">1</div>
            <div className="dev-sec-title-wrap">
              <div className="dev-sec-kicker">Core Concept</div>
              <h2 className="dev-sec-title">What <span>Development</span> Promises</h2>
            </div>
          </div>

          <p className="dev-body-text">
            Different people and groups have <strong>different developmental goals</strong>. What may be
            development for one person may not be development for another — it may even be
            destructive for the other. Two key facts emerge:
          </p>

          <div className="dev-card-grid">
            <div className="dev-card dark">
              <div className="dev-card-tag">Key Fact · 1</div>
              <div className="dev-card-title">Different Goals for Different People</div>
              <ul>
                <li>A <strong>landless labourer</strong> wants regular work &amp; better wages</li>
                <li>A <strong>prosperous farmer</strong> wants higher support prices for crops</li>
                <li>An <strong>urban employed woman</strong> wants equal treatment &amp; security</li>
                <li>Goals are shaped by one's <strong>position in society</strong></li>
              </ul>
            </div>
            <div className="dev-card">
              <div className="dev-card-tag">Key Fact · 2</div>
              <div className="dev-card-title">Conflicting Development Goals</div>
              <ul>
                <li>Development for one may be <strong>destructive for another</strong></li>
                <li>Industrialists want <strong>cheap labour</strong>; workers want <strong>higher wages</strong></li>
                <li>Dams provide water but <strong>displace communities</strong></li>
                <li>Aspirations can be <strong>in direct conflict</strong></li>
              </ul>
            </div>
          </div>

          {/* ── SECTION 2: Income and Other Goals ── */}
          <div className="dev-divider"><div className="dev-divider-mark" /></div>

          <div className="dev-sec-head">
            <div className="dev-sec-num">2</div>
            <div className="dev-sec-title-wrap">
              <div className="dev-sec-kicker">Beyond the Wallet</div>
              <h2 className="dev-sec-title">Income &amp; <span>Other Goals</span></h2>
            </div>
          </div>

          <p className="dev-body-text">
            People want more than just money. While <strong>income</strong> is crucial, development goals
            also include non-material needs that are harder to measure but equally important.
          </p>

          <div className="dev-goals-wrap">
            <div className="dev-goals-label">What People Seek — Developmental Goals</div>
            <div className="dev-goals-pills">
              {[
                { label: "💰 Regular Work",         cls: "blue" },
                { label: "📈 Better Wages",         cls: "blue" },
                { label: "🌾 Fair Crop Prices",     cls: "teal" },
                { label: "⚖️ Equal Treatment",      cls: "gold" },
                { label: "🕊️ Freedom",               cls: "teal" },
                { label: "🔒 Security",              cls: "dark" },
                { label: "🤝 Respect for Others",   cls: "gold" },
                { label: "🏥 Access to Healthcare", cls: "blue" },
                { label: "📚 Education",             cls: "teal" },
                { label: "🌿 Clean Environment",    cls: "dark" },
              ].map((p) => (
                <span className={`dev-pill ${p.cls}`} key={p.label}>{p.label}</span>
              ))}
            </div>
          </div>

          <div className="dev-pull-quote">
            <p>
              "Money, or material things one can buy with it, is one of the factors on which our life depends —
              but not the only one. Many things that cannot be measured still mean a lot to our lives."
            </p>
            <cite>— NCERT Economics, Chapter 1</cite>
          </div>

          {/* ── SECTION 3: National Development ── */}
          <div className="dev-divider"><div className="dev-divider-mark" /></div>

          <div className="dev-sec-head">
            <div className="dev-sec-num">3</div>
            <div className="dev-sec-title-wrap">
              <div className="dev-sec-kicker">Macro Perspective</div>
              <h2 className="dev-sec-title">National <span>Development</span></h2>
            </div>
          </div>

          <div className="dev-table-wrap">
            <div className="dev-table-title">📋 National Development — Key Points</div>
            {[
              ["Definition",      "Thinking about a fair and just path for all — asking if there is a better way of doing things for everyone in the country."],
              ["Core Challenge",  "Different persons have different and often conflicting notions of development for the country."],
              ["How to Achieve",  "Only through a democratic political process can the hopes and possibilities of all be achieved in real life."],
              ["Central Question","What is a fair and just path for all? What should be prioritised for the nation's progress?"],
            ].map(([k, v]) => (
              <div className="dev-table-row" key={k}>
                <div className="dev-table-key">{k}</div>
                <div className="dev-table-val">{v}</div>
              </div>
            ))}
          </div>

          {/* ── SECTION 4: Comparing Countries — Per Capita Income ── */}
          <div className="dev-divider"><div className="dev-divider-mark" /></div>

          <div className="dev-sec-head">
            <div className="dev-sec-num">4</div>
            <div className="dev-sec-title-wrap">
              <div className="dev-sec-kicker">Measuring Progress</div>
              <h2 className="dev-sec-title">Comparing <span>Countries &amp; States</span></h2>
            </div>
          </div>

          <p className="dev-body-text">
            The most commonly used method to compare countries is <strong>per capita income</strong>
            (average income per person). The World Bank uses this to classify nations.
          </p>

          <div className="dev-stats-row">
            <div className="dev-stat-box">
              <div className="dev-stat-num">$12,736+</div>
              <div className="dev-stat-label">Rich / High-Income Countries</div>
              <div className="dev-stat-sub">Per capita income per annum (2013)</div>
            </div>
            <div className="dev-stat-box gold-top">
              <div className="dev-stat-num">$1,570</div>
              <div className="dev-stat-label">Low-Income Countries</div>
              <div className="dev-stat-sub">India's per capita income in 2013</div>
            </div>
            <div className="dev-stat-box teal-top">
              <div className="dev-stat-num">Middle</div>
              <div className="dev-stat-label">India's Category</div>
              <div className="dev-stat-sub">Low Middle-Income Country (World Bank)</div>
            </div>
          </div>

          <p className="dev-body-text">
            Comparing Indian states reveals that <strong>per capita income alone can be misleading</strong>.
            Kerala has lower per capita income than Maharashtra but scores much higher on social indicators
            like literacy and infant mortality rate.
          </p>

          <div className="dev-compare-grid">
            <div className="dev-compare-card rank1">
              <div className="dev-compare-rank">#1</div>
              <div className="dev-compare-state">Maharashtra</div>
              <div className="dev-compare-label">Highest Per Capita Income</div>
              <div className="dev-compare-note">Highest per capita income among the three states. Often cited as most developed by income alone.</div>
            </div>
            <div className="dev-compare-card rank2">
              <div className="dev-compare-rank">#2</div>
              <div className="dev-compare-state">Kerala</div>
              <div className="dev-compare-label">Best Social Indicators</div>
              <div className="dev-compare-note">Lower per capita income but superior literacy rate, low infant mortality, and better quality of life.</div>
            </div>
            <div className="dev-compare-card rank3">
              <div className="dev-compare-rank">#3</div>
              <div className="dev-compare-state">Bihar</div>
              <div className="dev-compare-label">Lowest Per Capita Income</div>
              <div className="dev-compare-note">Ranks lowest in per capita income. Highlights the need for multi-dimensional development goals.</div>
            </div>
          </div>

          {/* ── SECTION 5: Public Facilities ── */}
          <div className="dev-divider"><div className="dev-divider-mark" /></div>

          <div className="dev-sec-head">
            <div className="dev-sec-num">5</div>
            <div className="dev-sec-title-wrap">
              <div className="dev-sec-kicker">Collective Needs</div>
              <h2 className="dev-sec-title">Public <span>Facilities</span> &amp; Human Development</h2>
            </div>
          </div>

          <div className="dev-card-grid">
            <div className="dev-card teal">
              <div className="dev-card-tag">Why Money Isn't Enough</div>
              <div className="dev-card-title">Public Facilities</div>
              <ul>
                <li>Money <strong>cannot buy</strong> a pollution-free environment</li>
                <li>Money cannot <strong>guarantee unadulterated medicines</strong></li>
                <li>Protection from <strong>infectious diseases</strong> requires community action</li>
                <li>These need <strong>government provision</strong> and collective effort</li>
                <li>Income alone is <strong>not a completely adequate indicator</strong></li>
              </ul>
            </div>
            <div className="dev-card gold">
              <div className="dev-card-tag">Broader Measure</div>
              <div className="dev-card-title">Human Development</div>
              <ul>
                <li>Development of an individual to <strong>earn and fulfill desires</strong></li>
                <li>Includes <strong>literacy rate</strong> and education access</li>
                <li>Includes <strong>infant mortality rate</strong> (IMR)</li>
                <li>Includes <strong>net attendance ratio</strong> in schools</li>
                <li>Kerala example: <strong>better HDI despite lower income</strong></li>
              </ul>
            </div>
          </div>

          {/* ── SECTION 6: Sustainability ── */}
          <div className="dev-divider"><div className="dev-divider-mark" /></div>

          <div className="dev-sec-head">
            <div className="dev-sec-num">6</div>
            <div className="dev-sec-title-wrap">
              <div className="dev-sec-kicker">Future of Progress</div>
              <h2 className="dev-sec-title">Sustainability of <span>Development</span></h2>
            </div>
          </div>

          <p className="dev-body-text">
            Since the <strong>second half of the 20th century</strong>, scientists have warned that the present
            type and levels of development are <strong>not sustainable</strong>. Development today must not
            compromise the ability of future generations to meet their own needs.
          </p>

          <div className="dev-track">
            <div className="dev-track-item">
              <div className="dev-track-dot" />
              <div className="dev-track-head">Renewable vs Non-Renewable Resources</div>
              <div className="dev-track-desc">
                Resources like <strong>crops and plants</strong> are replenished by nature. But resources like
                <strong> petroleum and coal</strong> are exhaustible — once used, they cannot be renewed.
              </div>
            </div>
            <div className="dev-track-item">
              <div className="dev-track-dot" />
              <div className="dev-track-head">Groundwater Over-extraction</div>
              <div className="dev-track-desc">
                If we use <strong>more groundwater than is replenished by rain</strong>, we are overusing
                this resource — threatening water security for future generations.
              </div>
            </div>
            <div className="dev-track-item">
              <div className="dev-track-dot" />
              <div className="dev-track-head">Interdisciplinary Challenge</div>
              <div className="dev-track-desc">
                Sustainability is a <strong>new area of knowledge</strong> where scientists, economists,
                philosophers, and social scientists work together to find solutions.
              </div>
            </div>
            <div className="dev-track-item">
              <div className="dev-track-dot" />
              <div className="dev-track-head">Environmental Degradation — A Global Problem</div>
              <div className="dev-track-desc">
                Consequences of environmental degradation <strong>do not respect national or state boundaries</strong>.
                This is no longer a region-specific issue — it is a <strong>global responsibility</strong>.
              </div>
            </div>
          </div>

          {/* ── FAQ ── */}
          <div className="dev-divider"><div className="dev-divider-mark" /></div>

          <div className="dev-faq-header">
            <span className="dev-faq-kicker">Exam Preparation</span>
          </div>
          <h2 className="dev-faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, i) => (
            <div className={`dev-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="dev-faq-q" onClick={() => toggle(i)}>
                <span className="dev-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="dev-faq-icon">+</span>
              </button>
              <div className={`dev-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
