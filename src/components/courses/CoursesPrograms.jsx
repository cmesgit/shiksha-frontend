// PLACEMENT: src/components/courses/CoursesPrograms.jsx
//
// "Choose your learning path" — three cards (School Education / Skill &
// Career / Competitive Exams), replacing the earlier two board-group tiles
// with the richer design reference's layout. Each card's destination is
// checked against what's actually real:
//   - School Education -> scrolls to the catalog below (real, live), its
//     stat line uses the same real board live/coming-soon counts the old
//     tiles showed (has_published_courses on the actual `boards` array).
//   - Skill & Career -> /skill/browse, a real, already-shipped route
//     (confirmed live in Navbar.jsx).
//   - Competitive Exams -> disabled "Coming Soon", matching reality:
//     competitive-track courses have board=null and Courses.jsx's whole
//     board-selection flow has no path to browse a board-less course yet
//     (confirmed against the live catalog data). A card that pretended
//     this worked would go nowhere.
// The subject pills (Mathematics/Science/... ) are generic category
// labels, not per-course statistics — same "honest categorization, not a
// fabricated number" distinction as the board-group tiles' live counts.

const css = `
.cp-sec{padding:0 0 clamp(30px,4vw,46px)}
.cp-sechead{max-width:620px;margin:0 auto clamp(28px,4vw,38px);text-align:center}
.cp-eyebrow{display:inline-flex;font-family:var(--sk-font);font-weight:700;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--sk-green);margin:0 0 12px}
.cp-sechead h2{font-family:var(--sk-font);font-size:clamp(22px,3vw,30px);font-weight:800;color:var(--sk-ink);margin:0}
.cp-sechead h2 em{font-style:normal;color:var(--sk-green)}
.cp-sechead p{margin:12px 0 0;color:var(--sk-body);font-size:14px;line-height:1.6}
.cp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.cp-card{background:#fff;border-radius:22px;overflow:hidden;box-shadow:var(--sk-sh-sm);transition:transform .25s,box-shadow .25s;display:flex;flex-direction:column;position:relative}
.cp-card:hover{transform:translateY(-6px);box-shadow:var(--sk-sh-lg)}
.cp-card.is-soon{opacity:.85}
.cp-head{padding:22px 20px 18px;color:#fff;position:relative;overflow:hidden}
.cp-head::before{content:"";position:absolute;top:-40px;right:-30px;width:140px;height:140px;border-radius:50%;background:rgba(255,255,255,.09);pointer-events:none}
.cp-head-row{display:flex;align-items:center;gap:12px;position:relative;z-index:1}
.cp-ic{width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,.22);display:grid;place-items:center;flex:none}
.cp-ic svg{width:20px;height:20px;color:#fff}
.cp-head b{display:block;font-size:16.5px;font-weight:800}
.cp-head i{font-style:normal;display:block;margin-top:2px;font-size:11.5px;color:rgba(255,255,255,.9)}
.cp-g1{background:linear-gradient(135deg,#12b47a 0%,#0B5B3E 100%)}
.cp-g2{background:linear-gradient(135deg,#7C5CFC 0%,#12b3a6 100%)}
.cp-g3{background:linear-gradient(135deg,#F59E0B 0%,#E14D2A 100%)}
.cp-body{padding:16px 20px 20px;display:flex;flex-direction:column;gap:12px;flex:1}
.cp-pills{display:flex;flex-wrap:wrap;gap:6px}
.cp-pill{background:var(--sk-paper);color:var(--sk-ink-2);font-family:var(--sk-font);font-size:11px;font-weight:600;padding:5px 10px;border-radius:999px;line-height:1}
.cp-stat{display:flex;align-items:center;gap:7px;font-size:12px;color:var(--sk-body);font-weight:500}
.cp-stat svg{width:13px;height:13px;color:var(--sk-green);flex:none}
.cp-cta{margin-top:auto;background:var(--sk-ink);color:#fff;padding:12px 16px;border-radius:12px;font-family:var(--sk-font);font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;gap:7px;transition:background .25s,transform .2s;cursor:pointer;border:none;width:100%}
.cp-cta svg{width:13px;height:13px;transition:transform .2s}
.cp-cta:hover{background:var(--sk-green);transform:translateY(-2px)}
.cp-cta:hover svg{transform:translateX(3px)}
.cp-cta:disabled{background:var(--sk-paper);color:var(--sk-body);cursor:default}
.cp-cta:disabled:hover{background:var(--sk-paper);transform:none}
.cp-cta:disabled svg{display:none}
@media(max-width:900px){.cp-grid{grid-template-columns:1fr 1fr}}
@media(max-width:640px){.cp-grid{grid-template-columns:1fr}}
`;

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
);
const SchoolIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
);
const SkillIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 13h18" /></svg>
);
const TargetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /></svg>
);

