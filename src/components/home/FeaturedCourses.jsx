
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FEATURED_COURSES, COURSE_TABS } from "./homeData";
import { getPublicFeatured, toFeaturedCard } from "../../api/coursesApi";
import { useHomeContent } from "../../hooks/useHomeContent";

// Featured Courses — self-contained. Markup + full stylesheet unchanged from the
// original ShikshaCom page, so this renders correctly on its own with no deps.

const css = `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
  :root{
    --coral:#0F9D6B; --coral-dark:#0B5B3E; --coral-soft:#E7F6EE;
    --ink:#0B2E20; --ink-2:#2B4237; --body:#5E7469;
    --peach:#F6FAF7; --peach-2:#E7F6EE; --line:#EDF3EE; --line-2:#EDF5EF; --white:#fff;
    --violet:#7C5CFC; --green:#0F9D6B; --blue:#3b82f6; --red:#E14D2A; --gold:#FFB21D; --pink:#ec4e86; --teal:#12b3a6;
    --display:'Poppins', system-ui, sans-serif;
    --font:'Poppins', system-ui, -apple-system, sans-serif;
    --sh-sm:0 6px 22px rgba(11,46,32,.06);
    --sh:0 18px 46px rgba(11,91,62,.12);
    --sh-lg:0 30px 70px rgba(11,46,32,.14);
  }
  *,*::before,*::after{box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{margin:0;font-family:var(--font);color:var(--ink);background:#fff;-webkit-font-smoothing:antialiased;line-height:1.65;overflow-x:hidden}
  h1,h2,h3,h4{font-family:var(--display);color:var(--ink);margin:0;line-height:1.18;font-weight:700;letter-spacing:-.01em}
  p{margin:0}
  a{color:inherit;text-decoration:none}
  svg{display:block}
  ::selection{background:var(--coral);color:#fff}
  .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
  .sec{position:relative;padding:clamp(56px,7.5vw,100px) 0}
  .sec.peach{background:var(--peach)}

  /* eyebrow: orange underlined label (Zoomy) */
  .eyebrow{display:inline-flex;flex-direction:column;align-items:center;gap:3px;font-family:var(--font);font-weight:700;font-size:12.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--coral);margin:0 0 16px}
  .eyebrow.left{align-items:flex-start}
  .eyebrow u{text-decoration:none;border-bottom:2px solid var(--coral);padding-bottom:5px}
  .sec-head{max-width:620px;margin:0 auto clamp(38px,5vw,54px);text-align:center}
  .sec-head h2{font-size:clamp(28px,4.1vw,42px);font-weight:700}
  .sec-head p{margin-top:14px;color:var(--body);font-size:15.5px}
  .em{color:var(--coral)}

  .btn{display:inline-flex;align-items:center;gap:9px;font-family:var(--font);font-weight:700;font-size:14.5px;padding:13px 26px;border-radius:999px;border:2px solid transparent;cursor:pointer;transition:transform .2s,box-shadow .2s,background .2s,color .2s,border-color .2s}
  .btn svg{width:16px;height:16px;transition:transform .2s}
  .btn:hover svg{transform:translateX(3px)}
  .btn-coral{background:var(--coral);color:#fff;box-shadow:0 12px 26px rgba(15,157,107,.32)}
  .btn-coral:hover{background:var(--coral-dark);transform:translateY(-2px);box-shadow:0 16px 32px rgba(15,157,107,.4)}
  .btn-ghost{background:#fff;color:var(--coral);border-color:var(--coral)}
  .btn-ghost:hover{background:var(--coral);color:#fff;transform:translateY(-2px)}
  .btn-white{background:#fff;color:var(--coral-dark)}
  .btn-white:hover{transform:translateY(-2px);box-shadow:0 16px 32px rgba(0,0,0,.16)}
  .btn:focus-visible{outline:3px solid var(--coral);outline-offset:3px}
  .center{display:flex;justify-content:center;margin-top:46px}

  .rv{opacity:0;transform:translateY(24px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1)}
  .rv.in{opacity:1;transform:none}

  /* ===================== HERO ===================== */
  .hero{padding:clamp(40px,6vw,72px) 0 clamp(20px,4vw,44px);overflow:hidden}
  .hero-grid{display:grid;grid-template-columns:1.06fr 1fr;gap:clamp(28px,4vw,56px);align-items:center}
  .hero-vis{position:relative;display:grid;place-items:center;min-height:420px;order:-1}
  .hero-disc{position:relative;width:min(440px,94%);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 50% 44%,var(--coral-soft),var(--peach) 72%);display:grid;place-items:center}
  .hero-disc::before{content:"";position:absolute;inset:5%;border-radius:50%;border:2px dashed rgba(15,157,107,.3)}
  .hero-art{position:relative;z-index:2;width:90%}
  .hero-art svg{width:100%;height:auto}
  .doodle{position:absolute;pointer-events:none;z-index:1}
  .d1{top:2%;right:4%;width:80px;color:var(--coral);opacity:.5}
  .d2{bottom:4%;left:-1%;width:96px;color:var(--blue);opacity:.5}
  .d3{top:24%;left:-3%;width:13px;height:13px;border-radius:50%;background:var(--gold)}
  .d4{bottom:26%;right:-1%;width:11px;height:11px;border-radius:50%;background:var(--violet)}
  .float{position:absolute;z-index:3;display:flex;align-items:center;gap:10px;background:#fff;border-radius:14px;padding:10px 13px;box-shadow:var(--sh-lg);animation:bob 5s ease-in-out infinite}
  .float b{display:block;font-family:var(--display);font-weight:600;font-size:13px;line-height:1.2}
  .float span{color:var(--body);font-size:11px}
  .float .fi{flex:none;width:32px;height:32px;border-radius:10px;display:grid;place-items:center}
  .float .fi svg{width:16px;height:16px}
  .f1{top:9%;left:-3%}
  .f2{bottom:15%;right:-5%;animation-delay:1.3s}
  .livedot{width:8px;height:8px;border-radius:50%;background:var(--coral);animation:pulse 1.8s infinite}
  @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes pulse{0%{box-shadow:0 0 0 0 rgba(15,157,107,.5)}70%{box-shadow:0 0 0 9px rgba(15,157,107,0)}100%{box-shadow:0 0 0 0 rgba(15,157,107,0)}}

  .hero h1{font-size:clamp(34px,5vw,54px);font-weight:800;letter-spacing:-.02em;color:var(--ink)}
  .hero h1 .mark{position:relative;white-space:nowrap}
  .hero h1 .mark svg{position:absolute;left:-10px;right:-10px;bottom:-8px;top:-6px;width:calc(100% + 20px);height:calc(100% + 14px);color:var(--coral);z-index:-1}
  .hero-sub{margin-top:22px;max-width:500px;font-size:16.5px;color:var(--body)}
  .searchbar{margin-top:28px;display:flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--line);border-radius:999px;padding:8px 8px 8px 20px;box-shadow:var(--sh-sm);max-width:540px}
  .searchbar .si{color:var(--coral);flex:none}
  .searchbar input{flex:1;border:none;outline:none;font-family:var(--font);font-size:14.5px;color:var(--ink);background:none;min-width:0}
  .searchbar select{border:none;outline:none;background:none;font-family:var(--font);font-weight:600;font-size:13.5px;color:var(--ink-2);border-left:1px solid var(--line);padding:0 12px;cursor:pointer}
  .searchbar .btn{padding:11px 22px;flex:none}
  .hero-tag{margin-top:18px;font-size:13.5px;font-weight:600;color:var(--coral)}
  .hero-tag b{color:var(--ink)}

  /* ===================== WHY SHIKSHA — scrolling cards ===================== */
  .deals{display:grid;grid-template-columns:290px 1fr;gap:44px;align-items:center}
  .deals-head h2{font-size:clamp(26px,3.4vw,36px);font-weight:700}
  .deals-head p{margin-top:14px;color:var(--body);font-size:15px;max-width:260px}
  .deals-arrows{margin-top:26px;display:flex;gap:12px}
  .arrow{width:46px;height:46px;border-radius:50%;border:1.5px solid var(--line);background:#fff;color:var(--ink);cursor:pointer;display:grid;place-items:center;transition:background .2s,color .2s,border-color .2s,transform .2s}
  .arrow:hover{background:var(--coral);color:#fff;border-color:var(--coral);transform:translateY(-2px)}
  .arrow svg{width:18px;height:18px}
  .arrow:focus-visible{outline:3px solid var(--coral);outline-offset:2px}
  .deals-scroll{display:flex;gap:20px;overflow-x:auto;scroll-behavior:smooth;padding:6px 2px 16px;scroll-snap-type:x mandatory;min-width:0}
  .deals-scroll::-webkit-scrollbar{height:6px}
  .deals-scroll::-webkit-scrollbar-track{background:var(--peach);border-radius:9px}
  .deals-scroll::-webkit-scrollbar-thumb{background:var(--peach-2);border-radius:9px}
  .deal{flex:0 0 calc((100% - 40px) / 3);min-width:0;scroll-snap-align:start;background:var(--peach);border-radius:20px;padding:28px 26px;transition:transform .3s,box-shadow .3s,background .3s}
  .deal:hover{transform:translateY(-6px);background:#fff;box-shadow:var(--sh)}
  .deal-ic{width:56px;height:56px;border-radius:16px;display:grid;place-items:center;margin-bottom:18px}
  .deal-ic svg{width:27px;height:27px;color:#fff}
  .deal h3{font-size:18.5px;font-weight:600}
  .deal p{margin-top:10px;font-size:14px;color:var(--body)}

  /* ===================== TEACHERS & STUDENTS ===================== */
  .duo{display:grid;grid-template-columns:1fr 1fr;gap:26px}
  .duo-card{background:#fff;border-radius:24px;padding:52px 40px 46px;text-align:center;display:flex;flex-direction:column;align-items:center;box-shadow:var(--sh-sm);transition:transform .3s,box-shadow .3s;position:relative;overflow:hidden;border:1px solid transparent}
  .duo-card:hover{transform:translateY(-6px);box-shadow:var(--sh)}
  /* Themed tinted backgrounds */
  .duo-card.teach{background:linear-gradient(160deg,#FFF9E6 0%,#FDEFC1 100%);border-color:rgba(255,178,29,.22)}
  .duo-card.learn{background:linear-gradient(160deg,#EDFBF3 0%,#D9F1E1 100%);border-color:rgba(15,157,107,.22)}
  /* Barely-visible dot pattern texture */
  .duo-card::before{content:"";position:absolute;inset:0;background-image:radial-gradient(circle at center,rgba(11,46,32,.08) 1.1px,transparent 1.6px);background-size:22px 22px;pointer-events:none;z-index:0}
  /* Large ghost shape in corner — very low opacity */
  .duo-ghost{position:absolute;right:-42px;bottom:-42px;width:230px;height:230px;opacity:.07;pointer-events:none;z-index:0}
  .duo-card.teach .duo-ghost{color:#B45309}
  .duo-card.learn .duo-ghost{color:var(--coral-dark)}
  .duo-ghost svg{width:100%;height:100%}
  /* Small accent pill above icon */
  .duo-pill{position:relative;z-index:1;display:inline-block;font-family:var(--font);font-weight:700;font-size:11px;letter-spacing:.14em;text-transform:uppercase;padding:6px 14px;border-radius:999px;margin-bottom:20px}
  .duo-card.teach .duo-pill{background:rgba(255,178,29,.18);color:#8A4A05}
  .duo-card.learn .duo-pill{background:rgba(15,157,107,.14);color:var(--coral-dark)}
  /* Bring content above decorations */
  .duo-ill,.duo-card h3,.duo-card p,.duo-card .btn{position:relative;z-index:1}
  .duo-ill{width:88px;height:88px;margin-bottom:22px;opacity:.95}
  .duo-card.teach .duo-ill{color:#8A4A05}
  .duo-card.learn .duo-ill{color:var(--coral-dark)}
  .duo-ill svg{width:100%;height:100%}
  .duo-card h3{font-size:24px;font-weight:700}
  .duo-card p{margin-top:12px;font-size:14.5px;color:var(--body);max-width:340px}
  .duo-card .btn{margin-top:26px}

  /* ===================== CATEGORIES ===================== */
  .cats{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
  .cat{background:#fff;border-radius:24px;overflow:hidden;box-shadow:var(--sh-sm);transition:transform .3s,box-shadow .3s;display:flex;flex-direction:column;position:relative}
  .cat:hover{transform:translateY(-8px);box-shadow:var(--sh-lg)}
  .cat-head{padding:26px 24px 24px;color:#fff;position:relative;overflow:hidden}
  .cat-head::before{content:"";position:absolute;top:-50px;right:-40px;width:170px;height:170px;border-radius:50%;background:rgba(255,255,255,.09);pointer-events:none}
  .cat-head::after{content:"";position:absolute;bottom:-40px;left:-30px;width:110px;height:110px;border-radius:50%;background:rgba(255,255,255,.07);pointer-events:none}
  .cat-head-row{display:flex;align-items:center;gap:14px;position:relative;z-index:1}
  .cat-ic{width:52px;height:52px;border-radius:14px;background:rgba(255,255,255,.22);display:grid;place-items:center;flex:none;backdrop-filter:blur(4px)}
  .cat-ic svg{width:26px;height:26px;color:#fff}
  .cat-head b{display:block;font-family:var(--display);font-size:19px;font-weight:700;color:#fff;line-height:1.2;letter-spacing:-.01em}
  .cat-head i{font-style:normal;display:block;margin-top:4px;font-size:12.5px;font-weight:500;color:rgba(255,255,255,.9);letter-spacing:.01em}
  .cat-body{padding:22px 22px 22px;display:flex;flex-direction:column;flex:1;gap:16px}
  .cat-pills{display:flex;flex-wrap:wrap;gap:6px}
  .cat-pill{background:var(--peach);color:var(--ink-2);font-family:var(--font);font-size:11.5px;font-weight:600;padding:6px 11px;border-radius:999px;line-height:1}
  .cat-stat{display:flex;align-items:center;gap:8px;font-size:12.8px;color:var(--body);font-weight:500}
  .cat-stat svg{width:14px;height:14px;color:var(--coral);flex:none}
  .cat-cta{margin-top:auto;background:var(--ink);color:#fff;padding:13px 18px;border-radius:12px;font-family:var(--font);font-weight:700;font-size:13.5px;display:flex;align-items:center;justify-content:center;gap:8px;transition:background .25s,transform .2s;cursor:pointer;border:none;width:100%}
  .cat-cta svg{width:14px;height:14px;transition:transform .2s}
  .cat-cta:hover{background:var(--coral);transform:translateY(-2px)}
  .cat-cta:hover svg{transform:translateX(3px)}
  .cat-cta:focus-visible{outline:3px solid var(--coral);outline-offset:2px}
  /* Gradient variants */
  .g-green{background:linear-gradient(135deg,#12b47a 0%,#0B5B3E 100%)}
  .g-warm{background:linear-gradient(135deg,#F59E0B 0%,#E14D2A 100%)}
  .g-cool{background:linear-gradient(135deg,#7C5CFC 0%,#12b3a6 100%)}

  /* ===================== FEATURED COURSES (fc-*) ===================== */
  .fc-tabs{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:40px}
  .fc-tab{font-family:var(--font);font-weight:700;font-size:13px;letter-spacing:.03em;text-transform:uppercase;padding:9px 18px;border-radius:999px;border:none;background:var(--coral-soft);color:var(--coral);cursor:pointer;transition:background .2s,color .2s}
  .fc-tab[aria-selected="true"]{background:var(--coral);color:#fff;box-shadow:0 8px 18px rgba(15,157,107,.3)}
  .fc-tab:focus-visible{outline:3px solid var(--coral);outline-offset:2px}
  .fc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
  .fc-card{background:#fff;border-radius:24px;overflow:hidden;border:1.5px solid var(--line);transition:transform .25s,box-shadow .25s;display:flex;flex-direction:column}
  .fc-card:hover{transform:translateY(-7px);box-shadow:0 26px 50px rgba(11,46,32,.13)}
  .fc-thumb{position:relative;height:170px;padding:16px;background-size:cover !important;background-position:center !important}
  .fc-thumb-ic{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:64px;height:64px;border-radius:20px;background:rgba(255,255,255,.16);display:grid;place-items:center;backdrop-filter:blur(2px)}
  .fc-thumb-ic svg{width:30px;height:30px}
  .fc-ribbon{position:absolute;top:14px;left:14px;background:var(--gold);color:var(--ink);font-family:var(--font);font-size:10.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;padding:5px 11px;border-radius:999px}
  .fc-heart{position:absolute;top:12px;right:12px;width:34px;height:34px;border-radius:50%;border:none;cursor:pointer;background:rgba(255,255,255,.2);display:grid;place-items:center;transition:background .2s;color:#fff}
  .fc-heart svg{width:16px;height:16px}
  .fc-heart.on{background:#fff;color:var(--red)}
  .fc-heart.on svg{fill:currentColor}
  .fc-lvl{position:absolute;bottom:-13px;left:18px;background:#fff;border:1.5px solid var(--line);color:var(--coral-dark);font-family:var(--font);font-size:10.5px;font-weight:700;padding:5px 13px;border-radius:999px;box-shadow:0 6px 14px rgba(11,46,32,.08)}
  .fc-body{padding:26px 20px 20px;display:flex;flex-direction:column;flex:1}
  .fc-rate{display:flex;align-items:center;gap:7px}
  .fc-rate svg{width:13px;height:13px}
  .fc-rate span{font-size:11.5px;color:var(--body)}
  .fc-body h3{font-family:var(--display);font-size:16.3px;font-weight:700;margin:8px 0 10px;line-height:1.35}
  .fc-fact{display:flex;align-items:center;gap:7px;font-size:11.8px;color:var(--body)}
  .fc-fact svg{width:14px;height:14px;color:#8AA396}
  .fc-fact i{font-style:normal;color:#D4E2D8}
  .fc-foot{display:flex;justify-content:space-between;align-items:center;margin-top:16px;border-top:1.5px dashed var(--line);padding-top:14px}
  .fc-foot:has(.fc-explore:only-child){justify-content:center;padding-top:16px}
  .fc-tutor{display:flex;align-items:center;gap:9px;font-family:var(--font);font-size:12.2px;font-weight:600;color:var(--ink-2)}
  .fc-av{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;color:#fff;font-family:var(--display);font-weight:700;font-size:11.5px;border:2.5px solid #fff;flex-shrink:0}
  .fc-price{font-family:var(--display);font-size:16.8px;font-weight:800;color:var(--coral)}
  .fc-price small{font-style:normal;font-size:10.5px;color:var(--body);font-weight:600}
  .fc-price.soon{font-family:var(--font);font-size:11.5px;font-weight:700;color:#B45309;background:#FFF3DC;padding:6px 12px;border-radius:999px}
  .fc-enroll{font-family:var(--font);font-weight:700;font-size:12.5px;padding:9px 16px;border-radius:999px;border:none;background:var(--coral);color:#fff;display:inline-flex;align-items:center;gap:6px;cursor:pointer;transition:background .2s,transform .2s}
  .fc-enroll svg{width:13px;height:13px}
  .fc-enroll:hover{background:var(--coral-dark);transform:translateY(-1px)}
  .fc-explore{font-family:var(--font);font-weight:700;font-size:13px;padding:11px 26px;border-radius:999px;border:none;background:var(--coral);color:#fff;cursor:pointer;transition:background .2s,transform .2s,box-shadow .2s;box-shadow:0 8px 18px rgba(15,157,107,.28)}
  .fc-explore:hover{background:var(--coral-dark);transform:translateY(-2px);box-shadow:0 12px 24px rgba(15,157,107,.36)}
  .fc-explore:focus-visible{outline:3px solid var(--coral);outline-offset:2px}

  /* ===================== WHY CHOOSE SHIKSHACOM ===================== */
  .why{display:grid;grid-template-columns:1fr 1.05fr;gap:clamp(36px,5vw,70px);align-items:center}
  .why-vis{position:relative;display:grid;place-items:center;padding:14px}
  .why-panel{position:relative;width:min(400px,96%);aspect-ratio:1/1.02;border-radius:34px;background:linear-gradient(150deg,var(--coral),var(--coral-dark));display:grid;place-items:center;box-shadow:var(--sh)}
  .why-art{width:92%;filter:drop-shadow(0 20px 30px rgba(0,0,0,.12))}
  .why-art svg{width:100%;height:auto}
  .why-play{position:absolute;right:16%;bottom:14%;width:60px;height:60px;border-radius:50%;background:#fff;color:var(--coral);display:grid;place-items:center;box-shadow:var(--sh-lg);cursor:pointer;z-index:4}
  .why-play svg{width:22px;height:22px;margin-left:3px}
  .badge{position:absolute;z-index:5;display:flex;align-items:center;gap:10px;background:#fff;border-radius:14px;padding:11px 14px;box-shadow:var(--sh-lg);font-family:var(--display);font-weight:600;font-size:13px}
  .badge .bi{width:32px;height:32px;border-radius:10px;display:grid;place-items:center}
  .badge .bi svg{width:17px;height:17px}
  .badge small{display:block;font-family:var(--font);font-weight:400;font-size:11px;color:var(--body)}
  .b-tl{top:6%;left:-4%}
  .b-tr{top:20%;right:-6%}
  .b-bl{bottom:12%;left:-6%}
  .why-copy .eyebrow{align-items:flex-start}
  .why-copy h2{font-size:clamp(27px,3.7vw,40px);font-weight:700}
  .why-copy>p{margin-top:16px;color:var(--body);font-size:15.5px;max-width:520px}
  .checks{margin-top:24px;display:flex;flex-direction:column;gap:16px}
  .check{display:flex;align-items:flex-start;gap:13px}
  .check .ck{flex:none;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;margin-top:1px}
  .check .ck svg{width:14px;height:14px;color:#fff}
  .check b{font-family:var(--display);font-weight:600;font-size:15.5px;color:var(--ink)}
  .check p{font-size:13.5px;color:var(--body);margin-top:2px}
  .why-copy .btn{margin-top:30px}

  /* ===================== FAQ ===================== */
  .faq{max-width:820px;margin:0 auto}
  .qa{background:#fff;border:1px solid var(--line-2);border-radius:15px;margin-bottom:13px;overflow:hidden;transition:box-shadow .25s,border-color .25s}
  .qa.open{box-shadow:var(--sh);border-color:transparent}
  .qa-q{width:100%;text-align:left;background:none;border:none;cursor:pointer;font-family:var(--display);font-weight:600;font-size:16px;color:var(--ink);padding:19px 22px;display:flex;align-items:center;justify-content:space-between;gap:16px}
  .qa-q:focus-visible{outline:3px solid var(--coral);outline-offset:-3px}
  .qa-ic{flex:none;width:30px;height:30px;border-radius:9px;background:var(--coral-soft);color:var(--coral);display:grid;place-items:center;transition:transform .3s,background .3s,color .3s}
  .qa-ic svg{width:16px;height:16px}
  .qa.open .qa-ic{transform:rotate(45deg);background:var(--coral);color:#fff}
  .qa-a{max-height:0;overflow:hidden;transition:max-height .35s ease}
  .qa-a p{padding:0 22px 21px;color:var(--body);font-size:14.4px}

  /* ===================== CTA ===================== */
  .cta{position:relative;overflow:hidden;background:linear-gradient(135deg,var(--coral),var(--coral-dark));border-radius:30px;padding:clamp(46px,7vw,74px) 24px;text-align:center;color:#fff;box-shadow:0 30px 70px rgba(11,91,62,.32)}
  .cta .eyebrow{color:#ffe1d5;justify-content:center}
  .cta .eyebrow u{border-color:#ffe1d5}
  .cta h2{color:#fff;font-size:clamp(30px,4.4vw,46px);font-weight:800}
  .cta p{margin:16px auto 0;max-width:520px;color:rgba(255,255,255,.92);font-size:16px}
  .cta-actions{margin-top:30px;display:flex;flex-wrap:wrap;gap:14px;justify-content:center}
  .cta .btn-out{background:transparent;color:#fff;border-color:rgba(255,255,255,.6)}
  .cta .btn-out:hover{background:rgba(255,255,255,.14);transform:translateY(-2px)}
  .cwm{position:absolute;opacity:.12;color:#fff}
  .cwm.a{top:-26px;left:-6px;width:120px}
  .cwm.b{bottom:-36px;right:-6px;width:140px}

  /* ===================== RESOURCES GRID ===================== */
  .res-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}
  .res-card{position:relative;overflow:hidden;display:flex;flex-direction:column;background:var(--tint,#fff);border:1px solid var(--line);border-radius:20px;padding:28px 26px;box-shadow:var(--sh-sm);transition:transform .3s,box-shadow .3s,border-color .3s}
  .res-card:hover{transform:translateY(-6px);box-shadow:var(--sh-lg);border-color:transparent}
  .res-ic{width:56px;height:56px;border-radius:16px;display:grid;place-items:center;margin-bottom:18px;background:var(--grad,linear-gradient(135deg,#12b47a 0%,#0B5B3E 100%));transition:transform .35s cubic-bezier(.2,.7,.2,1)}
  .res-ic svg{width:26px;height:26px;color:#fff}
  .res-card:hover .res-ic{transform:scale(1.07) rotate(-5deg)}
  .res-card h3{font-size:18.5px;font-weight:600;line-height:1.3}
  .res-card p{margin-top:10px;font-size:14px;color:var(--body);margin-bottom:24px}
  .res-link{margin-top:auto;width:100%;display:flex;align-items:center;justify-content:center;gap:8px;font-family:var(--font);font-weight:700;font-size:13.5px;color:#fff;background:var(--ink);padding:13px 18px;border-radius:12px;border:none;cursor:pointer;transition:background .25s,transform .2s}
  .res-link svg{width:14px;height:14px;transition:transform .2s}
  .res-link:hover{background:var(--coral);transform:translateY(-2px)}
  .res-link:hover svg{transform:translateX(3px)}
  .res-link:focus-visible{outline:3px solid var(--coral);outline-offset:2px}
  /* soft abstract corner decoration (premium, tinted per card) + keep content above it */
  .res-ic,.res-card h3,.res-card p,.res-link{position:relative;z-index:1}
  .res-ghost{position:absolute;right:-28px;bottom:-30px;width:196px;height:196px;color:var(--ghost,var(--coral));pointer-events:none;z-index:0}
  .res-ghost svg{width:100%;height:100%}

  /* ===================== RESPONSIVE ===================== */
  @media(max-width:980px){
    .hero-grid{grid-template-columns:1fr;text-align:center}
    .hero-vis{order:-1;min-height:340px}
    .hero-sub{margin-left:auto;margin-right:auto}
    .searchbar{margin-left:auto;margin-right:auto}
    .deals{grid-template-columns:1fr;gap:26px}
    .deals-head p{max-width:none}
    .deal{flex-basis:calc((100% - 20px) / 2)}
    .cats{grid-template-columns:repeat(3,1fr)}
    .fc-grid{grid-template-columns:repeat(2,1fr)}
    .why{grid-template-columns:1fr}
    .why-copy{text-align:center}
    .why-copy .eyebrow{align-items:center}
    .why-copy>p{margin-left:auto;margin-right:auto}
    .checks{max-width:460px;margin-left:auto;margin-right:auto;text-align:left}
    .why-vis{order:-1;margin-bottom:8px}
    .res-grid{grid-template-columns:repeat(2,1fr)}
  }
  @media(max-width:620px){
    .duo{grid-template-columns:1fr}
    .deal{flex-basis:100%}
    .cats{grid-template-columns:1fr}
    .fc-grid{grid-template-columns:1fr}
    .res-grid{grid-template-columns:1fr}
    .res-ghost{width:158px;height:158px;right:-30px;bottom:-34px}
    .searchbar{flex-wrap:wrap;border-radius:20px;padding:14px}
    .searchbar select{border-left:none;padding-left:0}
    .searchbar .btn{width:100%;justify-content:center}
    .float{display:none}
    .hero h1{font-size:clamp(30px,8.5vw,40px)}
    .badge{transform:scale(.9)}
  }
  @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.rv{opacity:1;transform:none}}

  /* ===== ShikshaCom Collaboration section (merged in) ===== */
  /* ===================== COLLABORATION SECTION ===================== */
  .collab{position:relative;padding:clamp(56px,7.5vw,104px) 0;overflow:hidden;
    background:var(--peach)} /* main bg = light green (matches Why ShikshaCom) */
  /* blurred ambient blobs */
  .collab::before,.collab::after{content:"";position:absolute;border-radius:50%;filter:blur(70px);z-index:0;pointer-events:none}
  .collab::before{width:420px;height:420px;top:-120px;left:-120px;background:radial-gradient(circle,rgba(15,157,107,.16),transparent 70%)}
  .collab::after{width:460px;height:460px;bottom:-160px;right:-140px;background:radial-gradient(circle,rgba(124,92,252,.12),transparent 70%)}

  .collab-grid{position:relative;z-index:1;display:grid;grid-template-columns:1.02fr 1fr;gap:clamp(30px,4.5vw,64px);align-items:center}
  /* min-width:0 lets the columns shrink so the max-content marquee track can't blow out the layout */
  .collab-copy,.collab-vis{min-width:0}

  /* ---- left column ---- */
  .collab-copy h2{font-size:clamp(30px,4.4vw,46px);font-weight:800;letter-spacing:-.02em}
  .collab-copy .sub{margin-top:18px;max-width:500px;font-size:16px;color:var(--body)}

  /* infinite auto-scrolling chip marquee */
  .chip-marquee{margin-top:18px;padding:8px 0 24px;width:100%;overflow:hidden;
    -webkit-mask-image:linear-gradient(90deg,transparent 0,#000 7%,#000 93%,transparent 100%);
    mask-image:linear-gradient(90deg,transparent 0,#000 7%,#000 93%,transparent 100%)}
  .chip-track{display:flex;width:max-content;animation:chipscroll 26s linear infinite;will-change:transform}
  .chip-marquee:hover .chip-track{animation-play-state:paused}
  .chip-group{display:flex;align-items:center;gap:12px;padding-right:12px;flex:none}
  @keyframes chipscroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  .chip{display:inline-flex;align-items:center;gap:8px;white-space:nowrap;font-weight:600;font-size:13.5px;color:var(--ink-2);
    background:rgba(255,255,255,.9);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);
    border:1px solid var(--line);border-radius:999px;padding:9px 18px 9px 12px;box-shadow:0 6px 18px rgba(11,46,32,.05)}
  .chip .ci{width:26px;height:26px;border-radius:8px;display:grid;place-items:center;flex:none}
  .chip .ci svg{width:15px;height:15px;color:#fff}

  .collab-actions{margin-top:12px;display:flex;flex-wrap:wrap;gap:14px}

  .stats{margin-top:30px;display:flex;flex-wrap:wrap;gap:9px}
  .stat{font-weight:600;font-size:12.5px;color:var(--coral-dark);background:var(--coral-soft);
    border:1px solid rgba(15,157,107,.16);border-radius:999px;padding:7px 15px}

  /* ---- right column: illustration ---- */
  .collab-vis{position:relative;display:grid;place-items:center;min-height:400px}
  .glass{position:relative;z-index:2;width:min(480px,100%);border-radius:24px;padding:14px;
    background:radial-gradient(circle at 50% 42%,var(--coral-soft) 0%,#ffffff 78%);
    border:1px solid rgba(15,157,107,.14);box-shadow:var(--sh-lg)}
  .glass svg{width:100%;height:auto;border-radius:14px}

  .badge{position:absolute;z-index:4;display:inline-flex;align-items:center;gap:8px;
    background:#fff;border-radius:999px;padding:9px 15px;box-shadow:var(--sh-lg);font-weight:700;font-size:12.5px;color:var(--ink)}
  .badge .dot{width:8px;height:8px;border-radius:50%;background:var(--coral);animation:pulse 1.8s infinite}
  .badge-ic{width:16px;height:16px;flex:none;color:var(--coral)}
  .badge.top{top:2%;left:-4%;animation:bob 5s ease-in-out infinite}
  .badge.bottom{bottom:6%;right:-5%;animation:bob 5.6s ease-in-out infinite;animation-delay:1.1s}

  /* floating decorative shapes */
  .shape{position:absolute;z-index:1;pointer-events:none;animation:bob 6s ease-in-out infinite}
  .s1{top:-2%;right:8%;width:20px;height:20px;border-radius:6px;background:var(--gold);transform:rotate(18deg);opacity:.9}
  .s2{bottom:-3%;left:4%;width:16px;height:16px;border-radius:50%;background:var(--violet);animation-delay:.8s}
  .s3{top:40%;right:-3%;width:12px;height:12px;border-radius:50%;background:var(--blue);animation-delay:1.5s}
  .s4{top:12%;left:-2%;width:52px;height:52px;color:var(--coral);opacity:.5;animation-delay:.5s}
  .s4 svg{width:100%;height:100%}

  @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes pulse{0%{box-shadow:0 0 0 0 rgba(15,157,107,.5)}70%{box-shadow:0 0 0 9px rgba(15,157,107,0)}100%{box-shadow:0 0 0 0 rgba(15,157,107,0)}}

  /* ===================== RESPONSIVE ===================== */
  @media(max-width:900px){
    .collab-grid{grid-template-columns:1fr;gap:44px}
    .collab-vis{order:-1;min-height:auto;max-width:480px;margin:0 auto;width:100%}
    .eyebrow{align-items:center}
    .collab-copy{text-align:center;display:flex;flex-direction:column;align-items:center}
    .collab-actions,.stats{justify-content:center}
    /* keep floating badges inside the frame on small screens */
    .badge.top{left:2%}
    .badge.bottom{right:2%}
    /* drop the edge-hugging decorations that would clip on narrow viewports */
    .s3,.s4{display:none}
  }
  @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.rv{opacity:1;transform:none}
    .chip-marquee{overflow:visible;-webkit-mask-image:none;mask-image:none}.chip-track{flex-wrap:wrap;width:100%}.chip-group{flex-wrap:wrap}.chip-group:nth-child(2){display:none}}`;

