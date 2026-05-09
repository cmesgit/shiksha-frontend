import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:      #0f1a0f;
    --ink2:     #1e2e1e;
    --muted:    #5a6b5a;
    --paper:    #f4f9f4;
    --paper2:   #e8f3e8;
    --saffron:  #c05e00;
    --saffron2: #9a4700;
    --saffron-lt: #fff3e0;
    --green:    #1a5c2a;
    --green2:   #134821;
    --green-lt: #e8f5e9;
    --rule:     #c8dcc8;
    --white:    #ffffff;
    --chakra:   #1a3c6e;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .nin-root {
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
  }

  /* ─────────────────────────────────────────
     HERO — tricolor-inspired dark
  ───────────────────────────────────────── */
  .nin-hero {
    background: #060d06;
    min-height: 88vh;
    display: flex;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
    padding: 0 0 64px;
  }
  /* Giant "02" ghost number */
  .nin-hero-bg-num {
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
  /* Tricolor top bar */
  .nin-hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 6px;
    background: linear-gradient(90deg, #FF9933 33%, #ffffff 33%, #ffffff 66%, #138808 66%);
  }
  /* Subtle Ashoka chakra watermark */
  .nin-hero-chakra {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: clamp(200px, 30vw, 380px);
    height: clamp(200px, 30vw, 380px);
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.04);
    pointer-events: none;
    user-select: none;
  }
  .nin-hero-chakra::before {
    content: '';
    position: absolute;
    inset: 18%;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.04);
  }
  .nin-hero-inner {
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding: 0 32px;
    position: relative;
    z-index: 1;
  }
  .nin-overline {
    font-family: 'Poppins', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #FF9933;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .nin-overline::before,
  .nin-overline::after {
    content: '';
    flex: 0 0 40px;
    height: 1px;
    background: #FF9933;
  }
  .nin-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(44px, 8vw, 88px);
    font-weight: 900;
    color: #fff;
    line-height: 0.95;
    letter-spacing: -0.03em;
    margin-bottom: 32px;
  }
  .nin-hero-title em {
    font-style: normal;
    color: #FF9933;
  }
  .nin-hero-title .green-em {
    color: #4caf50;
  }
  .nin-hero-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    padding-top: 24px;
    margin-top: 8px;
  }
  .nin-hero-bar-item {
    flex: 1 1 180px;
    padding: 0 24px 0 0;
    border-right: 1px solid rgba(255,255,255,0.1);
    margin-right: 24px;
  }
  .nin-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .nin-bar-label {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 5px;
  }
  .nin-bar-value {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 600;
    color: rgba(255,255,255,0.75);
  }

  /* ─────────────────────────────────────────
     BODY WRAPPER
  ───────────────────────────────────────── */
  .nin-body {
    max-width: 860px;
    margin: 0 auto;
    padding: 72px 32px 96px;
  }

  /* ─────────────────────────────────────────
     LEAD INTRO CARD
  ───────────────────────────────────────── */
  .nin-lead {
    border-left: 5px solid var(--saffron);
    padding: 28px 36px;
    margin-bottom: 64px;
    background: var(--paper2);
  }
  .nin-lead p {
    font-family: 'Poppins', sans-serif;
    font-size: 19px; font-weight: 500;
    color: var(--ink2);
    line-height: 1.78;
    margin: 0 0 14px;
  }
  .nin-lead p:last-child { margin: 0; }
  .nin-lead strong { color: var(--saffron); }

  /* ─────────────────────────────────────────
     SECTION HEADER
  ───────────────────────────────────────── */
  .nin-sec-head {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 28px;
    border-bottom: 2px solid var(--rule);
    padding-bottom: 18px;
  }
  .nin-sec-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 56px; font-weight: 900;
    color: var(--rule);
    line-height: 1;
    flex-shrink: 0;
    margin-top: 4px;
  }
  .nin-sec-kicker {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--saffron);
    margin-bottom: 4px;
  }
  .nin-sec-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(22px, 3.5vw, 32px); font-weight: 900;
    color: var(--ink);
    line-height: 1.15;
    letter-spacing: -0.01em;
  }
  .nin-sec-title span { color: var(--saffron); }
  .nin-sec-title .green { color: var(--green); }

  /* ─────────────────────────────────────────
     BODY TEXT
  ───────────────────────────────────────── */
  .nin-body-text {
    font-family: 'Inter', sans-serif;
    font-size: 17px; font-weight: 400;
    color: #1e2e1e;
    line-height: 1.82;
    margin-bottom: 24px;
  }
  .nin-body-text strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ─────────────────────────────────────────
     PULL QUOTE
  ───────────────────────────────────────── */
  .nin-pull-quote {
    margin: 40px 0;
    padding: 32px 40px;
    background: var(--ink);
    position: relative;
  }
  .nin-pull-quote::before {
    content: '"';
    position: absolute;
    top: -18px; left: 28px;
    font-family: 'Montserrat', sans-serif;
    font-size: 120px; font-weight: 900;
    color: #FF9933;
    line-height: 1;
  }
  .nin-pull-quote p {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(17px, 2.4vw, 22px); font-weight: 800;
    color: #fff;
    line-height: 1.45;
    letter-spacing: -0.01em;
    position: relative; z-index: 1;
    margin-bottom: 12px;
  }
  .nin-pull-quote cite {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 600;
    color: #FF9933;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-style: normal;
  }

  /* ─────────────────────────────────────────
     BULLET LIST
  ───────────────────────────────────────── */
  .nin-list {
    margin: 0 0 28px;
    padding: 0;
    list-style: none;
  }
  .nin-list li {
    font-size: 16px; line-height: 1.75;
    color: #1e2e1e;
    padding: 10px 0 10px 28px;
    position: relative;
    border-bottom: 1px solid var(--rule);
  }
  .nin-list li:first-child { border-top: 1px solid var(--rule); }
  .nin-list li::before {
    content: '';
    position: absolute;
    left: 0; top: 18px;
    width: 10px; height: 10px;
    border: 2px solid var(--saffron);
    transform: rotate(45deg);
    flex-shrink: 0;
  }
  .nin-list li strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ─────────────────────────────────────────
     PERSON / LEADER CARD
  ───────────────────────────────────────── */
  .nin-person {
    display: flex;
    align-items: flex-start;
    gap: 28px;
    background: var(--paper2);
    border: 1px solid var(--rule);
    border-left: 5px solid var(--saffron);
    padding: 28px 32px;
    margin-bottom: 20px;
  }
  .nin-person-monogram {
    flex-shrink: 0;
    width: 64px; height: 64px;
    background: var(--ink);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 26px; font-weight: 900;
    color: #FF9933;
  }
  .nin-person-name {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px; font-weight: 900;
    color: var(--ink);
    letter-spacing: -0.01em;
    margin-bottom: 3px;
  }
  .nin-person-role {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.12em;
    color: var(--saffron);
    margin-bottom: 14px;
  }
  .nin-person ul {
    padding-left: 18px; margin: 0;
  }
  .nin-person ul li {
    font-size: 15px; line-height: 1.7;
    color: #1e2e1e; margin-bottom: 6px;
  }
  .nin-person ul li strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ─────────────────────────────────────────
     SATYAGRAHA TIMELINE
  ───────────────────────────────────────── */
  .nin-timeline {
    margin-bottom: 48px;
  }
  .nin-tl-item {
    display: grid;
    grid-template-columns: 90px 1fr;
    gap: 0;
    margin-bottom: 0;
    border-bottom: 1px solid var(--rule);
  }
  .nin-tl-item:first-child { border-top: 1px solid var(--rule); }
  .nin-tl-year-col {
    padding: 20px 20px 20px 0;
    border-right: 2px solid var(--saffron);
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
  }
  .nin-tl-year {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px; font-weight: 900;
    color: var(--saffron);
    text-align: right;
    line-height: 1.2;
  }
  .nin-tl-content {
    padding: 20px 0 20px 24px;
  }
  .nin-tl-head {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; font-weight: 700;
    color: var(--ink);
    margin-bottom: 8px;
  }
  .nin-tl-desc {
    font-size: 15px; line-height: 1.72;
    color: #374151;
  }
  .nin-tl-desc strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ─────────────────────────────────────────
     EVENT CARD GRID (2-col)
  ───────────────────────────────────────── */
  .nin-event-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    margin-bottom: 48px;
    background: var(--rule);
  }
  @media (max-width: 580px) { .nin-event-grid { grid-template-columns: 1fr; } }
  .nin-event-card {
    background: var(--paper);
    padding: 28px 28px;
  }
  .nin-event-card.dark {
    background: var(--ink);
  }
  .nin-event-card-tag {
    font-family: 'Poppins', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--saffron);
    margin-bottom: 8px;
  }
  .nin-event-card.dark .nin-event-card-tag { color: #FF9933; }
  .nin-event-card-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px; font-weight: 900;
    margin-bottom: 14px;
    letter-spacing: -0.01em;
    line-height: 1.2;
  }
  .nin-event-card.dark .nin-event-card-title { color: #ffffff; }
  .nin-event-card:not(.dark) .nin-event-card-title { color: var(--ink); }
  .nin-event-card ul {
    padding-left: 18px; margin: 0;
  }
  .nin-event-card ul li {
    font-size: 15px; line-height: 1.72; margin-bottom: 6px;
  }
  .nin-event-card.dark ul li { color: rgba(255,255,255,0.78); }
  .nin-event-card:not(.dark) ul li { color: #374151; }
  .nin-event-card ul li strong { font-family: 'Poppins', sans-serif; font-weight: 700; }
  .nin-event-card.dark ul li strong { color: #FF9933; }
  .nin-event-card:not(.dark) ul li strong { color: var(--ink); }

  /* ─────────────────────────────────────────
     INFO TABLE
  ───────────────────────────────────────── */
  .nin-table-wrap {
    margin-bottom: 48px;
    border: 1px solid var(--rule);
  }
  .nin-table-title {
    background: var(--ink);
    padding: 14px 24px;
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 700;
    color: #FF9933;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .nin-table-row {
    display: grid;
    grid-template-columns: 150px 1fr;
    border-bottom: 1px solid var(--rule);
  }
  .nin-table-row:last-child { border-bottom: none; }
  .nin-table-key {
    background: var(--paper2);
    padding: 14px 18px;
    font-family: 'Poppins', sans-serif;
    font-size: 13px; font-weight: 700;
    color: var(--saffron2);
    border-right: 1px solid var(--rule);
    display: flex; align-items: center;
  }
  .nin-table-val {
    padding: 14px 18px;
    font-size: 15px; line-height: 1.65;
    color: #374151;
  }
  .nin-table-val strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }

  /* ─────────────────────────────────────────
     STAT / DATE CALLOUT ROW
  ───────────────────────────────────────── */
  .nin-stat-row {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    margin-bottom: 48px;
    background: var(--rule);
  }
  .nin-stat-box {
    flex: 1 1 140px;
    background: var(--paper);
    padding: 24px 20px;
    text-align: center;
  }
  .nin-stat-val {
    font-family: 'Montserrat', sans-serif;
    font-size: 32px; font-weight: 900;
    color: var(--saffron);
    line-height: 1.1;
    margin-bottom: 6px;
    letter-spacing: -0.02em;
  }
  .nin-stat-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px; font-weight: 600;
    color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.1em;
    line-height: 1.4;
  }

  /* ─────────────────────────────────────────
     SECTION DIVIDER
  ───────────────────────────────────────── */
  .nin-divider {
    display: flex; align-items: center; gap: 16px;
    margin: 56px 0;
  }
  .nin-divider::before,
  .nin-divider::after {
    content: ''; flex: 1;
    height: 1px; background: var(--rule);
  }
  .nin-divider-mark {
    width: 10px; height: 10px;
    background: var(--saffron);
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  /* ─────────────────────────────────────────
     FAQ
  ───────────────────────────────────────── */
  .nin-faq-header {
    border-bottom: 3px solid var(--ink);
    padding-bottom: 14px;
    margin-bottom: 0;
    display: flex; align-items: baseline; gap: 16px;
  }
  .nin-faq-kicker {
    font-family: 'Poppins', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--saffron);
  }
  .nin-faq-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(24px, 4vw, 34px); font-weight: 900;
    color: var(--ink);
    letter-spacing: -0.01em;
    margin: 20px 0 32px;
  }
  .nin-faq-item {
    border-bottom: 1px solid var(--rule);
    overflow: hidden;
  }
  .nin-faq-item.open { background: var(--paper2); }
  .nin-faq-q {
    width: 100%; text-align: left;
    background: none; border: none; cursor: pointer;
    padding: 20px 0;
    display: grid;
    grid-template-columns: 1fr 32px;
    gap: 16px; align-items: start;
  }
  .nin-faq-q-text {
    font-family: 'Poppins', sans-serif;
    font-size: 16px; font-weight: 600;
    color: var(--ink); line-height: 1.5; text-align: left;
    padding-left: 4px;
  }
  .nin-faq-item.open .nin-faq-q-text { color: var(--saffron2); }
  .nin-faq-icon {
    width: 28px; height: 28px;
    border: 1.5px solid var(--rule);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; font-weight: 700;
    color: var(--saffron);
    transition: transform 0.3s, background 0.2s;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .nin-faq-item.open .nin-faq-icon {
    transform: rotate(45deg);
    background: var(--ink);
    border-color: var(--ink);
    color: #FF9933;
  }
  .nin-faq-ans {
    display: none;
    padding: 0 4px 22px;
    font-size: 16px; line-height: 1.8; color: #374151;
  }
  .nin-faq-ans.visible { display: block; }
  .nin-faq-ans ul { padding-left: 20px; margin: 8px 0; }
  .nin-faq-ans ul li { margin-bottom: 6px; }
  .nin-faq-ans strong { color: var(--ink); font-family: 'Poppins', sans-serif; font-weight: 700; }
  .nin-faq-ans p { margin: 0 0 10px; }
  .nin-faq-ans p:last-child { margin: 0; }

  @media (max-width: 600px) {
    .nin-hero { min-height: auto; padding: 80px 0 48px; }
    .nin-person { flex-direction: column; }
    .nin-tl-item { grid-template-columns: 70px 1fr; }
    .nin-table-row { grid-template-columns: 110px 1fr; }
    .nin-stat-box { flex: 1 1 120px; }
  }
`;

const faqs = [
  {
    q: "Explain the three main events that took place under Gandhi's Satyagraha Movement.",
    a: (<>
      <p>The three main events under Gandhi's Satyagraha movement were:</p>
      <ul>
        <li><strong>Champaran Satyagraha (1917):</strong> Gandhi organised this movement to support oppressed plantation workers in Champaran, Bihar, fighting against the indigo planters' exploitation.</li>
        <li><strong>Kheda Satyagraha (1918):</strong> Gandhi went to Kheda with Sardar Vallabh Bhai Patel to support peasants who were demanding relief from tax payments during a time of crop failure.</li>
        <li><strong>Mill Workers Support (1918):</strong> Gandhi supported the mill workers' cause, championing the rights of industrial labourers against unfair conditions.</li>
      </ul>
    </>),
  },
  {
    q: "When did Gandhiji return from South Africa?",
    a: (<p>Gandhiji returned from South Africa in <strong>1915</strong>. After returning, he quickly became the face of the Indian independence movement, introducing the concept of <strong>Satyagraha</strong> — agitation for truth — as the primary tool of resistance against British colonial rule.</p>),
  },
  {
    q: "What was observed on April 6th, 1919?",
    a: (<p><strong>6th April 1919 was observed as the Satyagraha Day</strong> — a nationwide day of protest where people went on fast and strikes across the nation. This was in direct response to the repressive <strong>Rowlatt Act</strong> passed by the British Government, which allowed detention of political prisoners without trial for up to two years.</p>),
  },
  {
    q: "Write down the effects of the Jallianwala Bagh Massacre.",
    a: (<>
      <p>The Jallianwala Bagh Massacre of 13th April 1919 had devastating effects on the Indian independence movement:</p>
      <ul>
        <li><strong>Government buildings were attacked</strong> by enraged people across the country</li>
        <li>There were widespread <strong>clashes with police officers and nationwide strikes</strong></li>
        <li>The British <strong>suppressed the agitations with extreme brutality and public humiliation</strong></li>
        <li><strong>Villages were bombed and destroyed</strong> by British forces in retaliation</li>
        <li>The massacre became a <strong>turning point that united Indians</strong> against British rule</li>
      </ul>
    </>),
  },
  {
    q: "In which session of the INC was the demand of 'Purna Swaraj' formalized?",
    a: (<p><strong>'Purna Swaraj'</strong> (Complete Independence) was formalized in the <strong>1929 session of the Indian National Congress at Lahore</strong>. This historic session marked a decisive shift from the earlier demand of Dominion Status to a complete break from British rule — a full and unconditional independence for India.</p>),
  },
  {
    q: "What did the Rowlatt Act impose?",
    a: (<>
      <p>The <strong>Rowlatt Act</strong>, passed by the British Government in <strong>1919</strong>, imposed the following:</p>
      <ul>
        <li>The British Government gained the power to <strong>prohibit all political activities</strong> in India</li>
        <li>Political leaders could be <strong>detained without trial for up to two years</strong></li>
        <li>It effectively gave the British authorities <strong>sweeping powers to repress any form of political dissent</strong></li>
        <li>Gandhi called it a <strong>'Black Act'</strong> and launched the nationwide Satyagraha Day protest in response</li>
      </ul>
    </>),
  },
  {
    q: "Who started the Khilafat Movement and why?",
    a: (<>
      <p>The Khilafat Movement was started by <strong>Muhammad Ali and Shaukat Ali</strong>. It was launched in response to the <strong>unjust treatment given to the Caliph of the Ottoman Empire</strong>, who was regarded by Muslims around the world as their Spiritual Leader. Key points:</p>
      <ul>
        <li>The <strong>Khilafat Committee was formed in Bombay</strong></li>
        <li><strong>Mahatma Gandhi supported the movement</strong>, seeing it as an opportunity to unite Hindus and Muslims against British rule</li>
        <li>It was one of the first major attempts at <strong>Hindu-Muslim unity</strong> in the independence movement</li>
      </ul>
    </>),
  },
  {
    q: "Which act prohibited the plantation workers from leaving the tea garden without prior permission?",
    a: (<p>The <strong>Inland Immigration Act passed in 1859</strong> prohibited plantation workers from leaving the tea gardens without prior permission from their superiors. This permission was rarely granted, effectively <strong>trapping workers in conditions of forced labour</strong>. It was one of the most exploitative tools of British colonial economic policy in India.</p>),
  },
  {
    q: "Who wrote the book 'Hind Swaraj'?",
    a: (<p><strong>Mahatma Gandhi</strong> wrote the book <strong>Hind Swaraj</strong>. Written in 1909 during his voyage from England to South Africa, the book outlined Gandhi's vision of Indian self-rule and his critique of modern industrial civilisation. It became a foundational text of the Indian independence movement and articulated the philosophical basis of <strong>Satyagraha</strong>.</p>),
  },
  {
    q: "What is the meaning of 'Beggar'?",
    a: (<p><strong>Beggar</strong> (also spelled <em>Begar</em>) means <strong>forced labour without income</strong>. It was a deeply exploitative colonial practice under which peasants and villagers were compelled to provide free labour to landlords or the British administration — with no payment or compensation whatsoever. It was one of the many forms of economic exploitation that fuelled nationalist sentiment across India.</p>),
  },
];

export default function NationalismInIndia() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="nin-root">

        {/* ── HERO ── */}
        <div className="nin-hero">
          <div className="nin-hero-chakra" />
          <div className="nin-hero-bg-num">02</div>
          <div className="nin-hero-inner">
            <div className="nin-overline">Class 10 · Social Science · History</div>
            <h1 className="nin-hero-title">
              Nationalism<br />in <em>India</em>
            </h1>
            <div className="nin-hero-bar">
              <div className="nin-hero-bar-item">
                <div className="nin-bar-label">Subject</div>
                <div className="nin-bar-value">History</div>
              </div>
              <div className="nin-hero-bar-item">
                <div className="nin-bar-label">Chapter</div>
                <div className="nin-bar-value">Chapter 2</div>
              </div>
              <div className="nin-hero-bar-item">
                <div className="nin-bar-label">Period</div>
                <div className="nin-bar-value">1915 – 1932</div>
              </div>
              <div className="nin-hero-bar-item">
                <div className="nin-bar-label">FAQs</div>
                <div className="nin-bar-value">10 Questions</div>
              </div>
            </div>
          </div>
        </div>

        <div className="nin-body">

          {/* Opening */}
          <div className="nin-lead">
            <p>The story of Indian nationalism is inseparable from one man — <strong>Mahatma Gandhi</strong>. Returning from South Africa in 1915, he transformed the independence struggle into a <strong>mass movement</strong> through Satyagraha, Salt Marches, and moral courage.</p>
            <p>From the fields of <strong>Champaran</strong> to the shores of <strong>Dandi</strong>, from the horror of <strong>Jallianwala Bagh</strong> to the unity forged by the <strong>Khilafat Movement</strong> — this chapter traces how India found its voice and demanded freedom.</p>
          </div>

          {/* Key Stats */}
          <div className="nin-stat-row">
            {[
              { val: "1915", label: "Gandhi Returns to India" },
              { val: "1919", label: "Rowlatt Act Passed" },
              { val: "13 Apr", label: "Jallianwala Bagh" },
              { val: "1929", label: "Purna Swaraj Demanded" },
              { val: "78", label: "Volunteers on Salt March" },
            ].map((s, i) => (
              <div className="nin-stat-box" key={i}>
                <div className="nin-stat-val">{s.val}</div>
                <div className="nin-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* 1. Gandhi & Satyagraha */}
          <div className="nin-sec-head">
            <div className="nin-sec-num">1</div>
            <div className="nin-sec-title-wrap">
              <div className="nin-sec-kicker">The Leader & His Method</div>
              <h2 className="nin-sec-title">Mahatma Gandhi &amp; <span>Satyagraha</span></h2>
            </div>
          </div>

          <p className="nin-body-text">
            Mahatma Gandhi returned to India from South Africa in <strong>1915</strong>. His transformative political philosophy was known as <strong>Satyagraha</strong> — meaning <em>Agitation for Truth</em>. Unlike violent resistance, Satyagraha was rooted in the belief that truth itself is power — that a morally grounded people could force even the mightiest empire to yield. He also wrote the foundational book <strong>Hind Swaraj</strong>, outlining his vision of Indian self-rule.
          </p>

          <div className="nin-pull-quote">
            <p>Satyagraha — Agitation for Truth. The idea that truth is force, and force enough to shake an empire.</p>
            <cite>— Mahatma Gandhi's core philosophy</cite>
          </div>

          {/* Satyagraha Timeline */}
          <div className="nin-timeline">
            {[
              {
                year: "1917",
                head: "Champaran Satyagraha",
                desc: <>Gandhi organised the <strong>Champaran Satyagraha</strong> to support the oppressed indigo plantation workers in Bihar, who were being exploited by British planters. It was his first major campaign in India.</>,
              },
              {
                year: "1918",
                head: "Kheda Satyagraha",
                desc: <>Gandhi went to <strong>Kheda</strong> with <strong>Sardar Vallabh Bhai Patel</strong> to stand with peasants demanding tax relief following severe crop failure and famine conditions.</>,
              },
              {
                year: "1918",
                head: "Mill Workers Support",
                desc: <>Gandhi also extended his support to the <strong>Ahmedabad mill workers</strong>, championing the rights of industrial labourers against exploitative working conditions in the textile mills.</>,
              },
              {
                year: "APR\n1919",
                head: "Satyagraha Day",
                desc: <><strong>6th April 1919</strong> was observed as Satyagraha Day — a nationwide day of fasting and strikes in direct response to the repressive <strong>Rowlatt Act</strong> passed by the British Government.</>,
              },
              {
                year: "1930",
                head: "The Salt March — Dandi",
                desc: <>Gandhi demanded from <strong>Lord Irwin, the Viceroy of India</strong>, the abolishment of the Salt Tax. He then began the historic <strong>Salt March with 78 volunteers</strong> from Sabarmati Ashram to Dandi to manufacture salt — a powerful act of civil disobedience that shook the Empire.</>,
              },
            ].map((t, i) => (
              <div className="nin-tl-item" key={i}>
                <div className="nin-tl-year-col">
                  <div className="nin-tl-year" style={{ whiteSpace: "pre-line" }}>{t.year}</div>
                </div>
                <div className="nin-tl-content">
                  <div className="nin-tl-head">{t.head}</div>
                  <div className="nin-tl-desc">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="nin-divider"><div className="nin-divider-mark" /></div>

          {/* 2. Rowlatt Act & Jallianwala */}
          <div className="nin-sec-head">
            <div className="nin-sec-num">2</div>
            <div className="nin-sec-title-wrap">
              <div className="nin-sec-kicker">The Turning Point — 1919</div>
              <h2 className="nin-sec-title">Rowlatt Act &amp; <span>Jallianwala Bagh</span></h2>
            </div>
          </div>

          <div className="nin-event-grid">
            <div className="nin-event-card dark">
              <div className="nin-event-card-tag">Repressive Law · 1919</div>
              <div className="nin-event-card-title">The Rowlatt Act</div>
              <ul>
                <li>Passed by the <strong>British Government in 1919</strong></li>
                <li>Power to <strong>repress any political activities</strong></li>
                <li>Allowed detention of political prisoners <strong>without trial for 2 years</strong></li>
                <li>Nationwide outrage — Gandhi declared it a <strong>'Black Act'</strong></li>
                <li>Triggered the historic <strong>Satyagraha Day on April 6th</strong></li>
              </ul>
            </div>
            <div className="nin-event-card">
              <div className="nin-event-card-tag">Massacre · 13 Apr 1919</div>
              <div className="nin-event-card-title">Jallianwala Bagh</div>
              <ul>
                <li>Villagers attended the <strong>Baisakhi fair</strong> at the enclosed Jallianwala Bagh</li>
                <li><strong>General Dyer</strong> blocked the only entry and exit of the park</li>
                <li>Ordered <strong>open fire</strong> on unarmed civilians — thousands killed</li>
                <li>Brutal consequences: attacks on government buildings, <strong>nationwide strikes and clashes</strong></li>
                <li>Villages were <strong>bombed and destroyed</strong> in British retaliation</li>
              </ul>
            </div>
          </div>

          <div className="nin-divider"><div className="nin-divider-mark" /></div>

          {/* 3. Khilafat Movement */}
          <div className="nin-sec-head">
            <div className="nin-sec-num">3</div>
            <div className="nin-sec-title-wrap">
              <div className="nin-sec-kicker">Hindu-Muslim Unity</div>
              <h2 className="nin-sec-title">The <span>Khilafat</span> Movement</h2>
            </div>
          </div>

          <p className="nin-body-text">The Khilafat Movement was a landmark moment in the Indian independence struggle — the first major effort to forge <strong>Hindu-Muslim unity</strong> against British colonialism.</p>

          <div className="nin-table-wrap">
            <div className="nin-table-title">☪️ Khilafat Movement — Key Facts</div>
            {[
              ["Founded by", "Muhammad Ali and Shaukat Ali"],
              ["Reason", "Unjust treatment of the Caliph of the Ottoman Empire — the spiritual leader of Muslims worldwide"],
              ["Location", "Khilafat Committee formed in Bombay"],
              ["Gandhi's Role", "Mahatma Gandhi supported the movement, uniting Hindu and Muslim opposition to British rule"],
              ["Significance", "One of the first major examples of communal unity in the Indian independence movement"],
            ].map(([k, v]) => (
              <div className="nin-table-row" key={k}>
                <div className="nin-table-key">{k}</div>
                <div className="nin-table-val">{v}</div>
              </div>
            ))}
          </div>

          <div className="nin-divider"><div className="nin-divider-mark" /></div>

          {/* 4. Key People */}
          <div className="nin-sec-head">
            <div className="nin-sec-num">4</div>
            <div className="nin-sec-title-wrap">
              <div className="nin-sec-kicker">The Figures Who Shaped the Movement</div>
              <h2 className="nin-sec-title">Key <span>Leaders</span></h2>
            </div>
          </div>

          <div className="nin-person">
            <div className="nin-person-monogram">G</div>
            <div>
              <div className="nin-person-name">Mahatma Gandhi</div>
              <div className="nin-person-role">Father of the Nation · The Soul of Satyagraha</div>
              <ul>
                <li>Returned to India from <strong>South Africa in 1915</strong></li>
                <li>Author of <strong>Hind Swaraj</strong> — the blueprint for Indian self-rule</li>
                <li>Led <strong>Champaran (1917), Kheda (1918)</strong> and Mill Workers campaigns</li>
                <li>Demanded abolition of Salt Tax from <strong>Lord Irwin (Viceroy)</strong></li>
                <li>Began the <strong>Salt March with 78 volunteers</strong> from Sabarmati to Dandi</li>
              </ul>
            </div>
          </div>

          <div className="nin-person">
            <div className="nin-person-monogram">P</div>
            <div>
              <div className="nin-person-name">Sardar Vallabh Bhai Patel</div>
              <div className="nin-person-role">Iron Man of India · Kheda Satyagraha</div>
              <ul>
                <li>Accompanied Gandhi to <strong>Kheda in 1918</strong> to support oppressed peasants</li>
                <li>Later became the first <strong>Deputy Prime Minister</strong> of independent India</li>
                <li>Known for his resolute leadership and <strong>organisational strength</strong></li>
              </ul>
            </div>
          </div>

          <div className="nin-person" style={{ marginBottom: "48px" }}>
            <div className="nin-person-monogram">A</div>
            <div>
              <div className="nin-person-name">Dr. B.R. Ambedkar</div>
              <div className="nin-person-role">Champion of the Depressed Classes</div>
              <ul>
                <li>Formed the <strong>Depressed Classes Association</strong></li>
                <li>Signed the historic <strong>Poona Pact with the Congress in 1932</strong></li>
                <li>Fought for <strong>separate electorates and reservation of seats</strong> for Dalits</li>
                <li>Later became the <strong>chief architect of the Indian Constitution</strong></li>
              </ul>
            </div>
          </div>

          <div className="nin-divider"><div className="nin-divider-mark" /></div>

          {/* 5. Poona Pact & Plantation Workers */}
          <div className="nin-sec-head">
            <div className="nin-sec-num">5</div>
            <div className="nin-sec-title-wrap">
              <div className="nin-sec-kicker">Social Justice & Labour Rights</div>
              <h2 className="nin-sec-title">Poona Pact &amp; <span>Plantation Workers</span></h2>
            </div>
          </div>

          <div className="nin-event-grid">
            <div className="nin-event-card">
              <div className="nin-event-card-tag">Social Reform · 1932</div>
              <div className="nin-event-card-title">The Poona Pact</div>
              <ul>
                <li><strong>Dalits refused</strong> to participate in the movement without <strong>separate electorates</strong> and reservation of seats</li>
                <li>Dr. Ambedkar formed the <strong>Depressed Classes Association</strong></li>
                <li>Signed the <strong>Poona Pact with Congress in 1932</strong></li>
                <li>Secured <strong>reserved seats</strong> for Depressed Classes in provincial and central legislatures</li>
              </ul>
            </div>
            <div className="nin-event-card dark">
              <div className="nin-event-card-tag">Colonial Exploitation · 1859</div>
              <div className="nin-event-card-title">Inland Immigration Act</div>
              <ul>
                <li>Passed in <strong>1859</strong> — one of the most exploitative colonial laws</li>
                <li>Plantation workers <strong>could not leave tea gardens</strong> without prior permission</li>
                <li>Permission was <strong>seldom granted</strong>, trapping workers in forced labour</li>
                <li><strong>Beggar</strong> — forced labour without income — was widely practised</li>
              </ul>
            </div>
          </div>

          <div className="nin-pull-quote">
            <p>Purna Swaraj — Complete Independence. In 1929, at Lahore, the Indian National Congress declared nothing less would do.</p>
            <cite>— INC Session, Lahore, 1929</cite>
          </div>

          <div className="nin-divider"><div className="nin-divider-mark" /></div>

          {/* FAQ */}
          <div className="nin-faq-header">
            <span className="nin-faq-kicker">Exam Preparation</span>
          </div>
          <h2 className="nin-faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, i) => (
            <div className={`nin-faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="nin-faq-q" onClick={() => toggle(i)}>
                <span className="nin-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="nin-faq-icon">+</span>
              </button>
              <div className={`nin-faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
