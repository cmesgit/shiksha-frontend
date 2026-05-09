import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --cd-char:      #141210;
    --cd-char2:     #0d0b09;
    --cd-char3:     #1e1c18;
    --cd-orange:    #ea580c;
    --cd-orange2:   #c2410c;
    --cd-orange3:   #9a3412;
    --cd-orange-lt: #fff7ed;
    --cd-orange-md: #fed7aa;
    --cd-warm:      #faf8f4;
    --cd-warm2:     #f2ede4;
    --cd-warm3:     #e4ddd0;
    --cd-ink:       #0f0e0c;
    --cd-ink2:      #1e1c18;
    --cd-muted:     #78716c;
    --cd-rule:      #ddd8d0;
    --cd-gold:      #ca8a04;
    --cd-gold-lt:   #fefce8;
    --cd-green:     #15803d;
    --cd-green-lt:  #f0fdf4;
    --cd-blue:      #1d4ed8;
    --cd-blue-lt:   #eff6ff;
    --cd-white:     #ffffff;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .cd-root {
    font-family: 'Inter', sans-serif;
    background: var(--cd-warm);
    color: var(--cd-ink);
    min-height: 100vh;
  }

  /* ══ HERO ══ */
  .cd-hero {
    background: var(--cd-char2);
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    position: relative; overflow: hidden;
  }
  /* Orange top stripe */
  .cd-hero::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, var(--cd-orange3), var(--cd-orange), #fb923c, var(--cd-orange), var(--cd-orange3));
  }
  /* Ghost 8 */
  .cd-hero-ghost {
    position: absolute; right: -20px; bottom: -50px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(240px, 38vw, 520px); font-weight: 900; line-height: 1;
    color: rgba(234,88,12,0.07); letter-spacing: -0.06em;
    pointer-events: none; user-select: none;
  }
  /* Diagonal lines */
  .cd-hero::after {
    content: ''; position: absolute; inset: 0;
    background: repeating-linear-gradient(
      -50deg, transparent, transparent 64px,
      rgba(234,88,12,0.03) 64px, rgba(234,88,12,0.03) 65px
    );
    pointer-events: none;
  }

  /* Nav */
  .cd-hero-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 32px 56px 0; position: relative; z-index: 2;
  }
  .cd-nav-brand {
    font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 900;
    letter-spacing: 0.26em; text-transform: uppercase;
    color: rgba(255,255,255,0.25);
  }
  .cd-nav-pill {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--cd-orange); border: 1px solid rgba(234,88,12,0.4);
    padding: 6px 16px; background: rgba(234,88,12,0.08);
  }

  /* Center */
  .cd-hero-center {
    display: flex; flex-direction: column; justify-content: center;
    padding: 44px 56px 0; position: relative; z-index: 2;
  }
  .cd-hero-eyebrow {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 0.24em; text-transform: uppercase;
    color: var(--cd-orange); margin-bottom: 24px;
    display: flex; align-items: center; gap: 14px;
  }
  .cd-hero-eyebrow::before {
    content: ''; width: 32px; height: 2px;
    background: var(--cd-orange); flex-shrink: 0;
  }
  .cd-hero-h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(42px, 7.5vw, 100px);
    font-weight: 900; line-height: 0.92;
    letter-spacing: -0.04em; color: #fff;
    margin-bottom: 36px;
  }
  .cd-hero-h1 span { color: var(--cd-orange); }
  .cd-hero-deck {
    font-family: 'Inter', sans-serif; font-size: 18px; line-height: 1.76;
    color: rgba(255,255,255,0.48); max-width: 580px; margin-bottom: 52px;
    border-left: 3px solid rgba(234,88,12,0.45); padding-left: 22px;
  }
  .cd-hero-deck strong { color: rgba(255,255,255,0.80); font-weight: 500; }

  /* Stat strip */
  .cd-hero-stats {
    display: grid; grid-template-columns: repeat(4,1fr);
    border-top: 1px solid rgba(255,255,255,0.08);
  }
  .cd-hero-stat {
    padding: 24px 28px;
    border-right: 1px solid rgba(255,255,255,0.07);
  }
  .cd-hero-stat:last-child { border-right: none; }
  .cd-hstat-val {
    font-family: 'Montserrat', sans-serif; font-size: 30px; font-weight: 900;
    color: var(--cd-orange); line-height: 1; margin-bottom: 7px;
    letter-spacing: -0.02em;
  }
  .cd-hstat-label {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: rgba(255,255,255,0.28);
  }

  /* Bottom bar */
  .cd-hero-bottom {
    padding: 18px 56px;
    display: flex; align-items: center; flex-wrap: wrap; gap: 0;
    border-top: 1px solid rgba(255,255,255,0.06);
    position: relative; z-index: 2;
  }
  .cd-hbtm-item {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: rgba(255,255,255,0.22); white-space: nowrap;
    padding: 4px 20px 4px 0; margin-right: 20px;
    border-right: 1px solid rgba(255,255,255,0.09);
  }
  .cd-hbtm-item:last-child { border-right: none; }

  /* ══ BODY ══ */
  .cd-body { max-width: 980px; margin: 0 auto; padding: 88px 36px 108px; }

  /* SECTION OPENER */
  .cd-sec {
    margin-bottom: 40px;
    border-top: 4px solid var(--cd-char);
    padding-top: 14px;
    display: flex; align-items: center; gap: 0;
  }
  .cd-sec-badge {
    font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 900;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--cd-white); background: var(--cd-char);
    padding: 6px 14px; margin-right: 18px; flex-shrink: 0;
  }
  .cd-sec-name {
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--cd-muted); flex: 1;
  }
  .cd-sec-tag {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--cd-orange2); background: var(--cd-orange-lt);
    border: 1px solid var(--cd-orange-md); padding: 4px 12px;
  }

  /* H2 */
  .cd-h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(28px, 4vw, 46px); font-weight: 900;
    line-height: 1.05; letter-spacing: -0.028em;
    color: var(--cd-ink); margin-bottom: 22px;
  }
  .cd-h2 em { font-style: normal; color: var(--cd-orange); }
  .cd-h2 .g { color: var(--cd-green); }
  .cd-h2 .b { color: var(--cd-blue); }

  /* PROSE — bigger than usual */
  .cd-prose {
    font-family: 'Inter', sans-serif; font-size: 18px;
    color: var(--cd-ink2); line-height: 1.84; margin-bottom: 26px;
  }
  .cd-prose strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--cd-ink); }

  /* DIVIDER */
  .cd-div {
    display: flex; align-items: center; gap: 16px; margin: 64px 0;
  }
  .cd-div::before, .cd-div::after {
    content: ''; flex: 1; height: 1px; background: var(--cd-rule);
  }
  .cd-div-mark {
    width: 10px; height: 10px; background: var(--cd-orange);
    clip-path: polygon(50% 0,100% 50%,50% 100%,0 50%);
    flex-shrink: 0;
  }

  /* ── THREE CHALLENGES — big vertical cards ── */
  .cd-challenges {
    display: flex; flex-direction: column; gap: 0;
    margin-bottom: 44px;
  }
  .cd-challenge {
    display: grid; grid-template-columns: 100px 1fr;
    overflow: hidden; border: 1px solid var(--cd-rule);
    border-bottom: none; background: var(--cd-white);
  }
  .cd-challenge:last-child { border-bottom: 1px solid var(--cd-rule); }
  .cd-challenge-num {
    display: flex; align-items: center; justify-content: center;
    font-family: 'Montserrat', sans-serif; font-size: 52px; font-weight: 900;
    line-height: 1; letter-spacing: -0.04em;
  }
  .cd-challenge:nth-child(1) .cd-challenge-num { background: var(--cd-orange); color: #fff; }
  .cd-challenge:nth-child(2) .cd-challenge-num { background: var(--cd-char); color: rgba(255,255,255,0.30); }
  .cd-challenge:nth-child(3) .cd-challenge-num { background: var(--cd-char3); color: rgba(255,255,255,0.22); }

  .cd-challenge-body { padding: 28px 32px; border-left: none; }
  .cd-challenge-tag {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    margin-bottom: 10px;
  }
  .cd-challenge:nth-child(1) .cd-challenge-tag { color: var(--cd-orange); }
  .cd-challenge:nth-child(2) .cd-challenge-tag { color: var(--cd-muted); }
  .cd-challenge:nth-child(3) .cd-challenge-tag { color: var(--cd-muted); }

  .cd-challenge-title {
    font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900;
    color: var(--cd-ink); letter-spacing: -0.02em;
    margin-bottom: 14px; line-height: 1.2;
    padding-bottom: 12px; border-bottom: 2px solid var(--cd-rule);
  }
  .cd-challenge:nth-child(1) .cd-challenge-title { border-bottom-color: var(--cd-orange); }

  .cd-challenge-text {
    font-family: 'Inter', sans-serif; font-size: 16px;
    color: var(--cd-ink2); line-height: 1.76; margin-bottom: 16px;
  }
  .cd-challenge-text strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--cd-ink); }

  .cd-challenge-points {
    display: flex; flex-direction: column; gap: 0;
  }
  .cd-ch-point {
    display: flex; gap: 12px; align-items: flex-start;
    padding: 10px 0; border-top: 1px solid var(--cd-warm3);
  }
  .cd-ch-bullet {
    width: 7px; height: 7px; flex-shrink: 0; margin-top: 7px;
    clip-path: polygon(50% 0,100% 50%,50% 100%,0 50%);
  }
  .cd-challenge:nth-child(1) .cd-ch-bullet { background: var(--cd-orange); }
  .cd-challenge:nth-child(2) .cd-ch-bullet { background: var(--cd-char3); }
  .cd-challenge:nth-child(3) .cd-ch-bullet { background: var(--cd-muted); }
  .cd-ch-text {
    font-family: 'Inter', sans-serif; font-size: 15px;
    color: var(--cd-ink2); line-height: 1.68;
  }
  .cd-ch-text strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--cd-ink); }

  /* ── POLITICAL REFORMS — full dark block ── */
  .cd-reforms {
    background: var(--cd-char); margin-bottom: 44px;
    overflow: hidden;
  }
  .cd-reforms-header {
    padding: 24px 36px;
    border-bottom: 1px solid rgba(255,255,255,0.09);
    display: flex; align-items: center; justify-content: space-between;
  }
  .cd-reforms-header-title {
    font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900;
    color: #fff; letter-spacing: -0.02em;
  }
  .cd-reforms-header-sub {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--cd-orange);
  }
  .cd-reforms-body {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0;
  }
  .cd-reform-item {
    padding: 24px 32px;
    border-right: 1px solid rgba(255,255,255,0.07);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    display: flex; gap: 16px; align-items: flex-start;
  }
  .cd-reform-item:nth-child(2n) { border-right: none; }
  .cd-reform-item:nth-last-child(-n+2) { border-bottom: none; }
  .cd-reform-icon {
    font-size: 22px; flex-shrink: 0; margin-top: 2px;
  }
  .cd-reform-head {
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700;
    color: var(--cd-orange); margin-bottom: 7px;
  }
  .cd-reform-text {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: rgba(255,255,255,0.55); line-height: 1.68;
  }
  .cd-reform-text strong { color: rgba(255,255,255,0.82); font-weight: 500; font-family: 'Poppins', sans-serif; }

  /* ── REDEFINING DEMOCRACY — wide accent card ── */
  .cd-redef {
    background: var(--cd-orange); padding: 44px 48px; margin-bottom: 44px;
    position: relative; overflow: hidden;
  }
  .cd-redef::before {
    content: '⚡'; position: absolute; right: 20px; top: -16px;
    font-size: 200px; line-height: 1;
    color: rgba(255,255,255,0.07); pointer-events: none;
  }
  .cd-redef-tag {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(255,255,255,0.65); margin-bottom: 16px;
  }
  .cd-redef-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(22px, 3.5vw, 32px); font-weight: 900;
    color: #fff; line-height: 1.2; margin-bottom: 24px;
    letter-spacing: -0.02em; position: relative; z-index: 1;
  }
  .cd-redef-points {
    display: flex; flex-direction: column; gap: 0;
    position: relative; z-index: 1;
  }
  .cd-redef-point {
    display: flex; gap: 14px; align-items: flex-start;
    padding: 12px 0; border-top: 1px solid rgba(255,255,255,0.18);
  }
  .cd-redef-point:first-child { border-top: none; }
  .cd-redef-n {
    font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 900;
    color: rgba(255,255,255,0.35); flex-shrink: 0; line-height: 1.5;
    min-width: 24px;
  }
  .cd-redef-text {
    font-family: 'Inter', sans-serif; font-size: 16px;
    color: rgba(255,255,255,0.85); line-height: 1.68;
  }
  .cd-redef-text strong { color: #fff; font-weight: 600; font-family: 'Poppins', sans-serif; }

  /* ── PULL QUOTE — final ── */
  .cd-pull {
    background: var(--cd-char); padding: 52px 52px; margin-bottom: 44px;
    position: relative; overflow: hidden;
  }
  .cd-pull::before {
    content: '"'; position: absolute; left: 20px; top: -14px;
    font-family: 'Georgia', serif; font-size: 180px; line-height: 1;
    color: rgba(234,88,12,0.12); pointer-events: none;
  }
  .cd-pull-q {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(20px, 3vw, 28px); font-weight: 900;
    color: #fff; line-height: 1.38; margin-bottom: 16px;
    position: relative; z-index: 1;
  }
  .cd-pull-q em { font-style: normal; color: var(--cd-orange); }
  .cd-pull-attr {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: rgba(255,255,255,0.35);
  }

  /* ALERT */
  .cd-alert {
    padding: 18px 24px; margin-bottom: 24px;
    display: flex; gap: 16px; align-items: flex-start;
  }
  .cd-alert.orange { background: var(--cd-orange-lt); border-left: 5px solid var(--cd-orange); }
  .cd-alert.green  { background: var(--cd-green-lt);  border-left: 5px solid var(--cd-green); }
  .cd-alert.gold   { background: var(--cd-gold-lt);   border-left: 5px solid var(--cd-gold); }
  .cd-alert.blue   { background: var(--cd-blue-lt);   border-left: 5px solid var(--cd-blue); }
  .cd-alert-icon { font-size: 20px; flex-shrink: 0; margin-top: 1px; }
  .cd-alert-text {
    font-family: 'Inter', sans-serif; font-size: 16px;
    color: var(--cd-ink2); line-height: 1.70;
  }
  .cd-alert-text strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--cd-ink); }

  /* FAQ */
  .cd-faq-opener {
    display: flex; align-items: stretch; gap: 0; margin-bottom: 18px;
  }
  .cd-faq-acc { width: 6px; background: var(--cd-orange); flex-shrink: 0; }
  .cd-faq-opener-inner {
    flex: 1; background: var(--cd-orange-lt);
    border: 1px solid var(--cd-orange-md); border-left: none;
    padding: 14px 24px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .cd-faq-tag {
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase; color: var(--cd-orange3);
  }
  .cd-faq-sub {
    font-family: 'Inter', sans-serif; font-size: 13px; color: var(--cd-muted);
  }
  .cd-faq-h2 {
    font-family: 'Montserrat', sans-serif; font-size: 36px; font-weight: 900;
    color: var(--cd-ink); letter-spacing: -0.025em; margin-bottom: 28px;
  }
  .cd-faq-item { border-bottom: 1px solid var(--cd-rule); }
  .cd-faq-item:first-of-type { border-top: 1px solid var(--cd-rule); }
  .cd-faq-item.open {
    border-left: 5px solid var(--cd-orange); margin-left: -5px;
    background: var(--cd-orange-lt);
  }
  .cd-faq-q {
    width: 100%; display: flex; justify-content: space-between;
    align-items: flex-start; gap: 20px;
    padding: 22px 0; background: none; border: none; cursor: pointer; text-align: left;
  }
  .cd-faq-item.open .cd-faq-q { padding-left: 16px; }
  .cd-faq-q-text {
    font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 600;
    color: var(--cd-ink2); line-height: 1.48; flex: 1;
  }
  .cd-faq-item.open .cd-faq-q-text { color: var(--cd-orange2); }
  .cd-faq-icon { font-size: 20px; color: var(--cd-orange); flex-shrink: 0; margin-top: 2px; }
  .cd-faq-ans { max-height: 0; overflow: hidden; transition: max-height 0.34s ease; }
  .cd-faq-ans.open { max-height: 1100px; }
  .cd-faq-ans-inner {
    padding: 4px 0 26px 16px;
    font-family: 'Inter', sans-serif; font-size: 16px;
    color: var(--cd-muted); line-height: 1.82;
  }
  .cd-faq-ans-inner strong { color: var(--cd-ink2); font-family: 'Poppins', sans-serif; font-weight: 600; }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .cd-hero-nav, .cd-hero-center, .cd-hero-bottom { padding-left: 28px; padding-right: 28px; }
    .cd-hero-stats { grid-template-columns: 1fr 1fr; }
    .cd-hero-stat:nth-child(2) { border-right: none; }
    .cd-hero-stat:nth-child(3) { border-top: 1px solid rgba(255,255,255,0.07); }
    .cd-reforms-body { grid-template-columns: 1fr; }
    .cd-reform-item { border-right: none; }
    .cd-reform-item:nth-last-child(-n+2) { border-bottom: 1px solid rgba(255,255,255,0.07); }
    .cd-reform-item:last-child { border-bottom: none; }
  }
  @media (max-width: 640px) {
    .cd-hero { min-height: auto; }
    .cd-hero-nav { padding: 18px 20px 0; flex-direction: column; align-items: flex-start; gap: 10px; }
    .cd-hero-center { padding: 28px 20px 0; }
    .cd-hero-h1 { font-size: clamp(36px, 10vw, 64px); margin-bottom: 24px; }
    .cd-hero-deck { font-size: 16px; max-width: 100%; margin-bottom: 32px; }
    .cd-hero-bottom { padding: 14px 20px; }
    .cd-hbtm-item { font-size: 11px; padding: 3px 14px 3px 0; margin-right: 14px; }
    .cd-body { padding: 52px 20px 80px; }
    .cd-challenge { grid-template-columns: 72px 1fr; }
    .cd-challenge-num { font-size: 36px; padding-top: 22px; }
    .cd-challenge-title { font-size: 18px; }
    .cd-redef { padding: 32px 24px; }
    .cd-pull { padding: 36px 28px; }
  }
