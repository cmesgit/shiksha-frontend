/**
 * CourseCatalog.jsx — ShikshaCom
 *
 * Direct 1:1 conversion of catalog.html into a single self-contained React
 * component. The CSS, the markup and the script are byte-for-byte the
 * original file; nothing was rewritten, removed or restyled.
 *
 * Stack: React 19 + Vite (matches shiksha-frontend / student_dashboard / teacher_ui).
 * No dependencies beyond react. Tailwind is not required.
 *
 * Usage:
 *   import CourseCatalog from "./CourseCatalog";
 *   <Route path="/courses" element={<CourseCatalog />} />
 */

import { useEffect } from "react";

/* ============================================================
   1. FONT  (was <link> in <head>)
   ============================================================ */
const FONTS = [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap",
  },
];

/* ============================================================
   2. STYLES  (was <style> in <head>) — unchanged
   ============================================================ */
const CSS = `
  /* ===== tokens — same set as the Courses page ===== */
  :root{
    --coral:#0F9D6B; --coral-dark:#0B5B3E; --coral-soft:#E7F6EE;
    --ink:#0B2E20; --ink-2:#2B4237; --body:#5E7469;
    --peach:#F6FAF7; --peach-2:#E7F6EE; --line:#EDF3EE; --line-2:#DFEAE3; --white:#fff;
    --violet:#7C5CFC; --green:#0F9D6B; --blue:#3b82f6; --red:#E14D2A;
    --gold:#FFB21D; --pink:#ec4e86; --teal:#12b3a6;
    --display:'Poppins', system-ui, sans-serif;
    --font:'Poppins', system-ui, -apple-system, sans-serif;
    --sh-sm:0 6px 22px rgba(11,46,32,.06);
    --sh:0 18px 46px rgba(11,91,62,.12);
    --sh-lg:0 30px 70px rgba(11,46,32,.14);
  }
  *,*::before,*::after{box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{margin:0;font-family:var(--font);color:var(--ink);background:#fff;
    -webkit-font-smoothing:antialiased;line-height:1.65;overflow-x:hidden}
  h1,h2,h3,h4{font-family:var(--display);color:var(--ink);margin:0;line-height:1.18;font-weight:700;letter-spacing:-.01em}
  p{margin:0}
  svg{display:block}
  ::selection{background:var(--coral);color:#fff}
  .wrap{max-width:1340px;margin:0 auto;padding:0 24px}
  .sec{padding:clamp(30px,4vw,44px) 0 clamp(46px,6vw,72px)}

  .rv{opacity:0;transform:translateY(20px);transition:opacity .6s cubic-bezier(.2,.7,.2,1),transform .6s cubic-bezier(.2,.7,.2,1)}
  .rv.in{opacity:1;transform:none}

  /* ===== buttons ===== */
  .btn{display:inline-flex;align-items:center;gap:9px;font-family:var(--font);font-weight:700;font-size:14.5px;
    padding:13px 26px;border-radius:999px;border:2px solid transparent;cursor:pointer;
    transition:transform .2s,box-shadow .2s,background .2s,color .2s,border-color .2s}
  .btn svg{width:16px;height:16px;transition:transform .2s}
  .btn:hover svg{transform:translateX(3px)}
  .btn-coral{background:var(--coral);color:#fff}
  .btn-coral:hover{background:var(--coral-dark);transform:translateY(-2px)}
  .btn-ghost{background:#fff;color:var(--coral);border-color:var(--coral)}
  .btn-ghost:hover{background:var(--coral);color:#fff;transform:translateY(-2px)}
  .btn:focus-visible{outline:3px solid var(--coral);outline-offset:3px}

  /* ===== page layout: results left, filters right ===== */
  .page{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:32px;align-items:start}

  /* ===== results bar ===== */
  .res-bar{display:flex;align-items:center;gap:12px;margin-bottom:24px}
  .csearch-box{flex:1;min-width:0;display:flex;align-items:center;gap:10px;background:#fff;
    border:1px solid var(--line);border-radius:999px;padding:9px 9px 9px 22px;
    box-shadow:0 8px 24px rgba(11,46,32,.06);transition:box-shadow .3s,border-color .3s}
  .csearch-box:focus-within{border-color:rgba(15,157,107,.45);box-shadow:0 12px 30px rgba(11,91,62,.10)}
  .csearch-box .si{flex:none;color:var(--coral)}
  .csearch-box .si svg{width:20px;height:20px}
  .csearch-box input{flex:1;min-width:0;border:none;outline:none;background:none;font-family:var(--font);
    font-size:15px;color:var(--ink);padding:4px 0}
  .csearch-box input::placeholder{color:#9BAEA4}
  .cs-x{flex:none;width:34px;height:34px;border-radius:50%;border:none;background:var(--peach);color:var(--body);
    cursor:pointer;display:none;place-items:center;font-size:17px;line-height:1;transition:background .2s,color .2s}
  .cs-x.show{display:grid}
  .cs-x:hover{background:var(--coral);color:#fff}

  .sortsel{flex:none;appearance:none;-webkit-appearance:none;font-family:var(--font);font-size:13.5px;font-weight:600;
    color:var(--ink-2);background-color:#fff;border:1px solid var(--line);border-radius:999px;
    padding:13px 42px 13px 20px;cursor:pointer;box-shadow:0 8px 24px rgba(11,46,32,.06);outline:none;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235E7469' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>");
    background-repeat:no-repeat;background-position:right 16px center;background-size:14px}
  .sortsel:focus{border-color:var(--coral)}

  .fbtn{display:none;flex:none;align-items:center;gap:8px;font-family:var(--font);font-weight:700;font-size:13.5px;
    background:var(--coral);color:#fff;border:none;border-radius:999px;padding:13px 20px;cursor:pointer}
  .fbtn svg{width:15px;height:15px}
  .fbtn .cnt{background:rgba(255,255,255,.26);border-radius:999px;padding:0 7px;font-size:11.5px}

  /* ===== grid head + applied chips ===== */
  .grid-head{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:14px}
  .grid-head h2{font-size:clamp(20px,2.4vw,26px);font-weight:700}
  .grid-head p{margin-top:5px;color:var(--body);font-size:13.5px}
  .grid-head .tot{font-size:13px;color:var(--body);font-weight:600;white-space:nowrap}

  .applied{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:22px}
  .applied:empty{display:none}
  .ap-chip{display:inline-flex;align-items:center;gap:8px;background:var(--coral-soft);
    border:1px solid rgba(15,157,107,.18);color:var(--coral-dark);font-size:12.5px;font-weight:600;
    border-radius:999px;padding:5px 6px 5px 14px}
  .ap-chip button{width:19px;height:19px;border-radius:50%;border:none;background:rgba(15,157,107,.15);
    color:var(--coral-dark);cursor:pointer;display:grid;place-items:center;font-size:12px;line-height:1;
    transition:background .2s,color .2s}
  .ap-chip button:hover{background:var(--coral);color:#fff}
  .ap-clear{background:none;border:none;font-family:var(--font);font-size:12.5px;font-weight:600;color:var(--body);
    cursor:pointer;padding:6px 4px;transition:color .2s}
  .ap-clear:hover{color:var(--red)}

  /* ===== filter panel ===== */
  .fpanel{position:sticky;top:24px;background:#fff;border:1.5px solid var(--line);border-radius:22px;
    padding:0 20px 8px;box-shadow:var(--sh-sm);max-height:calc(100vh - 48px);overflow-y:auto;overscroll-behavior:contain}
  .fpanel::-webkit-scrollbar{width:6px}
  .fpanel::-webkit-scrollbar-thumb{background:var(--line-2);border-radius:99px}

  .fp-head{position:sticky;top:0;background:#fff;z-index:2;display:flex;align-items:center;justify-content:space-between;
    gap:10px;padding:18px 0 14px;border-bottom:1px solid var(--line)}
  .fp-head h3{font-size:15.5px;display:flex;align-items:center;gap:9px}
  .fp-head h3 svg{width:17px;height:17px;color:var(--coral)}
  .fp-reset{background:none;border:none;font-family:var(--font);font-size:12.5px;font-weight:600;color:var(--body);
    cursor:pointer;padding:4px 2px;transition:color .2s}
  .fp-reset:hover{color:var(--red)}
  .fp-close{display:none;width:32px;height:32px;border:none;border-radius:50%;background:var(--peach);
    color:var(--ink-2);font-size:19px;line-height:1;cursor:pointer;place-items:center}
  .fp-close:hover{background:var(--coral);color:#fff}

  .fp-group{border-bottom:1px solid var(--line)}
  .fp-group:last-of-type{border-bottom:none}
  .fp-title{width:100%;display:flex;align-items:center;justify-content:space-between;gap:8px;background:none;
    border:none;padding:17px 0 13px;font-family:var(--font);font-size:11.5px;font-weight:700;letter-spacing:.13em;
    text-transform:uppercase;color:var(--ink);cursor:pointer}
  .fp-title svg{width:15px;height:15px;color:var(--body);transition:transform .25s}
  .fp-title[aria-expanded="false"] svg{transform:rotate(-90deg)}
  .fp-title:focus-visible{outline:3px solid var(--coral);outline-offset:2px;border-radius:8px}
  .fp-body{padding-bottom:18px}
  .fp-title[aria-expanded="false"]+.fp-body{display:none}

  .fp-seg{display:grid;grid-template-columns:1fr 1fr;gap:4px;background:var(--peach);border:1px solid var(--line);
    border-radius:999px;padding:4px;margin-bottom:11px}
  .fp-seg button{border:none;background:none;font-family:var(--font);font-size:12px;font-weight:700;padding:8px 4px;
    border-radius:999px;color:var(--body);cursor:pointer;transition:background .2s,color .2s,box-shadow .2s}
  .fp-seg button:hover{color:var(--ink)}
  .fp-seg button[aria-selected="true"]{background:#fff;color:var(--coral-dark);box-shadow:0 3px 10px rgba(11,46,32,.09)}

  .fp-find{position:relative;margin-bottom:8px}
  .fp-find svg{position:absolute;left:13px;top:50%;transform:translateY(-50%);width:15px;height:15px;color:var(--body)}
  .fp-find input{width:100%;padding:10px 12px 10px 35px;background:var(--peach);border:1px solid var(--line);
    border-radius:12px;font-family:var(--font);font-size:13px;color:var(--ink);outline:none;transition:background .2s,border-color .2s}
  .fp-find input::placeholder{color:#9BAEA4}
  .fp-find input:focus{background:#fff;border-color:var(--coral)}

  .fp-list{display:flex;flex-direction:column;gap:2px;max-height:236px;overflow-y:auto;margin-right:-6px;padding-right:6px}
  .fp-list::-webkit-scrollbar{width:5px}
  .fp-list::-webkit-scrollbar-thumb{background:var(--line-2);border-radius:99px}
  .fp-opt{display:flex;align-items:center;gap:11px;width:100%;text-align:left;background:none;border:none;
    border-radius:12px;padding:9px 10px;cursor:pointer;font-family:var(--font);transition:background .18s}
  .fp-opt:hover:not(:disabled){background:var(--coral-soft)}
  .fp-opt b{flex:1;min-width:0;font-size:13px;font-weight:600;color:var(--ink-2);white-space:nowrap;
    overflow:hidden;text-overflow:ellipsis}
  .fp-opt.on{background:var(--coral-soft)}
  .fp-opt.on b{color:var(--coral-dark);font-weight:700}
  .fp-opt:focus-visible{outline:3px solid var(--coral);outline-offset:-2px}
  .fp-radio{width:17px;height:17px;border-radius:50%;border:2px solid var(--line-2);flex:none;display:grid;
    place-items:center;transition:background .18s,border-color .18s}
  .fp-radio i{width:5px;height:5px;border-radius:50%;background:#fff;opacity:0;transition:opacity .18s}
  .fp-opt.on .fp-radio{background:var(--coral);border-color:var(--coral)}
  .fp-opt.on .fp-radio i{opacity:1}
  .fp-n{flex:none;font-size:11px;font-weight:700;color:var(--coral-dark);background:var(--coral-soft);
    border:1px solid rgba(15,157,107,.16);border-radius:999px;padding:1px 8px;line-height:1.6}
  .fp-opt.on .fp-n{background:var(--coral);color:#fff;border-color:var(--coral)}
  .fp-opt:disabled{cursor:not-allowed}
  .fp-opt:disabled b{color:#9BAEA4;font-weight:500}
  .fp-soon{flex:none;font-size:9.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#B45309;
    background:#FFF3DC;border-radius:999px;padding:2px 7px;line-height:1.7}
  .fp-none{font-size:12.5px;color:var(--body);padding:10px 2px}

  .fp-chips{display:flex;flex-wrap:wrap;gap:7px}
  .pill{white-space:nowrap;font-family:var(--font);font-size:12.5px;font-weight:600;color:var(--ink-2);
    background:#fff;border:1px solid var(--line);border-radius:999px;padding:7px 14px;cursor:pointer;
    transition:background .2s,color .2s,border-color .2s,box-shadow .2s}
  .pill:hover{background:var(--coral);color:#fff;border-color:var(--coral)}
  .pill.on{background:var(--coral);color:#fff;border-color:var(--coral);box-shadow:0 8px 18px rgba(15,157,107,.22)}
  .pill:focus-visible{outline:3px solid var(--coral);outline-offset:2px}

  /* ===== course grid — the site's fc-card ===== */
  .fc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
  .fc-card{background:#fff;border-radius:24px;overflow:hidden;border:1.5px solid var(--line);
    transition:transform .25s,box-shadow .25s;display:flex;flex-direction:column;cursor:pointer}
  .fc-card:hover{transform:translateY(-7px);box-shadow:0 26px 50px rgba(11,46,32,.13)}
  .fc-thumb{position:relative;height:160px;padding:14px;background-size:cover !important;background-position:center !important}
  .fc-thumb-ic{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:60px;height:60px;
    border-radius:19px;background:rgba(255,255,255,.16);display:grid;place-items:center;backdrop-filter:blur(2px)}
  .fc-thumb-ic svg{width:28px;height:28px}
  .fc-ribbon{position:absolute;top:13px;left:13px;background:var(--gold);color:var(--ink);font-family:var(--font);
    font-size:10.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:5px 11px;border-radius:999px}
  .fc-heart{position:absolute;top:11px;right:11px;width:34px;height:34px;border-radius:50%;border:none;cursor:pointer;
    background:rgba(255,255,255,.2);display:grid;place-items:center;transition:background .2s,color .2s;color:#fff}
  .fc-heart svg{width:16px;height:16px}
  .fc-heart:hover{background:rgba(255,255,255,.42)}
  .fc-heart.on{background:#fff;color:var(--coral)}
  .fc-lvl{position:absolute;bottom:-13px;left:17px;background:#fff;border:1.5px solid var(--line);
    color:var(--coral-dark);font-family:var(--font);font-size:10.5px;font-weight:700;padding:5px 13px;
    border-radius:999px;box-shadow:0 6px 14px rgba(11,46,32,.08)}
  .fc-body{padding:25px 19px 19px;display:flex;flex-direction:column;flex:1}
  .fc-rate{display:flex;align-items:center;gap:6px}
  .fc-rate svg{width:13px;height:13px}
  .fc-rate span{font-size:11.5px;color:var(--body)}
  .fc-body h3{font-family:var(--display);font-size:15.8px;font-weight:700;margin:8px 0 10px;line-height:1.35}
  .fc-fact{display:flex;align-items:center;gap:7px;font-size:11.8px;color:var(--body)}
  .fc-fact svg{width:14px;height:14px;color:#8AA396;flex:none}
  .fc-foot{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:16px;
    border-top:1.5px dashed var(--line);padding-top:14px}
  .fc-price{font-family:var(--display);font-size:16.5px;font-weight:800;color:var(--coral);white-space:nowrap}
  .fc-price small{font-style:normal;font-size:10.5px;color:var(--body);font-weight:600}
  .fc-enroll{font-family:var(--font);font-weight:700;font-size:12.5px;padding:9px 15px;border-radius:999px;
    border:none;background:var(--coral);color:#fff;display:inline-flex;align-items:center;gap:6px;cursor:pointer;
    white-space:nowrap;transition:background .2s,transform .2s}
  .fc-enroll svg{width:13px;height:13px;transition:transform .2s}
  .fc-enroll:hover{background:var(--coral-dark);transform:translateY(-1px)}
  .fc-enroll:hover svg{transform:translateX(3px)}
  .fc-board{display:inline-flex;align-items:center;gap:6px;align-self:flex-start;background:var(--coral-soft);
    color:var(--coral-dark);font-size:11.5px;font-weight:700;padding:5px 11px;border-radius:999px;
    line-height:1;margin:-4px 0 10px}
  .fc-board svg{width:12px;height:12px;flex:none}
  .fc-spacer{flex:1}

  .empty{display:none;text-align:center;color:var(--body);font-size:15px;padding:60px 20px;background:var(--peach);
    border:1px solid var(--line);border-radius:22px}
  .empty.show{display:block}
  .empty b{display:block;font-family:var(--display);font-size:19px;color:var(--ink);margin-bottom:8px}
  .empty .btn{margin-top:20px}

  /* ===== course modal — the site's board-picker pattern ===== */
  .bm[hidden]{display:none}
  .bm{position:fixed;inset:0;z-index:140;display:grid;place-items:center;padding:20px}
  .bm-back{position:absolute;inset:0;background:rgba(11,46,32,.55);backdrop-filter:blur(3px);animation:bmFade .2s ease}
  .bm-box{position:relative;width:min(520px,100%);max-height:90vh;overflow:auto;background:#fff;border-radius:24px;
    padding:30px 28px 26px;box-shadow:var(--sh-lg);animation:bmUp .28s cubic-bezier(.2,.8,.25,1)}
  @keyframes bmFade{from{opacity:0}}
  @keyframes bmUp{from{opacity:0;transform:translateY(18px) scale(.97)}}
  .bm-x{position:absolute;top:16px;right:16px;width:34px;height:34px;border:none;border-radius:50%;
    background:var(--peach);color:var(--ink-2);font-size:20px;line-height:1;cursor:pointer;display:grid;
    place-items:center;transition:background .2s,color .2s;z-index:2}
  .bm-x:hover{background:var(--coral);color:#fff}
  .bm-eyebrow{display:inline-block;font-size:11.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;
    color:var(--coral);margin-bottom:10px}
  .bm-box h3{font-size:22px;padding-right:34px}
  .bm-sub{margin-top:9px;font-size:14px;color:var(--body);line-height:1.6}
  .bm-sub b{color:var(--ink)}
  .bm-tabs{display:flex;gap:8px;margin:20px 0}
  .fc-tab{font-family:var(--font);font-weight:700;font-size:12.5px;letter-spacing:.03em;text-transform:uppercase;
    padding:9px 17px;border-radius:999px;border:none;background:var(--coral-soft);color:var(--coral);cursor:pointer;
    transition:background .2s,color .2s}
  .fc-tab[aria-selected="true"]{background:var(--coral);color:#fff}
  .fc-tab:focus-visible{outline:3px solid var(--coral);outline-offset:2px}
  .bm-chips{display:flex;flex-wrap:wrap;gap:7px}
  .bm-chip{font-size:12px;font-weight:600;color:var(--ink-2);background:var(--peach);border:1px solid var(--line);
    border-radius:999px;padding:6px 13px;line-height:1.4}
  .bm-lab{font-size:11.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--body);margin:20px 0 10px}
  .bm-facts{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}
  .bm-fact{background:var(--peach);border:1px solid var(--line);border-radius:15px;padding:13px 14px}
  .bm-fact span{display:block;font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--body)}
  .bm-fact b{display:block;font-family:var(--display);font-size:14.5px;font-weight:700;color:var(--ink);margin-top:3px}
  .bm-feat{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
  .bm-feat li{display:flex;align-items:center;gap:11px;font-size:14px;color:var(--ink-2)}
  .bm-feat li i{flex:none;width:24px;height:24px;border-radius:8px;background:var(--coral-soft);color:var(--coral);
    display:grid;place-items:center}
  .bm-feat li i svg{width:13px;height:13px}
  .bm-term{background:var(--peach);border:1px solid var(--line);border-radius:16px;padding:16px 18px}
  .bm-term b{display:block;font-family:var(--display);font-size:14px;font-weight:700}
  .bm-term ul{margin:9px 0 0;padding-left:17px;color:var(--body);font-size:13.2px}
  .bm-term li{margin-bottom:3px}
  .bm-list{display:flex;flex-direction:column;gap:9px;margin:8px 0 0}
  .bm-opt{display:flex;align-items:center;gap:13px;width:100%;text-align:left;background:#fff;
    border:2px solid var(--line);border-radius:15px;padding:13px 15px;cursor:pointer;font-family:var(--font);
    transition:border-color .2s,background .2s,transform .15s}
  .bm-opt:hover{border-color:var(--coral);transform:translateX(2px)}
  .bm-opt[aria-checked="true"]{border-color:var(--coral);background:var(--coral-soft)}
  .bm-opt:focus-visible{outline:3px solid var(--coral);outline-offset:2px}
  .bm-tick{width:22px;height:22px;border-radius:50%;border:2px solid var(--line);flex:none;display:grid;
    place-items:center;color:#fff;transition:background .2s,border-color .2s}
  .bm-tick svg{width:12px;height:12px;opacity:0;transition:opacity .2s}
  .bm-opt[aria-checked="true"] .bm-tick{background:var(--coral);border-color:var(--coral)}
  .bm-opt[aria-checked="true"] .bm-tick svg{opacity:1}
  .bm-opt b{display:block;font-family:var(--display);font-size:14.5px;font-weight:700;color:var(--ink)}
  .bm-opt i{font-style:normal;display:block;margin-top:2px;font-size:12px;color:var(--body)}
  .bm-field{margin-bottom:13px}
  .bm-field label{display:block;font-size:12.5px;font-weight:700;color:var(--ink-2);margin-bottom:6px}
  .bm-field input{width:100%;padding:13px 16px;background:var(--peach);border:2px solid var(--line);
    border-radius:14px;font-family:var(--font);font-size:14px;color:var(--ink);outline:none;
    transition:border-color .2s,background .2s}
  .bm-field input:focus{background:#fff;border-color:var(--coral)}
  .bm-foot{display:flex;gap:10px;justify-content:flex-end;align-items:center;margin-top:24px}
  .bm-cancel{background:none;border:none;font-family:var(--font);font-weight:600;font-size:13.5px;color:var(--body);
    padding:12px 14px;border-radius:12px;cursor:pointer;transition:color .2s,background .2s}
  .bm-cancel:hover{color:var(--ink);background:var(--peach)}
  .bm-go{display:inline-flex;align-items:center;gap:8px;background:var(--coral);color:#fff;border:none;
    font-family:var(--font);font-weight:700;font-size:13.5px;padding:13px 22px;border-radius:12px;cursor:pointer;
    transition:background .2s,transform .2s}
  .bm-go svg{width:14px;height:14px;transition:transform .2s}
  .bm-go:hover{background:var(--coral-dark);transform:translateY(-2px)}
  .bm-go:hover svg{transform:translateX(3px)}
  .bm-done{text-align:center;padding:10px 0 2px}
  .bm-done .bm-seal{width:64px;height:64px;border-radius:50%;background:var(--coral-soft);color:var(--coral);
    display:grid;place-items:center;margin:0 auto 18px}
  .bm-done .bm-seal svg{width:30px;height:30px}

  /* ===== compare tray ===== */
  .tray{position:fixed;left:50%;bottom:22px;transform:translate(-50%,150%);z-index:120;background:#fff;
    border:1.5px solid var(--line);border-radius:22px;box-shadow:var(--sh-lg);padding:14px 16px;
    display:flex;align-items:center;gap:14px;max-width:calc(100vw - 32px);
    transition:transform .35s cubic-bezier(.2,.7,.2,1)}
  .tray.open{transform:translate(-50%,0)}
  .tray-lab{font-size:11.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--body);white-space:nowrap}
  .tray-items{display:flex;gap:9px;overflow-x:auto;padding:2px}
  .tray-item{display:flex;align-items:center;gap:10px;background:var(--peach);border:1px solid var(--line);
    border-radius:14px;padding:9px 12px;flex:none}
  .tray-item .dot{width:9px;height:9px;border-radius:50%;flex:none}
  .tray-item b{display:block;font-family:var(--display);font-size:12.5px;font-weight:600;line-height:1.3;white-space:nowrap}
  .tray-item span{font-size:11px;color:var(--body);white-space:nowrap}
  .tray-item button{background:none;border:none;color:var(--body);cursor:pointer;font-size:16px;line-height:1;
    padding:0 2px;transition:color .2s}
  .tray-item button:hover{color:var(--red)}
  .tray-clear{flex:none;background:var(--peach);border:none;font-family:var(--font);font-weight:700;font-size:12.5px;
    color:var(--ink-2);padding:11px 18px;border-radius:999px;cursor:pointer;white-space:nowrap;
    transition:background .2s,color .2s}
  .tray-clear:hover{background:var(--coral);color:#fff}

  /* ===== scrim for mobile filter drawer ===== */
  .scrim{position:fixed;inset:0;background:rgba(11,46,32,.5);backdrop-filter:blur(2px);z-index:125;
    opacity:0;pointer-events:none;transition:opacity .3s}
  .scrim.open{opacity:1;pointer-events:auto}

  /* ===== responsive ===== */
  @media(max-width:1200px){ .fc-grid{grid-template-columns:repeat(2,1fr)} }
  @media(max-width:900px){
    .page{grid-template-columns:1fr}
    .fbtn{display:inline-flex}
    .sortsel{padding:13px 40px 13px 16px}
    .fpanel{position:fixed;top:0;right:0;bottom:0;width:min(340px,88vw);max-height:none;z-index:130;
      border-radius:22px 0 0 22px;border-width:0 0 0 1.5px;transform:translateX(102%);
      transition:transform .32s cubic-bezier(.2,.7,.2,1);box-shadow:var(--sh-lg);padding:0 20px 24px}
    .fpanel.open{transform:none}
    .fp-close{display:grid}
    .fc-grid{grid-template-columns:repeat(2,1fr)}
  }
  @media(max-width:640px){
    .fc-grid{grid-template-columns:1fr}
    .res-bar{flex-wrap:wrap}
    .csearch-box{flex-basis:100%;order:-1}
    .sortsel{flex:1}
    .grid-head{flex-direction:column;align-items:flex-start;gap:4px}
    .bm-facts{grid-template-columns:1fr 1fr}
    .tray{border-radius:18px;padding:12px}
    .tray-lab{display:none}
  }
  @media(prefers-reduced-motion:reduce){
    *{animation:none!important;transition:none!important;scroll-behavior:auto!important}
    .rv{opacity:1!important;transform:none!important}
  }
`;

