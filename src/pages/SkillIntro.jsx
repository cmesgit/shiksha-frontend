/**
 * PLACEMENT: src/pages/SkillIntro.jsx  (NEW)
 *
 * "Teach on Skill Dev" intro / landing page — the missing mirror of
 * FacultyIntro.jsx.
 *
 * WHY THIS EXISTS
 * ───────────────
 * The two teaching tracks were wildly asymmetric on the way IN, in a way that
 * had nothing to do with the deliberate asymmetry between them:
 *
 *     Academy   /become-faculty  → a real landing page (hero, steps, FAQs)
 *                                  linked from the Navbar drawer AND the
 *                                  Footer, plus /faculty/signup for a
 *                                  brand-new visitor.
 *     Skill Dev /expert-apply    → a bare <Navigate> into a ProtectedRoute,
 *                                  linked from nowhere on the public site.
 *
 * So a signed-out visitor who wanted to teach a craft had no page explaining
 * the track, no entry point in the site chrome, and — if they somehow found
 * /expert-apply — got bounced to /login with no explanation of what they were
 * signing in FOR. The one public mention, SkillBrowsePage's teach banner, sent
 * them to /become-a-teacher?track=skill, whose ?track= was being dropped on
 * the floor (fixed in BecomeTeacher.jsx alongside this).
 *
 * The asymmetry that IS deliberate — Academy is employment and gets reviewed,
 * Skill Dev is a marketplace listing and goes live immediately — is kept and
 * stated plainly, including in the comparison table.
 *
 * THE ONE THING THIS PAGE MUST NOT SOFT-PEDAL
 * ───────────────────────────────────────────
 * "Goes live immediately" is true of the TRACK and false of the LISTING.
 * `ExpertProfile.refresh_listing` only flips `is_listed` once `completeness()`
 * passes, so a new expert with a blank profile is not findable by anyone —
 * and under account-first registration /register collects only email +
 * password, so a brand-new account starts out missing even its own NAME.
 * That gap shipped silently once already. Step 3 and the FAQ both name it
 * rather than letting someone discover it by wondering why they have no
 * bookings.
 *
 * Self-contained: own nav/hero/styles, all `se-` prefixed, rendered WITHOUT
 * the marketing <Page> chrome — same shape and same reasoning as FacultyIntro.
 * Note this app has NO live token substrate (src/shared/tokens.css is imported
 * nowhere), so per-file scoped custom properties are the convention here, not
 * a shortcut.
 */
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { TEACHER_SKILL_URL } from "../config/urls";

const Star = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const Cap = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

/* Same rows as FacultyIntro's table, same values — deliberately. Two pages
   describing the same choice must not disagree about it. The columns are
   ordered Skill-first here because that is the track this page is about. */
const CMP = [
  { key: "Students",   expert: "Anyone, any age",          faculty: "Class 8–12 students" },
  { key: "Curriculum", expert: "Your own course / 1-on-1", faculty: "Board-aligned syllabus" },
  { key: "Schedule",   expert: "You set your own slots",   faculty: "Academy assigns timetable" },
  { key: "Payment",    expert: "Per session / course",     faculty: "Monthly faculty salary" },
  { key: "Screening",  expert: "Open — list immediately",  faculty: "Admin review · 1–3 days" },
];

const FEATURES = [
  { title: "Teach what you actually know", body: "Languages, music, coding, trades, exam coaching, anything you can teach well. You are not limited to a school syllabus.",
    icon: <><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></> },
  { title: "Your hours, your rates", body: "You set your own availability and decide what your sessions are worth. Nobody assigns you a timetable.",
    icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></> },
  { title: "No application to wait on", body: "There is no review queue and no approval step. The track is added the moment you ask for it.",
    icon: <><polyline points="20 6 9 17 4 12"/></> },
  { title: "Keep learning on the same account", body: "Your student side carries on exactly as it is. Teaching is added to the account you already have, not a second one.",
    icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></> },
];

/* Two entries, because the first step genuinely differs and pretending
   otherwise is how /faculty/signup and /become-a-teacher drifted apart.
   Step 3 is the same in both, and it is the important one. */
