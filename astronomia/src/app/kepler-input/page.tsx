"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import StarfieldHyperdrive from "../components/StarfieldHyperdrive";
import SiteHeader from "../components/marketing/SiteHeader";
import SiteFooter from "../components/marketing/SiteFooter";
import CtaBand from "../components/marketing/CtaBand";
import PageHero from "../components/marketing/PageHero";
import LedgerList from "../components/marketing/LedgerList";
import { FAMOUS_WORLDS, PAGE_COPY } from "../components/marketing/content";
import { PastelTitle } from "../components/marketing/pastelHeading";

const QUICK = ["Kepler-22 b", "TRAPPIST-1 e", "Kepler-452 b", "K2-18 b", "Proxima Centauri b", "Gliese 581g"];

const KEPLER_STEPS = [
  {
    title: "Type a NASA name",
    body: "Prefer the spaced form: TRAPPIST-1 e, K2-18 b. We also try the compact spelling if the archive is picky.",
  },
  {
    title: "Archive, then literature",
    body: "Planetary Systems Composite Parameters first. arXiv astro-ph next. Groq Compound only after the catalog has spoken.",
  },
  {
    title: "Read the brief",
    body: "Period, radius, equilibrium temperature, host star, and the papers that actually matter — plus NASA Eyes in the same cockpit.",
  },
];

const DEMO_NOTES = FAMOUS_WORLDS.slice(0, 6);

export default function JohannesKeplerPage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const go = (name: string) => {
    if (!name.trim()) return;
    router.push(`/kepler-planet-results?planet=${encodeURIComponent(name.trim())}`);
  };

  return (
    <div className="app-canvas" data-page="kepler">
      <StarfieldHyperdrive speed={0.03} warpBoost={0.25} />
      <SiteHeader />
      <PageHero copy={PAGE_COPY.kepler} />
      <main className="app-stage">
        <form
          className="search-panel"
          onSubmit={(e) => {
            e.preventDefault();
            go(query);
          }}
        >
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Kepler-22 b"
            />
            <button type="submit" className="site-cta" style={{ border: 0, cursor: "pointer" }}>
              Search
            </button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
            {QUICK.map((name) => (
              <button key={name} type="button" className="chip" onClick={() => go(name)}>
                {name}
              </button>
            ))}
          </div>
        </form>

        <PastelTitle style={{ fontSize: 48, marginTop: 64 }}>What Kepler actually does</PastelTitle>
        <LedgerList
          items={KEPLER_STEPS.map((item, index) => ({
            when: `0${index + 1}`,
            title: item.title,
            detail: item.body,
          }))}
        />

        <PastelTitle style={{ fontSize: 48, marginTop: 64 }}>Why these NASA worlds</PastelTitle>
        <p className="prose-block">
          They stress name spacing, TAP latency, and literature density. Use them when the NASA
          archive is quiet. Then search the exoplanet you actually care about.
        </p>
        <div className="mkt-grid" style={{ marginBottom: 24 }}>
          {DEMO_NOTES.map((item) => (
            <article key={item.name} className="mkt-card">
              <p className="mkt-eyebrow">{item.tag}</p>
              <h3>{item.name}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </main>
      <CtaBand {...PAGE_COPY.kepler.cta} />
      <SiteFooter />
    </div>
  );
}
