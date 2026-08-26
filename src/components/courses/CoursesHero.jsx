// PLACEMENT: src/components/courses/CoursesHero.jsx
//
// The two-column hero from ShikshaCourses.html/.jsx (`.chero`), rebuilt as a
// real component. Copy, CTAs and the illustration still come from the CMS via
// useHomeContent("courses_hero") — same singleton-content-block pattern
// WhyChooseShiksha/TeachersStudents use — so an admin can rewrite the text or
// swap the image from Admin-dashboard without a deploy. Static defaults are the
// fallback ("replace-if-present", like Faq.jsx's DEFAULT_FAQS).
//
// TWO DELIBERATE CHANGES FROM THE HTML MOCK:
//
// 1. The facts row ("40+ courses / 120+ educators / 50,000+ learners") is EMPTY
//    by default. Those numbers came from the design reference and don't exist
//    anywhere in the real data. Fill FACTS below only with numbers you can
//    actually stand behind — the row hides itself when the array is empty, so
//    the layout is fine either way.
//
// 2. The floating chip subtitles were reworded. The mock said "Starts 6:00 PM",
//    which is an invented schedule. The features themselves are real, so the
//    chips stay; only the fake specifics went.
//
// Class names are prefixed `ch-` and animations `chBob`/`chRise` so nothing
// collides if ShikshaCourses.jsx is still mounted elsewhere in the app.

import { useHomeContent } from '../../hooks/useHomeContent';
import CoursesHeroArt from './CoursesHeroArt';

// Add entries only when the number is real. Empty array = row not rendered.
// e.g. [{ value: '12', label: 'Structured courses' }]
const FACTS = [];

const css = `
.ch-hero{position:relative;overflow:hidden;
  padding:clamp(44px,6vw,84px) 0 clamp(30px,4vw,54px);
  background:
    radial-gradient(900px 520px at 84% -10%, var(--sk-mint,#E7F6EE) 0%, rgba(231,246,238,0) 62%),
    linear-gradient(180deg,#F8FCFA 0%,#fff 60%)}
.ch-grid{display:grid;grid-template-columns:1.05fr 1fr;gap:clamp(28px,4vw,60px);align-items:center}

.ch-badge{display:inline-flex;align-items:center;gap:9px;
  font-family:var(--sk-font,'Poppins',system-ui,sans-serif);font-size:13px;font-weight:700;
  color:var(--sk-green-dark,#0B5B3E);background:var(--sk-mint,#E7F6EE);
  border:1px solid rgba(15,157,107,.2);border-radius:999px;padding:8px 17px 8px 13px}
.ch-badge i{flex:none;width:7px;height:7px;border-radius:50%;background:var(--sk-green,#0F9D6B);
  box-shadow:0 0 0 4px rgba(15,157,107,.18)}

.ch-hero h1{margin:20px 0 0;font-family:var(--sk-font,'Poppins',system-ui,sans-serif);
  font-size:clamp(32px,4.6vw,52px);font-weight:800;line-height:1.12;letter-spacing:-.022em;
  color:var(--sk-ink,#0B2E20)}
.ch-hero h1 em{font-style:normal;color:var(--sk-green,#0F9D6B)}
.ch-sub{margin:20px 0 0;max-width:34em;color:var(--sk-body,#5E7469);
  font-size:clamp(15px,1.1vw,16.5px);line-height:1.65}

.ch-cta-row{display:flex;flex-wrap:wrap;gap:13px;margin-top:32px}
.ch-cta{display:inline-flex;align-items:center;gap:9px;
  font-family:var(--sk-font,'Poppins',system-ui,sans-serif);font-weight:700;font-size:14.5px;
  padding:13px 26px;border-radius:999px;border:2px solid transparent;cursor:pointer;
  transition:transform .2s,background .2s,color .2s,border-color .2s}
.ch-cta svg{width:16px;height:16px;transition:transform .2s}
.ch-cta:hover svg{transform:translateX(3px)}
.ch-cta--primary{background:var(--sk-green,#0F9D6B);color:#fff}
.ch-cta--primary:hover{background:var(--sk-green-dark,#0B5B3E);transform:translateY(-2px)}
.ch-cta--ghost{background:#fff;color:var(--sk-green,#0F9D6B);border-color:var(--sk-green,#0F9D6B)}
.ch-cta--ghost:hover{background:var(--sk-green,#0F9D6B);color:#fff;transform:translateY(-2px)}
.ch-cta:focus-visible{outline:3px solid var(--sk-green,#0F9D6B);outline-offset:3px}

.ch-facts{display:flex;flex-wrap:wrap;gap:26px;margin-top:36px}
.ch-fact b{display:block;font-family:var(--sk-font,'Poppins',system-ui,sans-serif);
  font-size:23px;font-weight:800;line-height:1.1;color:var(--sk-ink,#0B2E20)}
.ch-fact span{font-size:12.5px;color:var(--sk-body,#5E7469)}

.ch-vis{position:relative;display:grid;place-items:center;min-width:0}
.ch-disc{position:relative;width:min(430px,100%);aspect-ratio:1;border-radius:50%;
  display:grid;place-items:center;
  background:radial-gradient(circle at 50% 44%, var(--sk-mint,#E7F6EE), #F6FAF7 72%)}
.ch-disc::before{content:"";position:absolute;inset:5%;border-radius:50%;
  border:2px dashed rgba(15,157,107,.28)}
.ch-art{position:relative;z-index:2;width:88%}
.ch-art svg,.ch-art img{width:100%;height:auto;display:block}
.ch-art img{border-radius:50%;aspect-ratio:1;object-fit:cover}

.ch-chip{position:absolute;z-index:4;display:flex;align-items:center;gap:10px;background:#fff;
  border-radius:14px;padding:10px 14px;box-shadow:0 30px 70px rgba(11,46,32,.14);
  animation:chBob 5.4s ease-in-out infinite}
.ch-chip b{display:block;font-family:var(--sk-font,'Poppins',system-ui,sans-serif);
  font-weight:600;font-size:12.5px;line-height:1.2;color:var(--sk-ink,#0B2E20)}
.ch-chip span{color:var(--sk-body,#5E7469);font-size:11px}
.ch-chip .ch-chip-ic{flex:none;width:32px;height:32px;border-radius:10px;display:grid;
  place-items:center;color:#fff}
.ch-chip .ch-chip-ic svg{width:16px;height:16px}
.ch-chip--a{top:6%;left:-6%}
.ch-chip--b{bottom:12%;right:-7%;animation-delay:1.4s}
.ch-chip--c{bottom:34%;left:-9%;animation-delay:.7s}

@keyframes chBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes chRise{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
.ch-copy,.ch-vis{animation:chRise .7s cubic-bezier(.2,.7,.2,1) both}
.ch-vis{animation-delay:.1s}

@media(max-width:980px){
  .ch-grid{grid-template-columns:1fr;text-align:center}
  .ch-vis{order:-1;margin-bottom:6px}
  .ch-sub{margin-left:auto;margin-right:auto}
  .ch-cta-row,.ch-facts{justify-content:center}
  .ch-disc{width:min(390px,86%)}
  /* Pull the floating chips back inside the viewport.
     They hang on negative offsets (left:-6%, right:-7%, left:-9%) which read
     as a deliberate overlap only while .ch-vis is a narrow grid column. Once
     the grid collapses to one full-width column here, those negatives put the
     chips past the page edge — and because body{overflow-x:hidden} is global
     on this site they are CLIPPED rather than scrolled to, so the right-hand
     chip rendered visibly sliced in half at tablet widths. Measured at 820px:
     .ch-chip--b ended at x=834 against an 805px viewport. */
  .ch-chip--a{left:0}
  .ch-chip--b{right:0}
  .ch-chip--c{left:0}
}
@media(max-width:620px){
  .ch-chip{transform:scale(.86)}
  .ch-chip--c{display:none}
}
@media(prefers-reduced-motion:reduce){
  .ch-chip,.ch-copy,.ch-vis{animation:none}
  .ch-cta{transition:none}
}
`;

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

