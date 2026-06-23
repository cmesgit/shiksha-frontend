/* data.js — sample/seed data for the Skill Development feature.
   ────────────────────────────────────────────────────────────────
   This is mock data so the UI runs before the backend exists. When
   your API is ready, replace these with calls in ../../api/skillApi.js
   (the screens already read through that seam where it matters).

   Photos are imported so Vite fingerprints them. Teachers use
   teacher1–9; the ADMIN interview panel deliberately uses different
   photos (teacher10/11) so applicants and reviewers are never the
   same faces. */

import teacher1 from "../../assets/teachers/teacher1.jpeg";
import teacher2 from "../../assets/teachers/teacher2.jpeg";
import teacher3 from "../../assets/teachers/teacher3.jpeg";
import teacher4 from "../../assets/teachers/teacher4.jpeg";
import teacher5 from "../../assets/teachers/teacher5.jpeg";
import teacher6 from "../../assets/teachers/teacher6.jpeg";
import teacher7 from "../../assets/teachers/teacher7.jpeg";
import teacher8 from "../../assets/teachers/teacher8.jpeg";
import teacher9 from "../../assets/teachers/teacher9.jpeg";
import admin1 from "../../assets/teachers/teacher10.jpeg";
import admin2 from "../../assets/teachers/teacher11.jpeg";

export const SKILL_CATEGORIES = [
  { id: "coding",   label: "Coding & Web",       icon: "▣", color: "#1b9c85" },
  { id: "design",   label: "Design & Art",       icon: "✦", color: "#a78bfa" },
  { id: "music",    label: "Music & Audio",      icon: "♪", color: "#ff8f01" },
  { id: "lang",     label: "Languages",          icon: "ᴬ", color: "#60a5fa" },
  { id: "business", label: "Business & Finance", icon: "₹", color: "#f87171" },
  { id: "exam",     label: "Exam Prep",          icon: "✎", color: "#125027" },
  { id: "crafts",   label: "Crafts & Handmade",  icon: "✄", color: "#d97757" },
  { id: "spoken",   label: "Public Speaking",    icon: "❝", color: "#1dcaab" },
];

export const TEACHERS = [
  { id: 1, name: "Hrangthantlinga", title: "Web Developer · ex-Infosys", skills: ["React", "Node.js", "Python"], cat: "coding",
    rating: 4.9, sessions: 142, rate: 450, img: teacher1,
    bio: "Twelve years of building production web apps. I teach the version of programming I wish I'd had — fewer tutorials, more shipping. Sessions are project-first.",
    badges: ["Verified", "Quick replies"], availability: "Mon–Sat · evenings" },
  { id: 2, name: "Mimi Lalramthari", title: "English & IELTS coach", skills: ["IELTS", "Spoken English", "Essay"], cat: "lang",
    rating: 4.8, sessions: 211, rate: 350, img: teacher2,
    bio: "Spent 6 years preparing students for IELTS and university interviews. I focus on the speaking patterns examiners actually score.",
    badges: ["Verified"], availability: "Daily · mornings" },
  { id: 3, name: "Eric Lalsiamliana", title: "UI/UX Designer", skills: ["Figma", "UX Research", "Branding"], cat: "design",
    rating: 4.9, sessions: 88, rate: 550, img: teacher3,
    bio: "Designer at a Bangalore studio. I run portfolio reviews and walk through real client briefs end-to-end.",
    badges: ["Verified", "Top-rated"], availability: "Weekends" },
  { id: 4, name: "Zothanpuia", title: "Civil Services mentor", skills: ["UPSC GS", "Essay", "Interview"], cat: "exam",
    rating: 4.7, sessions: 167, rate: 400, img: teacher4,
    bio: "Cleared Mains twice. I help aspirants build an answer-writing rhythm and stay sane during the long prep.",
    badges: ["Verified"], availability: "Mon–Fri" },
  { id: 5, name: "V. Lalrindika", title: "Guitarist & vocal coach", skills: ["Acoustic Guitar", "Vocals", "Songwriting"], cat: "music",
    rating: 4.9, sessions: 96, rate: 500, img: teacher5,
    bio: "Performing musician with a soft spot for first-time learners. We'll have you playing a song you actually like by week two.",
    badges: ["Top-rated"], availability: "Tue–Sun · afternoons" },
  { id: 6, name: "Janet Lalhmangaihzuali", title: "Watercolour artist", skills: ["Watercolour", "Sketching", "Composition"], cat: "crafts",
    rating: 4.8, sessions: 54, rate: 380, img: teacher6,
    bio: "Self-taught artist who teaches the way I learned — by making lots of small finished things.",
    badges: ["Verified"], availability: "Weekends" },
  { id: 7, name: "Vanlalhluzuali", title: "Public speaking coach", skills: ["Debate", "Presentation", "Voice"], cat: "spoken",
    rating: 4.8, sessions: 73, rate: 420, img: teacher7,
    bio: "Toastmasters DTM. I work mainly with students prepping for interviews and competitions.",
    badges: ["Verified"], availability: "Evenings" },
  { id: 8, name: "Dinah Lalremhlui", title: "Chartered Accountant", skills: ["Accounting", "GST", "Personal Finance"], cat: "business",
    rating: 4.9, sessions: 119, rate: 600, img: teacher8,
    bio: "Practising CA. I demystify books and taxes for students starting their own thing.",
    badges: ["Verified", "Top-rated"], availability: "Sat–Sun" },
  { id: 9, name: "Lalmuanawma", title: "Python & Data Science", skills: ["Python", "Pandas", "ML basics"], cat: "coding",
    rating: 4.7, sessions: 64, rate: 480, img: teacher9,
    bio: "Data scientist who teaches Python the boring-but-correct way. Bring a dataset.",
    badges: ["Verified"], availability: "Mon–Thu · nights" },
];

