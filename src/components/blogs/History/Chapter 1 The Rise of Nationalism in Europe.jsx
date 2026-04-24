import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:     #111010;
    --ink2:    #2c2825;
    --muted:   #6b6560;
    --paper:   #faf8f4;
    --paper2:  #f3efe8;
    --gold:    #b45309;
    --gold2:   #92400e;
    --gold-lt: #fef3c7;
    --rule:    #d6cfc3;
    --red:     #991b1b;
    --navy:    #1e3a5f;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .his-root {
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
  }

  /* ─────────────────────────────────────────
     HERO — full-bleed dark, oversized number
  ───────────────────────────────────────── */
  .his-hero {
    background: #0c0906;
    min-height: 88vh;
    display: flex;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
    padding: 0 0 64px;
  }
  /* Giant "01" behind everything */
  .his-hero-bg-num {
    position: absolute;
    bottom: -40px;
    right: -20px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(240px, 38vw, 520px);
    font-weight: 900;
    line-height: 1;
    color: rgba(255,255,255,0.03);
    letter-spacing: -0.04em;
    user-select: none;
    pointer-events: none;
  }
  /* Horizontal gold rule at top */
  .his-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 5px;
    background: linear-gradient(90deg, #b45309, #f59e0b, #b45309);
  }
  .his-hero-inner {
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding: 0 32px;
    position: relative;
    z-index: 1;
  }
  /* Small overline */
  .his-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #d97706;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .his-overline::before,
  .his-overline::after {
    content: '';
    flex: 0 0 40px;
    height: 1px;
    background: #d97706;
  }
  .his-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(44px, 8vw, 88px);
    font-weight: 900;
    color: #fff;
    line-height: 0.95;
    letter-spacing: -0.03em;
    margin-bottom: 32px;
  }
  .his-hero-title em {
    font-style: normal;
    color: #f59e0b;
  }
  /* Two-col meta bar */
  .his-hero-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 24px;
    margin-top: 8px;
  }
  .his-hero-bar-item {
    flex: 1 1 180px;
    padding: 0 24px 0 0;
    border-right: 1px solid rgba(255,255,255,0.1);
    margin-right: 24px;
  }
  .his-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .his-bar-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 5px;
  }
  .his-bar-value {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 600;
    color: rgba(255,255,255,0.75);
  }

  /* ─────────────────────────────────────────
     BODY WRAPPER
  ───────────────────────────────────────── */
  .his-body {
    max-width: 860px;
    margin: 0 auto;
    padding: 72px 32px 96px;
  }

  /* ─────────────────────────────────────────
     OPENING PARAGRAPH (big lead text)
  ───────────────────────────────────────── */
  .his-lead {
    border-left: 5px solid var(--gold);
    padding: 28px 36px;
    margin-bottom: 64px;
    background: var(--paper2);
  }
  .his-lead p {
    font-family: 'Poppins', sans-serif;
    font-size: 20px; font-weight: 500;
    color: var(--ink2);
    line-height: 1.75;
    margin: 0 0 14px;
  }
  .his-lead p:last-child { margin: 0; }
  .his-lead strong { color: var(--gold); }

  /* ─────────────────────────────────────────
     NUMBERED SECTION HEADER
     Big oversized number + title inline
  ───────────────────────────────────────── */
  .his-sec-head {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 28px;
    border-bottom: 2px solid var(--rule);
    padding-bottom: 18px;
  }
  .his-sec-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 56px; font-weight: 900;
    color: var(--rule);
    line-height: 1;
    flex-shrink: 0;
    margin-top: 4px;
  }
  .his-sec-title-wrap {}
  .his-sec-kicker {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 4px;
  }
  .his-sec-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(22px, 3.5vw, 32px); font-weight: 900;
    color: var(--ink);
    line-height: 1.15;
    letter-spacing: -0.01em;
  }
  .his-sec-title span { color: var(--gold); }
  .his-sec-title .navy { color: var(--navy); }
  .his-sec-title .red  { color: var(--red); }

  /* ─────────────────────────────────────────
     BODY TEXT
  ───────────────────────────────────────── */
  .his-body-text {
    font-family: 'Inter', sans-serif;
    font-size: 17px; font-weight: 400;
    color: #2c2825;
    line-height: 1.82;
    margin-bottom: 24px;
  }
  .his-body-text strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ─────────────────────────────────────────
     PULL QUOTE
  ───────────────────────────────────────── */
  .his-pull-quote {
    margin: 40px 0;
    padding: 32px 40px;
    background: var(--ink);
    position: relative;
  }
  .his-pull-quote::before {
    content: '"';
    position: absolute;
    top: -18px; left: 28px;
    font-family: 'Montserrat', sans-serif;
    font-size: 120px; font-weight: 900;
    color: var(--gold);
    line-height: 1;
  }
  .his-pull-quote p {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(18px, 2.5vw, 22px); font-weight: 800;
    color: #fff;
    line-height: 1.45;
    letter-spacing: -0.01em;
    position: relative; z-index: 1;
    margin-bottom: 12px;
  }
  .his-pull-quote cite {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 600;
    color: #d97706;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-style: normal;
  }

  /* ─────────────────────────────────────────
     BULLET LIST (styled, not card-grid)
  ───────────────────────────────────────── */
  .his-list {
    margin: 0 0 28px;
    padding: 0;
    list-style: none;
  }
  .his-list li {
    font-size: 16px; line-height: 1.75;
    color: #2c2825;
    padding: 10px 0 10px 28px;
    position: relative;
    border-bottom: 1px solid var(--rule);
  }
  .his-list li:first-child { border-top: 1px solid var(--rule); }
  .his-list li::before {
    content: '';
    position: absolute;
    left: 0; top: 18px;
    width: 10px; height: 10px;
    border: 2px solid var(--gold);
    transform: rotate(45deg);
    flex-shrink: 0;
  }
  .his-list li strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ─────────────────────────────────────────
     PERSON PROFILE — horizontal strip
  ───────────────────────────────────────── */
  .his-person {
    display: flex;
    align-items: flex-start;
    gap: 28px;
    background: var(--paper2);
    border: 1px solid var(--rule);
    border-left: 5px solid var(--gold);
    padding: 28px 32px;
    margin-bottom: 20px;
  }
  .his-person-monogram {
    flex-shrink: 0;
    width: 64px; height: 64px;
    background: var(--ink);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 26px; font-weight: 900;
    color: #f59e0b;
  }
  .his-person-name {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px; font-weight: 900;
    color: var(--ink);
    letter-spacing: -0.01em;
    margin-bottom: 3px;
  }
  .his-person-role {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.12em;
    color: var(--gold);
    margin-bottom: 14px;
  }
  .his-person ul {
    padding-left: 18px; margin: 0;
  }
  .his-person ul li {
    font-size: 15px; line-height: 1.7;
    color: #2c2825; margin-bottom: 5px;
  }
  .his-person ul li strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ─────────────────────────────────────────
     TIMELINE — newspaper style
  ───────────────────────────────────────── */
  .his-timeline {
    margin-bottom: 48px;
  }
  .his-tl-item {
    display: grid;
    grid-template-columns: 90px 1fr;
    gap: 0;
    margin-bottom: 0;
    border-bottom: 1px solid var(--rule);
  }
  .his-tl-item:first-child { border-top: 1px solid var(--rule); }
  .his-tl-year-col {
    padding: 20px 20px 20px 0;
    border-right: 2px solid var(--gold);
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
  }
  .his-tl-year {
    font-family: 'Montserrat', sans-serif;
    font-size: 17px; font-weight: 900;
    color: var(--gold);
    text-align: right;
    line-height: 1.2;
  }
  .his-tl-content {
    padding: 20px 0 20px 24px;
  }
  .his-tl-head {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; font-weight: 700;
    color: var(--ink);
    margin-bottom: 8px;
  }
  .his-tl-desc {
    font-size: 15px; line-height: 1.72;
    color: #374151;
  }
  .his-tl-desc strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ─────────────────────────────────────────
     ALLEGORY — two column editorial
  ───────────────────────────────────────── */
  .his-allegory-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    margin-bottom: 48px;
    background: var(--rule);
  }
  @media (max-width: 580px) { .his-allegory-wrap { grid-template-columns: 1fr; } }
  .his-allegory-col {
    background: var(--paper);
    padding: 36px 32px;
  }
  .his-allegory-col:first-child { background: var(--ink); }
  .his-allegory-symbol { font-size: 52px; margin-bottom: 16px; }
  .his-allegory-name {
    font-family: 'Montserrat', sans-serif;
    font-size: 28px; font-weight: 900;
    letter-spacing: -0.02em;
    margin-bottom: 4px;
  }
  .his-allegory-col:first-child .his-allegory-name { color: #fff; }
  .his-allegory-col:last-child  .his-allegory-name { color: var(--ink); }
  .his-allegory-nation {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    margin-bottom: 16px;
  }
  .his-allegory-col:first-child .his-allegory-nation { color: #d97706; }
  .his-allegory-col:last-child  .his-allegory-nation { color: var(--gold); }
  .his-allegory-col p {
    font-size: 15px; line-height: 1.72;
  }
  .his-allegory-col:first-child p { color: rgba(255,255,255,0.75); }
  .his-allegory-col:last-child  p { color: #374151; }

  /* ─────────────────────────────────────────
     NATION STRIP
  ───────────────────────────────────────── */
  .his-nation-strip {
    margin-bottom: 48px;
  }
  .his-nation-row {
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: 20px;
    align-items: start;
    padding: 22px 0;
    border-bottom: 1px solid var(--rule);
  }
  .his-nation-row:first-child { border-top: 1px solid var(--rule); }
  .his-nation-flag-col {
    font-size: 34px;
    line-height: 1;
    padding-top: 4px;
  }
  .his-nation-name {
    font-family: 'Montserrat', sans-serif;
    font-size: 19px; font-weight: 900;
    color: var(--ink);
    margin-bottom: 10px;
    letter-spacing: -0.01em;
  }
  .his-nation-row ul { padding-left: 18px; margin: 0; }
  .his-nation-row ul li {
    font-size: 15px; line-height: 1.7;
    color: #374151; margin-bottom: 5px;
  }
  .his-nation-row ul li strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ─────────────────────────────────────────
     TREATY TABLE
  ───────────────────────────────────────── */
  .his-table-wrap {
    margin-bottom: 48px;
    border: 1px solid var(--rule);
  }
  .his-table-title {
    background: var(--ink);
    padding: 14px 24px;
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 700;
    color: #f59e0b;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .his-table-row {
    display: grid;
    grid-template-columns: 140px 1fr;
    border-bottom: 1px solid var(--rule);
  }
  .his-table-row:last-child { border-bottom: none; }
  .his-table-key {
    background: var(--paper2);
    padding: 14px 18px;
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    color: var(--gold2);
    border-right: 1px solid var(--rule);
    display: flex; align-items: center;
  }
  .his-table-val {
    padding: 14px 18px;
    font-size: 15px; line-height: 1.65;
    color: #374151;
  }
  .his-table-val strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ─────────────────────────────────────────
     SECTION DIVIDER
  ───────────────────────────────────────── */
  .his-divider {
    display: flex; align-items: center; gap: 16px;
    margin: 56px 0;
  }
  .his-divider::before,
  .his-divider::after {
    content: ''; flex: 1;
    height: 1px; background: var(--rule);
  }
  .his-divider-mark {
    width: 10px; height: 10px;
    background: var(--gold);
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  /* ─────────────────────────────────────────
     FAQ — editorial style
  ───────────────────────────────────────── */
  .his-faq-header {
    border-bottom: 3px solid var(--ink);
    padding-bottom: 14px;
    margin-bottom: 0;
    display: flex; align-items: baseline; gap: 16px;
  }
  .his-faq-kicker {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--gold);
  }
  .his-faq-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(24px, 4vw, 34px); font-weight: 900;
    color: var(--ink);
    letter-spacing: -0.01em;
    margin: 20px 0 32px;
  }
  .his-faq-item {
    border-bottom: 1px solid var(--rule);
    overflow: hidden;
  }
  .his-faq-item.open { background: var(--paper2); }
  .his-faq-q {
    width: 100%; text-align: left;
    background: none; border: none; cursor: pointer;
    padding: 20px 0;
    display: grid;
    grid-template-columns: 1fr 32px;
    gap: 16px; align-items: start;
  }
  .his-faq-q-text {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; font-weight: 600;
    color: var(--ink); line-height: 1.5; text-align: left;
    padding-left: 4px;
  }
  .his-faq-item.open .his-faq-q-text { color: var(--gold2); }
  .his-faq-icon {
    width: 28px; height: 28px;
    border: 1.5px solid var(--rule);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; font-weight: 700;
    color: var(--gold);
    transition: transform 0.3s, background 0.2s;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .his-faq-item.open .his-faq-icon {
    transform: rotate(45deg);
    background: var(--ink);
    border-color: var(--ink);
    color: #f59e0b;
  }
  .his-faq-ans {
    display: none;
    padding: 0 4px 22px;
    font-size: 16px; line-height: 1.8; color: #374151;
  }
  .his-faq-ans.visible { display: block; }
  .his-faq-ans ul { padding-left: 20px; margin: 8px 0; }
  .his-faq-ans ul li { margin-bottom: 6px; }
  .his-faq-ans strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }
  .his-faq-ans p { margin: 0 0 10px; }
  .his-faq-ans p:last-child { margin: 0; }

  @media (max-width: 600px) {
    .his-hero { min-height: auto; padding: 80px 0 48px; }
    .his-person { flex-direction: column; }
    .his-tl-item { grid-template-columns: 70px 1fr; }
    .his-table-row { grid-template-columns: 100px 1fr; }
  }
`;

const faqs = [
  {
    q: "What was the aim of the French Revolution?",
    a: (<>
      <p>The French Revolution of 1789 was the <strong>starting point of nationalism in France</strong>. Its main objective was to build a collective identity among French people. Key steps taken by French revolutionaries included:</p>
      <ul>
        <li>Introducing ideas like <strong>Le Citoyen (The Citizen)</strong> and <strong>La Patrie (The Fatherland)</strong> — promoting the belief of a united community enjoying equal rights under the constitution</li>
        <li>Creation of a new <strong>French flag</strong> as a national symbol</li>
        <li>Election of the <strong>National Assembly</strong> (renamed from Estate General)</li>
        <li>Abolishing of customs and internal duties</li>
        <li>Introduction of <strong>uniform weights and measures</strong></li>
        <li>French becoming the <strong>common language</strong> of the nation</li>
      </ul>
    </>),
  },
  {
    q: "What did the Napoleonic Code establish?",
    a: (<>
      <p>The Napoleonic Code (Civil Code) of 1804 established:</p>
      <ul>
        <li><strong>Equality before law</strong> — all birth privileges were abolished</li>
        <li><strong>Right to property</strong> granted to French citizens</li>
        <li>Restrictions on <strong>guilds were removed</strong></li>
        <li>Communication and transport were improved</li>
        <li>Administration was simplified</li>
      </ul>
    </>),
  },
  {
    q: "Who was the 'Hero of two Worlds' and what was his role in the unification of Italy?",
    a: (<>
      <p><strong>Giuseppe Garibaldi</strong> was known as the 'Hero of Two Worlds'. Key contributions:</p>
      <ul>
        <li>Born in 1807, played an important role in the <strong>unification of Italy</strong></li>
        <li>Formed two secret societies — <strong>Young Italy in Marseilles</strong> and <strong>Young Europe in Berne</strong></li>
        <li>Believed that <strong>Italy could not survive as smaller states</strong> and needed to be unified as a republic</li>
        <li>His military campaigns helped bring Italian states under <strong>Victor Emmanuel II</strong> as king in 1861</li>
      </ul>
    </>),
  },
  {
    q: "Write about the two female allegories in the 19th century.",
    a: (<>
      <p><strong>1. Marianne (France):</strong> Named after a common Christian name, Marianne was used to promote the idea of a people's nation. She represented the ideals of <strong>liberty and republic</strong>. Statues of Marianne became symbols of national unity in France and were placed in public squares and on coins.</p>
      <p><strong>2. Germania (Germany):</strong> Germania was the allegory of the German nation. She wore a <strong>beautiful crown made of oak leaves</strong> — symbolising heroism. Her image was distinctively hung from St. Paul's Church ceiling to represent the liberal revolution in Germany.</p>
    </>),
  },
  {
    q: "Name some of the characteristic features of conservative regimes.",
    a: (<ul>
      <li><strong>Intolerant to criticism and dissent</strong> — opposition was not permitted</li>
      <li>Deeply <strong>autocratic</strong> — absolute power concentrated in rulers</li>
      <li>Maintained a <strong>censored press</strong> to control information</li>
      <li><strong>Suppressed questions</strong> that challenged their legitimacy or authority</li>
    </ul>),
  },
  {
    q: "Write the salient features of the Treaty of Vienna.",
    a: (<ul>
      <li>The <strong>Bourbon dynasty was restored</strong> in France after Napoleon's defeat</li>
      <li>France lost all its <strong>conquered territories</strong></li>
      <li>Kingdom of Netherlands (Belgium + Genoa) set up to <strong>block French expansion</strong></li>
      <li><strong>Prussia gained new territories</strong> including a fraction of Saxony</li>
      <li><strong>Northern Italy placed under Austria</strong>; Poland under Russia</li>
    </ul>),
  },
  {
    q: "Explain the importance of National feeling and Imagination.",
    a: (<>
      <p>Culture was extremely important for the development of national feelings:</p>
      <ul>
        <li>Arts, poetry, music, and stories helped <strong>create and spread nationalist sentiments</strong></li>
        <li>The glorification of science was criticised and replaced by <strong>intuitions, sentiments, and emotions</strong> — this movement was known as <strong>Romanticism</strong></li>
        <li>German philosopher <strong>Johan Gottfried</strong> discovered culture in common people through music, dance, and folk poetry</li>
        <li><strong>Language</strong> played a critical role in developing a shared national identity</li>
      </ul>
    </>),
  },
  {
    q: "What was the main cause of the revolt in 1848?",
    a: (<ul>
      <li>There were <strong>more people but fewer jobs</strong></li>
      <li>In 1848, <strong>widespread unemployment and food shortages</strong> aggravated the population</li>
      <li><strong>Rise in food costs and bad harvesting</strong> caused widespread pauperism across the country</li>
      <li>The <strong>Silesian weavers revolted against contractors in 1845</strong>, signalling growing economic unrest</li>
    </ul>),
  },
  {
    q: "Write any three features of the Frankfurt Parliament.",
    a: (<ul>
      <li><strong>831 elected representatives</strong> marched to the Frankfurt Parliament on 18th May 1848, convened in St. Paul's Church</li>
      <li>The Parliament was <strong>dominated by working class men and women</strong></li>
      <li><strong>King Friedrich Wilhelm IV of Prussia rejected</strong> the offer of constitutional monarchy, causing the Parliament to fail</li>
    </ul>),
  },
  {
    q: "Why did liberal nationalists create secret societies?",
    a: (<ul>
      <li>Created to <strong>train European revolutionaries</strong> and spread their nationalist ideas across the continent</li>
      <li>To <strong>oppose the monarchical forms</strong> established by the Vienna Congress</li>
      <li>To continue the fight for <strong>freedom and liberty</strong> against authoritarian regimes that suppressed dissent</li>
    </ul>),
  },
  {
    q: "Why were the Balkan nations in crisis?",
    a: (<>
      <p>The Balkan region (Bulgaria, Croatia, Greece, Romania, Bosnia-Herzegovina, Albania, Serbia, Macedonia, Montenegro, Slovenia) was in crisis because:</p>
      <ul>
        <li><strong>Majority of Balkan territory was under the control of the Ottoman Empire</strong></li>
        <li>The <strong>spread of Romantic nationalism</strong> stirred independence movements throughout the region</li>
        <li>The <strong>deterioration of the Ottoman Empire</strong> created a power vacuum that major European powers wanted to fill</li>
        <li>This explosive combination ultimately led to a <strong>series of wars that triggered World War I</strong></li>
      </ul>
    </>),
  },
];

export default function RiseOfNationalismInEurope() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="his-root">

        {/* ── HERO ── */}
        <div className="his-hero">
          <div className="his-hero-bg-num">01</div>
          <div className="his-hero-inner">
            <div className="his-overline">Class 10 · Social Science · History</div>
            <h1 className="his-hero-title">
              Rise of<br /><em>Nationalism</em><br />in Europe
            </h1>
            <div className="his-hero-bar">
              <div className="his-hero-bar-item">
                <div className="his-bar-label">Subject</div>
                <div className="his-bar-value">History</div>
              </div>
              <div className="his-hero-bar-item">
                <div className="his-bar-label">Chapter</div>
                <div className="his-bar-value">Chapter 1</div>
              </div>
              <div className="his-hero-bar-item">
                <div className="his-bar-label">Period</div>
                <div className="his-bar-value">1789 – 1871</div>
              </div>
              <div className="his-hero-bar-item">
                <div className="his-bar-label">FAQs</div>
                <div className="his-bar-value">11 Questions</div>
              </div>
            </div>
          </div>
        </div>

        <div className="his-body">

          {/* Opening */}
          <div className="his-lead">
            <p>The 19th century in Europe was shaped by one powerful idea — <strong>Nationalism</strong>. It transformed the political map of the continent, toppled empires, united fragmented states, and ultimately ignited the first global conflict.</p>
            <p>From the <strong>French Revolution of 1789</strong> to the crisis in the <strong>Balkans</strong>, this chapter traces how ordinary people, artists, philosophers, and revolutionaries built the idea of a nation — and why it changed the world forever.</p>
          </div>

          {/* 1. Frédéric Sorrieu */}
          <div className="his-sec-head">
            <div className="his-sec-num">1</div>
            <div className="his-sec-title-wrap">
              <div className="his-sec-kicker">Artist & Visionary</div>
              <h2 className="his-sec-title">Frédéric <span>Sorrieu</span></h2>
            </div>
          </div>
          <p className="his-body-text">
            Frédéric Sorrieu was a <strong>French artist</strong> who, in 1848, presented a remarkable series of paintings that visualised his dream — a world made up of <strong>democratic and social republics</strong>. His paintings depicted peoples of Europe and America marching in a long procession, paying homage to the Statue of Liberty. His vision captured the revolutionary spirit of an era when nationalism was reshaping the entire world.
          </p>

          <div className="his-divider"><div className="his-divider-mark" /></div>

          {/* 2. French Revolution */}
          <div className="his-sec-head">
            <div className="his-sec-num">2</div>
            <div className="his-sec-title-wrap">
              <div className="his-sec-kicker">The Spark — 1789</div>
              <h2 className="his-sec-title">The French <span>Revolution</span></h2>
            </div>
          </div>

          <div className="his-pull-quote">
            <p>The French Revolution was not just a political event — it was the birth of nationalism as a lived idea.</p>
            <cite>— The starting point of collective national identity in Europe</cite>
          </div>

          <p className="his-body-text">The French Revolution of 1789 was the <strong>starting point of nationalism</strong>. French revolutionaries took several bold steps to create a feeling of collective identity among the people:</p>

          <ul className="his-list">
            <li>Innovative ideas such as <strong>Le Citoyen (The Citizen)</strong> and <strong>La Patrie (The Fatherland)</strong> — promoting the belief of a united community with equal rights</li>
            <li>Creation of a new <strong>French flag</strong> as a symbol of national unity</li>
            <li>Election of the <strong>National Assembly</strong>, renamed from Estate General</li>
            <li>A consolidated and simplified <strong>administrative system</strong></li>
            <li><strong>Abolishing customs and internal duties</strong> to unify the economy</li>
            <li>Introduction of <strong>uniform weights and measures</strong> across the nation</li>
            <li>French becoming the <strong>common language</strong> of the people</li>
          </ul>

          <div className="his-divider"><div className="his-divider-mark" /></div>

          {/* 3. Napoleonic Code */}
          <div className="his-sec-head">
            <div className="his-sec-num">3</div>
            <div className="his-sec-title-wrap">
              <div className="his-sec-kicker">Civil Code — 1804</div>
              <h2 className="his-sec-title">The Napoleonic <span>Code</span></h2>
            </div>
          </div>

          <p className="his-body-text">Napoleon introduced the <strong>Civil Code of 1804</strong>, also known as the Napoleonic Code. While he destroyed French democracy by concentrating power in his own hands, his code carried revolutionary ideas across Europe. The key features were:</p>

          <div className="his-table-wrap">
            <div className="his-table-title">📋 Features of the Napoleonic Code</div>
            {[
              ["Equality","Abolishing of all birth rights and privileges — every citizen equal before the law"],
              ["Property","Security of the right to property granted to all French citizens"],
              ["Guilds","Guild restrictions were removed — freeing trade and craftsmanship"],
              ["Administration","Simplified administrative system and improved communication and transport"],
            ].map(([k,v]) => (
              <div className="his-table-row" key={k}>
                <div className="his-table-key">{k}</div>
                <div className="his-table-val">{v}</div>
              </div>
            ))}
          </div>

          <div className="his-divider"><div className="his-divider-mark" /></div>

          {/* 4. New Middle Class & Liberalism */}
          <div className="his-sec-head">
            <div className="his-sec-num">4</div>
            <div className="his-sec-title-wrap">
              <div className="his-sec-kicker">Society & Politics</div>
              <h2 className="his-sec-title">New Middle Class &amp; <span>Liberalism</span></h2>
            </div>
          </div>

          <p className="his-body-text">Politically and socially, <strong>aristocrats were dominant</strong> across Europe, while peasants formed the majority of the population. Since industrialisation in England, however, a new social class — the <strong>working class</strong> — had emerged, consisting of artisans, industrialists, and businessmen.</p>

          <p className="his-body-text"><strong>Liberalism</strong> was derived from the Latin word <em>'liber'</em> — meaning to be free. Under early liberal thought, only <strong>property-owning men</strong> were given the right to vote or be elected. Every woman and property-less man was restricted from all political rights. Liberal nationalism stood for the <strong>end of clerical privilege and autocracy</strong>.</p>

          <div className="his-divider"><div className="his-divider-mark" /></div>

          {/* 5. Conservatism & Vienna */}
          <div className="his-sec-head">
            <div className="his-sec-num">5</div>
            <div className="his-sec-title-wrap">
              <div className="his-sec-kicker">The Conservative Backlash — 1815</div>
              <h2 className="his-sec-title">New Conservatism &amp; <span>Treaty of Vienna</span></h2>
            </div>
          </div>

          <p className="his-body-text">The major European powers of 1815 — <strong>Britain, Russia, Prussia, and Austria</strong> — had together defeated Napoleon. They met in Vienna to draw up a European settlement called the <strong>Treaty of Vienna</strong>, aimed at restoring conservative order across the continent.</p>

          <ul className="his-list">
            <li>Power was restored to the <strong>Bourbon dynasty</strong> in France</li>
            <li>France lost all territories gained during the <strong>Napoleonic Wars</strong></li>
            <li>The <strong>39 states of the German Confederation</strong>, formed by Napoleon, were left untouched</li>
            <li>Borders were established on France's boundary to <strong>prevent future French expansion</strong></li>
            <li>Kingdom of Netherlands (Belgium + Genoa) set up as a buffer; <strong>Prussia gained Saxony territory</strong></li>
            <li>Northern Italy placed under <strong>Austria</strong>; Poland under <strong>Russia</strong></li>
          </ul>

          <p className="his-body-text" style={{marginTop:'20px'}}>Conservative regimes of this era were <strong>intolerant to criticism and dissent</strong>, deeply autocratic, maintained a <strong>censored press</strong>, and suppressed any questions that challenged their legitimacy.</p>

          <div className="his-divider"><div className="his-divider-mark" /></div>

          {/* 6. The Revolutionaries */}
          <div className="his-sec-head">
            <div className="his-sec-num">6</div>
            <div className="his-sec-title-wrap">
              <div className="his-sec-kicker">Key Figures</div>
              <h2 className="his-sec-title">The <span>Revolutionaries</span></h2>
            </div>
          </div>

          <div className="his-person">
            <div className="his-person-monogram">M</div>
            <div>
              <div className="his-person-name">Giuseppe Mazzini</div>
              <div className="his-person-role">Italian Nationalist & Founder of Secret Societies</div>
              <ul>
                <li>Born in <strong>Genoa in 1807</strong></li>
                <li>Member of the secret society of <strong>Carbonari</strong></li>
                <li>Founded <strong>Young Italy</strong> in Marseilles and <strong>Young Europe</strong> in Berne</li>
                <li>Main aim: to <strong>unify Italy as a republic</strong></li>
                <li>Believed Italy could not survive as smaller fragmented states and needed unification</li>
              </ul>
            </div>
          </div>

          <div className="his-person">
            <div className="his-person-monogram">G</div>
            <div>
              <div className="his-person-name">Giuseppe Garibaldi</div>
              <div className="his-person-role">'Hero of Two Worlds' — Military Unifier of Italy</div>
              <ul>
                <li>Born in <strong>1807</strong></li>
                <li>Played a crucial role in the <strong>military unification of Italy</strong></li>
                <li>His campaigns brought Italian states under <strong>Victor Emmanuel II</strong></li>
                <li>Unified Italy established in <strong>1861</strong></li>
              </ul>
            </div>
          </div>

          <div className="his-person" style={{marginBottom:'48px'}}>
            <div className="his-person-monogram">B</div>
            <div>
              <div className="his-person-name">Otto Von Bismarck</div>
              <div className="his-person-role">Architect of German Unification</div>
              <ul>
                <li>Took a <strong>leadership role</strong> in the unification of Germany</li>
                <li>Used support of the <strong>Prussian army and bureaucracy</strong></li>
                <li>Led to formation of the <strong>German Empire</strong> under <strong>Kaiser Wilhelm I</strong></li>
              </ul>
            </div>
          </div>

          <div className="his-divider"><div className="his-divider-mark" /></div>

          {/* 7. Age of Revolutions */}
          <div className="his-sec-head">
            <div className="his-sec-num">7</div>
            <div className="his-sec-title-wrap">
              <div className="his-sec-kicker">1830 – 1848</div>
              <h2 className="his-sec-title">The Age of <span>Revolutions</span></h2>
            </div>
          </div>

          <div className="his-timeline">
            {[
              { year:"JULY\n1830", head:"Bourbon Kings Overthrown — France", desc:<>The Bourbon kings were overthrown to set up a <strong>constitutional monarchy</strong> in France, replacing absolute royal rule with a government bound by law and popular representation.</> },
              { year:"1832",       head:"Greek Independence — Treaty of Constantinople", desc:<>Greece had long been struggling for independence as part of the <strong>Ottoman Empire</strong>. Greece was finally declared an <strong>independent nation</strong> in the Treaty of Constantinople in 1832 — a landmark victory for nationalist movements.</> },
              { year:"1830s",      head:"Romanticism & National Culture", desc:<>German philosopher <strong>Johan Gottfried</strong> discovered the culture in common people through <strong>music, dance, and folk poetry</strong>. The glorification of science was replaced by <strong>Romanticism</strong> — intuitions, sentiments, and emotions — aimed at building national consciousness. Language also played an important role in developing national feelings.</> },
              { year:"1845",       head:"Silesian Weavers Revolt", desc:<>In 1845, <strong>Silesian weavers revolted against contractors</strong> in protest against exploitation and deteriorating working conditions — an early signal of growing economic unrest and class consciousness across Europe.</> },
              { year:"MAY\n1848",  head:"Frankfurt Parliament", desc:<><strong>831 elected representatives</strong> convened in St. Paul's Church for the Frankfurt Parliament. The Parliament was dominated by the working class. However, it failed when <strong>King Friedrich Wilhelm IV of Prussia rejected</strong> the offer of a constitutional monarchy. The year also saw widespread unemployment, food shortages, and pauperism — more people, fewer jobs, rising food prices, and uprisings across Europe.</> },
            ].map((t,i) => (
              <div className="his-tl-item" key={i}>
                <div className="his-tl-year-col"><div className="his-tl-year" style={{whiteSpace:'pre-line'}}>{t.year}</div></div>
                <div className="his-tl-content">
                  <div className="his-tl-head">{t.head}</div>
                  <div className="his-tl-desc">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="his-divider"><div className="his-divider-mark" /></div>

          {/* 8. Nation Building */}
          <div className="his-sec-head">
            <div className="his-sec-num">8</div>
            <div className="his-sec-title-wrap">
              <div className="his-sec-kicker">Nation Building</div>
              <h2 className="his-sec-title">Making of <span>Nations</span></h2>
            </div>
          </div>

          <div className="his-nation-strip">
            {[
              { flag:"🇩🇪", name:"Making of Germany", points:[<><strong>Otto Von Bismarck</strong> took leadership with support of Prussian army and bureaucracy</>,<><strong>Kaiser Wilhelm I</strong> became the new head of the German Empire</>,<>Unified through military strength and strategic diplomacy rather than popular revolution</>] },
              { flag:"🇮🇹", name:"Making of Italy",   points:[<><strong>Giuseppe Mazzini</strong> headed the unification programme, but it initially failed</>,<><strong>Giuseppe Garibaldi's</strong> military campaigns were decisive</>,<><strong>Victor Emmanuel II</strong> became the first king of unified Italy in <strong>1861</strong></>] },
              { flag:"🇬🇧", name:"Britain",            points:[<>The <strong>English Parliament seized power</strong> from the ruling monarchy</>,<>British forces took Ireland in <strong>1801</strong> after a revolution failed</>,<>The <strong>British Nation</strong> was formed through mass propagation of <strong>English culture</strong></>] },
            ].map((n,i) => (
              <div className="his-nation-row" key={i}>
                <div className="his-nation-flag-col">{n.flag}</div>
                <div>
                  <div className="his-nation-name">{n.name}</div>
                  <ul>{n.points.map((p,j) => <li key={j}>{p}</li>)}</ul>
                </div>
              </div>
            ))}
          </div>

          {/* 9. Allegories */}
          <div className="his-sec-head">
            <div className="his-sec-num">9</div>
            <div className="his-sec-title-wrap">
              <div className="his-sec-kicker">Symbols of Nationhood</div>
              <h2 className="his-sec-title">Female <span>Allegories</span></h2>
            </div>
          </div>

          <div className="his-allegory-wrap">
            <div className="his-allegory-col">
              <div className="his-allegory-symbol">👸</div>
              <div className="his-allegory-name">Marianne</div>
              <div className="his-allegory-nation">Allegory of France</div>
              <p>Named after a common Christian name, Marianne promoted the idea of a people's nation. She embodied the ideals of <strong style={{color:'#f59e0b'}}>liberty and republic</strong>. Statues of Marianne became symbols of national unity — placed in public squares, coins, and official buildings across France.</p>
            </div>
            <div className="his-allegory-col">
              <div className="his-allegory-symbol">👑</div>
              <div className="his-allegory-name">Germania</div>
              <div className="his-allegory-nation">Allegory of Germany</div>
              <p>Germania wore a <strong>beautiful crown made of oak leaves</strong> — symbolising heroism and strength. Her image was distinctively hung from <strong>St. Paul's Church ceiling</strong> to represent the liberal revolution in Germany and the aspirations of German unity.</p>
            </div>
          </div>

          {/* 10. Nationalism & Imperialism */}
          <div className="his-sec-head">
            <div className="his-sec-num">10</div>
            <div className="his-sec-title-wrap">
              <div className="his-sec-kicker">The Consequence</div>
              <h2 className="his-sec-title">Nationalism &amp; <span className="red">Imperialism</span></h2>
            </div>
          </div>

          <p className="his-body-text">The modern Balkans included <strong>Bulgaria, Croatia, Greece, Romania, Bosnia-Herzegovina, Albania, Serbia, Macedonia, Montenegro, and Slovenia</strong>. This region became an explosive powder keg due to a fatal combination of forces:</p>

          <ul className="his-list">
            <li>Majority of the Balkans was under control of the <strong>Ottoman Empire</strong></li>
            <li>The spread of <strong>Romantic nationalism</strong> stirred independence movements throughout the region</li>
            <li>The <strong>deterioration of the Ottoman Empire</strong> created a dangerous power vacuum</li>
            <li>Major European powers competed to gain <strong>control over this explosive region</strong></li>
            <li>This ultimately led to a series of wars and the <strong>First World War</strong></li>
          </ul>

          <div className="his-pull-quote" style={{marginTop:'40px'}}>
            <p>The Balkans, shaped by Romantic nationalism and imperial ambition, became the fuse that set the world on fire.</p>
            <cite>— The Road to World War I</cite>
          </div>

          <div className="his-divider"><div className="his-divider-mark" /></div>

          {/* FAQ */}
          <div className="his-faq-header">
            <span className="his-faq-kicker">Exam Preparation</span>
          </div>
          <h2 className="his-faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, i) => (
            <div className={`his-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="his-faq-q" onClick={() => toggle(i)}>
                <span className="his-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="his-faq-icon">+</span>
              </button>
              <div className={`his-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
