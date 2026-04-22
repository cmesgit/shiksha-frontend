import React, { useEffect, useState } from "react";
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
  transition: "all 0.25s ease",
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isBackHover, setIsBackHover] = useState(false);
  const [isTopHover, setIsTopHover] = useState(false);
  const [hoveredNav, setHoveredNav] = useState("");
  const [showTopButton, setShowTopButton] = useState(false);

  const blog = blogsData.find((item) => item.id === id) || blogsData[0];

  const currentIndex = blogsData.findIndex((item) => item.id === blog.id);
  const prevBlog = currentIndex > 0 ? blogsData[currentIndex - 1] : null;
  const nextBlog =
    currentIndex < blogsData.length - 1 ? blogsData[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "30px",
          zIndex: 20,
        }}
      >
        <button
          type="button"
          onClick={() => navigate("/blogs")}
          onMouseEnter={() => setIsBackHover(true)}
          onMouseLeave={() => setIsBackHover(false)}
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            border: "1px solid #cfe8e0",
            background: isBackHover ? "#174c3d" : "#ffffff",
            color: isBackHover ? "#ffffff" : "#174c3d",
            borderRadius: "999px",
            padding: "12px 18px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: isBackHover
              ? "0 10px 24px rgba(20, 96, 79, 0.18)"
              : "0 6px 18px rgba(20, 96, 79, 0.08)",
            transform: isBackHover ? "translateY(-2px)" : "translateY(0)",
            transition: "all 0.25s ease",
          }}
        >
          ← Back
        </button>
      </div>

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
            onMouseEnter={() => setHoveredNav("prev")}
            onMouseLeave={() => setHoveredNav("")}
            style={{
              ...navCardStyle,
              appearance: "none",
              WebkitAppearance: "none",
              textAlign: "left",
              cursor: "pointer",
              font: "inherit",
              transform:
                hoveredNav === "prev" ? "translateY(-4px)" : "translateY(0)",
              boxShadow:
                hoveredNav === "prev"
                  ? "0 14px 28px rgba(20, 96, 79, 0.12)"
                  : "0 8px 24px rgba(20, 96, 79, 0.06)",
              borderColor: hoveredNav === "prev" ? "#8bd8c3" : "#dcefe9",
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
            onMouseEnter={() => setHoveredNav("next")}
            onMouseLeave={() => setHoveredNav("")}
            style={{
              ...navCardStyle,
              appearance: "none",
              WebkitAppearance: "none",
              textAlign: "left",
              cursor: "pointer",
              font: "inherit",
              transform:
                hoveredNav === "next" ? "translateY(-4px)" : "translateY(0)",
              boxShadow:
                hoveredNav === "next"
                  ? "0 14px 28px rgba(20, 96, 79, 0.12)"
                  : "0 8px 24px rgba(20, 96, 79, 0.06)",
              borderColor: hoveredNav === "next" ? "#8bd8c3" : "#dcefe9",
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

      <button
        type="button"
        onClick={handleGoTop}
        onMouseEnter={() => setIsTopHover(true)}
        onMouseLeave={() => setIsTopHover(false)}
        style={{
          position: "fixed",
          right: "20px",
          bottom: "20px",
          zIndex: 999,
          width: "52px",
          height: "52px",
          border: "none",
          borderRadius: "50%",
          background: isTopHover ? "#0f5e4b" : "#174c3d",
          color: "#ffffff",
          fontSize: "24px",
          fontWeight: "700",
          cursor: "pointer",
          boxShadow: isTopHover
            ? "0 14px 28px rgba(20, 96, 79, 0.28)"
            : "0 10px 24px rgba(20, 96, 79, 0.22)",
          transform: showTopButton
            ? isTopHover
              ? "translateY(-4px) scale(1.05)"
              : "translateY(0) scale(1)"
            : "translateY(20px) scale(0.9)",
          opacity: showTopButton ? 1 : 0,
          pointerEvents: showTopButton ? "auto" : "none",
          transition: "all 0.25s ease",
        }}
      >
        ⮝
      </button>
    </div>
  );
};

export default BlogDetail;