/* The interview panel is ALWAYS Shiksha admin staff — never directory teachers. */
export const PANEL = [
  { name: "Lalengmawii Ralte", role: "Admin · Screening Lead", img: admin1 },
  { name: "Vanlalruatkima", role: "Admin · Faculty Reviewer", img: admin2 },
];

export const STAGES = [
  { key: "application", label: "Application", desc: "Profile & skills submitted" },
  { key: "eligibility", label: "Eligibility", desc: "Docs & ID checked" },
  { key: "interview",   label: "Interview",   desc: "Live screening + demo" },
  { key: "decision",    label: "Decision",    desc: "Result & onboarding" },
];

export const RUBRIC = [
  { key: "subject", label: "Subject knowledge",       hint: "Depth & accuracy in their skill" },
  { key: "comm",    label: "Communication & clarity", hint: "Explains simply, good pace" },
  { key: "method",  label: "Teaching method / demo",  hint: "Quality of the demo segment" },
  { key: "engage",  label: "Student engagement",      hint: "Energy, checks for understanding" },
  { key: "prof",    label: "Professionalism",         hint: "Punctual, prepared, courteous" },
];

export const AGENDA = [
  { key: "intro", label: "Intro & background", mins: "0–5 min" },
  { key: "qa",    label: "Subject Q&A",        mins: "5–15 min" },
  { key: "demo",  label: "Demo teaching",      mins: "15–25 min" },
  { key: "wrap",  label: "Candidate questions & wrap", mins: "25–30 min" },
];

export const TIERS = [
  { key: "standard", label: "Standard", range: "₹350–450", note: "New to the platform" },
  { key: "senior",   label: "Senior",   range: "₹450–600", note: "Strong, experienced" },
  { key: "expert",   label: "Expert",   range: "₹600+",    note: "Exceptional / specialist" },
];

export const CANDIDATES = [
  { id: "c1", name: "Lalrinpuia Sailo", skill: "Python & Data Science", cat: "Coding",
    img: teacher9, time: "Today · 4:30 PM", status: "ready", exp: "3–5 yrs" },
  { id: "c2", name: "Ruth Vanlalhriati", skill: "Spoken English", cat: "Languages",
    img: teacher2, time: "Today · 5:15 PM", status: "scheduled", exp: "5–10 yrs" },
  { id: "c3", name: "Malsawmtluanga", skill: "Acoustic Guitar", cat: "Music",
    img: teacher5, time: "Tomorrow · 11:00 AM", status: "scheduled", exp: "1–3 yrs" },
  { id: "c4", name: "Esther Lalruatfeli", skill: "Watercolour", cat: "Crafts",
    img: teacher6, time: "Reviewed · yesterday", status: "approved", exp: "3–5 yrs" },
  { id: "c5", name: "Vanlalruata", skill: "UPSC GS", cat: "Exam prep",
    img: teacher4, time: "Reviewed · 2 days ago", status: "hold", exp: "1–3 yrs" },
];

