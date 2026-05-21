import React, { useState } from "react";
import { Link } from "react-router-dom";
import blogsData from "../data/blogsData";
import "../css/Blogs.css";

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = searchQuery.trim()
    ? blogsData.filter((blog) => {
        const q = searchQuery.trim().toLowerCase();
        return (
          blog.title?.toLowerCase().includes(q) ||
          blog.category?.toLowerCase().includes(q) ||
          blog.classLevel?.toString().includes(q) ||
          blog.slug?.toLowerCase().includes(q)
        );
      })
    : blogsData;

  return (
    <div className="blogs-list-page">
      <div className="blogs-list-header">
        <span className="blogs-list-badge">General Studies</span>
        <h1>Our Blogs</h1>
        <p>Explore Geography and Polity blogs with interactive quizzes.</p>

        <div className="blogs-search-box">
          <svg className="blogs-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="blogs-search-input"
            placeholder="Search by title, category or class…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="blogs-search-clear" onClick={() => setSearchQuery("")} aria-label="Clear">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {searchQuery.trim() && (
          <p className="blogs-search-count">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{searchQuery.trim()}&rdquo;
          </p>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="blogs-grid">
          {filtered.map((blog) => (
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
                {blog.subtitle && <p>{blog.subtitle}</p>}

                {blog.tags?.length > 0 && (
                  <div className="blog-list-tags">
                    {blog.tags.slice(0, 4).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                )}

                <div className="blog-list-read">Read Blog →</div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="blogs-empty">No blogs found for &ldquo;{searchQuery.trim()}&rdquo;</p>
      )}
    </div>
  );
};

export default Blogs;
