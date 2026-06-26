import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  FileText,
  GraduationCap,
  Image,
  Search,
  Sparkles,
  Upload,
  Users,
  X
} from "lucide-react";

import "./ResearchHub.css";
import AIAssistant from "./exploreComponent/AIAssistant";
import CitationGenerator from "./exploreComponent/CitationGenerator";
import FeaturedPapers from "./exploreComponent/FeaturedPapers";
import LatestResearch from "./exploreComponent/LatestResearch";
import PublishResearch from "./exploreComponent/PublishResearch";
import ResearchCollections from "./exploreComponent/ResearchCollections";
import Resources from "./exploreComponent/Resources";
import TopResearchers from "./exploreComponent/TopResearchers";
import WhyPublish from "./exploreComponent/WhyPublish";
import Workflow from "./exploreComponent/Workflow";
import { categories, featuredPapers, journals, latestResearch, stats } from "./data";

const allCategories = ["All", ...categories];

const inferResearchArea = (title) => {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes("health")) return "Healthcare";
  if (normalizedTitle.includes("agriculture") || normalizedTitle.includes("robotics")) return "Agriculture";
  if (normalizedTitle.includes("energy")) return "Electrical Engineering";
  if (normalizedTitle.includes("quantum") || normalizedTitle.includes("cloud")) return "Computer Science";

  return "Research";
};

const latestResearchAsPapers = latestResearch.map((item, index) => ({
  id: `latest-${index}`,
  title: item.title,
  author: "Shiksha Research Desk",
  department: inferResearchArea(item.title),
  year: new Date().getFullYear(),
  type: "Latest Publication",
  downloads: "New",
  citations: 0,
  tags: item.title.split(" ").filter((word) => word.length > 3).slice(0, 3),
  abstract: `A recent publication on ${item.title.toLowerCase()}, added ${item.date}.`
}));

const searchablePapers = [...featuredPapers, ...latestResearchAsPapers];

const normalizeText = (value) =>
  value
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const getSearchText = (paper) =>
  [
    paper.title,
    paper.author,
    paper.department,
    paper.type,
    paper.abstract,
    ...(paper.tags || [])
  ]
    .join(" ")
    .toLowerCase();

const getSearchTerms = (query) => {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) return [];

  return normalizedQuery
    .split(" ")
    .flatMap((term) => {
      if (term === "ai") return ["ai", "artificial", "intelligence"];
      if (term === "ml") return ["ml", "machine", "learning"];
      if (term === "cs") return ["cs", "computer", "science"];
      return [term];
    })
    .filter(Boolean);
};

const matchesSearchQuery = (paper, query) => {
  const terms = getSearchTerms(query);
  const searchableText = normalizeText(getSearchText(paper));

  return !terms.length || terms.some((term) => searchableText.includes(term));
};

