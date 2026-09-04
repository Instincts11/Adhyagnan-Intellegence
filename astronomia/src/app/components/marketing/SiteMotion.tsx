"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pageAccentFromPath } from "./pastelHeading";

const REVEAL = [
  ".section",
  ".marquee",
  ".cta-band",
  ".mkt-main > *",
  ".app-stage > *:not(.wave-desk)",
  ".rail-track",
  ".ledger-track",
].join(",");

const SPOT = [
  ".mkt-card",
  ".quote-card",
  ".price-card",
  ".path-card",
  ".testimonial-card",
  ".rail-card",
  ".ledger-row",
  ".ev-split-pane",
  ".faq-item",
].join(",");

export default function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.dataset.accent = pageAccentFromPath(pathname);
  }, [pathname]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(REVEAL)).filter((el) => {
      if (el.closest(".hero-easy, .site-header, .site-footer, .ev-space, .wave-desk, [data-no-reveal]")) return false;
      if (el.classList.contains("wave-desk")) return false;
      return true;
    });

    if (reduced) {
      nodes.forEach((el) => el.classList.add("is-inview"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-inview");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" }
    );

    nodes.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const visible = rect.top < window.innerHeight * 0.9 && rect.bottom > 80;
      el.classList.add("will-reveal");
      if (visible) el.classList.add("is-inview");
      else io.observe(el);
    });

    const enable = requestAnimationFrame(() => {
      document.documentElement.classList.add("ev-motion");
    });

    const onMove = (event: MouseEvent) => {
      const card = (event.target as HTMLElement | null)?.closest(SPOT) as HTMLElement | null;
      if (!card) return;
      const box = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${event.clientX - box.left}px`);
      card.style.setProperty("--spot-y", `${event.clientY - box.top}px`);
    };
    document.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(enable);
      io.disconnect();
      document.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("ev-motion");
      nodes.forEach((el) => {
        el.classList.remove("will-reveal", "is-inview");
      });
    };
  }, [pathname]);

  return null;
}
