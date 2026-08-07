// PLACEMENT: src/counselling/GuideBlocks.jsx   (NEW FILE — landing/frontend app)
//
// The guide-body block renderer, extracted out of GuidePage.jsx (which
// used to define it inline) and extended with the block types the school-
// level guides need: h3 (real sub-headings, not flattened into <p>), faq
// (accordion), worksheet/checklist (the "Activities & Worksheets"
// chapters), steps (numbered action plans), kv (definition pairs), and
// note (a grey, non-"tip" callout). p | list | table | tip | ref are
// byte-identical to the original static renderer.
//
// Unknown block types render null — lets the backend ship a new type
// before this file catches up, per counseling/guide_serializers.py's
// validate_blocks() comment.

import React, { useState } from "react";

function readStored(storageKey) {
  if (!storageKey) return {};
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "{}");
  } catch {
    return {};
  }
}

function writeStored(storageKey, value) {
  if (!storageKey) return;
  try {
    localStorage.setItem(storageKey, JSON.stringify(value));
  } catch {
    // Storage full/disabled — the activity still works for this visit,
    // it just won't survive a refresh. Not worth surfacing an error for.
  }
}

// `storageKey` uniquely identifies one block instance (guide + section +
// block index — see GuidePage.jsx) so checklist/worksheet answers survive
// a refresh or a later visit, without any backend call or login.
export default function Block({ b, storageKey }) {
  switch (b.t) {
    case "p":
      return <p>{b.text}</p>;

    case "h3":
      return <h3 className="sc-block-h3">{b.text}</h3>;

    case "list": {
      const Tag = b.ordered ? "ol" : "ul";
      return (
        <Tag>
          {b.items.map((item, i) => {
            const isNested = item && typeof item === "object";
            const text = isNested ? item.text : item;
            return (
              <li key={i}>
                {text}
                {isNested && item.children?.length > 0 && (
                  <ul>
                    {item.children.map((c, j) => <li key={j}>{c}</li>)}
                  </ul>
                )}
              </li>
            );
          })}
        </Tag>
      );
    }

    case "tip":
      return (
        <div className="sc-tip">
          <div><b>{b.title}</b><div>{b.body}</div></div>
        </div>
      );

    case "note":
      return (
        <div className="sc-note-block">
          {b.title && <b>{b.title}</b>}
          <div>{b.body}</div>
        </div>
      );

    case "table": {
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

    case "kv":
      return (
        <dl className="sc-kv">
          {b.pairs.map(([term, def], i) => (
            <React.Fragment key={i}>
              <dt>{term}</dt>
              <dd>{def}</dd>
            </React.Fragment>
          ))}
        </dl>
      );

    case "steps":
      return (
        <ol className="sc-next sc-steps-block">
          {b.items.map((s, i) => (
            <li key={i}>
              <b>{s.title}</b>
              {s.detail && <div className="sc-step-detail">{s.detail}</div>}
            </li>
          ))}
        </ol>
      );

    case "checklist":
      return <Checklist b={b} storageKey={storageKey} />;

    case "faq":
      return (
        <div className="sc-faq">
          {b.items.map((item, i) => (
            <details key={i} className="sc-faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      );

    case "worksheet":
      return <Worksheet b={b} storageKey={storageKey} />;

    case "ref":
      return (
        <p className="sc-refs">
          {b.label ? `${b.label} ` : ""}
          <a href={b.url} target="_blank" rel="noreferrer">{b.url}</a>
        </p>
      );

    default:
      return null;
  }
}

// Checklist answers persist to localStorage (see readStored/writeStored
// above), not a backend — same reasoning as Worksheet below.
function Checklist({ b, storageKey }) {
  const [checked, setChecked] = useState(() => readStored(storageKey));
  const toggle = (i) => {
    setChecked((c) => {
      const next = { ...c, [i]: !c[i] };
      writeStored(storageKey, next);
      return next;
    });
  };

  return (
    <ul className="sc-checklist">
      {b.items.map((item, i) => {
        const text = typeof item === "string" ? item : item.text;
        const note = typeof item === "string" ? null : item.note;
        return (
          <li key={i}>
            <label>
              <input type="checkbox" checked={!!checked[i]} onChange={() => toggle(i)} />
              <span>{text}</span>
            </label>
            {note && <div className="sc-step-detail">{note}</div>}
          </li>
        );
      })}
    </ul>
  );
}

// Worksheet answers persist to localStorage, keyed per block instance —
// no backend, no auth. Login isn't required to read these guides today
// ("free to read, no login needed"), and saving answers server-side
// would mean gating a currently-public page behind auth. localStorage
// gets the same "it just works, nothing to log into" feel without that
// trade-off — answers now survive a refresh/revisit instead of being
// purely in-memory for the one render.
function Worksheet({ b, storageKey }) {
  const [values, setValues] = useState(() => readStored(storageKey));
  const setField = (key, val) => setValues((v) => {
    const next = { ...v, [key]: val };
    writeStored(storageKey, next);
    return next;
  });

  return (
    <div className="sc-worksheet">
      {b.title && <div className="sc-worksheet-title">{b.title}</div>}
      {b.prompt && <p>{b.prompt}</p>}
      {(b.fields || []).map((f, i) => (
        <label key={f.key || i} className="sc-worksheet-field">
          <span>{f.label}</span>
          {f.kind === "textarea" ? (
            <textarea rows={3} value={values[f.key] || ""} onChange={(e) => setField(f.key, e.target.value)} />
          ) : f.kind === "choice" ? (
            <select value={values[f.key] || ""} onChange={(e) => setField(f.key, e.target.value)}>
              <option value="" disabled>Choose…</option>
              {(f.options || []).map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : (
            <input type="text" value={values[f.key] || ""} onChange={(e) => setField(f.key, e.target.value)} />
          )}
        </label>
      ))}
    </div>
  );
}
