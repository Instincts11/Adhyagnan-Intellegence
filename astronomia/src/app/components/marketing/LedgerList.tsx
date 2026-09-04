"use client";
import type { RailItem } from "./RailList";

export default function LedgerList({ items }: { items: RailItem[] }) {
  return (
    <div className="ledger-track">
      {items.map((item) => (
        <article key={item.title} className="ledger-row">
          <span className="ledger-index">{item.when}</span>
          <div className="ledger-copy">
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
