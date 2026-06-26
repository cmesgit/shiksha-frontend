import { Bookmark, Download, Eye } from "lucide-react";

export default function PaperCard({ paper, isSaved, onDownload, onRead, onSave }) {
  return (
    <article className="paper-card">
      <div className="paper-top">
        <span className="paper-type">{paper.type}</span>
        <span>{paper.year}</span>
      </div>

      <h3>{paper.title}</h3>
      <p className="paper-author">{paper.author}</p>
      <p className="paper-department">{paper.department}</p>
      <p className="paper-abstract">{paper.abstract}</p>

      <div className="paper-tags">
        {paper.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="paper-footer">
        <div>
          <strong>{paper.downloads}</strong>
          Downloads
        </div>
        <div>
          <strong>{paper.citations}</strong>
          Citations
        </div>
      </div>

      <div className="paper-buttons">
        <button type="button" onClick={() => onRead(paper)}>
          <Eye size={16} />
          Read
        </button>
        <button type="button" onClick={() => onDownload(paper)}>
          <Download size={16} />
          PDF
        </button>
        <button type="button" className={isSaved ? "active" : ""} onClick={() => onSave(paper)}>
          <Bookmark size={16} />
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </article>
  );
}
