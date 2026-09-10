/**
 * TeacherTrackIntro — the signed-OUT half of /become-a-teacher.
 *
 * `BecomeTeacher` is about adding a teaching identity to an account that
 * already exists, so it needs a session and always has. But every public
 * "Become a teacher" entry point wants to send a visitor who has no account
 * yet, and a login wall is the wrong first answer to "how do I teach here?".
 *
 * So /become-a-teacher now serves two components: signed in, the original
 * add-a-track flow, untouched; signed out, this chooser. One URL that every
 * marketing surface can link to without knowing who is clicking it.
 *
 * The two destinations are the PUBLIC intro pages that already existed
 * (/become-faculty and /become-expert). Neither is a form — each explains its
 * track and starts the right application, so this screen only has to make the
 * choice legible, not re-explain either path.
 *
 * Copy is deliberately the same shape as BecomeTeacher's TRACK_COPY: the two
 * things people actually decide between are how long it takes to start and
 * whether there is a review step.
 */
import { Link } from "react-router-dom";
import { AuthShell } from "./AuthKit";
import "./AuthFlow.css";

const TRACKS = [
  {
    key: "academy",
    title: "Faculty teacher",
    lead: "Teach a full course to a batch of students, with a timetable, assignments and grading.",
    points: [
      "Reviewed by our team before you start — this one takes a few days.",
      "You'll need qualification documents and a signed agreement.",
      "Best if you teach a school or competitive-exam syllabus.",
    ],
    cta: "Apply as faculty",
    to: "/become-faculty",
  },
  {
    key: "skill",
    title: "Skill Dev tutor",
    lead: "Offer one-off sessions in what you know — languages, music, coding, exam coaching.",
    points: [
      "Goes live as soon as you start — no review, no waiting.",
      "You set your own availability and subjects.",
      "Your listing stays hidden until your profile is complete.",
    ],
    cta: "Start teaching on Skill Dev",
    to: "/become-expert",
  },
];

export default function TeacherTrackIntro() {
  return (
    <AuthShell role="neutral" flowLabel="Teaching" brandIcon="spark">
      <h1 className="af-heading">Teach on ShikshaCom</h1>
      <p className="af-sub">
        There are two ways to teach here. Pick the one that fits — you can add
        the other later from the same account.
      </p>

      <div className="tti-grid">
        {TRACKS.map((t) => (
          <section key={t.key} className="tti-card">
            <h2 className="tti-card__title">{t.title}</h2>
            <p className="tti-card__lead">{t.lead}</p>
            <ul className="tti-card__points">
              {t.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <Link className="af-btn af-btn--block" to={t.to}>
              {t.cta}
            </Link>
          </section>
        ))}
      </div>

      <p className="af-sub tti-foot">
        Already have an account? <Link to="/login?next=/become-a-teacher">Sign in</Link>{" "}
        and add teaching to it instead.
      </p>
    </AuthShell>
  );
}
