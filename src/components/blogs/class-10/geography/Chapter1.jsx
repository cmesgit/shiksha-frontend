import { useState } from "react";

// ── Google Fonts injected once ──────────────────────────────────────────────
const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

// ── Palette & base styles ────────────────────────────────────────────────────
const styles = `
  :root {
    --ink:      #0f172a;
    --ink2:     #1e293b;
    --muted:    #64748b;
    --accent:   #16a34a;
    --accent2:  #15803d;
    --accent3:  #bbf7d0;
    --surface:  #f0fdf4;
    --card:     #ffffff;
    --border:   #d1fae5;
    --tag-bg:   #dcfce7;
  }

  .blog-root {
    font-family: 'Inter', sans-serif;
    background: #f8fafc;
    color: var(--ink);
    min-height: 100vh;
  }

  /* ── Hero ── */
  .chapter1-hero {
    background: linear-gradient(135deg, #052e16 0%, #14532d 45%, #166534 100%);
    padding: 80px 24px 96px;
    position: relative;
    overflow: hidden;
  }
  .chapter1-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 15% 50%, rgba(134,239,172,0.12) 0%, transparent 55%),
      radial-gradient(circle at 85% 20%, rgba(22,163,74,0.15) 0%, transparent 50%);
  }
  .chapter1-hero-inner {
    max-width: 820px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }
  .chapter1-hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(134,239,172,0.15);
    border: 1px solid rgba(134,239,172,0.3);
    color: #86efac;
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    font-weight: 600;
    padding: 6px 16px;
    border-radius: 100px;
    margin-bottom: 28px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .chapter1-hero-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(36px, 6vw, 62px);
    font-weight: 900;
    line-height: 1.08;
    color: #ffffff;
    margin: 0 0 20px;
    letter-spacing: -0.02em;
  }
  .chapter1-hero-title span {
    color: #4ade80;
  }
  .chapter1-hero-sub {
    font-family: 'Poppins', sans-serif;
    font-size: 17px;
    font-weight: 500;
    color: #bbf7d0;
    line-height: 1.7;
    max-width: 600px;
    margin: 0 0 40px;
  }
  .chapter1-hero-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
  }
  .meta-chip {
    display: flex;
    align-items: center;
    gap: 7px;
    color: #86efac;
    font-size: 14px;
    font-weight: 500;
  }
  .meta-dot {
    width: 4px;
    height: 4px;
    background: #4ade80;
    border-radius: 50%;
  }

  /* ── Body layout ── */
  .body-wrap {
    max-width: 820px;
    margin: 0 auto;
    padding: 64px 24px 80px;
  }

  /* ── Intro definition card ─────────────────────────────────────────────── */
  .definition-card {
    background: linear-gradient(135deg, #052e16, #14532d);
    border-radius: 20px;
    padding: 40px 44px;
    margin-bottom: 64px;
    position: relative;
    overflow: hidden;
  }
  .definition-card::after {
    content: '"';
    position: absolute;
    top: -20px;
    right: 24px;
    font-size: 180px;
    color: rgba(74,222,128,0.08);
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    line-height: 1;
  }
  .definition-card p {
    font-family: 'Poppins', sans-serif;
    font-size: 19px;
    font-weight: 500;
    color: #dcfce7;
    line-height: 1.75;
    margin: 0 0 16px;
    position: relative;
    z-index: 1;
  }
  .definition-card p:last-child { margin: 0; }

  /* ── Section headings ───────────────────────────────────────────────────── */
  .section-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .section-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(26px, 4vw, 36px);
    font-weight: 800;
    color: var(--ink);
    line-height: 1.2;
    margin: 0 0 32px;
    letter-spacing: -0.01em;
  }
  .section-title .accent { color: var(--accent); }

  /* ── Classification grid ────────────────────────────────────────────────── */
  .classify-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 20px;
    margin-bottom: 64px;
  }
  .classify-card {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 16px;
    padding: 28px 30px;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .classify-card:hover {
    box-shadow: 0 8px 32px rgba(22,163,74,0.1);
    transform: translateY(-2px);
  }
  .classify-icon {
    width: 44px;
    height: 44px;
    background: var(--tag-bg);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    margin-bottom: 16px;
  }
  .classify-heading {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 6px;
  }
  .classify-sub {
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: var(--accent);
    margin-bottom: 12px;
  }
  .classify-body {
    font-size: 15px;
    line-height: 1.7;
    color: #334155;
  }

  /* ── Types of Resources ─────────────────────────────────────────────────── */
  .resource-block {
    margin-bottom: 48px;
  }
  .resource-type-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: var(--ink);
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--border);
  }
  .resource-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }
  @media (max-width: 600px) {
    .resource-row { grid-template-columns: 1fr; }
    .classify-grid { grid-template-columns: 1fr; }
  }
  .resource-pill {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 14px;
    padding: 22px 24px;
  }
  .resource-pill h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--accent2);
    margin: 0 0 8px;
  }
  .resource-pill p {
    font-size: 15px;
    line-height: 1.65;
    color: #374151;
    margin: 0 0 8px;
  }
  .resource-pill .example-tag {
    display: inline-block;
    background: var(--tag-bg);
    color: var(--accent2);
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    font-weight: 600;
    padding: 3px 12px;
    border-radius: 100px;
  }

  /* ── Ownership 4-col ────────────────────────────────────────────────────── */
  .ownership-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    gap: 16px;
    margin-bottom: 16px;
  }
  .own-card {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 14px;
    padding: 22px 20px;
    text-align: center;
  }
  .own-card .own-icon { font-size: 28px; margin-bottom: 10px; }
  .own-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: var(--ink);
    margin: 0 0 8px;
  }
  .own-card p {
    font-size: 14px;
    line-height: 1.6;
    color: #475569;
    margin: 0 0 8px;
  }
  .own-card .eg {
    font-size: 12px;
    color: var(--accent);
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
  }

  /* ── Development status ─────────────────────────────────────────────────── */
  .dev-status-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin-bottom: 16px;
  }
  .dev-card {
    background: var(--card);
    border-radius: 14px;
    border: 1.5px solid var(--border);
    padding: 24px 20px;
  }
  .dev-card .status-badge {
    display: inline-block;
    background: var(--tag-bg);
    color: var(--accent2);
    font-family: 'Poppins', sans-serif;
    font-size: 11px;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 100px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  .dev-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: var(--ink);
    margin: 0 0 8px;
  }
  .dev-card p {
    font-size: 14px;
    line-height: 1.65;
    color: #475569;
    margin: 0;
  }

  /* ── Alert / Warning banner ─────────────────────────────────────────────── */
  .alert-banner {
    background: linear-gradient(135deg, #fefce8, #fef9c3);
    border: 1.5px solid #fde047;
    border-radius: 16px;
    padding: 32px 36px;
    margin-bottom: 48px;
  }
  .alert-banner h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: #713f12;
    margin: 0 0 16px;
  }
  .alert-banner ul {
    margin: 0;
    padding-left: 20px;
  }
  .alert-banner ul li {
    font-size: 16px;
    line-height: 1.75;
    color: #78350f;
    margin-bottom: 6px;
  }

  /* ── Sustainable Dev ────────────────────────────────────────────────────── */
  .sustain-card {
    background: linear-gradient(135deg, #f0fdf4, #dcfce7);
    border: 1.5px solid var(--border);
    border-radius: 20px;
    padding: 40px 44px;
    margin-bottom: 32px;
  }
  .sustain-card h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 22px;
    font-weight: 800;
    color: var(--ink);
    margin: 0 0 16px;
  }
  .sustain-card p {
    font-size: 17px;
    line-height: 1.75;
    color: #1e3a2f;
    margin: 0 0 12px;
  }
  .sustain-card p:last-child { margin: 0; }

  /* ── Timeline ────────────────────────────────────────────────────────────── */
  .timeline {
    position: relative;
    padding-left: 28px;
    margin-bottom: 48px;
  }
  .timeline::before {
    content: '';
    position: absolute;
    left: 6px;
    top: 8px;
    bottom: 8px;
    width: 2px;
    background: linear-gradient(to bottom, var(--accent), var(--border));
    border-radius: 2px;
  }
  .tl-item {
    position: relative;
    margin-bottom: 28px;
  }
  .tl-item::before {
    content: '';
    position: absolute;
    left: -26px;
    top: 6px;
    width: 12px;
    height: 12px;
    background: var(--accent);
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 0 0 2px var(--accent);
  }
  .tl-item h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--ink);
    margin: 0 0 6px;
  }
  .tl-item p {
    font-size: 15px;
    line-height: 1.7;
    color: #475569;
    margin: 0;
  }

  /* ── Info box ────────────────────────────────────────────────────────────── */
  .info-box {
    background: var(--card);
    border-left: 4px solid var(--accent);
    border-radius: 0 12px 12px 0;
    padding: 24px 28px;
    margin-bottom: 24px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  }
  .info-box h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--ink);
    margin: 0 0 8px;
  }
  .info-box p {
    font-size: 15px;
    line-height: 1.7;
    color: #374151;
    margin: 0;
  }

  /* ── Land sections ──────────────────────────────────────────────────────── */
  .land-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 14px;
    margin-bottom: 32px;
  }
  .land-item {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 12px;
    padding: 18px 20px;
  }
  .land-item h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: var(--accent2);
    margin: 0 0 6px;
  }
  .land-item p {
    font-size: 14px;
    line-height: 1.65;
    color: #475569;
    margin: 0;
  }

  /* ── Soil cards ─────────────────────────────────────────────────────────── */
  .soil-section { margin-bottom: 64px; }
  .soil-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
  .soil-card {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 16px;
    padding: 28px;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .soil-card:hover {
    box-shadow: 0 8px 32px rgba(22,163,74,0.1);
    transform: translateY(-2px);
  }
  .soil-number {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: var(--muted);
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .soil-card h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--ink);
    margin: 0 0 14px;
  }
  .soil-card ul {
    padding-left: 18px;
    margin: 0;
  }
  .soil-card ul li {
    font-size: 15px;
    line-height: 1.7;
    color: #374151;
    margin-bottom: 6px;
  }
  .soil-card ul li:last-child { margin: 0; }

  /* ── Erosion conservation ───────────────────────────────────────────────── */
  .erosion-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 48px;
  }
  @media (max-width: 640px) {
    .erosion-grid { grid-template-columns: 1fr; }
  }
  .erosion-col h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 17px;
    font-weight: 700;
    margin: 0 0 16px;
  }
  .erosion-col.causes h3 { color: #b91c1c; }
  .erosion-col.conservation h3 { color: var(--accent2); }
  .erosion-list li {
    font-size: 15px;
    line-height: 1.7;
    color: #374151;
    margin-bottom: 8px;
    padding: 10px 14px;
    background: var(--card);
    border-radius: 10px;
    border: 1.5px solid var(--border);
    list-style: none;
  }

  /* ── Section divider ────────────────────────────────────────────────────── */
  .divider {
    border: none;
    border-top: 2px solid var(--border);
    margin: 56px 0;
  }

  /* ── FAQ ────────────────────────────────────────────────────────────────── */
  .chapter1-faq-section { margin-top: 0; }
  .chapter1-faq-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .chapter1-faq-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(26px, 4vw, 36px);
    font-weight: 800;
    color: var(--ink);
    margin: 0 0 40px;
    letter-spacing: -0.01em;
  }
  .chapter1-faq-item {
    border: 1.5px solid var(--border);
    border-radius: 16px;
    margin-bottom: 14px;
    overflow: hidden;
    background: var(--card);
    transition: box-shadow 0.2s;
  }
  .chapter1-faq-item.open {
    box-shadow: 0 4px 20px rgba(22,163,74,0.1);
    border-color: var(--accent);
  }
  .chapter1-faq-q {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    padding: 22px 26px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
  }
  .chapter1-faq-q-text {
    font-family: 'Poppins', sans-serif;
    font-size: 17px;
    font-weight: 600;
    color: var(--ink);
    line-height: 1.5;
    text-align: left;
  }
  .chapter1-faq-item.open .chapter1-faq-q-text { color: var(--accent2); }
  .chapter1-faq-icon {
    width: 28px;
    height: 28px;
    background: var(--tag-bg);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--accent2);
    font-size: 18px;
    font-weight: 700;
    transition: transform 0.3s;
    margin-top: 2px;
  }
  .chapter1-faq-item.open .chapter1-faq-icon {
    transform: rotate(45deg);
    background: var(--accent);
    color: #fff;
  }
  .chapter1-faq-ans {
    display: none;
    padding: 0 26px 24px;
    font-size: 16px;
    line-height: 1.8;
    color: #374151;
  }
  .chapter1-faq-ans.visible { display: block; }
  .chapter1-faq-ans ul { padding-left: 20px; margin: 8px 0; }
  .chapter1-faq-ans ul li { margin-bottom: 6px; }
  .chapter1-faq-ans strong {
    color: var(--ink);
    font-family: 'Poppins', sans-serif;
  }
`;

