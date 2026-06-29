import { useState } from "react";
import { ArrowRight, Bot, Sparkles } from "lucide-react";

const features = [
  "Summarize Paper",
  "Generate Abstract",
  "Improve Grammar",
  "Find Research Gap",
  "Generate Keywords",
  "Explain Methodology",
  "Suggest References",
  "Generate Conclusion"
];

const buildResponse = (mode, text) => {
  const cleanText = text.trim();

  if (!cleanText) {
    return "Paste a title, abstract or paragraph to generate a frontend-only writing helper response.";
  }

  if (mode === "Generate Keywords") {
    return cleanText
      .split(/\W+/)
      .filter((word) => word.length > 5)
      .slice(0, 8)
      .join(", ");
  }

  if (mode === "Improve Grammar") {
    return cleanText.replace(/\s+/g, " ").replace(/^./, (letter) => letter.toUpperCase());
  }

  if (mode === "Find Research Gap") {
    return `Possible research gap: compare this work against recent datasets, larger participant groups and measurable classroom outcomes. Source text: ${cleanText.slice(0, 180)}${cleanText.length > 180 ? "..." : ""}`;
  }

  return `${mode}: ${cleanText.slice(0, 220)}${cleanText.length > 220 ? "..." : ""}`;
};

export default function AIAssistant({ onOpenCitation }) {
  const [mode, setMode] = useState(features[0]);
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  return (
    <section className="ai-section">
      <div className="section-title">
        <h2>AI Research Assistant</h2>
        <p>Use local writing helpers to improve your research draft.</p>
      </div>

      <div className="ai-card">
        <div className="ai-left">
          <Bot size={70} />
          <h3>Research AI</h3>
          <p>Your assistant for drafting, reviewing and preparing research notes.</p>
          <button type="button" onClick={onOpenCitation}>
            Open Citation Tool
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="ai-workspace">
          <div className="ai-grid">
            {features.map((feature) => (
              <button
                className={feature === mode ? "ai-feature active" : "ai-feature"}
                key={feature}
                type="button"
                onClick={() => setMode(feature)}
              >
                <Sparkles size={18} />
                {feature}
              </button>
            ))}
          </div>

          <textarea
            rows="5"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Paste your title, abstract or paragraph..."
          />
          <button className="ai-run" type="button" onClick={() => setResult(buildResponse(mode, text))}>
            Run {mode}
          </button>

          {result && <div className="ai-result">{result}</div>}
        </div>
      </div>
    </section>
  );
}
