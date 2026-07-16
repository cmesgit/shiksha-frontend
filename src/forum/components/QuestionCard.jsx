import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { IcUp, IcMessage, IcBookmark, IcShare, IcMore } from "./icons";
import { useForum } from "../ForumContext";
import { normAuthor, timeAgo, fmtNum } from "../utils";
import { toggleThreadUpvote } from "../../api/forum";

export default function QuestionCard({ q, onDeleted }) {
  const navigate = useNavigate();
  const { isSaved, toggleSave, showToast, openReport, requireAuth } = useForum();
  const [up, setUp] = useState(!!q.user_has_upvoted);
  const [ups, setUps] = useState(q.upvote_count || 0);
  const [menu, setMenu] = useState(false);

  const asker = normAuthor(q.author, q.author_username);
  const saved = isSaved(q.id);
  const answers = q.answer_count != null ? q.answer_count : (q.reply_count || 0);
  const open = () => navigate(`/forum/thread/${q.id}`);

  const doUpvote = async () => {
    if (requireAuth()) return;
    // optimistic
    setUp((v) => !v);
    setUps((n) => n + (up ? -1 : 1));
    try {
      const res = await toggleThreadUpvote(q.id);
      setUp(res.upvoted); setUps(res.upvote_count);
    } catch { setUp(up); setUps(q.upvote_count || 0); }
  };

  const share = () => {
    try { navigator.clipboard?.writeText(`${window.location.origin}/forum/thread/${q.id}`); } catch { /* ignore */ }
    showToast("Link copied to clipboard");
  };

  return (
    <article className="fm-card">
      <div className="fm-card-head">
        <Avatar {...asker} size={38} onClick={() => navigate(`/forum/u/${asker.username}`)} />
        <div style={{ minWidth: 0 }}>
          <span className="fm-meta-name" onClick={() => navigate(`/forum/u/${asker.username}`)}>{asker.name}</span>
          <div className="fm-meta-sub">
            {q.kind === "post" ? "posted" : "asked"} · {timeAgo(q.created_at)}
            {q.space ? <> · in <span style={{ color: "var(--fm-green)" }}>{q.space.name}</span></> : null}
          </div>
        </div>
        <div className="fm-spacer" />
        {q.kind === "post" ? <span className="fm-kind">Post</span> : null}
        {q.is_solved ? <span className="fm-solved">Solved</span> : null}
        <div className="fm-menu-wrap">
          <button className="fm-icon-btn" onClick={() => setMenu((v) => !v)} aria-label="More"><IcMore size={18} /></button>
          {menu ? (
            <div className="fm-menu" onMouseLeave={() => setMenu(false)}>
              <button onClick={() => { setMenu(false); toggleSave(q.id); }}>{saved ? "Remove from saved" : "Save"}</button>
              <button onClick={() => { setMenu(false); openReport("question", q.id); }}>Report</button>
              {onDeleted ? <button className="danger" onClick={() => { setMenu(false); onDeleted(q.id); }}>Delete</button> : null}
            </div>
          ) : null}
        </div>
      </div>

      {q.tags?.length ? (
        <div className="fm-card-tags">
          {q.tags.slice(0, 4).map((t) => (
            <span key={t} className="fm-tag" onClick={() => navigate(`/forum?topic=${encodeURIComponent(t)}`)}>{t}</span>
          ))}
        </div>
      ) : null}

      <h3 className="fm-card-title" onClick={open}>{q.title}</h3>

      {q.body ? (
        <div className="fm-ans-preview"><div className="fm-ans-body">{q.body}</div></div>
      ) : null}

      <div className="fm-card-foot">
        <span className={`fm-pill${up ? " on" : ""}`}>
          <button onClick={doUpvote} aria-label="Upvote"><IcUp size={15} fill={up ? "currentColor" : "none"} /></button>
          <span className="count">{fmtNum(ups)}</span>
        </span>
        <button className="fm-pill" onClick={open} style={{ padding: 0 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px" }}>
            <IcMessage size={15} /> <span className="count" style={{ padding: 0 }}>{fmtNum(answers)}</span>
          </span>
        </button>
        <button className={`fm-icon-btn fm-spacer${saved ? " saved" : ""}`} onClick={() => toggleSave(q.id)} aria-label="Save">
          <IcBookmark size={18} fill={saved ? "currentColor" : "none"} />
        </button>
        <button className="fm-icon-btn" onClick={share} aria-label="Share"><IcShare size={17} /></button>
      </div>
    </article>
  );
}
