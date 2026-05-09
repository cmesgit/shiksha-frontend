import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* ================= IMPORT BLOG FILES ================= */

// Geography
import Chapter1Geography from "./blogs/class-10/geography/Chapter1.jsx";
import Chapter2Geography from "./blogs/class-10/geography/Chapter2.jsx";
import Chapter3Geography from "./blogs/class-10/geography/Chapter3.jsx";
import Chapter4Geography from "./blogs/class-10/geography/Chapter4.jsx";
import Chapter5Geography from "./blogs/class-10/geography/Chapter5.jsx";
import Chapter6Geography from "./blogs/class-10/geography/Chapter6.jsx";
import Chapter7Geography from "./blogs/class-10/geography/Chapter7.jsx";

// History
import Chapter1History from "./blogs/class-10/history/Chapter1.jsx";
import Chapter2History from "./blogs/class-10/history/Chapter2.jsx";
import Chapter3History from "./blogs/class-10/history/Chapter3.jsx";
import Chapter4History from "./blogs/class-10/history/Chapter4.jsx";
import Chapter5History from "./blogs/class-10/history/Chapter5.jsx";

// Economics
import Chapter1Economics from "./blogs/class-10/economics/Chapter1.jsx";
import Chapter2Economics from "./blogs/class-10/economics/Chapter2.jsx";
import Chapter3Economics from "./blogs/class-10/economics/Chapter3.jsx";
import Chapter4Economics from "./blogs/class-10/economics/Chapter4.jsx";
import Chapter5Economics from "./blogs/class-10/economics/Chapter5.jsx";

// Political Science
import Chapter1Political from "./blogs/class-10/political-science/Chapter1.jsx";
import Chapter2Political from "./blogs/class-10/political-science/Chapter2.jsx";
import Chapter3Political from "./blogs/class-10/political-science/Chapter3.jsx";
import Chapter4Political from "./blogs/class-10/political-science/Chapter4.jsx";
import Chapter5Political from "./blogs/class-10/political-science/Chapter5.jsx";
import Chapter6Political from "./blogs/class-10/political-science/Chapter6.jsx";
import Chapter7Political from "./blogs/class-10/political-science/Chapter7.jsx";

// Science (class 10)
import Chapter1Science from "./blogs/class-10/science/Chapter1.jsx";
import Chapter2Science from "./blogs/class-10/science/Chapter2.jsx";
import Chapter3Science from "./blogs/class-10/science/Chapter3.jsx";
import Chapter4Science from "./blogs/class-10/science/Chapter4.jsx";
import Chapter5Science from "./blogs/class-10/science/Chapter5.jsx";
import Chapter6Science from "./blogs/class-10/science/Chapter6.jsx";
import Chapter7Science from "./blogs/class-10/science/Chapter7.jsx";
import Chapter8Science from "./blogs/class-10/science/Chapter8.jsx";
import Chapter9Science from "./blogs/class-10/science/Chapter9.jsx";
import Chapter10Science from "./blogs/class-10/science/Chapter10.jsx";
import Chapter11Science from "./blogs/class-10/science/Chapter11.jsx";
import Chapter12Science from "./blogs/class-10/science/Chapter12.jsx";
import Chapter13Science from "./blogs/class-10/science/Chapter13.jsx";
import Chapter14Science from "./blogs/class-10/science/Chapter14.jsx";
import Chapter15Science from "./blogs/class-10/science/Chapter15.jsx";
import Chapter16Science from "./blogs/class-10/science/Chapter16.jsx";

// Class 9 Science
import C9Chapter1 from "./blogs/class-9/science/Chapter1.jsx";
import C9Chapter2 from "./blogs/class-9/science/Chapter2.jsx";
import C9Chapter3 from "./blogs/class-9/science/Chapter3.jsx";
import C9Chapter4 from "./blogs/class-9/science/Chapter4.jsx";
import C9Chapter5 from "./blogs/class-9/science/Chapter5.jsx";
import C9Chapter6 from "./blogs/class-9/science/Chapter6.jsx";
import C9Chapter7 from "./blogs/class-9/science/Chapter7.jsx";
import C9Chapter8 from "./blogs/class-9/science/Chapter8.jsx";
import C9Chapter9 from "./blogs/class-9/science/Chapter9.jsx";
import C9Chapter10 from "./blogs/class-9/science/Chapter10.jsx";
import C9Chapter11 from "./blogs/class-9/science/Chapter11.jsx";
import C9Chapter12 from "./blogs/class-9/science/Chapter12.jsx";
import C9Chapter13 from "./blogs/class-9/science/Chapter13.jsx";
import C9Chapter14 from "./blogs/class-9/science/Chapter14.jsx";

