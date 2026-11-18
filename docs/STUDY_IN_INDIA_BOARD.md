# `/counselling/india` — "Study in India" design board, transcribed

Source: `claude.ai/artifact/Dwch7uVD5334397py5NEmD#artboard-f22323634b41`,
project **"Career Counselling project"**, page **"Career Counselling v3"**.
Read 2026-11-18 through Claude in Chrome against the owner's share link.

> 🔴 The design projects are deleted **2026-12-14**. After that this file is
> the only record. It was transcribed by *driving* the prototype — clicking
> every chip, checkbox, sort option and the search box — not by screenshotting
> its resting state.

The board is reached from the counselling landing artboard via
**"Explore at your own pace" → Study in India → Explore India**. Its own
breadcrumb reads `Career Counselling / Study in India`, which is how we know
it is this route and not `/admission/india` ("Admission in India", a different
component over NIRF data).

---

## 1. Page chrome

| Element | Value |
|---|---|
| Breadcrumb | `Career Counselling` (link) ` / ` `Study in India` |
| Hero icon | house glyph in a pale-green rounded tile |
| H1 | **Study in India** |
| Sub | Short guides and careers for studying in India. |
| CTA (right) | **Get my India career report** — solid dark green |
| Tabs | `Guides` · `Explore careers` — underline tabs, Guides default |
| Page footer row | `Also considering studying abroad?` + **Go to Study abroad →** |

**There is no page-level sub-nav.** No Home/Universities/Countries row — do
not copy `AbroadNav` onto this page.

The "Also considering studying abroad?" row renders on **both** tabs, above
the site footer, separated by a dotted rule.

---

## 2. Guides tab

Four stage cards in a **2-up grid**. Each card:

* Dark-green header band carrying a glyph tile, an all-caps `STAGE N`
  eyebrow and the stage label.
* Body: guide title, one-line blurb, a `WHAT YOU'LL LEARN` eyebrow and
  **three** tick bullets.
* Footer: clock glyph + `<n> min read · <n> topics`, and a solid dark-green
  **Read guide →** button.

| # | Band label | Card title | Blurb |
|---|---|---|---|
| 1 | For Class 6–8 | Middle School Guide (Classes 6–8) | Know yourself, build good habits and start exploring careers — no pressure to decide yet. |
| 2 | For Class 9–10 | Class 9 & 10 Guide: Boards, Skills & Choosing a Stream | Build a strong base, prepare for boards smartly and pick the right stream after Class 10. |
| 3 | For Class 11–12 | Class 11 & 12 Guide: Streams, Entrance Exams & Next Steps | Your stream explained, key entrance exams, colleges in India and how to plan for after Class 12. |
| 4 | For college students | Undergraduate (UG) Guide: Courses, Exams & Careers | UG degrees after Class 12, entrance exams, admissions, college types and what comes after graduation. |

### WHAT YOU'LL LEARN bullets, verbatim

**Stage 1**
1. Middle school is for exploring, not deciding
2. Strengths include creative, personal, social and physical ones — not just marks
3. Small daily study habits beat long cramming sessions

**Stage 2**
1. Class 9–10 builds your base for boards and for Class 11
2. Boards test understanding — revise weekly, practise past papers
3. There is no single best stream: Science, Commerce, Humanities and Vocational all lead to strong careers

**Stage 3**
1. Class 11–12 is focused, concept-heavy study in one stream
2. Most top colleges admit through an entrance exam — know yours early
3. Many courses (BBA, law, design, media, hotel management) are open to every stream

**Stage 4**
1. UG degrees take 3–5.5 years after Class 12
2. Check UGC recognition and council approval before you join
3. Entrance exams decide most professional admissions

### 🔴 The one figure we do NOT reproduce

The board prints **"5 min read · 9 topics"** (stage 2: 10 topics) on all four
cards. Measured against the live CMS on 2026-11-18:

