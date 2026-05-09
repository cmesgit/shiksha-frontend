import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --ink:       #0f172a;
    --muted:     #64748b;
    --accent:    #a16207;
    --accent2:   #854d0e;
    --surface:   #fefce8;
    --card:      #ffffff;
    --border:    #fde047;
    --border-lt: #fef08a;
    --tag-bg:    #fefce8;
    --green:     #15803d;
    --green-bg:  #f0fdf4;
    --green-bd:  #86efac;
    --blue:      #0369a1;
    --blue-bg:   #f0f9ff;
    --blue-bd:   #bae6fd;
    --red:       #b91c1c;
    --red-bg:    #fff1f2;
    --red-bd:    #fca5a5;
    --orange:    #c2410c;
    --orange-bg: #fff7ed;
    --orange-bd: #fdba74;
  }

  .blog-root {
    font-family: 'Inter', sans-serif;
    background: #fdfdf5;
    color: var(--ink);
    min-height: 100vh;
  }

  /* ── Hero ── */
 .chapter4-hero {
  background: linear-gradient(135deg, #1a1200 0%, #3d2800 45%, #7a4f00 100%);
  padding: 80px 24px 96px;
  position: relative;
  overflow: hidden;
}

.chapter4-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 12% 65%, rgba(250, 204, 21, 0.1) 0%, transparent 55%),
    radial-gradient(circle at 85% 20%, rgba(161, 98, 7, 0.18) 0%, transparent 50%);
}

.chapter4-hero-inner {
  max-width: 820px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.chapter4-hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(250, 204, 21, 0.12);
  border: 1px solid rgba(250, 204, 21, 0.28);
  color: #fde047;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 100px;
  margin-bottom: 28px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.chapter4-hero-title {
  font-family: "Montserrat", sans-serif;
  font-size: clamp(36px, 6vw, 62px);
  font-weight: 900;
  line-height: 1.08;
  color: #ffffff;
  margin: 0 0 20px;
  letter-spacing: -0.02em;
}

.chapter4-hero-title span {
  color: #facc15;
}

.chapter4-hero-sub {
  font-family: "Poppins", sans-serif;
  font-size: 17px;
  font-weight: 500;
  color: #fef08a;
  line-height: 1.7;
  max-width: 620px;
  margin: 0 0 40px;
}

.chapter4-hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
}

.chapter4-meta-chip {
  color: #fde047;
  font-size: 14px;
  font-weight: 500;
}

