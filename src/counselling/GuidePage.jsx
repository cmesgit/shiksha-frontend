// PLACEMENT: src/counselling/GuidePage.jsx   (NEW FILE — landing/frontend app)
// Workflow: "Read Career Guide" — sticky table of contents, structured
// sections (paragraphs, tables, tip callouts, lists, references), and a
// funnel CTA at the end (Find counsellors for this).

import React, { useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import CounsellingShell from "./CounsellingShell";
import GUIDES, { guideBySlug } from "./data/guides";
import { GuideCard } from "./LandingPage";

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function Block({ b }) {
  if (b.t === "p") return <p>{b.text}</p>;
  if (b.t === "list") return <ul>{b.items.map((x, i) => <li key={i}>{x}</li>)}</ul>;
  if (b.t === "tip") {
    return (
      <div className="sc-tip">
        <div><b>{b.title}</b><div>{b.body}</div></div>
      </div>
    );
  }
  if (b.t === "table") {
    const [head, ...rows] = b.rows;
    return (
      <div className="sc-table-wrap">
        <table className="sc-table">
          <thead><tr>{head.map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (b.t === "ref") {
    return (
      <p className="sc-refs">
        {b.label ? `${b.label} ` : ""}<a href={b.url} target="_blank" rel="noreferrer">{b.url}</a>
      </p>
    );
  }
  return null;
}

export default function GuidePage() {
  const { slug } = useParams();
  const guide = guideBySlug(slug);
  const related = useMemo(
    () => GUIDES.filter((g) => g.slug !== slug).slice(0, 3),
    [slug]
  );
  if (!guide) return <Navigate to="/counselling/guides" replace />;

  return (
    <CounsellingShell crumb={` / Guides / ${guide.audience}`}>
      <span className={`sc-badge ${guide.accent}`} style={{ marginBottom: 10, display: "inline-block" }}>{guide.audience}</span>
      <h1 className="sc-h1" style={{ maxWidth: 760 }}>{guide.title}</h1>
      <p className="sc-sub">{guide.blurb}</p>

      <div className="sc-reader">
        <nav className="sc-toc" aria-label="Contents">
          {guide.sections.map((s) => (
            <button
              key={s.title}
              onClick={() => document.getElementById(`sec-${slugify(s.title)}`)?.scrollIntoView({ behavior: "smooth" })}
            >
              {s.title || "Overview"}
            </button>
          ))}
        </nav>
        <article className="sc-prose">
          {guide.glance?.length > 1 && (
            <Block b={{ t: "table", rows: guide.glance }} />
          )}
          {guide.sections.map((s) => (
            <section key={s.title}>
              {s.title && <h2 id={`sec-${slugify(s.title)}`}>{s.title}</h2>}
              {s.blocks.map((b, i) => <Block key={i} b={b} />)}
            </section>
          ))}
          <div style={{ marginTop: 30, display: "flex", gap: 10, flexWrap: "wrap", borderTop: "1px solid rgba(9,62,5,.1)", paddingTop: 22 }}>
            <Link className="sc-btn" to="/counselling/counsellors">Find counsellors for this →</Link>
            <Link className="sc-btn ghost" to="/counselling/guides">All guides</Link>
          </div>
        </article>
      </div>

      <div className="sc-h2row"><h2 className="sc-h2">Keep reading</h2></div>
      <div className="sc-grid3">
        {related.map((g) => <GuideCard key={g.slug} g={g} />)}
      </div>
    </CounsellingShell>
  );
}