// ── Icons (paths copied 1:1 from the original static markup) ──────────────
const StarSVG = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "#FFB21D" : "#E3E8E4"}>
    <path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.3L12 17.1l-5.7 3.1 1.2-6.3L2.8 9.5l6.4-.8z" />
  </svg>
);
const ClockSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
const ArrowSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const HeartSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20.5s-8-4.9-8-11a4.6 4.6 0 0 1 8-3.1 4.6 4.6 0 0 1 8 3.1c0 6.1-8 11-8 11z" />
  </svg>
);

const CAT_ICON_PATHS = {
  book: <><path d="M4 19V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2z" /><path d="M4 19a2 2 0 0 0 2 2h14" /></>,
  flask: <><path d="M9.5 3h5M10 3v5.5L4.8 18a2 2 0 0 0 1.8 3h10.8a2 2 0 0 0 1.8-3L14 8.5V3" /><path d="M7.5 15h9" /></>,
  calc: <><rect x="5" y="3.5" width="14" height="17" rx="2.5" /><path d="M8.5 8h7M8.5 12.5h.01M12 12.5h.01M15.5 12.5h.01M8.5 16.5h.01M12 16.5h.01M15.5 16.5h.01" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m14.8 9.2-1.6 4.8-4.8 1.6 1.6-4.8z" /></>,
  pulse: <path d="M3 12h4l2.5-6 4 12 2.5-6h5" />,
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></>,
  bank: <><path d="M4 21V7l7-3 7 3v14" /><path d="M9 21v-5h4v5" /><path d="M8 10h.01M8 14h.01M13 10h.01M13 14h.01" /></>,
  shield: <path d="M12 3l7 3v5c0 5-3 9-7 10-4-1-7-5-7-10V6z" />,
  medal: <><circle cx="12" cy="10" r="5.5" /><path d="m9 14.5-2 6 5-2.7 5 2.7-2-6" /></>,
  institution: <><path d="M3 21h18" /><path d="M5 21V10M9 21V10M15 21V10M19 21V10" /><path d="M3 10l9-6 9 6" /></>,
};

