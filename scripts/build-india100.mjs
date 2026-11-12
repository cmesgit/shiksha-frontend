// Generates src/counselling/data/india100.js from the India-100 verification
// report, so the dataset is reproducible rather than hand-transcribed.
//
//   node scripts/build-india100.mjs <path-to-extracted-report.txt>
//
// Default input:
//   design_handoff_career_counselling_v3/source_bundle/converted_txt/
//     india__India_100_Institutions_Expanded_Verification.pdf.txt
//
// ── Why THIS source, and not the 980-row NIRF directory ──────────────
// The NIRF directory has 8x the rows but 566/980 of its course blocks are
// template-generated and 292 are byte-identical; it carries no date and no
// citations. This report is dated ("Updated 26 October 2026"), duplicate-
// free, and cites its sources. Fewer rows, but every one is attributable.
//
// ── What this parser had to get right ───────────────────────────────
// The master directory is a fixed-width table, 8 records per page, with
// cells that wrap mid-word ("Madhya Prades" / "h", "Private deemed-to-b" /
// "e university"). Three traps, all of which produced plausible-looking
// wrong data on the way here:
//
//   1. Splitting on the HEADER's column offsets clips values — the website
//      column is 19 chars wide and "jadavpuruniversity.in" is 21, so the
//      naive slice silently truncated 10 domains. Rows are split on runs of
//      2+ spaces instead; continuation lines are placed by column index.
//   2. Ranks 27 and 64 each appear TWICE and 28/65 are absent. That is a
//      genuine NIRF tie (confirmed: "Rank 28" appears in zero profile
//      headers), not corruption. Do not "repair" it into 1..100. The
//      document also carries a separate 001-100 ordinal, which is the only
//      stable-ish identifier anywhere in this corpus.
//   3. Wrapped type fragments land in the STATE column unless continuation
//      text is routed by its start offset, which silently produced states
//      like "Tamil Nadu be university".
//
// States and types are canonicalised against closed vocabularies, because
// mid-word wrapping cannot be undone reliably by rejoining alone.

import fs from "node:fs";
import path from "node:path";

const IN =
  process.argv[2] ||
  path.resolve(
    "../design_handoff_career_counselling_v3/source_bundle/converted_txt/" +
      "india__India_100_Institutions_Expanded_Verification.pdf.txt",
  );
const OUT = path.resolve("src/counselling/data/india100.js");

// Column starts taken from the table header; the last bound is open-ended.
const BOUNDS = [
  [0, 9, "rank"],
  [9, 48, "name"],
  [48, 72, "type"],
  [72, 81, "country"],
  [81, 101, "state"],
  [101, 120, "website"],
  [120, 170, "areas"],
  [170, Infinity, "verification"],
];
const fieldAt = (i) =>
  (BOUNDS.find(([a, b]) => i >= a && i < b) || [, , "verification"])[2];

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry",
  "Chandigarh",
];
const STATE_ALIAS = { pondicherry: "Puducherry" };

function canonState(value) {
  const key = value.replace(/\s/g, "").toLowerCase();
  if (STATE_ALIAS[key]) return STATE_ALIAS[key];
  for (const s of STATES) {
    const sq = s.replace(/\s/g, "").toLowerCase();
    // startsWith both ways: the cell may carry trailing noise, or be the
    // truncated half of a mid-word wrap ("Madhya Prades").
    if (key === sq || key.startsWith(sq) || (key.length >= 8 && sq.startsWith(key))) return s;
  }
  return value;
}

const canonType = (v) =>
  v
    .replace(/\s+/g, " ")
    .replace(/- /g, "-")
    .replace(/deemed-?to-?b\s*e/gi, "deemed-to-be")
    .replace(/deemed-to-$/, "deemed-to-be university")
    .replace(/\s+/g, " ")
    .trim();

const HEADER_FRAGMENTS = new Set(["Ra", "nk", "Cou", "ntry"]);

const lines = fs.readFileSync(IN, "utf8").split("\n");
const records = [];
let cur = null;
let inDirectory = false;

