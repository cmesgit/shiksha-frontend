import { useState, useEffect } from "react";
import '../css/CurrentAffairs.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://api.shikshacom.com";

const CurrentAffairs = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCurrentAffairs();
  }, []);

  const fetchCurrentAffairs = async () => {
    setLoading(true);
    setError(null);
    setNews([]);

    try {
      const response = await fetch(`${API_BASE}/api/news/top-headlines/`);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      const transformedArticles = data.articles.map((article) => ({
        title: article.title,
        description: article.description,
        urlToImage: article.image,
        source: { name: article.source },
        publishedAt: article.publishedAt,
        url: article.url,
      }));

      setNews(transformedArticles);
    } catch (error) {
      console.error("Error fetching current affairs:", error);
      setError("Failed to load current affairs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="current-affairs-page">
      <h1>Daily Current Affairs</h1>
      <p className="page-description">
        Stay updated with the latest news and current affairs from around the world
      </p>

      {loading ? (
        <div className="loading">
          <p>Loading current affairs...</p>
        </div>
      ) : error ? (
        <div className="error">
          <p>{error}</p>
          <button
            onClick={fetchCurrentAffairs}
            className="retry-btn"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="news-grid">
          {news.length === 0 ? (
            <div className="empty-state">
              <p>No articles found right now. Please check back later.</p>
            </div>
          ) : (
            news.map((article, index) => (
              <div key={index} className="news-card">
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="news-image"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
                <div className="news-content">
                  <h3 className="news-title">{article.title}</h3>
                  <p className="news-description">
                    {article.description || "No description available"}
                  </p>
                  <div className="news-meta">
                    <span className="news-source">{article.source?.name}</span>
                    <span className="news-date">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="read-more-link"
                  >
                    Read Full Article →
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CurrentAffairs;
