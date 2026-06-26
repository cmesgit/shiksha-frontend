/**
 * PLACEMENT: src/pages/FacultyIntro.jsx  (NEW)
 *
 * "Become a Faculty Teacher" intro / landing page.
 *
 * A signed-in Guest expert who taps the locked Academy tab in their teacher
 * dashboard is sent here (see teacher app TrackSwitcher). It explains the
 * Faculty track, contrasts it with the Expert (Skill Dev) track, and routes
 * into the add-a-track signup flow (?add_track=academy) — which adds a Faculty
 * application to the existing account while their expert listing stays live.
 *
 * Self-contained: own nav/hero/styles. All classes are `fi-` prefixed so the
 * generic names (nav, card, hero, step…) can't collide with global CSS, and
 * it renders WITHOUT the marketing <Page> chrome (it has its own nav).
 */
import { useNavigate } from "react-router-dom";
import { TEACHER_SKILL_URL } from "../config/urls";

const Cap = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);
const Star = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CMP = [
  { key: "Students",   expert: "Anyone, any age",          faculty: "Class 8–12 students" },
  { key: "Curriculum", expert: "Your own course / 1-on-1", faculty: "Board-aligned syllabus" },
  { key: "Schedule",   expert: "You set your own slots",   faculty: "Academy assigns timetable" },
  { key: "Payment",    expert: "Per session / course",     faculty: "Monthly faculty salary" },
  { key: "Screening",  expert: "Open — list immediately",  faculty: "Admin review · 3–5 days" },
];

const FEATURES = [
  { title: "Curriculum-based teaching", body: "Teach assigned subjects following the school board syllabus — CBSE, ICSE, or State boards.",
    icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></> },
  { title: "Scheduled live classes", body: "Run live online sessions on a fixed timetable. The academy handles scheduling and student management.",
    icon: <><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></> },
  { title: "Stable monthly earnings", body: "Earn a reliable monthly income. No need to find students — the academy brings them to you.",
    icon: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></> },
  { title: "Verified faculty badge", body: "Get a verified Faculty badge on your profile, building trust with students and parents.",
    icon: <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></> },
];