/* ================= MAP ================= */

const articleMap = {
  // Geography
  "class-10/geography/chapter-1": Chapter1Geography,
  "class-10/geography/chapter-2": Chapter2Geography,
  "class-10/geography/chapter-3": Chapter3Geography,
  "class-10/geography/chapter-4": Chapter4Geography,
  "class-10/geography/chapter-5": Chapter5Geography,
  "class-10/geography/chapter-6": Chapter6Geography,
  "class-10/geography/chapter-7": Chapter7Geography,

  // History
  "class-10/history/chapter-1": Chapter1History,
  "class-10/history/chapter-2": Chapter2History,
  "class-10/history/chapter-3": Chapter3History,
  "class-10/history/chapter-4": Chapter4History,
  "class-10/history/chapter-5": Chapter5History,

  // Economics
  "class-10/economics/chapter-1": Chapter1Economics,
  "class-10/economics/chapter-2": Chapter2Economics,
  "class-10/economics/chapter-3": Chapter3Economics,
  "class-10/economics/chapter-4": Chapter4Economics,
  "class-10/economics/chapter-5": Chapter5Economics,

  // Political
  "class-10/political-science/chapter-1": Chapter1Political,
  "class-10/political-science/chapter-2": Chapter2Political,
  "class-10/political-science/chapter-3": Chapter3Political,
  "class-10/political-science/chapter-4": Chapter4Political,
  "class-10/political-science/chapter-5": Chapter5Political,
  "class-10/political-science/chapter-6": Chapter6Political,
  "class-10/political-science/chapter-7": Chapter7Political,

  // Science 10
  "class-10/science/chapter-1": Chapter1Science,
  "class-10/science/chapter-2": Chapter2Science,
  "class-10/science/chapter-3": Chapter3Science,
  "class-10/science/chapter-4": Chapter4Science,
  "class-10/science/chapter-5": Chapter5Science,
  "class-10/science/chapter-6": Chapter6Science,
  "class-10/science/chapter-7": Chapter7Science,
  "class-10/science/chapter-8": Chapter8Science,
  "class-10/science/chapter-9": Chapter9Science,
  "class-10/science/chapter-10": Chapter10Science,
  "class-10/science/chapter-11": Chapter11Science,
  "class-10/science/chapter-12": Chapter12Science,
  "class-10/science/chapter-13": Chapter13Science,
  "class-10/science/chapter-14": Chapter14Science,
  "class-10/science/chapter-15": Chapter15Science,
  "class-10/science/chapter-16": Chapter16Science,

  // Class 9
  "class-9/science/chapter-1": C9Chapter1,
  "class-9/science/chapter-2": C9Chapter2,
  "class-9/science/chapter-3": C9Chapter3,
  "class-9/science/chapter-4": C9Chapter4,
  "class-9/science/chapter-5": C9Chapter5,
  "class-9/science/chapter-6": C9Chapter6,
  "class-9/science/chapter-7": C9Chapter7,
  "class-9/science/chapter-8": C9Chapter8,
  "class-9/science/chapter-9": C9Chapter9,
  "class-9/science/chapter-10": C9Chapter10,
  "class-9/science/chapter-11": C9Chapter11,
  "class-9/science/chapter-12": C9Chapter12,
  "class-9/science/chapter-13": C9Chapter13,
  "class-9/science/chapter-14": C9Chapter14,
};

/* ================= COMPONENT ================= */

const BlogDetail = () => {
  const { "*": slug } = useParams(); // ✅ IMPORTANT FIX
  const navigate = useNavigate();
  const [showTopButton, setShowTopButton] = useState(false);

  const Component = articleMap[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ position: "relative" }}>
     <button
  onClick={() => navigate("/blogs")}
  style={{
    position: "fixed",        // FIXED
    top: "185px",              // below navbar
    left: "20px",
    zIndex: 9999,             // ensure visible
    padding: "8px 12px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  ← Back
</button>

      {Component ? <Component /> : <h2>Blog not found</h2>}

      <button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  style={{
    position: "fixed",
    right: "20px",
    bottom: "20px",
    zIndex: 9999,
    padding: "10px 14px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    display: showTopButton ? "block" : "none",
  }}
>
  ⮝
</button>
    </div>
  );
};

export default BlogDetail;