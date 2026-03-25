import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createThread } from '../api/forum';
import '../css/forum.css';

const CreateThreadPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!title.trim()) return;
    try {
      setLoading(true);
      await createThread({ title, body, tags: [] });
      navigate('/forum');
    } catch (err) {
      console.error('Failed to create thread:', err);
      alert('Failed to create thread. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ct-page-bg">
      <div className="ct-container">
        <h2 className="ct-heading">Create Threads</h2>

        <input
          className="ct-title-input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          className="ct-body-input"
          placeholder="Body Text"
          value={body}
          onChange={e => setBody(e.target.value)}
        />

        <div className="ct-footer">
          <button className="ct-post-btn" onClick={handlePost} disabled={loading}>
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateThreadPage;
