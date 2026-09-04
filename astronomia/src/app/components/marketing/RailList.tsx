"use client";

export type RailItem = {
  when: string;
  title: string;
  detail: string;
  live?: boolean;
};

export default function RailList({ items }: { items: RailItem[] }) {
  return (
    <div className="rail-track">
      {items.map((item, index) => (
        <article key={item.title} className="rail-item">
          <div className="rail-meta">
            <span className={`rail-pill ${item.live || index === 0 ? "is-live" : ""}`}>
              <i />
              {item.when}
            </span>
          </div>
          <div className="rail-card">
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
