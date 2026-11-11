// Generates src/counselling/data/abroad100.js from the worldwide-100
// comparison sheet, so the dataset is reproducible rather than transcribed.
//
//   node scripts/build-abroad100.mjs [path-to-extracted-xlsx.txt]
//
// Source: abroad/Universities_Matched_to_PDF_Profiles.xlsx, prepared
// 14 October 2026. Ranking basis: QS World University Rankings 2027
// (published June 2026). India is deliberately excluded from this sheet.
//
// Prefer THIS copy over india/Worldwide_100_Institutions_Comparison.xlsx:
// the two differ by five lines, and this one is the later pass — it
// normalised a UNAM double space and added the PDF-match provenance row.
//
// ── Three things that will produce wrong output if ignored ───────────
//
//  1. QS rank IS NOT A NUMBER for 8 of the 100. Five are RANGES
//     ("1001-1200" x4, "851-900") and three are "NR" — the sheet's own
//     read-me defines NR as "not found in the overall dataset". Coercing
//     to Number gives NaN, and sorting numerically silently reorders or
//     drops them. Kept as strings, with a separate sort key.
//  2. THE FEE BADGE COMES FROM THE LABEL, NEVER FROM "IS THERE A NUMBER".
//     Only ~52 of 100 carry a numeric amount; the rest give a policy or
//     flag an unverified value. But the two are not aligned — Technical
//     University of Denmark carries "EUR 15,000" under the label
//     "Published example; current standard MSc rate not verified". Reading
//     presence-of-digits as "verified" would publish that as fact.
//     `feeEvidence` is a 12-value vocabulary; show it verbatim.
//  3. Fee PERIODS are not interchangeable — the read-me is explicit that
//     per semester / quarter / credit / course / year / full programme all
//     appear. Never sum, compare or annualise these without reading the
//     prose, which carries its own warnings ("Do not treat a quarterly
//     amount as annual tuition").
//
// The REGION field is OURS, not the source's. The sheet has a "State or
// region" column, but that is sub-national (Massachusetts, England) — it
// is NOT the world region the design's Region facet needs. The map below
// is added by us and must be maintained by hand; it is marked as such in
// the generated file so nobody cites it as sourced.

import fs from "node:fs";
import path from "node:path";

const IN =
  process.argv[2] ||
  path.resolve(
    "../design_handoff_career_counselling_v3/source_bundle/converted_txt/" +
      "abroad__Universities_Matched_to_PDF_Profiles.xlsx.txt",
  );
const OUT = path.resolve("src/counselling/data/abroad100.js");

// Our own country → world region map (see header note). Regions match the
// design's Region facet: North America, Europe, Asia, Oceania, Middle East,
// Africa, Latin America.
const REGION = {
  "United States": "North America", Canada: "North America",
  Mexico: "Latin America", Argentina: "Latin America", Brazil: "Latin America",
  Chile: "Latin America", Colombia: "Latin America",
  "United Kingdom": "Europe", Ireland: "Europe", France: "Europe",
  Germany: "Europe", Netherlands: "Europe", Belgium: "Europe",
  Switzerland: "Europe", Austria: "Europe", Italy: "Europe", Spain: "Europe",
  Portugal: "Europe", Greece: "Europe", Denmark: "Europe", Sweden: "Europe",
  Norway: "Europe", Finland: "Europe", Poland: "Europe", Hungary: "Europe",
  "Czech Republic": "Europe", Türkiye: "Europe",
  "China (Mainland)": "Asia", "Hong Kong SAR": "Asia", Japan: "Asia",
  "South Korea": "Asia", Taiwan: "Asia", Singapore: "Asia", Malaysia: "Asia",
  Thailand: "Asia", Indonesia: "Asia", Philippines: "Asia",
  Bangladesh: "Asia", Pakistan: "Asia", "Sri Lanka": "Asia",
  Australia: "Oceania", "New Zealand": "Oceania",
  "Saudi Arabia": "Middle East", Qatar: "Middle East",
  "United Arab Emirates": "Middle East",
  Egypt: "Africa", Morocco: "Africa", Ghana: "Africa", Kenya: "Africa",
  Nigeria: "Africa", "South Africa": "Africa",
};

const raw = fs.readFileSync(IN, "utf8").split("\n");
const rows19 = raw.filter((l) => l.split(" | ").length === 19);
const header = rows19[0].split(" | ").map((h) => h.trim());
const at = (name) => {
  const i = header.indexOf(name);
  if (i < 0) throw new Error(`column not found: ${name}`);
  return i;
};

