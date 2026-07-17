import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForum } from "../ForumContext";
import { normAuthor, timeAgo } from "../utils";

/* Feed/list card — matches the .fm2-thread markup in ShikshaCom Forum.html:
   an answer-count stat column + title, tags, and an author row with a save
   toggle. Upvote / report / share live on the thread page, per the design. */
export default function QuestionCard({ q, onDeleted }) {
  const navigate = useNavigate();
  const { isSaved, toggleSave } = useForum();
  const [menu, setMenu] = useState(false);

  const asker = normAuthor(q.author, q.author_username);
  const saved = isSaved(q.id);
  const answers = q.answer_count != null ? q.answer_count : (q.reply_count || 0);
  const hasAnswer = answers > 0;
  const open = () => navigate(`/forum/thread/${q.id}`);

  const openAsker = (e) => { e.stopPropagation(); navigate(`/forum/u/${asker.username}`); };

  return (
    <article className="fm2-thread" onClick={open}>
      <div className="fm2-stat-col">
        <span className="fm2-stat-num" style={{ color: hasAnswer ? "#125027" : "#b8ccb0" }}>{answers}</span>
        <span className="fm2-stat-lbl">ans</span>
      </div>
      <div className="fm2-thread-body">
        <h3 className="fm2-thread-title">
          {q.title}
          {q.kind === "post" && <span className="fm2-kind-tag">Post</span>}
          {q.is_solved && <span className="fm2-solved-tag">✓ Solved</span>}
        </h3>
        {q.tags?.length ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 9 }}>
            {q.tags.slice(0, 4).map((t) => (
              <button key={t} className="fm2-tag" onClick={(e) => { e.stopPropagation(); navigate(`/forum?topic=${encodeURIComponent(t)}`); }}>#{t}</button>
            ))}
          </div>
        ) : null}
        <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
          <div onClick={openAsker} className="fm2-avatar-xs" style={{ background: asker.color || "#125027" }}>{asker.initials}</div>
          <span onClick={openAsker} className="fm2-asker-name">{asker.name}</span>
          <span style={{ color: "#c8d8bc" }}>·</span>
          <span style={{ font: "400 11.5px Poppins,sans-serif", color: "#8a9e82" }}>
            {q.kind === "post" ? "posted" : "asked"} {timeAgo(q.created_at)}
          </span>
          {q.space ? (
            <span style={{ font: "400 11.5px Poppins,sans-serif", color: "#125027" }}>· in {q.space.name}</span>
          ) : null}
          <button
            className={`fm2-save-btn${saved ? " on" : ""}`}
            onClick={(e) => { e.stopPropagation(); toggleSave(q.id); }}
            aria-label={saved ? "Unsave" : "Save"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? "#e07900" : "none"} stroke="#e07900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
          </button>
          {onDeleted && (
            <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
              <button className="fm2-save-btn" onClick={() => setMenu((v) => !v)} aria-label="More">⋯</button>
              {menu && (
                <div className="fm2-menu" style={{ top: 26 }}>
                  <button className="fm2-menu-item danger" onClick={() => { setMenu(false); onDeleted(q.id); }}>Delete</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
