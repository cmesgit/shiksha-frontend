// PLACEMENT: src/forum/ThreadCard.jsx   (REPLACE THE WHOLE FILE — landing/frontend app)
//
// The design's thread row: vote column · tag badge · Unanswered pill ·
// title · author avatar + meta. Wired to the real API shape:
// { id, title, body, author_username, created_at, tags[], reply_count,
//   upvote_count, user_has_upvoted }.
// ("Solved" / view counts exist in the design but not the backend yet —
// intentionally omitted rather than faked.)

import React from "react";
import { useNavigate } from "react-router-dom";
import { fmtNum, fmtAge, initialsOf, avatarGrad, tagColor, titleCase } from "./utils";

export default function ThreadCard({ thread, onTagClick }) {
  const navigate = useNavigate();
  const t = thread;
  const votes = t.upvote_count ?? 0;
  const voteColor = votes >= 60 ? "#125027" : "rgba(14,28,15,.5)";
  const primaryTag = (t.tags && t.tags[0]) || null;
  const tc = primaryTag ? tagColor(primaryTag) : null;

  return (
    <button className="sfr-thread sfr-reset" onClick={() => navigate(`/forum/${t.id}`)}>
      <div className="sfr-votecol">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={voteColor} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
        <span className="num" style={{ color: voteColor }}>{fmtNum(votes)}</span>
        <span className="lbl">votes</span>
      </div>
      <div className="sfr-thread-main">
        <div className="sfr-badgerow">
          {primaryTag && (
            <span
              className="sfr-badge"
              style={{ color: tc.color, background: tc.tint }}
              onClick={(e) => { e.stopPropagation(); onTagClick?.(primaryTag); }}
            >
              {titleCase(primaryTag)}
            </span>
          )}
          {(t.reply_count ?? 0) === 0 && (
            <span className="sfr-pill-unanswered">Unanswered</span>
          )}
        </div>
        <div className="sfr-thread-title">{t.title}</div>
        <div className="sfr-thread-meta">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
            <span className="sfr-avatar" style={{ background: avatarGrad(t.author_username) }}>
              {initialsOf(t.author_username)}
            </span>
            {t.author_username}
          </span>
          <span>{fmtAge(t.created_at)}</span>
          <span>{fmtNum(t.reply_count ?? 0)} replies</span>
        </div>
      </div>
    </button>
  );
}
