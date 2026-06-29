import { ArrowRight } from "lucide-react";

const collections = [
  {
    title: "Artificial Intelligence",
    papers: 315,
    description: "Machine Learning, Deep Learning, Computer Vision and NLP research."
  },
  {
    title: "Computer Science",
    papers: 284,
    description: "Algorithms, Software Engineering, Cloud Computing and Security."
  },
  {
    title: "Electronics",
    papers: 168,
    description: "Communication Systems, VLSI, Embedded Systems and IoT."
  },
  {
    title: "Education",
    papers: 94,
    description: "Teaching methodologies, learning analytics and educational technology."
  },
  {
    title: "Healthcare",
    papers: 132,
    description: "Biomedical Engineering, Medical AI and Healthcare Systems."
  },
  {
    title: "Agriculture",
    papers: 71,
    description: "Smart farming, crop prediction and sustainable agriculture."
  }
];

export default function ResearchCollections({ onBrowse }) {
  return (
    <section className="collections-section">
      <div className="section-title">
        <h2>Research Collections</h2>
        <p>Explore publications grouped by research domain.</p>
      </div>

      <div className="collection-grid">
        {collections.map((item) => (
          <article className="collection-card" key={item.title}>
            <span className="collection-count">{item.papers} Papers</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button type="button" onClick={() => onBrowse(item.title)}>
              Browse Collection
              <ArrowRight size={16} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
