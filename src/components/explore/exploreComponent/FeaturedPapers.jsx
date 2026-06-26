import PaperCard from "./PaperCard";

export default function FeaturedPapers({
  papers,
  savedPapers,
  onDownload,
  onRead,
  onSave,
  onViewAll
}) {
  return (
    <section className="featured-section">
      <div className="section-header">
        <div>
          <h2>Featured Research Papers</h2>
          <p>{papers.length} paper{papers.length === 1 ? "" : "s"} match your current search.</p>
        </div>
        <button className="view-all" type="button" onClick={onViewAll}>
          View All
        </button>
      </div>

      {papers.length ? (
        <div className="featured-grid">
          {papers.map((paper) => (
            <PaperCard
              key={paper.id}
              paper={paper}
              isSaved={savedPapers.includes(paper.id)}
              onDownload={onDownload}
              onRead={onRead}
              onSave={onSave}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No papers found</h3>
          <p>Try another keyword or choose a different research area.</p>
        </div>
      )}
    </section>
  );
}
