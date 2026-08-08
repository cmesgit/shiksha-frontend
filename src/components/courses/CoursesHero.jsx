// PLACEMENT: src/components/courses/CoursesHero.jsx
//
// Small, honest hero for the top of /courses — no fabricated stats (no
// "10,000+ learners" style numbers that don't exist anywhere in the real
// data). A scroll-to-catalog CTA is the only interactive element; board/
// class browsing itself stays entirely inside UnifiedCatalog below it.

const css = `
.ch-hero{padding:clamp(40px,6vw,72px) 0 clamp(28px,4vw,40px);text-align:center}
.ch-hero .wrap{max-width:720px;margin:0 auto;padding:0 24px}
.ch-eyebrow{display:inline-flex;font-family:var(--sk-font);font-weight:700;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--sk-green);margin:0 0 14px}
.ch-hero h1{font-family:var(--sk-font);font-size:clamp(28px,4.2vw,40px);font-weight:800;color:var(--sk-ink);margin:0;line-height:1.2;letter-spacing:-.01em}
.ch-hero h1 em{font-style:normal;color:var(--sk-green)}
.ch-hero p{margin:14px 0 0;color:var(--sk-body);font-size:15px;line-height:1.6}
.ch-cta{margin-top:26px;display:inline-flex;align-items:center;gap:8px;font-family:var(--sk-font);font-weight:700;font-size:14px;background:var(--sk-green);color:#fff;border:none;border-radius:999px;padding:13px 26px;cursor:pointer;transition:background .2s,transform .2s}
.ch-cta:hover{background:var(--sk-green-dark);transform:translateY(-2px)}
`;

export default function CoursesHero({ onBrowse }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="ch-hero">
        <div className="wrap">
          <span className="ch-eyebrow">Find your course</span>
          <h1>Discover the right course for your <em>learning journey</em></h1>
          <p>Live classes, tests and notes mapped to your board&rsquo;s syllabus — pick a board and class below to get started.</p>
          <button type="button" className="ch-cta" onClick={onBrowse}>Browse courses</button>
        </div>
      </section>
    </>
  );
}
