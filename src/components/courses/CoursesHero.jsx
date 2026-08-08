// PLACEMENT: src/components/courses/CoursesHero.jsx
//
// Two-column hero for /courses — copy left, illustration right. Content
// (eyebrow/heading/subhead/both CTAs/the illustration itself) is pulled
// from the CMS via useHomeContent("courses_hero"), the exact same
// singleton-content-block pattern WhyChooseShiksha/TeachersStudents already
// use — an admin can rewrite the copy or swap the image from Admin-dashboard
// (Content -> Home Content -> "Courses Hero") without a code deploy.
// Falls back to static defaults (same "replace-if-present" convention as
// Faq.jsx's DEFAULT_FAQS) until a row exists.
//
// No fabricated stats ("40+ courses", "50,000+ learners" from the design
// reference) — none of those numbers exist anywhere in the real data.

import { useHomeContent } from '../../hooks/useHomeContent';

const css = `
.ch-hero{padding:clamp(36px,5vw,64px) 0 clamp(28px,4vw,40px)}
.ch-grid{display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:40px;align-items:center}
.ch-eyebrow{display:inline-flex;align-items:center;gap:7px;font-family:var(--sk-font);font-weight:700;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--sk-green);background:var(--sk-mint);border-radius:999px;padding:6px 14px;margin:0 0 16px}
.ch-hero h1{font-family:var(--sk-font);font-size:clamp(28px,4vw,38px);font-weight:800;color:var(--sk-ink);margin:0;line-height:1.22;letter-spacing:-.01em}
.ch-hero h1 em{font-style:normal;color:var(--sk-green)}
.ch-hero p{margin:16px 0 0;color:var(--sk-body);font-size:15px;line-height:1.65;max-width:520px}
.ch-cta-row{margin-top:26px;display:flex;flex-wrap:wrap;gap:12px}
.ch-cta{display:inline-flex;align-items:center;gap:8px;font-family:var(--sk-font);font-weight:700;font-size:14px;border-radius:999px;padding:13px 26px;cursor:pointer;transition:background .2s,transform .2s,color .2s;border:2px solid transparent}
.ch-cta--primary{background:var(--sk-green);color:#fff}
.ch-cta--primary:hover{background:var(--sk-green-dark);transform:translateY(-2px)}
.ch-cta--ghost{background:#fff;color:var(--sk-green);border-color:var(--sk-green)}
.ch-cta--ghost:hover{background:var(--sk-green);color:#fff}
.ch-art{position:relative;border-radius:26px;overflow:hidden;aspect-ratio:1/1;background:linear-gradient(135deg,var(--sk-green) 0%,var(--sk-green-dark) 100%);display:grid;place-items:center}
.ch-art img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.ch-art-icon{width:84px;height:84px;border-radius:24px;background:rgba(255,255,255,.16);display:grid;place-items:center;position:relative;z-index:1}
@media(max-width:900px){.ch-grid{grid-template-columns:1fr}.ch-art{max-width:320px;margin:0 auto}}
`;

const BookIcon = () => (
  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2z" /><path d="M4 19a2 2 0 0 0 2 2h14" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export default function CoursesHero({ onBrowse, onBrowseCategories }) {
  const { block } = useHomeContent('courses_hero');

  const eyebrow = block?.eyebrow || 'Find your course';
  const heading = block?.heading || 'Discover the right course';
  const headingSecondary = block?.heading_secondary || 'for your learning journey';
  const subhead = block?.subhead ||
    "Live classes, tests and notes mapped to your board's syllabus — pick a board and class below to get started.";
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
            <div>
              <span className="ch-eyebrow">{eyebrow}</span>
              <h1>{heading} <em>{headingSecondary}</em></h1>
              <p>{subhead}</p>
              <div className="ch-cta-row">
                <button type="button" className="ch-cta ch-cta--primary" onClick={onBrowse}>
                  {ctaPrimaryLabel} <ArrowIcon />
                </button>
                <button type="button" className="ch-cta ch-cta--ghost" onClick={onBrowseCategories}>
                  {ctaSecondaryLabel}
                </button>
              </div>
            </div>
            <div className="ch-art">
              {image ? (
                <img src={image} alt="" />
              ) : (
                <span className="ch-art-icon"><BookIcon /></span>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