// ── FAQ Data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Define resources. Give examples of any two renewable resources.",
    a: (
      <>
        <p>Everything that our environment provides us, that is <strong>economically feasible, culturally acceptable, and technologically accessible</strong> are called <strong>Resources</strong>. They form an interactive relationship between nature, technology, and institutions which aid economic development. Human beings are themselves a part of resources — called <strong>human resources</strong>.</p>
        <p>Resources are classified on the basis of: <strong>origin</strong> (biotic/abiotic), <strong>exhaustibility</strong> (renewable/non-renewable), <strong>ownership</strong> (individual, community, national, international), and <strong>development status</strong> (potential, developed, stock, reserves).</p>
        <p><strong>Two examples of renewable resources:</strong> Solar energy and Wind energy.</p>
      </>
    ),
  },
  {
    q: "Give classification of resources.",
    a: (
      <>
        <ul>
          <li><strong>By Origin:</strong> Biotic (flora, fauna, fisheries) and Abiotic (rocks, metals)</li>
          <li><strong>By Exhaustibility:</strong> Renewable (solar, wind) and Non-renewable (fossil fuels)</li>
          <li><strong>By Ownership:</strong> Individual (plantations), Community (grazing grounds), National (legally owned by the state), International (oceanic resources beyond 200 nautical miles of Exclusive Economic Zone)</li>
          <li><strong>By Development Status:</strong> Potential, Developed, Stock, and Reserves</li>
        </ul>
      </>
    ),
  },
  {
    q: "Explain the classification of resources on the basis of ownership with examples.",
    a: (
      <>
        <ul>
          <li><strong>Individual:</strong> Privately owned — e.g., Plantations, pasture lands</li>
          <li><strong>Community:</strong> Accessible to all community members — e.g., Grazing grounds, burial grounds</li>
          <li><strong>National:</strong> Owned by the nation with legal autonomy. Government can acquire private property for public good.</li>
          <li><strong>International:</strong> Oceanic resources beyond 200 nautical miles of the Exclusive Economic Zone — no single country may use these without permission from international organizations.</li>
        </ul>
      </>
    ),
  },
  {
    q: "What is meant by the term 'sustainable economic development'?",
    a: (
      <p>Development that takes place <strong>without over-exploiting nature</strong> is called sustainable development. The core idea is that <strong>"development in the present should not compromise the needs of future generations."</strong> It aims to balance economic growth with environmental protection for lasting prosperity.</p>
    ),
  },
  {
    q: "Explain briefly about 'Agenda 21'.",
    a: (
      <>
        <p>The <strong>Rio de Janeiro Earth Summit (June 1992)</strong> brought together 100+ world leaders for the first International Earth Summit. The Summit addressed environmental protection and socioeconomic development. Leaders signed a declaration on <strong>Global Climatic Change and Biological Diversity</strong>.</p>
        <p>The Rio Convention endorsed the global Forest Principles and adopted <strong>Agenda 21</strong> — a plan to achieve global sustainable development in the 21st century by combating environmental damage, poverty, and disease through global cooperation. A key objective: every local government must draw its own <strong>Local Agenda 21</strong>.</p>
      </>
    ),
  },
  {
    q: "Write a note on black soil. Give examples of three states that have black soil.",
    a: (
      <>
        <p>Black soil, also known as <strong>Regur soil</strong> or <strong>black cotton soil</strong>, is formed from lava flows and is ideal for growing cotton. It is found in the Deccan Trap (Basalt) region across the northwest Deccan plateau.</p>
        <ul>
          <li>Made of <strong>clayey material</strong> — retains moisture well</li>
          <li>Rich in nutrients: <strong>calcium carbonate, magnesium, potash, and lime</strong></li>
          <li>Develops <strong>deep cracks</strong> in hot weather (promotes aeration) but gets sticky when wet</li>
          <li><strong>States with black soil:</strong> Maharashtra, Madhya Pradesh, and Chhattisgarh (also Saurashtra, Malwa along Godavari and Krishna valleys)</li>
        </ul>
      </>
    ),
  },
  {
    q: "What are the different types of soil erosion?",
    a: (
      <>
        <ul>
          <li><strong>Gully Erosion:</strong> Running water cuts through clayey soil making deep channels called gullies, rendering land unfit for cultivation (called "bad land" / ravines in Chambal basin)</li>
          <li><strong>Sheet Erosion:</strong> Water flows as a sheet over a slope, washing away the top layer of soil across a wide area</li>
          <li><strong>Wind Erosion:</strong> Top fertile soil is carried away by wind. Planting trees (shelter belts) helps reduce this significantly</li>
        </ul>
      </>
    ),
  },
  {
    q: "Mention the factors that determine land use in India.",
    a: (
      <>
        <p>Land use is determined by:</p>
        <ul>
          <li><strong>Physical factors:</strong> Topography, climate, soil types</li>
          <li><strong>Human factors:</strong> Population density, technological capability, culture and traditions</li>
        </ul>
        <p>Net sown area varies widely — over <strong>80% in Punjab & Haryana</strong>, but less than <strong>10% in Arunachal Pradesh, Mizoram, Manipur, and Andaman & Nicobar Islands</strong>. Forest area is far below the desired 33% as per National Forest Policy (1952).</p>
      </>
    ),
  },
  {
    q: '"Resource planning is essential for sustainable development." Elaborate.',
    a: (
      <>
        <p>Resource distribution across India is highly uneven. Jharkhand and Chhattisgarh are mineral-rich; Arunachal Pradesh has abundant water but lacks infrastructure; Rajasthan has solar/wind potential but lacks water; Ladakh is culturally rich but deficient in water and minerals.</p>
        <p><strong>Resource planning involves three steps:</strong></p>
        <ul>
          <li>Identification and inventory of resources through surveying and mapping</li>
          <li>Developing a planning structure with appropriate technology and institutional setup</li>
          <li>Matching resource development plans with overall national development goals</li>
        </ul>
      </>
    ),
  },
  {
    q: "What are the different types of soil found in India?",
    a: (
      <>
        <p>India has six major soil types: <strong>Alluvial, Black, Red & Yellow, Laterite, Arid, and Forest soils</strong>.</p>
        <p><strong>Characteristics of Alluvial Soil:</strong></p>
        <ul>
          <li>Composed of sand, silt, and clay in various proportions</li>
          <li>Classified by age as old alluvial (<strong>Bangar</strong>) and new alluvial (<strong>Khadar</strong>)</li>
          <li>Khadar has finer particles and is more fertile than Bangar</li>
          <li>Rich in <strong>potash, phosphoric acid, and lime</strong> — ideal for sugarcane, paddy, wheat, and cereal crops</li>
        </ul>
      </>
    ),
  },
];