| Stage lead guide | chapters | sections | `reading_minutes` | board claim |
|---|---|---|---|---|
| `middle-school` | 13 | 140 | **43** | 5 min · 9 topics |
| `secondary-school` | 13 | 725 | **317** | 5 min · 10 topics |
| `class-11-12` | 8 | 484 | **159** | 5 min · 9 topics |
| `undergraduate` | 13 | 14 | **18** | 5 min · 9 topics |

The board's numbers describe **short stage guides that do not exist**. We ship
the board's exact layout, glyph, separator and the word "topics", and fill it
with `reading_minutes` and the real chapter count. Printing "5 min read" over a
317-minute guide would be a lie about half a day of reading.

Everything else on these cards — titles, blurbs, all twelve bullets — is
design copy authored on the board and is reproduced verbatim. (A previous
session refused the bullets as "copy nobody wrote"; that was correct only
while the board could not be read. It can be read now, and the copy is
authored.)

`glance` on the guide API is **not** the bullets — it is an at-a-glance
key/value table (`["Level of Study", "Undergraduate (UG)"]`), present on only
3 of 11 guides.

---

## 3. Explore careers tab

Layout, top to bottom:

1. `YOUR STREAM IN CLASS 11–12` eyebrow.
2. **Stream chips**, single row, exactly five:
   `All streams` · `Science (PCM)` · `Science (PCB)` · `Commerce` ·
   `Arts / Humanities`. Active chip is solid dark green; the rest are
   white pills with a hairline border. Single-select; default `All streams`.
3. Two-column body: a **left sidebar** and the **card grid**.
4. Sidebar: `INTEREST AREA` checkbox list with a right-aligned count per row,
   then a `SEARCH CAREERS` box (placeholder `e.g. doctor, design, pilot`).
5. Grid header: `Sort` + a native select, right-aligned.
6. **Active-filter row** above the grid, present only when something is
   filtering: one removable pill per active filter + a `Clear all` link.
   Search appears as a pill with the term in **quotes** — `"pilot" ×`.
7. The card grid, 2-up.

### Sort

A native `<select>` with exactly **two** options:
`Most popular` (default) and `A to Z`. No other options — verified by
stepping the select to its end.

### Interest areas (9) and their all-streams counts

| Area | Count |
|---|---|
| Computers & data | 4 |
| Engineering & building | 2 |
| Health & life sciences | 4 |
| Business & money | 3 |
| Law, government & defence | 4 |
| Creative, design & media | 6 |
| Teaching & research | 2 |
| Nature & environment | 2 |
| Sports, travel & hospitality | 3 |

Total **30** — exactly the number of records in `data/careerDetail.js`.

**Counts recompute under the active stream**, and a row whose count is 0 is
rendered greyed out (its checkbox disabled).

### 🔴 Count check-digits — assert against these

Per-stream interest-area counts, read off the board. Use them as a guard; a
derivation that misses one is wrong.

| Area | All | PCM | PCB | Commerce | Arts |
|---|---|---|---|---|---|
| Computers & data | 4 | 4 | 0 | 3 | 0 |
| Engineering & building | 2 | 2 | 0 | 0 | 0 |
| Health & life sciences | 4 | 3 | 4 | 1 | 1 |
| Business & money | 3 | 3 | 2 | 3 | 3 |
| Law, government & defence | 4 | 4 | 4 | 4 | 4 |
| Creative, design & media | 6 | 6 | 6 | 6 | 6 |
| Teaching & research | 2 | 2 | 2 | 1 | 1 |
| Nature & environment | 2 | 2 | 2 | 0 | 1 |
| Sports, travel & hospitality | 3 | 3 | 2 | 2 | 2 |
| **Total** | **30** | **29** | **22** | **20** | **18** |

Two of these were ambiguous from counts alone and were resolved by *driving
the board*, not inferred:

* **Arts ∩ Nature & environment = Environmental Science** (not Agriculture).
* **PCB ∩ Business & money excludes Finance & Accounting** (Business &
  Management and Entrepreneurship remain).

