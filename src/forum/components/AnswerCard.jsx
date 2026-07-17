import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForum } from "../ForumContext";
import { normAuthor, timeAgo } from "../utils";
import { toggleCommentUpvote } from "../../api/forum";

/* Answer card — matches the .fm2-card answer block in ShikshaCom Forum.html:
   avatar + author, body, and a vote pill (Upvote · N | downvote) with accept
   + a ⋯ menu (report / delete). */
export default function AnswerCard({ answer, canAccept, onAccept, onDelete }) {
  const navigate = useNavigate();
  const { openReport, showToast, requireAuth } = useForum();
  const [up, setUp] = useState(!!answer.user_has_upvoted);
  const [ups, setUps] = useState(answer.upvote_count || 0);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);
  const a = normAuthor(answer.author, answer.author_username);

  useEffect(() => {
    const onDoc = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenu(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const doUpvote = async () => {
    if (requireAuth()) return;
    setUp((v) => !v); setUps((n) => n + (up ? -1 : 1));
    try { const res = await toggleCommentUpvote(answer.id); setUp(res.upvoted); setUps(res.upvote_count); }
    catch { setUp(up); setUps(answer.upvote_count || 0); }
  };
  const downvote = () => { if (up) doUpvote(); else showToast("You can only upvote answers"); };
  const share = () => { try { navigator.clipboard?.writeText(window.location.href); } catch { /* */ } showToast("Link copied"); };

  return (
    <div className="fm2-card" style={{ padding: "18px 20px", ...(answer.is_accepted ? { border: "1.5px solid #1b9c85", background: "#f4fbf6" } : {}) }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
        <div onClick={() => navigate(`/forum/u/${a.username}`)} className="fm2-avatar-sm" style={{ width: 36, height: 36, background: a.color, cursor: "pointer", fontSize: 12 }}>{a.initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div onClick={() => navigate(`/forum/u/${a.username}`)} className="fm2-asker-name" style={{ fontSize: 13.5, color: "#18261a" }}>{a.name}</div>
          {a.credential ? <div style={{ font: "400 11px Poppins,sans-serif", color: "#8a9e82" }}>{a.credential}</div> : null}
        </div>
        {answer.is_accepted && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, font: "700 11px Poppins,sans-serif", color: "#125027", background: "#d8e6c8", padding: "3px 9px", borderRadius: 20 }}>✓ Accepted</span>
        )}
        <span style={{ font: "400 11px Poppins,sans-serif", color: "#8a9e82" }}>{timeAgo(answer.created_at)}</span>
      </div>

      <div style={{ font: "400 14px/1.8 Poppins,sans-serif", color: "#2b3a2b", whiteSpace: "pre-line", marginBottom: 12 }}>{answer.content}</div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 10, borderTop: "1px solid #e4edd8" }}>
        <div className={`fm2-vote-pill${up ? " on" : ""}`}>
          <button onClick={doUpvote} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: "inherit", font: "700 12px Poppins,sans-serif", padding: "6px 11px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill={up ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
            Upvote · {ups}
          </button>
          <span style={{ width: 1, height: 16, background: "currentColor", opacity: 0.2 }} />
          <button onClick={downvote} style={{ display: "flex", alignItems: "center", background: "none", border: "none", cursor: "pointer", color: "inherit", padding: "6px 10px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
          </button>
        </div>
        {canAccept && (
          <button className="fm2-btn-ghost" style={{ fontSize: 12, padding: "5px 12px" }} onClick={() => onAccept(answer.id)}>
            {answer.is_accepted ? "Unaccept" : "Accept answer"}
          </button>
        )}
        <button className="fm2-btn-ghost" style={{ fontSize: 12, padding: "5px 10px" }} onClick={share}>Share</button>
        <div style={{ marginLeft: "auto", position: "relative" }} ref={menuRef}>
          <button onClick={() => setMenu((v) => !v)} style={{ background: "none", border: "none", cursor: "pointer", color: "#8a9e82", padding: "5px 8px", borderRadius: 6, fontSize: 16, lineHeight: 1 }}>⋯</button>
          {menu && (
            <div className="fm2-menu" style={{ top: 28, width: 130 }}>
              <button className="fm2-menu-item danger" onClick={() => { setMenu(false); openReport("answer", answer.id); }}>Report</button>
              {onDelete && <button className="fm2-menu-item danger" onClick={() => { setMenu(false); onDelete(answer.id); }}>Delete</button>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