for (const line of lines) {
  const s = line.trim();
  if (s.startsWith("01 | Master directory")) { inDirectory = true; continue; }
  if (/^(02 |Updated 26|INDIA \|)/.test(s)) inDirectory = false;
  if (!inDirectory || !s) continue;
  if (s.startsWith("Records ")) continue;
  if (line.slice(0, 60).includes("Institution") && line.includes("Type")) continue;

  const parts = s.split(/\s{2,}/);
  // The table header itself wraps ("Ra"/"nk", "Cou"/"ntry"), so its second
  // line is "nk      ntry" — not a bare "nk", and it is NOT skipped by a
  // trimmed equality test. Left in, its fragments append to whichever record
  // is open, which is how rank 8 became "...Sciences, Delhi nk".
  if (parts.every((p) => HEADER_FRAGMENTS.has(p))) continue;
  if (/^\d{1,3}$/.test(parts[0]) && parts.length >= 6) {
    cur = {
      rank: Number(parts[0]),
      name: parts[1],
      type: parts[2],
      country: parts[3],
      state: parts[4],
      website: parts[5],
      areas: parts[6] || "",
      verification: parts.slice(7).join(" "),
    };
    records.push(cur);
  } else if (cur) {
    for (const p of parts) {
      let key = fieldAt(line.indexOf(p));
      if (key === "rank") key = "name";
      cur[key] = cur[key] ? `${cur[key]} ${p}` : p;
    }
  }
}

for (const r of records) {
  r.name = r.name.replace(/\s+/g, " ").trim();
  r.state = canonState(r.state);
  r.type = canonType(r.type);
  const v = r.verification || "";
  r.programmeLabels = Number(/Programme labels:\s*(\d+)/.exec(v)?.[1] ?? 0);
  // "Reviewed fee facts: 0" means the fee is NOT VERIFIED, never that it is
  // zero. The source is explicit: "Remaining fee gaps are marked 'not
  // verified', never 'not published'." Any UI must preserve that.
  r.feeFacts = Number(/Reviewed fee facts:\s*(\d+)/.exec(v)?.[1] ?? 0);
  r.officialContent = v.includes("Official content: Yes");
}

// ── Assertions: fail loudly rather than emit plausible-looking wrong data ──
const fail = (m) => { console.error(`build-india100: ${m}`); process.exit(1); };
if (records.length !== 100) fail(`expected 100 records, got ${records.length}`);
const badState = records.filter((r) => !STATES.includes(r.state));
if (badState.length) fail(`non-canonical states: ${badState.map((r) => r.state)}`);
const badSite = records.filter((r) => !/^[a-z0-9.-]+\.[a-z]{2,}$/.test(r.website));
if (badSite.length) fail(`malformed websites: ${badSite.map((r) => r.website)}`);
const official = records.filter((r) => r.officialContent).length;
if (official !== 98) fail(`expected 98 with official content, got ${official}`);

const withFees = records.filter((r) => r.feeFacts > 0).length;
const totalFees = records.reduce((n, r) => n + r.feeFacts, 0);
const totalLabels = records.reduce((n, r) => n + r.programmeLabels, 0);

const header = `// GENERATED by scripts/build-india100.mjs — do not edit by hand.
//
// Source: India 100 Institutions, expanded source-verification update,
// dated 26 October 2026. Ranking basis: NIRF Overall 2025.
//
// HONESTY CONTRACT, inherited from the source and binding on any UI:
//   * feeFacts === 0 means the fee was NOT VERIFIED. It does NOT mean free,
//     and must never render as 0, "-" or blank. ${100 - withFees} of 100 are in
//     this state.
//   * programmeLabels counts observed programme/family labels, NOT a course
//     catalogue. There is no course taxonomy in this corpus; an INSTITUTION
//     finder is supportable, a COURSE finder is not.
//   * rank has genuine TIES (27 and 64 appear twice; 28 and 65 do not
//     exist). Never renumber.
//
// Counted from the directory rows: ${totalLabels} programme labels across
// ${records.filter((r) => r.programmeLabels > 0).length} institutions, and ${totalFees} reviewed fee facts across
// ${withFees}. NOTE: the report's own summary page states 2106/77 and 616/24.
// Those headline figures do NOT equal the sum of its own rows (~5% apart),
// so cite one or the other, never both interchangeably.

export const INDIA_100 = [
`;

const body = records
  .map((r) => JSON.stringify({
    rank: r.rank, name: r.name, type: r.type, state: r.state,
    website: r.website, areas: r.areas, programmeLabels: r.programmeLabels,
    feeFacts: r.feeFacts, officialContent: r.officialContent,
  }))
  .join(",\n");

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, `${header}${body}\n];\n`);
console.log(
  `build-india100: wrote ${records.length} records -> ${path.relative(process.cwd(), OUT)}\n` +
  `  states=${new Set(records.map((r) => r.state)).size} ` +
  `types=${new Set(records.map((r) => r.type)).size} ` +
  `officialContent=${official} feeVerified=${withFees} labels=${totalLabels}`,
);