const STEPS_SIGNED_IN = [
  { n: 1, h: "Add Skill Dev teaching", p: "One click. No documents, no application form, no waiting for anyone to approve you." },
  { n: 2, h: "Tell learners what you teach", p: "Your subject, the languages you teach in, a short introduction, and whether you teach online or in person." },
  { n: 3, h: "Your listing goes live", p: <>Your profile has to be complete before learners can find you — <strong>an incomplete profile stays hidden</strong>. We show you exactly what is missing, so this is a short step, not a mystery.</> },
];
const STEPS_NEW = [
  { n: 1, h: "Create your account", p: "Email and a password — that is the whole form. You verify by clicking a link, and you are signed in from there." },
  { n: 2, h: "Add Skill Dev teaching and your details", p: "What you teach, the languages you teach in, a short introduction, and how your classes happen. No documents and no review." },
  { n: 3, h: "Your listing goes live", p: <>Your profile has to be complete before learners can find you — <strong>an incomplete profile stays hidden</strong>. We show you exactly what is missing, so this is a short step, not a mystery.</> },
];

const FAQS = [
  { q: "Do I need a degree or teaching certificate?", a: "No. Skill Dev is open — there is no qualification check and no admin review. That is the Academy faculty track, which is a different thing: employment, teaching a school syllabus to a batch, and it does need documents and an approval." },
  { q: "Why can't learners find me yet?", a: "Almost always an incomplete profile. Your listing only becomes visible once your profile is complete — that includes your name, date of birth, phone number and photo as well as what you teach. Your profile page lists whatever is still missing." },
  { q: "Can I teach on Skill Dev and in the Academy?", a: "Yes, both ways round, on one account. You switch between them with the Academy / Skill Dev toggle in your teaching dashboard. Adding one never affects the other." },
  { q: "What does it cost me?", a: "Nothing to list. You keep your learning account and your student profiles exactly as they are." },
  { q: "Can I change my mind later?", a: "Yes. You can edit or empty your profile at any time, which takes your listing back out of search." },
];

