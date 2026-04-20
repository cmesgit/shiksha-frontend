import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import blogsData from "../data/blogsData";

import Chapter1ResourcesAndDevelopment from "./Chapter 1 Resources and Development.jsx";
import Chapter2ForestAndWildlifeResources from "./Chapter 2 Forest and Wildlife Resources.jsx";
import Chapter3WaterResources from "./Chapter 3 Water Resources.jsx";
import Chapter4Agriculture from "./Chapter 4 Agriculture.jsx";
import Chapter5MineralsAndEnergyResources from "./Chapter 5 Minerals and Energy Resources.jsx";
import Chapter6ManufacturingIndustries from "./Chapter 6 Manufacturing Industries.jsx";
import Chapter7LifelinesOfNationalEconomy from "./Chapter 7 Lifelines of National Economy.jsx";

function renderArticle(blog) {
  if (blog.type === "chapter-1") return <Chapter1ResourcesAndDevelopment />;
  if (blog.type === "chapter-2") return <Chapter2ForestAndWildlifeResources />;
  if (blog.type === "chapter-3") return <Chapter3WaterResources />;
  if (blog.type === "chapter-4") return <Chapter4Agriculture />;
  if (blog.type === "chapter-5") return <Chapter5MineralsAndEnergyResources />;
  if (blog.type === "chapter-6") return <Chapter6ManufacturingIndustries />;
  if (blog.type === "chapter-7") return <Chapter7LifelinesOfNationalEconomy />;

  return (
    <div style={{ padding: "40px 20px", textAlign: "center" }}>
      <h2>Blog not found</h2>
    </div>
  );
}

const navCardStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "8px",
  textDecoration: "none",
  background: "#ffffff",
  border: "1px solid #dcefe9",
  borderRadius: "20px",
  padding: "20px",
  color: "#174c3d",
  boxShadow: "0 8px 24px rgba(20, 96, 79, 0.06)",
  minHeight: "120px",
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogsData.find((item) => item.id === id) || blogsData[0];

  const currentIndex = blogsData.findIndex((item) => item.id === blog.id);
  const prevBlog = currentIndex > 0 ? blogsData[currentIndex - 1] : null;
  const nextBlog =
    currentIndex < blogsData.length - 1 ? blogsData[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  return (
    <div>
      {renderArticle(blog)}

      <div
        style={{
          maxWidth: "900px",
          margin: "-25px auto 60px",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(280px, 1fr))",
          gap: "18px",
          alignItems: "stretch",
        }}
      >
        {prevBlog ? (
          <button
            type="button"
            onClick={() => navigate(`/blogs/${prevBlog.id}`)}
            style={{
              ...navCardStyle,
              appearance: "none",
              WebkitAppearance: "none",
              textAlign: "left",
              cursor: "pointer",
              font: "inherit",
            }}
          >
            <span style={{ fontSize: "13px", color: "#33a786" }}>
              ← Previous Article
            </span>
            <strong style={{ fontSize: "16px", lineHeight: "1.5" }}>
              {prevBlog.title}
            </strong>
          </button>
        ) : (
          <div />
        )}

        {nextBlog ? (
          <button
            type="button"
            onClick={() => navigate(`/blogs/${nextBlog.id}`)}
            style={{
              ...navCardStyle,
              appearance: "none",
              WebkitAppearance: "none",
              textAlign: "left",
              cursor: "pointer",
              font: "inherit",
            }}
          >
            <span style={{ fontSize: "13px", color: "#33a786" }}>
              Next Article →
            </span>
            <strong style={{ fontSize: "16px", lineHeight: "1.5" }}>
              {nextBlog.title}
            </strong>
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default BlogDetail;