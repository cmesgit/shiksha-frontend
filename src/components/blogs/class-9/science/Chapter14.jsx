import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --nr-ink: #07170f;
    --nr-ink2: #1b3325;
    --nr-muted: #526b5b;
    --nr-paper: #f3fbf1;
    --nr-card: #ffffff;
    --nr-green: #2d7a2d;
    --nr-green2: #1e5c1e;
    --nr-greenLt: #dcfce7;
    --nr-sky: #0369a1;
    --nr-sky2: #075985;
    --nr-skyLt: #e0f2fe;
    --nr-water: #0891b2;
    --nr-waterLt: #cffafe;
    --nr-earth: #92400e;
    --nr-earthLt: #fef3c7;
    --nr-rose: #be123c;
    --nr-roseLt: #ffe4e6;
    --nr-violet: #6d28d9;
    --nr-violetLt: #ede9fe;
    --nr-rule: #86efac;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  .nr-root { font-family: 'Inter', sans-serif; background: var(--nr-paper); color: var(--nr-ink); min-height: 100vh; }

  .nr-hero {
    min-height: 88vh;
    display: flex;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
    padding: 0 0 64px;
    background:
      radial-gradient(circle at 74% 22%, rgba(14,165,233,0.14) 0%, transparent 30%),
      radial-gradient(circle at 18% 24%, rgba(34,197,94,0.17) 0%, transparent 34%),
      linear-gradient(135deg, #031407 0%, #062512 50%, #082f1b 100%);
  }
  .nr-hero::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px; background: linear-gradient(90deg, #2d7a2d 0%, #0891b2 34%, #92400e 68%, #6d28d9 100%); }
  .nr-hero-grid { position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(134,239,172,0.13) 1px, transparent 1px); background-size: 30px 30px; pointer-events: none; }
  .nr-glow-a { position: absolute; top: 14%; left: 5%; width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(34,197,94,0.20) 0%, transparent 70%); pointer-events: none; }
  .nr-glow-b { position: absolute; bottom: 8%; right: 18%; width: 230px; height: 230px; border-radius: 50%; background: radial-gradient(circle, rgba(8,145,178,0.14) 0%, transparent 72%); pointer-events: none; }
  .nr-earth-mark { position: absolute; top: 50%; right: 4%; width: clamp(170px, 27vw, 350px); height: clamp(170px, 27vw, 350px); transform: translateY(-50%); pointer-events: none; opacity: 0.38; }
  .nr-earth-mark::before { content: ''; position: absolute; inset: 7%; border-radius: 50%; border: 1.5px solid rgba(134,239,172,0.18); background: radial-gradient(circle at 36% 30%, rgba(255,255,255,0.12), rgba(14,165,233,0.13) 28%, rgba(34,197,94,0.09) 70%); }
  .nr-earth-mark::after { content: ''; position: absolute; inset: 20%; border-radius: 50%; border: 1px dashed rgba(125,211,252,0.20); }
  .nr-continent { position: absolute; background: rgba(134,239,172,0.18); border-radius: 58% 42% 54% 46% / 45% 58% 42% 55%; }
  .nr-continent.one { width: 88px; height: 56px; left: 34%; top: 34%; transform: rotate(-18deg); }
  .nr-continent.two { width: 56px; height: 84px; right: 28%; bottom: 25%; transform: rotate(22deg); }
  .nr-hero-bg-num { position: absolute; bottom: -86px; right: -26px; font-family: 'Montserrat', sans-serif; font-size: clamp(190px, 34vw, 470px); font-weight: 900; line-height: 1; color: rgba(255,255,255,0.018); letter-spacing: -0.06em; user-select: none; pointer-events: none; }
  .nr-hero-inner { max-width: 900px; width: 100%; margin: 0 auto; padding: 0 32px; position: relative; z-index: 1; }
  .nr-overline { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #86efac; margin-bottom: 24px; display: flex; align-items: center; gap: 14px; }
  .nr-overline::before, .nr-overline::after { content: ''; flex: 0 0 40px; height: 1px; background: #86efac; }
  .nr-hero-title { font-family: 'Montserrat', sans-serif; font-size: clamp(34px, 7.5vw, 78px); font-weight: 900; color: #fff; line-height: 0.94; letter-spacing: -0.035em; margin-bottom: 32px; }
  .nr-hero-title em { font-style: normal; color: #86efac; }
  .nr-hero-title .em2 { color: #7dd3fc; }
  .nr-hero-bar { display: flex; flex-wrap: wrap; gap: 0; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; margin-top: 8px; }
  .nr-hero-bar-item { flex: 1 1 150px; padding: 0 24px 0 0; border-right: 1px solid rgba(255,255,255,0.08); margin-right: 24px; }
  .nr-hero-bar-item:last-child { border-right: none; margin-right: 0; }
  .nr-bar-label { font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.30); margin-bottom: 5px; }
  .nr-bar-value { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.74); }

  .nr-body { max-width: 940px; margin: 0 auto; padding: 72px 32px 100px; }
  .nr-intro { background: linear-gradient(135deg, #031407 0%, #082f1b 100%); border-left: 5px solid var(--nr-green); border-radius: 6px; padding: 36px 40px; margin-bottom: 72px; position: relative; overflow: hidden; }
  .nr-intro::after { content: '🌍'; position: absolute; right: 30px; top: 50%; transform: translateY(-50%); font-size: 96px; opacity: 0.08; }
  .nr-intro p { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 500; color: rgba(255,255,255,0.86); line-height: 1.8; margin: 0 0 14px; position: relative; z-index: 1; }
  .nr-intro p:last-child { margin-bottom: 0; }
  .nr-intro strong { color: #86efac; }

  .nr-divider { margin: 56px 0; display: flex; align-items: center; gap: 16px; }
  .nr-divider::before, .nr-divider::after { content: ''; flex: 1; height: 1px; background: var(--nr-rule); }
  .nr-divider-mark { width: 8px; height: 8px; border-radius: 50%; background: var(--nr-green); flex-shrink: 0; }
  .nr-sec { margin-bottom: 58px; }
  .nr-sec-head { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 30px; border-bottom: 2px solid var(--nr-rule); padding-bottom: 18px; }
  .nr-sec-num { font-family: 'Montserrat', sans-serif; font-size: 56px; font-weight: 900; color: var(--nr-rule); line-height: 1; flex-shrink: 0; }
  .nr-sec-title-wrap { padding-top: 8px; }
  .nr-sec-kicker { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--nr-green); margin-bottom: 6px; }
  .nr-sec-title { font-family: 'Montserrat', sans-serif; font-size: clamp(22px, 4vw, 32px); font-weight: 900; color: var(--nr-ink); line-height: 1.15; letter-spacing: -0.02em; }
  .nr-sec-title span { color: var(--nr-green); }
  .nr-body-text { font-size: 16px; color: var(--nr-ink2); line-height: 1.85; margin: 22px 0 0; }
  .nr-body-text strong { color: var(--nr-green2); font-weight: 700; }

  .nr-card { background: var(--nr-card); border: 1.5px solid var(--nr-rule); border-radius: 14px; overflow: hidden; box-shadow: 0 16px 34px rgba(30,92,30,0.06); }
  .nr-card-head { padding: 26px; background: linear-gradient(135deg, #dcfce7 0%, #e0f2fe 100%); border-bottom: 1.5px solid var(--nr-rule); }
  .nr-card-head h3 { font-family: 'Montserrat', sans-serif; font-size: 27px; font-weight: 900; color: var(--nr-green2); margin-bottom: 10px; }
  .nr-card-head p { color: var(--nr-ink2); line-height: 1.8; }

  .nr-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; align-items: stretch; }
  .nr-inside-grid { display: grid; grid-template-columns: 1fr 1fr; }
  .nr-inside-cell { padding: 24px; border-top: 1.5px solid var(--nr-rule); }
  .nr-inside-cell + .nr-inside-cell { border-left: 1.5px solid var(--nr-rule); }
  .nr-inside-cell h4 { font-family: 'Montserrat', sans-serif; font-size: 23px; font-weight: 900; color: var(--nr-green2); margin-bottom: 10px; }
  .nr-inside-cell p { color: var(--nr-ink2); line-height: 1.75; }

  .nr-point-list { padding: 24px 26px; display: grid; gap: 14px; }
  .nr-point { display: grid; grid-template-columns: 34px 1fr; gap: 12px; align-items: flex-start; color: var(--nr-ink2); line-height: 1.7; }
  .nr-point-num { width: 34px; height: 34px; border-radius: 50%; background: var(--nr-greenLt); color: var(--nr-green2); display: flex; align-items: center; justify-content: center; font-weight: 900; }

  .nr-diagram-card { background: var(--nr-card); border: 1.5px solid var(--nr-rule); border-radius: 14px; padding: 18px; overflow: hidden; }
  .nr-svg { display: block; width: 100%; height: auto; max-width: 100%; }
  .nr-svg text { font-family: 'Poppins', sans-serif; }

  /* Corrected clean diagram system */
  .nr-concept-diagram {
    background: #ffffff;
    border: 1.5px solid var(--nr-rule);
    border-radius: 16px;
    padding: 18px;
    overflow: hidden;
  }
  .nr-diagram-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-weight: 900;
    color: var(--nr-green2);
    margin-bottom: 12px;
  }
  .nr-clean-svg {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 14px;
  }
  .nr-clean-svg text {
    font-family: 'Poppins', sans-serif;
  }
  .nr-diagram-caption {
    margin-top: 12px;
    color: var(--nr-ink2);
    font-size: 14px;
    line-height: 1.65;
  }
  .nr-diagram-caption strong { color: var(--nr-green2); }

  .nr-atmo-layout { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 18px; }

  .nr-wind-panel, .nr-solution-panel, .nr-def-panel { background: var(--nr-card); border: 1.5px solid var(--nr-rule); border-radius: 14px; overflow: hidden; }
  .nr-wind-top, .nr-solution-top, .nr-def-top { padding: 28px; background: linear-gradient(135deg, #e0f2fe 0%, #fff 100%); border-bottom: 1.5px solid var(--nr-rule); }
  .nr-wind-top h3, .nr-solution-top h3, .nr-def-top h3 { font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900; color: var(--nr-sky2); margin-bottom: 10px; }
  .nr-wind-top p, .nr-solution-top p, .nr-def-top p { color: var(--nr-ink2); line-height: 1.8; }
  .nr-breeze-grid { display: grid; grid-template-columns: 1fr 1fr; }
  .nr-breeze-card { padding: 22px; border-top: 1.5px solid var(--nr-rule); }
  .nr-breeze-card + .nr-breeze-card { border-left: 1.5px solid var(--nr-rule); }
  .nr-breeze-card h4 { font-family: 'Montserrat', sans-serif; font-size: 23px; font-weight: 900; color: var(--nr-green2); margin: 14px 0 8px; }
  .nr-breeze-card p { color: var(--nr-ink2); line-height: 1.75; }
  .nr-factor-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 0 22px 22px; }
  .nr-pill { background: var(--nr-paper); border: 1px solid var(--nr-rule); border-radius: 10px; padding: 13px 14px; font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--nr-green2); font-size: 13px; line-height: 1.45; }

  .nr-water-card { background: var(--nr-card); border: 1.5px solid var(--nr-rule); border-radius: 14px; padding: 26px; }
  .nr-water-card h3 { font-family: 'Montserrat', sans-serif; font-size: 26px; font-weight: 900; color: var(--nr-water); margin-bottom: 14px; }
  .nr-source-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .nr-source-chip { background: var(--nr-waterLt); border: 1px solid #67e8f9; border-radius: 999px; padding: 10px 12px; color: var(--nr-sky2); font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 13px; text-align: center; }
  .nr-water-uses { display: grid; gap: 10px; margin-top: 16px; }
  .nr-water-use { display: grid; grid-template-columns: 26px 1fr; gap: 10px; color: var(--nr-ink2); line-height: 1.65; }
  .nr-drop { width: 26px; height: 26px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); background: var(--nr-waterLt); border: 1px solid #67e8f9; }
  .nr-cycle-card { background: linear-gradient(135deg, #020617 0%, #083344 100%); color: white; border-radius: 14px; padding: 26px; overflow: hidden; }
  .nr-cycle-title { font-family: 'Montserrat', sans-serif; font-size: 27px; font-weight: 900; color: #67e8f9; margin-bottom: 10px; }
  .nr-cycle-card p { color: rgba(255,255,255,0.82); line-height: 1.8; margin-bottom: 18px; }

  .nr-property-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 0 24px 24px; }
  .nr-property { background: var(--nr-paper); border: 1px solid var(--nr-rule); border-radius: 10px; padding: 14px; color: var(--nr-ink2); line-height: 1.6; font-size: 14px; }
  .nr-property strong { display: block; color: var(--nr-green2); margin-bottom: 4px; font-family: 'Poppins', sans-serif; }

  .nr-soil-card { background: var(--nr-card); border: 1.5px solid var(--nr-rule); border-radius: 14px; overflow: hidden; }
  .nr-soil-head { padding: 26px; background: linear-gradient(135deg, #fef3c7 0%, #fff 100%); border-bottom: 1.5px solid var(--nr-rule); }
  .nr-soil-head h3 { font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900; color: var(--nr-earth); margin-bottom: 10px; }
  .nr-soil-head p { color: var(--nr-ink2); line-height: 1.8; }
  .nr-soil-components { padding: 22px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .nr-soil-chip { background: var(--nr-earthLt); border: 1px solid #facc15; border-radius: 10px; padding: 13px; font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--nr-earth); font-size: 13px; }

  .nr-erosion-grid, .nr-pollution-grid, .nr-ozone-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .nr-plain-card { background: var(--nr-card); border: 1.5px solid var(--nr-rule); border-radius: 14px; padding: 26px; }
  .nr-plain-card h3 { font-family: 'Montserrat', sans-serif; font-size: 26px; font-weight: 900; margin-bottom: 12px; color: var(--nr-green2); }
  .nr-plain-card p, .nr-plain-card li { color: var(--nr-ink2); line-height: 1.8; }
  .nr-plain-card ul { padding-left: 20px; }
  .nr-danger h3 { color: var(--nr-rose); }
  .nr-earth-title h3 { color: var(--nr-earth); }
  .nr-water-title h3 { color: var(--nr-water); }
  .nr-violet-title h3 { color: var(--nr-violet); }
  .nr-prevent-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 18px; }
  .nr-source-list { display: grid; gap: 10px; margin-top: 14px; }
  .nr-source-item { display: grid; grid-template-columns: 24px 1fr; gap: 10px; color: var(--nr-ink2); line-height: 1.65; }
  .nr-bad-dot { width: 24px; height: 24px; border-radius: 50%; background: var(--nr-roseLt); color: var(--nr-rose); display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 12px; }
  .nr-water-title .nr-bad-dot { background: var(--nr-waterLt); color: var(--nr-water); }

  .nr-greenhouse-card { background: linear-gradient(135deg, #031407 0%, #1e3a12 100%); color: white; border-radius: 14px; padding: 30px; overflow: hidden; }
  .nr-greenhouse-grid { display: grid; grid-template-columns: 0.95fr 1.05fr; gap: 28px; align-items: center; }
  .nr-greenhouse-title { font-family: 'Montserrat', sans-serif; font-size: 31px; font-weight: 900; color: #86efac; margin-bottom: 12px; }
  .nr-greenhouse-text { color: rgba(255,255,255,0.84); line-height: 1.85; margin-bottom: 16px; }
  .nr-gas-list { display: flex; flex-wrap: wrap; gap: 8px; }
  .nr-gas-chip { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 999px; padding: 8px 10px; color: rgba(255,255,255,0.88); font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700; }

  .nr-cycle-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
  .nr-bio-cycle { background: var(--nr-card); border: 1.5px solid var(--nr-rule); border-radius: 14px; padding: 20px; min-height: 270px; position: relative; overflow: hidden; }
  .nr-bio-cycle::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 5px; background: linear-gradient(90deg, var(--nr-green), var(--nr-water)); }
  .nr-bio-cycle h3 { font-family: 'Montserrat', sans-serif; font-size: 22px; font-weight: 900; color: var(--nr-green2); margin-bottom: 12px; }
  .nr-bio-cycle p { color: var(--nr-ink2); line-height: 1.7; font-size: 14px; margin-top: 12px; }

  .nr-faq-wrap { margin-top: 74px; }
  .nr-faq-title { font-family: 'Montserrat', sans-serif; font-size: clamp(28px,5vw,42px); font-weight: 900; color: var(--nr-ink); letter-spacing: -0.03em; margin-bottom: 22px; }
  .nr-faq-title span { color: var(--nr-green); }
  .nr-faq-list { display: grid; gap: 12px; }
  .nr-faq-item { background: var(--nr-card); border: 1.5px solid var(--nr-rule); border-radius: 10px; overflow: hidden; }
  .nr-faq-q { width: 100%; border: 0; background: transparent; padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; text-align: left; cursor: pointer; font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 700; color: var(--nr-ink); }
  .nr-faq-icon { color: var(--nr-green); font-size: 18px; line-height: 1; flex-shrink: 0; }
  .nr-faq-a { padding: 0 20px 20px; color: var(--nr-ink2); line-height: 1.8; font-size: 15px; }

  @media (max-width: 820px) {
    .nr-hero { min-height: auto; align-items: flex-start; padding: 72px 0 48px; }
    .nr-hero-inner { padding: 0 18px; }
    .nr-overline { font-size: 10px; letter-spacing: 0.16em; }
    .nr-overline::before, .nr-overline::after { flex-basis: 28px; }
    .nr-hero-title { font-size: clamp(38px, 11vw, 58px); margin-bottom: 24px; }
    .nr-hero-bar { gap: 12px; }
    .nr-hero-bar-item { flex: 1 1 120px; padding: 0 14px 0 0; margin-right: 14px; }
    .nr-bar-label { font-size: 9px; letter-spacing: 0.12em; }
    .nr-bar-value { font-size: 13px; }
    .nr-earth-mark { opacity: 0.22; right: -26%; }
    .nr-body { padding: 48px 18px 72px; }
    .nr-intro { padding: 24px 20px; }
    .nr-intro p { font-size: 15px; }
    .nr-atmo-layout, .nr-grid-2, .nr-greenhouse-grid { grid-template-columns: 1fr; }
    .nr-breeze-grid, .nr-inside-grid { grid-template-columns: 1fr; }
    .nr-breeze-card + .nr-breeze-card, .nr-inside-cell + .nr-inside-cell { border-left: none; }
    .nr-factor-grid, .nr-property-grid, .nr-prevent-grid { grid-template-columns: 1fr; }
    .nr-erosion-grid, .nr-pollution-grid, .nr-ozone-panel, .nr-cycle-grid { grid-template-columns: 1fr; }
    .nr-source-grid, .nr-soil-components { grid-template-columns: 1fr; }
    .nr-sec-head { gap: 14px; margin-bottom: 24px; }
    .nr-sec-num { font-size: 42px; }
    .nr-sec-title-wrap { padding-top: 4px; }
  }

  @media (max-width: 520px) {
    .nr-card-head, .nr-point-list, .nr-wind-top, .nr-breeze-card, .nr-water-card, .nr-cycle-card, .nr-solution-top, .nr-inside-cell, .nr-property-grid, .nr-soil-head, .nr-soil-components, .nr-plain-card, .nr-greenhouse-card { padding: 20px; }
    .nr-diagram-card { padding: 12px; }
    .nr-faq-q { font-size: 15px; padding: 16px; }
    .nr-faq-a { padding: 0 16px 18px; }
  }
`;

const faqData = [
  { q: "What is atmosphere?", a: "Atmosphere is the multi-layered gaseous envelope surrounding the Earth. It acts like a blanket and helps keep the average temperature of the Earth steady." },
  { q: "Name the layers of the atmosphere.", a: "The layers of atmosphere are troposphere, stratosphere, mesosphere, thermosphere or ionosphere, and exosphere." },
  { q: "What causes wind?", a: "Wind is caused by uneven distribution of heat over the Earth's surface. It forms as a result of differential heating of the atmosphere." },
  { q: "What is sea breeze?", a: "During the day, wind blows from sea to land. This is called sea breeze." },
  { q: "What is land breeze?", a: "During the night, wind blows from land to sea. This is called land breeze." },
  { q: "What is the water cycle?", a: "The cyclic process through which water circulates in the environment is called the water cycle." },
  { q: "What are common sources of water?", a: "Common sources of water are ponds, lakes, rivers, wells and reservoirs." },
  { q: "What is a solution?", a: "A solution is a homogeneous mixture of solute and solvent. The solvent is present in larger amount and the solute is dissolved in it." },
  { q: "What is water pollution?", a: "Water pollution is the addition of harmful substances to water, causing changes in its physical, chemical and biological properties." },
  { q: "What is soil?", a: "Soil is the layer of Earth formed by degradation of bedrock due to physical, chemical and biological processes." },
  { q: "What are the components of soil?", a: "The components of soil include small particles of rock, humus, microscopic life and nutrients." },
  { q: "What is soil erosion?", a: "Soil erosion is the removal of the top layer of soil. It can be prevented by afforestation, terrace farming, proper irrigation and construction of embankments." },
  { q: "What is air pollution?", a: "Air pollution is a change in air quality due to addition of harmful substances by humans or environmental processes." },
  { q: "What is greenhouse effect?", a: "Greenhouse effect is the trapping of heat by gases such as carbon dioxide in the atmosphere. It contributes to rising temperature and global warming." },
  { q: "Name some greenhouse gases.", a: "Examples of greenhouse gases include carbon dioxide, methane, nitrous oxide and water vapour." },
  { q: "What is global warming?", a: "Global warming is the rise in Earth's average temperature caused by build-up of carbon dioxide and other greenhouse gases. It can melt glaciers and increase sea level." },
  { q: "What is ozone layer?", a: "Ozone layer contains ozone, a form of oxygen, and protects Earth by preventing harmful ultraviolet radiation from reaching the surface." },
  { q: "What causes ozone depletion?", a: "Pollutants such as chlorine and fluorine gases are responsible for depletion of the ozone layer." }
];

export default function Chapter14NaturalResources() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="nr-root">
      <FontLink />
      <style>{styles}</style>

      <section className="nr-hero">
        <div className="nr-hero-grid" />
        <div className="nr-glow-a" />
        <div className="nr-glow-b" />
        <div className="nr-earth-mark"><div className="nr-continent one" /><div className="nr-continent two" /></div>
        <div className="nr-hero-bg-num">14</div>
        <div className="nr-hero-inner">
          <div className="nr-overline">Class 9 · Science · Chapter 14</div>
          <h1 className="nr-hero-title"><em>Natural</em><br /><span className="em2">Resources</span></h1>
          <div className="nr-hero-bar">
            <div className="nr-hero-bar-item"><div className="nr-bar-label">Subject</div><div className="nr-bar-value">Science — Environment</div></div>
            <div className="nr-hero-bar-item"><div className="nr-bar-label">Core Idea</div><div className="nr-bar-value">Air, Water, Soil</div></div>
            <div className="nr-hero-bar-item"><div className="nr-bar-label">Includes</div><div className="nr-bar-value">Pollution, Ozone, Cycles</div></div>
            <div className="nr-hero-bar-item"><div className="nr-bar-label">Format</div><div className="nr-bar-value">Notes + FAQ</div></div>
          </div>
        </div>
      </section>

      <main className="nr-body">
        <div className="nr-intro">
          <p><strong>Natural Resources</strong> explains the life-supporting systems of Earth — atmosphere, water, soil and biogeochemical cycles.</p>
          <p>This chapter also connects resources with real environmental concerns such as <strong>air pollution, water pollution, soil erosion, greenhouse effect, global warming</strong> and <strong>ozone depletion</strong>.</p>
        </div>

        <section className="nr-sec">
          <div className="nr-sec-head"><div className="nr-sec-num">01</div><div className="nr-sec-title-wrap"><div className="nr-sec-kicker">Air Around Earth</div><h2 className="nr-sec-title">Atmosphere and its <span>Layers</span></h2></div></div>
          <div className="nr-atmo-layout">
            <div className="nr-card">
              <div className="nr-card-head"><h3>Atmosphere</h3><p>Atmosphere is the multi-layered gaseous envelope surrounding the Earth.</p></div>
              <div className="nr-point-list">
                <div className="nr-point"><div className="nr-point-num">1</div><div>It acts like a blanket, covering the Earth.</div></div>
                <div className="nr-point"><div className="nr-point-num">2</div><div>It absorbs heat from sunlight and helps keep the average temperature of Earth steady.</div></div>
              </div>
            </div>
            <div className="nr-concept-diagram">
              <div className="nr-diagram-title">Layers of Atmosphere</div>
              <svg className="nr-clean-svg" viewBox="0 0 560 420" role="img" aria-label="Correct layers of atmosphere diagram">
                <defs>
                  <linearGradient id="nrAtmoSky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#06172f" />
                    <stop offset="0.28" stopColor="#0f3f68" />
                    <stop offset="0.58" stopColor="#7dd3fc" />
                    <stop offset="1" stopColor="#dcfce7" />
                  </linearGradient>
                </defs>
                <rect width="560" height="420" rx="18" fill="url(#nrAtmoSky)" />
                <rect x="30" y="32" width="500" height="58" rx="14" fill="rgba(255,255,255,0.88)" />
                <rect x="30" y="102" width="500" height="58" rx="14" fill="rgba(255,255,255,0.84)" />
                <rect x="30" y="172" width="500" height="58" rx="14" fill="rgba(255,255,255,0.84)" />
                <rect x="30" y="242" width="500" height="58" rx="14" fill="rgba(255,255,255,0.88)" />
                <rect x="30" y="312" width="500" height="58" rx="14" fill="rgba(255,255,255,0.94)" />
                <text x="54" y="68" fill="#1e5c1e" fontWeight="900" fontSize="20">Exosphere</text>
                <text x="504" y="68" textAnchor="end" fill="#526b5b" fontWeight="800" fontSize="13">outermost layer</text>
                <text x="54" y="138" fill="#1e5c1e" fontWeight="900" fontSize="20">Thermosphere / Ionosphere</text>
                <text x="504" y="138" textAnchor="end" fill="#526b5b" fontWeight="800" fontSize="13">upper atmosphere</text>
                <text x="54" y="208" fill="#1e5c1e" fontWeight="900" fontSize="20">Mesosphere</text>
                <text x="504" y="208" textAnchor="end" fill="#526b5b" fontWeight="800" fontSize="13">middle layer</text>
                <text x="54" y="278" fill="#1e5c1e" fontWeight="900" fontSize="20">Stratosphere</text>
                <text x="504" y="278" textAnchor="end" fill="#526b5b" fontWeight="800" fontSize="13">contains ozone region</text>
                <text x="54" y="348" fill="#1e5c1e" fontWeight="900" fontSize="20">Troposphere</text>
                <text x="504" y="348" textAnchor="end" fill="#526b5b" fontWeight="800" fontSize="13">nearest to Earth</text>
                <path d="M40 392 C160 350 400 350 520 392" fill="#2d7a2d" opacity="0.85" />
                <text x="280" y="403" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="14">EARTH SURFACE</text>
              </svg>
              <p className="nr-diagram-caption"><strong>Correct order from Earth:</strong> Troposphere → Stratosphere → Mesosphere → Thermosphere/Ionosphere → Exosphere.</p>
            </div>
          </div>
        </section>

        <div className="nr-divider"><div className="nr-divider-mark" /></div>

        <section className="nr-sec">
          <div className="nr-sec-head"><div className="nr-sec-num">02</div><div className="nr-sec-title-wrap"><div className="nr-sec-kicker">Moving Air</div><h2 className="nr-sec-title">Wind, Sea Breeze and <span>Land Breeze</span></h2></div></div>
          <div className="nr-wind-panel">
            <div className="nr-wind-top"><h3>Wind forms due to uneven heating.</h3><p>Wind is caused by uneven distribution of heat over the Earth’s surface. It is formed as a result of differential heating of the atmosphere.</p></div>
            <div className="nr-breeze-grid">
              <div className="nr-breeze-card">
                <svg className="nr-clean-svg" viewBox="0 0 560 300" aria-label="Correct sea breeze diagram">
                  <rect width="560" height="300" rx="18" fill="#e0f2fe" />
                  <rect x="0" y="184" width="280" height="116" fill="#0891b2" />
                  <rect x="280" y="184" width="280" height="116" fill="#8b5e34" />
                  <circle cx="72" cy="62" r="30" fill="#f59e0b" />
                  <text x="88" y="250" fill="#ffffff" fontWeight="900" fontSize="20">SEA</text>
                  <text x="394" y="250" fill="#ffffff" fontWeight="900" fontSize="20">LAND</text>
                  <line x1="120" y1="130" x2="400" y2="130" stroke="#0369a1" strokeWidth="9" strokeLinecap="round" />
                  <polygon points="416,130 388,113 388,147" fill="#0369a1" />
                  <text x="268" y="110" textAnchor="middle" fill="#075985" fontWeight="900" fontSize="16">Cool surface wind: Sea → Land</text>
                  <line x1="420" y1="215" x2="420" y2="145" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
                  <polygon points="420,132 404,160 436,160" fill="#ef4444" />
                  <text x="448" y="176" fill="#be123c" fontWeight="900" fontSize="15">Warm air rises</text>
                </svg>
                <h4>Sea Breeze</h4><p>During the day, wind blows from sea to land.</p>
              </div>
              <div className="nr-breeze-card">
                <svg className="nr-clean-svg" viewBox="0 0 560 300" aria-label="Correct land breeze diagram">
                  <rect width="560" height="300" rx="18" fill="#e0f2fe" />
                  <rect x="0" y="184" width="280" height="116" fill="#0891b2" />
                  <rect x="280" y="184" width="280" height="116" fill="#8b5e34" />
                  <circle cx="78" cy="60" r="30" fill="#c7d2fe" />
                  <circle cx="90" cy="52" r="30" fill="#e0f2fe" />
                  <text x="88" y="250" fill="#ffffff" fontWeight="900" fontSize="20">SEA</text>
                  <text x="394" y="250" fill="#ffffff" fontWeight="900" fontSize="20">LAND</text>
                  <line x1="420" y1="130" x2="140" y2="130" stroke="#0369a1" strokeWidth="9" strokeLinecap="round" />
                  <polygon points="124,130 152,113 152,147" fill="#0369a1" />
                  <text x="280" y="110" textAnchor="middle" fill="#075985" fontWeight="900" fontSize="16">Cool surface wind: Land → Sea</text>
                  <line x1="140" y1="215" x2="140" y2="145" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
                  <polygon points="140,132 124,160 156,160" fill="#ef4444" />
                  <text x="168" y="176" fill="#be123c" fontWeight="900" fontSize="15">Warm air rises</text>
                </svg>
                <h4>Land Breeze</h4><p>During the night, wind blows from land to sea.</p>
              </div>
            </div>
            <div className="nr-factor-grid"><div className="nr-pill">Differential heating of atmosphere</div><div className="nr-pill">Rotation of Earth</div><div className="nr-pill">Relief features</div><div className="nr-pill">Vapourisation and condensation</div><div className="nr-pill">Uneven heating of land</div><div className="nr-pill">Regional temperature difference</div></div>
          </div>
        </section>

        <div className="nr-divider"><div className="nr-divider-mark" /></div>

        <section className="nr-sec">
          <div className="nr-sec-head"><div className="nr-sec-num">03</div><div className="nr-sec-title-wrap"><div className="nr-sec-kicker">Water Resources</div><h2 className="nr-sec-title">Sources, Importance and <span>Water Cycle</span></h2></div></div>
          <div className="nr-grid-2">
            <div className="nr-water-card">
              <h3>Sources of Water</h3>
              <div className="nr-source-grid"><div className="nr-source-chip">Ponds</div><div className="nr-source-chip">Lakes</div><div className="nr-source-chip">Rivers</div><div className="nr-source-chip">Wells</div><div className="nr-source-chip">Reservoirs</div></div>
              <div className="nr-water-uses"><div className="nr-water-use"><div className="nr-drop"/><div>Needed for germination of seeds and transport of nutrients in plants.</div></div><div className="nr-water-use"><div className="nr-drop"/><div>Helps plants prepare food through photosynthesis.</div></div><div className="nr-water-use"><div className="nr-drop"/><div>Aquatic plants and animals receive dissolved nutrients and oxygen from water.</div></div><div className="nr-water-use"><div className="nr-drop"/><div>Used in cooking, cleaning, industries, power plants and transportation.</div></div></div>
            </div>
            <div className="nr-cycle-card">
              <h3 className="nr-cycle-title">Water Cycle</h3><p>Water circulates through the environment in different states through cyclic processes.</p>
              <svg className="nr-clean-svg" viewBox="0 0 560 380" aria-label="Correct water cycle diagram">
                <rect width="560" height="380" rx="18" fill="#083344" />
                <rect x="0" y="300" width="560" height="80" fill="#0891b2" />
                <path d="M0 280 H560 V300 H0 Z" fill="#7c5a35" opacity="0.85" />
                <circle cx="74" cy="62" r="32" fill="#f59e0b" />
                <path d="M330 78 h118 a28 28 0 0 1 0 56 H298 a30 30 0 0 1 32-56" fill="#ffffff" opacity="0.93" />
                <path d="M128 284 C126 214 162 160 234 116" fill="none" stroke="#67e8f9" strokeWidth="8" strokeLinecap="round" />
                <polygon points="246,110 214,108 232,138" fill="#67e8f9" />
                <text x="112" y="204" fill="#ffffff" fontWeight="900" fontSize="17">Evaporation</text>
                <path d="M266 96 C322 52 398 54 448 86" fill="none" stroke="#bfdbfe" strokeWidth="7" strokeLinecap="round" />
                <polygon points="460,94 428,90 448,66" fill="#bfdbfe" />
                <text x="288" y="48" fill="#ffffff" fontWeight="900" fontSize="17">Condensation</text>
                <line x1="420" y1="145" x2="420" y2="260" stroke="#bfdbfe" strokeWidth="7" strokeLinecap="round" />
                <polygon points="420,274 404,245 436,245" fill="#bfdbfe" />
                <text x="438" y="210" fill="#ffffff" fontWeight="900" fontSize="17">Precipitation</text>
                <text x="24" y="346" fill="#ffffff" fontWeight="900" fontSize="17">Surface water</text>
                <text x="350" y="296" fill="#ffffff" fontWeight="900" fontSize="17">Ground water</text>
              </svg>
            </div>
          </div>
        </section>

        <div className="nr-divider"><div className="nr-divider-mark" /></div>

        <section className="nr-sec">
          <div className="nr-sec-head"><div className="nr-sec-num">04</div><div className="nr-sec-title-wrap"><div className="nr-sec-kicker">Chemistry Link</div><h2 className="nr-sec-title">Solutions: Solvent, Solute and <span>Properties</span></h2></div></div>
          <div className="nr-solution-panel">
            <div className="nr-solution-top"><h3>A solution has two components.</h3><p>A solution is a homogeneous mixture made of a solvent and one or more solutes.</p></div>
            <div className="nr-inside-grid"><div className="nr-inside-cell"><h4>Solvent</h4><p>The component present in large amount in which the other component is dissolved.</p></div><div className="nr-inside-cell"><h4>Solute</h4><p>The component dissolved in the solution. It is present in lesser quantity than the solvent.</p></div></div>
            <div className="nr-property-grid"><div className="nr-property"><strong>Homogeneous</strong>Mixture of solutes and solvent.</div><div className="nr-property"><strong>Very small particles</strong>Solute particles are less than 1 nm in diameter.</div><div className="nr-property"><strong>Not visible</strong>Solute particles cannot be seen with naked eye.</div><div className="nr-property"><strong>No light scattering</strong>A solution does not scatter light.</div><div className="nr-property"><strong>No filtration</strong>Solute cannot be separated by filtration.</div><div className="nr-property"><strong>No settling</strong>Particles do not settle down when left undisturbed.</div></div>
          </div>
        </section>

        <div className="nr-divider"><div className="nr-divider-mark" /></div>

        <section className="nr-sec">
          <div className="nr-sec-head"><div className="nr-sec-num">05</div><div className="nr-sec-title-wrap"><div className="nr-sec-kicker">Land Resource</div><h2 className="nr-sec-title">Soil: Components and <span>Importance</span></h2></div></div>
          <div className="nr-grid-2">
            <div className="nr-soil-card">
              <div className="nr-soil-head"><h3>What is Soil?</h3><p>Soil is the layer of Earth that results from degradation of bedrock due to physical, chemical and biological processes.</p></div>
              <div className="nr-soil-components"><div className="nr-soil-chip">Small rock particles</div><div className="nr-soil-chip">Humus</div><div className="nr-soil-chip">Microscopic life</div><div className="nr-soil-chip">Nutrients</div></div>
              <div className="nr-soil-components"><div className="nr-soil-chip">Parent material</div><div className="nr-soil-chip">Climate</div><div className="nr-soil-chip">Topography</div><div className="nr-soil-chip">Organisms</div><div className="nr-soil-chip">Time</div></div>
            </div>
            <div className="nr-concept-diagram">
              <div className="nr-diagram-title">Importance of Soil</div>
              <svg className="nr-clean-svg" viewBox="0 0 620 520" aria-label="Correct importance of soil diagram">
                <rect width="620" height="520" rx="18" fill="#fff7ed" />
                <circle cx="310" cy="260" r="74" fill="#92400e" />
                <text x="310" y="268" textAnchor="middle" fill="#ffffff" fontWeight="900" fontSize="24">SOIL</text>

                <line x1="270" y1="198" x2="190" y2="112" stroke="#92400e" strokeWidth="3" opacity="0.32" />
                <line x1="350" y1="198" x2="430" y2="112" stroke="#92400e" strokeWidth="3" opacity="0.32" />
                <line x1="236" y1="260" x2="162" y2="260" stroke="#92400e" strokeWidth="3" opacity="0.32" />
                <line x1="384" y1="260" x2="458" y2="260" stroke="#92400e" strokeWidth="3" opacity="0.32" />
                <line x1="268" y1="324" x2="190" y2="408" stroke="#92400e" strokeWidth="3" opacity="0.32" />
                <line x1="352" y1="324" x2="430" y2="408" stroke="#92400e" strokeWidth="3" opacity="0.32" />
                <line x1="310" y1="334" x2="310" y2="430" stroke="#92400e" strokeWidth="3" opacity="0.32" />

                <rect x="46" y="58" width="190" height="64" rx="16" fill="#ffffff" stroke="#86efac" />
                <text x="141" y="84" textAnchor="middle" fill="#1b3325" fontWeight="900" fontSize="13">Medium of crop</text>
                <text x="141" y="102" textAnchor="middle" fill="#1b3325" fontWeight="900" fontSize="13">production</text>
                <rect x="384" y="58" width="190" height="64" rx="16" fill="#ffffff" stroke="#86efac" />
                <text x="479" y="93" textAnchor="middle" fill="#1b3325" fontWeight="900" fontSize="13">Waste decomposer</text>
                <rect x="30" y="228" width="190" height="64" rx="16" fill="#ffffff" stroke="#86efac" />
                <text x="125" y="254" textAnchor="middle" fill="#1b3325" fontWeight="900" fontSize="13">Medium for plant</text>
                <text x="125" y="272" textAnchor="middle" fill="#1b3325" fontWeight="900" fontSize="13">growth</text>
                <rect x="400" y="228" width="190" height="64" rx="16" fill="#ffffff" stroke="#86efac" />
                <text x="495" y="254" textAnchor="middle" fill="#1b3325" fontWeight="900" fontSize="13">Filter of water</text>
                <text x="495" y="272" textAnchor="middle" fill="#1b3325" fontWeight="900" fontSize="13">and wastes</text>
                <rect x="46" y="398" width="190" height="64" rx="16" fill="#ffffff" stroke="#86efac" />
                <text x="141" y="433" textAnchor="middle" fill="#1b3325" fontWeight="900" fontSize="13">Home to organisms</text>
                <rect x="384" y="398" width="190" height="64" rx="16" fill="#ffffff" stroke="#86efac" />
                <text x="479" y="424" textAnchor="middle" fill="#1b3325" fontWeight="900" fontSize="13">Essential natural</text>
                <text x="479" y="442" textAnchor="middle" fill="#1b3325" fontWeight="900" fontSize="13">resource</text>
                <rect x="215" y="440" width="190" height="58" rx="16" fill="#ffffff" stroke="#86efac" />
                <text x="310" y="475" textAnchor="middle" fill="#1b3325" fontWeight="900" fontSize="13">Great integrator</text>
              </svg>
            </div>
          </div>
        </section>

        <div className="nr-divider"><div className="nr-divider-mark" /></div>

        <section className="nr-sec">
          <div className="nr-sec-head"><div className="nr-sec-num">06</div><div className="nr-sec-title-wrap"><div className="nr-sec-kicker">Soil Threats</div><h2 className="nr-sec-title">Soil Erosion and <span>Soil Pollution</span></h2></div></div>
          <div className="nr-erosion-grid"><div className="nr-plain-card nr-earth-title"><h3>Soil Erosion</h3><p>Soil erosion is the removal of the top layer of soil.</p></div><div className="nr-plain-card nr-danger"><h3>Soil Pollution</h3><p>Soil pollution is the introduction of toxic compounds, chemicals, salts and radioactive materials into the soil.</p></div></div>
          <div className="nr-prevent-grid"><div className="nr-pill">Afforestation</div><div className="nr-pill">Terrace farming</div><div className="nr-pill">Proper irrigation techniques</div><div className="nr-pill">Proper embankments</div><div className="nr-pill">Protection of topsoil</div><div className="nr-pill">Control of land degradation</div></div>
        </section>

        <div className="nr-divider"><div className="nr-divider-mark" /></div>

        <section className="nr-sec">
          <div className="nr-sec-head"><div className="nr-sec-num">07</div><div className="nr-sec-title-wrap"><div className="nr-sec-kicker">Pollution</div><h2 className="nr-sec-title">Air and <span>Water Pollution</span></h2></div></div>
          <div className="nr-pollution-grid">
            <div className="nr-plain-card nr-danger"><h3>Air Pollution</h3><p>A change in the quality of air due to addition of harmful substances by humans or environmental processes.</p><div className="nr-source-list"><div className="nr-source-item"><div className="nr-bad-dot">!</div><div>Burning of fossil fuels and wood</div></div><div className="nr-source-item"><div className="nr-bad-dot">!</div><div>Automobile exhaust and combustion</div></div><div className="nr-source-item"><div className="nr-bad-dot">!</div><div>Refrigerants such as Freon and aerosol sprays</div></div></div></div>
            <div className="nr-plain-card nr-water-title"><h3>Water Pollution</h3><p>A change in water quality due to addition of harmful substances by humans.</p><div className="nr-source-list"><div className="nr-source-item"><div className="nr-bad-dot">!</div><div>Fertilisers and insecticides</div></div><div className="nr-source-item"><div className="nr-bad-dot">!</div><div>Sewage from towns and cities</div></div><div className="nr-source-item"><div className="nr-bad-dot">!</div><div>Waste from factories and industries</div></div><div className="nr-source-item"><div className="nr-bad-dot">!</div><div>Change in water temperature is also a form of pollution</div></div></div></div>
          </div>
        </section>

        <div className="nr-divider"><div className="nr-divider-mark" /></div>

        <section className="nr-sec">
          <div className="nr-sec-head"><div className="nr-sec-num">08</div><div className="nr-sec-title-wrap"><div className="nr-sec-kicker">Climate Link</div><h2 className="nr-sec-title">Greenhouse Effect and <span>Global Warming</span></h2></div></div>
          <div className="nr-greenhouse-card">
            <div className="nr-greenhouse-grid">
              <div><h3 className="nr-greenhouse-title">Heat gets trapped in the atmosphere.</h3><p className="nr-greenhouse-text">Greenhouse effect is the trapping of heat by gases such as carbon dioxide in the atmosphere. These gases increase Earth’s temperature and contribute to global warming.</p><div className="nr-gas-list"><span className="nr-gas-chip">Carbon dioxide</span><span className="nr-gas-chip">Methane</span><span className="nr-gas-chip">Nitrous oxide</span><span className="nr-gas-chip">Water vapour</span></div></div>
              <svg className="nr-clean-svg" viewBox="0 0 560 340" aria-label="Correct greenhouse effect diagram">
                <rect width="560" height="340" rx="18" fill="#052e16" />
                <circle cx="76" cy="70" r="32" fill="#f59e0b" />
                <path d="M145 260 C202 198 358 198 415 260" fill="#22c55e" />
                <path d="M130 260 H430" stroke="#0891b2" strokeWidth="18" strokeLinecap="round" />
                <path d="M120 102 L282 210" stroke="#fde68a" strokeWidth="8" strokeLinecap="round" />
                <polygon points="294,218 260,212 280,190" fill="#fde68a" />
                <text x="134" y="84" fill="#ffffff" fontWeight="900" fontSize="15">Incoming heat</text>
                <path d="M280 208 L280 105" stroke="#fb7185" strokeWidth="8" strokeLinecap="round" />
                <polygon points="280,92 264,120 296,120" fill="#fb7185" />
                <text x="300" y="154" fill="#ffffff" fontWeight="900" fontSize="15">Heat rises</text>
                <path d="M135 258 C145 72 415 72 425 258" fill="none" stroke="#86efac" strokeWidth="8" />
                <text x="280" y="58" textAnchor="middle" fill="#86efac" fontWeight="900" fontSize="16">Greenhouse gases</text>
                <path d="M382 126 L316 214" stroke="#fb7185" strokeWidth="8" strokeLinecap="round" />
                <polygon points="306,226 315,192 338,212" fill="#fb7185" />
                <text x="390" y="136" fill="#ffffff" fontWeight="900" fontSize="15">Trapped heat</text>
              </svg>
            </div>
          </div>
          <p className="nr-body-text"><strong>Global warming:</strong> CO₂ level is increasing due to human activities such as deforestation and burning of fossil fuels. Build-up of CO₂ raises Earth’s average temperature, causing melting of glaciers and rise in sea level.</p>
        </section>

        <div className="nr-divider"><div className="nr-divider-mark" /></div>

        <section className="nr-sec">
          <div className="nr-sec-head"><div className="nr-sec-num">09</div><div className="nr-sec-title-wrap"><div className="nr-sec-kicker">Protection Layer</div><h2 className="nr-sec-title">Ozone Layer and <span>Ozone Depletion</span></h2></div></div>
          <div className="nr-ozone-panel">
            <div className="nr-plain-card nr-violet-title"><h3>Ozone protects Earth.</h3><p>Ozone (O₃) is a form of oxygen. The ozone layer protects Earth by preventing harmful ultraviolet radiation from reaching the surface.</p><svg className="nr-clean-svg" viewBox="0 0 560 290" aria-label="Correct ozone layer diagram">
                <rect width="560" height="290" rx="18" fill="#e0f2fe" />
                <path d="M105 210 C165 70 395 70 455 210" fill="none" stroke="#6d28d9" strokeWidth="10" />
                <text x="280" y="116" textAnchor="middle" fill="#6d28d9" fontWeight="900" fontSize="20">Ozone layer</text>
                <line x1="155" y1="36" x2="155" y2="142" stroke="#be123c" strokeWidth="8" strokeLinecap="round" />
                <polygon points="155,156 139,126 171,126" fill="#be123c" />
                <line x1="280" y1="30" x2="280" y2="130" stroke="#be123c" strokeWidth="8" strokeLinecap="round" />
                <polygon points="280,144 264,114 296,114" fill="#be123c" />
                <line x1="405" y1="36" x2="405" y2="142" stroke="#be123c" strokeWidth="8" strokeLinecap="round" />
                <polygon points="405,156 389,126 421,126" fill="#be123c" />
                <text x="438" y="54" fill="#be123c" fontWeight="900" fontSize="18">UV rays</text>
                <rect x="70" y="246" width="420" height="12" rx="6" fill="#16a34a" />
                <text x="280" y="236" textAnchor="middle" fill="#1e5c1e" fontWeight="900" fontSize="15">Earth surface</text>
              </svg></div>
            <div className="nr-plain-card nr-violet-title"><h3>Ozone depletion</h3><ul><li>Pollutants such as chlorine and fluorine are responsible for depleting the ozone layer.</li><li>A hole has developed in the ozone layer over Antarctica.</li><li>The size of the ozone hole has been steadily increasing over the years.</li></ul></div>
          </div>
        </section>

        <div className="nr-divider"><div className="nr-divider-mark" /></div>

        <section className="nr-sec">
          <div className="nr-sec-head"><div className="nr-sec-num">10</div><div className="nr-sec-title-wrap"><div className="nr-sec-kicker">Matter Cycling</div><h2 className="nr-sec-title">Natural Cycles: Water, Carbon, Oxygen and <span>Nitrogen</span></h2></div></div>
          <div className="nr-cycle-grid">
            {[['Water Cycle','Clouds','Water','Rain','Water circulates through evaporation, condensation, precipitation, surface water and ground water.'],['Carbon Cycle','CO₂','Plants','Animals','Carbon moves through atmosphere, plants, animals, organic compounds, fossil fuels and carbonates.'],['Oxygen Cycle','O₂','Photo.','Resp.','Oxygen is connected with photosynthesis, respiration, organic molecules, CO₂ and H₂O.'],['Nitrogen Cycle','N₂','Soil','Plants','Nitrogen moves through atmospheric nitrogen, nitrogen fixation, soil compounds, plants, animals and bacteria.']].map(([title,a,b,c,text]) => (
              <div className="nr-bio-cycle" key={title}>
                <h3>{title}</h3>
                <svg className="nr-svg" viewBox="0 0 360 150" aria-label={title}>
                  <rect width="360" height="150" rx="14" fill="#f3fbf1" stroke="#86efac"/><circle cx="180" cy="74" r="48" fill="none" stroke="#2d7a2d" strokeWidth="4" strokeDasharray="8 6"/><polygon points="232,48 208,50 222,70" fill="#2d7a2d"/><polygon points="122,118 143,106 144,131" fill="#2d7a2d"/><rect x="136" y="14" width="88" height="30" rx="15" fill="white" stroke="#86efac"/><text x="180" y="34" textAnchor="middle" fill="#1e5c1e" fontWeight="800" fontSize="12">{a}</text><rect x="28" y="100" width="96" height="30" rx="15" fill="white" stroke="#86efac"/><text x="76" y="120" textAnchor="middle" fill="#1e5c1e" fontWeight="800" fontSize="12">{b}</text><rect x="236" y="100" width="96" height="30" rx="15" fill="white" stroke="#86efac"/><text x="284" y="120" textAnchor="middle" fill="#1e5c1e" fontWeight="800" fontSize="12">{c}</text>
                </svg>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="nr-faq-wrap">
          <h2 className="nr-faq-title">Quick <span>FAQ Revision</span></h2>
          <div className="nr-faq-list">
            {faqData.map((item, index) => (
              <div className="nr-faq-item" key={item.q}>
                <button className="nr-faq-q" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}>
                  <span>{item.q}</span><span className="nr-faq-icon">{openFaq === index ? "▴" : "▾"}</span>
                </button>
                {openFaq === index && <div className="nr-faq-a">{item.a}</div>}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