/* ============================================================
   3. MARKUP  (was <body>) — unchanged
   ============================================================ */
const MARKUP = `

<main class="sec">
  <div class="wrap">
    <div class="page">

      <!-- ============ RESULTS ============ -->
      <div>
        <div class="res-bar">
          <div class="csearch-box">
            <span class="si"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"><circle cx="11" cy="11" r="7.5"/><path d="m20.5 20.5-4-4"/></svg></span>
            <input type="text" id="searchInput" placeholder="Search a class, subject or batch" oninput="handleSearch(this.value)">
            <button class="cs-x" id="searchClear" type="button" aria-label="Clear search" onclick="clearSearch()">&times;</button>
          </div>
          <select class="sortsel" id="sortSel" aria-label="Sort courses" onchange="setSort(this.value)">
            <option value="rec">Recommended</option>
            <option value="popular">Most learners</option>
            <option value="rating">Highest rated</option>
            <option value="fee">Lowest fee</option>
          </select>
          <button class="fbtn" type="button" onclick="openPanel()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"><path d="M3 6h18M7 12h10M10 18h4"/></svg>
            Filters <span class="cnt" id="fbtnCount">1</span>
          </button>
        </div>

        <div class="grid-head">
          <div>
            <h2 id="gridTitle">CBSE courses</h2>
            <p id="gridSub">Live classes, tests and notes mapped to the syllabus</p>
          </div>
          <span class="tot" id="gridTot">9 batches</span>
        </div>

        <div class="applied" id="applied"></div>

        <div class="fc-grid" id="courseGrid"></div>

        <div class="empty" id="emptyState">
          <b>No batches match these filters</b>
          Try another class, or switch the board to see what&rsquo;s running.
          <div><button class="btn btn-ghost" type="button" onclick="resetAllFilters()">Clear all filters</button></div>
        </div>
      </div>

      <!-- ============ FILTER PANEL ============ -->
      <aside class="fpanel" id="fpanel" aria-label="Course filters">
        <div class="fp-head">
          <h3>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"><path d="M3 6h18M7 12h10M10 18h4"/></svg>
            Filters
          </h3>
          <button class="fp-reset" type="button" onclick="resetAllFilters()">Reset</button>
          <button class="fp-close" type="button" aria-label="Close filters" onclick="closePanel()">&times;</button>
        </div>

        <section class="fp-group">
          <button class="fp-title" type="button" aria-expanded="true" onclick="toggleGroup(this)">
            Board
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="fp-body">
            <div class="fp-seg" role="tablist">
              <button type="button" role="tab" aria-selected="true" onclick="setCategory('central')">Central</button>
              <button type="button" role="tab" aria-selected="false" onclick="setCategory('state')">State</button>
            </div>
            <div class="fp-find">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7.5"/><path d="m20.5 20.5-4-4"/></svg>
              <input type="text" id="boardFind" placeholder="Find a board" oninput="findBoard(this.value)">
            </div>
            <div class="fp-list" id="boardList"></div>
          </div>
        </section>

        <section class="fp-group">
          <button class="fp-title" type="button" aria-expanded="true" onclick="toggleGroup(this)">
            Class
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="fp-body"><div class="fp-chips" id="classChips"></div></div>
        </section>

        <section class="fp-group" id="streamGroup">
          <button class="fp-title" type="button" aria-expanded="true" onclick="toggleGroup(this)">
            Stream
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="fp-body"><div class="fp-chips" id="streamChips"></div></div>
        </section>
      </aside>

    </div>
  </div>
</main>

<div class="scrim" id="scrim" onclick="closePanel()"></div>

<!-- ============ COURSE MODAL ============ -->
<div class="bm" id="courseModal" hidden>
  <div class="bm-back" data-close></div>
  <div class="bm-box" role="dialog" aria-modal="true" aria-labelledby="bmTitle">
    <button class="bm-x" type="button" data-close aria-label="Close">&times;</button>

    <div id="bmMain">
      <span class="bm-eyebrow" id="bmEyebrow">CBSE &middot; Class 10</span>
      <h3 id="bmTitle">Course</h3>
      <p class="bm-sub" id="bmSub"></p>

      <div class="bm-tabs" role="tablist">
        <button class="fc-tab" role="tab" aria-selected="true" id="tabOverview" type="button" onclick="switchTab('overview')">Overview</button>
        <button class="fc-tab" role="tab" aria-selected="false" id="tabSyllabus" type="button" onclick="switchTab('syllabus')">Syllabus</button>
        <button class="fc-tab" role="tab" aria-selected="false" id="tabEnroll" type="button" onclick="switchTab('enroll')">Enrol</button>
      </div>

      <div id="bmPane"></div>
    </div>

    <div id="bmDone" class="bm-done" hidden>
      <span class="bm-seal"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
      <h3>Enrolment confirmed</h3>
      <p class="bm-sub" id="bmDoneSub"></p>
      <div class="bm-foot" style="justify-content:center">
        <button class="bm-go" type="button" data-close>Done</button>
      </div>
    </div>
  </div>
</div>

<!-- ============ COMPARE TRAY ============ -->
<div class="tray" id="tray">
  <span class="tray-lab">Compare <span id="trayCount">0</span>/3</span>
  <div class="tray-items" id="trayItems"></div>
  <button class="tray-clear" type="button" onclick="clearCompare()">Clear</button>
</div>

`;

