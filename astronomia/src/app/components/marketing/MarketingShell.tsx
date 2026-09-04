"use client";
import { PAGE_COPY } from "./content";
import CtaBand from "./CtaBand";
import PageHero from "./PageHero";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import StarfieldHyperdrive from "../StarfieldHyperdrive";

export default function MarketingShell({
  page,
  children,
}: {
  page: keyof typeof PAGE_COPY;
  children: React.ReactNode;
}) {
  const copy = PAGE_COPY[page];

  return (
    <div className="mkt-page" data-page={page}>
      <StarfieldHyperdrive speed={0.03} warpBoost={0.25} />
      <SiteHeader />
      <PageHero copy={copy} />
      <main className="mkt-main">{children}</main>
      <CtaBand {...copy.cta} />
      <SiteFooter />
    </div>
  );
}
