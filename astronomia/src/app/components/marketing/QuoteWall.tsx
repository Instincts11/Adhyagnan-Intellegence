import { PROBLEM_QUOTES } from "./content";

export default function QuoteWall() {
  return (
    <div className="quote-wall">
      {PROBLEM_QUOTES.map((item) => (
        <article key={item.author} className="quote-card">
          <p>“{item.quote}”</p>
          <div className="quote-meta">
            <span className="avatar-dot" aria-hidden>
              {item.author.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase()}
            </span>
            <div>
              <strong>{item.author}</strong>
              <span>
                {item.source} · {item.stats}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