Stream membership is therefore an **explicit per-career list**, not something
derivable from the `Subjects:` string — "Finance & Accounting · Any stream
(Maths preferred)" is excluded from PCB despite saying "Any stream", and
"Environmental Science · Science (PCB/PCM) for B.Sc" is included in Arts.

### Search

* Lives in the sidebar under `SEARCH CAREERS`, **not** above the grid.
* Matches hidden text, not just what the card prints: `pilot` returns
  **Aviation (Pilot)** *and* **Defence Services**, whose visible copy contains
  no "pilot" — it is in that record's `jobRoles`.
* Produces a quoted filter pill and recomputes the sidebar counts.

### Empty state

A bordered card, centred:

> **No careers match these filters.**
> Try removing an area or choosing "All streams".
> _Clear all filters_   ← underlined link

### Career card anatomy

```
[glyph]  Engineering
         ENGINEERING & BUILDING            ← interest area, all-caps eyebrow
Engineering is one of India's largest and most diverse career
paths, spanning computer science, electronics, civil,…          ← 2-line clamp
[book] Subjects:  Physics + Maths (+ Chemistry)
┌───────────────────────────────────────────────────────────┐
│ COURSE          ENTRANCE EXAM        STARTING SALARY       │ ← tinted strip
│ B.Tech / B.E.   JEE Main, JEE        ₹4–8 LPA              │
│                 Advanced                                   │
└───────────────────────────────────────────────────────────┘
View career details →
```

**The blurb is the first sentence of `careerDetail.js`'s `overview`,
clamped to two lines by CSS.** Verified against the data, not assumed:
Medicine's card shows one short sentence and *no* ellipsis
("Medicine is a rigorous and highly regulated career in India."), while its
`overview` continues "MBBS (5.5 years including internship)…" — so the board
takes the first sentence and then clamps, rather than clamping the whole
paragraph.

`STARTING SALARY` is the existing `salaryFresher` field.

"View career details" links to the career detail screen
(`Career Counselling / Study in India / <career>`), which has its own tab bar:
`Overview · Specialisations · Exams & Prep · Colleges · Jobs & Salary`. That
screen is a separate route and out of scope here.

---

## 4. The 30 careers

`key` is the existing `CAREER_DETAIL` key (they already read well — there are
no camel-smashed keys; the file uses `"Data Science"`, `"Fine Arts"` etc.).
`#` is the **Most popular** order, which is **not** the file's key order.

