// PLACEMENT: src/components/courses/CoursesPromo.jsx
//
// Two bands from the design reference (ShikshaCourses.jsx): the dark
// "Not Sure Where to Start?" promo and the closing "Ready to Begin"
// CTA. Both ported onto this app's real --sk-* tokens, and both with
// their destinations checked against routes that actually exist.
//
// Copy changed where the reference described things this app can't do:
//   - The reference's promo promises "Answer a few questions and we'll
//     recommend the perfect learning path" behind a "Find My Course"
//     button. There is no recommender quiz in this app, so that button
//     would go nowhere. The copy now points at what is real — a
//     counsellor (the shipped /counselling route) and the catalog.
//   - The reference's closing band opens "Thousands of learners are
//     already studying with ShikshaCom." That is the same unverifiable
//     learner-count claim the hero merge already dropped, so it is not
//     repeated here.
// The reference's decorative SVG art panels are left out for the same
// reason the hero's were: they are large inline illustrations with no
// CMS slot behind them.

import { Link } from 'react-router-dom';

const css = `
.cpr-sec{padding:0 0 clamp(30px,4vw,48px)}
.cpr-promo{position:relative;overflow:hidden;border-radius:26px;background:var(--sk-green-dark);padding:clamp(28px,4vw,44px)}
.cpr-promo::before{content:"";position:absolute;top:-70px;right:-50px;width:240px;height:240px;border-radius:50%;background:rgba(255,255,255,.07);pointer-events:none}
.cpr-eyebrow{display:inline-flex;font-family:var(--sk-font);font-weight:700;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#8FE3C0;margin:0 0 12px}
.cpr-promo h2{position:relative;z-index:1;color:#fff;font-family:var(--sk-font);font-size:clamp(22px,3vw,32px);font-weight:800;margin:0;letter-spacing:-.015em}
.cpr-promo p{position:relative;z-index:1;margin:14px 0 0;color:rgba(255,255,255,.82);font-size:15px;line-height:1.65;max-width:44em}
.cpr-cta{position:relative;z-index:1;display:flex;flex-wrap:wrap;gap:12px;margin-top:26px}
.cpr-btn{display:inline-flex;align-items:center;gap:8px;font-family:var(--sk-font);font-weight:700;font-size:14px;border-radius:999px;padding:13px 26px;cursor:pointer;border:2px solid transparent;transition:background .2s,color .2s,transform .2s;text-decoration:none}
.cpr-btn--white{background:#fff;color:var(--sk-green-dark)}
.cpr-btn--white:hover{transform:translateY(-2px)}
.cpr-btn--line{background:transparent;color:#fff;border-color:rgba(255,255,255,.5)}
.cpr-btn--line:hover{background:#fff;color:var(--sk-green-dark);border-color:#fff;transform:translateY(-2px)}

.cpr-final{padding:clamp(34px,4.5vw,56px) 0 clamp(40px,5vw,64px);text-align:center}
.cpr-final h2{font-family:var(--sk-font);font-size:clamp(24px,3.6vw,38px);font-weight:800;color:var(--sk-ink);margin:0;letter-spacing:-.02em}
.cpr-final h2 em{font-style:normal;color:var(--sk-green)}
.cpr-final p{margin:16px auto 0;color:var(--sk-body);font-size:15px;line-height:1.65;max-width:40em}
.cpr-final .cpr-cta{justify-content:center;margin-top:28px}
.cpr-btn--primary{background:var(--sk-green);color:#fff}
.cpr-btn--primary:hover{background:var(--sk-green-dark);transform:translateY(-2px)}
.cpr-btn--ghost{background:#fff;color:var(--sk-green);border-color:var(--sk-green)}
.cpr-btn--ghost:hover{background:var(--sk-green);color:#fff}
`;

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

// Sits directly under the catalog — a learner who has just scrolled the
// grid without picking anything is exactly who this band is for.
export default function CoursesPromo({ onBrowse }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="cpr-sec">
        <div className="wrap">
          <div className="cpr-promo">
            <span className="cpr-eyebrow">Not sure yet?</span>
            <h2>Not sure where to start?</h2>
            <p>
              Talk to a counsellor about which class, board and pace fit you — or browse the
              full catalog and take a free guest preview before you commit.
            </p>
            <div className="cpr-cta">
              <Link className="cpr-btn cpr-btn--white" to="/counselling">
                Talk to an Expert <ArrowIcon />
              </Link>
              <button type="button" className="cpr-btn cpr-btn--line" onClick={onBrowse}>
                Browse Courses
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Closing band — rendered last on the page, after the FAQ, so it reads as
// the send-off it is in the reference rather than interrupting the
// Why/Teachers/FAQ run.
export function CoursesFinalCta({ onBrowse }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="cpr-final">
        <div className="wrap">
          <span className="cpr-eyebrow" style={{ color: 'var(--sk-green)' }}>Get started</span>
          <h2>Ready to begin your <em>learning journey</em>?</h2>
          <p>
            Pick a course, take the free guest preview, and see how a term feels before you commit.
          </p>
          <div className="cpr-cta">
            <button type="button" className="cpr-btn cpr-btn--primary" onClick={onBrowse}>
              Browse Courses <ArrowIcon />
            </button>
            <Link className="cpr-btn cpr-btn--ghost" to="/contact">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
