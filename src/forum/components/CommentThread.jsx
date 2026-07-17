import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const nested = depth > 0;

  const submit = () => {
    const v = draft.trim();
    if (!v) return;
    onReply(node.id, v);
    setDraft(""); setOpen(false);
  };

  return (
    <div style={nested ? { marginTop: 8, paddingLeft: 12, borderLeft: "2px solid #e4edd8" } : { padding: "9px 0", borderBottom: "1px solid #e4edd8" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
        <div onClick={() => navigate(`/forum/u/${a.username}`)} className="fm2-avatar-xs" style={{ width: nested ? 22 : 24, height: nested ? 22 : 24, background: a.color, marginTop: 1, fontSize: nested ? 7.5 : 8 }}>{a.initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 2 }}>
            <span onClick={() => navigate(`/forum/u/${a.username}`)} style={{ font: "700 12px Poppins,sans-serif", color: "#125027", cursor: "pointer" }}>{a.name}</span>
            <span style={{ font: "400 11px Poppins,sans-serif", color: "#8a9e82" }}>{timeAgo(node.created_at)}</span>
          </div>
          <p style={{ font: "400 13px/1.6 Poppins,sans-serif", color: "#2b3a2b", margin: 0 }}>{node.content}</p>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="fm2-btn-ghost" style={{ fontSize: 11, padding: "3px 7px", marginTop: 3 }} onClick={() => { if (!requireAuth()) setOpen((v) => !v); }}>Reply</button>
            <button className="fm2-btn-ghost" style={{ fontSize: 11, padding: "3px 7px", marginTop: 3 }} onClick={() => openReport("comment", node.id)}>Report</button>
          </div>
          {open && (
            <div style={{ marginTop: 7, display: "flex", gap: 7 }}>
              <input className="fm2-input" style={{ padding: "7px 10px", fontSize: 12.5 }} placeholder="Write a reply…" value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); submit(); } }} />
              <button className="fm2-btn-green" style={{ padding: "7px 14px", fontSize: 12.5 }} onClick={submit}>Reply</button>
            </div>
          )}
          {node.children.map((child) => (
            <CommentNode key={child.id} node={child} depth={depth + 1} onReply={onReply} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CommentThread({ comments, onReply }) {
  const tree = useMemo(() => buildTree(comments || []), [comments]);
  if (!tree.length) return <p style={{ font: "400 12.5px Poppins,sans-serif", color: "#8a9e82", margin: 0 }}>No comments yet. Be the first to add one.</p>;
  return <div>{tree.map((n) => <CommentNode key={n.id} node={n} depth={0} onReply={onReply} />)}</div>;
}
