"use client";
import { useRouter } from "next/navigation";
import StarfieldHyperdrive from "../components/StarfieldHyperdrive";
import SiteHeader from "../components/marketing/SiteHeader";
import SiteFooter from "../components/marketing/SiteFooter";
import CtaBand from "../components/marketing/CtaBand";
import PageHero from "../components/marketing/PageHero";
import { DATA_SOURCES, FAMOUS_WORLDS, PAGE_COPY, PIPELINE, PRINCIPLES } from "../components/marketing/content";
import LedgerList from "../components/marketing/LedgerList";
import { PastelTitle } from "../components/marketing/pastelHeading";

export default function ExplorationPathPage() {
  const router = useRouter();

  return (
    <div className="app-canvas" data-page="observatory">
      <StarfieldHyperdrive speed={0.03} warpBoost={0.25} />
      <SiteHeader />
      <PageHero copy={PAGE_COPY.observatory} />
      <main className="app-stage">

        <div className="path-grid">
          <button type="button" className="path-card" onClick={() => router.push("/kepler-input")}>
            <p className="mkt-eyebrow">Confirmed worlds</p>
            <h2>Kepler</h2>
            <p>
              Archive parameters, arXiv, and a one-page exoplanet brief. Names like TRAPPIST-1 e
              resolve even when NASA TAP is slow.
            </p>
          </button>
          <button type="button" className="path-card" onClick={() => router.push("/grace-hopper-input")}>
            <p className="mkt-eyebrow">New candidates</p>
            <h2>Hopper</h2>
            <p>
              Period, depth, duration, stellar context. A TESS candidate argued against physics —
              not a chatbot that rubber-stamps 91%.
            </p>
          </button>
        </div>

        <button type="button" className="path-card path-wide" onClick={() => router.push("/neighborhood")}>
          <div>
            <p className="mkt-eyebrow">Neighborhood</p>
            <h2 style={{ fontSize: 28 }}>Sky graph</h2>
            <p>
              Sol at the origin. Nearby confirmed hosts as points. Drag a probe to see who is nearest.
              Lookback time and inverse-square flux sit beside the plot.
            </p>
          </div>
          <span className="site-cta">Open the wave</span>
        </button>

        <button type="button" className="path-card path-wide" onClick={() => router.push("/mission-dashboard")}>
          <div>
            <p className="mkt-eyebrow">Flight ops</p>
            <h2 style={{ fontSize: 28 }}>Missions</h2>
            <p>TESS, JWST, Kepler, Hubble, Spitzer — the NASA missions that filled the exoplanet archive.</p>
          </div>
          <span className="site-cta">Open dashboard</span>
        </button>

        <PastelTitle style={{ fontSize: 48, marginTop: 72 }}>How a night on the sky runs</PastelTitle>
        <LedgerList
          items={PIPELINE.map((item) => ({
            when: item.step,
            title: item.title,
            detail: item.body,
          }))}
        />

        <PastelTitle style={{ fontSize: 48, marginTop: 64 }}>Wired to the NASA archive</PastelTitle>
        <div className="mkt-grid">
          {DATA_SOURCES.map((item) => (
            <article key={item.name} className="mkt-card">
              <h3>{item.name}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        <PastelTitle style={{ fontSize: 40, marginTop: 64 }}>Worlds you can brief tonight</PastelTitle>
        <div className="mkt-grid" style={{ marginBottom: 24 }}>
          {FAMOUS_WORLDS.map((item) => (
            <article key={item.name} className="mkt-card">
              <p className="mkt-eyebrow">{item.tag}</p>
              <h3>{item.name}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>

        <PastelTitle style={{ fontSize: 40, marginTop: 64 }}>How this floor is staffed</PastelTitle>
        <div className="mkt-grid">
          {PRINCIPLES.map((item) => (
            <article key={item.title} className="mkt-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </main>
      <CtaBand {...PAGE_COPY.observatory.cta} />
      <SiteFooter />
    </div>
  );
}