// ── Main Component ────────────────────────────────────────────────────────────
export default function ResourcesAndDevelopment() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>

      <div className="blog-root">
        {/* ── HERO ── */}
        <div className="chapter1-hero">
          <div className="chapter1-hero-inner">
            <div className="chapter1-hero-tag">📚 Class 10 · Social Science · Geography</div>
            <h1 className="chapter1-hero-title">
              Resources &<br /><span>Development</span>
            </h1>
            <p className="chapter1-hero-sub">
              Chapter 1 — Complete revision notes covering types of resources, land use patterns, soil types, sustainable development, and conservation strategies.
            </p>
            <div className="chapter1-hero-meta">
              <span className="meta-chip">🗺️ Geography</span>
              <span className="meta-dot" />
              <span className="meta-chip">📖 Revision Notes</span>
              <span className="meta-dot" />
              <span className="meta-chip">❓ 10 FAQs Included</span>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="body-wrap">
          {/* Definition */}
          <div className="definition-card">
            <p>Everything that our environment provides us, that is <strong style={{color:'#86efac'}}>economically feasible</strong>, <strong style={{color:'#86efac'}}>culturally acceptable</strong>, and <strong style={{color:'#86efac'}}>technologically accessible</strong> are called <strong style={{color:'#4ade80'}}>Resources.</strong></p>
            <p>They form an interactive relationship between nature, technology, and institutions which aid the acceleration of economic development. Human beings themselves are a part of resources — known as <strong style={{color:'#86efac'}}>human resources.</strong></p>
          </div>

          {/* Classification Overview */}
          <div className="section-label">Overview</div>
          <h2 className="section-title">How are Resources <span className="accent">Classified?</span></h2>

          <div className="classify-grid">
            {[
              { icon: "🌱", head: "Basis of Origin", sub: "Biotic & Abiotic", body: "Resources from the biosphere (flora, fauna, fisheries) are biotic. Resources from non-living elements like rocks and metals are abiotic." },
              { icon: "🔄", head: "Basis of Exhaustibility", sub: "Renewable & Non-renewable", body: "Renewable resources replenish naturally (solar, wind). Non-renewable resources like fossil fuels cannot replenish and can be lost forever." },
              { icon: "🏛️", head: "Basis of Ownership", sub: "Individual, Community, National, International", body: "Resources may be privately owned, community-shared, nationally governed, or managed internationally beyond 200 nautical miles of EEZ." },
              { icon: "📊", head: "Basis of Development", sub: "Potential, Developed, Stock & Reserves", body: "Resources range from untapped potential to fully developed, or awaiting better technology (stock), or partially utilized (reserves)." },
            ].map((c, i) => (
              <div className="classify-card" key={i}>
                <div className="classify-icon">{c.icon}</div>
                <div className="classify-heading">{c.head}</div>
                <div className="classify-sub">{c.sub}</div>
                <div className="classify-body">{c.body}</div>
              </div>
            ))}
          </div>

          <hr className="divider" />

          {/* Types — Origin */}
          <div className="resource-block">
            <div className="section-label">Types of Resources</div>
            <h2 className="section-title">1. On the Basis of <span className="accent">Origin</span></h2>
            <div className="resource-row">
              <div className="resource-pill">
                <h4>🌿 Biotic</h4>
                <p>Obtained from the biosphere — includes flora, fauna, and fisheries.</p>
              </div>
              <div className="resource-pill">
                <h4>🪨 Abiotic</h4>
                <p>Obtained from non-living resources such as rocks and metals.</p>
              </div>
            </div>
          </div>

          {/* Types — Exhaustibility */}
          <div className="resource-block">
            <h2 className="section-title">2. On the Basis of <span className="accent">Exhaustibility</span></h2>
            <div className="resource-row">
              <div className="resource-pill">
                <h4>♻️ Renewable</h4>
                <p>Can replenish once exhausted. They are naturally restored over time.</p>
                <span className="example-tag">e.g. Solar energy, Wind energy</span>
              </div>
              <div className="resource-pill">
                <h4>⛽ Non-Renewable</h4>
                <p>Once completely consumed, they cannot replenish. Must be used with careful planning.</p>
                <span className="example-tag">e.g. Fossil fuels</span>
              </div>
            </div>
          </div>

          {/* Types — Ownership */}
          <div className="resource-block">
            <h2 className="section-title">3. On the Basis of <span className="accent">Ownership</span></h2>
            <div className="ownership-grid">
              {[
                { icon: "👤", title: "Individual", desc: "Owned privately by individuals.", eg: "Plantations, pasture lands" },
                { icon: "👥", title: "Community", desc: "Accessible to all community members.", eg: "Grazing grounds, burial grounds" },
                { icon: "🏛️", title: "National", desc: "Belong to the nation with legal autonomy. Govt. can acquire private property for public good.", eg: "Mines, forests" },
                { icon: "🌍", title: "International", desc: "Oceanic resources beyond 200 nautical miles of EEZ. No country can use without international permission.", eg: "Open ocean resources" },
              ].map((o, i) => (
                <div className="own-card" key={i}>
                  <div className="own-icon">{o.icon}</div>
                  <h4>{o.title}</h4>
                  <p>{o.desc}</p>
                  <div className="eg">e.g. {o.eg}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Types — Development Status */}
          <div className="resource-block">
            <h2 className="section-title">4. On the Basis of <span className="accent">Development Status</span></h2>
            <div className="dev-status-grid">
              {[
                { badge: "Potential", title: "Potential Resources", desc: "Found in a region but not yet fully utilised. e.g., Rajasthan & Gujarat have enormous wind/solar potential but haven't fully harnessed it." },
                { badge: "Developed", title: "Developed Resources", desc: "Quality and quantity determined for utilisation. Extent of use depends on technology and feasibility." },
                { badge: "Stock", title: "Stock", desc: "Available in nature but humans lack equipment/technology. e.g., Hydrogen from water — energy-rich but not scalable yet." },
                { badge: "Reserves", title: "Reserves", desc: "Technology exists but needs further development. e.g., Hydropower — being generated but limited in full exploitation." },
              ].map((d, i) => (
                <div className="dev-card" key={i}>
                  <div className="status-badge">{d.badge}</div>
                  <h4>{d.title}</h4>
                  <p>{d.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <hr className="divider" />

          {/* Development of Resources — Problems */}
          <div className="section-label">Human Impact</div>
          <h2 className="section-title">Development of Resources — <span className="accent">The Problems</span></h2>

          <div className="alert-banner">
            <h3>⚠️ Consequences of Over-Exploitation</h3>
            <ul>
              <li>Depletion of resources to satisfy the <strong>greed of a few individuals</strong></li>
              <li>Accumulation of resources in few hands — creating the divide between <strong>haves and have-nots</strong></li>
              <li>Indiscriminate exploitation leading to global ecological crises: <strong>global warming, ozone depletion, environmental pollution, and land degradation</strong></li>
            </ul>
          </div>

          {/* Sustainable Development */}
          <div className="section-label">The Solution</div>
          <h2 className="section-title">Sustainable <span className="accent">Development</span></h2>

          <div className="sustain-card">
            <h3>🌱 What is Sustainable Development?</h3>
            <p>Development that takes place <strong>without over-exploiting nature</strong> is termed as sustainable development.</p>
            <p>Its core principle: <strong>"Development in the present should not compromise the needs of future generations."</strong></p>
          </div>

          <div className="section-label">Key Event</div>
          <h2 className="section-title">Rio Earth Summit & <span className="accent">Agenda 21</span></h2>

          <div className="timeline">
            <div className="tl-item">
              <h4>📅 June 1992 — Rio de Janeiro Earth Summit</h4>
              <p>More than 100 heads of state gathered in Brazil for the first International Earth Summit, addressing urgent problems of environmental protection and socioeconomic development.</p>
            </div>
            <div className="tl-item">
              <h4>📜 Declaration Signed</h4>
              <p>Global leaders signed a declaration on <strong>Global Climatic Change and Biological Diversity</strong>. The Rio Convention endorsed the global Forest Principles.</p>
            </div>
            <div className="tl-item">
              <h4>📋 Agenda 21 Adopted</h4>
              <p>Aims to achieve global sustainable development by combating environmental damage, poverty, and disease through global co-operation on common interests and shared responsibilities.</p>
            </div>
            <div className="tl-item">
              <h4>🏘️ Local Agenda 21</h4>
              <p>A major objective: every local government must draw its own <strong>Local Agenda 21</strong> — bringing sustainability planning down to the grassroots level.</p>
            </div>
          </div>

          <hr className="divider" />

          {/* Resource Planning */}
          <div className="section-label">Planning</div>
          <h2 className="section-title">Resource Planning <span className="accent">in India</span></h2>

          <div className="info-box">
            <h4>Why is Resource Planning needed?</h4>
            <p>Resource distribution in India is highly uneven. Jharkhand, Chhattisgarh & MP are mineral-rich; Arunachal Pradesh has water but lacks infrastructure; Rajasthan has solar/wind energy but lacks water; Ladakh has cultural richness but is deficient in water and minerals.</p>
          </div>

          <div className="info-box">
            <h4>Step 1 — Identification & Inventory</h4>
            <p>Surveying, mapping, and qualitative/quantitative estimation of resources across all regions of the country.</p>
          </div>
          <div className="info-box">
            <h4>Step 2 — Planning Structure</h4>
            <p>Evolving a planning structure with appropriate technology, skills, and institutional setup for implementing resource development plans.</p>
          </div>
          <div className="info-box">
            <h4>Step 3 — Matching National Plans</h4>
            <p>Aligning resource development plans with overall national development plans to ensure cohesive progress.</p>
          </div>

          <hr className="divider" />

          {/* Land Resources */}
          <div className="section-label">Land</div>
          <h2 className="section-title">Land Resources & <span className="accent">Utilisation</span></h2>

          <div className="land-grid">
            {[
              { title: "🌲 Forests", desc: "Reserved and protected forest areas across the country." },
              { title: "🏜️ Barren & Waste Land", desc: "Rocky, arid, desert areas not suitable for cultivation." },
              { title: "🏙️ Non-Agricultural Use", desc: "Settlements, roads, railways, factories, and industries." },
              { title: "🌾 Permanent Pastures", desc: "Grazing land maintained permanently for livestock." },
              { title: "🌳 Tree Crop Groves", desc: "Land under miscellaneous tree crops not counted in net sown area." },
              { title: "🔄 Culturable Waste", desc: "Left uncultivated for more than 5 agricultural years." },
              { title: "📅 Current Fallow", desc: "Left without cultivation for one or less than one agricultural year." },
              { title: "📊 Net Sown Area", desc: "Area sown more than once in an agricultural year. Gross cropped area = Net sown area + area sown more than once." },
            ].map((l, i) => (
              <div className="land-item" key={i}>
                <h4>{l.title}</h4>
                <p>{l.desc}</p>
              </div>
            ))}
          </div>

          {/* Land Degradation */}
          <div className="section-label">Degradation & Conservation</div>
          <h2 className="section-title">Land Degradation & <span className="accent">Conservation</span></h2>

          <div className="alert-banner" style={{background:'linear-gradient(135deg,#fff1f2,#ffe4e6)',borderColor:'#fca5a5',marginBottom:'32px'}}>
            <h3 style={{color:'#7f1d1d'}}>🔴 Causes of Land Degradation</h3>
            <ul style={{color:'#991b1b'}}>
              <li><strong>Mining:</strong> Abandoned sites in Jharkhand, Chhattisgarh, MP, Odisha leave deep scars and overburdening</li>
              <li><strong>Overgrazing:</strong> Major cause in Gujarat, Rajasthan, MP, and Maharashtra</li>
              <li><strong>Over-irrigation:</strong> Causes waterlogging, increasing salinity & alkalinity in Punjab, Haryana, western UP</li>
              <li><strong>Mineral processing dust:</strong> (cement, ceramic industries) settles on land and retards water infiltration into soil</li>
            </ul>
          </div>

          <div className="sustain-card">
            <h3>✅ Conservation Methods</h3>
            <p>• <strong>Afforestation</strong> and proper grazing management to control degradation</p>
            <p>• <strong>Shelter belts</strong> of plants and thorny bushes stabilise sand dunes in arid areas</p>
            <p>• Proper management of waste lands and <strong>control of mining activities</strong></p>
            <p>• Treatment and proper disposal of <strong>industrial effluents and wastes</strong></p>
          </div>

          <hr className="divider" />

          {/* Soil Types */}
          <div className="soil-section">
            <div className="section-label">Soil</div>
            <h2 className="section-title">Types of <span className="accent">Soil in India</span></h2>

            <div className="soil-grid">
              {[
                {
                  num: "Soil Type 01",
                  title: "Alluvial Soil",
                  points: [
                    "Found in northern plains — deposited by Indus, Ganga, Brahmaputra river systems",
                    "Also found in Rajasthan, Gujarat, and eastern coastal deltas (Mahanadi, Godavari, Krishna, Kaveri)",
                    "Old alluvial = Bangar (kanker nodules); New alluvial = Khadar (more fertile)",
                    "Rich in potash, phosphoric acid & lime — ideal for sugarcane, paddy, wheat, cereal & pulse crops",
                  ],
                },
                {
                  num: "Soil Type 02",
                  title: "Black Soil (Regur)",
                  points: [
                    "Formed from lava flows — ideal for growing cotton (also called Black Cotton Soil)",
                    "Found in Deccan Trap region — Maharashtra, Saurashtra, Malwa, MP, Chhattisgarh",
                    "Clayey — retains moisture, rich in calcium carbonate, magnesium, potash & lime",
                    "Develops deep cracks in hot weather (promotes aeration), sticky when wet",
                  ],
                },
                {
                  num: "Soil Type 03",
                  title: "Red & Yellow Soil",
                  points: [
                    "Develops on crystalline igneous rocks in low-rainfall areas",
                    "Found in eastern & southern Deccan plateau, Odisha, Chhattisgarh, southern Ganga plain",
                    "Red colour due to iron content; turns yellow when hydrated",
                  ],
                },
                {
                  num: "Soil Type 04",
                  title: "Laterite Soil",
                  points: [
                    "Develops under tropical/subtropical climate with alternate wet & dry seasons",
                    "Acidic (pH < 6.0) — deficient in plant nutrients",
                    "Found in southern states, Western Ghats (Maharashtra), Odisha, West Bengal, Northeast regions",
                  ],
                },
                {
                  num: "Soil Type 05",
                  title: "Arid Soil",
                  points: [
                    "Ranges from red to brown in colour — sandy in texture, saline in nature",
                    "Lacks humus and moisture",
                    "Lower horizons occupied by Kanker (calcium content) — restricts water infiltration",
                  ],
                },
                {
                  num: "Soil Type 06",
                  title: "Forest Soil",
                  points: [
                    "Texture varies with mountain environment",
                    "Loamy and silty in valley sides",
                    "Coarse grained on upper slopes",
                  ],
                },
              ].map((s, i) => (
                <div className="soil-card" key={i}>
                  <div className="soil-number">{s.num}</div>
                  <h3>{s.title}</h3>
                  <ul>
                    {s.points.map((p, j) => <li key={j}>{p}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Soil Erosion */}
          <div className="section-label">Erosion</div>
          <h2 className="section-title">Soil Erosion & <span className="accent">Conservation</span></h2>

          <div className="erosion-grid">
            <div className="erosion-col causes">
              <h3>⚠️ Types of Soil Erosion</h3>
              <ul className="erosion-list" style={{padding:0}}>
                <li><strong>Gully Erosion:</strong> Running water cuts deep channels (gullies). Land becomes "bad land" / ravines (Chambal basin)</li>
                <li><strong>Sheet Erosion:</strong> Water flows as a sheet over slopes, washing away the entire top soil layer</li>
                <li><strong>Wind Erosion:</strong> Wind carries away the fertile top layer of soil</li>
              </ul>
            </div>
            <div className="erosion-col conservation">
              <h3>✅ Conservation Methods</h3>
              <ul className="erosion-list" style={{padding:0}}>
                <li><strong>Contour Ploughing:</strong> Ploughing along contour lines slows water flow down slopes</li>
                <li><strong>Terrace Cultivation:</strong> Steps cut into slopes create terraces that retain water</li>
                <li><strong>Strip Cropping:</strong> Strips of grass between crop strips break the force of wind</li>
                <li><strong>Shelter Belts:</strong> Rows of trees planted to block wind — stabilises sand dunes in western India</li>
              </ul>
            </div>
          </div>

          <hr className="divider" />

          {/* FAQ */}
          <div className="chapter1-faq-section">
            <div className="chapter1-faq-label">Practice Questions</div>
            <h2 className="chapter1-faq-title">Frequently Asked Questions</h2>

            {faqs.map((faq, i) => (
              <div className={`chapter1-faq-item${openIndex === i ? " open" : ""}`} key={i}>
                <button className="chapter1-faq-q" onClick={() => toggle(i)}>
                  <span className="chapter1-faq-q-text">Q{i + 1}. {faq.q}</span>
                  <span className="chapter1-faq-icon">+</span>
                </button>
                <div className={`chapter1-faq-ans${openIndex === i ? " visible" : ""}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}