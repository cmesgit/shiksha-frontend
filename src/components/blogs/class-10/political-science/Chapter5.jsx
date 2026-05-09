import { useState } from "react";

const FontLink = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@500;600;700&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
);

const styles = `
  :root {
    --pp-mid:      #0a0f1e;
    --pp-mid2:     #060c18;
    --pp-mid3:     #111827;
    --pp-navy:     #1e2d4a;
    --pp-navy2:    #162038;
    --pp-gold:     #f5b800;
    --pp-gold2:    #d49e00;
    --pp-gold3:    #a07800;
    --pp-gold-lt:  #fffbeb;
    --pp-gold-md:  #fef08a;
    --pp-ivory:    #fafaf7;
    --pp-ivory2:   #f2f1ec;
    --pp-ivory3:   #e8e6df;
    --pp-ink:      #0f1014;
    --pp-ink2:     #1a1d26;
    --pp-muted:    #6b7280;
    --pp-rule:     #ddd9ce;
    --pp-red:      #dc2626;
    --pp-red-lt:   #fef2f2;
    --pp-green:    #059669;
    --pp-green-lt: #ecfdf5;
    --pp-blue:     #2563eb;
    --pp-blue-lt:  #eff6ff;
    --pp-white:    #ffffff;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .pp-root {
    font-family: 'Inter', sans-serif;
    background: var(--pp-ivory);
    color: var(--pp-ink);
    min-height: 100vh;
  }

  /* ══════════════════════════════════════
     HERO
  ══════════════════════════════════════ */
  .pp-hero {
    background: var(--pp-mid2);
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    position: relative; overflow: hidden;
  }
  /* gold top stripe */
  .pp-hero::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 5px;
    background: linear-gradient(90deg, var(--pp-gold3), var(--pp-gold), #ffe566, var(--pp-gold), var(--pp-gold3));
  }
  /* ghost "6" */
  .pp-hero-ghost {
    position: absolute; right: -20px; bottom: -40px;
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(220px, 36vw, 480px); font-weight: 900; line-height: 1;
    color: rgba(245,184,0,0.05); letter-spacing: -0.06em;
    pointer-events: none; user-select: none;
  }
  /* subtle radial gold glow top-right */
  .pp-hero-glow {
    position: absolute; top: -100px; right: -100px;
    width: 480px; height: 480px; border-radius: 50%;
    background: radial-gradient(circle, rgba(245,184,0,0.10) 0%, transparent 65%);
    pointer-events: none;
  }

  /* Nav */
  .pp-hero-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 28px 52px 0; position: relative; z-index: 2;
  }
  .pp-nav-brand {
    font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 900;
    letter-spacing: 0.28em; text-transform: uppercase;
    color: rgba(255,255,255,0.25);
  }
  .pp-nav-pill {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--pp-gold); border: 1px solid rgba(245,184,0,0.35);
    padding: 5px 14px; background: rgba(245,184,0,0.07);
  }

  /* Center */
  .pp-hero-center {
    display: flex; flex-direction: column; justify-content: center;
    padding: 40px 52px 0; position: relative; z-index: 2;
  }
  .pp-hero-eyebrow {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.26em; text-transform: uppercase;
    color: var(--pp-gold); margin-bottom: 22px;
    display: flex; align-items: center; gap: 12px;
  }
  .pp-hero-eyebrow::before {
    content: ''; width: 28px; height: 2px; background: var(--pp-gold); flex-shrink: 0;
  }
  .pp-hero-h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(42px, 8vw, 100px);
    font-weight: 900; line-height: 0.9;
    letter-spacing: -0.04em; color: #fff;
    margin-bottom: 32px;
  }
  .pp-hero-h1 span { color: var(--pp-gold); }
  .pp-hero-deck {
    font-family: 'Inter', sans-serif; font-size: 17px; line-height: 1.74;
    color: rgba(255,255,255,0.46); max-width: 580px; margin-bottom: 48px;
    border-left: 3px solid rgba(245,184,0,0.4); padding-left: 20px;
  }
  .pp-hero-deck strong { color: rgba(255,255,255,0.78); font-weight: 500; }

  /* Stat strip */
  .pp-hero-stats {
    display: grid; grid-template-columns: repeat(4,1fr);
    border-top: 1px solid rgba(255,255,255,0.07);
  }
  .pp-hero-stat {
    padding: 22px 24px;
    border-right: 1px solid rgba(255,255,255,0.06);
  }
  .pp-hero-stat:last-child { border-right: none; }
  .pp-hstat-val {
    font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900;
    color: var(--pp-gold); line-height: 1; margin-bottom: 5px;
    letter-spacing: -0.02em;
  }
  .pp-hstat-label {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.13em; text-transform: uppercase;
    color: rgba(255,255,255,0.22);
  }

  /* Bottom bar */
  .pp-hero-bottom {
    padding: 16px 52px;
    display: flex; align-items: center; flex-wrap: wrap; gap: 0;
    border-top: 1px solid rgba(255,255,255,0.05);
    position: relative; z-index: 2;
  }
  .pp-hbtm-item {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(255,255,255,0.18); white-space: nowrap;
    padding: 4px 18px 4px 0; margin-right: 18px;
    border-right: 1px solid rgba(255,255,255,0.08);
  }
  .pp-hbtm-item:last-child { border-right: none; }

  /* ══════════════════════════════════════
     BODY
  ══════════════════════════════════════ */
  .pp-body { max-width: 980px; margin: 0 auto; padding: 80px 32px 100px; }

  /* ── SECTION OPENER ── */
  .pp-sec {
    display: flex; align-items: stretch; gap: 0;
    margin-bottom: 36px;
  }
  .pp-sec-accent { width: 5px; background: var(--pp-gold); flex-shrink: 0; }
  .pp-sec-inner {
    flex: 1; background: var(--pp-gold-lt);
    border: 1px solid #fde68a; border-left: none;
    padding: 11px 20px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .pp-sec-left { display: flex; align-items: center; gap: 14px; }
  .pp-sec-num {
    font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 900;
    letter-spacing: 0.12em; color: var(--pp-white);
    background: var(--pp-mid); padding: 4px 10px; flex-shrink: 0;
  }
  .pp-sec-name {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--pp-gold3);
  }
  .pp-sec-aside {
    font-family: 'Inter', sans-serif; font-size: 11px;
    color: var(--pp-gold3); font-style: italic;
  }

  /* ── H2 ── */
  .pp-h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(24px, 3.5vw, 40px); font-weight: 900;
    line-height: 1.05; letter-spacing: -0.025em;
    color: var(--pp-ink); margin-bottom: 20px;
  }
  .pp-h2 em { font-style: normal; color: var(--pp-gold3); }
  .pp-h2 .r { color: var(--pp-red); }
  .pp-h2 .b { color: var(--pp-blue); }

  /* ── PROSE ── */
  .pp-prose {
    font-family: 'Inter', sans-serif; font-size: 17px;
    color: var(--pp-ink2); line-height: 1.82; margin-bottom: 24px;
  }
  .pp-prose strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--pp-ink); }

  /* ── DIVIDER ── */
  .pp-div {
    height: 1px; background: var(--pp-rule); margin: 56px 0;
    position: relative;
  }
  .pp-div::after {
    content: '';
    position: absolute; left: 50%; top: 50%;
    transform: translate(-50%,-50%);
    width: 8px; height: 8px;
    background: var(--pp-gold); clip-path: polygon(50% 0,100% 50%,50% 100%,0 50%);
  }

  /* ── DEFINITION BLOCK ── */
  .pp-def {
    background: var(--pp-mid); padding: 40px 44px; margin-bottom: 40px;
    position: relative; overflow: hidden;
  }
  .pp-def::after {
    content: '"'; position: absolute; right: 20px; top: -20px;
    font-family: 'Georgia', serif; font-size: 160px; line-height: 1;
    color: rgba(245,184,0,0.07); pointer-events: none;
  }
  .pp-def-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--pp-gold); margin-bottom: 12px;
  }
  .pp-def-text {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(16px, 2.2vw, 20px); font-weight: 800;
    color: #fff; line-height: 1.48; position: relative; z-index: 1;
    margin-bottom: 20px;
  }
  .pp-def-text em { font-style: normal; color: var(--pp-gold); }
  .pp-def-components {
    display: flex; gap: 0;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding-top: 16px;
  }
  .pp-def-comp {
    flex: 1; padding: 0 20px 0 0; margin-right: 20px;
    border-right: 1px solid rgba(255,255,255,0.08);
  }
  .pp-def-comp:last-child { border-right: none; margin-right: 0; padding-right: 0; }
  .pp-def-comp-icon { font-size: 18px; margin-bottom: 6px; }
  .pp-def-comp-title {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase; color: var(--pp-gold);
    margin-bottom: 4px;
  }
  .pp-def-comp-body {
    font-family: 'Inter', sans-serif; font-size: 13px;
    color: rgba(255,255,255,0.50); line-height: 1.55;
  }

  /* ── FUNCTIONS — numbered row layout ── */
  .pp-functions {
    margin-bottom: 40px;
    border: 1px solid var(--pp-rule); overflow: hidden;
  }
  .pp-func-header {
    background: var(--pp-mid2); padding: 14px 24px;
    display: flex; align-items: center; gap: 12px;
  }
  .pp-func-header-title {
    font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 900;
    color: #fff; letter-spacing: -0.01em;
  }
  .pp-func-header-sub {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: rgba(255,255,255,0.3); margin-left: auto;
  }
  .pp-func-row {
    display: grid; grid-template-columns: 56px 1fr;
    border-bottom: 1px solid var(--pp-rule);
    background: var(--pp-white);
    align-items: stretch;
  }
  .pp-func-row:last-child { border-bottom: none; }
  .pp-func-row:nth-child(even) { background: var(--pp-ivory); }
  .pp-func-num {
    display: flex; align-items: center; justify-content: center;
    font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 900;
    color: var(--pp-gold3); background: var(--pp-gold-lt);
    border-right: 1px solid var(--pp-rule);
  }
  .pp-func-content { padding: 14px 20px; }
  .pp-func-head {
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    color: var(--pp-ink); margin-bottom: 4px;
  }
  .pp-func-body {
    font-family: 'Inter', sans-serif; font-size: 13px;
    color: var(--pp-muted); line-height: 1.58;
  }
  .pp-func-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--pp-ink2); }

  /* ── PARTY SYSTEM — 3 panel compare ── */
  .pp-systems {
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    gap: 0; margin-bottom: 40px;
    border: 1px solid var(--pp-rule); overflow: hidden;
  }
  .pp-sys {
    padding: 0; border-right: 1px solid var(--pp-rule);
    display: flex; flex-direction: column;
  }
  .pp-sys:last-child { border-right: none; }
  .pp-sys-header {
    padding: 18px 20px;
    border-bottom: 1px solid var(--pp-rule);
  }
  .pp-sys:nth-child(1) .pp-sys-header { background: var(--pp-red); }
  .pp-sys:nth-child(2) .pp-sys-header { background: var(--pp-mid); }
  .pp-sys:nth-child(3) .pp-sys-header { background: var(--pp-navy); }
  .pp-sys-tag {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(255,255,255,0.55); margin-bottom: 6px;
  }
  .pp-sys-title {
    font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 900;
    color: #fff; letter-spacing: -0.02em; line-height: 1.1;
  }
  .pp-sys-body {
    padding: 16px 20px; flex: 1; background: var(--pp-white);
  }
  .pp-sys-item {
    font-family: 'Inter', sans-serif; font-size: 13px;
    color: var(--pp-ink2); line-height: 1.60;
    padding: 7px 0; border-bottom: 1px solid var(--pp-ivory3);
    display: flex; gap: 8px;
  }
  .pp-sys-item:last-child { border-bottom: none; }
  .pp-sys-item strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--pp-ink); }
  .pp-sys-bullet { flex-shrink: 0; color: var(--pp-gold2); margin-top: 2px; font-size: 11px; }
  .pp-sys-footer {
    padding: 10px 16px;
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    display: flex; align-items: center; gap: 6px;
  }
  .pp-sys:nth-child(1) .pp-sys-footer { background: var(--pp-red-lt); color: var(--pp-red); }
  .pp-sys:nth-child(2) .pp-sys-footer { background: var(--pp-gold-lt); color: var(--pp-gold3); }
  .pp-sys:nth-child(3) .pp-sys-footer { background: var(--pp-blue-lt); color: var(--pp-blue); }

  /* ── NATIONAL PARTIES — ID card style ── */
  .pp-parties-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 12px; margin-bottom: 40px;
  }
  .pp-party-card {
    border: 1px solid var(--pp-rule);
    background: var(--pp-white); overflow: hidden;
    display: flex; flex-direction: column;
  }
  .pp-party-header {
    padding: 16px 20px;
    display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
  }
  .pp-party-card:nth-child(1) .pp-party-header { background: var(--pp-mid2); }
  .pp-party-card:nth-child(2) .pp-party-header { background: #7b1d1d; }
  .pp-party-card:nth-child(3) .pp-party-header { background: #1e3a5f; }
  .pp-party-card:nth-child(4) .pp-party-header { background: #14532d; }
  .pp-party-card:nth-child(5) .pp-party-header { background: #3b2300; }
  .pp-party-card:nth-child(6) .pp-party-header { background: #312e81; }

  .pp-party-header-text {}
  .pp-party-abbr {
    font-family: 'Montserrat', sans-serif; font-size: 28px; font-weight: 900;
    color: rgba(255,255,255,0.18); letter-spacing: -0.02em; line-height: 1;
    flex-shrink: 0; align-self: center;
  }
  .pp-party-founded {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: rgba(255,255,255,0.55); margin-bottom: 6px;
  }
  .pp-party-name {
    font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 900;
    color: #fff; letter-spacing: -0.01em; line-height: 1.25;
  }
  .pp-party-ideology {
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 500;
    color: rgba(255,255,255,0.65); margin-top: 5px;
    letter-spacing: 0.01em;
  }

  .pp-party-body { padding: 14px 18px; flex: 1; }
  .pp-party-row {
    display: flex; gap: 8px; align-items: flex-start;
    padding: 6px 0; border-bottom: 1px solid var(--pp-ivory3);
  }
  .pp-party-row:last-child { border-bottom: none; }
  .pp-party-row-icon { font-size: 14px; flex-shrink: 0; margin-top: 1px; }
  .pp-party-row-text {
    font-family: 'Inter', sans-serif; font-size: 13px;
    color: var(--pp-ink2); line-height: 1.55;
  }
  .pp-party-row-text strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--pp-ink); }

  .pp-party-footer {
    padding: 9px 18px; background: var(--pp-ivory);
    border-top: 1px solid var(--pp-rule);
    font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--pp-muted);
  }

  /* ── CHALLENGES — dossier style ── */
  .pp-dossier {
    margin-bottom: 40px; overflow: hidden;
  }
  .pp-dossier-stamp {
    background: var(--pp-red);
    padding: 12px 24px;
    display: flex; align-items: center; gap: 14px;
  }
  .pp-dossier-stamp-tag {
    font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 900;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(255,255,255,0.65);
    border: 2px solid rgba(255,255,255,0.35); padding: 3px 10px; flex-shrink: 0;
  }
  .pp-dossier-stamp-title {
    font-family: 'Montserrat', sans-serif; font-size: 16px; font-weight: 900;
    color: #fff; letter-spacing: -0.01em;
  }
  .pp-dossier-body {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0; border: 1px solid var(--pp-rule); border-top: none;
  }
  .pp-challenge {
    padding: 22px 24px;
    border-right: 1px solid var(--pp-rule);
    border-bottom: 1px solid var(--pp-rule);
    background: var(--pp-white);
  }
  .pp-challenge:nth-child(2n) { border-right: none; }
  .pp-challenge:nth-last-child(-n+2) { border-bottom: none; }
  .pp-challenge-icon { font-size: 24px; margin-bottom: 10px; }
  .pp-challenge-num {
    font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 900;
    color: var(--pp-red); letter-spacing: 0.08em; margin-bottom: 6px;
  }
  .pp-challenge-title {
    font-family: 'Montserrat', sans-serif; font-size: 15px; font-weight: 900;
    color: var(--pp-ink); margin-bottom: 10px; letter-spacing: -0.01em;
    padding-bottom: 8px; border-bottom: 2px solid var(--pp-red);
  }
  .pp-challenge-body {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: var(--pp-muted); line-height: 1.66;
  }
  .pp-challenge-body strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--pp-ink2); }

  /* ── REFORM — amendment sheet ── */
  .pp-reform {
    margin-bottom: 40px;
    border: 2px solid var(--pp-gold); overflow: hidden;
  }
  .pp-reform-header {
    background: var(--pp-gold); padding: 14px 24px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .pp-reform-header-title {
    font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 900;
    color: var(--pp-mid); letter-spacing: -0.01em;
  }
  .pp-reform-header-sub {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--pp-gold3);
  }
  .pp-reform-body {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0;
  }
  .pp-reform-col { padding: 22px 24px; background: var(--pp-white); }
  .pp-reform-col:first-child { border-right: 1px solid var(--pp-rule); }
  .pp-reform-col-head {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--pp-gold3); margin-bottom: 14px;
    padding-bottom: 8px; border-bottom: 1px solid var(--pp-ivory3);
  }
  .pp-reform-item {
    display: flex; gap: 10px; align-items: flex-start;
    padding: 8px 0; border-bottom: 1px solid var(--pp-ivory3);
  }
  .pp-reform-item:last-child { border-bottom: none; }
  .pp-reform-bullet {
    width: 6px; height: 6px; background: var(--pp-gold);
    clip-path: polygon(50% 0,100% 50%,50% 100%,0 50%);
    flex-shrink: 0; margin-top: 7px;
  }
  .pp-reform-text {
    font-family: 'Inter', sans-serif; font-size: 14px;
    color: var(--pp-ink2); line-height: 1.62;
  }
  .pp-reform-text strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--pp-ink); }

  /* ── ALERT ── */
  .pp-alert {
    padding: 16px 22px; margin-bottom: 22px;
    display: flex; gap: 14px; align-items: flex-start;
  }
  .pp-alert.gold  { background: var(--pp-gold-lt);  border-left: 4px solid var(--pp-gold2); }
  .pp-alert.red   { background: var(--pp-red-lt);   border-left: 4px solid var(--pp-red); }
  .pp-alert.green { background: var(--pp-green-lt); border-left: 4px solid var(--pp-green); }
  .pp-alert.blue  { background: var(--pp-blue-lt);  border-left: 4px solid var(--pp-blue); }
  .pp-alert-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
  .pp-alert-text { font-family: 'Inter', sans-serif; font-size: 15px; color: var(--pp-ink2); line-height: 1.66; }
  .pp-alert-text strong { font-family: 'Poppins', sans-serif; font-weight: 700; color: var(--pp-ink); }

  /* ── PULL ── */
  .pp-pull {
    background: var(--pp-mid); padding: 44px 48px; margin-bottom: 44px;
    position: relative; overflow: hidden;
  }
  .pp-pull::before {
    content: '"'; position: absolute; left: 16px; top: -8px;
    font-family: 'Georgia', serif; font-size: 160px; line-height: 1;
    color: rgba(245,184,0,0.08); pointer-events: none;
  }
  .pp-pull-q {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(17px, 2.5vw, 22px); font-weight: 900;
    color: #fff; line-height: 1.42; margin-bottom: 12px;
    position: relative; z-index: 1;
  }
  .pp-pull-q em { font-style: normal; color: var(--pp-gold); }
  .pp-pull-attr {
    font-family: 'Inter', sans-serif; font-size: 13px;
    color: rgba(255,255,255,0.38);
  }

  /* ── FAQ ── */
  .pp-faq-opener {
    display: flex; align-items: stretch; gap: 0; margin-bottom: 16px;
  }
  .pp-faq-acc { width: 5px; background: var(--pp-gold); flex-shrink: 0; }
  .pp-faq-opener-inner {
    flex: 1; background: var(--pp-gold-lt);
    border: 1px solid #fde68a; border-left: none;
    padding: 12px 22px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .pp-faq-tag {
    font-family: 'Poppins', sans-serif; font-size: 10px; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; color: var(--pp-gold3);
  }
  .pp-faq-sub { font-family: 'Inter', sans-serif; font-size: 12px; color: var(--pp-muted); }
  .pp-faq-h2 {
    font-family: 'Montserrat', sans-serif; font-size: 32px; font-weight: 900;
    color: var(--pp-ink); letter-spacing: -0.025em; margin-bottom: 24px;
  }
  .pp-faq-item { border-bottom: 1px solid var(--pp-rule); }
  .pp-faq-item:first-of-type { border-top: 1px solid var(--pp-rule); }
  .pp-faq-item.open { border-left: 4px solid var(--pp-gold); margin-left: -4px; }
  .pp-faq-q {
    width: 100%; display: flex; justify-content: space-between;
    align-items: flex-start; gap: 20px;
    padding: 18px 0; background: none; border: none; cursor: pointer; text-align: left;
  }
  .pp-faq-item.open .pp-faq-q { padding-left: 14px; }
  .pp-faq-q-text {
    font-family: 'Poppins', sans-serif; font-size: 15px; font-weight: 600;
    color: var(--pp-ink2); line-height: 1.45; flex: 1;
  }
  .pp-faq-item.open .pp-faq-q-text { color: var(--pp-gold3); }
  .pp-faq-icon { font-size: 18px; color: var(--pp-gold2); flex-shrink: 0; margin-top: 2px; }
  .pp-faq-ans { max-height: 0; overflow: hidden; transition: max-height 0.34s ease; }
  .pp-faq-ans.open { max-height: 1000px; }
  .pp-faq-ans-inner {
    padding: 2px 0 22px 14px;
    font-family: 'Inter', sans-serif; font-size: 15px;
    color: var(--pp-muted); line-height: 1.80;
  }
  .pp-faq-ans-inner strong { color: var(--pp-ink2); font-family: 'Poppins', sans-serif; font-weight: 600; }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .pp-hero-nav, .pp-hero-center, .pp-hero-bottom { padding-left: 28px; padding-right: 28px; }
    .pp-hero-stats { grid-template-columns: 1fr 1fr; }
    .pp-hero-stat:nth-child(2) { border-right: none; }
    .pp-hero-stat:nth-child(3) { border-top: 1px solid rgba(255,255,255,0.06); }
    .pp-parties-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .pp-hero { min-height: auto; }
    .pp-hero-nav { padding: 18px 18px 0; flex-direction: column; align-items: flex-start; gap: 10px; }
    .pp-hero-center { padding: 28px 18px 0; }
    .pp-hero-h1 { font-size: clamp(36px, 10vw, 64px); margin-bottom: 22px; }
    .pp-hero-deck { font-size: 15px; max-width: 100%; margin-bottom: 28px; }
    .pp-hero-bottom { padding: 12px 18px; }
    .pp-hbtm-item { font-size: 9px; padding: 3px 12px 3px 0; margin-right: 12px; }
    .pp-body { padding: 48px 18px 72px; }
    .pp-systems { grid-template-columns: 1fr; }
    .pp-sys { border-right: none; border-bottom: 1px solid var(--pp-rule); }
    .pp-sys:last-child { border-bottom: none; }
    .pp-dossier-body { grid-template-columns: 1fr; }
    .pp-challenge { border-right: none; }
    .pp-challenge:nth-last-child(-n+2) { border-bottom: 1px solid var(--pp-rule); }
    .pp-challenge:last-child { border-bottom: none; }
    .pp-reform-body { grid-template-columns: 1fr; }
    .pp-reform-col:first-child { border-right: none; border-bottom: 1px solid var(--pp-rule); }
    .pp-def-components { flex-direction: column; gap: 16px; }
    .pp-def-comp { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 0 0 16px; margin: 0; }
    .pp-def-comp:last-child { border-bottom: none; padding-bottom: 0; }
  }
`;

