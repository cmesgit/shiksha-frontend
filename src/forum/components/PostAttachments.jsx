import { useState } from "react";

function AttachmentImage({ attachment }) {
  const [failed, setFailed] = useState(false);
  const name = attachment.original_name || "Post image";
  return <figure className="fm2-attachment">
    <a href={attachment.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} aria-label={`Open ${name} at full size`}>
      {failed ? <span className="fm2-attachment-fallback">Image preview unavailable — open {name}</span> : <img src={attachment.url} alt={name} loading="lazy" decoding="async" onError={() => setFailed(true)} />}
    </a>
    <figcaption>{name} · <a href={attachment.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>Open full size ↗</a></figcaption>
  </figure>;
}

export default function PostAttachments({ attachments = [] }) {
  const safe = attachments.filter(a => a.url && /^(?:https?:\/\/|\/(?!\/))/i.test(a.url));
  if (!safe.length) return null;
  return <div className="fm2-attachments" aria-label="Post attachments">
    {safe.map(a => a.kind === "image" ? <AttachmentImage key={a.id} attachment={a} /> : <a key={a.id} className="fm2-tag" href={a.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>{a.original_name || "Download attachment"} ↗</a>)}
  </div>;
}
