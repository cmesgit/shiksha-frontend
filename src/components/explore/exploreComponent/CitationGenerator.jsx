import { useState } from "react";
import { BookOpen, Copy } from "lucide-react";

const styles = ["APA", "IEEE", "MLA", "Chicago"];

const generateCitation = (style, source) => {
  const value = source.trim() || "Untitled Research Paper";
  const year = new Date().getFullYear();

  if (style === "IEEE") return `[1] ${value}, ShikshaCom Research Hub, ${year}.`;
  if (style === "MLA") return `"${value}." ShikshaCom Research Hub, ${year}.`;
  if (style === "Chicago") return `${value}. ShikshaCom Research Hub. Accessed ${year}.`;
  return `${value}. (${year}). ShikshaCom Research Hub.`;
};

export default function CitationGenerator({ onNotice }) {
  const [style, setStyle] = useState("APA");
  const [source, setSource] = useState("");
  const [citation, setCitation] = useState("");

  const handleGenerate = () => {
    setCitation(generateCitation(style, source));
  };

  const handleCopy = async () => {
    if (!citation) {
      onNotice("Generate a citation before copying.");
      return;
    }

    try {
      await navigator.clipboard.writeText(citation);
      onNotice("Citation copied to clipboard.");
    } catch {
      onNotice("Copy is unavailable in this browser. Select the citation text manually.");
    }
  };

  return (
    <section className="citation-section">
      <div className="section-title">
        <h2>Citation Generator</h2>
        <p>Generate citations instantly from a DOI, URL or paper title.</p>
      </div>

      <div className="citation-card">
        <div className="citation-types">
          {styles.map((item) => (
            <button
              key={item}
              className={item === style ? "active" : ""}
              type="button"
              onClick={() => setStyle(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <textarea
          rows="6"
          value={source}
          onChange={(event) => setSource(event.target.value)}
          placeholder="Paste DOI, URL or Paper Title..."
        />

        {citation && <div className="citation-output">{citation}</div>}

        <div className="citation-buttons">
          <button type="button" onClick={handleGenerate}>
            <BookOpen size={18} />
            Generate Citation
          </button>
          <button type="button" onClick={handleCopy}>
            <Copy size={18} />
            Copy
          </button>
        </div>
      </div>
    </section>
  );
}
