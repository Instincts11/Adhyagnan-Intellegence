"use client";
import { useState } from "react";
import { FAQS } from "./content";

export default function FaqList({ items = FAQS }: { items?: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const active = open === index;
        return (
          <button
            key={item.q}
            type="button"
            className={`faq-item ${active ? "is-open" : ""}`}
            onClick={() => setOpen(active ? -1 : index)}
          >
            <span className="faq-q">{item.q}</span>
            {active && <span className="faq-a">{item.a}</span>}
          </button>
        );
      })}
    </div>
  );
}
