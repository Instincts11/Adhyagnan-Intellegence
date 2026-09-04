import { TESTIMONIALS } from "./content";

export default function TestimonialMarquee() {
  const items = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <div className="testimonial-wrap">
      <div className="testimonial-track">
        {items.map((item, i) => (
          <article key={`${item.name}-${i}`} className="testimonial-card">
            <div className="stars" aria-label="5 stars">
              ★★★★★
            </div>
            <p>“{item.quote}”</p>
            <div className="quote-meta">
              <span className="avatar-dot">{item.initials}</span>
              <div>
                <strong>{item.name}</strong>
                <span>{item.title}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