const records = rows19.slice(1).map((line) => {
  const c = line.split(" | ").map((x) => x.trim());
  const rank = c[at("QS overall rank")];
  return {
    id: Number(c[at("ID")]),
    name: c[at("Institution")],
    country: c[at("Country or territory")],
    region: REGION[c[at("Country or territory")]] || "",
    area: c[at("State or region")],          // sub-national, e.g. Massachusetts
    type: c[at("Institution type")],
    qsEdition: c[at("QS WUR edition")],
    qsRank: rank,                             // STRING: may be "NR" or "851-900"
    // Sort key only. "NR" and ranges must not masquerade as a position, so
    // a range sorts on its lower bound and NR sorts last.
    qsSort: /^\d+$/.test(rank)
      ? Number(rank)
      : /^(\d+)\s*-/.test(rank)
        ? Number(/^(\d+)\s*-/.exec(rank)[1])
        : Number.MAX_SAFE_INTEGER,
    ranked: rank !== "NR",
    website: c[at("Official website")],
    subjects: c[at("Postgraduate main subject areas")]
      .split(";").map((s) => s.trim()).filter(Boolean),
    catalogue: c[at("Course catalogue or gateway")],
    feeYear: c[at("Fee reference year")],
    feeDetail: c[at("Tuition and fee details")],
    feeEvidence: c[at("Fee evidence label")],
    feeSource: c[at("Fee source or gateway")],
    overview: c[at("Institution overview")],
    academic: c[at("Academic profile")],
    applying: c[at("Application planning")],
  };
});

// ── Assertions: a silent partial parse is the failure mode here ──────────
const fail = (m) => { console.error(`build-abroad100: ${m}`); process.exit(1); };
if (records.length !== 100) fail(`expected 100 rows, got ${records.length}`);
const countries = new Set(records.map((r) => r.country));
if (countries.size !== 51) fail(`expected 51 countries, got ${countries.size}`);
const noRegion = [...countries].filter((c) => !REGION[c]);
if (noRegion.length) fail(`country missing from REGION map: ${noRegion.join(", ")}`);
if (!records.every((r) => r.qsEdition === "2027")) fail("QS edition is not 2027 on every row");
const badSite = records.filter((r) => !/^https?:\/\//.test(r.website));
if (badSite.length) fail(`rows without an official website: ${badSite.length}`);
const noEvidence = records.filter((r) => !r.feeEvidence);
if (noEvidence.length) fail(`rows without a fee evidence label: ${noEvidence.length}`);

const evidence = [...new Set(records.map((r) => r.feeEvidence))];
const unranked = records.filter((r) => !r.ranked).length;
const ranges = records.filter((r) => /-/.test(r.qsRank)).length;
const regions = [...new Set(records.map((r) => r.region))];

const head = `// GENERATED by scripts/build-abroad100.mjs — do not edit by hand.
//
// Source: Universities_Matched_to_PDF_Profiles.xlsx, prepared 14 October 2026.
// Ranking: QS World University Rankings 2027 (published June 2026), overall
// institutional ranking — NOT a programme ranking. India is excluded by the
// source's own design. ${records.length} institutions across ${countries.size} countries.
//
// CONTRACT — binding on any UI:
//   * qsRank is a STRING. ${ranges} rows are RANGES ("1001-1200") and ${unranked} are "NR"
//     (not found in the overall dataset). Never Number() it; sort on qsSort.
//   * feeEvidence drives the provenance badge, NOT the presence of digits.
//     Only ~52 of 100 carry a numeric amount, and the two do not align — one
//     row carries "EUR 15,000" under a label ending "not verified". Show the
//     label verbatim; it is a ${evidence.length}-value vocabulary.
//   * Fee PERIODS are not interchangeable (per semester / quarter / credit /
//     course / year / full programme all occur). Never annualise or compare
//     these numerically; feeDetail carries its own caveats.
//   * subjects are MAIN POSTGRADUATE AREAS, not a course catalogue. The
//     source is explicit that it is "not a complete individual degree,
//     module or intake inventory".
//
// region is OURS, not the source's — the sheet's "State or region" column is
// sub-national (Massachusetts, England). The country→region map lives in the
// generator and is maintained by hand. Do not cite it as sourced.
// Regions present: ${regions.sort().join(", ")}.

export const ABROAD_100 = [
`;

const body = records.map((r) => JSON.stringify(r)).join(",\n");
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, `${head}${body}\n];\n`);

console.log(
  `build-abroad100: wrote ${records.length} records -> ${path.relative(process.cwd(), OUT)}\n` +
  `  countries=${countries.size} regions=${regions.length} ` +
  `rangeRanks=${ranges} unranked=${unranked} evidenceLabels=${evidence.length}`,
);
