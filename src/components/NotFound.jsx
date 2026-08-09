/**
 * NotFound.jsx — the catch-all 404.
 *
 * Until this existed, an unmatched URL rendered an EMPTY <div className="app">:
 * React Router matched nothing, logged "No routes matched location", and the
 * visitor got a blank white page with no nav and no way back. Every typo,
 * stale bookmark, shared bad link or renamed route was a dead end. The
 * historical workaround was to add routes case-by-case as broken links were
 * reported (see the /become-faculty and /expert-apply notes in App.jsx) —
 * this replaces that with a real fallback.
 *
 * Rendered inside <Page>, so it keeps the site Navbar and Footer: the nav bar
 * alone is most of the recovery path.
 */
import { Link, useLocation, useNavigate } from "react-router-dom";

// The handful of places a lost visitor most plausibly wanted. Kept short on
// purpose — a wall of links is as unhelpful as no links.
const SUGGESTIONS = [
  { to: "/courses", label: "Browse courses", hint: "Classes 8–12, boards and exam prep" },
  { to: "/forum", label: "Community forum", hint: "Ask a question or read discussions" },
  { to: "/counselling", label: "Career guidance", hint: "Guides and one-on-one counselling" },
  { to: "/explore", label: "Explore library", hint: "Documents, papers and research" },
];

export default function NotFound() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="nf-wrap">
      <style>{css}</style>

      <p className="nf-code">404</p>
      <h1 className="nf-title">We couldn&rsquo;t find that page</h1>
      <p className="nf-sub">
        Nothing lives at <code className="nf-path">{pathname}</code>. It may have moved,
        or the link that brought you here might be out of date.
      </p>

      <div className="nf-actions">
        <Link className="nf-btn nf-btn-primary" to="/">Go to homepage</Link>
        <button className="nf-btn" type="button" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>

      <div className="nf-suggest">
        <p className="nf-suggest-head">Or try one of these</p>
        <ul>
          {SUGGESTIONS.map((s) => (
            <li key={s.to}>
              <Link to={s.to}>
                <span className="nf-s-label">{s.label}</span>
                <span className="nf-s-hint">{s.hint}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const css = `
.nf-wrap { max-width: 720px; margin: 0 auto; padding: 88px 20px 112px; text-align: center; }
.nf-code { font-size: 13px; font-weight: 700; letter-spacing: .14em; color: #005c3a; margin: 0 0 10px; }
.nf-title { font-size: clamp(26px, 4vw, 38px); line-height: 1.15; margin: 0 0 14px; color: #10221b; }
.nf-sub { font-size: 16px; line-height: 1.6; color: #4a5b54; margin: 0 auto 32px; max-width: 52ch; }
.nf-path { background: #eef4f1; border-radius: 5px; padding: 2px 7px; font-size: 14px; word-break: break-all; }

.nf-actions { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-bottom: 56px; }
.nf-btn {
  display: inline-flex; align-items: center; justify-content: center;
  min-height: 44px; padding: 0 22px; border-radius: 9px;
  border: 1px solid #cfdcd6; background: #fff; color: #10221b;
  font: inherit; font-size: 15px; font-weight: 600; cursor: pointer;
  text-decoration: none; transition: background .15s, border-color .15s;
}
.nf-btn:hover { background: #f4f8f6; border-color: #b6c9c1; }
.nf-btn-primary { background: #005c3a; border-color: #005c3a; color: #fff; }
.nf-btn-primary:hover { background: #004b2f; border-color: #004b2f; }

.nf-suggest { text-align: left; border-top: 1px solid #e6ede9; padding-top: 28px; }
.nf-suggest-head { font-size: 12px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #6b7d75; margin: 0 0 14px; }
.nf-suggest ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
.nf-suggest a {
  display: flex; flex-direction: column; gap: 2px;
  padding: 13px 15px; border-radius: 9px; border: 1px solid #e6ede9;
  text-decoration: none; transition: background .15s, border-color .15s;
}
.nf-suggest a:hover { background: #f4f8f6; border-color: #cfdcd6; }
.nf-s-label { font-size: 15px; font-weight: 600; color: #005c3a; }
.nf-s-hint { font-size: 13.5px; color: #6b7d75; }

@media (max-width: 560px) {
  .nf-wrap { padding: 56px 18px 80px; }
  .nf-actions { flex-direction: column; }
  .nf-btn { width: 100%; }
}
`;
