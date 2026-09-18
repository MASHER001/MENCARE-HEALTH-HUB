export default function HealthFactCard({ item }) {
  return (
    <article className="fact-card">
      <div className="card-topline">
        <span className="badge">{item.category}</span>
      </div>

      <h3>{item.title}</h3>
      <p>{item.description}</p>

      <div className="card-actions">
        <span className="helper-text">Source: {item.source}</span>
        {item.sourceUrl ? (
          <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="inline-link-btn">
            Learn more
          </a>
        ) : null}
      </div>
    </article>
  );
}
