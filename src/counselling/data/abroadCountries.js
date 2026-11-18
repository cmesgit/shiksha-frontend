// PLACEMENT: src/counselling/data/abroadCountries.js
//
// Country-guide content for Admission Abroad → Countries.
//
// ── Provenance ───────────────────────────────────────────────────────
// 47 entries were transcribed from the Country guides board plus card text
// supplied in chat on 2026-11-17. The remaining 9 were EXTRACTED on
// 2026-11-18 from `abroad3.docx` PHASE 13 ("COUNTRY-WISE EDUCATION GUIDE"),
// which is in the repo's own source bundle — the design project's
// `guidesAbroad.js` was never needed.
//
// Extractor validated before use: re-deriving the 47 already here reproduced
// 40 blurbs VERBATIM. Of the rest, 4 (Switzerland, Spain, Italy, Greece)
// differ only in how a trailing list is joined and the hand-checked text was
// kept, and 3 are name variants ("the UK"/"the USA"/"the UAE", as the source
// phrases them inside "Why study in X?"). Nothing already here was rewritten.
//
// ── Three defects in the source the extractor had to survive ─────────
//   * TWO Q&A shapes: most countries run question and answer together in one
//     paragraph ("1. Why study in the UK?The UK offers..."), Germany alone
//     uses headings with separate paragraphs.
//   * Six blocks are headed "PHASE 13.11 — NETHERLANDS" where the rest are
//     "13.1 UNITED KINGDOM".
//   * 🔴 AUSTRALIA'S BLOCK HAS NO HEADING AT ALL — it begins straight at
//     "A. Country Overview". Segmenting on 13.N therefore loses it silently.
//     Segment on "A. Country Overview" and read the country's name out of
//     its own "Why study in X?" question instead.
//
// 🔴 CANADA and GREECE are each written TWICE in the source, with different
// text (13.5 twice; 13.26 and 13.30). The LATER block wins — the Canada
// blurb already shipped here matches the second one, so that is the
// established precedent, not a new judgement.
//
// ── The count is now the board's 56, and it is DERIVED ───────────────
// 58 blocks minus those 2 duplicates = 56 unique countries, which is exactly
// the "56 destinations" the board prints. The screen still renders
// ABROAD_COUNTRIES.length rather than a literal 56, so it cannot overclaim
// if an entry is ever removed.
//
// The 9 added are Israel (Middle East), South Africa / Mauritius / Egypt
// (Africa) and Mexico / Costa Rica / Brazil / Argentina / Chile (Latin
// America) — the Africa and Latin America chips previously filtered to an
// empty set.
//
// Six of those nine DO carry QS-ranked universities and their rank lines
// derive live from `abroad100.js`: South Africa 2, Egypt 2, Mexico 2,
// Brazil 2, Argentina 1, Chile 1. Israel, Mauritius and Costa Rica have
// none and render the literal "Country guide", as the board already does
// for Iceland, Malta and Croatia. Nothing here stores a count.
//
// ── The rank line is DERIVED, never stored ───────────────────────────
// Each card shows "N QS-ranked universit(y|ies)", or the literal
// "Country guide" where a country has none. That N is counted live from
// `abroad100.js` via `qsKey`, so the Countries tab and the Universities tab
// can never disagree. `qsKey` exists because two names differ between the
// two sources: abroad100 says "Czech Republic" and "China (Mainland)".
// Every derived count was checked against the board and all 34 agree.

export const COUNTRY_REGIONS = [
  "All regions",
  "North America",
  "Europe",
  "Asia",
  "Oceania",
  "Middle East",
  "Africa",
  "Latin America",
];

