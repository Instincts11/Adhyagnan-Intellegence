"use client";
import Link from "next/link";
import type { PageCopy } from "./content";
import HeroStarShower from "./HeroStarShower";

export default function PageHero({
  copy,
  children,
}: {
  copy: PageCopy;
  children?: React.ReactNode;
}) {
  const lines = copy.title.split("\n");
  return (
    <section className="hero-easy">
      <div className="hero-sky" aria-hidden>
        <HeroStarShower />
      </div>
      <div className="hero-copy">
        <Link href={copy.pillHref} className="hero-pill">
          <span className="hero-pill-dot" aria-hidden />
          {copy.pill}
          <span>→</span>
        </Link>
        <h1>
          {lines.map((line, index) => (
            <span key={`${index}-${line}`}>{line}</span>
          ))}
        </h1>
        <p>{copy.lede}</p>
        <div className="hero-actions">
          <Link href={copy.primary.href} className="site-cta">
            {copy.primary.label}
          </Link>
          <Link href={copy.secondary.href} className="btn-ghost">
            {copy.secondary.label}
          </Link>
        </div>
        {children}
      </div>
    </section>
  );
}
