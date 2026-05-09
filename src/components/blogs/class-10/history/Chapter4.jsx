import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:       #1a1008;
    --ink2:      #2d1f0e;
    --muted:     #7a6a55;
    --paper:     #fdf8f2;
    --paper2:    #f5ede0;
    --paper3:    #ede0cc;
    --iron:      #3d3d3d;
    --iron2:     #2a2a2a;
    --coal:      #1a1a1a;
    --copper:    #b5651d;
    --copper2:   #8b4513;
    --copper-lt: #fdf0e0;
    --steam:     #4a7c9e;
    --steam2:    #2d5f7d;
    --rule:      #d4c4a8;
    --cream:     #fff8ee;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .aoi-root {
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
  }

  /* HERO */
  .aoi-hero {
    background: linear-gradient(160deg, #0d0a06 0%, #1a1208 40%, #0f0d0a 100%);
    min-height: 88vh;
    display: flex; align-items: flex-end;
    position: relative; overflow: hidden;
    padding: 0 0 64px;
  }
  .aoi-hero-bg-num {
    position: absolute; bottom: -40px; right: -20px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(240px, 38vw, 520px); font-weight: 900; line-height: 1;
    color: rgba(255,255,255,0.025); letter-spacing: -0.04em;
    user-select: none; pointer-events: none;
  }
  .aoi-hero::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #b5651d, #e8922a, #b5651d);
  }
  .aoi-pipe { position: absolute; background: rgba(255,255,255,0.025); pointer-events: none; }
  .aoi-hero-inner {
    max-width: 900px; width: 100%;
    margin: 0 auto; padding: 0 32px;
    position: relative; z-index: 1;
  }
  .aoi-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #e8922a; margin-bottom: 24px;
    display: flex; align-items: center; gap: 14px;
  }
  .aoi-overline::before, .aoi-overline::after {
    content: ''; flex: 0 0 40px; height: 1px; background: #e8922a;
  }
  .aoi-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(44px, 8vw, 88px); font-weight: 900;
    color: #fff; line-height: 0.95; letter-spacing: -0.03em; margin-bottom: 32px;
  }
  .aoi-hero-title em { font-style: normal; color: #e8922a; }
  .aoi-hero-title .steam-em { color: #7ab8d4; }
  .aoi-hero-bar {
    display: flex; flex-wrap: wrap; gap: 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 24px; margin-top: 8px;
  }
  .aoi-hero-bar-item {
    flex: 1 1 160px; padding: 0 24px 0 0;
    border-right: 1px solid rgba(255,255,255,0.1); margin-right: 24px;
  }
  .aoi-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .aoi-bar-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.35); margin-bottom: 5px;
  }
  .aoi-bar-value {
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600;
    color: rgba(255,255,255,0.75);
  }

  /* BODY */
  .aoi-body { max-width: 860px; margin: 0 auto; padding: 72px 32px 96px; }

  /* LEAD */
  .aoi-lead {
    border-left: 5px solid var(--copper); padding: 28px 36px;
    margin-bottom: 48px; background: var(--paper2);
  }
  .aoi-lead p {
    font-family: 'Poppins', sans-serif; font-size: 19px; font-weight: 500;
    color: var(--ink2); line-height: 1.78; margin: 0 0 14px;
  }
  .aoi-lead p:last-child { margin: 0; }
  .aoi-lead strong { color: var(--copper); }

  /* SECTION HEADER */
  .aoi-sec-head {
    display: flex; align-items: flex-start; gap: 20px;
    margin-bottom: 28px; border-bottom: 2px solid var(--rule); padding-bottom: 18px;
  }
  .aoi-sec-num {
    font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900;
    color: var(--rule); line-height: 1; flex-shrink: 0; margin-top: 4px;
  }
  .aoi-sec-kicker {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--copper); margin-bottom: 4px;
  }
  .aoi-sec-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(22px, 3.5vw, 32px); font-weight: 900;
    color: var(--ink); line-height: 1.15; letter-spacing: -0.01em;
  }
  .aoi-sec-title span  { color: var(--copper); }
  .aoi-sec-title .steam { color: var(--steam); }
  .aoi-sec-title .iron  { color: var(--iron); }

  /* BODY TEXT */
  .aoi-body-text {
    font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 400;
    color: #2d1f0e; line-height: 1.82; margin-bottom: 24px;
  }
  .aoi-body-text strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* PULL QUOTE */
  .aoi-pull-quote { margin: 40px 0; padding: 32px 40px; background: var(--coal); position: relative; }
  .aoi-pull-quote::before {
    content: '"'; position: absolute; top: -18px; left: 28px;
    font-family: 'Montserrat', sans-serif; font-size: 120px; font-weight: 900;
    color: var(--copper); line-height: 1;
  }
  .aoi-pull-quote p {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(17px, 2.4vw, 22px); font-weight: 800;
    color: #fff; line-height: 1.45; letter-spacing: -0.01em;
    position: relative; z-index: 1; margin-bottom: 12px;
  }
  .aoi-pull-quote cite {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600;
    color: #e8922a; text-transform: uppercase; letter-spacing: 0.12em; font-style: normal;
  }

  /* ─── NEWSPAPER COLUMNS — FIXED ─── */
  .aoi-columns {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0; margin-bottom: 48px;
    background: var(--cream); border: 1px solid var(--rule);
  }
  @media (max-width: 600px) { .aoi-columns { grid-template-columns: 1fr; } }

  .aoi-col { padding: 32px 28px; }
  .aoi-col:last-child { border-left: 1px solid var(--rule); }
  @media (max-width: 600px) {
    .aoi-col:last-child { border-left: none; border-top: 1px solid var(--rule); }
  }
  .aoi-col-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--copper); margin-bottom: 8px;
  }
  .aoi-col-title {
    font-family: 'Montserrat', sans-serif; font-size: 18px; font-weight: 900;
    color: var(--ink); margin-bottom: 14px; padding-bottom: 10px;
    border-bottom: 2px solid var(--rule);
  }
  .aoi-col-body { font-family: 'Inter', sans-serif; font-size: 15px; line-height: 1.78; color: #374151; }
  .aoi-col-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ink); }

  /* INVENTOR CARDS */
  .aoi-inventors {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 2px; margin-bottom: 48px; background: var(--rule);
  }
  @media (max-width: 640px) { .aoi-inventors { grid-template-columns: 1fr; } }
  .aoi-inv-card { background: var(--paper); padding: 28px 24px; position: relative; overflow: hidden; }
  .aoi-inv-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--copper);
  }
  .aoi-inv-num { font-family: 'Montserrat', sans-serif; font-size: 48px; font-weight: 900; color: var(--paper3); line-height: 1; margin-bottom: 8px; }
  .aoi-inv-name { font-family: 'Montserrat', sans-serif; font-size: 17px; font-weight: 900; color: var(--ink); margin-bottom: 4px; letter-spacing: -0.01em; }
  .aoi-inv-what { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; color: var(--copper); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }
  .aoi-inv-desc { font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.72; color: #4a3728; }
  .aoi-inv-desc strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ink); }

  /* VERDICT STRIP */
  .aoi-verdict { margin-bottom: 48px; }
  .aoi-verdict-row {
    display: grid; grid-template-columns: 40px 1fr;
    gap: 20px; align-items: start; padding: 18px 0; border-bottom: 1px solid var(--rule);
  }
  .aoi-verdict-row:first-child { border-top: 1px solid var(--rule); }
  .aoi-verdict-num { font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900; color: var(--copper); line-height: 1.1; padding-top: 2px; }
  .aoi-verdict-title { font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
  .aoi-verdict-body { font-family: 'Inter', sans-serif; font-size: 15px; line-height: 1.74; color: #374151; }
  .aoi-verdict-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ink); }

  /* CONTRAST BLOCK */
  .aoi-contrast { display: grid; grid-template-columns: 1fr 60px 1fr; gap: 0; margin-bottom: 48px; align-items: stretch; }
  @media (max-width: 640px) { .aoi-contrast { grid-template-columns: 1fr; } }
  .aoi-contrast-side { padding: 32px 28px; }
  .aoi-contrast-side.before { background: var(--iron2); }
  .aoi-contrast-side.after  { background: var(--copper); }
  .aoi-contrast-mid {
    background: var(--ink); display: flex; align-items: center; justify-content: center;
    font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900;
    color: rgba(255,255,255,0.25); writing-mode: vertical-rl; letter-spacing: 0.12em;
  }
  @media (max-width: 640px) { .aoi-contrast-mid { writing-mode: horizontal-tb; padding: 12px; } }
  .aoi-contrast-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 10px; }
  .aoi-contrast-title { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 900; color: #fff; margin-bottom: 14px; }
  .aoi-contrast-side ul { padding-left: 18px; margin: 0; }
  .aoi-contrast-side ul li { font-size: 15px; line-height: 1.74; color: rgba(255,255,255,0.8); margin-bottom: 7px; }
  .aoi-contrast-side ul li strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: #fff; }

  /* SPOTLIGHT */
  .aoi-spotlight { display: grid; grid-template-columns: 120px 1fr; gap: 0; margin-bottom: 48px; border: 1px solid var(--rule); }
  @media (max-width: 580px) { .aoi-spotlight { grid-template-columns: 1fr; } }
  .aoi-spotlight-badge { background: var(--ink); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px 16px; gap: 10px; }
  .aoi-spotlight-initial { font-family: 'Montserrat', sans-serif; font-size: 52px; font-weight: 900; color: #e8922a; line-height: 1; }
  .aoi-spotlight-era { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.12em; text-align: center; }
  .aoi-spotlight-body { background: var(--paper2); padding: 28px 28px; }
  .aoi-spotlight-name { font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900; color: var(--ink); margin-bottom: 4px; }
  .aoi-spotlight-role { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--copper); margin-bottom: 14px; }
  .aoi-spotlight-body ul { padding-left: 18px; margin: 0; }
  .aoi-spotlight-body ul li { font-size: 15px; line-height: 1.74; color: #374151; margin-bottom: 7px; }
  .aoi-spotlight-body ul li strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ink); }

  /* FACTOR LIST */
  .aoi-factor-list { margin-bottom: 48px; }
  .aoi-factor-item { display: grid; grid-template-columns: 64px 1fr; gap: 20px; align-items: start; padding: 20px 0; border-bottom: 1px solid var(--rule); }
  .aoi-factor-item:first-child { border-top: 1px solid var(--rule); }
  .aoi-factor-num-col { background: var(--copper); display: flex; align-items: center; justify-content: center; height: 48px; font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900; color: #fff; flex-shrink: 0; margin-top: 2px; }
  .aoi-factor-title { font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 700; color: var(--ink); margin-bottom: 6px; }
  .aoi-factor-body { font-family: 'Inter', sans-serif; font-size: 15px; line-height: 1.74; color: #374151; }
  .aoi-factor-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--ink); }

  /* TRADE FLOW */
  .aoi-trade-flow { display: flex; align-items: stretch; gap: 0; margin-bottom: 48px; background: var(--rule); overflow: hidden; }
  @media (max-width: 640px) { .aoi-trade-flow { flex-direction: column; } }
  .aoi-tf-node { flex: 1; background: var(--paper); padding: 24px 20px; text-align: center; }
  .aoi-tf-node:nth-child(2) { background: var(--paper2); }
  .aoi-tf-node:nth-child(4) { background: var(--paper2); }
  .aoi-tf-node:nth-child(6) { background: var(--coal); }
  .aoi-tf-arrow { display: flex; align-items: center; justify-content: center; width: 32px; flex-shrink: 0; background: var(--ink); font-size: 18px; color: var(--copper); font-weight: 900; }
  @media (max-width: 640px) { .aoi-tf-arrow { width: 100%; height: 28px; } }
  .aoi-tf-icon { font-size: 28px; margin-bottom: 8px; }
  .aoi-tf-label { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--copper); margin-bottom: 6px; }
  .aoi-tf-node:nth-child(6) .aoi-tf-label { color: #e8922a; }
  .aoi-tf-name { font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 900; color: var(--ink); line-height: 1.2; }
  .aoi-tf-node:nth-child(6) .aoi-tf-name { color: #fff; }
  .aoi-tf-sub { font-family: 'Inter', sans-serif; font-size: 12px; color: #6b6b6b; margin-top: 5px; line-height: 1.5; }
  .aoi-tf-node:nth-child(6) .aoi-tf-sub { color: rgba(255,255,255,0.5); }

  /* BULLET LIST */
  .aoi-list { margin: 0 0 28px; padding: 0; list-style: none; }
  .aoi-list li { font-size: 16px; line-height: 1.78; color: #2d1f0e; padding: 10px 0 10px 28px; position: relative; border-bottom: 1px solid var(--rule); }
  .aoi-list li:first-child { border-top: 1px solid var(--rule); }
  .aoi-list li::before { content: ''; position: absolute; left: 0; top: 18px; width: 10px; height: 10px; border: 2px solid var(--copper); transform: rotate(45deg); }
  .aoi-list li strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* INFO TABLE */
  .aoi-table-wrap { margin-bottom: 48px; border: 1px solid var(--rule); }
  .aoi-table-title { background: var(--ink); padding: 14px 24px; font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: #e8922a; letter-spacing: 0.06em; text-transform: uppercase; }
  .aoi-table-row { display: grid; grid-template-columns: 170px 1fr; border-bottom: 1px solid var(--rule); }
  .aoi-table-row:last-child { border-bottom: none; }
  .aoi-table-key { background: var(--paper2); padding: 14px 18px; font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: var(--copper2); border-right: 1px solid var(--rule); display: flex; align-items: center; }
  .aoi-table-val { padding: 14px 18px; font-size: 15px; line-height: 1.65; color: #374151; }
  .aoi-table-val strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* DIVIDER */
  .aoi-divider { display: flex; align-items: center; gap: 16px; margin: 56px 0; }
  .aoi-divider::before, .aoi-divider::after { content: ''; flex: 1; height: 1px; background: var(--rule); }
  .aoi-divider-mark { width: 10px; height: 10px; background: var(--copper); transform: rotate(45deg); flex-shrink: 0; }

  /* FAQ */
  .aoi-faq-header { border-bottom: 3px solid var(--ink); padding-bottom: 14px; margin-bottom: 0; display: flex; align-items: baseline; gap: 16px; }
  .aoi-faq-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--copper); }
  .aoi-faq-title { font-family: 'Montserrat', sans-serif; font-size: clamp(24px, 4vw, 34px); font-weight: 900; color: var(--ink); letter-spacing: -0.01em; margin: 20px 0 32px; }
  .aoi-faq-item { border-bottom: 1px solid var(--rule); overflow: hidden; }
  .aoi-faq-item.open { background: var(--paper2); }
  .aoi-faq-q { width: 100%; text-align: left; background: none; border: none; cursor: pointer; padding: 20px 0; display: grid; grid-template-columns: 1fr 32px; gap: 16px; align-items: start; }
  .aoi-faq-q-text { font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 600; color: var(--ink); line-height: 1.5; text-align: left; padding-left: 4px; }
  .aoi-faq-item.open .aoi-faq-q-text { color: var(--copper2); }
  .aoi-faq-icon { width: 28px; height: 28px; border: 1.5px solid var(--rule); display: flex; align-items: center; justify-content: center; font-size: 16px; color: var(--copper); flex-shrink: 0; margin-top: 2px; font-family: 'Poppins', sans-serif; font-weight: 700; }
  .aoi-faq-item.open .aoi-faq-icon { background: var(--ink); border-color: var(--ink); color: #e8922a; }
  .aoi-faq-ans { display: none; padding: 0 4px 22px; font-size: 16px; line-height: 1.82; color: #374151; }
  .aoi-faq-ans.visible { display: block; }
  .aoi-faq-ans ul { padding-left: 20px; margin: 8px 0; }
  .aoi-faq-ans ul li { margin-bottom: 7px; }
  .aoi-faq-ans strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }
  .aoi-faq-ans p { margin: 0 0 10px; }
  .aoi-faq-ans p:last-child { margin: 0; }

  @media (max-width: 600px) {
    .aoi-hero { min-height: auto; padding: 80px 0 48px; }
    .aoi-table-row { grid-template-columns: 110px 1fr; }
    .aoi-spotlight { grid-template-columns: 1fr; }
  }
`;

const faqs = [
  {
    q: "Why did the women workers in Britain attack the Spinning Jenny?",
    a: (<>
      <p>Most of the workers in early factories were peasants who had left farming because they could not sustain their livelihoods through agriculture. Having already experienced the pain of unemployment firsthand, they were acutely aware of what job loss meant.</p>
      <ul>
        <li>The <strong>Spinning Jenny</strong> was a machine that could automatically perform the spinning tasks that workers had previously done entirely by hand</li>
        <li>Women who earned their living through <strong>hand spinning</strong> feared that if the Spinning Jenny became widely used, their jobs would be completely eliminated</li>
        <li>Since spinning had historically been <strong>women's work in cottage industries</strong>, women had the most to lose from this automation</li>
        <li>Out of desperation and fear of unemployment, the women <strong>attacked and destroyed the machines</strong> — one of the earliest examples of worker resistance to industrialisation</li>
      </ul>
    </>),
  },
  {
    q: "Why did the Port of Surat decline as the 18th century came to an end?",
    a: (<>
      <p>The Port of Surat was once the thriving gateway through which Indian merchants and traders traveled to far-off places like the Gulf and the Red Sea to sell Indian-made textiles. Its decline was entirely a result of British colonial strategy:</p>
      <ul>
        <li>When the British arrived in India, they <strong>monopolised Indian trade</strong> and systematically removed Indian merchants from the trading scene</li>
        <li>The British established new ports in <strong>Bombay and Bengal</strong> that they controlled entirely on their own terms</li>
        <li>The Surat port, once crowded with Indian merchants, was <strong>deliberately neglected</strong></li>
        <li>By the last decades of the 18th century, <strong>very few Indian traders remained</strong> — and the port died an untimely death</li>
      </ul>
    </>),
  },
  {
    q: "How did the Swadeshi movement help the Indian textile traders and producers?",
    a: (<>
      <p>The Swadeshi movement was a powerful economic and political campaign led by nationalist leaders including Mahatma Gandhi:</p>
      <ul>
        <li>The movement called for a <strong>complete boycott of foreign-made products</strong> — particularly cheap Manchester-made textiles that had devastated Indian weavers</li>
        <li>People <strong>publicly burned foreign textiles</strong> and took solemn vows to buy only Swadeshi (Indian-made) products</li>
        <li>This gave a <strong>major push to indigenous factories and small workshops</strong> — demand for Indian goods surged</li>
        <li>Although the Swadeshi movement ultimately <strong>failed as a political campaign</strong>, the ideology of self-reliance did not die — it laid the foundation for India's economic independence</li>
      </ul>
    </>),
  },
  {
    q: "Who were the Gomasthas?",
    a: (<>
      <p>The Gomasthas were a <strong>control mechanism introduced by the East India Company</strong> to supervise and regulate Indian weavers after they had already eliminated independent Indian traders.</p>
      <ul>
        <li>Gomasthas worked as <strong>paid supervisors of the weavers</strong> — acting as the bridge between the East India Company and the weaving communities</li>
        <li>Their job was to <strong>collect finished cloth and examine its quality</strong> before it was sent to the Company</li>
        <li>They had <strong>no respect for the weavers</strong> — outsiders to the community unlike earlier Indian merchants who had long-standing relationships with weavers</li>
        <li>Weavers who had taken <strong>advance loans from the British</strong> were bound to supply cloth exclusively to the Gomasthas — stripped of all bargaining power</li>
      </ul>
    </>),
  },
  {
    q: "Give two examples where progressive modern development has led to socio-economic or environmental problems.",
    a: (<>
      <p>Progress and its unintended consequences — two powerful examples from history:</p>
      <ul>
        <li><strong>The Atomic Bomb (Manhattan Project):</strong> Scientists were thrilled about their innovation — but the bombs dropped on Japan took the lives of <strong>66,000 and 39,000 innocent Japanese</strong> respectively, with radiation effects manifesting across generations. The greatest scientific achievement of the era became the most destructive weapon in human history.</li>
        <li><strong>Social Networking Sites:</strong> Once celebrated as game-changers, social media platforms are now increasingly linked to <strong>depression and FOMO syndrome</strong>. Malicious actors use them to spread misinformation, and platforms are regularly accused of <strong>spying on users</strong> and destroying social cohesion.</li>
      </ul>
    </>),
  },
  {
    q: "What is proto-industrialisation?",
    a: (<>
      <p><strong>Proto-industrialisation</strong> refers to the phase of small-scale, home-based and workshop-based production that preceded and laid the groundwork for full factory-based industrial production.</p>
      <ul>
        <li>Involved <strong>small workshops and home-based units</strong> producing textiles, pottery, food processing, and glassworks</li>
        <li><strong>Franklin Mendels</strong> coined the term — Hans Medick called it <strong>"industrialisation before industrialisation"</strong></li>
        <li>In the <strong>17th and 18th centuries</strong>, merchants encouraged rural artisans to produce for overseas markets — these households functioned as <strong>mini-factories</strong></li>
        <li>Merchants chose rural producers because in towns, <strong>trade guilds blocked</strong> new business formation</li>
        <li>Proto-industrialisation was the essential foundation on which the formal Industrial Revolution was built</li>
      </ul>
    </>),
  },
  {
    q: "What was the impact of industrialisation in England?",
    a: (<>
      <p>England was the <strong>first country to be industrialised</strong>, and the effects were sweeping:</p>
      <ul>
        <li><strong>Textile transformation:</strong> Small-scale home-based industries gave way to big factory production. The Spinning Jenny and power loom changed textile manufacturing from manual to automated</li>
        <li><strong>Export power:</strong> Britain could now cater to domestic demand AND export surplus goods to overseas colonies</li>
        <li><strong>Iron and steel boom:</strong> Production increased dramatically as <strong>coke replaced charcoal</strong> as fuel</li>
        <li><strong>Railways and construction:</strong> The iron and steel boom powered the construction and railroad industries</li>
        <li><strong>Steam engine revolution:</strong> Steam power enabled growth in cotton mills, iron and steel, and coal mining simultaneously</li>
        <li><strong>Banking expansion:</strong> As businesses multiplied, <strong>new banks were established</strong> to provide loans and monetary services</li>
        <li><strong>Worker suffering:</strong> Traditional craftsmen couldn't compete with factories; factory workers were paid <strong>extremely low wages for brutal working hours</strong></li>
        <li><strong>Advanced technologies:</strong> Later innovations like the <strong>telegraph</strong> emerged, accelerating global connectivity</li>
      </ul>
    </>),
  },
];

export default function AgeOfIndustrialisation() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="aoi-root">

        {/* HERO */}
        <div className="aoi-hero">
          <div className="aoi-pipe" style={{width:3,top:0,bottom:0,left:'28%'}} />
          <div className="aoi-pipe" style={{width:3,top:0,bottom:0,left:'62%'}} />
          <div className="aoi-pipe" style={{height:3,left:0,right:0,top:'40%'}} />
          <div className="aoi-hero-bg-num">04</div>
          <div className="aoi-hero-inner">
            <div className="aoi-overline">Class 10 · Social Science · History</div>
            <h1 className="aoi-hero-title">
              The Age of<br /><em>Industriali-</em><br /><span className="steam-em">sation</span>
            </h1>
            <div className="aoi-hero-bar">
              {[
                {label:"Subject", value:"History"},
                {label:"Chapter", value:"Chapter 4"},
                {label:"Period",  value:"17th – 20th C"},
                {label:"Region",  value:"England & India"},
                {label:"FAQs",    value:"7 Questions"},
              ].map((b,i) => (
                <div className="aoi-hero-bar-item" key={i}>
                  <div className="aoi-bar-label">{b.label}</div>
                  <div className="aoi-bar-value">{b.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="aoi-body">

          {/* Lead */}
          <div className="aoi-lead">
            <p>When we say <strong>Industrial Revolution</strong>, we picture smokestacks, roaring factories, and steam-powered machines. But the truth is far more layered — industrialisation crept in slowly, built on centuries of cottage industries, rural labour, and merchant networks long before the first factory was built.</p>
            <p>This chapter follows that journey — from the <strong>proto-industrial workshops</strong> of the 17th century, through England's revolutionary inventions, to the devastating impact on India's ancient textile economy — and the fighters who pushed back.</p>
          </div>

          {/* 1 — Proto-Industrialisation */}
          <div className="aoi-sec-head">
            <div className="aoi-sec-num">1</div>
            <div className="aoi-sec-title-wrap">
              <div className="aoi-sec-kicker">The Baby Steps — 17th & 18th Century</div>
              <h2 className="aoi-sec-title"><span>Proto-Industrialisation</span></h2>
            </div>
          </div>

          <p className="aoi-body-text">
            For generations, industrialisation has been associated with big machines and factories. But in the <strong>17th and 18th centuries</strong>, something different was already at work. Town merchants began encouraging <strong>agricultural peasants and artisans</strong> in the countryside to produce goods for export to overseas markets. These rural households functioned as <strong>mini-factories</strong> — the very first stirrings of industry.
          </p>

          {/* ✅ FIXED columns — no divider div, border-left on second col */}
          <div className="aoi-columns">
            <div className="aoi-col">
              <div className="aoi-col-label">Why Rural Workers?</div>
              <div className="aoi-col-title">Merchants Turned to the Countryside</div>
              <div className="aoi-col-body">
                Merchants in the towns were <strong>blocked by powerful trade guilds</strong> from setting up new businesses within city limits. The guilds controlled who could produce, trade, and compete. Unable to expand in towns, merchants looked outward — to the open countryside where no such restrictions existed. Rural artisans and farmers were happy for the extra income, and merchants got the labour they needed for growing overseas demand.
              </div>
            </div>
            <div className="aoi-col">
              <div className="aoi-col-label">Franklin Mendels' Term</div>
              <div className="aoi-col-title">Industrialisation Before Industrialisation</div>
              <div className="aoi-col-body">
                Economist <strong>Franklin Mendels</strong> named this phase <em>Proto-Industrialisation</em>. Scholar <strong>Hans Medick</strong> called it simply <em>"industrialisation before industrialisation."</em> The small home-based workshops producing textiles, pottery, food products, and glassworks were not a lesser form of industry — they were the essential foundation upon which the full factory revolution was eventually built.
              </div>
            </div>
          </div>

          <div className="aoi-divider"><div className="aoi-divider-mark" /></div>

          {/* 2 — Dawn of Industrialisation */}
          <div className="aoi-sec-head">
            <div className="aoi-sec-num">2</div>
            <div className="aoi-sec-title-wrap">
              <div className="aoi-sec-kicker">England — The First Factory Nation</div>
              <h2 className="aoi-sec-title">Dawn of <span>Industrialisation</span></h2>
            </div>
          </div>

          <p className="aoi-body-text">
            Although the Industrial Revolution in England is dated to the 18th century, the <strong>initial decades were not dramatic</strong>. Small mills still used legacy technologies like waterwheels and windmills. It was only after a series of pivotal inventions that the revolution truly took off — transforming textile production, coal mining, the iron industry, and beyond.
          </p>

          <div className="aoi-factor-list">
            {[
              { title:"Raw Materials & Technology",          body:<>Rapid advancement in technology made access to <strong>cotton and other raw materials</strong> for the heavy engineering sector easier and more affordable than ever before.</> },
              { title:"Cheaper Transport & Communication",   body:<>Transportation and communication became cheaper and more accessible. The navigable waterways of Britain saw <strong>big ships transporting coal</strong> to various industrial plants across the country.</> },
              { title:"Coal Replaces Wood",                  body:<><strong>Coal replaced wood</strong> as the primary source of power for manufacturing units. The city of Bristol saw a massive increase in coal production — powering the furnaces of the revolution.</> },
              { title:"Stable Government & Monetary Policy", body:<>For the first time, Britain had both a <strong>stable government and a stable monetary policy</strong> — creating the predictable economic environment that investors and industrialists needed to take risks.</> },
              { title:"Revolutionary Inventions",            body:<><strong>James Watt</strong> invented the steam engine in 1763. <strong>John Kay</strong> invented the flying shuttle — making weaving automatic for the first time. <strong>Edmund Cartwright</strong> invented the power loom. The flying shuttle increased yarn consumption so dramatically it created urgent demand for spinning machines, eventually leading to the power loom.</> },
            ].map((f, i) => (
              <div className="aoi-factor-item" key={i}>
                <div className="aoi-factor-num-col">{i + 1}</div>
                <div>
                  <div className="aoi-factor-title">{f.title}</div>
                  <div className="aoi-factor-body">{f.body}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="aoi-spotlight">
            <div className="aoi-spotlight-badge">
              <div className="aoi-spotlight-initial">A</div>
              <div className="aoi-spotlight-era">18th Century</div>
            </div>
            <div className="aoi-spotlight-body">
              <div className="aoi-spotlight-name">Richard Arkwright</div>
              <div className="aoi-spotlight-role">Inventor of the Water-Frame · Factory Pioneer</div>
              <ul>
                <li>Invented the <strong>Water-Frame</strong> — employed and improved James Hargreaves' Spinning Jenny techniques</li>
                <li>The Water-Frame <strong>automated the processes of carding and spinning</strong> — previously entirely manual work</li>
                <li>First to centralise this technology in <strong>factories where many workers operated several Water-Frames simultaneously</strong></li>
                <li>Enabled <strong>mass production of yarns</strong> for textile manufacturing — a defining moment in the factory revolution</li>
              </ul>
            </div>
          </div>

          <div className="aoi-inventors">
            {[
              { num:"01", name:"James Watt",       what:"Steam Engine · 1763", desc:<>Invented the <strong>steam-driven piston engine</strong> — the defining power source of the Industrial Revolution, driving mills, mines, and railways.</> },
              { num:"02", name:"John Kay",          what:"Flying Shuttle",      desc:<>Made weaving <strong>automatic for the first time</strong> — dramatically speeding up cloth production and creating urgent demand for more yarn.</> },
              { num:"03", name:"Edmund Cartwright", what:"Power Loom",          desc:<>Invented the <strong>power loom</strong> in direct response to the yarn surplus created by the flying shuttle — completing textile automation.</> },
            ].map((inv, i) => (
              <div className="aoi-inv-card" key={i}>
                <div className="aoi-inv-num">{inv.num}</div>
                <div className="aoi-inv-name">{inv.name}</div>
                <div className="aoi-inv-what">{inv.what}</div>
                <div className="aoi-inv-desc">{inv.desc}</div>
              </div>
            ))}
          </div>

          <div className="aoi-divider"><div className="aoi-divider-mark" /></div>

          {/* 3 — Revolution crept slowly */}
          <div className="aoi-sec-head">
            <div className="aoi-sec-num">3</div>
            <div className="aoi-sec-title-wrap">
              <div className="aoi-sec-kicker">The Uncomfortable Truth</div>
              <h2 className="aoi-sec-title">The Revolution That <span className="iron">Crept In</span> Slowly</h2>
            </div>
          </div>

          <p className="aoi-body-text">
            The word "revolution" implies sudden, sweeping transformation. The Industrial Revolution was anything but. Even as advanced machinery flooded England, <strong>traditional small-scale industries remained alive and well</strong>. The cotton and textile industry still relied heavily on traditional workshops and rural cottage industries for decades after the big machines arrived.
          </p>

          <div className="aoi-pull-quote">
            <p>Even after the machines arrived, industrialists often preferred human hands. Cheap labour was cheaper than a machine — and human hands could do what machines could not.</p>
            <cite>— The Paradox of Early Industrialisation</cite>
          </div>

          <div className="aoi-verdict">
            {[
              { title:"Cost of Machines Was Prohibitive",     body:<>The upfront cost of new machinery was enormous. <strong>Cheap manual labour was simply more economical</strong> for most industrialists — especially where machines couldn't justify the investment.</> },
              { title:"Some Products Couldn't Be Mechanised", body:<>Many products simply <strong>could not be made with machines</strong> — intricate designs, unusual shapes, and specialised craftsmanship required skilled human hands that no machine could replicate.</> },
              { title:"Handmade = Status Symbol",             body:<><strong>Handmade products were considered more valuable and of 'class'</strong> than machine-made goods. Wealthy buyers actively preferred items that came with a human touch.</> },
              { title:"Finish & Detail",                      body:<>Machine-made products could not achieve the same <strong>intricate designs and immaculate finish</strong> as hand-crafted goods. For premium markets, machines simply couldn't compete on quality.</> },
            ].map((v, i) => (
              <div className="aoi-verdict-row" key={i}>
                <div className="aoi-verdict-num">{String(i+1).padStart(2,'0')}</div>
                <div>
                  <div className="aoi-verdict-title">{v.title}</div>
                  <div className="aoi-verdict-body">{v.body}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="aoi-table-wrap">
            <div className="aoi-table-title">⚙️ The Plight of the Workers</div>
            {[
              ["Hours & Wages",   "Workers had to work extremely long hours but received very low wages — one of the starkest contradictions of industrial progress"],
              ["Job Seeking",     "Workers without prior contacts had to wait for weeks before securing a job in a new city"],
              ["19th Century",    "Wages did nominally increase in the 19th century, but rampant inflation made this increase largely meaningless in real terms"],
              ["Rural Migration", "Rural peasants who could no longer earn through farming flooded urban towns desperately searching for factory work"],
              ["Competition",     "Traditional craftsmen found it nearly impossible to compete with factory output — yet factory workers were paid a paltry sum for brutal labour"],
            ].map(([k,v]) => (
              <div className="aoi-table-row" key={k}>
                <div className="aoi-table-key">{k}</div>
                <div className="aoi-table-val">{v}</div>
              </div>
            ))}
          </div>

          <div className="aoi-divider"><div className="aoi-divider-mark" /></div>

          {/* 4 — India Before British */}
          <div className="aoi-sec-head">
            <div className="aoi-sec-num">4</div>
            <div className="aoi-sec-title-wrap">
              <div className="aoi-sec-kicker">Pre-Colonial India</div>
              <h2 className="aoi-sec-title">India — The <span>Golden Bird</span> of Textiles</h2>
            </div>
          </div>

          <p className="aoi-body-text">
            Before British colonisation, India was at the <strong>absolute pinnacle of global textile manufacturing</strong>. India was the only nation producing the finest cotton clothes in the world — and its textiles travelled across continents through both land and sea routes to Central Asia, the Gulf, and South-East Asia.
          </p>

          <div className="aoi-trade-flow">
            <div className="aoi-tf-node">
              <div className="aoi-tf-icon">🧵</div>
              <div className="aoi-tf-label">Producer</div>
              <div className="aoi-tf-name">Indian Weavers</div>
              <div className="aoi-tf-sub">Finest cotton cloth in the world</div>
            </div>
            <div className="aoi-tf-arrow">›</div>
            <div className="aoi-tf-node">
              <div className="aoi-tf-icon">💰</div>
              <div className="aoi-tf-label">Supply Chain</div>
              <div className="aoi-tf-name">Supply Merchants</div>
              <div className="aoi-tf-sub">Paid weavers in advance; transported to ports</div>
            </div>
            <div className="aoi-tf-arrow">›</div>
            <div className="aoi-tf-node">
              <div className="aoi-tf-icon">⚓</div>
              <div className="aoi-tf-label">Ports</div>
              <div className="aoi-tf-name">Surat & Hooghly</div>
              <div className="aoi-tf-sub">Export merchants bought from suppliers</div>
            </div>
            <div className="aoi-tf-arrow">›</div>
            <div className="aoi-tf-node">
              <div className="aoi-tf-icon">🌍</div>
              <div className="aoi-tf-label">Markets</div>
              <div className="aoi-tf-name">Global Demand</div>
              <div className="aoi-tf-sub">Central Asia, Gulf, Europe, SE Asia</div>
            </div>
          </div>

          <div className="aoi-divider"><div className="aoi-divider-mark" /></div>

          {/* 5 — Before vs After */}
          <div className="aoi-sec-head">
            <div className="aoi-sec-num">5</div>
            <div className="aoi-sec-title-wrap">
              <div className="aoi-sec-kicker">The Colonial Takeover</div>
              <h2 className="aoi-sec-title">Before &amp; After — <span>The British Arrival</span></h2>
            </div>
          </div>

          <div className="aoi-contrast">
            <div className="aoi-contrast-side before">
              <div className="aoi-contrast-label">Before — Indian Golden Age</div>
              <div className="aoi-contrast-title">A Thriving Textile Economy</div>
              <ul>
                <li>India was the <strong>world's finest cotton textile producer</strong></li>
                <li>Indian traders freely traveled <strong>land and sea routes</strong> globally</li>
                <li><strong>Surat and Hooghly</strong> were thriving international ports</li>
                <li>A <strong>robust, self-sustaining network</strong> of supply and export merchants</li>
                <li>Weavers had <strong>bargaining power</strong> — their products were fashionable in Britain and Europe</li>
              </ul>
            </div>
            <div className="aoi-contrast-mid">VS</div>
            <div className="aoi-contrast-side after">
              <div className="aoi-contrast-label">After — Colonial Dismantling</div>
              <div className="aoi-contrast-title">Systematic Destruction</div>
              <ul>
                <li>European companies <strong>monopolised trade</strong> and removed Indian merchant freedom</li>
                <li>Old ports <strong>deteriorated fast</strong> — replaced by British-controlled ports</li>
                <li>The East India Company <strong>forced weavers to supply to them alone</strong></li>
                <li>Manchester traders lobbied to <strong>stop imports of Indian fine cotton</strong>, then flooded India with cheap machine cloth</li>
                <li>India reduced to an <strong>exporter of raw materials</strong> — silk, jute, cotton, sugar, minerals siphoned to Britain</li>
              </ul>
            </div>
          </div>

          <div className="aoi-divider"><div className="aoi-divider-mark" /></div>

          {/* 6 — Indian Pioneers */}
          <div className="aoi-sec-head">
            <div className="aoi-sec-num">6</div>
            <div className="aoi-sec-title-wrap">
              <div className="aoi-sec-kicker">Indian Resistance & Enterprise</div>
              <h2 className="aoi-sec-title">The Indian <span>Industrial Pioneers</span></h2>
            </div>
          </div>

          <p className="aoi-body-text">
            Despite every obstacle thrown up by British colonial policy, Indian entrepreneurs refused to surrender. Cotton mills rose in <strong>Bombay and Ahmedabad</strong>, jute mills in <strong>Bengal</strong>, and spinning and weaving mills in <strong>Madras</strong>. A generation of visionary industrialists fought back against the colonial chokehold.
          </p>

          <ul className="aoi-list">
            <li>When the British began exporting <strong>Opium to China from India</strong>, some Indian businessmen earned from financial and logistical services — using that capital to fund their own factories</li>
            <li>In Bengal: <strong>Dwarkanath Tagore</strong> and <strong>Seth Hukumchand</strong> established significant industrial ventures</li>
            <li>In Bombay: <strong>Dinshaw Petit</strong> and <strong>Jamsetjee Nusserwanjee Tata</strong> set up pioneering factories — though not permitted to trade in Europe</li>
            <li>When <strong>World War I started</strong>, British mills stopped exporting cheap Manchester cloth — the <strong>Indian market returned to Indian producers</strong></li>
            <li>Indian mills supplied war materials — this <strong>fuelled growth</strong> rather than hurting, with many new factories established</li>
            <li>After the war, British industries <strong>failed to regain dominant position</strong> — local producers held their ground</li>
            <li><strong>Small-scale workshops dominated overall production</strong> — cleverly adopting non-capital-intensive technologies, especially the handloom industry</li>
          </ul>

          <div className="aoi-pull-quote">
            <p>The handloom industry did not die under colonial pressure. It adapted, adopted new technology, and increased production — becoming a symbol of Indian economic resilience.</p>
            <cite>— The Indian Industrial Story</cite>
          </div>

          <div className="aoi-divider"><div className="aoi-divider-mark" /></div>

          {/* FAQ */}
          <div className="aoi-faq-header">
            <span className="aoi-faq-kicker">Exam Preparation</span>
          </div>
          <h2 className="aoi-faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, i) => (
            <div className={`aoi-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="aoi-faq-q" onClick={() => toggle(i)}>
                <span className="aoi-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="aoi-faq-icon">{openIndex === i ? "▴" : "▾"}</span>
              </button>
              <div className={`aoi-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
