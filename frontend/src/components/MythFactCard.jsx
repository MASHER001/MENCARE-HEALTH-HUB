import { useState } from 'react';

export default function MythFactCard({ item }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="myth-card" data-expanded={expanded}>
      <div className="card-topline">
        <span className="badge">{item.category}</span>
      </div>

      <div className="myth-card-label">Myth</div>
      <p className="myth-card-text">{item.myth}</p>

      <div className="card-actions myth-card-actions">
        <span className="helper-text">Source: {item.source}</span>
      </div>

      <button
        type="button"
        className={`secondary-btn myth-reveal-btn ${expanded ? 'is-open' : ''}`}
        onClick={() => setExpanded((current) => !current)}
        aria-expanded={expanded}
      >
        <span className="reveal-icon">{expanded ? '−' : '+'}</span>
        {expanded ? 'Hide fact' : 'Reveal fact'}
      </button>

      <div className={`fact-reveal-panel ${expanded ? 'open' : ''}`} aria-hidden={!expanded}>
        <div className="fact-reveal-inner">
          <div className="fact-reveal-header">
            <span className="fact-reveal-label">Fact</span>
          </div>
          <p className="fact-card-text">{item.fact}</p>
          <p className="fact-explanation">
            <strong>Why this matters:</strong> {item.explanation}
          </p>
          {item.sourceUrl ? (
            <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="inline-link-btn">
              Read source
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