/* ============================================================
   4. COMPONENT
   ============================================================ */
export default function CourseCatalog() {
  /* ---- inject the Poppins <link> tags into <head> ---- */
  useEffect(() => {
    const added = FONTS.filter((f) => !document.head.querySelector(`link[href="${f.href}"]`)).map(
      (f) => {
        const l = document.createElement("link");
        l.rel = f.rel;
        l.href = f.href;
        if (f.crossOrigin !== undefined) l.crossOrigin = f.crossOrigin;
        document.head.appendChild(l);
        return l;
      }
    );
    return () => added.forEach((l) => l.remove());
  }, []);

  /* ---- run the original page script once the markup is in the DOM ---- */
  useEffect(() => {
    /* ==================================================================
       BEGIN original <script> — verbatim
       ================================================================== */
/* ================= DATA ================= */
const BOARDS = [
  { id:'cbse', code:'CBSE', name:'Central Board of Secondary Education', category:'central', isAvailable:true },
  { id:'icse', code:'ICSE', name:'Indian Certificate of Secondary Education', category:'central', isAvailable:false },
  { id:'ib', code:'IB', name:'International Baccalaureate', category:'central', isAvailable:false },
  { id:'nios', code:'NIOS', name:'National Institute of Open Schooling', category:'central', isAvailable:false },
  { id:'aissce', code:'AISSCE', name:'All India Senior School Certificate', category:'central', isAvailable:false },
  { id:'mbse', code:'MBSE', name:'Mizoram Board of School Education', category:'state', isAvailable:true },
  { id:'bseap', code:'BSEAP', name:'Andhra Pradesh Board', category:'state', isAvailable:false },
  { id:'asseb', code:'ASSEB', name:'Assam Education Board', category:'state', isAvailable:false },
  { id:'bseb', code:'BSEB', name:'Bihar School Examination Board', category:'state', isAvailable:false },
  { id:'cgbse', code:'CGBSE', name:'Chhattisgarh Board', category:'state', isAvailable:false },
  { id:'gbshse', code:'GBSHSE', name:'Goa Secondary Board', category:'state', isAvailable:false },
  { id:'gseb', code:'GSEB', name:'Gujarat Board', category:'state', isAvailable:false },
  { id:'bseh', code:'BSEH', name:'Haryana Board', category:'state', isAvailable:false },
  { id:'hpbose', code:'HPBOSE', name:'Himachal Pradesh Board', category:'state', isAvailable:false },
  { id:'jac', code:'JAC', name:'Jharkhand Academic Council', category:'state', isAvailable:false },
  { id:'kseab', code:'KSEAB', name:'Karnataka Board', category:'state', isAvailable:false },
  { id:'kbpe', code:'KBPE', name:'Kerala Board', category:'state', isAvailable:false },
  { id:'mpbse', code:'MPBSE', name:'Madhya Pradesh Board', category:'state', isAvailable:false },
  { id:'msbshse', code:'MSBSHSE', name:'Maharashtra Board', category:'state', isAvailable:false },
  { id:'bosem', code:'BOSEM', name:'Manipur Board', category:'state', isAvailable:false },
  { id:'cohsem', code:'COHSEM', name:'Manipur Higher Secondary Council', category:'state', isAvailable:false },
  { id:'mbose', code:'MBOSE', name:'Meghalaya Board', category:'state', isAvailable:false },
  { id:'nbse', code:'NBSE', name:'Nagaland Board', category:'state', isAvailable:false },
  { id:'bseodisha', code:'BSE Odisha', name:'Odisha Board', category:'state', isAvailable:false },
  { id:'pseb', code:'PSEB', name:'Punjab Board', category:'state', isAvailable:false },
  { id:'rbse', code:'RBSE', name:'Rajasthan Board', category:'state', isAvailable:false },
  { id:'tnbse', code:'TNBSE', name:'Tamil Nadu Board', category:'state', isAvailable:false },
  { id:'tsbse', code:'TSBSE', name:'Telangana Board', category:'state', isAvailable:false },
  { id:'tbse', code:'TBSE', name:'Tripura Board', category:'state', isAvailable:false },
  { id:'upmsp', code:'UPMSP', name:'Uttar Pradesh Board', category:'state', isAvailable:false },
  { id:'ubse', code:'UBSE', name:'Uttarakhand Board', category:'state', isAvailable:false },
  { id:'wbbse', code:'WBBSE', name:'West Bengal Board', category:'state', isAvailable:false }
];

const COURSES = [
  { id:'cbse-class-8', title:'Class 8 Foundation Batch', classLevel:'Class 8', stream:'General', boardId:'cbse', duration:'1 Year', fee:'₹1,500 / month', totalFee:'₹15,000 / year', mode:'Online', subjects:['Mathematics','Social Science','Science','English'], features:['Live Interactive Classes','Recorded Sessions Access','Chapter Assignments'], rating:4.8, learners:2400 },
  { id:'cbse-class-9', title:'Class 9 Foundation Program', classLevel:'Class 9', stream:'General', boardId:'cbse', duration:'1 Year', fee:'₹1,500 / month', totalFee:'₹15,000 / year', mode:'Online', subjects:['Mathematics','Social Science','Science','English'], features:['Live Interactive Classes','Board Pattern Worksheets','Performance Analytics'], rating:4.9, learners:4100 },
  { id:'cbse-class-10', title:'Class 10 Board Comprehensive Batch', classLevel:'Class 10', stream:'General', boardId:'cbse', duration:'1 Year', fee:'₹1,500 / month', totalFee:'₹15,000 / year', mode:'Online', subjects:['Mathematics','Social Science','Science','English'], features:['Board Exam Revision Series','Model Question Papers','Rank Booster Quizzes'], rating:4.9, learners:6800 },
  { id:'cbse-class-11-sci', title:'Class 11 Science Stream Foundation', classLevel:'Class 11', stream:'Science', boardId:'cbse', duration:'1 Year', fee:'₹1,500 / month', totalFee:'₹16,500 / year', mode:'Online', subjects:['Physics','Chemistry','English','Biology','Maths'], features:['PCM & PCB Concept Building','Numerical Problem Practice','Monthly Mock Tests'], rating:4.8, learners:3200 },
  { id:'cbse-class-11-com', title:'Class 11 Commerce Stream Batch', classLevel:'Class 11', stream:'Commerce', boardId:'cbse', duration:'1 Year', fee:'₹1,500 / month', totalFee:'₹15,000 / year', mode:'Online', subjects:['Accountancy','Business Studies','Economics','English'], features:['Live Numerical Classes','Case Study Mastery','Doubt Clearing Portal'], rating:4.7, learners:2100 },
  { id:'cbse-class-11-art', title:'Class 11 Arts Stream Batch', classLevel:'Class 11', stream:'Arts', boardId:'cbse', duration:'1 Year', fee:'₹1,500 / month', totalFee:'₹15,000 / year', mode:'Online', subjects:['History','Political Science','Geography','English'], features:['Answer Writing Sessions','Map Work Practice','PDF Notes Library'], rating:4.8, learners:1800 },
  { id:'cbse-class-12-sci', title:'Class 12 Science Board Batch', classLevel:'Class 12', stream:'Science', boardId:'cbse', duration:'1 Year', fee:'₹1,500 / month', totalFee:'₹16,500 / year', mode:'Online', subjects:['Physics','Chemistry','English','Biology','Maths'], features:['Full Syllabus Revision','Previous 10 Years Solved','Flashcards & Formula Sheets'], rating:4.9, learners:5200 },
  { id:'cbse-class-12-com', title:'Class 12 Commerce Board Batch', classLevel:'Class 12', stream:'Commerce', boardId:'cbse', duration:'1 Year', fee:'₹1,500 / month', totalFee:'₹15,000 / year', mode:'Online', subjects:['Accountancy','Business Studies','Economics','English'], features:['Partnership & Company Accounts','Macroeconomics Deep Dive','Full Length Mocks'], rating:4.8, learners:2900 },
  { id:'cbse-class-12-art', title:'Class 12 Arts Board Batch', classLevel:'Class 12', stream:'Arts', boardId:'cbse', duration:'1 Year', fee:'₹1,500 / month', totalFee:'₹15,000 / year', mode:'Online', subjects:['History','Political Science','Geography','English'], features:['CUET & Board Focused','High Yield Answer Structuring','Live Seminar Doubt Clearing'], rating:4.7, learners:1600 },

  { id:'mbse-class-8', title:'MBSE Class 8 State Foundation', classLevel:'Class 8', stream:'General', boardId:'mbse', duration:'1 Year', fee:'₹1,200 / month', totalFee:'₹12,000 / year', mode:'Online', subjects:['Mathematics','Science','Social Science','English','Mizo'], features:['Step-by-step Math Explanation','State Curriculum Notes'], rating:4.8, learners:1900 },
  { id:'mbse-class-9', title:'MBSE Class 9 High School Prep', classLevel:'Class 9', stream:'General', boardId:'mbse', duration:'1 Year', fee:'₹1,400 / month', totalFee:'₹13,500 / year', mode:'Online', subjects:['Mathematics','Science','Social Science','English','Mizo'], features:['HSLC Foundation','Chapter Notes & Question Bank'], rating:4.8, learners:2200 },
  { id:'mbse-class-10', title:'MBSE Class 10 Board Excellence', classLevel:'Class 10', stream:'General', boardId:'mbse', duration:'1 Year', fee:'₹1,500 / month', totalFee:'₹14,000 / year', mode:'Online', subjects:['Mathematics','Science','Social Science','English','Mizo'], features:['MBSE Curriculum Tailored','Bilingual Mizo & English','State Model Papers'], rating:4.9, learners:3100 },
  { id:'mbse-class-11-sci', title:'MBSE Class 11 Science Stream', classLevel:'Class 11', stream:'Science', boardId:'mbse', duration:'1 Year', fee:'₹1,500 / month', totalFee:'₹15,500 / year', mode:'Online', subjects:['Physics','Chemistry','Mathematics','Biology','English'], features:['PCM & PCB Concept Building','Bilingual Mizo & English','Monthly Unit Tests'], rating:4.7, learners:1400 },
  { id:'mbse-class-11-com', title:'MBSE Class 11 Commerce Stream', classLevel:'Class 11', stream:'Commerce', boardId:'mbse', duration:'1 Year', fee:'₹1,400 / month', totalFee:'₹14,000 / year', mode:'Online', subjects:['Accountancy','Business Studies','Economics','English'], features:['Live Numerical Classes','State Pattern Worksheets','Doubt Clearing Portal'], rating:4.7, learners:1150 },
  { id:'mbse-class-11-art', title:'MBSE Class 11 Arts Stream', classLevel:'Class 11', stream:'Arts', boardId:'mbse', duration:'1 Year', fee:'₹1,400 / month', totalFee:'₹14,000 / year', mode:'Online', subjects:['History','Political Science','Education','Mizo','English'], features:['Answer Writing Sessions','Mizo Literature Support','PDF Notes Library'], rating:4.8, learners:1320 },
  { id:'mbse-class-12-sci', title:'MBSE Class 12 Science Board Batch', classLevel:'Class 12', stream:'Science', boardId:'mbse', duration:'1 Year', fee:'₹1,600 / month', totalFee:'₹16,000 / year', mode:'Online', subjects:['Physics','Chemistry','Mathematics','Biology','English'], features:['HSSLC Full Syllabus Revision','Previous 10 Years Solved','Final Mock Series'], rating:4.9, learners:2050 },
  { id:'mbse-class-12-com', title:'MBSE Class 12 Commerce Board Batch', classLevel:'Class 12', stream:'Commerce', boardId:'mbse', duration:'1 Year', fee:'₹1,500 / month', totalFee:'₹15,000 / year', mode:'Online', subjects:['Accountancy','Business Studies','Economics','English'], features:['Company Accounts Deep Dive','State Model Papers','Full Length Mocks'], rating:4.8, learners:1480 },
  { id:'mbse-class-12-art', title:'MBSE Class 12 Arts Board Batch', classLevel:'Class 12', stream:'Arts', boardId:'mbse', duration:'1 Year', fee:'₹1,500 / month', totalFee:'₹15,000 / year', mode:'Online', subjects:['History','Political Science','Education','Mizo','English'], features:['HSSLC Answer Structuring','Mizo Literature Support','Live Seminar Doubt Clearing'], rating:4.8, learners:1610 }
];

/* thumbnails use the same photo + gradient recipe as the Courses page */
const IC = {
  book:'<path d="M4 19V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 0 2 2h14"/>',
  flask:'<path d="M9.5 3h5M10 3v5.5L4.8 18a2 2 0 0 0 1.8 3h10.8a2 2 0 0 0 1.8-3L14 8.5V3"/><path d="M7.5 15h9"/>',
  chart:'<path d="M4 20V10M10 20V4M16 20v-7"/><path d="M2 20h20"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18"/>'
};
const G = {
  green:'rgba(15,157,107,0.72),rgba(11,91,62,0.88)',
  teal:'rgba(20,184,160,0.72),rgba(11,91,62,0.88)',
  mint:'rgba(15,157,107,0.72),rgba(20,184,160,0.88)',
  gold:'rgba(255,178,29,0.72),rgba(242,140,15,0.88)',
  orange:'rgba(255,122,69,0.72),rgba(225,77,42,0.88)',
  violet:'rgba(124,92,252,0.72),rgba(75,52,199,0.88)',
  blue:'rgba(59,130,246,0.72),rgba(29,78,216,0.88)',
  pink:'rgba(236,78,134,0.72),rgba(193,58,104,0.88)'
};
const T = {
  'cbse-class-8':      { dot:'#0F9D6B', ic:'book',  lvl:'Foundation', g:G.green,  p:'photo-1560785496-3c9d27877182' },
  'cbse-class-9':      { dot:'#12b3a6', ic:'book',  lvl:'Foundation', g:G.teal,   p:'photo-1517971129774-8a2b38fa128e' },
  'cbse-class-10':     { dot:'#FFB21D', ic:'book',  lvl:'Board year', g:G.gold,   p:'photo-1434030216411-0b793f4b4173' },
  'cbse-class-11-sci': { dot:'#7C5CFC', ic:'flask', lvl:'Science',    g:G.violet, p:'photo-1513258496099-48168024aec0' },
  'cbse-class-11-com': { dot:'#3b82f6', ic:'chart', lvl:'Commerce',   g:G.blue,   p:'photo-1590821091890-bdcc3c1e2b37' },
  'cbse-class-11-art': { dot:'#ec4e86', ic:'globe', lvl:'Arts',       g:G.pink,   p:'photo-1585661417298-8236a5f449aa' },
  'cbse-class-12-sci': { dot:'#7C5CFC', ic:'flask', lvl:'Board year', g:G.violet, p:'photo-1614283226124-5a2f0f23752b' },
  'cbse-class-12-com': { dot:'#3b82f6', ic:'chart', lvl:'Board year', g:G.blue,   p:'photo-1514369118554-e20d93546b30' },
  'cbse-class-12-art': { dot:'#ec4e86', ic:'globe', lvl:'Board year', g:G.pink,   p:'photo-1505751172876-fa1923c5c528' },
  'mbse-class-8':      { dot:'#0F9D6B', ic:'book',  lvl:'Foundation', g:G.mint,   p:'photo-1532094349884-543bc11b234d' },
  'mbse-class-9':      { dot:'#12b3a6', ic:'book',  lvl:'HSLC prep',  g:G.mint,   p:'photo-1532187643603-ba119ca4109e' },
  'mbse-class-10':     { dot:'#E14D2A', ic:'book',  lvl:'Board year', g:G.orange, p:'photo-1694230155228-cdde50083573' },
  'mbse-class-11-sci': { dot:'#7C5CFC', ic:'flask', lvl:'Science',    g:G.violet, p:'photo-1584982751601-97dcc096659c' },
  'mbse-class-11-com': { dot:'#3b82f6', ic:'chart', lvl:'Commerce',   g:G.blue,   p:'photo-1554475900-0a0350e3fc7b' },
  'mbse-class-11-art': { dot:'#ec4e86', ic:'globe', lvl:'Arts',       g:G.pink,   p:'photo-1571260899304-425eee4c7efc' },
  'mbse-class-12-sci': { dot:'#7C5CFC', ic:'flask', lvl:'HSSLC year', g:G.violet, p:'photo-1598981457915-aea220950616' },
  'mbse-class-12-com': { dot:'#3b82f6', ic:'chart', lvl:'HSSLC year', g:G.blue,   p:'photo-1741699428220-65f37f3fbbcb' },
  'mbse-class-12-art': { dot:'#ec4e86', ic:'globe', lvl:'HSSLC year', g:G.pink,   p:'photo-1505751172876-fa1923c5c528' }
};
const IMGQ = 'w=800&h=400&fit=crop&auto=format&q=75';
const thumbBg = id => `linear-gradient(135deg,${T[id].g}),url('https://images.unsplash.com/${T[id].p}?${IMGQ}') center/cover`;

const CLASSES = ['Class 8','Class 9','Class 10','Class 11','Class 12'];
const STREAMS = ['Science','Commerce','Arts'];

/* ================= STATE ================= */
let category = 'central', boardId = 'cbse', klass = null, stream = null;
let query = '', boardQuery = '', sortBy = 'rec';
let modalCourse = null, modalSlot = null, compared = [];

const feeOf = c => c.fee.split('/')[0].trim();
const feeNum = c => parseInt(c.fee.replace(/[^\d]/g,''), 10);
const boardOf = id => BOARDS.find(b => b.id === id) || BOARDS[0];
const countFor = id => COURSES.filter(c => c.boardId === id).length;

/* ================= FILTER PANEL ================= */
function toggleGroup(btn){
  btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') !== 'true');
}

function renderBoards(){
  const q = boardQuery.trim().toLowerCase();
  const list = BOARDS.filter(b => b.category === category)
    .filter(b => !q || b.code.toLowerCase().includes(q) || b.name.toLowerCase().includes(q));

  document.getElementById('boardList').innerHTML = list.length ? list.map(b => {
    const n = countFor(b.id);
    return b.isAvailable
      ? `<button class="fp-opt ${b.id===boardId?'on':''}" type="button" title="${b.name}" onclick="selectBoard('${b.id}')">
           <span class="fp-radio"><i></i></span><b>${b.code}</b><span class="fp-n">${n}</span>
         </button>`
      : `<button class="fp-opt" type="button" disabled title="${b.name}">
           <span class="fp-radio"></span><b>${b.code}</b><span class="fp-soon">Soon</span>
         </button>`;
  }).join('') : `<p class="fp-none">No board matches &ldquo;${boardQuery}&rdquo;.</p>`;

  const segs = document.querySelectorAll('.fp-seg button');
  segs[0].setAttribute('aria-selected', category === 'central');
  segs[1].setAttribute('aria-selected', category === 'state');
}

function renderChips(){
  document.getElementById('classChips').innerHTML =
    [`<button class="pill ${klass===null?'on':''}" type="button" onclick="selectClass(null)">All</button>`]
    .concat(CLASSES.map(c =>
      `<button class="pill ${klass===c?'on':''}" type="button" onclick="selectClass('${c}')">${c.replace('Class ','Class ')}</button>`
    )).join('');

  document.getElementById('streamChips').innerHTML =
    [`<button class="pill ${stream===null?'on':''}" type="button" onclick="selectStream(null)">All</button>`]
    .concat(STREAMS.map(s =>
      `<button class="pill ${stream===s?'on':''}" type="button" onclick="selectStream('${s}')">${s}</button>`
    )).join('');

  const senior = klass === null || klass === 'Class 11' || klass === 'Class 12';
  document.getElementById('streamGroup').style.display = senior ? 'block' : 'none';
}

function setCategory(c){ category = c; boardQuery = ''; document.getElementById('boardFind').value = ''; renderBoards(); }
function findBoard(v){ boardQuery = v; renderBoards(); }
function selectBoard(id){ boardId = id; klass = null; stream = null; renderBoards(); renderChips(); renderCourses(); }
function selectClass(c){ klass = c; if (c !== 'Class 11' && c !== 'Class 12') stream = null; renderChips(); renderCourses(); }
function selectStream(s){ stream = s; renderChips(); renderCourses(); }
function setSort(v){ sortBy = v; renderCourses(); }

function handleSearch(q){
  query = q;
  document.getElementById('searchClear').classList.toggle('show', q.length > 0);
  renderCourses();
}
function clearSearch(){ document.getElementById('searchInput').value = ''; handleSearch(''); }

function resetAllFilters(){
  category = 'central'; boardId = 'cbse'; klass = null; stream = null;
  query = ''; boardQuery = ''; sortBy = 'rec';
  document.getElementById('searchInput').value = '';
  document.getElementById('boardFind').value = '';
  document.getElementById('sortSel').value = 'rec';
  document.getElementById('searchClear').classList.remove('show');
  renderBoards(); renderChips(); renderCourses();
}

function openPanel(){ document.getElementById('fpanel').classList.add('open'); document.getElementById('scrim').classList.add('open'); document.body.style.overflow='hidden'; }
function closePanel(){ document.getElementById('fpanel').classList.remove('open'); document.getElementById('scrim').classList.remove('open'); document.body.style.overflow=''; }

/* ================= COURSE GRID ================= */
function stars(rating){
  const full = Math.round(rating);
  let out = '';
  for (let i = 1; i <= 5; i++)
    out += `<svg viewBox="0 0 24 24" fill="${i<=full?'#FFB21D':'#E3E8E4'}"><path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 17.1l-5.7 3.1 1.2-6.3L2.8 9.5l6.4-.8z"/></svg>`;
  return out;
}

function currentList(){
  let list = COURSES.filter(c => {
    if (c.boardId !== boardId) return false;
    if (klass && c.classLevel !== klass) return false;
    if (stream && c.stream !== stream) return false;
    if (query.trim()){
      const q = query.toLowerCase();
      return c.title.toLowerCase().includes(q)
          || c.classLevel.toLowerCase().includes(q)
          || c.stream.toLowerCase().includes(q)
          || c.subjects.some(s => s.toLowerCase().includes(q));
    }
    return true;
  });

  if (sortBy === 'popular') list = list.slice().sort((a,b) => b.learners - a.learners);
  else if (sortBy === 'rating') list = list.slice().sort((a,b) => b.rating - a.rating || b.learners - a.learners);
  else if (sortBy === 'fee') list = list.slice().sort((a,b) => feeNum(a) - feeNum(b));
  return list;
}

function renderApplied(){
  const bits = [];
  if (klass)  bits.push(['Class', klass, 'selectClass(null)']);
  if (stream) bits.push(['Stream', stream, 'selectStream(null)']);
  if (query.trim()) bits.push(['Search', `\u201c${query.trim()}\u201d`, 'clearSearch()']);

  document.getElementById('fbtnCount').textContent = bits.length + 1;

  document.getElementById('applied').innerHTML = bits.length
    ? bits.map(([lab,val,fn]) =>
        `<span class="ap-chip">${lab}: ${val}<button type="button" aria-label="Remove ${lab} filter" onclick="${fn}">&times;</button></span>`
      ).join('') + `<button class="ap-clear" type="button" onclick="resetAllFilters()">Clear all</button>`
    : '';
}

function renderCourses(){
  const grid = document.getElementById('courseGrid');
  const list = currentList();
  const b = boardOf(boardId);

  document.getElementById('gridTot').textContent = `${list.length} batch${list.length===1?'':'es'}`;
  document.getElementById('gridTitle').textContent = `${b.code} courses`;
  document.getElementById('gridSub').textContent = `${b.name} \u00b7 live classes, tests and notes mapped to the syllabus`;
  document.getElementById('emptyState').classList.toggle('show', list.length === 0);
  renderApplied();

  grid.innerHTML = list.map(c => {
    const t = T[c.id], on = compared.includes(c.id);
    return `
    <article class="fc-card rv" onclick="openModal('${c.id}','overview')">
      <div class="fc-thumb" style="background:${thumbBg(c.id)}">
        <span class="fc-ribbon">${c.classLevel}</span>
        <span class="fc-thumb-ic"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${IC[t.ic]}</svg></span>
        <button class="fc-heart ${on?'on':''}" type="button" title="${on?'Remove from compare':'Add to compare'}" aria-label="Compare course" onclick="event.stopPropagation();toggleCompare('${c.id}')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>
        </button>
        <span class="fc-lvl">${t.lvl}</span>
      </div>
      <div class="fc-body">
        <div class="fc-rate">${stars(c.rating)}<span>(${c.learners.toLocaleString()})</span></div>
        <h3>${c.title}</h3>
        <span class="fc-board"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 2 8l10 5 10-5-10-5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5"/></svg>${b.code}</span>
        <div class="fc-fact"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>${c.duration} &middot; ${c.mode} &middot; ${c.subjects.length} subjects</div>
        <div class="fc-spacer"></div>
        <div class="fc-foot">
          <span class="fc-price">${feeOf(c)}<small> /month</small></span>
          <button type="button" class="fc-enroll" onclick="event.stopPropagation();openModal('${c.id}','enroll')">Enrol now <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
        </div>
      </div>
    </article>`;
  }).join('');

  requestAnimationFrame(() => grid.querySelectorAll('.rv').forEach((el,i) =>
    setTimeout(() => el.classList.add('in'), i * 45)));
}

/* ================= MODAL ================= */
function openModal(id, tab){
  modalCourse = COURSES.find(c => c.id === id);
  modalSlot = null;
  const c = modalCourse, b = boardOf(c.boardId);

  document.getElementById('bmEyebrow').innerHTML = `${b.code} &middot; ${c.classLevel}${c.stream!=='General' ? ' &middot; '+c.stream : ''}`;
  document.getElementById('bmTitle').textContent = c.title;
  document.getElementById('bmSub').innerHTML =
    `Live classes, tests and notes mapped to the <b>${b.name}</b> syllabus. <b>${feeOf(c)}</b> a month, or ${c.totalFee}.`;

  document.getElementById('bmMain').hidden = false;
  document.getElementById('bmDone').hidden = true;
  switchTab(tab);
  document.getElementById('courseModal').hidden = false;
  document.body.style.overflow = 'hidden';
}

function switchTab(tab){
  ['overview','syllabus','enroll'].forEach(t =>
    document.getElementById('tab' + t[0].toUpperCase() + t.slice(1)).setAttribute('aria-selected', t === tab));

  const c = modalCourse, pane = document.getElementById('bmPane');
  const nextBtn = `<button class="bm-go" type="button" onclick="switchTab('enroll')">Enrol now <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>`;

  if (tab === 'overview'){
    pane.innerHTML = `
      <div class="bm-facts">
        <div class="bm-fact"><span>Duration</span><b>${c.duration}</b></div>
        <div class="bm-fact"><span>Mode</span><b>${c.mode}</b></div>
        <div class="bm-fact"><span>Rating</span><b>${c.rating} / 5</b></div>
      </div>
      <p class="bm-lab">Subjects</p>
      <div class="bm-chips">${c.subjects.map(s => `<span class="bm-chip">${s}</span>`).join('')}</div>
      <p class="bm-lab">What you get</p>
      <ul class="bm-feat">${c.features.map(f => `<li><i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></i>${f}</li>`).join('')}</ul>
      <div class="bm-foot"><button class="bm-cancel" type="button" data-close>Close</button>${nextBtn}</div>`;
  }

  else if (tab === 'syllabus'){
    pane.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="bm-term"><b>Term 1</b><ul><li>Foundations &amp; theory</li><li>Core concepts &amp; practice</li><li>Mid-term revision</li></ul></div>
        <div class="bm-term"><b>Term 2</b><ul><li>Advanced modules</li><li>Board pattern tests</li><li>Final mock series</li></ul></div>
      </div>
      <p class="bm-sub" style="margin-top:14px">Chapter-wise breakdown for all ${c.subjects.length} subjects opens in the app once you enrol.</p>
      <div class="bm-foot"><button class="bm-cancel" type="button" data-close>Close</button>${nextBtn}</div>`;
  }

  else {
    const slots = [
      ['Evening batch','5:30 PM – 7:30 PM &middot; Mon to Sat'],
      ['Morning batch','7:00 AM – 9:00 AM &middot; Mon to Sat'],
      ['Night revision','8:00 PM – 9:30 PM &middot; Mon, Wed, Fri']
    ];
    pane.innerHTML = `
      <form onsubmit="submitEnrol(event)">
        <div class="bm-field"><label for="fName">Student name</label><input id="fName" type="text" required placeholder="Rahul Sharma"></div>
        <div class="bm-field"><label for="fPhone">Phone number</label><input id="fPhone" type="tel" required placeholder="+91 98765 43210"></div>
        <p class="bm-lab">Pick a batch slot</p>
        <div class="bm-list" role="radiogroup" aria-label="Batch slot">
          ${slots.map(([n,d]) => `
            <button class="bm-opt" type="button" role="radio" aria-checked="false" data-slot="${n}" onclick="pickSlot(this)">
              <span class="bm-tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
              <span><b>${n}</b><i>${d}</i></span>
            </button>`).join('')}
        </div>
        <div class="bm-foot">
          <button class="bm-cancel" type="button" data-close>Cancel</button>
          <button class="bm-go" type="submit">Confirm enrolment <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
        </div>
      </form>`;
  }
}

function pickSlot(el){
  el.closest('.bm-list').querySelectorAll('.bm-opt').forEach(o => o.setAttribute('aria-checked','false'));
  el.setAttribute('aria-checked','true');
  modalSlot = el.dataset.slot;
}

function submitEnrol(e){
  e.preventDefault();
  if (!modalSlot){ document.querySelector('.bm-list .bm-opt').focus(); return; }
  const name = document.getElementById('fName').value.trim();
  document.getElementById('bmDoneSub').innerHTML =
    `${name}, your seat in <b>${modalCourse.title}</b> is reserved for the <b>${modalSlot.toLowerCase()}</b>. We&rsquo;ll call to confirm the first class.`;
  document.getElementById('bmMain').hidden = true;
  document.getElementById('bmDone').hidden = false;
}

function closeModal(){
  document.getElementById('courseModal').hidden = true;
  document.body.style.overflow = '';
}
function __onDocClick(e){ if (e.target.closest('[data-close]')) closeModal(); }
function __onDocKey(e){ if (e.key === 'Escape'){ closeModal(); closePanel(); } }
document.addEventListener('click', __onDocClick);
document.addEventListener('keydown', __onDocKey);

/* ================= COMPARE ================= */
function toggleCompare(id){
  compared = compared.includes(id)
    ? compared.filter(x => x !== id)
    : (compared.length >= 3 ? compared : compared.concat(id));
  renderCourses(); renderTray();
}
function clearCompare(){ compared = []; renderCourses(); renderTray(); }

function renderTray(){
  const tray = document.getElementById('tray');
  document.getElementById('trayCount').textContent = compared.length;
  tray.classList.toggle('open', compared.length > 0);
  document.getElementById('trayItems').innerHTML = COURSES.filter(c => compared.includes(c.id)).map(c => `
    <div class="tray-item">
      <span class="dot" style="background:${T[c.id].dot}"></span>
      <div><b>${c.title}</b><span>${feeOf(c)} /month &middot; ${boardOf(c.boardId).code}</span></div>
      <button type="button" title="Remove" onclick="toggleCompare('${c.id}')">&times;</button>
    </div>`).join('');
}

/* ===== bridge: inline onclick="" attributes resolve against window ===== */
const __API = { toggleGroup, setCategory, findBoard, selectBoard, selectClass, selectStream, setSort, handleSearch, clearSearch, resetAllFilters, openPanel, closePanel, openModal, switchTab, pickSlot, submitEnrol, closeModal, toggleCompare, clearCompare };
Object.assign(window, __API);

/* ================= INIT ================= */
renderBoards();
renderChips();
renderCourses();
    /* ==================================================================
       END original <script>
       ================================================================== */

    return () => {
      document.removeEventListener("click", __onDocClick);
      document.removeEventListener("keydown", __onDocKey);
      Object.keys(__API).forEach((k) => {
        if (window[k] === __API[k]) delete window[k];
      });
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div dangerouslySetInnerHTML={{ __html: MARKUP }} />
    </>
  );
}