export const DEFAULT_APPLICANT = {
  name: "Lalrinpuia Sailo",
  skill: "Python & Data Science",
  category: "coding",
  headline: "Data analyst · ex-Wipro · 4 yrs",
  experience: "3–5 years",
  img: teacher9,
};

/* ── Self-paced courses (Udemy-style), one per expert ──────────────
   Keyed by teacher id. Mirrors the shape the wired Profile reads, so
   skillApi.fetchExpertCourse() can return either these (mock) or the
   normalized payload from GET /skill/courses/ (real backend). */
export const COURSES = {
  1: { title: "The Complete Web Developer: Ship Real Projects", price: 1499, old: 4999, hours: 18, lectures: 96, level: "Beginner to Intermediate", students: 1240, rating: 4.8, ratingCount: 312, updated: "May 2026",
    learn: ["Build & deploy a full-stack app from scratch", "Write clean React components and hooks", "Design a REST API with Node & Express", "Work with databases and authentication", "Use Git and ship to production", "Debug like a working developer"],
    curriculum: [
      { t: "Getting set up & the web basics", l: [{ n: "How the web actually works", d: "08:12", p: true }, { n: "Your developer toolkit", d: "11:40", p: true }, { n: "HTML & CSS speed-run", d: "22:05" }, { n: "Project: your first page", d: "14:30" }] },
      { t: "JavaScript that sticks", l: [{ n: "Variables, functions, the DOM", d: "19:18" }, { n: "Async, fetch & APIs", d: "16:44" }, { n: "Project: weather widget", d: "21:10" }] },
      { t: "React, end to end", l: [{ n: "Components & props", d: "17:55" }, { n: "State & hooks", d: "23:02" }, { n: "Routing & data fetching", d: "18:39" }, { n: "Project: build the UI", d: "26:14" }] },
      { t: "Backend & shipping", l: [{ n: "Node & Express API", d: "20:11" }, { n: "Database & auth", d: "24:48" }, { n: "Deploy to production", d: "15:30" }] },
    ] },
  2: { title: "IELTS 7+ : Speaking & Writing Bootcamp", price: 1299, old: 3999, hours: 12, lectures: 74, level: "All levels", students: 2110, rating: 4.9, ratingCount: 540, updated: "Apr 2026",
    learn: ["Hit Band 7+ in Speaking and Writing", "Master the patterns examiners score", "Structure Task 1 & Task 2 essays fast", "Speak fluently under time pressure", "Build an academic vocabulary that fits", "Sit two full mock tests with feedback"],
    curriculum: [
      { t: "Know the test", l: [{ n: "How IELTS is actually scored", d: "09:20", p: true }, { n: "The band descriptors decoded", d: "13:05", p: true }] },
      { t: "Speaking that scores", l: [{ n: "Parts 1, 2 & 3 walkthrough", d: "18:40" }, { n: "Fluency & cohesion drills", d: "15:12" }, { n: "Common topics & model answers", d: "22:30" }] },
      { t: "Writing that scores", l: [{ n: "Task 1: charts & process", d: "19:55" }, { n: "Task 2: opinion & discussion", d: "24:10" }, { n: "Editing for accuracy", d: "14:08" }] },
      { t: "Mock tests", l: [{ n: "Full mock test 1 + review", d: "28:00" }, { n: "Full mock test 2 + review", d: "27:30" }] },
    ] },
  3: { title: "UI/UX Design: From Brief to Portfolio", price: 1799, old: 5499, hours: 15, lectures: 82, level: "Beginner to Intermediate", students: 760, rating: 4.9, ratingCount: 188, updated: "May 2026",
    learn: ["Run a real design process end-to-end", "Do UX research that informs decisions", "Design clean interfaces in Figma", "Build a component library & system", "Present work like a pro", "Ship a portfolio-ready case study"],
    curriculum: [
      { t: "Design foundations", l: [{ n: "What good design solves", d: "10:15", p: true }, { n: "Figma from zero", d: "19:30", p: true }, { n: "Layout, type & colour", d: "21:05" }] },
      { t: "Research & UX", l: [{ n: "Interviews & insights", d: "17:22" }, { n: "Flows & wireframes", d: "20:48" }] },
      { t: "Visual & systems", l: [{ n: "Components & variants", d: "23:14" }, { n: "Building a design system", d: "25:40" }] },
      { t: "Portfolio", l: [{ n: "Case study structure", d: "16:10" }, { n: "Presenting to clients", d: "18:05" }] },
    ] },
  4: { title: "UPSC Mains: Answer-Writing Masterclass", price: 1599, old: 4499, hours: 14, lectures: 68, level: "Intermediate", students: 1480, rating: 4.7, ratingCount: 402, updated: "Mar 2026",
    learn: ["Build a repeatable answer-writing rhythm", "Structure GS answers under time", "Enrich answers with the right examples", "Write essays that hold together", "Manage the long prep without burning out", "Practise with model answers & feedback"],
    curriculum: [
      { t: "The Mains mindset", l: [{ n: "How Mains is evaluated", d: "11:50", p: true }, { n: "Building your daily rhythm", d: "14:25", p: true }] },
      { t: "GS answer-writing", l: [{ n: "Intro–body–conclusion that works", d: "19:10" }, { n: "Diagrams, data & examples", d: "21:35" }, { n: "10 marker vs 15 marker", d: "17:48" }] },
      { t: "Essay paper", l: [{ n: "Picking & planning the essay", d: "18:20" }, { n: "Two model essays dissected", d: "24:05" }] },
      { t: "Staying the course", l: [{ n: "Revision & test series plan", d: "15:40" }] },
    ] },
  5: { title: "Acoustic Guitar: Play Your First Songs", price: 999, old: 2999, hours: 10, lectures: 58, level: "Absolute beginner", students: 1920, rating: 4.9, ratingCount: 610, updated: "Apr 2026",
    learn: ["Hold, tune and care for your guitar", "Play your first open chords cleanly", "Strum common patterns in time", "Switch chords smoothly", "Play 5 real songs start to finish", "Read chord charts on your own"],
    curriculum: [
      { t: "Day one", l: [{ n: "Parts of the guitar & tuning", d: "09:05", p: true }, { n: "Your first three chords", d: "15:20", p: true }] },
      { t: "Strumming & timing", l: [{ n: "Basic strum patterns", d: "17:10" }, { n: "Keeping time with a metronome", d: "12:48" }] },
      { t: "Chord changes", l: [{ n: "Smooth transitions", d: "18:35" }, { n: "The dreaded F chord, simplified", d: "14:02" }] },
      { t: "Play real songs", l: [{ n: "Song 1 & 2 walkthrough", d: "22:15" }, { n: "Song 3, 4 & 5", d: "26:40" }] },
    ] },
  6: { title: "Watercolour Basics: Finish Small Paintings", price: 899, old: 2499, hours: 8, lectures: 46, level: "Absolute beginner", students: 540, rating: 4.8, ratingCount: 142, updated: "Mar 2026",
    learn: ["Set up a simple watercolour kit", "Control water, pigment and edges", "Mix colours with confidence", "Paint loose, finished little studies", "Sketch quickly before you paint", "Complete 6 small paintings"],
    curriculum: [
      { t: "Materials & marks", l: [{ n: "What you actually need", d: "08:40", p: true }, { n: "Washes, wet-on-wet, dry brush", d: "16:15", p: true }] },
      { t: "Colour & control", l: [{ n: "Mixing without mud", d: "15:30" }, { n: "Edges, lifting & saving whites", d: "14:22" }] },
      { t: "Small finished pieces", l: [{ n: "A leaf & a lemon", d: "19:10" }, { n: "A little landscape", d: "21:05" }, { n: "A loose floral", d: "18:48" }] },
    ] },
  7: { title: "Confident Public Speaking & Interviews", price: 1099, old: 3299, hours: 9, lectures: 52, level: "All levels", students: 880, rating: 4.8, ratingCount: 206, updated: "May 2026",
    learn: ["Beat nerves before you speak", "Structure a talk that lands", "Use voice, pace and pauses", "Answer interview questions calmly", "Tell stories that persuade", "Handle Q&A and tough questions"],
    curriculum: [
      { t: "Foundations of confidence", l: [{ n: "Why we freeze — and the fix", d: "10:30", p: true }, { n: "Breathing & warm-ups", d: "11:48", p: true }] },
      { t: "Building the talk", l: [{ n: "Open, body, close", d: "17:20" }, { n: "Storytelling that sticks", d: "19:05" }] },
      { t: "Delivery", l: [{ n: "Voice, pace & pauses", d: "16:40" }, { n: "Body language", d: "13:15" }] },
      { t: "Interviews & Q&A", l: [{ n: "Common questions, strong answers", d: "20:10" }, { n: "Handling tough questions", d: "15:55" }] },
    ] },
  8: { title: "Personal Finance & GST, Demystified", price: 1399, old: 3999, hours: 11, lectures: 60, level: "Beginner", students: 1030, rating: 4.9, ratingCount: 248, updated: "Apr 2026",
    learn: ["Read a simple set of books", "Understand GST without the jargon", "File the basics with confidence", "Budget and plan personal finances", "Set up a small business correctly", "Avoid the common tax mistakes"],
    curriculum: [
      { t: "Money basics", l: [{ n: "Where your money goes", d: "09:50", p: true }, { n: "Budgeting that survives real life", d: "14:30", p: true }] },
      { t: "Books & accounts", l: [{ n: "Debits, credits, plain English", d: "18:25" }, { n: "Reading a P&L and balance sheet", d: "20:10" }] },
      { t: "GST, simply", l: [{ n: "What GST is and who pays", d: "16:40" }, { n: "Invoices, returns & deadlines", d: "21:35" }] },
      { t: "Starting up", l: [{ n: "Registering a small business", d: "15:20" }] },
    ] },
  9: { title: "Python for Data Science, Done Right", price: 1699, old: 4999, hours: 16, lectures: 88, level: "Beginner to Intermediate", students: 690, rating: 4.7, ratingCount: 174, updated: "May 2026",
    learn: ["Write clean, correct Python", "Wrangle data with Pandas", "Visualise data clearly", "Understand the ML basics", "Build a small end-to-end project", "Avoid the beginner data traps"],
    curriculum: [
      { t: "Python that's correct", l: [{ n: "Setup & the right habits", d: "10:20", p: true }, { n: "Data types & control flow", d: "19:40", p: true }, { n: "Functions & files", d: "17:12" }] },
      { t: "Data with Pandas", l: [{ n: "Series & DataFrames", d: "21:30" }, { n: "Cleaning real, messy data", d: "24:05" }, { n: "Grouping & joining", d: "18:50" }] },
      { t: "See & model", l: [{ n: "Plotting clearly", d: "16:35" }, { n: "ML basics, honestly", d: "22:18" }] },
      { t: "Project", l: [{ n: "End-to-end mini project", d: "25:40" }] },
    ] },
};

