import { Clock } from "lucide-react";

export default function LatestResearch({ items, onOpen }) {
  return (
    <section className="latest-section">
      <div className="section-header">
        <div>
          <h2>Latest Publications</h2>
          <p>Recently published research.</p>
        </div>
      </div>

      <div className="latest-list">
        {items.map((item) => (
          <button className="latest-item" key={item.title} type="button" onClick={() => onOpen(item)}>
            <Clock size={18} />
            <span>
              <strong>{item.title}</strong>
              <small>Published {item.date}</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
