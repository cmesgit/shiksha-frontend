// PLACEMENT: src/components/courses/CoursesStrip.jsx
//
// The design reference's (ShikshaCourses.jsx) feature strip under the hero,
// ported onto this app's real --sk-* tokens.
//
// The reference strip has five items; only three ship here, because the
// other two describe features this product does not have:
//   - "Certificates / On course completion" — there is no completion
//     certificate anywhere in the backend. The only `certificate` field is
//     accounts.models' `qualification_certificate`, a teacher's uploaded
//     credential file, which is unrelated.
//   - "AI Learning Support / Doubts solved 24/7" — the only AI code in the
//     app is explore/exploreComponent/AIAssistant.jsx, which makes no API
//     calls at all (its own fallback string calls it a "frontend-only
//     writing helper") and is a research-paper tool in the Explore
//     library, not course doubt-solving.
// Same rule the hero merge already applied to the reference's fabricated
// "40+ courses / 50,000+ learners" stats.
//
// The three that remain are all real: live classes (LiveKit sessions),
// chapter-by-chapter course structure (Subject -> Chapter), and quizzes.

const css = `
.cs-strip{border-top:1px solid var(--sk-line);border-bottom:1px solid var(--sk-line);background:var(--sk-paper);padding:24px 0}
.cs-row{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.cs-item{display:flex;align-items:center;gap:12px;justify-content:center;text-align:left}
.cs-ic{flex:none;width:42px;height:42px;border-radius:13px;display:grid;place-items:center;background:#fff;box-shadow:var(--sk-sh-sm);color:var(--sk-green)}
.cs-item b{display:block;font-family:var(--sk-font);font-size:14px;font-weight:700;line-height:1.25;color:var(--sk-ink)}
.cs-item span{font-size:11.5px;color:var(--sk-body)}
@media(max-width:760px){.cs-row{grid-template-columns:1fr;gap:14px}.cs-item{justify-content:flex-start}}
`;

const LiveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="14" height="14" rx="2" /><path d="m22 8-6 4 6 4V8z" />
  </svg>
);
const StructureIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2z" /><path d="M4 19a2 2 0 0 0 2 2h14" /><path d="M9 7h7" />
  </svg>
);
const TestIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /><path d="m9.5 12 1.6 1.6L14.5 10" />
  </svg>
);

const ITEMS = [
  { Icon: LiveIcon, title: 'Live Classes', sub: 'Taught in real time' },
  { Icon: StructureIcon, title: 'Structured Curriculum', sub: 'Chapter by chapter' },
  { Icon: TestIcon, title: 'Quizzes & Tests', sub: 'Practise as you go' },
];

export default function CoursesStrip() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="cs-strip">
        <div className="wrap">
          <div className="cs-row">
            {ITEMS.map((item) => (
              <div className="cs-item" key={item.title}>
                <span className="cs-ic"><item.Icon /></span>
                <span>
                  <b>{item.title}</b>
                  <span>{item.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
