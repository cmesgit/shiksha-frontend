import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { useForum } from "../ForumContext";
import { normAuthor, timeAgo } from "../utils";

// Build a nested tree from a flat comment list keyed by reply_to_comment_id.
function buildTree(comments) {
  const byId = new Map();
  comments.forEach((c) => byId.set(c.id, { ...c, children: [] }));
  const roots = [];
  byId.forEach((c) => {
    const parent = c.reply_to_comment_id != null && byId.get(c.reply_to_comment_id);
    if (parent) parent.children.push(c);
    else roots.push(c);
  });
  return roots;
}

function CommentNode({ node, depth, onReply }) {
  const navigate = useNavigate();
  const { openReport, requireAuth } = useForum();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const a = normAuthor(node.author, node.author_username);

  const submit = () => {
    const v = draft.trim();
    if (!v) return;
    onReply(node.id, v);
    setDraft(""); setOpen(false);
  };

  return (
    <div style={{ marginLeft: depth ? Math.min(depth, 4) * 22 : 0 }}>
      <div className="fm-comment">
        <div className="fm-row" style={{ gap: 8 }}>
          <Avatar {...a} size={26} onClick={() => navigate(`/forum/u/${a.username}`)} />
          <span className="fm-meta-name" style={{ fontSize: 12.5 }} onClick={() => navigate(`/forum/u/${a.username}`)}>{a.name}</span>
          <span className="fm-meta-sub">· {timeAgo(node.created_at)}</span>
        </div>
        <div className="fm-comment-body">{node.content}</div>
        <div className="fm-comment-actions">
          <button className="fm-linkbtn" onClick={() => { if (!requireAuth()) setOpen((v) => !v); }}>Reply</button>
          <button className="fm-linkbtn" onClick={() => openReport("comment", node.id)}>Report</button>
        </div>
        {open ? (
          <div className="fm-composer" style={{ marginTop: 8 }}>
            <textarea rows={2} placeholder="Write a reply…" value={draft} onChange={(e) => setDraft(e.target.value)} />
            <div className="fm-modal-foot" style={{ marginTop: 8 }}>
              <button className="fm-btn ghost sm" onClick={() => setOpen(false)}>Cancel</button>
              <button className="fm-btn sm" onClick={submit}>Reply</button>
            </div>
          </div>
        ) : null}
      </div>
      {node.children.map((child) => (
        <CommentNode key={child.id} node={child} depth={depth + 1} onReply={onReply} />
      ))}
    </div>
  );
}

export default function CommentThread({ comments, onReply }) {
  const tree = useMemo(() => buildTree(comments || []), [comments]);
  if (!tree.length) return <p className="fm-no-ans">No comments yet. Start the discussion.</p>;
  return <div>{tree.map((n) => <CommentNode key={n.id} node={n} depth={0} onReply={onReply} />)}</div>;
}