const STEPS = [
  { n: 1, h: "Apply for the Faculty track", p: "Confirm your account password to add a Faculty application. This sits alongside your Expert account — your expert listing stays live." },
  { n: 2, h: "Admin review", p: <>The academy team reviews your application and verifies your qualifications within <strong>3–5 working days</strong>. You'll be notified by email.</> },
  { n: 3, h: "Get approved & start teaching", p: "Once approved, you're assigned classes, your faculty dashboard is activated, and you can start teaching right away." },
];

const FAQS = [
  { q: "Can I be both an Expert teacher and a Faculty teacher?", a: "Yes — the same account can hold both a Skill Dev expert profile and a Faculty role. You switch between them using the Academy / Skill Dev toggle in your dashboard." },
  { q: "What subjects can I teach?", a: "Mathematics, Science, English, Social Studies, and other CBSE/ICSE core subjects for Classes 8–12. The academy will match you to your area of expertise." },
  { q: "How is monthly pay calculated?", a: "Pay is based on the number of classes conducted in a month, agreed upon during onboarding. The academy handles all collections from students." },
  { q: "What happens if my application is rejected?", a: "You'll be notified by email. You can re-apply after 30 days with updated credentials. Your Expert (Skill Dev) account is never affected." },
];

export default function FacultyIntro() {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = TEACHER_SKILL_URL;
  };
  const apply = () => navigate("/signup?role=teacher&add_track=academy");

  return (
    <div className="fi-root">
      <style>{FI_CSS}</style>

      <nav className="fi-nav">
        <span className="fi-brand">ShikshaCom</span>
        <button type="button" className="fi-back" onClick={goBack}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Back to dashboard
        </button>
      </nav>

      <header className="fi-hero">
        <div className="fi-hero-badge"><Cap size={14} /> ShikshaCom Academy</div>
        <h1>Become a Faculty Teacher</h1>
        <p>Join the academy's roster of qualified educators and teach curriculum-aligned subjects to school students across Classes 8–12.</p>
      </header>

      <main className="fi-main">
        {/* What is Faculty */}
        <section className="fi-card">
          <div className="fi-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            What is a Faculty Teacher?
          </div>
          <div className="fi-feat-grid">
            {FEATURES.map((f) => (
              <div className="fi-feat" key={f.title}>
                <div className="fi-feat-ic">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                </div>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Expert vs Faculty */}
        <section className="fi-card">
          <div className="fi-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
            Expert (Skill Dev) vs Faculty (Academy)
          </div>
          <div className="fi-cmp">
            <div className="fi-cmp-head">
              <span />
              <span className="fi-expert-col"><Star size={11} /> Skill Dev (Expert)</span>
              <span className="fi-faculty-col"><Cap size={11} /> Academy (Faculty)</span>
            </div>
            {CMP.map((r) => (
              <div className="fi-cmp-row" key={r.key}>
                <span className="fi-key">{r.key}</span>
                <span className="fi-expert-val"><Star /> {r.expert}</span>
                <span className="fi-faculty-val"><Cap /> {r.faculty}</span>
              </div>
            ))}
          </div>
        </section>

        {/* How to apply */}
        <section className="fi-card">
          <div className="fi-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            How to apply
          </div>
          <div className="fi-steps">
            {STEPS.map((s) => (
              <div className="fi-step" key={s.n}>
                <div className="fi-step-n">{s.n}</div>
                <div className="fi-step-body">
                  <h4>{s.h}</h4>
                  <p>{s.p}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="fi-note">
            <strong>Note:</strong> If you don't log in to your faculty account within 3 days of approval, the approval expires. Make sure to check your email for the approval notification.
          </div>
        </section>

        {/* FAQ */}
        <section className="fi-card">
          <div className="fi-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Frequently asked questions
          </div>
          <div className="fi-faq">
            {FAQS.map((item) => (
              <div className="fi-faq-item" key={item.q}>
                <div className="fi-faq-q">{item.q}</div>
                <div className="fi-faq-a">{item.a}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="fi-cta-band">
          <h3>Ready to join the academy?</h3>
          <p>Add the Faculty track and start teaching school students on a structured, curriculum-aligned platform. Your Expert account stays exactly as it is.</p>
          <div className="fi-cta-btns">
            <button type="button" className="fi-btn-primary" onClick={apply}>Apply as Faculty Teacher</button>
            <button type="button" className="fi-btn-ghost" onClick={goBack}>Go back to dashboard</button>
          </div>
        </section>
      </main>
    </div>
  );
}

const FI_CSS = `
.fi-root { --forest:#125027; --faculty:#425f7f; --faculty-light:#eef2f7; --expert:#c0492f; --cream:#f5f0e8; --text:#1a2c33; --sub:#6b7c83; --fi-font:'Outfit','Inter',system-ui,sans-serif;
  font-family:var(--fi-font); background:var(--cream); color:var(--text); min-height:100vh; }
.fi-root *, .fi-root *::before, .fi-root *::after { box-sizing:border-box; }
.fi-nav { display:flex; align-items:center; justify-content:space-between; padding:0 40px; height:60px; background:#fff; border-bottom:1px solid #e8ece8; position:sticky; top:0; z-index:10; }
.fi-brand { font-size:17px; font-weight:800; color:var(--forest); }
.fi-back { display:inline-flex; align-items:center; gap:7px; font-size:13px; font-weight:700; color:var(--sub); border:1px solid #dde3e4; border-radius:9px; padding:7px 13px; background:#fff; cursor:pointer; font-family:inherit; transition:background .15s; }
.fi-back:hover { background:#f3f5f6; }
.fi-hero { background:linear-gradient(135deg,#1e4060 0%,#2d5580 50%,#425f7f 100%); padding:64px 40px 60px; color:#fff; text-align:center; }
.fi-hero-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(255,255,255,.15); border-radius:100px; padding:6px 14px; font-size:11px; font-weight:700; letter-spacing:.6px; text-transform:uppercase; margin-bottom:18px; }
.fi-hero h1 { font-size:clamp(30px,5vw,52px); font-weight:900; line-height:1.1; margin:0 0 16px; letter-spacing:-1px; }
.fi-hero p { font-size:16px; opacity:.85; max-width:520px; margin:0 auto; line-height:1.65; }
.fi-main { max-width:780px; margin:0 auto; padding:40px 20px 80px; display:flex; flex-direction:column; gap:28px; }
.fi-card { background:#fff; border-radius:16px; padding:22px 24px; box-shadow:0 2px 12px rgba(0,0,0,.06); }
.fi-label { font-size:10.5px; font-weight:800; text-transform:uppercase; letter-spacing:.6px; color:var(--faculty); margin-bottom:14px; display:flex; align-items:center; gap:7px; }
.fi-label svg { opacity:.7; }
.fi-feat-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.fi-feat { background:var(--faculty-light); border-radius:11px; padding:14px 15px; display:flex; gap:12px; align-items:flex-start; }
.fi-feat-ic { width:36px; height:36px; border-radius:9px; background:rgba(66,95,127,.15); color:var(--faculty); display:grid; place-items:center; flex-shrink:0; }
.fi-feat h4 { font-size:13px; font-weight:700; color:var(--text); margin:0 0 4px; }
.fi-feat p { font-size:12px; color:var(--sub); line-height:1.5; margin:0; }
.fi-cmp { display:flex; flex-direction:column; }
.fi-cmp-head { display:grid; grid-template-columns:130px 1fr 1fr; gap:8px; padding:8px 0 10px; border-bottom:2px solid #e8ecf0; }
.fi-cmp-head span { font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:.5px; display:flex; align-items:center; gap:5px; }
.fi-expert-col { color:var(--expert); }
.fi-faculty-col { color:var(--faculty); }
.fi-cmp-row { display:grid; grid-template-columns:130px 1fr 1fr; gap:8px; padding:9px 0; border-bottom:1px solid #f0f3f6; align-items:center; font-size:13px; }
.fi-cmp-row:last-child { border-bottom:none; }
.fi-key { font-weight:700; color:var(--sub); font-size:12px; }
.fi-expert-val { color:#b03a24; display:flex; align-items:center; gap:6px; }
.fi-faculty-val { color:var(--faculty); display:flex; align-items:center; gap:6px; font-weight:600; }
.fi-steps { display:flex; flex-direction:column; gap:14px; }
.fi-step { display:flex; gap:14px; align-items:flex-start; }
.fi-step-n { width:30px; height:30px; border-radius:50%; background:var(--faculty); color:#fff; display:grid; place-items:center; font-size:13px; font-weight:800; flex-shrink:0; }
.fi-step-body h4 { font-size:14px; font-weight:700; color:var(--text); margin:0 0 4px; }
.fi-step-body p { font-size:12.5px; color:var(--sub); line-height:1.55; margin:0; }
.fi-note { margin-top:16px; padding:12px 14px; background:#fff8ed; border:1px solid #f3d9bd; border-radius:10px; font-size:12.5px; color:#92550a; line-height:1.55; }
.fi-faq { display:flex; flex-direction:column; }
.fi-faq-item { border-bottom:1px solid #f0f3f6; padding:13px 0; }
.fi-faq-item:last-child { border-bottom:none; }
.fi-faq-q { font-size:13.5px; font-weight:700; color:var(--text); margin-bottom:5px; }
.fi-faq-a { font-size:12.5px; color:var(--sub); line-height:1.6; }
.fi-cta-band { background:linear-gradient(135deg,#1e4060,#425f7f); border-radius:16px; padding:32px 28px; color:#fff; text-align:center; }
.fi-cta-band h3 { font-size:22px; font-weight:800; margin:0 0 8px; }
.fi-cta-band p { font-size:13.5px; opacity:.8; margin:0 auto 22px; line-height:1.6; max-width:520px; }
.fi-cta-btns { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
.fi-btn-primary { background:#fff; color:var(--faculty); border:none; border-radius:11px; padding:13px 28px; font-size:14px; font-weight:800; cursor:pointer; font-family:inherit; transition:transform .15s, box-shadow .15s; }
.fi-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,.2); }
.fi-btn-ghost { background:rgba(255,255,255,.15); color:#fff; border:1.5px solid rgba(255,255,255,.4); border-radius:11px; padding:13px 22px; font-size:14px; font-weight:700; cursor:pointer; font-family:inherit; transition:background .15s; }
.fi-btn-ghost:hover { background:rgba(255,255,255,.25); }
@media (max-width:560px) {
  .fi-hero { padding:44px 20px 40px; }
  .fi-feat-grid { grid-template-columns:1fr; }
  .fi-cmp-head, .fi-cmp-row { grid-template-columns:90px 1fr 1fr; font-size:12px; }
  .fi-nav { padding:0 16px; }
}
`;