/* Short review lists shown on the profile (the count below is the real total). */
export const REVIEWS = {
  1: [{ n: "Ruati", r: 5, t: "Patient and structured. Booked five more sessions after the first." }, { n: "Laldin", r: 5, t: "Project-first approach actually got me shipping." }],
  2: [{ n: "Andrew", r: 5, t: "My IELTS speaking went 6 to 7.5. She drills exactly what examiners score." }, { n: "Mary", r: 5, t: "Calm, clear and very organised." }],
  3: [{ n: "Esther", r: 5, t: "Honest portfolio feedback I couldn't get anywhere else in Aizawl." }],
  4: [{ n: "Vana", r: 5, t: "Kept me sane through Mains prep. Answer-writing rhythm works." }],
  5: [{ n: "Zovi", r: 5, t: "Had me playing a real song by week two. So fun." }],
  6: [{ n: "Kimi", r: 5, t: "Lovely teacher — I finished three small paintings already." }],
  7: [{ n: "David", r: 5, t: "My interview confidence shot up. Great drills." }],
  8: [{ n: "Lalrin", r: 5, t: "Finally understood GST without the jargon. Worth every rupee." }],
  9: [{ n: "Sangi", r: 5, t: "Boring-but-correct Python — exactly what I needed." }],
};

export const reviewCount = { 1: 38, 2: 54, 3: 21, 4: 41, 5: 29, 6: 14, 7: 18, 8: 33, 9: 16 };
