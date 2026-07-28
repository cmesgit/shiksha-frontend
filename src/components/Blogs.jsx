import React, { useEffect, useState } from "react";
import { getAllBlogCards } from "../api/contentApi";
import BlogCard from "./BlogCard";
import "./BlogCard.css";
import "../css/Blogs.css";

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    let alive = true;
    getAllBlogCards().then((cards) => {
      if (alive) setAllBlogs(cards);
    });
    return () => {
      alive = false;
    };
  }, []);

  const filtered = searchQuery.trim()
    ? allBlogs.filter((blog) => {
        const q = searchQuery.trim().toLowerCase();
        return (
          blog.title?.toLowerCase().includes(q) ||
          blog.category?.toLowerCase().includes(q) ||
          blog.classLevel?.toString().includes(q) ||
          blog.slug?.toLowerCase().includes(q)
        );
      })
    : allBlogs;

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
        <div className="blg-grid">
          {filtered.map((blog) => (
            <BlogCard key={blog.id} post={blog} to={blog.slug ? `/blogs/${blog.slug}` : "#"} />
          ))}
        </div>
      ) : (
        <p className="blogs-empty">No blogs found for &ldquo;{searchQuery.trim()}&rdquo;</p>
      )}
    </div>
  );
};

export default Blogs;
