import { Award, BookOpen, GraduationCap } from "lucide-react";

const researchers = [
  {
    name: "Dr. Rahul Sharma",
    designation: "Professor",
    department: "Computer Science",
    papers: 27,
    citations: 128
  },
  {
    name: "Dr. Anita Das",
    designation: "Associate Professor",
    department: "Electronics",
    papers: 18,
    citations: 91
  },
  {
    name: "Neha Gupta",
    designation: "Research Scholar",
    department: "Artificial Intelligence",
    papers: 12,
    citations: 37
  }
];

export default function TopResearchers({ onNotice }) {
  return (
    <section className="researchers-section">
      <div className="section-title">
        <h2>Featured Researchers</h2>
        <p>Meet active researchers publishing on Shiksha.</p>
      </div>

      <div className="researcher-grid">
        {researchers.map((person) => (
          <article className="researcher-card" key={person.name}>
            <div className="avatar">
              <GraduationCap size={38} />
            </div>
            <h3>{person.name}</h3>
            <span>{person.designation}</span>
            <p>{person.department}</p>

            <div className="researcher-stats">
              <div>
                <BookOpen size={16} />
                {person.papers} Papers
              </div>
              <div>
                <Award size={16} />
                {person.citations} Citations
              </div>
            </div>

            <button type="button" onClick={() => onNotice(`${person.name}'s profile opened locally.`)}>
              View Profile
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
