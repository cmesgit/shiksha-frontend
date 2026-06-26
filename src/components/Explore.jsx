import { useNavigate } from 'react-router-dom';
import '../css/Explore.css';

const highlights = [
  {
    title: "Publish",
    text: "Upload your research paper and share your knowledge.",
    tone: "forest",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M12 6h18l6 6v30H12z" />
        <path d="M30 6v8h8" />
        <path d="M18 22h13M18 29h13M18 36h8" />
        <path className="badge" d="M34 42V28m0 0-6 6m6-6 6 6" />
      </svg>
    ),
  },
  {
    title: "Read",
    text: "Access a wide collection of research papers from various fields.",
    tone: "mint",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 12c6-3 11-2 16 2 5-4 10-5 16-2v27c-6-3-11-2-16 2-5-4-10-5-16-2z" />
        <path d="M24 14v27M14 19h6M14 26h6M28 19h6M28 26h6" />
      </svg>
    ),
  },
  {
    title: "AI Review",
    text: "Get intelligent reviews and suggestions to improve your research.",
    tone: "teal",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M14 14h20v20H14z" />
        <path d="M18 8v6M24 8v6M30 8v6M18 34v6M24 34v6M30 34v6M8 18h6M8 24h6M8 30h6M34 18h6M34 24h6M34 30h6" />
        <text x="24" y="29" textAnchor="middle">AI</text>
      </svg>
    ),
  },
  {
    title: "Collaborate",
    text: "Connect with researchers and build meaningful collaborations.",
    tone: "amber",
    icon: (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="19" cy="18" r="6" />
        <circle cx="31" cy="19" r="5" />
        <path d="M8 39c1.5-8 6-12 11-12s9.5 4 11 12zM27 38c.8-5 3.8-8 8-8 3.8 0 7 3 8 8z" />
      </svg>
    ),
  },
];

function TinyIcon({ type }) {
  const paths = {
    cloud: "M16 32h16a7 7 0 0 0 .9-13.9A10 10 0 0 0 13.6 16 8 8 0 0 0 16 32Zm8-13v12m0-12-5 5m5-5 5 5",
    book: "M10 12c5-2 10-1 14 3 4-4 9-5 14-3v25c-5-2-10-1-14 3-4-4-9-5-14-3zM24 15v25",
    chip: "M15 15h18v18H15zM19 9v6M24 9v6M29 9v6M19 33v6M24 33v6M29 33v6M9 19h6M9 24h6M9 29h6M33 19h6M33 24h6M33 29h6",
    users: "M18 22a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm12-1a5 5 0 1 0 0-10M8 38c1-8 5-12 10-12s9 4 10 12M27 35c1-5 4-8 8-8 3.5 0 6 3 7 8",
  };

  return (
    <span className="benefit-icon">
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d={paths[type]} />
      </svg>
    </span>
  );
}

export default function Explore() {
  const navigate = useNavigate();

  return (
    <main className="explore-page">
      <section className="explore-hero">
        <div className="hero-copy">
          <p className="eyebrow">
            Welcome to Explore
          </p>
          <h1>
            Discover. Share.
            <br />
            Learn. <span>Inspire.</span>
          </h1>
          <p className="intro">
            Explore is your research hub, a place to publish your ideas, read
            impactful research papers, and get AI-powered reviews to improve
            your work and grow together.
          </p>
          <ul className="benefits">
            <li><TinyIcon type="cloud" />Publish your research and contribute to the community</li>
            <li><TinyIcon type="book" />Read and explore thousands of research papers</li>
            <li><TinyIcon type="chip" />Get AI-powered reviews and constructive feedback</li>
            <li><TinyIcon type="users" />Learn, collaborate and grow with researchers worldwide</li>
          </ul>
        </div>
      </section>

      <section className="feature-strip" aria-label="Explore features">
        {highlights.map((item) => (
          <article className="feature-item" key={item.title}>
            <div className={`feature-icon ${item.tone}`}>{item.icon}</div>
            <div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="explore-cta">
        <h2>Ready to explore the world of research?</h2>
        <button type="button" onClick={() => navigate('/explore/research-hub')}>
          Let's Get Started
          <span aria-hidden="true">-&gt;</span>
        </button>
        <p>Join a community of curious minds and make an impact.</p>
      </section>

      <footer className="quote-box">
        <span aria-hidden="true">"</span>
        <blockquote>
          Research is to see what everybody else has seen, and to think what
          nobody else has thought.
          <cite>- Albert Szent-Gyorgyi</cite>
        </blockquote>
        <span aria-hidden="true">"</span>
      </footer>
    </main>
  );
}
