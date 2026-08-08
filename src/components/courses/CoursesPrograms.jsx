// PLACEMENT: src/components/courses/CoursesPrograms.jsx
//
// "Browse by board group" tiles, real data only. Two tiles (Central/State),
// not the mockup's broader "Our Learning Programs" (which also proposed a
// Competitive Exams card) — competitive-track courses have `board: null`
// in the real catalog and Courses.jsx's whole board-selection flow has no
// path to browse a board-less course today, so a card linking to one would
// go nowhere real. Live/coming-soon counts are computed from the same real
// `boards` array Courses.jsx already loads (has_published_courses), not
// invented.

const css = `
.cp-sec{padding:0 0 clamp(30px,4vw,46px)}
.cp-sec .wrap{max-width:900px;margin:0 auto;padding:0 24px}
.cp-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.cp-card{background:#fff;border-radius:22px;overflow:hidden;box-shadow:var(--sk-sh-sm);transition:transform .25s,box-shadow .25s;cursor:pointer;border:none;text-align:left;font-family:var(--sk-font);padding:0}
.cp-card:hover{transform:translateY(-6px);box-shadow:var(--sk-sh-lg)}
.cp-head{padding:24px 22px 20px;color:#fff;position:relative;overflow:hidden}
.cp-head::before{content:"";position:absolute;top:-40px;right:-30px;width:140px;height:140px;border-radius:50%;background:rgba(255,255,255,.09)}
.cp-head b{display:block;font-size:18px;font-weight:800;position:relative;z-index:1}
.cp-head span{display:block;margin-top:4px;font-size:12.5px;color:rgba(255,255,255,.9);position:relative;z-index:1}
.cp-g1{background:linear-gradient(135deg,#12b47a 0%,#0B5B3E 100%)}
.cp-g2{background:linear-gradient(135deg,#7C5CFC 0%,#12b3a6 100%)}
.cp-body{padding:16px 22px 20px;color:var(--sk-body);font-size:13px}
@media(max-width:640px){.cp-grid{grid-template-columns:1fr}}
`;

function countLive(boards, type) {
  return boards ? boards.filter((b) => b.board_type === type && b.has_published_courses).length : 0;
}
function countTotal(boards, type) {
  return boards ? boards.filter((b) => b.board_type === type).length : 0;
}

export default function CoursesPrograms({ boards, onSelectGroup }) {
  const centralLive = countLive(boards, 'CENTRAL');
  const centralTotal = countTotal(boards, 'CENTRAL');
  const stateLive = countLive(boards, 'STATE');
  const stateTotal = countTotal(boards, 'STATE');

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="cp-sec">
        <div className="wrap">
          <div className="cp-grid">
            <button type="button" className="cp-card" onClick={() => onSelectGroup('central')}>
              <div className="cp-head cp-g1">
                <b>Central Boards</b>
                <span>CBSE and other national boards</span>
              </div>
              <div className="cp-body">
                {centralLive > 0
                  ? `${centralLive} live${centralTotal > centralLive ? `, ${centralTotal - centralLive} more coming soon` : ''}`
                  : `${centralTotal} coming soon`}
              </div>
            </button>
            <button type="button" className="cp-card" onClick={() => onSelectGroup('state')}>
              <div className="cp-head cp-g2">
                <b>State Boards</b>
                <span>Regional boards across India</span>
              </div>
              <div className="cp-body">
                {stateLive > 0
                  ? `${stateLive} live${stateTotal > stateLive ? `, ${stateTotal - stateLive} more coming soon` : ''}`
                  : `${stateTotal} coming soon`}
              </div>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
