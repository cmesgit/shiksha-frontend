import React, { useState, useRef } from "react";
import "../css/TermsCondition.css";

/**
 * LegalDocument — the shared reader shell for long legal pages.
 *
 * Extracted verbatim from TermsCondition.jsx when /privacy became its own
 * route. Both pages are the same thing structurally (a numbered list of
 * sections with a table of contents, a mobile drawer and prev/next paging),
 * so the second one reuses this rather than copying 190 lines of markup and
 * inheriting a second copy of every future fix to it.
 *
 * Styles stay in css/TermsCondition.css under the `tc-` prefix — the class
 * vocabulary is shared, and renaming it would churn a 600-line stylesheet for
 * no behavioural gain.
 *
 * Props:
 *   sections  [{ id, title, content }]  ids must be 1..n, in order — the
 *                                      progress bar and paging both assume it
 *   badge     string   small pill above the title
 *   title     node     the <h1>; a node so a caller can insert <br />
 *   subtitle  string   the line under the title
 */

const accentColors = [
  "#1dcaab", "#60a5fa", "#fbbf24", "#a78bfa", "#f87171",
  "#34d399", "#fb923c", "#e879f9", "#38bdf8", "#4ade80",
  "#facc15", "#c084fc", "#f472b6", "#22d3ee", "#86efac",
  "#fda4af", "#fdba74", "#a3e635", "#67e8f9", "#d8b4fe",
  "#6ee7b7", "#fcd34d", "#93c5fd", "#f9a8d4", "#5eead4",
  "#bbf7d0",
];

const LegalDocument = ({ sections, badge = "ShikshaCom LMS", title, subtitle }) => {
  const [activeId, setActiveId] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const contentRef = useRef(null);

  const activeSection = sections.find((s) => s.id === activeId);
  const activeAccent = accentColors[(activeId - 1) % accentColors.length];

  const handleSelect = (id) => {
    if (id === activeId) {
      setMobileNavOpen(false);
      return;
    }

    setAnimating(true);
    setTimeout(() => {
      setActiveId(id);
      setAnimating(false);
      // The section text used to live in its own scrollbox, so resetting
      // `scrollTop` was enough. It flows in the document now, which makes that
      // a no-op — and without this, picking a section while scrolled down
      // leaves you part-way into the new one. Bring the panel back into view
      // instead. `?.` because this runs from a timeout that can outlive the
      // component if someone navigates away mid-animation.
      //
      // Carried over from TermsCondition.jsx, which is where this fix was made
      // on Dev while this component was being extracted from it on another
      // branch. The merge would otherwise have reverted it: the refactor
      // deleted the function the fix lived in, so "take the refactor" silently
      // reintroduced the bug in the new file. Applies to /privacy too now.
      contentRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    }, 220);

    setMobileNavOpen(false);
  };

  return (
    <div className="tc-root">
      <div className="tc-bg-grid" />
      <div className="tc-glow-1" />
      <div className="tc-glow-2" />
      <div className="tc-glow-3" />

      <div className="tc-header">
        <div className="tc-header-badge">
          <div className="tc-header-dot" />
          <span className="tc-header-badge-text">{badge}</span>
        </div>
        <h1>{title}</h1>
        <p className="tc-header-sub">{subtitle}</p>
      </div>

      <div className="tc-layout">
        <nav className="tc-nav">
          <div className="tc-nav-header">
            <div className="tc-nav-header-label">Table of Contents</div>
          </div>

          <div className="tc-nav-scroll">
            {sections.map((s, i) => {
              const acc = accentColors[i % accentColors.length];
              const isActive = s.id === activeId;

              return (
                <button
                  key={s.id}
                  className={`tc-nav-item${isActive ? " active" : ""}`}
                  onClick={() => handleSelect(s.id)}
                >
                  <span
                    className="tc-nav-num"
                    style={isActive ? { background: acc, color: "#0a1a0e" } : {}}
                  >
                    {s.id}
                  </span>
                  <span className="tc-nav-label">{s.title}</span>
                  <span className="tc-nav-arrow">›</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="tc-content-wrap">
          <div className={`tc-content-panel${animating ? " animating" : ""}`}>
            <div className="tc-content-topbar">
              <span
                className="tc-section-num-badge"
                style={{ background: activeAccent }}
              >
                {String(activeId).padStart(2, "0")}
              </span>
              <h2 className="tc-section-title-head">{activeSection?.title}</h2>
            </div>

            <div className="tc-progress-bar-wrap">
              {sections.map((s) => (
                <div
                  key={s.id}
                  className={`tc-progress-step${s.id < activeId ? " done" : ""}${s.id === activeId ? " current" : ""}`}
                  style={s.id === activeId ? { background: activeAccent } : {}}
                  onClick={() => handleSelect(s.id)}
                  title={s.title}
                />
              ))}
              <span className="tc-progress-label">
                {activeId}/{sections.length}
              </span>
            </div>

            <div className="tc-content-body" ref={contentRef}>
              <p className="tc-content-text">{activeSection?.content}</p>
            </div>

            <div className="tc-nav-btns">
              <button
                className="tc-btn"
                disabled={activeId === 1}
                onClick={() => handleSelect(activeId - 1)}
              >
                ← Previous
              </button>

              <span className="tc-section-counter">
                Section {activeId} of {sections.length}
              </span>

              <button
                className="tc-btn tc-btn-next"
                disabled={activeId === sections.length}
                onClick={() => handleSelect(activeId + 1)}
                style={{ background: activeAccent }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="tc-mobile-toggle"
        onClick={() => setMobileNavOpen((prev) => !prev)}
        aria-label={mobileNavOpen ? "Close table of contents" : "Open table of contents"}
      >
        {mobileNavOpen ? "✕" : "☰"}
      </button>

      <div className={`tc-mobile-drawer${mobileNavOpen ? " open" : ""}`}>
        <div
          className="tc-mobile-backdrop"
          onClick={() => setMobileNavOpen(false)}
        />

        <div className="tc-mobile-panel">
          <div className="tc-mobile-panel-top">
            <div className="tc-mobile-handle" />
            <button
              type="button"
              className="tc-mobile-close"
              onClick={() => setMobileNavOpen(false)}
              aria-label="Close table of contents"
            >
              ✕
            </button>
          </div>

          {sections.map((s, i) => {
            const acc = accentColors[i % accentColors.length];
            const isActive = s.id === activeId;

            return (
              <button
                key={s.id}
                className={`tc-nav-item${isActive ? " active" : ""}`}
                onClick={() => handleSelect(s.id)}
              >
                <span
                  className="tc-nav-num"
                  style={isActive ? { background: acc, color: "#0a1a0e" } : {}}
                >
                  {s.id}
                </span>
                <span className="tc-nav-label">{s.title}</span>
                <span className="tc-nav-arrow">›</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LegalDocument;
