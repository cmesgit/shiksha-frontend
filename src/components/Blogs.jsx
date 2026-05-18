import React, { useState } from "react";
import { Link } from "react-router-dom";
import blogsData from "../data/blogsData";
import "../css/Blogs.css";

const Blogs = () => {
  const [query, setQuery] = useState("");

  const filtered = blogsData.filter((blog) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      blog.title?.toLowerCase().includes(q) ||
      blog.category?.toLowerCase().includes(q) ||
      blog.classLevel?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="blogs-list-page">
      <div className="blogs-list-header">
        <span className="blogs-list-badge">General Studies</span>
        <h1>Our Blogs</h1>
        <div className="blogs-header-bottom">
          <p>Explore Geography and Polity blogs with interactive quizzes.</p>
          <div className="blogs-search-bar">
            <svg className="blogs-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search blogs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button className="blogs-search-clear" onClick={() => setQuery("")} aria-label="Clear">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {query.trim() && (
        <p className="blogs-search-count">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{query.trim()}&rdquo;
        </p>
      )}

      <div className="blogs-grid">
        {filtered.length > 0 ? (
          filtered.map((blog) => (
            <Link
              key={blog.id}
              to={blog.slug ? `/blogs/${blog.slug}` : "#"}
              className="blog-list-card"
            >
              <div className="blog-list-image-wrap">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="blog-list-image"
                />
                <span className="blog-list-category">{blog.category}</span>
              </div>

              <div className="blog-list-content">
                <h2>{blog.title}</h2>
                <p>{blog.subtitle}</p>

                <div className="blog-list-tags">
                  {blog.tags?.slice(0, 4).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="blog-list-read">Read Blog →</div>
              </div>
            </Link>
          ))
        ) : (
          <p className="blogs-no-results">No blogs found for &ldquo;{query.trim()}&rdquo;</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;