// `intakes` is the board's "Intakes:" line, verbatim, or "" where the card
// carries none. Several run long and the design clamps them — do not shorten
// the data to fit the box.
export const ABROAD_COUNTRIES = [
  { name: "United Kingdom", flag: "🇬🇧", region: "Europe",
    blurb: "The UK offers internationally recognised higher education, a wide range of courses and strong research and industry links.",
    intakes: "The main intake is generally September/October, with some programmes offering January or other intakes." },
  { name: "United States", flag: "🇺🇸", region: "North America",
    blurb: "The USA offers a very large and diverse higher-education system, with thousands of accredited institutions and programmes across almost every field.",
    intakes: "The main intake is generally September, with many institutions also offering January and some offering May/summer intakes." },
  { name: "Canada", flag: "🇨🇦", region: "North America",
    blurb: "Canada offers internationally recognised education, a wide range of programmes and opportunities for practical learning, co-op and internships.",
    intakes: "" },
  { name: "Australia", flag: "🇦🇺", region: "Oceania",
    blurb: "Australia offers a wide range of higher-education and vocational programmes for international students, with options across Engineering, IT, Business, Health, Science, Design, Arts, Education, Law, Hospitality and many other areas. Australian qualifications can provide pathways to further study and professional development.",
    intakes: "The main academic intake is commonly around February/March, while many institutions also offer a mid-year intake around July. Some courses have additional intakes, so you should check the exact course and university rather than assume every programme follows the same calendar." },
  { name: "New Zealand", flag: "🇳🇿", region: "Oceania",
    blurb: "New Zealand offers internationally recognised higher education with options ranging from bachelor's degrees to master's and PhD programmes. Students can study at universities, institutes of technology/polytechnics and private training establishments. The country also offers practical, career-focused education alongside academic and research programmes.",
    intakes: "New Zealand institutions commonly have intakes around: February/March; July" },
  { name: "Ireland", flag: "🇮🇪", region: "Europe",
    blurb: "Ireland offers internationally recognised higher education with a strong focus on academic quality, innovation, research and industry connections. It is an English-speaking study destination and offers undergraduate, postgraduate and doctoral programmes across many fields.",
    intakes: "The main university intake is generally: September" },
  { name: "Germany", flag: "🇩🇪", region: "Europe",
    blurb: "Germany is one of Europe's major higher-education destinations and offers a wide range of programmes at universities and other higher-education institutions. It is particularly strong in engineering, technology, natural sciences, business, research and applied fields.",
    intakes: "The major intakes are: Winter semester — usually starts around September/October; Summer semester — usually starts around March/April" },
  { name: "France", flag: "🇫🇷", region: "Europe",
    blurb: "France offers a wide range of higher-education programmes through universities, grandes écoles, specialised schools and other institutions. It is particularly strong in areas such as business, engineering, science, fashion, design, arts, hospitality, medicine and research.",
    intakes: "The main academic intake is generally: September/October" },
  { name: "Netherlands", flag: "🇳🇱", region: "Europe",
    blurb: "The Netherlands is a strong study destination for international students because it offers a wide range of English-taught programmes, internationally recognised higher education, practical learning opportunities and a highly international student environment.",
    intakes: "The main intake is generally September." },
  { name: "Sweden", flag: "🇸🇪", region: "Europe",
    blurb: "Sweden offers internationally recognised higher education with strong emphasis on independent learning, innovation, research, sustainability and practical problem-solving.",
    intakes: "The major intake is autumn, normally beginning around August/September." },
  { name: "Finland", flag: "🇫🇮", region: "Europe",
    blurb: "Finland is known for its high-quality education system, strong research environment, modern teaching methods and safe student environment. It offers a large number of English-taught Bachelor's and Master's programmes, particularly in technology, engineering, business, ICT, health and sustainability-related fields.",
    intakes: "The main intake is generally for studies beginning in autumn, usually September. Many English-taught Bachelor's and Master's programmes use the January joint application period, while some programmes have separate application periods. For example, the 2026 joint application for many autumn programmes was held from 7–21 January 2026." },
  { name: "Denmark", flag: "🇩🇰", region: "Europe",
    blurb: "Denmark offers a high-quality, internationally recognised higher education system with a strong focus on critical thinking, independent learning, practical application, teamwork and research. It has a wide range of English-taught programmes for international students.",
    intakes: "For Bachelor's programmes, applications for international qualifications generally have an important deadline of 15 March at 12 noon CET through the coordinated admission system." },
  { name: "Norway", flag: "🇳🇴", region: "Europe",
    blurb: "Norway offers a high-quality higher-education system with a strong focus on independent learning, research, practical knowledge, sustainability and innovation. Students can find English-taught programmes, particularly at Master's and PhD level. Norway is especially attractive for students interested in technology, engineering, energy, marine studies, environmental sciences and research.",
    intakes: "The main intake is generally August/autumn." },
  { name: "Iceland", flag: "🇮🇸", region: "Europe",
    blurb: "Iceland has a small but internationally oriented higher-education system, with seven nationally accredited higher-education institutions. It is particularly interesting for students interested in renewable energy, environmental sciences, climate, geology, marine studies, engineering, technology, business and creative arts.",
    intakes: "The academic year generally has: Autumn semester: approximately September–December; Spring semester: approximately January–May" },
  { name: "Poland", flag: "🇵🇱", region: "Europe",
    blurb: "Poland is a European study destination offering Bachelor's, Master's and PhD programmes across engineering, IT, business, medicine, sciences, humanities and creative fields. It can be attractive to international students because many universities offer programmes in English and living costs can be lower than in several Western European destinations.",
    intakes: "The main academic intake is generally September/October. Some universities and programmes may also offer a February/March intake." },
  { name: "Czechia", qsKey: "Czech Republic", flag: "🇨🇿", region: "Europe",
    blurb: "Czechia is a well-established European study destination with public, state and private higher-education institutions. Students can choose programmes in Engineering, IT, Business, Economics, Medicine, Natural Sciences, Humanities, Arts and many other fields.",
    intakes: "The academic year normally has: Winter semester: starts around October; Summer semester: starts around February" },
  { name: "Austria", flag: "🇦🇹", region: "Europe",
    blurb: "Austria is a European study destination with universities, universities of applied sciences, private universities and universities of the arts. It combines research-focused education with practical and professionally oriented programmes. There are also an increasing number of English-taught programmes, particularly at Master's level.",
    intakes: "The main academic periods are: Winter semester: begins around October; Summer semester: begins around March" },
  { name: "Hungary", flag: "🇭🇺", region: "Europe",
    blurb: "Hungary is a popular Central European study destination with universities offering Bachelor's, Master's, doctoral and integrated professional programmes. Students can find English-taught programmes in areas such as Engineering, Computer Science, Business, Medicine, Natural Sciences, Arts and Social Sciences.",
    intakes: "The principal academic intake is generally the autumn intake, with studies beginning around September." },
  { name: "Belgium", flag: "🇧🇪", region: "Europe",
    blurb: "Belgium is a strong European study destination with universities, university colleges and specialised higher-education institutions. It is particularly attractive for students interested in Engineering, Business, Economics, Computer Science, Life Sciences, Medicine, Social Sciences and Humanities.",
    intakes: "The main intake is generally: Some institutions and programmes also offer a February intake, but this is much more limited." },
  { name: "Switzerland", flag: "🇨🇭", region: "Europe",
    blurb: "Switzerland offers: High-quality higher education; Strong research and innovation; Excellent Engineering and Technology programmes; Strong Business and Finance education; World-class scientific research",
    intakes: "The principal academic year generally begins in the autumn semester, although exact application and programme dates differ by institution." },
  { name: "Spain", flag: "🇪🇸", region: "Europe",
    blurb: "Spain offers: A large higher-education system; Public and private universities; Bachelor's, Master's and PhD programmes; English-taught programmes, especially at Master's level; Strong Business and Management education",
    intakes: "The main university intake is: Some universities and programmes also offer a January/February intake." },
  { name: "Italy", flag: "🇮🇹", region: "Europe",
    blurb: "Italy offers: Well-established universities; Public and private higher-education institutions; Bachelor's, Master's and PhD programmes; English-taught programmes, particularly at Master's level; Strong Engineering and Architecture education",
    intakes: "The main intake is: Some universities and programmes also offer additional or spring admissions." },
  { name: "Portugal", flag: "🇵🇹", region: "Europe",
    blurb: "Portugal is an attractive European study destination because students can access universities and polytechnic institutions, with programmes ranging from undergraduate degrees to Master's and PhD programmes. International students can apply to Bachelor's, Master's and doctoral-level study, although admission rules differ by institution and programme.",
    intakes: "The principal intake is generally September/October." },
  { name: "Greece", flag: "🇬🇷", region: "Europe",
    blurb: "Greece is an EU study destination with a long academic tradition and a growing number of programmes designed for international students. It offers Bachelor's, Master's and doctoral study, with programmes available in Greek and increasingly in English. Greece currently has 24 state-funded and accredited universities offering more than 1,000 undergraduate programmes in Greek, while the official Stud",
    intakes: "The main academic year generally begins in September/October." },
  { name: "Malta", flag: "🇲🇹", region: "Europe",
    blurb: "Malta is a European study destination where international students can pursue Bachelor's, Master's, doctoral and other higher-education qualifications. Its higher-education system follows the Malta Qualifications Framework (MQF), which is aligned with the European Higher Education Area.",
    intakes: "The main academic intake is generally September/October." },
  { name: "Croatia", flag: "🇭🇷", region: "Europe",
    blurb: "Croatia is a European Union study destination offering university and professional higher education. The country has more than 1,800 study programmes, including a growing number taught in English and other foreign languages.",
    intakes: "" },
  { name: "Romania", flag: "🇷🇴", region: "Europe",
    blurb: "Romania is an EU study destination and part of the European Higher Education Area. Romanian universities offer programmes in Romanian, English, French, German and Hungarian, making it possible for international students to find programmes outside Romanian as well.",
    intakes: "" },
  { name: "Bulgaria", flag: "🇧🇬", region: "Europe",
    blurb: "Bulgaria is an EU study destination offering Bachelor's, Master's and doctoral education through public and private higher-education institutions. International students can find programmes taught in Bulgarian and English, with selected programmes also available in other languages.",
    intakes: "" },
  { name: "Serbia", flag: "🇷🇸", region: "Europe",
    blurb: "Serbia is a European study destination with universities offering Bachelor's, Master's and PhD programmes. International students can find programmes taught in Serbian and English, and the official Study in Serbia catalogue currently includes 180+ accredited programmes at Bachelor's, Master's and PhD level taught entirely or partly in English.",
    intakes: "" },
  { name: "Slovenia", flag: "🇸🇮", region: "Europe",
    blurb: "Slovenia is a European higher-education destination offering Bachelor's, Master's and doctoral programmes through universities and other higher-education institutions. Its system follows the European Credit Transfer and Accumulation System (ECTS), making qualifications easier to understand within the European higher-education framework.",
    intakes: "" },
  { name: "Slovakia", flag: "🇸🇰", region: "Europe",
    blurb: "Slovakia is a European higher-education destination offering Bachelor's, Master's and doctoral programmes through public and private higher-education institutions.",
    intakes: "" },
  { name: "Lithuania", flag: "🇱🇹", region: "Europe",
    blurb: "Lithuania is a European higher-education destination offering Bachelor's, Master's and PhD programmes through universities and schools of applied sciences. International students can choose from programmes in areas such as technology, business, engineering, life sciences, social sciences and the arts.",
    intakes: "" },
  { name: "Latvia", flag: "🇱🇻", region: "Europe",
    blurb: "Latvia is a European higher-education destination offering Bachelor's, Master's and doctoral programmes through universities and other higher-education institutions.",
    intakes: "" },
  { name: "Estonia", flag: "🇪🇪", region: "Europe",
    blurb: "Estonia is a small European country known for its digital society, technology, innovation and modern education system. It offers a growing selection of English-taught programmes, including 150+ degree programmes fully taught in English through its partner institutions.",
    intakes: "The main academic intake is generally autumn, although individual programmes can have different deadlines and some may admit students at other times." },
  { name: "Luxembourg", flag: "🇱🇺", region: "Europe",
    blurb: "Luxembourg is an important European financial and business centre with a strongly international environment. Its higher-education system is relatively small, but it offers specialised programmes connected with finance, banking, economics, technology, cybersecurity, European law and business.",
    intakes: "The principal intake is generally the autumn/winter academic year." },
  { name: "Japan", flag: "🇯🇵", region: "Asia",
    blurb: "Japan offers a combination of advanced technology, strong research, globally recognised universities, disciplined academic environments and a unique cultural experience.",
    intakes: "The Japanese academic year generally starts in April." },
  { name: "South Korea", flag: "🇰🇷", region: "Asia",
    blurb: "South Korea combines a highly developed education system with globally recognised industries in technology, electronics, automobiles, semiconductors, entertainment and digital innovation.",
    intakes: "South Korea commonly has: Spring intake — March; Fall intake — September" },
  { name: "Singapore", flag: "🇸🇬", region: "Asia",
    blurb: "Singapore offers a highly developed education system with internationally recognised universities and strong links with industry. It is particularly strong in business, finance, technology, engineering, AI, computing, life sciences and research.",
    intakes: "The main university intake is generally around August, although some institutions and programmes have January or other intakes." },
  { name: "China", qsKey: "China (Mainland)", flag: "🇨🇳", region: "Asia",
    blurb: "China has a large and diverse higher-education system with strong universities in technology, engineering, science, medicine and business. Students can choose between programmes taught in Chinese, English or a combination, depending on the institution and course.",
    intakes: "The main academic intake is generally September." },
  { name: "Malaysia", flag: "🇲🇾", region: "Asia",
    blurb: "Malaysia has a growing international higher-education sector and offers students a choice between public universities, private universities and international university branch campuses.",
    intakes: "Malaysia has multiple intakes, depending on the institution and programme." },
  { name: "Thailand", flag: "🇹🇭", region: "Asia",
    blurb: "Thailand combines relatively accessible study costs with a diverse higher-education system and a strong international environment. Bangkok and other major cities host universities offering programmes specifically designed for international students.",
    intakes: "There is no single intake calendar for all Thai universities." },
  // Hong Kong SAR and Taiwan carry no flag emoji on the board. Kept as the
  // design has them rather than substituting a flag the design does not show.
  { name: "Hong Kong SAR", flag: "", region: "Asia",
    blurb: "Hong Kong is a major international education and business hub in Asia. It is particularly attractive for students interested in Business, Finance, Economics, Technology, Engineering, Computer Science, Data Science, Medicine, Law, Design and Research.",
    intakes: "The major academic intake is generally September." },
  { name: "Taiwan", flag: "", region: "Asia",
    blurb: "Taiwan is an increasingly popular Asian study destination, particularly for Engineering, Semiconductors, Computer Science, AI, Electronics, Business, Biotechnology, Medicine, Life Sciences and Research.",
    intakes: "The two major academic intakes are: Fall intake: usually September; Spring intake: usually February" },
  { name: "United Arab Emirates", flag: "", region: "Middle East",
    blurb: "The United Arab Emirates (UAE) has become an important higher-education destination in the Middle East, particularly for students interested in Business, Finance, Engineering, Computer Science, Artificial Intelligence, Architecture, Hospitality, Media and Design.",
    intakes: "The main intake is usually September/Fall." },
  { name: "Qatar", flag: "", region: "Middle East",
    blurb: "Qatar has developed into an important higher-education destination in the Gulf, particularly through Qatar University and Education City, where students can access universities and programmes with strong international connections.",
    intakes: "The principal intake is generally Fall, with some universities/programmes offering Spring or other admission periods." },
  { name: "Saudi Arabia", flag: "🇸🇦", region: "Middle East",
    blurb: "Saudi Arabia is becoming an increasingly important higher-education destination in the Gulf, with opportunities in engineering, technology, business, medicine, energy, science, Islamic studies and research. International students can apply through the official Study in Saudi platform and participating universities.",
    intakes: "The main academic intake is generally around September/Fall, but application dates vary by university and programme. Students should check the specific university or Study in Saudi listing before applying." },
  { name: "Oman", flag: "🇴🇲", region: "Middle East",
    blurb: "Oman is an emerging study destination in the Gulf with universities and colleges offering programmes in engineering, computing, business, logistics, maritime studies, medicine, science, design and humanities. The official Study in Oman platform lists recognised higher-education institutions and their available services for international students.",
    intakes: "Intakes vary between institutions. Many programmes admit students around the September/October academic period, while some institutions offer additional intakes." },
  { name: "Israel", flag: "🇮🇱", region: "Middle East",
    blurb: "Israel is known for its strong research, technology and innovation ecosystem. Its higher-education system includes universities, academic colleges and teacher-training institutions, with international programmes offered in English at Bachelor's and Master's level and research opportunities at PhD/Postdoctoral level. The Israeli Council for Higher Education's international portal currently lists 61 higher-education institutions.",
    intakes: "The main academic year generally begins around October, although individual universities and programmes may have different application deadlines and starting dates." },
  { name: "South Africa", flag: "🇿🇦", region: "Africa",
    blurb: "South Africa has one of the more established higher-education systems in Africa, with universities offering programmes across business, engineering, technology, medicine, science, law, humanities, agriculture and creative fields. The country also has several internationally recognised research universities.",
    intakes: "The major academic year generally begins around January/February." },
  { name: "Mauritius", flag: "🇲🇺", region: "Africa",
    blurb: "Mauritius is an attractive study destination for students looking for a multicultural, relatively accessible island destination with programmes offered in English and French. It is also developing as a regional higher-education hub, with opportunities in business, ICT, engineering, tourism, health sciences, and emerging technology fields.",
    intakes: "The September/October period is a common major intake, although some institutions and programmes may offer additional intakes." },
  { name: "Egypt", flag: "🇪🇬", region: "Africa",
    blurb: "Egypt is an important higher-education destination in North Africa and has a large network of universities and higher-education institutions. Its official Study in Egypt platform provides international students with information on recognised universities, programmes and application services. The platform currently lists 131 universities and thousands of study programmes/services.",
    intakes: "The main academic cycle generally begins around September/October, although application periods and additional intakes can differ between universities and programmes." },
  { name: "Mexico", flag: "🇲🇽", region: "Latin America",
    blurb: "Mexico is one of Latin America's major higher-education destinations, with a large university system and programmes across engineering, technology, business, economics, medicine, architecture, social sciences, humanities and the arts.",
    intakes: "The main academic cycle commonly begins around August/September, although universities may also have: The main academic cycle commonly begins around August/September, although universities may also have:; January/February intake; Spring intake; Programme-specific admission periods; Students should check the individual university's calendar." },
  { name: "Costa Rica", flag: "🇨🇷", region: "Latin America",
    blurb: "Costa Rica is a Central American study destination known for its stable higher-education system, environmental focus, biodiversity, sustainability research and Spanish-language academic environment.",
    intakes: "The academic year commonly begins around February/March, while some universities also have admissions for later periods." },
  { name: "Brazil", flag: "🇧🇷", region: "Latin America",
    blurb: "Brazil is the largest higher-education destination in Latin America and offers a wide range of programmes in areas such as engineering, technology, business, medicine, agriculture, environmental science, social sciences, humanities and the arts. Students can choose between public and private universities, with Portuguese being the main language of instruction.",
    intakes: "Brazil does not have one single international intake calendar." },
  { name: "Argentina", flag: "🇦🇷", region: "Latin America",
    blurb: "Argentina is one of the major higher-education destinations in South America. It offers a broad range of programmes through public and private universities, with particularly strong options in medicine, engineering, business, economics, social sciences, humanities, agriculture, environmental studies, arts and technology.",
    intakes: "Argentina generally follows an academic year beginning around March, although some universities and programmes have different admission periods." },
  { name: "Chile", flag: "🇨🇱", region: "Latin America",
    blurb: "Chile is one of the stronger higher-education destinations in South America, with universities offering programmes across engineering, technology, business, finance, economics, medicine, environmental science, mining, agriculture, architecture, social sciences and humanities.",
    intakes: "The Chilean academic year generally begins around March." },
];
