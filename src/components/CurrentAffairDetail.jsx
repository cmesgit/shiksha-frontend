// One CMS current-affairs article. Companion to CurrentAffairs.jsx.
//
// body_html is sanitized SERVER-side on save (CurrentAffair.save() runs
// content/sanitize.py's clean_html, the same allow-list the blog and FAQ
// bodies go through), so it is rendered directly — matching how every other
// CMS body in this app is rendered. Do not add a second client-side
// sanitizer here: this codebase has already been bitten by DOMPurify
// silently stripping legitimate markup out of CMS content.
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCurrentAffair } from "../api/contentApi";
import "../css/CurrentAffairs.css";

const fmtDate = (d) => {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
    });
  } catch {
    return d;
  }
};

const CurrentAffairDetail = () => {
  const { slug } = useParams();
  const [state, setState] = useState({ status: "loading", affair: null });

  useEffect(() => {
    let alive = true;
    setState({ status: "loading", affair: null });
    getCurrentAffair(slug).then((res) => {
      if (alive) setState(res);
    });
    return () => { alive = false; };
  }, [slug]);

  if (state.status === "loading") {
    return (
      <div className="current-affairs-page">
        <div className="loading"><p>Loading…</p></div>
      </div>
    );
  }

  if (state.status !== "ok") {
    return (
      <div className="current-affairs-page">
        <div className="empty-state">
          <p>
            {state.status === "notfound"
              ? "This article isn't available — it may have been unpublished."
              : "Failed to load this article. Please try again later."}
          </p>
          <Link to="/current-affairs" className="read-more-link">
            ← Back to Current Affairs
          </Link>
        </div>
      </div>
    );
  }

  const a = state.affair;

  return (
    <div className="current-affairs-page">
      <article className="ca-article">
        <Link to="/current-affairs" className="ca-back">← Current Affairs</Link>

        <div className="ca-cardMeta">
          <span className="ca-cat">{a.category_label || a.category}</span>
          <span className="ca-date">{fmtDate(a.affair_date)}</span>
        </div>

        <h1 className="ca-articleTitle">{a.title}</h1>

        {a.summary && <p className="ca-articleSummary">{a.summary}</p>}

        {a.body_html && (
          <div className="ca-body" dangerouslySetInnerHTML={{ __html: a.body_html }} />
        )}

        {a.tags?.length > 0 && (
          <div className="ca-tags ca-tags--article">
            {a.tags.map((t) => (
              <span key={typeof t === "string" ? t : t.slug || t.name} className="ca-tag">
                {typeof t === "string" ? t : t.name}
              </span>
            ))}
          </div>
        )}

        {a.source_name && (
          <p className="ca-articleSource">
            Source:{" "}
            {a.source_url ? (
              <a href={a.source_url} target="_blank" rel="noopener noreferrer">
                {a.source_name}
              </a>
            ) : (
              a.source_name
            )}
          </p>
        )}
      </article>
    </div>
  );
};

export default CurrentAffairDetail;
