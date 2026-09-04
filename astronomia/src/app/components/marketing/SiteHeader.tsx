"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "./content";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link href="/" className="site-logo">
        <span className="site-logo-mark" />
        Adhyagnan
      </Link>

      <nav className={`site-nav ${open ? "is-open" : ""}`}>
        {NAV_LINKS.filter((link) => link.href !== "/faq").map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? "is-active" : ""}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="site-header-actions">
        <Link href="/kepler-input" className="btn-sign">
          Kepler <span aria-hidden>→</span>
        </Link>
        <Link href="/exploration-path" className="site-cta">
          Open observatory
        </Link>
        <button type="button" className="site-menu-btn" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
