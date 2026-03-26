import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiUpArrow, BiSolidUpArrow } from 'react-icons/bi';
import { toggleThreadUpvote } from '../api/forum';

const ThreadCard = ({ thread, isLoggedIn }) => {
  const d = new Date(thread.created_at);
  const date = d.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });
  const time = d
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .toLowerCase();

  const replies = thread.reply_count ?? 0;

  const [upvoted, setUpvoted] = useState(thread.user_has_upvoted ?? false);
  const [upvotes, setUpvotes] = useState(thread.upvote_count ?? 0);

  const toggleUpvote = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) return;
    try {
      const data = await toggleThreadUpvote(thread.id);
      setUpvoted(data.upvoted);
      setUpvotes(data.upvote_count);
    } catch (err) {
      console.error('Upvote failed:', err);
    }
  };

  return (
    <div className="tl-card">
      <h3 className="tl-card-title">
        <Link to={`/forum/${thread.id}`}>{thread.title}</Link>
      </h3>

      <div className="tl-card-meta">
        {thread.author_username || 'Unknown'} &ndash; {date} &ndash; {time}
      </div>

      <div className="tl-card-stats">
        <span>{replies} Replies</span>
        <span className="tl-stats-sep">–</span>

        <button
          className={`tl-upvote-btn${upvoted ? ' tl-upvoted' : ''}${!isLoggedIn ? ' tl-upvote-guest' : ''}`}
          onClick={toggleUpvote}
          disabled={!isLoggedIn}
          title={!isLoggedIn ? 'Login required to upvote' : 'Upvote'}
        >
          {isLoggedIn && (
            <span className="tl-upvote-icon">
              {upvoted ? <BiSolidUpArrow /> : <BiUpArrow />}
            </span>
          )}
          <span>{upvotes} Upvotes</span>
        </button>
      </div>
    </div>
  );
};

export default ThreadCard;