// Generates src/counselling/data/nirf980.js from the NIRF 2025 all-courses
// directory PDF, so the dataset is reproducible rather than transcribed.
//
//   pdftotext -raw "ShikshaCom_NIRF_2025_All_Courses_Directory.pdf" nirf_raw.txt
//   node scripts/build-nirf980.mjs nirf_raw.txt
//
// Source: "All 980 NIRF 2025-ranked institutions", built 10 Nov 2026.
// Ranking: NIRF India Rankings 2025, Ministry of Education. The document
// states NIRF 2026 was unpublished when it was built.
//
// ── USE -raw. DO NOT USE -layout. ────────────────────────────────────
// `pdftotext -layout` interleaves the sidebar rank badge ("#1" / "in this
// list") into the institution NAME line, which corrupts the great majority
// of headers and makes the document look unparseable. It is not: with -raw
// every profile opens with a clean, fixed preamble —
//
//     #1
//     in this list
//     Indian Institute of Technology Madras
//     Chennai, Tamil Nadu · IIT · Central Government
//     NIRF 2025: Overall 1 · Engineering 1 · Research 2 · Management 13
//     Website: iitm.ac.in
//
// and all 980 parse with zero loss.
//
// ── Provenance is the point of this dataset ──────────────────────────
// The document is scrupulous about what it has and has not checked, and
// that must survive into the app:
//   * courseSource === "official" means the profile carried the green
//     "✓ from the official programme list" marker (267 of 980). Its ABSENCE
//     means the course groups are generic stream buckets — which is why
//     hundreds of them are textually identical. They are labelled, not
//     passed off as verified. Never render the two alike.
//   * feeStatus is one of "verified" (182: 153 from official fee documents
//     plus 29 IIT/NIT standard), "not_verified" (790) or
//     "source_found" (8, where a fee source exists but its values were not
//     checked). The document's own words: fees "were not verified for this
//     edition, so the profile says so rather than showing an estimate".
//   * websiteVerify === true means the address came from a known
//     institutional domain and was NOT re-checked for this edition (295).
//
// ── NOT extracted, deliberately ──────────────────────────────────────
//   * The UG / PG / DOCTORAL course columns. In -raw the three table
//     columns flatten into one sequence with no reliable boundary, so
//     splitting them would invent a structure the text does not carry.
//     Courses are kept as a flat list, which is what search needs.
//   * Structured fee ROWS (course / fee / basis / source). They wrap across
//     lines and interleave; a confident parse here would be guesswork
//     attached to money. feeStatus and the fee block's text are kept
//     instead.

import fs from "node:fs";
import path from "node:path";

const IN = process.argv[2] || path.resolve("../tmp/nirf_raw.txt");
const OUT = path.resolve("src/counselling/data/nirf980.js");

const lines = fs.readFileSync(IN, "utf8").split("\n");