`;

const faqs = [
  {
    q: "What are the three main challenges to democracy?",
    a: <><strong>Challenge 1 — Foundational Challenge:</strong><br/>
    The challenge of making the transition to democracy and then actually establishing democratic government. This involves:<br/>
    — <strong>Bringing down the existing non-democratic regime</strong><br/>
    — Keeping the <strong>military away from controlling government</strong><br/>
    — <strong>Establishing a sovereign and functional state</strong><br/>
    About one-fourth of the world still faces this foundational challenge.<br/><br/>
    <strong>Challenge 2 — Challenge of Expansion:</strong><br/>
    The basic principles of democratic government must be <strong>applied across all regions, social groups and institutions</strong>. This means:<br/>
    — Decisions must be democratically taken at all levels<br/>
    — <strong>Greater powers given to federating units</strong> (states/local bodies)<br/>
    — Women and marginalised classes must be genuinely empowered<br/><br/>
    <strong>Challenge 3 — Challenge of Deepening Democracy:</strong><br/>
    Involves <strong>strengthening the institutions</strong> that help in the participation of people and the functioning of democracy — making existing democracy more meaningful, more accountable, and more genuinely representative.</>
  },
  {
    q: "What is the foundational challenge to democracy?",
    a: <><strong>The foundational challenge</strong> refers to the basic problem of establishing democracy in the first place — making the transition from a non-democratic to a democratic system.<br/><br/>
    It involves three key tasks:<br/>
    1. <strong>Bringing down the existing non-democratic regime</strong> — overthrowing or dismantling authoritarian governments, monarchies, or military juntas<br/>
    2. <strong>Keeping the military away from controlling government</strong> — ensuring that the armed forces remain subordinate to elected civilian authority<br/>
    3. <strong>Establishing a sovereign and functional state</strong> — creating effective state institutions that can actually govern the country<br/><br/>
    Many countries in Africa, parts of Asia and Latin America still face this challenge — they have not yet achieved stable, functioning democratic governance.</>
  },
  {
    q: "What is the challenge of expansion of democracy?",
    a: <><strong>The challenge of expansion</strong> arises in countries that have already achieved basic democracy but need to extend it further — to more regions, more groups, and more institutions.<br/><br/>
    This challenge involves:<br/>
    1. Applying the <strong>basic principles of democratic government across all regions</strong> of the country — not just urban centres<br/>
    2. Ensuring decisions are <strong>democratically taken in all social groups and institutions</strong> — including families, workplaces, and local communities<br/>
    3. Giving <strong>greater powers to federating units</strong> — states and local governments — reducing over-centralisation<br/>
    4. <strong>Empowering women and marginalised classes</strong> to actually participate in democratic processes, not just theoretically<br/><br/>
    Most established democracies, including India, face this challenge — formal democracy exists but is not yet fully extended to all people and places.</>
  },
  {
    q: "What is the challenge of deepening of democracy?",
    a: <><strong>The challenge of deepening democracy</strong> is the most complex — it's about making an existing democracy more genuine, more meaningful, and more effective.<br/><br/>
    It involves <strong>strengthening the institutions</strong> that help in the participation of people and the functioning of democracy. This means:<br/>
    1. Making democratic institutions more <strong>accountable and transparent</strong><br/>
    2. Reducing the influence of <strong>money and muscle power</strong> in politics<br/>
    3. <strong>Strengthening civil society</strong> — NGOs, media, pressure groups<br/>
    4. Ensuring that <strong>ordinary citizens have a genuine voice</strong> in decisions that affect them<br/>
    5. Reducing corruption and making institutions work for the <strong>common people</strong><br/><br/>
    This challenge is faced by all democracies — even the most established ones — as democracy is a continuously evolving system that must keep improving.</>
  },
  {
    q: "Who should carry out democratic reforms? Why not just pass new laws?",
    a: <><strong>Democratic reforms must be carried out mainly by:</strong><br/>
    — Political activists<br/>
    — Political parties<br/>
    — Social movements<br/>
    — Politically conscious citizens<br/><br/>
    <strong>Why not just make laws?</strong><br/>
    The chapter makes a crucial point: legal changes alone are not enough. Any legal change must:<br/>
    1. Take into account the <strong>political and social effects</strong> of the change<br/>
    2. <strong>Empower people</strong> to carry out democratic reforms themselves — not just impose reform from above<br/><br/>
    Laws that are passed without political will and social support often remain on paper only. Genuine democratic reform requires <strong>active citizens and strong democratic culture</strong>, not just legislation. This is why political parties, movements and conscious citizens are the real agents of change.</>
  },
  {
    q: "What does 'redefining democracy' mean?",
    a: <><strong>Redefining democracy</strong> means going back to the fundamental principles of what democracy truly requires, and ensuring governance actually meets those standards.<br/><br/>
    Three core requirements for a redefined democracy:<br/><br/>
    1. <strong>Elected representatives must take all major decisions</strong> — the people people actually voted for must govern, not unelected officials, military figures, or corporate interests<br/><br/>
    2. <strong>Elections must be free and fair for all citizens</strong> — every adult citizen must be able to vote without fear, intimidation, manipulation or exclusion<br/><br/>
    3. <strong>Government must work within the constitutional framework</strong> and for the <strong>welfare of its citizens</strong> — governance must be both constitutionally legitimate and genuinely serve the public good<br/><br/>
    These three principles define what a democracy that is truly accountable, representative and welfare-oriented should look like.</>
  },
  {
    q: "What principles should guide political reforms in democracy?",
    a: <><strong>Four key principles should guide political reforms:</strong><br/><br/>
    1. <strong>Reforms must be led by political actors, not just laws</strong> — democratic reforms must be mainly carried out by political activists, parties, movements and politically conscious citizens. Simply formulating laws at every instance is not sufficient.<br/><br/>
    2. <strong>Legal changes must consider social and political effects</strong> — any reform law must be evaluated for its broader impact on society, not just its technical correctness.<br/><br/>
    3. <strong>Laws must empower people</strong> — reforms should give people the tools and power to bring about democratic change themselves, not just regulate from above.<br/><br/>
    4. <strong>Reforms must strengthen democratic practices</strong> — and must be properly implemented in the areas that need them most, not just on paper.</>
  },
  {
    q: "Why is democracy considered a continuous process of improvement?",
    a: <><strong>Democracy is not a destination — it is an ongoing journey.</strong><br/><br/>
    The chapter shows this through the three challenges: even countries that have achieved basic democracy (no foundational challenge) still face the challenge of expansion, and even fully expanded democracies face the challenge of deepening.<br/><br/>
    <strong>Why ongoing improvement is necessary:</strong><br/>
    1. Social circumstances change — new groups emerge that were previously excluded<br/>
    2. Institutions develop new problems — corruption, capture by elites, bureaucratic inefficiency<br/>
    3. New threats emerge — money power, media manipulation, communalism<br/>
    4. Citizens' expectations grow — people demand more from democracy over time<br/><br/>
    The challenge of deepening democracy — making it more meaningful, more accountable, more genuinely representative — is never fully "solved." It is the <strong>permanent work of democracy</strong>.</>
  },
];

export default function ChallengesToDemocracy() {
  const [openIdx, setOpenIdx] = useState(null);
  const tog = (i) => setOpenIdx(openIdx === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="cd-root">

        {/* ══ HERO ══ */}
        <div className="cd-hero">
          <div className="cd-hero-ghost">8</div>

          <div className="cd-hero-nav">
            <div className="cd-nav-brand">Shikshacom · Civics</div>
            <div className="cd-nav-pill">Chapter 8 · Democratic Politics II</div>
          </div>

          <div className="cd-hero-center">
            <div className="cd-hero-eyebrow">CBSE Class 10 · Final Chapter · Political Science</div>
            <h1 className="cd-hero-h1">Challenges<br />to <span>Democracy</span></h1>
            <p className="cd-hero-deck">
              Democracy is not a solved problem — it is a <strong>continuous struggle</strong>.
              This final chapter asks: what stands between people and genuine democratic governance,
              and how do we overcome it?
            </p>
            <div className="cd-hero-stats">
              <div className="cd-hero-stat">
                <div className="cd-hstat-val">3</div>
                <div className="cd-hstat-label">Major Challenges</div>
              </div>
              <div className="cd-hero-stat">
                <div className="cd-hstat-val">3</div>
                <div className="cd-hstat-label">Reform Principles</div>
              </div>
              <div className="cd-hero-stat">
                <div className="cd-hstat-val">∞</div>
                <div className="cd-hstat-label">Democracy Never "Finished"</div>
              </div>
              <div className="cd-hero-stat">
                <div className="cd-hstat-val">✊</div>
                <div className="cd-hstat-label">Citizens Drive Reform</div>
              </div>
            </div>
          </div>

          <div className="cd-hero-bottom">
            {["Foundational Challenge","Challenge of Expansion","Deepening Democracy","Political Reforms","Redefining Democracy"].map(t => (
              <div className="cd-hbtm-item" key={t}>{t}</div>
            ))}
          </div>
        </div>

        {/* ══ BODY ══ */}
        <div className="cd-body">

          {/* SECTION 1 */}
          <div className="cd-sec">
            <div className="cd-sec-badge">01</div>
            <div className="cd-sec-name">Three Challenges to Democracy</div>
            <div className="cd-sec-tag">Core of the Chapter</div>
          </div>

          <h2 className="cd-h2">Three <em>Challenges</em> Every<br />Democracy Faces</h2>
          <p className="cd-prose">
            No democracy is complete or perfect. Every democratic country — at different stages of its journey — faces one or more of these three fundamental challenges. The challenge you face depends on <strong>where you are</strong> in the democratic journey.
          </p>

          <div className="cd-challenges">
            {/* Challenge 1 */}
            <div className="cd-challenge">
              <div className="cd-challenge-num">1</div>
              <div className="cd-challenge-body">
                <div className="cd-challenge-tag">The Starting Point</div>
                <div className="cd-challenge-title">Foundational Challenge</div>
                <div className="cd-challenge-text">
                  The most basic challenge — <strong>making the transition to democracy</strong> and actually establishing democratic government. Many countries in the world still haven't crossed this threshold.
                </div>
                <div className="cd-challenge-points">
                  {[
                    <><strong>Bring down existing non-democratic regime</strong> — overthrow authoritarian governments, military juntas or monarchies that refuse to give up power.</>,
                    <><strong>Keep military away from governing</strong> — ensure armed forces remain under elected civilian control and do not intervene in politics.</>,
                    <><strong>Establish a sovereign, functional state</strong> — build effective institutions that can actually govern, deliver services, and maintain law and order.</>,
                  ].map((t, i) => (
                    <div className="cd-ch-point" key={i}>
                      <div className="cd-ch-bullet" />
                      <div className="cd-ch-text">{t}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Challenge 2 */}
            <div className="cd-challenge">
              <div className="cd-challenge-num">2</div>
              <div className="cd-challenge-body">
                <div className="cd-challenge-tag">For Existing Democracies</div>
                <div className="cd-challenge-title">Challenge of Expansion</div>
                <div className="cd-challenge-text">
                  For countries that already have basic democracy — the challenge of <strong>extending it to all regions, groups and institutions</strong>. Formal democracy on paper isn't enough.
                </div>
                <div className="cd-challenge-points">
                  {[
                    <><strong>Apply democratic principles across all regions</strong> — not just cities and capitals, but every district, block and village.</>,
                    <><strong>Decisions must be democratically taken</strong> at every level — local government, institutions, workplaces and communities.</>,
                    <><strong>Greater powers to federating units</strong> — states and local governments need more autonomy, not just the centre.</>,
                    <><strong>Genuinely empower women and marginalised groups</strong> — not just formal representation, but real power and voice.</>,
                  ].map((t, i) => (
                    <div className="cd-ch-point" key={i}>
                      <div className="cd-ch-bullet" />
                      <div className="cd-ch-text">{t}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Challenge 3 */}
            <div className="cd-challenge">
              <div className="cd-challenge-num">3</div>
              <div className="cd-challenge-body">
                <div className="cd-challenge-tag">The Permanent Work</div>
                <div className="cd-challenge-title">Challenge of Deepening Democracy</div>
                <div className="cd-challenge-text">
                  Even for mature democracies — the hardest and most permanent challenge. Making democracy <strong>more meaningful, more accountable, and genuinely representative</strong> — a challenge that is never fully solved.
                </div>
                <div className="cd-challenge-points">
                  {[
                    <><strong>Strengthen institutions of participation</strong> — elections, parliament, judiciary, local bodies — to make them truly serve the people.</>,
                    <><strong>Reduce influence of money and muscle power</strong> — ensure that wealth and violence do not determine political outcomes.</>,
                    <><strong>Build genuine civic culture</strong> — citizens who are informed, engaged, and willing to hold power accountable.</>,
                  ].map((t, i) => (
                    <div className="cd-ch-point" key={i}>
                      <div className="cd-ch-bullet" />
                      <div className="cd-ch-text">{t}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="cd-alert orange">
            <div className="cd-alert-icon">💡</div>
            <div className="cd-alert-text">
              <strong>Key Insight:</strong> Different countries face different challenges at different times. Some are still fighting for basic democracy (foundational), some for broader inclusion (expansion), and some for making existing democracy more genuine (deepening). India faces the challenges of both expansion and deepening simultaneously.
            </div>
          </div>

          <div className="cd-div"><div className="cd-div-mark" /></div>

          {/* SECTION 2 */}
          <div className="cd-sec">
            <div className="cd-sec-badge">02</div>
            <div className="cd-sec-name">Political Reforms</div>
            <div className="cd-sec-tag">How to Fix Democracy</div>
          </div>

          <h2 className="cd-h2">Principles of <em>Political Reform</em></h2>
          <p className="cd-prose">
            How should democracies address their challenges? The chapter lays out clear principles for what genuine political reform looks like — and crucially, <strong>who must drive it</strong>.
          </p>

          <div className="cd-reforms">
            <div className="cd-reforms-header">
              <div className="cd-reforms-header-title">Four Principles of Democratic Reform</div>
              <div className="cd-reforms-header-sub">How Reform Must Work</div>
            </div>
            <div className="cd-reforms-body">
              {[
                { icon:"✊", head:"Led by People, Not Just Laws",
                  text:<>Democratic reforms must be carried out mainly by <strong>political activists, parties, movements and politically conscious citizens</strong> — not by formulating laws at every instance. Change must come from within society.</> },
                { icon:"⚖️", head:"Consider Political & Social Effects",
                  text:<>Any legal change must take into account its <strong>political and social effects</strong> beyond just technical correctness. A law that looks good on paper but creates social backlash often does more harm than good.</> },
                { icon:"🔓", head:"Laws Must Empower People",
                  text:<>Political reforms should <strong>give people the power</strong> to carry out democratic reforms themselves — creating enabling conditions for citizen action rather than just regulating from above.</> },
                { icon:"🏗️", head:"Strengthen Democratic Practice",
                  text:<>Reforms must focus on <strong>strengthening democratic practices</strong> — and must be <strong>properly implemented</strong> in the areas that actually need them, not just announced and forgotten.</> },
              ].map((r, i) => (
                <div className="cd-reform-item" key={i}>
                  <div className="cd-reform-icon">{r.icon}</div>
                  <div>
                    <div className="cd-reform-head">{r.head}</div>
                    <div className="cd-reform-text">{r.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cd-div"><div className="cd-div-mark" /></div>

          {/* SECTION 3 */}
          <div className="cd-sec">
            <div className="cd-sec-badge">03</div>
            <div className="cd-sec-name">Redefining Democracy</div>
            <div className="cd-sec-tag">The Ideal Standard</div>
          </div>

          <h2 className="cd-h2">What Does <em>Real</em> Democracy Look Like?</h2>
          <p className="cd-prose">
            After examining all the challenges and reform principles, the chapter ends with a clear standard — a redefined definition of what genuine democracy must deliver.
          </p>

          <div className="cd-redef">
            <div className="cd-redef-tag">Redefining Democracy · Three Minimum Standards</div>
            <div className="cd-redef-title">A real democracy requires all three — not just one or two.</div>
            <div className="cd-redef-points">
              {[
                <><strong>Elected representatives must take all major decisions.</strong> The people citizens actually voted for must govern — not unelected bureaucrats, military figures, judges, or corporate interests. Popular will must translate into actual power.</>,
                <><strong>Elections must be free and fair for all citizens.</strong> Every adult must be able to vote without fear, intimidation, manipulation or exclusion. The process must be genuinely open and competitive for all.</>,
                <><strong>Government must work within the constitutional framework and for citizen welfare.</strong> Governance must be both constitutionally legitimate AND genuinely serve the public good — not just for the powerful few.</>,
              ].map((t, i) => (
                <div className="cd-redef-point" key={i}>
                  <div className="cd-redef-n">{i + 1}</div>
                  <div className="cd-redef-text">{t}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="cd-pull">
            <div className="cd-pull-q">
              "Democracy is not something you achieve and then rest. It is something you <em>fight for, maintain, and keep improving</em> — every generation, in every country, without exception."
            </div>
            <div className="cd-pull-attr">— Challenges to Democracy, NCERT Class 10 · Final Chapter</div>
          </div>

          <div className="cd-alert green">
            <div className="cd-alert-icon">🌱</div>
            <div className="cd-alert-text">
              <strong>Final Takeaway:</strong> The three challenges — foundational, expansion, and deepening — are not a checklist to be completed. They represent an <strong>ongoing commitment</strong> that every democracy must renew. Citizens, parties, and movements are all responsible for keeping that commitment alive.
            </div>
          </div>

          {/* FAQ */}
          <div className="cd-faq-opener">
            <div className="cd-faq-acc" />
            <div className="cd-faq-opener-inner">
              <div className="cd-faq-tag">Exam Preparation · FAQ</div>
              <div className="cd-faq-sub">7 questions · Full chapter coverage</div>
            </div>
          </div>
          <h2 className="cd-faq-h2">All You Need to Know</h2>

          {faqs.map((faq, i) => (
            <div className={`cd-faq-item${openIdx === i ? " open" : ""}`} key={i}>
              <button className="cd-faq-q" onClick={() => tog(i)}>
                <span className="cd-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="cd-faq-icon">{openIdx === i ? "▴" : "▾"}</span>
              </button>
              <div className={`cd-faq-ans${openIdx === i ? " open" : ""}`}>
                <div className="cd-faq-ans-inner">{faq.a}</div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
