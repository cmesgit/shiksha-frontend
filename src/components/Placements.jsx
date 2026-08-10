import React from "react";
import "tailwindcss";
import "../css/Placements.css";
// import { Card, CardContent } from "../ui/card";
// import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Award, ChevronRight } from "lucide-react";

// Advanced Placement Section Component (fixed syntax / added filtering)
//
// NOTE: the programme list below is still hardcoded — there is no placements
// API yet. Until there is, the page says so up front rather than presenting
// nine tracks as if they were enrollable, and its buttons route into the real
// course catalog instead of doing nothing at all.
//
// Renamed from `placements` (lowercase): a lowercase function is not a valid
// React component name, which broke the react-hooks lint rules for this file
// and made it show up as an anonymous node in DevTools — while it does in fact
// call useState twice below.
export default function Placements() {
  const categories = [
    "Engineering",
    "Medical",
    "Law",
    "Defence",
    "Commerce",
    "Design",
    "Management",
    "Hospitality",
  ];

  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("");

  const placements = [
    {
      title: "IIT JEE (Engineering)",
      description:
        "Advanced preparation program covering Physics, Chemistry, and Mathematics with mock tests and performance analytics.",
      level: "Advanced",
      category: "Engineering",
    },
    {
      title: "NEET (Medical)",
      description:
        "Full‑length NEET preparation including Biology, Physics, and Chemistry with concept mastery modules.",
      level: "Advanced",
      category: "Medical",
    },
    {
      title: "CUET UG (Central Universities)",
      description: "Comprehensive CUET Domain + Language + General Test training with practice papers.",
      level: "Intermediate",
      category: "Management",
    },
    {
      title: "NDA (National Defence Academy)",
      description:
        "Structured NDA coaching including Mathematics, GAT, SSB fundamentals, and fitness guidance.",
      level: "Advanced",
      category: "Defence",
    },
    {
      title: "CLAT (Law Entrance)",
      description: "Logical reasoning, legal aptitude, English, and current affairs with full mock series.",
      level: "Intermediate",
      category: "Law",
    },
    {
      title: "CA Foundation",
      description: "Commerce stream‑oriented program covering Accounts, Law, Mathematics, and Economics.",
      level: "Advanced",
      category: "Commerce",
    },
    {
      title: "NIFT / NID (Design Entrance)",
      description:
        "Creative aptitude, design fundamentals, sketching, and studio‑based project guidance.",
      level: "Creative",
      category: "Design",
    },
    {
      title: "Hotel Management (NCHMCT)",
      description:
        "Preparation for hotel management entrance focusing on English, reasoning, GK, and aptitude.",
      level: "Intermediate",
      category: "Hospitality",
    },
    {
      title: "BBA / IPMAT / Management Entrance",
      description:
        "Math, reasoning, verbal ability, and interview guidance for top management institutes.",
      level: "Intermediate",
      category: "Management",
    },
  ];

  // compute filtered list
  const filteredPlacements = placements.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? p.category === filter : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full px-6 py-16 bg-gradient-to-r from-orange-300 to-green-200">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-10"
      >
        Advanced Placement Programs
      </motion.h2>

      {/*
        These nine programmes are a hardcoded preview, not live inventory —
        none of them can be enrolled in yet. Saying so here is the difference
        between "launching soon" and a page that looks broken when every card
        leads nowhere.
      */}
      <p className="text-center text-sm text-gray-700 mb-10 max-w-2xl mx-auto">
        <strong>Launching soon.</strong> These programmes are a preview of what&rsquo;s coming
        and aren&rsquo;t open for enrolment yet. Browse our{" "}
        <button
          type="button"
          className="underline font-semibold"
          onClick={() => navigate("/courses")}
        >
          available courses
        </button>{" "}
        in the meantime.
      </p>

      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-xl shadow-sm"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded-xl shadow-sm"
        >
          <option value="">All Categories</option>
          {categories.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredPlacements.length === 0 ? (
          <div className="col-span-1 md:col-span-3 text-center text-gray-700">No matching programs found.</div>
        ) : (
          filteredPlacements.map((p, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <div className="card">
                <div className="card-components">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-8 h-8 text-green-600" />
                    <div>
                      <h3 className="text-xl font-semibold">{p.title}</h3>
                      <div className="text-xs text-gray-500">{p.category}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{p.description}</p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">{p.level}</span>
                    {/* Was a dead button (no onClick). Carries the programme
                        name into the catalog's search so the click at least
                        lands on something related. */}
                    <button
                      className="explore"
                      onClick={() => navigate("/courses", { state: { searchQuery: p.title } })}
                    >
                      Explore
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="text-center mt-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          {/* Was a dead button (no onClick). */}
          <button className="button-green" onClick={() => navigate("/courses")}>
            <BookOpen className="w-6 h-6" />
            View All Placement Tracks
          </button>
        </motion.div>
      </div>
    </div>
  );
}