.chapter4-meta-dot {
  width: 4px;
  height: 4px;
  background: #facc15;
  border-radius: 50%;
  display: inline-block;
}
  .meta-chip { color: #fde047; font-size: 14px; font-weight: 500; }
  .meta-dot  { width: 4px; height: 4px; background: #facc15; border-radius: 50%; display: inline-block; }

  /* ── Body ── */
  .body-wrap {
    max-width: 820px;
    margin: 0 auto;
    padding: 64px 24px 80px;
  }

  /* ── Intro card ── */
  .definition-card {
    background: linear-gradient(135deg, #1a1200, #3d2800);
    border-radius: 20px;
    padding: 40px 44px;
    margin-bottom: 64px;
    position: relative;
    overflow: hidden;
  }
  .definition-card::after {
    content: '🌾';
    position: absolute;
    top: 10px; right: 28px;
    font-size: 110px;
    opacity: 0.07;
    line-height: 1;
  }
  .definition-card p {
    font-family: 'Poppins', sans-serif;
    font-size: 19px;
    font-weight: 500;
    color: #fef08a;
    line-height: 1.75;
    margin: 0 0 16px;
    position: relative;
    z-index: 1;
  }
  .definition-card p:last-child { margin: 0; }
  .definition-card strong { color: #facc15; }

  /* ── Stat row ── */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 16px;
    margin-bottom: 56px;
  }
  .stat-box {
    background: linear-gradient(135deg, #3d2800, #7a4f00);
    border-radius: 16px;
    padding: 28px 22px;
    text-align: center;
  }
  .stat-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 28px;
    font-weight: 900;
    color: #facc15;
    margin-bottom: 6px;
  }
  .stat-label {
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #fef08a;
    line-height: 1.45;
  }

  /* ── Section labels & titles ── */
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
  .section-title .green  { color: var(--green); }
  .section-title .blue   { color: var(--blue); }

  /* ── Farming types ── */
  .farming-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 18px;
    margin-bottom: 64px;
  }
  .farming-card {
    background: var(--card);
    border: 1.5px solid var(--border-lt);
    border-radius: 16px;
    padding: 28px 26px;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .farming-card:hover {
    box-shadow: 0 8px 28px rgba(161,98,7,0.1);
    transform: translateY(-2px);
  }
  .farming-icon { font-size: 32px; margin-bottom: 14px; }
  .farming-num {
    font-family: 'Montserrat', sans-serif;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: var(--muted);
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .farming-card h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--accent2);
    margin: 0 0 12px;
  }
  .farming-card ul {
    padding-left: 18px;
    margin: 0;
  }
  .farming-card ul li {
    font-size: 15px;
    line-height: 1.7;
    color: #374151;
    margin-bottom: 6px;
  }
  .farming-card ul li:last-child { margin: 0; }

  /* ── Cropping season cards ── */
  .season-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 18px;
    margin-bottom: 56px;
  }
  .season-card {
    border-radius: 18px;
    padding: 30px 26px;
    border: 1.5px solid;
  }
  .season-card.rabi   { background: #f0f9ff; border-color: #bae6fd; }
  .season-card.kharif { background: #f0fdf4; border-color: #86efac; }
  .season-card.zaid   { background: #fff7ed; border-color: #fdba74; }
  .season-badge {
    display: inline-block;
    font-family: 'Poppins', sans-serif;
    font-size: 11px;
    font-weight: 700;
    padding: 4px 14px;
    border-radius: 100px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 14px;
  }
  .season-card.rabi   .season-badge { background: #bae6fd; color: #0369a1; }
  .season-card.kharif .season-badge { background: #86efac; color: #15803d; }
  .season-card.zaid   .season-badge { background: #fdba74; color: #c2410c; }
  .season-card h3 {
    font-family: 'Poppins', sans-serif;
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 6px;
  }
  .season-card.rabi   h3 { color: #0369a1; }
  .season-card.kharif h3 { color: #15803d; }
  .season-card.zaid   h3 { color: #c2410c; }
  .season-period {
    font-family: 'Poppins', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: var(--muted);
    margin-bottom: 14px;
  }
  .season-card p {
    font-size: 15px;
    line-height: 1.7;
    color: #374151;
    margin: 0 0 10px;
  }
  .season-card p:last-child { margin: 0; }
  .crop-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
  }
  .crop-tag {
    font-size: 12px;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 100px;
  }
  .season-card.rabi   .crop-tag { background: #e0f2fe; color: #075985; }
  .season-card.kharif .crop-tag { background: #dcfce7; color: #166534; }
  .season-card.zaid   .crop-tag { background: #ffedd5; color: #9a3412; }

  /* ── Major Crops ── */
  .crops-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 18px;
    margin-bottom: 56px;
  }
  .crop-card {
    background: var(--card);
    border: 1.5px solid var(--border-lt);
    border-radius: 16px;
    padding: 26px 24px;
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .crop-card:hover {
    box-shadow: 0 6px 24px rgba(161,98,7,0.1);
    transform: translateY(-2px);
  }
  .crop-emoji { font-size: 30px; margin-bottom: 12px; }
  .crop-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: var(--ink);
    margin: 0 0 12px;
  }
  .crop-card ul {
    padding-left: 18px;
    margin: 0;
  }
  .crop-card ul li {
    font-size: 15px;
    line-height: 1.7;
    color: #374151;
    margin-bottom: 5px;
  }
  .crop-card ul li:last-child { margin: 0; }

  /* ── Info box ── */
  .info-box {
    background: var(--card);
    border-left: 4px solid var(--accent);
    border-radius: 0 12px 12px 0;
    padding: 22px 26px;
    margin-bottom: 20px;
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

  /* ── Reforms timeline ── */
  .timeline {
    position: relative;
    padding-left: 28px;
    margin-bottom: 56px;
  }
  .timeline::before {
    content: '';
    position: absolute;
    left: 6px; top: 8px; bottom: 8px;
    width: 2px;
    background: linear-gradient(to bottom, var(--accent), var(--border-lt));
    border-radius: 2px;
  }
  .tl-item {
    position: relative;
    margin-bottom: 28px;
  }
  .tl-item::before {
    content: '';
    position: absolute;
    left: -26px; top: 6px;
    width: 12px; height: 12px;
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

  /* ── Food Security ── */
  .food-sec-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    margin-bottom: 48px;
  }
  .food-card {
    background: var(--green-bg);
    border: 1.5px solid var(--green-bd);
    border-radius: 16px;
    padding: 26px 22px;
  }
  .food-card .food-icon { font-size: 28px; margin-bottom: 12px; }
  .food-card h4 {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--green);
    margin: 0 0 10px;
  }
  .food-card p {
    font-size: 15px;
    line-height: 1.7;
    color: #374151;
    margin: 0;
  }

  /* ── Globalization alert ── */
  .glob-card {
    background: linear-gradient(135deg, var(--blue-bg), #dbeafe);
    border: 1.5px solid var(--blue-bd);
    border-radius: 20px;
    padding: 36px 40px;
    margin-bottom: 56px;
  }
  .glob-card h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: var(--blue);
    margin: 0 0 16px;
  }
  .glob-card ul { margin: 0; padding-left: 20px; }
  .glob-card ul li {
    font-size: 16px;
    line-height: 1.75;
    color: #1e3a5f;
    margin-bottom: 8px;
  }
  .glob-card ul li strong { color: #0369a1; }

  /* ── Divider ── */
  .divider {
    border: none;
    border-top: 2px solid var(--border-lt);
    margin: 56px 0;
  }

  /* ── FAQ ── */
  .faq-label {
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  .faq-title {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(26px, 4vw, 36px);
    font-weight: 800;
    color: var(--ink);
    margin: 0 0 40px;
    letter-spacing: -0.01em;
  }
  .faq-item {
    border: 1.5px solid var(--border-lt);
    border-radius: 16px;
    margin-bottom: 14px;
    overflow: hidden;
    background: var(--card);
    transition: box-shadow 0.2s;
  }
  .faq-item.open {
    box-shadow: 0 4px 20px rgba(161,98,7,0.1);
    border-color: var(--accent);
  }
  .faq-q {
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
  .faq-q-text {
    font-family: 'Poppins', sans-serif;
    font-size: 17px;
    font-weight: 600;
    color: var(--ink);
    line-height: 1.5;
    text-align: left;
  }
  .faq-item.open .faq-q-text { color: var(--accent2); }
  .faq-icon {
    width: 28px; height: 28px;
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
  .faq-item.open .faq-icon { transform: rotate(45deg); background: var(--accent); color: #fff; }
  .faq-ans {
    display: none;
    padding: 0 26px 24px;
    font-size: 16px;
    line-height: 1.8;
    color: #374151;
  }
  .faq-ans.visible { display: block; }
  .faq-ans ul { padding-left: 20px; margin: 8px 0; }
  .faq-ans ul li { margin-bottom: 6px; }
  .faq-ans strong { color: var(--ink); font-family: 'Poppins', sans-serif; }
  .faq-ans p { margin: 0 0 10px; }
  .faq-ans p:last-child { margin: 0; }

  @media (max-width: 600px) {
    .definition-card { padding: 28px 24px; }
    .farming-grid, .season-grid, .crops-grid, .food-sec-grid { grid-template-columns: 1fr; }
    .glob-card { padding: 28px 24px; }
  }
`;

const faqs = [
  {
    q: "What are the various types of primitive subsistence farming?",
    a: (<>
      <p>Also called <strong>slash and burn agriculture</strong>, this type of farming involves clearing a patch of land, growing food crops until soil fertility decreases, then moving to a new patch — allowing the previous one to recover. It uses primitive tools (hoe, dao, digging sticks), relies on family and community labour, and depends heavily on nature.</p>
      <p>Regional names include:</p>
      <ul>
        <li><strong>Jhum</strong> — Assam, Meghalaya, Nagaland, Mizoram</li>
        <li><strong>Khil</strong> — Himalayan region</li>
        <li><strong>Kumari</strong> — Western Ghats</li>
        <li><strong>Bewar</strong> — Madhya Pradesh</li>
      </ul>
    </>),
  },
  {
    q: "What are the various cropping patterns in India? Write briefly about them.",
    a: (<>
      <p><strong>Rabi:</strong> Sown October–December, harvested April–June. Major crops: wheat, barley, peas, gram, mustard. Key states: Punjab, Haryana, HP, J&K, Uttarakhand, UP.</p>
      <p><strong>Kharif:</strong> Grown with monsoon onset, harvested September–October. Major crops: paddy, maize, jowar, bajra, cotton, jute, groundnut, soyabean. Key states: Assam, West Bengal, Odisha, AP, Tamil Nadu, Kerala, Maharashtra.</p>
      <p><strong>Zaid:</strong> Short summer season between Rabi and Kharif. Major crops: watermelon, muskmelon, cucumber, vegetables, and fodder crops.</p>
    </>),
  },
  {
    q: "What are the requirements to grow sugarcane? What are the regions where it is grown?",
    a: (<>
      <p>Sugarcane is a <strong>tropical and subtropical crop</strong> requiring:</p>
      <ul>
        <li>Hot and humid climate with temperature <strong>21°C to 27°C</strong></li>
        <li>Annual rainfall between <strong>75 cm and 100 cm</strong></li>
      </ul>
      <p>India is the <strong>second-largest producer of sugarcane after Brazil</strong>. Major producing states: Uttar Pradesh, Maharashtra, Karnataka, Tamil Nadu, Andhra Pradesh, Telangana, Bihar, Punjab, and Haryana.</p>
    </>),
  },
  {
    q: "Write a note on rice cultivation in the country.",
    a: (<>
      <p>Rice is India's staple food, especially in southern India. Key facts:</p>
      <ul>
        <li>India is the <strong>second-largest producer of rice</strong> after China</li>
        <li>A <strong>Kharif crop</strong> requiring temperature above 25°C, high humidity, and annual rainfall above 100 cm</li>
        <li>Major production areas: north and northeast plains, coastal and deltaic regions</li>
        <li>Three paddy crops in a year: <strong>Aman, Aus, and Boro</strong></li>
        <li>Major producing states: Uttar Pradesh, Punjab, Haryana, and Rajasthan</li>
      </ul>
    </>),
  },
  {
    q: "Write a short note on oilseeds.",
    a: (<>
      <p>India was the <strong>second-largest producer of groundnut</strong> after China in 2008. About <strong>12% of total cropped area</strong> is used for oil crops.</p>
      <p>Major oilseeds: groundnut, mustard, coconut, sesamum (til), soyabean, castor seeds, cotton seeds, linseed, sunflower.</p>
      <ul>
        <li><strong>Groundnut</strong> — Kharif crop; largest producer: Gujarat, followed by AP and Tamil Nadu</li>
        <li><strong>Linseed & mustard</strong> — Rabi crops</li>
        <li><strong>Sesamum</strong> — Kharif in north, Rabi in south</li>
        <li><strong>Castor seed</strong> — grown as both Rabi and Kharif</li>
      </ul>
    </>),
  },
  {
    q: "Write about the various horticulture crops and their region of growth.",
    a: (<>
      <p>India was the <strong>second-largest producer of fruits and vegetables</strong> after China in 2008, producing <strong>13% of the world's vegetables</strong>. Key crops by region:</p>
      <ul>
        <li><strong>Mangoes</strong> — Maharashtra, AP, Telangana, UP, West Bengal</li>
        <li><strong>Oranges</strong> — Nagpur and Cherrapunjee (Meghalaya)</li>
        <li><strong>Bananas</strong> — Kerala, Mizoram, Maharashtra, Tamil Nadu</li>
        <li><strong>Litchi & Guava</strong> — UP and Bihar</li>
        <li><strong>Pineapples</strong> — Meghalaya</li>
        <li><strong>Grapes</strong> — AP, Telangana, Maharashtra</li>
        <li><strong>Apples, pears, apricots, walnuts</strong> — J&K and Himachal Pradesh</li>
      </ul>
    </>),
  },
  {
    q: "What is Bhoodan and Gramdan?",
    a: (<>
      <p><strong>Bhoodan</strong> — Initiated by Vinoba Bhave (former Satyagrahi) in Pochampalli, Andhra Pradesh. When seeking government help for landless farmers, Shri Ram Charan Reddy spontaneously donated around <strong>80 acres of land</strong> to the landless — this generous act became known as 'Bhoodan' (land gift).</p>
      <p><strong>Gramdan</strong> — Inspired by Bhoodan, various zamindars and landlords voluntarily distributed some of their land among the poor. This collective practice of land donation within a village became known as 'Gramdan' (village gift).</p>
    </>),
  },
  {
    q: "What is the contribution of agriculture to the national economy, employment and national output?",
    a: (<>
      <p>Agriculture is the backbone of India's economy:</p>
      <ul>
        <li>In 2010–11, about <strong>52% of India's total workforce</strong> was employed in the farming sector</li>
        <li>More than half the Indian population depends on agriculture for their sustenance</li>
        <li>Institutions established to improve agriculture: <strong>ICAR (Indian Council of Agricultural Research)</strong>, agricultural universities, veterinary services, animal breeding centres, horticulture development, and meteorology research</li>
      </ul>
    </>),
  },
  {
    q: "Write a note on the Food Security System.",
    a: (<>
      <p>Food security means ensuring all people have access to adequate food. Remote and disaster-prone areas face the greatest risk of food insecurity. The government uses two key mechanisms:</p>
      <ul>
        <li><strong>Buffer Stock:</strong> Food grains stored by the government as a reserve</li>
        <li><strong>Public Distribution System (PDS):</strong> Provides food grains and necessities at subsidised prices to the poor</li>
      </ul>
      <p><strong>Food Corporation of India (FCI)</strong> procures grains from farmers at the <strong>Minimum Support Price (MSP)</strong> and distributes them to the poor through PDS at subsidised rates.</p>
    </>),
  },
  {
    q: "What is the impact of globalization on agriculture?",
    a: (<>
      <p>After 1990, Indian farmers faced new challenges in the international market. Despite being major producers of rice, cotton, rubber, tea, coffee, jute, and spices, Indian agricultural products <strong>struggle to compete</strong> with developed countries due to their heavily subsidised agriculture systems.</p>
      <p>Key responses:</p>
      <ul>
        <li><strong>Genetic engineering</strong> — developing new hybrid seed varieties to increase yields and profitability</li>
        <li><strong>Organic farming</strong> — growing rapidly as it avoids factory-made chemicals (fertilizers and pesticides), promoting sustainable, chemical-free agriculture</li>
      </ul>
    </>),
  },
];

export default function Agriculture() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="blog-root">

        {/* HERO */}
        <div className="chapter4-hero">
  <div className="chapter4-hero-inner">
    <div className="chapter4-hero-tag">📚 Class 10 · Social Science · Geography</div>
    <h1 className="chapter4-hero-title"><span>Agriculture</span></h1>
    <p className="chapter4-hero-sub">
      Chapter 4 — Complete revision notes covering types of farming, cropping seasons, major crops, food security, technological reforms, and the impact of globalisation on Indian agriculture.
    </p>
    <div className="chapter4-hero-meta">
      <span className="chapter4-meta-chip">🌾 Geography</span>
      <span className="chapter4-meta-dot" />
      <span className="chapter4-meta-chip">📖 Revision Notes</span>
      <span className="chapter4-meta-dot" />
      <span className="chapter4-meta-chip">❓ 10 FAQs Included</span>
    </div>
  </div>
</div>
        <div className="body-wrap">

          {/* Intro */}
          <div className="definition-card">
            <p>Agriculture is India's <strong>age-old economic backbone</strong> — about <strong>two-thirds of our population</strong> is engaged in it. It not only feeds the nation but also supplies <strong>raw materials to many industries</strong>.</p>
            <p>Farming in India ranges from primitive subsistence methods to modern commercial agriculture — shaped by geography, climate, and technology.</p>
          </div>

          {/* Key stats */}
          <div className="stats-row">
            <div className="stat-box"><div className="stat-num">⅔</div><div className="stat-label">of India's population engaged in agriculture</div></div>
            <div className="stat-box"><div className="stat-num">52%</div><div className="stat-label">of total workforce employed in farming (2010–11)</div></div>
            <div className="stat-box"><div className="stat-num">12%</div><div className="stat-label">of total cropped area used for oilseed cultivation</div></div>
            <div className="stat-box"><div className="stat-num">13%</div><div className="stat-label">of world's vegetables produced by India</div></div>
          </div>

          <hr className="divider" />

          {/* Farming Types */}
          <div className="section-label">Types of Farming</div>
          <h2 className="section-title">Farming <span className="accent">Systems in India</span></h2>

          <div className="farming-grid">
            {[
              {
                icon: "🪓", num: "Type 01", title: "Primitive Subsistence Farming",
                points: [
                  "Also called slash and burn agriculture (Jhum)",
                  "Practiced on small patches using hoe, dao, digging sticks",
                  "Relies on family/community labour and monsoon",
                  "Land cleared → crops grown → fertility decreases → shift to new patch",
                  "No modern equipment or advanced techniques",
                  "Regional names: Khil (Himalayas), Kumari (Western Ghats), Bewar (MP)",
                ],
              },
              {
                icon: "💧", num: "Type 02", title: "Intensive Subsistence Farming",
                points: [
                  "Practiced in areas with high pressure on land",
                  "Uses biochemical inputs and modern irrigation techniques",
                  "Aims to produce maximum output from limited land",
                  "Common in densely populated agricultural regions",
                ],
              },
              {
                icon: "🚜", num: "Type 03", title: "Commercial Farming",
                points: [
                  "Uses high-yielding variety (HYV) seeds, fertilizers, insecticides, pesticides",
                  "Rice is a commercial crop in Haryana",
                  "Plantation farming: single crop over large area",
                  "Important plantation crops: tea, coffee, rubber, sugarcane, banana",
                  "Tea in Assam & North Bengal; coffee in Karnataka",
                ],
              },
            ].map((f, i) => (
              <div className="farming-card" key={i}>
                <div className="farming-icon">{f.icon}</div>
                <div className="farming-num">{f.num}</div>
                <h3>{f.title}</h3>
                <ul>{f.points.map((p, j) => <li key={j}>{p}</li>)}</ul>
              </div>
            ))}
          </div>

          <hr className="divider" />

          {/* Cropping Seasons */}
          <div className="section-label">Cropping Patterns</div>
          <h2 className="section-title">Three <span className="accent">Cropping Seasons</span></h2>

          <div className="season-grid">
            <div className="season-card rabi">
              <div className="season-badge">Rabi</div>
              <h3>Rabi Season</h3>
              <div className="season-period">🗓️ Sown: Oct–Dec · Harvested: Apr–Jun</div>
              <p>Winter crops grown across north and northwestern India.</p>
              <div className="crop-tags">
                {["Wheat","Barley","Peas","Gram","Mustard"].map(c => <span className="crop-tag" key={c}>{c}</span>)}
              </div>
              <p style={{marginTop:'12px', fontSize:'14px', color:'#475569'}}>Key states: Punjab, Haryana, HP, J&K, Uttarakhand, Uttar Pradesh</p>
            </div>

            <div className="season-card kharif">
              <div className="season-badge">Kharif</div>
              <h3>Kharif Season</h3>
              <div className="season-period">🗓️ Sown: Monsoon onset · Harvested: Sep–Oct</div>
              <p>Monsoon crops — the most diverse and widespread season.</p>
              <div className="crop-tags">
                {["Paddy","Maize","Cotton","Jute","Groundnut","Soyabean","Jowar","Bajra"].map(c => <span className="crop-tag" key={c}>{c}</span>)}
              </div>
              <p style={{marginTop:'12px', fontSize:'14px', color:'#475569'}}>Key states: Assam, West Bengal, Odisha, AP, Tamil Nadu, Kerala, Maharashtra</p>
            </div>

            <div className="season-card zaid">
              <div className="season-badge">Zaid</div>
              <h3>Zaid Season</h3>
              <div className="season-period">🗓️ Short summer season between Rabi & Kharif</div>
              <p>Quick-growing crops cultivated in the brief summer window.</p>
              <div className="crop-tags">
                {["Watermelon","Muskmelon","Cucumber","Vegetables","Fodder"].map(c => <span className="crop-tag" key={c}>{c}</span>)}
              </div>
            </div>
          </div>

          <hr className="divider" />

          {/* Major Crops */}
          <div className="section-label">Major Crops</div>
          <h2 className="section-title">Food <span className="accent">Crops of India</span></h2>

          <div className="crops-grid">
            {[
              {
                emoji:"🌾", title:"Rice",
                points:[
                  "India is 2nd largest producer after China",
                  "Kharif crop — needs temp above 25°C, humidity, and rainfall above 100 cm",
                  "Major regions: north/northeast plains, coastal & deltaic areas",
                  "Three paddy crops: Aman, Aus and Boro",
                ],
              },
              {
                emoji:"🌿", title:"Wheat",
                points:[
                  "Requires 50–75 cm annual rainfall",
                  "Two key zones: Ganga-Satluj plains (NW) and black soil region of Deccan",
                  "Major states: Punjab, Haryana, UP, Bihar, Rajasthan, MP",
                ],
              },
              {
                emoji:"🌽", title:"Millets (Jowar, Bajra, Ragi)",
                points:[
                  "Jowar — rain-fed; Maharashtra, Karnataka, AP, MP",
                  "Bajra — sandy and shallow black soil; Rajasthan, UP, Maharashtra, Gujarat, Haryana",
                  "Ragi — dry red/black/sandy soils; Karnataka, Tamil Nadu, HP, Uttarakhand, Sikkim",
                ],
              },
              {
                emoji:"🌽", title:"Maize",
                points:[
                  "Kharif crop — temperature 21°C to 27°C",
                  "Grows well in old alluvial soil",
                  "Major states: Karnataka, UP, Bihar, AP, Telangana, MP",
                ],
              },
              {
                emoji:"🫘", title:"Pulses",
                points:[
                  "Major pulses: tur (arhar), urad, moong, masur, peas",
                  "Leguminous — fix nitrogen and restore soil fertility",
                  "Grown in rotation with cereal crops",
                  "Key states: MP, UP, Rajasthan, Maharashtra, Karnataka",
                ],
              },
              {
                emoji:"🎋", title:"Sugarcane",
                points:[
                  "Tropical & subtropical crop — 21°C to 27°C",
                  "Rainfall: 75–100 cm",
                  "India is 2nd largest producer after Brazil",
                  "Key states: UP, Maharashtra, Karnataka, Tamil Nadu, AP, Telangana",
                ],
              },
            ].map((c, i) => (
              <div className="crop-card" key={i}>
                <div className="crop-emoji">{c.emoji}</div>
                <h4>{c.title}</h4>
                <ul>{c.points.map((p, j) => <li key={j}>{p}</li>)}</ul>
              </div>
            ))}
          </div>

          {/* Non-food / Cash Crops */}
          <div className="section-label">Cash & Non-Food Crops</div>
          <h2 className="section-title">Oilseeds, Fibre & <span className="accent">Plantation Crops</span></h2>

          <div className="info-box" style={{borderLeftColor:'#a16207', marginBottom:'16px'}}>
            <h4>🫒 Oilseeds</h4>
            <p>India was 2nd largest groundnut producer (after China) in 2008. Oilseeds use 12% of total cropped area. Crops include: groundnut (Kharif), mustard & linseed (Rabi), sesamum (til), soyabean, coconut, castor seeds, sunflower. Gujarat is the largest groundnut producer.</p>
          </div>
          <div className="info-box" style={{borderLeftColor:'#a16207', marginBottom:'16px'}}>
            <h4>🍵 Tea</h4>
            <p>Labour-intensive crop. India was 3rd largest producer (after China and Turkey) in 2008. Key states: Assam, Darjeeling & Jalpaiguri (WB), Tamil Nadu, Kerala, Himachal Pradesh, Uttarakhand, Meghalaya, Andhra Pradesh, Tripura.</p>
          </div>
          <div className="info-box" style={{borderLeftColor:'#a16207', marginBottom:'16px'}}>
            <h4>☕ Coffee</h4>
            <p>India produced 3.2% of world coffee in 2008. Cultivated in the Nilgiris, Karnataka, Kerala, and Tamil Nadu.</p>
          </div>
          <div className="info-box" style={{borderLeftColor:'#a16207', marginBottom:'16px'}}>
            <h4>🌴 Rubber</h4>
            <p>Needs moist/humid climate with 200+ cm rainfall and temperature above 25°C. Grown in Kerala, Tamil Nadu, Karnataka, Andaman & Nicobar Islands, and Garo Hills (Meghalaya). India ranked 4th among natural rubber producers.</p>
          </div>
          <div className="info-box" style={{borderLeftColor:'#a16207', marginBottom:'16px'}}>
            <h4>🌸 Cotton</h4>
            <p>Kharif crop — 6 to 8 months to mature. India was 2nd largest producer after China in 2008. Requires elevated temperature, light rainfall, 210 frost-free days, and bright sunshine. Grown on black cotton soil of Deccan plateau. Major states: Maharashtra, Gujarat, MP, Karnataka, AP, Telangana.</p>
          </div>
          <div className="info-box" style={{borderLeftColor:'#a16207', marginBottom:'48px'}}>
            <h4>🪢 Jute — "The Golden Fibre"</h4>
            <p>Requires elevated temperature. Major producing states: West Bengal, Bihar, Assam, Odisha, and Meghalaya. Silk (sericulture — rearing silkworms on mulberry leaves) is another important fibre crop.</p>
          </div>

          <hr className="divider" />

          {/* Reforms */}
          <div className="section-label">Policy & Reform</div>
          <h2 className="section-title">Technological & Institutional <span className="accent">Reforms</span></h2>

          <div className="timeline">
            {[
              { title:"First Five Year Plan — Land Reform", desc:"The primary focus was land reform — redistributing land to ensure equitable ownership and improve productivity." },
              { title:"1960s & 1970s — Agricultural Reforms", desc:"Government introduced major agricultural reforms including the Green Revolution (high-yield grains) and White Revolution / Operation Flood (dairy development)." },
              { title:"1980s & 1990s — Comprehensive Land Development", desc:"A comprehensive land development programme was initiated with both institutional and technical reforms." },
              { title:"Crop Insurance & Grameen Banks", desc:"Provision for crop insurance against drought, flood, cyclone, fire, and disease. Establishment of Grameen Banks and cooperative societies for low-interest loans to farmers." },
              { title:"Kissan Credit Card (KCC) & PAIS", desc:"Kissan Credit Card and Personal Accident Insurance Scheme introduced specifically for farmer welfare and financial security." },
              { title:"Minimum Support Price (MSP)", desc:"Government announces MSP, remunerative and procurement prices for important crops — helping increase farmer profits and encouraging cultivation." },
            ].map((t, i) => (
              <div className="tl-item" key={i}>
                <h4>{t.title}</h4>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>

          <hr className="divider" />

          {/* Food Security */}
          <div className="section-label">Food Access</div>
          <h2 className="section-title">Food <span className="green">Security System</span></h2>

          <div className="food-sec-grid">
            {[
              { icon:"🏚️", title:"The Problem", desc:"Remote and disaster-prone areas are most vulnerable to food insecurity. Any population segment without food access suffers from food insecurity." },
              { icon:"📦", title:"Buffer Stock", desc:"Government maintains emergency reserves of food grains to manage supply during shortfalls, droughts, and natural disasters." },
              { icon:"🏪", title:"Public Distribution System (PDS)", desc:"Provides food grains and other necessities at subsidised prices to the poor through a nationwide network of fair price shops." },
              { icon:"🏛️", title:"Food Corporation of India (FCI)", desc:"Responsible for procuring food grains from farmers at MSP and stocking them. FCI ensures distribution through the PDS network at subsidised prices." },
            ].map((f, i) => (
              <div className="food-card" key={i}>
                <div className="food-icon">{f.icon}</div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Globalisation */}
          <div className="section-label">Global Context</div>
          <h2 className="section-title">Impact of <span className="blue">Globalisation</span></h2>

          <div className="glob-card">
            <h3>🌐 Agriculture After 1990</h3>
            <ul>
              <li>Indian farmers face new challenges in international markets after globalisation opened up competition</li>
              <li>Despite being major producers of rice, cotton, rubber, tea, coffee, jute, and spices, Indian products <strong>struggle to compete</strong> because of heavily subsidised agriculture in developed countries</li>
              <li><strong>Genetic engineering</strong> is being used to develop new hybrid seed varieties — increasing yields and making farming more profitable</li>
              <li><strong>Organic farming</strong> is growing in popularity — practiced without factory-made chemicals like fertilizers and pesticides, promoting sustainable agriculture</li>
            </ul>
          </div>

          <hr className="divider" />

          {/* FAQ */}
          <div className="faq-label">Practice Questions</div>
          <h2 className="faq-title">Frequently Asked Questions</h2>

          {faqs.map((faq, i) => (
            <div className={`faq-item${openIndex === i ? " open" : ""}`} key={i}>
              <button className="faq-q" onClick={() => toggle(i)}>
                <span className="faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="faq-icon">+</span>
              </button>
              <div className={`faq-ans${openIndex === i ? " visible" : ""}`}>{faq.a}</div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