const parties = [
  {
    name: "Indian National Congress",
    abbr: "INC", founded: "Est. 1885", ideology: "Centrist · Secular · Welfare",
    rows: [
      { icon: "📅", text: <><strong>Founded 1885</strong> — dominated Indian politics at national and state level for decades post-Independence.</> },
      { icon: "🏛️", text: <><strong>Ruling party</strong> at Centre till 1977, then 1980–1989. Led UPA coalition from 2004.</> },
      { icon: "⚖️", text: <>A <strong>centrist party</strong> — neither left nor right. Supports secularism, welfare of weaker sections and minorities.</> },
      { icon: "📈", text: <><strong>Supports new economic reforms</strong>. Has a pan-India presence across all states.</> },
    ],
    footer: "Alliance: United Progressive Alliance (UPA)"
  },
  {
    name: "Bharatiya Janata Party",
    abbr: "BJP", founded: "Est. 1980", ideology: "Right · Cultural Nationalism · Hindutva",
    rows: [
      { icon: "📅", text: <><strong>Founded 1980</strong> by reviving the Bharatiya Jana Sangh. Rose to national prominence in the 1990s.</> },
      { icon: "🏴", text: <><strong>Hindutva ideology</strong> — cultural nationalism defines its concept of Indian nationhood and politics.</> },
      { icon: "🗺️", text: <>Advocates <strong>full integration of J&K</strong>, uniform civil code, and ban on religious conversions.</> },
      { icon: "🏛️", text: <><strong>Led NDA</strong> — came to power in 1998. Expanded base from North/West to South, East, Northeast.</> },
    ],
    footer: "Alliance: National Democratic Alliance (NDA)"
  },
  {
    name: "Bahujan Samaj Party",
    abbr: "BSP", founded: "Est. 1984", ideology: "Social Justice · Dalit Empowerment",
    rows: [
      { icon: "📅", text: <><strong>Founded 1984</strong> under Kanshi Ram. Seeks power for dalits, adivasis, OBCs and religious minorities.</> },
      { icon: "💡", text: <>Inspired by <strong>Ambedkar, Mahatma Phule, Periyar</strong> and Sahu Maharaj's teachings on social equality.</> },
      { icon: "📍", text: <>Main base in <strong>Uttar Pradesh</strong>. Presence in MP, Chhattisgarh, Uttarakhand, Delhi and Punjab.</> },
      { icon: "🏛️", text: <><strong>Formed government in UP</strong> multiple times by allying with different parties at different times.</> },
    ],
    footer: "Base: Uttar Pradesh · Pan-India SC/ST/OBC presence"
  },
  {
    name: "Communist Party of India – Marxist",
    abbr: "CPI-M", founded: "Est. 1964", ideology: "Left · Marxism-Leninism · Secularism",
    rows: [
      { icon: "📅", text: <><strong>Founded 1964</strong>. Believes in Marxism-Leninism. Supports socialism, secularism, democracy.</> },
      { icon: "🚩", text: <>Strong support among <strong>workers, farmers, agricultural labourers and intelligentsia</strong> in West Bengal, Kerala, Tripura.</> },
      { icon: "📉", text: <>Critical of <strong>new economic policies</strong> that allow free flow of foreign capital. Opposes imperialism and communalism.</> },
      { icon: "🏛️", text: <><strong>Governed West Bengal without break for 30 years.</strong> Supported UPA from outside.</> },
    ],
    footer: "Strongholds: West Bengal · Kerala · Tripura"
  },
  {
    name: "Communist Party of India",
    abbr: "CPI", founded: "Est. 1925", ideology: "Left · Marxism-Leninism · Secularism",
    rows: [
      { icon: "📅", text: <><strong>Founded 1925</strong> — India's oldest communist party. Believes in Marxism-Leninism, secularism and democracy.</> },
      { icon: "✂️", text: <><strong>Weakened by 1964 split</strong> that led to formation of CPI(M). Support base has gradually declined.</> },
      { icon: "🤝", text: <>Advocates <strong>unity of all left parties</strong> to build a strong left front. Opposes secessionism and communalism.</> },
      { icon: "📍", text: <>Presence in <strong>Kerala, West Bengal, Punjab, Andhra Pradesh and Tamil Nadu</strong>.</> },
    ],
    footer: "Advocacy: Left front unity · Parliamentary democracy"
  },
  {
    name: "Nationalist Congress Party",
    abbr: "NCP", founded: "Est. 1999", ideology: "Centre-Left · Gandhian Secularism · Federalism",
    rows: [
      { icon: "📅", text: <><strong>Founded 1999</strong> following a split in the Congress party. Espouses Gandhian secularism and social justice.</> },
      { icon: "⚖️", text: <>Supports <strong>democracy, equity, federalism</strong> and wants high government offices confined to natural born citizens.</> },
      { icon: "📍", text: <><strong>Major party in Maharashtra</strong>. Presence in Meghalaya, Manipur and Assam.</> },
      { icon: "🤝", text: <><strong>Coalition partner with Congress</strong> in Maharashtra. Member of UPA since 2004.</> },
    ],
    footer: "Base: Maharashtra · UPA member since 2004"
  },
];

const faqs = [
  {
    q: "What is a political party? What are its components and functions?",
    a: <><strong>A political party</strong> is a group of people who come together to contest elections and hold power in government. They agree on policies and programmes for society with the view of promoting the collective good, and seek to implement these by winning popular support through elections.<br/><br/>
    <strong>Three components:</strong> Leaders · Active Members · Followers<br/><br/>
    <strong>Six functions:</strong><br/>
    1. <strong>Contest elections</strong> — parties nominate candidates to contest elections<br/>
    2. <strong>Policy formation</strong> — parties have different programmes and voters choose among them; they reduce multitudes of opinions into a few basic positions<br/>
    3. <strong>Law-making</strong> — parties debate and pass laws in the legislature<br/>
    4. <strong>Form and run governments</strong> — parties recruit, train leaders and make them ministers<br/>
    5. <strong>Shape public opinion</strong> — opinions in society are often formed along party lines<br/>
    6. <strong>Link citizens to government</strong> — parties provide access to government machinery and welfare schemes</>
  },
  {
    q: "Why are political parties necessary? What would happen without them?",
    a: <><strong>Political parties are directly linked to the emergence of representative democracy.</strong> Without them, large-scale democracies would be impossible to function. Specific reasons:<br/><br/>
    1. In a large country, <strong>millions of voters cannot directly represent themselves</strong> — parties aggregate and represent diverse views<br/>
    2. Parties <strong>gather different views on various issues</strong> and present them to the government in an organised form<br/>
    3. They <strong>bring representatives together</strong> so that a responsible government can be formed<br/>
    4. They <strong>support or restrain the government</strong> in policy formulation — acting both as ruling party and opposition<br/><br/>
    Without political parties, each legislator would be independent and it would be <strong>impossible to form stable governments</strong> or hold anyone accountable.</>
  },
  {
    q: "What are the three types of party systems? Compare them.",
    a: <><strong>One-Party System:</strong> Only one party is allowed to govern. Example: Communist Party of China. This is NOT a democratic option — it denies citizens any real choice.<br/><br/>
    <strong>Two-Party System:</strong> Power alternates between two main parties. Only they have a real chance of winning a majority. Other parties may exist but rarely win enough seats to govern. Examples: USA, UK.<br/><br/>
    <strong>Multi-Party System:</strong> Several parties compete, and more than two have a realistic chance of gaining power — either alone or in coalition with others. Government is often formed by coalitions. Allows a wider variety of interests to be represented but can lead to <strong>political instability</strong>. Example: India (NDA, UPA, Left Front).<br/><br/>
    Party systems evolve over long periods depending on the <strong>nature of society, social divisions, history of politics, and electoral system</strong>.</>
  },
  {
    q: "What makes a party a 'national party' in India? How many are there?",
    a: <><strong>A party is recognised as a National Party</strong> if it meets either of these criteria:<br/><br/>
    — Secures at least <strong>6% of total votes</strong> in Lok Sabha elections OR in Assembly elections in <strong>four or more states</strong>, AND wins at least <strong>4 seats in the Lok Sabha</strong><br/><br/>
    There are <strong>six recognised national parties in India</strong>: INC, BJP, BSP, CPI-M, CPI, and NCP.<br/><br/>
    <strong>State Party recognition:</strong> A party that secures at least 6% of votes in State Assembly elections and wins at least 2 seats is recognised as a State Party.</>
  },
  {
    q: "What are the four main challenges facing political parties?",
    a: <><strong>Challenge 1 — Lack of Internal Democracy:</strong> Power concentrates in one or few leaders at the top. Parties don't maintain membership registers, don't hold regular internal elections, and ordinary members don't get information about what happens inside. Personal loyalty to the leader matters more than loyalty to party principles.<br/><br/>
    <strong>Challenge 2 — Dynastic Succession:</strong> Top party positions are controlled by members of one family. People without adequate experience or popular support get power simply due to family connections. This is bad for democracy.<br/><br/>
    <strong>Challenge 3 — Money and Muscle Power:</strong> Parties nominate candidates who can raise lots of money. Rich people and companies that fund parties gain influence over party decisions. Some parties even support criminals who can win elections.<br/><br/>
    <strong>Challenge 4 — Decline of Meaningful Choice:</strong> Ideological differences among parties have lessened globally. The same leaders keep shifting from one party to another. Voters cannot easily distinguish between parties or elect genuinely different leadership.</>
  },
  {
    q: "What reforms have been made and what reforms are suggested for political parties?",
    a: <><strong>Reforms Already Made:</strong><br/>
    1. <strong>Anti-defection law</strong> — Constitution amended to prevent MLAs/MPs from changing parties. If they do, they lose their seat in the legislature.<br/>
    2. <strong>Affidavit requirement</strong> — Every candidate must file an affidavit disclosing their property and any criminal cases pending against them.<br/>
    3. <strong>Supreme Court orders</strong> — to reduce influence of money and criminals in elections.<br/>
    4. <strong>Election Commission orders</strong> — parties must hold organisational elections and file income tax returns.<br/><br/>
    <strong>Suggested Reforms:</strong><br/>
    1. Laws should regulate the <strong>internal affairs of political parties</strong><br/>
    2. Parties must give <strong>one-third of tickets to women candidates</strong><br/>
    3. <strong>Decision-making bodies</strong> of parties should have a quota for women<br/>
    4. The government should <strong>fund parties</strong> to support their election expenses (reducing dependence on private money)</>
  },
  {
    q: "What is the difference between a national party and a state party?",
    a: <><strong>National Party:</strong> A party recognised across the country. Must secure 6% of votes in Lok Sabha elections OR Assembly elections in 4 states, AND win 4 Lok Sabha seats. Has units in various states. Examples: INC, BJP, BSP, CPI-M, CPI, NCP.<br/><br/>
    <strong>State Party:</strong> Recognised within a specific state. Must secure 6% of votes in State Assembly elections AND win at least 2 seats. These are often all-India parties that happen to have succeeded only in certain states and regions.<br/><br/>
    <strong>Important relationship:</strong> National parties are increasingly compelled to form alliances with state parties to form governments at the Centre. This has given regional parties <strong>significant influence in national politics</strong> since the 1990s coalition era began.</>
  },
];

export default function PoliticalParties() {
  const [openIdx, setOpenIdx] = useState(null);
  const tog = (i) => setOpenIdx(openIdx === i ? null : i);

  return (
    <>
      <FontLink />
      <style>{styles}</style>
      <div className="pp-root">

        {/* ══ HERO ══ */}
        <div className="pp-hero">
          <div className="pp-hero-glow" />
          <div className="pp-hero-ghost">6</div>

          <div className="pp-hero-nav">
            <div className="pp-nav-brand">Shikshacom · Civics</div>
            <div className="pp-nav-pill">Chapter 6 · Democratic Politics II</div>
          </div>

          <div className="pp-hero-center">
            <div className="pp-hero-eyebrow">CBSE Class 10 · Political Science</div>
            <h1 className="pp-hero-h1">Political<br /><span>Parties</span></h1>
            <p className="pp-hero-deck">
              Political parties are the <strong>backbone of democracy</strong> — they contest elections,
              form governments, make laws and shape public opinion. This chapter covers everything:
              what parties are, how they work, India's national parties, and how they must reform.
            </p>
            <div className="pp-hero-stats">
              <div className="pp-hero-stat">
                <div className="pp-hstat-val">6</div>
                <div className="pp-hstat-label">National Parties in India</div>
              </div>
              <div className="pp-hero-stat">
                <div className="pp-hstat-val">6%</div>
                <div className="pp-hstat-label">Votes for National Party Status</div>
              </div>
              <div className="pp-hero-stat">
                <div className="pp-hstat-val">4</div>
                <div className="pp-hstat-label">Challenges Facing Parties</div>
              </div>
              <div className="pp-hero-stat">
                <div className="pp-hstat-val">3</div>
                <div className="pp-hstat-label">Types of Party Systems</div>
              </div>
            </div>
          </div>

          <div className="pp-hero-bottom">
            {["What is a Party","Functions","Party Systems","National Parties","State Parties","Challenges","Reforms"].map(t => (
              <div className="pp-hbtm-item" key={t}>{t}</div>
            ))}
          </div>
        </div>

        {/* ══ BODY ══ */}
        <div className="pp-body">

          {/* ── SECTION 1: DEFINITION ── */}
          <div className="pp-sec">
            <div className="pp-sec-accent" />
            <div className="pp-sec-inner">
              <div className="pp-sec-left">
                <div className="pp-sec-num">01</div>
                <div className="pp-sec-name">Definition &amp; Functions</div>
              </div>
              <div className="pp-sec-aside">What parties are and what they do</div>
            </div>
          </div>

          <div className="pp-def">
            <div className="pp-def-tag">Official Definition · Political Science</div>
            <div className="pp-def-text">
              A political party is a group of people who come together to <em>contest elections and hold power in government</em> — agreeing on some policies and programmes for society with the view of promoting the collective good.
            </div>
            <div className="pp-def-components">
              <div className="pp-def-comp">
                <div className="pp-def-comp-icon">👑</div>
                <div className="pp-def-comp-title">Leaders</div>
                <div className="pp-def-comp-body">Top figures who set direction, contest for top offices and represent the party publicly.</div>
              </div>
              <div className="pp-def-comp">
                <div className="pp-def-comp-icon">⚙️</div>
                <div className="pp-def-comp-title">Active Members</div>
                <div className="pp-def-comp-body">The organisational backbone — they mobilise voters, run campaigns and implement party decisions.</div>
              </div>
              <div className="pp-def-comp">
                <div className="pp-def-comp-icon">🗳️</div>
                <div className="pp-def-comp-title">Followers</div>
                <div className="pp-def-comp-body">Supporters who identify with the party's ideology and vote for its candidates in elections.</div>
              </div>
            </div>
          </div>

          <h2 className="pp-h2">Six <em>Functions</em> of Political Parties</h2>
          <div className="pp-functions">
            <div className="pp-func-header">
              <div className="pp-func-header-title">What Political Parties Actually Do</div>
              <div className="pp-func-header-sub">6 Core Functions</div>
            </div>
            {[
              { head:"Contest Elections", body:<>Parties nominate candidates, run campaigns and seek a mandate from voters. <strong>Elections are the primary arena</strong> where parties compete for the right to govern.</> },
              { head:"Form Policies &amp; Reduce Complexity", body:<>Parties reduce a vast multitude of citizen opinions into <strong>a few basic policy positions</strong> — making democratic choice manageable for voters.</> },
              { head:"Make Laws", body:<>Laws are debated and passed in the legislature <strong>by members of political parties</strong>. Party discipline largely determines how votes go in Parliament.</> },
              { head:"Form and Run Governments", body:<>Parties <strong>recruit, train and prepare leaders</strong> to run governments — as ministers, chief ministers and prime ministers — when they win elections.</> },
              { head:"Shape Public Opinion", body:<>Opinions in society are <strong>often formed along party lines</strong>. Parties run campaigns, issue statements and use media to shape how citizens think about issues.</> },
              { head:"Connect Citizens to Government", body:<>Parties provide ordinary people access to <strong>government machinery and welfare schemes</strong> — acting as a bridge between the state and citizens.</> },
            ].map((r, i) => (
              <div className="pp-func-row" key={i}>
                <div className="pp-func-num">{i + 1}</div>
                <div className="pp-func-content">
                  <div className="pp-func-head">{r.head}</div>
                  <div className="pp-func-body">{r.body}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pp-div" />

          {/* ── SECTION 2: PARTY SYSTEMS ── */}
          <div className="pp-sec">
            <div className="pp-sec-accent" />
            <div className="pp-sec-inner">
              <div className="pp-sec-left">
                <div className="pp-sec-num">02</div>
                <div className="pp-sec-name">Types of Party Systems</div>
              </div>
              <div className="pp-sec-aside">One · Two · Multi</div>
            </div>
          </div>

          <h2 className="pp-h2">Three Types of <em>Party Systems</em></h2>
          <p className="pp-prose">Party systems evolve over long periods depending on the nature of society, social and regional divisions, history of politics and electoral systems. No single system is universal — each has its own advantages and trade-offs.</p>

          <div className="pp-systems">
            <div className="pp-sys">
              <div className="pp-sys-header">
                <div className="pp-sys-tag">Least Democratic</div>
                <div className="pp-sys-title">One-Party System</div>
              </div>
              <div className="pp-sys-body">
                {["Only one party controls the government — no real competition exists.",<>This is <strong>not a democratic option</strong> — citizens have no real electoral choice.</>,<><strong>Example:</strong> Communist Party of China.</>,].map((t,i) => (
                  <div className="pp-sys-item" key={i}><span className="pp-sys-bullet">▸</span><span>{t}</span></div>
                ))}
              </div>
              <div className="pp-sys-footer">✕ Not Democratic</div>
            </div>
            <div className="pp-sys">
              <div className="pp-sys-header">
                <div className="pp-sys-tag">Stable but Limited</div>
                <div className="pp-sys-title">Two-Party System</div>
              </div>
              <div className="pp-sys-body">
                {[<>Power <strong>alternates between two main parties</strong>. Only they can realistically win a majority.</>,<>Other parties may exist and contest but rarely win enough seats to govern.</>,<><strong>Examples:</strong> USA (Democrat/Republican), UK (Labour/Conservative).</>,].map((t,i) => (
                  <div className="pp-sys-item" key={i}><span className="pp-sys-bullet">▸</span><span>{t}</span></div>
                ))}
              </div>
              <div className="pp-sys-footer">~ Stable but Fewer Choices</div>
            </div>
            <div className="pp-sys">
              <div className="pp-sys-header">
                <div className="pp-sys-tag">India's System</div>
                <div className="pp-sys-title">Multi-Party System</div>
              </div>
              <div className="pp-sys-body">
                {[<>Several parties compete; <strong>more than two have a real chance</strong> of coming to power alone or in coalition.</>,<>Government is formed by <strong>coalition of multiple parties</strong> — allows variety of interests to be represented.</>,<>Can lead to <strong>political instability</strong>. Example: India (NDA, UPA, Left Front).</>,].map((t,i) => (
                  <div className="pp-sys-item" key={i}><span className="pp-sys-bullet">▸</span><span>{t}</span></div>
                ))}
              </div>
              <div className="pp-sys-footer">✓ Diverse but Can Be Unstable</div>
            </div>
          </div>

          <div className="pp-div" />

          {/* ── SECTION 3: NATIONAL PARTIES ── */}
          <div className="pp-sec">
            <div className="pp-sec-accent" />
            <div className="pp-sec-inner">
              <div className="pp-sec-left">
                <div className="pp-sec-num">03</div>
                <div className="pp-sec-name">India's 6 National Parties</div>
              </div>
              <div className="pp-sec-aside">INC · BJP · BSP · CPI-M · CPI · NCP</div>
            </div>
          </div>

          <h2 className="pp-h2">India's <em>National</em> Political Parties</h2>
          <div className="pp-alert gold">
            <div className="pp-alert-icon">📋</div>
            <div className="pp-alert-text">
              <strong>Criteria for National Party Status:</strong> A party must secure at least <strong>6% of total votes</strong> in Lok Sabha OR in Assembly elections in 4 states, AND win at least <strong>4 Lok Sabha seats</strong>.
            </div>
          </div>

          <div className="pp-parties-grid">
            {parties.map((p, i) => (
              <div className="pp-party-card" key={i}>
                <div className="pp-party-header">
                  <div className="pp-party-header-text">
                    <div className="pp-party-founded">{p.founded}</div>
                    <div className="pp-party-name">{p.name}</div>
                    <div className="pp-party-ideology">{p.ideology}</div>
                  </div>
                  <div className="pp-party-abbr">{p.abbr}</div>
                </div>
                <div className="pp-party-body">
                  {p.rows.map((r, j) => (
                    <div className="pp-party-row" key={j}>
                      <div className="pp-party-row-icon">{r.icon}</div>
                      <div className="pp-party-row-text">{r.text}</div>
                    </div>
                  ))}
                </div>
                <div className="pp-party-footer">{p.footer}</div>
              </div>
            ))}
          </div>

          <div className="pp-alert blue">
            <div className="pp-alert-icon">🗺️</div>
            <div className="pp-alert-text">
              <strong>State Parties:</strong> A party securing 6% votes in State Assembly elections and winning at least 2 seats is recognised as a State Party. National parties are increasingly compelled to form alliances with state parties to form governments at the Centre.
            </div>
          </div>

          <div className="pp-div" />

          {/* ── SECTION 4: CHALLENGES ── */}
          <div className="pp-sec">
            <div className="pp-sec-accent" />
            <div className="pp-sec-inner">
              <div className="pp-sec-left">
                <div className="pp-sec-num">04</div>
                <div className="pp-sec-name">Challenges to Political Parties</div>
              </div>
              <div className="pp-sec-aside">4 Critical Problems</div>
            </div>
          </div>

          <h2 className="pp-h2">Four <span className="r">Challenges</span> Facing Parties</h2>
          <p className="pp-prose">Despite being essential to democracy, political parties face serious internal and external problems that undermine their ability to truly represent citizens.</p>

          <div className="pp-dossier">
            <div className="pp-dossier-stamp">
              <div className="pp-dossier-stamp-tag">CRITICAL</div>
              <div className="pp-dossier-stamp-title">Challenges to Political Parties in India</div>
            </div>
            <div className="pp-dossier-body">
              {[
                { icon:"🚫", num:"Challenge 01", title:"Lack of Internal Democracy",
                  body:<>Power concentrates at the top with one or few leaders. Parties <strong>don't maintain membership registers, don't hold internal elections, and don't keep members informed</strong>. Personal loyalty to the leader beats loyalty to party principles.</> },
                { icon:"👨‍👩‍👧", num:"Challenge 02", title:"Dynastic Succession",
                  body:<>Top positions are controlled by <strong>members of one family</strong>. People without adequate experience or popular support get power through family connections. <strong>Bad for democracy</strong> — merit is replaced by lineage.</> },
                { icon:"💰", num:"Challenge 03", title:"Money &amp; Muscle Power",
                  body:<>Parties nominate candidates who can <strong>raise lots of money</strong>. Rich people and companies that fund parties gain policy influence. Some parties even <strong>support criminals</strong> who can win elections.</> },
                { icon:"🔁", num:"Challenge 04", title:"Decline of Meaningful Choice",
                  body:<><strong>Ideological differences among parties have lessened</strong> globally. The same leaders keep shifting parties. Voters cannot elect genuinely different leaders — the same people rotate through different party banners.</> },
              ].map((c, i) => (
                <div className="pp-challenge" key={i}>
                  <div className="pp-challenge-icon">{c.icon}</div>
                  <div className="pp-challenge-num">{c.num}</div>
                  <div className="pp-challenge-title">{c.title}</div>
                  <div className="pp-challenge-body">{c.body}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pp-div" />

          {/* ── SECTION 5: REFORMS ── */}
          <div className="pp-sec">
            <div className="pp-sec-accent" />
            <div className="pp-sec-inner">
              <div className="pp-sec-left">
                <div className="pp-sec-num">05</div>
                <div className="pp-sec-name">Reforms</div>
              </div>
              <div className="pp-sec-aside">Done &amp; Proposed</div>
            </div>
          </div>

          <h2 className="pp-h2">Reforming <em>Political Parties</em></h2>

          <div className="pp-reform">
            <div className="pp-reform-header">
              <div className="pp-reform-header-title">Reformation of Political Parties — Completed &amp; Proposed</div>
              <div className="pp-reform-header-sub">Constitutional &amp; Legal Measures</div>
            </div>
            <div className="pp-reform-body">
              <div className="pp-reform-col">
                <div className="pp-reform-col-head">✅ Reforms Already Made</div>
                {[
                  <><strong>Anti-defection law</strong> — Constitution amended so that any MLA/MP who changes parties loses their seat in the legislature. MPs must accept party leader's decision.</>,
                  <><strong>Affidavit requirement</strong> — every candidate who contests elections must file details of their property and criminal cases pending against them.</>,
                  <><strong>Supreme Court orders</strong> to reduce the influence of money and criminals in electoral politics.</>,
                  <><strong>Election Commission orders</strong> — parties must hold organisational elections and file their income tax returns regularly.</>,
                ].map((t, i) => (
                  <div className="pp-reform-item" key={i}>
                    <div className="pp-reform-bullet" />
                    <div className="pp-reform-text">{t}</div>
                  </div>
                ))}
              </div>
              <div className="pp-reform-col">
                <div className="pp-reform-col-head">💡 Suggested Reforms</div>
                {[
                  <><strong>Laws to regulate internal party affairs</strong> — ensuring internal democracy, regular elections and transparent functioning within all parties.</>,
                  <>Parties must give at least <strong>one-third of total tickets to women candidates</strong> in all elections — a mandatory gender quota.</>,
                  <><strong>Decision-making bodies of parties</strong> should have a reserved quota for women — not just election tickets but actual leadership roles.</>,
                  <><strong>Government funding of parties</strong> — state funding of election expenses would reduce parties' dependence on private money and corporate influence.</>,
                ].map((t, i) => (
                  <div className="pp-reform-item" key={i}>
                    <div className="pp-reform-bullet" />
                    <div className="pp-reform-text">{t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pp-pull">
            <div className="pp-pull-q">
              "Political parties are not just an option in democracy — they are <em>essential</em>. The question is not whether to have them, but how to make them more democratic, more representative, and more accountable to the citizens they serve."
            </div>
            <div className="pp-pull-attr">— Political Parties, NCERT Class 10</div>
          </div>

          {/* ── FAQ ── */}
          <div className="pp-faq-opener">
            <div className="pp-faq-acc" />
            <div className="pp-faq-opener-inner">
              <div className="pp-faq-tag">Exam Preparation · Frequently Asked Questions</div>
              <div className="pp-faq-sub">7 questions · Complete coverage</div>
            </div>
          </div>
          <h2 className="pp-faq-h2">All You Need to Know</h2>

          {faqs.map((faq, i) => (
            <div className={`pp-faq-item${openIdx === i ? " open" : ""}`} key={i}>
              <button className="pp-faq-q" onClick={() => tog(i)}>
                <span className="pp-faq-q-text">Q{i + 1}. {faq.q}</span>
                <span className="pp-faq-icon">{openIdx === i ? "▴" : "▾"}</span>
              </button>
              <div className={`pp-faq-ans${openIdx === i ? " open" : ""}`}>
                <div className="pp-faq-ans-inner">{faq.a}</div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
