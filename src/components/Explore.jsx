import { useState } from 'react';
import '../css/Explore.css';

const stripHtml = (html) => {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [articleData, setArticleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    setArticleData(null);

    try {
      const data = await fetchArticleData(searchQuery.trim());
      setArticleData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchArticleData = async (query) => {
    try {
      const wikipediaData = await fetchWikipediaSummary(query);
      let description = null;
      let introHtml = null;
      let wikidataData = null;
      let dbpediaData = null;
      let relatedTopics = [];

      // Fetch a short description for the sidebar
      try {
        const extractResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&explaintext=true&format=json&titles=${encodeURIComponent(query)}&origin=*`);
        if (extractResponse.ok) {
          const extractData = await extractResponse.json();
          const pages = extractData.query.pages;
          const pageId = Object.keys(pages)[0];
          const page = pages[pageId];
          if (!page.missing) {
            description = page.extract;
          }
        }
      } catch (err) {
        console.warn('Description fetch failed:', err);
      }

      // Fetch intro HTML for summary
      try {
        const introResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(query)}&prop=text&section=0&format=json&origin=*`);
        if (introResponse.ok) {
          const introData = await introResponse.json();
          if (introData.parse && introData.parse.text) {
            introHtml = introData.parse.text['*'];
          }
        }
      } catch (err) {
        console.warn('Intro HTML fetch failed:', err);
      }

      try {
        wikidataData = await fetchWikidata(query);
      } catch (err) {
        console.warn('Wikidata fetch failed:', err);
      }

      try {
        dbpediaData = await fetchDBpedia(query);
      } catch (err) {
        console.warn('DBpedia fetch failed:', err);
      }

      try {
        relatedTopics = await fetchRelatedTopics(query);
      } catch (err) {
        console.warn('Related topics fetch failed:', err);
      }

      return {
        title: wikipediaData.title,
        summary: introHtml || description,
        description: description,
        sections: wikipediaData.sections || [],
        infobox: wikidataData,
        metadata: dbpediaData,
        relatedTopics: relatedTopics,
        originalExtract: wikipediaData.extract
      };
    } catch (err) {
      throw new Error(`Failed to fetch article data: ${err.message}`);
    }
  };

  const fetchWikipediaSummary = async (title) => {
    try {
      const parseResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(title)}&prop=text&format=json&origin=*`);
      if (parseResponse.ok) {
        const parseData = await parseResponse.json();
        if (parseData.parse && parseData.parse.text) {
          const fullContent = parseData.parse.text['*'];

          try {
            const sectionsResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/mobile-sections/${encodeURIComponent(title)}`);
            if (sectionsResponse.ok) {
              const sectionsData = await sectionsResponse.json();
              const sections = sectionsData.remaining?.sections || [];
              const filteredSections = sections.filter(section =>
                !['See also', 'References', 'External links', 'Bibliography', 'Further reading', 'Notes'].includes(section.line)
              );
              return {
                title: parseData.parse.title,
                extract: fullContent,
                sections: filteredSections.slice(0, 20),
                originalExtract: fullContent
              };
            }
          } catch (sectionsErr) {
            console.warn('Sections fetch failed, using full content only:', sectionsErr);
          }

          return {
            title: parseData.parse.title,
            extract: fullContent,
            sections: [],
            originalExtract: fullContent
          };
        }
      }

      const extractResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=false&explaintext&format=json&titles=${encodeURIComponent(title)}&origin=*`);
      if (extractResponse.ok) {
        const extractData = await extractResponse.json();
        const pages = extractData.query.pages;
        const pageId = Object.keys(pages)[0];
        const page = pages[pageId];
        if (!page.missing) {
          const fullExtract = page.extract;
          try {
            const sectionsResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/mobile-sections/${encodeURIComponent(title)}`);
            if (sectionsResponse.ok) {
              const sectionsData = await sectionsResponse.json();
              const sections = sectionsData.remaining?.sections || [];
              const filteredSections = sections.filter(section =>
                !['See also', 'References', 'External links', 'Bibliography', 'Further reading', 'Notes'].includes(section.line)
              );
              return {
                title: sectionsData.displaytitle || page.title,
                extract: fullExtract,
                sections: filteredSections.slice(0, 20),
                originalExtract: fullExtract
              };
            }
          } catch (sectionsErr) {
            console.warn('Sections fetch failed, using extract only:', sectionsErr);
          }
          return {
            title: page.title,
            extract: fullExtract,
            sections: [],
            originalExtract: fullExtract
          };
        }
      }

      const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/mobile-sections/${encodeURIComponent(title)}`);
      if (!response.ok) throw new Error('Failed to fetch Wikipedia content');
      const data = await response.json();
      const fullText = data.lead?.sections?.map(section => section.text).join(' ') || data.extract || '';
      const sections = data.remaining?.sections || [];
      const filteredSections = sections.filter(section =>
        !['See also', 'References', 'External links', 'Bibliography', 'Further reading', 'Notes'].includes(section.line)
      );
      return {
        title: data.displaytitle || title,
        extract: fullText,
        sections: filteredSections.slice(0, 20),
        originalExtract: fullText
      };
    } catch (err) {
      try {
        const searchResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(title)}&format=json&origin=*`);
        if (!searchResponse.ok) throw new Error('Page not found and search failed');
        const searchData = await searchResponse.json();
        if (searchData.query.search && searchData.query.search.length > 0) {
          const bestMatch = searchData.query.search[0].title;
          return await fetchWikipediaSummary(bestMatch);
        } else {
          throw new Error('Page not found');
        }
      } catch (fallbackErr) {
        throw new Error(`Failed to fetch article: ${fallbackErr.message}`);
      }
    }
  };

  const fetchWikidata = async (title) => {
    try {
      const searchResponse = await fetch(`https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(title)}&language=en&format=json&origin=*`);
      if (!searchResponse.ok) throw new Error('Failed to search Wikidata');
      const searchData = await searchResponse.json();

      if (!searchData.search || searchData.search.length === 0) {
        return null;
      }

      const qid = searchData.search[0].id;
      const entityResponse = await fetch(`https://www.wikidata.org/wiki/Special:EntityData/${qid}.json`);
      if (!entityResponse.ok) throw new Error('Failed to fetch Wikidata entity');
      const entityData = await entityResponse.json();

      return entityData.entities[qid];
    } catch (err) {
      console.warn('Wikidata fetch failed:', err);
      return null;
    }
  };

  const fetchDBpedia = async (title) => {
    try {
      const response = await fetch(`https://dbpedia.org/data/${encodeURIComponent(title)}.json`);
      if (!response.ok) throw new Error('Failed to fetch DBpedia data');
      return await response.json();
    } catch (err) {
      console.warn('DBpedia fetch failed:', err);
      return null;
    }
  };

  const fetchRelatedTopics = async (title) => {
    try {
      const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/related/${encodeURIComponent(title)}`);
      if (!response.ok) throw new Error('Failed to fetch related topics');
      const data = await response.json();
      const topics = data.pages?.slice(0, 5) || [];
      return topics;
    } catch (err) {
      console.warn('Related topics fetch failed:', err);
      return [];
    }
  };

  return (
    <div className="explore-page">
      {/* Header with Search Bar */}
      <header className="explore-header">
        <div className="explore-container">
          <div className="explore-search-bar">
            <input
              type="text"
              placeholder="Search topics to explore..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={loading}
            />
            <button onClick={handleSearch} disabled={loading || !searchQuery.trim()}>
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      </header>

      {/* Main Content */}
      <div className="explore-container">
        <div className="explore-grid">
          {/* Main Article */}
          <main>
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner large"></div>
                <p>Loading article...</p>
              </div>
            ) : articleData ? (
              <article className="explore-article-content">
                <h1>{articleData.title}</h1>

                {articleData.description && (
                  <p>{articleData.description}</p>
                )}

                {articleData.sections && articleData.sections.length > 0 && (
                  <div className="explore-toc">
                    <h2>Contents</h2>
                    <ol>
                      {articleData.sections.map((section, index) => (
                        <li key={index}>
                          <a href={`#section-${index}`}>{section.line || section.anchor}</a>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {articleData.sections && articleData.sections.map((section, index) => {
                  const text = stripHtml(section.text || '').trim();
                  return (
                    <section key={index} id={`section-${index}`}>
                      <h2>{section.line || section.anchor}</h2>
                      {text && <p>{text}</p>}
                    </section>
                  );
                })}
              </article>
            ) : (
              <article className="explore-article-content">
                <h1>Welcome to ShikshaCom Explore</h1>
                <p>
                  Search for any topic above to get comprehensive information.
                </p>
                <p>
                  Try searching for topics like "Albert Einstein" or "Ancient Rome" to see the full information.
                </p>
              </article>
            )}
          </main>

          {/* Right Column */}
          <div className="right-column">
            {/* Left Sidebar */}
            <aside>
              <div className="explore-sidebar">
                <h3>Categories</h3>
                <ol>
                  <li><a href="#">Education</a></li>
                  <li><a href="#">Technology</a></li>
                  <li><a href="#">Science</a></li>
                  <li><a href="#">History</a></li>
                </ol>

                {articleData && articleData.sections && articleData.sections.length > 0 && (
                  <>
                    <h3>Table of Contents</h3>
                    <ul>
                      {articleData.sections.map((section, index) => (
                        <li key={index}>
                          <button onClick={() => scrollToSection(`section-${index}`)}>
                            {section.line || section.anchor}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </aside>

            {/* Right Sidebar - Infobox */}
            <aside>
              {articleData ? (
                <div className="explore-infobox">
                  <h3>{articleData.title}</h3>

                  <h4>Article Information</h4>
                  <ul>
                    <li><strong>Topic:</strong> {articleData.title}</li>
                    {articleData.sections && articleData.sections.length > 0 && (
                      <li><strong>Sections:</strong> {articleData.sections.length}</li>
                    )}
                  </ul>

                  <h4>Description</h4>
                  <p>
                    {articleData.description
                      ? articleData.description.split('. ').slice(0, 3).join('. ') + '.'
                      : 'No description available.'}
                  </p>

                  {articleData.infobox && articleData.infobox.aliases?.en && articleData.infobox.aliases.en.length > 0 && (
                    <>
                      <h4>Also Known As</h4>
                      <ul>
                        {articleData.infobox.aliases.en.slice(0, 3).map((alias, index) => (
                          <li key={index}>{alias.value}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  <h4>Related Links</h4>
                  <ul>
                    {articleData.relatedTopics && articleData.relatedTopics.length > 0 ? (
                      articleData.relatedTopics.slice(0, 10).map((topic, index) => (
                        <li key={index}>
                          <a
                            href={`https://en.wikipedia.org/wiki/${encodeURIComponent(topic.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {topic.title}
                          </a>
                          {topic.description && <span> - {topic.description}</span>}
                        </li>
                      ))
                    ) : (
                      <li>No related links available for this topic.</li>
                    )}
                  </ul>
                </div>
              ) : (
                <div className="explore-infobox">
                  <h3>ShikshaCom Explore</h3>
                  <img src="/Shiksha.png" alt="Shiksha" />
                  <p>Search for any topic to see structured information.</p>
                  <h4>Key Highlights</h4>
                  <ul>
                    <li>In-depth explanations of topics</li>
                    <li>Clear summaries for quick understanding</li>
                    <li>Sections and tables for structured learning</li>
                    <li>Related topics for extended exploration</li>
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