const createPaperDownload = (paper) => {
  const content = [
    paper.title,
    `Author: ${paper.author}`,
    `Department: ${paper.department}`,
    `Year: ${paper.year}`,
    "",
    paper.abstract,
    "",
    `Keywords: ${paper.tags.join(", ")}`
  ].join("\n");

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${paper.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.txt`;
  link.click();
  URL.revokeObjectURL(url);
};

export default function ResearchHub() {
  const navigate = useNavigate();
  const publishRef = useRef(null);
  const papersRef = useRef(null);
  const citationRef = useRef(null);
  const noticeTimerRef = useRef(null);

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [savedPapers, setSavedPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [notice, setNotice] = useState("");

  const filteredPapers = useMemo(() => {
    return searchablePapers.filter((paper) => {
      const matchesQuery = matchesSearchQuery(paper, query);
      const matchesCategory =
        selectedCategory === "All" ||
        paper.department.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        paper.tags.some((tag) => tag.toLowerCase().includes(selectedCategory.toLowerCase()));

      return matchesQuery && matchesCategory;
    });
  }, [query, selectedCategory]);

  const showNotice = (message) => {
    setNotice(message);
    window.clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = window.setTimeout(() => setNotice(""), 2600);
  };

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleFiles = (files) => {
    const nextFiles = Array.from(files || []).map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      name: file.webkitRelativePath || file.name,
      size: file.size,
      type: file.type || "Folder item"
    }));

    setUploadedFiles((current) => {
      const known = new Set(current.map((file) => file.id));
      return [...current, ...nextFiles.filter((file) => !known.has(file.id))];
    });

    if (nextFiles.length) {
      showNotice(`${nextFiles.length} file${nextFiles.length > 1 ? "s" : ""} ready for submission.`);
    }
  };

  const handlePaperSave = (paper) => {
    setSavedPapers((current) =>
      current.includes(paper.id)
        ? current.filter((id) => id !== paper.id)
        : [...current, paper.id]
    );
    showNotice(`${paper.title} ${savedPapers.includes(paper.id) ? "removed from" : "added to"} saved papers.`);
  };

  const handleSubmitResearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title")?.toString().trim();
    const author = formData.get("author")?.toString().trim();

    if (!title || !author) {
      showNotice("Please add a title and author before submitting.");
      return;
    }

    setSubmissions((current) => [
      {
        id: Date.now(),
        title,
        author,
        category: formData.get("category"),
        files: uploadedFiles.length,
        status: "Draft saved locally"
      },
      ...current
    ]);

    event.currentTarget.reset();
    setUploadedFiles([]);
    showNotice("Research submission saved locally for review.");
  };

  const handleCollectionBrowse = (category) => {
    setSelectedCategory(category);
    scrollTo(papersRef);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/explore");
  };

  return (
    <div className="research-page">
      {notice && (
        <div className="research-toast" role="status">
          <CheckCircle size={18} />
          {notice}
        </div>
      )}

      <button className="rh-back-button" type="button" onClick={handleBack}>
        <ArrowLeft size={18} />
        Back
      </button>

      <section className="rh-hero">
        <div className="rh-hero-copy">
          <span className="rh-tag">
            <Sparkles size={16} />
            ShikshaCom Research Hub
          </span>
          <h1>Publish, discover and improve academic research.</h1>
          <p>
            A research workspace for browsing papers, saving references,
            preparing citations and collecting submission files before review.
          </p>

          <div className="rh-actions">
            <button className="rh-btn rh-btn-primary" onClick={() => scrollTo(papersRef)}>
              <BookOpen size={18} />
              Browse Papers
            </button>
            <button className="rh-btn rh-btn-outline" onClick={() => scrollTo(publishRef)}>
              <Upload size={18} />
              Publish Paper
            </button>
          </div>
        </div>

        <div className="rh-hero-panel">
          <div className="rh-panel-header">
            <div>
              <span>Today</span>
              <h3>Research Desk</h3>
            </div>
            <Users size={24} />
          </div>

          {latestResearch.slice(0, 3).map((item) => (
            <button
              className="rh-live-paper"
              key={item.title}
              onClick={() => {
                setQuery(item.title);
                scrollTo(papersRef);
              }}
            >
              <FileText size={18} />
              <span>
                <strong>{item.title}</strong>
                <small>Published {item.date}</small>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="rh-search-section" ref={papersRef}>
        <div className="rh-search-box">
          <Search size={20} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search research papers, authors, keywords..."
          />
          {query && (
            <button className="rh-icon-btn" type="button" onClick={() => setQuery("")} aria-label="Clear search">
              <X size={18} />
            </button>
          )}
          <button className="rh-search-btn" type="button" onClick={() => scrollTo(papersRef)}>
            Search
          </button>
        </div>

        <div className="rh-filter-row" aria-label="Research categories">
          {allCategories.map((category) => (
            <button
              key={category}
              className={category === selectedCategory ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <FeaturedPapers
        papers={filteredPapers}
        savedPapers={savedPapers}
        onDownload={createPaperDownload}
        onRead={setSelectedPaper}
        onSave={handlePaperSave}
        onViewAll={() => {
          setQuery("");
          setSelectedCategory("All");
        }}
      />

      <section className="rh-stats">
        {stats.map((item) => (
          <div className="rh-stat-card" key={item.title}>
            <h2>{item.number}</h2>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </section>

      <section className="rh-journals">
        <div className="section-title">
          <h2>Featured Collections</h2>
          <p>Browse research collections published on Shiksha.</p>
        </div>
        <div className="journal-grid">
          {journals.map((journal) => (
            <button className="journal-card" key={journal.title} onClick={() => handleCollectionBrowse(journal.category)}>
              <GraduationCap size={26} />
              <h3>{journal.title}</h3>
              <p>{journal.papers} Papers</p>
              <span>
                Explore <ArrowRight size={16} />
              </span>
            </button>
          ))}
        </div>
      </section>

      <LatestResearch
        items={latestResearch}
        onOpen={(item) => {
          setQuery(item.title);
          scrollTo(papersRef);
        }}
      />

      <div ref={publishRef}>
        <PublishResearch
          categories={categories}
          uploadedFiles={uploadedFiles}
          submissions={submissions}
          onFilesSelected={handleFiles}
          onSubmit={handleSubmitResearch}
        />
      </div>

      <AIAssistant onOpenCitation={() => scrollTo(citationRef)} />

      <div ref={citationRef}>
        <CitationGenerator onNotice={showNotice} />
      </div>

      <Resources onNotice={showNotice} />
      <ResearchCollections onBrowse={handleCollectionBrowse} />
      <TopResearchers onNotice={showNotice} />
      <Workflow />
      <WhyPublish />

      {selectedPaper && (
        <div className="rh-modal-backdrop" onClick={() => setSelectedPaper(null)}>
          <article className="rh-modal" onClick={(event) => event.stopPropagation()}>
            <button className="rh-modal-close" onClick={() => setSelectedPaper(null)} aria-label="Close paper preview">
              <X size={18} />
            </button>
            <span className="paper-type">{selectedPaper.type}</span>
            <h2>{selectedPaper.title}</h2>
            <p className="paper-author">{selectedPaper.author}</p>
            <p className="paper-department">{selectedPaper.department}</p>
            <p>{selectedPaper.abstract}</p>
            <div className="paper-tags">
              {selectedPaper.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <button className="rh-btn rh-btn-primary" onClick={() => createPaperDownload(selectedPaper)}>
              <Image size={18} />
              Download Preview
            </button>
          </article>
        </div>
      )}
    </div>
  );
}
