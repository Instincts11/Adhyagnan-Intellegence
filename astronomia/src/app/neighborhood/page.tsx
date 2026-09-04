"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import StarfieldHyperdrive from "../components/StarfieldHyperdrive";
import SiteHeader from "../components/marketing/SiteHeader";
import SiteFooter from "../components/marketing/SiteFooter";
import CtaBand from "../components/marketing/CtaBand";
import PageHero from "../components/marketing/PageHero";
import NeighborhoodGraph from "../components/NeighborhoodGraph";
import { PAGE_COPY } from "../components/marketing/content";
import { PastelTitle } from "../components/marketing/pastelHeading";

function WaveBody() {
  const params = useSearchParams();
  return <NeighborhoodGraph initialFocus={params.get("planet")} />;
}

export default function NeighborhoodPage() {
  return (
    <div className="app-canvas" data-page="neighborhood">
      <StarfieldHyperdrive speed={0.03} warpBoost={0.25} />
      <SiteHeader />
      <PageHero copy={PAGE_COPY.neighborhood} />
      <main className="app-stage">
        <Suspense fallback={<p className="prose-block">Opening the neighborhood map…</p>}>
          <WaveBody />
        </Suspense>
        <PastelTitle style={{ fontSize: 40, marginTop: 64 }}>Why a map, not a pile of dots</PastelTitle>
        <p className="prose-block">
          51 Peg b was not found as a picture. It was found as a star tugged along our line of sight,
          repeating once per orbit. Gaia later watches the same worlds drift sideways on the sky.
          Light from those hosts is already old when it arrives. Hawking’s useful sentence was that we
          observe the past; pulse age turns that into a circle you can slide.
        </p>
        <div className="mkt-grid">
          <article className="mkt-card">
            <h3>Galactic polar map</h3>
            <p>Each host is placed by distance and direction from Sol. The origin is the Solar System. No spaghetti of edges.</p>
          </article>
          <article className="mkt-card">
            <h3>Drag the probe</h3>
            <p>The gold disc is an observer you move. The ranked list is whoever is nearest that point, not a static poster.</p>
          </article>
          <article className="mkt-card">
            <h3>Open the nearby sky</h3>
            <p>Square-root and log distance spread the crowded solar neighborhood so Proxima is not crushed against Barnard.</p>
          </article>
          <article className="mkt-card">
            <h3>Inferences that spend telescope time</h3>
            <p>Lookback, inverse-square flux, message round-trip, who already sits inside a pulse of a given age. Units stay on the number.</p>
          </article>
        </div>
      </main>
      <CtaBand {...PAGE_COPY.neighborhood.cta} />
      <SiteFooter />
    </div>
  );
}