export default function SkillIntro() {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const isNewVisitor = !authLoading && !isAuthenticated;

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else navigate("/");
  };

  /* Signed in → straight to the track. Signed out → the account-first door,
     carrying the intent AND the track so verification lands them on the Skill
     card rather than on a chooser re-asking what they already said. Sending an
     anonymous visitor at /become-a-teacher would work too, but ProtectedRoute
     would bounce them to /login with no explanation of what they were signing
     in for — which is the exact dead end this page exists to remove. */
  const apply = () => {
    navigate(isNewVisitor
      ? "/register?intent=teach&track=skill"
      : "/become-a-teacher?track=skill");
  };

  const STEPS = isNewVisitor ? STEPS_NEW : STEPS_SIGNED_IN;

  return (
    <div className="se-root">
      <style>{SE_CSS}</style>

      <nav className="se-nav">
        <span className="se-brand">ShikshaCom</span>
        <button type="button" className="se-back" onClick={goBack}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          {isNewVisitor ? "Back to home" : "Back"}
        </button>
      </nav>

      <header className="se-hero">
        <div className="se-hero-badge"><Star size={14} /> ShikshaCom Skill Dev</div>
        <h1>Teach what you know</h1>
        <p>Offer sessions in your craft — languages, music, coding, trades, exam coaching — to learners across India. No application, no review, no waiting.</p>
      </header>

      <main className="se-main">
        {/* What Skill Dev is */}
        <section className="se-card">
          <div className="se-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            What is a Skill Dev expert?
          </div>
          <div className="se-feat-grid">
            {FEATURES.map((f) => (
              <div className="se-feat" key={f.title}>
                <div className="se-feat-ic">
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

        {/* Skill Dev vs Academy */}
        <section className="se-card">
          <div className="se-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
            Skill Dev (Expert) vs Academy (Faculty)
          </div>
          <div className="se-cmp">
            <div className="se-cmp-head">
              <span />
              <span className="se-expert-col"><Star size={11} /> Skill Dev (Expert)</span>
              <span className="se-faculty-col"><Cap size={11} /> Academy (Faculty)</span>
            </div>
            {CMP.map((r) => (
              <div className="se-cmp-row" key={r.key}>
                <span className="se-key">{r.key}</span>
                <span className="se-expert-val"><Star /> {r.expert}</span>
                <span className="se-faculty-val"><Cap /> {r.faculty}</span>
              </div>
            ))}
          </div>
          <div className="se-note">
            Looking for the school-syllabus track instead? That one is{" "}
            <a href="/become-faculty">Academy faculty</a> — a salaried teaching
            role with qualification documents and a 1–3 day review.
          </div>
        </section>

        {/* How to start */}
        <section className="se-card">
          <div className="se-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            How to start
          </div>
          <div className="se-steps">
            {STEPS.map((s) => (
              <div className="se-step" key={s.n}>
                <div className="se-step-n">{s.n}</div>
                <div className="se-step-body">
                  <h4>{s.h}</h4>
                  <p>{s.p}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="se-card">
          <div className="se-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Frequently asked questions
          </div>
          <div className="se-faq">
            {FAQS.map((item) => (
              <div className="se-faq-item" key={item.q}>
                <div className="se-faq-q">{item.q}</div>
                <div className="se-faq-a">{item.a}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="se-cta-band">
          <h3>Ready to start teaching?</h3>
          <p>
            {isNewVisitor
              ? "Create your account — email and a password, nothing else — and you can set up your Skill Dev teaching straight after verifying."
              : "Add Skill Dev teaching to your account. It takes one click, and your learning side carries on exactly as it is."}
          </p>
          <div className="se-cta-btns">
            <button type="button" className="se-btn-primary" onClick={apply}>
              {isNewVisitor ? "Create an account" : "Start teaching on Skill Dev"}
            </button>
            <button type="button" className="se-btn-ghost" onClick={goBack}>
              {isNewVisitor ? "Back to home" : "Back"}
            </button>
          </div>
          {!isNewVisitor && (
            <p className="se-cta-foot">
              Already teaching? <a href={TEACHER_SKILL_URL}>Go to your dashboard</a>
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

/* Palette note: --expert (#c0492f) is the terracotta FacultyIntro already uses
   for its Skill Dev column, so the two pages agree on which colour means which
   track. The hero/CTA gradients are the warm counterpart of FacultyIntro's
   blues rather than a new, unrelated scheme. */
const SE_CSS = `
.se-root { --expert:#c0492f; --expert-deep:#8f3320; --expert-light:#fdf1ed; --forest:#125027; --faculty:#425f7f; --cream:#f5f0e8; --text:#1a2c33; --sub:#6b7c83; --se-font:'Outfit','Inter',system-ui,sans-serif;
  font-family:var(--se-font); background:var(--cream); color:var(--text); min-height:100vh; }
.se-root *, .se-root *::before, .se-root *::after { box-sizing:border-box; }
.se-nav { display:flex; align-items:center; justify-content:space-between; padding:0 40px; height:60px; background:#fff; border-bottom:1px solid #e8ece8; position:sticky; top:0; z-index:10; }
.se-brand { font-size:17px; font-weight:800; color:var(--forest); }
.se-back { display:inline-flex; align-items:center; gap:7px; font-size:13px; font-weight:700; color:var(--sub); border:1px solid #dde3e4; border-radius:9px; padding:7px 13px; background:#fff; cursor:pointer; font-family:inherit; transition:background .15s; }
.se-back:hover { background:#f3f5f6; }
.se-hero { background:linear-gradient(135deg,#8f3320 0%,#b04328 50%,#c0492f 100%); padding:64px 40px 60px; color:#fff; text-align:center; }
.se-hero-badge { display:inline-flex; align-items:center; gap:7px; background:rgba(255,255,255,.15); border-radius:100px; padding:6px 14px; font-size:11px; font-weight:700; letter-spacing:.6px; text-transform:uppercase; margin-bottom:18px; }
.se-hero h1 { font-size:clamp(30px,5vw,52px); font-weight:900; line-height:1.1; margin:0 0 16px; letter-spacing:-1px; }
.se-hero p { font-size:16px; opacity:.85; max-width:540px; margin:0 auto; line-height:1.65; }
.se-main { max-width:780px; margin:0 auto; padding:40px 20px 80px; display:flex; flex-direction:column; gap:28px; }
.se-card { background:#fff; border-radius:16px; padding:22px 24px; box-shadow:0 2px 12px rgba(0,0,0,.06); }
.se-label { font-size:10.5px; font-weight:800; text-transform:uppercase; letter-spacing:.6px; color:var(--expert); margin-bottom:14px; display:flex; align-items:center; gap:7px; }
.se-label svg { opacity:.7; }
.se-feat-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.se-feat { background:var(--expert-light); border-radius:11px; padding:14px 15px; display:flex; gap:12px; align-items:flex-start; }
.se-feat-ic { width:36px; height:36px; border-radius:9px; background:rgba(192,73,47,.15); color:var(--expert); display:grid; place-items:center; flex-shrink:0; }
.se-feat h4 { font-size:13px; font-weight:700; color:var(--text); margin:0 0 4px; }
.se-feat p { font-size:12px; color:var(--sub); line-height:1.5; margin:0; }
.se-cmp { display:flex; flex-direction:column; }
.se-cmp-head { display:grid; grid-template-columns:130px 1fr 1fr; gap:8px; padding:8px 0 10px; border-bottom:2px solid #f0e6e2; }
.se-cmp-head span { font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:.5px; display:flex; align-items:center; gap:5px; }
.se-expert-col { color:var(--expert); }
.se-faculty-col { color:var(--faculty); }
.se-cmp-row { display:grid; grid-template-columns:130px 1fr 1fr; gap:8px; padding:9px 0; border-bottom:1px solid #f6f0ee; align-items:center; font-size:13px; }
.se-cmp-row:last-child { border-bottom:none; }
.se-key { font-weight:700; color:var(--sub); font-size:12px; }
.se-expert-val { color:#b03a24; display:flex; align-items:center; gap:6px; font-weight:600; }
.se-faculty-val { color:var(--faculty); display:flex; align-items:center; gap:6px; }
.se-steps { display:flex; flex-direction:column; gap:14px; }
.se-step { display:flex; gap:14px; align-items:flex-start; }
.se-step-n { width:30px; height:30px; border-radius:50%; background:var(--expert); color:#fff; display:grid; place-items:center; font-size:13px; font-weight:800; flex-shrink:0; }
.se-step-body h4 { font-size:14px; font-weight:700; color:var(--text); margin:0 0 4px; }
.se-step-body p { font-size:12.5px; color:var(--sub); line-height:1.55; margin:0; }
.se-note { margin-top:16px; padding:12px 14px; background:#f2f6fa; border:1px solid #d5e2ee; border-radius:10px; font-size:12.5px; color:#3c5872; line-height:1.55; }
.se-note a { color:var(--faculty); font-weight:700; }
.se-faq { display:flex; flex-direction:column; }
.se-faq-item { border-bottom:1px solid #f6f0ee; padding:13px 0; }
.se-faq-item:last-child { border-bottom:none; }
.se-faq-q { font-size:13.5px; font-weight:700; color:var(--text); margin-bottom:5px; }
.se-faq-a { font-size:12.5px; color:var(--sub); line-height:1.6; }
.se-cta-band { background:linear-gradient(135deg,#8f3320,#c0492f); border-radius:16px; padding:32px 28px; color:#fff; text-align:center; }
.se-cta-band h3 { font-size:22px; font-weight:800; margin:0 0 8px; }
.se-cta-band p { font-size:13.5px; opacity:.85; margin:0 auto 22px; line-height:1.6; max-width:520px; }
.se-cta-btns { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
.se-btn-primary { background:#fff; color:var(--expert-deep); border:none; border-radius:11px; padding:13px 28px; font-size:14px; font-weight:800; cursor:pointer; font-family:inherit; transition:transform .15s, box-shadow .15s; }
.se-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,.2); }
.se-btn-ghost { background:rgba(255,255,255,.15); color:#fff; border:1.5px solid rgba(255,255,255,.4); border-radius:11px; padding:13px 22px; font-size:14px; font-weight:700; cursor:pointer; font-family:inherit; transition:background .15s; }
.se-btn-ghost:hover { background:rgba(255,255,255,.25); }
.se-cta-foot { font-size:12.5px; opacity:.8; margin:18px 0 0; }
.se-cta-foot a { color:#fff; font-weight:700; text-decoration:underline; }
@media (max-width:560px) {
  .se-hero { padding:44px 20px 40px; }
  .se-feat-grid { grid-template-columns:1fr; }
  .se-cmp-head, .se-cmp-row { grid-template-columns:90px 1fr 1fr; font-size:12px; }
  .se-nav { padding:0 16px; }
}
`;
