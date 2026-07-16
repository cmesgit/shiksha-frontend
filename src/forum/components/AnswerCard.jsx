import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { IcUp, IcShare, IcFlag, IcCheck } from "./icons";
import { useForum } from "../ForumContext";
import { normAuthor, timeAgo, fmtNum } from "../utils";
import { toggleCommentUpvote } from "../../api/forum";

export default function AnswerCard({ answer, canAccept, onAccept }) {
  const navigate = useNavigate();
  const { openReport, showToast, requireAuth } = useForum();
  const [up, setUp] = useState(!!answer.user_has_upvoted);
  const [ups, setUps] = useState(answer.upvote_count || 0);
  const a = normAuthor(answer.author, answer.author_username);

  const doUpvote = async () => {
    if (requireAuth()) return;
    setUp((v) => !v); setUps((n) => n + (up ? -1 : 1));
    try {
      const res = await toggleCommentUpvote(answer.id);
      setUp(res.upvoted); setUps(res.upvote_count);
    } catch { setUp(up); setUps(answer.upvote_count || 0); }
  };

  return (
    <div className={`fm-answer${answer.is_accepted ? " accepted" : ""}`}>
      <div className="fm-card-head">
        <Avatar {...a} size={40} onClick={() => navigate(`/forum/u/${a.username}`)} />
        <div style={{ minWidth: 0 }}>
          <span className="fm-meta-name" onClick={() => navigate(`/forum/u/${a.username}`)}>{a.name}</span>
          <div className="fm-meta-sub">{a.credential || "Community member"} · {timeAgo(answer.created_at)}</div>
        </div>
        <div className="fm-spacer" />
        {answer.is_accepted ? (
          <span className="fm-accepted-badge"><IcCheck size={15} /> Accepted</span>
        ) : null}
      </div>

      <div className="fm-answer-body">{answer.content}</div>

      <div className="fm-card-foot">
        <span className={`fm-pill${up ? " on" : ""}`}>
          <button onClick={doUpvote} aria-label="Upvote"><IcUp size={15} fill={up ? "currentColor" : "none"} /></button>
          <span className="count">{fmtNum(ups)}</span>
        </span>
        {canAccept ? (
          <button className="fm-btn ghost sm" onClick={() => onAccept(answer.id)}>
            {answer.is_accepted ? "Unaccept" : "Accept answer"}
          </button>
        ) : null}
        <button className="fm-icon-btn fm-spacer" onClick={() => { navigator.clipboard?.writeText(window.location.href); showToast("Link copied"); }} aria-label="Share"><IcShare size={17} /></button>
        <button className="fm-icon-btn" onClick={() => openReport("answer", answer.id)} aria-label="Report"><IcFlag size={16} /></button>
      </div>
    </div>
  );
}