| # | key | Board label | Interest area | Subjects | Course | Entrance exam | Streams |
|---|---|---|---|---|---|---|---|
| 1 | Engineering | Engineering | Engineering & building | Physics + Maths (+ Chemistry) | B.Tech / B.E. | JEE Main, JEE Advanced | PCM |
| 2 | Medical | Medicine (Doctor) | Health & life sciences | Physics + Chemistry + Biology | MBBS | NEET UG | PCB |
| 3 | IT | IT & Software | Computers & data | Maths (PCM for B.Tech) | B.Tech CSE / BCA | JEE Main, CUET UG | PCM, Commerce |
| 4 | Data Science | Data Science | Computers & data | Maths | B.Sc / B.Tech Data Science | CUET UG, JEE Main | PCM, Commerce |
| 5 | Business | Business & Management | Business & money | Any stream | BBA, then MBA | CUET UG, IPMAT (CAT later) | all |
| 6 | Law | Law | Law, government & defence | Any stream | BA LLB (5 years) | CLAT, AILET | all |
| 7 | Finance | Finance & Accounting | Business & money | Any stream (Maths preferred) | B.Com / CA | CA Foundation, CUET UG | PCM, Commerce, Arts |
| 8 | AI | Artificial Intelligence | Computers & data | Physics + Maths (PCM) | B.Tech AI & ML | JEE Main | PCM |
| 9 | Design | Design | Creative, design & media | Any stream | B.Des | NID DAT, UCEED, NIFT | all |
| 10 | Civil Services | Civil Services (IAS/IPS) | Law, government & defence | Any stream | Any graduate degree | UPSC Civil Services | all |
| 11 | Psychology | Psychology | Health & life sciences | Any stream | BA / B.Sc Psychology | CUET UG | all |
| 12 | Architecture | Architecture | Engineering & building | Physics + Maths (compulsory) | B.Arch (5 years) | NATA, JEE Main Paper 2 | PCM |
| 13 | Pharmacy | Pharmacy | Health & life sciences | Physics + Chemistry + Maths or Biology | B.Pharm | State CETs, CUET UG | PCM, PCB |
| 14 | Cybersecurity | Cybersecurity | Computers & data | Maths (PCM for B.Tech) | B.Tech / BCA (Cyber Security) | JEE Main, CUET UG | PCM, Commerce |
| 15 | Media | Media & Journalism | Creative, design & media | Any stream | BA Journalism & Mass Comm. | CUET UG | all |
| 16 | Government Jobs | Government Jobs | Law, government & defence | Any stream | Class 12 or any degree | SSC, banking, railway exams | all |
| 17 | Defence | Defence Services | Law, government & defence | Any stream (PCM for Air Force & Navy) | NDA or any degree | NDA, CDS, AFCAT | all |
| 18 | Teaching | Teaching | Teaching & research | Any stream | Graduation + B.Ed | CTET, state TETs | all |
| 19 | Biotechnology | Biotechnology | Health & life sciences | Physics + Chemistry + Biology or Maths | B.Tech / B.Sc Biotechnology | JEE Main, CUET UG | PCM, PCB |
| 20 | Hotel Management | Hotel Management | Sports, travel & hospitality | Any stream (with English) | BHM / B.Sc Hospitality | NCHM JEE | all |
| 21 | Aviation | Aviation (Pilot) | Sports, travel & hospitality | Physics + Maths | Commercial Pilot Licence training | DGCA medical + CPL exams | PCM |
| 22 | Animation | Animation & VFX | Creative, design & media | Any stream | B.Sc / BA Animation | Portfolio or institute test | all |
| 23 | Fashion | Fashion | Creative, design & media | Any stream | B.Des Fashion | NIFT entrance | all |
| 24 | Entrepreneurship | Entrepreneurship | Business & money | Any stream | BBA or any degree | No single exam | all |
| 25 | Research | Research & Science | Teaching & research | Science (2+ of P, C, M, B) | BS-MS / B.Sc, then PhD | IISER IAT, NEST, CUET UG | PCM, PCB |
| 26 | Agriculture | Agriculture | Nature & environment | Physics + Chemistry + Biology or Maths | B.Sc Agriculture | CUET UG (ICAR seats) | PCM, PCB |
| 27 | Environment | Environmental Science | Nature & environment | Science (PCB/PCM) for B.Sc | B.Sc Environmental Science | CUET UG | PCM, PCB, Arts |
| 28 | Sports | Sports | Sports, travel & hospitality | Any stream | B.P.Ed / Sports science | University test + trials | all |
| 29 | Fine Arts | Fine Arts | Creative, design & media | Any stream | BFA | University entrance / portfolio | all |
| 30 | Music | Music | Creative, design & media | Any stream | BA / B.Mus Music | Audition / CUET UG | all |

Two starting-salary values are sentences rather than ranges and must not be
reformatted:

* **Entrepreneurship** — "Variable — equity is the currency early on"
* **Sports** — "₹2–6 LPA (non-athlete roles); athlete pay varies enormously"

And three are monthly, not LPA: **Civil Services** `₹56,100/month basic`,
**Government Jobs** `₹25,000–55,000/month + DA + perks`, **Defence**
`₹56,100–67,700/month`. These come from `salaryFresher` as-is.

---

## 5. What this board does NOT answer

* The **career detail** screen's five tabs are designed but out of scope for
  `/counselling/india`.
* The board shows no result count beside Sort (the current build prints
  "N of 30"; the board does not).
