"use client";
import MarketingShell from "../components/marketing/MarketingShell";
import RailList from "../components/marketing/RailList";
import { DATA_SOURCES, FAMOUS_WORLDS, FEATURES, OBSERVATORY_BEATS, PIPELINE, TOOLKIT } from "../components/marketing/content";
import { PastelTitle } from "../components/marketing/pastelHeading";

export default function FeaturesPage() {
  return (
    <MarketingShell page="features">
      <p className="prose-block">
        Adhyagnan is not a chatbot with a starfield. Johannes Kepler is allowed to query the
        NASA Exoplanet Archive. Grace Hopper is required to argue with a classifier. The CNN only
        runs when you give it a transit time series.
      </p>
      <p className="prose-block">
        Kepler, K2, and TESS never agreed on column names. We mapped them onto one feature contract,
        published the F1, and put NASA Eyes beside the brief so a student can see the orbit while
        reading the Kelvin.
      </p>

      <PastelTitle style={{ fontSize: 48 }}>How a transit becomes a brief</PastelTitle>
      <RailList
        items={PIPELINE.map((item, index) => ({
          when: item.step,
          title: item.title,
          detail: item.body,
          live: index === 0,
        }))}
      />

      <PastelTitle style={{ fontSize: 48, marginTop: 48 }}>From name to Eyes</PastelTitle>
      <p className="prose-block">
        A confirmed-world night on the Kepler desk. Hopper’s path starts from photometry you typed
        instead of a NASA name.
      </p>
      <div className="mkt-grid" style={{ marginBottom: 64 }}>
        {OBSERVATORY_BEATS.map((item) => (
          <article key={item.title} className="mkt-card">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>

      {TOOLKIT.map((block) => (
        <section key={block.mode} style={{ marginBottom: 64 }}>
          <PastelTitle style={{ fontSize: 48 }}>{block.mode}</PastelTitle>
          <p className="prose-block">{block.intro}</p>
          <div className="mkt-grid">
            {block.items.map((item) => (
              <article key={item.name} className="mkt-card">
                <h3>{item.name}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>
      ))}

      <PastelTitle style={{ fontSize: 48 }}>The dual-agent stack</PastelTitle>
      <p className="prose-block">
        Two named operators. Kepler never invents an exoplanet. Hopper never starts from the ML
        label. Photometry enters the room before prose.
      </p>
      <div className="mkt-grid" style={{ marginBottom: 64 }}>
        {FEATURES.map((feature) => (
          <article key={feature.title} className="mkt-card">
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </article>
        ))}
      </div>

      <PastelTitle style={{ fontSize: 48 }}>Worlds the desk already knows</PastelTitle>
      <p className="prose-block">
        Use these when TAP is quiet. Then search the planet you actually care about.
      </p>
      <div className="mkt-grid" style={{ marginBottom: 64 }}>
        {FAMOUS_WORLDS.map((item) => (
          <article key={item.name} className="mkt-card">
            <p className="mkt-eyebrow">{item.tag}</p>
            <h3>{item.name}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>

      <PastelTitle style={{ fontSize: 48 }}>Where the photons come from</PastelTitle>
      <div className="mkt-grid" style={{ marginBottom: 48 }}>
        {DATA_SOURCES.map((item) => (
          <article key={item.name} className="mkt-card">
            <h3>{item.name}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </MarketingShell>
  );
}