// A profile opens with "#<n>" followed by the literal "in this list".
const starts = [];
for (let i = 0; i < lines.length - 2; i++) {
  if (/^#\d+$/.test(lines[i].trim()) && lines[i + 1].trim() === "in this list") starts.push(i);
}

const FOOTER = /^ShikshaCom · Admission in India/;
const clean = (arr) => arr.filter((l) => !FOOTER.test(l.trim()));

function parse(block) {
  const listRank = Number(block[0].trim().slice(1));

  // The name usually sits on one line, but 22 of 980 wrap onto a second,
  // which pushes the location line down. Find the location line by its
  // shape ("City, State · Type · Ownership") rather than by offset, and
  // treat everything before it as the name.
  let locIdx = -1;
  for (let i = 2; i < Math.min(block.length, 8); i++) {
    if (block[i].split(" · ").length === 3) { locIdx = i; break; }
  }
  if (locIdx < 0) return null;

  const name = block.slice(2, locIdx).map((s) => s.trim()).join(" ").replace(/\s+/g, " ");
  const [place, type, ownership] = block[locIdx].split(" · ").map((s) => s.trim());
  const comma = place.lastIndexOf(",");
  const city = comma > 0 ? place.slice(0, comma).trim() : "";
  const state = comma > 0 ? place.slice(comma + 1).trim() : place.trim();

  const rest = block.slice(locIdx + 1);
  const text = rest.join("\n");

  // "NIRF 2025: Overall 1 · Engineering 1 · Research 2 · Management 13"
  const nirfLine = rest.find((l) => l.startsWith("NIRF 2025:")) || "";
  const ranks = {};
  nirfLine.replace(/^NIRF 2025:\s*/, "").split(" · ").forEach((part) => {
    const m = /^(.+?)\s+(\d+)$/.exec(part.trim());
    if (m) ranks[m[1].trim()] = Number(m[2]);
  });

  const siteLine = rest.find((l) => l.startsWith("Website:")) || "";
  const siteRaw = siteLine.replace(/^Website:\s*/, "").trim();
  const websiteVerify = /\(verify\)/i.test(siteRaw);
  const website = siteRaw.replace(/\s*\(verify\)\s*/i, "").trim();

  // Course provenance: the ✓ marker and the source URLs in its parentheses.
  const coursesIdx = rest.findIndex((l) => l.startsWith("Courses offered"));
  const officialList = coursesIdx >= 0 && /✓ from the official programme list/.test(rest[coursesIdx]);

  // Flat course bullets (see header: columns are not recoverable from -raw).
  //
  // Bullets wrap freely and their continuation lines are usually CAPITALISED
  // ("Chemical, Civil, CSE," / "Engineering Design, Mechanical,"), so a rule
  // keyed on the first character silently drops most of them and welds the
  // survivors into plausible-looking nonsense. Instead: take the whole region
  // from the first bullet to the next section heading and split it on "•".
  const END = /^(Programmes on official pages|Admission|Fee structure)\b/;
  const firstBullet = rest.findIndex((l) => l.trim().startsWith("•"));
  let courses = [];
  if (firstBullet >= 0) {
    const region = [];
    for (let i = firstBullet; i < rest.length; i++) {
      if (END.test(rest[i].trim())) break;
      region.push(rest[i].trim());
    }
    courses = region
      .join(" ")
      .split("•")
      .map((s) => s.replace(/\s+/g, " ").trim())
      .filter(Boolean);
  }

  const row = (label) => {
    const l = rest.find((x) => x.trim().startsWith(label));
    return l ? l.trim().slice(label.length).trim() : "";
  };

  let feeStatus = "verified";
  if (/Status:\s*Fees not verified/i.test(text)) feeStatus = "not_verified";
  else if (/Status:\s*Fee source found, values not verified/i.test(text)) feeStatus = "source_found";

  return {
    listRank,
    name,
    city,
    state,
    type,
    ownership,
    ranks,
    website,
    websiteVerify,
    courseSource: officialList ? "official" : "stream-groups",
    courses: courses.map((c) => c.replace(/\s+/g, " ").trim()).filter(Boolean),
    ugEntrance: row("UG entrance"),
    pgEntrance: row("PG entrance"),
    admissionRoute: row("Admission route"),
    feeStatus,
  };
}

const records = [];
for (let k = 0; k < starts.length; k++) {
  const end = k + 1 < starts.length ? starts[k + 1] : lines.length;
  const rec = parse(clean(lines.slice(starts[k], end)));
  if (rec) records.push(rec);
}

// ── Assertions: a silent partial parse is the failure mode here ──────────
const fail = (m) => { console.error(`build-nirf980: ${m}`); process.exit(1); };
if (records.length !== 980) fail(`expected 980 profiles, got ${records.length}`);
if (records.some((r) => !r.name)) fail("a profile parsed with no name");
if (records.some((r) => !r.state)) fail("a profile parsed with no state");
const official = records.filter((r) => r.courseSource === "official").length;
if (official !== 267) fail(`expected 267 official course lists, got ${official}`);
const verified = records.filter((r) => r.feeStatus === "verified").length;
if (verified !== 182) fail(`expected 182 verified fees, got ${verified}`);
const verifyMarked = records.filter((r) => r.websiteVerify).length;
if (verifyMarked !== 295) fail(`expected 295 "(verify)" websites, got ${verifyMarked}`);

const states = [...new Set(records.map((r) => r.state))];
const types = [...new Set(records.map((r) => r.type))];

// Emitted as TWO modules. The whole dataset is ~690 KB, and ~450 KB of that
// is course text and admission rows that only the detail drawer ever shows.
// Shipping it all in the directory's chunk would make every visitor download
// the drawer's content to look at a list. The detail file is loaded on demand
// by the drawer instead.
const DETAIL_OUT = path.resolve("src/counselling/data/nirf980-detail.js");

const indexRecords = records.map(({
  listRank, name, city, state, type, ownership, ranks,
  feeStatus, courseSource, websiteVerify,
}) => ({ listRank, name, city, state, type, ownership, ranks, feeStatus, courseSource, websiteVerify }));

const detailRecords = records.map(({
  listRank, website, courses, ugEntrance, pgEntrance, admissionRoute,
}) => ({ listRank, website, courses, ugEntrance, pgEntrance, admissionRoute }));

const detailHead = `// GENERATED by scripts/build-nirf980.mjs — do not edit by hand.
//
// Detail payload for the NIRF directory, keyed by listRank. Loaded on demand
// by the detail drawer (see nirf980.js for the dataset contract); it is kept
// out of the index so the list view does not download course text it never
// renders.

export const NIRF_980_DETAIL = [
`;

const head = `// GENERATED by scripts/build-nirf980.mjs — do not edit by hand.
//
// Source: "All 980 NIRF 2025-ranked institutions", built 10 November 2026.
// Ranking: NIRF India Rankings 2025, Ministry of Education.
//
// CONTRACT — binding on any UI:
//   * courseSource "official" (${official} of 980) = the profile carried the
//     "✓ from the official programme list" marker. "stream-groups" (${980 - official})
//     = generic stream buckets, which is why many are textually identical.
//     They are LABELLED, not verified. Never render the two alike.
//   * feeStatus is "verified" (${verified}), "not_verified" or "source_found".
//     A non-verified fee must say so — never blank, never zero, never an
//     estimate. The source document is explicit about this.
//   * websiteVerify === true (${verifyMarked}) means the address came from a known
//     institutional domain and was NOT re-checked for this edition.
//   * ranks is a MAP of NIRF category → position. An institution appears in
//     several category lists; listRank is only its position in this
//     directory's ordering, not a national rank.
//   * courses is a FLAT list. The source's UG/PG/Doctoral columns cannot be
//     recovered from the PDF text, so no level is implied.
//
// ${states.length} states/UTs, ${types.length} institution types.

export const NIRF_980 = [
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, `${head}${indexRecords.map((r) => JSON.stringify(r)).join(",\n")}\n];\n`);
fs.writeFileSync(DETAIL_OUT, `${detailHead}${detailRecords.map((r) => JSON.stringify(r)).join(",\n")}\n];\n`);

const kb = (p) => `${Math.round(fs.statSync(p).size / 1024)} KB`;
console.log(
  `build-nirf980: wrote ${records.length} records\n` +
  `  ${path.relative(process.cwd(), OUT)} (${kb(OUT)})\n` +
  `  ${path.relative(process.cwd(), DETAIL_OUT)} (${kb(DETAIL_OUT)})\n` +
  `  states=${states.length} types=${types.length} officialCourseLists=${official} ` +
  `verifiedFees=${verified} verifyMarkedSites=${verifyMarked}`,
);
