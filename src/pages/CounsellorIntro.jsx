/**
 * /become-counsellor — the public door to the career-counsellor console.
 * design_handoff_admin_counsellor.
 *
 * The third provider track had no public entry point at all. Academy has
 * /become-faculty (FacultyIntro) and Skill Dev has /become-expert (SkillIntro);
 * counselling had neither, so the only way into the console was to already
 * know the teacher-app URL. Footer.jsx:97-99 already carries a comment saying
 * exactly this about the Skill track, for the same reason.
 *
 * ⚠ WHY THIS PAGE EXISTS RATHER THAN A BARE CROSS-APP LINK.
 * The console lives in another app (shiksha-teacher-dashboard), and a raw
 * <a href> to it from a signed-out visitor just bounces off its login. The
 * obvious fix — /login?next=<teacher app URL> — CANNOT work and must not be
 * made to: `safeReturnPath` (src/auth/returnTo.js:5-15) rejects any next= that
 * is not same-origin, which is an open-redirect guard, not an oversight.
 *
 * So the handoff goes through an in-app path instead: a signed-out visitor is
 * sent to /login?next=/become-counsellor — same origin, passes the guard — and
 * lands back here signed in, where the CTA now points at the console.
 *
 * The console itself is the application form: CounselorLayout renders
 * CounselorApply inline at /teacher/counsellor for any signed-in teacher with
 * no CounselorProfile yet, and shows a proper status screen for pending /
 * rejected / suspended. Nothing needs building there.
 */
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { TEACHER_COUNSELLOR_URL } from "../config/urls";
import "../css/CounsellorIntro.css";

const STEPS = [
  {
    title: "Tell us what you guide on",
    body: "Pick the subjects and stages you know — stream choice after Class 10, entrance exams, degrees, careers abroad.",
  },
  {
    title: "We check your background",
    body: "An admin reviews your application. You'll see the decision on your console, with a reason if it's not approved.",
  },
  {
    title: "Set the hours you're free",
    body: "You choose your own weekly availability. Students can only book inside it.",
  },
  {
    title: "Meet students one to one",
    body: "Approve the requests you want, meet, and write a private note afterwards. Your rating comes from the students you've actually met.",
  },
];

export default function CounsellorIntro() {
  const { isAuthenticated, loading } = useAuth();

  return (
    <main className="ci-wrap">
      <section className="ci-hero">
        <span className="ci-eyebrow">Career Counselling</span>
        <h1>Help a student choose what comes next.</h1>
        <p className="ci-lede">
          Thousands of students on ShikshaCom are deciding between streams,
          entrance exams and degrees with nobody to ask. If guiding them is
          something you do well, you can do it here — on your own hours.
        </p>

        <div className="ci-actions">
          {/* Until auth has resolved we don't know which door to show, and
              guessing means half of visitors get a link that bounces. */}
          {loading ? (
            <span className="ci-btn ci-btn--ghost" aria-hidden="true">
              Checking your account…
            </span>
          ) : isAuthenticated ? (
            <a className="ci-btn" href={TEACHER_COUNSELLOR_URL}>
              Apply to counsel →
            </a>
          ) : (
            <Link className="ci-btn" to="/login?next=/become-counsellor">
              Sign in to apply →
            </Link>
          )}
          <Link className="ci-btn ci-btn--ghost" to="/counselling">
            See the student side
          </Link>
        </div>

        {!loading && !isAuthenticated && (
          <p className="ci-note">
            You'll come straight back here after signing in.
          </p>
        )}
      </section>

      <section className="ci-steps" aria-label="How it works">
        <h2>How it works</h2>
        <ol className="ci-steplist">
          {STEPS.map((s, i) => (
            <li key={s.title} className="ci-step">
              <span className="ci-step__n">{i + 1}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="ci-faq" aria-label="Before you apply">
        <h2>Before you apply</h2>
        <dl>
          <dt>Do I need to be a teacher on ShikshaCom?</dt>
          {/* Stated plainly because it is a real constraint today, not a
              detail: ProtectedTeacherRoute gates the console on teacher
              context, which needs an approved TeacherProfile and the TEACHER
              role. A counsellor-only account cannot reach it. Promising
              otherwise here would send people to a door that won't open. */}
          <dd>
            Yes, for now. The counselling console sits inside the teacher
            dashboard, so you'll need a teaching account on ShikshaCom first.
            If you don't have one, <Link to="/become-faculty">start there</Link>.
          </dd>

          <dt>Does it cost anything?</dt>
          <dd>No. Applying and running sessions are free.</dd>

          <dt>Who sees my notes about a student?</dt>
          <dd>
            Only you. Session notes are private to the counsellor who wrote
            them — students never see them.
          </dd>

          <dt>Can I stop taking bookings?</dt>
          <dd>
            Any time. Clearing your weekly availability closes new bookings
            without touching the ones you've already confirmed.
          </dd>
        </dl>
      </section>
    </main>
  );
}
