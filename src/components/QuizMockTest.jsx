/**
 * QuizMockTest.jsx — placeholder for the Quiz & Mock Test resource.
 *
 * The feature is not built on the public site yet. This page exists so the
 * Resources menu entry has somewhere real to land: `IconCard` (the desktop
 * mega-menu renderer) has no `soon` branch the way `MenuLink` does, so an
 * entry without a `to` would render `<Link to={undefined}>` — which React
 * Router resolves to the current path, giving a card that looks clickable
 * and silently reloads the page. A page that states the position is the
 * honest version of "coming soon" here.
 *
 * Deliberately makes no promise it cannot keep: no date, and no notify form,
 * because there is no notify endpoint on this site (see Upcoming.jsx, whose
 * dead "Notify Me" button was already rerouted to /contact for that reason).
 */
import { Link } from "react-router-dom";
import "../css/QuizMockTest.css";

/* What the quiz engine already does inside the logged-in academy, described
   in visitor language. These are statements about the existing product, not
   forecasts about this page. */
const PLANNED = [
  {
    title: "Chapter-wise practice",
    body: "Short question sets that follow the same chapter structure as the study material, so practice lines up with what you just read.",
  },
  {
    title: "Full-length mock tests",
    body: "Timed papers that mirror the real exam pattern, with a review pass afterwards that shows the working for every question.",
  },
  {
    title: "Instant scoring",
    body: "Marks and a per-topic breakdown as soon as you submit, so weak areas are visible while the paper is still fresh.",
  },
];

export default function QuizMockTest() {
  return (
    <main className="qmt">
      <section className="qmt-hero">
        <p className="qmt-eyebrow">Resources</p>
        <h1 className="qmt-title">Quiz &amp; Mock Test</h1>
        <p className="qmt-lede">
          Practice quizzes and full-length mock tests are on their way to the
          public site. They already run inside the ShikshaCom academy for
          enrolled learners — this is about opening them up here.
        </p>
        <span className="qmt-badge">Coming soon</span>
      </section>

      <section className="qmt-grid" aria-label="What's coming">
        {PLANNED.map((item) => (
          <article className="qmt-card" key={item.title}>
            <h2 className="qmt-card-title">{item.title}</h2>
            <p className="qmt-card-body">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="qmt-next">
        <h2 className="qmt-next-title">In the meantime</h2>
        <p className="qmt-next-body">
          Enrolled learners already get quizzes and assignments with every
          course. If you want them now, the course catalog is the way in.
        </p>
        <div className="qmt-actions">
          <Link className="qmt-btn" to="/courses">
            Browse courses
          </Link>
          <Link className="qmt-btn qmt-btn--ghost" to="/explore">
            Explore the library
          </Link>
        </div>
      </section>
    </main>
  );
}