const CHIPS = [
  {
    cls: 'ch-chip--a', bg: '#0F9D6B', title: 'Live classes', note: 'Taught in real time',
    icon: <><rect x="2" y="6" width="14" height="12" rx="3" /><path d="m16 11 6-3.5v9L16 13z" /></>,
  },
  {
    cls: 'ch-chip--b', bg: '#3b82f6', title: 'Practice tests', note: 'Chapter-wise',
    icon: <><path d="M15 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M15 3v5h5" /><path d="M9 13h6M9 17h4" /></>,
  },
  {
    cls: 'ch-chip--c', bg: '#FFB21D', title: 'Certificate', note: 'On completion',
    icon: <><path d="M7 4h10v5a5 5 0 0 1-10 0z" /><path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3" /><path d="M12 14v3M8.5 20h7" /></>,
  },
];

export default function CoursesHero({ onBrowse, onBrowseCategories }) {
  const { block } = useHomeContent('courses_hero');

  const eyebrow = block?.eyebrow || 'Courses';
  const heading = block?.heading || 'Discover the Right Course for Your';
  const headingSecondary = block?.heading_secondary || 'Learning Journey.';
  const subhead = block?.subhead ||
    'Explore expertly designed courses with structured lessons, live classes, quizzes, assignments and progress tracking — all in one place.';
  const ctaPrimaryLabel = block?.cta_primary_label || 'Explore Courses';
  const ctaSecondaryLabel = block?.cta_secondary_label || 'Browse Categories';
  // Serializer field is named `img` (content/serializers.py), not `image`.
  const image = block?.img || '';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="ch-hero">
        <div className="wrap">
          <div className="ch-grid">
            <div className="ch-copy">
              <span className="ch-badge"><i aria-hidden="true" />{eyebrow}</span>
              <h1>{heading} <em>{headingSecondary}</em></h1>
              <p className="ch-sub">{subhead}</p>

              <div className="ch-cta-row">
                <button type="button" className="ch-cta ch-cta--primary" onClick={onBrowse}>
                  {ctaPrimaryLabel} <ArrowIcon />
                </button>
                <button type="button" className="ch-cta ch-cta--ghost" onClick={onBrowseCategories}>
                  {ctaSecondaryLabel}
                </button>
              </div>

              {FACTS.length > 0 && (
                <div className="ch-facts">
                  {FACTS.map((f) => (
                    <div className="ch-fact" key={f.label}>
                      <b>{f.value}</b><span>{f.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="ch-vis">
              <div className="ch-disc">
                <div className="ch-art">
                  {image ? <img src={image} alt="" /> : <CoursesHeroArt />}
                </div>
              </div>

              {CHIPS.map((c) => (
                <div className={`ch-chip ${c.cls}`} key={c.title}>
                  <span className="ch-chip-ic" style={{ background: c.bg }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {c.icon}
                    </svg>
                  </span>
                  <span><b>{c.title}</b><span>{c.note}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
