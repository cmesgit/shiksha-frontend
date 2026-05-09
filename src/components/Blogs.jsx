import React from "react";
import { Link } from "react-router-dom";
import blogsData from "../data/blogsData";
import "../css/Blogs.css";

const Blogs = () => {
  return (
    <div className="blogs-list-page">
      <div className="blogs-list-header">
        <span className="blogs-list-badge">General Studies</span>
        <h1>Our Blogs</h1>
        <p>Explore Geography and Polity blogs with interactive quizzes.</p>
      </div>

      <div className="blogs-grid">
        {blogsData.map((blog) => (
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
              <span className="blog-list-category">
                {blog.category}
              </span>
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
        ))}
      </div>
    </div>
  );
};

export default Blogs;