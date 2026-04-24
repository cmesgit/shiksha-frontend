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

import HistoryChapter1 from "./blogs/History/Chapter 1 The Rise of Nationalism in Europe.jsx";
import HistoryChapter2 from "./blogs/History/Chapter 2 Nationalism in India.jsx";
import HistoryChapter3 from "./blogs/History/Chapter 3 The Making of a Global World.jsx";
import HistoryChapter4 from "./blogs/History/Chapter 4 The Age of Industrialisation.jsx";
import HistoryChapter5 from "./blogs/History/Chapter 5 Print Culture and the Modern World.jsx";

import EconomicsChapter1 from "./blogs/Economics/Chapter 1 Development .jsx";
import EconomicsChapter2 from "./blogs/Economics/Chapter 2 Sectors of the Indian Economy.jsx";
import EconomicsChapter3 from "./blogs/Economics/Chapter 3 Money and Credit.jsx";
import EconomicsChapter4 from "./blogs/Economics/Chapter 4 Globalisation and the Indian Economy.jsx";
import EconomicsChapter5 from "./blogs/Economics/Chapter 5 Consumer Rights.jsx";

import PoliticalChapter1 from "./blogs/Political Science/Chapter 1 Power Sharing.jsx";
import PoliticalChapter2 from "./blogs/Political Science/Chapter 2 Federalism.jsx";
import PoliticalChapter3 from "./blogs/Political Science/Chapter 3 Gender, Religion and Caste.jsx";
import PoliticalChapter4 from "./blogs/Political Science/Chapter 4 Popular Struggles And Movements.jsx";
import PoliticalChapter5 from "./blogs/Political Science/Chapter 5 Political Parties.jsx";
import PoliticalChapter6 from "./blogs/Political Science/Chapter 6 Outcomes of Democracy.jsx";
import PoliticalChapter7 from "./blogs/Political Science/Chapter 7 Challenges To Democracy.jsx";

import ScienceChapter1 from "./blogs/Science/Chapter 1 Chemical Reactions and Equations.jsx";
import ScienceChapter2 from "./blogs/Science/Chapter 2 Acids, Bases and Salts.jsx";
import ScienceChapter3 from "./blogs/Science/Chapter 3 Metals and Non-Metals.jsx";
import ScienceChapter4 from "./blogs/Science/Chapter 4 Carbon and Its Compounds.jsx";
import ScienceChapter5 from "./blogs/Science/Chapter 5 Periodic Classification of Elements.jsx";
import ScienceChapter6 from "./blogs/Science/Chapter 6 Life Processes.jsx";
import ScienceChapter7 from "./blogs/Science/Chapter 7 Control and Coordination.jsx";
import ScienceChapter8 from "./blogs/Science/Chapter 8  How do Organisms Reproduce.jsx";
import ScienceChapter9 from "./blogs/Science/Chapter 9 Heredity and Evolution.jsx";
import ScienceChapter10 from "./blogs/Science/Chapter 10 Light – Reflection and Refraction.jsx";
import ScienceChapter11 from "./blogs/Science/Chapter 11 The Human Eye and the Colourful World.jsx";
import ScienceChapter12 from "./blogs/Science/Chapter 12 Electricity.jsx";
import ScienceChapter13 from "./blogs/Science/Chapter 13 Magnetic Effects.jsx";
import ScienceChapter14 from "./blogs/Science/Chapter 14 Sources of Energy.jsx";
import ScienceChapter15 from "./blogs/Science/Chapter 15 Our Environment.jsx";
import ScienceChapter16 from "./blogs/Science/Chapter 16 Management of Natural Resources.jsx";

function renderArticle(blog) {
  if (blog.type === "chapter-1") return <Chapter1ResourcesAndDevelopment />;
  if (blog.type === "chapter-2") return <Chapter2ForestAndWildlifeResources />;
  if (blog.type === "chapter-3") return <Chapter3WaterResources />;
  if (blog.type === "chapter-4") return <Chapter4Agriculture />;
  if (blog.type === "chapter-5") return <Chapter5MineralsAndEnergyResources />;
  if (blog.type === "chapter-6") return <Chapter6ManufacturingIndustries />;
  if (blog.type === "chapter-7") return <Chapter7LifelinesOfNationalEconomy />;

  if (blog.type === "history-chapter-1") return <HistoryChapter1 />;
  if (blog.type === "history-chapter-2") return <HistoryChapter2 />;
  if (blog.type === "history-chapter-3") return <HistoryChapter3 />;
  if (blog.type === "history-chapter-4") return <HistoryChapter4 />;
  if (blog.type === "history-chapter-5") return <HistoryChapter5 />;

  if (blog.type === "economics-chapter-1") return <EconomicsChapter1 />;
  if (blog.type === "economics-chapter-2") return <EconomicsChapter2 />;
  if (blog.type === "economics-chapter-3") return <EconomicsChapter3 />;
  if (blog.type === "economics-chapter-4") return <EconomicsChapter4 />;
  if (blog.type === "economics-chapter-5") return <EconomicsChapter5 />;

  if (blog.type === "political-science-chapter-1") return <PoliticalChapter1 />;
  if (blog.type === "political-science-chapter-2") return <PoliticalChapter2 />;
  if (blog.type === "political-science-chapter-3") return <PoliticalChapter3 />;
  if (blog.type === "political-science-chapter-4") return <PoliticalChapter4 />;
  if (blog.type === "political-science-chapter-5") return <PoliticalChapter5 />;
  if (blog.type === "political-science-chapter-6") return <PoliticalChapter6 />;
  if (blog.type === "political-science-chapter-7") return <PoliticalChapter7 />;

  if (blog.type === "science-chapter-1") return <ScienceChapter1 />;
  if (blog.type === "science-chapter-2") return <ScienceChapter2 />;
  if (blog.type === "science-chapter-3") return <ScienceChapter3 />;
  if (blog.type === "science-chapter-4") return <ScienceChapter4 />;
  if (blog.type === "science-chapter-5") return <ScienceChapter5 />;
  if (blog.type === "science-chapter-6") return <ScienceChapter6 />;
  if (blog.type === "science-chapter-7") return <ScienceChapter7 />;
  if (blog.type === "science-chapter-8") return <ScienceChapter8 />;
  if (blog.type === "science-chapter-9") return <ScienceChapter9 />;
  if (blog.type === "science-chapter-10") return <ScienceChapter10 />;
  if (blog.type === "science-chapter-11") return <ScienceChapter11 />;
  if (blog.type === "science-chapter-12") return <ScienceChapter12 />;
  if (blog.type === "science-chapter-13") return <ScienceChapter13 />;
  if (blog.type === "science-chapter-14") return <ScienceChapter14 />;
  if (blog.type === "science-chapter-15") return <ScienceChapter15 />;
  if (blog.type === "science-chapter-16") return <ScienceChapter16 />;

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