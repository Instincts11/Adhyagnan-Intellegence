"use client";
import Link from "next/link";
import { wrapPastelLastWord } from "./pastelHeading";

export default function CtaBand({
  eyebrow,
  title,
  lede,
  primary,
  secondary,
  pills = [],
}: {
  eyebrow?: string;
  title?: string;
  lede?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  pills?: string[];
}) {
  const primaryBtn = primary ?? { href: "/exploration-path", label: "Open the observatory" };
  const secondaryBtn = secondary ?? { href: "/learn-more", label: "Read the manifesto" };
  return (
    <section className="cta-band">
      <p className="mkt-eyebrow">{eyebrow}</p>
      <h2 className="cta-band-title">
        {(title ?? "").split("\n").map((line, index) => (
          <span key={`${index}-${line}`}>
            {wrapPastelLastWord(line)}
          </span>
        ))}
      </h2>
      <p className="cta-band-lede">{lede}</p>
      <div className="hero-actions">
        <Link href={primaryBtn.href} className="site-cta">
          {primaryBtn.label}
        </Link>
        <Link href={secondaryBtn.href} className="btn-ghost">
          {secondaryBtn.label}
        </Link>
      </div>
      {pills.length > 0 && (
        <div className="pill-row">
          {pills.map((pill) => (
            <span key={pill} className="trust-pill">
              {pill}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