function countLive(boards, type) {
  return boards ? boards.filter((b) => b.board_type === type && b.has_published_courses).length : 0;
}
function countTotal(boards, type) {
  return boards ? boards.filter((b) => b.board_type === type).length : 0;
}

export default function CoursesPrograms({ boards, onBrowse, onSkillBrowse }) {
  const liveTotal = countLive(boards, 'CENTRAL') + countLive(boards, 'STATE');
  const boardsTotal = countTotal(boards, 'CENTRAL') + countTotal(boards, 'STATE');

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="cp-sec">
        <div className="wrap">
          <div className="cp-sechead">
            <span className="cp-eyebrow">Start here</span>
            <h2>Choose your <em>learning path</em></h2>
            <p>Three routes, one platform — pick the track that matches where you are right now.</p>
          </div>
          <div className="cp-grid">
            <div className="cp-card">
              <div className="cp-head cp-g1">
                <div className="cp-head-row">
                  <span className="cp-ic"><SchoolIcon /></span>
                  <div>
                    <b>School Education</b>
                    <i>Classes 8–12 · CBSE &amp; MBSE</i>
                  </div>
                </div>
              </div>
              <div className="cp-body">
                <div className="cp-pills">
                  <span className="cp-pill">Mathematics</span>
                  <span className="cp-pill">Science</span>
                  <span className="cp-pill">English</span>
                  <span className="cp-pill">Social Studies</span>
                </div>
                <div className="cp-stat">
                  <CheckIcon />
                  {liveTotal > 0
                    ? `${liveTotal} board${liveTotal === 1 ? '' : 's'} live${boardsTotal > liveTotal ? `, ${boardsTotal - liveTotal} more coming soon` : ''}`
                    : `${boardsTotal} boards coming soon`}
                </div>
                <button type="button" className="cp-cta" onClick={onBrowse}>Explore School Courses <ArrowIcon /></button>
              </div>
            </div>

            <div className="cp-card">
              <div className="cp-head cp-g2">
                <div className="cp-head-row">
                  <span className="cp-ic"><SkillIcon /></span>
                  <div>
                    <b>Skill &amp; Career</b>
                    <i>Experts, coding, career guidance</i>
                  </div>
                </div>
              </div>
              <div className="cp-body">
                <div className="cp-pills">
                  <span className="cp-pill">Skill Experts</span>
                  <span className="cp-pill">Coding</span>
                  <span className="cp-pill">Counselling</span>
                </div>
                <div className="cp-stat">
                  <CheckIcon />
                  Beyond academics — build real skills
                </div>
                <button type="button" className="cp-cta" onClick={onSkillBrowse}>View Programs <ArrowIcon /></button>
              </div>
            </div>

            <div className="cp-card is-soon">
              <div className="cp-head cp-g3">
                <div className="cp-head-row">
                  <span className="cp-ic"><TargetIcon /></span>
                  <div>
                    <b>Competitive Exams</b>
                    <i>JEE · NEET · UPSC · Banking</i>
                  </div>
                </div>
              </div>
              <div className="cp-body">
                <div className="cp-pills">
                  <span className="cp-pill">IIT-JEE</span>
                  <span className="cp-pill">NEET</span>
                  <span className="cp-pill">UPSC</span>
                  <span className="cp-pill">SSC</span>
                </div>
                <div className="cp-stat">
                  <CheckIcon />
                  Expert mentors and proven strategies
                </div>
                <button type="button" className="cp-cta" disabled>Coming Soon</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