function CatIcon({ icon }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {CAT_ICON_PATHS[icon] || CAT_ICON_PATHS.book}
    </svg>
  );
}

function StarRow({ stars, count }) {
  return (
    <div className="fc-rate">
      {[0, 1, 2, 3, 4].map((i) => <StarSVG key={i} filled={i < stars} />)}
      <span>({count})</span>
    </div>
  );
}

function CourseCard({ course: c, saved, onToggleSave, onAction }) {
  return (
    <article className="fc-card rv" data-cat={c.cats.join(" ")}>
      <div
        className="fc-thumb"
        style={{ background: `linear-gradient(135deg,${c.grad}),url('${c.img}') center/cover` }}
      >
        <span className="fc-thumb-ic"><CatIcon icon={c.icon} /></span>
        {c.ribbon && !c.soon && <span className="fc-ribbon">{c.ribbon}</span>}
        <button
          type="button"
          className={`fc-heart${saved ? " on" : ""}`}
          aria-label="Save course"
          aria-pressed={saved}
          onClick={onToggleSave}
        >
          <HeartSVG />
        </button>
        <span className="fc-lvl">{c.lvl}</span>
      </div>
      <div className="fc-body">
        <StarRow stars={c.stars} count={c.count} />
        <h3>{c.title}</h3>
        <div className="fc-fact"><ClockSVG />{c.fact}</div>
        <div className="fc-foot">
          {c.soon ? (
            <>
              <span className="fc-tutor">
                <span className="fc-av" style={{ background: c.avColor }}>{c.tutor?.[0]}</span>
                {c.tutor}
              </span>
              <span className="fc-price soon">Coming Soon</span>
            </>
          ) : c.explore ? (
            <button type="button" className="fc-explore" onClick={() => onAction(c)}>
              Explore Programs
            </button>
          ) : (
            <>
              {/* A linked course that costs nothing must read "Free", not
                  "₹0 /month" — the platform is free at launch
                  (GlobalSettings.live_launch_free_mode), so zero is the real
                  price rather than missing data. */}
              {c.free ? (
                <span className="fc-price">Free</span>
              ) : (
                <span className="fc-price">&#8377;{c.price}<small> /month</small></span>
              )}
              <button type="button" className="fc-enroll" onClick={() => onAction(c)}>
                Enroll now <ArrowSVG />
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

// Same static fallback as the original homepage — replaced by the CMS
// "featured_courses" content block the moment it's populated, matching the
// "replace-if-present" convention used by Cta/Resources/WhyChooseShiksha.
const DEFAULTS = {
  eyebrow: "Featured Courses",
  heading: "Explore our",
  heading_secondary: "popular courses",
  subhead:
    "Some of our most popular academic and competitive programs, built to help learners succeed with structured guidance.",
};

export default function FeaturedCourses() {
  const rootRef = useRef(null);
  const navigate = useNavigate();
  const { block } = useHomeContent("featured_courses");
  const [courses, setCourses] = useState(FEATURED_COURSES);
  const [activeTab, setActiveTab] = useState("all");
  const [saved, setSaved] = useState(() => new Set());

  const eyebrow = block?.eyebrow || DEFAULTS.eyebrow;
  const heading = block?.heading || DEFAULTS.heading;
  const headingSecondary = block?.heading_secondary || DEFAULTS.heading_secondary;
  const subhead = block?.subhead || DEFAULTS.subhead;

  // Paint immediately with the curated fallback (homeData.js), then swap in
  // real CMS showcase rows if the backend has any active ones — see
  // homeData.js's own header comment for why the fallback stays.
  useEffect(() => {
    let cancelled = false;
    getPublicFeatured().then((cards) => {
      if (cancelled || !cards.length) return;
      setCourses(cards.map(toFeaturedCard));
    });
    return () => { cancelled = true; };
  }, []);

  const visible =
    activeTab === "all"
      ? courses
      : courses.filter((c) => c.cats.includes(activeTab));

  const goToCourse = (c) => {
    if (c.courseId) navigate(`/courses/${c.courseId}`);
    else if (c.to) navigate(c.to, c.state ? { state: c.state } : undefined);
    else navigate("/courses");
  };

  const toggleSave = (title) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title); else next.add(title);
      return next;
    });
  };

  // Reveal-on-scroll, scoped to this section and re-attached whenever the
  // card list changes (real CMS rows swap in, or a tab filter re-renders).
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      },
      { threshold: 0.12 }
    );
    root.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [courses, activeTab]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="sec" id="courses" ref={rootRef}>
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow"><u>{eyebrow}</u></span>
            <h2>{heading}{headingSecondary ? <> <span className="em">{headingSecondary}</span></> : null}</h2>
            <p>{subhead}</p>
          </div>

          <div className="fc-tabs rv" role="tablist" aria-label="Filter courses">
            {COURSE_TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                className="fc-tab"
                role="tab"
                aria-selected={activeTab === t.id}
                data-filter={t.id}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="fc-grid" id="courseGrid">
            {visible.map((c) => (
              <CourseCard
                key={c.title}
                course={c}
                saved={saved.has(c.title)}
                onToggleSave={() => toggleSave(c.title)}
                onAction={goToCourse}
              />
            ))}
          </div>

          <div className="center rv">
            <Link className="btn btn-ghost" to="/courses">
              All courses <ArrowSVG />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
